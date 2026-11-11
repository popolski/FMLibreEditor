# Ce fork

Ce dépôt est un fork de [FMLibreEditor](https://github.com/tozmoz/FMLibreEditor) de tozmoz, publié sous la même
licence (GPL-3.0-or-later).

## Ajouts par rapport à la version de tozmoz

- **Traduction française** de l'interface.
- **Annulation des transferts futurs** : la fiche d'un joueur affiche les transferts convenus pour une date
  ultérieure (club et date), avec un bouton « Annuler le transfert » ; l'onglet Modifications permet de revenir en
  arrière. Les détails sont dans [recon/fm27-transfers.md](recon/fm27-transfers.md).

## Versions et mises à jour

Les versions de ce fork reprennent celles de tozmoz, suivies de `-fr.N` : `0.6.0-fr.1` est la première version du
fork fondée sur la 0.6.0 de tozmoz.

Le workflow [`fork-release.yml`](../.github/workflows/fork-release.yml) tourne chaque jour :

1. il regarde si tozmoz a publié une nouvelle version ;
2. si oui, il la fusionne dans `main` avec les ajouts du fork ;
3. il compile l'installeur Windows et publie une release de ce dépôt, avec le `latest.json` que les copies installées
   lisent pour se mettre à jour.

On peut aussi le lancer à la main (onglet Actions › Fork release › Run workflow) pour publier une version après un
changement propre au fork.

Si la fusion entre en conflit avec les changements du fork, le workflow s'arrête et GitHub envoie un e-mail : il faut
fusionner la version de tozmoz à la main, puis relancer le workflow.

Seule la version installée (`FMLibreEditor-Setup.exe`) se met à jour toute seule. La version portable
(`FMLibreEditor.exe`) ouvre la page des releases du fork. macOS n'est pas pris en charge.

Les réglages propres au fork (adresse des mises à jour, clé publique, version) sont dans
[`app/src-tauri/tauri.fork.conf.json`](../app/src-tauri/tauri.fork.conf.json), qui s'ajoute à `tauri.conf.json` au
moment de compiler : `tauri.conf.json` reste celui de tozmoz, pour que ses mises à jour se fusionnent sans conflit.
L'appli demande les versions du fork dans [`app/src/update.ts`](../app/src/update.ts).

## Mise en place (une seule fois)

1. **Clé de signature.** Les mises à jour sont signées ; l'appli refuse un fichier qui ne l'est pas avec la clé dont
   elle connaît la moitié publique.

   ```powershell
   cd app
   npx tauri signer generate -w "$env:USERPROFILE\.tauri\fmlibre-fork.key"
   ```

   Choisissez un mot de passe et gardez la clé privée (`fmlibre-fork.key`) hors du dépôt : la perdre empêche de
   publier des mises à jour que les copies installées acceptent. La clé publique (`fmlibre-fork.key.pub`) va dans
   `pubkey` de `tauri.fork.conf.json`.

2. **Secrets du dépôt** (Settings › Secrets and variables › Actions, ou `gh secret set`) :
   - `TAURI_SIGNING_PRIVATE_KEY` : le contenu de `fmlibre-fork.key` ;
   - `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` : son mot de passe ;
   - `SYNC_TOKEN` (facultatif) : un jeton à accès précis (fine-grained) sur ce dépôt, avec les droits Contents et
     Workflows en écriture. Sans lui, une version de tozmoz qui modifie ses workflows ne peut pas être poussée.

3. **Activer GitHub Actions** sur le fork (onglet Actions), puis lancer « Fork release » une première fois.
