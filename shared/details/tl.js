/* Uitleg per knoop voor stage 'tl' (translatie, initiatie, elongatie, terminatie, ribosoom, trna, aars, codon, ribogenese, seleno, er) — zie app/SCENES.md */
const S = {
  albertsTl: { t: 'Alberts et al., Molecular Biology of the Cell (4e): From RNA to Protein (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK26829/' },
  albertsNuc: { t: 'Alberts et al., Molecular Biology of the Cell (4e): From DNA to RNA — The Nucleolus Is a Ribosome-Producing Factory (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK26887/' },
  albertsER: { t: 'Alberts et al., Molecular Biology of the Cell (4e): The Endoplasmic Reticulum (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK26841/' },
  hinnebusch: { t: 'Hinnebusch & Lorsch (2012) The mechanism of eukaryotic translation initiation: new insights and challenges. Cold Spring Harb Perspect Biol 4:a011544 (PMC3475172)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3475172/' },
  dever: { t: 'Dever & Green (2012) The elongation, termination, and recycling phases of translation in eukaryotes. Cold Spring Harb Perspect Biol 4:a013706 (PMC3385960)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3385960/' },
  motmRibo: { t: 'PDB-101 Molecule of the Month: Ribosome', url: 'https://pdb101.rcsb.org/motm/121' },
  motmSub: { t: 'PDB-101 Molecule of the Month: Ribosomal Subunits', url: 'https://pdb101.rcsb.org/motm/10' },
  khatter: { t: 'Khatter et al. (2015) Structure of the human 80S ribosome. Nature 520:640–645 (PDB 4UG0; PubMed 25901680)', url: 'https://pubmed.ncbi.nlm.nih.gov/25901680/' },
  pdb6y0g: { t: 'RCSB PDB 6Y0G — Structure of human ribosome in classical-PRE state (cryo-EM 3.2 Å)', url: 'https://www.rcsb.org/structure/6Y0G' },
  nissen: { t: 'Ban et al. (2000) The complete atomic structure of the large ribosomal subunit at 2.4 Å resolution. Science 289:905–920 (PubMed 10937989)', url: 'https://pubmed.ncbi.nlm.nih.gov/10937989/' },
  pelletier: { t: 'Gilles et al. (2020) Targeting the human 80S ribosome in cancer: from structure to function and drug design. Int J Mol Sci 21:1829 (PMC7140421)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7140421/' },
  motmTrna: { t: 'PDB-101 Molecule of the Month: Transfer RNA', url: 'https://pdb101.rcsb.org/motm/15' },
  shi: { t: 'Shi & Moore (2000) The crystal structure of yeast phenylalanine tRNA at 1.93 Å resolution: a classic structure revisited. RNA 6:1091–1105 (PDB 1EHZ; PMC1369984)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC1369984/' },
  giege: { t: 'Giegé et al., Aminoacylation and identity of tRNAs — Madame Curie Bioscience Database (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK6236/' },
  motmAars: { t: 'PDB-101 Molecule of the Month: Aminoacyl-tRNA Synthetases', url: 'https://pdb101.rcsb.org/motm/16' },
  ibba: { t: 'Rubio Gomez & Ibba (2020) Aminoacyl-tRNA synthetases. RNA 26:910–936 (PMC7373986)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7373986/' },
  crick: { t: 'Crick (1966) Codon–anticodon pairing: the wobble hypothesis. J Mol Biol 19:548–555 (PubMed 5969078)', url: 'https://pubmed.ncbi.nlm.nih.gov/5969078/' },
  ncbiCode: { t: 'NCBI — The Genetic Codes (translatietabellen 1 en 2)', url: 'https://www.ncbi.nlm.nih.gov/Taxonomy/Utils/wprintgc.cgi' },
  henras: { t: 'Henras et al. (2015) An overview of pre-ribosomal RNA processing in eukaryotes. WIREs RNA 6:225–242 (PMC4361047)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4361047/' },
  labunskyy: { t: 'Labunskyy, Hatfield & Gladyshev (2014) Selenoproteins: molecular pathways and physiological roles. Physiol Rev 94:739–777 (PMC4101630)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4101630/' },
  pyl: { t: 'Longstaff et al. (2007) A natural genetic code expansion cassette enables transmissible biosynthesis and genetic encoding of pyrrolysine. PNAS 104:1021–1026 (PMC1783357)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC1783357/' },
  akopian: { t: 'Akopian et al. (2013) Signal recognition particle: an essential protein-targeting machine. Annu Rev Biochem 82:693–721 (PMC3805129)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3805129/' },
  uniAlb: { t: 'UniProt P02768 — Albumin (Homo sapiens): signaalpeptide 1–18, propeptide 19–24', url: 'https://www.uniprot.org/uniprotkb/P02768/entry' },
};

export default {
  translatie: {
    nl: {
      what: 'Translatie is het vertalen van de nucleotidevolgorde van een mRNA in de aminozuurvolgorde van een eiwit. Ribosomen lezen het mRNA 5\'→3\' per codon (3 nucleotiden); tRNA\'s brengen de bijpassende aminozuren aan, die tot een keten worden gekoppeld van N- naar C-terminus.',
      how: [
        'Initiatie: de kleine subeenheid (40S) met het initiator-tRNA (Met-tRNAi) wordt via eIF4F naar de 5\'-cap gebracht en scant naar het startcodon AUG; daarna koppelt de grote subeenheid (60S) → 80S.',
        'Aanlevering: eEF1A·GTP brengt een geladen tRNA naar de A-plaats.',
        'Decodering: alleen een anticodon dat past bij het codon blijft zitten; het rRNA van de kleine subeenheid controleert de paring.',
        'Peptidebinding: in het peptidyltransferasecentrum (rRNA van de 60S) wordt de keten overgedragen op het aminozuur in de A-plaats.',
        'Translocatie: eEF2·GTP schuift het ribosoom één codon op (A → P, P → E); het lege tRNA verlaat de E-plaats.',
        'Terminatie: bij UAA, UAG of UGA knipt eRF1 (met eRF3) de keten los; ABCE1 splitst het ribosoom voor hergebruik.',
      ],
      facts: [['Snelheid (eukaryoot)', '≈ 5–6 aminozuren per seconde'], ['Leesrichting', "mRNA 5'→3', eiwit N→C"], ['tRNA-plaatsen', 'A (aminoacyl), P (peptidyl), E (exit)'], ['Energie', 'GTP-hydrolyse door eEF1A en eEF2 per verlenging, plus 2 fosfaatbindingen van ATP bij het laden van elk tRNA'], ['Polysoom', 'meerdere ribosomen tegelijk op één mRNA']],
      why: 'Hier wordt genetische informatie eindelijk functie: de volgorde van aminozuren bepaalt hoe het eiwit vouwt (primaire → tertiaire structuur). Veel antibiotica werken door het bacteriële ribosoom te remmen, en mRNA-vaccins maken gebruik van precies deze machinerie.',
    },
    en: {
      what: 'Translation converts the nucleotide sequence of an mRNA into the amino-acid sequence of a protein. Ribosomes read the mRNA 5\'→3\' codon by codon (3 nucleotides); tRNAs bring the matching amino acids, which are linked into a chain from N to C terminus.',
      how: [
        'Initiation: the small subunit (40S) carrying the initiator tRNA (Met-tRNAi) is recruited via eIF4F to the 5\' cap and scans to the AUG start codon; then the large subunit (60S) joins → 80S.',
        'Delivery: eEF1A·GTP brings a charged tRNA to the A site.',
        'Decoding: only an anticodon that matches the codon stays bound; rRNA of the small subunit checks the pairing.',
        'Peptide bond: in the peptidyl transferase centre (rRNA of the 60S) the chain is transferred onto the amino acid in the A site.',
        'Translocation: eEF2·GTP moves the ribosome one codon (A → P, P → E); the empty tRNA leaves the E site.',
        'Termination: at UAA, UAG or UGA eRF1 (with eRF3) releases the chain; ABCE1 splits the ribosome for re-use.',
      ],
      facts: [['Speed (eukaryote)', '≈ 5–6 amino acids per second'], ['Direction', "mRNA 5'→3', protein N→C"], ['tRNA sites', 'A (aminoacyl), P (peptidyl), E (exit)'], ['Energy', 'GTP hydrolysis by eEF1A and eEF2 per elongation cycle, plus 2 phosphoanhydride bonds of ATP to charge each tRNA'], ['Polysome', 'several ribosomes at once on one mRNA']],
      why: 'This is where genetic information finally becomes function: the amino-acid order determines how the protein folds (primary → tertiary structure). Many antibiotics work by inhibiting the bacterial ribosome, and mRNA vaccines use exactly this machinery.',
    },
    sources: [S.albertsTl, S.hinnebusch, S.dever, S.motmRibo],
  },

  initiatie: {
    nl: {
      what: 'Bij de initiatie wordt het ribosoom op het juiste startcodon gezet, zodat het leesraam vastligt. Eukaryoten gebruiken daarvoor de 5\'-cap en scannen; bacteriën gebruiken de Shine–Dalgarno-sequentie.',
      how: [
        'eIF2·GTP bindt Met-tRNAi (ternair complex).',
        'Samen met eIF1, eIF1A, eIF3 en eIF5 op de 40S-subeenheid vormt dit het 43S-preinitiatiecomplex.',
        'eIF4F (eIF4E bindt de cap, eIF4A is een helicase, eIF4G is het steigereiwit) brengt het mRNA naar het 43S → 48S-complex.',
        'Het 48S-complex scant 5\'→3\' door de 5\'-UTR tot het anticodon van Met-tRNAi met een AUG paart, liefst in Kozak-context (GCCACC-AUG-G).',
        'Bij herkenning hydrolyseert eIF2 GTP en komt eIF1 vrij; eIF2·GDP en andere factoren verlaten het complex.',
        'eIF5B·GTP helpt de 60S koppelen → 80S met Met-tRNAi in de P-plaats; de elongatie kan starten.',
      ],
      facts: [['Startcodon', 'AUG (Met); bij bacteriën formyl-Met'], ['Kozak-consensus', 'GCC(A/G)CC-AUG-G'], ['Cap', 'm⁷G, gebonden door eIF4E'], ['Bacteriën', 'Shine–Dalgarno paart met het 3\'-uiteinde van 16S rRNA; IF1, IF2, IF3']],
      why: 'De initiatie is de belangrijkste regelstap van de translatie (bv. via fosforylering van eIF2 bij stress). Een fout startcodon zou een volledig verkeerd eiwit opleveren.',
    },
    en: {
      what: 'Initiation places the ribosome on the correct start codon so that the reading frame is fixed. Eukaryotes use the 5\' cap and scanning; bacteria use the Shine–Dalgarno sequence.',
      how: [
        'eIF2·GTP binds Met-tRNAi (ternary complex).',
        'Together with eIF1, eIF1A, eIF3 and eIF5 on the 40S subunit this forms the 43S pre-initiation complex.',
        'eIF4F (eIF4E binds the cap, eIF4A is a helicase, eIF4G is the scaffold) brings the mRNA to the 43S → 48S complex.',
        'The 48S complex scans 5\'→3\' through the 5\' UTR until the Met-tRNAi anticodon pairs with an AUG, preferably in Kozak context (GCCACC-AUG-G).',
        'Upon recognition eIF2 hydrolyses GTP and eIF1 is released; eIF2·GDP and other factors leave.',
        'eIF5B·GTP helps the 60S join → 80S with Met-tRNAi in the P site; elongation can begin.',
      ],
      facts: [['Start codon', 'AUG (Met); formyl-Met in bacteria'], ['Kozak consensus', 'GCC(A/G)CC-AUG-G'], ['Cap', 'm⁷G, bound by eIF4E'], ['Bacteria', 'Shine–Dalgarno pairs with the 3\' end of 16S rRNA; IF1, IF2, IF3']],
      why: 'Initiation is the main control point of translation (e.g. phosphorylation of eIF2 under stress). A wrong start codon would produce a completely wrong protein.',
    },
    sources: [S.hinnebusch, S.albertsTl, S.dever],
  },

  elongatie: {
    nl: {
      what: 'De elongatiecyclus verlengt de keten met één aminozuur per codon. Elke ronde bestaat uit aanlevering, decodering, peptidebinding en translocatie.',
      how: [
        'eEF1A·GTP (bacterie: EF-Tu) brengt een aminoacyl-tRNA naar de A-plaats.',
        'De kleine subeenheid controleert de codon–anticodonparing (decodeercentrum); bij een juiste paring hydrolyseert eEF1A GTP en laat het tRNA los.',
        'Het peptidyltransferasecentrum (rRNA van de grote subeenheid) verbindt de keten met het nieuwe aminozuur.',
        'eEF2·GTP (bacterie: EF-G) verschuift mRNA en tRNA\'s één codon: het tRNA in P gaat naar E, dat in A naar P.',
        'Het lege tRNA verlaat de E-plaats; de A-plaats is vrij voor het volgende codon.',
      ],
      facts: [['Snelheid', '≈ 5–6 aa/s (eukaryoot)'], ['Foutkans', 'ordegrootte 1 per 10³–10⁴ aminozuren'], ['Factoren', 'eEF1A (EF-Tu), eEF2 (EF-G)'], ['Katalyse', 'door rRNA (ribozym), niet door eiwit']],
      why: 'De nauwkeurigheid komt uit twee controles: het laden van de tRNA\'s (aaRS) en de decodering in het ribosoom. Antibiotica als tetracycline (A-plaats) en erytromycine (uitgangstunnel) grijpen hier in bij bacteriën.',
    },
    en: {
      what: 'The elongation cycle extends the chain by one amino acid per codon. Each round consists of delivery, decoding, peptide bond formation and translocation.',
      how: [
        'eEF1A·GTP (bacteria: EF-Tu) delivers an aminoacyl-tRNA to the A site.',
        'The small subunit checks codon–anticodon pairing (decoding centre); with a correct match eEF1A hydrolyses GTP and releases the tRNA.',
        'The peptidyl transferase centre (rRNA of the large subunit) joins the chain to the new amino acid.',
        'eEF2·GTP (bacteria: EF-G) shifts mRNA and tRNAs by one codon: the P-site tRNA moves to E, the A-site tRNA to P.',
        'The empty tRNA leaves the E site; the A site is free for the next codon.',
      ],
      facts: [['Speed', '≈ 5–6 aa/s (eukaryote)'], ['Error rate', 'order of 1 per 10³–10⁴ amino acids'], ['Factors', 'eEF1A (EF-Tu), eEF2 (EF-G)'], ['Catalysis', 'by rRNA (ribozyme), not protein']],
      why: 'Accuracy comes from two checks: charging of the tRNAs (aaRS) and decoding in the ribosome. Antibiotics such as tetracycline (A site) and erythromycin (exit tunnel) act here in bacteria.',
    },
    sources: [S.dever, S.albertsTl, S.nissen],
  },

  terminatie: {
    nl: {
      what: 'Bij een stopcodon (UAA, UAG, UGA) is er geen passend tRNA. Een release factor bindt de A-plaats en laat de keten los; daarna wordt het ribosoom gerecycleerd.',
      how: [
        'eRF1 (vorm lijkt op een tRNA) herkent alle drie stopcodons in de A-plaats.',
        'eRF3·GTP helpt eRF1 correct plaatsen en hydrolyseert GTP.',
        'Het GGQ-motief van eRF1 reikt tot in het peptidyltransferasecentrum: water hydrolyseert de binding tussen keten en P-tRNA.',
        'Het vrije eiwit verlaat de uitgangstunnel en vouwt verder.',
        'ABCE1 splitst het 80S-ribosoom in 40S en 60S, die opnieuw kunnen starten.',
      ],
      facts: [['Stopcodons', 'UAA, UAG, UGA'], ['Eukaryoot', 'eRF1 + eRF3, recycling door ABCE1'], ['Bacterie', 'RF1 (UAA/UAG), RF2 (UAA/UGA), RF3; recycling door RRF + EF-G']],
      why: 'Een vroegtijdig stopcodon (nonsense-mutatie) levert een ingekort eiwit op en activeert vaak nonsense-mediated decay. Hercodering van UGA/UAG geeft selenocysteïne en pyrrolysine.',
    },
    en: {
      what: 'At a stop codon (UAA, UAG, UGA) no matching tRNA exists. A release factor binds the A site and releases the chain; then the ribosome is recycled.',
      how: [
        'eRF1 (shaped like a tRNA) recognises all three stop codons in the A site.',
        'eRF3·GTP helps position eRF1 and hydrolyses GTP.',
        'The GGQ motif of eRF1 reaches into the peptidyl transferase centre: water hydrolyses the bond between chain and P-site tRNA.',
        'The free protein leaves the exit tunnel and continues folding.',
        'ABCE1 splits the 80S ribosome into 40S and 60S, which can start again.',
      ],
      facts: [['Stop codons', 'UAA, UAG, UGA'], ['Eukaryote', 'eRF1 + eRF3, recycling by ABCE1'], ['Bacteria', 'RF1 (UAA/UAG), RF2 (UAA/UGA), RF3; recycling by RRF + EF-G']],
      why: 'A premature stop codon (nonsense mutation) gives a truncated protein and often triggers nonsense-mediated decay. Recoding of UGA/UAG gives selenocysteine and pyrrolysine.',
    },
    sources: [S.dever, S.albertsTl],
  },

  ribosoom: {
    nl: {
      what: 'Het ribosoom is een groot RNA–eiwitcomplex dat eiwitten maakt. Het humane 80S-ribosoom bestaat uit een kleine (40S) en een grote (60S) subeenheid; bacteriën hebben een kleiner 70S-ribosoom (30S + 50S). Het katalytische hart is van rRNA: het ribosoom is een ribozym.',
      how: [
        'De 40S-subeenheid (18S rRNA + 33 eiwitten) bindt het mRNA en bevat het decodeercentrum.',
        'De 60S-subeenheid (28S, 5,8S en 5S rRNA + 47 eiwitten) bevat het peptidyltransferasecentrum (PTC).',
        'Tussen beide subeenheden liggen de A-, P- en E-plaats voor tRNA\'s.',
        'Het PTC bestaat uit rRNA; eiwitten zitten vooral aan het oppervlak en stabiliseren het rRNA.',
        'De nieuwe keten verlaat het ribosoom via een tunnel van ≈ 100 Å door de grote subeenheid.',
        'S-waarden (Svedberg) meten de sedimentatiesnelheid en tellen niet op: 40S + 60S = 80S, 30S + 50S = 70S.',
      ],
      facts: [['Humaan 80S', '≈ 4 MDa, ≈ 80 eiwitten, 4 rRNA\'s'], ['rRNA-lengtes (mens)', '18S ≈ 1870 · 28S ≈ 5070 · 5,8S ≈ 157 · 5S ≈ 121 nt'], ['Bacterieel 70S', '≈ 2,5 MDa; 16S (≈ 1500 nt), 23S (≈ 2900 nt), 5S'], ['Uitgangstunnel', '≈ 100 Å lang, gemiddeld ≈ 15 Å breed'], ['3D-structuren', 'PDB 4UG0 / 6Y0G (mens), 4V6F (bacterie)']],
      why: 'Het ribosoom is het bewijs dat RNA zowel informatie kan dragen als katalyseren (RNA-wereldhypothese). Door de verschillen tussen 70S en 80S kunnen antibiotica selectief bacteriën remmen; 16S rRNA wordt gebruikt om bacteriën te identificeren (metagenomics).',
    },
    en: {
      what: 'The ribosome is a large RNA–protein complex that makes proteins. The human 80S ribosome consists of a small (40S) and a large (60S) subunit; bacteria have a smaller 70S ribosome (30S + 50S). Its catalytic heart is made of rRNA: the ribosome is a ribozyme.',
      how: [
        'The 40S subunit (18S rRNA + 33 proteins) binds the mRNA and contains the decoding centre.',
        'The 60S subunit (28S, 5.8S and 5S rRNA + 47 proteins) contains the peptidyl transferase centre (PTC).',
        'The A, P and E sites for tRNAs lie between the two subunits.',
        'The PTC is made of rRNA; proteins sit mainly on the surface and stabilise the rRNA.',
        'The new chain leaves through a ≈ 100 Å tunnel in the large subunit.',
        'S values (Svedberg) measure sedimentation rate and are not additive: 40S + 60S = 80S, 30S + 50S = 70S.',
      ],
      facts: [['Human 80S', '≈ 4 MDa, ≈ 80 proteins, 4 rRNAs'], ['rRNA lengths (human)', '18S ≈ 1870 · 28S ≈ 5070 · 5.8S ≈ 157 · 5S ≈ 121 nt'], ['Bacterial 70S', '≈ 2.5 MDa; 16S (≈ 1500 nt), 23S (≈ 2900 nt), 5S'], ['Exit tunnel', '≈ 100 Å long, on average ≈ 15 Å wide'], ['3D structures', 'PDB 4UG0 / 6Y0G (human), 4V6F (bacterial)']],
      why: 'The ribosome proves that RNA can both carry information and catalyse (RNA-world hypothesis). The differences between 70S and 80S let antibiotics inhibit bacteria selectively; 16S rRNA is used to identify bacteria (metagenomics).',
    },
    sources: [S.khatter, S.pelletier, S.nissen, S.motmRibo, S.pdb6y0g],
  },

  trna: {
    nl: {
      what: 'Transfer-RNA is de adapter tussen codon en aminozuur: ≈ 76 nucleotiden, met aan het ene uiteinde het anticodon en aan het andere het 3\'-CCA waaraan het aminozuur hangt. In 2D tekent men een klaverblad, in 3D is het een L-vorm.',
      how: [
        'Basenparing binnen de streng vormt vier stammen: acceptorstam, D-arm, anticodonarm en TΨC-arm (plus een variabele lus).',
        'Het 3\'-uiteinde eindigt altijd op CCA; het aminozuur wordt via een ester op de ribose van A76 gezet.',
        'Het anticodon (posities 34–36) paart antiparallel met het codon; positie 34 is de wobble-positie.',
        'Acceptorstam + TΨC-arm stapelen tot één helix, D-arm + anticodonarm tot een tweede: samen een L.',
        'In de elleboog houden D- en T-lus elkaar vast met tertiaire contacten (o.a. G18–Ψ55, G19–C56).',
        'Gemodificeerde basen (D, Ψ, T, m⁷G, wybutosine, …) stabiliseren de vouwing en verfijnen de decodering.',
      ],
      facts: [['Lengte', '≈ 76 nt (70–90)'], ['Anticodon ↔ CCA', '≈ 75 Å (1EHZ: ≈ 72 Å tussen C4\' van 35 en 76)'], ['Eerste RNA-structuur', 'gist-tRNA-Phe (1974); PDB 1EHZ op 1,93 Å'], ['Modificaties tRNA-Phe (gist)', 'o.a. m²G10, D16/17, m²₂G26, Cm32, Gm34, yW37, Ψ39, m⁷G46, T54, Ψ55, m¹A58']],
      why: 'De L-vorm legt precies de afstand tussen het decodeercentrum (40S) en het peptidyltransferasecentrum (60S) af. tRNA was ook de eerste grote RNA-structuur die liet zien dat RNA complexe 3D-vormen aanneemt.',
    },
    en: {
      what: 'Transfer RNA is the adapter between codon and amino acid: ≈ 76 nucleotides, with the anticodon at one end and the 3\'-CCA carrying the amino acid at the other. In 2D it is drawn as a cloverleaf, in 3D it is an L shape.',
      how: [
        'Base pairing within the strand forms four stems: acceptor stem, D arm, anticodon arm and TΨC arm (plus a variable loop).',
        'The 3\' end always ends in CCA; the amino acid is attached by an ester to the ribose of A76.',
        'The anticodon (positions 34–36) pairs antiparallel with the codon; position 34 is the wobble position.',
        'Acceptor stem + TΨC arm stack into one helix, D arm + anticodon arm into a second: together an L.',
        'In the elbow the D and T loops hold each other through tertiary contacts (e.g. G18–Ψ55, G19–C56).',
        'Modified bases (D, Ψ, T, m⁷G, wybutosine, …) stabilise the fold and fine-tune decoding.',
      ],
      facts: [['Length', '≈ 76 nt (70–90)'], ['Anticodon ↔ CCA', '≈ 75 Å (1EHZ: ≈ 72 Å between C4\' of 35 and 76)'], ['First RNA structure', 'yeast tRNA-Phe (1974); PDB 1EHZ at 1.93 Å'], ['Modifications of yeast tRNA-Phe', 'e.g. m²G10, D16/17, m²₂G26, Cm32, Gm34, yW37, Ψ39, m⁷G46, T54, Ψ55, m¹A58']],
      why: 'The L shape spans exactly the distance between the decoding centre (40S) and the peptidyl transferase centre (60S). tRNA was also the first large RNA structure showing that RNA adopts complex 3D shapes.',
    },
    sources: [S.shi, S.motmTrna, S.giege, S.albertsTl],
  },

  aars: {
    nl: {
      what: 'Aminoacyl-tRNA-synthetasen (aaRS) koppelen elk aminozuur aan de juiste tRNA\'s. Zij "vertalen" eigenlijk de genetische code: het ribosoom controleert daarna alleen nog codon–anticodon, niet het aminozuur.',
      how: [
        'Activering: aminozuur + ATP → aminoacyl-AMP (aminoacyl-adenylaat) + PPi.',
        'Het tRNA bindt; identiteitselementen (vooral anticodon en acceptorstam, bv. base 73) bepalen welk tRNA past — de "tweede genetische code".',
        'Overdracht: de aminoacylgroep gaat naar de 2\'-OH (meestal klasse I) of 3\'-OH (meestal klasse II) van A76; AMP komt vrij.',
        'Proeflezen: een fout aminozuur (bv. Val in IleRS) wordt in een aparte editeerplaats gehydrolyseerd ("dubbele zeef").',
        'Het aminoacyl-tRNA wordt door eEF1A·GTP naar het ribosoom gebracht.',
      ],
      facts: [['Reactie', 'aa + ATP + tRNA → aa-tRNA + AMP + PPi'], ['Klasse I', 'Rossmann-vouwing, motieven HIGH/KMSKS (bv. IleRS, ValRS, LeuRS, MetRS, TyrRS)'], ['Klasse II', 'antiparallel β-blad, motieven 1–3 (bv. SerRS, ThrRS, AlaRS, HisRS, PheRS)'], ['Voorbeeld identiteit', 'tRNA-Ala: G3·U70-wobblepaar in de acceptorstam'], ['Chapeville (1962)', 'chemisch omgezet Cys-tRNA-Cys → Ala-tRNA-Cys: Ala wordt ingebouwd op Cys-codons']],
      why: 'Fouten van aaRS worden niet meer door het ribosoom opgevangen, daarom is proeflezen cruciaal. Mutaties in (mitochondriale) aaRS veroorzaken neurologische ziekten; aaRS van bacteriën zijn doelwit van antibiotica (bv. mupirocine op IleRS).',
    },
    en: {
      what: 'Aminoacyl-tRNA synthetases (aaRS) attach each amino acid to the correct tRNAs. They actually "translate" the genetic code: the ribosome afterwards checks only codon–anticodon, not the amino acid.',
      how: [
        'Activation: amino acid + ATP → aminoacyl-AMP (aminoacyl adenylate) + PPi.',
        'The tRNA binds; identity elements (mainly anticodon and acceptor stem, e.g. base 73) determine which tRNA fits — the "second genetic code".',
        'Transfer: the aminoacyl group moves to the 2\'-OH (mostly class I) or 3\'-OH (mostly class II) of A76; AMP is released.',
        'Proofreading: a wrong amino acid (e.g. Val in IleRS) is hydrolysed in a separate editing site ("double sieve").',
        'The aminoacyl-tRNA is delivered to the ribosome by eEF1A·GTP.',
      ],
      facts: [['Reaction', 'aa + ATP + tRNA → aa-tRNA + AMP + PPi'], ['Class I', 'Rossmann fold, HIGH/KMSKS motifs (e.g. IleRS, ValRS, LeuRS, MetRS, TyrRS)'], ['Class II', 'antiparallel β-sheet, motifs 1–3 (e.g. SerRS, ThrRS, AlaRS, HisRS, PheRS)'], ['Identity example', 'tRNA-Ala: G3·U70 wobble pair in the acceptor stem'], ['Chapeville (1962)', 'chemically converted Cys-tRNA-Cys → Ala-tRNA-Cys: Ala is inserted at Cys codons']],
      why: 'Errors made by aaRS are no longer caught by the ribosome, so proofreading is crucial. Mutations in (mitochondrial) aaRS cause neurological diseases; bacterial aaRS are antibiotic targets (e.g. mupirocin on IleRS).',
    },
    sources: [S.ibba, S.giege, S.motmAars, S.albertsTl],
  },

  codon: {
    nl: {
      what: 'De genetische code koppelt elk triplet van nucleotiden (codon) aan een aminozuur of een stopsignaal. Met 4 basen zijn er 4³ = 64 codons: 61 coderen voor de 20 aminozuren, 3 zijn stopcodons.',
      how: [
        'Het mRNA wordt 5\'→3\' in niet-overlappende tripletten gelezen, zonder scheidingstekens.',
        'AUG codeert voor Met en is het startcodon; het legt het leesraam vast.',
        'UAA, UAG en UGA zijn stopcodons; ze worden herkend door release factors, niet door tRNA\'s.',
        'De code is gedegenereerd: de meeste aminozuren hebben 2–6 codons, die vooral op de 3e positie verschillen.',
        'Wobble: base 34 van het anticodon paart losser met de 3e codonbase (G·U; inosine paart met U, C of A), zodat één tRNA meerdere codons leest.',
        'Een insertie of deletie van 1 of 2 nt verschuift het leesraam (frameshift).',
      ],
      facts: [['Codons', '64 = 61 zinvol + 3 stop'], ['1 codon', 'Met (AUG), Trp (UGG)'], ['6 codons', 'Leu, Ser, Arg'], ['Wobble-regels (Crick)', 'G→C/U · U→A/G · I→U/C/A · C→G · A→U'], ['Afwijkingen', 'mitochondriën mens: UGA = Trp, AUA = Met; UGA = Sec, UAG = Pyl (hercodering)']],
      why: 'De code is (bijna) universeel, wat gemeenschappelijke afstamming aantoont en genetische technologie mogelijk maakt. De degeneratie buffert mutaties: veel 3e-positiemutaties zijn stil.',
    },
    en: {
      what: 'The genetic code links each nucleotide triplet (codon) to an amino acid or a stop signal. With 4 bases there are 4³ = 64 codons: 61 encode the 20 amino acids, 3 are stop codons.',
      how: [
        'The mRNA is read 5\'→3\' in non-overlapping triplets, without punctuation.',
        'AUG encodes Met and is the start codon; it sets the reading frame.',
        'UAA, UAG and UGA are stop codons; they are recognised by release factors, not by tRNAs.',
        'The code is degenerate: most amino acids have 2–6 codons, differing mainly at the 3rd position.',
        'Wobble: anticodon base 34 pairs more loosely with the 3rd codon base (G·U; inosine pairs with U, C or A), so one tRNA reads several codons.',
        'An insertion or deletion of 1 or 2 nt shifts the reading frame (frameshift).',
      ],
      facts: [['Codons', '64 = 61 sense + 3 stop'], ['1 codon', 'Met (AUG), Trp (UGG)'], ['6 codons', 'Leu, Ser, Arg'], ['Wobble rules (Crick)', 'G→C/U · U→A/G · I→U/C/A · C→G · A→U'], ['Deviations', 'human mitochondria: UGA = Trp, AUA = Met; UGA = Sec, UAG = Pyl (recoding)']],
      why: 'The code is (nearly) universal, which shows common descent and makes genetic technology possible. Degeneracy buffers mutations: many 3rd-position mutations are silent.',
    },
    sources: [S.albertsTl, S.crick, S.ncbiCode],
  },

  ribogenese: {
    nl: {
      what: 'Ribosoombiogenese is de bouw van nieuwe ribosomale subeenheden. Ze begint in de nucleolus met de transcriptie van rDNA en eindigt in het cytoplasma, waar 40S en 60S hun laatste rijping krijgen.',
      how: [
        'RNA-polymerase I schrijft de rDNA-herhalingen (op chr 13, 14, 15, 21, 22) af tot één 47S pre-rRNA met 18S, 5,8S en 28S.',
        'snoRNP\'s modificeren het pre-rRNA: C/D-box-snoRNA\'s (met fibrillarine) → 2\'-O-methylering, H/ACA-snoRNA\'s (met dyskerine) → pseudo-uridine.',
        'Het SSU-processoom (90S, met U3-snoRNA) vouwt het 18S-deel; knippen in de spacers (ETS, ITS) scheidt de routes van de kleine en de grote subeenheid.',
        'Ribosomale eiwitten worden in het cytoplasma gemaakt en de kern in gebracht; het 5S rRNA komt van Pol III en wordt als 5S-RNP (met uL5 en uL18) in de pre-60S ingebouwd.',
        'Pre-40S en pre-60S worden apart geëxporteerd door kernporiën (CRM1/XPO1; voor pre-60S o.a. adapter NMD3).',
        'In het cytoplasma knipt NOB1 het 18S-E-voorloper tot 18S en worden factoren zoals eIF6 en NMD3 verwijderd; pas dan zijn de subeenheden translatieklaar.',
      ],
      facts: [['47S pre-rRNA', '≈ 13 kb (Pol I)'], ['Modificaties', '≈ 100 2\'-O-methylaties en ≈ 100 pseudo-uridines in humaan rRNA'], ['Assemblagefactoren', 'meer dan 200'], ['5S rRNA', 'apart gen, RNA-polymerase III']],
      why: 'Een groeiende cel besteedt een groot deel van zijn transcriptie aan rRNA. Fouten in ribosoombiogenese veroorzaken "ribosomopathieën" (bv. Diamond–Blackfan-anemie), en de nucleolus is een sensor voor celstress.',
    },
    en: {
      what: 'Ribosome biogenesis is the construction of new ribosomal subunits. It starts in the nucleolus with transcription of rDNA and ends in the cytoplasm, where 40S and 60S receive their final maturation.',
      how: [
        'RNA polymerase I transcribes the rDNA repeats (on chr 13, 14, 15, 21, 22) into one 47S pre-rRNA containing 18S, 5.8S and 28S.',
        'snoRNPs modify the pre-rRNA: C/D box snoRNAs (with fibrillarin) → 2\'-O-methylation, H/ACA snoRNAs (with dyskerin) → pseudouridine.',
        'The SSU processome (90S, with U3 snoRNA) folds the 18S part; cleavage in the spacers (ETS, ITS) separates the small- and large-subunit routes.',
        'Ribosomal proteins are made in the cytoplasm and imported; the 5S rRNA comes from Pol III and is built into the pre-60S as a 5S RNP (with uL5 and uL18).',
        'Pre-40S and pre-60S are exported separately through nuclear pores (CRM1/XPO1; for pre-60S e.g. the adaptor NMD3).',
        'In the cytoplasm NOB1 trims the 18S-E precursor to 18S and factors such as eIF6 and NMD3 are removed; only then are the subunits ready for translation.',
      ],
      facts: [['47S pre-rRNA', '≈ 13 kb (Pol I)'], ['Modifications', '≈ 100 2\'-O-methylations and ≈ 100 pseudouridines in human rRNA'], ['Assembly factors', 'more than 200'], ['5S rRNA', 'separate gene, RNA polymerase III']],
      why: 'A growing cell devotes a large share of its transcription to rRNA. Defects in ribosome biogenesis cause "ribosomopathies" (e.g. Diamond–Blackfan anaemia), and the nucleolus acts as a sensor of cell stress.',
    },
    sources: [S.henras, S.albertsNuc, S.motmSub],
  },

  seleno: {
    nl: {
      what: 'Selenocysteïne (Sec, U) en pyrrolysine (Pyl, O) zijn het 21e en 22e genetisch gecodeerde aminozuur. Ze worden ingebouwd op een stopcodon dat door extra signalen een nieuwe betekenis krijgt (hercodering): UGA voor Sec, UAG voor Pyl.',
      how: [
        'Sec wordt op zijn eigen tRNA gemaakt: seryl-tRNA-synthetase laadt tRNA-Sec (anticodon UCA) met serine.',
        'PSTK fosforyleert Ser-tRNA-Sec; SepSecS vervangt de fosfaatgroep door selenium uit selenofosfaat (gemaakt door SPS2).',
        'Bij eukaryoten ligt in de 3\'-UTR een SECIS-stam-lus; die bindt SBP2.',
        'SBP2 rekruteert eEFSec·GTP met Sec-tRNA-Sec, dat bij een UGA in de A-plaats wordt afgeleverd (in plaats van terminatie).',
        'Pyl (methanogene archaea zoals Methanosarcina, enkele bacteriën) wordt uit 2 lysines gemaakt en door PylRS rechtstreeks op tRNA-Pyl (anticodon CUA) gezet.',
      ],
      facts: [['Mens', '25 selenoproteïnen (bv. glutathionperoxidasen, thioredoxinereductasen, deiodinasen)'], ['Sec vs Cys', 'Se in plaats van S; selenol is reactiever'], ['SECIS-positie', 'eukaryoten en archaea: 3\'-UTR · bacteriën: net na het UGA'], ['Pyl', 'UAG; o.a. in methylamine-methyltransferasen']],
      why: 'Selenoproteïnen zijn belangrijk voor de redoxbalans en het schildklierhormoon; seleniumtekort of mutaties in SECISBP2 of tRNA-Sec geven ziekte. Het laat zien dat de genetische code niet volledig vastligt.',
    },
    en: {
      what: 'Selenocysteine (Sec, U) and pyrrolysine (Pyl, O) are the 21st and 22nd genetically encoded amino acids. They are inserted at a stop codon that gets a new meaning through extra signals (recoding): UGA for Sec, UAG for Pyl.',
      how: [
        'Sec is made on its own tRNA: seryl-tRNA synthetase charges tRNA-Sec (anticodon UCA) with serine.',
        'PSTK phosphorylates Ser-tRNA-Sec; SepSecS replaces the phosphate with selenium from selenophosphate (made by SPS2).',
        'In eukaryotes a SECIS stem-loop lies in the 3\' UTR; it binds SBP2.',
        'SBP2 recruits eEFSec·GTP carrying Sec-tRNA-Sec, which is delivered at a UGA in the A site (instead of termination).',
        'Pyl (methanogenic archaea such as Methanosarcina, a few bacteria) is made from 2 lysines and loaded directly onto tRNA-Pyl (anticodon CUA) by PylRS.',
      ],
      facts: [['Human', '25 selenoproteins (e.g. glutathione peroxidases, thioredoxin reductases, deiodinases)'], ['Sec vs Cys', 'Se instead of S; the selenol is more reactive'], ['SECIS position', 'eukaryotes and archaea: 3\' UTR · bacteria: just after the UGA'], ['Pyl', 'UAG; e.g. in methylamine methyltransferases']],
      why: 'Selenoproteins are important for redox balance and thyroid hormone; selenium deficiency or mutations in SECISBP2 or tRNA-Sec cause disease. It shows that the genetic code is not completely fixed.',
    },
    sources: [S.labunskyy, S.pyl, S.albertsTl],
  },

  er: {
    nl: {
      what: 'Eiwitten voor secretie, het plasmamembraan, lysosomen of het ER zelf worden al tijdens de translatie naar het ruw ER gebracht. Een N-terminaal signaalpeptide wordt herkend door het signal recognition particle (SRP), dat het ribosoom naar het Sec61-translocon leidt.',
      how: [
        'Het signaalpeptide (≈ 15–30 aa: positief n-gebied, hydrofobe kern, polaire knipplaats) komt uit de uitgangstunnel.',
        'SRP (7SL-RNA + 6 eiwitten) bindt met SRP54 de hydrofobe kern; het Alu-domein vertraagt de elongatie.',
        'Het complex dokt aan de SRP-receptor (SRα/SRβ) op het ER; SRP54 en SRα binden GTP.',
        'Na GTP-hydrolyse laat SRP los en zet het ribosoom zijn tunnel op het Sec61-kanaal (α, β, γ).',
        'De keten schuift co-translationeel door Sec61 het ER-lumen in; signaalpeptidase knipt het signaalpeptide af.',
        'OST zet op N-X-S/T een Glc₃Man₉GlcNAc₂-suikerboom (N-glycosylering); membraaneiwitten verlaten Sec61 zijdelings via de laterale poort (stop-transfer, signaalanker).',
      ],
      facts: [['Voorbeeld', 'prepro-albumine: signaal MKWVTFISLLFLFSSAYS (1–18), propeptide RGVFRR'], ['SRP', '7SL-RNA (≈ 300 nt) + SRP9/14/19/54/68/72'], ['Translocon', 'Sec61αβγ (bacterie: SecYEG)'], ['N-glycosylering', 'OST, sequon N-X-S/T (X ≠ Pro)']],
      why: 'Ongeveer een derde van de menselijke eiwitten gaat via het ER (secretie- en membraaneiwitten). Het ER is ook de plaats van vouwing met chaperones, disulfidebruggen en kwaliteitscontrole voordat eiwitten naar het Golgi gaan.',
    },
    en: {
      what: 'Proteins destined for secretion, the plasma membrane, lysosomes or the ER itself are brought to the rough ER while they are still being translated. An N-terminal signal peptide is recognised by the signal recognition particle (SRP), which guides the ribosome to the Sec61 translocon.',
      how: [
        'The signal peptide (≈ 15–30 aa: positive n-region, hydrophobic core, polar cleavage region) emerges from the exit tunnel.',
        'SRP (7SL RNA + 6 proteins) binds the hydrophobic core with SRP54; its Alu domain slows elongation.',
        'The complex docks on the SRP receptor (SRα/SRβ) on the ER; SRP54 and SRα bind GTP.',
        'After GTP hydrolysis SRP lets go and the ribosome places its tunnel on the Sec61 channel (α, β, γ).',
        'The chain threads co-translationally through Sec61 into the ER lumen; signal peptidase cleaves off the signal peptide.',
        'OST transfers a Glc₃Man₉GlcNAc₂ sugar tree onto N-X-S/T (N-glycosylation); membrane proteins leave Sec61 sideways via the lateral gate (stop-transfer, signal anchor).',
      ],
      facts: [['Example', 'prepro-albumin: signal MKWVTFISLLFLFSSAYS (1–18), propeptide RGVFRR'], ['SRP', '7SL RNA (≈ 300 nt) + SRP9/14/19/54/68/72'], ['Translocon', 'Sec61αβγ (bacteria: SecYEG)'], ['N-glycosylation', 'OST, sequon N-X-S/T (X ≠ Pro)']],
      why: 'Roughly a third of human proteins go through the ER (secreted and membrane proteins). The ER is also where folding with chaperones, disulfide bond formation and quality control happen before proteins move on to the Golgi.',
    },
    sources: [S.akopian, S.albertsER, S.uniAlb],
  },
};
