import { C, L, T2, svgOpen, txt, cam, FULL, sub, ease, lerp, clamp, f1, rng, squiggle } from '../../kit.js';
import { ST, HC, nucleo, flag, smooth, panel } from './_a_kit.js';
import { kernEnvelop, ptsCirkel, eiwitPad, polII } from '../../bio.js';
const KERN = kernEnvelop(ptsCirkel(290, 450, 218, 140), { poriën: Array.from({ length: 14 }, (_, i) => (i + .3) / 14), w: 6, gap: 8, poreW: 12, s: .28 });   // dubbel membraan met poriën

/*
 * Chromatine: van chromosoomterritorium → lussen/TADs → eu- vs heterochromatine → 10 nm-vezel → (30 nm?) → nucleosoom.
 * Panelen: A kern (links), B lussen + Hi-C (midden boven), C eu/hetero (midden onder), D van vezel tot nucleosoom (rechts).
 */
const TERR = [ // chromosoomterritoria in de kern (x, y, rx, ry, kleur)
  [215, 345, 70, 58, '#6fa8ff'], [335, 330, 62, 70, '#b39ddb'], [390, 455, 58, 55, '#7fc8a9'],
  [300, 560, 72, 52, '#e0bd6e'], [185, 505, 58, 66, '#e08f8f'], [245, 440, 30, 28, '#5fd3e6'],
];
const FB_Y = 300;                       // hoogte van de chromatinevezel in paneel B
const TADS = [[640, 820], [860, 1050]]; // CTCF-ankers (x) van twee domeinen

export default {
  id: 'chromatine',
  title: { nl: 'Chromatine', en: 'Chromatin' },
  scale: { nl: '≈ 10 µm → 10 nm', en: '≈ 10 µm → 10 nm' },
  time: { nl: 'lusextrusie tot ~2 kb/s (in vitro); hier vertraagd', en: 'loop extrusion up to ~2 kb/s (in vitro); slowed down here' },
  org: { nl: 'mens', en: 'human' },
  legend: [[C.dna, { nl: 'DNA / chromatinevezel', en: 'DNA / chromatin fibre' }], [C.histone, { nl: 'nucleosoom (histonkern)', en: 'nucleosome (histone core)' }],
    ['#ff8a3d', 'CTCF'], ['#ffc247', { nl: 'cohesine', en: 'cohesin' }], [C.acetyl, { nl: 'acetylgroep (Ac)', en: 'acetyl group (Ac)' }], [C.methyl, { nl: 'methylgroep (H3K9me3 / 5mC)', en: 'methyl group (H3K9me3 / 5mC)' }], ['#f06bc0', 'HP1'], [C.prot, 'RNA-pol II']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Meer over het DNA rond een nucleosoom in de <a href="../atlas/index.html?id=nucleosome&lang=nl">3D-bibliotheek: nucleosoom</a>.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">More about the DNA around a nucleosome in the <a href="../atlas/index.html?id=nucleosome&lang=en">3D library: nucleosome</a>.</p>' },
  simplified: {
    nl: 'Niets is op schaal: een territorium is enkele µm, een lus meestal korter dan 2 Mb, een nucleosoom ~11 nm. De kleuren van de territoria volgen "chromosome painting" (FISH). Lusextrusie is getekend met één cohesinering; het exacte mechanisme (één of twee ringen, hoe CTCF de ring stopt) wordt nog onderzocht. De Hi-C-kaart is een schets, geen echte data. De klassieke 30 nm-vezel is in vitro gezien; in kernen van menselijke cellen zag men met ChromEMT vooral een onregelmatige 5–24 nm-keten.',
    en: 'Nothing is to scale: a territory is a few µm, a loop usually shorter than 2 Mb, a nucleosome ~11 nm. Territory colours mimic chromosome painting (FISH). Loop extrusion is drawn with one cohesin ring; the exact mechanism (one or two rings, how CTCF stops the ring) is still being studied. The Hi-C map is a sketch, not real data. The classical 30 nm fibre was seen in vitro; in nuclei of human cells ChromEMT showed mainly an irregular 5–24 nm chain.' },
  /* "Wat zie je?" (zijpaneel): elk onderdeel van de figuur in één zin — d = eenvoudig, p = vaktaal (hoger) */
  parts: [
    { c: '#9cc0ff', t: { nl: 'kern', en: 'nucleus' }, d: { nl: 'De ronde kern met een dubbele wand vol poriën. Hier zit bijna al het DNA van de cel.', en: 'The round nucleus with a double wall full of pores. Almost all of the cell’s DNA is here.' },
      p: { nl: 'Celkern met kernenvelop (dubbel membraan) en kernporiecomplexen.', en: 'Cell nucleus with nuclear envelope (double membrane) and nuclear pore complexes.' } },
    { c: '#6fa8ff', t: { nl: 'territoria', en: 'territories' }, m: ['① Territoria', '① Territories'], d: { nl: 'De gekleurde vlekken: elk chromosoom heeft tussen celdelingen een eigen gebied in de kern.', en: 'The coloured patches: between cell divisions each chromosome has its own region in the nucleus.' },
      p: { nl: 'Chromosoomterritoria in de interfasekern, zichtbaar gemaakt met chromosome painting (FISH).', en: 'Chromosome territories in the interphase nucleus, visualised by chromosome painting (FISH).' } },
    { c: '#27457e', t: { nl: 'compact DNA aan de rand', en: 'compact DNA at the edge' }, d: { nl: 'De donkere bolletjes langs de rand en rond de nucleolus: dicht opgerold DNA dat meestal stil is.', en: 'The dark dots along the edge and around the nucleolus: tightly packed DNA that is mostly silent.' },
      p: { nl: 'Heterochromatine, verrijkt aan de kernlamina en rond de nucleolus.', en: 'Heterochromatin, enriched at the nuclear lamina and around the nucleolus.' } },
    { c: C.rrna, t: 'nucleolus', d: { nl: 'Een plek in de kern zonder eigen wand, waar de cel de onderdelen van ribosomen maakt.', en: 'A spot in the nucleus without its own membrane, where the cell makes the parts of ribosomes.' },
      p: { nl: 'Membraanloos kerncompartiment rond de rDNA-clusters; plaats van rRNA-transcriptie en ribosoombiogenese.', en: 'Membraneless nuclear compartment around the rDNA clusters; site of rRNA transcription and ribosome biogenesis.' } },
    { c: '#ffc247', t: { nl: 'cohesine', en: 'cohesin' }, m: ['cohesine (ring) → lus tot aan CTCF ▶ ◀', 'cohesin (ring) → loop up to CTCF ▶ ◀', '② Lussen & buurten (TADs)', '② Loops & neighbourhoods (TADs)'], d: { nl: 'De gele ring trekt het DNA door zich heen tot een steeds grotere lus.', en: 'The yellow ring pulls the DNA through itself into an ever larger loop.' },
      p: { nl: 'SMC-complex dat chromatinelussen vormt door ATP-afhankelijke lusextrusie.', en: 'SMC complex that forms chromatin loops by ATP-dependent loop extrusion.' } },
    { c: '#ff8a3d', t: 'CTCF', d: { nl: 'De oranje driehoekjes: stop-eiwitten op het DNA. Wijzen ze naar elkaar, dan stopt de ring daar en is de lus af.', en: 'The orange triangles: stop proteins on the DNA. When they point towards each other, the ring stops there and the loop is complete.' },
      p: { nl: 'Zinkvingereiwit; convergent georiënteerde CTCF-motieven blokkeren cohesine en vormen de lusankers.', en: 'Zinc-finger protein; convergently oriented CTCF motifs block cohesin and form the loop anchors.' } },
    { c: '#ff4d4d', t: { nl: 'contactkaart', en: 'contact map' }, m: ['contactkaart (Hi-C, schets)', 'contact map (Hi-C, sketch)', 'A', 'B', 'elk vakje = twee stukken DNA (A en B) · hoe roder, hoe vaker ze elkaar raken', 'each square = two pieces of DNA (A and B) · the redder, the more often they touch'], d: { nl: 'Een kaart van welke stukken DNA elkaar raken. Elk vakje is een paar stukken; hoe roder, hoe vaker ze samen liggen.', en: 'A map of which pieces of DNA touch. Each square is a pair of pieces; the redder, the more often they lie together.' },
      p: { nl: 'Schematische Hi-C-contactmatrix (driehoekig weergegeven): contactfrequentie tussen genoomposities.', en: 'Schematic Hi-C contact matrix (shown as a triangle): contact frequency between genomic positions.' } },
    { c: '#fff', t: { nl: 'buurt', en: 'neighbourhood' }, m: ['(TAD)'], d: { nl: 'Een stuk DNA waarbinnen de delen elkaar vaak raken, maar zelden delen daarbuiten. Op de kaart een heldere driehoek.', en: 'A stretch of DNA whose parts often touch each other, but rarely parts outside it. A bright triangle on the map.' },
      p: { nl: 'Topologisch geassocieerd domein (TAD): zelf-interagerend domein, vaak begrensd door CTCF/cohesine-ankers.', en: 'Topologically associating domain (TAD): self-interacting domain, often bounded by CTCF/cohesin anchors.' } },
    { c: C.chain, t: { nl: 'euchromatine', en: 'euchromatin' }, m: ['euchromatine: open, actief', 'euchromatin: open, active', '③ Eu- en heterochromatine', '③ Eu- and heterochromatin'], d: { nl: 'Losser verpakt DNA (links): het kan gemakkelijk worden afgelezen.', en: 'Loosely packed DNA (left): it can easily be read.' },
      p: { nl: 'Open, transcriptioneel actief chromatine, verrijkt in histonacetylering.', en: 'Open, transcriptionally active chromatin, enriched in histone acetylation.' } },
    { c: C.acetyl, t: 'Ac', d: { nl: 'Een klein chemisch merkteken (acetylgroep) op de eiwitten van het DNA. Het houdt het DNA open.', en: 'A small chemical mark (acetyl group) on the DNA’s proteins. It keeps the DNA open.' },
      p: { nl: 'Lysine-acetylering van histonstaarten (bv. H3K27ac); neutraliseert de positieve lading en rekruteert bromodomeineiwitten.', en: 'Lysine acetylation of histone tails (e.g. H3K27ac); neutralises the positive charge and recruits bromodomain proteins.' } },
    { c: C.prot, t: 'Pol II', d: { nl: 'Het enzym dat het DNA afleest en er een RNA-kopie (oranje draad) van maakt.', en: 'The enzyme that reads the DNA and makes an RNA copy of it (orange strand).' },
      p: { nl: 'RNA-polymerase II, transcribeert eiwitcoderende genen in euchromatine.', en: 'RNA polymerase II, transcribes protein-coding genes in euchromatin.' } },
    { c: '#f3a6d3', t: { nl: 'heterochromatine', en: 'heterochromatin' }, m: ['heterochromatine: compact, stil', 'heterochromatin: compact, silent'], d: { nl: 'Dicht opeengepakt DNA (rechts): het wordt meestal niet afgelezen.', en: 'Tightly packed DNA (right): it is mostly not read.' },
      p: { nl: 'Compact, transcriptioneel stil chromatine met H3K9me3, HP1 en DNA-methylatie.', en: 'Compact, transcriptionally silent chromatin with H3K9me3, HP1 and DNA methylation.' } },
    { c: C.methyl, t: 'K9me3', d: { nl: 'Een merkteken (drie methylgroepen) op een histon-eiwit. Het zegt: hier dicht houden.', en: 'A mark (three methyl groups) on a histone protein. It says: keep this closed.' },
      p: { nl: 'H3K9-trimethylering, kenmerk van constitutief heterochromatine; bindingsplaats voor het chromodomein van HP1.', en: 'H3K9 trimethylation, hallmark of constitutive heterochromatin; binding site for the HP1 chromodomain.' } },
    { c: '#f06bc0', t: 'HP1', d: { nl: 'De roze eiwitjes die op het merkteken K9me3 gaan zitten en het DNA nog dichter samenpakken.', en: 'The pink proteins that sit on the K9me3 mark and pack the DNA even tighter.' },
      p: { nl: 'Heterochromatine-eiwit 1, een dimeer; bindt H3K9me3 via zijn chromodomein en draagt bij aan chromatinecompactie.', en: 'Heterochromatin protein 1, a dimer; binds H3K9me3 via its chromodomain and contributes to chromatin compaction.' } },
    { c: C.methyl, t: '5mC', d: { nl: 'Een merkteken (methylgroep) op het DNA zelf, op de letter C. Het helpt genen stil te houden.', en: 'A mark (methyl group) on the DNA itself, on the letter C. It helps keep genes silent.' },
      p: { nl: '5-methylcytosine, meestal in CpG-context; geassocieerd met transcriptionele repressie.', en: '5-methylcytosine, mostly in CpG context; associated with transcriptional repression.' } },
    { c: C.histone, t: { nl: 'kralensnoer', en: 'beads on a string' }, m: ['④ 10 nm-vezel', '④ 10 nm fibre', '≈ 11 nm', 'herhaling ≈ 200 bp', 'repeat ≈ 200 bp'], d: { nl: 'Uitgerekt chromatine: DNA met om de zoveel stukjes een kraal (nucleosoom), elke kraal ongeveer 11 nm breed.', en: 'Stretched-out chromatin: DNA with a bead (nucleosome) every so often, each bead about 11 nm wide.' },
      p: { nl: '10 nm-vezel: nucleosoomreeks met een herhaalafstand van ≈ 200 bp; de nucleosoomkern is ≈ 11 nm breed.', en: '10 nm fibre: nucleosome array with a repeat length of ≈ 200 bp; the nucleosome core is ≈ 11 nm wide.' } },
    { c: C.dna2, t: { nl: 'linker-DNA', en: 'linker DNA' }, d: { nl: 'Het stukje DNA tussen twee kralen.', en: 'The bit of DNA between two beads.' },
      p: { nl: 'Linker-DNA tussen opeenvolgende nucleosoomkernen; de lengte varieert per celtype.', en: 'Linker DNA between consecutive nucleosome cores; its length varies by cell type.' } },
    { c: HC.H1, t: 'H1', m: ['H1 (linkerhiston)', 'H1 (linker histone)'], d: { nl: 'Het grijze eiwitje waar het DNA een kraal in- en uitgaat. Het helpt de kralen dichter bij elkaar te houden.', en: 'The grey protein where the DNA enters and leaves a bead. It helps keep the beads closer together.' },
      p: { nl: 'Linkerhiston H1; bindt het nucleosoom bij de in- en uitgang van het DNA en bevordert compactie.', en: 'Linker histone H1; binds the nucleosome at the DNA entry/exit site and promotes compaction.' } },
    { c: C.trna, t: { nl: 'hogere vouwing', en: 'higher-order folding' }, m: ['⑤ Hogere vouwing', '⑤ Higher-order folding', 'in vitro: “30 nm-vezel”', 'in vitro: “30 nm fibre”', '(regelmatig, zigzag)', '(regular, zigzag)', 'in de cel: onregelmatige', 'in the cell: irregular', 'keten van 5–24 nm', 'chain of 5–24 nm', '?'], d: { nl: 'In de proefbuis vouwt het snoer tot een nette, dikkere vezel (links). In de cel ligt het rommeliger opeengepakt (rechts).', en: 'In the test tube the string folds into a neat, thicker fibre (left). In the cell it is packed more messily (right).' },
      p: { nl: 'De regelmatige 30 nm-vezel is een in-vitrostructuur; in interfasekernen vormt chromatine een onregelmatige keten van 5–24 nm (ChromEMT, Ou et al. 2017).', en: 'The regular 30 nm fibre is an in vitro structure; in interphase nuclei chromatin forms an irregular 5–24 nm chain (ChromEMT, Ou et al. 2017).' } },
    { c: HC.H3, t: { nl: 'nucleosoom', en: 'nucleosome' }, m: ['⑥ Nucleosoom', '⑥ Nucleosome', '~147 bp · ~1,7 windingen · histonoctameer', '~147 bp · ~1.7 turns · histone octamer'], d: { nl: 'Eén kraal: ongeveer 147 basenparen DNA, bijna twee keer gewonden rond acht eiwitten (histonen).', en: 'One bead: about 147 base pairs of DNA, wound almost twice around eight proteins (histones).' },
      p: { nl: 'Nucleosoomkerndeeltje: ~147 bp DNA in ~1,7 linkshandige superhelixwindingen rond een histonoctameer.', en: 'Nucleosome core particle: ~147 bp DNA in ~1.7 left-handed superhelical turns around a histone octamer.' } },
    { c: HC.H3, t: 'H3', m: ['H4', 'H2A', 'H2B'], d: { nl: 'De vier soorten histon-eiwitten in de kraal. Van elk zitten er twee in het nucleosoom.', en: 'The four kinds of histone protein in the bead. There are two of each in the nucleosome.' },
      p: { nl: 'Kernhistonen H2A, H2B, H3 en H4, elk tweemaal aanwezig: (H3–H4)₂-tetrameer plus twee H2A–H2B-dimeren.', en: 'Core histones H2A, H2B, H3 and H4, two copies each: an (H3–H4)₂ tetramer plus two H2A–H2B dimers.' } },
  ],
  steps: [
    ST(7000, FULL, 'Twee meter DNA in een kern', 'Two metres of DNA in a nucleus',
      'Een cel heeft ongeveer 2 m DNA, in een kern van 5–10 µm. Dat past omdat eiwitten het verpakken: chromatine.',
      'A cell holds about 2 m of DNA, in a nucleus of 5–10 µm. It fits because proteins pack it: chromatin.'),
    ST(7500, cam(290, 450, 820), 'Elk chromosoom heeft zijn plek', 'Each chromosome has its place',
      'Tussen celdelingen heeft elk chromosoom een eigen gebied. Het compacte deel ligt vaak aan de rand.',
      'Between cell divisions each chromosome has its own region. The compact part often lies at the edge.'),
    ST(9000, cam(840, 295, 680), 'Een eiwitring trekt lussen', 'A protein ring pulls loops',
      'Een eiwitring (cohesine) trekt het DNA tot een steeds grotere lus, tot hij aan elke kant een stop-eiwit raakt.',
      'A protein ring (cohesin) pulls the DNA into an ever larger loop, until it meets a stop protein on each side.'),
    ST(8000, cam(840, 308, 730), 'Het DNA vormt buurten', 'The DNA forms neighbourhoods',
      'Zo ontstaan buurten waar DNA-stukken elkaar vaak raken. Op de kaart is elke buurt een heldere driehoek.',
      'This creates neighbourhoods where pieces of DNA often touch. On the map each one is a bright triangle.'),
    ST(8500, cam(840, 672, 600), 'Open en dicht chromatine', 'Open and closed chromatin',
      'Open chromatine wordt afgelezen. Compact chromatine is meestal stil: chemische merktekens houden het dicht.',
      'Open chromatin is read. Compact chromatin is mostly silent: chemical marks keep it closed.'),
    ST(8000, cam(1355, 235, 480), 'Kralen aan een snoer', 'Beads on a string',
      'Uitgerekt lijkt chromatine op kralen aan een snoer. Elke kraal is DNA rond eiwitten: een nucleosoom.',
      'Stretched out, chromatin looks like beads on a string. Each bead is DNA around proteins: a nucleosome.'),
    ST(8500, cam(1355, 490, 480), 'Hoe vouwt het snoer verder?', 'How does the string fold further?',
      'In de proefbuis vouwt het snoer tot een nette, dikkere vezel. In echte kernen ligt het rommeliger opeengepakt.',
      'In the test tube the string folds into a neat, thicker fibre. In real nuclei it is packed together more messily.'),
    ST(7500, cam(1355, 745, 470), 'Inzoomen op één kraal', 'Zooming in on one bead',
      'Eén nucleosoom: zo’n 147 basenparen DNA rond acht eiwitten (histonen). Hierna: het nucleosoom in 3D.',
      'One nucleosome: about 147 base pairs of DNA around eight proteins (histones). Next: the nucleosome in 3D.'),
  ],
  svg() {
    const r = rng(7);
    // ---------- paneel A: kern met territoria ----------
    let terr = '';
    TERR.forEach(([x, y, rx, ry, col], k) => {
      terr += `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${col}" fill-opacity=".13" stroke="${col}" stroke-opacity=".5" stroke-width="2"/>`;
      for (let i = 0; i < 9; i++) terr += `<path d="${squiggle(r, x + (r() - .5) * rx, y + (r() - .5) * ry, 7, 8, 9)}" stroke="${col}" stroke-width="2.2" fill="none" opacity=".75"/>`;
    });
    let het = '';
    for (let a = 0; a < 360; a += 4) if (r() > .3) {
      const rr = 205 - r() * 12, x = 290 + Math.cos(a * Math.PI / 180) * rr, y = 450 + Math.sin(a * Math.PI / 180) * rr;
      het += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(3 + r() * 4)}" fill="#27457e" opacity=".85"/>`;
    }
    for (let a = 0; a < 360; a += 25) het += `<circle cx="${f1(262 + Math.cos(a / 57.3) * 34)}" cy="${f1(425 + Math.sin(a / 57.3) * 28)}" r="4" fill="#27457e" opacity=".85"/>`;

    // ---------- paneel C: eu- en heterochromatine ----------
    let eu = '', hetc = '';
    const euPts = [[585, 700], [620, 640], [660, 690], [700, 625], [745, 680], [790, 620], [820, 660]];
    eu += `<path d="${smooth(euPts)}" stroke="${C.dna}" stroke-width="3" fill="none"/>`;
    euPts.slice(1, -1).forEach(([x, y], i) => {
      eu += nucleo(x, y, 15, { rot: -90 + i * 40, w: 3.2 }).svg;
      if (i % 2 === 0) eu += flag(x + 4, y - 14, 'Ac', C.acetyl, 1, 9);
    });
    // naakt DNA aan het einde van de vezel, waarop Pol II zit; het RNA komt uit Pol II
    eu += `<path d="M820,660 C832,690 812,712 792,748" stroke="${C.dna}" stroke-width="3" fill="none"/>`;
    eu += `<path d="M786,736 C768,742 752,756 724,748" stroke="${C.rna}" stroke-width="3" fill="none"/>`;
    const hPts = [];
    const r2 = rng(3);
    for (let i = 0; i < 16; i++) hPts.push([900 + (i % 4) * 36 + (r2() - .5) * 10 + (Math.floor(i / 4) % 2) * 16, 610 + Math.floor(i / 4) * 34 + (r2() - .5) * 8]);
    hetc += `<path d="${smooth(hPts)}" stroke="${C.dna}" stroke-width="3" fill="none"/>`;
    hPts.forEach(([x, y], i) => {
      hetc += nucleo(x, y, 14, { rot: i * 50, w: 3 }).svg;
    });
    let hp1 = '';
    [[930, 628], [985, 662], [940, 700], [1020, 700], [960, 735], [1030, 630]].forEach(([x, y]) => {
      hp1 += `<g><path d="${eiwitPad(x - 5, y, 7, 5, 41, .1)}" fill="#f06bc0"/><path d="${eiwitPad(x + 5, y, 7, 5, 42, .1)}" fill="#f06bc0"/></g>`;   // HP1-dimeer
    });
    let me = '';
    [[905, 612], [1013, 646], [925, 681], [1008, 716]].forEach(([x, y]) => { me += flag(x, y, 'K9me3', C.methyl, 1, 8); });
    // 5mC op het DNA zelf: op de linker tussen twee nucleosomen
    [[1, 2], [13, 14]].forEach(([a, b]) => { const x = (hPts[a][0] + hPts[b][0]) / 2, y = (hPts[a][1] + hPts[b][1]) / 2;
      me += `<circle cx="${f1(x)}" cy="${f1(y)}" r="4.5" fill="${C.methyl}" stroke="#0a1224" stroke-width="1.5"/><text x="${f1(x)}" y="${f1(y + 15)}" font-size="9" text-anchor="middle" fill="${C.methyl}" font-family="Inter" font-weight="700" stroke="#0a1224" stroke-width="2.5" paint-order="stroke">5mC</text>`; });   // label onder het bolletje, weg van de K9me3-vlaggen

    // ---------- paneel D: 10 nm-vezel ----------
    let bead = '';
    let prev = [1150, 250];
    const bx = [1205, 1285, 1365, 1445, 1525], by = [225, 245, 222, 248, 226];
    let links = '';
    bx.forEach((x, i) => {
      const nu = nucleo(x, by[i], 24, { rot: -60 + i * 35, w: 5.5 });
      links += `<path d="M${f1(prev[0])},${f1(prev[1])} Q${f1((prev[0] + nu.a[0]) / 2)},${f1((prev[1] + nu.a[1]) / 2 + (i % 2 ? -14 : 14))} ${f1(nu.a[0])},${f1(nu.a[1])}" stroke="${C.dna}" stroke-width="5.5" fill="none" stroke-linecap="round"/>`;
      bead += nu.svg + `<path d="${eiwitPad((nu.a[0] + nu.b[0]) / 2, (nu.a[1] + nu.b[1]) / 2, 6.5, 6, 43, .1)}" fill="${HC.H1}" stroke="#0a1224" stroke-width="1.5"/>`;
      prev = nu.b;
    });
    links += `<path d="M${f1(prev[0])},${f1(prev[1])} L1575,240" stroke="${C.dna}" stroke-width="5.5" fill="none" stroke-linecap="round"/>`;

    // 30 nm: in-vitro-model (zigzag, twee starts) en in-vivo-keten (onregelmatig)
    let z30 = '';
    const zz = [];
    for (let i = 0; i < 10; i++) zz.push([1180 + i * 17, 470 + (i % 2 ? -22 : 22)]);
    z30 += `<path d="${zz.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join('')}" stroke="${C.dna}" stroke-width="3" fill="none"/>`;
    zz.forEach(([x, y], i) => { z30 += nucleo(x, y, 13, { rot: i * 70, w: 3 }).svg; });
    z30 += `<rect x="1165" y="430" width="190" height="80" rx="40" fill="none" stroke="${C.muted}" stroke-dasharray="5 4"/>`;
    let vivo = '';
    const r3 = rng(21), vv = [];
    let vx = 1400, vy = 520;
    for (let i = 0; i < 14; i++) { vv.push([vx, vy]); vx += 12 + (r3() - .3) * 16; vy += (r3() - .5) * 52; vy = clamp(vy, 425, 545); }
    vivo += `<path d="${smooth(vv)}" stroke="${C.dna}" stroke-width="3" fill="none"/>`;
    vv.forEach(([x, y], i) => { vivo += nucleo(x, y, 12, { rot: i * 83, w: 2.8 }).svg; });

    // groot nucleosoom
    const big = nucleo(1355, 745, 66, { rot: -90, w: 12, octa: true, lab: 9 });

    return svgOpen() + `
    <!-- paneel A -->
    <g id="cr-pA">
      ${panel(40, 150, 500, 600, T2('① Territoria', '① Territories'), '#2a3a60', 21)}
      <g data-node="kern" data-color="#9cc0ff" data-nolabel><circle cx="290" cy="450" r="215" fill="url(#gNuc)"/>${KERN}</g>
      ${het}
      <g data-node="nucleolus" data-color="${C.rrna}" data-nolabel><path d="M232,420 C236,392 285,388 297,412 C310,438 282,462 255,458 C235,455 229,440 232,420Z" fill="#2a3d63" stroke="#4d6aa0" stroke-width="2"/>
      <text x="266" y="400" font-size="13" text-anchor="middle" fill="#cfdcf5" font-family="Inter" font-weight="700" stroke="#0a1224" stroke-width="3" paint-order="stroke">${T2('nucleolus', 'nucleolus')}</text></g>
      <g data-node="chromosoom" data-color="${C.dna}" data-label="${T2('Chromosoom', 'Chromosome')}">${terr}<circle data-anchor="chromosoom" cx="335" cy="300" r="1" fill="none"/></g>
      <rect x="360" y="410" width="80" height="80" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="6 4"/>
    </g>
    <path d="M440,410 L560,110 M440,490 L560,480" stroke="#fff" stroke-width="1.5" stroke-dasharray="6 5" opacity=".45"/>
    <!-- paneel B -->
    <g id="cr-pB">
      ${panel(560, 110, 560, 370, T2('② Lussen & buurten (TADs)', '② Loops & neighbourhoods (TADs)'), '#2a3a60', 21)}
      <g data-node="lussen" data-color="#ff8a3d" data-label="${T2('Lussen en buurten', 'Loops and neighbourhoods')}" data-nolabel>
        <g id="cr-fibre"></g>
      </g>
      <g id="cr-hic"></g>
    </g>
    <!-- paneel C -->
    <g id="cr-pC">
      ${panel(560, 520, 560, 290, T2('③ Eu- en heterochromatine', '③ Eu- and heterochromatin'), '#2a3a60', 21)}
      <g data-node="histonmod" data-color="${C.acetyl}" data-label="${T2('Histonmodificaties', 'Histone modifications')}">${eu}<circle id="cr-a-hm" data-anchor="histonmod" cx="640" cy="600" r="1" fill="none"/></g>
      <g data-node="rnapol" data-color="${C.prot}" data-label="${T2('RNA-polymerase II', 'RNA polymerase II')}" data-nolabel>
        <g transform="rotate(-59 804 728)">${polII(804, 728, 28, 13, { gul: 5, hoog: 1.5, vul: .35, achter: .4, seed: 22 })}</g><!-- app-vorm (bio.js), gedraaid langs de vezel; leest omhoog, RNA links eruit -->
        <text x="805" y="726" font-size="10" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="700">Pol II</text>
      </g>
      <g data-node="dnamethyl" data-color="${C.methyl}" data-label="${T2('DNA-methylatie', 'DNA methylation')}">${hetc}${hp1}${me}<circle id="cr-a-dm" data-anchor="dnamethyl" cx="1000" cy="590" r="1" fill="none"/></g>
      ${txt(700, 790, T2('euchromatine: open, actief', 'euchromatin: open, active'), C.chain, 14)}
      ${txt(975, 790, T2('heterochromatine: compact, stil', 'heterochromatin: compact, silent'), '#f3a6d3', 14)}
      <line x1="840" y1="560" x2="840" y2="770" stroke="#2a3a60" stroke-width="2" stroke-dasharray="4 4"/>
    </g>
    <!-- paneel D -->
    <g id="cr-pD1">
      ${panel(1140, 110, 450, 230, T2('④ 10 nm-vezel', '④ 10 nm fibre'), '#2a3a60', 21)}
      <g data-node="nucleosoom" data-color="${C.histone}" data-label="${T2('Nucleosoom', 'Nucleosome')}" data-nolabel>${links}${bead}</g>
      <line x1="1181" y1="290" x2="1229" y2="290" stroke="#fff" stroke-width="2"/><line x1="1181" y1="285" x2="1181" y2="295" stroke="#fff" stroke-width="2"/><line x1="1229" y1="285" x2="1229" y2="295" stroke="#fff" stroke-width="2"/>
      ${txt(1205, 310, '≈ 11 nm', '#fff', 12)}
      ${txt(1325, 176, T2('linker-DNA', 'linker DNA'), C.dna2, 12)}
      <path d="M1325,181 L1325,210" stroke="${C.dna2}" stroke-width="1.5" marker-end="url(#arrow)"/>
      ${txt(1445, 300, T2('H1 (linkerhiston)', 'H1 (linker histone)'), HC.H1, 12)}
      <path d="M1445,288 L1447,266" stroke="${HC.H1}" stroke-width="1.5" marker-end="url(#arrow)"/>
      ${txt(1480, 322, T2('herhaling ≈ 200 bp', 'repeat ≈ 200 bp'), C.muted, 12)}
    </g>
    <g id="cr-pD2">
      ${panel(1140, 370, 450, 230, T2('⑤ Hogere vouwing', '⑤ Higher-order folding'), '#2a3a60', 21)}
      <g data-node="nucleosoom" data-color="${C.histone}" data-nolabel>${z30}${vivo}</g>
      ${txt(1260, 540, T2('in vitro: “30 nm-vezel”', 'in vitro: “30 nm fibre”'), C.muted, 12)}
      ${txt(1260, 556, T2('(regelmatig, zigzag)', '(regular, zigzag)'), C.muted, 11)}
      ${txt(1490, 572, T2('in de cel: onregelmatige', 'in the cell: irregular'), C.text, 12)}
      ${txt(1490, 588, T2('keten van 5–24 nm', 'chain of 5–24 nm'), C.text, 12)}
      <text x="1375" y="485" font-size="34" text-anchor="middle" fill="${C.trna}" font-family="Inter" font-weight="800">?</text>
    </g>
    <g id="cr-pD3">
      ${panel(1140, 630, 450, 240, T2('⑥ Nucleosoom', '⑥ Nucleosome'), '#2a3a60', 21)}
      <g data-node="dnahelix" data-color="${C.dna}" data-label="${T2('DNA-dubbelhelix →', 'DNA double helix →')}">
        <path d="M1170,${f1(big.a[1] + 40)} Q1230,${f1(big.a[1] + 30)} ${f1(big.a[0])},${f1(big.a[1])}" stroke="${C.dna}" stroke-width="13" fill="none" stroke-linecap="round"/>
        <path d="M${f1(big.b[0])},${f1(big.b[1])} Q1470,${f1(big.b[1] + 50)} 1560,${f1(big.b[1] + 40)}" stroke="${C.dna}" stroke-width="13" fill="none" stroke-linecap="round"/>
        <circle data-anchor="dnahelix" cx="1520" cy="${f1(big.b[1] + 30)}" r="1" fill="none"/>
      </g>
      <g data-node="nucleosoom" data-color="${HC.H3}" data-label="${T2('Nucleosoom (3D) →', 'Nucleosome (3D) →')}">${big.svg}<circle data-anchor="nucleosoom" data-pos="below" cx="1480" cy="645" r="1" fill="none"/></g>

      ${txt(1572, 656, T2('~147 bp · ~1,7 windingen · histonoctameer', '~147 bp · ~1.7 turns · histone octamer'), C.muted, 12, 'end')}
    </g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const panels = ['cr-pA', 'cr-pB', 'cr-pC', 'cr-pD1', 'cr-pD2', 'cr-pD3'];
    const focus = [null, 0, 1, 1, 2, 3, 4, 5];
    // paneeltitels: 21 px in het overzicht, maar kleiner in de ingezoomde stappen (≈ 18 px op het scherm = fs × 1000 / cambreedte)
    const CAMW = [1600, 820, 680, 730, 600, 480, 480, 470];
    const tfs = k => k === 0 ? 28 : Math.min(21, 18 * CAMW[k] / 1000);   // overzicht: grotere koppen (leesbaar op volle breedte)
    const pAframe = $('cr-pA').querySelector('rect');
    const titles = [...svg.querySelectorAll('.ptitle')].map(el => ({ el, y0: +el.getAttribute('y') - 31 }));

    function fibre(u1, u2) {
      // chromatinevezel met twee domeinen; u = voortgang van de lusextrusie per domein
      let s = '';
      const pts = [[570, FB_Y]];
      const loops = [];
      [[TADS[0], u1], [TADS[1], u2]].forEach(([[a, b], u]) => {
        const mid = (a + b) / 2, half = (b - a) / 2;
        const cL = mid - half * (1 - u), cR = mid + half * (1 - u);     // CTCF-posities schuiven naar de ring
        pts.push([cL, FB_Y]);
        loops.push({ mid, cL, cR, u, h: 20 + u * 105, w: 16 + u * 32 });
        pts.push([cR, FB_Y]);
      });
      pts.push([1110, FB_Y]);
      // basislijn (flanken)
      s += `<path d="M570,${FB_Y} L${f1(loops[0].cL)},${FB_Y} M${f1(loops[0].cR)},${FB_Y} L${f1(loops[1].cL)},${FB_Y} M${f1(loops[1].cR)},${FB_Y} L1110,${FB_Y}" stroke="${C.dna}" stroke-width="7" stroke-linecap="round" fill="none"/>`;
      for (const lp of loops) {
        // stuk tussen CTCF en ring (nog niet geëxtrudeerd) + lus boven de ring
        const top = FB_Y - 14 - lp.h;
        const d = `M${f1(lp.cL)},${FB_Y} L${f1(lp.mid - 6)},${FB_Y - 6} C${f1(lp.mid - lp.w * 1.6)},${f1(FB_Y - 14 - lp.h * .45)} ${f1(lp.mid - lp.w)},${f1(top)} ${f1(lp.mid)},${f1(top)} C${f1(lp.mid + lp.w)},${f1(top)} ${f1(lp.mid + lp.w * 1.6)},${f1(FB_Y - 14 - lp.h * .45)} ${f1(lp.mid + 6)},${FB_Y - 6} L${f1(lp.cR)},${FB_Y}`;
        s += `<path d="${d}" stroke="${C.dna}" stroke-width="7" fill="none" stroke-linejoin="round"/>`;
        s += `<path d="${d}" stroke="#cfe0ff" stroke-width="2" fill="none" stroke-dasharray="3 9" opacity=".6"/>`;
        // cohesinering
        s += `<ellipse cx="${f1(lp.mid)}" cy="${FB_Y - 8}" rx="17" ry="12" fill="none" stroke="#ffc247" stroke-width="5"/>`;
        // CTCF: convergente pijlpunten (motief-oriëntatie)
        s += `<path d="M${f1(lp.cL - 12)},${FB_Y - 13} L${f1(lp.cL + 10)},${FB_Y} L${f1(lp.cL - 12)},${FB_Y + 13} Z" fill="#ff8a3d" stroke="#0a1224" stroke-width="1.5"/>`;
        s += `<path d="M${f1(lp.cR + 12)},${FB_Y - 13} L${f1(lp.cR - 10)},${FB_Y} L${f1(lp.cR + 12)},${FB_Y + 13} Z" fill="#ff8a3d" stroke="#0a1224" stroke-width="1.5"/>`;
      }
      return s;
    }
    function hic(op, k = 1) {
      if (op < .01) return '';
      // lineaire genoomas + driehoekige contactkaart (schets): hoge intensiteit binnen de domeinen.
      // k (0..1) bouwt de kaart op: eerst één uitgelicht vakje (= stuk A + stuk B), dan vullen de vakjes zich vanaf de diagonaal,
      // tot de buurten als heldere driehoeken zichtbaar worden.
      const y0 = 340, x0 = 590, x1 = 1090, n = 20, cw = (x1 - x0) / n;
      const pos = i => x0 + (i + .5) * cw;
      const inTad = (i, j) => TADS.some(([a, b]) => pos(i) > a - 12 && pos(j) < b + 12);
      const kA = ease(sub(k, 0, .2)), D = 9 * ease(sub(k, .25, .7)), kT = ease(sub(k, .7, .85));
      let s = `<g opacity="${f1(op)}"><line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" stroke="${C.muted}" stroke-width="3"/>` +
        txt(x1 - 2, y0 - 12, T2('contactkaart (Hi-C, schets)', 'contact map (Hi-C, sketch)'), C.muted, 14, 'end');
      for (let i = 0; i < n; i++) for (let j = i; j < Math.min(n, i + 9); j++) {
        const d = j - i, v = inTad(i, j) ? .95 - d * .05 : Math.max(.05, .45 - d * .12), vis = clamp(D - d);
        if (vis <= 0) continue;
        const cx = x0 + (i + j + 1) * cw / 2, cy = y0 + 6 + d * cw / 2, h = cw / 2;
        s += `<path d="M${f1(cx)},${f1(cy)} L${f1(cx + h)},${f1(cy + h)} L${f1(cx)},${f1(cy + 2 * h)} L${f1(cx - h)},${f1(cy + h)} Z" fill="#ff4d4d" fill-opacity="${f1(clamp(v, 0, 1) * vis)}"/>`;
      }
      // het uitgelichte vakje: stuk A (i = 2) en stuk B (j = 8) van de rij; de schuine lijnen tonen welk paar het is
      const iA = 2, jB = 8, ax = pos(iA), bx = pos(jB), ccx = x0 + (iA + jB + 1) * cw / 2, ccy = y0 + 6 + (jB - iA) * cw / 2, h = cw / 2;
      s += `<g opacity="${f1(kA)}"><path d="M${f1(ax)},${y0} L${f1(ccx)},${f1(ccy + h)} L${f1(bx)},${y0}" stroke="#fff" stroke-width="1.8" fill="none" stroke-dasharray="4 4" opacity="${f1(1 - .75 * kT)}"/>` +
        `<path d="M${f1(ccx)},${f1(ccy)} L${f1(ccx + h)},${f1(ccy + h)} L${f1(ccx)},${f1(ccy + 2 * h)} L${f1(ccx - h)},${f1(ccy + h)} Z" fill="#ff4d4d" stroke="#fff" stroke-width="2.5"/>` +
        `<circle cx="${f1(ax)}" cy="${y0}" r="6" fill="#fff"/><circle cx="${f1(bx)}" cy="${y0}" r="6" fill="#fff"/>` +
        txt(ax, y0 - 12, 'A', '#fff', 15, 'middle', 800) + txt(bx, y0 - 12, 'B', '#fff', 15, 'middle', 800) +
        txt(840, 503, T2('elk vakje = twee stukken DNA (A en B) · hoe roder, hoe vaker ze elkaar raken', 'each square = two pieces of DNA (A and B) · the redder, the more often they touch'), '#fff', 15) + '</g>';
      for (const [a, b] of TADS) s += `<g opacity="${f1(kT)}"><path d="M${a},${y0 + 6} L${(a + b) / 2},${y0 + 6 + (b - a) / 2} L${b},${y0 + 6}" stroke="#fff" stroke-width="2" fill="none" stroke-dasharray="5 4"/>` + txt((a + b) / 2, y0 + 34, T2('buurt', 'neighbourhood'), '#fff', 16, 'middle', 800) + txt((a + b) / 2, y0 + 53, '(TAD)', '#fff', 13) + '</g>';
      return s + '</g>';
    }
    return {
      update(t, s) {
        const { step, p } = s;
        // focus: de andere panelen dimmen
        panels.forEach((id, k) => $(id).setAttribute('opacity', focus[step] === null || focus[step] === k ? 1 : .2));
        // ingezoomd op paneel ① (hoger dan het beeld): kader weg, de kern zelf staat volledig in beeld
        pAframe.setAttribute('opacity', step === 1 ? 0 : 1);
        // overzicht: geen label-pillen over de kop van paneel ③ (de engine verbergt een label als zijn anker onzichtbaar is)
        ['cr-a-hm', 'cr-a-dm'].forEach(id => $(id).setAttribute('opacity', step === 0 ? 0 : 1));
        const fsT = step === 0 ? tfs(0) : lerp(tfs(step - 1), tfs(step), ease(sub(p, 0, .2)));
        titles.forEach(({ el, y0 }) => { el.setAttribute('font-size', f1(fsT)); el.setAttribute('y', f1(y0 + fsT + 10)); });
        // detaillabels alleen in de stap waarin hun paneel centraal staat (paneeltitels blijven)
        const cur = focus[step] ?? -1, prev = step > 0 ? focus[step - 1] ?? -1 : -1, fin = sub(p, 0, .3);
        const u1 = step < 2 ? 0 : step === 2 ? .92 * ease(sub(p, .05, .55)) : .92;
        const u2 = step < 2 ? 0 : step === 2 ? .92 * ease(sub(p, .35, .9)) : .92;
        $('cr-fibre').innerHTML = fibre(u1, u2) +
          (step === 2 ? txt(845, 365, T2('cohesine (ring) → lus tot aan CTCF ▶ ◀', 'cohesin (ring) → loop up to CTCF ▶ ◀'), '#ffc247', 16) : '');
        $('cr-hic').innerHTML = hic(step < 3 ? 0 : step === 3 ? ease(sub(p, 0, .1)) : 1, step === 3 ? sub(p, .05, .95) : 1);
        panels.forEach((id, k) => {
          const o = cur === k && prev === k ? 1 : cur === k ? fin : prev === k ? 1 - fin : 0;
          $(id).querySelectorAll('text:not(.ptitle)').forEach(el => el.setAttribute('opacity', f1(o)));
        });
      },
    };
  },
};
