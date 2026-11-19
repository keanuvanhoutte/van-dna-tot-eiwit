import { C, T2, svgOpen, FULL, sub, ease, lerp, f1, rng } from '../../kit.js';
import { T } from './_b_kit.js';
import { arrow } from '../repl/_draw.js';
import { DEST, icon, btn } from './_fate.js';
import { membraanPts, blaasje, blaasjeDubbel, mitochondrion, eiwitPad, vATPase } from '../../bio.js';

/*
 * Autofagie (macroautofagie): een plat membraan (fagofoor) groeit rond een stuk cytoplasma (hier een kapot mitochondrion
 * en een klont eiwitten), sluit tot een blaasje met twee membranen (autofagosoom), versmelt met een lysosoom; de inhoud
 * wordt afgebroken en de bouwstenen gaan terug naar het cytosol. Sterk aangezet bij honger (mTORC1 uit), maar ook gewoon.
 */
const L3 = (nl, en) => ({ nl, en });
const PHAG = '#c9a574', LYS = DEST.lyso, AGG = '#8a93a8', BB = C.chain;
const OC = [560, 450], OR = 190, LC = [1220, 450], LR = 120, FUSE = [960, 450];
const MITO = [500, 420], AGGC = [650, 500];
const R0 = rng(11), AGGB = Array.from({ length: 9 }, () => [(R0() - .5) * 70, (R0() - .5) * 60, 14 + R0() * 8]);
const SMALL = [[520, 230], [1380, 250], [300, 440], [1400, 560], [490, 650], [700, 740]];   // vaste plekken, buiten het paneel en het verteerblaasje

/* boog (graden, 0 = rechts, tegen de klok in negatief = omhoog) */
function arc(cx, cy, r, a0, a1, col, w, op = 1) {
  if (op <= .01 || a1 - a0 < 1) return '';
  const rad = a => a * Math.PI / 180, p = a => [cx + r * Math.cos(rad(a)), cy + r * Math.sin(rad(a))];
  if (a1 - a0 >= 359.5) return `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" fill="none" stroke="${col}" stroke-width="${w}" opacity="${f1(op)}"/>`;
  const [x0, y0] = p(a0), [x1, y1] = p(a1);
  return `<path d="M${f1(x0)},${f1(y0)} A${f1(r)},${f1(r)} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${f1(x1)},${f1(y1)}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" opacity="${f1(op)}"/>`;
}
/* kapot mitochondrion (gezwollen, weinig cristae) en een klont eiwitten */
function damagedMito(x, y, s = 1, op = 1) {
  if (op <= .01) return '';
  return `<g opacity="${f1(op)}" transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)}) rotate(-8)">${mitochondrion(0, 0, 95, 56, { n: 3, w: 7, diep: .45, matrix: 'rgba(160,150,140,.16)' })}</g>`;
}
const clump = (x, y, s = 1, op = 1) => op <= .01 ? '' : `<g opacity="${f1(op)}">${AGGB.map(([dx, dy, r], i) => { const d = eiwitPad(x + dx * s, y + dy * s, r * s, r * s * .85, 300 + i, .12); return `<path d="${d}" fill="${AGG}" fill-opacity=".75" stroke="#0a1224" stroke-width="1.5"/>`; }).join('')}</g>`;
/* fagofoor: een platte zak (twee membranen die aan de rand in elkaar overgaan), gebogen als een kom rond (cx, cy).
 * a0..a1 in graden; ri/ro = straal van het binnen- en buitenmembraan. Gesloten (≥ 360°) = autofagosoom met dubbel membraan. */
const MW = 10, RI = OR - 2, RO = OR + 16;
function fagofoor(cx, cy, a0, a1, op = 1) {
  if (op <= .01 || a1 - a0 < 2) return '';
  if (a1 - a0 >= 359) return blaasjeDubbel(cx, cy, (RI + RO) / 2, { w: MW, gap: RO - RI - MW, op });
  const rad = a => a * Math.PI / 180, N = Math.max(8, Math.round((a1 - a0) / 4)), rm = (RI + RO) / 2, h = (RO - RI) / 2;
  const arcP = (r, from, to) => Array.from({ length: N + 1 }, (_, i) => { const a = rad(from + (to - from) * i / N); return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
  const cap = (a, end) => Array.from({ length: 7 }, (_, i) => {           // afgeronde rand van de zak: buiten- gaat over in binnenmembraan
    const t = end ? Math.PI * (i + 1) / 8 : Math.PI - Math.PI * (i + 1) / 8, A = rad(a), n = [Math.cos(A), Math.sin(A)], tg = end ? [-n[1], n[0]] : [n[1], -n[0]];
    return [cx + n[0] * rm + n[0] * h * Math.cos(t) + tg[0] * h * Math.sin(t), cy + n[1] * rm + n[1] * h * Math.cos(t) + tg[1] * h * Math.sin(t)]; });
  const P = [...arcP(RO, a0, a1), ...cap(a1, true), ...arcP(RI, a1, a0), ...cap(a0, false)];
  const D = 'M' + P.map(q => f1(q[0]) + ',' + f1(q[1])).join(' L') + 'Z';
  return `<g opacity="${f1(op)}"><path d="${D}" fill="rgba(201,165,116,.14)"/>${membraanPts(P, { w: MW, closed: true })}</g>`;
}
/* lysosoom: één membraan, knipenzymen binnen, protonpompen (V-ATPase) en transporteiwitten in het membraan (rechterkant) */
const RF = 240;                                                     // het verteerblaasje na het versmelten
const A0 = [FUSE[0] - 120, OC[1]], L0 = [FUSE[0] - 120 + RO + LR + 11, OC[1]];   // autofagosoom en lysosoom raken elkaar
const VA = [-1.3, -.5, .3], TR = [-.9, -.1, .7], TRC = '#b48cff';
const ENZ = [[-.4, -.3], [.25, -.4], [.45, .15], [-.1, .3], [-.45, .25]];
const ENZF = [-40, -15, 10, 35, 60].map(a => a * Math.PI / 180), ENZIN = [70, 110, 60, 100, 85];
const mix = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
const enzym = (x, y, i, op = 1) => `<path d="${eiwitPad(x, y, 13, 10, 200 + i, .12)}" fill="${LYS}" fill-opacity="${f1(.7 * op)}"/>`;
function lysProt(c, r, op = 1) {
  if (op <= .01) return '';
  let g = `<g opacity="${f1(op)}">`;
  for (const a of VA) g += vATPase(c[0] + Math.cos(a) * r, c[1] + Math.sin(a) * r, a, { s: .6, k: 0 });
  for (const [j, a] of TR.entries()) g += `<g transform="translate(${f1(c[0] + Math.cos(a) * r)} ${f1(c[1] + Math.sin(a) * r)}) rotate(${f1(a * 180 / Math.PI)})"><path d="${eiwitPad(0, 0, 15, 9, 500 + j, .08)}" fill="${TRC}" fill-opacity=".8" stroke="#0a1224" stroke-width="1.5"/></g>`;
  return g + '</g>';
}
function lysosoom(c, r, op = 1) {
  if (op <= .01) return '';
  const g = blaasje(c[0], c[1], r, { w: 12, lumen: 'rgba(255,107,107,.12)', rand: LYS }) + ENZ.map(([dx, dy], i) => enzym(c[0] + dx * r, c[1] + dy * r, i)).join('') + lysProt(c, r);
  return `<g opacity="${f1(op)}">${g}</g>`;
}
/* versmelten via contact: de omtrek van twee overlappende cirkels (buitenmembraan van het autofagosoom c1/r1 en het lysosoom
 * c2/r2), met een afgeronde hals (de fusieporie wordt breder). k = 0 … 1: de hals vloeit open tot één rond blaasje. */
function fusieOmtrek(c1, r1, c2, r2, k, off = 0) {
  const d = Math.hypot(c2[0] - c1[0], c2[1] - c1[1]), ux = d > .01 ? (c2[0] - c1[0]) / d : 1, uy = d > .01 ? (c2[1] - c1[1]) / d : 0;
  const tr = d > .01 ? (d * d + r1 * r1 - r2 * r2) / (2 * d) : 0, O = [c1[0] + ux * tr, c1[1] + uy * tr];   // punt op de radicaallijn (in beide cirkels)
  const hit = (c, r, u) => { const dx = c[0] - O[0], dy = c[1] - O[1], b = u[0] * dx + u[1] * dy, q = b * b - dx * dx - dy * dy + r * r; return q > 0 ? Math.max(0, b + Math.sqrt(q)) : 0; };
  return Array.from({ length: 120 }, (_, i) => {
    const a = i / 120 * 2 * Math.PI, u = [Math.cos(a), Math.sin(a)], t1 = hit(c1, r1, u), t2 = hit(c2, r2, u);
    const R = lerp(Math.pow(t1 ** 6 + t2 ** 6, 1 / 6), Math.max(t1, t2), k) + off;
    return [O[0] + u[0] * R, O[1] + u[1] * R];
  });
}
export default {
  id: 'autofagie',
  title: { nl: 'De cel verteert stukken van zichzelf', en: 'The cell digests parts of itself' },
  scale: { nl: 'schematisch (een lysosoom is ≈ 0,5 µm)', en: 'schematic (a lysosome is ≈ 0.5 µm)' },
  time: { nl: 'schematisch', en: 'schematic' },
  org: { nl: 'mens', en: 'human' },
  legend: [[PHAG, L3('membraan van het zakje (fagofoor → autofagosoom)', 'membrane of the pouch (phagophore → autophagosome)')], ['#a0968c', L3('kapot mitochondrion (gezwollen, twee membranen)', 'damaged mitochondrion (swollen, two membranes)')], [AGG, L3('klont eiwitten', 'protein clump')],
    [LYS, L3('lysosoom', 'lysosome')], [TRC, L3('transporteiwit (bouwstenen naar buiten)', 'transporter (building blocks out)')], [BB, L3('bouwstenen (o.a. aminozuren)', 'building blocks (e.g. amino acids)')]],
  simplified: {
    nl: 'Schematisch en niet op schaal. Het zakje groeit uit een stukje membraan met hulp van veel eiwitten (o.a. LC3 op het membraan), die niet getekend zijn. Hier wordt een kapot mitochondrion en een klont samen ingepakt; in de cel wordt afval vaak apart en gericht ingepakt, of wordt bij honger een willekeurig stuk cytoplasma opgenomen. Er bestaan ook kleinere vormen van autofagie.',
    en: 'Schematic and not to scale. The pouch grows from a piece of membrane with the help of many proteins (e.g. LC3 on the membrane), which are not drawn. Here a damaged mitochondrion and a clump are wrapped together; in the cell waste is often wrapped separately and selectively, or in starvation a random piece of cytoplasm is taken up. Smaller forms of autophagy also exist.' },
  steps: [
    { dur: 8000, cam: FULL, title: L3('Soms moet een groot stuk weg', 'Sometimes a large piece has to go'),
      text: L3('Een kapot mitochondrion of een klont eiwitten past niet in het proteasoom. Daarvoor heeft de cel een ander systeem.', 'A damaged mitochondrion or a clump of proteins does not fit in the proteasome. The cell has another system for that.') },
    { dur: 8500, cam: FULL, title: L3('Een membraan groeit eromheen', 'A membrane grows around it'),
      text: L3('Een plat stukje membraan groeit als een kom om het afval heen.', 'A flat piece of membrane grows like a bowl around the waste.') },
    { dur: 7500, cam: FULL, title: L3('Het zakje gaat dicht', 'The pouch closes'),
      text: L3('De kom sluit zich. Nu zit het afval in een blaasje met twee membranen.', 'The bowl closes. Now the waste sits in a vesicle with two membranes.') },
    { dur: 8500, cam: FULL, title: L3('Het blaasje versmelt met het lysosoom', 'The vesicle fuses with the lysosome'),
      text: L3('Het buitenste membraan raakt een lysosoom en versmelt ermee. Zo komen de knipenzymen rond het afval.', 'The outer membrane touches a lysosome and fuses with it. This brings the cutting enzymes around the waste.') },
    { dur: 9000, cam: FULL, title: L3('Afbreken en hergebruiken', 'Break down and reuse'),
      text: L3('De enzymen breken eerst het binnenste membraan af, dan het afval. De bouwstenen gaan terug naar het cytosol.', 'The enzymes first break down the inner membrane, then the waste. The building blocks go back to the cytosol.') },
    { dur: 8500, cam: FULL, title: L3('Honger zet het aan', 'Hunger switches it on'),
      text: L3('Bij honger valt een voedingssensor in de cel stil. Dan maakt de cel veel meer van deze blaasjes.', 'In hunger a nutrient sensor in the cell goes quiet. Then the cell makes many more of these vesicles.') },
    { dur: 9000, cam: FULL, title: L3('Ook gewoon: dagelijkse schoonmaak', 'Also routine: daily cleaning'),
      text: L3('Ook zonder honger ruimt de cel zo voortdurend op. Vooral zenuwcellen hebben dat nodig.', 'Even without hunger the cell keeps cleaning up this way. Nerve cells especially need it.') },
  ],
  svg() {
    return svgOpen() + `
    <g data-node="mito" data-color="${DEST.mito}" data-label="${T2('Kapot mitochondrion', 'Damaged mitochondrion')}"><g id="af-mito"></g><circle id="af-mA" data-anchor="mito" cx="-99" cy="-99" r="1" fill="none"/></g>
    <g data-node="misvouwing" data-color="${AGG}" data-label="${T2('Klont eiwitten', 'Protein clump')}"><g id="af-agg"></g><circle id="af-aA" data-anchor="misvouwing" data-pos="below" cx="-99" cy="-99" r="1" fill="none"/></g>
    <g id="af-mem"></g>
    <g data-node="lysosoom" data-color="${LYS}" data-label="${T2('Lysosoom', 'Lysosome')}"><g id="af-lys"></g><circle id="af-lA" data-anchor="lysosoom" cx="-99" cy="-99" r="1" fill="none"/></g>
    <g id="af-fx"></g>
    ${btn('proteasoom', 40, 300, T2('← het proteasoom', '← the proteasome'), '#2cc6a8')}
    ${btn('misvouwing', 1150, 410, T2('volgende: misvouwing →', 'next: misfolding →'), C.danger)}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const put = (id, x, y) => { $(id).setAttribute('cx', f1(x)); $(id).setAttribute('cy', f1(y)); };
    return {
      update(t, s) {
        const { step, p } = s;
        const ph = (i, a, b) => step > i ? 1 : step < i ? 0 : ease(sub(p, a, b));
        const kGrow = ph(1, .05, .9), kClose = ph(2, .1, .7), kMove = ph(3, .05, .45), kFuse = ph(3, .45, .95);
        const kInner = ph(4, .05, .3), kEnz = ph(4, .2, .45), kDig = ph(4, .35, .6), kOut = ph(4, .55, .95);
        const kHung = step === 5 ? ease(sub(p, .05, .9)) : step === 6 ? 1 - ease(sub(p, 0, .4)) : 0, kDaily = ph(6, .3, .9);
        // waar het autofagosoom (c1) en het lysosoom (c2) zitten: eerst naar elkaar toe tot ze elkaar raken, dan versmelten
        const c1 = kFuse > 0 ? mix(A0, FUSE, kFuse) : mix(OC, A0, kMove), c2 = kFuse > 0 ? mix(L0, FUSE, kFuse) : mix(LC, L0, kMove);
        const r1 = lerp(RO, RF, kFuse), r2 = lerp(LR, RF, kFuse), by = OC[1];
        const contentOp = 1 - kDig;
        const dx = c1[0] - OC[0];
        const dim = step >= 5 ? 1 - .6 * Math.max(kHung, step === 6 ? 1 : 0) : 1;
        $('af-mito').innerHTML = damagedMito(MITO[0] + dx, MITO[1], step >= 2 ? .9 : 1, contentOp * dim);
        $('af-agg').innerHTML = clump(AGGC[0] + dx - 20 * kClose, AGGC[1] - 10 * kClose, 1, contentOp * dim);
        // labels binnen het zakje (niet op het membraan); na het versmelten weg
        if (step === 0) { put('af-mA', MITO[0] + dx + 40, MITO[1] - 58); put('af-aA', AGGC[0] + dx - 50, AGGC[1] + 42); }
        else if (step <= 3 && kFuse <= 0) { put('af-mA', OC[0] + dx - OR - 120, MITO[1]); put('af-aA', OC[0] + dx, OC[1] + OR + 34); }   // zodra het membraan er is: labels buiten het zakje (niet op de membraanlijnen) else { put('af-mA', -99, -99); put('af-aA', -99, -99); }
        // membraan: kom die groeit en sluit (stap 1–2), daarna autofagosoom met twee membranen
        let mem = '';
        if (step >= 1 && kFuse <= 0) {
          const ext = lerp(40, 330, kGrow) + 30 * kClose, a0 = -90 - ext / 2, a1 = -90 + ext / 2;
          mem += fagofoor(c1[0], by, a0, a1, dim);
          if (step === 1) mem += T(c1[0], by - OR - 50, T2('groeiend membraan', 'growing membrane'), { size: 26, col: PHAG, op: ease(sub(p, .3, .6)) });
          if (step === 2) mem += T(c1[0], by - OR - 50, T2('twee membranen', 'two membranes'), { size: 26, col: PHAG, op: ease(sub(p, .5, .8)) });
        }
        // lysosoom; bij het versmelten gaat het buitenmembraan van het autofagosoom over in het lysosoommembraan (fusieporie);
        // het binnenmembraan blijft eerst rond de inhoud, met de knipenzymen ertussen
        let lys = '';
        if (kFuse <= 0) lys += lysosoom(c2, LR, dim);
        else {
          const P = fusieOmtrek(c1, r1, c2, r2, kFuse), Pr = fusieOmtrek(c1, r1, c2, r2, kFuse, 8);
          const D = 'M' + P.map(q => f1(q[0]) + ',' + f1(q[1])).join(' L') + 'Z';
          lys += `<g opacity="${f1(dim)}"><path d="${D}" fill="rgba(201,165,116,.12)" opacity="${f1(1 - kFuse)}"/><path d="${D}" fill="rgba(255,107,107,.12)" opacity="${f1(kFuse)}"/>` +
            `<path d="M${Pr.map(q => f1(q[0]) + ',' + f1(q[1])).join(' L')}Z" fill="none" stroke="${LYS}" stroke-width="2.4" opacity="${f1(.9 * kFuse)}"/>` +
            membraanPts(P, { w: 11, closed: true }) + lysProt(c2, r2) + '</g>';
          // binnenmembraan: eerst heel, in stap 4 knippen de enzymen het in stukjes
          const kIn = kInner, segs = 8;
          let inner = `<circle cx="${f1(c1[0])}" cy="${f1(by)}" r="${f1(RI - MW / 2)}" fill="rgba(201,165,116,.08)" opacity="${f1(1 - kIn)}"/>`;
          for (let j = 0; j < segs; j++) {
            const half = Math.PI / segs * (1 - .75 * kIn), cA = j * 2 * Math.PI / segs + .2;
            inner += membraanPts(Array.from({ length: 13 }, (_, i) => { const a = cA - half + 2 * half * i / 12; return [c1[0] + RI * Math.cos(a), by + RI * Math.sin(a)]; }), { w: MW, op: 1 - ease(sub(kIn, .45, 1)) });
          }
          lys += `<g opacity="${f1(dim)}">${inner}</g>`;
        }
        // knipenzymen: in het lysosoom → tussen binnen- en buitenmembraan → (stap 4) naar de inhoud
        if (kFuse > 0) {
          lys += `<g opacity="${f1(dim)}">` + ENZ.map(([ex, ey], i) => {
            const e0 = [L0[0] + ex * LR - A0[0], L0[1] + ey * LR - A0[1]], rho0 = Math.hypot(e0[0], e0[1]), th0 = Math.atan2(e0[1], e0[0]);
            const rho = lerp(lerp(rho0, (RI + RF) / 2 + 2, ease(sub(kFuse, 0, .6))), ENZIN[i], kEnz), th = lerp(th0, ENZF[i], ease(sub(kFuse, .4, 1)));
            return enzym(c1[0] + rho * Math.cos(th), by + rho * Math.sin(th), i);
          }).join('') + '</g>';
        }
        const lc = kFuse > .5 ? [FUSE[0], by + RF + 46] : [c2[0], by + r2 + 46];
        lys += T(lc[0], lc[1], kFuse > .5 ? T2('verteren', 'digesting') : T2('lysosoom', 'lysosome'), { size: 28, col: LYS, w: 700, op: dim });
        if (kFuse <= 0) put('af-lA', c2[0] + LR * .6, by - LR - 6); else if (kFuse > .5) put('af-lA', FUSE[0] + (RF + 24) * Math.cos(-2.1), by + (RF + 24) * Math.sin(-2.1)); else put('af-lA', -99, -99);
        $('af-lys').innerHTML = lys;
        $('af-mem').innerHTML = mem;
        // bouwstenen gaan via transporteiwitten in het membraan terug naar het cytosol
        let fx = '';
        if (kDig > .01 && step <= 4) {
          for (let i = 0; i < 18; i++) {
            const a = i * 2.39, r0 = 30 + (i % 6) * 22, u = ease(sub(kOut, (i % 6) * .07, .55 + (i % 6) * .07)), ph2 = TR[i % 3];
            const S0 = [FUSE[0] + Math.cos(a) * r0, by + Math.sin(a) * r0 * .8], E = [FUSE[0] + Math.cos(ph2) * RF, by + Math.sin(ph2) * RF];
            const Ox = [FUSE[0] + Math.cos(ph2 + (i % 5 - 2) * .06) * (RF + 70 + 18 * (i % 4)), by + Math.sin(ph2 + (i % 5 - 2) * .06) * (RF + 70 + 18 * (i % 4))];
            const q = u < .6 ? mix(S0, E, u / .6) : mix(E, Ox, (u - .6) / .4);
            fx += `<circle cx="${f1(q[0])}" cy="${f1(q[1])}" r="7" fill="${BB}" opacity="${f1(kDig)}"/>`;
          }
          fx += T(FUSE[0] - 120, 140, T2('bouwstenen terug naar het cytosol', 'building blocks back to the cytosol'), { size: 26, col: BB, op: ease(sub(kOut, .3, .7)) });
        }
        // honger: sensor uit, veel kleine blaasjes; dagelijks: sensor aan, af en toe een blaasje
        if (step >= 5) {
          const sOn = step === 6 ? kDaily : 0;
          const sOp = step === 5 ? ease(sub(p, 0, .2)) : 1;
          fx += `<g opacity="${f1(sOp)}"><rect x="60" y="130" width="330" height="96" rx="20" fill="rgba(13,20,38,.92)" stroke="#2a3550" stroke-width="2"/>` +
            `<circle cx="110" cy="178" r="22" fill="${sOn > .5 ? C.ok : '#3a4560'}" stroke="${sOn > .5 ? C.ok : C.muted}" stroke-width="3"/>` +
            T(150, 172, T2('voedingssensor', 'nutrient sensor'), { size: 24, anchor: 'start' }) + T(150, 204, sOn > .5 ? T2('aan', 'on') : T2('uit (honger)', 'off (hunger)'), { size: 22, anchor: 'start', col: sOn > .5 ? C.ok : C.danger }) + '</g>';
          SMALL.forEach(([x, y], i) => {
            const o = step === 5 ? ease(sub(p, .15 + i * .1, .35 + i * .1)) : (i < 2 ? 1 : 1 - kDaily);
            fx += blaasjeDubbel(x, y, 42, { w: 8, gap: 5, op: o * sOp }) + `<path d="${eiwitPad(x, y, 17, 14, 400 + i, .12)}" fill="${AGG}" opacity="${f1(.6 * o * sOp)}"/>`;
          });
          if (step === 6) fx += T(800, 800, T2('✓ ook zonder honger: opruimen', '✓ even without hunger: tidying up'), { size: 28, col: C.ok, op: kDaily });
        }
        $('af-fx').innerHTML = fx;
      },
    };
  },
};
