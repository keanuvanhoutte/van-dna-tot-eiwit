import { C, T2, svgOpen, txt, FULL, sub, ease, lerp, f1 } from '../../kit.js';
import { K, prot, panel, eenheid } from './_bkit.js';
import { trna2d, trnaPunt, TRNA_SITE } from '../../bio.js';

/* Antibiotica op het bacteriële ribosoom: tetracycline (A-plaats, 30S), aminoglycosiden (leesplek, 16S-rRNA), macroliden
 * (uitgangstunnel, 50S), kirromycine (op EF-Tu) en waarom ons ribosoom gespaard blijft.
 * Bronnen: Lin et al. 2018 (Annu Rev Biochem, PMC9176271), Kohanski et al. 2010 (PMC2896384), Parmeggiani & Nissen 2006 (kirromycine). */
const S50 = [560, 320, 320, 185], S30 = [560, 600, 280, 115];   // cx, cy, rx, ry
const MY = 505;                                                // hoogte van het mRNA
const SITE = { E: 425, P: 560, A: 695 };
const DRUG = '#ff6b6b', TR = TRNA_SITE.P, TRA = TRNA_SITE.A, CH = C.chain;

/* tRNA = het gedeelde symbool (bio.js trna2d), zonder letters (dit schema toont geen codons); y0 = bovenkant zoals vroeger:
 * y0 = 300 → het tRNA zit met zijn anticodonlus op het mRNA; kleinere y0 = nog onderweg (hoger) */
const TS = .82, trnaY = y0 => MY - 30 * TS - 4 - (300 - y0);
function trna(x, y0, col, op = 1, aaCol = null) {
  return trna2d(x, trnaY(y0), { s: TS, col, op, aaCol, anticodon: null });
}
const pill = (x, y, op = 1, r = 13) => op <= .01 ? '' : `<g opacity="${f1(op)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${DRUG}" stroke="#fff" stroke-width="2.5"/></g>`;

const RIBO = eenheid(S50[0], S50[1], S50[2], S50[3], 50, .22) + eenheid(S30[0], S30[1], S30[2], S30[3], 30, .38);

export default {
  id: 'ribosoomremmers',
  title: { nl: 'Antibiotica op het ribosoom', en: 'Antibiotics on the ribosome' },
  scale: { nl: '70S ≈ 20 nm', en: '70S ≈ 20 nm' }, time: { nl: '≈ 10–20 aminozuren/s (zonder antibioticum)', en: '≈ 10–20 amino acids/s (without antibiotic)' },
  org: { nl: 'bacterie (Escherichia coli) en mens', en: 'bacterium (Escherichia coli) and human' },
  legend: [[K.ribo, { nl: '70S-ribosoom (50S boven, 30S onder)', en: '70S ribosome (50S top, 30S bottom)' }], [C.rna, 'mRNA'], [TR, 'tRNA'], [CH, { nl: 'nieuwe eiwitketen', en: 'new protein chain' }],
    [K.rnap, 'EF-Tu'], [DRUG, { nl: 'antibioticum', en: 'antibiotic' }]],
  simplified: {
    nl: 'Schema, niet op schaal. tRNA’s zijn getekend als klaverblad (echte tRNA’s zijn in 3D L-vormig) en de vorm van het ribosoom is vereenvoudigd. Elk antibioticum heeft zijn eigen precieze bindingsplek; hier staat de zone waar het zit. Macroliden houden niet elk eiwit tegen: ze remmen vooral bij bepaalde aminozuurvolgordes. Onderzoekers gebruiken kirromycine om EF-Tu op het ribosoom vast te zetten, zoals in de 3D-structuur 5AFI.',
    en: 'Schematic, not to scale. tRNAs are drawn as a cloverleaf (real tRNAs are L-shaped in 3D) and the shape of the ribosome is simplified. Each antibiotic has its own precise binding spot; shown is the zone where it sits. Macrolides do not stop every protein: they mainly block at certain amino acid sequences. Researchers use kirromycin to lock EF-Tu on the ribosome, as in the 3D structure 5AFI.' },
  parts: [
    { c: K.ribo, t: '50S', d: { nl: 'De grote helft van het ribosoom (boven). Hier worden de bouwstenen aan elkaar gezet.', en: 'The large half of the ribosome (top). Here the building blocks are joined together.' },
      p: { nl: 'Grote subeenheid met het peptidyltransferasecentrum en de uitgangstunnel.', en: 'Large subunit with the peptidyl transferase centre and the exit tunnel.' } },
    { c: K.ribo, t: '30S', d: { nl: 'De kleine helft van het ribosoom (onder). Ze leest de RNA-boodschap.', en: 'The small half of the ribosome (bottom). It reads the RNA message.' },
      p: { nl: 'Kleine subeenheid met het decoderingscentrum in het 16S-rRNA.', en: 'Small subunit with the decoding centre in the 16S rRNA.' } },
    { c: C.rna, t: 'mRNA', m: ['5′', '3′'], d: { nl: 'De oranje draad tussen de twee helften: de RNA-boodschap die gelezen wordt.', en: 'The orange strand between the two halves: the RNA message being read.' },
      p: { nl: 'mRNA in het kanaal tussen 30S en 50S, gelezen 5′→3′.', en: 'mRNA in the channel between 30S and 50S, read 5′→3′.' } },
    { c: C.muted, t: { nl: 'E, P, A', en: 'E, P, A' }, m: ['E', 'P', 'A'], d: { nl: 'De drie plekken voor tRNA’s: uitgang (E), middelste plek met de groeiende keten (P) en aankomst van het nieuwe tRNA (A).', en: 'The three spots for tRNAs: exit (E), middle spot with the growing chain (P) and arrival of the new tRNA (A).' },
      p: { nl: 'Exit-, peptidyl- en aminoacyl-tRNA-plaats.', en: 'Exit, peptidyl and aminoacyl tRNA sites.' } },
    { c: TR, t: 'tRNA', d: { nl: 'De klaverbladjes: kleine RNA’s die elk een bouwsteen (aminozuur) naar het ribosoom brengen.', en: 'The cloverleaves: small RNAs that each bring a building block (amino acid) to the ribosome.' },
      p: { nl: 'Transfer-RNA’s in P- en A-plaats (schematisch als klaverblad; in 3D L-vormig).', en: 'Transfer RNAs in the P and A sites (drawn as cloverleaf; L-shaped in 3D).' } },
    { c: CH, t: { nl: 'nieuwe eiwitketen', en: 'new protein chain' }, d: { nl: 'De kralenketting: het eiwit in wording, dat door een tunnel in de grote helft naar buiten gaat.', en: 'The string of beads: the protein being made, leaving through a tunnel in the large half.' },
      p: { nl: 'Naissante polypeptideketen, vastgehecht aan het P-plaats-tRNA.', en: 'Nascent polypeptide chain, attached to the P-site tRNA.' } },
    { c: K.ribo, t: { nl: 'A-plaats (30S)', en: 'A site (30S)' }, m: ['waar het nieuwe tRNA landt', 'where the new tRNA lands'], d: { nl: 'De plek waar het volgende tRNA aankomt.', en: 'The spot where the next tRNA arrives.' },
      p: { nl: 'Aminoacyl-tRNA-bindingsplaats op de 30S.', en: 'Aminoacyl-tRNA binding site on the 30S.' } },
    { c: K.ribo, t: { nl: 'leesplek (30S)', en: 'reading site (30S)' }, m: ['controleert codon en anticodon', 'checks codon and anticodon'], d: { nl: 'De plek die controleert of het tRNA past bij de drie letters op de RNA-boodschap.', en: 'The spot that checks whether the tRNA matches the three letters on the RNA message.' },
      p: { nl: 'Decoderingscentrum (helix 44 van het 16S-rRNA, A1492/A1493) dat de codon–anticodonparing controleert.', en: 'Decoding centre (helix 44 of the 16S rRNA, A1492/A1493) that monitors codon–anticodon pairing.' } },
    { c: K.ribo, t: { nl: 'uitgangstunnel (50S)', en: 'exit tunnel (50S)' }, m: ['waar de nieuwe keten naar buiten gaat', 'where the new chain leaves'], d: { nl: 'De donkere tunnel door de grote helft waarlangs de nieuwe keten naar buiten gaat.', en: 'The dark tunnel through the large half through which the new chain leaves.' },
      p: { nl: 'Peptide-uitgangstunnel van de 50S, ≈ 100 Å lang.', en: 'Peptide exit tunnel of the 50S, ≈ 100 Å long.' } },
    { c: DRUG, t: { nl: 'antibioticum', en: 'antibiotic' }, d: { nl: 'De rode bolletjes: het geneesmiddel op zijn plek in het ribosoom.', en: 'The red dots: the drug at its spot in the ribosome.' },
      p: { nl: 'Antibioticum in zijn bindingszone (schematisch).', en: 'Antibiotic in its binding zone (schematic).' } },
    { c: DRUG, t: 'Tetracycline', m: ['o.a. doxycycline', 'e.g. doxycycline', 'geen nieuw tRNA', 'no new tRNA', '→ de keten groeit niet verder', '→ the chain stops growing'], d: { nl: 'Zit op de kleine helft, precies op de aankomstplek, en houdt nieuwe tRNA’s tegen, zodat de keten niet verder groeit.', en: 'Sits on the small half, right at the arrival spot, and blocks new tRNAs, so the chain stops growing.' },
      p: { nl: 'Bindt het 16S-rRNA bij de A-plaats en verhindert de accommodatie van aminoacyl-tRNA.', en: 'Binds the 16S rRNA at the A site and prevents accommodation of aminoacyl-tRNA.' } },
    { c: DRUG, t: { nl: 'Aminoglycosiden', en: 'Aminoglycosides' }, m: ['gentamicine, streptomycine', 'gentamicin, streptomycin', 'verkeerde aminozuren', 'wrong amino acids', 'verkeerd', 'wrong', '→ foute, slecht gevouwen eiwitten', '→ faulty, misfolded proteins'], d: { nl: 'Zitten op de leesplek en verstoren de controle: er komen verkeerde bouwstenen in, en het eiwit vouwt slecht.', en: 'Sit on the reading site and disturb the check: wrong building blocks get in, and the protein folds poorly.' },
      p: { nl: 'Binden helix 44 van het 16S-rRNA en verlagen de nauwkeurigheid van de decodering (misincorporatie).', en: 'Bind helix 44 of the 16S rRNA and reduce decoding fidelity (misincorporation).' } },
    { c: DRUG, t: { nl: 'Macroliden', en: 'Macrolides' }, m: ['erytromycine, azitromycine', 'erythromycin, azithromycin', 'de keten raakt vast', 'the chain gets stuck', 'vast', 'stuck', '→ vooral bij bepaalde volgordes', '→ mainly at certain sequences'], d: { nl: 'Zitten in de uitgangstunnel en maken die nauwer. Bij bepaalde ketens raakt het ribosoom dan vast.', en: 'Sit in the exit tunnel and make it narrower. With certain chains the ribosome then gets stuck.' },
      p: { nl: 'Binden in de uitgangstunnel nabij A2058 en veroorzaken contextafhankelijke translatiestops.', en: 'Bind in the exit tunnel near A2058 and cause context-dependent translation arrest.' } },
    { c: K.rnap, t: 'EF-Tu', m: ['kan niet weg', 'cannot leave', 'EF-Tu blijft hangen', 'EF-Tu stays stuck', '→ het ribosoom zit vast', '→ the ribosome is jammed'], d: { nl: 'Het helper-eiwit dat tRNA’s naar het ribosoom brengt en daarna weer vertrekt.', en: 'The helper protein that brings tRNAs to the ribosome and then leaves again.' },
      p: { nl: 'Elongatiefactor Tu (GTPase) die aminoacyl-tRNA aflevert in de A-plaats.', en: 'Elongation factor Tu (GTPase) that delivers aminoacyl-tRNA to the A site.' } },
    { c: DRUG, t: { nl: 'Kirromycine', en: 'Kirromycin' }, m: ['raakt EF-Tu, niet het ribosoom', 'hits EF-Tu, not the ribosome'], d: { nl: 'Raakt niet het ribosoom zelf maar het helper-eiwit EF-Tu: dat kan niet meer weg, en het ribosoom zit vast.', en: 'Hits not the ribosome itself but the helper protein EF-Tu: it can no longer leave, and the ribosome is jammed.' },
      p: { nl: 'Houdt EF-Tu·GDP na GTP-hydrolyse vast op het ribosoom en blokkeert zo de volgende elongatiecyclus.', en: 'Traps EF-Tu·GDP on the ribosome after GTP hydrolysis, blocking the next elongation cycle.' } },
    { c: C.ok, t: { nl: 'A1408 → bij ons G', en: 'A1408 → G in humans' }, m: ['A2058 → bij ons G', 'A2058 → G in humans', 'Eén letter verschil', 'One letter different', 'bacterie: A', 'bacterium: A', 'mens (80S): G', 'human (80S): G', 'antibioticum past', 'antibiotic fits', 'antibioticum past slecht', 'antibiotic fits poorly'], d: { nl: 'Op twee sleutelplekken heeft het bacteriële ribosoom de RNA-letter A, het onze een G. Daardoor passen de middelen slecht op ons ribosoom.', en: 'At two key spots the bacterial ribosome has the RNA letter A, ours a G. That is why the drugs fit our ribosome poorly.' },
      p: { nl: 'A1408 (16S, aminoglycosiden) en A2058 (23S, macroliden) zijn G in het eukaryote 80S-ribosoom.', en: 'A1408 (16S, aminoglycosides) and A2058 (23S, macrolides) are G in the eukaryotic 80S ribosome.' } },
    { c: C.muted, t: { nl: 'mitochondriale ribosomen', en: 'mitochondrial ribosomes' }, m: ['Let op: de ribosomen in onze', 'Note: the ribosomes in our', 'mitochondriën kunnen wél', 'mitochondria can be', 'geraakt worden', 'hit after all'], d: { nl: 'Onze mitochondriën (de energiecentrales van de cel) hebben ribosomen die op die van bacteriën lijken. Sommige antibiotica raken die toch.', en: 'Our mitochondria (the cell’s power stations) have ribosomes that resemble bacterial ones. Some antibiotics do hit them.' },
      p: { nl: 'Mitoribosomen (55S) zijn van bacteriële oorsprong; remming ervan verklaart bijwerkingen van bv. chlooramfenicol en aminoglycosiden.', en: 'Mitoribosomes (55S) are of bacterial origin; their inhibition explains side effects of e.g. chloramphenicol and aminoglycosides.' } },
  ],
  steps: [
    { dur: 8500, cam: FULL, title: { nl: 'Het ribosoom: een topdoelwit', en: 'The ribosome: a top target' },
      text: { nl: 'Veel antibiotica remmen het ribosoom van de bacterie.', en: 'Many antibiotics inhibit the bacterial ribosome.' } },
    { dur: 9000, cam: FULL, title: { nl: 'Tetracycline houdt de A-plaats bezet', en: 'Tetracycline blocks the A site' },
      text: { nl: 'Tetracycline zit op de kleine eenheid, waar het nieuwe tRNA moet landen. Dat tRNA kan er niet meer in.', en: 'Tetracycline sits on the small subunit, where the new tRNA should land. That tRNA can no longer get in.' } },
    { dur: 9000, cam: FULL, title: { nl: 'Aminoglycosiden laten het ribosoom fouten maken', en: 'Aminoglycosides make the ribosome err' },
      text: { nl: 'Gentamicine bindt het RNA van de leesplek. Het ribosoom laat dan ook verkeerde tRNA’s toe.', en: 'Gentamicin binds the RNA of the reading site. The ribosome then also lets in wrong tRNAs.' } },
    { dur: 9000, cam: FULL, title: { nl: 'Macroliden vernauwen de uitgangstunnel', en: 'Macrolides narrow the exit tunnel' },
      text: { nl: 'Erytromycine zit in de tunnel waardoor de nieuwe keten naar buiten gaat. Bij veel eiwitten stokt de aanmaak.', en: 'Erythromycin sits in the tunnel the new chain leaves through. For many proteins, production stalls.' } },
    { dur: 9000, cam: FULL, title: { nl: 'Kirromycine zet de helper EF-Tu vast', en: 'Kirromycin locks the helper EF-Tu' },
      text: { nl: 'Kirromycine raakt niet het ribosoom, maar EF-Tu, dat tRNA’s aanbrengt. EF-Tu blijft dan op het ribosoom vastzitten.', en: 'Kirromycin does not hit the ribosome but EF-Tu, which brings in tRNAs. EF-Tu then stays stuck on the ribosome.' } },
    { dur: 10000, cam: FULL, title: { nl: 'Waarom ons ribosoom gespaard blijft', en: 'Why our ribosome is spared' },
      text: { nl: 'Op de plek waar gentamicine en erytromycine binden, heeft ons ribosoom een G in plaats van een A. Mede daardoor werken ze bij ons niet.', en: 'Where gentamicin and erythromycin bind, our ribosome has a G instead of an A. That is a key reason they do not work in us.' } },
  ],
  svg() {
    return svgOpen() + `
    <g id="rr-main"></g>
    <g id="rr-h1" data-node="beftu" data-color="${K.rnap}" data-label="${T2('EF-Tu in 3D', 'EF-Tu in 3D')}"><circle cx="830" cy="250" r="60" fill="transparent"/><circle data-anchor="beftu" cx="830" cy="150" r="1" fill="none"/></g>
    <g data-node="bribosoom" data-color="${K.ribo}" data-label="${T2('Het 70S-ribosoom in 3D', 'The 70S ribosome in 3D')}" data-pos="below"><ellipse cx="${S30[0]}" cy="${S30[1]}" rx="${S30[2] - 40}" ry="${S30[3] - 30}" fill="transparent"/><circle data-anchor="bribosoom" cx="${S30[0]}" cy="${S30[1] + 105}" r="1" fill="none"/></g>
    <g id="rr-side"></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const fade = sub(p, .12, .35);
        let g = '';
        // ribosoom
        g += RIBO;   // 50S en 30S als bobbelige eenheden die tegen elkaar liggen (mRNA in de spleet ertussen)
        g += txt(S50[0] - 230, S50[1] - 95, '50S', K.ribo, 30, 'middle', 800) + txt(S30[0] - 210, S30[1] + 50, '30S', K.ribo, 30, 'middle', 800);
        // uitgangstunnel
        const tun = step === 3 ? 1 : .55;
        g += `<path d="M${SITE.P + 20},${MY - 230} C${SITE.P + 40},250 ${SITE.P + 70},190 ${SITE.P + 90},${S50[1] - S50[3] + 2}" fill="none" stroke="#0b1224" stroke-width="34" stroke-linecap="round" opacity="${f1(tun)}"/>`;
        // mRNA
        g += `<line x1="170" y1="${MY}" x2="950" y2="${MY}" stroke="${C.rna}" stroke-width="7" stroke-linecap="round"/>` + txt(170, MY + 40, "5′", C.rna, 22, 'middle', 700) + txt(950, MY + 40, "3′", C.rna, 22, 'middle', 700);
        // plaatsen
        for (const [k, x] of Object.entries(SITE)) g += txt(x, MY + 46, k, C.muted, 24, 'middle', 800);
        // P-tRNA met keten door de tunnel
        g += trna(SITE.P, 300, TR, 1);
        const stall = step === 3 ? ease(sub(p, .4, .7)) : 0;
        const chainLen = step === 3 ? lerp(4, 3, stall) : 6;
        let cx = SITE.P, cy = 286;
        for (let i = 0; i < chainLen; i++) {
          const tp = trnaPunt(SITE.P, trnaY(300), { s: TS });   // nieuwste aminozuur op het CCA-uiteinde van het P-tRNA, de rest door de tunnel
          const nx = i ? SITE.P + 20 + (i - 1) * 14 : tp[0], ny = i ? 280 - (i - 1) * 26 : tp[1];
          if (i) g += `<line x1="${f1(cx)}" y1="${f1(cy)}" x2="${f1(nx)}" y2="${f1(ny)}" stroke="${CH}" stroke-width="5"/>`;
          g += `<circle cx="${f1(nx)}" cy="${f1(ny)}" r="12" fill="${step === 2 && i === 0 && p > .6 ? DRUG : CH}" stroke="#0a1224" stroke-width="2"/>`;
          cx = nx; cy = ny;
        }
        // A-plaats: inkomend tRNA (stap 0, 2) of geblokkeerd (stap 1) of met EF-Tu (stap 4)
        if (step === 0) g += trna(SITE.A, lerp(150, 300, ease(sub(p, .2, .7))), TRA, 1, CH);
        if (step === 1) {
          const u = ease(sub(p, .35, .6)), back = ease(sub(p, .6, .9));
          g += trna(SITE.A + 150 * back, lerp(170, 250, u) - 80 * back, TRA, 1 - .5 * back, CH);
          g += pill(SITE.A + 34, MY + 24, fade);   // op de 30S naast de A-plaats, niet over de letter
          if (back > .2) g += `<g opacity="${f1(back)}">` + txt(SITE.A + 190, 150, '✕', DRUG, 40, 'middle', 800) + '</g>';
        }
        if (step === 2) {
          g += pill(SITE.A - 30, MY + 42, fade);
          g += trna(SITE.A, lerp(150, 300, ease(sub(p, .3, .6))), '#ff9d9d', 1, DRUG);
          if (p > .6) g += `<g opacity="${f1(sub(p, .6, .8))}">` + txt(SITE.A + 110, 260, T2('verkeerd', 'wrong'), DRUG, 24, 'start', 800).replace(/<text/g, '<text paint-order="stroke" stroke="#0b1224" stroke-width="6" stroke-linejoin="round"') + '</g>';
        }
        if (step === 3) g += pill(SITE.P + 48, 232, fade, 15) + `<g opacity="${f1(stall)}">` + txt(SITE.P + 120, 165, T2('vast', 'stuck'), DRUG, 26, 'start', 800).replace(/<text/g, '<text paint-order="stroke" stroke="#0b1224" stroke-width="6" stroke-linejoin="round"') + '</g>';
        if (step === 4) {
          g += trna(SITE.A, 300, TRA, 1, CH);
          g += prot(SITE.A + 120, 255, 70, 50, K.rnap, 1, 9, 'EF-Tu', 22) + pill(SITE.A + 150, 228, fade);
          g += `<g opacity="${f1(sub(p, .5, .75))}">` + txt(SITE.A + 120, 340, T2('kan niet weg', 'cannot leave'), DRUG, 23, 'middle', 800).replace(/<text/g, '<text paint-order="stroke" stroke="#0b1224" stroke-width="6" stroke-linejoin="round"') + '</g>';
        }
        if (step === 5) {
          g += `<g opacity="${f1(fade)}"><circle cx="${SITE.A - 30}" cy="${MY + 42}" r="16" fill="none" stroke="${C.ok}" stroke-width="4"/><circle cx="${SITE.P + 48}" cy="232" r="18" fill="none" stroke="${C.ok}" stroke-width="4"/></g>`;
          g += `<g opacity="${f1(sub(p, .3, .5))}">` + txt(SITE.A + 40, MY + 90, T2('A1408 → bij ons G', 'A1408 → G in humans'), C.ok, 22, 'start', 700).replace(/<text/g, '<text paint-order="stroke" stroke="#0b1224" stroke-width="6" stroke-linejoin="round"') + txt(SITE.P + 95, 236, T2('A2058 → bij ons G', 'A2058 → G in humans'), C.ok, 22, 'start', 700).replace(/<text/g, '<text paint-order="stroke" stroke="#0b1224" stroke-width="6" stroke-linejoin="round"') + '</g>';
        }
        $('rr-main').innerHTML = g;
        $('rr-h1').setAttribute('opacity', step === 4 ? 1 : 0);

        // rechterpaneel
        const X = 1060, W = 500, MX = X + W / 2;
        let sd = panel(X, 170, W, 480);
        const line2 = (y, a, b, col = C.text) => txt(MX, y, a, col, 24, 'middle', 700) + (b ? txt(MX, y + 34, b, C.muted, 21, 'middle', 500) : '');
        if (step === 0) {
          sd += line2(230, T2('Drie plekken op het ribosoom', 'Three spots on the ribosome'));
          sd += line2(320, T2('A-plaats (30S)', 'A site (30S)'), T2('waar het nieuwe tRNA landt', 'where the new tRNA lands'));
          sd += line2(420, T2('leesplek (30S)', 'reading site (30S)'), T2('controleert codon en anticodon', 'checks codon and anticodon'));
          sd += line2(520, T2('uitgangstunnel (50S)', 'exit tunnel (50S)'), T2('waar de nieuwe keten naar buiten gaat', 'where the new chain leaves'));
        }
        if (step === 1) sd += line2(260, T2('Tetracycline', 'Tetracycline'), T2('o.a. doxycycline', 'e.g. doxycycline')) + `<g opacity="${f1(sub(p, .5, .75))}">` + line2(400, T2('geen nieuw tRNA', 'no new tRNA'), T2('→ de keten groeit niet verder', '→ the chain stops growing'), DRUG) + '</g>';
        if (step === 2) sd += line2(260, T2('Aminoglycosiden', 'Aminoglycosides'), T2('gentamicine, streptomycine', 'gentamicin, streptomycin')) + `<g opacity="${f1(sub(p, .55, .8))}">` + line2(400, T2('verkeerde aminozuren', 'wrong amino acids'), T2('→ foute, slecht gevouwen eiwitten', '→ faulty, misfolded proteins'), DRUG) + '</g>';
        if (step === 3) sd += line2(260, T2('Macroliden', 'Macrolides'), T2('erytromycine, azitromycine', 'erythromycin, azithromycin')) + `<g opacity="${f1(sub(p, .5, .75))}">` + line2(400, T2('de keten raakt vast', 'the chain gets stuck'), T2('→ vooral bij bepaalde volgordes', '→ mainly at certain sequences'), DRUG) + '</g>';
        if (step === 4) sd += line2(260, T2('Kirromycine', 'Kirromycin'), T2('raakt EF-Tu, niet het ribosoom', 'hits EF-Tu, not the ribosome')) + `<g opacity="${f1(sub(p, .5, .75))}">` + line2(400, T2('EF-Tu blijft hangen', 'EF-Tu stays stuck'), T2('→ het ribosoom zit vast', '→ the ribosome is jammed'), DRUG) + '</g>';
        if (step === 5) {
          sd += line2(240, T2('Eén letter verschil', 'One letter different'));
          sd += `<g opacity="${f1(sub(p, .2, .4))}">` + line2(320, T2('bacterie: A', 'bacterium: A'), T2('antibioticum past', 'antibiotic fits'), DRUG) + '</g>';
          sd += `<g opacity="${f1(sub(p, .4, .6))}">` + line2(430, T2('mens (80S): G', 'human (80S): G'), T2('antibioticum past slecht', 'antibiotic fits poorly'), C.ok) + '</g>';
          sd += `<g opacity="${f1(sub(p, .65, .85))}">` + txt(MX, 545, T2('Let op: de ribosomen in onze', 'Note: the ribosomes in our'), C.muted, 22, 'middle', 500) + txt(MX, 577, T2('mitochondriën kunnen wél', 'mitochondria can be'), C.muted, 22, 'middle', 500) + txt(MX, 609, T2('geraakt worden', 'hit after all'), C.muted, 22, 'middle', 500) + '</g>';
        }
        $('rr-side').innerHTML = sd;
      },
    };
  },
};
