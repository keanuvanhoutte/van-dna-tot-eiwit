import { C, BASE, RNA_PAIR, L, T2, svgOpen, pill, txt, cam, FULL, sub, ease, lerp, clamp, f1, translate, THREE, AACLASS, CLASSCOL } from '../../kit.js';

/* mRNA 5'→3': 5'-UTR zonder AUG · Kozak GCCACC·AUG·G · 12 codons + stop UAA · 3'-UTR · poly(A) (verkort) */
const UTR5 = 'GGAUCCAGCUUCGAAUUCGCCACC', CDS = 'AUGGCUUUCAAGGAUUGGCACGGACUGACCGAAAGCUAA', UTR3 = 'GCGGCCUCUAGC', POLYA = 'A'.repeat(18);
const MRNA = UTR5 + CDS + UTR3 + POLYA;
const S0 = UTR5.length;                               // index van de A van het start-AUG
const CODONS = []; for (let i = S0; i + 3 <= UTR5.length + CDS.length; i += 3) CODONS.push(MRNA.slice(i, i + 3));
const STOP = CODONS.findIndex(c => translate(c) === '*');   // = 12
const AAS = CODONS.slice(0, STOP).map(translate);           // M A F K D W H G L T E S

const NT = 40, COD = 120, YM = 600, PC = 800;               // nucleotidebreedte, codonbreedte, hoogte mRNA, midden P-plaats
const SITE = { E: PC - COD, P: PC, A: PC + COD };
const SCAN0 = (S0 + 1) * NT - 240;                          // bij binding aan de cap ligt het AUG zoveel px verder
const TUNNEL = [830, 175];

const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'translatie',
  title: { nl: 'Translatie', en: 'Translation' }, scale: '≈ 25 nm',
  time: { nl: '≈ 5–6 aminozuren/s (hier sterk vertraagd)', en: '≈ 5–6 amino acids/s (strongly slowed down here)' },
  org: { nl: 'eukaryoot (80S-ribosoom)', en: 'eukaryote (80S ribosome)' },
  legend: [[C.rna, 'mRNA'], [C.trna, 'tRNA'], [C.rrna, { nl: 'ribosoom', en: 'ribosome' }], [C.prot, { nl: 'factoren (eIF, eEF, eRF)', en: 'factors (eIF, eEF, eRF)' }], [CLASSCOL.h, { nl: 'hydrofoob', en: 'hydrophobic' }], [CLASSCOL.p, { nl: 'polair', en: 'polar' }], [CLASSCOL['+'], { nl: 'positief geladen', en: 'positively charged' }], [CLASSCOL['-'], { nl: 'negatief geladen', en: 'negatively charged' }], [CLASSCOL.s, 'Gly / Pro']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Opgebouwd zoals het translatiefilmpje uit de les. De aminozuren worden niet getekend maar berekend uit de genetische code; anticodons zijn complementair en antiparallel (3\'→5\' gelezen). A–U-paren tonen 2, G–C-paren 3 waterstofbruggen.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Built like the translation movie from the course. The amino acids are not drawn by hand but computed from the genetic code; anticodons are complementary and antiparallel (read 3\'→5\'). A–U pairs show 2, G–C pairs 3 hydrogen bonds.</p>' },
  simplified: {
    nl: 'Het ribosoom is een 2D-schets (echte structuur: PDB 4UG0, humaan 80S); tRNA\'s zijn vereenvoudigde L-vormen. Het mRNA schuift hier langs een vast ribosoom (in werkelijkheid beweegt het ribosoom). Hybride toestanden, GTP-hydrolyse en de gesloten lus (eIF4G–PABP) zijn weggelaten; de poly(A)-staart is ingekort. Aminozuurkleuren volgen de cursusindeling; His staat bij positief (pH-afhankelijk).',
    en: 'The ribosome is a 2D sketch (real structure: PDB 4UG0, human 80S); tRNAs are simplified L shapes. Here the mRNA slides past a fixed ribosome (in reality the ribosome moves). Hybrid states, GTP hydrolysis and the closed loop (eIF4G–PABP) are omitted; the poly(A) tail is shortened. Amino-acid colours follow the course grouping; His is shown as positive (pH-dependent).' },
  steps: [
    ST(8000, cam(2350, 600, 4000), 'Het mRNA', 'The mRNA', "5'-cap, 5'-UTR, het coderende deel (start AUG … stop UAA), 3'-UTR en poly(A)-staart (hier ingekort; echt ~200–250 nt).", "5' cap, 5' UTR, the coding region (start AUG … stop UAA), 3' UTR and poly(A) tail (shortened here; really ~200–250 nt)."),
    ST(8000, cam(520, 560, 1150), '43S bindt de cap', '43S binds the cap', "eIF4F herkent de cap; het 43S-complex (40S + eIF2·GTP·Met-tRNAi + eIF1, 1A, 3, 5) bindt het 5'-uiteinde.", "eIF4F recognises the cap; the 43S complex (40S + eIF2·GTP·Met-tRNAi + eIF1, 1A, 3, 5) binds the 5' end."),
    ST(9000, cam(800, 580, 1350), 'Het 48S-complex scant', 'The 48S complex scans', "Met het mRNA erop heet het 48S. Het scant 5'→3' door de 5'-UTR op zoek naar het eerste AUG.", "Bound to the mRNA it is called 48S. It scans 5'→3' through the 5' UTR looking for the first AUG."),
    ST(8000, cam(800, 610, 640), 'Startcodon herkend', 'Start codon recognised', 'Het anticodon CAU van Met-tRNAi paart met AUG (Kozak-context GCCACC AUG G). eIF2 hydrolyseert GTP, eIF1 laat los.', 'The anticodon CAU of Met-tRNAi pairs with AUG (Kozak context GCCACC AUG G). eIF2 hydrolyses GTP, eIF1 is released.'),
    ST(8000, cam(800, 470, 1350), '60S bindt → 80S', '60S joins → 80S', 'Met hulp van eIF5B·GTP koppelt de grote subeenheid. Het 80S-ribosoom heeft een A-, P- en E-plaats; Met-tRNAi zit in P.', 'Helped by eIF5B·GTP the large subunit joins. The 80S ribosome has an A, P and E site; Met-tRNAi sits in P.'),
    ST(8500, cam(930, 440, 1250), 'Aminoacyl-tRNA komt aan', 'Aminoacyl-tRNA arrives', 'eEF1A·GTP brengt een geladen tRNA naar de A-plaats. Elk tRNA werd vooraf door zijn aminoacyl-tRNA-synthetase geladen.', 'eEF1A·GTP delivers a charged tRNA to the A site. Each tRNA was loaded beforehand by its aminoacyl-tRNA synthetase.'),
    ST(8500, cam(920, 600, 560), 'Decodering: codon ↔ anticodon', 'Decoding: codon ↔ anticodon', "Alleen een passend anticodon paart met het codon (antiparallel). Dan hydrolyseert eEF1A GTP en laat los.", 'Only a matching anticodon pairs with the codon (antiparallel). Then eEF1A hydrolyses GTP and leaves.'),
    ST(8500, cam(870, 300, 640), 'Peptidebinding', 'Peptide bond', 'In het peptidyltransferasecentrum (rRNA = ribozym) wordt de keten overgedragen op het aminozuur in de A-plaats.', 'In the peptidyl transferase centre (rRNA = ribozyme) the chain is transferred onto the amino acid in the A site.'),
    ST(8500, cam(800, 470, 1350), 'Translocatie', 'Translocation', 'eEF2·GTP schuift het ribosoom één codon verder: A → P, P → E. Het mRNA beweegt 3 nucleotiden.', 'eEF2·GTP moves the ribosome one codon on: A → P, P → E. The mRNA moves 3 nucleotides.'),
    ST(6500, cam(760, 420, 1450), 'E-plaats: tRNA vertrekt', 'E site: tRNA leaves', 'Het lege tRNA verlaat de E-plaats en kan opnieuw geladen worden. De A-plaats is vrij voor het volgende codon.', 'The empty tRNA leaves the E site and can be recharged. The A site is free for the next codon.'),
    ST(9000, cam(800, 450, 1450), 'Tweede ronde: zelfde cyclus', 'Second round: same cycle', 'Aankomst → decodering → peptidebinding → translocatie → vertrek. De keten groeit met één aminozuur per cyclus.', 'Arrival → decoding → peptide bond → translocation → release. The chain grows by one amino acid per cycle.'),
    ST(15000, cam(800, 395, 1400), 'Elongatie gaat door (versneld)', 'Elongation continues (fast-forward)', 'Zo worden alle codons afgelezen. De keten verlaat het ribosoom via de uitgangstunnel en begint al te vouwen.', 'This is how all codons are read. The chain leaves the ribosome through the exit tunnel and already starts to fold.'),
    ST(8500, cam(930, 450, 1250), 'Stopcodon: eRF1', 'Stop codon: eRF1', 'Voor UAA, UAG en UGA bestaat geen tRNA. eRF1 (met eRF3·GTP) herkent het stopcodon in de A-plaats; eRF1 lijkt op een tRNA.', 'No tRNA exists for UAA, UAG or UGA. eRF1 (with eRF3·GTP) recognises the stop codon in the A site; eRF1 mimics a tRNA.'),
    ST(8500, cam(840, 300, 1350), 'Keten komt vrij', 'Chain is released', 'eRF1 laat water de binding tussen keten en tRNA hydrolyseren: het eiwit komt vrij en gaat vouwen.', 'eRF1 lets water hydrolyse the bond between chain and tRNA: the protein is released and folds.'),
    ST(7500, FULL, 'Recycling', 'Recycling', 'ABCE1 splitst het ribosoom in subeenheden; die kunnen opnieuw beginnen, vaak op hetzelfde mRNA (polysoom).', 'ABCE1 splits the ribosome into subunits; they can start again, often on the same mRNA (polysome).'),
  ],
  svg() {
    return svgOpen() + `
    <g data-node="ribosoom" data-color="${C.rrna}" data-label="${T2('Ribosoom (80S)', 'Ribosome (80S)')}">
      <g id="tl-large">
        <path d="M470,585 C420,420 520,235 790,215 C1060,195 1190,330 1170,490 C1162,560 1120,585 1080,588 L520,588 C495,588 478,588 470,585Z" fill="rgba(44,198,168,.15)" stroke="${C.rrna}" stroke-width="3"/>
        <path d="M800,262 C788,222 800,190 832,150" stroke="rgba(44,198,168,.45)" stroke-width="30" fill="none" stroke-linecap="round"/>
        <g id="tl-l60" opacity="0">${txt(1110, 262, T2('grote subeenheid (60S)', 'large subunit (60S)'), C.rrna, 24, 'start', 700)}</g>
        <g id="tl-ltun" opacity="0">${txt(866, 158, T2('uitgangstunnel', 'exit tunnel'), C.text, 22, 'start')}</g>
        <g font-family="JetBrains Mono" font-size="22" font-weight="700" fill="${C.text}" text-anchor="middle" opacity=".8">
          <text x="${SITE.E}" y="252">E</text><text x="${SITE.P}" y="252">P</text><text x="${SITE.A}" y="252">A</text>
        </g>
        <circle data-anchor="ribosoom" cx="1010" cy="258" r="1" fill="none"/>
      </g>
      <g id="tl-small">
        <path d="M500,648 C500,720 620,772 800,774 C980,776 1100,730 1100,650 Z" fill="rgba(44,198,168,.22)" stroke="${C.rrna}" stroke-width="3"/>
        <g id="tl-l40" opacity="0">${txt(800, 818, T2('kleine subeenheid (40S)', 'small subunit (40S)'), C.rrna, 24, 'middle', 700)}</g>
      </g>
    </g>
    <g data-node="polya" data-color="${C.rna}" data-label="${T2('Poly(A)-staart', 'Poly(A) tail')}"><g id="tl-polya"></g><circle id="tl-polyaA" data-anchor="polya" r="1" fill="none"/></g>
    <g data-node="vouwing" data-color="${C.chain}" data-label="${T2('Groeiende keten → vouwing', 'Growing chain → folding')}"><g id="tl-chain"></g><circle id="tl-chainA" data-anchor="vouwing" r="1" fill="none"/></g>
    <g data-node="trna" data-color="${C.trna}" data-label="tRNA"><g id="tl-trnas"></g><circle id="tl-trnaA" data-anchor="trna" r="1" fill="none"/></g>
    <g data-node="aars" data-color="${C.trna}" data-label="${T2('geladen tRNA (aminoacyl-tRNA)', 'charged tRNA (aminoacyl-tRNA)')}" data-nolabel><g id="tl-inc"></g></g>
    <g data-node="elongatie" data-color="${C.prot}" data-label="eEF1A · eEF2"><g id="tl-eef"></g><circle id="tl-eefA" data-anchor="elongatie" r="1" fill="none"/></g>
    <g data-node="terminatie" data-color="${C.prot}" data-label="${T2('eRF1 (stop)', 'eRF1 (stop)')}"><g id="tl-rf"></g></g>
    <g data-node="codon" data-color="${C.rna}" data-label="${T2('mRNA · codons', 'mRNA · codons')}"><g id="tl-mrna"></g><circle id="tl-mrnaA" data-anchor="codon" data-pos="below" r="1" fill="none"/></g>
    <g id="tl-pairs"></g>
    <g id="tl-ov"></g>
    <g data-node="initiatie" data-color="${C.prot}" data-label="${T2("5'-cap · initiatiefactoren", "5' cap · initiation factors")}"><g id="tl-cap"></g><g id="tl-eif"></g></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);

    /* ---- tekenfuncties ---- */
    const anticodon = c => c.split('').map(b => RNA_PAIR[b]).join('');   // van links naar rechts = 3'→5'
    function trna(x, y, codonIdx, aaChar, op = 1, big = false) {
      // y = hoogte van de onderkant (anticodon) ; L-vorm ~ 230 px hoog
      if (op <= .01) return '';
      const ac = anticodon(CODONS[codonIdx]);
      let s = `<g opacity="${f1(op)}">
        <path d="M${x - 30},${y} L${x - 30},${y - 96} Q${x - 30},${y - 118} ${x - 10},${y - 124} L${x + 32},${y - 134} L${x + 32},${y - 204} L${x + 12},${y - 204} L${x + 12},${y - 150} L${x - 8},${y - 145} L${x - 8},${y}"
          fill="rgba(255,194,71,.2)" stroke="${C.trna}" stroke-width="3" stroke-linejoin="round"/>`;
      ac.split('').forEach((b, j) => {
        const bx = x - NT + j * NT;
        s += `<rect x="${f1(bx - 16)}" y="${f1(y - 4)}" width="32" height="28" rx="5" fill="${BASE[b]}"/><text x="${f1(bx)}" y="${f1(y + 16)}" font-size="17" text-anchor="middle" fill="#0a1224" font-family="JetBrains Mono" font-weight="700">${b}</text>`;
      });
      if (big) s += txt(x - NT - 8, y - 12, "3'", '#fff', 15, 'end') + txt(x + NT + 8, y - 12, "5'", '#fff', 15, 'start') + txt(x + NT + 30, y - 12, T2('anticodon', 'anticodon'), '#fff', 14, 'start');
      if (aaChar) s += bead(x + 22, y - 222, aaChar, 21);
      return s + '</g>';
    }
    function bead(x, y, a, r = 18) {
      return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${CLASSCOL[AACLASS[a]] ?? '#aaa'}" stroke="#0a1224" stroke-width="2"/>` +
        `<text x="${f1(x)}" y="${f1(y + r * .3)}" font-size="${Math.round(r * .76)}" text-anchor="middle" fill="#0a1224" font-family="Inter" font-weight="700">${THREE[a]}</text>`;
    }
    const ntX = (i, c, v, scan) => PC + ((i - S0 - 1) - 3 * (c + v)) * NT + scan;

    /* ov = overzicht (stap 0, ver uitgezoomd): letters verborgen, grote regiolabels; lab5/lab3 = zichtbaarheid UTR-labels */
    function drawMRNA(c, v, scan, ov, lab5, lab3) {
      let m = '';
      const x0 = ntX(0, c, v, scan) - NT / 2, x1 = ntX(MRNA.length - 1, c, v, scan) + NT / 2, lo = 1 - ov;
      m += `<line x1="${f1(x0 - 20)}" y1="${YM}" x2="${f1(x1)}" y2="${YM}" stroke="${C.rna}" stroke-width="${f1(6 + 8 * ov)}"/>`;
      for (let j = 0; j < MRNA.length; j++) {
        const x = ntX(j, c, v, scan);
        if (x < -3000 || x > 5200) continue;
        const cod = Math.floor((j - S0) / 3), inFrame = j >= S0 && cod <= STOP;
        m += `<rect x="${f1(x - 17)}" y="${YM + 6}" width="34" height="30" rx="5" fill="${BASE[MRNA[j]]}" opacity="${inFrame ? 1 : .5}"/>`;
        if (lo > .01) m += `<text x="${f1(x)}" y="${YM + 27}" font-size="18" text-anchor="middle" fill="#0a1224" font-family="JetBrains Mono" font-weight="700" opacity="${f1(lo)}">${MRNA[j]}</text>`;
        if (lo > .01 && inFrame && (j - S0) % 3 === 0) {
          const a = translate(CODONS[cod]);
          m += `<g opacity="${f1(lo)}"><line x1="${f1(x - NT / 2)}" y1="${YM + 40}" x2="${f1(x - NT / 2)}" y2="${YM + 60}" stroke="${C.muted}" stroke-width="2"/>` +
            (a === '*' ? txt(x + NT, YM + 70, 'STOP', C.danger, 21, 'middle', 700) : txt(x + NT, YM + 69, THREE[a], C.muted, 18)) + '</g>';
        }
      }
      m += txt(x1 + 24 + 20 * ov, YM - 12, "3'", C.text, f1(18 + 40 * ov));
      $('tl-mrna').innerHTML = m;
      $('tl-mrnaA').setAttribute('cx', f1(clamp(ntX(S0 + 3 * (c + 2), c, v, scan), 150, 1450))); $('tl-mrnaA').setAttribute('cy', YM + 82 + 150 * ov);
      const capX = ntX(0, c, v, scan) - NT / 2 - 22;
      $('tl-cap').innerHTML = `<circle cx="${f1(capX)}" cy="${YM}" r="23" fill="${C.cap}" stroke="${C.rna}" stroke-width="2"/><text x="${f1(capX)}" y="${YM + 5}" font-size="15" text-anchor="middle" fill="#3a1a05" font-family="Inter" font-weight="700" opacity="${f1(lo)}">m⁷G</text>` + txt(capX, YM - 34, "5'", C.text, f1(18 + 40 * ov));
      const aS = ntX(MRNA.length - POLYA.length, c, v, scan) - NT / 2, aE = x1;
      $('tl-polya').innerHTML = `<rect x="${f1(aS)}" y="${YM - 16}" width="${f1(aE - aS)}" height="70" fill="transparent"/>` + (lo > .01 ? `<g opacity="${f1(lo)}"><path d="M${f1(aS + 4)},${YM + 76} v10 H${f1(aE - 4)} v-10" stroke="${C.rna}" stroke-width="2" fill="none"/>` +
        txt((aS + aE) / 2, YM + 114, T2('poly(A)-staart (verkort)', 'poly(A) tail (shortened)'), C.rna, 20) + '</g>' : '');
      $('tl-polyaA').setAttribute('cx', f1((aS + aE) / 2)); $('tl-polyaA').setAttribute('cy', YM + 150 + 60 * ov);
      // UTR-labels (alleen in de stappen waar ze ertoe doen)
      const u5 = (ntX(0, c, v, scan) + ntX(S0 - 1, c, v, scan)) / 2, u3 = (ntX(S0 + CDS.length, c, v, scan) + ntX(MRNA.length - POLYA.length - 1, c, v, scan)) / 2;
      if (lab5 > .01) $('tl-mrna').innerHTML += `<g opacity="${f1(lab5)}">${txt(u5, YM - 26, "5'-UTR", C.text, 22)}</g>`;
      if (lab3 > .01) $('tl-mrna').innerHTML += `<g opacity="${f1(lab3)}">${txt(u3, YM - 26, "3'-UTR", C.text, 22)}</g>`;
      // overzicht: grote labels per gebied (leesbaar bij de ver uitgezoomde camera van stap 0)
      let o = '';
      if (ov > .01) {
        const cs = ntX(S0, c, v, scan) - NT / 2, ce = ntX(S0 + CDS.length - 1, c, v, scan) + NT / 2, ue = ntX(MRNA.length - POLYA.length - 1, c, v, scan) + NT / 2;
        const br = (xa, xb, col) => `<path d="M${f1(xa + 6)},${YM - 44} v-16 H${f1(xb - 6)} v16" stroke="${col}" stroke-width="6" fill="none"/>`;
        o += `<g opacity="${f1(ov)}">` + br(x0, cs, C.muted) + br(cs, ce, C.rna) + br(ce, ue, C.muted) + br(aS, aE, C.rna) +
          txt((x0 + cs) / 2, YM - 90, "5'-UTR", C.text, 60) + txt((cs + ce) / 2, YM - 90, T2('coderend deel', 'coding region'), C.rna, 60, 'middle', 700) +
          txt((ce + ue) / 2, YM - 90, "3'-UTR", C.text, 60) + txt((aS + aE) / 2, YM - 90, 'poly(A)', C.rna, 60) +
          txt(capX, YM + 150, T2("5'-cap", "5' cap"), C.cap, 60) +
          txt(cs + 60, YM + 150, 'start AUG', C.text, 60, 'middle', 700) + txt(ce - 60, YM + 150, 'stop UAA', C.danger, 60, 'middle', 700) + '</g>';
      }
      $('tl-ov').innerHTML = o;
      return capX;
    }
    function pairLines(x, codon, op) {
      // codon-anticodon-paring in de A- of P-plaats: 2 (A–U) of 3 (G–C) H-bruggen per basenpaar
      if (op <= .01) return '';
      let s = `<g opacity="${f1(op)}">`;
      codon.split('').forEach((b, j) => {
        const bx = x - NT + j * NT, n = b === 'G' || b === 'C' ? 3 : 2;
        for (let k = 0; k < n; k++) { const dx = (k - (n - 1) / 2) * 7; s += `<line x1="${f1(bx + dx)}" y1="${YM - 25}" x2="${f1(bx + dx)}" y2="${YM + 5}" stroke="#fff" stroke-width="2.5" stroke-dasharray="4 3"/>`; }
      });
      return s + '</g>';
    }
    function chainSVG(anchor, n, released = 0) {
      // n aminozuren AAS[0..n-1]; nieuwste bij het anker, oudste het verst weg (N-terminus eerst uit de tunnel).
      // released (0..1): de vrijgekomen keten schuift weg en klapt samen tot een compact bolletje (begin van de vouwing)
      const pts = [], FOLD = [380, 160];
      for (let s = 0; s < n; s++) {
        let x, y;
        if (s === 0) { x = anchor[0]; y = anchor[1]; }
        else if (s < 4) { x = lerp(anchor[0], TUNNEL[0], s / 4); y = lerp(anchor[1], TUNNEL[1], s / 4); }
        else { const u = s - 4; x = TUNNEL[0] - 24 - u * 44; y = TUNNEL[1] - 34 - u * 12 + Math.cos(u * 1.4) * 12; }
        if (released > 0) {
          const i = n - 1 - s, ang = i * 2.4, rad = 27 * Math.sqrt(i + .3);   // zonnebloemspiraal: compact, zonder overlap
          x = lerp(x, FOLD[0] + rad * Math.cos(ang), released); y = lerp(y, FOLD[1] + rad * Math.sin(ang), released);
        }
        pts.push([x, y, AAS[n - 1 - s]]);
      }
      let g = pts.length > 1 ? `<path d="${pts.map((p, i) => `${i ? 'L' : 'M'}${f1(p[0])},${f1(p[1])}`).join('')}" stroke="${C.chain}" stroke-width="4" fill="none"/>` : '';
      g += pts.map(([x, y, a]) => bead(x, y, a, 21)).join('');
      const tip = pts[Math.min(3, pts.length - 1)] ?? anchor;
      const nt = pts[pts.length - 1] ?? anchor, ca = released > .5 ? [FOLD[0] + 200, FOLD[1] + 10] : [nt[0], nt[1] - 30];
      $('tl-chainA').setAttribute('cx', f1(ca[0])); $('tl-chainA').setAttribute('cy', f1(ca[1]));
      return g;
    }

    /* ---- toestand per (stap, p) ---- */
    const CYC = [[0, .3], [.3, .45], [.45, .6], [.6, .85], [.85, 1]];   // aankomst, decodering, binding, translocatie, vertrek
    return {
      update(t, s) {
        const { step, p } = s;
        let c = 0, u = 0, scan = 0, phase = 'elong';
        if (step <= 4) phase = 'init';
        else if (step <= 9) { c = 0; const [a, b] = CYC[step - 5]; u = lerp(a, b, p); }
        else if (step === 10) { c = 1; u = p; }
        else if (step === 11) { const k = Math.min(8.999, p * 9); c = 2 + Math.floor(k); u = k - Math.floor(k); }
        else phase = 'term';
        if (phase === 'term') c = STOP - 1;

        const v = phase === 'elong' ? ease(sub(u, .6, .85)) : 0;
        if (phase === 'init') scan = step <= 1 ? SCAN0 : step === 2 ? SCAN0 * (1 - ease(p)) : 0;
        const ov = step === 0 ? 1 : step === 1 ? 1 - ease(sub(p, 0, .35)) : 0;
        const lab5 = step === 1 ? 1 - ov : step === 2 ? 1 : step === 3 ? 1 - sub(p, 0, .3) : 0;
        const lab3 = step === 12 ? sub(p, .2, .5) : step === 13 ? 1 : step === 14 ? 1 - sub(p, 0, .3) : 0;
        const capX = drawMRNA(c, v, scan, ov, lab5, lab3);
        // labels van het ribosoom: alleen in de stap waar ze ertoe doen
        const l40 = step === 1 ? sub(p, .35, .7) : step === 2 ? 1 - sub(p, 0, .3) : step === 4 ? sub(p, .4, .7) : step === 5 ? 1 - sub(p, 0, .3) : 0;
        const l60 = step === 4 ? sub(p, .4, .7) : step === 5 ? 1 - sub(p, 0, .3) : 0;
        const ltun = step === 11 ? sub(p, .05, .2) : step === 12 ? 1 - sub(p, 0, .3) : 0;
        $('tl-l40').setAttribute('opacity', f1(l40)); $('tl-l60').setAttribute('opacity', f1(l60)); $('tl-ltun').setAttribute('opacity', f1(ltun));

        // subeenheden
        const smallOp = step === 0 ? 0 : step === 1 ? ease(sub(p, .2, .6)) : step === 14 ? 1 - .5 * ease(sub(p, .3, .8)) : 1;
        const largeOp = step <= 3 ? 0 : step === 4 ? ease(sub(p, 0, .6)) : step === 14 ? 1 - .5 * ease(sub(p, .3, .8)) : 1;
        const largeDy = step === 4 ? -160 * (1 - ease(sub(p, 0, .6))) : step === 14 ? -160 * ease(sub(p, .3, .8)) : 0;
        $('tl-small').setAttribute('opacity', f1(smallOp)); $('tl-small').setAttribute('transform', `translate(0 ${step === 14 ? f1(90 * ease(sub(p, .3, .8))) : 0})`);
        $('tl-large').setAttribute('opacity', f1(largeOp)); $('tl-large').setAttribute('transform', `translate(0 ${f1(largeDy)})`);

        // initiatiefactoren
        let eif = '';
        if (step >= 1 && step <= 2) eif += pill(capX + 70, YM - 50, 90, 34, 'eIF4F', C.prot2, step === 1 ? sub(p, 0, .3) : 1 - sub(p, .6, 1), 18);
        if (step >= 1 && step <= 4) {
          const o1 = step === 1 ? sub(p, .3, .6) : 1;
          eif += pill(1000, 705, 80, 34, 'eIF3', C.prot3, step === 4 ? o1 * (1 - sub(p, .4, .8)) : o1, 18);
          eif += pill(SITE.P - 130, 330, 130, 34, 'eIF2·GTP', C.prot2, step === 3 ? o1 * (1 - sub(p, .5, .9)) : step === 4 ? 0 : o1, 18);
          eif += pill(SITE.P - 180, 705, 76, 34, 'eIF1', C.prot3, step === 3 ? o1 * (1 - sub(p, .5, .9)) : step === 4 ? 0 : o1, 18);
          if (step === 4) eif += pill(SITE.A + 40, 150 - 160 * (1 - ease(sub(p, 0, .6))), 146, 34, 'eIF5B·GTP', C.prot2, 1 - sub(p, .7, 1), 18);
        }
        if (step === 2) eif += `<path d="M${SITE.P - 180},${YM + 150} h360" stroke="${C.muted}" stroke-width="3" marker-end="url(#arrow)"/>` + txt(SITE.P, YM + 196, T2("scannen 5'→3'", "scanning 5'→3'"), C.text, 22);
        $('tl-eif').innerHTML = eif;

        // tRNA's, keten, factoren
        let tr = '', inc = '', eef = '', rf = '', pairs = '';
        $('tl-eefA').setAttribute('cx', '-9999');
        // tRNA-label links naast de arm van het tRNA in de P-plaats (niet op de keten)
        const tAx = phase === 'elong' ? SITE.P - v * COD - ease(sub(u, .85, 1)) * 160 : SITE.P;
        $('tl-trnaA').setAttribute('cx', step === 0 ? '-9999' : f1(tAx - 80)); $('tl-trnaA').setAttribute('cy', f1(YM - 52 - 90 - (phase === 'elong' ? ease(sub(u, .85, 1)) * 220 : 0)));
        let chain = '';
        const yDock = YM - 52;
        if (phase === 'init') {
          const op = step === 1 ? sub(p, .2, .6) : step === 0 ? 0 : 1;
          tr += trna(SITE.P, yDock, 0, 'M', op, step === 3);
          if (step === 3) pairs += pairLines(SITE.P, CODONS[0], sub(p, .1, .4));
        } else if (phase === 'elong') {
          // tRNA in P (codon c): draagt de keten tot de peptidebinding
          const bond = sub(u, .45, .6), shift = v * COD;
          const leave = sub(u, .85, 1);
          const pX = SITE.P - shift, aX = SITE.A - shift;
          const pUp = leave * 220, pLeft = leave * 160;
          tr += trna(pX - pLeft, yDock - pUp, c, null, 1 - leave);
          // binnenkomend tRNA (codon c+1)
          const arr = ease(sub(u, 0, .3));
          const ix = lerp(SITE.A + 380, aX, arr), iy = lerp(yDock - 420, yDock, arr);
          const carriesOwnAa = bond < .5;
          inc += trna(ix, iy, c + 1, carriesOwnAa ? AAS[c + 1] : null, sub(u, 0, .08) * 1, step === 6);
          const eA = u < .4 ? [ix + 84, iy - 176] : u >= .62 && u < .82 ? [SITE.A + 190 - shift, 352] : [-9999, 0];
          $('tl-eefA').setAttribute('cx', f1(eA[0])); $('tl-eefA').setAttribute('cy', f1(eA[1]));
          if (u < .45) eef = pill(ix + 84, iy - 150, 150, 34, 'eEF1A·GTP', C.prot2, 1 - sub(u, .38, .45), 19);
          if (u >= .6 && u < .85) eef = pill(SITE.A + 70 - shift, 360, 136, 34, 'eEF2·GTP', C.prot2, sub(u, .6, .64) * (1 - sub(u, .8, .85)), 19);
          pairs += pairLines(aX, CODONS[c + 1], sub(u, .3, .38));
          if (u < .85) pairs += pairLines(pX, CODONS[c], .55);
          // keten: vóór binding aan P-tRNA (c+1 residuen), erna aan het nieuwe tRNA (c+2 residuen)
          const pAnchor = [pX - pLeft + 22, yDock - pUp - 222], aAnchor = [ix + 22, iy - 222];
          if (bond < .5) chain = chainSVG([lerp(pAnchor[0], aAnchor[0], ease(bond * 2) * .5), lerp(pAnchor[1], aAnchor[1], ease(bond * 2) * .5)], c + 1);
          else chain = chainSVG([lerp(pAnchor[0], aAnchor[0], .5 + ease((bond - .5) * 2) * .5), lerp(pAnchor[1], aAnchor[1], .5 + ease((bond - .5) * 2) * .5)], c + 2);
          if (step === 7) {
            const rx = (pAnchor[0] + aAnchor[0]) / 2, ry = pAnchor[1] + 10, lo = sub(p, 0, .25);
            pairs += `<circle cx="${f1(rx)}" cy="${f1(ry)}" r="${f1(34 + 8 * Math.sin(bond * Math.PI))}" fill="none" stroke="#fff" stroke-width="2.5" opacity="${f1(.5 + .5 * Math.sin(bond * Math.PI))}"/>` +
              `<g opacity="${f1(lo)}"><line x1="${f1(rx - 36)}" y1="${f1(ry - 8)}" x2="${f1(rx - 136)}" y2="${f1(ry - 38)}" stroke="#fff" stroke-width="1.5"/>` +
              txt(rx - 142, ry - 44, T2('peptidyl-', 'peptidyl'), '#fff', 14, 'end') + txt(rx - 142, ry - 26, T2('transferasecentrum', 'transferase centre'), '#fff', 14, 'end') + '</g>';
          }
        } else {
          // terminatie: P = tRNA(c) met keten van c+1 residuen; A = stopcodon
          const rel = step === 13 ? ease(sub(p, .2, 1)) : step === 14 ? 1 : 0;
          const lv = step === 14 ? sub(p, .1, .6) : 0;
          tr += trna(SITE.P - lv * 160, yDock - lv * 220, c, null, 1 - lv);
          const rin = step === 12 ? ease(sub(p, 0, .5)) : 1;
          const rx = lerp(SITE.A + 380, SITE.A, rin), ry = lerp(yDock - 420, yDock, rin);
          const rop = step === 14 ? 1 - sub(p, 0, .4) : 1;
          rf = (rop <= .01 ? '' : `<g opacity="${f1(rop)}"><path d="M${rx - 30},${ry} L${rx - 30},${ry - 190} L${rx + 30},${ry - 190} L${rx + 30},${ry} Z" fill="rgba(155,123,255,.35)" stroke="${C.prot}" stroke-width="3"/>` +
            txt(rx, ry - 90, 'eRF1', '#fff', 20) + '</g>') + pill(rx + 100, ry - 170, 136, 34, 'eRF3·GTP', C.prot2, step === 12 ? sub(p, .1, .4) * (1 - sub(p, .75, 1)) : 0, 18);
          chain = chainSVG([SITE.P + 22, yDock - 222], c + 1, rel);
          if (step === 14) pairs += pill(SITE.P, 505, 110, 38, 'ABCE1', C.prot2, sub(p, .2, .45), 22);
        }
        $('tl-trnas').innerHTML = tr; $('tl-inc').innerHTML = inc; $('tl-eef').innerHTML = eef; $('tl-rf').innerHTML = rf;
        $('tl-pairs').innerHTML = pairs; $('tl-chain').innerHTML = chain;
      },
    };
  },
};
