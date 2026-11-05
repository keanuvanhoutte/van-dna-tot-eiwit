import { C, T2, svgOpen, FULL, cam, sub, ease, lerp, f1 } from '../../kit.js';
import { T, smooth } from '../prot/_b_kit.js';
import { btn, at } from '../prot/_fate.js';
import { microtubule, motor } from '../entry/_bits.js';
import { capG, ribo } from './_rna.js';

/*
 * mRNA-lokalisatie (zijpad "Het leven van een RNA", 05-11-2026). Een adreslabel (zipcode) in de 3′-UTR wordt door een
 * RNA-bindend eiwit herkend; motoreiwitten vervoeren het mRNA langs het cytoskelet; op de bestemming wordt het lokaal vertaald.
 * Voorbeeld β-actine-mRNA → voorste rand: zipcode van 54 nt vlak na het stopcodon (Kislauskis et al. 1994, kippenembryo-
 * fibroblasten); ZBP1 blokkeert de translatie tot Src het fosforyleert aan de rand (Hüttelmaier et al. 2005); muizen met
 * gemerkt β-actine-mRNA (Lionnet et al. 2011). Zenuwcellen: lokale translatie in dendrieten (Holt, Martin & Schuman 2019).
 * Nagekeken in docs/verificatie-ronde-11-rna-lot.md.
 */
const L3 = (nl, en) => ({ nl, en });
const LAB = '#ffd166', HOLD = '#b48cff', MOT = '#ff7ab6', TRACK = '#7c8aa8', ACT = C.chain;

/* cel met voorste rand rechts; e = 0..1 hoe ver de rand al vooruit kroop */
const cellPath = e => `M210,450 C210,230 520,150 860,165 C1130,178 ${f1(1330 + e * 40)},230 ${f1(1440 + e * 60)},450 C${f1(1330 + e * 40)},670 1130,722 860,735 C520,750 210,670 210,450Z`;
const TR = [[[650, 390], [1370, 300]], [[650, 450], [1350, 450]], [[650, 510], [1370, 600]]];
const along = (k, u) => { const [[x0, y0], [x1, y1]] = TR[k]; return [lerp(x0, x1, u), lerp(y0, y1, u), Math.atan2(y1 - y0, x1 - x0) * 180 / Math.PI]; };

/* pakketje: kort opgerold mRNA met een geel label en het paarse eiwit dat het label vasthoudt */
function packet(x, y, s = 1, hold = 1, op = 1) {
  if (op <= .01) return '';
  return `<g opacity="${f1(op)}" transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})">` +
    `<path d="M-46,6 q12,-22 24,0 t24,0 t24,0" stroke="${C.rna}" stroke-width="8" fill="none" stroke-linecap="round"/>` +
    `<circle cx="-50" cy="6" r="8" fill="${C.cap}"/><rect x="18" y="-4" width="22" height="18" rx="5" fill="${LAB}"/>` +
    (hold > .01 ? `<ellipse cx="29" cy="${f1(-14 - 30 * (1 - hold))}" rx="22" ry="15" fill="${HOLD}" opacity="${f1(hold)}"/>` : '') + '</g>';
}
/* zichtbaarheid van een beeld dat in de stappen `set` getoond wordt: invloeien aan het begin van de stap, uitvloeien in de volgende */
const vis = (set, step, p) => {
  const k = ease(sub(p, 0, .25));
  return set.includes(step) ? (set.includes(step - 1) || step === 0 ? 1 : k) : set.includes(step - 1) ? 1 - k : 0;
};

/* zenuwcel: uitlopers (dendrieten) met contactpunten */
const DEN = [
  [[440, 400], [700, 320], [980, 250], [1250, 200], [1430, 190]],
  [[452, 460], [760, 470], [1050, 500], [1300, 520], [1460, 500]],
  [[430, 530], [690, 620], [960, 680], [1200, 700], [1380, 690]],
];
const len = P => P.slice(1).reduce((a, q, i) => a + Math.hypot(q[0] - P[i][0], q[1] - P[i][1]), 0);

export default {
  id: 'lokalisatie',
  title: L3('Een adreslabel stuurt het mRNA naar zijn plek', 'An address label sends the mRNA to its spot'),
  scale: L3('cel ≈ 50 µm · mRNA sterk vergroot', 'cell ≈ 50 µm · mRNA greatly enlarged'),
  time: L3('reis langs de sporen (vertraagd getoond)', 'journey along the tracks (shown slowed down)'),
  org: L3('mens (voorbeeld onderzocht in kippen- en muizencellen)', 'human (example studied in chicken and mouse cells)'),
  legend: [[C.rna, 'mRNA'], [LAB, L3('adreslabel', 'address label')], [HOLD, L3('eiwit dat het label leest', 'protein that reads the label')], [MOT, L3('motoreiwit', 'motor protein')],
    [TRACK, L3('spoor (microtubulus)', 'track (microtubule)')], [C.rrna, L3('ribosoom', 'ribosome')], [ACT, L3('actine (nieuw eiwit)', 'actin (new protein)')]],
  simplified: {
    nl: 'Het voorbeeld (het mRNA voor actine dat naar de voorste rand gaat) is vooral onderzocht in cellen van kippenembryo’s en van muizen; bij de mens neemt men hetzelfde aan, maar het is minder direct bekeken. mRNA en pakketje zijn sterk vergroot; in werkelijkheid zitten vaak meerdere mRNA’s en eiwitten samen in één korrel. Er is één soort spoor getekend; sommige mRNA’s reizen ook over actinedraden, met andere motoren (myosine). De zenuwcel is schematisch.',
    en: 'The example (the mRNA for actin that goes to the leading edge) has mainly been studied in cells from chicken embryos and from mice; the same is assumed for humans, but it has been looked at less directly. mRNA and package are greatly enlarged; in reality several mRNAs and proteins often sit together in one granule. One kind of track is drawn; some mRNAs also travel along actin filaments, with other motors (myosin). The nerve cell is schematic.' },
  steps: [
    { dur: 8000, cam: FULL, title: L3('Sommige mRNA’s moeten naar één plek', 'Some mRNAs have to go to one place'),
      text: L3('Veel mRNA’s worden overal in de cel vertaald. Sommige moeten eerst naar een vaste plek.', 'Many mRNAs are translated all over the cell. Some first have to go to a fixed place.') },
    { dur: 8500, cam: FULL, title: L3('Het adres zit in de staart', 'The address is in the tail'),
      text: L3('Achter het stopsein ligt een stuk dat niet vertaald wordt. Daarin zit een adreslabel: een korte reeks letters.', 'Behind the stop signal lies a part that is not translated. It holds an address label: a short string of letters.') },
    { dur: 8500, cam: FULL, title: L3('Een eiwit leest het label en houdt het mRNA stil', 'A protein reads the label and keeps the mRNA quiet'),
      text: L3('Een eiwit klemt zich op het label vast. Zolang het vastzit, kan geen ribosoom het mRNA aflezen.', 'A protein clamps onto the label. As long as it holds on, no ribosome can read the mRNA.') },
    { dur: 9000, cam: FULL, title: L3('Motoreiwitten dragen het mRNA langs sporen', 'Motor proteins carry the mRNA along tracks'),
      text: L3('Een motoreiwit sleept het pakketje langs sporen door de cel, naar de rand die vooruit kruipt.', 'A motor protein drags the package along tracks through the cell, to the edge that crawls forward.') },
    { dur: 8000, cam: cam(1180, 420, 1000), title: L3('Aangekomen: het eiwit laat los', 'Arrived: the protein lets go'),
      text: L3('Aan de rand laat het eiwit het label los. Nu kunnen ribosomen het mRNA aflezen.', 'At the edge the protein lets go of the label. Now ribosomes can read the mRNA.') },
    { dur: 9000, cam: cam(1180, 430, 1100), title: L3('Het eiwit wordt gemaakt waar het nodig is', 'The protein is made where it is needed'),
      text: L3('Zo ontstaat actine vlak bij de rand. Daarmee bouwt de cel het skelet dat de rand vooruit duwt.', 'So actin is made right next to the edge. With it the cell builds the skeleton that pushes the edge forward.') },
    { dur: 9000, cam: FULL, title: L3('Zenuwcellen maken eiwit ter plekke', 'Nerve cells make protein on the spot'),
      text: L3('Ook in zenuwcellen reizen mRNA’s ver de uitlopers in. Ze worden daar vertaald, vlak bij de contactpunten.', 'In nerve cells too, mRNAs travel far into the branches. They are translated there, close to the contact points.') },
  ],
  svg() {
    return svgOpen() + `<g id="lo-v"></g>
    ${btn('export', 40, 320, T2('↑ mRNA uit de kern', '↑ mRNA out of the nucleus'), C.rna)}
    ${btn('korrels', 1130, 430, T2('volgende: druppels bij stress →', 'next: droplets under stress →'), '#5fd3e6')}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const ph = (i, a, b) => step > i ? 1 : step < i ? 0 : ease(sub(p, a, b));
        let o = '';
        /* ── A: de cel ── */
        const vA = vis([0, 3, 4, 5], step, p);
        if (vA > .01) {
          const grow = ph(5, .45, .95);
          o += `<g opacity="${f1(vA)}"><path d="${cellPath(grow)}" fill="rgba(19,33,67,.65)" stroke="#5f7bb5" stroke-width="4"/>` +
            `<circle cx="470" cy="450" r="160" fill="url(#gNuc)" stroke="#9cc0ff" stroke-width="4"/>` + T(470, 600, T2('kern', 'nucleus'), { size: 28, col: C.dna2 });
          o += TR.map(([[x0, y0], [x1, y1]]) => microtubule(x0, y0, x1, y1, 14, TRACK)).join('');
          o += T(1500, 140, T2('rand die vooruit kruipt', 'edge that crawls forward'), { size: 26, anchor: 'end', col: C.muted, op: step >= 4 ? 0 : 1 });   // buiten beeld bij het inzoomen (stap 4–5)
          // andere mRNA's, die overal vertaald worden (stap 0)
          const k0 = step === 0 ? 1 : 0;
          if (k0 && vA > .01) for (const [x, y] of [[760, 260], [980, 640], [1120, 300], [820, 620]]) o += `<path d="M${x - 36},${y} q12,-18 24,0 t24,0 t24,0" stroke="${C.rna}" stroke-width="6" fill="none" stroke-linecap="round" opacity=".55"/>` + ribo(x, y, .2, .55, '');
          if (step === 0) {
            // ons mRNA komt uit de kern
            const k = ease(sub(p, .15, .8));
            o += packet(lerp(560, 700, k), 375, 1.2, 0, sub(p, .05, .2)) + T(700, 330, T2('dit mRNA moet naar de rand', 'this mRNA must go to the edge'), { size: 24, col: LAB, op: sub(p, .6, .8) });
          }
          if (step >= 3) {
            const k = step === 3 ? ease(sub(p, .12, .92)) : 1;
            [[1, 0, 1], [0, .25, .55], [2, .4, .85]].forEach(([tr, off, max], i) => {
              const u = max * Math.max(0, Math.min(1, (k - off) / (1 - off)));
              const [x, y, a] = along(tr, lerp(.07, .92, u));
              if (i === 0 && step >= 4) return;            // ons pakketje wordt in stap 4 een open mRNA
              o += `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a)})">` + motor(0, -30, 0, 1.1, MOT, u * 40) + packet(0, -78, i ? .9 : 1.2, 1, i ? .75 : 1) + '</g>';
            });
            o += T(1000, 400, T2('motoreiwit op een spoor', 'motor protein on a track'), { size: 24, col: MOT, op: step === 3 ? sub(p, .3, .5) : 0 });
          }
          if (step >= 4) {
            // aan de rand: eiwit laat los, mRNA gaat open, ribosomen lezen
            const kLet = ph(4, .05, .4), kOpen = ph(4, .25, .55);
            const [x, y] = along(1, .92);
            o += packet(x, y - 78, 1.2, 1 - kLet, 1 - kOpen) + `<ellipse cx="${f1(x + 35)}" cy="${f1(y - 120 - 60 * kLet)}" rx="26" ry="18" fill="${HOLD}" opacity="${f1(kLet * (1 - ph(4, .6, .9)))}"/>`;
            const mx0 = 1180, mx1 = 1400, my = 372;
            o += `<g opacity="${f1(kOpen)}"><line x1="${mx0}" y1="${my}" x2="${mx1}" y2="${my}" stroke="${C.rna}" stroke-width="9" stroke-linecap="round"/>` + capG(mx0 - 18, my, 18) +
              `<rect x="${mx1 - 70}" y="${my - 10}" width="34" height="20" rx="5" fill="${LAB}"/></g>`;
            [0, 1, 2].forEach(i => {
              const kr = ph(4, .45 + i * .14, .6 + i * .14), rx = mx0 + 40 + i * 85;
              o += ribo(rx, my, .42, kr, '');
              const kc = ph(5, .05 + i * .1, .45 + i * .1);
              if (kc > .01) {
                const n = Math.round(1 + 6 * kc);
                for (let j = 0; j < n; j++) o += `<circle cx="${f1(rx + 4 + 6 * Math.sin(j * 1.3))}" cy="${f1(my - 48 - j * 16)}" r="7" fill="${ACT}" stroke="#0a1224" stroke-width="1.5"/>`;
              }
            });
            o += T(1290, 300, T2('ribosomen lezen hier', 'ribosomes read here'), { size: 24, col: C.rrna, op: step === 4 ? sub(p, .7, .85) : 0 });
            // actinedraden in de rand (stap 5)
            const kF = ph(5, .35, .85);
            if (kF > .01) {
              for (let i = 0; i < 9; i++) {
                const yy = 250 + i * 50, xx = 1380 + 40 * Math.sin(i * .9) + 50 * grow * (1 - Math.abs(yy - 450) / 260);
                const l = 90 * kF;
                o += `<line x1="${f1(xx - l)}" y1="${f1(yy + 14)}" x2="${f1(xx)}" y2="${f1(yy)}" stroke="${ACT}" stroke-width="6" stroke-linecap="round" opacity=".85"/>`;
              }
              o += T(1250, 640, T2('actine bouwt de rand', 'actin builds the edge'), { size: 26, col: ACT, w: 700, op: kF });
            }
          }
        }
        /* ── B: één mRNA van dichtbij ── */
        const vB = vis([1, 2], step, p);
        if (vB > .01) {
          const Y = 470, X0 = 220, XS = 880, XL0 = 960, XL1 = 1110, XA = 1200, X1 = 1400;
          const kL = ph(1, .3, .6);
          o += `<g opacity="${f1(vB)}">` +
            `<line x1="${X0}" y1="${Y}" x2="${XS}" y2="${Y}" stroke="${C.rna}" stroke-width="20" stroke-linecap="round"/>` +
            `<line x1="${XS}" y1="${Y}" x2="${XA}" y2="${Y}" stroke="${C.rna}" stroke-width="11" stroke-linecap="round"/>` +
            `<rect x="${XS - 6}" y="${Y - 26}" width="12" height="52" rx="4" fill="${C.danger}"/>` + capG(X0 - 26, Y, 30) +
            `<rect x="${XL0}" y="${Y - 20}" width="${XL1 - XL0}" height="40" rx="10" fill="${LAB}" opacity="${f1(.25 + .75 * kL)}"/>` +
            T((XA + X1) / 2, Y + 11, 'AAAAAAA', { size: 30, col: C.cap, font: 'JetBrains Mono', w: 700 }) +
            T(600, Y - 50, T2('wordt vertaald (code voor actine)', 'is translated (code for actin)'), { size: 26, col: C.text }) +
            T(XS, Y + 70, T2('stopsein', 'stop signal'), { size: 24, col: C.danger }) +
            T((XS + XA) / 2 + 20, Y + 120, T2('wordt niet vertaald', 'is not translated'), { size: 24, col: C.muted }) +
            T((XL0 + XL1) / 2, Y - 50, T2('adreslabel', 'address label'), { size: 30, col: LAB, w: 800, op: kL }) +
            T((XA + X1) / 2, Y + 70, T2('staart', 'tail'), { size: 24, col: C.cap }) + '</g>';
          // stap 2: het eiwit klemt zich vast, ribosoom kan niet beginnen
          const kH = ph(2, .1, .5), kR = ph(2, .5, .8);
          if (kH > .01) {
            o += `<g opacity="${f1(vB)}"><ellipse cx="${(XL0 + XL1) / 2}" cy="${f1(lerp(720, Y + 38, kH))}" rx="92" ry="48" fill="${HOLD}" fill-opacity=".9" stroke="#0a1224" stroke-width="2"/>` +
              T((XL0 + XL1) / 2, lerp(720, Y + 38, kH) + 9, T2('lezer', 'reader'), { size: 26, col: '#1a0f33', halo: false, w: 800 }) + '</g>';
            o += `<g opacity="${f1(vB * kR)}">` + ribo(X0 + 40, Y - 170, .9, 1, '') + `<path d="M${X0 + 10},${Y - 110} l60,60 M${X0 + 70},${Y - 110} l-60,60" stroke="${C.danger}" stroke-width="9" stroke-linecap="round"/>` +
              T(X0 + 130, Y - 230, T2('ribosoom moet wachten', 'ribosome has to wait'), { size: 26, col: C.rrna, anchor: 'start' }) + '</g>';
          }
        }
        /* ── C: zenuwcel ── */
        const vC = vis([6], step, p);
        if (vC > .01) {
          o += `<g opacity="${f1(vC)}">`;
          DEN.forEach(P => { o += `<path d="${smooth(P)}" stroke="#7d6bc4" stroke-width="22" fill="none" stroke-linecap="round"/>`; });
          o += `<circle cx="330" cy="460" r="125" fill="#2a2350" stroke="#b9a6ff" stroke-width="4"/><circle cx="315" cy="455" r="58" fill="url(#gNuc)" stroke="#9cc0ff" stroke-width="3"/>`;
          const k = ease(sub(p, .1, .8)), kT = ease(sub(p, .75, .95));
          DEN.forEach((P, i) => {
            const L = len(P), end = P[P.length - 1];
            o += `<circle cx="${end[0] + 22}" cy="${end[1]}" r="22" fill="#2a2350" stroke="#ffc247" stroke-width="4"/>`;
            [0, .3].forEach((off, j) => {
              const d = L * Math.max(0, Math.min(.97, k * (1 - off) + (j ? 0 : 0))) - j * 110;
              if (d <= 0) return;
              const [x, y] = at(P, d);
              o += `<path d="M${f1(x - 22)},${f1(y)} q7,-12 14,0 t14,0 t14,0" stroke="${C.rna}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
            });
            if (kT > .01) o += ribo(end[0] - 20, end[1] - 4, .28, kT, '') + `<circle cx="${end[0] - 4}" cy="${end[1] - 42}" r="8" fill="${ACT}" opacity="${f1(kT)}"/>`;
          });
          o += '</g>' + T(330, 640, T2('zenuwcel', 'nerve cell'), { size: 30, w: 700, op: vC }) +
            T(860, 420, T2('uitlopers', 'branches'), { size: 26, col: '#c9b6ff', op: vC }) +
            T(1440, 150, T2('contactpunten', 'contact points'), { size: 26, col: '#ffc247', anchor: 'end', op: vC });
        }
        $('lo-v').innerHTML = o;
      },
    };
  },
};
