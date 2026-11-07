/*
 * Nucleïnezuren-atlas — UI en 3D-weergave.
 * Taal: shared/i18n.js (localStorage 'dna-app-lang', ?lang=nl|en).
 * URL: ?id=<item>&cmp=<id>,<id>&lang=nl|en&from=<scène-id>
 */
import { pdbUrl, rcsbEntryUrl } from '../shared/pdb.js';
import { lang, L, setLang } from '../shared/i18n.js';
import { NODES, title as nodeTitle } from '../shared/content.js';
import { ENTRIES, FILTERS, PRESETS } from './entries.js';
import { preparePdb, analyse, orient, parentBase, LIGNAME, IONLABEL } from './analyse.js';
import { DIAGRAMS, diagramLegend } from './diagrams.js';
import { SIMPLE, EXTRA_GLOSS } from './simple.js';
import { GLOSSARY } from '../shared/glossary.js';
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
  ttl: { nl: 'DNA- en RNA-atlas', en: 'DNA and RNA atlas' },
  ttlSub: { nl: 'Echte 3D-vormen van DNA en RNA, zoals onderzoekers ze gemeten hebben', en: 'Real 3D shapes of DNA and RNA, as researchers measured them' },
  back: { nl: '← terug naar de animatie', en: '← back to the animation' },
  home: { nl: 'Start', en: 'Home' }, story: { nl: 'Verhaal-app', en: 'Story app' },
  search: { nl: 'Typ wat je zoekt: bv. mens dubbelstreng, enkel streng, triple helix, histon…', en: 'Type what you want: e.g. human double strand, single strand, triple helix, histone…' },
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
  view: { nl: 'Weergave', en: 'View' }, stick: { nl: 'Stokjes', en: 'Sticks' }, sphere: { nl: 'Ruimtevullend', en: 'Space-filling' }, trace: { nl: 'Ruggengraat', en: 'Backbone' },
  colour: { nl: 'Kleur', en: 'Colour' }, byStrand: { nl: 'Per streng', en: 'By strand' }, byChain: { nl: 'Per keten', en: 'By chain' }, naTog: { nl: 'DNA en RNA tonen', en: 'Show DNA and RNA' }, byType: { nl: 'Per ketentype', en: 'By chain type' }, byBase: { nl: 'Per base', en: 'By base' }, byElem: { nl: 'Per element', en: 'By element' },
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
  pdbLbl: { nl: '🔎 Zoek elk eiwit of gen in de PDB', en: '🔎 Find any protein or gene in the PDB' }, pdbGo: { nl: 'Zoek', en: 'Search' }, pdbPh: { nl: 'bv. TP53 of 4HHB', en: 'e.g. TP53 or 4HHB' },
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
  pickWhyDna: { nl: 'Een groot stuk van het eiwit, samen met het DNA dat het vastpakt: zo zie je het eiwit aan het werk.', en: 'A large piece of the protein, together with the DNA it holds: you see the protein at work.' },
  pickWhyRna: { nl: 'Een groot stuk van het eiwit, samen met RNA: zo zie je het eiwit aan het werk.', en: 'A large piece of the protein, together with RNA: you see the protein at work.' },
  pickWhy: { nl: 'Een groot stuk van het eiwit, scherp gemeten.', en: 'A large piece of the protein, measured sharply.' },
  pickOld: { nl: y => ` Een van de eerste structuren van dit eiwit (${y}).`, en: y => ` One of the first structures of this protein (${y}).` },
  altHead: { nl: 'Of kies een andere versie', en: 'Or pick another version' },
  altNoDna: { nl: 'Het eiwit alleen (zonder DNA)', en: 'The protein on its own (without DNA)' },
  altDna: { nl: 'Samen met DNA', en: 'Together with DNA' },
  altBig: { nl: 'Het grootste stuk van het eiwit', en: 'The largest piece of the protein' },
  altSharp: { nl: 'Het scherpste beeld', en: 'The sharpest image' },
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
  mine: { nl: 'Zelf opgezocht', en: 'Looked up yourself' }, ours: { nl: 'Atlas', en: 'Atlas' }, mineBadge: { nl: 'zelf opgezocht', en: 'looked up yourself' },
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
const BASECOL = { A: '#5ad17a', T: '#ff6b6b', U: '#ff6b6b', G: '#ffc247', C: '#4fb0ff' };
const IONCOL = { K: '#8f40d4', NA: '#ab5cf2', MG: '#8aff00', MN: '#9c7ac7', CA: '#3dff00', ZN: '#7d80b0', CL: '#1ff01f', SR: '#00ff27', BA: '#00c900', CS: '#57178f', CO: '#f090a0', NI: '#50d050', CD: '#ffd98f', TL: '#a6544d', IOD: '#940094', BR: '#a62929' };
const IONRAD = { K: 1.35, NA: 1.0, MG: .72, MN: .8, CA: 1.0, ZN: .8, CL: 1.4, SR: 1.2, BA: 1.35, CS: 1.6, TL: 1.4 };
const BB = /'|^P$|^OP|^O[123]P/;

/* ---------- toestand ---------- */
const state = {
  id: BY[q.get('id')] ? q.get('id') : 'bdna',
  cmp: false, set: [],
  filt: { type: new Set(), cls: new Set(), ctx: new Set() }, text: '',
  found: null, foundShown: 10, foundAll: false, na: true,
  style: 'cartoon', color: 'strand', hb: false, syn: false, ions: true, ligs: true, water: false, mark: true,
};
// optionele weergave-instellingen via de URL (deelbare links): ?style=trace&color=base&hb=1&syn=1&water=1&ions=0&ligs=0
if (['cartoon', 'stick', 'sphere', 'trace'].includes(q.get('style'))) state.style = q.get('style');
if (['strand', 'chain', 'type', 'base', 'elem'].includes(q.get('color'))) state.color = q.get('color');
for (const k of ['hb', 'syn', 'ions', 'ligs', 'water', 'mark', 'na']) if (q.has(k)) state[k] = q.get(k) === '1';
const cmpIds = (q.get('cmp') || '').split(',').filter(id => BY[id] && id !== state.id).slice(0, 2);
if (cmpIds.length) { state.cmp = true; state.set = [state.id, ...cmpIds]; } else state.set = [state.id];

/* ---------- statische teksten ---------- */
document.title = `${t('ttl')} · Dogma`;
$('ttl').textContent = t('ttl'); $('ttlSub').textContent = t('ttlSub');
$('home').textContent = t('home'); $('storyLink').textContent = t('story');
if (FROM && /^[a-z0-9_-]+$/i.test(FROM)) { $('back').hidden = false; $('back').textContent = t('back'); $('back').href = `../app/index.html?scene=${encodeURIComponent(FROM)}`; }
$('storyLink').href = FROM ? `../app/index.html?scene=${encodeURIComponent(FROM)}` : '../app/index.html';
$('q').placeholder = t('search');
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
const TYPECOL = { dna: COL.dna, rna: COL.rna, hybrid: '#ffc247', prot: COL.prot, drug: '#7fdc6a' };
function renderList() {
  const list = filtered();
  $('count').textContent = t('count')(list.length);
  const code = state.text.toUpperCase();
  const raw = $('q').value.trim();
  const look = CODE_RE.test(code) ? (BY['pdb-' + code] ? '' : `<li class="item lookup" data-code="${code}" tabindex="0"><span class="tx"><div class="nm">${t('lookFor')(code)}</div><div class="sb">${t('lookForSub')}</div></span></li>`)
    : raw.length >= 2 && state.found?.term.toLowerCase() !== raw.toLowerCase() ? `<li class="item lookup" data-search="${esc(raw)}" tabindex="0"><span class="tx"><div class="nm">${t('lookName')(esc(raw))}</div><div class="sb">${t('lookNameSub')}</div></span></li>` : '';
  let lastCustom = false;
  $('list').innerHTML = look + foundHTML() + (list.length ? list.map(e => {
    const head = e.custom && !lastCustom ? `<li class="lhead">${t('mine')}</li>` : !e.custom && lastCustom ? `<li class="lhead">${t('ours')}</li>` : '';
    lastCustom = !!e.custom;
    const inSet = state.set.includes(e.id);
    const on = state.cmp ? inSet : e.id === state.id;
    return head + `<li class="item ${on ? 'on' : ''} ${state.cmp && inSet && e.id !== state.set[0] ? 'cmp' : ''}" data-id="${e.id}" tabindex="0">
      ${state.cmp ? `<span class="ck ${inSet ? 'on' : ''}">${inSet ? state.set.indexOf(e.id) + 1 : ''}</span>` : ''}
      <span class="dots">${e.type.map(ty => `<i style="background:${TYPECOL[ty]}" title="${L(FILTERS.type.opts[ty])}"></i>`).join('')}</span>
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
  const add = (x, lab) => { if (x && !used.has(x.code)) { used.add(x.code); alts.push(card(x, lab, '', 'alt')); } };
  if (best.dna) add(big.find(x => !x.dna && !x.rna && !x.partners), t('altNoDna')); else add(big.find(x => x.dna), t('altDna'));
  const largest = [...f.items].filter(x => x.cov != null && !x.odd).sort((a, b) => b.cov - a.cov || (a.res ?? 9) - (b.res ?? 9))[0];
  if (largest && largest.cov > (best.cov ?? 0) + .1) add(largest, t('altBig'));
  add([...big].filter(x => x.res).sort((a, b) => a.res - b.res)[0], t('altSharp'));
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
  el.innerHTML = `<div class="sh"><h3></h3><span class="hand"></span><a class="pdbl" target="_blank" rel="noopener"></a><button class="x" title="×">×</button></div>
    <div class="sbody"><div class="sview"><div class="stage"><div class="load"></div><div class="hover"></div><div class="note3d" hidden></div><div class="diag" hidden></div></div>
    <div class="dleg" hidden></div><div class="smeta"></div></div><div class="calcgrid"></div></div>`;
  $('slots').append(el);
  const stage = el.querySelector('.stage');
  const viewer = $3Dmol.createViewer(stage, { backgroundColor: CSS('--bg-2') || '#0d1426', antialias: true });
  const s = { i, el, stage, viewer, token: 0, entry: null, atoms: null, an: null };
  // het vak krijgt zijn hoogte uit de lay-out (vult het scherm): de viewer schaalt mee als het vak van maat verandert
  let lastH = 0;
  new ResizeObserver(() => { const h = Math.round(stage.clientHeight); if (h && h !== lastH && !el.hidden) { lastH = h; viewer.resize(); viewer.render(); } }).observe(stage);
  el.querySelector('.x').onclick = () => { if (state.set.length > 1) { state.set = state.set.filter(x => x !== s.entry?.id); state.id = state.set[0]; update(); } };
  SLOTS.push(s);
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
  s.entry = e; s.atoms = null; s.an = null;
  const el = s.el;
  el.querySelector('h3').textContent = e.custom ? `PDB ${e.pdb}` : nameOf(e);
  const hand = el.querySelector('.hand'); hand.hidden = true;
  const pl = el.querySelector('.pdbl');
  el.querySelector('.x').hidden = !state.cmp || state.set.length < 2;
  const load = s.stage.querySelector('.load'), diag = s.stage.querySelector('.diag'), n3 = s.stage.querySelector('.note3d'), dleg = el.querySelector('.dleg');
  el.querySelector('.calcgrid').innerHTML = ''; el.querySelector('.smeta').innerHTML = '';
  s.viewer.clear(); s.viewer.removeAllShapes(); s.viewer.spin(false); s.viewer.render();
  n3.hidden = true;
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
    const hov = s.stage.querySelector('.hover');
    s.viewer.setHoverable({}, true, a => {
      const k = { na: a.ctype === 'rna' ? 'RNA' : 'DNA', prot: t('protein'), ion: IONLABEL[a.resn] ?? a.resn, lig: L(LIGNAME[a.resn] ?? { nl: 'ligand', en: 'ligand' }), water: t('water1') }[a.kind] ?? '';
      hov.textContent = `${a.resn} ${a.resi} · ${t('chain')} ${a.chain} · ${a.atom} (${a.elem}) · ${k}`; hov.style.opacity = 1;
    }, () => { hov.style.opacity = 0; });
    lb.step(4, t('stDraw'), hint); await nextPaint(); if (token !== s.token) return;
    render(s);
    load.textContent = '';
    s.viewer.zoomTo({ predicate: a => a.kind === 'na' || a.kind === 'prot' }); s.viewer.zoom(e.heavy ? 1.0 : 0.92); s.viewer.render();
    if ($('spin').checked) s.viewer.spin('y', .6);
    syncFrom(SLOTS.find(o => o !== s && o.atoms && !o.el.hidden));
  } catch (err) {
    lb.stop();
    if (token !== s.token) return;
    load.textContent = t('failed') + (e.custom ? t('codeOffline') + ' (' + err.message + ')' : err.message); console.error(err);
  }
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
  return `<table class="calc easy"><tr class="sec"><td colspan="2">${t('secFacts')}</td></tr>${f.map(([k, v]) => `<tr><td>${L(k)}</td><td>${L(v)}</td></tr>`).join('')}</table>`;
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
  return `<table class="calc easy"><tr class="sec"><td colspan="2">${t('secMeasured')}</td></tr>${R.join('')}</table>`;
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
function chainColours(s) {
  const map = {}, n = { dna: 0, rna: 0, prot: 0 };
  const chains = [...new Set(s.atoms.filter(a => a.kind === 'na' || a.kind === 'prot').map(a => a.chain))];
  for (const c of chains) {
    const ty = s.an.chainType[c];
    const pal = ty === 'prot' ? (s.entry.histone ? PAL.histone : PAL.prot) : PAL[ty];
    map[c] = pal[n[ty]++ % pal.length];
  }
  if (s.entry.third && map[s.entry.third]) map[s.entry.third] = '#5fd3e6';
  return map;
}
/* per keten: elke eiwitketen een duidelijk andere kleur (zo zie je uit hoeveel delen een complex bestaat); DNA blauw, RNA oranje in tinten */
const CHAINPAL = ['#9b7bff', '#2cc6a8', '#ffc247', '#ff6b9a', '#7fdc6a', '#5fd3e6', '#ff8a3d', '#d0a2ff', '#c3f06b', '#ff9f9f', '#8fb3ff', '#f0c27b'];
function distinctChains(s) {
  const map = {}, n = { dna: 0, rna: 0, prot: 0 };
  const chains = [...new Set(s.atoms.filter(a => a.kind === 'na' || a.kind === 'prot').map(a => a.chain))];
  for (const c of chains) { const ty = s.an.chainType[c]; map[c] = ty === 'prot' ? CHAINPAL[n.prot++ % CHAINPAL.length] : PAL[ty === 'hybrid' ? 'dna' : ty][n[ty === 'rna' ? 'rna' : 'dna']++ % 6]; }
  return map;
}
/* markeringen (entry.mark): basen die het begrip tonen (mismatch, G–U, bulge, stam, lus…) krijgen een eigen kleur;
 * met entry.dim wordt de rest van het RNA grijs, zodat het gemarkeerde stuk opvalt */
function markOf(e) {
  if (!e?.mark || !state.mark || state.color === 'elem') return null;
  const m = new Map(); for (const g of e.mark) for (const r of g.res) m.set(r, g.col); return m;
}
function colorFn(s) {
  const cf = baseColorFn(s), mk = markOf(s.entry);
  if (!mk || !cf) return cf;
  return a => mk.get(a.chain + ':' + a.resi) ?? (s.entry.dim && a.kind === 'na' ? '#5b6378' : cf(a));
}
function baseColorFn(s) {
  const cm = chainColours(s);
  const typeCol = a => a.ctype === 'rna' ? COL.rna : a.ctype === 'prot' ? (s.entry.histone ? COL.histone : COL.prot) : COL.dna;
  if (state.color === 'strand') return a => cm[a.chain] ?? '#aaa';
  if (state.color === 'chain') { const m = distinctChains(s); return a => m[a.chain] ?? '#aaa'; }
  if (state.color === 'type') return typeCol;
  if (state.color === 'base') return a => a.kind === 'prot' ? '#5a4bb8' : BB.test(a.atom) ? '#8791a8' : BASECOL[parentBase(a.resn)] ?? '#aab';
  return null;
}
function render(s) {
  const { viewer, atoms, entry: e } = s;
  if (!atoms) return;
  viewer.setStyle({}, {});
  viewer.removeAllShapes();
  const cf = colorFn(s);
  const col = cf ? { colorfunc: cf } : { colorscheme: 'Jmol' };
  const NA = { predicate: a => a.kind === 'na' }, PR = { predicate: a => a.kind === 'prot' };
  const heavy = !!e.heavy;
  const naOff = !state.na && atoms.some(a => a.kind === 'prot');   // DNA/RNA verbergen (enkel zinvol als er eiwit is)
  if (state.style === 'cartoon') {
    if (heavy) viewer.setStyle(NA, { cartoon: { ...col, thickness: .5 } });
    else {
      viewer.setStyle(NA, { cartoon: { ...col, ribbon: false, thickness: .6 }, stick: { ...col, radius: .16 } });
      viewer.setStyle({ predicate: a => a.kind === 'na' && BB.test(a.atom) }, { cartoon: { ...col, ribbon: false, thickness: .6 } });
    }
    viewer.setStyle(PR, { cartoon: { ...col, opacity: e.heavyish ? .9 : 1 } });
  } else if (state.style === 'stick') {
    viewer.setStyle({ predicate: a => a.kind === 'na' || a.kind === 'prot' }, { stick: { ...col, radius: heavy ? .3 : .2 } });
  } else if (state.style === 'sphere') {
    viewer.setStyle({ predicate: a => a.kind === 'na' || a.kind === 'prot' }, { sphere: { ...col, scale: 1 } });
  } else {
    // ruggengraat: fosforketen per streng (zigzag bij Z-DNA), eiwit als dunne trace
    const cm = chainColours(s);
    if (!heavy) viewer.setStyle(NA, { stick: { ...col, radius: .08, opacity: .35 } });
    viewer.setStyle(PR, { cartoon: { ...col, style: 'trace', thickness: .3 } });
    const chains = [...new Set(atoms.filter(a => a.kind === 'na').map(a => a.chain))];
    chains.forEach(ch => {
      const ps = atoms.filter(a => a.chain === ch && a.atom === 'P' && a.kind === 'na').sort((a, b) => a.resi - b.resi);
      const c = state.color === 'elem' ? '#ff8000' : state.color === 'type' || state.color === 'base' ? (s.an.chainType[ch] === 'rna' ? COL.rna : COL.dna) : cm[ch];
      for (let i = 1; i < ps.length; i++) { if (ps[i].resi - ps[i - 1].resi > 1.5) continue; viewer.addCylinder({ start: xyz(ps[i - 1]), end: xyz(ps[i]), radius: heavy ? .7 : .5, color: c, fromCap: 1, toCap: 1 }); }
      if (!heavy) for (const p of ps) viewer.addSphere({ center: xyz(p), radius: .9, color: c });
    });
  }
  // gemarkeerde basen dikker, zodat ze opvallen in cartoon/ruggengraat
  const mk = markOf(e);
  if (mk && (state.style === 'cartoon' || state.style === 'trace')) viewer.addStyle({ predicate: a => a.kind === 'na' && mk.has(a.chain + ':' + a.resi) && !BB.test(a.atom) }, { stick: { colorfunc: cf, radius: .34 } });
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
  if (state.syn) for (const r of s.an.synRes) viewer.setStyle({ chain: r.chain, resi: r.resi, resn: r.resn }, { stick: { color: '#f06bc0', radius: .26 } });
  if (naOff) { viewer.setStyle(NA, {}); viewer.removeAllShapes(); }
  viewer.render();
}
const xyz = a => ({ x: a.x, y: a.y, z: a.z });
const renderAll = () => SLOTS.forEach(s => !s.el.hidden && s.atoms && render(s));

/* ---------- legende ---------- */
function legend() {
  const items = [];
  const sw = (c, txt) => items.push(`<span><i style="background:${c}"></i>${txt}</span>`);
  const shown = SLOTS.filter(s => !s.el.hidden && s.an);
  const hasType = ty => shown.some(s => Object.values(s.an.chainType).includes(ty));
  if (state.color === 'strand' || state.color === 'type') {
    if (hasType('dna')) sw(COL.dna, state.color === 'strand' ? `DNA (${t('strand')} 1, 2…: ${['#4f8ff7', '#9cc0ff', '#5fd3e6'].map(c => `<i style="background:${c};margin:0 2px 0 3px"></i>`).join('')})` : 'DNA');
    if (hasType('rna')) sw(COL.rna, 'RNA');
    if (hasType('prot')) { const h = shown.some(s => s.entry.histone); sw(h ? COL.histone : COL.prot, h ? (lang === 'nl' ? 'histonen' : 'histones') : t('protein')); }
  } else if (state.color === 'chain') {
    const s0 = shown[0];
    if (s0) { const m = distinctChains(s0); for (const [c, col] of Object.entries(m)) { const ty = s0.an.chainType[c]; if (ty !== 'prot' && !state.na) continue; sw(col, `${ty === 'prot' ? t('protein') : ty === 'rna' ? 'RNA' : 'DNA'} · ${t('chain')} ${c}`); } }
  } else if (state.color === 'base') {
    for (const [b, c] of Object.entries({ A: BASECOL.A, 'T/U': BASECOL.T, G: BASECOL.G, C: BASECOL.C })) sw(c, b);
    sw('#8791a8', t('backbone'));
  } else {
    sw('#909090', 'C'); sw('#3050f8', 'N'); sw('#ff0d0d', 'O'); sw('#ff8000', 'P');
  }
  if (state.ions) { const ions = new Set(shown.flatMap(s => Object.keys(s.an.ions))); for (const k of ions) sw(IONCOL[k] ?? '#ff1493', IONLABEL[k] ?? k); }
  if (state.ligs && shown.some(s => Object.keys(s.an.ligs).length)) sw('#33ff33', t('lig'));
  if (state.mark && state.color !== 'elem') { const seen = new Set(); for (const s of shown) for (const g of s.entry.mark ?? []) { const lab = L(g.label); if (!seen.has(lab)) { seen.add(lab); sw(g.col, `<b>${lab}</b>`); } } }
  if (state.hb) sw('#fff', `- - ${t('hbond')}`);
  if (state.syn) sw('#f06bc0', t('synConf'));
  $('legend').innerHTML = items.join('');
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
  if (e.plant) s.push(`<div class="plantbox">${t('plant')}</div>`);
  if (sp) {
    s.push(`<div class="kort"><b>${t('inShort')}</b><p>${termsHTML(L(sp.kort))}</p></div>`);
    if (sp.look) s.push(`<h3>${t('look')}</h3><p>${termsHTML(L(sp.look))}</p>`);
    if (sp.why) s.push(`<h3>${t('why')}</h3><p>${termsHTML(L(sp.why))}</p>`);
  }
  if (scenes.length) s.push(`<h3>${t('scenes')}</h3><div class="scenes">${scenes.map(id => `<a href="../app/index.html?scene=${id}">${nodeTitle(NODES[id])}<span>${t('open')}</span></a>`).join('')}</div>`);
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
  $('info').scrollTop = 0;
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
    const nmr = ['143D', '1EL2', '1BWG', '1ANR', '1YMO'].includes(e.pdb);
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
    state[key] = b.dataset.v; renderAll(); legend();
  };
}
seg('style', 'style'); seg('color', 'color');
for (const id of ['style', 'color']) $(id).querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.dataset.v === state[id]));
for (const k of ['hb', 'syn', 'ions', 'ligs', 'water', 'mark', 'na']) $(k).checked = state[k];
for (const k of ['hb', 'syn', 'ions', 'ligs', 'water', 'mark', 'na']) $(k).onchange = e => { state[k] = e.target.checked; renderAll(); legend(); };
$('spin').onchange = e => SLOTS.forEach(s => s.viewer.spin(e.target.checked ? 'y' : false, .6));

/* ---------- alles bijwerken ---------- */
function update() {
  const e = BY[state.id];
  $('eName').textContent = e.custom ? `PDB ${e.pdb}` : nameOf(e);
  const badges = [];
  if (e.pdb) badges.push(`<a class="badge pdbb" href="https://www.rcsb.org/structure/${e.pdb}" target="_blank" rel="noopener">PDB ${e.pdb} ↗</a>`);
  else badges.push(`<span class="badge">${t('schema')}</span>`);
  e.type.forEach(ty => badges.push(`<span class="badge t-${ty}">${L(FILTERS.type.opts[ty])}</span>`));
  if (e.custom) badges.push(`<span class="badge mine">${t('mineBadge')}</span>`);
  e.cls.filter(c => c !== 'info').forEach(c => badges.push(`<span class="badge">${L(FILTERS.cls.opts[c])}</span>`));
  e.ctx.forEach(c => badges.push(`<span class="badge">${L(FILTERS.ctx.opts[c])}</span>`));
  if (e.plant) badges.push(`<span class="badge warn">${t('plant')}</span>`);
  $('eBadges').innerHTML = badges.join('');
  $('cmpBtn').setAttribute('aria-pressed', state.cmp);
  $('presets').hidden = !state.cmp; $('cmpHint').hidden = !state.cmp; $('linkTog').hidden = !state.cmp;
  const only2d = state.set.every(id => !BY[id].pdb);
  $('markTog').hidden = !state.set.some(id => BY[id].mark);
  $('toolbar').hidden = only2d; $('legend').hidden = only2d;
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
