/*
 * Ribosoom — het humane 80S-ribosoom in pseudo-3D uit echte coördinaten (PDB 6Y0G, grofkorrelig: zie _ribo80s.js).
 * Elke stip = één nucleotide (P-atoom) of aminozuur (Cα) (steekproef). Draaien en uit elkaar schuiven gebeurt in update(t, s).
 */
import { C, L, T2, svgOpen, txt, cam, FULL, sub, ease, lerp, f1 } from '../../kit.js';
import { RIBO, LM } from './_ribo80s.js';
import { hud, placeHud, stepVal, hex2rgb, rgb, mix, textBox } from './_tlkit.js';

const CATS = ['r18', 'p40', 'r28', 'r58', 'r5', 'p60'];
const SUB40 = new Set(['r18', 'p40']);
const BG = hex2rgb('#0b1224');
const PAL = {
  sub: { r18: '#8df0dc', p40: '#8df0dc', r28: '#23a88f', r58: '#23a88f', r5: '#23a88f', p60: '#23a88f' },
  rp: { r18: C.rrna, r28: C.rrna, r58: C.rrna, r5: C.rrna, p40: C.prot, p60: C.prot },
  s40: { r18: C.rrna, p40: C.prot, r28: '#1d3a44', r58: '#1d3a44', r5: '#1d3a44', p60: '#262a4a' },
  s60: { r18: '#1d3a44', p40: '#262a4a', r28: C.rrna, r58: '#7cc4ff', r5: '#c3f06b', p60: C.prot },
  ptc: { r18: '#1d3a44', p40: '#262a4a', r28: C.rrna, r58: C.rrna, r5: C.rrna, p60: '#3a3170' },
};
const NB = 6;                       // diepte-lagen
const S0 = 2.2;                     // px per Å
// per stap: hoek (rad), kanteling, afstand tussen subeenheden (Å), palet, dekking ribosoom, tRNA-dekking, [cx, cy, schaal]
const K = {
  ang: [-.5, -.5, .35, .2, .2, .25, .3, .86, -.5],
  tilt: [.18, .18, .18, .2, .2, .12, .12, .15, .18],
  sep: [0, 70, 0, 55, 55, 0, 0, 0, 0],
  pal: ['sub', 'sub', 'rp', 's40', 's60', 'sub', 'ptc', 'sub', 'sub'],
  op: [1, 1, 1, 1, 1, .2, .45, .3, 1],
  trna: [0, 0, 0, 0, 0, 1, 1, .8, 0],
  pop: [1, 1, .45, .5, .5, 1, .6, 1, 1],
  pos: [[620, 470, 1], [620, 470, 1], [620, 470, 1], [620, 470, 1], [620, 470, 1], [620, 470, 1], [620, 470, 1], [620, 470, 1], [340, 470, .72]],
};
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'ribosoom',
  title: { nl: 'Ribosoom (80S)', en: 'Ribosome (80S)' },
  scale: { nl: '≈ 25–30 nm', en: '≈ 25–30 nm' },
  time: { nl: 'structuur (stilstaand beeld, langzaam gedraaid)', en: 'structure (static, slowly rotated)' },
  org: { nl: 'mens (vergelijking met bacterie)', en: 'human (compared with bacteria)' },
  legend: [[C.rrna, 'rRNA'], [C.prot, { nl: 'ribosomale eiwitten', en: 'ribosomal proteins' }], ['#8df0dc', '40S'], ['#23a88f', '60S'], [C.trna, 'tRNA'], [C.rna, 'mRNA']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Elke stip is een echt atoom uit PDB 6Y0G (humaan 80S-ribosoom met tRNA in A- en P-plaats, cryo-EM 3,2 Å): één P-atoom per 2–3 nucleotiden en één Cα per 4 aminozuren. Flexibele rRNA-uitsteeksels die niet gemodelleerd zijn, ontbreken.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Every dot is a real atom from PDB 6Y0G (human 80S ribosome with tRNA in the A and P sites, cryo-EM 3.2 Å): one P atom per 2–3 nucleotides and one Cα per 4 amino acids. Flexible rRNA expansion segments that were not modelled are missing.</p>' },
  simplified: {
    nl: 'Grofkorrelig model (steekproef van de atomen, geen oppervlak). De E-plaats is in deze structuur leeg en wordt aangeduid met een label. De afstand tot de tunneluitgang is gemeten in dit model (≈ 90 Å; literatuur: ≈ 100 Å). Massa\'s en S-waarden zijn afgerond.',
    en: 'Coarse-grained model (a sample of the atoms, no surface). The E site is empty in this structure and is marked with a label. The distance to the tunnel exit was measured in this model (≈ 90 Å; literature: ≈ 100 Å). Masses and S values are rounded.' },
  steps: [
    ST(8000, cam(800, 470, 1500), 'Het humane 80S-ribosoom', 'The human 80S ribosome', 'Een machine van ≈ 4 MDa en ≈ 25–30 nm, opgebouwd uit 4 rRNA\'s en ≈ 80 eiwitten. Elke stip komt uit een echte cryo-EM-structuur (PDB 6Y0G).', 'A ≈ 4 MDa, ≈ 25–30 nm machine built from 4 rRNAs and ≈ 80 proteins. Every dot comes from a real cryo-EM structure (PDB 6Y0G).'),
    ST(8000, cam(800, 470, 1500), 'Twee subeenheden: 40S en 60S', 'Two subunits: 40S and 60S', 'De kleine (40S) en grote (60S) subeenheid vormen samen 80S. S = Svedberg (sedimentatiesnelheid): S-waarden tellen niet op (40 + 60 ≠ 80).', 'The small (40S) and large (60S) subunits together form 80S. S = Svedberg (sedimentation rate): S values do not add up (40 + 60 ≠ 80).'),
    ST(8000, cam(800, 470, 1500), 'Vooral RNA: rRNA vormt de kern', 'Mostly RNA: rRNA forms the core', 'rRNA (turquoise) vormt het skelet en de actieve centra; de ribosomale eiwitten (paars) zitten vooral aan de buitenkant.', 'rRNA (turquoise) forms the scaffold and the active centres; the ribosomal proteins (purple) sit mainly on the outside.'),
    ST(8500, cam(800, 560, 1400), '40S: 18S rRNA + 33 eiwitten', '40S: 18S rRNA + 33 proteins', 'De kleine subeenheid bindt het mRNA en bevat het decodeercentrum: daar wordt gecontroleerd of codon en anticodon passen.', 'The small subunit binds the mRNA and holds the decoding centre, where codon–anticodon pairing is checked.'),
    ST(8500, cam(800, 400, 1400), '60S: 28S + 5,8S + 5S rRNA + 47 eiwitten', '60S: 28S + 5.8S + 5S rRNA + 47 proteins', 'De grote subeenheid bevat drie rRNA\'s (28S ≈ 5070 nt, 5,8S ≈ 157 nt, 5S ≈ 121 nt) en maakt de peptidebinding.', 'The large subunit holds three rRNAs (28S ≈ 5070 nt, 5.8S ≈ 157 nt, 5S ≈ 121 nt) and forms the peptide bond.'),
    ST(9000, cam(640, 520, 950), 'A-, P- en E-plaats', 'A, P and E sites', 'Tussen de subeenheden liggen drie tRNA-plaatsen: A (aminoacyl-tRNA), P (peptidyl-tRNA) en E (exit). Hier zitten tRNA\'s in A en P op het mRNA.', 'Between the subunits lie three tRNA sites: A (aminoacyl-tRNA), P (peptidyl-tRNA) and E (exit). Here tRNAs occupy A and P on the mRNA.'),
    ST(9000, cam(650, 440, 900), 'Peptidyltransferasecentrum = ribozym', 'Peptidyl transferase centre = ribozyme', 'De CCA-uiteinden van de tRNA\'s komen samen in het PTC van de 60S. Dat actieve centrum is gemaakt van rRNA, niet van eiwit: het ribosoom is een ribozym.', 'The CCA ends of the tRNAs meet in the PTC of the 60S. That active site is made of rRNA, not protein: the ribosome is a ribozyme.'),
    ST(9000, cam(560, 400, 1000), 'De uitgangstunnel (≈ 100 Å)', 'The exit tunnel (≈ 100 Å)', 'De groeiende keten verlaat het PTC via een tunnel door de 60S (≈ 100 Å lang, ≈ 10–20 Å breed) en komt aan de achterkant naar buiten.', 'The growing chain leaves the PTC through a tunnel in the 60S (≈ 100 Å long, ≈ 10–20 Å wide) and emerges on the far side.'),
    ST(9500, FULL, 'Mens 80S vs bacterie 70S', 'Human 80S vs bacterial 70S', 'Bacteriën hebben een kleiner 70S-ribosoom (30S met 16S rRNA + 50S met 23S en 5S). Het verschil maakt antibiotica (bv. streptomycine, erytromycine) mogelijk die alleen bacteriële ribosomen remmen.', 'Bacteria have a smaller 70S ribosome (30S with 16S rRNA + 50S with 23S and 5S). The difference allows antibiotics (e.g. streptomycin, erythromycin) that inhibit only bacterial ribosomes.'),
  ],
  svg() {
    const bins = [];
    for (let b = 0; b < NB; b++) bins.push(CATS.map(c => `<path id="rb-${c}-${b}" fill="none" stroke-linecap="round"/>`).join(''));
    return svgOpen() + `
    <g data-node="ribogenese" data-color="${C.rrna}" data-label="${T2('Hoe wordt een ribosoom gebouwd?', 'How is a ribosome built?')}"><g id="rb-body">${bins.join('')}</g>
      <circle id="rb-bgA" data-anchor="ribogenese" r="1" fill="none"/></g>
    <g id="rb-mg" data-node="codon" data-color="${C.rna}" data-label="${T2('mRNA · codons', 'mRNA · codons')}"><path id="rb-mrna" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle id="rb-mA" data-anchor="codon" data-pos="below" r="1" fill="none"/></g>
    <g id="rb-tg" data-node="trna" data-color="${C.trna}" data-label="tRNA"><path id="rb-tPL" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path id="rb-tP" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path id="rb-tAL" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path id="rb-tA" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle id="rb-tAnc" data-anchor="trna" r="1" fill="none"/></g>
    <g id="rb-ov"></g>
    ${hud('rb-hud', [
      { node: 'translatie', label: { nl: '↩ Translatie (hoofdverhaal)', en: '↩ Translation (main story)' }, color: C.rrna },
      { node: 'ribogenese', label: { nl: 'Ribosoombiogenese', en: 'Ribosome biogenesis' }, color: C.rrna },
      { node: 'rnastructuur', label: { nl: 'rRNA in de atlas', en: 'rRNA in the atlas' }, color: C.rrna, href: '../atlas/index.html?id=rrna' },
    ])}
    </svg>`;
  },
  init(svg) {
    const STEPS = this?.steps ?? [];
    const $ = id => svg.getElementById(id);
    const P = {}; for (const k in RIBO) { const a = RIBO[k], out = []; for (let i = 0; i < a.length; i += 3) out.push([a[i], a[i + 1], a[i + 2]]); P[k] = out; }
    const paths = {}; for (const c of CATS) for (let b = 0; b < NB; b++) paths[c + b] = $(`rb-${c}-${b}`);
    const cols = s => { const cur = PAL[K.pal[s.step]], prev = PAL[K.pal[Math.max(0, s.step - 1)]], k = ease(sub(s.p, 0, .3)); const o = {}; for (const c of CATS) o[c] = mix(hex2rgb(prev[c]), hex2rgb(cur[c]), k); return o; };

    return {
      update(t, s) {
        placeHud(svg, 'rb-hud', .015, .105, STEPS[s.step]?.cam);
        const rock = .22 * Math.sin(Math.PI * sub(s.p, .3, 1));
        const th = stepVal(K.ang, s) + (s.step === 5 || s.step === 6 ? rock * .3 : rock), ph = stepVal(K.tilt, s);
        const pop = stepVal(K.pop, s), sep = stepVal(K.sep, s), op = stepVal(K.op, s), trOp = stepVal(K.trna, s), [cx, cy, sc] = stepVal(K.pos, s);
        const S = S0 * sc, ct = Math.cos(th), st = Math.sin(th), cp = Math.cos(ph), sp = Math.sin(ph);
        const proj = (p, dy = 0) => {
          const x = p[0] * ct + p[2] * st, z = -p[0] * st + p[2] * ct, y = p[1] + dy;
          return [cx + S * x, cy - S * (y * cp - z * sp), y * sp + z * cp];
        };
        const col = cols(s);
        // lichaam: stippen per diepte-laag
        const d = {}; for (const c of CATS) for (let b = 0; b < NB; b++) d[c + b] = '';
        for (const c of CATS) {
          const dy = SUB40.has(c) ? -sep : sep;
          for (const p of P[c]) {
            const [X, Y, Z] = proj(p, dy);
            const b = Math.max(0, Math.min(NB - 1, Math.floor((Z + 150) / 300 * NB)));
            d[c + b] += `M${X.toFixed(0)},${Y.toFixed(0)}h0`;
          }
        }
        for (const c of CATS) for (let b = 0; b < NB; b++) {
          const el = paths[c + b], shade = .55 - .55 * b / (NB - 1);
          el.setAttribute('d', d[c + b]);
          el.setAttribute('stroke', rgb(mix(col[c], BG, shade)));
          el.setAttribute('stroke-width', f1(S * (c[0] === 'r' ? 7.5 : 7)));
          el.setAttribute('stroke-opacity', c[0] === 'p' ? f1(pop) : '1');
        }
        $('rb-body').setAttribute('opacity', f1(op));
        // tRNA's en mRNA (bovenop)
        const line = pts => pts.map((p, i) => { const [X, Y] = proj(p); return `${i ? 'L' : 'M'}${X.toFixed(1)},${Y.toFixed(1)}`; }).join('');
        const avg = (arr, ix) => ix.reduce((a, j) => a.map((v, q) => v + arr[j][q] / ix.length), [0, 0, 0]);
        for (const [id, key, cl] of [['rb-tA', 'tA', C.trna], ['rb-tP', 'tP', '#ffe29a']]) {
          const T = P[key], Lp = [avg(T, [33, 34, 35]), avg(T, [17, 18, 54, 55]), T[75]].map(q => proj(q));
          const el = $(id + 'L'); el.setAttribute('d', Lp.map((q, j) => `${j ? 'L' : 'M'}${f1(q[0])},${f1(q[1])}`).join(''));
          el.setAttribute('stroke', cl); el.setAttribute('stroke-opacity', '.35'); el.setAttribute('stroke-width', f1(S * 20));
          const e2 = $(id); e2.setAttribute('d', line(T)); e2.setAttribute('stroke', cl); e2.setAttribute('stroke-width', f1(S * 2.2));
        }
        $('rb-tg').setAttribute('opacity', f1(trOp));
        const m = $('rb-mrna'); m.setAttribute('d', line(P.mrna)); m.setAttribute('stroke', C.rna); m.setAttribute('stroke-width', f1(S * 4.5)); $('rb-mg').setAttribute('opacity', f1(trOp));
        const L2 = k => proj(LM[k]);
        const [tx, ty] = L2('elA'); $('rb-tAnc').setAttribute('cx', f1(tx + 40)); $('rb-tAnc').setAttribute('cy', f1(ty - 70));
        const mEnd = proj(P.mrna[P.mrna.length - 1]); $('rb-mA').setAttribute('cx', f1(mEnd[0] + 30)); $('rb-mA').setAttribute('cy', f1(mEnd[1] + 16));
        $('rb-bgA').setAttribute('cx', f1(cx + 60)); $('rb-bgA').setAttribute('cy', f1(cy + 360 * sc));

        // overlays per stap
        let o = '';
        const fade = sub(s.p, .15, .35);
        const i = s.step;
        if (i === 0) {
          o += textBox(1010, 250, 520, [T2('4 rRNA\'s + ≈ 80 eiwitten', '4 rRNAs + ≈ 80 proteins'), T2('1 stip = 1 residu', '1 dot = 1 residue')], { title: T2('Humaan 80S', 'Human 80S'), op: fade, fs: 24 });
        }
        if (i === 1) {
          const a = proj(LM.c60, sep), b = proj(LM.c40, -sep), k = i === 1 ? fade : 1;
          o += txt(a[0] + 330, a[1] - 40, T2('60S', '60S'), '#23a88f', 44, 'start', 800) + txt(a[0] + 330, a[1] - 5, T2('grote subeenheid', 'large subunit'), C.text, 21, 'start').replace('<text', `<text opacity="${f1(k)}"`);
          o += txt(b[0] + 330, b[1] + 30, T2('40S', '40S'), '#8df0dc', 44, 'start', 800) + txt(b[0] + 330, b[1] + 65, T2('kleine subeenheid', 'small subunit'), C.text, 21, 'start').replace('<text', `<text opacity="${f1(k)}"`);
          if (i === 1) o += txt(cx, 870, T2('40S + 60S → 80S   (S-waarden tellen niet op)', '40S + 60S → 80S   (S values are not additive)'), C.muted, 24, 'middle', 600).replace('<text', `<text opacity="${f1(fade)}"`);
        }
        if (i === 2) {
          o += textBox(1010, 280, 500, [T2('<tspan fill="#2cc6a8">■</tspan> rRNA: kern + actieve centra', '<tspan fill="#2cc6a8">■</tspan> rRNA: core + active centres'), T2('<tspan fill="#9b7bff">■</tspan> eiwitten: vooral oppervlak', '<tspan fill="#9b7bff">■</tspan> proteins: mostly surface')], { op: fade, fs: 24 });
        }
        if (i === 3) {
          const dc = proj(LM.dc, -sep);
          o += `<circle cx="${f1(dc[0])}" cy="${f1(dc[1])}" r="${f1(26 + 6 * Math.sin(t / 300))}" fill="none" stroke="#fff" stroke-width="3" opacity="${f1(fade)}"/>` +
            `<path d="M${f1(dc[0] - 26)},${f1(dc[1] - 20)} L${f1(dc[0] - 170)},${f1(dc[1] - 130)}" stroke="#fff" stroke-width="2" opacity="${f1(fade)}"/>` +
            txt(dc[0] - 175, dc[1] - 140, T2('decodeercentrum', 'decoding centre'), '#fff', 24, 'end').replace('<text', `<text opacity="${f1(fade)}"`);
          o += textBox(1000, 600, 480, [T2('18S rRNA ≈ 1870 nt', '18S rRNA ≈ 1870 nt'), T2('33 eiwitten', '33 proteins'), T2('bacterie: 30S = 16S + 21 eiwitten', 'bacteria: 30S = 16S + 21 proteins')], { title: '40S', col: '#8df0dc', op: fade, fs: 22 });
        }
        if (i === 4) {
          o += textBox(1000, 160, 480, [T2('<tspan fill="#2cc6a8">■</tspan> 28S rRNA ≈ 5070 nt', '<tspan fill="#2cc6a8">■</tspan> 28S rRNA ≈ 5070 nt'), T2('<tspan fill="#7cc4ff">■</tspan> 5,8S rRNA ≈ 157 nt', '<tspan fill="#7cc4ff">■</tspan> 5.8S rRNA ≈ 157 nt'), T2('<tspan fill="#c3f06b">■</tspan> 5S rRNA ≈ 121 nt', '<tspan fill="#c3f06b">■</tspan> 5S rRNA ≈ 121 nt'), T2('<tspan fill="#9b7bff">■</tspan> 47 eiwitten', '<tspan fill="#9b7bff">■</tspan> 47 proteins')], { title: '60S', col: C.rrna, op: fade, fs: 22 });
        }
        if (i === 5 || i === 6) {
          const k = i === 5 ? fade : 1;
          for (const [lab, key, el] of [['E', 'acE', 'elE'], ['P', 'acP', 'elP'], ['A', 'acA', 'elA']]) {
            const a = proj(LM[key]), e = proj(LM[el]);
            o += `<g opacity="${f1(k * (i === 6 ? .5 : 1))}">` + txt(a[0], a[1] + 62, lab, '#fff', 34, 'middle', 800) + '</g>';
            if (lab === 'E') o += `<g opacity="${f1(k * (i === 6 ? .4 : .9))}"><path d="M${f1(a[0])},${f1(a[1] - 12)} L${f1(e[0])},${f1(e[1])}" stroke="${C.trna}" stroke-width="3" stroke-dasharray="7 7" fill="none"/>` + txt(e[0] - 20, e[1] - 20, T2('E: leeg', 'E: empty'), C.muted, 20, 'end') + '</g>';
          }
          if (i === 5) o += txt(proj(LM.acA)[0] + 150, proj(LM.acA)[1] + 120, "mRNA 5'→3'", C.rna, 22, 'start').replace('<text', `<text opacity="${f1(fade)}"`);
        }
        if (i === 6) {
          const pc = proj(LM.ptc);
          o += `<circle cx="${f1(pc[0])}" cy="${f1(pc[1])}" r="${f1(30 + 8 * Math.sin(t / 260))}" fill="rgba(255,255,255,.12)" stroke="#fff" stroke-width="3" opacity="${f1(fade)}"/>` +
            `<g opacity="${f1(fade)}">` + txt(pc[0] + 60, pc[1] - 70, T2('PTC: peptidebinding', 'PTC: peptide bond'), '#fff', 26, 'start', 700) + txt(pc[0] + 60, pc[1] - 40, T2('actief centrum = rRNA (28S)', 'active site = rRNA (28S)'), C.rrna, 22, 'start') + '</g>';
        }
        if (i === 7) {
          const pc = proj(LM.ptc), ex = proj(LM.exit), k = sub(s.p, .2, .7);
          const mx = lerp(pc[0], ex[0], k), my = lerp(pc[1], ex[1], k);
          o += `<path d="M${f1(pc[0])},${f1(pc[1])} L${f1(mx)},${f1(my)}" stroke="${C.chain}" stroke-width="16" stroke-linecap="round" opacity=".45"/>` +
            `<path d="M${f1(pc[0])},${f1(pc[1])} L${f1(mx)},${f1(my)}" stroke="#fff" stroke-width="3" stroke-dasharray="8 7"/>` +
            `<circle cx="${f1(pc[0])}" cy="${f1(pc[1])}" r="12" fill="#fff"/>` + txt(pc[0] + 24, pc[1] + 40, 'PTC', '#fff', 24, 'start', 700);
          o += `<g opacity="${f1(sub(s.p, .6, .8))}"><circle cx="${f1(ex[0])}" cy="${f1(ex[1])}" r="16" fill="none" stroke="${C.chain}" stroke-width="4"/>` +
            txt(ex[0] - 26, ex[1] - 26, T2('tunneluitgang', 'tunnel exit'), C.chain, 24, 'end', 700) +
            txt((pc[0] + ex[0]) / 2 + 150, (pc[1] + ex[1]) / 2 - 20, T2('≈ 90 Å in dit model', '≈ 90 Å in this model'), '#fff', 22, 'start') + '</g>';
        }
        if (i === 8) {
          const f = fade, X = 680, Y = 190;
          const row = (y, a, b, c, bold) => txt(X, y, a, C.muted, 24, 'start', 600) + txt(X + 300, y, b, bold ? C.bact : C.text, 24, 'start', bold ? 800 : 500) + txt(X + 560, y, c, bold ? C.rrna : C.text, 24, 'start', bold ? 800 : 500);
          o += `<g opacity="${f1(f)}"><rect x="${X - 30}" y="${Y - 60}" width="920" height="400" rx="16" fill="rgba(9,14,28,.86)" stroke="${C.rrna}" stroke-opacity=".5" stroke-width="2"/>` +
            row(Y, '', T2('bacterie', 'bacteria'), T2('mens', 'human'), true) +
            row(Y + 70, T2('ribosoom', 'ribosome'), '70S', '80S') +
            row(Y + 140, T2('kleine subeenheid', 'small subunit'), '30S · 16S', '40S · 18S') +
            row(Y + 185, T2('   eiwitten', '   proteins'), '21', '33') +
            row(Y + 255, T2('grote subeenheid', 'large subunit'), '50S · 23S + 5S', T2('60S · 28S + 5,8S + 5S', '60S · 28S + 5.8S + 5S')) +
            row(Y + 300, T2('   eiwitten', '   proteins'), '≈ 33', '47') + '</g>';
        }
        $('rb-ov').innerHTML = o;
      },
    };
  },
};
