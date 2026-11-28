import { C, L, T2, svgOpen, cam, sub, ease, lerp, clamp, f1, CLASSCOL, AACLASS, THREE } from '../../kit.js';
import { T, TL, smooth, chain, enz, tag, arrowDefs, arr, panel, phos, lerpPts, blob } from './_b_kit.js';
import { helixLint } from '../../bio.js';

/* A (0–1600): geordend domein + IDR · B (1700–3300): sequentie + ladings-hydropathieplot · C (3400–5000): pKID–KIX · D (5100–6700): waarom */
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });
const IDC = '#7fdc6a';
const DOM = [520, 460];

/* deterministische "slierten": ensemble van conformaties */
function tail(x0, y0, seed, t, n = 14, step = 34, lo = -1.5, hi = 1.5) {
  const pts = [[x0, y0]]; let a = -.2, x = x0, y = y0;
  for (let i = 1; i <= n; i++) {
    a += .9 * Math.sin(seed * 1.7 + i * 1.3 + t * .0011 * (1 + (i % 3) * .3)) + .25 * Math.sin(t * .0023 + i * seed);
    a = clamp(a, lo, hi);
    x += Math.cos(a) * step; y += Math.sin(a) * step * .9;
    pts.push([x, y]);
  }
  return pts;
}

/* gevouwen domein in detail: α-helix (lint met voor/achterkant), antiparallel β-blad (pijlen + H-bruggen),
   lussen en een waterschuwe kern; keten loopt van N (links) door het domein naar de IDR (rechts) */
const HELIXC = C.prot, STRANDC = '#ffc247';
function helixRibbon(x0, y0, x1, y1, turns = 3.5, amp = 26) {
  const n = Math.round(turns * 24), pts = [];
  for (let i = 0; i <= n; i++) { const u = i / n, ph = u * turns * 2 * Math.PI; pts.push([x0 + (x1 - x0) * u, y0 + (y1 - y0) * u + Math.sin(ph) * amp, Math.cos(ph)]); }
  let back = '', front = '';
  for (let i = 0; i < n; i++) {
    const [ax, ay, c] = pts[i], [bx, by] = pts[i + 1], seg = `M${f1(ax)},${f1(ay)}L${f1(bx)},${f1(by)}`;
    if (c >= 0) front += seg; else back += seg;
  }
  return `<path d="${back}" stroke="${C.prot3}" stroke-width="9" stroke-linecap="round" fill="none"/>` +
    `<path d="${front}" stroke="#0a1224" stroke-width="17" stroke-linecap="round" fill="none"/><path d="${front}" stroke="${HELIXC}" stroke-width="13" stroke-linecap="round" fill="none"/>` +
    `<path d="${front}" stroke="#d8ccff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".7" transform="translate(0,-3)"/>`;
}
function strandArrow(x0, x1, y, h = 22) {
  const d = Math.sign(x1 - x0), xb = x1 - d * 26;
  return `<path d="M${x0},${y - h / 2} L${xb},${y - h / 2} L${xb},${y - h} L${x1},${y} L${xb},${y + h} L${xb},${y + h / 2} L${x0},${y + h / 2}Z" fill="${STRANDC}" stroke="#0a1224" stroke-width="3" stroke-linejoin="round"/>`;
}
function foldedDomain() {
  const [cx, cy] = DOM, loop = pts => chain(pts, { col: '#b9a8ff', w: 6 });
  let s = '';
  // lussen (achter de elementen): N-uiteinde → helix → blad → uitgang naar de IDR
  s += loop([[cx - 250, cy + 110], [cx - 200, cy + 60], [cx - 160, cy - 20], [cx - 120, cy - 75]]);           // N → begin helix
  s += loop([[cx + 70, cy - 75], [cx + 125, cy - 45], [cx + 112, cy - 8], [cx + 80, cy + 6]]);                 // helix → streng 1
  s += loop([[cx - 90, cy + 6], [cx - 125, cy + 25], [cx - 90, cy + 48]]);                                     // haarspeld 1
  s += loop([[cx + 80, cy + 48], [cx + 112, cy + 68], [cx + 80, cy + 90]]);                                    // haarspeld 2
  s += loop([[cx - 90, cy + 90], [cx - 50, cy + 122], [cx + 60, cy + 118], [cx + 120, cy + 60], [cx + 150, cy]]); // streng 3 → uitgang
  // waterschuwe zijketens in de kern (tussen helix en blad)
  [[-80, -20], [-40, -16], [0, -22], [40, -16], [75, -20]].forEach(([dx, dy]) => {
    s += `<line x1="${cx + dx}" y1="${cy + dy}" x2="${cx + dx + 4}" y2="${cy + dy - 9}" stroke="${CLASSCOL.h}" stroke-width="3"/><circle cx="${cx + dx + 4}" cy="${cy + dy - 11}" r="6" fill="${CLASSCOL.h}" stroke="#0a1224" stroke-width="1.5" opacity=".9"/>`;
  });
  // β-blad: drie antiparallelle strengen met H-bruggen
  for (let k = 0; k < 2; k++) for (let x = cx - 60; x <= cx + 50; x += 22) s += `<line x1="${x}" y1="${cy + 19 + k * 42}" x2="${x}" y2="${cy + 35 + k * 42}" stroke="#e8edf6" stroke-width="2" stroke-dasharray="3 3" opacity=".75"/>`;
  // richting N→C volgt de lussen: streng 1 ←, haarspeld links, streng 2 →, haarspeld rechts, streng 3 ←
  s += strandArrow(cx + 85, cx - 95, cy + 6) + strandArrow(cx - 90, cx + 85, cy + 48) + strandArrow(cx + 85, cx - 95, cy + 90);
  // α-helix bovenaan
  s += helixRibbon(cx - 120, cy - 75, cx + 70, cy - 75, 3.5, 22);
  // uiteinden + korte labels buiten het domein
  s += T(cx - 262, cy + 136, 'N', { size: 24, w: 800 });
  s += T(cx - 175, cy - 118, T2('spiraal', 'helix'), { size: 20, col: '#c9b8ff', w: 700, anchor: 'end' }) + `<line x1="${cx - 170}" y1="${cy - 112}" x2="${cx - 120}" y2="${cy - 90}" stroke="#c9b8ff" stroke-width="2"/>`;
  s += T(cx - 175, cy + 70, T2('strengen', 'strands'), { size: 20, col: STRANDC, w: 700, anchor: 'end' }) + `<line x1="${cx - 170}" y1="${cy + 58}" x2="${cx - 128}" y2="${cy + 50}" stroke="${STRANDC}" stroke-width="2"/>`;
  return s;
}
/* n punten op gelijke afstand langs een polylijn (kralen = residuen) */
function resample(P, n) {
  const cum = [0]; for (let i = 1; i < P.length; i++) cum.push(cum[i - 1] + Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]));
  const L = cum[cum.length - 1], out = []; let j = 0;
  for (let k = 0; k < n; k++) { const d = L * k / (n - 1); while (j < P.length - 2 && cum[j + 1] < d) j++; const u = (d - cum[j]) / ((cum[j + 1] - cum[j]) || 1); out.push([lerp(P[j][0], P[j + 1][0], u), lerp(P[j][1], P[j + 1][1], u)]); }
  return out;
}
const DIS_SEQ ='SPEKSGESPKQSEEPSKRGSDEQPK';   // zelfde illustratieve IDR-sequentie als in stap 3

export default {
  id: 'idp',
  title: { nl: 'Intrinsiek ongeordende eiwitten', en: 'Intrinsically disordered proteins' },
  scale: '≈ 2–20 nm',
  time: { nl: 'conformaties wisselen razendsnel (nanoseconden)', en: 'conformations interconvert very fast (nanoseconds)' },
  org: { nl: 'mens (voorbeeld: CREB en CBP; structuur 1KDX van muis/rat)', en: 'human (example: CREB and CBP; structure 1KDX from mouse/rat)' },
  legend: [[IDC, { nl: 'ongeordende regio (IDR)', en: 'disordered region (IDR)' }], [C.prot, { nl: 'geordend domein (KIX, MDM2)', en: 'ordered domain (KIX, MDM2)' }], [CLASSCOL.h, { nl: 'hydrofoob', en: 'hydrophobic' }], [CLASSCOL['+'], { nl: 'positief', en: 'positive' }], [CLASSCOL['-'], { nl: 'negatief', en: 'negative' }], [CLASSCOL.p, { nl: 'polair', en: 'polar' }], [CLASSCOL.s, 'Gly / Pro'], ['#ff6b6b', { nl: 'fosfaat', en: 'phosphate' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">3D: pKID van CREB (rat) gebonden aan het KIX-domein van CBP (muis), PDB <a href="https://www.rcsb.org/structure/1KDX" target="_blank" rel="noopener">1KDX</a> (NMR); p53-transactivatiedomein op MDM2, PDB <a href="https://www.rcsb.org/structure/1YCR" target="_blank" rel="noopener">1YCR</a>.</p><p style="font-size:13px;color:#93a0bb">Waarom matige affiniteit? Bij het binden verandert de entropie sterk (de keten verliest vrijheid), en IDP\'s binden vaak met hoge specificiteit maar matige affiniteit: het complex valt snel weer uiteen. Het p53-TAD is vrij nauwelijks helix, bindt MDM2 als helix en bindt ook andere partners zoals CBP. ~1/3 van de eukaryote eiwitten heeft een ongeordende regio van > 30 aa, bij bacteriën ~4 %.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">3D: pKID of CREB (rat) bound to the KIX domain of CBP (mouse), PDB <a href="https://www.rcsb.org/structure/1KDX" target="_blank" rel="noopener">1KDX</a> (NMR); p53 transactivation domain on MDM2, PDB <a href="https://www.rcsb.org/structure/1YCR" target="_blank" rel="noopener">1YCR</a>.</p><p style="font-size:13px;color:#93a0bb">Why moderate affinity? Binding changes the entropy strongly (the chain loses freedom), and IDPs often bind with high specificity but modest affinity: the complex quickly falls apart again. The p53 TAD has very little helix when free, binds MDM2 as a helix and also binds other partners such as CBP. ~1/3 of eukaryotic proteins has a disordered region of > 30 aa, in bacteria ~4 %.</p>' },
  simplified: {
    nl: 'De getoonde sequenties zijn illustratief, niet de echte CREB-sequentie. Het ensemble is een 2D-animatie; in werkelijkheid is een IDR een snel wisselende 3D-wolk van conformaties. KIX is als een bol getekend, pKID vormt in werkelijkheid twee helices (αA en αB) die rond KIX wikkelen. In de ladings-hydropathieplot zijn de naamloze punten schematisch; prothymosine α en lysozym (kippenei-wit) staan op hun berekende plaats (gemiddelde Kyte-Doolittle-hydropathie, genormaliseerd 0–1, zonder venster; netto lading / lengte). De grenslijn volgt Uversky et al. (2000): ⟨H⟩ = (⟨R⟩ + 1,151) / 2,785.',
    en: 'The sequences shown are illustrative, not the real CREB sequence. The ensemble is a 2D animation; in reality an IDR is a rapidly changing 3D cloud of conformations. KIX is drawn as a sphere; in reality pKID forms two helices (αA and αB) that wrap around KIX. In the charge–hydropathy plot the unnamed points are schematic; prothymosin α and (hen egg-white) lysozyme are at their computed positions (mean Kyte–Doolittle hydropathy normalised to 0–1, no window; net charge / length). The boundary follows Uversky et al. (2000): ⟨H⟩ = (⟨R⟩ + 1.151) / 2.785.' },
  /* "Wat zie je?" (zijpaneel): elk onderdeel van de figuur in één zin — d = eenvoudig, p = vaktaal (hoger) */
  parts: [
    { c: C.prot, t: { nl: 'geordend domein', en: 'ordered domain' }, m: ['gevouwen domein', 'folded domain', 'Geordend domein (tertiaire structuur)', 'Ordered domain (tertiary structure)'], d: { nl: 'Een stuk van het eiwit met een vaste, opgevouwen vorm.', en: 'A part of the protein with a fixed, folded shape.' },
      p: { nl: 'Gevouwen domein met stabiele tertiaire structuur (secundaire elementen rond een hydrofobe kern).', en: 'Folded domain with a stable tertiary structure (secondary elements around a hydrophobic core).' } },
    { c: HELIXC, t: { nl: 'spiraal', en: 'helix' }, d: { nl: 'Een stuk keten dat als een spiraal is opgerold.', en: 'A part of the chain coiled up like a spiral.' },
      p: { nl: 'α-helix, gestabiliseerd door waterstofbruggen tussen residu i en i+4.', en: 'α-Helix, stabilised by hydrogen bonds between residues i and i+4.' } },
    { c: STRANDC, t: { nl: 'strengen', en: 'strands' }, d: { nl: 'De gele pijlen: rechte stukken keten die naast elkaar liggen en zo een plat blad vormen.', en: 'The yellow arrows: straight stretches of chain lying side by side to form a flat sheet.' },
      p: { nl: 'Antiparallelle β-strengen van een β-blad, verbonden door waterstofbruggen (stippellijnen) en haarspeldlussen.', en: 'Antiparallel β-strands of a β-sheet, linked by hydrogen bonds (dotted lines) and hairpin loops.' } },
    { c: CLASSCOL.h, t: { nl: 'waterschuwe kern', en: 'water-avoiding core' }, d: { nl: 'De kleine bolletjes tussen spiraal en blad: waterschuwe zijketens die zich binnenin verstoppen. Ze houden de vorm bij elkaar.', en: 'The small dots between helix and sheet: water-avoiding side chains hidden inside. They hold the shape together.' },
      p: { nl: 'Hydrofobe kern; het begraven van apolaire zijketens is een drijvende kracht achter de vouwing.', en: 'Hydrophobic core; burial of non-polar side chains is a driving force of folding.' } },
    { c: C.text, t: 'N', m: ['C'], d: { nl: 'Het begin (N) en het einde (C) van de eiwitketen.', en: 'The start (N) and the end (C) of the protein chain.' },
      p: { nl: 'N- en C-terminus van de polypeptideketen.', en: 'N- and C-terminus of the polypeptide chain.' } },
    { c: IDC, t: { nl: 'ongeordende regio', en: 'disordered region' }, m: ['ongeordende regio (IDR)', 'disordered region (IDR)', 'vage lijnen: dezelfde keten,', 'faint lines: the same chain,', 'telkens een tel later', 'a moment later each time', 'in een 3D-model:', 'in a 3D model:', 'hier geen vaste vorm', 'no fixed shape here'],
      d: { nl: 'Een stuk keten zonder vaste vorm: het zwiept voortdurend heen en weer. De vage lijnen tonen dezelfde keten op verschillende momenten.', en: 'A stretch of chain without a fixed shape: it keeps flailing back and forth. The faint lines show the same chain at different moments.' },
      p: { nl: 'Intrinsiek ongeordende regio (IDR): een dynamisch ensemble van snel wisselende conformaties zonder stabiele tertiaire structuur.', en: 'Intrinsically disordered region (IDR): a dynamic ensemble of rapidly interconverting conformations without stable tertiary structure.' } },
    { c: CLASSCOL.p, t: { nl: 'aminozuurvolgorde', en: 'amino acid sequence' }, m: ['M', 'K', 'V', 'L', 'I', 'A', 'F', 'G', 'W', 'D', 'R', 'T', 'Y', 'P', 'E', 'S', 'Q', '(illustratieve sequenties)', '(illustrative sequences)', 'boven: 14 van 25 waterschuw · onder: 0 waterschuw, 11 geladen', 'top: 14 of 25 water-avoiding · bottom: 0 water-avoiding, 11 charged', 'vooral geladen en polaire aminozuren', 'mostly charged and polar amino acids'],
      d: { nl: 'Twee rijen letters, elk een bouwsteen in zijn kleur. Boven een stuk dat vouwt (veel waterschuwe), onder een ongeordend stuk (veel geladen). Het zijn voorbeelden.', en: 'Two rows of letters, each a building block in its colour. On top a part that folds (many water-avoiding), below a disordered part (many charged). They are examples.' },
      p: { nl: 'Illustratieve sequenties in éénlettercode; IDR’s zijn verrijkt in geladen en polaire residuen en arm aan hydrofobe residuen.', en: 'Illustrative sequences in one-letter code; IDRs are enriched in charged and polar residues and depleted in hydrophobic residues.' } },
    { c: '#c9d2e4', t: { nl: 'grafiek: lading en waterschuwheid', en: 'plot: charge and water avoidance' }, m: ['meer waterschuw →', 'more water-avoiding →', '↑ meer lading', '↑ more charge', 'ongeordend', 'disordered', 'gevouwen', 'folded', '← één eiwit', '← one protein'],
      d: { nl: 'Elk bolletje is één eiwit. Veel lading en weinig waterschuwe bouwstenen: ongeordend (links boven). Andersom: gevouwen.', en: 'Each dot is one protein. Lots of charge and few water-avoiding building blocks: disordered (top left). The other way round: folded.' },
      p: { nl: 'Ladings-hydropathieplot (Uversky 2000): gemiddelde netto lading tegen genormaliseerde Kyte-Doolittle-hydropathie, met een lineaire grens tussen beide klassen.', en: 'Charge–hydropathy plot (Uversky 2000): mean net charge versus normalised Kyte–Doolittle hydropathy, with a linear boundary between the two classes.' } },
    { c: IDC, t: { nl: 'prothymosine α', en: 'prothymosin α' }, d: { nl: 'Een eiwit dat bijna helemaal ongeordend is.', en: 'A protein that is almost entirely disordered.' },
      p: { nl: 'Sterk zuur, vrijwel volledig ongeordend eiwit; ligt diep in het ongeordende gebied van de plot.', en: 'Highly acidic, almost fully disordered protein; lies deep in the disordered region of the plot.' } },
    { c: C.prot, t: { nl: 'lysozym', en: 'lysozyme' }, d: { nl: 'Een klassiek eiwit met een vaste, gevouwen vorm.', en: 'A classic protein with a fixed, folded shape.' },
      p: { nl: 'Lysozym (kippenei-wit), een compact globulair eiwit; valt in het gevouwen gebied.', en: 'Lysozyme (hen egg-white), a compact globular protein; falls in the folded region.' } },
    { c: '#c9b8ff', t: { nl: 'KIX-domein (CBP)', en: 'KIX domain (CBP)' }, d: { nl: 'Een gevouwen stuk van een helper-eiwit (CBP) dat genen helpt aanzetten. Het is de partner van het ongeordende stuk.', en: 'A folded part of a helper protein (CBP) that helps switch genes on. It is the partner of the disordered stretch.' },
      p: { nl: 'KIX-domein van de coactivator CBP; bindingsplaats voor het gefosforyleerde KID van CREB.', en: 'KIX domain of the coactivator CBP; binding site for the phosphorylated KID of CREB.' } },
    { c: IDC, t: { nl: 'KID van CREB: ongeordend', en: 'KID of CREB: disordered' }, m: ['pKID'], d: { nl: 'Het ongeordende stuk van een eiwit dat genen aanzet (CREB). Met een fosfaatlabel heet het pKID.', en: 'The disordered stretch of a protein that switches genes on (CREB). With a phosphate tag it is called pKID.' },
      p: { nl: 'Kinase-induceerbaar domein van CREB; ongeordend in vrije toestand, na fosforylering (pKID) gekoppeld vouwen en binden.', en: 'Kinase-inducible domain of CREB; disordered when free, coupled folding and binding after phosphorylation (pKID).' } },
    { c: C.prot, t: 'PKA', m: ['ATP → ADP'], d: { nl: 'Een enzym dat een fosfaatlabel op het ongeordende stuk zet. Het haalt dat fosfaat van ATP, dat daardoor ADP wordt.', en: 'An enzyme that puts a phosphate tag on the disordered stretch. It takes that phosphate from ATP, which then becomes ADP.' },
      p: { nl: 'Proteïnekinase A (cAMP-afhankelijk); fosforyleert Ser133 van CREB met ATP als fosfaatdonor.', en: 'Protein kinase A (cAMP-dependent); phosphorylates Ser133 of CREB using ATP as phosphate donor.' } },
    { c: '#ff6b6b', t: 'Ser133-P', d: { nl: 'Het fosfaatlabel op bouwsteen 133 (een serine). Pas daarmee bindt het ongeordende stuk zijn partner.', en: 'The phosphate tag on building block 133 (a serine). Only with it does the disordered stretch bind its partner.' },
      p: { nl: 'Fosfoserine 133; de fosforylering verhoogt de affiniteit van KID voor KIX sterk.', en: 'Phosphoserine 133; phosphorylation strongly increases the affinity of KID for KIX.' } },
    { c: IDC, t: { nl: 'binden en vouwen', en: 'binding and folding' }, m: ['1. ontmoetingscomplex: los, niet-specifiek', '1. encounter complex: loose, non-specific', '2. gevouwen: twee helices (αA, αB)', '2. folded: two helices (αA, αB)'], d: { nl: 'Eerst kleeft het ongeordende stuk los tegen de partner, daarna vouwt het zich er pas echt omheen tot twee spiralen.', en: 'First the disordered stretch sticks loosely to the partner, then it really folds around it into two helices.' },
      p: { nl: 'Gekoppeld vouwen en binden: eerst een los ontmoetingscomplex, daarna vouwing tot de helices αA en αB rond KIX.', en: 'Coupled folding and binding: first a loose encounter complex, then folding into helices αA and αB around KIX.' } },
    { c: C.ok, t: { nl: 'CBP gerekruteerd', en: 'CBP recruited' }, m: ['→ CBP wordt gerekruteerd: CREB-doelgenen aan', '→ CBP is recruited: CREB target genes on'], d: { nl: 'Zodra de twee vastzitten, gaan de genen die CREB regelt aan.', en: 'Once the two are joined, the genes that CREB controls switch on.' },
      p: { nl: 'Rekrutering van de coactivator CBP activeert transcriptie van CREB-doelgenen.', en: 'Recruitment of the coactivator CBP activates transcription of CREB target genes.' } },
    { c: C.prot, t: { nl: 'Specifiek maar omkeerbaar', en: 'Specific but reversible' }, m: ['hoge specificiteit, matige affiniteit', 'high specificity, modest affinity'], d: { nl: 'Een ongeordend stuk bindt precies de juiste partner, maar laat ook makkelijk weer los. Handig voor signalen die aan en uit moeten.', en: 'A disordered stretch binds exactly the right partner but also lets go easily. Useful for signals that must switch on and off.' },
      p: { nl: 'Het vouwen bij binding kost entropie, wat hoge specificiteit combineert met matige affiniteit en snelle dissociatie.', en: 'Folding on binding costs entropy, which combines high specificity with modest affinity and fast dissociation.' } },
    { c: '#5fd3e6', t: { nl: 'Eén regio, veel partners', en: 'One region, many partners' }, m: ['p53-TAD: MDM2 en andere', 'p53 TAD: MDM2 and others'], d: { nl: 'Hetzelfde ongeordende stuk kan zich aan verschillende partners aanpassen.', en: 'The same disordered stretch can adapt to different partners.' },
      p: { nl: 'Promiscue binding: het transactivatiedomein van p53 bindt o.a. MDM2 en andere partners, telkens in een andere conformatie.', en: 'Promiscuous binding: the p53 transactivation domain binds MDM2 and other partners, each time in a different conformation.' } },
    { c: '#ff6b6b', t: { nl: 'Bereikbaar voor PTM\'s', en: 'Accessible to PTMs' }, m: ['bv. Ser133 van CREB', 'e.g. Ser133 of CREB'], d: { nl: 'Omdat het stuk open ligt, kunnen enzymen er makkelijk labels (zoals fosfaat) op zetten.', en: 'Because the stretch lies open, enzymes can easily put tags (such as phosphate) on it.' },
      p: { nl: 'Ongeordende regio’s zijn goed toegankelijk en verrijkt in plaatsen voor post-translationele modificaties.', en: 'Disordered regions are highly accessible and enriched in sites for post-translational modifications.' } },
    { c: C.chain, t: { nl: 'Hoe vaak? (IDR > 30 aa)', en: 'How common? (IDR > 30 aa)' }, m: ['eukaryoten ~1/3 · bacteriën ~4 %', 'eukaryotes ~1/3 · bacteria ~4 %'], d: { nl: 'Ongeveer een derde van de eiwitten van planten, dieren en schimmels heeft een lang ongeordend stuk; bij bacteriën veel minder.', en: 'About a third of the proteins of plants, animals and fungi have a long disordered stretch; in bacteria far fewer.' },
      p: { nl: 'Fractie eiwitten met een ongeordende regio van meer dan 30 residuen: ~1/3 in eukaryoten, ~4 % in bacteriën.', en: 'Fraction of proteins with a disordered region longer than 30 residues: ~1/3 in eukaryotes, ~4 % in bacteria.' } },
    { c: '#ffc247', t: { nl: 'Waar?', en: 'Where?' }, m: ['TF\'s, signaaleiwitten, linkers', 'TFs, signalling proteins, linkers'], d: { nl: 'Vooral in eiwitten die genen regelen, in signaaleiwitten en in de verbindingsstukken tussen gevouwen delen.', en: 'Mainly in proteins that control genes, in signalling proteins and in the linking pieces between folded parts.' },
      p: { nl: 'Verrijkt in transcriptiefactoren, signaaleiwitten en interdomeinlinkers.', en: 'Enriched in transcription factors, signalling proteins and interdomain linkers.' } },
    { c: C.danger, t: { nl: 'Keerzijde: aggregatie', en: 'Downside: aggregation' }, m: ['Aβ, α-synucleïne → amyloïd', 'Aβ, α-synuclein → amyloid'], d: { nl: 'Sommige ongeordende eiwitten kunnen samenklonteren tot lange vezels, zoals bij de ziektes van Alzheimer en Parkinson.', en: 'Some disordered proteins can clump together into long fibres, as in Alzheimer’s and Parkinson’s disease.' },
      p: { nl: 'Ongeordende eiwitten zoals Aβ en α-synucleïne kunnen aggregeren tot amyloïdfibrillen.', en: 'Disordered proteins such as Aβ and α-synuclein can aggregate into amyloid fibrils.' } },
  ],
  steps: [
    ST(8000, cam(800, 450, 1600), 'Niet elk eiwit heeft één vaste vorm', 'Not every protein has one fixed shape',
      'Veel eiwitten hebben stukken zonder vaste vorm: ongeordende stukken. Soms is het hele eiwit zo.',
      'Many proteins have parts without a fixed shape: disordered regions. Sometimes the whole protein is like that.'),
    ST(8000, cam(900, 450, 1300), 'Altijd in beweging', 'Always on the move',
      'Zo’n stuk wisselt steeds van vorm. Een 3D-model toont er daarom geen of een onzekere structuur.',
      'Such a part keeps changing shape. A 3D model therefore shows no structure there, or an uncertain one.'),
    ST(8500, cam(2440, 250, 1550), 'Een andere volgorde', 'A different sequence',
      'Ze hebben weinig waterschuwe en veel geladen aminozuren. Zonder waterschuwe kern valt er niets te vouwen.',
      'They have few water-avoiding and many charged amino acids. Without a water-avoiding core, there is nothing to fold around.'),
    ST(8500, cam(2500, 560, 1300), 'Lading tegenover waterschuwheid', 'Charge versus water-avoidance',
      'In deze grafiek liggen ongeordende eiwitten links boven de lijn: veel lading, weinig waterschuw.',
      'In this graph, disordered proteins lie above-left of the line: much charge, little water-avoidance.'),
    ST(8000, cam(4000, 450, 1300), 'Een signaal: fosfaat erop', 'A signal: phosphate added',
      'Een stuk van het eiwit CREB is ongeordend. Na een signaal hangt een enzym er een fosfaat aan.',
      'Part of the protein CREB is disordered. After a signal, an enzyme attaches a phosphate to it.'),
    ST(9500, cam(4200, 450, 1200), 'Vouwen tijdens het binden', 'Folding upon binding',
      'Dat stuk bindt eerst losjes aan een partnereiwit en vouwt dan op dat oppervlak tot twee spiralen.',
      'That part first binds loosely to a partner protein, then folds on its surface into two spirals.'),
    ST(9000, cam(5900, 460, 1650), 'Waarom ongeordend handig is', 'Why disorder is useful',
      'Zo’n binding is precies, maar snel weer los. Eén stuk kan meerdere partners binden en is vlot aan te passen.',
      'Such binding is specific but quickly undone. One part can bind several partners and is easy to modify.'),
    ST(8000, cam(5900, 460, 1650), 'Signalen en ziekte', 'Signals and disease',
      'Vooral signaaleiwitten hebben veel ongeordende stukken. Sommige kunnen misvouwen tot klonten (amyloïd).',
      'Signalling proteins in particular have many disordered parts. Some can misfold into clumps (amyloid).'),
  ],
  svg() {
    /* paneel B: sequentiebalken */
    const ORD = 'MKVLIAFGWLDRCTYPEVLNAIFKW', DIS = 'SPEKSGESPKQSEEPSKRGSDEQPK';
    const seqRow = (seq, y, lab, col) => T(1760, y + 8, lab, { size: 24, col, anchor: 'start', w: 700 }) +
      seq.split('').map((a, i) => `<circle cx="${2140 + i * 44}" cy="${y}" r="19" fill="${CLASSCOL[AACLASS[a]]}" stroke="#0a1224" stroke-width="2"/>` + T(2140 + i * 44, y + 6, a, { size: 16, col: '#0a1224', halo: false, w: 800, font: 'JetBrains Mono' })).join('');
    let seqB = seqRow(ORD, 200, T2('geordend domein', 'ordered domain'), C.prot) + seqRow(DIS, 290, T2('ongeordende regio', 'disordered region'), IDC);
    seqB += T(2690, 362, T2('(illustratieve sequenties)', '(illustrative sequences)'), { size: 21, col: C.muted });
    /* paneel B-onder: ladings-hydropathieplot (Uversky 2000) */
    const PX = 2060, PY = 820, PW = 620, PH = 330;             // <H> 0..1 (x), <R> 0..0.5 (y)
    const px = h => PX + (h - .2) / .4 * PW, py = r => PY - r / .5 * PH; // x-bereik 0,2–0,6
    // assen in gewone taal
    let plot = `<line x1="${PX}" y1="${PY}" x2="${PX + PW + 20}" y2="${PY}" stroke="${C.muted}" stroke-width="3" marker-end="url(#id-m)"/><line x1="${PX}" y1="${PY}" x2="${PX}" y2="${PY - PH - 20}" stroke="${C.muted}" stroke-width="3" marker-end="url(#id-m)"/>`;
    plot += T(PX + PW + 30, PY + 44, T2('meer waterschuw →', 'more water-avoiding →'), { size: 22, col: '#c9d2e4', anchor: 'end' });
    plot += T(PX + 14, PY - PH - 30, T2('↑ meer lading', '↑ more charge'), { size: 22, col: '#c9d2e4', anchor: 'start' });
    // grenslijn (Uversky 2000: ⟨H⟩ = (⟨R⟩ + 1,151) / 2,785 → R = 2,785 H − 1,151), met de twee kanten ingekleurd
    const hA = 1.151 / 2.785, hT = (.5 + 1.151) / 2.785;
    let zones = `<path d="M${PX},${PY} L${f1(px(hA))},${PY} L${f1(px(hT))},${f1(py(.5))} L${PX},${f1(py(.5))}Z" fill="${IDC}" fill-opacity=".08"/>` +
      `<path d="M${f1(px(hA))},${PY} L${PX + PW},${PY} L${PX + PW},${f1(py(.5))} L${f1(px(hT))},${f1(py(.5))}Z" fill="${C.prot}" fill-opacity=".1"/>` +
      `<line x1="${f1(px(hA))}" y1="${PY}" x2="${f1(px(hT))}" y2="${f1(py(.5))}" stroke="#fff" stroke-width="3" stroke-dasharray="10 6"/>` +
      T(px(.29), py(.47), T2('ongeordend', 'disordered'), { size: 24, col: IDC, w: 800 }) + T(px(.53), py(.25), T2('gevouwen', 'folded'), { size: 24, col: C.prot, w: 800 });
    // eerst één punt (= één eiwit), dan de rest
    const P = [[.33, .18], [.38, .34], [.28, .12], [.39, .22], [.25, .2]], Q = [[.47, .05], [.5, .1], [.46, .02], [.52, .07], [.49, .15], [.54, .04]];
    const one = `<circle cx="${f1(px(.24))}" cy="${f1(py(.30))}" r="11" fill="${IDC}" stroke="#fff" stroke-width="2"/>` +
      T(px(.24) + 20, py(.30) + 8, T2('← één eiwit', '← one protein'), { size: 22, anchor: 'start', col: '#fff', w: 700 });
    let rest = '';
    P.forEach(([h, r]) => rest += `<circle cx="${f1(px(h))}" cy="${f1(py(r))}" r="10" fill="${IDC}"/>`);
    Q.forEach(([h, r]) => rest += `<circle cx="${f1(px(h))}" cy="${f1(py(r))}" r="10" fill="${C.prot}"/>`);
    // twee bekende eiwitten (posities berekend uit hun sequentie: Kyte-Doolittle, genormaliseerd; |netto lading| / lengte)
    const named = `<circle cx="${f1(px(.281))}" cy="${f1(py(.396))}" r="12" fill="${IDC}" stroke="#fff" stroke-width="3"/>` + T(px(.281) + 20, py(.396) + 7, T2('prothymosine α', 'prothymosin α'), { size: 21, anchor: 'start', w: 700 }) +
      `<circle cx="${f1(px(.448))}" cy="${f1(py(.062))}" r="12" fill="${C.prot}" stroke="#fff" stroke-width="3"/><path d="M${f1(px(.448) + 12)},${f1(py(.062) - 6)} L${f1(px(.58))},${f1(py(.16))}" stroke="#fff" stroke-width="2"/>` + T(px(.58) + 6, py(.16) - 4, T2('lysozym', 'lysozyme'), { size: 21, anchor: 'start', w: 700 });
    plot = `<g id="id-zones">${zones}</g>` + plot + `<g id="id-one">${one}</g><g id="id-rest">${rest}</g><g id="id-named">${named}</g>`;

    /* paneel D: kaarten (rij 1 = stap 6, rij 2 verschijnt in stap 7) */
    const card = (x0, y0, title, line, col, node, lbl) => {
      const b = panel(x0, y0, 500, 220, { col }) + T(x0 + 250, y0 + 82, title, { size: 31, col, w: 800 }) + T(x0 + 250, y0 + 150, line, { size: 26, col: '#c9d2e4', w: 500 });
      return node ? `<g data-node="${node}" data-color="${col}" data-label="${lbl}">${b}<circle data-anchor="${node}" cx="${x0 + 250}" cy="${y0 + 2}" r="1" fill="none"/></g>` : b;
    };
    let row1 = '', row2 = '';
    row1 += card(5140, 190, T2('Specifiek maar omkeerbaar', 'Specific but reversible'), T2('hoge specificiteit, matige affiniteit', 'high specificity, modest affinity'), C.prot, null);
    row1 += card(5680, 190, T2('Eén regio, veel partners', 'One region, many partners'), T2('p53-TAD: MDM2 en andere', 'p53 TAD: MDM2 and others'), '#5fd3e6', 'genregulatie', T2('Genregulatie', 'Gene regulation'));
    row1 += card(6220, 190, T2('Bereikbaar voor PTM\'s', 'Accessible to PTMs'), T2('bv. Ser133 van CREB', 'e.g. Ser133 of CREB'), '#ff6b6b', 'ptm', T2('Post-translationele modificaties', 'Post-translational modifications'));
    row2 += card(5140, 510, T2('Hoe vaak? (IDR > 30 aa)', 'How common? (IDR > 30 aa)'), T2('eukaryoten ~1/3 · bacteriën ~4 %', 'eukaryotes ~1/3 · bacteria ~4 %'), C.chain, 'vouwing', T2('Eiwitvouwing', 'Protein folding'));
    row2 += card(5680, 510, T2('Waar?', 'Where?'), T2('TF\'s, signaaleiwitten, linkers', 'TFs, signalling proteins, linkers'), '#ffc247', null);
    row2 += card(6220, 510, T2('Keerzijde: aggregatie', 'Downside: aggregation'), T2('Aβ, α-synucleïne → amyloïd', 'Aβ, α-synuclein → amyloid'), C.danger, 'misvouwing', T2('Misvouwing & aggregatie', 'Misfolding & aggregation'));
    const cards = `<g id="id-row1">${row1}</g><g id="id-row2" opacity="0">${row2}</g>`;

    return svgOpen(arrowDefs('id', { m: C.muted, w: '#fff' })) + `
    <g data-node="tertiair" data-color="${C.prot}" data-label="${T2('Geordend domein (tertiaire structuur)', 'Ordered domain (tertiary structure)')}">
      ${blob(DOM[0], DOM[1], 155, 128, { fill: 'rgba(155,123,255,.12)', stroke: C.prot, sw: 3, seed: 108 })}
      ${foldedDomain()}
      <circle data-anchor="tertiair" cx="${DOM[0]}" cy="${DOM[1] - 125}" r="1" fill="none"/>
    </g>
    <g id="id-tail"></g>
    <g id="id-a"></g>
    <g id="id-seqB" data-node="primair" data-color="${C.chain}" data-nolabel>${seqB}</g>
    <g id="id-seq"></g>
    <g id="id-plot">${plot}</g>
    <g id="id-c"></g>
    <g data-node="gpcr" data-color="${C.prot}" data-nolabel><g id="id-pka"></g></g>
    ${cards}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const KIX = [4300, 470];
    // KIX = bundel van drie α-helices (PDB 1KDX); pKID wikkelt zijn twee helices over het oppervlak bovenaan/rechts
    // helix als cilinder (gangbare cartoonconventie) met schuine strepen voor de windingen
    const cyl = (x0, y0, x1, y1) => {
      const L0 = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / L0, uy = (y1 - y0) / L0; let st = '';
      for (let d = 14; d < L0 - 10; d += 16) { const x = x0 + ux * d, y = y0 + uy * d; st += `M${f1(x - uy * 11 - ux * 5)},${f1(y + ux * 11 - uy * 5)}L${f1(x + uy * 11 + ux * 5)},${f1(y - ux * 11 + uy * 5)}`; }
      return `<line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="#0a1224" stroke-width="30" stroke-linecap="round"/><line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y1}" stroke="#7d66e0" stroke-width="26" stroke-linecap="round"/>` +
        `<path d="${st}" stroke="#c9b8ff" stroke-width="3" opacity=".8"/><line x1="${f1(x0 - uy * 5)}" y1="${f1(y0 + ux * 5 - 5)}" x2="${f1(x1 - uy * 5)}" y2="${f1(y1 + ux * 5 - 5)}" stroke="#fff" stroke-width="3" opacity=".25" stroke-linecap="round"/>`;
    };
    const KIXFOLD = `<path d="M4205,412 Q4165,425 4185,452 M4235,565 Q4268,595 4290,560" stroke="#c9b8ff" stroke-width="5" fill="none" stroke-linecap="round"/>` +
      cyl(4340, 398, 4205, 412) + cyl(4185, 452, 4235, 565) + cyl(4290, 560, 4395, 440) +
      T(4272, 391, 'α1', { size: 18, col: '#e2dbff', w: 800 }) + T(4170, 515, 'α2', { size: 18, col: '#e2dbff', w: 800, anchor: 'end' }) + T(4360, 530, 'α3', { size: 18, col: '#e2dbff', w: 800, anchor: 'start' });
    // pKID-helices op KIX (gebonden), en ongebonden sliert
    const helixPts = (x0, y0, x1, y1, amp = 13, turns = 5) => { const pts = [], n = turns * 8, dx = x1 - x0, dy = y1 - y0, L0 = Math.hypot(dx, dy), nx = -dy / L0, ny = dx / L0; for (let i = 0; i <= n; i++) { const u = i / n, s = Math.sin(u * turns * 2 * Math.PI) * amp; pts.push([x0 + dx * u + nx * s, y0 + dy * u + ny * s]); } return pts; };
    const bound = [...helixPts(4140, 340, 4320, 335), ...helixPts(4350, 345, 4465, 480, 13, 4).slice(1)];
    return {
      update(t, s) {
        const { step, p } = s;
        /* ---------- paneel A: IDR als ensemble ---------- */
        let tl = '', a = '';
        if (step <= 1) {
          const n = step === 1 ? 6 : 1;
          for (let k = 0; k < n; k++) {
            if (k === 0) continue;
            tl += chain(tail(DOM[0] + 150, DOM[1], 1 + k * .9, t + k * 700, 14, 34, -.55, 1.2), { col: IDC, w: 5, op: .28 });
          }
          // hoofdketen: één kraal per aminozuur (kleur = soort), 25 residuen zoals de sequentie in stap 3
          const main = resample(tail(DOM[0] + 150, DOM[1], 1, t, 14, 34, -.55, 1.2), 26);
          tl += chain(main, { col: IDC, w: 6 });
          main.slice(1).forEach(([x, y], i) => { tl += `<circle cx="${f1(x)}" cy="${f1(y)}" r="9" fill="${CLASSCOL[AACLASS[DIS_SEQ[i]]]}" stroke="#0a1224" stroke-width="2"/>`; });
          const end = main[main.length - 1];
          tl += T(end[0] + 26, end[1] + 8, 'C', { size: 24, w: 800, anchor: 'start' });
          a += T(DOM[0], DOM[1] + 185, T2('gevouwen domein', 'folded domain'), { size: 22, col: C.prot });
          a += T(1100, 250, T2('ongeordende regio (IDR)', 'disordered region (IDR)'), { size: 22, col: IDC });
          a += T(1100, 280, T2('vooral geladen en polaire aminozuren', 'mostly charged and polar amino acids'), { size: 21, col: '#c9d2e4' });
          if (step === 1) {
            const k = sub(p, .4, .6);
            a += T(1080, 690, T2('vage lijnen: dezelfde keten,', 'faint lines: the same chain,'), { size: 22, col: '#c9d2e4', op: sub(p, .15, .3), anchor: 'start' }) +
              T(1080, 720, T2('telkens een tel later', 'a moment later each time'), { size: 22, col: '#c9d2e4', op: sub(p, .15, .3), anchor: 'start' });
            a += panel(1060, 100, 480, 110, { op: k }) + T(1300, 145, T2('in een 3D-model:', 'in a 3D model:'), { size: 20, col: C.muted, op: k }) +
              T(1300, 185, T2('hier geen vaste vorm', 'no fixed shape here'), { size: 24, op: k, w: 700 });
          }
        }
        $('id-tail').innerHTML = tl; $('id-a').innerHTML = a;

        /* ---------- paneel B: telling ---------- */
        let sq = '';
        if (step === 2) {
          const k = sub(p, .35, .6);
          sq += T(2690, 410, T2('boven: 14 van 25 waterschuw · onder: 0 waterschuw, 11 geladen', 'top: 14 of 25 water-avoiding · bottom: 0 water-avoiding, 11 charged'), { size: 22, op: k });
        }
        $('id-seq').innerHTML = sq;
        $('id-plot').setAttribute('opacity', step === 2 ? '0' : step === 3 ? f1(sub(p, 0, .15)) : '1');   // grafiek pas in stap 4 (niet half afgesneden onder de reeksen)
        // opbouw: assen → één punt (= één eiwit) → de andere punten → grenslijn met de twee kanten → twee bekende eiwitten
        const pk = (a, b) => step === 3 ? f1(ease(sub(p, a, b))) : '1';
        $('id-one').setAttribute('opacity', pk(.08, .2));
        $('id-rest').setAttribute('opacity', pk(.3, .45));
        $('id-zones').setAttribute('opacity', pk(.5, .65));
        $('id-named').setAttribute('opacity', pk(.72, .86));
        $('id-seqB').setAttribute('opacity', step <= 2 ? '1' : step === 3 ? f1(1 - sub(p, 0, .06)) : '0');

        /* ---------- paneel C: CREB-KID + KIX ---------- */
        let c = '', pka = '';
        if (step >= 4 && step <= 5) {
          c += enz(KIX[0] + 20, KIX[1] - 15, 150, 125, '', { col: C.prot, fillOp: .25 }) + KIXFOLD + T(KIX[0] + 20, KIX[1] + 150, T2('KIX-domein (CBP)', 'KIX domain (CBP)'), { size: 24, col: '#c9b8ff', w: 700 });
          const phK = step === 4 ? sub(p, .45, .7) : 1;
          const bind = step === 5 ? ease(sub(p, .05, .4)) : 0, fold = step === 5 ? ease(sub(p, .45, .85)) : 0;
          // ongebonden sliert
          const free = tail(3620, 330, 2.3, t, 14, 30);
          const target = bound.length;
          // interpoleer vrij → los (dicht bij KIX) → gevouwen
          const near = bound.map((q, i) => [q[0] + 30 * Math.sin(i * .9 + t * .002), q[1] - 40 + 25 * Math.cos(i * .7 + t * .0017)]);
          const freeR = Array.from({ length: target }, (_, i) => free[Math.round(i / (target - 1) * (free.length - 1))]);
          const mid = lerpPts(freeR, near, bind), pts = lerpPts(mid, bound, fold);
          c += chain(pts, { col: IDC, w: 8 });
          // Ser133: eerste residu van helix αB
          const si = 41, sp = pts[si];   // pSer133 aan het begin van helix αB (Radhakrishnan et al. 1997)
          c += `<circle cx="${f1(sp[0])}" cy="${f1(sp[1])}" r="16" fill="${CLASSCOL.p}" stroke="#0a1224" stroke-width="2"/>` + T(sp[0], sp[1] + 5, 'S', { size: 14, col: '#0a1224', halo: false, w: 800 });
          c += phos(sp[0] + 20, sp[1] - 28, 15, phK);
          if (step === 4) {
            pka += enz(3780, 180, 90, 40, 'PKA', { fs: 22, op: sub(p, .15, .3) * (1 - sub(p, .8, 1)), fillOp: .5 }) + tag(3920, 150, 'ATP → ADP', '#5fd3e6', { fs: 19, op: sub(p, .35, .5) * (1 - sub(p, .8, 1)) });
            c += T(3620, 650, T2('KID van CREB: ongeordend', 'KID of CREB: disordered'), { size: 22, col: IDC });
            pka += T(sp[0] + 60, sp[1] - 60, 'Ser133-P', { size: 20, col: '#ff6b6b', op: phK, anchor: 'start' });
          }
          if (step === 5) {
            c += T(4300, 180, fold < .5 ? T2('1. ontmoetingscomplex: los, niet-specifiek', '1. encounter complex: loose, non-specific') : T2('2. gevouwen: twee helices (αA, αB)', '2. folded: two helices (αA, αB)'), { size: 22, col: fold < .5 ? '#c9d2e4' : IDC, op: sub(p, .2, .35) });
            c += T(4500, 390, 'pKID', { size: 24, col: IDC, w: 800, op: fold, anchor: 'start' });
            c += T(4300, 760, T2('→ CBP wordt gerekruteerd: CREB-doelgenen aan', '→ CBP is recruited: CREB target genes on'), { size: 20, col: C.text, op: sub(p, .85, .97) });
          }
        }
        $('id-c').innerHTML = c; $('id-pka').innerHTML = pka;   // PKA (cAMP-route) is klikbaar
        /* ---------- paneel D ---------- */
        $('id-row2').setAttribute('opacity', f1(step === 7 ? ease(sub(p, .1, .5)) : step > 7 ? 1 : 0));
      },
    };
  },
};
