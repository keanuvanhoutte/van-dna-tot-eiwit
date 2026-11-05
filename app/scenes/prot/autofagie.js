import { C, T2, svgOpen, FULL, sub, ease, lerp, f1, rng } from '../../kit.js';
import { T } from './_b_kit.js';
import { arrow } from '../repl/_draw.js';
import { DEST, icon, btn } from './_fate.js';

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
/* kapot mitochondrion en een klont eiwitten */
function damagedMito(x, y, s = 1, op = 1) {
  if (op <= .01) return '';
  return `<g opacity="${f1(op)}" transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})"><ellipse rx="95" ry="52" fill="rgba(255,138,61,.12)" stroke="${DEST.mito}" stroke-width="4" stroke-dasharray="40 10 60 14"/>` +
    `<path d="M-60,0 q12,-26 24,0 M-20,-6 q12,26 24,0 M24,0 q12,-26 24,0" stroke="${DEST.mito}" stroke-width="3" fill="none"/></g>`;
}
const clump = (x, y, s = 1, op = 1) => op <= .01 ? '' : `<g opacity="${f1(op)}">${AGGB.map(([dx, dy, r]) => `<circle cx="${f1(x + dx * s)}" cy="${f1(y + dy * s)}" r="${f1(r * s)}" fill="${AGG}" fill-opacity=".75" stroke="#0a1224" stroke-width="1.5"/>`).join('')}</g>`;
/* autofagosoom: twee membranen */
const avo = (x, y, r, op = 1, inner = 1) => op <= .01 ? '' : arc(x, y, r + 14, 0, 360, PHAG, 6, op) + arc(x, y, r, 0, 360, PHAG, 6, op * inner);

export default {
  id: 'autofagie',
  title: { nl: 'De cel verteert stukken van zichzelf', en: 'The cell digests parts of itself' },
  scale: { nl: 'schematisch (een lysosoom is ≈ 0,5 µm)', en: 'schematic (a lysosome is ≈ 0.5 µm)' },
  time: { nl: 'schematisch', en: 'schematic' },
  org: { nl: 'mens', en: 'human' },
  legend: [[PHAG, L3('membraan van het zakje (fagofoor → autofagosoom)', 'membrane of the pouch (phagophore → autophagosome)')], [DEST.mito, L3('kapot mitochondrion', 'damaged mitochondrion')], [AGG, L3('klont eiwitten', 'protein clump')],
    [LYS, L3('lysosoom', 'lysosome')], [BB, L3('bouwstenen (o.a. aminozuren)', 'building blocks (e.g. amino acids)')]],
  simplified: {
    nl: 'Schematisch en niet op schaal. Het zakje groeit uit een stukje membraan met hulp van tientallen eiwitten (o.a. LC3 op het membraan), die niet getekend zijn. Hier wordt een kapot mitochondrion en een klont samen ingepakt; in de cel wordt afval vaak apart en gericht ingepakt, of wordt bij honger een willekeurig stuk cytoplasma opgenomen. Er bestaan ook kleinere vormen van autofagie.',
    en: 'Schematic and not to scale. The pouch grows from a piece of membrane with the help of dozens of proteins (e.g. LC3 on the membrane), which are not drawn. Here a damaged mitochondrion and a clump are wrapped together; in the cell waste is often wrapped separately and selectively, or in starvation a random piece of cytoplasm is taken up. Smaller forms of autophagy also exist.' },
  steps: [
    { dur: 8000, cam: FULL, title: L3('Soms moet een groot stuk weg', 'Sometimes a large piece has to go'),
      text: L3('Een kapot mitochondrion of een klont eiwitten past niet in het proteasoom. Daarvoor heeft de cel een ander systeem.', 'A damaged mitochondrion or a clump of proteins does not fit in the proteasome. The cell has another system for that.') },
    { dur: 8500, cam: FULL, title: L3('Een membraan groeit eromheen', 'A membrane grows around it'),
      text: L3('Een plat stukje membraan groeit als een kom om het afval heen.', 'A flat piece of membrane grows like a bowl around the waste.') },
    { dur: 7500, cam: FULL, title: L3('Het zakje gaat dicht', 'The pouch closes'),
      text: L3('De kom sluit zich. Nu zit het afval in een blaasje met twee membranen.', 'The bowl closes. Now the waste sits in a vesicle with two membranes.') },
    { dur: 8500, cam: FULL, title: L3('Het blaasje versmelt met het lysosoom', 'The vesicle fuses with the lysosome'),
      text: L3('Het blaasje versmelt met een lysosoom. Zo komen de knipenzymen bij het afval.', 'The vesicle fuses with a lysosome. This brings the cutting enzymes to the waste.') },
    { dur: 9000, cam: FULL, title: L3('Afbreken en hergebruiken', 'Break down and reuse'),
      text: L3('Het afval wordt afgebroken. De bouwstenen gaan terug naar het cytosol en worden opnieuw gebruikt.', 'The waste is broken down. The building blocks go back to the cytosol and are used again.') },
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
        const kGrow = ph(1, .05, .9), kClose = ph(2, .1, .7), kMove = ph(3, .05, .55), kFuse = ph(3, .55, .9), kDig = ph(4, .05, .5), kOut = ph(4, .5, .95);
        const kHung = step === 5 ? ease(sub(p, .05, .9)) : step === 6 ? 1 - ease(sub(p, 0, .4)) : 0, kDaily = ph(6, .3, .9);
        // waar het blaasje zit
        const bx = lerp(OC[0], FUSE[0] - 60, kMove), by = OC[1];
        const lx = lerp(LC[0], FUSE[0] + 60, kMove);
        const cx = lerp(bx, FUSE[0], kFuse), mx = lerp(lx, FUSE[0], kFuse);
        const contentOp = 1 - kDig;
        const dx = cx - OC[0];
        const dim = step >= 5 ? 1 - .6 * Math.max(kHung, step === 6 ? 1 : 0) : 1;
        $('af-mito').innerHTML = damagedMito(MITO[0] + dx, MITO[1], step >= 2 ? .9 : 1, contentOp * dim);
        $('af-agg').innerHTML = clump(AGGC[0] + dx - 20 * kClose, AGGC[1] - 10 * kClose, 1, contentOp * dim);
        if (contentOp > .5 && step <= 3) { put('af-mA', MITO[0] + dx, MITO[1] - 70); put('af-aA', AGGC[0] + dx, AGGC[1] + 50); } else { put('af-mA', -99, -99); put('af-aA', -99, -99); }
        // membraan: kom die groeit en sluit
        let mem = '';
        if (step >= 1 && kFuse < .99) {
          const ext = lerp(40, 330, kGrow) + 30 * kClose, a0 = -90 - ext / 2, a1 = -90 + ext / 2;
          const op = (1 - kFuse) * dim;
          mem += arc(cx, by, OR + 14, a0, a1, PHAG, 6, op) + arc(cx, by, OR, a0 + 2, a1 - 2, PHAG, 6, op);
          if (step === 1) mem += T(cx, by - OR - 50, T2('groeiend membraan', 'growing membrane'), { size: 26, col: PHAG, op: ease(sub(p, .3, .6)) });
          if (step === 2) mem += T(cx, by - OR - 50, T2('twee membranen', 'two membranes'), { size: 26, col: PHAG, op: ease(sub(p, .5, .8)) });
        }
        // lysosoom (en na versmelten: één groot verteerblaasje)
        let lys = '';
        const lr = lerp(LR, OR + 20, kFuse);
        lys += `<circle cx="${f1(mx)}" cy="${f1(by)}" r="${f1(lr)}" fill="rgba(255,107,107,${f1(.1 + .08 * kFuse)})" stroke="${LYS}" stroke-width="4" opacity="${f1(dim)}"/>`;
        if (kFuse < .5) for (let i = 0; i < 5; i++) lys += `<path d="M${f1(mx - 30 + (i % 3) * 30)},${f1(by - 40 + i * 20)} l16,0" stroke="${LYS}" stroke-width="4" stroke-linecap="round" opacity="${f1(1 - kFuse * 2)}"/>`;
        lys += T(mx, by + lr + 46, kFuse > .5 ? T2('verteren', 'digesting') : T2('lysosoom', 'lysosome'), { size: 28, col: LYS, w: 700, op: dim });
        if (kFuse > .5 || step < 3) put('af-lA', mx + lr * .6, by - lr - 6); else put('af-lA', -99, -99);
        $('af-lys').innerHTML = lys;
        $('af-mem').innerHTML = mem;
        // bouwstenen die naar buiten gaan
        let fx = '';
        if (kDig > .01 && step <= 4) {
          for (let i = 0; i < 18; i++) {
            const a = i * 2.39, r0 = 30 + (i % 6) * 22, u = sub(kOut, (i % 6) * .08, .5 + (i % 6) * .08);
            const r = r0 + u * (OR + 160);
            fx += `<circle cx="${f1(FUSE[0] + Math.cos(a) * r)}" cy="${f1(by + Math.sin(a) * r * .8)}" r="7" fill="${BB}" opacity="${f1(kDig)}"/>`;
          }
          fx += T(FUSE[0], 140, T2('bouwstenen terug naar het cytosol', 'building blocks back to the cytosol'), { size: 26, col: BB, op: ease(sub(kOut, .3, .7)) });
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
            fx += avo(x, y, 42, o * sOp) + `<circle cx="${f1(x)}" cy="${f1(y)}" r="16" fill="${AGG}" opacity="${f1(.6 * o * sOp)}"/>`;
          });
          if (step === 6) fx += T(800, 800, T2('✓ ook zonder honger: opruimen', '✓ even without hunger: tidying up'), { size: 28, col: C.ok, op: kDaily });
        }
        $('af-fx').innerHTML = fx;
      },
    };
  },
};
