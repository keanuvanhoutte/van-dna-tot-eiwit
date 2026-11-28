import { C, BASE, COMP, L, T2, svgOpen, txt, pill, nt, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { NEW, PRIMER, seg, pth, endl, prot, tag, arrow } from './_draw.js';
import { with3d } from './_mix3d.js';
import { eiwitPad } from '../../bio.js';

/*
 * Telomeer van een menselijk chromosoom (uiteinde rechts).
 * G-rijke streng (boven) loopt 5'→3' naar het uiteinde en steekt uit als 3'-overhang.
 * Telomerase-RNA (hTR) matrijs: 3'-CAAUCCCAAUC-5' (11 nt); de 5 nt aan het 3'-uiteinde paren met ...GTTAG-3'.
 */
const NT = 26, X0 = 100, YT = 380, YB = 424, BH = 24;       // x van nt 0, y van de blokjes boven/onder
const TOP = 'TTAGGG'.repeat(6) + 'TTAG';                      // 40 nt; laatste 5 = GTTAG
const ND = 24;                                                // aantal nt dat dubbelstrengig is (4 herhalingen)
const ADD = 'GGTTAG';
const TEMPL = 'CAAUCCCAAUC';                                  // van 3' naar 5' (links → rechts)
const xOf = i => X0 + i * NT;

/* nt-blokje waarvan de letter kan uitfaden (lo = opaciteit van de letter) */
const ntL = (x, y, b, w, h, lo) => lo >= .99 ? nt(x, y, b, w, h) :
  `<rect x="${f1(x - w / 2)}" y="${f1(y)}" width="${w}" height="${h}" rx="4" fill="${BASE[b]}"/>` + (lo > .01 ? `<g opacity="${f1(lo)}">${txt(x, y + h * .7, b, '#0a1224', Math.round(h * .6), 'middle', 700, 'JetBrains Mono')}</g>` : '');
const S = (dur, c, nl, en, tnl, ten) => ({ dur, cam: c, title: { nl, en }, text: { nl: tnl, en: ten } });
const DNAC = { A: 'T', T: 'A', G: 'C', C: 'G' }, RNAC = { A: 'U', T: 'A', G: 'C', C: 'G' };

const scene = {
  id: 'telomeren',
  title: { nl: 'Telomeren & telomerase', en: 'Telomeres & telomerase' },
  scale: '≈ 10–30 nm',
  time: { nl: 'verkorting bij elke celdeling; telomerase voegt telkens 6 letters toe', en: 'shortening at every cell division; telomerase adds 6 letters per round' },
  org: { nl: 'mens', en: 'human' },
  legend: [[C.dna, { nl: 'G-rijke streng (TTAGGG)', en: 'G-rich strand (TTAGGG)' }], [C.dna2, { nl: 'C-rijke streng', en: 'C-rich strand' }], [NEW, { nl: 'nieuw DNA', en: 'new DNA' }],
    [PRIMER, { nl: 'RNA (primer / telomerase-RNA)', en: 'RNA (primer / telomerase RNA)' }], [C.prot, { nl: 'TERT & shelterin', en: 'TERT & shelterin' }], ['#ffd9b3', { nl: 'RNA-matrijs (3D)', en: 'RNA template (3D)' }], ['#7f8fb0', { nl: 'andere eiwitten (3D)', en: 'other proteins (3D)' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">De matrijs in het telomerase-RNA is 11 nt lang: 5 nt om het DNA-uiteinde vast te houden en 6 nt die als GGTTAG worden overgeschreven. Zo ontstaat telkens een nieuwe TTAGGG-herhaling.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">The template in telomerase RNA is 11 nt long: 5 nt to hold the DNA end and 6 nt that are copied as GGTTAG. Each round therefore adds a new TTAGGG repeat.</p>' },
  simplified: {
    nl: 'Menselijke telomeren zijn duizenden basenparen lang; hier zijn maar enkele herhalingen getekend. Het eindreplicatieprobleem is vereenvoudigd tot het wegvallen van de laatste primer; ook nucleasen die het uiteinde bijwerken dragen bij. Telomerase en shelterin zijn in de 2D-stappen schematisch. De 3D-stappen tonen PDB 7QXA (het kerndeel van menselijke telomerase met telomeer-DNA en TPP1, cryo-EM; Sekne et al., Science 2022) met één bolletje per bouwsteen; daarin is ongeveer de helft van het RNA te zien en ontbreekt het tweede deel van het enzym (met dyskerine). Ook PDB 7BG9 toont menselijke telomerase; hTR (451 nt) heeft nog vele andere domeinen en er horen o.a. dyskerine en TCAB1 bij. Of G-quadruplexen (gestapelde G-kwartetten, gestabiliseerd door K⁺) in cellen aan telomeren een rol spelen, wordt nog onderzocht. De T-lus is veel kleiner getekend dan in werkelijkheid.',
    en: 'Human telomeres are thousands of base pairs long; only a few repeats are drawn here. The end-replication problem is simplified to the loss of the last primer; nucleases processing the end also contribute. Telomerase and shelterin are schematic in the 2D steps. The 3D steps show PDB 7QXA (the core of human telomerase with telomeric DNA and TPP1, cryo-EM; Sekne et al., Science 2022) with one bead per building block; about half of the RNA is visible in it and the second part of the enzyme (with dyskerin) is missing. PDB 7BG9 also shows human telomerase; hTR (451 nt) has many other domains and dyskerin and TCAB1, among others, belong to the holoenzyme. Whether G-quadruplexes (stacked G-quartets stabilised by K⁺) play a role at telomeres in cells is still being investigated. The t-loop is drawn much smaller than it really is.' },
  /* "Wat zie je?" (zijpaneel): elk onderdeel van de figuur in één zin — d = eenvoudig, p = vaktaal (hoger) */
  parts: [
    { c: C.muted, t: { nl: 'uiteinde', en: 'end' }, m: ['uiteinde chromosoom →', 'chromosome end →', 'telomeren aan beide uiteinden', 'telomeres at both ends'], d: { nl: 'Elk chromosoom heeft aan beide uiteinden een telomeer: een lange reeks van dezelfde zes letters die het einde beschermt.', en: 'Every chromosome has a telomere at both ends: a long series of the same six letters that protects the end.' },
      p: { nl: 'Telomeren: repetitieve nucleoproteïnestructuren aan de chromosoomuiteinden, bij de mens duizenden bp TTAGGG.', en: 'Telomeres: repetitive nucleoprotein structures at chromosome ends, in humans thousands of bp of TTAGGG.' } },
    { c: C.dna, t: { nl: 'G-rijke streng (TTAGGG)', en: 'G-rich strand (TTAGGG)' }, m: ['TTAGGG', 'matrijs: G-rijke streng', 'template: G-rich strand', 'DNA', 'DNA-uiteinde', 'DNA end'], d: { nl: 'De bovenste streng (blauw) herhaalt telkens TTAGGG en loopt naar het uiteinde.', en: 'The upper strand (blue) repeats TTAGGG over and over and runs to the end.' },
      p: { nl: 'G-rijke streng, 5′→3′ naar het chromosoomuiteinde; substraat van telomerase.', en: 'G-rich strand, 5′→3′ towards the chromosome end; the substrate of telomerase.' } },
    { c: C.dna2, t: { nl: 'C-rijke streng', en: 'C-rich strand' }, m: ['dubbelstrengig telomeer-DNA', 'double-stranded telomeric DNA', 'dubbelstrengig telomeer', 'double-stranded telomere'], d: { nl: 'De onderste streng (lichtblauw), de partner van de G-rijke streng. Ze is iets korter.', en: 'The lower strand (light blue), the partner of the G-rich strand. It is a little shorter.' },
      p: { nl: 'Complementaire C-rijke streng (CCCTAA); samen met de G-streng het dubbelstrengige deel van het telomeer.', en: 'Complementary C-rich strand (CCCTAA); together with the G strand the double-stranded part of the telomere.' } },
    { c: C.dna, t: { nl: '3′-overhang (enkelstrengig)', en: '3′ overhang (single-stranded)' }, m: ['3′-overhang blijft over', '3′ overhang remains'], d: { nl: 'Het laatste stuk van de G-rijke streng steekt uit, zonder partner.', en: 'The last stretch of the G-rich strand sticks out, without a partner.' },
      p: { nl: 'Enkelstrengige G-rijke 3′-overhang; bindingsplaats voor telomerase en POT1.', en: 'Single-stranded G-rich 3′ overhang; binding site for telomerase and POT1.' } },
    { c: C.danger, t: { nl: 'gat: niet op te vullen', en: 'gap: cannot be filled' }, m: ['interne gaten: opgevuld vanaf een 3′-OH', 'internal gaps: filled from a 3′-OH'], d: { nl: 'Na het kopiëren blijft aan het uiterste einde een gat: daar is geen stuk DNA meer om van verder te bouwen. Gaten in het midden kunnen wel gevuld worden.', en: 'After copying, a gap remains at the very end: there is no more DNA there to build on. Gaps in the middle can be filled.' },
      p: { nl: 'Eindreplicatieprobleem: na verwijdering van de laatste RNA-primer ontbreekt een 3′-OH om het gat van de volgende streng te vullen.', en: 'End-replication problem: after removal of the last RNA primer there is no 3′-OH to fill the lagging-strand gap.' } },
    { c: '#ffc247', t: { nl: 'kritisch kort → senescentie', en: 'critically short → senescence' }, m: ['deling 1', 'deling 2', 'deling 3', 'deling 4', 'deling 5', 'division 1', 'division 2', 'division 3', 'division 4', 'division 5', 'geel = telomeer', 'yellow = telomere'], d: { nl: 'Bij elke deling wordt het telomeer (geel) een beetje korter. Is het te kort, dan stopt de cel blijvend met delen.', en: 'With every division the telomere (yellow) gets a little shorter. When it is too short, the cell stops dividing for good.' },
      p: { nl: 'Progressieve telomeerverkorting per deling; kritisch korte telomeren activeren een DNA-schaderespons en replicatieve senescentie.', en: 'Progressive telomere shortening per division; critically short telomeres trigger a DNA damage response and replicative senescence.' } },
    { c: C.text, t: { nl: 'telomerase actief in:', en: 'telomerase active in:' }, m: ['kiemcellen, stamcellen,', 'germ cells, stem cells,', 'de meeste kankercellen', 'most cancer cells'], d: { nl: 'Enkel in sommige cellen staat het verlengende enzym (telomerase) aan: kiemcellen, stamcellen en de meeste kankercellen.', en: 'Only in some cells is the lengthening enzyme (telomerase) switched on: germ cells, stem cells and most cancer cells.' },
      p: { nl: 'Telomerase-expressie in kiemlijn, stamcellen en de meeste tumoren; de meeste somatische cellen hebben weinig of geen activiteit.', en: 'Telomerase expression in the germline, stem cells and most tumours; most somatic cells have little or no activity.' } },
    { c: C.prot, t: 'TERT', m: ['TEN', 'TRBD', 'RT (hand)', 'CTE', 'eiwit', 'protein', 'translocatie: 6 nt', 'translocation: 6 nt'], d: { nl: 'Het eiwitdeel van telomerase. Het houdt het DNA-uiteinde en het RNA vast en bouwt nieuwe letters aan; daarna schuift het 6 letters op.', en: 'The protein part of telomerase. It holds the DNA end and the RNA and adds new letters; then it shifts along by 6 letters.' },
      p: { nl: 'Telomerase-reverse-transcriptase met domeinen TEN, TRBD (bindt hTR), RT (actieve plaats) en CTE; translocatie na elke herhaling.', en: 'Telomerase reverse transcriptase with domains TEN, TRBD (binds hTR), RT (active site) and CTE; translocation after each repeat.' } },
    { c: PRIMER, t: { nl: 'hTR (451 nt)', en: 'hTR (451 nt)' }, m: ['RNA', 'U'], d: { nl: 'Het RNA-deel van telomerase (oranje). Een kort stuk ervan dient als voorbeeld voor de nieuwe letters.', en: 'The RNA part of telomerase (orange). A short piece of it serves as the guide for the new letters.' },
      p: { nl: 'Telomerase-RNA (hTR/TERC, 451 nt); bevat de matrijs van 11 nt (3′-CAAUCCCAAUC-5′).', en: 'Telomerase RNA (hTR/TERC, 451 nt); contains the 11 nt template (3′-CAAUCCCAAUC-5′).' } },
    { c: '#ffd9b3', t: { nl: 'RNA-matrijs', en: 'RNA template' }, m: ['5 nt paren: …GTTAG-3′', '5 nt base-pair: …GTTAG-3′'], d: { nl: 'Het voorbeeldstukje in het RNA: 5 letters houden het DNA-uiteinde vast, 6 letters worden overgeschreven.', en: 'The guide piece in the RNA: 5 letters hold the DNA end, 6 letters are copied.' },
      p: { nl: 'Matrijsgebied van hTR: 5 nt hybridiseren met …GTTAG-3′, 6 nt worden als GGTTAG overgeschreven.', en: 'Template region of hTR: 5 nt hybridise with …GTTAG-3′, 6 nt are copied as GGTTAG.' } },
    { c: NEW, t: { nl: '+ GGTTAG (DNA van een RNA-matrijs)', en: '+ GGTTAG (DNA from an RNA template)' }, d: { nl: 'De nieuwe letters (turquoise): telomerase maakt DNA na van zijn eigen RNA en verlengt zo het uiteinde.', en: 'The new letters (turquoise): telomerase copies DNA from its own RNA and so lengthens the end.' },
      p: { nl: 'Reverse transcriptie: één nieuwe TTAGGG-herhaling per ronde aan het 3′-uiteinde.', en: 'Reverse transcription: one new TTAGGG repeat per round at the 3′ end.' } },
    { c: C.prot3, t: 'CST · Pol α-primase', d: { nl: 'Eiwitten die daarna de andere streng aanvullen. Een kort uitstekend stuk blijft over.', en: 'Proteins that then fill in the other strand. A short overhang remains.' },
      p: { nl: 'Het CST-complex rekruteert Pol α-primase voor de opvulsynthese van de C-streng.', en: 'The CST complex recruits Pol α-primase for C-strand fill-in synthesis.' } },
    { c: C.text, t: { nl: 'shelterin (6 eiwitten; TRF1 en TRF2 elk als dimeer)', en: 'shelterin (6 proteins; TRF1 and TRF2 each as a dimer)' }, d: { nl: 'Een kap van zes eiwitten op het uiteinde. Zo houdt de cel het niet voor een breuk.', en: 'A cap of six proteins on the end. That way the cell does not mistake it for a break.' },
      p: { nl: 'Shelterincomplex (TRF1, TRF2, RAP1, TIN2, TPP1, POT1); onderdrukt DNA-schadesignalering en herstel aan de telomeren.', en: 'Shelterin complex (TRF1, TRF2, RAP1, TIN2, TPP1, POT1); suppresses DNA damage signalling and repair at telomeres.' } },
    { c: C.prot2, t: 'TRF2', d: { nl: 'Een eiwit uit twee helften dat op het dubbele telomeer-DNA zit en helpt de lus te vormen.', en: 'A protein of two halves that sits on the double telomeric DNA and helps form the loop.' },
      p: { nl: 'Homodimeer dat dubbelstrengig TTAGGG bindt; bevordert de T-lus en onderdrukt de ATM-respons.', en: 'Homodimer binding double-stranded TTAGGG; promotes the t-loop and suppresses the ATM response.' } },
    { c: C.prot, t: 'TRF1', d: { nl: 'Een tweede eiwit uit twee helften op het dubbele telomeer-DNA.', en: 'A second protein of two halves on the double telomeric DNA.' },
      p: { nl: 'Homodimeer dat dubbelstrengig TTAGGG bindt; regelt telomeerlengte en -replicatie.', en: 'Homodimer binding double-stranded TTAGGG; regulates telomere length and replication.' } },
    { c: C.prot3, t: 'RAP1', d: { nl: 'Een klein eiwit dat op TRF2 zit.', en: 'A small protein that sits on TRF2.' },
      p: { nl: 'Bindt TRF2; geen eigen DNA-binding aan het telomeer.', en: 'Binds TRF2; no DNA binding of its own at the telomere.' } },
    { c: C.prot3, t: 'TIN2', d: { nl: 'De brug: raakt TRF1 en TRF2 en houdt TPP1 vast.', en: 'The bridge: touches TRF1 and TRF2 and holds TPP1.' },
      p: { nl: 'Centraal schakeleiwit tussen TRF1, TRF2 en TPP1.', en: 'Central linker between TRF1, TRF2 and TPP1.' } },
    { c: C.prot3, t: 'TPP1', d: { nl: 'Verbindt TIN2 met POT1 en roept telomerase op.', en: 'Links TIN2 to POT1 and calls in telomerase.' },
      p: { nl: 'Vormt een heterodimeer met POT1 en rekruteert telomerase via zijn TEL-patch.', en: 'Forms a heterodimer with POT1 and recruits telomerase via its TEL patch.' } },
    { c: '#b07cf0', t: 'POT1', d: { nl: 'Zit op het uitstekende, enkele stuk DNA en beschermt het.', en: 'Sits on the protruding single stretch of DNA and protects it.' },
      p: { nl: 'Bindt de enkelstrengige 3′-overhang; onderdrukt de ATR-respons.', en: 'Binds the single-stranded 3′ overhang; suppresses the ATR response.' } },
    { c: C.text, t: { nl: 'T-lus', en: 't-loop' }, m: ['D-lus', 'D-loop'], d: { nl: 'Het uiteinde buigt terug en steekt zijn uitstekend stuk in het dubbele DNA. Zo verstopt het zich.', en: 'The end bends back and tucks its overhang into the double DNA. That way it hides.' },
      p: { nl: 'T-lus: de 3′-overhang dringt het dubbelstrengige telomeer binnen en vormt een D-lus; maskeert het uiteinde.', en: 't-loop: the 3′ overhang invades the double-stranded telomere and forms a D-loop; masks the end.' } },
    { c: C.dna, t: { nl: 'G-quadruplex (mogelijk)', en: 'G-quadruplex (possible)' }, d: { nl: 'De G-rijke losse streng kan misschien ook vouwen tot een blokje van vier G’s.', en: 'The G-rich single strand may also fold into a block of four G’s.' },
      p: { nl: 'G-quadruplex: gestapelde G-tetraden gevormd door G-rijk ssDNA; de rol in vivo aan telomeren is nog onzeker.', en: 'G-quadruplex: stacked G-tetrads formed by G-rich ssDNA; its in vivo role at telomeres is still uncertain.' } },
  ],
  steps: [
    S(8000, cam(620, 400, 1250), 'Het uiteinde van een chromosoom', 'The end of a chromosome',
      'Chromosomen eindigen in telomeren: vele herhalingen van TTAGGG. Eén streng steekt aan het eind een stukje uit.',
      'Chromosomes end in telomeres: many repeats of TTAGGG. One strand sticks out a little at the very end.'),
    S(9000, cam(720, 660, 1200), 'Het laatste stukje lukt niet', 'The very last bit fails',
      'Het laatste startstukje van RNA valt weg. Dat gat kan niet opgevuld worden: er is geen startpunt meer.',
      'The last RNA starter piece is removed. That gap cannot be filled: there is no starting point left.'),
    S(8000, cam(700, 700, 1290), 'Elke deling een beetje korter', 'A little shorter every division',
      'In de meeste cellen worden telomeren zo bij elke deling korter. Zijn ze te kort, dan stopt de cel met delen.',
      'In most cells telomeres thus get shorter with every division. When they are too short, the cell stops dividing.'),
    S(8000, cam(1125, 440, 830), 'Telomerase grijpt het uiteinde', 'Telomerase grabs the end',
      'Het enzym telomerase draagt een eigen stukje RNA mee. Een deel van dat RNA past op het uitstekende DNA-uiteinde.',
      'The enzyme telomerase carries its own piece of RNA. Part of that RNA pairs with the protruding DNA end.'),
    S(9000, cam(1170, 440, 820), 'Telomerase verlengt het DNA', 'Telomerase lengthens the DNA',
      'Telomerase gebruikt zijn RNA als mal en hangt er één voor één G, G, T, T, A, G aan het DNA.',
      'Telomerase uses its RNA as a template and adds G, G, T, T, A, G to the DNA one by one.'),
    S(8000, cam(1260, 440, 820), 'Opschuiven en opnieuw', 'Shift and repeat',
      'Daarna schuift telomerase op naar het nieuwe uiteinde. Zo kan het vele herhalingen na elkaar toevoegen.',
      'Then telomerase shifts along to the new end. This way it can add many repeats in a row.'),
    S(8000, cam(1030, 440, 1060), 'De andere streng wordt aangevuld', 'The other strand is filled in',
      'Andere eiwitten vullen de tweede streng aan, met een nieuw startstukje. Het uiteinde blijft iets uitsteken.',
      'Other proteins fill in the second strand, using a new starter piece. The end still sticks out a little.'),
    S(8000, cam(810, 420, 1440), 'Een eiwitkap beschermt het uiteinde', 'A protein cap protects the end',
      'Een groep van zes eiwitten (shelterin) bedekt het telomeer. Zo ziet de cel het uiteinde niet als een DNA-breuk.',
      'A group of six proteins (shelterin) covers the telomere. So the cell does not mistake the end for a DNA break.'),
    S(8000, cam(760, 440, 1300), 'Het uiteinde verstopt zich', 'The end hides away',
      'Het uitstekende staartje kan terugvouwen in het telomeer-DNA. In die lus (T-lus) zit het einde verstopt.',
      'The protruding tail can fold back into the telomere DNA. In this loop (t-loop) the end is hidden.'),
  ],
  svg() {
    return svgOpen() + `
    <g data-node="rt" data-nolabel data-color="${C.prot}"><g id="tl-tert"></g></g>
    <g id="tl-main"></g>
    <g id="tl-er"></g>
    <g id="tl-tlp"></g>
    <g data-node="rt" data-color="${PRIMER}" data-label="${T2('Reverse transcriptase (vgl. HIV)', 'Reverse transcriptase (cf. HIV)')}"><g id="tl-rt"></g><circle id="tl-rta" data-anchor="rt" data-pos="below" cx="-99" cy="-99" r="1" fill="none"/></g>
    <g data-node="noncanon" data-color="${C.dna}" data-label="${T2('G-quadruplex', 'G-quadruplex')}"><g id="tl-g4"></g><circle id="tl-g4a" data-anchor="noncanon" cx="-99" cy="-99" r="1" fill="none"/></g>
    <g data-node="dsb" data-color="${C.ok}" data-label="${T2('Echte DNA-breuken → herstel', 'Real DNA breaks → repair')}"><g id="tl-hr"></g><circle id="tl-hra" data-anchor="dsb" cx="-99" cy="-99" r="1" fill="none"/></g>
    <g data-node="chromosoom" data-color="${C.dna}" data-label="${T2('↑ Chromosoom', '↑ Chromosome')}">
      <g id="tl-chr"></g>
    </g>
    <g data-node="replicatie" data-color="${C.dna}" data-label="${T2('↑ Replicatie', '↑ Replication')}"><g id="tl-rep"></g><circle id="tl-repa" data-anchor="replicatie" cx="-99" cy="-99" r="1" fill="none"/></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const place = (id, x, y) => { const e = $(id); e.setAttribute('cx', f1(x)); e.setAttribute('cy', f1(y)); };
    return {
      update(t, s) {
        const { step, p } = s;
        /* ---------- hoofdtekening: lettermodel van het uiteinde (stappen 0, 3–7) ---------- */
        const showMain = step === 0 || (step >= 3 && step <= 7) || (step === 8 && p < .25);
        const mainOp = step === 8 ? 1 - sub(p, 0, .25) : step === 0 ? 1 : 1;
        let m = '', tertS = '';
        const lo = step === 7 ? 1 - sub(p, 0, .2) : step === 8 ? 0 : 1;   // letters weg in het brede shelterinbeeld
        if (showMain) {
          // hoeveel nt zijn er toegevoegd?
          const add1 = step < 4 ? 0 : step === 4 ? Math.floor(sub(p, .1, .85) * 6.999) : 6;
          const add2 = step < 5 ? 0 : step === 5 ? Math.floor(sub(p, .55, .95) * 6.999) : 6;
          const top = TOP + ADD.slice(0, add1) + (add1 === 6 ? ADD.slice(0, add2) : '');
          const nT = top.length;
          // C-streng: vast tot ND; in stap 6 aangevuld (primer + DNA) tot ND+16
          const fill = step < 6 ? 0 : step === 6 ? sub(p, .15, .8) : 1;
          const bEnd = ND + Math.round(16 * fill);
          const primOn = step >= 6;
          // ruggengraten
          m += seg(X0 - 20, YT - 8, xOf(nT - 1) + 12, YT - 8, C.dna, 6) + seg(X0 - 20, YB + BH + 8, xOf(bEnd - 1) + 12, YB + BH + 8, C.dna2, 6);
          if (bEnd > ND) m += seg(xOf(ND) - 12, YB + BH + 8, xOf(bEnd - 1) + 12, YB + BH + 8, NEW, 6) + seg(xOf(Math.max(ND, bEnd - 4)) - 12, YB + BH + 8, xOf(bEnd - 1) + 12, YB + BH + 8, PRIMER, 6, primOn ? 1 : 0);
          for (let i = 0; i < nT; i++) {
            const x = xOf(i), b = top[i];
            const isNew = i >= TOP.length;
            m += ntL(x, YT, b, 22, BH, lo);
            if (isNew) m += `<rect x="${x - 12}" y="${YT - 2}" width="24" height="${BH + 4}" rx="5" fill="none" stroke="${NEW}" stroke-width="2.5"/>`;
            if (i < bEnd) {
              const c = i >= bEnd - 4 && i >= ND ? RNAC[b] : DNAC[b];
              m += seg(x, YT + BH + 1, x, YB - 1, '#5b6a8c', 2) + ntL(x, YB, c, 22, BH, lo);
            }
          }
          m += endl(X0 - 44, YT + 17, "5′", C.dna) + endl(xOf(nT - 1) + 32, YT + 17, "3′", C.dna);
          m += endl(X0 - 44, YB + 17, "3′", C.dna2) + endl(xOf(bEnd - 1) + 32, YB + 17, "5′", bEnd > ND ? PRIMER : C.dna2, 17);
          // herhalingen onderstrepen in stap 0
          if (step === 0) {
            for (let r = 0; r < 6; r++) m += `<g opacity="${f1(ease(sub(p, .1 + r * .06, .2 + r * .06)))}">` + seg(xOf(r * 6) - 11, YT - 22, xOf(r * 6 + 5) + 11, YT - 22, '#ffc247', 3) + txt((xOf(r * 6) + xOf(r * 6 + 5)) / 2, YT - 30, 'TTAGGG', '#ffc247', 18, 'middle', 700, 'JetBrains Mono') + '</g>';
            m += tag(xOf(ND) + 180, YB + 90, T2("3′-overhang (enkelstrengig)", "3′ overhang (single-stranded)"), C.dna, 18, 'middle', sub(p, .5, .7));
            m += tag(xOf(10), YB + 90, T2('dubbelstrengig telomeer-DNA', 'double-stranded telomeric DNA'), C.text, 18, 'middle', sub(p, .4, .6));
            m += arrow(1330, YT + 12, 1440, YT + 12, C.muted, 3, sub(p, .6, .8)) + tag(1385, YT - 8, T2('uiteinde', 'end'), C.muted, 19, 'middle', sub(p, .6, .8));
          }
          // telomerase (stappen 3–5)
          // in stap 6 laat telomerase zichtbaar los (vervaagt en zakt weg) i.p.v. in één keer te verdwijnen
          if ((step >= 3 && step <= 5) || (step === 6 && p < .22)) {
            const kIn = step === 3 ? ease(sub(p, .05, .4)) : step === 6 ? 1 - ease(sub(p, .04, .22)) : 1;
            const shift = step === 5 ? ease(sub(p, .1, .45)) * 6 : step === 6 ? 6 : 0;
            const jStart = TOP.length - 5 + shift;                    // DNA-index onder matrijspositie 0 (3'-uiteinde)
            const yR = YB + (1 - kIn) * 90;
            // TERT-lichaam (achter de letters: wordt vooraan in m gezet)
            const cx = xOf(jStart + 5), cy = (YT + YB + BH) / 2 + 40 + (1 - kIn) * 90;
            // TERT-domeinen als ring rond matrijs en DNA: TEN (bij het DNA), TRBD (bindt hTR), RT-'hand' (vingers–palm, actieve plaats
            // onder de matrijs), CTE ('duim'); Nguyen et al. 2018 (cryo-EM menselijk telomerase)
            const dom = (x, y, rx, ry, sd, lab, lx, ly) => `<path d="${eiwitPad(x, y, rx, ry, sd, .08)}" fill="${C.prot}" fill-opacity=".2" stroke="#b39dff" stroke-width="2.5"/>` + txt(lx ?? x, ly ?? y + 6, lab, '#d6ccff', 17, 'middle', 700);
            const tert = `<g opacity="${f1(kIn)}"><path d="${eiwitPad(cx, cy, 250, 140, 33, .06)}" fill="${C.prot}" fill-opacity=".08" stroke="${C.prot}" stroke-width="3"/>` +
              // ring TRBD–RT–CTE rond het DNA:RNA-hybride; RT (actieve plaats) recht onder het 3′-uiteinde van het DNA; TEN bij het DNA stroomopwaarts
              dom(xOf(jStart) - 88, YB + 16, 30, 32, 34, 'TEN') + dom(cx - 165, YB + BH + 46, 52, 26, 35, 'TRBD', cx - 165, YB + BH + 92) +
              dom(xOf(jStart + 7), YB + BH + 44, 78, 22, 36, T2('RT (hand)', 'RT (hand)'), xOf(jStart + 7), YB + BH + 86) + dom(cx + 172, YB + BH + 40, 40, 30, 37, 'CTE') +
              `<circle cx="${f1(clamp(xOf(nT), xOf(jStart + 2), xOf(jStart + 10)))}" cy="${f1(YB + BH + 14)}" r="5" fill="#ffd36b"/>`   /* actieve plaats: waar de volgende letter bijkomt */ +
              txt(cx + 150, cy + 128, 'TERT', '#fff', 22, 'middle', 700) + '</g>';   // binnen de rand, rechts naast de RNA-lus
            tertS = tert;
            // hTR: matrijs + (gestippeld) de rest van het 451-nt RNA
            let r = '';
            for (let j = 0; j < 11; j++) r += nt(xOf(jStart + j), yR, TEMPL[j], 22, BH);
            r += seg(xOf(jStart) - 12, yR + BH + 8, xOf(jStart + 10) + 12, yR + BH + 8, PRIMER, 6);
            const xl = xOf(jStart) - 12, xr = xOf(jStart + 10) + 12, yb = yR + BH + 8;
            r += `<path d="M${f1(xl)},${f1(yb)} C${f1(xl - 90)},${f1(yb + 20)} ${f1(xl - 70)},${f1(yb + 110)} ${f1(xl + 60)},${f1(yb + 105)} S${f1(xr + 60)},${f1(yb + 120)} ${f1(xr)},${f1(yb)}" stroke="${PRIMER}" stroke-width="5" fill="none" stroke-dasharray="4 7"/>`;
            r += endl(xOf(jStart) - 32, yR + 17, "3′", PRIMER, 16) + endl(xOf(jStart + 10) + 32, yR + 17, "5′", PRIMER, 16);
            r += txt(xl - 95, yb + 60, T2('hTR (451 nt)', 'hTR (451 nt)'), PRIMER, 18, 'end', 700);
            m += `<g opacity="${f1(kIn)}">${r}</g>`;
            // paringsstreepjes
            const nTop = top.length;
            for (let j = 0; j < 11; j++) { const i = Math.round(jStart) + j; if (i < nTop && kIn > .95 && Math.abs(shift - Math.round(shift)) < .01) m += seg(xOf(i), YT + BH + 1, xOf(i), YB - 1, '#c9b8ff', 2); }
            if (step === 3) m += tag(xOf(TOP.length - 3), YT - 90, T2('5 nt paren: …GTTAG-3′', '5 nt base-pair: …GTTAG-3′'), C.text, 17, 'middle', sub(p, .45, .65));
            if (step === 4) m += tag(xOf(TOP.length + 3), YT - 90, T2('+ GGTTAG (DNA van een RNA-matrijs)', '+ GGTTAG (DNA from an RNA template)'), NEW, 17, 'middle', sub(p, .1, .25));
            if (step === 5) m += arrow(xOf(TOP.length) - 40, YT - 90, xOf(TOP.length) + 120, YT - 90, C.text, 4, sub(p, .05, .2)) + tag(xOf(TOP.length) + 40, YT - 76 - 30, T2('translocatie: 6 nt', 'translocation: 6 nt'), C.text, 17, 'middle', sub(p, .05, .2));
            if (step <= 5) place('tl-rta', cx + 250, cy + 118); else place('tl-rta', -99, -99);
          } else place('tl-rta', -99, -99);
          // CST / Pol α-primase (stap 6)
          if (step === 6) {
            const k = ease(sub(p, 0, .2)) * (1 - sub(p, .85, 1));
            const x = xOf(bEnd - 1) + 40;
            m += prot(x + 40, YB + 100, 110, 38, C.prot3, 'CST · Pol α-primase', 16, k);
            m += tag(xOf(ND + 8), YT - 40, T2("3′-overhang blijft over", "3′ overhang remains"), C.dna, 17, 'middle', sub(p, .8, .95));
          }
          // shelterin (stap 7)
          if (step === 7) {
            const k = i => ease(sub(p, .05 + i * .1, .2 + i * .1));
            // 6 eiwitten, 6 vormen; TRF1 en TRF2 elk één homodimeer op het dubbelstrengige TTAGGG. TIN2 is de brug tussen TRF1, TRF2
            // en TPP1; TPP1 houdt POT1 vast, dat het enkelstrengige 3'-uiteinde bindt; RAP1 zit op TRF2 (de Lange, Genes Dev 2005).
            const dimeer = (x, y, col, lab, op) => prot(x - 37, y, 40, 30, col, '', 20, op, '', 11) + prot(x + 37, y, 40, 30, col, '', 20, op, '', 12) + (op > .01 ? `<g opacity="${f1(op)}">${txt(x, y + 7, lab, '#fff', 20, 'middle', 700)}</g>` : '');   // homodimeer: twee halfjes
            m += dimeer(870, 490, C.prot2, 'TRF2', k(0)) + dimeer(1030, 490, C.prot, 'TRF1', k(0));
            m += prot(760, 548, 62, 28, C.prot3, 'RAP1', 20, k(1));
            m += prot(1000, 548, 112, 28, C.prot3, 'TIN2', 20, k(2));   // TIN2 raakt TRF2 én TRF1 tegelijk en houdt TPP1 vast (Srinivas et al., Cancers 2020, PMID 32121056, gelezen)
            m += prot(1180, 492, 64, 28, C.prot3, 'TPP1', 20, k(3)) + prot(1290, 433, 76, 30, '#b07cf0', 'POT1', 21, k(3));   // POT1 op het enkelstrengige 3'-uiteinde, TPP1 tussen POT1 en TIN2
            m += tag(760, 190, T2('shelterin (6 eiwitten; TRF1 en TRF2 elk als dimeer)', 'shelterin (6 proteins; TRF1 and TRF2 each as a dimer)'), C.text, 28, 'middle', sub(p, .55, .7));
          }
        } else place('tl-rta', -99, -99);
        $('tl-tert').innerHTML = tertS ? `<g opacity="${f1(mainOp)}">${tertS}</g>` : '';
        $('tl-main').innerHTML = `<g opacity="${f1(mainOp)}">${m}</g>`;
        $('tl-rt').innerHTML = step >= 3 && step <= 5 ? `<rect x="${f1(+$('tl-rta').getAttribute('cx') - 60)}" y="${f1(+$('tl-rta').getAttribute('cy') - 20)}" width="120" height="40" fill="transparent"/>` : '';

        /* ---------- stap 1–2: eindreplicatieprobleem en verkorting ---------- */
        let e = '';
        if (step === 1) {
          const Y = 610, xa = 180, xe = 1250;
          e += seg(xa, Y, xe, Y, C.dna, 7) + endl(xa - 30, Y + 6, "5′", C.dna) + endl(xe + 30, Y + 6, "3′", C.dna);
          e += tag(xe, Y - 30, T2('uiteinde chromosoom →', 'chromosome end →'), C.muted, 17, 'end');
          e += tag(xa + 10, Y - 30, T2('matrijs: G-rijke streng', 'template: G-rich strand'), C.dna, 17, 'start');
          const Yn = Y + 34;
          const frags = [[xa, 540], [540, 900], [900, xe]];         // elk fragment: 3' links, 5' (primer) rechts
          const kRem = step === 1 ? ease(sub(p, .3, .6)) : 1;
          frags.forEach(([a, b], i) => {
            const last = i === frags.length - 1;
            const prim = 50;
            // DNA-deel
            e += seg(a + 4, Yn, b - prim, Yn, NEW, 7);
            // primer: intern vervangen door DNA (van het fragment rechts ervan... nee: verlenging van het fragment links)
            if (!last) {
              e += seg(b - prim, Yn, b - 4, Yn, PRIMER, 7, 1 - kRem) + seg(b - prim, Yn, b + 4, Yn, NEW, 7, kRem);
            } else {
              e += seg(b - prim, Yn, b - 4, Yn, PRIMER, 7, 1 - kRem);
              if (kRem > .5) e += `<rect x="${b - prim}" y="${Yn - 12}" width="${prim + 4}" height="24" rx="6" fill="none" stroke="${C.danger}" stroke-width="3" stroke-dasharray="6 4"/>`;
            }
          });
          e += endl(xa - 30, Yn + 6, "3′", NEW) + endl(xe - 70, Yn + 40, "5′", NEW, 16, kRem);
          e += tag(xe, Yn + 70, T2('gat: niet op te vullen', 'gap: cannot be filled'), C.danger, 18, 'end', step === 1 ? sub(p, .55, .7) : 1);
          e += tag(640, Yn + 70, T2("interne gaten: opgevuld vanaf een 3′-OH", "internal gaps: filled from a 3′-OH"), C.muted, 17, 'middle', step === 1 ? sub(p, .35, .5) : 0);
        }
        if (step === 2 || (step === 3 && p < .06)) {   // in stap 3 vervaagt de grafiek i.p.v. meteen te verdwijnen
          const pp = step === 2 ? p : 1, fade = step === 3 ? 1 - sub(p, 0, .06) : 1;
          let e2 = '';
          {
            const lens = [820, 740, 660, 580, 440];
            lens.forEach((w, i) => {
              const k = i === 0 ? 1 : lerp(.3, 1, ease(sub(pp, .05 + i * .12, .2 + i * .12)));   // alle balken staan er (vaag) vanaf p = 0
              const y = 600 + i * 50;
              e2 += `<g opacity="${f1(k)}">` + txt(250, y + 7, T2(`deling ${i + 1}`, `division ${i + 1}`), C.muted, 18, 'end') + `<rect x="270" y="${y - 10}" width="${w}" height="20" rx="4" fill="${C.dna}" fill-opacity=".6"/>` +
                `<rect x="${270 + w - 120}" y="${y - 10}" width="120" height="20" rx="4" fill="#ffc247" fill-opacity=".8"/>` + '</g>';
            });
            e2 += `<line x1="${270 + 500}" y1="570" x2="${270 + 500}" y2="${600 + 4 * 50 + 22}" stroke="${C.danger}" stroke-width="3" stroke-dasharray="7 5" opacity="${f1(lerp(.35, 1, sub(pp, .6, .7)))}"/>`;
            e2 += tag(270 + 500, 556, T2('kritisch kort → senescentie', 'critically short → senescence'), C.danger, 18, 'middle', lerp(.35, 1, sub(pp, .62, .75)));
            e2 += tag(1200, 660, T2('telomerase actief in:', 'telomerase active in:'), C.text, 19, 'middle', sub(pp, .75, .88));
            e2 += tag(1200, 690, T2('kiemcellen, stamcellen,', 'germ cells, stem cells,'), C.muted, 18, 'middle', sub(pp, .75, .88));
            e2 += tag(1200, 716, T2('de meeste kankercellen', 'most cancer cells'), C.muted, 18, 'middle', sub(pp, .75, .88));
            e2 += tag(270, 556, T2('geel = telomeer', 'yellow = telomere'), '#ffc247', 18, 'start', 1);
          }
          e += `<g opacity="${f1(fade)}">${e2}</g>`;
        }
        $('tl-er').innerHTML = e;

        /* ---------- stap 8: T-lus en G-quadruplex ---------- */
        let tlp = '', g4 = '', hr = '';
        if (step === 8) {
          const k = ease(sub(p, .15, .5));
          const Y = 470, g = 22, R = 150, CX = 760, CYc = Y - R;
          const TH1 = 145 * Math.PI / 180;                       // einde van de lus (links-onder op de cirkel)
          // G-streng (boven, binnenste straal) met D-lus-bult tussen x=420 en 560
          const gpts = [];
          for (let x = 120; x <= CX; x += 5) { const bump = x > 420 && x < 560 ? 34 * Math.sin(Math.PI * (x - 420) / 140) : 0; gpts.push([x, Y - g / 2 - bump]); }
          for (let a = 90; a >= -215; a -= 4) { const t = a * Math.PI / 180; gpts.push([CX + (R - g / 2) * Math.cos(t), CYc + (R - g / 2) * Math.sin(t)]); }
          const cpts = [];
          for (let x = 120; x <= CX; x += 5) cpts.push([x, Y + g / 2]);
          for (let a = 90; a >= -215; a -= 4) { const t = a * Math.PI / 180; cpts.push([CX + (R + g / 2) * Math.cos(t), CYc + (R + g / 2) * Math.sin(t)]); }
          const e = gpts[gpts.length - 1];
          tlp += `<g opacity="${f1(k)}">`;
          for (let x = 130; x < CX; x += 16) if (!(x > 410 && x < 570)) tlp += seg(x, Y - g / 2, x, Y + g / 2, '#3b4c70', 3);
          tlp += pth(cpts, C.dna2, 7) + pth(gpts, C.dna, 7);
          // 3'-overhang: van het lusuiteinde omlaag tussen de strengen, gepaard met de C-streng
          tlp += `<path d="M${f1(e[0])},${f1(e[1])} C${f1(e[0] - 30)},${f1(e[1] + 40)} ${f1(580)},${f1(Y)} ${f1(545)},${f1(Y)} L430,${Y}" stroke="${C.dna}" stroke-width="7" fill="none"/>`;
          for (let x = 436; x < 545; x += 16) tlp += seg(x, Y, x, Y + g / 2, '#8fb0e8', 3);
          tlp += endl(410, Y + 6, "3′", C.dna, 16);
          tlp += txt(490, Y - 56, T2('D-lus', 'D-loop'), C.text, 20);
          tlp += txt(CX, CYc + 10, T2('T-lus', 't-loop'), C.text, 28, 'middle', 700);
          tlp += prot(640, Y + 66, 70, 30, C.prot2, 'TRF2', 20);
          tlp += '</g>';
          tlp += tag(250, Y - 40, T2('dubbelstrengig telomeer', 'double-stranded telomere'), C.muted, 19, 'middle', k);
          // G-quadruplex-icoon
          const kg = ease(sub(p, .55, .75));
          const gx = 1190, gy = 330;
          for (let lvl = 0; lvl < 3; lvl++) g4 += `<rect x="${gx - 40 + lvl * 8}" y="${gy - 20 + lvl * 18}" width="64" height="30" rx="4" fill="${BASE.G}" fill-opacity=".25" stroke="${BASE.G}" stroke-width="2.5" transform="skewX(-20)"/>`;
          g4 = `<g opacity="${f1(kg)}">${g4}${txt(gx - 10, gy + 92, T2('G-quadruplex (mogelijk)', 'G-quadruplex (possible)'), C.text, 20)}</g>`;
          place('tl-g4a', gx, gy - 30);
          hr = `<g opacity="${f1(sub(p, .7, .85))}"><rect x="1015" y="616" width="350" height="52" rx="26" fill="rgba(127,220,106,.12)" stroke="${C.ok}" stroke-width="2"/>${txt(1190, 649, T2('zonder bescherming: breuk?', 'without protection: a break?'), C.text, 20)}</g>`;
          place('tl-hra', 1190, 616);
        } else { place('tl-g4a', -99, -99); place('tl-hra', -99, -99); }
        $('tl-tlp').innerHTML = tlp; $('tl-g4').innerHTML = g4; $('tl-hr').innerHTML = hr;

        /* ---------- chromosoom-icoontje en link naar replicatie ---------- */
        const chrOp = step === 0 || step === 8 ? 1 : 0;
        $('tl-chr').innerHTML = chrOp ? `<g transform="translate(${step === 0 ? 190 : 290} ${step === 0 ? 170 : 180})">
          <rect x="-60" y="-18" width="140" height="36" rx="18" fill="${C.dna}" fill-opacity=".45" stroke="${C.dna}" stroke-width="2"/>
          <rect x="-8" y="-18" width="14" height="36" fill="${C.bg}" opacity=".6"/>
          <circle cx="76" cy="0" r="10" fill="#ffc247"/><circle cx="-56" cy="0" r="10" fill="#ffc247"/>
          ${txt(10, 50, T2('telomeren aan beide uiteinden', 'telomeres at both ends'), C.muted, 18)}</g>` : '';
        $('tl-rep').innerHTML = step === 1 ? `<g transform="translate(300 800)"><rect x="-110" y="-22" width="220" height="44" rx="22" fill="rgba(79,143,247,.15)" stroke="${C.dna}" stroke-width="2"/>${txt(0, 7, T2('↑ replicatievork', '↑ replication fork'), C.text, 18)}</g>` : '';
        if (step === 1) place('tl-repa', 300, 778); else place('tl-repa', -99, -99);
      },
    };
  },
};

/* 3D-stappen na stap 5: PDB 7QXA, kerndeel van menselijke telomerase met telomeer-DNA en TPP1 (cryo-EM 3,2 Å; Sekne et al., Science 2022).
 * Lokale kopie data/pdb/7QXA.cif is ingekort tot CA- en P-atomen (15 576 → 1 512 atomen), daarom een bolletjesmodel.
 * Ketens (nagekeken in het mmCIF 05-11-2026): A = TERT · B = hTR (gemodelleerd 26–333 van 451 nt; matrijs 46–56)
 *   · N = telomeer-DNA (TTAGGG)5, gemodelleerd 19–30 · O = TPP1 · L, M = histonen H2A, H2B.
 *  - Het 3'-uiteinde van het DNA paart met de matrijs: G30·C50, G29·C51, G28·C52, A27·U53, T26/T25·A54/A55 (afstanden ≤ 3,3 Å). */
const TPL = '#ffd9b3', OTHER = '#7f8fb0';
const sp = (sel, color, radius = 2.2) => ({ sel, style: { sphere: { color, radius } } });
const TPL_SEL = { chain: 'B', resi: [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56] };

export default with3d(scene, {
  models: { tert: { pdb: '7QXA' } },
  after: {
    5: [
      { dur: 9000, model: 'tert', spin: .01, zoom: {},
        title: { nl: 'Echte telomerase: eiwit en RNA in één', en: 'Real telomerase: protein and RNA in one' },
        text: { nl: 'Een echte meting toont het eiwit (paars) dat zijn lange RNA (oranje) vasthoudt.', en: 'A real measurement shows the protein (purple) holding its long RNA (orange).' },
        show: [sp({ chain: 'A' }, C.prot, 1.5), sp({ chain: 'B' }, PRIMER, 2.6), sp(TPL_SEL, TPL, 2.6), sp({ chain: ['O', 'L', 'M'] }, OTHER, 1.6), sp({ chain: 'N' }, C.dna, 4),
          { ...sp({ chain: 'A', resi: 600 }, C.prot), label: { nl: 'eiwit', en: 'protein' } },
          { ...sp({ chain: 'B', resi: 180 }, PRIMER, 2.6), label: 'RNA' },
          // label op het DNA-stuk dat het verst van het eiwit ligt (N 26)
          { ...sp({ chain: 'N', resi: 26 }, C.dna, 4), label: 'DNA' }] },
      { dur: 9000, model: 'tert', spin: .008, zoom: { chain: 'B', resi: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62] },
        title: { nl: 'Het DNA-uiteinde ligt op de RNA-matrijs', en: 'The DNA end lies on the RNA template' },
        text: { nl: 'Het uiteinde van het DNA paart met een kort stukje RNA: daar komen de nieuwe letters bij.', en: 'The end of the DNA pairs with a short piece of RNA: that is where the new letters are added.' },
        show: [sp({ chain: ['A', 'O', 'L', 'M'] }, '#33415c', .55), sp({ chain: 'B' }, PRIMER, 1.2), sp(TPL_SEL, TPL, 3), sp({ chain: 'N' }, C.dna, 3),
          { ...sp({ chain: 'B', resi: 47 }, TPL, 3), label: { nl: 'RNA-matrijs', en: 'RNA template' } },
          { ...sp({ chain: 'N', resi: 30 }, C.dna, 3), label: { nl: 'DNA-uiteinde', en: 'DNA end' } }] },
    ],
  },
});
