/*
 * De rode draad: hoofdstukken van de verhaallijnen (menselijke cel). Verhaal 1: route via een adenovirus; verhaal 2: een signaalmolecule.
 * Elk hoofdstuk = een scène (knoop-id).
 *   bridge = één zin over het VOLGENDE hoofdstuk; komt niet in beeld, enkel als tooltip bij de knop "Volgend: …".
 *   waar   = waar in de cel dit hoofdstuk zich afspeelt (getoond in de verhaalbalk links).
 * Zijtakken (replicatie, herstel, RNA-soorten, …) hangen aan deze lijn via de knoppen in de scènes en het zijpaneel.
 * De verpakking van het DNA (kernoverzicht, chromatine, nucleosoom, dubbelhelix) zit niet in deze lijn: dat onderbreekt het verhaal van
 * het virus. Je komt er via "uitzoomen", de kaart of het zijpad epigenetica.
 */
const BUITEN = { nl: 'buiten de cel', en: 'outside the cell' }, CYTO = { nl: 'in het cytosol', en: 'in the cytosol' },
  KERN = { nl: 'in de celkern', en: 'in the nucleus' }, WAND = { nl: 'aan de celwand', en: 'at the cell surface' },
  PORIE = { nl: 'aan de kernporie', en: 'at the nuclear pore' }, ER = { nl: 'in het ER', en: 'in the ER' },
  GOLGI = { nl: 'Golgi → celmembraan', en: 'Golgi → cell membrane' };
const VIRUS = [
  { id: 'cel', waar: BUITEN,
    bridge: { nl: 'Een adenovirus hecht zich aan de cel en brengt zijn DNA binnen.', en: 'An adenovirus attaches to the cell and brings its DNA inside.' } },
  { id: 'adeno', waar: WAND,
    bridge: { nl: 'Eerst moet het virus door het plasmamembraan: via endocytose.', en: 'First the virus has to cross the plasma membrane: by endocytosis.' } },
  { id: 'endocytose', waar: WAND,
    bridge: { nl: 'Eenmaal in het cytosol reist het capside naar een kernporie.', en: 'Once in the cytosol the capsid travels to a nuclear pore.' } },
  { id: 'kernimport', waar: PORIE,
    bridge: { nl: 'Het virus-DNA ligt in de kern. Om er iets mee te doen, moet een gen eerst aangezet worden.', en: 'The viral DNA is in the nucleus. To do anything with it, a gene first has to be switched on.' } },
  { id: 'genregulatie', waar: KERN,
    bridge: { nl: 'Aan de promoter wordt de transcriptiemachine opgebouwd.', en: 'The transcription machinery is assembled at the promoter.' } },
  { id: 'promoter', waar: KERN,
    bridge: { nl: 'RNA-polymerase II vertrekt en schrijft het gen af naar RNA.', en: 'RNA polymerase II takes off and copies the gene into RNA.' } },
  { id: 'transcriptie', waar: KERN,
    bridge: { nl: 'Het pre-mRNA wordt al tijdens de transcriptie bewerkt.', en: 'The pre-mRNA is processed while it is still being made.' } },
  { id: 'rnaprocessing', waar: KERN,
    bridge: { nl: 'Het rijpe mRNA verlaat de kern.', en: 'The mature mRNA leaves the nucleus.' } },
  { id: 'export', waar: PORIE,
    bridge: { nl: 'In het cytosol zoekt een ribosoom het startcodon.', en: 'In the cytosol a ribosome searches for the start codon.' } },
  { id: 'initiatie', waar: CYTO,
    bridge: { nl: 'Het ribosoom leest nu codon na codon.', en: 'The ribosome now reads codon after codon.' } },
  { id: 'translatie', waar: CYTO,
    bridge: { nl: 'De nieuwe keten moet zijn 3D-vorm vinden.', en: 'The new chain has to find its 3D shape.' } },
  { id: 'vouwing', waar: CYTO,
    bridge: { nl: 'De eerste bouwlaag van die vorm: lokale structuren zoals helices en β-bladen.', en: 'The first level of that shape: local structures such as helices and β-sheets.' } },
  { id: 'secundair', waar: CYTO,
    bridge: { nl: 'Die elementen pakken samen tot de vouwing van één keten.', en: 'Those elements pack together into the fold of one chain.' } },
  { id: 'tertiair', waar: CYTO,
    bridge: { nl: 'Veel eiwitten werken pas als complex van meerdere ketens.', en: 'Many proteins only work as a complex of several chains.' } },
  { id: 'quaternair', waar: CYTO,
    bridge: { nl: 'Na de vouwing kan het eiwit nog gemodificeerd worden.', en: 'After folding, the protein can still be modified.' } },
  { id: 'ptm', waar: CYTO,
    bridge: { nl: 'Veel eiwitten blijven in het cytosol. Eiwitten die de cel uit moeten, gaan al tijdens hun aanmaak het ER in.', en: 'Many proteins stay in the cytosol. Proteins that must leave the cell already enter the ER while they are being made.' } },
  /* 28-11-2026: de weg naar buiten (secretie) hoort in het hoofdverhaal, niet enkel in het zijpad eiwitlot */
  { id: 'er', waar: ER,
    bridge: { nl: 'Vanuit het ER reizen eiwitten in blaasjes via het Golgi-apparaat naar buiten.', en: 'From the ER, proteins travel in vesicles via the Golgi apparatus to the outside.' } },
  { id: 'golgi', waar: GOLGI,
    bridge: { nl: 'Bijna elk eiwit wordt uiteindelijk ook weer afgebroken.', en: 'Almost every protein is eventually broken down again.' } },
  { id: 'ubiquitine', waar: CYTO,
    bridge: { nl: 'Einde van het hoofdverhaal. Verken nu de zijtakken via de kaart.', en: 'End of the main story. Explore the side paths via the map.' } },
];

/* Verhaallijn 2: een signaalmolecule (EGF) zet een gen aan (FOS) → het eiwit c-Fos wordt gemaakt, gevouwen en afgebroken.
 * Vanaf 'promoter' volgt ze dezelfde scènes als verhaal 1; de overgangszinnen zijn aangepast aan dit verhaal. */
const SIGNAAL = [
  { id: 'cel', waar: BUITEN,
    bridge: { nl: 'Een groeifactor komt aan bij de cel: een signaal van buitenaf.', en: 'A growth factor arrives at the cell: a signal from outside.' } },
  { id: 'signaal', waar: BUITEN,
    bridge: { nl: 'We volgen de groeifactor EGF: die bindt een receptortyrosinekinase.', en: 'We follow the growth factor EGF: it binds a receptor tyrosine kinase.' } },
  { id: 'rtk', waar: WAND,
    bridge: { nl: 'De geactiveerde receptor zet een kinasecascade in gang.', en: 'The activated receptor sets off a kinase cascade.' } },
  { id: 'mapk', waar: CYTO,
    bridge: { nl: 'Actief ERK is in de kern en helpt een gen aanzetten.', en: 'Active ERK is in the nucleus and helps switch on a gene.' } },
  { id: 'srf', waar: KERN,
    bridge: { nl: 'Aan de promoter van FOS wordt de transcriptiemachine opgebouwd.', en: 'The transcription machinery is assembled at the FOS promoter.' } },
  { id: 'promoter', waar: KERN,
    bridge: { nl: 'RNA-polymerase II vertrekt en schrijft FOS af naar RNA.', en: 'RNA polymerase II takes off and copies FOS into RNA.' } },
  { id: 'transcriptie', waar: KERN,
    bridge: { nl: 'Het pre-mRNA wordt al tijdens de transcriptie bewerkt.', en: 'The pre-mRNA is processed while it is still being made.' } },
  { id: 'rnaprocessing', waar: KERN,
    bridge: { nl: 'Het rijpe FOS-mRNA verlaat de kern.', en: 'The mature FOS mRNA leaves the nucleus.' } },
  { id: 'export', waar: PORIE,
    bridge: { nl: 'In het cytosol zoekt een ribosoom het startcodon.', en: 'In the cytosol a ribosome searches for the start codon.' } },
  { id: 'initiatie', waar: CYTO,
    bridge: { nl: 'Het ribosoom leest nu codon na codon: c-Fos wordt gemaakt.', en: 'The ribosome now reads codon after codon: c-Fos is being made.' } },
  { id: 'translatie', waar: CYTO,
    bridge: { nl: 'De nieuwe keten moet zijn 3D-vorm vinden.', en: 'The new chain has to find its 3D shape.' } },
  { id: 'vouwing', waar: CYTO,
    bridge: { nl: 'De eerste bouwlaag van die vorm: lokale structuren zoals helices en β-bladen.', en: 'The first level of that shape: local structures such as helices and β-sheets.' } },
  { id: 'secundair', waar: CYTO,
    bridge: { nl: 'Die elementen pakken samen tot de vouwing van één keten.', en: 'Those elements pack together into the fold of one chain.' } },
  { id: 'tertiair', waar: CYTO,
    bridge: { nl: 'c-Fos werkt samen met een partner, zoals c-Jun: een complex van twee ketens.', en: 'c-Fos works together with a partner, such as c-Jun: a complex of two chains.' } },
  { id: 'quaternair', waar: CYTO,
    bridge: { nl: 'Na de vouwing kan het eiwit nog gemodificeerd worden, o.a. door ERK zelf.', en: 'After folding the protein can still be modified, among others by ERK itself.' } },
  { id: 'ptm', waar: CYTO,
    bridge: { nl: 'Een signaal mag niet blijven duren: ook c-Fos wordt weer afgebroken.', en: 'A signal must not last forever: c-Fos is broken down again too.' } },
  { id: 'ubiquitine', waar: CYTO,
    bridge: { nl: 'Einde van verhaal 2. Verken nu de zijtakken of verhaal 1 via de kaart.', en: 'End of story 2. Now explore the side paths or story 1 via the map.' } },
];

/* Verhaallijn 3 (POC 04-11-2026): een bacteriecel (E. coli) als tweede leermodel. Zie docs/bacterie-schema.md.
 * Hergebruikt de bestaande scène 'operon'; de andere hoofdstukken zijn bacteriescènes (app/scenes/bact/). */
const BACTERIE = [
  { id: 'bcel', bridge: { nl: 'Eerst naast elkaar: hoe gaat het van gen tot eiwit bij de mens en bij deze bacterie?', en: 'First side by side: how does it go from gene to protein in humans and in this bacterium?' } },
  { id: 'vergelijk', bridge: { nl: 'Nu stap voor stap in de bacterie. Zoom in op de nucleoïd: hoe past zoveel DNA in zo’n kleine cel?', en: 'Now step by step in the bacterium. Zoom in on the nucleoid: how does so much DNA fit into such a small cell?' } },
  { id: 'bnucleoid', bridge: { nl: 'Naast het chromosoom liggen vaak kleine extra DNA-ringen: plasmiden.', en: 'Next to the chromosome there are often small extra DNA rings: plasmids.' } },
  { id: 'bplasmide', bridge: { nl: 'Zoom in op één gen: welke onderdelen heeft het?', en: 'Zoom in on one gene: what parts does it have?' } },
  { id: 'bgen', bridge: { nl: 'Het RNA-polymerase vindt de promoter met hulp van een σ-factor.', en: 'RNA polymerase finds the promoter with the help of a σ factor.' } },
  { id: 'bpol', bridge: { nl: 'Soms wordt een groep genen samen aan- en uitgezet: het lac-operon.', en: 'Sometimes a group of genes is switched on and off together: the lac operon.' } },
  { id: 'operon', bridge: { nl: 'Aan het einde van het operon moet het afschrijven naar RNA weer stoppen.', en: 'At the end of the operon, copying into RNA has to stop again.' } },
  { id: 'bterm', bridge: { nl: 'Het mRNA is al klaar om vertaald te worden, zelfs terwijl het nog gemaakt wordt.', en: 'The mRNA is ready to be translated, even while it is still being made.' } },
  { id: 'bmrna', bridge: { nl: 'Bekijk het 70S-ribosoom en het RNA-polymerase ervoor in 3D.', en: 'See the 70S ribosome and the RNA polymerase in front of it in 3D.' } },
  { id: 'bribosoom', bridge: { nl: 'Hoe komt elk nieuw tRNA bij het ribosoom? Een helper, EF-Tu, brengt het. Bekijk het in 3D.', en: 'How does each new tRNA reach the ribosome? A helper, EF-Tu, brings it. See it in 3D.' } },
  { id: 'beftu', bridge: { nl: 'Het ribosoom leest het mRNA per drie letters: bij E. coli is de genetische code dezelfde als bij ons.', en: 'The ribosome reads the mRNA three letters at a time: in E. coli the genetic code is the same as ours.' } },
  { id: 'codon', bridge: { nl: 'De nieuwe keten moet zijn 3D-vorm vinden; dat gaat bij bacteriën net zo.', en: 'The new chain has to find its 3D shape; this works the same way in bacteria.' } },
  { id: 'vouwing', bridge: { nl: 'Soms is hulp nodig: chaperonnes zoals GroEL–GroES (een bacterieel voorbeeld).', en: 'Sometimes help is needed: chaperones such as GroEL–GroES (a bacterial example).' } },
  { id: 'chaperones', bridge: { nl: 'Veel eiwitten blijven in het cytoplasma, maar sommige moeten de cel uit. Hoe raken ze door twee membranen?', en: 'Many proteins stay in the cytoplasm, but some have to leave the cell. How do they get through two membranes?' } },
  { id: 'bsecretie', bridge: { nl: 'Eiwitten die fout of overbodig zijn, worden afgebroken, maar zonder ubiquitine.', en: 'Proteins that are faulty or no longer needed are broken down, but without ubiquitin.' } },
  { id: 'bafbraak', bridge: { nl: 'Einde van het bacterieverhaal. Verken de zijpaden (antibiotica, replicatie, trp-operon, introns) via de kaart.', en: 'End of the bacterial story. Explore the side paths (antibiotics, replication, trp operon, introns) via the map.' } },
];

/* Zijpad 6 (14-11-2026): hoe antibiotica een bacterie stilleggen en hoe bacteriën zich verweren (verificatieronde 12). */
const ANTIBIOTICA = [
  { id: 'bcel', bridge: { nl: 'Antibiotica maken gebruik van wat een bacterie anders doet dan wij. Waar grijpen ze aan?', en: 'Antibiotics exploit what a bacterium does differently from us. Where do they strike?' } },
  { id: 'antibiotica', bridge: { nl: 'Eerst het RNA-polymerase: bekijk rifampicine in een echte 3D-structuur.', en: 'First RNA polymerase: see rifampicin in a real 3D structure.' } },
  { id: 'rifampicine', bridge: { nl: 'Het ribosoom is het doelwit van nog meer antibiotica.', en: 'The ribosome is the target of even more antibiotics.' } },
  { id: 'ribosoomremmers', bridge: { nl: 'Kirromycine zet de helper EF-Tu vast. Dat moment is in 3D vastgelegd.', en: 'Kirromycin locks the helper EF-Tu. That moment was captured in 3D.' } },
  { id: 'beftu', bridge: { nl: 'Andere antibiotica mikken op een enzym dat het DNA ontspant: ze zetten gyrase vast op het DNA.', en: 'Other antibiotics target an enzyme that relaxes the DNA: they lock gyrase onto the DNA.' } },
  { id: 'gyraseremmers', bridge: { nl: 'Bacteriën verweren zich. Hoe worden ze resistent?', en: 'Bacteria fight back. How do they become resistant?' } },
  { id: 'resistentie', bridge: { nl: 'Einde van dit zijpad. Ga via de kaart terug naar een hoofdverhaal of kies een ander zijpad.', en: 'End of this side path. Use the map to return to a main story or pick another side path.' } },
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
  { id: 'dsb', bridge: { nl: 'Wie helpt beslissen of de cel eerst herstelt, of stopt? Een sleutelrol speelt p53.', en: 'Who helps decide whether the cell repairs first, or stops? A key role is played by p53.' } },
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
  { id: 'perox', bridge: { nl: 'Bijna elk eiwit wordt ooit afgebroken. Vaak krijgt het eerst een afbraaklabel.', en: 'Almost every protein is eventually broken down. Often it first gets a breakdown tag.' } },
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
  { id: 'lussen', bridge: { nl: 'Zo’n lus kan een verre versterker (enhancer) naast een gen brengen.', en: 'Such a loop can bring a distant booster (enhancer) next to a gene.' } },
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
  { id: 'lokalisatie', bridge: { nl: 'Onder stress houdt de cel een deel van haar mRNA’s even apart, in druppels.', en: 'Under stress the cell briefly keeps some of its mRNAs apart, in droplets.' } },
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
  herstel: { chapters: HERSTEL, side: true, from: 'genregulatie', title: { nl: 'Zijpad · DNA kopiëren en herstellen', en: 'Side path · Copying and repairing DNA' }, short: { nl: 'Zijpad replicatie', en: 'Side path replication' } },
  targeting: { chapters: EIWITLOT, side: true, from: 'translatie', title: { nl: 'Zijpad · Waar een eiwit heen gaat en hoe het verdwijnt', en: 'Side path · Where a protein goes and how it is removed' }, short: { nl: 'Zijpad eiwitlot', en: 'Side path protein fate' } },
  epigen: { chapters: EPIGEN, side: true, from: 'genregulatie', title: { nl: 'Zijpad · Hoe de cel kiest welke genen aan staan', en: 'Side path · How a cell chooses which genes are on' }, short: { nl: 'Zijpad epigenetica', en: 'Side path epigenetics' } },
  virusroute: { chapters: VIRUSROUTE, side: true, from: 'adeno', title: { nl: 'Zijpad · Hoe een virus zichzelf laat maken', en: 'Side path · How a virus gets itself made' }, short: { nl: 'Zijpad virussen', en: 'Side path viruses' } },
  rnalot: { chapters: RNALOT, side: true, from: 'export', title: { nl: 'Zijpad · Het leven van een RNA', en: 'Side path · The life of an RNA' }, short: { nl: 'Zijpad RNA-lot', en: 'Side path RNA fate' } },
  antibiotica: { chapters: ANTIBIOTICA, side: true, from: 'bcel', title: { nl: 'Zijpad · Hoe antibiotica bacteriën stilleggen', en: 'Side path · How antibiotics stop bacteria' }, short: { nl: 'Zijpad antibiotica', en: 'Side path antibiotics' } },
};
export const LINE_KEYS = Object.keys(LINES);
export const MAIN_KEYS = LINE_KEYS.filter(k => !LINES[k].side), SIDE_KEYS = LINE_KEYS.filter(k => LINES[k].side);
/* standaardlijn (voor oudere code en tools) */
export const STORY = VIRUS;
export const STORY_IDS = STORY.map(c => c.id);
