/* Eenvoudige teksten voor de niveaus hobbyist en secundair (groep genome). Sleutels van steps = stapnummer in de animatie. */
export default {
  'kern': {
    hobby: {
      kort: { nl: 'De celkern is een soort kluis in de cel waar het DNA bewaard wordt. Twee dunne vliesjes met kleine poortjes omringen hem. Hier wordt het DNA overgeschreven naar RNA, dat via de poortjes naar buiten gaat.', en: 'The nucleus is a kind of safe inside the cell where DNA is kept. Two thin skins with tiny gates surround it. Here DNA is copied into RNA, which leaves through those gates.' },
      steps: {
        0: { tag: ['celkern', 'nucleus'], title: { nl: 'De celkern', en: 'The nucleus' }, text: { nl: 'Hier ligt het DNA, en hier wordt het overgeschreven naar RNA. Klik op een onderdeel om in te zoomen.', en: 'This is where DNA is kept and copied into RNA. Click a part to zoom in.' } },
      },
    },
    secundair: {
      kort: { nl: 'De celkern bevat het DNA van de cel als chromatine. Ze is omgeven door een dubbel membraan, de kernenvelop, met kernporiën als enige doorgang. Hier wordt DNA afgelezen naar RNA, dat via de kernporiën naar het cytoplasma gaat.', en: 'The nucleus holds the cell’s DNA as chromatin. It is surrounded by a double membrane, the nuclear envelope, with nuclear pores as the only way through. Here DNA is read into RNA, which leaves through the pores into the cytoplasm.' },
      terms: [
        [{ nl: 'kernenvelop', en: 'nuclear envelope' }, { nl: 'Het dubbele membraan rond de celkern.', en: 'The double membrane around the nucleus.' }],
        [{ nl: 'kernporie', en: 'nuclear pore' }, { nl: 'Een poort in de kernenvelop, de enige doorgang tussen kern en cytoplasma.', en: 'A gate in the nuclear envelope, the only passage between nucleus and cytoplasm.' }],
        [{ nl: 'chromatine', en: 'chromatin' }, { nl: 'DNA samen met de eiwitten die het verpakken.', en: 'DNA together with the proteins that package it.' }],
      ],
      steps: {
        0: { tag: ['celkern', 'nucleus'], title: { nl: 'De celkern: hier ligt het DNA', en: 'The nucleus: home of the DNA' }, text: { nl: 'In de kern ligt het DNA als chromatine en wordt het afgelezen naar RNA. Klik op een onderdeel om in te zoomen.', en: 'In the nucleus, DNA lies as chromatin and is read into RNA. Click a part to zoom in.' } },
      },
    },
  },

  'chromatine': {
    hobby: {
      kort: { nl: 'In elke cel zit een heel lange DNA-draad, in een piepkleine kern. Dat past omdat eiwitten het DNA netjes oprollen, zoals garen op klosjes. Losse stukken kunnen gelezen worden, strak opgerolde stukken meestal niet.', en: 'Each cell holds a very long thread of DNA inside a tiny nucleus. It fits because proteins neatly wind the DNA up, like thread on spools. Loose parts can be read, tightly wound parts usually cannot.' },
      steps: {
        0: { tag: ['inpakken', 'packing'], title: { nl: 'Heel veel DNA in een kleine kern', en: 'Lots of DNA in a small nucleus' }, text: { nl: 'Een cel heeft een heel lange DNA-draad in een piepkleine kern. Dat past, omdat eiwitten het DNA inpakken.', en: 'A cell has a very long DNA thread in a tiny nucleus. It fits because proteins pack the DNA.' } },
        4: { tag: ['open of dicht', 'open or closed'], title: { nl: 'Los of strak opgerold', en: 'Loosely or tightly wound' }, text: { nl: 'Los opgerold DNA kan gelezen worden. Strak opgerold DNA is meestal stil: kleine labeltjes houden het dicht.', en: 'Loosely wound DNA can be read. Tightly wound DNA is usually silent: small tags keep it closed.' } },
        5: { tag: ['kralensnoer', 'beads on string'], title: { nl: 'Kralen aan een snoer', en: 'Beads on a string' }, text: { nl: 'Uitgerekt lijkt het op kralen aan een snoer. Elke kraal is een stukje DNA rond een klosje van eiwitten.', en: 'Stretched out, it looks like beads on a string. Each bead is a bit of DNA wound around a spool of proteins.' } },
        7: { tag: ['één kraal', 'one bead'], title: { nl: 'Inzoomen op één kraal', en: 'Zooming in on one bead' }, text: { nl: 'Eén kraal van dichtbij: een stukje DNA rond acht eiwitten. Hierna zie je zo’n kraal in 3D.', en: 'One bead up close: a bit of DNA around eight proteins. Next, you see such a bead in 3D.' } },
      },
    },
    secundair: {
      kort: { nl: 'Chromatine is DNA samen met de eiwitten die het verpakken, vooral histonen. Zo past het lange DNA in de kleine kern. Open chromatine (euchromatine) wordt afgelezen, compact chromatine (heterochromatine) is meestal stil.', en: 'Chromatin is DNA together with the proteins that package it, mainly histones. That is how the long DNA fits into the small nucleus. Open chromatin (euchromatin) is read, compact chromatin (heterochromatin) is usually silent.' },
      terms: [
        [{ nl: 'chromatine', en: 'chromatin' }, { nl: 'DNA samen met de eiwitten die het verpakken.', en: 'DNA together with the proteins that package it.' }],
        [{ nl: 'histon', en: 'histone' }, { nl: 'Een eiwit waar het DNA omheen gewikkeld ligt.', en: 'A protein that DNA is wound around.' }],
        [{ nl: 'nucleosoom', en: 'nucleosome' }, { nl: 'Een stukje DNA gewikkeld rond acht histonen: één kraal van het snoer.', en: 'A piece of DNA wound around eight histones: one bead on the string.' }],
        [{ nl: 'euchromatine', en: 'euchromatin' }, { nl: 'Open chromatine, waarvan de genen afgelezen kunnen worden.', en: 'Open chromatin, whose genes can be read.' }],
        [{ nl: 'heterochromatine', en: 'heterochromatin' }, { nl: 'Compact chromatine, waarvan de genen meestal stil zijn.', en: 'Compact chromatin, whose genes are usually silent.' }],
      ],
      steps: {
        0: { tag: ['chromatine', 'chromatin'], title: { nl: 'Chromatine: verpakt DNA', en: 'Chromatin: packaged DNA' }, text: { nl: 'Een cel heeft heel veel DNA in een kleine kern. Dat past omdat eiwitten het verpakken: samen heet dat chromatine.', en: 'A cell has a lot of DNA in a small nucleus. It fits because proteins package it: together this is called chromatin.' } },
        4: { tag: ['open of dicht', 'open or closed'], title: { nl: 'Euchromatine en heterochromatine', en: 'Euchromatin and heterochromatin' }, text: { nl: 'Open chromatine (euchromatine) wordt afgelezen. Compact chromatine (heterochromatine) is meestal stil; chemische merktekens houden het dicht.', en: 'Open chromatin (euchromatin) is read. Compact chromatin (heterochromatin) is usually silent; chemical marks keep it closed.' } },
        5: { tag: ['nucleosomen', 'nucleosomes'], title: { nl: 'Kralen aan een snoer: nucleosomen', en: 'Beads on a string: nucleosomes' }, text: { nl: 'Uitgerekt lijkt chromatine op kralen aan een snoer. Elke kraal is een nucleosoom: DNA gewikkeld rond histonen.', en: 'Stretched out, chromatin looks like beads on a string. Each bead is a nucleosome: DNA wound around histones.' } },
        7: { tag: ['nucleosoom', 'nucleosome'], title: { nl: 'Eén nucleosoom', en: 'One nucleosome' }, text: { nl: 'Een nucleosoom is DNA rond acht histonen. Hierna: het nucleosoom in 3D.', en: 'A nucleosome is DNA around eight histones. Next: the nucleosome in 3D.' } },
      },
    },
  },

  'nucleosoom': {
    hobby: {
      kort: { nl: 'Om in de kern te passen, wordt DNA rond kleine klosjes van eiwitten gewikkeld, zoals garen rond een spoel. Een lange rij klosjes lijkt op een kralensnoer. Om een gen te lezen, moet het DNA er deels af of opgeschoven worden.', en: 'To fit in the nucleus, DNA is wound around tiny spools made of proteins, like thread on a reel. A long row of spools looks like a string of beads. To read a gene, the DNA must partly come off or be pushed aside.' },
      steps: {
        0: { tag: ['klosje', 'spool'], title: { nl: 'Een klosje met DNA', en: 'A spool with DNA' }, text: { nl: 'Dit is de echte vorm: DNA gewikkeld rond acht eiwitten. Samen vormen ze een piepklein schijfje.', en: 'This is the real shape: DNA wound around eight proteins. Together they form a tiny disc.' } },
        1: { tag: ['wikkelen', 'wrapping'], title: { nl: 'Het DNA wikkelt zich rond', en: 'The DNA wraps around' }, text: { nl: 'Het DNA draait bijna twee keer rond het klosje. Het blijft gewoon DNA, maar sterk gebogen.', en: 'The DNA goes almost twice around the spool. It is still normal DNA, just sharply bent.' } },
        5: { tag: ['staartjes', 'tails'], title: { nl: 'Staartjes steken naar buiten', en: 'Tails stick out' }, text: { nl: 'De eiwitten hebben staartjes die uitsteken. Op de rode plekjes kunnen kleine labeltjes komen.', en: 'The proteins have little tails that stick out. Small tags can be added on the red spots.' } },
        7: { tag: ['verder', 'onward'], title: { nl: 'Verder inzoomen op het DNA', en: 'Zooming in on the DNA' }, text: { nl: 'Dit is één klosje; in de cel loopt het DNA verder naar het volgende. Hierna zie je het DNA zelf van dichtbij.', en: 'This is one spool; in the cell the DNA runs on to the next one. Next, you see the DNA itself up close.' } },
      },
    },
    secundair: {
      kort: { nl: 'Het nucleosoom is de basiseenheid van chromatine: DNA dat bijna twee keer rond acht histonen gewikkeld is. Linker-DNA verbindt opeenvolgende nucleosomen. Om een gen af te lezen moet het DNA er deels af of opgeschoven worden.', en: 'The nucleosome is the basic unit of chromatin: DNA wound almost twice around eight histones. Linker DNA connects one nucleosome to the next. To read a gene, the DNA must partly come off or be shifted.' },
      terms: [
        [{ nl: 'nucleosoom', en: 'nucleosome' }, { nl: 'DNA gewikkeld rond een kern van acht histonen.', en: 'DNA wound around a core of eight histones.' }],
        [{ nl: 'histon', en: 'histone' }, { nl: 'Een eiwit dat samen met andere histonen het klosje voor het DNA vormt.', en: 'A protein that, with other histones, forms the spool for DNA.' }],
        [{ nl: 'histonstaart', en: 'histone tail' }, { nl: 'Een uitstekend uiteinde van een histon, waarop merktekens kunnen komen.', en: 'A protruding end of a histone that can carry marks.' }],
        [{ nl: 'linker-DNA', en: 'linker DNA' }, { nl: 'Het stuk DNA tussen twee nucleosomen.', en: 'The piece of DNA between two nucleosomes.' }],
      ],
      steps: {
        0: { tag: ['nucleosoom', 'nucleosome'], title: { nl: 'Het nucleosoom', en: 'The nucleosome' }, text: { nl: 'Een nucleosoom is DNA gewikkeld rond acht histonen. Samen vormen ze een klein schijfje.', en: 'A nucleosome is DNA wound around eight histones. Together they form a small disc.' } },
        1: { tag: ['wikkelen', 'wrapping'], title: { nl: 'DNA rond de histonen', en: 'DNA around the histones' }, text: { nl: 'Het DNA draait bijna twee keer rond de histonkern. Het blijft een gewone dubbelhelix, maar sterk gebogen.', en: 'The DNA turns almost twice around the histone core. It stays a normal double helix, but sharply bent.' } },
        5: { tag: ['histonstaarten', 'histone tails'], title: { nl: 'Histonstaarten', en: 'Histone tails' }, text: { nl: 'De histonen hebben staarten die naar buiten steken. Op hun lysines, een soort aminozuur, kunnen chemische merktekens komen.', en: 'The histones have tails that stick out. Chemical marks can be added to their lysines, a kind of amino acid.' } },
        7: { tag: ['linker-DNA', 'linker DNA'], title: { nl: 'Naar het volgende nucleosoom', en: 'On to the next nucleosome' }, text: { nl: 'Aan beide uiteinden loopt het DNA verder naar het volgende nucleosoom: dat stuk heet linker-DNA (niet in deze structuur). Hierna: de DNA-dubbelhelix zelf.', en: 'At both ends the DNA runs on to the next nucleosome: that stretch is linker DNA (not in this structure). Next: the DNA double helix itself.' } },
      },
    },
  },

  'chromosoom': {
    hobby: {
      kort: { nl: 'Een chromosoom is één heel lange DNA-draad, netjes ingepakt. Een cel van je lichaam heeft er 46, in paren. Voor de cel zich deelt, wordt elk chromosoom gekopieerd en opgevouwen, zodat elke nieuwe cel een volledige set krijgt.', en: 'A chromosome is one very long DNA thread, neatly packed. A cell of your body has 46 of them, in pairs. Before the cell divides, each chromosome is copied and folded up, so each new cell gets a full set.' },
      steps: {
        0: { tag: ['46 stuks', '46 of them'], title: { nl: '46 chromosomen', en: '46 chromosomes' }, text: { nl: 'Een cel van je lichaam heeft 23 paren chromosomen: 22 gewone paren en een paar XX of XY.', en: 'A cell of your body has 23 pairs of chromosomes: 22 ordinary pairs and one pair XX or XY.' } },
        2: { tag: ['twee helften', 'two halves'], title: { nl: 'Een gekopieerd chromosoom', en: 'A copied chromosome' }, text: { nl: 'Na het kopiëren heeft een chromosoom twee gelijke helften. Ze hangen samen op een plek waar het chromosoom smaller is.', en: 'After copying, a chromosome has two identical halves. They are joined at a spot where the chromosome is narrower.' } },
        6: { tag: ['opvouwen', 'folding up'], title: { nl: 'Opvouwen voor de deling', en: 'Folding up for division' }, text: { nl: 'Bij de celdeling wordt elke helft opgevouwen tot een rij lusjes. Het DNA wordt zo duizenden keren korter.', en: 'When the cell divides, each half is folded into a row of loops. The DNA becomes thousands of times shorter.' } },
        7: { tag: ['uitvouwen', 'unfolding'], title: { nl: 'Weer uitgevouwen', en: 'Unfolded again' }, text: { nl: 'Na de deling vouwt elk chromosoom weer open en krijgt het een eigen plekje in de kern.', en: 'After division, each chromosome unfolds again and gets its own spot in the nucleus.' } },
      },
    },
    secundair: {
      kort: { nl: 'Een chromosoom is één lange DNA-molecule met de eiwitten die het verpakken. Een menselijke lichaamscel heeft 46 chromosomen: 22 paren autosomen en twee geslachtschromosomen. Na replicatie bestaat elk chromosoom uit twee zusterchromatiden.', en: 'A chromosome is one long DNA molecule with the proteins that package it. A human body cell has 46 chromosomes: 22 pairs of autosomes and two sex chromosomes. After replication, each chromosome consists of two sister chromatids.' },
      terms: [
        [{ nl: 'chromosoom', en: 'chromosome' }, { nl: 'Eén lange DNA-molecule met de eiwitten die het verpakken.', en: 'One long DNA molecule with the proteins that package it.' }],
        [{ nl: 'geslachtschromosoom', en: 'sex chromosome' }, { nl: 'Het X- of Y-chromosoom; een lichaamscel heeft XX of XY.', en: 'The X or Y chromosome; a body cell has XX or XY.' }],
        [{ nl: 'zusterchromatide', en: 'sister chromatid' }, { nl: 'Eén van de twee identieke helften van een gekopieerd chromosoom.', en: 'One of the two identical halves of a copied chromosome.' }],
        [{ nl: 'centromeer', en: 'centromere' }, { nl: 'De insnoering waar de twee zusterchromatiden samenhangen.', en: 'The narrowing where the two sister chromatids are joined.' }],
      ],
      steps: {
        0: { tag: ['46 chromosomen', '46 chromosomes'], title: { nl: '46 chromosomen in 23 paren', en: '46 chromosomes in 23 pairs' }, text: { nl: 'Een lichaamscel heeft 22 paren autosomen en twee geslachtschromosomen: XX of XY.', en: 'A body cell has 22 pairs of autosomes and two sex chromosomes: XX or XY.' } },
        2: { tag: ['chromatiden', 'chromatids'], title: { nl: 'Twee zusterchromatiden', en: 'Two sister chromatids' }, text: { nl: 'Na replicatie heeft een chromosoom twee identieke zusterchromatiden. Ze hangen samen aan het centromeer.', en: 'After replication, a chromosome has two identical sister chromatids. They are joined at the centromere.' } },
        6: { tag: ['condensatie', 'condensing'], title: { nl: 'Condensatie voor de deling', en: 'Condensing for division' }, text: { nl: 'Bij de celdeling vouwt een eiwit elke chromatide tot een rij lussen. Het DNA wordt daardoor veel korter.', en: 'During cell division, a protein folds each chromatid into a row of loops. This makes the DNA much shorter.' } },
        7: { tag: ['uitvouwen', 'unfolding'], title: { nl: 'Weer uitgevouwen in de kern', en: 'Unfolded again in the nucleus' }, text: { nl: 'Na de deling vouwt elk chromosoom weer open en krijgt het een eigen plek in de kern: een chromosoomterritorium.', en: 'After division, each chromosome unfolds and takes its own place in the nucleus: a chromosome territory.' } },
      },
    },
  },

  'histonmod': {
    hobby: {
      kort: { nl: 'Het DNA ligt rond klosjes van eiwitten, en die klosjes kunnen kleine labeltjes krijgen. Sommige labeltjes maken het DNA losser, zodat genen aan kunnen, andere houden het dicht. De letters van het DNA veranderen daarbij niet.', en: 'DNA is wound around spools of proteins, and those spools can get small tags. Some tags loosen the DNA so genes can switch on, others keep it closed. The letters of the DNA itself do not change.' },
      steps: {
        0: { tag: ['staartjes', 'tails'], title: { nl: 'Staartjes voor labeltjes', en: 'Tails for tags' }, text: { nl: 'Elk eiwit van het klosje heeft een soepel staartje dat uitsteekt. Daar komen de meeste labeltjes op.', en: 'Each protein of the spool has a floppy tail that sticks out. Most tags are added there.' } },
        2: { tag: ['losser', 'loosening'], title: { nl: 'Een labeltje maakt het losser', en: 'A tag loosens it' }, text: { nl: 'Een eiwit plakt een klein labeltje op het staartje. Dat haalt een lading weg, en het DNA komt losser te liggen.', en: 'A protein sticks a small tag on the tail. This removes a charge, and the DNA becomes looser.' } },
        5: { tag: ['stilleggen', 'silencing'], title: { nl: 'Labeltjes die genen stilleggen', en: 'Tags that silence genes' }, text: { nl: 'Andere labeltjes, op andere plekjes van het staartje, houden genen juist stil, bijvoorbeeld in strak opgerold DNA.', en: 'Other tags, on other spots of the tail, keep genes silent instead, for example in tightly wound DNA.' } },
        7: { tag: ['schrijf wis lees', 'write erase read'], title: { nl: 'Schrijven, wissen, lezen', en: 'Writing, erasing, reading' }, text: { nl: 'Sommige eiwitten zetten labeltjes, andere halen ze weg, nog andere lezen ze. Zo bepalen ze welke genen aan kunnen.', en: 'Some proteins add tags, others remove them, and others read them. Together they decide which genes can switch on.' } },
      },
    },
    secundair: {
      kort: { nl: 'Histonen kunnen chemische merktekens krijgen op hun staarten, zoals acetylatie en methylatie. Acetylatie maakt het chromatine losser, bepaalde methylaties houden genen stil. Zo helpen histonmodificaties bepalen welke genen aan of uit staan, zonder de DNA-sequentie te veranderen.', en: 'Histones can get chemical marks on their tails, such as acetylation and methylation. Acetylation loosens chromatin, certain methylations keep genes silent. In this way histone modifications help decide which genes are on or off, without changing the DNA sequence.' },
      terms: [
        [{ nl: 'histonmodificatie', en: 'histone modification' }, { nl: 'Een chemisch merkteken op een histon, vooral op de staart.', en: 'A chemical mark on a histone, mostly on its tail.' }],
        [{ nl: 'acetylatie', en: 'acetylation' }, { nl: 'Een acetylgroep op een lysine; maakt het chromatine losser.', en: 'An acetyl group on a lysine; it loosens chromatin.' }],
        [{ nl: 'methylatie', en: 'methylation' }, { nl: 'Een methylgroep op een lysine; op bepaalde plaatsen houdt die genen stil.', en: 'A methyl group on a lysine; at certain positions it keeps genes silent.' }],
        [{ nl: 'schrijver, wisser, lezer', en: 'writer, eraser, reader' }, { nl: 'Eiwitten die merktekens zetten, weghalen of herkennen.', en: 'Proteins that add, remove or recognise marks.' }],
      ],
      steps: {
        0: { tag: ['histonstaarten', 'histone tails'], title: { nl: 'Histonstaarten dragen merktekens', en: 'Histone tails carry marks' }, text: { nl: 'Elk histon heeft een soepele staart die uitsteekt. Daar komen de meeste chemische merktekens op.', en: 'Each histone has a flexible tail that sticks out. Most chemical marks are placed there.' } },
        2: { tag: ['acetylatie', 'acetylation'], title: { nl: 'Acetylatie maakt chromatine losser', en: 'Acetylation loosens chromatin' }, text: { nl: 'Een enzym zet een acetylgroep op een lysine. De positieve lading verdwijnt en het chromatine wordt losser.', en: 'An enzyme puts an acetyl group on a lysine. The positive charge disappears and chromatin becomes looser.' } },
        5: { tag: ['methylatie', 'methylation'], title: { nl: 'Methylatie kan genen stilleggen', en: 'Methylation can silence genes' }, text: { nl: 'Methylgroepen op bepaalde lysines houden genen stil, bijvoorbeeld in compact chromatine.', en: 'Methyl groups on certain lysines keep genes silent, for example in compact chromatin.' } },
        7: { tag: ['schrijf wis lees', 'write erase read'], title: { nl: 'Schrijvers, wissers en lezers', en: 'Writers, erasers and readers' }, text: { nl: 'Schrijvers zetten merktekens, wissers halen ze weg, lezers herkennen ze. Zo bepalen ze welke genen aan kunnen.', en: 'Writers add marks, erasers remove them, readers recognise them. Together they decide which genes can switch on.' } },
      },
    },
  },

  'dnamethyl': {
    hobby: {
      kort: { nl: 'Een cel kan kleine labeltjes op het DNA zetten, op de letter C. De letters zelf veranderen niet, maar eiwitten herkennen het labeltje. Een gelabeld begin van een gen zet dat gen meestal uit, en de labeltjes gaan mee bij elke celdeling.', en: 'A cell can put small tags on its DNA, on the letter C. The letters themselves do not change, but proteins recognise the tag. A tagged start of a gene usually switches that gene off, and the tags are kept at every cell division.' },
      steps: {
        0: { tag: ['C vóór G', 'C before G'], title: { nl: 'Een C vóór een G', en: 'A C before a G' }, text: { nl: 'Vooral een C die vlak vóór een G staat, krijgt een labeltje. Op de andere draad staat daar ook zo’n CG, dus beide kunnen het.', en: 'Mostly a C right before a G gets a tag. The other strand also has a CG there, so both can be tagged.' } },
        1: { tag: ['labeltje op C', 'tag on C'], title: { nl: 'Een labeltje op de C', en: 'A tag on the C' }, text: { nl: 'De C krijgt een klein groepje erbij. Hij past nog gewoon bij de G: de code verandert niet.', en: 'The C gets a small group added. It still pairs with G as usual: the code does not change.' } },
        5: { tag: ['gen uit', 'gene off'], title: { nl: 'Labeltjes zetten een gen uit', en: 'Tags switch a gene off' }, text: { nl: 'Aan het begin van een gen hebben de C’s meestal geen labeltje. Krijgen ze er wel een, dan gaat het gen meestal uit.', en: 'At the start of a gene, the Cs usually have no tag. If they do get one, the gene usually switches off.' } },
        7: { tag: ['geheugen', 'memory'], title: { nl: 'Een geheugen voor aan en uit', en: 'A memory for on and off' }, text: { nl: 'Zo blijven onder meer springende stukjes DNA en het stille X-chromosoom stil, ook na elke celdeling.', en: 'This keeps, for example, jumping bits of DNA and the silent X chromosome switched off, even after every division.' } },
      },
    },
    secundair: {
      kort: { nl: 'Bij DNA-methylatie krijgt een cytosine een methylgroep, vooral in CpG’s. De basenparing verandert niet, maar eiwitten herkennen het merkteken. Een gemethyleerde promoter zet het gen meestal uit, en het patroon blijft bewaard na elke celdeling.', en: 'In DNA methylation, a cytosine gets a methyl group, mostly in CpGs. Base pairing does not change, but proteins recognise the mark. A methylated promoter usually switches the gene off, and the pattern is kept after every cell division.' },
      terms: [
        [{ nl: 'DNA-methylatie', en: 'DNA methylation' }, { nl: 'Het zetten van een methylgroep op een C in het DNA.', en: 'Adding a methyl group to a C in DNA.' }],
        [{ nl: 'CpG', en: 'CpG' }, { nl: 'Een C die in de streng vlak vóór een G staat.', en: 'A C directly followed by a G in the strand.' }],
        [{ nl: 'promoter', en: 'promoter' }, { nl: 'Het begin van een gen, waar het aflezen start.', en: 'The start of a gene, where reading begins.' }],
      ],
      steps: {
        0: { tag: ['CpG', 'CpG'], title: { nl: 'CpG: een C vóór een G', en: 'CpG: a C before a G' }, text: { nl: 'Vooral een C vóór een G, een CpG, wordt gemethyleerd. De andere streng heeft daar ook een CG, dus beide strengen kunnen het.', en: 'Mostly a C before a G, a CpG, is methylated. The other strand also has a CG there, so both strands can be.' } },
        1: { tag: ['methylgroep', 'methyl group'], title: { nl: 'Een methylgroep op de cytosine', en: 'A methyl group on the cytosine' }, text: { nl: 'De C krijgt een methylgroep. Hij paart nog gewoon met G: de DNA-sequentie verandert niet.', en: 'The C gets a methyl group. It still pairs with G: the DNA sequence does not change.' } },
        5: { tag: ['promoter', 'promoter'], title: { nl: 'Een gemethyleerde promoter zet het gen uit', en: 'A methylated promoter turns the gene off' }, text: { nl: 'In de promoter zijn de CpG’s meestal ongemethyleerd. Worden ze gemethyleerd, dan gaat het gen meestal uit.', en: 'In the promoter, CpGs are usually unmethylated. If they become methylated, the gene usually switches off.' } },
        7: { tag: ['geheugen', 'memory'], title: { nl: 'Een stabiel geheugen', en: 'A stable memory' }, text: { nl: 'Methylatie houdt onder meer springende genen en het inactieve X-chromosoom stil, ook na elke celdeling.', en: 'Methylation keeps, among others, jumping genes and the inactive X chromosome silent, even after every division.' } },
      },
    },
  },

  'gen': {
    hobby: {
      kort: { nl: 'Een gen is een stuk DNA dat de cel naar RNA overschrijft, samen met de stukken die regelen wanneer dat gebeurt. Bij de mens heeft een gen meestal stukken die blijven en tussenstukken die er later uitgeknipt worden. Hier begint het verhaal van DNA naar eiwit.', en: 'A gene is a piece of DNA that the cell copies into RNA, together with the parts that control when that happens. In humans, a gene usually has parts that stay and in-between parts that are cut out later. This is where the story from DNA to protein begins.' },
      steps: {
        0: { tag: ['gen', 'gene'], title: { nl: 'Wat is een gen?', en: 'What is a gene?' }, text: { nl: 'Een gen is een stuk DNA dat naar RNA wordt overgeschreven, plus de stukken die dat regelen.', en: 'A gene is a piece of DNA that is copied into RNA, plus the parts that control this.' } },
        2: { tag: ['startstuk', 'start part'], title: { nl: 'Hier begint het gen', en: 'This is where the gene starts' }, text: { nl: 'Aan het begin van het gen gaat de machine die RNA maakt klaarstaan. Daar begint het RNA.', en: 'At the start of the gene, the machine that makes RNA gets ready. That is where the RNA begins.' } },
        3: { tag: ['blijven of weg', 'keep or cut'], title: { nl: 'Stukken die blijven en gaan', en: 'Parts that stay and go' }, text: { nl: 'Sommige stukken blijven in het RNA; de stukken ertussen worden er later uitgeknipt.', en: 'Some parts stay in the RNA; the parts in between are cut out later.' } },
        7: { tag: ['klaar', 'ready'], title: { nl: 'Klaar om te lezen', en: 'Ready to be read' }, text: { nl: 'De machine die RNA maakt, leest dit hele gen. Hierna: het gen wordt aangezet en gelezen.', en: 'The machine that makes RNA reads this whole gene. Next: the gene is switched on and read.' } },
      },
    },
    secundair: {
      kort: { nl: 'Een gen is een stuk DNA dat naar RNA wordt afgeschreven, samen met de stukken die dat regelen. Het begint bij de promoter. Een menselijk gen bestaat meestal uit exonen, die in het mRNA blijven, en intronen, die eruit geknipt worden.', en: 'A gene is a piece of DNA that is transcribed into RNA, together with the parts that control this. It starts at the promoter. A human gene usually consists of exons, which stay in the mRNA, and introns, which are cut out.' },
      terms: [
        [{ nl: 'gen', en: 'gene' }, { nl: 'Een stuk DNA dat naar RNA wordt afgeschreven, met zijn regelende stukken.', en: 'A piece of DNA that is transcribed into RNA, with its control regions.' }],
        [{ nl: 'promoter', en: 'promoter' }, { nl: 'Het begin van een gen, waar RNA-polymerase gaat klaarstaan.', en: 'The start of a gene, where RNA polymerase gets ready.' }],
        [{ nl: 'exon', en: 'exon' }, { nl: 'Een stuk van het gen dat in het mRNA blijft.', en: 'A part of the gene that stays in the mRNA.' }],
        [{ nl: 'intron', en: 'intron' }, { nl: 'Een tussenstuk dat uit het RNA geknipt wordt.', en: 'An in-between part that is cut out of the RNA.' }],
        [{ nl: 'RNA-polymerase', en: 'RNA polymerase' }, { nl: 'Het enzym dat RNA maakt met DNA als voorbeeld.', en: 'The enzyme that makes RNA using DNA as a guide.' }],
      ],
      steps: {
        0: { tag: ['gen', 'gene'], title: { nl: 'Wat is een gen?', en: 'What is a gene?' }, text: { nl: 'Een gen is een stuk DNA dat naar RNA wordt afgeschreven, plus de stukken die dat regelen.', en: 'A gene is a piece of DNA that is transcribed into RNA, plus the parts that control this.' } },
        2: { tag: ['promoter', 'promoter'], title: { nl: 'De promoter: hier begint het gen', en: 'The promoter: the gene starts here' }, text: { nl: 'Op de promoter gaat RNA-polymerase klaarstaan, het enzym dat RNA maakt. Daar start de transcriptie.', en: 'RNA polymerase, the enzyme that makes RNA, gets ready at the promoter. That is where transcription starts.' } },
        3: { tag: ['exon, intron', 'exon, intron'], title: { nl: 'Exonen en intronen', en: 'Exons and introns' }, text: { nl: 'Exonen blijven in het mRNA. De intronen ertussen worden er later uitgeknipt.', en: 'Exons stay in the mRNA. The introns between them are cut out later.' } },
        7: { tag: ['klaar', 'ready'], title: { nl: 'Klaar voor transcriptie', en: 'Ready for transcription' }, text: { nl: 'RNA-polymerase leest dit geheel. Hierna: het gen wordt aangezet en afgelezen.', en: 'RNA polymerase reads this whole unit. Next: the gene is switched on and read.' } },
      },
    },
  },

  'nucleolus': {
    hobby: {
      kort: { nl: 'In de kern ligt een dicht vlekje zonder eigen vlies. Daar worden ribosomen gemaakt, de fabriekjes die eiwitten bouwen. Zonder dit vlekje dus geen ribosomen, en geen eiwitten.', en: 'Inside the nucleus lies a dense spot without its own skin. That is where ribosomes are made, the little factories that build proteins. Without this spot, no ribosomes, and so no proteins.' },
      steps: {
        0: { tag: ['dicht vlekje', 'dense spot'], title: { nl: 'Een vlekje in de kern', en: 'A spot in the nucleus' }, text: { nl: 'Het grootste vlekje in de kern, zonder eigen vlies. Het vormt zich rond de genen voor het RNA van ribosomen.', en: 'The largest spot in the nucleus, without its own skin. It forms around the genes for ribosome RNA.' } },
        5: { tag: ['knippen bouwen', 'cut and build'], title: { nl: 'Knippen en bouwen', en: 'Cutting and building' }, text: { nl: 'Overbodige stukjes worden weggeknipt. Het RNA en veel eiwitten vormen samen de twee delen van een ribosoom.', en: 'Spare bits are cut away. The RNA and many proteins together form the two parts of a ribosome.' } },
        7: { tag: ['fabriek', 'factory'], title: { nl: 'Een fabriek voor ribosomen', en: 'A ribosome factory' }, text: { nl: 'Een groeiende cel maakt duizenden ribosomen per minuut. Het meeste RNA in een cel is RNA van ribosomen.', en: 'A growing cell makes thousands of ribosomes per minute. Most of the RNA in a cell is ribosome RNA.' } },
      },
    },
    secundair: {
      kort: { nl: 'De nucleolus is het grootste lichaampje in de kern, zonder membraan. Hij vormt zich rond de genen voor rRNA, het RNA van het ribosoom. Hier wordt rRNA gemaakt en met eiwitten tot de twee subeenheden van het ribosoom gebouwd.', en: 'The nucleolus is the largest body in the nucleus, without a membrane. It forms around the genes for rRNA, the RNA of the ribosome. Here rRNA is made and built with proteins into the two ribosome subunits.' },
      terms: [
        [{ nl: 'nucleolus', en: 'nucleolus' }, { nl: 'Het grootste lichaampje in de kern, waar ribosomen gemaakt worden.', en: 'The largest body in the nucleus, where ribosomes are made.' }],
        [{ nl: 'rRNA', en: 'rRNA' }, { nl: 'Ribosomaal RNA, het RNA waaruit het ribosoom grotendeels bestaat.', en: 'Ribosomal RNA, the RNA that makes up much of the ribosome.' }],
        [{ nl: 'ribosoom', en: 'ribosome' }, { nl: 'De machine die eiwitten bouwt.', en: 'The machine that builds proteins.' }],
        [{ nl: 'subeenheid', en: 'subunit' }, { nl: 'Eén van de twee delen van het ribosoom.', en: 'One of the two parts of the ribosome.' }],
      ],
      steps: {
        0: { tag: ['nucleolus', 'nucleolus'], title: { nl: 'De nucleolus', en: 'The nucleolus' }, text: { nl: 'Het grootste lichaampje in de kern, zonder membraan. Hij vormt zich rond de genen voor rRNA.', en: 'The largest body in the nucleus, without a membrane. It forms around the genes for rRNA.' } },
        5: { tag: ['subeenheden', 'subunits'], title: { nl: 'Knippen en bouwen tot subeenheden', en: 'Cutting and building subunits' }, text: { nl: 'Tussenstukken worden uit de rRNA-voorloper geknipt. De rRNA’s vormen met eiwitten twee ribosoomsubeenheden.', en: 'Spacer pieces are cut out of the rRNA precursor. The rRNAs and proteins form two ribosome subunits.' } },
        7: { tag: ['ribosomen', 'ribosomes'], title: { nl: 'Een ribosomenfabriek', en: 'A ribosome factory' }, text: { nl: 'Een groeiende cel maakt heel veel ribosomen. Het meeste RNA in een cel is rRNA.', en: 'A growing cell makes very many ribosomes. Most RNA in a cell is rRNA.' } },
      },
    },
  },

  'dnahelix': {
    hobby: {
      kort: { nl: 'DNA bestaat uit twee draden die om elkaar heen draaien, als een gedraaide ladder. De sporten zijn paren van letters: A met T, G met C. Omdat de ene draad de andere bepaalt, kan DNA precies gekopieerd en gelezen worden.', en: 'DNA is made of two strands that twist around each other, like a twisted ladder. The rungs are pairs of letters: A with T, G with C. Because one strand sets the other, DNA can be copied and read exactly.' },
      steps: {
        0: { tag: ['wenteltrap', 'spiral stair'], title: { nl: 'Een gedraaide ladder', en: 'A twisted ladder' }, text: { nl: 'DNA bestaat uit twee draden die om elkaar heen draaien, als een wenteltrap. In de cel draait die naar rechts.', en: 'DNA is two strands twisting around each other, like a spiral staircase. In the cell it turns to the right.' } },
        2: { tag: ['ruggengraat', 'backbone'], title: { nl: 'De ruggengraat zit buiten', en: 'The backbone is outside' }, text: { nl: 'Buiten wisselen suiker en fosfaat, een klein groepje met een negatieve lading, elkaar af.', en: 'On the outside, sugar and phosphate, a small group with a negative charge, take turns.' } },
        3: { tag: ['letterparen', 'letter pairs'], title: { nl: 'De letters zitten binnen', en: 'The letters are inside' }, text: { nl: 'De platte letters zitten binnenin, in paren: A met T, G met C. Ze liggen op elkaar gestapeld als munten.', en: 'The flat letters sit inside, in pairs: A with T, G with C. They are stacked on top of each other like coins.' } },
        8: { tag: ['inzoomen', 'zoom in'], title: { nl: 'Verder inzoomen of doorgaan', en: 'Zoom in or move on' }, text: { nl: 'Klik op een onderdeel om in te zoomen. Daarna zie je hoe een gen in dit DNA wordt aangezet.', en: 'Click a part to zoom in. After that, you see how a gene in this DNA is switched on.' } },
      },
    },
    secundair: {
      kort: { nl: 'DNA is een dubbelhelix van twee strengen die in tegengestelde richting lopen. Buiten ligt de suiker-fosfaatruggengraat, binnen liggen de basenparen A–T en G–C. Omdat de ene streng de andere bepaalt, kan DNA precies gekopieerd en afgelezen worden.', en: 'DNA is a double helix of two strands running in opposite directions. The sugar-phosphate backbone is on the outside, the base pairs A–T and G–C are inside. Because one strand sets the other, DNA can be copied and read exactly.' },
      terms: [
        [{ nl: 'dubbelhelix', en: 'double helix' }, { nl: 'Twee DNA-strengen die als een wenteltrap om elkaar heen draaien.', en: 'Two DNA strands twisting around each other like a spiral staircase.' }],
        [{ nl: 'antiparallel', en: 'antiparallel' }, { nl: 'De twee strengen lopen in tegengestelde richting.', en: 'The two strands run in opposite directions.' }],
        [{ nl: 'suiker-fosfaatruggengraat', en: 'sugar-phosphate backbone' }, { nl: 'De buitenkant van elke streng, van afwisselend suiker en fosfaat.', en: 'The outside of each strand, made of alternating sugar and phosphate.' }],
        [{ nl: 'basenpaar', en: 'base pair' }, { nl: 'Twee tegenover elkaar liggende basen: A met T of G met C.', en: 'Two bases facing each other: A with T or G with C.' }],
      ],
      steps: {
        0: { tag: ['dubbelhelix', 'double helix'], title: { nl: 'De dubbelhelix', en: 'The double helix' }, text: { nl: 'DNA bestaat uit twee strengen die om elkaar heen draaien, als een wenteltrap. In de cel draait de helix naar rechts.', en: 'DNA consists of two strands twisting around each other, like a spiral staircase. In the cell the helix turns right.' } },
        2: { tag: ['ruggengraat', 'backbone'], title: { nl: 'De suiker-fosfaatruggengraat', en: 'The sugar-phosphate backbone' }, text: { nl: 'Buiten wisselen suiker en fosfaat elkaar af: de ruggengraat. Elk fosfaat is negatief geladen.', en: 'On the outside, sugar and phosphate alternate: the backbone. Each phosphate is negatively charged.' } },
        3: { tag: ['basenparen', 'base pairs'], title: { nl: 'Basenparen binnenin', en: 'Base pairs inside' }, text: { nl: 'Binnenin zitten de platte basen in paren: A met T, G met C. Ze liggen op elkaar gestapeld.', en: 'Inside, the flat bases sit in pairs: A with T, G with C. They are stacked on top of each other.' } },
        8: { tag: ['inzoomen', 'zoom in'], title: { nl: 'Verder inzoomen of doorgaan', en: 'Zoom in or move on' }, text: { nl: 'Klik op een onderdeel om in te zoomen. Daarna: hoe een gen in dit DNA wordt aangezet.', en: 'Click a part to zoom in. Then: how a gene in this DNA is switched on.' } },
      },
    },
  },

  'dnavormen': {
    hobby: {
      kort: { nl: 'De gedraaide DNA-ladder kan een paar verschillende vormen aannemen: A, B en Z. In de cel heeft bijna al het DNA de gewone B-vorm. De bredere A-vorm en de naar links draaiende Z-vorm zie je alleen in speciale gevallen.', en: 'The twisted DNA ladder can take a few different shapes: A, B and Z. In the cell, almost all DNA has the normal B shape. The wider A shape and the left-turning Z shape only show up in special cases.' },
      steps: {
        0: { tag: ['drie vormen', 'three forms'], title: { nl: 'Eén draad, drie vormen', en: 'One molecule, three shapes' }, text: { nl: 'Dezelfde dubbele DNA-draad kan verschillende vormen aannemen. Hier zie je er drie naast elkaar: A, B en Z.', en: 'The same double DNA strand can take different shapes. Here you see three side by side: A, B and Z.' } },
        1: { tag: ['B-vorm', 'B shape'], title: { nl: 'B: de gewone vorm', en: 'B: the normal shape' }, text: { nl: 'De gewone vorm draait naar rechts, als een wenteltrap. Langs de zijkant loopt een brede, diepe gleuf.', en: 'The normal shape turns to the right, like a spiral staircase. A wide, deep groove runs along its side.' } },
        7: { tag: ['waar', 'where'], title: { nl: 'Waar zie je welke vorm?', en: 'Where do you find each shape?' }, text: { nl: 'B: bijna al het DNA. A: dubbel RNA, of RNA dat aan DNA vastzit. Z: bepaalde stukjes DNA, in speciale omstandigheden.', en: 'B: almost all DNA. A: double RNA, or RNA paired to DNA. Z: certain bits of DNA, under special conditions.' } },
        8: { tag: ['3D bekijken', 'view in 3D'], title: { nl: 'Bekijk ze in 3D', en: 'See them in 3D' }, text: { nl: 'Open de 3D-bibliotheek om de echte vormen zelf rond te draaien en te meten.', en: 'Open the 3D library to turn and measure the real shapes yourself.' } },
      },
    },
    secundair: {
      kort: { nl: 'Dezelfde DNA-dubbelhelix kan verschillende conformaties aannemen. B-DNA is de gewone rechtsdraaiende vorm in de cel. A-DNA is korter en breder, typisch voor dubbelstrengig RNA en RNA–DNA-hybriden; Z-DNA draait naar links met een zigzaggende ruggengraat.', en: 'The same DNA double helix can take different conformations. B-DNA is the normal right-handed form in the cell. A-DNA is shorter and wider, typical of double-stranded RNA and RNA–DNA hybrids; Z-DNA is left-handed with a zigzag backbone.' },
      terms: [
        [{ nl: 'conformatie', en: 'conformation' }, { nl: 'De ruimtelijke vorm die een molecule aanneemt.', en: 'The 3D shape a molecule takes.' }],
        [{ nl: 'B-DNA', en: 'B-DNA' }, { nl: 'De gewone, rechtsdraaiende vorm van bijna al het DNA in de cel.', en: 'The normal right-handed form of almost all DNA in the cell.' }],
        [{ nl: 'A-DNA', en: 'A-DNA' }, { nl: 'Een kortere, bredere rechtsdraaiende vorm, typisch voor dubbel RNA.', en: 'A shorter, wider right-handed form, typical of double RNA.' }],
        [{ nl: 'Z-DNA', en: 'Z-DNA' }, { nl: 'Een linksdraaiende vorm met een zigzaggende ruggengraat.', en: 'A left-handed form with a zigzag backbone.' }],
      ],
      steps: {
        0: { tag: ['conformaties', 'conformations'], title: { nl: 'Eén molecule, drie conformaties', en: 'One molecule, three conformations' }, text: { nl: 'Dezelfde dubbelhelix kan verschillende vormen aannemen. Hier drie op dezelfde schaal: A-, B- en Z-DNA.', en: 'The same double helix can take different forms. Here are three at the same scale: A-, B- and Z-DNA.' } },
        1: { tag: ['B-DNA', 'B-DNA'], title: { nl: 'B-DNA: de gewone vorm', en: 'B-DNA: the normal form' }, text: { nl: 'B-DNA draait naar rechts. De grote groef is breed en diep.', en: 'B-DNA turns to the right. The major groove is wide and deep.' } },
        7: { tag: ['voorkomen', 'occurrence'], title: { nl: 'Waar komt welke vorm voor?', en: 'Where does each form occur?' }, text: { nl: 'B: bijna al het DNA. A: dubbelstrengig RNA en RNA–DNA-hybriden. Z: bepaalde CG-reeksen, in speciale omstandigheden.', en: 'B: almost all DNA. A: double-stranded RNA and RNA–DNA hybrids. Z: certain CG repeats, under special conditions.' } },
        8: { tag: ['3D bekijken', 'view in 3D'], title: { nl: 'Bekijk ze in 3D', en: 'View them in 3D' }, text: { nl: 'Open de 3D-bibliotheek om de echte structuren zelf te draaien en te meten.', en: 'Open the 3D library to rotate and measure the real structures yourself.' } },
      },
    },
  },

  'noncanon': {
    hobby: {
      kort: { nl: 'Op sommige plekken kan DNA even een andere vorm aannemen dan de gewone gedraaide ladder, bijvoorbeeld een vierkantje van vier G’s. Dat gebeurt vooral bij stukken met veel G’s, zoals aan de uiteinden van chromosomen. Zulke vormen kunnen het lezen en kopiëren van DNA beïnvloeden.', en: 'In some places DNA can briefly take a shape other than the normal twisted ladder, such as a little square of four Gs. This happens mostly in stretches with many Gs, like at the ends of chromosomes. Such shapes can affect how DNA is read and copied.' },
      steps: {
        0: { tag: ['andere vormen', 'other shapes'], title: { nl: 'Niet altijd een gewone ladder', en: 'Not always a normal ladder' }, text: { nl: 'Sommige stukjes DNA kunnen op één plek een andere vorm aannemen dan de gewone gedraaide ladder.', en: 'Some bits of DNA can locally take a different shape than the normal twisted ladder.' } },
        1: { tag: ['vier G’s', 'four Gs'], title: { nl: 'Vier G’s in een vierkant', en: 'Four Gs in a square' }, text: { nl: 'Vier G’s vormen samen een plat vierkantje. Ze houden elkaar vast met kleine bruggetjes.', en: 'Four Gs together form a flat little square. They hold on to each other with tiny bridges.' } },
        4: { tag: ['waar', 'where'], title: { nl: 'Waar in de cel?', en: 'Where in the cell?' }, text: { nl: 'Vooral aan de uiteinden van chromosomen en aan het begin van sommige genen. Eiwitten vouwen ze weer open.', en: 'Mostly at the ends of chromosomes and at the start of some genes. Proteins unfold them again.' } },
        9: { tag: ['verder kijken', 'explore more'], title: { nl: 'Verder verkennen', en: 'Explore further' }, text: { nl: 'Bekijk deze vormen in 3D, of ga verder naar de uiteinden van chromosomen en naar hoe de DNA-letters paren.', en: 'See these shapes in 3D, or go on to the ends of chromosomes and to how DNA letters pair up.' } },
      },
    },
    secundair: {
      kort: { nl: 'Sommige DNA-sequenties wijken plaatselijk af van de gewone dubbelhelix. G-rijke strengen vormen G-quadruplexen; er bestaan ook triplex-DNA, kruisvormen en i-motieven. Ze komen vooral voor in telomeren en kunnen het aflezen en kopiëren van DNA beïnvloeden.', en: 'Some DNA sequences locally differ from the normal double helix. G-rich strands form G-quadruplexes; there are also triplex DNA, cruciforms and i-motifs. They occur mostly in telomeres and can affect how DNA is read and copied.' },
      terms: [
        [{ nl: 'G-kwartet', en: 'G-quartet' }, { nl: 'Een plat vierkant van vier G’s die elkaar met waterstofbruggen vasthouden.', en: 'A flat square of four Gs held together by hydrogen bonds.' }],
        [{ nl: 'G-quadruplex', en: 'G-quadruplex' }, { nl: 'Een stapel G-kwartetten in een G-rijke streng.', en: 'A stack of G-quartets in a G-rich strand.' }],
        [{ nl: 'telomeer', en: 'telomere' }, { nl: 'Het uiteinde van een chromosoom.', en: 'The end of a chromosome.' }],
        [{ nl: 'triplex-DNA', en: 'triplex DNA' }, { nl: 'DNA waarbij een derde streng op de dubbelhelix ligt.', en: 'DNA in which a third strand lies on the double helix.' }],
      ],
      steps: {
        0: { tag: ['niet-canoniek', 'non-canonical'], title: { nl: 'Niet altijd een gewone helix', en: 'Not always a normal helix' }, text: { nl: 'Sommige stukken DNA nemen plaatselijk een andere vorm aan dan de gewone dubbelhelix: niet-canonieke structuren.', en: 'Some stretches of DNA locally take a shape other than the normal double helix: non-canonical structures.' } },
        1: { tag: ['G-kwartet', 'G-quartet'], title: { nl: 'Een G-kwartet', en: 'A G-quartet' }, text: { nl: 'Vier G’s vormen samen een plat vierkant: een G-kwartet. Ze houden elkaar vast met waterstofbruggen.', en: 'Four Gs together form a flat square: a G-quartet. They are held together by hydrogen bonds.' } },
        4: { tag: ['telomeren', 'telomeres'], title: { nl: 'Waar in de cel?', en: 'Where in the cell?' }, text: { nl: 'Vooral in telomeren, de uiteinden van chromosomen, en aan het begin van sommige genen. Enzymen vouwen ze weer open.', en: 'Mostly in telomeres, the ends of chromosomes, and at the start of some genes. Enzymes unfold them again.' } },
        9: { tag: ['verder kijken', 'explore more'], title: { nl: 'Verder verkennen', en: 'Explore further' }, text: { nl: 'Bekijk deze structuren in de 3D-bibliotheek, of ga naar telomeren en basenparing.', en: 'View these structures in the 3D library, or go to telomeres and base pairing.' } },
      },
    },
  },

  'basenparing': {
    hobby: {
      kort: { nl: 'In gewoon DNA past de letter A bij T, en G bij C, zoals puzzelstukjes. Beide paren zijn even breed, zodat elke volgorde in dezelfde ladder past. Zo kan elke draad dienen als voorbeeld voor de andere, bij het kopiëren én bij het maken van RNA.', en: 'In normal DNA, the letter A fits with T, and G fits with C, like puzzle pieces. Both pairs are equally wide, so any order fits in the same ladder. That way each strand can serve as a guide for the other, when copying and when making RNA.' },
      steps: {
        0: { tag: ['A met T', 'A with T'], title: { nl: 'A past bij T', en: 'A fits with T' }, text: { nl: 'De grote A, met twee ringen, past bij de kleine T, met één ring. Twee bruggetjes houden ze samen.', en: 'The big A, with two rings, fits with the small T, with one ring. Two tiny bridges hold them together.' } },
        1: { tag: ['G met C', 'G with C'], title: { nl: 'G past bij C', en: 'G fits with C' }, text: { nl: 'G past bij C, met drie bruggetjes. DNA met veel G en C gaat moeilijker open.', en: 'G fits with C, with three tiny bridges. DNA with lots of G and C is harder to open.' } },
        4: { tag: ['evenveel', 'equal amounts'], title: { nl: 'Evenveel A als T, G als C', en: 'As much A as T, G as C' }, text: { nl: 'In DNA is er evenveel A als T, en evenveel G als C. Bij de mens is iets minder dan de helft van de letters G of C.', en: 'DNA has as much A as T, and as much G as C. In humans, a bit less than half of the letters are G or C.' } },
        8: { tag: ['samenvatting', 'summary'], title: { nl: 'Kort samengevat', en: 'In short' }, text: { nl: 'De gewone paren A–T en G–C bouwen de ladder. Andere paren zijn ook mogelijk en geven andere vormen.', en: 'The normal pairs A–T and G–C build the ladder. Other pairings are also possible and give other shapes.' } },
      },
    },
    secundair: {
      kort: { nl: 'In DNA paart A met T via twee waterstofbruggen en G met C via drie. Een purine paart altijd met een pyrimidine, dus beide paren zijn even breed. Zo dient elke streng als mal voor de andere, bij replicatie en bij het maken van RNA.', en: 'In DNA, A pairs with T through two hydrogen bonds and G with C through three. A purine always pairs with a pyrimidine, so both pairs are equally wide. That way each strand serves as a template for the other, in replication and in making RNA.' },
      terms: [
        [{ nl: 'basenpaar', en: 'base pair' }, { nl: 'Twee basen die tegenover elkaar liggen: A met T of G met C.', en: 'Two bases facing each other: A with T or G with C.' }],
        [{ nl: 'waterstofbrug', en: 'hydrogen bond' }, { nl: 'Een zwakke binding die de twee basen van een paar samenhoudt.', en: 'A weak bond that holds the two bases of a pair together.' }],
        [{ nl: 'purine', en: 'purine' }, { nl: 'Een base met twee ringen: A of G.', en: 'A base with two rings: A or G.' }],
        [{ nl: 'pyrimidine', en: 'pyrimidine' }, { nl: 'Een base met één ring: C, T of U.', en: 'A base with one ring: C, T or U.' }],
      ],
      steps: {
        0: { tag: ['A–T', 'A–T'], title: { nl: 'A paart met T', en: 'A pairs with T' }, text: { nl: 'A, een purine met twee ringen, paart met T, een pyrimidine met één ring, via twee waterstofbruggen.', en: 'A, a purine with two rings, pairs with T, a pyrimidine with one ring, through two hydrogen bonds.' } },
        1: { tag: ['G–C', 'G–C'], title: { nl: 'G paart met C', en: 'G pairs with C' }, text: { nl: 'G paart met C via drie waterstofbruggen. GC-rijk DNA gaat moeilijker open, vooral omdat GC-paren beter stapelen.', en: 'G pairs with C through three hydrogen bonds. GC-rich DNA opens less easily, mainly because GC pairs stack better.' } },
        4: { tag: ['evenveel', 'equal amounts'], title: { nl: 'Evenveel A als T, G als C', en: 'As much A as T, G as C' }, text: { nl: 'In DNA is er evenveel A als T, en evenveel G als C, omdat ze in paren voorkomen.', en: 'DNA has as much A as T, and as much G as C, because they occur in pairs.' } },
        8: { tag: ['samenvatting', 'summary'], title: { nl: 'Kort samengevat', en: 'In short' }, text: { nl: 'De gewone basenparen A–T en G–C bouwen de helix. Andere paringen maken andere structuren mogelijk.', en: 'The normal base pairs A–T and G–C build the helix. Other pairings make other structures possible.' } },
      },
    },
  },

  'nucleotide': {
    hobby: {
      kort: { nl: 'DNA en RNA zijn gemaakt van kleine bouwsteentjes, aan elkaar geregen als kralen. Elk bouwsteentje heeft drie delen: een letter, een suiker en een fosfaat, een klein groepje. Samen vormen ze een lange draad met een vaste richting.', en: 'DNA and RNA are made of small building blocks, strung together like beads. Each block has three parts: a letter, a sugar and a phosphate, a small group of atoms. Together they form a long strand with a fixed direction.' },
      steps: {
        0: { tag: ['drie delen', 'three parts'], title: { nl: 'Drie onderdelen', en: 'Three parts' }, text: { nl: 'Elk bouwsteentje heeft drie delen: een letter, een suiker en een fosfaat.', en: 'Each building block has three parts: a letter, a sugar and a phosphate.' } },
        4: { tag: ['ringen', 'rings'], title: { nl: 'Grote en kleine letters', en: 'Big and small letters' }, text: { nl: 'A en G hebben twee ringen, C, T en U maar één. RNA gebruikt U in plaats van T.', en: 'A and G have two rings, C, T and U only one. RNA uses U instead of T.' } },
        6: { tag: ['aan elkaar', 'linking up'], title: { nl: 'Bouwsteentjes aan elkaar', en: 'Linking the blocks' }, text: { nl: 'Het fosfaat verbindt de suiker van het ene bouwsteentje met die van het volgende. Zo krijgt de draad een vaste richting.', en: 'The phosphate links the sugar of one block to the sugar of the next. This gives the strand a fixed direction.' } },
        9: { tag: ['naar de ladder', 'to the ladder'], title: { nl: 'Op naar de gedraaide ladder', en: 'On to the twisted ladder' }, text: { nl: 'De letters van twee draden passen in paren bij elkaar en vormen samen de gedraaide ladder van DNA.', en: 'The letters of two strands fit together in pairs and form the twisted ladder of DNA.' } },
      },
    },
    secundair: {
      kort: { nl: 'Een nucleotide is de bouwsteen van DNA en RNA: een base, een suiker en een fosfaatgroep. A en G zijn purines, C, T en U pyrimidines. Nucleotiden worden via suiker en fosfaat aan elkaar geschakeld tot een streng met een vaste richting.', en: 'A nucleotide is the building block of DNA and RNA: a base, a sugar and a phosphate group. A and G are purines, C, T and U pyrimidines. Nucleotides are linked through sugar and phosphate into a strand with a fixed direction.' },
      terms: [
        [{ nl: 'nucleotide', en: 'nucleotide' }, { nl: 'De bouwsteen van DNA en RNA: base, suiker en fosfaat.', en: 'The building block of DNA and RNA: base, sugar and phosphate.' }],
        [{ nl: 'base', en: 'base' }, { nl: 'Het deel dat de letter vormt: A, C, G, T of U.', en: 'The part that forms the letter: A, C, G, T or U.' }],
        [{ nl: 'purine en pyrimidine', en: 'purine and pyrimidine' }, { nl: 'Basen met twee ringen, A en G, en basen met één ring, C, T en U.', en: 'Bases with two rings, A and G, and bases with one ring, C, T and U.' }],
        [{ nl: 'fosfodiësterbinding', en: 'phosphodiester bond' }, { nl: 'De binding via een fosfaat tussen de suikers van twee nucleotiden.', en: 'The bond through a phosphate between the sugars of two nucleotides.' }],
      ],
      steps: {
        0: { tag: ['nucleotide', 'nucleotide'], title: { nl: 'Drie onderdelen van een nucleotide', en: 'Three parts of a nucleotide' }, text: { nl: 'Een nucleotide heeft drie delen: een base (de letter), een suiker en een fosfaatgroep.', en: 'A nucleotide has three parts: a base (the letter), a sugar and a phosphate group.' } },
        4: { tag: ['twee soorten', 'two kinds'], title: { nl: 'Purines en pyrimidines', en: 'Purines and pyrimidines' }, text: { nl: 'A en G (purines) hebben twee ringen; C, T en U (pyrimidines) één. RNA gebruikt U in plaats van T.', en: 'A and G (purines) have two rings; C, T and U (pyrimidines) one. RNA uses U instead of T.' } },
        6: { tag: ['streng', 'strand'], title: { nl: 'Nucleotiden vormen een streng', en: 'Nucleotides form a strand' }, text: { nl: 'Een fosfaat verbindt de suiker van het ene nucleotide met die van het volgende: een fosfodiësterbinding. Zo krijgt de streng een richting.', en: 'A phosphate links the sugar of one nucleotide to the next: a phosphodiester bond. This gives the strand a direction.' } },
        9: { tag: ['dubbelhelix', 'double helix'], title: { nl: 'Op naar de dubbelhelix', en: 'On to the double helix' }, text: { nl: 'Nucleotiden van twee strengen paren via hun basen en vormen samen de dubbelhelix.', en: 'Nucleotides of two strands pair through their bases and together form the double helix.' } },
      },
    },
  },

  'supercoiling': {
    hobby: {
      kort: { nl: 'DNA is een gedraaide draad. Als de uiteinden vastzitten, kan het te strak of te los gedraaid raken, en dan gaat het kronkelen, zoals een gedraaid telefoonsnoer. Speciale eiwitten knippen het DNA even door om die spanning weg te nemen.', en: 'DNA is a twisted thread. If its ends are held in place, it can get wound too tight or too loose, and then it coils up, like a twisted phone cord. Special proteins briefly cut the DNA to release that tension.' },
      steps: {
        0: { tag: ['vaste uiteinden', 'fixed ends'], title: { nl: 'De uiteinden zitten vast', en: 'The ends are held in place' }, text: { nl: 'Het DNA zit vast in lussen, dus de uiteinden kunnen niet vrij ronddraaien.', en: 'The DNA is held in loops, so its ends cannot spin freely.' } },
        3: { tag: ['kronkelen', 'coiling'], title: { nl: 'Het DNA gaat kronkelen', en: 'The DNA coils up' }, text: { nl: 'DNA wil zijn gewone draaiing houden. Daarom gaat het als geheel kronkelen, zoals een telefoonsnoer.', en: 'DNA wants to keep its normal twist. So the whole thing coils up, like a phone cord.' } },
        5: { tag: ['strak en los', 'tight and loose'], title: { nl: 'Strak ervoor, los erachter', en: 'Tight in front, loose behind' }, text: { nl: 'De machine die RNA maakt, kan niet rond het DNA draaien. Ervoor raakt het DNA te strak gedraaid, erachter te los.', en: 'The machine that makes RNA cannot spin around the DNA. In front of it the DNA gets too tight, behind it too loose.' } },
        8: { tag: ['samenvatting', 'summary'], title: { nl: 'Kort samengevat', en: 'In short' }, text: { nl: 'Speciale eiwitten houden de spanning in het DNA in balans. Sommige medicijnen tegen kanker remmen ze.', en: 'Special proteins keep the tension in DNA in balance. Some cancer medicines block them.' } },
      },
    },
    secundair: {
      kort: { nl: 'Als de uiteinden van DNA niet vrij kunnen draaien, komt het onder torsiespanning: supercoiling. Het DNA gaat dan als geheel kronkelen. Topo-isomerasen nemen die spanning weg door DNA-strengen tijdelijk te knippen.', en: 'If the ends of DNA cannot rotate freely, it comes under torsional stress: supercoiling. The DNA then coils as a whole. Topoisomerases relieve that stress by cutting DNA strands temporarily.' },
      terms: [
        [{ nl: 'supercoiling', en: 'supercoiling' }, { nl: 'Het kronkelen van DNA dat te strak of te los gedraaid is.', en: 'The coiling of DNA that is wound too tight or too loose.' }],
        [{ nl: 'torsiespanning', en: 'torsional stress' }, { nl: 'Draaispanning in DNA waarvan de uiteinden vastzitten.', en: 'Twisting stress in DNA whose ends are held in place.' }],
        [{ nl: 'topo-isomerase I', en: 'topoisomerase I' }, { nl: 'Een enzym dat één DNA-streng tijdelijk knipt om spanning weg te nemen.', en: 'An enzyme that briefly cuts one DNA strand to relieve stress.' }],
        [{ nl: 'topo-isomerase II', en: 'topoisomerase II' }, { nl: 'Een enzym dat beide DNA-strengen tijdelijk knipt, met energie uit ATP.', en: 'An enzyme that briefly cuts both DNA strands, using energy from ATP.' }],
      ],
      steps: {
        0: { tag: ['vaste uiteinden', 'fixed ends'], title: { nl: 'De uiteinden zitten vast', en: 'The ends are held in place' }, text: { nl: 'DNA zit vast in lussen, dus de uiteinden kunnen niet vrij draaien. Zo kan er torsiespanning ontstaan.', en: 'DNA is held in loops, so its ends cannot rotate freely. This can build up torsional stress.' } },
        3: { tag: ['supercoiling', 'supercoiling'], title: { nl: 'Supercoiling: het DNA kronkelt', en: 'Supercoiling: the DNA coils' }, text: { nl: 'Draai je 2 slagen uit het DNA, dan wil het toch zijn gewone draaiing houden. Daarom kronkelt het als geheel, zoals een telefoonsnoer: supercoiling.', en: 'Unwind 2 turns and the DNA still wants its normal twist. So it coils as a whole, like a phone cord: supercoiling.' } },
        5: { tag: ['transcriptie', 'transcription'], title: { nl: 'Strak ervoor, los erachter', en: 'Tight in front, loose behind' }, text: { nl: 'RNA-polymerase kan niet rond het DNA draaien. Ervoor raakt het DNA te strak gedraaid, positieve supercoils, erachter te los.', en: 'RNA polymerase cannot spin around the DNA. In front, the DNA gets overwound, positive supercoils; behind, underwound.' } },
        8: { tag: ['topo-isomerasen', 'topoisomerases'], title: { nl: 'Topo-isomerasen houden balans', en: 'Topoisomerases keep the balance' }, text: { nl: 'Topo-isomerasen knippen DNA tijdelijk om de spanning in balans te houden. Sommige kankermedicijnen remmen ze.', en: 'Topoisomerases briefly cut DNA to keep the stress in balance. Some cancer drugs block them.' } },
      },
    },
  },

  'remodeler': {
    hobby: {
      kort: { nl: 'Het DNA ligt rond klosjes van eiwitten, en zo’n klosje kan een gen afdekken. Kleine eiwitmachines gebruiken energie om de klosjes opzij te schuiven of weg te nemen. Zo komt een stuk DNA vrij om gelezen te worden.', en: 'DNA is wound around spools of proteins, and such a spool can cover a gene. Small protein machines use energy to slide the spools aside or remove them. That frees a piece of DNA so it can be read.' },
      steps: {
        0: { tag: ['gen afgedekt', 'gene covered'], title: { nl: 'Een klosje kan een gen afdekken', en: 'A spool can cover a gene' }, text: { nl: 'DNA dat rond een klosje gewikkeld is, is moeilijk te lezen. Hier ligt er een op het begin van een gen.', en: 'DNA wound around a spool is hard to read. Here one sits on the start of a gene.' } },
        2: { tag: ['opschuiven', 'sliding'], title: { nl: 'Schuiven maakt het DNA vrij', en: 'Sliding frees the DNA' }, text: { nl: 'De machine trekt het DNA stukje voor stukje door. Zo schuift het klosje opzij en ligt het begin van het gen vrij.', en: 'The machine pulls the DNA through bit by bit. The spool slides aside and the start of the gene is free.' } },
        4: { tag: ['lezen', 'reading'], title: { nl: 'Vrij DNA kan gelezen worden', en: 'Free DNA can be read' }, text: { nl: 'Nu kan een eiwit dat genen aanzet, op het DNA gaan zitten.', en: 'Now a protein that switches genes on can sit down on the DNA.' } },
      },
    },
    secundair: {
      kort: { nl: 'Nucleosomen kunnen DNA afdekken. Chromatine-remodelers zijn eiwitmachines die met energie uit ATP nucleosomen verschuiven of verwijderen. Zo wordt het DNA toegankelijk, bijvoorbeeld voor een activator.', en: 'Nucleosomes can cover DNA. Chromatin remodelers are protein machines that use energy from ATP to slide or remove nucleosomes. This makes the DNA accessible, for example to an activator.' },
      terms: [
        [{ nl: 'nucleosoom', en: 'nucleosome' }, { nl: 'DNA gewikkeld rond histonen; het DNA is daar moeilijk af te lezen.', en: 'DNA wound around histones; that DNA is hard to read.' }],
        [{ nl: 'chromatine-remodeler', en: 'chromatin remodeler' }, { nl: 'Een eiwitmachine die nucleosomen verschuift of verwijdert.', en: 'A protein machine that slides or removes nucleosomes.' }],
        [{ nl: 'ATP', en: 'ATP' }, { nl: 'De energiedrager die de remodeler aandrijft.', en: 'The energy carrier that powers the remodeler.' }],
        [{ nl: 'activator', en: 'activator' }, { nl: 'Een eiwit dat op het DNA bindt en een gen aanzet.', en: 'A protein that binds DNA and switches a gene on.' }],
      ],
      steps: {
        0: { tag: ['nucleosoom', 'nucleosome'], title: { nl: 'Een nucleosoom kan een gen afdekken', en: 'A nucleosome can cover a gene' }, text: { nl: 'DNA rond een nucleosoom is moeilijk af te lezen. Hier ligt er een op het begin van een gen.', en: 'DNA around a nucleosome is hard to read. Here one sits on the start of a gene.' } },
        2: { tag: ['remodeler', 'remodeler'], title: { nl: 'De remodeler schuift het nucleosoom op', en: 'The remodeler slides the nucleosome' }, text: { nl: 'De remodeler trekt met energie uit ATP het DNA stukje voor stukje door. Zo schuift het nucleosoom opzij.', en: 'Using energy from ATP, the remodeler pulls the DNA through bit by bit. The nucleosome slides aside.' } },
        4: { tag: ['activator', 'activator'], title: { nl: 'Vrij DNA voor een activator', en: 'Free DNA for an activator' }, text: { nl: 'Nu kan een activator, een eiwit dat genen aanzet, op het vrije DNA binden.', en: 'Now an activator, a protein that switches genes on, can bind the free DNA.' } },
      },
    },
  },

  'lussen': {
    hobby: {
      kort: { nl: 'Het DNA in de kern ligt in lussen. Volgens het huidige idee trekt een ring van eiwitten het DNA door zich heen, tot hij een stop-eiwit raakt. Elke lus vormt een soort buurt waarin stukken DNA elkaar vaak raken.', en: 'The DNA in the nucleus lies in loops. According to the current idea, a ring of proteins pulls DNA through itself until it hits a stop protein. Each loop forms a kind of neighbourhood where pieces of DNA often touch.' },
      steps: {
        0: { tag: ['lussen', 'loops'], title: { nl: 'Het DNA ligt in lussen', en: 'The DNA lies in loops' }, text: { nl: 'In de kern ligt het DNA niet gestrekt, maar in lussen. Hoe ontstaat zo’n lus?', en: 'In the nucleus, DNA is not stretched out but lies in loops. How does such a loop form?' } },
        1: { tag: ['lus groeit', 'loop grows'], title: { nl: 'Een ring trekt een lus', en: 'A ring pulls a loop' }, text: { nl: 'Een ring van eiwitten grijpt het DNA en trekt het aan twee kanten door zich heen. Zo groeit een lus.', en: 'A ring of proteins grabs the DNA and pulls it through itself on both sides. That is how a loop grows.' } },
        3: { tag: ['stop-eiwit', 'stop protein'], title: { nl: 'Een stop-eiwit houdt de ring tegen', en: 'A stop protein blocks the ring' }, text: { nl: 'Een stop-eiwit op het DNA houdt de ring tegen, maar alleen als het naar de ring toe wijst.', en: 'A stop protein on the DNA blocks the ring, but only if it points towards the ring.' } },
        5: { tag: ['buurten', 'neighbourhoods'], title: { nl: 'Elke lus vormt een buurt', en: 'Each loop forms a neighbourhood' }, text: { nl: 'Binnen een lus raken stukken DNA elkaar vaak, tussen twee lussen zelden. Zo ontstaan buurten.', en: 'Within a loop, pieces of DNA touch often, between two loops rarely. That creates neighbourhoods.' } },
      },
    },
    secundair: {
      kort: { nl: 'Volgens het lusextrusiemodel trekt de eiwitring cohesine het DNA tot lussen. De ring stopt bij CTCF, een eiwit dat op een richtingsgevoelige DNA-plaats bindt. Zo ontstaan domeinen, TADs, waarin DNA-stukken elkaar vaak raken.', en: 'According to the loop extrusion model, the protein ring cohesin pulls DNA into loops. The ring stops at CTCF, a protein that binds a direction-sensitive DNA site. This creates domains, TADs, in which pieces of DNA often touch.' },
      terms: [
        [{ nl: 'cohesine', en: 'cohesin' }, { nl: 'Een eiwitring die DNA tot lussen trekt.', en: 'A protein ring that pulls DNA into loops.' }],
        [{ nl: 'lusextrusie', en: 'loop extrusion' }, { nl: 'Het model waarin een ring DNA door zich heen trekt tot een lus groeit.', en: 'The model in which a ring pulls DNA through itself so a loop grows.' }],
        [{ nl: 'CTCF', en: 'CTCF' }, { nl: 'Een eiwit dat de ring tegenhoudt als het naar de ring wijst.', en: 'A protein that stops the ring when it points towards it.' }],
        [{ nl: 'TAD', en: 'TAD' }, { nl: 'Een domein waarin DNA-stukken elkaar vaak raken.', en: 'A domain in which pieces of DNA often touch.' }],
      ],
      steps: {
        0: { tag: ['lussen', 'loops'], title: { nl: 'Het DNA ligt in lussen', en: 'The DNA lies in loops' }, text: { nl: 'In de kern ligt het DNA niet gestrekt, maar in lussen. Hoe ontstaat zo’n lus?', en: 'In the nucleus, DNA is not stretched out but lies in loops. How does such a loop form?' } },
        1: { tag: ['lusextrusie', 'loop extrusion'], title: { nl: 'Cohesine trekt een lus', en: 'Cohesin pulls a loop' }, text: { nl: 'De eiwitring cohesine trekt het DNA aan twee kanten door zich heen. Zo groeit een lus: lusextrusie.', en: 'The protein ring cohesin pulls the DNA through itself on both sides. A loop grows: loop extrusion.' } },
        3: { tag: ['CTCF', 'CTCF'], title: { nl: 'CTCF houdt de ring tegen', en: 'CTCF stops the ring' }, text: { nl: 'CTCF op het DNA houdt cohesine tegen, maar alleen als het naar de ring wijst.', en: 'CTCF on the DNA stops cohesin, but only if it points towards the ring.' } },
        5: { tag: ['TADs', 'TADs'], title: { nl: 'Elke lus vormt een domein: een TAD', en: 'Each loop forms a domain: a TAD' }, text: { nl: 'Binnen een domein raken DNA-stukken elkaar vaak, tussen domeinen zelden. Zo’n domein heet een TAD.', en: 'Within a domain, pieces of DNA touch often, between domains rarely. Such a domain is called a TAD.' } },
      },
    },
  },

  'enhancer': {
    hobby: {
      kort: { nl: 'Een versterker is een stukje DNA dat een gen sterker aanzet. Hij kan ver van het gen liggen. Het DNA ertussen vormt dan een lus, zodat de versterker vlak naast het begin van het gen komt.', en: 'A booster is a bit of DNA that switches a gene on more strongly. It can lie far from the gene. The DNA in between then forms a loop, so the booster ends up right next to the start of the gene.' },
      steps: {
        0: { tag: ['startplek', 'start site'], title: { nl: 'Een gen begint bij een startplek', en: 'A gene begins at a start site' }, text: { nl: 'Aan het begin van een gen ligt een startplek. Daar kan het lezen beginnen, maar alleen gaat dat traag.', en: 'At the start of a gene lies a start site. Reading can begin there, but on its own it goes slowly.' } },
        1: { tag: ['versterker', 'booster'], title: { nl: 'Een versterker kan ver weg liggen', en: 'A booster can lie far away' }, text: { nl: 'Een versterker is een stukje DNA dat een gen sterker aanzet. Hij kan wel een miljoen letters verder liggen.', en: 'A booster is a bit of DNA that switches a gene on more strongly. It can lie as much as a million letters away.' } },
        3: { tag: ['lus', 'loop'], title: { nl: 'Een lus brengt de versterker naar het gen', en: 'A loop brings the booster to the gene' }, text: { nl: 'Het DNA ertussen vormt een lus. Zo komt de verre versterker vlak naast de startplek.', en: 'The DNA in between forms a loop. That brings the distant booster right next to the start site.' } },
      },
    },
    secundair: {
      kort: { nl: 'Een enhancer is een stukje DNA waarop activatoren binden en dat een gen sterker aanzet. Hij kan ver van het gen liggen. Een chromatinelus brengt hem naast de promoter, en het Mediator-complex geeft het signaal door aan RNA-polymerase.', en: 'An enhancer is a bit of DNA that activators bind to and that switches a gene on more strongly. It can lie far from the gene. A chromatin loop brings it next to the promoter, and the Mediator complex passes the signal on to RNA polymerase.' },
      terms: [
        [{ nl: 'enhancer', en: 'enhancer' }, { nl: 'Een DNA-stuk dat een gen sterker aanzet, ook van ver weg.', en: 'A piece of DNA that boosts a gene, even from far away.' }],
        [{ nl: 'activator', en: 'activator' }, { nl: 'Een eiwit dat op een enhancer bindt en het gen helpt aanzetten.', en: 'A protein that binds an enhancer and helps switch the gene on.' }],
        [{ nl: 'promoter', en: 'promoter' }, { nl: 'De startplaats van een gen, waar RNA-polymerase begint.', en: 'The start site of a gene, where RNA polymerase begins.' }],
        [{ nl: 'Mediator', en: 'Mediator' }, { nl: 'Een groot eiwitcomplex dat het signaal van de activatoren doorgeeft aan RNA-polymerase.', en: 'A large protein complex that passes the activators’ signal on to RNA polymerase.' }],
      ],
      steps: {
        0: { tag: ['promoter', 'promoter'], title: { nl: 'Een gen begint bij de promoter', en: 'A gene begins at the promoter' }, text: { nl: 'Aan het begin van een gen ligt de promoter. Daar kan RNA-polymerase starten, maar alleen gaat dat traag.', en: 'At the start of a gene lies the promoter. RNA polymerase can start there, but on its own it is slow.' } },
        1: { tag: ['enhancer', 'enhancer'], title: { nl: 'Een enhancer kan ver weg liggen', en: 'An enhancer can lie far away' }, text: { nl: 'Een enhancer is een DNA-stuk waarop activatoren binden. Hij zet een gen sterker aan, ook vanop grote afstand.', en: 'An enhancer is a piece of DNA that activators bind to. It boosts a gene, even from a great distance.' } },
        3: { tag: ['lus', 'looping'], title: { nl: 'Een lus brengt de enhancer naar de promoter', en: 'A loop brings the enhancer to the promoter' }, text: { nl: 'Het DNA ertussen vormt een lus. Zo komt de enhancer met zijn activatoren naast de promoter.', en: 'The DNA in between forms a loop. That brings the enhancer and its activators next to the promoter.' } },
      },
    },
  },

  'xinact': {
    hobby: {
      kort: { nl: 'Vrouwen hebben twee X-chromosomen, mannen één. Heel vroeg in de groei van een meisje zet elke cel bij toeval één X stil, en alle cellen die daaruit groeien, houden die keuze. Daardoor is een vrouw een soort lappendeken van cellen.', en: 'Women have two X chromosomes, men have one. Very early in a girl’s development, each cell switches off one X by chance, and all cells that grow from it keep that choice. So a woman is a kind of patchwork of cells.' },
      steps: {
        0: { tag: ['twee X', 'two X'], title: { nl: 'Twee X-chromosomen, maar één werkt', en: 'Two X chromosomes, but one works' }, text: { nl: 'Een vrouw heeft twee X-chromosomen, een man één. Toch werkt bij allebei maar één X volop.', en: 'A woman has two X chromosomes, a man one. Yet in both, only one X is fully active.' } },
        1: { tag: ['toeval', 'chance'], title: { nl: 'Elke cel kiest bij toeval één X', en: 'Each cell picks one X by chance' }, text: { nl: 'Heel vroeg in de ontwikkeling zet elke cel één X stil. Welke van de twee, is toeval.', en: 'Very early in development, each cell switches off one X. Which of the two is pure chance.' } },
        5: { tag: ['lapjeskat', 'calico cat'], title: { nl: 'Een lapjeskat toont het lappendeken', en: 'A calico cat shows the patchwork' }, text: { nl: 'Bij katten ligt een gen voor vachtkleur op het X. Waar het ene X werkt is de vacht oranje, waar het andere werkt zwart.', en: 'In cats, a gene for fur colour sits on the X. Where one X works the fur is orange, where the other works it is black.' } },
      },
    },
    secundair: {
      kort: { nl: 'Bij X-inactivatie zet elke vrouwelijke cel vroeg in het embryo willekeurig één X-chromosoom stil. Het XIST-RNA bedekt dat X, dat compact wordt: het Barr-lichaampje. Alle dochtercellen houden die keuze, dus een vrouw is een mozaïek.', en: 'In X inactivation, each female cell randomly silences one X chromosome early in the embryo. XIST RNA coats that X, which becomes compact: the Barr body. All daughter cells keep that choice, so a woman is a mosaic.' },
      terms: [
        [{ nl: 'X-inactivatie', en: 'X inactivation' }, { nl: 'Het stilzetten van één van de twee X-chromosomen in vrouwelijke cellen.', en: 'Silencing one of the two X chromosomes in female cells.' }],
        [{ nl: 'dosiscompensatie', en: 'dosage compensation' }, { nl: 'Zorgen dat vrouwen en mannen evenveel X-genen gebruiken.', en: 'Making sure females and males use the same amount of X genes.' }],
        [{ nl: 'XIST-RNA', en: 'XIST RNA' }, { nl: 'Een lang RNA dat het X bedekt dat stilgezet wordt.', en: 'A long RNA that coats the X that is being silenced.' }],
        [{ nl: 'Barr-lichaampje', en: 'Barr body' }, { nl: 'Het compacte, stille X zoals je het onder de microscoop ziet.', en: 'The compact, silent X as seen under the microscope.' }],
        [{ nl: 'mozaïek', en: 'mosaic' }, { nl: 'Een lichaam met groepen cellen waarin een ander X werkt.', en: 'A body with groups of cells in which a different X is active.' }],
      ],
      steps: {
        0: { tag: ['dosis', 'dosage'], title: { nl: 'Twee X-chromosomen, maar één werkt', en: 'Two X chromosomes, but one works' }, text: { nl: 'Een vrouw heeft twee X-chromosomen, een man één. Toch werkt bij allebei maar één X volop: dosiscompensatie.', en: 'A woman has two X chromosomes, a man one. Yet in both only one X is fully active: dosage compensation.' } },
        1: { tag: ['X-inactivatie', 'X inactivation'], title: { nl: 'Willekeurige X-inactivatie', en: 'Random X inactivation' }, text: { nl: 'Vroeg in het embryo zet elke cel willekeurig één X stil. Alle dochtercellen houden die keuze.', en: 'Early in the embryo, each cell randomly silences one X. All daughter cells keep that choice.' } },
        5: { tag: ['mozaïek', 'mosaic'], title: { nl: 'Een lapjeskat toont het mozaïek', en: 'A calico cat shows the mosaic' }, text: { nl: 'Bij katten ligt een gen voor vachtkleur op het X. Waar het ene X werkt is de vacht oranje, waar het andere werkt zwart.', en: 'In cats, a gene for fur colour sits on the X. Where one X is active the fur is orange, where the other is active it is black.' } },
      },
    },
  },

  'imprinting': {
    hobby: {
      kort: { nl: 'Van de meeste genen werken beide kopieën, die van je moeder en die van je vader. Bij ongeveer honderd genen werkt alleen de kopie van één ouder. Een labeltje uit de eicel of de zaadcel beslist welke.', en: 'For most genes, both copies work, the one from your mother and the one from your father. For about a hundred genes, only the copy from one parent works. A tag from the egg or the sperm decides which.' },
      steps: {
        0: { tag: ['twee kopieën', 'two copies'], title: { nl: 'Van elk gen heb je twee kopieën', en: 'You have two copies of each gene' }, text: { nl: 'Je krijgt één kopie van je moeder en één van je vader. Meestal werken ze allebei.', en: 'You get one copy from your mother and one from your father. Usually both work.' } },
        1: { tag: ['één werkt', 'one active'], title: { nl: 'Bij sommige genen werkt maar één kopie', en: 'For some genes only one copy works' }, text: { nl: 'Bij ongeveer honderd genen werkt alleen de kopie van de moeder, of alleen die van de vader.', en: 'For about a hundred genes, only the mother’s copy works, or only the father’s.' } },
        2: { tag: ['labeltje', 'tag'], title: { nl: 'Het labeltje komt uit eicel of zaadcel', en: 'The tag comes from egg or sperm' }, text: { nl: 'In de zaadcel of de eicel krijgt een stukje DNA labeltjes. Die blijven in de cellen van het lichaam van het kind.', en: 'In the sperm or the egg, a bit of DNA gets tags. They stay in the body cells of the child.' } },
      },
    },
    secundair: {
      kort: { nl: 'Bij genomische imprinting werkt bij een kleine groep genen alleen de kopie van één ouder. Dat wordt bepaald door DNA-methylatie op een imprintingcontroleregio, gezet in de eicel of de zaadcel. Die merktekens blijven na de bevruchting staan.', en: 'In genomic imprinting, for a small group of genes only the copy from one parent works. This is set by DNA methylation of an imprinting control region, placed in the egg or the sperm. These marks remain after fertilisation.' },
      terms: [
        [{ nl: 'allel', en: 'allele' }, { nl: 'Eén van de twee kopieën van een gen, van moeder of van vader.', en: 'One of the two copies of a gene, from mother or from father.' }],
        [{ nl: 'genomische imprinting', en: 'genomic imprinting' }, { nl: 'Alleen het allel van één ouder werkt, afhankelijk van de ouder.', en: 'Only one parent’s allele works, depending on which parent it came from.' }],
        [{ nl: 'DNA-methylatie', en: 'DNA methylation' }, { nl: 'Methylgroepen op het DNA die als merkteken werken.', en: 'Methyl groups on DNA that act as a mark.' }],
        [{ nl: 'imprintingcontroleregio', en: 'imprinting control region' }, { nl: 'Het stuk DNA waar het ouderlijke merkteken op staat.', en: 'The piece of DNA that carries the parental mark.' }],
      ],
      steps: {
        0: { tag: ['allelen', 'alleles'], title: { nl: 'Twee allelen van elk gen', en: 'Two alleles of each gene' }, text: { nl: 'Van elk gen krijg je één allel van je moeder en één van je vader. Meestal werken ze allebei.', en: 'For each gene you get one allele from your mother and one from your father. Usually both work.' } },
        1: { tag: ['imprinting', 'imprinting'], title: { nl: 'Bij sommige genen werkt maar één allel', en: 'For some genes only one allele works' }, text: { nl: 'Bij een kleine groep genen werkt alleen het moederlijke of alleen het vaderlijke allel: genomische imprinting.', en: 'For a small group of genes, only the maternal or only the paternal allele works: genomic imprinting.' } },
        2: { tag: ['methylatie', 'methylation'], title: { nl: 'Het merkteken komt uit eicel of zaadcel', en: 'The mark comes from egg or sperm' }, text: { nl: 'In de eicel of zaadcel krijgt een imprintingcontroleregio methylgroepen. Dat merkteken blijft in de lichaamscellen van het kind.', en: 'In the egg or sperm, an imprinting control region gets methyl groups. That mark stays in the child’s body cells.' } },
      },
    },
  },
};
