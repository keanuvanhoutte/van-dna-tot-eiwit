import { C, L, T2, svgOpen, txt, cam, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { PINK } from './_bits.js';
import { eiwitPad, trna2dSpan } from '../../bio.js';

/* Zijpad: reverse transcriptie bij HIV-1, stap voor stap als een ladder van toestanden.
 * Groot getekend: dikke strengen, grote vakjes, een kop in gewone taal (vakterm klein eronder) en een legende in de figuur. */
const Y0 = 128, DY = 100, laneY = i => Y0 + i * DY;
const VENZ = '#d98cf0', RNAC = C.rna, DNAC = PINK, DNA2 = '#f9b8e0', TRC = C.trna;   // viraal DNA roze (vreemd DNA, zoals in integratie en cel): (−)-streng PINK, (+)-streng lichtroze
const GAP = 56, SW = 13;                                  // afstand RNA ↔ DNA en dikte van een streng
/* segmentgrenzen langs het genoom (5'→3', links→rechts) */
const SEG = { R5: [340, 406], U5: [406, 472], PBS: [472, 546], BODY: [546, 1000], PPT: [1000, 1066], U3: [1066, 1170], R3: [1170, 1236] };
const JUMP = SEG.R3[0] - SEG.R5[0];                       // de eerste sprong: de kopie van R gaat van de linker- naar de rechter-R
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });
const RCOL = '#ffd2a8';                                   // het stukje R: aan beide uiteinden dezelfde (lichte) kleur

const box = (a, b, y, lab, col, op = 1, h = 46, fs = 24) =>
  `<g opacity="${f1(op)}"><rect x="${f1(a)}" y="${f1(y - h / 2)}" width="${f1(b - a)}" height="${h}" rx="8" fill="${col}" opacity=".92"/>` +
  txt((a + b) / 2, y + fs * .36, lab, '#0a1224', fs, 'middle', 800) + '</g>';
const rBox = (y, a = SEG.R3[0], b = SEG.R3[1], ghost = false) => ghost
  ? `<g><rect x="${f1(a)}" y="${f1(y - 23)}" width="${f1(b - a)}" height="46" rx="8" fill="none" stroke="${RCOL}" stroke-width="3" stroke-dasharray="7 6" opacity=".6"/>${txt((a + b) / 2, y + 9, 'R', RCOL, 24, 'middle', 800)}</g>`
  : `<rect x="${f1(a - 3)}" y="${f1(y - 26)}" width="${f1(b - a + 6)}" height="52" rx="10" fill="none" stroke="#fff" stroke-width="3"/>${box(a, b, y, 'R', RCOL)}`;
const strand = (a, b, y, col, op = 1, w = SW) =>
  `<line x1="${f1(a)}" y1="${f1(y)}" x2="${f1(b)}" y2="${f1(y)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" opacity="${f1(op)}"/>`;
const gone = (a, b, y, col) => `<line x1="${f1(a)}" y1="${f1(y)}" x2="${f1(b)}" y2="${f1(y)}" stroke="${col}" stroke-width="${SW}" stroke-dasharray="5 16" opacity=".3" stroke-linecap="round"/>`;
/* basenparen tussen twee strengen (dunne streepjes) */
const pairs = (a, b, y1, y2, col, op = .55) => { let h = ''; for (let x = a + 8; x < b - 4; x += 14) h += `<line x1="${f1(x)}" y1="${f1(y1 + SW / 2 + 2)}" x2="${f1(x)}" y2="${f1(y2 - SW / 2 - 2)}" stroke="${col}" stroke-width="2.5" opacity="${op}"/>`; return h; };
/* tRNA-Lys3 = het gedeelde tRNA-symbool (bio.js, klein): het 3′-uiteinde (CCA-kant) zit op (x, y), vast aan het PBS;
 * de rest van het tRNA (met de anticodonlus) steekt schuin naar rechtsboven, niet over de letters van het PBS-vak */
const trna = (x, y) => `${trna2dSpan([x + 14, y - 150], [x, y], { col: TRC, std: true })}${txt(x + 14, y - 172, 'tRNA', TRC, 22, 'middle', 700)}`;
const enz = (x, y, lab, col) => `<g transform="translate(${f1(x)} ${f1(y)})"><path d="${eiwitPad(0, 0, 44, 30, 23, .1)}" fill="rgba(155,123,255,.22)" stroke="${col}" stroke-width="3"/>${txt(0, 8, lab, col, 24, 'middle', 800)}</g>`;
/* RT met zijn RNase H-domein: één enzym, twee lobben (het RNase H-domein zit aan het C-uiteinde van RT; Hu & Hughes 2012) */
const rtH = (x, y, col) => `<g transform="translate(${f1(x)} ${f1(y)})"><path d="${eiwitPad(-34, 0, 44, 30, 23, .1)}" fill="rgba(155,123,255,.22)" stroke="${col}" stroke-width="3"/>` +
  `<path d="${eiwitPad(62, 2, 66, 30, 24, .1)}" fill="rgba(155,123,255,.38)" stroke="${col}" stroke-width="3"/>${txt(-36, 8, 'RT', col, 22, 'middle', 800)}${txt(62, 9, 'RNase H', '#fff', 19, 'middle', 700)}</g>`;
/* 5'/3'-labels aan de uiteinden van een streng (nodig om de sprongen te volgen) */
const P5 = "5′", P3 = "3′";
const end = (x, y, lab, col) => txt(x, y + 8, lab, col, 21, 'middle', 700);
/* tRNA dat met zijn 3′-uiteinde (18 nt) gepaard ligt op het PBS: een tRNA-stuk ter hoogte van het DNA, met basenparen naar
 * het PBS-vak; links loopt het over in het nieuwe DNA, rechts gaat het over in het tRNA-symbool */
const trnaPBS = (a, b, yR, yD) => strand(a, b, yD, TRC) + pairs(a, b, yR + 10, yD, TRC, .7) + trna(b, yD);
/* tRNA-Lys3 klikbaar (zelfde doel als de tRNA-hotspot in stap 1–2), zonder extra label */
const trnaHot = (a, b, yR, yD, withPairs = false) => `<g data-node="trna" data-href="../atlas/index.html?id=trna" data-color="${TRC}" data-nolabel>${withPairs ? trnaPBS(a, b, yR, yD) : strand(a, b, yD, TRC) + trna(b, yD)}</g>`;

export default {
  id: 'rt',
  title: { nl: 'Reverse transcriptie (HIV-1)', en: 'Reverse transcription (HIV-1)' },
  scale: { nl: '≈ 9,7 kb genoom', en: '≈ 9.7 kb genome' },
  time: { nl: 'uren (in T-cellen sneller dan in macrofagen)', en: 'hours (faster in T cells than in macrophages)' },
  org: { nl: 'HIV-1 in CD4⁺-T-cellen en macrofagen', en: 'HIV-1 in CD4⁺ T cells and macrophages' },
  legend: [[RNAC, { nl: 'viraal (+)RNA', en: 'viral (+)RNA' }], [DNAC, L({ nl: 'viraal DNA, (−)-streng', en: 'viral DNA, (−) strand' })], [DNA2, L({ nl: 'viraal DNA, (+)-streng', en: 'viral DNA, (+) strand' })], [TRC, 'tRNA-Lys3'], [VENZ, { nl: 'reverse transcriptase / RNase H (viraal enzym)', en: 'reverse transcriptase / RNase H (viral enzyme)' }]],
  simplified: {
    nl: 'Het genoom is als één rechte lijn getekend; in werkelijkheid zijn er twee RNA-kopieën per virusdeeltje en gebeurt dit grotendeels binnen het capside. De genen (gag, pol, env en de regulatorgenen) zijn samengevat in één blok, en RT wordt maar op enkele plaatsen getoond — in werkelijkheid doet hetzelfde enzym alle syntheses en alle RNase H-knippen.',
    en: 'The genome is drawn as a single straight line; in reality there are two RNA copies per virion and most of this happens inside the capsid. The genes (gag, pol, env and the regulatory genes) are summarised in one block, and RT is shown only at a few places — in reality the same enzyme performs every synthesis and every RNase H cut.' },
  parts: [
    { c: RNAC, t: { nl: 'RNA van het virus', en: 'virus RNA' }, m: ['Het RNA van het virus', 'The virus RNA', '(+)ssRNA-genoom · 2 kopieën per virusdeeltje', '(+)ssRNA genome · 2 copies per virus particle', 'RNA weg', 'RNA gone'], d: { nl: 'De oranje streng: het erfelijk materiaal van HIV-1, één RNA-streng. Elk virusdeeltje draagt er twee kopieën van.', en: 'The orange strand: the genetic material of HIV-1, a single RNA strand. Each virus particle carries two copies.' },
      p: { nl: 'Diploïd (+)ssRNA-genoom van ≈ 9,7 kb; dient als matrijs voor de (−)-strengsynthese en wordt daarna door RNase H afgebroken.', en: 'Diploid (+)ssRNA genome of ≈ 9.7 kb; serves as template for (−)-strand synthesis and is then degraded by RNase H.' } },
    { c: C.text, t: { nl: '5′ en 3′', en: '5′ and 3′' }, m: ['5′', '3′'], d: { nl: 'De twee uiteinden van een streng. Ze tonen in welke richting de streng loopt, zodat je de sprongen kunt volgen.', en: 'The two ends of a strand. They show which way the strand runs, so you can follow the jumps.' },
      p: { nl: 'Polariteit van de strengen; DNA-synthese verloopt steeds 5′ → 3′.', en: 'Strand polarity; DNA synthesis always proceeds 5′ → 3′.' } },
    { c: RCOL, t: 'R', m: ['aan beide uiteinden hetzelfde stukje R', 'the same piece R at both ends', 'zelfde stukje R: past hier ook', 'same piece R: fits here too'], d: { nl: 'Een stukje dat aan beide uiteinden van het RNA precies hetzelfde is. Daardoor kan het nieuwe DNA van het ene naar het andere uiteinde springen.', en: 'A piece that is exactly the same at both ends of the RNA. That lets the new DNA jump from one end to the other.' },
      p: { nl: 'Repeat-regio (R), terminaal herhaald aan 5′ en 3′; maakt de eerste strengoverdracht mogelijk.', en: 'Repeat region (R), terminally redundant at 5′ and 3′; enables the first strand transfer.' } },
    { c: RNAC, t: 'U5', m: ['U3'], d: { nl: 'Stukjes die maar aan één uiteinde van het RNA zitten. In het DNA komen ze aan beide kanten terecht.', en: 'Pieces found at only one end of the RNA. In the DNA they end up on both sides.' },
      p: { nl: 'Unieke 5′- (U5) en 3′-regio (U3); reverse transcriptie dupliceert ze tot twee LTR’s (U3-R-U5).', en: 'Unique 5′ (U5) and 3′ (U3) regions; reverse transcription duplicates them into two LTRs (U3-R-U5).' } },
    { c: '#ffb27a', t: 'PBS', m: ['de uiteinden passen op elkaar (PBS)', 'the ends fit onto each other (PBS)'], d: { nl: 'De plek waar het geleende startstukje (tRNA) op het RNA past. Later laat dezelfde plek de twee DNA-uiteinden op elkaar passen.', en: 'The spot where the borrowed starter (tRNA) fits onto the RNA. Later the same spot lets the two DNA ends fit onto each other.' },
      p: { nl: 'Primerbindingsplaats, complementair aan de 18 3′-terminale nucleotiden van tRNA-Lys3; basis voor de tweede strengoverdracht.', en: 'Primer binding site, complementary to the 18 3′-terminal nucleotides of tRNA-Lys3; basis of the second strand transfer.' } },
    { c: RNAC, t: { nl: 'genen (gag · pol · env)', en: 'genes (gag · pol · env)' }, d: { nl: 'Het grootste deel: de bouwplannen voor de eiwitten van het virus, hier samen in één blok.', en: 'The largest part: the building plans for the virus proteins, here combined in one block.' },
      p: { nl: 'Coderend gebied met gag, pol, env en de regulator- en accessoire genen.', en: 'Coding region with gag, pol, env and the regulatory and accessory genes.' } },
    { c: '#ffb27a', t: 'PPT', m: ['blijft liggen', 'stays behind'], d: { nl: 'Een stukje RNA dat niet wordt opgeruimd. Het dient als startpunt voor de tweede DNA-streng.', en: 'A piece of RNA that is not cleared away. It serves as the starting point for the second DNA strand.' },
      p: { nl: 'Polypurinetraject, resistent tegen RNase H; primer voor de (+)-strengsynthese.', en: 'Polypurine tract, resistant to RNase H; primer for (+)-strand synthesis.' } },
    { c: TRC, t: 'tRNA', m: ['kopieert ook een stukje tRNA', 'also copies a bit of tRNA'], d: { nl: 'Een klein RNA, geleend van de cel, dat als startstukje dient voor de eerste DNA-streng.', en: 'A small RNA, borrowed from the cell, that serves as the starter for the first DNA strand.' },
      p: { nl: 'Cellulair tRNA-Lys3, gepaard op de PBS, primer voor de (−)-strengsynthese.', en: 'Cellular tRNA-Lys3, annealed to the PBS, primer for (−)-strand synthesis.' } },
    { c: VENZ, t: 'RT', d: { nl: 'Het enzym van het virus dat van RNA DNA maakt (reverse transcriptase).', en: 'The virus enzyme that makes DNA from RNA (reverse transcriptase).' },
      p: { nl: 'Reverse transcriptase (p66/p51-heterodimeer): RNA- en DNA-afhankelijke DNA-polymerase.', en: 'Reverse transcriptase (p66/p51 heterodimer): RNA- and DNA-dependent DNA polymerase.' } },
    { c: VENZ, t: 'RNase H', m: ['RNase H-deel van RT', 'RNase H part of RT', 'tRNA en PPT weggeknipt', 'tRNA and PPT cut away'], d: { nl: 'Een tweede deel van hetzelfde enzym. Het breekt het RNA af zodra het naar DNA gekopieerd is.', en: 'A second part of the same enzyme. It breaks down the RNA as soon as it has been copied into DNA.' },
      p: { nl: 'RNase H-domein aan het C-uiteinde van p66; hydrolyseert RNA in RNA/DNA-hybriden en verwijdert de tRNA- en PPT-primers.', en: 'RNase H domain at the C-terminus of p66; hydrolyses RNA in RNA/DNA hybrids and removes the tRNA and PPT primers.' } },
    { c: DNAC, t: { nl: 'eerste DNA-streng', en: 'first DNA strand' }, m: ['nieuw DNA', 'new DNA', 'nieuw DNA: kopie van R + U5', 'new DNA: copy of R + U5', 'kopie van R', 'copy of R', '(−)-streng: strong-stop-DNA', '(−) strand: strong-stop DNA', '(−)-streng compleet · enkel de PPT blijft over', '(−) strand complete · only the PPT remains'], d: { nl: 'De roze streng: het eerste nieuwe DNA, gekopieerd van het RNA. Het begint aan het tRNA en springt halverwege naar het andere uiteinde.', en: 'The pink strand: the first new DNA, copied from the RNA. It starts at the tRNA and jumps to the other end partway.' },
      p: { nl: '(−)-strengs DNA; eerst als strong-stop-DNA (kopie van R-U5), na de eerste strengoverdracht over het hele genoom verlengd.', en: '(−)-strand DNA; first as strong-stop DNA (copy of R-U5), extended over the whole genome after the first strand transfer.' } },
    { c: DNA2, t: { nl: 'tweede DNA-streng', en: 'second DNA strand' }, m: ['(+)-streng start op de PPT', '(+) strand starts at the PPT'], d: { nl: 'De lichtroze streng: de tweede DNA-streng, die vanaf het overgebleven RNA-stukje (PPT) wordt gemaakt.', en: 'The light-pink strand: the second DNA strand, made starting from the leftover RNA piece (PPT).' },
      p: { nl: '(+)-strengs DNA, geprimed door de PPT; kopieert ook de eerste 18 nt van het tRNA (de PBS).', en: '(+)-strand DNA, primed by the PPT; also copies the first 18 nt of the tRNA (the PBS).' } },
    { c: DNAC, t: { nl: '1ᵉ strengoverdracht', en: '1st strand transfer' }, m: ['2ᵉ strengoverdracht', '2nd strand transfer', 'het DNA springt', 'the DNA jumps'], d: { nl: 'De twee ‘sprongen’: het nieuwe DNA laat los en gaat verder aan het andere uiteinde, waar het ook past.', en: 'The two ‘jumps’: the new DNA lets go and carries on at the other end, where it also fits.' },
      p: { nl: 'Strengoverdrachten: de eerste via R (strong-stop-DNA naar het 3′-uiteinde), de tweede via de complementaire PBS-sequenties.', en: 'Strand transfers: the first via R (strong-stop DNA to the 3′ end), the second via the complementary PBS sequences.' } },
    { c: '#f7b6dc', t: { nl: 'herhaling (LTR)', en: 'repeat (LTR)' }, m: ['provirus-DNA · LTR = lange herhaling (U3-R-U5) aan elk uiteinde', 'proviral DNA · LTR = long repeat (U3-R-U5) at each end', 'klaar om in het DNA van de cel ingebouwd te worden', 'ready to be inserted into the DNA of the cell'], d: { nl: 'Het eindresultaat: DNA met twee strengen en aan elk uiteinde dezelfde lange herhaling. Zo kan het in het DNA van de cel ingebouwd worden.', en: 'The end result: DNA with two strands and the same long repeat at each end. That way it can be built into the cell’s DNA.' },
      p: { nl: 'Lineair dsDNA met twee identieke LTR’s (U3-R-U5), substraat voor integrase.', en: 'Linear dsDNA with two identical LTRs (U3-R-U5), substrate for integrase.' } },
  ],
  steps: [
    ST(7000, cam(870, 440, 1240), 'HIV-1 draagt RNA', 'HIV-1 carries RNA',
      'HIV-1 draagt twee kopieën van zijn RNA. Het enzym reverse transcriptase (RT) maakt er DNA van.',
      'HIV-1 carries two copies of its RNA. The enzyme reverse transcriptase (RT) turns it into DNA.'),
    ST(7000, cam(870, 440, 1240), 'Een geleend startstukje', 'A borrowed starting piece',
      'RT heeft een startstukje nodig: een tRNA, geleend van de cel. Daar begint de eerste DNA-streng.',
      'RT needs a starting piece: a tRNA, borrowed from the cell. That is where the first DNA strand begins.'),
    ST(7000, cam(870, 440, 1240), 'Het RNA wordt opgeruimd', 'The RNA is cleared away',
      'Zodra een stuk RNA naar DNA gekopieerd is, breekt een tweede deel van RT het af.',
      'As soon as a piece of RNA has been copied into DNA, a second part of RT breaks it down.'),
    ST(7000, cam(870, 440, 1240), 'Het DNA springt naar het andere uiteinde', 'The DNA jumps to the other end',
      'Beide RNA-uiteinden dragen hetzelfde stukje R. Zo kan het nieuwe DNA naar het andere uiteinde springen.',
      'Both RNA ends carry the same piece, R. This lets the new DNA jump to the other end.'),
    ST(7000, cam(870, 440, 1240), 'De eerste DNA-streng is af', 'The first DNA strand is done',
      'RT kopieert het hele RNA naar DNA en ruimt het RNA op. Eén stukje RNA blijft liggen (PPT).',
      'RT copies the whole RNA into DNA and clears the RNA away. One piece of RNA stays behind (PPT).'),
    ST(7000, cam(870, 440, 1240), 'De tweede DNA-streng begint', 'The second DNA strand begins',
      'Dat overgebleven stukje is het startpunt van de tweede DNA-streng. Die kopieert ook een stukje tRNA mee.',
      'That leftover piece is the starting point of the second DNA strand. It also copies a bit of the tRNA.'),
    ST(7000, cam(870, 440, 1240), 'Tweede sprong, dan is het DNA af', 'Second jump, then the DNA is done',
      'Het tRNA en de PPT worden weggeknipt. De uiteinden passen nu op elkaar, zodat RT beide strengen kan afmaken.',
      'The tRNA and the PPT are cut away. The ends now fit onto each other, so RT can finish both strands.'),
    ST(8000, cam(870, 440, 1240), 'Klaar: dubbelstrengig DNA', 'Done: double-stranded DNA',
      'Het resultaat: DNA met twee strengen en aan elk uiteinde een lange herhaling (LTR). Nu kan het ingebouwd worden.',
      'The result is DNA with two strands and a long repeat (LTR) at each end. Now it can be inserted.'),
  ],

  svg() {
    const lanes = [];
    /* kop van een stap: gewone taal groot, vakterm klein eronder */
    const T = (i, nl, en, vak) => txt(860, laneY(i) - 150, T2(nl, en), C.text, 32, 'middle', 800) +
      (vak ? txt(860, laneY(i) - 116, vak, C.muted, 19, 'middle', 600) : '');
    const R = i => laneY(i), D = i => laneY(i) + GAP;
    const cpy = (a, b, y, lab) => txt((a + b) / 2, y + 46, lab, DNAC, 20, 'middle', 700);

    /* 0 — het RNA-genoom */
    lanes.push(`${T(0, 'Het RNA van het virus', 'The virus RNA', T2('(+)ssRNA-genoom · 2 kopieën per virusdeeltje', '(+)ssRNA genome · 2 copies per virus particle'))}
      ${strand(SEG.R5[0] - 20, SEG.R3[1] + 20, R(0), RNAC, .5, 5)}
      ${rBox(R(0), ...SEG.R5)}${box(...SEG.U5, R(0), 'U5', RNAC)}${box(...SEG.PBS, R(0), 'PBS', '#ffb27a')}
      ${box(SEG.BODY[0], SEG.BODY[1], R(0), T2('genen (gag · pol · env)', 'genes (gag · pol · env)'), RNAC, 1, 46, 22)}
      ${box(...SEG.PPT, R(0), 'PPT', '#ffb27a')}${box(...SEG.U3, R(0), 'U3', RNAC)}${rBox(R(0))}
      ${txt((SEG.R5[0] + SEG.R3[1]) / 2, R(0) + 68, T2('aan beide uiteinden hetzelfde stukje R', 'the same piece R at both ends'), RCOL, 21, 'middle', 700)}
      ${end(SEG.R5[0] - 40, R(0), P5, C.text)}${end(SEG.R3[1] + 40, R(0), P3, C.text)}`);

    /* 1 — tRNA + strong-stop DNA */
    lanes.push(`${T(1, 'Eerste stukje DNA', 'First piece of DNA', T2('(−)-streng: strong-stop-DNA', '(−) strand: strong-stop DNA'))}
      ${strand(SEG.R5[0], SEG.R3[1], R(1), RNAC)}
      ${rBox(R(1), ...SEG.R5)}${box(...SEG.U5, R(1), 'U5', RNAC)}${box(...SEG.PBS, R(1), 'PBS', '#ffb27a')}${rBox(R(1))}
      ${trnaPBS(...SEG.PBS, R(1), D(1))}
      ${strand(SEG.R5[0], SEG.PBS[0], D(1), DNAC)}${pairs(SEG.R5[0], SEG.PBS[0], R(1) + 10, D(1), DNAC)}
      ${cpy(SEG.R5[0] + 150, SEG.PBS[0] + 150, D(1), T2('nieuw DNA: kopie van R + U5', 'new DNA: copy of R + U5'))}
      ${enz(SEG.R5[0] + 10, D(1) + 52, 'RT', VENZ)}
      ${end(SEG.R5[0] - 40, R(1), P5, RNAC)}${end(SEG.R3[1] + 40, R(1), P3, RNAC)}`);

    /* 2 — RNase H */
    lanes.push(`${T(2, 'RT breekt het gekopieerde RNA af', 'RT breaks down the copied RNA', T2('RNase H-deel van RT', 'RNase H part of RT'))}
      ${gone(SEG.R5[0], SEG.U5[1], R(2), RNAC)}
      ${strand(SEG.PBS[0], SEG.R3[1], R(2), RNAC)}
      ${box(...SEG.PBS, R(2), 'PBS', '#ffb27a')}${rBox(R(2))}${trnaPBS(...SEG.PBS, R(2), D(2))}
      ${strand(SEG.R5[0], SEG.PBS[0], D(2), DNAC)}
      ${rtH(SEG.R5[0] + 30, R(2) - 66, VENZ)}
      ${txt((SEG.R5[0] + SEG.U5[1]) / 2, D(2) + 46, T2('RNA weg', 'RNA gone'), C.muted, 20, 'middle', 700)}
      ${end(SEG.R3[1] + 40, R(2), P3, RNAC)}${end(SEG.R5[0] - 40, D(2), P3, DNAC)}`);

    /* 3 — eerste strengoverdracht: de kopie van R springt (met het tRNA) naar de R aan het andere uiteinde */
    const jumpPiece = `${strand(SEG.R5[0], SEG.PBS[0], D(3), DNAC)}${trnaHot(...SEG.PBS, R(3), D(3))}
      ${txt(SEG.R5[0] + 10, D(3) + 48, T2('kopie van R', 'copy of R'), DNAC, 20, 'start', 700)}
      ${end(SEG.R5[0] - 34, D(3), P3, DNAC)}`;
    lanes.push(`${T(3, 'Het DNA springt naar het andere uiteinde', 'The DNA jumps to the other end', T2('1ᵉ strengoverdracht', '1st strand transfer'))}
      ${strand(SEG.PBS[0], SEG.R3[1], R(3), RNAC)}${box(...SEG.PBS, R(3), 'PBS', '#ffb27a')}
      ${rBox(R(3), ...SEG.R5, true)}${rBox(R(3))}
      <path d="M${SEG.R5[0] + 30},${D(3) + 26} C${SEG.R5[0] + 300},${D(3) + 120} ${SEG.R3[0] - 300},${D(3) + 120} ${SEG.R3[0] - 14},${D(3) + 30}" stroke="${DNAC}" stroke-width="3" fill="none" stroke-dasharray="9 8" opacity=".7" marker-end="url(#arrow)"/>
      ${txt(760, D(3) + 136, T2('het DNA springt', 'the DNA jumps'), DNAC, 22, 'middle', 700)}
      <g id="rt-fit" opacity="0">${txt((SEG.R3[0] + SEG.R3[1]) / 2 - 40, R(3) - 52, T2('zelfde stukje R: past hier ook', 'same piece R: fits here too'), RCOL, 21, 'end', 700)}</g>
      <g id="rt-jump">${jumpPiece}</g>
      ${end(SEG.PBS[0] - 34, R(3), P5, RNAC)}`);

    /* 4 — (−)-streng compleet, alleen PPT blijft */
    const MD = SEG.R3[1] + 66, TR = [MD, MD + 74];                  /* na de sprong: (−)-DNA tot voorbij R (kopie van U5), daarna het tRNA */
    lanes.push(`${T(4, 'De eerste DNA-streng is af', 'The first DNA strand is done', T2('(−)-streng compleet · enkel de PPT blijft over', '(−) strand complete · only the PPT remains'))}
      ${gone(SEG.PBS[0], SEG.PPT[0], R(4), RNAC)}${gone(SEG.PPT[1], SEG.R3[1], R(4), RNAC)}
      ${box(...SEG.PPT, R(4), 'PPT', '#ffb27a')}
      ${strand(SEG.PBS[0], MD, D(4), DNAC)}${trnaHot(...TR, R(4), D(4))}
      ${txt(720, D(4) + 46, T2('eerste DNA-streng', 'first DNA strand'), DNAC, 21, 'middle', 700)}
      ${txt((SEG.PPT[0] + SEG.PPT[1]) / 2, R(4) - 40, T2('blijft liggen', 'stays behind'), '#ffb27a', 20, 'middle', 700)}
      ${enz(SEG.PBS[0] - 70, D(4), 'RT', VENZ)}`);

    /* 5 — (+)-streng vanaf de PPT */
    lanes.push(`${T(5, 'De tweede DNA-streng begint', 'The second DNA strand begins', T2('(+)-streng start op de PPT', '(+) strand starts at the PPT'))}
      ${strand(SEG.PBS[0], MD, D(5), DNAC)}${trnaHot(...TR, R(5), D(5))}
      ${box(...SEG.PPT, R(5), 'PPT', '#ffb27a')}
      ${strand(SEG.PPT[1], TR[1], R(5), DNA2)}${pairs(SEG.PPT[1], TR[1], R(5), D(5), DNA2, .45)}
      ${txt((SEG.PPT[1] + TR[1]) / 2 - 30, R(5) - 40, T2('tweede DNA-streng', 'second DNA strand'), DNA2, 21, 'middle', 700)}
      ${txt(TR[0] - 6, D(5) + 46, T2('kopieert ook een stukje tRNA', 'also copies a bit of tRNA'), TRC, 19, 'end', 700)}
      ${end(SEG.PBS[0] - 34, D(5), P3, DNAC)}`);

    /* 6 — tweede strengoverdracht */
    lanes.push(`${T(6, 'Tweede sprong, dan is het DNA af', 'Second jump, then the DNA is done', T2('2ᵉ strengoverdracht', '2nd strand transfer'))}
      ${strand(SEG.PBS[0], MD, D(6), DNAC)}
      ${box(SEG.PBS[0], SEG.PBS[1], D(6), 'PBS', '#f7b6dc')}
      ${strand(SEG.PPT[1], TR[1], R(6), DNA2)}
      ${box(TR[0], TR[1], R(6), 'PBS', '#f7b6dc')}
      <path d="M${(TR[0] + TR[1]) / 2},${R(6) - 30} C${TR[0] - 120},${R(6) - 96} ${SEG.PBS[1] + 160},${R(6) - 96} ${(SEG.PBS[0] + SEG.PBS[1]) / 2},${D(6) - 30}" stroke="${DNA2}" stroke-width="3" fill="none" stroke-dasharray="9 8" marker-end="url(#arrow)"/>
      ${txt(800, R(6) - 14, T2('de uiteinden passen op elkaar (PBS)', 'the ends fit onto each other (PBS)'), DNA2, 21, 'middle', 700)}
      ${txt(760, D(6) + 46, T2('tRNA en PPT weggeknipt', 'tRNA and PPT cut away'), C.muted, 20, 'middle', 700)}
      ${end(SEG.PBS[0] - 34, D(6), P3, DNAC)}${end(SEG.PPT[1] - 34, R(6), P5, DNA2)}`);

    /* 7 — lineair dsDNA met LTR's */
    const L1 = [340, 560], L2 = [1140, 1360], Y7 = laneY(7);
    lanes.push(`${T(7, 'Klaar: DNA met twee strengen', 'Done: DNA with two strands', T2('provirus-DNA · LTR = lange herhaling (U3-R-U5) aan elk uiteinde', 'proviral DNA · LTR = long repeat (U3-R-U5) at each end'))}
      ${strand(L1[0], L2[1], Y7 + 16, DNAC)}${strand(L1[0], L2[1], Y7 - 16, DNA2)}${pairs(L1[0], L2[1], Y7 - 16, Y7 + 16, '#f7b6dc', .4)}
      ${box(L1[0], L1[1], Y7, T2('herhaling (LTR)', 'repeat (LTR)'), '#f7b6dc', 1, 56, 22)}
      ${box(L2[0], L2[1], Y7, T2('herhaling (LTR)', 'repeat (LTR)'), '#f7b6dc', 1, 56, 22)}
      ${txt((L1[1] + L2[0]) / 2, Y7 - 40, T2('genen (gag · pol · env)', 'genes (gag · pol · env)'), C.text, 21, 'middle', 700)}
      ${txt(720, Y7 + 70, T2('klaar om in het DNA van de cel ingebouwd te worden', 'ready to be inserted into the DNA of the cell'), C.text, 21, 'middle', 700)}
      ${end(L1[0] - 34, Y7 + 16, P3, DNAC)}${end(L2[1] + 34, Y7 + 16, P5, DNAC)}${end(L1[0] - 34, Y7 - 16, P5, DNA2)}${end(L2[1] + 34, Y7 - 16, P3, DNA2)}`);

    /* legende in de figuur: welke kleur is wat */
    const lg = (x, col, lab, id = '') => `<g ${id ? `id="${id}"` : ''}><line x1="${x}" y1="690" x2="${x + 46}" y2="690" stroke="${col}" stroke-width="${SW}" stroke-linecap="round"/>${txt(x + 60, 697, lab, col, 21, 'start', 700)}</g>`;

    return svgOpen() + `
    ${txt(620, 206, T2('Van RNA naar DNA met twee strengen', 'From RNA to double-stranded DNA'), C.muted, 20)}
    ${lanes.map((h, i) => `<g id="rt-lane-${i}" opacity="0"><g transform="translate(0 ${440 - laneY(i)})">${h}</g></g>`).join('')}
    ${lg(420, RNAC, T2('RNA van het virus', 'virus RNA'))}${lg(740, DNAC, T2('nieuw DNA', 'new DNA'))}${lg(1000, DNA2, T2('tweede DNA-streng', 'second DNA strand'), 'rt-lg2')}
    <g data-node="integratie" data-color="${C.dna}" data-label="${T2('Integratie van het provirus', 'Integration of the provirus')}" id="rt-next" opacity="0">
      <circle data-anchor="integratie" data-pos="below" cx="1250" cy="${440 + 104}" r="1" fill="none"/>
      <rect x="1175" y="${440 + 50}" width="150" height="44" rx="12" fill="rgba(79,143,247,.12)" stroke="${C.dna}" stroke-dasharray="6 5"/>
      ${txt(1250, 440 + 78, T2('inbouwen →', 'insert →'), C.dna, 20)}
    </g>
    <g data-node="baltimore" data-color="${C.trna}" data-nolabel>
      <rect x="1100" y="176" width="260" height="46" rx="12" fill="rgba(255,194,71,.08)" stroke="${C.trna}" stroke-dasharray="6 5"/>
      ${txt(1230, 206, T2('Baltimore-klasse VI', 'Baltimore class VI'), C.trna, 18)}
    </g>
    <g id="rt-trna" data-node="trna" data-href="../atlas/index.html?id=trna" data-color="${C.trna}" data-label="${T2('tRNA — in 3D', 'tRNA — in 3D')}">
      <circle data-anchor="trna" data-pos="below" cx="${SEG.PBS[1] + 190}" cy="${440 - 80}" r="1" fill="none"/>
      <rect x="${SEG.PBS[1] - 10}" y="${440 - 90}" width="100" height="${GAP + 100}" fill="transparent"/>
    </g>
    </svg>`;
  },

  init(svg) {
    const jump = svg.getElementById('rt-jump'), fit = svg.getElementById('rt-fit'), lg2 = svg.getElementById('rt-lg2');
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
        /* stap 4: de kopie van R springt in een boog naar de R aan het andere uiteinde */
        const j = step === 3 ? ease(sub(p, .3, .75)) : step > 3 ? 1 : 0;
        jump.setAttribute('transform', `translate(${f1(JUMP * j)} ${f1(56 * Math.sin(Math.PI * j))})`);
        fit.setAttribute('opacity', f1(step === 3 ? ease(sub(p, .72, .85)) : 0));
        lg2.setAttribute('opacity', f1(step === 5 ? ease(sub(p, 0, .25)) : step > 5 ? 1 : 0));
        svg.getElementById('rt-trna').setAttribute('opacity', step === 1 || step === 2 ? '1' : '0');
        svg.getElementById('rt-next').setAttribute('opacity', f1(step === 7 ? ease(sub(p, .4, .8)) : 0));
      },
    };
  },
};
