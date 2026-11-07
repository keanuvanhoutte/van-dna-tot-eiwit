/*
 * De rode draad: hoofdstukken van de verhaallijnen (menselijke cel). Verhaal 1: route via een adenovirus; verhaal 2: een signaalmolecule.
 * Elk hoofdstuk = een scène (knoop-id). `bridge` = één zin die de overgang naar het VOLGENDE hoofdstuk uitlegt.
 * Zijtakken (replicatie, herstel, RNA-soorten, …) hangen aan deze lijn via de knoppen in de scènes en het zijpaneel.
 */
const VIRUS = [
  { id: 'cel', bridge: { nl: 'Een adenovirus hecht zich aan de cel en brengt zijn DNA binnen.', en: 'An adenovirus attaches to the cell and brings its DNA inside.' } },
  { id: 'adeno', bridge: { nl: 'Eerst moet het virus door het plasmamembraan: via endocytose.', en: 'First the virus has to cross the plasma membrane: by endocytosis.' } },
  { id: 'endocytose', bridge: { nl: 'Eenmaal in het cytosol reist het capside naar een kernporie.', en: 'Once in the cytosol the capsid travels to a nuclear pore.' } },
  { id: 'kernimport', bridge: { nl: 'Het virale DNA is in de kern, waar ook het eigen genoom van de cel ligt.', en: 'The viral DNA is now in the nucleus, home of the cell’s own genome.' } },
  { id: 'kern', bridge: { nl: 'Zoom in op het DNA: het zit verpakt in chromatine.', en: 'Zoom in on the DNA: it is packed into chromatin.' } },
  { id: 'chromatine', bridge: { nl: 'De basiseenheid van chromatine is het nucleosoom.', en: 'The basic unit of chromatin is the nucleosome.' } },
  { id: 'nucleosoom', bridge: { nl: 'Rond elk nucleosoom zit de dubbelhelix zelf.', en: 'Wrapped around each nucleosome is the double helix itself.' } },
  { id: 'dnahelix', bridge: { nl: 'Om een gen af te lezen moet het eerst aangezet worden.', en: 'To read a gene, it first has to be switched on.' } },
  { id: 'genregulatie', bridge: { nl: 'Aan de promoter wordt de transcriptiemachine opgebouwd.', en: 'The transcription machinery is assembled at the promoter.' } },
  { id: 'promoter', bridge: { nl: 'RNA-polymerase II vertrekt en schrijft het gen af naar RNA.', en: 'RNA polymerase II takes off and copies the gene into RNA.' } },
  { id: 'transcriptie', bridge: { nl: 'Het pre-mRNA wordt al tijdens de transcriptie bewerkt.', en: 'The pre-mRNA is processed while it is still being made.' } },
  { id: 'rnaprocessing', bridge: { nl: 'Het rijpe mRNA verlaat de kern.', en: 'The mature mRNA leaves the nucleus.' } },
  { id: 'export', bridge: { nl: 'In het cytosol zoekt een ribosoom het startcodon.', en: 'In the cytosol a ribosome searches for the start codon.' } },
  { id: 'initiatie', bridge: { nl: 'Het ribosoom leest nu codon na codon.', en: 'The ribosome now reads codon after codon.' } },
  { id: 'translatie', bridge: { nl: 'De nieuwe keten moet zijn 3D-vorm vinden.', en: 'The new chain has to find its 3D shape.' } },
  { id: 'vouwing', bridge: { nl: 'Eerst vormen zich lokale structuren: helices en β-bladen.', en: 'Local structures form first: helices and β-sheets.' } },
  { id: 'secundair', bridge: { nl: 'Die elementen pakken samen tot de vouwing van één keten.', en: 'Those elements pack together into the fold of one chain.' } },
  { id: 'tertiair', bridge: { nl: 'Veel eiwitten werken pas als complex van meerdere ketens.', en: 'Many proteins only work as a complex of several chains.' } },
  { id: 'quaternair', bridge: { nl: 'Na de vouwing kan het eiwit nog gemodificeerd worden.', en: 'After folding, the protein can still be modified.' } },
  { id: 'ptm', bridge: { nl: 'Elk eiwit wordt uiteindelijk ook weer afgebroken.', en: 'Every protein is eventually broken down again.' } },
  { id: 'ubiquitine', bridge: { nl: 'Einde van het hoofdverhaal. Verken nu de zijtakken via de kaart.', en: 'End of the main story. Explore the side paths via the map.' } },
];

/* Verhaallijn 2: een signaalmolecule (EGF) zet een gen aan (FOS) → het eiwit c-Fos wordt gemaakt, gevouwen en afgebroken.
 * Vanaf 'promoter' volgt ze dezelfde scènes als verhaal 1; de overgangszinnen zijn aangepast aan dit verhaal. */
const SIGNAAL = [
  { id: 'cel', bridge: { nl: 'Een groeifactor komt aan bij de cel: een signaal van buitenaf.', en: 'A growth factor arrives at the cell: a signal from outside.' } },
  { id: 'signaal', bridge: { nl: 'We volgen de groeifactor EGF: die bindt een receptortyrosinekinase.', en: 'We follow the growth factor EGF: it binds a receptor tyrosine kinase.' } },
  { id: 'rtk', bridge: { nl: 'De geactiveerde receptor zet een kinasecascade in gang.', en: 'The activated receptor sets off a kinase cascade.' } },
  { id: 'mapk', bridge: { nl: 'Actief ERK is in de kern en zet een gen aan.', en: 'Active ERK is in the nucleus and switches on a gene.' } },
  { id: 'srf', bridge: { nl: 'Aan de promoter van FOS wordt de transcriptiemachine opgebouwd.', en: 'The transcription machinery is assembled at the FOS promoter.' } },
  { id: 'promoter', bridge: { nl: 'RNA-polymerase II vertrekt en schrijft FOS af naar RNA.', en: 'RNA polymerase II takes off and copies FOS into RNA.' } },
  { id: 'transcriptie', bridge: { nl: 'Het pre-mRNA wordt al tijdens de transcriptie bewerkt.', en: 'The pre-mRNA is processed while it is still being made.' } },
  { id: 'rnaprocessing', bridge: { nl: 'Het rijpe FOS-mRNA verlaat de kern.', en: 'The mature FOS mRNA leaves the nucleus.' } },
  { id: 'export', bridge: { nl: 'In het cytosol zoekt een ribosoom het startcodon.', en: 'In the cytosol a ribosome searches for the start codon.' } },
  { id: 'initiatie', bridge: { nl: 'Het ribosoom leest nu codon na codon: c-Fos wordt gemaakt.', en: 'The ribosome now reads codon after codon: c-Fos is being made.' } },
  { id: 'translatie', bridge: { nl: 'De nieuwe keten moet zijn 3D-vorm vinden.', en: 'The new chain has to find its 3D shape.' } },
  { id: 'vouwing', bridge: { nl: 'Eerst vormen zich lokale structuren: helices en β-bladen.', en: 'Local structures form first: helices and β-sheets.' } },
  { id: 'secundair', bridge: { nl: 'Die elementen pakken samen tot de vouwing van één keten.', en: 'Those elements pack together into the fold of one chain.' } },
  { id: 'tertiair', bridge: { nl: 'c-Fos werkt pas samen met een partner (c-Jun): een complex van twee ketens.', en: 'c-Fos only works together with a partner (c-Jun): a complex of two chains.' } },
  { id: 'quaternair', bridge: { nl: 'Na de vouwing kan het eiwit nog gemodificeerd worden, o.a. door ERK zelf.', en: 'After folding the protein can still be modified, among others by ERK itself.' } },
  { id: 'ptm', bridge: { nl: 'Een signaal mag niet blijven duren: ook c-Fos wordt weer afgebroken.', en: 'A signal must not last forever: c-Fos is broken down again too.' } },
  { id: 'ubiquitine', bridge: { nl: 'Einde van verhaal 2. Verken nu de zijtakken of verhaal 1 via de kaart.', en: 'End of story 2. Now explore the side paths or story 1 via the map.' } },
];

/* Verhaallijn 3 (POC 04-11-2026): een bacteriecel (E. coli) als tweede leermodel. Zie docs/bacterie-schema.md.
 * Hergebruikt de bestaande scène 'operon'; de andere hoofdstukken zijn bacteriescènes (app/scenes/bact/). */
const BACTERIE = [
  { id: 'bcel', bridge: { nl: 'Eerst naast elkaar: hoe gaat het van gen tot eiwit bij de mens en bij deze bacterie?', en: 'First side by side: how does it go from gene to protein in humans and in this bacterium?' } },
  { id: 'vergelijk', bridge: { nl: 'Nu stap voor stap in de bacterie. Zoom in op de nucleoïd: hoe past zoveel DNA in zo’n kleine cel?', en: 'Now step by step in the bacterium. Zoom in on the nucleoid: how does so much DNA fit into such a small cell?' } },
  { id: 'bnucleoid', bridge: { nl: 'Naast het chromosoom liggen vaak kleine extra DNA-ringen: plasmiden.', en: 'Next to the chromosome there are often small extra DNA rings: plasmids.' } },
  { id: 'bplasmide', bridge: { nl: 'Zoom in op één gen: welke onderdelen heeft het?', en: 'Zoom in on one gene: what parts does it have?' } },
  { id: 'bgen', bridge: { nl: 'Het RNA-polymerase vindt de promoter met hulp van een σ-factor.', en: 'RNA polymerase finds the promoter with the help of a σ factor.' } },
  { id: 'bpol', bridge: { nl: 'Zo wordt een groep genen samen aan- en uitgezet: het lac-operon.', en: 'This is how a group of genes is switched on and off together: the lac operon.' } },
  { id: 'operon', bridge: { nl: 'Aan het einde van het operon moet het kopiëren weer stoppen.', en: 'At the end of the operon, copying has to stop again.' } },
  { id: 'bterm', bridge: { nl: 'Het mRNA is al klaar om vertaald te worden, zelfs terwijl het nog gemaakt wordt.', en: 'The mRNA is ready to be translated, even while it is still being made.' } },
  { id: 'bmrna', bridge: { nl: 'Bekijk het 70S-ribosoom en het RNA-polymerase ervoor in 3D.', en: 'See the 70S ribosome and the RNA polymerase in front of it in 3D.' } },
  { id: 'bribosoom', bridge: { nl: 'Het ribosoom leest het mRNA per drie letters: bij E. coli is de genetische code dezelfde als bij ons.', en: 'The ribosome reads the mRNA three letters at a time: in E. coli the genetic code is the same as ours.' } },
  { id: 'codon', bridge: { nl: 'De nieuwe keten moet zijn 3D-vorm vinden; dat gaat bij bacteriën net zo.', en: 'The new chain has to find its 3D shape; this works the same way in bacteria.' } },
  { id: 'vouwing', bridge: { nl: 'Soms is hulp nodig: chaperonnes zoals GroEL–GroES (een bacterieel voorbeeld).', en: 'Sometimes help is needed: chaperones such as GroEL–GroES (a bacterial example).' } },
  { id: 'chaperones', bridge: { nl: 'Eiwitten die fout of overbodig zijn, worden afgebroken, maar zonder ubiquitine.', en: 'Proteins that are faulty or no longer needed are broken down, but without ubiquitin.' } },
  { id: 'bafbraak', bridge: { nl: 'Einde van het bacterieverhaal. Verken de zijpaden (replicatie, trp-operon, introns) via de kaart.', en: 'End of the bacterial story. Explore the side paths (replication, trp operon, introns) via the map.' } },
];

/* Zijpad 1 (05-11-2026): DNA kopiëren en herstellen. Zijpaden staan in de kaart onder de hoofdverhalen (`side: true`).
 * Een zijpad wordt alleen gekozen via de startpagina of de kaart; een knop in een scène schakelt er niet automatisch naartoe. */
const HERSTEL = [
  { id: 'replicatie', bridge: { nl: 'Elke kopie begint op een startplaats die per celcyclus maar één keer mag vertrekken.', en: 'Every copy begins at a starting point that may fire only once per cell cycle.' } },
  { id: 'origins', bridge: { nl: 'Op elke startplaats vertrekt een kopieermachine die het DNA openritst en kopieert.', en: 'At each starting point a copying machine sets off that unzips and copies the DNA.' } },
  { id: 'replisoom', bridge: { nl: 'Achter de rits liggen losse strengen bloot: die moeten beschermd worden.', en: 'Behind the zipper single strands lie exposed: they need protection.' } },
  { id: 'ssdna', bridge: { nl: 'Aan de uiteinden van een chromosoom loopt het kopiëren tegen een grens aan.', en: 'At the ends of a chromosome copying runs into a limit.' } },
  { id: 'telomeren', bridge: { nl: 'Kopiëren gaat soms mis en DNA raakt ook zo beschadigd. Welke schade kan de cel herstellen?', en: 'Copying sometimes goes wrong and DNA also gets damaged. Which damage can the cell repair?' } },
  { id: 'herstel', bridge: { nl: 'We beginnen met de kopieerfouten die aan het nalezen ontsnappen.', en: 'We start with the copying errors that escape proofreading.' } },
  { id: 'mmr', bridge: { nl: 'Soms is er geen kopieerfout maar is één letter zelf beschadigd.', en: 'Sometimes there is no copying error, but one letter itself is damaged.' } },
  { id: 'ber', bridge: { nl: 'UV-licht maakt grotere schade, die het DNA vervormt.', en: 'UV light causes bigger damage that bends the DNA out of shape.' } },
  { id: 'ner', bridge: { nl: 'Een van de gevaarlijkste letsels is een breuk door beide strengen.', en: 'One of the most dangerous lesions is a break through both strands.' } },
  { id: 'dsb', bridge: { nl: 'Wie beslist of de cel eerst herstelt, of stopt? Dat doet p53.', en: 'Who decides whether the cell repairs first, or stops? That is p53.' } },
  { id: 'p53', bridge: { nl: 'Schade die niet hersteld wordt, kan een blijvende verandering worden: een mutatie.', en: 'Damage that is not repaired can become a permanent change: a mutation.' } },
  { id: 'mutaties', bridge: { nl: 'Einde van dit zijpad. Ga via de kaart terug naar een hoofdverhaal of kies een ander zijpad.', en: 'End of this side path. Use the map to return to a main story or pick another side path.' } },
];

/* Zijpad 2 (05-11-2026): waar een eiwit heen gaat en hoe het verdwijnt (eiwitsortering en -afbraak). */
const EIWITLOT = [
  { id: 'sortering', bridge: { nl: 'We volgen eerst het vettige label vooraan: dat leidt naar het ER.', en: 'First we follow the greasy label at the start: it leads to the ER.' } },
  { id: 'er', bridge: { nl: 'Niet elk ER-eiwit gaat helemaal naar binnen: sommige blijven in het membraan steken.', en: 'Not every ER protein goes all the way in: some get stuck in the membrane.' } },
  { id: 'membraan', bridge: { nl: 'Vanuit het ER reizen eiwitten verder naar het Golgi, waar ze gesorteerd worden.', en: 'From the ER proteins travel on to the Golgi, where they are sorted.' } },
  { id: 'golgi', bridge: { nl: 'In het Golgi krijgen enzymen voor het lysosoom hun eigen label.', en: 'In the Golgi, enzymes for the lysosome get their own tag.' } },
  { id: 'lysosoom', bridge: { nl: 'Een ander label stuurt eiwitten door een poort de kern in.', en: 'Another label sends proteins through a gate into the nucleus.' } },
  { id: 'kernimport', bridge: { nl: 'Het mitochondrion heeft twee membranen en een eigen manier van invoeren.', en: 'The mitochondrion has two membranes and its own way of importing.' } },
  { id: 'mito', bridge: { nl: 'Het peroxisoom doet het net andersom: het neemt eiwitten gevouwen op.', en: 'The peroxisome does it the other way round: it takes proteins in folded.' } },
  { id: 'perox', bridge: { nl: 'Elk eiwit wordt ooit afgebroken. Eerst krijgt het een afbraaklabel.', en: 'Every protein is eventually broken down. First it gets a breakdown tag.' } },
  { id: 'ubiquitine', bridge: { nl: 'Bekijk de afbraakmachine zelf in 3D.', en: 'See the breakdown machine itself in 3D.' } },
  { id: 'proteasoom', bridge: { nl: 'Grote brokken, zoals een kapot mitochondrion, passen niet in het proteasoom.', en: 'Big chunks, such as a damaged mitochondrion, do not fit in the proteasome.' } },
  { id: 'autofagie', bridge: { nl: 'Wat als eiwitten verkeerd vouwen en samenklonteren?', en: 'What if proteins fold wrongly and clump together?' } },
  { id: 'misvouwing', bridge: { nl: 'Einde van dit zijpad. Ga via de kaart terug naar een hoofdverhaal of kies een ander zijpad.', en: 'End of this side path. Use the map to return to a main story or pick another side path.' } },
];

/* Zijpad 3 (05-11-2026): hoe de cel kiest welke genen aan staan (epigenetica en 3D-genoom). */
const EPIGEN = [
  { id: 'chromatine', bridge: { nl: 'De kleinste verpakkingseenheid is het nucleosoom: DNA rond acht eiwitten.', en: 'The smallest packing unit is the nucleosome: DNA around eight proteins.' } },
  { id: 'nucleosoom', bridge: { nl: 'Een nucleosoom kan een gen afdekken. Machines kunnen het opzij schuiven.', en: 'A nucleosome can cover a gene. Machines can push it aside.' } },
  { id: 'remodeler', bridge: { nl: 'Chemische merktekens op de histonen helpen bepalen of chromatine open of dicht is.', en: 'Chemical marks on the histones help decide whether chromatin is open or closed.' } },
  { id: 'histonmod', bridge: { nl: 'Ook het DNA zelf kan een merkteken krijgen: een methylgroep.', en: 'The DNA itself can also carry a mark: a methyl group.' } },
  { id: 'dnamethyl', bridge: { nl: 'Op grotere schaal ligt het DNA in lussen en buurten.', en: 'On a larger scale the DNA lies in loops and neighbourhoods.' } },
  { id: 'lussen', bridge: { nl: 'Zo’n lus kan een verre versterker naast een gen brengen.', en: 'Such a loop can bring a distant switch next to a gene.' } },
  { id: 'enhancer', bridge: { nl: 'Soms zet de cel een heel chromosoom stil: één X bij vrouwen.', en: 'Sometimes the cell silences a whole chromosome: one X in women.' } },
  { id: 'xinact', bridge: { nl: 'Bij sommige genen telt zelfs van welke ouder je ze kreeg.', en: 'For some genes it even matters which parent you got them from.' } },
  { id: 'imprinting', bridge: { nl: 'Einde van dit zijpad. Ga via de kaart terug naar een hoofdverhaal of kies een ander zijpad.', en: 'End of this side path. Use the map to return to a main story or pick another side path.' } },
];

/* Zijpad 4 (05-11-2026): hoe een virus zichzelf laat maken (coronavirus als voorbeeld, daarna fagen en CRISPR). */
const VIRUSROUTE = [
  { id: 'virus', bridge: { nl: 'Welke weg een virus in de cel volgt, hangt af van zijn erfelijk materiaal.', en: 'Which path a virus takes in the cell depends on its genetic material.' } },
  { id: 'baltimore', bridge: { nl: 'We volgen een RNA-virus: het coronavirus. Eerst moet het aan de cel binden.', en: 'We follow an RNA virus: the coronavirus. First it has to bind to the cell.' } },
  { id: 'sleutel', bridge: { nl: 'Na het binden komt het virus binnen, aan het oppervlak of via een blaasje.', en: 'After binding, the virus gets in, at the surface or through a vesicle.' } },
  { id: 'endocytose', bridge: { nl: 'Eenmaal vrij in de cel gaat het RNA van het virus meteen aan het werk.', en: 'Once free in the cell, the RNA of the virus gets to work straight away.' } },
  { id: 'viruskopie', bridge: { nl: 'Bekijk de schaar die de lange keten knipt in 3D.', en: 'See the scissors that cut the long chain in 3D.' } },
  { id: 'schaar', bridge: { nl: 'Met de stukken en de RNA-kopieën bouwt de cel nieuwe virussen.', en: 'With the pieces and the RNA copies, the cell builds new viruses.' } },
  { id: 'assemblage', bridge: { nl: 'Ook bacteriën worden door virussen besmet.', en: 'Bacteria get infected by viruses too.' } },
  { id: 'faag', bridge: { nl: 'Bacteriën kunnen zich verdedigen, met een geheugen in hun DNA.', en: 'Bacteria can defend themselves, with a memory in their DNA.' } },
  { id: 'crispr', bridge: { nl: 'Ook mRNA werd een werktuig: verpakt in een vetbolletje, als vaccin.', en: 'mRNA became a tool too: packed in a fat droplet, as a vaccine.' } },
  { id: 'lnp', bridge: { nl: 'Einde van dit zijpad. Ga via de kaart terug naar een hoofdverhaal of kies een ander zijpad.', en: 'End of this side path. Use the map to return to a main story or pick another side path.' } },
];

/* Zijpad 5 (05-11-2026): het leven van een RNA na de kern — waarheen, pauze, afbraak, RNA's zonder eiwit, RNA als schakelaar. */
const RNALOT = [
  { id: 'export', bridge: { nl: 'Sommige mRNA’s reizen eerst naar een vaste plek in de cel.', en: 'Some mRNAs first travel to a fixed place in the cell.' } },
  { id: 'lokalisatie', bridge: { nl: 'Onder stress houdt de cel haar mRNA’s even apart, in druppels.', en: 'Under stress the cell briefly keeps its mRNAs apart, in droplets.' } },
  { id: 'korrels', bridge: { nl: 'Elk mRNA wordt uiteindelijk afgebroken.', en: 'Every mRNA is eventually broken down.' } },
  { id: 'mrnaafbraak', bridge: { nl: 'Een fout mRNA wordt extra snel opgeruimd.', en: 'A faulty mRNA is cleared away extra fast.' } },
  { id: 'nmd', bridge: { nl: 'Kleine RNA’s kunnen een mRNA ook remmen of laten knippen.', en: 'Small RNAs can also repress an mRNA or have it cut.' } },
  { id: 'rnai', bridge: { nl: 'Er zijn ook lange RNA’s die nooit eiwit worden.', en: 'There are also long RNAs that never become protein.' } },
  { id: 'lncrna', bridge: { nl: 'Wat een RNA doet, hangt vaak af van hoe het zich vouwt.', en: 'What an RNA does often depends on how it folds.' } },
  { id: 'rnastructuur', bridge: { nl: 'Een gevouwen RNA kan zelfs als schakelaar werken.', en: 'A folded RNA can even work as a switch.' } },
  { id: 'riboswitch', bridge: { nl: 'Einde van dit zijpad. Ga via de kaart terug naar een hoofdverhaal of kies een ander zijpad.', en: 'End of this side path. Use the map to return to a main story or pick another side path.' } },
];

/* Alle verhaallijnen. De engine kiest er één (?story=… of de laatst gekozen) en kan wisselen.
 * from: hoofdstuk van verhaal 1 waar een zijpad op aansluit (getoond op de startpagina).
 * side: true = zijpad (in de kaart apart gegroepeerd; geen automatische overschakeling vanuit een andere lijn). */
export const LINES = {
  virus: { chapters: VIRUS, title: { nl: 'Verhaal 1 · Een virus brengt DNA binnen', en: 'Story 1 · A virus brings in DNA' }, short: { nl: 'Verhaal 1', en: 'Story 1' } },
  signaal: { chapters: SIGNAAL, title: { nl: 'Verhaal 2 · Een signaal zet een gen aan', en: 'Story 2 · A signal switches on a gene' }, short: { nl: 'Verhaal 2', en: 'Story 2' } },
  bacterie: { chapters: BACTERIE, title: { nl: 'Bacterie · Van DNA tot eiwit in E. coli', en: 'Bacterium · From DNA to protein in E. coli' }, short: { nl: 'Bacterie', en: 'Bacterium' } },
  herstel: { chapters: HERSTEL, side: true, from: 'dnahelix', title: { nl: 'Zijpad · DNA kopiëren en herstellen', en: 'Side path · Copying and repairing DNA' }, short: { nl: 'Zijpad replicatie', en: 'Side path replication' } },
  targeting: { chapters: EIWITLOT, side: true, from: 'translatie', title: { nl: 'Zijpad · Waar een eiwit heen gaat en hoe het verdwijnt', en: 'Side path · Where a protein goes and how it is removed' }, short: { nl: 'Zijpad eiwitlot', en: 'Side path protein fate' } },
  epigen: { chapters: EPIGEN, side: true, from: 'chromatine', title: { nl: 'Zijpad · Hoe de cel kiest welke genen aan staan', en: 'Side path · How a cell chooses which genes are on' }, short: { nl: 'Zijpad epigenetica', en: 'Side path epigenetics' } },
  virusroute: { chapters: VIRUSROUTE, side: true, from: 'adeno', title: { nl: 'Zijpad · Hoe een virus zichzelf laat maken', en: 'Side path · How a virus gets itself made' }, short: { nl: 'Zijpad virussen', en: 'Side path viruses' } },
  rnalot: { chapters: RNALOT, side: true, from: 'export', title: { nl: 'Zijpad · Het leven van een RNA', en: 'Side path · The life of an RNA' }, short: { nl: 'Zijpad RNA-lot', en: 'Side path RNA fate' } },
};
export const LINE_KEYS = Object.keys(LINES);
export const MAIN_KEYS = LINE_KEYS.filter(k => !LINES[k].side), SIDE_KEYS = LINE_KEYS.filter(k => LINES[k].side);
/* standaardlijn (voor oudere code en tools) */
export const STORY = VIRUS;
export const STORY_IDS = STORY.map(c => c.id);
