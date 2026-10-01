import { C, L, T2, svgOpen, txt, cam, FULL, sub, ease, clamp, lerp, f1, AACLASS, CLASSCOL, SPIN } from '../../kit.js';
import { fetchPDB, parsePDB, residues, P, sub3, norm3, dot3, mul3, centroid, mainAxis, frameAlong, rotX, rotY, mm, projector, dist } from './_a_geo.js';
import { byResi, addH, ballStick, caTrace, EL } from './_a_draw.js';

/* Ubiquitine (mens), PDB 1UBQ: HELIX/SHEET-records uit het bestand */
const HELIX = [23, 34], H310 = [56, 59];
const STR = { b1: [1, 7], b2: [10, 17], b3: [40, 45], b4: [48, 50], b5: [64, 72] };
const rng = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const ssOf = i => (i >= HELIX[0] && i <= HELIX[1]) ? 'H' : (i >= H310[0] && i <= H310[1]) ? 'G' : Object.values(STR).some(([a, b]) => i >= a && i <= b) ? 'E' : '-';
const SSCOL = { H: C.prot, G: '#e07bff', E: C.trna, '-': '#6b7590' };
const ONE = { ALA: 'A', ARG: 'R', ASN: 'N', ASP: 'D', CYS: 'C', GLN: 'Q', GLU: 'E', GLY: 'G', HIS: 'H', ILE: 'I', LEU: 'L', LYS: 'K', MET: 'M', PHE: 'F', PRO: 'P', SER: 'S', THR: 'T', TRP: 'W', TYR: 'Y', VAL: 'V' };

const PX = 990, PW = 570;                      // paneel rechts
const CX = 480, CY = 440;                      // midden van de 3D-weergave
const ST = (dur, nl, en, tnl, ten, camv = FULL) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'secundair',
  title: { nl: 'Secundaire structuur', en: 'Secondary structure' },
  scale: '≈ 1–3 nm', time: { nl: 'helices vormen zich in ~µs (hier stilstaand)', en: 'helices form within ~µs (static here)' },
  org: { nl: 'mens (ubiquitine, PDB 1UBQ)', en: 'human (ubiquitin, PDB 1UBQ)' },
  legend: [[C.prot, 'α-helix'], ['#e07bff', { nl: '3₁₀-helix', en: '3₁₀ helix' }], [C.trna, { nl: 'β-streng', en: 'β-strand' }], ['#6b7590', { nl: 'lus / coil', en: 'loop / coil' }], [EL.N, 'N'], [EL.O, 'O'], [EL.C, 'C, Cα'], [EL.H, { nl: 'H (berekend)', en: 'H (computed)' }], [EL.CB, { nl: 'Cβ (begin zijketen)', en: 'Cβ (start of side chain)' }], ['#ffc247', { nl: 'H-brug (gestreept)', en: 'H-bond (dashed)' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Alle atomen komen uit PDB 1UBQ (menselijk ubiquitine, 1,8 Å). Kristalstructuren bevatten meestal geen waterstofatomen: de amide-H is hier berekend op de bissectrice van C(i−1)–N–Cα. Een H-brug wordt getoond als O en N minder dan 3,5 Å uit elkaar liggen. Hemoglobine (ons voorbeeld in de andere hoofdstukken) bevat geen β-bladen; daarom gebruikt dit hoofdstuk ubiquitine, dat helices én een gemengd β-blad heeft.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">All atoms come from PDB 1UBQ (human ubiquitin, 1.8 Å). Crystal structures usually contain no hydrogen atoms: the amide H is computed here on the bisector of C(i−1)–N–Cα. An H-bond is drawn when O and N are less than 3.5 Å apart. Haemoglobin (our example in the other chapters) contains no β-sheets; that is why this chapter uses ubiquitin, which has helices and a mixed β-sheet.</p>' },
  simplified: {
    nl: 'Enkel de backbone (N, Cα, C, O, H) en Cβ worden getoond; de rest van de zijketens is weggelaten. De H-bruggen zijn geselecteerd op afstand alleen (geen hoekcriterium zoals DSSP). De 2D-schema\'s rechts zijn geïdealiseerd.',
    en: 'Only the backbone (N, Cα, C, O, H) and Cβ are shown; the rest of the side chains is omitted. H-bonds are selected on distance only (no angle criterion as in DSSP). The 2D schemes on the right are idealised.' },
  steps: [
    ST(8000, 'Lokale structuur: helices, strengen en lussen', 'Local structure: helices, strands and loops', 'Secundaire structuur is de plaatselijke vorm van de ruggengraat (backbone). Ubiquitine heeft een α-helix, een β-blad en lussen.', 'Secondary structure is the local shape of the chain\'s backbone. Ubiquitin has an α-helix, a β-sheet and loops.'),
    ST(8000, 'De α-helix: een rechtshandige spiraal', 'The α-helix: a right-handed spiral', 'De backbone draait als een rechtshandige schroef: 3,6 residuen per winding, 1,5 Å stijging per residu.', 'The backbone twists like a right-handed screw: 3.6 residues per turn, 1.5 Å rise per residue.'),
    ST(9500, 'H-bruggen van i naar i+4', 'H-bonds from i to i+4', 'De C=O van elk residu vormt een waterstofbrug met de N–H vier residuen verder (i+4). Zo zit bijna elke backbone-groep vast, behalve aan de uiteinden.', 'The C=O of each residue forms a hydrogen bond with the N–H four residues further on (i+4). So almost every backbone group is bonded, except at the ends.'),
    ST(8500, 'Zijketens wijzen naar buiten', 'Side chains point outwards', 'Kijk langs de as: de zijketens (groene Cβ-atomen) steken naar buiten. Elk residu draait 100° verder (360° / 3,6).', 'Look down the axis: the side chains (green Cβ atoms) stick outwards. Each residue turns another 100° (360° / 3.6).'),
    ST(8500, '3₁₀- en π-helix', '3₁₀ and π helix', 'Minder vaak: de strakkere 3₁₀-helix (H-brug naar i+3; hier residuen 56–59) en de zeldzame, wijdere π-helix (naar i+5).', 'Less common: the tighter 3₁₀ helix (H-bond to i+3; here residues 56–59) and the rare, wider π helix (to i+5).'),
    ST(7500, 'De β-streng: uitgestrekt', 'The β-strand: extended', 'Een β-streng is bijna helemaal gestrekt. Alleen is ze niet stabiel: ze heeft H-bruggen met een buurstreng nodig. Twee strengen met een korte bocht: een β-haarspeld.', 'A β-strand is almost fully extended. Alone it is not stable: it needs H-bonds with a neighbouring strand. Two strands with a short turn: a β-hairpin.'),
    ST(8500, 'Antiparallel β-blad', 'Antiparallel β-sheet', 'β1 en β2 lopen in tegengestelde richting (antiparallel). De H-bruggen staan recht tussen de strengen.', 'β1 and β2 run in opposite directions (antiparallel). The H-bonds run straight across between the strands.'),
    ST(8500, 'Parallel β-blad', 'Parallel β-sheet', 'β1 en β5 lopen in dezelfde richting (parallel); de H-bruggen staan schuiner. Ubiquitine heeft dus een gemengd blad.', 'β1 and β5 run in the same direction (parallel); the H-bonds are angled. So ubiquitin has a mixed sheet.'),
    ST(8500, 'Afwisselende zijketens en twist', 'Alternating side chains and twist', 'Zijketens wijzen beurtelings naar boven en naar onder het blad. Het blad is niet plat maar licht rechtshandig gedraaid.', 'Side chains point alternately above and below the sheet. The sheet is not flat but has a slight right-handed twist.'),
    ST(8000, 'Lussen verbinden alles', 'Loops connect everything', 'Onregelmatige lussen verbinden helices en strengen. Ze liggen meestal aan het oppervlak en zijn vaak belangrijk voor de functie.', 'Irregular loops connect helices and strands. They usually lie at the surface and are often important for function.'),
  ],
  svg() {
    return svgOpen() + `
    <g id="se-under"></g>
    <g id="se-mol"></g>
    <g data-node="ubiquitine" data-color="#ffd166" data-nolabel><g id="se-ub"></g></g>
    <g id="se-lab"></g>
    <rect x="${PX}" y="110" width="${PW}" height="610" rx="18" fill="#0d1426" stroke="#2a3550" stroke-width="2"/>
    <g id="se-panel"></g>
    <g id="se-hs-rama" data-node="ramachandran" data-color="#ffc247" data-label="${T2('φ/ψ → Ramachandran-plot', 'φ/ψ → Ramachandran plot')}">
      <rect x="${PX + 20}" y="${368}" width="${PW - 40}" height="48" rx="10" fill="rgba(255,194,71,.10)" stroke="#ffc247" stroke-dasharray="5 4"/>
      <text id="se-rama-t" x="${PX + 40}" y="${401}" font-size="23" fill="#ffc247" font-family="Inter" font-weight="600">α-helix: φ ≈ −60°, ψ ≈ −45°</text>
      <circle data-anchor="ramachandran" cx="${PX + PW - 120}" cy="${370}" r="1" fill="none"/>
    </g>
    <g id="se-hs-ter" data-node="tertiair" data-color="${C.prot}" data-label="${T2('Volgende: tertiaire structuur', 'Next: tertiary structure')}">
      <rect x="${PX + 20}" y="640" width="${PW - 40}" height="56" rx="12" fill="rgba(155,123,255,.14)" stroke="${C.prot}"/>
      <text x="${PX + PW / 2}" y="676" font-size="23" text-anchor="middle" fill="${C.text}" font-family="Inter" font-weight="600">${T2('Samen → vouwing (tertiair)', 'Together → fold (tertiary)')}</text>
      <circle data-anchor="tertiair" cx="${PX + PW / 2}" cy="640" r="1" fill="none"/>
    </g>
    <text id="se-load" x="${CX}" y="${CY}" font-size="25" text-anchor="middle" fill="${C.muted}" font-family="Inter">${T2('1UBQ laden uit de PDB…', 'Loading 1UBQ from the PDB…')}</text>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    let R = null, HB = [], seq = '', err = null;
    fetchPDB('1UBQ').then(t => {
      R = byResi(residues(parsePDB(t)), 'A'); addH(R);
      seq = rng(1, 76).map(i => ONE[R[i]?.resn] ?? 'X').join('');
      for (let i = 1; i <= 76; i++) for (let j = 1; j <= 76; j++)
        if (Math.abs(i - j) >= 3 && R[i]?.at.O && R[j]?.at.N && R[j].H && dist(R[i].at.O, R[j].at.N) < 3.5) HB.push([i, j]);
    }).catch(e => { err = e.message; });

    /* views: rotatiematrix + centrum + schaal */
    const V = {};
    function views() {
      const ca = ids => ids.map(i => P(R[i].at.CA));
      const all = rng(1, 76);
      V.all = { c: centroid(ca(all)), sc: 21 };
      const h = rng(HELIX[0], HELIX[1]); let ax = mainAxis(ca(h));
      if (dot3(ax, sub3(P(R[34].at.CA), P(R[23].at.CA))) < 0) ax = mul3(ax, -1);
      V.helix = { F: frameAlong(ax), c: centroid(ca(h)), sc: 44 };
      const g = rng(54, 61); let ax2 = mainAxis(ca(g));
      if (dot3(ax2, sub3(P(R[61].at.CA), P(R[54].at.CA))) < 0) ax2 = mul3(ax2, -1);
      V.h310 = { F: frameAlong(ax2), c: centroid(ca(g)), sc: 52 };
      const d = norm3(sub3(P(R[7].at.CA), P(R[1].at.CA)));
      const up = sub3(centroid(ca(rng(10, 17))), centroid(ca(rng(64, 72))));
      V.sheet = { F: frameAlong(d, up), c: centroid(ca([...rng(1, 7), ...rng(10, 17), ...rng(64, 72)])), sc: 27 };
    }
    let lastPanel = '';
    const panel = (key, fn) => { if (key !== lastPanel) { lastPanel = key; $('se-panel').innerHTML = fn(); } };
    const T = (y, s, col = C.text, size = 23, w = 600) => txt(PX + 30, y, s, col, size, 'start', w);
    const head = s => T(162, s, C.text, 27, 700);

    return {
      update(t, s) {
        const { step, p } = s;
        $('se-load').setAttribute('opacity', R ? 0 : 1);
        if (err) $('se-load').textContent = 'PDB 1UBQ: ' + err;
        $('se-hs-rama').setAttribute('opacity', step === 1 || step === 5 ? 1 : 0);
        $('se-rama-t').textContent = step === 5 ? T2('β-streng: φ ≈ −120°, ψ ≈ +130°', 'β-strand: φ ≈ −120°, ψ ≈ +130°') : 'α-helix: φ ≈ −60°, ψ ≈ −45°';
        $('se-hs-ter').setAttribute('opacity', step === 0 || step === 9 ? 1 : 0);
        if (!R) return;
        if (!V.all) views();
        // geen eigen infade vanaf 0: de engine vervloeit al met het vorige beeld; de molecule staat er dus meteen (nooit een leeg begin)
        const fade = 1;
        let mol = '', lab = '', under = '';
        const tag = (x, y, s, col = '#fff', size = 20, anchor = 'middle') => `<text x="${f1(x)}" y="${f1(y)}" font-size="${size}" text-anchor="${anchor}" fill="${col}" font-family="Inter" font-weight="700" paint-order="stroke" stroke="#070b16" stroke-width="5">${s}</text>`;

        if (step === 0 || step === 9) {
          const M = mm(rotY(t * 0.00022 * SPIN), rotX(-0.35));
          const pr = projector(M, V.all.c, V.all.sc, CX, CY);
          const loopDim = step === 9 ? (i => ssOf(i) !== '-') : null;
          mol = caTrace(R, rng(1, 76), pr, i => SSCOL[ssOf(i)], 13, loopDim);
          const at = i => pr(P(R[i].at.CA));
          if (step === 0) {
            const a = at(29), b = at(4), c = at(66), g = at(57);
            lab += tag(a[0], a[1] - 40, 'α-helix', C.prot, 25) + tag(b[0], b[1] - 36, T2('β-blad', 'β-sheet'), C.trna, 25) + tag(g[0] + 30, g[1] + 40, '3₁₀', '#e07bff', 23, 'start');
            lab += tag(at(1)[0] - 18, at(1)[1] + 8, 'N', '#fff', 22, 'end') + tag(at(76)[0] + 18, at(76)[1] + 8, 'C', '#fff', 22, 'start');
          } else {
            const hp = at(8), om = at(52), lc = at(20);
            lab += tag(hp[0], hp[1] - 30, T2('haarspeld (7–10)', 'hairpin (7–10)'), '#dfe8ff', 23) + tag(om[0], om[1] + 44, T2('lus 51–55', 'loop 51–55'), '#dfe8ff', 23) + tag(lc[0], lc[1] - 30, T2('lus 18–22', 'loop 18–22'), '#dfe8ff', 23);
          }
          panel('p' + step + L({ nl: 1, en: 2 }), () => step === 0 ? (() => {
            let s = head(T2('Ubiquitine · mens · PDB 1UBQ', 'Ubiquitin · human · PDB 1UBQ'));
            for (let r = 0; r < 3; r++) for (let k = 0; k < 26; k++) {
              const i = r * 26 + k + 1; if (i > 76) break;
              const x = PX + 40 + k * 19.5, y = 215 + r * 62, ss = ssOf(i);
              s += `<rect x="${f1(x - 9)}" y="${y + 8}" width="18" height="8" rx="2" fill="${SSCOL[ss]}"/>` + `<text x="${f1(x)}" y="${y}" font-size="20" text-anchor="middle" fill="${C.text}" font-family="JetBrains Mono" font-weight="700">${seq[i - 1]}</text>`;
            }
            [[C.prot, 'α-helix 23–34'], ['#e07bff', T2('3₁₀-helix 56–59', '3₁₀ helix 56–59')], [C.trna, T2('5 β-strengen → één blad', '5 β-strands → one sheet')], ['#6b7590', T2('lussen', 'loops')]].forEach(([col, lb], k) => {
              s += `<rect x="${PX + 30}" y="${426 + k * 40}" width="26" height="12" fill="${col}"/>` + txt(PX + 70, 441 + k * 40, lb, C.text, 23, 'start');
            });
            return s;
          })() : head(T2('Drie soorten lussen', 'Three kinds of loops')) +
            T(225, T2('haarspeld: min. 4–5 res., vaak Gly/Pro', 'hairpin: min. 4–5 res., often Gly/Pro')) +
            T(275, T2('omega-lus: ± 6–16 res. (Ω-vorm)', 'omega loop: ± 6–16 res. (Ω shape)')) +
            T(325, T2('random coil: > 16 res., ongeordend', 'random coil: > 16 res., disordered')) +
            T(400, T2('Ubiquitine: enkel korte lussen', 'Ubiquitin: only short loops'), C.muted, 22));
        } else if (step >= 1 && step <= 3) {
          const endOn = step === 3 ? ease(sub(p, .1, .6)) * Math.PI / 2 : 0;
          const spin = step === 3 ? 0.35 : t * 0.0005 * SPIN;
          const M = mm(rotY(endOn), mm(rotX(spin), V.helix.F));
          const pr = projector(M, V.helix.c, V.helix.sc * (step === 3 ? lerp(1, 1.25, ease(sub(p, .1, .6))) : 1), CX, CY);
          const ids = rng(HELIX[0], HELIX[1]);
          let hb = [], cur = -1;
          if (step === 2) {
            cur = HELIX[0] + Math.min(7, Math.floor(p * 8));
            hb = HB.filter(([i, j]) => j - i === 4 && i >= HELIX[0] && j <= HELIX[1]).map(([i, j]) => [i, j, i === cur ? '#fff' : '#ffc247', i === cur ? 5 : 3]);
          }
          const r = ballStick(R, ids, pr, { hb, cb: step === 3, scale: step === 3 ? 1.1 : 1 });
          mol = r.svg;
          if (step === 1) {
            const a = r.pos(23, 'N'), b = r.pos(34, 'C');
            lab += tag(a[0] + 10, a[1] - 44, T2('N-kant', 'N end'), '#fff', 24, 'start') + tag(b[0] + 20, b[1] - 30, T2('C-kant', 'C end'), '#fff', 24, 'start');
          }
          if (step === 2) {
            /* labels botsingsvrij plaatsen: elk label schuift verticaal weg van reeds geplaatste labels */
            const placed = [];
            const put = (x, y, text, col, size, dir) => {
              const w = text.length * size * .56 + 12, h = size + 8;
              for (let n = 0; n < 12 && placed.some(b => Math.abs(b.x - x) < (b.w + w) / 2 && Math.abs(b.y - y) < (b.h + h) / 2); n++) y += dir * (h * .6);
              placed.push({ x, y, w, h }); lab += tag(x, y, text, col, size);
            };
            const qs = [0, 1, 2, 3, 4].map(k => r.pos(cur + k, 'CA'));
            qs.forEach((q, k) => { if (k && k < 4) lab += `<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="15" fill="none" stroke="#9fb0cf" stroke-width="2"/>`; });
            put(qs[0][0], qs[0][1] - 30, 'Cα i', '#fff', 24, -1); put(qs[4][0], qs[4][1] - 30, 'Cα i+4', '#fff', 24, -1);
            [1, 2, 3].forEach(k => put(qs[k][0], qs[k][1] - 24, String(k), '#9fb0cf', 19, -1));
            const o = r.pos(cur, 'O'), h = R[cur + 4].H ? r.pos(cur + 4, 'H') : null;
            /* C=O en H–N onder de molecule, met aanwijslijn (niet over de atomen) */
            const lead = (q, x, y, text, col) => { lab += `<line x1="${f1(q[0])}" y1="${f1(q[1] + 10)}" x2="${f1(x)}" y2="${f1(y - 22)}" stroke="${col}" stroke-width="2" stroke-dasharray="4 4" opacity=".8"/>`; put(x, y, text, col, 24, 1); };
            let ox = o[0], hx = h ? h[0] : 0;
            if (h && Math.abs(ox - hx) < 190) { const m = (ox + hx) / 2, sgn = ox <= hx ? -1 : 1; ox = m + sgn * 95; hx = m - sgn * 95; }
            lead(o, ox, 650, 'C=O (i)', EL.O);
            if (h) lead(h, hx, 650, 'H–N (i+4)', '#fff');
          }
          if (step === 3 && p > .5) lab += tag(CX, 170, T2('Cβ (groen) wijst naar buiten', 'Cβ (green) points outwards'), C.chain, 25);
          if (step === 1) panel('h1' + L({ nl: 1, en: 2 }), () => head('α-helix') +
            T(220, T2('• rechtshandig', '• right-handed')) + T(262, T2('• 3,6 residuen per winding', '• 3.6 residues per turn')) +
            T(304, T2('• 1,5 Å per residu', '• 1.5 Å per residue')) + T(346, T2('• compact, staafvormig', '• compact, rod-shaped')) + (() => {
              // zijaanzicht-schema: 12 residuen, 3,6 per winding → spoed 3,6 × 1,5 Å = 5,4 Å
              const x0 = PX + 70, dx = 38, yc = 540, A = 52;
              const pt = i => [x0 + i * dx, yc - A * Math.sin(2 * Math.PI * i / 3.6), -Math.cos(2 * Math.PI * i / 3.6)];
              let d = '', q = '';
              for (let u = 0; u <= 11.001; u += .1) { const [x, y] = pt(u); d += `${u ? 'L' : 'M'}${f1(x)},${f1(y)}`; }
              for (let i = 0; i < 12; i++) { const [x, y, z] = pt(i); q += `<circle cx="${f1(x)}" cy="${f1(y)}" r="12" fill="${C.prot}" opacity="${f1(.55 + .45 * z)}" stroke="#0a1224" stroke-width="2"/>`; }
              const w = 3.6 * dx;
              return `<path d="${d}" stroke="${C.prot}" stroke-width="5" fill="none" opacity=".7"/>` + q +
                `<path d="M${x0},${yc + 78} v10 H${f1(x0 + w)} v-10" stroke="#c3cde2" stroke-width="2.5" fill="none"/>` + txt(x0 + w + 16, yc + 96, T2('1 winding = 5,4 Å', '1 turn = 5.4 Å'), '#c3cde2', 22, 'start');
            })());
          if (step === 2) panel('h2' + cur + L({ nl: 1, en: 2 }), () => {
            let s = head(T2('Patroon van de H-bruggen', 'Pattern of the H-bonds'));
            const x0 = PX + 45, dx = 44, y = 330;
            for (let i = HELIX[0]; i <= HELIX[1]; i++) {
              const x = x0 + (i - HELIX[0]) * dx, on = i === cur || i === cur + 4;
              s += `<circle cx="${x}" cy="${y}" r="16" fill="${on ? '#fff' : CLASSCOL[AACLASS[seq[i - 1]]]}" stroke="#0a1224" stroke-width="2"/>` + `<text x="${x}" y="${y + 6}" font-size="18" text-anchor="middle" fill="#0a1224" font-family="JetBrains Mono" font-weight="700">${seq[i - 1]}</text>`;
              s += `<text x="${x}" y="${y + 44}" font-size="18" text-anchor="middle" fill="${C.muted}" font-family="JetBrains Mono">${i}</text>`;
            }
            for (const [i, j] of HB.filter(([i, j]) => j - i === 4 && i >= HELIX[0] && j <= HELIX[1])) {
              const a = x0 + (i - HELIX[0]) * dx, b = x0 + (j - HELIX[0]) * dx, on = i === cur;
              s += `<path d="M${a},${y - 18} C${a},${y - 90} ${b},${y - 90} ${b},${y - 18}" fill="none" stroke="${on ? '#fff' : '#ffc247'}" stroke-width="${on ? 4 : 2.5}" stroke-dasharray="6 4" opacity="${on ? 1 : .6}"/>`;
            }
            s += T(450, T2(`C=O van ${cur} ··· H–N van ${cur + 4}`, `C=O of ${cur} ··· H–N of ${cur + 4}`), '#fff', 26, 700);
            return s;
          });
          if (step === 3) panel('h3' + L({ nl: 1, en: 2 }), () => {
            let s = head(T2('Helixwiel (bovenaanzicht)', 'Helical wheel (top view)'));
            const cx = PX + PW / 2, cy = 400, rr = 150;
            s += `<circle cx="${cx}" cy="${cy}" r="${rr - 40}" fill="none" stroke="#2a3550" stroke-width="3"/>`;
            for (let i = HELIX[0]; i <= HELIX[1]; i++) {
              const a = (i - HELIX[0]) * 100 * Math.PI / 180 - Math.PI / 2, x = cx + rr * Math.cos(a), y = cy + rr * Math.sin(a);
              s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="22" fill="${CLASSCOL[AACLASS[seq[i - 1]]]}" stroke="#0a1224" stroke-width="2"/><text x="${f1(x)}" y="${f1(y + 7)}" font-size="21" text-anchor="middle" fill="#0a1224" font-family="JetBrains Mono" font-weight="700">${seq[i - 1]}</text>`;
              s += `<text x="${f1(cx + (rr + 38) * Math.cos(a))}" y="${f1(cy + (rr + 36) * Math.sin(a) + 5)}" font-size="18" text-anchor="middle" fill="${C.muted}" font-family="JetBrains Mono">${i}</text>`;
            }
            s += txt(cx, cy + 9, '100°', C.muted, 25);
            s += T(645, T2('groen = hydrofoob · blauw/rood = geladen', 'green = hydrophobic · blue/red = charged'), C.muted, 22);
            return s;
          });
        } else if (step === 4) {
          const M = mm(rotX(t * 0.0005 * SPIN), V.h310.F);
          const pr = projector(M, V.h310.c, V.h310.sc, CX, CY);
          const hb = HB.filter(([i, j]) => j - i === 3 && i >= 54 && j <= 61).map(([i, j]) => [i, j, '#e07bff', 4]);
          const r = ballStick(R, rng(54, 61), pr, { hb, dim: i => i < H310[0] - 1 || i > H310[1] + 1 });
          mol = r.svg;
          const a = r.pos(55, 'CA'), b = r.pos(60, 'CA');
          lab += tag((a[0] + b[0]) / 2, 190, T2('3₁₀-helix: O(i) ··· H–N(i+3)', '3₁₀ helix: O(i) ··· H–N(i+3)'), '#e07bff', 25);
          panel('g' + L({ nl: 1, en: 2 }), () => {
            let s = head(T2('Drie soorten helices', 'Three kinds of helix'));
            const rows = [['3₁₀', 3, '3,0', '3.0', '#e07bff', T2('korter, strakker', 'shorter, tighter')], ['α', 4, '3,6', '3.6', C.prot, T2('veruit het meest', 'by far the most common')], ['π', 5, '4,4', '4.4', '#5fd3e6', T2('zeldzaam, breder', 'rare, wider')]];
            rows.forEach(([nm, k, nlv, env, col, note], r) => {
              const y = 262 + r * 150, x0 = PX + 150, dx = 36;
              s += txt(PX + 40, y + 8, nm, col, 32, 'start', 700);
              for (let i = 0; i < 9; i++) s += `<circle cx="${x0 + i * dx}" cy="${y}" r="10" fill="#8a96b3"/>`;
              for (let i = 0; i + k < 9; i++) s += `<path d="M${x0 + i * dx},${y - 12} C${x0 + i * dx},${y - 60} ${x0 + (i + k) * dx},${y - 60} ${x0 + (i + k) * dx},${y - 12}" fill="none" stroke="${col}" stroke-width="2.5" stroke-dasharray="5 4" opacity=".75"/>`;
              s += txt(PX + 150, y + 44, `i → i+${k} · ${L({ nl: nlv, en: env })} ${T2('res./winding', 'res./turn')}`, '#c3cde2', 22, 'start', 600) + txt(PX + 150, y + 74, note, C.muted, 21, 'start', 600);
            });
            return s;
          });
        } else {
          // β-blad
          const tilt = step === 8 ? ease(sub(p, .1, .7)) * 1.4 : 0.25 * Math.sin(t * 0.0006);
          const M = mm(rotX(-tilt), V.sheet.F);
          const pr = projector(M, V.sheet.c, V.sheet.sc, CX, CY + 10);
          let ids = [...rng(1, 17), ...rng(64, 72)], dim = null, hb = [];
          if (step === 5) { ids = rng(1, 17); }
          if (step === 6) { ids = rng(1, 17); hb = HB.filter(([i, j]) => i <= 17 && j <= 17 && Math.abs(i - j) > 4).map(([i, j]) => [i, j]); }
          if (step === 7) { dim = i => i >= 8 && i <= 17; hb = HB.filter(([i, j]) => (i <= 7 && j >= 64) || (j <= 7 && i >= 64)).map(([i, j]) => [i, j]); }
          if (step === 8) { ids = rng(1, 17); hb = HB.filter(([i, j]) => i <= 17 && j <= 17 && Math.abs(i - j) > 4).map(([i, j]) => [i, j, '#ffc247', 2.5]); }
          const r = ballStick(R, ids, pr, { hb, dim, cb: step === 8, h: true });
          mol = r.svg;
          const arrowLab = (a, b, name, col, yoff = 0) => {
            const A = r.pos(a, 'CA'), B = r.pos(b, 'CA'); if (!A || !B) return '';
            const dx = B[0] - A[0], dy = B[1] - A[1], l = Math.hypot(dx, dy), ux = dx / l, uy = dy / l;
            const E = [B[0] + ux * 30, B[1] + uy * 30], S0 = [A[0] - ux * 20, A[1] - uy * 20];
            under += `<line x1="${f1(S0[0])}" y1="${f1(S0[1])}" x2="${f1(E[0] - ux * 26)}" y2="${f1(E[1] - uy * 26)}" stroke="${col}" stroke-width="30" opacity=".28"/>` +
              `<path d="M${f1(E[0])},${f1(E[1])} L${f1(E[0] - ux * 40 - uy * 30)},${f1(E[1] - uy * 40 + ux * 30)} L${f1(E[0] - ux * 40 + uy * 30)},${f1(E[1] - uy * 40 - ux * 30)}Z" fill="${col}" opacity=".35"/>`;
            return tag(S0[0] - ux * 16, S0[1] - uy * 16 + 8 + yoff, name, col, 25, ux > 0 ? 'end' : 'start');
          };
          if (step !== 8) {
            lab += arrowLab(1, 7, 'β1', C.trna);
            if (step !== 7) lab += arrowLab(10, 17, 'β2', C.trna);
            if (step === 7) lab += arrowLab(64, 72, 'β5', C.trna, 34);
            if (step === 5) { const h = r.pos(9, 'CA'); lab += tag(h[0] + 30, h[1] + 150, T2('haarspeld (Gly10)', 'hairpin (Gly10)'), '#dfe8ff', 23, 'end'); }
          } else if (p > .6) lab += tag(CX, 170, T2('zijaanzicht: Cβ boven / onder', 'side view: Cβ above / below'), C.chain, 25);
          const k = L({ nl: 1, en: 2 });
          if (step === 5) panel('b5' + k, () => head(T2('β-streng', 'β-strand')) +
            T(220, T2('• bijna gestrekt', '• almost fully extended')) + T(262, T2('• ± 3,5 Å per residu', '• ± 3.5 Å per residue')) +
            T(304, T2('• vaak 5–8 residuen', '• often 5–8 residues')) + T(346, T2('• getekend als pijl (N → C)', '• drawn as an arrow (N → C)')));
          if (step === 6 || step === 7) panel('b' + step + k, () => {
            const par = step === 7;
            let s = head(par ? T2('Parallel: zelfde richting', 'Parallel: same direction') : T2('Antiparallel: tegengesteld', 'Antiparallel: opposite'));
            const x0 = PX + 70, dx = 70, y1 = 280, y2 = 420;
            const arr = (xa, xb, y) => { const d = Math.sign(xb - xa); return `<line x1="${xa}" y1="${y}" x2="${xb - d * 22}" y2="${y}" stroke="${C.trna}" stroke-width="14"/><path d="M${xb},${y} L${xb - d * 26},${y - 20} L${xb - d * 26},${y + 20}Z" fill="${C.trna}"/>`; };
            s += arr(x0 - 30, x0 + 6 * dx + 30, y1) + (par ? arr(x0 - 30, x0 + 6 * dx + 30, y2) : arr(x0 + 6 * dx + 30, x0 - 30, y2));
            s += txt(x0 - 45, y1 + 8, 'N', '#fff', 24, 'end') + txt(x0 + 6 * dx + 50, y1 + 8, 'C', '#fff', 24, 'start');
            s += par ? txt(x0 - 45, y2 + 8, 'N', '#fff', 24, 'end') + txt(x0 + 6 * dx + 50, y2 + 8, 'C', '#fff', 24, 'start') : txt(x0 - 45, y2 + 8, 'C', '#fff', 24, 'end') + txt(x0 + 6 * dx + 50, y2 + 8, 'N', '#fff', 24, 'start');
            for (let i = 0; i < 7; i++) { s += `<circle cx="${x0 + i * dx}" cy="${y1}" r="11" fill="#c9d2e4"/><circle cx="${x0 + i * dx}" cy="${y2}" r="11" fill="#c9d2e4"/>`; }
            if (!par) for (let i = 0; i < 7; i += 2) s += `<line x1="${x0 + i * dx - 8}" y1="${y1 + 14}" x2="${x0 + i * dx - 8}" y2="${y2 - 14}" stroke="#ffc247" stroke-width="3" stroke-dasharray="6 5"/><line x1="${x0 + i * dx + 8}" y1="${y1 + 14}" x2="${x0 + i * dx + 8}" y2="${y2 - 14}" stroke="#ffc247" stroke-width="3" stroke-dasharray="6 5"/>`;
            else for (let i = 0; i < 6; i += 2) s += `<line x1="${x0 + i * dx}" y1="${y1 + 14}" x2="${x0 + (i + 1) * dx}" y2="${y2 - 14}" stroke="#ffc247" stroke-width="3" stroke-dasharray="6 5"/><line x1="${x0 + (i + 1) * dx}" y1="${y2 - 14}" x2="${x0 + (i + 2) * dx}" y2="${y1 + 14}" stroke="#ffc247" stroke-width="3" stroke-dasharray="6 5"/>`;
            s += T(505, par ? T2('H-bruggen schuin (zigzag)', 'H-bonds angled (zigzag)') : T2('H-bruggen recht tegenover elkaar', 'H-bonds straight across'), '#c3cde2', 23);
            return s;
          });
          if (step === 8) panel('b8' + k, () => {
            let s = head(T2('Twist en β-bulge', 'Twist and β-bulge'));
            s += T(220, T2('• zijketens boven/onder', '• side chains above/below')) + T(262, T2('• rechtshandige twist', '• right-handed twist'));
            const x0 = PX + 70, dx = 62, y1 = 470, y2 = 560;
            s += T(410, T2('β-bulge: één extra residu', 'β-bulge: one extra residue'), '#c3cde2', 23);
            for (let i = 0; i < 7; i++) s += `<circle cx="${x0 + i * dx}" cy="${y2}" r="10" fill="#c9d2e4"/>`;
            const top = [0, 1, 2, 2.5, 3, 4, 5, 6];
            s += `<path d="M${top.map((v, i) => `${x0 + v * dx},${i === 3 ? y1 - 34 : y1}`).join(' L')}" fill="none" stroke="${C.trna}" stroke-width="5"/>`;
            top.forEach((v, i) => { s += `<circle cx="${x0 + v * dx}" cy="${i === 3 ? y1 - 34 : y1}" r="10" fill="${i === 3 ? '#ff8a3d' : '#c9d2e4'}"/>`; });
            s += `<line x1="${x0}" y1="${y2}" x2="${x0 + 6 * dx}" y2="${y2}" stroke="${C.trna}" stroke-width="5"/>`;
            return s;
          });
        }
        const whole = step === 0 || step === 9;   // het volledige ubiquitine-molecuul is klikbaar
        $('se-mol').innerHTML = whole ? '' : mol; $('se-ub').innerHTML = whole ? mol : ''; $('se-lab').innerHTML = lab; $('se-under').innerHTML = under; $('se-under').setAttribute('opacity', f1(fade));
        $('se-mol').setAttribute('opacity', f1(fade)); $('se-lab').setAttribute('opacity', f1(fade));
      },
    };
  },
};
