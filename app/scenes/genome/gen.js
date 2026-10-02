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
    ST(8000, FULL, 'Wat is een gen?', 'What is a gene?',
      'Een gen is een stuk DNA dat naar RNA wordt gekopieerd, plus de stukken die dat regelen.',
      'A gene is a stretch of DNA that is copied into RNA, plus the parts that control this.'),
    ST(8500, cam(290, 250, 720), 'Een schakelaar op afstand', 'A switch at a distance',
      'Een schakelaar (enhancer) kan ver van het gen liggen. Een lus in het DNA brengt hem bij het begin van het gen.',
      'A switch (enhancer) can lie far from the gene. A loop in the DNA brings it to the start of the gene.'),
    ST(8000, cam(320, 350, 660), 'Hier begint het gen', 'This is where the gene starts',
      'Aan het begin (de promoter) gaat het enzym dat RNA maakt klaarstaan. Het RNA begint op positie +1.',
      'At the start (the promoter) the enzyme that makes RNA gets ready. The RNA begins at position +1.'),
    ST(8500, cam(712, 330, 832), 'Stukken die blijven en gaan', 'Parts that stay and go',
      'Exonen blijven in het mRNA; de stukken ertussen (intronen) worden er later uitgeknipt.',
      'Exons stay in the mRNA; the pieces in between (introns) are cut out later.'),
    ST(8500, cam(850, 330, 1150), 'Waar het eiwit in staat', 'Where the protein is written',
      'De eiwitcode loopt van het startsein ATG tot een stopsein. De stukken ervoor en erna worden geen eiwit.',
      'The protein code runs from the start signal ATG to a stop signal. The parts before and after do not become protein.'),
    ST(8000, cam(1270, 330, 600), 'Het einde van het gen', 'The end of the gene',
      'Het signaal AATAAA geeft het einde aan. Iets verder wordt het RNA geknipt en krijgt het een staart van A’s.',
      'The signal AATAAA marks the end. A little further on, the RNA is cut and gets a tail of A’s.'),
    ST(9000, cam(800, 564, 1300), 'Van ruw RNA naar mRNA', 'From raw RNA to mRNA',
      'Het eerste RNA wordt afgewerkt: het krijgt een kapje en een A-staart, en de intronen worden eruit geknipt.',
      'The first RNA is finished off: it gets a cap and an A tail, and the introns are cut out.'),
    ST(7000, FULL, 'Klaar om af te lezen', 'Ready to be read',
      'Dit geheel leest het enzym dat RNA maakt. Hierna: het gen wordt aangezet en afgelezen.',
      'This whole unit is read by the enzyme that makes RNA. Next: the gene is switched on and read.'),
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
    <g id="gn-arrow" data-node="rnaprocessing" data-color="${C.muted}" data-nolabel><path d="M800,${YP + 40} L800,${YM - 60}" stroke="${C.muted}" stroke-width="3" marker-end="url(#arrow)"/>${D(txt(815, (YP + YM) / 2 - 6, T2('capping · splicing · polyadenylatie', 'capping · splicing · polyadenylation'), C.muted, 18, 'start'))}</g>
    <g id="gn-mat" data-node="translatie" data-color="${C.rna}" data-nolabel>${mat}</g>
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
        if (k > .05 && step >= 1 && step <= 2) g += txt((eR + PROM[0]) / 2, Y - h * .95, T2('… 10–1000 kb …', '… 10–1,000 kb …'), C.muted, 16);
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
        $('gn-dna').setAttribute('opacity', f1(step === 6 ? 1 - .8 * ease(sub(p, 0, .05)) : step === 7 ? .2 + .8 * ease(sub(p, 0, .3)) : 1));
        $('gn-pre').setAttribute('opacity', step === 6 ? 1 : step === 0 || step === 7 ? .9 : .15);
        const m = step === 6 ? ease(sub(p, .35, .8)) : step === 0 || step === 7 ? .9 : .15;
        $('gn-mat').setAttribute('opacity', f1(m));
        $('gn-arrow').setAttribute('opacity', step === 6 ? f1(sub(p, .2, .4)) : step === 0 || step === 7 ? .8 : .15);
      },
    };
  },
};
