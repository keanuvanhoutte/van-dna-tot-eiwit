/* Uitleg per knoop voor stage 'repl' — zie app/SCENES.md */
const ALB_REP = { t: 'Alberts et al., Molecular Biology of the Cell, 4e ed. — DNA Replication Mechanisms (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK26850/' };
const ALB_INIT = { t: 'Alberts et al., MBoC 4e ed. — The Initiation and Completion of DNA Replication in Chromosomes (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK26826/' };
const ALB_REPAIR = { t: 'Alberts et al., MBoC 4e ed. — DNA Repair (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK26879/' };
const BURGERS = { t: 'Burgers & Kunkel (2017) Eukaryotic DNA replication fork. Annu Rev Biochem 86:417 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5597965/' };
const OKAZAKI = { t: 'Balakrishnan & Bambara (2013) Okazaki fragment metabolism. CSH Perspect Biol (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3552508/' };
const CHATTERJEE = { t: 'Chatterjee & Walker (2017) Mechanisms of DNA damage, repair and mutagenesis. Environ Mol Mutagen (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5474181/' };

export default {
  replicatie: {
    nl: {
      what: 'Vóór elke celdeling wordt het volledige genoom precies één keer gekopieerd. Replicatie is semi-conservatief: elke dochtermolecule bestaat uit één oude en één nieuwe streng. Bij de mens start ze op vele origins per chromosoom en loopt ze vanuit elke origin in twee richtingen.',
      how: [
        'G1-fase: ORC bindt de origins; samen met Cdc6 en Cdt1 wordt het MCM2-7-complex als inactieve dubbelhexameer rond dubbelstrengig DNA gelegd (licentie).',
        'Begin S-fase: de kinasen DDK en CDK activeren de helicase; Cdc45 en GINS binden aan MCM → twee CMG-helicasen.',
        "Elke CMG omsluit één streng en loopt er 3'→5' over; de twee helicasen lopen uit elkaar: twee replicatievorken (bidirectioneel).",
        'Aan elke vork wordt één streng continu (leidende streng) en de andere in Okazaki-fragmenten (volgende streng) gemaakt.',
        'Origins vuren verspreid over de S-fase (vroeg en laat); niet elke origin met licentie wordt gebruikt (reserve-origins).',
        'Waar twee vorken elkaar ontmoeten, eindigt de replicatie (terminatie) en wordt CMG van het DNA gehaald.',
        'Achter de vork worden meteen weer nucleosomen gevormd met oude en nieuwe histonen; cohesine houdt de zusterchromatiden bij elkaar.',
      ],
      facts: [['Model', 'semi-conservatief (Meselson & Stahl, 1958)'], ['Replicatievorken per origin', '2 (bidirectioneel)'], ['Vorksnelheid', '≈ 1–3 kb/min (mens) — veel trager dan bij E. coli'], ['Licentie', 'enkel in G1 (MCM-dubbelhexameer); vuren in S-fase'], ['Nauwkeurigheid', 'basenselectie + proeflezen + mismatch-herstel']],
      why: 'Replicatie zorgt ervoor dat elke dochtercel dezelfde genetische informatie krijgt. Omdat licentie (G1) en vuren (S) gescheiden zijn, wordt elk stuk DNA maar één keer per celcyclus gekopieerd; fouten in dit systeem leiden tot genoominstabiliteit, een kenmerk van kanker.',
    },
    en: {
      what: 'Before every cell division the whole genome is copied exactly once. Replication is semi-conservative: each daughter molecule consists of one old and one new strand. In humans it starts at many origins per chromosome and proceeds in two directions from each origin.',
      how: [
        'G1 phase: ORC binds the origins; together with Cdc6 and Cdt1 the MCM2-7 complex is loaded around double-stranded DNA as an inactive double hexamer (licensing).',
        'Start of S phase: the kinases DDK and CDK activate the helicase; Cdc45 and GINS bind MCM → two CMG helicases.',
        "Each CMG encircles one strand and moves 3'→5' along it; the two helicases move apart: two replication forks (bidirectional).",
        'At each fork one strand is made continuously (leading strand) and the other in Okazaki fragments (lagging strand).',
        'Origins fire throughout S phase (early and late); not every licensed origin is used (dormant/backup origins).',
        'Where two forks meet, replication ends (termination) and CMG is removed from the DNA.',
        'Behind the fork nucleosomes re-form immediately from old and new histones; cohesin holds the sister chromatids together.',
      ],
      facts: [['Model', 'semi-conservative (Meselson & Stahl, 1958)'], ['Replication forks per origin', '2 (bidirectional)'], ['Fork speed', '≈ 1–3 kb/min (human) — much slower than in E. coli'], ['Licensing', 'only in G1 (MCM double hexamer); firing in S phase'], ['Accuracy', 'base selection + proofreading + mismatch repair']],
      why: 'Replication ensures that each daughter cell receives the same genetic information. Because licensing (G1) and firing (S) are separated, each piece of DNA is copied only once per cell cycle; failures in this system cause genome instability, a hallmark of cancer.',
    },
    sources: [
      { t: 'Meselson & Stahl (1958) The replication of DNA in Escherichia coli. PNAS 44:671 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC528642/' },
      ALB_INIT,
      BURGERS,
      { t: 'Marks, Fu & Aladjem (2017) Regulation of replication origins. Adv Exp Med Biol 1042:43 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6622447/' },
      { t: 'BioNumbers BNID 111770 — speed of the replication fork (Méchali 2010)', url: 'https://bionumbers.hms.harvard.edu/bionumber.aspx?s=n&v=0&id=111770' },
    ],
  },

  replisoom: {
    nl: {
      what: 'Het replisoom is de eiwitmachine aan de replicatievork. De CMG-helicase ontwindt het DNA, drie DNA-polymerasen maken de nieuwe strengen, de klem PCNA houdt ze op het DNA en RPA beschermt het enkelstrengige DNA. Omdat polymerasen alleen 5\'→3\' kunnen verlengen, groeit één streng continu en de andere in stukken.',
      how: [
        "CMG (Cdc45–MCM2-7–GINS) omsluit de leidende-streng-matrijs en loopt er 3'→5' over; vóór de vork halen topo-isomerasen de positieve supercoils weg.",
        'RPA bedekt het blootgelegde enkelstrengige DNA van de volgende-streng-matrijs.',
        'Pol α-primase legt een primer: ~10 nt RNA (primase) plus ~20 nt DNA (Pol α). DNA-polymerasen kunnen niet zelf beginnen.',
        "RFC laadt de ringvormige klem PCNA op het primer-3'-uiteinde; Pol δ neemt over (polymerasewissel).",
        "Leidende streng: Pol ε, gebonden aan CMG, verlengt continu 5'→3' in de richting van de vork.",
        "Volgende streng: Pol δ verlengt elk Okazaki-fragment 5'→3' (van de vork weg) tot het vorige fragment en verdringt daar het 5'-uiteinde tot een flap.",
        'FEN1 knipt de flap met het RNA weg (RNase H2 kan ook RNA afbreken); DNA-ligase I sluit de nick.',
        "Pol δ en Pol ε lezen proef met een 3'→5'-exonuclease: een verkeerd ingebouwde base wordt meteen weggeknipt.",
      ],
      facts: [['Okazaki-fragment', '≈ 150–200 nt (eukaryoten) vs ≈ 1–2 kb (bacteriën)'], ['Primer', '≈ 10 nt RNA + ≈ 20 nt DNA (Pol α)'], ['Leidende streng', 'vooral Pol ε'], ['Volgende streng', 'vooral Pol δ'], ['Proeflezen', 'verbetert de nauwkeurigheid ≈ 10–100×'], ['Basenselectie alleen', '≈ 1 fout per 10⁴ (Pol α, zonder proeflezen)']],
      why: 'De opbouw van het replisoom verklaart waarom DNA-replicatie zo snel én nauwkeurig is, en waarom lineaire chromosomen een eindreplicatieprobleem hebben (telomeren). Veel kankermutaties (bv. in POLE) en geneesmiddelen (topo-isomeraseremmers) grijpen hier aan.',
    },
    en: {
      what: 'The replisome is the protein machine at the replication fork. The CMG helicase unwinds the DNA, three DNA polymerases make the new strands, the PCNA clamp keeps them on the DNA and RPA protects the single-stranded DNA. Because polymerases can only extend 5\'→3\', one strand grows continuously and the other in pieces.',
      how: [
        "CMG (Cdc45–MCM2-7–GINS) encircles the leading-strand template and moves 3'→5' along it; ahead of the fork topoisomerases remove the positive supercoils.",
        'RPA coats the exposed single-stranded DNA of the lagging-strand template.',
        'Pol α-primase lays down a primer: ~10 nt of RNA (primase) plus ~20 nt of DNA (Pol α). DNA polymerases cannot start on their own.',
        "RFC loads the ring-shaped PCNA clamp onto the primer 3' end; Pol δ takes over (polymerase switch).",
        "Leading strand: Pol ε, bound to CMG, extends continuously 5'→3' in the direction of the fork.",
        "Lagging strand: Pol δ extends each Okazaki fragment 5'→3' (away from the fork) up to the previous fragment, where it displaces the 5' end into a flap.",
        'FEN1 cuts off the flap containing the RNA (RNase H2 can also degrade RNA); DNA ligase I seals the nick.',
        "Pol δ and Pol ε proofread with a 3'→5' exonuclease: a wrongly inserted base is removed immediately.",
      ],
      facts: [['Okazaki fragment', '≈ 150–200 nt (eukaryotes) vs ≈ 1–2 kb (bacteria)'], ['Primer', '≈ 10 nt RNA + ≈ 20 nt DNA (Pol α)'], ['Leading strand', 'mainly Pol ε'], ['Lagging strand', 'mainly Pol δ'], ['Proofreading', 'improves accuracy ≈ 10–100×'], ['Base selection alone', '≈ 1 error per 10⁴ (Pol α, no proofreading)']],
      why: 'The architecture of the replisome explains why DNA replication is both fast and accurate, and why linear chromosomes have an end-replication problem (telomeres). Many cancer mutations (e.g. in POLE) and drugs (topoisomerase inhibitors) act here.',
    },
    sources: [
      BURGERS,
      OKAZAKI,
      { t: 'Kunkel (2009) Evolving views of DNA replication (in)fidelity. Cold Spring Harb Symp Quant Biol 74:91 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3628614/' },
      ALB_REP,
      { t: 'RCSB PDB 6XTX — CryoEM structure of human CMG bound to ATPγS and DNA', url: 'https://www.rcsb.org/structure/6XTX' },
    ],
  },

  ssdna: {
    nl: {
      what: 'Enkelstrengig DNA (ssDNA) ontstaat tijdelijk bij replicatie, herstel en recombinatie. Omdat de basen niet gepaard zijn, is het chemisch en structureel kwetsbaar. Bij eukaryoten wordt het meteen bedekt door RPA (bij bacteriën door SSB).',
      how: [
        'De helicase aan de vork of een nuclease bij herstel legt enkelstrengig DNA bloot.',
        'RPA (heterotrimeer RPA70–RPA32–RPA14) bindt met zijn OB-folds; DBD-A en DBD-B in RPA70 zorgen voor de sterkste binding.',
        'Aromatische zijketens (Phe238, Phe269, Trp361, Phe386) stapelen op de basen: binding onafhankelijk van de sequentie.',
        'Het RPA-trimeer bedekt ~30 nt, voorkomt haarspelden en G-quadruplexen en beschermt tegen nucleasen.',
        'RPA-ssDNA werkt als signaal: het rekruteert ATR–ATRIP, dat de celcyclus afremt als er te veel ssDNA is (replicatiestress).',
        'RPA geeft het DNA daarna door aan de volgende speler (Pol α-primase, NER-factoren, of RAD51 bij homologe recombinatie).',
      ],
      facts: [['Cytosine-deaminatie', '≈ 140× sneller in ssDNA dan in dsDNA'], ['RPA-bindingsplaats', '≈ 30 nt (volledig trimeer)'], ['DBD-A + DBD-B', '≈ 8 nt in de kristalstructuur (PDB 1JMC)'], ['Structuur', 'PDB 1JMC, humaan RPA70 + dC8, 2,4 Å']],
      why: 'Blootliggend ssDNA is een zwakke plek: het muteert sneller, breekt makkelijker en kan afwijkende structuren vormen. RPA beschermt het en fungeert tegelijk als alarmsignaal en als platform dat de juiste enzymen doorlaat.',
    },
    en: {
      what: 'Single-stranded DNA (ssDNA) forms transiently during replication, repair and recombination. Because its bases are unpaired, it is chemically and structurally vulnerable. In eukaryotes it is coated immediately by RPA (in bacteria by SSB).',
      how: [
        'The helicase at the fork, or a nuclease during repair, exposes single-stranded DNA.',
        'RPA (heterotrimer RPA70–RPA32–RPA14) binds with its OB folds; DBD-A and DBD-B in RPA70 provide the strongest binding.',
        'Aromatic side chains (Phe238, Phe269, Trp361, Phe386) stack on the bases: sequence-independent binding.',
        'The RPA trimer covers ~30 nt, prevents hairpins and G-quadruplexes and protects against nucleases.',
        'RPA–ssDNA acts as a signal: it recruits ATR–ATRIP, which slows the cell cycle when there is too much ssDNA (replication stress).',
        'RPA then hands the DNA over to the next player (Pol α-primase, NER factors, or RAD51 in homologous recombination).',
      ],
      facts: [['Cytosine deamination', '≈ 140× faster in ssDNA than in dsDNA'], ['RPA binding site', '≈ 30 nt (full trimer)'], ['DBD-A + DBD-B', '≈ 8 nt in the crystal structure (PDB 1JMC)'], ['Structure', 'PDB 1JMC, human RPA70 + dC8, 2.4 Å']],
      why: 'Exposed ssDNA is a weak spot: it mutates faster, breaks more easily and can form aberrant structures. RPA protects it and at the same time acts as an alarm signal and as a platform that admits the right enzymes.',
    },
    sources: [
      { t: 'Bochkarev et al. (1997) Structure of the ssDNA-binding domain of RPA bound to DNA. Nature 385:176 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/8990123/' },
      { t: 'RCSB PDB 1JMC — ssDNA-binding domain of human RPA bound to ssDNA', url: 'https://www.rcsb.org/structure/1JMC' },
      { t: 'Frederico et al. (1990) Cytosine deamination rate constants in ss- and dsDNA. Biochemistry 29:2532 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/2185829/' },
      { t: 'Dueva & Iliakis (2020) Replication protein A: a multifunctional protein with roles in DNA replication, repair and beyond. NAR Cancer (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8210275/' },
    ],
  },

  telomeren: {
    nl: {
      what: 'Telomeren zijn de uiteinden van lineaire chromosomen: bij de mens duizenden basenparen TTAGGG-herhalingen, eindigend in een enkelstrengige 3\'-overhang van de G-rijke streng. Ze lossen twee problemen op: het eindreplicatieprobleem en het eindbeschermingsprobleem.',
      how: [
        "Eindreplicatieprobleem: op de volgende streng kan de laatste RNA-primer niet door DNA vervangen worden (geen 3'-OH om te verlengen); nucleasen die het uiteinde bijwerken dragen ook bij.",
        'Zonder telomerase worden telomeren daardoor bij elke deling korter; te korte telomeren zetten een DNA-schaderespons aan (senescentie).',
        "Telomerase = TERT (reverse transcriptase) + telomerase-RNA hTR (451 nt) met een matrijs 3'-CAAUCCCAAUC-5'.",
        "5 nt van de matrijs paren met het DNA-uiteinde …GTTAG-3'; TERT voegt GGTTAG toe (DNA gemaakt op een RNA-matrijs).",
        'De matrijs schuift 6 nt op (translocatie) zodat meerdere herhalingen na elkaar kunnen worden toegevoegd.',
        'CST en Pol α-primase vullen de complementaire C-rijke streng aan; er blijft een 3\'-overhang over.',
        'Shelterin (TRF1, TRF2, POT1, TIN2, TPP1, RAP1) bedekt het telomeer; met TRF2 kan de overhang een T-lus vormen, zodat het uiteinde niet als DNA-breuk wordt gezien.',
      ],
      facts: [['Herhaling', 'TTAGGG (gewervelden)'], ['Telomerase-RNA (hTR)', '451 nt; matrijsgebied 11 nt'], ['Shelterin', '6 eiwitten'], ['Telomerase actief in', 'kiemcellen, stamcellen, de meeste kankercellen'], ['Structuren', 'PDB 7BG9 (humaan telomerase); G-quadruplex: 143D, 1KF1']],
      why: 'Telomeren bepalen hoe vaak een cel kan delen en beschermen chromosoomuiteinden tegen afbraak en fusie. Kankercellen heractiveren meestal telomerase om onbeperkt te delen; defecten in telomerase of shelterin geven ziekten zoals dyskeratosis congenita.',
    },
    en: {
      what: 'Telomeres are the ends of linear chromosomes: in humans thousands of base pairs of TTAGGG repeats, ending in a single-stranded 3\' overhang of the G-rich strand. They solve two problems: the end-replication problem and the end-protection problem.',
      how: [
        "End-replication problem: on the lagging strand the last RNA primer cannot be replaced by DNA (no 3'-OH to extend); nucleases processing the end also contribute.",
        'Without telomerase, telomeres therefore get shorter with every division; telomeres that are too short trigger a DNA damage response (senescence).',
        "Telomerase = TERT (reverse transcriptase) + telomerase RNA hTR (451 nt) with a template 3'-CAAUCCCAAUC-5'.",
        "5 nt of the template pair with the DNA end …GTTAG-3'; TERT adds GGTTAG (DNA made on an RNA template).",
        'The template shifts by 6 nt (translocation) so that several repeats can be added in a row.',
        'CST and Pol α-primase fill in the complementary C-rich strand; a 3\' overhang remains.',
        'Shelterin (TRF1, TRF2, POT1, TIN2, TPP1, RAP1) coats the telomere; with TRF2 the overhang can form a t-loop, so the end is not seen as a DNA break.',
      ],
      facts: [['Repeat', 'TTAGGG (vertebrates)'], ['Telomerase RNA (hTR)', '451 nt; template region 11 nt'], ['Shelterin', '6 proteins'], ['Telomerase active in', 'germ cells, stem cells, most cancer cells'], ['Structures', 'PDB 7BG9 (human telomerase); G-quadruplex: 143D, 1KF1']],
      why: 'Telomeres determine how often a cell can divide and protect chromosome ends from degradation and fusion. Cancer cells usually reactivate telomerase to divide indefinitely; defects in telomerase or shelterin cause diseases such as dyskeratosis congenita.',
    },
    sources: [
      { t: 'de Lange (2009) How telomeres solve the end-protection problem. Science 326:948 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2819049/' },
      { t: 'Ghanim et al. (2021) Structure of human telomerase holoenzyme with bound telomeric DNA. Nature (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7610991/' },
      { t: 'Nguyen et al. (2018) Cryo-EM structure of substrate-bound human telomerase holoenzyme. Nature (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6223129/' },
      ALB_INIT,
      { t: 'RCSB PDB 7BG9 — catalytic core of human telomerase with telomeric DNA', url: 'https://www.rcsb.org/structure/7BG9' },
    ],
  },

  herstel: {
    nl: {
      what: 'DNA wordt voortdurend beschadigd door hydrolyse, oxidatie, alkylering, UV en straling, en de replicatie maakt af en toe fouten. Cellen hebben daarom verschillende herstelroutes, elk gespecialiseerd in een soort letsel. De onbeschadigde complementaire streng of de zusterchromatide dient als voorbeeld.',
      how: [
        "BER (één beschadigde base, bv. uracil of 8-oxoG): een DNA-glycosylase knipt de base weg → AP-plaats → APE1 knipt de ruggengraat → Pol β vult 1 nt in en verwijdert de suikerrest → ligase III–XRCC1 (of ligase I) sluit.",
        'NER (omvangrijke letsels die de helix vervormen, bv. UV-dimeren): XPC–RAD23B (globaal) of een vastgelopen RNA-pol II met CSB (transcriptiegekoppeld) herkent; TFIIH opent het DNA, XPA en RPA binden.',
        "NER-vervolg: XPF–ERCC1 knipt 5', XPG 3' van het letsel; een oligo van 24–32 nt verdwijnt; Pol δ/ε/κ met PCNA vult het gat en ligase sluit.",
        'MMR (replicatiefouten): MutSα (MSH2–MSH6) herkent een mismatch, MutLα (MLH1–PMS2) knipt de nieuwe streng (herkend via onderbrekingen en PCNA), EXO1 verwijdert het stuk, Pol δ en ligase I maken het opnieuw.',
        'Dubbelstrengbreuk via NHEJ: Ku70/80 bindt de uiteinden, DNA-PKcs komt erbij, uiteinden worden bijgewerkt (bv. Artemis) en XRCC4–ligase IV–XLF verbindt ze. Snel en in elke celcyclusfase, maar vaak met verlies of toevoeging van nucleotiden.',
        "Dubbelstrengbreuk via HR (S/G2): MRN–CtIP en EXO1/DNA2 knippen de 5'-uiteinden weg; RPA en daarna RAD51 (geladen door BRCA2) bedekken de 3'-staart, die de zusterchromatide binnendringt en als matrijs gebruikt: (vrijwel) foutloos herstel.",
      ],
      facts: [['Abasische plaatsen', '≈ 10 000 per menselijke cel per dag'], ['NER-excisie', 'oligo van 24–32 nt'], ['MMR', 'maakt replicatie >100× nauwkeuriger'], ['NHEJ', 'elke fase, fout-gevoelig'], ['HR', 'S/G2, zusterchromatide als matrijs, (vrijwel) foutloos'], ['Structuur', 'PDB 1JEY: Ku70/80 op DNA']],
      why: 'Zonder herstel zouden mutaties zich snel ophopen. Erfelijke defecten tonen het belang: xeroderma pigmentosum (NER), Lynch-syndroom (MMR) en BRCA1/2-mutaties (HR) verhogen de kans op kanker sterk. Veel kankertherapieën (bestraling, cisplatine, PARP-remmers) buiten juist hersteldefecten uit.',
    },
    en: {
      what: 'DNA is damaged continuously by hydrolysis, oxidation, alkylation, UV and radiation, and replication makes occasional errors. Cells therefore have several repair pathways, each specialised in one kind of lesion. The undamaged complementary strand or the sister chromatid serves as template.',
      how: [
        'BER (one damaged base, e.g. uracil or 8-oxoG): a DNA glycosylase removes the base → AP site → APE1 cuts the backbone → Pol β fills in 1 nt and removes the sugar remnant → ligase III–XRCC1 (or ligase I) seals.',
        'NER (bulky, helix-distorting lesions, e.g. UV dimers): XPC–RAD23B (global) or a stalled RNA pol II with CSB (transcription-coupled) detects them; TFIIH opens the DNA, XPA and RPA bind.',
        "NER continued: XPF–ERCC1 cuts 5' and XPG 3' of the lesion; an oligo of 24–32 nt is removed; Pol δ/ε/κ with PCNA fills the gap and ligase seals.",
        'MMR (replication errors): MutSα (MSH2–MSH6) recognises a mismatch, MutLα (MLH1–PMS2) nicks the new strand (recognised via strand discontinuities and PCNA), EXO1 removes the stretch, Pol δ and ligase I remake it.',
        'Double-strand break via NHEJ: Ku70/80 binds the ends, DNA-PKcs joins, the ends are processed (e.g. Artemis) and XRCC4–ligase IV–XLF joins them. Fast and in every cell-cycle phase, but often with loss or gain of nucleotides.',
        "Double-strand break via HR (S/G2): MRN–CtIP and EXO1/DNA2 resect the 5' ends; RPA and then RAD51 (loaded by BRCA2) coat the 3' tail, which invades the sister chromatid and uses it as a template: (essentially) error-free repair.",
      ],
      facts: [['Abasic sites', '≈ 10,000 per human cell per day'], ['NER excision', 'oligo of 24–32 nt'], ['MMR', 'makes replication >100× more accurate'], ['NHEJ', 'any phase, error-prone'], ['HR', 'S/G2, sister chromatid as template, (essentially) error-free'], ['Structure', 'PDB 1JEY: Ku70/80 on DNA']],
      why: 'Without repair, mutations would accumulate quickly. Inherited defects show its importance: xeroderma pigmentosum (NER), Lynch syndrome (MMR) and BRCA1/2 mutations (HR) greatly increase cancer risk. Many cancer therapies (radiation, cisplatin, PARP inhibitors) exploit repair defects.',
    },
    sources: [
      CHATTERJEE,
      ALB_REPAIR,
      { t: 'Reardon & Sancar (2002) Molecular anatomy of the human excision nuclease assembled at sites of DNA damage (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC133982/' },
      { t: 'Walker, Corpina & Goldberg (2001) Structure of the Ku heterodimer bound to DNA. Nature — PDB 1JEY', url: 'https://www.rcsb.org/structure/1JEY' },
    ],
  },

  mutaties: {
    nl: {
      what: 'Een mutatie is een blijvende verandering in de DNA-sequentie. Puntmutaties vervangen één base; inserties en deleties (indels) voegen basen toe of halen ze weg. Het effect op het eiwit hangt af van hoe de genetische code het veranderde codon leest.',
      how: [
        'Transitie: purine ↔ purine (A↔G) of pyrimidine ↔ pyrimidine (C↔T). Transversie: purine ↔ pyrimidine. Er zijn 4 mogelijke transities en 8 transversies.',
        'Stil: het nieuwe codon codeert voor hetzelfde aminozuur (vaak op de 3e codonpositie, door de gedegenereerde code).',
        'Missense: een ander aminozuur. Voorbeeld: HBB codon 6 GAG→GTG (Glu→Val) geeft sikkelcelhemoglobine (HbS).',
        'Nonsense: een stopcodon ontstaat. Voorbeeld: HBB codon 17 AAG→TAG (Lys→stop), een β⁰-thalassemiemutatie.',
        "Een vroeg stopcodon meer dan ~50–55 nt vóór de laatste exon-exonovergang laat het mRNA afbreken via nonsense-mediated decay (NMD).",
        'Indels die geen veelvoud van 3 zijn, verschuiven het leeskader (frameshift): alle volgende codons veranderen tot er een stopcodon opduikt (bv. HBB codons 8/9 +G).',
        'Oorzaken: replicatiefouten die aan proeflezen en MMR ontsnappen, spontane schade (bv. deaminatie van 5-methylcytosine → T in CpG) en mutagenen (UV, straling, chemicaliën).',
      ],
      facts: [['Transities : transversies', '4 : 8 mogelijke'], ['HbS', 'HBB codon 6 GAG→GTG (Glu6Val; HGVS p.Glu7Val)'], ['NMD-regel', 'stop > ~50–55 nt vóór de laatste exon-exonovergang'], ['CpG-transities', '≈ 1/3 van de ziekteveroorzakende puntmutaties in coderende sequenties'], ['Vroege stopcodons', 'nonsense ≈ 11 % van de erfelijke ziektemutaties; met frameshifts e.d. vaak geschat op ≈ 1/3 (NMD-doelwitten)']],
      why: 'Mutaties zijn de grondstof van evolutie, maar ook de oorzaak van erfelijke ziekten en kanker. Door ze te koppelen aan de genetische code en de eiwitstructuur (bv. hydrofobe Val op het oppervlak van HbS) begrijp je waarom één base een heel eiwitcomplex kan veranderen.',
    },
    en: {
      what: 'A mutation is a permanent change in the DNA sequence. Point mutations replace one base; insertions and deletions (indels) add or remove bases. The effect on the protein depends on how the genetic code reads the altered codon.',
      how: [
        'Transition: purine ↔ purine (A↔G) or pyrimidine ↔ pyrimidine (C↔T). Transversion: purine ↔ pyrimidine. There are 4 possible transitions and 8 transversions.',
        'Silent: the new codon encodes the same amino acid (often at the 3rd codon position, because the code is degenerate).',
        'Missense: a different amino acid. Example: HBB codon 6 GAG→GTG (Glu→Val) gives sickle-cell haemoglobin (HbS).',
        'Nonsense: a stop codon arises. Example: HBB codon 17 AAG→TAG (Lys→stop), a β⁰-thalassaemia mutation.',
        'A premature stop codon more than ~50–55 nt upstream of the last exon–exon junction causes the mRNA to be degraded by nonsense-mediated decay (NMD).',
        'Indels that are not a multiple of 3 shift the reading frame (frameshift): all following codons change until a stop codon appears (e.g. HBB codons 8/9 +G).',
        'Causes: replication errors that escape proofreading and MMR, spontaneous damage (e.g. deamination of 5-methylcytosine → T at CpG) and mutagens (UV, radiation, chemicals).',
      ],
      facts: [['Transitions : transversions', '4 : 8 possible'], ['HbS', 'HBB codon 6 GAG→GTG (Glu6Val; HGVS p.Glu7Val)'], ['NMD rule', 'stop > ~50–55 nt upstream of the last exon–exon junction'], ['CpG transitions', '≈ 1/3 of disease-causing point mutations in coding sequences'], ['Premature stop codons', 'nonsense ≈ 11 % of inherited-disease mutations; with frameshifts etc. often estimated at ≈ 1/3 (NMD targets)']],
      why: 'Mutations are the raw material of evolution, but also the cause of inherited disease and cancer. Linking them to the genetic code and protein structure (e.g. a hydrophobic Val on the surface of HbS) shows why one base can change a whole protein complex.',
    },
    sources: [
      CHATTERJEE,
      { t: 'Kurosaki & Maquat (2016) Nonsense-mediated mRNA decay in humans at a glance. J Cell Sci 129:461 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4760306/' },
      { t: 'Ensembl HBB-201 (ENST00000335295) — coding sequence of human β-globin', url: 'https://www.ensembl.org/Homo_sapiens/Transcript/Summary?t=ENST00000335295' },
      { t: 'HbVar / Huisman: β-thalassaemia non-deletional mutants (codon 17 A>T, codons 8/9 +G)', url: 'https://globin.bx.psu.edu/html/huisman/thals/I-a.entries.html' },
      { t: 'Cooper & Youssoufian (1988) The CpG dinucleotide and human genetic disease. Hum Genet 78:151 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/3338800/' },
      { t: 'Mort et al. (2008) A meta-analysis of nonsense mutations causing human genetic disease. Hum Mutat 29:1037 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/18454449/' },
    ],
  },
};
