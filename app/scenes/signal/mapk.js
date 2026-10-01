import { C, T2, svgOpen, cam, sub, ease, lerp, clamp, f1, rng, squiggle } from '../../kit.js';
import { T, smooth, tag, arrowDefs, arr, phos, panel, spark, PHOS } from '../prot/_b_kit.js';
import { K, membrane, kinase, tyr, ras, grbSos, SOS_OFF, chip, pdot } from './rtk.js';

/*
 * Verhaallijn 2, hoofdstuk "mapk": Ras–Raf–MEK–ERK. Plasmamembraan boven (y 110–170), kernenvelop onder (y 715–750).
 */
const MT = 110, MB = 170, NO = 715, NI = 750;           // plasmamembraan · buitenste/binnenste kernmembraan
const PORES = [1000, 1200, 1400], PW = 40;              // kernporiën (halve opening)
const SH2 = [250, 430], SOS = [SH2[0] + SOS_OFF[0], SH2[1] + SOS_OFF[1]];
const RAS = [602, 272];
const RAF_OFF = [760, 480], RAF_ON = [738, 252], RBD_ON = [652, 268];
const MEK_A = [900, 430], MEK_D = [835, 352], MEK_B = [880, 420];
const ERK_A = [1090, 520], ERK_D = [972, 460], ERK_B = [1030, 520];
/* versterking: extra MEK- en ERK-kopieën; ERK: [x, y, van-MEK, pore-index of -1, bestemming] */
const MEKS = [[620, 540], [800, 600]];
const ERKS = [
  [1180, 400, 0, 1, [1150, 820]], [1330, 520, 0, 2, [1400, 830]], [470, 610, 1, -1], [600, 650, 1, -1],
  [930, 640, 2, -1], [1110, 640, 2, 1, [1255, 850]],
];
const E0_DEST = [1000, 830];
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

const r = rng(41);
let CHROM = '';
for (let i = 0; i < 16; i++) CHROM += `<path d="${squiggle(r, 80 + r() * 1440, 790 + r() * 90, 7, 12, 12)}" stroke="${C.dna}" stroke-width="${f1(1.6 + r() * 1.4)}" fill="none" opacity="${f1(.18 + r() * .25)}"/>`;

/* kinase met naam in de C-lob en fosfaten; ph = [k1, k2] (0..1) */
function kin(x, y, col, name, o = {}) {
  const { sc = .9, on = 0, ph = [], op = 1, fs = 22, tey = false, cw = 1000 } = o;
  if (op <= .01) return '';
  let s = `<g opacity="${f1(op)}">` + kinase(x, y, col, { on, sc });
  if (name) s += T(x, y + 62 * sc + fs * .36, name, { size: fs, col: '#fff', w: 800 });
  if (tey) {
    const L = ['T', 'E', 'Y'];
    [[58, 40], [66, 66], [58, 92]].forEach(([dx, dy], i) => {
      s += chip(x + dx * sc, y + dy * sc, 12 * sc, L[i], K.tyr, cw);
    });
    if (ph[0] > .01) s += pdot(x + 92 * sc, y + 34 * sc, 14 * sc, cw, ph[0]);
    if (ph[1] > .01) s += pdot(x + 92 * sc, y + 98 * sc, 14 * sc, cw, ph[1]);
  } else {
    [[54, 40], [58, 84]].forEach(([dx, dy], i) => { if ((ph[i] ?? 0) > .01) s += pdot(x + dx * sc, y + dy * sc, 14 * sc, cw, ph[i]); });
  }
  return s + '</g>';
}
/* ERK-kopie klein (twee fosfaten) */
const erkSmall = (x, y, k, op = 1, cw = 1600) => kin(x, y, K.erk, '', { sc: .6, on: k, ph: [k, k], op, cw });

const SCENE = {
  id: 'mapk',
  title: { nl: 'Ras–MAPK-cascade', en: 'Ras–MAPK cascade' },
  scale: { nl: 'niet op schaal (cel ≈ 10–20 µm)', en: 'not to scale (cell ≈ 10–20 µm)' },
  time: { nl: 'ERK is binnen minuten actief en in de kern', en: 'ERK is active and in the nucleus within minutes' },
  org: { nl: 'mens (ERK1/2-route)', en: 'human (ERK1/2 pathway)' },
  legend: [[K.sos, 'SOS (GEF)'], [K.ras, 'Ras'], [K.gtp, 'GTP'], [K.gdp, 'GDP'], [K.raf, { nl: 'Raf (MAPKKK)', en: 'Raf (MAPKKK)' }],
    [K.mek, { nl: 'MEK (MAPKK)', en: 'MEK (MAPKK)' }], [K.erk, { nl: 'ERK (MAPK)', en: 'ERK (MAPK)' }], [PHOS, { nl: 'fosfaat', en: 'phosphate' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">MAPKKK → MAPKK → MAPK: MAP-kinase-kinase-kinase, MAP-kinase-kinase, mitogeen-geactiveerd proteïnekinase. 3D: H-Ras met een GTP-analoog PDB <a href="https://www.rcsb.org/structure/5P21" target="_blank" rel="noopener">5P21</a>.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">MAPKKK → MAPKK → MAPK: MAP kinase kinase kinase, MAP kinase kinase, mitogen-activated protein kinase. 3D: H-Ras with a GTP analogue PDB <a href="https://www.rcsb.org/structure/5P21" target="_blank" rel="noopener">5P21</a>.</p>' },
  simplified: {
    nl: 'Schematisch en niet op schaal. Raf wordt in werkelijkheid actief via een reeks stappen (binding aan Ras-GTP, dimerisatie van Raf, (de)fosforylering, 14-3-3-eiwitten); we tonen alleen de binding aan Ras. Er zijn verschillende isovormen (H-, K-, N-Ras; A-, B-, C-Raf; MEK1/2; ERK1/2); we tekenen er telkens één. Steigereiwitten zijn weggelaten. De versterking is kwalitatief getekend: de aantallen kopieën zijn geen echte verhoudingen. ERK gaat de kern in via verschillende mechanismen (o.a. met importine-7 of door directe binding aan nucleoporinen).',
    en: 'Schematic and not to scale. In reality Raf is activated through a series of steps (binding to Ras-GTP, Raf dimerisation, (de)phosphorylation, 14-3-3 proteins); we only show binding to Ras. There are several isoforms (H-, K-, N-Ras; A-, B-, C-Raf; MEK1/2; ERK1/2); we draw one of each. Scaffold proteins are omitted. Amplification is drawn qualitatively: the numbers of copies are not real ratios. ERK enters the nucleus by several mechanisms (e.g. with importin-7 or by binding nucleoporins directly).' },
  steps: [
    ST(7000, cam(800, 450, 1600), 'Van het membraan naar de kern', 'From the membrane to the nucleus',
      'SOS zit nu naast Ras. Drie kinasen – Raf, MEK en ERK – liggen nog inactief in het cytosol. Samen brengen ze het signaal naar de kern.',
      'SOS now sits next to Ras. Three kinases – Raf, MEK and ERK – are still inactive in the cytosol. Together they carry the signal to the nucleus.'),
    ST(8500, cam(560, 300, 1000), 'SOS wisselt GDP voor GTP', 'SOS swaps GDP for GTP',
      'SOS is een GEF: het wrikt GDP los uit Ras. In het cytosol is veel meer GTP dan GDP, dus Ras bindt GTP en klapt naar zijn actieve vorm.',
      'SOS is a GEF: it prises GDP out of Ras. The cytosol contains far more GTP than GDP, so Ras binds GTP and switches to its active shape.'),
    ST(8000, cam(700, 330, 1000), 'Ras-GTP haalt Raf naar het membraan', 'Ras-GTP pulls Raf to the membrane',
      'Ras-GTP bindt het Ras-bindende domein (RBD) van Raf, een MAPKKK, en houdt het aan het membraan vast. Daar wordt Raf actief.',
      'Ras-GTP binds the Ras-binding domain (RBD) of Raf, a MAPKKK, and holds it at the membrane. There Raf becomes active.'),
    ST(8500, cam(820, 380, 1000), 'Raf fosforyleert MEK', 'Raf phosphorylates MEK',
      'Raf zet met ATP een fosfaat op twee serines van MEK (een MAPKK). Nu is MEK actief.',
      'Using ATP, Raf puts a phosphate on two serines of MEK (a MAPKK). MEK is now active.'),
    ST(9000, cam(935, 470, 1000), 'MEK fosforyleert ERK op Thr én Tyr', 'MEK phosphorylates ERK on Thr and Tyr',
      'MEK is dubbelspecifiek: het fosforyleert in ERK (de MAPK) zowel de threonine als de tyrosine van het TEY-motief. Pas met beide fosfaten is ERK volledig actief.',
      'MEK has dual specificity: in ERK (the MAPK) it phosphorylates both the threonine and the tyrosine of the TEY motif. Only with both phosphates is ERK fully active.'),
    ST(9000, cam(800, 450, 1600), 'Elke stap versterkt het signaal', 'Each step amplifies the signal',
      'Eén actief kinase kan na elkaar vele moleculen van het volgende fosforyleren. Zo geeft een klein signaal aan het membraan een grote respons (schematisch).',
      'One active kinase can phosphorylate many molecules of the next one in turn. A small signal at the membrane thus gives a large response (schematic).'),
    ST(9000, cam(1150, 620, 1150), 'Actief ERK gaat de kern in', 'Active ERK enters the nucleus',
      'Een deel van het actieve ERK gaat door de kernporiën de kern in. Daar fosforyleert het transcriptiefactoren, zoals Elk-1 op het FOS-gen.',
      'Part of the active ERK passes through the nuclear pores into the nucleus. There it phosphorylates transcription factors, such as Elk-1 on the FOS gene.'),
    ST(9000, cam(760, 420, 1400), 'Uitschakelen: GAP en fosfatasen', 'Switching off: GAP and phosphatases',
      'Ras hydrolyseert zijn GTP zelf maar traag; een GAP versnelt dat sterk, zodat Ras weer Ras-GDP wordt. Fosfatasen halen de fosfaten van ERK weer af.',
      'Ras hydrolyses its GTP only slowly on its own; a GAP speeds this up greatly, turning Ras back into Ras-GDP. Phosphatases remove the phosphates from ERK again.'),
    ST(9000, cam(800, 450, 1600), 'Als de schakelaar blijft hangen', 'When the switch gets stuck',
      'RAS-mutaties (vooral op G12, G13 of Q61) maken Ras ongevoelig voor GAP\'s: Ras blijft GTP en dus aan. Dat zien we bij ~1 op 5 kankerpatiënten. Klik op ERK in de kern.',
      'RAS mutations (mainly at G12, G13 or Q61) make Ras insensitive to GAPs: Ras stays GTP-bound and thus on. This is seen in ~1 in 5 cancer patients. Click ERK in the nucleus.'),
  ],
  loop: false,
  svg() {
    const env = (y, col) => {
      let d = `M-600,${y}`; PORES.forEach(px => { d += ` L${px - PW},${y} M${px + PW},${y}`; }); d += ' L2200,' + y;
      return `<path d="${d}" stroke="${col}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
    };
    const npc = px => `<rect x="${px - PW - 16}" y="${NO - 14}" width="22" height="${NI - NO + 28}" rx="10" fill="${C.prot2}" opacity=".85"/><rect x="${px + PW - 6}" y="${NO - 14}" width="22" height="${NI - NO + 28}" rx="10" fill="${C.prot2}" opacity=".85"/>`;
    return svgOpen(arrowDefs('mk', { m: C.muted, w: '#fff', e: K.erk })) + `
    <rect x="-600" y="${MB}" width="2800" height="${NO - MB}" fill="url(#gCyto)" opacity=".85"/>
    <rect x="-600" y="${NI}" width="2800" height="900" fill="url(#gNuc)"/>
    ${CHROM}
    ${membrane('mk', MT, MB)}
    ${env(NO, '#7aa0d8')}${env(NI, '#9cc0ff')}
    <g data-node="kernimport" data-color="${C.prot2}" data-label="${T2('Kernporie', 'Nuclear pore')}">${PORES.map(npc).join('')}<g id="mk-kiA"><circle data-anchor="kernimport" cx="${PORES[2]}" cy="${NO - 18}" r="1" fill="none"/></g></g>
    <g data-node="rtk" data-color="${K.rec}" data-label="${T2('← EGF-receptor', '← EGF receptor')}"><g id="mk-rec"></g><g id="mk-rtkA"><circle data-anchor="rtk" cx="135" cy="60" r="1" fill="none"/></g></g>
    <g id="mk-sos"></g>
    <g id="mk-ras"></g>
    <g id="mk-kin"></g>
    <g data-node="srf" data-color="${K.erk}" data-label="${T2('Elk-1 & FOS-gen →', 'Elk-1 & FOS gene →')}"><g id="mk-nuc"></g><g id="mk-srfA"><circle data-anchor="srf" cx="${E0_DEST[0]}" cy="${E0_DEST[1] - 30}" r="1" fill="none"/></g></g>
    <g data-node="ptm" data-color="${PHOS}" data-label="${T2('Fosforylering (PTM)', 'Phosphorylation (PTM)')}"><g id="mk-ptmHit"></g><g id="mk-ptmA"><circle data-anchor="ptm" cx="${MEK_B[0] + 60}" cy="${MEK_B[1] - 40}" r="1" fill="none"/></g></g>
    <g id="mk-fx"></g>
    <g id="mk-lbl"></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    /* receptorstomp + Grb2–SOS (statisch) */
    let rec = '';
    [95, 175].forEach(x => { rec += `<rect x="${x - 7}" y="${MT - 12}" width="14" height="${MB - MT + 22}" rx="6" fill="${K.rec}"/>` +
      `<ellipse cx="${x}" cy="${MT - 50}" rx="30" ry="40" fill="${K.rec}" fill-opacity=".28" stroke="${K.rec}" stroke-width="3"/>`; });
    rec += `<ellipse cx="135" cy="${MT - 58}" rx="16" ry="12" fill="${K.egf}" fill-opacity=".45" stroke="${K.egf}" stroke-width="2.5"/>`;
    rec += `<path d="M95,${MB + 8} C95,${MB + 25} 95,195 95,202" stroke="${K.rec}" stroke-width="5" fill="none"/><path d="M175,${MB + 8} C175,${MB + 30} 185,230 185,240" stroke="${K.rec}" stroke-width="5" fill="none"/>`;
    rec += kinase(95, 222, K.rec, { sc: .75 }) + kinase(185, 262, K.rec, { sc: .75, on: 1 });
    const tB = [[185, 336], [200, 368], [218, 396]], tA = [[95, 296], [80, 330], [62, 356], [42, 376]];
    rec += `<path d="${smooth(tB)}" stroke="${K.rec}" stroke-width="5" fill="none"/><path d="${smooth(tA)}" stroke="${K.rec}" stroke-width="5" fill="none"/>`;
    $('mk-rec').innerHTML = rec + '<g id="mk-recP"></g>';
    $('mk-sos').innerHTML = grbSos(SH2[0], SH2[1]);

    return {
      update(t, s) {
        const { step, p } = s;
        const cw = SCENE.steps[step]?.cam?.[2] ?? 1600;
        $('mk-recP').innerHTML = tyr(62, 356, 1, 13, cw) + tyr(42, 376, 1, 13, cw) + tyr(218, 396, 1, 13, cw);
        /* ---- Ras ---- */
        const gef = step < 1 ? 0 : step === 1 ? ease(sub(p, .15, .75)) : 1;          // GDP → GTP
        const off = step < 7 ? 0 : step === 7 ? ease(sub(p, .25, .6)) : 1;           // GAP: GTP → GDP
        const rasOn = step < 7 ? gef : 1 - off;
        let rs = ras(RAS[0], RAS[1], MB, { on: rasOn, nuc: rasOn > .5 ? 'GTP' : 'GDP', nucOp: step === 1 ? 1 - Math.sin(Math.PI * sub(p, .25, .65)) * .9 : 1 });
        if (step === 1) {
          const out = ease(sub(p, .15, .5)), inn = ease(sub(p, .45, .8));
          if (out > 0 && out < 1) rs += tag(lerp(RAS[0], RAS[0] + 110, out), lerp(RAS[1] + 4, RAS[1] + 140, out), 'GDP', K.gdp, { fs: 17, op: 1 - out * .6 });
          if (inn < 1 && p > .4) rs += tag(lerp(RAS[0] + 170, RAS[0], inn), lerp(RAS[1] + 190, RAS[1] + 4, inn), 'GTP', K.gtp, { fs: 17 });
        }
        if (step === 7 || step === 8) {
          const g = step === 8 ? 1 - ease(sub(p, 0, .2)) : ease(sub(p, 0, .25));
          const gx = RAS[0] + 20, gy = lerp(RAS[1] + 190, RAS[1] + 84, g);
          if (g > .01) rs += `<ellipse cx="${f1(gx)}" cy="${f1(gy)}" rx="60" ry="34" fill="#ff6b9a" fill-opacity=".25" stroke="#ff6b9a" stroke-width="3" opacity="${f1(g)}"/>` + T(gx, gy + 8, 'GAP', { size: 22, col: '#fff', w: 800, op: g });
          const pi = step === 7 ? sub(p, .45, .85) : 0;
          if (pi > 0 && pi < 1) rs += T(RAS[0] + 70 + 60 * pi, RAS[1] - 10 + 40 * pi, 'Pᵢ', { size: 22, col: PHOS, w: 800, op: 1 - pi });
        }
        if (step === 8) {
          /* vergelijking normaal / mutant */
          rs += panel(1020, 150, 540, 420, { col: K.ras });
          rs += T(1290, 200, T2('Ras aan of uit?', 'Ras on or off?'), { size: 28, col: K.ras, w: 800 });
          rs += ras(1110, 300, 0, { on: 0, nuc: 'GDP', r: 34, anchor: false });
          rs += T(1170, 290, T2('normaal: GAP →', 'normal: GAP →'), { size: 24, anchor: 'start', w: 600 });
          rs += T(1170, 322, T2('Ras-GDP (uit)', 'Ras-GDP (off)'), { size: 24, anchor: 'start', col: C.muted });
          const tw = .5 + .5 * Math.sin(p * Math.PI * 3);
          rs += ras(1110, 450, 0, { on: .7 + .3 * tw, nuc: 'GTP', r: 34, anchor: false });
          rs += `<path d="M1080,420 l8,-18 l8,18 l18,2 l-14,12 l4,18 l-16,-9 l-16,9 l4,-18 l-14,-12 z" fill="${C.danger}" transform="translate(-18 -30)"/>`;
          rs += T(1170, 440, T2('mutant (G12, G13, Q61):', 'mutant (G12, G13, Q61):'), { size: 24, anchor: 'start', col: C.danger, w: 700 });
          rs += T(1170, 472, T2('blijft GTP (aan)', 'stays GTP (on)'), { size: 24, anchor: 'start', w: 600 });
          rs += T(1290, 540, T2('→ ERK blijft actief', '→ ERK stays active'), { size: 22, col: K.erk });
        }
        $('mk-ras').innerHTML = rs;

        /* ---- Raf ---- */
        const rafK = step < 2 ? 0 : step === 2 ? ease(sub(p, .1, .6)) : 1;
        const rafOff = step < 7 ? 0 : step === 7 ? ease(sub(p, .55, .95)) : 1;
        const rk = rafK * (1 - rafOff);
        const rafOn = step < 2 ? 0 : step === 2 ? sub(p, .6, .85) : 1 - rafOff;
        const rx = lerp(RAF_OFF[0], RAF_ON[0], rk), ry = lerp(RAF_OFF[1], RAF_ON[1], rk);
        const rbd = [lerp(RAF_OFF[0] - 80, RBD_ON[0], rk), lerp(RAF_OFF[1] + 10, RBD_ON[1], rk)];
        let ks = `<path d="M${f1(rbd[0])},${f1(rbd[1])} Q${f1((rbd[0] + rx) / 2)},${f1(ry + 20)} ${f1(rx - 30)},${f1(ry + 4)}" stroke="${K.raf}" stroke-width="5" fill="none"/>` +
          `<circle cx="${f1(rbd[0])}" cy="${f1(rbd[1])}" r="17" fill="${K.raf}" fill-opacity=".45" stroke="${K.raf}" stroke-width="3"/>`;
        ks += kin(rx, ry, K.raf, 'Raf', { on: rafOn, cw });

        /* ---- MEK ---- */
        let mx = MEK_A[0], my = MEK_A[1];
        if (step === 3) { const a = ease(sub(p, 0, .3)), b = ease(sub(p, .7, 1)); mx = lerp(lerp(MEK_A[0], MEK_D[0], a), MEK_B[0], b); my = lerp(lerp(MEK_A[1], MEK_D[1], a), MEK_B[1], b); }
        if (step > 3) { mx = MEK_B[0]; my = MEK_B[1]; }
        const mp1 = step < 3 ? 0 : step === 3 ? sub(p, .35, .45) : 1, mp2 = step < 3 ? 0 : step === 3 ? sub(p, .5, .6) : 1;
        const mOn = step < 3 ? 0 : step === 3 ? sub(p, .55, .75) : 1;
        ks += kin(mx, my, K.mek, 'MEK', { on: mOn, ph: [mp1, mp2], cw });
        /* extra MEK-kopieën (versterking) */
        const amp = step < 5 ? 0 : step === 5 ? 1 : 1;
        const a1 = step < 5 ? 0 : step === 5 ? sub(p, .05, .3) : 1, a2 = step < 5 ? 0 : step === 5 ? sub(p, .35, .7) : 1;
        MEKS.forEach(([x, y], i) => { const k = clamp(a1 * 2 - i * .6); if (k > 0) ks += kin(x, y, K.mek, '', { sc: .6, on: k, ph: [k, k], op: k, cw }); });

        /* ---- ERK (hoofdmolecule) ---- */
        let ex = ERK_A[0], ey = ERK_A[1], esc = .9;
        if (step === 4) { const a = ease(sub(p, 0, .3)), b = ease(sub(p, .75, 1)); ex = lerp(lerp(ERK_A[0], ERK_D[0], a), ERK_B[0], b); ey = lerp(lerp(ERK_A[1], ERK_D[1], a), ERK_B[1], b); }
        if (step >= 5) { ex = ERK_B[0]; ey = ERK_B[1]; }
        if (step === 5) esc = lerp(.9, .6, ease(sub(p, .75, 1)));
        if (step >= 6) esc = .6;
        const ep1 = step < 4 ? 0 : step === 4 ? sub(p, .35, .45) : 1, ep2 = step < 4 ? 0 : step === 4 ? sub(p, .52, .62) : 1;
        const eOn = step < 4 ? 0 : step === 4 ? sub(p, .6, .8) : 1;
        const imp = (k, from, pi, dest) => {                        // pad naar de kern via poort pi
          const px = PORES[pi], a = ease(clamp(k * 2)), b = ease(clamp(k * 2 - 1));
          return b > 0 ? [lerp(px, dest[0], b), lerp(NO - 40, dest[1] - 30, b)] : [lerp(from[0], px, a), lerp(from[1], NO - 40, a)];
        };
        const e0k = step < 6 ? 0 : step === 6 ? sub(p, .05, .6) : 1;
        let e0 = [ex, ey];
        if (e0k > 0) e0 = imp(e0k, [ERK_B[0], ERK_B[1]], 0, E0_DEST);
        let nuc = '';
        const e0s = esc >= .88 ? kin(e0[0], e0[1], K.erk, 'ERK', { sc: esc, on: eOn, ph: [ep1, ep2], tey: true, cw }) : kin(e0[0], e0[1], K.erk, '', { sc: esc, on: eOn, ph: [ep1, ep2], cw });
        if (e0k >= .5) nuc += e0s; else ks += e0s;
        /* extra ERK-kopieën */
        ERKS.forEach(([x, y, m, pi, dest], i) => {
          const k = clamp(a2 * 2.2 - (i % 3) * .45); if (k <= 0) return;
          let pos = [x, y];
          const deph = step < 7 || i !== 4 ? 0 : step === 7 ? ease(sub(p, .45, .85)) : 1;      // fosfatase op kopie 3
          if (pi >= 0) { const kk = step < 6 ? 0 : step === 6 ? sub(p, .15 + i * .05, .75 + i * .04) : 1; if (kk > 0) pos = imp(kk, [x, y], pi, dest); if (kk >= .5) { nuc += erkSmall(pos[0], pos[1], 1, 1, cw); return; } }
          ks += erkSmall(pos[0], pos[1], (1 - deph) * k, k, cw);
        });
        $('mk-kin').innerHTML = ks;
        $('mk-nuc').innerHTML = nuc + (step >= 6 ? `<rect x="900" y="770" width="560" height="130" fill="transparent"/>` : '');
        $('mk-srfA').setAttribute('opacity', step >= 6 && e0k >= .95 ? 1 : 0);
        $('mk-srfA').firstElementChild.setAttribute('cy', step === 8 ? 700 : E0_DEST[1] - 30);
        $('mk-srfA').firstElementChild.setAttribute('cx', step === 8 ? PORES[1] : E0_DEST[0]);
        $('mk-kiA').setAttribute('opacity', step === 6 ? 1 : 0);
        $('mk-rtkA').setAttribute('opacity', step === 0 ? 1 : 0);
        $('mk-ptmA').setAttribute('opacity', step === 3 ? sub(p, .8, .9) : 0);
        $('mk-ptmHit').innerHTML = step === 3 || step === 4 ? `<circle cx="${f1(mx + 50)}" cy="${f1(my + 60)}" r="34" fill="transparent"/>` : '';

        /* ---- effecten: pijlen, ATP ---- */
        let fx = '';
        if (step === 2) fx += spark(RBD_ON[0], RBD_ON[1], sub(p, .55, .85), K.ras);
        if (step === 3) {
          fx += arr(RAF_ON[0] + 40, RAF_ON[1] + 70, MEK_D[0] + 30, MEK_D[1] + 38, '#fff', 'mk-w', { w: 3.5, bend: -.3, op: sub(p, .28, .35) * (1 - sub(p, .65, .75)) });
          fx += tag(RAF_ON[0] - 10, RAF_ON[1] + 138, sub(p, .35, .6) < .5 ? 'ATP' : 'ADP', K.atp, { fs: 17, op: sub(p, .25, .35) });
          fx += spark(mx + 54 * .9, my + 40 * .9, sub(p, .35, .5), PHOS) + spark(mx + 58 * .9, my + 84 * .9, sub(p, .5, .65), PHOS);
        }
        if (step === 4) fx += tag(RAF_ON[0] - 10, RAF_ON[1] + 138, 'ADP', K.atp, { fs: 17, op: 1 - sub(p, 0, .2) });
        if (step === 5) fx += tag(MEK_B[0] - 40, MEK_B[1] + 125, 'ADP', K.atp, { fs: 17, op: 1 - sub(p, 0, .2) });
        if (step === 4) {
          fx += arr(MEK_B[0] + 30, MEK_B[1] + 70, ERK_D[0] - 20, ERK_D[1] + 72, '#fff', 'mk-w', { w: 3.5, bend: -.3, op: sub(p, .28, .35) * (1 - sub(p, .7, .8)) });
          fx += tag(MEK_B[0] - 40, MEK_B[1] + 125, sub(p, .35, .62) < .5 ? 'ATP' : 'ADP', K.atp, { fs: 17, op: sub(p, .25, .35) });
          fx += spark(ex + 92 * .9, ey + 34 * .9, sub(p, .35, .5), PHOS) + spark(ex + 92 * .9, ey + 98 * .9, sub(p, .52, .67), PHOS);
        }
        if (step === 5 || step === 6) {
          const o = step === 5 ? sub(p, 0, .1) * (1 - sub(p, .9, 1) * .6) : .4 * (1 - sub(p, 0, .2));
          MEKS.forEach(([x, y], i) => { fx += arr(RAF_ON[0] - 10, RAF_ON[1] + 100, x - 10, y - 22, K.raf, 'mk-m', { w: 3, op: o * clamp(a1 * 2 - i * .6), dash: '8 7', bend: .15 }); });
          const src = [[MEK_B[0], MEK_B[1] + 60], [MEKS[0][0], MEKS[0][1] + 40], [MEKS[1][0], MEKS[1][1] + 40]];
          ERKS.forEach(([x, y, m], i) => { fx += arr(src[m][0] + 20, src[m][1], x - 20, y - 12, K.mek, 'mk-m', { w: 3, op: o * clamp(a2 * 2.2 - (i % 3) * .45), dash: '8 7', bend: .12 }); });
          fx += arr(src[0][0] + 20, src[0][1], ERK_B[0] - 30, ERK_B[1], K.mek, 'mk-m', { w: 3, op: o, dash: '8 7' });
        }
        if (step === 7 || step === 8) {
          const k = step === 7 ? sub(p, .45, .85) : 1;
          const E = ERKS[4];
          const po = step === 7 ? ease(sub(p, .2, .4)) : 1 - sub(p, 0, .2);
          fx += `<ellipse cx="${E[0] + 105}" cy="${E[1] - 10}" rx="48" ry="30" fill="#ffb3c7" fill-opacity=".22" stroke="#ffb3c7" stroke-width="3" opacity="${f1(po)}"/>`;
          if (k > 0 && k < 1) fx += T(E[0] + 160 + 40 * k, E[1] - 20 - 40 * k, 'Pᵢ', { size: 22, col: PHOS, w: 800, op: 1 - k });
        }
        $('mk-fx').innerHTML = fx;

        /* ---- labels ---- */
        let lb = '';
        const L = (x, y, s, o = {}) => { lb += T(x, y, s, { size: 24, ...o }); };
        if (step === 0 || step === 5 || step === 8) {
          L(1560, 150, T2('plasmamembraan', 'plasma membrane'), { anchor: 'end', col: '#e3c89c', size: 22 });
          L(40, 690, 'cytosol', { anchor: 'start', col: C.muted, w: 500 });
          L(40, 800, T2('kern', 'nucleus'), { anchor: 'start', col: '#9cc0ff', w: 500 });
        }
        if (step === 0) {
          L(RAS[0] + 48, RAS[1] + 58, 'Ras', { anchor: 'start', col: K.ras, w: 800 });
          L(1570, 700, T2('kernenvelop', 'nuclear envelope'), { anchor: 'end', col: '#9cc0ff', size: 22 });
          L(930, 655, T2('nog inactief', 'still inactive'), { col: C.muted });
          L(250, 520, 'Grb2', { col: K.grb });
        }
        if (step === 1) {
          L(RAS[0] + 48, RAS[1] - 20, gef > .5 ? 'Ras-GTP' : 'Ras-GDP', { anchor: 'start', col: K.ras, w: 800 });
          L(RAS[0] + 48, RAS[1] + 12, gef > .5 ? T2('actief', 'active') : T2('inactief', 'inactive'), { anchor: 'start', col: gef > .5 ? C.ok : C.muted, size: 22 });
          L(SOS[0], SOS[1] + 90, 'GEF', { col: K.sos, w: 800 });
        }
        if (step === 2) {
          L(RAS[0], RAS[1] + 76, 'Ras-GTP', { col: K.ras, w: 800 });
          L(RBD_ON[0] + 22, RBD_ON[1] - 38, 'RBD', { col: K.raf, op: sub(p, .5, .7) });
          L(RAF_ON[0] + 60, RAF_ON[1] - 5, 'MAPKKK', { anchor: 'start', col: K.raf, op: sub(p, .6, .8) });
        }
        if (step === 3) {
          L(MEK_B[0] + 72, MEK_B[1] + 50, 'MAPKK', { anchor: 'start', col: K.mek, op: sub(p, .75, .9) });
          L(MEK_B[0] + 72, MEK_B[1] + 80, T2('2× Ser-P', '2× Ser-P'), { anchor: 'start', col: PHOS, size: 22, op: sub(p, .75, .9) });
        }
        if (step === 4) {
          L(ERK_B[0] + 115, ERK_B[1] + 40, 'MAPK', { anchor: 'start', col: K.erk, op: sub(p, .8, .95) });
          L(ERK_B[0] + 115, ERK_B[1] + 72, 'Thr-P + Tyr-P', { anchor: 'start', col: PHOS, size: 22, op: sub(p, .8, .95) });
          L(ERK_B[0] + 115, ERK_B[1] + 102, T2('→ actief', '→ active'), { anchor: 'start', col: C.ok, size: 22, op: sub(p, .85, 1) });
        }
        if (step === 5) {
          L(1300, 300, T2('versterking', 'amplification'), { col: '#fff', size: 30, w: 800, op: sub(p, .3, .5) });
          L(1300, 338, T2('1 → enkele → vele', '1 → several → many'), { col: C.muted, size: 24, op: sub(p, .4, .6) });
        }
        if (step === 6) {
          L(1540, 800, T2('kern', 'nucleus'), { anchor: 'end', col: '#9cc0ff' });
          L(1100, 655, 'ERK-P-P', { col: K.erk, w: 800, anchor: 'end' });
        }
        if (step === 7) {
          L(RAS[0] + 48, RAS[1] - 30, off > .5 ? 'Ras-GDP' : 'Ras-GTP', { anchor: 'start', col: K.ras, w: 800 });
          L(RAS[0] + 20, RAS[1] + 152, T2('(bv. NF1)', '(e.g. NF1)'), { col: '#ff9fbd', size: 22, op: sub(p, .15, .3) });
          L(ERKS[4][0] + 105, ERKS[4][1] - 55, T2('fosfatase', 'phosphatase'), { col: '#ffb3c7', op: sub(p, .25, .4) });
          L(RAF_OFF[0], RAF_OFF[1] - 70, T2('Raf laat los', 'Raf lets go'), { col: K.raf, size: 22, op: sub(p, .8, .95) });
        }
        $('mk-lbl').innerHTML = lb;
      },
    };
  },
};
export default SCENE;
