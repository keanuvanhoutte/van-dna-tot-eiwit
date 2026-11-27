/* Eenvoudige teksten voor de niveaus hobbyist en secundair (groep tl). Sleutels van steps = stapnummer in de animatie. */
export default {
  'translatie': {
    hobby: {
      kort: { nl: 'Hier zie je hoe de cel een eiwit bouwt volgens een bericht in RNA. Een fabriekje leest het bericht per drie letters en kleine helpers brengen telkens de juiste bouwsteen. Zo wordt een gen een werkend eiwit.', en: 'Here you see how the cell builds a protein from a message written in RNA. A tiny factory reads the message three letters at a time, and small helpers bring the right building block each time. That is how a gene becomes a working protein.' },
      steps: {
        0: { tag: ['het bericht', 'the message'], title: { nl: 'Het RNA-bericht', en: 'The RNA message' }, text: { nl: 'Alleen het middenstuk, tussen het startsein en het stopsein, wordt omgezet in een eiwit.', en: 'Only the middle part, between the start signal and the stop signal, is turned into a protein.' } },
        1: { tag: ['start', 'start'], title: { nl: 'Het fabriekje begint vooraan', en: 'The factory starts at the front' }, text: { nl: 'De kleine helft van het ribosoom, het fabriekje dat eiwitten bouwt, zet zich vooraan op het bericht, met een eerste helper.', en: 'The small half of the ribosome, the factory that builds proteins, sits down at the front of the message with a first helper.' } },
        5: { tag: ['helper komt', 'helper arrives'], title: { nl: 'Een helper brengt een bouwsteen', en: 'A helper brings a building block' }, text: { nl: 'Een kleine helper van RNA brengt de passende bouwsteen naar het fabriekje.', en: 'A small helper made of RNA brings the matching building block to the factory.' } },
        7: { tag: ['vastmaken', 'linking'], title: { nl: 'De bouwsteen wordt vastgemaakt', en: 'The building block is linked on' }, text: { nl: 'Het fabriekje hangt de ketting aan de nieuwe bouwsteen. Dat werk doet zijn eigen RNA.', en: 'The factory hooks the chain onto the new building block. Its own RNA does this job.' } },
        11: { tag: ['ketting groeit', 'chain grows'], title: { nl: 'De ketting groeit', en: 'The chain grows' }, text: { nl: 'Zo wordt het hele bericht gelezen. De ketting komt via een tunnel naar buiten en begint al te plooien.', en: 'This way the whole message is read. The chain comes out through a tunnel and already starts to fold.' } },
        12: { tag: ['stopsein', 'stop signal'], title: { nl: 'Stopsein: geen helper past', en: 'Stop signal: no helper fits' }, text: { nl: 'Bij het stopsein past geen helper. Een stop-eiwit dat op een helper lijkt, neemt zijn plaats in.', en: 'No helper fits the stop signal. A stop protein that looks like a helper takes its place.' } },
        13: { tag: ['eiwit los', 'protein free'], title: { nl: 'Het eiwit komt los', en: 'The protein comes free' }, text: { nl: 'Met behulp van water komt de ketting los. Het nieuwe eiwit is vrij en plooit in zijn vorm.', en: 'With the help of water the chain comes loose. The new protein is free and folds into its shape.' } },
      },
    },
    secundair: {
      kort: { nl: 'Bij translatie leest het ribosoom het mRNA per codon van drie letters. tRNA’s brengen telkens het passende aminozuur, dat met een peptidebinding aan de keten wordt gekoppeld. Zo wordt een gen een eiwit.', en: 'In translation the ribosome reads the mRNA one codon of three letters at a time. tRNAs bring the matching amino acid each time, which is linked to the chain by a peptide bond. That is how a gene becomes a protein.' },
      terms: [
        [{ nl: 'mRNA', en: 'mRNA' }, { nl: 'De boodschap met de bouwinstructie voor het eiwit.', en: 'The message with the building instructions for the protein.' }],
        [{ nl: 'codon', en: 'codon' }, { nl: 'Drie letters op het mRNA die samen één aminozuur of een stopsein betekenen.', en: 'Three letters on the mRNA that together mean one amino acid or a stop signal.' }],
        [{ nl: 'tRNA', en: 'tRNA' }, { nl: 'Klein RNA dat een aminozuur aanbrengt en met zijn anticodon op het codon past.', en: 'Small RNA that brings an amino acid and fits the codon with its anticodon.' }],
        [{ nl: 'ribosoom', en: 'ribosome' }, { nl: 'De machine uit RNA en eiwitten die het mRNA leest en de keten bouwt.', en: 'The machine of RNA and proteins that reads the mRNA and builds the chain.' }],
        [{ nl: 'peptidebinding', en: 'peptide bond' }, { nl: 'De binding die twee aminozuren in de keten verbindt.', en: 'The bond that links two amino acids in the chain.' }],
      ],
      steps: {
        0: { tag: ['mRNA', 'mRNA'], title: { nl: 'Het mRNA met de boodschap', en: 'The mRNA carries the message' }, text: { nl: 'Alleen het stuk van het startcodon AUG tot het stopcodon wordt vertaald in een eiwit.', en: 'Only the part from the start codon AUG to the stop codon is translated into a protein.' } },
        1: { tag: ['kleine subeenheid', 'small subunit'], title: { nl: 'Het ribosoom start vooraan', en: 'The ribosome starts at the front' }, text: { nl: 'De kleine subeenheid van het ribosoom bindt vooraan op het mRNA, samen met een eerste tRNA dat methionine draagt.', en: 'The small subunit of the ribosome binds at the front of the mRNA, together with a first tRNA carrying methionine.' } },
        5: { tag: ['tRNA', 'tRNA'], title: { nl: 'Een tRNA brengt een aminozuur', en: 'A tRNA brings an amino acid' }, text: { nl: 'Een tRNA brengt het passende aminozuur naar de A-plaats van het ribosoom. Zijn anticodon past op het codon.', en: 'A tRNA brings the matching amino acid to the A site of the ribosome. Its anticodon fits the codon.' } },
        7: { tag: ['peptidebinding', 'peptide bond'], title: { nl: 'Een peptidebinding wordt gevormd', en: 'A peptide bond is formed' }, text: { nl: 'Het ribosoom koppelt de keten aan het nieuwe aminozuur met een peptidebinding. Het rRNA zelf doet dat: het ribosoom is een ribozym.', en: 'The ribosome links the chain to the new amino acid with a peptide bond. The rRNA itself does this: the ribosome is a ribozyme.' } },
        11: { tag: ['keten groeit', 'chain grows'], title: { nl: 'De keten groeit codon per codon', en: 'The chain grows codon by codon' }, text: { nl: 'Zo worden alle codons gelezen. De keten verlaat het ribosoom via een tunnel en begint al te vouwen.', en: 'This way all codons are read. The chain leaves the ribosome through a tunnel and already starts to fold.' } },
        12: { tag: ['stopcodon', 'stop codon'], title: { nl: 'Stopcodon: geen tRNA past', en: 'Stop codon: no tRNA fits' }, text: { nl: 'Op een stopcodon past geen tRNA. Een release factor, een stopeiwit dat op een tRNA lijkt, neemt de A-plaats in.', en: 'No tRNA fits a stop codon. A release factor, a stop protein that looks like a tRNA, takes the A site.' } },
        13: { tag: ['eiwit los', 'release'], title: { nl: 'Het eiwit komt vrij', en: 'The protein is released' }, text: { nl: 'De release factor laat de keten loskomen van het laatste tRNA. Het eiwit komt vrij en vouwt.', en: 'The release factor frees the chain from the last tRNA. The protein is released and folds.' } },
      },
    },
  },
  'initiatie': {
    hobby: {
      kort: { nl: 'Dit is de start van het bouwen van een eiwit. Het fabriekje zoekt op het RNA-bericht het startsein en begint daar te lezen. Start het op de verkeerde plek, dan komt er een fout eiwit uit.', en: 'This is the start of building a protein. The factory looks for the start signal on the RNA message and begins reading there. If it starts in the wrong place, a faulty protein comes out.' },
      steps: {
        0: { tag: ['het bericht', 'the message'], title: { nl: 'Het RNA-bericht', en: 'The RNA message' }, text: { nl: 'Alleen het middenstuk, tussen het startsein en het stopsein, wordt omgezet in een eiwit.', en: 'Only the middle part, between the start signal and the stop signal, is turned into a protein.' } },
        1: { tag: ['start', 'start'], title: { nl: 'Het fabriekje zet zich vooraan', en: 'The factory sits down at the front' }, text: { nl: 'De kleine helft van het ribosoom, het fabriekje dat eiwitten bouwt, zet zich vooraan op het bericht, met een eerste helper.', en: 'The small half of the ribosome, the factory that builds proteins, sits down at the front of the message with a first helper.' } },
      },
    },
    secundair: {
      kort: { nl: 'De initiatie is de start van de translatie. De kleine subeenheid van het ribosoom zoekt op het mRNA het startcodon AUG; daarna komt de grote subeenheid erbij. Zo begint het lezen op de juiste plek.', en: 'Initiation is the start of translation. The small subunit of the ribosome looks for the start codon AUG on the mRNA; then the large subunit joins. That way reading starts in the right place.' },
      terms: [
        [{ nl: 'startcodon', en: 'start codon' }, { nl: 'Het codon AUG, waar het lezen begint; het staat voor methionine.', en: 'The codon AUG, where reading begins; it stands for methionine.' }],
        [{ nl: 'subeenheid', en: 'subunit' }, { nl: 'Het ribosoom bestaat uit een kleine en een grote subeenheid.', en: 'The ribosome is made of a small and a large subunit.' }],
        [{ nl: 'start-tRNA', en: 'initiator tRNA' }, { nl: 'Het eerste tRNA, met methionine, dat op het startcodon past.', en: 'The first tRNA, carrying methionine, which fits the start codon.' }],
      ],
      steps: {
        0: { tag: ['mRNA', 'mRNA'], title: { nl: 'Het mRNA met de boodschap', en: 'The mRNA carries the message' }, text: { nl: 'Alleen het stuk van het startcodon AUG tot het stopcodon wordt vertaald in een eiwit.', en: 'Only the part from the start codon AUG to the stop codon is translated into a protein.' } },
        1: { tag: ['kleine subeenheid', 'small subunit'], title: { nl: 'Het ribosoom start vooraan', en: 'The ribosome starts at the front' }, text: { nl: 'De kleine subeenheid bindt vooraan op het mRNA, samen met het start-tRNA dat methionine draagt.', en: 'The small subunit binds at the front of the mRNA, together with the initiator tRNA carrying methionine.' } },
      },
    },
  },
  'elongatie': {
    hobby: {
      kort: { nl: 'Hier groeit de ketting van het eiwit, stap voor stap. Telkens brengt een helper een bouwsteen, het fabriekje controleert of hij past en maakt hem vast. Daarna schuift het fabriekje drie letters op.', en: 'Here the protein chain grows, step by step. Each time a helper brings a building block, the factory checks that it fits and links it on. Then the factory moves on three letters.' },
      steps: {
        0: { tag: ['helper komt', 'helper arrives'], title: { nl: 'Een helper brengt een bouwsteen', en: 'A helper brings a building block' }, text: { nl: 'Een kleine helper van RNA brengt de passende bouwsteen naar het ribosoom, het fabriekje dat eiwitten bouwt.', en: 'A small helper made of RNA brings the matching building block to the ribosome, the factory that builds proteins.' } },
        2: { tag: ['vastmaken', 'linking'], title: { nl: 'De bouwsteen wordt vastgemaakt', en: 'The building block is linked on' }, text: { nl: 'Het fabriekje hangt de ketting aan de nieuwe bouwsteen. Dat werk doet zijn eigen RNA.', en: 'The factory hooks the chain onto the new building block. Its own RNA does this job.' } },
      },
    },
    secundair: {
      kort: { nl: 'De elongatie is de herhaalde ronde waarin de keten groeit. Een tRNA brengt een aminozuur, het ribosoom controleert of het past op het codon en vormt een peptidebinding. Daarna schuift het ribosoom één codon op.', en: 'Elongation is the repeated round in which the chain grows. A tRNA brings an amino acid, the ribosome checks that it fits the codon and forms a peptide bond. Then the ribosome moves on by one codon.' },
      terms: [
        [{ nl: 'elongatie', en: 'elongation' }, { nl: 'De herhaalde ronde die de keten met één aminozuur per codon verlengt.', en: 'The repeated round that adds one amino acid per codon to the chain.' }],
        [{ nl: 'A-plaats', en: 'A site' }, { nl: 'De plek in het ribosoom waar een nieuw tRNA binnenkomt.', en: 'The spot in the ribosome where a new tRNA comes in.' }],
        [{ nl: 'peptidebinding', en: 'peptide bond' }, { nl: 'De binding die twee aminozuren in de keten verbindt.', en: 'The bond that links two amino acids in the chain.' }],
        [{ nl: 'translocatie', en: 'translocation' }, { nl: 'Het ribosoom schuift één codon verder op het mRNA.', en: 'The ribosome moves one codon further along the mRNA.' }],
      ],
      steps: {
        0: { tag: ['tRNA', 'tRNA'], title: { nl: 'Een tRNA brengt een aminozuur', en: 'A tRNA brings an amino acid' }, text: { nl: 'Een hulpeiwit brengt een tRNA met zijn aminozuur naar de A-plaats. Zijn anticodon moet op het codon passen.', en: 'A helper protein brings a tRNA with its amino acid to the A site. Its anticodon has to fit the codon.' } },
        2: { tag: ['peptidebinding', 'peptide bond'], title: { nl: 'Een peptidebinding wordt gevormd', en: 'A peptide bond is formed' }, text: { nl: 'Het ribosoom koppelt de keten aan het nieuwe aminozuur met een peptidebinding. Het rRNA zelf doet dat: het ribosoom is een ribozym.', en: 'The ribosome links the chain to the new amino acid with a peptide bond. The rRNA itself does this: the ribosome is a ribozyme.' } },
      },
    },
  },
  'terminatie': {
    hobby: {
      kort: { nl: 'Dit is het einde van het bouwen van een eiwit. Bij het stopsein past geen helper; een stop-eiwit komt in de plaats en laat de afgewerkte ketting los. Daarna valt het fabriekje uit elkaar, zodat het opnieuw kan dienen.', en: 'This is the end of building a protein. No helper fits the stop signal; a stop protein takes its place and lets the finished chain go. Then the factory falls apart, so it can be used again.' },
      steps: {
        0: { tag: ['stopsein', 'stop signal'], title: { nl: 'Stopsein: geen helper past', en: 'Stop signal: no helper fits' }, text: { nl: 'Bij het stopsein past geen helper. Een stop-eiwit dat op een helper lijkt, gaat op zijn plaats in het fabriekje zitten.', en: 'No helper fits the stop signal. A stop protein that looks like a helper takes its place in the factory.' } },
        1: { tag: ['eiwit los', 'protein free'], title: { nl: 'Het eiwit komt los', en: 'The protein comes free' }, text: { nl: 'Met behulp van water komt de ketting los. Het nieuwe eiwit is vrij en plooit in zijn vorm.', en: 'With the help of water the chain comes loose. The new protein is free and folds into its shape.' } },
      },
    },
    secundair: {
      kort: { nl: 'De terminatie is het einde van de translatie. Op een stopcodon past geen tRNA; een release factor bindt en laat de keten los. Daarna valt het ribosoom uiteen, zodat het opnieuw gebruikt kan worden.', en: 'Termination is the end of translation. No tRNA fits a stop codon; a release factor binds and frees the chain. Then the ribosome comes apart, so it can be used again.' },
      terms: [
        [{ nl: 'stopcodon', en: 'stop codon' }, { nl: 'UAA, UAG of UGA: codons waarvoor geen tRNA bestaat.', en: 'UAA, UAG or UGA: codons for which no tRNA exists.' }],
        [{ nl: 'release factor', en: 'release factor' }, { nl: 'Stopeiwit dat op een tRNA lijkt en de keten laat loskomen.', en: 'Stop protein that looks like a tRNA and frees the chain.' }],
        [{ nl: 'recyclage', en: 'recycling' }, { nl: 'Het ribosoom valt uiteen en kan daarna een nieuw eiwit maken.', en: 'The ribosome comes apart and can then make a new protein.' }],
      ],
      steps: {
        0: { tag: ['stopcodon', 'stop codon'], title: { nl: 'Stopcodon: geen tRNA past', en: 'Stop codon: no tRNA fits' }, text: { nl: 'Op een stopcodon past geen tRNA. Een release factor, een stopeiwit dat op een tRNA lijkt, neemt de A-plaats in.', en: 'No tRNA fits a stop codon. A release factor, a stop protein that looks like a tRNA, takes the A site.' } },
        1: { tag: ['eiwit los', 'release'], title: { nl: 'Het eiwit komt vrij', en: 'The protein is released' }, text: { nl: 'De release factor laat de keten loskomen van het laatste tRNA. Het eiwit komt vrij en vouwt.', en: 'The release factor frees the chain from the last tRNA. The protein is released and folds.' } },
      },
    },
  },
  'ribosoom': {
    hobby: {
      kort: { nl: 'Het ribosoom is het fabriekje in de cel dat eiwitten bouwt. Het heeft een kleine en een grote helft, gemaakt van RNA en eiwitten. Het vastmaken van de bouwstenen doet het RNA zelf.', en: 'The ribosome is the little factory in the cell that builds proteins. It has a small and a large half, made of RNA and proteins. The RNA itself links the building blocks together.' },
      steps: {
        0: { tag: ['eiwitfabriek', 'protein factory'], title: { nl: 'Het eiwitfabriekje van de mens', en: 'The human protein factory' }, text: { nl: 'Het fabriekje is gemaakt van RNA en zo’n tachtig eiwitten. Deze vorm komt van het echte ribosoom, in 3D.', en: 'The factory is made of RNA and about eighty proteins. This shape comes from the real ribosome, in 3D.' } },
        1: { tag: ['twee helften', 'two halves'], title: { nl: 'Twee helften: klein en groot', en: 'Two halves: small and large' }, text: { nl: 'Een kleine en een grote helft passen op elkaar en vormen samen één fabriekje.', en: 'A small and a large half fit together and form one factory.' } },
        3: { tag: ['houdt bericht', 'holds message'], title: { nl: 'De kleine helft houdt het bericht', en: 'The small half holds the message' }, text: { nl: 'De kleine helft houdt het RNA-bericht vast en controleert of elke helper goed past.', en: 'The small half holds the RNA message and checks that each helper fits well.' } },
        4: { tag: ['grote helft', 'large half'], title: { nl: 'De grote helft maakt vast', en: 'The large half links' }, text: { nl: 'De grote helft bevat drie stukken RNA en maakt de bouwstenen aan elkaar vast.', en: 'The large half contains three pieces of RNA and links the building blocks together.' } },
      },
    },
    secundair: {
      kort: { nl: 'Het ribosoom is de machine die eiwitten bouwt. Het bestaat uit een kleine en een grote subeenheid, gemaakt van rRNA en eiwitten. Het koppelen van aminozuren doet het rRNA zelf: het ribosoom is een ribozym.', en: 'The ribosome is the machine that builds proteins. It consists of a small and a large subunit, made of rRNA and proteins. The rRNA itself links the amino acids: the ribosome is a ribozyme.' },
      terms: [
        [{ nl: 'ribosoom', en: 'ribosome' }, { nl: 'De machine uit rRNA en eiwitten die het mRNA leest en eiwitten bouwt.', en: 'The machine of rRNA and proteins that reads the mRNA and builds proteins.' }],
        [{ nl: 'subeenheid', en: 'subunit' }, { nl: 'Een van de twee delen van het ribosoom: een kleine en een grote.', en: 'One of the two parts of the ribosome: a small one and a large one.' }],
        [{ nl: 'rRNA', en: 'rRNA' }, { nl: 'Ribosomaal RNA: het RNA in het ribosoom.', en: 'Ribosomal RNA: the RNA in the ribosome.' }],
        [{ nl: 'ribozym', en: 'ribozyme' }, { nl: 'Een RNA dat zelf een reactie uitvoert, zoals een enzym.', en: 'An RNA that carries out a reaction itself, like an enzyme.' }],
      ],
      steps: {
        0: { tag: ['ribosoom', 'ribosome'], title: { nl: 'Het menselijke ribosoom', en: 'The human ribosome' }, text: { nl: 'De eiwitfabriek van de cel, uit rRNA en veel eiwitten. De vorm komt uit een echte 3D-structuur.', en: 'The protein factory of the cell, made of rRNA and many proteins. The shape comes from a real 3D structure.' } },
        1: { tag: ['subeenheden', 'subunits'], title: { nl: 'Twee subeenheden: klein en groot', en: 'Two subunits: small and large' }, text: { nl: 'Een kleine en een grote subeenheid vormen samen het ribosoom.', en: 'A small and a large subunit together form the ribosome.' } },
        3: { tag: ['kleine subeenheid', 'small subunit'], title: { nl: 'De kleine subeenheid houdt het mRNA', en: 'The small subunit holds the mRNA' }, text: { nl: 'De kleine subeenheid houdt het mRNA vast en controleert of het tRNA goed op het codon past.', en: 'The small subunit holds the mRNA and checks that the tRNA fits the codon properly.' } },
        4: { tag: ['grote subeenheid', 'large subunit'], title: { nl: 'De grote subeenheid koppelt', en: 'The large subunit links' }, text: { nl: 'De grote subeenheid bevat drie rRNA’s en vormt de peptidebinding tussen de aminozuren.', en: 'The large subunit contains three rRNAs and forms the peptide bond between the amino acids.' } },
      },
    },
  },
  'trna': {
    hobby: {
      kort: { nl: 'Een tRNA is een klein stukje RNA dat werkt als tolk. Aan de ene kant past het op drie letters van het RNA-bericht, aan de andere kant draagt het de bijpassende bouwsteen. Zo verbindt het de taal van RNA met die van eiwit.', en: 'A tRNA is a small piece of RNA that works as an interpreter. On one side it fits three letters of the RNA message, on the other side it carries the matching building block. That way it links the language of RNA to the language of protein.' },
      steps: {
        0: { tag: ['tolk', 'interpreter'], title: { nl: 'Het tRNA: de tolk', en: 'The tRNA: the interpreter' }, text: { nl: 'Een kort stukje RNA dat drie letters van het bericht koppelt aan de juiste bouwsteen van een eiwit.', en: 'A short piece of RNA that links three letters of the message to the right building block of a protein.' } },
        1: { tag: ['klaverblad', 'cloverleaf'], title: { nl: 'Een klaverblad met vier armen', en: 'A cloverleaf with four arms' }, text: { nl: 'Het stukje RNA plakt deels aan zichzelf vast. Plat getekend lijkt het op een klaverblad met vier armen.', en: 'The piece of RNA partly sticks to itself. Drawn flat, it looks like a cloverleaf with four arms.' } },
        2: { tag: ['bouwsteen', 'building block'], title: { nl: 'Hier hangt de bouwsteen', en: 'The building block hangs here' }, text: { nl: 'Elk tRNA eindigt op dezelfde drie letters. Aan dat uiteinde wordt de bouwsteen vastgemaakt.', en: 'Every tRNA ends with the same three letters. The building block is attached to that end.' } },
        3: { tag: ['leeskant', 'reading end'], title: { nl: 'De onderkant leest het bericht', en: 'The bottom reads the message' }, text: { nl: 'Drie letters onderaan passen op drie letters van het bericht. De eerste past wat losser, zo kan dit tRNA twee woorden lezen.', en: 'Three letters at the bottom fit three letters of the message. The first fits more loosely, so this tRNA can read two words.' } },
      },
    },
    secundair: {
      kort: { nl: 'Een tRNA is een klein RNA dat als adapter werkt. Het anticodon past op een codon van het mRNA; aan het CCA-uiteinde hangt het passende aminozuur. Zo verbindt het tRNA de taal van RNA met die van eiwit.', en: 'A tRNA is a small RNA that works as an adaptor. Its anticodon fits a codon on the mRNA; the matching amino acid hangs on the CCA end. That way the tRNA links the language of RNA to that of protein.' },
      terms: [
        [{ nl: 'tRNA', en: 'tRNA' }, { nl: 'Transfer-RNA: de adapter tussen codon en aminozuur.', en: 'Transfer RNA: the adaptor between codon and amino acid.' }],
        [{ nl: 'anticodon', en: 'anticodon' }, { nl: 'Drie basen onderaan het tRNA die op het codon passen.', en: 'Three bases at the bottom of the tRNA that fit the codon.' }],
        [{ nl: 'CCA-uiteinde', en: 'CCA end' }, { nl: 'Het uiteinde van elk tRNA, waar het aminozuur aan de laatste A hangt.', en: 'The end of every tRNA, where the amino acid hangs on the last A.' }],
        [{ nl: 'wobble', en: 'wobble' }, { nl: 'De eerste anticodonbase past losser, zodat één tRNA meerdere codons kan lezen.', en: 'The first anticodon base fits more loosely, so one tRNA can read several codons.' }],
      ],
      steps: {
        0: { tag: ['adapter', 'adaptor'], title: { nl: 'Het tRNA: de adapter', en: 'The tRNA: the adaptor' }, text: { nl: 'Een kort RNA dat een codon koppelt aan het juiste aminozuur. Hier het tRNA voor fenylalanine.', en: 'A short RNA that links a codon to the right amino acid. Here the tRNA for phenylalanine.' } },
        1: { tag: ['klaverblad', 'cloverleaf'], title: { nl: 'Een klaverblad met vier armen', en: 'A cloverleaf with four arms' }, text: { nl: 'Het tRNA vormt deels basenparen met zichzelf. In 2D getekend lijkt het op een klaverblad met vier armen.', en: 'The tRNA partly forms base pairs with itself. Drawn in 2D, it looks like a cloverleaf with four arms.' } },
        2: { tag: ['CCA-uiteinde', 'CCA end'], title: { nl: 'Hier hangt het aminozuur', en: 'The amino acid hangs here' }, text: { nl: 'Elk tRNA eindigt op CCA. Aan de laatste A wordt het aminozuur gekoppeld, hier fenylalanine.', en: 'Every tRNA ends in CCA. The amino acid is attached to the last A, here phenylalanine.' } },
        3: { tag: ['anticodon', 'anticodon'], title: { nl: 'Het anticodon leest het codon', en: 'The anticodon reads the codon' }, text: { nl: 'Het anticodon, drie basen onderaan, past op het codon. De eerste base past losser: zo leest dit tRNA UUC én UUU.', en: 'The anticodon, three bases at the bottom, fits the codon. The first base fits more loosely: so this tRNA reads both UUC and UUU.' } },
      },
    },
  },
  'aars': {
    hobby: {
      kort: { nl: 'In de cel hangen speciale laders aan elke kleine helper van RNA de juiste bouwsteen. Veel ervan controleren hun eigen werk en verbeteren fouten. Dat is belangrijk: later kijkt het fabriekje alleen of de helper op het bericht past, niet welke bouwsteen hij draagt.', en: 'In the cell, special loaders hang the right building block on each small RNA helper. Many of them check their own work and fix mistakes. That matters: later the factory only checks whether the helper fits the message, not which building block it carries.' },
      steps: {
        0: { tag: ['eigen lader', 'own loader'], title: { nl: 'Een eigen lader per bouwsteen', en: 'One loader per building block' }, text: { nl: 'Elke soort bouwsteen heeft een eigen lader die hem aan de juiste helpers hangt. Hier wordt de code echt ontcijferd.', en: 'Each kind of building block has its own loader that hangs it on the right helpers. This is where the code is really decoded.' } },
        3: { tag: ['laden', 'loading'], title: { nl: 'De helper wordt geladen', en: 'The helper is loaded' }, text: { nl: 'De bouwsteen wordt aan het uiteinde van de helper vastgemaakt. De helper is nu geladen.', en: 'The building block is attached to the end of the helper. The helper is now loaded.' } },
        7: { tag: ['naar fabriekje', 'to the factory'], title: { nl: 'Naar het fabriekje', en: 'Off to the factory' }, text: { nl: 'De geladen helper gaat naar het ribosoom, het fabriekje dat eiwitten bouwt. Dat kijkt alleen naar de letters, niet naar de bouwsteen.', en: 'The loaded helper goes to the ribosome, the factory that builds proteins. It only looks at the letters, not at the building block.' } },
      },
    },
    secundair: {
      kort: { nl: 'Aminoacyl-tRNA-synthetasen zijn enzymen die aan elk tRNA het juiste aminozuur koppelen. Veel ervan lezen hun eigen werk na en verbeteren fouten. Dat is belangrijk, want het ribosoom controleert later alleen codon en anticodon, niet het aminozuur.', en: 'Aminoacyl-tRNA synthetases are enzymes that attach the right amino acid to each tRNA. Many of them proofread their own work and fix mistakes. That matters, because the ribosome later only checks codon and anticodon, not the amino acid.' },
      terms: [
        [{ nl: 'aminoacyl-tRNA-synthetase', en: 'aminoacyl-tRNA synthetase' }, { nl: 'Enzym dat een aminozuur aan de juiste tRNA’s koppelt; elk aminozuur heeft er een eigen.', en: 'Enzyme that attaches an amino acid to the right tRNAs; each amino acid has its own.' }],
        [{ nl: 'geladen tRNA', en: 'charged tRNA' }, { nl: 'Een tRNA met zijn aminozuur eraan, klaar voor het ribosoom.', en: 'A tRNA with its amino acid attached, ready for the ribosome.' }],
        [{ nl: 'proeflezen', en: 'proofreading' }, { nl: 'Het enzym controleert zijn werk en verbetert een fout aminozuur.', en: 'The enzyme checks its work and corrects a wrong amino acid.' }],
      ],
      steps: {
        0: { tag: ['synthetase', 'synthetase'], title: { nl: 'Een eigen enzym per aminozuur', en: 'One enzyme per amino acid' }, text: { nl: 'Elk aminozuur heeft een eigen synthetase die het aan de juiste tRNA’s koppelt. Hier wordt de code echt vertaald.', en: 'Each amino acid has its own synthetase that attaches it to the right tRNAs. This is where the code is really translated.' } },
        3: { tag: ['tRNA laden', 'tRNA charging'], title: { nl: 'Het tRNA wordt geladen', en: 'The tRNA is charged' }, text: { nl: 'Het enzym koppelt het aminozuur aan de laatste A van het CCA-uiteinde. Het tRNA is nu geladen.', en: 'The enzyme attaches the amino acid to the last A of the CCA end. The tRNA is now charged.' } },
        7: { tag: ['naar ribosoom', 'to ribosome'], title: { nl: 'Naar het ribosoom', en: 'To the ribosome' }, text: { nl: 'Het geladen tRNA komt los van het enzym en een hulpeiwit brengt het naar het ribosoom. Dat controleert alleen codon en anticodon, niet het aminozuur.', en: 'The charged tRNA comes off the enzyme and a helper protein takes it to the ribosome. That only checks codon and anticodon, not the amino acid.' } },
      },
    },
  },
  'codon': {
    hobby: {
      kort: { nl: 'De genetische code is een woordenlijst. Elk woord van drie letters in het RNA-bericht staat voor één bouwsteen van een eiwit, of voor stop. Bijna alle levende wezens gebruiken dezelfde lijst.', en: 'The genetic code is a word list. Each three-letter word in the RNA message stands for one building block of a protein, or for stop. Almost all living things use the same list.' },
      steps: {
        0: { tag: ['drie letters', 'three letters'], title: { nl: 'Woorden van drie letters', en: 'Three-letter words' }, text: { nl: 'Er zijn vier letters en elk woord heeft er drie. Zo kun je 64 woorden maken. Lees het wiel van binnen naar buiten.', en: 'There are four letters and each word has three. That makes 64 possible words. Read the wheel from the inside out.' } },
        1: { tag: ['per drie lezen', 'three at a time'], title: { nl: 'Het fabriekje leest per drie', en: 'The factory reads in threes' }, text: { nl: 'Het ribosoom, het fabriekje dat eiwitten bouwt, leest drie letters per keer, zonder gaten. Het wiel toont de bouwsteen.', en: 'The ribosome, the factory that builds proteins, reads three letters at a time, with no gaps. The wheel shows the building block.' } },
        2: { tag: ['start en stop', 'start and stop'], title: { nl: 'Start en stop', en: 'Start and stop' }, text: { nl: 'AUG is het startsein. UAA, UAG en UGA betekenen stop: daar past geen helper op.', en: 'AUG is the start signal. UAA, UAG and UGA mean stop: no helper fits them.' } },
        7: { tag: ['overal dezelfde', 'universal'], title: { nl: 'Bijna overal dezelfde code', en: 'Almost the same code everywhere' }, text: { nl: 'Bijna alle levende wezens gebruiken dezelfde code. De energiecentrales in onze cellen lezen een paar woorden anders.', en: 'Almost all living things use the same code. The power stations in our cells read a few words differently.' } },
      },
    },
    secundair: {
      kort: { nl: 'De genetische code zegt welk aminozuur bij elk codon van drie basen hoort. AUG is het startcodon en er zijn drie stopcodons; de meeste aminozuren hebben meerdere codons. Bijna alle levende wezens gebruiken dezelfde code.', en: 'The genetic code says which amino acid belongs to each codon of three bases. AUG is the start codon and there are three stop codons; most amino acids have several codons. Almost all living things use the same code.' },
      terms: [
        [{ nl: 'codon', en: 'codon' }, { nl: 'Drie basen op het mRNA die samen één aminozuur of stop betekenen.', en: 'Three bases on the mRNA that together mean one amino acid or stop.' }],
        [{ nl: 'startcodon', en: 'start codon' }, { nl: 'AUG: het codon waar het lezen begint, voor methionine.', en: 'AUG: the codon where reading begins, for methionine.' }],
        [{ nl: 'stopcodon', en: 'stop codon' }, { nl: 'UAA, UAG of UGA: hier stopt de translatie, er bestaat geen tRNA voor.', en: 'UAA, UAG or UGA: translation stops here, there is no tRNA for them.' }],
        [{ nl: 'gedegenereerde code', en: 'degenerate code' }, { nl: 'De meeste aminozuren hebben meer dan één codon.', en: 'Most amino acids have more than one codon.' }],
      ],
      steps: {
        0: { tag: ['codon', 'codon'], title: { nl: 'Drie basen per codon', en: 'Three bases per codon' }, text: { nl: 'Een codon is drie basen. Met vier basen zijn er 64 codons. Lees het wiel van binnen naar buiten.', en: 'A codon is three bases. With four bases there are 64 codons. Read the wheel from the inside out.' } },
        1: { tag: ['per codon lezen', 'reading codons'], title: { nl: 'Het ribosoom leest per codon', en: 'The ribosome reads codon by codon' }, text: { nl: 'Het ribosoom leest het mRNA per codon, zonder overlap of gaten. Het wiel toont het bijhorende aminozuur.', en: 'The ribosome reads the mRNA codon by codon, with no overlaps or gaps. The wheel shows the matching amino acid.' } },
        2: { tag: ['start en stop', 'start and stop'], title: { nl: 'Startcodon en stopcodons', en: 'Start codon and stop codons' }, text: { nl: 'AUG, voor methionine, is het startcodon. UAA, UAG en UGA zijn stopcodons: daarvoor bestaat geen tRNA.', en: 'AUG, for methionine, is the start codon. UAA, UAG and UGA are stop codons: there is no tRNA for them.' } },
        7: { tag: ['universele code', 'universal code'], title: { nl: 'Bijna overal dezelfde code', en: 'Almost the same code everywhere' }, text: { nl: 'Bijna alle organismen gebruiken dezelfde code. Onze mitochondriën lezen een paar codons anders.', en: 'Almost all organisms use the same code. Our mitochondria read a few codons differently.' } },
      },
    },
  },
  'ribogenese': {
    hobby: {
      kort: { nl: 'Hier zie je hoe de cel nieuwe ribosomen bouwt, de fabriekjes die eiwitten maken. In de celkern wordt hun RNA gemaakt, aangepast, geknipt en met eiwitten samengevoegd. De twee helften gaan apart de kern uit en worden daarbuiten afgewerkt.', en: 'Here you see how the cell builds new ribosomes, the little factories that make proteins. In the nucleus their RNA is made, adjusted, cut and joined with proteins. The two halves leave the nucleus separately and are finished outside it.' },
      steps: {
        0: { tag: ['in de kern', 'in the nucleus'], title: { nl: 'De bouw begint in de kern', en: 'Building starts in the nucleus' }, text: { nl: 'Dat gebeurt op een speciale plek in de celkern, zonder wand eromheen, rond de genen voor het RNA van de fabriekjes.', en: 'This happens at a special spot in the nucleus, with no wall around it, around the genes for the RNA of the factories.' } },
        5: { tag: ['eiwitten erbij', 'proteins join'], title: { nl: 'Eiwitten komen erbij', en: 'Proteins join in' }, text: { nl: 'Veel eiwitten worden buiten de kern gemaakt en naar binnen gebracht. Ook een klein extra stukje RNA gaat naar de grote helft.', en: 'Many proteins are made outside the nucleus and brought in. A small extra piece of RNA also goes to the large half.' } },
        6: { tag: ['de kern uit', 'leaving nucleus'], title: { nl: 'Apart de kern uit', en: 'Leaving the nucleus separately' }, text: { nl: 'De twee helften verlaten apart de kern, door gaatjes in de kernwand, met hulp van transporteiwitten.', en: 'The two halves leave the nucleus separately, through holes in the nuclear wall, helped by transport proteins.' } },
      },
    },
    secundair: {
      kort: { nl: 'Ribosoombiogenese is de bouw van nieuwe ribosomen. In de nucleolus wordt rRNA gemaakt, aangepast, geknipt en met ribosomale eiwitten samengevoegd. De twee subeenheden gaan apart door de kernporiën naar het cytoplasma, waar ze verder rijpen.', en: 'Ribosome biogenesis is the building of new ribosomes. In the nucleolus rRNA is made, modified, cut and assembled with ribosomal proteins. The two subunits travel separately through the nuclear pores to the cytoplasm, where they mature further.' },
      terms: [
        [{ nl: 'nucleolus', en: 'nucleolus' }, { nl: 'Plek in de kern zonder membraan waar de bouw van ribosomen begint.', en: 'Spot in the nucleus without a membrane where ribosome building starts.' }],
        [{ nl: 'rRNA', en: 'rRNA' }, { nl: 'Ribosomaal RNA, dat samen met eiwitten het ribosoom vormt.', en: 'Ribosomal RNA, which forms the ribosome together with proteins.' }],
        [{ nl: 'ribosomale eiwitten', en: 'ribosomal proteins' }, { nl: 'Eiwitten die buiten de kern gemaakt worden en in het ribosoom terechtkomen.', en: 'Proteins that are made outside the nucleus and end up in the ribosome.' }],
        [{ nl: 'kernporie', en: 'nuclear pore' }, { nl: 'Opening in de kernwand waardoor de subeenheden de kern verlaten.', en: 'Opening in the nuclear envelope through which the subunits leave the nucleus.' }],
      ],
      steps: {
        0: { tag: ['nucleolus', 'nucleolus'], title: { nl: 'De bouw start in de nucleolus', en: 'Building starts in the nucleolus' }, text: { nl: 'De nucleolus is een plek in de kern zonder membraan, rond de genen voor rRNA.', en: 'The nucleolus is a spot in the nucleus without a membrane, around the genes for rRNA.' } },
        5: { tag: ['eiwitten erbij', 'proteins join'], title: { nl: 'Ribosomale eiwitten komen erbij', en: 'Ribosomal proteins join' }, text: { nl: 'Het lange rRNA wordt in stukken geknipt. Samen met ribosomale eiwitten, gemaakt buiten de kern, vormen ze een kleine en een grote subeenheid (pre-40S en pre-60S). Een klein rRNA gaat naar de grote.', en: 'The long rRNA is cut into pieces. Together with ribosomal proteins, made outside the nucleus, they form a small and a large subunit (pre-40S and pre-60S). A small rRNA joins the large one.' } },
        6: { tag: ['kernporie', 'nuclear pore'], title: { nl: 'Apart door de kernporiën', en: 'Separately through the nuclear pores' }, text: { nl: 'De twee subeenheden verlaten apart de kern via kernporiën, met hulp van transporteiwitten.', en: 'The two subunits leave the nucleus separately through nuclear pores, helped by transport proteins.' } },
      },
    },
  },
  'seleno': {
    hobby: {
      kort: { nl: 'Normaal betekenen de letters UGA in het RNA-bericht stop. Soms zorgt een extra signaal in het bericht ervoor dat er toch een zeldzame bouwsteen komt, selenocysteïne. Zo ligt de genetische code niet helemaal vast.', en: 'Normally the letters UGA in the RNA message mean stop. Sometimes an extra signal in the message makes sure a rare building block, selenocysteine, is added instead. So the genetic code is not completely fixed.' },
      steps: {
        0: { tag: ['UGA: geen stop', 'UGA: not stop'], title: { nl: 'UGA: stop, of een extra bouwsteen', en: 'UGA: stop, or an extra block' }, text: { nl: 'In 25 van onze genen betekent UGA geen stop maar selenocysteïne: een bouwsteen met selenium in plaats van zwavel.', en: 'In 25 of our genes UGA does not mean stop but selenocysteine: a building block with selenium instead of sulfur.' } },
        3: { tag: ['UGA lezen', 'reading UGA'], title: { nl: 'Het fabriekje komt bij UGA', en: 'The factory reaches UGA' }, text: { nl: 'Een speciale bezorger brengt een klein RNA met de zeldzame bouwsteen. Dat RNA past precies op UGA.', en: 'A special courier brings a small RNA carrying the rare building block. That RNA fits UGA exactly.' } },
        4: { tag: ['inbouwen', 'built in'], title: { nl: 'Ingebouwd, en verder lezen', en: 'Built in, and reading on' }, text: { nl: 'De bouwsteen wordt gewoon vastgemaakt en het fabriekje leest verder. Zonder selenium stopt het hier meestal.', en: 'The building block is simply linked on and the factory reads on. Without selenium it usually stops here.' } },
      },
    },
    secundair: {
      kort: { nl: 'Selenocysteïne en pyrrolysine zijn twee zeldzame extra aminozuren. Ze worden ingebouwd op een stopcodon: selenocysteïne op UGA dankzij een SECIS-element in het mRNA, pyrrolysine op UAG in enkele microben. Zo ligt de genetische code niet helemaal vast.', en: 'Selenocysteine and pyrrolysine are two rare extra amino acids. They are built in at a stop codon: selenocysteine at UGA thanks to a SECIS element in the mRNA, pyrrolysine at UAG in a few microbes. So the genetic code is not completely fixed.' },
      terms: [
        [{ nl: 'selenocysteïne', en: 'selenocysteine' }, { nl: 'Cysteïne met selenium in plaats van zwavel, ingebouwd op UGA.', en: 'Cysteine with selenium instead of sulfur, built in at UGA.' }],
        [{ nl: 'SECIS-element', en: 'SECIS element' }, { nl: 'Een lus in het mRNA die aangeeft dat UGA hier geen stop betekent.', en: 'A loop in the mRNA that signals that UGA does not mean stop here.' }],
        [{ nl: 'hercodering', en: 'recoding' }, { nl: 'Een stopcodon krijgt door extra signalen een andere betekenis.', en: 'A stop codon gets a different meaning through extra signals.' }],
        [{ nl: 'pyrrolysine', en: 'pyrrolysine' }, { nl: 'Extra aminozuur dat enkele microben op UAG inbouwen.', en: 'Extra amino acid that a few microbes build in at UAG.' }],
      ],
      steps: {
        0: { tag: ['UGA niet stop', 'UGA not stop'], title: { nl: 'UGA: stop… of selenocysteïne', en: 'UGA: stop… or selenocysteine' }, text: { nl: 'In 25 van onze genen betekent UGA niet stop maar selenocysteïne: cysteïne met selenium in plaats van zwavel.', en: 'In 25 of our genes UGA does not mean stop but selenocysteine: cysteine with selenium instead of sulfur.' } },
        3: { tag: ['UGA aflezen', 'reading UGA'], title: { nl: 'Het ribosoom komt bij UGA', en: 'The ribosome reaches UGA' }, text: { nl: 'Een lus in het mRNA (de SECIS-lus) roept een speciaal hulpeiwit op. Dat levert het selenocysteïne-tRNA af in plaats van het gewone. Zijn anticodon past op UGA.', en: 'A loop in the mRNA (the SECIS loop) calls in a special helper protein. That delivers the selenocysteine tRNA instead of the usual one. Its anticodon fits UGA.' } },
        4: { tag: ['inbouwen', 'insertion'], title: { nl: 'Ingebouwd, en verder lezen', en: 'Built in, and reading on' }, text: { nl: 'Selenocysteïne wordt gekoppeld en het ribosoom leest door. Zonder selenium of SECIS-lus stopt het hier meestal.', en: 'Selenocysteine is linked on and the ribosome reads on. Without selenium or the SECIS loop it usually stops here.' } },
      },
    },
  },
  'er': {
    hobby: {
      kort: { nl: 'Eiwitten die de cel uit moeten of in een vlies horen, gaan meestal al tijdens hun bouw het ER in, een netwerk van vliezen in de cel. Een adreslabel vooraan het eiwit zorgt dat het fabriekje naar een poortje in het ER gaat.', en: 'Proteins that must leave the cell or belong in one of its thin skins usually enter the ER while they are being built, a network of thin skins inside the cell. An address label at the front of the protein sends the factory to a little gate in the ER.' },
      steps: {
        0: { tag: ['bestemming', 'destination'], title: { nl: 'Waar moet dit eiwit naartoe?', en: 'Where does this protein go?' }, text: { nl: 'Het fabriekje maakt een eiwit dat de cel uit moet. Daarvoor moet het eerst in het ER.', en: 'The factory is making a protein that has to leave the cell. For that it first has to go into the ER.' } },
        1: { tag: ['adreslabel', 'address label'], title: { nl: 'Het adreslabel', en: 'The address label' }, text: { nl: 'De eerste bouwstenen van de ketting vormen een adreslabel, met in het midden een stuk dat water afstoot.', en: 'The first building blocks of the chain form an address label, with a water-fearing part in the middle.' } },
        3: { tag: ['naar het ER', 'to the ER'], title: { nl: 'Op weg naar het ER', en: 'On the way to the ER' }, text: { nl: 'Een deeltje dat het label herkent, brengt het fabriekje naar een aanlegplaats in de wand van het ER.', en: 'A particle that recognises the label takes the factory to a docking spot in the wall of the ER.' } },
        5: { tag: ['het ER in', 'into the ER'], title: { nl: 'De ketting schuift het ER in', en: 'The chain slides into the ER' }, text: { nl: 'Het bouwen gaat verder: de groeiende ketting schuift meteen door een poortje naar de binnenkant van het ER.', en: 'Building goes on: the growing chain slides straight through a little gate to the inside of the ER.' } },
      },
    },
    secundair: {
      kort: { nl: 'Eiwitten die de cel uit moeten of in een membraan horen, gaan meestal al tijdens de translatie het ruw ER in. Een signaalpeptide vooraan het eiwit wordt herkend door SRP, dat het ribosoom naar het translocon brengt. Daar schuift de keten het ER in.', en: 'Proteins that must leave the cell or belong in a membrane usually enter the rough ER during translation. A signal peptide at the front of the protein is recognised by SRP, which takes the ribosome to the translocon. There the chain slides into the ER.' },
      terms: [
        [{ nl: 'ruw ER', en: 'rough ER' }, { nl: 'Netwerk van membranen waar zulke eiwitten al tijdens hun aanmaak binnengaan.', en: 'Network of membranes that such proteins enter while they are being made.' }],
        [{ nl: 'signaalpeptide', en: 'signal peptide' }, { nl: 'Adreslabel aan het begin van het eiwit, met een waterafstotend stuk.', en: 'Address label at the start of the protein, with a water-repelling part.' }],
        [{ nl: 'SRP', en: 'SRP' }, { nl: 'Herkenningsdeeltje dat het signaalpeptide bindt en het ribosoom naar het ER leidt.', en: 'Recognition particle that binds the signal peptide and guides the ribosome to the ER.' }],
        [{ nl: 'translocon', en: 'translocon' }, { nl: 'Kanaal in het ER-membraan waardoor de keten naar binnen schuift.', en: 'Channel in the ER membrane through which the chain slides in.' }],
      ],
      steps: {
        0: { tag: ['bestemming', 'destination'], title: { nl: 'Waar moet dit eiwit naartoe?', en: 'Where does this protein go?' }, text: { nl: 'Een ribosoom maakt albumine, dat de cel uit moet. Daarvoor moet het eerst in het ER, een netwerk van membranen.', en: 'A ribosome is making albumin, which must leave the cell. For that it first has to enter the ER, a network of membranes.' } },
        1: { tag: ['signaalpeptide', 'signal peptide'], title: { nl: 'Het signaalpeptide', en: 'The signal peptide' }, text: { nl: 'De eerste aminozuren vormen een signaalpeptide, een adreslabel met in het midden een waterafstotend stuk.', en: 'The first amino acids form a signal peptide, an address label with a water-repelling part in the middle.' } },
        3: { tag: ['SRP-receptor', 'SRP receptor'], title: { nl: 'Op weg naar het ER', en: 'On the way to the ER' }, text: { nl: 'Ribosoom en SRP hechten aan een receptor in het ER-membraan.', en: 'Ribosome and SRP attach to a receptor in the ER membrane.' } },
        5: { tag: ['translocon', 'translocon'], title: { nl: 'De keten schuift het ER in', en: 'The chain slides into the ER' }, text: { nl: 'De translatie gaat verder: de groeiende keten schuift door het translocon naar de binnenkant van het ER.', en: 'Translation goes on: the growing chain slides through the translocon to the inside of the ER.' } },
      },
    },
  },
};
