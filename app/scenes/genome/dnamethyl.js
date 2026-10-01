import { C, BASE, COMP, L, T2, svgOpen, txt, mono, pill, nt, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { ST } from './_a_kit.js';

/* bovenste streng 5'→3'; elke CG = CpG-plaats (palindroom: onderste streng leest ook 5'-CG-3') */
const SEQ = 'TACGGATCGCATTCGACGTAACGT';
const N = SEQ.length, X0 = 110, P = 37, BW = 32, BH = 30;
const CPG = []; for (let i = 0; i < N - 1; i++) if (SEQ[i] === 'C' && SEQ[i + 1] === 'G') CPG.push(i);
const bx = i => X0 + i * P;
const MCOL = C.danger;

/* één streng tekenen (bovenste: basen onder de ruggengraat; onderste: omgekeerd) */
function strand(y, seq, top, meth, op, col, newS = false, lab = 1) {
  if (op <= .01) return '';
  let s = `<g opacity="${f1(op)}">`;
  const yb = top ? y - 10 : y + BH + 10;
  s += `<line x1="${bx(0) - 22}" y1="${yb}" x2="${bx(N - 1) + 22}" y2="${yb}" stroke="${col}" stroke-width="7" stroke-linecap="round" ${newS ? 'stroke-dasharray="14 6"' : ''}/>`;
  for (let i = 0; i < N; i++) {
    s += nt(bx(i), y, seq[i], BW, BH);
    if (meth[i] > .01) {
      const k = meth[i], y0 = top ? y - 10 : y + BH + 10, y1 = top ? y0 - 26 * k : y0 + 26 * k;
      s += `<g opacity="${f1(k)}"><line x1="${bx(i)}" y1="${y0}" x2="${bx(i)}" y2="${f1(y1)}" stroke="${MCOL}" stroke-width="3"/><circle cx="${bx(i)}" cy="${f1(y1 + (top ? -13 : 13))}" r="15" fill="${MCOL}" stroke="#0a1224" stroke-width="2"/>` +
        (lab > .01 ? `<text x="${bx(i)}" y="${f1(y1 + (top ? -9 : 17))}" font-size="12" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="800" opacity="${f1(lab)}">CH₃</text>` : '') + `</g>`;
    }
  }
  s += txt(bx(0) - 40, y + 21, top ? "5'" : "3'", C.text, 17) + txt(bx(N - 1) + 40, y + 21, top ? "3'" : "5'", C.text, 17);
  return s + '</g>';
}
const COMPL = SEQ.split('').map(b => COMP[b]).join('');

export default {
  id: 'dnamethyl',
  title: { nl: 'DNA-methylatie', en: 'DNA methylation' },
  scale: { nl: '≈ 1–10 nm', en: '≈ 1–10 nm' },
  time: { nl: 'onderhoud kort na replicatie; patronen kunnen levenslang blijven', en: 'maintenance shortly after replication; patterns can last a lifetime' },
  org: { nl: 'mens (zoogdier)', en: 'human (mammal)' },
  legend: [[BASE.A, 'A'], [BASE.T, 'T'], [BASE.G, 'G'], [BASE.C, 'C'], [MCOL, { nl: 'methylgroep (5mC)', en: 'methyl group (5mC)' }], [C.dna, { nl: 'oude streng', en: 'parental strand' }], [C.dna2, { nl: 'nieuwe streng', en: 'new strand' }], [C.prot, { nl: 'DNMT / TET / MBD', en: 'DNMT / TET / MBD' }]],
  simplified: {
    nl: 'Het DNA is als platte ladder getekend. In werkelijkheid flipt DNMT de cytosine uit de helix in zijn actieve site. DNMT1 werkt samen met UHRF1 (herkent hemigemethyleerd CpG) en gaat mee met de replicatievork; DNMT3A/B werken samen met DNMT3L. Buiten CpG komt (vooral in neuronen en stamcellen) ook wat methylatie in andere contexten voor. De chromatine rond het DNA is weggelaten.',
    en: 'The DNA is drawn as a flat ladder. In reality DNMT flips the cytosine out of the helix into its active site. DNMT1 works together with UHRF1 (which recognises hemimethylated CpG) and travels with the replication fork; DNMT3A/B work together with DNMT3L. Outside CpG, some methylation in other contexts also occurs (mainly in neurons and stem cells). The chromatin around the DNA is omitted.' },
  steps: [
    ST(7500, cam(560, 420, 1000), 'CpG: C gevolgd door G', 'CpG: C followed by G',
      'Bij zoogdieren wordt vooral de C in CpG-dinucleotiden gemethyleerd. CpG is palindroom: ook de andere streng leest 5\'-CG-3\'.',
      'In mammals mainly the C in CpG dinucleotides is methylated. CpG is palindromic: the other strand also reads 5\'-CG-3\'.'),
    ST(8500, cam(1300, 425, 880), '5-methylcytosine (5mC)', '5-methylcytosine (5mC)',
      'Een methylgroep op C5 van cytosine. Die steekt in de grote groef en verandert de paring met G niet: de code blijft dezelfde.',
      'A methyl group on C5 of cytosine. It sticks into the major groove and does not change pairing with G: the code stays the same.'),
    ST(8500, cam(560, 420, 1000), 'De novo: DNMT3A en DNMT3B', 'De novo: DNMT3A and DNMT3B',
      'Tijdens de ontwikkeling zetten DNMT3A/B nieuwe methylgroepen op beide strengen. De methyldonor is S-adenosylmethionine (SAM).',
      'During development DNMT3A/B place new methyl groups on both strands. The methyl donor is S-adenosylmethionine (SAM).'),
    ST(8500, cam(590, 470, 1120), 'Replicatie → hemigemethyleerd', 'Replication → hemimethylated',
      'Na replicatie heeft elke dochterhelix één oude, gemethyleerde streng en één nieuwe, ongemethyleerde streng.',
      'After replication each daughter helix has one old, methylated strand and one new, unmethylated strand.'),
    ST(9000, cam(590, 470, 1120), 'Onderhoud: DNMT1', 'Maintenance: DNMT1',
      'DNMT1 (met UHRF1) herkent hemigemethyleerde CpG\'s en methyleert de nieuwe streng. Zo wordt het patroon bij elke celdeling gekopieerd.',
      'DNMT1 (with UHRF1) recognises hemimethylated CpGs and methylates the new strand. This copies the pattern at every cell division.'),
    ST(9000, cam(790, 790, 1380), 'CpG-eilanden en promoters', 'CpG islands and promoters',
      'De meeste CpG\'s zijn gemethyleerd, maar CpG-eilanden in promoters meestal niet: daar kan het gen aan. Een gemethyleerde promoter bindt MBD-eiwitten en gaat uit.',
      'Most CpGs are methylated, but CpG islands in promoters usually are not: there the gene can be on. A methylated promoter binds MBD proteins and is switched off.'),
    ST(8500, cam(1300, 425, 880), 'Demethylatie via TET', 'Demethylation via TET',
      'TET-enzymen oxideren 5mC stap voor stap; 5fC en 5caC worden door TDG en base-excisieherstel vervangen door gewone C.',
      'TET enzymes oxidise 5mC step by step; 5fC and 5caC are replaced by ordinary C through TDG and base excision repair.'),
    ST(7500, cam(600, 420, 1240), 'Een erfelijk "aan/uit"-geheugen', 'A heritable "on/off" memory',
      'DNA-methylatie houdt transposons, het inactieve X-chromosoom en ingeprente genen stil, en werkt samen met histonmodificaties.',
      'DNA methylation keeps transposons, the inactive X chromosome and imprinted genes silent, and works together with histone modifications.'),
  ],
  svg() {
    // --- inzet: cytosine / 5mC (stap 1) ---
    const cx = 1290, cy = 440, R = 58;
    const V = a => [cx + R * Math.cos(a * Math.PI / 180), cy + R * Math.sin(a * Math.PI / 180)];
    const [C4, C5, C6, N1, C2, N3] = [-90, -30, 30, 90, 150, 210].map(V);
    const bond = (a, b, d = false) => `<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="#dfe6f3" stroke-width="4"/>` +
      (d ? `<line x1="${f1(a[0] + (cx - a[0]) * .18)}" y1="${f1(a[1] + (cy - a[1]) * .18)}" x2="${f1(b[0] + (cx - b[0]) * .18)}" y2="${f1(b[1] + (cy - b[1]) * .18)}" stroke="#dfe6f3" stroke-width="3"/>` : '');
    const atom = (p, s, col = '#dfe6f3', fs = 20) => `<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="15" fill="#0d1426"/>` + txt(p[0], p[1] + 7, s, col, fs, 'middle', 700);
    let chem = `<rect x="1060" y="190" width="480" height="470" rx="18" fill="rgba(13,20,38,.8)" stroke="#2a3a60" stroke-width="2"/>`;
    chem += `<g id="dm-cyt">` + bond(C4, C5) + bond(C5, C6, true) + bond(C6, N1) + bond(N1, C2) + bond(C2, N3) + bond(N3, C4, true) +
      bond(C4, [C4[0], C4[1] - 50]) + bond(C2, [C2[0] - 45, C2[1] + 26], false) + bond(N1, [N1[0], N1[1] + 48]) +
      `<line x1="${f1(C2[0] - 45)}" y1="${f1(C2[1] + 26)}" x2="${f1(C2[0])}" y2="${f1(C2[1])}" stroke="#dfe6f3" stroke-width="4" transform="translate(4 6)"/>` +
      atom(N1, 'N', '#7cc4ff') + atom(N3, 'N', '#7cc4ff') + atom([C4[0], C4[1] - 58], 'NH₂', '#7cc4ff', 18) + atom([C2[0] - 52, C2[1] + 30], 'O', '#ff8a8a') +
      txt(N1[0] + 14, N1[1] + 58, T2('suiker (dR)', 'sugar (dR)'), C.muted, 15, 'start') +
      txt(C5[0] + 6, C5[1] + 26, '5', C.muted, 14) + txt(N1[0] + 16, N1[1] - 6, '1', C.muted, 13) +
      `<g id="dm-me">${bond(C5, [C5[0] + 48, C5[1] - 28])}<circle cx="${f1(C5[0] + 62)}" cy="${f1(C5[1] - 36)}" r="24" fill="${MCOL}"/>${txt(C5[0] + 62, C5[1] - 29, 'CH₃', '#fff', 17, 'middle', 800)}</g>` + `</g>`;
    chem += txt(1300, 250, T2('5-methylcytosine', '5-methylcytosine'), '#fff', 22, 'middle', 700);
    chem += `<g id="dm-chemtxt">${txt(1300, 582, T2('← Watson–Crick-kant: paart met G', '← Watson–Crick edge: pairs with G'), C.muted, 15)}${txt(1300, 604, T2('methyl op C5 → in de grote groef', 'methyl on C5 → in the major groove'), MCOL, 15)}</g>`;
    // TET-route (stap 6)
    const tet = [['5mC', MCOL], ['5hmC', '#e86aa0'], ['5fC', '#c47be0'], ['5caC', '#9b7bff'], ['C', BASE.C]];
    let tr = `<g id="dm-tet" opacity="0"><rect x="1060" y="190" width="480" height="470" rx="18" fill="#0d1426" stroke="#2a3a60" stroke-width="2"/>` + txt(1300, 250, T2('Actieve demethylatie', 'Active demethylation'), '#fff', 22, 'middle', 700);
    tet.forEach(([n, col], i) => {
      const y = 290 + i * 70;
      tr += `<g class="dm-tetn" id="dm-tet${i}">${pill(1300, y, 150, 44, n, col, 1, 20)}</g>`;
      if (i < 4) tr += `<path d="M1300,${y + 24} L1300,${y + 52}" stroke="#fff" stroke-width="3" marker-end="url(#arrow)"/>` + txt(1390, y + 45, i < 3 ? 'TET' : 'TDG + BER', i < 3 ? '#c9b8ff' : '#7fdc6a', 16, 'start', 700);
    });
    tr += txt(1392, 590, T2('ook passief:', 'also passive:'), C.muted, 13, 'start') + txt(1392, 607, T2('verdunning bij', 'dilution during'), C.muted, 13, 'start') + txt(1392, 624, T2('replicatie', 'replication'), C.muted, 13, 'start') + '</g>';

    // --- promoterpaneel (stap 5) ---
    let prom = `<rect x="130" y="690" width="1340" height="200" rx="18" fill="rgba(13,20,38,.6)" stroke="#2a3a60" stroke-width="2"/>`;
    const gene = (y, meth, lbl) => {
      let g = `<line x1="170" y1="${y}" x2="1430" y2="${y}" stroke="${C.dna}" stroke-width="8"/>` +
        `<rect x="780" y="${y - 16}" width="560" height="32" rx="6" fill="rgba(79,143,247,.3)" stroke="${C.dna}" stroke-width="2"/>` + txt(1060, y + 7, lbl, '#fff', 20, 'middle', 700) +
        `<rect x="330" y="${y - 20}" width="420" height="40" rx="8" fill="none" stroke="${C.trna}" stroke-width="2" stroke-dasharray="6 4"/>`;
      for (let i = 0; i < 12; i++) {
        const x = 350 + i * 34;
        g += `<rect x="${x - 3}" y="${y - 9}" width="6" height="18" fill="${BASE.C}"/>`;
        if (meth) g += `<line x1="${x}" y1="${y - 10}" x2="${x}" y2="${y - 24}" stroke="${MCOL}" stroke-width="2.5"/><circle cx="${x}" cy="${y - 29}" r="6" fill="${MCOL}"/>`;
      }
      return g;
    };
    prom += `<g data-node="gen" data-color="${C.dna}" data-nolabel>` + gene(750, false, T2('gen A', 'gene A')) + gene(840, true, T2('gen B', 'gene B')) + `</g>`;
    prom += txt(540, 718, T2('CpG-eiland (promoter)', 'CpG island (promoter)'), C.trna, 19);
    prom += `<g data-node="genregulatie" data-color="${C.ok}" data-label="${T2('Actief gen → genregulatie', 'Active gene → gene regulation')}"><ellipse cx="760" cy="738" rx="50" ry="26" fill="rgba(155,123,255,.4)" stroke="${C.prot}" stroke-width="2"/>${txt(760, 745, 'Pol II', '#fff', 19, 'middle', 700)}` +
      `<path d="M800,735 q30,-30 60,-8" stroke="${C.rna}" stroke-width="4" fill="none" marker-end="url(#arrow)"/>${txt(1440, 712, T2('AAN', 'ON'), C.ok, 22, 'end', 800)}<circle data-anchor="genregulatie" cx="760" cy="712" r="1" fill="none"/></g>`;
    prom += `<g>${[420, 520, 620].map(x => `<ellipse cx="${x}" cy="${800}" rx="44" ry="18" fill="rgba(240,107,192,.4)" stroke="#f06bc0" stroke-width="2"/>`).join('')}` +
      txt(420, 806, 'MBD', '#fff', 18, 'middle', 700) + txt(520, 806, 'MeCP2', '#fff', 18, 'middle', 700) + txt(620, 806, 'HDAC', '#fff', 18, 'middle', 700) +
      `<path d="M780,815 l30,30 M810,815 l-30,30" stroke="${C.danger}" stroke-width="5"/>${txt(1440, 876, T2('UIT', 'OFF'), C.danger, 22, 'end', 800)}</g>`;

    return svgOpen() + `
    <g id="dm-dna" data-node="dnahelix" data-color="${C.dna}" data-nolabel></g>
    <g id="dm-enz"></g>
    <g id="dm-cpg"></g>
    <g data-node="nucleotide" data-color="${BASE.C}" data-label="${T2('Nucleotide (cytosine)', 'Nucleotide (cytosine)')}" id="dm-chem">${chem}<circle data-anchor="nucleotide" cx="1180" cy="300" r="1" fill="none"/></g>
    ${tr}
    <g id="dm-prom" opacity="0">${prom}</g>
    <g data-node="replicatie" data-color="${C.dna2}" data-label="${T2('DNA-replicatie', 'DNA replication')}" id="dm-rep" opacity="0"><rect x="60" y="480" width="40" height="160" fill="transparent"/><circle data-anchor="replicatie" cx="140" cy="485" r="1" fill="none"/></g>
    <g id="dm-sum" opacity="0">
      <g data-node="histonmod" data-color="${C.chain}" data-label="${T2('Histonmodificaties', 'Histone modifications')}">${pill(300, 140, 380, 46, T2('+ histonmodificaties (H3K9me3)', '+ histone modifications (H3K9me3)'), '#1f7a5c', 1, 20)}</g>
      ${pill(780, 140, 500, 46, T2('X-inactivatie · imprinting · transposons', 'X inactivation · imprinting · transposons'), '#8a2e3b', 1, 20)}
    </g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const z = new Array(N).fill(0);
        let mTop = z.slice(), mBot = z.slice();                      // methylering op de oude strengen
        let nTop = z.slice(), nBot = z.slice();                      // op de nieuwe strengen (na replicatie)
        // de novo in stap 2 (CpG per CpG), daarna vol
        CPG.forEach((i, k) => {
          const v = step < 2 ? (step === 1 && k === 1 ? 1 : 0) : step === 2 ? ease(sub(p, .15 + k * .12, .25 + k * .12)) : 1;
          mTop[i] = v; mBot[i + 1] = v;
        });
        if (step === 0) { mTop = z.slice(); mBot = z.slice(); }
        // replicatie
        const rep = step < 3 ? 0 : step === 3 ? ease(sub(p, .1, .7)) : 1;
        const newOp = step < 3 ? 0 : step === 3 ? sub(p, .45, .85) : 1;
        // DNMT1 schuift in stap 4 over beide dochterhelices
        const dx = step === 4 ? lerp(bx(0) - 60, bx(N - 1) + 60, sub(p, .1, .85)) : -999;
        CPG.forEach(i => { const v = step < 4 ? 0 : step === 4 ? (dx > bx(i) ? 1 : 0) : 1; nBot[i + 1] = v; nTop[i] = v; });
        const lab = step === 7 ? 1 - ease(sub(p, 0, .3)) : 1;   // overzicht: alleen rode bolletjes
        const yA1 = 330, yA2 = 420, yB2 = lerp(420, 640, rep), yB1 = 550;
        let d = '';
        d += strand(yA1, SEQ, true, mTop, 1, C.dna, false, lab);
        d += strand(yB2, COMPL, false, mBot, 1, C.dna, false, lab);
        d += strand(yA2, COMPL, false, nBot, newOp, C.dna2, true, lab);
        d += strand(yB1, SEQ, true, nTop, newOp, C.dna2, true, lab);
        // waterstofbruggen (streepjes) tussen gepaarde basen
        const hb = (ya, yb, op) => op < .05 ? '' : `<g opacity="${f1(op)}">` + SEQ.split('').map((b, i) => `<line x1="${bx(i)}" y1="${ya + BH + 1}" x2="${bx(i)}" y2="${yb - 1}" stroke="#fff" stroke-width="2" stroke-dasharray="3 3" opacity=".6"/>`).join('') + '</g>';
        d += hb(yA1, 420, rep < .05 ? 1 : newOp);
        if (rep > .05) d += hb(yB1, yB2, newOp);
        if (step >= 3 && step <= 4) d += txt(bx(N - 1) + 64, 395, T2('dochter 1', 'daughter 1'), C.muted, 16, 'start') + txt(bx(N - 1) + 64, 615, T2('dochter 2', 'daughter 2'), C.muted, 16, 'start');
        if (step === 3) d += txt(560, 505, T2('hemigemethyleerd: alleen de oude streng draagt CH₃', 'hemimethylated: only the old strand carries CH₃'), C.trna, 18) ;
        $('dm-dna').innerHTML = d;
        $('dm-dna').setAttribute('opacity', f1(step === 5 ? 1 - .94 * ease(sub(p, 0, .3)) : step === 6 ? .06 : 1));
        // CpG-kaders (stap 0)
        $('dm-cpg').innerHTML = step === 0 ? CPG.map(i => `<rect x="${bx(i) - 21}" y="${330 - 16}" width="${P + 42 - 4}" height="${420 + BH - 330 + 32}" rx="10" fill="none" stroke="${C.trna}" stroke-width="3" opacity="${f1(ease(sub(p, .2, .5)))}"/>`).join('') +
          txt(560, 530, T2(`${CPG.length} CpG-plaatsen in dit stukje`, `${CPG.length} CpG sites in this stretch`), C.trna, 20, 'middle', 700) : '';
        // enzymen
        let e = '';
        if (step === 2) {
          const k = sub(p, .1, .9), x = lerp(bx(0), bx(N - 1), k);
          e += pill(x, 262, 150, 36, 'DNMT3A/B', C.prot2, 1 - sub(p, .9, 1), 17) + pill(x, 488, 150, 36, 'DNMT3A/B', C.prot2, 1 - sub(p, .9, 1), 17);
          e += txt(560, 560, 'SAM → SAH', C.muted, 18);
        }
        if (step === 4) e += pill(dx + 60, 500, 170, 36, 'DNMT1 + UHRF1', C.prot2, 1, 16);
        $('dm-enz').innerHTML = e;
        // inzetten
        $('dm-me').setAttribute('opacity', step === 1 ? ease(sub(p, .25, .5)) : 1);
        $('dm-chem').setAttribute('opacity', f1(step === 1 ? 1 : step === 0 ? .25 : step === 2 ? 1 - ease(sub(p, 0, .3)) : 0));
        $('dm-tet').setAttribute('opacity', step === 6 ? 1 : 0);
        for (let i = 0; i < 5; i++) $('dm-tet' + i).setAttribute('opacity', step === 6 ? (i === 0 ? 1 : f1(sub(p, .05 + i * .16, .15 + i * .16))) : 0);
        $('dm-prom').setAttribute('opacity', f1(step === 5 ? ease(sub(p, 0, .25)) : step === 6 ? 1 - ease(sub(p, 0, .05)) : 0));
        $('dm-rep').setAttribute('opacity', step === 3 || step === 4 ? 1 : 0);
        $('dm-sum').setAttribute('opacity', step === 7 ? ease(sub(p, .1, .4)) : 0);
        // onzichtbare panelen (opacity < 0,1) mogen geen klikken opvangen van wat eronder ligt
        for (const id of ['dm-tet', 'dm-prom', 'dm-sum']) $(id).style.pointerEvents = +$(id).getAttribute('opacity') < .1 ? 'none' : '';
      },
    };
  },
};
