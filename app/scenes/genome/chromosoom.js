import { C, L, T2, svgOpen, txt, mono, cam, FULL, sub, ease, lerp, clamp, f1, rng } from '../../kit.js';
import { ST, nucleo, panel, smooth } from './_a_kit.js';

/*
 * Chromosoom: karyogram (46), bouw van een metafasechromosoom (zusterchromatiden, centromeer, telomeren, cohesine, condensine).
 * Lengtes (Mb) volgens T2T-CHM13 v2.0 (Y: T2T-HG002); centromeerpositie = aandeel p-arm (benaderd uit GRCh38-centromeren).
 */
const CHR = [
  ['1', 248.4, .50], ['2', 242.7, .38], ['3', 201.1, .45], ['4', 193.6, .26], ['5', 182.0, .27], ['6', 172.1, .35],
  ['7', 160.6, .38], ['8', 146.3, .31], ['9', 150.6, .30], ['10', 134.8, .30], ['11', 135.1, .40], ['12', 133.3, .27],
  ['13', 113.6, .15], ['14', 101.2, .16], ['15', 99.8, .18], ['16', 96.3, .41], ['17', 84.3, .30], ['18', 80.5, .22],
  ['19', 61.7, .45], ['20', 66.2, .43], ['21', 45.1, .26], ['22', 51.3, .29], ['X', 154.3, .39], ['Y', 62.5, .17],
];
const ACRO = new Set(['13', '14', '15', '21', '22']);
const KY = 130, KS = 1.2;            // bovenkant karyogram, px per Mb
const BX = 420, BC = 620, LEN = 360, CF = .46, W = 50, TOP = BC - LEN * CF;  // groot chromosoom

/* één chromatide (verticaal) met centromeerinsnoering en eenvoudige G-banden */
function chromatid(x, top, len, cfrac, w, col, bands = 0, seed = 1) {
  const cy = top + len * cfrac, r = w / 2;
  let s = `<rect x="${f1(x - r)}" y="${f1(top)}" width="${f1(w)}" height="${f1(Math.max(w, cy - top - w * .15))}" rx="${f1(r)}" fill="${col}"/>` +
    `<rect x="${f1(x - r)}" y="${f1(cy + w * .15)}" width="${f1(w)}" height="${f1(Math.max(w, top + len - cy - w * .15))}" rx="${f1(r)}" fill="${col}"/>` +
    `<rect x="${f1(x - r * .55)}" y="${f1(cy - w * .3)}" width="${f1(w * .55)}" height="${f1(w * .6)}" fill="${col}"/>`;
  if (bands) {
    const rr = rng(seed);
    for (let i = 0; i < bands; i++) {
      const y = top + w * .6 + rr() * (len - w * 1.2), h = 2 + rr() * len * .03;
      if (Math.abs(y - cy) < w * .5) continue;
      s += `<rect x="${f1(x - r + 1)}" y="${f1(y)}" width="${f1(w - 2)}" height="${f1(h)}" fill="#0a1224" opacity=".45"/>`;
    }
  }
  return s;
}

export default {
  id: 'chromosoom',
  title: { nl: 'Chromosoom', en: 'Chromosome' },
  scale: { nl: '≈ 1–10 µm (metafase)', en: '≈ 1–10 µm (metaphase)' },
  time: { nl: 'mitose ≈ 1 uur', en: 'mitosis ≈ 1 hour' },
  org: { nl: 'mens (46,XX of 46,XY)', en: 'human (46,XX or 46,XY)' },
  legend: [[C.dna, { nl: 'chromatide / DNA', en: 'chromatid / DNA' }], ['#ffc247', { nl: 'cohesine', en: 'cohesin' }], [C.prot, { nl: 'kinetochoor', en: 'kinetochore' }], ['#7fdc6a', { nl: 'microtubuli', en: 'microtubules' }], [C.rna, { nl: 'telomeer (TTAGGG)ₙ', en: 'telomere (TTAGGG)ₙ' }], [C.rrna, { nl: 'rDNA (NOR)', en: 'rDNA (NOR)' }], ['#5fd3e6', { nl: 'condensine', en: 'condensin' }]],
  simplified: {
    nl: 'Lengtes in het karyogram zijn op schaal (T2T-referentie), maar de centromeerposities zijn benaderd en de banden zijn schematisch (geen echt G-bandpatroon). Cohesine en condensine zijn als ringen getekend; in een echt chromosoom zijn het er duizenden. Het aantal lussen, microtubuli en telomeerherhalingen is sterk verminderd.',
    en: 'Lengths in the karyogram are to scale (T2T reference), but centromere positions are approximate and the bands are schematic (not a real G-banding pattern). Cohesin and condensin are drawn as rings; a real chromosome has thousands. The number of loops, microtubules and telomere repeats is strongly reduced.' },
  steps: [
    ST(8000, cam(800, 290, 1560), '46 chromosomen', '46 chromosomes',
      'Een menselijke lichaamscel heeft 23 paren chromosomen: 22 gewone paren (autosomen) en de geslachtschromosomen XX of XY. Eén set telt ruim 3 miljard basenparen.',
      'A human body cell has 23 pairs of chromosomes: 22 ordinary pairs (autosomes) plus the sex chromosomes XX or XY. One set holds just over 3 billion base pairs.'),
    ST(8000, cam(1130, 290, 900), 'Grootte en vorm verschillen', 'Size and shape differ',
      'Chromosomen verschillen sterk in grootte: chromosoom 1 is meer dan vijf keer zo lang als chromosoom 21. Vijf chromosomen dragen de genen voor ribosomaal RNA.',
      'Chromosomes differ greatly in size: chromosome 1 is more than five times as long as chromosome 21. Five chromosomes carry the genes for ribosomal RNA.'),
    ST(8000, cam(430, 628, 820), 'Een metafasechromosoom', 'A metaphase chromosome',
      'Na het kopiëren van het DNA bestaat elk chromosoom uit twee identieke helften (zusterchromatiden), verbonden bij het centromeer. De korte arm heet p, de lange q.',
      'After the DNA is copied, each chromosome consists of two identical halves (sister chromatids), joined at the centromere. The short arm is called p, the long arm q.'),
    ST(8500, cam(430, 628, 820), 'Cohesine houdt de zusters samen', 'Cohesin holds the sisters together',
      'Ringen van het eiwit cohesine houden de twee zusters bij elkaar. Bij de scheiding (anafase) knipt het enzym separase de laatste ringen, bij het centromeer, door.',
      'Rings of the protein cohesin hold the two sisters together. At separation (anaphase) the enzyme separase cuts the last rings, at the centromere.'),
    ST(8500, cam(1200, 560, 760), 'Centromeer en kinetochoor', 'Centromere and kinetochore',
      'Het centromeer is een lang stuk herhaald DNA met een speciaal histon (CENP-A). Daarop wordt het kinetochoor gebouwd, waaraan de spoeldraden zich hechten.',
      'The centromere is a long stretch of repeated DNA with a special histone (CENP-A). The kinetochore is built on it, and the spindle fibres attach there.'),
    ST(8500, cam(1200, 780, 760), 'Telomeren beschermen de uiteinden', 'Telomeres protect the ends',
      'De uiteinden, de telomeren, bestaan uit vele herhalingen van TTAGGG, afgeschermd door een eiwitcomplex (shelterin). Het enzym telomerase kan ze verlengen.',
      'The ends, the telomeres, consist of many TTAGGG repeats, shielded by a protein complex (shelterin). The enzyme telomerase can extend them.'),
    ST(8500, cam(380, 500, 520), 'Condensine vouwt lussen', 'Condensin folds loops',
      'Bij de celdeling vouwt het eiwit condensine elke chromatide tot een rij lussen. Het DNA is dan ~10 000 keer korter dan uitgerekt.',
      'During cell division the protein condensin folds each chromatid into a row of loops. The DNA is then ~10,000 times shorter than when stretched out.'),
    ST(7500, cam(430, 628, 900), 'Terug naar de interfase', 'Back to interphase',
      'Na de celdeling ontvouwt elk chromosoom zich weer tot chromatine, met een eigen plek in de kern.',
      'After cell division each chromosome unfolds again into chromatin, with its own place in the nucleus.'),
  ],
  svg() {
    // ---- karyogram ----
    let kar = '';
    const pitch = 1500 / 24;
    CHR.forEach(([n, mb, cf], i) => {
      const cx = 60 + i * pitch + pitch / 2, len = mb * KS, w = 14;
      const isY = n === 'Y', isX = n === 'X';
      const col = isX || isY ? '#e08f8f' : C.dna;
      const pair = isY ? [cx] : isX ? [cx] : [cx - 9, cx + 9];
      let g = '';
      pair.forEach((x, k) => {
        g += chromatid(x, KY, len, cf, w, col, 6, i * 7 + 3);
        if (ACRO.has(n)) g += `<circle cx="${f1(x)}" cy="${KY - 9}" r="4.5" fill="${C.rrna}"/><line x1="${f1(x)}" y1="${KY - 4}" x2="${f1(x)}" y2="${KY + 2}" stroke="${C.rrna}" stroke-width="2"/>`;
      });
      const lab = isX ? 'X' : isY ? 'Y' : n;
      g += txt(cx, KY + len + 24, lab, C.text, 17, 'middle', 700);
      if (ACRO.has(n)) kar += `<g data-node="nucleolus" data-color="${C.rrna}" data-label="${T2('rDNA → nucleolus', 'rDNA → nucleolus')}" ${n === '13' ? '' : 'data-nolabel'}>${g}${n === '13' ? `<circle data-anchor="nucleolus" cx="${f1(cx + 120)}" cy="${KY - 24}" r="1" fill="none"/>` : ''}</g>`;
      else kar += g;
    });
    kar += txt(1572, KY + 236, T2('geslachtschromosomen', 'sex chromosomes'), '#e08f8f', 21, 'end') + txt(1572, KY + 264, T2('(man: 46,XY)', '(male: 46,XY)'), '#e08f8f', 21, 'end');
    // schaalbalk 50 Mb
    kar += `<line x1="1430" y1="${KY + 300}" x2="${1430 + 50 * KS}" y2="${KY + 300}" stroke="#fff" stroke-width="3"/>` + txt(1430 + 25 * KS, KY + 328, '50 Mb', '#fff', 21);

    // ---- groot metafasechromosoom (twee zusterchromatiden) ----
    const top = TOP, len = LEN;
    const sis = dx => chromatid(BX + dx, top, len, CF, W, C.dna, 14, 5);
    const big = `<g id="cs-sisA">${sis(-W / 2 - 3)}</g><g id="cs-sisB">${sis(W / 2 + 3)}<rect x="${BX - 12}" y="${BC - 9}" width="24" height="18" rx="6" fill="${C.dna}"/></g>`;
    // telomeerkappen
    const telo = [[-1, top], [1, top], [-1, top + len], [1, top + len]].map(([sd, y]) =>
      `<rect x="${f1(BX + sd * (W / 2 + 3) - W / 2 + 2)}" y="${f1(y < BC ? y : y - 14)}" width="${W - 4}" height="14" rx="7" fill="${C.rna}"/>`).join('');

    // ---- inzet centromeer ----
    let cen = panel(860, 400, 680, 300, T2('Centromeer', 'Centromere'), '#2a3a60', 20);
    // α-satelliet-array met CENP-A-nucleosomen
    cen += `<g data-node="nucleosoom" data-color="${C.histone}" data-nolabel>`;
    for (let i = 0; i < 9; i++) {
      const x = 930 + i * 58, nu = nucleo(x, 590, 20, { rot: -90 + i * 25, w: 5, core: i % 3 === 1 ? C.histone : '#c78bf0' });
      cen += nu.svg;
    }
    cen += `</g>`;
    cen += `<path d="M900,600 L1450,600" stroke="${C.dna}" stroke-width="4" opacity=".0"/>`;
    cen += `<rect x="920" y="500" width="500" height="40" rx="20" fill="rgba(155,123,255,.35)" stroke="${C.prot}" stroke-width="3"/>` + txt(1170, 526, T2('kinetochoor', 'kinetochore'), '#fff', 18);
    for (let i = 0; i < 7; i++) cen += `<line x1="${960 + i * 70}" y1="500" x2="${1000 + i * 55}" y2="440" stroke="#7fdc6a" stroke-width="7" stroke-linecap="round"/>`;
    cen += txt(1480, 470, T2('microtubuli', 'microtubules'), '#7fdc6a', 18, 'end');
    cen += txt(1170, 650, T2('α-satelliet-DNA · CENP-A-nucleosomen (paars)', 'α-satellite DNA · CENP-A nucleosomes (purple)'), C.muted, 17);

    // ---- inzet telomeer ----
    let tel = panel(860, 720, 680, 170, T2('Telomeer', 'Telomere'), '#2a3a60', 20);
    const rep = 'TTAGGG';
    for (let i = 0; i < 5; i++) {
      tel += `<rect x="${900 + i * 100}" y="790" width="92" height="30" rx="6" fill="rgba(255,138,61,.25)" stroke="${C.rna}" stroke-width="2"/>` + mono(946 + i * 100, 811, rep, C.rna, 16);
    }
    tel += `<rect x="1400" y="790" width="92" height="30" rx="6" fill="rgba(255,138,61,.25)" stroke="${C.rna}" stroke-width="2" stroke-dasharray="4 3"/>` + mono(1446, 811, rep, C.rna, 16);
    tel += txt(1446, 845, T2("3'-overhang", "3' overhang"), C.rna, 13) + txt(890, 811, "5'", C.text, 15, 'end') + txt(1510, 811, "3'", C.text, 15, 'start');
    tel += `<path d="M900,835 L1390,835" stroke="${C.dna2}" stroke-width="4"/>` + txt(1145, 870, T2('complementaire streng (CCCTAA)ₙ', 'complementary strand (CCCTAA)ₙ'), C.dna2, 13);
    tel += `<g id="cs-shel">${[960, 1100, 1240].map(x => `<ellipse cx="${x}" cy="775" rx="30" ry="12" fill="#c78bf0" opacity=".8"/>`).join('')}${txt(1330, 772, 'shelterin', '#c78bf0', 14, 'start')}</g>`;

    // ---- condensinelussen op een arm ----
    let loops = '';
    const r3 = rng(9), ax = BX - W / 2 - 3;
    loops += `<line x1="${ax}" y1="${TOP + 12}" x2="${ax}" y2="${BC - 20}" stroke="#5fd3e6" stroke-width="3" stroke-dasharray="4 4"/>`;
    for (let i = 0; i < 14; i++) {
      const y = TOP + 18 + i * 11, side = i % 2 ? 1 : -1, L2 = W * .55 + r3() * 14;
      loops += `<path d="M${ax},${y} C${f1(ax + side * L2)},${f1(y - 16)} ${f1(ax + side * L2)},${f1(y + 20)} ${ax},${f1(y + 6)}" stroke="${C.dna2}" stroke-width="2.6" fill="none"/>`;
      loops += `<circle cx="${ax}" cy="${f1(y + 3)}" r="4" fill="#5fd3e6"/>`;
    }
    loops += txt(ax - 70, TOP + 60, T2('lussen', 'loops'), C.dna2, 16, 'end') + txt(ax - 70, TOP + 82, T2('rond een as', 'around an axis'), C.dna2, 14, 'end') +
      txt(ax - 70, TOP + 120, T2('condensine', 'condensin'), '#5fd3e6', 16, 'end');
    return svgOpen() + `
    <g id="cs-kar">${kar}</g>
    <g id="cs-big">
      <g data-node="replicatie" data-color="${C.dna}" data-label="${T2('Zusterchromatiden (na replicatie)', 'Sister chromatids (after replication)')}">${big}<circle data-anchor="replicatie" cx="${BX + 170}" cy="${top + 70}" r="1" fill="none"/></g>
      <g data-node="telomeren" data-color="${C.rna}" data-label="${T2('Telomeren', 'Telomeres')}">${telo}<circle data-anchor="telomeren" cx="${BX + 110}" cy="${top + len + 5}" r="1" fill="none"/></g>
      <g id="cs-coh"></g>
      <g id="cs-kin"></g>
      <g id="cs-loops" data-node="chromatine" data-color="${C.dna2}" data-nolabel opacity="0">${loops}</g>
      <g id="cs-lab" font-family="Inter">
        ${txt(BX - 140, BC - 95, T2('p-arm', 'p arm'), C.text, 20)}${txt(BX - 140, BC + 120, T2('q-arm', 'q arm'), C.text, 20)}
        <path d="M${BX - 110},${BC} L${BX - 45},${BC}" stroke="${C.muted}" stroke-width="2" marker-end="url(#arrow)"/>${txt(BX - 118, BC + 6, T2('centromeer', 'centromere'), C.muted, 18, 'end')}
        
      </g>
      <g id="cs-inter" opacity="0"></g>
    </g>
    <g id="cs-cen">${cen}</g>
    <g data-node="telomeren" data-color="${C.rna}" data-nolabel id="cs-tel">${tel}</g>
    <g data-node="chromatine" data-color="${C.dna}" data-label="${T2('Chromatine →', 'Chromatin →')}"><g id="cs-chr"></g><circle id="cs-chrA" data-anchor="chromatine" cx="${BX - 150}" cy="${top + 5}" r="1" fill="none"/></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const top = TOP, len = LEN;
    // posities van cohesineringen langs de armen (y) en bij het centromeer
    const armY = [top + 40, top + 95, BC + 60, BC + 120, BC + 175];
    const cohRing = (y, op) => op < .01 ? '' : `<ellipse cx="${BX}" cy="${f1(y)}" rx="${W + 12}" ry="8" fill="none" stroke="#ffc247" stroke-width="5" opacity="${f1(op)}"/>`;
    const r = rng(4);
    const blob = [];
    let wx = BX, wy = BC - 150, wa = 1.2;
    for (let i = 0; i < 60; i++) {
      blob.push([wx, wy]);
      wa += (r() - .5) * 1.6; wx += Math.cos(wa) * 22; wy += Math.sin(wa) * 22;
      const ex = (wx - BX) / 125, ey = (wy - BC) / 170;
      if (ex * ex + ey * ey > 1) { wa += Math.PI * .9; wx = BX + (wx - BX) * .9; wy = BC + (wy - BC) * .9; }
    }
    return {
      update(t, s) {
        const { step, p } = s;
        // karyogram dimmen zodra we bij het grote chromosoom zijn
        $('cs-kar').setAttribute('opacity', step <= 1 ? 1 : 0);
        const inter = step === 7 ? ease(sub(p, .15, .8)) : 0;
        $('cs-big').setAttribute('opacity', f1(step <= 1 ? 0 : 1));
        ['cs-sisA', 'cs-sisB'].forEach(id => $(id).setAttribute('opacity', f1((1 - inter) * (step === 6 && id === 'cs-sisA' ? 1 - .75 * ease(sub(p, .1, .5)) : 1))));
        $('cs-lab').setAttribute('opacity', f1((step >= 2 && step <= 3 ? 1 : step >= 6 ? 0 : .2) * (1 - inter)));
        // cohesine: armen verdwijnen in stap 3 (profase), centromeer blijft
        let coh = '';
        if (step >= 2 && step < 7) {
          const armOp = step === 2 ? 1 : step === 3 ? 1 - ease(sub(p, .45, .8)) : 0;
          for (const y of armY) coh += cohRing(y, armOp);
          coh += cohRing(BC - 12, 1) + cohRing(BC + 12, 1);
          if (step === 3) coh += txt(BX + 160, BC + 20, T2('cohesine', 'cohesin'), '#ffc247', 20, 'start') +
            txt(BX + 160, BC + 46, T2('(blijft bij het centromeer)', '(stays at the centromere)'), '#ffc247', 15, 'start');
        }
        $('cs-coh').innerHTML = coh;
        // kinetochoren + microtubuli (stap 4)
        const kin = step >= 4 && step <= 6 ? 1 : 0;
        $('cs-kin').innerHTML = kin ? `<path d="M${BX - 70},${BC} L${BX - 230},${BC - 40} M${BX - 70},${BC} L${BX - 230},${BC} M${BX - 70},${BC} L${BX - 230},${BC + 40} M${BX + 70},${BC} L${BX + 230},${BC - 40} M${BX + 70},${BC} L${BX + 230},${BC} M${BX + 70},${BC} L${BX + 230},${BC + 40}" stroke="#7fdc6a" stroke-width="4"/>` +
          `<rect x="${BX - 72}" y="${BC - 15}" width="18" height="30" rx="6" fill="${C.prot}"/><rect x="${BX + 54}" y="${BC - 15}" width="18" height="30" rx="6" fill="${C.prot}"/>` : '';
        $('cs-cen').setAttribute('opacity', step === 4 ? 1 : step === 0 || step === 1 ? 0 : .2);
        $('cs-tel').setAttribute('opacity', step === 5 ? 1 : step === 0 || step === 1 ? 0 : .2);
        $('cs-shel').setAttribute('opacity', step === 5 ? ease(sub(p, .3, .6)) : 1);
        $('cs-loops').setAttribute('opacity', step === 6 ? ease(sub(p, .1, .5)) : 0);
        // interfase: chromatine "ontvouwt" tot een territorium
        let chr = '';
        if (inter > 0) {
          const pts = blob.map(([x, y]) => [lerp(BX, x, inter), lerp(BC, y, inter)]);
          chr = `<path d="${smooth(pts)}" stroke="${C.dna}" stroke-width="3.5" fill="none" stroke-linejoin="round" opacity="${f1(inter)}"/>` +
            `<ellipse cx="${BX}" cy="${BC}" rx="${f1(150 * inter)}" ry="${f1(185 * inter)}" fill="${C.dna}" fill-opacity=".08" stroke="${C.dna}" stroke-dasharray="6 5" opacity="${f1(inter)}"/>` +
            txt(BX, BC + 245, T2('chromosoomterritorium (interfase)', 'chromosome territory (interphase)'), C.dna2, 20, 'middle', 600) ;
        }
        $('cs-chr').innerHTML = chr;
      },
    };
  },
};
