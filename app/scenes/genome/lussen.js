import { C, T2, svgOpen, FULL, sub, ease, lerp, f1 } from '../../kit.js';
import { inset3d, withInset } from '../../kit3d.js';
import { T } from '../prot/_b_kit.js';
import { btn } from '../prot/_fate.js';

/*
 * Lussen en buurten (zijpad epigenetica, 05-11-2026). Volgens het lusextrusiemodel trekt de eiwitring cohesine (geladen
 * met NIPBL) het DNA aan twee kanten door zich heen tot hij een CTCF-plaats raakt die naar hem toe wijst (convergente
 * oriëntatie; Rao et al. 2014, Davidson et al. 2019, Davidson & Peters 2021). Zo ontstaan contactdomeinen (TADs).
 * Stap 3 en 5: echte menselijke cohesine–NIPBL–CTCF–DNA (PDB 7W1M; Zhang et al., Mol Cell 2023; cryo-EM 6,5 Å) in 3D.
 * 7W1M-ketens (RCSB, nagekeken 05-11-2026): A = SMC1A, B = SMC3, C = RAD21 (ring; van SMC1A/SMC3 vooral de koppen),
 *   D = STAG1 (SA1), E = NIPBL, F + G = DNA (118 bp), H = CTCF (223–577: N-terminaal motief raakt STAG1, zinkvingers op het DNA).
 * Lokale kopie data/pdb/7W1M.cif: ingekort tot CA/P en star gedraaid (lange as = y; CTCF onderaan).
 */
const L3 = (nl, en) => ({ nl, en });
const Y = 640, X0 = 800, SITE = 300;            // hoogte van het DNA, plaats waar de ring laadt, afstand tot de stop-eiwitten
const RING = '#ffc247', STOP = '#ff8a3d', HELP = '#5fd3e6', SA = '#7fdc6a', NB1 = '#5fd3e6', NB2 = '#b39ddb';
const SPH = (color, radius = 3) => ({ sphere: { color, radius } });
const GREY = SPH('#3a4560', 2.4);
const BASE3 = [{ sel: { chain: ['A', 'B', 'C'] }, style: SPH(RING) }, { sel: { chain: 'D' }, style: SPH(SA) }, { sel: { chain: 'E' }, style: SPH(HELP) },
  { sel: { chain: ['F', 'G'] }, style: SPH(C.dna, 3.4) }, { sel: { chain: 'H' }, style: SPH(STOP) }];
const S3 = {
  2: { spin: .010, zoom: { chain: ['A', 'B', 'C', 'D', 'E', 'F', 'G'] }, focus: [
    { sel: { chain: ['A', 'B', 'C'] }, style: SPH(RING) }, { sel: { chain: 'E' }, style: SPH(HELP) },
    { sel: { chain: 'D' }, style: SPH(SA) }, { sel: { chain: ['F', 'G'] }, style: SPH(C.dna, 3.4) }, { sel: { chain: 'H' }, style: GREY }] },
  4: { spin: .008, zoom: {}, focus: [
    { sel: { chain: ['A', 'B', 'C', 'E'] }, style: GREY }, { sel: { chain: 'D' }, style: SPH(SA) },
    { sel: { chain: ['F', 'G'] }, style: SPH(C.dna, 3.4) }, { sel: { chain: 'H' }, style: SPH(STOP, 3.4), label: L3('stop-eiwit', 'stop protein') }] },
};

/* punt van het DNA op booglengte s, als de ring al g eenheden aan elke kant binnengetrokken heeft */
function pos(s, g) {
  if (Math.abs(s) <= g && g > 0) {
    const u = s / g, r = g * .5;
    return [X0 + r * Math.sin(Math.PI * u), Y - r - r * Math.cos(Math.PI * u)];
  }
  return [X0 + Math.sign(s) * (Math.abs(s) - g), Y];
}
const pathOf = pts => pts.map((q, i) => `${i ? 'L' : 'M'}${f1(q[0])},${f1(q[1])}`).join('');
/* stop-eiwit als pijlpunt; dir = +1 wijst naar rechts */
const stop = (x, y, dir, op = 1) => op <= .01 ? '' : `<path d="M${f1(x - dir * 26)},${f1(y - 30)} L${f1(x + dir * 26)},${f1(y)} L${f1(x - dir * 26)},${f1(y + 30)} Z" fill="${STOP}" stroke="#0a1224" stroke-width="2" opacity="${f1(op)}"/>`;
const ring = (x, y, op = 1) => op <= .01 ? '' : `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="40" ry="26" fill="none" stroke="${RING}" stroke-width="11" opacity="${f1(op)}"/>`;

/* één lus met ring (stap 0–4) */
function single(g, op, ringOp) {
  if (op <= .01) return '';
  const pts = [];
  for (let s = -1150; s <= 1150; s += 6) pts.push(pos(s, g));
  let o = `<g opacity="${f1(op)}"><path d="${pathOf(pts)}" stroke="${C.dna}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  for (let s = -1140; s <= 1140; s += 60) { const q = pos(s, g); o += `<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="5" fill="${C.dna2}"/>`; }
  const a = pos(-SITE, g), b = pos(SITE, g);
  o += stop(a[0] - 34, a[1], 1) + stop(b[0] + 34, b[1], -1);
  o += ring(X0, Y - 4, ringOp) + '</g>';
  return o;
}
/* twee lussen = twee buurten (stap 5–6) */
function double(op) {
  if (op <= .01) return '';
  const R = 150, XS = [520, 1080];
  let o = `<g opacity="${f1(op)}">`;
  XS.forEach((x, k) => { o += `<circle cx="${x}" cy="${Y - R}" r="${R + 40}" fill="${k ? NB2 : NB1}" fill-opacity=".12" stroke="${k ? NB2 : NB1}" stroke-width="2" stroke-dasharray="8 6"/>`; });
  let d = `M-60,${Y}`;
  XS.forEach(x => { d += ` L${x},${Y} C${x - 2 * R},${Y} ${x - 1.3 * R},${Y - 2.2 * R} ${x},${Y - 2 * R} C${x + 1.3 * R},${Y - 2.2 * R} ${x + 2 * R},${Y} ${x},${Y}`; });
  d += ` L1660,${Y}`;
  o += `<path d="${d}" stroke="${C.dna}" stroke-width="10" fill="none" stroke-linejoin="round"/>`;
  XS.forEach((x, k) => {
    o += stop(x - 70, Y, 1) + stop(x + 70, Y, -1) + ring(x, Y - 4);
    o += T(x, Y - 230, k ? T2('buurt 2', 'neighbourhood 2') : T2('buurt 1', 'neighbourhood 1'), { size: 28, col: k ? NB2 : NB1, w: 700 });
  });
  // binnen een buurt: vaak contact · tussen buurten: zelden
  o += `<path d="M440,${Y - 130} Q520,${Y - 70} 600,${Y - 130}" stroke="${C.ok}" stroke-width="4" fill="none" stroke-dasharray="7 6"/>` + T(520, Y - 160, T2('✓ vaak contact', '✓ frequent contact'), { size: 24, col: C.ok });
  o += `<path d="M690,${Y - 170} L910,${Y - 170}" stroke="${C.danger}" stroke-width="4" stroke-dasharray="7 6"/>` + T(800, Y - 190, T2('✗ zelden', '✗ rarely'), { size: 26, col: C.danger, w: 700 });
  return o + '</g>';
}

export default {
  id: 'lussen',
  title: L3('Een eiwitring vouwt het DNA in lussen', 'A protein ring folds the DNA into loops'),
  scale: L3('lussen van ≈ 50 000 tot 1 miljoen basenparen (schematisch)', 'loops of ≈ 50,000 to 1 million base pairs (schematic)'),
  time: L3('in de proefbuis tot ≈ 2000 basenparen per seconde', 'in the test tube up to ≈ 2,000 base pairs per second'),
  org: L3('mens · PDB 7W1M', 'human · PDB 7W1M'),
  legend: [[C.dna, L3('DNA', 'DNA')], [RING, L3('eiwitring die lussen trekt', 'protein ring that pulls loops')], [STOP, L3('stop-eiwit (wijst in een richting)', 'stop protein (points one way)')],
    [HELP, L3('helper die de ring laadt (alleen in 3D)', 'helper that loads the ring (3D only)')], [SA, L3('deel van de ring waar het stop-eiwit aangrijpt (3D)', 'part of the ring the stop protein grabs (3D)')]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Stap 3 en 5 tonen de echte cryo-EM-structuur van de menselijke ring met zijn helper, het stop-eiwit en DNA (Zhang et al., <i>Mol Cell</i> 2023). Elk bolletje is één aminozuur of één DNA-letter.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Steps 3 and 5 show the real cryo-EM structure of the human ring with its helper, the stop protein and DNA (Zhang et al., <i>Mol Cell</i> 2023). Each bead is one amino acid or one DNA letter.</p>' },
  simplified: {
    nl: 'Schematisch: echte lussen zijn tienduizenden tot een miljoen basenparen lang en zitten vol nucleosomen. Dit is het huidige model (lusextrusie): het is in de proefbuis rechtstreeks gezien en verklaart veel metingen in cellen, maar hoe het in levende cellen precies verloopt, wordt nog onderzocht (in levende cellen zijn lussen beweeglijk en vaak maar half af). In de 3D-structuur zijn van de lange armen van de ring vooral de koppen te zien.',
    en: 'Schematic: real loops are tens of thousands to a million base pairs long and full of nucleosomes. This is the current model (loop extrusion): it has been seen directly in the test tube and explains many measurements in cells, but exactly how it works in living cells is still being studied (in living cells loops are dynamic and often only partly formed). In the 3D structure mainly the heads of the ring’s long arms are visible.' },
  steps: [
    { dur: 7500, cam: FULL, title: L3('Het DNA ligt in lussen', 'The DNA lies in loops'),
      text: L3('In de kern ligt het DNA niet gestrekt, maar in lussen. Hoe ontstaat zo’n lus?', 'In the nucleus the DNA is not stretched out but lies in loops. How does such a loop form?') },
    { dur: 9000, cam: FULL, title: L3('Een eiwitring trekt een lus', 'A protein ring pulls a loop'),
      text: L3('Een eiwitring grijpt het DNA en trekt het aan twee kanten door zich heen. Zo groeit een lus.', 'A protein ring grabs the DNA and pulls it through itself on both sides. That is how a loop grows.') },
    { dur: 9000, cam: FULL, title: L3('Zo ziet de echte ring eruit', 'This is what the real ring looks like'),
      text: L3('Dit is het echte complex van de mens: de ring en zijn helper houden het DNA vast.', 'This is the real human complex: the ring and its helper hold on to the DNA.') },
    { dur: 8500, cam: FULL, title: L3('Een stop-eiwit houdt de ring tegen', 'A stop protein holds the ring back'),
      text: L3('Een stop-eiwit op het DNA houdt de ring tegen, maar alleen als het naar de ring wijst.', 'A stop protein on the DNA holds the ring back, but only if it points towards the ring.') },
    { dur: 9000, cam: FULL, title: L3('Het stop-eiwit grijpt de ring', 'The stop protein grabs the ring'),
      text: L3('Het stop-eiwit zit vast op het DNA. Met één uiteinde raakt het de ring: daarom telt de richting.', 'The stop protein is fixed on the DNA. One end touches the ring: that is why the direction matters.') },
    { dur: 8500, cam: FULL, title: L3('Elke lus vormt een buurt', 'Each loop forms a neighbourhood'),
      text: L3('Binnen een lus raken stukken DNA elkaar vaak, tussen twee lussen zelden. Zo ontstaan buurten.', 'Within a loop, pieces of DNA often touch; between two loops, rarely. This creates neighbourhoods.') },
    { dur: 8500, cam: FULL, title: L3('Zo werkt het volgens het huidige model', 'This is how it works in the current model'),
      text: L3('Proeven tonen dit sterk aan. Maar in levende cellen zijn lussen beweeglijk en vaak maar half af.', 'Experiments show this strongly. But in living cells loops are dynamic and often only partly formed.') },
  ],
  svg() {
    return svgOpen() + `
    <g id="lu-2d"><g data-node="chromatine" data-nolabel data-color="${C.dna}"><g id="lu-dna"></g></g><g id="lu-fx"></g></g>
    <g id="lu-3d" opacity="0">
      <rect x="134" y="124" width="1072" height="622" rx="22" fill="#0b1224" stroke="#2a3550" stroke-width="3"/>
      <rect id="lu-box" x="140" y="130" width="1060" height="610" rx="16" fill="#0b1224"/>
      <g opacity=".5"><path d="M200,600 L1140,600" stroke="${C.dna}" stroke-width="14"/><ellipse cx="670" cy="420" rx="170" ry="120" fill="none" stroke="${RING}" stroke-width="18"/><path d="M640,600 L700,600" stroke="${STOP}" stroke-width="30"/></g>
      ${T(670, 700, T2('3D-structuur laden…', 'loading 3D structure…'), { size: 24, col: C.muted, w: 500 })}
      ${T(1230, 200, T2('Het echte complex', 'The real complex'), { size: 28, anchor: 'start', w: 700 })}
      ${T(1230, 238, T2('mens · PDB 7W1M', 'human · PDB 7W1M'), { size: 24, anchor: 'start', col: C.muted, w: 500 })}
      ${T(1230, 320, T2('● ring', '● ring'), { size: 26, anchor: 'start', col: RING })}
      ${T(1230, 362, T2('● helper', '● helper'), { size: 26, anchor: 'start', col: HELP })}
      ${T(1230, 404, T2('● DNA', '● DNA'), { size: 26, anchor: 'start', col: C.dna2 })}
      ${T(1230, 446, T2('● stop-eiwit', '● stop protein'), { size: 26, anchor: 'start', col: STOP })}
      ${T(1230, 488, T2('● grijpplaats', '● grip site'), { size: 26, anchor: 'start', col: SA })}
    </g>
    ${btn('chromatine', 40, 290, T2('↑ chromatine', '↑ chromatin'), C.histone)}
    ${btn('enhancer', 1150, 410, T2('volgende: een verre versterker →', 'next: a distant switch →'), '#ffb27a')}
    </svg>`;
  },
  init(svg, api) {
    const $ = id => svg.getElementById(id);
    const v3 = inset3d(svg, { pdb: '7W1M', format: 'cif', box: 'lu-box', base: BASE3, steps: S3, dimOpacity: false, off: !api?.node });
    return withInset({
      update(t, s) {
        const { step, p } = s;
        const op3 = v3.update(s);
        $('lu-3d').setAttribute('opacity', f1(op3));
        $('lu-2d').setAttribute('opacity', f1(1 - op3));
        const ph = (i, a, b) => step > i ? 1 : step < i ? 0 : ease(sub(p, a, b));
        const g = 200 * ph(1, .25, .95) + 100 * ph(3, .1, .7);
        const ringOp = step === 0 ? 0 : step === 1 ? ease(sub(p, 0, .2)) : 1;
        const kDbl = ph(5, .25, .6), kSgl = step < 5 ? 1 : step === 5 ? 1 - ease(sub(p, 0, .35)) : 0;
        $('lu-dna').innerHTML = single(g, kSgl, ringOp) + double(kDbl);
        let fx = '';
        if (step === 0) fx += T(X0, Y - 120, T2('?', '?'), { size: 60, col: C.trna, w: 800, op: ease(sub(p, .3, .6)) });
        if (step === 1 || step === 2) {
          const o = step === 1 ? ease(sub(p, .3, .5)) : 1;
          fx += T(X0, Y - 2 * g * .5 - 30, T2('lus', 'loop'), { size: 30, col: C.dna2, w: 700, op: o }) + T(X0, Y + 70, T2('ring', 'ring'), { size: 26, col: RING, w: 700, op: o });
        }
        if (step >= 1 && step <= 4) {
          const a = pos(-SITE, g), b = pos(SITE, g), o = step === 1 ? ease(sub(p, .1, .3)) : 1;
          fx += T(a[0] - 40, Y + 70, T2('stop →', 'stop →'), { size: 24, col: STOP, op: o * (step >= 3 ? 0 : 1) }) + T(b[0] + 40, Y + 70, T2('← stop', '← stop'), { size: 24, col: STOP, op: o * (step >= 3 ? 0 : 1) });
        }
        if (step === 3 || step === 4) fx += T(X0, Y + 80, T2('stop-eiwit bereikt: de lus groeit niet verder', 'stop protein reached: the loop stops growing'), { size: 26, col: STOP, w: 700, op: step === 3 ? ease(sub(p, .7, .9)) : 1 });
        if (step === 6) {
          const o = ease(sub(p, .1, .35));
          fx += `<g opacity="${f1(o)}"><rect x="470" y="120" width="660" height="150" rx="18" fill="rgba(13,20,38,.92)" stroke="${C.trna}" stroke-width="2"/></g>` +
            T(800, 166, T2('volgens het huidige model', 'according to the current model'), { size: 28, col: C.trna, w: 700, op: o }) +
            T(500, 210, T2('✓ sterk bewijs in proeven', '✓ strong evidence in experiments'), { size: 24, col: C.ok, anchor: 'start', op: o }) +
            T(500, 248, T2('? in levende cellen: beweeglijk, vaak half af', '? in living cells: dynamic, often partly formed'), { size: 24, col: C.text, anchor: 'start', op: o });
        }
        $('lu-fx').innerHTML = fx;
      },
      destroy() { v3.destroy(); },
    }, v3);
  },
};
