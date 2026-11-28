import { C, L, T2, svgOpen, txt, mono, pill, cam, FULL, sub, ease, lerp, clamp, f1, rng } from '../../kit.js';
import { ST, panel, smooth } from './_a_kit.js';
import { kernEnvelop, ptsBoog, eiwit } from '../../bio.js';

/* K(): tekst die ook in het overzichtsbeeld (laatste stap) zichtbaar blijft */
const K = h => h.replace('<text', '<text class="keep"');

/*
 * Nucleolus: FC/DFC/GC, rDNA-herhalingen op de 5 acrocentrische chromosomen, Pol I-"kerstbomen",
 * 47S pre-rRNA → 18S + 5.8S + 28S (+ 5S van Pol III), snoRNP-modificaties, assemblage en export van pre-40S/pre-60S.
 */
const NC = [400, 450], NRX = 280, NRY = 250;
const FCS = [[330, 370], [480, 400], [350, 540], [505, 545]];   // fibrillaire centra
const TREE = { x0: 790, x1: 1170, y: 300 };                     // één getranscribeerde eenheid in het Miller-paneel
const PRE = { x0: 780, y: 610 };                                 // 47S-schema
const SEG = [['5′ETS', 60, '#6b7a99'], ['18S', 170, C.rrna], ['ITS1', 60, '#6b7a99'], ['5.8S', 40, '#7fe0c8'], ['ITS2', 55, '#6b7a99'], ['28S', 290, '#1fa38a'], ['3′ETS', 35, '#6b7a99']];

export default {
  id: 'nucleolus',
  title: { nl: 'Nucleolus', en: 'Nucleolus' },
  scale: { nl: '≈ 1–5 µm', en: '≈ 1–5 µm' },
  time: { nl: 'groeiende cel: ~10 000 subeenheden per minuut', en: 'growing cell: ~10,000 subunits per minute' },
  org: { nl: 'mens', en: 'human' },
  legend: [[C.rrna, 'rRNA / rDNA'], ['#9fb3d9', { nl: 'fibrillair centrum (FC)', en: 'fibrillar centre (FC)' }], ['#5a6f9e', { nl: 'dicht fibrillair component (DFC)', en: 'dense fibrillar component (DFC)' }], ['#2a3d63', { nl: 'granulair component (GC)', en: 'granular component (GC)' }], [C.prot, { nl: 'RNA-polymerase I', en: 'RNA polymerase I' }], [C.trna, 'snoRNP'], [C.dna, { nl: 'acrocentrisch chromosoom', en: 'acrocentric chromosome' }]],
  simplified: {
    nl: 'Een menselijke kern heeft meestal 1–3 nucleoli; elke nucleolus bevat veel meer FC/DFC-eenheden dan getekend. De Miller-"kerstboom" toont één actieve rDNA-eenheid met slechts enkele tientallen polymerasen. Het 47S-schema is niet op schaal en de knipvolgorde is vereenvoudigd (er zijn meerdere alternatieve routes). De tijd is een orde van grootte.',
    en: 'A human nucleus usually has 1–3 nucleoli; each nucleolus contains far more FC/DFC units than drawn. The Miller "Christmas tree" shows one active rDNA unit with only a few dozen polymerases. The 47S scheme is not to scale and the cleavage order is simplified (there are several alternative pathways). The time is an order of magnitude.' },
  /* "Wat zie je?" (zijpaneel): elk onderdeel van de figuur in één zin — d = eenvoudig, p = vaktaal (hoger) */
  parts: [
    { c: '#4d6aa0', t: 'nucleolus', d: { nl: 'Het grootste lichaampje in de kern, zonder eigen wand. Hier maakt de cel de onderdelen van ribosomen.', en: 'The largest body in the nucleus, without its own membrane. Here the cell makes the parts of ribosomes.' },
      p: { nl: 'Membraanloos kerncompartiment gevormd rond actieve rDNA-clusters; plaats van ribosoombiogenese.', en: 'Membraneless nuclear compartment formed around active rDNA clusters; site of ribosome biogenesis.' } },
    { c: C.dna, t: { nl: 'chromosomen met rDNA', en: 'chromosomes with rDNA' }, m: ['13', '14', '15', '21', '22'], d: { nl: 'Vijf chromosomen (13, 14, 15, 21 en 22) steken met hun korte arm in de nucleolus. Daar liggen de genen voor ribosoom-RNA (groene stippellijn).', en: 'Five chromosomes (13, 14, 15, 21 and 22) stick their short arm into the nucleolus. The genes for ribosomal RNA lie there (green dashed line).' },
      p: { nl: 'Acrocentrische chromosomen met nucleolusorganisatorgebieden (NOR) op de korte armen.', en: 'Acrocentric chromosomes with nucleolus organiser regions (NORs) on their short arms.' } },
    { c: '#9fb3d9', t: { nl: 'fibrillair centrum (FC)', en: 'fibrillar centre (FC)' }, m: ['binnen: RNA maken', 'inside: making RNA'], d: { nl: 'De lichte kern van elk bolletje: hier ligt het DNA en begint het maken van ribosoom-RNA.', en: 'The light core of each sphere: the DNA lies here and making ribosomal RNA starts.' },
      p: { nl: 'Fibrillair centrum met rDNA en Pol I; transcriptie vindt plaats op de grens FC/DFC.', en: 'Fibrillar centre containing rDNA and Pol I; transcription occurs at the FC/DFC border.' } },
    { c: '#5a6f9e', t: { nl: 'dicht fibrillair deel (DFC)', en: 'dense fibrillar part (DFC)' }, m: ['midden: bijwerken', 'middle: modifying'], d: { nl: 'De donkere ring rond het lichte centrum: hier wordt het nieuwe RNA bijgewerkt en geknipt.', en: 'The dark ring around the light centre: here the new RNA is modified and cut.' },
      p: { nl: 'Dicht fibrillair component: vroege pre-rRNA-processing en modificatie door snoRNP’s (o.a. fibrillarine).', en: 'Dense fibrillar component: early pre-rRNA processing and modification by snoRNPs (incl. fibrillarin).' } },
    { c: '#2a3d63', t: { nl: 'granulair deel (GC)', en: 'granular part (GC)' }, m: ['buiten: in elkaar zetten', 'outside: assembling'], d: { nl: 'Het buitenste deel met de groene korreltjes: hier worden de ribosoomdelen in elkaar gezet.', en: 'The outer part with the green grains: here the ribosome parts are assembled.' },
      p: { nl: 'Granulair component: late processing en assemblage van pre-ribosomale deeltjes.', en: 'Granular component: late processing and assembly of pre-ribosomal particles.' } },
    { c: C.rrna, t: 'rDNA', m: ['rDNA en Pol I', 'rDNA and Pol I', 'getranscribeerde eenheid ~13 kb', 'transcribed unit ~13 kb', 'één herhaling ≈ 43–45 kb · honderden kopieën', 'one repeat ≈ 43–45 kb · hundreds of copies'], d: { nl: 'De genen voor ribosoom-RNA, in honderden kopieën achter elkaar. Elk afgelezen stuk is ongeveer 13 000 letters lang.', en: 'The genes for ribosomal RNA, in hundreds of copies one after another. Each part that is read is about 13,000 letters long.' },
      p: { nl: 'rDNA-tandemherhalingen (≈ 43–45 kb), elk met een getranscribeerde eenheid van ~13 kb.', en: 'rDNA tandem repeats (≈ 43–45 kb), each with a ~13 kb transcribed unit.' } },
    { c: C.muted, t: { nl: 'spacer (IGS)', en: 'spacer (IGS)' }, m: ['spacer (IGS) ~30 kb'], d: { nl: 'Het tussenstuk tussen twee kopieën. Het wordt geen ribosoom-RNA.', en: 'The stretch between two copies. It does not become ribosomal RNA.' },
      p: { nl: 'Intergene spacer (~30 kb) met regulatorische elementen.', en: 'Intergenic spacer (~30 kb) containing regulatory elements.' } },
    { c: '#fff', t: 'promoter', d: { nl: 'Het pijltje: de startplek waar het aflezen van elke kopie begint.', en: 'The arrow: the start site where reading of each copy begins.' },
      p: { nl: 'rDNA-promoter, herkend door SL1 en UBF voor Pol I-initiatie.', en: 'rDNA promoter, recognised by SL1 and UBF for Pol I initiation.' } },
    { c: C.prot, t: 'Pol I', d: { nl: 'De paarse bolletjes: enzymen die tegelijk één gen aflezen. Verderop is hun RNA langer, zoals een kerstboom.', en: 'The purple dots: enzymes reading one gene at the same time. Further along their RNA is longer, like a Christmas tree.' },
      p: { nl: 'RNA-polymerase I, transcribeert enkel het 47S pre-rRNA; dicht bezet (‘Miller-kerstboom’).', en: 'RNA polymerase I, transcribes only the 47S pre-rRNA; densely loaded (‘Miller Christmas tree’).' } },
    { c: C.rrna, t: '47S pre-rRNA', m: ['47S pre-rRNA (~13 kb)', '47S pre-rRNA → subeenheden', '47S pre-rRNA → subunits', '5′', '3′'], d: { nl: 'Het eerste lange RNA: drie ribosoomstukken samen, met tussenstukken ertussen.', en: 'The first long RNA: three ribosome pieces together, with spacers in between.' },
      p: { nl: 'Polycistronisch 47S-voorloper-rRNA met 18S, 5.8S en 28S, geflankeerd door ETS en gescheiden door ITS.', en: 'Polycistronic 47S precursor rRNA containing 18S, 5.8S and 28S, flanked by ETSs and separated by ITSs.' } },
    { c: '#6b7a99', t: { nl: 'opvulstukken', en: 'spacers' }, m: ['5′ETS', 'ITS1', 'ITS2', '3′ETS', 'grijs = opvulstukken (ETS, ITS): worden weggeknipt', 'grey = spacers (ETS, ITS): cut out'], d: { nl: 'De grijze stukken: ze worden weggeknipt en horen niet in het ribosoom.', en: 'The grey pieces: they are cut out and do not belong in the ribosome.' },
      p: { nl: 'Externe (5′/3′-ETS) en interne (ITS1/2) getranscribeerde spacers, verwijderd door endo- en exonucleolytische processing.', en: 'External (5′/3′ ETS) and internal (ITS1/2) transcribed spacers, removed by endo- and exonucleolytic processing.' } },
    { c: C.rrna, t: '18S', d: { nl: 'Het RNA voor het kleine ribosoomdeel.', en: 'The RNA for the small ribosome part.' },
      p: { nl: '18S rRNA, kern van de 40S-subeenheid.', en: '18S rRNA, core of the 40S subunit.' } },
    { c: '#7fe0c8', t: '5.8S', d: { nl: 'Een kort RNA voor het grote ribosoomdeel.', en: 'A short RNA for the large ribosome part.' },
      p: { nl: '5.8S rRNA, via basenparing aan 28S gebonden in de 60S-subeenheid.', en: '5.8S rRNA, base-paired with 28S in the 60S subunit.' } },
    { c: '#1fa38a', t: '28S', d: { nl: 'Het grootste RNA, voor het grote ribosoomdeel.', en: 'The largest RNA, for the large ribosome part.' },
      p: { nl: '28S rRNA, bevat het peptidyltransferasecentrum van de 60S-subeenheid.', en: '28S rRNA, contains the peptidyl transferase centre of the 60S subunit.' } },
    { c: '#bfeee2', t: '5S', m: ['(Pol III, chr 1)'], d: { nl: 'Een klein RNA voor het grote ribosoomdeel. Het wordt elders gemaakt, door een ander enzym, van genen op chromosoom 1.', en: 'A small RNA for the large ribosome part. It is made elsewhere, by a different enzyme, from genes on chromosome 1.' },
      p: { nl: '5S rRNA, getranscribeerd door Pol III van de 5S-genen op chromosoom 1, buiten de nucleolus.', en: '5S rRNA, transcribed by Pol III from the 5S genes on chromosome 1, outside the nucleolus.' } },
    { c: C.trna, t: { nl: 'gids-RNA', en: 'guide RNA' }, m: ['zet een methylgroep (box C/D)', 'adds a methyl group (box C/D)'], d: { nl: 'Een klein RNA met eiwitten. Het wijst aan waar het ribosoom-RNA een methylgroep krijgt (gele bolletjes).', en: 'A small RNA with proteins. It points out where the ribosomal RNA gets a methyl group (yellow dots).' },
      p: { nl: 'Box C/D-snoRNP: 2′-O-methylering van het ribose, geleid door basenparing van het snoRNA.', en: 'Box C/D snoRNP: 2′-O-methylation of the ribose, guided by base pairing of the snoRNA.' } },
    { c: '#ff8a8a', t: 'Ψ', m: ['verbouwt een U tot Ψ (box H/ACA)', 'turns a U into Ψ (box H/ACA)'], d: { nl: 'Een ander gids-RNA met eiwitten verbouwt een U tot pseudo-uridine (Ψ) (rode bolletjes).', en: 'Another guide RNA with proteins turns a U into pseudouridine (Ψ) (red dots).' },
      p: { nl: 'Box H/ACA-snoRNP: pseudouridylering (isomerisatie van uridine tot Ψ).', en: 'Box H/ACA snoRNP: pseudouridylation (isomerisation of uridine to Ψ).' } },
    { c: C.rrna, t: 'pre-40S', d: { nl: 'Het kleine ribosoomdeel in aanbouw: het RNA met eiwitten erop.', en: 'The small ribosome part under construction: the RNA with proteins on it.' },
      p: { nl: 'Pre-40S-deeltje met 18S-voorloper-rRNA en assemblagefactoren.', en: 'Pre-40S particle with 18S precursor rRNA and assembly factors.' } },
    { c: '#1fa38a', t: 'pre-60S', m: ['+ ~80 ribosomale', '+ ~80 ribosomal', 'eiwitten (import)', 'proteins (imported)'], d: { nl: 'Het grote ribosoomdeel in aanbouw. De ongeveer 80 eiwitten van het ribosoom worden van buiten de kern binnengehaald.', en: 'The large ribosome part under construction. The roughly 80 proteins of the ribosome are brought in from outside the nucleus.' },
      p: { nl: 'Pre-60S-deeltje (28S, 5.8S, 5S rRNA); de ~80 ribosomale eiwitten worden in het cytoplasma gemaakt en geïmporteerd.', en: 'Pre-60S particle (28S, 5.8S, 5S rRNA); the ~80 ribosomal proteins are made in the cytoplasm and imported.' } },
    { c: C.prot2, t: { nl: 'exporteiwit (CRM1)', en: 'export protein (CRM1)' }, d: { nl: 'Een eiwit dat de ribosoomdelen apart door de kernporie naar buiten helpt.', en: 'A protein that helps the ribosome parts out through the nuclear pore, each part separately.' },
      p: { nl: 'Exportine CRM1 (XPO1), RanGTP-afhankelijk, exporteert pre-40S en pre-60S via adaptors.', en: 'Exportin CRM1 (XPO1), RanGTP-dependent, exports pre-40S and pre-60S via adaptors.' } },
    { c: C.muted, t: { nl: 'kernenvelop', en: 'nuclear envelope' }, m: ['kernenvelop · kernporie', 'nuclear envelope · pore', 'cytoplasma ↓', 'cytoplasm ↓'], d: { nl: 'De dubbele wand van de kern met een poort. Daarachter (onderaan) ligt het cytoplasma.', en: 'The double wall of the nucleus with a gate. Beyond it (at the bottom) lies the cytoplasm.' },
      p: { nl: 'Kernenvelop met kernporiecomplex; scheidt nucleoplasma en cytoplasma.', en: 'Nuclear envelope with nuclear pore complex; separates nucleoplasm and cytoplasm.' } },
  ],
  steps: [
    ST(7500, cam(420, 425, 1040), 'De nucleolus', 'The nucleolus',
      'Het grootste lichaampje in de kern, zonder membraan. Hij vormt zich rond de genen voor het meeste ribosoom-RNA.',
      'The largest body in the nucleus, without a membrane. It forms around the genes for most ribosomal RNA.'),
    ST(8000, cam(420, 450, 780), 'Drie zones in elkaar', 'Three zones, one inside the other',
      'De nucleolus heeft drie zones in elkaar. Het RNA ontstaat binnenin en schuift naar buiten terwijl het rijpt.',
      'The nucleolus has three zones nested inside each other. The RNA is made inside and moves outwards as it matures.'),
    ST(8000, cam(1155, 190, 960), 'Honderden kopieën van één gen', 'Hundreds of copies of one gene',
      'De genen voor ribosoom-RNA liggen in honderden kopieën achter elkaar. De tussenstukken worden geen ribosoom-RNA.',
      'The genes for ribosomal RNA lie one after another in hundreds of copies. The spacers do not become ribosomal RNA.'),
    ST(9000, cam(1030, 290, 760), 'Kerstbomen van RNA', 'Christmas trees of RNA',
      'Tientallen enzymen lezen tegelijk één gen af. Verderop is hun RNA langer: zo lijkt het op een kerstboom.',
      'Dozens of enzymes read one gene at the same time. Further along, their RNA is longer: it looks like a Christmas tree.'),
    ST(8500, cam(1130, 610, 860), 'Eén lang RNA', 'One long RNA',
      'Het eerste RNA: drie ribosoomstukken met tussenstukken. Kleine gids-RNA’s wijzen aan waar het wordt aangepast.',
      'The first RNA holds three ribosome pieces with spacers. Small guide RNAs point out where it gets modified.'),
    ST(9000, cam(1160, 660, 980), 'Knippen en bouwen', 'Cutting and building',
      'De tussenstukken worden weggeknipt. De RNA’s gaan met ongeveer 80 eiwitten samen tot twee ribosoomdelen.',
      'The spacers are cut out. The RNAs join about 80 proteins to form two ribosome parts.'),
    ST(8500, cam(420, 740, 700), 'De delen gaan de kern uit', 'The parts leave the nucleus',
      'De twee ribosoomdelen verlaten de kern apart, via de kernporiën. Pas buiten de kern komen ze samen op een mRNA.',
      'The two ribosome parts leave the nucleus separately, through the nuclear pores. Only outside do they meet on an mRNA.'),
    ST(7000, FULL, 'Een ribosomenfabriek', 'A ribosome factory',
      'Een groeiende cel maakt duizenden ribosomen per minuut. Ongeveer 80 % van al het RNA is ribosoom-RNA.',
      'A growing cell makes thousands of ribosomes per minute. About 80% of all RNA is ribosomal RNA.'),
  ],
  svg() {
    const r = rng(5);
    // --- nucleolus ---
    let nuc = '';
    const outline = [];
    for (let a = 0; a < 360; a += 20) { const k = 1 + (r() - .5) * .12; outline.push([NC[0] + NRX * k * Math.cos(a * Math.PI / 180), NC[1] + NRY * k * Math.sin(a * Math.PI / 180)]); }
    outline.push(outline[0], outline[1]);
    nuc += `<path d="${smooth(outline)}Z" fill="#2a3d63" stroke="#4d6aa0" stroke-width="3"/>`;
    let gc = '';
    for (let i = 0; i < 170; i++) {
      const a = r() * 6.283, d = Math.sqrt(r()) * .92;
      const x = NC[0] + NRX * d * Math.cos(a), y = NC[1] + NRY * d * Math.sin(a);
      if (FCS.some(([fx, fy]) => Math.hypot(x - fx, y - fy) < 62)) continue;
      gc += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(4 + r() * 3)}" fill="${C.rrna}" opacity="${f1(.35 + r() * .35)}"/>`;
    }
    let fc = '';
    FCS.forEach(([x, y]) => {
      fc += `<circle cx="${x}" cy="${y}" r="56" fill="#5a6f9e"/>`;
      for (let i = 0; i < 26; i++) { const a = r() * 6.283, d = 44 + r() * 10; fc += `<circle cx="${f1(x + d * Math.cos(a))}" cy="${f1(y + d * Math.sin(a))}" r="2.2" fill="#c9d6f3" opacity=".7"/>`; }
      fc += `<circle cx="${x}" cy="${y}" r="38" fill="#9fb3d9"/>`;
      fc += `<path d="M${x - 30},${y + 8} C${x - 10},${y - 22} ${x + 10},${y + 24} ${x + 30},${y - 6}" stroke="${C.rrna}" stroke-width="4" fill="none"/>`;
    });
    // acrocentrische chromosomen die met hun korte arm (NOR) in de nucleolus steken
    const acro = [[['13'], 60, 250, 20], [['14'], 170, 150, 60], [['15'], 760, 330, 160], [['21'], 700, 700, 215], [['22'], 90, 650, -25]];
    let chr = '';
    acro.forEach(([[n], x, y, rot]) => {
      chr += `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="-13" y="-11" width="120" height="22" rx="11" fill="${C.dna}"/><rect x="-13" y="-9" width="18" height="18" rx="9" fill="#27457e"/>` +
        `<line x1="-14" y1="0" x2="-70" y2="0" stroke="${C.rrna}" stroke-width="4" stroke-dasharray="7 4"/>` + `</g>` + K(txt(x + Math.cos(rot * Math.PI / 180) * 70, y + Math.sin(rot * Math.PI / 180) * 70 + 34, n, C.dna2, 18, 'middle', 700));
    });

    // --- Miller-paneel ---
    let mil = panel(720, 90, 870, 330, T2('rDNA en Pol I', 'rDNA and Pol I'), '#2a3a60', 22);
    mil += `<line x1="740" y1="${TREE.y}" x2="1570" y2="${TREE.y}" stroke="${C.dna}" stroke-width="5"/>`;
    // tweede (en derde, gedeeltelijk) eenheid
    [[TREE.x0, TREE.x1], [1300, 1570]].forEach(([a, b], k) => {
      mil += `<rect x="${a}" y="${TREE.y - 7}" width="${b - a}" height="14" rx="5" fill="${C.rrna}" opacity=".85"/>`;
    });
    mil += `<path d="M${TREE.x0},${TREE.y + 30} v10 H${TREE.x1} v-10" stroke="${C.rrna}" stroke-width="2" fill="none"/>` + txt((TREE.x0 + TREE.x1) / 2, TREE.y + 62, T2('getranscribeerde eenheid ~13 kb', 'transcribed unit ~13 kb'), C.rrna, 16);
    mil += `<path d="M${TREE.x1 + 4},${TREE.y + 30} v10 H1296 v-10" stroke="${C.muted}" stroke-width="2" fill="none"/>` + txt((TREE.x1 + 1296) / 2, TREE.y + 62, T2('spacer (IGS) ~30 kb', 'spacer (IGS) ~30 kb'), C.muted, 16);
    mil += `<path d="M${TREE.x0},${TREE.y + 86} v10 H1296 v-10" stroke="#fff" stroke-width="2" fill="none"/>` + txt((TREE.x0 + 1296) / 2, TREE.y + 118, T2('één herhaling ≈ 43–45 kb · honderden kopieën', 'one repeat ≈ 43–45 kb · hundreds of copies'), '#fff', 16);
    mil += `<path d="M${TREE.x0 - 4},${TREE.y - 20} v-24 h40" stroke="#fff" stroke-width="3" fill="none" marker-end="url(#arrow)"/>` + txt(TREE.x0 - 8, TREE.y - 62, T2('promoter', 'promoter'), '#fff', 15, 'start');

    // --- 47S-paneel ---
    let pre = panel(720, 450, 870, 420, T2('47S pre-rRNA → subeenheden', '47S pre-rRNA → subunits'), '#2a3a60', 22);
    let x = PRE.x0;
    const segs = [];
    SEG.forEach(([n, w, c]) => { segs.push([x, x + w, n, c]); x += w; });
    pre += `<g id="nl-47s">`;
    segs.forEach(([a, b, n, c]) => { pre += `<rect x="${a}" y="${PRE.y - 18}" width="${b - a}" height="36" fill="${c}" stroke="#0a1224" stroke-width="2"/>` + (n === '18S' || n === '28S' ? K : h => h)(txt((a + b) / 2, PRE.y + (n.length > 4 || b - a < 50 ? 46 : 6), n, n.includes('S') && !n.includes('ETS') && !n.includes('ITS') && b - a >= 50 ? '#0a1224' : '#fff', n.length > 4 || b - a < 50 ? 14 : 17, 'middle', 700)); });
    pre += txt(PRE.x0 - 14, PRE.y + 6, "5′", C.text, 16, 'end') + txt(x + 14, PRE.y + 6, "3′", C.text, 16, 'start') + txt(PRE.x0, PRE.y - 56, '47S pre-rRNA (~13 kb)', C.rrna, 17, 'start', 700);
    pre += txt(PRE.x0 + 300, PRE.y - 56, T2('grijs = opvulstukken (ETS, ITS): worden weggeknipt', 'grey = spacers (ETS, ITS): cut out'), '#9aa8c4', 16, 'start', 600);
    pre += `</g><g id="nl-mods"></g>`;
    pre += `<g id="nl-prod"></g>`;
    return svgOpen() + `
    <g id="nl-left">
      <g id="nl-chr" data-node="chromosoom" data-color="${C.dna}" data-label="${T2('Acrocentrische chromosomen (NOR)', 'Acrocentric chromosomes (NOR)')}">${chr}<circle data-anchor="chromosoom" cx="420" cy="300" r="1" fill="none"/></g>
      ${nuc}${gc}${fc}
      <g id="nl-lab"></g>
      <g id="nl-zoom"><rect x="${FCS[1][0] - 60}" y="${FCS[1][1] - 60}" width="120" height="120" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="6 4"/>
      <path d="M${FCS[1][0] + 60},${FCS[1][1] - 60} L720,90 M${FCS[1][0] + 60},${FCS[1][1] + 60} L720,420" stroke="#fff" stroke-width="1.5" stroke-dasharray="6 5" opacity=".4"/></g>
    </g>
    <g id="nl-envelope">
      <g data-node="kernimport" data-color="${C.prot}" data-nolabel>${kernEnvelop(ptsBoog(40, 838, 370, 777, 700, 822, 40), { closed: false, poriën: [.576], poreW: 58, w: 11, gap: 11, binnen: -1, s: 1.1 })}</g>
      <g id="nl-envlab">${txt(560, 770, T2('kernenvelop · kernporie', 'nuclear envelope · pore'), C.muted, 15, 'start')}</g>
      ${txt(140, 862, T2('cytoplasma ↓', 'cytoplasm ↓'), C.muted, 15)}
    </g>
    <g data-node="ribogenese" data-color="${C.rrna}" data-label="${T2('Ribosoombiogenese', 'Ribosome biogenesis')}"><g id="nl-exp"></g><circle data-anchor="ribogenese" cx="560" cy="640" r="1" fill="none"/></g>
    <g data-node="polymerasen" data-color="${C.prot}" data-label="${T2('RNA-polymerase I', 'RNA polymerase I')}" data-nolabel id="nl-mil">${mil}<g id="nl-tree"></g></g>
    <g data-node="ribosoom" data-color="${C.rrna}" data-label="${T2('Ribosoom', 'Ribosome')}" id="nl-pre">${pre}<circle data-anchor="ribosoom" cx="1150" cy="708" r="1" fill="none"/></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    let lx = 0;
    return {
      update(t, s) {
        const { step, p } = s;
        // labels van de compartimenten
        const lop = step === 1 ? ease(sub(p, .1, .4)) : 0;   // in het overzicht staan de zones in de legende
        const [fx, fy] = FCS[0], [gx, gy] = FCS[2];
        /* zone-label: functie in gewone taal, de afkorting klein eronder */
        const zone = (x, y, col, main, abbr) => `<rect x="${x - 112}" y="${y - 27}" width="224" height="54" rx="14" fill="${col}" stroke="#fff" stroke-opacity=".5" stroke-width="1.5"/>`
          + K(txt(x, y - 2, main, '#fff', 19, 'middle', 700)) + K(txt(x, y + 18, abbr, '#dfe7fb', 13, 'middle', 600));
        $('nl-lab').innerHTML = lop > .01 ? `<g opacity="${f1(lop)}">` +
          `<line x1="${fx}" y1="${fy}" x2="200" y2="400" stroke="#fff" stroke-width="2"/><circle cx="${fx}" cy="${fy}" r="4" fill="#fff"/>` + zone(170, 400, '#6f82ad', T2('binnen: RNA maken', 'inside: making RNA'), T2('fibrillair centrum (FC)', 'fibrillar centre (FC)')) +
          `<line x1="${gx - 47}" y1="${gy - 8}" x2="200" y2="520" stroke="#fff" stroke-width="2"/><circle cx="${gx - 47}" cy="${gy - 8}" r="4" fill="#fff"/>` + zone(170, 520, '#4a5d8a', T2('midden: bijwerken', 'middle: modifying'), T2('dicht fibrillair deel (DFC)', 'dense fibrillar part (DFC)')) +
          `<line x1="590" y1="330" x2="640" y2="290" stroke="#fff" stroke-width="2"/><circle cx="590" cy="330" r="4" fill="#fff"/>` + zone(670, 262, '#2f4677', T2('buiten: in elkaar zetten', 'outside: assembling'), T2('granulair deel (GC)', 'granular part (GC)')) + '</g>' : '';
        // niet-centrale delen ver genoeg dimmen (< 0,3) zodat wat half buiten de camera valt niet als afgesneden figuur oogt
        $('nl-left').setAttribute('opacity', step === 4 || step === 5 ? 0 : step >= 2 && step <= 3 ? .2 : 1);   // bij het 47S-paneel geen resten van de kern links
        $('nl-chr').setAttribute('opacity', step === 1 ? .2 : 1);
        $('nl-envelope').setAttribute('opacity', step === 4 || step === 5 ? 0 : step >= 2 && step <= 3 ? .2 : 1);
        $('nl-envlab').setAttribute('opacity', step === 0 ? 0 : 1);   // in het overzicht valt dit label achter de ondertitel
        // panelen pas tonen als ze aan de beurt zijn (geen vaag spookpaneel op de achtergrond)
        $('nl-mil').setAttribute('opacity', step === 2 || step === 3 || step === 7 ? 1 : 0);
        $('nl-pre').setAttribute('opacity', step === 4 || step === 5 || step === 7 ? 1 : 0);
        $('nl-zoom').setAttribute('opacity', step >= 2 ? 1 : 0);

        // kerstboom: Pol I met groeiende transcripten (lengte ∝ afstand tot de promoter)
        let tr = '';
        const nPol = 22, grow = step === 3 ? ease(sub(p, 0, .6)) : step > 3 ? 1 : step === 2 ? 0 : 1;
        for (let i = 0; i < nPol; i++) {
          const u = (i + .5) / nPol, x = lerp(TREE.x0 + 8, TREE.x1 - 8, u * grow);
          if (u > grow + .001) continue;
          const len = 10 + 120 * u * grow;
          tr += `<path d="M${f1(x)},${TREE.y - 6} q${f1(-len * .12)},${f1(-len * .5)} 0,${f1(-len)}" stroke="${C.rrna}" stroke-width="2.4" fill="none"/>` +
            `<circle cx="${f1(x)}" cy="${f1(TREE.y - len)}" r="${f1(2 + 3 * u)}" fill="${C.rrna}"/>` +
            `<circle cx="${f1(x)}" cy="${TREE.y}" r="5.5" fill="${C.prot}" stroke="#0a1224" stroke-width="1.5"/>`;
        }
        if (step === 3) tr += `<g opacity="${f1(sub(p, .5, .8))}"><line x1="${TREE.x1 + 34}" y1="${TREE.y - 30}" x2="${TREE.x1 - 6}" y2="${TREE.y - 6}" stroke="${C.prot}" stroke-width="2"/>${txt(TREE.x1 + 38, TREE.y - 30, 'Pol I', C.prot, 20, 'start', 700)}</g>`;
        $('nl-tree').innerHTML = tr;

        // snoRNP-modificaties op het 47S
        let mods = '';
        /* snoRNP = gids-RNA (haarspeld die met het rRNA paart) + eiwitten, onder de balk zodat de paneltitel vrij blijft */
        const snoRNP = (x, y, col, lab, seed) => `<path d="M${x - 26},${y - 8} C${x - 30},${y - 50} ${x - 4},${y - 70} ${x + 6},${y - 46} C${x + 14},${y - 30} ${x + 2},${y - 18} ${x + 22},${y - 8}" stroke="${col}" stroke-width="6" fill="none" stroke-linecap="round"/>` +
          eiwit(x, y + 6, 34, 18, C.prot, { seed, bumps: .1 }) + eiwit(x + 30, y - 10, 13, 11, C.prot2, { seed: seed + 9 }) +
          txt(x + 54, y + 4, lab[0], C.text, 17, 'start', 700) + txt(x + 54, y + 24, lab[1], '#b9c4dc', 14, 'start', 600);
        const mk = step === 4 ? ease(sub(p, .3, .8)) : step > 4 && step < 7 ? 1 : step === 7 ? 1 : 0;
        if (mk > .01) {
          const rr = rng(12);
          for (let i = 0; i < 26; i++) {
            const seg = rr() < .4 ? SEG[1] : rr() < .5 ? SEG[5] : SEG[3];
            let x0 = PRE.x0; for (const sg of SEG) { if (sg === seg) break; x0 += sg[1]; }
            const x = x0 + 6 + rr() * (seg[1] - 12), me = rr() < .55;
            mods += `<g opacity="${f1(mk * (i / 26 < mk ? 1 : 0))}"><line x1="${f1(x)}" y1="${PRE.y - 18}" x2="${f1(x)}" y2="${PRE.y - 30}" stroke="${me ? C.trna : '#ff8a8a'}" stroke-width="2"/><circle cx="${f1(x)}" cy="${PRE.y - 33}" r="3.5" fill="${me ? C.trna : '#ff8a8a'}"/></g>`;
          }
          mods += `<g opacity="${f1(step === 4 ? mk : step === 5 ? 1 - ease(sub(p, 0, .3)) : 0)}">${snoRNP(860, 760, C.trna, [T2('gids-RNA', 'guide RNA'), T2('zet een methylgroep (box C/D)', 'adds a methyl group (box C/D)')], 41)}${snoRNP(1190, 760, '#ff8a8a', [T2('gids-RNA', 'guide RNA'), T2('verbouwt een U tot Ψ (box H/ACA)', 'turns a U into Ψ (box H/ACA)')], 42)}</g>`;
        }
        $('nl-mods').innerHTML = mods;

        // producten
        let pr = '';
        const cut = step === 5 ? ease(sub(p, .05, .45)) : step > 5 ? 1 : 0;
        if (cut > .01) {
          const y = 740;
          pr += `<g opacity="${f1(cut)}">` +
            `<rect x="800" y="${y - 16}" width="170" height="32" fill="${C.rrna}"/>` + K(txt(885, y + 6, '18S', '#0a1224', 17, 'middle', 700)) +
            `<rect x="1060" y="${y - 16}" width="40" height="32" fill="#7fe0c8"/>` + txt(1080, y + 6, '5.8S', '#0a1224', 12, 'middle', 700) +
            `<rect x="1110" y="${y - 16}" width="290" height="32" fill="#1fa38a"/>` + K(txt(1255, y + 6, '28S', '#0a1224', 17, 'middle', 700)) +
            `<rect x="1410" y="${y - 16}" width="36" height="32" fill="#bfeee2"/>` + txt(1428, y + 6, '5S', '#0a1224', 13, 'middle', 700) +
            txt(1428, y + 40, T2('(Pol III, chr 1)', '(Pol III, chr 1)'), C.muted, 13) + '</g>';
          const as = step === 5 ? ease(sub(p, .5, .9)) : 1;
          pr += `<g opacity="${f1(as)}">` +
            eiwit(885, 820, 78, 30, C.rrna, { seed: 40, bumps: .07 }) + eiwit(820, 842, 13, 10, C.prot, { seed: 3 }) + eiwit(952, 838, 12, 10, C.prot, { seed: 4 }) + K(txt(885, 827, 'pre-40S', '#fff', 21, 'middle', 700)) +
            eiwit(1250, 820, 118, 34, '#1fa38a', { seed: 60, bumps: .07 }) + eiwit(1150, 796, 13, 10, C.prot, { seed: 5 }) + eiwit(1352, 800, 13, 10, C.prot, { seed: 6 }) + eiwit(1260, 848, 12, 10, C.prot, { seed: 7 }) + K(txt(1250, 827, 'pre-60S', '#fff', 21, 'middle', 700)) +
            txt(1480, 812, T2('+ ~80 ribosomale', '+ ~80 ribosomal'), C.muted, 15) + txt(1480, 832, T2('eiwitten (import)', 'proteins (imported)'), C.muted, 15) + '</g>';
        }
        $('nl-prod').innerHTML = pr;

        // export: subeenheden uit het GC door de porie
        let ex = '';
        const ek = step === 6 ? sub(p, .05, .95) : step === 7 ? 1 : 0;
        if (step >= 6) {
          [[0, 'pre-40S', 22, C.rrna, 365], [.35, 'pre-60S', 30, '#1fa38a', 475]].forEach(([d, n, rr0, c, xe]) => {
            const k = clamp((ek - d) / .6);
            const pts = [[470, 640], [430, 730], [418, 803], [xe, 872]];   // na de porie uit elkaar
            const seg = Math.min(2.999, k * 3), i = Math.floor(seg), f = seg - i;
            const x = lerp(pts[i][0], pts[i + 1][0], f), y = lerp(pts[i][1], pts[i + 1][1], f);
            const lo = step === 7 ? 1 : clamp(1 - sub(k, .22, .3) + sub(k, .85, .95));   // naam niet tonen tijdens de doortocht door de porie (zou op het membraan staan)
            const kl = n === 'pre-40S', rx = kl ? 22 : 27;   // kleine en grote subeenheid apart, elk smal genoeg voor de porie
            ex += `<g opacity="${f1(k > 0 && k < 1 ? 1 : step === 7 ? 1 : k >= 1 ? .8 : 0)}">${eiwit(x, y, rx, kl ? 13 : 19, c, { seed: kl ? 40 : 60, bumps: .08 })}<g opacity="${f1(lo)}">${kl ? txt(x - rx - 8, y + 5, n, '#fff', 15, 'end', 700) : txt(x + rx + 8, y + 5, n, '#fff', 15, 'start', 700)}</g></g>`;
          });
          ex += `<g opacity="${f1(step === 6 ? sub(p, .1, .3) : 1 - ease(sub(p, 0, .3)))}">${pill(290, 760, 200, 32, T2('exporteiwit (CRM1)', 'export protein (CRM1)'), C.prot2, 1, 16)}</g>`;
        }
        $('nl-exp').innerHTML = ex;
        // overzicht (laatste stap): alleen de hoofdlabels blijven staan
        const fo = step === 7 ? f1(1 - ease(sub(p, 0, .3))) : '1';
        svg.querySelectorAll('text:not(.keep):not(.ptitle)').forEach(el => el.setAttribute('opacity', fo));
      },
    };
  },
};
