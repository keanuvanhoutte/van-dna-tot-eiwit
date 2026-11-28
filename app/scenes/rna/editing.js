import { C, BASE, L, T2, svgOpen, cam, FULL, sub, ease, lerp, clamp, f1, aa } from '../../kit.js';
import { prot, note, arrow, ntBox, ntRow, hb, npairs, hot, setHot } from './_rna.js';
import { eiwitPad } from '../../bio.js';

/*
 * RNA-editing bij de mens. Links: A→I door ADAR2 (GluA2-pre-mRNA, Q/R-plaats). Rechts: C→U door APOBEC1 (apoB-mRNA, C6666).
 * Flankerende sequenties zijn schematisch; de codons (CAG → CIG, CAA → UAA) zijn echt.
 */
const TOP = 'GUCCAGAUUGC', BOT = 'CAGGCCUAACG';     // BOT staat onder TOP (antiparallel, 3'→5' van links naar rechts); positie 4: A tegenover C
const EA = 4, W = 44, X0 = 170, YT = 420, YB = 510;
const AX = 900, AY = 470, AW = 42;                // apoB-rij
const APO = ['N', 'N', 'N', ' ', 'C', 'A', 'A', ' ', 'N', 'N', 'N', ' ', 'N', 'N', 'N'];
const ST = (dur, c, nl, en, tnl, ten) => ({ dur, cam: c, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'editing',
  title: { nl: 'RNA-editing', en: 'RNA editing' },
  scale: '≈ 10 nm',
  time: { nl: 'tijdens/na transcriptie (hier vertraagd)', en: 'during/after transcription (slowed down here)' },
  org: { nl: 'mens (hersenen, dunne darm)', en: 'human (brain, small intestine)' },
  legend: [[BASE.A, 'A'], [BASE.U, 'U'], [BASE.G, 'G'], [BASE.C, 'C'], ['#e7e7e7', { nl: 'I (inosine)', en: 'I (inosine)' }], [C.prot, { nl: 'ADAR2, APOBEC1, A1CF', en: 'ADAR2, APOBEC1, A1CF' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Beide reacties zijn <b>hydrolytische deamineringen</b>: een aminogroep (–NH₂) wordt vervangen door een ketogroep (=O). Adenine wordt zo hypoxanthine (nucleoside: inosine), cytosine wordt uracil. Het genoom blijft onveranderd.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Both reactions are <b>hydrolytic deaminations</b>: an amino group (–NH₂) is replaced by a keto group (=O). Adenine thus becomes hypoxanthine (nucleoside: inosine), cytosine becomes uracil. The genome stays unchanged.</p>' },
  simplified: {
    nl: 'De flankerende basen zijn schematisch (N = willekeurige base); enkel de codons CAG/CIG (GluA2, Q/R-plaats) en CAA/UAA (apoB, codon 2153) zijn echt. De GluA2-duplex wordt gevormd door het exon en een complementaire intronsequentie (ECS) en is langer en onregelmatiger dan getekend. ADAR2 werkt als dimeer; APOBEC1 vormt met A1CF (en RBM47) een editosoom dat bindt aan een “mooring”-sequentie net stroomafwaarts van C6666.',
    en: 'Flanking bases are schematic (N = any base); only the codons CAG/CIG (GluA2, Q/R site) and CAA/UAA (apoB, codon 2153) are real. The GluA2 duplex is formed by the exon and a complementary intronic sequence (ECS) and is longer and more irregular than drawn. ADAR2 acts as a dimer; APOBEC1 forms an editosome with A1CF (and RBM47) that binds a “mooring” sequence just downstream of C6666.' },
  parts: [
    { c: C.prot, t: 'ADAR2', m: ['A → I (ADAR)'], d: { nl: 'Het enzym links: het verandert in dubbel RNA een A in een I (inosine).', en: 'The enzyme on the left: in double-stranded RNA it changes an A into an I (inosine).' },
      p: { nl: 'Adenosinedeaminase acting on RNA 2; deamineert adenosine tot inosine in dubbelstrengig RNA, o.a. op de Q/R-plaats van het GluA2-pre-mRNA.', en: 'Adenosine deaminase acting on RNA 2; deaminates adenosine to inosine in double-stranded RNA, including the Q/R site of the GluA2 pre-mRNA.' } },
    { c: C.prot, t: 'deaminase', d: { nl: 'Het werkende deel van het enzym. Het ligt op de dubbele streng en verandert de uitgeklapte A.', en: 'The working part of the enzyme. It lies on the double strand and changes the flipped-out A.' },
      p: { nl: 'Katalytisch deaminasedomein (zinkafhankelijk); klapt het doeladenosine uit de helix (base flipping) in de actieve plaats.', en: 'Catalytic deaminase domain (zinc-dependent); flips the target adenosine out of the helix into the active site.' } },
    { c: '#5a4bb8', t: 'dsRBD1', m: ['dsRBD2'], d: { nl: 'Twee grijpers van het enzym die het dubbele RNA vastpakken. Een lange arm verbindt ze met het werkende deel.', en: 'Two grippers of the enzyme that hold on to the double RNA. A long arm connects them to the working part.' },
      p: { nl: 'Dubbelstrengig-RNA-bindende domeinen; herkennen de A-vorm-helix vooral via de suiker-fosfaatruggengraat en zijn met een flexibele linker aan het deaminasedomein verbonden.', en: 'Double-stranded RNA-binding domains; recognise the A-form helix mainly via the sugar-phosphate backbone and are linked to the deaminase domain by a flexible linker.' } },
    { c: C.rna, t: 'exon', d: { nl: 'De bovenste streng: een stuk RNA dat later in het boodschapper-RNA blijft en de bouwplan-letters bevat.', en: 'The upper strand: a piece of RNA that stays in the messenger RNA later and carries the blueprint letters.' },
      p: { nl: 'Exonische sequentie van het GluA2 (GRIA2)-pre-mRNA met het Q/R-codon CAG.', en: 'Exonic sequence of the GluA2 (GRIA2) pre-mRNA containing the Q/R codon CAG.' } },
    { c: '#d9854a', t: { nl: 'intron (complementair)', en: 'intron (complementary)' }, d: { nl: 'De onderste streng: een stuk dat later wordt weggeknipt. Het past op het bovenste stuk, zodat het RNA dubbel wordt.', en: 'The lower strand: a piece that is cut out later. It matches the upper piece, so the RNA becomes double.' },
      p: { nl: 'Exon-complementaire intronsequentie (ECS); vormt met het exon de dsRNA-duplex die ADAR2 als substraat nodig heeft, dus editing gebeurt vóór de splicing.', en: 'Exon complementary sequence (ECS) in the intron; together with the exon it forms the dsRNA duplex ADAR2 needs as substrate, so editing happens before splicing.' } },
    { c: BASE.A, t: 'adenosine (–NH₂)', d: { nl: 'De A vóór de verandering. Ze draagt een klein stikstofgroepje (–NH₂).', en: 'The A before the change. It carries a small nitrogen group (–NH₂).' },
      p: { nl: 'Adenosine met een aminogroep op C6 van de purine.', en: 'Adenosine with an amino group at C6 of the purine.' } },
    { c: '#e7e7e7', t: 'inosine (=O)', m: ['I'], d: { nl: 'De nieuwe base (I) na de verandering: het stikstofgroepje is vervangen door een zuurstof (=O).', en: 'The new base (I) after the change: the nitrogen group has been replaced by an oxygen (=O).' },
      p: { nl: 'Inosine (nucleoside van hypoxanthine) met een ketogroep op C6; paart met C zoals guanosine.', en: 'Inosine (the nucleoside of hypoxanthine) with a keto group at C6; pairs with C like guanosine.' } },
    { c: '#ffd36b', t: 'H₂O → NH₃', d: { nl: 'Er wordt water gebruikt en ammoniak komt vrij: zo verdwijnt het stikstofgroepje.', en: 'Water is used up and ammonia is released: that is how the nitrogen group disappears.' },
      p: { nl: 'Hydrolytische deaminering: water valt C6 aan en NH₃ wordt afgesplitst.', en: 'Hydrolytic deamination: water attacks C6 and NH₃ is released.' } },
    { c: C.muted, t: { nl: 'genoom: CAG', en: 'genome: CAG' }, m: ['RNA', 'ribosoom leest', 'ribosome reads'], d: { nl: 'Hetzelfde codewoord drie keer: CAG in het DNA, CIG in het RNA, en het ribosoom leest dat als CGG.', en: 'The same code word three times: CAG in the DNA, CIG in the RNA, and the ribosome reads it as CGG.' },
      p: { nl: 'Het genomische CAG-codon (Gln) wordt na editing CIG; omdat I als G gedecodeerd wordt, is het functioneel CGG (Arg).', en: 'The genomic CAG codon (Gln) becomes CIG after editing; since I is decoded as G, it functions as CGG (Arg).' } },
    { c: '#ffd36b', t: 'Gln → Arg', m: ['Gln', 'Arg'], d: { nl: 'Het eiwit krijgt een ander aminozuur op deze plek. Daardoor laat de receptor in de hersenen geen calcium meer door.', en: 'The protein gets a different amino acid at this spot. As a result the receptor in the brain no longer lets calcium through.' },
      p: { nl: 'Q/R-substitutie in de porie van de AMPA-receptorsubeenheid GluA2; de positief geladen arginine maakt het kanaal vrijwel impermeabel voor Ca²⁺.', en: 'Q/R substitution in the pore of the AMPA receptor subunit GluA2; the positively charged arginine makes the channel nearly impermeable to Ca²⁺.' } },
    { c: C.prot, t: 'APOBEC1 (2×)', m: ['C → U (APOBEC1)'], d: { nl: 'Het enzym rechts, als paar van twee: het verandert in de darm een C in een U.', en: 'The enzyme on the right, as a pair of two: in the gut it changes a C into a U.' },
      p: { nl: 'Cytidinedeaminase (dimeer), katalytische subeenheid van het apoB-editosoom; deamineert C6666 van het apoB-mRNA.', en: 'Cytidine deaminase (dimer), the catalytic subunit of the apoB editosome; deaminates C6666 of the apoB mRNA.' } },
    { c: C.text, t: 'CAA = Gln', d: { nl: 'Het codewoord vóór de verandering: CAA betekent het aminozuur glutamine.', en: 'The code word before the change: CAA means the amino acid glutamine.' },
      p: { nl: 'Codon 2153 van het apoB-mRNA (CAA, Gln) met het doelcytidine C6666.', en: 'Codon 2153 of the apoB mRNA (CAA, Gln) containing the target cytidine C6666.' } },
    { c: C.danger, t: 'UAA = stop', d: { nl: 'Na de verandering staat er UAA: een stopsein. Het ribosoom houdt hier op.', en: 'After the change it reads UAA: a stop signal. The ribosome stops here.' },
      p: { nl: 'Door C→U-editing wordt codon 2153 het stopcodon UAA (in frame).', en: 'C-to-U editing turns codon 2153 into the in-frame stop codon UAA.' } },
    { c: C.text, t: { nl: 'codonnummers', en: 'codon numbers' }, m: ['2152', '2153', '2154', '2155'], d: { nl: 'Het rangnummer van elk codewoord in dit lange RNA.', en: 'The position number of each code word in this long RNA.' },
      p: { nl: 'Codonnummering van het apoB-leesraam; 2153 is het geëditeerde codon.', en: 'Codon numbering of the apoB reading frame; 2153 is the edited codon.' } },
    { c: '#ffd36b', t: { nl: 'mooring-sequentie', en: 'mooring sequence' }, d: { nl: 'Een kort herkenningsstukje net achter de C. Hier haakt het helper-eiwit zich vast.', en: 'A short recognition stretch just behind the C. The helper protein hooks on here.' },
      p: { nl: 'Cis-element net stroomafwaarts van C6666, nodig voor plaatsspecifieke editing; bindingsplaats van A1CF.', en: 'Cis element just downstream of C6666, required for site-specific editing; binding site of A1CF.' } },
    { c: '#5a4bb8', t: 'A1CF', d: { nl: 'Helper-eiwit dat het RNA vastgrijpt en het enzym precies naar de juiste C brengt.', en: 'Helper protein that grips the RNA and brings the enzyme to exactly the right C.' },
      p: { nl: 'APOBEC1 complementation factor; RNA-bindend hulpeiwit van het editosoom dat de mooring-sequentie herkent.', en: 'APOBEC1 complementation factor; RNA-binding cofactor of the editosome that recognises the mooring sequence.' } },
    { c: '#ffd36b', t: 'C → U (+ NH₃)', d: { nl: 'Het moment van de verandering: de C wordt een U en er komt ammoniak vrij.', en: 'The moment of the change: the C becomes a U and ammonia is released.' },
      p: { nl: 'Hydrolytische deaminering van cytidine tot uridine.', en: 'Hydrolytic deamination of cytidine to uridine.' } },
    { c: C.prot, t: { nl: 'lever: apoB-100 (niet ge-edit) → VLDL/LDL', en: 'liver: apoB-100 (unedited) → VLDL/LDL' }, d: { nl: 'De lange balk: in de lever wordt het RNA niet veranderd, dus komt het volledige eiwit. Het zit in vetpakketjes in het bloed.', en: 'The long bar: in the liver the RNA is not changed, so the full protein is made. It sits in fat packages in the blood.' },
      p: { nl: 'Apolipoproteïne B-100, het structurele eiwit van VLDL en LDL.', en: 'Apolipoprotein B-100, the structural protein of VLDL and LDL.' } },
    { c: '#ffd36b', t: 'LDLR', d: { nl: 'Het stukje achteraan het lange eiwit dat aan een opnamepoort (LDL-receptor) op cellen kleeft. Het korte eiwit mist dit stuk.', en: 'The bit at the end of the long protein that sticks to an uptake gate (LDL receptor) on cells. The short protein lacks this part.' },
      p: { nl: 'C-terminaal gelegen bindingsgebied voor de LDL-receptor; ontbreekt in apoB-48.', en: 'C-terminally located binding region for the LDL receptor; absent from apoB-48.' } },
    { c: C.prot2, t: { nl: 'dunne darm: apoB-48 (≈ 48 %) → chylomicronen', en: 'small intestine: apoB-48 (≈ 48 %) → chylomicrons' }, d: { nl: 'De korte balk: in de darm stopt het ribosoom bij het nieuwe stopsein. Dit halve eiwit verpakt vet uit het eten.', en: 'The short bar: in the gut the ribosome stops at the new stop signal. This half protein packs fat from food.' },
      p: { nl: 'Apolipoproteïne B-48 (N-terminale ~48 % van apoB-100), het structurele eiwit van chylomicronen.', en: 'Apolipoprotein B-48 (the N-terminal ~48 % of apoB-100), the structural protein of chylomicrons.' } },
    { c: C.danger, t: 'stop (codon 2153)', d: { nl: 'Hier eindigt het korte eiwit: op de plek van het nieuwe stopsein.', en: 'Here the short protein ends: at the spot of the new stop signal.' },
      p: { nl: 'Translatieterminatie op het geëditeerde UAA-codon 2153.', en: 'Translation termination at the edited UAA codon 2153.' } },
    { c: C.text, t: '5′', m: ['3′', '5′ …', '… 3′'], d: { nl: 'De twee uiteinden van een RNA-streng. Een streng heeft een richting, zoals een zin die je van links naar rechts leest.', en: 'The two ends of an RNA strand. A strand has a direction, like a sentence you read from left to right.' },
      p: { nl: '5′- en 3′-uiteinde; in de duplex lopen de strengen antiparallel.', en: '5′ and 3′ ends; in the duplex the strands run antiparallel.' } },
  ],
  steps: [
    ST(7000, FULL, "Het RNA zegt iets anders dan het DNA", "The RNA says something different from the DNA",
      "Een enzym verandert één base in het RNA; het DNA blijft hetzelfde. Dat heet RNA-editing.",
      "An enzyme changes one base in the RNA; the DNA stays the same. This is called RNA editing."),
    ST(7500, cam(420, 460, 900), "Een enzym herkent dubbel RNA", "An enzyme spots double RNA",
      "Een stuk van dit RNA (voor een receptor in de hersenen) vormt een dubbele streng. Een enzym herkent die.",
      "Part of this RNA (for a receptor in the brain) forms a double strand. An enzyme recognises it."),
    ST(8000, cam(360, 380, 740), "Een A wordt een I", "An A becomes an I",
      "Het enzym klapt een A uit de streng en verandert die chemisch in een andere base: inosine (I).",
      "The enzyme flips an A out of the strand and chemically changes it into another base: inosine (I)."),
    ST(8500, cam(420, 454, 1000), "I wordt gelezen als G", "I is read as G",
      "Het ribosoom leest I als G, dus komt er een ander aminozuur. Daardoor laat de receptor geen calcium meer door.",
      "The ribosome reads I as G, so a different amino acid is built in. As a result the receptor no longer lets calcium through."),
    ST(7500, cam(1200, 425, 900), "Een ander enzym, in de darm", "Another enzyme, in the gut",
      "In de darm bindt een ander enzym het RNA voor apoB, een eiwit dat vetten door het bloed vervoert.",
      "In the gut another enzyme binds the RNA for apoB, a protein that carries fats through the blood."),
    ST(7500, cam(1210, 440, 830), "Een C wordt een U", "A C becomes a U",
      "Het enzym maakt daar van een C een U. Zo ontstaat halverwege een stopsein: CAA wordt UAA.",
      "The enzyme turns a C into a U there. This creates a stop signal halfway: CAA becomes UAA."),
    ST(8500, cam(1200, 476, 1000), "Eén gen, twee eiwitten", "One gene, two proteins",
      "De lever maakt het volledige eiwit. De darm stopt bij het nieuwe stopsein en maakt ongeveer de voorste helft.",
      "The liver makes the full protein. The gut stops at the new stop signal and makes roughly the front half."),
  ],
  svg() {
    return svgOpen() + `
    <line x1="800" y1="170" x2="800" y2="760" stroke="#1d2946" stroke-width="3" stroke-dasharray="8 8"/>
    ${note(420, 200, T2('A → I (ADAR)', 'A → I (ADAR)'), '#e7e7e7', 26)}${note(1200, 200, T2('C → U (APOBEC1)', 'C → U (APOBEC1)'), BASE.U, 26)}
    <g id="ed-link"></g><g data-node="rnastructuur" data-color="${C.rna}" data-nolabel><g id="ed-ds"></g></g><g id="ed-adar"></g><g data-node="codon" data-color="${C.trna}" data-nolabel><g id="ed-code"></g></g><g data-node="editing" data-href="../atlas/index.html?id=mrna" data-color="${C.rna}" data-nolabel><g id="ed-apo"></g></g><g id="ed-apob"></g>
    ${hot('rnastructuur', T2('dsRNA-substraat in 3D', 'dsRNA substrate in 3D'), C.rna, 'ed-hD', '../atlas/index.html?id=dsrna', true)}
    ${hot('codon', T2('Genetische code', 'Genetic code'), C.trna, 'ed-cA')}
    ${hot('editing', T2('apoB-mRNA in 3D', 'apoB mRNA in 3D'), C.rna, 'ed-hM', '../atlas/index.html?id=mrna', true)}
    ${hot('splicing', T2('Editing vóór splicing', 'Editing before splicing'), C.prot, 'ed-sA', '', true)}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const tx = i => X0 + i * W;
    return {
      update(t, s) {
        const { step, p } = s;
        // ---------- links: dsRNA met A (positie 4) tegenover C ----------
        const flip = step === 2 ? Math.sin(Math.PI * sub(p, .05, .95)) : 0;   // uit de helix en terug
        const edited = step > 2 || (step === 2 && p > .5);
        let ds = '';
        const n = TOP.length, xe = tx(n - 1) + 30;
        ds += `<line x1="${tx(0) - 20}" y1="${YT + 15}" x2="${xe}" y2="${YT + 15}" stroke="${C.rna}" stroke-width="6"/><line x1="${tx(0) - 20}" y1="${YB + 15}" x2="${xe}" y2="${YB + 15}" stroke="#d9854a" stroke-width="6"/>`;
        ds += `<path d="M${xe},${YT + 15} C${xe + 70},${YT + 15} ${xe + 70},${YB + 15} ${xe},${YB + 15}" stroke="#d9854a" stroke-width="6" fill="none"/>`;
        for (let i = 0; i < n; i++) {
          const top = i === EA ? (edited ? 'I' : 'A') : TOP[i];
          const dy = i === EA ? -70 * flip : 0;
          ds += ntBox(tx(i), YT + 15 + dy, top, 34);
          ds += ntBox(tx(i), YB + 15, BOT[i], 34);
          if (i !== EA) ds += hb(tx(i), YT + 34, tx(i), YB - 4, npairs(TOP[i], BOT[i]), .8);
          else if (edited && flip < .2) ds += hb(tx(i), YT + 34, tx(i), YB - 4, 3, 1, '#ffd36b');
        }
        ds += note(tx(0) - 34, YT + 22, "5′", C.text, 18, 'end') + note(tx(0) - 34, YB + 22, "3′", C.text, 18, 'end');
        if (step >= 1) ds += note(tx(9), YT - 30, 'exon', C.rna, 18) + note(tx(2), YB + 64, T2('intron (complementair)', 'intron (complementary)'), '#d9854a', 18);
        // codonkader CAG
        if (step >= 1 && step <= 3) ds += `<rect x="${tx(3) - 22}" y="${YT - 6 - (step === 2 ? 70 * flip : 0) * 0}" width="${3 * W}" height="44" rx="8" fill="none" stroke="#fff" stroke-width="2.5" opacity=".8"/>`;
        const opL = step === 0 ? 1 : step <= 3 ? 1 : .35;
        $('ed-ds').innerHTML = `<g opacity="${opL}">${ds}</g>`;
        setHot(svg, 'ed-hD', step <= 1 ? [tx(2), YB + 110, 30, 10] : null);   // onder de duplex, niet aan het 3'-uiteinde

        // ADAR2
        let ad = '', link = '';
        const adOp = step === 1 ? ease(sub(p, .2, .6)) : step === 2 ? 1 : step === 3 ? 1 - sub(p, 0, .3) : 0;
        if (adOp > 0) {
          ad += `<g opacity="${f1(adOp)}"><path d="${eiwitPad(tx(4), YT - 70, (tx(6) - tx(2)) / 2 + 30, 64, 12, .06)}" fill="rgba(155,123,255,.25)" stroke="${C.prot}" stroke-width="3"/>` +
            `<text x="${tx(4)}" y="${YT - 84}" font-size="18" text-anchor="middle" fill="${C.text}" font-family="Inter" font-weight="700">${T2('deaminase', 'deaminase')}</text>` +
            `<text x="${tx(4)}" y="${YT - 148}" font-size="20" text-anchor="middle" fill="#c9b8ff" font-family="Inter" font-weight="800">ADAR2</text></g>`;
          // het deaminasedomein ligt óp de dubbele streng (de A klapt erin); een flexibele linker verbindt het met de dsRBD's (Matthews et al. 2016)
          link = `<path d="M${tx(6) + 18},${YT - 40} C${tx(7) + 40},${YT - 20} ${tx(6) + 10},${YB + 30} ${tx(7) - 22},${YB + 48}" stroke="${C.prot}" stroke-width="4" fill="none" stroke-linecap="round" opacity="${f1(adOp * .9)}"/>`;   // linker achter de basen (eigen laag onder de dubbele streng)
          ad += prot(tx(7) + 20, YB + 48, 84, 30, 'dsRBD1', '#5a4bb8', adOp, 15) + prot(tx(9) + 30, YB + 48, 84, 30, 'dsRBD2', '#5a4bb8', adOp, 15);   // tegen het dubbele RNA, binnen beeld
        }
        if (step === 2) {
          ad += note(tx(4) + 175, YT - 92, edited ? T2('inosine (=O)', 'inosine (=O)') : T2('adenosine (–NH₂)', 'adenosine (–NH₂)'), edited ? '#fff' : BASE.A, 18, 'start', sub(p, .1, .25));
          ad += note(tx(4) + 175, YT - 62, 'H₂O → NH₃', '#ffd36b', 17, 'start', sub(p, .45, .6));
        }
        $('ed-adar').innerHTML = ad; $('ed-link').innerHTML = link;

        // stap 3: de code
        let cd = '';
        if (step === 3) {
          const k = ease(sub(p, .1, .4)), k2 = ease(sub(p, .45, .7));
          const cx = 420, cy = 628;
          cd += `<g opacity="${f1(k)}">` + ntRow(cx - 250, cy, 'CAG', 38, 38) + note(cx - 212, cy - 14, T2('genoom: CAG', 'genome: CAG'), C.muted, 16) +
            arrow(cx - 120, cy + 19, cx - 70, cy + 19, C.muted) + ntRow(cx - 30, cy, 'CIG', 38, 38) + note(cx + 8, cy - 14, 'RNA', C.muted, 16) +
            `<text x="${cx + 105}" y="${cy + 28}" font-size="24" text-anchor="middle" fill="${C.text}" font-family="Inter" font-weight="700">≙</text>` + ntRow(cx + 150, cy, 'CGG', 38, 38) + note(cx + 188, cy - 14, T2('ribosoom leest', 'ribosome reads'), C.muted, 16) + '</g>';
          cd += `<g opacity="${f1(k2)}">${aa(cx - 212, cy + 76, 'Q', 22)}${aa(cx + 188, cy + 76, 'R', 22)}</g>` + note(cx - 10, cy + 84, T2('Gln → Arg', 'Gln → Arg'), '#ffd36b', 20, 'middle', k2);
        }
        $('ed-code').innerHTML = cd;
        setHot(svg, 'ed-cA', step === 3 && p > .4 ? [608, 628, 120, 40] : null);
        setHot(svg, 'ed-sA', step === 1 && p > .6 ? [tx(8), YB + 110, 40, 16] : null);
        setHot(svg, 'ed-hM', step === 4 || step === 5 ? [AX + 60, AY + 54, 80, 10] : null);

        // ---------- rechts: apoB ----------
        const cu = step > 5 || (step === 5 && p > .45);
        let ap = '';
        const opR = step === 0 ? 1 : step >= 4 ? 1 : .35;
        ap += `<g opacity="${opR}"><line x1="${AX - 50}" y1="${AY + 19}" x2="${AX + 15 * AW + 40}" y2="${AY + 19}" stroke="${C.rna}" stroke-width="6"/>`;
        APO.forEach((b, i) => {
          if (b === ' ') return;
          const bb = i === 4 && cu ? 'U' : b;
          ap += ntBox(AX + i * AW, AY + 19, bb, 36, b === 'N' ? .55 : 1);
        });
        if (step >= 4) ap += note(AX - 60, AY + 26, "5′ …", C.text, 18, 'end') + note(AX + 15 * AW + 50, AY + 26, "… 3′", C.text, 18, 'start');
        const eoN = step === 4 ? ease(sub(p, .2, .6)) : step === 5 ? 1 : step === 6 ? 1 - sub(p, 0, .2) : 0;   // codonnummer 2153 schuift boven APOBEC1 uit (dat op het codon ligt)
        if (step >= 4) [['2152', 1], ['2153', 5], ['2154', 9], ['2155', 13]].forEach(([c, i]) => { ap += note(AX + i * AW, AY - 22 - (i === 5 ? 92 * eoN : 0), c, i === 5 ? C.text : C.muted, 16); });
        ap += `<rect x="${AX + 4 * AW - 24}" y="${AY - 6}" width="${3 * AW - 2}" height="50" rx="8" fill="none" stroke="${cu ? C.danger : '#fff'}" stroke-width="2.5" opacity="${step >= 4 ? 1 : .6}"/>`;
        ap += note(AX + 5 * AW, AY + 84, cu ? T2('UAA = stop', 'UAA = stop') : T2('CAA = Gln', 'CAA = Gln'), cu ? C.danger : C.text, 18, 'middle', step >= 4 ? 1 : 0);
        if (step >= 4) ap += `<path d="M${AX + 8 * AW - 20},${AY + 60} v10 H${AX + 14 * AW + 18} v-10" stroke="#ffd36b" stroke-width="2.5" fill="none"/>` + note(AX + 11.5 * AW, AY + 96, T2('mooring-sequentie', 'mooring sequence'), '#ffd36b', 15);
        ap += '</g>';
        $('ed-apo').innerHTML = ap;

        let ab = '';
        const eo = step === 4 ? ease(sub(p, .2, .6)) : step === 5 ? 1 : step === 6 ? 1 - sub(p, 0, .2) : 0;
        if (eo > 0) {
          ab += `<g opacity="${f1(eo)}"><path d="${eiwitPad(AX + 5 * AW - 60, AY - 50, 58, 44, 14, .07)}" fill="rgba(155,123,255,.25)" stroke="${C.prot}" stroke-width="3"/><path d="${eiwitPad(AX + 5 * AW + 60, AY - 50, 58, 44, 15, .07)}" fill="rgba(155,123,255,.25)" stroke="${C.prot}" stroke-width="3"/>` + /* APOBEC1 als dimeer */
            `<text x="${AX + 5 * AW}" y="${AY - 44}" font-size="18" text-anchor="middle" fill="${C.text}" font-family="Inter" font-weight="800">APOBEC1 (2×)</text></g>`;
          ab += prot(AX + 11.5 * AW, AY + 52, 76, 30, 'A1CF', '#5a4bb8', eo, 16);   // op de mooring-sequentie
        }
        if (step === 5) ab += note(AX + 5 * AW + 130, AY - 150, 'C → U  (+ NH₃)', '#ffd36b', 18, 'start', sub(p, .4, .55));
        if (step === 6) {
          const k = ease(sub(p, .15, .5)), k2 = ease(sub(p, .4, .75));
          const bx = 880, len = 620, y1 = 616, y2 = 704;
          ab += `<g opacity="${f1(k)}"><rect x="${bx}" y="${y1}" width="${len}" height="30" rx="8" fill="${C.prot}"/>` + note(bx, y1 - 12, T2('lever: apoB-100 (niet ge-edit) → VLDL/LDL', 'liver: apoB-100 (unedited) → VLDL/LDL'), C.text, 17, 'start') +
            `<rect x="${bx + len - 90}" y="${y1 + 4}" width="84" height="22" rx="5" fill="#ffd36b"/><text x="${bx + len - 48}" y="${y1 + 21}" font-size="13" text-anchor="middle" fill="#0a1224" font-family="Inter" font-weight="700">LDLR</text></g>`;
          ab += `<g opacity="${f1(k2)}"><rect x="${bx}" y="${y2}" width="${f1(len * .48)}" height="30" rx="8" fill="${C.prot2}"/>` + note(bx, y2 - 12, T2('dunne darm: apoB-48 (≈ 48 %) → chylomicronen', 'small intestine: apoB-48 (≈ 48 %) → chylomicrons'), C.text, 17, 'start') +
            `<line x1="${f1(bx + len * .48)}" y1="${y2 - 6}" x2="${f1(bx + len * .48)}" y2="${y2 + 38}" stroke="${C.danger}" stroke-width="3"/>` + note(bx + len * .48 + 10, y2 + 22, T2('stop (codon 2153)', 'stop (codon 2153)'), C.danger, 16, 'start') + '</g>';
        }
        $('ed-apob').innerHTML = ab;
      },
    };
  },
};
