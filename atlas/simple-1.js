/* Eenvoudige laag voor de atlas (deel 1). */
export const SIMPLE = {
  bdna: {
    title: { nl: 'Gewone DNA-helix (B-DNA)', en: 'Ordinary DNA helix (B-DNA)' },
    sub: { nl: 'de vorm van bijna al het DNA in je cellen', en: 'the shape of almost all DNA in your cells' },
    kort: {
      nl: 'Dit is de vorm die DNA bijna altijd heeft in je cellen: een [[dubbele helix|dubbelhelix]], zoals een ladder die rechtsom gedraaid is. De sporten zijn paren van basen. Langs de buitenkant lopen een brede en een smalle [[groef|groef]].',
      en: 'This is the shape DNA almost always has in your cells: a [[double helix|dubbelhelix]], like a ladder twisted to the right. The rungs are pairs of bases. Along the outside run a wide and a narrow [[groove|groef]].' },
    look: {
      nl: 'De twee blauwe buizen zijn de twee strengen; de staafjes ertussen zijn de basen, telkens twee tegenover elkaar. Draai de figuur en zoek de brede en de smalle groef.',
      en: 'The two blue tubes are the two strands; the sticks between them are the bases, always two facing each other. Turn the figure and look for the wide and the narrow groove.' },
    why: {
      nl: 'Bijna al het DNA in je celkernen heeft deze vorm. Eiwitten die genen aan- of uitzetten lezen de basen vooral via de brede groef.',
      en: 'Almost all DNA in your cell nuclei has this shape. Proteins that switch genes on or off read the bases mainly through the wide groove.' },
    facts: [
      [{ nl: 'Wat is het?', en: 'What is it?' }, { nl: 'de standaardvorm van DNA', en: 'the standard shape of DNA' }],
      [{ nl: 'Waar in het lichaam', en: 'Where in the body' }, { nl: 'bijna al je DNA, in de celkern', en: 'almost all your DNA, in the cell nucleus' }],
      [{ nl: 'Brede groef', en: 'Wide groove' }, { nl: 'hier lezen de meeste eiwitten de basen', en: 'where most proteins read the bases' }],
      [{ nl: 'Smalle groef', en: 'Narrow groove' }, { nl: 'in het midden gevuld met een rij watermoleculen', en: 'filled with a row of water molecules in the middle' }],
      [{ nl: 'Dit model', en: 'This model' }, { nl: 'een kort stukje DNA, in het lab gemaakt', en: 'a short piece of DNA, made in the lab' }],
    ],
  },

  adna: {
    title: { nl: 'Kortere, dikkere DNA-helix (A-DNA)', en: 'Shorter, thicker DNA helix (A-DNA)' },
    sub: { nl: 'de vorm van DNA dat water verliest', en: 'the shape of DNA that loses water' },
    kort: {
      nl: 'Ook dit is een rechtsgedraaide [[dubbele helix|dubbelhelix]], maar korter en dikker dan gewoon DNA. De basenparen staan schuin en liggen niet in het midden. Daardoor loopt er een hol kanaal door de helix.',
      en: 'This is also a right-handed [[double helix|dubbelhelix]], but shorter and thicker than ordinary DNA. The base pairs are tilted and do not sit in the middle. As a result, a hollow channel runs through the helix.' },
    look: {
      nl: 'Kijk recht in de lengte van de helix: in het midden zie je een open kanaal. De staafjes (de basen) staan schuin in plaats van plat.',
      en: 'Look straight down the length of the helix: in the middle you see an open channel. The sticks (the bases) are tilted instead of flat.' },
    why: {
      nl: 'Zuiver A-DNA is zeldzaam in de cel. Maar dubbelstrengig RNA heeft (bijna) altijd deze vorm, en DNA neemt ze plaatselijk aan in sommige eiwitten.',
      en: 'Pure A-DNA is rare in the cell. But double-stranded RNA (almost) always has this shape, and DNA takes it on locally inside some proteins.' },
    facts: [
      [{ nl: 'Wanneer?', en: 'When?' }, { nl: 'als DNA uitdroogt, bv. in kristallen', en: 'when DNA dries out, e.g. in crystals' }],
      [{ nl: 'Verschil met B-DNA', en: 'Difference with B-DNA' }, { nl: 'korter, dikker, basen schuin, hol midden', en: 'shorter, thicker, tilted bases, hollow centre' }],
      [{ nl: 'Ook bij', en: 'Also in' }, { nl: 'dubbelstrengig RNA, en RNA gepaard met DNA', en: 'double-stranded RNA, and RNA paired with DNA' }],
      [{ nl: 'In de cel', en: 'In the cell' }, { nl: 'zeldzaam; plaatselijk, bv. in DNA-kopieerenzymen', en: 'rare; locally, e.g. in DNA-copying enzymes' }],
    ],
  },

  zdna: {
    title: { nl: 'Linksdraaiend DNA (Z-DNA)', en: 'Left-handed DNA (Z-DNA)' },
    sub: { nl: 'DNA dat de andere kant op draait', en: 'DNA that twists the other way' },
    kort: {
      nl: 'De meeste DNA-helices draaien rechtsom, zoals een gewone schroef. Z-DNA draait linksom, en zijn ruggengraat loopt in een zigzag: vandaar de Z. Het ontstaat vooral in stukken waar C en G elkaar afwisselen.',
      en: 'Most DNA helices twist to the right, like an ordinary screw. Z-DNA twists to the left, and its backbone runs in a zigzag: hence the Z. It forms mainly in stretches where C and G alternate.' },
    look: {
      nl: 'Volg één blauwe streng: ze slingert in een zigzag in plaats van als een gladde spiraal. Draai de figuur en vergelijk de draairichting met gewoon B-DNA.',
      en: 'Follow one blue strand: it winds in a zigzag instead of a smooth spiral. Turn the figure and compare the direction of the twist with ordinary B-DNA.' },
    why: {
      nl: 'Z-DNA ontstaat even in de cel, net achter het enzym dat een gen afleest, waar het DNA opengedraaid wordt. Sommige eiwitten van de afweer tegen virussen herkennen deze vorm.',
      en: 'Z-DNA forms briefly in the cell, just behind the enzyme that reads a gene, where the DNA is being unwound. Some proteins of the defence against viruses recognise this shape.' },
    facts: [
      [{ nl: 'Waarom "Z"?', en: 'Why "Z"?' }, { nl: 'de ruggengraat loopt in een zigzag', en: 'the backbone runs in a zigzag' }],
      [{ nl: 'Typische volgorde', en: 'Typical sequence' }, { nl: 'afwisselend C en G (of C en A)', en: 'alternating C and G (or C and A)' }],
      [{ nl: 'Waar ontstaat het?', en: 'Where does it form?' }, { nl: 'even, achter het enzym dat een gen afleest', en: 'briefly, behind the enzyme that reads a gene' }],
      [{ nl: 'Wie herkent het?', en: 'Who recognises it?' }, { nl: 'eiwitten zoals ADAR1 en ZBP1 (afweer)', en: 'proteins such as ADAR1 and ZBP1 (defence)' }],
    ],
  },

  zalpha: {
    title: { nl: 'Eiwit herkent linksdraaiend DNA (Zα-domein)', en: 'Protein recognises left-handed DNA (Zα domain)' },
    sub: { nl: 'voorbeeld: een stukje van menselijk ADAR1', en: 'example: a piece of human ADAR1' },
    kort: {
      nl: 'Hier houden twee kleine eiwitstukjes een kort stuk linksdraaiend DNA vast. Ze letten niet op de letters van het DNA, maar op de vorm: de zigzag van de ruggengraat. Dit toont dat de cel Z-DNA echt kan herkennen.',
      en: 'Here two small protein pieces hold on to a short piece of left-handed DNA. They do not look at the letters of the DNA, but at its shape: the zigzag of the backbone. This shows that the cell can really recognise Z-DNA.' },
    look: {
      nl: 'Het paarse is het eiwit, het blauwe het DNA. Zie hoe de twee eiwitstukjes tegen de zigzaggende ruggengraat van de helix aanliggen.',
      en: 'The purple part is the protein, the blue part the DNA. See how the two protein pieces lie against the zigzag backbone of the helix.' },
    why: {
      nl: 'ADAR1 past RNA aan door er letters in te veranderen. Eiwitten met dit stukje, zoals ADAR1 en ZBP1, spelen een rol in de afweer en bij ontsteking.',
      en: 'ADAR1 edits RNA by changing letters in it. Proteins with this piece, such as ADAR1 and ZBP1, play a role in defence and in inflammation.' },
    facts: [
      [{ nl: 'Wat is het?', en: 'What is it?' }, { nl: 'twee eiwitstukjes vast aan Z-DNA', en: 'two protein pieces bound to Z-DNA' }],
      [{ nl: 'Eiwit uit', en: 'Protein from' }, { nl: 'de mens (het enzym ADAR1)', en: 'humans (the enzyme ADAR1)' }],
      [{ nl: 'Herkent', en: 'Recognises' }, { nl: 'de vorm van het DNA, niet de letters', en: 'the shape of the DNA, not the letters' }],
      [{ nl: 'Rol in het lichaam', en: 'Role in the body' }, { nl: 'afweer tegen virussen en ontsteking', en: 'defence against viruses and inflammation' }],
    ],
  },

  g4: {
    title: { nl: 'Vier strengen rond G-kwartetten (G-quadruplex)', en: 'Four strands around G-quartets (G-quadruplex)' },
    sub: { nl: 'uit het uiteinde van menselijke chromosomen', en: 'from the end of human chromosomes' },
    kort: {
      nl: 'Een DNA-streng met veel G’s kan zich opvouwen tot een blokje. Telkens vier G’s vormen een plat vierkant, en drie vierkanten liggen op elkaar gestapeld. In het midden zitten [[kaliumionen|ion]] die het blokje bijeenhouden.',
      en: 'A DNA strand with many Gs can fold into a little block. Each time, four Gs form a flat square, and three squares are stacked on top of each other. In the middle sit [[potassium ions|ion]] that hold the block together.' },
    look: {
      nl: 'De paarse bolletjes in het midden zijn kaliumionen; rond elk ervan liggen G’s in platte vierkanten. De lussen van de streng steken als een propeller naar buiten.',
      en: 'The purple balls in the middle are potassium ions; around each of them lie Gs in flat squares. The loops of the strand stick out like a propeller.' },
    why: {
      nl: 'De uiteinden van onze chromosomen en sommige schakelaars van genen kunnen zo’n blokje vormen. Stoffen die het blokje stabiel houden, worden onderzocht als middel tegen kanker.',
      en: 'The ends of our chromosomes and some gene switches can form such a block. Substances that keep the block stable are being studied as a treatment against cancer.' },
    facts: [
      [{ nl: 'Gemaakt van', en: 'Made of' }, { nl: 'één DNA-streng met veel G’s', en: 'one DNA strand with many Gs' }],
      [{ nl: 'Waar in de cel', en: 'Where in the cell' }, { nl: 'chromosoomuiteinden, genschakelaars, ook in RNA', en: 'chromosome ends, gene switches, also in RNA' }],
      [{ nl: 'Gezien in de cel?', en: 'Seen in the cell?' }, { nl: 'ja, zichtbaar gemaakt in menselijke celkernen', en: 'yes, made visible in human cell nuclei' }],
      [{ nl: 'Vorm in dit model', en: 'Shape in this model' }, { nl: 'alle strengstukken lopen dezelfde kant op', en: 'all strand pieces run the same way' }],
      [{ nl: 'Belang', en: 'Importance' }, { nl: 'onderzocht als aanpak tegen kanker', en: 'studied as an approach against cancer' }],
    ],
  },

  g4basket: {
    title: { nl: 'G-quadruplex in mandvorm', en: 'Basket-shaped G-quadruplex' },
    sub: { nl: 'dezelfde DNA-streng, andere omstandigheden', en: 'the same DNA strand, other conditions' },
    kort: {
      nl: 'Dit is dezelfde DNA-streng als bij de [[G-quadruplex|quadruplex]] met kalium, maar nu in een oplossing met natrium. De streng vouwt dan anders: als een mandje, waarbij de stukken afwisselend heen en terug lopen. Eén streng kan dus verschillende vormen aannemen.',
      en: 'This is the same DNA strand as in the [[G-quadruplex|quadruplex]] with potassium, but now in a solution with sodium. The strand then folds differently: like a basket, with its pieces running alternately back and forth. So one strand can take on different shapes.' },
    look: {
      nl: 'Volg de blauwe buis: ze gaat telkens op en neer langs het blok, en één lus loopt schuin over een van de vlakken. In het midden liggen de G’s weer in platte vierkanten.',
      en: 'Follow the blue tube: it keeps going up and down along the block, and one loop runs diagonally across one of the faces. In the middle the Gs again lie in flat squares.' },
    why: {
      nl: 'Dit toont dat zo’n G-blokje meerdere vormen heeft, afhankelijk van de omgeving. In de cel is er vooral kalium en maar weinig natrium.',
      en: 'This shows that such a G-block has several shapes, depending on its surroundings. Inside the cell there is mostly potassium and only little sodium.' },
    facts: [
      [{ nl: 'Zelfde als', en: 'Same as' }, { nl: 'de telomeer-streng van de G-quadruplex met kalium', en: 'the telomere strand of the G-quadruplex with potassium' }],
      [{ nl: 'Verschil', en: 'Difference' }, { nl: 'strengstukken lopen afwisselend heen en terug', en: 'strand pieces run alternately back and forth' }],
      [{ nl: 'Waarom anders?', en: 'Why different?' }, { nl: 'natrium in plaats van kalium', en: 'sodium instead of potassium' }],
      [{ nl: 'In de cel', en: 'In the cell' }, { nl: 'vooral kalium, weinig natrium', en: 'mostly potassium, little sodium' }],
    ],
  },

  imotif: {
    title: { nl: 'In elkaar geschoven C-paren (i-motief)', en: 'Interlocked C pairs (i-motif)' },
    sub: { nl: 'de C-rijke streng van een chromosoomuiteinde', en: 'the C-rich strand of a chromosome end' },
    kort: {
      nl: 'Tegenover een DNA-streng vol G’s ligt een streng vol C’s. Ook die kan zich opvouwen: telkens twee C’s vormen een paar. De paren van twee dubbele stukjes schuiven om beurt tussen elkaar, zoals de tanden van een rits. Dat lukt alleen in een licht zure omgeving.',
      en: 'Opposite a DNA strand full of Gs lies a strand full of Cs. It can fold up too: each time, two Cs form a pair. The pairs of two double pieces slide in between each other in turn, like the teeth of a zip. This only works in slightly acidic surroundings.' },
    look: {
      nl: 'Kijk naar de staafjes in het midden: elke laag is een paar van twee C’s, en de lagen van de twee stukjes liggen om beurt op elkaar. De groeven aan de buitenkant zijn heel smal.',
      en: 'Look at the sticks in the middle: each layer is a pair of two Cs, and the layers of the two pieces lie on top of each other in turn. The grooves on the outside are very narrow.' },
    why: {
      nl: 'i-motieven kunnen ontstaan in de C-rijke streng van chromosoomuiteinden en genschakelaars, tegenover G-quadruplexen. In 2018 zijn ze voor het eerst in menselijke celkernen gezien.',
      en: 'i-Motifs can form in the C-rich strand of chromosome ends and gene switches, opposite G-quadruplexes. In 2018 they were seen in human cell nuclei for the first time.' },
    facts: [
      [{ nl: 'Gemaakt van', en: 'Made of' }, { nl: 'één DNA-streng met veel C’s', en: 'one DNA strand with many Cs' }],
      [{ nl: 'Basenpaar', en: 'Base pair' }, { nl: 'C met C, in plaats van C met G', en: 'C with C, instead of C with G' }],
      [{ nl: 'Nodig', en: 'Needs' }, { nl: 'een licht zure omgeving', en: 'slightly acidic surroundings' }],
      [{ nl: 'Waar in de cel', en: 'Where in the cell' }, { nl: 'tegenover G-quadruplexen, bv. in telomeren', en: 'opposite G-quadruplexes, e.g. in telomeres' }],
      [{ nl: 'Gezien in de cel?', en: 'Seen in the cell?' }, { nl: 'ja, in 2018, in menselijke celkernen', en: 'yes, in 2018, in human cell nuclei' }],
    ],
  },

  triplex: {
    title: { nl: 'Drie strengen DNA (triplex)', en: 'Three strands of DNA (triplex)' },
    sub: { nl: 'een extra streng in de brede groef', en: 'an extra strand in the wide groove' },
    kort: {
      nl: 'Hier ligt een derde DNA-streng in de brede [[groef|groef]] van een gewone dubbele helix. Die derde streng plakt met extra [[waterstofbruggen|waterstofbrug]] vast aan één van de twee andere strengen. Zo zitten telkens drie basen samen in plaats van twee.',
      en: 'Here a third DNA strand lies in the wide [[groove|groef]] of an ordinary double helix. This third strand sticks to one of the other two strands with extra [[hydrogen bonds|waterstofbrug]]. So each time, three bases sit together instead of two.' },
    look: {
      nl: 'De turquoise buis is de derde streng; ze ligt in de brede groef van de blauwe dubbele helix. Aan beide uiteinden gaat het over in gewoon DNA met twee strengen.',
      en: 'The turquoise tube is the third strand; it lies in the wide groove of the blue double helix. At both ends it continues as ordinary two-stranded DNA.' },
    why: {
      nl: 'In lange DNA-stukken met een speciale volgorde kan het DNA zelf zo’n drievoudig stuk vormen; dat wordt in verband gebracht met DNA-schade. Onderzoekers maakten korte DNA-stukjes die zo gericht aan één plek in het DNA binden.',
      en: 'In long DNA stretches with a special sequence, the DNA itself can form such a triple piece; this has been linked to DNA damage. Researchers made short DNA pieces that bind to one chosen spot in DNA this way.' },
    facts: [
      [{ nl: 'Wat is het?', en: 'What is it?' }, { nl: 'drie DNA-strengen op één plek', en: 'three DNA strands in one place' }],
      [{ nl: 'Derde streng ligt', en: 'Third strand lies' }, { nl: 'in de brede groef van de helix', en: 'in the wide groove of the helix' }],
      [{ nl: 'Combinaties', en: 'Combinations' }, { nl: 'T bij een A–T-paar, C bij een G–C-paar', en: 'T with an A–T pair, C with a G–C pair' }],
      [{ nl: 'Nodig', en: 'Needs' }, { nl: 'een licht zure omgeving', en: 'slightly acidic surroundings' }],
      [{ nl: 'Gebruik in het lab', en: 'Use in the lab' }, { nl: 'gericht één plek in het DNA binden', en: 'binding one chosen spot in DNA' }],
    ],
  },

  holliday: {
    title: { nl: 'DNA-kruispunt (Holliday-junctie)', en: 'DNA crossroads (Holliday junction)' },
    sub: { nl: 'ontstaat als DNA stukken uitwisselt', en: 'forms when DNA swaps pieces' },
    kort: {
      nl: 'Hier komen vier DNA-strengen samen in één punt en vormen vier dubbele armen, zoals een kruispunt. Zo’n kruispunt ontstaat als twee DNA-moleculen stukken uitwisselen. Dat heet [[recombinatie|recombinatie]].',
      en: 'Here four DNA strands meet at one point and form four double arms, like a crossroads. Such a crossroads forms when two DNA molecules swap pieces. This is called [[recombination|recombinatie]].' },
    look: {
      nl: 'Elke streng heeft een eigen kleur. Zie hoe de vier armen per twee op elkaar liggen in een X-vorm, en hoe twee strengen in het midden van de ene helix naar de andere overspringen.',
      en: 'Each strand has its own colour. See how the four arms stack in pairs into an X shape, and how two strands cross over from one helix to the other in the middle.' },
    why: {
      nl: 'Dit kruispunt ontstaat bij het maken van eicellen en zaadcellen en bij het herstel van breuken door beide DNA-strengen. Speciale enzymen maken het daarna weer los.',
      en: 'This crossroads forms when egg and sperm cells are made and when breaks through both DNA strands are repaired. Special enzymes then take it apart again.' },
    facts: [
      [{ nl: 'Gemaakt van', en: 'Made of' }, { nl: '4 DNA-strengen die 4 dubbele armen vormen', en: '4 DNA strands forming 4 double arms' }],
      [{ nl: 'Vorm in dit model', en: 'Shape in this model' }, { nl: 'armen per twee gestapeld tot een X', en: 'arms stacked in pairs into an X' }],
      [{ nl: 'Ontstaat bij', en: 'Forms during' }, { nl: 'uitwisselen van DNA-stukken (recombinatie)', en: 'swapping of DNA pieces (recombination)' }],
      [{ nl: 'Waar in het lichaam', en: 'Where in the body' }, { nl: 'eicellen en zaadcellen maken, DNA-breuken herstellen', en: 'making egg and sperm cells, repairing DNA breaks' }],
      [{ nl: 'Opgeruimd door', en: 'Cleared by' }, { nl: 'enzymen die het kruispunt losmaken', en: 'enzymes that take the crossroads apart' }],
    ],
  },

  netropsin: {
    title: { nl: 'Groefbinding in DNA', en: 'Groove binding in DNA' },
    sub: { nl: 'voorbeeld: netropsine, een antibioticum', en: 'example: netropsin, an antibiotic' },
    kort: {
      nl: 'Sommige kleine moleculen schuiven in de smalle [[groef|groef]] van DNA, zoals een sleutel in een sleuf. Netropsine heeft een gebogen vorm die past in stukken met veel A’s en T’s. Het DNA zelf verandert daarbij nauwelijks van vorm.',
      en: 'Some small molecules slide into the narrow [[groove|groef]] of DNA, like a key into a slot. Netropsin has a curved shape that fits stretches with many As and Ts. The DNA itself hardly changes shape.' },
    look: {
      nl: 'Het molecule met de groene koolstofatomen ligt in de smalle groef, in het midden van de blauwe helix. De helix zelf blijft recht en gewoon.',
      en: 'The molecule with the green carbon atoms lies in the narrow groove, in the middle of the blue helix. The helix itself stays straight and ordinary.' },
    why: {
      nl: 'Zulke groefbinders herkennen een bepaalde DNA-volgorde. Kleurstoffen die DNA in het lab laten oplichten, zoals DAPI en Hoechst, binden op dezelfde manier.',
      en: 'Groove binders like this recognise a specific DNA sequence. Dyes that make DNA light up in the lab, such as DAPI and Hoechst, bind in the same way.' },
    facts: [
      [{ nl: 'Wat is het?', en: 'What is it?' }, { nl: 'een natuurlijk antibioticum', en: 'a natural antibiotic' }],
      [{ nl: 'Bindt aan', en: 'Binds to' }, { nl: 'de smalle groef, waar veel A’s en T’s zitten', en: 'the narrow groove, where there are many As and Ts' }],
      [{ nl: 'Effect op het DNA', en: 'Effect on the DNA' }, { nl: 'nauwelijks: het blijft gewoon B-DNA', en: 'hardly any: it stays ordinary B-DNA' }],
      [{ nl: 'Bindt slecht bij', en: 'Binds poorly at' }, { nl: 'G–C-paren: een stukje van G zit in de weg', en: 'G–C pairs: a part of G is in the way' }],
      [{ nl: 'Werkt net zo', en: 'Works the same way' }, { nl: 'DNA-kleurstoffen DAPI en Hoechst', en: 'DNA dyes DAPI and Hoechst' }],
    ],
  },

  intercalator: {
    title: { nl: 'Intercalatie in DNA', en: 'Intercalation in DNA' },
    sub: { nl: 'voorbeeld: daunomycine, een kankermedicijn', en: 'example: daunomycin, a cancer drug' },
    kort: {
      nl: 'Een plat molecule schuift tussen twee [[basenparen|basenpaar]], zoals een boek dat je in een stapel boeken duwt. Op die plek komen de basenparen twee keer zo ver uit elkaar en draait de helix een beetje open. Dat heet [[intercalatie|intercalatie]].',
      en: 'A flat molecule slides between two [[base pairs|basenpaar]], like a book you push into a pile of books. At that spot the base pairs move twice as far apart and the helix unwinds a little. This is called [[intercalation|intercalatie]].' },
    look: {
      nl: 'De moleculen met groene koolstofatomen zitten aan beide uiteinden tussen de basenparen. Zie hoe de staafjes daar verder uit elkaar staan.',
      en: 'The molecules with green carbon atoms sit between the base pairs at both ends. See how the sticks are further apart there.' },
    why: {
      nl: 'Daunomycine en doxorubicine zijn medicijnen tegen kanker, bv. leukemie en borstkanker. Ze werken ook doordat een DNA-knipenzym aan het DNA blijft vastzitten, waardoor het DNA breekt.',
      en: 'Daunomycin and doxorubicin are drugs against cancer, e.g. leukaemia and breast cancer. They also work because a DNA-cutting enzyme stays stuck to the DNA, so the DNA breaks.' },
    facts: [
      [{ nl: 'Medicijn tegen', en: 'Drug against' }, { nl: 'kanker, bv. leukemie en borstkanker', en: 'cancer, e.g. leukaemia and breast cancer' }],
      [{ nl: 'Effect op het DNA', en: 'Effect on the DNA' }, { nl: 'basenparen twee keer zo ver uit elkaar', en: 'base pairs twice as far apart' }],
      [{ nl: 'Hoe groot', en: 'How large' }, { nl: 'van ~0,34 naar ~0,68 nm op die plek', en: 'from ~0.34 to ~0.68 nm at that spot' }],
      [{ nl: 'Ander deel', en: 'Other part' }, { nl: 'een suikerstaart ligt in de smalle groef', en: 'a sugar tail lies in the narrow groove' }],
      [{ nl: 'In het lab', en: 'In the lab' }, { nl: 'ethidiumbromide werkt ook zo', en: 'ethidium bromide works this way too' }],
    ],
  },

  cisplatin: {
    title: { nl: 'Crosslink in DNA', en: 'Cross-link in DNA' },
    sub: { nl: 'voorbeeld: cisplatine, een chemomedicijn', en: 'example: cisplatin, a chemo drug' },
    kort: {
      nl: 'Cisplatine is een medicijn met een platina-atoom. Het zet twee G’s die naast elkaar op dezelfde streng liggen stevig aan elkaar vast, als een wasknijper: een [[crosslink|crosslink]]. Daardoor knikt het DNA.',
      en: 'Cisplatin is a drug with a platinum atom. It firmly clips together two Gs that lie next to each other on the same strand, like a clothes peg: a [[cross-link|crosslink]]. This makes the DNA bend sharply.' },
    look: {
      nl: 'Het grijze bolletje is het platina-atoom; zie hoe het DNA daar knikt. De smalle groef wordt op die plek breder en ondieper.',
      en: 'The grey ball is the platinum atom; see how the DNA kinks there. At that spot the narrow groove becomes wider and shallower.' },
    why: {
      nl: 'Cisplatine is een van de meest gebruikte kankermedicijnen. De knik blokkeert het kopiëren en aflezen van het DNA; de cel kan de schade herstellen door het stuk weg te knippen.',
      en: 'Cisplatin is one of the most widely used cancer drugs. The kink blocks copying and reading of the DNA; the cell can repair the damage by cutting the piece out.' },
    facts: [
      [{ nl: 'Medicijn tegen', en: 'Drug against' }, { nl: 'o.a. teelbal-, eierstok- en longkanker', en: 'e.g. testicular, ovarian and lung cancer' }],
      [{ nl: 'Bindt aan', en: 'Binds to' }, { nl: 'twee G’s naast elkaar op één streng', en: 'two neighbouring Gs on one strand' }],
      [{ nl: 'Effect op het DNA', en: 'Effect on the DNA' }, { nl: 'knik van ~35–40° (in oplossing tot ~78°)', en: 'kink of ~35–40° (in solution up to ~78°)' }],
      [{ nl: 'Gevolg', en: 'Result' }, { nl: 'DNA kopiëren en aflezen loopt vast', en: 'copying and reading of DNA get stuck' }],
      [{ nl: 'Herstel', en: 'Repair' }, { nl: 'de cel knipt het beschadigde stuk weg', en: 'the cell cuts out the damaged piece' }],
    ],
  },
};

export const EXTRA_GLOSS = {
  'groef': { nl: ['groef', 'Een gleuf die in een spiraal langs de buitenkant van de DNA-helix loopt; er is een brede en een smalle.'], en: ['groove', 'A channel that spirals along the outside of the DNA helix; there is a wide one and a narrow one.'] },
  'ion': { nl: ['ion', 'Een atoom met een elektrische lading, zoals kalium (K⁺) of natrium (Na⁺).'], en: ['ion', 'An atom with an electric charge, such as potassium (K⁺) or sodium (Na⁺).'] },
  'quadruplex': { nl: ['G-quadruplex', 'Een blokje van DNA waarin telkens vier G’s een plat vierkant vormen, met de vierkanten op elkaar gestapeld.'], en: ['G-quadruplex', 'A little block of DNA in which groups of four Gs form flat squares, stacked on top of each other.'] },
  'recombinatie': { nl: ['recombinatie', 'Het uitwisselen van stukken tussen twee DNA-moleculen met (bijna) dezelfde volgorde.'], en: ['recombination', 'The swapping of pieces between two DNA molecules with (almost) the same sequence.'] },
  'intercalatie': { nl: ['intercalatie', 'Een plat molecule dat tussen twee basenparen van DNA schuift.'], en: ['intercalation', 'A flat molecule sliding in between two base pairs of DNA.'] },
  'crosslink': { nl: ['crosslink', 'Een stevige verbinding die twee stukken DNA aan elkaar vastzet.'], en: ['cross-link', 'A strong bond that fixes two parts of DNA to each other.'] },
};
