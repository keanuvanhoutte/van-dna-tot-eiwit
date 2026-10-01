/* Uitleg genome deel 2 (agent genome-b): dnahelix, dnavormen, noncanon, basenparing, nucleotide, supercoiling — zie app/SCENES.md */
const ALBERTS_DNA = { t: 'Alberts et al., Molecular Biology of the Cell (4e) — The Structure and Function of DNA (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK26821/' };
const ALBERTS_NT = { t: 'Alberts et al., Molecular Biology of the Cell (4e) — Panel 2-6: A Survey of the Nucleotides (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK26883/' };
const DREW = { t: 'Drew et al. (1981) Structure of a B-DNA dodecamer: conformation and dynamics. PNAS 78:2179 (PDB 1BNA)', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC319307/' };
const MOTM_DNA = { t: 'PDB-101 Molecule of the Month: DNA', url: 'https://pdb101.rcsb.org/motm/23' };

export default {
  dnahelix: {
    nl: {
      kort: 'DNA bestaat uit twee strengen die als een gedraaide ladder om elkaar heen lopen. De zijkanten zijn suiker en fosfaat; de sporten zijn basenparen (A met T, G met C). Omdat elke streng de andere bepaalt, kan DNA nauwkeurig gekopieerd en afgelezen worden.',
      what: 'DNA is een dubbelhelix van twee antiparallelle polynucleotideketens. De suiker-fosfaatruggengraat ligt aan de buitenkant, de vlakke basen zitten binnenin als gepaarde, gestapelde "treden". In de cel is dat vrijwel overal de rechtshandige B-vorm.',
      how: [
        "Elke streng heeft een richting (5'→3'); de twee strengen lopen tegengesteld (antiparallel).",
        'Fosfaat en 2′-deoxyribose wisselen elkaar af in de ruggengraat; elk fosfaat is negatief geladen.',
        'Basen paren binnenin: A met T (2 H-bruggen), G met C (3 H-bruggen).',
        'Opeenvolgende basenparen stapelen op ≈ 3,4 Å van elkaar en zijn telkens ≈ 34–36° gedraaid.',
        'Na ≈ 10,5 basenparen is de helix één keer rond (≈ 3,5 nm); de diameter is ≈ 2 nm.',
        'Omdat de suikers aan één kant van elk paar vastzitten, ontstaan een grote en een kleine groef.',
        'Eiwitten (bv. transcriptiefactoren) lezen de sequentie vooral via de randen van de basen in de grote groef.',
      ],
      facts: [['Diameter', '≈ 20 Å (2 nm)'], ['Stijging per bp', '≈ 3,4 Å'], ['bp per winding', '≈ 10,5 (in oplossing; vezelmodel 10)'], ['Draairichting', 'rechtshandig (B-DNA)'], ['Grote / kleine groef', '≈ 12 / 6 Å breed'], ['Voorbeeldstructuur', 'PDB 1BNA (CGCGAATTCGCG)']],
      why: 'De helixvorm verklaart hoe DNA gekopieerd kan worden (elke streng is een matrijs), hoe het compact verpakt wordt rond nucleosomen en hoe eiwitten een sequentie kunnen herkennen zonder de helix te openen — de basis voor genregulatie in het volgende hoofdstuk.',
    },
    en: {
      kort: 'DNA consists of two strands that wind around each other like a twisted ladder. The sides are sugar and phosphate; the rungs are base pairs (A with T, G with C). Because each strand determines the other, DNA can be copied and read accurately.',
      what: 'DNA is a double helix of two antiparallel polynucleotide chains. The sugar–phosphate backbone lies on the outside, the flat bases sit inside as paired, stacked "steps". In the cell it is almost everywhere the right-handed B form.',
      how: [
        "Each strand has a direction (5'→3'); the two strands run in opposite directions (antiparallel).",
        'Phosphate and 2′-deoxyribose alternate in the backbone; every phosphate is negatively charged.',
        'Bases pair inside: A with T (2 H-bonds), G with C (3 H-bonds).',
        'Successive base pairs stack ≈ 3.4 Å apart and are each rotated by ≈ 34–36°.',
        'After ≈ 10.5 base pairs the helix has made one full turn (≈ 3.5 nm); the diameter is ≈ 2 nm.',
        'Because the sugars attach to one side of each pair, a major and a minor groove arise.',
        'Proteins (e.g. transcription factors) read the sequence mainly through the base edges in the major groove.',
      ],
      facts: [['Diameter', '≈ 20 Å (2 nm)'], ['Rise per bp', '≈ 3.4 Å'], ['bp per turn', '≈ 10.5 (in solution; fibre model 10)'], ['Handedness', 'right-handed (B-DNA)'], ['Major / minor groove', '≈ 12 / 6 Å wide'], ['Example structure', 'PDB 1BNA (CGCGAATTCGCG)']],
      why: 'The helical shape explains how DNA can be copied (each strand is a template), how it is packed compactly around nucleosomes and how proteins can recognise a sequence without opening the helix — the basis for gene regulation in the next chapter.',
    },
    sources: [ALBERTS_DNA, DREW, MOTM_DNA, { t: 'RCSB PDB — 1BNA: Structure of a B-DNA dodecamer', url: 'https://www.rcsb.org/structure/1BNA' }],
  },

  dnavormen: {
    nl: {
      kort: 'De DNA-dubbelhelix kan verschillende vormen aannemen. In de cel is bijna al het DNA de gewone B-vorm. De bredere A-vorm zie je bij dubbelstrengig RNA en bij RNA dat aan DNA gepaard is, en de linksdraaiende Z-vorm alleen bij bepaalde sequenties onder speciale omstandigheden.',
      what: 'Dezelfde dubbelhelix kan verschillende conformaties aannemen. B-DNA is de standaardvorm; A-DNA is korter en breder (typisch voor dubbelstrengig RNA en RNA–DNA-hybriden); Z-DNA is linkshandig met een zigzaggende ruggengraat.',
      how: [
        'B-DNA: rechtshandig, ≈ 10,5 bp/winding in oplossing (klassiek vezelmodel: 10), 3,4 Å/bp, ≈ 20 Å breed, suikers C2′-endo, basen anti.',
        'A-DNA: rechtshandig, ≈ 11 bp/winding, ≈ 2,6 Å/bp, ≈ 23 Å breed, suikers C3′-endo; basenparen ≈ 20° gekanteld en naast de as (holte in het midden).',
        'C3′-endo brengt opeenvolgende fosfaten dichter bij elkaar (≈ 5,9 i.p.v. ≈ 7,0 Å): de helix wordt korter.',
        'Z-DNA: linkshandig, 12 bp/winding, ≈ 3,7 Å/bp, ≈ 18 Å breed; herhalende eenheid = dinucleotide met G syn (C3′-endo) en C anti (C2′-endo).',
        'Groeven: B = brede, diepe grote groef; A = smalle, diepe grote en brede, ondiepe kleine groef; Z = vrijwel vlakke "grote groef" en smalle, diepe kleine groef.',
        'Omstandigheden: A bij weinig water en in dsRNA/hybriden; Z bij alternerende (CG)n, hoog zout of negatieve supercoiling.',
      ],
      facts: [['B-DNA', '≈ 10,5 bp/winding, rechts'], ['A-DNA', '≈ 11 bp/winding, rechts'], ['Z-DNA', '12 bp/winding, links'], ['Puckering', "B: C2′-endo · A: C3′-endo · Z: afwisselend"], ['Structuren', 'PDB 440D (A), 1BNA (B), 1DCG (Z)']],
      why: 'Examenstof: de vormen verschillen in bp per winding, stijging, draairichting, groeven en suikerpuckering. RNA-duplexen zijn (vrijwel) altijd A-vorm, wat hun herkenning door eiwitten bepaalt; Z-DNA kan tijdelijk ontstaan achter RNA-polymerase (negatieve supercoiling) en wordt herkend door Zα-domeinen (bv. ADAR1).',
    },
    en: {
      kort: 'The DNA double helix can take on different shapes. In the cell almost all DNA has the usual B form. The wider A form is seen in double-stranded RNA and in RNA paired with DNA, and the left-handed Z form only in certain sequences under special conditions.',
      what: 'The same double helix can adopt different conformations. B-DNA is the standard form; A-DNA is shorter and wider (typical of double-stranded RNA and RNA–DNA hybrids); Z-DNA is left-handed with a zigzag backbone.',
      how: [
        'B-DNA: right-handed, ≈ 10.5 bp/turn in solution (classic fibre model: 10), 3.4 Å/bp, ≈ 20 Å wide, sugars C2′-endo, bases anti.',
        'A-DNA: right-handed, ≈ 11 bp/turn, ≈ 2.6 Å/bp, ≈ 23 Å wide, sugars C3′-endo; base pairs tilted ≈ 20° and displaced from the axis (hollow core).',
        'C3′-endo brings successive phosphates closer together (≈ 5.9 instead of ≈ 7.0 Å): the helix becomes shorter.',
        'Z-DNA: left-handed, 12 bp/turn, ≈ 3.7 Å/bp, ≈ 18 Å wide; repeating unit = dinucleotide with G syn (C3′-endo) and C anti (C2′-endo).',
        'Grooves: B = wide, deep major groove; A = narrow, deep major and wide, shallow minor groove; Z = almost flat "major groove" and narrow, deep minor groove.',
        'Conditions: A at low water activity and in dsRNA/hybrids; Z in alternating (CG)n, at high salt or under negative supercoiling.',
      ],
      facts: [['B-DNA', '≈ 10.5 bp/turn, right'], ['A-DNA', '≈ 11 bp/turn, right'], ['Z-DNA', '12 bp/turn, left'], ['Sugar pucker', "B: C2′-endo · A: C3′-endo · Z: alternating"], ['Structures', 'PDB 440D (A), 1BNA (B), 1DCG (Z)']],
      why: 'Exam material: the forms differ in bp per turn, rise, handedness, grooves and sugar pucker. RNA duplexes are (almost) always A-form, which determines how proteins recognise them; Z-DNA can form transiently behind RNA polymerase (negative supercoiling) and is recognised by Zα domains (e.g. ADAR1).',
    },
    sources: [ALBERTS_DNA, DREW, { t: 'Wang et al. (1979) Molecular structure of a left-handed double helical DNA fragment at atomic resolution. Nature 282:680', url: 'https://pubmed.ncbi.nlm.nih.gov/514347/' }, { t: 'Rich & Zhang (2003) Z-DNA: the long road to biological function. Nat Rev Genet 4:566', url: 'https://pubmed.ncbi.nlm.nih.gov/12838348/' }, { t: 'RCSB PDB — 440D: A-DNA crystal structure of d(AGGGGCCCCT)', url: 'https://www.rcsb.org/structure/440D' }],
  },

  noncanon: {
    nl: {
      kort: 'Op sommige plaatsen kan DNA tijdelijk afwijken van de gewone dubbelhelix, bijvoorbeeld als vierkant van vier G\'s of met een derde streng. Zulke vormen ontstaan vooral bij herhaalde of G-rijke sequenties, zoals aan de uiteinden van chromosomen. Ze kunnen het aflezen en kopiëren van DNA beïnvloeden.',
      what: 'Bepaalde sequenties kunnen lokaal van de B-helix afwijken. G-rijke strengen vormen G-quadruplexen, spiegelherhalingen van purines/pyrimidines vormen triplex-DNA (H-DNA), omgekeerde herhalingen vormen kruisvormen en C-rijke strengen i-motieven.',
      how: [
        'G-kwartet: vier guanines in een vlak, verbonden door 8 Hoogsteen-H-bruggen (N1–H···O6, N2–H···N7).',
        'Twee of meer kwartetten stapelen; een K⁺-ion tussen twee lagen wordt gecoördineerd door 8 O6-zuurstoffen.',
        'Topologie hangt af van sequentie en kation: de telomeerherhaling vormt met K⁺ in het kristal een parallelle propeller (1KF1), met Na⁺ een antiparallelle mand (143D).',
        'Triplex: een derde streng ligt in de grote groef en paart via Hoogsteen (T·A–T, C⁺·G–C); bij H-DNA vouwt de helft van de pyrimidinestreng terug en blijft de purinestreng deels enkelstrengig.',
        'Kruisvorm: bij een palindroom vormt elke streng een haarspeld; samen een vierwegsknooppunt.',
        'i-motief: half-geprotoneerde C·C⁺-paren (3 H-bruggen) die in elkaar schuiven, stabiel bij licht zure pH.',
        'Negatieve supercoiling levert de energie om deze structuren uit B-DNA te laten ontstaan.',
      ],
      facts: [['H-bruggen per G-kwartet', '8 (Hoogsteen)'], ['Telomeerherhaling (mens)', 'TTAGGG'], ['Stabiliserend kation', 'K⁺ (tussen de lagen)'], ['PDB', '1KF1 (K⁺, parallel) · 143D (Na⁺, mand) · 1D3X (triplex)'], ['Triplets', 'T·A–T en C⁺·G–C']],
      why: 'G-quadruplexen aan telomeren en in promoters (bv. MYC) beïnvloeden replicatie, transcriptie en genoomstabiliteit en zijn doelwit voor kankergeneesmiddelen; niet-B-structuren zijn ook hotspots voor mutaties. Ze tonen dat basenparing meer kan dan Watson–Crick.',
    },
    en: {
      kort: 'In some places DNA can temporarily depart from the usual double helix, for example as a square of four G\'s or with a third strand. Such shapes arise mainly at repeated or G-rich sequences, such as the ends of chromosomes. They can affect how DNA is read and copied.',
      what: 'Certain sequences can locally deviate from the B helix. G-rich strands form G-quadruplexes, purine/pyrimidine mirror repeats form triplex DNA (H-DNA), inverted repeats form cruciforms and C-rich strands i-motifs.',
      how: [
        'G-quartet: four guanines in a plane, connected by 8 Hoogsteen H-bonds (N1–H···O6, N2–H···N7).',
        'Two or more quartets stack; a K⁺ ion between two layers is coordinated by 8 O6 oxygens.',
        'Topology depends on sequence and cation: the telomeric repeat forms a parallel propeller with K⁺ in the crystal (1KF1) and an antiparallel basket with Na⁺ (143D).',
        'Triplex: a third strand lies in the major groove and pairs via Hoogsteen bonds (T·A–T, C⁺·G–C); in H-DNA half of the pyrimidine strand folds back and the purine strand stays partly single-stranded.',
        'Cruciform: at a palindrome each strand forms a hairpin; together a four-way junction.',
        'i-motif: hemiprotonated C·C⁺ pairs (3 H-bonds) that intercalate, stable at slightly acidic pH.',
        'Negative supercoiling provides the energy for these structures to form from B-DNA.',
      ],
      facts: [['H-bonds per G-quartet', '8 (Hoogsteen)'], ['Telomeric repeat (human)', 'TTAGGG'], ['Stabilising cation', 'K⁺ (between layers)'], ['PDB', '1KF1 (K⁺, parallel) · 143D (Na⁺, basket) · 1D3X (triplex)'], ['Triplets', 'T·A–T and C⁺·G–C']],
      why: 'G-quadruplexes at telomeres and in promoters (e.g. MYC) affect replication, transcription and genome stability and are targets for anticancer drugs; non-B structures are also mutation hotspots. They show that base pairing can do more than Watson–Crick.',
    },
    sources: [
      { t: 'Parkinson, Lee & Neidle (2002) Crystal structure of parallel quadruplexes from human telomeric DNA. Nature 417:876 (PDB 1KF1)', url: 'https://pubmed.ncbi.nlm.nih.gov/12050675/' },
      { t: 'Varshney et al. (2020) The regulation and functions of DNA and RNA G-quadruplexes. Nat Rev Mol Cell Biol 21:459', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7115845/' },
      { t: 'Hisey, Masnovo & Mirkin (2024) Triplex H-DNA structure: the long and winding road from the discovery to its role in human disease. NAR Mol Med', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11667243/' },
      { t: 'Zeraati et al. (2018) I-motif DNA structures are formed in the nuclei of human cells. Nat Chem 10:631', url: 'https://pubmed.ncbi.nlm.nih.gov/29686376/' },
      { t: 'RCSB PDB — 143D: Solution structure of the human telomeric repeat d(AG3[T2AG3]3) G-quadruplex', url: 'https://www.rcsb.org/structure/143D' },
    ],
  },

  basenparing: {
    nl: {
      kort: 'In DNA paart A altijd met T en G altijd met C, via waterstofbruggen. Beide paren zijn even breed, zodat elke sequentie in dezelfde helix past. Door deze vaste paring kan elke streng als mal dienen om de andere te maken, bij het kopiëren én bij het afschrijven naar RNA.',
      what: 'In de dubbelhelix paart een purine altijd met een pyrimidine: A met T via 2 waterstofbruggen, G met C via 3. Beide paren hebben bijna dezelfde afmetingen, zodat elke sequentie in dezelfde regelmatige helix past.',
      how: [
        'A–T: N6–H(A)···O4(T) en N1(A)···H–N3(T).',
        'G–C: O6(G)···H–N4(C), N1–H(G)···N3(C) en N2–H(G)···O2(C).',
        "De C1′–C1′-afstand is ≈ 10,5 Å voor beide paren; de glycosidische bindingen liggen aan één kant (kleine groef).",
        'Elk paar toont in de grote groef een eigen patroon van H-brugdonoren, -acceptoren en de methylgroep van T: zo herkennen eiwitten de sequentie.',
        'Regels van Chargaff: A = T en G = C in dubbelstrengig DNA.',
        'Stapeling tussen opeenvolgende paren (van-der-Waals-, hydrofobe krachten) levert het grootste deel van de stabiliteit.',
        'Hoogsteen: de purine draait naar syn en paart met zijn N7-rand (C1′–C1′ ≈ 8,5 Å); wobble G·U in RNA verschuift U naar de grote groef.',
      ],
      facts: [['A–T', '2 H-bruggen'], ['G–C', '3 H-bruggen'], ["C1′–C1′", '≈ 10,5 Å (Watson–Crick)'], ['H-brugafstand', '≈ 2,8–3,0 Å'], ['GC-gehalte mens', '≈ 41 %'], ['Wobble', 'G·U, 2 H-bruggen (RNA)']],
      why: 'Complementaire basenparing is de basis van replicatie, transcriptie en translatie (codon–anticodon). Alternatieve paringen (Hoogsteen, wobble) maken triplexen, G-quadruplexen en de flexibele derde codonpositie mogelijk.',
    },
    en: {
      kort: 'In DNA, A always pairs with T and G always with C, through hydrogen bonds. Both pairs are equally wide, so any sequence fits into the same helix. Because of this fixed pairing, each strand can serve as a template to make the other, both when DNA is copied and when it is transcribed into RNA.',
      what: 'In the double helix a purine always pairs with a pyrimidine: A with T through 2 hydrogen bonds, G with C through 3. Both pairs have almost the same dimensions, so any sequence fits the same regular helix.',
      how: [
        'A–T: N6–H(A)···O4(T) and N1(A)···H–N3(T).',
        'G–C: O6(G)···H–N4(C), N1–H(G)···N3(C) and N2–H(G)···O2(C).',
        "The C1′–C1′ distance is ≈ 10.5 Å for both pairs; the glycosidic bonds lie on one side (minor groove).",
        'In the major groove every pair shows its own pattern of H-bond donors, acceptors and the methyl group of T: this is how proteins recognise the sequence.',
        "Chargaff's rules: A = T and G = C in double-stranded DNA.",
        'Stacking between successive pairs (van der Waals, hydrophobic forces) provides most of the stability.',
        'Hoogsteen: the purine flips to syn and pairs with its N7 edge (C1′–C1′ ≈ 8.5 Å); wobble G·U in RNA shifts U towards the major groove.',
      ],
      facts: [['A–T', '2 H-bonds'], ['G–C', '3 H-bonds'], ["C1′–C1′", '≈ 10.5 Å (Watson–Crick)'], ['H-bond distance', '≈ 2.8–3.0 Å'], ['Human GC content', '≈ 41 %'], ['Wobble', 'G·U, 2 H-bonds (RNA)']],
      why: 'Complementary base pairing underlies replication, transcription and translation (codon–anticodon). Alternative pairings (Hoogsteen, wobble) enable triplexes, G-quadruplexes and the flexible third codon position.',
    },
    sources: [
      ALBERTS_DNA,
      { t: 'Yakovchuk, Protozanova & Frank-Kamenetskii (2006) Base-stacking and base-pairing contributions into thermal stability of the DNA double helix. NAR 34:564', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1360284/' },
      { t: 'Nikolova et al. (2011) Transient Hoogsteen base pairs in canonical duplex DNA. Nature 470:498', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3074620/' },
      { t: 'Leroy et al. (1988) Characterization of base-pair opening in deoxynucleotide duplexes using catalyzed exchange of the imino proton. J Mol Biol 200:223 (levensduur basenpaar ≈ ms)', url: 'https://pubmed.ncbi.nlm.nih.gov/2836594/' },
      { t: 'Crick (1966) Codon–anticodon pairing: the wobble hypothesis. J Mol Biol 19:548', url: 'https://pubmed.ncbi.nlm.nih.gov/5969078/' },
      { t: 'International Human Genome Sequencing Consortium (2001) Initial sequencing and analysis of the human genome. Nature 409:860', url: 'https://pubmed.ncbi.nlm.nih.gov/11237011/' },
    ],
  },

  nucleotide: {
    nl: {
      kort: 'Een nucleotide is de bouwsteen van DNA en RNA. Het bestaat uit een base (de \'letter\' A, C, G, T of U), een suiker en een fosfaatgroep. Nucleotiden worden via hun suiker en fosfaat aan elkaar geschakeld tot een streng met een vaste richting.',
      what: 'Een nucleotide is de bouwsteen van DNA en RNA: een stikstofbase, een pentose (2′-deoxyribose in DNA, ribose in RNA) en één of meer fosfaatgroepen. Zonder fosfaat heet het een nucleoside.',
      how: [
        "De suikerkoolstoffen worden genummerd 1′–5′ (met accent), om ze te onderscheiden van de atomen van de base.",
        "DNA mist de OH-groep op C2′ (2′-deoxy); RNA heeft 2′-OH, wat RNA reactiever maakt.",
        'De base hangt via een β-N-glycosidische binding aan C1′: via N9 bij purines (A, G), via N1 bij pyrimidines (C, T, U).',
        "Fosfaat(en) zitten op C5′: dAMP, dADP, dATP. dNTP's zijn de substraten van DNA-polymerase.",
        "In de keten verbindt een fosfodiësterbinding C3′ van de ene suiker met C5′ van de volgende → 5′- en 3′-uiteinde.",
        "De suikerring is gekreukt: C2′-endo (B-DNA) of C3′-endo (A-DNA, RNA).",
        'Rond de glycosidische binding (torsie χ) staat de base anti (standaard) of syn (bv. G in Z-DNA).',
      ],
      facts: [['Purines', 'adenine, guanine (2 ringen)'], ['Pyrimidines', 'cytosine, thymine, uracil (1 ring)'], ['Nucleoside', 'base + suiker (bv. deoxyadenosine)'], ['Nucleotide', 'nucleoside + fosfaat (bv. dAMP)'], ['Binding in de keten', "3′→5′-fosfodiëster"], ['T vs U', 'T = 5-methyluracil']],
      why: 'De chemie van het nucleotide bepaalt alles erboven: de 5′→3′-richting van synthese, de lading van DNA, het verschil in stabiliteit tussen DNA en RNA en, via puckering en χ, welke helixvorm ontstaat.',
    },
    en: {
      kort: 'A nucleotide is the building block of DNA and RNA. It consists of a base (the \'letter\' A, C, G, T or U), a sugar and a phosphate group. Nucleotides are linked through their sugar and phosphate into a strand with a fixed direction.',
      what: 'A nucleotide is the building block of DNA and RNA: a nitrogenous base, a pentose (2′-deoxyribose in DNA, ribose in RNA) and one or more phosphate groups. Without phosphate it is called a nucleoside.',
      how: [
        "The sugar carbons are numbered 1′–5′ (primed), to distinguish them from the base atoms.",
        "DNA lacks the OH group on C2′ (2′-deoxy); RNA has a 2′-OH, which makes RNA more reactive.",
        'The base is attached to C1′ by a β-N-glycosidic bond: through N9 in purines (A, G), through N1 in pyrimidines (C, T, U).',
        "Phosphate(s) sit on C5′: dAMP, dADP, dATP. dNTPs are the substrates of DNA polymerase.",
        "In the chain a phosphodiester bond links C3′ of one sugar to C5′ of the next → 5′ and 3′ ends.",
        "The sugar ring is puckered: C2′-endo (B-DNA) or C3′-endo (A-DNA, RNA).",
        'Around the glycosidic bond (torsion χ) the base is anti (standard) or syn (e.g. G in Z-DNA).',
      ],
      facts: [['Purines', 'adenine, guanine (2 rings)'], ['Pyrimidines', 'cytosine, thymine, uracil (1 ring)'], ['Nucleoside', 'base + sugar (e.g. deoxyadenosine)'], ['Nucleotide', 'nucleoside + phosphate (e.g. dAMP)'], ['Bond in the chain', "3′→5′ phosphodiester"], ['T vs U', 'T = 5-methyluracil']],
      why: 'The chemistry of the nucleotide determines everything above it: the 5′→3′ direction of synthesis, the charge of DNA, the difference in stability between DNA and RNA and, through pucker and χ, which helix form arises.',
    },
    sources: [ALBERTS_NT, ALBERTS_DNA, { t: 'PDB-101 Learn: Paper Models — DNA', url: 'https://pdb101.rcsb.org/learn/guide-to-understanding-pdb-data/dna' }, DREW],
  },

  supercoiling: {
    nl: {
      kort: 'Als de uiteinden van DNA niet vrij kunnen draaien, kan het DNA te strak of te los gewonden raken; het gaat dan kronkelen, zoals een gedraaid telefoonsnoer. Dat gebeurt bijvoorbeeld voor en achter een enzym dat DNA afleest. Topo-isomerasen knippen het DNA tijdelijk om die spanning weg te nemen.',
      what: 'Als de uiteinden van een DNA-stuk niet vrij kunnen draaien (circulair DNA of vastgemaakte lussen), kan het DNA onder torsiespanning komen: supercoiling. Topo-isomerasen veranderen die toestand door strengen tijdelijk te knippen.',
      how: [
        'Linking number Lk = aantal keren dat de ene streng rond de andere gaat; een geheel getal dat alleen verandert als een streng breekt.',
        'Lk = Tw + Wr: twist (windingen rond de as) plus writhe (kronkeling van de as zelf, bv. een plectoneem).',
        'Ontspannen B-DNA: Lk₀ = N/10,5. Onderwonden DNA (ΔLk < 0) is negatief gesupercoild; cellulair DNA heeft σ = ΔLk/Lk₀ ≈ −0,06.',
        'Bij eukaryoten zit de negatieve supercoiling grotendeels vast in nucleosomen (≈ −1 per nucleosoom).',
        'Twin-domain-model: een voortschrijdend RNA-polymerase maakt positieve supercoils vóór en negatieve achter zich.',
        'Topo-isomerase I (TOP1, type IB) knipt één streng, blijft via een tyrosine gebonden en laat de streng rond de intacte streng draaien; geen ATP.',
        'Topo-isomerase II (TOP2A/B) knipt beide strengen, haalt een tweede duplex door de breuk en verandert Lk met 2; ATP-afhankelijk. Het ontwart ook dochterchromatiden na replicatie.',
      ],
      facts: [['Kernformule', 'Lk = Tw + Wr'], ['σ in cellen', '≈ −0,06 (negatief)'], ['TOP1', '1 streng, geen ATP'], ['TOP2', '2 strengen, ATP, ΔLk = ±2'], ['Geneesmiddelen', 'camptothecine (TOP1); etoposide, doxorubicine (TOP2)']],
      why: 'Negatieve supercoiling maakt het makkelijker om de helix te openen voor transcriptie en replicatie en stimuleert Z-DNA, kruisvormen en H-DNA. Zonder topo-isomerasen zouden transcriptie en replicatie vastlopen; daarom zijn ze belangrijke doelwitten van kankertherapie.',
    },
    en: {
      kort: 'When the ends of DNA cannot rotate freely, the DNA can become wound too tightly or too loosely; it then starts to coil, like a twisted telephone cord. This happens, for example, ahead of and behind an enzyme that reads DNA. Topoisomerases cut the DNA temporarily to relieve this strain.',
      what: 'When the ends of a DNA segment cannot rotate freely (circular DNA or anchored loops), the DNA can come under torsional stress: supercoiling. Topoisomerases change this state by transiently cutting strands.',
      how: [
        'Linking number Lk = the number of times one strand winds around the other; an integer that changes only if a strand is broken.',
        'Lk = Tw + Wr: twist (turns around the axis) plus writhe (coiling of the axis itself, e.g. a plectoneme).',
        'Relaxed B-DNA: Lk₀ = N/10.5. Underwound DNA (ΔLk < 0) is negatively supercoiled; cellular DNA has σ = ΔLk/Lk₀ ≈ −0.06.',
        'In eukaryotes the negative supercoiling is largely held in nucleosomes (≈ −1 per nucleosome).',
        'Twin-domain model: an advancing RNA polymerase creates positive supercoils ahead of it and negative ones behind.',
        'Topoisomerase I (TOP1, type IB) cuts one strand, stays attached via a tyrosine and lets the strand rotate around the intact strand; no ATP.',
        'Topoisomerase II (TOP2A/B) cuts both strands, passes a second duplex through the break and changes Lk by 2; ATP-dependent. It also untangles daughter chromatids after replication.',
      ],
      facts: [['Key formula', 'Lk = Tw + Wr'], ['σ in cells', '≈ −0.06 (negative)'], ['TOP1', '1 strand, no ATP'], ['TOP2', '2 strands, ATP, ΔLk = ±2'], ['Drugs', 'camptothecin (TOP1); etoposide, doxorubicin (TOP2)']],
      why: 'Negative supercoiling makes it easier to open the helix for transcription and replication and promotes Z-DNA, cruciforms and H-DNA. Without topoisomerases transcription and replication would stall; that is why they are major targets of cancer therapy.',
    },
    sources: [
      { t: 'Liu & Wang (1987) Supercoiling of the DNA template during transcription. PNAS 84:7024', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC299221/' },
      { t: 'Pommier et al. (2016) Roles of eukaryotic topoisomerases in transcription, replication and genomic stability. Nat Rev Mol Cell Biol 17:703', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9248348/' },
      { t: 'Champoux (2001) DNA topoisomerases: structure, function, and mechanism. Annu Rev Biochem 70:369', url: 'https://pubmed.ncbi.nlm.nih.gov/11395412/' },
      { t: 'Alberts et al., Molecular Biology of the Cell (4e) — DNA topoisomerases at the replication fork (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK26850/' },
    ],
  },
};
