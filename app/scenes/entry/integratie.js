import { C, L, T2, svgOpen, txt, cam, sub, ease, lerp, clamp, f1, rng, squiggle } from '../../kit.js';
import { PINK } from './_bits.js';
import { eiwit, polII } from '../../bio.js';

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
    nl: 'Het intasoom is hier getekend als vier integrase-subeenheden (bij HIV-1 een tetrameer) die beide DNA-uiteinden samenhouden; het echte intasoom is groter en kan meer subeenheden bevatten. Het ingebouwde provirus is als lus getekend om plaats te sparen; in het chromosoom ligt het gewoon in lijn. Basenparen zijn niet individueel getekend, dus de 5 bp tussen de twee insertieplaatsen is symbolisch. Het capside, LEDGF/p75 en de herstelenzymen staan schematisch.',
    en: 'The intasome is drawn as four integrase subunits (a tetramer for HIV-1) holding both DNA ends; the real intasome is larger and can contain more subunits. The inserted provirus is drawn as a loop to save space; in the chromosome it simply lies in line. Base pairs are not drawn individually, so the 5 bp between the two insertion sites is symbolic. The capsid, LEDGF/p75 and the repair enzymes are schematic.' },
  parts: [
    { c: C.muted, t: { nl: 'celkern', en: 'nucleus' }, d: { nl: 'Alles gebeurt in de kern van de cel, waar het eigen DNA ligt (de vage blauwe draadjes).', en: 'Everything happens in the cell nucleus, where the cell’s own DNA lies (the faint blue threads).' },
      p: { nl: 'Nucleoplasma met chromatine; HIV-1 integreert na kernimport van het pre-integratiecomplex.', en: 'Nucleoplasm with chromatin; HIV-1 integrates after nuclear import of the pre-integration complex.' } },
    { c: C.dna, t: { nl: 'gastheerchromosoom (dsDNA)', en: 'host chromosome (dsDNA)' }, d: { nl: 'De twee blauwe lijnen onderaan: het DNA van de cel zelf, met twee strengen.', en: 'The two blue lines at the bottom: the cell’s own DNA, with two strands.' },
      p: { nl: 'Doel-DNA in het gastheerchromosoom.', en: 'Target DNA in the host chromosome.' } },
    { c: PINK, t: { nl: 'viraal DNA', en: 'viral DNA' }, m: ['lineair dsDNA met twee LTR\'s (uit de reverse transcriptie)', 'linear dsDNA with two LTRs (from reverse transcription)', 'gag · pol · env (≈ 9,7 kb)', 'gag · pol · env (≈ 9.7 kb)'], d: { nl: 'De roze lus: het DNA van het virus, gemaakt uit zijn RNA. Het draagt de genen van het virus (gag, pol, env).', en: 'The pink loop: the virus DNA, made from its RNA. It carries the genes of the virus (gag, pol, env).' },
      p: { nl: 'Lineair dsDNA (≈ 9,7 kb) uit de reverse transcriptie, met de genen gag, pol en env tussen twee LTR’s.', en: 'Linear dsDNA (≈ 9.7 kb) from reverse transcription, with the genes gag, pol and env between two LTRs.' } },
    { c: PINK, t: 'LTR', m: ['aan-knop (promoter) in de LTR', 'on switch (promoter) in the LTR'], d: { nl: 'Aan elk uiteinde van het virus-DNA zit hetzelfde herhaalde stuk. De linker werkt later als aan-knop (promoter).', en: 'At each end of the virus DNA sits the same repeated piece. The left one later works as the on switch (promoter).' },
      p: { nl: 'Long terminal repeat (U3-R-U5); de 5′-LTR bevat de promoter en enhancers voor transcriptie van het provirus.', en: 'Long terminal repeat (U3-R-U5); the 5′ LTR contains the promoter and enhancers for proviral transcription.' } },
    { c: C.prot, t: { nl: 'intasoom (integrase)', en: 'intasome (integrase)' }, d: { nl: 'Paarse bolletjes: het virusenzym integrase. Het houdt beide uiteinden vast, knipt ze bij en hecht ze in het DNA van de cel.', en: 'Purple blobs: the virus enzyme integrase. It holds both ends, trims them and joins them into the cell’s DNA.' },
      p: { nl: 'Intasoom: een integrasemultimeer (kern = tetrameer) die beide LTR-uiteinden synapseert en 3′-processing en strengoverdracht katalyseert.', en: 'Intasome: an integrase multimer (core = tetramer) that synapses both LTR ends and catalyses 3′ processing and strand transfer.' } },
    { c: '#ff6b6b', t: 'GT', m: ['2 letters eraf aan elk uiteinde', '2 letters off each end'], d: { nl: 'Integrase knipt twee DNA-letters van elk uiteinde weg. Zo zijn de uiteinden klaar om te koppelen.', en: 'Integrase cuts two DNA letters off each end. That makes the ends ready to join.' },
      p: { nl: '3′-processing: verwijdering van het dinucleotide GT, zodat een vrij 3′-OH na het geconserveerde CA overblijft.', en: '3′ processing: removal of the GT dinucleotide, leaving a free 3′-OH after the conserved CA.' } },
    { c: '#7fdc6a', t: { nl: '5 basenparen uit elkaar', en: '5 base pairs apart' }, d: { nl: 'De twee uiteinden knippen het DNA van de cel open op twee plekken die 5 letterparen uit elkaar liggen.', en: 'The two ends cut the cell’s DNA open at two places 5 letter pairs apart.' },
      p: { nl: 'Strengoverdracht: de 3′-OH-uiteinden vallen fosfodiësterbindingen aan op de twee strengen, 5 bp gespreid (HIV-1).', en: 'Strand transfer: the 3′-OH ends attack phosphodiester bonds on the two strands, staggered by 5 bp (HIV-1).' } },
    { c: C.chain, t: { nl: 'herstel', en: 'repair' }, m: ['5 basenparen van de cel staan nu dubbel', '5 base pairs of the cell are now doubled'], d: { nl: 'Herstelenzymen van de cel vullen de gaatjes op (groene blokjes). Daardoor staan die 5 letterparen nu aan beide kanten.', en: 'Repair enzymes of the cell fill in the gaps (green blocks). As a result those 5 letter pairs now sit on both sides.' },
      p: { nl: 'Gastheerreparatie vult de gaps op en ligeert; resultaat is een duplicatie van 5 bp doel-DNA aan beide zijden.', en: 'Host repair fills the gaps and ligates; the result is a 5 bp duplication of target DNA on both sides.' } },
    { c: PINK, t: { nl: 'provirus — permanent deel van het genoom', en: 'provirus — a permanent part of the genome' }, d: { nl: 'Eenmaal ingebouwd heet het virus-DNA provirus. Het blijft voorgoed in het DNA van de cel en gaat mee bij elke deling.', en: 'Once built in, the virus DNA is called a provirus. It stays in the cell’s DNA for good and is passed on at every division.' },
      p: { nl: 'Geïntegreerd provirus, covalent verbonden met het gastheerchromosoom.', en: 'Integrated provirus, covalently joined to the host chromosome.' } },
    { c: C.muted, t: 'LEDGF/p75', m: ['LEDGF/p75 stuurt HIV-1 naar actieve genen', 'LEDGF/p75 steers HIV-1 towards active genes'], d: { nl: 'Een eiwit van de cel dat het virus-DNA vooral naar genen leidt die aanstaan.', en: 'A cell protein that guides the virus DNA mainly to genes that are switched on.' },
      p: { nl: 'Chromatinegebonden cofactor die integrase bindt en integratie in actief getranscribeerde genen bevordert.', en: 'Chromatin-bound cofactor that binds integrase and favours integration into actively transcribed genes.' } },
    { c: C.prot, t: 'Pol II', d: { nl: 'Het kopieerenzym van de cel. Het leest het provirus af alsof het een eigen gen is.', en: 'The cell’s copying enzyme. It reads the provirus as if it were its own gene.' },
      p: { nl: 'RNA-polymerase II van de gastheer, gestart vanaf de promoter in de 5′-LTR.', en: 'Host RNA polymerase II, initiating from the promoter in the 5′ LTR.' } },
    { c: C.rna, t: { nl: 'viraal mRNA', en: 'viral mRNA' }, d: { nl: 'De oranje draad: de kopie van het virus-DNA, waarmee de cel nieuwe viruseiwitten maakt.', en: 'The orange thread: the copy of the virus DNA, with which the cell makes new virus proteins.' },
      p: { nl: 'Virale transcripten van het provirus.', en: 'Viral transcripts from the provirus.' } },
    { c: C.muted, t: { nl: 'blijft het stil: slapend virus (latent)', en: 'if it stays silent: sleeping virus (latent)' }, d: { nl: 'Wordt het provirus niet gelezen, dan slaapt het virus in de cel en kan het later weer wakker worden.', en: 'If the provirus is not read, the virus sleeps in the cell and can wake up again later.' },
      p: { nl: 'Transcriptioneel stille provirussen vormen het latente reservoir.', en: 'Transcriptionally silent proviruses form the latent reservoir.' } },
  ],
  steps: [
    ST(7000, cam(800, 385, 1350), 'Viraal DNA in de kern', 'Viral DNA in the nucleus',
      'Het nieuwe virus-DNA is in de kern aangekomen. Aan elk uiteinde zit een herhaling (LTR).',
      'The new viral DNA has arrived in the nucleus. At each end there is a repeat (LTR).'),
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
      <circle data-anchor="transcriptie" cx="420" cy="${HOST - 100}" r="1" fill="none"/>
      <g data-node="rnapol" data-color="${C.prot}" data-nolabel><g id="in-pol"></g></g>
      <g id="in-txn-body"></g>
    </g>
    <g id="in-notes"></g>
    </svg>`;
  },

  init(svg) {
    const $ = id => svg.getElementById(id);
    /* de lus vertrekt steil omhoog uit de twee insertieplaatsen: de uiteinden zitten ín de opening van het gastheer-DNA, niet erop */
    const loopD = y => `M${E1},${f1(y)} C${E1 - 30},${f1(y - 110)} 380,${f1(y - H)} 800,${f1(y - H)} C1220,${f1(y - H)} ${E2 + 30},${f1(y - 110)} ${E2},${f1(y)}`;
    const viral = (y, trimmed) => {
      const d = loopD(y);
      return `<path d="${d}" stroke="${PINK}" stroke-width="18" fill="none" stroke-linecap="${trimmed ? 'butt' : 'round'}"/>
        <path d="${d}" stroke="#2a0f24" stroke-width="4" fill="none"/>
        <path d="${d}" pathLength="1000" stroke="#ffd0ec" stroke-width="18" fill="none" stroke-dasharray="130 740 130" opacity=".55"/>
        ${txt(E1 - 92, y - 40, 'LTR', PINK, 20)}${txt(E2 + 92, y - 40, 'LTR', PINK, 20)}
        ${txt(800, y - H - 24, L({ nl: 'gag · pol · env (≈ 9,7 kb)', en: 'gag · pol · env (≈ 9.7 kb)' }), C.text, 19)}`;
    };
    /* intasoom: een kluwen van integrase-subeenheden (bobbelige eiwitten) rond de twee DNA-uiteinden */
    const intasome = (y, op, zij = false) => op <= .01 ? '' : `<g transform="translate(800 ${f1(y)})" opacity="${f1(op)}">
      ${[[-44, -16, 46, 32], [44, -16, 46, 32], [-36, 20, 40, 28], [36, 20, 40, 28]].map(([x, yy, rx, ry], i) => eiwit(x, yy, rx, ry, C.prot, { seed: 70 + i, bumps: .12 })).join('')}
      ${txt(-94, zij ? 50 : 8, L({ nl: 'intasoom (integrase)', en: 'intasome (integrase)' }), C.prot, 19, 'end')}</g>`;   // label links naast het intasoom, nooit over de LTR-strengen

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
        $('in-intasome').innerHTML = intasome(y + 4, iOn, step >= 3);

        /* herstel: 5-bp duplicatie aan weerszijden */
        const rOn = step === 4 ? ease(sub(p, .25, .6)) : step > 4 ? 1 : 0;
        $('in-repair').setAttribute('opacity', f1(rOn));   // de 5-bp-duplicatie blijft zichtbaar
        $('in-repair-body').innerHTML = rOn > .01
          ? `<g opacity="${f1(rOn)}">${[[E1 - 26, E1], [E2, E2 + 26]].map(([a, b]) => `<rect x="${a}" y="${HOST - 14}" width="${b - a}" height="28" rx="4" fill="${C.chain}" opacity=".85"/>`).join('')}
             ${step === 4 ? `${txt(E1 - 110, HOST + 46, T2('herstel', 'repair'), C.chain, 18)}${txt(E2 + 110, HOST + 46, T2('herstel', 'repair'), C.chain, 18)}` : ''}</g>` : '';

        /* transcriptie */
        const txnOn = step === 6 ? ease(sub(p, .15, .55)) : 0;
        $('in-txn').setAttribute('opacity', f1(txnOn));
        $('in-pol').innerHTML = txnOn > .01
          ? `<g transform="rotate(45 647 ${HOST - 142})">${polII(647, HOST - 142, 54, 24, { dir: -1, gul: 12, hoog: 1.8, vul: .4, achter: .5, uit: 1, seed: 12 })}</g>${txt(588, HOST - 176, 'Pol II', '#e8edf7', 20, 'end')}` : '';   // app-vorm (bio.js) op het linkerbeen van de lus: leest vanaf de LTR het provirus in
        $('in-txn-body').innerHTML = txnOn > .01
          ? `<g transform="translate(647 ${HOST - 142})"><path d="M37,-4 q46,6 73,-32 t64,-38" stroke="${C.rna}" stroke-width="6" fill="none" stroke-linecap="round"/>${txt(184, -84, T2('viraal mRNA', 'viral mRNA'), C.rna, 20, 'start')}</g>
             ${txt(560, HOST + 60, T2('aan-knop (promoter) in de LTR', 'on switch (promoter) in the LTR'), PINK, 20)}` : '';

        /* notities */
        let no = '';
        if (step === 0) no += `<g opacity="${f1(ease(sub(p, .3, .7)))}">${txt(800, Y0 + 90, T2('lineair dsDNA met twee LTR\'s (uit de reverse transcriptie)', 'linear dsDNA with two LTRs (from reverse transcription)'), C.text, 20)}</g>`;
        if (step === 2) {
          // de twee weggeknipte letters (GT) springen van elk uiteinde weg
          const k = ease(sub(p, .15, .35)), fly = ease(sub(p, .35, .8));
          no += `<g opacity="${f1(k * (1 - .55 * fly))}">
            ${txt(E1 - 20 - 120 * fly, Y0 + 30 + 70 * fly, 'GT', '#ff6b6b', 28, 'middle', 800)}${txt(E2 + 20 + 120 * fly, Y0 + 30 + 70 * fly, 'GT', '#ff6b6b', 28, 'middle', 800)}</g>
            <g opacity="${f1(sub(p, .5, .7))}">${txt(800, Y0 + 165, T2('2 letters eraf aan elk uiteinde', '2 letters off each end'), '#ff6b6b', 26, 'middle', 700)}</g>`;
        }
        if (step === 3) {
          const k = ease(sub(p, .6, .95));
          no += `<g opacity="${f1(k)}">
            <path d="M${E1},${HOST + 62} L${E1},${HOST + 74} L${E2},${HOST + 74} L${E2},${HOST + 62}" stroke="#7fdc6a" stroke-width="3" fill="none"/>
            ${txt(E2 + 24, HOST + 80, T2('5 basenparen uit elkaar', '5 base pairs apart'), '#7fdc6a', 20, 'start')}</g>`;
        }
        if (step === 4) no += `<g opacity="${f1(ease(sub(p, .5, .9)))}">${txt(800, HOST + 110, T2('5 basenparen van de cel staan nu dubbel', '5 base pairs of the cell are now doubled'), C.chain, 20)}</g>`;
        if (step === 5) {
          const k = ease(sub(p, .2, .6));
          no += `<g opacity="${f1(k)}">${txt(800, HOST - H - 70, T2('provirus — permanent deel van het genoom', 'provirus — a permanent part of the genome'), PINK, 23)}
            ${txt(800, HOST + 74, T2('LEDGF/p75 stuurt HIV-1 naar actieve genen', 'LEDGF/p75 steers HIV-1 towards active genes'), C.muted, 20)}</g>`;
        }
        if (step === 6) no += `<g opacity="${f1(ease(sub(p, .45, .85)))}">${txt(1090, HOST + 60, T2('blijft het stil: slapend virus (latent)', 'if it stays silent: sleeping virus (latent)'), C.muted, 20)}</g>`;
        $('in-notes').innerHTML = no;
      },
    };
  },
};
