/* Eenvoudige teksten voor de niveaus hobbyist en secundair (groep repl). Sleutels van steps = stapnummer in de animatie. */
export default {
  'replicatie': {
    hobby: {
      kort: { nl: 'Voor een cel zich in twee splitst, kopieert ze al haar DNA. Elke kopie bestaat voor de helft uit oud en voor de helft uit nieuw DNA. Zo krijgen beide nieuwe cellen precies hetzelfde DNA.', en: 'Before a cell splits in two, it copies all of its DNA. Each copy is half old and half new DNA. This way both new cells get exactly the same DNA.' },
      steps: {
        0: { tag: ['half oud', 'half old'], title: { nl: 'Half oud, half nieuw', en: 'Half old, half new' }, text: { nl: 'DNA heeft twee strengen, zoals een rits. Elke kopie houdt één oude streng en krijgt er één nieuwe bij.', en: 'DNA has two strands, like a zip. Each copy keeps one old strand and gets one new one.' } },
        2: { tag: ['start', 'start'], title: { nl: 'Het kopiëren begint', en: 'Copying begins' }, text: { nl: 'Hulpeiwitten zetten de ringen op het DNA aan. Die ritsen het DNA open en lopen van elkaar weg.', en: 'Helper proteins switch on the rings on the DNA. They unzip the DNA and move away from each other.' } },
        3: { tag: ['twee kanten', 'two ways'], title: { nl: 'Kopiëren in twee richtingen', en: 'Copying in two directions' }, text: { nl: 'Op twee plekken wordt tegelijk gekopieerd, elk een andere kant op. De ene nieuwe streng groeit in één stuk, de andere in stukjes.', en: 'Copying happens at two spots at once, each going a different way. One new strand grows in one piece, the other in small pieces.' } },
        6: { tag: ['twee kopieën', 'two copies'], title: { nl: 'Twee gelijke kopieën', en: 'Two identical copies' }, text: { nl: 'Nu zijn er twee identieke stukken DNA. Een eiwitring houdt ze bij elkaar.', en: 'Now there are two identical pieces of DNA. A protein ring holds them together.' } },
      },
    },
    secundair: {
      kort: { nl: 'Bij de DNA-replicatie kopieert de cel vóór de celdeling al haar DNA precies één keer. Replicatie is semi-conservatief: elke nieuwe DNA-molecule heeft één oude en één nieuwe streng. Ze start op vele origins en loopt van daar in twee richtingen.', en: 'In DNA replication the cell copies all of its DNA exactly once before it divides. Replication is semi-conservative: each new DNA molecule has one old and one new strand. It starts at many origins and runs from there in two directions.' },
      terms: [
        [{ nl: 'semi-conservatief', en: 'semi-conservative' }, { nl: 'Elke nieuwe DNA-molecule bestaat uit één oude en één nieuwe streng.', en: 'Each new DNA molecule consists of one old and one new strand.' }],
        [{ nl: 'origin', en: 'origin' }, { nl: 'Een startplaats op het DNA waar replicatie begint.', en: 'A starting point on the DNA where replication begins.' }],
        [{ nl: 'replicatievork', en: 'replication fork' }, { nl: 'De plek waar het DNA opengaat en de nieuwe strengen gemaakt worden.', en: 'The place where the DNA opens and the new strands are made.' }],
        [{ nl: 'zusterchromatiden', en: 'sister chromatids' }, { nl: 'De twee identieke DNA-moleculen die na replicatie samen blijven.', en: 'The two identical DNA molecules that stay together after replication.' }],
      ],
      steps: {
        0: { tag: ['semi-conservatief', 'semi-conservative'], title: { nl: 'Semi-conservatief: half oud, half nieuw', en: 'Semi-conservative: half old, half new' }, text: { nl: 'Elke nieuwe DNA-molecule bestaat uit één oude en één nieuwe streng. Dat heet semi-conservatieve replicatie.', en: 'Each new DNA molecule consists of one old and one new strand. This is called semi-conservative replication.' } },
        2: { tag: ['origin', 'origin'], title: { nl: 'Replicatie start op een origin', en: 'Replication starts at an origin' }, text: { nl: 'Op een origin worden de helicaseringen aangezet. Ze ritsen het DNA open en bewegen van elkaar weg.', en: 'At an origin the helicase rings are switched on. They unzip the DNA and move away from each other.' } },
        3: { tag: ['replicatievork', 'replication fork'], title: { nl: 'Een bel met twee replicatievorken', en: 'A bubble with two replication forks' }, text: { nl: 'Twee replicatievorken lopen uit elkaar. Aan elke vork groeit één nieuwe streng in één stuk, de andere in korte stukjes.', en: 'Two replication forks move apart. At each fork one new strand grows in one piece, the other in short pieces.' } },
        6: { tag: ['zusterchromatiden', 'sister chromatids'], title: { nl: 'Twee identieke kopieën', en: 'Two identical copies' }, text: { nl: 'Er zijn nu twee identieke DNA-moleculen, de zusterchromatiden. Een eiwitring houdt ze samen.', en: 'There are now two identical DNA molecules, the sister chromatids. A protein ring holds them together.' } },
      },
    },
  },
  'origins': {
    hobby: {
      kort: { nl: 'Ons DNA wordt niet vanaf één punt gekopieerd, maar vanaf tienduizenden startplekken. Op elke startplek ligt eerst een slapende kopieermachine klaar. Die mag maar één keer vertrekken, zodat geen stukje DNA twee keer gekopieerd wordt.', en: 'Our DNA is not copied from one point, but from tens of thousands of starting spots. At each spot a sleeping copying machine is put in place first. It may set off only once, so no piece of DNA is copied twice.' },
      steps: {
        0: { tag: ['startplek', 'start spot'], title: { nl: 'Kopiëren begint op vaste startplekken', en: 'Copying starts at fixed spots' }, text: { nl: 'Op tienduizenden plekken in ons DNA ligt een kopieermachine klaar. Hier zie je er één, rond een echt stuk DNA.', en: 'At tens of thousands of spots in our DNA a copying machine lies ready. Here you see one, around a real piece of DNA.' } },
        4: { tag: ['klaar', 'ready'], title: { nl: 'Klaar, maar nog uit', en: 'Ready, but still off' }, text: { nl: 'De machine ligt nu klaar op het DNA, maar ze doet nog niets.', en: 'The machine now lies ready on the DNA, but it does nothing yet.' } },
        5: { tag: ['startsein', 'go signal'], title: { nl: 'Startsein: elke ring wordt een rits', en: 'Go signal: each ring becomes a zip' }, text: { nl: 'Pas als de cel gaat kopiëren, krijgen de ringen een startsein. Elke ring ritst dan het DNA open.', en: 'Only when the cell starts copying do the rings get a go signal. Each ring then unzips the DNA.' } },
        7: { tag: ['één keer', 'only once'], title: { nl: 'Maar één keer per celdeling', en: 'Only once per cell division' }, text: { nl: 'Tot de cel gedeeld is, komen er geen nieuwe machines bij. Zo wordt elk stukje DNA maar één keer gekopieerd.', en: 'Until the cell has divided, no new machines are added. This way each piece of DNA is copied only once.' } },
      },
    },
    secundair: {
      kort: { nl: 'Chromosomen hebben vele origins, startplaatsen van replicatie. In G1 krijgt een origin een licentie: het helicase wordt geladen maar blijft inactief. Pas in de S-fase wordt het actief, zodat elk stuk DNA maar één keer per celcyclus gekopieerd wordt.', en: 'Chromosomes have many origins, starting points of replication. In G1 an origin gets a licence: the helicase is loaded but stays inactive. Only in S phase does it become active, so each piece of DNA is copied only once per cell cycle.' },
      terms: [
        [{ nl: 'origin', en: 'origin' }, { nl: 'Een startplaats op het DNA waar replicatie begint.', en: 'A starting point on the DNA where replication begins.' }],
        [{ nl: 'helicase', en: 'helicase' }, { nl: 'Het enzym dat de twee DNA-strengen openritst.', en: 'The enzyme that unzips the two DNA strands.' }],
        [{ nl: 'licentie', en: 'licensing' }, { nl: 'Het klaarleggen van een inactief helicase op een origin, in G1.', en: 'Placing an inactive helicase on an origin, in G1.' }],
        [{ nl: 'S-fase', en: 'S phase' }, { nl: 'De fase van de celcyclus waarin het DNA gekopieerd wordt.', en: 'The phase of the cell cycle in which the DNA is copied.' }],
      ],
      steps: {
        0: { tag: ['origin', 'origin'], title: { nl: 'Replicatie start op origins', en: 'Replication starts at origins' }, text: { nl: 'Op tienduizenden origins in ons DNA ligt een helicase klaar. Hier zie je er één, rond een echt stuk DNA.', en: 'At tens of thousands of origins in our DNA a helicase lies ready. Here you see one, around a real piece of DNA.' } },
        4: { tag: ['licentie', 'licensing'], title: { nl: 'Licentie: klaar, maar nog inactief', en: 'Licensing: ready, but still inactive' }, text: { nl: 'In G1 wordt het helicase als dubbele ring rond het DNA geladen, maar het doet nog niets. Dat klaarleggen heet licentie.', en: 'In G1 the helicase is loaded around the DNA as a double ring, but it does nothing yet. This preparation is called licensing.' } },
        5: { tag: ['S-fase', 'S phase'], title: { nl: 'S-fase: het helicase wordt actief', en: 'S phase: the helicase becomes active' }, text: { nl: 'In de S-fase zetten enzymen de ringen aan. Elke ring wordt een actief helicase dat het DNA openritst.', en: 'In S phase enzymes switch the rings on. Each ring becomes an active helicase that unzips the DNA.' } },
        7: { tag: ['één keer', 'only once'], title: { nl: 'Eén keer per celcyclus', en: 'Once per cell cycle' }, text: { nl: 'Tot na de celdeling kan er geen nieuw helicase geladen worden. Zo wordt elk stuk DNA maar één keer per celcyclus gekopieerd.', en: 'Until after cell division no new helicase can be loaded. This way each piece of DNA is copied only once per cell cycle.' } },
      },
    },
  },
  'replisoom': {
    hobby: {
      kort: { nl: 'DNA wordt gekopieerd door een groepje eiwitten dat samenwerkt als één machine. Een deel ritst het DNA open, andere delen bouwen de nieuwe strengen. Omdat de twee strengen tegengesteld lopen, groeit de ene in één stuk en de andere in stukjes.', en: 'DNA is copied by a group of proteins that work together as one machine. One part unzips the DNA, other parts build the new strands. Because the two strands run in opposite directions, one grows in one piece and the other in pieces.' },
      steps: {
        0: { tag: ['openritsen', 'unzipping'], title: { nl: 'Het DNA wordt opengeritst', en: 'The DNA is unzipped' }, text: { nl: 'Een ritsmachine trekt de twee strengen van het DNA uit elkaar. Die strengen lopen in tegengestelde richting.', en: 'A zipper machine pulls the two DNA strands apart. The strands run in opposite directions.' } },
        3: { tag: ['startstukje', 'starter piece'], title: { nl: 'Eerst een startstukje', en: 'First a starter piece' }, text: { nl: 'De bouwer van nieuw DNA kan niet zelf beginnen. Een helper legt eerst een kort startstukje van RNA.', en: 'The builder of new DNA cannot start on its own. A helper first lays down a short starter piece of RNA.' } },
        5: { tag: ['in één stuk', 'in one piece'], title: { nl: 'Eén streng groeit in één stuk', en: 'One strand grows in one piece' }, text: { nl: 'Een bouwer maakt deze nieuwe streng in één lang stuk en schuift mee met de rits.', en: 'A builder makes this new strand in one long piece and moves along with the zipper.' } },
        6: { tag: ['in stukjes', 'in pieces'], title: { nl: 'De andere streng groeit in stukjes', en: 'The other strand grows in pieces' }, text: { nl: 'Hier bouwt een bouwer de andere kant op, in korte stukjes. Waar hij het vorige stukje raakt, tilt hij het begin daarvan op.', en: 'Here a builder works the other way, in short pieces. Where it reaches the previous piece, it lifts up the start of it.' } },
        9: { tag: ['samen', 'together'], title: { nl: 'Samen één machine', en: 'Together one machine' }, text: { nl: 'Al deze eiwitten werken samen als één kopieermachine. Wat toch misgaat, wordt later verbeterd.', en: 'All these proteins work together as one copying machine. Whatever still goes wrong is fixed later.' } },
      },
    },
    secundair: {
      kort: { nl: 'Het replisoom is de eiwitmachine aan de replicatievork. Het helicase ritst het DNA open en DNA-polymerasen bouwen de nieuwe strengen. Omdat polymerasen maar in één richting bouwen, groeit de leidende streng in één stuk en de volgende streng in Okazaki-fragmenten.', en: 'The replisome is the protein machine at the replication fork. The helicase unzips the DNA and DNA polymerases build the new strands. Because polymerases build in only one direction, the leading strand grows in one piece and the lagging strand in Okazaki fragments.' },
      terms: [
        [{ nl: 'helicase', en: 'helicase' }, { nl: 'Het enzym dat de twee DNA-strengen openritst.', en: 'The enzyme that unzips the two DNA strands.' }],
        [{ nl: 'primer', en: 'primer' }, { nl: 'Een kort startstukje RNA waar DNA-polymerase op verder bouwt.', en: 'A short RNA starter piece that DNA polymerase builds on.' }],
        [{ nl: 'DNA-polymerase', en: 'DNA polymerase' }, { nl: 'Het enzym dat een nieuwe DNA-streng bouwt.', en: 'The enzyme that builds a new DNA strand.' }],
        [{ nl: 'leidende streng', en: 'leading strand' }, { nl: 'De nieuwe streng die in één stuk groeit, mee met de vork.', en: 'The new strand that grows in one piece, along with the fork.' }],
        [{ nl: 'Okazaki-fragment', en: 'Okazaki fragment' }, { nl: 'Een kort stukje van de volgende streng, die in stukjes gemaakt wordt.', en: 'A short piece of the lagging strand, which is made in pieces.' }],
      ],
      steps: {
        0: { tag: ['helicase', 'helicase'], title: { nl: 'Het helicase ritst het DNA open', en: 'The helicase unzips the DNA' }, text: { nl: 'Het helicase trekt de twee strengen uit elkaar. Die strengen lopen in tegengestelde richting.', en: 'The helicase pulls the two strands apart. The strands run in opposite directions.' } },
        3: { tag: ['primer', 'primer'], title: { nl: 'Eerst een primer', en: 'First a primer' }, text: { nl: 'DNA-polymerase kan niet zelf starten. Een ander enzym legt eerst een kort startstukje RNA: de primer.', en: 'DNA polymerase cannot start on its own. Another enzyme first lays a short RNA starter piece: the primer.' } },
        5: { tag: ['leidende streng', 'leading strand'], title: { nl: 'De leidende streng groeit in één stuk', en: 'The leading strand grows in one piece' }, text: { nl: 'Een polymerase bouwt deze streng in één stuk, mee met de vork. Dat is de leidende streng.', en: 'A polymerase builds this strand in one piece, along with the fork. This is the leading strand.' } },
        6: { tag: ['Okazaki', 'Okazaki'], title: { nl: 'De volgende streng groeit in stukjes', en: 'The lagging strand grows in pieces' }, text: { nl: 'Hier bouwt een polymerase weg van de vork, in korte Okazaki-fragmenten. Bij het vorige fragment tilt hij het begin ervan op.', en: 'Here a polymerase builds away from the fork, in short Okazaki fragments. At the previous fragment it lifts up its start.' } },
        9: { tag: ['replisoom', 'replisome'], title: { nl: 'Samen één machine: het replisoom', en: 'Together one machine: the replisome' }, text: { nl: 'Al deze eiwitten werken samen als één machine, het replisoom. Wat toch fout gaat, wordt later hersteld.', en: 'All these proteins work together as one machine, the replisome. Whatever still goes wrong is repaired later.' } },
      },
    },
  },
  'ssdna': {
    hobby: {
      kort: { nl: 'Als de twee strengen van DNA uit elkaar gaan, ligt een losse streng even onbeschermd. Zo’n losse streng raakt makkelijk beschadigd. Een beschermend eiwit bedekt ze meteen en geeft ze door aan de juiste helpers.', en: 'When the two DNA strands come apart, a single strand is briefly unprotected. Such a single strand is easily damaged. A protective protein covers it at once and hands it on to the right helpers.' },
      steps: {
        0: { tag: ['vasthouden', 'holding on'], title: { nl: 'Een eiwit houdt een losse streng vast', en: 'A protein holds a single strand' }, text: { nl: 'Hier zie je een deel van een echt menselijk eiwit met een losse DNA-streng. De streng ligt in een gootje van het eiwit.', en: 'Here you see part of a real human protein with a single DNA strand. The strand lies in a groove of the protein.' } },
        1: { tag: ['kwetsbaar', 'fragile'], title: { nl: 'Een losse streng is kwetsbaar', en: 'A single strand is fragile' }, text: { nl: 'Zonder partnerstreng liggen de letters van het DNA bloot. Ze raken sneller beschadigd en de streng wordt makkelijker doorgeknipt.', en: 'Without a partner strand the DNA letters are exposed. They get damaged more easily and the strand is cut more easily.' } },
        5: { tag: ['alarm', 'alarm'], title: { nl: 'Het eiwit slaat alarm', en: 'The protein raises the alarm' }, text: { nl: 'Het eiwit bedekt de losse streng, roept een alarmeiwit op en geeft het DNA door aan andere helpers.', en: 'The protein covers the single strand, calls an alarm protein and hands the DNA on to other helpers.' } },
      },
    },
    secundair: {
      kort: { nl: 'Enkelstrengig DNA ontstaat tijdelijk bij replicatie en herstel. Omdat de basen niet gepaard zijn, is het kwetsbaar. Bij de mens bedekt het eiwit RPA het meteen en geeft het door aan de juiste enzymen.', en: 'Single-stranded DNA appears briefly during replication and repair. Because its bases are not paired, it is vulnerable. In humans the protein RPA coats it at once and hands it on to the right enzymes.' },
      terms: [
        [{ nl: 'enkelstrengig DNA', en: 'single-stranded DNA' }, { nl: 'Een losse DNA-streng zonder partnerstreng.', en: 'A single DNA strand without a partner strand.' }],
        [{ nl: 'RPA', en: 'RPA' }, { nl: 'Het eiwit dat enkelstrengig DNA bedekt en beschermt.', en: 'The protein that coats and protects single-stranded DNA.' }],
        [{ nl: 'basenparing', en: 'base pairing' }, { nl: 'Het binden van A met T en G met C tussen twee strengen.', en: 'The binding of A with T and G with C between two strands.' }],
      ],
      steps: {
        0: { tag: ['RPA', 'RPA'], title: { nl: 'RPA bindt enkelstrengig DNA', en: 'RPA binds single-stranded DNA' }, text: { nl: 'Een deel van het menselijke eiwit RPA met een losse DNA-streng. De streng ligt in een goot van het eiwit.', en: 'Part of the human protein RPA with a single DNA strand. The strand lies in a groove of the protein.' } },
        1: { tag: ['kwetsbaar', 'vulnerable'], title: { nl: 'Enkelstrengig DNA is kwetsbaar', en: 'Single-stranded DNA is vulnerable' }, text: { nl: 'Zonder partnerstreng liggen de basen bloot. Ze raken sneller beschadigd en enzymen knippen de streng makkelijker.', en: 'Without a partner strand the bases are exposed. They get damaged more easily and enzymes cut the strand more easily.' } },
        5: { tag: ['alarm', 'alarm'], title: { nl: 'RPA slaat alarm en geeft door', en: 'RPA raises the alarm and hands on' }, text: { nl: 'RPA bedekt het enkelstrengige DNA, roept een alarmeiwit op en geeft het DNA door aan andere enzymen.', en: 'RPA coats the single-stranded DNA, calls an alarm protein and hands the DNA on to other enzymes.' } },
      },
    },
  },
  'telomeren': {
    hobby: {
      kort: { nl: 'Aan de uiteinden van onze DNA-draden zit vele keren hetzelfde korte stukje: de telomeren, een soort beschermdopjes. Ze worden bij elke celdeling iets korter, tenzij een speciaal eiwit ze verlengt. Een eiwitkapje zorgt dat de cel ze niet ziet als een breuk.', en: 'At the ends of our DNA threads the same short piece repeats many times: the telomeres, a kind of protective tips. They get a bit shorter with every division, unless a special protein lengthens them. A protein cover makes sure the cell does not see them as a break.' },
      steps: {
        0: { tag: ['uiteinde', 'the end'], title: { nl: 'Het uiteinde van een DNA-draad', en: 'The end of a DNA thread' }, text: { nl: 'Aan het eind van elke DNA-draad herhaalt hetzelfde korte stukje zich vele keren. Eén streng steekt een beetje uit.', en: 'At the end of each DNA thread the same short piece repeats many times. One strand sticks out a little.' } },
        1: { tag: ['laatste stukje', 'last bit'], title: { nl: 'Het laatste stukje lukt niet', en: 'The last bit cannot be copied' }, text: { nl: 'Kopiëren begint telkens met een startstukje. Helemaal aan het eind valt het laatste weg, en dat gat blijft open.', en: 'Copying always begins with a starter piece. At the very end the last one falls away, and that gap stays open.' } },
        2: { tag: ['korter', 'shorter'], title: { nl: 'Elke deling een beetje korter', en: 'A bit shorter every division' }, text: { nl: 'Zo worden de uiteinden in de meeste cellen bij elke deling korter. Zijn ze te kort, dan stopt de cel met delen.', en: 'So in most cells the ends get shorter with every division. When they are too short, the cell stops dividing.' } },
        4: { tag: ['verlengen', 'lengthening'], title: { nl: 'Een eiwit verlengt het uiteinde', en: 'A protein lengthens the end' }, text: { nl: 'Een speciaal eiwit draagt een eigen stukje RNA als voorbeeld en hangt er letter per letter nieuw DNA aan.', en: 'A special protein carries its own piece of RNA as an example and adds new DNA to the end, letter by letter.' } },
        9: { tag: ['kapje', 'cover'], title: { nl: 'Een eiwitkapje beschermt het uiteinde', en: 'A protein cover protects the end' }, text: { nl: 'Een groepje eiwitten bedekt het uiteinde. Zo denkt de cel niet dat haar DNA gebroken is.', en: 'A small group of proteins covers the end. This way the cell does not think its DNA is broken.' } },
      },
    },
    secundair: {
      kort: { nl: 'Telomeren zijn de uiteinden van chromosomen: vele herhalingen van TTAGGG. Door het eindreplicatieprobleem worden ze bij elke deling korter, tenzij het enzym telomerase ze verlengt. De eiwitkap shelterin zorgt dat de cel ze niet als DNA-breuk ziet.', en: 'Telomeres are the ends of chromosomes: many repeats of TTAGGG. Because of the end-replication problem they get shorter with every division, unless the enzyme telomerase lengthens them. The protein cap shelterin makes sure the cell does not see them as DNA breaks.' },
      terms: [
        [{ nl: 'telomeer', en: 'telomere' }, { nl: 'Het uiteinde van een chromosoom, uit vele herhalingen van TTAGGG.', en: 'The end of a chromosome, made of many TTAGGG repeats.' }],
        [{ nl: 'eindreplicatieprobleem', en: 'end-replication problem' }, { nl: 'Het allerlaatste stukje van een streng kan niet gekopieerd worden.', en: 'The very last bit of a strand cannot be copied.' }],
        [{ nl: 'telomerase', en: 'telomerase' }, { nl: 'Het enzym dat telomeren verlengt met zijn eigen RNA als matrijs.', en: 'The enzyme that lengthens telomeres using its own RNA as a template.' }],
        [{ nl: 'shelterin', en: 'shelterin' }, { nl: 'De eiwitkap die het telomeer bedekt en beschermt.', en: 'The protein cap that covers and protects the telomere.' }],
      ],
      steps: {
        0: { tag: ['telomeer', 'telomere'], title: { nl: 'Telomeren: de uiteinden van chromosomen', en: 'Telomeres: the ends of chromosomes' }, text: { nl: 'Chromosomen eindigen in telomeren: vele herhalingen van TTAGGG. Eén streng steekt aan het eind een stukje uit.', en: 'Chromosomes end in telomeres: many repeats of TTAGGG. One strand sticks out a little at the end.' } },
        1: { tag: ['eindprobleem', 'end problem'], title: { nl: 'Het eindreplicatieprobleem', en: 'The end-replication problem' }, text: { nl: 'De laatste RNA-primer valt weg. Dat gat kan niet opgevuld worden, want er is geen startpunt meer.', en: 'The last RNA primer falls away. That gap cannot be filled, because there is no starting point left.' } },
        2: { tag: ['korter worden', 'shortening'], title: { nl: 'Bij elke deling korter', en: 'Shorter with every division' }, text: { nl: 'In de meeste cellen worden telomeren zo bij elke deling korter. Zijn ze te kort, dan stopt de cel met delen.', en: 'In most cells telomeres get shorter with every division this way. When they are too short, the cell stops dividing.' } },
        4: { tag: ['telomerase', 'telomerase'], title: { nl: 'Telomerase verlengt het telomeer', en: 'Telomerase lengthens the telomere' }, text: { nl: 'Telomerase gebruikt zijn eigen RNA als matrijs en hangt nieuwe TTAGGG-herhalingen aan het DNA.', en: 'Telomerase uses its own RNA as a template and adds new TTAGGG repeats to the DNA.' } },
        9: { tag: ['shelterin', 'shelterin'], title: { nl: 'Shelterin beschermt het uiteinde', en: 'Shelterin protects the end' }, text: { nl: 'Een groep van zes eiwitten, shelterin, bedekt het telomeer. Zo ziet de cel het uiteinde niet als een DNA-breuk.', en: 'A group of six proteins, shelterin, covers the telomere. This way the cell does not see the end as a DNA break.' } },
      },
    },
  },
  'herstel': {
    hobby: {
      kort: { nl: 'DNA raakt elke dag beschadigd, en bij het kopiëren sluipen soms foutjes in. Voor elk soort schade heeft de cel een eigen manier van herstellen. Lukt herstellen niet, dan stapelen de fouten zich op.', en: 'DNA gets damaged every day, and copying sometimes lets small errors slip in. For each kind of damage the cell has its own way of repairing. When repair fails, the errors pile up.' },
      steps: {
        0: { tag: ['overzicht', 'overview'], title: { nl: 'Elk soort schade, een eigen herstel', en: 'Each kind of damage, its own repair' }, text: { nl: 'DNA raakt elke dag beschadigd, en bij het kopiëren sluipen foutjes in. Voor elk soort schade kiest de cel een eigen aanpak.', en: 'DNA gets damaged every day, and copying lets small errors slip in. For each kind of damage the cell picks its own approach.' } },
        3: { tag: ['zonlicht', 'sunlight'], title: { nl: 'Bult door UV-licht: stukje vervangen', en: 'Bump from UV light: replace a piece' }, text: { nl: 'UV-licht kan een bult in het DNA maken. Dan vervangt de cel een kort stukje van die streng.', en: 'UV light can make a bump in the DNA. The cell then replaces a short piece of that strand.' } },
        4: { tag: ['breuk', 'break'], title: { nl: 'Breuk: lijmen of de kopie gebruiken', en: 'Break: glue, or use the copy' }, text: { nl: 'Zijn beide strengen gebroken, dan lijmt de cel de uiteinden. Of ze gebruikt na het kopiëren de identieke kopie als voorbeeld.', en: 'If both strands are broken, the cell glues the ends. Or, after copying, it uses the identical copy as an example.' } },
        5: { tag: ['herstel faalt', 'repair fails'], title: { nl: 'Als herstel faalt, stapelen fouten zich op', en: 'When repair fails, errors pile up' }, text: { nl: 'Werkt herstel niet, dan ontstaan meer fouten in het DNA en stijgt de kans op kanker. Een bewaker-eiwit kan de cel dan laten pauzeren of opruimen.', en: 'If repair fails, more errors appear in the DNA and the risk of cancer goes up. A guard protein can then make the cell pause or clear itself away.' } },
      },
    },
    secundair: {
      kort: { nl: 'DNA raakt elke dag beschadigd en bij replicatie ontstaan soms fouten. Voor elk soort schade heeft de cel een eigen herstelroute, met de onbeschadigde streng of de zusterchromatide als voorbeeld. Werkt herstel niet, dan stapelen mutaties zich op.', en: 'DNA is damaged every day and replication sometimes makes errors. For each kind of damage the cell has its own repair route, using the undamaged strand or the sister chromatid as an example. When repair fails, mutations pile up.' },
      terms: [
        [{ nl: 'herstelroute', en: 'repair route' }, { nl: 'Een reeks stappen waarmee de cel één soort DNA-schade herstelt.', en: 'A series of steps the cell uses to repair one kind of DNA damage.' }],
        [{ nl: 'dubbelstrengbreuk', en: 'double-strand break' }, { nl: 'Een breuk door beide strengen van het DNA.', en: 'A break through both strands of the DNA.' }],
        [{ nl: 'mutatie', en: 'mutation' }, { nl: 'Een blijvende verandering in het DNA.', en: 'A permanent change in the DNA.' }],
        [{ nl: 'p53', en: 'p53' }, { nl: 'Een eiwit dat de cel bij schade laat pauzeren of opruimen.', en: 'A protein that makes a damaged cell pause or clear itself away.' }],
      ],
      steps: {
        0: { tag: ['herstelroutes', 'repair routes'], title: { nl: 'Elk soort schade heeft een eigen herstelroute', en: 'Each kind of damage has its own repair route' }, text: { nl: 'DNA raakt elke dag beschadigd en bij replicatie sluipen fouten in. De cel kiest per soort schade een eigen herstelroute.', en: 'DNA is damaged every day and replication lets errors slip in. The cell picks its own repair route for each kind of damage.' } },
        3: { tag: ['UV-schade', 'UV damage'], title: { nl: 'UV-bult: een stuk streng vervangen', en: 'UV bump: replace a piece of strand' }, text: { nl: 'UV-licht maakt een bult in het DNA. Nucleotide-excisieherstel vervangt dan een stukje van die streng.', en: 'UV light makes a bump in the DNA. Nucleotide excision repair then replaces a piece of that strand.' } },
        4: { tag: ['dubbelstrengbreuk', 'strand break'], title: { nl: 'Dubbelstrengbreuk: lijmen of kopiëren', en: 'Double-strand break: glue or copy' }, text: { nl: 'Zijn beide strengen gebroken, dan lijmt de cel de uiteinden, of gebruikt ze na replicatie de zusterchromatide als voorbeeld.', en: 'If both strands are broken, the cell glues the ends, or after replication it uses the sister chromatid as an example.' } },
        5: { tag: ['mutaties', 'mutations'], title: { nl: 'Als herstel faalt, stapelen mutaties zich op', en: 'When repair fails, mutations pile up' }, text: { nl: 'Werkt een route niet, dan ontstaan meer mutaties en stijgt de kans op kanker. Het eiwit p53 kan de cel dan laten pauzeren of opruimen.', en: 'If a route fails, more mutations arise and the risk of cancer goes up. The protein p53 can then make the cell pause or clear itself away.' } },
      },
    },
  },
  'mmr': {
    hobby: {
      kort: { nl: 'Bij het kopiëren van DNA wordt soms een verkeerde letter gezet. Meestal ziet de bouwer dat zelf en haalt hij ze meteen weg. Ontsnapt er toch een fout, dan vindt een tweede ploeg ze, knipt het stuk uit de nieuwe streng en maakt het opnieuw.', en: 'When DNA is copied, a wrong letter is sometimes put in. Usually the builder notices and removes it at once. If an error still slips through, a second team finds it, cuts that piece out of the new strand and makes it again.' },
      steps: {
        0: { tag: ['nalezen', 'checking'], title: { nl: 'Eerst leest de bouwer zelf na', en: 'First the builder checks itself' }, text: { nl: 'Zet de DNA-bouwer een foute letter, dan haalt hij die meestal meteen weg. Hier zie je de hulp voor de zeldzame fout die toch ontsnapt.', en: 'If the DNA builder puts in a wrong letter, it usually removes it at once. Here you see the help for the rare error that still slips through.' } },
        3: { tag: ['past niet', 'no match'], title: { nl: 'G tegenover T: dat past niet', en: 'G opposite T: that does not fit' }, text: { nl: 'Na het kopiëren staat hier een G tegenover een T. Normaal hoort G bij C, en A bij T.', en: 'After copying, a G sits opposite a T here. Normally G goes with C, and A with T.' } },
        5: { tag: ['wegknippen', 'cutting out'], title: { nl: 'Het foute stuk gaat eruit', en: 'The wrong piece comes out' }, text: { nl: 'Helpers knippen de nieuwe streng in en halen een stuk met de fout weg. De oude streng blijft heel.', en: 'Helpers cut the new strand and remove a piece with the error. The old strand stays whole.' } },
        6: { tag: ['opnieuw', 'rebuilt'], title: { nl: 'Opnieuw gemaakt, nu juist', en: 'Made again, now correct' }, text: { nl: 'De bouwer maakt het stuk opnieuw, met de oude streng als voorbeeld. Zo gebeuren er zo’n honderd keer minder fouten.', en: 'The builder makes the piece again, using the old strand as an example. This way about a hundred times fewer errors happen.' } },
      },
    },
    secundair: {
      kort: { nl: 'De nauwkeurigheid van replicatie komt uit drie stappen: DNA-polymerase kiest de juiste base, leest zelf na, en wat dan nog ontsnapt, verbetert mismatch-herstel. Mismatch-herstel haalt de fout enkel uit de nieuwe streng.', en: 'The accuracy of replication comes from three steps: DNA polymerase picks the right base, checks its own work, and whatever still slips through is fixed by mismatch repair. Mismatch repair removes the error only from the new strand.' },
      terms: [
        [{ nl: 'proeflezen', en: 'proofreading' }, { nl: 'DNA-polymerase controleert zelf de pas gezette base en haalt een fout weg.', en: 'DNA polymerase checks the base it just added and removes an error.' }],
        [{ nl: 'mismatch', en: 'mismatch' }, { nl: 'Twee basen tegenover elkaar die niet bij elkaar passen.', en: 'Two bases opposite each other that do not fit together.' }],
        [{ nl: 'mismatch-herstel', en: 'mismatch repair' }, { nl: 'Het herstel dat een mismatch uit de nieuwe streng knipt en opnieuw maakt.', en: 'The repair that cuts a mismatch out of the new strand and rebuilds it.' }],
      ],
      steps: {
        0: { tag: ['proeflezen', 'proofreading'], title: { nl: 'Proeflezen: de polymerase leest zelf na', en: 'Proofreading: the polymerase checks itself' }, text: { nl: 'Zet DNA-polymerase een foute base, dan haalt het die meestal meteen weg. Mismatch-herstel vangt de zeldzame fout die toch ontsnapt.', en: 'If DNA polymerase adds a wrong base, it usually removes it at once. Mismatch repair catches the rare error that still slips through.' } },
        3: { tag: ['mismatch', 'mismatch'], title: { nl: 'Een mismatch: G tegenover T', en: 'A mismatch: G opposite T' }, text: { nl: 'Na replicatie staat hier een G tegenover een T: een mismatch. Een juist paar is G met C, of A met T.', en: 'After replication a G sits opposite a T here: a mismatch. A correct pair is G with C, or A with T.' } },
        5: { tag: ['nieuwe streng', 'new strand'], title: { nl: 'De fout gaat uit de nieuwe streng', en: 'The error is removed from the new strand' }, text: { nl: 'Eiwitten knippen de nieuwe streng in en halen een stuk met de fout weg. De oude streng blijft heel.', en: 'Proteins cut the new strand and remove a piece with the error. The old strand stays whole.' } },
        6: { tag: ['hersteld', 'rebuilt'], title: { nl: 'Opnieuw gemaakt, nu juist', en: 'Made again, now correct' }, text: { nl: 'DNA-polymerase maakt het stuk opnieuw met de oude streng als matrijs. Zo gebeuren er ongeveer honderd keer minder fouten.', en: 'DNA polymerase rebuilds the piece using the old strand as a template. This way about a hundred times fewer errors happen.' } },
      },
    },
  },
  'ber': {
    hobby: {
      kort: { nl: 'Soms verandert één letter van het DNA vanzelf, bijvoorbeeld een C die een U wordt. Een herstel-eiwit haalt die ene letter eruit. Daarna zetten helpers de juiste letter terug en plakken ze de streng weer dicht.', en: 'Sometimes one DNA letter changes by itself, for example a C that turns into a U. A repair protein takes out that one letter. Then helpers put the right letter back and seal the strand again.' },
      steps: {
        0: { tag: ['C wordt U', 'C becomes U'], title: { nl: 'Eén letter is vanzelf veranderd', en: 'One letter changed by itself' }, text: { nl: 'Een C kan vanzelf in een U veranderen. Een U hoort niet in DNA en geeft bij de volgende kopie een fout.', en: 'A C can turn into a U by itself. A U does not belong in DNA and causes an error in the next copy.' } },
        1: { tag: ['zoeken', 'searching'], title: { nl: 'Een eiwit zoekt de fout', en: 'A protein looks for the error' }, text: { nl: 'Dit herstel-eiwit glijdt over het DNA, op zoek naar een U.', en: 'This repair protein slides along the DNA, looking for a U.' } },
        5: { tag: ['snel klaar', 'quick fix'], title: { nl: 'Kleine schade, snel hersteld', en: 'Small damage, quickly fixed' }, text: { nl: 'De U is eruit en de juiste letter staat terug. Voor grotere schade heeft de cel een andere aanpak.', en: 'The U is out and the right letter is back. For bigger damage the cell has another approach.' } },
      },
    },
    secundair: {
      kort: { nl: 'Base-excisieherstel verwijdert kleine schade aan één base, zoals uracil in DNA. Een DNA-glycosylase klapt de foute base uit de helix en knipt ze los. Daarna zetten andere enzymen de juiste base terug, met de andere streng als voorbeeld.', en: 'Base excision repair removes small damage to one base, such as uracil in DNA. A DNA glycosylase flips the wrong base out of the helix and cuts it loose. Other enzymes then put the right base back, using the other strand as an example.' },
      terms: [
        [{ nl: 'base-excisieherstel', en: 'base excision repair' }, { nl: 'Herstel waarbij één beschadigde base vervangen wordt.', en: 'Repair in which one damaged base is replaced.' }],
        [{ nl: 'uracil', en: 'uracil' }, { nl: 'De base U, die ontstaat als een C verandert en niet in DNA hoort.', en: 'The base U, which forms when a C changes and does not belong in DNA.' }],
        [{ nl: 'DNA-glycosylase', en: 'DNA glycosylase' }, { nl: 'Het enzym dat een foute base herkent en losknipt.', en: 'The enzyme that recognises a wrong base and cuts it loose.' }],
      ],
      steps: {
        0: { tag: ['uracil', 'uracil'], title: { nl: 'Een C wordt een U', en: 'A C becomes a U' }, text: { nl: 'Cytosine kan vanzelf in uracil veranderen. U hoort niet in DNA en geeft bij de volgende replicatie een fout.', en: 'Cytosine can turn into uracil by itself. U does not belong in DNA and causes an error at the next replication.' } },
        1: { tag: ['glycosylase', 'glycosylase'], title: { nl: 'Een DNA-glycosylase tast het DNA af', en: 'A DNA glycosylase scans the DNA' }, text: { nl: 'Dit herstelenzym, een DNA-glycosylase, glijdt over het DNA op zoek naar een U.', en: 'This repair enzyme, a DNA glycosylase, slides along the DNA looking for a U.' } },
        5: { tag: ['BER', 'BER'], title: { nl: 'Kleine schade, snel hersteld', en: 'Small damage, quickly repaired' }, text: { nl: 'De U is verwijderd en de juiste base teruggezet. Zo vervangt base-excisieherstel telkens één base; grotere schade vraagt een andere route.', en: 'The U is removed and the right base put back. Base excision repair replaces one base at a time; bigger damage needs another route.' } },
      },
    },
  },
  'ner': {
    hobby: {
      kort: { nl: 'UV-licht kan twee letters van het DNA aan elkaar vastmaken. Dat geeft een bult. Helpers vinden die bult, knippen een stukje streng weg en bouwen het opnieuw, met de andere streng als voorbeeld.', en: 'UV light can stick two DNA letters together. That makes a bump. Helpers find the bump, cut out a piece of the strand and rebuild it, using the other strand as an example.' },
      steps: {
        0: { tag: ['UV-schade', 'UV damage'], title: { nl: 'UV-licht plakt twee letters aan elkaar', en: 'UV light sticks two letters together' }, text: { nl: 'UV-licht kan twee T’s naast elkaar aan elkaar vastmaken. Daardoor krijgt het DNA een bult.', en: 'UV light can stick two T’s next to each other together. This gives the DNA a bump.' } },
        1: { tag: ['opsporen', 'spotting'], title: { nl: 'Een eiwit voelt de bult', en: 'A protein feels the bump' }, text: { nl: 'Een speurder-eiwit merkt dat het DNA vervormd is en roept een ploeg helpers op.', en: 'A scout protein notices that the DNA is bent out of shape and calls a team of helpers.' } },
        5: { tag: ['knippen', 'cutting'], title: { nl: 'Knippen aan beide kanten', en: 'Cutting on both sides' }, text: { nl: 'Twee schaartjes knippen links en rechts van de bult in dezelfde streng. Dat stukje gaat eruit.', en: 'Two little scissors cut left and right of the bump in the same strand. That piece comes out.' } },
        8: { tag: ['hersteld', 'repaired'], title: { nl: 'Hersteld: zelfde letters, geen bult', en: 'Repaired: same letters, no bump' }, text: { nl: 'Het gat is opgevuld en het DNA is weer recht. Werkt dit herstel niet, dan geeft zonlicht veel vaker huidkanker.', en: 'The gap is filled and the DNA is straight again. If this repair fails, sunlight causes skin cancer far more often.' } },
      },
    },
    secundair: {
      kort: { nl: 'Nucleotide-excisieherstel verwijdert grote letsels die de helix vervormen, zoals UV-thyminedimeren. Eiwitten herkennen de vervorming, knippen aan beide kanten van het letsel en vervangen een stuk van de streng.', en: 'Nucleotide excision repair removes large lesions that distort the helix, such as UV thymine dimers. Proteins recognise the distortion, cut on both sides of the lesion and replace a piece of the strand.' },
      terms: [
        [{ nl: 'thyminedimeer', en: 'thymine dimer' }, { nl: 'Twee naburige T’s die door UV-licht aan elkaar gekoppeld zijn.', en: 'Two neighbouring T’s linked together by UV light.' }],
        [{ nl: 'nucleotide-excisieherstel', en: 'nucleotide excision repair' }, { nl: 'Herstel waarbij een stuk streng met het letsel weggeknipt en opnieuw gemaakt wordt.', en: 'Repair in which a piece of strand with the lesion is cut out and rebuilt.' }],
        [{ nl: 'letsel', en: 'lesion' }, { nl: 'Een beschadigde plek in het DNA.', en: 'A damaged spot in the DNA.' }],
      ],
      steps: {
        0: { tag: ['thyminedimeer', 'thymine dimer'], title: { nl: 'UV maakt een thyminedimeer', en: 'UV makes a thymine dimer' }, text: { nl: 'UV-licht kan twee naburige T’s aan elkaar koppelen tot een thyminedimeer. Daardoor vervormt het DNA.', en: 'UV light can link two neighbouring T’s into a thymine dimer. This distorts the DNA.' } },
        1: { tag: ['herkenning', 'recognition'], title: { nl: 'Herkenning van de vervorming', en: 'Recognising the distortion' }, text: { nl: 'Een herkenningseiwit merkt dat het DNA vervormd is en roept andere herstel-eiwitten op.', en: 'A recognition protein notices that the DNA is distorted and calls other repair proteins.' } },
        5: { tag: ['excisie', 'excision'], title: { nl: 'Knippen aan beide kanten', en: 'Cutting on both sides' }, text: { nl: 'Twee enzymen knippen links en rechts van het letsel in dezelfde streng. Het stuk met het letsel wordt verwijderd.', en: 'Two enzymes cut left and right of the lesion in the same strand. The piece with the lesion is removed.' } },
        8: { tag: ['hersteld', 'repaired'], title: { nl: 'Hersteld, zonder vervorming', en: 'Repaired, without distortion' }, text: { nl: 'Het gat is opgevuld met de andere streng als matrijs. Werkt dit herstel niet, dan geeft zonlicht veel vaker huidkanker.', en: 'The gap is filled using the other strand as a template. If this repair fails, sunlight causes skin cancer far more often.' } },
      },
    },
  },
  'dsb': {
    hobby: {
      kort: { nl: 'Soms breekt het DNA dwars door beide strengen, in twee stukken. De cel kan de uiteinden snel weer aan elkaar lijmen, maar verliest daarbij soms een paar letters. Na het kopiëren kan ze ook de identieke kopie als voorbeeld gebruiken: trager, maar nauwkeurig.', en: 'Sometimes DNA breaks right through both strands, into two pieces. The cell can quickly glue the ends back together, but sometimes loses a few letters. After copying it can also use the identical copy as an example: slower, but accurate.' },
      steps: {
        0: { tag: ['breuk', 'break'], title: { nl: 'Een breuk door beide strengen', en: 'A break through both strands' }, text: { nl: 'Straling of een vastgelopen kopieermachine kan beide strengen breken. Het DNA ligt dan in twee stukken.', en: 'Radiation or a stuck copying machine can break both strands. The DNA then lies in two pieces.' } },
        1: { tag: ['ringen erop', 'rings on'], title: { nl: 'Snel lijmen: ringen op de uiteinden', en: 'Quick gluing: rings on the ends' }, text: { nl: 'Een ringvormig eiwit schuift over elk uiteinde en houdt het vast. Dit kan op elk moment.', en: 'A ring-shaped protein slides onto each end and holds it. This can happen at any time.' } },
        4: { tag: ['lijmen', 'gluing'], title: { nl: 'Weer één stuk, maar niet altijd foutloos', en: 'One piece again, not always error-free' }, text: { nl: 'Een lijm-eiwit zet de uiteinden weer aan elkaar, vaak binnen een halfuur. Soms ontbreken er daarna een paar letters.', en: 'A glue protein joins the ends again, often within half an hour. Sometimes a few letters are missing afterwards.' } },
        5: { tag: ['reservekopie', 'spare copy'], title: { nl: 'Na het kopiëren is er een reservekopie', en: 'After copying there is a spare copy' }, text: { nl: 'Als het DNA net gekopieerd is, ligt er naast het gebroken stuk een identieke kopie. Die kan als voorbeeld dienen.', en: 'When the DNA has just been copied, an identical copy lies next to the broken piece. It can serve as an example.' } },
        10: { tag: ['vergelijking', 'comparison'], title: { nl: 'Twee manieren vergeleken', en: 'Two ways compared' }, text: { nl: 'Lijmen kan altijd en gaat snel. De kopie gebruiken kan alleen na het kopiëren, maar is veel nauwkeuriger.', en: 'Gluing is always possible and fast. Using the copy only works after copying, but is far more accurate.' } },
      },
    },
    secundair: {
      kort: { nl: 'Bij een dubbelstrengbreuk zijn beide DNA-strengen gebroken. Niet-homologe eindverbinding (NHEJ) zet de uiteinden snel weer aan elkaar, maar kan letters verliezen. Homologe recombinatie (HR) gebruikt na replicatie de zusterchromatide als matrijs en is nauwkeurig.', en: 'In a double-strand break both DNA strands are broken. Non-homologous end joining (NHEJ) quickly joins the ends again, but can lose letters. Homologous recombination (HR) uses the sister chromatid as a template after replication and is accurate.' },
      terms: [
        [{ nl: 'dubbelstrengbreuk', en: 'double-strand break' }, { nl: 'Een breuk door beide strengen van het DNA.', en: 'A break through both strands of the DNA.' }],
        [{ nl: 'NHEJ', en: 'NHEJ' }, { nl: 'Niet-homologe eindverbinding: de breukuiteinden snel weer aan elkaar zetten.', en: 'Non-homologous end joining: quickly joining the broken ends again.' }],
        [{ nl: 'homologe recombinatie', en: 'homologous recombination' }, { nl: 'Herstel met de zusterchromatide als matrijs, nauwkeurig maar enkel na replicatie.', en: 'Repair using the sister chromatid as a template, accurate but only after replication.' }],
        [{ nl: 'zusterchromatide', en: 'sister chromatid' }, { nl: 'De identieke kopie van een DNA-molecule na replicatie.', en: 'The identical copy of a DNA molecule after replication.' }],
      ],
      steps: {
        0: { tag: ['dubbelstrengbreuk', 'strand break'], title: { nl: 'Een dubbelstrengbreuk', en: 'A double-strand break' }, text: { nl: 'Straling of een vastgelopen replicatievork kan beide strengen breken. Het DNA ligt dan in twee stukken.', en: 'Radiation or a stalled replication fork can break both strands. The DNA then lies in two pieces.' } },
        1: { tag: ['NHEJ', 'NHEJ'], title: { nl: 'NHEJ: ringen op de uiteinden', en: 'NHEJ: rings on the ends' }, text: { nl: 'Bij NHEJ schuift een ringvormig eiwit op elk uiteinde en houdt het vast. Dit kan in elke fase van de celcyclus.', en: 'In NHEJ a ring-shaped protein slides onto each end and holds it. This works in every phase of the cell cycle.' } },
        4: { tag: ['NHEJ', 'NHEJ'], title: { nl: 'NHEJ: snel, maar niet altijd foutloos', en: 'NHEJ: fast, but not always error-free' }, text: { nl: 'De uiteinden worden weer aan elkaar gezet, vaak binnen een halfuur. Soms ontbreken er daarna letters.', en: 'The ends are joined again, often within half an hour. Sometimes letters are missing afterwards.' } },
        5: { tag: ['zusterchromatide', 'sister chromatid'], title: { nl: 'HR: de zusterchromatide als matrijs', en: 'HR: the sister chromatid as a template' }, text: { nl: 'Na replicatie ligt naast het gebroken DNA een identieke kopie, de zusterchromatide. Homologe recombinatie gebruikt die als matrijs.', en: 'After replication an identical copy lies next to the broken DNA: the sister chromatid. Homologous recombination uses it as a template.' } },
        10: { tag: ['NHEJ of HR', 'NHEJ or HR'], title: { nl: 'NHEJ en HR vergeleken', en: 'NHEJ and HR compared' }, text: { nl: 'NHEJ kan altijd en gaat snel, maar kan letters verliezen. HR werkt alleen na replicatie, maar is veel nauwkeuriger.', en: 'NHEJ is always possible and fast, but can lose letters. HR only works after replication, but is far more accurate.' } },
      },
    },
  },
  'p53': {
    hobby: {
      kort: { nl: 'In onze cellen zit een bewaker voor het DNA: het eiwit p53. Bij schade laat het de cel pauzeren, zodat er tijd is om te herstellen. Is de schade te groot, dan laat het de cel zichzelf opruimen.', en: 'Our cells have a guard for their DNA: the protein p53. When there is damage, it makes the cell pause so there is time for repair. If the damage is too great, it makes the cell clear itself away.' },
      steps: {
        0: { tag: ['bewaker', 'guard'], title: { nl: 'De bewaker van het DNA', en: 'The guard of the DNA' }, text: { nl: 'p53 is een eiwit dat alarm slaat als het DNA beschadigd is. Hier zit het vast op een stukje DNA.', en: 'p53 is a protein that raises the alarm when DNA is damaged. Here it is stuck to a piece of DNA.' } },
        1: { tag: ['alarm aan', 'alarm on'], title: { nl: 'Schade zet het alarm aan', en: 'Damage switches on the alarm' }, text: { nl: 'Bij een breuk krijgt p53 een merkteken. Daardoor wordt het niet meer afgebroken en stapelt het zich op.', en: 'At a break, p53 gets a mark. Because of this it is no longer broken down and builds up.' } },
        3: { tag: ['pauzeren', 'pausing'], title: { nl: 'Eerst pauzeren en herstellen', en: 'First pause and repair' }, text: { nl: 'p53 zet een gen aan dat een rem maakt op de celdeling. Zo krijgt de cel tijd om het DNA te herstellen.', en: 'p53 switches on a gene that makes a brake on cell division. This gives the cell time to repair the DNA.' } },
        4: { tag: ['opruimen', 'clearing up'], title: { nl: 'Te veel schade: de cel ruimt zichzelf op', en: 'Too much damage: the cell clears itself' }, text: { nl: 'Is de schade te groot, dan zet p53 genen aan waardoor de cel sterft. Zo geeft ze de schade niet door.', en: 'If the damage is too great, p53 switches on genes that make the cell die. That way it does not pass on the damage.' } },
      },
    },
    secundair: {
      kort: { nl: 'p53 is een transcriptiefactor die de bewaker van het genoom genoemd wordt. Bij DNA-schade wordt p53 niet meer afgebroken en zet het genen aan die de celcyclus pauzeren voor herstel. Bij te veel schade start het apoptose.', en: 'p53 is a transcription factor called the guardian of the genome. When DNA is damaged, p53 is no longer broken down and switches on genes that pause the cell cycle for repair. If there is too much damage, it starts apoptosis.' },
      terms: [
        [{ nl: 'p53', en: 'p53' }, { nl: 'Het eiwit dat bij DNA-schade de celcyclus pauzeert of apoptose start.', en: 'The protein that pauses the cell cycle or starts apoptosis when DNA is damaged.' }],
        [{ nl: 'transcriptiefactor', en: 'transcription factor' }, { nl: 'Een eiwit dat op DNA bindt en genen aan- of uitzet.', en: 'A protein that binds DNA and switches genes on or off.' }],
        [{ nl: 'celcyclus', en: 'cell cycle' }, { nl: 'De reeks fasen waarin een cel groeit, haar DNA kopieert en deelt.', en: 'The series of phases in which a cell grows, copies its DNA and divides.' }],
        [{ nl: 'apoptose', en: 'apoptosis' }, { nl: 'Geprogrammeerde celdood: de cel ruimt zichzelf op.', en: 'Programmed cell death: the cell clears itself away.' }],
      ],
      steps: {
        0: { tag: ['p53', 'p53'], title: { nl: 'p53: bewaker van het genoom', en: 'p53: guardian of the genome' }, text: { nl: 'p53 is een transcriptiefactor die alarm slaat bij DNA-schade. Hier zit het vast op een stuk DNA.', en: 'p53 is a transcription factor that raises the alarm when DNA is damaged. Here it is bound to a piece of DNA.' } },
        1: { tag: ['alarm aan', 'alarm on'], title: { nl: 'Schade zet het alarm aan', en: 'Damage switches on the alarm' }, text: { nl: 'Bij een breuk zetten alarm-enzymen een merkteken op p53. Daardoor wordt p53 niet meer afgebroken en stapelt het zich op.', en: 'At a break, alarm enzymes put a mark on p53. Then p53 is no longer broken down and builds up.' } },
        3: { tag: ['celcyclus', 'cell cycle'], title: { nl: 'Eerst de celcyclus pauzeren', en: 'First pause the cell cycle' }, text: { nl: 'p53 zet een gen aan dat een rem op de celcyclus maakt. Zo krijgt de cel tijd om het DNA te herstellen.', en: 'p53 switches on a gene that makes a brake on the cell cycle. This gives the cell time to repair the DNA.' } },
        4: { tag: ['apoptose', 'apoptosis'], title: { nl: 'Te veel schade: apoptose', en: 'Too much damage: apoptosis' }, text: { nl: 'Is de schade te groot, dan zet p53 genen aan voor apoptose, geprogrammeerde celdood. Zo geeft de cel de schade niet door.', en: 'If the damage is too great, p53 switches on genes for apoptosis, programmed cell death. That way the cell does not pass on the damage.' } },
      },
    },
  },
  'mutaties': {
    hobby: {
      kort: { nl: 'Een mutatie is een blijvende verandering in het DNA, zoals een tikfout in een recept. Soms verandert het eiwit niet, soms verandert er één bouwsteen, soms stopt het eiwit veel te vroeg. Zo kan één letter een ziekte zoals sikkelcelziekte veroorzaken.', en: 'A mutation is a permanent change in the DNA, like a typo in a recipe. Sometimes the protein does not change, sometimes one building block changes, sometimes the protein stops far too early. This is how one letter can cause a disease like sickle cell disease.' },
      steps: {
        0: { tag: ['gen naar eiwit', 'gene to protein'], title: { nl: 'Van gen naar eiwit', en: 'From gene to protein' }, text: { nl: 'Dit is het begin van een gen voor een eiwit in het bloed. Elke drie letters staan voor één bouwsteen van het eiwit.', en: 'This is the start of a gene for a protein in the blood. Every three letters stand for one building block of the protein.' } },
        1: { tag: ['één letter', 'one letter'], title: { nl: 'Eén letter wordt vervangen', en: 'One letter is swapped' }, text: { nl: 'Bij deze mutatie verandert één letter van het DNA in een andere letter.', en: 'In this mutation one DNA letter changes into another letter.' } },
        3: { tag: ['sikkelcel', 'sickle cell'], title: { nl: 'Eén andere bouwsteen: sikkelcel', en: 'One different building block: sickle cell' }, text: { nl: 'Door één andere letter krijgt het eiwit één andere bouwsteen. Bij weinig zuurstof klitten die eiwitten dan samen tot draden.', en: 'Because of one different letter, the protein gets one different building block. At low oxygen these proteins then clump into threads.' } },
        6: { tag: ['verschuiving', 'shift'], title: { nl: 'Eén letter erbij: alles verschuift', en: 'One extra letter: everything shifts' }, text: { nl: 'Eén extra letter verschuift de indeling in groepjes van drie. Alles erna wordt fout gelezen, tot er een stopteken komt.', en: 'One extra letter shifts the grouping into threes. Everything after it is read wrongly, until a stop sign appears.' } },
      },
    },
    secundair: {
      kort: { nl: 'Een mutatie is een blijvende verandering in de DNA-sequentie. Een puntmutatie vervangt één base; een insertie of deletie voegt basen toe of haalt ze weg. Het effect op het eiwit hangt af van hoe het veranderde codon gelezen wordt.', en: 'A mutation is a permanent change in the DNA sequence. A point mutation replaces one base; an insertion or deletion adds or removes bases. The effect on the protein depends on how the changed codon is read.' },
      terms: [
        [{ nl: 'mutatie', en: 'mutation' }, { nl: 'Een blijvende verandering in de DNA-sequentie.', en: 'A permanent change in the DNA sequence.' }],
        [{ nl: 'codon', en: 'codon' }, { nl: 'Een groepje van drie basen dat één aminozuur bepaalt.', en: 'A group of three bases that specifies one amino acid.' }],
        [{ nl: 'puntmutatie', en: 'point mutation' }, { nl: 'Een mutatie waarbij één base vervangen wordt.', en: 'A mutation in which one base is replaced.' }],
        [{ nl: 'frameshift', en: 'frameshift' }, { nl: 'Een verschuiving van de indeling in codons door een extra of ontbrekende base.', en: 'A shift in the grouping into codons caused by an extra or missing base.' }],
      ],
      steps: {
        0: { tag: ['codon', 'codon'], title: { nl: 'Van gen naar eiwit', en: 'From gene to protein' }, text: { nl: 'Dit is het begin van het gen voor hemoglobine. Elke drie basen, een codon, bepalen één aminozuur.', en: 'This is the start of the gene for haemoglobin. Every three bases, a codon, specify one amino acid.' } },
        1: { tag: ['puntmutatie', 'point mutation'], title: { nl: 'Puntmutatie: één base vervangen', en: 'Point mutation: one base swapped' }, text: { nl: 'Bij een puntmutatie verandert één base in een andere.', en: 'In a point mutation one base changes into another.' } },
        3: { tag: ['sikkelcel', 'sickle cell'], title: { nl: 'Eén ander aminozuur: sikkelcelanemie', en: 'One different amino acid: sickle cell' }, text: { nl: 'Het codon GAG wordt GTG, zodat hemoglobine één ander aminozuur krijgt. Bij weinig zuurstof klitten de hemoglobines dan aaneen tot vezels.', en: 'The codon GAG becomes GTG, so haemoglobin gets one different amino acid. At low oxygen the haemoglobins then clump into fibres.' } },
        6: { tag: ['frameshift', 'frameshift'], title: { nl: 'Frameshift: één base erbij', en: 'Frameshift: one extra base' }, text: { nl: 'Eén extra base verschuift de indeling in codons. Alle codons erna veranderen, tot er een stopcodon komt.', en: 'One extra base shifts the grouping into codons. All codons after it change, until a stop codon appears.' } },
      },
    },
  },
};
