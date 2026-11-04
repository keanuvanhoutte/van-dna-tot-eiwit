import { C, T2, svgOpen, txt, cam, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { K, dsRing, arcPath, onCircle, rodCell, prot, panel, arrow } from './_bkit.js';

/* Plasmide: eigen ori (kopieaantal), resistentiegen (bla → β-lactamase), overdracht via conjugatie (oriT, tra-genen).
 * Bronnen: del Solar et al. 1998 (replicatie & kopieaantal), Virolle et al. 2020 (conjugatie), UniProt P62593 (TEM-1 β-lactamase). */
const PX = 500, PY = 450, PR = 230;
const ARC = { ori: [-22, 22], bla: [55, 135], tra: [175, 285], oriT: [298, 306] };

/* β-lactamantibioticum als icoon: vierring (β-lactam) aan vijfring; open = de vierring is opengeknipt */
function lactam(x, y, open, op = 1) {
  if (op <= .01) return '';
  const sq = open ? `<path d="M${x - 30},${y - 15} h-26 v30 h26" fill="none" stroke="${K.amp}" stroke-width="3"/><path d="M${x - 64},${y - 22} l-10,-10" stroke="${C.danger}" stroke-width="3"/>`
    : `<rect x="${x - 56}" y="${y - 15}" width="26" height="30" fill="none" stroke="${K.amp}" stroke-width="3"/>`;
  return `<g opacity="${f1(op)}">${sq}<path d="M${x - 30},${y - 15} L${x - 4},${y - 26} L${x + 12},${y} L${x - 4},${y + 26} L${x - 30},${y + 15}" fill="none" stroke="${K.amp}" stroke-width="3"/></g>`;
}

export default {
  id: 'bplasmide',
  title: { nl: 'Plasmiden: kleine extra ringen', en: 'Plasmids: small extra rings' },
  scale: { nl: '≈ 2 tot > 100 kb', en: '≈ 2 to > 100 kb' }, time: { nl: 'conjugatie: minuten', en: 'conjugation: minutes' },
  org: { nl: 'bacterie (Escherichia coli)', en: 'bacterium (Escherichia coli)' },
  legend: [[K.plas, { nl: 'plasmide-DNA', en: 'plasmid DNA' }], [K.ori, { nl: 'ori: startplaats kopiëren', en: 'ori: origin of copying' }], [K.res, { nl: 'resistentiegen (bla)', en: 'resistance gene (bla)' }],
    [K.tra, { nl: 'tra-genen: overdracht', en: 'tra genes: transfer' }], [K.amp, { nl: 'ampicilline', en: 'ampicillin' }]],
  simplified: {
    nl: 'Eén getekend plasmide combineert onderdelen van verschillende soorten: kleine kloneerplasmiden (≈ 3 kb) hebben geen tra-genen, grote conjugatieve plasmiden (zoals F, ≈ 100 kb) wel; veel resistentieplasmiden (R-plasmiden) dragen beide. Replicatie gebeurt bij veel plasmiden in één richting vanaf ori (bij andere via een "rollende cirkel"); hier niet in detail. Bij conjugatie trekt de pilus de cellen naar elkaar; de DNA-streng gaat via een transportkanaal (type IV-secretiesysteem) op de contactplek over. β-lactamase werkt in de ruimte tussen de twee membranen (periplasma), niet in het cytoplasma.',
    en: 'One drawn plasmid combines parts of different kinds: small cloning plasmids (≈ 3 kb) have no tra genes, large conjugative plasmids (such as F, ≈ 100 kb) do; many resistance plasmids (R plasmids) carry both. Many plasmids replicate in one direction from ori (others by a "rolling circle"); not shown in detail. In conjugation the pilus pulls the cells together; the DNA strand passes through a transport channel (type IV secretion system) at the contact site. β-lactamase works in the space between the two membranes (periplasm), not in the cytoplasm.' },
  steps: [
    { dur: 7000, cam: cam(800, 450, 1600), title: { nl: 'Een plasmide is een kleine DNA-ring', en: 'A plasmid is a small DNA ring' },
      text: { nl: 'Een plasmide is een eigen ring dubbelstrengs DNA. Meestal is het veel kleiner dan het chromosoom.', en: 'A plasmid is a separate ring of double-stranded DNA. It is usually much smaller than the chromosome.' } },
    { dur: 9000, cam: cam(800, 450, 1600), title: { nl: 'Een eigen startplaats: ori', en: 'Its own starting point: ori' },
      text: { nl: 'Het plasmide heeft een eigen startplaats voor kopiëren (ori). Die bepaalt mee hoeveel kopieën er in de cel zijn.', en: 'The plasmid has its own starting point for copying (ori). It helps set how many copies there are in the cell.' } },
    { dur: 9000, cam: cam(800, 450, 1600), title: { nl: 'Extra genen, zoals resistentie', en: 'Extra genes, such as resistance' },
      text: { nl: 'Plasmiden dragen vaak extra genen. Het bla-gen maakt β-lactamase: dat enzym knipt ampicilline open.', en: 'Plasmids often carry extra genes. The bla gene makes β-lactamase: this enzyme cuts ampicillin open.' } },
    { dur: 9000, cam: cam(800, 450, 1600), title: { nl: 'Doorgeven aan een buur: conjugatie', en: 'Passing it to a neighbour: conjugation' },
      text: { nl: 'Met een pilus maakt de bacterie contact met een andere. Eén streng van het plasmide gaat over.', en: 'With a pilus the bacterium makes contact with another one. One strand of the plasmid passes over.' } },
    { dur: 8000, cam: cam(800, 450, 1600), title: { nl: 'Nu hebben beide cellen het plasmide', en: 'Now both cells have the plasmid' },
      text: { nl: 'In beide cellen wordt de enkele streng weer dubbel. Zo verspreidt resistentie zich tussen bacteriën.', en: 'In both cells the single strand becomes double again. This is how resistance spreads between bacteria.' } },
  ],
  svg() {
    return svgOpen() + `
    <g id="bp-ring"></g>
    <g data-node="replicatie" data-color="${K.ori}" data-label="${T2('Hoe DNA gekopieerd wordt', 'How DNA is copied')}"><path d="${arcPath(PX, PY, PR, ...ARC.ori)}" stroke="${K.ori}" stroke-width="22" fill="none" stroke-opacity=".001"/><circle data-anchor="replicatie" cx="${PX}" cy="${PY - PR - 70}" r="1" fill="none"/></g>
    <g id="bp-copy"></g>
    <g id="bp-side"></g>
    <g data-node="bgen" data-color="${K.res}" data-label="${T2('Onderdelen van een gen', 'Parts of a gene')}" data-pos="below"><path d="${arcPath(PX, PY, PR, ...ARC.bla)}" stroke="${K.res}" stroke-width="22" fill="none" stroke-opacity=".001"/><circle data-anchor="bgen" cx="${PX + 250}" cy="${PY + 230}" r="1" fill="none"/></g>
    <g id="bp-lab"></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const feat = (k, col, w, op) => `<path d="${arcPath(PX, PY, PR, ...ARC[k])}" stroke="${col}" stroke-width="${w}" fill="none" opacity="${f1(op)}" stroke-linecap="butt"/>`;
    const fLab = (k, s, col, size, op, d = 62) => { const a = (ARC[k][0] + ARC[k][1]) / 2, [x, y] = onCircle(PX, PY, PR + d, a); const anc = x > PX + 60 ? 'start' : x < PX - 60 ? 'end' : 'middle'; return `<g opacity="${f1(op)}">` + txt(x, y + 8, s, col, size, anc, 700) + '</g>'; };
    return {
      update(t, s) {
        const { step, p } = s;
        const hi = k => ({ ori: step === 1, bla: step === 2, tra: step >= 3, oriT: step >= 3 }[k] ? 1 : step === 0 ? .9 : .35);
        // het plasmide zelf + onderdelen
        let g = dsRing(PX, PY, PR, K.plas, 6, 1);
        g += feat('ori', K.ori, 18, hi('ori')) + feat('bla', K.res, 18, hi('bla')) + feat('tra', K.tra, 18, hi('tra')) + feat('oriT', '#fff', 18, step >= 3 ? 1 : .4);
        // pijlpunt op bla (leesrichting)
        const [ax, ay] = onCircle(PX, PY, PR, ARC.bla[1] + 3);
        g += `<circle cx="${f1(ax)}" cy="${f1(ay)}" r="10" fill="${K.res}" opacity="${f1(hi('bla'))}"/>`;
        g += fLab('ori', 'ori', K.ori, 30, hi('ori'), 50) + fLab('bla', T2('bla (resistentie)', 'bla (resistance)'), K.res, 26, hi('bla'), 34) + fLab('tra', T2('tra-genen', 'tra genes'), K.tra, 26, hi('tra'), 34) + fLab('oriT', 'oriT', '#fff', 22, step >= 3 ? 1 : .4, 30);
        g += txt(PX, PY - 4, T2('plasmide', 'plasmid'), K.plas, 34, 'middle', 800) + `<g opacity="${f1(step === 0 ? sub(p, .3, .5) : 1)}">` + txt(PX, PY + 40, T2('≈ 2–100+ kb', '≈ 2–100+ kb'), C.muted, 24) + '</g>';
        // kopiëren vanaf ori (stap 1): een nieuwe streng groeit rond
        if (step === 1) {
          const u = ease(sub(p, .05, .5));
          if (u > .01) g += `<path d="${arcPath(PX, PY, PR - 22, 0, Math.min(359.5, u * 360))}" stroke="${K.ori}" stroke-width="5" fill="none" stroke-dasharray="10 6"/>` + (u < .99 ? `<circle cx="${f1(onCircle(PX, PY, PR - 22, u * 360)[0])}" cy="${f1(onCircle(PX, PY, PR - 22, u * 360)[1])}" r="9" fill="${K.ori}"/>` : '');
        }
        $('bp-ring').innerHTML = g;

        // zijpanelen
        let sd = '';
        if (step === 1) {
          const o = sub(p, .5, .7);
          sd += `<g opacity="${f1(o)}">` + panel(960, 170, 590, 560) + txt(1255, 225, T2('Hoeveel kopieën per cel?', 'How many copies per cell?'), C.text, 28, 'middle', 700) +
            rodCell(1000, 270, 240, 140) + dsRing(1120, 340, 22, K.plas, 3) + txt(1120, 450, T2('groot plasmide (F)', 'large plasmid (F)'), C.text, 22) + txt(1120, 482, T2('1–2 per cel', '1–2 per cell'), K.ori, 24, 'middle', 800) +
            rodCell(1290, 270, 240, 140) + [[1340, 315], [1380, 345], [1420, 310], [1460, 350], [1350, 365], [1410, 375], [1470, 315], [1440, 290]].map(([x, y]) => dsRing(x, y, 11, K.plas, 2)).join('') +
            txt(1410, 450, T2('klein plasmide', 'small plasmid'), C.text, 22) + txt(1410, 482, T2('tientallen of meer', 'tens or more'), K.ori, 24, 'middle', 800) +
            txt(1255, 560, T2('ori + regeleiwitten of -RNA’s', 'ori + control proteins or RNAs'), C.muted, 22) + txt(1255, 594, T2('houden het aantal constant', 'keep the number constant'), C.muted, 22) + '</g>';
        }
        if (step === 2) {
          const o = sub(p, .15, .35), cut = ease(sub(p, .5, .75));
          sd += `<g opacity="${f1(o)}">` + arrow(PX + 300, PY - 60, 975, 340, K.res, 4) + prot(1060, 330, 80, 52, K.res, 1, 8, 'β-lactamase', 22) +
            txt(1060, 420, T2('enzym van het bla-gen', 'enzyme from the bla gene'), C.muted, 21) + '</g>';
          sd += `<g opacity="${f1(sub(p, .3, .5))}">` + txt(1360, 230, T2('ampicilline', 'ampicillin'), K.amp, 26, 'middle', 700) +
            [0, 1, 2].map(i => lactam(1330 + i * 70 - (i === 1 ? 0 : 0), 300 + i * 70, cut > (i + 1) / 4)).join('') +
            `<g opacity="${f1(cut)}">` + txt(1300, 560, T2('ring open = werkt niet meer', 'ring open = no longer works'), C.ok, 24, 'middle', 700) + txt(1300, 596, T2('→ de bacterie overleeft', '→ the bacterium survives'), C.ok, 24, 'middle', 700) + '</g></g>';
        }
        if (step >= 3) {
          // donor (boven) en ontvanger (onder)
          const DX = 980, W = 520, H = 170, Y1 = 150, Y2 = 600;
          const tr = step === 3 ? ease(sub(p, .35, .9)) : 1;          // overdracht van de enkele streng
          const dbl = step === 4 ? ease(sub(p, .1, .55)) : 0;          // complementaire streng erbij
          sd += rodCell(DX, Y1, W, H) + rodCell(DX, Y2, W, H);
          sd += txt(DX + W / 2, Y1 - 18, T2('donor (met plasmide)', 'donor (with plasmid)'), C.text, 22) + txt(DX + W / 2, Y2 + H + 36, T2('ontvanger', 'recipient'), C.text, 22);
          // pilus + contactplek
          const pil = step === 3 ? ease(sub(p, 0, .3)) : 1;
          sd += `<line x1="${DX + W / 2}" y1="${Y1 + H - 4}" x2="${DX + W / 2}" y2="${lerp(Y1 + H, Y2 + 4, pil)}" stroke="${K.tra}" stroke-width="7" stroke-linecap="round"/>`;
          sd += `<g opacity="${f1(pil)}">` + txt(DX + W / 2 + 18, (Y1 + H + Y2) / 2 + 8, 'pilus', K.tra, 24, 'start', 700) + '</g>';
          // plasmide in donor: blijft; in ontvanger: groeiende enkele streng, daarna dubbel
          sd += dsRing(DX + 160, Y1 + H / 2, 40, K.plas, 4);
          if (tr > .01) {
            const [x0, y0] = [DX + W / 2, Y1 + H];
            const yy = lerp(y0, Y2 + 30, Math.min(1, tr * 1.6));
            sd += `<line x1="${x0}" y1="${y0}" x2="${x0}" y2="${f1(yy)}" stroke="${K.plas}" stroke-width="3" stroke-dasharray="6 4" opacity="${f1(1 - dbl)}"/>`;
            const ang = clamp((tr - .5) * 2) * 359.5;
            if (ang > 1 && dbl < .99) sd += `<path d="${arcPath(DX + 160, Y2 + H / 2, 40, 0, ang)}" stroke="${K.plas}" stroke-width="4" fill="none"/>`;
          }
          if (dbl > .01) sd += dsRing(DX + 160, Y2 + H / 2, 40, K.plas, 4, dbl);
          if (step === 3) sd += `<g opacity="${f1(sub(p, .55, .75))}">` + txt(DX + 360, Y2 + H / 2 + 8, T2('één streng', 'one strand'), K.plas, 22, 'middle', 700) + '</g>';
          if (step === 4) sd += `<g opacity="${f1(sub(p, .55, .75))}">` + txt(DX + 360, Y2 + H / 2 - 6, T2('weer dubbel', 'double again'), K.plas, 22, 'middle', 700) + txt(DX + 360, Y2 + H / 2 + 26, T2('→ ook resistent', '→ resistant too'), C.ok, 22, 'middle', 700) + '</g>';
        }
        $('bp-side').innerHTML = sd;
      },
    };
  },
};
