//! Transfers the clubs have agreed for a later date, and cancelling one.
//!
//! The game's transfer manager (`TRANSFER_MANAGER`, one object a static of the plugin points at) keeps every offer of
//! the game in one table of pointers: a slot it has freed is null, and offers of other kinds (`B_CLUB_MOVE_OFFER`, ...)
//! sit among the transfers. A transfer between clubs is a `FULL_TRANSFER_OFFER` that names the player, the clubs'
//! teams, the day he moves and a state (see [`FutureTransferLayout`]): 0x13 while it waits for its day, 0x14 once he
//! has moved, 0x10 when it fell through and 0x0F when it was turned down. The game keeps every offer listed after its
//! end, in its last state.
//!
//! Cancelling gives the transfer the state of one that fell through, as the game left those of Yuta Nakayama (agreed
//! with LA Galaxy for 26 January 2028; still at Crvena zvezda in May) and Marc Oliver Kempf (agreed with Hamburg for
//! 1 July 2028; at Leipzig since) on the Steam save of May 2028. The offer stays listed, as theirs do.
//!
//! [`FutureTransferLayout`]: crate::profile::FutureTransferLayout

use fmlibre_mem::is_user_pointer;
use serde::Serialize;

use crate::date::FmDate;
use crate::players::PlayerSummary;
use crate::rtti;
use crate::session::Session;
use crate::transfer::{MoveError, Patch, Patches};

/// The classes of the transfer manager and of a transfer between clubs, as written in C++.
pub(crate) const MANAGER_CLASS: &str = "TRANSFER_MANAGER";
const OFFER_CLASS: &str = "FULL_TRANSFER_OFFER";

/// The states of a transfer: agreed and waiting for its day, and fallen through.
const AGREED: u8 = 0x13;
const FELL_THROUGH: u8 = 0x10;

/// The most slots the table of offers may have; the Steam save of May 2028 had 16,621.
const MOST_OFFERS: u64 = 1 << 20;

/// A transfer agreed for a later date.
#[derive(Debug, Clone, PartialEq, Eq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct FutureTransfer {
    /// The club he joins.
    pub club_uid: Option<u32>,
    pub club: Option<String>,
    /// The day he moves.
    pub date: Option<FmDate>,
}

/// Cancelling a player's agreed transfers, worked out from the game as it is now.
#[derive(Debug, Clone)]
pub struct CancelPlan {
    pub player: u32,
    /// The first of them, which the change log names.
    pub transfer: FutureTransfer,
    patches: Vec<Patch>,
}

/// Cancelling that was written: what undoing it takes.
#[derive(Debug, Clone)]
pub struct Cancelled {
    pub player: u32,
    pub transfer: FutureTransfer,
    patches: Vec<Patch>,
}

impl Session {
    /// The transfers agreed for `player` that wait for their day; `Err` when the editor cannot find the game's offers
    /// in this build.
    pub fn future_transfers(&self, player: &PlayerSummary) -> Result<Vec<FutureTransfer>, MoveError> {
        self.agreed_offers(player)?.into_iter().map(|offer| self.read_future_transfer(offer)).collect()
    }

    /// Works out cancelling every transfer agreed for `player`. Nothing is written.
    pub fn plan_cancel_transfers(&self, player: &PlayerSummary) -> Result<CancelPlan, MoveError> {
        let offers = self.agreed_offers(player)?;
        let first = *offers.first().ok_or(MoveError::NoFutureTransfer)?;
        let state = self.layout.future_transfer.as_ref().ok_or(MoveError::NoTransfers)?.state;
        let mut patches = Patches::default();
        for offer in offers {
            patches.push(offer + state, [AGREED], [FELL_THROUGH]);
        }
        Ok(CancelPlan { player: player.uid, transfer: self.read_future_transfer(first)?, patches: patches.0 })
    }

    /// Writes planned cancelling, each write only over what the plan found.
    pub fn apply_cancel_transfers(&self, plan: &CancelPlan) -> Result<Cancelled, MoveError> {
        self.apply_patches(&plan.patches)?;
        Ok(Cancelled { player: plan.player, transfer: plan.transfer.clone(), patches: plan.patches.clone() })
    }

    /// Agrees the transfers again, provided the game has left them as the cancelling did.
    pub fn undo_cancel_transfers(&self, done: &Cancelled) -> Result<(), MoveError> {
        self.undo_patches(&done.patches)
    }

    /// The offers agreed for `player` that wait for their day, once his object is checked to still be his.
    fn agreed_offers(&self, player: &PlayerSummary) -> Result<Vec<u64>, MoveError> {
        let f = self.layout.future_transfer.as_ref().ok_or(MoveError::NoTransfers)?;
        let p = &self.layout.player;
        if self.process.read_u32(player.address + p.at(p.uid, player.shift))? != player.uid {
            return Err(MoveError::Moved { uid: player.uid });
        }
        let identity = player.address + p.at(p.identity(), player.shift);
        let vtables = self.offer_vtables();
        let mut agreed = Vec::new();
        for offer in self.offer_table()? {
            // A slot may be freed while it is read: what does not read is not an offer.
            let Ok(bytes) = self.process.read_bytes(offer, f.state as usize + 1) else {
                continue;
            };
            let word = |at: u64| u64::from_le_bytes(bytes[at as usize..at as usize + 8].try_into().expect("8 bytes"));
            if vtables.contains(&word(0)) && word(f.player) == identity && bytes[f.state as usize] == AGREED {
                agreed.push(offer);
            }
        }
        Ok(agreed)
    }

    /// The offers the transfer manager lists, null slots left out.
    fn offer_table(&self) -> Result<Vec<u64>, MoveError> {
        let f = self.layout.future_transfer.as_ref().ok_or(MoveError::NoTransfers)?;
        let manager = self.transfer_manager().ok_or(MoveError::NoTransfers)?;
        let begin = self.process.read_u64(manager + f.offers)?;
        let end = self.process.read_u64(manager + f.offers + 8)?;
        if !is_user_pointer(begin) || end < begin || !(end - begin).is_multiple_of(8) || end - begin > 8 * MOST_OFFERS {
            return Err(MoveError::NoTransfers);
        }
        let bytes = self.process.read_bytes(begin, (end - begin) as usize)?;
        Ok(bytes
            .as_chunks::<8>()
            .0
            .iter()
            .map(|word| u64::from_le_bytes(*word))
            .filter(|&o| is_user_pointer(o))
            .collect())
    }

    /// The transfer manager, from its static, checked by its class; `None` when either cannot be found.
    fn transfer_manager(&self) -> Option<u64> {
        let (rva, vtable) = (*self.transfer_manager.get_or_init(|| {
            let vtables = rtti::vtables(&self.process, &self.plugin, MANAGER_CLASS);
            let rva = *crate::locate::search_statics(self, &vtables).first()?;
            let manager = self.process.read_u64(self.plugin.base + rva).ok()?;
            Some((rva, self.process.read_u64(manager).ok()?))
        }))?;
        // A save loaded since makes another manager, which the same static points at.
        let manager = self.process.read_u64(self.plugin.base + rva).ok().filter(|&at| is_user_pointer(at))?;
        (self.process.read_u64(manager).ok()? == vtable).then_some(manager)
    }

    /// The vtables of transfers between clubs, found by their class name the first time they are needed.
    fn offer_vtables(&self) -> &[u64] {
        self.offer_class.get_or_init(|| rtti::vtables(&self.process, &self.plugin, OFFER_CLASS))
    }

    fn read_future_transfer(&self, offer: u64) -> Result<FutureTransfer, MoveError> {
        let f = self.layout.future_transfer.as_ref().ok_or(MoveError::NoTransfers)?;
        let (club_uid, club) = self.club_of_team(self.process.read_u64(offer + f.buyer)?);
        let raw = self.process.read_u32(offer + f.date)?;
        Ok(FutureTransfer { club_uid, club, date: FmDate::from_raw(raw as u16, (raw >> 16) as u16) })
    }
}
