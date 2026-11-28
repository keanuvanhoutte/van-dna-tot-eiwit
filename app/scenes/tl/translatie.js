import { C, BASE, RNA_PAIR, L, T2, svgOpen, pill, txt, cam, FULL, sub, ease, lerp, clamp, f1, translate, THREE, AACLASS, CLASSCOL } from '../../kit.js';
import { koepelPad, subeenheid, tunnel, factor } from './_tlkit.js';
import { eiwit, trna2d, trnaPunt, anticodonVan, hexMix, TRNA_SITE } from '../../bio.js';

/* mRNA 5'→3': 5'-UTR zonder AUG · Kozak GCCACC·AUG·G · 12 codons + stop UAA · 3'-UTR · poly(A) (verkort) */
const UTR5 = 'GGAUCCAGCUUCGAAUUCGCCACC', CDS = 'AUGGCUUUCAAGGAUUGGCACGGACUGACCGAAAGCUAA', UTR3 = 'GCGGCCUCUAGC', POLYA = 'A'.repeat(18);
const MRNA = UTR5 + CDS + UTR3 + POLYA;
const S0 = UTR5.length;                               // index van de A van het start-AUG
const CODONS = []; for (let i = S0; i + 3 <= UTR5.length + CDS.length; i += 3) CODONS.push(MRNA.slice(i, i + 3));
const STOP = CODONS.findIndex(c => translate(c) === '*');   // = 12
const AAS = CODONS.slice(0, STOP).map(translate);           // M A F K D W H G L T E S

const NT = 40, COD = 120, YM = 600, PC = 800;               // nucleotidebreedte, codonbreedte, hoogte mRNA, midden P-plaats
const SITE = { E: PC - COD, P: PC, A: PC + COD };
const SCAN0 = (S0 + 1) * NT - 240;                          // bij binding aan de cap ligt het AUG zoveel px verder
const TUNNEL = [830, 175];
const TUBE = [[839, 284], [834, 240], [830, 196]];           // plaatsen in de tunnel: van het PTC naar de uitgang bovenaan de 60S

const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'translatie',
  title: { nl: 'Translatie', en: 'Translation' }, scale: '≈ 25 nm',
  time: { nl: '≈ 5–6 aminozuren/s (hier sterk vertraagd)', en: '≈ 5–6 amino acids/s (strongly slowed down here)' },
  org: { nl: 'eukaryoot (80S-ribosoom)', en: 'eukaryote (80S ribosome)' },
  legend: [[C.rna, 'mRNA'], [TRNA_SITE.E, { nl: 'tRNA in E', en: 'tRNA in E' }], [TRNA_SITE.P, { nl: 'tRNA in P', en: 'tRNA in P' }], [TRNA_SITE.A, { nl: 'tRNA in A', en: 'tRNA in A' }], [C.rrna, { nl: 'ribosoom', en: 'ribosome' }], [C.prot, { nl: 'factoren (eIF, eEF, eRF)', en: 'factors (eIF, eEF, eRF)' }], [CLASSCOL.h, { nl: 'hydrofoob', en: 'hydrophobic' }], [CLASSCOL.p, { nl: 'polair', en: 'polar' }], [CLASSCOL['+'], { nl: 'positief geladen', en: 'positively charged' }], [CLASSCOL['-'], { nl: 'negatief geladen', en: 'negatively charged' }], [CLASSCOL.s, 'Gly / Pro']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">De aminozuren worden niet getekend maar berekend uit de genetische code; anticodons zijn complementair en antiparallel (3′→5′ gelezen). A–U-paren tonen 2, G–C-paren 3 waterstofbruggen.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">The amino acids are not drawn by hand but computed from the genetic code; anticodons are complementary and antiparallel (read 3′→5′). A–U pairs show 2, G–C pairs 3 hydrogen bonds.</p>' },
  simplified: {
    nl: 'Het ribosoom is een 2D-schets (echte structuur: PDB 4UG0, humaan 80S): 40S onder met het mRNA, 60S erboven met de tunnel van het actieve centrum naar buiten; tRNA\'s zijn getekend als vereenvoudigd klaverblad (in 3D is een tRNA L-vormig); de kleur toont de plaats: E oker, P geel, A lichtgeel. Het mRNA schuift hier langs een vast ribosoom (in werkelijkheid beweegt het ribosoom). Hybride toestanden, GTP-hydrolyse en de gesloten lus (eIF4G–PABP) zijn weggelaten; de poly(A)-staart is ingekort. Aminozuurkleuren volgen de cursusindeling; His staat bij positief (pH-afhankelijk).',
    en: 'The ribosome is a 2D sketch (real structure: PDB 4UG0, human 80S): 40S below holding the mRNA, 60S above with the tunnel from the active centre to the outside; tRNAs are drawn as a simplified cloverleaf (in 3D a tRNA is L-shaped); the colour shows the site: E ochre, P yellow, A light yellow. Here the mRNA slides past a fixed ribosome (in reality the ribosome moves). Hybrid states, GTP hydrolysis and the closed loop (eIF4G–PABP) are omitted; the poly(A) tail is shortened. Amino-acid colours follow the course grouping; His is shown as positive (pH-dependent).' },
  parts: [
    { c: C.rrna, t: { nl: 'grote subeenheid (60S)', en: 'large subunit (60S)' }, d: { nl: 'De grote helft van het ribosoom (boven). Hier worden de aminozuren aan elkaar gekoppeld.', en: 'The large half of the ribosome (top). This is where the amino acids are linked together.' },
      p: { nl: '60S-subeenheid met het peptidyltransferasecentrum en de exittunnel.', en: '60S subunit with the peptidyl transferase centre and the exit tunnel.' } },
    { c: C.text, t: { nl: 'uitgangstunnel', en: 'exit tunnel' }, d: { nl: 'Een smalle tunnel door de grote helft waarlangs de groeiende keten naar buiten komt.', en: 'A narrow tunnel through the large half along which the growing chain comes out.' },
      p: { nl: 'Peptide-exittunnel van de 60S (≈ 80–100 Å).', en: 'Peptide exit tunnel of the 60S (≈ 80–100 Å).' } },
    { c: C.text, t: 'P', m: ['E'], d: { nl: 'De drie plaatsen voor tRNA’s: A (nieuw tRNA komt aan), P (houdt de keten vast) en E (uitgang).', en: 'The three places for tRNAs: A (a new tRNA arrives), P (holds the chain) and E (exit).' },
      p: { nl: 'Aminoacyl- (A), peptidyl- (P) en exitplaats (E) van het ribosoom.', en: 'Aminoacyl (A), peptidyl (P) and exit (E) sites of the ribosome.' } },
    { c: '#8df0dc', t: { nl: 'kleine subeenheid (40S)', en: 'small subunit (40S)' }, m: ['scannen 5′→3′', 'scanning 5′→3′'], d: { nl: 'De kleine helft van het ribosoom (onder). Ze houdt het mRNA vast en schuift eerst over het begin tot ze het startsein vindt.', en: 'The small half of the ribosome (bottom). It holds the mRNA and first slides along the start until it finds the start signal.' },
      p: { nl: '40S-subeenheid; als 43S/48S-complex scant ze de 5′-UTR in 5′→3′-richting naar het eerste AUG in goede context (Kozak).', en: '40S subunit; as a 43S/48S complex it scans the 5′ UTR in the 5′→3′ direction to the first AUG in a good context (Kozak).' } },
    { c: C.rna, t: { nl: 'wordt vertaald', en: 'is translated' }, d: { nl: 'Het middenstuk van het mRNA, van startsein tot stopsein. Alleen dit wordt in eiwit vertaald.', en: 'The middle part of the mRNA, from start signal to stop signal. Only this is translated into protein.' },
      p: { nl: 'Coderende sequentie (CDS, open leesraam).', en: 'Coding sequence (CDS, open reading frame).' } },
    { c: C.text, t: '5′-UTR', m: ['3′-UTR'], d: { nl: 'De stukken vóór het startsein en na het stopsein. Ze worden niet vertaald, maar helpen het lezen te regelen.', en: 'The parts before the start signal and after the stop signal. They are not translated, but help regulate reading.' },
      p: { nl: '5′- en 3′-onvertaalde regio’s; regelen initiatie, stabiliteit en lokalisatie.', en: '5′ and 3′ untranslated regions; regulate initiation, stability and localisation.' } },
    { c: C.cap, t: { nl: 'kapje', en: 'cap' }, m: ['m⁷G'], d: { nl: 'Het kapje op de kop van het mRNA: een speciale G-bouwsteen. Hier begint het ribosoom.', en: 'The cap on the head of the mRNA: a special G building block. The ribosome begins here.' },
      p: { nl: '7-methylguanosine-cap; bindt eIF4E (in eIF4F) voor cap-afhankelijke initiatie.', en: '7-methylguanosine cap; binds eIF4E (in eIF4F) for cap-dependent initiation.' } },
    { c: C.rna, t: 'poly(A)', m: ['poly(A)-staart (verkort)', 'poly(A) tail (shortened)', 'poly(A) →'], d: { nl: 'De staart van A-bouwstenen aan het einde (hier korter getekend). Ze beschermt het mRNA.', en: 'The tail of A building blocks at the end (drawn shorter here). It protects the mRNA.' },
      p: { nl: 'Poly(A)-staart (ingekort weergegeven), gebonden door PABP.', en: 'Poly(A) tail (shown shortened), bound by PABP.' } },
    { c: C.text, t: 'start (AUG)', d: { nl: 'Het startsein: het eerste AUG. Hier begint het eiwit, altijd met methionine.', en: 'The start signal: the first AUG. The protein begins here, always with methionine.' },
      p: { nl: 'Startcodon AUG in Kozak-context (GCCACC·AUG·G), gelezen door het initiator-tRNA (Met-tRNAi).', en: 'AUG start codon in Kozak context (GCCACC·AUG·G), read by the initiator tRNA (Met-tRNAi).' } },
    { c: C.danger, t: 'stop (UAA)', m: ['STOP'], d: { nl: 'Het stopsein: hier eindigt het eiwit, want er past geen tRNA op.', en: 'The stop signal: the protein ends here, because no tRNA fits it.' },
      p: { nl: 'Stopcodon UAA, herkend door eRF1.', en: 'UAA stop codon, recognised by eRF1.' } },
    { c: C.prot2, t: 'eIF4F', d: { nl: 'Een groep hulpeiwitten die het kapje herkent en de kleine helft naar het mRNA haalt.', en: 'A group of helper proteins that recognises the cap and brings the small half to the mRNA.' },
      p: { nl: 'Cap-bindend complex eIF4E–eIF4G–eIF4A; rekruteert het 43S-pre-initiatiecomplex.', en: 'Cap-binding complex eIF4E–eIF4G–eIF4A; recruits the 43S pre-initiation complex.' } },
    { c: C.prot3, t: { nl: 'hulpeiwitten (eIF)', en: 'helper proteins (eIF)' }, m: ['eIF3', 'eIF1'], d: { nl: 'Startfactoren op de kleine helft. Ze helpen het juiste startsein vinden en laten daarna los.', en: 'Start factors on the small half. They help find the right start signal and let go afterwards.' },
      p: { nl: 'Initiatiefactoren: eIF3 (steiger, verbindt met eIF4F), eIF1 (bewaakt de keuze van het startcodon; komt vrij bij AUG-herkenning).', en: 'Initiation factors: eIF3 (scaffold, links to eIF4F), eIF1 (monitors start codon selection; released upon AUG recognition).' } },
    { c: C.prot2, t: 'eIF2·GTP', d: { nl: 'Een hulpeiwit dat het eerste tRNA (met methionine) vasthoudt en op de kleine helft zet.', en: 'A helper protein that holds the first tRNA (with methionine) and places it on the small half.' },
      p: { nl: 'eIF2·GTP·Met-tRNAi (ternair complex); GTP-hydrolyse bij startcodonherkenning.', en: 'eIF2·GTP·Met-tRNAi (ternary complex); GTP hydrolysis upon start codon recognition.' } },
    { c: C.prot2, t: 'eIF5B·GTP', d: { nl: 'Een hulpeiwit dat de grote helft erbij brengt, zodat het ribosoom compleet is.', en: 'A helper protein that brings in the large half, so the ribosome is complete.' },
      p: { nl: 'eIF5B, GTPase die de koppeling van de 60S-subeenheid tot het 80S-initiatiecomplex bevordert.', en: 'eIF5B, a GTPase that promotes 60S subunit joining into the 80S initiation complex.' } },
    { c: C.trna, t: 'anticodon', d: { nl: 'De gele klaverbladen zijn tRNA’s. Onderaan hebben ze drie letters (het anticodon) die precies op een codon van het mRNA passen.', en: 'The yellow cloverleaves are tRNAs. At the bottom they have three letters (the anticodon) that fit exactly onto a codon of the mRNA.' },
      p: { nl: 'tRNA-anticodon, complementair en antiparallel aan het codon (A–U 2, G–C 3 H-bruggen).', en: 'tRNA anticodon, complementary and antiparallel to the codon (A–U 2, G–C 3 hydrogen bonds).' } },
    { c: C.chain, t: { nl: 'aminozuren', en: 'amino acids' }, m: ['Met', 'Ala', 'Phe', 'Lys', 'Asp', 'Trp', 'His', 'Gly', 'Leu', 'Thr', 'Glu', 'Ser'], d: { nl: 'De kralen: de bouwstenen van het eiwit, berekend uit de codons. De kleur toont de soort aminozuur.', en: 'The beads: the building blocks of the protein, worked out from the codons. The colour shows the kind of amino acid.' },
      p: { nl: 'Aminozuren uit de genetische code (MAFKDWHGLTES), gekleurd per fysicochemische klasse.', en: 'Amino acids from the genetic code (MAFKDWHGLTES), coloured by physicochemical class.' } },
    { c: C.prot2, t: 'eEF1A·GTP', d: { nl: 'Een hulpeiwit dat een geladen tRNA naar plaats A brengt en loslaat als het past.', en: 'A helper protein that brings a loaded tRNA to site A and lets go once it fits.' },
      p: { nl: 'Elongatiefactor eEF1A·GTP; levert aa-tRNA af, GTP-hydrolyse na correcte codon–anticodonparing.', en: 'Elongation factor eEF1A·GTP; delivers aa-tRNA, GTP hydrolysis after correct codon–anticodon pairing.' } },
    { c: '#fff', t: { nl: 'peptidyl-', en: 'peptidyl' }, m: ['transferasecentrum', 'transferase centre'], d: { nl: 'De koppelplek in de grote helft: hier wordt de keten aan het nieuwe aminozuur gehangen. Dat doet het RNA van het ribosoom.', en: 'The linking spot in the large half: here the chain is attached to the new amino acid. The ribosome’s RNA does this.' },
      p: { nl: 'Peptidyltransferasecentrum (PTC) in het 28S rRNA; katalyseert peptidebinding (ribozym).', en: 'Peptidyl transferase centre (PTC) in 28S rRNA; catalyses peptide bond formation (ribozyme).' } },
    { c: C.prot2, t: 'eEF2·GTP', d: { nl: 'Een hulpeiwit dat het ribosoom drie letters verder schuift.', en: 'A helper protein that moves the ribosome three letters on.' },
      p: { nl: 'Elongatiefactor eEF2; GTP-afhankelijke translocatie van tRNA’s en mRNA met één codon.', en: 'Elongation factor eEF2; GTP-dependent translocation of tRNAs and mRNA by one codon.' } },
    { c: TRNA_SITE.E, t: { nl: 'leeg tRNA vertrekt', en: 'empty tRNA leaves' }, m: ['→ wordt opnieuw geladen', '→ will be loaded again'], d: { nl: 'Het tRNA zonder aminozuur verlaat het ribosoom en kan opnieuw een aminozuur krijgen.', en: 'The tRNA without an amino acid leaves the ribosome and can get a new amino acid.' },
      p: { nl: 'Gedeacyleerd tRNA verlaat de E-plaats en wordt door zijn aaRS opnieuw geladen.', en: 'Deacylated tRNA leaves the E site and is recharged by its aaRS.' } },
    { c: C.prot, t: 'eRF1', m: ['N', 'GGQ'], d: { nl: 'Het stopeiwit: het lijkt op een tRNA en past op het stopsein. Zijn punt (GGQ) reikt tot de koppelplek.', en: 'The stop protein: it looks like a tRNA and fits the stop signal. Its tip (GGQ) reaches the linking spot.' },
      p: { nl: 'Release factor eRF1, tRNA-mimicry: domein N herkent het stopcodon, het GGQ-motief van domein M activeert hydrolyse in het PTC.', en: 'Release factor eRF1, tRNA mimicry: domain N recognises the stop codon, the GGQ motif of domain M triggers hydrolysis in the PTC.' } },
    { c: C.prot2, t: 'eRF3·GTP', d: { nl: 'Een hulpeiwit dat het stopeiwit naar het ribosoom brengt.', en: 'A helper protein that brings the stop protein to the ribosome.' },
      p: { nl: 'eRF3, GTPase die eRF1 aflevert in de A-plaats.', en: 'eRF3, a GTPase that delivers eRF1 to the A site.' } },
    { c: '#4fb0ff', t: { nl: 'water (H₂O)', en: 'water (H₂O)' }, m: ['O', 'knipt de keten los', 'cuts the chain free'], d: { nl: 'Een watermolecule knipt de keten los van het laatste tRNA. Het eiwit komt vrij.', en: 'A water molecule cuts the chain free from the last tRNA. The protein is released.' },
      p: { nl: 'Hydrolyse van de esterbinding van het peptidyl-tRNA, gekatalyseerd via eRF1-GGQ in het PTC.', en: 'Hydrolysis of the peptidyl-tRNA ester bond, catalysed via eRF1-GGQ in the PTC.' } },
    { c: C.prot2, t: 'ABCE1', d: { nl: 'Een eiwit dat het ribosoom weer in zijn twee helften uit elkaar haalt.', en: 'A protein that splits the ribosome back into its two halves.' },
      p: { nl: 'ATPase ABCE1; splitst het post-terminatiecomplex in 40S en 60S (recycling).', en: 'ATPase ABCE1; splits the post-termination complex into 40S and 60S (recycling).' } },
    { c: C.text, t: '5′', m: ['3′'], d: { nl: 'De twee uiteinden van het mRNA. Het ribosoom leest altijd van 5′ naar 3′.', en: 'The two ends of the mRNA. The ribosome always reads from 5′ to 3′.' },
      p: { nl: '5′- en 3′-uiteinde; translatie verloopt 5′→3′.', en: '5′ and 3′ ends; translation proceeds 5′→3′.' } },
  ],
  steps: [
    ST(8000, cam(2380, 640, 4000), 'Het mRNA met de boodschap', 'The mRNA carries the message', 'Alleen het middenstuk, van het startsein (AUG) tot het stopsein (UAA), wordt vertaald in een eiwit.', 'Only the middle part, from the start signal (AUG) to the stop signal (UAA), is translated into protein.'),
    ST(8000, cam(520, 560, 1150), 'Het ribosoom begint vooraan', 'The ribosome starts at the front', 'De kleine helft van het ribosoom bindt vooraan op het mRNA, samen met een eerste tRNA dat methionine draagt.', 'The small half of the ribosome binds at the front of the mRNA, together with a first tRNA carrying methionine.'),
    ST(9000, cam(800, 580, 1350), 'Zoeken naar het startpunt', 'Searching for the starting point', 'De kleine helft schuift over het mRNA tot ze het eerste AUG vindt: het startsein (startcodon).', 'The small half slides along the mRNA until it finds the first AUG: the start signal (start codon).'),
    ST(8000, cam(800, 610, 640), 'Het startpunt is gevonden', 'The starting point is found', 'Drie basen van het tRNA (het anticodon) passen precies op AUG. Een paar hulpeiwitten laten dan los.', 'Three bases of the tRNA (the anticodon) fit exactly onto AUG. A few helper proteins then let go.'),
    ST(8000, cam(800, 470, 1350), 'Het ribosoom is compleet', 'The ribosome is complete', 'De grote helft komt erbij. Het ribosoom heeft drie plaatsen voor tRNA’s: A, P en E; het eerste zit in P.', 'The large half joins. The ribosome has three places for tRNAs: A, P and E; the first one sits in P.'),
    ST(8500, cam(930, 440, 1250), 'Een tRNA brengt een aminozuur', 'A tRNA brings an amino acid', 'Een hulpeiwit brengt een tRNA met zijn aminozuur naar plaats A. Een eigen enzym had het vooraf geladen.', 'A helper protein brings a tRNA with its amino acid to site A. Its own enzyme had loaded it beforehand.'),
    ST(8500, cam(920, 600, 560), 'Past het? De controle', 'Does it fit? The check', 'Alleen een tRNA dat precies past op het codon (drie letters van het mRNA) blijft zitten; de helper laat los.', 'Only a tRNA that exactly fits the codon (three letters of the mRNA) stays bound; the helper lets go.'),
    ST(8500, cam(870, 300, 640), 'Het aminozuur wordt vastgekoppeld', 'The amino acid is linked on', 'Het ribosoom hangt de keten aan het nieuwe aminozuur. Dat doet zijn RNA zelf: een RNA-enzym (ribozym).', 'The ribosome attaches the chain to the new amino acid. Its RNA does this itself: an RNA enzyme (ribozyme).'),
    ST(8500, cam(800, 470, 1350), 'Het ribosoom schuift één stap op', 'The ribosome moves one step on', 'Een hulpeiwit schuift het ribosoom drie letters verder. De tRNA’s schuiven mee: van A naar P, van P naar E.', 'A helper protein moves the ribosome three letters on. The tRNAs move along: from A to P, from P to E.'),
    ST(6500, cam(760, 420, 1450), 'Het lege tRNA vertrekt', 'The empty tRNA leaves', 'Het lege tRNA verlaat plaats E (E = exit) en kan opnieuw geladen worden. Plaats A is weer vrij.', 'The empty tRNA leaves site E (E = exit) and can be loaded again. Site A is free again.'),
    ST(9000, cam(835, 450, 1450), 'Dezelfde ronde opnieuw', 'The same round again', 'Aankomen, controleren, koppelen, opschuiven, vertrekken: elke ronde maakt de keten één aminozuur langer.', 'Arrive, check, link, move on, leave: each round makes the chain one amino acid longer.'),
    ST(15000, cam(800, 395, 1400), 'De keten groeit verder (versneld)', 'The chain keeps growing (fast-forward)', 'Zo worden alle codons gelezen. De keten komt via een tunnel uit het ribosoom en begint al te vouwen.', 'This is how all codons are read. The chain leaves the ribosome through a tunnel and already starts to fold.'),
    ST(8500, cam(930, 375, 1350), 'Een stopsein: geen tRNA past', 'A stop signal: no tRNA fits', 'Op een stopcodon past geen tRNA. Een stopeiwit dat op een tRNA lijkt, neemt plaats A in.', 'No tRNA fits a stop codon. A stop protein that looks like a tRNA takes site A instead.'),
    ST(8500, cam(840, 300, 1350), 'Het eiwit komt los', 'The protein comes free', 'Het stopeiwit laat water de keten loshalen van het laatste tRNA. Het eiwit komt vrij en vouwt.', 'The stop protein lets water cut the chain free from the last tRNA. The protein is released and folds.'),
    ST(7500, FULL, 'Het ribosoom valt uit elkaar', 'The ribosome comes apart', 'Een ander eiwit haalt het ribosoom uit elkaar. De helften kunnen daarna aan een nieuwe ronde beginnen.', 'Another protein splits the ribosome. The halves can then start a new round.'),
  ],
  svg() {
    return svgOpen() + `
    <g data-node="ribosoom" data-color="${C.rrna}" data-label="${T2('Ribosoom (80S)', 'Ribosome (80S)')}">
      <g id="tl-large">
        ${subeenheid(koepelPad(820, 588, 350, 373, { seed: 60 }), { fill: .16 })}
        ${tunnel([841, 300], [830, 206])}
        <g id="tl-l60" opacity="0">${txt(1110, 262, T2('grote subeenheid (60S)', 'large subunit (60S)'), C.rrna, 24, 'start', 700)}</g>
        <g id="tl-ltun" opacity="0">${txt(866, 158, T2('uitgangstunnel', 'exit tunnel'), C.text, 22, 'start')}</g>
        <g font-family="JetBrains Mono" font-size="22" font-weight="700" fill="${C.text}" text-anchor="middle" opacity=".8">
          <text x="${SITE.E}" y="252">E</text><text x="${SITE.P}" y="252">P</text><text x="${SITE.A}" y="252">A</text>
        </g>
        <circle data-anchor="ribosoom" cx="1010" cy="258" r="1" fill="none"/>
      </g>
      <g id="tl-small">
        ${subeenheid(koepelPad(800, 648, 300, 126, { seed: 40, dir: 1 }), { fill: .24, col: '#8df0dc' })}
        <g id="tl-l40" opacity="0">${txt(800, 818, T2('kleine subeenheid (40S)', 'small subunit (40S)'), '#8df0dc', 24, 'middle', 700)}</g>
      </g>
    </g>
    <g data-node="vouwing" data-color="${C.chain}" data-label="${T2('Groeiende keten → vouwing', 'Growing chain → folding')}"><g id="tl-chain"></g><circle id="tl-chainA" data-anchor="vouwing" r="1" fill="none"/></g>
    <g data-node="trna" data-color="${C.trna}" data-label="tRNA"><g id="tl-trnas"></g><circle id="tl-trnaA" data-anchor="trna" r="1" fill="none"/></g>
    <g data-node="aars" data-color="${C.trna}" data-label="${T2('geladen tRNA (aminoacyl-tRNA)', 'charged tRNA (aminoacyl-tRNA)')}" data-nolabel><g id="tl-inc"></g></g>
    <g data-node="elongatie" data-color="${C.prot}" data-label="eEF1A · eEF2"><g id="tl-eef"></g><circle id="tl-eefA" data-anchor="elongatie" r="1" fill="none"/></g>
    <g data-node="terminatie" data-color="${C.prot}" data-label="${T2('eRF1 (stop)', 'eRF1 (stop)')}"><g id="tl-rf"></g><circle id="tl-rfA" data-anchor="terminatie" cx="-9999" r="1" fill="none"/></g>
    <g data-node="codon" data-color="${C.rna}" data-label="${T2('mRNA · codons', 'mRNA · codons')}"><g id="tl-mrna"></g><circle id="tl-mrnaA" data-anchor="codon" data-pos="below" r="1" fill="none"/></g>
    <g data-node="polya" data-color="${C.rna}" data-label="${T2('Poly(A)-staart', 'Poly(A) tail')}"><g id="tl-polya"></g><circle id="tl-polyaA" data-anchor="polya" r="1" fill="none"/></g>
    <g data-node="basenparing" data-color="${C.rna}" data-nolabel><g id="tl-pairs"></g></g>
    <g data-node="peptide" data-color="${C.chain}" data-nolabel><g id="tl-ptc"></g></g>
    <g id="tl-abce"></g>
    <g id="tl-ov"></g>
    <g data-node="initiatie" data-color="${C.prot}" data-label="${T2("5′-cap · initiatiefactoren", "5′ cap · initiation factors")}"><g data-node="capping" data-color="${C.cap}" data-nolabel><g id="tl-cap"></g></g><g id="tl-eif"></g><circle id="tl-initA" data-anchor="initiatie" r="1" fill="none"/></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);

    /* ---- tekenfuncties ---- */
    /* tRNA = het gedeelde symbool (bio.js trna2d): anticodon (links→rechts 3'→5') op het codon, aminozuur op het CCA-uiteinde.
       y = bovenrand van de anticodontegels; col = kleur van de plaats (TRNA_SITE: E oker, P geel, A lichtgeel) */
    function trna(x, y, codonIdx, aaChar, op = 1, big = false, col = TRNA_SITE.P) {
      return trna2d(x, y, { anticodon: anticodonVan(CODONS[codonIdx]), aa: aaChar, op, col, ends: big, acLabel: T2('anticodon', 'anticodon') });
    }
    /* eRF1 bootst een tRNA na (Song et al. 2000, Cell 100:311): domein N op het stopcodon (zoals de anticodonarm),
       domein M reikt met het GGQ-motief tot in het actieve centrum (zoals de acceptorarm), domein C aan de zijkant */
    function eRF1(x, y) {
      return `<path d="M${x - 4},${y + 14} L${x - 10},${y - 118} L${x - 66},${y - 196}" stroke="#0b1224" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" fill="none"/>` +
        `<path d="M${x - 4},${y + 14} L${x - 10},${y - 118} L${x - 66},${y - 196}" stroke="${C.prot}" stroke-opacity=".8" stroke-width="24" stroke-linecap="round" stroke-linejoin="round" fill="none"/>` +
        eiwit(x + 44, y - 120, 36, 28, C.prot, { seed: 33, bumps: .08 }) + eiwit(x - 2, y + 16, 34, 30, C.prot, { seed: 31, bumps: .08 }) +
        txt(x + 44, y - 113, 'eRF1', '#fff', 19) + txt(x - 2, y + 22, 'N', '#fff', 16) +
        txt(x - 50, y - 214, 'GGQ', '#fff', 14, 'start', 700);
    }
    /* tRNA's en factoren komen binnen en vertrekken langs de opening tussen de subeenheden, loodrecht op het scherm
       (Schmeing & Ramakrishnan 2009): ze schuiven niet zijdelings door de wand van de 60S, maar komen van vóór (groter,
       doorschijnend) naar hun plaats. k = 0: op hun plaats · 1: nog vóór het ribosoom (onzichtbaar); (dx, dy) = kleine zijdrift */
    function front(g, x, y, k, dx = 0, dy = 0) {
      if (k <= .001) return g;
      if (k >= .999 || !g) return '';
      return `<g opacity="${f1(1 - k)}" transform="translate(${f1(x + dx * k)} ${f1(y + dy * k)}) scale(${(1 + .3 * k).toFixed(3)}) translate(${-x} ${-y})">${g}</g>`;
    }
    function bead(x, y, a, r = 18) {
      return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${CLASSCOL[AACLASS[a]] ?? '#aaa'}" stroke="#0a1224" stroke-width="2"/>` +
        `<text x="${f1(x)}" y="${f1(y + r * .3)}" font-size="${Math.round(r * .76)}" text-anchor="middle" fill="#0a1224" font-family="Inter" font-weight="700">${THREE[a]}</text>`;
    }
    const ntX = (i, c, v, scan) => PC + ((i - S0 - 1) - 3 * (c + v)) * NT + scan;

    /* ov = overzicht (stap 0, ver uitgezoomd): letters verborgen, grote regiolabels; lab5/lab3 = zichtbaarheid UTR-labels */
    function drawMRNA(c, v, scan, ov, lab5, lab3, ovL = ov, kortA = 0) {
      let m = '';
      const x0 = ntX(0, c, v, scan) - NT / 2, x1 = ntX(MRNA.length - 1, c, v, scan) + NT / 2, lo = 1 - ov;
      m += `<line x1="${f1(x0 - 20)}" y1="${YM}" x2="${f1(x1)}" y2="${YM}" stroke="${C.rna}" stroke-width="${f1(6 + 18 * ov)}"/>`;
      for (let j = 0; j < MRNA.length; j++) {
        const x = ntX(j, c, v, scan);
        if (x < -3000 || x > 5200) continue;
        const cod = Math.floor((j - S0) / 3), inFrame = j >= S0 && cod <= STOP;
        m += `<rect x="${f1(x - 17)}" y="${YM + 6}" width="34" height="${f1(30 + 40 * ov)}" rx="5" fill="${BASE[MRNA[j]]}" opacity="${inFrame ? 1 : .5}"/>`;
        if (lo > .01) m += `<text x="${f1(x)}" y="${YM + 27}" font-size="18" text-anchor="middle" fill="#0a1224" font-family="JetBrains Mono" font-weight="700" opacity="${f1(lo)}">${MRNA[j]}</text>`;
        if (lo > .01 && inFrame && (j - S0) % 3 === 0) {
          const a = translate(CODONS[cod]);
          m += `<g opacity="${f1(lo)}"><line x1="${f1(x - NT / 2)}" y1="${YM + 40}" x2="${f1(x - NT / 2)}" y2="${YM + 60}" stroke="${C.muted}" stroke-width="2"/>` +
            (a === '*' ? txt(x + NT, YM + 70, 'STOP', C.danger, 21, 'middle', 700) : txt(x + NT, YM + 69, THREE[a], C.muted, 18)) + '</g>';
        }
      }
      m += txt(x1 + 24 + 30 * ov, YM - 12 + 30 * ov, "3′", C.text, f1(18 + 70 * ov));
      $('tl-mrna').innerHTML = m;
      $('tl-mrnaA').setAttribute('cx', f1(clamp(ntX(S0 + 3 * (c + 2), c, v, scan), 150, 1450))); $('tl-mrnaA').setAttribute('cy', YM + 82 + 150 * ov);
      const capX = ntX(0, c, v, scan) - NT / 2 - 22;
      $('tl-cap').innerHTML = `<circle cx="${f1(capX)}" cy="${YM}" r="23" fill="${C.cap}" stroke="${C.rna}" stroke-width="2"/><text x="${f1(capX)}" y="${YM + 5}" font-size="15" text-anchor="middle" fill="#3a1a05" font-family="Inter" font-weight="700" opacity="${f1(lo)}">m⁷G</text>` + txt(capX - 50 * ov, YM - 34 + 10 * ov, "5′", C.text, f1(18 + 70 * ov));
      const aS = ntX(MRNA.length - POLYA.length, c, v, scan) - NT / 2, aE = x1;
      $('tl-polya').innerHTML = `<rect x="${f1(aS)}" y="${YM - 16}" width="${f1(aE - aS)}" height="70" fill="transparent"/>` + (lo > .01 ? `<g opacity="${f1(lo)}"><path d="M${f1(aS + 4)},${YM + 76} v10 H${f1(aE - 4)} v-10" stroke="${C.rna}" stroke-width="2" fill="none"/>` +
        (kortA === 2 ? txt(aS - 8, YM + 112, 'poly(A) →', C.rna, 24, 'end', 700) :   // links van de staart: niet tegen de rechterrand kortA === 1 ? txt(aS - 8, YM + 112, 'poly(A) →', C.rna, 24, 'end', 700) :   // stopstappen: het midden van de staart valt buiten beeld
          txt((aS + aE) / 2, YM + 114, T2('poly(A)-staart (verkort)', 'poly(A) tail (shortened)'), C.rna, 20)) + '</g>' : '');
      $('tl-polyaA').setAttribute('cx', f1((aS + aE) / 2)); $('tl-polyaA').setAttribute('cy', YM + 150 + 60 * ov);
      // UTR-labels (alleen in de stappen waar ze ertoe doen)
      const u5 = (ntX(0, c, v, scan) + ntX(S0 - 1, c, v, scan)) / 2, u3 = (ntX(S0 + CDS.length, c, v, scan) + ntX(MRNA.length - POLYA.length - 1, c, v, scan)) / 2;
      if (lab5 > .01) $('tl-mrna').innerHTML += `<g opacity="${f1(lab5)}">${txt(u5, YM - 26, "5′-UTR", C.text, 22)}</g>`;
      if (lab3 > .01) $('tl-mrna').innerHTML += `<g opacity="${f1(lab3)}">${txt(u3, YM - 26, "3′-UTR", C.text, 22)}</g>`;
      // overzicht: grote labels per gebied (leesbaar bij de ver uitgezoomde camera van stap 0)
      let o = '';
      if (ovL > .01) {
        const cs = ntX(S0, c, v, scan) - NT / 2, ce = ntX(S0 + CDS.length - 1, c, v, scan) + NT / 2, ue = ntX(MRNA.length - POLYA.length - 1, c, v, scan) + NT / 2;
        const br = (xa, xb, col) => `<path d="M${f1(xa + 6)},${YM - 50} v-26 H${f1(xb - 6)} v26" stroke="${col}" stroke-width="10" fill="none"/>`;
        const tick = (x, col) => `<path d="M${f1(x)},${YM + 84} v46" stroke="${col}" stroke-width="10"/>`;
        o += `<g opacity="${f1(ovL)}">` + br(x0, cs, C.muted) + br(cs, ce, C.rna) + br(ce, ue, C.muted) + br(aS, aE, C.rna) +
          txt((x0 + cs) / 2, YM - 110, "5′-UTR", C.text, 100, 'middle', 700) + txt((cs + ce) / 2, YM - 110, T2('wordt vertaald', 'is translated'), C.rna, 110, 'middle', 800) +
          txt((ce + ue) / 2, YM - 110, "3′-UTR", C.text, 100, 'middle', 700) + txt((aS + aE) / 2, YM - 110, 'poly(A)', C.rna, 100, 'middle', 700) +
          txt(capX - 100, YM + 230, T2("kapje", "cap"), C.cap, 100, 'start', 700) +
          tick(cs, C.text) + tick(ce, C.danger) +
          txt(cs, YM + 230, 'start (AUG)', C.text, 100, 'middle', 800) + txt(ce, YM + 230, 'stop (UAA)', C.danger, 100, 'middle', 800) + '</g>';
      }
      $('tl-ov').innerHTML = o;
      // label '5′-cap · initiatiefactoren': niet in het overzicht (daar staat de cap aan de rand en zijn er nog geen factoren)
      $('tl-initA').setAttribute('cx', f1(ov > .5 ? -99999 : capX + 40)); $('tl-initA').setAttribute('cy', YM - 85);
      return capX;
    }
    function pairLines(x, codon, op) {
      // codon-anticodon-paring in de A- of P-plaats: 2 (A–U) of 3 (G–C) H-bruggen per basenpaar
      if (op <= .01) return '';
      let s = `<g opacity="${f1(op)}">`;
      codon.split('').forEach((b, j) => {
        const bx = x - NT + j * NT, n = b === 'G' || b === 'C' ? 3 : 2;
        for (let k = 0; k < n; k++) { const dx = (k - (n - 1) / 2) * 7; s += `<line x1="${f1(bx + dx)}" y1="${YM - 25}" x2="${f1(bx + dx)}" y2="${YM + 5}" stroke="#fff" stroke-width="2.5" stroke-dasharray="4 3"/>`; }
      });
      return s + '</g>';
    }
    function chainSVG(anchor, n, released = 0) {
      // n aminozuren AAS[0..n-1]; nieuwste bij het anker, oudste het verst weg (N-terminus eerst uit de tunnel).
      // released (0..1): de vrijgekomen keten schuift weg en klapt samen tot een compact bolletje (begin van de vouwing)
      const pts = [], FOLD = [380, 160];
      // plaats op het ketenpad: 0 = aan het tRNA (PTC), 1–3 in de uitgangstunnel, ≥ 4 buiten het ribosoom (fractioneel = ertussen)
      const at = j => j === 0 ? anchor : j < 4 ? TUBE[j - 1] : [TUNNEL[0] - 24 - (j - 4) * 44, TUNNEL[1] - 34 - (j - 4) * 12 + Math.cos((j - 4) * 1.4) * 12];
      const along = f => { const j = Math.floor(f), q = f - j, A = at(j), B = at(j + 1); return [lerp(A[0], B[0], q), lerp(A[1], B[1], q)]; };
      // released: eerst schuift de keten langs haar eigen pad door de tunnel naar buiten (het C-uiteinde komt net buiten de tunnel),
      // dan pas klapt ze samen tot een compact bolletje (begin van de vouwing)
      const ra = released > 0 ? ease(clamp(released * 2)) : 0, rb = released > 0 ? ease(clamp(released * 2 - 1)) : 0;
      for (let s = 0; s < n; s++) {
        let [x, y] = along(s + 4 * ra);
        if (rb > 0) {
          const i = n - 1 - s, ang = i * 2.4, rad = 27 * Math.sqrt(i + .3);   // zonnebloemspiraal: compact, zonder overlap
          x = lerp(x, FOLD[0] + rad * Math.cos(ang), rb); y = lerp(y, FOLD[1] + rad * Math.sin(ang), rb);
        }
        pts.push([x, y, AAS[n - 1 - s]]);
      }
      let g = pts.length > 1 ? `<path d="${pts.map((p, i) => `${i ? 'L' : 'M'}${f1(p[0])},${f1(p[1])}`).join('')}" stroke="${C.chain}" stroke-width="4" fill="none"/>` : '';
      g += pts.map(([x, y, a]) => bead(x, y, a, 21)).join('');
      const tip = pts[Math.min(3, pts.length - 1)] ?? anchor;
      const nt = pts[pts.length - 1] ?? anchor, ca = released > .5 ? [FOLD[0] + 250, FOLD[1] + 10] : n <= 4 ? [TUNNEL[0], TUNNEL[1] - 20] : [TUNNEL[0] + 130, TUNNEL[1] - 70];   // korte keten: label boven de tunneluitgang (niet op het PTC-label)
      $('tl-chainA').setAttribute('cx', f1(ca[0])); $('tl-chainA').setAttribute('cy', f1(ca[1]));
      return g;
    }

    /* ---- toestand per (stap, p) ---- */
    const CYC = [[0, .3], [.3, .45], [.45, .6], [.6, .85], [.85, 1]];   // aankomst, decodering, binding, translocatie, vertrek
    return {
      update(t, s) {
        const { step, p } = s;
        let c = 0, u = 0, scan = 0, phase = 'elong';
        if (step <= 4) phase = 'init';
        else if (step <= 9) { c = 0; const [a, b] = CYC[step - 5]; u = lerp(a, b, p); }
        else if (step === 10) { c = 1; u = p; }
        else if (step === 11) { const k = Math.min(8.999, sub(p, 0, .94) * 9); c = 2 + Math.floor(k); u = k - Math.floor(k); }
        else phase = 'term';                              // stap 12 (versneld) eindigt in rust: tRNA's op hun plaats
        if (phase === 'term') c = STOP - 1;

        const v = phase === 'elong' ? ease(sub(u, .6, .85)) : 0;
        if (phase === 'init') scan = step <= 1 ? SCAN0 : step === 2 ? SCAN0 * (1 - ease(p)) : 0;
        const ov = step === 0 ? 1 : step === 1 ? 1 - ease(sub(p, 0, .35)) : 0;
        const lab5 = step === 1 ? 1 - ov : step === 2 ? 1 : step === 3 ? 1 - sub(p, 0, .3) : 0;
        const lab3 = step === 12 ? sub(p, .2, .5) : step === 13 ? 1 : step === 14 ? 1 - sub(p, 0, .3) : 0;
        // grote overzichtslabels verdwijnen meteen bij het inzoomen (anders vallen ze half buiten de nieuwe camera)
        const ovL = step === 1 ? ov * (1 - sub(p, 0, .06)) : ov;
        const capX = drawMRNA(c, v, scan, ov, lab5, lab3, ovL, step >= 12 ? 2 : step === 11 ? 1 : 0);
        // labels van het ribosoom: alleen in de stap waar ze ertoe doen
        const l40 = step === 1 ? sub(p, .35, .7) : step === 2 ? 1 - sub(p, 0, .3) : step === 4 ? sub(p, .4, .7) : step === 5 ? 1 - sub(p, 0, .3) : 0;
        const l60 = step === 4 ? sub(p, .4, .7) : step === 5 ? 1 - sub(p, 0, .3) : 0;
        const ltun = step === 11 ? sub(p, .05, .2) : step === 12 ? 1 - sub(p, 0, .3) : 0;
        $('tl-l40').setAttribute('opacity', f1(l40)); $('tl-l60').setAttribute('opacity', f1(l60)); $('tl-ltun').setAttribute('opacity', f1(ltun));

        // subeenheden
        const smallOp = step === 0 ? 0 : step === 1 ? ease(sub(p, .2, .6)) : step === 14 ? 1 - .5 * ease(sub(p, .3, .8)) : 1;
        const largeOp = step <= 3 ? 0 : step === 4 ? lerp(.4, 1, ease(sub(p, 0, .4))) : step === 14 ? 1 - .5 * ease(sub(p, .3, .8)) : 1;
        const largeDy = step === 4 ? -70 * (1 - ease(sub(p, 0, .4))) : step === 14 ? -160 * ease(sub(p, .3, .8)) : 0;
        $('tl-small').setAttribute('opacity', f1(smallOp)); $('tl-small').setAttribute('transform', `translate(0 ${step === 14 ? f1(90 * ease(sub(p, .3, .8))) : 0})`);
        $('tl-large').setAttribute('opacity', f1(largeOp)); $('tl-large').setAttribute('transform', `translate(0 ${f1(largeDy)})`);

        // initiatiefactoren
        let eif = '';
        if (step >= 1 && step <= 2) eif += factor(capX + 80, YM - 56, 118, 44, 'eIF4F', C.prot2, step === 1 ? sub(p, 0, .3) : 1 - sub(p, .6, 1), 23);
        if (step >= 1 && step <= 4) {
          const o1 = step === 1 ? sub(p, .3, .6) : 1;
          eif += factor(880, 705, 106, 44, 'eIF3', C.prot3, step === 4 ? o1 * (1 - sub(p, .4, .8)) : o1, 23);
          eif += factor(SITE.P - 60, YM - 52 - 190, 170, 44, 'eIF2·GTP',   // ternair complex: eIF2·GTP houdt het Met-tRNA vast (Hinnebusch 2014)
             C.prot2, step === 3 ? o1 * (1 - sub(p, .5, .9)) : step === 4 ? 0 : o1, 23);
          eif += factor(SITE.P - 190, 705, 100, 44, 'eIF1', C.prot3, step === 3 ? o1 * (1 - sub(p, .5, .9)) : step === 4 ? 0 : o1, 23);
          if (step === 1) eif += `<g opacity="${f1(sub(p, .45, .7))}">` + txt(515, 716, T2('hulpeiwitten (eIF)', 'helper proteins (eIF)'), C.prot, 24, 'end', 800) + '</g>';
          if (step === 4) eif += factor(SITE.A + 40, 150 - 160 * (1 - ease(sub(p, 0, .6))), 146, 34, 'eIF5B·GTP', C.prot2, 1 - sub(p, .65, .9), 18);   // weg vóór het eindbeeld van de stap (geen spookpil)
        }
        if (step === 2) eif += `<path d="M${SITE.P - 180},${YM + 150} h360" stroke="${C.muted}" stroke-width="3" marker-end="url(#arrow)"/>` + txt(SITE.P, YM + 196, T2("scannen 5′→3′", "scanning 5′→3′"), C.text, 22);
        $('tl-eif').innerHTML = eif;

        // tRNA's, keten, factoren
        let tr = '', inc = '', eef = '', rf = '', pairs = '', ptc = '', abce = '';
        $('tl-eefA').setAttribute('cx', '-9999');
        // tRNA-label links naast de arm van het tRNA in de P-plaats (niet op de keten)
        const tAx = phase === 'elong' ? SITE.P - v * COD : SITE.P;
        $('tl-trnaA').setAttribute('cx', step === 0 || (step === 14 && p > .3) ? '-9999' : f1(tAx - 80)); $('tl-trnaA').setAttribute('cy', f1(YM - 52 - 90));
        let chain = '';
        const yDock = YM - 52;
        if (phase === 'init') {
          const op = step === 1 ? sub(p, .2, .6) : step === 0 ? 0 : 1;
          tr += trna(SITE.P, yDock, 0, 'M', op, step === 3);
          if (step === 3) pairs += pairLines(SITE.P, CODONS[0], sub(p, .1, .4));
        } else if (phase === 'elong') {
          // tRNA in P (codon c): draagt de keten tot de peptidebinding
          const bond = sub(u, .45, .6), shift = v * COD;
          const leave = sub(u, .85, 1);
          const pX = SITE.P - shift, aX = SITE.A - shift;
          const pUp = 0, pLeft = 0;
          const gE = trna(pX, yDock, c, null, 1, false, hexMix(TRNA_SITE.P, TRNA_SITE.E, clamp(v)));
          if (step === 9) {
            // stap 'het lege tRNA vertrekt': het tRNA komt duidelijk naar voren en naar links weg (opening tussen de subeenheden)
            // en blijft als vage schim met een pijl zichtbaar, zodat het eindbeeld toont wat er gebeurde
            const k = ease(leave), gx = pX - 250 * k, gy = yDock + 30 * k;
            tr += `<g opacity="${f1(1 - .6 * k)}" transform="translate(${f1(gx)} ${f1(gy)}) scale(${(1 + .25 * k).toFixed(3)}) translate(${-pX} ${-yDock})">${gE}</g>`;
            tr += `<g opacity="${f1(sub(p, .15, .4))}"><path d="M${f1(pX - 40)},${f1(yDock - 150)} Q${f1(pX - 150)},${f1(yDock - 230)} ${f1(pX - 250)},${f1(yDock - 175)}" stroke="#fff" stroke-width="4" fill="none" marker-end="url(#arrow)"/>` +
              txt(pX - 300, yDock - 260, T2('leeg tRNA vertrekt', 'empty tRNA leaves'), '#fff', 30, 'middle', 800) +
              txt(pX - 300, yDock - 228, T2('→ wordt opnieuw geladen', '→ will be loaded again'), C.muted, 22, 'middle', 600) + '</g>';
          } else tr += front(gE, pX, yDock, ease(leave), -60, -30);   // E-tRNA verlaat het ribosoom langs de opening tussen de subeenheden
          // binnenkomend tRNA (codon c+1)
          const arr = ease(sub(u, 0, .3));
          const ix = aX, iy = yDock, kIn = 1 - arr;               // aa-tRNA·eEF1A komt van vóór de A-plaats binnen (factorkant rechts)
          const carriesOwnAa = bond < .5;
          inc += front(trna(ix, iy, c + 1, carriesOwnAa ? AAS[c + 1] : null, 1, step === 6, hexMix(TRNA_SITE.A, TRNA_SITE.P, clamp(v))), ix, iy, kIn, 60, -30);
          const eA = u < .4 && arr > .5 ? [ix + 250, iy - 140] : u >= .62 && u < .82 ? [SITE.A + 190 - shift, 352] : [-9999, 0];
          $('tl-eefA').setAttribute('cx', f1(eA[0])); $('tl-eefA').setAttribute('cy', f1(eA[1]));
          if (u < .45) eef = front(factor(ix + 84, iy - 150, 150, 34, 'eEF1A·GTP', C.prot2, 1 - sub(u, .38, .45), 19), ix, iy, kIn, 60, -30);
          if (u >= .6 && u < .85) eef = factor(SITE.A + 70 - shift, 360, 136, 34, 'eEF2·GTP', C.prot2, sub(u, .6, .64) * (1 - sub(u, .76, .82)), 19);
          pairs += pairLines(aX, CODONS[c + 1], sub(u, .3, .38));
          if (u < .85) pairs += pairLines(pX, CODONS[c], .55);
          // keten: vóór binding aan P-tRNA (c+1 residuen), erna aan het nieuwe tRNA (c+2 residuen)
          const pAnchor = trnaPunt(pX - pLeft, yDock - pUp), aAnchor = trnaPunt(ix, iy);   // aminozuur op het CCA-uiteinde
          // de keten blijft aan een CCA-uiteinde hangen (nooit los ertussen): eerst aan het P-tRNA, na de binding aan het A-tRNA;
          // tijdens het koppelen groeit een heldere verbinding tussen beide uiteinden (de nieuwe peptidebinding)
          chain = bond < .5 ? chainSVG(pAnchor, c + 1) : chainSVG(aAnchor, c + 2);
          if (bond > 0 && bond < 1) {
            const k = ease(Math.min(1, bond * 2)), o = Math.sin(bond * Math.PI);
            chain += `<line x1="${f1(pAnchor[0])}" y1="${f1(pAnchor[1])}" x2="${f1(lerp(pAnchor[0], aAnchor[0], k))}" y2="${f1(lerp(pAnchor[1], aAnchor[1], k))}" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 7" opacity="${f1(o)}"/>`;
          }
          if (step === 7) {
            const rx = (pAnchor[0] + aAnchor[0]) / 2, ry = pAnchor[1] + 10, lo = sub(p, 0, .25);
            ptc += `<circle cx="${f1(rx)}" cy="${f1(ry)}" r="${f1(34 + 8 * Math.sin(bond * Math.PI))}" fill="none" stroke="#fff" stroke-width="2.5" opacity="${f1(.5 + .5 * Math.sin(bond * Math.PI))}"/>` +
              `<g opacity="${f1(lo)}"><line x1="${f1(rx - 36)}" y1="${f1(ry - 8)}" x2="${f1(rx - 136)}" y2="${f1(ry - 38)}" stroke="#fff" stroke-width="1.5"/>` +
              txt(rx - 142, ry - 44, T2('peptidyl-', 'peptidyl'), '#fff', 14, 'end') + txt(rx - 142, ry - 26, T2('transferasecentrum', 'transferase centre'), '#fff', 14, 'end') + '</g>';
          }
        } else {
          // terminatie: P = tRNA(c) met keten van c+1 residuen; A = stopcodon
          const rel = step === 13 ? ease(sub(p, .32, 1)) : step === 14 ? 1 : 0;
          const lv = step === 14 ? sub(p, .1, .6) : 0;
          tr += front(trna(SITE.P, yDock, c, null, 1), SITE.P, yDock, ease(lv), -60, -30);
          if (lv < .05) pairs += pairLines(SITE.P, CODONS[c], .55);   // het P-tRNA blijft op zijn codon gepaard tot het vertrekt
          const rin = step === 12 ? ease(sub(p, 0, .5)) : 1;
          const rx = SITE.A, ry = yDock;                           // eRF1·eRF3 komt net als een tRNA van vóór de A-plaats binnen
          const rop = step === 14 ? 1 - sub(p, 0, .4) : 1;
          rf = front((rop <= .01 ? '' : `<g opacity="${f1(rop)}">` + eRF1(rx, ry) + '</g>') + factor(rx + 100, ry - 170, 136, 34, 'eRF3·GTP', C.prot2, step === 12 ? sub(p, .1, .4) * (1 - sub(p, .7, .9)) : 0, 18), rx, ry, 1 - rin, 60, -30);
          $('tl-rfA').setAttribute('cx', rin > .5 && rop > .1 ? f1(rx + 150) : '-9999'); $('tl-rfA').setAttribute('cy', f1(ry - 60));
          chain = chainSVG(trnaPunt(SITE.P, yDock), c + 1, rel);
          if (step === 13) {
            // water (H₂O) komt naar de binding tussen keten en tRNA en knipt ze los
            const an = trnaPunt(SITE.P, yDock), kw = ease(sub(p, .02, .25)), wx = lerp(an[0] + 270, an[0] + 40, kw), wy = lerp(an[1] - 60, an[1] - 2, kw);
            const wOp = sub(p, .02, .1), cut = sub(p, .25, .4);
            ptc += `<g opacity="${f1(wOp)}"><circle cx="${f1(wx)}" cy="${f1(wy)}" r="30" fill="#4fb0ff" stroke="#0a1224" stroke-width="2"/>` +
              `<circle cx="${f1(wx - 24)}" cy="${f1(wy - 19)}" r="13" fill="#e8f4ff" stroke="#0a1224" stroke-width="1.5"/><circle cx="${f1(wx + 24)}" cy="${f1(wy - 19)}" r="13" fill="#e8f4ff" stroke="#0a1224" stroke-width="1.5"/>` +
              txt(wx, wy + 8, 'O', '#0a1224', 24, 'middle', 800) + '</g>';
            if (cut > 0 && cut < 1) ptc += `<circle cx="${f1(an[0] + 10)}" cy="${f1(an[1] - 6)}" r="${f1(14 + 40 * cut)}" fill="none" stroke="#fff" stroke-width="3" opacity="${f1(1 - cut)}"/>`;
            ptc += `<g opacity="${f1(sub(p, .05, .2))}">` + txt(an[0] + 260, an[1] - 160, T2('water (H₂O)', 'water (H₂O)'), '#4fb0ff', 30, 'start', 800) +
              `<g opacity="${f1(sub(p, .3, .42))}">` + txt(an[0] + 260, an[1] - 128, T2('knipt de keten los', 'cuts the chain free'), '#fff', 24, 'start', 700) + '</g></g>';
          }
          if (step === 14) abce += factor(SITE.P, 505, 110, 38, 'ABCE1', C.prot2, sub(p, .2, .45), 22);
        }
        $('tl-trnas').innerHTML = tr; $('tl-inc').innerHTML = inc; $('tl-eef').innerHTML = eef; $('tl-rf').innerHTML = rf;
        $('tl-pairs').innerHTML = pairs; $('tl-ptc').innerHTML = ptc; $('tl-abce').innerHTML = abce; $('tl-chain').innerHTML = chain;
      },
    };
  },
};
