/* Eenvoudige laag voor de atlas (deel 3). */
export const SIMPLE = {
  snrna: {
    title: { nl: 'RNA wijst de knipplaats aan (snRNA)', en: 'RNA marks the cutting site (snRNA)' },
    sub: { nl: 'Klein RNA + eiwitten in de knipmachine', en: 'Small RNA + proteins in the cutting machine' },
    kort: {
      nl: 'Een RNA-kopie van een gen bevat stukken die niet in het eiwit horen. Die knipt het [[spliceosoom|spliceosoom]] eruit. Dit kleine RNA zoekt het begin van zo’n stuk ([[intron|intron]]) op: het past erop als een puzzelstuk.',
      en: 'An RNA copy of a gene contains pieces that do not belong in the protein. The [[spliceosome|spliceosoom]] cuts them out. This small RNA finds the start of such a piece ([[intron|intron]]): it fits onto it like a puzzle piece.' },
    look: {
      nl: 'Oranje: het kleine RNA en een kort stukje RNA dat het begin van een intron nabootst; waar ze tegen elkaar liggen, vormen ze basenparen. Paars: de eiwitten; zeven ervan vormen samen een ring rond het RNA.',
      en: 'Orange: the small RNA and a short piece of RNA that mimics the start of an intron; where they meet, they form base pairs. Purple: the proteins; seven of them form a ring around the RNA.' },
    why: {
      nl: 'Zonder deze herkenning kan de cel de overbodige stukken niet uit het RNA knippen. Dit gebeurt bij elk intron, in de celkern.',
      en: 'Without this recognition the cell cannot cut the unneeded pieces out of the RNA. It happens at every intron, in the nucleus.' },
    facts: [
      [{ nl: 'Wat is het?', en: 'What is it?' }, { nl: 'Klein RNA samen met eiwitten', en: 'A small RNA together with proteins' }],
      [{ nl: 'Wat doet het?', en: 'What does it do?' }, { nl: 'Herkent het begin van elk intron', en: 'Recognises the start of every intron' }],
      [{ nl: 'Deel van', en: 'Part of' }, { nl: 'Het spliceosoom (de knipmachine van RNA)', en: 'The spliceosome (the RNA cutting machine)' }],
      [{ nl: 'Lengte zulke RNA’s', en: 'Length of such RNAs' }, { nl: 'Ongeveer 100–190 letters (nucleotiden)', en: 'About 100–190 letters (nucleotides)' }],
      [{ nl: 'Waar in de cel', en: 'Where in the cell' }, { nl: 'In de celkern', en: 'In the nucleus' }],
    ],
  },

  nucleosome: {
    title: { nl: 'DNA rond een eiwitklosje (nucleosoom)', en: 'DNA around a protein spool (nucleosome)' },
    sub: { nl: 'Zo wordt DNA opgerold en verpakt', en: 'How DNA is wound up and packed' },
    kort: {
      nl: 'Het DNA in je cellen is heel lang en moet netjes opgeborgen worden. Daarom wikkelt het zich, zoals draad rond een klosje, bijna twee keer rond een bolletje van acht [[histonen|histon]]. Een rij van zulke klosjes vormt [[chromatine|chromatine]].',
      en: 'The DNA in your cells is very long and has to be stored neatly. So it wraps, like thread around a spool, almost twice around a little ball of eight [[histones|histon]]. A row of such spools forms [[chromatin|chromatine]].' },
    look: {
      nl: 'Blauw: het DNA, dat sterk gebogen rond het eiwitblok ligt. Grijs: de acht histonen in het midden; hun losse staartjes steken naar buiten.',
      en: 'Blue: the DNA, strongly bent around the protein block. Grey: the eight histones in the middle; their loose tails stick out.' },
    why: {
      nl: 'Hoe het DNA rond de klosjes ligt, bepaalt of de cel een gen kan aflezen. Merktekens op de histonstaartjes regelen dat mee.',
      en: 'How the DNA sits on the spools decides whether the cell can read a gene. Marks on the histone tails help control this.' },
    facts: [
      [{ nl: 'Wat is het?', en: 'What is it?' }, { nl: 'De kleinste verpakkingseenheid van DNA', en: 'The smallest packing unit of DNA' }],
      [{ nl: 'DNA per klosje', en: 'DNA per spool' }, { nl: '147 basenparen, bijna 2 keer rondgewikkeld', en: '147 base pairs, wrapped almost twice' }],
      [{ nl: 'Gemaakt van', en: 'Made of' }, { nl: '8 histonen: 2× H2A, H2B, H3 en H4', en: '8 histones: 2× H2A, H2B, H3 and H4' }],
      [{ nl: 'Hoe vaak?', en: 'How often?' }, { nl: 'Ongeveer om de 200 basenparen', en: 'About every 200 base pairs' }],
      [{ nl: 'Waar in de cel', en: 'Where in the cell' }, { nl: 'In de celkern, in alle chromosomen', en: 'In the nucleus, in all chromosomes' }],
    ],
  },

  ssdna: {
    title: { nl: 'Eiwit beschermt enkelstrengig DNA (RPA)', en: 'Protein shields single-stranded DNA (RPA)' },
    sub: { nl: 'Eén DNA-streng, bedekt door een beschermeiwit', en: 'One DNA strand, coated by a guard protein' },
    kort: {
      nl: 'Als DNA gekopieerd of hersteld wordt, gaat de ladder even open. Eén losse streng is slap en kwetsbaar. Het beschermeiwit RPA legt zich er meteen op, zoals plakband over een losse draad.',
      en: 'When DNA is copied or repaired, the ladder opens for a while. A single loose strand is floppy and fragile. The guard protein RPA covers it at once, like tape over a loose wire.' },
    look: {
      nl: 'Blauw: een kort stukje DNA met maar één streng (8 letters C), gestrekt in een groef van het eiwit. Paars: het eiwit; de basen liggen niet tegen elkaar maar tegen delen van het eiwit.',
      en: 'Blue: a short piece of DNA with only one strand (8 letters C), stretched out in a groove of the protein. Purple: the protein; the bases rest against parts of the protein instead of against each other.' },
    why: {
      nl: 'Zo blijft de losse streng heel tot ze weer gekopieerd of hersteld is. Een streng vol RPA werkt ook als alarmsignaal in de cel.',
      en: 'This keeps the loose strand intact until it is copied or repaired. A strand covered in RPA also works as an alarm signal in the cell.' },
    facts: [
      [{ nl: 'Wat is het?', en: 'What is it?' }, { nl: 'Eén losse DNA-streng met een beschermeiwit', en: 'A single DNA strand with a guard protein' }],
      [{ nl: 'Basenparen?', en: 'Base pairs?' }, { nl: 'Nee: er is geen tweede streng', en: 'No: there is no second strand' }],
      [{ nl: 'Wanneer?', en: 'When?' }, { nl: 'Bij het kopiëren en herstellen van DNA', en: 'When DNA is copied and repaired' }],
      [{ nl: 'Beschermeiwit', en: 'Guard protein' }, { nl: 'RPA (replicatie-eiwit A), uit 3 delen', en: 'RPA (replication protein A), made of 3 parts' }],
      [{ nl: 'In dit model', en: 'In this model' }, { nl: 'De 2 DNA-grijpers van het grootste RPA-deel', en: 'The 2 DNA grippers of the largest RPA part' }],
    ],
  },

  mrna: {
    title: { nl: 'De boodschap voor een eiwit (mRNA)', en: 'The message for a protein (mRNA)' },
    sub: { nl: 'Opbouw van een afgewerkt boodschapper-RNA', en: 'Layout of a finished messenger RNA' },
    kort: {
      nl: 'mRNA is een werkkopie van één gen. Het [[ribosoom|ribosoom]] leest het middenstuk en maakt er een eiwit van. Vooraan zit een beschermkapje ([[cap|cap]]), achteraan een lange staart van A’s; samen beschermen ze het mRNA en helpen ze bij het aflezen.',
      en: 'mRNA is a working copy of one gene. The [[ribosome|ribosoom]] reads the middle part and makes a protein from it. At the front sits a protective [[cap|cap]], at the back a long tail of A’s; together they protect the mRNA and help it get read.' },
    look: {
      nl: 'Het schema leest van links (begin) naar rechts (einde): het kapje, een stuk dat niet vertaald wordt, het middenstuk met de code voor het eiwit (van AUG tot stop), weer een stuk dat niet vertaald wordt, en de A-staart.',
      en: 'The diagram reads from left (start) to right (end): the cap, a part that is not translated, the middle part with the code for the protein (from AUG to stop), another part that is not translated, and the A tail.' },
    why: {
      nl: 'Zonder mRNA kan de cel geen enkel eiwit maken. mRNA-vaccins bootsen precies deze opbouw na.',
      en: 'Without mRNA the cell cannot make a single protein. mRNA vaccines copy exactly this layout.' },
    facts: [
      [{ nl: 'Wat is het?', en: 'What is it?' }, { nl: 'Een RNA-werkkopie van één gen', en: 'An RNA working copy of one gene' }],
      [{ nl: 'Gemaakt in', en: 'Made in' }, { nl: 'De celkern; daarna gaat het de kern uit', en: 'The nucleus; then it leaves the nucleus' }],
      [{ nl: 'Gelezen door', en: 'Read by' }, { nl: 'Het ribosoom, telkens 3 letters (codon)', en: 'The ribosome, 3 letters at a time (codon)' }],
      [{ nl: 'Code voor het eiwit', en: 'Code for the protein' }, { nl: 'Van startcodon AUG tot een stopcodon', en: 'From start codon AUG to a stop codon' }],
      [{ nl: 'A-staart', en: 'A tail' }, { nl: '~200–250 A’s, wordt later stilaan korter', en: '~200–250 A’s, slowly gets shorter later' }],
    ],
  },

  premrna: {
    title: { nl: 'Ruwe RNA-kopie vóór knippen (pre-mRNA)', en: 'Raw RNA copy before cutting (pre-mRNA)' },
    sub: { nl: 'Wat blijft (exon) en wat weg moet (intron)', en: 'What stays (exon) and what goes (intron)' },
    kort: {
      nl: 'Een gen wordt eerst volledig naar RNA overgeschreven, ook de stukken die niet in het eiwit horen. De stukken die blijven heten [[exonen|exon]], de stukken die eruit geknipt worden [[intronen|intron]]. Daarna worden de exonen aan elkaar geplakt, zoals bij het monteren van een film.',
      en: 'A gene is first copied into RNA in full, including the pieces that do not belong in the protein. The pieces that stay are called [[exons|exon]], the pieces that are cut out [[introns|intron]]. Then the exons are joined together, like editing a film.' },
    look: {
      nl: 'Bovenaan de ruwe kopie: oranje exonen met bruine intronen ertussen; gekleurde letters tonen waar het intron begint (GU) en eindigt (AG). Onderaan het afgewerkte mRNA met enkel de exonen, en het weggeknipte intron als een lusje.',
      en: 'At the top the raw copy: orange exons with brown introns in between; coloured letters show where the intron starts (GU) and ends (AG). At the bottom the finished mRNA with only the exons, and the cut-out intron as a small loop.' },
    why: {
      nl: 'Door telkens andere exonen te combineren, kan één gen voor meerdere eiwitten zorgen. Dat gebeurt bij meer dan 90% van de menselijke genen met meerdere exonen.',
      en: 'By combining different exons, one gene can give several proteins. This happens in more than 90% of human genes with several exons.' },
    facts: [
      [{ nl: 'Wat is het?', en: 'What is it?' }, { nl: 'De eerste, ruwe RNA-kopie van een gen', en: 'The first, raw RNA copy of a gene' }],
      [{ nl: 'Waar in de cel', en: 'Where in the cell' }, { nl: 'In de celkern, meestal al tijdens het kopiëren', en: 'In the nucleus, mostly while it is being made' }],
      [{ nl: 'Knipmachine', en: 'Cutting machine' }, { nl: 'Het spliceosoom (RNA’s + meer dan 100 eiwitten)', en: 'The spliceosome (RNAs + more than 100 proteins)' }],
      [{ nl: 'Intron begint/eindigt', en: 'Intron starts/ends' }, { nl: 'Bijna altijd met GU … en eindigt op AG', en: 'Almost always starts with GU … ends with AG' }],
      [{ nl: 'Gemiddeld mensengen', en: 'Average human gene' }, { nl: '~9 exonen van ~150 letters; intronen veel langer', en: '~9 exons of ~150 letters; introns much longer' }],
    ],
  },

  mtdna: {
    title: { nl: 'Ring-DNA van de energiecentrale (mtDNA)', en: 'Ring DNA of the power plant (mtDNA)' },
    sub: { nl: 'Klein rond DNA in de mitochondriën', en: 'Small circular DNA in mitochondria' },
    kort: {
      nl: 'Bijna al je DNA zit in de celkern. Maar de [[mitochondriën|mitochondrion]], de energiecentrales van de cel, hebben een eigen klein DNA. Het is een ring met 37 genen, en je krijgt het enkel van je moeder.',
      en: 'Almost all your DNA is in the nucleus. But the [[mitochondria|mitochondrion]], the power plants of the cell, have their own small DNA. It is a ring with 37 genes, and you get it only from your mother.' },
    look: {
      nl: 'De twee ringen zijn de twee strengen van het DNA. Gekleurde stukken zijn genen: paars voor eiwitten, groenblauw voor rRNA, gele streepjes voor tRNA; het grijze stuk bovenaan is een regelzone zonder genen.',
      en: 'The two rings are the two strands of the DNA. Coloured pieces are genes: purple for proteins, teal for rRNA, yellow ticks for tRNA; the grey piece at the top is a control zone without genes.' },
    why: {
      nl: 'De eiwitten van dit DNA zijn nodig om energie (ATP) te maken. Fouten in dit DNA kunnen mitochondriale ziekten veroorzaken.',
      en: 'The proteins from this DNA are needed to make energy (ATP). Errors in this DNA can cause mitochondrial diseases.' },
    facts: [
      [{ nl: 'Grootte', en: 'Size' }, { nl: '16 569 basenparen, in een ring', en: '16,569 base pairs, in a ring' }],
      [{ nl: 'Aantal genen', en: 'Number of genes' }, { nl: '37: 13 eiwitten, 2 rRNA’s, 22 tRNA’s', en: '37: 13 proteins, 2 rRNAs, 22 tRNAs' }],
      [{ nl: 'Kopieën per cel', en: 'Copies per cell' }, { nl: 'Honderden tot duizenden', en: 'Hundreds to thousands' }],
      [{ nl: 'Erfelijkheid', en: 'Inheritance' }, { nl: 'Enkel via de moeder', en: 'Only through the mother' }],
      [{ nl: 'Bijzonder', en: 'Special' }, { nl: 'Geen intronen; een iets andere genetische code', en: 'No introns; a slightly different genetic code' }],
    ],
  },

  plasmid: {
    title: { nl: 'Los DNA-ringetje (plasmide)', en: 'Free-floating DNA ring (plasmid)' },
    sub: { nl: 'In bacteriën en in het lab', en: 'In bacteria and in the lab' },
    kort: {
      nl: 'Bacteriën hebben naast hun [[chromosoom|chromosoom]] soms kleine, losse DNA-ringetjes: plasmiden. In het lab steken onderzoekers er een gen in en brengen het zo in een cel binnen, zoals een USB-stick met één bestand. Menselijke cellen hebben zelf geen plasmiden.',
      en: 'Besides their [[chromosome|chromosoom]], bacteria sometimes have small, loose DNA rings: plasmids. In the lab, researchers put a gene into one and use it to bring the gene into a cell, like a USB stick with one file. Human cells have no plasmids of their own.' },
    look: {
      nl: 'De blauwe ring is het dubbelstrengige DNA. Gekleurde stukken: de promotor (rood, de startknop), het ingevoegde gen (oranje), een gen tegen een antibioticum (paars) en de ori (groen), waar het kopiëren begint.',
      en: 'The blue ring is the double-stranded DNA. Coloured pieces: the promoter (red, the start button), the inserted gene (orange), a gene against an antibiotic (purple) and the ori (green), where copying starts.' },
    why: {
      nl: 'Plasmiden zijn het basisgereedschap van het DNA-lab: om eiwitten te laten maken, voor DNA-vaccins, en als mal waarvan het RNA voor mRNA-vaccins wordt gemaakt.',
      en: 'Plasmids are the basic tool of the DNA lab: to have proteins made, for DNA vaccines, and as the template from which the RNA for mRNA vaccines is made.' },
    facts: [
      [{ nl: 'Wat is het?', en: 'What is it?' }, { nl: 'Klein, rond DNA, los van het chromosoom', en: 'Small, circular DNA, separate from the chromosome' }],
      [{ nl: 'Komt voor in', en: 'Found in' }, { nl: 'Bacteriën (en gist); niet in de mens', en: 'Bacteria (and yeast); not in humans' }],
      [{ nl: 'Grootte', en: 'Size' }, { nl: 'Meestal 2 000–10 000 basenparen', en: 'Usually 2,000–10,000 base pairs' }],
      [{ nl: 'Minstens aan boord', en: 'At least on board' }, { nl: 'Kopieerstart (ori), selectiegen, plek voor een gen', en: 'Copy start (ori), selection gene, slot for a gene' }],
      [{ nl: 'Selectiegen', en: 'Selection gene' }, { nl: 'Enkel bacteriën mét plasmide overleven', en: 'Only bacteria with the plasmid survive' }],
    ],
  },

  cdna: {
    title: { nl: 'DNA-kopie gemaakt van RNA (cDNA)', en: 'DNA copy made from RNA (cDNA)' },
    sub: { nl: 'RNA terug overschrijven naar DNA', en: 'Copying RNA back into DNA' },
    kort: {
      nl: 'Normaal gaat informatie van DNA naar RNA. Het enzym [[reverse transcriptase|reverse-transcriptase]] doet het omgekeerd: het maakt van een mRNA een DNA-kopie. Die kopie heeft, net als het mRNA, geen [[intronen|intron]] meer.',
      en: 'Normally information flows from DNA to RNA. The enzyme [[reverse transcriptase|reverse-transcriptase]] does the opposite: it makes a DNA copy of an mRNA. Like the mRNA, that copy no longer has any [[introns|intron]].' },
    look: {
      nl: 'Vijf stappen van boven naar onder; oranje is RNA, blauw is DNA. Een DNA-streng groeit langs het mRNA, daarna wordt het RNA afgebroken en vervangen door een tweede DNA-streng (lichtblauw).',
      en: 'Five steps from top to bottom; orange is RNA, blue is DNA. A DNA strand grows along the mRNA, then the RNA is broken down and replaced by a second DNA strand (light blue).' },
    why: {
      nl: 'In het lab gebruik je cDNA om te meten welke genen actief zijn, of om een menselijk gen (bv. insuline) door bacteriën te laten maken. Ook het virus HIV maakt zo DNA van zijn RNA.',
      en: 'In the lab, cDNA is used to measure which genes are active, or to have bacteria make a human gene product (e.g. insulin). The HIV virus also makes DNA from its RNA this way.' },
    facts: [
      [{ nl: 'Wat is het?', en: 'What is it?' }, { nl: 'Een DNA-kopie van een RNA (meestal mRNA)', en: 'A DNA copy of an RNA (usually mRNA)' }],
      [{ nl: 'Gemaakt door', en: 'Made by' }, { nl: 'Het enzym reverse transcriptase', en: 'The enzyme reverse transcriptase' }],
      [{ nl: 'Wat ontbreekt?', en: 'What is missing?' }, { nl: 'Intronen en de promotor (startknop) van het gen', en: 'Introns and the gene’s promoter (start button)' }],
      [{ nl: 'Gebruikt voor', en: 'Used for' }, { nl: 'Genactiviteit meten, genen in bacteriën laten werken', en: 'Measuring gene activity, expressing genes in bacteria' }],
      [{ nl: 'Ook in de natuur', en: 'Also in nature' }, { nl: 'Bij HIV, springende genen (LINE-1) en telomerase', en: 'In HIV, jumping genes (LINE-1) and telomerase' }],
    ],
  },

  lncrna: {
    title: { nl: 'Lang RNA dat geen eiwit maakt (lncRNA)', en: 'Long RNA that makes no protein (lncRNA)' },
    sub: { nl: 'RNA dat zelf een taak heeft', en: 'RNA that does a job itself' },
    kort: {
      nl: 'Niet elk RNA is een bouwplan voor een eiwit. Lange niet-coderende RNA’s doen zelf iets: ze helpen bepalen welke genen aan of uit staan. Ze werken bv. als gids, als steiger die eiwitten samenbrengt, of als lokvogel die iets wegvangt.',
      en: 'Not every RNA is a blueprint for a protein. Long non-coding RNAs do something themselves: they help decide which genes are on or off. They act e.g. as a guide, as a scaffold that brings proteins together, or as a decoy that catches something away.' },
    look: {
      nl: 'Vier vakjes tonen vier manieren van werken. De oranje golflijn is het lncRNA, paarse bollen zijn eiwitten, gele blokjes zijn wat het wegvangt, en grijze bolletjes op blauw DNA zijn opgerold DNA.',
      en: 'Four boxes show four ways of working. The orange wavy line is the lncRNA, purple balls are proteins, yellow blocks are what it catches, and grey beads on blue DNA are wound-up DNA.' },
    why: {
      nl: 'Een bekend voorbeeld is XIST: het bedekt in vrouwelijke cellen één X-chromosoom en zet het stil. Van de meeste lncRNA’s kennen we de functie nog niet.',
      en: 'A well-known example is XIST: in female cells it coats one X chromosome and switches it off. For most lncRNAs the function is still unknown.' },
    facts: [
      [{ nl: 'Wat is het?', en: 'What is it?' }, { nl: 'RNA van meer dan 200 letters zonder eiwitcode', en: 'RNA of more than 200 letters with no protein code' }],
      [{ nl: 'Aantal genen (mens)', en: 'Genes (in humans)' }, { nl: 'Ongeveer 20 000', en: 'About 20,000' }],
      [{ nl: 'Waar in de cel', en: 'Where in the cell' }, { nl: 'Vooral in de celkern, sommige erbuiten', en: 'Mostly in the nucleus, some outside it' }],
      [{ nl: 'Werkt als', en: 'Works as' }, { nl: 'Gids, steiger, lokvogel of signaal', en: 'Guide, scaffold, decoy or signal' }],
      [{ nl: 'Voorbeeld', en: 'Example' }, { nl: 'XIST (~17 000 letters) zet een X-chromosoom stil', en: 'XIST (~17,000 letters) silences an X chromosome' }],
    ],
  },

  tdna: {
    title: { nl: 'Bacterie zet DNA in een plant (T-DNA)', en: 'Bacterium puts DNA into a plant (T-DNA)' },
    sub: { nl: 'Plant & biotech — niet in de mens', en: 'Plant & biotech — not in humans' },
    kort: {
      nl: 'De bodembacterie Agrobacterium kan een stukje van haar eigen DNA in een plantencel brengen. Dat stuk, het T-DNA, wordt ingebouwd in het DNA van de plant. Onderzoekers gebruiken dit om nieuwe genen in planten te zetten; in de mens komt het niet voor.',
      en: 'The soil bacterium Agrobacterium can bring a piece of its own DNA into a plant cell. That piece, the T-DNA, is built into the plant’s DNA. Researchers use this to put new genes into plants; it does not happen in humans.' },
    look: {
      nl: 'Linksboven de DNA-ring van de bacterie met het roze stuk T-DNA. Dat stuk gaat als één losse streng, met een paars eiwit vooraan, naar de plantencel en wordt onderaan ingebouwd in een plantenchromosoom.',
      en: 'Top left is the bacterium’s DNA ring with the pink piece of T-DNA. That piece travels as one single strand, with a purple protein at the front, to the plant cell and is built into a plant chromosome at the bottom.' },
    why: {
      nl: 'In de natuur laat het T-DNA een woekering op de plant groeien (kroongal). In de biotechnologie vervangt men die genen door een gewenst gen, om genetisch gewijzigde planten te maken.',
      en: 'In nature the T-DNA makes a growth appear on the plant (crown gall). In biotechnology those genes are replaced by a chosen gene to make genetically modified plants.' },
    facts: [
      [{ nl: 'Waar?', en: 'Where?' }, { nl: 'Bacterie en plant — niet in menselijke cellen', en: 'Bacterium and plant — not in human cells' }],
      [{ nl: 'Afkomstig van', en: 'Comes from' }, { nl: 'Een DNA-ring (Ti-plasmide, ~200 kb) van Agrobacterium', en: 'A DNA ring (Ti plasmid, ~200 kb) of Agrobacterium' }],
      [{ nl: 'Grootte T-DNA', en: 'Size of T-DNA' }, { nl: 'Ongeveer 10 000–25 000 basenparen', en: 'About 10,000–25,000 base pairs' }],
      [{ nl: 'Begrensd door', en: 'Bounded by' }, { nl: 'Twee korte grensstukjes van 25 basenparen', en: 'Two short border pieces of 25 base pairs' }],
      [{ nl: 'Gebruikt voor', en: 'Used for' }, { nl: 'Genetisch gewijzigde planten maken', en: 'Making genetically modified plants' }],
    ],
  },
};

export const EXTRA_GLOSS = {
  'mitochondrion': { nl: ['mitochondrion', 'Een klein onderdeel in de cel dat energie (ATP) maakt; meervoud: mitochondriën.'], en: ['mitochondrion', 'A small part of the cell that makes energy (ATP); plural: mitochondria.'] },
};
