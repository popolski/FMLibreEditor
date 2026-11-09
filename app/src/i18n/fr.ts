// The French text of the UI: the same shape as `en.ts` (a missing or extra key fails the build), in the football
// French of France, whose conventions the dates and numbers follow too (see `index.ts`). It speaks to the player as
// "vous", as Football Manager in French does. The comments in `en.ts` say what each string is for.
//
// French puts the singular for 0 and 1 ("0 modification", "1 modification") and the plural from 2 on, and the words
// after a count agree with its noun ("1 modification appliquée", "3 modifications appliquées"), so the sentences with
// a count are written out for one and for many. French typography puts a space before ":" and "%" and inside « »;
// a no-break space ( ) keeps them on the same line.

import type { Entity } from "../types";
import type { ErrorTexts, Strings } from "./en";
import { fieldName } from "./fieldNames";

const numbers = new Intl.NumberFormat("fr-FR");
const percents = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });

/** A count or an amount with the thousands separators of the language: "12 345". */
const format = (value: number) => numbers.format(value);

/** "0 modification", "1 modification", "12 345 modifications". */
const changes = (count: number) => (count <= 1 ? `${format(count)} modification` : `${format(count)} modifications`);

/** For the places that say how many changes there are, which may be none: "Aucune modification", "3 modifications". */
const changeCount = (count: number) => (count === 0 ? "Aucune modification" : changes(count));

/** "1 joueur", "12 joueurs". */
const playerCount = (count: number) => (count <= 1 ? `${format(count)} joueur` : `${format(count)} joueurs`);

/** "1 valeur laissée telle quelle", "12 valeurs laissées telles quelles". */
const valuesLeftAlone = (count: number) =>
  count <= 1 ? `${format(count)} valeur laissée telle quelle` : `${format(count)} valeurs laissées telles quelles`;

/** What each list holds, for one and for many. Every one of them is masculine, so the words around them are too. */
const nouns: Record<Entity, { one: string; many: string }> = {
  player: { one: "joueur", many: "joueurs" },
  staff: { one: "membre du staff", many: "membres du staff" },
  club: { one: "club", many: "clubs" },
};

/** "237 joueurs", "1 membre du staff", "12 clubs". */
const entityCount = (entity: Entity, count: number) =>
  `${format(count)} ${count <= 1 ? nouns[entity].one : nouns[entity].many}`;

/** " %" after a number, as French writes it. */
const pct = (value: string | number) => `${value} %`;

/** Text between French quotation marks. */
const quote = (text: string) => `« ${text} »`;

/** Squad statuses (see `en.ts`). */
const SQUAD_STATUSES: Partial<Record<number, string>> = {
  1: "Joueur vedette",
  2: "Joueur important",
  3: "Titulaire régulier",
  4: "Joueur de rotation",
  5: "Joker de luxe",
  7: "Remplaçant occasionnel",
  9: "Remplaçant de secours",
  10: "Espoir prêt à éclore",
  11: "Espoir pour l'avenir",
  13: "Jeune",
  14: "Habitué de l'équipe B",
  15: "Gardien titulaire",
  16: "Gardien de coupe",
  17: "Gardien des coupes nationales",
  20: "Gardien remplaçant",
  21: "Gardien remplaçant de secours",
  22: "Indésirable",
};

/** The kinds of contract (see `en.ts`). */
const CONTRACT_TYPES: Partial<Record<number, string>> = {
  0: "Contrat à temps partiel",
  1: "Contrat à temps plein",
  2: "Contrat amateur",
  3: "Contrat jeune",
  4: "Sans contrat",
  10: "Contrat senior au salaire minimum",
  11: "Contrat senior",
};

/** The name of the field a failure names. */
const field = (key: string | undefined) => fieldName(fr, key ?? "");

/** The noun of the kind of record a failure names, or "enregistrement" when it names none. */
const recordNoun = (entity: string | undefined) =>
  entity === "player" || entity === "staff" || entity === "club" ? nouns[entity].one : "enregistrement";

/** The reasons the Rust side gives for a field that cannot be changed some way. */
const UNSUPPORTED: Partial<Record<string, string>> = {
  "a date can only be set": "une date peut seulement être fixée",
  "it is changed one person at a time": "il se change une personne à la fois",
  "the new value is not one of the game's own records of that kind":
    "la nouvelle valeur n'est pas un enregistrement du jeu de ce type",
  "the in-game date is not known": "la date du jeu est inconnue",
};

const reload = "relisez les données et réessayez";

/** The lists of a club's staff, as `staff.noRoom` names them. */
const STAFF_DEPARTMENTS: Partial<Record<string, string>> = {
  medical: "du staff médical",
  coaching: "du staff technique",
  scouting: "des recruteurs",
};

/** The kinds of contract clauses and bonuses, by the codes contracts hold them as (see `en.ts`). */
const CLAUSE_NAMES_FR: Partial<Record<number, string>> = {
  0: "Clause libératoire (indemnité minimale)",
  1: "Clause libératoire en cas de relégation",
  2: "Clause libératoire en cas de non-promotion",
  3: "Augmentation de salaire annuelle",
  4: "Augmentation de salaire en cas de promotion",
  5: "Baisse de salaire en cas de relégation",
  6: "Clause libératoire pour un poste dans le staff",
  8: "Pourcentage sur un futur transfert",
  9: "Pourcentage de la plus-value sur un futur transfert",
  10: "Prime pour un nombre de buts dans la saison",
  11: "Prolongation d'un an après des matchs de championnat (dernière saison)",
  12: "Clause d'alignement sur le meilleur salaire",
  13: "Salaire après un nombre de matchs de championnat avec le club",
  14: "Augmentation de salaire en cas de promotion en première division",
  15: "Baisse de salaire en cas de relégation de première division",
  16: "Clause libératoire (clubs étrangers)",
  17: "Clause libératoire (clubs nationaux d'une division supérieure)",
  18: "Clause libératoire (clubs nationaux)",
  19: "Salaire après un nombre de sélections internationales",
  20: "Pourcentage du salaire payé par un sponsor",
  21: "Pourcentage de la billetterie reversé au joueur",
  22: "Prolongation de contrat optionnelle à la main du club",
  23: "Renonciation à l'indemnité du club pour un poste d'entraîneur",
  25: "Prolongation d'un an après des matchs de championnat (dernière saison, en cas de promotion)",
  26: "Prolongation d'un an après des matchs de championnat (dernière saison, en cas de maintien)",
  27: "Clause libératoire (clubs en Ligue des champions de l'UEFA)",
  28: "Clause de contrat garanti de la MLS",
  29: "Prolongation de contrat après une promotion",
  30: "Clause libératoire en cas de blessure",
  31: "Clause libératoire (clubs en compétition continentale)",
  32: "Prime de match",
  33: "Prime de but",
  34: "Prime de clean sheet",
  37: "Prime de sélection internationale",
  38: "Prime de remplaçant non utilisé",
  39: "Prime de passe décisive",
  40: "Prime pour un nombre de passes décisives dans la saison",
  41: "Prime pour un nombre de buts et passes décisives dans la saison",
  54: "Non affiché dans le jeu (54)",
  55: "Clause libératoire active en cas de relégation",
  56: "Clause libératoire active en cas de non-promotion",
  58: "Non affiché dans le jeu (58)",
  63: "Non affiché dans le jeu (63)",
};

/** Reasons to be unhappy, by the codes the game keeps them as (see `en.ts`). */
const CONCERN_MOTIVES_FR: Partial<Record<number, string>> = {
  596: "Écarté d'une liste de compétition",
  808: "Pense qu'un coéquipier a été traité injustement",
  926: "Pense qu'un coéquipier ne mérite pas le temps de jeu qu'il réclame",
};

/** Players' traits (preferred moves), by their bit in the game's mask (see `en.ts`). */
const TRAIT_NAMES_FR: readonly string[] = [
  "Part balle au pied sur le côté gauche",
  "Part balle au pied sur le côté droit",
  "Part balle au pied dans l'axe",
  "S'introduit dans la surface adverse",
  "Se démarque dans les intervalles",
  "Monte dès que possible",
  "Joue des passes courtes et simples",
  "Tente souvent la passe décisive",
  "Tire de loin",
  "Tire en puissance",
  "Place ses tirs",
  "Enroule ses tirs",
  "Aime dribbler le gardien",
  "Aime jouer le hors-jeu",
  "Joue de l'extérieur du pied",
  "Marque son adversaire de près",
  "Provoque ses adversaires",
  "Conteste les décisions de l'arbitre",
  "Joue dos au but",
  "Décroche pour toucher le ballon",
  "Joue des une-deux",
  "Aime lober le gardien",
  "Dicte le tempo",
  "Tente des retournés",
  "Cherche la passe plutôt que de tirer",
  "Ne joue pas de passes en profondeur",
  "Arrête le jeu",
  "Pousse le ballon devant son adversaire",
  "Repasse sur le pied droit avant de dribbler",
  "Repasse sur le pied gauche avant de dribbler",
  "Garde trop le ballon",
  "Arrive tard dans la surface adverse",
  "Tente de se sortir des situations difficiles balle au pied",
  "Reste en retrait en permanence",
  "Évite d'utiliser son mauvais pied",
  "Tente des gestes techniques",
  "Tente les coups francs de loin",
  "Se jette dans les tacles",
  "Ne se jette pas dans les tacles",
  "Repique dans l'axe",
  "Colle à la ligne",
  "Chauffe le public",
  "Tente des frappes en première intention",
  "Tente des passes longues",
  "Aime recevoir le ballon dans les pieds",
  "Frappe les coups francs en puissance",
  "Aime éliminer son adversaire à répétition",
  "Aime renverser le jeu sur l'autre aile",
  "Prendra sa retraite au sommet",
  "Jouera au football aussi longtemps que possible",
  "Effectue de longues touches tendues",
  "Part souvent balle au pied",
  "Part rarement balle au pied",
  "Essaie de travailler son mauvais pied",
  "Point d'appui statique",
  "Utilise les longues touches pour lancer les contres",
  "S'abstient de tirer de loin",
  "Repique dans l'axe depuis l'aile gauche",
  "Repique dans l'axe depuis l'aile droite",
  "Centre tôt",
  "Sort le ballon de la défense",
  "Joue le ballon au pied",
];

/** What a check is about, from the key a failure gives, with a capital. */
const checkName = (key: string | undefined) => {
  const name = (fr.checks as Partial<Record<string, string>>)[key ?? ""] ?? key ?? "";
  return name.charAt(0).toUpperCase() + name.slice(1);
};

/** The name of a job code a failure gives, as `jobs` below has it. */
const jobName = (code: string | undefined) => (fr.jobs as Partial<Record<number, string>>)[Number(code)] ?? code;

const errors: ErrorTexts = {
  "guard.unknownBuild": () =>
    "FMLibreEditor n'a pas encore été testé avec cette version du jeu, il n'y écrit donc pas. « Modifier quand " +
    "même », dans l'avertissement en haut, active la modification.",
  "guard.failed": (p) =>
    `${checkName(p.check)} : les vérifications n'ont pas réussi dans cette version du jeu, FMLibreEditor n'y ` +
    "touche donc pas.",
  "edit.unknownField": (p) => `Il n'y a pas ici de champ modifiable ${quote(p.field ?? "")}.`,
  "edit.outOfRange": (p) =>
    `${p.value} n'est pas une valeur valide pour ${field(p.field)} : elle va de ${p.min} à ${p.max}.`,
  "edit.notADate": (p) => `${p.value} n'est pas une date valide pour ${field(p.field)}.`,
  "edit.notAChoice": (p) => `${p.value} ne fait pas partie des valeurs possibles pour ${field(p.field)}.`,
  "edit.taken": (p) =>
    `Le numéro ${p.value} est déjà pris : ${p.name ?? `le joueur d'UID ${p.uid}`} le porte.`,
  "edit.unsupported": (p) =>
    `${field(p.field)} ne peut pas être modifié ainsi : ${UNSUPPORTED[p.reason] ?? p.reason}.`,
  "edit.moved": (p) => `Ce ${recordNoun(p.entity)} a changé de place dans la mémoire du jeu ; ${reload}.`,
  "edit.noRecord": (p) =>
    `${field(p.field)} ne peut pas être modifié ici : son enregistrement manque ou ne passe pas les vérifications.`,
  "edit.unset": (p) => `${field(p.field)} n'est pas défini dans le jeu, il n'a donc pas été modifié.`,
  "edit.implausible": (p) =>
    `${field(p.field)} vaut ${p.value}, une valeur impossible ; par sécurité, il n'a pas été modifié.`,
  "edit.notApplied": (p) => `${field(p.field)} : ${p.wrote} a été écrit, mais la relecture donne ${p.read}.`,
  "edit.conflict": (p) =>
    `${field(p.field)} vaut maintenant ${p.found} et non ${p.expected} : le jeu l'a modifié entre-temps.`,
  "move.moved": () => `Le joueur a changé de place dans la mémoire du jeu ; ${reload}.`,
  "move.notAClub": () => "Ce club n'a pas d'équipe première que le joueur puisse rejoindre.",
  "move.freeAgent": () => "Le joueur est libre : il n'a pas de club à quitter ni avec lequel échanger.",
  "move.sameClub": () => "Le joueur est déjà dans ce club.",
  "move.onLoan": () =>
    "Le joueur est prêté : rappelez-le d'abord ou rendez le prêt définitif, dans la partie Prêt de son profil.",
  "move.notOnLoan": () => "Le joueur n'est pas prêté.",
  "move.playerCoach": () =>
    "Les entraîneurs-joueurs ne peuvent pas être transférés : ils font aussi partie du staff.",
  "move.unusualContract": () => "Le contrat du joueur n'est pas un contrat de joueur ordinaire.",
  "move.humanClub": () =>
    "Le joueur est dans un club dirigé par un manager humain. Dans cette version du jeu, l'éditeur ne trouve pas " +
    "encore les compositions du club : il ne peut donc quitter le club que depuis le jeu lui-même.",
  "move.menAndWomen": () => "L'un des clubs est masculin et l'autre féminin.",
  "move.notListed": () => "Les listes de l'effectif ne contiennent pas le joueur là où elles le devraient.",
  "move.noRoom": (p) =>
    `La liste de l'effectif du club n'a pas de place pour un joueur de plus (${p.players} actuellement) et ` +
    "l'éditeur ne peut pas l'agrandir sur ce système.",
  "sign.noPool": () =>
    "L'éditeur ne trouve pas où le jeu range ses contrats dans cette version : il ne peut donc pas en donner un " +
    "à un joueur libre.",
  "sign.poolFull": () =>
    "Le jeu n'a pas de place pour un contrat de plus tant qu'il n'en crée pas un lui-même, comme il le fait au fil " +
    "des jours : avancez d'un jour dans le jeu et réessayez.",
  "sign.noModel": () =>
    "Aucun joueur de l'équipe première du club n'a un contrat ordinaire sur lequel baser le nouveau.",
  "sign.noDate": () => "L'éditeur ne peut pas lire la date du jeu, qui est le début du nouveau contrat.",
  "move.outOfRange": (p) =>
    `${p.value} n'est pas une valeur valide pour ${field(p.field)} : elle va de ${p.min} à ${p.max}.`,
  "move.changed": () => `Le jeu a modifié cette mémoire entre-temps ; ${reload}.`,
  "move.notApplied": () => "La mémoire a été écrite, mais la relecture donne autre chose.",
  "retirement.unknown": () =>
    "L'éditeur ne trouve pas les retraites que le jeu a prévues dans cette version du jeu.",
  "retirement.none": () =>
    "Le jeu n'a pas prévu la retraite du joueur, et il compte déjà continuer à jouer.",
  "clause.noContract": () => "Le joueur n'a pas de contrat.",
  "clause.missing": (p) => `Le contrat n'a pas de clause numéro ${p.index}.`,
  "clause.notInClause": (p) =>
    `Cette clause n'a pas de ${p.field === "clause.amount" ? "montant" : "condition"} à modifier.`,
  "clause.same": () => "Le contrat a déjà cela.",
  "clause.noRoom": () =>
    "La liste des clauses du contrat n'a pas de place pour une de plus, et l'éditeur ne peut pas l'agrandir.",
  "heal.notInjured": () => "Le joueur n'a aucune blessure à soigner.",
  "ban.notBanned": () => "Le joueur n'a aucune suspension à lever.",
  "relation.missing": () => `Cette nationalité ou cette formation n'est plus dans la liste du joueur ; ${reload}.`,
  "relation.noRoom": () =>
    "La liste du joueur n'a plus de place et l'éditeur ne peut pas l'agrandir ; modifiez plutôt une de ses " +
    "entrées.",
  "relation.target": () => "Ce n'est pas une nation ou un club du jeu du type qu'accepte cette entrée.",
  "relation.same": () => "Le joueur a déjà cela.",
  "relation.rule": (p) => `La règle de formation locale ${p.rule} ne fait pas partie de celles que l'éditeur écrit.`,
  "staff.you": () => "C'est vous, le manager que vous contrôlez.",
  "staff.unemployed": () => "Ce membre du staff n'a pas de club.",
  "staff.role": () =>
    "Le club ou l'une de ses équipes pointe directement vers ce membre du staff (comme un manager qui est aussi son " +
    "directeur sportif, ou un président qui dirige l'équipe) ; c'est au jeu lui-même de le déplacer.",
  "staff.notListed": () => "Les listes du staff du club ne le contiennent pas là où elles le devraient.",
  "staff.noRoom": (p) =>
    `La liste ${STAFF_DEPARTMENTS[p.department] ?? `« ${p.department} »`} du club n'a plus de place ` +
    `(${p.staff} actuellement) et l'éditeur ne peut pas l'agrandir ici.`,
  "stadium.none": () => "Impossible de lire le stade où joue l'équipe première du club.",
  "stadium.shared": (p) =>
    `${p.holders} éléments du jeu partagent ce nom ; il ne peut pas être changé pour le stade seul.`,
  "stadium.nameLength": (p) =>
    `Le nouveau nom de ce stade doit faire de ${p.min} à ${p.max} octets pour tenir là où le jeu le range ; ` +
    `celui-ci en fait ${p.bytes}.`,
  "stadium.badName": () =>
    "Le nom d'un stade ne peut pas être vide, commencer ou finir par une espace, ni contenir de caractères de " +
    "contrôle.",
  "staff.job": (p) => `L'éditeur ne déplace pas encore le staff au poste de ${jobName(p.job)} et ne donne pas ce poste.`,
  "staff.directorTaken": (p) =>
    `Le club a déjà un directeur sportif : ${p.name ?? "quelqu'un d'autre"}. Donnez à ce membre du staff un ` +
    `autre poste au club, ou déplacez d'abord ${p.name ?? "cette personne"}.`,
  "staff.managerTaken": (p) =>
    `Le club a déjà un manager : ${p.name ?? "quelqu'un d'autre"}. Donnez à ce membre du staff un autre poste ` +
    `au club, ou déplacez d'abord ${p.name ?? "cette personne"}.`,
  "staff.yourClub": () =>
    "C'est vous qui dirigez ce club. Donnez à ce membre du staff un autre poste au club : FMLibreEditor ne " +
    "prend jamais votre place.",
  "staff.noJob": () => "Choisissez le poste qu'il occupera au club.",
  "staff.noModel": (p) =>
    p.staff === "0"
      ? "Ce club n'a aucun staff : le jeu n'en garde pas dans les clubs des championnats non jouables dans " +
        "cette partie."
      : "Personne dans le staff de ce club n'a un contrat complet sur lequel baser le nouveau.",
  "squad.noTeam": () => `Le club n'a pas cette équipe, ou elle ne passe pas les vérifications ; ${reload}.`,
  "captain.notInTeam": () =>
    "Le joueur ne joue pas dans cette équipe ; le capitaine ne peut être qu'un joueur de l'équipe elle-même.",
  "captain.unchanged": () => "Le joueur a déjà ce rôle.",
  "session.notRunning": () =>
    "Football Manager 27 n'est pas lancé. Démarrez le jeu, chargez une partie et réessayez.",
  "session.noSuchProcess": (p) => `Aucun ${p.exe ?? "fm.exe"} n'a le PID ${p.pid}.`,
  "session.severalRunning": (p) =>
    `${p.count} copies de ${p.exe ?? "fm.exe"} sont lancées (${p.pids}) ; choisissez-en une.`,
  "session.pluginNotLoaded": () =>
    "Les données du jeu ne sont pas encore chargées ; attendez le menu principal et réessayez.",
  "session.unsupportedEdition": (p) => `FM${p.edition} n'est pas encore pris en charge.`,
  "session.unknownEdition": () => "Impossible de savoir de quel Football Manager il s'agit.",
  "session.playersNotFound": () =>
    "La liste des joueurs est introuvable ; chargez une partie (le menu principal ne suffit pas) et réessayez.",
  "memory.win32": (p) => `Windows a refusé une opération (${p.operation}, erreur ${p.code}).`,
  "memory.read": (p) => `Impossible de lire la mémoire du jeu (erreur système ${p.code}).`,
  "memory.write": (p) => `Impossible d'écrire dans la mémoire du jeu (erreur système ${p.code}).`,
  "memory.readOnly": () => "Le jeu a été ouvert en lecture seule ; Windows n'a pas autorisé l'écriture.",
  "memory.notWritable": () =>
    "Cette adresse n'est pas dans la mémoire de données modifiable du jeu : rien n'a été écrit.",
  "memory.invalidPe": () => "Impossible de lire le module du jeu.",
  "memory.invalidMachO": () => "Impossible de lire le module du jeu.",
  "memory.mach": (p) => `macOS a refusé une opération (${p.operation}, erreur ${p.code}).`,
  "memory.posix": (p) => `macOS a refusé une opération (${p.operation}, errno ${p.code}).`,
  "memory.noBridge": () =>
    "macOS ne laisse pas FMLibreEditor accéder au jeu : le jeu a été lancé sans le pont de FMLibreEditor. " +
    "Installez le pont, puis relancez le jeu depuis Steam.",
  "memory.bridge": (p) => `Le pont de FMLibreEditor dans le jeu n'a pas transmis la mémoire (${p.reason}).`,
  "scout.noClub": () => "Vous ne dirigez aucun club dans cette partie : il n'y a personne pour qui recruter.",
  "scout.noTactic": (p) => `Impossible de lire dans le jeu la tactique de ${p.club}.`,
  "scout.notPlaced": () => "Le joueur n'occupe aucun poste de la tactique.",
  "scout.unknownRole": (p) => `L'éditeur ne connaît pas le rôle ${p.role}.`,
  "setup.steamRunning": () =>
    "Steam est ouvert : les options de lancement de FM27 n'ont donc pas été modifiées, mais le pont lui-même " +
    "est installé. Quittez Steam et réessayez, ou saisissez vous-même l'option de lancement dans Steam.",
  "setup.noSteamAccount": () =>
    "Aucun compte Steam trouvé sur ce Mac ; ouvrez Steam et connectez-vous une fois.",
  "setup.noLibrary": (p) => `Un fichier du pont manque dans l'application : ${p.path}`,
  "setup.unknownConfig": (p) =>
    `${p.path} n'a pas un format connu de FMLibreEditor : il n'a donc pas été modifié.`,
  "setup.io": (p) => `${p.path} : ${p.error}`,
  "app.internal": () => "Une erreur inattendue s'est produite dans l'application.",
  "app.notConnected": () => "Pas de connexion au jeu.",
  "app.notFound": (p) =>
    `Aucun ${recordNoun(p.entity)} avec l'ID ${p.uid} dans les listes ; relisez les données.`,
  "app.dataChanged": () => `Ces données ont changé dans le jeu ; ${reload}.`,
  "app.noChange": (p) => `La modification ${p.id} n'existe pas.`,
  "app.alreadyUndone": () => "Cette modification a déjà été annulée.",
  "export.failed": (p) => `Impossible d'écrire le fichier : ${p.reason}`,
  "export.notAllowed": (p) =>
    `FMLibreEditor ne peut pas écrire dans ${p.folder}. Si macOS a demandé s'il pouvait utiliser votre dossier ` +
    "Documents, autorisez-le dans Réglages Système › Confidentialité et sécurité › Fichiers et dossiers, puis " +
    "exportez à nouveau.",
  "export.noFolder": () => "Il n'y a aucun dossier où exporter.",
  "export.notExported": () => "Ce fichier n'a pas été exporté par FMLibreEditor.",
  "export.openFailed": (p) => `Impossible de l'ouvrir : ${p.reason}`,
  "mass.noOperations": () => "Choisissez au moins un champ à modifier.",
  "mass.tooMany": (p) =>
    `Il y a ${p.count} résultats. Pour une modification en masse, réduisez la recherche ou les filtres à ${p.limit} ` +
    "au plus.",
  "mass.outOfDate": () => "Cet aperçu n'est plus à jour. Relancez l'aperçu de la modification en masse.",
};

export const fr: Strings = {
  attributes: {
    // Technique
    corners: "Corners",
    crossing: "Centres",
    dribbling: "Dribble",
    finishing: "Finition",
    first_touch: "Contrôle de balle",
    free_kicks: "Coups francs",
    heading: "Jeu de tête",
    long_shots: "Tirs de loin",
    long_throws: "Touches longues",
    marking: "Marquage",
    passing: "Passes",
    penalty_taking: "Penalty",
    tackling: "Tacles",
    technique: "Technique",
    // Mental
    aggression: "Agressivité",
    anticipation: "Anticipation",
    bravery: "Courage",
    composure: "Sang-froid",
    concentration: "Concentration",
    decisions: "Prise de décision",
    determination: "Détermination",
    flair: "Flair",
    leadership: "Leadership",
    off_the_ball: "Déplacement",
    positioning: "Placement",
    teamwork: "Collectif",
    vision: "Vision du jeu",
    work_rate: "Volume de jeu",
    // Physique
    acceleration: "Accélération",
    agility: "Agilité",
    balance: "Équilibre",
    jumping_reach: "Détente",
    natural_fitness: "Qualités physiques naturelles",
    pace: "Vitesse",
    stamina: "Endurance",
    strength: "Puissance",
    // Gardien
    aerial_reach: "Jeu aérien",
    command_of_area: "Autorité dans la surface",
    communication: "Communication",
    eccentricity: "Excentricité",
    handling: "Prise de balle",
    kicking: "Dégagements",
    one_on_ones: "Face-à-face",
    punching: "Tendance à boxer",
    reflexes: "Réflexes",
    rushing_out: "Tendance aux sorties",
    throwing: "Relances à la main",
    // Cachés
    consistency: "Régularité",
    dirtiness: "Brutalité",
    important_matches: "Grands matchs",
    injury_proneness: "Prédisposition aux blessures",
    versatility: "Polyvalence",
    // Pieds
    left_foot: "Pied gauche",
    right_foot: "Pied droit",
  },

  staffAttributes: {
    attacking: "Attaque",
    defending: "Défense",
    fitness: "Condition physique",
    goalkeeping: "Gardiens",
    possession: "Possession",
    set_pieces: "Coups de pied arrêtés",
    tactical: "Tactique",
    technical: "Technique",
    working_with_youngsters: "Travail avec les jeunes",
    authority: "Autorité",
    determination: "Détermination",
    motivating: "Motivation",
    people_management: "Gestion humaine",
    data_analysis: "Analyse de données",
    judging_ability: "Évaluation du niveau des joueurs",
    judging_potential: "Évaluation du potentiel des joueurs",
    judging_staff: "Évaluation du niveau du staff",
    negotiating: "Négociation",
    tactical_knowledge: "Connaissances tactiques",
    physiotherapy: "Kinésithérapie",
    sports_science: "Sciences du sport",
  },

  personality: {
    adaptability: "Adaptabilité",
    ambition: "Ambition",
    loyalty: "Loyauté",
    pressure: "Résistance à la pression",
    professionalism: "Professionnalisme",
    sportsmanship: "Esprit sportif",
    temperament: "Tempérament",
    controversy: "Controverse",
  },

  positions: {
    gk: "GK",
    sw: "SW",
    dl: "DL",
    dc: "DC",
    dr: "DR",
    dm: "DM",
    ml: "ML",
    mc: "MC",
    mr: "MR",
    aml: "AML",
    amc: "AMC",
    amr: "AMR",
    st: "ST",
    wbl: "WBL",
    wbr: "WBR",
  },

  clubFacilities: {
    training: "Entraînement",
    youth_facilities: "Installations des jeunes",
    youth_coaching: "Encadrement des jeunes",
    youth_recruitment: "Recrutement des jeunes",
    corporate: "Hospitalités",
  },

  supporterTraits: {
    loyalty: "Fidélité",
    passion: "Passion",
    patience: "Patience",
    affluence: "Aisance",
    temperament: "Tempérament",
    expectations: "Attentes",
  },

  supporterMix: {
    hardcore: "Ultras",
    core: "Fidèles",
    family: "Familles",
    fair_weather: "Opportunistes",
    corporate: "Entreprises",
    casual: "Occasionnels",
  },

  jobs: {
    1: "Joueur",
    2: "Entraîneur",
    4: "Président du conseil",
    6: "Directeur",
    10: "Directeur sportif",
    12: "Kiné",
    14: "Recruteur",
    16: "Manager",
    20: "Entraîneur adjoint",
    22: "Entraîneur des coups de pied arrêtés",
    26: "Préparateur physique",
    34: "Entraîneur des gardiens",
    38: "Médecin-chef",
    40: "Responsable des sciences du sport",
    44: "Recruteur en chef",
    46: "Médecin",
    48: "Scientifique du sport",
    50: "Kiné principal",
    58: "Analyste du recrutement",
    60: "Analyste de la performance",
    62: "Analyste de la performance principal",
    64: "Responsable de la formation",
    66: "Propriétaire",
    70: "Président",
    86: "Responsable des prêts",
    88: "Directeur technique",
  },

  fields: {
    current_ability: "Niveau actuel",
    potential_ability: "Potentiel",
    height: "Taille (cm)",
    date_of_birth: "Date de naissance",
    asking_price: "Prix demandé",
    nation: "Nationalité",
    "reputation.home": "Réputation nationale",
    "reputation.current": "Réputation actuelle",
    "reputation.world": "Réputation mondiale",
    "international.caps": "Sélections",
    "international.goals": "Buts internationaux",
    "international.u21_caps": "Sélections espoirs",
    "international.u21_goals": "Buts en espoirs",
    condition: "Énergie",
    match_sharpness: "Rythme de match",
    jadedness: "Usure",
    morale: "Moral",
    "contract.wage": "Salaire hebdomadaire",
    "contract.loyalty_bonus": "Prime de fidélité hebdomadaire",
    "contract.happiness": "Satisfaction",
    "contract.playing_time_happiness": "Satisfaction du temps de jeu",
    "contract.unhappiness": "Motifs de mécontentement",
    "contract.expires": "Fin de contrat",
    "contract.squad_number": "Numéro",
    "contract.squad_status": "Statut dans l'effectif",
    "contract.transfer_listed": "Placé sur la liste des transferts",
    "contract.loan_listed": "Placé sur la liste des prêts",
    "loan.expires": "Fin du prêt",
    "loan.option_fee": "Option d'achat",
    "contract.job": "Poste",
    "tie.nationality": "Nationalité secondaire",
    "tie.trainedInNation": "Formé dans le pays",
    "tie.trainedAtClub": "Formé au club",
    "tie.workPermit": "Sans permis de travail en",
    club: "Club",
    injuries: "Blessures",
    bans: "Suspensions",
    retirement: "Retraite",
    clause: "Clause du contrat",
    "clause.amount": "Montant de la clause",
    "clause.condition": "Condition de la clause",
    captain: "Capitaine",
    vice_captain: "Vice-capitaine",
    reputation: "Réputation",
    "facilities.training": "Installations d'entraînement",
    "facilities.youth_facilities": "Installations des jeunes",
    "facilities.youth_coaching": "Encadrement des jeunes",
    "facilities.youth_recruitment": "Recrutement des jeunes",
    "facilities.corporate": "Installations d'hospitalité",
    "finance.balance": "Solde",
    "finance.transfer_budget": "Budget transferts",
    "finance.wage_budget": "Budget salarial",
    "finance.total_wage_budget": "Budget salarial total",
    "stadium.capacity": "Capacité du stade",
    "stadium.name": "Nom du stade",
    "stadium.seating": "Places assises",
    "stadium.used": "Capacité utilisée",
    "stadium.expansion": "Capacité d'extension",
  },

  profile: {
    close: "Fermer le profil",
    loading: "Chargement du profil…",
    resize: "Redimensionner le panneau du profil",
    resizeHint: "Faites glisser pour élargir ou rétrécir le panneau ; double-cliquez pour le réinitialiser",
    none: "—",

    freeAgent: "Libre",
    born: "Né le",
    height: (cm) => `${cm} cm`,
    heightUnit: "cm",
    uid: "UID",
    currentAbility: "Niveau actuel",
    currentAbilityShort: "NA",
    potentialAbility: "Potentiel",
    potentialAbilityShort: "PO",
    potentialRange: "Potentiel défini comme une fourchette",

    technical: "Technique",
    goalkeeping: "Gardien",
    mental: "Mental",
    physical: "Physique",
    hidden: "Cachés",
    feet: "Pieds",
    personality: "Personnalité",
    raw: (raw, scale = 100) => `brut ${raw} / ${scale}`,
    lowerIsBetter: "plus c'est bas, mieux c'est",
    age: (age) => `${age} ans`,

    positions: "Postes",
    positionsSummary: (best) => `Notes par poste : ${best}`,
    positionRatings: "Notes par poste",
    positionTiers: {
      natural: "Naturel",
      accomplished: "Accompli",
      competent: "Compétent",
      unconvincing: "Peu convaincant",
      ineffective: "Inefficace",
    },
    positionTooltip: (position, rating, tier) => `${position} · ${rating} · ${tier}`,

    contract: "Contrat",
    wage: "Salaire hebdomadaire",
    wageNote: (converted) =>
      converted
        ? "le jeu compte en livres ; affiché au taux de change de FM"
        : "le jeu compte en livres ; une autre devise peut être choisie dans les réglages",
    signed: "Signé le",
    expires: "Expire le",
    joined: "Arrivé le",
    squadStatus: "Statut dans l'effectif",
    squadStatusName: (status) => SQUAD_STATUSES[status] ?? `Statut ${status}`,
    contractType: "Type de contrat",
    contractTypeName: (code) => CONTRACT_TYPES[code] ?? `Type ${code}`,
    squadNumber: "Numéro",
    transferListed: "Sur la liste des transferts",
    loanListed: "Sur la liste des prêts",

    career: "Carrière",
    internationalCaps: "Sélections internationales",
    internationalGoals: "Buts internationaux",
    u21Caps: "Sélections espoirs",
    u21Goals: "Buts en espoirs",
    askingPrice: "Prix demandé",
    notSet: "Non défini",
    reputation: "Réputation",
    reputationHome: "Nationale",
    reputationCurrent: "Actuelle",
    reputationWorld: "Mondiale",
    retirement: "Retraite",
    retires: "Prévoit de prendre sa retraite",
    noRetirement: "Le jeu n'a pas prévu sa retraite",
    keepPlaying: "Empêcher la retraite",
    keepingPlaying: "En cours…",
    keepPlayingTitle:
      "Retirer sa retraite des plans du jeu et lui donner le trait « Jouera au football aussi longtemps que " +
      "possible » à la place de « Prendra sa retraite au sommet » ; annulable dans Modifications",

    morale: (value) => `${value} / 20`,
    traits: "Traits",
    noTraits: "Aucun trait",
    traitName: (bit) => TRAIT_NAMES_FR[bit] ?? `Trait ${bit}`,
    unhappiness: "Mécontentement",
    noUnhappiness: "Rien ne le rend mécontent",
    removeUnhappiness: "Tout retirer",
    removingUnhappiness: "Retrait…",
    removeUnhappinessTitle:
      "Retirer de sa liste tous ses motifs de mécontentement, comme le « Remove all » de FMRTE ; " +
      "annulable dans Modifications",
    concernSince: (date) => `depuis le ${date}`,
    concernKind: (kind) => (kind === 1 ? "Inquiet" : kind === 2 ? "Interne" : `Type ${kind}`),
    concernMotive: (motive) => CONCERN_MOTIVES_FR[motive] ?? `Motif ${motive}`,
    clauses: "Primes et clauses",
    noClauses: "Aucune prime ni clause",
    loyaltyBonus: "Prime de fidélité",
    happiness: "Satisfaction",
    playingTimeHappiness: "Satisfaction du temps de jeu",
    moodTitle: "Telle que FMRTE l'affiche, de -100 à 100 ; le jeu l'exprime en mots",
    clauseName: (kind) => CLAUSE_NAMES_FR[kind] ?? `Clause ${kind}`,
    loan: "Prêt",
    loanAt: "Prêté à",
    loanParent: "Appartient à",
    loanFrom: "Du",
    loanUntil: "Au",
    loanNumber: "Numéro là-bas",
    recall: "Rappeler de prêt",
    recallTitle: "Le faire revenir dans son club : le prêt se termine aujourd'hui. Demande confirmation avant tout changement",
    recallAgain: "Rappeler à nouveau",
    makePermanent: "Rendre définitif",
    makePermanentTitle:
      "Le garder au club où il est prêté, sous contrat avec celui-ci. Demande confirmation avant tout changement",
    recalledWaiting: "Rappelé · retour en attente",
    endsTodayWaiting: "Se termine aujourd'hui · retour en attente",
    pendingTitle: (parent) =>
      `Aujourd'hui est le dernier jour du prêt : avancez d'un jour dans le jeu et il sera de retour à ${parent}.`,
    endPassed: (date) =>
      `Le prêt devait se terminer le ${date}, mais le jeu ne l'a pas fait revenir. Rappelez-le à nouveau, puis ` +
      "avancez d'un jour.",
    loanCanRecall: "Peut être rappelé",
    loanCanRecallTitle: "Si son club peut le rappeler dans le jeu. « Rappeler de prêt » fonctionne ici dans tous les cas",
    loanCanTerminate: "Peut être résilié avant terme",
    loanCupMatches: "Joue les matchs de coupe",
    loanAgainstClub: "Joue contre son club",
    loanOptionFee: "Option d'achat",
    loanOptionFeeTitle: "Le montant pour lequel le club où il est prêté peut le recruter définitivement",
    loanMonthlyFee: "Indemnité mensuelle",
    loanMonthlyFeeTitle: "Ce que le club où il est prêté verse à son club pour chaque mois où il joue",
    loanUnusedFee: "Indemnité mensuelle s'il ne joue pas",
    loanUnusedFeeTitle: "Ce que le club où il est prêté verse à son club pour chaque mois où il n'est pas utilisé",
    clauseCondition: (kind, value) => {
      switch (kind) {
        case 10:
          return value <= 1 ? `${value} but` : `${value} buts`;
        case 40:
          return value <= 1 ? `${value} passe décisive` : `${value} passes décisives`;
        case 41:
          return `${value} buts et passes décisives`;
        case 19:
          return value <= 1 ? `${value} sélection internationale` : `${value} sélections internationales`;
        case 11:
        case 13:
        case 25:
        case 26:
          return value <= 1 ? `${value} match de championnat` : `${value} matchs de championnat`;
        case 22:
        case 29:
          return value <= 1 ? `${value} an` : `${value} ans`;
        case 3:
        case 4:
        case 5:
        case 8:
        case 9:
        case 14:
        case 15:
        case 20:
        case 21:
          return pct(value);
        default:
          return String(value);
      }
    },
    clauseExpires: (date) => `expire le ${date}`,
    clauseExpiresAfter: (days) =>
      days <= 1 ? `expire ${days} jour après la signature` : `expire ${format(days)} jours après la signature`,
    clauseProfitShare: (percent, amount) => `${percent} de la plus-value au-delà de ${amount}`,
    clauseWage: (amount) => `${amount} par semaine`,
    moraleTitle:
      "Le jeu présente le moral comme la satisfaction générale du joueur : content à 10, plutôt heureux à 11, " +
      "extrêmement heureux à 15 et 20",
    jadednessTitle:
      "À quel point le joueur est usé par les matchs, ce que le repos efface : -500 signifie complètement reposé, " +
      "et plus la valeur est haute, plus il a besoin de repos",
    noInjuries: "Aucune blessure",
    unknownInjury: "Blessure inconnue",
    injuryStarted: (date) => `Depuis le ${date}`,
    injuryBack: (dates) => `Retour prévu : ${dates}`,
    heal: "Soigner",
    healTitle: "Soigner toutes les blessures de ce joueur dans le jeu",
    noBans: "Aucune suspension",
    banMatches: (matches) => (matches <= 1 ? `${matches} match` : `${format(matches)} matchs`),
    banStarted: (date) => `Depuis le ${date}`,
    liftBans: "Lever",
    liftBansTitle: "Lever toutes les suspensions de ce joueur dans le jeu",

    maxAttributes: "Attributs au max",
    maxAttributesTitle:
      "Mettre tous les attributs de ce joueur à leur meilleur niveau : 20, et 1 pour la prédisposition aux " +
      "blessures et la brutalité",
    maxAttributesDone: (count) =>
      count === 0 ? "Tous les attributs sont déjà au maximum" : `${changes(count)} ${count <= 1 ? "écrite" : "écrites"}`,
    maxAttributesUndone: (count) =>
      count === 0 ? "Rien n'a été annulé" : `${changes(count)} ${count <= 1 ? "annulée" : "annulées"}`,
    undoMax: "Annuler",
    undoMaxTitle: "Réécrire ses anciens attributs dans le jeu",
    freezeAttributes: "Geler les attributs",
    freezeAttributesNote:
      "Tant que l'application est ouverte et connectée, ses attributs ne baissent pas : ce que le jeu retire est " +
      "remis, et les progrès comptent toujours. L'application s'en souvient pour cette partie et les gèle à nouveau " +
      "quand elle s'y reconnecte.",
    maxStaffAttributesTitle: "Mettre tous les attributs de ce membre du staff à leur meilleur niveau : 20",
    undoMaxStaffTitle: "Réécrire les anciens attributs dans le jeu",
    freezeStaffAttributesNote:
      "Tant que l'application est ouverte et connectée, ses attributs ne baissent pas : ce que le jeu retire est " +
      "remis, et les progrès comptent toujours. L'application s'en souvient pour cette partie et les gèle à nouveau " +
      "quand elle s'y reconnecte.",
    freezeFitness: "Geler énergie et rythme",
    freezeFitnessNote:
      "Tant que l'application est ouverte et connectée, son énergie et son rythme de match ne baissent pas : ce " +
      "que le jeu retire est remis, et les gains comptent toujours ; à 100 %, il y reste. L'application " +
      "s'en souvient pour cette partie.",
    freezePositions: "Geler",
    freezePositionsInfo: "Que fait le gel des postes ?",
    freezePositionsNote:
      "Tant que l'application est ouverte et connectée, ses notes par poste restent telles quelles : il " +
      "n'apprend pas de nouveau poste, et ses notes ne montent ni ne baissent. L'application s'en souvient pour " +
      "cette partie.",

    you: "Vous",
    youTitle: "Le manager que vous contrôlez dans cette partie",
    id: "ID",
    job: "Poste",
    changeJob: "Changer de poste",
    changeJobTitle: "Donner à ce membre du staff un autre poste dans son club, dans le jeu",
    newJob: "Nouveau poste",
    applyJob: "Appliquer",
    cancelJob: "Annuler",
    unemployed: "Sans emploi",
    coaching: "Entraînement",
    knowledge: "Connaissances",
    medical: "Médical",
    playerCoach: (job) => `${job} (entraîneur-joueur)`,
    unknownJob: (code) => `Poste ${code}`,
  },

  playerList: {
    nav: "Joueurs",
    count: (total) => `${format(total)} ${total <= 1 ? "joueur" : "joueurs"}`,
    search: "Rechercher des joueurs par nom ou UID",
    summary: (total, shown, sorted) => {
      const count = `${format(total)} ${total <= 1 ? "joueur" : "joueurs"}`;
      if (total <= shown) {
        return count;
      }
      return sorted === null
        ? `${count} · les ${shown} meilleurs par niveau actuel`
        : `${count} · les ${shown} premiers par ${sorted.by}, ${sorted.ascending ? "croissant" : "décroissant"}`;
    },
    empty: (query, filtered) => {
      if (query === "") {
        return filtered ? "Aucun joueur ne correspond à ces filtres." : "Aucun joueur trouvé.";
      }
      return filtered
        ? `Aucun joueur ne correspond à ${quote(query)} avec ces filtres.`
        : `Aucun joueur ne correspond à ${quote(query)}.`;
    },
    columns: {
      name: "Nom",
      age: "Âge",
      positions: "Postes",
      nation: "Nation",
      club: "Club",
      contractExpires: "Contrat",
      born: "Naissance",
      currentAbility: "NA",
      potentialAbility: "PO",
      uid: "UID",
    },
    sortBy: (by) => `Trier par ${by}`,
    sortNames: {
      currentAbility: "niveau actuel",
      potentialAbility: "potentiel",
      age: "âge",
      name: "nom",
      nation: "nation",
      club: "club",
      contractExpires: "fin de contrat",
    },
    filters: {
      toggle: "Filtres",
      toggleActive: (count) => `Filtres, ${count} ${count <= 1 ? "actif" : "actifs"}`,
      clear: "Effacer",
      any: "Tous",
      position: "Poste",
      gender: "Genre",
      men: "Hommes",
      women: "Femmes",
      age: "Âge",
      minAge: "Âge minimum",
      maxAge: "Âge maximum",
      minPlaceholder: "Min",
      maxPlaceholder: "Max",
      minCurrentAbility: "NA min",
      minCurrentAbilityTitle: "Niveau actuel minimum",
      minPotentialAbility: "PO min",
      minPotentialAbilityTitle: "Potentiel minimum",
      abilityPlaceholder: "1–200",
      nation: "Nation",
      club: "Club",
      freeAgentsOnly: "Joueurs libres uniquement",
      contractEndsBy: "Contrat finissant avant le",
      transferListedOnly: "Sur la liste des transferts uniquement",
      loanListedOnly: "Sur la liste des prêts uniquement",
      attributes: {
        heading: "Attributs",
        attribute: "Attribut",
        pick: "Choisir un attribut",
        min: (name) => (name ? `${name} minimum` : "Minimum"),
        max: (name) => (name ? `${name} maximum` : "Maximum"),
        add: "Ajouter un attribut",
        remove: (name) => (name ? `Retirer ${name}` : "Retirer cette ligne"),
      },
      saved: {
        save: "Enregistrer",
        saveTitle: "Enregistrer sous un nom les filtres et le tri en vigueur",
        name: "Nom du filtre enregistré",
        namePlaceholder: "Nom du filtre",
        ok: "OK",
        cancel: "Annuler",
        select: "Filtres enregistrés",
        delete: "Supprimer",
        deleteTitle: (name) => `Supprimer le filtre enregistré : ${name}`,
        replaceQuestion: (name) => `Un filtre nommé ${quote(name)} existe déjà. Le remplacer ?`,
        replace: "Remplacer",
        full: (max) =>
          `Vous pouvez enregistrer jusqu'à ${max} filtres. Supprimez-en un d'abord, ou utilisez le nom d'un filtre ` +
          "enregistré pour le remplacer.",
      },
    },
  },

  staffList: {
    nav: "Staff",
    count: (total) => `${format(total)} ${total <= 1 ? "membre du staff" : "membres du staff"}`,
    search: "Rechercher dans le staff par nom ou ID",
    summary: (total, shown, sorted) => {
      const count = `${format(total)} ${total <= 1 ? "membre du staff" : "membres du staff"}`;
      if (total <= shown) {
        return count;
      }
      return sorted === null
        ? `${count} · les ${shown} meilleurs par niveau actuel`
        : `${count} · les ${shown} premiers par ${sorted.by}, ${sorted.ascending ? "croissant" : "décroissant"}`;
    },
    empty: (query, filtered) => {
      if (query === "") {
        return filtered ? "Aucun membre du staff ne correspond à ces filtres." : "Aucun membre du staff trouvé.";
      }
      return filtered
        ? `Aucun membre du staff ne correspond à ${quote(query)} avec ces filtres.`
        : `Aucun membre du staff ne correspond à ${quote(query)}.`;
    },
    columns: {
      name: "Nom",
      age: "Âge",
      job: "Poste",
      club: "Club",
      nation: "Nation",
      born: "Naissance",
      currentAbility: "NA",
      potentialAbility: "PO",
      id: "ID",
    },
    sortBy: (by) => `Trier par ${by}`,
    sortNames: {
      currentAbility: "niveau actuel",
      potentialAbility: "potentiel",
      age: "âge",
      name: "nom",
      nation: "nation",
      club: "club",
    },
    filters: {
      job: "Poste",
      anyJob: "Tous",
      unemployedOnly: "Sans emploi uniquement",
    },
  },

  clubProfile: {
    womensClub: "Club féminin",
    founded: (year) => `Fondé en ${year}`,
    reputationShort: "RÉP",
    reputationTitle: "Réputation",

    tabsLabel: "Sections du club",
    tabs: { overview: "Vue d'ensemble", squad: "Effectif", stadium: "Stade" },
    squadLocked: "Terminez la modification pour ouvrir l'effectif",

    facilities: "Installations",

    supporters: "Supporters",
    supporterMix: "Répartition des supporters",
    percent: (value) => pct(percents.format(value)),
    mixTooltip: (kind, percent) => `${kind} · ${percent}`,

    finances: "Finances",
    balance: "Solde",
    transferBudget: "Budget transferts",
    wageBudget: "Budget salarial (dépenses)",
    totalWageBudget: "Budget salarial total",
    ticketPrice: "Prix moyen du billet",
    perWeek: "par semaine",
    noFinances: "FM ne garde les finances que pour les clubs des championnats joués.",
    freeze: "Geler l'argent",
    freezeNote:
      "Tant que l'application est ouverte et connectée, le solde ne baisse pas : ce que le jeu retire est remis, " +
      "et les recettes comptent toujours. L'application s'en souvient pour cette partie et le gèle à nouveau quand " +
      "elle s'y reconnecte.",

    stadium: "Stade",
    capacity: "Capacité",
    seating: "Places assises",
    used: "Utilisée",
    usedAll: "Totale",
    usedTitle:
      "La part de la capacité que le jeu ouvre au public, quand il la limite (par exemple si des tribunes sont " +
      "fermées) ; 0 signifie la totalité",
    expansion: "Extensible jusqu'à",
    noStadium: "Le stade de ce club n'a pas pu être lu.",
    stadiumName: "Nom",
    rename: "Renommer",
    renameTitle: "Donner un autre nom au stade ; il est écrit tout de suite, et annulable dans Modifications",
    renameInfoLabel: "Comment fonctionne le renommage ?",
    renameInfo:
      "Le jeu ne garde pas les noms des stades dans ses sauvegardes : il les reprend de sa base de données à " +
      "chaque chargement. FMLibreEditor retient donc le nouveau nom pour cette partie, et le remet en quelques " +
      "secondes à chaque chargement, tant que l'application est ouverte et connectée. Si le jeu charge la partie " +
      "alors que l'application est fermée, il affiche son propre nom jusqu'à ce qu'elle se reconnecte. Pour revenir " +
      "à l'ancien nom, annulez le renommage dans Modifications, ou renommez le stade comme avant.",
    saveName: "Enregistrer",
    renaming: "Enregistrement…",
    cancelRename: "Annuler",
    nameLength: (bytes, min, max) =>
      min <= 1
        ? `${bytes} sur ${max} caractères au plus (une lettre accentuée compte pour deux)`
        : `${bytes} caractères : de ${min} à ${max}, pour tenir là où le jeu range le nom (une lettre ` +
          "accentuée compte pour deux)",
    nameShared: (holders) =>
      `${holders} éléments du jeu partagent ce nom : il ne peut pas être changé pour le stade seul`,

    info: "Infos du club",
    seasonTickets: "Abonnements",
    socialMedia: "Abonnés sur les réseaux sociaux",
  },

  clubList: {
    nav: "Clubs",
    count: (total) => `${format(total)} ${total <= 1 ? "club" : "clubs"}`,
    search: "Rechercher des clubs par nom ou UID",
    summary: (total, shown) =>
      total > shown
        ? `${format(total)} clubs · les ${shown} premiers par réputation`
        : `${format(total)} ${total <= 1 ? "club" : "clubs"}`,
    empty: (query, filtered) => {
      if (query === "") {
        return filtered ? "Aucun club ne correspond à ce filtre." : "Aucun club trouvé.";
      }
      return filtered
        ? `Aucun club ne correspond à ${quote(query)} avec ce filtre.`
        : `Aucun club ne correspond à ${quote(query)}.`;
    },
    women: "Femmes",
    columns: {
      name: "Nom",
      reputation: "Réputation",
      founded: "Fondation",
      uid: "UID",
    },
    filters: {
      kind: "Clubs à afficher",
      all: "Tous les clubs",
      men: "Clubs masculins",
      women: "Clubs féminins",
    },
  },

  app: {
    stage: "bêta",
    settingsLabel: "Réglages",
    languageLabel: "Langue",
    currencyLabel: "Devise",

    noteEditable:
      "Les modifications n'atteignent le jeu que lorsque vous les appliquez. Sauvegardez votre partie d'abord.",
    noteReadOnly: "Lecture seule : Windows n'a pas autorisé FMLibreEditor à écrire dans le jeu.",
    noteUnknownBuild: "Lecture seule : cette version du jeu est nouvelle pour FMLibreEditor.",
    noteNotConnected: "Rien ne change dans le jeu tant que vous ne modifiez pas et n'appliquez pas.",

    notConnected: "Non connecté",
    previewTag: "aperçu navigateur · données d'exemple",
    noDate: "Pas de date de jeu",
    noDateTitle:
      "FMLibreEditor n'a pas pu lire la date du jeu dans cette version : les âges ne sont donc pas affichés et " +
      "les filtres d'âge ne trouvent personne. Vérifiez les mises à jour.",
    reload: "Relire les données",
    refresh: "Actualiser",
    detecting: "Recherche de Football Manager…",
    connecting: "Lecture des joueurs, du staff et des clubs…",
    reloading: "Relecture des joueurs, du staff et des clubs…",

    refrozen: {
      title: "Gelé à nouveau depuis la dernière fois",
      waitingTitle: "Ce qui était gelé est en attente pour l'instant",
      players: (names) => `Attributs : ${names}`,
      staff: (names) => `Attributs du staff : ${names}`,
      clubs: (names) => `Argent : ${names}`,
      fitness: (names) => `Énergie et rythme : ${names}`,
      positions: (names) => `Postes : ${names}`,
      stadiums: (names) => `Noms de stade : ${names}`,
      more: (count) => `et ${format(count)} de plus`,
      waiting: (count) =>
        `${count <= 1 ? `${count} élément est retenu mais n'est` : `${format(count)} éléments sont retenus mais ne sont`}` +
        " pas gelés pour l'instant : FMLibreEditor ne peut pas encore écrire dans cette version du jeu.",
      dismiss: "Fermer",
    },

    freezeInfo: {
      label: "Comment fonctionne le gel ?",
      note:
        "Le gel ne modifie pas le jeu définitivement : toutes les 2 secondes, FMLibreEditor remet ce que le jeu a " +
        "retiré. Cela ne fonctionne donc que tant que l'application est ouverte et connectée ; fermez-la, et le " +
        "jeu les modifie à nouveau. L'application retient ce qui est gelé dans cette partie et le gèle à nouveau à la " +
        "prochaine connexion.",
    },

    connect: {
      title: "Se connecter à Football Manager 27",
      intro:
        "FMLibreEditor lit la mémoire du jeu pendant qu'il tourne. Lancez le jeu et chargez une partie, puis connectez-vous.",
      notRunning: "Football Manager 27 n'est pas lancé.",
      openFailed: (error) => `Impossible d'ouvrir le jeu : ${error}`,
      game: "Jeu",
      gameData: "Données du jeu",
      loaded: "Chargées",
      stillLoading: "Chargement en cours ; attendez le menu principal",
      process: "Processus",
      pid: (pid) => `pid ${pid}`,
      several: "Plusieurs copies du jeu sont lancées ; la première est utilisée.",
      button: "Se connecter et lire les joueurs, le staff et les clubs",

      bridge: {
        title: "Le pont (macOS)",
        intro:
          "macOS ne laisse aucune application accéder à la mémoire d'une autre : FM27 doit donc transmettre sa " +
          "mémoire lui-même. Il le fait dès qu'il charge le pont de FMLibreEditor, une petite bibliothèque qui ne " +
          "modifie rien dans le jeu et ne donne sa mémoire qu'à cette application. Une option de lancement dans Steam " +
          "fait charger le pont par FM27.",
        library: "Pont",
        installed: "Installé",
        missing: "Non installé",
        launchOption: "Option de lancement",
        set: "Définie dans Steam",
        notSet: "Non définie",
        ready:
          "Prêt. Lancez FM27 depuis Steam (quittez-le et relancez-le s'il tourne), chargez une partie, puis connectez-vous.",
        steamRunning:
          "Steam est ouvert et conserve les options de lancement tant qu'il l'est. Quittez Steam pour que l'option " +
          "de lancement soit définie pour vous, ou saisissez-la vous-même dans Steam.",
        setUp: "Installer le pont",
        remove: "Retirer le pont",
        manual:
          "Ou, dans Steam, clic droit sur Football Manager 27 › Propriétés › Général › Options de lancement, et saisissez :",
        copy: "Copier",
        copied: "Copié",
      },
    },
  },

  graphics: {
    reading: "Lecture des packs graphiques…",
    summary: ({ clubLogos, flags, faces }) =>
      `Graphismes : ${format(clubLogos)} ${clubLogos <= 1 ? "logo" : "logos"} · ` +
      `${format(flags)} ${flags <= 1 ? "drapeau" : "drapeaux"} · ${format(faces)} ${faces <= 1 ? "visage" : "visages"}`,
    none: "Aucun pack graphique trouvé",
    noneHint: "Les packs de logos et de visages vont dans le dossier graphics de FM27.",
  },

  compatibility: {
    unknownBuild: (game) => `FMLibreEditor n'a pas encore été testé avec ${game}`,
    unknownBuildText:
      "Le jeu a probablement été mis à jour. FMLibreEditor a trouvé les données du jeu et les a vérifiées, mais il " +
      "n'écrit pas dans une version avec laquelle il n'a pas été testé tant que vous ne l'autorisez pas. Une nouvelle " +
      "version de FMLibreEditor suit généralement en quelques jours.",
    allowedText:
      "La modification est activée pour cette session, dans la limite des vérifications. Gardez une sauvegarde de votre partie.",
    failedTitle: "Certaines données du jeu n'ont pas passé les vérifications",
    reloadHint: "Si une partie était encore en cours de chargement, « Relire les données » vérifie à nouveau.",
    noDate: "La date du jeu n'a pas passé les vérifications : aucun âge n'est affiché.",
    failed: (names) => `En lecture seule : ${names}.`,
    join: (names) =>
      names.length <= 1 ? names.join("") : `${names.slice(0, -1).join(", ")} et ${names[names.length - 1]}`,
    allow: "Modifier quand même",
    allowTitle:
      "Activer la modification jusqu'à la fermeture de FMLibreEditor ou la prochaine connexion. Sauvegardez votre partie d'abord.",
  },

  checks: {
    gameDate: "la date du jeu",
    players: "les informations des joueurs",
    positions: "les postes",
    attributes: "les attributs",
    personality: "la personnalité",
    liveValues: "l'énergie, le rythme de match, l'usure et le moral",
    contracts: "les contrats",
    teams: "les équipes",
    staff: "le staff",
    clubs: "les clubs",
  },

  update: {
    available: (version) => `FMLibreEditor ${version} est disponible`,
    youHave: (version) => `Vous avez la ${version}.`,
    download: "Télécharger",
    install: "Mettre à jour",
    installTitle: "Télécharger et installer la nouvelle version ; FMLibreEditor se ferme et se rouvre avec elle",
    preparing: "Préparation…",
    downloading: (percent) => (percent === null ? "Téléchargement…" : `Téléchargement… ${pct(percent)}`),
    installing: "Installation : FMLibreEditor se ferme et se rouvre avec la nouvelle version.",
    installFailed: (reason) => `Mise à jour impossible : ${reason}. Téléchargez-la plutôt depuis sa page.`,
    notInstallable: "Cette version ne peut pas être installée d'ici. Téléchargez-la plutôt depuis sa page.",
    later: "Plus tard",
    check: "Rechercher des mises à jour",
    checking: "Recherche de mises à jour…",
    upToDate: "Vous avez la dernière version.",
    failed: "Impossible de rechercher des mises à jour.",
  },

  edit: {
    unknownNation: "Nation inconnue",
    edit: "Modifier",
    editTitle: "Modifier les valeurs de ce profil dans le jeu",
    startFailed: (reason) => `Impossible de commencer la modification : ${reason}`,
    positionRating: (position) => `Note au poste ${position}`,
    was: (value) => `était ${value}`,
    invalid: (min, max) => `Saisissez un nombre entier de ${min} à ${max}`,
    invalidDate: (from, to) => `Saisissez une date du ${from} au ${to}`,
    invalidMoney: (from, to) => `Saisissez un montant entier de ${from} à ${to}`,
    invalidPercentage: (from, to) => `Saisissez un pourcentage entier de ${from} à ${to}`,
    percent: "%",
    yes: "Oui",
    no: "Non",
    none: "aucun",

    footer: "Modification",
    changes: changeCount,
    invalidCount: (count) => `${count} ${count <= 1 ? "invalide" : "invalides"}`,
    review: "Vérifier",
    reviewList: "Modifications à appliquer",
    discard: "Abandonner",
    apply: "Appliquer",
    applying: "Application…",
    applyBlocked: "Corrigez d'abord les valeurs invalides",
    done: "Terminé",
    confirmDiscard: (count) => `Abandonner ${changes(count)} ?`,
    keepEditing: "Continuer à modifier",

    applied: (count) => `${changes(count)} ${count <= 1 ? "appliquée" : "appliquées"}`,
    nothingToChange: "Rien à modifier : le jeu a déjà ces valeurs.",
    refused: (label, reason) => `${label} : ${reason}`,
    rereadFailed: (reason) => `Impossible de relire les valeurs : ${reason}`,
    dismiss: "Fermer",
  },

  changes: {
    nav: "Modifications",
    title: "Modifications de cette session",
    hint:
      "Les plus récentes en premier. Une modification ne peut être annulée que tant que le jeu garde la valeur écrite.",
    continueHint: "Le jeu affiche une modification une fois qu'il avance : appuyez sur Continuer dans le jeu.",
    swappedWith: (name) => `Échangé avec ${name}`,
    released: (name) => `${name} libéré`,
    fee: (amount) => `Indemnité ${amount}`,
    optionRemoved: (amount) => `Option d'achat (${amount}) retirée`,
    healed: (count) => (count <= 1 ? `${count} blessure soignée` : `${format(count)} blessures soignées`),
    lifted: (count) => (count <= 1 ? `${count} suspension levée` : `${format(count)} suspensions levées`),
    keptPlaying: (date) => (date === null ? "Continuera à jouer" : `Retraite du ${date} empêchée`),
    count: (total, undone) => {
      const count = changeCount(total);
      return undone === 0 ? count : `${count} · ${undone} ${undone <= 1 ? "annulée" : "annulées"}`;
    },
    empty:
      "Aucune modification pour l'instant. Ouvrez un joueur, un membre du staff ou un club et choisissez Modifier, " +
      "ou utilisez Modification en masse dans une liste.",
    columns: {
      time: "Heure",
      name: "Nom",
      field: "Champ",
      change: "Modification",
      status: "État",
    },
    kinds: { player: "Joueur", staff: "Staff", club: "Club" },
    stored: (change) => `stocké ${change}`,
    undone: (time) => `Annulée à ${time}`,
    undo: "Annuler",
    undoTitle: (label) => `Réécrire l'ancienne valeur de ${label} dans le jeu`,
    batch: "Modification en masse",
    batchCount: (total, remaining) =>
      remaining === 0
        ? `${changeCount(total)} · toutes annulées`
        : `${changeCount(total)} · ${format(remaining)} non ${remaining <= 1 ? "annulée" : "annulées"}`,
    showChanges: "Afficher les modifications",
    hideChanges: "Masquer les modifications",
    undoBatch: "Annuler la modification en masse",
    undoBatchTitle: (remaining) =>
      `Réécrire dans le jeu les anciennes valeurs de cette modification en masse (${format(remaining)} encore en place)`,

    pages: "Pages de la liste",
    batchPages: "Pages des modifications de cette modification en masse",
    previous: "Précédent",
    next: "Suivant",
    range: (first, last, total) => `${format(first)}–${format(last)} sur ${format(total)}`,
  },

  export: {
    button: "Exporter",
    buttonTitle: {
      player: "Écrire les joueurs affichés par la liste dans un fichier CSV ou JSON, pour un tableur ou un script",
      club: "Écrire les clubs affichés par la liste dans un fichier CSV ou JSON, pour un tableur ou un script",
    },
    title: { player: "Exporter les joueurs", club: "Exporter les clubs" },
    scope: (entity, count) =>
      count === 0
        ? `Aucun ${nouns[entity].one} ne correspond à la recherche et aux filtres.`
        : `${entityCount(entity, count)} : ce que sélectionnent la recherche et les filtres de la liste, dans son ordre.`,
    formatLabel: "Format",
    formats: {
      csv: "CSV, séparé par des virgules",
      csvSemicolon: "CSV, séparé par des points-virgules",
      json: "JSON",
    },
    formatHints: {
      csv: "Pour la plupart des tableurs et des scripts",
      csvSemicolon: "Pour Excel quand les décimales s'écrivent avec une virgule, comme en français",
      json: {
        player: "Pour les scripts : postes, attributs et personnalité comme objets à part",
        club: "Pour les scripts : supporters, installations, stade et finances comme objets à part",
      },
    },
    contents: {
      player:
        "Pour chaque joueur : niveaux, postes et notes par poste, attributs sur l'échelle 1–20 (cachés compris), " +
        "personnalité, réputation, sélections, et contrat avec ses clauses, avec la date du jeu. L'argent est en " +
        "livres, comme le jeu le compte. Rien ne change dans le jeu.",
      club:
        "Pour chaque club : réputation, année de fondation, abonnements, abonnés sur les réseaux sociaux, " +
        "répartition et traits des supporters, installations, stade et finances (solde, budget transferts, masse " +
        "salariale hebdomadaire et budget salarial, prix du billet), avec la date du jeu. FM ne garde les finances que " +
        "pour les clubs des championnats joués. L'argent est en livres, comme le jeu le compte. Rien ne change dans le jeu.",
    },
    export: "Exporter",
    exporting: "Export…",
    done: (entity, count, file) =>
      `${entityCount(entity, count)} ${count <= 1 ? "exporté" : "exportés"} dans ${file}`,
    folder: (folder) => `dans ${folder}`,
    skipped: (entity, count) =>
      count <= 1
        ? `${entityCount(entity, count)} a changé dans le jeu pendant la lecture et a été laissé de côté.`
        : `${entityCount(entity, count)} ont changé dans le jeu pendant la lecture et ont été laissés de côté.`,
    open: "Ouvrir",
    openTitle: "Ouvrir le fichier avec l'application que votre système utilise pour ce type",
    show: "Afficher dans le dossier",
    showTitle: "Afficher le fichier dans son dossier",
    close: "Fermer",
  },

  massEdit: {
    button: "Modification en masse",
    buttonTitle: "Modifier les valeurs de tout ce qu'affiche la liste, avec un aperçu d'abord",
    title: {
      player: "Modifier des joueurs en masse",
      staff: "Modifier le staff en masse",
      club: "Modifier des clubs en masse",
    },

    scope: (entity, total) =>
      `${total <= 1 ? "Le" : "Les"} ${entityCount(entity, total)} ${total <= 1 ? "affiché" : "affichés"} par la liste ` +
      "(recherche et filtres)",
    scopeAll: (shown) => `Cela couvre tous les résultats, pas seulement les ${format(shown)} premières lignes à l'écran.`,
    scopeNone: (entity) =>
      `Aucun ${nouns[entity].one} ne correspond à la recherche et aux filtres : il n'y a rien à modifier.`,
    scopeTooMany: (entity, total, limit) =>
      `Les ${entityCount(entity, total)} affichés par la liste dépassent ce qu'accepte une modification en masse ` +
      `(${format(limit)}). Réduisez d'abord la recherche ou les filtres.`,
    loadingFields: "Lecture des champs…",
    fieldsFailed: (reason) => `Impossible de lire les champs : ${reason}`,

    groups: {
      ability: "Niveau",
      technical: "Attributs techniques",
      mental: "Attributs mentaux",
      physical: "Attributs physiques",
      goalkeeping: "Attributs de gardien",
      hidden: "Attributs cachés",
      feet: "Pieds",
      coaching: "Attributs d'entraînement",
      knowledge: "Attributs de connaissances",
      medical: "Attributs médicaux",
      positions: "Postes",
      personality: "Personnalité",
      reputation: "Réputation",
      international: "International",
      contract: "Contrat",
      facilities: "Installations",
      finances: "Finances",
      stadium: "Stade",
      traits: "Traits",
      health: "Médical",
      other: "Autres",
    },
    fieldsLabel: "Champs à modifier",
    row: (position) => `Modification ${position}`,
    field: "Champ",
    operation: "Opération",
    operations: { set: "Fixer à", add: "Ajouter", scale: "Mettre à l'échelle (%)" },
    values: { set: "Valeur", add: "Quantité", scale: "Pourcentage" },
    addTitle: "Ajouté à chaque valeur telle qu'affichée ; un nombre négatif retranche",
    addPointsTitle:
      "Points de pourcentage ajoutés à chaque valeur (70 % plus 10 donne 80 %) ; un nombre négatif retranche",
    rangeHint: (min, max) => `${format(min)}–${format(max)}`,
    amountHint: (max) => `±${format(max)}`,
    ofCurrent: "% de l'actuel",
    percentTitle:
      "Un pourcentage de la valeur actuelle : 100 la garde, 110 l'augmente d'un dixième, 50 la divise par deux",
    invalidAdd: (min, max) => `Saisissez un nombre entier de ${format(min)} à ${format(max)}`,
    invalidPercent: (min, max) => `Saisissez un pourcentage entier de ${min} à ${max}`,
    dateSetOnly: "Une date peut seulement être fixée",
    addField: "Ajouter un champ",
    addFieldFull: (max) => `Une modification en masse change jusqu'à ${max} champs`,
    remove: "Retirer ce champ",
    removeLast: "Une modification en masse a besoin d'au moins un champ",

    preview: "Aperçu",
    previewing: "Aperçu…",
    previewBlocked: "Remplissez chaque champ avec une valeur valide pour voir l'aperçu",
    summary: (entity, preview) =>
      [
        preview.changes === 0
          ? "Aucune modification"
          : `${changes(preview.changes)} pour ${format(preview.targets - preview.unchanged)} sur ` +
            entityCount(entity, preview.targets),
        preview.unchanged > 0 &&
          (preview.unchanged <= 1
            ? `${preview.unchanged} a déjà ces valeurs`
            : `${format(preview.unchanged)} ont déjà ces valeurs`),
        preview.skippedCount > 0 && valuesLeftAlone(preview.skippedCount),
      ]
        .filter(Boolean)
        .join(" · "),
    tableLabel: "Modifications que ferait la modification en masse",
    columns: { name: "Nom", field: "Champ", change: "Modification", reason: "Raison" },
    more: (count) => `et ${format(count)} de plus`,
    skippedHeading: valuesLeftAlone,
    skippedLabel: "Valeurs que la modification en masse laisse telles quelles",

    apply: "Appliquer",
    applying: "Application…",
    applyTitle: (count) => `Écrire ${changes(count)} dans le jeu`,
    applyFirst: "Lancez d'abord l'aperçu de la modification en masse",
    applyNothing: "L'aperçu ne contient aucune modification à écrire",
    hint: "Rien ne change dans le jeu tant que vous n'appliquez pas.",
    applied: (count) =>
      count === 0 ? "Aucune modification n'a été écrite" : `${changes(count)} ${count <= 1 ? "appliquée" : "appliquées"}`,
    failure: (name, label, reason) => `${name} · ${label} : ${reason}`,
    undo: "Annuler cette modification en masse",
    undoing: "Annulation…",
    undoTitle: "Réécrire dans le jeu les anciennes valeurs de cette modification en masse",
    undone: (count) =>
      count === 0 ? "Rien n'a été annulé" : `${changes(count)} ${count <= 1 ? "annulée" : "annulées"}`,
    undoFailure: (who, reason) => `${who} : ${reason}`,
    changeNumber: (id) => `Modification ${id}`,
    close: "Fermer",
  },

  comparison: {
    compare: "Comparer",
    add: "Ajouter à la comparaison",
    remove: "Retirer de la comparaison",
    full: (max) => `Une comparaison compte jusqu'à ${max} joueurs. Retirez-en un pour ajouter celui-ci.`,

    trayLabel: "Joueurs à comparer",
    removePlayer: (name) => `Retirer de la comparaison : ${name}`,
    clear: "Effacer",
    open: (count) => `Comparer (${count})`,

    title: "Comparaison",
    hint: "La meilleure valeur de chaque ligne est mise en évidence : la plus haute, ou la plus basse quand plus bas est mieux.",
    tooFew: "Ajoutez au moins deux joueurs pour les comparer.",
    loading: "Chargement des joueurs…",
    tableLabel: "Valeurs des joueurs comparés",
    highest: "la plus haute",
    lowest: "la plus basse",
    profile: "Profil",
    close: "Fermer",
  },

  move: {
    button: "Transférer",
    buttonTitle: "Transférer ce joueur vers un autre club dans le jeu, avec une indemnité si vous le souhaitez",

    title: "Transfert",
    from: "De",
    to: "Vers",

    modeLabel: "Transfert ou échange",
    modeMove: "Transférer vers un club",
    modeSwap: "Échanger avec un joueur",

    searchLabel: "Rechercher le club de destination",
    resultsLabel: "Clubs trouvés",
    searching: "Recherche des clubs…",
    searchFailed: (reason) => `Impossible de rechercher les clubs : ${reason}`,
    more: (count) => `et ${format(count)} de plus ; tapez pour affiner la recherche`,
    change: "Choisir un autre club",

    feeHeading: "Indemnité",
    fee: "Indemnité de transfert",
    feeHint: "Laissez vide pour un transfert libre",
    feeInvalid: (max) => `Saisissez un montant entier, de 0 à ${max}`,
    pays: (club, fee, balance, budget) =>
      `${club} paie ${fee} : solde ${balance}${budget === null ? "" : `, budget transferts ${budget}`}`,
    receives: (club, fee, balance) => `${club} reçoit ${fee} : solde ${balance}`,
    noFinances: (club) => `${club} n'a pas de finances dans le jeu : son argent reste tel quel`,

    wageInvalid: "Saisissez un montant entier, 0 ou plus",
    expiresInvalid: "Saisissez une date",

    chooseClub: "Choisissez le club vers lequel transférer le joueur.",
    fixTerms: "Corrigez d'abord l'indemnité ou les valeurs du contrat.",
    checking: "Vérification du transfert…",
    route: (from, to) => `${from} → ${to}`,
    doesHeading: "Ce que fait le transfert",
    does: [
      "Rejoint l'équipe première du nouveau club",
      "Contrat daté du jour du jeu ; numéro de maillot retiré",
      "Sort des listes des transferts et des prêts",
      "Le salaire et la fin de contrat ne changent que si vous en fixez de nouveaux",
      "L'indemnité est prise sur le solde et le budget transferts du club acheteur, et versée sur le solde du club vendeur",
      "Un éventuel brassard dans l'ancien club reste vacant",
      "L'historique des transferts du jeu ne le mentionne pas encore",
      "Listé dans Modifications, où une seule annulation reprend le transfert et l'indemnité",
    ],

    noRoom: (club) => `${club} n'a plus de place dans son effectif.`,
    noRoomInfoLabel: "Pourquoi ?",
    noRoomInfo:
      "L'éditeur agrandit une liste d'effectif pleine quand il le peut, mais pas celle-ci : un joueur doit partir " +
      "pour faire de la place.",
    noRoomNeed: (player, club) => `Pour que ${player} arrive, un joueur doit quitter ${club}.`,
    releaseChoice: "Libérer :",
    releasePickLabel: "Joueur à libérer",
    releaseOutcome: "→ devient libre",
    injuredTag: "blessé",
    captainTag: "capitaine",
    swapChoice: "En faire un échange :",
    swapChoiceOutcome: (club) => `ce joueur part à ${club}`,
    moveAndRelease: (name) => `Transférer et libérer ${name}`,
    makeRoomDoes: [
      "Rejoint l'équipe première du nouveau club, à la place du joueur libéré",
      "Le joueur libéré quitte toutes les équipes de ce club et son contrat prend fin : il est libre",
      "Contrat daté du jour du jeu ; numéro de maillot retiré",
      "Sort des listes des transferts et des prêts",
      "Le salaire et la fin de contrat ne changent que si vous en fixez de nouveaux",
      "L'indemnité est prise sur le solde et le budget transferts du club acheteur, et versée sur le solde du club vendeur",
      "Un éventuel brassard de l'un ou l'autre dans le club qu'il quitte reste vacant",
      "L'historique des transferts du jeu ne le mentionne pas encore",
      "Listé dans Modifications comme une seule modification, où une annulation reprend le transfert, la libération et l'indemnité",
    ],

    swapTitle: "Échanger avec un joueur",
    swapWith: "Échanger avec",
    playerSearchLabel: "Rechercher le joueur avec qui échanger",
    playerSearch: "Rechercher les joueurs de ce club par nom",
    playersLabel: "Joueurs trouvés",
    playersSearching: "Recherche des joueurs…",
    playersSearchFailed: (reason) => `Impossible de rechercher les joueurs : ${reason}`,
    playersEmpty: (query) =>
      query === "" ? "Ce club n'a aucun joueur." : `Aucun joueur de ce club ne correspond à ${quote(query)}.`,
    changePlayer: "Choisir un autre joueur",

    swapContract: "Chaque joueur garde son contrat ; salaires et fins de contrat ne changent pas.",
    staffButtonTitle: "Déplacer ce membre du staff vers un autre club dans le jeu",
    staffChooseClub: "Choisissez le club vers lequel déplacer ce membre du staff.",
    staffContract: "Garde son poste, son salaire et sa fin de contrat ; le contrat est daté du jour du jeu.",
    staffJob: "Poste",
    staffJobChoose: "Choisir un poste…",
    staffJobKept: (job) => `${job} (le garde)`,
    staffNewJob:
      "Prend le nouveau poste, et garde son salaire et sa fin de contrat ; le contrat est daté du jour du jeu.",
    staffDoes: [
      "Rejoint le nouveau club là où se trouve le poste : son staff médical, technique ou de recrutement, ou " +
        "comme directeur sportif ou manager, ce qu'un club qui en a déjà un refuse",
      "Même salaire et même fin de contrat ; le contrat est daté du jour du jeu",
      "Un manager qui quitte une équipe laisse sa place vacante, au club de la pourvoir ; la direction est laissée au jeu",
      "Listé dans Modifications, où il peut être annulé",
    ],
    staffSignButtonTitle: "Engager ce membre du staff sans club pour un club, dans le jeu",
    staffSignTitle: "Engager un membre du staff",
    staffSignChooseClub: "Choisissez le club pour lequel l'engager.",
    staffSignChooseJob: "Choisissez le poste qu'il occupera au club.",
    staffSignTerms:
      "Laissez vide pour le salaire du membre du staff du club dont le poste ressemble le plus au sien, et un contrat " +
      "jusqu'à la fin de la saison prochaine.",
    staffSignRoute: (to) => `Sans club → ${to}`,
    staffSignContract: (wage, expires) => `Nouveau contrat : ${wage} par semaine jusqu'au ${expires}`,
    staffSignDoes: [
      "Rejoint le club là où se trouve le poste : son département, agrandi s'il est plein, ou comme directeur " +
        "sportif ou manager, s'il n'en a pas",
      "Un nouveau contrat à partir du jour du jeu, dans l'un des emplacements de contrat libres du jeu, comme le jeu en crée",
      "Calqué sur le contrat du membre du staff du club au même poste (sinon du même département, sinon n'importe " +
        "lequel) le plus proche de son niveau",
      "Votre salaire et votre fin de contrat, ou le salaire de ce contrat et la fin de la saison prochaine ; ni " +
        "clauses ni primes",
      "Listé dans Modifications, où une seule annulation reprend tout",
    ],
    swapChooseClub: "Choisissez le club du joueur avec qui échanger.",
    swapChoosePlayer: "Choisissez le joueur avec qui échanger.",
    swapChecking: "Vérification de l'échange…",
    swapRoute: (player, from, to, other) => `${player} : ${from} → ${to}\n${other} : ${to} → ${from}`,
    swapDoesHeading: "Ce que fait l'échange",
    swapDoes: [
      "Chacun rejoint l'équipe première du club de l'autre",
      "Contrats datés du jour du jeu ; numéros de maillot retirés",
      "Les deux sortent des listes des transferts et des prêts",
      "Un éventuel brassard dans leurs anciens clubs reste vacant",
      "Aucune indemnité n'est versée ; l'historique de carrière n'est pas mis à jour",
      "Listé dans Modifications comme une seule modification, qui annule les deux mouvements",
    ],

    signButtonTitle: "Engager ce joueur libre pour un club, dans le jeu",
    signTitle: "Engager un joueur libre",
    signChooseClub: "Choisissez le club pour lequel engager le joueur.",
    signChecking: "Vérification de la signature…",
    signTerms:
      "Laissez vide pour le salaire du joueur du club le plus proche de son niveau, et un contrat jusqu'à la fin de " +
      "la saison prochaine.",
    signRoute: (to) => `Libre → ${to}`,
    signContract: (wage, expires, status) =>
      `Nouveau contrat : ${wage} par semaine jusqu'au ${expires}, ${status}`,
    signDoesHeading: "Ce que fait la signature",
    signDoes: [
      "Rejoint l'équipe première du club ; une liste d'effectif pleine est agrandie",
      "Un nouveau contrat à partir du jour du jeu, dans l'un des emplacements de contrat libres du jeu, comme le jeu en crée",
      "Calqué sur le contrat du joueur du club le plus proche de son niveau : même type de contrat et même statut",
      "Votre salaire et votre fin de contrat, ou le salaire de ce joueur et la fin de la saison prochaine",
      "Ni numéro de maillot, ni prime de fidélité, ni clauses, ni primes",
      "L'historique des transferts du jeu ne le mentionne pas encore",
      "Listé dans Modifications, où une seule annulation reprend tout",
    ],
    signHint: "Rien ne change dans le jeu tant que vous n'appuyez pas sur Engager.",
    sign: "Engager",
    signing: "Signature…",

    hint: "Rien ne change dans le jeu tant que vous n'appuyez pas sur Transférer.",
    move: "Transférer",
    moving: "Transfert…",
    cancel: "Annuler",
    swapHint: "Rien ne change dans le jeu tant que vous n'appuyez pas sur Échanger.",
    swap: "Échanger",
    swapping: "Échange…",
  },

  ties: {
    heading: "Nationalité et formation locale",
    nationalities: "Nationalités secondaires",
    trainedInNation: "Formé dans le pays",
    trainedAtClub: "Formé au club",
    workPermit: "Sans permis de travail en",
    none: "Aucune",
    rules: {
      1: "Formé localement 15-21",
      2: "Formé localement 0-21",
      5: "Formé localement 15-21 (hors prêts)",
      10: "Formé localement 0-19 (1 an)",
    },
    rule: (code) => `Règle de formation locale ${format(code)}`,

    change: "Modifier",
    changeTitle: "Modifier les nationalités secondaires et le statut de joueur formé localement dans le jeu",
    title: "Nationalité et formation locale",
    hint: "Chaque modification est écrite tout de suite dans le jeu, et listée dans Modifications, où elle peut être annulée.",
    full:
      "Le jeu a dimensionné la liste de ce joueur au plus juste : une nationalité ou une formation peut être " +
      "modifiée ou retirée, mais pas ajoutée.",
    nationOf: (name) => `Nation à la place de ${name}`,
    ruleOf: (name) => `Règle de formation locale pour ${name}`,
    remove: "Retirer",
    removeTitle: (name) => `Retirer ${name}`,
    addNationality: "Ajouter une nationalité…",
    addNation: "Ajouter un pays…",
    addPermit: "Ajouter un pays sans permis requis…",
    daysLeft: (days) => `${format(days)} ${days <= 1 ? "jour restant" : "jours restants"}`,
    permitInfoLabel: "À quoi cela sert-il ?",
    permitInfo:
      "Le jeu permet aux joueurs de l'Union européenne présents en Angleterre ou en Écosse avant le Brexit d'y jouer " +
      "sans permis de travail pendant un certain nombre de jours. Un joueur à qui l'on donne ceci n'a pas besoin de " +
      "permis de travail dans ce pays non plus, pour autant de jours qu'il leur en reste (dix ans si personne n'en a " +
      "dans la partie).",
    newRule: "Règle de formation locale du nouveau pays",
    add: "Ajouter",
    changeClub: "Changer de club",
    changeClubTitle: (name) => `Le faire formé dans un autre club à la place de ${name}`,
    clubInsteadOf: (name) => `Club à la place de ${name}`,
    addClub: "Ajouter un club…",
    addClubTitle: "Le faire formé dans un club de plus",
    newClub: "Nouveau club",
    pickAnother: "En choisir un autre",
    newClubRule: "Règle de formation locale du nouveau club",
    cancel: "Annuler",
    working: "Écriture dans le jeu…",
    close: "Fermer",
  },

  clauses: {
    change: "Modifier",
    changeTitle: "Modifier les primes et les clauses de ce joueur dans le jeu",
    title: "Primes et clauses",
    hint: "Chaque modification est écrite tout de suite dans le jeu, et listée dans Modifications, où elle peut être annulée.",
    full:
      "Le jeu a dimensionné la liste de ce contrat au plus juste : une prime ou une clause peut être modifiée " +
      "ou retirée, mais une clause libératoire ne peut pas être ajoutée.",
    amountOf: (name) => `Montant de ${name}`,
    conditionOf: (name) => `Condition de ${name}`,
    save: "Enregistrer",
    remove: "Retirer",
    removeTitle: (name) => `Retirer ${name}`,
    addRelease: "Ajouter une clause libératoire",
    releaseAmount: "Montant de la nouvelle clause libératoire",
    add: "Ajouter",
    outOfRange: (max) => `Saisissez un nombre entier de 0 à ${max}.`,
    working: "Écriture dans le jeu…",
    close: "Fermer",
  },

  release: {
    button: "Libérer",
    buttonTitle: "Libérer ce joueur de son club dans le jeu : il devient libre",

    title: "Libération",
    from: "Quitte",
    checking: "Vérification de la libération…",
    ready: (club) => `${club} → libre`,
    doesHeading: "Ce que fait la libération",
    does: [
      "Quitte toutes les équipes du club, et le contrat prend fin : un joueur libre que tout club peut engager",
      "Personne ne reçoit rien",
      "Un éventuel brassard dans le club reste vacant",
      "L'historique des transferts du jeu ne le mentionne pas",
      "Listé dans Modifications, où une seule annulation ramène le joueur avec le même contrat",
    ],

    hint: "Rien ne change dans le jeu tant que vous n'appuyez pas sur Libérer.",
    release: "Libérer",
    releasing: "Libération…",
    cancel: "Annuler",
  },

  permanent: {
    title: "Rendre le prêt définitif",
    stays: "Reste à",
    leaves: "Quitte",
    checking: "Vérification…",
    doesHeading: "Ce que cela fait",
    does: [
      "Il reste là où il joue, désormais sous contrat avec ce club à partir d'aujourd'hui, aux conditions ci-dessus",
      "Il garde le numéro de maillot et le statut qu'il a là-bas",
      "Il quitte toutes les équipes de son propre club, et le prêt prend fin",
      "L'historique des transferts du jeu ne le mentionne pas",
      "Listé dans Modifications comme un transfert, où une seule annulation rétablit le prêt",
    ],
    optionFee: (money) => `Repris de l'option d'achat du prêt : ${money}`,
    hint: "Rien ne change dans le jeu tant que vous n'appuyez pas sur Rendre définitif.",
    confirm: "Rendre définitif",
    confirming: "En cours…",
    cancel: "Annuler",
  },

  recall: {
    title: "Rappeler de prêt",
    from: "Prêté à",
    to: "Revient à",
    doesHeading: "Ce que fait le rappel",
    does: (parent) => [
      "Aujourd'hui devient le dernier jour du prêt : à la fin de la journée, le jeu met fin au prêt lui-même",
      `Avancez d'un jour dans le jeu et il sera de retour à ${parent}`,
      "D'ici là, c'est listé dans Modifications, où une annulation remet l'ancienne fin du prêt",
    ],
    termsHeading: "Dans le jeu",
    notRecallable: (parent) => `Le prêt ne permet pas à ${parent} de le rappeler`,
    notTerminable: "Le prêt ne peut pas être résilié avant terme",
    worksAnyway:
      "Le rappel fonctionne ici malgré tout : il ne passe pas par le rappel du jeu, il avance le dernier jour du prêt",
    dropsOption: (club, amount) =>
      `L'option d'achat de ${club} pour ${amount} est retirée : sinon, à la fin du prêt, le jeu pourrait le ` +
      `vendre à ${club}`,
    hint: "Rien ne change dans le jeu tant que vous n'appuyez pas sur Rappeler.",
    confirm: "Rappeler",
    confirming: "Rappel…",
    cancel: "Annuler",
  },

  squad: {
    teamsLabel: "Équipe",
    teams: {
      first: "Équipe première",
      b: "Équipe B",
      age: (limit) => `U${limit}`,
      other: (place) => `Équipe ${place}`,
    },
    noTeams: "Ce club n'a aucune équipe.",
    loading: "Lecture de l'effectif…",
    empty: "Aucun joueur dans cette équipe.",

    players: (count) => playerCount(count),
    averageAge: (age) => `âge moyen ${age}`,
    captains: (captain, viceCaptain) => `Capitaine : ${captain} · Vice-capitaine : ${viceCaptain}`,

    actionsLabel: "Actions sur toute l'équipe",
    healAll: (injured) =>
      injured === 0 ? "Tout soigner" : `Tout soigner (${format(injured)} ${injured <= 1 ? "blessé" : "blessés"})`,
    healAllTitle: "Soigner toutes les blessures de tous les joueurs de cette équipe",
    healNone: "Personne n'est blessé dans cette équipe",
    liftAll: (banned) =>
      banned === 0
        ? "Lever les suspensions"
        : `Lever les suspensions (${format(banned)} ${banned <= 1 ? "suspendu" : "suspendus"})`,
    liftAllTitle: "Lever toutes les suspensions de tous les joueurs de cette équipe",
    liftNone: "Personne n'est suspendu dans cette équipe",
    inspireAll: "Motiver tout le monde",
    inspireAllTitle:
      "Mettre le moral de tous les joueurs de cette équipe à 20, le maximum, et retirer leurs motifs de mécontentement",
    refreshAll: "Tout régénérer",
    refreshAllTitle:
      "Mettre l'énergie et le rythme de match de tous les joueurs de cette équipe à 100 %, et les reposer " +
      "complètement (usure -500)",
    maxAll: "Attributs au max",
    maxAllTitle:
      "Mettre tous les attributs de tous les joueurs de cette équipe à leur meilleur niveau : 20, et 1 pour la " +
      "prédisposition aux blessures et la brutalité",
    hint: "Les actions couvrent tous les joueurs de la liste, y compris ceux prêtés. L'annulation est aussi dans Modifications.",

    freezeLabel: "Geler toute l'équipe",
    freezeAttributes: "Geler les attributs",
    freezeAttributesTitle:
      "Tant que l'application est ouverte et connectée, les attributs de tous les joueurs de cette équipe ne baissent " +
      "pas : ce que le jeu retire est remis, et les progrès comptent toujours",
    freezeFitness: "Geler énergie et rythme",
    freezeFitnessTitle:
      "Tant que l'application est ouverte et connectée, l'énergie et le rythme de match de tous les joueurs de cette " +
      "équipe ne baissent pas : ce que le jeu retire est remis. « Tout régénérer » d'abord pour les " +
      "garder à 100 %",
    freezePositions: "Geler les postes",
    freezePositionsTitle:
      "Tant que l'application est ouverte et connectée, les notes par poste de tous les joueurs de cette équipe " +
      "restent telles quelles : une note que le jeu monte ou baisse est remise",
    frozenCount: (frozen, total) => `${format(frozen)} sur ${format(total)}`,
    freezeHint:
      "Le gel couvre tous les joueurs de la liste et suit chacun où qu'il aille. L'application s'en souvient pour " +
      "cette partie.",
    frozeAttributes: (count) =>
      count === 0 ? "Leurs attributs étaient déjà gelés" : `Attributs gelés pour ${playerCount(count)}`,
    unfrozeAttributes: (count) => `Attributs dégelés pour ${playerCount(count)}`,
    frozeFitness: (count) =>
      count === 0
        ? "Leur énergie et leur rythme étaient déjà gelés"
        : `Énergie et rythme gelés pour ${playerCount(count)}`,
    unfrozeFitness: (count) => `Énergie et rythme dégelés pour ${playerCount(count)}`,
    frozePositions: (count) =>
      count === 0 ? "Leurs postes étaient déjà gelés" : `Postes gelés pour ${playerCount(count)}`,
    unfrozePositions: (count) => `Postes dégelés pour ${playerCount(count)}`,

    written: (count) => `${changes(count)} ${count <= 1 ? "écrite" : "écrites"}`,
    refused: (name, reason) => `${name} : ${reason}`,
    undo: "Annuler",
    undoTitle: "Réécrire dans le jeu les anciennes valeurs de ces modifications",

    captainShort: "C",
    viceCaptainShort: "VC",
    menuLabel: (name) => `Brassard de ${name}`,
    menuTitle: "Brassard",
    makeCaptain: "Nommer capitaine",
    makeViceCaptain: "Nommer vice-capitaine",
    nowCaptain: (name) => `${name} est maintenant capitaine`,
    nowViceCaptain: (name) => `${name} est maintenant vice-capitaine`,
    noCaptain: "Personne n'est capitaine maintenant",
    noViceCaptain: "Personne n'est vice-capitaine maintenant",

    tableLabel: (team) => `Joueurs de ${team}`,
    openProfile: "Ouvrir le profil du joueur",
    columns: {
      name: "Nom",
      position: "Poste",
      age: "Âge",
      currentAbility: "NA",
      potentialAbility: "PO",
      condition: "Énergie",
      matchSharpness: "Rythme",
      jadedness: "Usure",
      morale: "Moral",
      actions: "Brassard",
    },
    sortBy: (by) => `Trier par ${by}`,
    sortNames: {
      name: "nom",
      position: "poste",
      age: "âge",
      currentAbility: "niveau actuel",
      potentialAbility: "potentiel",
      condition: "énergie",
      matchSharpness: "rythme de match",
      jadedness: "usure",
      morale: "moral",
    },

    injured: "Blessé",
    injuredTitle: (count) => (count <= 1 ? `${count} blessure` : `${format(count)} blessures`),
    banned: "Suspendu",
    bannedTitle: (count) => (count <= 1 ? `${count} suspension` : `${format(count)} suspensions`),
    onLoan: "Prêté",
    onLoanTitle: "Prêté à un autre club",
    loanee: "En prêt",
    loaneeTitle: "Ici en prêt d'un autre club",
    elsewhere: "Ailleurs",
    elsewhereTitle: "Joue dans une autre équipe du club",
    frozen: "Gelé",
    frozenTitle: (attributes, fitness, positions) => {
      const frozen = [
        ...(attributes ? ["ses attributs"] : []),
        ...(fitness ? ["son énergie", "son rythme de match"] : []),
        ...(positions ? ["ses postes"] : []),
      ];
      const last = frozen.pop() ?? "";
      const listed = frozen.length > 0 ? `${frozen.join(", ")} et ${last}` : last;
      return `Gelé : ${listed}`;
    },
  },

  game: {
    name: "Football Manager",
    storefronts: {
      gamePass: "Game Pass",
      steam: "Steam",
      epic: "Epic Games",
      unknown: "Boutique inconnue",
    },
    steamBuild: (id) => `build ${id}`,
  },

  scouting: {
    nav: "Recrutement",
    reading: "Lecture de votre club…",
    refresh: "Actualiser",
    refreshTitle: "Relire le club dans le jeu",
    searching: "Recherche…",
    none: "—",
    perWeek: "/sem.",
    openProfile: "Ouvrir le profil",
    freeAgent: "Libre",
    loan: "Prêt",
    header: {
      transferBudget: "Budget transferts",
      wageRoom: "Marge salariale",
      wageBudget: "Budget salarial",
      squad: "Effectif",
      averageAge: "Âge moyen",
      players: (count) => playerCount(count),
    },
    tabs: {
      label: "Sections du recrutement",
      recommend: "Conseils de transfert",
      depth: "Profondeur de l'effectif",
      departures: "Joueurs à laisser partir",
    },
    status: {
      missing: "Manquant",
      thin: "Juste",
      fine: "Correct",
      crowded: "Encombré",
    },
    lines: {
      goalkeeper: "Gardien",
      centreBack: "Défenseur central",
      fullBack: "Latéral",
      wingBack: "Piston",
      defensiveMidfield: "Milieu défensif",
      centralMidfield: "Milieu central",
      attackingMidfield: "Milieu offensif",
      wide: "Côté",
      striker: "Attaquant",
    },
    depthLines: {
      gk: "Gardiens",
      dc: "Défenseurs centraux",
      rightBack: "Latéraux droits",
      leftBack: "Latéraux gauches",
      dm: "Milieux défensifs",
      mc: "Milieux centraux",
      rightWing: "Ailiers droits",
      leftWing: "Ailiers gauches",
      amc: "Milieux offensifs",
      st: "Attaquants",
    },
    positionTip: (line, count, target, status) =>
      `${line} : ${format(count)} dans l'effectif (habituellement ${format(target)}) — ${status}`,
    brief: {
      heading: "Que cherchez-vous ?",
      pitch: "Poste",
      legend: "Les points montrent l'état de l'effectif dans chaque ligne.",
      inPossession: "Avec ballon",
      outOfPossession: "Sans ballon",
      anyRole: "Tous — le meilleur rôle pour chaque joueur",
      purpose: "Pour",
      filters: "Filtres",
      minAge: "Âge min",
      maxAge: "Âge max",
      maxFee: "Indemnité max",
      minProbability: "Probabilité",
      anyProbability: "Toutes",
      noFreeAgents: "Sans joueurs libres",
    },
    purposes: {
      firstTeam: "Titulaire",
      rotation: "Rotation",
      future: "Avenir",
      any: "Tous",
    },
    purposeTips: {
      firstTeam: "Meilleur que votre meilleur joueur à ce poste",
      rotation: "Aussi bon que votre deuxième choix, à un prix raisonnable",
      future: "21 ans ou moins, avec une marge de progression",
      any: "Tous ceux qui conviennent",
    },
    ask: {
      before: "Conseils pour ",
      after: "",
      anyRole: "meilleur rôle par joueur",
    },
    own: {
      heading: "Dans votre effectif",
      empty: "Personne dans votre effectif ne joue ici.",
      position: "Poste",
    },
    summary: (candidates, eligible, shown, purpose) =>
      `${format(candidates)} joueurs peuvent jouer ici · ${format(eligible)} conviennent pour ${purpose} · ` +
      `${format(shown)} recommandés`,
    how: {
      label: "Comment cette liste est-elle établie ?",
      note: (rule, count) =>
        "Le recruteur examine tous les joueurs capables de jouer à ce poste (note de 10 ou plus), sauf ceux de votre " +
        `club et ceux des autres managers humains. Parmi eux, il garde ceux qui ${rule}. Pour les 400 qui conviennent ` +
        "le mieux, il estime la probabilité que chacun vous rejoigne, puis recommande les " +
        `${count} meilleurs selon l'adéquation et la probabilité. Ordre recommandé : 70 % d'adéquation et ` +
        "30 % de probabilité, un peu moins pour les joueurs de plus de 30 ans ; Rotation pèse les deux à " +
        "égalité et Avenir tient aussi compte du potentiel. Cliquez sur un titre de colonne pour trier la liste ; " +
        "# est l'ordre du recruteur.",
    },
    purposeRules: {
      firstTeam: "conviennent mieux au poste que votre meilleur joueur",
      rotation: "conviennent au moins aussi bien que votre deuxième choix",
      future: "ont 21 ans ou moins avec une marge de progression (potentiel d'au moins 15 au-dessus du niveau)",
      any: "conviennent un tant soit peu",
    },
    sortBy: (by) => `Trier par ${by}`,
    sortNames: {
      rank: "l'ordre du recruteur",
      name: "nom",
      age: "âge",
      ca: "niveau actuel",
      pa: "potentiel",
      fit: "adéquation",
      probability: "probabilité",
      fee: "indemnité",
    },
    backToScoutOrder: "Revenir à l'ordre du recruteur",
    showMore: (count) => `Afficher ${format(count)} de plus`,
    playsFor: (club) => `joue pour ${club}`,
    empty: "Aucun conseil pour ce poste avec ces réglages. Essayez l'objectif Tous ou des filtres plus larges.",
    columns: {
      rank: "#",
      ca: "NA",
      pa: "PO",
      player: "Joueur",
      age: "Âge",
      fit: "Adéquation",
      role: "Rôle",
      probability: "Probabilité",
      fee: "Indemnité est.",
      wage: "Salaire",
      note: "Note du recruteur",
      money: "Indemnité",
      value: "Valeur",
    },
    probabilityInfo:
      "La probabilité que le joueur rejoigne votre club — une estimation tirée de sa valeur, de son contrat, de son " +
      "club et de sa réputation.",
    probabilityInfoLabel: "Qu'est-ce que la probabilité ?",
    fitTitle: (inPossession, outOfPossession, position) =>
      [
        inPossession !== null && `Avec ballon : ${inPossession}`,
        outOfPossession !== null && `Sans ballon : ${outOfPossession}`,
        `Poste : ${position}`,
      ]
        .filter(Boolean)
        .join("\n"),
    note:
      "L'adéquation utilise les pondérations d'attributs propres à l'éditeur pour chaque rôle ; indemnités, " +
      "salaires et probabilités sont des estimations.",
    depth: {
      summary: (size, age, level) =>
        `${format(size)} joueurs${age === null ? "" : ` · âge moyen ${age}`} · niveau moyen du meilleur onze ${level}`,
      weak: "Sous le niveau de l'effectif",
      ageing: "Vieillissant",
      cover: (names) => `Peuvent aussi jouer ici : ${names}`,
      advice: "Demander conseil",
      adviceTitle: "Conseils de transfert pour cette ligne",
      empty: "Personne",
      ability: "Niveau actuel",
      more: (count) => `+${format(count)} de plus`,
      columns: {
        line: "Ligne",
        status: "État",
        count: "Joueurs",
        players: "Les meilleurs d'abord (niveau)",
        cover: "Peuvent aussi jouer ici",
        age: "Âge moy.",
      },
      countTitle: (count, target) =>
        `${format(count)} joueurs dont le meilleur poste est dans cette ligne ; un effectif en compte ` +
        `habituellement ${format(target)}`,
      statusHelp: {
        missing: "Personne ne joue ici.",
        thin: "Moins qu'un effectif n'en compte habituellement ; les joueurs qui peuvent dépanner comptent pour moitié.",
        fine: "À peu près ce qu'un effectif compte habituellement.",
        crowded: "Deux joueurs ou plus au-delà de ce qu'un effectif compte habituellement.",
      },
      attention: "À surveiller :",
      allFine: "Toutes les lignes semblent équilibrées.",
    },
    departures: {
      intro: "Les joueurs que votre recruteur laisserait partir, les plus urgents d'abord.",
      filter: "Conseil",
      all: "Tous",
      empty: "Votre recruteur ne laisserait partir personne pour l'instant.",
      sortNames: {
        rank: "l'ordre du recruteur",
        name: "nom",
        age: "âge",
        ca: "niveau actuel",
        pa: "potentiel",
        value: "valeur",
        wage: "salaire",
        contract: "fin de contrat",
      },
      columns: {
        player: "Joueur",
        age: "Âge",
        ability: "Niveau",
        value: "Valeur",
        wage: "Salaire",
        contract: "Contrat jusqu'au",
        advice: "Conseil",
        reasons: "Raisons",
      },
      actions: { sell: "Vendre", loan: "Prêter", release: "Libérer" },
      rank: (line, rank) => `${line} · ${rank === 1 ? "1er" : `${rank}e`}`,
    },
    // FM's French roles; a few keep the English name French football writing uses too.
    roles: {
      bgk: "Gardien relanceur",
      ngk: "Gardien sobre",
      sk: "Gardien libéro",
      lhk: "Gardien sur sa ligne",
      cb: "Défenseur central",
      bcb: "Défenseur central relanceur",
      ncb: "Défenseur central sobre",
      acb: "Défenseur central avancé",
      ocb: "Défenseur central débordant",
      scb: "Défenseur central stoppeur",
      ccb: "Défenseur central en couverture",
      wcb: "Défenseur central excentré",
      fb: "Arrière latéral",
      ifb: "Arrière latéral inversé",
      pfb: "Arrière latéral pressant",
      hfb: "Arrière latéral en retrait",
      wb: "Piston",
      iwb: "Piston inversé",
      pwb: "Piston meneur de jeu",
      awb: "Piston offensif",
      hwb: "Piston en retrait",
      dm: "Milieu défensif",
      hb: "Demi-défenseur",
      ddm: "Milieu défensif décrochant",
      pdm: "Milieu défensif pressant",
      bbm: "Milieu box-to-box",
      bbp: "Meneur de jeu box-to-box",
      cm: "Milieu central",
      pcm: "Milieu central pressant",
      scm: "Milieu central écran",
      chm: "Milieu dans les intervalles",
      wcm: "Milieu central excentré",
      ap: "Meneur de jeu offensif",
      am: "Milieu offensif",
      oam: "Milieu offensif point d'appui",
      w: "Ailier",
      if: "Attaquant intérieur",
      pw: "Ailier meneur de jeu",
      wfd: "Attaquant excentré",
      tw: "Ailier replié",
      iow: "Ailier intérieur point d'appui",
      cfd: "Avant-centre",
      dlf: "Attaquant en retrait",
      p: "Renard des surfaces",
      tcf: "Avant-centre replié",
      ocf: "Avant-centre point d'appui",
    },
    reasons: {
      listed: () => "Sur la liste des transferts",
      freeAgent: () => "Libre",
      expiring: (value) => `Contrat se terminant dans ${value} jours`,
      releaseClause: (value) => `Clause libératoire ${value}`,
      fringe: () => "Pas titulaire régulier dans son club",
      keyPlayer: () => "Joueur clé dans son club",
      unwanted: () => "Indésirable dans son club",
      overBudget: (value) => `${value} au-dessus de votre budget`,
      stretch: (value) => `Légèrement au-dessus du budget (+${value})`,
      wageHigh: (value) => `Salaire ${value}/sem. au-dessus de votre marge`,
      biggerClub: () => "Joue dans un plus grand club",
      smallerClub: () => "Joue dans un plus petit club",
      reputationGap: () => "Un nom trop grand pour votre club",
      ambitious: () => "Ambitieux : apprécierait de franchir un palier",
      notForSale: () => "Pas à vendre",
    },
    departureReasons: {
      surplus: (value) => `Ligne encombrée (${value} joueurs)`,
      belowLevel: () => "Sous le niveau de l'effectif",
      ageing: (value) => `Vieillissant (${value})`,
      expiring: (value) => `Contrat se terminant dans ${value} jours`,
      highWage: (value) => `Salaire élevé pour son rôle (${value}/sem.)`,
      unhappy: () => "Mécontent",
      lowMorale: () => "Moral bas",
      blocked: () => "A besoin de jouer pour progresser",
      unwanted: () => "Statut : indésirable",
      listed: () => "Déjà sur la liste des transferts",
    },
  },

  errors,
};
