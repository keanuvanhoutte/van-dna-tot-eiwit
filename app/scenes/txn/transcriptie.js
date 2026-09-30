import { C, BASE, COMP, RNA_COMP, L, T2, svgOpen, pill, txt, mono, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';

/* coderende streng 5'→3' (links → rechts); promoter met TATA-box aan het begin */
const GENE = 'GCTATAAAAGGCCTGACGATGGCTTTCAAGGATTGGCACGGACTGACCGAAAGCTAAGGTCACGTTAGCCATGGACTTCGAAGCTGCATGCCTAGTCAGGATCCATGA';
const CY = 470, A = 26, BP = 22, K = 2 * Math.PI / (BP * 10.5), X0 = 40, START = 320, PW = 120;

/* positie van Pol II aan het begin van elke stap (stap i loopt van POL[i] naar POL[i+1]) */
const POL = [START, START, START, START, 400, 700, 760, 860, 1050, 1250];

export default {
  id: 'transcriptie',
  title: { nl: 'Transcriptie', en: 'Transcription' },
  scale: '≈ 25 nm', time: { nl: '≈ 30 nt/s ≈ 2–3 kb/min (hier sterk vertraagd)', en: '≈ 30 nt/s ≈ 2–3 kb/min (strongly slowed down here)' },
  org: { nl: 'mens (RNA-polymerase II)', en: 'human (RNA polymerase II)' },
  legend: [[C.dna, { nl: 'coderende streng', en: 'coding strand' }], [C.dna2, { nl: 'matrijsstreng', en: 'template strand' }], [C.rna, 'pre-mRNA'], [C.prot, { nl: 'Pol II & factoren', en: 'Pol II & factors' }], [BASE.A, 'A'], [BASE.T, 'T / U'], [BASE.G, 'G'], [BASE.C, 'C']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Kijk naar de kleuren: de RNA-basen in de RNA–DNA-hybride zijn complementair aan de matrijsstreng en dus gelijk aan de coderende streng (U in plaats van T).</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Look at the colours: the RNA bases in the RNA–DNA hybrid are complementary to the template strand and therefore identical to the coding strand (U instead of T).</p>' },
  simplified: {
    nl: 'De dubbelhelix is als platte golf getekend (~10,5 bp per winding klopt). Bel (~13 bp) en RNA–DNA-hybride (~8 bp) zijn op schaal; de vormen van Pol II en de factoren zijn schematisch (echte structuren: PDB 5FLM, 1I6H). Mediator, activatoren en nucleosomen zijn weggelaten. Pol II is hier ~100× trager dan in de cel.',
    en: 'The double helix is drawn as a flat wave (~10.5 bp per turn is correct). The bubble (~13 bp) and RNA–DNA hybrid (~8 bp) are to scale; Pol II and the factors are schematic (real structures: PDB 5FLM, 1I6H). Mediator, activators and nucleosomes are omitted. Pol II moves ~100× slower here than in the cell.' },
  steps: [
    { dur: 7000, cam: cam(300, 470, 760), title: { nl: 'De promoter: TATA-box', en: 'The promoter: TATA box' },
      text: { nl: 'Vóór het gen ligt de kernpromoter. TFIID bindt met zijn TATA-bindend eiwit (TBP) aan de TATA-box.', en: 'Upstream of the gene lies the core promoter. TFIID binds the TATA box via its TATA-binding protein (TBP).' } },
    { dur: 8000, cam: cam(330, 460, 820), title: { nl: 'Het preinitiatiecomplex', en: 'The pre-initiation complex' },
      text: { nl: 'TFIIA en TFIIB binden, dan Pol II met TFIIF, en ten slotte TFIIE en TFIIH: het preinitiatiecomplex (PIC).', en: 'TFIIA and TFIIB bind, then Pol II with TFIIF, and finally TFIIE and TFIIH: the pre-initiation complex (PIC).' } },
    { dur: 7000, cam: cam(390, 450, 700), title: { nl: 'DNA opent · start', en: 'DNA opens · start' },
      text: { nl: 'TFIIH ontwindt het DNA (transcriptiebel) en fosforyleert Ser5 van de CTD. De eerste nucleotiden worden gekoppeld.', en: 'TFIIH unwinds the DNA (transcription bubble) and phosphorylates Ser5 of the CTD. The first nucleotides are joined.' } },
    { dur: 6000, cam: cam(470, 460, 860), title: { nl: 'Promoter escape', en: 'Promoter escape' },
      text: { nl: 'Pol II laat de promoter en de meeste algemene factoren achter; TFIID kan blijven voor een volgende ronde.', en: 'Pol II leaves the promoter and most general factors behind; TFIID can stay for another round.' } },
    { dur: 10000, cam: cam(600, 440, 900), title: { nl: 'Elongatie', en: 'Elongation' },
      text: { nl: 'Pol II leest de matrijsstreng 3\'→5\' en bouwt RNA 5\'→3\'. Achter het enzym sluit de dubbelhelix weer.', en: 'Pol II reads the template strand 3\'→5\' and builds RNA 5\'→3\'. Behind the enzyme the double helix closes again.' } },
    { dur: 8000, cam: cam(800, 440, 520), title: { nl: 'Close-up: de RNA–DNA-hybride', en: 'Close-up: the RNA–DNA hybrid' },
      text: { nl: 'Alleen ~8 basen van het nieuwe RNA blijven gepaard met de matrijs; elke nieuwe base is complementair (A–U, G–C).', en: 'Only ~8 bases of the new RNA stay paired with the template; each new base is complementary (A–U, G–C).' } },
    { dur: 8000, cam: cam(640, 330, 960), title: { nl: '5\'-cap', en: '5\' cap' },
      text: { nl: 'Zodra ~20–30 nt uit het enzym steekt, zet het cappingenzym een m⁷G-cap op het 5\'-uiteinde.', en: 'Once ~20–30 nt emerge from the enzyme, the capping enzyme adds an m⁷G cap to the 5\' end.' } },
    { dur: 8000, cam: cam(960, 520, 1200), title: { nl: 'Supercoiling en Ser2-fosforylatie', en: 'Supercoiling and Ser2 phosphorylation' },
      text: { nl: 'Vóór Pol II ontstaan positieve, erachter negatieve supercoils (topo-isomerasen lossen ze op). De CTD krijgt nu ook Ser2-P.', en: 'Positive supercoils form ahead of Pol II and negative ones behind it (topoisomerases relax them). The CTD now also gains Ser2-P.' } },
    { dur: 8000, cam: cam(930, 440, 1300), title: { nl: 'Naar het einde van het gen', en: 'On to the end of the gene' },
      text: { nl: 'Pol II transcribeert tot voorbij het polyadenylatiesignaal. Het pre-mRNA wordt ondertussen al bewerkt → volgende hoofdstuk.', en: 'Pol II transcribes past the polyadenylation signal. Meanwhile the pre-mRNA is already being processed → next chapter.' } },
  ],
  svg() {
    return svgOpen() + `
    <g id="tx-super"></g>
    <g data-node="dnahelix" data-label="${T2('DNA-dubbelhelix', 'DNA double helix')}" data-color="${C.dna}">
      <rect x="0" y="400" width="1600" height="140" fill="transparent"/>
      <circle data-anchor="dnahelix" cx="1420" cy="425" r="1" fill="none"/>
      <g id="tx-rungs"></g>
      <path id="tx-s1" stroke="${C.dna}" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path id="tx-s2" stroke="${C.dna2}" stroke-width="7" fill="none" stroke-linecap="round"/>
    </g>
    <g data-node="promoter" data-color="${C.prot}" data-label="${T2('Promoter (TATA-box)', 'Promoter (TATA box)')}">
      <rect x="112" y="432" width="150" height="76" rx="10" fill="rgba(155,123,255,.10)" stroke="${C.prot}" stroke-dasharray="5 4"/>
      <circle data-anchor="promoter" cx="187" cy="600" r="1" fill="none"/>
    </g>
    <text id="tx-tata" x="187" y="592" text-anchor="middle" font-family="JetBrains Mono" font-size="18" fill="#c9b8ff">TATAAAA</text>
    <g id="tx-gtf"></g>
    <g data-node="rnaprocessing" data-color="${C.rna}" data-label="${T2('pre-mRNA → processing', 'pre-mRNA → processing')}">
      <path id="tx-rna-hit" stroke="transparent" stroke-width="26" fill="none"/>
      <g id="tx-rna-bases"></g>
      <path id="tx-rna" stroke="${C.rna}" stroke-width="6" fill="none" stroke-linecap="round"/>
    </g>
    <g data-node="capping" data-color="${C.rna}" data-label="${T2("5'-cap (m⁷G)", "5' cap (m⁷G)")}"><g id="tx-cap"></g></g>
    <g id="tx-capenz"></g>
    <g data-node="rnapol" data-color="${C.prot}" data-label="${T2('RNA-polymerase II', 'RNA polymerase II')}">
      <g id="tx-pol">
        <path d="M-150,-40 C-150,-120 -60,-150 20,-140 C110,-130 160,-80 150,-10 C145,60 110,110 20,115 C-70,120 -150,80 -150,-40Z" fill="rgba(155,123,255,.20)" stroke="${C.prot}" stroke-width="3"/>
        <path d="M-60,112 q10,30 -5,50 q-15,20 0,40 q15,20 0,40" stroke="${C.prot}" stroke-width="3" fill="none" opacity=".7"/>
        ${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="${-62 + (i % 2 ? 6 : -6)}" cy="${128 + i * 14}" r="4" fill="${C.prot}"/>`).join('')}
        <g id="tx-ctdp"></g>
        <text id="tx-ctdlab" x="-20" y="240" fill="${C.muted}" font-size="18" font-family="Inter">CTD (YSPTSPS)×52</text>
        <circle cx="96" cy="0" r="7" fill="#fff" opacity=".85" filter="url(#glow)"/>
      </g>
    </g>
    <g data-node="supercoiling" data-color="${C.dna2}" data-label="${T2('Supercoiling', 'Supercoiling')}" id="tx-sc"></g>
    <g font-family="JetBrains Mono, monospace" font-size="16" fill="${C.text}">
      <text x="44" y="408">5'</text><text x="1545" y="408">3'</text><text x="44" y="560">3'</text><text x="1545" y="560">5'</text>
    </g>
    <g id="tx-strandlab" font-family="Inter" font-size="18">
      <text x="300" y="392" fill="${C.dna}">${T2("coderende streng (niet-matrijs) 5'→3'", "coding (non-template) strand 5'→3'")}</text>
      <text x="300" y="566" fill="${C.dna2}">${T2("matrijsstreng (template) 3'→5' — wordt gelezen", "template strand 3'→5' — is read")}</text>
    </g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const n = Math.floor((1560 - X0) / BP);
    const seq = Array.from({ length: n }, (_, i) => GENE[i % GENE.length]);
    let open = 0, polX = START;
    const sep = x => { const d = Math.abs(x - polX); return open * (d < PW ? 1 : d < PW + 60 ? 1 - (d - PW) / 60 : 0); };
    const s1y = x => CY - A * Math.sin(K * x) * (1 - sep(x)) - 78 * sep(x) ** 1.5;
    const s2y = x => CY + A * Math.sin(K * x + 2.3) * (1 - sep(x)) + 60 * sep(x) ** 1.5;
    const pth = f => { let d = ''; for (let x = X0; x <= 1560; x += 6) d += `${x === X0 ? 'M' : 'L'}${x},${f(x).toFixed(1)}`; return d; };
    return {
      update(t, s) {
        const { step, p } = s;
        polX = lerp(POL[step], POL[step + 1], step >= 3 ? p : 0);
        open = step < 2 ? 0 : step === 2 ? ease(sub(p, 0, .5)) : 1;
        const polOp = step === 0 ? 0 : step === 1 ? ease(sub(p, .35, .6)) : 1;
        $('tx-s1').setAttribute('d', pth(s1y));
        $('tx-s2').setAttribute('d', pth(s2y));
        const active = polX + 96;
        let rungs = '';
        for (let i = 0; i < n; i++) {
          const x = X0 + 10 + i * BP, sp = sep(x), b = seq[i], m = COMP[b];
          if (sp < .05) {
            const y1 = s1y(x), y2 = s2y(x), ym = (y1 + y2) / 2;
            rungs += `<line x1="${x}" y1="${f1(y1)}" x2="${x}" y2="${f1(ym)}" stroke="${BASE[b]}" stroke-width="5"/><line x1="${x}" y1="${f1(ym)}" x2="${x}" y2="${f1(y2)}" stroke="${BASE[m]}" stroke-width="5"/>`;
          } else {
            rungs += `<line x1="${x}" y1="${f1(s1y(x))}" x2="${x}" y2="${f1(s1y(x) + 16)}" stroke="${BASE[b]}" stroke-width="5" opacity="${f1(sp)}"/>`;
            rungs += `<line x1="${x}" y1="${f1(s2y(x))}" x2="${x}" y2="${f1(s2y(x) - 16)}" stroke="${BASE[m]}" stroke-width="5" opacity="${f1(sp)}"/>`;
            if (step === 5) rungs += txt(x, s2y(x) + 20, m, BASE[m], 13, 'middle', 700, 'JetBrains Mono');
          }
        }
        $('tx-rungs').innerHTML = rungs;

        // RNA: eerste nucleotiden in stap 2, daarna groeit het mee met Pol II
        const init = step < 2 ? 0 : step === 2 ? 60 * sub(p, .5, 1) : 60;
        const rnaLen = init + (polX - START);
        const hyb = Math.min(rnaLen, 8 * BP), yH = s2y(polX) - 30;
        const pts = [];
        for (let sd = 0; sd <= rnaLen; sd += 4) {
          let x, y;
          if (sd <= 8 * BP) { x = active - sd; y = yH; }
          else if (sd <= 8 * BP + 160) { const u = (sd - 8 * BP) / 160; x = active - 8 * BP - u * 110; y = yH - u * u * 140 - u * 60; }
          else { const u = sd - 8 * BP - 160; x = active - 8 * BP - 110 - u * .82; y = yH - 200 - 34 * Math.sin(u / 55) - u * .12; }
          pts.push([x, y]);
        }
        const d = pts.length > 1 ? pts.map((q, i) => `${i ? 'L' : 'M'}${q[0].toFixed(1)},${q[1].toFixed(1)}`).join('') : '';
        $('tx-rna').setAttribute('d', d); $('tx-rna-hit').setAttribute('d', d);
        let rb = '';
        for (let i = 0; i < n; i++) {
          const x = X0 + 10 + i * BP;
          if (x <= active && x >= active - hyb && rnaLen > 0) {
            const rbase = RNA_COMP[COMP[seq[i]]];
            rb += `<line x1="${x}" y1="${f1(yH)}" x2="${x}" y2="${f1(yH + 14)}" stroke="${BASE[rbase]}" stroke-width="5"/>`;
            if (step === 5) rb += txt(x, yH - 8, rbase, BASE[rbase], 13, 'middle', 700, 'JetBrains Mono');
          }
        }
        $('tx-rna-bases').innerHTML = rb;

        // cap: verschijnt bij ~25 nt (550 px)
        const end = pts[pts.length - 1] ?? [active, yH];
        const capOn = rnaLen > 25 * BP;
        const capK = capOn ? clamp((rnaLen - 25 * BP) / 60) : 0;
        $('tx-cap').innerHTML = capK > 0 ? `<g transform="translate(${f1(end[0] - 8)} ${f1(end[1])})" opacity="${f1(capK)}"><circle r="19" fill="${C.cap}" stroke="${C.rna}" stroke-width="2"/><text y="5" font-size="14" text-anchor="middle" fill="#3a1a05" font-family="Inter" font-weight="700">m⁷G</text></g>` : '';
        const enzK = rnaLen > 19 * BP ? clamp(1 - Math.max(0, rnaLen - 26 * BP) / 120) : 0;
        $('tx-capenz').innerHTML = pill(end[0] - 130, end[1] + 4, 170, 30, T2('cappingenzym', 'capping enzyme'), C.prot2, enzK, 16);

        // Pol II + CTD-fosforylatie
        const pol = $('tx-pol');
        pol.setAttribute('transform', `translate(${f1(polX)} ${CY})`); pol.setAttribute('opacity', f1(polOp));
        const s5 = step >= 2 ? (step === 2 ? sub(p, .3, .6) : 1) : 0, s2 = step >= 7 ? (step === 7 ? sub(p, .4, .8) : 1) : 0;
        $('tx-ctdp').innerHTML = [0, 2, 4].map(i => pill(-34, 128 + i * 14, 46, 19, 'S5P', '#ffc247', s5, 14)).join('') + [1, 3, 5].map(i => pill(-90, 128 + i * 14, 46, 19, 'S2P', '#5ad17a', s2, 14)).join('');
        $('tx-tata').setAttribute('opacity', step <= 3 ? 1 : 0);
        $('tx-ctdp').setAttribute('opacity', step === 8 ? f1(1 - sub(p, 0, .3)) : 1);
        $('tx-ctdlab').setAttribute('opacity', step === 2 || step === 7 ? 1 : 0);
        $('tx-strandlab').setAttribute('opacity', step === 0 || step === 4 || step === 8 ? 1 : 0);

        // algemene transcriptiefactoren
        const g = [];
        const tbp = step === 0 ? ease(sub(p, .25, .6)) : 1;
        g.push(pill(187, 425, 118, 30, 'TFIID/TBP', '#8e6cf0', tbp, 15));
        const inS1 = (a, b) => step === 1 ? ease(sub(p, a, b)) : step > 1 && step < 3 ? 1 : step === 3 ? 1 - sub(p, .2, .7) : 0;
        g.push(pill(120, 520, 64, 24, 'TFIIA', '#6f5bd6', inS1(.05, .25)));
        g.push(pill(260, 522, 64, 24, 'TFIIB', '#6f5bd6', inS1(.15, .35)));
        g.push(pill(START + 185, 392, 64, 24, 'TFIIF', '#5a4bb8', inS1(.35, .6)));
        g.push(pill(START - 175, 350, 64, 24, 'TFIIE', '#5a4bb8', inS1(.6, .8)));
        g.push(pill(START + 190, 336, 74, 26, 'TFIIH', '#8e6cf0', inS1(.75, .95)));
        $('tx-gtf').innerHTML = g.join('');

        // supercoils
        const sc = step >= 4 ? 1 : 0;
        $('tx-sc').innerHTML = sc ? `
          <g transform="translate(${f1(polX + 230)} 640)"><circle r="17" fill="none" stroke="${C.dna2}" stroke-width="2"/><text y="6" text-anchor="middle" fill="${C.dna2}" font-size="18" font-family="Inter">+</text></g>
          <g transform="translate(${f1(polX - 230)} 640)"><circle r="17" fill="none" stroke="${C.dna2}" stroke-width="2"/><text y="6" text-anchor="middle" fill="${C.dna2}" font-size="20" font-family="Inter">−</text></g>
          ${txt(polX + 230, 684, T2('positieve supercoils', 'positive supercoils'), C.muted, 18)}${txt(polX - 230, 684, T2('negatieve supercoils', 'negative supercoils'), C.muted, 18)}` : '';
      },
    };
  },
};
