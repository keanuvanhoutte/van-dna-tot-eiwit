/* Eenvoudige laag voor de atlas (deel 2). */
export const SIMPLE = {
  dsrna: {
    title: { nl: 'Dubbele helix van RNA (A-vorm)', en: 'RNA double helix (A-form)' },
    sub: { nl: 'voorbeeld: kort stukje, gemaakt in het lab', en: 'example: short piece, made in the lab' },
    kort: {
      nl: 'Meestal is RNA één losse draad. Maar twee passende RNA-draden kunnen ook rond elkaar draaien, net zoals DNA. Die spiraal is wel korter en breder dan die van DNA.',
      en: 'RNA is usually a single loose strand. But two matching RNA strands can also twist around each other, just like DNA. That spiral is shorter and wider than the DNA one.' },
    look: {
      nl: 'Twee RNA-strengen draaien rond elkaar, met de basenparen ertussen. Merk op dat die paren schuin staan, niet plat zoals in gewoon DNA.',
      en: 'Two RNA strands wind around each other, with the base pairs between them. Note that those pairs are tilted, not flat as in ordinary DNA.' },
    why: {
      nl: 'Korte dubbele stukken zitten in veel gevouwen RNA’s, zoals tRNA. Lang dubbel RNA is vaak een teken van een virus: de cel herkent het en reageert erop.',
      en: 'Short double pieces occur in many folded RNAs, such as tRNA. Long double RNA is often a sign of a virus: the cell recognises it and responds.' },
    facts: [
      [{ nl: 'Wat is het?', en: 'What is it?' }, { nl: 'twee RNA-strengen gepaard tot één helix', en: 'two RNA strands paired into one helix' }],
      [{ nl: 'Verschil met DNA', en: 'Difference with DNA' }, { nl: 'korter en breder, basenparen staan schuin', en: 'shorter and wider, base pairs are tilted' }],
      [{ nl: 'Waar in de cel', en: 'Where in the cell' }, { nl: 'stukken van tRNA, rRNA en siRNA’s', en: 'parts of tRNA, rRNA and siRNAs' }],
      [{ nl: 'Bij virussen', en: 'In viruses' }, { nl: 'sommige (bv. rotavirus) dragen dubbel RNA als genen', en: 'some (e.g. rotavirus) carry double RNA as genes' }],
    ],
  },
  hybrid: {
    title: { nl: 'RNA en DNA samen in één helix (RNA–DNA-hybride)', en: 'RNA and DNA together in one helix (RNA–DNA hybrid)' },
    sub: { nl: 'één RNA-streng gepaard met één DNA-streng', en: 'one RNA strand paired with one DNA strand' },
    kort: {
      nl: 'Hier paart een RNA-draad met een DNA-draad. Zo’n mengvorm ontstaat even als de cel haar DNA kopieert, of als een [[retrovirus|retrovirus]] zoals HIV zijn RNA omzet in DNA. De spiraal lijkt het meest op die van dubbel RNA.',
      en: 'Here an RNA strand pairs with a DNA strand. Such a mixed form appears briefly when the cell copies its DNA, or when a [[retrovirus|retrovirus]] such as HIV turns its RNA into DNA. The spiral looks most like that of double RNA.' },
    look: {
      nl: 'Eén streng DNA en één streng RNA draaien samen rond elkaar, met de basenparen ertussen.',
      en: 'One DNA strand and one RNA strand wind around each other, with the base pairs between them.' },
    why: {
      nl: 'Zulke hybriden zijn een tussenstap bij het kopiëren van DNA en bij virussen zoals HIV. Daarna breekt een enzym (RNase H) het RNA-deel weer af.',
      en: 'Such hybrids are an intermediate step when DNA is copied and in viruses such as HIV. Afterwards an enzyme (RNase H) breaks down the RNA part.' },
    facts: [
      [{ nl: 'Wat is het?', en: 'What is it?' }, { nl: 'één RNA-streng + één DNA-streng in een helix', en: 'one RNA strand + one DNA strand in a helix' }],
      [{ nl: 'Waar in de cel', en: 'Where in the cell' }, { nl: 'startstukjes (primers) bij het kopiëren van DNA', en: 'starter pieces (primers) when DNA is copied' }],
      [{ nl: 'Bij virussen', en: 'In viruses' }, { nl: 'tussenstap als HIV zijn RNA omzet in DNA', en: 'intermediate when HIV turns its RNA into DNA' }],
      [{ nl: 'Vorm', en: 'Shape' }, { nl: 'lijkt op dubbel RNA, niet op gewoon DNA', en: 'resembles double RNA, not ordinary DNA' }],
      [{ nl: 'Opruimer', en: 'Clean-up' }, { nl: 'enzym RNase H breekt het RNA erin af', en: 'the enzyme RNase H breaks down its RNA' }],
    ],
  },
  tar: {
    title: { nl: 'RNA-lus met uitstulping (bulge)', en: 'RNA hairpin with a bulge' },
    sub: { nl: 'voorbeeld: uit het HIV-virus', en: 'example: from the HIV virus' },
    kort: {
      nl: 'Een RNA-draad plooit terug op zichzelf tot een [[haarspeld|haarspeld]]. Op één plek zitten drie letters zonder partner: een [[bulge|bulge]]. Daardoor krijgt de staaf een knik, en net daar hecht een eiwit van HIV zich vast.',
      en: 'An RNA strand folds back on itself into a [[hairpin|haarspeld]]. In one spot three letters have no partner: a [[bulge|bulge]]. This puts a kink in the stem, and that is exactly where an HIV protein attaches.' },
    look: {
      nl: 'Eén streng plooit dubbel tot een staaf met bovenaan een lusje. Drie basen halverwege hebben geen partner: dat is de bulge, en die doet de staaf knikken.',
      en: 'One strand folds back on itself into a stem with a small loop at the top. Three bases halfway have no partner: that is the bulge, and it makes the stem kink.' },
    why: {
      nl: 'Het HIV-eiwit Tat bindt op de bulge en zorgt dat de cel de virusgenen blijft aflezen. Daarom is TAR een doelwit voor nieuwe middelen tegen HIV.',
      en: 'The HIV protein Tat binds the bulge and makes the cell keep reading the virus genes. That is why TAR is a target for new anti-HIV drugs.' },
    facts: [
      [{ nl: 'Wat is het?', en: 'What is it?' }, { nl: 'haarspeld met drie letters zonder partner', en: 'hairpin with three letters without a partner' }],
      [{ nl: 'Waar', en: 'Where' }, { nl: 'begin van elk RNA dat HIV-1 laat maken', en: 'start of every RNA that HIV-1 has made' }],
      [{ nl: 'Wie bindt erop?', en: 'What binds it?' }, { nl: 'het virus-eiwit Tat', en: 'the virus protein Tat' }],
      [{ nl: 'Gevolg', en: 'Result' }, { nl: 'de cel blijft de virusgenen aflezen', en: 'the cell keeps reading the virus genes' }],
      [{ nl: 'Toepassing', en: 'Use' }, { nl: 'doelwit voor nieuwe antivirale middelen', en: 'target for new antiviral drugs' }],
    ],
  },
  trna: {
    title: { nl: 'RNA-adapter in L-vorm (tRNA)', en: 'L-shaped RNA adapter (tRNA)' },
    sub: { nl: 'voorbeeld: uit gist', en: 'example: from yeast' },
    kort: {
      nl: 'Een [[tRNA|trna]] is een klein RNA dat een aminozuur naar het [[ribosoom|ribosoom]] brengt. Het vouwt zich als een letter L. Aan het ene uiteinde hangt het aminozuur, aan het andere zitten drie letters die de code op het mRNA lezen.',
      en: 'A [[tRNA|trna]] is a small RNA that brings an amino acid to the [[ribosome|ribosoom]]. It folds like the letter L. One end carries the amino acid, the other end has three letters that read the code on the mRNA.' },
    look: {
      nl: 'Eén streng met vijf onderdelen die naadloos in elkaar overlopen: de acceptorstam, waar het aminozuur aan hangt; de anticodonarm aan het andere uiteinde; en de D-arm en de TΨC-arm, die samen de knik van de L vormen. De bolletjes zijn metaalionen die de vorm stevig houden.',
      en: 'One strand with five parts that flow seamlessly into each other: the acceptor stem, where the amino acid hangs; the anticodon arm at the other end; and the D arm and the TΨC arm, which together form the bend of the L. The small balls are metal ions that hold the shape firmly.' },
    why: {
      nl: 'Zonder tRNA kan geen enkele cel eiwitten maken. Elke menselijke cel bevat tientallen soorten tRNA.',
      en: 'Without tRNA no cell can make proteins. Every human cell contains dozens of kinds of tRNA.' },
    facts: [
      [{ nl: 'Wat doet het?', en: 'What does it do?' }, { nl: 'brengt aminozuren naar het ribosoom', en: 'brings amino acids to the ribosome' }],
      [{ nl: 'Vorm', en: 'Shape' }, { nl: 'klaverblad dat zich opvouwt tot een L', en: 'cloverleaf that folds into an L' }],
      [{ nl: 'Afstand uiteinden', en: 'Distance between ends' }, { nl: 'ongeveer 7,5 nm — past precies in het ribosoom', en: 'about 7.5 nm — fits the ribosome exactly' }],
      [{ nl: 'Bijzonder', en: 'Special' }, { nl: 'veel chemisch aangepaste letters', en: 'many chemically modified letters' }],
      [{ nl: 'Geschiedenis', en: 'History' }, { nl: 'eerste RNA-structuur op atoomniveau (1974)', en: 'first RNA structure at atomic level (1974)' }],
    ],
  },
  pseudoknot: {
    title: { nl: 'Ribosoom verspringt op een RNA-knoop (frameshift-pseudoknoop)', en: 'Ribosome shifts on an RNA knot (frameshift pseudoknot)' },
    sub: { nl: 'voorbeeld: uit een plantenvirus', en: 'example: from a plant virus' },
    kort: {
      nl: 'Bij een [[pseudoknoop|pseudoknoop]] paart de lus van een [[haarspeld|haarspeld]] met een stuk RNA verderop. Als het ribosoom tegen die knoop botst, schuift het soms één letter terug. Zo maakt het virus twee eiwitten uit één mRNA.',
      en: 'In a [[pseudoknot|pseudoknoop]] the loop of a [[hairpin|haarspeld]] pairs with a piece of RNA further along. When the ribosome bumps into that knot, it sometimes slips back by one letter. That way the virus makes two proteins from one mRNA.' },
    look: {
      nl: 'Eén streng vormt twee korte staven die op elkaar gestapeld liggen, verbonden door twee lussen. De bolletjes zijn metaalionen uit het kristal.',
      en: 'One strand forms two short stems stacked on top of each other, connected by two loops. The small balls are metal ions from the crystal.' },
    why: {
      nl: 'Veel virussen gebruiken deze truc om meer eiwitten uit één mRNA te halen. Ook het coronavirus SARS-CoV-2 heeft zo’n knoop.',
      en: 'Many viruses use this trick to get more proteins out of one mRNA. The coronavirus SARS-CoV-2 also has such a knot.' },
    facts: [
      [{ nl: 'Wat is het?', en: 'What is it?' }, { nl: 'haarspeld waarvan de lus verderop paart', en: 'hairpin whose loop pairs further along' }],
      [{ nl: 'Bouw', en: 'Build' }, { nl: 'twee gestapelde staven + twee lussen', en: 'two stacked stems + two loops' }],
      [{ nl: 'Effect', en: 'Effect' }, { nl: 'ribosoom schuift soms één letter terug', en: 'ribosome sometimes slips back one letter' }],
      [{ nl: 'Gevolg', en: 'Result' }, { nl: 'twee eiwitten uit één mRNA', en: 'two proteins from one mRNA' }],
      [{ nl: 'Ook bij', en: 'Also in' }, { nl: 'SARS-CoV-2 (HIV-1 gebruikt een haarspeld)', en: 'SARS-CoV-2 (HIV-1 uses a hairpin)' }],
    ],
  },
  terc: {
    title: { nl: 'RNA-knoop met drievoudige paring (pseudoknoop)', en: 'RNA knot with triple pairing (pseudoknot)' },
    sub: { nl: 'voorbeeld: uit menselijk telomerase', en: 'example: from human telomerase' },
    kort: {
      nl: '[[Telomerase|telomerase]] maakt de uiteinden van chromosomen ([[telomeren|telomeer]]) weer langer. Het heeft een eigen RNA met een knoop erin. In die knoop ligt een lus in de groef van een staaf, zodat telkens drie letters samen paren.',
      en: '[[Telomerase|telomerase]] makes the ends of chromosomes ([[telomeres|telomeer]]) longer again. It has its own RNA with a knot in it. In that knot a loop lies in the groove of a stem, so that three letters pair up each time.' },
    look: {
      nl: 'Eén streng plooit tot staven en lussen. Kijk naar de lus die in de groef van een staaf ligt: daar vormen de basen trio’s in plaats van paren.',
      en: 'One strand folds into stems and loops. Look at the loop lying in the groove of a stem: there the bases form triples instead of pairs.' },
    why: {
      nl: 'Zonder deze knoop werkt telomerase niet. Fouten erin veroorzaken een zeldzame ziekte met te korte telomeren (dyskeratosis congenita).',
      en: 'Without this knot telomerase does not work. Errors in it cause a rare disease with too-short telomeres (dyskeratosis congenita).' },
    facts: [
      [{ nl: 'Wat is het?', en: 'What is it?' }, { nl: 'knoop (pseudoknoop) in het RNA van telomerase', en: 'knot (pseudoknot) in the RNA of telomerase' }],
      [{ nl: 'Bijzonder', en: 'Special' }, { nl: 'basen paren per drie in plaats van per twee', en: 'bases pair in threes instead of twos' }],
      [{ nl: 'Waar actief', en: 'Where active' }, { nl: 'stamcellen, kiemcellen, meeste kankercellen', en: 'stem cells, germ cells, most cancer cells' }],
      [{ nl: 'Ziekte', en: 'Disease' }, { nl: 'fout in de knoop: dyskeratosis congenita', en: 'error in the knot: dyskeratosis congenita' }],
      [{ nl: 'Gemaakt van', en: 'Made of' }, { nl: 'een stukje menselijk RNA', en: 'a small piece of human RNA' }],
    ],
  },
  hammerhead: {
    title: { nl: 'RNA dat zichzelf knipt (ribozym)', en: 'RNA that cuts itself (ribozyme)' },
    sub: { nl: 'voorbeeld: uit een parasitaire worm', en: 'example: from a parasitic worm' },
    kort: {
      nl: 'Dit kleine RNA werkt als een schaar: het knipt zichzelf op één vaste plek door. Een RNA dat zo’n reactie uitvoert, heet een [[ribozym|ribozym]]. Drie staven rond een kern vormen samen de schaar.',
      en: 'This small RNA works like scissors: it cuts itself at one fixed spot. An RNA that carries out such a reaction is called a [[ribozyme|ribozym]]. Three stems around a core together form the scissors.' },
    look: {
      nl: 'Er zijn twee strengen: de lange is de schaar, de korte wordt geknipt. Drie staven komen samen in het midden; het bolletje daar is een metaalion op de knipplek.',
      en: 'There are two strands: the long one is the scissors, the short one gets cut. Three stems meet in the middle; the small ball there is a metal ion at the cutting site.' },
    why: {
      nl: 'Het werd ontdekt bij planten, in kleine ziekmakende RNA’s (viroïden), waar het lange RNA-kopieën in stukken knipt. Het is een schoolvoorbeeld van RNA dat als enzym werkt.',
      en: 'It was discovered in plants, in small disease-causing RNAs (viroids), where it cuts long RNA copies into pieces. It is a textbook example of RNA acting as an enzyme.' },
    facts: [
      [{ nl: 'Wat is het?', en: 'What is it?' }, { nl: 'RNA dat zichzelf doorknipt', en: 'RNA that cuts itself' }],
      [{ nl: 'Bouw', en: 'Build' }, { nl: 'drie staven rond een kern', en: 'three stems around a core' }],
      [{ nl: 'Ontdekt in', en: 'Discovered in' }, { nl: 'viroïden en satelliet-RNA’s van planten', en: 'viroids and satellite RNAs of plants' }],
      [{ nl: 'Ook in', en: 'Also in' }, { nl: 'genomen van dieren, ook zoogdieren', en: 'animal genomes, including mammals' }],
      [{ nl: 'In dit kristal', en: 'In this crystal' }, { nl: 'knipplek geblokkeerd, dus knipt het niet', en: 'cutting site blocked, so it does not cut' }],
    ],
  },
  groupi: {
    title: { nl: 'RNA knipt zichzelf eruit (groep I-intron)', en: 'RNA that cuts itself out (group I intron)' },
    sub: { nl: 'voorbeeld: uit een bacterie', en: 'example: from a bacterium' },
    kort: {
      nl: 'Een [[intron|intron]] is een tussenstuk dat uit een RNA moet. Dit intron doet dat helemaal zelf, zonder eiwit. Het knipt zichzelf eruit en plakt de stukken links en rechts ([[exonen|exon]]) aan elkaar, in twee stappen.',
      en: 'An [[intron|intron]] is an in-between piece that has to come out of an RNA. This intron does that entirely by itself, without protein. It cuts itself out and glues the pieces on the left and right ([[exons|exon]]) together, in two steps.' },
    look: {
      nl: 'Het RNA vouwt zich tot een kluwen van veel gestapelde staven. Het eiwit is enkel een hulpje om te kunnen kristalliseren; de bolletjes zijn metaalionen in het actieve centrum.',
      en: 'The RNA folds into a tangle of many stacked stems. The protein is only a helper for crystallisation; the small balls are metal ions in the active centre.' },
    why: {
      nl: 'Zulke intronen zitten in bacteriën, schimmels, planten en eencelligen, niet in ons kern-DNA. Bij ons doet het spliceosoom hetzelfde werk, met dezelfde chemie.',
      en: 'Such introns occur in bacteria, fungi, plants and single-celled organisms, not in our nuclear DNA. In us the spliceosome does the same job, with the same chemistry.' },
    facts: [
      [{ nl: 'Wat is het?', en: 'What is it?' }, { nl: 'intron dat zichzelf uit het RNA knipt', en: 'intron that cuts itself out of the RNA' }],
      [{ nl: 'Eiwit nodig?', en: 'Protein needed?' }, { nl: 'nee, het RNA doet het zelf', en: 'no, the RNA does it by itself' }],
      [{ nl: 'Moment in beeld', en: 'Moment shown' }, { nl: 'net voor stap 2: beide exonen nog aanwezig', en: 'just before step 2: both exons still present' }],
      [{ nl: 'Waar', en: 'Where' }, { nl: 'bacteriën, schimmels, planten, eencelligen', en: 'bacteria, fungi, plants, single-celled life' }],
      [{ nl: 'Nobelprijs', en: 'Nobel Prize' }, { nl: 'ontdekking door Cech: Nobelprijs 1989', en: 'discovery by Cech: 1989 Nobel Prize' }],
    ],
  },
  rnasep: {
    title: { nl: 'RNA-enzym dat tRNA bijknipt (RNase P)', en: 'RNA enzyme that trims tRNA (RNase P)' },
    sub: { nl: 'voorbeeld: uit een bacterie, met tRNA', en: 'example: from a bacterium, with tRNA' },
    kort: {
      nl: 'Een nieuw [[tRNA|trna]] heeft eerst een te lang voorstuk. RNase P knipt dat eraf. Het knippen gebeurt door het RNA zelf, niet door het eiwit: het is een [[ribozym|ribozym]].',
      en: 'A new [[tRNA|trna]] first has a leader piece that is too long. RNase P cuts it off. The cutting is done by the RNA itself, not by the protein: it is a [[ribozyme|ribozym]].' },
    look: {
      nl: 'Het grote RNA is de schaar, het kleine eiwit helpt. Het L-vormige RNA ertegen is het tRNA dat net geknipt is.',
      en: 'The large RNA is the scissors, the small protein helps. The L-shaped RNA against it is the tRNA that has just been cut.' },
    why: {
      nl: 'Elke cel heeft RNase P nodig om werkende tRNA’s te maken. Samen met het ribosoom is het het bekendste ribozym dat overal in het leven voorkomt.',
      en: 'Every cell needs RNase P to make working tRNAs. Together with the ribosome it is the best-known ribozyme found throughout life.' },
    facts: [
      [{ nl: 'Wat doet het?', en: 'What does it do?' }, { nl: 'knipt het voorstuk van nieuwe tRNA’s af', en: 'cuts the leader off new tRNAs' }],
      [{ nl: 'Wie knipt?', en: 'Who cuts?' }, { nl: 'het RNA (met magnesium); het eiwit helpt', en: 'the RNA (with magnesium); the protein helps' }],
      [{ nl: 'Herkent', en: 'Recognises' }, { nl: 'de vorm van het tRNA, niet de letters', en: 'the shape of the tRNA, not the letters' }],
      [{ nl: 'Bij de mens', en: 'In humans' }, { nl: 'één RNA + ongeveer 10 eiwitten, in de kern', en: 'one RNA + about 10 proteins, in the nucleus' }],
      [{ nl: 'In mitochondriën', en: 'In mitochondria' }, { nl: 'een eiwit zonder RNA doet hetzelfde werk', en: 'a protein without RNA does the same job' }],
    ],
  },
  riboswitch: {
    title: { nl: 'RNA-schakelaar (riboswitch)', en: 'RNA switch (riboswitch)' },
    sub: { nl: 'voorbeeld: uit een bacterie, met adenine', en: 'example: from a bacterium, with adenine' },
    kort: {
      nl: 'Dit stuk [[mRNA|mrna]] werkt als een lichtschakelaar. Als een klein molecule (hier adenine) erin past, verandert het RNA van vorm. Daardoor gaat het gen aan of uit, zonder hulp van een eiwit.',
      en: 'This piece of [[mRNA|mrna]] works like a light switch. When a small molecule (here adenine) fits into it, the RNA changes shape. This turns the gene on or off, without help from a protein.' },
    look: {
      nl: 'Het RNA vormt drie staven die in het midden samenkomen; twee lussen bovenaan grijpen in elkaar. Midden in zit het adenine (met groene koolstofatomen), helemaal ingesloten.',
      en: 'The RNA forms three stems that meet in the middle; two loops at the top grip each other. In the middle sits the adenine (with green carbon atoms), completely enclosed.' },
    why: {
      nl: 'Bacteriën regelen er hun genen mee. Mensen hebben er geen, dus zijn ze een doelwit voor nieuwe antibiotica.',
      en: 'Bacteria use them to control their genes. Humans have none, so they are a target for new antibiotics.' },
    facts: [
      [{ nl: 'Wat is het?', en: 'What is it?' }, { nl: 'stuk mRNA dat een klein molecule herkent', en: 'piece of mRNA that recognises a small molecule' }],
      [{ nl: 'Bindt', en: 'Binds' }, { nl: 'adenine (een van de letters van RNA)', en: 'adenine (one of the letters of RNA)' }],
      [{ nl: 'Effect hier', en: 'Effect here' }, { nl: 'adenine zet het maken van het eiwit AAN', en: 'adenine switches making the protein ON' }],
      [{ nl: 'Waar', en: 'Where' }, { nl: 'vooral bacteriën; ook planten en schimmels', en: 'mainly bacteria; also plants and fungi' }],
      [{ nl: 'Toepassing', en: 'Use' }, { nl: 'doelwit voor nieuwe antibiotica', en: 'target for new antibiotics' }],
    ],
  },
  ribosome: {
    title: { nl: 'Kleine helft van het ribosoom (30S-subeenheid)', en: 'Small half of the ribosome (30S subunit)' },
    sub: { nl: 'voorbeeld: uit een bacterie', en: 'example: from a bacterium' },
    kort: {
      nl: 'Het [[ribosoom|ribosoom]] bouwt eiwitten volgens de code op het [[mRNA|mrna]]. Het bestaat uit twee helften; dit is de kleine. Opvallend: het skelet is een groot RNA, en de eiwitten zitten vooral aan de buitenkant.',
      en: 'The [[ribosome|ribosoom]] builds proteins following the code on the [[mRNA|mrna]]. It has two halves; this is the small one. Striking: its skeleton is a large RNA, and the proteins sit mostly on the outside.' },
    look: {
      nl: 'Het grote RNA bepaalt de vorm; daarrond liggen ongeveer 20 eiwitten. Omdat de structuur zo groot is, zie je enkel de ruggengraat, zonder basen.',
      en: 'The large RNA sets the shape; around it lie roughly 20 proteins. Because the structure is so large, you only see the backbone, without bases.' },
    why: {
      nl: 'Hier wordt de code gelezen, op een plek die bijna volledig uit RNA bestaat. Veel antibiotica binden het ribosoom van bacteriën veel sterker dan het onze.',
      en: 'This is where the code is read, at a spot made almost entirely of RNA. Many antibiotics bind the bacterial ribosome much more strongly than ours.' },
    facts: [
      [{ nl: 'Wat doet het?', en: 'What does it do?' }, { nl: 'leest het mRNA af om een eiwit te bouwen', en: 'reads the mRNA to build a protein' }],
      [{ nl: 'Gemaakt van', en: 'Made of' }, { nl: 'één groot RNA + ongeveer 20 eiwitten', en: 'one large RNA + about 20 proteins' }],
      [{ nl: 'Hoe groot', en: 'How big' }, { nl: 'ongeveer 52 000 atomen', en: 'about 52,000 atoms' }],
      [{ nl: 'Leesplek', en: 'Reading spot' }, { nl: 'bijna helemaal uit RNA', en: 'made almost entirely of RNA' }],
      [{ nl: 'Medicijnen', en: 'Medicines' }, { nl: 'antibiotica zoals tetracyclines binden hier', en: 'antibiotics such as tetracyclines bind here' }],
    ],
  },
  mirna: {
    title: { nl: 'Kort RNA als zoekgids (miRNA)', en: 'Short RNA as a search guide (miRNA)' },
    sub: { nl: 'voorbeeld: menselijk, vast in een eiwit', en: 'example: human, held by a protein' },
    kort: {
      nl: 'Een [[miRNA|mirna]] is een heel kort RNA dat vastzit in het eiwit [[Argonaute|argonaute]]. Een stukje van 7 letters ligt klaar om op een passend mRNA te plakken. Dat mRNA wordt dan minder gebruikt of afgebroken.',
      en: 'A [[miRNA|mirna]] is a very short RNA held inside the protein [[Argonaute|argonaute]]. A stretch of 7 letters lies ready to stick to a matching mRNA. That mRNA is then used less or broken down.' },
    look: {
      nl: 'Het grote eiwit omklemt een korte RNA-streng. Beide uiteinden van het RNA zitten vast in een zakje van het eiwit; niet het hele RNA is zichtbaar.',
      en: 'The large protein clasps a short RNA strand. Both ends of the RNA are held in a pocket of the protein; not all of the RNA is visible.' },
    why: {
      nl: 'Zo regelt de cel hoeveel eiwit er van veel genen gemaakt wordt. Medicijnen met siRNA gebruiken hetzelfde systeem.',
      en: 'This is how the cell controls how much protein is made from many genes. Medicines based on siRNA use the same system.' },
    facts: [
      [{ nl: 'Wat is het?', en: 'What is it?' }, { nl: 'kort gids-RNA in het eiwit Argonaute', en: 'short guide RNA in the protein Argonaute' }],
      [{ nl: 'Zoekstuk', en: 'Search part' }, { nl: '7 letters (de “seed”) zoeken het doel', en: '7 letters (the “seed”) find the target' }],
      [{ nl: 'Gevolg', en: 'Result' }, { nl: 'mRNA minder gebruikt of afgebroken', en: 'mRNA used less or broken down' }],
      [{ nl: 'Perfecte match', en: 'Perfect match' }, { nl: 'het eiwit knipt het mRNA door', en: 'the protein cuts the mRNA' }],
      [{ nl: 'Toepassing', en: 'Use' }, { nl: 'siRNA-medicijnen gebruiken dit systeem', en: 'siRNA drugs use this system' }],
    ],
  },
};

export const EXTRA_GLOSS = {
  'haarspeld': { nl: ['haarspeld', 'Een RNA-draad die terugplooit op zichzelf, zodat een staaf met een lusje bovenaan ontstaat.'], en: ['hairpin', 'An RNA strand that folds back on itself, forming a stem with a small loop at the top.'] },
  'bulge': { nl: ['bulge', 'Een paar letters in één streng van een staaf die geen partner hebben en naar buiten puilen.'], en: ['bulge', 'A few letters in one strand of a stem that have no partner and bulge out.'] },
  'pseudoknoop': { nl: ['pseudoknoop', 'Een RNA-vouw waarbij de lus van een haarspeld paart met een stuk RNA buiten die haarspeld.'], en: ['pseudoknot', 'An RNA fold in which the loop of a hairpin pairs with a piece of RNA outside that hairpin.'] },
  'telomerase': { nl: ['telomerase', 'Een enzym met een eigen RNA dat de uiteinden van chromosomen weer verlengt.'], en: ['telomerase', 'An enzyme with its own RNA that lengthens the ends of chromosomes again.'] },
  'mirna': { nl: ['miRNA', 'Een heel kort RNA (ongeveer 21 letters) dat helpt om passende mRNA’s af te remmen.'], en: ['miRNA', 'A very short RNA (about 21 letters) that helps to slow down matching mRNAs.'] },
};
