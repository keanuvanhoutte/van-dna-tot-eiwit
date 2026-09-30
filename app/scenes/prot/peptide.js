import { C, L, T2, svgOpen, txt, cam, FULL, sub, ease, lerp, clamp, f1, CLASSCOL } from '../../kit.js';
import { at, bd, ACOL } from './_a_chem.js';
import { sub3, add3, mul3, cross3, norm3, len3, dot3, frameAlong, projector, rotX, mm, centroid } from './_a_geo.js';
import { ballStick, EL } from './_a_draw.js';

/* ---------- ideale backbone-geometrie (Engh & Huber-achtige waarden) en NeRF-opbouw ---------- */
const BL = { NCA: 1.458, CAC: 1.525, CN: 1.329 }, BA = { NCAC: 111.2, CACN: 116.2, CNCA: 121.7 };
const rad = d => d * Math.PI / 180;
function place(a, b, c, len, ang, tor) {
  const bc = norm3(sub3(c, b)), n = norm3(cross3(sub3(b, a), bc)), m = cross3(n, bc);
  const d2 = [-len * Math.cos(rad(ang)), len * Math.sin(rad(ang)) * Math.cos(rad(tor)), len * Math.sin(rad(ang)) * Math.sin(rad(tor))];
  return add3(c, add3(add3(mul3(bc, d2[0]), mul3(m, d2[1])), mul3(n, d2[2])));
}
/* drie residuen; tors = { psi0, phi1, psi1, phi2 }, ω = 180° (trans) */
function chain({ psi0 = 135, phi1 = -60, psi1 = -45, phi2 = -120 }) {
  const N0 = [0, 0, 0], CA0 = [BL.NCA, 0, 0];
  const C0 = add3(CA0, [-BL.CAC * Math.cos(rad(BA.NCAC)), BL.CAC * Math.sin(rad(BA.NCAC)), 0]);
  const N1 = place(N0, CA0, C0, BL.CN, BA.CACN, psi0);
  const CA1 = place(CA0, C0, N1, BL.NCA, BA.CNCA, 180);
  const C1 = place(C0, N1, CA1, BL.CAC, BA.NCAC, phi1);
  const N2 = place(N1, CA1, C1, BL.CN, BA.CACN, psi1);
  const CA2 = place(CA1, C1, N2, BL.NCA, BA.CNCA, 180);
  const C2 = place(C1, N2, CA2, BL.CAC, BA.NCAC, phi2);
  const N3 = place(N2, CA2, C2, BL.CN, BA.CACN, 135);
  const O = (ca, c, n) => add3(c, mul3(norm3(add3(norm3(sub3(c, ca)), norm3(sub3(c, n)))), 1.231));
  const H = (cp, n, ca) => add3(n, mul3(norm3(add3(norm3(sub3(n, cp)), norm3(sub3(n, ca)))), 1.01));
  const CB = (n, ca, c) => { const b = sub3(ca, n), cc = sub3(c, ca), a = cross3(b, cc); return add3(ca, add3(add3(mul3(a, -0.58273431), mul3(b, 0.56802827)), mul3(cc, -0.54067466))); };
  const v = p => ({ x: p[0], y: p[1], z: p[2] });
  const R = {
    0: { resi: 0, resn: 'ALA', at: { N: v(N0), CA: v(CA0), C: v(C0), O: v(O(CA0, C0, N1)), CB: v(CB(N0, CA0, C0)) } },
    1: { resi: 1, resn: 'ALA', at: { N: v(N1), CA: v(CA1), C: v(C1), O: v(O(CA1, C1, N2)), CB: v(CB(N1, CA1, C1)) }, H: H(C0, N1, CA1) },
    2: { resi: 2, resn: 'ALA', at: { N: v(N2), CA: v(CA2), C: v(C2), O: v(O(CA2, C2, N3)), CB: v(CB(N2, CA2, C2)) }, H: H(C1, N2, CA2) },
  };
  return R;
}
/* kortste afstand tussen atomen die ≥ 4 bindingen uit elkaar liggen (sterische botsing?) */
const LIM = { HH: 1.9, HO: 2.4, HN: 2.4, HC: 2.2, OO: 2.7, NO: 2.6, CO: 2.7, NN: 2.6, CN: 2.8, CC: 3.0 };
function clash(R) {
  const A = [], E = [];
  const add = (k, p, el) => { A.push({ k, p, el }); return A.length - 1; };
  const idx = {};
  for (const i of [0, 1, 2]) {
    const r = R[i];
    for (const n of ['N', 'CA', 'C', 'O', 'CB']) idx[i + n] = add(i + n, [r.at[n].x, r.at[n].y, r.at[n].z], n === 'CA' || n === 'CB' ? 'C' : n[0]);
    if (r.H) idx[i + 'H'] = add(i + 'H', r.H, 'H');
    E.push([i + 'N', i + 'CA'], [i + 'CA', i + 'C'], [i + 'C', i + 'O'], [i + 'CA', i + 'CB']);
    if (r.H) E.push([i + 'N', i + 'H']);
    if (i < 2) E.push([i + 'C', (i + 1) + 'N']);
  }
  const adj = A.map(() => []);
  for (const [a, b] of E) { adj[idx[a]].push(idx[b]); adj[idx[b]].push(idx[a]); }
  let best = null;
  const side = k => k[0] === '0' || k === '1N' || k === '1H' ? 'a' : k === '1CA' ? 'x' : k === '1CB' ? 'b0' : 'c';
  const moves = (u, v) => { const a = side(u), b = side(v); if (a === 'x' || b === 'x') return false; if (a === b) return false; return true; };
  for (let s = 0; s < A.length; s++) {
    const d = A.map(() => 99); d[s] = 0; const q = [s];
    while (q.length) { const u = q.shift(); for (const w of adj[u]) if (d[w] > d[u] + 1) { d[w] = d[u] + 1; q.push(w); } }
    for (let t = s + 1; t < A.length; t++) {
      if (d[t] < 4 || !moves(A[s].k, A[t].k)) continue;
      const key = [A[s].el, A[t].el].sort().join('');
      const lim = LIM[key] ?? 2.8, dd = len3(sub3(A[s].p, A[t].p));
      const score = dd / lim;
      if (!best || score < best.score) best = { a: A[s], b: A[t], d: dd, lim, score };
    }
  }
  return best;
}

const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });
const PX = 1010, CX = 480, CY = 450;

export default {
  id: 'peptide',
  title: { nl: 'Peptidebinding & φ/ψ', en: 'Peptide bond & φ/ψ' },
  scale: '≈ 0,1–1 nm', time: { nl: 'in het ribosoom ≈ 5–6 bindingen/s (mens)', en: 'in the ribosome ≈ 5–6 bonds/s (human)' },
  org: { nl: 'alle organismen', en: 'all organisms' },
  legend: [[ACOL.N, 'N'], [ACOL.O, 'O'], [ACOL.C, 'C, Cα'], [EL.H, 'H'], [EL.CB, { nl: 'Cβ (zijketen)', en: 'Cβ (side chain)' }], ['#5fd3e6', { nl: 'peptidevlak', en: 'peptide plane' }], [C.chain, 'φ (N–Cα)'], [C.trna, 'ψ (Cα–C)']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">De 3D-stappen gebruiken een berekende tripeptide-backbone met ideale bindingslengtes en -hoeken (ω = 180°, trans). φ en ψ van het middelste residu worden echt verdraaid; de rode stippellijn toont telkens het dichtste paar atomen dat minstens vier bindingen uit elkaar ligt.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">The 3D steps use a computed tripeptide backbone with ideal bond lengths and angles (ω = 180°, trans). φ and ψ of the middle residue are really rotated; the red dashed line always shows the closest pair of atoms that are at least four bonds apart.</p>' },
  simplified: {
    nl: 'De condensatie is getekend met neutrale NH₂/COOH-groepen, zoals in de cursus. In de cel vormt het ribosoom de binding anders: de groeiende keten wordt van het peptidyl-tRNA overgedragen op de aminogroep van het aminoacyl-tRNA (netto komt er wel water vrij t.o.v. de vrije aminozuren). Botsingsgrenzen zijn afgeronde contactafstanden.',
    en: 'The condensation is drawn with neutral NH₂/COOH groups, as in the course. In the cell the ribosome forms the bond differently: the growing chain is transferred from the peptidyl-tRNA onto the amino group of the aminoacyl-tRNA (the net result relative to free amino acids is still loss of water). Clash limits are rounded contact distances.' },
  steps: [
    ST(7000, cam(700, 450, 1400), 'Twee aminozuren', 'Two amino acids', 'Glycine en alanine, elk met een aminogroep (links) en een carboxylgroep (rechts).', 'Glycine and alanine, each with an amino group (left) and a carboxyl group (right).'),
    ST(8500, cam(700, 450, 1400), 'Condensatie: er komt water vrij', 'Condensation: water is released', 'De OH van de carboxylgroep en een H van de aminogroep vormen samen H₂O. C en N worden verbonden.', 'The OH of the carboxyl group and an H of the amino group together form H₂O. C and N become linked.'),
    ST(7500, cam(640, 450, 1300), 'De peptidebinding', 'The peptide bond', 'Het resultaat is een amidebinding: de peptidebinding. Het dipeptide Gly-Ala heeft een N-terminus en een C-terminus.', 'The result is an amide bond: the peptide bond. The dipeptide Gly-Ala has an N-terminus and a C-terminus.'),
    ST(8500, FULL, 'Resonantie: een halve dubbele binding', 'Resonance: a partial double bond', 'Het vrije elektronenpaar van N deelt mee met C=O. De C–N-binding krijgt deels een dubbelbindingskarakter en kan niet vrij draaien.', 'The lone pair of N is shared with C=O. The C–N bond gains partial double-bond character and cannot rotate freely.'),
    ST(8500, FULL, 'Vlak en trans: een "blad papier"', 'Planar and trans: a "sheet of paper"', 'Zes atomen (Cα, C, O, N, H, Cα) liggen in één vlak. Bijna altijd trans: beide Cα\'s aan weerszijden.', 'Six atoms (Cα, C, O, N, H, Cα) lie in one plane. Almost always trans: the two Cα atoms on opposite sides.'),
    ST(9000, FULL, 'φ: draaien rond N–Cα', 'φ: rotation about N–Cα', 'Flexibiliteit zit alleen rond Cα. De eerste draaihoek, φ (phi), draait rond de N–Cα-binding.', 'Flexibility only exists around Cα. The first torsion angle, φ (phi), rotates about the N–Cα bond.'),
    ST(9000, FULL, 'ψ: draaien rond Cα–C', 'ψ: rotation about Cα–C', 'De tweede draaihoek, ψ (psi), draait rond de Cα–C-binding. Ezelsbruggetje: phi heeft de N, psi heeft de C.', 'The second torsion angle, ψ (psi), rotates about the Cα–C bond. Mnemonic: phi has the N, psi has the C.'),
    ST(9000, FULL, 'Botsingen beperken φ en ψ', 'Clashes restrict φ and ψ', 'Bij sommige combinaties komen atomen te dicht bij elkaar (rood). Welke φ/ψ wel kunnen, toont de Ramachandran-plot.', 'For some combinations atoms come too close (red). Which φ/ψ are possible is shown by the Ramachandran plot.'),
    ST(8000, cam(800, 430, 1500), 'Backbone: van N- naar C-terminus', 'Backbone: from N- to C-terminus', 'Zo ontstaat een keten: …N–Cα–C… herhaald. Tot ± 50 residuen spreken we van een peptide, daarboven van een polypeptide of eiwit.', 'This is how a chain forms: …N–Cα–C… repeated. Up to ± 50 residues we speak of a peptide, above that of a polypeptide or protein.'),
  ],
  svg() {
    return svgOpen() + `
    <g id="pe-2d"></g>
    <g id="pe-3d"></g>
    <g id="pe-panel"></g>
    <g id="pe-hs-rama" data-node="ramachandran" data-color="#ffc247" data-label="${T2('Alle toegestane φ/ψ: Ramachandran-plot', 'All allowed φ/ψ: Ramachandran plot')}">
      <rect x="${PX + 20}" y="620" width="520" height="54" rx="12" fill="rgba(255,194,71,.10)" stroke="#ffc247"/>
      ${txt(PX + 280, 656, T2('φ/ψ-kaart → Ramachandran-plot', 'φ/ψ map → Ramachandran plot'), '#ffc247', 24)}
      <circle data-anchor="ramachandran" cx="${PX + 280}" cy="620" r="1" fill="none"/>
    </g>
    <g id="pe-hs-sec" data-node="secundair" data-color="${C.prot}" data-label="${T2('Volgende: secundaire structuur', 'Next: secondary structure')}">
      <rect x="1010" y="735" width="520" height="56" rx="12" fill="rgba(155,123,255,.14)" stroke="${C.prot}"/>
      ${txt(1270, 772, T2('Lokale vorm → secundaire structuur', 'Local shape → secondary structure'), C.text, 24)}
      <circle data-anchor="secundair" cx="1270" cy="735" r="1" fill="none"/>
    </g>
    <g id="pe-hs-tl" data-node="elongatie" data-color="${C.rrna}" data-label="${T2('In de cel: het ribosoom', 'In the cell: the ribosome')}">
      <rect x="700" y="712" width="500" height="56" rx="12" fill="rgba(44,198,168,.12)" stroke="${C.rrna}"/>
      ${txt(950, 749, T2('Gevormd in het ribosoom (elongatie)', 'Made in the ribosome (elongation)'), C.rrna, 23)}
      <circle data-anchor="elongatie" cx="950" cy="712" r="1" fill="none"/>
    </g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);

    /* ---- 2D: Gly + Ala → Gly-Ala + H₂O ---- */
    function dipeptide(p1, step) {
      // p1: 0 = los, 1 = gebonden. Ala schuift 180 px naar links.
      const sh = -180 * ease(sub(p1, .45, .9)), y = 450;
      const w = 1 - ease(sub(p1, .3, .6));          // OH en H verdwijnen uit hun plaats
      let s = '';
      // glycine
      s += bd(250, y, 370, y, { sh: 36, sh2: 36 }) + bd(370, y, 490, y, { sh: 36, sh2: 20 }) + bd(490, y, 490, y - 100, { dbl: true, sh: 20, sh2: 20 });
      s += at(230, y, 'H₂N', ACOL.N, 30) + at(370, y, 'CH₂', ACOL.C, 30) + at(490, y, 'C', ACOL.C, 30) + at(490, y - 115, 'O', ACOL.O, 30);
      const hl = step === 1 ? .6 + .4 * Math.sin(p1 * 20) : 0;
      if (w > .01) s += `<g opacity="${f1(w)}">${bd(490, y, 590, y, { sh: 20, sh2: 26 })}${at(610, y, 'OH', ACOL.O, 30)}</g>`;
      // alanine
      const X = 790 + sh;
      if (w > .01) s += `<g opacity="${f1(w)}">${bd(X - 80, y, X, y, { sh: 14, sh2: 20 })}${at(X - 92, y, 'H', ACOL.H, 30)}</g>`;
      s += bd(X, y, X, y + 80, { sh: 20, sh2: 16 }) + at(X, y + 95, 'H', ACOL.H, 28);
      s += bd(X, y, X + 130, y, { sh: 20, sh2: 22 }) + bd(X + 130, y, X + 130, y + 90, { sh: 22, sh2: 22 }) + at(X + 130, y + 108, 'CH₃', CLASSCOL.h, 28);
      s += bd(X + 130, y, X + 260, y, { sh: 22, sh2: 20 }) + bd(X + 260, y, X + 260, y - 100, { dbl: true, sh: 20, sh2: 20 }) + bd(X + 260, y, X + 360, y, { sh: 20, sh2: 26 });
      s += at(X, y, 'N', ACOL.N, 30) + at(X + 130, y, 'CH', ACOL.C, 30) + at(X + 260, y, 'C', ACOL.C, 30) + at(X + 260, y - 115, 'O', ACOL.O, 30) + at(X + 380, y, 'OH', ACOL.O, 30);
      // nieuwe binding
      const b = ease(sub(p1, .7, 1));
      if (b > .01) s += `<g opacity="${f1(b)}">${bd(490, y, X, y, { sh: 20, sh2: 20, col: C.chain, w: 6 })}</g>`;
      // water
      if (step === 1) {
        const k = ease(sub(p1, .3, .75));
        const wx = lerp(650, 640, k), wy = lerp(y + 80, y + 200, k);
        s += `<g opacity="${f1(sub(p1, .3, .45))}">${at(wx, wy, 'H₂O', '#5fd3e6', 34)}</g>`;
        if (p1 < .35) s += `<ellipse cx="${f1((610 + X - 92) / 2)}" cy="${y}" rx="${f1((X - 92 - 610) / 2 + 50)}" ry="34" fill="none" stroke="#5fd3e6" stroke-width="3" stroke-dasharray="7 6" opacity="${f1(.5 + .5 * hl)}"/>`;
      }
      // titels
      if (p1 < .5) s += txt(400, y - 190, 'Glycine (Gly, G)', CLASSCOL.s, 26) + txt(X + 160, y - 190, 'Alanine (Ala, A)', CLASSCOL.h, 26);
      else s += txt(640, y - 190, T2('Dipeptide Gly-Ala', 'Dipeptide Gly-Ala'), C.text, 28);
      return s;
    }
    function peptideUnit(x, y, charged) {
      // trans-peptide-eenheid: Cα1 linksboven, O onder C, H boven N, Cα2 rechtsonder
      let s = '';
      s += bd(x - 170, y - 70, x - 60, y, { sh: 22, sh2: 18 }) + bd(x + 60, y, x + 170, y + 70, { sh: 18, sh2: 22 });
      s += bd(x - 60, y, x - 60, y + 100, { dbl: !charged, sh: 18, sh2: 20 }) + bd(x + 60, y, x + 60, y - 95, { sh: 18, sh2: 16 });
      s += bd(x - 60, y, x + 60, y, { dbl: charged, sh: 18, sh2: 18 });
      s += at(x - 185, y - 80, 'Cα', '#fff', 28) + at(x - 60, y, 'C', ACOL.C, 30) + at(x - 60, y + 116, charged ? 'O⁻' : 'O', ACOL.O, 30) + at(x + 60, y, charged ? 'N⁺' : 'N', ACOL.N, 30) + at(x + 60, y - 110, 'H', ACOL.H, 28) + at(x + 185, y + 80, 'Cα', '#fff', 28);
      return s;
    }

    /* ---- 3D: tripeptide ---- */
    const base = chain({});
    const F = frameAlong(sub3([base[2].at.CA.x, base[2].at.CA.y, base[2].at.CA.z], [base[0].at.CA.x, base[0].at.CA.y, base[0].at.CA.z]), [0, 0, 1]);
    const cen = centroid([0, 1, 2].map(i => [base[i].at.CA.x, base[i].at.CA.y, base[i].at.CA.z]));
    const Pp = a => [a.x, a.y, a.z];
    function draw3d(phi1, psi1, mode, t) {
      const R = chain({ phi1, psi1 });
      const M = mm(rotX(-0.5 + 0.15 * Math.sin(t * 0.0004)), F);
      const pr = projector(M, cen, 78, CX, CY, .02);
      let s = '';
      // peptidevlakken (Cα0, H1, Cα1, O0) en (Cα1, H2, Cα2, O1)
      const plane = (a, h, b, o, col) => { const pts = [a, h, b, o].map(p => pr(p)); return [pts.reduce((q, p) => q + p[2], 0) / 4, `<path d="M${pts.map(p => f1(p[0]) + ',' + f1(p[1])).join(' L')}Z" fill="${col}" fill-opacity=".16" stroke="${col}" stroke-width="2.5" stroke-opacity=".7"/>`]; };
      const pl = [plane(Pp(R[0].at.CA), R[1].H, Pp(R[1].at.CA), Pp(R[0].at.O), '#5fd3e6'), plane(Pp(R[1].at.CA), R[2].H, Pp(R[2].at.CA), Pp(R[1].at.O), '#5fd3e6')].sort((a, b) => a[0] - b[0]);
      s += pl.map(p => p[1]).join('');
      const r = ballStick(R, [0, 1, 2], pr, { cb: true, scale: 1.7 });
      s += r.svg;
      // draai-as
      const axis = (a, b, col) => { const A = pr(a), B = pr(b); return `<line x1="${f1(A[0])}" y1="${f1(A[1])}" x2="${f1(B[0])}" y2="${f1(B[1])}" stroke="${col}" stroke-width="11" stroke-linecap="round" opacity=".85"/>`; };
      if (mode === 'phi' || mode === 'clash') s += axis(Pp(R[1].at.N), Pp(R[1].at.CA), C.chain);
      if (mode === 'psi' || mode === 'clash') s += axis(Pp(R[1].at.CA), Pp(R[1].at.C), C.trna);
      const tag = (p, str, col, dx = 0, dy = -26) => { const q = pr(p); return `<text x="${f1(q[0] + dx)}" y="${f1(q[1] + dy)}" font-size="22" text-anchor="middle" fill="${col}" font-family="Inter" font-weight="700" paint-order="stroke" stroke="#070b16" stroke-width="5">${str}</text>`; };
      s += tag(Pp(R[1].at.CA), 'Cα', '#fff', 0, -30) + tag(Pp(R[1].at.N), 'N', ACOL.N, -24, 8) + tag(Pp(R[1].at.C), 'C', '#dfe6f3', 24, 8);
      let info = null;
      if (mode === 'clash') {
        info = clash(R);
        const A = pr(info.a.p), B = pr(info.b.p), bad = info.d < info.lim;
        s += `<line x1="${f1(A[0])}" y1="${f1(A[1])}" x2="${f1(B[0])}" y2="${f1(B[1])}" stroke="${bad ? C.danger : '#93a0bb'}" stroke-width="4" stroke-dasharray="8 6"/>`;
        if (bad) s += `<circle cx="${f1((A[0] + B[0]) / 2)}" cy="${f1((A[1] + B[1]) / 2)}" r="${f1(Math.hypot(A[0] - B[0], A[1] - B[1]) / 2 + 26)}" fill="${C.danger}" fill-opacity=".12" stroke="${C.danger}" stroke-width="3"/>`;
      }
      return { s, info };
    }
    const dial = (x, y, val, col, name, axisName) => {
      const a = rad(val) - Math.PI / 2, r = 56;
      return `<circle cx="${x}" cy="${y}" r="${r}" fill="#0f1830" stroke="#2a3550" stroke-width="3"/>` +
        `<line x1="${x}" y1="${y}" x2="${f1(x + r * Math.cos(a))}" y2="${f1(y + r * Math.sin(a))}" stroke="${col}" stroke-width="6" stroke-linecap="round"/>` +
        txt(x, y - r - 14, name, col, 28) + `<text x="${x + r + 22}" y="${y + 10}" font-size="30" fill="${col}" font-family="JetBrains Mono" font-weight="700">${(val > 0 ? '+' : val < 0 ? '−' : '') + Math.abs(Math.round(val))}°</text>` +
        txt(x + r + 22, y + 44, axisName, C.muted, 24, 'start');
    };
    const box = inner => `<rect x="${PX}" y="130" width="560" height="570" rx="18" fill="#0d1426" stroke="#2a3550" stroke-width="2"/>${inner}`;

    return {
      update(t, s) {
        const { step, p } = s;
        let d2 = '', d3 = '', pan = '';
        $('pe-hs-rama').setAttribute('opacity', step === 7 ? 1 : 0);
        $('pe-hs-sec').setAttribute('opacity', step === 8 ? 1 : 0);
        $('pe-hs-tl').setAttribute('opacity', step === 2 ? 1 : 0);
        if (step <= 2) {
          d2 = dipeptide(step === 0 ? 0 : step === 1 ? p : 1, step);
          if (step === 2) {
            const k = ease(sub(p, .05, .3));
            d2 += `<g opacity="${f1(k)}"><rect x="455" y="385" width="190" height="130" rx="16" fill="none" stroke="${C.chain}" stroke-width="3" stroke-dasharray="8 6"/>` +
              txt(550, 600, T2('peptidebinding (amide)', 'peptide bond (amide)'), C.chain, 24) +
              txt(215, 395, T2('N-terminus', 'N-terminus'), ACOL.N, 24) + txt(1070, 395, T2('C-terminus', 'C-terminus'), ACOL.O, 24) +
              `<path d="M260,640 H1060" stroke="${C.muted}" stroke-width="3" marker-end="url(#arrow)"/>` + txt(660, 674, T2('leesrichting van een sequentie: N → C', 'reading direction of a sequence: N → C'), C.muted, 23) + '</g>';
          }
        } else if (step === 3) {
          // het gedeelde π-systeem O–C–N (waarover de elektronen verdeeld zijn) als band achter beide vormen
          const band = x => `<path d="M${x - 60},${440 + 116} L${x - 60},440 L${x + 60},440" stroke="#5fd3e6" stroke-width="64" stroke-opacity=".22" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
          d2 = txt(800, 175, T2('twee resonantievormen van dezelfde binding', 'two resonance forms of the same bond'), C.muted, 22) +
            band(430) + band(1170) +
            peptideUnit(430, 440, false) + peptideUnit(1170, 440, true) + txt(800, 452, '⟷', '#fff', 60) +
            `<g opacity="${f1(ease(sub(p, .1, .35)))}">` + txt(800, 640, T2('C–N ≈ 1,32 Å: tussen een enkele (≈ 1,47 Å) en een dubbele binding (≈ 1,27 Å)', 'C–N ≈ 1.32 Å: between a single (≈ 1.47 Å) and a double bond (≈ 1.27 Å)'), C.text, 22) +
            txt(800, 680, T2('→ geen vrije draaiing rond de C–N-binding', '→ no free rotation about the C–N bond'), C.chain, 22) + '</g>';
        } else if (step === 4) {
          // het vlak staat er van bij het begin (sluit aan op de band O–C–N van de vorige stap) en wordt dan duidelijker
          const k = ease(sub(p, 0, .3));
          d2 = `<path d="M${430 - 230},${440 - 60} L${430 + 90},${440 - 170} L${430 + 230},${440 + 60} L${430 - 90},${440 + 170}Z" fill="#5fd3e6" fill-opacity="${(.15 + .08 * k).toFixed(3)}" stroke="#5fd3e6" stroke-width="3" stroke-opacity="${f1(.5 + .5 * k)}"/>` +
            peptideUnit(430, 440, false) + txt(430, 680, T2('6 atomen in één vlak ("blad papier")', '6 atoms in one plane ("sheet of paper")'), '#5fd3e6', 22);
          const mini = (x, y, cis, label, sub2) => `<g opacity="${f1(ease(cis ? sub(p, .4, .65) : sub(p, .08, .35)))}">` + bd(x - 40, y, x + 40, y, { sh: 14, sh2: 14, w: 4 }) + at(x - 40, y, 'C', ACOL.C, 24) + at(x + 40, y, 'N', ACOL.N, 24) +
            bd(x - 40, y, x - 95, y - 55, { sh: 14, sh2: 16 }) + at(x - 105, y - 64, 'Cα', '#fff', 22) +
            bd(x + 40, y, x + 95, cis ? y - 55 : y + 55, { sh: 14, sh2: 16 }) + at(x + 105, cis ? y - 64 : y + 64, 'Cα', '#fff', 22) +
            txt(x, y + 112, label, cis ? C.muted : C.chain, 26) + txt(x, y + 146, sub2, C.muted, 22) + '</g>';
          d2 += mini(1060, 360, false, 'trans', T2('bijna altijd', 'almost always')) + mini(1360, 360, true, 'cis', T2('zeldzaam, vooral vóór Pro', 'rare, mostly before Pro'));
        } else if (step <= 7) {
          let phi = -60, psi = -45, mode = 'phi';
          if (step === 5) { phi = -60 + 180 * Math.sin(p * Math.PI * 2) * ease(sub(p, 0, .15)); }
          if (step === 6) { mode = 'psi'; psi = -45 + 180 * Math.sin(p * Math.PI * 2) * ease(sub(p, 0, .15)); }
          if (step === 7) {
            mode = 'clash';
            // pad: α-helix → β → verboden (φ > 0 met grote ψ) → terug
            const path = [[-60, -45], [-120, 130], [60, -120], [0, 0], [-60, -45]];
            const k = clamp(p) * (path.length - 1), i = Math.min(path.length - 2, Math.floor(k)), f = ease(k - i);
            phi = lerp(path[i][0], path[i + 1][0], f); psi = lerp(path[i][1], path[i + 1][1], f);
          }
          const r = draw3d(phi, psi, mode, t);
          d3 = r.s;
          pan = box(dial(PX + 120, 260, phi, C.chain, 'φ', 'N–Cα') + dial(PX + 120, 430, psi, C.trna, 'ψ', 'Cα–C') +
            (step === 7 && r.info ? (() => {
              const bad = r.info.d < r.info.lim, nm = x => x.k.replace(/^(\d)(.*)$/, (m, i, a) => `${a.replace('CB', 'Cβ').replace('CA', 'Cα')}(${['i−1', 'i', 'i+1'][+i]})`);
              return txt(PX + 280, 520, `${nm(r.info.a)} ··· ${nm(r.info.b)}`, bad ? C.danger : C.text, 24, 'middle') +
                txt(PX + 280, 562, `${r.info.d.toFixed(1).replace('.', L({ nl: ',', en: '.' }))} Å ${bad ? T2('→ botsing!', '→ clash!') : T2('→ vrij', '→ free')}`, bad ? C.danger : C.ok, 24, 'middle');
            })() : txt(PX + 280, 560, step === 5 ? T2('phi heeft de N', 'phi has the N') : T2('psi heeft de C', 'psi has the C'), step === 5 ? C.chain : C.trna, 26)));
        } else {
          // tetrapeptide N → C
          const y = 430, xs = [200, 530, 860, 1190];
          let sct = '';
          const aa = ['R₁', 'R₂', 'R₃', 'R₄'];
          xs.forEach((x, i) => {
            sct += bd(x, y, x + 100, y - 40, { sh: 26, sh2: 24 }) + bd(x + 100, y - 40, x + 200, y, { sh: 24, sh2: 20 }) + bd(x + 200, y, x + 200, y + 85, { dbl: true, sh: 20, sh2: 20 });
            sct += bd(x + 100, y - 40, x + 100, y - 120, { sh: 24, sh2: 26 }) + `<circle cx="${x + 100}" cy="${y - 142}" r="26" fill="${[CLASSCOL.h, CLASSCOL.p, CLASSCOL['+'], CLASSCOL['-']][i]}"/>` + txt(x + 100, y - 134, aa[i], '#0a1224', 22, 'middle', 800);
            sct += at(i === 0 ? x - 18 : x, y, i === 0 ? 'H₃N⁺' : 'N', ACOL.N, 28) + at(x + 100, y - 40, 'Cα', '#fff', 26) + at(x + 200, y, 'C', ACOL.C, 28) + at(x + 200, y + 100, 'O', ACOL.O, 26);
            if (i > 0) sct += bd(x, y, x, y + 70, { sh: 20, sh2: 14 }) + at(x, y + 84, 'H', ACOL.H, 24) + bd(x - 130, y, x, y, { sh: 20, sh2: 20, col: C.chain, w: 6 });
          });
          sct += bd(1390, y, 1470, y - 40, { sh: 20, sh2: 26 }) + at(1492, y - 44, 'O⁻', ACOL.O, 28);
          const k = ease(sub(p, .2, .5));
          sct += `<g opacity="${f1(k)}"><path d="M200,${y + 170} H1480" stroke="${C.muted}" stroke-width="3" marker-end="url(#arrow)"/>` +
            txt(200, y + 210, 'N-terminus', ACOL.N, 24, 'start') + txt(1480, y + 210, 'C-terminus', ACOL.O, 24, 'end') + txt(840, y + 210, T2('backbone: …N–Cα–C…N–Cα–C…', 'backbone: …N–Cα–C…N–Cα–C…'), C.text, 22) +
            txt(840, y - 230, T2('elk aminozuur in de keten = een residu', 'each amino acid in the chain = a residue'), C.muted, 22) + '</g>';
          d2 = sct;
        }
        $('pe-2d').innerHTML = d2; $('pe-3d').innerHTML = d3; $('pe-panel').innerHTML = pan;
      },
    };
  },
};
