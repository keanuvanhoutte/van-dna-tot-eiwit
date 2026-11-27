/* Eenvoudige teksten voor de niveaus hobbyist en secundair (groep txnrna). Sleutels van steps = stapnummer in de animatie. */
export default {
  'srf': {
    hobby: {
      kort: { nl: 'Sommige genen gaan heel snel aan, binnen enkele minuten na een seintje om te groeien. Bij het gen FOS zitten de schakelaars al klaar op het DNA en hebben ze alleen een duwtje nodig. Het eiwit dat zo ontstaat, zet daarna zelf andere genen aan.', en: 'Some genes switch on very fast, within minutes of a signal to grow. For the gene FOS, the switches are already waiting on the DNA and only need a little push. The protein that is made then switches on other genes itself.' },
      steps: {
        0: { tag: ['seintje', 'signal'], title: { nl: 'Een seintje komt de celkern in', en: 'A signal enters the nucleus' }, text: { nl: 'Een boodschapper-eiwit komt de celkern in, waar vóór het gen FOS een schakelaar ligt met eiwitten die al klaarzitten.', en: 'A messenger protein enters the nucleus, where a switch lies in front of the gene FOS with proteins already waiting.' } },
        5: { tag: ['kopie maken', 'copying'], title: { nl: 'Het gen wordt overgeschreven', en: 'The gene is copied' }, text: { nl: 'Een kopieermachine leest het gen af, en binnen enkele minuten is er al een eerste RNA-kopie.', en: 'A copying machine reads the gene, and within minutes there is already a first RNA copy.' } },
        7: { tag: ['volgende golf', 'next wave'], title: { nl: 'Later gaan nog meer genen aan', en: 'Later, more genes switch on' }, text: { nl: 'Het nieuwe eiwit werkt later samen met een partner, en samen zetten ze een volgende golf genen aan.', en: 'Later the new protein teams up with a partner, and together they switch on a next wave of genes.' } },
      },
    },
    secundair: {
      kort: { nl: 'FOS is een onmiddellijk-vroeg gen: het wordt binnen minuten na een groeisignaal afgeschreven. De transcriptiefactoren SRF en Elk-1 zitten al klaar op het serum-responselement (SRE). ERK fosforyleert Elk-1 en zet zo de transcriptie van FOS aan.', en: 'FOS is an immediate early gene: it is transcribed within minutes of a growth signal. The transcription factors SRF and Elk-1 are already waiting on the serum response element (SRE). ERK phosphorylates Elk-1 and so switches on FOS transcription.' },
      terms: [
        [{ nl: 'onmiddellijk-vroeg gen', en: 'immediate early gene' }, { nl: 'Een gen dat binnen minuten na een signaal wordt afgeschreven, zonder dat eerst nieuwe eiwitten nodig zijn.', en: 'A gene that is transcribed within minutes of a signal, without new proteins being made first.' }],
        [{ nl: 'transcriptiefactor', en: 'transcription factor' }, { nl: 'Een eiwit dat op het DNA bindt en mee bepaalt of een gen wordt afgeschreven.', en: 'A protein that binds DNA and helps decide whether a gene is transcribed.' }],
        [{ nl: 'serum-responselement', en: 'serum response element' }, { nl: 'De schakelaar in het DNA vóór het FOS-gen, waarop SRF en Elk-1 zitten.', en: 'The switch in the DNA in front of the FOS gene, where SRF and Elk-1 sit.' }],
        [{ nl: 'fosforylering', en: 'phosphorylation' }, { nl: 'Het aanhangen van een fosfaatgroep aan een eiwit, waardoor het eiwit aan of uit gaat.', en: 'Adding a phosphate group to a protein, which switches the protein on or off.' }],
      ],
      steps: {
        0: { tag: ['ERK', 'ERK'], title: { nl: 'ERK bereikt het FOS-gen', en: 'ERK reaches the FOS gene' }, text: { nl: 'Actief ERK komt de kern in. Vóór het FOS-gen ligt het SRE, een schakelaar in het DNA waarop transcriptiefactoren al klaarzitten.', en: 'Active ERK enters the nucleus. In front of the FOS gene lies the SRE, a switch in the DNA where transcription factors are already waiting.' } },
        5: { tag: ['transcriptie', 'transcription'], title: { nl: 'FOS wordt afgeschreven', en: 'FOS is transcribed' }, text: { nl: 'RNA-polymerase leest het FOS-gen af. Binnen enkele minuten is er al een RNA-kopie.', en: 'RNA polymerase reads the FOS gene. Within minutes there is already an RNA copy.' } },
        7: { tag: ['volgende golf', 'next wave'], title: { nl: 'c-Fos zet een volgende golf genen aan', en: 'c-Fos switches on a next wave of genes' }, text: { nl: 'Later koppelt het eiwit c-Fos aan c-Jun. Samen zetten ze een volgende golf genen aan.', en: 'Later the protein c-Fos pairs with c-Jun. Together they switch on a next wave of genes.' } },
      },
    },
  },

  'transcriptie': {
    hobby: {
      kort: { nl: 'Een gen is een recept dat in het DNA staat. De cel maakt er eerst een kopie van in RNA, zoals je een recept overschrijft uit een kostbaar boek. Dat is de eerste stap van gen naar eiwit.', en: 'A gene is a recipe written in the DNA. The cell first makes a copy of it in RNA, like copying a recipe out of a precious book. That is the first step from gene to protein.' },
      steps: {
        0: { tag: ['startplek', 'start spot'], title: { nl: 'Waar het gen begint', en: 'Where the gene starts' }, text: { nl: 'Vóór het gen ligt een startplek, en een hulpeiwit herkent daar een vast rijtje DNA-letters.', en: 'In front of the gene lies a start spot, and a helper protein recognises a fixed row of DNA letters there.' } },
        2: { tag: ['DNA open', 'DNA opens'], title: { nl: 'Het DNA gaat even open', en: 'The DNA opens for a moment' }, text: { nl: 'De twee strengen van het DNA gaan daar uit elkaar, als een rits, zodat de kopieermachine één streng kan lezen.', en: 'The two strands of the DNA come apart there, like a zip, so the copying machine can read one strand.' } },
        4: { tag: ['RNA groeit', 'RNA grows'], title: { nl: 'Het RNA groeit', en: 'The RNA grows' }, text: { nl: 'De kopieermachine leest één streng en bouwt er een passend RNA tegenover; achter haar gaat het DNA weer dicht.', en: 'The copying machine reads one strand and builds a matching RNA alongside it; behind it the DNA closes again.' } },
        8: { tag: ['tot het einde', 'to the end'], title: { nl: 'Tot het einde van het gen', en: 'To the end of the gene' }, text: { nl: 'De machine leest door tot voorbij het einde van het gen, en intussen wordt het RNA al verder afgewerkt.', en: 'The machine reads on past the end of the gene, and meanwhile the RNA is already being finished.' } },
      },
    },
    secundair: {
      kort: { nl: 'Bij transcriptie maakt RNA-polymerase een RNA-kopie van een gen. Het enzym leest de matrijsstreng af en bouwt er een complementaire RNA-streng tegenover, met U in plaats van T. Dat RNA is de eerste stap van gen naar eiwit.', en: 'In transcription, RNA polymerase makes an RNA copy of a gene. The enzyme reads the template strand and builds a complementary RNA strand, with U instead of T. That RNA is the first step from gene to protein.' },
      terms: [
        [{ nl: 'transcriptie', en: 'transcription' }, { nl: 'Het overschrijven van een gen naar RNA.', en: 'Copying a gene into RNA.' }],
        [{ nl: 'RNA-polymerase', en: 'RNA polymerase' }, { nl: 'Het enzym dat DNA afleest en er RNA mee bouwt.', en: 'The enzyme that reads DNA and builds RNA from it.' }],
        [{ nl: 'promoter', en: 'promoter' }, { nl: 'Het stukje DNA vóór een gen waar de transcriptie start.', en: 'The piece of DNA in front of a gene where transcription starts.' }],
        [{ nl: 'matrijsstreng', en: 'template strand' }, { nl: 'De DNA-streng die wordt afgelezen; het RNA is er complementair aan.', en: 'The DNA strand that is read; the RNA is complementary to it.' }],
      ],
      steps: {
        0: { tag: ['promoter', 'promoter'], title: { nl: 'De promoter: het startpunt', en: 'The promoter: the starting point' }, text: { nl: 'De promoter is de startplek vóór het gen. Een hulpeiwit herkent daar het DNA-stukje TATAAAA.', en: 'The promoter is the start site in front of the gene. A helper protein recognises the DNA stretch TATAAAA there.' } },
        2: { tag: ['DNA open', 'DNA opens'], title: { nl: 'Het DNA gaat open', en: 'The DNA opens' }, text: { nl: 'De twee DNA-strengen gaan bij de promoter uit elkaar. Zo kan RNA-polymerase één streng aflezen.', en: 'The two DNA strands separate at the promoter. Now RNA polymerase can read one strand.' } },
        4: { tag: ['matrijs', 'template'], title: { nl: 'RNA-polymerase bouwt het RNA', en: 'RNA polymerase builds the RNA' }, text: { nl: 'RNA-polymerase leest de matrijsstreng en bouwt er een complementair RNA tegenover. Achter het enzym sluit het DNA weer.', en: 'RNA polymerase reads the template strand and builds a complementary RNA. Behind the enzyme the DNA closes again.' } },
        8: { tag: ['einde', 'end'], title: { nl: 'Tot het einde van het gen', en: 'To the end of the gene' }, text: { nl: 'RNA-polymerase leest door tot voorbij het einde van het gen. Intussen wordt het RNA al bewerkt.', en: 'RNA polymerase reads on past the end of the gene. Meanwhile the RNA is already being processed.' } },
      },
    },
  },

  'genregulatie': {
    hobby: {
      kort: { nl: 'Niet elk gen staat altijd aan. Schakelaar-eiwitten zetten zich op het DNA en bepalen of een gen gelezen wordt, en hoe sterk. Zo verschilt een levercel van een zenuwcel, hoewel ze bijna hetzelfde DNA hebben.', en: 'Not every gene is always on. Switch proteins sit down on the DNA and decide whether a gene is read, and how strongly. That is how a liver cell differs from a nerve cell, even though they have almost the same DNA.' },
      steps: {
        0: { tag: ['gen uit', 'gene off'], title: { nl: 'Een gen dat uit staat', en: 'A gene that is off' }, text: { nl: 'Het DNA is rond kleine klosjes gewonden, waardoor de startplek bedekt is en het gen uit blijft.', en: 'The DNA is wound around little spools, so the start spot is covered and the gene stays off.' } },
        1: { tag: ['schakelaar', 'switch'], title: { nl: 'Een schakelaar-eiwit zet zich op het DNA', en: 'A switch protein lands on the DNA' }, text: { nl: 'Een schakelaar-eiwit zet zich op zijn stukje DNA in een verre versterker en roept helpers op.', en: 'A switch protein sits on its own bit of DNA in a distant booster region and calls in helpers.' } },
        5: { tag: ['lus', 'loop'], title: { nl: 'Het DNA maakt een lus', en: 'The DNA forms a loop' }, text: { nl: 'Het DNA ertussen plooit tot een lus, zodat de verre versterker toch vlak bij de startplek komt.', en: 'The DNA in between folds into a loop, so the distant booster still ends up right next to the start spot.' } },
        7: { tag: ['start', 'start'], title: { nl: 'De kopieermachine wordt klaargezet', en: 'The copying machine is set up' }, text: { nl: 'Op de vrije startplek zetten helpers de machine klaar die de RNA-kopie maakt.', en: 'On the free start spot, helpers set up the machine that makes the RNA copy.' } },
      },
    },
    secundair: {
      kort: { nl: 'Genregulatie bepaalt of, wanneer en hoe sterk een gen wordt afgeschreven. Transcriptiefactoren binden op enhancers en promoters en roepen helpers op die RNA-polymerase klaarzetten. Zo krijgen cellen met bijna hetzelfde DNA toch een andere taak.', en: 'Gene regulation decides whether, when and how strongly a gene is transcribed. Transcription factors bind enhancers and promoters and call in helpers that set up RNA polymerase. That is how cells with almost the same DNA still do different jobs.' },
      terms: [
        [{ nl: 'transcriptiefactor', en: 'transcription factor' }, { nl: 'Een schakelaar-eiwit dat op het DNA bindt en een gen aan- of uitzet.', en: 'A switch protein that binds DNA and turns a gene on or off.' }],
        [{ nl: 'enhancer', en: 'enhancer' }, { nl: 'Een versterkerstuk in het DNA, soms ver van het gen, waarop transcriptiefactoren binden.', en: 'A booster stretch of DNA, sometimes far from the gene, where transcription factors bind.' }],
        [{ nl: 'nucleosoom', en: 'nucleosome' }, { nl: 'Een eiwitklosje waarrond het DNA gewonden is.', en: 'A protein spool that DNA is wound around.' }],
        [{ nl: 'promoter', en: 'promoter' }, { nl: 'De startplek van een gen waar RNA-polymerase wordt klaargezet.', en: 'The start site of a gene where RNA polymerase is set up.' }],
      ],
      steps: {
        0: { tag: ['nucleosoom', 'nucleosome'], title: { nl: 'Een gen dat uit staat', en: 'A gene that is off' }, text: { nl: 'Het DNA is rond nucleosomen gewonden. De promoter is bedekt, dus het gen blijft uit.', en: 'The DNA is wound around nucleosomes. The promoter is covered, so the gene stays off.' } },
        1: { tag: ['transcriptiefactor', 'TF binds'], title: { nl: 'Een transcriptiefactor bindt de enhancer', en: 'A transcription factor binds the enhancer' }, text: { nl: 'Een transcriptiefactor bindt zijn stukje DNA in een verre enhancer. Een ander deel van het eiwit roept helpers op.', en: 'A transcription factor binds its stretch of DNA in a distant enhancer. Another part of the protein calls in helpers.' } },
        5: { tag: ['DNA-lus', 'DNA loop'], title: { nl: 'Het DNA maakt een lus', en: 'The DNA forms a loop' }, text: { nl: 'Het DNA ertussen vormt een lus. Zo komt de verre enhancer toch vlak bij de promoter.', en: 'The DNA in between forms a loop. That brings the distant enhancer right next to the promoter.' } },
        7: { tag: ['start', 'start'], title: { nl: 'RNA-polymerase wordt klaargezet', en: 'RNA polymerase is set up' }, text: { nl: 'Op de vrije promoter zetten hulpeiwitten RNA-polymerase klaar. Dan kan de transcriptie beginnen.', en: 'On the free promoter, helper proteins set up RNA polymerase. Then transcription can begin.' } },
      },
    },
  },

  'promoter': {
    hobby: {
      kort: { nl: 'Aan het begin van elk gen ligt een startgebied op het DNA. Daar zetten hulpeiwitten de kopieermachine klaar die het gen naar RNA overschrijft. Hier wordt beslist of het gen gelezen wordt.', en: 'At the start of every gene lies a start region on the DNA. There, helper proteins set up the copying machine that copies the gene into RNA. This is where the cell decides whether the gene is read.' },
      steps: {
        0: { tag: ['startgebied', 'start region'], title: { nl: 'Het startgebied van een gen', en: 'The start region of a gene' }, text: { nl: 'Rond het startpunt liggen korte herkenningsstukjes in het DNA, al missen de meeste van onze genen het bekendste ervan.', en: 'Around the starting point lie short recognition bits in the DNA, although most of our genes lack the best-known one.' } },
        3: { tag: ['machine komt', 'machine arrives'], title: { nl: 'De kopieermachine komt aan', en: 'The copying machine arrives' }, text: { nl: 'De machine die RNA maakt komt aan en wordt precies boven het startpunt gezet.', en: 'The machine that makes RNA arrives and is placed exactly over the starting point.' } },
        5: { tag: ['DNA open', 'DNA opens'], title: { nl: 'Het DNA gaat open', en: 'The DNA opens' }, text: { nl: 'Een hulpeiwit opent met wat energie het DNA, en de machine zet de eerste RNA-bouwstenen aan elkaar.', en: 'A helper protein uses some energy to open the DNA, and the machine links the first RNA building blocks.' } },
        8: { tag: ['vertrek', 'departure'], title: { nl: 'De machine mag vertrekken', en: 'The machine may set off' }, text: { nl: 'Een helper zet merktekens op de staart van de machine, en dan mag ze verder het gen aflezen.', en: 'A helper puts marks on the tail of the machine, and then it may move on to read the gene.' } },
      },
    },
    secundair: {
      kort: { nl: 'De kernpromoter is het stukje DNA rond de startplaats van een gen. Daar vormen RNA-polymerase II en de algemene transcriptiefactoren samen het preinitiatiecomplex. Hier wordt beslist of het gen wordt afgelezen.', en: 'The core promoter is the stretch of DNA around the start site of a gene. There RNA polymerase II and the general transcription factors form the preinitiation complex. This is where it is decided whether the gene is read.' },
      terms: [
        [{ nl: 'promoter', en: 'promoter' }, { nl: 'Het stukje DNA rond de startplaats waar de transcriptie begint.', en: 'The stretch of DNA around the start site where transcription begins.' }],
        [{ nl: 'TATA-box', en: 'TATA box' }, { nl: 'Een kort herkenningsstukje in sommige promoters; de meeste menselijke genen hebben het niet.', en: 'A short recognition stretch in some promoters; most human genes lack it.' }],
        [{ nl: 'algemene transcriptiefactoren', en: 'general transcription factors' }, { nl: 'Hulpeiwitten die RNA-polymerase II op de promoter klaarzetten.', en: 'Helper proteins that set up RNA polymerase II on the promoter.' }],
        [{ nl: 'preinitiatiecomplex', en: 'preinitiation complex' }, { nl: 'RNA-polymerase II samen met de hulpeiwitten op de promoter, klaar om te starten.', en: 'RNA polymerase II together with its helper proteins on the promoter, ready to start.' }],
      ],
      steps: {
        0: { tag: ['promoter', 'promoter'], title: { nl: 'De promoter: het startgebied', en: 'The promoter: the start region' }, text: { nl: 'Rond de startplaats liggen korte herkenningsstukjes, zoals de TATA-box. De meeste menselijke genen hebben geen TATA-box.', en: 'Around the start site lie short recognition stretches, such as the TATA box. Most human genes have no TATA box.' } },
        3: { tag: ['Pol II', 'Pol II'], title: { nl: 'RNA-polymerase II komt aan', en: 'RNA polymerase II arrives' }, text: { nl: 'RNA-polymerase II komt aan en wordt door de hulpeiwitten precies boven de startplaats gezet.', en: 'RNA polymerase II arrives and is placed by the helper proteins exactly over the start site.' } },
        5: { tag: ['DNA open', 'DNA opens'], title: { nl: 'Het DNA gaat open', en: 'The DNA opens' }, text: { nl: 'Een hulpeiwit opent met energie het DNA bij de startplaats. RNA-polymerase II koppelt de eerste RNA-bouwstenen.', en: 'A helper protein uses energy to open the DNA at the start site. RNA polymerase II joins the first RNA building blocks.' } },
        8: { tag: ['doorstart', 'moving on'], title: { nl: 'RNA-polymerase II vertrekt', en: 'RNA polymerase II moves on' }, text: { nl: 'Een enzym zet fosfaatgroepen op de staart van RNA-polymerase II. Daarna mag het enzym verder het gen afschrijven.', en: 'An enzyme adds phosphate groups to the tail of RNA polymerase II. Then the enzyme may go on transcribing the gene.' } },
      },
    },
  },

  'rnapol': {
    hobby: {
      kort: { nl: 'In de celkern zit een grote kopieermachine die genen voor eiwitten naar RNA overschrijft. Ze heeft een diepe kloof waarin het DNA gelezen en het RNA gebouwd wordt. Een lange staart roept onderweg helpers op die het RNA verder afwerken.', en: 'In the nucleus sits a big copying machine that copies genes for proteins into RNA. It has a deep groove where the DNA is read and the RNA is built. A long tail calls in helpers along the way that finish the RNA.' },
      steps: {
        0: { tag: ['twaalf delen', 'twelve parts'], title: { nl: 'Een machine uit twaalf eiwitten', en: 'A machine of twelve proteins' }, text: { nl: 'De kopieermachine die RNA maakt bestaat uit twaalf eiwitten, met in het midden een kloof waar DNA en RNA zitten.', en: 'The copying machine that makes RNA is built from twelve proteins, with a groove in the middle that holds DNA and RNA.' } },
        2: { tag: ['kaken', 'jaws'], title: { nl: 'Twee kaken rond het DNA', en: 'Two jaws around the DNA' }, text: { nl: 'Een paar eiwitten vormen samen kaken die het DNA vastgrijpen, en een beweeglijke klem sluit zich erover.', en: 'A few proteins together form jaws that grip the DNA, and a movable clamp closes over it.' } },
        3: { tag: ['DNA binnen', 'DNA enters'], title: { nl: 'Het DNA in de kloof', en: 'The DNA in the groove' }, text: { nl: 'Het DNA komt dubbel binnen en gaat open, en alleen de streng die gelezen wordt loopt verder naar binnen.', en: 'The DNA comes in double and opens up, and only the strand being read goes further inside.' } },
      },
    },
    secundair: {
      kort: { nl: 'RNA-polymerase II is het enzym dat in de kern alle eiwitgenen naar RNA kopieert. Het bestaat uit 12 subeenheden die samen een diepe kloof vormen, waarin het DNA wordt gelezen en het RNA gebouwd. Een lange staart roept onderweg enzymen op die het RNA bewerken.', en: 'RNA polymerase II is the enzyme in the nucleus that copies all protein genes into RNA. It is made of 12 subunits that together form a deep cleft, where the DNA is read and the RNA is built. A long tail calls in enzymes along the way that process the RNA.' },
      terms: [
        [{ nl: 'RNA-polymerase II', en: 'RNA polymerase II' }, { nl: 'Het enzym dat in de kern de genen voor eiwitten naar RNA kopieert.', en: 'The enzyme in the nucleus that copies the genes for proteins into RNA.' }],
        [{ nl: 'subeenheid', en: 'subunit' }, { nl: 'Eén van de eiwitten waaruit een groter eiwitcomplex is opgebouwd.', en: 'One of the proteins that a larger protein complex is built from.' }],
        [{ nl: 'matrijsstreng', en: 'template strand' }, { nl: 'De DNA-streng die in de kloof wordt afgelezen.', en: 'The DNA strand that is read inside the cleft.' }],
      ],
      steps: {
        0: { tag: ['subeenheden', 'subunits'], title: { nl: 'Een enzym van 12 subeenheden', en: 'An enzyme of 12 subunits' }, text: { nl: 'RNA-polymerase II bestaat uit 12 eiwitten, de subeenheden. In de middelste kloof zitten DNA en RNA.', en: 'RNA polymerase II is made of 12 proteins, the subunits. DNA and RNA sit in the central cleft.' } },
        2: { tag: ['klem', 'clamp'], title: { nl: 'Twee kaken rond het DNA', en: 'Two jaws around the DNA' }, text: { nl: 'De twee grootste subeenheden vormen een diepe kloof. Kaken grijpen het DNA en een beweeglijke klem sluit zich erover.', en: 'The two largest subunits form a deep cleft. Jaws grip the DNA and a movable clamp closes over it.' } },
        3: { tag: ['matrijsstreng', 'template strand'], title: { nl: 'De matrijsstreng gaat naar binnen', en: 'The template strand goes inside' }, text: { nl: 'Het dubbele DNA komt binnen en gaat open. Alleen de matrijsstreng, die wordt afgelezen, loopt door naar binnen.', en: 'The double DNA comes in and opens. Only the template strand, the one being read, goes on inside.' } },
      },
    },
  },

  'operon': {
    hobby: {
      kort: { nl: 'Bij bacteriën liggen genen voor één taak vaak naast elkaar, met één gedeelde aan/uit-schakelaar. Een darmbacterie zet zo de genen voor melksuiker pas volop aan als er melksuiker is en geen druivensuiker. Het is het klassieke voorbeeld van hoe genen aan- en uitgaan.', en: 'In bacteria, genes for one job often lie side by side, with one shared on/off switch. A gut bacterium only fully switches on its genes for milk sugar when there is milk sugar and no grape sugar. It is the classic example of how genes switch on and off.' },
      steps: {
        0: { tag: ['drie genen', 'three genes'], title: { nl: 'Drie genen met één schakelaar', en: 'Three genes, one switch' }, text: { nl: 'In deze darmbacterie delen drie genen één startplek en één schakelaar, en ze worden samen in één RNA gekopieerd.', en: 'In this gut bacterium three genes share one start spot and one switch, and they are copied together into one RNA.' } },
        2: { tag: ['rem erop', 'brake on'], title: { nl: 'Geen melksuiker: de genen staan uit', en: 'No milk sugar: the genes are off' }, text: { nl: 'Een rem-eiwit zit op de schakelaar en houdt de kopieermachine tegen, dus de genen staan uit.', en: 'A brake protein sits on the switch and blocks the copying machine, so the genes are off.' } },
        3: { tag: ['melksuiker', 'milk sugar'], title: { nl: 'Melksuiker haalt de rem weg', en: 'Milk sugar removes the brake' }, text: { nl: 'Een beetje melksuiker wordt omgezet in een verwante suiker, die de rem vastpakt, waarna de rem het DNA loslaat.', en: 'A little milk sugar is turned into a related sugar, which grabs the brake, and then the brake lets go of the DNA.' } },
        7: { tag: ['twee signalen', 'two signals'], title: { nl: 'Twee signalen, één uitkomst', en: 'Two signals, one outcome' }, text: { nl: 'De genen staan pas volop aan als er melksuiker is en er geen druivensuiker is.', en: 'The genes are only fully on when there is milk sugar and there is no grape sugar.' } },
      },
    },
    secundair: {
      kort: { nl: 'Bij bacteriën liggen genen met een gezamenlijke functie vaak in een operon: één promoter en één operator sturen ze samen aan. Het lac-operon van E. coli reageert op twee signalen: lactose en glucose. De repressor en CAP bepalen samen of de genen aanstaan.', en: 'In bacteria, genes with a shared function often lie in an operon: one promoter and one operator control them together. The lac operon of E. coli responds to two signals: lactose and glucose. The repressor and CAP together decide whether the genes are on.' },
      terms: [
        [{ nl: 'operon', en: 'operon' }, { nl: 'Een groep bacteriële genen met één promoter en operator, die samen worden afgeschreven.', en: 'A group of bacterial genes with one promoter and operator, transcribed together.' }],
        [{ nl: 'operator', en: 'operator' }, { nl: 'Het stukje DNA waarop de repressor bindt: de aan/uit-schakelaar.', en: 'The stretch of DNA where the repressor binds: the on/off switch.' }],
        [{ nl: 'repressor', en: 'repressor' }, { nl: 'Een rem-eiwit dat op de operator zit en RNA-polymerase tegenhoudt.', en: 'A brake protein that sits on the operator and blocks RNA polymerase.' }],
        [{ nl: 'CAP', en: 'CAP' }, { nl: 'Een eiwit dat bindt als er geen glucose is en de genen dan volop aanzet.', en: 'A protein that binds when there is no glucose and then turns the genes fully on.' }],
      ],
      steps: {
        0: { tag: ['operon', 'operon'], title: { nl: 'Het lac-operon: drie genen samen', en: 'The lac operon: three genes together' }, text: { nl: 'In E. coli delen drie genen één promoter en één operator. Ze worden samen afgeschreven tot één mRNA.', en: 'In E. coli three genes share one promoter and one operator. They are transcribed together into one mRNA.' } },
        2: { tag: ['repressor', 'repressor'], title: { nl: 'Geen lactose: de genen staan uit', en: 'No lactose: the genes are off' }, text: { nl: 'De repressor zit op de operator en houdt RNA-polymerase tegen. De genen staan uit.', en: 'The repressor sits on the operator and blocks RNA polymerase. The genes are off.' } },
        3: { tag: ['lactose', 'lactose'], title: { nl: 'Lactose haalt de repressor weg', en: 'Lactose removes the repressor' }, text: { nl: 'Een beetje lactose wordt omgezet in een verwante suiker. Die bindt de repressor, waarna de repressor het DNA loslaat.', en: 'A little lactose is converted into a related sugar. It binds the repressor, which then lets go of the DNA.' } },
        7: { tag: ['twee signalen', 'two signals'], title: { nl: 'Lactose én geen glucose', en: 'Lactose and no glucose' }, text: { nl: 'Met lactose valt de repressor weg; zonder glucose bindt CAP. Alleen als beide gelden, staan de genen volop aan.', en: 'With lactose the repressor comes off; without glucose CAP binds. Only when both are true are the genes fully on.' } },
      },
    },
  },

  'polymerasen': {
    hobby: {
      kort: { nl: 'Onze cellen hebben drie verwante kopieermachines die RNA maken, elk met een eigen taak. De ene maakt RNA voor de eiwitfabriekjes, een andere de RNA-boodschappen voor eiwitten, de derde korte hulp-RNA’s. Een paddenstoelengif remt ze elk anders.', en: 'Our cells have three related copying machines that make RNA, each with its own job. One makes RNA for the protein factories, another makes the RNA messages for proteins, the third short helper RNAs. A mushroom poison slows each one differently.' },
      steps: {
        0: { tag: ['drie machines', 'three machines'], title: { nl: 'Drie RNA-machines in de kern', en: 'Three RNA machines in the nucleus' }, text: { nl: 'In de celkern werken drie verwante machines die RNA maken, elk met een eigen taak.', en: 'In the nucleus, three related machines make RNA, each with its own job.' } },
        1: { tag: ['machine 1', 'machine 1'], title: { nl: 'De eerste: RNA voor eiwitfabriekjes', en: 'The first: RNA for protein factories' }, text: { nl: 'De eerste machine maakt het RNA voor de fabriekjes die eiwitten bouwen, als één lange streng die in drie stukken geknipt wordt.', en: 'The first machine makes the RNA for the little factories that build proteins, as one long strand that is cut into three pieces.' } },
        2: { tag: ['machine 2', 'machine 2'], title: { nl: 'De tweede: boodschappen voor eiwitten', en: 'The second: messages for proteins' }, text: { nl: 'De tweede machine maakt de RNA-boodschap van alle eiwitgenen en nog veel ander RNA; alleen zij heeft een lange staart.', en: 'The second machine makes the RNA message of every protein gene and lots of other RNA; only it has a long tail.' } },
      },
    },
    secundair: {
      kort: { nl: 'De kern heeft drie verwante RNA-polymerasen met een taakverdeling. Pol I maakt de grote rRNA’s van het ribosoom, Pol II de mRNA’s en Pol III korte RNA’s zoals tRNA. Een paddenstoelengif remt ze elk in andere mate, zodat je ze kunt onderscheiden.', en: 'The nucleus has three related RNA polymerases that share the work. Pol I makes the large rRNAs of the ribosome, Pol II the mRNAs and Pol III short RNAs such as tRNA. A mushroom poison inhibits each to a different degree, so they can be told apart.' },
      terms: [
        [{ nl: 'RNA-polymerase', en: 'RNA polymerase' }, { nl: 'Een enzym dat DNA afleest en er RNA mee bouwt.', en: 'An enzyme that reads DNA and builds RNA from it.' }],
        [{ nl: 'rRNA', en: 'rRNA' }, { nl: 'Ribosomaal RNA: het RNA waaruit het ribosoom mee is opgebouwd.', en: 'Ribosomal RNA: the RNA that helps make up the ribosome.' }],
        [{ nl: 'mRNA', en: 'mRNA' }, { nl: 'Boodschapper-RNA: de kopie van een eiwitgen.', en: 'Messenger RNA: the copy of a protein gene.' }],
        [{ nl: 'tRNA', en: 'tRNA' }, { nl: 'Een kort RNA dat aminozuren naar het ribosoom brengt.', en: 'A short RNA that brings amino acids to the ribosome.' }],
      ],
      steps: {
        0: { tag: ['drie polymerasen', 'three polymerases'], title: { nl: 'Drie RNA-polymerasen in de kern', en: 'Three RNA polymerases in the nucleus' }, text: { nl: 'Onze cellen hebben drie verwante RNA-polymerasen. Elk maakt een eigen soort RNA.', en: 'Our cells have three related RNA polymerases. Each makes its own kind of RNA.' } },
        1: { tag: ['Pol I', 'Pol I'], title: { nl: 'Pol I maakt rRNA', en: 'Pol I makes rRNA' }, text: { nl: 'Pol I maakt de grote rRNA’s van het ribosoom als één lange streng. Die wordt daarna in drie stukken geknipt.', en: 'Pol I makes the large rRNAs of the ribosome as one long strand. It is then cut into three pieces.' } },
        2: { tag: ['Pol II', 'Pol II'], title: { nl: 'Pol II maakt mRNA', en: 'Pol II makes mRNA' }, text: { nl: 'Pol II maakt het mRNA van alle eiwitgenen en veel ander RNA. Alleen Pol II heeft een lange staart.', en: 'Pol II makes the mRNA of all protein genes and much other RNA. Only Pol II has a long tail.' } },
      },
    },
  },

  'rnaprocessing': {
    hobby: {
      kort: { nl: 'Een pas gemaakt RNA is nog niet klaar. Het krijgt een beschermkapje op het begin, overbodige tussenstukken worden eruit geknipt en achteraan komt een lange staart. Pas dan mag het RNA de celkern uit.', en: 'A freshly made RNA is not ready yet. It gets a protective hat at the front, unneeded middle pieces are cut out, and a long tail is added at the end. Only then may the RNA leave the nucleus.' },
      steps: {
        0: { tag: ['kapje', 'hat on'], title: { nl: 'Er komt een kapje op', en: 'A hat goes on' }, text: { nl: 'Helpers zetten een beschermkapje op het begin van het RNA, en dat kapje beschermt het.', en: 'Helpers put a protective hat on the front of the RNA, and that hat keeps it safe.' } },
        1: { tag: ['tussenstuk', 'extra piece'], title: { nl: 'De knipmachine zoekt een tussenstuk', en: 'The cutting machine finds an extra piece' }, text: { nl: 'Een knipmachine zoekt een tussenstuk dat uit het RNA moet, en herkent waar het begint.', en: 'A cutting machine looks for an extra piece that has to come out of the RNA, and recognises where it starts.' } },
        5: { tag: ['aan elkaar', 'joining'], title: { nl: 'De goede stukken worden aan elkaar geplakt', en: 'The good pieces are joined' }, text: { nl: 'De stukken die blijven worden aan elkaar geplakt, het tussenstuk komt los als een lasso, en bij de naad blijft een eiwit als merkteken.', en: 'The pieces that stay are joined, the extra piece comes loose like a lasso, and a protein stays at the seam as a marker.' } },
        9: { tag: ['staart', 'tail'], title: { nl: 'Er komt een staart aan', en: 'A tail is added' }, text: { nl: 'Een helper plakt een lange rij A-letters aan het uiteinde, een staart die niet in het DNA staat.', en: 'A helper sticks a long row of A letters onto the end, a tail that is not written in the DNA.' } },
        10: { tag: ['naar de poort', 'to the gate'], title: { nl: 'Klaar om de kern uit te gaan', en: 'Ready to leave the nucleus' }, text: { nl: 'Het afgewerkte RNA, ingepakt met eiwitten, gaat naar een poort in de wand van de celkern.', en: 'The finished RNA, wrapped in proteins, is taken to a gate in the wall of the nucleus.' } },
      },
    },
    secundair: {
      kort: { nl: 'Een pas gemaakt pre-mRNA is nog niet klaar. Het krijgt een 5′-cap, de intronen worden eruit gesplicet en achteraan komt een poly(A)-staart. Pas dan mag het rijpe mRNA via een kernporie de kern uit.', en: 'A freshly made pre-mRNA is not ready yet. It gets a 5′ cap, the introns are spliced out and a poly(A) tail is added at the end. Only then may the mature mRNA leave the nucleus through a nuclear pore.' },
      terms: [
        [{ nl: 'cap', en: 'cap' }, { nl: 'Een beschermkapje op het begin van het mRNA.', en: 'A protective cap on the start of the mRNA.' }],
        [{ nl: 'intron', en: 'intron' }, { nl: 'Een tussenstuk in het RNA dat eruit geknipt wordt.', en: 'An intervening piece of RNA that is cut out.' }],
        [{ nl: 'exon', en: 'exon' }, { nl: 'Een stuk van het RNA dat blijft en in het rijpe mRNA zit.', en: 'A piece of RNA that stays and ends up in the mature mRNA.' }],
        [{ nl: 'poly(A)-staart', en: 'poly(A) tail' }, { nl: 'Een lange rij A’s aan het uiteinde van het mRNA, niet gecodeerd in het DNA.', en: 'A long row of As at the end of the mRNA, not encoded in the DNA.' }],
        [{ nl: 'kernporie', en: 'nuclear pore' }, { nl: 'Een poort in de kernwand waarlangs het mRNA de kern verlaat.', en: 'A gate in the nuclear wall through which mRNA leaves the nucleus.' }],
      ],
      steps: {
        0: { tag: ['cap', 'cap'], title: { nl: 'Er komt een cap op', en: 'A cap is added' }, text: { nl: 'Enzymen zetten een beschermkapje, de cap, op het begin van het RNA. De cap beschermt het RNA.', en: 'Enzymes put a protective cap on the start of the RNA. The cap protects the RNA.' } },
        1: { tag: ['intron', 'intron'], title: { nl: 'Het spliceosoom zoekt een intron', en: 'The spliceosome finds an intron' }, text: { nl: 'Het spliceosoom, een knipmachine, zoekt een intron: een tussenstuk dat uit het RNA moet. Het herkent waar het intron begint.', en: 'The spliceosome, a cutting machine, looks for an intron: a piece that must come out of the RNA. It recognises where the intron starts.' } },
        5: { tag: ['exonen', 'exons'], title: { nl: 'De exonen worden aan elkaar geplakt', en: 'The exons are joined' }, text: { nl: 'De exonen, de stukken die blijven, worden aan elkaar geplakt en het intron komt los als een lasso. Bij de naad blijft een eiwit als merkteken.', en: 'The exons, the pieces that stay, are joined and the intron comes loose as a lasso. A protein stays at the seam as a marker.' } },
        9: { tag: ['poly(A)-staart', 'poly(A) tail'], title: { nl: 'Er komt een poly(A)-staart aan', en: 'A poly(A) tail is added' }, text: { nl: 'Een enzym plakt een lange rij A’s aan het uiteinde: de poly(A)-staart. Die staat niet in het DNA.', en: 'An enzyme adds a long row of As to the end: the poly(A) tail. It is not in the DNA.' } },
        10: { tag: ['kernporie', 'nuclear pore'], title: { nl: 'Klaar om de kern uit te gaan', en: 'Ready to leave the nucleus' }, text: { nl: 'Het rijpe mRNA, ingepakt met eiwitten, gaat naar een kernporie: een poort in de kernwand.', en: 'The mature mRNA, packed with proteins, goes to a nuclear pore: a gate in the nuclear wall.' } },
      },
    },
  },

  'capping': {
    hobby: {
      kort: { nl: 'Het begin van een nieuw RNA krijgt een klein beschermkapje, zodra het RNA begint te groeien. Dat kapje is een letter G die omgekeerd vastzit. Het beschermt het RNA en is nodig om de kern uit te mogen en er eiwit van te maken.', en: 'The front of a new RNA gets a small protective hat as soon as the RNA starts to grow. That hat is a letter G attached the wrong way round. It protects the RNA and is needed to leave the nucleus and to make protein from it.' },
      steps: {
        0: { tag: ['kapje', 'hat on'], title: { nl: 'Er komt een kapje op', en: 'A hat goes on' }, text: { nl: 'Helpers zetten een beschermkapje op het begin van het RNA, en dat kapje beschermt het.', en: 'Helpers put a protective hat on the front of the RNA, and that hat keeps it safe.' } },
      },
    },
    secundair: {
      kort: { nl: 'De 5′-cap is een beschermkapje op het begin van het mRNA: een omgekeerd geplaatste G. Hij komt erop zodra het RNA begint te groeien. De cap beschermt het mRNA en is nodig voor export uit de kern en voor translatie.', en: 'The 5′ cap is a protective cap on the start of the mRNA: a G attached the wrong way round. It is added as soon as the RNA starts to grow. The cap protects the mRNA and is needed for export from the nucleus and for translation.' },
      terms: [
        [{ nl: '5′-cap', en: '5′ cap' }, { nl: 'Een omgekeerd geplaatste G op het begin van het mRNA, die het beschermt.', en: 'A reversed G on the start of the mRNA that protects it.' }],
        [{ nl: 'mRNA-export', en: 'mRNA export' }, { nl: 'Het vervoer van het rijpe mRNA uit de kern.', en: 'Moving the mature mRNA out of the nucleus.' }],
        [{ nl: 'translatie', en: 'translation' }, { nl: 'Het vertalen van mRNA naar een eiwit door het ribosoom.', en: 'The ribosome translating mRNA into a protein.' }],
      ],
      steps: {
        0: { tag: ['cap', 'cap'], title: { nl: 'Er komt een cap op', en: 'A cap is added' }, text: { nl: 'Enzymen zetten een beschermkapje, de cap, op het begin van het RNA. De cap beschermt het RNA.', en: 'Enzymes put a protective cap on the start of the RNA. The cap protects the RNA.' } },
      },
    },
  },

  'splicing': {
    hobby: {
      kort: { nl: 'Een gen bevat stukken die in de RNA-boodschap horen en tussenstukken die eruit moeten. Een grote knipmachine knipt de tussenstukken eruit en plakt de rest aan elkaar. Door de stukken anders te combineren, kan één gen meerdere eiwitten opleveren.', en: 'A gene contains pieces that belong in the RNA message and extra pieces that must come out. A big cutting machine cuts out the extra pieces and joins the rest. By combining the pieces differently, one gene can give several proteins.' },
      steps: {
        0: { tag: ['tussenstuk', 'extra piece'], title: { nl: 'De knipmachine zoekt een tussenstuk', en: 'The cutting machine finds an extra piece' }, text: { nl: 'Een knipmachine zoekt een tussenstuk dat uit het RNA moet, en herkent waar het begint.', en: 'A cutting machine looks for an extra piece that has to come out of the RNA, and recognises where it starts.' } },
        4: { tag: ['aan elkaar', 'joining'], title: { nl: 'De goede stukken worden aan elkaar geplakt', en: 'The good pieces are joined' }, text: { nl: 'De stukken die blijven worden aan elkaar geplakt, het tussenstuk komt los als een lasso, en bij de naad blijft een eiwit als merkteken.', en: 'The pieces that stay are joined, the extra piece comes loose like a lasso, and a protein stays at the seam as a marker.' } },
      },
    },
    secundair: {
      kort: { nl: 'Een gen bevat exonen, die in het mRNA horen, en intronen, die eruit moeten. Het spliceosoom knipt de intronen eruit en plakt de exonen aan elkaar. Door exonen anders te combineren, kan één gen meerdere eiwitten opleveren.', en: 'A gene contains exons, which belong in the mRNA, and introns, which must come out. The spliceosome cuts out the introns and joins the exons. By combining exons differently, one gene can give several proteins.' },
      terms: [
        [{ nl: 'splicing', en: 'splicing' }, { nl: 'Het eruit knippen van intronen en het aan elkaar plakken van exonen.', en: 'Cutting out introns and joining exons together.' }],
        [{ nl: 'exon', en: 'exon' }, { nl: 'Een stuk van het gen dat in het rijpe mRNA blijft.', en: 'A piece of the gene that stays in the mature mRNA.' }],
        [{ nl: 'intron', en: 'intron' }, { nl: 'Een tussenstuk dat uit het RNA geknipt wordt.', en: 'An intervening piece that is cut out of the RNA.' }],
        [{ nl: 'spliceosoom', en: 'spliceosome' }, { nl: 'De grote knipmachine uit RNA en eiwitten die de splicing uitvoert.', en: 'The large cutting machine of RNA and proteins that carries out splicing.' }],
      ],
      steps: {
        0: { tag: ['intron', 'intron'], title: { nl: 'Het spliceosoom zoekt een intron', en: 'The spliceosome finds an intron' }, text: { nl: 'Het spliceosoom, een knipmachine, zoekt een intron: een tussenstuk dat uit het RNA moet. Het herkent waar het intron begint.', en: 'The spliceosome, a cutting machine, looks for an intron: a piece that must come out of the RNA. It recognises where the intron starts.' } },
        4: { tag: ['exonen', 'exons'], title: { nl: 'De exonen worden aan elkaar geplakt', en: 'The exons are joined' }, text: { nl: 'De exonen, de stukken die blijven, worden aan elkaar geplakt en het intron komt los als een lasso. Bij de naad blijft een eiwit als merkteken.', en: 'The exons, the pieces that stay, are joined and the intron comes loose as a lasso. A protein stays at the seam as a marker.' } },
      },
    },
  },

  'polya': {
    hobby: {
      kort: { nl: 'Het RNA wordt achter een vast seintje in de letters doorgeknipt. Daarna plakt een helper er een lange staart van A-letters aan die niet in het DNA staat. Die staart beschermt het RNA en helpt het de kern uit en aan het werk.', en: 'The RNA is cut just after a fixed signal in its letters. Then a helper adds a long tail of A letters that is not written in the DNA. That tail protects the RNA and helps it leave the nucleus and get to work.' },
      steps: {
        0: { tag: ['eindsein', 'end signal'], title: { nl: 'Waar stopt het RNA?', en: 'Where does the RNA end?' }, text: { nl: 'Eiwitten herkennen een vast seintje in de letters van het RNA, en zo ligt vast waar het RNA eindigt.', en: 'Proteins recognise a fixed signal in the letters of the RNA, and that sets where the RNA ends.' } },
        2: { tag: ['staart', 'tail'], title: { nl: 'Er komt een staart aan', en: 'A tail is added' }, text: { nl: 'Een helper plakt een lange rij A-letters aan het uiteinde, een staart die niet in het DNA staat.', en: 'A helper sticks a long row of A letters onto the end, a tail that is not written in the DNA.' } },
      },
    },
    secundair: {
      kort: { nl: 'Het mRNA wordt doorgeknipt achter het poly(A)-signaal AAUAAA. Daarna plakt een enzym er een poly(A)-staart aan die niet in het DNA staat. Die staart beschermt het mRNA en helpt bij export en translatie.', en: 'The mRNA is cut just after the poly(A) signal AAUAAA. Then an enzyme adds a poly(A) tail that is not in the DNA. That tail protects the mRNA and helps with export and translation.' },
      terms: [
        [{ nl: 'poly(A)-signaal', en: 'poly(A) signal' }, { nl: 'Het stukje AAUAAA in het RNA dat aangeeft waar het mRNA eindigt.', en: 'The stretch AAUAAA in the RNA that marks where the mRNA ends.' }],
        [{ nl: 'poly(A)-staart', en: 'poly(A) tail' }, { nl: 'Een lange rij A’s aan het uiteinde van het mRNA, niet gecodeerd in het DNA.', en: 'A long row of As at the end of the mRNA, not encoded in the DNA.' }],
        [{ nl: 'polyadenylatie', en: 'polyadenylation' }, { nl: 'Het knippen van het RNA en het aanplakken van de poly(A)-staart.', en: 'Cutting the RNA and adding the poly(A) tail.' }],
      ],
      steps: {
        0: { tag: ['poly(A)-signaal', 'poly(A) signal'], title: { nl: 'Waar eindigt het mRNA?', en: 'Where does the mRNA end?' }, text: { nl: 'Eiwitten herkennen het poly(A)-signaal AAUAAA in het RNA. Zo ligt vast waar het mRNA eindigt.', en: 'Proteins recognise the poly(A) signal AAUAAA in the RNA. That sets where the mRNA ends.' } },
        2: { tag: ['poly(A)-staart', 'poly(A) tail'], title: { nl: 'Er komt een poly(A)-staart aan', en: 'A poly(A) tail is added' }, text: { nl: 'Een enzym plakt een lange rij A’s aan het uiteinde: de poly(A)-staart. Die staat niet in het DNA.', en: 'An enzyme adds a long row of As to the end: the poly(A) tail. It is not in the DNA.' } },
      },
    },
  },

  'export': {
    hobby: {
      kort: { nl: 'Het afgewerkte RNA verlaat de celkern, ingepakt met eiwitten, door een grote poort in de kernwand. Een transporteiwit loodst het erdoor. Alleen goed afgewerkt RNA krijgt die gids mee, zodat half afgewerkt RNA niet bij de eiwitfabriekjes komt.', en: 'The finished RNA leaves the nucleus, wrapped in proteins, through a big gate in the nuclear wall. A transport protein guides it through. Only properly finished RNA gets that guide, so half-finished RNA never reaches the protein factories.' },
      steps: {
        0: { tag: ['ingepakt', 'packed'], title: { nl: 'Het afgewerkte RNA in de kern', en: 'The finished RNA in the nucleus' }, text: { nl: 'Het afgewerkte RNA is ingepakt met eiwitten: op het kapje, bij elke naad en op de staart.', en: 'The finished RNA is wrapped in proteins: on the hat, at every seam and on the tail.' } },
        3: { tag: ['aanmeren', 'docking'], title: { nl: 'Aanmeren bij de poort', en: 'Docking at the gate' }, text: { nl: 'Het RNA meert aan bij een reusachtige poort in de kernwand, vol losse eiwitdraden.', en: 'The RNA docks at a giant gate in the nuclear wall, full of loose protein threads.' } },
        4: { tag: ['erdoor', 'through'], title: { nl: 'Door de poort', en: 'Through the gate' }, text: { nl: 'Het transporteiwit grijpt telkens even die draden vast, en zo glipt het RNA erdoor.', en: 'The transport protein keeps briefly grabbing those threads, and so the RNA slips through.' } },
        8: { tag: ['lus', 'loop'], title: { nl: 'Klaar om eiwit te maken', en: 'Ready to make protein' }, text: { nl: 'Nieuwe eiwitten nemen kapje en staart over, en een ander eiwit verbindt die twee tot een lus.', en: 'New proteins take over the hat and the tail, and another protein links the two into a loop.' } },
      },
    },
    secundair: {
      kort: { nl: 'Het rijpe mRNA verlaat de kern, ingepakt met eiwitten, door een kernporie. Een exportreceptor loodst het erdoor. Alleen goed afgewerkt mRNA krijgt die receptor mee, zodat onaf RNA niet bij de ribosomen komt.', en: 'The mature mRNA leaves the nucleus, packed with proteins, through a nuclear pore. An export receptor guides it through. Only properly finished mRNA gets that receptor, so unfinished RNA does not reach the ribosomes.' },
      terms: [
        [{ nl: 'kernporie', en: 'nuclear pore' }, { nl: 'Een reusachtig kanaal in de kernwand, waardoor stoffen de kern in en uit gaan.', en: 'A giant channel in the nuclear wall through which molecules enter and leave the nucleus.' }],
        [{ nl: 'exportreceptor', en: 'export receptor' }, { nl: 'Een transporteiwit dat het mRNA door de kernporie loodst.', en: 'A transport protein that guides the mRNA through the nuclear pore.' }],
        [{ nl: 'mRNP', en: 'mRNP' }, { nl: 'Een mRNA samen met de eiwitten waarmee het is ingepakt.', en: 'An mRNA together with the proteins it is packed with.' }],
      ],
      steps: {
        0: { tag: ['mRNP', 'mRNP'], title: { nl: 'Het rijpe mRNA in de kern', en: 'The mature mRNA in the nucleus' }, text: { nl: 'Het rijpe mRNA is ingepakt met eiwitten: op de cap, bij elke naad tussen exonen en op de poly(A)-staart.', en: 'The mature mRNA is packed with proteins: on the cap, at every seam between exons and on the poly(A) tail.' } },
        3: { tag: ['kernporie', 'nuclear pore'], title: { nl: 'Aanmeren bij de kernporie', en: 'Docking at the nuclear pore' }, text: { nl: 'Het mRNA meert aan bij een kernporie: een reusachtig kanaal in de kernwand, vol losse eiwitdraden.', en: 'The mRNA docks at a nuclear pore: a giant channel in the nuclear wall, full of loose protein threads.' } },
        4: { tag: ['exportreceptor', 'export receptor'], title: { nl: 'Door de kernporie', en: 'Through the nuclear pore' }, text: { nl: 'De exportreceptor grijpt telkens even die eiwitdraden vast. Zo glipt het mRNA erdoor.', en: 'The export receptor keeps briefly grabbing those protein threads. That way the mRNA slips through.' } },
        8: { tag: ['lus', 'loop'], title: { nl: 'Klaar voor translatie', en: 'Ready for translation' }, text: { nl: 'Nieuwe eiwitten nemen de cap en de poly(A)-staart over. Een ander eiwit verbindt ze tot een lus.', en: 'New proteins take over the cap and the poly(A) tail. Another protein links them into a loop.' } },
      },
    },
  },

  'nmd': {
    hobby: {
      kort: { nl: 'De cel controleert haar RNA’s. Staat er te vroeg een stopsein in, dan merkt het eerste eiwitfabriekje dat, omdat er nog merktekens achter het stopsein liggen. Zo’n fout RNA wordt afgebroken, zodat er geen half, mogelijk schadelijk eiwit ontstaat.', en: 'The cell checks its RNAs. If a stop sign comes too early, the first protein factory notices, because markers are still lying behind the stop sign. Such a faulty RNA is broken down, so no half, possibly harmful protein is made.' },
      steps: {
        0: { tag: ['merktekens', 'markers'], title: { nl: 'Merktekens op het RNA', en: 'Markers on the RNA' }, text: { nl: 'Bij elke naad waar stukken aan elkaar geplakt zijn, blijft een merkteken, en het stopsein staat in het laatste stuk.', en: 'At every seam where pieces were joined, a marker stays behind, and the stop sign sits in the last piece.' } },
        1: { tag: ['normaal', 'normal'], title: { nl: 'Normaal: alles wordt opgeruimd', en: 'Normally: everything is cleared' }, text: { nl: 'Het eerste eiwitfabriekje duwt alle merktekens weg en stopt pas in het laatste stuk, dus het RNA mag blijven.', en: 'The first protein factory pushes all markers away and only stops in the last piece, so the RNA may stay.' } },
        2: { tag: ['tikfout', 'typo'], title: { nl: 'Een tikfout: te vroeg stoppen', en: 'A typo: stopping too early' }, text: { nl: 'Eén veranderde letter maakt van een gewoon woordje een stopsein, dat nu al in het tweede stuk staat.', en: 'One changed letter turns an ordinary word into a stop sign, which now already sits in the second piece.' } },
        6: { tag: ['afbreken', 'breakdown'], title: { nl: 'Het foute RNA wordt afgebroken', en: 'The faulty RNA is broken down' }, text: { nl: 'Het RNA wordt vlak bij het foute stopsein doorgeknipt, waarna helpers de stukken afbreken.', en: 'The RNA is cut right next to the wrong stop sign, and then helpers break the pieces down.' } },
      },
    },
    secundair: {
      kort: { nl: 'Nonsense-mediated decay (NMD) is een kwaliteitscontrole die mRNA’s met een te vroeg stopcodon afbreekt. Het eerste ribosoom merkt de fout doordat er nog merktekens van de splicing achter het stopcodon liggen. Zo ontstaan geen afgeknotte, mogelijk schadelijke eiwitten.', en: 'Nonsense-mediated decay (NMD) is a quality check that breaks down mRNAs with a premature stop codon. The first ribosome notices the error because splicing markers still lie behind the stop codon. This prevents shortened, possibly harmful proteins.' },
      terms: [
        [{ nl: 'NMD', en: 'NMD' }, { nl: 'Een kwaliteitscontrole die mRNA’s met een te vroeg stopcodon afbreekt.', en: 'A quality check that breaks down mRNAs with a premature stop codon.' }],
        [{ nl: 'stopcodon', en: 'stop codon' }, { nl: 'Een drieletterwoord in het mRNA, zoals UAG, waar het ribosoom stopt.', en: 'A three-letter word in the mRNA, such as UAG, where the ribosome stops.' }],
        [{ nl: 'mutatie', en: 'mutation' }, { nl: 'Een verandering in de volgorde van de basen.', en: 'A change in the order of the bases.' }],
      ],
      steps: {
        0: { tag: ['merktekens', 'markers'], title: { nl: 'Merktekens op het mRNA', en: 'Markers on the mRNA' }, text: { nl: 'Bij elke naad tussen exonen blijft een eiwit als merkteken. Het stopcodon zit normaal in het laatste exon.', en: 'At every seam between exons a protein stays behind as a marker. The stop codon normally sits in the last exon.' } },
        1: { tag: ['normaal', 'normal'], title: { nl: 'Normaal: alle merktekens weg', en: 'Normally: all markers removed' }, text: { nl: 'Het eerste ribosoom duwt alle merktekens weg en stopt in het laatste exon. Het mRNA blijft bestaan.', en: 'The first ribosome pushes all markers away and stops in the last exon. The mRNA is kept.' } },
        2: { tag: ['mutatie', 'mutation'], title: { nl: 'Een mutatie: een te vroeg stopcodon', en: 'A mutation: a premature stop codon' }, text: { nl: 'Eén veranderde base maakt van het codon CAG het stopcodon UAG. Nu staat er al een stopcodon in exon 2.', en: 'One changed base turns the codon CAG into the stop codon UAG. Now there is already a stop codon in exon 2.' } },
        6: { tag: ['afbraak', 'decay'], title: { nl: 'Het foute mRNA wordt afgebroken', en: 'The faulty mRNA is degraded' }, text: { nl: 'Het mRNA wordt vlak bij het foute stopcodon doorgeknipt. Daarna breken enzymen de stukken af.', en: 'The mRNA is cut right next to the wrong stop codon. Then enzymes break down the pieces.' } },
      },
    },
  },

  'rnai': {
    hobby: {
      kort: { nl: 'Sommige heel korte RNA’s maken zelf geen eiwit. Samen met een zoekeiwit sporen ze RNA-boodschappen op die op hen passen, en remmen die of laten ze afbreken. Verwante korte RNA’s worden ook als geneesmiddel gebruikt om één boodschap gericht door te knippen.', en: 'Some very short RNAs make no protein themselves. Together with a search protein they track down RNA messages that match them, and slow them down or have them broken down. Related short RNAs are also used as medicines to cut one message on purpose.' },
      steps: {
        0: { tag: ['haarspeld', 'hairpin'], title: { nl: 'Een gen voor een mini-RNA', en: 'A gene for a mini RNA' }, text: { nl: 'Een gen voor een heel kort regel-RNA wordt afgelezen, maar dat RNA is eerst nog lang en plooit tot een haarspeld.', en: 'A gene for a very short control RNA is read, but at first that RNA is still long and folds into a hairpin.' } },
        4: { tag: ['zoekeiwit', 'search protein'], title: { nl: 'In het zoekeiwit', en: 'Into the search protein' }, text: { nl: 'Een kort stukje gaat in een zoekeiwit, waar één streng als gids blijft en de andere verdwijnt.', en: 'A short piece goes into a search protein, where one strand stays as a guide and the other is removed.' } },
        5: { tag: ['gids zoekt', 'guide searches'], title: { nl: 'De gids zoekt een RNA-boodschap', en: 'The guide looks for an RNA message' }, text: { nl: 'Een klein deel van de gids past op het eindstuk van een RNA-boodschap; de rest past meestal maar half.', en: 'A small part of the guide matches the end piece of an RNA message; the rest usually only partly fits.' } },
        6: { tag: ['minder eiwit', 'less protein'], title: { nl: 'Minder eiwit, dan afbraak', en: 'Less protein, then breakdown' }, text: { nl: 'Het zoekeiwit laat de staart van de boodschap inkorten, waardoor er minder eiwit van komt en ze daarna wordt afgebroken.', en: 'The search protein has the tail of the message shortened, so less protein is made from it and it is then broken down.' } },
      },
    },
    secundair: {
      kort: { nl: 'MicroRNA’s zijn heel korte RNA’s die geen eiwit coderen. Samen met het eiwit Argonaute herkennen ze mRNA’s via basenparing en remmen ze de translatie of versnellen ze de afbraak. Verwante siRNA’s gebruiken dezelfde machine om één doel-mRNA te knippen.', en: 'MicroRNAs are very short RNAs that do not code for protein. Together with the protein Argonaute they recognise mRNAs by base pairing and slow their translation or speed up their decay. Related siRNAs use the same machine to cut one target mRNA.' },
      terms: [
        [{ nl: 'microRNA', en: 'microRNA' }, { nl: 'Een heel kort RNA dat de translatie van passende mRNA’s remt.', en: 'A very short RNA that slows the translation of matching mRNAs.' }],
        [{ nl: 'Argonaute', en: 'Argonaute' }, { nl: 'Het eiwit dat het korte RNA als gids vasthoudt en het doel-mRNA opzoekt.', en: 'The protein that holds the short RNA as a guide and seeks out the target mRNA.' }],
        [{ nl: 'basenparing', en: 'base pairing' }, { nl: 'Het binden van passende basen, zoals A met U en G met C.', en: 'Matching bases binding to each other, such as A with U and G with C.' }],
        [{ nl: 'siRNA', en: 'siRNA' }, { nl: 'Een kort RNA dat perfect past en zo het doel-mRNA laat doorknippen.', en: 'A short RNA that matches perfectly and so has the target mRNA cut.' }],
      ],
      steps: {
        0: { tag: ['haarspeld', 'hairpin'], title: { nl: 'Een gen voor een microRNA', en: 'A gene for a microRNA' }, text: { nl: 'Een gen voor een microRNA wordt afgeschreven. Het RNA is nog lang en vouwt tot een haarspeld.', en: 'A microRNA gene is transcribed. The RNA is still long and folds into a hairpin.' } },
        4: { tag: ['Argonaute', 'Argonaute'], title: { nl: 'In Argonaute', en: 'Into Argonaute' }, text: { nl: 'Een enzym knipt de haarspeld tot een kort dubbel stukje RNA. Dat gaat in het zoekeiwit Argonaute (AGO2). Eén streng blijft als gids, de andere wordt verwijderd.', en: 'An enzyme cuts the hairpin into a short double piece of RNA. It goes into the search protein Argonaute (AGO2). One strand stays as a guide, the other is removed.' } },
        5: { tag: ['basenparing', 'base pairing'], title: { nl: 'De gids zoekt een mRNA', en: 'The guide looks for an mRNA' }, text: { nl: 'Een klein stukje van de gids paart met het eindstuk van een mRNA, achter het stopcodon. De rest past meestal maar deels.', en: 'A small part of the guide pairs with the end piece of an mRNA, after the stop codon. The rest usually fits only partly.' } },
        6: { tag: ['minder eiwit', 'less protein'], title: { nl: 'Minder translatie, dan afbraak', en: 'Less translation, then decay' }, text: { nl: 'Argonaute laat de poly(A)-staart van het mRNA inkorten. Het mRNA wordt minder vertaald en daarna afgebroken.', en: 'Argonaute has the poly(A) tail of the mRNA shortened. The mRNA is translated less and then degraded.' } },
      },
    },
  },

  'mrnaafbraak': {
    hobby: {
      kort: { nl: 'Elk RNA wordt na een tijd afgebroken; hoe snel, bepaalt mee hoeveel eiwit ervan gemaakt wordt. Meestal wordt eerst de staart korter, dan gaat het kapje eraf en daarna wordt het RNA vanaf de uiteinden afgebroken. Zo kan een cel snel stoppen met een eiwit te maken.', en: 'Every RNA is broken down after a while; how fast helps decide how much protein is made from it. Usually the tail gets shorter first, then the hat comes off, and then the RNA is broken down from its ends. That lets a cell quickly stop making a protein.' },
      steps: {
        0: { tag: ['in gebruik', 'in use'], title: { nl: 'Een RNA in gebruik', en: 'An RNA in use' }, text: { nl: 'Een RNA in gebruik vormt een lus doordat eiwitten het kapje en de staart verbinden, zodat beide uiteinden beschermd zijn.', en: 'An RNA in use forms a loop because proteins link the hat and the tail, so both ends are protected.' } },
        2: { tag: ['staart korter', 'tail shortens'], title: { nl: 'De staart wordt korter', en: 'The tail gets shorter' }, text: { nl: 'Helpers knabbelen de staart af en de lus valt open; meestal bepaalt dit hoe snel het RNA verdwijnt.', en: 'Helpers nibble away the tail and the loop falls open; this usually decides how fast the RNA disappears.' } },
        4: { tag: ['afbraak', 'breakdown'], title: { nl: 'Afbraak vanaf het begin', en: 'Breakdown from the front' }, text: { nl: 'Zonder kapje is het begin onbeschermd, en een helper breekt het RNA van daaruit letter per letter af.', en: 'Without its hat the front is unprotected, and a helper breaks the RNA down from there, letter by letter.' } },
      },
    },
    secundair: {
      kort: { nl: 'Elk mRNA wordt na een tijd afgebroken; de snelheid bepaalt mee hoeveel eiwit ervan gemaakt wordt. Meestal wordt eerst de poly(A)-staart ingekort, dan gaat de cap eraf en daarna wordt het mRNA vanaf de uiteinden afgebroken.', en: 'Every mRNA is degraded after a while; the speed helps decide how much protein is made from it. Usually the poly(A) tail is shortened first, then the cap is removed, and then the mRNA is degraded from its ends.' },
      terms: [
        [{ nl: 'poly(A)-staart', en: 'poly(A) tail' }, { nl: 'De rij A’s aan het uiteinde van het mRNA; het inkorten ervan is meestal de eerste stap van de afbraak.', en: 'The row of As at the end of the mRNA; shortening it is usually the first step of decay.' }],
        [{ nl: 'cap', en: 'cap' }, { nl: 'Het beschermkapje op het begin van het mRNA; zonder cap ligt het begin open.', en: 'The protective cap on the start of the mRNA; without it the start is exposed.' }],
        [{ nl: 'mRNA-afbraak', en: 'mRNA decay' }, { nl: 'Het afbreken van mRNA, waardoor de cel stopt met dat eiwit te maken.', en: 'Breaking down mRNA, so the cell stops making that protein.' }],
      ],
      steps: {
        0: { tag: ['lus', 'loop'], title: { nl: 'Een mRNA in gebruik', en: 'An mRNA in use' }, text: { nl: 'Eiwitten verbinden de cap en de poly(A)-staart tot een lus. Zo zijn beide uiteinden beschermd.', en: 'Proteins link the cap and the poly(A) tail into a loop. That protects both ends.' } },
        2: { tag: ['staart korter', 'tail shortens'], title: { nl: 'De poly(A)-staart wordt korter', en: 'The poly(A) tail gets shorter' }, text: { nl: 'Enzymen korten de poly(A)-staart in en de lus valt open. Meestal bepaalt deze stap hoe snel het mRNA verdwijnt.', en: 'Enzymes shorten the poly(A) tail and the loop falls open. This step usually decides how fast the mRNA disappears.' } },
        4: { tag: ['afbraak', 'decay'], title: { nl: 'Afbraak vanaf het begin', en: 'Decay from the start' }, text: { nl: 'Daarna wordt de cap eraf gehaald. Zonder cap is het begin onbeschermd: een enzym breekt het mRNA van daaruit af, bouwsteen per bouwsteen.', en: 'Next the cap is removed. Without the cap the start is unprotected: an enzyme degrades the mRNA from there, building block by building block.' } },
      },
    },
  },

  'editing': {
    hobby: {
      kort: { nl: 'Soms verandert de cel één letter in een RNA-kopie, terwijl het DNA hetzelfde blijft. Zo kan één gen toch een ander eiwit opleveren. In de darm ontstaat zo bijvoorbeeld een korte versie van een eiwit dat de lever volledig maakt.', en: 'Sometimes the cell changes one letter in an RNA copy, while the DNA stays the same. That way one gene can still give a different protein. In the gut, for example, this makes a short version of a protein that the liver makes in full.' },
      steps: {
        0: { tag: ['letter anders', 'letter changes'], title: { nl: 'Het RNA zegt iets anders dan het DNA', en: 'The RNA says something else than the DNA' }, text: { nl: 'Een helper verandert één letter in het RNA, terwijl het DNA hetzelfde blijft.', en: 'A helper changes one letter in the RNA, while the DNA stays the same.' } },
        2: { tag: ['A wordt I', 'A becomes I'], title: { nl: 'Een A wordt een andere letter', en: 'An A becomes another letter' }, text: { nl: 'De helper klapt een letter A uit de streng en verandert die in een andere letter, die de cel leest als een G.', en: 'The helper flips a letter A out of the strand and changes it into another letter, which the cell reads as a G.' } },
        6: { tag: ['twee eiwitten', 'two proteins'], title: { nl: 'Eén gen, twee eiwitten', en: 'One gene, two proteins' }, text: { nl: 'Een veranderde letter kan een stopsein maken: de lever maakt het volledige eiwit, de darm stopt daar en maakt ongeveer de voorste helft.', en: 'A changed letter can create a stop sign: the liver makes the full protein, the gut stops there and makes about the front half.' } },
      },
    },
    secundair: {
      kort: { nl: 'Bij RNA-editing verandert een enzym een base in het RNA, terwijl het DNA hetzelfde blijft. Bij de mens wordt vooral A veranderd in inosine, dat gelezen wordt als G, of C in U. Zo kan één gen toch een ander eiwit opleveren.', en: 'In RNA editing an enzyme changes a base in the RNA, while the DNA stays the same. In humans this mostly turns A into inosine, which is read as G, or C into U. That way one gene can still give a different protein.' },
      terms: [
        [{ nl: 'RNA-editing', en: 'RNA editing' }, { nl: 'Het veranderen van een base in het RNA, zodat het afwijkt van het DNA.', en: 'Changing a base in the RNA so it differs from the DNA.' }],
        [{ nl: 'inosine', en: 'inosine' }, { nl: 'De base die ontstaat uit A en die als G gelezen wordt.', en: 'The base made from A, which is read as G.' }],
        [{ nl: 'stopcodon', en: 'stop codon' }, { nl: 'Een drieletterwoord in het mRNA waar de translatie stopt.', en: 'A three-letter word in the mRNA where translation stops.' }],
      ],
      steps: {
        0: { tag: ['RNA-editing', 'RNA editing'], title: { nl: 'Het RNA wijkt af van het DNA', en: 'The RNA differs from the DNA' }, text: { nl: 'Een enzym verandert één base in het RNA; het DNA blijft hetzelfde. Dat heet RNA-editing.', en: 'An enzyme changes one base in the RNA; the DNA stays the same. This is called RNA editing.' } },
        2: { tag: ['A wordt I', 'A becomes I'], title: { nl: 'Een A wordt inosine', en: 'An A becomes inosine' }, text: { nl: 'Het enzym klapt een A uit de streng en verandert die chemisch in inosine (I). Inosine wordt gelezen als G.', en: 'The enzyme flips an A out of the strand and chemically changes it into inosine (I). Inosine is read as G.' } },
        6: { tag: ['twee eiwitten', 'two proteins'], title: { nl: 'Eén gen, twee eiwitten', en: 'One gene, two proteins' }, text: { nl: 'Door editing van C naar U ontstaat in de darm een nieuw stopcodon. De lever maakt het volledige eiwit, de darm ongeveer de voorste helft.', en: 'Editing C to U creates a new stop codon in the gut. The liver makes the full protein, the gut about the front half.' } },
      },
    },
  },

  'rnastructuur': {
    hobby: {
      kort: { nl: 'RNA is meestal één streng, maar die plooit op zichzelf terug: passende stukken kleven aan elkaar en de rest vormt lussen. Zo krijgt elk RNA een eigen vorm, en die vorm bepaalt wat het doet. Het kan bouwstenen aandragen of zelf als gereedschap werken.', en: 'RNA is usually a single strand, but it folds back on itself: matching pieces stick together and the rest forms loops. That gives every RNA its own shape, and the shape decides what it does. It can carry building blocks or work as a tool itself.' },
      steps: {
        0: { tag: ['één streng', 'one strand'], title: { nl: 'RNA is één streng', en: 'RNA is one strand' }, text: { nl: 'RNA is meestal één streng, en die streng kan op zichzelf terugplooien.', en: 'RNA is usually one strand, and that strand can fold back on itself.' } },
        1: { tag: ['haarspeld', 'hairpin'], title: { nl: 'Een haarspeld', en: 'A hairpin' }, text: { nl: 'Stukken die bij elkaar passen kleven tot een steel, de letters ertussen vormen een lus: samen een haarspeld.', en: 'Pieces that match stick together into a stem, the letters in between form a loop: together a hairpin.' } },
        7: { tag: ['L-vorm', 'L shape'], title: { nl: 'Een helper-RNA: van klaverblad naar L', en: 'A helper RNA: from cloverleaf to L' }, text: { nl: 'Een helper-RNA brengt bouwstenen voor eiwitten aan; plat getekend lijkt het op een klaverblad, in het echt plooit het tot een L.', en: 'A helper RNA brings building blocks for proteins; drawn flat it looks like a cloverleaf, in real life it folds into an L.' } },
        8: { tag: ['RNA-schaar', 'RNA scissors'], title: { nl: 'RNA als gereedschap', en: 'RNA as a tool' }, text: { nl: 'Dit RNA knipt zichzelf door en werkt zo als gereedschap; ook het fabriekje dat eiwitten bouwt werkt met zulk RNA.', en: 'This RNA cuts itself and so works as a tool; the little factory that builds proteins also works with RNA like this.' } },
      },
    },
    secundair: {
      kort: { nl: 'RNA is meestal enkelstrengig, maar vouwt op zichzelf terug: complementaire stukken vormen stammen, de rest vormt lussen. Zo krijgt elk RNA een eigen 3D-vorm die bepaalt wat het doet, zoals bij tRNA of bij een ribozym.', en: 'RNA is usually single-stranded, but folds back on itself: complementary stretches form stems, the rest forms loops. That gives each RNA its own 3D shape, which decides what it does, as in tRNA or a ribozyme.' },
      terms: [
        [{ nl: 'haarspeld', en: 'hairpin' }, { nl: 'Een stam van gepaarde basen met een lus aan het eind.', en: 'A stem of paired bases with a loop at the end.' }],
        [{ nl: 'complementair', en: 'complementary' }, { nl: 'Passend, zoals A met U en G met C.', en: 'Matching, such as A with U and G with C.' }],
        [{ nl: 'tRNA', en: 'tRNA' }, { nl: 'Een RNA dat aminozuren aanbrengt en in 3D een L-vorm heeft.', en: 'An RNA that brings amino acids and has an L shape in 3D.' }],
        [{ nl: 'ribozym', en: 'ribozyme' }, { nl: 'Een RNA dat werkt als een enzym.', en: 'An RNA that works as an enzyme.' }],
      ],
      steps: {
        0: { tag: ['enkelstrengig', 'single strand'], title: { nl: 'RNA is één streng', en: 'RNA is one strand' }, text: { nl: 'RNA is meestal enkelstrengig, met U in plaats van T. De streng kan op zichzelf terugvouwen.', en: 'RNA is usually single-stranded, with U instead of T. The strand can fold back on itself.' } },
        1: { tag: ['haarspeld', 'hairpin'], title: { nl: 'Een haarspeld: stam en lus', en: 'A hairpin: stem and loop' }, text: { nl: 'Complementaire stukken paren tot een stam; de basen ertussen vormen een lus. Samen heet dat een haarspeld.', en: 'Complementary stretches pair into a stem; the bases in between form a loop. Together this is a hairpin.' } },
        7: { tag: ['tRNA', 'tRNA'], title: { nl: 'Het tRNA: van klaverblad naar L', en: 'tRNA: from cloverleaf to L' }, text: { nl: 'Een tRNA brengt aminozuren aan. Plat getekend lijkt het op een klaverblad; in 3D vouwt het tot een L.', en: 'A tRNA brings amino acids. Drawn flat it looks like a cloverleaf; in 3D it folds into an L.' } },
        8: { tag: ['ribozym', 'ribozyme'], title: { nl: 'RNA als enzym: een ribozym', en: 'RNA as an enzyme: a ribozyme' }, text: { nl: 'Dit RNA knipt zichzelf door: het werkt als een enzym, een ribozym. Ook het ribosoom is een ribozym.', en: 'This RNA cuts itself: it works as an enzyme, a ribozyme. The ribosome is a ribozyme too.' } },
      },
    },
  },

  'lokalisatie': {
    hobby: {
      kort: { nl: 'Sommige RNA-boodschappen hebben een adreslabel. Een eiwit leest dat label, kleine motortjes brengen de boodschap naar de juiste plek, en pas daar wordt er eiwit van gemaakt. Zo ontstaat het eiwit precies waar het nodig is.', en: 'Some RNA messages carry an address label. A protein reads that label, tiny motors carry the message to the right place, and only there is protein made from it. That way the protein appears exactly where it is needed.' },
      steps: {
        0: { tag: ['vaste plek', 'fixed spot'], title: { nl: 'Sommige RNA’s moeten naar één plek', en: 'Some RNAs must go to one place' }, text: { nl: 'Van veel RNA-boodschappen wordt overal in de cel eiwit gemaakt, maar sommige moeten eerst naar een vaste plek.', en: 'Many RNA messages are turned into protein all over the cell, but some must first go to a fixed spot.' } },
        1: { tag: ['adreslabel', 'address label'], title: { nl: 'Het adres ligt achter het stopsein', en: 'The address lies after the stop sign' }, text: { nl: 'Achter het stopsein ligt een stuk dat niet wordt omgezet in eiwit, en daarin zit een adreslabel: een korte reeks letters.', en: 'After the stop sign lies a stretch that is not turned into protein, and it holds an address label: a short row of letters.' } },
        3: { tag: ['langs sporen', 'along tracks'], title: { nl: 'Motortjes dragen het RNA langs sporen', en: 'Tiny motors carry the RNA along tracks' }, text: { nl: 'Een motor-eiwit sleept het pakketje langs sporen door de cel, naar de rand die vooruit kruipt.', en: 'A motor protein drags the package along tracks through the cell, to the edge that is crawling forward.' } },
        5: { tag: ['ter plekke', 'on the spot'], title: { nl: 'Het eiwit ontstaat waar het nodig is', en: 'The protein is made where it is needed' }, text: { nl: 'Zo ontstaat vlak bij de rand het eiwit waarmee de cel een skelet bouwt dat de rand vooruit duwt.', en: 'So right by the edge the cell makes the protein it uses to build a skeleton that pushes the edge forward.' } },
      },
    },
    secundair: {
      kort: { nl: 'Sommige mRNA’s hebben een adreslabel in het stuk achter het stopcodon, de 3′-UTR. RNA-bindende eiwitten lezen dat label en motoreiwitten brengen het mRNA naar de juiste plek. Pas daar wordt het vertaald: lokale translatie.', en: 'Some mRNAs carry an address label in the stretch after the stop codon, the 3′ UTR. RNA-binding proteins read that label and motor proteins carry the mRNA to the right place. Only there is it translated: local translation.' },
      terms: [
        [{ nl: '3′-UTR', en: '3′ UTR' }, { nl: 'Het stuk mRNA achter het stopcodon dat niet vertaald wordt.', en: 'The stretch of mRNA after the stop codon that is not translated.' }],
        [{ nl: 'adreslabel', en: 'zipcode' }, { nl: 'Een korte volgorde in het mRNA die aangeeft waar het naartoe moet.', en: 'A short sequence in the mRNA that says where it must go.' }],
        [{ nl: 'motoreiwit', en: 'motor protein' }, { nl: 'Een eiwit dat lading langs het cytoskelet door de cel sleept.', en: 'A protein that drags cargo along the cytoskeleton through the cell.' }],
        [{ nl: 'lokale translatie', en: 'local translation' }, { nl: 'Het vertalen van een mRNA pas op de plek waar het eiwit nodig is.', en: 'Translating an mRNA only at the place where the protein is needed.' }],
      ],
      steps: {
        0: { tag: ['lokalisatie', 'localization'], title: { nl: 'Sommige mRNA’s moeten naar één plek', en: 'Some mRNAs must go to one place' }, text: { nl: 'Veel mRNA’s worden overal in de cel vertaald. Sommige moeten eerst naar een vaste plek.', en: 'Many mRNAs are translated all over the cell. Some must first go to a fixed place.' } },
        1: { tag: ['3′-UTR', '3′ UTR'], title: { nl: 'Het adres ligt in de 3′-UTR', en: 'The address lies in the 3′ UTR' }, text: { nl: 'Achter het stopcodon ligt een stuk dat niet vertaald wordt, de 3′-UTR. Daarin zit een adreslabel: een korte volgorde van basen.', en: 'After the stop codon lies a stretch that is not translated, the 3′ UTR. It holds an address label: a short sequence of bases.' } },
        3: { tag: ['motoreiwit', 'motor protein'], title: { nl: 'Motoreiwitten dragen het mRNA', en: 'Motor proteins carry the mRNA' }, text: { nl: 'Een motoreiwit sleept het ingepakte mRNA langs het cytoskelet naar de rand van de cel die vooruit kruipt.', en: 'A motor protein drags the packed mRNA along the cytoskeleton to the edge of the cell that is crawling forward.' } },
        5: { tag: ['lokale translatie', 'local translation'], title: { nl: 'Lokale translatie: actine aan de rand', en: 'Local translation: actin at the edge' }, text: { nl: 'Pas aan de rand wordt het mRNA vertaald. Zo ontstaat actine waar de cel het nodig heeft om de rand vooruit te duwen.', en: 'Only at the edge is the mRNA translated. So actin is made where the cell needs it to push the edge forward.' } },
      },
    },
  },

  'korrels': {
    hobby: {
      kort: { nl: 'Bij stress, zoals hitte, maakt de cel even veel minder eiwitten. De vrije RNA-boodschappen klonteren met eiwitten samen tot druppels zonder vlies eromheen. Na de stress lossen die druppels weer op.', en: 'Under stress, such as heat, the cell briefly makes far fewer proteins. The free RNA messages clump together with proteins into droplets with no skin around them. After the stress, the droplets dissolve again.' },
      steps: {
        0: { tag: ['gezonde cel', 'healthy cell'], title: { nl: 'In een gezonde cel wordt volop eiwit gemaakt', en: 'A healthy cell makes lots of protein' }, text: { nl: 'Op elke RNA-boodschap werken meerdere eiwitfabriekjes tegelijk; zo maakt de cel voortdurend eiwitten.', en: 'Several protein factories work on every RNA message at once; that way the cell keeps making proteins.' } },
        1: { tag: ['hitte', 'heat'], title: { nl: 'Bij hitte maakt de cel veel minder eiwit', en: 'In heat the cell makes far less protein' }, text: { nl: 'Bij stress, zoals hitte, begint de cel aan veel minder nieuwe eiwitten en vallen de fabriekjes van de boodschappen af.', en: 'Under stress, such as heat, the cell starts far fewer new proteins and the factories drop off the messages.' } },
        2: { tag: ['druppels', 'droplets'], title: { nl: 'Vrije RNA’s klonteren samen', en: 'Free RNAs clump together' }, text: { nl: 'Kleverige eiwitten pakken de vrije RNA’s vast en vormen er samen druppels mee zonder vlies, zoals olie in water.', en: 'Sticky proteins grab the free RNAs and together form droplets without a skin, like oil in water.' } },
        4: { tag: ['oplossen', 'dissolving'], title: { nl: 'Na de stress lossen de druppels op', en: 'After the stress the droplets dissolve' }, text: { nl: 'Is de hitte voorbij, dan vallen de druppels uiteen en lezen de fabriekjes de RNA’s weer af.', en: 'Once the heat is over, the droplets fall apart and the factories read the RNAs again.' } },
      },
    },
    secundair: {
      kort: { nl: 'Bij stress, zoals hitte, remt de cel de translatie. Niet-vertaalde mRNA’s klonteren met RNA-bindende eiwitten samen tot stressgranules: druppels zonder membraan. Na de stress lossen ze op. P-bodies zijn verwante druppels die er altijd zijn.', en: 'Under stress, such as heat, the cell slows down translation. Untranslated mRNAs clump with RNA-binding proteins into stress granules: droplets without a membrane. After the stress they dissolve. P-bodies are related droplets that are always present.' },
      terms: [
        [{ nl: 'stressgranule', en: 'stress granule' }, { nl: 'Een druppel zonder membraan van niet-vertaalde mRNA’s en eiwitten, die ontstaat bij stress.', en: 'A membraneless droplet of untranslated mRNAs and proteins that forms under stress.' }],
        [{ nl: 'P-body', en: 'P-body' }, { nl: 'Een verwante druppel die ook zonder stress bestaat en eiwitten voor mRNA-afbraak bevat.', en: 'A related droplet that exists even without stress and holds proteins for mRNA decay.' }],
        [{ nl: 'translatie', en: 'translation' }, { nl: 'Het vertalen van mRNA naar eiwit door ribosomen.', en: 'Ribosomes translating mRNA into protein.' }],
      ],
      steps: {
        0: { tag: ['translatie', 'translation'], title: { nl: 'Ribosomen lezen mRNA’s af', en: 'Ribosomes read mRNAs' }, text: { nl: 'Op elk mRNA lezen meerdere ribosomen tegelijk. Zo maakt de cel voortdurend eiwitten.', en: 'Several ribosomes read each mRNA at once. That way the cell keeps making proteins.' } },
        1: { tag: ['stress', 'stress'], title: { nl: 'Bij hitte daalt de translatie', en: 'Heat lowers translation' }, text: { nl: 'Bij stress, zoals hitte, start de cel veel minder translatie. De ribosomen lopen van de mRNA’s af.', en: 'Under stress, such as heat, the cell starts far less translation. The ribosomes run off the mRNAs.' } },
        2: { tag: ['stressgranule', 'stress granule'], title: { nl: 'Vrije mRNA’s vormen stressgranules', en: 'Free mRNAs form stress granules' }, text: { nl: 'RNA-bindende eiwitten binden de vrije mRNA’s. Samen vormen ze stressgranules: druppels zonder membraan, zoals olie in water.', en: 'RNA-binding proteins bind the free mRNAs. Together they form stress granules: droplets without a membrane, like oil in water.' } },
        4: { tag: ['oplossen', 'dissolving'], title: { nl: 'Na de stress lossen ze op', en: 'After the stress they dissolve' }, text: { nl: 'Is de hitte voorbij, dan vallen de stressgranules uiteen. De ribosomen lezen de mRNA’s weer af.', en: 'Once the heat is over, the stress granules fall apart. The ribosomes read the mRNAs again.' } },
      },
    },
  },

  'lncrna': {
    hobby: {
      kort: { nl: 'Niet elk RNA wordt een eiwit. Sommige lange RNA’s doen zelf werk: ze houden eiwitten bij elkaar, brengen ze naar een plek op het DNA of vangen ze weg. Van de meeste weten we nog niet wat ze doen.', en: 'Not every RNA becomes a protein. Some long RNAs do work themselves: they hold proteins together, bring them to a spot on the DNA or catch them away. For most of them we do not yet know what they do.' },
      steps: {
        0: { tag: ['geen eiwit', 'no protein'], title: { nl: 'Niet elk RNA wordt een eiwit', en: 'Not every RNA becomes a protein' }, text: { nl: 'Sommige genen maken een lang RNA waar geen eiwit van komt, en dan doet het RNA zelf het werk.', en: 'Some genes make a long RNA that no protein is made from, and then the RNA itself does the work.' } },
        2: { tag: ['steiger', 'scaffold'], title: { nl: 'Een voorbeeld: een steiger', en: 'One example: a scaffold' }, text: { nl: 'Een lang RNA kan werken als een steiger die verschillende eiwitten bij elkaar houdt.', en: 'A long RNA can work like a scaffold that holds different proteins together.' } },
        5: { tag: ['XIST', 'XIST'], title: { nl: 'Een bekend voorbeeld: XIST', en: 'A famous example: XIST' }, text: { nl: 'XIST is zo’n lang RNA dat bij vrouwen één X-chromosoom, een groot pak DNA, bedekt en stillegt.', en: 'XIST is such a long RNA: in women it covers one X chromosome, a big bundle of DNA, and silences it.' } },
      },
    },
    secundair: {
      kort: { nl: 'Lange niet-coderende RNA’s (lncRNA’s) zijn lange RNA’s die niet vertaald worden. Sommige houden eiwitten bij elkaar als steiger, brengen ze naar een plek op het DNA of vangen ze weg. Een bekend voorbeeld is XIST; van de meeste kennen we de werking nog niet.', en: 'Long non-coding RNAs (lncRNAs) are long RNAs that are not translated. Some hold proteins together as a scaffold, bring them to a spot on the DNA or catch them away. A famous example is XIST; for most, the function is still unknown.' },
      terms: [
        [{ nl: 'lncRNA', en: 'lncRNA' }, { nl: 'Een lang RNA dat niet vertaald wordt en zelf een taak heeft.', en: 'A long RNA that is not translated and has a job of its own.' }],
        [{ nl: 'niet-coderend RNA', en: 'non-coding RNA' }, { nl: 'RNA dat geen eiwit oplevert.', en: 'RNA that does not give a protein.' }],
        [{ nl: 'XIST', en: 'XIST' }, { nl: 'Een lncRNA dat bij vrouwen één X-chromosoom bedekt en stillegt.', en: 'A lncRNA that covers one X chromosome in women and silences it.' }],
      ],
      steps: {
        0: { tag: ['lncRNA', 'lncRNA'], title: { nl: 'Niet elk RNA wordt een eiwit', en: 'Not every RNA becomes a protein' }, text: { nl: 'Sommige genen maken een lang RNA dat niet vertaald wordt: een lncRNA. Het RNA zelf doet het werk.', en: 'Some genes make a long RNA that is not translated: a lncRNA. The RNA itself does the work.' } },
        2: { tag: ['steiger', 'scaffold'], title: { nl: 'Een voorbeeld: een steiger', en: 'One example: a scaffold' }, text: { nl: 'Een lncRNA kan als steiger werken. Het houdt verschillende eiwitten bij elkaar.', en: 'A lncRNA can act as a scaffold. It holds different proteins together.' } },
        5: { tag: ['XIST', 'XIST'], title: { nl: 'Een bekend voorbeeld: XIST', en: 'A famous example: XIST' }, text: { nl: 'XIST is een lncRNA. Het bedekt één X-chromosoom bij vrouwen en legt het stil.', en: 'XIST is a lncRNA. It covers one X chromosome in women and silences it.' } },
      },
    },
  },

  'riboswitch': {
    hobby: {
      kort: { nl: 'Sommige RNA-boodschappen hebben een schakelaar in zichzelf. Een stukje van het RNA vangt een klein deeltje en verandert daardoor van vorm. Zo gaat een gen aan of uit, zonder hulp van een eiwit; vooral bacteriën doen dit.', en: 'Some RNA messages have a switch built into them. A piece of the RNA catches a tiny particle and changes shape because of it. That turns a gene on or off without help from a protein; mostly bacteria do this.' },
      steps: {
        0: { tag: ['uit', 'off'], title: { nl: 'Een schakelaar in het RNA zelf', en: 'A switch in the RNA itself' }, text: { nl: 'Bij bacteriën voelt het begin van een RNA een klein deeltje, adenine; zonder adenine verstopt het de landingsplek van het eiwitfabriekje.', en: 'In bacteria the front of an RNA senses a tiny particle, adenine; without adenine it hides the landing spot of the protein factory.' } },
        1: { tag: ['aan', 'on'], title: { nl: 'Adenine zet het gen aan', en: 'Adenine switches the gene on' }, text: { nl: 'Vangt het RNA adenine, dan klapt het om: de landingsplek komt vrij en het fabriekje kan beginnen.', en: 'When the RNA catches adenine, it flips over: the landing spot is freed and the factory can start.' } },
        5: { tag: ['bacteriën', 'bacteria'], title: { nl: 'Vooral bij bacteriën', en: 'Mostly in bacteria' }, text: { nl: 'Zulke schakelaars kennen we vooral bij bacteriën; planten en schimmels hebben er één soort, en bij de mens is er nog geen gevonden.', en: 'Such switches are known mostly in bacteria; plants and fungi have one kind, and none has been found in humans yet.' } },
      },
    },
    secundair: {
      kort: { nl: 'Een riboswitch is een schakelaar in een mRNA zelf. Een deel van het RNA, de aptameer, bindt een klein molecuul zoals adenine en vouwt daardoor anders. Zo gaat de translatie van een gen aan of uit, zonder hulp van een eiwit. Vooral bacteriën gebruiken dit.', en: 'A riboswitch is a switch inside an mRNA itself. A part of the RNA, the aptamer, binds a small molecule such as adenine and folds differently as a result. That turns translation of a gene on or off without help from a protein. Mostly bacteria use this.' },
      terms: [
        [{ nl: 'riboswitch', en: 'riboswitch' }, { nl: 'Een stuk mRNA dat een klein molecuul bindt en zo een gen aan- of uitzet.', en: 'A stretch of mRNA that binds a small molecule and so turns a gene on or off.' }],
        [{ nl: 'aptameer', en: 'aptamer' }, { nl: 'Het vanggedeelte van de riboswitch dat het kleine molecuul bindt.', en: 'The catching part of the riboswitch that binds the small molecule.' }],
        [{ nl: 'ribosoombindingsplaats', en: 'ribosome binding site' }, { nl: 'De landingsplaats van het ribosoom op het mRNA, vlak vóór het startcodon.', en: 'The landing site of the ribosome on the mRNA, just before the start codon.' }],
      ],
      steps: {
        0: { tag: ['riboswitch', 'riboswitch'], title: { nl: 'Een schakelaar in het mRNA zelf', en: 'A switch in the mRNA itself' }, text: { nl: 'Het begin van een bacterieel mRNA kan adenine binden. Zonder adenine verstopt het de landingsplaats van het ribosoom.', en: 'The start of a bacterial mRNA can bind adenine. Without adenine it hides the landing site of the ribosome.' } },
        1: { tag: ['aptameer', 'aptamer'], title: { nl: 'Adenine zet het gen aan', en: 'Adenine switches the gene on' }, text: { nl: 'Bindt adenine op het vanggedeelte (de aptameer), dan klapt het RNA om. De landingsplaats komt vrij en het ribosoom kan de translatie starten.', en: 'When adenine binds the catching part (the aptamer), the RNA flips over. The landing site is freed and the ribosome can start translation.' } },
        5: { tag: ['bacteriën', 'bacteria'], title: { nl: 'Vooral bij bacteriën', en: 'Mostly in bacteria' }, text: { nl: 'Riboswitches komen vooral bij bacteriën voor; planten en schimmels hebben er één soort. Bij de mens is er nog geen gevonden.', en: 'Riboswitches are found mostly in bacteria; plants and fungi have one kind. None has been found in humans yet.' } },
      },
    },
  },
};
