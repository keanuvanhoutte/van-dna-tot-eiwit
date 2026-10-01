import { C, BASE, L, T2, svgOpen, txt, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { BASEDEF, place, drawBase, hbond, hOf, dock, dist } from './_b_chem.js';

/* ---------- G-kwartet: vier G's, elk met zijn Watson–Crick-rand (N1-H, N2-H) naar de Hoogsteen-rand (O6, N7) van de volgende ---------- */
const R90 = (q, k) => { const a = k * Math.PI / 2, c = Math.cos(a), s = Math.sin(a); return [q[0] * c - q[1] * s, q[0] * s + q[1] * c]; };
function quartet() {
  const cost = x => {
    const g0 = place(BASEDEF.G, { tx: x[0], ty: x[1], rot: x[2] }), g1 = {};
    for (const k in g0.A) g1[k] = R90(g0.A[k], 1);
    let c = (dist(g0.A.N1, g1.O6) - 2.9) ** 2 + (dist(g0.A.N2, g1.N7) - 2.9) ** 2;
    for (const k in g0.A) for (const q in g1) { const d = dist(g0.A[k], g1[q]); if (d < 2.7) c += (2.7 - d) ** 2 * 3; }
    return c;
  };
  let best = [-2, 4, -105], bc = cost(best), st = [.5, .5, 3];
  for (let it = 0; it < 3000; it++) {
    let imp = false;
    for (let i = 0; i < 3; i++) for (const sg of [1, -1]) { const x = best.slice(); x[i] += sg * st[i]; const c = cost(x); if (c < bc) { bc = c; best = x; imp = true; } }
    if (!imp) { st = st.map(v => v * .6); if (st[0] < 1e-5) break; }
  }
  const g0 = place(BASEDEF.G, { tx: best[0], ty: best[1], rot: best[2] });
  return [0, 1, 2, 3].map(k => ({ def: g0.def, A: Object.fromEntries(Object.entries(g0.A).map(([n, q]) => [n, R90(q, k)])), H: g0.H.map(([n, q]) => [n, R90(q, k)]) }));
}
const Q4 = quartet();
/* triplet T·A–T: Watson–Crick A–T + Hoogsteen-T op N7/N6 van A */
const D = 5.7, pA = place(BASEDEF.A), pT = place(BASEDEF.T, { tx: D });
const AV = [...Object.values(pT.A), ...Object.entries(pA.A).filter(([k]) => k !== 'N7' && k !== 'N6').map(([, q]) => q)];
/* f = -1: klassieke Hoogsteen-oriëntatie t.o.v. een anti-A (derde streng parallel aan de purinestreng); start in de grote groef */
const HT = dock(BASEDEF.T, [['N3', pA.A.N7, 2.9], ['O4', pA.A.N6, 2.95]], { f: -1, init: [-1, 5, 0], avoid: AV });
const pT3 = place(BASEDEF.T, HT);
/* C·C⁺ (i-motif): twee cytosines kop-aan-kop, N3–H⁺···N3 en 2× N4–H···O2, suikers aan tegenoverliggende kanten */
const pC1 = place(BASEDEF.C, { rot: 180 }), pC2 = place(BASEDEF.C, { tx: 5.6, hbCharge: [['N3', 180]] });

const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });
const STEPS = [
  ST(8000, FULL, 'Niet alles is B-DNA', 'Not everything is B-DNA', 'Bepaalde sequenties kunnen lokaal andere structuren vormen: G-quadruplex, triplex (H-DNA), kruisvorm en i-motief. Negatieve supercoiling bevordert ze.', 'Certain sequences can locally form other structures: G-quadruplex, triplex (H-DNA), cruciform and i-motif. Negative supercoiling favours them.'),
  ST(9000, cam(800, 420, 1000), 'Het G-kwartet', 'The G-quartet', 'Vier guanines vormen een vlak vierkant: 8 Hoogsteen-H-bruggen (N1–H···O6 en N2–H···N7 van de volgende G). De vier O6 wijzen naar het midden.', 'Four guanines form a flat square: 8 Hoogsteen H-bonds (N1–H···O6 and N2–H···N7 of the next G). The four O6 atoms point to the centre.'),
  ST(8500, cam(800, 430, 1150), 'Gestapelde kwartetten en K⁺', 'Stacked quartets and K⁺', 'Kwartetten stapelen op elkaar. In het centrale kanaal zit een K⁺-ion tussen twee kwartetten, gecoördineerd door 8 carbonylzuurstoffen (O6). Het kleinere Na⁺ kan ook in het vlak zitten.', 'Quartets stack on top of each other. In the central channel a K⁺ ion sits between two quartets, coordinated by 8 carbonyl oxygens (O6). The smaller Na⁺ can also sit in the plane.'),
  ST(9000, FULL, 'Topologie: parallel of antiparallel', 'Topology: parallel or antiparallel', 'De menselijke telomeerherhaling AG₃(T₂AG₃)₃ vormt met K⁺ in het kristal een parallelle "propeller" (PDB 1KF1), met Na⁺ in oplossing een antiparallelle "mand" (PDB 143D).', 'The human telomeric repeat AG₃(T₂AG₃)₃ forms a parallel "propeller" with K⁺ in the crystal (PDB 1KF1), and an antiparallel "basket" with Na⁺ in solution (PDB 143D).'),
  ST(8000, FULL, 'Waar in de cel?', 'Where in the cell?', 'Telomeren eindigen op een enkelstrengige 3′-overhang van (TTAGGG)n: ideaal voor G-quadruplexen. Ook promoters (bv. MYC) bevatten G-rijke motieven; helicasen ontvouwen ze.', 'Telomeres end in a single-stranded 3′ overhang of (TTAGGG)n: ideal for G-quadruplexes. Promoters (e.g. MYC) also contain G-rich motifs; helicases unfold them.'),
  ST(9000, cam(820, 420, 1100), 'Triplex: basentriplet T·A–T', 'Triplex: base triplet T·A–T', 'Een derde streng past in de grote groef en paart via Hoogsteen-bruggen met de purine: T·A–T, en C⁺·G–C (N3 van C moet geprotoneerd zijn, dus zuurder milieu).', 'A third strand fits in the major groove and pairs with the purine by Hoogsteen bonds: T·A–T, and C⁺·G–C (N3 of C must be protonated, so a more acidic environment).'),
  ST(9000, FULL, 'H-DNA: intramoleculaire triplex', 'H-DNA: intramolecular triplex', 'Bij een spiegelherhaling van purines/pyrimidines vouwt de helft van de pyrimidinestreng terug in de grote groef van de andere helft; de complementaire purinestreng blijft enkelstrengig.', 'At a mirror repeat of purines/pyrimidines, half of the pyrimidine strand folds back into the major groove of the other half; the complementary purine strand stays single-stranded.'),
  ST(9000, FULL, 'Kruisvorm bij een omgekeerde herhaling', 'Cruciform at an inverted repeat', 'Een palindroom (omgekeerde herhaling) kan in elke streng een haarspeld vormen. De twee haarspelden steken uit als een kruis met een vierwegsknooppunt; negatieve supercoiling drijft dit aan.', 'A palindrome (inverted repeat) can form a hairpin in each strand. The two hairpins stick out as a cross with a four-way junction; negative supercoiling drives this.'),
  ST(8000, cam(800, 420, 1000), 'i-motief: C·C⁺', 'i-motif: C·C⁺', 'De C-rijke tegenstreng kan een i-motief vormen: half-geprotoneerde C·C⁺-paren (3 H-bruggen) die in elkaar schuiven. Stabiel bij licht zure pH.', 'The C-rich opposite strand can form an i-motif: hemiprotonated C·C⁺ pairs (3 H-bonds) that intercalate. Stable at slightly acidic pH.'),
  ST(7000, FULL, 'Verder verkennen', 'Explore further', 'Bekijk G-quadruplex en triplex in 3D in de atlas, of ga naar telomeren en basenparing.', 'Explore the G-quadruplex and triplex in 3D in the atlas, or continue to telomeres and base pairing.'),
];

export default {
  id: 'noncanon',
  title: { nl: 'Niet-canonieke structuren', en: 'Non-canonical structures' },
  scale: { nl: '≈ 1–5 nm', en: '≈ 1–5 nm' },
  time: { nl: 'vormen en ontvouwen: ms – min', en: 'form and unfold: ms – min' },
  org: { nl: 'mens (telomeren, promoters)', en: 'human (telomeres, promoters)' },
  legend: [[BASE.G, 'guanine'], [BASE.A, 'adenine'], [BASE.T, 'thymine'], [BASE.C, 'cytosine'], ['#b78cff', 'K⁺'], [C.dna, { nl: 'purinestreng', en: 'purine strand' }], [C.dna2, { nl: 'pyrimidinestreng', en: 'pyrimidine strand' }], ['#fff', { nl: '- - - waterstofbrug', en: '- - - hydrogen bond' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Het G-kwartet, het T·A–T-triplet en het C·C⁺-paar zijn berekend: het programma zoekt de ligging waarbij de H-brugpartners ≈ 2,9 Å van elkaar liggen zonder botsingen. Echte structuren: PDB 1KF1 (K⁺, parallel), 143D (Na⁺, mand), 1D3X (intramoleculaire triplex).</p>',
    en: '<p style="font-size:13px;color:#93a0bb">The G-quartet, the T·A–T triplet and the C·C⁺ pair are computed: the program searches the placement in which H-bond partners lie ≈ 2.9 Å apart without clashes. Real structures: PDB 1KF1 (K⁺, parallel), 143D (Na⁺, basket), 1D3X (intramolecular triplex).</p>' },
  simplified: {
    nl: 'Topologieën zijn schematisch (echte lussen en groeven niet op schaal). Naast parallel en mand bestaan ook hybride (3+1) G-quadruplexen, die in K⁺-oplossing voor de telomeerherhaling vaak overheersen. H-DNA is getoond in de pyrimidine-vorm (Hoogsteen); er bestaat ook een purine-vorm (reverse Hoogsteen). Hoe vaak deze structuren in levende cellen voorkomen is nog onderwerp van onderzoek.',
    en: 'Topologies are schematic (real loops and grooves not to scale). Besides parallel and basket, hybrid (3+1) G-quadruplexes exist and often dominate for the telomeric repeat in K⁺ solution. H-DNA is shown in the pyrimidine form (Hoogsteen); a purine form (reverse Hoogsteen) also exists. How often these structures occur in living cells is still being researched.' },
  steps: STEPS,
  svg() {
    const btn = (x, y, node, href, nl, en, col) => `<g data-node="${node}" ${href ? `data-href="${href}"` : ''} data-nolabel><rect x="${x - 170}" y="${y - 28}" width="340" height="56" rx="28" fill="#0d1426" stroke="${col}" stroke-width="3"/><text x="${x}" y="${y + 8}" font-size="22" text-anchor="middle" fill="${col}" font-family="Inter" font-weight="700">${T2(nl, en)}</text></g>`;
    return svgOpen() + `<g id="nc-main"></g><g id="nc-chr" data-node="chromosoom" data-color="${C.dna}" data-nolabel></g><g id="nc-ann"></g>
      <g id="nc-hs-tel" data-node="telomeren" data-color="${C.dna}" data-label="${T2('Telomeren & telomerase', 'Telomeres & telomerase')}"><circle data-anchor="telomeren" cx="1080" cy="262" r="20" fill="transparent"/></g>
      <g id="nc-hs-bp" data-node="basenparing" data-color="${BASE.G}" data-label="${T2('Hoogsteen-paring (basenparing)', 'Hoogsteen pairing (base pairing)')}"><circle data-anchor="basenparing" cx="1170" cy="330" r="20" fill="transparent"/></g>
      <g id="nc-hs-sc" data-node="supercoiling" data-color="${C.dna}" data-label="${T2('Aangedreven door negatieve supercoiling', 'Driven by negative supercoiling')}"><circle data-anchor="supercoiling" cx="800" cy="840" r="20" fill="transparent"/></g>
      <g id="nc-menu">
        ${btn(430, 690, 'noncanon', '../atlas/index.html?id=g4', 'G-quadruplex in 3D ↗', 'G-quadruplex in 3D ↗', BASE.G)}
        ${btn(800, 690, 'noncanon', '../atlas/index.html?id=triplex', 'Triplex in 3D ↗', 'Triplex in 3D ↗', C.dna2)}
        ${btn(1170, 690, 'telomeren', '', 'Telomeren →', 'Telomeres →', C.dna)}
        ${btn(430, 770, 'basenparing', '', 'Basenparing', 'Base pairing', BASE.A)}
        ${btn(800, 770, 'dnahelix', '', '↑ De dubbelhelix', '↑ The double helix', C.dna)}
        ${btn(1170, 770, 'noncanon', '../atlas/index.html?id=imotif', 'i-motief in 3D ↗', 'i-motif in 3D ↗', BASE.C)}
      </g></svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const vis = (id, op) => { const e = $(id); e.setAttribute('opacity', f1(op)); e.style.pointerEvents = op < .1 ? 'none' : ''; };
    const NN = new Set(['N1', 'N2', 'N7', 'O6']);
    const X = (v, q) => v.ox + q[0] * v.S, Y = (v, q) => v.oy - q[1] * v.S;
    const kion = (x, y, r, op = 1, lab = 'K⁺') => `<g opacity="${f1(op)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="#b78cff" stroke="#fff" stroke-width="2"/>${txt(x, y + r * .38, lab, '#1a0f33', r * 1.0, 'middle', 800)}</g>`;
    const quartetSVG = (v, o = {}) => {
      let s = '';
      Q4.forEach((g, k) => { s += drawBase(g, v, { col: BASE.G, names: o.names ?? new Set(), fs: o.fs, op: o.op ?? 1, sugarCol: C.dna, hs: o.hs, c1text: o.c1text }); });
      const hb = o.hb ?? 1;
      Q4.forEach((g, k) => { const n = Q4[(k + 1) % 4]; s += hbond(hOf(g, 'N1', n.A.O6), n.A.O6, v, hb) + hbond(hOf(g, 'N2', n.A.N7), n.A.N7, v, hb); });
      return s;
    };
    /* schematische G-quadruplex (3 kwartetten, zijaanzicht in perspectief) */
    function g4schema(cx, cy, w, kind, k = 1) {
      const plane = (y, op) => `<path d="M${cx - w / 2},${y} L${cx - w / 2 + w * .28},${y - w * .2} L${cx + w / 2 + w * .06},${y - w * .2} L${cx + w / 2 - w * .22},${y} Z" fill="${BASE.G}" fill-opacity="${op}" stroke="${BASE.G}" stroke-width="2"/>`;
      const gap = w * .32, ys = [cy + gap, cy, cy - gap];
      let s = ys.map(y => plane(y, .22)).join('');
      // hoekpunten van de G's (4 per laag)
      const corners = y => [[cx - w / 2 + w * .06, y - w * .02], [cx - w / 2 + w * .3, y - w * .18], [cx + w / 2 + w * .02, y - w * .18], [cx + w / 2 - w * .22, y - w * .02]];
      // strengrichting: parallel = alle 4 omhoog; mand = afwisselend
      const dirs = kind === 'par' ? [1, 1, 1, 1] : [1, -1, 1, -1];
      const tracts = [0, 1, 2, 3].map(c => ys.map(y => corners(y)[c]));
      let d = '';
      tracts.forEach((tr, c) => {
        const pts = dirs[c] > 0 ? tr : tr.slice().reverse();
        pts.forEach((q, i) => { d += `${i || c ? 'L' : 'M'}${f1(q[0])},${f1(q[1])}`; });
        if (c < 3) {
          const a = pts[2], nb = dirs[c + 1] > 0 ? tracts[c + 1][0] : tracts[c + 1][2];
          if (kind === 'par') { // propellerlus: van boven langs de buitenkant naar beneden
            const out = c === 0 ? [-1, 0] : c === 1 ? [0, -1] : [1, 0];
            d += ` C${f1(a[0] + out[0] * w * .5)},${f1(a[1] - w * .2)} ${f1(nb[0] + out[0] * w * .5)},${f1(nb[1] + w * .25)} ${f1(nb[0])},${f1(nb[1])}`;
          } else if (c === 1) { // diagonale lus bovenaan
            d += ` Q${f1((a[0] + nb[0]) / 2)},${f1(a[1] - w * .45)} ${f1(nb[0])},${f1(nb[1])}`;
          } else { // laterale lussen
            const up = dirs[c] > 0 ? -1 : 1;
            d += ` Q${f1((a[0] + nb[0]) / 2)},${f1(a[1] + up * w * .3)} ${f1(nb[0])},${f1(nb[1])}`;
          }
        }
      });
      s += `<path d="${d}" stroke="${C.dna}" stroke-width="5" fill="none" stroke-linejoin="round" stroke-dasharray="${f1(3000 * k)} 3000"/>`;
      tracts.forEach((tr, c) => tr.forEach(q => { s += `<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="${f1(w * .05)}" fill="${BASE.G}" stroke="#0b1224" stroke-width="2"/>`; }));
      // pijlen voor richting
      tracts.forEach((tr, c) => { const a = tr[0], b = tr[2], x = a[0] + (c < 2 ? -1 : 1) * w * .09; s += `<path d="M${f1(x)},${f1(dirs[c] > 0 ? a[1] : b[1])} L${f1(x)},${f1(dirs[c] > 0 ? b[1] : a[1])}" stroke="#fff" stroke-width="2.5" marker-end="url(#arrow)" opacity=".8"/>`; });
      return s;
    }
    return {
      update(t, s) {
        const { step, p } = s;
        let m = '', ann = '', chr = '';
        if (step === 0) {
          const tiles = [[420, 300, 'G-quadruplex', T2('G-rijke streng', 'G-rich strand'), BASE.G], [1180, 300, 'triplex (H-DNA)', T2('spiegelherhaling purine/pyrimidine', 'purine/pyrimidine mirror repeat'), C.dna2], [420, 620, T2('kruisvorm', 'cruciform'), T2('omgekeerde herhaling (palindroom)', 'inverted repeat (palindrome)'), BASE.A], [1180, 620, T2('i-motief', 'i-motif'), T2('C-rijke streng, zure pH', 'C-rich strand, acidic pH'), BASE.C]];
          tiles.forEach(([x, y, a, b, col], i) => {
            const k = lerp(.7, 1, ease(sub(p, .05 + i * .12, .25 + i * .12)));   // tegels duidelijk zichtbaar vanaf het begin, lichten om de beurt op
            m += `<g opacity="${f1(k)}"><rect x="${x - 330}" y="${y - 130}" width="660" height="260" rx="20" fill="#0d1426" stroke="${col}" stroke-width="2.5"/>${txt(x, y - 80, a, col, 34, 'middle', 800)}${txt(x, y - 44, b, C.muted, 22)}</g>`;
            if (i === 0) m += `<g opacity="${f1(k)}">${g4schema(x, y + 50, 150, 'par', 1)}</g>`;
            if (i === 1) m += `<g opacity="${f1(k)}"><path d="M${x - 250},${y + 40} H${x + 250}" stroke="${C.dna}" stroke-width="6"/><path d="M${x - 250},${y + 75} H${x + 250}" stroke="${C.dna2}" stroke-width="6"/><path d="M${x - 200},${y + 8} H${x + 60} Q${x + 110},${y + 8} ${x + 110},${y + 60}" stroke="${C.dna2}" stroke-width="6" fill="none" stroke-dasharray="12 7"/></g>`;
            if (i === 2) m += `<g opacity="${f1(k)}"><path d="M${x - 260},${y + 45} H${x - 20} V${y - 10} a20,20 0 0 1 40,0 V${y + 45} H${x + 260}" stroke="${C.dna}" stroke-width="6" fill="none"/><path d="M${x - 260},${y + 65} H${x - 20} V${y + 115} a20,20 0 0 0 40,0 V${y + 65} H${x + 260}" stroke="${C.dna2}" stroke-width="6" fill="none"/></g>`;
            if (i === 3) for (let j = 0; j < 5; j++) m += `<g opacity="${f1(k)}"><rect x="${x - 60}" y="${y - 5 + j * 22}" width="120" height="12" rx="6" fill="${BASE.C}" opacity="${j % 2 ? .6 : 1}"/></g>`;
          });
        } else if (step === 1) {
          const v = { S: 29, ox: 800, oy: 420 };
          m += quartetSVG(v, { names: NN, hb: ease(sub(p, .3, .55)), fs: 17 });
          m += kion(800, 420, 26, ease(sub(p, .65, .8)));
          ann += `<g opacity="${f1(ease(sub(p, .75, .9)))}">${txt(1255, 190, T2('4 × O6 wijzen naar K⁺', '4 × O6 point to K⁺'), '#ff8f8f', 24, 'end')}</g>`;
        } else if (step === 2) {
          // zijaanzicht: 3 gestapelde kwartetten (schuin), K+ tussen de lagen
          const w = 560, cx = 800, cy = 450, gap = 140;
          const k1 = ease(sub(p, .05, .3)), k2 = ease(sub(p, .35, .55));
          m += `<path d="M${cx + 20},${cy + gap + 40} V${cy - gap - 60}" stroke="#b78cff" stroke-width="2" stroke-dasharray="6 6" opacity="${f1(k2)}"/>`;
          for (let i = 0; i < 3; i++) {
            const y = cy + (1 - i) * gap * (0.4 + .6 * k1);
            m += `<g><path d="M${cx - w / 2},${y + 40} L${cx - w / 2 + 170},${y - 60} L${cx + w / 2 + 40},${y - 60} L${cx + w / 2 - 130},${y + 40} Z" fill="${BASE.G}" fill-opacity=".13" stroke="${BASE.G}" stroke-width="2.5"/>`;
            const cs = [[cx - w / 2 + 60, y + 25], [cx - w / 2 + 200, y - 45], [cx + w / 2 - 10, y - 45], [cx + w / 2 - 150, y + 25]];
            cs.forEach(q => { m += `<rect x="${f1(q[0] - 38)}" y="${f1(q[1] - 16)}" width="76" height="32" rx="7" fill="${BASE.G}"/>` + txt(q[0], q[1] + 7, 'G', '#0a1224', 20, 'middle', 800, 'JetBrains Mono'); });
            m += '</g>';
            if (i < 2) m += kion(cx + 20, cy + (.5 - i) * gap * (0.4 + .6 * k1) - 10, 24, k2);
          }
          ann += `<g opacity="${f1(k1)}"><path d="M${cx + 420},${cy + gap + 30} V${cy + 30}" stroke="#fff" stroke-width="3" marker-start="url(#arrow)" marker-end="url(#arrow)"/>${txt(cx + 440, cy + gap / 2 + 38, '≈ 3,3 Å'.replace(',', L({ nl: ',', en: '.' })), '#fff', 24, 'start', 700)}</g>`;
          ann += `<g opacity="${f1(ease(sub(p, .6, .8)))}">${txt(800, 210, T2('K⁺ tussen twee lagen (8 × O6)', 'K⁺ between two layers (8 × O6)'), '#fff', 28)}</g>`;
        } else if (step === 3) {
          const k1 = ease(sub(p, .05, .5)), k2 = ease(sub(p, .3, .75));
          m += g4schema(470, 470, 300, 'par', k1) + g4schema(1130, 470, 300, 'anti', k2);
          ann += txt(470, 190, T2('parallel ("propeller")', 'parallel ("propeller")'), '#fff', 30) + txt(470, 226, T2('K⁺ · kristal · PDB 1KF1', 'K⁺ · crystal · PDB 1KF1'), C.muted, 22);
          ann += txt(1130, 190, T2('antiparallel ("mand")', 'antiparallel ("basket")'), '#fff', 30) + txt(1130, 226, T2('Na⁺ · NMR · PDB 143D', 'Na⁺ · NMR · PDB 143D'), C.muted, 22);
          ann += `<g opacity="${f1(ease(sub(p, .7, .85)))}">${txt(800, 700, 'AGGG TTAGGG TTAGGG TTAGGG', '#e8edf7', 28, 'middle', 700, 'JetBrains Mono')}${txt(800, 736, T2('4 G-banen × 3 G = 3 kwartetten', '4 G-tracts × 3 G = 3 quartets'), C.muted, 22)}</g>`;
        } else if (step === 4) {
          // chromosoomuiteinde met 3'-overhang die vouwt tot G4
          const k = ease(sub(p, .1, .5)), k2 = ease(sub(p, .5, .8));
          m += `<path d="M150,440 H900" stroke="${C.dna}" stroke-width="8"/><path d="M150,470 H760" stroke="${C.dna2}" stroke-width="8"/>`;
          m += txt(170, 420, "5′", C.dna, 24, 'start', 700) + txt(170, 505, "3′", C.dna2, 24, 'start', 700) + txt(745, 505, "5′", C.dna2, 22, 'end', 700);
          m += `<g opacity="${f1(1 - k)}"><path d="M900,440 H1300" stroke="${C.dna}" stroke-width="8" stroke-dasharray="14 8"/>${txt(1100, 530, T2("3′-overhang (TTAGGG)n", "3′ overhang (TTAGGG)n"), C.dna, 22)}</g>`;
          m += `<g opacity="${f1(lerp(.3, 1, k))}">${g4schema(1080, 420, 190, 'par', lerp(.35, 1, k))}</g>`;   // doelstructuur al vaag zichtbaar
          // context vanaf p = 0: het chromosoom met zijn twee telomeren, en de sequentie van de overhang
          chr = `<g><rect x="190" y="232" width="200" height="36" rx="18" fill="${C.dna}" fill-opacity=".3" stroke="${C.dna}" stroke-width="2.5"/><rect x="410" y="232" width="330" height="36" rx="18" fill="${C.dna}" fill-opacity=".3" stroke="${C.dna}" stroke-width="2.5"/><circle cx="400" cy="250" r="9" fill="${C.histone}"/><path d="M190,250 a18,18 0 0 1 18,-18 h14 v36 h-14 a18,18 0 0 1 -18,-18 Z M740,250 a18,18 0 0 0 -18,-18 h-14 v36 h14 a18,18 0 0 0 18,-18 Z" fill="#ffc247"/><path d="M708,272 L150,405 M740,262 L900,405" stroke="#ffc247" stroke-width="1.5" stroke-dasharray="6 6" opacity=".55"/>${txt(465, 212, T2('chromosoom: telomeer aan elk uiteinde', 'chromosome: a telomere at each end'), '#ffc247', 22)}</g>`;
          m += txt(1080, 585, 'TTAGGG TTAGGG TTAGGG TTAGGG', C.dna, 22, 'middle', 700, 'JetBrains Mono');
          ann += `<rect x="150" y="530" width="610" height="16" rx="8" fill="${C.histone}" opacity=".3"/>` + txt(455, 580, T2('dubbelstrengig telomeer-DNA: ≈ 5–15 kb TTAGGG', 'double-stranded telomeric DNA: ≈ 5–15 kb TTAGGG'), C.muted, 22);
          ann += `<g opacity="${f1(k2)}">${txt(1080, 640, T2('overhang ≈ 50–300 nt', 'overhang ≈ 50–300 nt'), '#fff', 22)}</g>`;
        } else if (step === 5) {
          const v = { S: 34, ox: 700, oy: 470 };
          const k = ease(sub(p, .25, .55));
          m += drawBase(pA, v, { col: BASE.A, names: new Set(['N1', 'N6', 'N7']), fs: 19 }) + drawBase(pT, v, { col: BASE.T, names: new Set(['N3', 'O4']), fs: 19 });
          m += hbond(hOf(pA, 'N6', pT.A.O4), pT.A.O4, v) + hbond(hOf(pT, 'N3', pA.A.N1), pA.A.N1, v);
          const pl = place(BASEDEF.T, { tx: HT.tx + (1 - k) * -3, ty: HT.ty + (1 - k) * 4, rot: HT.rot, f: HT.f });
          m += `<g opacity="${f1(k)}">${drawBase(pl, v, { col: BASE.T, names: new Set(['N3', 'O4']), sugarCol: C.dna2, fs: 19 })}</g>`;
          const hk = ease(sub(p, .55, .7));
          m += hbond(hOf(pl, 'N3', pA.A.N7), pA.A.N7, v, hk) + hbond(hOf(pA, 'N6', pl.A.O4), pl.A.O4, v, hk);
          ann += `<g opacity="${f1(hk)}">${txt(X(v, [2.8, 0]), Y(v, [0, -5.4]), T2('Watson–Crick A–T + Hoogsteen T', 'Watson–Crick A–T + Hoogsteen T'), '#fff', 26)}</g>`;
          ann += `<g opacity="${f1(ease(sub(p, .75, .9)))}">${txt(1340, 230, T2('ook: C⁺·G–C', 'also: C⁺·G–C'), BASE.C, 28, 'end', 800)}</g>`;
        } else if (step === 6) {
          const k = ease(sub(p, .1, .7)), th = Math.PI * k;
          const y1 = 430, y2 = 470, hx = 1000, Lr = 320;
          // purinestreng (volledig), pyrimidinestreng links tot het scharnier
          m += `<path d="M150,${y1} H${hx}" stroke="${C.dna}" stroke-width="8"/>`;
          let pur = `M${hx},${y1}`; for (let x = 0; x <= Lr; x += 10) pur += ` L${hx + x},${f1(y1 + Math.sin(x / 22) * 14 * k)}`; pur += ` L1450,${y1}`;
          m += `<path d="${pur}" stroke="${C.dna}" stroke-width="8" fill="none"/>`;
          m += `<path d="M150,${y2} H${hx}" stroke="${C.dna2}" stroke-width="8"/><path d="M${hx + Lr},${y2} H1450" stroke="${C.dna2}" stroke-width="8"/>`;
          // terugvouwende pyrimidinehelft: draait rond het scharnier naar boven en ligt dan boven de purinestreng (grote groef)
          let d = '';
          for (let u = 0; u <= 1.0001; u += .05) {
            const r = Lr * u, x = hx + r * Math.cos(th), y = y2 - r * Math.sin(th) * .35 - (y2 - (y1 - 38)) * (1 - Math.cos(th)) / 2 * (u > 0 ? 1 : 0);
            d += `${u ? 'L' : 'M'}${f1(x)},${f1(y)}`;
          }
          m += `<path d="M${hx},${y2} C${hx + 60},${y2} ${hx + 60},${y1 - 38} ${hx},${y1 - 38}" stroke="${C.dna2}" stroke-width="8" fill="none" opacity="${f1(sub(k, .85, 1))}"/>`;
          m += `<path d="${d}" stroke="${C.dna2}" stroke-width="8" fill="none" stroke-dasharray="${k > .98 ? '0' : '1 0'}"/>`;
          if (k > .95) for (let x = hx - Lr + 20; x < hx; x += 30) m += `<line x1="${x}" y1="${y1 - 32}" x2="${x}" y2="${y1 - 6}" stroke="#fff" stroke-width="2" stroke-dasharray="4 3"/>`;
          ann += txt(170, y1 - 20, "5′", C.dna, 24, 'start', 700);
          ann += `<g opacity="${f1(ease(sub(p, .7, .85)))}">${txt(hx - Lr / 2, y1 - 90, T2('triplex (Hoogsteen, in de grote groef)', 'triplex (Hoogsteen, in the major groove)'), C.dna2, 24)}${txt(hx + Lr / 2, y1 + 110, T2('enkelstrengige purinestreng', 'single-stranded purine strand'), C.dna, 24)}</g>`;
          ann += txt(800, 250, T2('spiegelherhaling: …AGGAGAAG|GAAGAGGA…', 'mirror repeat: …AGGAGAAG|GAAGAGGA…'), C.muted, 26, 'middle', 700, 'JetBrains Mono');
        } else if (step === 7) {
          const k = ease(sub(p, .1, .7)), cx = 800, y1 = 440, y2 = 470, half = 180, stem = 220 * k;
          // bovenste streng: links → knooppunt → haarspeld omhoog → rechts
          const hp = (sgn, col, y) => {
            const x1 = cx - half * (1 - k) - 14, x2 = cx + half * (1 - k) + 14, top = y + sgn * (stem + 10);
            return `<path d="M150,${y} H${f1(x1)} ${k > .02 ? `V${f1(top)} a14,14 0 0 ${sgn < 0 ? 1 : 0} 28,0 V${y}` : ''} H1450" stroke="${col}" stroke-width="7" fill="none" stroke-linejoin="round"/>`;
          };
          m += hp(-1, C.dna, y1) + hp(1, C.dna2, y2);
          // rungs in de haarspelden
          for (let s2 = 30; s2 < stem; s2 += 30) { m += `<line x1="${cx - 8}" y1="${f1(y1 - s2)}" x2="${cx + 8}" y2="${f1(y1 - s2)}" stroke="#fff" stroke-width="3"/><line x1="${cx - 8}" y1="${f1(y2 + s2)}" x2="${cx + 8}" y2="${f1(y2 + s2)}" stroke="#fff" stroke-width="3"/>`; }
          if (k < .3) ann += `<g opacity="${f1(1 - k / .3)}"><rect x="${cx - half}" y="${y1 - 22}" width="${2 * half}" height="74" rx="8" fill="none" stroke="#ffc247" stroke-dasharray="7 5"/>${txt(cx - half / 2, y1 - 34, '→ GAATTC', '#ffc247', 22, 'middle', 700, 'JetBrains Mono')}${txt(cx + half / 2, y1 - 34, 'GAATTC ←', '#ffc247', 22, 'middle', 700, 'JetBrains Mono')}</g>`;
          ann += `<g opacity="${f1(ease(sub(p, .7, .85)))}">${txt(cx + 60, y1 - 120, T2('haarspeld', 'hairpin'), C.dna, 24, 'start')}${txt(cx + 60, y2 + 140, T2('haarspeld', 'hairpin'), C.dna2, 24, 'start')}${txt(cx - 40, y2 + 50, T2('vierwegsknooppunt', 'four-way junction'), '#fff', 24, 'end')}</g>`;
          ann += txt(800, 160, T2('palindroom: 5′-GAATTC-3′ op beide strengen', 'palindrome: 5′-GAATTC-3′ on both strands'), C.muted, 26);
        } else if (step === 8) {
          const v = { S: 40, ox: 800 - 2.8 * 40, oy: 420 };
          const hk = ease(sub(p, .2, .45));
          m += drawBase(pC1, v, { col: BASE.C, names: new Set(['N3', 'N4', 'O2']) }) + drawBase(pC2, v, { col: BASE.C, names: new Set(['N3', 'N4', 'O2']) });
          m += hbond(hOf(pC2, 'N3', pC1.A.N3), pC1.A.N3, v, hk) + hbond(hOf(pC1, 'N4', pC2.A.O2), pC2.A.O2, v, hk) + hbond(hOf(pC2, 'N4', pC1.A.O2), pC1.A.O2, v, hk);
          const h = hOf(pC2, 'N3', pC1.A.N3);
          ann += `<g opacity="${f1(hk)}">${txt(X(v, h), Y(v, h) - 26, '+', '#ffc247', 34, 'middle', 800)}</g>`;
          ann += `<g opacity="${f1(ease(sub(p, .45, .65)))}">${txt(800, 672, T2('C·C⁺: extra H⁺ op N3 → 3 H-bruggen', 'C·C⁺: extra H⁺ on N3 → 3 H-bonds'), '#fff', 26)}</g>`;
        }
        $('nc-main').innerHTML = m; $('nc-chr').innerHTML = chr; $('nc-ann').innerHTML = ann;
        vis('nc-hs-tel', step === 4 ? sub(p, .8, .9) : 0);
        vis('nc-hs-bp', step === 5 ? sub(p, .8, .9) : 0);
        vis('nc-hs-sc', step === 7 ? sub(p, .8, .9) : 0);
        vis('nc-menu', step === 9 ? ease(sub(p, .1, .3)) : 0);
        if (step === 9) {
          // samenvatting: kwartet klein in het midden
          $('nc-main').innerHTML = quartetSVG({ S: 21, ox: 800, oy: 370 }, { fs: 20, c1text: false }) + kion(800, 370, 22);
        }
      },
    };
  },
};
