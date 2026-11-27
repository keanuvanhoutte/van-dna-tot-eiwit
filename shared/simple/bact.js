/* Eenvoudige teksten voor de niveaus hobbyist en secundair (groep bact). Sleutels van steps = stapnummer in de animatie. */
export default {
  'bcel': {
    hobby: {
      kort: { nl: 'Een bacterie is een piepklein levend wezen van één cel. Anders dan onze cellen heeft ze geen celkern: haar DNA ligt gewoon los in de cel. Zo zie je het verschil met onze eigen cellen.', en: 'A bacterium is a tiny living thing made of a single cell. Unlike our cells, it has no nucleus: its DNA simply lies loose inside the cell. This shows how it differs from our own cells.' },
      steps: {
        0: { tag: ['geen kern', 'no nucleus'], title: { nl: 'Een bacterie: klein en zonder kern', en: 'A bacterium: small and without a nucleus' }, text: { nl: 'Deze darmbacterie is een piepklein staafje zonder celkern: alles gebeurt in één ruimte.', en: 'This gut bacterium is a tiny rod with no nucleus: everything happens in one space.' } },
        1: { tag: ['DNA los', 'loose DNA'], title: { nl: 'Het DNA ligt los in de cel', en: 'The DNA lies loose in the cell' }, text: { nl: 'Het DNA ligt opgevouwen in het midden, zonder vlies eromheen.', en: 'The DNA is folded up in the middle, with no wrapping around it.' } },
        2: { tag: ['DNA-ring', 'DNA ring'], title: { nl: 'Eén grote ring DNA', en: 'One big ring of DNA' }, text: { nl: 'De bacterie heeft één grote, gesloten ring DNA. Onze cellen hebben veel losse, rechte stukken DNA.', en: 'The bacterium has one big, closed ring of DNA. Our cells have many separate, straight pieces of DNA.' } },
      },
    },
    secundair: {
      kort: { nl: 'Een bacterie zoals E. coli heeft geen celkern. Haar DNA ligt opgevouwen in het cytoplasma, in een zone die de nucleoïd heet. Ze heeft één ringvormig chromosoom en vaak plasmiden.', en: 'A bacterium such as E. coli has no nucleus. Its DNA lies folded up in the cytoplasm, in a zone called the nucleoid. It has one circular chromosome and often plasmids.' },
      terms: [
        [{ nl: 'nucleoïd', en: 'nucleoid' }, { nl: 'De zone in het cytoplasma waar het bacteriële DNA opgevouwen ligt, zonder membraan eromheen.', en: 'The zone in the cytoplasm where the bacterial DNA lies folded up, with no membrane around it.' }],
        [{ nl: 'ringvormig chromosoom', en: 'circular chromosome' }, { nl: 'Eén gesloten DNA-molecule met het grootste deel van de genen van de bacterie.', en: 'One closed DNA molecule carrying most of the bacterium’s genes.' }],
        [{ nl: 'plasmide', en: 'plasmid' }, { nl: 'Een kleine extra DNA-ring naast het chromosoom.', en: 'A small extra DNA ring next to the chromosome.' }],
        [{ nl: 'cytoplasma', en: 'cytoplasm' }, { nl: 'De vloeibare binnenkant van de cel.', en: 'The fluid inside of the cell.' }],
      ],
      steps: {
        0: { tag: ['geen kern', 'no nucleus'], title: { nl: 'Een bacterie: klein en zonder kern', en: 'A bacterium: small and without a nucleus' }, text: { nl: 'E. coli is een klein staafje zonder celkern. Alles gebeurt in één ruimte: het cytoplasma.', en: 'E. coli is a small rod without a nucleus. Everything happens in one space: the cytoplasm.' } },
        1: { tag: ['nucleoïd', 'nucleoid'], title: { nl: 'Nucleoïd: het DNA ligt vrij in de cel', en: 'Nucleoid: the DNA lies free in the cell' }, text: { nl: 'Het DNA ligt opgevouwen in de nucleoïd. Anders dan een kern heeft die geen membraan.', en: 'The DNA lies folded up in the nucleoid. Unlike a nucleus, it has no membrane.' } },
        2: { tag: ['ringchromosoom', 'ring chromosome'], title: { nl: 'Eén ringvormig chromosoom', en: 'One circular chromosome' }, text: { nl: 'Het chromosoom is één gesloten ring. De mens heeft lineaire chromosomen in een kern.', en: 'The chromosome is one closed ring. Humans have linear chromosomes inside a nucleus.' } },
      },
    },
  },

  'bnucleoid': {
    hobby: {
      kort: { nl: 'Uitgerekt is het DNA van een bacterie veel langer dan de bacterie zelf. Toch past het erin. Kleine eiwitten buigen en bundelen het DNA, zoals je een lang touw oprolt en samenbindt.', en: 'Stretched out, a bacterium’s DNA is much longer than the bacterium itself. Yet it fits inside. Small proteins bend and bundle the DNA, like rolling up a long rope and tying it together.' },
      steps: {
        0: { tag: ['opvouwen', 'folding'], title: { nl: 'Een lange draad in een kleine cel', en: 'A long thread in a small cell' }, text: { nl: 'Bacteriën hebben niet de spoeltjes waarrond onze cellen DNA winden. Kleine eiwitten buigen en bundelen hun DNA.', en: 'Bacteria lack the little spools our cells wind DNA around. Small proteins bend and bundle their DNA.' } },
        2: { tag: ['U-bocht', 'U-turn'], title: { nl: 'Het DNA maakt een U-bocht', en: 'The DNA makes a U-turn' }, text: { nl: 'Eén klein eiwit buigt het DNA zo sterk dat de draad bijna helemaal omkeert.', en: 'One small protein bends the DNA so sharply that the thread almost turns right back.' } },
      },
    },
    secundair: {
      kort: { nl: 'De meeste bacteriën hebben geen histonen. Toch past hun lange DNA in de kleine cel. Kleine nucleoïd-eiwitten buigen, overbruggen en bundelen het DNA, en het enzym gyrase verdraait het extra (supercoiling).', en: 'Most bacteria have no histones. Yet their long DNA fits in the small cell. Small nucleoid proteins bend, bridge and bundle the DNA, and the enzyme gyrase gives it extra twist (supercoiling).' },
      terms: [
        [{ nl: 'histon', en: 'histone' }, { nl: 'Eiwit waarrond ons DNA gewonden is; de meeste bacteriën hebben er geen.', en: 'Protein our DNA is wound around; most bacteria have none.' }],
        [{ nl: 'nucleoïd-eiwitten', en: 'nucleoid proteins' }, { nl: 'Kleine eiwitten die het bacteriële DNA buigen, overbruggen en bundelen.', en: 'Small proteins that bend, bridge and bundle bacterial DNA.' }],
        [{ nl: 'IHF', en: 'IHF' }, { nl: 'Een nucleoïd-eiwit dat het DNA in een scherpe U-bocht buigt.', en: 'A nucleoid protein that bends DNA into a sharp U-turn.' }],
        [{ nl: 'gyrase', en: 'gyrase' }, { nl: 'Enzym dat het DNA extra verdraait (supercoiling).', en: 'Enzyme that gives DNA extra twist (supercoiling).' }],
      ],
      steps: {
        0: { tag: ['geen histonen', 'no histones'], title: { nl: 'DNA opvouwen zonder histonen', en: 'Folding DNA without histones' }, text: { nl: 'De meeste bacteriën hebben geen histonen. Kleine nucleoïd-eiwitten buigen en bundelen hun DNA.', en: 'Most bacteria have no histones. Small nucleoid proteins bend and bundle their DNA.' } },
        2: { tag: ['IHF', 'IHF'], title: { nl: 'IHF buigt het DNA in een U-bocht', en: 'IHF bends the DNA into a U-turn' }, text: { nl: 'Het eiwit IHF buigt het DNA heel scherp. De dubbele helix keert bijna helemaal om.', en: 'The protein IHF bends the DNA very sharply. The double helix almost turns right back.' } },
      },
    },
  },

  'bplasmide': {
    hobby: {
      kort: { nl: 'Naast haar grote DNA-ring heeft een bacterie vaak kleine extra ringetjes DNA. Die dragen vaak handige genen, bijvoorbeeld om een antibioticum onschadelijk te maken. Sommige ringetjes kunnen naar een andere bacterie overgaan.', en: 'Besides its big DNA ring, a bacterium often has small extra rings of DNA. They often carry handy genes, for example one that makes an antibiotic harmless. Some of these rings can pass to another bacterium.' },
      steps: {
        0: { tag: ['DNA-ringetje', 'small DNA ring'], title: { nl: 'Een klein extra ringetje DNA', en: 'A small extra ring of DNA' }, text: { nl: 'Naast haar grote DNA-ring heeft de bacterie vaak een eigen, veel kleiner ringetje DNA.', en: 'Besides its big DNA ring, the bacterium often has its own, much smaller ring of DNA.' } },
        2: { tag: ['extra genen', 'extra genes'], title: { nl: 'Extra genen, zoals tegen antibiotica', en: 'Extra genes, like against antibiotics' }, text: { nl: 'Zo’n ringetje draagt vaak extra genen. Dit gen maakt een eiwit dat een antibioticum openknipt en onschadelijk maakt.', en: 'Such a ring often carries extra genes. This one makes a protein that cuts an antibiotic open so it no longer works.' } },
        3: { tag: ['doorgeven', 'sharing'], title: { nl: 'Doorgeven aan een buurbacterie', en: 'Passing it to a neighbour' }, text: { nl: 'Met een dun draadje maakt de bacterie contact met een buur. Eén van de twee DNA-draden van het ringetje gaat over.', en: 'With a thin thread, the bacterium makes contact with a neighbour. One of the two DNA strands of the ring passes over.' } },
      },
    },
    secundair: {
      kort: { nl: 'Een plasmide is een kleine DNA-ring naast het chromosoom, met een eigen replicatie-oorsprong. Plasmiden dragen vaak extra genen, zoals resistentiegenen. Sommige gaan via conjugatie over naar een andere bacterie.', en: 'A plasmid is a small DNA ring next to the chromosome, with its own origin of replication. Plasmids often carry extra genes, such as resistance genes. Some pass to another bacterium by conjugation.' },
      terms: [
        [{ nl: 'plasmide', en: 'plasmid' }, { nl: 'Kleine, meestal ringvormige DNA-molecule naast het chromosoom.', en: 'Small, usually circular DNA molecule next to the chromosome.' }],
        [{ nl: 'replicatie-oorsprong', en: 'origin of replication' }, { nl: 'De plek waar het kopiëren van een DNA-molecule start.', en: 'The spot where copying of a DNA molecule starts.' }],
        [{ nl: 'resistentiegen', en: 'resistance gene' }, { nl: 'Gen dat een bacterie beschermt tegen een antibioticum.', en: 'Gene that protects a bacterium against an antibiotic.' }],
        [{ nl: 'conjugatie', en: 'conjugation' }, { nl: 'Het doorgeven van een plasmide aan een andere bacterie via direct contact.', en: 'Passing a plasmid to another bacterium through direct contact.' }],
      ],
      steps: {
        0: { tag: ['plasmide', 'plasmid'], title: { nl: 'Een plasmide is een kleine DNA-ring', en: 'A plasmid is a small DNA ring' }, text: { nl: 'Een plasmide is een eigen ring dubbelstrengs DNA naast het chromosoom. Meestal is het veel kleiner.', en: 'A plasmid is a separate ring of double-stranded DNA next to the chromosome. It is usually much smaller.' } },
        2: { tag: ['resistentie', 'resistance'], title: { nl: 'Extra genen, zoals resistentie', en: 'Extra genes, such as resistance' }, text: { nl: 'Plasmiden dragen vaak extra genen. Dit resistentiegen maakt een enzym dat een antibioticum openknipt.', en: 'Plasmids often carry extra genes. This resistance gene makes an enzyme that cuts an antibiotic open.' } },
        3: { tag: ['conjugatie', 'conjugation'], title: { nl: 'Conjugatie: doorgeven aan een buur', en: 'Conjugation: passing it on' }, text: { nl: 'Via een pilus, een dun aanhangsel, maakt de bacterie contact met een andere. Eén streng van het plasmide gaat over.', en: 'Through a pilus, a thin appendage, the bacterium contacts another one. One strand of the plasmid passes over.' } },
      },
    },
  },

  'bgen': {
    hobby: {
      kort: { nl: 'Een gen is een stukje DNA met het recept voor een eiwit. Bij een bacterie ligt dat recept tussen vaste onderdelen: een stuk om te starten, het recept zelf en een stopteken. Zo weet de cel waar ze moet beginnen en stoppen.', en: 'A gene is a piece of DNA with the recipe for a protein. In a bacterium, that recipe sits between fixed parts: a piece to start, the recipe itself and a stop sign. That way the cell knows where to begin and stop.' },
      steps: {
        0: { tag: ['onderdelen', 'parts'], title: { nl: 'Een gen is een rij onderdelen', en: 'A gene is a row of parts' }, text: { nl: 'Elk stukje heeft een taak: aanzetten, starten, het recept lezen en stoppen. Samen vormen ze één gen.', en: 'Each piece has a job: switching on, starting, reading the recipe and stopping. Together they form one gene.' } },
        1: { tag: ['startplek', 'start spot'], title: { nl: 'Hier begint het kopiëren', en: 'Copying starts here' }, text: { nl: 'Twee korte stukjes DNA wijzen aan waar het kopiëren naar RNA begint. Een hulpeiwit herkent ze.', en: 'Two short bits of DNA mark where copying into RNA begins. A helper protein recognises them.' } },
        5: { tag: ['stopteken', 'stop sign'], title: { nl: 'Het recept en het stopteken', en: 'The recipe and the stop sign' }, text: { nl: 'Daarna volgt het recept voor het eiwit. Op het einde plooit het RNA zich tot een haarspeld die het kopiëren stopt.', en: 'Next comes the recipe for the protein. At the end, the RNA folds into a hairpin that stops the copying.' } },
      },
    },
    secundair: {
      kort: { nl: 'Een bacterieel gen bestaat uit vaste onderdelen: een promoter waar de transcriptie start, soms een operator als aan/uit-knop, een landingsplaats voor het ribosoom, het coderende deel tussen start- en stopcodon, en een terminator. Introns zijn zeldzaam.', en: 'A bacterial gene is made of fixed parts: a promoter where transcription starts, sometimes an operator as an on/off switch, a landing site for the ribosome, the coding part between start and stop codon, and a terminator. Introns are rare.' },
      terms: [
        [{ nl: 'promoter', en: 'promoter' }, { nl: 'DNA-stuk vóór een gen waar RNA-polymerase bindt en de transcriptie start.', en: 'DNA stretch before a gene where RNA polymerase binds and transcription starts.' }],
        [{ nl: 'σ-factor', en: 'sigma factor' }, { nl: 'Hulpeiwit van RNA-polymerase dat de promoter herkent.', en: 'Helper protein of RNA polymerase that recognises the promoter.' }],
        [{ nl: 'start- en stopcodon', en: 'start and stop codon' }, { nl: 'De codons waar de vertaling naar eiwit begint en eindigt.', en: 'The codons where translation into protein begins and ends.' }],
        [{ nl: 'terminator', en: 'terminator' }, { nl: 'DNA-stuk op het einde van een gen waar de transcriptie stopt.', en: 'DNA stretch at the end of a gene where transcription stops.' }],
      ],
      steps: {
        0: { tag: ['onderdelen', 'parts'], title: { nl: 'Een gen is een rij onderdelen', en: 'A gene is a row of parts' }, text: { nl: 'Elk onderdeel heeft een taak: aanzetten, starten, vertalen en stoppen. Samen vormen ze één gen.', en: 'Each part has a job: switching on, starting, translating and stopping. Together they form one gene.' } },
        1: { tag: ['promoter', 'promoter'], title: { nl: 'Promoter: hier start de transcriptie', en: 'Promoter: transcription starts here' }, text: { nl: 'Twee korte stukjes in de promoter wijzen de startplek aan. De σ-factor herkent ze.', en: 'Two short bits in the promoter mark the start site. The sigma factor recognises them.' } },
        5: { tag: ['terminator', 'terminator'], title: { nl: 'Coderend deel en terminator', en: 'Coding part and terminator' }, text: { nl: 'Van startcodon tot stopcodon staat de code voor het eiwit. In de terminator vouwt het RNA een haarspeld die de transcriptie stopt.', en: 'From start codon to stop codon lies the code for the protein. At the terminator, the RNA folds a hairpin that stops transcription.' } },
      },
    },
  },

  'bpol': {
    hobby: {
      kort: { nl: 'Om een gen te gebruiken maakt de cel eerst een RNA-kopie. Bij bacteriën doet één soort kopieermachine al dat werk. Een helper wijst die machine de weg naar het begin van een gen.', en: 'To use a gene, the cell first makes an RNA copy. In bacteria, one kind of copy machine does all that work. A helper shows the machine the way to the start of a gene.' },
      steps: {
        0: { tag: ['kopieermachine', 'copy machine'], title: { nl: 'Eén machine maakt alle RNA', en: 'One machine makes all RNA' }, text: { nl: 'Bacteriën hebben maar één soort machine die RNA-kopieën maakt. Hier zit ze aan het begin van een gen, met het DNA al open.', en: 'Bacteria have just one kind of machine that makes RNA copies. Here it sits at the start of a gene, with the DNA already open.' } },
        2: { tag: ['gids', 'guide'], title: { nl: 'Een helper is de gids', en: 'A helper is the guide' }, text: { nl: 'Een helper ligt over de buitenkant van de machine. Zonder die gids vindt ze het begin van het gen niet.', en: 'A helper lies over the outside of the machine. Without this guide, it cannot find the start of the gene.' } },
        5: { tag: ['klaar', 'ready'], title: { nl: 'Klaar om RNA te maken', en: 'Ready to make RNA' }, text: { nl: 'Eén DNA-draad ligt nu in de machine, klaar om afgelezen te worden. Zodra ze vertrekt, laat de gids meestal los.', en: 'One DNA strand now lies inside the machine, ready to be read. As soon as it moves off, the guide usually lets go.' } },
      },
    },
    secundair: {
      kort: { nl: 'Bacteriën hebben één soort RNA-polymerase voor alle RNA. De σ-factor leidt het enzym naar de promoter en helpt het DNA openen.', en: 'Bacteria have one kind of RNA polymerase for all RNA. The sigma factor guides the enzyme to the promoter and helps open the DNA.' },
      terms: [
        [{ nl: 'RNA-polymerase', en: 'RNA polymerase' }, { nl: 'Enzym dat RNA maakt door een DNA-streng af te lezen.', en: 'Enzyme that makes RNA by reading a DNA strand.' }],
        [{ nl: 'σ-factor', en: 'sigma factor' }, { nl: 'Hulpeiwit dat RNA-polymerase naar de promoter leidt.', en: 'Helper protein that guides RNA polymerase to the promoter.' }],
        [{ nl: 'promoter', en: 'promoter' }, { nl: 'DNA-stuk waar de transcriptie start.', en: 'DNA stretch where transcription starts.' }],
        [{ nl: 'matrijsstreng', en: 'template strand' }, { nl: 'De DNA-streng die RNA-polymerase afleest.', en: 'The DNA strand that RNA polymerase reads.' }],
      ],
      steps: {
        0: { tag: ['RNA-polymerase', 'RNA polymerase'], title: { nl: 'Eén RNA-polymerase maakt alle RNA', en: 'One RNA polymerase makes all RNA' }, text: { nl: 'Bacteriën hebben maar één soort RNA-polymerase. Hier zit het op een promoter, met het DNA al open.', en: 'Bacteria have just one kind of RNA polymerase. Here it sits on a promoter, with the DNA already open.' } },
        2: { tag: ['σ-factor', 'sigma factor'], title: { nl: 'De σ-factor is de gids', en: 'The sigma factor is the guide' }, text: { nl: 'De σ-factor ligt over de buitenkant van het enzym. Zonder σ vindt het de promoter niet.', en: 'The sigma factor lies over the outside of the enzyme. Without it, the enzyme cannot find the promoter.' } },
        5: { tag: ['matrijsstreng', 'template strand'], title: { nl: 'Klaar om RNA te maken', en: 'Ready to make RNA' }, text: { nl: 'De matrijsstreng ligt nu in het enzym. Verlaat het de promoter, dan laat σ meestal los.', en: 'The template strand now lies inside the enzyme. Once it leaves the promoter, sigma usually lets go.' } },
      },
    },
  },

  'bterm': {
    hobby: {
      kort: { nl: 'Bij het maken van een RNA-kopie moet de kopieermachine weten waar het gen ophoudt. Op het einde staat een stopteken. Daar laat de machine het DNA en de nieuwe RNA-kopie los.', en: 'When making an RNA copy, the copy machine needs to know where the gene ends. At the end there is a stop sign. There the machine lets go of the DNA and the new RNA copy.' },
      steps: {
        0: { tag: ['stopteken', 'stop sign'], title: { nl: 'Elke kopie eindigt met een stopteken', en: 'Every copy ends at a stop sign' }, text: { nl: 'Achter een gen ligt een stopteken. Daar laat de kopieermachine het DNA en het nieuwe RNA los.', en: 'Behind a gene lies a stop sign. There the copy machine lets go of the DNA and the new RNA.' } },
        1: { tag: ['haarspeld', 'hairpin'], title: { nl: 'Stop 1: het RNA plooit een haarspeld', en: 'Stop 1: the RNA folds a hairpin' }, text: { nl: 'Het nieuwe RNA plooit zich dubbel tot een stevige haarspeld. Die trekt aan de machine.', en: 'The new RNA folds back on itself into a firm hairpin. It pulls on the machine.' } },
      },
    },
    secundair: {
      kort: { nl: 'Op het einde van een gen of operon ligt een terminator. Daar vormt het RNA een haarspeld gevolgd door U’s, of haalt het eiwit Rho het RNA-polymerase in. In beide gevallen stopt de transcriptie.', en: 'At the end of a gene or operon lies a terminator. There the RNA forms a hairpin followed by U’s, or the protein Rho catches up with RNA polymerase. Either way, transcription stops.' },
      terms: [
        [{ nl: 'terminator', en: 'terminator' }, { nl: 'DNA-stuk op het einde van een gen of operon waar de transcriptie stopt.', en: 'DNA stretch at the end of a gene or operon where transcription stops.' }],
        [{ nl: 'haarspeld', en: 'hairpin' }, { nl: 'Stuk RNA dat met zichzelf paart en zo een lus vormt.', en: 'Stretch of RNA that pairs with itself and forms a loop.' }],
        [{ nl: 'Rho', en: 'Rho' }, { nl: 'Eiwit dat over het RNA loopt, het RNA-polymerase inhaalt en de transcriptie stopt.', en: 'Protein that moves along the RNA, catches up with RNA polymerase and stops transcription.' }],
        [{ nl: 'operon', en: 'operon' }, { nl: 'Groep genen die samen in één mRNA worden overgeschreven.', en: 'Group of genes transcribed together into one mRNA.' }],
      ],
      steps: {
        0: { tag: ['terminator', 'terminator'], title: { nl: 'Elk transcript eindigt aan een terminator', en: 'Every transcript ends at a terminator' }, text: { nl: 'Achter een gen of operon ligt een terminator. Daar laat RNA-polymerase het DNA en het RNA los.', en: 'Behind a gene or operon lies a terminator. There RNA polymerase lets go of the DNA and the RNA.' } },
        1: { tag: ['haarspeld', 'hairpin'], title: { nl: 'Stoppen met een haarspeld in het RNA', en: 'Stopping with a hairpin in the RNA' }, text: { nl: 'Het nieuwe RNA vouwt een stevige haarspeld met veel G–C-paren. Die trekt aan het RNA-polymerase.', en: 'The new RNA folds a firm hairpin with many G–C pairs. It pulls on RNA polymerase.' } },
      },
    },
  },

  'bmrna': {
    hobby: {
      kort: { nl: 'In onze cellen wordt een RNA-kopie eerst bijgewerkt en pas daarna gebruikt. Een bacterie heeft geen kern: daar beginnen de eiwitfabriekjes al terwijl de kopie nog gemaakt wordt.', en: 'In our cells, an RNA copy is first touched up and only then used. A bacterium has no nucleus: there the protein factories already start while the copy is still being made.' },
      steps: {
        0: { tag: ['tegelijk', 'at once'], title: { nl: 'Kopiëren en eiwit bouwen tegelijk', en: 'Copying and building at once' }, text: { nl: 'Terwijl de kopieermachine RNA maakt, springen de eiwitfabriekjes er al op. Er is geen kern die ze scheidt.', en: 'While the copy machine makes RNA, the protein factories already hop on. There is no nucleus keeping them apart.' } },
        4: { tag: ['veel eiwitten', 'many proteins'], title: { nl: 'Eén RNA, meerdere eiwitten', en: 'One RNA, several proteins' }, text: { nl: 'Op dit RNA staan meerdere genen achter elkaar. Elk gen heeft meestal een eigen startplek, zodat de fabriekjes elk eiwit apart bouwen.', en: 'This RNA holds several genes in a row. Each gene usually has its own start spot, so the factories build each protein separately.' } },
        5: { tag: ['mens vs bacterie', 'human vs bacteria'], title: { nl: 'Mens en bacterie naast elkaar', en: 'Human and bacterium side by side' }, text: { nl: 'Bij de bacterie is het RNA meteen klaar voor gebruik. Bij de mens wordt het eerst bijgewerkt.', en: 'In the bacterium, the RNA is ready to use right away. In humans, it is touched up first.' } },
      },
    },
    secundair: {
      kort: { nl: 'In een bacterie start de translatie al tijdens de transcriptie. Bacterieel mRNA krijgt geen cap en wordt niet gesplicet. Het ribosoom vindt het startcodon via de Shine-Dalgarno-volgorde.', en: 'In a bacterium, translation already starts during transcription. Bacterial mRNA gets no cap and is not spliced. The ribosome finds the start codon through the Shine-Dalgarno sequence.' },
      terms: [
        [{ nl: 'gekoppelde transcriptie en translatie', en: 'coupled transcription and translation' }, { nl: 'Ribosomen vertalen het mRNA terwijl het nog gemaakt wordt.', en: 'Ribosomes translate the mRNA while it is still being made.' }],
        [{ nl: 'Shine-Dalgarno-volgorde', en: 'Shine-Dalgarno sequence' }, { nl: 'Korte landingsplaats op het mRNA die het ribosoom naar het startcodon leidt.', en: 'Short landing site on the mRNA that guides the ribosome to the start codon.' }],
        [{ nl: 'startcodon', en: 'start codon' }, { nl: 'Codon, meestal AUG, waar de translatie begint.', en: 'Codon, usually AUG, where translation begins.' }],
        [{ nl: 'operon', en: 'operon' }, { nl: 'Groep genen die samen op één mRNA staan.', en: 'Group of genes that sit together on one mRNA.' }],
      ],
      steps: {
        0: { tag: ['gekoppeld', 'coupled'], title: { nl: 'Transcriptie en translatie tegelijk', en: 'Transcription and translation at once' }, text: { nl: 'Terwijl RNA-polymerase mRNA maakt, binden ribosomen er al op. Er is geen kern die beide scheidt.', en: 'While RNA polymerase makes mRNA, ribosomes already bind to it. There is no nucleus keeping them apart.' } },
        4: { tag: ['operon', 'operon'], title: { nl: 'Eén mRNA, meerdere eiwitten', en: 'One mRNA, several proteins' }, text: { nl: 'In een operon-mRNA heeft elk gen meestal een eigen Shine-Dalgarno-volgorde. Zo vertalen ribosomen elk gen apart.', en: 'In an operon mRNA, each gene usually has its own Shine-Dalgarno sequence. So ribosomes translate each gene separately.' } },
        5: { tag: ['mens vs bacterie', 'human vs bacteria'], title: { nl: 'Mens en bacterie naast elkaar', en: 'Human and bacterium side by side' }, text: { nl: 'Bacterieel mRNA krijgt geen cap en geen splicing: het is meteen klaar. Bij de mens wordt het eerst bewerkt.', en: 'Bacterial mRNA gets no cap and no splicing: it is ready right away. In humans, it is processed first.' } },
      },
    },
  },

  'bribosoom': {
    hobby: {
      kort: { nl: 'Het ribosoom is het fabriekje dat eiwitten bouwt. Het bestaat uit een klein en een groot deel, vooral gemaakt van RNA. In een bacterie rijdt het vlak achter de kopieermachine over dezelfde RNA-kopie.', en: 'The ribosome is the little factory that builds proteins. It has a small and a large part, made mostly of RNA. In a bacterium, it rides right behind the copy machine along the same RNA copy.' },
      steps: {
        0: { tag: ['samen', 'together'], title: { nl: 'Fabriekje en kopieermachine samen', en: 'Factory and copy machine together' }, text: { nl: 'Hier leest het eiwitfabriekje een RNA-kopie, vlak achter de machine die die kopie nog aan het maken is.', en: 'Here the protein factory reads an RNA copy, right behind the machine that is still making that copy.' } },
        1: { tag: ['klein deel', 'small part'], title: { nl: 'Het kleine deel leest', en: 'The small part reads' }, text: { nl: 'Het kleine deel bestaat uit één lange RNA-draad en een hoop kleine eiwitten. Het leest de RNA-kopie.', en: 'The small part is made of one long RNA strand and a bunch of small proteins. It reads the RNA copy.' } },
        2: { tag: ['groot deel', 'large part'], title: { nl: 'Het grote deel bouwt', en: 'The large part builds' }, text: { nl: 'Het grote deel heeft twee RNA-draden en veel eiwitten. Hier worden de bouwstenen aan elkaar gehaakt.', en: 'The large part has two RNA strands and many proteins. Here the building blocks are hooked together.' } },
      },
    },
    secundair: {
      kort: { nl: 'Het bacteriële ribosoom bestaat uit een kleine en een grote subeenheid, vooral opgebouwd uit rRNA. In een bacterie kan het vlak achter het RNA-polymerase hetzelfde mRNA vertalen: samen heten ze het expressoom.', en: 'The bacterial ribosome is made of a small and a large subunit, built mostly from rRNA. In a bacterium, it can translate the same mRNA right behind RNA polymerase: together they are called the expressome.' },
      terms: [
        [{ nl: 'ribosoom', en: 'ribosome' }, { nl: 'Complex van rRNA en eiwitten dat mRNA vertaalt naar eiwit.', en: 'Complex of rRNA and proteins that translates mRNA into protein.' }],
        [{ nl: 'kleine subeenheid', en: 'small subunit' }, { nl: 'Deel van het ribosoom dat het mRNA leest.', en: 'Part of the ribosome that reads the mRNA.' }],
        [{ nl: 'grote subeenheid', en: 'large subunit' }, { nl: 'Deel van het ribosoom dat de aminozuren aan elkaar koppelt.', en: 'Part of the ribosome that links the amino acids together.' }],
        [{ nl: 'expressoom', en: 'expressome' }, { nl: 'RNA-polymerase en ribosoom die samen op hetzelfde mRNA werken.', en: 'RNA polymerase and ribosome working together on the same mRNA.' }],
      ],
      steps: {
        0: { tag: ['expressoom', 'expressome'], title: { nl: 'Expressoom: ribosoom en RNA-polymerase', en: 'Expressome: ribosome and RNA polymerase' }, text: { nl: 'Een bacterieel ribosoom leest het mRNA vlak achter het RNA-polymerase dat het nog maakt.', en: 'A bacterial ribosome reads the mRNA right behind the RNA polymerase that is still making it.' } },
        1: { tag: ['kleine eenheid', 'small subunit'], title: { nl: 'De kleine subeenheid leest', en: 'The small subunit reads' }, text: { nl: 'De kleine subeenheid bestaat uit één lang rRNA en eiwitten. Ze leest het mRNA.', en: 'The small subunit is made of one long rRNA and proteins. It reads the mRNA.' } },
        2: { tag: ['grote eenheid', 'large subunit'], title: { nl: 'De grote subeenheid koppelt', en: 'The large subunit links' }, text: { nl: 'De grote subeenheid heeft twee rRNA’s en veel eiwitten. Hier worden de aminozuren aan elkaar gekoppeld.', en: 'The large subunit has two rRNAs and many proteins. Here the amino acids are linked together.' } },
      },
    },
  },

  'bafbraak': {
    hobby: {
      kort: { nl: 'Ook bacteriën ruimen eiwitten op die fout of overbodig zijn. Een opruimmachine grijpt zo’n eiwit vast, trekt het met energie uit elkaar en knipt het in stukjes in een gesloten kamer.', en: 'Bacteria also clear away proteins that are faulty or no longer needed. A clean-up machine grabs such a protein, pulls it apart using energy and chops it up in a closed chamber.' },
      steps: {
        0: { tag: ['opruimen', 'cleaning up'], title: { nl: 'Ook eiwitten moeten weg', en: 'Proteins must go too' }, text: { nl: 'Bacteriën hebben niet hetzelfde opruimsysteem als onze cellen. Ze gebruiken eigen opruimmachines.', en: 'Bacteria do not have the same clean-up system as our cells. They use their own clean-up machines.' } },
        1: { tag: ['motor', 'motor'], title: { nl: 'Een motor van zes delen', en: 'A motor of six parts' }, text: { nl: 'Een ring van zes eiwitten verbruikt energie en trekt een eiwit uit elkaar, zoals je een kluwen ontwart.', en: 'A ring of six proteins uses energy and pulls a protein apart, like untangling a ball of yarn.' } },
        3: { tag: ['knipkamer', 'cutting room'], title: { nl: 'De knipkamer', en: 'The cutting chamber' }, text: { nl: 'De motor duwt de ontwarde draad in een gesloten kamer. Daarbinnen wordt ze in kleine stukjes geknipt.', en: 'The motor pushes the untangled thread into a closed chamber. Inside, it is cut into small pieces.' } },
      },
    },
    secundair: {
      kort: { nl: 'Bacteriën breken eiwitten af zonder proteasoom. Proteasen zoals ClpXP grijpen een eiwit bij een label, ontvouwen het met ATP en knippen het in een afgesloten kamer.', en: 'Bacteria break down proteins without a proteasome. Proteases such as ClpXP grab a protein by a tag, unfold it using ATP and cut it up in a closed chamber.' },
      terms: [
        [{ nl: 'protease', en: 'protease' }, { nl: 'Enzym dat eiwitten in stukken knipt.', en: 'Enzyme that cuts proteins into pieces.' }],
        [{ nl: 'ClpX', en: 'ClpX' }, { nl: 'Ring van zes eiwitten die met ATP een eiwit ontvouwt.', en: 'Ring of six proteins that unfolds a protein using ATP.' }],
        [{ nl: 'ClpP', en: 'ClpP' }, { nl: 'Afgesloten kamer waarin het ontvouwen eiwit geknipt wordt.', en: 'Closed chamber in which the unfolded protein is cut.' }],
        [{ nl: 'ATP', en: 'ATP' }, { nl: 'De energiedrager van de cel.', en: 'The energy carrier of the cell.' }],
      ],
      steps: {
        0: { tag: ['eiwitafbraak', 'protein breakdown'], title: { nl: 'Ook eiwitten moeten weg', en: 'Proteins must go too' }, text: { nl: 'E. coli heeft geen proteasoom zoals onze cellen. Ze gebruikt eigen proteasen, zoals ClpXP.', en: 'E. coli has no proteasome like our cells do. It uses its own proteases, such as ClpXP.' } },
        1: { tag: ['ClpX', 'ClpX'], title: { nl: 'ClpX: een motor van zes', en: 'ClpX: a motor of six' }, text: { nl: 'ClpX is een ring van zes eiwitten die ATP verbruiken. Zo trekken ze een eiwit open.', en: 'ClpX is a ring of six proteins that use ATP. That is how they pull a protein open.' } },
        3: { tag: ['ClpP', 'ClpP'], title: { nl: 'ClpP: de knipkamer', en: 'ClpP: the cutting chamber' }, text: { nl: 'ClpX duwt de ontvouwen keten in ClpP. Binnenin wordt ze in kleine stukjes geknipt.', en: 'ClpX pushes the unfolded chain into ClpP. Inside, it is cut into small pieces.' } },
      },
    },
  },

  'breplicatie': {
    hobby: {
      kort: { nl: 'Een bacterie kopieert haar hele DNA-ring. Het kopiëren start op één vaste plek en loopt in twee richtingen rond de ring. Daarna krijgt elke nieuwe bacterie één kopie.', en: 'A bacterium copies its whole DNA ring. Copying starts at one fixed spot and runs both ways around the ring. Then each new bacterium gets one copy.' },
      steps: {
        0: { tag: ['startplek', 'start spot'], title: { nl: 'Eén vaste startplek', en: 'One fixed start spot' }, text: { nl: 'Het kopiëren begint altijd op dezelfde plek in de ring. Een eiwit gaat daar zitten en opent het DNA.', en: 'Copying always starts at the same spot on the ring. A protein sits down there and opens the DNA.' } },
        1: { tag: ['twee richtingen', 'two ways'], title: { nl: 'Twee kanten op tegelijk', en: 'Both ways at once' }, text: { nl: 'Twee kopieerploegen vertrekken, elk een andere kant op rond de ring.', en: 'Two copying crews set off, each going a different way around the ring.' } },
        4: { tag: ['twee ringen', 'two rings'], title: { nl: 'Twee ringen voor twee bacteriën', en: 'Two rings for two bacteria' }, text: { nl: 'Nu zijn er twee DNA-ringen, elk met één oude en één nieuwe draad. Elke nieuwe bacterie krijgt er één.', en: 'Now there are two DNA rings, each with one old and one new strand. Each new bacterium gets one.' } },
      },
    },
    secundair: {
      kort: { nl: 'Een bacterie start de DNA-replicatie op één plaats, oriC, waar DnaA het DNA opent. Twee replicatievorken lopen in tegengestelde richting rond de ring en ontmoeten elkaar aan de overkant. Elke dochtercel krijgt één kopie.', en: 'A bacterium starts DNA replication at one site, oriC, where DnaA opens the DNA. Two replication forks run in opposite directions around the ring and meet on the far side. Each daughter cell gets one copy.' },
      terms: [
        [{ nl: 'oriC', en: 'oriC' }, { nl: 'De enige startplaats van de replicatie op het bacteriële chromosoom.', en: 'The single start site of replication on the bacterial chromosome.' }],
        [{ nl: 'DnaA', en: 'DnaA' }, { nl: 'Eiwit dat op oriC bindt en het DNA opent.', en: 'Protein that binds oriC and opens the DNA.' }],
        [{ nl: 'replicatievork', en: 'replication fork' }, { nl: 'Plek waar het DNA opengaat en gekopieerd wordt.', en: 'Spot where the DNA opens up and is copied.' }],
        [{ nl: 'semiconservatief', en: 'semi-conservative' }, { nl: 'Elke nieuwe DNA-molecule heeft één oude en één nieuwe streng.', en: 'Each new DNA molecule has one old and one new strand.' }],
      ],
      steps: {
        0: { tag: ['oriC', 'oriC'], title: { nl: 'Eén startplaats: oriC', en: 'One start site: oriC' }, text: { nl: 'De replicatie begint altijd op oriC. Het eiwit DnaA bindt daar en opent het DNA.', en: 'Replication always starts at oriC. The protein DnaA binds there and opens the DNA.' } },
        1: { tag: ['replicatievork', 'replication fork'], title: { nl: 'Twee replicatievorken, twee richtingen', en: 'Two replication forks, two directions' }, text: { nl: 'Twee replicatievorken vertrekken, elk in een andere richting rond de ring.', en: 'Two replication forks set off, each in a different direction around the ring.' } },
        4: { tag: ['twee kopieën', 'two copies'], title: { nl: 'Twee chromosomen, twee dochtercellen', en: 'Two chromosomes, two daughter cells' }, text: { nl: 'Elk nieuw chromosoom heeft één oude en één nieuwe streng: semiconservatief. Elke dochtercel krijgt er één.', en: 'Each new chromosome has one old and one new strand: semi-conservative. Each daughter cell gets one.' } },
      },
    },
  },

  'btrp': {
    hobby: {
      kort: { nl: 'Deze groep genen maakt samen één bouwsteen voor eiwitten. Is er al genoeg van die bouwsteen, dan zet de bacterie de genen zachter. Daarvoor heeft ze twee knoppen.', en: 'This group of genes works together to make one building block for proteins. When there is already enough of it, the bacterium turns the genes down. It has two knobs for that.' },
      steps: {
        0: { tag: ['vijf genen', 'five genes'], title: { nl: 'Vijf genen voor één bouwsteen', en: 'Five genes for one building block' }, text: { nl: 'Deze vijf genen maken samen één bouwsteen voor eiwitten. Is er al genoeg van, dan moeten ze uit.', en: 'These five genes together make one building block for proteins. When there is enough, they should switch off.' } },
        1: { tag: ['knop 1', 'knob 1'], title: { nl: 'Knop 1: een remeiwit', en: 'Knob 1: a brake protein' }, text: { nl: 'Met de bouwsteen erop gaat een remeiwit op het DNA zitten. Dan worden de genen nog maar weinig gekopieerd.', en: 'With the building block on board, a brake protein sits on the DNA. Then the genes are hardly copied anymore.' } },
      },
    },
    secundair: {
      kort: { nl: 'Het trp-operon bevat vijf genen om het aminozuur tryptofaan te maken. Het wordt op twee manieren geremd: door de Trp-repressor die met tryptofaan op de operator bindt, en door attenuatie, waarbij een ribosoom op het leider-RNA bepaalt of de transcriptie doorgaat.', en: 'The trp operon holds five genes for making the amino acid tryptophan. It is held back in two ways: by the Trp repressor, which binds the operator together with tryptophan, and by attenuation, where a ribosome on the leader RNA decides whether transcription goes on.' },
      terms: [
        [{ nl: 'operon', en: 'operon' }, { nl: 'Groep genen die samen worden overgeschreven en geregeld.', en: 'Group of genes that are transcribed and controlled together.' }],
        [{ nl: 'repressor', en: 'repressor' }, { nl: 'Eiwit dat op de operator bindt en de transcriptie remt.', en: 'Protein that binds the operator and slows down transcription.' }],
        [{ nl: 'operator', en: 'operator' }, { nl: 'DNA-stuk waar een repressor bindt: de aan/uit-knop van een operon.', en: 'DNA stretch where a repressor binds: the on/off switch of an operon.' }],
        [{ nl: 'attenuatie', en: 'attenuation' }, { nl: 'Vroeg stoppen van de transcriptie, afhankelijk van een ribosoom op het leider-RNA.', en: 'Early stop of transcription, depending on a ribosome on the leader RNA.' }],
      ],
      steps: {
        0: { tag: ['trp-operon', 'trp operon'], title: { nl: 'Het trp-operon: vijf genen, één aminozuur', en: 'The trp operon: five genes, one amino acid' }, text: { nl: 'Deze vijf genen maken samen het aminozuur tryptofaan. Is er genoeg tryptofaan, dan moeten ze uit.', en: 'These five genes together make the amino acid tryptophan. When there is enough tryptophan, they should switch off.' } },
        1: { tag: ['repressor', 'repressor'], title: { nl: 'Uitzetten met de repressor', en: 'Switching off with the repressor' }, text: { nl: 'Met tryptofaan erop bindt de Trp-repressor de operator. Dan wordt het operon nog maar weinig getranscribeerd.', en: 'With tryptophan on board, the Trp repressor binds the operator. Then the operon is hardly transcribed anymore.' } },
      },
    },
  },

  'bsplicing': {
    hobby: {
      kort: { nl: 'Soms zit er in een RNA-kopie een tussenstuk dat eruit moet. Onze cellen hebben daar een grote knipmachine voor. Bij bacteriën gebeurt dat zelden, en dan knipt het tussenstuk zichzelf eruit.', en: 'Sometimes an RNA copy contains an in-between piece that has to come out. Our cells have a big cutting machine for that. In bacteria this is rare, and then the piece cuts itself out.' },
      steps: {
        0: { tag: ['zelf knippen', 'self-cutting'], title: { nl: 'Knippen zonder knipmachine', en: 'Cutting without a cutting machine' }, text: { nl: 'Bacteriën hebben geen grote knipmachine. Toch knippen enkele zeldzame tussenstukken zichzelf uit hun RNA.', en: 'Bacteria have no big cutting machine. Still, a few rare in-between pieces cut themselves out of their RNA.' } },
        1: { tag: ['RNA als schaar', 'RNA as scissors'], title: { nl: 'Het tussenstuk is zelf de schaar', en: 'The piece is its own scissors' }, text: { nl: 'Dit tussenstuk plooit zich tot een vaste vorm en werkt dan zelf als schaar. Het heeft geen eiwit nodig.', en: 'This piece folds into a fixed shape and then works as its own scissors. It needs no protein.' } },
        5: { tag: ['bij de mens', 'in humans'], title: { nl: 'Vergelijk: knippen bij de mens', en: 'Compare: cutting in humans' }, text: { nl: 'Bijna al onze genen hebben zulke tussenstukken. Een grote machine knipt ze eruit.', en: 'Almost all of our genes have such in-between pieces. A big machine cuts them out.' } },
      },
    },
    secundair: {
      kort: { nl: 'Bacteriën hebben geen spliceosoom en splicen bijna nooit. De zeldzame introns die ze hebben, knippen zichzelf uit: het RNA is zelf het enzym, een ribozym. Daarnaast bestaan inteïnes, stukken eiwit die zichzelf uit een eiwit knippen.', en: 'Bacteria have no spliceosome and hardly ever splice. The rare introns they do have cut themselves out: the RNA is itself the enzyme, a ribozyme. There are also inteins, pieces of protein that cut themselves out of a protein.' },
      terms: [
        [{ nl: 'intron', en: 'intron' }, { nl: 'Stuk van een gen dat uit het RNA geknipt wordt.', en: 'Part of a gene that is cut out of the RNA.' }],
        [{ nl: 'ribozym', en: 'ribozyme' }, { nl: 'RNA-molecule die als enzym werkt.', en: 'RNA molecule that works as an enzyme.' }],
        [{ nl: 'spliceosoom', en: 'spliceosome' }, { nl: 'Grote machine van RNA en eiwit die bij de mens introns uitknipt.', en: 'Large machine of RNA and protein that cuts out introns in humans.' }],
        [{ nl: 'inteïne', en: 'intein' }, { nl: 'Stuk eiwit dat zichzelf uit een eiwit knipt.', en: 'Piece of protein that cuts itself out of a protein.' }],
      ],
      steps: {
        0: { tag: ['zelfsplicing', 'self-splicing'], title: { nl: 'Splicen zonder spliceosoom', en: 'Splicing without a spliceosome' }, text: { nl: 'Bacteriën hebben geen spliceosoom. Toch knippen enkele zeldzame introns zichzelf uit hun RNA.', en: 'Bacteria have no spliceosome. Still, a few rare introns cut themselves out of their RNA.' } },
        1: { tag: ['ribozym', 'ribozyme'], title: { nl: 'Het intron is zelf het enzym', en: 'The intron is itself the enzyme' }, text: { nl: 'Dit intron vouwt zich tot een vaste 3D-vorm: een ribozym, een RNA dat als enzym werkt. Er is geen eiwit nodig.', en: 'This intron folds into a fixed 3D shape: a ribozyme, an RNA that works as an enzyme. No protein is needed.' } },
        5: { tag: ['spliceosoom', 'spliceosome'], title: { nl: 'Vergelijk: splicing bij de mens', en: 'Compare: splicing in humans' }, text: { nl: 'Bijna al onze genen hebben introns. Het spliceosoom, een grote machine, knipt ze eruit.', en: 'Almost all of our genes have introns. The spliceosome, a large machine, cuts them out.' } },
      },
    },
  },

  'faag': {
    hobby: {
      kort: { nl: 'Ook bacteriën kunnen besmet raken door een virus. Zo’n virus spuit zijn DNA in de bacterie. Daarna bouwt de bacterie meteen nieuwe virussen, of verstopt het virus-DNA zich in haar eigen DNA.', en: 'Bacteria can also be infected by a virus. Such a virus injects its DNA into the bacterium. Then the bacterium builds new viruses right away, or the virus DNA hides inside its own DNA.' },
      steps: {
        0: { tag: ['fagen', 'phages'], title: { nl: 'Ook bacteriën krijgen virussen', en: 'Bacteria get viruses too' }, text: { nl: 'Virussen die bacteriën besmetten heten fagen.', en: 'Viruses that infect bacteria are called phages.' } },
        1: { tag: ['DNA inspuiten', 'injecting DNA'], title: { nl: 'De faag spuit zijn DNA naar binnen', en: 'The phage injects its DNA' }, text: { nl: 'De faag zet zich met zijn pootjes op de bacterie en spuit zijn DNA erin. Het lege omhulsel blijft buiten.', en: 'The phage lands on the bacterium with its little legs and injects its DNA. The empty shell stays outside.' } },
        2: { tag: ['fagen bouwen', 'building phages'], title: { nl: 'Weg 1: de bacterie bouwt nieuwe fagen', en: 'Path 1: the bacterium builds new phages' }, text: { nl: 'De bacterie leest het faag-DNA alsof het van haarzelf is. Zo bouwt ze een hele hoop nieuwe fagen.', en: 'The bacterium reads the phage DNA as if it were its own. That way it builds lots of new phages.' } },
      },
    },
    secundair: {
      kort: { nl: 'Bacteriofagen zijn virussen die bacteriën besmetten en hun DNA in de bacterie injecteren. In de lytische cyclus maakt de cel nieuwe fagen en barst ze open. In de lysogene cyclus wordt het faag-DNA als profaag in het chromosoom ingebouwd.', en: 'Bacteriophages are viruses that infect bacteria and inject their DNA into them. In the lytic cycle, the cell makes new phages and bursts open. In the lysogenic cycle, the phage DNA is built into the chromosome as a prophage.' },
      terms: [
        [{ nl: 'bacteriofaag', en: 'bacteriophage' }, { nl: 'Virus dat bacteriën besmet, kortweg faag.', en: 'Virus that infects bacteria, phage for short.' }],
        [{ nl: 'lytische cyclus', en: 'lytic cycle' }, { nl: 'De cel maakt nieuwe fagen en barst daarna open.', en: 'The cell makes new phages and then bursts open.' }],
        [{ nl: 'lysogene cyclus', en: 'lysogenic cycle' }, { nl: 'Het faag-DNA wordt in het chromosoom ingebouwd en wacht daar.', en: 'The phage DNA is built into the chromosome and waits there.' }],
        [{ nl: 'profaag', en: 'prophage' }, { nl: 'Faag-DNA dat in het bacteriële chromosoom is ingebouwd.', en: 'Phage DNA built into the bacterial chromosome.' }],
      ],
      steps: {
        0: { tag: ['bacteriofaag', 'bacteriophage'], title: { nl: 'Bacteriofagen: virussen van bacteriën', en: 'Bacteriophages: viruses of bacteria' }, text: { nl: 'Virussen die bacteriën besmetten heten bacteriofagen, kortweg fagen.', en: 'Viruses that infect bacteria are called bacteriophages, or phages for short.' } },
        1: { tag: ['injectie', 'injection'], title: { nl: 'De faag injecteert zijn DNA', en: 'The phage injects its DNA' }, text: { nl: 'Met zijn poten hecht de faag aan de bacterie. Via de staart spuit hij zijn DNA naar binnen; de lege mantel blijft buiten.', en: 'The phage attaches to the bacterium with its legs. Through its tail it injects its DNA; the empty coat stays outside.' } },
        2: { tag: ['lytisch', 'lytic'], title: { nl: 'Lytische cyclus: nieuwe fagen bouwen', en: 'Lytic cycle: building new phages' }, text: { nl: 'De bacterie leest het faag-DNA af alsof het haar eigen DNA is. Zo maakt ze veel nieuwe fagen.', en: 'The bacterium reads the phage DNA as if it were its own. That way it makes many new phages.' } },
      },
    },
  },

  'crispr': {
    hobby: {
      kort: { nl: 'Sommige bacteriën hebben een afweer tegen virussen. Ze bewaren een stukje DNA van een virus als herinnering. Komt dat virus terug, dan knippen ze zijn DNA door. Mensen maakten daar een knipgereedschap van.', en: 'Some bacteria have a defence against viruses. They keep a piece of a virus’s DNA as a memory. If that virus comes back, they cut its DNA. People turned this into a cutting tool.' },
      steps: {
        0: { tag: ['onthouden', 'remembering'], title: { nl: 'Bacteriën onthouden hun vijanden', en: 'Bacteria remember their enemies' }, text: { nl: 'Sommige bacteriën overleven een aanval van een virus. Ze knippen een stukje uit zijn DNA en bewaren dat.', en: 'Some bacteria survive an attack by a virus. They cut a piece out of its DNA and keep it.' } },
        1: { tag: ['geheugen', 'memory'], title: { nl: 'Een geheugen in het eigen DNA', en: 'A memory in their own DNA' }, text: { nl: 'Het stukje komt vooraan in een rij in hun eigen DNA. Elk nieuw virus voegt een stukje toe.', en: 'The piece goes at the front of a row in their own DNA. Each new virus adds a piece.' } },
        4: { tag: ['knippen', 'cutting'], title: { nl: 'Past de gids, dan knipt de schaar', en: 'If the guide fits, the scissors cut' }, text: { nl: 'Uit die rij maakt de bacterie RNA-gidsen. Komt het virus terug, dan past een gids op zijn DNA en knipt een eiwitschaar het door.', en: 'From that row the bacterium makes RNA guides. If the virus returns, a guide fits its DNA and protein scissors cut it.' } },
        5: { tag: ['gentechniek', 'gene editing'], title: { nl: 'Mensen maakten er een knipgereedschap van', en: 'People made it into a cutting tool' }, text: { nl: 'Onderzoekers geven de schaar een zelfgekozen gids. Zo knippen ze een gen op een gekozen plek om het aan te passen.', en: 'Researchers give the scissors a guide of their choice. That way they cut a gene at a chosen spot to change it.' } },
      },
    },
    secundair: {
      kort: { nl: 'Bacteriën bouwen stukjes faag-DNA, spacers, in hun CRISPR-rij in. Van die rij maken ze crRNA’s: RNA-gidsen die Cas-eiwitten naar passend faag-DNA leiden, dat Cas dan doorknipt. Met een zelfgekozen gids is Cas9 een werktuig voor genbewerking.', en: 'Bacteria insert pieces of phage DNA, called spacers, into their CRISPR array. From that array they make crRNAs: RNA guides that lead Cas proteins to matching phage DNA, which Cas then cuts. With a guide of choice, Cas9 is a tool for gene editing.' },
      terms: [
        [{ nl: 'CRISPR-rij', en: 'CRISPR array' }, { nl: 'Rij in het bacteriële DNA met bewaarde stukjes faag-DNA.', en: 'Row in the bacterial DNA with stored pieces of phage DNA.' }],
        [{ nl: 'spacer', en: 'spacer' }, { nl: 'Een bewaard stukje faag-DNA in de CRISPR-rij.', en: 'A stored piece of phage DNA in the CRISPR array.' }],
        [{ nl: 'crRNA', en: 'crRNA' }, { nl: 'RNA-gids die een Cas-eiwit naar passend DNA leidt.', en: 'RNA guide that leads a Cas protein to matching DNA.' }],
        [{ nl: 'Cas9', en: 'Cas9' }, { nl: 'Eiwitschaar die DNA knipt waar de gids op past.', en: 'Protein scissors that cut DNA where the guide fits.' }],
      ],
      steps: {
        0: { tag: ['spacer', 'spacer'], title: { nl: 'Bacteriën onthouden hun vijanden', en: 'Bacteria remember their enemies' }, text: { nl: 'Sommige bacteriën overleven een faag. Ze knippen een stukje uit zijn DNA en bewaren dat als spacer.', en: 'Some bacteria survive a phage. They cut a piece out of its DNA and keep it as a spacer.' } },
        1: { tag: ['CRISPR-rij', 'CRISPR array'], title: { nl: 'CRISPR: een geheugen in het eigen DNA', en: 'CRISPR: a memory in their own DNA' }, text: { nl: 'De spacer komt vooraan in de CRISPR-rij in het eigen DNA. Elke nieuwe faag voegt een spacer toe.', en: 'The spacer goes at the front of the CRISPR array in their own DNA. Each new phage adds a spacer.' } },
        4: { tag: ['Cas knipt', 'Cas cuts'], title: { nl: 'Past het crRNA, dan knipt Cas', en: 'If the crRNA fits, Cas cuts' }, text: { nl: 'De cel maakt van elke spacer een RNA-gids (crRNA). Komt dezelfde faag terug, dan past die gids op zijn DNA. Het Cas-eiwit knipt dat DNA door.', en: 'The cell turns each spacer into an RNA guide (crRNA). If the same phage returns, that guide fits its DNA. The Cas protein cuts that DNA.' } },
        5: { tag: ['genbewerking', 'gene editing'], title: { nl: 'Cas9 als werktuig voor genbewerking', en: 'Cas9 as a tool for gene editing' }, text: { nl: 'Onderzoekers geven Cas9 een zelfgekozen gids-RNA. Zo knippen ze een gen op een gekozen plek om het aan te passen.', en: 'Researchers give Cas9 a guide RNA of their choice. That way they cut a gene at a chosen spot to change it.' } },
      },
    },
  },

  'vergelijk': {
    hobby: {
      kort: { nl: 'Van gen tot eiwit volgen mens en bacterie hetzelfde recept: DNA wordt RNA en RNA wordt eiwit. Alleen de werkplaats verschilt. Wij werken het RNA eerst bij in de celkern, een bacterie begint al terwijl het RNA nog gemaakt wordt.', en: 'From gene to protein, humans and bacteria follow the same recipe: DNA becomes RNA and RNA becomes protein. Only the workshop differs. We touch up the RNA in the nucleus first; a bacterium starts while the RNA is still being made.' },
      steps: {
        0: { tag: ['in de kern', 'in the nucleus'], title: { nl: 'Mens: het gen wordt in de kern gekopieerd', en: 'Human: the gene is copied in the nucleus' }, text: { nl: 'Een kopieermachine leest het gen en maakt een eerste RNA-kopie. Dat gebeurt binnen de celkern.', en: 'A copy machine reads the gene and makes a first RNA copy. This happens inside the nucleus.' } },
        3: { tag: ['eiwit bouwen', 'building protein'], title: { nl: 'Mens: fabriekjes bouwen het eiwit', en: 'Human: factories build the protein' }, text: { nl: 'Pas buiten de kern lezen eiwitfabriekjes de bijgewerkte RNA-kopie. Zo’n kopie draagt meestal één gen.', en: 'Only outside the nucleus do protein factories read the touched-up RNA copy. Such a copy usually carries one gene.' } },
        4: { tag: ['geen kern', 'no nucleus'], title: { nl: 'Nu de bacterie: er is geen kern', en: 'Now the bacterium: there is no nucleus' }, text: { nl: 'In de tekening blijft het DNA, maar de kern verdwijnt. Bij een bacterie ligt het DNA gewoon los in de cel.', en: 'In the drawing the DNA stays, but the nucleus disappears. In a bacterium, the DNA simply lies loose in the cell.' } },
        7: { tag: ['verschillen', 'differences'], title: { nl: 'Zelfde recept, andere werkplaats', en: 'Same recipe, different workshop' }, text: { nl: 'De zes grootste verschillen op een rij. Klik op een vak om verder te kijken.', en: 'The six biggest differences side by side. Click a box to look further.' } },
      },
    },
    secundair: {
      kort: { nl: 'Bij mens en bacterie gaat het van DNA via RNA naar eiwit. Bij de mens gebeurt de transcriptie in de kern, wordt het pre-mRNA bewerkt en volgt de translatie in het cytoplasma. Een bacterie heeft geen kern: de translatie start al tijdens de transcriptie.', en: 'In humans and bacteria alike, it goes from DNA via RNA to protein. In humans, transcription happens in the nucleus, the pre-mRNA is processed and translation follows in the cytoplasm. A bacterium has no nucleus: translation already starts during transcription.' },
      terms: [
        [{ nl: 'transcriptie', en: 'transcription' }, { nl: 'Het overschrijven van DNA naar RNA.', en: 'Copying DNA into RNA.' }],
        [{ nl: 'translatie', en: 'translation' }, { nl: 'Het vertalen van mRNA naar eiwit op het ribosoom.', en: 'Translating mRNA into protein on the ribosome.' }],
        [{ nl: 'pre-mRNA', en: 'pre-mRNA' }, { nl: 'De eerste RNA-kopie van een gen bij de mens, nog niet bewerkt.', en: 'The first RNA copy of a gene in humans, not yet processed.' }],
        [{ nl: 'operon', en: 'operon' }, { nl: 'Groep bacteriële genen die samen op één mRNA staan.', en: 'Group of bacterial genes that sit together on one mRNA.' }],
      ],
      steps: {
        0: { tag: ['transcriptie', 'transcription'], title: { nl: 'Mens: transcriptie in de kern', en: 'Human: transcription in the nucleus' }, text: { nl: 'RNA-polymerase leest het gen en maakt een pre-mRNA. Dat gebeurt in de celkern.', en: 'RNA polymerase reads the gene and makes a pre-mRNA. This happens in the nucleus.' } },
        3: { tag: ['translatie', 'translation'], title: { nl: 'Mens: translatie in het cytoplasma', en: 'Human: translation in the cytoplasm' }, text: { nl: 'Pas in het cytoplasma vertalen ribosomen het mRNA. Een menselijk mRNA draagt meestal één gen.', en: 'Only in the cytoplasm do ribosomes translate the mRNA. A human mRNA usually carries one gene.' } },
        4: { tag: ['geen kern', 'no nucleus'], title: { nl: 'Nu de bacterie: er is geen kern', en: 'Now the bacterium: there is no nucleus' }, text: { nl: 'De kern verdwijnt uit de tekening, het DNA blijft. Bij een bacterie ligt het DNA in het cytoplasma.', en: 'The nucleus disappears from the drawing, the DNA stays. In a bacterium, the DNA lies in the cytoplasm.' } },
        7: { tag: ['verschillen', 'differences'], title: { nl: 'Zelfde recept, andere werkplaats', en: 'Same recipe, different workshop' }, text: { nl: 'De zes grootste verschillen op een rij. Klik op een vak om verder te kijken.', en: 'The six biggest differences side by side. Click a box to look further.' } },
      },
    },
  },

  'beftu': {
    hobby: {
      kort: { nl: 'Het eiwitfabriekje bouwt een eiwit uit bouwstenen. Elke bouwsteen komt aan op een kleine drager, en een hulpeiwit brengt die drager naar het fabriekje. Past de drager, dan laat de helper los.', en: 'The protein factory builds a protein from building blocks. Each block arrives on a small carrier, and a helper protein brings that carrier to the factory. If the carrier fits, the helper lets go.' },
      steps: {
        0: { tag: ['aanvoer', 'delivery'], title: { nl: 'Een nieuwe bouwsteen komt aan', en: 'A new building block arrives' }, text: { nl: 'Een hulpeiwit brengt een kleine drager met een bouwsteen naar het eiwitfabriekje.', en: 'A helper protein brings a small carrier with a building block to the protein factory.' } },
        2: { tag: ['past het?', 'does it fit?'], title: { nl: 'Past het?', en: 'Does it fit?' }, text: { nl: 'Het fabriekje controleert of drie letters van de drager passen op drie letters van de RNA-kopie.', en: 'The factory checks whether three letters on the carrier match three letters on the RNA copy.' } },
        5: { tag: ['koppelen', 'linking'], title: { nl: 'Drie dragers in het fabriekje', en: 'Three carriers in the factory' }, text: { nl: 'De eerste drager brengt de eerste bouwsteen. Laat de helper los, dan schuift de nieuwe drager op zijn plek en volgt de koppeling.', en: 'The first carrier brings the first block. Once the helper lets go, the new carrier slides into place and the blocks get linked.' } },
      },
    },
    secundair: {
      kort: { nl: 'Een tRNA komt niet vanzelf naar het ribosoom: het eiwit EF-Tu brengt het aan. Past het anticodon op het codon, dan laat EF-Tu het los. Daarna koppelt het ribosoom het aminozuur.', en: 'A tRNA does not reach the ribosome on its own: the protein EF-Tu delivers it. If the anticodon fits the codon, EF-Tu lets go. Then the ribosome links the amino acid.' },
      terms: [
        [{ nl: 'EF-Tu', en: 'EF-Tu' }, { nl: 'Eiwit dat een tRNA met aminozuur naar het ribosoom brengt.', en: 'Protein that brings a tRNA with its amino acid to the ribosome.' }],
        [{ nl: 'codon', en: 'codon' }, { nl: 'Drie letters op het mRNA die voor één aminozuur coderen.', en: 'Three letters on the mRNA that code for one amino acid.' }],
        [{ nl: 'anticodon', en: 'anticodon' }, { nl: 'Drie letters op het tRNA die op het codon passen.', en: 'Three letters on the tRNA that match the codon.' }],
        [{ nl: 'A-plaats', en: 'A site' }, { nl: 'Plek in het ribosoom waar het nieuwe tRNA binnenkomt.', en: 'Spot in the ribosome where the new tRNA enters.' }],
      ],
      steps: {
        0: { tag: ['EF-Tu', 'EF-Tu'], title: { nl: 'EF-Tu brengt een nieuw tRNA', en: 'EF-Tu brings a new tRNA' }, text: { nl: 'Het eiwit EF-Tu brengt een tRNA met een aminozuur naar het ribosoom.', en: 'The protein EF-Tu brings a tRNA with an amino acid to the ribosome.' } },
        2: { tag: ['codon', 'codon'], title: { nl: 'Past het anticodon op het codon?', en: 'Does the anticodon fit the codon?' }, text: { nl: 'Het ribosoom controleert of het anticodon van het tRNA op het codon past. Hier: GAA op UUC.', en: 'The ribosome checks whether the tRNA’s anticodon fits the codon. Here: GAA on UUC.' } },
        5: { tag: ['A-plaats', 'A site'], title: { nl: 'Drie tRNA’s op het ribosoom', en: 'Three tRNAs on the ribosome' }, text: { nl: 'Laat EF-Tu los, dan schuift het nieuwe tRNA helemaal in de A-plaats. Daarna worden de aminozuren gekoppeld.', en: 'Once EF-Tu lets go, the new tRNA slides fully into the A site. Then the amino acids are linked.' } },
      },
    },
  },

  'antibiotica': {
    hobby: {
      kort: { nl: 'Antibiotica zijn medicijnen tegen bacteriën. De meeste werken op één van vier plekken: de celwand, het DNA, het maken van RNA of het maken van eiwit. Onze eigen cellen blijven grotendeels gespaard.', en: 'Antibiotics are medicines against bacteria. Most work on one of four things: the cell wall, the DNA, making RNA or making protein. Our own cells are largely spared.' },
      steps: {
        0: { tag: ['vier doelwitten', 'four targets'], title: { nl: 'Vier plekken waar antibiotica werken', en: 'Four places antibiotics hit' }, text: { nl: 'De meeste antibiotica die bacteriën doden, remmen de celwand, het DNA, het maken van RNA of het maken van eiwit.', en: 'Most antibiotics that kill bacteria block the cell wall, the DNA, making RNA or making protein.' } },
        1: { tag: ['celwand', 'cell wall'], title: { nl: '1 · De celwand', en: '1 · The cell wall' }, text: { nl: 'Penicilline en verwanten verhinderen dat de bacterie haar celwand dichtknoopt. De wand verzwakt en de bacterie barst.', en: 'Penicillin and its relatives stop the bacterium from knitting its cell wall together. The wall weakens and the bacterium bursts.' } },
        4: { tag: ['eiwit', 'protein'], title: { nl: '4 · Het maken van eiwit', en: '4 · Making protein' }, text: { nl: 'Veel antibiotica gaan op het eiwitfabriekje van de bacterie zitten, op het kleine of op het grote deel.', en: 'Many antibiotics sit on the bacterium’s protein factory, on either the small or the large part.' } },
        5: { tag: ['wij gespaard', 'we are spared'], title: { nl: 'Waarom onze cellen gespaard blijven', en: 'Why our cells are spared' }, text: { nl: 'Wij hebben geen celwand zoals bacteriën. En onze eigen machines zijn net iets anders gebouwd.', en: 'We have no cell wall like bacteria. And our own machines are built slightly differently.' } },
      },
    },
    secundair: {
      kort: { nl: 'De meeste bacteriedodende antibiotica remmen de celwand, de DNA-replicatie, de transcriptie of de translatie. Onze cellen blijven grotendeels gespaard: ze hebben geen peptidoglycaan, en hun enzymen en ribosomen zijn anders gebouwd. Bacteriën kunnen wel resistent worden.', en: 'Most bacteria-killing antibiotics block the cell wall, DNA replication, transcription or translation. Our cells are largely spared: they have no peptidoglycan, and their enzymes and ribosomes are built differently. Bacteria can become resistant, though.' },
      terms: [
        [{ nl: 'antibioticum', en: 'antibiotic' }, { nl: 'Medicijn dat bacteriën doodt of hun groei remt.', en: 'Medicine that kills bacteria or slows their growth.' }],
        [{ nl: 'doelwit', en: 'target' }, { nl: 'Het onderdeel van de bacterie waarop een antibioticum inwerkt.', en: 'The part of the bacterium an antibiotic acts on.' }],
        [{ nl: 'peptidoglycaan', en: 'peptidoglycan' }, { nl: 'Stof waaruit de bacteriële celwand bestaat; onze cellen hebben het niet.', en: 'Material of the bacterial cell wall; our cells do not have it.' }],
        [{ nl: 'resistentie', en: 'resistance' }, { nl: 'Een bacterie is ongevoelig geworden voor een antibioticum.', en: 'A bacterium has become insensitive to an antibiotic.' }],
      ],
      steps: {
        0: { tag: ['doelwitten', 'targets'], title: { nl: 'Vier doelwitten van antibiotica', en: 'Four targets of antibiotics' }, text: { nl: 'De meeste antibiotica remmen de celwand, de DNA-replicatie, de transcriptie of de translatie van de bacterie.', en: 'Most antibiotics block the bacterium’s cell wall, DNA replication, transcription or translation.' } },
        1: { tag: ['celwand', 'cell wall'], title: { nl: '1 · De celwand', en: '1 · The cell wall' }, text: { nl: 'Penicilline blokkeert de enzymen die de celwand van peptidoglycaan aan elkaar knopen. De wand verzwakt en de bacterie barst.', en: 'Penicillin blocks the enzymes that link the peptidoglycan cell wall together. The wall weakens and the bacterium bursts.' } },
        4: { tag: ['ribosoom', 'ribosome'], title: { nl: '4 · De translatie', en: '4 · Translation' }, text: { nl: 'Veel antibiotica binden het bacteriële ribosoom: sommige op de kleine subeenheid, andere op de grote.', en: 'Many antibiotics bind the bacterial ribosome: some on the small subunit, others on the large one.' } },
        5: { tag: ['mens gespaard', 'human spared'], title: { nl: 'Waarom onze cellen gespaard blijven', en: 'Why our cells are spared' }, text: { nl: 'Wij hebben geen peptidoglycaan. Ons topoisomerase, RNA-polymerase en ribosoom zijn net anders gebouwd.', en: 'We have no peptidoglycan. Our topoisomerase, RNA polymerase and ribosome are built slightly differently.' } },
      },
    },
  },

  'rifampicine': {
    hobby: {
      kort: { nl: 'Rifampicine is een antibioticum dat de kopieermachine van de bacterie stillegt. Het past in een holte van die machine, zodat elke nieuwe RNA-kopie al na een paar letters vastloopt. Het is een belangrijk medicijn tegen tuberculose.', en: 'Rifampicin is an antibiotic that shuts down the bacterium’s copy machine. It fits into a pocket of that machine, so every new RNA copy gets stuck after a few letters. It is a key medicine against tuberculosis.' },
      steps: {
        0: { tag: ['in de machine', 'in the machine'], title: { nl: 'Een antibioticum in de kopieermachine', en: 'An antibiotic in the copy machine' }, text: { nl: 'Dit is de machine waarmee een bacterie RNA-kopieën maakt, met het antibioticum erin in het rood.', en: 'This is the machine a bacterium uses to make RNA copies, with the antibiotic inside shown in red.' } },
        3: { tag: ['vastgelopen', 'stuck'], title: { nl: 'De nieuwe kopie botst ertegen', en: 'The new copy bumps into it' }, text: { nl: 'Na een paar letters botst de nieuwe RNA-kopie op het antibioticum. Verder groeien lukt niet.', en: 'After a few letters, the new RNA copy bumps into the antibiotic. It cannot grow any further.' } },
        5: { tag: ['wij gespaard', 'we are spared'], title: { nl: 'Waarom onze machine niet geraakt wordt', en: 'Why our machine is not hit' }, text: { nl: 'Bij bacteriën ziet deze holte er bijna altijd hetzelfde uit. In onze eigen machine is ze anders gebouwd.', en: 'In bacteria, this pocket looks almost the same every time. In our own machine, it is built differently.' } },
      },
    },
    secundair: {
      kort: { nl: 'Rifampicine is een antibioticum dat in een holte van het bacteriële RNA-polymerase bindt. Het blokkeert het nieuwe RNA zodra dat enkele nucleotiden lang is, zodat de transcriptie stopt. Ons RNA-polymerase is op die plek anders gebouwd.', en: 'Rifampicin is an antibiotic that binds in a pocket of bacterial RNA polymerase. It blocks the new RNA as soon as it is a few nucleotides long, so transcription stops. Our RNA polymerase is built differently at that spot.' },
      terms: [
        [{ nl: 'rifampicine', en: 'rifampicin' }, { nl: 'Antibioticum dat het bacteriële RNA-polymerase blokkeert.', en: 'Antibiotic that blocks bacterial RNA polymerase.' }],
        [{ nl: 'RNA-polymerase', en: 'RNA polymerase' }, { nl: 'Enzym dat RNA maakt door DNA af te lezen.', en: 'Enzyme that makes RNA by reading DNA.' }],
        [{ nl: 'transcriptie', en: 'transcription' }, { nl: 'Het overschrijven van DNA naar RNA.', en: 'Copying DNA into RNA.' }],
      ],
      steps: {
        0: { tag: ['rifampicine', 'rifampicin'], title: { nl: 'Rifampicine in het RNA-polymerase', en: 'Rifampicin in RNA polymerase' }, text: { nl: 'Dit is het RNA-polymerase van E. coli, met het antibioticum rifampicine erin in het rood.', en: 'This is the RNA polymerase of E. coli, with the antibiotic rifampicin inside shown in red.' } },
        3: { tag: ['RNA botst', 'RNA blocked'], title: { nl: 'Het nieuwe RNA botst ertegen', en: 'The new RNA bumps into it' }, text: { nl: 'Na enkele nucleotiden stoot het nieuwe RNA op rifampicine. Verder groeien lukt niet: de transcriptie stopt.', en: 'After a few nucleotides, the new RNA hits rifampicin. It cannot grow further: transcription stops.' } },
        5: { tag: ['selectief', 'selective'], title: { nl: 'Waarom ons enzym niet geraakt wordt', en: 'Why our enzyme is not hit' }, text: { nl: 'De holte waarin rifampicine past, ziet er bij bacteriën bijna altijd hetzelfde uit. In ons RNA-polymerase is ze anders gebouwd.', en: 'The pocket where rifampicin fits looks almost the same in all bacteria. In our RNA polymerase, it is built differently.' } },
      },
    },
  },

  'ribosoomremmers': {
    hobby: {
      kort: { nl: 'Veel antibiotica leggen het eiwitfabriekje van de bacterie stil. Elk zit op een andere plek in dat fabriekje. Ons eigen fabriekje verschilt net op die plekken, en mede daardoor werken ze bij ons niet.', en: 'Many antibiotics shut down the bacterium’s protein factory. Each one sits at a different spot in that factory. Our own factory differs at exactly those spots, which is partly why they do not work on us.' },
      steps: {
        0: { tag: ['doelwit', 'target'], title: { nl: 'Het eiwitfabriekje als doelwit', en: 'The protein factory as a target' }, text: { nl: 'Veel antibiotica remmen het fabriekje waarmee de bacterie eiwitten bouwt.', en: 'Many antibiotics block the factory the bacterium uses to build proteins.' } },
        1: { tag: ['plek bezet', 'spot taken'], title: { nl: 'Eén middel houdt de landingsplek bezet', en: 'One drug blocks the landing spot' }, text: { nl: 'Tetracycline zit op het kleine deel, waar de volgende bouwsteen moet landen. Die kan er niet meer in.', en: 'Tetracycline sits on the small part, where the next building block should land. It can no longer get in.' } },
        5: { tag: ['ons fabriekje', 'our factory'], title: { nl: 'Waarom ons fabriekje gespaard blijft', en: 'Why our factory is spared' }, text: { nl: 'Op de plek waar sommige van die middelen binden, heeft ons fabriekje een andere letter. Mede daardoor werken ze bij ons niet.', en: 'Where some of these drugs bind, our factory has a different letter. That is partly why they do not work on us.' } },
      },
    },
    secundair: {
      kort: { nl: 'Het bacteriële ribosoom is het doelwit van veel antibiotica. Elk bindt op een andere plek: de A-plaats waar het tRNA landt, de plek waar het codon gecontroleerd wordt, of de tunnel waar de nieuwe keten naar buiten gaat. Ons ribosoom verschilt net op die plekken.', en: 'The bacterial ribosome is the target of many antibiotics. Each binds at a different spot: the A site where the tRNA lands, the spot where the codon is checked, or the tunnel where the new chain leaves. Our ribosome differs at exactly those spots.' },
      terms: [
        [{ nl: 'A-plaats', en: 'A site' }, { nl: 'Plek in het ribosoom waar het nieuwe tRNA landt.', en: 'Spot in the ribosome where the new tRNA lands.' }],
        [{ nl: 'tetracycline', en: 'tetracycline' }, { nl: 'Antibioticum dat de A-plaats van de kleine subeenheid bezet houdt.', en: 'Antibiotic that blocks the A site of the small subunit.' }],
        [{ nl: 'uitgangstunnel', en: 'exit tunnel' }, { nl: 'Tunnel in de grote subeenheid waarlangs de nieuwe eiwitketen naar buiten gaat.', en: 'Tunnel in the large subunit through which the new protein chain leaves.' }],
        [{ nl: 'rRNA', en: 'rRNA' }, { nl: 'Het RNA waaruit het ribosoom grotendeels bestaat; sommige antibiotica binden erop.', en: 'The RNA the ribosome is mostly made of; some antibiotics bind to it.' }],
      ],
      steps: {
        0: { tag: ['ribosoom', 'ribosome'], title: { nl: 'Het ribosoom: een topdoelwit', en: 'The ribosome: a top target' }, text: { nl: 'Veel antibiotica remmen het bacteriële ribosoom en dus de translatie.', en: 'Many antibiotics block the bacterial ribosome and so stop translation.' } },
        1: { tag: ['tetracycline', 'tetracycline'], title: { nl: 'Tetracycline houdt de A-plaats bezet', en: 'Tetracycline blocks the A site' }, text: { nl: 'Tetracycline bindt op de kleine subeenheid, waar het nieuwe tRNA moet landen. Dat tRNA kan er niet meer in.', en: 'Tetracycline binds the small subunit, where the new tRNA should land. That tRNA can no longer get in.' } },
        5: { tag: ['ons ribosoom', 'our ribosome'], title: { nl: 'Waarom ons ribosoom gespaard blijft', en: 'Why our ribosome is spared' }, text: { nl: 'Op de bindingsplek van sommige antibiotica heeft ons rRNA een G in plaats van een A. Mede daardoor werken ze bij ons niet.', en: 'Where some antibiotics bind, our rRNA has a G instead of an A. That is partly why they do not work on us.' } },
      },
    },
  },

  'gyraseremmers': {
    hobby: {
      kort: { nl: 'Een bacterie heeft een handig eiwit dat haar DNA doorknipt, er een ander stuk doorheen haalt en het weer dichtplakt. Sommige antibiotica zetten dat eiwit vast terwijl het DNA open is. Zo valt het DNA van de bacterie in stukken.', en: 'A bacterium has a handy protein that cuts its DNA, passes another piece through and seals it again. Some antibiotics lock that protein in place while the DNA is open. Then the bacterium’s DNA falls apart.' },
      steps: {
        0: { tag: ['knippen en plakken', 'cut and paste'], title: { nl: 'Knippen, doorhalen, plakken', en: 'Cut, pass through, seal' }, text: { nl: 'Een eiwit knipt de dubbele DNA-draad door, haalt er een ander stuk DNA door en plakt de breuk weer dicht.', en: 'A protein cuts through the double DNA strand, passes another piece of DNA through and seals the break again.' } },
        1: { tag: ['medicijn', 'medicine'], title: { nl: 'Het medicijn grijpt in tijdens het knippen', en: 'The drug steps in during cutting' }, text: { nl: 'Het antibioticum gaat op het eiwit zitten terwijl het DNA open is. Dichtplakken lukt dan niet meer.', en: 'The antibiotic sits on the protein while the DNA is open. Sealing it is then no longer possible.' } },
        3: { tag: ['in stukken', 'in pieces'], title: { nl: 'Het DNA valt in stukken', en: 'The DNA falls to pieces' }, text: { nl: 'Zo wordt een nuttig eiwit een gif voor de bacterie: haar DNA valt in stukken.', en: 'This turns a useful protein into a poison for the bacterium: its DNA falls to pieces.' } },
      },
    },
    secundair: {
      kort: { nl: 'Het enzym gyrase knipt het DNA, haalt er een ander stuk doorheen en plakt het weer dicht. Fluorochinolonen zoals ciprofloxacine zetten gyrase vast terwijl het DNA open is. Zo knippen ze het chromosoom in stukken.', en: 'The enzyme gyrase cuts the DNA, passes another piece through and seals it again. Fluoroquinolones such as ciprofloxacin lock gyrase while the DNA is open. That way they break the chromosome into pieces.' },
      terms: [
        [{ nl: 'gyrase', en: 'gyrase' }, { nl: 'Enzym dat DNA knipt, een ander stuk doorhaalt en weer dichtplakt.', en: 'Enzyme that cuts DNA, passes another piece through and seals it again.' }],
        [{ nl: 'fluorochinolon', en: 'fluoroquinolone' }, { nl: 'Antibioticum dat gyrase vastzet op het geknipte DNA.', en: 'Antibiotic that locks gyrase onto the cut DNA.' }],
        [{ nl: 'dubbelstrengsbreuk', en: 'double-strand break' }, { nl: 'Breuk door beide strengen van het DNA.', en: 'Break through both strands of the DNA.' }],
      ],
      steps: {
        0: { tag: ['gyrase', 'gyrase'], title: { nl: 'Gyrase knipt, haalt door en plakt', en: 'Gyrase cuts, passes through and seals' }, text: { nl: 'Gyrase knipt beide DNA-strengen, haalt een ander stuk DNA door de opening en plakt de breuk weer dicht.', en: 'Gyrase cuts both DNA strands, passes another piece of DNA through the gap and seals the break again.' } },
        1: { tag: ['fluorochinolon', 'fluoroquinolone'], title: { nl: 'Ciprofloxacine grijpt in tijdens het knippen', en: 'Ciprofloxacin steps in during cutting' }, text: { nl: 'Ciprofloxacine, een fluorochinolon, bindt gyrase terwijl het DNA open is. Dichtplakken lukt dan niet meer.', en: 'Ciprofloxacin, a fluoroquinolone, binds gyrase while the DNA is open. Sealing is then no longer possible.' } },
        3: { tag: ['DNA-breuken', 'DNA breaks'], title: { nl: 'Het chromosoom valt in stukken', en: 'The chromosome falls to pieces' }, text: { nl: 'Zo maakt het medicijn van gyrase een gif: er ontstaan blijvende dubbelstrengsbreuken en het chromosoom valt in stukken.', en: 'This way the drug turns gyrase into a poison: lasting double-strand breaks form and the chromosome falls apart.' } },
      },
    },
  },

  'resistentie': {
    hobby: {
      kort: { nl: 'Soms helpt een antibioticum niet meer: de bacterie is er ongevoelig voor geworden. Dat kan door een verandering in haar eigen DNA, of doordat ze een beschermend gen van een andere bacterie overneemt.', en: 'Sometimes an antibiotic stops working: the bacterium has become resistant to it. This can happen through a change in its own DNA, or by taking over a protective gene from another bacterium.' },
      steps: {
        0: { tag: ['twee wegen', 'two ways'], title: { nl: 'Twee wegen naar ongevoeligheid', en: 'Two ways to resist' }, text: { nl: 'Een bacterie wordt ongevoelig door een verandering in haar eigen DNA, of door een beschermend gen van een andere bacterie over te nemen.', en: 'A bacterium becomes resistant through a change in its own DNA, or by taking over a protective gene from another bacterium.' } },
        1: { tag: ['andere vorm', 'new shape'], title: { nl: '1 · Het doelwit verandert', en: '1 · The target changes' }, text: { nl: 'Door een verandering in het DNA krijgt de plek waar het antibioticum past een andere vorm. Het past er niet meer goed op.', en: 'A change in the DNA gives the spot where the antibiotic fits a different shape. It no longer fits well.' } },
        2: { tag: ['kapotmaken', 'breaking it'], title: { nl: '2 · Het antibioticum kapotmaken', en: '2 · Breaking the antibiotic' }, text: { nl: 'De bacterie maakt een eiwit dat het antibioticum openknipt voor het zijn werk kan doen.', en: 'The bacterium makes a protein that cuts the antibiotic open before it can do its job.' } },
        5: { tag: ['doorgeven', 'passing on'], title: { nl: 'Bescherming springt over naar een buur', en: 'Protection jumps to a neighbour' }, text: { nl: 'Zulke beschermende genen zitten vaak op kleine extra DNA-ringen. Die gaan van de ene bacterie naar de andere.', en: 'Such protective genes often sit on small extra DNA rings. These pass from one bacterium to another.' } },
      },
    },
    secundair: {
      kort: { nl: 'Bacteriën worden resistent door een mutatie of door een resistentiegen van een andere bacterie over te nemen, vaak op een plasmide. Dan verandert het doelwit, breken enzymen het antibioticum af, laten ze minder binnen of pompen ze het naar buiten.', en: 'Bacteria become resistant through a mutation or by taking over a resistance gene from another bacterium, often on a plasmid. Then the target changes, enzymes break down the antibiotic, less gets in or pumps push it back out.' },
      terms: [
        [{ nl: 'resistentie', en: 'resistance' }, { nl: 'Een bacterie is ongevoelig geworden voor een antibioticum.', en: 'A bacterium has become insensitive to an antibiotic.' }],
        [{ nl: 'mutatie', en: 'mutation' }, { nl: 'Een verandering in het DNA.', en: 'A change in the DNA.' }],
        [{ nl: 'β-lactamase', en: 'β-lactamase' }, { nl: 'Enzym dat antibiotica zoals ampicilline openknipt.', en: 'Enzyme that cuts open antibiotics such as ampicillin.' }],
        [{ nl: 'conjugatie', en: 'conjugation' }, { nl: 'Het doorgeven van een plasmide aan een andere bacterie via direct contact.', en: 'Passing a plasmid to another bacterium through direct contact.' }],
      ],
      steps: {
        0: { tag: ['resistentie', 'resistance'], title: { nl: 'Twee wegen naar resistentie', en: 'Two ways to resistance' }, text: { nl: 'Een bacterie wordt resistent door een mutatie in haar eigen DNA, of door een resistentiegen over te nemen.', en: 'A bacterium becomes resistant through a mutation in its own DNA, or by taking over a resistance gene.' } },
        1: { tag: ['mutatie', 'mutation'], title: { nl: '1 · Het doelwit verandert', en: '1 · The target changes' }, text: { nl: 'Door een mutatie krijgt de bindingsplek van het antibioticum een andere vorm. Het past er niet meer goed op.', en: 'A mutation changes the shape of the antibiotic’s binding site. It no longer fits well.' } },
        2: { tag: ['afbraak', 'breakdown'], title: { nl: '2 · Het antibioticum afbreken', en: '2 · Breaking down the antibiotic' }, text: { nl: 'Enzymen zoals β-lactamase knippen het antibioticum open voor het kan werken.', en: 'Enzymes such as β-lactamase cut the antibiotic open before it can work.' } },
        5: { tag: ['conjugatie', 'conjugation'], title: { nl: 'Resistentie springt over via plasmiden', en: 'Resistance jumps across on plasmids' }, text: { nl: 'Resistentiegenen zitten vaak op plasmiden. Via conjugatie gaan ze van de ene bacterie naar de andere.', en: 'Resistance genes often sit on plasmids. Through conjugation they pass from one bacterium to another.' } },
      },
    },
  },
};
