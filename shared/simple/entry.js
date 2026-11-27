/* Eenvoudige teksten voor de niveaus hobbyist en secundair (groep entry). Sleutels van steps = stapnummer in de animatie. */
export default {
  'cel': {
    hobby: {
      kort: { nl: 'Dit is een cel van een mens: hier speelt het hele verhaal zich af. In de celkern ligt het DNA, het bouwplan. Daarbuiten bouwen kleine fabriekjes eiwitten volgens kopieën van dat plan.', en: 'This is a human cell: the whole story happens here. The nucleus holds the DNA, the building plan. Outside it, tiny factories build proteins from copies of that plan.' },
      steps: {
        0: { tag: ['cel', 'cell'], title: { nl: 'Een cel van een mens', en: 'A human cell' }, text: { nl: 'Kies een weg: een virus of vaccin komt binnen, of een signaal zet een gen aan. Klik om in te zoomen.', en: 'Pick a path: a virus or vaccine gets in, or a signal switches a gene on. Click to zoom in.' } },
      },
    },
    secundair: {
      kort: { nl: 'Dit is een menselijke cel. In de celkern ligt het DNA; daar wordt van een gen een kopie gemaakt, het mRNA. Ribosomen buiten de kern lezen dat mRNA en bouwen er eiwitten mee.', en: 'This is a human cell. The nucleus holds the DNA; there a copy of a gene is made, the mRNA. Ribosomes outside the nucleus read that mRNA and use it to build proteins.' },
      terms: [
        [{ nl: 'celkern', en: 'nucleus' }, { nl: 'Deel van de cel waar het meeste DNA ligt, afgeschermd door een dubbel membraan.', en: 'Part of the cell that holds most of the DNA, shielded by a double membrane.' }],
        [{ nl: 'mRNA', en: 'mRNA' }, { nl: 'Kopie van een gen die de kern verlaat en het recept voor een eiwit draagt.', en: 'Copy of a gene that leaves the nucleus and carries the recipe for a protein.' }],
        [{ nl: 'ribosoom', en: 'ribosome' }, { nl: 'Deeltje dat mRNA leest en er een eiwit mee bouwt.', en: 'Particle that reads mRNA and uses it to build a protein.' }],
      ],
      steps: {
        0: { tag: ['cel', 'cell'], title: { nl: 'Een menselijke cel', en: 'A human cell' }, text: { nl: 'Kies een route: een virus of mRNA-vaccin komt binnen, of een signaalmolecule zet een gen aan. Klik om in te zoomen.', en: 'Choose a route: a virus or mRNA vaccine enters, or a signalling molecule switches a gene on. Click to zoom in.' } },
      },
    },
  },
  'virus': {
    hobby: {
      kort: { nl: 'Een virus is een pakketje erfelijk materiaal in een jasje van eiwit. Het kan zichzelf niet vermenigvuldigen: het moet zijn genen in een cel krijgen en die cel voor zich laten werken.', en: 'A virus is a little package of genetic material in a coat of protein. It cannot multiply on its own: it has to get its genes into a cell and make that cell work for it.' },
      steps: {
        0: { tag: ['eiwitjas', 'protein coat'], title: { nl: 'Een virus heeft een cel nodig', en: 'A virus needs a cell' }, text: { nl: 'Een virus is erfelijk materiaal in een jasje van eiwit. Zonder cel kan het zich niet vermenigvuldigen.', en: 'A virus is genetic material in a coat of protein. Without a cell it cannot multiply.' } },
        1: { tag: ['vasthaken', 'attaching'], title: { nl: 'Het virus haakt vast aan de cel', en: 'The virus hooks onto the cell' }, text: { nl: 'Het virus haakt vast aan een bepaald eiwit of suiker op de cel, zoals een sleutel in een slot. Dat slot bepaalt welke cellen besmet raken.', en: 'The virus hooks onto a certain protein or sugar on the cell, like a key in a lock. That lock decides which cells get infected.' } },
        2: { tag: ['opslokken', 'swallowing'], title: { nl: 'Route A: de cel slokt het virus op', en: 'Route A: the cell swallows the virus' }, text: { nl: 'De cel slokt het virus op in een blaasje. Daarna moet het virus nog uit dat blaasje ontsnappen.', en: 'The cell swallows the virus inside a little bubble. Then the virus still has to escape from that bubble.' } },
        6: { tag: ['vrijkomen', 'release'], title: { nl: 'Nieuwe virussen komen vrij', en: 'New viruses get out' }, text: { nl: 'De cel bouwt nieuwe virussen. Die komen vrij als de cel openbarst, of ze knijpen zich af uit de rand van de cel.', en: 'The cell builds new viruses. They get out when the cell bursts open, or they pinch off from the edge of the cell.' } },
      },
    },
    secundair: {
      kort: { nl: 'Een virus is een genoom in een eiwitmantel, de capside. Het hecht aan een receptor op de cel en komt binnen via endocytose of membraanfusie. Daarna laat het de cel nieuwe virussen maken.', en: 'A virus is a genome inside a protein shell, the capsid. It binds a receptor on the cell and enters by endocytosis or membrane fusion. Then it makes the cell build new viruses.' },
      terms: [
        [{ nl: 'capside', en: 'capsid' }, { nl: 'Eiwitmantel rond het erfelijk materiaal van een virus.', en: 'Protein shell around the genetic material of a virus.' }],
        [{ nl: 'receptor', en: 'receptor' }, { nl: 'Eiwit of suiker op de cel waaraan het virus hecht; bepaalt welke cellen besmet raken.', en: 'Protein or sugar on the cell that the virus binds; it decides which cells get infected.' }],
        [{ nl: 'endocytose', en: 'endocytosis' }, { nl: 'De cel slokt iets op in een blaasje van haar eigen membraan.', en: 'The cell takes something in, inside a vesicle made from its own membrane.' }],
      ],
      steps: {
        0: { tag: ['capside', 'capsid'], title: { nl: 'Een virus heeft een cel nodig', en: 'A virus needs a cell' }, text: { nl: 'Een virus is erfelijk materiaal in een eiwitmantel, de capside. Het heeft een cel nodig om zich te vermenigvuldigen.', en: 'A virus is genetic material inside a protein shell, the capsid. It needs a cell to multiply.' } },
        1: { tag: ['receptor', 'receptor'], title: { nl: 'Het virus hecht aan een receptor', en: 'The virus binds a receptor' }, text: { nl: 'Het virus bindt een bepaald eiwit of suiker op de cel: de receptor. Die bepaalt welke cellen besmet raken.', en: 'The virus binds a certain protein or sugar on the cell: the receptor. It decides which cells get infected.' } },
        2: { tag: ['endocytose', 'endocytosis'], title: { nl: 'Route A: endocytose', en: 'Route A: endocytosis' }, text: { nl: 'Bij endocytose slokt de cel het virus op in een blaasje. Daarna moet het virus nog uit dat blaasje ontsnappen.', en: 'In endocytosis the cell takes the virus in, inside a vesicle. The virus then still has to escape from that vesicle.' } },
        6: { tag: ['vrijkomen', 'release'], title: { nl: 'Nieuwe virussen komen vrij', en: 'New viruses are released' }, text: { nl: 'De cel bouwt nieuwe virussen. Die komen vrij doordat de cel openbarst, of ze knoppen af uit het celmembraan.', en: 'The cell builds new viruses. They are released when the cell bursts, or they bud off from the cell membrane.' } },
      },
    },
  },
  'adeno': {
    hobby: {
      kort: { nl: 'Het adenovirus kan onder meer luchtweginfecties veroorzaken en draagt DNA. Het komt de cel binnen en brengt zijn DNA tot in de celkern. Daar leest de cel de virusgenen alsof het haar eigen genen zijn; daarom gebruikt men het ook in vaccins.', en: 'The adenovirus can cause things like airway infections, and it carries DNA. It gets into the cell and brings its DNA all the way into the nucleus. There the cell reads the virus genes as if they were its own, which is why it is also used in vaccines.' },
      steps: {
        0: { tag: ['eiwitjas', 'protein coat'], title: { nl: 'Het adenovirus van dichtbij', en: 'The adenovirus up close' }, text: { nl: 'Het virus zit in een jasje van eiwit met twintig vlakken. Op de hoeken steekt een sprietje met een knop uit.', en: 'The virus sits in a protein coat with twenty flat sides. From the corners stick out little stalks with a knob.' } },
        1: { tag: ['DNA binnenin', 'DNA inside'], title: { nl: 'Binnenin zit DNA', en: 'Inside is DNA' }, text: { nl: 'Binnenin zit één lange draad DNA, ingepakt met eiwit van het virus.', en: 'Inside is one long thread of DNA, packed with protein from the virus.' } },
        2: { tag: ['vasthaken', 'docking'], title: { nl: 'De knop haakt aan de cel', en: 'The knob hooks onto the cell' }, text: { nl: 'De knop haakt vast aan een eiwit op de cel. Dat houdt het virus vast, maar trekt het nog niet naar binnen.', en: 'The knob hooks onto a protein on the cell. That holds the virus, but does not pull it inside yet.' } },
        7: { tag: ['kern in', 'into nucleus'], title: { nl: 'Het DNA gaat de celkern in', en: 'The DNA enters the nucleus' }, text: { nl: 'Aan een poortje in de celkern breekt het jasje open. Het DNA glipt naar binnen en de cel leest het daar af.', en: 'At a small gate in the nucleus the coat breaks open. The DNA slips inside, where the cell reads it.' } },
      },
    },
    secundair: {
      kort: { nl: 'Het adenovirus is een DNA-virus met een capside. Het komt de cel binnen in een blaasje, ontsnapt en levert zijn DNA af aan een kernporie. In de kern schrijft de cel de virale genen af zoals haar eigen genen.', en: 'The adenovirus is a DNA virus with a capsid. It enters the cell in a vesicle, escapes and delivers its DNA at a nuclear pore. In the nucleus the cell transcribes the viral genes like its own.' },
      terms: [
        [{ nl: 'capside', en: 'capsid' }, { nl: 'Eiwitmantel rond het erfelijk materiaal van een virus.', en: 'Protein shell around the genetic material of a virus.' }],
        [{ nl: 'dubbelstrengig DNA', en: 'double-stranded DNA' }, { nl: 'DNA met twee strengen, zoals ons eigen DNA.', en: 'DNA with two strands, like our own DNA.' }],
        [{ nl: 'receptor', en: 'receptor' }, { nl: 'Eiwit op de cel waaraan het virus bindt.', en: 'Protein on the cell that the virus binds.' }],
        [{ nl: 'kernporie', en: 'nuclear pore' }, { nl: 'Poort in het membraan rond de kern, waardoor stoffen de kern in en uit gaan.', en: 'Gate in the membrane around the nucleus that lets things in and out.' }],
      ],
      steps: {
        0: { tag: ['capside', 'capsid'], title: { nl: 'Het adenovirus van dichtbij', en: 'The adenovirus up close' }, text: { nl: 'De capside is een eiwitmantel in de vorm van een veelvlak. Op de hoeken steekt een vezel met een knop uit.', en: 'The capsid is a protein shell shaped like a polyhedron. From its corners stick out fibres with a knob.' } },
        1: { tag: ['DNA-genoom', 'DNA genome'], title: { nl: 'Binnenin zit dubbelstrengig DNA', en: 'Inside is double-stranded DNA' }, text: { nl: 'Het genoom is één lange DNA-dubbelstreng, ingepakt met een viraal eiwit.', en: 'The genome is one long DNA double strand, packed with a viral protein.' } },
        2: { tag: ['receptor', 'receptor'], title: { nl: 'De knop bindt een receptor', en: 'The knob binds a receptor' }, text: { nl: 'De knop bindt een receptor op de cel. Die houdt het virus vast, maar trekt het nog niet naar binnen.', en: 'The knob binds a receptor on the cell. It holds the virus, but does not pull it inside yet.' } },
        7: { tag: ['kernporie', 'nuclear pore'], title: { nl: 'Via een kernporie de kern in', en: 'Into the nucleus through a pore' }, text: { nl: 'Aan een kernporie breekt de capside open. Het virale DNA gaat de kern in en wordt daar afgelezen.', en: 'At a nuclear pore the capsid breaks open. The viral DNA enters the nucleus and is read there.' } },
      },
    },
  },
  'lnp': {
    hobby: {
      kort: { nl: 'Een mRNA-vaccin is een piepklein vetbolletje met mRNA erin, een RNA-boodschap met het bouwplan voor één eiwit. De cel maakt dat eiwit, zodat het afweersysteem het leert herkennen. De boodschap komt niet in de celkern en is na enkele dagen afgebroken.', en: 'An mRNA vaccine is a tiny fat bubble with mRNA inside, an RNA message with the plan for one protein. The cell makes that protein, so the immune system learns to recognise it. The message never enters the nucleus and is broken down within days.' },
      steps: {
        0: { tag: ['vetbolletje', 'fat bubble'], title: { nl: 'Een bolletje van vetachtige stoffen', en: 'A bubble of fatty stuff' }, text: { nl: 'Het vaccin is een piepklein bolletje van vier soorten vetachtige stoffen. Eén ervan houdt de RNA-boodschap vast.', en: 'The vaccine is a tiny bubble made of four kinds of fatty stuff. One of them holds on to the RNA message.' } },
        1: { tag: ['aangepast RNA', 'tweaked RNA'], title: { nl: 'Binnenin: een aangepaste boodschap', en: 'Inside: a tweaked message' }, text: { nl: 'Eén van de letters van het RNA is overal vervangen door een variant. Zo slaat het afweersysteem minder alarm.', en: 'One of the letters of the RNA has been swapped everywhere for a variant. That way the immune system raises less alarm.' } },
        2: { tag: ['opslokken', 'swallowing'], title: { nl: 'De cel slokt het bolletje op', en: 'The cell swallows the bubble' }, text: { nl: 'Het bolletje komt eerst in een blaasje in de cel terecht, nog niet vrij in de cel.', en: 'The bubble first ends up inside a little pouch in the cell, not yet loose in the cell.' } },
        5: { tag: ['eiwit maken', 'making protein'], title: { nl: 'De cel maakt het vaccin-eiwit', en: 'The cell makes the vaccine protein' }, text: { nl: 'Fabriekjes in de cel lezen de boodschap en maken het eiwit. Dat gaat naar de buitenkant van de cel, waar het afweersysteem het leert kennen.', en: 'Little factories in the cell read the message and make the protein. It moves to the outside of the cell, where the immune system learns it.' } },
      },
    },
    secundair: {
      kort: { nl: 'Een mRNA-vaccin is mRNA verpakt in een lipidenanodeeltje. Na endocytose ontsnapt een klein deel van het mRNA uit het endosoom. Ribosomen vertalen het tot een eiwit dat het afweersysteem leert herkennen; het mRNA komt niet in de kern.', en: 'An mRNA vaccine is mRNA packed in a lipid nanoparticle. After endocytosis a small part of the mRNA escapes from the endosome. Ribosomes translate it into a protein the immune system learns to recognise; the mRNA never enters the nucleus.' },
      terms: [
        [{ nl: 'lipidenanodeeltje', en: 'lipid nanoparticle' }, { nl: 'Piepklein bolletje van lipiden dat het mRNA beschermt en de cel in brengt.', en: 'Tiny particle of lipids that protects the mRNA and carries it into the cell.' }],
        [{ nl: 'mRNA', en: 'mRNA' }, { nl: 'RNA-kopie met het recept voor een eiwit, gelezen door ribosomen.', en: 'RNA copy with the recipe for a protein, read by ribosomes.' }],
        [{ nl: 'endosoom', en: 'endosome' }, { nl: 'Blaasje in de cel waarin opgenomen deeltjes eerst terechtkomen.', en: 'Vesicle in the cell where particles that were taken in end up first.' }],
        [{ nl: 'antigeen', en: 'antigen' }, { nl: 'Stof, hier het vaccin-eiwit, die het afweersysteem leert herkennen.', en: 'Substance, here the vaccine protein, that the immune system learns to recognise.' }],
      ],
      steps: {
        0: { tag: ['lipiden', 'lipids'], title: { nl: 'Een lipidenanodeeltje', en: 'A lipid nanoparticle' }, text: { nl: 'Het vaccin is een bolletje van vier soorten lipiden. Eén ervan houdt het mRNA vast.', en: 'The vaccine is a particle of four kinds of lipids. One of them holds on to the mRNA.' } },
        1: { tag: ['aangepast mRNA', 'modified mRNA'], title: { nl: 'Binnenin: aangepast mRNA', en: 'Inside: modified mRNA' }, text: { nl: 'Elke U in het mRNA is vervangen door een variant. Daardoor alarmeert het mRNA het afweersysteem minder.', en: 'Every U in the mRNA has been replaced by a variant. As a result the mRNA alarms the immune system less.' } },
        2: { tag: ['endocytose', 'endocytosis'], title: { nl: 'Opname door endocytose', en: 'Uptake by endocytosis' }, text: { nl: 'De cel neemt het deeltje op door endocytose. Het komt eerst in een blaasje, het endosoom, en niet meteen in het cytosol.', en: 'The cell takes the particle in by endocytosis. It first lands in a vesicle, the endosome, not straight in the cytosol.' } },
        5: { tag: ['translatie', 'translation'], title: { nl: 'Ribosomen maken het vaccin-eiwit', en: 'Ribosomes make the vaccine protein' }, text: { nl: 'Het mRNA ontsnapt uit het endosoom. Ribosomen op het ruw ER vertalen het tot het vaccin-eiwit. Dat gaat naar het celoppervlak, waar het afweersysteem het leert herkennen.', en: 'The mRNA escapes from the endosome. Ribosomes on the rough ER translate it into the vaccine protein. It goes to the cell surface, where the immune system learns to recognise it.' } },
      },
    },
  },
  'endocytose': {
    hobby: {
      kort: { nl: 'Zo slokt een cel iets van buiten op: haar rand stulpt naar binnen en knijpt een blaasje af. Wat niet uit dat blaasje ontsnapt, wordt vaak afgebroken. Voor virussen en vaccins is ontsnappen dus een grote hindernis.', en: 'This is how a cell swallows something from outside: its edge folds inward and pinches off a little bubble. What does not escape from that bubble is often broken down. So for viruses and vaccines, escaping is a big hurdle.' },
      steps: {
        0: { tag: ['verzamelen', 'gathering'], title: { nl: 'De cel verzamelt vracht', en: 'The cell gathers cargo' }, text: { nl: 'Hulpeiwitten brengen vracht van buiten samen op één klein plekje van de celrand.', en: 'Helper proteins gather cargo from outside on one small spot of the cell edge.' } },
        1: { tag: ['instulpen', 'folding in'], title: { nl: 'De rand stulpt naar binnen', en: 'The edge folds inward' }, text: { nl: 'Eiwitten vormen een gebogen mandje. Daardoor stulpt de celrand naar binnen.', en: 'Proteins form a curved little basket. That makes the cell edge fold inward.' } },
        2: { tag: ['loskomen', 'pinching off'], title: { nl: 'Het blaasje komt los', en: 'The bubble comes loose' }, text: { nl: 'Een ander eiwit draait als een spiraal om de hals en knijpt die dicht. Het blaasje komt los.', en: 'Another protein winds like a spiral around the neck and squeezes it shut. The bubble comes loose.' } },
        8: { tag: ['twee wegen', 'two paths'], title: { nl: 'Twee wegen na de ontsnapping', en: 'Two paths after the escape' }, text: { nl: 'Het virus reist verder naar de celkern. De RNA-boodschap van het vaccin wordt meteen gelezen door de eiwitfabriekjes.', en: 'The virus travels on to the nucleus. The RNA message of the vaccine is read straight away by the protein factories.' } },
      },
    },
    secundair: {
      kort: { nl: 'Bij endocytose stulpt het celmembraan in en snoert het af tot een blaasje. Dat wordt een endosoom dat steeds zuurder wordt. Virussen en mRNA-vaccins moeten eruit ontsnappen, anders worden ze vaak afgebroken in het lysosoom.', en: 'In endocytosis the cell membrane folds in and pinches off into a vesicle. This becomes an endosome that gets more and more acidic. Viruses and mRNA vaccines must escape from it, or they are often broken down in the lysosome.' },
      terms: [
        [{ nl: 'endocytose', en: 'endocytosis' }, { nl: 'Opname van iets van buiten doordat het membraan instulpt en een blaasje afsnoert.', en: 'Taking something in from outside as the membrane folds in and pinches off a vesicle.' }],
        [{ nl: 'klathrine', en: 'clathrin' }, { nl: 'Eiwit dat een gebogen mandje vormt en zo het membraan doet instulpen.', en: 'Protein that forms a curved basket and so makes the membrane fold in.' }],
        [{ nl: 'dynamine', en: 'dynamin' }, { nl: 'Eiwit dat de hals van het blaasje dichtknijpt.', en: 'Protein that squeezes the neck of the vesicle shut.' }],
        [{ nl: 'endosoom', en: 'endosome' }, { nl: 'Blaasje na de opname, dat steeds zuurder wordt.', en: 'Vesicle after uptake that becomes more and more acidic.' }],
        [{ nl: 'lysosoom', en: 'lysosome' }, { nl: 'Afvalverwerking van de cel, waar opgenomen materiaal wordt afgebroken.', en: 'The waste disposal of the cell, where material taken in is broken down.' }],
      ],
      steps: {
        0: { tag: ['receptoren', 'receptors'], title: { nl: 'Receptoren verzamelen vracht', en: 'Receptors gather cargo' }, text: { nl: 'Helper-eiwitten brengen receptoren met hun vracht samen op één klein stukje membraan.', en: 'Helper proteins bring receptors with their cargo together on one small patch of membrane.' } },
        1: { tag: ['klathrine', 'clathrin'], title: { nl: 'Klathrine buigt het membraan', en: 'Clathrin bends the membrane' }, text: { nl: 'Het eiwit klathrine vormt een gebogen mandje. Daardoor stulpt het membraan naar binnen.', en: 'The protein clathrin forms a curved basket. That makes the membrane fold inward.' } },
        2: { tag: ['dynamine', 'dynamin'], title: { nl: 'Dynamine knijpt het blaasje af', en: 'Dynamin pinches off the vesicle' }, text: { nl: 'Dynamine draait als een spiraal om de hals en knijpt die dicht. Het blaasje komt los.', en: 'Dynamin winds like a spiral around the neck and squeezes it shut. The vesicle comes loose.' } },
        8: { tag: ['twee wegen', 'two paths'], title: { nl: 'Ontsnappen of afgebroken worden', en: 'Escape or be broken down' }, text: { nl: 'Wat uit het blaasje ontsnapt, gaat verder: het virus reist naar de kern, vrij mRNA wordt meteen door ribosomen gelezen. Wat niet ontsnapt, wordt in het lysosoom afgebroken.', en: 'Whatever escapes from the vesicle moves on: the virus travels to the nucleus, free mRNA is read by ribosomes straight away. Whatever does not escape is broken down in the lysosome.' } },
      },
    },
  },
  'baltimore': {
    hobby: {
      kort: { nl: 'De eiwitfabriekjes van de cel lezen maar één soort boodschap: een RNA-boodschap. Elk virus moet zijn erfelijk materiaal dus eerst in die vorm krijgen. Wetenschappers delen virussen in volgens de weg die ze daarvoor volgen.', en: 'The protein factories of the cell read only one kind of message: an RNA message. So every virus first has to turn its genetic material into that form. Scientists sort viruses by the path they take to get there.' },
      steps: {
        0: { tag: ['naar boodschap', 'to the message'], title: { nl: 'Alle wegen leiden naar één boodschap', en: 'All roads lead to one message' }, text: { nl: 'De eiwitfabriekjes lezen alleen een RNA-boodschap. Daarom delen we virussen in volgens hoe hun erfelijk materiaal die boodschap wordt.', en: 'The protein factories only read an RNA message. So we sort viruses by how their genetic material becomes that message.' } },
        1: { tag: ['klasse I', 'class I'], title: { nl: 'Klasse I: DNA met twee strengen', en: 'Class I: DNA with two strands' }, text: { nl: 'DNA met twee strengen, net als het onze. De cel maakt er meestal in de celkern een boodschap van, zoals bij het adenovirus.', en: 'DNA with two strands, just like ours. The cell usually turns it into a message inside the nucleus, as with the adenovirus.' } },
        4: { tag: ['klasse IV', 'class IV'], title: { nl: 'Klasse IV: RNA dat meteen leesbaar is', en: 'Class IV: RNA that is ready to read' }, text: { nl: 'Het RNA van dit virus is zelf al een boodschap: de cel leest het meteen. Daarom is het kale RNA vaak al besmettelijk.', en: 'The RNA of this virus already is a message: the cell reads it at once. That is why the bare RNA is often already infectious.' } },
        6: { tag: ['klasse VI', 'class VI'], title: { nl: 'Klasse VI: van RNA naar DNA', en: 'Class VI: from RNA to DNA' }, text: { nl: 'Virussen zoals hiv maken van hun RNA eerst DNA. Dat bouwen ze in het DNA van de cel in.', en: 'Viruses such as HIV first turn their RNA into DNA. They build that into the DNA of the cell.' } },
      },
    },
    secundair: {
      kort: { nl: 'Ribosomen lezen alleen mRNA, dus elk virus moet zijn genoom tot mRNA omzetten. De Baltimore-indeling deelt virussen in volgens die weg: DNA of RNA, enkel- of dubbelstrengig, en meteen leesbaar als mRNA of niet.', en: 'Ribosomes only read mRNA, so every virus has to turn its genome into mRNA. The Baltimore system sorts viruses by that path: DNA or RNA, single- or double-stranded, and readable as mRNA right away or not.' },
      terms: [
        [{ nl: 'Baltimore-klasse', en: 'Baltimore class' }, { nl: 'Groep virussen die op dezelfde manier mRNA maken van hun genoom.', en: 'Group of viruses that make mRNA from their genome in the same way.' }],
        [{ nl: 'genoom', en: 'genome' }, { nl: 'Al het erfelijk materiaal van een virus of cel.', en: 'All the genetic material of a virus or cell.' }],
        [{ nl: '(+)RNA', en: '(+)RNA' }, { nl: 'RNA dat zelf als mRNA werkt en meteen door ribosomen gelezen kan worden.', en: 'RNA that itself works as mRNA and can be read by ribosomes right away.' }],
        [{ nl: 'retrovirus', en: 'retrovirus' }, { nl: 'Virus dat van zijn RNA eerst DNA maakt en dat in het DNA van de cel inbouwt.', en: 'Virus that first makes DNA from its RNA and builds it into the DNA of the cell.' }],
      ],
      steps: {
        0: { tag: ['naar mRNA', 'to mRNA'], title: { nl: 'Alle wegen leiden naar mRNA', en: 'All roads lead to mRNA' }, text: { nl: 'Ribosomen lezen alleen mRNA. Daarom delen we virussen in volgens de weg die hun genoom naar mRNA aflegt.', en: 'Ribosomes only read mRNA. So we sort viruses by the path their genome takes to mRNA.' } },
        1: { tag: ['klasse I', 'class I'], title: { nl: 'Klasse I: dubbelstrengig DNA', en: 'Class I: double-stranded DNA' }, text: { nl: 'Een genoom van dubbelstrengig DNA, zoals het onze. De cel maakt er meestal in de kern mRNA van, bijvoorbeeld bij het adenovirus.', en: 'A genome of double-stranded DNA, like ours. The cell usually makes mRNA from it in the nucleus, for example with the adenovirus.' } },
        4: { tag: ['klasse IV', 'class IV'], title: { nl: 'Klasse IV: (+)RNA, meteen leesbaar', en: 'Class IV: (+)RNA, ready to read' }, text: { nl: 'Het (+)RNA-genoom werkt zelf als mRNA: ribosomen lezen het meteen. Daarom is het kale RNA vaak al besmettelijk.', en: 'The (+)RNA genome itself works as mRNA: ribosomes read it at once. That is why the bare RNA is often already infectious.' } },
        6: { tag: ['klasse VI', 'class VI'], title: { nl: 'Klasse VI: retrovirussen', en: 'Class VI: retroviruses' }, text: { nl: 'Retrovirussen zoals hiv maken van hun RNA eerst DNA. Dat DNA bouwen ze in het DNA van de cel in.', en: 'Retroviruses such as HIV first make DNA from their RNA. They build that DNA into the DNA of the cell.' } },
      },
    },
  },
  'rt': {
    hobby: {
      kort: { nl: 'Sommige virussen, zoals hiv, dragen hun genen als RNA maar bouwen ze als DNA in de cel in. Een kopieermachine van het virus zet het RNA om in DNA: net andersom dan de cel normaal doet. Veel hiv-medicijnen leggen precies die machine stil.', en: 'Some viruses, such as HIV, carry their genes as RNA but build them into the cell as DNA. A copy machine of the virus turns the RNA into DNA: the opposite of what the cell normally does. Many HIV medicines stop exactly that machine.' },
      steps: {
        0: { tag: ['RNA naar DNA', 'RNA to DNA'], title: { nl: 'Hiv draagt RNA', en: 'HIV carries RNA' }, text: { nl: 'Hiv draagt twee kopieën van zijn RNA. Een kopieermachine van het virus maakt er DNA van.', en: 'HIV carries two copies of its RNA. A copy machine of the virus turns them into DNA.' } },
        4: { tag: ['eerste streng', 'first strand'], title: { nl: 'De eerste DNA-streng is af', en: 'The first DNA strand is done' }, text: { nl: 'De machine kopieert het hele RNA naar DNA en ruimt het RNA op. Eén klein stukje RNA blijft liggen.', en: 'The machine copies all of the RNA into DNA and clears the RNA away. One small piece of RNA stays behind.' } },
        7: { tag: ['dubbel DNA', 'double DNA'], title: { nl: 'Klaar: DNA met twee strengen', en: 'Done: DNA with two strands' }, text: { nl: 'Het resultaat is DNA met twee strengen, met aan elk uiteinde een lang stuk dat zich herhaalt. Nu kan het ingebouwd worden.', en: 'The result is DNA with two strands, with a long repeated stretch at each end. Now it can be built in.' } },
      },
    },
    secundair: {
      kort: { nl: 'Retrovirussen zoals hiv dragen hun genen als RNA. Het virale enzym reverse transcriptase maakt van dat RNA dubbelstrengig DNA, omgekeerd aan de gewone richting. Veel hiv-medicijnen blokkeren dit enzym.', en: 'Retroviruses such as HIV carry their genes as RNA. The viral enzyme reverse transcriptase turns that RNA into double-stranded DNA, the reverse of the usual direction. Many HIV drugs block this enzyme.' },
      terms: [
        [{ nl: 'retrovirus', en: 'retrovirus' }, { nl: 'Virus met een RNA-genoom dat het als DNA in het DNA van de cel inbouwt.', en: 'Virus with an RNA genome that it builds into the DNA of the cell as DNA.' }],
        [{ nl: 'reverse transcriptase', en: 'reverse transcriptase' }, { nl: 'Viraal enzym dat DNA maakt op basis van RNA.', en: 'Viral enzyme that makes DNA using RNA as the guide.' }],
        [{ nl: 'LTR', en: 'LTR' }, { nl: 'Lange herhaling aan elk uiteinde van het virale DNA.', en: 'Long repeat at each end of the viral DNA.' }],
      ],
      steps: {
        0: { tag: ['RNA naar DNA', 'RNA to DNA'], title: { nl: 'Hiv draagt RNA', en: 'HIV carries RNA' }, text: { nl: 'Hiv draagt twee kopieën van zijn RNA-genoom. Het enzym reverse transcriptase maakt er DNA van.', en: 'HIV carries two copies of its RNA genome. The enzyme reverse transcriptase turns them into DNA.' } },
        4: { tag: ['eerste streng', 'first strand'], title: { nl: 'De eerste DNA-streng is af', en: 'The first DNA strand is done' }, text: { nl: 'Een tRNA van de cel dient als startpunt. Reverse transcriptase kopieert het hele RNA naar DNA en breekt het RNA af. Eén kort stukje RNA blijft liggen.', en: 'A tRNA of the cell serves as the starting point. Reverse transcriptase copies all of the RNA into DNA and breaks the RNA down. One short piece of RNA stays behind.' } },
        7: { tag: ['dubbel DNA', 'dsDNA ready'], title: { nl: 'Klaar: dubbelstrengig DNA', en: 'Done: double-stranded DNA' }, text: { nl: 'Het resultaat is dubbelstrengig DNA met aan elk uiteinde een lange herhaling, de LTR. Nu kan het ingebouwd worden.', en: 'The result is double-stranded DNA with a long repeat at each end, the LTR. Now it can be built in.' } },
      },
    },
  },
  'integratie': {
    hobby: {
      kort: { nl: 'Een virus zoals hiv bouwt zijn DNA vast in het DNA van de cel. Vanaf dan hoort het virus er voorgoed bij: de cel leest het af als een gewoon gen en kopieert het bij elke celdeling mee. Daarom blijft een hiv-infectie levenslang.', en: 'A virus such as HIV builds its DNA into the DNA of the cell. From then on the virus is part of it for good: the cell reads it like a normal gene and copies it along at every cell division. That is why an HIV infection lasts for life.' },
      steps: {
        0: { tag: ['kern in', 'into nucleus'], title: { nl: 'Virus-DNA in de celkern', en: 'Virus DNA in the nucleus' }, text: { nl: 'Het nieuwe DNA van het virus is in de celkern aangekomen. Aan elk uiteinde zit een stuk dat zich herhaalt.', en: 'The new DNA of the virus has reached the nucleus. At each end there is a repeated stretch.' } },
        1: { tag: ['vastgrijpen', 'grabbing'], title: { nl: 'Een viruseiwit grijpt het DNA vast', en: 'A virus protein grabs the DNA' }, text: { nl: 'Een eiwit van het virus grijpt beide uiteinden van het virus-DNA vast en houdt ze bij elkaar.', en: 'A protein of the virus grabs both ends of the virus DNA and holds them together.' } },
        3: { tag: ['inbouwen', 'joining'], title: { nl: 'Het virus-DNA wordt ingebouwd', en: 'The virus DNA is built in' }, text: { nl: 'De uiteinden knippen het DNA van de cel open en hechten zich daar vast, op twee plekjes vlak naast elkaar.', en: 'The ends cut open the DNA of the cell and attach there, at two spots right next to each other.' } },
        6: { tag: ['aflezen', 'reading'], title: { nl: 'Afgelezen als een gewoon gen', en: 'Read like a normal gene' }, text: { nl: 'De cel leest het virus-DNA af als een eigen gen. Blijft het stil, dan ‘slaapt’ het virus in de cel.', en: 'The cell reads the virus DNA like one of its own genes. If it stays silent, the virus ‘sleeps’ in the cell.' } },
      },
    },
    secundair: {
      kort: { nl: 'Het virale enzym integrase bouwt het virus-DNA in een chromosoom van de cel in. Dat ingebouwde virus heet een provirus: het wordt afgelezen als een gewoon gen en bij elke celdeling mee gekopieerd.', en: 'The viral enzyme integrase builds the virus DNA into a chromosome of the cell. The built-in virus is called a provirus: it is read like a normal gene and copied along at every cell division.' },
      terms: [
        [{ nl: 'integrase', en: 'integrase' }, { nl: 'Viraal enzym dat het virus-DNA in het DNA van de cel inbouwt.', en: 'Viral enzyme that builds the virus DNA into the DNA of the cell.' }],
        [{ nl: 'provirus', en: 'provirus' }, { nl: 'Virus-DNA dat ingebouwd is in een chromosoom van de cel.', en: 'Virus DNA that has been built into a chromosome of the cell.' }],
        [{ nl: 'LTR', en: 'LTR' }, { nl: 'Lange herhaling aan elk uiteinde van het virus-DNA.', en: 'Long repeat at each end of the virus DNA.' }],
      ],
      steps: {
        0: { tag: ['LTR', 'LTR'], title: { nl: 'Viraal DNA in de kern', en: 'Viral DNA in the nucleus' }, text: { nl: 'Het nieuwe virus-DNA is in de kern aangekomen. Aan elk uiteinde zit een lange herhaling, de LTR.', en: 'The new virus DNA has reached the nucleus. At each end is a long repeat, the LTR.' } },
        1: { tag: ['integrase', 'integrase'], title: { nl: 'Integrase grijpt het DNA vast', en: 'Integrase grabs the DNA' }, text: { nl: 'Het virale enzym integrase grijpt beide uiteinden van het virus-DNA vast en houdt ze samen.', en: 'The viral enzyme integrase grabs both ends of the virus DNA and holds them together.' } },
        3: { tag: ['inbouwen', 'joining'], title: { nl: 'Het virus-DNA wordt ingebouwd', en: 'The virus DNA is built in' }, text: { nl: 'De uiteinden knippen het DNA van de cel open en hechten zich daar vast. Zo zit het virus-DNA in het chromosoom.', en: 'The ends cut open the DNA of the cell and attach there. Now the virus DNA sits in the chromosome.' } },
        6: { tag: ['provirus', 'provirus'], title: { nl: 'Het provirus wordt afgelezen', en: 'The provirus is read' }, text: { nl: 'De cel leest het provirus af als een eigen gen. Blijft het stil, dan ‘slaapt’ het virus in de cel.', en: 'The cell reads the provirus like one of its own genes. If it stays silent, the virus ‘sleeps’ in the cell.' } },
      },
    },
  },
  'kernimport': {
    hobby: {
      kort: { nl: 'Rond de celkern zit een dubbel vlies met duizenden poortjes: de enige doorgangen naar binnen en buiten. Kleine stoffen glippen er zo door, grote hebben een adreslabel en een helper nodig. Het adenovirus is te groot: alleen zijn DNA, met wat eiwit, gaat naar binnen.', en: 'The nucleus is wrapped in a double skin with thousands of little gates: the only ways in and out. Small things slip right through; big ones need an address label and a helper. The adenovirus is too big: only its DNA, with a bit of protein, gets in.' },
      steps: {
        0: { tag: ['aankomst', 'arrival'], title: { nl: 'Het virus komt aan bij de kern', en: 'The virus reaches the nucleus' }, text: { nl: 'Een motortje van de cel heeft het virus naar de celkern gesleept. Die heeft een dubbel vlies vol poortjes.', en: 'A tiny motor of the cell has dragged the virus to the nucleus. It has a double skin full of gates.' } },
        1: { tag: ['poortje', 'gate'], title: { nl: 'Een grote poort naar de kern', en: 'A big gate into the nucleus' }, text: { nl: 'Elk poortje is gebouwd uit vele soorten eiwitten. Een celkern van een mens heeft er duizenden.', en: 'Each gate is built from many kinds of protein. A human nucleus has thousands of them.' } },
        6: { tag: ['te groot', 'too big'], title: { nl: 'Het virus is te groot', en: 'The virus is too big' }, text: { nl: 'Het jasje van het virus past niet door de poort. Het haakt vast aan een eiwit aan de buitenkant van de poort.', en: 'The coat of the virus does not fit through the gate. It hooks onto a protein on the outside of the gate.' } },
        8: { tag: ['DNA binnen', 'DNA inside'], title: { nl: 'Het virus-DNA is binnen', en: 'The virus DNA is inside' }, text: { nl: 'Het virus-DNA gaat de celkern in en blijft los van het eigen DNA van de cel. De cel leest het af als haar eigen genen.', en: 'The virus DNA enters the nucleus and stays apart from the own DNA of the cell. The cell reads it like its own genes.' } },
      },
    },
    secundair: {
      kort: { nl: 'De kern is omgeven door een dubbel membraan, de kernenvelop, met duizenden kernporiën. Kleine moleculen gaan er vrij door; grote hebben een adreslabel en een transporteiwit nodig. Het adenovirus is te groot: alleen zijn DNA gaat naar binnen.', en: 'The nucleus is surrounded by a double membrane, the nuclear envelope, with thousands of nuclear pores. Small molecules pass freely; large ones need an address label and a transport protein. The adenovirus is too big: only its DNA gets in.' },
      terms: [
        [{ nl: 'kernenvelop', en: 'nuclear envelope' }, { nl: 'Dubbel membraan rond de celkern.', en: 'Double membrane around the nucleus.' }],
        [{ nl: 'kernporie', en: 'nuclear pore' }, { nl: 'Grote poort uit eiwitten in de kernenvelop: de enige doorgang tussen kern en cytoplasma.', en: 'Large gate of proteins in the nuclear envelope: the only passage between nucleus and cytoplasm.' }],
        [{ nl: 'adreslabel', en: 'address label' }, { nl: 'Kort stukje van een eiwit dat aangeeft dat het de kern in moet.', en: 'Short part of a protein that marks it for entry into the nucleus.' }],
        [{ nl: 'importine', en: 'importin' }, { nl: 'Transporteiwit dat grote moleculen met een adreslabel de kern in brengt.', en: 'Transport protein that carries large molecules with an address label into the nucleus.' }],
      ],
      steps: {
        0: { tag: ['kernenvelop', 'nuclear envelope'], title: { nl: 'Het virus komt aan bij de kern', en: 'The virus reaches the nucleus' }, text: { nl: 'Een motoreiwit heeft het virus naar de kern gesleept. De kern is omgeven door een dubbel membraan vol poriën.', en: 'A motor protein has dragged the virus to the nucleus. The nucleus is surrounded by a double membrane full of pores.' } },
        1: { tag: ['kernporie', 'nuclear pore'], title: { nl: 'De kernporie: een grote poort', en: 'The nuclear pore: a big gate' }, text: { nl: 'Elke kernporie is een grote poort uit vele soorten eiwitten. Het is de enige doorgang tussen kern en cytoplasma.', en: 'Each nuclear pore is a big gate made of many kinds of protein. It is the only passage between nucleus and cytoplasm.' } },
        6: { tag: ['te groot', 'too big'], title: { nl: 'Het virus is te groot', en: 'The virus is too big' }, text: { nl: 'De capside past niet door de kernporie. Ze hecht zich vast aan een eiwit aan de buitenkant van de porie.', en: 'The capsid does not fit through the nuclear pore. It attaches to a protein on the outside of the pore.' } },
        8: { tag: ['DNA binnen', 'DNA inside'], title: { nl: 'Het virus-DNA is binnen', en: 'The virus DNA is inside' }, text: { nl: 'Het virus-DNA gaat de kern in en blijft los van de chromosomen. De cel schrijft het af als haar eigen genen.', en: 'The virus DNA enters the nucleus and stays separate from the chromosomes. The cell transcribes it like its own genes.' } },
      },
    },
  },
  'sleutel': {
    hobby: {
      kort: { nl: 'Een virus moet eerst aan de juiste cel vastraken. Het coronavirus doet dat met het topje van zijn uitsteeksels: dat past als een sleutel op een slot op onze cellen.', en: 'A virus first has to latch onto the right cell. The coronavirus does that with the tip of its spikes: it fits like a key into a lock on our cells.' },
      steps: {
        0: { tag: ['sleutel en slot', 'key and lock'], title: { nl: 'De sleutel past op het slot van onze cel', en: 'The key fits the lock on our cell' }, text: { nl: 'Dit is een echt stukje coronavirus, in het oranje, vast op een eiwit van onze cel, in het groen.', en: 'This is a real piece of coronavirus, in orange, stuck onto a protein of our cell, in green.' } },
        1: { tag: ['het slot', 'the lock'], title: { nl: 'Het slot zit op onze cel', en: 'The lock is on our cell' }, text: { nl: 'Dit eiwit zit op cellen in onder meer de neus, de longen en de darm. Voor het virus is het een slot.', en: 'This protein sits on cells in places like the nose, the lungs and the gut. For the virus it is a lock.' } },
        2: { tag: ['de sleutel', 'the key'], title: { nl: 'De sleutel zit op het virus', en: 'The key is on the virus' }, text: { nl: 'Het virus is bedekt met uitsteeksels. Alleen het topje ervan past op het slot.', en: 'The virus is covered in spikes. Only the very tip fits the lock.' } },
        5: { tag: ['samensmelten', 'merging'], title: { nl: 'Daarna smelt het virus samen met de cel', en: 'Then the virus merges with the cell' }, text: { nl: 'Een eiwit van de cel knipt het uitsteeksel, aan de buitenkant of in een blaasje. Dan smelt het vlies van het virus samen met de cel.', en: 'A protein of the cell cuts the spike, on the outside or inside a bubble. Then the skin of the virus merges with the cell.' } },
      },
    },
    secundair: {
      kort: { nl: 'Het coronavirus bindt met zijn spike-eiwit aan de receptor ACE2 op onze cellen, als een sleutel in een slot. Daarna knipt een eiwit van de cel de spike en versmelt het virusmembraan met de cel.', en: 'The coronavirus binds our cells with its spike protein, which fits the receptor ACE2 like a key in a lock. Then a protein of the cell cuts the spike and the virus membrane fuses with the cell.' },
      terms: [
        [{ nl: 'spike-eiwit', en: 'spike protein' }, { nl: 'Uitsteeksel op het coronavirus waarvan de top aan ACE2 bindt.', en: 'Spike on the coronavirus whose tip binds ACE2.' }],
        [{ nl: 'ACE2', en: 'ACE2' }, { nl: 'Eiwit op onze cellen dat als receptor voor het virus dient.', en: 'Protein on our cells that serves as the receptor for the virus.' }],
        [{ nl: 'receptorbindend domein', en: 'receptor-binding domain' }, { nl: 'Het topje van de spike dat precies op ACE2 past.', en: 'The tip of the spike that fits ACE2 exactly.' }],
        [{ nl: 'membraanfusie', en: 'membrane fusion' }, { nl: 'Het virusmembraan versmelt met een membraan van de cel.', en: 'The virus membrane merges with a membrane of the cell.' }],
      ],
      steps: {
        0: { tag: ['spike en ACE2', 'spike and ACE2'], title: { nl: 'De spike past op ACE2', en: 'The spike fits ACE2' }, text: { nl: 'Dit is een echt stukje spike-eiwit van het coronavirus, in het oranje, gebonden aan ACE2 van onze cel, in het groen.', en: 'This is a real piece of coronavirus spike protein, in orange, bound to ACE2 of our cell, in green.' } },
        1: { tag: ['ACE2', 'ACE2'], title: { nl: 'ACE2: het slot op onze cel', en: 'ACE2: the lock on our cell' }, text: { nl: 'ACE2 zit op cellen in onder meer de neus, de longen en de darm. Het is de receptor van het virus.', en: 'ACE2 sits on cells in places like the nose, the lungs and the gut. It is the receptor of the virus.' } },
        2: { tag: ['spike', 'spike'], title: { nl: 'De spike: de sleutel op het virus', en: 'The spike: the key on the virus' }, text: { nl: 'Het virus is bedekt met spike-eiwitten. Alleen de top, het receptorbindend domein, past op ACE2.', en: 'The virus is covered in spike proteins. Only the tip, the receptor-binding domain, fits ACE2.' } },
        5: { tag: ['fusie', 'fusion'], title: { nl: 'Daarna versmelt het virus met de cel', en: 'Then the virus fuses with the cell' }, text: { nl: 'Dit model toont enkel de binding. Daarna knipt een eiwit van de cel de spike, aan het celoppervlak of in een blaasje, en versmelt het virusmembraan met de cel.', en: 'This model only shows the binding. After that a protein of the cell cuts the spike, at the cell surface or inside a vesicle, and the virus membrane fuses with the cell.' } },
      },
    },
  },
  'viruskopie': {
    hobby: {
      kort: { nl: 'Het RNA van het coronavirus lijkt op de RNA-boodschappen van onze eigen cel. De eiwitfabriekjes lezen het meteen en maken één lange eiwitketen, die in stukken geknipt wordt. Een deel van die stukken vormt een kopieermachine voor RNA.', en: 'The RNA of the coronavirus looks like the RNA messages of our own cells. The protein factories read it at once and make one long protein chain, which gets cut into pieces. Some of those pieces form a copy machine for RNA.' },
      steps: {
        0: { tag: ['meteen lezen', 'read at once'], title: { nl: 'Het virus-RNA werkt meteen als boodschap', en: 'The virus RNA works as a message at once' }, text: { nl: 'Het RNA van dit virus lijkt op de boodschappen van onze cel. De eiwitfabriekjes lezen het meteen af.', en: 'The RNA of this virus looks like the messages of our cells. The protein factories read it straight away.' } },
        1: { tag: ['lange keten', 'long chain'], title: { nl: 'Eerst ontstaat één lange keten', en: 'First comes one long chain' }, text: { nl: 'De fabriekjes maken één heel lange eiwitketen. Zo werkt die nog niet: ze moet eerst in stukken geknipt worden.', en: 'The factories make one very long protein chain. Like this it does not work yet: it first has to be cut into pieces.' } },
        3: { tag: ['kopieermachine', 'copy machine'], title: { nl: 'De stukken bouwen een kopieermachine', en: 'The pieces build a copy machine' }, text: { nl: 'Een deel van de stukken vormt samen een kopieermachine die het RNA van het virus kopieert.', en: 'Some of the pieces together form a copy machine that copies the RNA of the virus.' } },
      },
    },
    secundair: {
      kort: { nl: 'Het (+)RNA-genoom van het coronavirus werkt meteen als mRNA. Ribosomen vertalen het tot lange polyproteïnen, die virale proteasen in stukken knippen. Een deel van die stukken vormt het kopieercomplex rond een RNA-polymerase.', en: 'The (+)RNA genome of the coronavirus works as mRNA right away. Ribosomes translate it into long polyproteins, which viral proteases cut into pieces. Some of those pieces form the copying complex around an RNA polymerase.' },
      terms: [
        [{ nl: '(+)RNA-genoom', en: '(+)RNA genome' }, { nl: 'RNA-genoom dat zelf als mRNA werkt.', en: 'RNA genome that itself works as mRNA.' }],
        [{ nl: 'polyproteïne', en: 'polyprotein' }, { nl: 'Lange eiwitketen die nog in werkende stukken geknipt moet worden.', en: 'Long protein chain that still has to be cut into working pieces.' }],
        [{ nl: 'protease', en: 'protease' }, { nl: 'Enzym dat een eiwitketen knipt; hier de schaar van het virus.', en: 'Enzyme that cuts a protein chain; here the scissors of the virus.' }],
        [{ nl: 'RNA-polymerase', en: 'RNA polymerase' }, { nl: 'Enzym van het virus dat RNA kopieert aan de hand van RNA.', en: 'Enzyme of the virus that copies RNA using RNA as a guide.' }],
      ],
      steps: {
        0: { tag: ['(+)RNA', '(+)RNA'], title: { nl: 'Het (+)RNA werkt meteen als mRNA', en: 'The (+)RNA works as mRNA at once' }, text: { nl: 'Het RNA-genoom van dit virus lijkt op ons eigen mRNA. Ribosomen lezen het meteen af.', en: 'The RNA genome of this virus looks like our own mRNA. Ribosomes read it straight away.' } },
        1: { tag: ['polyproteïne', 'polyprotein'], title: { nl: 'Eerst ontstaat een polyproteïne', en: 'First comes a polyprotein' }, text: { nl: 'De ribosomen maken één heel lange eiwitketen, een polyproteïne. Die werkt pas als virale proteasen ze in stukken knippen.', en: 'The ribosomes make one very long protein chain, a polyprotein. It only works once viral proteases cut it into pieces.' } },
        3: { tag: ['kopieercomplex', 'copy complex'], title: { nl: 'De stukken vormen een kopieercomplex', en: 'The pieces form a copying complex' }, text: { nl: 'Een deel van de stukken vormt samen het kopieercomplex. De kern daarvan is een RNA-polymerase dat het virus-RNA kopieert.', en: 'Some of the pieces together form the copying complex. At its heart is an RNA polymerase that copies the virus RNA.' } },
      },
    },
  },
  'schaar': {
    hobby: {
      kort: { nl: 'De lange eiwitketen van het virus moet in stukken geknipt worden. Dat doet een eigen schaartje van het virus. Een medicijn past in de groef van dat schaartje en zet het vast.', en: 'The long protein chain of the virus has to be cut into pieces. A pair of scissors of the virus itself does that. A medicine fits into the groove of those scissors and jams them.' },
      steps: {
        0: { tag: ['virusschaar', 'virus scissors'], title: { nl: 'Een schaartje van het virus', en: 'The scissors of the virus' }, text: { nl: 'Dit is het echte schaartje van het coronavirus. Het knipt de lange eiwitketen op veel plaatsen.', en: 'These are the real scissors of the coronavirus. They cut the long protein chain in many places.' } },
        3: { tag: ['geblokkeerd', 'blocked'], title: { nl: 'Een medicijn zet de schaar vast', en: 'A medicine jams the scissors' }, text: { nl: 'Het medicijn past in dezelfde groef en hecht zich aan het mesje. Zo zit de schaar vast.', en: 'The medicine fits into the same groove and sticks to the blade. Now the scissors are stuck.' } },
        5: { tag: ['zonder knippen', 'no cutting'], title: { nl: 'Zonder knippen geen kopieermachine', en: 'No cutting, no copy machine' }, text: { nl: 'Blijft de keten heel, dan ontstaat er geen kopieermachine. Het virus kan zich dan veel minder vermenigvuldigen.', en: 'If the chain stays whole, no copy machine is formed. The virus can then multiply much less.' } },
      },
    },
    secundair: {
      kort: { nl: 'De hoofdprotease Mpro is de schaar van het coronavirus: ze knipt de polyproteïnen in werkende stukken. Het medicijn nirmatrelvir bindt in de actieve plaats van Mpro en blokkeert ze.', en: 'The main protease Mpro is the scissors of the coronavirus: it cuts the polyproteins into working pieces. The drug nirmatrelvir binds in the active site of Mpro and blocks it.' },
      terms: [
        [{ nl: 'protease', en: 'protease' }, { nl: 'Enzym dat een eiwitketen knipt.', en: 'Enzyme that cuts a protein chain.' }],
        [{ nl: 'hoofdprotease (Mpro)', en: 'main protease (Mpro)' }, { nl: 'Schaar van het coronavirus die de polyproteïnen op veel plaatsen knipt.', en: 'Scissors of the coronavirus that cut the polyproteins in many places.' }],
        [{ nl: 'actieve plaats', en: 'active site' }, { nl: 'Groef in een enzym waar de reactie gebeurt, hier het knippen.', en: 'Groove in an enzyme where the reaction happens, here the cutting.' }],
        [{ nl: 'nirmatrelvir', en: 'nirmatrelvir' }, { nl: 'Medicijn dat zich vasthecht in de actieve plaats van Mpro en zo het knippen blokkeert.', en: 'Drug that attaches in the active site of Mpro and so blocks the cutting.' }],
      ],
      steps: {
        0: { tag: ['Mpro', 'Mpro'], title: { nl: 'De hoofdprotease knipt de keten', en: 'The main protease cuts the chain' }, text: { nl: 'Dit is de echte hoofdprotease Mpro van het coronavirus. Ze knipt de lange polyproteïnen op veel plaatsen.', en: 'This is the real main protease Mpro of the coronavirus. It cuts the long polyproteins in many places.' } },
        3: { tag: ['remmer', 'inhibitor'], title: { nl: 'Nirmatrelvir blokkeert de schaar', en: 'Nirmatrelvir blocks the scissors' }, text: { nl: 'Nirmatrelvir past in de actieve plaats en hecht zich aan het knipmes van Mpro. Zo is het enzym geblokkeerd.', en: 'Nirmatrelvir fits into the active site and attaches to the cutting blade of Mpro. That blocks the enzyme.' } },
        5: { tag: ['zonder knippen', 'no cutting'], title: { nl: 'Zonder knippen geen kopieercomplex', en: 'No cutting, no copying complex' }, text: { nl: 'Blijft het polyproteïne heel, dan ontstaat er geen kopieercomplex. Het virus vermenigvuldigt zich dan veel minder.', en: 'If the polyprotein stays whole, no copying complex is formed. The virus then multiplies much less.' } },
      },
    },
  },
  'assemblage': {
    hobby: {
      kort: { nl: 'Nieuwe virussen worden binnen in de cel in elkaar gezet, aan vliezen in de cel. Blaasjes brengen ze daarna naar buiten. Elk nieuw virus kan dan een volgende cel besmetten.', en: 'New viruses are put together inside the cell, on skins inside the cell. Little bubbles then carry them outside. Each new virus can then infect another cell.' },
      steps: {
        0: { tag: ['virushuid', 'virus skin'], title: { nl: 'De cel maakt de virushuid', en: 'The cell makes the virus skin' }, text: { nl: 'Fabriekjes op een netwerk van vliezen in de cel maken de eiwitten van de virushuid, zoals de uitsteeksels. Die blijven in dat vlies steken.', en: 'Factories on a network of skins in the cell make the proteins of the virus skin, such as the spikes. They stay stuck in that skin.' } },
        3: { tag: ['naar buiten', 'release'], title: { nl: 'Een blaasje brengt het virus naar buiten', en: 'A bubble carries the virus out' }, text: { nl: 'Een blaasje met virussen reist naar de rand van de cel. Het smelt samen met die rand en de virussen komen vrij.', en: 'A bubble full of viruses travels to the edge of the cell. It merges with that edge and the viruses get out.' } },
        5: { tag: ['volgende cel', 'next cell'], title: { nl: 'Elk nieuw virus kan verder besmetten', en: 'Each new virus can infect again' }, text: { nl: 'De nieuwe virussen hebben dezelfde sleutel. Ze kunnen meteen een volgende cel besmetten.', en: 'The new viruses have the same key. They can infect the next cell right away.' } },
      },
    },
    secundair: {
      kort: { nl: 'Nieuwe coronavirussen worden in de cel samengesteld, aan membranen tussen het ER en het Golgi-apparaat. Ribosomen op het ER maken de eiwitten van de virushuid. Blaasjes brengen de virussen naar buiten door exocytose.', en: 'New coronaviruses are assembled inside the cell, on membranes between the ER and the Golgi apparatus. Ribosomes on the ER make the proteins of the virus envelope. Vesicles carry the viruses out by exocytosis.' },
      terms: [
        [{ nl: 'ruw ER', en: 'rough ER' }, { nl: 'Membraannetwerk met ribosomen, waar onder meer membraaneiwitten gemaakt worden.', en: 'Membrane network with ribosomes, where membrane proteins among others are made.' }],
        [{ nl: 'Golgi-apparaat', en: 'Golgi apparatus' }, { nl: 'Stapel membraanzakjes naast het ER; het virus wordt gebouwd tussen ER en Golgi.', en: 'Stack of membrane sacs next to the ER; the virus is built between ER and Golgi.' }],
        [{ nl: 'exocytose', en: 'exocytosis' }, { nl: 'Een blaasje versmelt met het celmembraan en laat zijn inhoud naar buiten.', en: 'A vesicle fuses with the cell membrane and releases its contents outside.' }],
      ],
      steps: {
        0: { tag: ['ER', 'ER'], title: { nl: 'Het ER maakt de virushuid', en: 'The ER makes the virus envelope' }, text: { nl: 'Ribosomen op het ER maken de eiwitten van de virushuid, zoals de spike. Ze blijven in het ER-membraan steken.', en: 'Ribosomes on the ER make the proteins of the virus envelope, such as the spike. They stay stuck in the ER membrane.' } },
        3: { tag: ['exocytose', 'exocytosis'], title: { nl: 'Exocytose: het virus gaat naar buiten', en: 'Exocytosis: the virus leaves' }, text: { nl: 'Tussen ER en Golgi worden nieuwe virussen ingepakt. Een blaasje brengt ze naar de rand van de cel, versmelt met het celmembraan en laat ze vrij.', en: 'New viruses are packed between the ER and the Golgi. A vesicle carries them to the edge of the cell, fuses with the cell membrane and releases them.' } },
        5: { tag: ['volgende cel', 'next cell'], title: { nl: 'Elk nieuw virus kan een volgende cel besmetten', en: 'Each new virus can infect another cell' }, text: { nl: 'De nieuwe virussen dragen dezelfde spike. Ze kunnen meteen een volgende cel besmetten.', en: 'The new viruses carry the same spike. They can infect the next cell right away.' } },
      },
    },
  },
  'dubbellaag': {
    hobby: {
      kort: { nl: 'Rond elke cel zit een vlies van twee lagen vetdeeltjes. Hun kopjes houden van water en zitten aan de buiten- en binnenkant; hun staartjes verstoppen zich in het midden. Daartussen zitten eiwitten, en buiten hangen suikers.', en: 'Every cell is wrapped in a skin of two layers of fat particles. Their heads like water and sit on the outside and inside; their tails hide in the middle. Proteins sit in between, and sugars hang on the outside.' },
      steps: {
        0: { tag: ['celrand', 'cell edge'], title: { nl: 'De rand van elke cel', en: 'The edge of every cell' }, text: { nl: 'Rond elke cel zit een dun vlies. We zoomen in op een klein stukje van die rand.', en: 'Every cell is wrapped in a thin skin. We zoom in on a small piece of that edge.' } },
        1: { tag: ['twee lagen', 'two layers'], title: { nl: 'Twee lagen vetdeeltjes', en: 'Two layers of fat particles' }, text: { nl: 'Het vlies bestaat uit twee lagen vetdeeltjes. Hun kopjes zoeken het water op, hun staartjes verstoppen zich in het midden.', en: 'The skin is made of two layers of fat particles. Their heads seek out water, their tails hide in the middle.' } },
        5: { tag: ['eiwitten', 'proteins'], title: { nl: 'Eiwitten steken erdoor', en: 'Proteins poke through' }, text: { nl: 'Eiwitten zitten in het vlies. Hun vettige deel zit in het midden, de delen die van water houden steken uit.', en: 'Proteins sit in the skin. Their fatty part sits in the middle, the parts that like water stick out.' } },
      },
    },
    secundair: {
      kort: { nl: 'Het celmembraan is een dubbellaag van fosfolipiden. Hun hydrofiele koppen wijzen naar het water, hun hydrofobe staarten naar het midden. In het membraan zitten cholesterol en eiwitten, en buiten hangen suikers.', en: 'The cell membrane is a bilayer of phospholipids. Their hydrophilic heads face the water, their hydrophobic tails face the middle. Cholesterol and proteins sit in the membrane, and sugars hang on the outside.' },
      terms: [
        [{ nl: 'celmembraan', en: 'cell membrane' }, { nl: 'Dun vlies rond elke cel, opgebouwd uit lipiden en eiwitten.', en: 'Thin skin around every cell, made of lipids and proteins.' }],
        [{ nl: 'fosfolipide', en: 'phospholipid' }, { nl: 'Vetmolecule met een waterminnende kop en twee waterafstotende staarten.', en: 'Fat molecule with a water-loving head and two water-repelling tails.' }],
        [{ nl: 'hydrofiel en hydrofoob', en: 'hydrophilic and hydrophobic' }, { nl: 'Waterminnend en waterafstotend.', en: 'Water-loving and water-repelling.' }],
        [{ nl: 'membraaneiwit', en: 'membrane protein' }, { nl: 'Eiwit dat in het membraan zit en er vaak doorheen steekt.', en: 'Protein that sits in the membrane and often pokes through it.' }],
      ],
      steps: {
        0: { tag: ['celmembraan', 'cell membrane'], title: { nl: 'Het celmembraan: de rand van de cel', en: 'The cell membrane: the edge of the cell' }, text: { nl: 'Rond elke cel zit een dun vlies: het celmembraan. We zoomen in op een klein stukje ervan.', en: 'Every cell is wrapped in a thin skin: the cell membrane. We zoom in on a small piece of it.' } },
        1: { tag: ['fosfolipiden', 'phospholipids'], title: { nl: 'Een dubbellaag van fosfolipiden', en: 'A bilayer of phospholipids' }, text: { nl: 'Het membraan bestaat uit twee lagen fosfolipiden. De hydrofiele koppen zoeken het water op, de hydrofobe staarten zitten in het midden.', en: 'The membrane is made of two layers of phospholipids. The hydrophilic heads seek out water, the hydrophobic tails sit in the middle.' } },
        5: { tag: ['membraaneiwit', 'membrane protein'], title: { nl: 'Membraaneiwitten steken erdoor', en: 'Membrane proteins poke through' }, text: { nl: 'Membraaneiwitten zitten in de dubbellaag. Hun hydrofobe deel zit in het midden, hun hydrofiele delen steken uit.', en: 'Membrane proteins sit in the bilayer. Their hydrophobic part sits in the middle, their hydrophilic parts stick out.' } },
      },
    },
  },
  'signaal': {
    hobby: {
      kort: { nl: 'Cellen sturen elkaar berichtjes met signaalstoffen, zoals hormonen. Een cel reageert alleen als ze het passende slot voor dat signaal heeft. Sommige signalen haken buiten aan de cel vast, andere glippen erdoorheen.', en: 'Cells send each other little messages with signal substances, such as hormones. A cell only responds if it has the matching lock for that signal. Some signals hook on outside the cell, others slip right through.' },
      steps: {
        0: { tag: ['signalen', 'signals'], title: { nl: 'Signalen bereiken de cel', en: 'Signals reach the cell' }, text: { nl: 'Sommige signalen haken buiten aan de cel vast, andere glippen erdoor. Klik op een weg; wij volgen een groeisignaal.', en: 'Some signals hook on outside the cell, others slip through. Click a path; we follow a growth signal.' } },
      },
    },
    secundair: {
      kort: { nl: 'Cellen sturen elkaar boodschappen met signaalmoleculen, zoals hormonen en groeifactoren. Een signaal werkt alleen op een cel met de passende receptor. Sommige signalen binden buiten op de cel; vetoplosbare gaan door het membraan.', en: 'Cells send each other messages with signalling molecules, such as hormones and growth factors. A signal only acts on a cell with the matching receptor. Some signals bind outside the cell; fat-soluble ones pass through the membrane.' },
      terms: [
        [{ nl: 'signaalmolecule', en: 'signalling molecule' }, { nl: 'Molecule waarmee cellen elkaar een boodschap sturen, zoals een hormoon.', en: 'Molecule that cells use to send each other a message, such as a hormone.' }],
        [{ nl: 'receptor', en: 'receptor' }, { nl: 'Eiwit dat een signaal specifiek bindt en omzet in een reactie in de cel.', en: 'Protein that binds a signal specifically and turns it into a response in the cell.' }],
        [{ nl: 'lipofiel signaal', en: 'lipophilic signal' }, { nl: 'Vetoplosbaar signaal, zoals cortisol, dat door het membraan gaat en een receptor in de cel bindt.', en: 'Fat-soluble signal, such as cortisol, that crosses the membrane and binds a receptor inside the cell.' }],
      ],
      steps: {
        0: { tag: ['receptor', 'receptor'], title: { nl: 'Signalen bereiken de cel', en: 'Signals reach the cell' }, text: { nl: 'Sommige signalen binden een receptor buiten op de cel, andere gaan door het membraan. Klik op een route; wij volgen de groeifactor EGF.', en: 'Some signals bind a receptor on the outside of the cell, others cross the membrane. Click a route; we follow the growth factor EGF.' } },
      },
    },
  },
  'gpcr': {
    hobby: {
      kort: { nl: 'Het hormoon adrenaline haakt vast aan een ontvanger in de celrand. Die zet een schakelaar aan, en de cel maakt een klein boodschappertje dat het nieuws snel verspreidt. Zo gaat uiteindelijk een gen in de celkern aan.', en: 'The hormone adrenaline hooks onto a catcher in the edge of the cell. That flips on a switch, and the cell makes a tiny messenger that spreads the news fast. In the end this switches on a gene in the nucleus.' },
      steps: {
        0: { tag: ['aankomst', 'arrival'], title: { nl: 'Adrenaline komt aan', en: 'Adrenaline arrives' }, text: { nl: 'Het hormoon adrenaline nadert zijn ontvanger. Eronder wacht een schakelaar-eiwit, dat nog uit staat.', en: 'The hormone adrenaline comes close to its catcher. Below it waits a switch protein, still off.' } },
        1: { tag: ['vormverandering', 'shape change'], title: { nl: 'De ontvanger verandert van vorm', en: 'The catcher changes shape' }, text: { nl: 'De ontvanger kronkelt zeven keer door de celrand. Als adrenaline vasthaakt, verandert de binnenkant van vorm.', en: 'The catcher snakes back and forth through the cell edge seven times. When adrenaline hooks on, its inside changes shape.' } },
        4: { tag: ['boodschappertje', 'messenger'], title: { nl: 'Een klein boodschappertje', en: 'A tiny messenger' }, text: { nl: 'Een eiwit maakt van een energiestofje een klein boodschappertje. Dat verspreidt het signaal snel door de cel.', en: 'A protein turns an energy molecule into a tiny messenger. It spreads the signal quickly through the cell.' } },
        7: { tag: ['gen aan', 'gene on'], title: { nl: 'Het gen gaat aan', en: 'The gene switches on' }, text: { nl: 'Via andere eiwitten bereikt het signaal een gen-schakelaar in de kern. Die haalt een helper erbij, en het gen wordt afgelezen.', en: 'Through other proteins the signal reaches a gene switch in the nucleus. It calls in a helper, and the gene is read.' } },
      },
    },
    secundair: {
      kort: { nl: 'Adrenaline bindt een G-eiwitgekoppelde receptor in het membraan, die het G-eiwit aanzet. Daardoor maakt de cel de kleine boodschapper cAMP. Via een kinase gaat zo uiteindelijk een gen in de kern aan.', en: 'Adrenaline binds a G protein-coupled receptor in the membrane, which switches on the G protein. As a result the cell makes the small messenger cAMP. Through a kinase this finally switches on a gene in the nucleus.' },
      terms: [
        [{ nl: 'G-eiwitgekoppelde receptor', en: 'G protein-coupled receptor' }, { nl: 'Receptor die zeven keer door het membraan gaat en een G-eiwit aanzet.', en: 'Receptor that crosses the membrane seven times and switches on a G protein.' }],
        [{ nl: 'G-eiwit', en: 'G protein' }, { nl: 'Schakelaar-eiwit onder de receptor dat het signaal doorgeeft.', en: 'Switch protein under the receptor that passes the signal on.' }],
        [{ nl: 'cAMP', en: 'cAMP' }, { nl: 'Klein boodschappermolecule dat het signaal snel door de cel verspreidt.', en: 'Small messenger molecule that spreads the signal quickly through the cell.' }],
        [{ nl: 'kinase', en: 'kinase' }, { nl: 'Enzym dat een fosfaatgroep op een eiwit zet.', en: 'Enzyme that puts a phosphate group on a protein.' }],
        [{ nl: 'transcriptiefactor', en: 'transcription factor' }, { nl: 'Eiwit dat een gen aan- of uitzet.', en: 'Protein that switches a gene on or off.' }],
      ],
      steps: {
        0: { tag: ['G-eiwit', 'G protein'], title: { nl: 'Adrenaline nadert de receptor', en: 'Adrenaline approaches the receptor' }, text: { nl: 'Het hormoon adrenaline nadert zijn receptor. Eronder wacht het G-eiwit, een schakelaar-eiwit dat nog uit staat.', en: 'The hormone adrenaline approaches its receptor. Below it waits the G protein, a switch protein that is still off.' } },
        1: { tag: ['receptor', 'receptor'], title: { nl: 'De receptor verandert van vorm', en: 'The receptor changes shape' }, text: { nl: 'De receptor gaat zeven keer door het membraan. Als adrenaline bindt, verandert de binnenkant van vorm.', en: 'The receptor crosses the membrane seven times. When adrenaline binds, its inside changes shape.' } },
        4: { tag: ['cAMP', 'cAMP'], title: { nl: 'Een enzym maakt cAMP', en: 'An enzyme makes cAMP' }, text: { nl: 'Het enzym adenylylcyclase maakt van ATP de kleine boodschapper cAMP. Die verspreidt het signaal snel door de cel.', en: 'The enzyme adenylyl cyclase turns ATP into the small messenger cAMP. It spreads the signal quickly through the cell.' } },
        7: { tag: ['gen aan', 'gene on'], title: { nl: 'Een transcriptiefactor zet het gen aan', en: 'A transcription factor turns the gene on' }, text: { nl: 'Een kinase zet een fosfaat op de transcriptiefactor CREB. Die haalt een helper erbij, en het gen wordt afgelezen.', en: 'A kinase puts a phosphate on the transcription factor CREB. It calls in a helper, and the gene is read.' } },
      },
    },
  },
  'steroid': {
    hobby: {
      kort: { nl: 'Cortisol is een hormoon dat oplost in vet en zo door de celrand glipt. Binnen haakt het vast aan zijn ontvanger, die zelf naar de celkern reist en daar genen aan- of uitzet. Zo is de weg van signaal naar gen heel kort.', en: 'Cortisol is a hormone that dissolves in fat, so it slips through the edge of the cell. Inside it hooks onto its catcher, which travels to the nucleus itself and switches genes on or off there. So the road from signal to gene is very short.' },
      steps: {
        0: { tag: ['lost op in vet', 'fat soluble'], title: { nl: 'Cortisol lost op in vet', en: 'Cortisol dissolves in fat' }, text: { nl: 'Cortisol is een hormoon gemaakt uit cholesterol. Het lost op in vet, dus het past in de vettige celrand.', en: 'Cortisol is a hormone made from cholesterol. It dissolves in fat, so it fits into the fatty edge of the cell.' } },
        1: { tag: ['door de rand', 'through the edge'], title: { nl: 'Dwars door de celrand', en: 'Right through the cell edge' }, text: { nl: 'Cortisol is klein en glipt zo door de celrand. Het hoeft niet buiten op de cel aan te haken.', en: 'Cortisol is small and slips straight through the cell edge. It does not need to hook on outside the cell.' } },
        3: { tag: ['vasthaken', 'hooking on'], title: { nl: 'Cortisol haakt aan zijn ontvanger', en: 'Cortisol hooks onto its catcher' }, text: { nl: 'De ontvanger verandert van vorm en laat zijn helpers los. Nu toont hij een adreslabel voor de celkern.', en: 'The catcher changes shape and lets go of its helpers. Now it shows an address label for the nucleus.' } },
        6: { tag: ['gen aan', 'gene on'], title: { nl: 'Het gen gaat aan', en: 'The gene switches on' }, text: { nl: 'De ontvanger haalt helpers erbij en het gen wordt afgelezen. Bijvoorbeeld een gen dat de lever helpt suiker te maken.', en: 'The catcher calls in helpers and the gene is read. For example a gene that helps the liver make sugar.' } },
      },
    },
    secundair: {
      kort: { nl: 'Cortisol is een vetoplosbaar steroïdhormoon dat door het membraan gaat. In de cel bindt het zijn receptor, die naar de kern gaat en daar genen aan- of uitzet. Zo is de receptor zelf een transcriptiefactor.', en: 'Cortisol is a fat-soluble steroid hormone that crosses the membrane. Inside the cell it binds its receptor, which moves to the nucleus and switches genes on or off. So the receptor itself is a transcription factor.' },
      terms: [
        [{ nl: 'steroïdhormoon', en: 'steroid hormone' }, { nl: 'Vetoplosbaar hormoon gemaakt uit cholesterol, zoals cortisol.', en: 'Fat-soluble hormone made from cholesterol, such as cortisol.' }],
        [{ nl: 'kernreceptor', en: 'nuclear receptor' }, { nl: 'Receptor in de cel die tegelijk een transcriptiefactor is.', en: 'Receptor inside the cell that is also a transcription factor.' }],
        [{ nl: 'transcriptiefactor', en: 'transcription factor' }, { nl: 'Eiwit dat aan het DNA bindt en genen aan- of uitzet.', en: 'Protein that binds DNA and switches genes on or off.' }],
      ],
      steps: {
        0: { tag: ['steroïdhormoon', 'steroid hormone'], title: { nl: 'Cortisol: een steroïdhormoon', en: 'Cortisol: a steroid hormone' }, text: { nl: 'Cortisol is een steroïdhormoon gemaakt uit cholesterol. Het lost op in vet, dus het past in het membraan.', en: 'Cortisol is a steroid hormone made from cholesterol. It dissolves in fat, so it fits into the membrane.' } },
        1: { tag: ['door membraan', 'through membrane'], title: { nl: 'Dwars door het membraan', en: 'Straight through the membrane' }, text: { nl: 'Cortisol is klein en glipt zo door het membraan. Het heeft geen receptor aan de buitenkant van de cel nodig.', en: 'Cortisol is small and slips straight through the membrane. It does not need a receptor on the outside of the cell.' } },
        3: { tag: ['receptor', 'receptor'], title: { nl: 'Cortisol bindt de receptor', en: 'Cortisol binds the receptor' }, text: { nl: 'De receptor verandert van vorm en laat zijn helpers los. Nu toont hij een adreslabel voor de kern.', en: 'The receptor changes shape and lets go of its helpers. Now it shows an address label for the nucleus.' } },
        6: { tag: ['gen aan', 'gene on'], title: { nl: 'De receptor zet het gen aan', en: 'The receptor turns the gene on' }, text: { nl: 'In de kern haalt de receptor helpers erbij en het gen wordt afgelezen, bijvoorbeeld een gen dat de lever helpt glucose te maken.', en: 'In the nucleus the receptor calls in helpers and the gene is read, for example a gene that helps the liver make glucose.' } },
      },
    },
  },
  'rtk': {
    hobby: {
      kort: { nl: 'Deze ontvanger in de celrand vangt een groeisignaal op. Twee ontvangers vormen dan een paar en zetten kleine labeltjes op elkaars staart. Daar haken andere eiwitten aan, die het signaal verder doorgeven.', en: 'This catcher in the cell edge picks up a growth signal. Two catchers then pair up and put little tags on each other’s tail. Other proteins hook onto those tags and pass the signal on.' },
      steps: {
        0: { tag: ['aankomst', 'arrival'], title: { nl: 'Een groeisignaal komt aan', en: 'A growth signal arrives' }, text: { nl: 'Een groeisignaal, een klein eiwit, komt aan. In de celrand wachten losse ontvangers, die nog uit staan.', en: 'A growth signal, a small protein, arrives. In the cell edge, single catchers wait, still switched off.' } },
        1: { tag: ['openklappen', 'opening up'], title: { nl: 'Het signaal haakt vast: de ontvanger opent', en: 'The signal hooks on: the catcher opens' }, text: { nl: 'Het groeisignaal wordt vastgeklemd. De buitenkant van de ontvanger klapt open en er komt een armpje vrij.', en: 'The growth signal gets clamped in place. The outside of the catcher flips open and a little arm comes free.' } },
        4: { tag: ['labeltjes', 'tags'], title: { nl: 'De staarten krijgen labeltjes', en: 'The tails get tags' }, text: { nl: 'Twee ontvangers zetten kleine labeltjes op elkaars staart. Daar kunnen andere eiwitten aanhaken.', en: 'Two catchers put little tags on each other’s tail. Other proteins can hook on there.' } },
        7: { tag: ['signaal binnen', 'signal inside'], title: { nl: 'Het signaal is binnen', en: 'The signal is inside' }, text: { nl: 'Het signaal van buiten is nu binnen in de cel aangekomen. Klik op Ras, een aan/uit-knop, om de kettingreactie te volgen.', en: 'The signal from outside has now arrived inside the cell. Click Ras, an on/off switch, to follow the chain reaction.' } },
      },
    },
    secundair: {
      kort: { nl: 'De EGF-receptor is een receptortyrosinekinase in het membraan. Als de groeifactor EGF bindt, vormen twee receptoren een paar en zetten ze fosfaat op elkaars staart. Op die fosfaten meren eiwitten aan die het signaal doorgeven aan Ras.', en: 'The EGF receptor is a receptor tyrosine kinase in the membrane. When the growth factor EGF binds, two receptors pair up and put phosphate on each other’s tail. Proteins dock on those phosphates and pass the signal on to Ras.' },
      terms: [
        [{ nl: 'groeifactor', en: 'growth factor' }, { nl: 'Signaalmolecule, zoals EGF, die een receptor op de cel bindt.', en: 'Signalling molecule, such as EGF, that binds a receptor on the cell.' }],
        [{ nl: 'receptortyrosinekinase', en: 'receptor tyrosine kinase' }, { nl: 'Receptor die na binding van zijn signaal fosfaatgroepen op de staart van zijn partner zet.', en: 'Receptor that, once its signal binds, puts phosphate groups on the tail of its partner.' }],
        [{ nl: 'fosforylatie', en: 'phosphorylation' }, { nl: 'Het zetten van een fosfaatgroep op een eiwit.', en: 'Putting a phosphate group on a protein.' }],
      ],
      steps: {
        0: { tag: ['EGF', 'EGF'], title: { nl: 'De groeifactor EGF komt aan', en: 'The growth factor EGF arrives' }, text: { nl: 'De groeifactor EGF, een klein eiwit, komt aan. In het membraan wachten losse receptoren, nog inactief.', en: 'The growth factor EGF, a small protein, arrives. In the membrane, single receptors wait, still inactive.' } },
        1: { tag: ['binding', 'binding'], title: { nl: 'EGF bindt: de receptor gaat open', en: 'EGF binds: the receptor opens' }, text: { nl: 'EGF wordt vastgeklemd in de receptor. Het buitenste deel klapt open en er komt een arm vrij.', en: 'EGF is clamped inside the receptor. The outer part flips open and an arm comes free.' } },
        4: { tag: ['fosforylatie', 'phosphorylation'], title: { nl: 'Fosforylatie van de staarten', en: 'Phosphorylation of the tails' }, text: { nl: 'De twee receptoren zetten fosfaatgroepen op elkaars staart: fosforylatie. Daar kunnen signaaleiwitten aanmeren.', en: 'The two receptors put phosphate groups on each other’s tail: phosphorylation. Signalling proteins can dock there.' } },
        7: { tag: ['signaal binnen', 'signal inside'], title: { nl: 'Het signaal is binnen', en: 'The signal is inside' }, text: { nl: 'Op de fosfaatgroepen hechten signaaleiwitten (Grb2 en SOS). Die zetten Ras aan: het signaal is binnen. Klik op Ras om de kettingreactie te volgen.', en: 'Signalling proteins (Grb2 and SOS) dock on the phosphate groups. They switch Ras on: the signal is inside. Click Ras to follow the chain reaction.' } },
      },
    },
  },
  'mapk': {
    hobby: {
      kort: { nl: 'Aan de binnenkant van de celrand zit een aan/uit-knop. Eenmaal aan start die een kettingreactie van drie eiwitten die elkaar aanzetten, zodat het signaal groter wordt. Blijft de knop door een fout in het DNA vast aanstaan, dan kan dat bijdragen tot kanker.', en: 'On the inside of the cell edge sits an on/off switch. Once on, it starts a chain reaction of three proteins that switch each other on, so the signal grows. If a fault in the DNA keeps the switch stuck on, that can help cause cancer.' },
      steps: {
        0: { tag: ['drie helpers', 'three helpers'], title: { nl: 'Van de celrand naar de kern', en: 'From the cell edge to the nucleus' }, text: { nl: 'Drie eiwitten wachten. Elk kan een klein labeltje op een ander eiwit zetten; samen brengen ze het signaal naar de kern.', en: 'Three proteins wait. Each can put a little tag on another protein; together they carry the signal to the nucleus.' } },
        1: { tag: ['knop aan', 'switch on'], title: { nl: 'De aan/uit-knop gaat aan', en: 'The on/off switch turns on' }, text: { nl: 'De knop houdt een klein stofje vast. Een helper ruilt het uit-stofje voor het aan-stofje, en de knop gaat aan.', en: 'The switch holds a small molecule. A helper swaps the off molecule for the on molecule, and the switch turns on.' } },
        5: { tag: ['versterking', 'boost'], title: { nl: 'Elke stap maakt het signaal groter', en: 'Each step makes the signal bigger' }, text: { nl: 'Eén actief eiwit kan er vele van het volgende aanzetten. Zo wordt een klein signaal groot.', en: 'One active protein can switch on many of the next one. That is how a small signal becomes big.' } },
        6: { tag: ['naar de kern', 'to the nucleus'], title: { nl: 'Het laatste eiwit gaat de kern in', en: 'The last protein enters the nucleus' }, text: { nl: 'Een deel van het laatste eiwit gaat de celkern in. Daar zet het labeltjes op gen-schakelaars.', en: 'Some of the last protein moves into the nucleus. There it puts tags on gene switches.' } },
      },
    },
    secundair: {
      kort: { nl: 'Ras is een schakelaar aan de binnenkant van het membraan: aan met GTP, uit met GDP. Actief Ras start een cascade van drie kinasen die elkaar aanzetten en zo het signaal versterken. Een mutatie die Ras vast aanzet, kan bijdragen tot kanker.', en: 'Ras is a switch on the inside of the membrane: on with GTP, off with GDP. Active Ras starts a cascade of three kinases that switch each other on and so amplify the signal. A mutation that locks Ras on can help cause cancer.' },
      terms: [
        [{ nl: 'Ras', en: 'Ras' }, { nl: 'Schakelaar-eiwit aan het membraan: aan met GTP, uit met GDP.', en: 'Switch protein at the membrane: on with GTP, off with GDP.' }],
        [{ nl: 'kinase', en: 'kinase' }, { nl: 'Enzym dat een fosfaatgroep op een eiwit zet.', en: 'Enzyme that puts a phosphate group on a protein.' }],
        [{ nl: 'cascade', en: 'cascade' }, { nl: 'Kettingreactie waarbij elk eiwit het volgende aanzet en het signaal versterkt.', en: 'Chain reaction in which each protein switches on the next and amplifies the signal.' }],
        [{ nl: 'mutatie', en: 'mutation' }, { nl: 'Verandering in het DNA.', en: 'Change in the DNA.' }],
      ],
      steps: {
        0: { tag: ['kinasen', 'kinases'], title: { nl: 'Drie kinasen van membraan naar kern', en: 'Three kinases from membrane to nucleus' }, text: { nl: 'Drie kinasen, enzymen die fosfaat op eiwitten zetten, wachten. Samen brengen ze het signaal naar de kern.', en: 'Three kinases, enzymes that put phosphate on proteins, are waiting. Together they carry the signal to the nucleus.' } },
        1: { tag: ['Ras aan', 'Ras on'], title: { nl: 'SOS zet Ras aan', en: 'SOS switches Ras on' }, text: { nl: 'Ras staat uit met GDP en aan met GTP. Het eiwit SOS wrikt het GDP los; Ras neemt GTP op en gaat aan.', en: 'Ras is off with GDP and on with GTP. The protein SOS prises the GDP loose; Ras takes up GTP and turns on.' } },
        5: { tag: ['versterking', 'amplification'], title: { nl: 'Elke stap versterkt het signaal', en: 'Each step amplifies the signal' }, text: { nl: 'Eén actief kinase kan vele moleculen van het volgende kinase aanzetten. Zo wordt een klein signaal groot.', en: 'One active kinase can switch on many molecules of the next kinase. That is how a small signal becomes big.' } },
        6: { tag: ['ERK kern in', 'ERK to nucleus'], title: { nl: 'ERK gaat de kern in', en: 'ERK enters the nucleus' }, text: { nl: 'Een deel van het actieve ERK gaat de kern in. Daar zet het fosfaat op transcriptiefactoren, de schakelaars van genen.', en: 'Some of the active ERK moves into the nucleus. There it puts phosphate on transcription factors, the switches of genes.' } },
      },
    },
  },
};
