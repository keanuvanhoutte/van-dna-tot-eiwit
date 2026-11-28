import { C, L, T2, svgOpen, cam, sub, ease, lerp, clamp, f1, CLASSCOL, AACLASS, THREE } from '../../kit.js';
import { T, TL, smooth, chain, enz, tag, arrowDefs, arr, sugar, panel, SNFG } from './_b_kit.js';
import { membraanLijn, ribosoomOpER, eiwit, tmHelix, cisterne, sec61, vouwing } from '../../bio.js';

/* ER-membraan horizontaal (cytosol boven, lumen onder); rechts (x 1700–2600) het Golgi */
const MEM = 380, MEMH = 44;
/* De keten komt links uit het translocon; het N-uiteinde loopt voorop (rechts). Van N naar C lees je dus van rechts naar links:
 * G-S-L-A-V-N-L-T-E-K, met het sequon N-L-T (N op index 4, S/T twee plaatsen verder richting C = index 2). */
const SEQ = ['K', 'E', 'T', 'L', 'N', 'V', 'A', 'L', 'S', 'G'];
const ASN = 4, BX0 = 380, BDX = 52, BY = 700;   // kralenrij laag genoeg zodat de suikerboom (naast OST) er vrij boven hangt
const DOL = [672, MEM + MEMH / 2 + 12];                           // dolichol-PP vlak naast OST (OST bindt drager en keten tegelijk)
/* ribosoom op het ER: 60S op Sec61, 40S erboven, mRNA ertussen; de keten loopt door de tunnel van de 60S het kanaal in */
const RIB = ribosoomOpER(330, MEM + MEMH / 2, { mw: MEMH, s: 1.05, label: '60S', labelSmall: '40S' });
const FOLD = [1010, 560], FASN = [1098, 530];                      // gevouwen glycoproteïne rechts in het lumen, dicht bij het membraan
/* calnexine (Schrag et al. 2001, Mol Cell 8:633): bolvormig lectinedomein vlak bij het membraan (korte linker naar de TM-helix),
 * met een lange, uitgestrekte P-arm. Het lectinedomein ligt in rust rechts en raakt gebonden de laatste Glc (c1). */
const CNXTM = 1380, CNXREST = [1480, 478], CNXBIND = [1310, 520];
/* zijlabels cytosol / ER-lumen per stap (x van cytosol, x van lumen), zodat ze binnen elke camera vallen */
const SIDE = [[700, 700], [700, 700], [900, 900], [900, 1080], [780, 780], [780, 780], [1100, 1480]];
const D = 26;                                                      // afstand tussen suikers

/* suikerboom Glc3Man9GlcNAc2 (groeit langs +y vanaf (0,0)); st = { glc, man8, complex } */
const NODES = {
  g1: ['GlcNAc', 0, 1, null], g2: ['GlcNAc', 0, 2, 'g1'], m3: ['Man', 0, 3, 'g2'],
  a1: ['Man', -1.1, 4, 'm3'], a2: ['Man', -1.1, 5, 'a1'], a3: ['Man', -1.1, 6, 'a2'], c1: ['Glc', -1.1, 7, 'a3'], c2: ['Glc', -1.1, 8, 'c1'], c3: ['Glc', -1.1, 9, 'c2'],
  r1: ['Man', 1.1, 4, 'm3'], b1: ['Man', .55, 5, 'r1'], b2: ['Man', .55, 6, 'b1'], d1: ['Man', 1.65, 5, 'r1'], d2: ['Man', 1.65, 6, 'd1'],
};
const CPLX = {
  g1: ['GlcNAc', 0, 1, null], f: ['Fuc', .9, 1, 'g1'], g2: ['GlcNAc', 0, 2, 'g1'], m3: ['Man', 0, 3, 'g2'],
  a1: ['Man', -1, 4, 'm3'], an: ['GlcNAc', -1, 5, 'a1'], ag: ['Gal', -1, 6, 'an'], as: ['Sia', -1, 7, 'ag'],
  r1: ['Man', 1, 4, 'm3'], rn: ['GlcNAc', 1, 5, 'r1'], rg: ['Gal', 1, 6, 'rn'], rs: ['Sia', 1, 7, 'rg'],
};
function glycan(x, y, rot, st, op = 1) {
  if (op <= .01) return '';
  const set = st.complex ? CPLX : NODES;
  const keep = id => {
    if (st.complex) return true;
    if (id === 'c3') return st.glc >= 3; if (id === 'c2') return st.glc >= 2; if (id === 'c1') return st.glc >= 1;
    if (id === 'b2') return !st.man8;
    return true;
  };
  let e = '', n = '';
  for (const [id, [ty, gx, gy, par]] of Object.entries(set)) {
    const k = keep(id); const a = typeof k === 'number' ? k : k ? 1 : 0;
    const px = gx * D, py = gy * D;
    const pp = par ? [set[par][1] * D, set[par][2] * D] : [0, 0];
    if (a > 0) { e += `<line x1="${f1(pp[0])}" y1="${f1(pp[1])}" x2="${f1(px)}" y2="${f1(py)}" stroke="#cfd6e6" stroke-width="2.5" opacity="${f1(a)}"/>`; n += sugar(ty, px, py, 11, a); }
  }
  // gedeeltelijke suiker (voor afknippen/terugzetten): st.fade = [id, a]
  if (st.fade) { const [id, a] = st.fade; const [ty, gx, gy, par] = set[id]; const pp = [set[par][1] * D, set[par][2] * D]; e += `<line x1="${f1(pp[0])}" y1="${f1(pp[1])}" x2="${f1(gx * D)}" y2="${f1(gy * D)}" stroke="#cfd6e6" stroke-width="2.5" opacity="${f1(a)}"/>`; n += sugar(ty, gx * D + st.fadeDx * (1 - a), gy * D + st.fadeDy * (1 - a), 11, a); }
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)})" opacity="${f1(op)}">${e}${n}</g>`;
}
/* punt in de boom → scènecoördinaten */
function tipAt(x, y, rot, gx, gy) { const a = rot * Math.PI / 180, px = gx * D, py = gy * D; return [x + px * Math.cos(a) - py * Math.sin(a), y + px * Math.sin(a) + py * Math.cos(a)]; }

const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'glyco',
  title: { nl: 'N-glycosylatie', en: 'N-linked glycosylation' },
  scale: '≈ 5–20 nm',
  time: { nl: 'overdracht meestal tijdens de translatie; tot het eiwit de cel verlaat: ~20 min tot enkele uren', en: 'transfer usually during translation; until the protein leaves the cell: ~20 min to a few hours' },
  org: { nl: 'mens (ER-lumen en Golgi)', en: 'human (ER lumen and Golgi)' },
  legend: [[SNFG.GlcNAc, 'GlcNAc ■'], [SNFG.GalNAc, 'GalNAc ■'], [SNFG.Man, 'Man ●'], [SNFG.Glc, 'Glc ●'], [SNFG.Gal, 'Gal ●'], [SNFG.Sia, 'Sia (Neu5Ac) ◆'], [SNFG.Fuc, 'Fuc ▲'], [C.chain, { nl: 'nieuwe keten', en: 'new chain' }], [C.prot, { nl: 'enzymen en lectinen', en: 'enzymes and lectins' }], [C.mem, { nl: 'ER-membraan', en: 'ER membrane' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Suikers in de internationale SNFG-symbolen (Symbol Nomenclature for Glycans): blauw vierkant GlcNAc, geel vierkant GalNAc, groene cirkel mannose, blauwe cirkel glucose, gele cirkel galactose, paarse ruit siaalzuur, rode driehoek fucose.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Sugars in the international SNFG symbols (Symbol Nomenclature for Glycans): blue square GlcNAc, yellow square GalNAc, green circle mannose, blue circle glucose, yellow circle galactose, purple diamond sialic acid, red triangle fucose.</p>' },
  simplified: {
    nl: 'Bindingstypes (α1-2, α1-3, …) zijn niet getekend; de boom toont wel de juiste samenstelling Glc3Man9GlcNAc2 en vertakking. OST, Sec61 en calnexine zijn schematisch (OST-A/STT3A werkt co-translationeel naast het translocon, OST-B/STT3B ook later). Calreticuline (oplosbaar) en ERp57 werken zoals calnexine en zijn weggelaten of enkel vermeld. In het Golgi ontstaan veel verschillende complexe glycanen; één biantennaire vorm is als voorbeeld getekend. ERAD is schematisch: het retrotranslocon (in gist het ubiquitineligase Hrd1; Schoebel et al. 2017, Nature) en het proteasoom zijn eenvoudige vormen, en verdere stappen in het cytosol zijn weggelaten.',
    en: 'Linkage types (α1-2, α1-3, …) are not drawn; the tree does show the correct composition Glc3Man9GlcNAc2 and branching. OST, Sec61 and calnexin are schematic (OST-A/STT3A acts co-translationally next to the translocon, OST-B/STT3B also later). Calreticulin (soluble) and ERp57 work like calnexin and are omitted or only mentioned. Many different complex glycans form in the Golgi; one biantennary form is drawn as an example. ERAD is schematic: the retrotranslocon (in yeast the ubiquitin ligase Hrd1; Schoebel et al. 2017, Nature) and the proteasome are simple shapes, and further steps in the cytosol are omitted.' },
  /* "Wat zie je?" (zijpaneel): elk onderdeel van de figuur in één zin — d = eenvoudig, p = vaktaal (hoger) */
  parts: [
    { c: C.rrna, t: { nl: 'ribosoom', en: 'ribosome' }, m: ['60S', '40S'], d: { nl: 'De eiwitfabriek, vastgezet op het ER. Ze heeft een groot en een klein deel.', en: 'The protein factory, docked on the ER. It has a large and a small part.' },
      p: { nl: '80S-ribosoom (60S + 40S) dat via de SRP-route op het ER-translocon is gedockt.', en: '80S ribosome (60S + 40S) docked on the ER translocon via the SRP route.' } },
    { c: C.rna, t: 'mRNA', d: { nl: 'De boodschap met de bouwinstructies die het ribosoom leest.', en: 'The message with the building instructions that the ribosome reads.' },
      p: { nl: 'Messenger-RNA dat door het membraangebonden ribosoom wordt getransleerd.', en: 'Messenger RNA being translated by the membrane-bound ribosome.' } },
    { c: C.mem, t: { nl: 'ER-membraan', en: 'ER membrane' }, m: ['cytosol', 'ER-lumen', 'ER lumen'], d: { nl: 'De dubbele vetlaag van het ER. Boven ligt het celvocht (cytosol), onder de binnenkant van het ER (lumen).', en: 'The double fatty layer of the ER. Above is the cell fluid (cytosol), below the inside of the ER (lumen).' },
      p: { nl: 'Fosfolipidedubbellaag van het ruw ER; scheidt cytosol en ER-lumen.', en: 'Phospholipid bilayer of the rough ER; separates the cytosol and the ER lumen.' } },
    { c: C.prot, t: 'Sec61', d: { nl: 'Een porie in het ER-membraan waar de nieuwe keten doorheen schuift.', en: 'A pore in the ER membrane through which the new chain threads.' },
      p: { nl: 'Sec61-translocon: eiwitgeleidend kanaal voor cotranslationele translocatie.', en: 'Sec61 translocon: protein-conducting channel for co-translational translocation.' } },
    { c: C.chain, t: { nl: 'nieuwe keten', en: 'new chain' }, m: ['Val', 'Ala', 'Leu', 'Ser', 'Gly', 'Glu', 'Thr', 'Lys', '→ N-term', 'C', 'keten groeit het lumen in', 'chain grows into the lumen'], d: { nl: 'De rij bolletjes: de groeiende eiwitketen, met per bolletje een bouwsteen (aminozuur). Het begin (N) loopt voorop.', en: 'The row of beads: the growing protein chain, one building block (amino acid) per bead. The start (N) goes first.' },
      p: { nl: 'Naar het lumen getransloceerd polypeptide (kleuren per zijketenklasse); het N-uiteinde komt eerst binnen.', en: 'Polypeptide translocated into the lumen (colours by side-chain class); the N-terminus enters first.' } },
    { c: '#ffc247', t: 'sequon', m: ['Asn', 'N', 'X', 'S/T', '(X ≠ Pro)'], d: { nl: 'Het herkenningsteken voor de suiker: een asparagine (N), dan om het even welke bouwsteen (X), dan Ser of Thr (S/T).', en: 'The recognition sign for the sugar: an asparagine (N), then any building block (X), then Ser or Thr (S/T).' },
      p: { nl: 'N-glycosyleringssequon Asn-X-Ser/Thr met X ≠ Pro; de suiker wordt op de amidestikstof van Asn gezet.', en: 'N-glycosylation sequon Asn-X-Ser/Thr with X ≠ Pro; the glycan is attached to the amide nitrogen of Asn.' } },
    { c: C.danger, t: 'Pro', m: ['✗ geen suiker: Pro past niet', '✗ no sugar: Pro does not fit'], d: { nl: 'Staat er een proline tussen, dan krijgt de asparagine geen suiker.', en: 'If a proline sits in between, the asparagine gets no sugar.' },
      p: { nl: 'Pro op positie X verhindert de vereiste conformatie in het actieve centrum van OST.', en: 'Pro at position X prevents the required conformation in the OST active site.' } },
    { c: '#ffb27a', t: 'dolichol-PP', d: { nl: 'Een vetachtige drager in het membraan waarop het suikerboompje klaar ligt.', en: 'A fatty carrier in the membrane on which the sugar tree lies ready.' },
      p: { nl: 'Dolichylpyrofosfaat: lipidedrager van het voorgevormde oligosaccharide aan de lumenzijde.', en: 'Dolichyl pyrophosphate: lipid carrier of the preassembled oligosaccharide on the luminal side.' } },
    { c: SNFG.Man, t: { nl: 'suikerboom (14 suikers)', en: 'sugar tree (14 sugars)' }, m: ['2 × GlcNAc', '9 × mannose', '3 × glucose', '= 14 suikers', '= 14 sugars', 'Glc₃Man₉GlcNAc₂'], d: { nl: 'Een vertakt boompje van 14 suikers: 2 blauwe vierkantjes, 9 groene bolletjes (mannose) en 3 blauwe bolletjes (glucose) bovenaan.', en: 'A branched tree of 14 sugars: 2 blue squares, 9 green circles (mannose) and 3 blue circles (glucose) at the top.' },
      p: { nl: 'Oligosaccharide Glc₃Man₉GlcNAc₂ (SNFG-symbolen), en bloc overgedragen.', en: 'Oligosaccharide Glc₃Man₉GlcNAc₂ (SNFG symbols), transferred en bloc.' } },
    { c: C.prot, t: 'OST', d: { nl: 'Het enzym dat het hele suikerboompje in één keer van de drager op de asparagine zet.', en: 'The enzyme that moves the whole sugar tree from the carrier onto the asparagine in one go.' },
      p: { nl: 'Oligosaccharyltransferase (o.a. STT3A naast het translocon); draagt het glycaan cotranslationeel over op Asn.', en: 'Oligosaccharyltransferase (e.g. STT3A next to the translocon); transfers the glycan co-translationally onto Asn.' } },
    { c: '#ffc247', t: { nl: 'N-glycosidische binding op Asn', en: 'N-glycosidic bond on Asn' }, d: { nl: 'De vaste verbinding tussen de suikerboom en de asparagine.', en: 'The firm link between the sugar tree and the asparagine.' },
      p: { nl: 'β-N-glycosidische binding tussen GlcNAc en de amidestikstof van Asn.', en: 'β-N-glycosidic bond between GlcNAc and the amide nitrogen of Asn.' } },
    { c: C.prot2, t: 'glucosidase I', m: ['glucosidase II', 'Glc₁Man₉GlcNAc₂'], d: { nl: 'Twee knipenzymen die de glucoses bovenaan de boom één voor één weghalen.', en: 'Two cutting enzymes that remove the glucoses at the top of the tree one by one.' },
      p: { nl: 'Glucosidase I verwijdert de buitenste glucose, glucosidase II de volgende twee; Glc₁Man₉GlcNAc₂ is het ligand van calnexine.', en: 'Glucosidase I removes the outermost glucose, glucosidase II the next two; Glc₁Man₉GlcNAc₂ is the ligand of calnexin.' } },
    { c: '#c9b8ff', t: { nl: 'calnexine', en: 'calnexin' }, m: ['(lectine, bindt Glc₁)', '(lectin, binds Glc₁)', 'calnexine houdt vast', 'calnexin holds'], d: { nl: 'Een helper vastgemaakt aan het ER-membraan. Hij herkent de laatste glucose en houdt het eiwit vast tot het goed gevouwen is.', en: 'A helper anchored in the ER membrane. It recognises the last glucose and holds the protein until it is folded correctly.' },
      p: { nl: 'Membraangebonden lectine-chaperone; bindt monoglucosyleerde glycanen (calnexine/calreticulinecyclus).', en: 'Membrane-bound lectin chaperone; binds monoglucosylated glycans (calnexin/calreticulin cycle).' } },
    { c: C.chain, t: { nl: 'vrij: gevouwen?', en: 'released: folded?' }, m: ['los + Glc eraf', 'freed, Glc off', 'herhaalt tot het eiwit gevouwen is', 'repeats until the protein is folded'], d: { nl: 'Het eiwit laat los en de laatste glucose gaat eraf. Dan wordt gecontroleerd of het al goed gevouwen is.', en: 'The protein lets go and the last glucose comes off. Then it is checked whether it is folded correctly yet.' },
      p: { nl: 'Na deglucosylering door glucosidase II komt het substraat vrij en wordt de vouwingstoestand beoordeeld.', en: 'After deglucosylation by glucosidase II the substrate is released and its folding state is assessed.' } },
    { c: C.prot3, t: 'UGGT', m: ['UGGT: “nog niet goed” → Glc terug', 'UGGT: “not yet right” → Glc back', 'UGGT: Glc terug', 'UGGT: Glc back'], d: { nl: 'De kwaliteitscontroleur: is het eiwit nog niet goed gevouwen, dan zet hij er een glucose terug op, zodat de helper het opnieuw vastpakt.', en: 'The quality checker: if the protein is not folded right yet, it puts a glucose back, so the helper grabs it again.' },
      p: { nl: 'UDP-glucose:glycoproteïne-glucosyltransferase; herkent niet-natieve conformaties en reglucosyleert, wat een nieuwe calnexinecyclus start.', en: 'UDP-glucose:glycoprotein glucosyltransferase; recognises non-native conformations and reglucosylates, starting a new calnexin cycle.' } },
    { c: C.ok, t: { nl: 'gevouwen → Golgi (COPII)', en: 'folded → Golgi (COPII)' }, d: { nl: 'Goed gevouwen eiwitten gaan in een blaasje verder naar het Golgi.', en: 'Correctly folded proteins move on to the Golgi in a vesicle.' },
      p: { nl: 'Natief gevouwen glycoproteïnen verlaten het ER in COPII-vesikels.', en: 'Natively folded glycoproteins leave the ER in COPII vesicles.' } },
    { c: C.prot2, t: { nl: 'ER-mannosidase I', en: 'ER mannosidase I' }, d: { nl: 'Een knipenzym dat één mannose wegneemt. Blijft het eiwit lang fout, dan is dat een teken om het af te breken.', en: 'A cutting enzyme that removes one mannose. If the protein stays wrong for long, this is a sign to break it down.' },
      p: { nl: 'Verwijdert een mannose (Man₉ → Man₈); verder mannosetrimmen merkt langdurig misgevouwen eiwitten voor ERAD.', en: 'Removes one mannose (Man₉ → Man₈); further mannose trimming marks long-term misfolded proteins for ERAD.' } },
    { c: C.danger, t: 'ERAD', m: ['retrotranslocon', 'blijvend misgevouwen → terug naar het cytosol', 'permanently misfolded → back to the cytosol'], d: { nl: 'De afvalroute: een eiwit dat fout blijft, wordt door een porie terug naar het celvocht geschoven.', en: 'The waste route: a protein that stays wrong is pushed back through a pore into the cell fluid.' },
      p: { nl: 'ER-geassocieerde afbraak: retrotranslocatie (via een Hrd1-complex) naar het cytosol, ubiquitinering en proteasomale afbraak.', en: 'ER-associated degradation: retrotranslocation (via a Hrd1 complex) to the cytosol, ubiquitination and proteasomal degradation.' } },
    { c: '#c9d2e4', t: 'p97', d: { nl: 'Een motor-eiwit dat het foute eiwit uit het ER trekt.', en: 'A motor protein that pulls the faulty protein out of the ER.' },
      p: { nl: 'p97/VCP: AAA+-ATPase die geubiquitineerde substraten uit het membraan extraheert.', en: 'p97/VCP: AAA+ ATPase that extracts ubiquitinated substrates from the membrane.' } },
    { c: '#ffd166', t: { nl: 'ubiquitine', en: 'ubiquitin' }, d: { nl: 'Een klein labeltje dat zegt: dit eiwit moet afgebroken worden.', en: 'A small tag that says: this protein must be broken down.' },
      p: { nl: 'Polyubiquitineketen als degradatiesignaal voor het proteasoom.', en: 'Polyubiquitin chain as degradation signal for the proteasome.' } },
    { c: '#2cc6a8', t: { nl: 'proteasoom', en: 'proteasome' }, m: ['breekt het eiwit af', 'breaks the protein down'], d: { nl: 'De afbraakmachine in het celvocht die gelabelde eiwitten in stukjes knipt.', en: 'The breakdown machine in the cell fluid that cuts tagged proteins into pieces.' },
      p: { nl: '26S-proteasoom (20S-kern + 19S-regulator); degradeert geubiquitineerde eiwitten.', en: '26S proteasome (20S core + 19S regulator); degrades ubiquitinated proteins.' } },
    { c: C.mem, t: { nl: 'Golgi-stapel', en: 'Golgi stack' }, m: ['cis', 'trans', 'in het Golgi-lumen', 'in the Golgi lumen'], d: { nl: 'Een stapel platte zakjes waar eiwitten na het ER doorheen gaan. Ze komen binnen aan de cis-kant en vertrekken aan de trans-kant.', en: 'A stack of flat sacs that proteins pass through after the ER. They enter on the cis side and leave on the trans side.' },
      p: { nl: 'Golgi-apparaat met cis-, mediale en trans-cisternen, elk met eigen glycosidasen en glycosyltransferasen.', en: 'Golgi apparatus with cis, medial and trans cisternae, each with its own glycosidases and glycosyltransferases.' } },
    { c: SNFG.Sia, t: { nl: 'complex N-glycaan', en: 'complex N-glycan' }, m: ['(GlcNAc, Gal, Sia, Fuc)'], d: { nl: 'In het Golgi worden mannoses weggeknipt en komen er andere suikers op: blauwe vierkantjes, gele bolletjes, paarse ruitjes en een rood driehoekje.', en: 'In the Golgi mannoses are trimmed off and other sugars are added: blue squares, yellow circles, purple diamonds and a red triangle.' },
      p: { nl: 'Complex (hier biantennair) N-glycaan met GlcNAc, galactose, siaalzuur en kernfucose, na mannosetrimming door Golgi-mannosidasen.', en: 'Complex (here biantennary) N-glycan with GlcNAc, galactose, sialic acid and core fucose, after mannose trimming by Golgi mannosidases.' } },
    { c: SNFG.Gal, t: { nl: 'O-glycaan', en: 'O-glycan' }, m: ['O-glycaan: GalNAc op Ser/Thr', 'O-glycan: GalNAc on Ser/Thr'], d: { nl: 'Een ander soort suikerketen. Ze begint met een geel vierkantje op een Ser of Thr en komt pas in het Golgi.', en: 'Another kind of sugar chain. It starts with a yellow square on a Ser or Thr and is added only in the Golgi.' },
      p: { nl: 'Mucine-type O-glycaan: GalNAc α-gebonden aan Ser/Thr, stapsgewijs opgebouwd in het Golgi (geen sequon).', en: 'Mucin-type O-glycan: GalNAc α-linked to Ser/Thr, built step by step in the Golgi (no sequon).' } },
  ],
  steps: [
    ST(7500, cam(640, 470, 1350), 'Een keten gaat het ER in', 'A chain enters the ER',
      'Het ribosoom zit vast op het ER. De keten schuift door een porie naar de binnenkant van het ER.',
      'The ribosome is docked on the ER. The chain threads through a pore into the inside of the ER.'),
    ST(7500, cam(620, 600, 1150), 'Waar komt de suiker?', 'Where does the sugar go?',
      'Suiker komt op een asparagine (N) met twee plekken verder Ser of Thr (S/T). Pro ertussen mag niet.',
      'Sugar goes onto an asparagine (N) with Ser or Thr (S/T) two places further. A Pro in between is not allowed.'),
    ST(8000, cam(1056, 540, 1000), 'Een kant-en-klare suikerboom', 'A ready-made sugar tree',
      'Aan de binnenkant van het ER-membraan hangt een boompje van 14 suikers klaar op een vetachtige drager.',
      'On the inner side of the ER membrane, a tree of 14 sugars waits on a fatty carrier.'),
    ST(8000, cam(800, 640, 1210), 'De boom gaat er in één keer op', 'The tree goes on in one go',
      'Een enzym zet de hele boom in één keer op de asparagine, terwijl de keten nog groeit.',
      'An enzyme puts the whole tree onto the asparagine at once, while the chain is still growing.'),
    ST(8500, cam(1250, 540, 1000), 'Bijknippen en vasthouden', 'Trimming and holding',
      'Enzymen knippen 2 van de 3 glucoses weg. Een helper (calnexine) herkent de laatste en houdt het eiwit vast.',
      'Enzymes trim 2 of the 3 glucoses. A helper (calnexin) recognises the last one and holds the protein.'),
    ST(9000, cam(1250, 540, 1000), 'Nog een ronde?', 'Another round?',
      'Het eiwit laat even los en de laatste glucose wordt weggeknipt. Nog niet goed gevouwen? Dan komt er een glucose terug.',
      'The protein lets go for a moment and the last glucose is trimmed off. Not folded right yet? Then a glucose is added back.'),
    ST(8500, cam(1218, 530, 1100), 'Doorlaten of afbreken', 'Pass or break down',
      'Goed gevouwen: door naar het Golgi. Blijft het fout, dan gaat het eiwit uit het ER en wordt het afgebroken.',
      'Folded correctly: on to the Golgi. If it stays wrong, the protein leaves the ER and is broken down.'),
    ST(9000, cam(2160, 480, 1150), 'In het Golgi: andere suikers', 'In the Golgi: other sugars',
      'In het Golgi gaan suikers eraf en komen andere erop. Suikerketens die met GalNAc op Ser of Thr beginnen, komen pas hier.',
      'In the Golgi, sugars are removed and others added. Sugar chains that start with GalNAc on Ser or Thr are only added here.'),
  ],
  svg() {
    // membraan (twee lagen) over de hele breedte van het ER-deel
    const mem = membraanLijn(-200, 1900, MEM + MEMH / 2, { w: MEMH, gaten: [[294, 366], [524, 656]] });   // openingen: Sec61 en OST
    // Golgi-cisternen rechts
    let golgi = '';
    [0, 1, 2, 3].forEach(i => golgi += cisterne(1970, 190 + i * 42, { len: 340 - i * 24, dik: 20, buig: 15, vert: false, w: 9 }));   // platte zakken: dubbellaag rond een lumen
    golgi += T(2180, 200, 'cis', { size: 18, col: C.muted, anchor: 'start' }) + T(2160, 330, 'trans', { size: 18, col: C.muted, anchor: 'start' });
    return svgOpen(arrowDefs('gl', { m: C.muted, g: C.ok, r: C.danger })) + `
    <g id="gl-er"><rect x="-200" y="${MEM + MEMH}" width="2100" height="700" fill="rgba(143,179,232,.08)"/>
    <g data-node="er" data-color="${C.mem}" data-nolabel>${mem}</g></g>
    <g data-node="er" data-color="${C.rrna}" data-label="${T2('Ribosoom op het ER (SRP-route)', 'Ribosome on the ER (SRP route)')}">
      ${RIB.svg}
      ${T(560, RIB.S.cy - 10, T2('ribosoom', 'ribosome'), { size: 22, col: C.rrna, anchor: 'start' })}
      ${T(584, RIB.mrnaY + 7, 'mRNA', { size: 18, col: C.rna, anchor: 'start' })}
      <circle data-anchor="er" cx="330" cy="${f1(RIB.S.cy - RIB.S.ry - 20)}" r="1" fill="none"/>
    </g>
    <g data-node="er" data-color="${C.prot}" data-nolabel>
    ${T(250, MEM + MEMH + 44, 'Sec61', { size: 18, col: C.prot, anchor: 'end' })}
    </g>
    <g id="gl-ost"></g>
    <g id="gl-dol"></g>
    <g id="gl-chain"></g>
    <g id="gl-prot"></g>
    <g data-node="chaperones" data-color="${C.prot}" data-nolabel><g id="gl-cnx"></g></g>
    <g id="gl-enz"></g>
    <g id="gl-tree"></g>
    <g id="gl-lbl"></g>
    <g data-node="golgi" data-color="${C.mem}" data-label="${T2('Golgi & secretie', 'Golgi & secretion')}">${golgi}<circle data-anchor="golgi" cx="1970" cy="165" r="1" fill="none"/></g>
    <g data-node="golgi" data-color="${C.mem}" data-nolabel><g id="gl-golgi"></g></g>
    <g data-node="ubiquitine" data-color="#ffd166" data-label="${T2('ERAD → proteasoom', 'ERAD → proteasome')}"><g id="gl-erad"></g><circle id="gl-eradA" data-anchor="ubiquitine" r="1" fill="none"/></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const bead = (x, y, a, hl = 0, r = 19) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${CLASSCOL[AACLASS[a]]}" stroke="${hl ? '#fff' : '#0a1224'}" stroke-width="${hl ? 3 : 2}"/>` + T(x, y + 5, THREE[a], { size: 15, col: '#0a1224', halo: false, w: 800 });
    const foldedProt = (x, y, dashed, op = 1) => `<g opacity="${f1(op)}"><ellipse cx="${f1(x)}" cy="${f1(y)}" rx="95" ry="75" fill="rgba(127,220,106,.16)" stroke="${C.chain}" stroke-width="4" ${dashed ? 'stroke-dasharray="14 8"' : ''}/>` +
      (dashed ? chain([[x - 60, y + 10], [x - 30, y - 40], [x, y + 10], [x + 30, y - 35], [x + 60, y + 15], [x + 10, y + 45], [x - 40, y + 40]], { w: 5, op: .6 })   // nog aan het vouwen: losse keten
        : vouwing(x, y, 95, 75, { col: C.chain })) + '</g>';                                                                                                   // gevouwen: helices + β-blad

    return {
      update(t, s) {
        const { step, p } = s;
        /* ---------- keten in het lumen (stap 0–3) ---------- */
        let cs = '';
        if (step <= 3) {
          const slide = step === 0 ? (1 - ease(sub(p, .1, .9))) * -5 * BDX : 0;
          // keten volgt de tunnel van de 60S (zelfde curve), dan door de Sec61-porie en vanaf de uitgang het lumen in
          const [ux, uy] = RIB.uit;
          cs += `<path d="${RIB.tunnelD} L${f1(ux)},${f1(uy)} C${f1(ux)},${f1(BY - 25)} ${f1(ux + 15)},${BY} ${BX0 - 10},${BY}" stroke="${C.chain}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
          let line = [];
          for (let i = SEQ.length - 1; i >= 0; i--) { const x = BX0 + (SEQ.length - 1 - i) * 0 + i * BDX + slide; if (x >= BX0 - 5) line.push([x, BY]); }
          cs += `<line x1="${BX0}" y1="${BY}" x2="${f1(BX0 + (SEQ.length - 1) * BDX + slide)}" y2="${BY}" stroke="${C.chain}" stroke-width="7"/>`;
          SEQ.forEach((a, i) => { const x = BX0 + i * BDX + slide; if (x >= BX0 - 5) cs += bead(x, BY, a, step >= 1 && i >= ASN - 2 && i <= ASN); });
          if (step >= 1 && step <= 2) {
            const k = step === 1 ? sub(p, .1, .3) : 1;
            const x0 = BX0 + ASN * BDX, x2 = x0 - 2 * BDX;           // x0 = Asn, x2 = Ser/Thr (twee plaatsen verder richting C)
            cs += `<path d="M${x2 - 22},${BY + 34} v12 H${x0 + 22} v-12" stroke="#fff" stroke-width="3" fill="none" opacity="${f1(k)}"/>`;
            if (step === 1) {
              [[x0, 'N'], [x0 - BDX, 'X'], [x2, 'S/T']].forEach(([x, l]) => cs += T(x, BY + 80, l, { size: 24, font: 'JetBrains Mono', w: 800, op: k }));
              cs += arr(x0 + 10, BY + 104, x2 - 10, BY + 104, C.muted, 'gl-m', { w: 3, op: k }) + T(x0 + 22, BY + 110, 'N', { size: 17, col: C.muted, anchor: 'start', op: k }) + T(x2 - 22, BY + 110, 'C', { size: 17, col: C.muted, anchor: 'end', op: k });
            } else cs += T(x0 + 14, BY + 80, 'sequon',   // rechts van het midden: blijft in beeld bij de camera van stap 3
              { size: 20, font: 'JetBrains Mono', w: 800, op: k });
            if (step === 1) {
              cs += T(x0 - BDX, BY + 140, T2('(X ≠ Pro)', '(X ≠ Pro)'), { size: 20, col: '#ffc247', op: sub(p, .3, .45) });
              const k2 = sub(p, .5, .7), y2 = BY + 180, xs = x2;
              ['T', 'P', 'N'].forEach((a, j) => cs += `<g opacity="${f1(k2)}">${bead(xs + j * BDX, y2, a)}</g>`);
              // dezelfde leesrichting als de hoofdketen: N rechts, C links (N-P-T)
              cs += arr(xs + 2 * BDX + 10, y2 + 30, xs - 10, y2 + 30, C.muted, 'gl-m', { w: 3, op: k2 }) + T(xs + 2 * BDX + 22, y2 + 36, 'N', { size: 17, col: C.muted, anchor: 'start', op: k2 }) + T(xs - 22, y2 + 36, 'C', { size: 17, col: C.muted, anchor: 'end', op: k2 });
              cs += T(xs + 3 * BDX + 10, y2 + 8, T2('✗ geen suiker: Pro past niet', '✗ no sugar: Pro does not fit'), { size: 20, col: C.danger, anchor: 'start', op: k2 });
            }
          }
          cs += T(BX0 + (SEQ.length - 1) * BDX + 60, BY + 8, step === 0 ? "→ N-term" : '', { size: 18, col: C.muted, anchor: 'start' });
        }
        $('gl-chain').innerHTML = cs;

        /* ---------- OST en dolichol ---------- */
        const ostOn = step <= 3 ? 1 : 0;
        $('gl-ost').innerHTML = ostOn ? eiwit(590, MEM + MEMH / 2 + 16, 72, 52, C.prot, { seed: 33, bumps: .1 }) +
          T(590, MEM - 34, 'OST', { size: 24, col: C.prot, w: 800 }) + (step === 3 ? `<circle cx="590" cy="${MEM + MEMH + 44}" r="8" fill="#ffc247"/>` : '') : '';
        let dol = '';
        const transfer = step === 3 ? ease(sub(p, .2, .7)) : step > 3 ? 1 : 0;
        if (step <= 3) {
          // vetachtige staart in het membraan, PP-kop (rood) aan de lumenkant
          let z = `M${DOL[0] + 10},${MEM + 26}`; for (let i = 1; i <= 7; i++) z += ` L${DOL[0] + 10 + i * 12},${MEM + (i % 2 ? 14 : 26)}`;
          dol += `<path d="${z}" stroke="#ffb27a" stroke-width="4" fill="none"/>` + `<circle cx="${DOL[0]}" cy="${MEM + MEMH - 6}" r="7" fill="${C.danger}"/><circle cx="${DOL[0] + 12}" cy="${MEM + MEMH - 12}" r="7" fill="${C.danger}"/>`;
          if (step >= 2) dol += T(DOL[0] + 40, MEM - 14, T2('dolichol-PP', 'dolichol-PP'), { size: 20, col: '#ffb27a', anchor: 'start', op: step === 2 ? sub(p, 0, .2) : 1 });
        }
        $('gl-dol').innerHTML = dol;

        /* ---------- suikerboom ---------- */
        let tree = '', st = { glc: 3, man8: false, complex: false };
        let tx = DOL[0], ty = DOL[1], rot = 0, top = step >= 2 ? 1 : .35;
        const asnX = BX0 + ASN * BDX;
        if (step === 3) {                                                // via de actieve plaats van OST (gele stip) naar het Asn
          const t1 = clamp(transfer * 2), t2 = clamp(transfer * 2 - 1);
          tx = lerp(lerp(DOL[0], 600, t1), asnX, t2); ty = lerp(lerp(DOL[1], MEM + MEMH + 28, t1), BY + 20, t2);
        }
        let move = 0;
        if (step >= 4) {
          move = step === 4 ? ease(sub(p, 0, .3)) : 1;
          tx = lerp(asnX, FASN[0], move); ty = lerp(BY + 20, FASN[1], move); rot = lerp(0, -90, move);
        }
        // glucose-knippen en calnexinecyclus
        let fade = null, cnxK = 0;
        if (step === 4) {
          const g1 = sub(p, .3, .45), g2 = sub(p, .5, .65);
          st.glc = g1 < 1 ? 2 : g2 < 1 ? 1 : 1; if (g1 < 1) fade = ['c3', 1 - g1]; else if (g2 < 1) { st.glc = 1; fade = ['c2', 1 - g2]; }
          cnxK = ease(sub(p, .7, .9));
        }
        if (step === 5) {
          const cut = sub(p, .18, .33), add = sub(p, .55, .72);
          st.glc = 0; if (cut < 1) fade = ['c1', 1 - cut]; else if (add > 0) fade = ['c1', add];
          if (add >= 1) { st.glc = 1; fade = null; }
          cnxK = 1 - ease(sub(p, 0, .14)) + ease(sub(p, .78, .95));
        }
        if (step === 6) { st.glc = 0; const m = sub(p, .15, .35); if (m < 1) fade = ['b2', 1 - m]; else st.man8 = true; }
        if (fade) { const tip = fade[0] === 'b2' ? [0, 60] : [0, 60]; st.fade = fade; st.fadeDx = tip[0]; st.fadeDy = tip[1]; st.glc = Math.min(st.glc, { c3: 2, c2: 1, c1: 0 }[fade[0]] ?? st.glc); }
        if (step <= 1) top = 0;
        if (step <= 6) tree += glycan(tx, ty, rot, st, step >= 2 ? 1 : 0);
        $('gl-tree').innerHTML = tree;

        /* ---------- gevouwen glycoproteïne ---------- */
        let pr = '';
        if (step >= 4 && step <= 6) {
          const x = lerp(asnX - 90, FOLD[0], move), y = lerp(BY + 90, FOLD[1], move);
          const done = step === 6;                                      // pas 'gevouwen' in stap 7 (in stap 6 zet UGGT nog een Glc terug)
          pr += foldedProt(x, y, !done, move);
          pr += chain([[x + 70, y - 25], [tx - 8, ty]], { w: 6, op: move });
        }
        $('gl-prot').innerHTML = pr;

        /* ---------- calnexine ---------- */
        let cn = '';
        if (step >= 4 && step <= 5) {
          const k = clamp(cnxK), gx = lerp(CNXREST[0], CNXBIND[0], k), gy = lerp(CNXREST[1], CNXBIND[1], k);
          cn += `<path d="M${CNXTM},${MEM + MEMH + 4} Q${CNXTM},${f1(gy - 12)} ${f1(gx)},${f1(gy)}" stroke="${C.prot}" stroke-width="10" fill="none" stroke-linecap="round" opacity=".75"/>`;   // korte linker
          cn += tmHelix(CNXTM, MEM - 6, MEM + MEMH + 6, C.prot, 1, 16);
          cn += `<path d="M${CNXTM},${MEM - 4} q12,-16 2,-34 q-8,-12 4,-22" stroke="${C.prot}" stroke-width="6" fill="none" stroke-linecap="round"/>`;   // staart in het cytosol (type I)
          // lange P-arm (haarspeld van prolinerijke herhalingen) die van het lectinedomein wegsteekt
          const arm = `M${f1(gx + 30)},${f1(gy - 12)} C${f1(gx + 90)},${f1(gy - 40)} ${f1(gx + 160)},${f1(gy - 30)} ${f1(gx + 200)},${f1(gy - 8)}`;
          cn += `<path d="${arm}" stroke="${C.prot}" stroke-width="16" fill="none" stroke-linecap="round" opacity=".7"/><path d="${arm}" stroke="#0b1224" stroke-opacity=".45" stroke-width="2.5" fill="none"/>`;
          cn += eiwit(gx, gy, 42, 38, C.prot, { seed: 23, bumps: .08 });   // bolvormig lectinedomein
          cn += T(gx + 120, gy + 70, T2('calnexine', 'calnexin'), { size: 22, col: '#c9b8ff' });
          cn += T(gx + 120, gy + 96, T2('(lectine, bindt Glc₁)', '(lectin, binds Glc₁)'), { size: 18, col: C.muted });
        }
        $('gl-cnx').innerHTML = cn;

        /* ---------- enzymen en labels ---------- */
        let en = '', lb = '';
        const tipC = n => tipAt(tx, ty, rot, -1.1, n);
        if (step === 4) {
          const a = tipC(9.3), b = tipC(8.3);
          en += enz(a[0] + 75, a[1], 90, 30, T2('glucosidase I', 'glucosidase I'), { col: C.prot2, fs: 16, op: sub(p, .2, .3) * (1 - sub(p, .45, .5)), fillOp: .5 });
          en += enz(b[0] + 79, b[1], 94, 30, T2('glucosidase II', 'glucosidase II'), { col: C.prot2, fs: 16, op: sub(p, .45, .5) * (1 - sub(p, .66, .72)), fillOp: .5 });
          lb += T(1110, 655, 'Glc₁Man₉GlcNAc₂', { size: 22, font: 'JetBrains Mono', w: 700, op: sub(p, .7, .85), anchor: 'start' });
        }
        if (step === 5) {
          const c = tipC(7.3);
          en += enz(c[0] + 79, c[1], 94, 30, T2('glucosidase II', 'glucosidase II'), { col: C.prot2, fs: 16, op: sub(p, .12, .18) * (1 - sub(p, .33, .38)), fillOp: .5 });
          en += enz(c[0] + 72, c[1], 70, 34, 'UGGT', { col: C.prot3, fs: 18, op: sub(p, .45, .52) * (1 - sub(p, .74, .8)), fillOp: .6 });
          lb += T(1110, 655, p < .45 ? T2('vrij: gevouwen?', 'released: folded?') : T2('UGGT: “nog niet goed” → Glc terug', 'UGGT: “not yet right” → Glc back'), { size: 22, col: p < .45 ? C.text : '#c9b8ff', op: sub(p, .25, .35), anchor: 'start' });
          // de cyclus als kleine tekening: vasthouden → los + Glc eraf → UGGT: Glc terug → opnieuw vasthouden
          const kc = sub(p, .8, .95), cy = 712, cx = [850, 1060, 1290];
          [[T2('calnexine houdt vast', 'calnexin holds'), C.prot], [T2('los + Glc eraf', 'freed, Glc off'), C.text], [T2('UGGT: Glc terug', 'UGGT: Glc back'), '#c9b8ff']]
            .forEach(([s2, col], i) => lb += T(cx[i], cy, s2, { size: 18, col, anchor: 'middle', op: kc }));
          lb += arr(948, cy - 6, 985, cy - 6, C.muted, 'gl-m', { w: 3, op: kc }) + arr(1138, cy - 6, 1195, cy - 6, C.muted, 'gl-m', { w: 3, op: kc });
          lb += arr(1290, cy + 12, 850, cy + 12, C.muted, 'gl-m', { w: 3, op: kc, bend: -.12 });
          lb += T(1070, cy + 74, T2('herhaalt tot het eiwit gevouwen is', 'repeats until the protein is folded'), { size: 18, col: C.muted, op: kc });
        }
        if (step === 6) {
          const c = tipAt(tx, ty, rot, .55, 6.3);
          en += enz(c[0] + 90, c[1] + 10, 110, 30, T2('ER-mannosidase I', 'ER mannosidase I'), { col: C.prot2, fs: 16, op: sub(p, .05, .12) * (1 - sub(p, .35, .42)), fillOp: .5 });
          lb += arr(1110, 615, 1400, 650, C.ok, 'gl-g', { w: 5, op: sub(p, .4, .55) }) + T(1420, 658, T2('gevouwen → Golgi (COPII)', 'folded → Golgi (COPII)'), { size: 22, col: C.ok, anchor: 'start', op: sub(p, .45, .6) });
        }
        $('gl-enz').innerHTML = en;
        // ERAD
        let er = '';
        if (step === 6) {
          /* tweede lot: een ander, blijvend misgevouwen eiwit (gestippeld). Het gaat als keten terug door het ER-membraan
           * (retrotranslocon) naar het cytosol, krijgt daar ubiquitine en wordt door het proteasoom afgebroken (Schoebel et al. 2017). */
          const km = sub(p, .5, .6), ke = sub(p, .55, .65), kt = ease(sub(p, .65, .92)), RX = 840, MX = 850, MY = 690;
          er += `<g opacity="${f1(km * (1 - .55 * kt))}"><ellipse cx="${MX}" cy="${MY}" rx="68" ry="50" fill="rgba(255,107,107,.10)" stroke="${C.chain}" stroke-width="4" stroke-dasharray="14 8"/>` +
            chain([[MX - 40, MY + 10], [MX - 15, MY - 25], [MX + 10, MY + 15], [MX + 35, MY - 20]], { w: 5, op: .6 }) + '</g>';
          er += `<g opacity="${f1(ke)}">${sec61(RX, MEM + MEMH / 2, { mw: MEMH, col: C.danger })}`;
          // proteasoom in dezelfde kleuren als in ubiquitine/proteasoom (20S grijs, 19S teal), vrij in het cytosol; de ATPase p97 (VCP)
          // trekt de keten uit het retrotranslocon en geeft ze door (Christianson & Ye 2014)
          [0, 1, 2, 3].forEach(i => er += `<rect x="${RX - 24}" y="${252 + i * 17}" width="48" height="15" rx="5" fill="#b3bccf" fill-opacity=".35" stroke="#b3bccf" stroke-width="2"/>`);
          er += eiwit(RX, 244, 30, 11, '#2cc6a8', { seed: 81, bumps: .1 }) + eiwit(RX, 330, 30, 11, '#2cc6a8', { seed: 82, bumps: .1 });
          er += eiwit(RX - 19, 355, 15, 10, '#c9d2e4', { seed: 83, bumps: .08 }) + eiwit(RX + 19, 355, 15, 10, '#c9d2e4', { seed: 84, bumps: .08 }) + T(RX + 42, 361, 'p97', { size: 17, col: '#c9d2e4', anchor: 'start', w: 700 }) + '</g>';
          if (kt > .01) er += `<path d="M${MX},${MY - 50} C${MX - 2},${MY - 120} ${RX},${MEM + MEMH + 50} ${RX},${MEM + MEMH} L${RX},256" pathLength="1" stroke="${C.chain}" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="${f1(kt)} 2"/>`;
          const ku = sub(p, .8, .9);
          [0, 1, 2].forEach(i => er += `<circle cx="${RX - 20 - i * 15}" cy="${362 - i * 9}" r="8" fill="#ffd166" stroke="#0a1224" stroke-width="1.5" opacity="${f1(ku)}"/>`);
          er += T(RX - 66, 336, T2('ubiquitine', 'ubiquitin'), { size: 16, col: '#ffd166', anchor: 'end', op: ku });
          er += T(RX - 34, MEM + MEMH + 34, 'retrotranslocon', { size: 17, col: C.danger, anchor: 'end', op: ke }) + T(RX + 18, MEM + MEMH + 80, 'ERAD', { size: 22, col: C.danger, anchor: 'start', w: 800, op: ke });
          er += T(RX + 50, 280, T2('proteasoom', 'proteasome'), { size: 21, col: '#2cc6a8', anchor: 'start', op: ke }) + T(RX + 50, 304, T2('breekt het eiwit af', 'breaks the protein down'), { size: 18, col: C.muted, anchor: 'start', op: ke });
          er += T(780, 790, T2('blijvend misgevouwen → terug naar het cytosol', 'permanently misfolded → back to the cytosol'), { size: 21, col: C.danger, anchor: 'start', op: sub(p, .6, .75) });
          er += `<rect x="770" y="755" width="560" height="50" fill="transparent"/>`;
        }
        $('gl-erad').innerHTML = er;
        $('gl-eradA').setAttribute('cx', 1050); $('gl-eradA').setAttribute('cy', step === 6 && p > .6 ? 760 : -9999);
        // labels per stap: welke kant van het ER-membraan is wat
        if (step <= 6) lb += T(SIDE[step][0], MEM - 35, 'cytosol', { size: 22, col: C.muted, anchor: 'start' }) + T(SIDE[step][1], MEM + MEMH + 44, T2('ER-lumen', 'ER lumen'), { size: 22, col: '#8fb3e8', anchor: 'start' });
        $('gl-er').setAttribute('opacity', f1(step === 7 ? 1 - ease(sub(p, 0, .2)) : 1));
        if (step === 0) lb += T(640, 800, T2('keten groeit het lumen in', 'chain grows into the lumen'), { size: 22, col: C.chain, op: sub(p, .3, .5) });
        if (step === 2) {
          const k = sub(p, .15, .35);
          lb += panel(1110, 440, 400, 330, { op: k });
          const rows = [['GlcNAc', '2 × GlcNAc'], ['Man', '9 × ' + T2('mannose', 'mannose')], ['Glc', '3 × glucose']];
          rows.forEach(([ty, s2], i) => lb += `<g opacity="${f1(k)}">${sugar(ty, 1155, 560 + i * 56, 14)}</g>` + T(1185, 567 + i * 56, s2, { size: 22, anchor: 'start', op: k }));
          lb += T(1310, 745, '= 14 ' + T2('suikers', 'sugars'), { size: 22, col: '#ffc247', op: k, w: 700 });
          lb += T(1310, 495, 'Glc₃Man₉GlcNAc₂', { size: 24, font: 'JetBrains Mono', w: 700, op: k });
        }
        if (step === 3) lb += T(asnX + 90, BY + 90, T2('N-glycosidische binding op Asn', 'N-glycosidic bond on Asn'), { size: 20, col: '#ffc247', op: sub(p, .7, .85), anchor: 'start' });
        $('gl-lbl').innerHTML = lb;

        /* ---------- Golgi ---------- */
        let gg = '';
        if (step === 7) {
          const k = ease(sub(p, .1, .5));
          gg += panel(1740, 370, 840, 400, { col: C.mem }) + T(1770, 410, T2('in het Golgi-lumen', 'in the Golgi lumen'), { size: 20, col: C.mem, anchor: 'start' });
          gg += foldedProt(1960, 540, false) + chain([[2030, 510], [2080, 500]], { w: 6 });
          // N-glycaan: Man8 → complex
          gg += glycan(2090, 500, -90, { glc: 0, man8: true }, 1 - k) + glycan(2090, 500, -90, { complex: true }, k);
          // O-glycaan op Ser/Thr
          const ko = sub(p, .55, .75);
          gg += chain([[2010, 600], [2050, 650]], { w: 6, op: ko }) + `<g opacity="${f1(ko)}">${sugar('GalNAc', 2058, 664, 12)}${sugar('Gal', 2086, 686, 11)}${sugar('Sia', 2116, 708, 11)}</g>`;
          gg += T(2140, 700, T2('O-glycaan: GalNAc op Ser/Thr', 'O-glycan: GalNAc on Ser/Thr'), { size: 20, col: SNFG.Gal, anchor: 'start', op: ko });
          gg += T(2330, 470, T2('complex N-glycaan', 'complex N-glycan'), { size: 22, col: C.text, anchor: 'start', op: k });
          gg += T(2330, 500, T2('(GlcNAc, Gal, Sia, Fuc)', '(GlcNAc, Gal, Sia, Fuc)'), { size: 18, col: C.muted, anchor: 'start', op: k });
          gg += T(2240, 270, T2('Golgi-stapel', 'Golgi stack'), { size: 26, col: C.mem, w: 700, anchor: 'start' });
        }
        $('gl-golgi').innerHTML = gg;
      },
    };
  },
};
