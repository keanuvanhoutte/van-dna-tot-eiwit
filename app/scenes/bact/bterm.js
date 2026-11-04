import { C, T2, svgOpen, txt, mono, cam, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { K, prot, ribo } from './_bkit.js';

/* Einde van de transcriptie bij bacteriën: intrinsieke terminator (GC-haarspeld + U-reeks) en Rho-afhankelijke terminatie;
 * ribosomen schermen het mRNA af tegen Rho (polariteit). Bron: Ray-Soni, Bellecourt & Landick 2016 (Annu Rev Biochem). */
const Y = 640, TERM = [930, 1090];
const RHO = '#ff8a3d';

/* RNA vanaf de uitgang van het polymerase (x) naar linksboven; s = afstand vanaf de polymerase */
const rnaPt = (x, s) => [x - 30 - s * .55, Y - 52 - Math.min(s, 420) * .5 - 9 * Math.sin(s / 38)];
function rnaPath(x, len) {
  const pts = []; for (let s = 0; s <= len; s += 6) pts.push(rnaPt(x, s));
  return pts.length > 1 ? `<path d="${pts.map((q, i) => `${i ? 'L' : 'M'}${f1(q[0])},${f1(q[1])}`).join('')}" stroke="${C.rna}" stroke-width="5" fill="none" stroke-linecap="round"/>` : '';
}
const rhoRing = (x, y, op = 1) => op <= .01 ? '' : `<g opacity="${f1(op)}">` + [0, 1, 2, 3, 4, 5].map(i => `<circle cx="${f1(x + 24 * Math.cos(i * Math.PI / 3))}" cy="${f1(y + 24 * Math.sin(i * Math.PI / 3))}" r="13" fill="${RHO}" fill-opacity=".55" stroke="${RHO}" stroke-width="2"/>`).join('') + txt(x, y + 6, 'Rho', '#fff', 17, 'middle', 800) + '</g>';

export default {
  id: 'bterm',
  title: { nl: 'Stoppen met kopiëren: de terminator', en: 'Stopping copying: the terminator' },
  scale: { nl: '≈ 40 bp terminator · 10–20 nm', en: '≈ 40 bp terminator · 10–20 nm' }, time: { nl: 'loslaten: < 1 s', en: 'release: < 1 s' },
  org: { nl: 'bacterie (Escherichia coli)', en: 'bacterium (Escherichia coli)' },
  legend: [[C.dna, 'DNA'], [K.rnap, { nl: 'RNA-polymerase', en: 'RNA polymerase' }], [C.rna, 'RNA'], [K.term, { nl: 'terminator', en: 'terminator' }], [RHO, 'Rho'], [K.ribo, { nl: 'ribosoom', en: 'ribosome' }]],
  simplified: {
    nl: 'Schematisch en niet op schaal. Hoe de haarspeld het enzym precies doet loslaten, wordt nog onderzocht; hier is het één vloeiende beweging. Rho is een ring van zes eiwitten die op een C-rijk, onbedekt stuk RNA (rut) bindt; dat stuk is hier niet apart getoond. Ook andere eiwitten (zoals NusA en NusG) beïnvloeden terminatie. Hoe Rho het enzym precies stopt, wordt nog onderzocht: Rho kan ook al vroeg aan het polymerase binden en het dan uitschakelen.',
    en: 'Schematic and not to scale. Exactly how the hairpin makes the enzyme let go is still being studied; here it is one smooth movement. Rho is a ring of six proteins that binds a C-rich, uncovered stretch of RNA (rut); that stretch is not shown separately. Other proteins (such as NusA and NusG) also affect termination. Exactly how Rho stops the enzyme is still being studied: Rho can also bind the polymerase early and then switch it off.' },
  steps: [
    { dur: 8000, cam: cam(800, 460, 1600), title: { nl: 'Elk transcript eindigt met een stopsignaal', en: 'Every transcript ends with a stop signal' },
      text: { nl: 'Achter een gen of operon ligt een terminator. Daar laat het RNA-polymerase het DNA en het RNA los.', en: 'After a gene or operon lies a terminator. There RNA polymerase lets go of the DNA and the RNA.' } },
    { dur: 8000, cam: cam(900, 470, 1000), title: { nl: 'Stop 1: een haarspeld in het RNA', en: 'Stop 1: a hairpin in the RNA' },
      text: { nl: 'Het nieuwe RNA vouwt een stevige haarspeld met veel G–C-paren. Die trekt aan het enzym.', en: 'The new RNA folds a firm hairpin with many G–C pairs. It pulls on the enzyme.' } },
    { dur: 8000, cam: cam(900, 470, 1000), title: { nl: 'Een rij U’s: zwak vast, dus los', en: 'A row of U’s: weakly held, so it lets go' },
      text: { nl: 'Achter de haarspeld volgen U’s. Die houden het DNA maar zwak vast: het RNA en het enzym komen los.', en: 'After the hairpin come U’s. They hold the DNA only weakly: the RNA and the enzyme come free.' } },
    { dur: 9000, cam: cam(800, 460, 1600), title: { nl: 'Stop 2: het eiwit Rho', en: 'Stop 2: the protein Rho' },
      text: { nl: 'Bij andere genen bindt een ring van eiwitten (Rho) op vrij RNA. Rho kruipt naar het enzym toe.', en: 'At other genes a ring of proteins (Rho) binds free RNA. Rho crawls towards the enzyme.' } },
    { dur: 8000, cam: cam(800, 460, 1600), title: { nl: 'Rho haalt in en stopt het kopiëren', en: 'Rho catches up and stops copying' },
      text: { nl: 'Rho haalt het RNA-polymerase in en duwt het van het DNA. Het RNA komt vrij.', en: 'Rho catches up with RNA polymerase and pushes it off the DNA. The RNA is released.' } },
    { dur: 9000, cam: cam(800, 460, 1600), title: { nl: 'Ribosomen houden Rho tegen', en: 'Ribosomes keep Rho away' },
      text: { nl: 'Zolang ribosomen het mRNA lezen, kan Rho er niet op. Zo stopt Rho vooral RNA dat niet vertaald wordt.', en: 'As long as ribosomes read the mRNA, Rho cannot get on. So Rho mainly stops RNA that is not being translated.' } },
  ],
  svg() {
    return svgOpen() + `
    <g id="bt-dna"></g>
    <g id="bt-rna"></g>
    <g id="bt-obj"></g>
    <g id="bt-lab"></g>
    <g data-node="operon" data-color="#ff6b6b" data-label="${T2('← lac-operon', '← lac operon')}"><circle data-anchor="operon" cx="200" cy="735" data-pos="below" r="1" fill="none"/><rect x="199" y="734" width="2" height="2" fill="none"/></g>
    <g data-node="btrp" data-color="${K.term}" data-label="${T2('Stoppen als regelknop: trp-operon', 'Stopping as a control: trp operon')}"><circle data-anchor="btrp" cx="760" cy="735" data-pos="below" r="1" fill="none"/><rect x="759" y="734" width="2" height="2" fill="none"/></g>
    <g data-node="bmrna" data-color="${C.rna}" data-label="${T2('mRNA & 70S →', 'mRNA & 70S →')}"><circle data-anchor="bmrna" cx="1320" cy="735" data-pos="below" r="1" fill="none"/><rect x="1319" y="734" width="2" height="2" fill="none"/></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const dna = (termOp) => `<line x1="60" y1="${Y - 8}" x2="1540" y2="${Y - 8}" stroke="${C.dna}" stroke-width="5"/><line x1="60" y1="${Y + 8}" x2="1540" y2="${Y + 8}" stroke="${C.dna2}" stroke-width="5"/>` +
      `<g opacity="${f1(termOp)}"><rect x="${TERM[0]}" y="${Y - 22}" width="${TERM[1] - TERM[0]}" height="44" rx="6" fill="${K.term}" fill-opacity=".16" stroke="${K.term}" stroke-width="2.5"/>` + txt((TERM[0] + TERM[1]) / 2, Y + 64, 'terminator', K.term, 24, 'middle', 700) + '</g>' +
      `<rect x="160" y="${Y + 26}" width="740" height="14" rx="7" fill="#b98cff" fill-opacity=".3" stroke="#b98cff"/>` + txt(530, Y + 70, T2('gen', 'gene'), '#b98cff', 22, 'middle', 700);
    return {
      update(t, s) {
        const { step, p } = s;
        let x, len, rnapOp = 1, hp = 0, uu = 0, rel = 0, rhoD = -1, rhoOp = 0, ribos = 0, termOp = 1;
        if (step === 0) { x = lerp(240, 900, ease(sub(p, .05, .9))); len = x - 200; }
        else if (step === 1) { x = lerp(900, 1000, ease(sub(p, 0, .4))); len = x - 200; hp = ease(sub(p, .3, .75)); }
        else if (step === 2) { x = lerp(1000, 1075, ease(sub(p, 0, .3))); len = x - 200; hp = 1; uu = sub(p, .1, .35); rel = ease(sub(p, .45, .9)); }
        else {
          // Rho-scenario op een gen zonder intrinsieke terminator
          termOp = step === 3 ? 1 - sub(p, 0, .3) : 0;
          if (step === 3) { x = lerp(300, 1100, ease(sub(p, 0, 1))); len = x - 200; rhoOp = sub(p, .25, .4); rhoD = lerp(len * .9, len * .45, ease(sub(p, .35, 1))); }
          else if (step === 4) { x = 1100; len = 900; rhoOp = 1; rhoD = lerp(len * .45, 40, ease(sub(p, 0, .45))); rel = ease(sub(p, .5, .95)); }
          else { x = lerp(300, 1300, ease(sub(p, .05, .95))); len = x - 200; ribos = 1; rhoOp = sub(p, .2, .35); rhoD = len * .92; }
        }
        $('bt-dna').innerHTML = dna(termOp);
        // RNA (+ loslaten: RNA en polymerase schuiven omhoog weg)
        const dy = -140 * rel, op = 1 - .85 * rel;
        let r = `<g transform="translate(${f1(60 * rel)} ${f1(dy)})" opacity="${f1(op)}">` + rnaPath(x, len);
        if (hp > .01) {
          const [hx, hy] = rnaPt(x, 34);
          let st = ''; for (let i = 0; i < 5; i++) st += `<line x1="${f1(hx - 12)}" y1="${f1(hy - 10 - i * 16)}" x2="${f1(hx + 12)}" y2="${f1(hy - 10 - i * 16)}" stroke="${K.term}" stroke-width="2.5"/>`;
          r += `<g opacity="${f1(hp)}" transform="translate(0 ${f1((1 - hp) * 30)})"><path d="M${f1(hx - 12)},${f1(hy)} V${f1(hy - 86)} a12,12 0 0 1 24,0 V${f1(hy)}" stroke="${C.rna}" stroke-width="4.5" fill="none"/>${st}` + txt(hx - 26, hy - 44, 'G–C', K.term, 20, 'end', 800) + '</g>';
        }
        if (uu > .01) r += `<g opacity="${f1(uu)}">` + mono(x - 8, Y - 30, 'UUUUUUU', C.rna, 18) + '</g>';
        if (ribos) for (let d = 120; d < len - 60; d += 150) { const [qx, qy] = rnaPt(x, len - d); r += ribo(qx, qy - 6, 2.2, 1); }
        r += '</g>';
        $('bt-rna').innerHTML = r;
        // polymerase en Rho
        let o = `<g transform="translate(${f1(60 * rel)} ${f1(dy)})" opacity="${f1(op * rnapOp)}">` + prot(x, Y - 26, 62, 42, K.rnap, 1, 31, 'RNAP', 22) + '</g>';
        if (rhoOp > .01 && rhoD >= 0) {
          const [qx, qy] = rnaPt(x, rhoD);
          o += `<g transform="translate(${f1(60 * rel)} ${f1(dy)})">` + rhoRing(qx, qy, rhoOp * (step === 4 ? 1 - .85 * rel : 1)) + '</g>';
          if (step === 5) o += `<g opacity="${f1(rhoOp)}"><path d="M${f1(qx - 18)},${f1(qy - 52)} l36,36 m0,-36 l-36,36" stroke="${C.danger}" stroke-width="6"/></g>`;
        }
        $('bt-obj').innerHTML = o;
        // labels
        let l = '';
        if (step === 2) l += `<g opacity="${f1(sub(p, .6, .8))}">` + txt(1200, 360, T2('RNA en enzym los', 'RNA and enzyme released'), C.text, 26, 'middle', 700) + '</g>';
        if (step === 3) l += `<g opacity="${f1(sub(p, .3, .5))}">` + txt(330, 230, T2('geen ribosomen op dit RNA', 'no ribosomes on this RNA'), C.muted, 24, 'middle', 700) + '</g>';
        if (step === 4) l += `<g opacity="${f1(sub(p, .55, .8))}">` + txt(1250, 330, T2('kopiëren gestopt', 'copying stopped'), C.text, 26, 'middle', 700) + '</g>';
        if (step === 5) l += `<g opacity="${f1(sub(p, .35, .55))}">` + txt(330, 230, T2('ribosomen bedekken het mRNA', 'ribosomes cover the mRNA'), K.ribo, 24, 'middle', 700) + '</g>';
        $('bt-lab').innerHTML = l;
      },
    };
  },
};
