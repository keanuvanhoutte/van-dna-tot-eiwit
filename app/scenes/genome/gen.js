import { C, BASE, L, T2, svgOpen, txt, mono, pill, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { ST } from './_a_kit.js';

/*
 * Architectuur van een typisch menselijk eiwitcoderend gen (schematisch, niet op schaal):
 * enhancer … promoter · TSS (+1) · exon 1 (5'-UTR + ATG) · intron 1 (GT…A…AG) · exon 2 · intron 2 · exon 3 (stop + 3'-UTR + AATAAA) · knipplaats
 */
const Y = 330;                                        // DNA-hoogte
const ENH = [80, 212], PROM = [300, 430], TSS = 430;
const EX = [[430, 590], [790, 930], [1130, 1400]];     // exonen (genoomcoördinaten in px)
const ATG = 520, STOP = 1250, PAS = 1350, CUT = 1400;
const YP = 520, YM = 660;                             // pre-mRNA, rijp mRNA
/* D(): detailtekst, verborgen in de overzichtsbeelden (stap 0 en 7) */
const D = h => h.replace('<text', '<text class="gn-det"');
const col = { utr: '#8fb3e8', cds: C.dna, intron: C.intron, enh: '#ffc247', prom: C.prot };

/* rijp mRNA: exonen aan elkaar (lengtes behouden), begint bij x0 */
const MX0 = 300;
const mpos = gx => {                                   // genoom-x (in een exon) → x in het rijpe mRNA
  let acc = MX0;
  for (const [a, b] of EX) { if (gx <= b) return acc + (gx - a); acc += b - a; }
  return acc;
};

export default {
  id: 'gen',
  title: { nl: 'Architectuur van een gen', en: 'Gene structure' },
  scale: { nl: 'enkele kb tot > 1 Mb (hier niet op schaal)', en: 'a few kb to > 1 Mb (not to scale here)' },
  time: { nl: 'transcriptie van een gemiddeld gen: minuten tot uren', en: 'transcribing an average gene: minutes to hours' },
  org: { nl: 'mens (eiwitcoderend gen, Pol II)', en: 'human (protein-coding gene, Pol II)' },
  legend: [[col.enh, 'enhancer'], [col.prom, 'promoter'], [col.cds, { nl: 'coderend exon (CDS)', en: 'coding exon (CDS)' }], [col.utr, 'UTR'], [col.intron, 'intron'], [C.rna, 'RNA'], [C.cap, "5'-cap"]],
  simplified: {
    nl: 'Niet op schaal: in menselijke genen zijn intronen meestal veel langer dan exonen, en een enhancer kan tientallen tot honderden kb verder liggen (of zelfs in een intron van een ander gen). Slechts een minderheid van de promoters heeft een TATA-box; veel promoters liggen in een CpG-eiland. Genen kunnen op beide strengen liggen; hier staat de coderende streng bovenaan (5\'→3\' van links naar rechts).',
    en: 'Not to scale: in human genes introns are usually much longer than exons, and an enhancer can lie tens to hundreds of kb away (or even in an intron of another gene). Only a minority of promoters has a TATA box; many promoters lie in a CpG island. Genes can lie on either strand; here the coding strand is on top (5\'→3\' from left to right).' },
  steps: [
    ST(8000, FULL, 'Een gen: meer dan de code', 'A gene: more than the code',
      'Een gen is een stuk DNA dat tot RNA wordt afgeschreven, plus de regio\'s die dat regelen. De mens heeft net geen 20 000 eiwitcoderende genen; de coderende delen zijn slechts ~1–1,5 % van het genoom.',
      'A gene is a stretch of DNA transcribed into RNA, plus the regions that control it. Humans have just under 20,000 protein-coding genes; the coding parts are only ~1–1.5% of the genome.'),
    ST(8500, cam(300, 250, 720), 'Enhancers: regelen op afstand', 'Enhancers: control from a distance',
      'Enhancers binden activatoren en kunnen ver van het gen liggen. Via een DNA-lus (cohesine, Mediator) komen ze bij de promoter.',
      'Enhancers bind activators and can lie far from the gene. Through a DNA loop (cohesin, Mediator) they reach the promoter.'),
    ST(8000, cam(430, 350, 660), 'Promoter en startplaats (+1)', 'Promoter and start site (+1)',
      'In de kernpromoter bouwt Pol II zijn startcomplex. Soms ligt er een TATA-box (~−30); vaak een CpG-eiland. Transcriptie start op +1 (TSS).',
      'At the core promoter Pol II builds its initiation complex. Sometimes there is a TATA box (~−30); often a CpG island. Transcription starts at +1 (TSS).'),
    ST(8500, cam(760, 330, 720), 'Exonen en intronen', 'Exons and introns',
      'Intronen worden later uitgeknipt. Ze beginnen bijna altijd met GT en eindigen met AG (GT–AG-regel), met een vertakkingspunt-A kort voor het einde.',
      'Introns are cut out later. They almost always start with GT and end with AG (GT–AG rule), with a branch-point A shortly before the end.'),
    ST(8500, cam(830, 330, 1150), 'UTR\'s en coderende sequentie', 'UTRs and coding sequence',
      'Het eiwit wordt gecodeerd van het startcodon ATG tot een stopcodon (TAA, TAG of TGA). Ervoor en erna liggen de 5\'- en 3\'-UTR: afgeschreven maar niet vertaald.',
      'The protein is encoded from the start codon ATG to a stop codon (TAA, TAG or TGA). Before and after lie the 5\' and 3\' UTR: transcribed but not translated.'),
    ST(8000, cam(1300, 330, 560), 'Het einde: polyadenylatiesignaal', 'The end: polyadenylation signal',
      'In de 3\'-UTR ligt AATAAA. Het RNA wordt ~10–30 nt verder geknipt en krijgt een poly(A)-staart; Pol II loopt nog even door.',
      'The 3\' UTR contains AATAAA. The RNA is cleaved ~10–30 nt further on and receives a poly(A) tail; Pol II keeps going for a while.'),
    ST(9000, cam(800, 560, 1300), 'Van pre-mRNA naar mRNA', 'From pre-mRNA to mRNA',
      'Het primaire transcript bevat exonen én intronen. Na capping, splicing en polyadenylatie blijft een rijp mRNA over: 5\'-cap · 5\'-UTR · CDS · 3\'-UTR · poly(A).',
      'The primary transcript contains exons and introns. After capping, splicing and polyadenylation a mature mRNA remains: 5\' cap · 5\' UTR · CDS · 3\' UTR · poly(A).'),
    ST(7000, FULL, 'Klaar om af te lezen', 'Ready to be read',
      'Zo ziet de eenheid eruit die RNA-polymerase II afleest. Volgende stap: de gen wordt aangezet en getranscribeerd.',
      'This is the unit that RNA polymerase II reads. Next: the gene is switched on and transcribed.'),
  ],
  svg() {
    // exonblokken op het DNA: UTR-deel dunner, CDS-deel dik
    const block = (a, b, y, h, c) => `<rect x="${a}" y="${y - h / 2}" width="${b - a}" height="${h}" rx="5" fill="${c}"/>`;
    const exonSVG = (y, sc = 1, xmap = x => x) => {
      let s = '';
      EX.forEach(([a, b], i) => {
        const A = xmap(a), B = xmap(b);
        const cA = xmap(Math.max(a, ATG)), cB = xmap(Math.min(b, STOP));
        if (a < ATG) s += block(A, Math.min(B, xmap(Math.min(b, ATG))), y, 30 * sc, col.utr);
        if (b > STOP) s += block(Math.max(A, xmap(Math.max(a, STOP))), B, y, 30 * sc, col.utr);
        if (cB > cA) s += block(cA, cB, y, 46 * sc, col.cds);
      });
      return s;
    };
    // --- DNA ---
    let dna = `<line id="gn-dnaL" x1="40" y1="${Y}" x2="${ENH[0]}" y2="${Y}" stroke="${C.dna2}" stroke-width="6"/><line x1="${PROM[0] - 6}" y1="${Y}" x2="1560" y2="${Y}" stroke="${C.dna2}" stroke-width="6"/>`;
    dna += txt(40, Y - 28, "5'", C.text, 18, 'start') + txt(1560, Y - 28, "3'", C.text, 18, 'end');
    // intronen (lijn + GT/AG)
    let intr = '';
    [[EX[0][1], EX[1][0]], [EX[1][1], EX[2][0]]].forEach(([a, b], i) => {
      intr += `<line x1="${a}" y1="${Y}" x2="${b}" y2="${Y}" stroke="${col.intron}" stroke-width="10"/>` + txt((a + b) / 2, Y - 24, `intron ${i + 1}`, col.intron, 21, 'middle', 700);
      intr += `<g id="gn-gtag${i}">` + mono(a + 22, Y + 44, 'GT', BASE.G, 20) + mono(b - 22, Y + 44, 'AG', BASE.A, 20) + mono(b - 62, Y + 44, 'A', '#fff', 16) +
        `<line x1="${b - 62}" y1="${Y + 24}" x2="${b - 62}" y2="${Y + 8}" stroke="#fff" stroke-width="2"/></g>`;
    });
    const exons = exonSVG(Y) + EX.map(([a, b], i) => txt((a + b) / 2 + (i === 0 ? 20 : 0), Y - 38, `exon ${i + 1}`, C.text, 21, 'middle', 700)).join('');
    // --- pre-mRNA ---
    let pre = `<line x1="${TSS}" y1="${YP}" x2="${CUT}" y2="${YP}" stroke="${C.rna}" stroke-width="5"/>`;
    [[EX[0][1], EX[1][0]], [EX[1][1], EX[2][0]]].forEach(([a, b]) => { pre += `<line x1="${a}" y1="${YP}" x2="${b}" y2="${YP}" stroke="${col.intron}" stroke-width="8" opacity=".85"/>`; });
    pre += exonSVG(YP, .7);
    pre += `<circle cx="${TSS - 18}" cy="${YP}" r="18" fill="${C.cap}" stroke="${C.rna}" stroke-width="2"/>` + D(txt(TSS - 18, YP + 5, 'm⁷G', '#3a1a05', 13, 'middle', 800));
    pre += txt(TSS - 46, YP + 6, "5'", C.text, 16, 'end') + txt(CUT + 16, YP + 6, "3'", C.text, 16, 'start');
    pre += txt(TSS + 10, YP - 36, T2('pre-mRNA (primair transcript)', 'pre-mRNA (primary transcript)'), C.rna, 21, 'start', 700);
    // --- rijp mRNA ---
    const mEnd = mpos(CUT);
    let mat = `<line x1="${MX0}" y1="${YM}" x2="${mEnd}" y2="${YM}" stroke="${C.rna}" stroke-width="5"/>` + exonSVG(YM, .7, mpos);
    mat += `<circle cx="${MX0 - 18}" cy="${YM}" r="18" fill="${C.cap}" stroke="${C.rna}" stroke-width="2"/>` + D(txt(MX0 - 18, YM + 5, 'm⁷G', '#3a1a05', 13, 'middle', 800));
    for (let i = 0; i < 9; i++) mat += mono(mEnd + 14 + i * 16, YM + 7, 'A', C.rna, 18);
    mat += txt(MX0 - 48, YM + 6, "5'", C.text, 16, 'end') + txt(mEnd + 164, YM + 6, "3'", C.text, 16, 'start');
    mat += txt(mpos(ATG) + 60, YM - 36, T2('rijp mRNA', 'mature mRNA'), C.rna, 21, 'start', 700);
    // bracketlabels onder het rijpe mRNA
    const br = (a, b, lbl, c) => `<path d="M${a},${YM + 36} v10 H${b} v-10" stroke="${c}" stroke-width="2" fill="none"/>` + D(txt((a + b) / 2, YM + 70, lbl, c, 17));
    mat += br(MX0, mpos(ATG), "5'-UTR", col.utr) + br(mpos(ATG), mpos(STOP), T2('coderende sequentie (CDS)', 'coding sequence (CDS)'), C.dna2) + br(mpos(STOP), mEnd, "3'-UTR", col.utr) + br(mEnd + 6, mEnd + 150, 'poly(A)', C.rna);
    mat += D(mono(mpos(ATG) + 22, YM - 32, 'AUG', BASE.A, 16)) + D(mono(mpos(STOP) - 22, YM - 32, 'UAA', BASE.T, 16));

    return svgOpen() + `
    <g id="gn-dna">
      ${dna}
      <g id="gn-loop"></g>
      <g data-node="genregulatie" data-color="${col.enh}" data-label="${T2('Enhancer → genregulatie', 'Enhancer → gene regulation')}">
        <g id="gn-enh">${`<rect x="${ENH[0]}" y="${Y - 20}" width="${ENH[1] - ENH[0]}" height="40" rx="10" fill="#4a3d1c" stroke="${col.enh}" stroke-width="3"/>`}${txt((ENH[0] + ENH[1]) / 2, Y + 7, 'enhancer', '#fff', 21, 'middle', 700)}
        <circle data-anchor="genregulatie" cx="${(ENH[0] + ENH[1]) / 2}" cy="${Y + 30}" r="1" fill="none" data-pos="below"/></g>
      </g>
      <g data-node="promoter" data-color="${col.prom}" data-label="${T2('Promoter', 'Promoter')}">
        <rect x="${PROM[0]}" y="${Y - 22}" width="${PROM[1] - PROM[0]}" height="44" rx="10" fill="#2e2556" stroke="${col.prom}" stroke-width="3"/>
        <g id="gn-tata">${mono(365, Y + 6, 'TATAAA', '#e2d6ff', 17)}</g>
        <circle data-anchor="promoter" cx="${(PROM[0] + PROM[1]) / 2}" cy="${Y + 84}" r="1" fill="none" data-pos="below"/>
      </g>
      <g id="gn-promlab">${txt(365, Y + 48, T2('TATA-box ≈ −30', 'TATA box ≈ −30'), '#c9b8ff', 17)}${txt(365, Y + 74, T2('(of CpG-eiland)', '(or CpG island)'), C.muted, 17)}</g>
      <g data-node="splicing" data-color="${col.intron}" data-label="${T2('Intronen → splicing', 'Introns → splicing')}">${intr}<circle data-anchor="splicing" cx="${(EX[0][1] + EX[1][0]) / 2}" cy="${Y - 60}" r="1" fill="none"/></g>
      ${exons}
      <g id="gn-codons">
        ${mono(ATG + 22, Y + 44, 'ATG', BASE.A, 20)}${txt(ATG + 22, Y + 68, 'start', BASE.A, 15)}
        ${mono(STOP - 22, Y + 44, 'TAA', BASE.T, 20)}${txt(STOP - 22, Y + 68, 'stop', BASE.T, 15)}
        ${txt((TSS + ATG) / 2, Y + 44, "5'-UTR", col.utr, 16)}${txt((STOP + CUT) / 2 + 12, Y + 70, "3'-UTR", col.utr, 16)}
      </g>
      <g data-node="polya" data-color="${C.rna}" data-label="${T2('Poly(A)-signaal', 'Poly(A) signal')}">
        <g id="gn-pas">${mono(PAS - 16, Y + 44, 'AATAAA', C.rna, 17)}
        <path d="M${CUT + 8},${Y - 30} l0,60" stroke="${C.danger}" stroke-width="3" stroke-dasharray="5 4"/>${txt(CUT + 14, Y + 70, T2('knipplaats', 'cleavage site'), C.danger, 16, 'start')}</g>
        <circle data-anchor="polya" cx="${PAS}" cy="${Y + 84}" r="1" fill="none" data-pos="below"/>
      </g>
      <g id="gn-tss">
        <path d="M${TSS},${Y - 24} v-40 h60" stroke="#fff" stroke-width="4" fill="none" marker-end="url(#arrow)"/>${D(txt(TSS, Y - 72, 'TSS (+1)', '#fff', 17))}
      </g>
    </g>
    <g data-node="transcriptie" data-color="${C.rna}" data-label="${T2('Transcriptie →', 'Transcription →')}" id="gn-pre">${pre}<circle data-anchor="transcriptie" cx="${CUT - 60}" cy="${YP + 30}" r="1" fill="none" data-pos="below"/></g>
    <g id="gn-arrow"><path d="M800,${YP + 40} L800,${YM - 60}" stroke="${C.muted}" stroke-width="3" marker-end="url(#arrow)"/>${D(txt(815, (YP + YM) / 2 - 6, T2('capping · splicing · polyadenylatie', 'capping · splicing · polyadenylation'), C.muted, 18, 'start'))}</g>
    <g id="gn-mat">${mat}</g>
    <g id="gn-dnalab">${txt(800, 190, T2("DNA (coderende streng 5'→3')", "DNA (coding strand 5'→3')"), C.dna2, 21)}</g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        // enhancer-lus in stap 1 (en blijft daarna subtiel)
        const k = step === 1 ? ease(sub(p, .15, .7)) : step > 1 ? 1 : 0;
        const dx = 60 * k, eR = ENH[1] + dx, h = 200 * k;
        $('gn-enh').setAttribute('transform', `translate(${f1(dx)} 0)`);
        $('gn-dnaL').setAttribute('x2', f1(ENH[0] + dx));
        const lp = `M${f1(eR)},${Y} C${f1(eR - 70 * k)},${f1(Y - h * 1.25)} ${f1(PROM[0] + 60 * k)},${f1(Y - h * 1.25)} ${PROM[0] - 6},${Y}`;
        let g = `<path d="${lp}" stroke="${C.dna2}" stroke-width="6" fill="none"/>`;
        if (k > .05 && step >= 1 && step <= 3) g += txt((eR + PROM[0]) / 2, Y - h * .95, T2('… 10–1000 kb …', '… 10–1,000 kb …'), C.muted, 16);
        if (k < .05) g += `<g stroke="${C.muted}" stroke-width="3"><line x1="246" y1="${Y - 14}" x2="238" y2="${Y + 14}"/><line x1="258" y1="${Y - 14}" x2="250" y2="${Y + 14}"/></g>`;
        if (k > .05) {
          g += `<ellipse cx="${f1((eR + PROM[0]) / 2)}" cy="${Y - 34}" rx="${f1(10 + (PROM[0] - eR) / 2 + 8)}" ry="11" fill="none" stroke="#ffc247" stroke-width="5" opacity="${f1(k)}"/>`;
          if (step === 1) g += txt((eR + PROM[0]) / 2 - 40, Y - 62, T2('cohesine', 'cohesin'), '#ffc247', 15, 'end');
          const mo = step === 1 ? sub(p, .55, .8) : 0;
          if (mo > .01) g += `<g opacity="${f1(mo)}"><ellipse cx="${f1((eR + PROM[0]) / 2 + 30)}" cy="${Y + 96}" rx="70" ry="24" fill="rgba(155,123,255,.55)" stroke="${C.prot}" stroke-width="2"/><path d="M${f1((eR + PROM[0]) / 2 + 30)},${Y + 72} L${f1((eR + PROM[0]) / 2 + 20)},${Y + 22}" stroke="${C.prot}" stroke-width="3"/>${txt((eR + PROM[0]) / 2 + 30, Y + 102, 'Mediator', '#fff', 17, 'middle', 700)}</g>`;
        }
        $('gn-loop').innerHTML = g;
        // markeringen per stap
        const hl = (id, on) => $(id)?.setAttribute('opacity', on ? 1 : .35);
        const ov = step === 0 || step === 7;                    // overzichtsbeelden: alleen hoofdlabels
        // detailgroepen: alleen zichtbaar in hun eigen stap; vloeiende overgang vanaf het eindbeeld van de vorige stap
        const LV = { 'gn-gtag0': [3], 'gn-gtag1': [3], 'gn-codons': [4], 'gn-pas': [5], 'gn-promlab': [2], 'gn-tata': [2] };
        const fin = ease(sub(p, 0, .3));
        for (const [id, on] of Object.entries(LV)) {
          const lv = k => k < 0 ? 0 : on.includes(k) ? 1 : 0;
          $(id).setAttribute('opacity', f1(lerp(lv(step - 1), lv(step), fin)));
        }
        const detOp = f1(step === 0 ? 0 : step === 7 ? 1 - ease(sub(p, 0, .3)) : 1);
        svg.querySelectorAll('.gn-det').forEach(el => el.setAttribute('opacity', detOp));
        $('gn-dna').setAttribute('opacity', f1(step === 6 ? 1 - .8 * ease(sub(p, 0, .3)) : step === 7 ? .2 + .8 * ease(sub(p, 0, .3)) : 1));
        $('gn-pre').setAttribute('opacity', step === 6 ? 1 : step === 0 || step === 7 ? .9 : .15);
        const m = step === 6 ? ease(sub(p, .35, .8)) : step === 0 || step === 7 ? .9 : .15;
        $('gn-mat').setAttribute('opacity', f1(m));
        $('gn-arrow').setAttribute('opacity', step === 6 ? f1(sub(p, .2, .4)) : step === 0 || step === 7 ? .8 : .15);
      },
    };
  },
};
