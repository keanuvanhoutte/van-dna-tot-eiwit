import { C, L, T2, svgOpen, txt, cam, sub, ease, lerp, clamp, rng, f1 } from '../../kit.js';
import { K, ribo, dsRing, rodCell, panel } from './_bkit.js';

/* E. coli-cel: geen kern, nucleoïd, één ringvormig chromosoom, plasmiden, 70S-ribosomen.
 * Bronnen: Blattner et al. 1997 (genoom K-12), Alberts MBoC 4e, Cooper The Cell 2e (zie shared/details/bact.js). */
const CX = 800, CY = 450;                       // midden van de cel / nucleoïd
const CELL = [130, 215, 1340, 470];             // x, y, b, h van de staaf
const PLAS = [[390, 330, 26], [1215, 575, 22], [1270, 335, 30]];
const RX = 300, RY = 150;                       // grootte nucleoïd
/* ribosomen: vaste, toevallige plekken in het cytoplasma, buiten de nucleoïd */
const RIBOS = (() => {
  const r = rng(42), out = [];
  while (out.length < 90) {
    const x = 210 + r() * 1180, y = 270 + r() * 360;
    const inCell = ((x - CX) / 610) ** 2 + ((y - CY) / 205) ** 2 < 1 || (x > 345 && x < 1255 && y > 262 && y < 638);
    const inNuc = ((x - CX) / (RX + 50)) ** 2 + ((y - CY) / (RY + 45)) ** 2 < 1;
    const nearPl = PLAS.some(([px, py, pr]) => Math.hypot(x - px, y - py) < pr + 22);
    if (inCell && !inNuc && !nearPl && !out.some(([a, b]) => Math.hypot(a - x, b - y) < 30)) out.push([x, y]);
  }
  return out;
})();

/* nucleoïd als opgevouwen lussen (rozet) dat kan ontvouwen tot een ring (m = 0 → nucleoïd, 1 → ring) */
function chromPath(m, t) {
  // p(a) = R·e^{ia} + r·e^{-i·k·a}: een gesloten lus met k+1 binnenlussen (opgevouwen DNA); r → 0 geeft een gewone ring
  const pts = [], n = 900, k = 10, w = t / 9000;
  for (let i = 0; i <= n; i++) {
    const a = i / n * Math.PI * 2;
    const R = lerp(.6, 1, m), r = lerp(.4, 0, m);
    const x = R * Math.cos(a) + r * Math.cos(-k * a + w), y = R * Math.sin(a) + r * Math.sin(-k * a + w);
    pts.push([CX + x * lerp(RX, 170, m), CY + y * lerp(RY, 170, m)]);
  }
  return pts.map((q, i) => `${i ? 'L' : 'M'}${f1(q[0])},${f1(q[1])}`).join('') + 'Z';
}

export default {
  id: 'bcel',
  title: { nl: 'Een bacterie heeft geen kern', en: 'A bacterium has no nucleus' },
  scale: { nl: '≈ 2 µm lang', en: '≈ 2 µm long' }, time: { nl: 'deling ≈ 20–60 min (bij goede groei)', en: 'division ≈ 20–60 min (in good growth)' },
  org: { nl: 'bacterie (Escherichia coli)', en: 'bacterium (Escherichia coli)' },
  legend: [[C.mem, { nl: 'membranen (binnen en buiten)', en: 'membranes (inner and outer)' }], ['#8a93a8', { nl: 'celwand (peptidoglycaan)', en: 'cell wall (peptidoglycan)' }],
    [C.dna, { nl: 'chromosoom (nucleoïd)', en: 'chromosome (nucleoid)' }], [K.plas, { nl: 'plasmiden', en: 'plasmids' }], [K.ribo, { nl: '70S-ribosomen', en: '70S ribosomes' }], [C.rna, 'mRNA']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Verhaal 3: dezelfde weg van DNA tot eiwit, maar in een bacterie. Vergelijk telkens met de menselijke cel.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Story 3: the same path from DNA to protein, but in a bacterium. Compare each time with the human cell.</p>' },
  simplified: {
    nl: 'Niet op schaal. Het chromosoom van E. coli is uitgerekt ≈ 1,5 mm lang, honderden keren de lengte van de cel, en zit veel dichter opgevouwen dan getekend. De echte nucleoïd heeft geen scherpe rand en ribosomen zitten er vooral rond. Het aantal ribosomen hangt sterk af van de groeisnelheid (duizenden tot tienduizenden); hier staan er maar een paar. De labstam K-12 MG1655 heeft zelf geen plasmiden; veel andere stammen wel. Zweepharen (flagellen) en pili zijn weggelaten.',
    en: 'Not to scale. Stretched out, the E. coli chromosome is ≈ 1.5 mm long, hundreds of times the length of the cell, and it is packed far more densely than drawn. The real nucleoid has no sharp edge and ribosomes are found mostly around it. The number of ribosomes depends strongly on growth rate (thousands to tens of thousands); only a few are drawn. The lab strain K-12 MG1655 itself has no plasmids; many other strains do. Flagella and pili are left out.' },
  steps: [
    { dur: 7000, cam: cam(800, 450, 1500), title: { nl: 'Een bacterie: klein en zonder kern', en: 'A bacterium: small and without a nucleus' },
      text: { nl: 'De darmbacterie E. coli is een staafje van ongeveer 2 µm. Er is geen kern: alles gebeurt in één ruimte.', en: 'The gut bacterium E. coli is a rod of about 2 µm. There is no nucleus: everything happens in one space.' } },
    { dur: 7000, cam: cam(800, 450, 1100), title: { nl: 'Het DNA ligt los in de cel', en: 'The DNA lies free in the cell' },
      text: { nl: 'Het DNA ligt opgevouwen in het midden. Die zone heet de nucleoïd; er zit geen membraan omheen.', en: 'The DNA lies folded up in the middle. This zone is called the nucleoid; there is no membrane around it.' } },
    { dur: 8000, cam: cam(800, 450, 1100), title: { nl: 'Eén ringvormig chromosoom', en: 'One circular chromosome' },
      text: { nl: 'Het chromosoom is één gesloten ring van ≈ 4,6 miljoen basenparen. De mens heeft 46 lineaire chromosomen.', en: 'The chromosome is one closed ring of ≈ 4.6 million base pairs. Humans have 46 linear chromosomes.' } },
    { dur: 7000, cam: cam(800, 450, 1500), title: { nl: 'Extra ringen: plasmiden', en: 'Extra rings: plasmids' },
      text: { nl: 'Veel bacteriën hebben ook kleine extra DNA-ringen. Die plasmiden kopiëren zichzelf apart.', en: 'Many bacteria also carry small extra DNA rings. These plasmids copy themselves separately.' } },
    { dur: 8000, cam: cam(800, 450, 1500), title: { nl: 'Ribosomen vlak naast het DNA', en: 'Ribosomes right next to the DNA' },
      text: { nl: 'Duizenden 70S-ribosomen liggen in het cytoplasma. Ze lezen een mRNA al terwijl het nog gemaakt wordt.', en: 'Thousands of 70S ribosomes lie in the cytoplasm. They read an mRNA while it is still being made.' } },
  ],
  svg() {
    return svgOpen() + rodCell(...CELL) + `
    <g id="bc-nucout"></g>
    <g data-node="bnucleoid" data-color="${C.dna}" data-label="${T2('Nucleoïd van dichtbij (3D)', 'Nucleoid up close (3D)')}"><path id="bc-chrom" fill="none" stroke="${C.dna}" stroke-width="4" stroke-linejoin="round"/><circle data-anchor="bnucleoid" cx="${CX}" cy="${CY - 120}" r="1" fill="none"/></g>
    <g data-node="breplicatie" data-color="${K.ori}" data-label="${T2('Hoe het chromosoom gekopieerd wordt', 'How the chromosome is copied')}" data-pos="below"><circle data-anchor="breplicatie" cx="${CX}" cy="${CY + 120}" r="1" fill="none"/><rect x="${CX}" y="${CY + 119}" width="1" height="1" fill="none"/></g>
    <g id="bc-ring"></g>
    <g data-node="bplasmide" data-color="${K.plas}" data-label="${T2('Plasmiden', 'Plasmids')}"><g id="bc-plas"></g><circle data-anchor="bplasmide" cx="1270" cy="290" r="1" fill="none"/></g>
    <g data-node="bmrna" data-color="${K.ribo}" data-label="${T2('mRNA & 70S-ribosoom', 'mRNA & 70S ribosome')}"><g id="bc-ribo"></g><g id="bc-mrna"></g><circle data-anchor="bmrna" cx="560" cy="640" r="1" fill="none"/></g>
    <g data-node="cel" data-color="${C.text}" data-label="${T2('Vergelijk: menselijke cel', 'Compare: human cell')}" data-pos="below"><rect x="1330" y="720" width="1" height="1" fill="none"/><circle data-anchor="cel" cx="1330" cy="730" r="1" fill="none"/></g>
    <g id="bc-lab"></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        // ring ↔ nucleoïd
        const m = step === 2 ? ease(sub(p, .15, .6)) : step === 3 ? 1 - ease(sub(p, 0, .35)) : 0;
        $('bc-chrom').setAttribute('d', chromPath(m, t));
        const focus = { chrom: [1, 1, 1, .45, .45][step], plas: [1, .3, .3, 1, .45][step], ribo: [1, .3, .3, .35, 1][step] };
        $('bc-chrom').setAttribute('opacity', f1(focus.chrom));
        // nucleoïd-zone (stap 1): stippellijn zonder membraan
        const no = step === 1 ? ease(sub(p, .2, .5)) : 0;
        $('bc-nucout').innerHTML = no > .01 ? `<ellipse cx="${CX}" cy="${CY}" rx="${RX + 40}" ry="${RY + 38}" fill="${C.dna}" fill-opacity=".06" stroke="${C.dna2}" stroke-width="2" stroke-dasharray="3 9" opacity="${f1(no)}"/>` : '';
        // oriC en ter op de ring (stap 2)
        const ro = step === 2 ? sub(p, .55, .75) : step === 3 ? 1 - sub(p, 0, .2) : 0;
        $('bc-ring').innerHTML = ro > .01 ? `<g opacity="${f1(ro)}"><circle cx="${CX}" cy="${CY - 170}" r="9" fill="${K.ori}"/>` + txt(CX, CY - 188, 'oriC', K.ori, 24, 'middle', 800) +
          `<circle cx="${CX}" cy="${CY + 170}" r="7" fill="${C.muted}"/>` + txt(CX, CY + 204, 'ter', C.muted, 22) +
          txt(CX, CY + 8, T2('≈ 4,6 miljoen bp', '≈ 4.6 million bp'), C.text, 26, 'middle', 700) + '</g>' : '';
        // plasmiden
        const pg = step === 3 ? 1 + .25 * ease(sub(p, .1, .4)) : 1;
        $('bc-plas').innerHTML = PLAS.map(([x, y, r]) => dsRing(x, y, r * pg, K.plas, 3, focus.plas)).join('');
        // ribosomen (+ een mRNA met ribosomen aan de rand van de nucleoïd in stap 4)
        $('bc-ribo').innerHTML = RIBOS.map(([x, y], i) => ribo(x, y, step === 4 ? 1.15 : 1, focus.ribo * (.8 + .2 * Math.sin(i)))).join('');
        const mo = step === 4 ? ease(sub(p, .25, .55)) : 0;
        let mr = '';
        if (mo > .01) {
          const pts = []; for (let i = 0; i <= 30; i++) pts.push([560 - i * 9, 560 + i * 3 + 10 * Math.sin(i / 3)]);
          mr = `<g opacity="${f1(mo)}"><path d="${pts.map((q, i) => `${i ? 'L' : 'M'}${f1(q[0])},${f1(q[1])}`).join('')}" stroke="${C.rna}" stroke-width="4" fill="none" stroke-linecap="round"/>` +
            [8, 17, 26].map(i => ribo(pts[i][0], pts[i][1] - 8, 1.5, 1)).join('') + '</g>';
        }
        $('bc-mrna').innerHTML = mr;
        // labels in beeld
        let lab = '';
        if (step === 0) {
          const o = sub(p, .2, .45);
          lab += `<g opacity="${f1(o)}">` + `<line x1="470" y1="745" x2="1130" y2="745" stroke="${C.muted}" stroke-width="3"/><line x1="470" y1="735" x2="470" y2="755" stroke="${C.muted}" stroke-width="3"/><line x1="1130" y1="735" x2="1130" y2="755" stroke="${C.muted}" stroke-width="3"/>` +
            txt(800, 790, T2('≈ 1 µm', '≈ 1 µm'), C.muted, 22) + txt(800, 175, T2('geen kern: één ruimte (cytoplasma)', 'no nucleus: one space (cytoplasm)'), C.text, 30, 'middle', 700) + '</g>';
        }
        if (step === 1) lab += `<g opacity="${f1(no)}">` + txt(CX, 196, T2('nucleoïd · geen membraan', 'nucleoid · no membrane'), C.dna2, 28, 'middle', 700) + '</g>';
        if (step === 3) lab += `<g opacity="${f1(sub(p, .3, .5))}">` + txt(390, 280, T2('plasmide', 'plasmid'), K.plas, 24, 'middle', 700) + txt(1270, 270, T2('plasmide', 'plasmid'), K.plas, 24, 'middle', 700) + '</g>';
        if (step === 4) lab += `<g opacity="${f1(sub(p, .1, .3))}">` + txt(1150, 205, T2('70S-ribosomen', '70S ribosomes'), K.ribo, 28, 'middle', 700) + '</g>' +
          `<g opacity="${f1(sub(p, .5, .7))}">` + txt(330, 700, T2('mRNA + ribosomen', 'mRNA + ribosomes'), C.rna, 24, 'middle', 700) + '</g>';
        $('bc-lab').innerHTML = lab;
      },
    };
  },
};
