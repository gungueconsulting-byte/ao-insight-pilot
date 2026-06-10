export type Bailleur =
  | "BM"
  | "BAD"
  | "PNUD"
  | "UE"
  | "AFD"
  | "GIZ"
  | "USAID"
  | "UNICEF"
  | "BOAD"
  | "Gouvernement"
  | "Autre";
export type Pays =
  | "Sénégal"
  | "Côte d'Ivoire"
  | "Mali"
  | "Burkina Faso"
  | "Ghana"
  | "Guinée"
  | "Bénin"
  | "Togo"
  | "Niger"
  | "Mauritanie";
export type Secteur =
  | "Santé"
  | "Education"
  | "Infrastructure"
  | "Agriculture"
  | "Numérique"
  | "Environnement"
  | "Gouvernance"
  | "Eau et Assainissement"
  | "Autre";
export type TypeMarche = "Travaux" | "Services" | "Fournitures" | "Consulting";

export interface AO {
  id: string;
  titre: string;
  bailleur: Bailleur;
  pays: Pays;
  secteur: Secteur;
  type: TypeMarche;
  deadline: string; // ISO
  publication: string;
  montant?: string;
  langue: string;
  contact: string;
  description: string;
  exigences: string[];
  documents: string[];
  source: string;
}

const daysFromNow = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString();
};

export const BAILLEUR_COLORS: Record<Bailleur, string> = {
  BM: "bg-blue-100 text-blue-900 border-blue-200",
  BAD: "bg-emerald-100 text-emerald-900 border-emerald-200",
  PNUD: "bg-sky-100 text-sky-900 border-sky-200",
  UE: "bg-indigo-100 text-indigo-900 border-indigo-200",
  AFD: "bg-rose-100 text-rose-900 border-rose-200",
  GIZ: "bg-amber-100 text-amber-900 border-amber-200",
  USAID: "bg-red-100 text-red-900 border-red-200",
  UNICEF: "bg-cyan-100 text-cyan-900 border-cyan-200",
  BOAD: "bg-teal-100 text-teal-900 border-teal-200",
  Gouvernement: "bg-slate-200 text-slate-900 border-slate-300",
  Autre: "bg-muted text-foreground border-border",
};

export const MOCK_AOS: AO[] = [
  {
    id: "ao-001",
    titre: "Construction de 12 centres de santé communautaires en milieu rural",
    bailleur: "BM",
    pays: "Sénégal",
    secteur: "Santé",
    type: "Travaux",
    deadline: daysFromNow(5),
    publication: daysFromNow(-15),
    montant: "4 200 000 000 FCFA",
    langue: "Français",
    contact: "passation.marches@sante.gouv.sn",
    description:
      "Construction et équipement de douze (12) centres de santé communautaires dans les régions de Tambacounda, Kédougou et Matam, incluant la formation du personnel local et la mise en place de systèmes de gestion énergétique solaire.",
    exigences: [
      "Expérience minimum de 8 ans dans la construction d'infrastructures sanitaires",
      "Avoir réalisé au moins 3 projets similaires en Afrique de l'Ouest",
      "Chiffre d'affaires moyen annuel ≥ 2 milliards FCFA sur les 3 dernières années",
      "Disposer d'une équipe technique permanente d'ingénieurs et architectes",
    ],
    documents: [
      "Dossier administratif (statuts, NINEA, quitus fiscal)",
      "Références techniques détaillées",
      "Méthodologie d'exécution",
      "Cautionnement bancaire de 2%",
    ],
    source: "https://armp.sn/",
  },
  {
    id: "ao-002",
    titre: "Étude de faisabilité — Plateforme numérique pour les PME agricoles",
    bailleur: "BAD",
    pays: "Côte d'Ivoire",
    secteur: "Numérique",
    type: "Consulting",
    deadline: daysFromNow(22),
    publication: daysFromNow(-8),
    montant: "180 000 000 FCFA",
    langue: "Français",
    contact: "tenders@afdb.org",
    description:
      "Mission d'étude de faisabilité technique, économique et financière pour le déploiement d'une plateforme numérique de mise en relation entre coopératives agricoles et acheteurs régionaux.",
    exigences: [
      "Cabinet ou consortium avec expertise numérique et secteur agricole",
      "Expérience confirmée en études de marché en zone UEMOA",
      "Équipe pluridisciplinaire (IT, agro-économie, finance)",
    ],
    documents: ["CV de l'équipe clé", "Offre technique", "Offre financière", "Lettre de soumission"],
    source: "https://www.afdb.org/en/projects-and-operations/procurement",
  },
  {
    id: "ao-003",
    titre: "Programme de formation des jeunes au numérique — 5 000 bénéficiaires",
    bailleur: "UE",
    pays: "Mali",
    secteur: "Education",
    type: "Services",
    deadline: daysFromNow(45),
    publication: daysFromNow(-3),
    montant: "1 500 000 000 FCFA",
    langue: "Français",
    contact: "delegation-mali@eeas.europa.eu",
    description:
      "Conception, déploiement et suivi d'un programme de formation aux métiers du numérique pour 5 000 jeunes dans 4 régions du Mali, incluant insertion professionnelle.",
    exigences: [
      "Organisation enregistrée depuis 5 ans minimum",
      "Capacité de formation prouvée sur > 1000 bénéficiaires",
      "Présence locale au Mali ou partenariat formalisé",
    ],
    documents: ["PADOR enregistré", "Cadre logique", "Budget détaillé", "CV équipe projet"],
    source: "https://webgate.ec.europa.eu/europeaid/online-services/",
  },
  {
    id: "ao-004",
    titre: "Réhabilitation de 80 km de pistes rurales dans la région des Hauts-Bassins",
    bailleur: "AFD",
    pays: "Burkina Faso",
    secteur: "Infrastructure",
    type: "Travaux",
    deadline: daysFromNow(3),
    publication: daysFromNow(-25),
    montant: "3 800 000 000 FCFA",
    langue: "Français",
    contact: "tenders.bf@afd.fr",
    description:
      "Travaux de réhabilitation, ouvrages d'art et signalisation sur 80 km de pistes rurales reliant les zones de production agricole aux marchés.",
    exigences: [
      "Entreprise de travaux publics classée minimum T4",
      "Parc matériel propre et fonctionnel",
      "Référence d'au moins 50 km de pistes réalisées",
    ],
    documents: ["Dossier administratif", "Cautionnement", "Planning détaillé"],
    source: "https://afd.dgmarket.com/",
  },
  {
    id: "ao-005",
    titre: "Assistance technique — Renforcement de la gouvernance locale",
    bailleur: "PNUD",
    pays: "Niger",
    secteur: "Gouvernance",
    type: "Consulting",
    deadline: daysFromNow(18),
    publication: daysFromNow(-10),
    montant: "320 000 000 FCFA",
    langue: "Français",
    contact: "procurement.ne@undp.org",
    description:
      "Appui technique aux 12 communes pilotes pour le renforcement des capacités en planification, budgétisation participative et redevabilité.",
    exigences: [
      "Expertise confirmée en décentralisation",
      "Maîtrise du français et des langues locales",
      "Présence ou réseau au Niger",
    ],
    documents: ["Note méthodologique", "CV experts", "Offre financière"],
    source: "https://procurement-notices.undp.org/",
  },
  {
    id: "ao-006",
    titre: "Fourniture d'équipements solaires pour 200 écoles primaires",
    bailleur: "GIZ",
    pays: "Ghana",
    secteur: "Education",
    type: "Fournitures",
    deadline: daysFromNow(35),
    publication: daysFromNow(-5),
    montant: "950 000 000 FCFA",
    langue: "Anglais",
    contact: "tenders-ghana@giz.de",
    description:
      "Acquisition, livraison et installation de kits solaires (panneaux, batteries, éclairage LED) pour 200 écoles primaires rurales.",
    exigences: [
      "Fournisseur agréé d'équipements solaires",
      "Garantie minimum 5 ans sur l'équipement",
      "SAV et formation des utilisateurs locaux",
    ],
    documents: ["Fiches techniques", "Certifications IEC", "Plan logistique"],
    source: "https://www.giz.de/en/worldwide/333.html",
  },
  {
    id: "ao-007",
    titre: "Appui à la chaîne de valeur cacao — Coopératives de l'Ouest",
    bailleur: "Gouvernement",
    pays: "Côte d'Ivoire",
    secteur: "Agriculture",
    type: "Services",
    deadline: daysFromNow(12),
    publication: daysFromNow(-18),
    montant: "640 000 000 FCFA",
    langue: "Français",
    contact: "anrmp@anrmp.ci",
    description:
      "Accompagnement de 40 coopératives cacaoyères : structuration, certification, accès aux marchés internationaux.",
    exigences: [
      "Expérience confirmée dans le secteur cacao",
      "Maîtrise des standards UTZ / Rainforest Alliance",
    ],
    documents: ["Méthodologie", "Références", "Budget"],
    source: "https://anrmp.ci/",
  },
  {
    id: "ao-008",
    titre: "Étude environnementale stratégique du bassin du fleuve Sénégal",
    bailleur: "BM",
    pays: "Mauritanie",
    secteur: "Environnement",
    type: "Consulting",
    deadline: daysFromNow(28),
    publication: daysFromNow(-7),
    montant: "420 000 000 FCFA",
    langue: "Français",
    contact: "wb-mauritania@worldbank.org",
    description:
      "Réalisation d'une évaluation environnementale stratégique couvrant le bassin du fleuve Sénégal côté mauritanien.",
    exigences: ["Bureau d'études environnementales", "Équipe d'experts seniors"],
    documents: ["Note de cadrage", "CV", "Offre financière"],
    source: "https://worldbank.org/procurement",
  },
  {
    id: "ao-009",
    titre: "Digitalisation des registres de l'état civil",
    bailleur: "PNUD",
    pays: "Bénin",
    secteur: "Numérique",
    type: "Services",
    deadline: daysFromNow(60),
    publication: daysFromNow(-2),
    montant: "780 000 000 FCFA",
    langue: "Français",
    contact: "procurement.bj@undp.org",
    description:
      "Numérisation, archivage et indexation de 2 millions de registres d'état civil, avec mise en place d'une base de données nationale sécurisée.",
    exigences: ["Expertise GED", "Standards de sécurité ISO 27001"],
    documents: ["Offre technique", "Offre financière"],
    source: "https://procurement-notices.undp.org/",
  },
  {
    id: "ao-010",
    titre: "Construction d'un centre logistique à Lomé",
    bailleur: "BAD",
    pays: "Togo",
    secteur: "Infrastructure",
    type: "Travaux",
    deadline: daysFromNow(40),
    publication: daysFromNow(-12),
    montant: "5 100 000 000 FCFA",
    langue: "Français",
    contact: "togo-tenders@afdb.org",
    description:
      "Construction d'un hub logistique de 12 hectares incluant entrepôts, voies d'accès et zone douanière au Port de Lomé.",
    exigences: ["Classe T5", "Référence portuaire obligatoire"],
    documents: ["Cautionnement 3%", "Planning", "Dossier technique"],
    source: "https://afdb.org/procurement",
  },
  {
    id: "ao-011",
    titre: "Programme nutrition infantile en milieu scolaire",
    bailleur: "UE",
    pays: "Guinée",
    secteur: "Santé",
    type: "Services",
    deadline: daysFromNow(6),
    publication: daysFromNow(-20),
    montant: "1 100 000 000 FCFA",
    langue: "Français",
    contact: "delegation-guinee@eeas.europa.eu",
    description:
      "Distribution de repas équilibrés à 80 000 enfants sur 18 mois, avec suivi nutritionnel et formation des cantinières.",
    exigences: ["ONG enregistrée", "Expérience logistique alimentaire"],
    documents: ["PADOR", "Cadre logique", "Budget"],
    source: "https://webgate.ec.europa.eu/",
  },
  {
    id: "ao-012",
    titre: "Fourniture de 50 000 tablettes pédagogiques",
    bailleur: "AFD",
    pays: "Sénégal",
    secteur: "Education",
    type: "Fournitures",
    deadline: daysFromNow(50),
    publication: daysFromNow(-4),
    montant: "2 800 000 000 FCFA",
    langue: "Français",
    contact: "tenders.sn@afd.fr",
    description:
      "Fourniture, déploiement et SAV de 50 000 tablettes Android préchargées de contenus pédagogiques pour les écoles secondaires.",
    exigences: ["Constructeur agréé", "SAV national", "Garantie 3 ans"],
    documents: ["Fiches techniques", "Certifications CE"],
    source: "https://afd.dgmarket.com/",
  },
];

export const PAYS_LIST: Pays[] = [
  "Sénégal",
  "Côte d'Ivoire",
  "Mali",
  "Burkina Faso",
  "Ghana",
  "Guinée",
  "Bénin",
  "Togo",
  "Niger",
  "Mauritanie",
];

export const SECTEUR_LIST: Secteur[] = [
  "Santé",
  "Education",
  "Infrastructure",
  "Agriculture",
  "Numérique",
  "Environnement",
  "Gouvernance",
  "Eau et Assainissement",
  "Autre",
];

export const BAILLEUR_LIST: Bailleur[] = [
  "BM",
  "BAD",
  "PNUD",
  "UE",
  "AFD",
  "GIZ",
  "USAID",
  "UNICEF",
  "BOAD",
  "Gouvernement",
  "Autre",
];

export const TYPE_LIST: TypeMarche[] = ["Travaux", "Services", "Fournitures", "Consulting"];

export const daysUntil = (iso: string) => {
  const ms = new Date(iso).getTime() - Date.now();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
};

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });