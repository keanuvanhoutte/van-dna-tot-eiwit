/*
 * Nucleïnezuren-atlas — UI en 3D-weergave.
 * Taal: shared/i18n.js (localStorage 'dna-app-lang', ?lang=nl|en).
 * URL: ?id=<item>&cmp=<id>,<id>&lang=nl|en&from=<scène-id>
 */
import { aaSVG, AACLASS, CLASSES } from './aa2d.js';
import { baseSVG, sugarSVG } from './base2d.js';
import { pdbUrl, rcsbEntryUrl } from '../shared/pdb.js';
import { lang, L, setLang } from '../shared/i18n.js';
import { NODES, title as nodeTitle } from '../shared/content.js';
import { ENTRIES, FILTERS, PRESETS } from './entries.js';
import { preparePdb, analyse, orient, parentBase, LIGNAME, IONLABEL } from './analyse.js';
import { DIAGRAMS, diagramLegend } from './diagrams.js';
import { SIMPLE, EXTRA_GLOSS } from './simple.js';
import { GLOSSARY } from '../shared/glossary.js';
import { colourWords } from '../shared/colourwords.js';
import { CODE_RE, fetchMeta, fetchCoords, coordUrl, customEntry, searchPDB } from './custom.js';
import { fetchText, PROGRESS } from './fetchprog.js';
import { smartFilter } from './smartsearch.js';

const $ = id => document.getElementById(id);
const BY = Object.fromEntries(ENTRIES.map(e => [e.id, e]));
/* zelf opgezochte PDB-codes (custom.js): bovenaan de lijst, onthouden in de browser (enkel de kleine metadata) */
const CUSTOM = [];
const RECENT_KEY = 'atlas-pdb-recent';
function addCustom(code, meta) {
  const e = customEntry(code, meta);
  if (!BY[e.id]) CUSTOM.unshift(e); else CUSTOM.splice(CUSTOM.findIndex(x => x.id === e.id), 1, e);
  BY[e.id] = e;
  return e;
}
try { for (const [code, meta] of (JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]')).reverse()) addCustom(code, meta); } catch { /* geen of ongeldige opslag */ }
function saveRecent(code, meta) {
  try {
    const list = JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]').filter(([c]) => c !== code);
    list.unshift([code, meta]);
    localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, 8)));
  } catch { /* opslag vol of uitgeschakeld: dan enkel voor deze sessie */ }
}
function forgetRecent(code) {
  try { localStorage.setItem(RECENT_KEY, JSON.stringify(JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]').filter(([c]) => c !== code))); } catch { /* niets */ }
}
/* eenvoudige titel/ondertitel (simple.js), met de vaknaam als terugval */
const nameOf = e => L(SIMPLE[e.id]?.title ?? e.name);
const listName = e => e.custom ? `PDB ${e.pdb}` : nameOf(e);
const listSub = e => e.custom ? L(e.name) : subOf(e);
const subOf = e => L(SIMPLE[e.id]?.sub ?? e.sub);
const q = new URLSearchParams(location.search);
const FROM = q.get('from');

/* ---------- interfaceteksten ---------- */
const T = {
  ttl: { nl: '3D-bibliotheek', en: '3D library' },
  ttlSub: { nl: 'Echte 3D-vormen van DNA, RNA, eiwitten en hun partners, zoals onderzoekers ze gemeten hebben', en: 'Real 3D shapes of DNA, RNA, proteins and their partners, as researchers measured them' },
  back: { nl: '← terug naar de animatie', en: '← back to the animation' },
  home: { nl: 'Start', en: 'Home' }, story: { nl: 'Verhaal-app', en: 'Story app' },
  search: { nl: 'Zoek in de bibliotheek: bv. tRNA, histon…', en: 'Search the library: e.g. tRNA, histone…' },
  recog: { nl: 'Herkend:', en: 'Recognised:' }, words: { nl: 'woorden:', en: 'words:' },
  loose: { nl: 'Niets past bij alles samen; dit komt het dichtst in de buurt.', en: 'Nothing matches everything together; these come closest.' },
  count: { nl: n => `${n} item${n === 1 ? '' : 's'}`, en: n => `${n} entr${n === 1 ? 'y' : 'ies'}` },
  reset: { nl: 'filters wissen', en: 'clear filters' },
  showOpts: { nl: 'Tonen ▾', en: 'Show ▾' },
  none: { nl: 'Geen items voor deze filters.', en: 'No entries for these filters.' },
  schema: { nl: 'schema', en: 'diagram' },
  cmp: { nl: 'Vergelijken', en: 'Compare' },
  cmpHint: { nl: 'Vergelijkmodus: klik items in de lijst om ze toe te voegen of te verwijderen (max. 3). De eerste bepaalt de tekst rechts.', en: 'Compare mode: click entries in the list to add or remove them (max. 3). The first one determines the text on the right.' },
  presets: { nl: 'Snel vergelijken:', en: 'Quick compare:' },
  basesLbl: { nl: 'Basen', en: 'Bases' }, rings: { nl: 'Ringen', en: 'Rings' }, rungs: { nl: 'Sporten', en: 'Rungs' },
  ringsTip: { nl: 'elke base als echte ring van atomen aan het lint', en: 'each base as a real ring of atoms on the ribbon' },
  rungsTip: { nl: 'eenvoudig: elke streng een gladde buis, elke letter één sport — zoals een ladder', en: 'simple: each strand a smooth tube, each letter one rung — like a ladder' },
  view: { nl: 'Weergave', en: 'View' }, stick: { nl: 'Stokjes', en: 'Sticks' }, sphere: { nl: 'Ruimtevullend', en: 'Space-filling' },
  colour: { nl: 'Kleur', en: 'Colour' }, byPart: { nl: 'Per onderdeel', en: 'By part' }, byChain: { nl: 'Per streng', en: 'By strand' }, naTog: { nl: 'DNA en RNA tonen', en: 'Show DNA and RNA' }, byType: { nl: 'Per soort', en: 'By kind' }, byBase: { nl: 'Per letter', en: 'By letter' }, byElem: { nl: 'Per atoom', en: 'By atom' },
  hintStyle: {
    cartoon: { nl: 'de streng als lint, de letters (basen) als ringetjes eraan', en: 'the strand as a ribbon, the letters (bases) as small rings on it' },
    stick: { nl: 'elke binding tussen atomen als een staafje', en: 'every bond between atoms as a stick' },
    sphere: { nl: 'elk atoom als bol op ware grootte: zo zie je hoeveel plaats het inneemt', en: 'every atom as a ball at true size: shows how much space it takes up' },
  },
  hintColor: {
    part: { nl: 'de belangrijkste onderdelen hebben elk een eigen kleur', en: 'the main parts each have their own colour' },
    type: { nl: 'DNA blauw, RNA oranje, eiwit paars', en: 'DNA blue, RNA orange, protein purple' },
    typeW: { dna: { nl: 'DNA blauw', en: 'DNA blue' }, rna: { nl: 'RNA oranje', en: 'RNA orange' }, prot: { nl: 'eiwit paars', en: 'protein purple' },
      histone: { nl: 'histonen (eiwit) grijs', en: 'histones (protein) grey' } },
    chain: { nl: 'elke streng of keten een eigen kleur: zo zie je uit hoeveel stukken het bestaat', en: 'each strand or chain its own colour: shows how many pieces it is made of' },
    base: { nl: 'elke letter (A, T/U, G, C) een eigen kleur; de ruggengraat grijs', en: 'each letter (A, T/U, G, C) its own colour; the backbone grey' },
    elem: { nl: 'koolstof grijs, stikstof blauw, zuurstof rood, fosfor oranje', en: 'carbon grey, nitrogen blue, oxygen red, phosphorus orange' } },
  cartoonProt: { nl: 'eiwit als lint met spiralen (helix) en pijlen (gestrekt stuk)', en: 'protein as a ribbon with spirals (helix) and arrows (stretched piece)' },
  schemaBtn: { nl: '📄 Schema', en: '📄 Diagram' }, schema3d: { nl: '🧬 Terug naar 3D', en: '🧬 Back to 3D' },
  schemaTip: { nl: 'Schema van het hele molecule (in 3D zie je een gemeten stuk ervan)', en: 'Diagram of the whole molecule (in 3D you see a measured piece of it)' },
  inSchema: { nl: 'In het schema', en: 'In the diagram' },
  sideHide: { nl: 'Lijst inklappen (meer plaats voor de figuur)', en: 'Collapse the list (more room for the figure)' }, sideShow: { nl: 'Lijst tonen', en: 'Show the list' }, sideName: { nl: 'Bibliotheek', en: 'Library' },
  infoHide: { nl: 'Uitleg inklappen (meer plaats voor de figuur)', en: 'Collapse the explanation (more room for the figure)' }, infoShow: { nl: 'Uitleg tonen', en: 'Show the explanation' }, infoName: { nl: 'Uitleg', en: 'Explanation' },
  colours: { nl: 'Kleuren', en: 'Colours' }, focusHint: { nl: 'klik op een kleur om enkel dat deel te zien', en: 'click a colour to see only that part' },
  clickHint: { nl: '<i>ⓘ</i> <b>Klik op een stukje van de figuur</b> voor uitleg', en: '<i>ⓘ</i> <b>Click a piece of the figure</b> for an explanation' },
  focusAll: { nl: 'alles tonen', en: 'show all' }, legMore: { nl: n => `+${n} meer ▾`, en: n => `+${n} more ▾` }, legLess: { nl: 'minder ▴', en: 'fewer ▴' },
  legShow: { nl: n => `${n} kleuren tonen`, en: n => `show ${n} colours` }, focusOn: { nl: 'keten', en: 'chain' },
  restGrey: { nl: 'rest', en: 'rest' }, restOf: { nl: 'rest van het', en: 'rest of the' }, protChain: { nl: 'eiwitketen', en: 'protein chain' }, moreChains: { nl: 'nog {n} ketens', en: '{n} more chains' },
  gripTip: { nl: 'Sleep om de tabel breder of smaller te maken · dubbelklik = standaardbreedte', en: 'Drag to make the table wider or narrower · double-click = default width' },
  hb: { nl: 'Waterstofbruggen', en: 'Hydrogen bonds' }, synMark: { nl: 'Omgeklapte basen (syn)', en: 'Flipped bases (syn)' }, ions: { nl: 'Ionen', en: 'Ions' }, ligs: { nl: 'Medicijn / klein molecule', en: 'Drug / small molecule' },
  markT: { nl: 'Markeringen', en: 'Highlights' }, water: { nl: 'Water', en: 'Water' }, spin: { nl: 'Rondraaien', en: 'Spin' }, link: { nl: 'Samen draaien', en: 'Rotate together' },
  loading: { nl: 'Structuur laden uit de PDB…', en: 'Loading structure from the PDB…' },
  loadingBig: { nl: 'Grote structuur laden (enkele MB)…', en: 'Loading a large structure (several MB)…' },
  failed: { nl: 'Laden mislukt: ', en: 'Loading failed: ' },
  right: { nl: 'rechtshandig', en: 'right-handed' }, left: { nl: 'linkshandig', en: 'left-handed' },
  strand: { nl: 'streng', en: 'strand' }, chain: { nl: 'keten', en: 'chain' }, atom: { nl: 'atoom', en: 'atom' },
  // tabel
  secHelix: { nl: 'Helix (berekend)', en: 'Helix (computed)' }, secNt: { nl: 'Per nucleotide (berekend)', en: 'Per nucleotide (computed)' }, secExtra: { nl: 'Samenstelling', en: 'Composition' },
  cHand: { nl: 'Draairichting', en: 'Handedness' },
  cTwist: { nl: 'Gem. twist per bp', en: 'Mean twist per bp' }, perTurn: { nl: 'bp/winding', en: 'bp/turn' },
  cSteps: { nl: 'Twist per stap', en: 'Twist per step' }, cRiseSteps: { nl: 'Stijging per stap', en: 'Rise per step' },
  cRise: { nl: 'Gem. stijging per bp', en: 'Mean rise per bp' },
  cDiam: { nl: 'Diameter P–P / buitenkant', en: 'Diameter P–P / outer' },
  cSugar: { nl: "Suikers C3'-endo / C2'-endo", en: "Sugars C3'-endo / C2'-endo" },
  other: { nl: 'overig', en: 'other' },
  cSyn: { nl: 'Basen syn / anti', en: 'Bases syn / anti' },
  border: { nl: 'hoog-anti', en: 'high-anti' }, borderTip: { nl: 'χ tussen −90° en −45°: hoog-anti (base nog weg van de suiker)', en: 'χ between −90° and −45°: high-anti (base still pointing away from the sugar)' },
  cHbI: { nl: 'H-bruggen tussen de strengen', en: 'H-bonds between strands' },
  cHbAll: { nl: 'H-bruggen base–base / paren (≥ 2)', en: 'Base–base H-bonds / pairs (≥ 2)' },
  cNt: { nl: 'Nucleotiden', en: 'Nucleotides' }, cProt: { nl: 'Aminozuren (eiwit)', en: 'Amino acids (protein)' },
  cIons: { nl: 'Ionen', en: 'Ions' }, cLigs: { nl: 'Liganden', en: 'Ligands' }, cMods: { nl: 'Gemodificeerde nucleotiden', en: 'Modified nucleotides' },
  cQuart: { nl: 'G-kwartetten', en: 'G-quartets' }, cCC: { nl: 'C·C⁺-paren (N3–N3 + N4–O2)', en: 'C·C⁺ pairs (N3–N3 + N4–O2)' },
  cIonCoord: { nl: 'Ion omringd door O6', en: 'Ion surrounded by O6' },
  cHoog: { nl: 'Derde streng: Hoogsteen-gepaarde nt', en: 'Third strand: Hoogsteen-paired nt' },
  noHelix: { nl: 'Helixparameters', en: 'Helix parameters' },
  bentWarn: { nl: 'ruwe schatting', en: 'rough estimate' },
  none0: { nl: 'geen', en: 'none' },
  // info
  what: { nl: 'Wat is het?', en: 'What is it?' }, feat: { nl: 'Kenmerken', en: 'Key features' },
  cell: { nl: 'In de menselijke cel · waarom belangrijk', en: 'In the human cell · why it matters' },
  cellOther: { nl: 'Waar komt het voor · waarom belangrijk', en: 'Where it occurs · why it matters' },
  scenes: { nl: 'In de verhaal-app', en: 'In the story app' }, open: { nl: 'open ↗', en: 'open ↗' },
  struct: { nl: 'Structuur', en: 'Structure' }, why3d: { nl: 'Waarom geen 3D-model?', en: 'Why no 3D model?' },
  srcs: { nl: 'Bronnen', en: 'Sources' }, rcsb: { nl: 'RCSB PDB-pagina', en: 'RCSB PDB page' },
  simpl: { nl: 'Wat is vereenvoudigd?', en: 'What is simplified?' },
  orgOf: { nl: 'bron van de structuur', en: 'structure source' },
  liveTitle: { nl: 'titel in de PDB (live opgehaald)', en: 'title in the PDB (fetched live)' },
  plant: { nl: '⚠ Plant & biotech — komt niet voor in de menselijke cel', en: '⚠ Plant & biotech — does not occur in the human cell' },
  hbond: { nl: 'waterstofbrug', en: 'hydrogen bond' }, synConf: { nl: 'syn-conformatie', en: 'syn conformation' },
  lig: { nl: 'ligand (C groen)', en: 'ligand (C green)' }, water1: { nl: 'water', en: 'water' },
  backbone: { nl: 'suiker-fosfaat', en: 'sugar–phosphate' }, protein: { nl: 'eiwit', en: 'protein' },
  heavyNote: { nl: 'grote structuur — lichte weergave', en: 'large structure — light rendering' },
  nmrNote: { nl: 'NMR · model 1', en: 'NMR · model 1' },
  // eenvoudige tabellen
  secFacts: { nl: 'Belangrijkste feiten', en: 'Key facts' }, secMeasured: { nl: 'Gemeten in dit 3D-model', en: 'Measured in this 3D model' },
  allCalc: { nl: 'Alle meetwaarden (voor wie meer wil)', en: 'All measurements (for those who want more)' },
  normal: { nl: 'gewoon DNA', en: 'ordinary DNA' }, estimate: { nl: 'schatting', en: 'estimate' },
  bentRow: { nl: 'Let op', en: 'Note' }, autoTxt: { nl: 'automatisch berekend: bij kort, gebogen of door eiwit vervormd DNA zijn de cijfers met * schattingen', en: 'computed automatically: for short, bent or protein-distorted DNA the numbers marked * are estimates' }, bentTxt: { nl: 'dit DNA is gebogen, dus de cijfers met * zijn schattingen', en: 'this DNA is bent, so the numbers marked * are estimates' },
  eBuild: { nl: 'Waaruit bestaat het?', en: 'What is it made of?' }, eLetters: { nl: 'bouwstenen (letters)', en: 'building blocks (letters)' },
  eIn: { nl: 'in', en: 'in' }, eStrand1: { nl: 'streng', en: 'strand' }, eStrandN: { nl: 'strengen', en: 'strands' },
  eProtein: { nl: 'eiwit', en: 'protein' }, eAA: { nl: 'aminozuren', en: 'amino acids' },
  eHand: { nl: 'Draairichting', en: 'Turns' }, eRight: { nl: 'rechtsom ↻', en: 'right-handed ↻' }, eLeft: { nl: 'linksom ↺', en: 'left-handed ↺' },
  eBpTurn: { nl: 'Treden per volledige draai', en: 'Steps per full turn' },
  eRise: { nl: 'Afstand tussen twee treden', en: 'Distance between two steps' },
  eWidth: { nl: 'Breedte van de helix', en: 'Width of the helix' },
  eNbp: { nl: 'Basenparen in dit stukje', en: 'Base pairs in this piece' },
  eQuart: { nl: 'Vlakken van vier G’s', en: 'Layers of four G’s' }, eCC: { nl: 'C–C-paren', en: 'C–C pairs' },
  eThird: { nl: 'Basen van de derde streng', en: 'Bases of the third strand' },
  eIons: { nl: 'Metaalionen', en: 'Metal ions' }, eLig: { nl: 'Extra molecule', en: 'Extra molecule' },
  eMods: { nl: 'Chemisch aangepaste bouwstenen', en: 'Chemically modified building blocks' },
  eMethod: { nl: 'Hoe gemeten?', en: 'How measured?' }, eSharp: { nl: 'Scherpte van het model', en: 'Sharpness of the model' },
  eSharpHint: { nl: 'hoe kleiner, hoe scherper', en: 'smaller is sharper' },
  rVery: { nl: 'zeer scherp', en: 'very sharp' }, rSharp: { nl: 'scherp', en: 'sharp' }, rGood: { nl: 'redelijk', en: 'fair' }, rRough: { nl: 'grof', en: 'rough' },
  mXray: { nl: 'röntgenstralen door een kristal', en: 'X-rays through a crystal' }, mNmr: { nl: 'NMR, in oplossing', en: 'NMR, in solution' }, mEm: { nl: 'elektronenmicroscoop', en: 'electron microscope' },
  seqLbl: { nl: 'Volgorde:', en: 'Sequence:' },
  // laadbalk
  stDownload: { nl: 'Downloaden', en: 'Downloading' }, stParse: { nl: 'Atomen inlezen', en: 'Reading the atoms' },
  stCalc: { nl: 'Vorm berekenen', en: 'Computing the shape' }, stDraw: { nl: 'Figuur tekenen', en: 'Drawing the figure' },
  stepOf: { nl: (n, m) => `stap ${n} van ${m}`, en: (n, m) => `step ${n} of ${m}` }, received: { nl: 'binnen', en: 'received' },
  bigHint: { nl: 'grote structuur', en: 'large structure' },
  eChains: { nl: 'ketens', en: 'chains' }, eSS: { nl: 'Vorm van het eiwit', en: 'Shape of the protein' },
  eHelix: { nl: 'opgerold stuk (helix)', en: 'coiled piece (helix)' }, eSheet: { nl: 'gestrekt stuk (β-streng)', en: 'stretched piece (β-strand)' },
  // zelf een PDB-code opzoeken
  tabAtlas: { nl: '📚 Bibliotheek', en: '📚 Library' }, tabPdb: { nl: '🌐 PDB‑databank', en: '🌐 PDB database' },
  tipAtlas: { nl: 'Zoek tussen de moleculen van deze bibliotheek, met uitleg en vaak ook in het verhaal.', en: 'Search the molecules of this library, with explanations and often also in the story.' },
  pdbLbl: { nl: 'Zoek elk eiwit of gen in de hele PDB-databank (buiten de bibliotheek, zonder uitleg op maat)', en: 'Find any protein or gene in the whole PDB database (outside the library, without tailored explanations)' }, pdbGo: { nl: 'Zoek', en: 'Search' }, pdbPh: { nl: 'bv. TP53 of 4HHB', en: 'e.g. TP53 or 4HHB' },
  pdbTip: { nl: 'Typ een gen (TP53), een eiwitnaam (insuline) of een PDB-code van 4 tekens (4HHB). De app zoekt in UniProt en de PDB-databank (rcsb.org).', en: 'Type a gene (TP53), a protein name (insulin) or a 4-character PDB code (4HHB). The app searches UniProt and the PDB database (rcsb.org).' },
  // zoeken op gen- of eiwitnaam
  srchBusy: { nl: t => `Zoeken naar ${t}…`, en: t => `Searching for ${t}…` },
  srchNone: { nl: t => `Geen structuren gevonden voor ${t}.`, en: t => `No structures found for ${t}.` },
  srchShort: { nl: 'Typ minstens 2 tekens.', en: 'Type at least 2 characters.' },
  srchHead: { nl: (t, n) => `PDB-resultaten voor „${t}” (${n})`, en: (t, n) => `PDB results for “${t}” (${n})` },
  srchGene: { nl: (g, nm, org) => `Gen ${g}: ${nm}${org ? ` (${org})` : ''}`, en: (g, nm, org) => `Gene ${g}: ${nm}${org ? ` (${org})` : ''}` },
  srchOrder: { nl: 'Bovenaan: het grootste stuk van het eiwit, het scherpst gemeten. De titels zijn Engels, zoals in de PDB.', en: 'At the top: the largest piece of the protein, measured most sharply.' },
  srchText: { nl: 'Geen gen of eiwit herkend: gewone zoekopdracht in de (Engelse) titels van de PDB.', en: 'No gene name recognised: plain search in titles and descriptions.' },
  srchMore: { nl: n => `Toon ${n} meer`, en: n => `Show ${n} more` },
  pickBest: { nl: 'Aanrader', en: 'Recommended' },
  tblHide: { nl: 'Tabel ▸', en: 'Table ▸' }, tblShow: { nl: '◂ Tabel', en: '◂ Table' },
  tblHideTip: { nl: 'Tabel inklappen: grotere figuur', en: 'Collapse the table: larger figure' }, tblShowTip: { nl: 'Tabel met feiten en metingen tonen', en: 'Show the table with facts and measurements' },
  pickWhyDna: { nl: 'Een groot stuk van het eiwit, samen met het DNA dat het vastpakt: zo zie je het eiwit aan het werk.', en: 'A large piece of the protein, together with the DNA it holds: you see the protein at work.' },
  pickWhyRna: { nl: 'Een groot stuk van het eiwit, samen met RNA: zo zie je het eiwit aan het werk.', en: 'A large piece of the protein, together with RNA: you see the protein at work.' },
  pickWhy: { nl: 'Een groot stuk van het eiwit, scherp gemeten.', en: 'A large piece of the protein, measured sharply.' },
  pickOld: { nl: y => ` Een van de eerste structuren van dit eiwit (${y}).`, en: y => ` One of the first structures of this protein (${y}).` },
  altHead: { nl: 'Of kies een andere versie', en: 'Or pick another version' },
  altNoDna: { nl: 'Het eiwit alleen (zonder DNA)', en: 'The protein on its own (without DNA)' },
  altDna: { nl: 'Samen met DNA', en: 'Together with DNA' },
  altBig: { nl: 'Het grootste stuk van het eiwit', en: 'The largest piece of the protein' },
  altSharp: { nl: 'Het meest gedetailleerde model', en: 'The most detailed model' },
  whyNoDna: { nl: 'Zonder DNA of andere eiwitten: je ziet alleen de vorm van het eiwit zelf.', en: 'Without DNA or other proteins: you see only the shape of the protein itself.' },
  whyDna: { nl: 'Het eiwit terwijl het DNA vastpakt: zo zie je wat het doet.', en: 'The protein while it holds DNA: you see what it does.' },
  whyBig: { nl: 'Bevat het grootste deel van het eiwit; de andere tonen maar een stuk.', en: 'Contains the largest part of the protein; the others show only a piece.' },
  whySharp: { nl: r => `Het nauwkeurigst gemeten van allemaal (${r} Å; hoe kleiner dat getal, hoe nauwkeuriger): de plaats van elk atoom is hier het best bepaald. Kies dit als je kleine details wil bekijken, zoals waar één aminozuur precies zit.`, en: r => `Measured most precisely of all (${r} Å; the smaller that number, the more precise): the position of every atom is best known here. Choose this to look at small details, such as exactly where one amino acid sits.` },
  allHead: { nl: n => `Alle ${n} structuren tonen (voor gevorderden, titels in het Engels)`, en: n => `Show all ${n} structures (advanced)` },
  allHide: { nl: 'Lange lijst verbergen', en: 'Hide the long list' },
  copiesOf: { nl: (n, g) => `${n} kopieën van ${g}`, en: (n, g) => `${n} copies of ${g}` },
  pieceOf: { nl: (p, a, b) => `${p} % van het eiwit (${a} van ${b} aminozuren)`, en: (p, a, b) => `${p} % of the protein (${a} of ${b} amino acids)` },
  withDna: { nl: 'met DNA', en: 'with DNA' }, withRna: { nl: 'met RNA', en: 'with RNA' }, srchClose: { nl: 'Resultaten sluiten', en: 'Close the results' },
  srchCov: { nl: (a, b) => `stuk: ${a} van ${b} aminozuren`, en: (a, b) => `piece: ${a} of ${b} amino acids` }, srchFull: { nl: 'heel het eiwit', en: 'the whole protein' },
  srchDna: { nl: '+ DNA', en: '+ DNA' }, srchRna: { nl: '+ RNA', en: '+ RNA' },
  srchPartners: { nl: n => `+ ${n} ander${n === 1 ? ' eiwit' : 'e eiwitten'}`, en: n => `+ ${n} other protein${n === 1 ? '' : 's'}` },
  mXrayS: { nl: 'röntgen', en: 'X-ray' }, mNmrS: { nl: 'NMR', en: 'NMR' }, mEmS: { nl: 'elektronenmicroscoop', en: 'electron microscope' }, mOtherS: { nl: 'andere methode', en: 'other method' },
  srchHuman: { nl: 'mens', en: 'human' },
  codeBad: { nl: 'Een PDB-code heeft 4 tekens en begint met een cijfer (bv. 4HHB).', en: 'A PDB code has 4 characters and starts with a digit (e.g. 4HHB).' },
  codeLooking: { nl: 'Zoeken in de PDB…', en: 'Searching the PDB…' },
  codeNone: { nl: c => `${c} bestaat niet in de PDB.`, en: c => `${c} does not exist in the PDB.` },
  codeOffline: { nl: 'Geen verbinding met de PDB (internet nodig).', en: 'No connection to the PDB (internet needed).' },
  lookFor: { nl: c => `🔎 PDB-code ${c} opzoeken`, en: c => `🔎 Look up PDB code ${c}` }, lookForSub: { nl: 'haalt de structuur op van rcsb.org', en: 'fetches the structure from rcsb.org' },
  lookName: { nl: c => `🔎 „${c}” zoeken in de PDB`, en: c => `🔎 Search the PDB for “${c}”` }, lookNameSub: { nl: 'als gen (TP53), eiwitnaam (insuline) of woord uit de titel', en: 'as a gene (TP53), protein name (insulin) or word from the title' },
  mine: { nl: 'Zelf opgezocht', en: 'Looked up yourself' }, ours: { nl: 'Bibliotheek', en: 'Library' }, mineBadge: { nl: '📌 zelf opgezocht · niet uit de bibliotheek', en: '📌 looked up yourself · not from the library' },
  mineHead: { nl: '📌 Zelf opgezocht — niet uit de bibliotheek', en: '📌 Looked up yourself — not from the library' }, oursHead: { nl: '📚 Uit de bibliotheek — met uitleg', en: '📚 From the library — with explanations' },
  atlasBadge: { nl: '📚 uit de bibliotheek', en: '📚 from the library' },
  mineNote: { nl: 'Deze structuur heb je zelf opgezocht in de PDB. Ze komt niet uit de bibliotheek: er is geen uitleg op maat en ze staat niet in het verhaal.', en: 'You looked up this structure yourself in the PDB. It is not from the library: there is no tailored explanation and it is not in the story.' },
  forget: { nl: 'Uit de lijst halen', en: 'Remove from the list' },
  loadingHuge: { nl: n => `zeer groot (~${n} 000 atomen), dit kan even duren`, en: n => `very large (~${n},000 atoms), this may take a while` },
  // uitlegpaneel
  inShort: { nl: 'In het kort', en: 'In short' }, look: { nl: 'Wat zie je in de figuur?', en: 'What do you see in the figure?' },
  why: { nl: 'Waarom is dit belangrijk?', en: 'Why does it matter?' }, more: { nl: 'Voor wie meer wil', en: 'For those who want more' },
};
const t = k => { const v = T[k]; return typeof v === 'function' ? v : L(v); };

/* ---------- kleuren ---------- */
const CSS = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const COL = { dna: '#4f8ff7', dna2: '#9cc0ff', rna: '#ff8a3d', prot: '#9b7bff', histone: '#8a93a8', tdna: '#f06bc0' };
const PAL = {
  dna: ['#4f8ff7', '#9cc0ff', '#5fd3e6', '#7a8cff', '#3fb5d9', '#b8d4ff'],
  rna: ['#ff8a3d', '#ffc58f', '#ffb000', '#e0703a', '#ffd9b3', '#ff9f66'],
  prot: ['#9b7bff', '#6f5bd6', '#c3b1ff', '#5a4bb8', '#b69cff', '#8466f0', '#d8ccff', '#7e6bd0', '#a58fff', '#6a55c8'],
  histone: ['#8a93a8', '#a3abbd', '#727c93', '#b8bfcf'],
};
const ELEMCOL = { C: '#909090', N: '#3050f8', O: '#ff0d0d', P: '#ff8000', S: '#ffff30', SE: '#ffa100', F: '#90e050', CL: '#1ff01f', BR: '#a62929', I: '#940094', FE: '#e06633', ZN: '#7d80b0', MG: '#8aff00' };
const BASECOL = { A: '#5ad17a', T: '#ff6b6b', U: '#ff6b6b', G: '#ffc247', C: '#4fb0ff' };
const IONCOL = { K: '#8f40d4', NA: '#ab5cf2', MG: '#8aff00', MN: '#9c7ac7', CA: '#3dff00', ZN: '#7d80b0', CL: '#1ff01f', SR: '#00ff27', BA: '#00c900', CS: '#57178f', CO: '#f090a0', NI: '#50d050', CD: '#ffd98f', TL: '#a6544d', IOD: '#940094', BR: '#a62929' };
const IONRAD = { K: 1.35, NA: 1.0, MG: .72, MN: .8, CA: 1.0, ZN: .8, CL: 1.4, SR: 1.2, BA: 1.35, CS: 1.6, TL: 1.4 };
const BB = /'|^P$|^OP|^O[123]P/;
const SPIN = .3;   // draaisnelheid (was .6: te snel om rustig te bekijken)
const SUGAR = new Set(["C1'", "C2'", "C3'", "C4'", "O4'", "C5'", "O5'", "O3'", 'P']);   // suikerring + fosfaatbrug: hangt de base aan het lint

/* ---------- toestand ---------- */
const state = {
  id: BY[q.get('id')] ? q.get('id') : 'bdna',
  cmp: false, set: [],
  filt: { type: new Set(), cls: new Set(), ctx: new Set() }, text: '',
  found: null, foundShown: 10, foundAll: false, na: true,
  style: 'cartoon', bases: 'rings', color: 'type', colorWant: 'auto', hb: false, syn: false, ions: true, ligs: true, water: false,
};
// optionele weergave-instellingen via de URL (deelbare links): ?style=trace&color=base&hb=1&syn=1&water=1&ions=0&ligs=0
if (['cartoon', 'stick', 'sphere'].includes(q.get('style'))) state.style = q.get('style');
if (q.get('style') === 'trace' || q.get('bases') === 'rungs') state.bases = 'rungs';   // oude links naar de ladder blijven werken
if (['part', 'strand', 'chain', 'type', 'base', 'elem'].includes(q.get('color'))) state.colorWant = q.get('color') === 'strand' ? 'chain' : q.get('color');
for (const k of ['hb', 'syn', 'ions', 'ligs', 'water', 'na']) if (q.has(k)) state[k] = q.get(k) === '1';
const cmpIds = (q.get('cmp') || '').split(',').filter(id => BY[id] && id !== state.id).slice(0, 2);
if (cmpIds.length) { state.cmp = true; state.set = [state.id, ...cmpIds]; } else state.set = [state.id];

/* ---------- statische teksten ---------- */
document.title = `${t('ttl')} · Dogma`;
$('ttl').textContent = t('ttl'); $('ttlSub').textContent = t('ttlSub');
$('home').textContent = t('home'); $('storyLink').textContent = t('story');
if (FROM && /^[a-z0-9_-]+$/i.test(FROM)) { $('back').hidden = false; $('back').textContent = t('back'); $('back').href = `../app/index.html?scene=${encodeURIComponent(FROM)}`; }
$('storyLink').href = FROM ? `../app/index.html?scene=${encodeURIComponent(FROM)}` : '../app/index.html';
$('q').placeholder = t('search');
$('tabAtlas').textContent = t('tabAtlas'); $('tabPdb').textContent = t('tabPdb'); $('tipAtlas').textContent = t('tipAtlas');
function setPane(p) {
  for (const b of document.querySelectorAll('#stabs [role=tab]')) b.setAttribute('aria-selected', String(b.dataset.pane === p));
  $('paneAtlas').hidden = p !== 'atlas'; $('pdbForm').hidden = p !== 'pdb';
  (p === 'atlas' ? $('q') : $('pdbIn')).focus();
}
$('stabs').onclick = e => { const b = e.target.closest('[role=tab]'); if (b) setPane(b.dataset.pane); };
$('pdbLbl').textContent = t('pdbLbl'); $('pdbGo').textContent = t('pdbGo'); $('pdbIn').placeholder = t('pdbPh'); $('pdbForm').title = t('pdbTip');
$('reset').textContent = t('reset');
$('cmpBtn').textContent = t('cmp');
$('cmpHint').textContent = t('cmpHint');
document.querySelectorAll('[data-t]').forEach(e => e.textContent = t(e.dataset.t));
$('langBox').innerHTML = ['nl', 'en'].map(l => `<button class="lang" data-l="${l}" aria-pressed="${l === lang}" title="${l === 'nl' ? 'Nederlands' : 'English'}">${l.toUpperCase()}</button>`).join('');
$('langBox').onclick = e => { const b = e.target.closest('.lang'); if (b && b.dataset.l !== lang) setLang(b.dataset.l); };

/* ---------- filters en lijst ---------- */
/* filters: per groep een inklapbare lijst met vinkjes onder elkaar (met aantal items per keuze) */
document.addEventListener('click', e => { const o = $('optsBox'); if (o.open && !o.contains(e.target)) o.open = false; });
function buildFilters() {
  const open = new Set([...document.querySelectorAll('#filters details[open]')].map(d => d.dataset.g));
  $('filters').innerHTML = Object.entries(FILTERS).map(([g, def]) => {
    const n = state.filt[g].size;
    return `<details class="fgrp" data-g="${g}"${open.has(g) ? ' open' : ''}><summary>${L(def.label)}<b class="fn">${n || ''}</b></summary><div class="fl">${
      Object.entries(def.opts).map(([k, lab]) => {
        const c = ENTRIES.filter(e => e[g].includes(k)).length;
        return `<label class="fo"><input type="checkbox" data-g="${g}" data-k="${k}"${state.filt[g].has(k) ? ' checked' : ''}><span>${L(lab)}</span><i>${c}</i></label>`;
      }).join('')}</div></details>`;
  }).join('');
}
$('filters').onchange = e => {
  const b = e.target.closest('input[data-g]'); if (!b) return;
  const s = state.filt[b.dataset.g];
  b.checked ? s.add(b.dataset.k) : s.delete(b.dataset.k);
  b.closest('details').querySelector('.fn').textContent = s.size || '';
  renderList();
};
$('reset').onclick = () => { for (const s of Object.values(state.filt)) s.clear(); state.text = ''; $('q').value = ''; buildFilters(); renderList(); };
$('q').oninput = e => { state.text = e.target.value.trim().toLowerCase(); renderList(); };
/* ?find=… (vanuit de zoekbalk van de app): meteen invullen */
if (q.get('find')) { $('q').value = q.get('find').slice(0, 60); state.text = $('q').value.trim().toLowerCase(); }

const facetOk = e => Object.entries(state.filt).every(([g, f]) => !f.size || (e[g] ?? []).some(v => f.has(v)));
/* slimme filter (atlas/smartsearch.js): "mens dubbelstreng", "enkel streng", "triple helix", eiwitnamen …, gesorteerd op hoe goed het past */
function filtered() {
  const all = [...CUSTOM, ...ENTRIES].filter(facetOk);
  if (!state.text) { $('qinfo').innerHTML = ''; return all; }
  const r = smartFilter(state.text, all, { SIMPLE });
  const chips = r.concepts.map(c => `<span class="qc">${esc(L(c.label))}</span>`).join('') + (r.free.length ? ` <span class="qw">${t('words')} ${r.free.map(esc).join(', ')}</span>` : '');
  $('qinfo').innerHTML = (r.concepts.length ? `<b>${t('recog')}</b> ` : '') + chips + (r.loose ? `<div class="ql">${t('loose')}</div>` : '');
  return r.list;
}
function renderList() {
  const list = filtered();
  $('count').textContent = t('count')(list.length);
  const code = state.text.toUpperCase();
  const raw = $('q').value.trim();
  const look = CODE_RE.test(code) ? (BY['pdb-' + code] ? '' : `<li class="item lookup" data-code="${code}" tabindex="0"><span class="tx"><div class="nm">${t('lookFor')(code)}</div><div class="sb">${t('lookForSub')}</div></span></li>`)
    : raw.length >= 2 && state.found?.term.toLowerCase() !== raw.toLowerCase() ? `<li class="item lookup" data-search="${esc(raw)}" tabindex="0"><span class="tx"><div class="nm">${t('lookName')(esc(raw))}</div><div class="sb">${t('lookNameSub')}</div></span></li>` : '';
  let lastCustom = false;
  $('list').innerHTML = look + foundHTML() + (list.length ? list.map(e => {
    const head = e.custom && !lastCustom ? `<li class="lhead mine">${t('mineHead')}</li>` : !e.custom && lastCustom ? `<li class="lhead">${t('oursHead')}</li>` : '';
    lastCustom = !!e.custom;
    const inSet = state.set.includes(e.id);
    const on = state.cmp ? inSet : e.id === state.id;
    return head + `<li class="item ${e.custom ? 'mine' : ''} ${on ? 'on' : ''} ${state.cmp && inSet && e.id !== state.set[0] ? 'cmp' : ''}" data-id="${e.id}" tabindex="0">
      ${state.cmp ? `<span class="ck ${inSet ? 'on' : ''}">${inSet ? state.set.indexOf(e.id) + 1 : ''}</span>` : ''}
      <span class="tx"><div class="nm">${listName(e)}</div><div class="sb">${listSub(e)}</div></span>
      ${e.custom ? `<button class="forget" data-forget="${e.id}" title="${t('forget')}">×</button>` : `<span class="pdb ${e.pdb ? '' : 'no'}">${e.pdb ?? t('schema')}</span>`}</li>`;
  }).join('') : (look ? '' : `<li class="sb" style="color:var(--muted);padding:10px">${t('none')}</li>`));
}
$('list').onclick = e => {
  const f = e.target.closest('[data-forget]');
  if (f) { e.stopPropagation(); forget(f.dataset.forget); return; }
  if (e.target.closest('[data-clear]')) { e.stopPropagation(); state.found = null; renderList(); return; }
  if (e.target.closest('[data-more]')) { state.foundShown += 10; renderList(); return; }
  if (e.target.closest('[data-all]')) { state.foundAll = !state.foundAll; renderList(); return; }
  const li = e.target.closest('.item'); if (!li) return;
  if (li.dataset.search) runSearch(li.dataset.search); else if (li.dataset.code) openCode(li.dataset.code); else pick(li.dataset.id);
};
/* ---------- zoeken op gen- of eiwitnaam ---------- */
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function foundHTML() {
  const f = state.found; if (!f) return '';
  const p = f.prot;
  const head = `<li class="lhead found"><span>${t('srchHead')(esc(f.term), f.total)}</span><button class="forget" data-clear title="${t('srchClose')}">×</button></li>
    <li class="fnote">${p ? t('srchGene')(esc(p.gene), esc(p.name), p.sci === 'Homo sapiens' ? t('srchHuman') : esc(p.sci ?? '')) : t('srchText')}</li>`;
  const meth = x => `${t({ xray: 'mXrayS', nmr: 'mNmrS', em: 'mEmS', other: 'mOtherS' }[x.method])}${x.res ? ` ${num(x.res)} Å` : ''}`;
  const gname = p ? esc(p.gene) : '';
  /* eenvoudige beschrijving: hoeveel van het eiwit, hoeveel kopieën, met DNA/RNA */
  const plain = x => [x.cov != null && p?.len ? t('pieceOf')(Math.round(x.cov * 100), x.len, p.len) : '', x.copies > 1 && gname ? t('copiesOf')(x.copies, gname) : '', x.dna ? t('withDna') : '', x.rna ? t('withRna') : ''].filter(Boolean).join(' · ');
  const card = (x, label, why, cls) => {
    const on = state.id === 'pdb-' + x.code;
    return `<li class="item res pick ${cls} ${on ? 'on' : ''}" data-code="${x.code}" tabindex="0"><span class="tx"><div class="pl">${label}</div>${why ? `<div class="why">${why}</div>` : ''}<div class="sb">${plain(x)}</div><div class="en">${esc(x.title)} · ${meth(x)} · ${x.year}</div></span><span class="pdb">${x.code}</span></li>`;
  };
  if (!p || f.items.length < 3) {   // geen gen herkend of weinig treffers: gewone lijst
    const rows = f.items.slice(0, state.foundShown).map(x => card(x, esc(x.title), '', '')).join('');
    const left = f.items.length - state.foundShown;
    return head + rows + (left > 0 ? `<li class="fmore"><button class="link" data-more>${t('srchMore')(Math.min(10, left))}</button></li>` : '') + `<li class="lhead">${t('ours')}</li>`;
  }
  const big = f.items.filter(x => (x.cov ?? 0) >= .4 && !x.odd);   // geen mutanten of medicijn-screenings als alternatief
  const best = f.items[0];
  const why = (best.dna ? t('pickWhyDna') : best.rna ? t('pickWhyRna') : t('pickWhy')) + (+best.year <= 2000 ? t('pickOld')(best.year) : '');
  const used = new Set([best.code]);
  const alts = [];
  const add = (x, lab, why = '') => { if (x && !used.has(x.code)) { used.add(x.code); alts.push(card(x, lab, typeof why === 'function' ? why(x) : why, 'alt')); } };
  if (best.dna) add(big.find(x => !x.dna && !x.rna && !x.partners), t('altNoDna'), t('whyNoDna')); else add(big.find(x => x.dna), t('altDna'), t('whyDna'));
  const largest = [...f.items].filter(x => x.cov != null && !x.odd).sort((a, b) => b.cov - a.cov || (a.res ?? 9) - (b.res ?? 9))[0];
  if (largest && largest.cov > (best.cov ?? 0) + .1) add(largest, t('altBig'), t('whyBig'));
  add([...big].filter(x => x.res).sort((a, b) => a.res - b.res)[0], t('altSharp'), x => t('whySharp')(num(x.res)));
  let h = head + card(best, `★ ${t('pickBest')}`, why, 'best') + (alts.length ? `<li class="fnote alth">${t('altHead')}</li>${alts.join('')}` : '');
  h += `<li class="fmore"><button class="link" data-all>${state.foundAll ? t('allHide') : t('allHead')(f.items.length)}</button></li>`;
  if (state.foundAll) {
    const rest = f.items.filter(x => !used.has(x.code)).slice(0, state.foundShown);
    h += rest.map(x => card(x, esc(x.title), '', 'adv')).join('');
    const left = f.items.length - used.size - state.foundShown;
    if (left > 0) h += `<li class="fmore"><button class="link" data-more>${t('srchMore')(Math.min(10, left))}</button></li>`;
  }
  return h + `<li class="lhead">${t('ours')}</li>`;
}
let searchNo = 0;
async function runSearch(raw) {
  const term = String(raw ?? '').trim(); const msg = $('pdbMsg');
  if (CODE_RE.test(term.toUpperCase())) return openCode(term);
  if (term.length < 2) { msg.textContent = t('srchShort'); msg.className = 'pdbmsg bad'; return; }
  const me = ++searchNo;
  msg.textContent = t('srchBusy')(term); msg.className = 'pdbmsg';
  let f = null;
  try { f = await searchPDB(term); } catch { if (me === searchNo) { msg.textContent = t('codeOffline'); msg.className = 'pdbmsg bad'; } return; }
  if (me !== searchNo) return;
  if (!f || !f.items.length) { msg.textContent = t('srchNone')(term); msg.className = 'pdbmsg bad'; return; }
  msg.textContent = ''; msg.className = 'pdbmsg';
  state.found = f; state.foundShown = 10; state.foundAll = false; $('pdbIn').value = '';
  if (state.text) { state.text = ''; $('q').value = ''; }
  renderList(); $('list').scrollTop = 0;
}
function forget(id) {
  const i = CUSTOM.findIndex(x => x.id === id); if (i < 0) return;
  forgetRecent(CUSTOM[i].pdb); CUSTOM.splice(i, 1); delete BY[id];
  state.set = state.set.filter(x => x !== id);
  if (!state.set.length) state.set = ['bdna'];
  state.id = state.set[0]; update();
}
/* PDB-code opzoeken: veld bovenaan, of een code in het zoekveld + Enter */
async function openCode(raw) {
  const code = String(raw ?? '').trim().toUpperCase();
  const msg = $('pdbMsg');
  if (!CODE_RE.test(code)) { msg.textContent = t('codeBad'); msg.className = 'pdbmsg bad'; return; }
  if (!BY['pdb-' + code]) {
    msg.textContent = t('codeLooking'); msg.className = 'pdbmsg';
    let meta = null;
    try { meta = await fetchMeta(code); } catch { msg.textContent = t('codeOffline'); msg.className = 'pdbmsg bad'; return; }
    if (!meta) { msg.textContent = t('codeNone')(code); msg.className = 'pdbmsg bad'; return; }
    addCustom(code, meta); saveRecent(code, meta);
  }
  msg.textContent = ''; msg.className = 'pdbmsg';
  $('pdbIn').value = '';
  if (state.text) { state.text = ''; $('q').value = ''; }
  pick('pdb-' + code);
  const li = document.querySelector(`.item[data-id="pdb-${code}"]`); li?.scrollIntoView({ block: 'nearest' });
}
$('pdbForm').onsubmit = e => { e.preventDefault(); runSearch($('pdbIn').value); };
$('pdbIn').oninput = () => { $('pdbMsg').textContent = ''; };
$('q').onkeydown = e => { const v = e.target.value.trim(); if (e.key === 'Enter' && v.length >= 2 && (CODE_RE.test(v.toUpperCase()) || !document.querySelector('#list .item[data-id]'))) runSearch(v); };
$('list').onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { const li = e.target.closest('.item'); if (li) { e.preventDefault(); li.click(); } } };

function pick(id) {
  if (state.cmp) {
    const i = state.set.indexOf(id);
    if (i >= 0) { if (state.set.length > 1) state.set.splice(i, 1); }
    else { if (state.set.length >= 3) state.set.pop(); state.set.push(id); }
    state.id = state.set[0];
  } else { state.id = id; state.set = [id]; }
  update();
}
$('cmpBtn').onclick = () => {
  state.cmp = !state.cmp;
  if (state.cmp) { const sug = (BY[state.id].cmp ?? []).filter(x => BY[x]).slice(0, 1); state.set = [state.id, ...sug]; }
  else state.set = [state.id];
  update();
};
$('presets').innerHTML = `<span>${t('presets')}</span>` + PRESETS.map((p, i) => `<button data-i="${i}">${L(p.label)}</button>`).join('');
$('presets').onclick = e => { const b = e.target.closest('button'); if (!b) return; state.set = PRESETS[+b.dataset.i].ids.slice(); state.id = state.set[0]; update(); };

/* ---------- viewers (vaste pool van 3, hergebruikt) ---------- */
const SLOTS = [];
for (let i = 0; i < 3; i++) {
  const el = document.createElement('div'); el.className = 'slot'; el.hidden = true;
  el.innerHTML = `<div class="sh"><h3></h3><span class="hand"></span><a class="pdbl" target="_blank" rel="noopener"></a><button class="schb" type="button" hidden></button><button class="tg" type="button"></button><button class="x" title="×">×</button></div>
    <div class="sbody"><div class="sview"><div class="sleg" hidden></div><div class="stage"><div class="load"></div><div class="pop" role="status" hidden></div><div class="note3d" hidden></div><div class="diag" hidden></div></div><div class="chint" hidden></div>
    <div class="dleg" hidden></div><div class="smeta"></div></div><div class="grip" role="separator" aria-orientation="vertical"><i></i></div><div class="calcgrid"></div></div>`;
  $('slots').append(el);
  const stage = el.querySelector('.stage');
  const viewer = $3Dmol.createViewer(stage, { backgroundColor: CSS('--bg-2') || '#0d1426', antialias: true });
  const s = { i, el, stage, viewer, token: 0, entry: null, atoms: null, an: null, down: null, popT: 0, focus: null };
  el.querySelector('.sleg').addEventListener('click', e => {
    if (e.target.closest('[data-tog]')) { legClosed = !legClosed; try { localStorage.setItem('atlas-leg', legClosed ? '0' : '1'); } catch { /* geen opslag */ } legend(); requestAnimationFrame(() => SLOTS.forEach(o => { if (!o.el.hidden) { o.viewer.resize(); o.viewer.render(); } })); return; }
    if (e.target.closest('[data-more]')) { s.legAll = !s.legAll; legend(); requestAnimationFrame(() => { s.viewer.resize(); s.viewer.render(); }); return; }
    const b = e.target.closest('[data-f]'); if (!b) return;
    s.focus = !b.dataset.f || s.focus === b.dataset.f ? null : b.dataset.f;
    render(s); legend();
  });
  // klikinfo: 3Dmol meldt enkel klikken óp een atoom; een klik ernaast (zonder slepen) sluit het tabje
  stage.addEventListener('pointerdown', e => { s.down = { x: e.clientX, y: e.clientY }; });
  stage.addEventListener('mouseup', e => {
    const d = s.down; if (!d || Math.hypot(e.clientX - d.x, e.clientY - d.y) > 4) return;
    if (e.target.closest('.pop')) return;
    // 3Dmol meldt een klik op een atoom pas iets later: verscheen er geen nieuw tabje, dan was het een klik ernaast
    const t0 = performance.now(); setTimeout(() => { if (!(s.popT >= t0)) hidePop(s); }, 450);
  });
  stage.querySelector('.pop').addEventListener('click', e => {
    if (e.target.closest('.px')) hidePop(s);
    const f = e.target.closest('.pfocus'); if (f) { s.focus = f.dataset.chain ? 'c:' + f.dataset.chain : null; render(s); legend(); }
  });
  // het vak krijgt zijn hoogte uit de lay-out (vult het scherm): de viewer schaalt mee als het vak van maat verandert
  let lastH = 0;
  new ResizeObserver(() => { const h = Math.round(stage.clientHeight); if (h && h !== lastH && !el.hidden) { lastH = h; viewer.resize(); viewer.render(); } }).observe(stage);
  el.querySelector('.tg').onclick = () => setTable(!tableOpen);
  el.querySelector('.schb').onclick = () => showSchema(s, !s.schema);
  gripDrag(el.querySelector('.grip'), el.querySelector('.sbody'));
  el.querySelector('.x').onclick = () => { if (state.set.length > 1) { state.set = state.set.filter(x => x !== s.entry?.id); state.id = state.set[0]; update(); } };
  SLOTS.push(s);
}

/* tabel naast de figuur in- en uitklappen (grotere figuur, of op kleinere schermen); keuze onthouden */
const TBL_KEY = 'atlas-table';
let tableOpen = (() => { try { const v = localStorage.getItem(TBL_KEY); if (v === '0' || v === '1') return v === '1'; } catch { /* geen opslag */ } return !matchMedia('(max-width: 1100px)').matches; })();
function setTable(open) {
  tableOpen = open; try { localStorage.setItem(TBL_KEY, open ? '1' : '0'); } catch { /* geen opslag */ }
  for (const s of SLOTS) {
    s.el.classList.toggle('notbl', !open);
    const b = s.el.querySelector('.tg');
    b.textContent = open ? t('tblHide') : t('tblShow'); b.title = open ? t('tblHideTip') : t('tblShowTip'); b.setAttribute('aria-pressed', String(open));
  }
  requestAnimationFrame(() => SLOTS.forEach(s => { if (!s.el.hidden) { s.viewer.resize(); s.viewer.render(); } }));
}
setTable(tableOpen);

/* tabelbreedte met de muis verslepen; heel smal slepen = inklappen; keuze onthouden */
const TBLW_KEY = 'atlas-table-w', TBLW_DEF = 370;
const setTblW = w => document.documentElement.style.setProperty('--tblw', Math.round(w) + 'px');
try { const w = +localStorage.getItem(TBLW_KEY); if (w >= 240) setTblW(w); } catch { /* geen opslag */ }
function gripDrag(g, body) {
  g.title = t('gripTip');
  g.onpointerdown = ev => {
    ev.preventDefault(); g.setPointerCapture(ev.pointerId); g.classList.add('on');
    const r = body.getBoundingClientRect(), w0 = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tblw')) || TBLW_DEF;
    let w = w0;
    g.onpointermove = e => {
      w = r.right - e.clientX;
      if (w < 170) { g.classList.add('shut'); return; }
      g.classList.remove('shut');
      w = Math.max(240, Math.min(r.width - 280, w)); setTblW(w);
      SLOTS.forEach(s => { if (!s.el.hidden) { s.viewer.resize(); s.viewer.render(); } });
    };
    g.onpointerup = () => {
      g.onpointermove = g.onpointerup = null; g.classList.remove('on');
      if (g.classList.contains('shut')) { g.classList.remove('shut'); setTblW(w0); setTable(false); return; }
      try { localStorage.setItem(TBLW_KEY, String(Math.round(w))); } catch { /* geen opslag */ }
    };
  };
  g.ondblclick = () => { setTblW(TBLW_DEF); try { localStorage.removeItem(TBLW_KEY); } catch { /* geen opslag */ } SLOTS.forEach(s => { if (!s.el.hidden) { s.viewer.resize(); s.viewer.render(); } }); };
}

const cache = new Map();
const coordCache = new Map();
function getText(url) { if (!cache.has(url)) cache.set(url, fetchText(url).catch(err => { cache.delete(url); throw err; })); return cache.get(url); }

/* ---------- laadbalk: download in %, daarna inlezen → berekenen → tekenen ----------
 * Tussen de stappen wordt het scherm eerst getekend (nextPaint), zodat je ziet dat de app bezig is.
 * De bewegende balk is een CSS-transform-animatie: die loopt ook door terwijl de browser rekent. */
// (requestAnimationFrame pauzeert in een verborgen tabblad → na 60 ms toch verder, anders blijft het laden hangen)
const nextPaint = () => new Promise(r => { let done = false; const go = () => { if (!done) { done = true; setTimeout(r, 0); } }; requestAnimationFrame(go); setTimeout(go, 60); });
const MB = b => (b / 1048576).toFixed(1).replace('.', lang === 'nl' ? ',' : '.') + ' MB';
function loader(load, now) {
  load.innerHTML = `<div class="lbar ${now ? 'now' : ''}" role="progressbar" aria-live="polite"><div class="lt"><b></b><span></span></div><div class="track"><i></i></div><div class="ls"></div></div>`;
  const lb = load.querySelector('.lbar'), b = lb.querySelector('b'), st = lb.querySelector('.lt span'), bar = lb.querySelector('.track i'), sub = lb.querySelector('.ls');
  let timer = null;
  const api = {
    step(n, label, hint = '') { b.textContent = label; st.textContent = t('stepOf')(n, 4); api.pct(null, hint); },
    pct(p, txt = '') {
      lb.classList.toggle('ind', p == null);
      bar.style.width = p == null ? '' : `${Math.min(100, p * 100).toFixed(1)}%`;
      if (p != null) lb.setAttribute('aria-valuenow', Math.round(p * 100)); else lb.removeAttribute('aria-valuenow');
      sub.textContent = txt;
    },
    watch(urls, hint = '') {
      api.stop();
      timer = setInterval(() => {
        const ps = urls.map(u => PROGRESS.get(u)).filter(Boolean); if (!ps.length) return;
        const got = ps.reduce((a, p) => a + p.got, 0), total = ps.every(p => p.total) ? ps.reduce((a, p) => a + p.total, 0) : 0;
        if (total && got <= total) api.pct(got / total, `${Math.round(got / total * 100)} % · ${MB(got)} / ${MB(total)}${hint ? ' · ' + hint : ''}`);
        else api.pct(null, `${MB(got)} ${t('received')}${hint ? ' · ' + hint : ''}`);
      }, 120);
    },
    stop() { clearInterval(timer); timer = null; },
  };
  return api;
}
function getJson(url) { if (!cache.has(url)) cache.set(url, fetch(url).then(r => r.ok ? r.json() : null).catch(() => null)); return cache.get(url); }

async function loadSlot(s, e) {
  const token = ++s.token;
  hidePop(s, false);
  s.entry = e; s.atoms = null; s.an = null; s.focus = null; s.el.querySelector('.chint').hidden = true;
  const el = s.el;
  el.querySelector('h3').textContent = e.custom ? `PDB ${e.pdb}` : nameOf(e);
  const hand = el.querySelector('.hand'); hand.hidden = true;
  const pl = el.querySelector('.pdbl');
  el.querySelector('.x').hidden = !state.cmp || state.set.length < 2;
  const load = s.stage.querySelector('.load'), diag = s.stage.querySelector('.diag'), n3 = s.stage.querySelector('.note3d'), dleg = el.querySelector('.dleg');
  el.querySelector('.calcgrid').innerHTML = ''; el.querySelector('.smeta').innerHTML = '';
  s.viewer.clear(); s.viewer.removeAllShapes(); s.viewer.spin(false); s.viewer.render();
  n3.hidden = true;
  s.schema = false; const sb = el.querySelector('.schb'); sb.hidden = !(e.pdb && e.diagram);
  if (e.pdb && e.diagram) { sb.textContent = t('schemaBtn'); sb.title = t('schemaTip'); sb.setAttribute('aria-pressed', 'false'); }
  if (!e.pdb) {
    pl.textContent = ''; pl.removeAttribute('href');
    load.textContent = '';
    const d = DIAGRAMS[e.diagram](L);
    s.stage.classList.add('dg'); s.stage.style.setProperty('--ar', `${d.w} / ${d.h}`);
    diag.hidden = false; diag.innerHTML = d.svg;
    dleg.hidden = false; dleg.innerHTML = diagramLegend(d);
    el.querySelector('.smeta').innerHTML = `<span>${L(e.why3d)}</span>`;
    el.querySelector('.calcgrid').innerHTML = factsTable(e);
    return;
  }
  diag.hidden = true; diag.innerHTML = '';
  dleg.hidden = true; dleg.innerHTML = '';
  if (s.stage.classList.contains('dg')) { s.stage.classList.remove('dg'); s.viewer.resize(); }
  pl.textContent = `PDB ${e.pdb} ↗`; pl.href = `https://www.rcsb.org/structure/${e.pdb}`;
  const lb = loader(load, e.heavy || e.big);
  const hint = e.big ? t('loadingHuge')(Math.round(e.atoms / 1000)) : e.heavy ? t('bigHint') : '';
  lb.step(1, t('stDownload'), hint);
  try {
    let txt, fmt = 'pdb', info;
    if (e.custom) {
      // zelf opgezocht: rechtstreeks van RCSB (.pdb, of .cif.gz voor zeer grote structuren)
      lb.watch([coordUrl(e.pdb, 'pdb'), coordUrl(e.pdb, 'cif')], hint);
      if (!coordCache.has(e.pdb)) coordCache.set(e.pdb, fetchCoords(e.pdb, e.big));
      let c;
      [c, info] = await Promise.all([coordCache.get(e.pdb).catch(err => { coordCache.delete(e.pdb); throw err; }), getJson(rcsbEntryUrl(e.pdb))]);
      ({ txt, fmt } = c);
    } else {
      const url = pdbUrl(e.pdb, e.assembly ? 'pdb1' : 'pdb');
      lb.watch([url], hint);
      [txt, info] = await Promise.all([getText(url), getJson(rcsbEntryUrl(e.pdb))]);
    }
    lb.stop();
    if (token !== s.token) return;
    lb.step(2, t('stParse'), hint); await nextPaint(); if (token !== s.token) return;
    const mdl = fmt === 'cif' ? s.viewer.addModel(txt, 'cif') : s.viewer.addModel(preparePdb(txt, { assembly: !!e.assembly, keep: e.keep ?? null }), 'pdb');
    const atoms = mdl.selectedAtoms({});
    lb.step(3, t('stCalc'), hint); await nextPaint(); if (token !== s.token) return;
    const an = analyse(atoms, e);
    if (e.custom && an.helix && an.helix.nbp < 4) delete an.helix;  // geen echte dubbelhelix gevonden
    orient(atoms, an.frame);
    mendPolymer(atoms);
    s.atoms = atoms; s.an = an; s.info = info;
    const method = info?.exptl?.[0]?.method ?? '';
    const nmr = /NMR/i.test(method);
    if (e.heavy || nmr) { n3.hidden = false; n3.textContent = [nmr ? t('nmrNote') : '', e.heavy ? t('heavyNote') : ''].filter(Boolean).join(' · '); }
    if (an.helix) { hand.hidden = false; hand.className = 'hand ' + an.helix.hand; hand.textContent = an.helix.hand === 'r' ? t('right') : t('left'); }
    const res = info?.rcsb_entry_info?.resolution_combined?.[0];
    const chains = [...new Set(atoms.filter(a => a.kind === 'na').map(a => a.chain))];
    const seq = ch => atoms.filter(a => a.chain === ch && a.atom === "C1'").sort((a, b) => a.resi - b.resi).map(a => parentBase(a.resn) ?? 'x').join('');
    const seqTxt = chains.length && chains.length <= 4 && e.cls.some(c => ['duplex', 'quad', 'triplex', 'junction', 'single'].includes(c)) && !e.cls.includes('complex')
      ? chains.map(c => `<code>${seq(c)}</code>`).join(' · ') + ' · ' : '';
    el.querySelector('.smeta').innerHTML = `${seqTxt ? `${t('seqLbl')} ${seqTxt}` : ''}${methodText(method)}${res ? ` · ${res} Å` : ''}`;
    el.querySelector('.calcgrid').innerHTML = factsTable(e) + measuredTable(e, an, method, res) + `<details class="allcalc"><summary>${t('allCalc')}</summary>${calcTable(e, an)}</details>`;
    s.viewer.setClickable({}, true, a => showPop(s, a));
    // handje boven een atoom: zo zie je dat je erop kan klikken
    s.viewer.setHoverable({}, true, () => { s.stage.style.cursor = 'pointer'; }, () => { s.stage.style.cursor = ''; });
    const ch = s.el.querySelector('.chint'); ch.innerHTML = t('clickHint'); ch.hidden = false;
    lb.step(4, t('stDraw'), hint); await nextPaint(); if (token !== s.token) return;
    syncColor();
    render(s);
    load.textContent = '';
    s.viewer.zoomTo({ predicate: a => a.kind === 'na' || a.kind === 'prot' }); s.viewer.zoom(e.heavy ? 1.0 : 0.92); s.viewer.render();
    if ($('spin').checked) s.viewer.spin('y', SPIN);
    syncFrom(SLOTS.find(o => o !== s && o.atoms && !o.el.hidden));
  } catch (err) {
    lb.stop();
    if (token !== s.token) return;
    load.textContent = t('failed') + (e.custom ? t('codeOffline') + ' (' + err.message + ')' : err.message); console.error(err);
  }
}

/* lange moleculen: het schema van het geheel over de 3D-figuur leggen (en weer weg) */
function showSchema(s, on) {
  const e = s.entry; if (!e?.diagram) return;
  s.schema = on;
  const diag = s.stage.querySelector('.diag'), dleg = s.el.querySelector('.dleg'), b = s.el.querySelector('.schb');
  b.textContent = on ? t('schema3d') : t('schemaBtn'); b.setAttribute('aria-pressed', String(on));
  if (on) { const d = DIAGRAMS[e.diagram](L); diag.innerHTML = d.svg; dleg.innerHTML = diagramLegend(d); }
  diag.hidden = !on; dleg.hidden = !on; diag.classList.toggle('over', on);
  s.el.querySelector('.chint').hidden = on || !s.atoms;   // op het schema valt niets aan te klikken
  hidePop(s);
}

/* ---------- eenvoudige tabellen naast de figuur ----------
 * 1. "Belangrijkste feiten": per item met de hand geschreven (simple.js), in gewone taal.
 * 2. "Gemeten in dit 3D-model": een paar berekende waarden in gewone woorden, telkens naast gewoon DNA ter vergelijking.
 * 3. Alle technische meetwaarden blijven beschikbaar in een dichtgeklapte laag. */
const num = (x, d = 1) => x.toFixed(d).replace('.', lang === 'nl' ? ',' : '.');
const ION_NAME = {
  K: { nl: 'kalium', en: 'potassium' }, NA: { nl: 'natrium', en: 'sodium' }, MG: { nl: 'magnesium', en: 'magnesium' }, MN: { nl: 'mangaan', en: 'manganese' },
  CA: { nl: 'calcium', en: 'calcium' }, ZN: { nl: 'zink', en: 'zinc' }, CL: { nl: 'chloride', en: 'chloride' }, SR: { nl: 'strontium', en: 'strontium' },
  BA: { nl: 'barium', en: 'barium' }, CS: { nl: 'cesium', en: 'caesium' }, CO: { nl: 'kobalt', en: 'cobalt' }, TL: { nl: 'thallium', en: 'thallium' },
};
function methodText(m) {
  if (/X-RAY/i.test(m)) return t('mXray');
  if (/NMR/i.test(m)) return t('mNmr');
  if (/MICROSCOPY/i.test(m)) return t('mEm');
  return (m ?? '').toLowerCase();
}
const sharp = r => r <= 1.5 ? t('rVery') : r <= 2.5 ? t('rSharp') : r <= 3.5 ? t('rGood') : t('rRough');
function factsTable(e) {
  const f = SIMPLE[e.id]?.facts ?? e.facts; if (!f?.length) return '';
  return `<table class="calc easy facts"><tr class="sec"><td colspan="2">${t('secFacts')}</td></tr>${f.map(([k, v]) => `<tr><td>${L(k)}</td><td>${L(v)}</td></tr>`).join('')}</table>`;
}
function measuredTable(e, an, method, res) {
  const R = [];
  const row = (a, b, ref = '') => R.push(`<tr><td>${a}</td><td>${b}${ref ? `<span class="ref">${ref}</span>` : ''}</td></tr>`);
  const ref = (k, v) => `${t('normal')}: ${v}`;
  // waaruit bestaat het model?
  const nt = Object.entries(an.chainType).filter(([, v]) => v !== 'prot');
  const kinds = [...new Set(nt.map(([, v]) => v.toUpperCase()))].join(' + ');
  const nStr = nt.length;
  row(t('eBuild'), `${an.nts ? `${an.nts} ${t('eLetters')} ` : ''}${kinds ? `${t('eIn')} ${nStr} ${kinds}${lang === 'nl' ? '-' : ' '}${nStr === 1 ? t('eStrand1') : t('eStrandN')}` : ''}${an.prot ? `${an.nts ? '<br>+ ' : ''}${t('eProtein')}: ${an.prot} ${t('eAA')}${an.protChains > 1 ? ` ${t('eIn')} ${an.protChains} ${t('eChains')}` : ''}` : ''}`);
  if (an.ss && (an.ss.h || an.ss.s)) row(t('eSS'), `${an.ss.h} × ${t('eHelix')}<br>${an.ss.s} × ${t('eSheet')}`);
  if (an.helix) {
    const h = an.helix, est = e.bent || e.custom ? ` <span class="wr" title="${t('estimate')}">*</span>` : '';
    row(t('eHand'), h.hand === 'r' ? t('eRight') : t('eLeft'), ref('', t('eRight')));
    row(t('eBpTurn'), `${num(h.bpt)}${est}`, ref('', num(10.5)));
    row(t('eRise'), `${num(h.rise / 10, 2)} nm${est}`, ref('', `${num(.34, 2)} nm`));
    row(t('eWidth'), `${num(h.diam / 10)} nm${est}`, ref('', `${num(2.0)} nm`));
    row(t('eNbp'), h.nbp);
    if (e.bent || e.custom) row(t('bentRow'), `<span class="wr">${t(e.custom ? 'autoTxt' : 'bentTxt')}</span>`);
  }
  if (an.quartets !== undefined && e.id !== 'imotif') row(t('eQuart'), an.quartets);
  if (an.ccpairs !== undefined && e.id === 'imotif') row(t('eCC'), an.ccpairs);
  if (an.hoogsteen !== undefined) row(t('eThird'), an.hoogsteen);
  const ions = Object.entries(an.ions);
  if (ions.length) row(t('eIons'), ions.map(([k, n]) => `${n} × ${ION_NAME[k] ? L(ION_NAME[k]) : ''} (${IONLABEL[k] ?? k})`).join('<br>'));
  const ligs = Object.keys(an.ligs);
  if (ligs.length) row(t('eLig'), ligs.slice(0, 6).map(k => LIGNAME[k] ? L(LIGNAME[k]).replace(/ \(.*\)$/, '') : e.ligNames?.[k] ?? k).join(', ') + (ligs.length > 6 ? ' …' : ''));
  if (method) row(t('eMethod'), methodText(method));
  if (res) row(t('eSharp'), `${sharp(res)} <span class="ref">${num(res)} Å — ${t('eSharpHint')}</span>`);
  return `<table class="calc easy meas"><tr class="sec"><td colspan="2">${t('secMeasured')}</td></tr>${R.join('')}</table>`;
}

/* ---------- parametertabel (technisch, dichtgeklapt) ---------- */
const sgn = x => (x > 0 ? '+' : '') + x.toFixed(1);
function calcTable(e, an) {
  const rows = [], rows2 = [];
  const sec = (arr, k) => arr.push(`<tr class="sec"><td colspan="2">${t(k)}</td></tr>`);
  const row = (arr, a, b, cls = '') => arr.push(`<tr><td>${a}</td><td class="${cls}">${b}</td></tr>`);
  if (an.helix) {
    const h = an.helix;
    const ok = !e.hand || h.hand === e.hand;
    sec(rows, 'secHelix');
    row(rows, t('cHand'), `${h.hand === 'r' ? t('right') : t('left')} ${ok ? '✓' : '⚠'}`, ok ? 'ok' : 'wr');
    const est = e.bent ? ` <span class="wr" title="${L(e.bentNote)}">(${t('bentWarn')})</span>` : '';
    row(rows, `${t('cTwist')} (${h.nbp} bp)`, `${sgn(h.twist)}° → ${h.bpt.toFixed(1)} ${t('perTurn')}${est}`);
    row(rows, t('cSteps'), `<span style="font-size:11px">${h.twists.map(x => x.toFixed(0) + '°').join(' · ')}</span>`);
    row(rows, t('cRise'), `${h.rise.toFixed(2)} Å${est}`);
    row(rows, t('cRiseSteps'), `<span style="font-size:11px">${h.rises.map(x => x.toFixed(1)).join(' · ')} Å</span>`);
    row(rows, t('cDiam'), `${h.diam.toFixed(1)} / ${h.outer.toFixed(1)} Å${est}`);
    row(rows, t('cHbI'), h.hb);
  } else if (e.pdb) {
    sec(rows, 'secHelix');
    rows.push(`<tr class="why"><td colspan="2">${noHelixWhy(e)}</td></tr>`);
  }
  // per nucleotide
  const tgt = rows;
  sec(tgt, 'secNt');
  const types = Object.keys(an.puck);
  if (types.length > 1) for (const ty of types) { const p = an.puck[ty]; row(tgt, `${t('cSugar')} · ${ty.toUpperCase()}`, `${p.n} / ${p.s}${p.o ? ` (+${p.o} ${t('other')})` : ''}`); }
  else row(tgt, t('cSugar'), `${an.north} / ${an.south}${an.other ? ` (+${an.other} ${t('other')})` : ''}`);
  row(tgt, t('cSyn'), `${an.syn} / ${an.anti}${an.border ? ` <span title="${t('borderTip')}">(+${an.border} ${t('border')})</span>` : ''}`);
  if (!an.helix) row(tgt, t('cHbAll'), `${an.hbonds.length} / ${an.pairs}`);
  // extra
  const ex = rows2;
  sec(ex, 'secExtra');
  const nt = Object.entries(an.chainType).filter(([, v]) => v !== 'prot');
  row(ex, t('cNt'), `${an.nts}${nt.length ? ` <span style="color:var(--muted)">(${[...new Set(nt.map(([, v]) => v.toUpperCase()))].join(' + ')}, ${nt.length} ${t('chain')}${nt.length > 1 ? (lang === 'nl' ? 's' : 's') : ''})</span>` : ''}`);
  if (an.prot) row(ex, t('cProt'), an.prot);
  if (an.quartets !== undefined && e.id !== 'imotif') row(ex, t('cQuart'), an.quartets);
  if (an.ccpairs !== undefined && e.id === 'imotif') row(ex, t('cCC'), an.ccpairs);
  if (an.ionCoord?.length) row(ex, t('cIonCoord'), an.ionCoord.map(c => `${IONLABEL[c.el] ?? c.el}: ${c.n}× (${c.d.toFixed(2)} Å)`).join('<br>'));
  if (an.hoogsteen !== undefined) row(ex, t('cHoog'), an.hoogsteen);
  const ions = Object.entries(an.ions);
  row(ex, t('cIons'), ions.length ? ions.map(([k, n]) => `${IONLABEL[k] ?? k} ×${n}`).join(', ') : t('none0'));
  const ligs = Object.entries(an.ligs);
  if (ligs.length) row(ex, t('cLigs'), ligs.map(([k, n]) => `${LIGNAME[k] ? L(LIGNAME[k]) : k} <span style="color:var(--muted)">(${k})</span>`).join(', '));
  const mods = Object.entries(an.mods);
  if (mods.length) row(ex, t('cMods'), `<span style="font-size:11px">${mods.map(([k, n]) => `${k}${n > 1 ? '×' + n : ''}`).join(', ')}</span>`);
  if (an.helix) row(ex, t('cHbAll'), `${an.hbonds.length} / ${an.pairs}`);
  return `<table class="calc">${rows.join('')}</table><table class="calc">${rows2.join('')}</table>`;
}
function noHelixWhy(e) {
  const W = {
    quad: { nl: 'niet getoond: geen dubbelhelix maar vier strengen rond een centraal kanaal.', en: 'not shown: not a double helix but four strands around a central channel.' },
    junction: { nl: 'niet getoond: vier korte armen met een knik — één helixas bestaat niet.', en: 'not shown: four short arms with a kink — there is no single helix axis.' },
    single: { nl: 'niet van toepassing: enkelstrengig, geen basenparen.', en: 'not applicable: single-stranded, no base pairs.' },
    folded: { nl: 'niet getoond: gevouwen RNA met veel korte helices in verschillende richtingen.', en: 'not shown: folded RNA with many short helices in different directions.' },
    nucleosome: { nl: 'niet getoond: het DNA is superhelicaal gewonden; een rechte cilinderfit is zinloos.', en: 'not shown: the DNA is wound superhelically; a straight cylinder fit is meaningless.' },
  };
  if (e.id === 'nucleosome') return `${t('noHelix')} ${L(W.nucleosome)}`;
  for (const c of ['quad', 'junction', 'single', 'folded']) if (e.cls.includes(c)) return `${t('noHelix')} ${L(W[c])}`;
  return `${t('noHelix')}: —`;
}

/* ---------- weergave ---------- */
/* per keten: elke eiwitketen een duidelijk andere kleur (zo zie je uit hoeveel delen een complex bestaat); DNA blauw, RNA oranje in tinten */
/* per streng: elke streng of keten een duidelijk andere kleur (sterk verschillende tinten, ook tussen twee DNA-strengen) */
const CHAINPAL = ['#4f8ff7', '#ff8a3d', '#2cd3a0', '#ff5fa2', '#ffd23f', '#a77bff', '#5fd3e6', '#e8e8e8', '#7fdc6a', '#ff6b6b', '#c39b6b', '#8fb3ff'];
/* na de 12 vaste kleuren: telkens een tint ver van de vorige (gulden hoek), zodat ook grote complexen geen dubbele kleuren krijgen */
function hslHex(h, s, l) {
  s /= 100; l /= 100; const k = n => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
  const f = n => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))));
  return '#' + [f(0), f(8), f(4)].map(x => x.toString(16).padStart(2, '0')).join('');
}
function distinctChains(s) {
  const map = {};
  const chains = [...new Set(s.atoms.filter(a => a.kind === 'na' || a.kind === 'prot').map(a => a.chain))];
  chains.forEach((c, i) => { map[c] = i < CHAINPAL.length ? CHAINPAL[i] : hslHex((i * 137.5 + 20) % 360, i % 2 ? 70 : 55, i % 3 ? 62 : 70); });
  return map;
}
/* markeringen (entry.mark): basen die het begrip tonen (mismatch, G–U, bulge, stam, lus…) krijgen een eigen kleur;
 * met entry.dim wordt de rest van het RNA grijs, zodat het gemarkeerde stuk opvalt */
function markOf(e) {
  if (!e?.mark || state.color !== 'part') return null;
  const m = new Map(); for (const g of e.mark) for (const r of g.res) m.set(r, g.col); return m;
}
function colorFn(s) {
  const cf0 = baseColorFn(s), mk = markOf(s.entry);
  const cf = !mk || !cf0 ? cf0 : a => mk.get(a.chain + ':' + a.resi) ?? (s.entry.dim && a.kind === 'na' ? '#5b6378' : cf0(a));
  // een deel uitgelicht: de rest wordt donkergrijs, zodat je het deel in een groot complex meteen terugvindt
  if (!s.focus || !cf) return cf;
  const hit = focusTest(s, s.focus);
  // een keten uitgelicht via het klik-tabje terwijl de kleur niet per streng is (bv. grijze histonen): geef ze haar eigen strengkleur, anders valt ze niet op
  const own = s.focus.startsWith('c:') && state.color !== 'chain' ? distinctChains(s)[s.focus.slice(2)] : null;
  return a => a.kind !== 'na' && a.kind !== 'prot' ? cf(a) : hit(a) ? (own && (a.kind === 'prot' || !BB.test(a.atom) || state.color !== 'base') ? own : cf(a)) : DIMCOL;
}
const DIMCOL = '#2f3647';
/* sleutel van een uitgelicht deel: c:<keten>, t:<soort>, p:<onderdeel>, r (rest), b:<letter> */
function focusTest(s, k) {
  const [kind, v] = [k.slice(0, 1), k.slice(2)];
  if (kind === 'c') return a => a.chain === v;
  if (kind === 't') return a => (a.kind === 'prot' ? 'prot' : s.an.chainType[a.chain] === 'rna' ? 'rna' : 'dna') === v;
  if (kind === 'p') { const g = (s.entry.mark ?? []).find(m => L(m.label) === v), set = new Set(g?.res ?? []); return a => set.has(a.chain + ':' + a.resi); }
  if (kind === 'r') { const set = new Set((s.entry.mark ?? []).flatMap(m => m.res)); return a => a.kind === 'na' && !set.has(a.chain + ':' + a.resi); }
  if (kind === 'b') return a => a.kind === 'na' && !BB.test(a.atom) && (parentBase(a.resn0 ?? a.resn) === v || v === 'T/U' && ['T', 'U'].includes(parentBase(a.resn0 ?? a.resn)));
  return () => true;
}
function baseColorFn(s) {
  const typeCol = a => a.ctype === 'rna' ? COL.rna : a.ctype === 'prot' ? (s.entry.histone ? COL.histone : COL.prot) : COL.dna;
  if (state.color === 'chain') { const m = distinctChains(s); return a => m[a.chain] ?? '#aaa'; }
  if (state.color === 'type' || state.color === 'part') return typeCol;
  if (state.color === 'base') return a => a.kind === 'prot' ? '#5a4bb8' : BB.test(a.atom) ? '#8791a8' : BASECOL[parentBase(a.resn0 ?? a.resn)] ?? '#aab';
  return a => ELEMCOL[a.elem?.toUpperCase()] ?? '#ff1493';
}
function render(s) {
  const { viewer, atoms, entry: e } = s;
  if (!atoms) return;
  hidePop(s, false);
  viewer.setStyle({}, {});
  viewer.removeAllShapes();
  const cf = colorFn(s);
  const col = cf ? { colorfunc: cf } : { colorscheme: 'Jmol' };
  const NA = { predicate: a => a.kind === 'na' }, PR = { predicate: a => a.kind === 'prot' };
  const heavy = !!e.heavy;
  const naOff = !state.na && atoms.some(a => a.kind === 'prot');   // DNA/RNA verbergen (enkel zinvol als er eiwit is)
  const rungs = state.style === 'cartoon' && (state.bases === 'rungs' || heavy);
  if (state.style === 'cartoon' && !rungs) {
    {
      // 3Dmol tekent bij nucleïnezuren een dikke staaf van het lint naar elke base, maar enkel voor basisatomen met cartoonstijl.
      // Daarom: lint enkel op de ruggengraat, de basen (en de suikerring die ze aan het lint hangt) als echte ringen met staafjes.
      // Per atoom: het lint neutraal, zodat enkel de atomen kleur krijgen (geen oranje/rode vlekken op het lint).
      const rib = state.color === 'elem' ? { color: '#8b97b3' } : col;
      viewer.setStyle({ predicate: a => a.kind === 'na' && BB.test(a.atom) }, { cartoon: { ...rib, ribbon: false, thickness: .6 } });
      const ring = cf && state.color !== 'base' ? { colorfunc: a => lighten(cf(a), .28) } : col;
      viewer.setStyle({ predicate: a => a.kind === 'na' && !BB.test(a.atom) }, { stick: { ...ring, radius: .2 } });
      viewer.addStyle({ predicate: a => a.kind === 'na' && SUGAR.has(a.atom) }, { stick: { ...ring, radius: .2 } });
    }
    viewer.setStyle(PR, { cartoon: { ...col, opacity: e.heavyish ? .9 : 1 } });
  } else if (rungs) {
    viewer.setStyle(PR, { cartoon: { ...col, opacity: e.heavyish ? .9 : 1 } });
    drawRungs(s, cf, heavy);
  } else if (state.style === 'stick') {
    viewer.setStyle({ predicate: a => a.kind === 'na' || a.kind === 'prot' }, { stick: { ...col, radius: heavy ? .3 : .2 } });
  } else if (state.style === 'sphere') {
    viewer.setStyle({ predicate: a => a.kind === 'na' || a.kind === 'prot' }, { sphere: { ...col, scale: 1 } });
  }
  // (sporten: zie drawRungs)
  // gemarkeerde basen dikker, zodat ze opvallen in cartoon (in de ladder kleuren de sporten al mee)
  const mk = markOf(e);
  if (mk && state.style === 'cartoon' && !rungs) viewer.addStyle({ predicate: a => a.kind === 'na' && mk.has(a.chain + ':' + a.resi) && !BB.test(a.atom) }, { stick: { colorfunc: cf, radius: .34 } });
  // liganden, ionen, water
  if (state.ligs) {
    viewer.setStyle({ predicate: a => a.kind === 'lig' }, { stick: { colorscheme: 'greenCarbon', radius: .24 }, sphere: { colorscheme: 'greenCarbon', scale: .3 } });
    viewer.setStyle({ predicate: a => a.kind === 'lig' && a.elem === 'PT' || a.kind === 'lig' && a.elem === 'Pt' }, { sphere: { color: '#d0d0e0', radius: 1.0 }, stick: { color: '#d0d0e0', radius: .24 } });
  }
  if (state.ions) viewer.setStyle({ predicate: a => a.kind === 'ion' }, { sphere: { colorfunc: a => IONCOL[a.resn] ?? '#ff1493', radius: 1 } });
  if (state.ions) for (const a of atoms) if (a.kind === 'ion') viewer.setStyle({ index: a.index }, { sphere: { color: IONCOL[a.resn] ?? '#ff1493', radius: IONRAD[a.resn] ?? 1 } });
  if (state.water) viewer.setStyle({ predicate: a => a.kind === 'water' }, { sphere: { colorscheme: 'Jmol', radius: .28 }, stick: { colorscheme: 'Jmol', radius: .1 } });
  // waterstofbruggen
  if (state.hb) {
    const list = s.an.hbonds;
    const dashed = list.length < 1500;
    for (const [a, b] of list) viewer.addCylinder({ start: xyz(a), end: xyz(b), radius: .07, dashed, dashLength: .25, gapLength: .18, color: '#ffffff' });
  }
  if (state.syn) for (const r of s.an.synRes) viewer.setStyle({ chain: r.chain, resi: r.resi }, { stick: { color: '#f06bc0', radius: .26 } });
  if (naOff) { viewer.setStyle(NA, {}); viewer.removeAllShapes(); }
  viewer.render();
}
const xyz = a => ({ x: a.x, y: a.y, z: a.z });
/* Cartoon met sporten: elke streng een gladde buis door de fosfaten, elke letter één sport naar het midden (zoals een ladder).
 * Grote structuren (ribosoom) krijgen altijd deze lichte weergave. */
function drawRungs(s, cf, heavy) {
  const { viewer, atoms } = s;
    const strandCol = a => state.color === 'base' ? (s.an.chainType[a.chain] === 'rna' ? COL.rna : COL.dna) : cf ? cf(a) : '#8b97b3';
    const byRes = new Map();
    for (const a of atoms) if (a.kind === 'na') { const k = a.chain + ':' + a.resi; if (!byRes.has(k)) byRes.set(k, { chain: a.chain, resi: a.resi, at: {} }); byRes.get(k).at[a.atom] = a; }
    const strands = new Map();
    for (const r of byRes.values()) { const bb = r.at.P ?? r.at["C4'"] ?? r.at["C3'"]; /* door de fosfaten: zo zie je bv. de zigzag van Z-DNA */ if (!bb) continue; r.bb = bb; if (!strands.has(r.chain)) strands.set(r.chain, []); strands.get(r.chain).push(r); }
    for (const rs of strands.values()) {
      rs.sort((a, b) => a.resi - b.resi);
      // buis: stukken van opeenvolgende letters met dezelfde kleur (een breuk in de keten = nieuwe buis)
      let run = [];
      const flush = () => { if (run.length > 1) viewer.addCurve({ points: run.map(r => xyz(r.bb)), radius: heavy ? .9 : .75, smooth: 8, color: strandCol(run[run.length - 1].bb), fromCap: 1, toCap: 1 }); };
      rs.forEach((r, i) => {
        const prev = rs[i - 1], brk = !prev || r.resi - prev.resi > 1.5 || (r.bb.x - prev.bb.x) ** 2 + (r.bb.y - prev.bb.y) ** 2 + (r.bb.z - prev.bb.z) ** 2 > 81;
        if (brk) { flush(); run = [r]; }
        else if (strandCol(r.bb) !== strandCol(prev.bb)) { run.push(r); flush(); run = [prev, r]; }   // kleurwissel: naadloos aansluiten
        else run.push(r);
      });
      flush();
      // sporten: van de buis naar het buitenste ringatoom van de base (N1 bij A/G, N3 bij C/T/U)
      for (const r of rs) {
        const pb = parentBase(r.bb.resn0 ?? r.bb.resn), tip = r.at[pb === 'A' || pb === 'G' ? 'N1' : 'N3'];
        if (!tip) continue;
        const c = state.color === 'base' ? BASECOL[pb] ?? '#aab' : lighten(strandCol(tip), .3);
        viewer.addCylinder({ start: xyz(r.bb), end: xyz(tip), radius: heavy ? .28 : .42, color: c, fromCap: 1, toCap: 2 });
      }
    }
}

/* ---------- klikinfo: klein tabje naast de plek waar je klikte ---------- */
const BASENAME = { A: { nl: 'adenine', en: 'adenine' }, T: { nl: 'thymine', en: 'thymine' }, G: { nl: 'guanine', en: 'guanine' }, C: { nl: 'cytosine', en: 'cytosine' }, U: { nl: 'uracil', en: 'uracil' } };
const ELNAME = { C: { nl: 'koolstof', en: 'carbon' }, N: { nl: 'stikstof', en: 'nitrogen' }, O: { nl: 'zuurstof', en: 'oxygen' }, P: { nl: 'fosfor', en: 'phosphorus' }, S: { nl: 'zwavel', en: 'sulphur' }, SE: { nl: 'seleen', en: 'selenium' } };
const AANAME = { ALA: ['alanine'], ARG: ['arginine'], ASN: ['asparagine'], ASP: ['asparaginezuur', 'aspartic acid'], CYS: ['cysteïne', 'cysteine'], GLN: ['glutamine'], GLU: ['glutaminezuur', 'glutamic acid'], GLY: ['glycine'], HIS: ['histidine'], ILE: ['isoleucine'], LEU: ['leucine'], LYS: ['lysine'], MET: ['methionine'], PHE: ['fenylalanine', 'phenylalanine'], PRO: ['proline'], SER: ['serine'], THR: ['threonine'], TRP: ['tryptofaan', 'tryptophan'], TYR: ['tyrosine'], VAL: ['valine'] };
const PT = {
  letter: { nl: (n, ty, c) => `letter ${n} van ${ty}-streng ${c}`, en: (n, ty, c) => `letter ${n} of ${ty} strand ${c}` },
  aa: { nl: (n, c) => `bouwsteen ${n} van eiwitketen ${c}`, en: (n, c) => `building block ${n} of protein chain ${c}` },
  atom: { nl: 'atoom', en: 'atom' }, inBase: { nl: 'in de base (de letter)', en: 'in the base (the letter)' }, inBb: { nl: 'in de ruggengraat (suiker-fosfaat)', en: 'in the backbone (sugar–phosphate)' },
  mod: { nl: 'chemisch aangepaste letter', en: 'chemically modified letter' }, part: { nl: 'onderdeel', en: 'part' },
  ion: { nl: 'ion', en: 'ion' }, water: { nl: 'watermolecule', en: 'water molecule' }, lig: { nl: 'Klein molecule', en: 'Small molecule' }, close: { nl: 'Sluiten', en: 'Close' },
  aaIs: { nl: 'een aminozuur: één bouwsteen van de eiwitketen', en: 'an amino acid: one building block of the protein chain' },
  ligIs: { nl: 'een kleine stof die hier vastzit, bv. een medicijn, een vitamine of een hulpstof uit het lab', en: 'a small substance bound here, e.g. a drug, a vitamin or a helper chemical from the lab' },
  formula: { nl: 'formule', en: 'formula' }, atoms: { nl: 'atomen', en: 'atoms' }, chem: { nl: 'chemische naam', en: 'chemical name' },
  purine: { nl: 'purine: twee ringen (A en G); hangt met de N onderaan aan de suiker', en: 'purine: two rings (A and G); attached to the sugar by the N at the bottom' },
  pyrimidine: { nl: 'pyrimidine: één ring (C, T en U); hangt met de N onderaan aan de suiker', en: 'pyrimidine: one ring (C, T and U); attached to the sugar by the N at the bottom' },
  sugarD: { nl: 'suiker (deoxyribose) van de ruggengraat: aan C2 enkel een H; O–P = fosfaat naar de buurletters', en: 'sugar (deoxyribose) of the backbone: only an H on C2; O–P = phosphate to the neighbouring letters' },
  sugarR: { nl: 'suiker (ribose) van de ruggengraat: aan C2 een OH (het verschil met DNA); O–P = fosfaat naar de buurletters', en: 'sugar (ribose) of the backbone: an OH on C2 (the difference with DNA); O–P = phosphate to the neighbouring letters' },
  sideChain: { nl: 'zijketen', en: 'side chain' }, sameRest: { nl: 'de rest (grijs) is bij elk aminozuur gelijk', en: 'the rest (grey) is the same in every amino acid' },
  formulaOf: { nl: 'structuurformule van', en: 'structural formula of' }, fromPdb: { nl: 'structuurformule (bron: PDB)', en: 'structural formula (source: PDB)' },
  focusStrand: { nl: c => `◎ Toon enkel deze streng (${c})`, en: c => `◎ Show only this strand (${c})` },
  focusProt: { nl: c => `◎ Toon enkel deze eiwitketen (${c})`, en: c => `◎ Show only this protein chain (${c})` },
  focusOff: { nl: '✕ Toon weer alles', en: '✕ Show everything again' },
  focusTip: { nl: 'De rest van de figuur wordt grijs, zodat je dit deel in het geheel terugvindt', en: 'The rest of the figure turns grey, so you can find this part in the whole' },
};
/* wat doet dit aminozuur? in één eenvoudige zin */
const AAWHAT = {
  ALA: { nl: 'klein en waterafstotend', en: 'small and water-repelling' }, VAL: { nl: 'waterafstotend: zit graag binnenin het eiwit', en: 'water-repelling: likes to sit inside the protein' },
  LEU: { nl: 'waterafstotend: zit graag binnenin het eiwit', en: 'water-repelling: likes to sit inside the protein' }, ILE: { nl: 'waterafstotend: zit graag binnenin het eiwit', en: 'water-repelling: likes to sit inside the protein' },
  PHE: { nl: 'waterafstotend, met een platte ring', en: 'water-repelling, with a flat ring' }, TRP: { nl: 'de grootste, met een dubbele ring', en: 'the largest, with a double ring' },
  TYR: { nl: 'platte ring met een OH-groep; kan een fosfaatgroep krijgen (aan/uit-schakelaar)', en: 'flat ring with an OH group; can get a phosphate group (on/off switch)' },
  MET: { nl: 'bevat zwavel; elk eiwit begint ermee', en: 'contains sulphur; every protein starts with it' }, CYS: { nl: 'bevat zwavel; twee cysteïnes kunnen een stevige zwavelbrug vormen', en: 'contains sulphur; two cysteines can form a strong sulphur bridge' },
  GLY: { nl: 'de kleinste, zonder zijketen: maakt de keten soepel', en: 'the smallest, without a side chain: makes the chain flexible' }, PRO: { nl: 'stijve ring: maakt een knik in de keten', en: 'stiff ring: puts a kink in the chain' },
  SER: { nl: 'houdt van water; kan een fosfaatgroep krijgen (aan/uit-schakelaar)', en: 'likes water; can get a phosphate group (on/off switch)' }, THR: { nl: 'houdt van water; kan een fosfaatgroep krijgen (aan/uit-schakelaar)', en: 'likes water; can get a phosphate group (on/off switch)' },
  ASN: { nl: 'houdt van water; vormt makkelijk waterstofbruggen', en: 'likes water; easily forms hydrogen bonds' }, GLN: { nl: 'houdt van water; vormt makkelijk waterstofbruggen', en: 'likes water; easily forms hydrogen bonds' },
  ASP: { nl: 'negatief geladen', en: 'negatively charged' }, GLU: { nl: 'negatief geladen', en: 'negatively charged' },
  LYS: { nl: 'positief geladen: trekt het negatief geladen DNA aan', en: 'positively charged: attracts the negatively charged DNA' }, ARG: { nl: 'positief geladen: trekt het negatief geladen DNA aan', en: 'positively charged: attracts the negatively charged DNA' },
  HIS: { nl: 'kan een lading opnemen en afgeven; vaak in het werkende deel van enzymen', en: 'can take up and release a charge; often in the working part of enzymes' },
};
/* structuurformule zoals in een schoolboek:
 * - aminozuur: eigen tekening (atlas/aa2d.js), zijketen gekleurd volgens soort
 * - letter van DNA/RNA of klein molecule: de 2D-formule die de PDB zelf aanbiedt (cdn.rcsb.org); lukt dat niet, dan geen tekening */
function aaFig(r) {
  const svg = aaSVG(r); if (!svg) return '';
  const c = CLASSES[AACLASS[r]];
  return `<figure class="pdraw aa">${svg}<figcaption><i style="--c:${c.col}"></i>${pt('sideChain')}: <b style="color:${c.col}">${L(c)}</b><br>${pt('sameRest')}</figcaption></figure>`;
}
/* letter van DNA/RNA: de base zoals in een schoolboek, of — bij een klik op de ruggengraat — de suiker in Haworth-vorm */
function naFig(b, rna, bb) {
  if (!b) return '';
  const col = BASECOL[b] ?? '#aab';
  if (bb) return `<figure class="pdraw aa">${sugarSVG(rna, col)}<figcaption>${pt(rna ? 'sugarR' : 'sugarD')}</figcaption></figure>`;
  const svg = baseSVG(b, col); if (!svg) return '';
  return `<figure class="pdraw aa">${svg}<figcaption><i style="--c:${col}"></i>${pt('AG'.includes(b) ? 'purine' : 'pyrimidine')}</figcaption></figure>`;
}
function ccdFig(id) {
  if (!/^[A-Z0-9]{1,5}$/.test(id ?? '')) return '';
  return `<figure class="pdraw ccd" data-ccd="${id}"><div class="cbox" role="img" aria-label="${pt('formulaOf')} ${id}"></div><figcaption>${pt('fromPdb')}</figcaption></figure>`;
}
/* De PDB-tekening heeft een witte achtergrond, veel marge en dunne lijnen: strak bijsnijden, lijnen dikker en kleuren voor de donkere achtergrond */
const CCD = new Map();
const CCDCOL = { black: '#d5dceb', blue: '#7fa8ff', red: '#ff7a7a', green: '#7fdc6a', orange: '#ffb347', yellow: '#ffd23f', purple: '#c39bff', '#808080': '#b0b8c8' };
function fillCCD(fig) {
  const id = fig.dataset.ccd, url = `https://cdn.rcsb.org/images/ccd/unlabeled/${id[0]}/${id}.svg`;
  if (!CCD.has(id)) CCD.set(id, fetch(url).then(r => r.ok ? r.text() : null).catch(() => null));
  CCD.get(id).then(txt => {
    if (!txt || !fig.isConnected) { fig.remove(); return; }
    let s = txt.replace(/<\?xml[^>]*>|<!DOCTYPE[^>]*>|<!--[\s\S]*?-->/g, '').replace(/<rect[^>]*\/>/g, '');
    const xs = [...s.matchAll(/\b(?:x|x1|x2)="([\d.]+)"/g)].map(m => +m[1]), ys = [...s.matchAll(/\b(?:y|y1|y2)="([\d.]+)"/g)].map(m => +m[1]);
    if (!xs.length) { fig.remove(); return; }
    const x0 = Math.min(...xs) - 70, y0 = Math.min(...ys) - 90, w = Math.max(...xs) - x0 + 70, h = Math.max(...ys) - y0 + 50, sw = Math.max(10, Math.max(w, h) / 75);
    s = s.replace(/viewBox="[^"]*"/, `viewBox="${x0.toFixed(0)} ${y0.toFixed(0)} ${w.toFixed(0)} ${h.toFixed(0)}"`)
      .replace(/stroke-width="[\d.]+"/g, `stroke-width="${sw.toFixed(1)}"`)
      .replace(/(stroke|fill)="(black|blue|red|green|orange|yellow|purple|#808080)"/g, (m, k, c) => `${k}="${CCDCOL[c]}"`);
    fig.querySelector('.cbox').innerHTML = s;
  });
}
const focusBtn = (s, a) => s.focus === 'c:' + a.chain
  ? `<button class="pfocus on" data-chain="">${pt('focusOff')}</button>`
  : `<button class="pfocus" data-chain="${esc(a.chain)}" title="${pt('focusTip')}">${pt(a.kind === 'prot' ? 'focusProt' : 'focusStrand', a.chain)}</button>`;
const pt = (k, ...a) => { const v = L(PT[k]); return typeof v === 'function' ? v(...a) : v; };
function popHTML(s, a) {
  const el = ELNAME[a.elem?.toUpperCase()] ? `${L(ELNAME[a.elem.toUpperCase()])} (${a.atom})` : a.atom;
  if (a.kind === 'na') {
    const b = parentBase(a.resn0 ?? a.resn), ty = s.an.chainType[a.chain] === 'rna' ? 'RNA' : 'DNA';
    const g = (s.entry.mark ?? []).find(m => m.res.includes(a.chain + ':' + a.resi));
    return [`<b>${b ?? a.resn}${BASENAME[b] ? ` · ${L(BASENAME[b])}` : ''}</b>`, pt('letter', a.resi, ty, a.chain), focusBtn(s, a),
      a.resn0 && a.resn0 !== a.resn ? `${pt('mod')}: ${a.resn0}` : '',
      g && state.color === 'part' ? `${pt('part')}: <i style="--c:${g.col}">${L(g.label)}</i>` : '',
      naFig(b, ty === 'RNA', BB.test(a.atom)), `${pt('atom')}: ${el} · ${BB.test(a.atom) ? pt('inBb') : pt('inBase')}`];
  }
  if (a.kind === 'prot') {
    const r = a.resn0 ?? a.resn, nm = AANAME[r], what = AAWHAT[r];
    return [`<b>${nm ? (lang === 'nl' ? nm[0] : nm[1] ?? nm[0]) : r}</b> <small>${r}</small>`, `<span class="pw">${pt('aaIs')}</span>`,
      what ? `<span class="pk">${L(what)}</span>` : '', pt('aa', a.resi, a.chain), focusBtn(s, a), aaFig(r), `${pt('atom')}: ${el}`];
  }
  if (a.kind === 'ion') return [`<b>${IONLABEL[a.resn] ?? a.resn}</b>`, `${pt('ion')}${ION_NAME[a.resn] ? ': ' + L(ION_NAME[a.resn]) : ''}`];
  if (a.kind === 'lig') {
    // chemische namen zoals "N-[(1S)-1-(2-chloro-6-…)]…" zeggen een leek niets: dan een gewone omschrijving + de formule
    const known = LIGNAME[a.resn] ? L(LIGNAME[a.resn]) : null, raw = s.entry.ligNames?.[a.resn];
    const plain = known ?? (raw && raw.length <= 28 && !/[\[\]()0-9,]/.test(raw) ? raw : null);
    const mol = s.atoms.filter(x => x.chain === a.chain && x.resi === a.resi && x.resn === a.resn);
    const cnt = {}; for (const x of mol) { const e = x.elem?.toUpperCase(); cnt[e] = (cnt[e] ?? 0) + 1; }
    const formula = ['C', 'N', 'O', ...Object.keys(cnt).filter(e => !'CNO'.includes(e) || e.length > 1).sort()].filter((e, i, arr) => cnt[e] && arr.indexOf(e) === i)
      .map(e => `${e[0]}${e.slice(1).toLowerCase()}${cnt[e] > 1 ? `<sub>${cnt[e]}</sub>` : ''}`).join('');
    return [`<b>${plain ?? pt('lig')}</b> <small>${a.resn}</small>`, `<span class="pw">${pt('ligIs')}</span>`, ccdFig(a.resn),
      `${pt('formula')}: ${formula} · ${mol.length} ${pt('atoms')}`, raw && !plain ? `<details class="pchem"><summary>${pt('chem')}</summary>${esc(raw)}</details>` : ''];
  }
  if (a.kind === 'water') return [`<b>${pt('water')}</b>`];
  return [`<b>${a.resn} ${a.resi}</b>`, `${pt('atom')}: ${el}`];
}
function showPop(s, a) {
  const pop = s.stage.querySelector('.pop'), d = s.down;
  pop.innerHTML = `<button class="px" title="${pt('close')}" aria-label="${pt('close')}">×</button>` + popHTML(s, a).filter(Boolean).map(x => `<div>${x}</div>`).join('');
  pop.hidden = false; s.popT = performance.now();
  pop.querySelectorAll('[data-ccd]').forEach(fillCCD);
  const r = s.stage.getBoundingClientRect(), x = (d?.x ?? r.left + r.width / 2) - r.left, y = (d?.y ?? r.top + r.height / 2) - r.top;
  const w = pop.offsetWidth, h = pop.offsetHeight;
  // rechts naast de klik; past het niet, dan links ervan — en altijd binnen het vak
  pop.style.left = `${Math.max(6, x + 16 + w > r.width - 6 ? x - 16 - w : x + 16)}px`;
  pop.style.top = `${Math.max(6, Math.min(r.height - h - 6, y - 14))}px`;
  if (s.mk) s.viewer.removeShape(s.mk);
  s.mk = s.viewer.addSphere({ center: xyz(a), radius: a.kind === 'ion' ? 1.6 : .85, color: '#ffffff', opacity: .55 });
  s.viewer.render();
}
function hidePop(s, redraw = true) {
  const pop = s.stage.querySelector('.pop'); if (pop.hidden && !s.mk) return;
  pop.hidden = true;
  if (s.mk) { s.viewer.removeShape(s.mk); s.mk = null; if (redraw) s.viewer.render(); }
}
addEventListener('keydown', e => { if (e.key === 'Escape') SLOTS.forEach(s => hidePop(s)); });
/* kleur iets lichter maken (meng met wit), met cache: wordt per atoom opgevraagd */
const LIGHT = new Map();
function lighten(hex, f) {
  if (hex === DIMCOL) return hex;   // uitgedimde delen blijven donker (ook de sporten en ringen)
  if (hex.length === 4) hex = '#' + [...hex.slice(1)].map(c => c + c).join('');
  const k = hex + f; if (LIGHT.has(k)) return LIGHT.get(k);
  const n = parseInt(hex.slice(1), 16), m = c => Math.round(c + (255 - c) * f);
  const v = '#' + [m(n >> 16 & 255), m(n >> 8 & 255), m(n & 255)].map(x => x.toString(16).padStart(2, '0')).join('');
  LIGHT.set(k, v); return v;
}
const renderAll = () => SLOTS.forEach(s => !s.el.hidden && s.atoms && render(s));

/* ---------- legende ---------- */
/* lijst links en uitleg rechts inklappen (kleinere schermen, vergelijken): keuze onthouden */
const PANES = { side: { cls: 'noside', key: 'atlas-side' }, info: { cls: 'noinfo', key: 'atlas-info' } };
function setPane2(p, shut) {
  document.querySelector('.layout').classList.toggle(PANES[p].cls, shut);
  try { localStorage.setItem(PANES[p].key, shut ? '0' : '1'); } catch { /* geen opslag */ }
  requestAnimationFrame(() => SLOTS.forEach(s => { if (!s.el.hidden) { s.viewer.resize(); s.viewer.render(); } }));
}
for (const p of ['side', 'info']) {
  $(p + 'Close').title = t(p + 'Hide'); $(p + 'Close').setAttribute('aria-label', t(p + 'Hide'));
  $(p + 'Rail').title = t(p + 'Show'); $(p + 'Rail').querySelector('b').textContent = t(p + 'Name');
  $(p + 'Close').onclick = () => setPane2(p, true); $(p + 'Rail').onclick = () => setPane2(p, false);
  try { if (localStorage.getItem(PANES[p].key) === '0') document.querySelector('.layout').classList.add(PANES[p].cls); } catch { /* geen opslag */ }
}
const LEG_SHORT = 8;   // bij meer kleuren: eerst enkel de eerste 8, met "+N meer"
let legClosed = (() => { try { return localStorage.getItem('atlas-leg') === '0'; } catch { return false; } })();
/* De legende staat per figuur vlak boven het 3D-beeld (bij vergelijken heeft elk molecule zijn eigen strengkleuren). */
function legend() {
  if (syncColor()) renderAll();
  const all = SLOTS.filter(s => !s.el.hidden && s.an);
  // "DNA en RNA tonen" heeft enkel zin als er ook eiwit in beeld is (anders blijft er niets over)
  if (all.length) $('na').closest('label').hidden = !all.some(s => s.an.prot);
  for (const s of SLOTS) {
    const box = s.el.querySelector('.sleg');
    if (s.el.hidden || !s.an) { box.hidden = true; continue; }
    box.hidden = false;
    const it = legendItems([s]).map((x, i) => i >= LEG_SHORT ? x.replace('class="lc', 'class="lc x8') : x), nF = it.filter(x => x.includes('data-f=')).length;
    const many = it.length > LEG_SHORT + 1, more = many ? `<button class="lmore2" data-more>${s.legAll ? t('legLess') : t('legMore')(it.length - LEG_SHORT)}</button>` : '';
    // uitgelicht deel dat niet in de legende staat (gekozen via het klik-tabje): als eigen chip, met ×
    const extra = s.focus && !it.some(x => x.includes(`data-f="${esc(s.focus)}"`)) ? `<button class="lc fk on" data-f="${esc(s.focus)}"><i style="background:#fff"></i>${t('focusOn')} ${esc(s.focus.slice(2))} ×</button>` : '';
    box.classList.toggle('short', many && !s.legAll); box.classList.toggle('closed', legClosed);
    box.innerHTML = `<button class="ltog" data-tog aria-expanded="${!legClosed}">${t('colours')} <span>${legClosed ? `▸ ${t('legShow')(it.length)}` : '▾'}</span></button>`
      + (legClosed ? '' : it.join('') + more + extra + (s.focus ? `<button class="lreset" data-f="">${t('focusAll')}</button>` : nF > 1 ? `<span class="lhint">${t('focusHint')}</span>` : ''));
  }
  $('legend').hidden = true;
  guide();
}
function legendItems(shown) {
  const items = [];
  const s0 = shown[0];
  const sw = (c, txt, fk) => items.push(fk ? `<button class="lc fk ${s0.focus === fk ? 'on' : ''}" data-f="${esc(fk)}" style="--c:${c}" aria-pressed="${s0.focus === fk}"><i></i>${txt}</button>`
    : `<span class="lc" style="--c:${c}"><i></i>${txt}</span>`);
  const hasType = ty => shown.some(s => Object.values(s.an.chainType).includes(ty));
  if (state.color === 'part') {
    // eerst de onderdelen (daar gaat het om), daarna de rest
    const seen = new Set(); for (const s of shown) for (const g of s.entry.mark ?? []) { const lab = L(g.label); if (!seen.has(lab)) { seen.add(lab); sw(g.col, `<b>${lab}</b>`, 'p:' + lab); } }
    if (shown.some(s => s.entry.mark && s.entry.dim)) sw('#5b6378', t('restGrey'), 'r:');
  }
  if (state.color === 'type' || state.color === 'part') {
    // per onderdeel: de gewone kleur toont wat níet gemarkeerd is (bv. de verbindingsletters tussen de armen van tRNA)
    const nm = x => state.color === 'part' ? `${t('restOf')} ${x}` : x;
    const P = state.color === 'part';
    if (hasType('dna')) sw(COL.dna, nm('DNA'), P ? 'r:' : 't:dna');
    if (hasType('rna') && !(P && shown.every(s => !s.entry.mark || s.entry.dim))) sw(COL.rna, nm('RNA'), P ? 'r:' : 't:rna');
    if (hasType('prot')) { const h = shown.some(s => s.entry.histone); sw(h ? COL.histone : COL.prot, h ? (lang === 'nl' ? 'histonen' : 'histones') : t('protein'), 't:prot'); }
  } else if (state.color === 'chain') {
    const s0 = shown[0];
    if (s0) {
      const all = Object.entries(distinctChains(s0)).filter(([c]) => s0.an.chainType[c] === 'prot' || state.na);
      for (const [c, col] of all.slice(0, 24)) { const ty = s0.an.chainType[c]; sw(col, `${ty === 'prot' ? t('protChain') : (ty === 'rna' ? 'RNA-' : 'DNA-') + t('strand')} ${c}`, 'c:' + c); }
      if (all.length > 24) items.push(`<span class="lmore">${t('moreChains').replace('{n}', all.length - 24)}</span>`);
    }
  } else if (state.color === 'base') {
    for (const [b, c] of Object.entries({ A: BASECOL.A, 'T/U': BASECOL.T, G: BASECOL.G, C: BASECOL.C })) sw(c, b, 'b:' + b);
    sw('#8791a8', t('backbone'));
  } else {
    sw('#909090', 'C'); sw('#3050f8', 'N'); sw('#ff0d0d', 'O'); sw('#ff8000', 'P');
  }
  if (state.ions) { const ions = new Set(shown.flatMap(s => Object.keys(s.an.ions))); for (const k of ions) sw(IONCOL[k] ?? '#ff1493', IONLABEL[k] ?? k); }
  if (state.ligs && shown.some(s => Object.keys(s.an.ligs).length)) sw('#33ff33', t('lig'));
  if (state.hb) sw('#fff', `- - ${t('hbond')}`);
  if (state.syn) sw('#f06bc0', t('synConf'));
  return items;
}

/* ---------- uitleg bij de huidige weergave ("In deze weergave"): verandert mee met Weergave en Kleur ---------- */
const G = {
  head: { nl: 'In deze weergave', en: 'In this view' },
  cartoonNa: { nl: 'Het lint is de ruggengraat (suiker en fosfaat) van elke streng; de ringetjes eraan zijn de basen, de letters.', en: 'The ribbon is the backbone (sugar and phosphate) of each strand; the small rings on it are the bases, the letters.' },
  cartoonProt: { nl: 'Eiwit is een lint met spiralen (helix) en pijlen (gestrekt stuk).', en: 'Protein is a ribbon with spirals (helix) and arrows (stretched piece).' },
  stick: { nl: 'Elke binding tussen twee atomen is een staafje: je ziet elk ringetje en elk atoom.', en: 'Every bond between two atoms is a stick: you see every ring and every atom.' },
  sphere: { nl: 'Elk atoom is een bol op ware grootte: zo zie je hoe dicht alles op elkaar zit en hoe diep de groeven zijn.', en: 'Every atom is a ball at true size: shows how tightly everything is packed and how deep the grooves are.' },
  traceNa: { nl: 'Elke streng is een buis door de fosfaten; elke sport is één letter. Twee sporten die elkaar raken, vormen een basenpaar.', en: 'Each strand is a tube through the phosphates; each rung is one letter. Two rungs that meet form a base pair.' },
  colType: { nl: 'Kleur per soort:', en: 'Colour by type:' },
  colChain: { nl: n => `Elke streng of keten heeft een eigen kleur — hier ${n}.`, en: n => `Each strand or chain has its own colour — ${n} here.` },
  colPart: { nl: 'Elk belangrijk onderdeel heeft een eigen kleur (zie de kleuren boven de figuur).', en: 'Each important part has its own colour (see the colours above the figure).' },
  colBase: { nl: 'Elke letter een eigen kleur: A groen, T/U rood, G geel, C blauw; de ruggengraat grijs.', en: 'Each letter its own colour: A green, T/U red, G yellow, C blue; the backbone grey.' },
  colElem: { nl: 'Kleur volgens atoomsoort: koolstof grijs, stikstof blauw, zuurstof rood, fosfor oranje.', en: 'Colour by kind of atom: carbon grey, nitrogen blue, oxygen red, phosphorus orange.' },
  tipPart: { nl: 'Tip: kies „Per onderdeel” om de belangrijke stukken in kleur te zien.', en: 'Tip: choose “By part” to see the important pieces in colour.' },
  tipChain: { nl: 'Tip: kies „Per streng” om de strengen uit elkaar te houden.', en: 'Tip: choose “By strand” to tell the strands apart.' },
};
const g = (k, ...a) => { const v = L(G[k]); return typeof v === 'function' ? v(...a) : v; };
function guide() {
  const box = document.getElementById('vguide'); if (!box) return;
  const shown = SLOTS.filter(s => !s.el.hidden && s.an); if (!shown.length) { box.innerHTML = ''; return; }
  const prot = shown.some(s => s.an.prot), na = shown.some(s => s.an.nts) && (state.na || !prot), heavy = shown.some(s => s.entry.heavy);
  const rungs = state.bases === 'rungs' || heavy;
  const st = state.style === 'cartoon' ? [na && g(rungs ? 'traceNa' : 'cartoonNa'), prot && g('cartoonProt')] : [g(state.style)];
  const W = T.hintColor.typeW, has = ty => shown.some(s => Object.values(s.an.chainType).includes(ty));
  const nCh = new Set(shown.flatMap(s => Object.entries(s.an.chainType).filter(([, v]) => v === 'prot' || state.na).map(([c]) => s.i + c))).size;
  const col = { type: `${g('colType')} ${[has('dna') && L(W.dna), has('rna') && L(W.rna), has('prot') && L(shown.some(s => s.entry.histone) ? W.histone : W.prot)].filter(Boolean).join(', ')}.`,
    chain: g('colChain', nCh), part: g('colPart'), base: g('colBase'), elem: g('colElem') }[state.color];
  const av = colorAvail();
  const tip = av?.has('part') && state.color !== 'part' ? g('tipPart') : av?.has('chain') && state.color === 'type' && nCh > 1 ? g('tipChain') : '';
  box.innerHTML = `<b>${g('head')}</b><ul>${[...st.filter(Boolean), col].map(x => `<li>${colourWords(x)}</li>`).join('')}</ul>${tip ? `<div class="tip">${tip}</div>` : ''}`;
}

/* ---------- infokolom ---------- */
/* vaktermen in de eenvoudige teksten: [[woord|sleutel]] → aantikbaar, uitleg van één zin */
const glossOf = k => { const g = GLOSSARY[k] ?? EXTRA_GLOSS[k]; return g ? (g[lang] ?? g.nl) : null; };
const termsHTML = txt => (txt ?? '').replace(/\[\[([^\]|]+)\|([a-z0-9-]+)\]\]/g, (_, w, k) => glossOf(k) ? `<button class="term" data-g="${k}">${w}</button>` : w);
document.addEventListener('click', ev => {
  const b = ev.target.closest('.term'); if (!b) return;
  ev.preventDefault();
  const host = b.closest('p, .kort');
  const open = host.nextElementSibling?.classList.contains('gloss') ? host.nextElementSibling : null;
  if (open) { open.remove(); if (open.dataset.g === b.dataset.g) return; }
  const [term, expl] = glossOf(b.dataset.g);
  const el = document.createElement('div'); el.className = 'gloss'; el.dataset.g = b.dataset.g; el.setAttribute('role', 'note');
  el.innerHTML = '<b></b> <span></span>'; el.querySelector('b').textContent = term + ':'; el.querySelector('span').textContent = expl;
  host.after(el);
});
function info(e) {
  const scenes = (e.scenes ?? []).filter(id => NODES[id]);
  const simp = simplified(e);
  const sp = SIMPLE[e.id] ?? (e.custom ? { kort: e.kort, look: e.look } : null);
  const s = [];
  s.push(e.custom ? `<h2>PDB ${e.pdb}</h2><div class="isub">${L(e.name)}</div>` : `<h2>${nameOf(e)}</h2><div class="isub">${subOf(e)}</div>`);
  if (e.custom) s.push(`<div class="minebox">${t('mineNote')}</div>`);
  if (e.plant) s.push(`<div class="plantbox">${t('plant')}</div>`);
  if (sp) {
    s.push(`<div class="kort"><b>${t('inShort')}</b><p>${termsHTML(L(sp.kort))}</p></div>`);
    if (sp.look) s.push(`<div class="card look"><h3><i>👁</i>${t('look')}</h3>${e.pdb ? '<div class="vguide" id="vguide"></div>' : ''}<p>${termsHTML(colourWords(L(sp.look)))}</p>${sp.lookSchema && e.pdb ? `<div class="lschema"><button class="lsbtn" type="button">${t('schemaBtn')}</button> <b>${t('inSchema')}:</b> ${termsHTML(L(sp.lookSchema))}</div>` : ''}</div>`);
    if (sp.why) s.push(`<div class="card why"><h3><i>★</i>${t('why')}</h3><p>${termsHTML(L(sp.why))}</p></div>`);
  }
  if (scenes.length) s.push(`<h3 class="sc">${t('scenes')}</h3><div class="scenes">${scenes.map(id => `<a href="../app/index.html?scene=${id}"><i>▶</i>${nodeTitle(NODES[id])}<span>${t('open')}</span></a>`).join('')}</div>`);
  // de vakinhoud (zoals voorheen) samen in één dichtgeklapte laag
  const m = [];
  if (!e.custom) {
    m.push(`<div class="isub">${L(e.name)} · ${L(e.sub)}</div>`);
    m.push(`<h3>${t('what')}</h3><p>${L(e.what)}</p>`);
    m.push(`<h3>${t('feat')}</h3><ul>${L(e.feat).map(x => `<li>${x}</li>`).join('')}</ul>`);
    m.push(`<h3>${e.ctx.includes('cell') ? t('cell') : t('cellOther')}</h3><p>${L(e.cell)}</p>`);
  }
  if (!e.pdb && e.why3d) m.push(`<h3>${t('why3d')}</h3><p>${L(e.why3d)}</p>`);
  if (e.pdb) m.push(`<h3>${t('struct')}</h3><div class="struct" id="structInfo">PDB <b>${e.pdb}</b>${e.org ? ` · ${t('orgOf')}: ${L(e.org)}` : ''}</div>`);
  m.push(`<div class="simp"><b>${t('simpl')}</b><ul>${simp.map(x => `<li>${x}</li>`).join('')}</ul></div>`);
  const src = [...(e.pdb ? [{ label: `${t('rcsb')} ${e.pdb}`, url: `https://www.rcsb.org/structure/${e.pdb}` }] : []), ...(e.src ?? [])];
  m.push(`<h3>${t('srcs')}</h3><ul class="src">${src.map(x => `<li><a href="${x.url}" target="_blank" rel="noopener">${x.label}</a></li>`).join('')}</ul>`);
  s.push(`<details class="more" ${sp ? '' : 'open'}><summary>${t('more')}</summary><div class="morebody">${m.join('')}</div></details>`);
  $('info').innerHTML = s.join('');
  $('info').querySelector('.lsbtn')?.addEventListener('click', () => { const sl = SLOTS.find(x => x.entry === e && !x.el.hidden); if (sl) showSchema(sl, true); });
  $('infoCol').scrollTop = 0;
  guide();
  if (e.pdb) getJson(rcsbEntryUrl(e.pdb)).then(d => {
    const el = $('structInfo'); if (!d || !el || BY[state.id] !== e) return;
    const res = d.rcsb_entry_info?.resolution_combined?.[0];
    const c = d.citation?.find(x => x.id === 'primary') ?? d.citation?.[0];
    el.innerHTML += `<br>${t('liveTitle')}: <span class="rt">${d.struct?.title ?? ''}</span><br>${(d.exptl?.[0]?.method ?? '').toLowerCase()}${res ? ` · ${res} Å` : ''}${c?.year ? ` · ${c.year}` : ''}`;
  });
}
function simplified(e) {
  const S = [];
  const add = (nl, en) => S.push(L({ nl, en }));
  if (!e.pdb) {
    add('Dit is een schema, niet op schaal en zonder atomaire details.', 'This is a diagram, not to scale and without atomic detail.');
  } else {
    const nmr = ['143D', '1EL2', '1BWG', '1ANR', '1YMO', '1K1G'].includes(e.pdb);
    if (nmr) add('NMR-structuur: de PDB bevat een bundel modellen; hier wordt enkel model 1 getoond. De structuur werd in oplossing bepaald.', 'NMR structure: the PDB contains a bundle of models; only model 1 is shown. The structure was determined in solution.');
    else add('Kristalstructuur: vaak een kort, ingekort of aangepast molecule in een kristalrooster; kristalcontacten kunnen de vorm licht beïnvloeden.', 'Crystal structure: often a short, truncated or engineered molecule in a crystal lattice; crystal contacts can slightly affect the shape.');
    add('Watermoleculen en kristallisatie-additieven zijn standaard verborgen; waterstofatomen worden nooit getoond. Ionen en liganden zijn aan/uit te zetten.', 'Water molecules and crystallisation additives are hidden by default; hydrogen atoms are never shown. Ions and ligands can be toggled.');
    add('Waterstofbruggen zijn geometrisch geschat: N/O-atomen van basen op 2,6–3,3 Å, zonder hoekcriterium; opeenvolgende nucleotiden worden niet meegeteld.', 'Hydrogen bonds are estimated geometrically: base N/O atoms at 2.6–3.3 Å, without an angle criterion; consecutive nucleotides are not counted.');
    add('Suikerpuckering uit de pseudorotatiefase P (C3\'-endo: P < 90° of > 324°; C2\'-endo: 108–216°). Glycosidische hoek χ: syn bij −45° < χ < +90°, hoog-anti bij −90° … −45°, anders anti.', 'Sugar pucker from the pseudorotation phase P (C3\'-endo: P < 90° or > 324°; C2\'-endo: 108–216°). Glycosidic angle χ: syn for −45° < χ < +90°, high-anti for −90° … −45°, otherwise anti.');
    if (e.helix) add('Helixparameters: de as is een cilinderfit op de fosforatomen; twist en stijging volgen uit opeenvolgende basenparen (C1\'–C1\'-vectoren), gemiddeld over volledige dinucleotiden. Bij korte of gebogen stukken zijn het schattingen.', 'Helix parameters: the axis is a cylinder fit to the phosphorus atoms; twist and rise follow from consecutive base pairs (C1\'–C1\' vectors), averaged over complete dinucleotides. For short or bent pieces these are estimates.');
    if (e.heavy) add('Grote structuur: weergave vereenvoudigd (cartoon zonder basen) voor snelheid.', 'Large structure: rendering simplified (cartoon without bases) for speed.');
    if (e.keep) add('Enkel één kopie van het complex uit de asymmetrische eenheid wordt getoond.', 'Only one copy of the complex from the asymmetric unit is shown.');
    if (e.assembly) add('De dubbelhelix is opgebouwd uit de biologische assemblage (kristallografische symmetrie).', 'The double helix is generated from the biological assembly (crystallographic symmetry).');
  }
  if (e.bentNote) S.push(L(e.bentNote));
  if (e.simpl) S.push(L(e.simpl));
  return S;
}

/* ---------- koppeling van de kijkhoek ---------- */
let syncing = false;
function syncFrom(src) {
  if (!src || !state.cmp || !$('link').checked) return;
  const view = src.viewer.getView();
  for (const o of SLOTS) if (o !== src && o.atoms && !o.el.hidden) { const ov = o.viewer.getView(); ov[4] = view[4]; ov[5] = view[5]; ov[6] = view[6]; ov[7] = view[7]; o.viewer.setView(ov); }
}
SLOTS.forEach(s => s.viewer.setViewChangeCallback?.(() => {
  if (syncing || !state.cmp || !$('link').checked) return;
  syncing = true; syncFrom(s); syncing = false;
}));

/* ---------- bedieningselementen ---------- */
function seg(id, key) {
  const box = $(id);
  box.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    box.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
    if (key === 'color') { state.colorWant = b.dataset.v; syncColor(); } else { state[key] = b.dataset.v; syncColor(); }
    SLOTS.forEach(s => { s.focus = null; });
    showHint(); renderAll(); legend();
  };
}
seg('style', 'style'); seg('color', 'color'); seg('bases', 'bases');
$('bases').querySelectorAll('button').forEach(b => { b.setAttribute('aria-pressed', String(b.dataset.v === state.bases)); b.title = t(b.dataset.v + 'Tip'); });
for (const id of ['style', 'color']) $(id).querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.dataset.v === state[id]));
$('style').querySelectorAll('button').forEach(b => { b.title = L(T.hintStyle[b.dataset.v]); });
$('color').querySelectorAll('button').forEach(b => { b.title = L(T.hintColor[b.dataset.v]); });
for (const k of ['hb', 'syn', 'ions', 'ligs', 'water', 'na']) $(k).checked = state[k];
for (const k of ['hb', 'syn', 'ions', 'ligs', 'water', 'na']) $(k).onchange = e => { state[k] = e.target.checked; renderAll(); legend(); };
$('spin').onchange = e => SLOTS.forEach(s => s.viewer.spin(e.target.checked ? 'y' : false, SPIN));

/* Kleurkeuzes die bij dit molecule niets anders tonen, worden verborgen (bv. "per streng" bij één enkele RNA-streng
 * is hetzelfde als "per soort"). Wie niets koos, krijgt de nuttigste kleur: onderdelen > strengen > soort. */
function colorAvail() {
  const shown = SLOTS.filter(s => !s.el.hidden && s.an);
  if (!shown.length) return null;
  // Basen-keuze enkel bij Cartoon en als er DNA/RNA in beeld is (niet bij grote structuren: die zijn altijd sporten)
  $('basesGrp').hidden = !(state.style === 'cartoon' && shown.some(s => s.an.nts && !s.entry.heavy));
  const rungs = state.style === 'cartoon' && (state.bases === 'rungs' || shown.every(s => s.entry.heavy || !s.an.nts));
  const av = new Set(rungs && shown.every(s => !s.an.prot) ? ['type'] : ['type', 'elem']);
  if (shown.some(s => s.entry.mark)) av.add('part');
  if (shown.some(s => s.an.nts)) av.add('base');
  if (shown.some(s => { const c = {}; for (const v of Object.values(s.an.chainType)) c[v] = (c[v] ?? 0) + 1; return Object.values(c).some(n => n > 1); })) av.add('chain');
  return av;
}
function syncColor() {
  const av = colorAvail(); if (!av) return false;
  // vaste items met eiwit: per soort (zo kloppen de kleuren in "Wat zie je in de figuur?"); zelf opgezochte eiwitten: per keten
  const shown = SLOTS.filter(s => !s.el.hidden && s.an), prot = shown.some(s => s.an.prot && !s.entry.custom);
  const auto = av.has('part') ? 'part' : av.has('chain') && !prot ? 'chain' : 'type';
  const eff = state.colorWant !== 'auto' && av.has(state.colorWant) ? state.colorWant : auto;
  $('color').querySelectorAll('button').forEach(b => { b.hidden = !av.has(b.dataset.v); b.setAttribute('aria-pressed', String(b.dataset.v === eff)); });
  const changed = eff !== state.color; state.color = eff; showHint();
  return changed;
}
function showHint() {
  const sb = $('style').querySelector(`[data-v="${state.style}"]`), cb = $('color').querySelector(`[data-v="${state.color}"]`);
  // cartoon: eiwit wordt anders getekend dan DNA/RNA — zeg het erbij als er eiwit in beeld is
  const shown = SLOTS.filter(s => !s.el.hidden && s.an), prot = shown.some(s => s.an.prot), na = !shown.length || shown.some(s => s.an.nts);
  const cN = state.bases === 'rungs' || shown.every(s => s.entry.heavy) ? t('rungsTip') : L(T.hintStyle.cartoon);
  const st = state.style === 'cartoon' ? [na ? cN : '', prot ? t('cartoonProt') : ''].filter(Boolean).join('; ') : L(T.hintStyle[state.style]);
  // per soort: enkel de soorten die in beeld zijn, met dezelfde kleuren als de figuur (bv. histonen grijs in plaats van paars)
  const has = ty => shown.some(s => Object.values(s.an.chainType ?? {}).includes(ty)), W = T.hintColor.typeW;
  const ty = shown.length ? [has('dna') && L(W.dna), has('rna') && L(W.rna), has('prot') && L(shown.some(s => s.entry.histone) ? W.histone : W.prot)].filter(Boolean).join(', ') : '';
  const ct = state.color === 'type' && ty ? ty : L(T.hintColor[state.color]);
  $('tHint').innerHTML = `<span><b>${sb.textContent}</b> ${st}</span><span><b>${cb.textContent}</b> ${ct}</span>`;
}

/* Aangepaste bouwstenen (bv. de 14 chemisch aangepaste letters in tRNA, of selenomethionine in eiwitten) staan als HETATM in
 * het PDB-bestand. 3Dmol tekent het lint enkel voor standaardnamen, zodat het lint op elke aangepaste letter brak. Voor het
 * tekenen krijgen ze daarom de naam van hun gewone bouwsteen (de echte naam blijft in resn0) en worden ze met hun buren verbonden. */
const STD_NA = new Set(['A', 'C', 'G', 'U', 'T', 'DA', 'DC', 'DG', 'DT']);
function mendPolymer(atoms) {
  const res = new Map();
  for (const a of atoms) {
    if (a.kind === 'na' && !STD_NA.has(a.resn)) {
      const p = parentBase(a.resn) ?? 'A';
      a.resn0 = a.resn; a.resn = a.ctype === 'dna' ? (p === 'U' ? 'DT' : 'D' + p) : (p === 'T' ? 'U' : p); a.hetflag = false;
    } else if (a.kind === 'prot' && a.hetflag) { a.resn0 = a.resn; a.hetflag = false; }
    else continue;
    const k = a.chain + ':' + a.resi; if (!res.has(k)) res.set(k, { chain: a.chain, resi: a.resi });
  }
  if (!res.size) return;
  // ruggengraatbinding met de buren (O3'–P bij nucleotiden, C–N bij aminozuren) als die nog ontbreekt
  const byKey = new Map();
  for (const a of atoms) if (a.kind === 'na' || a.kind === 'prot') byKey.set(`${a.chain}:${a.resi}:${a.atom}`, a);
  const link = (x, y) => {
    if (!x || !y || x.bonds.includes(y.index)) return;
    if ((x.x - y.x) ** 2 + (x.y - y.y) ** 2 + (x.z - y.z) ** 2 > 2.1 ** 2) return;
    x.bonds.push(y.index); x.bondOrder.push(1); y.bonds.push(x.index); y.bondOrder.push(1);
  };
  for (const { chain, resi } of res.values()) for (const [r1, r2] of [[resi - 1, resi], [resi, resi + 1]]) {
    link(byKey.get(`${chain}:${r1}:O3'`), byKey.get(`${chain}:${r2}:P`));
    link(byKey.get(`${chain}:${r1}:C`), byKey.get(`${chain}:${r2}:N`));
  }
}

/* ---------- alles bijwerken ---------- */
function update() {
  const e = BY[state.id];
  $('eName').textContent = e.custom ? `PDB ${e.pdb}` : nameOf(e);
  const badges = [e.custom ? `<span class="badge mine">${t('mineBadge')}</span>` : `<span class="badge ours">${t('atlasBadge')}</span>`];
  if (e.pdb) badges.push(`<a class="badge pdbb" href="https://www.rcsb.org/structure/${e.pdb}" target="_blank" rel="noopener">PDB ${e.pdb} ↗</a>`);
  else badges.push(`<span class="badge">${t('schema')}</span>`);
  e.type.forEach(ty => badges.push(`<span class="badge t-${ty}">${L(FILTERS.type.opts[ty])}</span>`));
  e.cls.filter(c => c !== 'info').forEach(c => badges.push(`<span class="badge">${L(FILTERS.cls.opts[c])}</span>`));
  e.ctx.forEach(c => badges.push(`<span class="badge">${L(FILTERS.ctx.opts[c])}</span>`));
  if (e.plant) badges.push(`<span class="badge warn">${t('plant')}</span>`);
  $('eBadges').innerHTML = badges.join('');
  $('cmpBtn').setAttribute('aria-pressed', state.cmp);
  $('presets').hidden = !state.cmp; $('cmpHint').hidden = !state.cmp; $('linkTog').hidden = !state.cmp;
  const only2d = state.set.every(id => !BY[id].pdb);
  $('toolbar').hidden = only2d; $('legend').hidden = only2d; $('tHint').hidden = only2d;
  const n = state.set.length;
  $('slots').className = 'slots' + (n > 1 ? ' n' + n : '');
  SLOTS.forEach((s, i) => {
    const id = state.set[i];
    const wasHidden = s.el.hidden;
    s.el.hidden = !id;
    if (!id) { s.token++; s.entry = null; s.atoms = null; s.viewer.clear(); return; }
    s.viewer.resize();
    if (s.entry?.id !== id || !s.atoms && BY[id].pdb) loadSlot(s, BY[id]).then(() => { legend(); });
    else { s.el.querySelector('.x').hidden = !state.cmp || n < 2; if (wasHidden) { s.viewer.resize(); s.viewer.render(); } }
  });
  requestAnimationFrame(() => SLOTS.forEach(s => { if (!s.el.hidden) { s.viewer.resize(); s.viewer.render(); } }));
  info(e);
  renderList();
  legend();
  const u = new URL(location.href);
  u.searchParams.set('id', state.id);
  if (state.cmp && n > 1) u.searchParams.set('cmp', state.set.slice(1).join(',')); else u.searchParams.delete('cmp');
  u.searchParams.delete('lang');
  history.replaceState(null, '', u);
}
addEventListener('resize', () => SLOTS.forEach(s => { if (!s.el.hidden) { s.viewer.resize(); s.viewer.render(); } }));

buildFilters();
update();
// deelbare link naar een zelf opgezochte structuur: ?id=pdb-4HHB of ?pdb=4HHB
{ const want = (q.get('pdb') ?? (q.get('id')?.startsWith('pdb-') ? q.get('id').slice(4) : '')).toUpperCase(); if (want && !BY['pdb-' + want]) openCode(want); else if (want && state.id !== 'pdb-' + want) pick('pdb-' + want); }
// geselecteerd item in beeld in de lijst
requestAnimationFrame(() => {
  const li = document.querySelector('.item.on'), list = $('list');
  if (li) list.scrollTop = li.offsetTop - list.offsetTop - list.clientHeight / 2 + li.offsetHeight / 2;
});

// testhaak (enkel met ?debug=1): laat testscripts het klik-tabje rechtstreeks openen
if (q.has('debug')) window.__atlas = { SLOTS, showPop };
