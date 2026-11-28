import { C, T2, svgOpen, txt, pill, FULL, cam, sub, ease, lerp, clamp, f1, CLASSCOL } from '../../kit.js';
import { K, panel, arrow } from './_bkit.js';
import { membraanLijn, eiwit, vouwing, tmHelix, ribosoom70S, PG, LPS, LIPID } from '../../bio.js';

/* Eiwitten de bacterie uit (E. coli, gramnegatief): signaalpeptide → SecB → SecA + SecYEG → signaalpeptidase → vouwen in het
 * periplasma; Tat voor al gevouwen eiwitten; door het buitenmembraan met type II (secretine, vanuit het periplasma) of type I
 * (één stap door beide membranen, TolC); vergelijking met Sec61 in het ER van de mens.
 * Bronnen: Crane & Randall 2017 (EcoSal Plus, PMC5807066): SecYEG, SecA (ATP) + protonengradiënt, SecB vangt precursors op
 * voor ze vouwen, knippen aan de periplasmakant door signaalpeptidase, vouwen na vrijkomen, SRP/YidC voor membraaneiwitten;
 * Frain, Robinson & van Dijl 2019 (Protein J, PMC6708511): Tat neemt enkel volledig gevouwen eiwitten, ≈ 30 in E. coli,
 * S-R-R-x-F-L-K, enkel aangedreven door de protonengradiënt, TatA/TatB/TatC; Green & Mecsas 2016 (Microbiol Spectr,
 * PMC4804464): signaalpeptide ≈ 20 aminozuren met drie delen, type I (ABC-transporter + MFP + TolC, HlyA), type II
 * (secretine, gevouwen eiwitten uit het periplasma, pseudopilus als zuiger, ATPase in het cytoplasma). */
const SEC = C.prot, SECB = '#f0a3d0', TAT = '#7fc8ff', T2C = '#ffb27a', T1C = K.tra, ATPC = '#ffd166';
const SIGN = CLASSCOL['+'], SIGH = K.sig, SIGC = '#ffe08a';
const YO = 250, YI = 540, MW = 24, X0 = 560;            // buitenmembraan, binnenmembraan, membraandikte, SecYEG
const S = 8, M = 24, D = 14;                            // bolletjes signaalpeptide, rijpe keten, afstand
const TATX = 828, T1X = 930, T2X = 430;

/* ---------- keten van bolletjes ---------- */
const sigCol = i => i < 2 ? SIGN : i < 6 ? SIGH : SIGC;
function keten(P, { op = 1, sigOp = 1, matOp = 1, cut = false } = {}) {
  if (op <= .01) return '';
  let g = `<g opacity="${f1(op)}">`;
  const seg = (a, b, o) => o <= .01 ? '' : `<path d="M${P.slice(a, b).map(p => f1(p[0]) + ',' + f1(p[1])).join(' L')}" stroke="${C.chain}" stroke-width="3" fill="none" stroke-opacity="${f1(o)}" stroke-linejoin="round"/>`;
  g += seg(0, S, sigOp) + seg(S, P.length, matOp);
  if (!cut) g += seg(S - 1, S + 1, Math.min(sigOp, matOp));
  P.forEach(([x, y], i) => {
    const o = i < S ? sigOp : matOp; if (o <= .01) return;
    g += `<circle cx="${f1(x)}" cy="${f1(y)}" r="6.5" fill="${i < S ? sigCol(i) : C.chain}" stroke="#0a1224" stroke-width="1.6" opacity="${f1(o)}"/>`;
    if (i < 2) g += `<text x="${f1(x)}" y="${f1(y + 3.6)}" font-size="10" text-anchor="middle" fill="#fff" font-weight="800" font-family="Inter" opacity="${f1(o)}">+</text>`;
  });
  return g + '</g>';
}
/* punt op afstand s langs een polylijn */
function langs(T, s) {
  for (let i = 0; i < T.length - 1; i++) {
    const [x0, y0] = T[i], [x1, y1] = T[i + 1], l = Math.hypot(x1 - x0, y1 - y0);
    if (s <= l || i === T.length - 2) { const u = clamp(s / l, 0, 1.5); return [x0 + (x1 - x0) * u, y0 + (y1 - y0) * u]; }
    s -= l;
  }
  return T[T.length - 1];
}
const lerpP = (A, B, u) => A.map((p, i) => [lerp(p[0], B[i][0], u), lerp(p[1], B[i][1], u)]);

/* uit het ribosoom (tunnel naar boven); e = aantal bolletjes dat al buiten is; N-uiteinde (bolletje 0) vooraan */
const RX = 300, RY = 660;
const TR = [[RX, RY], [RX, 620], [350, 600], [450, 610], [560, 630], [660, 660], [720, 720]];
const layR = e => Array.from({ length: S + M }, (_, i) => langs(TR, Math.max(0, (e - 1 - i)) * D));
const visR = e => i => i < e;
/* rond SecB: rijpe keten in een kring, signaalpeptide steekt naar SecA */
function laySecB(cx, cy) {
  const P = [], a0 = -40 * Math.PI / 180, R = 56;
  for (let j = 0; j < M; j++) { const a = a0 + j * D / R; P[S + j] = [cx + R * Math.cos(a), cy + R * Math.sin(a)]; }
  const st = [cx + R * Math.cos(a0), cy + R * Math.sin(a0)], ux = .7, uy = -.72;
  for (let i = 0; i < S; i++) P[i] = [st[0] + ux * (S - i) * 11, st[1] + uy * (S - i) * 11];
  return P;
}
/* in SecYEG: signaalpeptide staat in het membraan naast het kanaal; k bolletjes van de rijpe keten zijn al in het periplasma (lus),
 * de rest loopt door het kanaal en SecA naar het cytoplasma */
const BASE = YI - 52, XM = X0 - 17;
const TC = [[X0, BASE], [X0, YI + 60], [X0 - 60, YI + 130], [X0 - 190, YI + 170], [X0 - 330, YI + 190], [X0 - 470, YI + 200]];
function lus(k) {
  const L0 = (k - 1) * D;
  if (k < 2) return { pts: k ? [[XM - 17, BASE]] : [], cx: XM, cy: BASE };
  let r = 17, d = Math.PI / 2;
  if (L0 > 17 * Math.PI) {
    let lo = 17, hi = 300;
    for (let it = 0; it < 40; it++) { const m = (lo + hi) / 2; (m * (2 * Math.PI - 2 * Math.asin(17 / m)) < L0 ? lo = m : hi = m); }
    r = (lo + hi) / 2; d = Math.asin(17 / r);
  }
  const cy = BASE - r * Math.cos(d), t0 = Math.PI / 2 + d, t1 = Math.PI * 5 / 2 - d;
  return { pts: Array.from({ length: k }, (_, j) => { const t = lerp(t0, t1, j / (k - 1)); return [XM + r * Math.cos(t), cy + r * Math.sin(t)]; }), cx: XM, cy, r };
}
function layTrans(k) {
  const P = [];
  for (let i = 0; i < S; i++) P[i] = [X0 - 34, YI + 30 - i * 10];
  const { pts } = lus(k);
  for (let j = 0; j < M; j++) P[S + j] = j < k ? pts[j] : langs(TC, (j - k + 1) * D);
  return P;
}
const FOLD = lus(M);                 // waar het eiwit vouwt (midden van de volle lus)

/* ---------- envelop (buiten = boven), zoals in resistentie.js ---------- */
function envelop(gO = [], gI = []) {
  let g = `<rect x="70" y="${YO + MW / 2}" width="940" height="${YI - YO - MW}" fill="rgba(185,163,227,.07)"/>`;
  const yP = YO + MW / 2 + 20;
  g += `<path d="M70,${yP - 4} H1010 M70,${yP + 4} H1010" stroke="${PG}" stroke-width="2.2"/><path d="M70,${yP} H1010" stroke="${PG}" stroke-width="8" stroke-dasharray="2 9"/>`;
  g += membraanLijn(70, 1010, YO, { w: MW, gaten: gO }) + membraanLijn(70, 1010, YI, { w: MW, gaten: gI });
  let from = 70;
  for (const [a, b] of [...gO, [1010, 1010]].sort((u, v) => u[0] - v[0])) { if (a > from) g += `<path d="M${from},${YO - MW / 2 - 9} H${a}" stroke="${LPS}" stroke-width="16" stroke-dasharray="2 4.5" opacity=".9"/>`; from = Math.max(from, b); }
  return g;
}
/* SecYEG: twee helften met een kanaal in het midden (zoals sec61() in bio.js, iets groter) */
const secYEG = (op = 1) => op <= .01 ? '' : `<g opacity="${f1(op)}">` + eiwit(X0 - 17, YI, 15, 26, SEC, { seed: 61, bumps: .05 }) + eiwit(X0 + 17, YI, 15, 26, SEC, { seed: 62, bumps: .05 }) +
  `<rect x="${X0 - 4}" y="${YI - 26}" width="8" height="52" fill="#0b1224" fill-opacity=".55"/></g>`;
/* label met donkere achtergrond (leesbaar boven een membraan) */
const labBg = (x, y, s, col, fs = 22) => `<rect x="${f1(x - 6)}" y="${f1(y - fs * .95)}" width="${f1(String(s).length * fs * .62 + 12)}" height="${f1(fs * 1.3)}" rx="6" fill="#0b1224" fill-opacity=".85"/>` + txt(x, y, s, col, fs, 'start', 800);
const hPlus = (x, op = 1) => op <= .01 ? '' : `<g opacity="${f1(op)}">` + txt(x, YI - 52, 'H⁺', SIGC, 22, 'middle', 800) + arrow(x, YI - 40, x, YI + 34, SIGC, 3) + '</g>';

export default {
  id: 'bsecretie',
  title: { nl: 'Eiwitten naar buiten: Sec & Tat', en: 'Getting proteins out: Sec & Tat' },
  scale: { nl: 'celenvelop ≈ 30–40 nm dik', en: 'cell envelope ≈ 30–40 nm thick' }, time: { nl: 'één eiwit: seconden tot minuten', en: 'one protein: seconds to minutes' },
  org: { nl: 'bacterie (Escherichia coli)', en: 'bacterium (Escherichia coli)' },
  legend: [[SIGH, { nl: 'signaalpeptide (adreslabel)', en: 'signal peptide (address label)' }], [C.chain, { nl: 'eiwitketen', en: 'protein chain' }], [SECB, 'SecB'], [SEC, { nl: 'SecA + SecYEG', en: 'SecA + SecYEG' }],
    [TAT, 'Tat'], [T2C, { nl: 'type II (secretine)', en: 'type II (secretin)' }], [T1C, { nl: 'type I (met TolC)', en: 'type I (with TolC)' }], [LIPID.head, { nl: 'binnen- en buitenmembraan', en: 'inner and outer membrane' }], [PG, { nl: 'celwand (peptidoglycaan)', en: 'cell wall (peptidoglycan)' }]],
  simplified: {
    nl: 'Schema, niet op schaal: het periplasma is veel breder getekend dan echt. Het signaalpeptide telt ongeveer 20 aminozuren; hier zijn het 8 bolletjes, en hoe het precies in het kanaal ligt is vereenvoudigd. Niet elk Sec-eiwit gebruikt SecB. Membraaneiwitten gaan anders: het SRP brengt het ribosoom al tijdens de translatie naar SecYEG, met hulp van YidC. Bij type I zit het label meestal aan het andere uiteinde (C-terminaal) en wordt het niet afgeknipt. Er bestaan nog andere secretiesystemen (type III tot VI); sommige spuiten eiwitten rechtstreeks in een andere cel. De voorbeelden van type I en II komen van ziekmakende stammen van E. coli.',
    en: 'Schematic, not to scale: the periplasm is drawn much wider than it really is. The signal peptide is about 20 amino acids long; here it is 8 beads, and how it sits in the channel is simplified. Not every Sec protein uses SecB. Membrane proteins go another way: SRP brings the ribosome to SecYEG during translation, helped by YidC. In type I the label is usually at the other end (C-terminal) and is not cut off. Other secretion systems exist (types III to VI); some inject proteins straight into another cell. The type I and II examples come from disease-causing strains of E. coli.' },
  parts: [
    { c: SIGH, t: { nl: 'signaalpeptide', en: 'signal peptide' }, m: ['+ begin', '+ start', 'vettig midden', 'oily middle', 'knipplek', 'cut site'],
      d: { nl: 'Het adreslabel vooraan de keten: een positief begin (blauw), een vettig midden (oranje) en een knipplek (geel).', en: 'The address label at the front of the chain: a positive start (blue), an oily middle (orange) and a cut site (yellow).' },
      p: { nl: 'N-terminaal Sec-signaalpeptide (≈ 20 aa): positief geladen n-regio, hydrofobe h-regio, polaire c-regio met de klievingsplaats.', en: 'N-terminal Sec signal peptide (≈ 20 aa): positively charged n-region, hydrophobic h-region, polar c-region with the cleavage site.' } },
    { c: C.rrna, t: { nl: 'ribosoom', en: 'ribosome' }, d: { nl: 'Maakt de eiwitketen; het label komt er als eerste uit.', en: 'Makes the protein chain; the label comes out first.' }, p: { nl: '70S-ribosoom; de N-terminus verlaat de tunnel eerst.', en: '70S ribosome; the N-terminus leaves the tunnel first.' } },
    { c: SECB, t: 'SecB', d: { nl: 'Een chaperonne die de keten vasthoudt zodat ze nog niet vouwt.', en: 'A chaperone that holds the chain so it does not fold yet.' }, p: { nl: 'Cytosolische chaperonne (tetrameer) die precursors exportcompetent houdt en ze aan SecA geeft.', en: 'Cytosolic chaperone (tetramer) that keeps precursors export-competent and hands them to SecA.' } },
    { c: SEC, t: 'SecA', m: ['ATP'], d: { nl: 'De motor: verbruikt ATP en duwt de keten stukje per stukje door het kanaal.', en: 'The motor: uses ATP and pushes the chain through the channel bit by bit.' }, p: { nl: 'ATPase die de precursor door SecYEG transloceert.', en: 'ATPase that translocates the precursor through SecYEG.' } },
    { c: SEC, t: 'SecYEG', d: { nl: 'Het kanaal in het binnenmembraan. Alleen een ontvouwen keten past erdoor.', en: 'The channel in the inner membrane. Only an unfolded chain fits through.' }, p: { nl: 'Translocon in het cytoplasmamembraan; SecY en SecE zijn bewaard bij bacteriën, archaea en eukaryoten (Sec61).', en: 'Translocon in the cytoplasmic membrane; SecY and SecE are conserved in bacteria, archaea and eukaryotes (Sec61).' } },
    { c: SIGC, t: 'H⁺', d: { nl: 'Protonen die van buiten naar binnen willen. Die drijfkracht helpt mee.', en: 'Protons that want to move inwards. That driving force helps.' }, p: { nl: 'Protonmotorische kracht (Δp) over het binnenmembraan.', en: 'Proton motive force (Δp) across the inner membrane.' } },
    { c: K.res, t: 'signaalpeptidase', d: { nl: 'Een schaar aan de buitenkant van het binnenmembraan die het label afknipt.', en: 'A pair of scissors on the outside of the inner membrane that cuts off the label.' }, p: { nl: 'Signaalpeptidase I (Lep), actief aan de periplasmakant van het membraan.', en: 'Signal peptidase I (Lep), active on the periplasmic side of the membrane.' } },
    { c: TAT, t: 'Tat', m: ['al gevouwen', 'already folded', 'RR'], d: { nl: 'Een tweede poort, voor eiwitten die al gevouwen zijn. Het label heeft twee arginines (RR).', en: 'A second gate, for proteins that are already folded. The label has two arginines (RR).' }, p: { nl: 'Twin-arginine translocation: TatA (kanaal), TatB en TatC (binden het signaal); motief S-R-R-x-F-L-K; enkel protonmotorische kracht.', en: 'Twin-arginine translocation: TatA (channel), TatB and TatC (bind the signal); motif S-R-R-x-F-L-K; proton motive force only.' } },
    { c: T2C, t: { nl: 'type II', en: 'type II' }, m: ['secretine', 'secretin', 'twee stappen', 'two steps'], d: { nl: 'Neemt een gevouwen eiwit uit het periplasma en duwt het door een grote poort (secretine) in het buitenmembraan.', en: 'Takes a folded protein from the periplasm and pushes it through a large gate (secretin) in the outer membrane.' }, p: { nl: 'Type II-secretiesysteem: secretine in het buitenmembraan, pseudopilus als zuiger, ATPase in het cytoplasma.', en: 'Type II secretion system: secretin in the outer membrane, pseudopilus as a piston, ATPase in the cytoplasm.' } },
    { c: T1C, t: { nl: 'type I', en: 'type I' }, m: ['TolC', 'één stap', 'one step'], d: { nl: 'Een buis door beide membranen tegelijk: het eiwit gaat in één keer naar buiten.', en: 'A tube through both membranes at once: the protein goes out in one go.' }, p: { nl: 'Type I-secretiesysteem: ABC-transporter (binnenmembraan) + membraanfusie-eiwit + TolC (buitenmembraan); bv. hemolysine HlyA.', en: 'Type I secretion system: ABC transporter (inner membrane) + membrane fusion protein + TolC (outer membrane); e.g. haemolysin HlyA.' } },
    { c: LIPID.head, t: { nl: 'binnenmembraan', en: 'inner membrane' }, m: ['buitenmembraan', 'outer membrane'], d: { nl: 'De twee vliezen van E. coli, elk een dubbele laag vetmoleculen.', en: 'The two membranes of E. coli, each a double layer of fat molecules.' }, p: { nl: 'Cytoplasmamembraan en buitenmembraan (met LPS) van een gramnegatieve bacterie.', en: 'Cytoplasmic membrane and outer membrane (with LPS) of a Gram-negative bacterium.' } },
    { c: C.muted, t: { nl: 'periplasma', en: 'periplasm' }, m: ['cytoplasma', 'cytoplasm', 'buiten', 'outside'], d: { nl: 'De ruimte tussen de twee membranen, met de dunne celwand.', en: 'The space between the two membranes, with the thin cell wall.' }, p: { nl: 'Periplasma, hier veel breder getekend dan echt.', en: 'Periplasm, drawn much wider here than in reality.' } },
  ],
  steps: [
    { dur: 8500, cam: FULL, title: { nl: 'Waar moet het eiwit heen?', en: 'Where does the protein need to go?' },
      text: { nl: 'Veel eiwitten blijven in het cytoplasma. Andere horen in een membraan, in het periplasma ertussen of buiten de cel.', en: 'Many proteins stay in the cytoplasm. Others belong in a membrane, in the periplasm in between, or outside the cell.' } },
    { dur: 9000, cam: cam(500, 600, 1000), title: { nl: 'Een adreslabel vooraan', en: 'An address label at the front' },
      text: { nl: 'Een eiwit dat naar buiten moet, begint met een signaalpeptide van ongeveer 20 aminozuren: een positief begin, een vettig midden en een knipplek.', en: 'A protein that has to leave starts with a signal peptide of about 20 amino acids: a positive start, an oily middle and a cut site.' } },
    { dur: 9000, cam: cam(520, 600, 1000), title: { nl: 'SecB houdt de keten ontvouwen', en: 'SecB keeps the chain unfolded' },
      text: { nl: 'De Sec-poort laat alleen een ontvouwen keten door. De chaperonne SecB vangt veel ketens op voor ze vouwen en brengt ze naar SecA.', en: 'The Sec gate only lets an unfolded chain through. The chaperone SecB catches many chains before they fold and takes them to SecA.' } },
    { dur: 9500, cam: cam(560, 450, 1000), title: { nl: 'SecA duwt de keten door SecYEG', en: 'SecA pushes the chain through SecYEG' },
      text: { nl: 'SecA verbruikt ATP en duwt de keten door het kanaal SecYEG in het binnenmembraan. Ook de protonengradiënt (H⁺) helpt mee.', en: 'SecA uses ATP and pushes the chain through the SecYEG channel in the inner membrane. The proton gradient (H⁺) helps too.' } },
    { dur: 8500, cam: cam(560, 450, 1000), title: { nl: 'Label eraf, dan vouwen', en: 'Label off, then fold' },
      text: { nl: 'Een signaalpeptidase knipt het label eraf aan de kant van het periplasma. Pas daarna vouwt het eiwit.', en: 'A signal peptidase cuts off the label on the periplasm side. Only then does the protein fold.' } },
    { dur: 9500, cam: cam(560, 450, 1000), title: { nl: 'Tat: eiwitten die al gevouwen zijn', en: 'Tat: proteins that are already folded' },
      text: { nl: 'Sommige eiwitten moeten al in het cytoplasma vouwen. Hun label heeft twee arginines (RR); ze gaan door de Tat-poort, enkel aangedreven door H⁺.', en: 'Some proteins must fold while still in the cytoplasm. Their label has two arginines (RR); they go through the Tat gate, driven only by H⁺.' } },
    { dur: 10000, cam: cam(560, 420, 1000), title: { nl: 'Door het buitenmembraan', en: 'Through the outer membrane' },
      text: { nl: 'Om echt buiten te komen is nog een poort nodig. Type II neemt een gevouwen eiwit uit het periplasma; type I gaat in één stap door beide membranen.', en: 'To really get outside, another gate is needed. Type II takes a folded protein from the periplasm; type I crosses both membranes in one step.' } },
    { dur: 9000, cam: FULL, title: { nl: 'Vergelijk: de mens', en: 'Compare: humans' },
      text: { nl: 'Onze cellen gebruiken een verwant kanaal, Sec61, in het ER-membraan. Van daar gaan eiwitten via het Golgi-apparaat in blaasjes naar buiten.', en: 'Our cells use a related channel, Sec61, in the ER membrane. From there, proteins travel via the Golgi apparatus in vesicles to the outside.' } },
  ],
  svg() {
    return svgOpen() + `
    <g id="se-main"></g>
    <g id="se-side"></g>
    <g id="se-h1" data-node="chaperones" data-color="${SECB}" data-label="${T2('Chaperonnes', 'Chaperones')}"><rect x="380" y="640" width="120" height="120" fill="transparent"/><circle data-anchor="chaperones" cx="440" cy="830" r="1" fill="none"/></g>
    <g id="se-h2" data-node="vouwing" data-color="${C.chain}" data-label="${T2('Hoe een eiwit vouwt', 'How a protein folds')}"><rect x="480" y="380" width="130" height="110" fill="transparent"/><circle data-anchor="vouwing" cx="${f1(FOLD.cx)}" cy="340" r="1" fill="none"/></g>
    <g id="se-h3" data-node="resistentie" data-color="${T1C}" data-label="${T2('TolC zit ook in pompen', 'TolC is also in pumps')}"><rect x="900" y="150" width="60" height="420" fill="transparent"/><circle data-anchor="resistentie" cx="930" cy="840" r="1" fill="none"/></g>
    <g id="se-h4" data-node="er" data-color="${SEC}" data-label="${T2('Sec61 in het ER (mens)', 'Sec61 in the ER (human)')}"><rect x="1060" y="260" width="490" height="100" fill="transparent"/><circle data-anchor="er" cx="1190" cy="655" r="1" fill="none"/></g>
    <g id="se-h5" data-node="golgi" data-color="${C.mem}" data-label="${T2('Golgi & secretie', 'Golgi & secretion')}"><rect x="1300" y="370" width="250" height="110" fill="transparent"/><circle data-anchor="golgi" cx="1430" cy="655" r="1" fill="none"/></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const hs = ['se-h1', 'se-h2', 'se-h3', 'se-h4', 'se-h5'];
    return {
      update(t, s) {
        const { step, p } = s;
        const E = (a, b) => ease(sub(p, a, b));
        // ---------- poorten en gaten in de membranen per stap ----------
        const gI = [], gO = [];
        if (step >= 2) gI.push([X0 - 34, X0 + 34]);
        if (step >= 5) gI.push([TATX - 60, TATX + 56]);
        if (step >= 6) { gI.push([T2X - 32, T2X + 32], [T1X - 25, T1X + 25]); gO.push([T2X - 62, T2X + 62], [T1X - 27, T1X + 27]); }
        let g = envelop(gO, gI);
        const dim = step === 7 ? .45 : 1;
        // ---------- stap 0: overzicht van de plaatsen ----------
        if (step === 0) {
          const a = i => E(.08 + i * .12, .22 + i * .12);
          g += vouwing(300, 720, 40, 34, { col: C.prot, op: a(0) }) + vouwing(470, 790, 34, 30, { col: C.prot, op: a(0), spiegel: true }) + vouwing(700, 740, 38, 32, { col: C.prot, op: a(0) });
          g += `<g opacity="${f1(a(0))}">` + txt(500, 860, T2('veel eiwitten blijven hier', 'many proteins stay here'), C.muted, 22, 'middle', 700) + '</g>';
          g += tmHelix(620, YI - 18, YI + 18, C.prot, a(1), 14) + tmHelix(640, YI - 18, YI + 18, C.prot, a(1), 14);
          g += vouwing(450, 420, 38, 32, { col: C.chain, op: a(2) });
          g += `<g opacity="${f1(a(3))}">` + eiwit(820, YO, 26, 22, '#7fc8ff', { seed: 8 }) + '</g>';
          g += vouwing(560, 150, 38, 32, { col: C.chain, op: a(4), spiegel: true });
          g += txt(90, 150, T2('buiten', 'outside'), C.muted, 24, 'start', 800) + txt(90, YO - 44, T2('buitenmembraan', 'outer membrane'), C.muted, 21, 'start', 600) +
            txt(90, 410, T2('periplasma', 'periplasm'), C.muted, 24, 'start', 800) + txt(90, YI - 26, T2('binnenmembraan', 'inner membrane'), C.muted, 21, 'start', 600) + txt(90, 640, T2('cytoplasma', 'cytoplasm'), C.muted, 24, 'start', 800);
        } else if (step <= 2) {
          g += txt(90, 410, T2('periplasma', 'periplasm'), C.muted, 24, 'start', 800) + txt(90, 640, T2('cytoplasma', 'cytoplasm'), C.muted, 24, 'start', 800);
        }
        // ---------- Sec-route (stap 1–4), daarna het gevouwen eiwit ----------
        if (step === 1 || step === 2) {
          const e = step === 1 ? Math.round(lerp(0, 22, E(.05, .8))) : Math.round(lerp(22, S + M, E(0, .3)));
          const riboOp = step === 1 ? 1 : 1 - E(.3, .45);
          g += ribosoom70S(RX, RY, { s: .8, grootBoven: true, op: riboOp }).svg;
          if (riboOp > .5) g += txt(RX - 110, RY + 70, T2('ribosoom', 'ribosome'), C.rrna, 22, 'end', 700);
          let P = layR(e), vis = visR(e);
          if (step === 2) {
            const u = E(.35, .65), w = E(.7, .95);
            const B0 = laySecB(lerp(330, 440, w), lerp(760, 700, w));
            P = lerpP(P, B0, u); if (u > 0) vis = () => true;
            g += `<g opacity="${f1(E(.25, .45))}">` + eiwit(lerp(330, 440, w), lerp(760, 700, w), 46, 40, SECB, { seed: 21 }) + txt(lerp(330, 440, w), lerp(760, 700, w) + 92, 'SecB', SECB, 24, 'middle', 800) + '</g>';
            g += `<g opacity="${f1(E(.5, .7))}">` + eiwit(X0, YI + 50, 62, 30, SEC, { seed: 33 }) + txt(X0 + 80, YI + 58, 'SecA', SEC, 24, 'start', 800) + '</g>';
            g += secYEG(1) + labBg(X0 + 52, YI + 8, 'SecYEG', SEC, 22);
          }
          const Pv = P.map((q, i) => vis(i) ? q : null);
          const n = Pv.findIndex(q => !q); const shown = n < 0 ? P : P.slice(0, n);
          g += keten(shown, { matOp: 1 });
          if (step === 1 && e >= S + 1) {
            const lab = E(.6, .85), m = (a, b) => [(P[a][0] + P[b][0]) / 2, (P[a][1] + P[b][1]) / 2];
            const [nx, ny] = m(0, 1), [hx, hy] = m(2, 5), [cx2, cy2] = m(6, 7);
            g += `<g opacity="${f1(lab)}">` + txt(nx + 6, ny + 40, T2('+ begin', '+ start'), SIGN, 22, 'start', 800) + txt(hx, hy + 72, T2('vettig midden', 'oily middle'), SIGH, 22, 'middle', 800) +
              txt(cx2 - 8, cy2 + 40, T2('knipplek', 'cut site'), SIGC, 22, 'end', 800) + txt(hx, hy - 22, T2('signaalpeptide', 'signal peptide'), C.text, 21, 'middle', 700) + '</g>';
          }
        }
        if (step >= 3) {
          // SecA + SecYEG blijven staan
          g += `<g opacity="${f1(dim)}">` + eiwit(X0, YI + 50, 62, 30, SEC, { seed: 33 }) + secYEG(1) + '</g>';
          if (step <= 4) g += txt(X0 + 80, YI + 58, 'SecA', SEC, 24, 'start', 800) + labBg(X0 + 52, YI + 8, 'SecYEG', SEC, 22);
        }
        if (step === 3) {
          const u = E(0, .2), k = Math.round(lerp(0, M, E(.2, .95)));
          const P = u < 1 ? lerpP(laySecB(440, 700), layTrans(0), u) : layTrans(k);
          g += `<g opacity="${f1(1 - E(0, .25))}">` + eiwit(440, 700, 46, 40, SECB, { seed: 21 }) + '</g>';
          g += keten(P);
          const fl = Math.floor(p * 6) % 2;          // ATP → ADP knippert terwijl SecA duwt
          if (p > .2 && p < .95) g += pill(X0 + 120, YI + 100, 70, 30, fl ? 'ADP' : 'ATP', ATPC, 1, 18);
          g += hPlus(X0 + 250, E(.3, .5));
        }
        if (step === 4) {
          const cut = p > .35, fold = E(.42, .85), sOp = cut ? 1 - E(.45, .8) : 1;
          const P = layTrans(M), Pm = P.map((q, i) => i < S ? q : [lerp(q[0], FOLD.cx, fold * .7), lerp(q[1], FOLD.cy, fold * .7)]);
          g += `<g opacity="${f1(E(.05, .25))}">` + eiwit(X0 - 76, YI - 22, 22, 15, K.res, { seed: 44 }) + txt(X0 - 104, YI - 48, 'signaalpeptidase', K.res, 21, 'end', 800) + '</g>';
          if (p > .25 && p < .5) g += txt(X0 - 52, YI - 34, '✂', '#fff', 26, 'middle', 800);
          g += keten(Pm, { sigOp: sOp, matOp: 1 - fold, cut });
          g += vouwing(FOLD.cx, FOLD.cy, 60, 52, { col: C.chain, op: fold });
        }
        // gevouwen Sec-eiwit blijft in het periplasma (stap 5) en gaat in stap 6 via type II naar buiten
        if (step >= 5) {
          let x = FOLD.cx, y = FOLD.cy;
          if (step >= 6) {
            const a = E(.15, .4), b = E(.45, .9);
            x = lerp(FOLD.cx, T2X, a); y = b > 0 ? lerp(380, 178, b) : lerp(FOLD.cy, 380, a);
          }
          g += vouwing(x, y, 60, 52, { col: C.chain, op: dim });
        }
        // ---------- Tat (stap 5+) ----------
        if (step >= 5) {
          const o = step === 5 ? E(0, .15) : dim;
          g += `<g opacity="${f1(o)}">` + eiwit(TATX - 44, YI, 16, 28, TAT, { seed: 71, bumps: .05 }) + tmHelix(TATX + 34, YI - 20, YI + 20, TAT, 1, 9) + tmHelix(TATX + 46, YI - 20, YI + 20, TAT, 1, 9) +
            `<rect x="${TATX - 26}" y="${YI - 14}" width="54" height="28" rx="6" fill="${TAT}" fill-opacity="${f1(step === 5 ? .12 + .3 * E(.5, .6) * (1 - E(.85, .95)) : .12)}" stroke="${TAT}" stroke-width="1.5" stroke-dasharray="4 4"/>` + '</g>';
          let x = TATX, y = YI - 115, tail = 1;
          if (step === 5) {
            const a = E(.3, .5), b = E(.55, .85);
            y = b > 0 ? lerp(YI + 70, YI - 115, b) : lerp(YI + 220, YI + 70, a);
            g += hPlus(TATX + 110, E(.5, .65));
            g += `<g opacity="${f1(E(.1, .25) * (1 - E(.5, .6)))}">` + txt(TATX + 60, YI + 250, T2('al gevouwen', 'already folded'), C.text, 22, 'start', 800) + '</g>';
            g += txt(TATX + 60, YI + 120, 'Tat', TAT, 26, 'start', 800);
          }
          const op = step === 5 ? E(.1, .25) : dim;
          if (op > .01) {
            g += vouwing(x, y, 38, 32, { col: '#ffb3c7', op, spiegel: true });
            // label vooraan: RR (blauw) + vettig stukje (oranje)
            const tl = [[x - 34, y - 26], [x - 22, y - 36], [x - 10, y - 44], [x + 2, y - 50]];
            g += `<g opacity="${f1(op * tail)}"><path d="M${tl.map(q => f1(q[0]) + ',' + f1(q[1])).join(' L')}" stroke="${C.chain}" stroke-width="3" fill="none"/>` +
              tl.map(([a, b], i) => `<circle cx="${f1(a)}" cy="${f1(b)}" r="6.5" fill="${i < 2 ? SIGN : SIGH}" stroke="#0a1224" stroke-width="1.6"/>` + (i < 2 ? `<text x="${f1(a)}" y="${f1(b + 3.6)}" font-size="10" text-anchor="middle" fill="#fff" font-weight="800" font-family="Inter">R</text>` : '')).join('') + '</g>';
            if (step === 5) g += `<g opacity="${f1(E(.15, .3))}">` + txt(x - 50, y - 50, 'RR', SIGN, 24, 'end', 800) + '</g>';
          }
        }
        // ---------- buitenmembraan: type II (secretine) en type I (TolC) ----------
        if (step >= 6) {
          const o = step === 6 ? E(0, .15) : dim;
          // type II: platform in het binnenmembraan, ATPase eronder, zuiger (pseudopilus), secretine in het buitenmembraan
          const rodTop = step === 6 ? lerp(YI - 40, 400, E(.45, .7)) : YI - 40;
          g += `<g opacity="${f1(o)}">` + eiwit(T2X, YI, 30, 22, T2C, { seed: 81 }) + eiwit(T2X, YI + 52, 28, 18, T2C, { seed: 82 }) +
            `<rect x="${T2X - 6}" y="${f1(rodTop)}" width="12" height="${f1(YI - 16 - rodTop)}" rx="6" fill="${T2C}" fill-opacity=".7"/>` +
            eiwit(T2X - 46, YO + 6, 18, 38, T2C, { seed: 83, bumps: .05 }) + eiwit(T2X + 46, YO + 6, 18, 38, T2C, { seed: 84, bumps: .05 }) + '</g>';
          // type I: ABC-transporter (binnenmembraan) + verbindingsstuk + TolC-buis door het buitenmembraan
          g += `<g opacity="${f1(o)}">` + `<rect x="${T1X - 22}" y="${YI - 20}" width="44" height="40" rx="8" fill="${T1C}" fill-opacity=".55" stroke="${T1C}" stroke-width="2.5"/>` +
            `<rect x="${T1X - 26}" y="${YO + 80}" width="52" height="${YI - YO - 104}" rx="10" fill="${T1C}" fill-opacity=".25" stroke="${T1C}" stroke-width="2.5"/>` +
            `<rect x="${T1X - 26}" y="170" width="52" height="${YO + 82 - 170}" rx="16" fill="#0b1224"/><rect x="${T1X - 26}" y="170" width="52" height="${YO + 82 - 170}" rx="16" fill="${T1C}" fill-opacity=".45" stroke="${T1C}" stroke-width="3"/>` +
            `<rect x="${T1X - 7}" y="176" width="14" height="${YI - 196}" rx="7" fill="#0b1224" fill-opacity=".6"/>` + '</g>';
          // eiwit door type I: ontvouwen keten, label vooraan (C-terminaal)
          const N = 18, prog = step === 6 ? E(.2, .95) : 1, head = lerp(YI + 260, 165 - N * D - 20, prog);
          const B = Array.from({ length: N }, (_, i) => { const y = head + i * D; return y < 165 ? [T1X - (165 - y), 160 + Math.sin(i) * 4] : [T1X + (y > YI + 40 ? Math.sin(i) * 8 : 0), y]; });
          if (step === 6 ? p > .15 : true) g += `<g opacity="${f1(step === 6 ? E(.15, .25) : dim)}"><path d="M${B.map(q => f1(q[0]) + ',' + f1(q[1])).join(' L')}" stroke="${C.chain}" stroke-width="3" fill="none"/>` +
            B.map(([a, b], i) => `<circle cx="${f1(a)}" cy="${f1(b)}" r="6" fill="${i < 3 ? SIGH : C.chain}" stroke="#0a1224" stroke-width="1.5"/>`).join('') + '</g>';
          if (step === 6) {
            g += `<g opacity="${f1(E(.05, .2))}">` + txt(T2X + 72, 205, T2('type II · twee stappen', 'type II · two steps'), T2C, 24, 'start', 800) +
              txt(T2X - 72, YO + 70, T2('secretine', 'secretin'), T2C, 21, 'end', 700) +
              txt(T1X - 40, 320, T2('type I', 'type I'), T1C, 26, 'end', 800) + txt(T1X - 40, 346, T2('één stap', 'one step'), C.muted, 20, 'end', 600) + txt(T1X + 34, YO + 70, 'TolC', T1C, 21, 'start', 700) + '</g>';
          }
        }
        $('se-main').innerHTML = g;
        const on = [step === 2, step === 4, step === 6, step === 7, step === 7];
        hs.forEach((id, i) => $(id).setAttribute('opacity', on[i] ? 1 : 0));

        // ---------- rechterpaneel ----------
        const X = 1060, W = 490;
        let sd = step === 0 || step === 7 ? panel(X, 150, W, step === 7 ? 470 : 440) : '';
        if (step === 0) {
          sd += txt(X + W / 2, 200, T2('Wegen naar buiten', 'Ways out'), C.text, 28, 'middle', 800);
          const act = step >= 1 && step <= 4 ? 0 : step === 5 ? 1 : step === 6 ? 2 : -1;
          const items = [['Sec', T2('ontvouwen keten', 'unfolded chain'), 'SecB · SecA · SecYEG', SEC], ['Tat', T2('al gevouwen', 'already folded'), 'TatA · TatB · TatC', TAT],
            [T2('buitenmembraan', 'outer membrane'), T2('type I en type II', 'type I and type II'), T2('na Sec/Tat of in één stap', 'after Sec/Tat or in one step'), T2C]];
          items.forEach(([a, b, c, col], i) => {
            const y = 270 + i * 110, on2 = act === i || act < 0;
            sd += `<g opacity="${f1(on2 ? 1 : .35)}"><circle cx="${X + 44}" cy="${y - 8}" r="16" fill="${col}"/>` + txt(X + 44, y, String(i + 1), '#0a1224', 20, 'middle', 800) +
              txt(X + 76, y, a, act === i ? C.text : C.muted, 26, 'start', 800) + txt(X + 76, y + 32, b, col, 22, 'start', 700) + txt(X + 76, y + 60, c, C.muted, 19, 'start', 600) + '</g>';
          });
        } else if (step === 7) {
          sd += txt(X + W / 2, 200, T2('Vergelijk', 'Compare'), C.text, 28, 'middle', 800) +
            txt(X + 140, 245, 'E. coli', C.bact, 22, 'middle', 800) + txt(X + 370, 245, T2('mens', 'human'), C.mem, 22, 'middle', 800);
          const rows = [[T2('kanaal', 'channel'), [T2('SecYEG in het', 'SecYEG in the'), T2('binnenmembraan', 'inner membrane')], [T2('Sec61 in het', 'Sec61 in the'), T2('ER-membraan', 'ER membrane')]],
            [T2('daarna', 'then'), [T2('periplasma, soms', 'periplasm, sometimes'), T2('verder naar buiten', 'further outside')], [T2('ER → Golgi →', 'ER → Golgi →'), T2('blaasjes → buiten', 'vesicles → outside')]],
            [T2('label', 'label'), [T2('signaalpeptide', 'signal peptide'), T2('vooraan', 'at the front')], [T2('signaalpeptide', 'signal peptide'), T2('vooraan', 'at the front')]]];
          rows.forEach(([h, a, b], i) => {
            const y = 300 + i * 115;
            sd += `<line x1="${X + 20}" y1="${y - 30}" x2="${X + W - 20}" y2="${y - 30}" stroke="#2a3a5f" stroke-width="1.5"/>` + txt(X + 30, y, h, C.muted, 18, 'start', 700) +
              txt(X + 140, y + 26, a[0], C.text, 20, 'middle', 600) + txt(X + 140, y + 52, a[1], C.text, 20, 'middle', 600) +
              txt(X + 370, y + 26, b[0], C.text, 20, 'middle', 600) + txt(X + 370, y + 52, b[1], C.text, 20, 'middle', 600);
          });
        }
        $('se-side').innerHTML = sd;
      },
    };
  },
};
