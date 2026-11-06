/* POC 3 · Diepte — teksten (NL/EN) en bronnen. Elke bewering op de pagina verwijst naar een bron hieronder. */
import { L } from '../../shared/i18n.js';

export const $ = id => document.getElementById(id);
export const t = k => { const v = L(T[k]); return v ?? k; };

export const SRC = {
  drew: { t: 'Drew HR et al. (1981) Structure of a B-DNA dodecamer: conformation and dynamics. PNAS 78:2179–2183 (PDB 1BNA)', url: 'https://doi.org/10.1073/pnas.78.4.2179' },
  shi: { t: 'Shi H & Moore PB (2000) The crystal structure of yeast phenylalanine tRNA at 1.93 Å resolution: a classic structure revisited. RNA 6:1091–1105 (PDB 1EHZ)', url: 'https://doi.org/10.1017/S1355838200000364' },
  vijay: { t: 'Vijay-Kumar S, Bugg CE & Cook WJ (1987) Structure of ubiquitin refined at 1.8 Å resolution. J Mol Biol 194:531–544 (PDB 1UBQ)', url: 'https://doi.org/10.1016/0022-2836(87)90679-6' },
  pauling: { t: 'Pauling L, Corey RB & Branson HR (1951) The structure of proteins: two hydrogen-bonded helical configurations of the polypeptide chain. PNAS 37:205–211', url: 'https://doi.org/10.1073/pnas.37.4.205' },
  kabsch: { t: 'Kabsch W & Sander C (1983) Dictionary of protein secondary structure: pattern recognition of hydrogen-bonded and geometrical features. Biopolymers 22:2577–2637 (DSSP)', url: 'https://doi.org/10.1002/bip.360221211' },
  rama: { t: 'Ramachandran GN, Ramakrishnan C & Sasisekharan V (1963) Stereochemistry of polypeptide chain configurations. J Mol Biol 7:95–99', url: 'https://doi.org/10.1016/S0022-2836(63)80023-6' },
  lovell: { t: 'Lovell SC et al. (2003) Structure validation by Cα geometry: φ,ψ and Cβ deviation. Proteins 50:437–450 (PubMed 12557186)', url: 'https://doi.org/10.1002/prot.10286' },
  alb_dna: { t: 'Alberts et al., Molecular Biology of the Cell (4e) — The Structure and Function of DNA (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK26821/' },
  alb_rna: { t: 'Alberts et al., Molecular Biology of the Cell (4e) — From DNA to RNA (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK26887/' },
  alb_prot: { t: 'Alberts et al., Molecular Biology of the Cell (4e) — From RNA to Protein (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK26829/' },
  cooper: { t: 'Cooper, The Cell, 2nd ed. — Transcription in Prokaryotes (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK9850/' },
  miller: { t: 'Miller, Hamkalo & Thomas (1970) Visualization of bacterial genes in action. Science 169:392 (PubMed 4915822)', url: 'https://pubmed.ncbi.nlm.nih.gov/4915822/' },
  webster: { t: 'Webster et al. (2020) Structural basis of transcription-translation coupling and collision in bacteria. Science 369:1355 (PubMed 32820062)', url: 'https://pubmed.ncbi.nlm.nih.gov/32820062/' },
  cahova: { t: 'Cahová et al. (2015) NAD captureSeq indicates NAD as a bacterial cap for a subset of regulatory RNAs. Nature 519:374 (PubMed 25533955)', url: 'https://pubmed.ncbi.nlm.nih.gov/25533955/' },
  edgell: { t: 'Edgell, Belfort & Shub (2000) Barriers to intron promiscuity in bacteria. J Bacteriol 182:5281 (PMC110968)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC110968/' },
  mol3d: { t: 'Rego N & Koes D (2015) 3Dmol.js: molecular visualization with WebGL. Bioinformatics 31:1322–1324', url: 'https://doi.org/10.1093/bioinformatics/btu829' },
};

/* bronnenlijst onderaan een tab; cite(k) geeft het volgnummer [n] */
export function sources(el, keys) {
  el.innerHTML = `<h3>${t('srcH')}</h3><ol>${keys.map(k => `<li><a href="${SRC[k].url}" target="_blank" rel="noopener">${SRC[k].t}</a></li>`).join('')}</ol>`;
  return k => `<sup>[${keys.indexOf(k) + 1}]</sup>`;
}

export const T = {
  title: { nl: 'POC 3 · Diepte', en: 'POC 3 · Depth' },
  sub: { nl: 'fase 4 · echte 3D, atoomniveau en mens ⇄ bacterie', en: 'phase 4 · real 3D, atomic level and human ⇄ bacterium' },
  home: { nl: '← Start', en: '← Home' },
  tabA: { nl: 'A · Echt in 3D', en: 'A · Real 3D' },
  tabB: { nl: 'B · Atoomniveau', en: 'B · Atomic level' },
  tabC: { nl: 'C · Mens ⇄ bacterie', en: 'C · Human ⇄ bacterium' },
  srcH: { nl: 'Bronnen', en: 'Sources' },
  loading: { nl: 'Structuur laden…', en: 'Loading structure…' },
  loadErr: { nl: 'De structuur kon niet geladen worden.', en: 'The structure could not be loaded.' },
  stick: { nl: 'Stokjes', en: 'Sticks' },
  sphere: { nl: 'Bolletjes', en: 'Spheres' },

  /* A */
  aH: { nl: 'Elke tekening heeft een echt molecuul achter zich', en: 'Every drawing has a real molecule behind it' },
  aP: { nl: 'De scènes in de app zijn <b>vereenvoudigde tekeningen</b>. Bij elke structuurknoop komt bovenaan één knop: <b>Bekijk echt in 3D</b>. Die legt het echte molecuul uit de Protein Data Bank over de tekening. Sluiten brengt je terug naar dezelfde plek.',
        en: 'The scenes in the app are <b>simplified drawings</b>. Every structure node gets one button at the top: <b>View in real 3D</b>. It lays the real molecule from the Protein Data Bank over the drawing. Closing takes you back to the same spot.' },
  aPick: { nl: 'Probeer bij:', en: 'Try it on:' },
  aOpen: { nl: 'Bekijk echt in 3D', en: 'View in real 3D' },
  aClose: { nl: 'Sluiten ✕', en: 'Close ✕' },
  aAtlas: { nl: 'Verder in de atlas →', en: 'More in the atlas →' },
  aFoot: { nl: 'Sleep om te draaien · scroll om in te zoomen · echte atoomcoördinaten uit PDB ', en: 'Drag to rotate · scroll to zoom · real atomic coordinates from PDB ' },
  a2dTag: { nl: 'tekening (vereenvoudigd)', en: 'drawing (simplified)' },

  /* B */
  bH: { nl: 'Tot op het atoom: wat houdt de vorm bij elkaar?', en: 'Down to the atom: what holds the shape together?' },
  bP: { nl: 'Een <b>waterstofbrug</b> is een zwakke plakker tussen twee atomen. Eén alleen is zwak, maar met velen houden ze een eiwit of een DNA-ladder in vorm. Alle getallen hieronder rekent je browser <b>nu uit</b> de echte atoomposities.',
        en: 'A <b>hydrogen bond</b> is a weak sticker between two atoms. One alone is weak, but many together hold a protein or a DNA ladder in shape. Your browser computes every number below <b>right now</b> from the real atom positions.' },
  bProt: { nl: 'Eiwit · ubiquitine (1UBQ)', en: 'Protein · ubiquitin (1UBQ)' },
  bDna: { nl: 'DNA · dodecameer (1BNA)', en: 'DNA · dodecamer (1BNA)' },
  hintProt: { nl: 'Klik op een punt in de grafiek of op het eiwit in 3D.', en: 'Click a dot in the plot or the protein in 3D.' },
  hintDna: { nl: 'Klik op een rij in de tabel of op een base in 3D.', en: 'Click a row in the table or a base in 3D.' },
  b3dH: { nl: 'Bruggen in de ruggengraat', en: 'Bonds in the backbone' },
  helix: { nl: 'helix', en: 'helix' }, sheet: { nl: 'blad (β)', en: 'sheet (β)' }, other: { nl: 'rest', en: 'other' }, hbLeg: { nl: 'waterstofbrug', en: 'hydrogen bond' },
  ramaH: { nl: 'Twee draaipunten per bouwsteen', en: 'Two hinges per building block' },
  fav: { nl: 'gunstig', en: 'favoured' }, allow: { nl: 'toegestaan', en: 'allowed' },
  resH: { nl: 'Wat je ziet', en: 'What you see' },
  nHb: { nl: 'waterstofbruggen in de ruggengraat', en: 'hydrogen bonds in the backbone' },
  nRes: { nl: 'bouwstenen met φ en ψ', en: 'building blocks with φ and ψ' },
  nFav: { nl: 'in een gunstig gebied', en: 'in a favoured region' },
  nSS: { nl: 'helix · blad · rest', en: 'helix · sheet · other' },
  phipsi: { nl: 'Elke bouwsteen (aminozuur) heeft <b>twee draaipunten</b> in de ruggengraat: φ (phi) en ψ (psi). Samen bepalen ze welke kant de keten op gaat. Niet elke combinatie kan: dan botsen atomen. De grafiek toont elke bouwsteen als één punt.',
           en: 'Every building block (amino acid) has <b>two hinges</b> in the backbone: φ (phi) and ψ (psi). Together they decide which way the chain goes. Not every combination is possible: atoms would bump into each other. The plot shows each building block as one dot.' },
  ruleP: { nl: 'Vereenvoudigde regel: een brug telt als het N-atoom van bouwsteen j en het O-atoom van bouwsteen i hoogstens 3,5 Å uit elkaar liggen en ze minstens 3 plaatsen verschillen (geen hoek, geen energie zoals in DSSP). Helix = twee bruggen na elkaar van i naar i+4; blad = bruggen tussen twee strengen (ladderpatroon van DSSP). De gebieden in de grafiek zijn rechthoeken die de vorm van de echte gebieden benaderen.',
           en: 'Simplified rule: a bond counts when the N atom of building block j and the O atom of building block i are at most 3.5 Å apart and at least 3 positions apart (no angle, no energy as in DSSP). Helix = two consecutive bonds from i to i+4; sheet = bonds between two strands (DSSP ladder pattern). The regions in the plot are rectangles that approximate the shape of the real regions.' },
  selNone: { nl: 'Nog niets gekozen.', en: 'Nothing selected yet.' },
  inFav: { nl: 'in gunstig gebied', en: 'in favoured region' }, inAllow: { nl: 'in toegestaan gebied', en: 'in allowed region' }, inOut: { nl: 'buiten de gebieden', en: 'outside the regions' },
  partners: { nl: 'bruggen met', en: 'bonds with' },
  d3dH: { nl: 'Bruggen tussen de basen', en: 'Bonds between the bases' },
  dTabH: { nl: 'Gemeten per basenpaar', en: 'Measured per base pair' },
  dP: { nl: 'Een A tegenover een T houdt met <b>2</b> waterstofbruggen vast, een G tegenover een C met <b>3</b>. Hieronder meet je browser de afstand van elke brug (in ångström, 1 Å = 0,1 nm).',
        en: 'An A opposite a T holds on with <b>2</b> hydrogen bonds, a G opposite a C with <b>3</b>. Below your browser measures the length of each bond (in ångström, 1 Å = 0.1 nm).' },
  bp: { nl: 'paar', en: 'pair' }, pair: { nl: 'basen', en: 'bases' }, nb: { nl: 'bruggen', en: 'bonds' }, dist: { nl: 'afstanden (Å)', en: 'distances (Å)' },
  dSum: { nl: 'bruggen gemeten · gemiddeld', en: 'bonds measured · mean' },
  dRange: { nl: 'kortste – langste', en: 'shortest – longest' },

  /* C */
  cH: { nl: 'Van gen tot eiwit: mens of bacterie?', en: 'From gene to protein: human or bacterium?' },
  cP: { nl: 'Hetzelfde idee, een andere werkplaats. Bij de mens zit het DNA in een <b>kern</b> en wordt het RNA eerst bijgewerkt. Een bacterie heeft geen kern: ribosomen beginnen al terwijl het RNA nog gemaakt wordt. Wissel en kijk wat verandert.',
        en: 'Same idea, a different workshop. In humans the DNA sits in a <b>nucleus</b> and the RNA is edited first. A bacterium has no nucleus: ribosomes start while the RNA is still being made. Switch and watch what changes.' },
  cMens: { nl: 'Mens', en: 'Human' }, cBact: { nl: 'Bacterie', en: 'Bacterium' },
  play: { nl: '▶ Afspelen', en: '▶ Play' }, pause: { nl: '⏸ Pauze', en: '⏸ Pause' },
};
