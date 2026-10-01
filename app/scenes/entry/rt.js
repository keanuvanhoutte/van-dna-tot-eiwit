import { C, L, T2, svgOpen, txt, cam, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { PINK } from './_bits.js';

/* Zijpad: reverse transcriptie bij HIV-1, stap voor stap als een ladder van toestanden. */
const Y0 = 128, DY = 100, laneY = i => Y0 + i * DY;
const RNAC = C.rna, DNAC = C.dna, TRC = C.trna;
/* segmentgrenzen langs het genoom (5'→3', links→rechts) */
const SEG = { R5: [320, 382], U5: [382, 452], PBS: [452, 524], BODY: [524, 1126], PPT: [1126, 1190], U3: [1190, 1312], R3: [1312, 1374] };
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

const box = (a, b, y, lab, col, op = 1, h = 28) =>
  `<g opacity="${f1(op)}"><rect x="${f1(a)}" y="${f1(y - h / 2)}" width="${f1(b - a)}" height="${h}" rx="6" fill="${col}" opacity=".85"/>` +
  txt((a + b) / 2, y + 6.5, lab, '#0a1224', 18) + '</g>';
const strand = (a, b, y, col, op = 1, w = 6) =>
  `<line x1="${f1(a)}" y1="${f1(y)}" x2="${f1(b)}" y2="${f1(y)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" opacity="${f1(op)}"/>`;
const gone = (a, b, y, col) => `<line x1="${f1(a)}" y1="${f1(y)}" x2="${f1(b)}" y2="${f1(y)}" stroke="${col}" stroke-width="6" stroke-dasharray="4 12" opacity=".35" stroke-linecap="round"/>`;
/* tRNA-Lys3 als kleine L-vorm */
const trna = (x, y, op = 1) => `<g transform="translate(${f1(x)} ${f1(y)})" opacity="${f1(op)}">
  <path d="M0,0 L-34,-16 M-34,-16 L-30,-42" stroke="${TRC}" stroke-width="7" fill="none" stroke-linecap="round"/>
  <circle cx="-30" cy="-46" r="7" fill="${TRC}"/>${txt(-30, -62, 'tRNA-Lys3', TRC, 18)}</g>`;
const enz = (x, y, lab, col) => `<g transform="translate(${f1(x)} ${f1(y)})"><ellipse rx="${Math.max(34, lab.length * 6.5)}" ry="24" fill="rgba(155,123,255,.22)" stroke="${col}" stroke-width="2.5"/>${txt(0, 6, lab, col, 18)}</g>`;

/* tRNA-primer na de strengoverdracht: klikbaar (zelfde doel als de tRNA-hotspot in stap 1–2), zonder extra label */
const trnaHot = (x, y) => `<g data-node="trna" data-href="../atlas/index.html?id=trna" data-color="${TRC}" data-nolabel>${trna(x, y)}</g>`;

export default {
  id: 'rt',
  title: { nl: 'Reverse transcriptie (HIV-1)', en: 'Reverse transcription (HIV-1)' },
  scale: { nl: '≈ 9,7 kb genoom', en: '≈ 9.7 kb genome' },
  time: { nl: 'uren (in T-cellen sneller dan in macrofagen)', en: 'hours (faster in T cells than in macrophages)' },
  org: { nl: 'HIV-1 in CD4⁺-T-cellen en macrofagen', en: 'HIV-1 in CD4⁺ T cells and macrophages' },
  legend: [[RNAC, { nl: 'viraal (+)RNA', en: 'viral (+)RNA' }], [DNAC, 'DNA'], [TRC, 'tRNA-Lys3'], [C.prot, { nl: 'reverse transcriptase / RNase H', en: 'reverse transcriptase / RNase H' }]],
  simplified: {
    nl: 'Het genoom is als één rechte lijn getekend; in werkelijkheid zijn er twee RNA-kopieën per virusdeeltje en gebeurt dit grotendeels binnen het capside in het cytoplasma. De genen (gag, pol, env en de regulatorgenen) zijn samengevat in één blok, en RT wordt maar op enkele plaatsen getoond — in werkelijkheid doet hetzelfde enzym alle syntheses en alle RNase H-knippen.',
    en: 'The genome is drawn as a single straight line; in reality there are two RNA copies per virion and most of this happens inside the capsid in the cytoplasm. The genes (gag, pol, env and the regulatory genes) are summarised in one block, and RT is shown only at a few places — in reality the same enzyme performs every synthesis and every RNase H cut.' },
  steps: [
    ST(7000, cam(870, 440, 1240), 'Het genoom', 'The genome',
      'HIV-1 draagt zijn genoom als RNA, in twee identieke kopieën. Het enzym reverse transcriptase (RT) zet dat RNA om in DNA. Op de PBS begint het kopiëren.',
      'HIV-1 carries its genome as RNA, in two identical copies. The enzyme reverse transcriptase (RT) turns that RNA into DNA. Copying starts at the PBS.'),
    ST(7000, cam(870, 440, 1240), 'Een tRNA als primer', 'A tRNA as primer',
      'Elk DNA-polymerase heeft een startstukje (primer) nodig. HIV-1 leent daarvoor een tRNA van de cel, dat op de PBS past. Van daaruit bouwt RT de eerste DNA-streng.',
      'Every DNA polymerase needs a starting piece (primer). HIV-1 borrows a tRNA from the cell for this, which fits the PBS. From there RT builds the first DNA strand.'),
    ST(7000, cam(870, 440, 1240), 'RNase H ruimt op', 'RNase H clears the way',
      'RT heeft een tweede werkplek, RNase H, die RNA afbreekt zodra het naar DNA gekopieerd is. Zo verdwijnen de stukken R en U5.',
      'RT has a second working site, RNase H, which breaks down RNA once it has been copied into DNA. This is how the pieces R and U5 disappear.'),
    ST(7000, cam(870, 440, 1240), 'Eerste strengoverdracht', 'First strand transfer',
      'Het korte DNA-stukje eindigt op een kopie van R. Omdat R aan beide uiteinden van het genoom zit, kan het "springen" en paren met de R aan het andere uiteinde.',
      'The short DNA piece ends in a copy of R. Because R sits at both ends of the genome, it can "jump" and pair with the R at the other end.'),
    ST(7000, cam(870, 440, 1240), 'De (−)-streng wordt afgemaakt', 'The (−) strand is completed',
      'RT kopieert nu het hele genoom naar DNA, en RNase H ruimt het RNA op — behalve één stukje dat blijft liggen: de polypurineketen (PPT).',
      'RT now copies the whole genome into DNA, and RNase H clears the RNA away — except for one piece that stays behind: the polypurine tract (PPT).'),
    ST(7000, cam(870, 440, 1240), 'De PPT is de tweede primer', 'The PPT is the second primer',
      'Het PPT-stukje dient als startstukje voor de tweede DNA-streng, de (+)-streng. Die kopieert ook een stukje van het tRNA, zodat de PBS nu ook als DNA bestaat.',
      'The PPT piece serves as the starting piece for the second DNA strand, the (+) strand. It also copies part of the tRNA, so the PBS now exists as DNA too.'),
    ST(7000, cam(870, 440, 1240), 'Tweede strengoverdracht', 'Second strand transfer',
      'Het tRNA en de PPT worden weggeknipt. De twee PBS-stukken passen op elkaar en paren, zodat RT beide strengen kan afmaken.',
      'The tRNA and the PPT are cut away. The two PBS pieces match and pair, so that RT can finish both strands.'),
    ST(8000, cam(870, 440, 1240), 'Klaar: dubbelstrengig DNA met twee LTR\'s', 'Done: double-stranded DNA with two LTRs',
      'Het resultaat: dubbelstrengig DNA met aan beide uiteinden een LTR, een lange herhaling U3-R-U5 — langer dan het RNA van de start. Nu kan integrase het inbouwen.',
      'The result: double-stranded DNA with an LTR at both ends, a long repeat U3-R-U5 — longer than the RNA we started with. Now integrase can insert it.'),
  ],

  svg() {
    const lanes = [];
    const T = (i, s) => txt(850, laneY(i) - 78, s, C.text, 24, 'middle', 700);

    /* 0 — het RNA-genoom */
    lanes.push(`${T(0, L({ nl: '(+)ssRNA-genoom', en: '(+)ssRNA genome' }))}
      ${strand(SEG.R5[0] - 26, SEG.R3[1] + 26, laneY(0), RNAC, .35, 3)}
      ${box(...SEG.R5, laneY(0), 'R', RNAC)}${box(...SEG.U5, laneY(0), 'U5', RNAC)}${box(...SEG.PBS, laneY(0), 'PBS', '#ffb27a')}
      ${box(SEG.BODY[0], SEG.BODY[1], laneY(0), L({ nl: 'gag · pol · env', en: 'gag · pol · env' }), RNAC)}
      ${box(...SEG.PPT, laneY(0), 'PPT', '#ffb27a')}${box(...SEG.U3, laneY(0), 'U3', RNAC)}${box(...SEG.R3, laneY(0), 'R', RNAC)}
      ${txt(SEG.R5[0] - 46, laneY(0) + 7, "5'", C.text, 18)}${txt(SEG.R3[1] + 46, laneY(0) + 7, "3'", C.text, 18)}
      ${txt(SEG.R3[1], laneY(0) + 48, T2('×2 per deeltje', '×2 per particle'), C.muted, 18, 'end')}`);

    /* 1 — tRNA + strong-stop DNA */
    lanes.push(`${T(1, L({ nl: '(−)-streng strong stop', en: '(−) strand strong stop' }))}
      ${strand(SEG.R5[0], SEG.R3[1], laneY(1), RNAC, .8, 6)}
      ${box(...SEG.PBS, laneY(1), 'PBS', '#ffb27a')}
      ${trna(SEG.PBS[1], laneY(1) + 30)}
      ${strand(SEG.R5[0], SEG.PBS[0], laneY(1) + 30, DNAC, 1, 7)}
      ${txt((SEG.R5[0] + SEG.PBS[0]) / 2, laneY(1) + 56, L({ nl: 'nieuw DNA (R-U5)', en: 'new DNA (R-U5)' }), DNAC, 18)}
      ${enz(SEG.R5[0] - 60, laneY(1) + 16, 'RT', C.prot)}`);

    /* 2 — RNase H */
    lanes.push(`${T(2, 'RNase H')}
      ${gone(SEG.R5[0], SEG.U5[1], laneY(2), RNAC)}
      ${strand(SEG.PBS[0], SEG.R3[1], laneY(2), RNAC, .8, 6)}
      ${strand(SEG.R5[0], SEG.PBS[0], laneY(2) + 30, DNAC, 1, 7)}${trna(SEG.PBS[1], laneY(2) + 30)}
      ${enz(SEG.R5[0] + 20, laneY(2) - 40, 'RNase H', C.prot)}
      ${txt((SEG.R5[0] + SEG.U5[1]) / 2, laneY(2) + 58, L({ nl: 'RNA afgebroken', en: 'RNA degraded' }), C.muted, 18)}`);

    /* 3 — eerste strengoverdracht */
    lanes.push(`${T(3, L({ nl: '1ᵉ strengoverdracht', en: '1st strand transfer' }))}
      ${strand(SEG.PBS[0], SEG.R3[1], laneY(3), RNAC, .8, 6)}${box(...SEG.R3, laneY(3), 'R', RNAC)}
      ${strand(SEG.U3[1], SEG.R3[1], laneY(3) + 30, DNAC, 1, 7)}${trnaHot(SEG.R3[1] + 72, laneY(3) + 30)}
      <path d="M${SEG.R5[0] + 30},${laneY(3) + 46} C600,${laneY(3) + 92} 1100,${laneY(3) + 92} ${SEG.U3[1] + 20},${laneY(3) + 46}" stroke="${DNAC}" stroke-width="3" fill="none" stroke-dasharray="8 7" marker-end="url(#arrow)"/>
      ${txt(880, laneY(3) + 112, L({ nl: 'het DNA springt naar de andere R', en: 'the DNA jumps to the other R' }), DNAC, 17)}`);

    /* 4 — (−)-streng compleet, alleen PPT blijft */
    lanes.push(`${T(4, L({ nl: '(−)-streng compleet', en: '(−) strand complete' }))}
      ${gone(SEG.PBS[0], SEG.PPT[0], laneY(4), RNAC)}${gone(SEG.PPT[1], SEG.R3[1], laneY(4), RNAC)}
      ${box(...SEG.PPT, laneY(4), 'PPT', '#ffb27a')}
      ${strand(SEG.PBS[0], SEG.R3[1], laneY(4) + 30, DNAC, 1, 7)}${trnaHot(SEG.R3[1] + 72, laneY(4) + 30)}
      ${txt(760, laneY(4) + 56, L({ nl: '(−)-DNA-streng', en: '(−) DNA strand' }), DNAC, 18)}
      ${enz(SEG.PBS[0] - 70, laneY(4) + 14, 'RT', C.prot)}`);

    /* 5 — (+)-streng vanaf de PPT */
    lanes.push(`${T(5, L({ nl: '(+)-streng start', en: '(+) strand starts' }))}
      ${strand(SEG.PBS[0], SEG.R3[1], laneY(5) + 16, DNAC, 1, 7)}${trnaHot(SEG.R3[1] + 72, laneY(5) + 16)}
      ${box(...SEG.PPT, laneY(5) - 16, 'PPT', '#ffb27a')}
      ${strand(SEG.PPT[1], SEG.R3[1] + 60, laneY(5) - 16, C.dna2, 1, 7)}
      ${txt(1170, laneY(5) - 52, L({ nl: '(+)-DNA: U3-R-U5-PBS', en: '(+) DNA: U3-R-U5-PBS' }), C.dna2, 18)}`);

    /* 6 — tweede strengoverdracht */
    lanes.push(`${T(6, L({ nl: '2ᵉ strengoverdracht', en: '2nd strand transfer' }))}
      ${strand(SEG.PBS[0], SEG.R3[1], laneY(6) + 16, DNAC, 1, 7)}
      ${box(SEG.PBS[0], SEG.PBS[1], laneY(6) + 16, 'PBS', '#8fb3ff')}
      ${strand(SEG.PPT[1], SEG.R3[1] + 60, laneY(6) - 16, C.dna2, 1, 7)}
      ${box(SEG.R3[1] - 10, SEG.R3[1] + 60, laneY(6) - 16, 'PBS', '#8fb3ff')}
      <path d="M${SEG.R3[1] + 25},${laneY(6) - 34} C1250,${laneY(6) - 80} 560,${laneY(6) - 80} ${(SEG.PBS[0] + SEG.PBS[1]) / 2},${laneY(6) - 2}" stroke="#8fb3ff" stroke-width="3" fill="none" stroke-dasharray="8 7" marker-end="url(#arrow)"/>
      ${txt(880, laneY(6) + 60, L({ nl: 'tRNA en PPT weggeknipt', en: 'tRNA and PPT removed' }), C.muted, 18)}`);

    /* 7 — lineair dsDNA met LTR's */
    const L1 = [330, 560], L2 = [1130, 1360];
    lanes.push(`${T(7, L({ nl: 'provirus-DNA', en: 'provirus DNA' }))}
      ${strand(L1[0], L2[1], laneY(7) - 9, DNAC, 1, 7)}${strand(L1[0], L2[1], laneY(7) + 9, C.dna2, 1, 7)}
      ${box(L1[0], L1[1], laneY(7), 'LTR: U3-R-U5', '#8fb3ff', 1, 26)}
      ${box(L2[0], L2[1], laneY(7), 'LTR: U3-R-U5', '#8fb3ff', 1, 26)}
      ${txt((L1[1] + L2[0]) / 2, laneY(7) - 24, L({ nl: 'gag · pol · env', en: 'gag · pol · env' }), C.text, 18)}
      ${txt(880, laneY(7) + 52, L({ nl: 'dubbelstrengig DNA — klaar voor integratie', en: 'double-stranded DNA — ready for integration' }), C.text, 18)}`);

    return svgOpen() + `
    ${txt(620, 206, T2('Van (+)RNA naar dubbelstrengig DNA', 'From (+)RNA to double-stranded DNA'), C.muted, 20)}
    ${lanes.map((h, i) => `<g id="rt-lane-${i}" opacity="0"><g transform="translate(0 ${440 - laneY(i)})">${h}</g></g>`).join('')}
    <g data-node="integratie" data-color="${C.dna}" data-label="${T2('Integratie van het provirus', 'Integration of the provirus')}" id="rt-next" opacity="0">
      <circle data-anchor="integratie" data-pos="below" cx="1260" cy="${440 + 130}" r="1" fill="none"/>
      <rect x="1175" y="${440 + 78}" width="170" height="44" rx="12" fill="rgba(79,143,247,.12)" stroke="${C.dna}" stroke-dasharray="6 5"/>
      ${txt(1260, 440 + 106, T2('integrase →', 'integrase →'), C.dna, 18)}
    </g>
    <g data-node="baltimore" data-color="${C.trna}" data-label="${T2('Baltimore-klasse VI', 'Baltimore class VI')}">
      <circle data-anchor="baltimore" data-pos="below" cx="1230" cy="232" r="1" fill="none"/>
      <rect x="1100" y="176" width="260" height="46" rx="12" fill="rgba(255,194,71,.08)" stroke="${C.trna}" stroke-dasharray="6 5"/>
      ${txt(1230, 206, T2('Baltimore-klasse VI', 'Baltimore class VI'), C.trna, 18)}
    </g>
    <g id="rt-trna" data-node="trna" data-href="../atlas/index.html?id=trna" data-color="${C.trna}" data-label="${T2('tRNA — atlas', 'tRNA — atlas')}">
      <circle data-anchor="trna" data-pos="below" cx="${SEG.PBS[1] - 40}" cy="${440 + 60}" r="1" fill="none"/>
      <rect x="${SEG.PBS[1] - 80}" y="${440 - 20}" width="90" height="56" fill="transparent"/>
    </g>
    </svg>`;
  },

  init(svg) {
    return {
      update(t, s) {
        const { step, p } = s;
        for (let i = 0; i < 8; i++) {
          const g = svg.getElementById('rt-lane-' + i);
          if (!g) continue;
          // gelijktijdige overvloeiing (geen donker gat tussen twee stappen); stap 0 staat er meteen
          const x = step === 0 ? 1 : ease(sub(p, 0, .25));
          g.setAttribute('opacity', f1(i === step ? x : i === step - 1 ? 1 - x : 0));
        }
        svg.getElementById('rt-trna').setAttribute('opacity', step === 1 || step === 2 ? '1' : '0');
        svg.getElementById('rt-next').setAttribute('opacity', f1(step === 7 ? ease(sub(p, .4, .8)) : 0));
      },
    };
  },
};
