import { C, T2, svgOpen, cam, FULL, f1, lerp, rng, squiggle } from '../../kit.js';
import { T, K, track, bilayer, nucEnv, dna, mrna, egf, adr, cort, gpcr7, egfr, gr, grBound, hsp90, bead, cAMP, anchor,
  EGFC, ADRC, CORTC, GTPC, HSPC, GAC, GBC } from './_sig1.js';

/* Verhaallijn 2, hoofdstuk 1: overzicht. Eerst de cel uit het hoofdstuk 'cel', dan inzoomen op het plasmamembraan.
 * Detailbeeld: membraan y 300–364, cytosol tot 746, kernenvelop y 760, DNA y 850. Kolommen: EGF/EGFR (x 330),
 * adrenaline/β2AR (x 800), cortisol/GR (x 1270). */
const MY = 300, MH = 64, NY = 740, DY = 870;
const XA = 330, XB = 800, XC = 1270;
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

/* vereenvoudigde versie van dezelfde epitheelcel als in het hoofdstuk 'cel' (zelfde vorm en organellen, zonder virussen) */
function miniCell() {
  const r = rng(7);
  const nx = 790, ny = 470, nr = 150;
  const P = (a, rad) => [nx + Math.cos(a * Math.PI / 180) * rad, ny + Math.sin(a * Math.PI / 180) * rad];
  let mem = '';
  for (let a = 0; a <= 360; a += 3) {
    const w = 1 + .06 * Math.sin(a * 3 * Math.PI / 180) + .03 * Math.sin(a * 7 * Math.PI / 180);
    mem += `${a ? 'L' : 'M'}${f1(800 + Math.cos(a * Math.PI / 180) * 560 * w)},${f1(460 + Math.sin(a * Math.PI / 180) * 360 * w)}`;
  }
  mem += 'Z';
  let chrom = '';
  for (let i = 0; i < 18; i++) {
    const a = r() * 6.28, d = r() * nr * .7;
    chrom += `<path d="${squiggle(r, nx + Math.cos(a) * d, ny + Math.sin(a) * d, 7, 10, 10)}" stroke="${C.dna}" stroke-width="2.2" fill="none" opacity="${f1(.35 + r() * .45)}"/>`;
  }
  let pores = '';
  for (let a = 0; a < 360; a += 20) { const [x, y] = P(a, nr); pores += `<rect x="${f1(x - 4)}" y="${f1(y - 7)}" width="8" height="14" rx="3" fill="#0a1224" stroke="${C.prot}" stroke-width="1.2" transform="rotate(${a} ${f1(x)} ${f1(y)})"/>`; }
  let er = '';
  for (let k = 0; k < 4; k++) {
    const rad = nr + 30 + k * 26; let d = '';
    for (let a = -50; a <= 150; a += 4) { const t = a * Math.PI / 180, w = rad + Math.sin(a * .35 + k) * 6; d += `${a === -50 ? 'M' : 'L'}${f1(nx + Math.cos(t) * w)},${f1(ny + Math.sin(t) * w)}`; }
    er += `<path d="${d}" stroke="#8fb3e8" stroke-width="5" fill="none" opacity=".45" stroke-linecap="round"/>`;
  }
  const mito = [[1120, 250, 20], [1230, 520, -60], [1040, 740, 10], [470, 560, 70], [620, 740, -20], [980, 170, -10]]
    .map(([x, y, rot]) => `<g transform="translate(${x} ${y}) rotate(${rot})"><ellipse rx="34" ry="15" fill="#5a3f36" stroke="#a37565" stroke-width="1.5"/><path d="M-24,0 q4,-10 8,0 t8,0 t8,0 t8,0 t8,0 t8,0" stroke="#d09a85" stroke-width="1.5" fill="none"/></g>`).join('');
  const lyso = [[1300, 380], [430, 460], [1180, 660]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="16" fill="#3d2a5c" stroke="#8d6cc4" stroke-width="1.5"/>`).join('');
  /* receptoren als stipjes op het membraan (bovenkant) */
  let recs = '';
  for (let a = 200; a <= 340; a += 7) {
    const w = 1 + .06 * Math.sin(a * 3 * Math.PI / 180) + .03 * Math.sin(a * 7 * Math.PI / 180);
    const x = 800 + Math.cos(a * Math.PI / 180) * 566 * w, y = 460 + Math.sin(a * Math.PI / 180) * 366 * w;
    recs += `<circle cx="${f1(x)}" cy="${f1(y)}" r="3" fill="${C.prot}"/>`;
  }
  return `<path d="${mem}" fill="url(#gCyto)" stroke="${C.mem}" stroke-width="9" stroke-linejoin="round"/>
    ${er}${mito}${lyso}
    <g transform="translate(600 610)" opacity=".85">${[0, 10, 20, 30].map(o => `<path d="M${-46 + o / 2},${o} Q0,${o - 18} ${46 - o / 2},${o}" stroke="#d7b46a" stroke-width="5.5" fill="none" stroke-linecap="round"/>`).join('')}</g>
    <circle cx="${nx}" cy="${ny}" r="${nr + 5}" fill="none" stroke="#7aa0d8" stroke-width="2.5" opacity=".7"/>
    <circle cx="${nx}" cy="${ny}" r="${nr}" fill="url(#gNuc)" stroke="#9cc0ff" stroke-width="2"/>
    <ellipse cx="${nx + 35}" cy="${ny - 20}" rx="46" ry="38" fill="#2b3e66" opacity=".9"/>${chrom}${pores}${recs}`;
}
/* bovenkant van het celmembraan (a = 270°) — hierop zoomen we in */
const CELL_TOP = 460 - 360 * (1 + .06 * Math.sin(810 * Math.PI / 180) + .03 * Math.sin(1890 * Math.PI / 180));

export default {
  id: 'signaal',
  title: { nl: 'Signaalmolecule & receptor', en: 'Cell signalling' },
  scale: { nl: 'cel ≈ 20 µm → membraan ≈ 5 nm dik', en: 'cell ≈ 20 µm → membrane ≈ 5 nm thick' },
  time: { nl: 'seconden (receptor) tot minuten (genen aan)', en: 'seconds (receptor) to minutes (genes on)' },
  org: { nl: 'menselijke epitheelcel', en: 'human epithelial cell' },
  legend: [[EGFC, { nl: 'EGF (groeifactor, peptide)', en: 'EGF (growth factor, peptide)' }], [ADRC, 'adrenaline'], [CORTC, { nl: 'cortisol (steroïdhormoon)', en: 'cortisol (steroid hormone)' }],
    [C.prot, { nl: 'receptoren en signaaleiwitten', en: 'receptors and signalling proteins' }], [GAC, { nl: 'G-eiwit (Gs)', en: 'G protein (Gs)' }], [GTPC, 'cAMP'], [HSPC, 'Hsp90'],
    [C.mem, { nl: 'lipidendubbellaag', en: 'lipid bilayer' }], [C.dna, 'DNA'], [C.rna, 'mRNA']],
  simplified: {
    nl: 'De drie routes staan naast elkaar in één cel; in werkelijkheid heeft niet elke cel alle drie de receptoren en werken ze los van elkaar. Moleculen zijn niet op schaal en sterk vergroot ten opzichte van de cel. Van elke route tonen we alleen de hoofdlijn: bv. Ras is een GTPase (geen kinase) aan het membraan, adenylylcyclase en PKA staan symbolisch, en GR bindt het DNA als dimeer (we tekenen de tweede GR er gewoon bij). Echte signalen zijn netwerken met terugkoppeling en overspraak.',
    en: 'The three routes are shown side by side in one cell; in reality not every cell has all three receptors, and they work independently. Molecules are not to scale and greatly enlarged relative to the cell. For each route we show only the main line: e.g. Ras is a membrane-bound GTPase (not a kinase), adenylyl cyclase and PKA are symbolic, and GR binds DNA as a dimer (we simply add the second GR). Real signalling forms networks with feedback and crosstalk.' },
  steps: [
    ST(7000, FULL, 'Cellen praten met signaalmoleculen', 'Cells talk with signal molecules',
      'Hormonen, groeifactoren en neurotransmitters dragen boodschappen tussen cellen. Ook deze epitheelcel krijgt er voortdurend binnen.',
      'Hormones, growth factors and neurotransmitters carry messages between cells. This epithelial cell receives them all the time.'),
    ST(7500, FULL, 'Inzoomen op het plasmamembraan', 'Zooming in on the plasma membrane',
      'Het plasmamembraan is een lipidendubbellaag met een vettige (hydrofobe) kern. Wat een signaal doet, hangt af van of het daardoor kan.',
      'The plasma membrane is a lipid bilayer with an oily (hydrophobic) core. What a signal does depends on whether it can cross it.'),
    ST(8000, cam(560, 420, 1200), 'Hydrofiele signalen blijven buiten', 'Hydrophilic signals stay outside',
      'EGF (een peptide) en adrenaline zijn wateroplosbaar en kunnen niet door de bilaag. Ze binden een receptor op het celoppervlak: alleen cellen met die receptor reageren.',
      'EGF (a peptide) and adrenaline are water-soluble and cannot cross the bilayer. They bind a receptor on the cell surface: only cells with that receptor respond.'),
    ST(8000, cam(1150, 440, 1150), 'Lipofiele signalen gaan erdoorheen', 'Lipophilic signals pass through',
      'Cortisol is een steroïdhormoon, gemaakt uit cholesterol. Het diffundeert door het membraan en bindt een receptor in de cel: de glucocorticoïdreceptor (GR).',
      'Cortisol is a steroid hormone, made from cholesterol. It diffuses through the membrane and binds a receptor inside the cell: the glucocorticoid receptor (GR).'),
    ST(7000, FULL, 'Drie strategieën', 'Three strategies',
      'Receptortyrosinekinase, G-eiwitgekoppelde receptor en kernreceptor. Klik op een label om die route in detail te bekijken.',
      'Receptor tyrosine kinase, G protein-coupled receptor and nuclear receptor. Click a label to see that route in detail.'),
    ST(8500, FULL, 'Signaal → receptor → doorgeven → antwoord', 'Signal → receptor → relay → response',
      'In de cel geven eiwitten het signaal door en versterken het: één actieve receptor zet vele moleculen aan (kinasen, cAMP).',
      'Inside the cell, proteins relay and amplify the signal: one active receptor switches on many molecules (kinases, cAMP).'),
    ST(8000, cam(800, 690, 1300), 'Tot in de kern', 'All the way to the nucleus',
      'Om genen aan te zetten moet het signaal de kern bereiken. Daar binden transcriptiefactoren het DNA en wordt mRNA gemaakt.',
      'To switch genes on, the signal must reach the nucleus. There, transcription factors bind the DNA and mRNA is made.'),
    ST(8000, cam(440, 470, 1150), 'Wij volgen EGF', 'We follow EGF',
      'Verhaal 2 volgt EGF: via de EGF-receptor en de Ras–MAPK-cascade gaat het gen FOS aan. Het eiwit dat we maken is c-Fos.',
      'Story 2 follows EGF: via the EGF receptor and the Ras–MAPK cascade the gene FOS is switched on. The protein we make is c-Fos.'),
  ],

  svg() {
    return svgOpen() + `
    <g id="sg-detail" opacity="0">
      <rect x="-600" y="-600" width="2800" height="${MY + 610}" fill="#0b1226"/>
      <rect x="-600" y="${MY + MH - 4}" width="2800" height="${NY - MY - MH + 8}" fill="url(#gCyto)"/>
      <rect x="-600" y="${NY + 14}" width="2800" height="900" fill="url(#gNuc)"/>
      ${bilayer(-600, 2200, MY, { h: MH, skip: [[XB - 75, XB + 75], [960, 1010]] })}
      ${nucEnv(-600, 2200, NY, [-80, XA, XB, XC, 1700])}
      ${dna(-600, 2200, DY)}
      ${T(1585, 60, T2('buiten de cel', 'outside the cell'), { size: 24, col: C.muted, anchor: 'end', w: 500 })}
      ${T(1585, 700, 'cytosol', { size: 24, col: C.muted, anchor: 'end', w: 500 })}
      ${T(180, 1005, T2('celkern', 'nucleus'), { size: 26, col: '#9cc0ff', anchor: 'start', w: 600 })}
      <g id="sg-genes"></g>
      <g id="sg-A"></g><g id="sg-B"></g><g id="sg-C"></g>
      <g id="sg-lab"></g>
      <g id="sg-hot" opacity="0">
        <g data-node="rtk" data-color="${EGFC}" data-label="${T2('Receptortyrosinekinase (EGF) →', 'Receptor tyrosine kinase (EGF) →')}">
          <rect x="${XA - 150}" y="140" width="300" height="360" fill="transparent"/>${anchor('rtk', XA, 215)}</g>
        <g data-node="gpcr" data-color="${ADRC}" data-label="${T2('G-eiwitgekoppelde receptor', 'G protein-coupled receptor')}">
          <rect x="${XB - 150}" y="140" width="300" height="360" fill="transparent"/>${anchor('gpcr', XB, 215)}</g>
        <g data-node="steroid" data-color="${CORTC}" data-label="${T2('Kernreceptor (cortisol)', 'Nuclear receptor (cortisol)')}">
          <rect x="${XC - 150}" y="140" width="300" height="500" fill="transparent"/>${anchor('steroid', XC, 215)}</g>
      </g>
    </g>
    <g id="sg-cell"><g id="sg-cellz">${miniCell()}</g></g>
    <g id="sg-sig"></g>
    <g id="sg-lab0"></g>
    </svg>`;
  },

  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const g = s.step + s.p;
        const tt = t / 1000;

        /* ---------- zoom van cel naar membraan (stap 1) ---------- */
        const u = K(g, 1.05, 1.8);
        const z = Math.pow(7.5, u), ay = lerp(CELL_TOP, MY + MH / 2, u);
        $('sg-cellz').setAttribute('transform', `translate(800 ${f1(ay)}) scale(${z.toFixed(3)}) translate(-800 ${f1(-CELL_TOP)})`);
        const cellOp = 1 - K(u, .72, 1);
        $('sg-cell').setAttribute('opacity', f1(cellOp));
        $('sg-cell').style.display = cellOp < .01 ? 'none' : '';
        const detOp = K(u, .5, .92);
        $('sg-detail').setAttribute('opacity', f1(detOp));

        /* ---------- signaalmoleculen ---------- */
        const wob = (k, a = 4) => Math.sin(tt * .9 + k) * a;
        // [g, x, y, schaal]
        const e1 = track(g, [[0, 90, 330, 1], [.9, 190, 300, 1], [1.1, 190, 300, 1], [1.8, 285, 175, 1.3], [2.1, 285, 175, 1.3], [2.5, 259, 222, 1.3], [2.85, 282, 222, 1.3]]);
        const e2 = track(g, [[0, 150, 190, 1], [.9, 250, 225, 1], [1.1, 250, 225, 1], [1.8, 375, 150, 1.3], [2.15, 375, 150, 1.3], [2.55, 401, 222, 1.3], [2.85, 378, 222, 1.3]]);
        const a1 = track(g, [[0, 560, 30, 1], [.9, 500, 105, 1], [1.1, 500, 105, 1], [1.8, 800, 165, 1.3], [2.1, 800, 165, 1.3], [2.6, 800, 283, 1.05]]);
        const a2 = track(g, [[0, 300, 90, 1], [.9, 390, 160, 1], [1.1, 390, 160, 1], [1.8, 575, 180, 1.3], [2.12, 575, 180, 1.3], [2.4, 575, 262, 1.3], [2.8, 545, 185, 1.3]]);
        const c1 = track(g, [[0, 1500, 110, 1], [.9, 1400, 190, 1], [1.1, 1400, 190, 1], [1.8, 1270, 170, 1.3], [3.05, 1270, 170, 1.3], [3.35, 1270, 332, 1.2], [3.62, 1236, 470, 1.1], [3.82, 1270, 562, .84]]);
        let sg = '';
        sg += egf(e1[0], e1[1] + (g < 2.1 ? wob(1) : 0), e1[2]);
        sg += egf(e2[0], e2[1] + (g < 2.15 ? wob(2) : 0), e2[2]);
        sg += adr(a1[0], a1[1] + (g < 2.1 ? wob(3) : 0), a1[2]);
        sg += adr(a2[0], a2[1] + wob(4, g > 2.8 || g < 2.1 ? 4 : 0), a2[2], 1 - K(g, 3.0, 3.3));
        const cFree = 1 - K(g, 3.8, 3.84);
        sg += cort(c1[0], c1[1] + (g < 3.05 ? wob(5) : 0), c1[2], cFree);
        $('sg-sig').innerHTML = sg;

        /* stap 0: namen bij de moleculen (in beeld van de hele cel) */
        const l0 = K(g, .35, .8) * (1 - K(g, 1.05, 1.3));
        $('sg-lab0').innerHTML = l0 > .01 ? T(165, 380, 'EGF', { size: 26, col: EGFC, op: l0 }) + T(470, 58, 'adrenaline', { size: 26, col: ADRC, op: l0 }) +
          T(1440, 140, 'cortisol', { size: 26, col: CORTC, op: l0 }) : '';

        /* ---------- kolom A: EGF-receptor ---------- */
        const dimA = 1;                                          // kolom A blijft helder (wij volgen EGF)
        const rx1 = track(g, [[2.5, XA - 45], [2.85, XA - 22]])[0], rx2 = track(g, [[2.55, XA + 45], [2.85, XA + 22]])[0];
        const pA = K(g, 5.05, 5.25);
        let A = '';
        if (g >= 7.05) A += `<ellipse cx="${XA}" cy="${MY + 30}" rx="${f1(150)}" ry="210" fill="${EGFC}" opacity="${f1(.07 * K(g, 7.05, 7.4))}"/>`;
        A += egfr(rx1, MY, MH, dimA, pA) + egfr(rx2, MY, MH, dimA, pA);
        const beads = [['Ras', 500, 5.15], ['Raf', 550, 5.3], ['MEK', 600, 5.45], ['ERK', 650, 5.6]];
        beads.forEach(([lab, y, g0], i) => {
          const op = K(g, g0, g0 + .15);
          if (op <= .01) return;
          let x = XA, yy = y;
          if (lab === 'ERK') { const q = track(g, [[6.05, XA, 650], [6.3, XA, NY], [6.5, XA + 62, DY - 40]]); x = q[0]; yy = q[1]; }
          if (i) A += `<path d="M${XA},${beads[i - 1][1] + 23}L${XA},${y - 23}" stroke="${C.prot}" stroke-width="3" opacity="${f1(op * (lab === 'ERK' && g > 6.05 ? 1 - K(g, 6.05, 6.2) : 1))}"/>`;
          A += bead(x, yy, 23, lab === 'Ras' ? '#8fa8ff' : C.prot, lab, op, 17);
        });
        $('sg-A').innerHTML = A;

        /* ---------- kolom B: β2-adrenerge receptor ---------- */
        const dimB = 1 - .78 * K(g, 7.05, 7.4);
        const tilt = 10 * K(g, 2.55, 2.85);
        let B = gpcr7(XB, MY, MH, tilt, 1);
        // adenylylcyclase (2 × 6 TM, symbolisch) + katalytisch deel
        B += `<g opacity=".95">${[964, 976, 988].map(x => `<rect x="${x - 4}" y="${MY - 10}" width="9" height="${MH + 20}" rx="4" fill="#b58cff" fill-opacity=".55" stroke="#b58cff" stroke-width="1.5"/>`).join('')}` +
          `<ellipse cx="985" cy="${MY + MH + 36}" rx="34" ry="24" fill="#b58cff" fill-opacity=".3" stroke="#b58cff" stroke-width="3"/>` +
          `<text x="985" y="${MY + MH + 42}" font-size="16" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="700">AC</text></g>`;
        const gs = track(g, [[5.1, 880, 418], [5.35, 985, 470]]);
        B += `<ellipse cx="920" cy="422" rx="22" ry="20" fill="${GBC}" fill-opacity=".35" stroke="${GBC}" stroke-width="3"/>`;
        B += `<ellipse cx="${f1(gs[0])}" cy="${f1(gs[1])}" rx="38" ry="27" fill="${GAC}" fill-opacity=".35" stroke="${GAC}" stroke-width="3"/>` +
          `<text x="${f1(gs[0])}" y="${f1(gs[1] + 6)}" font-size="17" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="700">Gαs</text>`;
        const nC = Math.round(16 * K(g, 5.35, 5.8));
        for (let i = 0; i < nC; i++) {
          const ang = i * 2.39996, rr = 34 + (i % 5) * 16;
          B += cAMP(990 + Math.cos(ang) * rr * 1.25, 575 + Math.sin(ang) * rr * .6 + Math.sin(tt * 1.2 + i) * 3, .95, 9);
        }
        const pkaOp = K(g, 5.7, 5.9);
        const pk = track(g, [[6.05, 900, 670], [6.3, XB, NY], [6.5, XB + 62, DY - 40]]);
        if (pkaOp > .01) B += bead(pk[0], pk[1], 25, C.prot, 'PKA', pkaOp, 17);
        $('sg-B').innerHTML = `<g opacity="${f1(dimB)}">${B}</g>`;

        /* ---------- kolom C: cortisol → GR ---------- */
        const dimC = 1 - .78 * K(g, 7.05, 7.4);
        const lig = K(g, 3.8, 3.84), conf = K(g, 3.82, 4);
        const grp = track(g, [[5.3, 1240, 562], [5.8, XC, 640], [6.05, XC, 640], [6.3, XC, NY], [6.45, XC + 40, DY - 70]]);
        const hs = track(g, [[3.82, 1270, 552, 1], [3.98, 1410, 612, .45], [5.0, 1410, 612, .45], [5.3, 1440, 640, 0]]);
        let Cc = hsp90(hs[0], hs[1], hs[2], conf);
        const bnd = K(g, 6.42, 6.6);
        Cc += gr(grp[0], grp[1], { lig: lig * (.4 + .6 * conf), sc: 1.4 - .5 * K(g, 6.3, 6.45), op: 1 - bnd });
        Cc += grBound(XC + 40, -1, DY, bnd, .7) + grBound(XC + 82, 1, DY, K(g, 6.5, 6.7), .7);
        $('sg-C').innerHTML = `<g opacity="${f1(dimC)}">${Cc}</g>`;

        /* ---------- genen aan ---------- */
        let G = '';
        for (const [x, d] of [[XA, 0], [XB, .1], [XC, .2]]) {
          const k = K(g, 6.5 + d, 6.95 + d * .5);
          const dm = x === XA ? 1 : dimB;
          G += `<rect x="${x + (x === XC ? 150 : 100)}" y="${DY - 22}" width="120" height="44" rx="10" fill="#ffffff" opacity="${f1(.12 * k * dm)}"/>`;
          G += mrna(x + (x === XC ? 165 : 115), DY - 20, k, 130, dm);
        }
        $('sg-genes').innerHTML = G;

        /* ---------- labels ---------- */
        let lb = '';
        const l1 = K(g, 1.8, 1.97) * (1 - K(g, 2.0, 2.15));
        if (l1 > .01) lb += T(580, 424, T2('plasmamembraan', 'plasma membrane'), { size: 28, col: C.mem, op: l1 }) +
          T(580, 458, T2('lipidendubbellaag, ≈ 5 nm', 'lipid bilayer, ≈ 5 nm'), { size: 24, col: C.muted, op: l1, w: 500 });
        const l2 = K(g, 2.25, 2.55) * (1 - K(g, 3.02, 3.2));
        if (l2 > .01) {
          lb += T(XA, 160, 'EGF', { size: 26, col: EGFC, op: l2 }) + T(XB + 80, 244, 'adrenaline', { size: 26, col: ADRC, op: l2, anchor: 'start' });
          lb += T(565, 110, T2('hydrofiel: kan niet door de bilaag', 'hydrophilic: cannot cross the bilayer'), { size: 26, col: C.text, op: l2 });
          lb += T(565, 520, T2('receptoren op het celoppervlak', 'receptors on the cell surface'), { size: 26, col: C.prot, op: l2 });
          const xk = K(g, 2.35, 2.5);
          lb += `<g opacity="${f1(xk * l2)}" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round"><path d="M563,${MY - 22}l24,-24M563,${MY - 46}l24,24"/></g>`;
        }
        const l3 = K(g, 3.2, 3.5) * (1 - K(g, 4.0, 4.2));
        if (l3 > .01) {
          lb += T(1330, 505, 'cortisol', { size: 26, col: CORTC, op: l3 * K(g, 3.75, 3.9), anchor: 'start' });
          lb += T(1305, 420, T2('lipofiel: door de bilaag', 'lipophilic: through the bilayer'), { size: 24, col: C.text, op: l3, anchor: 'start' });
          lb += T(1190, 660, T2('glucocorticoïdreceptor (GR)', 'glucocorticoid receptor (GR)'), { size: 24, col: C.prot, op: l3 * K(g, 3.5, 3.8) });
          lb += T(1415, 705, 'Hsp90', { size: 24, col: HSPC, op: l3 * K(g, 3.85, 4) });
        }
        const l4 = K(g, 4.05, 4.4) * (1 - K(g, 6.0, 6.2));
        if (l4 > .01) {
          for (const [x, a, b, col] of [[XA, 'EGF → EGFR', null, EGFC], [XB, T2('adrenaline → β2-receptor', 'adrenaline → β2 receptor'), null, ADRC], [XC, 'cortisol → GR', 1, CORTC]]) {
            lb += T(x, 104, a, { size: 27, col, op: l4 });
            lb += T(x, 140, b ? T2('lipofiel', 'lipophilic') : T2('hydrofiel', 'hydrophilic'), { size: 24, col: C.muted, op: l4 * (1 - K(g, 5.0, 5.2)), w: 500 });
          }
        }
        const l5 = K(g, 5.05, 5.3) * (1 - K(g, 6.0, 6.2));
        if (l5 > .01) {
          const rail = [[175, T2('1 signaal', '1 signal')], [430, T2('2 receptor', '2 receptor')], [560, T2('3 doorgeven', '3 relay')], [592, T2('+ versterken', '+ amplify')], [828, T2('4 antwoord', '4 response')]];
          rail.forEach(([y, s0], i) => { lb += T(24, y, s0, { size: 26, col: i === 3 ? C.text : '#ffd98a', anchor: 'start', op: l5 * K(g, 5.05 + i * .12, 5.25 + i * .12) }); });
        }
        const l6 = K(g, 6.5, 6.8) * (1 - K(g, 7.02, 7.2));
        if (l6 > .01) lb += T(800, 960, T2('genen gaan aan → mRNA', 'genes switch on → mRNA'), { size: 28, col: C.rna, op: l6 });
        const l7 = K(g, 7.2, 7.55);
        if (l7 > .01) {
          lb += T(410, 470, T2('Verhaal 2 volgt EGF:', 'Story 2 follows EGF:'), { size: 26, col: EGFC, anchor: 'start', op: l7, w: 700 });
          lb += T(410, 508, 'EGF → EGFR → Ras–MAPK', { size: 26, col: C.text, anchor: 'start', op: l7 });
          lb += T(410, 546, T2('→ gen FOS → eiwit c-Fos', '→ gene FOS → protein c-Fos'), { size: 26, col: C.text, anchor: 'start', op: l7 });
        }
        $('sg-lab').innerHTML = lb;

        /* hotspots vanaf stap 4 */
        $('sg-hot').setAttribute('opacity', f1(K(g, 4.05, 4.3)));
      },
    };
  },
};
