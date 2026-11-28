import { C, BASE, COMP, L, T2, svgOpen, txt, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { NEW, PRIMER, ADNA, PCNA, RPA, seg, pth, endl, prot, clamp3, duplex, tag, arrow, rpaRow } from './_draw.js';
import { with3d } from './_mix3d.js';
import { eiwitPad } from '../../bio.js';

/*
 * Replicatievork (mens). De vork beweegt naar rechts.
 *  - volgende-streng-matrijs (boven): 5' links … 3' rechts in de ouderduplex
 *  - leidende-streng-matrijs (onder): 3' links … 5' rechts → CMG loopt er 3'→5' over (naar rechts)
 *  - nieuwe leidende streng (onder, y=672): 5' links → 3' bij Pol ε (groeit naar de vork)
 *  - Okazaki-fragmenten (boven, y=228): 5'-uiteinde (primer) rechts, groeien 5'→3' naar links (van de vork weg)
 */
const SEQ = 'ATGCGTACCTAGGCATTCGATCGGATACGTTAGCCATGCAATCGGTACGATCCAGT';
const FX = 1010, CY = 450, GAP = 36, TOPY = 262, BOTY = 638, NTOP = 228, NBOT = 672, BP = 18;
const topArm = [[FX, CY - GAP / 2], [988, 382], [958, 318], [918, 280], [872, TOPY], [90, TOPY]];
const botArm = [[FX, CY + GAP / 2], [988, 518], [958, 582], [918, 620], [872, BOTY], [90, BOTY]];
const PRI5 = 880, PRI_R = 842, PRI_A = 804;          // primer van het nieuwe fragment: RNA 842–880, αDNA 804–842
const PREV5 = 640, PREV_R = 604, PREV_A = 570;        // vorig fragment: 5'-uiteinde bij 640 (RNA 604–640, αDNA 570–604)
const LEAD3 = 850;                                    // 3'-uiteinde van de leidende streng (bij Pol ε, vlak achter CMG)
const bAt = x => SEQ[Math.floor(x / BP) % SEQ.length];

const S = (dur, c, nl, en, tnl, ten) => ({ dur, cam: c, title: { nl, en }, text: { nl: tnl, en: ten } });

const scene = {
  id: 'replisoom',
  title: { nl: 'Het replisoom', en: 'The replisome' },
  scale: '≈ 20–50 nm',
  time: { nl: 'vork ≈ 1–3 kb/min in menselijke cellen (hier sterk vertraagd)', en: 'fork ≈ 1–3 kb/min in human cells (strongly slowed down here)' },
  org: { nl: 'mens (eukaryoot replisoom)', en: 'human (eukaryotic replisome)' },
  legend: [[C.dna, { nl: 'ouderstreng (matrijs volgende streng)', en: 'parental strand (lagging template)' }], [C.dna2, { nl: 'ouderstreng (matrijs leidende streng)', en: 'parental strand (leading template)' }],
    [NEW, { nl: 'nieuw DNA', en: 'new DNA' }], [PRIMER, { nl: 'RNA-primer', en: 'RNA primer' }], [ADNA, { nl: 'DNA van Pol α', en: 'DNA made by Pol α' }],
    [C.prot, { nl: 'enzymen', en: 'enzymes' }], [PCNA, 'PCNA'], [RPA, 'RPA'],
    ['#c9b8ff', { nl: 'rest van de ritsmachine (3D)', en: 'rest of the helicase CMG (3D)' }], ['#e0708f', { nl: 'Pol ε (3D)', en: 'Pol ε (3D)' }], ['#7f8fb0', { nl: 'hulpeiwitten (3D)', en: 'helper proteins (3D)' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Let op de richtingen: beide nieuwe strengen groeien 5′→3′. De leidende streng groeit mee met de vork; op de volgende streng wijst de groeirichting van de vork weg, daarom wordt die in stukken (Okazaki-fragmenten) gemaakt.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Watch the directions: both new strands grow 5′→3′. The leading strand grows along with the fork; on the lagging strand the direction of growth points away from the fork, which is why it is made in pieces (Okazaki fragments).</p>' },
  simplified: {
    nl: '2D-schema, niet op schaal. Een Okazaki-fragment is ~200 nt, de RNA-primer ~10 nt en Pol α voegt ~20 nt DNA toe; primer en flap zijn hier groter getekend. In werkelijkheid verdringt Pol δ telkens slechts enkele nucleotiden en knipt FEN1 herhaaldelijk kleine flaps (nick-translatie). De volgende-streng-matrijs vormt in de cel waarschijnlijk een lus zodat alles bij elkaar blijft; Ctf4/AND-1, Mcm10, Tipin–Timeless en de histonchaperonnes zijn weggelaten. De 3D-stappen tonen PDB 7PFO (menselijk kernreplisoom, cryo-EM; Jones et al., EMBO J 2021) met één bolletje per bouwsteen; in dat model ontbreken Pol α, Pol δ, PCNA en het bouwende deel van Pol ε, en het DNA is een kort proefstuk. Andere echte structuren: PDB 6XTX (humaan CMG), 1AXC (humaan PCNA).',
    en: '2D scheme, not to scale. An Okazaki fragment is ~200 nt, the RNA primer ~10 nt and Pol α adds ~20 nt of DNA; primer and flap are drawn larger here. In reality Pol δ displaces only a few nucleotides at a time and FEN1 repeatedly cuts short flaps (nick translation). In the cell the lagging-strand template probably loops so that everything stays together; Ctf4/AND-1, Mcm10, Tipin–Timeless and the histone chaperones are omitted. The 3D steps show PDB 7PFO (human core replisome, cryo-EM; Jones et al., EMBO J 2021) with one bead per building block; Pol α, Pol δ, PCNA and the building part of Pol ε are missing from that model, and the DNA is a short test piece. Other real structures: PDB 6XTX (human CMG), 1AXC (human PCNA).' },
  /* "Wat zie je?" (zijpaneel): elk onderdeel van de figuur in één zin — d = eenvoudig, p = vaktaal (hoger) */
  parts: [
    { c: C.dna, t: { nl: 'ouderstreng (matrijs volgende streng)', en: 'parental strand (lagging template)' }, m: ['DNA', 'dubbel DNA', 'double-stranded DNA'], d: { nl: 'De twee oude DNA-strengen (blauw en lichtblauw) worden aan de vork uit elkaar getrokken. Elk dient als voorbeeld voor een nieuwe streng.', en: 'The two old DNA strands (blue and light blue) are pulled apart at the fork. Each serves as the guide for a new strand.' },
      p: { nl: 'Ouderduplex vóór de vork; de bovenste streng is de matrijs van de volgende streng, de onderste die van de leidende streng.', en: 'Parental duplex ahead of the fork; the upper strand templates the lagging strand, the lower one the leading strand.' } },
    { c: C.dna2, t: { nl: 'ouderstreng (matrijs leidende streng)', en: 'parental strand (leading template)' }, m: ['één streng', 'single strand'], d: { nl: 'Alleen deze streng loopt door het gat van de ritsmachine; de andere wordt erbuiten gehouden.', en: 'Only this strand runs through the hole of the unzipping machine; the other is kept outside.' },
      p: { nl: 'Matrijs van de leidende streng; loopt als enkelstreng door het centrale kanaal van CMG (3′→5′-translocatie).', en: 'Leading-strand template; passes as a single strand through the central channel of CMG (3′→5′ translocation).' } },
    { c: C.muted, t: { nl: 'positieve supercoils', en: 'positive supercoils' }, d: { nl: 'Vóór de vork draait het DNA steeds strakker op, zoals een touw dat je uit elkaar trekt.', en: 'Ahead of the fork the DNA winds ever tighter, like a rope you pull apart.' },
      p: { nl: 'Positieve superspiralisatie stroomafwaarts van de vork door het ontwinden van de duplex.', en: 'Positive supercoiling downstream of the fork caused by unwinding of the duplex.' } },
    { c: C.prot2, t: 'Topo I / II', m: ['knip → draai → plak', 'cut → rotate → rejoin'], d: { nl: 'Enzymen die het DNA even doorknippen, het laten draaien en weer dichtplakken. Zo verdwijnt de spanning.', en: 'Enzymes that briefly cut the DNA, let it rotate and seal it again. This removes the tension.' },
      p: { nl: 'Topo-isomerase I (enkelstrengsknip) en II (dubbelstrengsknip) relaxeren de positieve supercoils.', en: 'Topoisomerase I (single-strand cut) and II (double-strand cut) relax the positive supercoils.' } },
    { c: C.prot, t: 'CMG', m: ['ritsmachine', 'helicase (CMG)'], d: { nl: 'De ritsmachine (helicase): een ring die over één streng schuift en zo het DNA openritst.', en: 'The unzipping machine (helicase): a ring that slides along one strand and so unzips the DNA.' },
      p: { nl: 'CMG-helicase (Cdc45–MCM2-7–GINS), loopt 3′→5′ over de matrijs van de leidende streng.', en: 'CMG helicase (Cdc45–MCM2-7–GINS), translocating 3′→5′ on the leading-strand template.' } },
    { c: C.text, t: { nl: 'vork beweegt', en: 'fork moves' }, d: { nl: 'De vork schuift naar rechts terwijl het DNA wordt opengeritst.', en: 'The fork moves to the right while the DNA is unzipped.' },
      p: { nl: 'Vorksnelheid ≈ 1–3 kb/min in menselijke cellen.', en: 'Fork speed ≈ 1–3 kb/min in human cells.' } },
    { c: RPA, t: 'RPA', m: ['RPA-heterotrimeer (RPA70/32/14)', 'RPA heterotrimer (RPA70/32/14)'], d: { nl: 'Kleine eiwitten die de losse DNA-streng bedekken, zodat ze niet terugvouwt en niet afgebroken wordt.', en: 'Small proteins that coat the loose DNA strand so it does not fold back or get broken down.' },
      p: { nl: 'Replicatieproteïne A, heterotrimeer (RPA70/32/14), bindt ssDNA van ≈ 30 nt per molecule.', en: 'Replication protein A, heterotrimer (RPA70/32/14), binds ≈ 30 nt of ssDNA per molecule.' } },
    { c: C.prot3, t: 'Pol α-primase', m: ['primase: RNA (~10 nt)', 'Pol α: + ~20 nt DNA'], d: { nl: 'Legt een kort startstukje: eerst een beetje RNA, dan wat DNA. Pas daarna kan de gewone polymerase verder.', en: 'Lays down a short starter piece: first a little RNA, then some DNA. Only then can the regular polymerase carry on.' },
      p: { nl: 'Primase maakt een RNA-primer van ≈ 10 nt, Pol α verlengt met ≈ 20 nt DNA; daarna polymerasewissel.', en: 'Primase makes an RNA primer of ≈ 10 nt, Pol α extends it by ≈ 20 nt of DNA; then polymerase switching.' } },
    { c: PRIMER, t: { nl: 'RNA-primer', en: 'RNA primer' }, d: { nl: 'Het oranje startstukje RNA aan het begin van elk nieuw stuk DNA. Later wordt het weggeknipt.', en: 'The orange starter piece of RNA at the start of each new piece of DNA. Later it is cut away.' },
      p: { nl: 'RNA-primer met een DNA-verlenging van Pol α (blauw); wordt bij de rijping verwijderd.', en: 'RNA primer with a DNA extension from Pol α (blue); removed during maturation.' } },
    { c: C.prot3, t: 'RFC', d: { nl: 'Een eiwit dat de klem opent en rond het DNA legt, aan het eind van het startstukje.', en: 'A protein that opens the clamp and places it around the DNA, at the end of the starter piece.' },
      p: { nl: 'Replicatiefactor C, de klemlader; laadt PCNA ATP-afhankelijk op de primer-matrijsovergang.', en: 'Replication factor C, the clamp loader; loads PCNA ATP-dependently onto the primer–template junction.' } },
    { c: PCNA, t: { nl: 'PCNA-klem', en: 'PCNA clamp' }, m: ['PCNA'], d: { nl: 'Een ring (geel) rond het DNA die de polymerase vasthoudt, zodat die niet loslaat.', en: 'A ring (yellow) around the DNA that holds the polymerase so it does not let go.' },
      p: { nl: 'PCNA, homotrimere glijdende klem; verhoogt de processiviteit van Pol δ en Pol ε.', en: 'PCNA, homotrimeric sliding clamp; increases the processivity of Pol δ and Pol ε.' } },
    { c: C.prot2, t: 'Pol δ', m: ['5′→3′', 'strengverdringing → flap', 'strand displacement → flap'], d: { nl: 'De polymerase die de stukjes van de volgende streng bouwt. Bij het vorige stukje tilt hij het begin ervan op (een flapje).', en: 'The polymerase that builds the pieces of the lagging strand. At the previous piece it lifts up its start (a flap).' },
      p: { nl: 'DNA-polymerase δ synthetiseert Okazaki-fragmenten 5′→3′ en verdringt het 5′-uiteinde van het vorige fragment tot een flap.', en: 'DNA polymerase δ synthesises Okazaki fragments 5′→3′ and displaces the 5′ end of the previous fragment into a flap.' } },
    { c: '#e0708f', t: 'FEN1', d: { nl: 'Een knip-enzym dat het opgetilde flapje met het startstukje wegknipt.', en: 'A cutting enzyme that snips off the lifted flap with the starter piece.' },
      p: { nl: 'Flap-endonuclease 1, verwijdert de 5′-flap met de RNA-primer.', en: 'Flap endonuclease 1, removes the 5′ flap carrying the RNA primer.' } },
    { c: '#3fb58f', t: 'Ligase I', d: { nl: 'Het lijm-enzym dat de stukjes tot één streng aan elkaar plakt.', en: 'The glue enzyme that joins the pieces into one strand.' },
      p: { nl: 'DNA-ligase I sluit de nick tussen opeenvolgende Okazaki-fragmenten.', en: 'DNA ligase I seals the nick between successive Okazaki fragments.' } },
    { c: NEW, t: { nl: 'volgende streng (lagging)', en: 'lagging strand' }, m: ['Okazaki-fragmenten, ~200 nt', 'Okazaki fragments, ~200 nt'], d: { nl: 'Deze nieuwe streng groeit weg van de vork en wordt daarom in korte stukjes gemaakt.', en: 'This new strand grows away from the fork and is therefore made in short pieces.' },
      p: { nl: 'Discontinu gesynthetiseerd in Okazaki-fragmenten van ≈ 200 nt.', en: 'Synthesised discontinuously in Okazaki fragments of ≈ 200 nt.' } },
    { c: NEW, t: { nl: 'leidende streng (leading)', en: 'leading strand' }, m: ['3′', 'synthese 5′→3′, met de vork mee', 'synthesis 5′→3′, along with the fork'], d: { nl: 'Deze nieuwe streng groeit in één stuk mee met de vork.', en: 'This new strand grows in one piece along with the fork.' },
      p: { nl: 'Continu 5′→3′ gesynthetiseerd door Pol ε, met het 3′-uiteinde vlak achter CMG.', en: 'Synthesised continuously 5′→3′ by Pol ε, with its 3′ end just behind CMG.' } },
    { c: C.prot2, t: 'Pol ε', m: ['polymerase', 'exo-plaats (3′→5′)', 'exo site (3′→5′)'], d: { nl: 'De polymerase van de leidende streng, vlak achter de ritsmachine. Zet hij een foute letter, dan knipt een tweede deel die meteen weg.', en: 'The polymerase of the leading strand, right behind the unzipping machine. If it puts in a wrong letter, a second part cuts it off at once.' },
      p: { nl: 'DNA-polymerase ε, gebonden aan CMG; proefleest met zijn 3′→5′-exonucleaseplaats.', en: 'DNA polymerase ε, bound to CMG; proofreads with its 3′→5′ exonuclease site.' } },
  ],
  steps: [
    S(8000, cam(800, 450, 1560), 'Het DNA wordt opengeritst', 'The DNA is unzipped',
      'Een ritsmachine (helicase) trekt de twee strengen uit elkaar. Die strengen lopen in tegengestelde richting.',
      'An unzipping machine (helicase) pulls the two strands apart. These strands run in opposite directions.'),
    S(7000, cam(1250, 450, 760), 'Spanning vóór de vork', 'Tension ahead of the fork',
      'Vóór de vork draait het DNA strakker op. Speciale enzymen knippen het even door en zetten het weer losser.',
      'Ahead of the fork the DNA winds tighter. Special enzymes briefly cut it and loosen it again.'),
    S(7000, cam(760, 300, 760), 'Losse strengen worden beschermd', 'Loose strands are protected',
      'Losse DNA-strengen zijn kwetsbaar. Het eiwit RPA bedekt ze, zodat ze niet terugvouwen en niet afgebroken worden.',
      'Loose DNA strands are vulnerable. The protein RPA coats them, so they do not fold back or get broken down.'),
    S(8000, cam(840, 245, 640), 'Eerst een startstukje', 'First a starter piece',
      'Het enzym dat DNA bouwt (DNA-polymerase) kan niet zelf starten. Een ander enzym legt eerst een startstukje RNA.',
      'The enzyme that builds DNA (DNA polymerase) cannot start on its own. Another enzyme first lays down a starter piece of RNA.'),
    S(7000, cam(800, 245, 640), 'Een klem gaat rond het DNA', 'A clamp goes around the DNA',
      'Een eiwit legt een ring rond het DNA, aan het eind van het startstukje. Die klem houdt de polymerase op het DNA.',
      'A protein places a ring around the DNA, at the end of the starter piece. This clamp keeps the polymerase on the DNA.'),
    S(8000, cam(720, 600, 1000), 'Eén streng groeit in één stuk', 'One strand grows in one piece',
      'Een polymerase bouwt deze streng in één stuk, mee met de vork. Dit heet de leidende streng.',
      'A polymerase builds this strand in one piece, moving with the fork. This is called the leading strand.'),
    S(9000, cam(700, 250, 820), 'De andere streng groeit in stukjes', 'The other strand grows in pieces',
      'Hier bouwt een polymerase weg van de vork, in korte stukjes. Bij het vorige stukje tilt hij het begin ervan op.',
      'Here a polymerase builds away from the fork, in short pieces. At the previous piece, it lifts up that piece’s start.'),
    S(8000, cam(590, 235, 560), 'De stukjes worden één streng', 'The pieces become one strand',
      'Een enzym knipt het flapje met het startstukje weg. Een ander enzym (ligase) plakt de stukjes aan elkaar.',
      'One enzyme cuts off the flap with the starter piece. Another enzyme (ligase) joins the pieces together.'),
    S(9000, cam(790, 660, 470), 'De polymerase verbetert zijn fouten', 'The polymerase fixes its mistakes',
      'Een verkeerde base past slecht. De polymerase knipt ze weg met een tweede, knippend deel en bouwt opnieuw in.',
      'A wrong base fits poorly. The polymerase cuts it off with a second, cutting part and builds again.'),
    S(7000, cam(800, 450, 1560), 'Samen één machine', 'Together, one machine',
      'Al deze eiwitten werken samen als één machine: het replisoom. Wat toch fout gaat, wordt later verbeterd.',
      'All these proteins work together as one machine: the replisome. Errors that still slip through are fixed later.'),
  ],
  svg() {
    return svgOpen() + `
    <g data-node="supercoiling" data-color="${C.dna2}" data-label="${T2('Supercoiling & topo-isomerasen', 'Supercoiling & topoisomerases')}">
      <rect x="1180" y="380" width="400" height="140" fill="transparent"/><circle data-anchor="supercoiling" cx="1430" cy="370" r="1" fill="none"/>
      <g id="rs-dup"></g><g id="rs-topo"></g>
    </g>
    <g data-node="dnahelix" data-nolabel data-color="${C.dna}"><g id="rs-arms"></g></g>
    <g data-node="ssdna" data-color="${RPA}" data-label="${T2('Enkelstrengig DNA + RPA', 'Single-stranded DNA + RPA')}">
      <circle id="rs-ssa" data-anchor="ssdna" cx="720" cy="300" r="1" fill="none" data-pos="below"/>
      <g id="rs-rpa"></g>
    </g>
    <g id="rs-lag"></g><g id="rs-lead"></g><g id="rs-prot"></g><g id="rs-lbl"></g>
    <g data-node="mmr" data-nolabel data-color="${C.ok}" data-label="${T2('Kopieerfouten herstellen (MMR)', 'Repairing copying errors (MMR)')}"><g id="rs-herstel"></g></g>
    <g data-node="replicatie" data-nolabel data-color="${C.dna}" data-label="${T2('↑ Replicatie (overzicht)', '↑ Replication (overview)')}" id="rs-rep">
      <rect x="40" y="792" width="400" height="54" rx="27" fill="rgba(79,143,247,.15)" stroke="${C.dna}" stroke-width="2"/>
      ${txt(240, 827, T2('↑ replicatiebel & origins', '↑ replication bubble & origins'), C.text, 22)}
    </g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    // ouderduplex vóór de vork (vast)
    return {
      update(t, s) {
        const { step, p } = s;
        const big = step === 0 || step === 9;                 // overzichtsbeelden: grotere, minder labels
        const at = (k, a = 0, b = 1) => step > k ? 1 : step < k ? 0 : ease(sub(p, a, b));

        /* ---- ouderduplex + topo-isomerase ---- */
        let dup = duplex(FX, 1530, CY, SEQ.slice(3), { gap: GAP, bp: BP });
        // positieve supercoils: symbolen die in stap 1 één voor één verdwijnen
        const relax = step === 1 ? sub(p, .35, .95) : step > 1 ? .67 : 0;
        const plus = [1340, 1410, 1480].map((x, i) => {
          const gone = relax * 3 > i + .5 ? 1 : 0;
          const op = 1 - gone;
          return op > .01 ? `<g opacity="${f1(op)}" transform="translate(${x} 540)"><circle r="19" fill="none" stroke="${C.dna2}" stroke-width="2.5"/>${txt(0, 7, '+', C.dna2, 22)}</g>` : '';
        }).join('');
        dup += plus + tag(1410, 600, T2('positieve supercoils', 'positive supercoils'), C.muted, big ? 22 : 16, 'middle', step >= 1 ? 1 : .6);
        $('rs-dup').innerHTML = dup;
        const topoOp = step === 0 ? .0 : step === 1 ? ease(sub(p, 0, .2)) : 1;
        const nick = step === 1 && p > .3 && p < .8;
        $('rs-topo').innerHTML = prot(1300, 392, big ? 100 : 78, big ? 40 : 34, C.prot2, 'Topo I / II', big ? 22 : 16, topoOp) +
          (nick ? `<rect x="1294" y="${CY - GAP / 2 - 6}" width="12" height="12" fill="${C.bg}"/>` : '') +
          (step === 1 ? tag(1300, 340, T2('knip → draai → plak', 'cut → rotate → rejoin'), C.text, 16, 'middle', sub(p, .25, .4)) : '');

        /* ---- matrijsarmen ---- */
        // welke stukken van de nieuwe volgende streng bestaan er?
        const priR = step < 3 ? PRI5 : step === 3 ? lerp(PRI5, PRI_R, ease(sub(p, .2, .55))) : PRI_R;       // RNA-deel
        const priA = step < 3 ? PRI5 : step === 3 ? (p < .55 ? priR : lerp(PRI_R, PRI_A, ease(sub(p, .6, .9)))) : PRI_A;
        let del3 = PRI_A;                                   // 3'-uiteinde van het nieuwe fragment (Pol δ)
        if (step === 6) del3 = lerp(PRI_A, PREV5, ease(sub(p, 0, .55)));
        if (step === 6 && p > .55) del3 = lerp(PREV5, PREV_A, ease(sub(p, .6, .95)));
        if (step >= 7) del3 = PREV_A;
        const flapBase = Math.min(PREV5, del3);             // tot waar het vorige fragment nog gepaard is
        const flapCut = step > 7 || (step === 7 && p > .35);
        const sealed = step > 7 || (step === 7 && p > .8);
        const newLagFrom = step >= 3 ? del3 : 9999;         // nieuw fragment loopt van del3 tot PRI5

        let arms = pth(topArm, C.dna, 7) + pth(botArm, C.dna2, 7);
        // sporten / stompjes op de armen
        for (let x = 99; x < 870; x += BP) {
          const b = bAt(x), m = COMP[b];
          const fragL = step === 3 ? priA : step >= 6 ? del3 : PRI_A;
          const inNewFrag = step >= 3 && x >= fragL && x <= PRI5;
          const topPaired = x < flapBase || inNewFrag;
          if (topPaired) arms += seg(x, TOPY, x, (TOPY + NTOP) / 2, BASE[b], 4.5) + seg(x, (TOPY + NTOP) / 2, x, NTOP, BASE[m], 4.5);
          else arms += seg(x, TOPY, x, TOPY - 13, BASE[b], 4.5);
          const b2 = bAt(x + 7), m2 = COMP[b2];
          if (x < LEAD3 && step === 8 && x === 837) arms += '';
          else if (x < LEAD3) arms += seg(x, BOTY, x, (BOTY + NBOT) / 2, BASE[b2], 4.5) + seg(x, (BOTY + NBOT) / 2, x, NBOT, BASE[m2], 4.5);
          else arms += seg(x, BOTY, x, BOTY + 13, BASE[b2], 4.5);
        }
        arms += endl(66, TOPY + 6, "5′", C.dna) + endl(1554, CY - GAP / 2 + 6, "3′", C.dna) +
                endl(66, BOTY + 6, "3′", C.dna2) + endl(1554, CY + GAP / 2 + 6, "5′", C.dna2);
        $('rs-arms').innerHTML = arms;

        /* ---- volgende streng: oude fragmenten, nieuw fragment, flap ---- */
        let lag = '';
        // oud fragment (al geligeerd) + vorig fragment, tot flapBase
        lag += seg(96, NTOP, flapBase, NTOP, NEW, 7);
        lag += endl(66, NTOP + 6, "3′", NEW);
        // 5'-deel van het vorige fragment: gepaard (step<6) of opgetild als flap
        if (!flapCut) {
          const L0 = PREV5 - flapBase;                         // opgetilde lengte
          const ang = -1.05;
          const fl = (x0, x1, col) => {                       // stuk [x0,x1] van het vorige fragment
            const pts = [];
            for (const x of [x0, x1]) {
              if (x <= flapBase) pts.push([x, NTOP]);
              else { const u = x - flapBase; pts.push([flapBase + u * Math.cos(ang), NTOP + u * Math.sin(ang) * 1.0]); }
            }
            if (x0 < flapBase && x1 > flapBase) pts.splice(1, 0, [flapBase, NTOP]);
            return pth(pts, col, 7);
          };
          lag += fl(flapBase, PREV_A, NEW) + fl(Math.max(flapBase, PREV_A), PREV_R, ADNA) + fl(Math.max(flapBase, PREV_R), PREV5, PRIMER);
          const tip = PREV5 - flapBase > 1 ? [flapBase + (PREV5 - flapBase) * Math.cos(ang), NTOP + (PREV5 - flapBase) * Math.sin(ang)] : [PREV5, NTOP];
          lag += endl(tip[0] + 30, tip[1] - 24, "5′", PRIMER, 16);   // iets verder van de flaptip: niet op de rand van Pol δ
        } else if (step === 7) {
          // weggeknipte flap drijft weg
          const k = sub(p, .35, .52);                         // weg vóór ligase I verschijnt
          const x0 = PREV_A + k * 40, y0 = NTOP - 20 - k * 70;
          const ux = Math.cos(-1.05), uy = Math.sin(-1.05);
          lag += `<g opacity="${f1(1 - k)}">` + pth([[x0, y0], [x0 + 34 * ux, y0 + 34 * uy]], ADNA, 7) + pth([[x0 + 34 * ux, y0 + 34 * uy], [x0 + 70 * ux, y0 + 70 * uy]], PRIMER, 7) + '</g>';
        }
        // nieuw fragment
        if (step >= 3) {
          lag += seg(priR, NTOP, PRI5, NTOP, PRIMER, 7);
          if (priA < priR) lag += seg(priA, NTOP, priR, NTOP, ADNA, 7);
          if (step >= 6 && del3 < PRI_A) lag += seg(del3, NTOP, PRI_A, NTOP, NEW, 7);
          lag += endl(PRI5 + 16 + (step === 3 ? 80 : step === 4 ? 80 * (1 - sub(p, .05, .3)) : 0), NTOP - 10, "5′", PRIMER, 16);   // opzij zolang Pol α-primase erboven zit
          const e3 = step >= 6 ? del3 : priA;
          // 3'-label op de echte plaats; verborgen zolang Pol α-primase of Pol δ het 3'-uiteinde bedekt (anders lijkt het bij de verkeerde streng te horen)
          const rfcOn = step === 4 ? ease(sub(p, .25, .4)) * (1 - sub(p, .6, .75)) : 0;
          const cov3 = step === 3 ? 1 : step === 4 ? Math.max(1 - sub(p, .05, .3), rfcOn, ease(sub(p, .7, .95))) : step === 7 ? 1 - sub(p, 0, .14) : step >= 5 ? 1 : 0;
          if (!(step === 7 && sealed) && step < 8) lag += endl(e3 - 22, NTOP - 16, "3′", NEW, 16, 1 - cov3);
        }
        // nick vóór ligatie
        if (step === 7 && flapCut && !sealed) lag += `<circle cx="${PREV_A}" cy="${NTOP}" r="9" fill="none" stroke="#fff" stroke-width="2.5" opacity="${f1(.5 + .5 * Math.sin(t / 260))}"/>`;
        if (step === 7 && sealed) lag += `<circle cx="${PREV_A}" cy="${NTOP}" r="14" fill="${C.ok}" opacity="${f1(.5 * (1 - sub(p, .8, 1)))}" filter="url(#glow)"/>`;
        $('rs-lag').innerHTML = lag;

        /* ---- RPA op enkelstrengig matrijs-DNA ---- */
        const rpaL = PREV5 + 4;
        const rpaR = step < 3 ? 880 : step === 3 ? Math.min(lerp(880, 842, sub(p, .1, .3)), priA) : step < 6 ? priA : step === 6 ? del3 - 6 : 0;
        let rpa = rpaRow(rpaL, rpaR, TOPY - 6, 1, 44, 15);
        if (step === 2) rpa += `<rect x="${PREV5}" y="${TOPY - 30}" width="${880 - PREV5}" height="46" rx="20" fill="none" stroke="${RPA}" stroke-width="3" stroke-dasharray="7 6" opacity="${f1(.5 + .5 * Math.sin(t / 200))}"/>` +
          tag(760, 372, T2('RPA-heterotrimeer (RPA70/32/14)', 'RPA heterotrimer (RPA70/32/14)'), RPA, 17);
        $('rs-rpa').innerHTML = rpa;
        const ssa = $('rs-ssa'); if (rpaR - rpaL > 40) { ssa.setAttribute('cx', f1(Math.min((rpaL + rpaR) / 2, rpaL + 40))); ssa.setAttribute('cy', 300); } else { ssa.setAttribute('cx', -99); ssa.setAttribute('cy', -99); }

        /* ---- leidende streng ---- */
        let lead = seg(96, NBOT, LEAD3, NBOT, NEW, 7) + endl(66, NBOT + 6, "5′", NEW);
        if (step === 5) {
          // stroom van nucleotiden naar het 3'-uiteinde
          for (let k = 0; k < 6; k++) {
            const u = ((t / 1400 + k / 6) % 1);
            lead += `<circle cx="${f1(lerp(120, LEAD3 - 10, u))}" cy="${NBOT}" r="4.5" fill="#fff" opacity="${f1(.8 * Math.sin(Math.PI * u))}"/>`;
          }
          lead += arrow(300, 745, 700, 745, NEW, 4, sub(p, .1, .3)) + tag(500, 776, T2("synthese 5′→3′, met de vork mee", "synthesis 5′→3′, along with the fork"), NEW, 18, 'middle', sub(p, .1, .3));
        }
        // close-up proeflezen: basen met letters
        if (step === 8) {
          const X = [693, 711, 729, 747, 765, 783, 801, 819, 837];
          let cl = '';
          const k1 = sub(p, .25, .5), gone = sub(p, .5, .6), put = sub(p, .6, .8);
          X.forEach((x, i) => {
            const b = bAt(x + 7);                        // matrijs (onder de nieuwe streng? nee: boven, y=BOTY)
            cl += txt(x, BOTY - 10, b, BASE[b], 15, 'middle', 700, 'JetBrains Mono');
            let nb = COMP[b], y = NBOT + 24, op = 1;
            if (i === X.length - 1) {
              if (p < .6) { op = 0; }
              else { op = put; }
            }
            cl += `<g opacity="${f1(op)}">${txt(x, y, nb, BASE[nb], 15, 'middle', 700, 'JetBrains Mono')}</g>`;
          });
          const last = X[X.length - 1];
          const bT = bAt(last + 7);
          cl += seg(last, BOTY, last, (BOTY + NBOT) / 2, BASE[bT], 4.5);
          if (p < .6) {
            const wrong = bT === 'A' ? 'C' : bT === 'T' ? 'G' : bT === 'G' ? 'T' : 'A';
            const wx = lerp(last, last - 30, k1), wy = lerp(NBOT - 16, NBOT + 62, k1);
            cl += `<circle cx="${last - 30}" cy="${NBOT + 74}" r="20" fill="#0a1224" stroke="#fff" stroke-width="1.5" stroke-dasharray="4 3" opacity="${f1(sub(p, .15, .3))}"/>`;
            cl += `<g opacity="${f1(1 - gone)}">${seg(wx, wy, wx, wy + 22, BASE[wrong], 5)}${txt(wx + 14, wy + 30, wrong, BASE[wrong], 15, 'middle', 700, 'JetBrains Mono')}</g>`;
            cl += tag(last + 36, BOTY + 20, '✗', C.danger, 26, 'middle', 1 - sub(p, .2, .3));
            cl += tag(last - 112, NBOT + 80, T2("exo-plaats (3′→5′)", "exo site (3′→5′)"), '#fff', 13, 'end', sub(p, .15, .3) * (1 - gone));
          } else {
            cl += `<g opacity="${f1(put)}">${seg(last, (BOTY + NBOT) / 2, last, NBOT, BASE[COMP[bT]], 4.5)}${seg(last - 9, NBOT, last + 9, NBOT, NEW, 7)}</g>`;
            cl += tag(last + 34, BOTY + 20, '✓', C.ok, 26, 'middle', sub(p, .8, .9));
          }
          lead += cl;
        }   // 3'-label van de leidende streng: bij de eiwitten (boven Pol ε), zie onder
        $('rs-lead').innerHTML = lead;

        /* ---- eiwitten ---- */
        let pr = '';
        // CMG rond de leidende-streng-matrijs
        // zijaanzicht van de ring (MCM2-7 + Cdc45 + GINS): bobbelig eiwit met een kanaal waar enkel de leidende-streng-matrijs door loopt
        pr += `<g transform="translate(972 550) rotate(26)"><path d="${eiwitPad(0, 0, 46, 76, 27, .08)}" fill="${C.prot}" fill-opacity=".24" stroke="${C.prot}" stroke-width="4"/>` +
          `<path d="${eiwitPad(-30, -40, 22, 20, 28, .1)}" fill="#b07cf0" fill-opacity=".3" stroke="#b07cf0" stroke-width="2.5"/>` +
          `<rect x="-11" y="-62" width="22" height="124" rx="11" fill="#0b1224" fill-opacity=".45" stroke="${C.prot}" stroke-width="1.5" stroke-opacity=".6"/></g>`;
        pr += tag(1068, 626, 'CMG', '#fff', 26, 'start');                     // componenten + richting: in de ondertitel van stap 0
        pr += arrow(1060, 660, 1150, 660, C.prot, 3.5, 1);
        // Pol ε + PCNA op de leidende streng
        // Pol ε houdt het 3'-uiteinde van de leidende streng vast en zit rechtstreeks tegen CMG aan (Langston et al., PNAS 2014; Zhou et al., PNAS 2017)
        // proeflezen (stap 9): Pol ε blijft op het 3'-uiteinde; de exo-plaats zit in hetzelfde enzym (Alberts, MBoC hfst. 5)
        pr += step === 8 ? prot(LEAD3 - 4, NBOT + 30, 104, 56, C.prot2, '', 18) + txt(LEAD3 + 50, NBOT + 70, 'Pol ε', '#fff', 18, 'middle', 700) : `<g transform="translate(902 684) rotate(-28)">${prot(0, 0, 92, 42, C.prot2, '', 24)}</g>` + txt(900, 716, 'Pol ε', '#fff', 24, 'middle', 700) + endl(LEAD3 - 46, NBOT + 32, "3′", NEW, 18);   // links onder het uiteinde, naast (niet onder) Pol ε
        pr += clamp3(step === 8 ? 640 : LEAD3 - 120, (BOTY + NBOT) / 2, 13, 44, PCNA, 1);
        // Pol α-primase
        const aOp = step < 3 ? (step === 0 ? .0 : 0) : step === 3 ? ease(sub(p, 0, .15)) : step === 4 ? 1 - sub(p, .05, .3) : 0;   // polymerasewissel: Pol α laat los vóór RFC de klem plaatst
        pr += prot(lerp(PRI5 - 10, priA + 10, step === 3 ? sub(p, .2, .9) : 1), 190 - (step === 4 ? 50 * ease(sub(p, 0, .3)) : 0), 86, 36, C.prot3, 'Pol α-primase', 16, aOp);
        if (step === 3) pr += tag(860, 96, p < .58 ? T2('primase: RNA (~10 nt)', 'primase: RNA (~10 nt)') : T2('Pol α: + ~20 nt DNA', 'Pol α: + ~20 nt DNA'), p < .58 ? PRIMER : ADNA, 18);
        // RFC + PCNA + Pol δ op de volgende streng
        const rfcOp = step === 4 ? ease(sub(p, .25, .4)) * (1 - sub(p, .6, .75)) : 0;
        pr += prot(PRI_A + 30, 180, 50, 28, C.prot3, 'RFC', 16, rfcOp);   // RFC zit op de primer-matrijsovergang en legt de klem er rond
        const pcnaOp = step < 4 ? 0 : step === 4 ? ease(sub(p, .35, .6)) : step === 7 ? 1 - sub(p, .6, .9) : step > 7 && step < 9 ? 0 : 1;
        const pcnaX = step >= 6 ? del3 + 22 : PRI_A + 6;
        pr += clamp3(pcnaX, (TOPY + NTOP) / 2, 13, 44, PCNA, pcnaOp) + (step === 4 ? tag(pcnaX + 8, TOPY + 52, T2('PCNA-klem', 'PCNA clamp'), PCNA, 17, 'middle', pcnaOp) : '');
        const dOp = step < 4 ? 0 : step === 4 ? ease(sub(p, .7, .95)) : step === 7 ? 1 - sub(p, 0, .14) : step === 8 ? 0 : 1;   // Pol δ weg vóór FEN1 komt
        // Pol δ zit op de PCNA-klem en omvat het 3'-uiteinde van het groeiende fragment
        const dX = step >= 6 ? del3 - 14 : pcnaX - 20;   // de opgetilde flap komt er rechtsboven uit
        pr += prot(dX, NTOP - (big ? 52 : 46), big ? 70 : 58, big ? 38 : 32, C.prot2, 'Pol δ', big ? 24 : 18, dOp);
        if (step === 6) pr += arrow(del3 - 20, 120, del3 - 120, 120, NEW, 4, sub(p, .05, .2)) + tag(del3 - 70, 102, "5′→3′", NEW, 17, 'middle', sub(p, .05, .2));
        if (step === 6 && p > .6) pr += tag(700, 106, T2('strengverdringing → flap', 'strand displacement → flap'), C.text, 17, 'middle', sub(p, .6, .7));
        // FEN1 en ligase I
        pr += prot(PREV_A + 12, 150, 44, 26, '#e0708f', 'FEN1', 16, step === 7 ? ease(sub(p, .14, .26)) * (1 - sub(p, .45, .54)) : 0);
        pr += prot(PREV_A - 6, 170, 62, 28, '#3fb58f', T2('Ligase I', 'Ligase I'), 16, step === 7 ? ease(sub(p, .55, .65)) * (1 - sub(p, .92, 1)) : 0);
        $('rs-prot').innerHTML = pr;

        /* ---- labels ---- */
        let lb = '';
        lb += tag(200, 134, T2('volgende streng (lagging)', 'lagging strand'), NEW, 25, 'start', big ? 1 : 0);
        lb += tag(200, 744, T2('leidende streng (leading)', 'leading strand'), NEW, 25, 'start', big ? 1 : 0);
        lb += tag(200, 98, T2('Okazaki-fragmenten, ~200 nt', 'Okazaki fragments, ~200 nt'), C.muted, 22, 'start', big ? 1 : 0);
        lb += arrow(1180, 300, 1330, 300, C.text, 4, big ? 1 : 0) + tag(1255, 280, T2('vork beweegt', 'fork moves'), C.text, 23, 'middle', big ? 1 : 0);
        $('rs-lbl').innerHTML = lb;
        $('rs-rep').setAttribute('opacity', big ? 1 : 0);
        $('rs-rep').style.pointerEvents = big ? '' : 'none';
        $('rs-herstel').innerHTML = step === 9 || step === 8 ? (step === 8 ? `<g transform="translate(650 568)"><rect x="-72" y="-15" width="144" height="30" rx="15" fill="rgba(127,220,106,.14)" stroke="${C.ok}" stroke-width="1.5"/>${txt(0, 5, T2('→ fouten herstellen', '→ fixing errors'), C.text, 13)}</g>` : `<g transform="translate(1300 819)"><rect x="-140" y="-27" width="280" height="54" rx="27" fill="rgba(127,220,106,.14)" stroke="${C.ok}" stroke-width="2"/>${txt(0, 8, T2('→ fouten herstellen', '→ fixing errors'), C.text, 22)}</g>`) : '';
      },
    };
  },
};

/* 3D-stappen na stap 9: PDB 7PFO, menselijk kernreplisoom (cryo-EM 3,2 Å; Jones et al., EMBO J 2021).
 * Lokale kopie data/pdb/7PFO.cif is ingekort tot CA- en P-atomen (68 517 zware atomen → 8 469), daarom een bolletjesmodel.
 * Ketens (auth, nagekeken in het mmCIF 05-11-2026): 2–7 = MCM2–7 (ring) · C = Cdc45 · D–G = GINS (Psf1, Psf2, Psf3, Sld5)
 *   · A = Pol ε-subeenheid 2 · B = Pol ε-katalytische subeenheid (alleen 1317–2282, het niet-katalytische deel)
 *   · H, I, J = AND-1 · K = Timeless · L = Tipin · Q = Claspin
 *   · DNA: M = matrijs leidende streng (M26–46 gepaard met N16–36 = ouderduplex vóór de ring; M51–61 enkelstrengig in het
 *     kanaal van de ring, contact met alle zes MCM's) · N = andere streng (alleen het duplexdeel is gemodelleerd). */
const RING = ['2', '3', '4', '5', '6', '7'], CG = ['C', 'D', 'E', 'F', 'G'], POLE = ['A', 'B'], HELP = ['H', 'I', 'J', 'K', 'L', 'Q'];
const POLE_C = '#e0708f', CG_C = '#c9b8ff', HELP_C = '#7f8fb0';
const sp = (sel, color, radius = 2.2) => ({ sel, style: { sphere: { color, radius } } });
const dna7 = r => [sp({ chain: 'M' }, C.dna2, r), sp({ chain: 'N' }, C.dna, r)];
const FADE = sel => sp(sel, '#33415c', .9);

export default with3d(scene, {
  models: { rep: { pdb: '7PFO', up: [{ chain: 'M', resi: [51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61] }, { chain: 'M', resi: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36] }] } },   // ring onder, ouderduplex erboven
  after: {
    9: [
      { dur: 9000, model: 'rep', spin: .01, zoom: {},
        title: { nl: 'De echte machine: één groot blok rond het DNA', en: 'The real machine: one big block around the DNA' },
        text: { nl: 'Dit is een echte meting van de menselijke kopieermachine: elke kleur is een ander onderdeel.', en: 'This is a real measurement of the human copying machine: each colour is a different part.' },
        show: [sp({ chain: RING }, C.prot, 1.6), sp({ chain: CG }, CG_C, 1.1), sp({ chain: POLE }, POLE_C, 1.6), sp({ chain: HELP }, HELP_C, 1.1), ...dna7(4.2),
          { ...sp({ chain: '4' }, C.prot), label: { nl: 'ritsmachine', en: 'helicase (CMG)' } },
          { ...sp({ chain: 'B' }, POLE_C), label: { nl: 'polymerase', en: 'polymerase' } },
          // label op een DNA-stuk dat buiten het eiwit uitsteekt (M 33 ligt ≈ 23 Å van het dichtste eiwitatoom)
          { ...sp({ chain: 'M', resi: 33 }, C.dna2, 4.2), label: 'DNA' }] },
      { dur: 9000, model: 'rep', spin: .008, zoom: { chain: [...RING, 'M', 'N'] },
        title: { nl: 'Maar één streng past door de ring', en: 'Only one strand fits through the ring' },
        text: { nl: 'Vóór de ring is het DNA nog dubbel; door het gat in de ring loopt maar één streng.', en: 'In front of the ring the DNA is still double; only one strand runs through the hole in the ring.' },
        show: [FADE({ chain: [...CG, ...POLE, ...HELP] }), sp({ chain: RING }, C.prot, .9), ...dna7(3.4),
          { ...sp({ chain: 'M', resi: 36 }, C.dna2, 3.4), label: { nl: 'dubbel DNA', en: 'double-stranded DNA' } },
          { ...sp({ chain: 'M', resi: 57 }, C.dna2, 3.4), label: { nl: 'één streng', en: 'single strand' } }] },
    ],
  },
});
