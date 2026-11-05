import { C, T2, svgOpen, FULL, cam, sub, ease, lerp, f1 } from '../../kit.js';
import { inset3d, withInset } from '../../kit3d.js';
import { T } from './_b_kit.js';
import { arrow } from '../repl/_draw.js';
import { DEST, bilayer, at, beadsAt, btn } from './_fate.js';

/*
 * Import in het mitochondrion: een N-terminale presequentie (positief geladen amfipathische helix) leidt het eiwit
 * ontvouwen door de poort van de buitenmembraan (TOM) en die van de binnenmembraan (TIM23). De membraanpotentiaal
 * (binnen negatief) trekt de presequentie naar binnen; MPP knipt ze af; mtHsp70 trekt de rest en helpt vouwen.
 * Stap 2–3: echte menselijke TOM-kerncomplex (PDB 7CP9; Guan et al., Cell Discov 2021; cryo-EM 3,0 Å) in 3D.
 * 7CP9-ketens (RCSB): I, J = TOM40 · G, H = TOM22 · A, B = TOM5 · C, D = TOM6 · E, F = TOM7 (dimeer: twee kanalen).
 * Lokale kopie star gedraaid: membraannormaal = +y (cytosol boven), de twee TOM40-tonnen naast elkaar op de x-as.
 */
const L3 = (nl, en) => ({ nl, en });
const T40 = '#9b7bff', T22 = '#ff8a3d', TSM = '#7fdc6a', MITO = DEST.mito, PRE = DEST.mito, HSP = '#5fd3e6', MPP = '#e0708f';
const CART = col => ({ cartoon: { color: col } });
const BASE3 = [{ sel: { chain: ['I', 'J'] }, style: CART(T40) }, { sel: { chain: ['G', 'H'] }, style: CART(T22) }, { sel: { chain: ['A', 'B', 'C', 'D', 'E', 'F'] }, style: CART(TSM) }];
const S3 = {
  2: { spin: .012, focus: [{ sel: { chain: 'I' }, style: CART(T40), label: L3('kanaal 1', 'channel 1') }, { sel: { chain: 'J' }, style: CART(T40), label: L3('kanaal 2', 'channel 2') },
    { sel: { chain: ['G', 'H'] }, style: CART(T22) }, { sel: { chain: ['A', 'B', 'C', 'D', 'E', 'F'] }, style: CART(TSM) }] },
  3: { spin: .008, zoom: { chain: 'I' }, focus: [{ sel: { chain: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'] }, style: { cartoon: { color: '#46506a' } } },
    { sel: { chain: 'I' }, style: CART(T40), label: L3('ton van strengen', 'barrel of strands') }] },
};

/* membranen: buiten (OM) en binnen (IM) */
const OM = 320, IM = 480, MH = 56, TX = 700, IX = 780;
const SP = 28, R = 11, NB = 22, NPRE = 3;
/* pad van de keten (booglengte 0 = in het opgevouwen eiwit in het cytosol) */
const FP = [[430, 175], [TX, 205], [TX, OM + MH / 2 + 10], [IX, IM - MH / 2 - 14], [IX, IM + MH / 2 + 40], [IX - 40, 640], [IX - 160, 690], [IX - 300, 670], [IX - 380, 600], [IX - 330, 540], [IX - 220, 560]];
const ARC = FP.slice(1).reduce((a, q, i) => a + Math.hypot(q[0] - FP[i][0], q[1] - FP[i][1]), 0);
const D_IN = 282 + (OM + MH / 2 + 10 - 205) + Math.hypot(IX - TX, IM - MH / 2 - 14 - (OM + MH / 2 + 10)) + (MH + 54) + 20;   // begin net voorbij de binnenmembraan
const FOLD = [IX - 220, 640];                            // waar het eiwit in de matrix opvouwt

/* opgevouwen eiwit (kluwen) met de plus-spiraal vooraan */
function folded(x, y, r, op, helix = 1) {
  if (op <= .01) return '';
  let s = `<g opacity="${f1(op)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="rgba(127,220,106,.22)" stroke="${C.chain}" stroke-width="3"/>` +
    `<path d="M${f1(x - r * .6)},${f1(y)} q${f1(r * .3)},${f1(-r * .5)} ${f1(r * .6)},0 t${f1(r * .6)},0" stroke="${C.chain}" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
  if (helix > .01) {
    let h = '';
    for (let i = 0; i < 5; i++) h += `<ellipse cx="${f1(x + r + 18 + i * 16)}" cy="${f1(y)}" rx="9" ry="22" fill="none" stroke="${PRE}" stroke-width="5"/>`;
    for (let i = 0; i < 3; i++) h += T(x + r + 26 + i * 26, y - 32, '+', { size: 28, col: '#4f8ff7', w: 800 });
    s += `<g opacity="${f1(op * helix)}">${h}</g>`;
  }
  return s;
}

export default {
  id: 'mito',
  title: { nl: 'Een eiwit glipt uitgerold het mitochondrion in', en: 'A protein slips unfolded into the mitochondrion' },
  scale: { nl: 'schematisch (de echte poort is ≈ 13 nm breed)', en: 'schematic (the real gate is ≈ 13 nm wide)' },
  time: { nl: 'vertraagd (schematisch)', en: 'slowed down (schematic)' },
  org: { nl: 'mens · PDB 7CP9', en: 'human · PDB 7CP9' },
  legend: [[MITO, L3('membranen van het mitochondrion', 'mitochondrial membranes')], [PRE, L3('adreslabel (plus-spiraal vooraan)', 'address label (plus spiral at the start)')], [C.chain, L3('eiwitketen', 'protein chain')],
    [T40, L3('poort buiten: TOM40 (kanaal)', 'outer gate: TOM40 (channel)')], [T22, L3('TOM22 (ontvanger)', 'TOM22 (receiver)')], [TSM, L3('kleine TOM-eiwitten', 'small TOM proteins')], [MPP, L3('knipenzym (MPP)', 'cutting enzyme (MPP)')], [HSP, L3('helper (mtHsp70)', 'helper (mtHsp70)')]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Stap 3 en 4 tonen de echte cryo-EM-structuur van de menselijke TOM-poort (Guan et al., <i>Cell Discov</i> 2021): twee tonvormige kanalen naast elkaar. De rest is een schema.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Steps 3 and 4 show the real cryo-EM structure of the human TOM gate (Guan et al., <i>Cell Discov</i> 2021): two barrel-shaped channels side by side. The rest is a diagram.</p>' },
  simplified: {
    nl: 'Schematisch: de keten telt 22 bolletjes in plaats van honderden aminozuren en het label 3 bolletjes. De ontvangers aan de buitenkant (o.a. Tom20) en de onderdelen van de binnenpoort en de motor zijn niet apart getekend; de 3D-structuur is het kerncomplex zonder Tom20 en Tom70. Getoond is de gewone route naar de binnenste ruimte (matrix); andere mitochondriale eiwitten volgen andere routes.',
    en: 'Schematic: the chain has 22 beads instead of hundreds of amino acids and the label 3 beads. The receivers on the outside (e.g. Tom20) and the parts of the inner gate and motor are not drawn separately; the 3D structure is the core complex without Tom20 and Tom70. Shown is the usual route to the innermost space (matrix); other mitochondrial proteins follow other routes.' },
  steps: [
    { dur: 8000, cam: FULL, title: L3('Het mitochondrion maakt zelf maar 13 eiwitten', 'The mitochondrion makes only 13 proteins itself'),
      text: L3('Het eigen DNA van het mitochondrion levert 13 eiwitten. Meer dan 1000 andere komen van buiten.', 'The mitochondrion’s own DNA provides 13 proteins. More than 1000 others come from outside.') },
    { dur: 8000, cam: cam(590, 300, 1110), title: L3('Een plus-spiraal vooraan is het adres', 'A plus spiral at the start is the address'),
      text: L3('Vooraan zit een spiraaltje met aan één kant plusladingen. Dat is het adres van het mitochondrion.', 'At the start sits a little spiral with plus charges on one side. That is the mitochondrion’s address.') },
    { dur: 8500, cam: FULL, title: L3('De poort in de buitenste membraan', 'The gate in the outer membrane'),
      text: L3('Dit is de echte poort van de mens in de buitenste membraan. Ze heeft twee kanalen naast elkaar.', 'This is the real human gate in the outer membrane. It has two channels side by side.') },
    { dur: 8500, cam: FULL, title: L3('Elk kanaal is een smalle ton', 'Each channel is a narrow barrel'),
      text: L3('Elk kanaal is een ton van eiwitstrengen. Er past alleen een uitgerolde keten door.', 'Each channel is a barrel of protein strands. Only an unrolled chain fits through.') },
    { dur: 9000, cam: FULL, title: L3('Uitgerold door twee poorten', 'Unrolled through two gates'),
      text: L3('Het eiwit wordt uitgerold. Het begin schuift door een poort in de buitenste en dan in de binnenste membraan.', 'The protein is unrolled. Its start slides through a gate in the outer and then the inner membrane.') },
    { dur: 8500, cam: cam(IX, IM + 60, 1000), title: L3('De spanning trekt het label naar binnen', 'The voltage pulls the label inside'),
      text: L3('Over de binnenste membraan staat een spanning: binnen negatief. Die trekt het positieve label naar binnen.', 'There is a voltage across the inner membrane: negative inside. It pulls the positive label in.') },
    { dur: 8000, cam: cam(IX - 60, IM + 140, 1000), title: L3('Een schaar knipt het label af', 'A pair of scissors cuts off the label'),
      text: L3('Binnen knipt een enzym het adreslabel eraf. Het label is niet meer nodig.', 'Inside, an enzyme cuts off the address label. The label is no longer needed.') },
    { dur: 9500, cam: FULL, title: L3('Een helper trekt het eiwit binnen en vouwt het op', 'A helper pulls the protein in and folds it'),
      text: L3('Een helper trekt de rest van de keten naar binnen. Daarna helpt hij het eiwit weer op te vouwen.', 'A helper pulls the rest of the chain inside. Then it helps the protein fold up again.') },
  ],
  svg() {
    return svgOpen() + `
    <g id="mi-2d">
      <rect x="-300" y="${OM + MH / 2}" width="2200" height="${IM - OM - MH}" fill="rgba(255,138,61,.05)"/>
      <rect x="-300" y="${IM + MH / 2}" width="2200" height="600" fill="rgba(255,138,61,.10)"/>
      ${bilayer(-300, 1900, OM, { h: MH, col: MITO, gap: [TX - 60, TX + 60] })}
      ${bilayer(-300, 1900, IM, { h: MH, col: MITO, gap: [IX - 60, IX + 60] })}
      ${T(1590, OM + 10, T2('buitenste membraan', 'outer membrane'), { size: 24, anchor: 'end', col: MITO })}
      ${T(1590, IM + 10, T2('binnenste membraan', 'inner membrane'), { size: 24, anchor: 'end', col: MITO })}
      ${T(130, 200, T2('cytosol', 'cytosol'), { size: 28, anchor: 'start', col: C.muted })}
      ${T(860, 790, T2('binnenste ruimte (matrix)', 'innermost space (matrix)'), { size: 26, anchor: 'start', col: MITO })}
      <g id="mi-gates"></g><g id="mi-bg"></g><g id="mi-chain"></g><g id="mi-fx"></g>
    </g>
    <g id="mi-3d" opacity="0">
      <rect x="134" y="124" width="1072" height="622" rx="22" fill="#0b1224" stroke="#2a3550" stroke-width="3"/>
      <rect id="mi-box" x="140" y="130" width="1060" height="610" rx="16" fill="#0b1224"/>
      <g opacity=".5">${bilayer(160, 1180, 440, { h: 120, col: MITO })}<ellipse cx="540" cy="440" rx="80" ry="90" fill="none" stroke="${T40}" stroke-width="14"/><ellipse cx="800" cy="440" rx="80" ry="90" fill="none" stroke="${T40}" stroke-width="14"/></g>
      ${T(670, 660, T2('3D-structuur laden…', 'loading 3D structure…'), { size: 24, col: C.muted, w: 500 })}
      ${T(1230, 360, T2('De echte poort', 'The real gate'), { size: 28, anchor: 'start', w: 700 })}
      ${T(1230, 398, T2('mens · PDB 7CP9', 'human · PDB 7CP9'), { size: 24, anchor: 'start', col: C.muted, w: 500 })}
      ${T(1230, 190, T2('↑ cytosol', '↑ cytosol'), { size: 26, anchor: 'start', col: C.muted })}
      ${T(1230, 710, T2('↓ tussen de', '↓ between the'), { size: 26, anchor: 'start', col: MITO })}${T(1258, 742, T2('membranen', 'membranes'), { size: 26, anchor: 'start', col: MITO })}
    </g>
    ${btn('sortering', 40, 330, T2('↑ overzicht adreslabels', '↑ address labels overview'), C.ok)}
    ${btn('perox', 1190, 370, T2('volgende: peroxisoom →', 'next: peroxisome →'), DEST.perox)}
    </svg>`;
  },
  init(svg, api) {
    const $ = id => svg.getElementById(id);
    const v3 = inset3d(svg, { pdb: '7CP9', format: 'pdb', box: 'mi-box', base: BASE3, steps: S3, off: !api?.node });
    return withInset({
      update(t, s) {
        const { step, p } = s;
        const op3 = v3.update(s);
        $('mi-3d').setAttribute('opacity', f1(op3));
        $('mi-2d').setAttribute('opacity', f1(1 - op3));
        const ph = (i, a, b) => step > i ? 1 : step < i ? 0 : ease(sub(p, a, b));
        const kHel = ph(1, .1, .45), kUnf = ph(4, .05, .9), kPull = ph(5, .15, .8), kCut = ph(6, .1, .45), kAway = ph(6, .5, .95), kIn = ph(7, .05, .55), kFold = ph(7, .6, .95);
        // poorten (2D)
        const gate = (x, y, col, lab, side) => `<rect x="${x - 60}" y="${y - MH / 2 - 10}" width="34" height="${MH + 20}" rx="12" fill="${col}" fill-opacity=".35" stroke="${col}" stroke-width="3"/>` +
          `<rect x="${x + 26}" y="${y - MH / 2 - 10}" width="34" height="${MH + 20}" rx="12" fill="${col}" fill-opacity=".35" stroke="${col}" stroke-width="3"/>` + T(x + side * 80, y + 9, lab, { size: 24, col, anchor: side > 0 ? 'start' : 'end' });
        $('mi-gates').innerHTML = gate(TX, OM, T40, T2('poort buiten', 'outer gate'), -1) + gate(IX, IM, '#c08bff', T2('poort binnen', 'inner gate'), 1);
        // achtergrond van stap 0: eigen DNA in de matrix, eiwitten van buiten
        const k0 = step === 0 ? 1 : step === 1 ? 1 - ease(sub(p, 0, .3)) : 0;
        let bg = '';
        if (k0 > .01) {
          bg += `<g opacity="${f1(k0)}"><circle cx="1180" cy="680" r="46" fill="none" stroke="${C.dna}" stroke-width="7"/>` + T(1180, 692, '13', { size: 32, col: C.text, w: 800 }) +
            T(1250, 690, T2('eigen DNA: 13 eiwitten', 'own DNA: 13 proteins'), { size: 26, anchor: 'start', col: C.dna2 });
          for (let i = 0; i < 6; i++) bg += `<circle cx="${700 + i * 80}" cy="${150 + (i % 2) * 40}" r="20" fill="rgba(127,220,106,.25)" stroke="${C.chain}" stroke-width="3"/>`;
          bg += T(900, 250, T2('> 1000 eiwitten van buiten', '> 1000 proteins from outside'), { size: 26, col: C.chain }) + arrow(900, 270, 900, OM - 40, C.chain, 4) + '</g>';
        }
        // + en − over de binnenmembraan (stap 5 en later)
        const kV = ph(5, .05, .3);
        if (kV > .01) {
          for (let i = 0; i < 6; i++) bg += T(IX + 120 + i * 70, IM - MH / 2 - 14, '+', { size: 30, col: '#4f8ff7', w: 800, op: kV }) + T(IX + 120 + i * 70, IM + MH / 2 + 34, '−', { size: 34, col: C.danger, w: 800, op: kV });
          bg += T(IX + 300, IM + MH / 2 + 80, T2('binnen negatief', 'negative inside'), { size: 26, col: C.danger, op: kV });
        }
        $('mi-bg').innerHTML = bg;
        // keten: Lpush = hoe ver het begin langs het pad is
        let Lpush = step < 4 ? 0 : lerp(0, D_IN, kUnf) + 90 * kPull + (NB * SP) * kIn;
        let ch = '', fx = '';
        const nIn = Math.max(0, Math.min(NB, Math.floor(Lpush / SP) + 1));    // bolletjes al uit het kluwen
        if (step >= 4 || step === 3) {
          const P = [], cols = [];
          for (let k = 0; k < nIn; k++) {
            let q = at(FP, Lpush - k * SP);
            if (kFold > 0 && k >= NPRE) { const a = k * 2.1, rr = 16 + (k % 4) * 9; q = [lerp(q[0], FOLD[0] + Math.cos(a) * rr, kFold), lerp(q[1], FOLD[1] + Math.sin(a) * rr, kFold)]; }
            P.push(q); cols.push(k < NPRE ? PRE : C.chain);
          }
          // het label wordt afgeknipt en drijft weg
          const pre = P.slice(0, NPRE), rest = P.slice(NPRE);
          if (rest.length) ch += beadsAt(rest, () => C.chain, R);
          if (pre.length) {
            const off = [lerp(0, 120, kAway), lerp(0, 60, kAway)];
            const preP = pre.map(q => [q[0] + off[0] * (kCut > .99 ? 1 : 0), q[1] + off[1] * (kCut > .99 ? 1 : 0)]);
            if (kCut < .99 && rest.length) ch += `<line x1="${f1(pre[pre.length - 1][0])}" y1="${f1(pre[pre.length - 1][1])}" x2="${f1(rest[0][0])}" y2="${f1(rest[0][1])}" stroke="${C.chain}" stroke-width="5"/>`;
            ch += beadsAt(preP, () => PRE, R, 1 - kAway * .8, PRE);
          }
          // wat nog in het cytosol als kluwen zit
          const left = NB - nIn;
          if (left > 0) ch += folded(FP[0][0], FP[0][1], 22 + left * 1.6, 1, 0);
        }
        if (step <= 3) ch += folded(FP[0][0], FP[0][1], 22 + NB * 1.6, step === 0 ? 0 : 1, kHel) + (step === 1 ? T(FP[0][0] + 120, FP[0][1] + 92, T2('plus-spiraal', 'plus spiral'), { size: 26, col: PRE, op: ease(sub(p, .4, .7)) }) : '');
        // knipenzym (stap 6) en helper (stap 7)
        if (step === 6 || (step === 7 && p < .2)) {
          const o = step === 6 ? ease(sub(p, 0, .15)) : 1 - ease(sub(p, 0, .2));
          const q = at(FP, Lpush - NPRE * SP + SP / 2);
          fx += `<g opacity="${f1(o)}"><ellipse cx="${f1(q[0] - 60)}" cy="${f1(q[1] + 10)}" rx="54" ry="30" fill="${MPP}" fill-opacity=".3" stroke="${MPP}" stroke-width="3"/>` + T(q[0] - 60, q[1] + 18, T2('schaar', 'scissors'), { size: 22 }) + '</g>' +
            (kCut > .5 ? T(q[0] + 10, q[1] - 26, '✂', { size: 34, op: o * (1 - kAway) }) : '');
        }
        if (step === 7) {
          const o = ease(sub(p, .05, .25));
          const hx = kFold > 0 ? FOLD[0] + 110 : lerp(IX + 90, IX + 60, kIn), hy = kFold > 0 ? FOLD[1] : IM + MH / 2 + 60;
          fx += `<g opacity="${f1(o)}"><ellipse cx="${f1(hx)}" cy="${f1(hy)}" rx="60" ry="34" fill="${HSP}" fill-opacity=".3" stroke="${HSP}" stroke-width="3"/>` + T(hx, hy + 8, T2('helper', 'helper'), { size: 22 }) + '</g>';
          fx += T(FOLD[0], FOLD[1] + 110, T2('✓ opgevouwen', '✓ folded'), { size: 26, col: C.ok, op: ease(sub(p, .85, 1)) });
        }
        if (step === 5) fx += arrow(IX + 70, IM - 20, IX + 70, IM + 110, '#4f8ff7', 5, ease(sub(p, .2, .5)));
        $('mi-chain').innerHTML = ch; $('mi-fx').innerHTML = fx;
      },
      destroy() { v3.destroy(); },
    }, v3);
  },
};
