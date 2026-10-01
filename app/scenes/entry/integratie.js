import { C, L, T2, svgOpen, txt, cam, sub, ease, lerp, clamp, f1, rng, squiggle } from '../../kit.js';
import { PINK } from './_bits.js';

/* Zijpad: hoe integrase het provirus in een gastheerchromosoom bouwt. */
const HOST = 640, Y0 = 330, H = 270;      // gastheer-DNA, basis van de virale lus, hoogte van de lus
const E1 = 770, E2 = 830;                 // de twee uiteinden van het virale DNA (≈ 5 bp uit elkaar na insertie)
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

const r = rng(41);
let CHROM = '';
for (let i = 0; i < 16; i++) CHROM += `<path d="${squiggle(r, 80 + r() * 1440, 780 + r() * 110, 7, 13, 12)}" stroke="${C.dna}" stroke-width="2" fill="none" opacity="${f1(.14 + r() * .2)}"/>`;

const duplex = (a, b, y, c1, c2, w = 7) =>
  `<line x1="${f1(a)}" y1="${f1(y - 9)}" x2="${f1(b)}" y2="${f1(y - 9)}" stroke="${c1}" stroke-width="${w}" stroke-linecap="round"/>
   <line x1="${f1(a)}" y1="${f1(y + 9)}" x2="${f1(b)}" y2="${f1(y + 9)}" stroke="${c2}" stroke-width="${w}" stroke-linecap="round"/>`;

export default {
  id: 'integratie',
  title: { nl: 'Integratie van het provirus', en: 'Retroviral integration' },
  scale: { nl: '≈ 10 nm (intasoom)', en: '≈ 10 nm (intasome)' },
  time: { nl: 'uren na de infectie; daarna levenslang', en: 'hours after infection; then for life' },
  org: { nl: 'HIV-1 in een menselijke cel', en: 'HIV-1 in a human cell' },
  legend: [[PINK, { nl: 'viraal DNA / LTR', en: 'viral DNA / LTR' }], [C.dna, { nl: 'gastheer-DNA', en: 'host DNA' }],
    [C.prot, { nl: 'integrase (intasoom)', en: 'integrase (intasome)' }], [C.chain, { nl: 'herstelenzymen van de gastheer', en: 'host repair enzymes' }], [C.rna, 'mRNA']],
  simplified: {
    nl: 'Het intasoom is hier één eiwitklomp die beide DNA-uiteinden samenhoudt; in werkelijkheid is het een symmetrisch complex van integrase-subeenheden (bij HIV-1 een tetrameer). Het ingebouwde provirus is als lus getekend om plaats te sparen; in het chromosoom ligt het gewoon in lijn. Basenparen zijn niet individueel getekend, dus de 5 bp tussen de twee insertieplaatsen is symbolisch. Het capside, LEDGF/p75 en de herstelenzymen staan schematisch.',
    en: 'The intasome is drawn as one protein blob holding both DNA ends; in reality it is a symmetric complex of integrase subunits (a tetramer for HIV-1). The inserted provirus is drawn as a loop to save space; in the chromosome it simply lies in line. Base pairs are not drawn individually, so the 5 bp between the two insertion sites is symbolic. The capsid, LEDGF/p75 and the repair enzymes are schematic.' },
  steps: [
    ST(7000, cam(800, 385, 1350), 'Viraal DNA in de kern', 'Viral DNA in the nucleus',
      'Reverse transcriptie leverde lineair dsDNA met aan beide uiteinden een LTR. Het komt als deel van het pre-integratiecomplex de kern binnen.',
      'Reverse transcription produced linear dsDNA with an LTR at both ends. It enters the nucleus as part of the pre-integration complex.'),
    ST(7000, cam(800, 300, 1000), 'Het intasoom', 'The intasome',
      'Integrase bindt de twee uiteinden van het virale DNA en houdt ze samen in één complex: het intasoom.',
      'Integrase binds the two ends of the viral DNA and holds them together in one complex: the intasome.'),
    ST(7000, cam(800, 340, 600), "3'-processing", "3' processing",
      'Integrase knipt van elk 3\'-uiteinde twee nucleotiden (GT) af. Zo ontstaan twee vrije 3\'-OH-groepen: de "scharen" voor de volgende stap.',
      'Integrase cuts two nucleotides (GT) from each 3\' end. This creates two free 3\'-OH groups: the "tools" for the next step.'),
    ST(8000, cam(800, 470, 1150), 'Strengoverdracht', 'Strand transfer',
      'De twee 3\'-OH-uiteinden vallen tegelijk het gastheer-DNA aan, op twee plaatsen die 5 bp uit elkaar liggen — op tegenoverliggende strengen.',
      'The two 3\'-OH ends attack the host DNA simultaneously, at two positions 5 bp apart — on opposite strands.'),
    ST(7000, cam(800, 630, 640), 'De gastheer repareert', 'The host repairs',
      'Er blijven gaten en losse 5\'-uiteinden over. Herstelenzymen van de cel vullen die aan; daardoor staat er nu 5 bp gastheersequentie dubbel, aan weerszijden.',
      'Gaps and unjoined 5\' ends remain. The cell’s repair enzymes fill them in; as a result 5 bp of host sequence is now duplicated on either side.'),
    ST(7000, cam(800, 470, 1250), 'Het provirus', 'The provirus',
      'Het virale DNA zit nu vast in het chromosoom, geflankeerd door twee LTR\'s. HIV-1 kiest die plaats niet willekeurig: LEDGF/p75 stuurt het naar actieve genen.',
      'The viral DNA is now fixed in the chromosome, flanked by two LTRs. HIV-1 does not pick that site at random: LEDGF/p75 steers it towards active genes.'),
    ST(7000, cam(800, 470, 1250), 'Afgelezen als een gewoon gen', 'Read like an ordinary gene',
      'De linker-LTR werkt als promoter: RNA-polymerase II van de cel schrijft het provirus af. Blijft die promoter stil, dan is de cel latent besmet.',
      'The left LTR acts as a promoter: the cell’s own RNA polymerase II transcribes the provirus. If that promoter stays silent, the cell is latently infected.'),
  ],

  svg() {
    return svgOpen() + `
    <rect x="-400" y="-400" width="2400" height="1800" fill="url(#gNuc)"/>
    ${CHROM}
    ${txt(1250, 190, T2('celkern', 'nucleus'), C.muted, 21, 'middle', 500)}
    <g data-node="chromatine" data-color="${C.dna}" data-label="${T2('Gastheerchromosoom', 'Host chromosome')}">
      <circle data-anchor="chromatine" data-pos="below" cx="300" cy="${HOST + 40}" r="1" fill="none"/>
      <g id="in-host"></g>
    </g>
    <g data-node="rt" data-color="${PINK}" data-label="${T2('Komt van de reverse transcriptie', 'Comes from reverse transcription')}" id="in-rt">
      <circle id="in-rt-a" data-anchor="rt" cx="800" cy="${Y0 - H - 50}" r="1" fill="none"/>
    </g>
    <g id="in-viral"></g>
    <g id="in-intasome"></g>
    <g data-node="herstel" data-color="${C.chain}" data-label="${T2('DNA-herstel van de gastheer', 'Host DNA repair')}" id="in-repair" opacity="0">
      <circle data-anchor="herstel" data-pos="below" cx="800" cy="${HOST + 70}" r="1" fill="none"/>
      <g id="in-repair-body"></g>
    </g>
    <g data-node="transcriptie" data-color="${C.rna}" data-label="${T2('Transcriptie van het provirus', 'Transcription of the provirus')}" id="in-txn" opacity="0">
      <circle data-anchor="transcriptie" cx="560" cy="${HOST - 214}" r="1" fill="none"/>
      <g id="in-txn-body"></g>
    </g>
    <g id="in-notes"></g>
    </svg>`;
  },

  init(svg) {
    const $ = id => svg.getElementById(id);
    const loopD = y => `M${E1},${f1(y)} C380,${f1(y - 20)} 380,${f1(y - H)} 800,${f1(y - H)} C1220,${f1(y - H)} 1220,${f1(y - 20)} ${E2},${f1(y)}`;
    const viral = (y, trimmed) => {
      const d = loopD(y);
      return `<path d="${d}" stroke="${PINK}" stroke-width="18" fill="none" stroke-linecap="${trimmed ? 'butt' : 'round'}"/>
        <path d="${d}" stroke="#2a0f24" stroke-width="4" fill="none"/>
        <path d="${d}" pathLength="1000" stroke="#ffd0ec" stroke-width="18" fill="none" stroke-dasharray="130 740 130" opacity=".55"/>
        ${txt(610, y + 34, 'LTR', PINK, 20)}${txt(990, y + 34, 'LTR', PINK, 20)}
        ${txt(800, y - H - 24, L({ nl: 'gag · pol · env (≈ 9,7 kb)', en: 'gag · pol · env (≈ 9.7 kb)' }), C.text, 19)}`;
    };
    const intasome = (y, op) => op <= .01 ? '' : `<g transform="translate(800 ${f1(y)})" opacity="${f1(op)}">
      <ellipse rx="92" ry="56" fill="rgba(155,123,255,.28)" stroke="${C.prot}" stroke-width="3"/>
      ${[[-40, -14], [40, -14], [-40, 16], [40, 16]].map(([x, yy]) => `<circle cx="${x}" cy="${yy}" r="17" fill="${C.prot}" opacity=".6"/>`).join('')}
      ${txt(0, -70, L({ nl: 'intasoom (integrase)', en: 'intasome (integrase)' }), C.prot, 19)}</g>`;

    return {
      update(t, s) {
        const { step, p } = s;
        const joined = step >= 4 || (step === 3 && p > .85);

        /* gastheer-DNA */
        $('in-host').innerHTML = joined
          ? duplex(80, E1, HOST, C.dna, C.dna2) + duplex(E2, 1520, HOST, C.dna, C.dna2)
          : duplex(80, 1520, HOST, C.dna, C.dna2) + txt(340, HOST + 44, L({ nl: 'gastheerchromosoom (dsDNA)', en: 'host chromosome (dsDNA)' }), C.dna2, 18);

        /* viraal DNA */
        let y = Y0;
        if (step === 3) y = lerp(Y0, HOST, ease(sub(p, .15, .8)));
        else if (step > 3) y = HOST;
        $('in-viral').innerHTML = viral(y, step >= 2);
        $('in-rt-a').setAttribute('cy', f1(y - H - 50));
        $('in-rt').setAttribute('opacity', step <= 2 ? '1' : '0');

        /* intasoom */
        const iOn = step === 0 ? 0 : step === 1 ? ease(sub(p, .15, .6)) : step <= 3 ? 1 : step === 4 ? 1 - ease(clamp(p / .3)) : 0;
        $('in-intasome').innerHTML = intasome(y + 4, iOn);

        /* herstel: 5-bp duplicatie aan weerszijden */
        const rOn = step === 4 ? ease(sub(p, .25, .6)) : step > 4 ? 1 : 0;
        $('in-repair').setAttribute('opacity', f1(step === 4 ? rOn : 0));
        $('in-repair-body').innerHTML = rOn > .01
          ? `<g opacity="${f1(rOn)}">${[[E1 - 26, E1], [E2, E2 + 26]].map(([a, b]) => `<rect x="${a}" y="${HOST - 14}" width="${b - a}" height="28" rx="4" fill="${C.chain}" opacity=".85"/>`).join('')}
             ${step === 4 ? `${txt(E1 - 70, HOST - 34, T2('herstel', 'repair'), C.chain, 17)}${txt(E2 + 70, HOST - 34, T2('herstel', 'repair'), C.chain, 17)}` : ''}</g>` : '';

        /* transcriptie */
        const txnOn = step === 6 ? ease(sub(p, .15, .55)) : 0;
        $('in-txn').setAttribute('opacity', f1(txnOn));
        $('in-txn-body').innerHTML = txnOn > .01
          ? `<g transform="translate(520 ${HOST - 150})"><ellipse rx="54" ry="40" fill="rgba(155,123,255,.3)" stroke="${C.prot}" stroke-width="3"/>${txt(0, 7, 'Pol II', '#e8edf7', 20)}
             <path d="M-40,-30 q-60,-60 -140,-50" stroke="${C.rna}" stroke-width="6" fill="none"/>${txt(-230, -96, T2('viraal mRNA', 'viral mRNA'), C.rna, 20)}</g>
             ${txt(520, HOST + 60, T2('linker-LTR = promoter', 'left LTR = promoter'), PINK, 19)}` : '';

        /* notities */
        let no = '';
        if (step === 0) no += `<g opacity="${f1(ease(sub(p, .3, .7)))}">${txt(800, Y0 + 90, T2('lineair dsDNA met twee LTR\'s (uit de reverse transcriptie)', 'linear dsDNA with two LTRs (from reverse transcription)'), C.text, 20)}</g>`;
        if (step === 2) {
          const k = ease(sub(p, .2, .6)), dr = 40 * ease(sub(p, .5, 1));
          no += `<g opacity="${f1(k)}">
            ${txt(E1 - 70, Y0 + 80 + dr * .7, 'GT', '#ff6b6b', 22)}${txt(E2 + 70, Y0 + 80 + dr * .7, 'GT', '#ff6b6b', 22)}
            ${txt(800, Y0 - 130, "…CA-3'OH", '#7fdc6a', 19)}
            ${txt(800, Y0 + 150, T2("2 nt per 3'-uiteinde weg → vrije 3'-OH", "2 nt removed per 3' end → free 3'-OH"), '#ff6b6b', 19)}</g>`;
        }
        if (step === 3) {
          const k = ease(sub(p, .6, .95));
          no += `<g opacity="${f1(k)}">
            <path d="M${E1},${HOST + 66} L${E1},${HOST + 80} L${E2},${HOST + 80} L${E2},${HOST + 66}" stroke="#7fdc6a" stroke-width="3" fill="none"/>
            ${txt(800, HOST + 110, T2('5 bp uit elkaar, op de twee strengen', '5 bp apart, on the two strands'), '#7fdc6a', 20)}</g>`;
        }
        if (step === 4) no += `<g opacity="${f1(ease(sub(p, .5, .9)))}">${txt(800, HOST + 110, T2('5 bp gastheersequentie staat nu dubbel', '5 bp of host sequence is now duplicated'), C.chain, 19)}</g>`;
        if (step === 5) {
          const k = ease(sub(p, .2, .6));
          no += `<g opacity="${f1(k)}">${txt(800, HOST - H - 70, T2('provirus — permanent deel van het genoom', 'provirus — a permanent part of the genome'), PINK, 23)}
            ${txt(800, HOST + 74, T2('LEDGF/p75 stuurt HIV-1 naar actieve genen', 'LEDGF/p75 steers HIV-1 towards active genes'), C.muted, 20)}</g>`;
        }
        if (step === 6) no += `<g opacity="${f1(ease(sub(p, .45, .85)))}">${txt(1080, HOST + 60, T2('stil provirus = latent reservoir', 'silent provirus = latent reservoir'), C.muted, 19)}</g>`;
        $('in-notes').innerHTML = no;
      },
    };
  },
};
