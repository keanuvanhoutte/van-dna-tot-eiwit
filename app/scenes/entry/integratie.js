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
      'Het nieuwe virus-DNA, met aan elk uiteinde een herhaling (LTR), gaat samen met eiwitten de kern in.',
      'The new viral DNA, with a repeat (LTR) at each end, enters the nucleus together with proteins.'),
    ST(7000, cam(800, 300, 1000), 'Integrase grijpt het DNA vast', 'Integrase grabs the DNA',
      'Het virale enzym integrase grijpt beide uiteinden van het virus-DNA vast en houdt ze samen.',
      'The viral enzyme integrase grabs both ends of the viral DNA and holds them together.'),
    ST(7000, cam(800, 340, 600), 'De uiteinden worden bijgeknipt', 'The ends are trimmed',
      'Integrase knipt aan elk uiteinde twee bouwstenen weg. Zo worden de uiteinden klaargemaakt om te koppelen.',
      'Integrase cuts two building blocks off each end. This gets the ends ready to join.'),
    ST(8000, cam(800, 470, 1150), 'Het virus-DNA wordt vastgehecht', 'The viral DNA is joined in',
      'De uiteinden knippen het DNA van de cel open en hechten zich vast, op twee plekken 5 basenparen uit elkaar.',
      'The ends cut the cell’s DNA open and join onto it, at two places 5 base pairs apart.'),
    ST(7000, cam(800, 630, 640), 'De cel herstelt de gaatjes', 'The cell repairs the gaps',
      'De cel vult de gaatjes op. Daardoor staan nu dezelfde 5 basenparen van de cel aan beide kanten van het virus-DNA.',
      'The cell fills in the gaps. As a result, the same 5 base pairs of the cell now sit on both sides of the viral DNA.'),
    ST(7000, cam(800, 470, 1250), 'Het virus zit nu in het chromosoom', 'The virus is now in the chromosome',
      'Het ingebouwde virus-DNA heet nu het provirus. HIV-1 komt vooral terecht in actieve genen.',
      'The inserted viral DNA is now called the provirus. HIV-1 mostly ends up in active genes.'),
    ST(7000, cam(800, 470, 1250), 'Afgelezen als een gewoon gen', 'Read like an ordinary gene',
      'De cel leest het provirus af als een eigen gen. Blijft het stil, dan ‘slaapt’ het virus in de cel.',
      'The cell reads the provirus like one of its own genes. If it stays silent, the virus ‘sleeps’ in the cell.'),
  ],

  svg() {
    return svgOpen() + `
    <rect x="-400" y="-400" width="2400" height="1800" fill="url(#gNuc)"/>
    <g data-node="chromatine" data-color="${C.dna}" data-nolabel>${CHROM}</g>
    ${txt(1250, 190, T2('celkern', 'nucleus'), C.muted, 21, 'middle', 500)}
    <g data-node="chromatine" data-color="${C.dna}" data-label="${T2('Gastheerchromosoom', 'Host chromosome')}">
      <circle data-anchor="chromatine" data-pos="below" cx="300" cy="${HOST + 40}" r="1" fill="none"/>
      <g id="in-host"></g>
    </g>
    <g data-node="rt" data-color="${PINK}" data-label="${T2('Komt van de reverse transcriptie', 'Comes from reverse transcription')}" id="in-rt">
      <circle id="in-rt-a" data-anchor="rt" cx="800" cy="${Y0 - H - 50}" r="1" fill="none"/>
    </g>
    <g id="in-viralH" data-node="rt" data-color="${PINK}" data-nolabel><g id="in-viral"></g></g>
    <g id="in-intasome"></g>
    <g data-node="herstel" data-color="${C.chain}" data-label="${T2('DNA-herstel van de gastheer', 'Host DNA repair')}" id="in-repair" opacity="0">
      <circle data-anchor="herstel" data-pos="below" cx="800" cy="${HOST + 70}" r="1" fill="none"/>
      <g id="in-repair-body"></g>
    </g>
    <g data-node="transcriptie" data-color="${C.rna}" data-label="${T2('Transcriptie van het provirus', 'Transcription of the provirus')}" id="in-txn" opacity="0">
      <circle data-anchor="transcriptie" cx="560" cy="${HOST - 214}" r="1" fill="none"/>
      <g data-node="rnapol" data-color="${C.prot}" data-nolabel><g id="in-pol"></g></g>
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
        /* het losse virale DNA linkt naar de reverse transcriptie; eenmaal ingebouwd (stap 3+) is het het provirus van deze scène */
        $('in-viralH').setAttribute('pointer-events', step <= 2 ? 'auto' : 'none');

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
        $('in-pol').innerHTML = txnOn > .01
          ? `<g transform="translate(520 ${HOST - 150})"><ellipse rx="54" ry="40" fill="rgba(155,123,255,.3)" stroke="${C.prot}" stroke-width="3"/>${txt(0, 7, 'Pol II', '#e8edf7', 20)}</g>` : '';
        $('in-txn-body').innerHTML = txnOn > .01
          ? `<g transform="translate(520 ${HOST - 150})"><path d="M-40,-30 q-60,-60 -140,-50" stroke="${C.rna}" stroke-width="6" fill="none"/>${txt(-230, -96, T2('viraal mRNA', 'viral mRNA'), C.rna, 20)}</g>
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
