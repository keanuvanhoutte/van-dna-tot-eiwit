/* Eenvoudige teksten voor de niveaus hobbyist en secundair (groep prot). Sleutels van steps = stapnummer in de animatie. */
export default {
  'vouwing': {
    hobby: {
      kort: { nl: 'Een pas gemaakt eiwit is eerst een lange, slappe ketting. Meestal vouwt die zich vanzelf tot één vaste vorm. Pas met die vorm kan het eiwit zijn werk doen.', en: 'A newly made protein starts as a long, floppy chain. Usually it folds by itself into one fixed shape. Only with that shape can the protein do its job.' },
      steps: {
        0: { tag: ['uit het fabriekje', 'out of factory'], title: { nl: 'De ketting komt uit het fabriekje', en: 'The chain leaves the factory' }, text: { nl: 'Het ribosoom, het fabriekje dat eiwitten bouwt, duwt de nieuwe ketting naar buiten; die begint al te vouwen terwijl ze nog groeit.', en: 'The ribosome, the little factory that builds proteins, pushes the new chain out; it starts folding while it is still growing.' } },
        2: { tag: ['samenklappen', 'collapse'], title: { nl: 'De ketting klapt samen', en: 'The chain collapses' }, text: { nl: 'Stukjes die water mijden kruipen bij elkaar en duwen het water weg, zodat de ketting snel een compact bolletje wordt.', en: 'Bits that avoid water huddle together and push the water away, so the chain quickly becomes a compact ball.' } },
        4: { tag: ['vanzelf terug', 'folds back'], title: { nl: 'De volgorde bepaalt de vorm', en: 'The order decides the shape' }, text: { nl: 'Een onderzoeker haalde een eiwit uit zijn vorm met chemische stoffen; zonder die stoffen vouwde het vanzelf terug en werkte het weer.', en: 'A scientist undid a protein’s shape with chemicals; once they were gone, it folded back by itself and worked again.' } },
        8: { tag: ['vier lagen', 'four levels'], title: { nl: 'Van ketting naar vorm in vier lagen', en: 'From chain to shape in four levels' }, text: { nl: 'Eerst de volgorde van de bouwsteentjes, dan spiralen en platte stukjes, dan de vorm van één ketting, en soms meerdere kettingen samen.', en: 'First the order of the building blocks, then spirals and flat bits, then the shape of one chain, and sometimes several chains together.' } },
      },
    },
    secundair: {
      kort: { nl: 'Eiwitvouwing is het proces waarbij een polypeptideketen haar vaste 3D-vorm aanneemt: de natieve structuur. De informatie daarvoor zit in de aminozuurvolgorde zelf. Vouwen begint vaak al tijdens de translatie.', en: 'Protein folding is the process in which a polypeptide chain takes on its fixed 3D shape: the native structure. The information for it lies in the amino acid sequence itself. Folding often starts during translation.' },
      terms: [
        [{ nl: 'polypeptideketen', en: 'polypeptide chain' }, { nl: 'Een keten van aminozuren, gekoppeld door peptidebindingen.', en: 'A chain of amino acids linked by peptide bonds.' }],
        [{ nl: 'natieve structuur', en: 'native structure' }, { nl: 'De vaste, werkende 3D-vorm van een eiwit.', en: 'The fixed, working 3D shape of a protein.' }],
        [{ nl: 'hydrofoob', en: 'hydrophobic' }, { nl: 'Waterschuw: hydrofobe zijketens kruipen samen binnenin het eiwit.', en: 'Water-avoiding: hydrophobic side chains huddle together inside the protein.' }],
        [{ nl: 'co-translationeel vouwen', en: 'co-translational folding' }, { nl: 'Vouwen terwijl de keten nog uit het ribosoom komt.', en: 'Folding while the chain is still coming out of the ribosome.' }],
      ],
      steps: {
        0: { tag: ['ribosoom', 'ribosome'], title: { nl: 'De keten komt uit het ribosoom', en: 'The chain leaves the ribosome' }, text: { nl: 'De polypeptideketen verlaat het ribosoom met haar begin eerst. Ze begint al te vouwen terwijl ze nog groeit: co-translationeel vouwen.', en: 'The polypeptide chain leaves the ribosome start first. It begins to fold while still growing: co-translational folding.' } },
        2: { tag: ['hydrofoob', 'hydrophobic'], title: { nl: 'Hydrofobe aminozuren klappen samen', en: 'Hydrophobic amino acids collapse' }, text: { nl: 'Hydrofobe (waterschuwe) aminozuren kruipen samen en duwen water weg. Zo wordt de keten snel compact.', en: 'Hydrophobic (water-avoiding) amino acids huddle together and push water away. The chain quickly becomes compact.' } },
        4: { tag: ['Anfinsen', 'Anfinsen'], title: { nl: 'De aminozuurvolgorde bepaalt de vorm', en: 'The sequence decides the shape' }, text: { nl: 'Anfinsen ontvouwde een enzym met chemicaliën. Zonder die stoffen vouwde het vanzelf terug: de volgorde bevat de informatie voor de vorm.', en: 'Anfinsen unfolded an enzyme with chemicals. Without them it refolded by itself: the sequence holds the information for the shape.' } },
        8: { tag: ['vier niveaus', 'four levels'], title: { nl: 'Vier structuurniveaus', en: 'Four levels of structure' }, text: { nl: 'Primair (volgorde) → secundair (helices, bladen) → tertiair (één keten) → quaternair (meerdere ketens).', en: 'Primary (sequence) → secondary (helices, sheets) → tertiary (one chain) → quaternary (several chains).' } },
      },
    },
  },
  'primair': {
    hobby: {
      kort: { nl: 'Een eiwit is een ketting van kleine bouwsteentjes. De volgorde van die bouwsteentjes, van begin tot einde, komt rechtstreeks uit het RNA. Die volgorde bepaalt hoe het eiwit later vouwt.', en: 'A protein is a chain of small building blocks. Their order, from start to end, comes straight from the RNA. That order decides how the protein folds later.' },
      steps: {
        0: { tag: ['RNA lezen', 'reading RNA'], title: { nl: 'Van RNA naar bouwsteentjes', en: 'From RNA to building blocks' }, text: { nl: 'Het eiwitfabriekje las het RNA per drie letters, en elk groepje van drie gaf één bouwsteentje voor de ketting.', en: 'The protein factory read the RNA three letters at a time, and each group of three gave one building block for the chain.' } },
        1: { tag: ['volgorde', 'order'], title: { nl: 'De volgorde, van begin tot einde', en: 'The order, from start to end' }, text: { nl: 'Hoe de bouwsteentjes na elkaar komen, is de eerste laag van een eiwit; dit eiwit heeft er 146 op een rij.', en: 'The order of the building blocks is the first level of a protein; this one has 146 in a row.' } },
        5: { tag: ['sikkelcel', 'sickle cell'], title: { nl: 'Eén letter anders: sikkelcelziekte', en: 'One letter changed: sickle cell disease' }, text: { nl: 'Op plaats 6 is één letter anders, waardoor een geladen bouwsteentje vervangen wordt door eentje dat water mijdt.', en: 'At position 6 one letter is different, so a charged building block is swapped for one that avoids water.' } },
      },
    },
    secundair: {
      kort: { nl: 'De primaire structuur is de aminozuurvolgorde van een polypeptideketen, van N-terminus tot C-terminus. Ze wordt bij de translatie vastgelegd door de codons van het mRNA. Ze bepaalt uiteindelijk de 3D-vorm van het eiwit.', en: 'The primary structure is the amino acid sequence of a polypeptide chain, from N-terminus to C-terminus. It is set during translation by the codons of the mRNA. It ultimately decides the protein’s 3D shape.' },
      terms: [
        [{ nl: 'primaire structuur', en: 'primary structure' }, { nl: 'De volgorde van de aminozuren in een eiwitketen.', en: 'The order of the amino acids in a protein chain.' }],
        [{ nl: 'codon', en: 'codon' }, { nl: 'Drie letters in het mRNA die samen één aminozuur bepalen.', en: 'Three letters in the mRNA that together specify one amino acid.' }],
        [{ nl: 'N- en C-terminus', en: 'N- and C-terminus' }, { nl: 'Het begin (vrije aminogroep) en het einde (vrije carboxylgroep) van de keten.', en: 'The start (free amino group) and the end (free carboxyl group) of the chain.' }],
      ],
      steps: {
        0: { tag: ['codon', 'codon'], title: { nl: 'Van codons naar aminozuren', en: 'From codons to amino acids' }, text: { nl: 'Het ribosoom las het mRNA per drie letters: een codon. Elk codon gaf één aminozuur.', en: 'The ribosome read the mRNA three letters at a time: a codon. Each codon gave one amino acid.' } },
        1: { tag: ['primaire structuur', 'primary structure'], title: { nl: 'Primaire structuur: de volgorde', en: 'Primary structure: the sequence' }, text: { nl: 'De primaire structuur is de volgorde van de aminozuren, van N-terminus (begin) tot C-terminus (einde).', en: 'The primary structure is the order of the amino acids, from N-terminus (start) to C-terminus (end).' } },
        5: { tag: ['sikkelcel', 'sickle cell'], title: { nl: 'Eén codon anders: sikkelcelziekte', en: 'One codon changed: sickle cell disease' }, text: { nl: 'Door één andere letter in een codon wordt glutamaat (negatief geladen) vervangen door valine (hydrofoob).', en: 'One changed letter in a codon replaces glutamate (negatively charged) with valine (hydrophobic).' } },
      },
    },
  },
  'secundair': {
    hobby: {
      kort: { nl: 'Korte stukken van een eiwitketting nemen eenvoudige vormen aan: een spiraal, zoals een krulsnoer, of een plat stuk. Zwakke bruggetjes houden ze op hun plaats. Het zijn de eerste bouwblokken van de vorm.', en: 'Short parts of a protein chain take simple shapes: a spiral, like a curly phone cord, or a flat stretch. Weak little bridges hold them in place. They are the first building blocks of the shape.' },
      steps: {
        0: { tag: ['drie vormen', 'three shapes'], title: { nl: 'Stukjes met een vaste vorm', en: 'Bits with a fixed shape' }, text: { nl: 'Stukjes van de ketting worden een spiraal, een plat stuk of een losse lus, en dit kleine eiwit heeft ze alle drie.', en: 'Parts of the chain become a spiral, a flat stretch or a loose loop, and this small protein has all three.' } },
        1: { tag: ['spiraal', 'spiral'], title: { nl: 'De spiraal', en: 'The spiral' }, text: { nl: 'De ketting draait rond als een schroef, met iets meer dan drie bouwsteentjes per draai.', en: 'The chain winds round like a screw, with a little more than three building blocks per turn.' } },
        5: { tag: ['gestrekt stuk', 'straight stretch'], title: { nl: 'Het gestrekte stuk', en: 'The straight stretch' }, text: { nl: 'Een gestrekt stuk ketting ligt pas stevig naast een tweede stuk; met een korte bocht ertussen lijkt het een haarspeld.', en: 'A straight stretch of chain is only stable next to a second one; with a short bend between them it looks like a hairpin.' } },
        9: { tag: ['lussen', 'loops'], title: { nl: 'Lussen verbinden alles', en: 'Loops link everything' }, text: { nl: 'Lussen verbinden de spiralen en de gestrekte stukken; ze liggen meestal aan de buitenkant en helpen vaak bij het werk.', en: 'Loops link the spirals and the straight stretches; they usually sit on the outside and often help with the job.' } },
      },
    },
    secundair: {
      kort: { nl: 'De secundaire structuur is de plaatselijke, regelmatige vorm van de ruggengraat van de keten. De belangrijkste vormen zijn de α-helix en de β-streng, die samen β-bladen vormen; lussen verbinden ze. Waterstofbruggen houden ze op hun plaats.', en: 'Secondary structure is the local, regular shape of the chain’s backbone. The main forms are the α-helix and the β-strand, which together form β-sheets; loops connect them. Hydrogen bonds hold them in place.' },
      terms: [
        [{ nl: 'α-helix', en: 'α-helix' }, { nl: 'Een stuk keten dat als een rechtse schroef ronddraait.', en: 'A stretch of chain that winds like a right-handed screw.' }],
        [{ nl: 'β-streng en β-blad', en: 'β-strand and β-sheet' }, { nl: 'Gestrekte stukken keten die naast elkaar een plat blad vormen.', en: 'Stretched parts of the chain that lie side by side to form a flat sheet.' }],
        [{ nl: 'waterstofbrug', en: 'hydrogen bond' }, { nl: 'Een zwakke binding die helices en bladen op hun plaats houdt.', en: 'A weak bond that holds helices and sheets in place.' }],
        [{ nl: 'lus', en: 'loop' }, { nl: 'Een stuk keten zonder regelmatige vorm dat helices en strengen verbindt.', en: 'A stretch of chain without a regular shape that connects helices and strands.' }],
      ],
      steps: {
        0: { tag: ['overzicht', 'overview'], title: { nl: 'Plaatselijke vormen', en: 'Local shapes' }, text: { nl: 'Stukken van de keten krijgen een vaste vorm: α-helix, β-streng of lus. Ubiquitine heeft ze alle drie.', en: 'Parts of the chain get a fixed shape: α-helix, β-strand or loop. Ubiquitin has all three.' } },
        1: { tag: ['α-helix', 'α-helix'], title: { nl: 'De α-helix: een spiraal', en: 'The α-helix: a spiral' }, text: { nl: 'De keten draait als een schroef met rechtse draad. Waterstofbruggen houden de spiraal stevig.', en: 'The chain winds like a right-handed screw. Hydrogen bonds keep the spiral firm.' } },
        5: { tag: ['β-streng', 'β-strand'], title: { nl: 'De β-streng: uitgestrekt', en: 'The β-strand: stretched out' }, text: { nl: 'Een gestrekte β-streng is pas stabiel naast een buurstreng: samen vormen ze een β-blad. Twee strengen met een korte bocht: een haarspeld.', en: 'A stretched β-strand is only stable next to a neighbour: together they form a β-sheet. Two strands with a short bend: a hairpin.' } },
        9: { tag: ['lussen', 'loops'], title: { nl: 'Lussen verbinden alles', en: 'Loops connect everything' }, text: { nl: 'Lussen verbinden helices en strengen. Ze liggen meestal aan de buitenkant en doen vaak mee aan de functie.', en: 'Loops connect helices and strands. They usually lie on the outside and often take part in the function.' } },
      },
    },
  },
  'tertiair': {
    hobby: {
      kort: { nl: 'Eén eiwitketting vouwt zich helemaal op tot een compact bolletje. Stukjes die water mijden zitten binnenin, stukjes die water zoeken buiten. Zo ontstaan plekjes waar het eiwit iets kan vastpakken, zoals zuurstof in het bloed.', en: 'One protein chain folds up completely into a compact ball. Bits that avoid water sit inside, bits that like water sit outside. This creates little spots where the protein can hold something, such as oxygen in the blood.' },
      steps: {
        0: { tag: ['bolletje', 'little ball'], title: { nl: 'Eén ketting, één bolletje', en: 'One chain, one ball' }, text: { nl: 'Deze ketting vouwt tot een compact bolletje; de kleur loopt van blauw aan het begin tot rood aan het einde.', en: 'This chain folds into a compact ball; the colour runs from blue at the start to red at the end.' } },
        2: { tag: ['droge kern', 'dry core'], title: { nl: 'Binnenin: alles wat water mijdt', en: 'Inside: everything that avoids water' }, text: { nl: 'Binnenin zitten bijna alleen groene stukjes die water mijden, en hun samenklonteren drijft het vouwen aan.', en: 'Inside sit almost only green bits that avoid water, and their clumping together drives the folding.' } },
        4: { tag: ['zakje', 'pocket'], title: { nl: 'Een zakje voor een ijzerringetje', en: 'A pocket for an iron ring' }, text: { nl: 'Een ringetje met ijzer erin ligt in een droog zakje van het eiwit, en daar wordt zuurstof vastgepakt.', en: 'A little ring with iron in it sits in a dry pocket of the protein, and that is where oxygen is held.' } },
        9: { tag: ['vier kettingen', 'four chains'], title: { nl: 'Nog niet het hele eiwit', en: 'Not yet the whole protein' }, text: { nl: 'Het rode bloedeiwit bestaat uit vier zulke kettingen; hoe die samen passen, is de volgende laag.', en: 'The red blood protein is made of four such chains; how they fit together is the next level.' } },
      },
    },
    secundair: {
      kort: { nl: 'De tertiaire structuur is de volledige 3D-vouw van één polypeptideketen: helices, strengen en lussen samen. Hydrofobe zijketens zitten binnenin, hydrofiele buiten. Zo ontstaan bindingsplaatsen, zoals het zakje voor het heem in hemoglobine.', en: 'Tertiary structure is the complete 3D fold of one polypeptide chain: helices, strands and loops together. Hydrophobic side chains sit inside, hydrophilic ones outside. This creates binding sites, such as the pocket for the heme in haemoglobin.' },
      terms: [
        [{ nl: 'tertiaire structuur', en: 'tertiary structure' }, { nl: 'De volledige 3D-vouw van één keten.', en: 'The complete 3D fold of one chain.' }],
        [{ nl: 'hydrofobe kern', en: 'hydrophobic core' }, { nl: 'Het binnenste van het eiwit, waar waterschuwe zijketens samen zitten.', en: 'The inside of the protein, where water-avoiding side chains gather.' }],
        [{ nl: 'zijketen', en: 'side chain' }, { nl: 'Het deel van een aminozuur dat verschilt en zijn eigenschappen bepaalt.', en: 'The part of an amino acid that differs and sets its properties.' }],
        [{ nl: 'heem', en: 'heme' }, { nl: 'Een ring met een ijzeratoom die zuurstof bindt.', en: 'A ring with an iron atom that binds oxygen.' }],
      ],
      steps: {
        0: { tag: ['tertiaire vouw', 'tertiary fold'], title: { nl: 'Eén keten, één vouw', en: 'One chain, one fold' }, text: { nl: 'De β-globineketen vouwt tot een compact bolletje. Kleur: van begin (blauw) tot einde (rood).', en: 'The β-globin chain folds into a compact ball. Colour: from start (blue) to end (red).' } },
        2: { tag: ['hydrofobe kern', 'hydrophobic core'], title: { nl: 'Een hydrofobe kern', en: 'A hydrophobic core' }, text: { nl: 'Binnenin zitten bijna alleen hydrofobe zijketens (groen). Hun samenklonteren drijft de vouwing aan.', en: 'Inside sit almost only hydrophobic side chains (green). Their clumping together drives the folding.' } },
        4: { tag: ['heem', 'heme'], title: { nl: 'Een zakje voor het heem', en: 'A pocket for the heme' }, text: { nl: 'Het heem, een ring met een ijzeratoom, ligt in een hydrofoob zakje. Daar bindt zuurstof (in dit model CO).', en: 'The heme, a ring with an iron atom, lies in a hydrophobic pocket. Oxygen binds there (CO in this model).' } },
        9: { tag: ['quaternair', 'quaternary'], title: { nl: 'Nog niet het hele eiwit', en: 'Not yet the whole protein' }, text: { nl: 'Hemoglobine bestaat uit vier zulke ketens. Hoe ze samen passen, heet de quaternaire structuur.', en: 'Haemoglobin is made of four such chains. How they fit together is called the quaternary structure.' } },
      },
    },
  },
  'quaternair': {
    hobby: {
      kort: { nl: 'Sommige eiwitten bestaan uit meerdere kettingen die samen één geheel vormen. Het rode bloedeiwit dat zuurstof vervoert, heeft er vier. Omdat die kettingen elkaar beïnvloeden, kan het zuurstof goed opnemen en weer afgeven.', en: 'Some proteins are made of several chains that form one whole. The red blood protein that carries oxygen has four. Because the chains affect each other, it can pick up oxygen well and release it again.' },
      steps: {
        0: { tag: ['vier kettingen', 'four chains'], title: { nl: 'Vier kettingen samen', en: 'Four chains together' }, text: { nl: 'Hemoglobine, het rode bloedeiwit, heeft vier kettingen van twee soorten, elk met een ijzerringetje dat zuurstof vasthoudt.', en: 'Haemoglobin, the red blood protein, has four chains of two kinds, each with an iron ring that holds oxygen.' } },
        6: { tag: ['samenwerken', 'teamwork'], title: { nl: 'De vier kettingen helpen elkaar', en: 'The four chains help each other' }, text: { nl: 'Elke ketting pakt één zuurstofdeeltje vast: het eerste gaat moeilijk, de volgende gaan steeds makkelijker.', en: 'Each chain grabs one oxygen particle: the first is hard, the next ones get easier and easier.' } },
        7: { tag: ['sikkelcel', 'sickle cell'], title: { nl: 'Eén fout: sikkelcelziekte', en: 'One mistake: sickle cell disease' }, text: { nl: 'Door één fout bouwsteentje krijgt het eiwit een plakkerige plek, en zonder zuurstof plakken zulke eiwitten aaneen tot lange draden.', en: 'One wrong building block gives the protein a sticky spot, and without oxygen these proteins stick together into long threads.' } },
      },
    },
    secundair: {
      kort: { nl: 'De quaternaire structuur is de schikking van meerdere polypeptideketens, de subeenheden, in één eiwitcomplex. Hemoglobine heeft er vier: twee α- en twee β-ketens. Doordat de ketens elkaar beïnvloeden (coöperativiteit), neemt hemoglobine zuurstof goed op en geeft het weer af.', en: 'Quaternary structure is the arrangement of several polypeptide chains, the subunits, in one protein complex. Haemoglobin has four: two α and two β chains. Because the chains influence each other (cooperativity), haemoglobin takes up oxygen well and releases it again.' },
      terms: [
        [{ nl: 'subeenheid', en: 'subunit' }, { nl: 'Eén polypeptideketen binnen een eiwitcomplex.', en: 'One polypeptide chain within a protein complex.' }],
        [{ nl: 'quaternaire structuur', en: 'quaternary structure' }, { nl: 'Hoe meerdere ketens samen één eiwit vormen.', en: 'How several chains together form one protein.' }],
        [{ nl: 'coöperativiteit', en: 'cooperativity' }, { nl: 'Binding op de ene subeenheid maakt binding op de andere makkelijker.', en: 'Binding at one subunit makes binding at the others easier.' }],
        [{ nl: 'heteromeer', en: 'heteromer' }, { nl: 'Een complex uit verschillende ketens; uit identieke ketens heet het een homomeer.', en: 'A complex of different chains; one of identical chains is a homomer.' }],
      ],
      steps: {
        0: { tag: ['subeenheden', 'subunits'], title: { nl: 'Vier subeenheden samen', en: 'Four subunits together' }, text: { nl: 'Hemoglobine heeft vier subeenheden: twee α- en twee β-ketens. Elke keten heeft een heem dat zuurstof bindt.', en: 'Haemoglobin has four subunits: two α and two β chains. Each chain has a heme that binds oxygen.' } },
        6: { tag: ['coöperativiteit', 'cooperativity'], title: { nl: 'Coöperatieve binding', en: 'Cooperative binding' }, text: { nl: 'Elke keten bindt één zuurstofmolecuul. Het eerste bindt moeilijk, de volgende makkelijker: coöperativiteit. (Dit model bindt CO.)', en: 'Each chain binds one oxygen molecule. The first binds with difficulty, the next ones more easily: cooperativity. (This model binds CO.)' } },
        7: { tag: ['sikkelcel', 'sickle cell'], title: { nl: 'Eén fout: sikkelcelhemoglobine', en: 'One mistake: sickle cell haemoglobin' }, text: { nl: 'In de β-keten staat valine in plaats van glutamaat. Zonder zuurstof plakt die hydrofobe plek hemoglobines aaneen tot vezels.', en: 'The β chain has valine instead of glutamate. Without oxygen, that hydrophobic spot sticks haemoglobins together into fibres.' } },
      },
    },
  },
  'aminozuren': {
    hobby: {
      kort: { nl: 'Eiwitten zijn kettingen van kleine bouwsteentjes: de aminozuren, waarvan er 20 soorten zijn. Ze hebben allemaal hetzelfde basisstuk met één eigen zijstukje. Of dat zijstukje water mijdt, water zoekt of geladen is, bepaalt waar het in het eiwit komt.', en: 'Proteins are chains of small building blocks: the amino acids, which come in 20 kinds. They all share the same base with one side piece of their own. Whether that piece avoids water, likes water or is charged decides where it ends up in the protein.' },
      steps: {
        0: { tag: ['bouwsteentje', 'building block'], title: { nl: 'Het bouwsteentje van een eiwit', en: 'The building block of a protein' }, text: { nl: 'Elk bouwsteentje heeft hetzelfde basisstuk met één eigen zijstukje, en alleen dat zijstukje verschilt.', en: 'Each building block has the same base with one side piece of its own, and only that side piece differs.' } },
        1: { tag: ['twintig soorten', 'twenty kinds'], title: { nl: 'Twintig soorten bouwsteentjes', en: 'Twenty kinds of building blocks' }, text: { nl: 'Alle levende wezens gebruiken dezelfde 20 soorten, en elk heeft een naam, korte codes en een eigen eigenschap.', en: 'All living things use the same 20 kinds, and each has a name, short codes and a property of its own.' } },
        2: { tag: ['mijdt water', 'avoids water'], title: { nl: 'Bouwsteentjes die water mijden', en: 'Building blocks that avoid water' }, text: { nl: 'Deze zijstukjes houden niet van water en zitten meestal binnenin het eiwit; de twee gele zijn speciale gevallen.', en: 'These side pieces dislike water and usually sit inside the protein; the two yellow ones are special cases.' } },
        9: { tag: ['test jezelf', 'test yourself'], title: { nl: 'Test jezelf', en: 'Test yourself' }, text: { nl: 'Welk bouwsteentje hoort bij elke letter? De namen verschijnen één voor één.', en: 'Which building block goes with each letter? The names appear one by one.' } },
      },
    },
    secundair: {
      kort: { nl: 'Eiwitten zijn opgebouwd uit 20 standaard-aminozuren. Elk heeft een centraal Cα-atoom met een aminogroep, een carboxylgroep, een H-atoom en een zijketen (R). De zijketen bepaalt of een aminozuur hydrofoob, polair of geladen is.', en: 'Proteins are built from 20 standard amino acids. Each has a central Cα atom with an amino group, a carboxyl group, an H atom and a side chain (R). The side chain decides whether an amino acid is hydrophobic, polar or charged.' },
      terms: [
        [{ nl: 'aminozuur', en: 'amino acid' }, { nl: 'De bouwsteen van eiwitten, met een aminogroep, een carboxylgroep en een zijketen.', en: 'The building block of proteins, with an amino group, a carboxyl group and a side chain.' }],
        [{ nl: 'zijketen (R)', en: 'side chain (R)' }, { nl: 'Het deel dat per aminozuur verschilt en zijn eigenschappen bepaalt.', en: 'The part that differs per amino acid and sets its properties.' }],
        [{ nl: 'hydrofoob', en: 'hydrophobic' }, { nl: 'Waterschuw: zulke zijketens zitten meestal binnenin het eiwit.', en: 'Water-avoiding: such side chains usually sit inside the protein.' }],
        [{ nl: 'drie- en éénlettercode', en: 'three- and one-letter code' }, { nl: 'Korte afkortingen voor elk aminozuur, zoals Gly of G.', en: 'Short abbreviations for each amino acid, such as Gly or G.' }],
      ],
      steps: {
        0: { tag: ['zijketen', 'side chain'], title: { nl: 'Bouwsteen: het aminozuur', en: 'Building block: the amino acid' }, text: { nl: 'Rond het centrale Cα-atoom zitten een aminogroep, een carboxylgroep, een H-atoom en een zijketen (R). Alleen R verschilt.', en: 'Around the central Cα atom sit an amino group, a carboxyl group, an H atom and a side chain (R). Only R differs.' } },
        1: { tag: ['20 aminozuren', '20 amino acids'], title: { nl: 'De 20 standaard-aminozuren', en: 'The 20 standard amino acids' }, text: { nl: 'Alle levende wezens gebruiken dezelfde 20. Elk heeft een naam, een drie- en een éénlettercode en een eigen eigenschap.', en: 'All living things use the same 20. Each has a name, a three- and a one-letter code and its own property.' } },
        2: { tag: ['hydrofoob', 'hydrophobic'], title: { nl: 'Hydrofobe aminozuren', en: 'Hydrophobic amino acids' }, text: { nl: 'Hydrofobe zijketens mijden water en zitten meestal binnenin het eiwit. Glycine en proline (geel) zijn aparte gevallen.', en: 'Hydrophobic side chains avoid water and usually sit inside the protein. Glycine and proline (yellow) are special cases.' } },
        9: { tag: ['test jezelf', 'test yourself'], title: { nl: 'Test jezelf', en: 'Test yourself' }, text: { nl: 'Welk aminozuur hoort bij elke letter? De namen verschijnen één voor één.', en: 'Which amino acid belongs to each letter? The names appear one by one.' } },
      },
    },
  },
  'peptide': {
    hobby: {
      kort: { nl: 'De bouwsteentjes van een eiwit worden aan elkaar geklikt, en bij elke koppeling komt een beetje water vrij. Die koppeling is plat en stijf, dus de ketting kan alleen tussen de koppelingen in draaien. Daardoor kan een eiwit maar bepaalde vormen aannemen.', en: 'The building blocks of a protein click together, and each link releases a little water. That link is flat and stiff, so the chain can only turn between the links. That is why a protein can take only certain shapes.' },
      steps: {
        0: { tag: ['twee steentjes', 'two blocks'], title: { nl: 'Twee bouwsteentjes', en: 'Two building blocks' }, text: { nl: 'Hier zie je twee bouwsteentjes, elk met een kant links en een kant rechts die aan een ander kan vastklikken.', en: 'Here are two building blocks, each with a left end and a right end that can click onto another one.' } },
        1: { tag: ['water vrij', 'water released'], title: { nl: 'Vastklikken: er komt water vrij', en: 'Clicking together: water is released' }, text: { nl: 'Van elk bouwsteentje gaat een klein stukje af; samen vormen die stukjes water, en zo raken de twee aan elkaar.', en: 'Each building block loses a tiny piece; together those pieces form water, and so the two become joined.' } },
        2: { tag: ['de koppeling', 'the link'], title: { nl: 'De peptidebinding', en: 'The peptide bond' }, text: { nl: 'Die nieuwe koppeling heet de peptidebinding, de knoop tussen twee bouwsteentjes, en het stukje heeft nu een begin en een einde.', en: 'This new link is called the peptide bond, the knot between two building blocks, and the piece now has a start and an end.' } },
        8: { tag: ['ruggengraat', 'backbone'], title: { nl: 'Zo ontstaat een ketting', en: 'This is how a chain forms' }, text: { nl: 'Hetzelfde patroon telkens herhaald vormt de ruggengraat van de ketting; wordt die lang genoeg, dan is het een eiwit.', en: 'The same pattern repeated again and again forms the backbone of the chain; once it is long enough, it is a protein.' } },
      },
    },
    secundair: {
      kort: { nl: 'De peptidebinding koppelt de carboxylgroep van één aminozuur aan de aminogroep van het volgende; daarbij komt water vrij (condensatie). De binding is vlak en star. Draaien kan alleen rond de bindingen naast het Cα-atoom, de hoeken φ en ψ.', en: 'The peptide bond links the carboxyl group of one amino acid to the amino group of the next; water is released (condensation). The bond is flat and rigid. Rotation is only possible around the bonds next to the Cα atom, the angles φ and ψ.' },
      terms: [
        [{ nl: 'peptidebinding', en: 'peptide bond' }, { nl: 'De vlakke, starre C–N-binding tussen twee aminozuren.', en: 'The flat, rigid C–N bond between two amino acids.' }],
        [{ nl: 'condensatie', en: 'condensation' }, { nl: 'Een reactie waarbij twee moleculen koppelen en water vrijkomt.', en: 'A reaction in which two molecules join and water is released.' }],
        [{ nl: 'ruggengraat', en: 'backbone' }, { nl: 'De herhaalde reeks N–Cα–C die de keten vormt.', en: 'The repeated N–Cα–C series that forms the chain.' }],
      ],
      steps: {
        0: { tag: ['aminogroep', 'amino group'], title: { nl: 'Twee aminozuren', en: 'Two amino acids' }, text: { nl: 'Glycine en alanine, elk met een aminogroep (links) en een carboxylgroep (rechts).', en: 'Glycine and alanine, each with an amino group (left) and a carboxyl group (right).' } },
        1: { tag: ['condensatie', 'condensation'], title: { nl: 'Condensatie: er komt water vrij', en: 'Condensation: water is released' }, text: { nl: 'De carboxylgroep geeft OH af, de aminogroep een H: samen water. Zo raken C en N aan elkaar.', en: 'The carboxyl group gives up OH, the amino group an H: together water. That joins C and N.' } },
        2: { tag: ['peptidebinding', 'peptide bond'], title: { nl: 'De peptidebinding', en: 'The peptide bond' }, text: { nl: 'Die nieuwe C–N-binding is de peptidebinding. Het stukje heeft nu een N-uiteinde (begin) en een C-uiteinde (einde).', en: 'This new C–N bond is the peptide bond. The piece now has an N-end (start) and a C-end (end).' } },
        8: { tag: ['ruggengraat', 'backbone'], title: { nl: 'Zo ontstaat een keten', en: 'This is how a chain forms' }, text: { nl: 'N–Cα–C, telkens herhaald, vormt de ruggengraat. Een korte keten heet een peptide, een lange een eiwit.', en: 'N–Cα–C, repeated over and over, forms the backbone. A short chain is a peptide, a long one a protein.' } },
      },
    },
  },
  'ramachandran': {
    hobby: {
      kort: { nl: 'Een eiwitketting kan bij elk bouwsteentje op twee plaatsen draaien. De Ramachandran-plot, een soort kaart, zet die twee draaiingen als één puntje neer. Omdat stukjes niet mogen botsen, liggen de puntjes maar op enkele plekken: zo zie je of een eiwitmodel klopt.', en: 'A protein chain can turn in two places at each building block. The Ramachandran plot, a kind of map, shows those two turns as one dot. Because bits may not bump into each other, the dots land in only a few places: that shows whether a protein model makes sense.' },
      steps: {
        0: { tag: ['één puntje', 'one dot'], title: { nl: 'Elk bouwsteentje wordt één puntje', en: 'Each building block becomes one dot' }, text: { nl: 'De twee draaiingen van een bouwsteentje samen geven één puntje op de kaart, hier voor een mooie spiraal.', en: 'The two turns of a building block together give one dot on the map, here for a perfect spiral.' } },
        1: { tag: ['verboden zones', 'no-go zones'], title: { nl: 'Toegestane en verboden plekken', en: 'Allowed and forbidden areas' }, text: { nl: 'Bij de meeste draaiingen zouden stukjes tegen elkaar botsen, dus blijven alleen de blauwe gebieden over.', en: 'With most turns, bits would bump into each other, so only the blue areas are left.' } },
        3: { tag: ['spiraalwolk', 'spiral cloud'], title: { nl: 'De grote wolk: spiralen', en: 'The big cloud: spirals' }, text: { nl: 'Het rode bloedeiwit bestaat vooral uit spiralen, daarom liggen de meeste puntjes in het spiraalgebied.', en: 'The red blood protein is mostly spirals, so most dots lie in the spiral area.' } },
      },
    },
    secundair: {
      kort: { nl: 'De Ramachandran-plot zet voor elk aminozuur de draaihoek ψ uit tegen φ. Omdat atomen niet mogen botsen (sterische hinder), zijn maar enkele gebieden toegestaan, zoals dat van de α-helix en de β-streng. Zo zie je snel of een eiwitmodel realistisch is.', en: 'The Ramachandran plot shows, for each amino acid, the angle ψ against φ. Because atoms may not clash (steric hindrance), only a few areas are allowed, such as those of the α-helix and the β-strand. It quickly shows whether a protein model is realistic.' },
      terms: [
        [{ nl: 'φ en ψ', en: 'φ and ψ' }, { nl: 'De twee draaihoeken van de keten bij elk aminozuur.', en: 'The two rotation angles of the chain at each amino acid.' }],
        [{ nl: 'sterische hinder', en: 'steric hindrance' }, { nl: 'Atomen die te dicht bij elkaar komen en botsen.', en: 'Atoms that come too close together and clash.' }],
        [{ nl: 'toegestaan gebied', en: 'allowed region' }, { nl: 'Combinaties van φ en ψ zonder botsingen, zoals het helixgebied.', en: 'Combinations of φ and ψ without clashes, such as the helix region.' }],
      ],
      steps: {
        0: { tag: ['φ en ψ', 'φ and ψ'], title: { nl: 'Elk aminozuur = één punt', en: 'Each amino acid = one point' }, text: { nl: 'De twee draaihoeken φ en ψ van een aminozuur vormen samen één punt in de plot. Voorbeeld: een ideale α-helix.', en: 'The two angles φ and ψ of an amino acid together form one point in the plot. Example: an ideal α-helix.' } },
        1: { tag: ['sterische hinder', 'steric clash'], title: { nl: 'Toegestane en verboden gebieden', en: 'Allowed and forbidden regions' }, text: { nl: 'Bij de meeste hoeken botsen atomen: sterische hinder. Alleen de blauwe gebieden blijven over.', en: 'At most angles atoms clash: steric hindrance. Only the blue regions remain.' } },
        3: { tag: ['helixgebied', 'helix region'], title: { nl: 'De grote wolk: α-helices', en: 'The big cloud: α-helices' }, text: { nl: 'Hemoglobine bestaat vooral uit α-helices. Daarom liggen de meeste punten in het helixgebied.', en: 'Haemoglobin consists mainly of α-helices. That is why most points lie in the helix region.' } },
      },
    },
  },
  'ptm': {
    hobby: {
      kort: { nl: 'Als een eiwit gemaakt is, kunnen helpers er nog kleine groepjes aanhangen of stukken afknippen. Zo’n aanpassing kan een eiwit aan- of uitzetten, ergens heen sturen of markeren om afgebroken te worden.', en: 'Once a protein is made, helpers can still attach small groups to it or snip pieces off. Such a change can switch a protein on or off, send it somewhere or mark it to be broken down.' },
      steps: {
        0: { tag: ['extraatjes', 'extras'], title: { nl: 'Na het vouwen: extraatjes', en: 'After folding: extras' }, text: { nl: 'Helpers hangen nog kleine groepjes aan het eiwit of knippen de ketting, zodat het nieuwe eigenschappen krijgt.', en: 'Helpers attach small groups to the protein or cut the chain, so it gains new properties.' } },
        2: { tag: ['groepje erop', 'group added'], title: { nl: 'Een geladen groepje erop', en: 'A charged group goes on' }, text: { nl: 'Een helpereiwit plakt een klein groepje op één bouwsteentje, waardoor die plek nu negatief geladen is.', en: 'A helper protein sticks a small group onto one building block, so that spot is now negatively charged.' } },
        3: { tag: ['schakelaar aan', 'switch on'], title: { nl: 'Schakelaar AAN', en: 'Switch ON' }, text: { nl: 'Positief geladen stukjes trekken het negatieve groepje aan, een lus klapt weg en het eiwit staat aan.', en: 'Positively charged bits pull on the negative group, a loop flips away and the protein is switched on.' } },
        8: { tag: ['afbreeklabel', 'scrap tag'], title: { nl: 'Het laatste label: weg ermee', en: 'The last tag: get rid of it' }, text: { nl: 'Ook een klein eiwitje kan als label aan een eiwit hangen, en een bepaald soort ketting ervan betekent: afbreken.', en: 'A tiny protein can also hang on a protein as a tag, and a certain kind of chain of them means: break it down.' } },
      },
    },
    secundair: {
      kort: { nl: 'Post-translationele modificaties (PTM’s) zijn chemische veranderingen aan een eiwit na de translatie: enzymen hangen groepen aan zijketens of knippen de keten. Zo kan een eiwit aan- of uitgezet, verstuurd of gemarkeerd worden. Een bekend voorbeeld is fosforylatie door een kinase.', en: 'Post-translational modifications (PTMs) are chemical changes to a protein after translation: enzymes attach groups to side chains or cut the chain. This can switch a protein on or off, send it somewhere or mark it. A well-known example is phosphorylation by a kinase.' },
      terms: [
        [{ nl: 'PTM', en: 'PTM' }, { nl: 'Een chemische aanpassing van een eiwit nadat het gemaakt is.', en: 'A chemical change to a protein after it has been made.' }],
        [{ nl: 'fosforylatie', en: 'phosphorylation' }, { nl: 'Het aanhangen van een fosfaatgroep, vaak als aan-uitschakelaar.', en: 'Attaching a phosphate group, often as an on-off switch.' }],
        [{ nl: 'kinase', en: 'kinase' }, { nl: 'Een enzym dat een fosfaatgroep van ATP op een eiwit zet.', en: 'An enzyme that moves a phosphate group from ATP onto a protein.' }],
        [{ nl: 'ubiquitine', en: 'ubiquitin' }, { nl: 'Een klein eiwit dat als label aan andere eiwitten hangt.', en: 'A small protein that is attached to other proteins as a tag.' }],
      ],
      steps: {
        0: { tag: ['PTM', 'PTM'], title: { nl: 'Na de vouwing: modificaties', en: 'After folding: modifications' }, text: { nl: 'Enzymen hangen chemische groepen aan het eiwit of knippen de keten. Zo krijgt het nieuwe eigenschappen.', en: 'Enzymes attach chemical groups to the protein or cut the chain. This gives it new properties.' } },
        2: { tag: ['fosforylatie', 'phosphorylation'], title: { nl: 'Fosforylatie van serine', en: 'Phosphorylation of serine' }, text: { nl: 'Een kinase zet een fosfaatgroep van ATP op een serine; ATP wordt ADP. Die plek is nu negatief geladen.', en: 'A kinase moves a phosphate group from ATP onto a serine; ATP becomes ADP. That spot is now negatively charged.' } },
        3: { tag: ['schakelaar', 'switch'], title: { nl: 'Fosforylatie zet het eiwit aan', en: 'Phosphorylation switches it on' }, text: { nl: 'Positieve zijketens trekken het negatieve fosfaat aan. Een lus klapt weg en het eiwit staat aan.', en: 'Positive side chains attract the negative phosphate. A loop flips away and the protein is on.' } },
        8: { tag: ['ubiquitine', 'ubiquitin'], title: { nl: 'Ubiquitine: een afbraaklabel', en: 'Ubiquitin: a breakdown tag' }, text: { nl: 'Ook het kleine eiwit ubiquitine kan aan een eiwit hangen. Een bepaald soort ubiquitineketen betekent: afbreken.', en: 'The small protein ubiquitin can also be attached. A certain kind of ubiquitin chain means: break down.' } },
      },
    },
  },
  'ubiquitine': {
    hobby: {
      kort: { nl: 'Eiwitten die kapot, fout gevouwen of overbodig zijn, krijgen een ketting van kleine labeltjes. Een afbraakmachine herkent dat label en knipt het eiwit in stukjes. Zo kunnen de bouwsteentjes opnieuw gebruikt worden.', en: 'Proteins that are damaged, badly folded or no longer needed get a chain of small tags. A shredding machine recognises that tag and cuts the protein into pieces. That way the building blocks can be used again.' },
      steps: {
        0: { tag: ['overzicht', 'overview'], title: { nl: 'Elk eiwit wordt ooit afgebroken', en: 'Every protein is broken down one day' }, text: { nl: 'Kapotte of overbodige eiwitten krijgen een labeltje, zelf een klein eiwitje, en worden daarna in stukjes geknipt.', en: 'Damaged or unneeded proteins get a tag, itself a tiny protein, and are then cut into pieces.' } },
        4: { tag: ['ketting groeit', 'chain grows'], title: { nl: 'Een ketting van labeltjes groeit', en: 'A chain of tags grows' }, text: { nl: 'Telkens komt er een labeltje bij, aan het vorige vast; vanaf ongeveer vier herkent de afbraakmachine de ketting goed.', en: 'Each time another tag is added to the last one; from about four, the shredding machine recognises the chain well.' } },
        6: { tag: ['vastgrijpen', 'grabbing'], title: { nl: 'De afbraakmachine grijpt het eiwit', en: 'The shredder grabs the protein' }, text: { nl: 'Het proteasoom, de afbraakmachine van de cel, pakt met zijn kap de ketting vast en grijpt een los stukje van het eiwit.', en: 'The proteasome, the cell’s shredding machine, holds the chain with its lid and grabs a loose end of the protein.' } },
        9: { tag: ['hergebruik', 'reuse'], title: { nl: 'Einde: alles wordt hergebruikt', en: 'The end: everything is reused' }, text: { nl: 'Andere helpers maken er losse bouwsteentjes van voor nieuwe eiwitten. Verken nu de zijpaden via "Waar ben ik?".', en: 'Other helpers turn the pieces into single building blocks for new proteins. Now explore the side paths via "Where am I?".' } },
      },
    },
    secundair: {
      kort: { nl: 'Beschadigde, misgevouwen of overbodige eiwitten krijgen een keten van het kleine eiwit ubiquitine. Een reeks enzymen hangt die keten aan. Het proteasoom herkent de keten, ontvouwt het eiwit en knipt het tot korte peptiden.', en: 'Damaged, misfolded or unneeded proteins get a chain of the small protein ubiquitin. A series of enzymes attaches that chain. The proteasome recognises it, unfolds the protein and cuts it into short peptides.' },
      terms: [
        [{ nl: 'ubiquitine', en: 'ubiquitin' }, { nl: 'Een klein eiwit dat als afbraaklabel aan andere eiwitten wordt gehangen.', en: 'A small protein attached to other proteins as a breakdown tag.' }],
        [{ nl: 'ubiquitineketen', en: 'ubiquitin chain' }, { nl: 'Meerdere ubiquitines aan elkaar: het signaal voor afbraak.', en: 'Several ubiquitins linked together: the signal for breakdown.' }],
        [{ nl: 'proteasoom', en: 'proteasome' }, { nl: 'De afbraakmachine die gelabelde eiwitten in korte peptiden knipt.', en: 'The breakdown machine that cuts tagged proteins into short peptides.' }],
      ],
      steps: {
        0: { tag: ['ubiquitine', 'ubiquitin'], title: { nl: 'Elk eiwit wordt ooit afgebroken', en: 'Every protein is broken down one day' }, text: { nl: 'Beschadigde of overbodige eiwitten krijgen een label, het kleine eiwit ubiquitine, en worden daarna in stukjes geknipt.', en: 'Damaged or unneeded proteins get a tag, the small protein ubiquitin, and are then cut into pieces.' } },
        4: { tag: ['ubiquitineketen', 'ubiquitin chain'], title: { nl: 'Een ubiquitineketen groeit', en: 'A ubiquitin chain grows' }, text: { nl: 'Telkens komt er een ubiquitine bij, aan de vorige. Vanaf ongeveer vier herkent het proteasoom de keten goed.', en: 'Each time another ubiquitin is added to the last one. From about four, the proteasome recognises the chain well.' } },
        6: { tag: ['proteasoom', 'proteasome'], title: { nl: 'Het proteasoom grijpt het eiwit', en: 'The proteasome grabs the protein' }, text: { nl: 'Het proteasoom is de afbraakmachine. Zijn kap bindt de ubiquitineketen en grijpt een los stuk van het eiwit.', en: 'The proteasome is the breakdown machine. Its cap binds the ubiquitin chain and grabs a loose end of the protein.' } },
        9: { tag: ['hergebruik', 'recycling'], title: { nl: 'Einde van het hoofdverhaal', en: 'End of the main story' }, text: { nl: 'Andere enzymen maken van de peptiden losse aminozuren voor nieuwe eiwitten. Verken nu de zijpaden via "Waar ben ik?".', en: 'Other enzymes turn the peptides into single amino acids for new proteins. Now explore the side paths via "Where am I?".' } },
      },
    },
  },
  'chaperones': {
    hobby: {
      kort: { nl: 'Vouwhelpers zijn eiwitten die andere eiwitten helpen vouwen. Ze schermen plakkerige stukken af, zodat kettingen niet aan elkaar klonteren, en gebruiken daar vaak energie voor. De vorm zelf bepalen ze niet: die zit in de volgorde van de bouwsteentjes.', en: 'Folding helpers are proteins that help other proteins fold. They shield sticky parts so chains do not clump together, and often use energy to do so. They do not decide the shape: that lies in the order of the building blocks.' },
      steps: {
        0: { tag: ['klontergevaar', 'clumping risk'], title: { nl: 'Het gevaar: klonteren', en: 'The danger: clumping' }, text: { nl: 'Een nieuwe ketting heeft stukjes die water mijden, en in de drukke cel kunnen die aan andere kettingen blijven plakken.', en: 'A new chain has bits that avoid water, and in the crowded cell they can get stuck to other chains.' } },
        1: { tag: ['helper', 'helper'], title: { nl: 'Een vouwhelper met een deksel', en: 'A folding helper with a lid' }, text: { nl: 'Met een energiedeeltje gebonden staat het deksel van deze vouwhelper open, en een hulpje brengt het plakkerige stuk.', en: 'With an energy molecule bound, this folding helper’s lid stands open, and an assistant brings the sticky part.' } },
        4: { tag: ['vouwkooi', 'folding cage'], title: { nl: 'Een vouwkooi', en: 'A folding cage' }, text: { nl: 'Sommige eiwitten vouwen in een gesloten kooi van twee ringen rug aan rug, hier eentje uit een bacterie.', en: 'Some proteins fold inside a closed cage of two rings back to back, here one from a bacterium.' } },
        8: { tag: ['samenwerken', 'teamwork'], title: { nl: 'Een ploeg van helpers', en: 'A team of helpers' }, text: { nl: 'Verschillende vouwhelpers werken samen, en wat toch niet goed vouwt, wordt afgebroken.', en: 'Different folding helpers work together, and whatever still does not fold well is broken down.' } },
      },
    },
    secundair: {
      kort: { nl: 'Chaperones zijn eiwitten die andere eiwitten helpen vouwen. Ze binden blootliggende hydrofobe stukken en voorkomen zo aggregatie; veel ervan verbruiken daarbij ATP. De informatie voor de vorm blijft in de aminozuurvolgorde zitten.', en: 'Chaperones are proteins that help other proteins fold. They bind exposed hydrophobic parts and so prevent aggregation; many use ATP to do this. The information for the shape stays in the amino acid sequence.' },
      terms: [
        [{ nl: 'chaperone', en: 'chaperone' }, { nl: 'Een helpereiwit dat andere eiwitten helpt vouwen.', en: 'A helper protein that helps other proteins fold.' }],
        [{ nl: 'aggregatie', en: 'aggregation' }, { nl: 'Het samenklonteren van ketens via hun hydrofobe stukken.', en: 'Chains clumping together through their hydrophobic parts.' }],
        [{ nl: 'Hsp70', en: 'Hsp70' }, { nl: 'Een chaperone die met ATP hydrofobe stukken van een keten bindt.', en: 'A chaperone that uses ATP to bind hydrophobic parts of a chain.' }],
        [{ nl: 'chaperonine', en: 'chaperonin' }, { nl: 'Een gesloten vouwkooi uit twee ringen.', en: 'A closed folding cage made of two rings.' }],
      ],
      steps: {
        0: { tag: ['aggregatie', 'aggregation'], title: { nl: 'Het gevaar: aggregatie', en: 'The danger: aggregation' }, text: { nl: 'Een nieuwe keten heeft hydrofobe stukken. In de drukke cel kunnen die aan andere ketens plakken: aggregatie.', en: 'A new chain has hydrophobic parts. In the crowded cell they can stick to other chains: aggregation.' } },
        1: { tag: ['Hsp70', 'Hsp70'], title: { nl: 'Hsp70: een chaperone met een deksel', en: 'Hsp70: a chaperone with a lid' }, text: { nl: 'Hsp70 is een chaperone. Met ATP staat zijn deksel open; een hulpeiwit brengt het hydrofobe stuk.', en: 'Hsp70 is a chaperone. With ATP its lid is open; a helper protein brings the hydrophobic part.' } },
        4: { tag: ['chaperonine', 'chaperonin'], title: { nl: 'Een chaperonine: een vouwkooi', en: 'A chaperonin: a folding cage' }, text: { nl: 'Sommige eiwitten vouwen in een gesloten kooi, een chaperonine: twee ringen rug aan rug. Hier een bacteriële.', en: 'Some proteins fold in a closed cage, a chaperonin: two rings back to back. Here a bacterial one.' } },
        8: { tag: ['netwerk', 'network'], title: { nl: 'Een netwerk van chaperones', en: 'A network of chaperones' }, text: { nl: 'Verschillende chaperones werken samen. Wat toch niet goed vouwt, wordt afgebroken.', en: 'Different chaperones work together. Whatever still does not fold well is broken down.' } },
      },
    },
  },
  'glyco': {
    hobby: {
      kort: { nl: 'Veel eiwitten die de cel verlaten, krijgen een klein boompje van suikers. Die suikers werken als label bij de controle: zolang het eiwit niet goed gevouwen is, wordt het vastgehouden. Later wordt het boompje nog bijgewerkt.', en: 'Many proteins that leave the cell get a small tree of sugars. Those sugars act as a tag during the check: as long as the protein is not folded well, it is held back. Later the tree is trimmed further.' },
      steps: {
        0: { tag: ['naar binnen', 'going in'], title: { nl: 'Een ketting gaat het ER in', en: 'A chain enters the ER' }, text: { nl: 'Het eiwitfabriekje zit vast op het ER, een netwerk van vliezen in de cel, en de ketting schuift door een gaatje naar binnen.', en: 'The protein factory sits on the ER, a network of membranes in the cell, and the chain slides in through a small pore.' } },
        3: { tag: ['boompje erop', 'tree added'], title: { nl: 'Het suikerboompje gaat er in één keer op', en: 'The sugar tree goes on in one go' }, text: { nl: 'Een helpereiwit zet het hele boompje in één keer op één bouwsteentje, terwijl de ketting nog groeit.', en: 'A helper protein puts the whole tree onto one building block in one go, while the chain is still growing.' } },
        6: { tag: ['door of weg', 'pass or scrap'], title: { nl: 'Doorlaten of afbreken', en: 'Let through or break down' }, text: { nl: 'Goed gevouwen eiwitten mogen door naar de volgende werkplaats; blijft het fout, dan moet het eiwit eruit en wordt het afgebroken.', en: 'Well-folded proteins may move on to the next workshop; if it stays wrong, the protein is sent out and broken down.' } },
      },
    },
    secundair: {
      kort: { nl: 'Bij N-glycosylatie zet een enzym in het ER een voorgebouwde suikerboom op een asparagine van een eiwit, meestal al tijdens de translatie. De suikers dienen als vouwlabel bij de kwaliteitscontrole. In het Golgi wordt de boom verder bewerkt.', en: 'In N-glycosylation an enzyme in the ER puts a prebuilt sugar tree onto an asparagine of a protein, usually during translation. The sugars serve as a folding tag in quality control. In the Golgi the tree is processed further.' },
      terms: [
        [{ nl: 'glycosylatie', en: 'glycosylation' }, { nl: 'Het aanhangen van suikers aan een eiwit.', en: 'Attaching sugars to a protein.' }],
        [{ nl: 'ER', en: 'ER' }, { nl: 'Het endoplasmatisch reticulum: een netwerk van membranen waar veel eiwitten binnengaan.', en: 'The endoplasmic reticulum: a network of membranes that many proteins enter.' }],
        [{ nl: 'kwaliteitscontrole', en: 'quality control' }, { nl: 'De controle in het ER die enkel goed gevouwen eiwitten doorlaat.', en: 'The check in the ER that only lets well-folded proteins through.' }],
        [{ nl: 'Golgi-apparaat', en: 'Golgi apparatus' }, { nl: 'De stapel membraanschijven waar eiwitten na het ER verder bewerkt worden.', en: 'The stack of membrane discs where proteins are processed further after the ER.' }],
      ],
      steps: {
        0: { tag: ['ER', 'ER'], title: { nl: 'Een keten gaat het ER in', en: 'A chain enters the ER' }, text: { nl: 'Het ribosoom zit vast op het ER. De keten schuift door een porie naar de binnenkant van het ER.', en: 'The ribosome is attached to the ER. The chain slides through a pore into the inside of the ER.' } },
        3: { tag: ['glycosylatie', 'glycosylation'], title: { nl: 'De suikerboom gaat er in één keer op', en: 'The sugar tree goes on in one go' }, text: { nl: 'Een enzym zet de hele suikerboom in één keer op een asparagine, terwijl de keten nog groeit.', en: 'An enzyme puts the whole sugar tree onto an asparagine in one go, while the chain is still growing.' } },
        6: { tag: ['kwaliteitscontrole', 'quality control'], title: { nl: 'Kwaliteitscontrole: door of afbraak', en: 'Quality control: pass or degrade' }, text: { nl: 'Goed gevouwen eiwitten gaan door naar het Golgi. Blijft het eiwit fout gevouwen, dan gaat het uit het ER en wordt het afgebroken.', en: 'Well-folded proteins move on to the Golgi. If the protein stays misfolded, it leaves the ER and is broken down.' } },
      },
    },
  },
  'disulfide': {
    hobby: {
      kort: { nl: 'Twee bouwsteentjes met zwavel die door het vouwen naast elkaar komen te liggen, kunnen een stevige brug vormen. Die brug werkt als een nietje dat de vorm vastzet, vooral bij eiwitten die de cel verlaten.', en: 'Two building blocks with sulphur that end up side by side after folding can form a strong bridge. That bridge works like a staple that locks the shape, especially in proteins that leave the cell.' },
      steps: {
        0: { tag: ['ver uiteen', 'far apart'], title: { nl: 'Twee zwavelsteentjes, ver uit elkaar', en: 'Two sulphur blocks, far apart' }, text: { nl: 'In de ketting liggen twee bouwsteentjes met een zwavelgroepje ver van elkaar.', en: 'In the chain, two building blocks with a sulphur group lie far from each other.' } },
        1: { tag: ['samen', 'together'], title: { nl: 'Het vouwen brengt ze samen', en: 'Folding brings them together' }, text: { nl: 'Door het vouwen komen de twee naast elkaar te liggen, en nu kan er een brug ontstaan.', en: 'Folding puts the two side by side, and now a bridge can form.' } },
        2: { tag: ['brug', 'bridge'], title: { nl: 'De brug ontstaat', en: 'The bridge forms' }, text: { nl: 'De twee zwavels koppelen zich tot een sterke brug, een soort nietje dat de vorm van het eiwit vastzet.', en: 'The two sulphurs join into a strong bridge, a kind of staple that locks the protein’s shape.' } },
      },
    },
    secundair: {
      kort: { nl: 'Een disulfidebrug is een covalente S–S-binding tussen twee cysteïnes die door de vouwing naast elkaar komen. Het vormen ervan is een oxidatie. Zulke bruggen ontstaan vooral in het ER en verstevigen vooral eiwitten die de cel verlaten.', en: 'A disulfide bond is a covalent S–S bond between two cysteines that end up side by side through folding. Forming it is an oxidation. Such bonds form mainly in the ER and mostly strengthen proteins that leave the cell.' },
      terms: [
        [{ nl: 'cysteïne', en: 'cysteine' }, { nl: 'Een aminozuur met een zwavelgroep (–SH).', en: 'An amino acid with a sulphur group (–SH).' }],
        [{ nl: 'disulfidebrug', en: 'disulfide bond' }, { nl: 'Een covalente S–S-binding die de vorm van een eiwit vastzet.', en: 'A covalent S–S bond that locks the shape of a protein.' }],
        [{ nl: 'oxidatie', en: 'oxidation' }, { nl: 'Een reactie waarbij elektronen weggaan.', en: 'A reaction in which electrons are removed.' }],
      ],
      steps: {
        0: { tag: ['cysteïne', 'cysteine'], title: { nl: 'Twee cysteïnes, ver uit elkaar', en: 'Two cysteines, far apart' }, text: { nl: 'In de volgorde liggen twee cysteïnes ver uit elkaar. Elk heeft een zwavelgroep (–SH).', en: 'In the sequence two cysteines lie far apart. Each has a sulphur group (–SH).' } },
        1: { tag: ['vouwing', 'folding'], title: { nl: 'De vouwing brengt ze samen', en: 'Folding brings them together' }, text: { nl: 'Door de vouwing komen de twee cysteïnes naast elkaar te liggen: nu kan een brug ontstaan.', en: 'Folding places the two cysteines side by side: now a bond can form.' } },
        2: { tag: ['disulfidebrug', 'disulfide bond'], title: { nl: 'De disulfidebrug ontstaat', en: 'The disulfide bond forms' }, text: { nl: 'De twee zwavelatomen koppelen tot een covalente S–S-binding. Daarvoor moeten elektronen weg: een oxidatie.', en: 'The two sulphur atoms join in a covalent S–S bond. Electrons must be removed for this: an oxidation.' } },
      },
    },
  },
  'golgi': {
    hobby: {
      kort: { nl: 'Eiwitten reizen in kleine blaasjes naar het Golgi-apparaat, een stapel platte zakjes die werkt als postkantoor. Daar worden ze afgewerkt en gesorteerd. Daarna gaan ze naar de rand van de cel, naar buiten of naar het verteerblaasje.', en: 'Proteins travel in small bubbles to the Golgi apparatus, a stack of flat sacs that works like a post office. There they are finished and sorted. Then they go to the edge of the cell, outside it or to the digestion bubble.' },
      steps: {
        0: { tag: ['overzicht', 'overview'], title: { nl: 'De weg naar buiten', en: 'The way out' }, text: { nl: 'Eiwitten reizen van hun werkplaats via het postkantoor naar de rand van de cel, naar buiten of naar het verteerblaasje.', en: 'Proteins travel from their workshop via the post office to the cell’s edge, outside or to the digestion bubble.' } },
        1: { tag: ['op reis', 'on the move'], title: { nl: 'Met een blaasje naar het postkantoor', en: 'By bubble to the post office' }, text: { nl: 'Goed gevouwen eiwitten vertrekken in kleine blaasjes, die ze naar de ingang van het postkantoor brengen.', en: 'Well-folded proteins leave in small bubbles, which bring them to the entrance of the post office.' } },
        4: { tag: ['afwerken', 'finishing'], title: { nl: 'Afwerken onderweg', en: 'Finishing on the way' }, text: { nl: 'Elk zakje van de stapel heeft eigen helpers die suikers weghalen en toevoegen, en sommige eiwitten krijgen een adreslabel.', en: 'Each sac in the stack has its own helpers that remove and add sugars, and some proteins get an address tag.' } },
        5: { tag: ['sorteren', 'sorting'], title: { nl: 'Sorteren aan de uitgang', en: 'Sorting at the exit' }, text: { nl: 'Aan de uitgang gaat elk eiwit in het juiste blaasje: naar de rand van de cel, een voorraadkorrel of richting verteerblaasje.', en: 'At the exit each protein goes into the right bubble: to the cell’s edge, a storage granule or towards the digestion bubble.' } },
      },
    },
    secundair: {
      kort: { nl: 'De secretieroute brengt eiwitten uit het ruw ER in blaasjes (vesikels) naar het Golgi-apparaat, een stapel platte cisternen. Daar worden ze verder bewerkt, vooral hun suikers, en gesorteerd. Daarna gaan ze naar het plasmamembraan, naar buiten de cel of naar het lysosoom.', en: 'The secretory route takes proteins from the rough ER in small vesicles to the Golgi apparatus, a stack of flat cisternae. There they are processed further, mainly their sugars, and sorted. Then they go to the plasma membrane, outside the cell or to the lysosome.' },
      terms: [
        [{ nl: 'vesikel', en: 'vesicle' }, { nl: 'Een klein membraanblaasje dat eiwitten vervoert.', en: 'A small membrane bubble that carries proteins.' }],
        [{ nl: 'Golgi-apparaat', en: 'Golgi apparatus' }, { nl: 'Een stapel platte cisternen waar eiwitten bewerkt en gesorteerd worden.', en: 'A stack of flat cisternae where proteins are processed and sorted.' }],
        [{ nl: 'secretie', en: 'secretion' }, { nl: 'Het uitscheiden van eiwitten naar buiten de cel.', en: 'Releasing proteins to the outside of the cell.' }],
        [{ nl: 'lysosoom', en: 'lysosome' }, { nl: 'Het verteerblaasje van de cel.', en: 'The digestion bubble of the cell.' }],
      ],
      steps: {
        0: { tag: ['secretieroute', 'secretory route'], title: { nl: 'De secretieroute', en: 'The secretory route' }, text: { nl: 'Eiwitten uit het ER reizen via het Golgi-apparaat naar het plasmamembraan, naar buiten de cel of naar het lysosoom.', en: 'Proteins from the ER travel via the Golgi apparatus to the plasma membrane, outside the cell or to the lysosome.' } },
        1: { tag: ['vesikels', 'vesicles'], title: { nl: 'In vesikels van het ER naar het Golgi', en: 'In vesicles from the ER to the Golgi' }, text: { nl: 'Goed gevouwen eiwitten verlaten het ER in vesikels. Die brengen ze naar de cis-kant, de ingang van het Golgi.', en: 'Well-folded proteins leave the ER in vesicles. These bring them to the cis side, the entrance of the Golgi.' } },
        4: { tag: ['bewerken', 'processing'], title: { nl: 'Bewerken in de cisternen', en: 'Processing in the cisternae' }, text: { nl: 'Elke cisterne heeft eigen enzymen die suikers weghalen en toevoegen. Enzymen voor het lysosoom krijgen een label.', en: 'Each cisterna has its own enzymes that remove and add sugars. Enzymes for the lysosome get a tag.' } },
        5: { tag: ['sorteren', 'sorting'], title: { nl: 'Sorteren aan de uitgang', en: 'Sorting at the exit' }, text: { nl: 'Aan de trans-kant gaat elk eiwit in het juiste vesikel: naar het plasmamembraan, een opslagkorrel of het endosoom.', en: 'At the trans side each protein enters the right vesicle: to the plasma membrane, a storage granule or the endosome.' } },
      },
    },
  },
  'misvouwing': {
    hobby: {
      kort: { nl: 'Soms vouwt een eiwit verkeerd, bijvoorbeeld door een foutje in het DNA, stress of ouderdom. Fout gevouwen kettingen kunnen aan elkaar plakken tot klonten of lange vezels. Zulke klonten spelen een rol bij ziekten zoals Alzheimer en Parkinson.', en: 'Sometimes a protein folds the wrong way, for example because of a mistake in the DNA, stress or old age. Badly folded chains can stick together into clumps or long fibres. Such clumps play a part in diseases like Alzheimer’s and Parkinson’s.' },
      steps: {
        0: { tag: ['fout gevouwen', 'misfolded'], title: { nl: 'Als vouwen misloopt', en: 'When folding goes wrong' }, text: { nl: 'Een fout gevouwen eiwit laat plakkerige stukjes zien; helpers proberen het te herstellen, en lukt dat niet, dan wordt het afgebroken.', en: 'A badly folded protein shows sticky bits; helpers try to repair it, and if that fails, it is broken down.' } },
        1: { tag: ['klonteren', 'clumping'], title: { nl: 'Klonteren', en: 'Clumping' }, text: { nl: 'Is de controle overbelast, door stress of ouderdom, dan plakken kettingen samen tot klonten of lange vezels.', en: 'If the checks are overloaded, by stress or old age, chains stick together into clumps or long fibres.' } },
        4: { tag: ['ziekten', 'diseases'], title: { nl: 'Ziekten door klonten', en: 'Diseases caused by clumps' }, text: { nl: 'Zulke klonten spelen mee bij Alzheimer, Parkinson en suikerziekte type 2, en vooral kleine klontjes lijken schadelijk.', en: 'Such clumps play a part in Alzheimer’s, Parkinson’s and type 2 diabetes, and small clumps in particular seem harmful.' } },
      },
    },
    secundair: {
      kort: { nl: 'Eiwitten kunnen verkeerd vouwen door mutaties, stress of ouderdom. Misgevouwen ketens tonen hydrofobe stukken en kunnen aggregeren tot klonten of amyloïdvezels. Zulke aggregaten spelen een rol bij ziekten als Alzheimer en Parkinson.', en: 'Proteins can misfold because of mutations, stress or ageing. Misfolded chains expose hydrophobic parts and can aggregate into clumps or amyloid fibres. Such aggregates play a part in diseases like Alzheimer’s and Parkinson’s.' },
      terms: [
        [{ nl: 'misvouwing', en: 'misfolding' }, { nl: 'Een eiwit dat een verkeerde vorm aanneemt en hydrofobe stukken toont.', en: 'A protein taking the wrong shape and exposing hydrophobic parts.' }],
        [{ nl: 'aggregatie', en: 'aggregation' }, { nl: 'Het samenklonteren van misgevouwen ketens.', en: 'Misfolded chains clumping together.' }],
        [{ nl: 'amyloïd', en: 'amyloid' }, { nl: 'Lange, geordende vezels van aaneengeplakte eiwitketens.', en: 'Long, ordered fibres of protein chains stuck together.' }],
      ],
      steps: {
        0: { tag: ['misvouwing', 'misfolding'], title: { nl: 'Misvouwing', en: 'Misfolding' }, text: { nl: 'Misgevouwen eiwitten tonen hydrofobe stukken. Chaperones proberen ze te herstellen; lukt dat niet, dan volgt afbraak.', en: 'Misfolded proteins expose hydrophobic parts. Chaperones try to repair them; if that fails, they are degraded.' } },
        1: { tag: ['aggregatie', 'aggregation'], title: { nl: 'Aggregatie: klonten en vezels', en: 'Aggregation: clumps and fibres' }, text: { nl: 'Is de kwaliteitscontrole overbelast, bv. door stress of ouderdom? Dan aggregeren ketens tot klonten of amyloïdvezels.', en: 'Is quality control overloaded, for example by stress or ageing? Then chains aggregate into clumps or amyloid fibres.' } },
        4: { tag: ['ziekten', 'diseases'], title: { nl: 'Ziekten door aggregaten', en: 'Diseases caused by aggregates' }, text: { nl: 'Aggregaten spelen mee bij Alzheimer, Parkinson en type 2-diabetes. Vooral kleine aggregaten lijken giftig.', en: 'Aggregates play a part in Alzheimer’s, Parkinson’s and type 2 diabetes. Small aggregates in particular seem toxic.' } },
      },
    },
  },
  'idp': {
    hobby: {
      kort: { nl: 'Niet elk eiwit heeft één vaste vorm: sommige eiwitten of stukken ervan blijven los en beweeglijk, zoals een slap touwtje. Ze krijgen vaak pas een vorm als ze aan een partner vastgaan. Dat maakt ze handig voor signalen die snel aan en uit moeten.', en: 'Not every protein has one fixed shape: some proteins or parts of them stay loose and floppy, like a limp piece of string. They often only take a shape when they attach to a partner. That makes them handy for signals that must switch on and off quickly.' },
      steps: {
        0: { tag: ['geen vaste vorm', 'no fixed shape'], title: { nl: 'Niet elk eiwit heeft een vaste vorm', en: 'Not every protein has a fixed shape' }, text: { nl: 'Veel eiwitten hebben slappe stukken zonder vaste vorm, en soms is zelfs het hele eiwit zo.', en: 'Many proteins have floppy parts without a fixed shape, and sometimes even the whole protein is like that.' } },
        1: { tag: ['in beweging', 'always moving'], title: { nl: 'Altijd in beweging', en: 'Always moving' }, text: { nl: 'Zo’n stuk verandert steeds van vorm, daarom toont een 3D-model er geen of maar een onzekere vorm voor.', en: 'Such a part keeps changing shape, so a 3D model shows no shape for it, or only an uncertain one.' } },
        5: { tag: ['vastpakken', 'grab and fold'], title: { nl: 'Vouwen tijdens het vastpakken', en: 'Folding while holding on' }, text: { nl: 'Het slappe stuk gaat eerst losjes op een partnereiwit liggen en vouwt dan op dat oppervlak tot twee spiraaltjes.', en: 'The floppy part first rests loosely on a partner protein and then folds on that surface into two little spirals.' } },
      },
    },
    secundair: {
      kort: { nl: 'Intrinsiek ongeordende eiwitten (IDP’s) of regio’s hebben geen vaste 3D-structuur maar wisselen voortdurend van vorm. Ze krijgen vaak pas structuur wanneer ze aan een partner binden. Dat maakt ze geschikt voor signalen die snel aan en uit moeten.', en: 'Intrinsically disordered proteins (IDPs) or regions have no fixed 3D structure but keep changing shape. They often only gain structure when they bind a partner. That makes them suited to signals that must switch on and off quickly.' },
      terms: [
        [{ nl: 'IDP', en: 'IDP' }, { nl: 'Een intrinsiek ongeordend eiwit: een eiwit zonder vaste 3D-vorm.', en: 'An intrinsically disordered protein: a protein without a fixed 3D shape.' }],
        [{ nl: 'ongeordende regio', en: 'disordered region' }, { nl: 'Een stuk van een eiwit dat geen vaste vorm heeft.', en: 'A part of a protein that has no fixed shape.' }],
        [{ nl: 'binden en vouwen', en: 'binding and folding' }, { nl: 'Een ongeordend stuk dat pas vouwt wanneer het aan een partner bindt.', en: 'A disordered part that only folds when it binds a partner.' }],
      ],
      steps: {
        0: { tag: ['IDP', 'IDP'], title: { nl: 'Ongeordende eiwitten', en: 'Disordered proteins' }, text: { nl: 'Veel eiwitten hebben ongeordende regio’s zonder vaste vorm. Soms is het hele eiwit ongeordend: een IDP.', en: 'Many proteins have disordered regions without a fixed shape. Sometimes the whole protein is disordered: an IDP.' } },
        1: { tag: ['in beweging', 'always moving'], title: { nl: 'Altijd in beweging', en: 'Always moving' }, text: { nl: 'Zo’n regio wisselt steeds van vorm. Een 3D-model toont er daarom geen of een onzekere structuur.', en: 'Such a region keeps changing shape. A 3D model therefore shows no structure for it, or an uncertain one.' } },
        5: { tag: ['binden en vouwen', 'bind and fold'], title: { nl: 'Vouwen tijdens het binden', en: 'Folding upon binding' }, text: { nl: 'De regio bindt eerst losjes aan een partnereiwit en vouwt dan op dat oppervlak tot twee α-helices.', en: 'The region first binds loosely to a partner protein and then folds on that surface into two α-helices.' } },
      },
    },
  },
  'sortering': {
    hobby: {
      kort: { nl: 'Bijna elk eiwit wordt gemaakt in de vloeistof die de cel vult. Een kort stukje in de ketting werkt als adreslabel en bepaalt waar het eiwit heen gaat. Zonder label blijft het waar het gemaakt is.', en: 'Almost every protein is made in the fluid that fills the cell. A short piece of the chain acts as an address label and decides where the protein goes. Without a label it stays where it was made.' },
      steps: {
        0: { tag: ['start', 'start'], title: { nl: 'Bijna elk eiwit begint in de celvloeistof', en: 'Almost every protein starts in the cell fluid' }, text: { nl: 'Kleine fabriekjes maken eiwitten in de vloeistof die de cel vult, en daarna moet elk eiwit naar zijn eigen plek.', en: 'Little factories make proteins in the fluid that fills the cell, and then each protein has to get to its own place.' } },
        1: { tag: ['geen label', 'no label'], title: { nl: 'Zonder label blijft het eiwit waar het is', en: 'Without a label, it stays put' }, text: { nl: 'Heeft een eiwit geen adreslabel, dan blijft het gewoon in de celvloeistof, waar het gemaakt is.', en: 'If a protein has no address label, it simply stays in the cell fluid, where it was made.' } },
        2: { tag: ['vettig begin', 'greasy start'], title: { nl: 'Een vettig stukje vooraan', en: 'A greasy piece at the front' }, text: { nl: 'Een stukje aan het begin dat water afstoot, stuurt het eiwit naar het ER, een netwerk van vliezen in de cel.', en: 'A water-repelling piece at the start sends the protein to the ER, a network of membranes in the cell.' } },
        7: { tag: ['label = adres', 'label = address'], title: { nl: 'Het label is het adres', en: 'The label is the address' }, text: { nl: 'Klik op een bestemming om te zien hoe het eiwit daar binnenkomt.', en: 'Click a destination to see how the protein gets in there.' } },
      },
    },
    secundair: {
      kort: { nl: 'Bijna elk eiwit wordt in het cytosol gemaakt. Een sorteersignaal, een kort stuk van de aminozuurvolgorde, werkt als adreslabel en bepaalt de bestemming. Zonder signaal blijft het eiwit in het cytosol.', en: 'Almost every protein is made in the cytosol. A sorting signal, a short stretch of the amino acid sequence, acts as an address label and sets the destination. Without a signal the protein stays in the cytosol.' },
      terms: [
        [{ nl: 'cytosol', en: 'cytosol' }, { nl: 'De vloeistof die de cel vult, waar ribosomen eiwitten maken.', en: 'The fluid that fills the cell, where ribosomes make proteins.' }],
        [{ nl: 'sorteersignaal', en: 'sorting signal' }, { nl: 'Een kort stuk in de keten dat als adreslabel werkt.', en: 'A short stretch of the chain that acts as an address label.' }],
        [{ nl: 'signaalpeptide', en: 'signal peptide' }, { nl: 'Een hydrofoob stuk aan het begin dat het eiwit naar het ER stuurt.', en: 'A hydrophobic stretch at the start that sends the protein to the ER.' }],
      ],
      steps: {
        0: { tag: ['cytosol', 'cytosol'], title: { nl: 'Bijna elk eiwit begint in het cytosol', en: 'Almost every protein starts in the cytosol' }, text: { nl: 'Ribosomen maken eiwitten in het cytosol, de vloeistof die de cel vult. Daarna moet elk eiwit naar zijn plek.', en: 'Ribosomes make proteins in the cytosol, the fluid that fills the cell. Then each protein must reach its place.' } },
        1: { tag: ['geen signaal', 'no signal'], title: { nl: 'Zonder sorteersignaal: in het cytosol', en: 'No sorting signal: stays in the cytosol' }, text: { nl: 'Heeft het eiwit geen sorteersignaal, dan blijft het in het cytosol, waar het gemaakt is.', en: 'If the protein has no sorting signal, it stays in the cytosol, where it was made.' } },
        2: { tag: ['signaalpeptide', 'signal peptide'], title: { nl: 'Een signaalpeptide stuurt naar het ER', en: 'A signal peptide sends it to the ER' }, text: { nl: 'Een hydrofoob stuk aan het begin, het signaalpeptide, stuurt het eiwit naar het ER, een netwerk van membranen.', en: 'A hydrophobic stretch at the start, the signal peptide, sends the protein to the ER, a network of membranes.' } },
        7: { tag: ['label = adres', 'label = address'], title: { nl: 'Het signaal is het adres', en: 'The signal is the address' }, text: { nl: 'Klik op een bestemming om te zien hoe het eiwit daar binnenkomt.', en: 'Click a destination to see how the protein gets in there.' } },
      },
    },
  },
  'membraan': {
    hobby: {
      kort: { nl: 'Eiwitten die in een vlies van de cel moeten zitten, worden gebouwd bij het ER, een netwerk van vliezen. Een vettig stukje van de ketting blijft in een kanaal steken en glipt via een zijdeur het vlies in. Daarna reist het eiwit mee in dat vlies.', en: 'Proteins that must sit in one of the cell’s membranes are built at the ER, a network of membranes. A greasy piece of the chain gets stuck in a channel and slips through a side door into the membrane. After that the protein travels along inside that membrane.' },
      steps: {
        0: { tag: ['kanaal', 'channel'], title: { nl: 'Een kanaal in het vlies', en: 'A channel in the membrane' }, text: { nl: 'Dit is het echte menselijke kanaal waardoor nieuwe eiwitten naar binnen gaan, opgebouwd uit drie eiwitten.', en: 'This is the real human channel that new proteins pass through, built from three proteins.' } },
        2: { tag: ['doorschuiven', 'sliding through'], title: { nl: 'De ketting schuift door het kanaal', en: 'The chain slides through the channel' }, text: { nl: 'Het eiwitfabriekje zit op het kanaal, en de groeiende ketting glijdt erdoor naar de binnenkant.', en: 'The protein factory sits on the channel, and the growing chain slides through it to the inside.' } },
        3: { tag: ['blijft steken', 'gets stuck'], title: { nl: 'Een vettig stuk blijft in het vlies steken', en: 'A greasy piece sticks in the membrane' }, text: { nl: 'Dan komt er een stuk dat water afstoot: het stopt in het kanaal en glipt via de zijdeur het vlies in.', en: 'Then comes a water-repelling piece: it stops in the channel and slips through the side door into the membrane.' } },
      },
    },
    secundair: {
      kort: { nl: 'Membraaneiwitten worden in het ER-membraan gebouwd. Een hydrofoob transmembraansegment stopt in het kanaal en glipt via de laterale poort de lipidelaag in. Daarna reist het eiwit mee in het membraan.', en: 'Membrane proteins are built into the ER membrane. A hydrophobic transmembrane segment stops in the channel and slips through the lateral gate into the lipid layer. After that the protein travels along in the membrane.' },
      terms: [
        [{ nl: 'membraaneiwit', en: 'membrane protein' }, { nl: 'Een eiwit dat in een membraan vastzit.', en: 'A protein that sits fixed in a membrane.' }],
        [{ nl: 'transmembraansegment', en: 'transmembrane segment' }, { nl: 'Een hydrofobe helix die dwars door het membraan loopt.', en: 'A hydrophobic helix that crosses the membrane.' }],
        [{ nl: 'laterale poort', en: 'lateral gate' }, { nl: 'De zijdeur van het kanaal naar de lipidelaag.', en: 'The side door of the channel into the lipid layer.' }],
      ],
      steps: {
        0: { tag: ['kanaal', 'channel'], title: { nl: 'Een kanaal in het ER-membraan', en: 'A channel in the ER membrane' }, text: { nl: 'Dit is het menselijke kanaal waardoor nieuwe eiwitten het ER in gaan. Het bestaat uit drie eiwitten.', en: 'This is the human channel through which new proteins enter the ER. It consists of three proteins.' } },
        2: { tag: ['doorschuiven', 'sliding through'], title: { nl: 'De keten schuift door het kanaal', en: 'The chain slides through the channel' }, text: { nl: 'Het ribosoom zit op het kanaal. De groeiende keten glijdt erdoor naar de binnenkant van het ER.', en: 'The ribosome sits on the channel. The growing chain slides through it into the inside of the ER.' } },
        3: { tag: ['transmembraan', 'transmembrane'], title: { nl: 'Een transmembraansegment blijft steken', en: 'A transmembrane segment gets stuck' }, text: { nl: 'Een hydrofoob transmembraansegment stopt in het kanaal en glipt via de laterale poort de lipidelaag in.', en: 'A hydrophobic transmembrane segment stops in the channel and slips through the lateral gate into the lipid layer.' } },
      },
    },
  },
  'lysosoom': {
    hobby: {
      kort: { nl: 'Het lysosoom is het verteerblaasje van de cel: vol knipscharen en zuur. De knipscharen vinden de weg dankzij een suikerlabel dat ze onderweg krijgen. Ontbreekt dat label, dan raakt het verteerblaasje verstopt.', en: 'The lysosome is the cell’s digestion bubble: full of cutting scissors and acid. The scissors find their way thanks to a sugar label they get on the way. If that label is missing, the digestion bubble gets clogged.' },
      steps: {
        0: { tag: ['verteerblaasje', 'digestion bubble'], title: { nl: 'Het verteerblaasje breekt grote stukken af', en: 'The digestion bubble breaks down big pieces' }, text: { nl: 'Het verteerblaasje zit vol knipscharen, en binnenin is het zuur.', en: 'The digestion bubble is full of cutting scissors, and inside it is acidic.' } },
        1: { tag: ['label erop', 'label added'], title: { nl: 'De knipschaar krijgt een adreslabel', en: 'The scissors get an address label' }, text: { nl: 'In een sorteerstation van de cel komt er een klein groepje op een suiker van de knipschaar: dat suikerlabel is het adres.', en: 'In a sorting station of the cell, a small group is added to a sugar on the scissors: that sugar label is the address.' } },
        4: { tag: ['aan het werk', 'at work'], title: { nl: 'In het zuur gaan de scharen aan het werk', en: 'In the acid the scissors get to work' }, text: { nl: 'Een blaasje brengt de knipschaar naar het verteerblaasje, waar het zuur ze aanzet om grote stukken in bouwsteentjes te knippen.', en: 'A bubble brings the scissors to the digestion bubble, where the acid switches them on to cut big pieces into building blocks.' } },
      },
    },
    secundair: {
      kort: { nl: 'Het lysosoom is het verteerorganel van de cel, vol knipenzymen (hydrolasen) en met een zure binnenkant. Die enzymen krijgen in het Golgi een suikerlabel: mannose-6-fosfaat. Receptoren herkennen dat label en brengen de enzymen naar het lysosoom.', en: 'The lysosome is the cell’s digestive organelle, full of cutting enzymes (hydrolases) and acidic inside. These enzymes get a sugar label in the Golgi: mannose-6-phosphate. Receptors recognise that label and bring the enzymes to the lysosome.' },
      terms: [
        [{ nl: 'lysosoom', en: 'lysosome' }, { nl: 'Een zuur blaasje vol knipenzymen dat grote moleculen afbreekt.', en: 'An acidic bubble full of cutting enzymes that breaks down large molecules.' }],
        [{ nl: 'hydrolase', en: 'hydrolase' }, { nl: 'Een knipenzym dat grote moleculen in bouwstenen splitst.', en: 'A cutting enzyme that splits large molecules into building blocks.' }],
        [{ nl: 'mannose-6-fosfaat', en: 'mannose-6-phosphate' }, { nl: 'Het suikerlabel dat lysosoomenzymen in het Golgi krijgen.', en: 'The sugar label that lysosomal enzymes receive in the Golgi.' }],
        [{ nl: 'receptor', en: 'receptor' }, { nl: 'Een eiwit dat een label herkent en bindt.', en: 'A protein that recognises and binds a label.' }],
      ],
      steps: {
        0: { tag: ['lysosoom', 'lysosome'], title: { nl: 'Het lysosoom breekt grote moleculen af', en: 'The lysosome breaks down large molecules' }, text: { nl: 'Een lysosoom is een blaasje vol knipenzymen (hydrolasen). Binnenin is het zuur.', en: 'A lysosome is a bubble full of cutting enzymes (hydrolases). Inside it is acidic.' } },
        1: { tag: ['M6P-label', 'M6P label'], title: { nl: 'Het enzym krijgt een label in het Golgi', en: 'The enzyme gets a label in the Golgi' }, text: { nl: 'In het Golgi komt een fosfaatgroep op een mannose van het enzym: mannose-6-fosfaat. Dat suikerlabel is het adres van het lysosoom.', en: 'In the Golgi a phosphate group is added to a mannose on the enzyme: mannose-6-phosphate. That sugar label is the lysosome’s address.' } },
        4: { tag: ['zuur', 'acidic'], title: { nl: 'In het zuur gaan de enzymen aan het werk', en: 'In the acid the enzymes get to work' }, text: { nl: 'Een vesikel brengt het enzym naar het lysosoom. Het zuur zet de enzymen aan: ze knippen grote moleculen in bouwstenen.', en: 'A vesicle brings the enzyme to the lysosome. The acid activates the enzymes: they cut large molecules into building blocks.' } },
      },
    },
  },
  'mito': {
    hobby: {
      kort: { nl: 'Het mitochondrion, de energiecentrale van de cel, maakt zelf maar 13 eiwitten; meer dan duizend andere komen van buiten. De meeste worden uitgerold door een poort in elk van zijn twee vliezen. Binnen gaat het label eraf en vouwt het eiwit weer op.', en: 'The mitochondrion, the cell’s power station, makes only 13 proteins itself; over a thousand others come from outside. Most are unrolled through a gate in each of its two membranes. Inside, the label comes off and the protein folds up again.' },
      steps: {
        0: { tag: ['13 eiwitten', '13 proteins'], title: { nl: 'De centrale maakt zelf weinig eiwitten', en: 'The power station makes few proteins' }, text: { nl: 'Met zijn eigen DNA maakt de energiecentrale maar 13 eiwitten, en meer dan duizend andere komen van buiten.', en: 'With its own DNA the power station makes only 13 proteins, and over a thousand others come from outside.' } },
        1: { tag: ['adreslabel', 'address label'], title: { nl: 'Een plus-spiraaltje vooraan is het adres', en: 'A plus spiral at the front is the address' }, text: { nl: 'Vooraan zit een spiraaltje met aan één kant positieve ladingen, en dat is het adres van de energiecentrale.', en: 'At the front sits a little spiral with positive charges on one side, and that is the power station’s address.' } },
        7: { tag: ['binnen vouwen', 'fold inside'], title: { nl: 'Binnen trekken en opvouwen', en: 'Pulling in and folding up' }, text: { nl: 'Een helper trekt de rest van de ketting naar binnen en helpt het eiwit daarna weer op te vouwen.', en: 'A helper pulls the rest of the chain inside and then helps the protein fold up again.' } },
      },
    },
    secundair: {
      kort: { nl: 'Het mitochondrion maakt met zijn eigen DNA maar 13 eiwitten; meer dan duizend andere worden in het cytosol gemaakt en geïmporteerd. De meeste dragen vooraan een presequentie: een positief geladen helix. Ze gaan ontvouwen door poorten in beide membranen, waarna de presequentie wordt afgeknipt en het eiwit vouwt.', en: 'The mitochondrion makes only 13 proteins with its own DNA; over a thousand others are made in the cytosol and imported. Most carry a presequence at the front: a positively charged helix. They pass unfolded through gates in both membranes, after which the presequence is cut off and the protein folds.' },
      terms: [
        [{ nl: 'mtDNA', en: 'mtDNA' }, { nl: 'Het eigen DNA van het mitochondrion, goed voor 13 eiwitten.', en: 'The mitochondrion’s own DNA, coding for 13 proteins.' }],
        [{ nl: 'presequentie', en: 'presequence' }, { nl: 'Een positief geladen helix vooraan die als adres van het mitochondrion werkt.', en: 'A positively charged helix at the front that acts as the mitochondrial address.' }],
        [{ nl: 'import', en: 'import' }, { nl: 'Het binnenbrengen van in het cytosol gemaakte eiwitten.', en: 'Bringing in proteins that were made in the cytosol.' }],
      ],
      steps: {
        0: { tag: ['mtDNA', 'mtDNA'], title: { nl: 'Het mitochondrion maakt zelf 13 eiwitten', en: 'The mitochondrion makes 13 proteins itself' }, text: { nl: 'Het mitochondriaal DNA (mtDNA) levert 13 eiwitten. Meer dan duizend andere worden in het cytosol gemaakt en geïmporteerd.', en: 'Mitochondrial DNA (mtDNA) yields 13 proteins. Over a thousand others are made in the cytosol and imported.' } },
        1: { tag: ['presequentie', 'presequence'], title: { nl: 'De presequentie is het adres', en: 'The presequence is the address' }, text: { nl: 'Vooraan zit een helix met aan één kant positieve ladingen: de presequentie, het adres van het mitochondrion.', en: 'At the front sits a helix with positive charges on one side: the presequence, the mitochondrion’s address.' } },
        7: { tag: ['binnen vouwen', 'fold inside'], title: { nl: 'Binnenhalen en opvouwen', en: 'Pulling in and folding' }, text: { nl: 'Een chaperone binnenin trekt de rest van de keten naar binnen. Daarna helpt hij het eiwit weer op te vouwen.', en: 'A chaperone inside pulls in the rest of the chain. Then it helps the protein fold up again.' } },
      },
    },
  },
  'perox': {
    hobby: {
      kort: { nl: 'Het peroxisoom is een klein blaasje in de cel dat onder meer heel lange vetten afbreekt. De meeste van zijn eiwitten dragen een adres van drie letters op het einde. Anders dan bij sommige andere delen van de cel gaan ze gevouwen naar binnen.', en: 'The peroxisome is a small bubble in the cell that, among other things, breaks down very long fats. Most of its proteins carry an address of three letters at the end. Unlike for some other parts of the cell, they go inside already folded.' },
      steps: {
        0: { tag: ['blaasje', 'little bubble'], title: { nl: 'Een blaasje dat lange vetten afbreekt', en: 'A bubble that breaks down long fats' }, text: { nl: 'Dit kleine blaasje heeft één vlies en breekt onder meer heel lange vetten af.', en: 'This small bubble has one membrane and breaks down, among other things, very long fats.' } },
        1: { tag: ['drie letters', 'three letters'], title: { nl: 'Drie letters op het einde zijn het adres', en: 'Three letters at the end are the address' }, text: { nl: 'Helemaal aan het einde van het eiwit staan drie bouwsteentjes, S, K en L, en die vormen samen het adres.', en: 'At the very end of the protein are three building blocks, S, K and L, and together they form the address.' } },
        3: { tag: ['gevouwen binnen', 'enters folded'], title: { nl: 'Gevouwen mee naar binnen', en: 'Taken in folded' }, text: { nl: 'Een drager brengt het eiwit door het vlies zonder het uit te rollen, en zelfs een groepje eiwitten samen past erin.', en: 'A carrier takes the protein through the membrane without unrolling it, and even a group of proteins together fits in.' } },
      },
    },
    secundair: {
      kort: { nl: 'Het peroxisoom is een organel met één membraan dat onder meer zeer lange vetzuren afbreekt. De meeste van zijn eiwitten dragen op het C-uiteinde het signaal PTS1, bv. Ser-Lys-Leu (SKL). Een receptor brengt ze naar binnen, zelfs gevouwen.', en: 'The peroxisome is an organelle with one membrane that, among other things, breaks down very long fatty acids. Most of its proteins carry the signal PTS1 at their C-end, for example Ser-Lys-Leu (SKL). A receptor brings them in, even folded.' },
      terms: [
        [{ nl: 'peroxisoom', en: 'peroxisome' }, { nl: 'Een klein organel met één membraan dat o.a. zeer lange vetzuren afbreekt.', en: 'A small organelle with one membrane that breaks down very long fatty acids, among other things.' }],
        [{ nl: 'PTS1', en: 'PTS1' }, { nl: 'Drie aminozuren op het C-uiteinde, zoals SKL: het adres van het peroxisoom.', en: 'Three amino acids at the C-end, such as SKL: the peroxisome’s address.' }],
        [{ nl: 'importreceptor', en: 'import receptor' }, { nl: 'Een drager die het signaal herkent en het eiwit naar binnen brengt.', en: 'A carrier that recognises the signal and brings the protein in.' }],
      ],
      steps: {
        0: { tag: ['peroxisoom', 'peroxisome'], title: { nl: 'Het peroxisoom breekt lange vetzuren af', en: 'The peroxisome breaks down long fatty acids' }, text: { nl: 'Een peroxisoom is een klein organel met één membraan. Het breekt onder meer zeer lange vetzuren af.', en: 'A peroxisome is a small organelle with one membrane. Among other things, it breaks down very long fatty acids.' } },
        1: { tag: ['PTS1', 'PTS1'], title: { nl: 'PTS1: drie aminozuren op het einde', en: 'PTS1: three amino acids at the end' }, text: { nl: 'Aan het C-uiteinde van het eiwit staan drie aminozuren, bv. S-K-L. Dat signaal, PTS1, is het adres van het peroxisoom.', en: 'At the C-end of the protein are three amino acids, e.g. S-K-L. That signal, PTS1, is the peroxisome’s address.' } },
        3: { tag: ['gevouwen import', 'folded import'], title: { nl: 'Gevouwen mee naar binnen', en: 'Imported folded' }, text: { nl: 'De receptor brengt het eiwit door het membraan zonder het te ontvouwen. Zelfs een complex van eiwitten kan erin.', en: 'The receptor takes the protein through the membrane without unfolding it. Even a complex of proteins can get in.' } },
      },
    },
  },
  'proteasoom': {
    hobby: {
      kort: { nl: 'Het proteasoom is een afgesloten buis die eiwitten in korte stukjes knipt, een soort papierversnipperaar van de cel. De knipplekken zitten binnenin, zodat gewone eiwitten veilig zijn. Een kap met zes motortjes rolt het eiwit uit en duwt het naar binnen.', en: 'The proteasome is a closed tube that cuts proteins into short pieces, a kind of paper shredder for the cell. The cutting spots are inside, so ordinary proteins are safe. A lid with six little motors unrolls the protein and pushes it in.' },
      steps: {
        0: { tag: ['versnipperaar', 'shredder'], title: { nl: 'Een machine die eiwitten afbreekt', en: 'A machine that breaks down proteins' }, text: { nl: 'Dit is de echte afbraakmachine van de mens, gebouwd uit meer dan 30 verschillende eiwitten.', en: 'This is the real human shredding machine, built from more than 30 different proteins.' } },
        4: { tag: ['uitrollen', 'unrolling'], title: { nl: 'Zes motortjes rollen het eiwit uit', en: 'Six motors unroll the protein' }, text: { nl: 'Zes motortjes vormen een ring, hier van opzij gezien, die energie verbruikt; ze trekken het eiwit open en duwen het de buis in.', en: 'Six little motors form a ring, seen here from the side, that uses energy; they pull the protein open and push it into the tube.' } },
        6: { tag: ['stukjes', 'little pieces'], title: { nl: 'Er komen korte stukjes uit', en: 'Short pieces come out' }, text: { nl: 'Uit de buis komen stukjes van een paar tot zo’n twintig bouwsteentjes, die verder afgebroken en hergebruikt worden.', en: 'Out of the tube come pieces of a few to about twenty building blocks, which are broken down further and reused.' } },
      },
    },
    secundair: {
      kort: { nl: 'Het proteasoom is een groot eiwitcomplex dat eiwitten afbreekt tot korte peptiden. De actieve plaatsen liggen afgeschermd binnenin een vat, zodat gewone eiwitten veilig zijn. Een kap met zes ATPasen ontvouwt het eiwit en duwt het in het vat.', en: 'The proteasome is a large protein complex that breaks proteins down into short peptides. The active sites are shielded inside a barrel, so ordinary proteins are safe. A cap with six ATPases unfolds the protein and pushes it into the barrel.' },
      terms: [
        [{ nl: 'proteasoom', en: 'proteasome' }, { nl: 'Een eiwitcomplex dat eiwitten in korte peptiden knipt.', en: 'A protein complex that cuts proteins into short peptides.' }],
        [{ nl: 'ATPase', en: 'ATPase' }, { nl: 'Een motoreiwit dat energie uit ATP haalt.', en: 'A motor protein that gets energy from ATP.' }],
        [{ nl: 'peptide', en: 'peptide' }, { nl: 'Een korte keten van aminozuren.', en: 'A short chain of amino acids.' }],
      ],
      steps: {
        0: { tag: ['proteasoom', 'proteasome'], title: { nl: 'Het proteasoom breekt eiwitten af', en: 'The proteasome breaks down proteins' }, text: { nl: 'Dit is het menselijke proteasoom, een afbraakmachine uit ruim 30 verschillende eiwitten.', en: 'This is the human proteasome, a breakdown machine made of more than 30 different proteins.' } },
        4: { tag: ['ATPasen', 'ATPases'], title: { nl: 'Zes ATPasen ontvouwen het eiwit', en: 'Six ATPases unfold the protein' }, text: { nl: 'Zes ATPasen vormen een ring (hier van opzij gezien) die ATP verbruikt. Ze ontvouwen het eiwit en duwen het de buis in.', en: 'Six ATPases form a ring (seen here from the side) that uses ATP. They unfold the protein and push it into the tube.' } },
        6: { tag: ['peptiden', 'peptides'], title: { nl: 'Er komen korte peptiden uit', en: 'Short peptides come out' }, text: { nl: 'Uit de buis komen korte peptiden. Die worden verder afgebroken en hergebruikt.', en: 'Short peptides come out of the tube. They are broken down further and reused.' } },
      },
    },
  },
  'autofagie': {
    hobby: {
      kort: { nl: 'Soms pakt de cel een groot stuk van zichzelf in, zoals een kapotte energiecentrale of een klont eiwitten. Dat pakketje versmelt met het verteerblaasje van de cel en wordt verteerd. De bouwsteentjes worden opnieuw gebruikt.', en: 'Sometimes the cell wraps up a big piece of itself, such as a broken power station or a clump of proteins. That package merges with the cell’s digestion bubble and is digested. The building blocks are used again.' },
      steps: {
        0: { tag: ['groot afval', 'big waste'], title: { nl: 'Soms moet een groot stuk weg', en: 'Sometimes a big piece must go' }, text: { nl: 'Een kapotte energiecentrale of een klont eiwitten past niet in de kleine afbraakmachine, dus heeft de cel een ander systeem.', en: 'A broken power station or a clump of proteins does not fit in the small shredding machine, so the cell has another system.' } },
        1: { tag: ['inpakken', 'wrapping up'], title: { nl: 'Een vlies groeit eromheen', en: 'A membrane grows around it' }, text: { nl: 'Een plat stukje vlies groeit als een kom om het afval heen, tot het helemaal ingepakt is.', en: 'A flat piece of membrane grows like a bowl around the waste, until it is fully wrapped.' } },
        3: { tag: ['versmelten', 'merging'], title: { nl: 'Het pakketje versmelt met het verteerblaasje', en: 'The package merges with the digestion bubble' }, text: { nl: 'Het buitenste vlies raakt het verteerblaasje en smelt ermee samen, zodat de knipscharen rond het afval komen.', en: 'The outer membrane touches the digestion bubble and merges with it, so the cutting scissors reach the waste.' } },
        4: { tag: ['hergebruik', 'reuse'], title: { nl: 'Afbreken en hergebruiken', en: 'Breaking down and reusing' }, text: { nl: 'De knipscharen breken eerst het binnenste vlies af en dan het afval, en de bouwsteentjes gaan terug de cel in.', en: 'The scissors first break down the inner membrane and then the waste, and the building blocks go back into the cell.' } },
      },
    },
    secundair: {
      kort: { nl: 'Bij autofagie groeit een membraan rond een stuk cytoplasma, zoals een beschadigd mitochondrion of een eiwitklont, en sluit tot een autofagosoom met dubbele membraan. Dat versmelt met het lysosoom, waar de inhoud wordt afgebroken. De bouwstenen worden hergebruikt.', en: 'In autophagy a membrane grows around a piece of cytoplasm, such as a damaged mitochondrion or a protein clump, and closes into an autophagosome with a double membrane. It fuses with the lysosome, where the contents are broken down. The building blocks are reused.' },
      terms: [
        [{ nl: 'autofagie', en: 'autophagy' }, { nl: 'De cel breekt een stuk van zichzelf af via het lysosoom.', en: 'The cell breaks down a part of itself via the lysosome.' }],
        [{ nl: 'fagofoor', en: 'phagophore' }, { nl: 'Het platte membraanstuk dat rond het afval groeit.', en: 'The flat piece of membrane that grows around the waste.' }],
        [{ nl: 'autofagosoom', en: 'autophagosome' }, { nl: 'Het blaasje met dubbele membraan rond het afval.', en: 'The bubble with a double membrane around the waste.' }],
        [{ nl: 'lysosoom', en: 'lysosome' }, { nl: 'Het verteerblaasje vol knipenzymen.', en: 'The digestion bubble full of cutting enzymes.' }],
      ],
      steps: {
        0: { tag: ['autofagie', 'autophagy'], title: { nl: 'Soms moet een groot stuk weg', en: 'Sometimes a big piece must go' }, text: { nl: 'Een beschadigd mitochondrion of een eiwitklont past niet in het proteasoom. Daarvoor dient autofagie.', en: 'A damaged mitochondrion or a protein clump does not fit in the proteasome. That is what autophagy is for.' } },
        1: { tag: ['fagofoor', 'phagophore'], title: { nl: 'Een fagofoor groeit eromheen', en: 'A phagophore grows around it' }, text: { nl: 'Een plat stuk membraan, de fagofoor, groeit als een kom om het afval heen en sluit tot een autofagosoom.', en: 'A flat piece of membrane, the phagophore, grows like a bowl around the waste and closes into an autophagosome.' } },
        3: { tag: ['fusie', 'fusion'], title: { nl: 'Het autofagosoom versmelt met het lysosoom', en: 'The autophagosome fuses with the lysosome' }, text: { nl: 'De buitenste membraan versmelt met een lysosoom. Zo komen de knipenzymen rond het afval.', en: 'The outer membrane fuses with a lysosome. That brings the cutting enzymes around the waste.' } },
        4: { tag: ['hergebruik', 'recycling'], title: { nl: 'Afbreken en hergebruiken', en: 'Breaking down and reusing' }, text: { nl: 'De enzymen breken eerst de binnenste membraan af, dan het afval. De bouwstenen gaan terug naar het cytosol.', en: 'The enzymes first break down the inner membrane, then the waste. The building blocks return to the cytosol.' } },
      },
    },
  },
};
