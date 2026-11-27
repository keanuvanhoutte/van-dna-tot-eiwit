/* Vaktaal-laag van de 3D-bibliotheek (niveau hoger onderwijs). Zelfde sleutels als simple-*.js en roles.js; ontbrekende velden vallen terug op de eenvoudige tekst.
 * Inhoud enkel herformuleerd uit simple-*.js, roles.js en entries.js (what/feat/cell/sub/org) — geen nieuwe feiten.
 * Kleurwoorden in look/lookSchema volgen de eenvoudige laag (ze verwijzen naar de kleuren in de figuur).
 * facts: zelfde aantal rijen en volgorde als SIMPLE[id].facts · roles: zelfde aantal en volgorde als ROLES[id]. */
const S = (nl, en) => ({ nl, en });
const F = (lnl, len, vnl, ven) => [S(lnl, len), S(vnl, ven)];
const DUO = (nl, en) => [S(nl, en)];

export const PRO = {
  /* ================= DNA-dubbelhelices ================= */
  bdna: {
    look: S('Twee antiparallelle strengen vormen een rechtshandige dubbelhelix; de Watson–Crick-basenparen staan nagenoeg loodrecht op de helixas en zijn erop gecentreerd. Draai de figuur om de brede grote groef en de smalle kleine groef te onderscheiden.',
      'Two antiparallel strands form a right-handed double helix; the Watson–Crick base pairs lie nearly perpendicular to the helix axis and are centred on it. Rotate the figure to distinguish the wide major groove from the narrow minor groove.'),
    facts: [
      F('Definitie', 'Definition', 'standaardconformatie van duplex-DNA', 'canonical conformation of duplex DNA'),
      F('Voorkomen', 'Occurrence', 'vrijwel al het genomische DNA (chromatine, celkern)', 'nearly all genomic DNA (chromatin, nucleus)'),
      F('Grote groef', 'Major groove', 'breed; sequentieherkenning door de meeste DNA-bindende eiwitten', 'wide; sequence readout by most DNA-binding proteins'),
      F('Kleine groef', 'Minor groove', 'smal in het AATT-centrum, bezet door een hydratatieruggengraat', 'narrow at the AATT centre, occupied by a spine of hydration'),
      F('Structuur', 'Structure', 'synthetisch Dickerson-dodecameer d(CGCGAATTCGCG)', 'synthetic Dickerson dodecamer d(CGCGAATTCGCG)'),
    ],
    roles: DUO('Twee antiparallelle strengen met complementaire Watson–Crick-basenparing.', 'Two antiparallel strands with complementary Watson–Crick base pairing.'),
  },

  adna: {
    look: S('Kijk langs de helixas: centraal loopt een hol kanaal, omdat de basenparen van de as weggeschoven zijn. De basenparen zijn bovendien sterk gekanteld ten opzichte van de as.',
      'Look down the helix axis: a hollow channel runs through the centre because the base pairs are displaced from the axis. The base pairs are also strongly inclined relative to the axis.'),
    facts: [
      F('Voorwaarde', 'Condition', 'dehydratatie (kristallen, vezels)', 'dehydration (crystals, fibres)'),
      F('Versus B-DNA', 'Versus B-DNA', '~11 bp/winding, stijging ~2,6 Å, diameter ~23 Å, C3′-endo, gekantelde basenparen, hol kanaal', '~11 bp/turn, rise ~2.6 Å, diameter ~23 Å, C3′-endo, inclined base pairs, hollow channel'),
      F('Ook aangenomen door', 'Also adopted by', 'dsRNA en RNA–DNA-hybriden', 'dsRNA and RNA–DNA hybrids'),
      F('In vivo', 'In vivo', 'zeldzaam; lokaal in eiwitcomplexen, bv. nabij het actieve centrum van DNA-polymerasen', 'rare; locally in protein complexes, e.g. near the active site of DNA polymerases'),
    ],
    roles: DUO('Twee antiparallelle strengen met complementaire Watson–Crick-basenparing, in A-conformatie.', 'Two antiparallel strands with complementary Watson–Crick base pairing, in the A conformation.'),
  },

  zdna: {
    look: S('Volg één streng: de suiker-fosfaatruggengraat verloopt zigzaggend, met een dinucleotide als herhalingseenheid. Vergelijk de draairichting met B-DNA: deze helix is linkshandig.',
      'Follow one strand: the sugar–phosphate backbone zigzags, with a dinucleotide as the repeating unit. Compare the handedness with B-DNA: this helix is left-handed.'),
    facts: [
      F('Naamgeving', 'Nomenclature', 'zigzaggende fosfaatruggengraat (dinucleotide-herhaling)', 'zigzag phosphate backbone (dinucleotide repeat)'),
      F('Sequentievoorkeur', 'Sequence preference', 'alternerend purine–pyrimidine, bv. (CG)n of (CA)n', 'alternating purine–pyrimidine, e.g. (CG)n or (CA)n'),
      F('Vorming in vivo', 'Formation in vivo', 'tijdelijk, door negatieve supercoiling achter een transcriberend RNA-polymerase', 'transient, through negative supercoiling behind a transcribing RNA polymerase'),
      F('Herkenning', 'Recognition', 'Zα-domeinen (ADAR1, ZBP1); aangeboren immuniteit', 'Zα domains (ADAR1, ZBP1); innate immunity'),
    ],
    roles: DUO('Twee antiparallelle strengen van de linkshandige Z-helix; guanines syn, cytosines anti.', 'Two antiparallel strands of the left-handed Z helix; guanines syn, cytosines anti.'),
  },

  zalpha: {
    look: S('Twee Zα-domeinen binden een korte Z-DNA-helix. Ze contacteren de zigzaggende suiker-fosfaatruggengraat en een syn-guanine; de herkenning is conformatiespecifiek, niet sequentiespecifiek.',
      'Two Zα domains bind a short Z-DNA helix. They contact the zigzag sugar–phosphate backbone and a syn guanine; recognition is conformation-specific, not sequence-specific.'),
    facts: [
      F('Complex', 'Complex', 'twee Zα-domeinen + Z-DNA d(TCGCGCG)', 'two Zα domains + Z-DNA d(TCGCGCG)'),
      F('Herkomst eiwit', 'Protein source', 'Homo sapiens: Zα-domein van het RNA-editingenzym ADAR1', 'Homo sapiens: Zα domain of the RNA-editing enzyme ADAR1'),
      F('Herkenning', 'Recognition', 'conformatie (ruggengraat, syn-G), niet de basensequentie', 'conformation (backbone, syn G), not base sequence'),
      F('Biologische rol', 'Biological role', 'aangeboren immuniteit tegen virussen en ontsteking', 'innate antiviral immunity and inflammation'),
    ],
    roles: [
      S('Twee antiparallelle strengen van de korte linkshandige Z-DNA-helix.', 'Two antiparallel strands of the short left-handed Z-DNA helix.'),
      S('Twee Zα-domeinen (winged helix-turn-helix) van humaan ADAR1; contacten met ruggengraatfosfaten en een syn-guanine.', 'Two Zα domains (winged helix-turn-helix) of human ADAR1; contacts with backbone phosphates and a syn guanine.'),
    ],
  },

  /* ================= Vierstrengige en andere vormen ================= */
  g4: {
    look: S('Centraal liggen vlakke G-kwartetten (vier guanines via Watson–Crick- en Hoogsteen-randen gepaard) op elkaar gestapeld; de bolletjes in het centrale kanaal zijn K⁺-ionen, gecoördineerd door O6-carbonylzuurstoffen. De lussen zijn propellerlussen.',
      'Planar G-quartets (four guanines paired via their Watson–Crick and Hoogsteen edges) are stacked in the centre; the spheres in the central channel are K⁺ ions, coordinated by O6 carbonyl oxygens. The loops are propeller loops.'),
    facts: [
      F('Samenstelling', 'Composition', 'één G-rijke DNA-streng, d[AG₃(T₂AG₃)₃]', 'a single G-rich DNA strand, d[AG₃(T₂AG₃)₃]'),
      F('Voorkomen', 'Occurrence', 'telomeren (3′-overhang), promotoren (bv. MYC), RNA', 'telomeres (3′ overhang), promoters (e.g. MYC), RNA'),
      F('In vivo aangetoond', 'Detected in vivo', 'ja, met het antilichaam BG4 in humane celkernen', 'yes, with the antibody BG4 in human nuclei'),
      F('Topologie', 'Topology', 'parallel; alle guanines anti', 'parallel; all guanines anti'),
      F('Relevantie', 'Relevance', 'G4-stabiliserende liganden remmen telomerase; onderzocht als antikankerstrategie', 'G4-stabilising ligands inhibit telomerase; investigated as an anticancer strategy'),
    ],
  },

  g4basket: {
    look: S('Volg de streng: buursegmenten lopen antiparallel, verbonden door twee laterale lussen en één diagonale lus over een van de buitenste vlakken. Centraal liggen opnieuw gestapelde G-kwartetten.',
      'Follow the strand: adjacent segments run antiparallel, connected by two lateral loops and one diagonal loop across one of the outer faces. Stacked G-quartets again occupy the centre.'),
    facts: [
      F('Sequentie', 'Sequence', 'identiek aan de K⁺-structuur (1KF1): d[AG₃(T₂AG₃)₃]', 'identical to the K⁺ structure (1KF1): d[AG₃(T₂AG₃)₃]'),
      F('Topologie', 'Topology', 'antiparallel (basket); syn/anti-afwisseling', 'antiparallel (basket); syn/anti alternation'),
      F('Determinant', 'Determinant', 'kation: Na⁺ (dit NMR-model) i.p.v. K⁺', 'cation: Na⁺ (this NMR model) instead of K⁺'),
      F('Intracellulair', 'Intracellular', 'K⁺ dominant (~140 mM), Na⁺ laag', 'K⁺ dominant (~140 mM), Na⁺ low'),
    ],
  },

  imotif: {
    look: S('Kijk naar de kern: elke laag is een hemigeprotoneerd C·C⁺-paar, en de basenparen van de twee parallelle duplexen intercaleren afwisselend. De groeven zijn uitzonderlijk smal.',
      'Look at the core: each layer is a hemiprotonated C·C⁺ pair, and the base pairs of the two parallel duplexes intercalate alternately. The grooves are exceptionally narrow.'),
    facts: [
      F('Samenstelling', 'Composition', 'één C-rijke DNA-streng, d(CCCTAA)₃CCCT', 'a single C-rich DNA strand, d(CCCTAA)₃CCCT'),
      F('Basenpaar', 'Base pair', 'C·C⁺ (drie waterstofbruggen) i.p.v. G–C', 'C·C⁺ (three hydrogen bonds) instead of G–C'),
      F('Voorwaarde', 'Condition', 'licht zure pH (protonering van N3)', 'mildly acidic pH (N3 protonation)'),
      F('Voorkomen', 'Occurrence', 'C-rijke streng van telomeren en promotoren, tegenover G-quadruplexen', 'C-rich strand of telomeres and promoters, opposite G-quadruplexes'),
      F('In vivo aangetoond', 'Detected in vivo', '2018, met het antilichaam iMab in humane celkernen', '2018, with the antibody iMab in human nuclei'),
    ],
  },

  triplex: {
    look: S('Een derde streng ligt in de grote groef van een B-achtige duplex en bindt via Hoogsteen-waterstofbruggen aan de purinestreng. Aan beide uiteinden gaat de triplex over in duplex-DNA.',
      'A third strand lies in the major groove of a B-like duplex and binds the purine strand through Hoogsteen hydrogen bonds. At both ends the triplex continues as duplex DNA.'),
    facts: [
      F('Definitie', 'Definition', 'duplex + Hoogsteen-gebonden derde streng', 'duplex + Hoogsteen-bonded third strand'),
      F('Positie derde streng', 'Third-strand position', 'grote groef, parallel aan de purinestreng', 'major groove, parallel to the purine strand'),
      F('Basentripletten', 'Base triplets', 'T·A–T en C⁺·G–C', 'T·A–T and C⁺·G–C'),
      F('Voorwaarde', 'Condition', 'licht zure pH (protonering van N3 van C)', 'mildly acidic pH (N3 protonation of C)'),
      F('Toepassing', 'Application', 'triplexvormende oligonucleotiden (TFO’s): sequentiespecifieke binding', 'triplex-forming oligonucleotides (TFOs): sequence-specific binding'),
    ],
    roles: [
      S('Watson–Crick-duplex (B-achtig); de helixparameters worden op deze twee ketens berekend.', 'Watson–Crick duplex (B-like); helix parameters are calculated on these two chains.'),
      S('Derde streng CTCTCT (6 nt): in de grote groef, Hoogsteen-gepaard met de purinestreng.', 'Third strand CTCTCT (6 nt): in the major groove, Hoogsteen-paired with the purine strand.'),
    ],
  },

  holliday: {
    look: S('Vier strengen vormen vier duplexarmen. De armen stapelen paarsgewijs tot twee quasi-continue helices in een antiparallelle gestapelde-X-vorm; in het centrum wisselen twee strengen van helix.',
      'Four strands form four duplex arms. The arms stack pairwise into two quasi-continuous helices in an antiparallel stacked-X form; at the centre two strands cross over between helices.'),
    facts: [
      F('Samenstelling', 'Composition', '4 strengen d(CCGGTACCGG), 4 duplexarmen', '4 strands d(CCGGTACCGG), 4 duplex arms'),
      F('Conformatie', 'Conformation', 'gestapelde X (kationgestabiliseerd)', 'stacked X (cation-stabilised)'),
      F('Context', 'Context', 'centraal intermediair van homologe recombinatie', 'central intermediate of homologous recombination'),
      F('Biologische processen', 'Biological processes', 'meiose, herstel van dubbelstrengbreuken, herstart van replicatievorken', 'meiosis, double-strand break repair, replication-fork restart'),
      F('Verwerking', 'Processing', 'resolvasen (GEN1, MUS81–EME1, SLX1–SLX4); dissolutie door BLM–TOPOIIIα–RMI1/2', 'resolvases (GEN1, MUS81–EME1, SLX1–SLX4); dissolution by BLM–TOPOIIIα–RMI1/2'),
    ],
    roles: DUO('Vier strengen; telkens twee complementaire segmenten vormen één duplexarm van de vierwegsjunctie.', 'Four strands; each pair of complementary segments forms one duplex arm of the four-way junction.'),
  },

  /* ================= Liganden ================= */
  netropsin: {
    look: S('Het ligand (groene koolstofatomen) ligt in de kleine groef ter hoogte van het AATT-centrum. De duplex behoudt de B-conformatie met hooguit een geringe kromming; er is geen intercalatie.',
      'The ligand (green carbon atoms) lies in the minor groove at the AATT centre. The duplex retains the B conformation with at most a slight bend; there is no intercalation.'),
    facts: [
      F('Stofklasse', 'Compound class', 'natuurlijk antibioticum, halvemaanvormig', 'natural antibiotic, crescent-shaped'),
      F('Bindingsplaats', 'Binding site', 'AT-rijke kleine groef (H-bruggen met A-N3 en T-O2)', 'AT-rich minor groove (H-bonds to A N3 and T O2)'),
      F('Effect op het DNA', 'Effect on DNA', 'B-vorm behouden; verdringt de hydratatieruggengraat', 'B form retained; displaces the spine of hydration'),
      F('Ongunstig', 'Disfavoured', 'G·C-paren: de guanine-NH₂ steekt in de kleine groef', 'G·C pairs: the guanine NH₂ protrudes into the minor groove'),
      F('Verwante kleine-groefbinders', 'Related minor-groove binders', 'Hoechst 33258, DAPI', 'Hoechst 33258, DAPI'),
    ],
    roles: DUO('Twee antiparallelle strengen van het Dickerson-dodecameer (met één 5-broomcytosine).', 'Two antiparallel strands of the Dickerson dodecamer (with one 5-bromocytosine).'),
  },

  intercalator: {
    look: S('Aan beide uiteinden is een daunomycinemolecule (groene koolstofatomen) tussen twee basenparen geïntercaleerd. Op die plaatsen is de afstand tussen de basenparen verdubbeld en is de helix lokaal ontwonden.',
      'At both ends a daunomycin molecule (green carbon atoms) is intercalated between two base pairs. At those sites the base-pair separation is doubled and the helix is locally unwound.'),
    facts: [
      F('Klinisch gebruik', 'Clinical use', 'antracycline-chemotherapie, o.a. borstkanker', 'anthracycline chemotherapy, e.g. breast cancer'),
      F('Effect op het DNA', 'Effect on DNA', 'intercalatie: lokale verdubbeling van de stijging en ontwinding', 'intercalation: local doubling of the rise and unwinding'),
      F('Stijging', 'Rise', '~3,4 → ~6,8 Å op de intercalatieplaats', '~3.4 → ~6.8 Å at the intercalation site'),
      F('Aminosuiker', 'Amino sugar', 'in de kleine groef', 'in the minor groove'),
      F('Labanaloog', 'Laboratory analogue', 'ethidiumbromide', 'ethidium bromide'),
    ],
    roles: DUO('Twee antiparallelle strengen van d(CGTACG), opgebouwd uit de biologische assemblage.', 'Two antiparallel strands of d(CGTACG), built from the biological assembly.'),
  },

  cisplatin: {
    look: S('Het grijze bolletje is het Pt-atoom, covalent gebonden aan N7 van twee naburige guanines; ter hoogte van het adduct knikt de helix naar de grote groef. De kleine groef is daar verbreed en ondiep.',
      'The grey sphere is the Pt atom, covalently bound to N7 of two adjacent guanines; at the adduct the helix bends towards the major groove. The minor groove is widened and shallow there.'),
    facts: [
      F('Indicaties', 'Indications', 'o.a. testis-, ovarium- en longkanker', 'e.g. testicular, ovarian and lung cancer'),
      F('Adduct', 'Adduct', '1,2-intrastreng-d(GpG)-crosslink via N7', '1,2-intrastrand d(GpG) crosslink via N7'),
      F('Knik', 'Bend', '~35–40° (kristal), ~78° (NMR, oplossing)', '~35–40° (crystal), ~78° (NMR, solution)'),
      F('Gevolg', 'Consequence', 'blokkade van replicatie en transcriptie', 'blocks replication and transcription'),
      F('Herstel', 'Repair', 'nucleotide-excisieherstel (NER)', 'nucleotide excision repair (NER)'),
    ],
    roles: DUO('Twee antiparallelle strengen van het dodecameer; één streng draagt de Pt-d(GpG)-crosslink.', 'Two antiparallel strands of the dodecamer; one strand carries the Pt–d(GpG) crosslink.'),
  },

  /* ================= RNA-helices en -vouwingen ================= */
  dsrna: {
    look: S('Twee RNA-strengen vormen een A-vormige dubbelhelix. De basenparen zijn gekanteld en van de as weggeschoven, anders dan de vrijwel loodrechte basenparen van B-DNA.',
      'Two RNA strands form an A-form double helix. The base pairs are inclined and displaced from the axis, unlike the nearly perpendicular base pairs of B-DNA.'),
    facts: [
      F('Definitie', 'Definition', 'duplex van twee complementaire RNA-strengen', 'duplex of two complementary RNA strands'),
      F('Versus B-DNA', 'Versus B-DNA', 'A-vorm: C3′-endo, ~11 bp/winding, gekantelde basenparen, smalle diepe grote groef', 'A form: C3′-endo, ~11 bp/turn, inclined base pairs, narrow deep major groove'),
      F('Cellulair', 'Cellular', 'stammen in tRNA, rRNA en pre-miRNA; siRNA’s', 'stems in tRNA, rRNA and pre-miRNA; siRNAs'),
      F('Viraal', 'Viral', 'dsRNA-genoom (Baltimore-klasse III, bv. rotavirus)', 'dsRNA genome (Baltimore class III, e.g. rotavirus)'),
    ],
    roles: DUO('Twee antiparallelle RNA-strengen met complementaire Watson–Crick-basenparing.', 'Two antiparallel RNA strands with complementary Watson–Crick base pairing.'),
  },

  hybrid: {
    look: S('Een DNA-streng en een complementaire RNA-streng vormen samen een A-achtige heteroduplex.',
      'A DNA strand and a complementary RNA strand together form an A-like heteroduplex.'),
    facts: [
      F('Definitie', 'Definition', 'heteroduplex: RNA-streng + complementaire DNA-streng', 'heteroduplex: RNA strand + complementary DNA strand'),
      F('Replicatie', 'Replication', 'RNA-primers van Okazaki-fragmenten', 'RNA primers of Okazaki fragments'),
      F('Viraal', 'Viral', 'intermediair van reverse transcriptie (bv. HIV)', 'reverse-transcription intermediate (e.g. HIV)'),
      F('Conformatie', 'Conformation', 'A-vorm (C3′-endo), niet B-vorm', 'A form (C3′-endo), not B form'),
      F('Afbraak', 'Degradation', 'RNase H hydrolyseert de RNA-streng', 'RNase H hydrolyses the RNA strand'),
    ],
    roles: [
      S('DNA-streng d(CTCTTCTTC); in dit kristal eveneens C3′-endo.', 'DNA strand d(CTCTTCTTC); also C3′-endo in this crystal.'),
      S('Purinerijke RNA-streng r(GAAGAAGAG), complementair gepaard met de DNA-streng.', 'Purine-rich RNA strand r(GAAGAAGAG), complementary to the DNA strand.'),
    ],
  },

  tar: {
    look: S('Eén RNA-streng vouwt tot een haarspeld met een apicale lus. Drie ongepaarde nucleotiden in één streng (de bulge, U23–C24–U25) onderbreken de A-vormige stam en doen de helix knikken.',
      'A single RNA strand folds into a hairpin with an apical loop. Three unpaired nucleotides in one strand (the bulge, U23–C24–U25) interrupt the A-form stem and kink the helix.'),
    facts: [
      F('Definitie', 'Definition', 'stam-lus met trinucleotide-bulge', 'stem-loop with a trinucleotide bulge'),
      F('Locatie', 'Location', '5′-uiteinde van alle HIV-1-transcripten', '5′ end of all HIV-1 transcripts'),
      F('Bindingspartner', 'Binding partner', 'viraal transactivator-eiwit Tat', 'viral transactivator protein Tat'),
      F('Gevolg', 'Consequence', 'Tat en cycline T brengen CDK9 naar Pol II: transcriptie van het provirus loopt door', 'Tat and cyclin T recruit CDK9 to Pol II: transcription of the provirus proceeds'),
      F('Toepassing', 'Application', 'doelwit voor antivirale RNA-liganden', 'target for antiviral RNA ligands'),
    ],
  },

  trna: {
    look: S('Eén streng met vijf structuurelementen: de acceptorstam (3′-CCA, aminoacylatieplaats), de anticodonarm aan het andere uiteinde, de D-arm en de TΨC-arm die samen de elleboog van de L vormen, en de variabele lus. De bolletjes zijn metaalionen (Mg²⁺) die de tertiaire vouwing stabiliseren.',
      'A single strand with five structural elements: the acceptor stem (3′-CCA, aminoacylation site), the anticodon arm at the opposite end, the D arm and TΨC arm that together form the elbow of the L, and the variable loop. The spheres are metal ions (Mg²⁺) that stabilise the tertiary fold.'),
    facts: [
      F('Functie', 'Function', 'adaptor: levert aminozuren aan het ribosoom via anticodon–codonparing', 'adaptor: delivers amino acids to the ribosome via anticodon–codon pairing'),
      F('Vouwing', 'Fold', 'secundair klaverblad, tertiair L-vorm', 'cloverleaf secondary structure, L-shaped tertiary structure'),
      F('Afstand CCA–anticodon', 'CCA–anticodon distance', '~75 Å (peptidyltransferasecentrum ↔ decodeercentrum)', '~75 Å (peptidyl transferase centre ↔ decoding centre)'),
      F('Modificaties', 'Modifications', 'talrijk, o.a. ψ, m²G, wybutosine', 'numerous, e.g. ψ, m²G, wybutosine'),
      F('Historie', 'History', 'eerste RNA-structuur op atoomniveau (1974)', 'first atomic-resolution RNA structure (1974)'),
    ],
  },

  pseudoknot: {
    look: S('Eén streng vormt twee stammen die coaxiaal tot een quasi-continue helix stapelen, overbrugd door twee lussen. De bolletjes zijn metaalionen uit het kristal (Mg²⁺, Na⁺).',
      'A single strand forms two stems that stack coaxially into a quasi-continuous helix, bridged by two loops. The spheres are metal ions from the crystal (Mg²⁺, Na⁺).'),
    facts: [
      F('Definitie', 'Definition', 'haarspeld waarvan lusnucleotiden paren met een sequentie buiten de stam', 'hairpin whose loop nucleotides pair with a sequence outside the stem'),
      F('Architectuur', 'Architecture', 'twee gestapelde stammen + twee lussen; kleine-groeftripletten', 'two stacked stems + two loops; minor-groove triplets'),
      F('Mechanisme', 'Mechanism', 'programmed −1 ribosomal frameshifting', 'programmed −1 ribosomal frameshifting'),
      F('Gevolg', 'Consequence', 'twee eiwitproducten uit één mRNA', 'two protein products from one mRNA'),
      F('Andere virussen', 'Other viruses', 'SARS-CoV-2 (drie-stammige pseudoknoop); HIV-1 gebruikt een haarspeld', 'SARS-CoV-2 (three-stemmed pseudoknot); HIV-1 uses a hairpin'),
    ],
  },

  terc: {
    look: S('Eén streng vouwt tot stammen en lussen. De U-rijke lus ligt in de grote groef van stam P2b en vormt daar U·A–U-basentripletten: een grote-groeftriplex.',
      'A single strand folds into stems and loops. The U-rich loop lies in the major groove of stem P2b and forms U·A–U base triplets there: a major-groove triplex.'),
    facts: [
      F('Definitie', 'Definition', 'P2b–P3-pseudoknoop van humaan telomerase-RNA (hTR)', 'P2b–P3 pseudoknot of human telomerase RNA (hTR)'),
      F('Kenmerk', 'Feature', 'grote-groeftriplex met U·A–U-tripletten', 'major-groove triplex with U·A–U triplets'),
      F('Telomerase-activiteit', 'Telomerase activity', 'stamcellen, kiemcellen, meeste kankercellen', 'stem cells, germ cells, most cancer cells'),
      F('Pathologie', 'Pathology', 'mutaties in de pseudoknoop → dyskeratosis congenita', 'mutations in the pseudoknot → dyskeratosis congenita'),
      F('Structuur', 'Structure', 'NMR, humaan RNA-fragment van 47 nt', 'NMR, 47-nt human RNA fragment'),
    ],
  },

  hammerhead: {
    look: S('Twee ketens: de lange enzymstreng (het ribozym) en de korte substraatstreng. Drie helices komen samen rond de geconserveerde kern; het bolletje daar is een metaalion in het actieve centrum, bij de knipplaats.',
      'Two chains: the long enzyme strand (the ribozyme) and the short substrate strand. Three helices meet around the conserved core; the sphere there is a metal ion in the active site, at the cleavage site.'),
    facts: [
      F('Definitie', 'Definition', 'klein zelfknippend ribozym (transesterificatie)', 'small self-cleaving ribozyme (transesterification)'),
      F('Architectuur', 'Architecture', 'drie helices rond een kern; tertiair contact stam I–stam II', 'three helices around a core; stem I–stem II tertiary contact'),
      F('Ontdekking', 'Discovery', 'viroïden en satelliet-RNA’s van planten', 'plant viroids and satellite RNAs'),
      F('Verspreiding', 'Distribution', 'ook in dierlijke genomen, inclusief zoogdieren', 'also in animal genomes, including mammals'),
      F('Dit kristal', 'This crystal', 'knipplaats 2′-O-gemethyleerd: geen splitsing', 'cleavage site 2′-O-methylated: no cleavage'),
    ],
    roles: [
      S('Enzymstreng (43 nt): het katalytische ribozym.', 'Enzyme strand (43 nt): the catalytic ribozyme.'),
      S('Substraatstreng (20 nt) met de knipplaats; die is hier 2′-O-gemethyleerd, waardoor splitsing uitblijft.', 'Substrate strand (20 nt) containing the cleavage site, here 2′-O-methylated so that no cleavage occurs.'),
    ],
  },

  groupi: {
    look: S('Het RNA vouwt tot een compacte tertiaire structuur van vele gestapelde helices. Het eiwit is enkel een kristallisatiehulp; de bolletjes zijn metaalionen in het actieve centrum.',
      'The RNA folds into a compact tertiary structure of many stacked helices. The protein is only a crystallisation aid; the spheres are metal ions in the active site.'),
    facts: [
      F('Definitie', 'Definition', 'zelfsplicend intron (ribozym)', 'self-splicing intron (ribozyme)'),
      F('Eiwit vereist?', 'Protein required?', 'nee: katalyse door het RNA zelf', 'no: catalysis by the RNA itself'),
      F('Vastgelegde toestand', 'State captured', 'vlak vóór de tweede transesterificatie; beide exonen aanwezig', 'just before the second transesterification; both exons present'),
      F('Voorkomen', 'Occurrence', 'bacteriën, schimmels, planten, protisten', 'bacteria, fungi, plants, protists'),
      F('Erkenning', 'Recognition', 'ontdekking (Cech): Nobelprijs 1989', 'discovery (Cech): Nobel Prize 1989'),
    ],
    roles: [
      S('Groep I-intron (197 nt): het katalytische ribozym.', 'Group I intron (197 nt): the catalytic ribozyme.'),
      S('Twee korte RNA-ketens (22 en 3 nt); volgens de auteurs bevat het kristal beide exonen.', 'Two short RNA chains (22 and 3 nt); according to the authors both exons are present in the crystal.'),
      S('U1A-eiwit, gebonden aan een ingebouwde lus: enkel kristallisatiehulp.', 'U1A protein bound to an engineered loop: crystallisation aid only.'),
    ],
  },

  rnasep: {
    look: S('Het grote RNA is de katalytische component, het kleine eiwit een cofactor. Het L-vormige RNA ertegen is het tRNA-product, na verwijdering van de 5′-leader.',
      'The large RNA is the catalytic component, the small protein a cofactor. The L-shaped RNA bound to it is the tRNA product, after removal of the 5′ leader.'),
    facts: [
      F('Functie', 'Function', 'verwijdert de 5′-leader van pre-tRNA', 'removes the 5′ leader of pre-tRNA'),
      F('Katalyse', 'Catalysis', 'door het RNA (met Mg²⁺); het eiwit ondersteunt', 'by the RNA (with Mg²⁺); the protein assists'),
      F('Substraatherkenning', 'Substrate recognition', 'vooral via de tertiaire vorm van het tRNA', 'mainly via the tertiary shape of the tRNA'),
      F('Humaan', 'Human', 'kern: één RNA (H1) + ~10 eiwitten', 'nucleus: one RNA (H1) + ~10 proteins'),
      F('Mitochondriaal', 'Mitochondrial', 'eiwitenzym uit drie subeenheden, zonder RNA', 'protein-only enzyme of three subunits, no RNA'),
    ],
    roles: [
      S('RNase P-RNA (347 nt): de katalytische ribozymcomponent.', 'RNase P RNA (347 nt): the catalytic ribozyme component.'),
      S('Eiwitsubeenheid van RNase P: cofactor van het RNA.', 'Protein subunit of RNase P: cofactor of the RNA.'),
      S('Rijp tRNA^Phe: het product na verwijdering van de 5′-leader.', 'Mature tRNA^Phe: the product after removal of the 5′ leader.'),
    ],
  },

  riboswitch: {
    look: S('Het aptameerdomein vormt een drieweg-junctie; de twee haarspeldlussen gaan een kissing-loopinteractie aan. Het adenine-ligand (groene koolstofatomen) is volledig ingesloten in de junctie.',
      'The aptamer domain forms a three-way junction; the two hairpin loops engage in a kissing-loop interaction. The adenine ligand (green carbon atoms) is fully enclosed in the junction.'),
    facts: [
      F('Definitie', 'Definition', 'cis-regulerend mRNA-element dat een metaboliet bindt', 'cis-regulatory mRNA element that binds a metabolite'),
      F('Ligand', 'Ligand', 'adenine (Watson–Crick-paring met U74)', 'adenine (Watson–Crick pairing with U74)'),
      F('Regulatie', 'Regulation', 'ligandbinding activeert translatie (ON-schakelaar)', 'ligand binding activates translation (ON switch)'),
      F('Voorkomen', 'Occurrence', 'vooral bacteriën; ook planten en schimmels (bv. TPP)', 'mainly bacteria; also plants and fungi (e.g. TPP)'),
      F('Toepassing', 'Application', 'doelwit voor nieuwe antibiotica', 'target for new antibiotics'),
    ],
  },

  ribosome: {
    look: S('Het 16S-rRNA bepaalt de architectuur; ~20 ribosomale eiwitten liggen vooral aan het oppervlak. Wegens de omvang wordt enkel de ruggengraat getoond, zonder basen.',
      'The 16S rRNA defines the architecture; ~20 ribosomal proteins lie mainly at the surface. Because of its size only the backbone is shown, without bases.'),
    facts: [
      F('Functie', 'Function', 'decodering van het mRNA tijdens de translatie', 'decoding of mRNA during translation'),
      F('Samenstelling', 'Composition', '16S-rRNA (~1500 nt) + ~20 eiwitten', '16S rRNA (~1500 nt) + ~20 proteins'),
      F('Omvang', 'Size', '~52 000 atomen', '~52,000 atoms'),
      F('Decodeercentrum', 'Decoding centre', 'vrijwel volledig RNA (o.a. G530, A1492, A1493)', 'almost entirely RNA (incl. G530, A1492, A1493)'),
      F('Antibiotica', 'Antibiotics', 'o.a. tetracyclines en aminoglycosiden', 'e.g. tetracyclines and aminoglycosides'),
    ],
    roles: [
      S('16S-rRNA (~1500 nt): structureel en functioneel skelet van de 30S-subeenheid (lichaam, platform, hoofd).', '16S rRNA (~1500 nt): structural and functional scaffold of the 30S subunit (body, platform, head).'),
      S('Twintig ribosomale eiwitten (S2–S20 en Thx), vooral aan het oppervlak.', 'Twenty ribosomal proteins (S2–S20 and Thx), mainly at the surface.'),
    ],
  },

  mirna: {
    look: S('AGO2 omsluit een kort enkelstrengig gids-RNA. Beide uiteinden zijn verankerd (5′-fosfaat in de MID-pocket, 3′-uiteinde in het PAZ-domein); niet het volledige gids-RNA is geordend in het kristal.',
      'AGO2 encloses a short single-stranded guide RNA. Both ends are anchored (5′ phosphate in the MID pocket, 3′ end in the PAZ domain); not all of the guide RNA is ordered in the crystal.'),
    facts: [
      F('Complex', 'Complex', '~21-nt gids-RNA in Argonaute-2 (kern van RISC)', '~21-nt guide RNA in Argonaute-2 (core of RISC)'),
      F('Seed', 'Seed', 'nt 2–8: bepaalt de doelherkenning', 'nt 2–8: determines target recognition'),
      F('Gevolg', 'Consequence', 'translatierepressie en mRNA-afbraak', 'translational repression and mRNA decay'),
      F('Perfecte complementariteit', 'Perfect complementarity', 'slicing door het PIWI-domein (RNase H-achtig)', 'slicing by the PIWI domain (RNase H-like)'),
      F('Toepassing', 'Application', 'siRNA-geneesmiddelen', 'siRNA therapeutics'),
    ],
    roles: [
      S('Argonaute-2 (domeinen N, PAZ, MID, PIWI): bindt het gids-RNA en zoekt complementaire doel-mRNA’s.', 'Argonaute-2 (N, PAZ, MID, PIWI domains): binds the guide RNA and searches for complementary target mRNAs.'),
      S('Gids-RNA: de seed-regio bepaalt welk mRNA onderdrukt wordt.', 'Guide RNA: the seed region determines which mRNA is silenced.'),
    ],
  },

  snrna: {
    look: S('Het U1-snRNA en een kort RNA-oligo dat een 5′-splicingsite nabootst, vormen een korte duplex. Daarrond liggen de eiwitten; zeven Sm-eiwitten vormen een heptamere ring rond het RNA.',
      'The U1 snRNA and a short RNA oligo mimicking a 5′ splice site form a short duplex. The proteins surround it; seven Sm proteins form a heptameric ring around the RNA.'),
    facts: [
      F('Definitie', 'Definition', 'snRNP: U1-snRNA + Sm-ring + U1-70K + U1-C', 'snRNP: U1 snRNA + Sm ring + U1-70K + U1-C'),
      F('Functie', 'Function', 'herkenning van de 5′-splicingsite (U2-type intronen)', 'recognition of the 5′ splice site (U2-type introns)'),
      F('Context', 'Context', 'onderdeel van het spliceosoom', 'component of the spliceosome'),
      F('Minor intronen', 'Minor introns', 'U12-type (< 0,5%) gebruiken U11 i.p.v. U1', 'U12-type (< 0.5%) use U11 instead of U1'),
      F('Lokalisatie', 'Localisation', 'celkern', 'nucleus'),
    ],
    roles: [
      S('U1-snRNA (ingekort construct): het 5′-uiteinde basenpaart met de 5′-splicingsite.', 'U1 snRNA (truncated construct): its 5′ end base-pairs with the 5′ splice site.'),
      S('RNA-oligo (10 nt) dat een 5′-splicingsite nabootst; paart met het U1-snRNA.', 'RNA oligo (10 nt) mimicking a 5′ splice site; pairs with the U1 snRNA.'),
      S('Heptamere Sm-ring (D3, B, D1, D2, E, F, G) rond de Sm-plaats van het snRNA.', 'Heptameric Sm ring (D3, B, D1, D2, E, F, G) around the Sm site of the snRNA.'),
      S('Fragment van U1-70K, gebonden aan het U1-snRNA.', 'Fragment of U1-70K, bound to the U1 snRNA.'),
      S('U1-C: stabiliseert de duplex tussen snRNA en 5′-splicingsite.', 'U1-C: stabilises the duplex between snRNA and 5′ splice site.'),
    ],
  },

  /* ================= DNA–eiwit ================= */
  nucleosome: {
    look: S('Het DNA is sterk en ongelijkmatig gebogen rond een histonoctameer; de flexibele histonstaarten steken uit het deeltje.',
      'The DNA is strongly and unevenly bent around a histone octamer; the flexible histone tails protrude from the particle.'),
    facts: [
      F('Definitie', 'Definition', 'nucleosoomkerndeeltje: basiseenheid van chromatine', 'nucleosome core particle: basic unit of chromatin'),
      F('DNA', 'DNA', '147 bp in ~1,65 linkshandige superhelixwindingen', '147 bp in ~1.65 left-handed superhelical turns'),
      F('Histonoctameer', 'Histone octamer', '2× H2A, H2B, H3 en H4', '2× H2A, H2B, H3 and H4'),
      F('Linker-DNA', 'Linker DNA', 'verbindt nucleosomen; linkerhiston H1 bindt bij in- en uitgang van het DNA', 'connects nucleosomes; linker histone H1 binds at DNA entry/exit'),
      F('Lokalisatie', 'Localisation', 'celkern, in alle chromosomen', 'nucleus, in all chromosomes'),
    ],
    roles: [
      S('147-bp duplex (humane α-satellietsequentie), gewonden rond het octameer.', '147-bp duplex (human α-satellite sequence) wrapped around the octamer.'),
      S('Histon H3, twee kopieën in het octameer.', 'Histone H3, two copies in the octamer.'),
      S('Histon H4, twee kopieën in het octameer.', 'Histone H4, two copies in the octamer.'),
      S('Histon H2A, twee kopieën in het octameer.', 'Histone H2A, two copies in the octamer.'),
      S('Histon H2B, twee kopieën in het octameer.', 'Histone H2B, two copies in the octamer.'),
    ],
  },

  ssdna: {
    look: S('Een enkelstrengig oligonucleotide (dC₈) ligt gestrekt in een groef van het eiwit. De basen stapelen niet onderling maar met aromatische zijketens (Phe, Trp) van het eiwit.',
      'A single-stranded oligonucleotide (dC₈) lies extended in a groove of the protein. The bases stack not with each other but with aromatic side chains (Phe, Trp) of the protein.'),
    facts: [
      F('Complex', 'Complex', 'ssDNA gebonden door replicatie-eiwit A (RPA)', 'ssDNA bound by replication protein A (RPA)'),
      F('Basenparing', 'Base pairing', 'geen: enkelstrengig', 'none: single-stranded'),
      F('Context', 'Context', 'replicatie, DNA-herstel (resectie), recombinatie', 'replication, DNA repair (resection), recombination'),
      F('RPA', 'RPA', 'heterotrimeer RPA70–RPA32–RPA14', 'heterotrimer RPA70–RPA32–RPA14'),
      F('Dit model', 'This model', 'DBD-A en DBD-B (OB-folds) van RPA70', 'DBD-A and DBD-B (OB folds) of RPA70'),
    ],
    roles: [
      S('Enkelstrengig oligonucleotide dC₈.', 'Single-stranded oligonucleotide dC₈.'),
      S('DBD-A/B van humaan RPA70 (OB-folds): bindt en beschermt ssDNA.', 'DBD-A/B of human RPA70 (OB folds): binds and protects ssDNA.'),
    ],
  },

  /* ================= Overzichtsitems (3D-fragment + schema) ================= */
  mrna: {
    look: S('In 3D: een poly(A)-fragment (11 nt) gebonden door PABP1. PABP bindt herhaald langs de poly(A)-staart (~27 nt per eiwit), beschermt het mRNA en bevordert de translatie. Een volledig mRNA heeft geen vaste tertiaire structuur.',
      'In 3D: a poly(A) fragment (11 nt) bound by PABP1. PABP binds repeatedly along the poly(A) tail (~27 nt per protein), protects the mRNA and promotes translation. A full-length mRNA has no fixed tertiary structure.'),
    lookSchema: S('Het schema loopt van 5′ naar 3′: m⁷G-cap, 5′-UTR, coderende sequentie (CDS, van AUG tot stopcodon), 3′-UTR en poly(A)-staart.',
      'The diagram runs 5′ to 3′: m⁷G cap, 5′ UTR, coding sequence (CDS, from AUG to stop codon), 3′ UTR and poly(A) tail.'),
    facts: [
      F('Definitie', 'Definition', 'rijp eukaryoot transcript van één eiwitcoderend gen', 'mature eukaryotic transcript of one protein-coding gene'),
      F('Biogenese', 'Biogenesis', 'in de kern (Pol II, capping, splicing, polyadenylering); export via de kernporie', 'in the nucleus (Pol II, capping, splicing, polyadenylation); export through the nuclear pore'),
      F('Translatie', 'Translation', 'door het ribosoom, per codon (3 nt)', 'by the ribosome, codon by codon (3 nt)'),
      F('CDS', 'CDS', 'van startcodon AUG tot een stopcodon', 'from start codon AUG to a stop codon'),
      F('Poly(A)-staart', 'Poly(A) tail', '~250 A bij synthese, daarna geleidelijk ingekort', '~250 A at synthesis, then gradually shortened'),
    ],
    roles: [
      S('Poly(A)-RNA-fragment (11 nt).', 'Poly(A) RNA fragment (11 nt).'),
      S('PABP1 (poly(A)-bindend eiwit 1): bindt de poly(A)-staart.', 'PABP1 (poly(A)-binding protein 1): binds the poly(A) tail.'),
    ],
  },

  premrna: {
    look: S('In 3D: splicingfactor SF1 gebonden aan de vertakkingsplaats van een intron, met het vertakkingspunt-adenosine dat later de lariat vormt. Zo wordt het 3′-gebied van het intron herkend.',
      'In 3D: splicing factor SF1 bound to the branch site of an intron, including the branch-point adenosine that later forms the lariat. This is how the 3′ region of the intron is recognised.'),
    lookSchema: S('Bovenaan het primaire transcript: oranje exonen afgewisseld met bruine intronen; gekleurde nucleotiden markeren de 5′-splicingsite (GU) en de 3′-splicingsite (AG). Onderaan het gesplicete mRNA met enkel exonen, en het verwijderde intron als lariat.',
      'Top: the primary transcript, orange exons alternating with brown introns; coloured nucleotides mark the 5′ splice site (GU) and the 3′ splice site (AG). Bottom: the spliced mRNA containing only exons, and the excised intron as a lariat.'),
    facts: [
      F('Definitie', 'Definition', 'primair transcript van Pol II (exonen + intronen)', 'primary Pol II transcript (exons + introns)'),
      F('Lokalisatie', 'Localisation', 'kern; splicing grotendeels cotranscriptioneel', 'nucleus; splicing largely co-transcriptional'),
      F('Spliceosoom', 'Spliceosome', 'snRNP’s + > 100 eiwitten', 'snRNPs + > 100 proteins'),
      F('Splicingsites', 'Splice sites', 'GU aan de 5′-zijde, AG aan de 3′-zijde van het intron', 'GU at the 5′ end, AG at the 3′ end of the intron'),
      F('Humaan gen', 'Human gene', 'gemiddeld ~9 exonen, ~80% korter dan 200 nt', 'on average ~9 exons, ~80% shorter than 200 nt'),
    ],
    roles: [
      S('Intron-RNA-fragment (11 nt) met de vertakkingsplaats.', 'Intron RNA fragment (11 nt) containing the branch site.'),
      S('Splicingfactor SF1: herkent de vertakkingsplaats.', 'Splicing factor SF1: recognises the branch site.'),
    ],
  },

  mtdna: {
    look: S('In 3D: TFAM gebonden aan de L-strengpromotor (LSP) van mtDNA. TFAM buigt het DNA tot een scherpe U-vorm; zo verpakt het mtDNA in nucleoïden en activeert het de transcriptie.',
      'In 3D: TFAM bound to the light-strand promoter (LSP) of mtDNA. TFAM bends the DNA into a sharp U-turn; in this way it packages mtDNA into nucleoids and activates transcription.'),
    lookSchema: S('De twee ringen zijn de twee strengen (H- en L-streng). Gekleurde segmenten zijn genen: paars voor eiwitcoderende genen, groenblauw voor rRNA, gele streepjes voor tRNA; het grijze segment bovenaan is de niet-coderende controleregio.',
      'The two rings are the two strands (H and L strand). Coloured segments are genes: purple for protein-coding genes, teal for rRNA, yellow ticks for tRNA; the grey segment at the top is the non-coding control region.'),
    facts: [
      F('Grootte', 'Size', '16 569 bp, circulair dsDNA', '16,569 bp, circular dsDNA'),
      F('Genen', 'Genes', '37: 13 eiwitten (OXPHOS), 2 rRNA’s, 22 tRNA’s', '37: 13 proteins (OXPHOS), 2 rRNAs, 22 tRNAs'),
      F('Kopieaantal', 'Copy number', 'honderden tot duizenden per cel', 'hundreds to thousands per cell'),
      F('Overerving', 'Inheritance', 'maternaal', 'maternal'),
      F('Bijzonderheden', 'Peculiarities', 'geen intronen; afwijkende genetische code', 'no introns; variant genetic code'),
    ],
    roles: [
      S('Duplex met de L-strengpromotor (LSP) van humaan mtDNA.', 'Duplex containing the light-strand promoter (LSP) of human mtDNA.'),
      S('TFAM: buigt het DNA en activeert de transcriptie.', 'TFAM: bends the DNA and activates transcription.'),
    ],
  },

  plasmid: {
    look: S('In 3D: het initiatoreiwit RepE (mini-F-plasmide van E. coli) gebonden aan een iteron, een herhaalde sequentie in de ori. Hiermee start de replicatie van het plasmide.',
      'In 3D: the initiator protein RepE (mini-F plasmid of E. coli) bound to an iteron, a repeated sequence in the ori. This initiates plasmid replication.'),
    lookSchema: S('De blauwe ring is het dubbelstrengige DNA. Gekleurde segmenten: de promotor (rood), het ingevoegde gen (oranje), een antibioticumresistentiegen als selectiemerker (paars) en de ori (groen), de replicatieoorsprong.',
      'The blue ring is the double-stranded DNA. Coloured segments: the promoter (red), the inserted gene (orange), an antibiotic-resistance gene as selection marker (purple) and the ori (green), the origin of replication.'),
    facts: [
      F('Definitie', 'Definition', 'klein, meestal circulair dsDNA, extrachromosomaal en autonoom replicerend', 'small, usually circular dsDNA, extrachromosomal and autonomously replicating'),
      F('Gastheer', 'Host', 'vooral bacteriën (en gist); niet in humane cellen', 'mainly bacteria (and yeast); not in human cells'),
      F('Grootte', 'Size', 'typisch 2–10 kb', 'typically 2–10 kb'),
      F('Minimale vector', 'Minimal vector', 'ori, selectiemerker, multiple cloning site (MCS)', 'ori, selection marker, multiple cloning site (MCS)'),
      F('Selectie', 'Selection', 'resistentiemerker (bv. bla): enkel plasmidedragende cellen overleven', 'resistance marker (e.g. bla): only plasmid-bearing cells survive'),
    ],
    roles: [
      S('Iteron-duplex: herhaalde sequentie uit de ori van het plasmide.', 'Iteron duplex: repeated sequence from the plasmid ori.'),
      S('Initiatoreiwit RepE: bindt het iteron en initieert de replicatie.', 'Initiator protein RepE: binds the iteron and initiates replication.'),
    ],
  },

  cdna: {
    look: S('In 3D: HIV-1-reverse transcriptase gebonden aan een RNA:DNA-hybride, met de RNA-matrijs en de nieuw gesynthetiseerde DNA-streng: de eerste stap van de cDNA-synthese. Het antilichaamfragment dat voor de kristallisatie nodig was, is weggelaten.',
      'In 3D: HIV-1 reverse transcriptase bound to an RNA:DNA hybrid, with the RNA template and the newly synthesised DNA strand: the first step of cDNA synthesis. The antibody fragment required for crystallisation has been omitted.'),
    lookSchema: S('Vijf stappen van boven naar onder; oranje is RNA, blauw is DNA. De eerste DNA-streng wordt op de mRNA-matrijs gesynthetiseerd; daarna wordt het RNA afgebroken en vervangen door een tweede DNA-streng (lichtblauw).',
      'Five steps from top to bottom; orange is RNA, blue is DNA. The first DNA strand is synthesised on the mRNA template; the RNA is then degraded and replaced by a second DNA strand (light blue).'),
    facts: [
      F('Definitie', 'Definition', 'complementair DNA, gesynthetiseerd op een RNA-matrijs (meestal mRNA)', 'complementary DNA synthesised on an RNA template (usually mRNA)'),
      F('Enzym', 'Enzyme', 'reverse transcriptase', 'reverse transcriptase'),
      F('Ontbreekt', 'Lacks', 'intronen en promotor', 'introns and promoter'),
      F('Toepassingen', 'Applications', 'RT-qPCR, RNA-seq-bibliotheken, cDNA-klonering (expressie in bacteriën)', 'RT-qPCR, RNA-seq libraries, cDNA cloning (expression in bacteria)'),
      F('In de natuur', 'In nature', 'retrovirussen (HIV), LINE-1-retrotransposon, telomerase', 'retroviruses (HIV), LINE-1 retrotransposon, telomerase'),
    ],
    roles: [
      S('RNA-matrijsstreng.', 'RNA template strand.'),
      S('Nieuw gesynthetiseerde DNA-streng: begin van de eerste cDNA-streng.', 'Newly synthesised DNA strand: start of the first cDNA strand.'),
      S('Subeenheid p66: katalytische subeenheid, hier vindt de polymerisatie plaats.', 'p66 subunit: catalytic subunit where polymerisation takes place.'),
      S('Subeenheid p51: structurele ondersteuning.', 'p51 subunit: structural support.'),
    ],
  },

  lncrna: {
    look: S('In 3D: het 3′-uiteinde van MALAT1. Het A-rijke uiteinde vouwt terug in de groef van een U-rijke haarspeld en vormt een triple helix; die structuur beschermt het RNA tegen afbraak, ondanks het ontbreken van een canonieke poly(A)-staart.',
      'In 3D: the 3′ end of MALAT1. The A-rich end folds back into the groove of a U-rich hairpin to form a triple helix; this structure protects the RNA from degradation despite the absence of a canonical poly(A) tail.'),
    lookSchema: S('Vier panelen tonen vier werkingsmechanismen. De oranje golflijn is het lncRNA, paarse bollen zijn eiwitten, gele blokjes zijn weggevangen moleculen (decoy), en grijze bolletjes op blauw DNA stellen chromatine voor.',
      'Four panels show four mechanisms of action. The orange wavy line is the lncRNA, purple spheres are proteins, yellow blocks are sequestered molecules (decoy), and grey spheres on blue DNA represent chromatin.'),
    facts: [
      F('Definitie', 'Definition', 'transcript > 200 nt zonder eiwitcoderende functie', 'transcript > 200 nt without protein-coding function'),
      F('Aantal genen (mens)', 'Number of genes (human)', '> 16 000 (GENCODE)', '> 16,000 (GENCODE)'),
      F('Lokalisatie', 'Localisation', 'overwegend nucleair, deels cytoplasmatisch', 'predominantly nuclear, partly cytoplasmic'),
      F('Werkingswijze', 'Mode of action', 'gids, steiger, decoy of signaal', 'guide, scaffold, decoy or signal'),
      F('Voorbeeld', 'Example', 'XIST (~17 kb): inactivatie van één X-chromosoom', 'XIST (~17 kb): inactivation of one X chromosome'),
    ],
  },

  tdna: {
    look: S('In 3D: VirE2, het ssDNA-bindende eiwit dat in de plantencel de T-streng bedekt, in complex met zijn chaperone VirE1. Van het T-DNA zelf bestaat geen PDB-structuur: het is een lang, flexibel DNA-segment.',
      'In 3D: VirE2, the ssDNA-binding protein that coats the T-strand in the plant cell, in complex with its chaperone VirE1. There is no PDB structure of the T-DNA itself: it is a long, flexible DNA segment.'),
    lookSchema: S('Linksboven het Ti-plasmide van de bacterie met het roze T-DNA-segment. Dat wordt als enkelstrengige T-streng, met een paars eiwit (VirD2) aan het 5′-uiteinde, naar de plantencel overgebracht en onderaan in een plantenchromosoom geïntegreerd.',
      'Top left: the bacterial Ti plasmid with the pink T-DNA segment. It is transferred to the plant cell as a single-stranded T-strand, with a purple protein (VirD2) at the 5′ end, and integrated into a plant chromosome at the bottom.'),
    facts: [
      F('Organismen', 'Organisms', 'Agrobacterium tumefaciens en plant; niet in humane cellen', 'Agrobacterium tumefaciens and plant; not in human cells'),
      F('Herkomst', 'Origin', 'Ti-plasmide (200–800 kb) van Agrobacterium', 'Ti plasmid (200–800 kb) of Agrobacterium'),
      F('Grootte T-DNA', 'T-DNA size', '~10–30 kb', '~10–30 kb'),
      F('Grenzen', 'Borders', 'rechter- en linkergrens (RB, LB): imperfecte herhalingen van 25 bp', 'right and left border (RB, LB): imperfect 25-bp repeats'),
      F('Toepassing', 'Application', 'planttransformatie (binaire vectoren)', 'plant transformation (binary vectors)'),
    ],
    roles: [
      S('VirE2: ssDNA-bindend eiwit dat de T-streng in de plantencel bedekt.', 'VirE2: ssDNA-binding protein that coats the T-strand in the plant cell.'),
      S('VirE1: chaperone die VirE2 in de bacterie bindt.', 'VirE1: chaperone that binds VirE2 in the bacterium.'),
    ],
  },

  /* ================= Basenparen en RNA-motieven ================= */
  mismatch: {
    look: S('De meeste paren zijn Watson–Crick-paren. Centraal ligt een symmetrische inwendige lus van vier niet-canonieke paren (twee A·C, een sheared G·G en een G·A), met ernaast een G·U-wobblepaar. De bolletjes zijn metaalionen.',
      'Most pairs are Watson–Crick pairs. At the centre lies a symmetric internal loop of four non-canonical pairs (two A·C, a sheared G·G and a G·A), flanked by a G·U wobble pair. The spheres are metal ions.'),
    facts: [
      F('Definitie', 'Definition', 'tegenoverliggende, niet-complementaire basen', 'opposed, non-complementary bases'),
      F('Canonieke paren', 'Canonical pairs', 'A–U en G–C', 'A–U and G–C'),
      F('Hier', 'Here', '2× A·C, G·G en G·A (roze); G·U (geel)', '2× A·C, G·G and G·A (pink); G·U (yellow)'),
      F('Voorkomen', 'Occurrence', 'tRNA, mRNA, rRNA, SRP-RNA', 'tRNA, mRNA, rRNA, SRP RNA'),
      F('Versus DNA', 'Versus DNA', 'in DNA een fout die door herstel verwijderd wordt', 'in DNA an error that is removed by repair'),
    ],
    roles: DUO('Twee antiparallelle strengen van het RNA-dodecameer (domein IV van 4.5S-SRP-RNA).', 'Two antiparallel strands of the RNA dodecamer (domain IV of 4.5S SRP RNA).'),
  },

  wobble: {
    look: S('Zoek de twee gemarkeerde G·U-wobbleparen in het midden van de helix en de G·G-paren. De overige paren zijn Watson–Crick-paren (G–C, A–U).',
      'Find the two highlighted G·U wobble pairs in the middle of the helix and the G·G pairs. The remaining pairs are Watson–Crick pairs (G–C, A–U).'),
    facts: [
      F('Definitie', 'Definition', 'G·U-wobblepaar', 'G·U wobble pair'),
      F('Waterstofbruggen', 'Hydrogen bonds', '2 (G O6–U N3, G N1–U O2), net als A–U; G–C heeft er 3', '2 (G O6–U N3, G N1–U O2), as in A–U; G–C has 3'),
      F('Geometrie', 'Geometry', 'U verschoven t.o.v. de Watson–Crick-positie', 'U shifted relative to the Watson–Crick position'),
      F('Biologisch belang', 'Biological significance', 'wobble op codonpositie 3: één tRNA leest meerdere codons', 'wobble at codon position 3: one tRNA reads several codons'),
      F('Hier', 'Here', 'helix 6 van humaan SRP-RNA (7SL), bindingsplaats van SRP19', 'helix 6 of human SRP RNA (7SL), binding site of SRP19'),
    ],
    roles: DUO('Twee kopieën van hetzelfde 29-nt fragment, antiparallel gepaard tot een dubbelhelix.', 'Two copies of the same 29-nt fragment, paired antiparallel into a double helix.'),
  },

  stemloop: {
    look: S('Gemarkeerd is een stam van 5 basenparen met een apicale lus; in die lus ligt het anticodon. De rest van het tRNA ligt eromheen.',
      'Highlighted is a stem of 5 base pairs with an apical loop; the anticodon lies in that loop. The rest of the tRNA surrounds it.'),
    facts: [
      F('Stam', 'Stem', 'dubbelstrengig segment door intramoleculaire paring', 'double-stranded segment formed by intramolecular pairing'),
      F('Lus', 'Loop', 'enkelstrengig segment aan het uiteinde van de stam', 'single-stranded segment at the end of the stem'),
      F('Hier', 'Here', 'stam 27–31/39–43 (5 bp), lus 32–38 (7 nt)', 'stem 27–31/39–43 (5 bp), loop 32–38 (7 nt)'),
      F('Anticodon', 'Anticodon', 'GmAA (34–36): leest UUC (Phe)', 'GmAA (34–36): reads UUC (Phe)'),
      F('Voorkomen', 'Occurrence', 'tRNA, rRNA, mRNA, virale RNA’s', 'tRNA, rRNA, mRNA, viral RNAs'),
    ],
  },
};
