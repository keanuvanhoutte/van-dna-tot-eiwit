/* Uitleg per knoop voor stage 'prot' (deel A: vouwing, primair, aminozuren, peptide, secundair, ramachandran, tertiair, quaternair) — zie app/SCENES.md */
const ALBERTS = { t: 'Alberts et al., Molecular Biology of the Cell (4e), "The Shape and Structure of Proteins" (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK26830/' };
const AA_PANEL = { t: 'Alberts et al., Panel 3-1: The 20 amino acids found in proteins (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK26830/box/A393/' };
const SP_PRIM = { t: 'StatPearls: Biochemistry, Primary Protein Structure (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK564343/' };
const SP_SEC = { t: 'StatPearls: Biochemistry, Secondary Protein Structure (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK470235/' };
const SP_TER = { t: 'StatPearls: Biochemistry, Tertiary Protein Structure (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK470269/' };
const MOTM = { t: 'RCSB PDB-101, Molecule of the Month: Hemoglobin', url: 'https://pdb101.rcsb.org/motm/41' };
const PDB1BBB = { t: 'RCSB PDB 1BBB — A third quaternary structure of human hemoglobin A at 1.7 Å (Silva, Rogers & Arnone, 1992)', url: 'https://www.rcsb.org/structure/1BBB' };
const PDB1UBQ = { t: 'RCSB PDB 1UBQ — Structure of ubiquitin refined at 1.8 Å (Vijay-Kumar et al., 1987)', url: 'https://www.rcsb.org/structure/1UBQ' };
const UNIPROT = { t: 'UniProt P68871 — Hemoglobin subunit beta (HBB_HUMAN)', url: 'https://www.uniprot.org/uniprotkb/P68871/entry' };
const ANFINSEN = { t: 'Anfinsen CB (1973) Principles that govern the folding of protein chains. Science 181:223–230 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/4124164/' };
const DILL = { t: 'Dill KA & Chan HS (1997) From Levinthal to pathways to funnels. Nat Struct Biol 4:10–19 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/8989315/' };
const HARTL = { t: 'Hartl FU, Bracher A & Hayer-Hartl M (2011) Molecular chaperones in protein folding and proteostasis. Nature 475:324–332 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/21776078/' };
const RAMA = { t: 'Ramachandran GN, Ramakrishnan C & Sasisekharan V (1963) Stereochemistry of polypeptide chain configurations. J Mol Biol 7:95–99 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/13990617/' };
const LOVELL = { t: 'Lovell SC et al. (2003) Structure validation by Cα geometry: φ,ψ and Cβ deviation. Proteins 50:437–450 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/12557186/' };
const PAULING = { t: 'Pauling L, Corey RB & Branson HR (1951) The structure of proteins: two hydrogen-bonded helical configurations of the polypeptide chain. PNAS 37:205–211 (PMC)', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1063337/' };
/* ronde 13: gelezen bronnen (abstract of volledige tekst) */
const ANF_NOBEL = { t: 'Anfinsen CB (1972) Studies on the principles that govern the folding of protein chains — Nobellezing (NobelPrize.org, pdf)', url: 'https://www.nobelprize.org/uploads/2018/06/anfinsen-lecture.pdf' };
const NOBEL72 = { t: 'NobelPrize.org — The Nobel Prize in Chemistry 1972 (Anfinsen, Moore, Stein)', url: 'https://www.nobelprize.org/prizes/chemistry/1972/summary/' };
const ZWANZIG = { t: 'Zwanzig R, Szabo A & Bagchi B (1992) Levinthal\'s paradox. PNAS 89:20–22 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/1729690/' };
const KUBELKA = { t: 'Kubelka J, Hofrichter J & Eaton WA (2004) The protein folding \'speed limit\'. Curr Opin Struct Biol 14:76–88 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/15102453/' };
const WAUDBY = { t: 'Waudby CA, Dobson CM & Christodoulou J (2019) Nature and regulation of protein folding on the ribosome. Trends Biochem Sci 44:914–926 (PMC7471843)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7471843/' };
const CAMILLONI = { t: 'Camilloni C et al. (2016) Towards a structural biology of the hydrophobic effect in protein folding. Sci Rep 6:28285 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/27461719/' };
const OHGUSHI = { t: 'Ohgushi M & Wada A (1983) \'Molten-globule state\': a compact form of globular proteins with mobile side-chains. FEBS Lett 164:21–24 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/6317443/' };
const MAYER = { t: 'Mayer MP & Bukau B (2005) Hsp70 chaperones: cellular functions and molecular mechanism. Cell Mol Life Sci 62:670–684 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/15770419/' };
const GESTAUT = { t: 'Gestaut D et al. (2019) The ATP-powered gymnastics of TRiC/CCT. Curr Opin Struct Biol 55:50–58 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/30978594/' };
const LAUDILL = { t: 'Lau KF & Dill KA (1989) A lattice statistical mechanics model of the conformational and sequence spaces of proteins. Macromolecules 22:3986–3997 (doi)', url: 'https://doi.org/10.1021/ma00200a030' };
const NOBEL58 = { t: 'NobelPrize.org — Frederick Sanger, Facts (Nobelprijs Scheikunde 1958, insuline)', url: 'https://www.nobelprize.org/prizes/chemistry/1958/sanger/facts/' };
const IUPAC = { t: 'IUPAC-IUB JCBN — Nomenclature and symbolism for amino acids and peptides, 3AA-1 (namen en codes)', url: 'https://iupac.qmul.ac.uk/AminoAcid/AA1n2.html' };
const GRIMSLEY = { t: 'Grimsley GR, Scholtz JM & Pace CN (2009) A summary of the measured pK values of the ionizable groups in folded proteins. Protein Sci 18:247–251 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/19177368/' };
const LABUNSKYY = { t: 'Labunskyy VM, Hatfield DL & Gladyshev VN (2014) Selenoproteins: molecular pathways and physiological roles. Physiol Rev 94:739–777 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/24987004/' };
const LONGSTAFF = { t: 'Longstaff DG et al. (2007) A natural genetic code expansion cassette enables transmissible biosynthesis and genetic encoding of pyrrolysine. PNAS 104:1021–1026 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/17204561/' };
const AMBROGELLY = { t: 'Ambrogelly A, Palioura S & Söll D (2007) Natural expansion of the genetic code. Nat Chem Biol 3:29–35 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/17173027/' };
const FEIGE = { t: 'Feige MJ & Hendershot LM (2011) Disulfide bonds in ER protein folding and homeostasis. Curr Opin Cell Biol 23:167–175 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/21144725/' };
const STEWART = { t: 'Stewart DE, Sarkar A & Wampler JE (1990) Occurrence and role of cis peptide bonds in protein structures. J Mol Biol 214:253–260 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/2370664/' };
const INGOLIA = { t: 'Ingolia NT, Lareau LF & Weissman JS (2011) Ribosome profiling of mouse embryonic stem cells reveals the complexity and dynamics of mammalian proteomes. Cell 147:789–802 (PMC3225288)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3225288/' };
const TRINIDAD = { t: 'Trinidad-Calderón PA et al. (2021) Natural peptides inducing cancer cell death. Molecules 26:7453 — "peptides … consisting of 2–50 amino acids" (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/34946535/' };
const HOLLINGSWORTH = { t: 'Hollingsworth SA & Karplus PA (2010) A fresh look at the Ramachandran plot and the occurrence of standard structures in proteins. Biomol Concepts 1:271–283 (PMC3061398)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3061398/' };
const COOLEY = { t: 'Cooley RB, Arp DJ & Karplus PA (2010) π-helices as cryptic but widespread insertional variations of α-helices. J Mol Biol 404:232–246 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/20888342/' };
const RICHARDSON = { t: 'Richardson JS, Getzoff ED & Richardson DC (1978) The β bulge: a common small unit of nonrepetitive protein structure. PNAS 75:2574–2578 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/275827/' };
const LESZ = { t: 'Leszczynski JF & Rose GD (1986) Loops in globular proteins: a novel category of secondary structure. Science 234:849–855 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/3775366/' };
const CHEN = { t: 'Chen VB et al. (2010) MolProbity: all-atom structure validation for macromolecular crystallography. Acta Cryst D 66:12–21 (PMC2803126)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2803126/' };
const KENDREW = { t: 'Kendrew JC et al. (1958) A three-dimensional model of the myoglobin molecule obtained by x-ray analysis. Nature 181:662–666 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/13517261/' };
const PERUTZ = { t: 'Perutz MF et al. (1960) Structure of haemoglobin: a three-dimensional Fourier synthesis at 5.5 Å resolution. Nature 185:416–422 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/18990801/' };
const NOBEL62 = { t: 'NobelPrize.org — The Nobel Prize in Chemistry 1962 (Perutz & Kendrew)', url: 'https://www.nobelprize.org/prizes/chemistry/1962/summary/' };
const SILVA = { t: 'Silva MM, Rogers PH & Arnone A (1992) A third quaternary structure of human hemoglobin A at 1.7-Å resolution. J Biol Chem 267:17248–17256 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/1512262/' };
const KRISHNA = { t: 'Krishna SS, Majumdar I & Grishin NV (2003) Structural classification of zinc fingers. Nucleic Acids Res 31:532–550 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/12527760/' };
const ZHANG = { t: 'Zhang Z et al. (2018) Contributions of substitutions and indels to the structural variations in ancient protein superfamilies — SCOP-klassen all-α, all-β, α/β, α+β (PMC6201574)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6201574/' };
const HANUKOGLU = { t: 'Hanukoglu I (2015) Proteopedia: Rossmann fold: a beta-alpha-beta fold at dinucleotide binding sites. Biochem Mol Biol Educ 43:206–209 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/25704928/' };
const BROWN = { t: 'Brown C & Bowling M (2013) Methemoglobinemia in bronchoscopy — ferro- (Fe²⁺) vs ferri-ijzer (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/23857198/' };
const GURJAR = { t: 'Gurjar SA et al. (2019) Thioredoxin reduction of allosteric disulfide bonds in monoclonal antibodies — interketen-disulfidebruggen. J Biol Chem 294:19616 (PMC6926469)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6926469/' };
const UNIPROT_SEQ = { t: 'UniProt Help — Sequences: één-lettercodes volgens IUPAC; selenocysteïne = U, pyrrolysine = O', url: 'https://www.uniprot.org/help/sequences' };
const FITCH = { t: 'Fitch CA et al. (2015) Arginine: its pKa value revisited (pKa 13,8; Arg altijd geladen bij neutrale pH). Protein Sci 24:752–761 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/25808204/' };
const LIAO = { t: 'Liao SM et al. (2013) The multiple roles of histidine in protein interactions (His als aromatisch π-systeem naast Phe, Tyr, Trp). Chem Cent J 7:44 (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/23452343/' };
const JAKUBEC = { t: 'Jakubec D et al. (2018) Widespread evolutionary crosstalk among protein domains in the context of multi-domain proteins — "domains … typically can fold independently". PLoS One 13:e0203085 (PMC6118372)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6118372/' };
const AZIZ = { t: 'Aziz MF & Caetano-Anollés G (2021) Evolution of networks of protein domain organization — domeinen combineren tot multidomeineiwitten. Sci Rep 11:12075 (PMC8187734)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8187734/' };

export default {
  vouwing: {
    nl: {
      kort: 'Een pas gemaakte eiwitketen is nog een slap draadje. Meestal vouwt ze zich vanzelf tot één vaste 3D-vorm, met de waterschuwe [[aminozuren|aminozuur]] binnenin. Pas met die vorm kan het eiwit zijn werk doen.',
      what: 'Eiwitvouwing is het proces waarbij een lineaire polypeptideketen zijn unieke, functionele 3D-vorm (de natieve structuur) aanneemt. De informatie daarvoor zit in de aminozuursequentie zelf (Anfinsen). Vouwen gebeurt vaak al tijdens de translatie, terwijl de keten uit het ribosoom komt.',
      how: [
        'De keten verlaat het ribosoom via de uitgangstunnel, N-terminus eerst; het begin kan al vouwen voordat het einde gemaakt is (co-translationeel).',
        'In water willen hydrofobe zijketens niet blootliggen: de keten klapt samen rond een hydrofobe kern (hydrofobe collaps).',
        'Vaak ontstaat eerst een compacte tussenvorm waarin de zijketens nog beweeglijk zijn (molten globule).',
        'Zijketens schikken zich tot de best passende pakking: de natieve structuur met de laagste vrije energie.',
        'De vouwing volgt een energietrechter: geen blind zoeken door alle vormen, maar stapsgewijs bergaf (oplossing van de Levinthal-paradox).',
        'Chaperones (bv. Hsp70, chaperonines zoals TRiC) beschermen blootliggende hydrofobe stukken en voorkomen aggregatie.',
      ],
      facts: [['Anfinsen-experiment', 'ribonuclease A vouwt spontaan terug na ontvouwing met ureum en β-mercaptoethanol'], ['Nobelprijs Anfinsen', '1972 (Scheikunde)'], ['Snelheid', 'µs (kleine domeinen) tot s'], ['Levinthal (gedachte-experiment)', '3¹⁰⁰ ≈ 5·10⁴⁷ conformaties voor 100 residuen met 3 standen'], ['Drijvende kracht', 'hydrofoob effect']],
      why: 'Alleen een correct gevouwen eiwit werkt. Misvouwing kan leiden tot aggregatie en ziekte (bv. amyloïd). In het verhaal: de β-globineketen die uit het ribosoom komt, vouwt tot de globinevouw die in de volgende hoofdstukken (secundair → tertiair → quaternair) wordt ontleed.',
    },
    en: {
      kort: 'A freshly made protein chain is still a floppy string. It usually folds by itself into one fixed 3D shape, with the water-avoiding [[amino acids|aminozuur]] inside. Only with that shape can the protein do its job.',
      what: 'Protein folding is the process by which a linear polypeptide chain adopts its unique, functional 3D shape (the native structure). The information for this is contained in the amino acid sequence itself (Anfinsen). Folding often starts during translation, while the chain emerges from the ribosome.',
      how: [
        'The chain leaves the ribosome through the exit tunnel, N-terminus first; the beginning can fold before the end has been made (co-translational).',
        'In water, hydrophobic side chains avoid exposure: the chain collapses around a hydrophobic core (hydrophobic collapse).',
        'Often a compact intermediate forms first in which the side chains are still mobile (molten globule).',
        'Side chains settle into the best-fitting packing: the native structure with the lowest free energy.',
        'Folding follows an energy funnel: not a blind search through all shapes but a stepwise downhill path (resolution of Levinthal\'s paradox).',
        'Chaperones (e.g. Hsp70, chaperonins such as TRiC) shield exposed hydrophobic stretches and prevent aggregation.',
      ],
      facts: [['Anfinsen experiment', 'ribonuclease A refolds spontaneously after unfolding with urea and β-mercaptoethanol'], ['Anfinsen Nobel Prize', '1972 (Chemistry)'], ['Speed', 'µs (small domains) to s'], ['Levinthal (thought experiment)', '3¹⁰⁰ ≈ 5·10⁴⁷ conformations for 100 residues with 3 states'], ['Driving force', 'hydrophobic effect']],
      why: 'Only a correctly folded protein works. Misfolding can lead to aggregation and disease (e.g. amyloid). In the story: the β-globin chain leaving the ribosome folds into the globin fold that is taken apart in the next chapters (secondary → tertiary → quaternary).',
    },
    sources: [ANFINSEN, ANF_NOBEL, NOBEL72, DILL, ZWANZIG, KUBELKA, WAUDBY, CAMILLONI, OHGUSHI, HARTL, MAYER, GESTAUT, LAUDILL, { t: 'NASA WMAP — Age of the universe (13,77 miljard jaar)', url: 'https://map.gsfc.nasa.gov/universe/uni_age.html' }, ALBERTS],
  },
  primair: {
    nl: {
      kort: 'De primaire structuur is de volgorde van de [[aminozuren|aminozuur]] in de keten, van begin tot einde. Die volgorde komt rechtstreeks uit het [[mRNA|mrna]]. Ze bepaalt hoe het eiwit later vouwt.',
      what: 'De primaire structuur is de volgorde van de aminozuren in een polypeptideketen, geschreven van de N-terminus (vrije aminogroep) naar de C-terminus (vrije carboxylgroep). Ze wordt tijdens de translatie vastgelegd door de codons van het mRNA en bepaalt uiteindelijk de 3D-structuur.',
      how: [
        'Het ribosoom leest het mRNA codon per codon (5′→3′) en koppelt de aminozuren in die volgorde (N→C).',
        'Elk ingebouwd aminozuur heet een residu; ze zijn verbonden door peptidebindingen.',
        'Sequenties staan in databanken (UniProt) in FASTA-formaat: een kopregel met ">" en daarna éénlettercodes.',
        'Het patroon van hydrofobe, polaire en geladen residuen bepaalt waar helices, strengen en de kern komen.',
        'Eén mutatie kan de functie veranderen: in sikkelcelhemoglobine is Glu6 van de β-keten een Val.',
      ],
      facts: [['β-globine (mens)', '146 residuen (UniProt P68871 telt 147 met start-Met)'], ['Sikkelcel', 'GAG → GTG, Glu6Val in β-globine'], ['Leesrichting', 'N-terminus → C-terminus']],
      why: 'Sanger bepaalde de volledige aminozuurvolgorde van insuline (Nobelprijs 1958). Omdat de sequentie de structuur bepaalt, is ze het startpunt van elke structuuranalyse en -voorspelling.',
    },
    en: {
      kort: 'The primary structure is the order of the [[amino acids|aminozuur]] in the chain, from start to end. That order comes straight from the [[mRNA|mrna]]. It determines how the protein will fold later.',
      what: 'The primary structure is the order of the amino acids in a polypeptide chain, written from the N-terminus (free amino group) to the C-terminus (free carboxyl group). It is fixed during translation by the codons of the mRNA and ultimately determines the 3D structure.',
      how: [
        'The ribosome reads the mRNA codon by codon (5′→3′) and links the amino acids in that order (N→C).',
        'Each incorporated amino acid is called a residue; residues are joined by peptide bonds.',
        'Sequences are stored in databases (UniProt) in FASTA format: a header line starting with ">" followed by one-letter codes.',
        'The pattern of hydrophobic, polar and charged residues determines where helices, strands and the core end up.',
        'A single mutation can change function: in sickle-cell haemoglobin Glu6 of the β chain is a Val.',
      ],
      facts: [['β-globin (human)', '146 residues (UniProt P68871 counts 147 with start Met)'], ['Sickle cell', 'GAG → GTG, Glu6Val in β-globin'], ['Reading direction', 'N-terminus → C-terminus']],
      why: 'Sanger determined the complete amino acid sequence of insulin (Nobel Prize 1958). Because the sequence determines the structure, it is the starting point of every structure analysis and prediction.',
    },
    sources: [SP_PRIM, UNIPROT, TRINIDAD, { t: 'NCBI RefSeq NM_000518.5 — HBB-mRNA (coderende sequentie)', url: 'https://www.ncbi.nlm.nih.gov/nuccore/NM_000518.5' }, MOTM, WAUDBY, NOBEL58, ANF_NOBEL, ALBERTS],
  },
  aminozuren: {
    nl: {
      kort: 'Aminozuren zijn de bouwstenen van eiwitten, met 20 standaardsoorten. Ze hebben allemaal hetzelfde basisstuk en verschillen alleen in hun [[zijketen|zijketen]]. Of die water mijdt, water opzoekt of geladen is, bepaalt waar het aminozuur in het eiwit terechtkomt.',
      what: 'Eiwitten zijn opgebouwd uit 20 standaard-aminozuren. Elk heeft een centraal Cα-atoom met een aminogroep, een carboxylgroep, een H-atoom en een zijketen (R) die de eigenschappen bepaalt. Elk aminozuur heeft een volledige naam, een drie- en een éénlettercode.',
      how: [
        'Hydrofoob: Gly (G), Ala (A), Val (V), Leu (L), Ile (I), Met (M), Phe (F), Trp (W), Pro (P) — meestal in de kern.',
        'Polair: Ser (S), Thr (T), Cys (C), Asn (N), Gln (Q), Tyr (Y) — meestal aan het oppervlak.',
        'Positief geladen: Lys (K), Arg (R) en His (H, in zuur milieu); negatief: Asp (D), Glu (E).',
        'Glycine (R = H) is achiraal en flexibel; bij proline vormt de zijketen een ring met de eigen N: star.',
        'Cysteïne kan met een tweede Cys een covalente disulfidebrug (S–S) vormen.',
        'Eiwitten bevatten L-aminozuren; D-vormen komen zelden voor en niet via translatie.',
        'Selenocysteïne (Sec, U; op UGA) en pyrrolysine (Pyl, O; op UAG, in sommige archaea/bacteriën) zijn nr. 21 en 22.',
      ],
      facts: [['Standaardset', '20 aminozuren, in alle organismen'], ['Extra (genetisch gecodeerd)', 'Sec (U) en Pyl (O)'], ['Achiraal', 'alleen glycine'], ['Aromatisch', 'Phe, Tyr, Trp (en His)']],
      why: 'Wie in PyMOL of in een sequentie "W" ziet, moet weten dat dit tryptofaan is. De eigenschappen van de zijketens verklaren waar residuen in een eiwit liggen en hoe het vouwt.',
    },
    en: {
      kort: 'Amino acids are the building blocks of proteins, with 20 standard kinds. They all share the same core and differ only in their [[side chain|zijketen]]. Whether it avoids water, likes water or is charged decides where the amino acid ends up in the protein.',
      what: 'Proteins are built from 20 standard amino acids. Each has a central Cα atom with an amino group, a carboxyl group, an H atom and a side chain (R) that determines its properties. Each amino acid has a full name, a three-letter and a one-letter code.',
      how: [
        'Hydrophobic: Gly (G), Ala (A), Val (V), Leu (L), Ile (I), Met (M), Phe (F), Trp (W), Pro (P) — mostly in the core.',
        'Polar: Ser (S), Thr (T), Cys (C), Asn (N), Gln (Q), Tyr (Y) — mostly at the surface.',
        'Positively charged: Lys (K), Arg (R) and His (H, in acidic conditions); negative: Asp (D), Glu (E).',
        'Glycine (R = H) is achiral and flexible; in proline the side chain forms a ring with its own N: rigid.',
        'Cysteine can form a covalent disulfide bond (S–S) with a second Cys.',
        'Proteins contain L-amino acids; D forms are rare and not made by translation.',
        'Selenocysteine (Sec, U; at UGA) and pyrrolysine (Pyl, O; at UAG, in some archaea/bacteria) are numbers 21 and 22.',
      ],
      facts: [['Standard set', '20 amino acids, in all organisms'], ['Extra (genetically encoded)', 'Sec (U) and Pyl (O)'], ['Achiral', 'glycine only'], ['Aromatic', 'Phe, Tyr, Trp (and His)']],
      why: 'Anyone who sees "W" in PyMOL or in a sequence has to know it is tryptophan. The properties of the side chains explain where residues sit in a protein and how it folds.',
    },
    sources: [IUPAC, UNIPROT_SEQ, GRIMSLEY, FITCH, LIAO, FEIGE, LABUNSKYY, LONGSTAFF, AMBROGELLY, AA_PANEL, SP_PRIM, ALBERTS],
  },
  peptide: {
    nl: {
      kort: 'De peptidebinding koppelt twee [[aminozuren|aminozuur]] aan elkaar; daarbij komt water vrij. Die binding is plat en stijf, dus de keten kan alleen draaien bij het centrale koolstofatoom van elk aminozuur. Daardoor kan een eiwit maar bepaalde vormen aannemen.',
      what: 'De peptidebinding is de amidebinding tussen de carboxylgroep van één aminozuur en de aminogroep van het volgende; netto komt er water vrij (condensatie). Door resonantie heeft de C–N-binding deels een dubbelbindingskarakter: de peptide-eenheid is vlak (planair) en star, meestal trans. Draaien kan alleen rond N–Cα (φ) en Cα–C (ψ).',
      how: [
        'Condensatie: COOH van residu i + NH₂ van residu i+1 → C(O)–NH + H₂O (in de cel gekatalyseerd door het ribosoom).',
        'Het vrije elektronenpaar van N delokaliseert naar C=O: twee resonantievormen.',
        'Gevolg: C–N is korter dan een enkele binding en draait niet vrij (ω ≈ 180°, trans).',
        'Zes atomen (Cα, C, O, N, H, Cα) liggen in één vlak — als een stijf "blad papier".',
        'φ = draaiing rond N–Cα, ψ = draaiing rond Cα–C ("phi heeft de N, psi heeft de C").',
        'Sterische botsingen maken veel φ/ψ-combinaties onmogelijk → Ramachandran-plot.',
      ],
      facts: [['C–N (peptide)', '≈ 1,32 Å, korter dan de enkele N–Cα-binding (≈ 1,47 Å); gemeten in 1UBQ en 1BBB'], ['ω', '≈ 180° (trans); cis vooral vóór proline'], ['Vrije draaihoeken per residu', '2 (φ en ψ)'], ['Richting', 'N-terminus → C-terminus']],
      why: 'Omdat alleen φ en ψ vrij zijn, wordt de hele backbone-conformatie beschreven door twee hoeken per residu. Dat verklaart welke secundaire structuren mogelijk zijn en is de basis van structuurvalidatie.',
    },
    en: {
      kort: 'The peptide bond links two [[amino acids|aminozuur]] together, releasing water. The bond is flat and rigid, so the chain can only rotate at the central carbon atom of each amino acid. That is why a protein can only take certain shapes.',
      what: 'The peptide bond is the amide bond between the carboxyl group of one amino acid and the amino group of the next; the net result is loss of water (condensation). Because of resonance the C–N bond has partial double-bond character: the peptide unit is flat (planar) and rigid, usually trans. Rotation is only possible around N–Cα (φ) and Cα–C (ψ).',
      how: [
        'Condensation: COOH of residue i + NH₂ of residue i+1 → C(O)–NH + H₂O (in the cell catalysed by the ribosome).',
        'The lone pair of N delocalises towards C=O: two resonance forms.',
        'Result: C–N is shorter than a single bond and cannot rotate freely (ω ≈ 180°, trans).',
        'Six atoms (Cα, C, O, N, H, Cα) lie in one plane — like a stiff "sheet of paper".',
        'φ = rotation about N–Cα, ψ = rotation about Cα–C ("phi has the N, psi has the C").',
        'Steric clashes make many φ/ψ combinations impossible → Ramachandran plot.',
      ],
      facts: [['C–N (peptide)', '≈ 1.32 Å, shorter than the single N–Cα bond (≈ 1.47 Å); measured in 1UBQ and 1BBB'], ['ω', '≈ 180° (trans); cis mainly before proline'], ['Free torsion angles per residue', '2 (φ and ψ)'], ['Direction', 'N-terminus → C-terminus']],
      why: 'Because only φ and ψ are free, the whole backbone conformation is described by two angles per residue. This explains which secondary structures are possible and is the basis of structure validation.',
    },
    sources: [{ t: 'Alberts et al., Figure 3-1: A peptide bond (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK26830/figure/A390/' }, SP_PRIM, PAULING, RAMA, STEWART, HOLLINGSWORTH, INGOLIA, TRINIDAD, PDB1UBQ, PDB1BBB],
  },
  secundair: {
    nl: {
      kort: 'Secundaire structuur zijn eenvoudige vormen die korte stukken van de keten aannemen: de spiraalvormige [[α-helix|helix]] en het [[β-blad|betablad]] uit gestrekte strengen naast elkaar. Zwakke [[waterstofbruggen|waterstofbrug]] houden ze op hun plaats. Het zijn de eerste bouwblokken van de 3D-vorm.',
      what: 'Secundaire structuur is de lokale, regelmatige vorm van de backbone, gestabiliseerd door waterstofbruggen tussen C=O en N–H van de backbone. De belangrijkste vormen zijn de α-helix en de β-streng/het β-blad; lussen verbinden ze.',
      how: [
        'α-helix: rechtshandig, 3,6 residuen per winding, H-brug C=O(i) ··· H–N(i+4); zijketens naar buiten.',
        '3₁₀-helix: H-brug i→i+3, strakker gewonden en meestal kort; π-helix: i→i+5, breder en zelden benoemd.',
        'β-streng: bijna gestrekt (≈ 3,3 Å per residu, gemeten in 1UBQ); strengen vormen samen een β-blad.',
        'Antiparallel (tegengestelde richting), parallel (zelfde richting) of gemengd; zijketens afwisselend boven/onder het blad.',
        'β-bladen zijn meestal rechtshandig getwist; een β-bulge is een lokale onderbreking met een extra residu.',
        'Lussen: haarspeld (korte bocht tussen twee strengen), omega-lus (Ω-vormig, compact), en lange onregelmatige lussen die vroeger "random coil" heetten; lussen liggen bijna altijd aan het oppervlak.',
      ],
      facts: [['α-helix', '3,6 res./winding · 1,5 Å/residu · 5,4 Å/winding'], ['α-helix φ/ψ', '≈ −60° / −45°'], ['β-streng φ/ψ', '≈ −120° / +130°'], ['Voorbeeld', 'ubiquitine (1UBQ): helix 23–34, 3₁₀ 56–59, gemengd 5-strengs blad']],
      why: 'Helices en bladen zijn de bouwstenen van elke vouw. Hun H-bruggen neutraliseren de polaire backbone, zodat die in de hydrofobe kern kan liggen.',
    },
    en: {
      kort: 'Secondary structure is the simple shapes that short stretches of the chain adopt: the spiral [[α-helix|helix]] and the [[β-sheet|betablad]] of stretched strands side by side. Weak [[hydrogen bonds|waterstofbrug]] hold them in place. They are the first building blocks of the 3D shape.',
      what: 'Secondary structure is the local, regular shape of the backbone, stabilised by hydrogen bonds between backbone C=O and N–H groups. The main forms are the α-helix and the β-strand/β-sheet; loops connect them.',
      how: [
        'α-helix: right-handed, 3.6 residues per turn, H-bond C=O(i) ··· H–N(i+4); side chains point outwards.',
        '3₁₀ helix: H-bond i→i+3, more tightly wound and usually short; π helix: i→i+5, wider and rarely annotated.',
        'β-strand: almost fully extended (≈ 3.3 Å per residue, measured in 1UBQ); strands together form a β-sheet.',
        'Antiparallel (opposite direction), parallel (same direction) or mixed; side chains alternate above/below the sheet.',
        'β-sheets usually have a right-handed twist; a β-bulge is a local irregularity with an extra residue.',
        'Loops: hairpin (short turn between two strands), omega loop (Ω-shaped, compact), and long irregular loops once called "random coil"; loops almost always lie at the surface.',
      ],
      facts: [['α-helix', '3.6 res./turn · 1.5 Å/residue · 5.4 Å/turn'], ['α-helix φ/ψ', '≈ −60° / −45°'], ['β-strand φ/ψ', '≈ −120° / +130°'], ['Example', 'ubiquitin (1UBQ): helix 23–34, 3₁₀ 56–59, mixed 5-stranded sheet']],
      why: 'Helices and sheets are the building blocks of every fold. Their H-bonds neutralise the polar backbone so that it can lie inside the hydrophobic core.',
    },
    sources: [SP_SEC, PAULING, PDB1UBQ, HOLLINGSWORTH, COOLEY, RICHARDSON, LESZ, ALBERTS],
  },
  ramachandran: {
    nl: {
      kort: 'De Ramachandran-plot toont voor elk aminozuur twee draaihoeken van de keten als één punt. Omdat atomen niet mogen botsen, zijn maar enkele gebieden toegestaan, zoals die van de [[helix|helix]] en de [[β-streng|betastreng]]. Zo zie je snel of een eiwitmodel realistisch is.',
      what: 'De Ramachandran-plot zet voor elk residu ψ uit tegen φ. Omdat sterische botsingen veel combinaties verbieden, vallen de punten in enkele toegestane gebieden: rechtshandige α-helix, β-gebied en (kleiner) linkshandige α-helix. Punten erbuiten zijn uitschieters.',
      how: [
        'Bereken per residu φ = C(i−1)–N–Cα–C en ψ = N–Cα–C–N(i+1) uit de atoomcoördinaten.',
        'Zet elk residu als punt (φ, ψ) van −180° tot +180°.',
        'Rond (−60°, −45°) ligt de α-helixwolk, rond (−120°, +130°) het β-gebied.',
        'Glycine (geen Cβ) mag ook in "verboden" gebieden, bv. met positieve φ.',
        'Proline heeft φ vast rond −60° door zijn ring (in 1BBB: −48° tot −66°).',
        'Uitschieters in verboden gebieden wijzen op fouten of spanning in het model → kwaliteitscontrole.',
      ],
      facts: [['Ingevoerd', '1963 (Ramachandran, Ramakrishnan & Sasisekharan)'], ['Hemoglobine 1BBB', 'vooral α-gebied (all-α-eiwit)'], ['Goede structuur (MolProbity)', '> 98 % in de voorkeursgebieden'], ['Uitzondering', 'glycine']],
      why: 'De plot is een standaardcontrole voor experimentele én voorspelde structuren, en laat in één oogopslag zien welke secundaire structuur een eiwit bevat.',
    },
    en: {
      kort: 'The Ramachandran plot shows two rotation angles of the chain for each amino acid as one point. Because atoms may not clash, only a few regions are allowed, such as those of the [[helix|helix]] and the [[β-strand|betastreng]]. This lets you quickly check whether a protein model is realistic.',
      what: 'The Ramachandran plot shows ψ against φ for each residue. Because steric clashes forbid many combinations, the points fall into a few allowed regions: right-handed α-helix, β region and (smaller) left-handed α-helix. Points outside are outliers.',
      how: [
        'Compute for each residue φ = C(i−1)–N–Cα–C and ψ = N–Cα–C–N(i+1) from the atomic coordinates.',
        'Plot each residue as a point (φ, ψ) from −180° to +180°.',
        'Around (−60°, −45°) lies the α-helix cloud, around (−120°, +130°) the β region.',
        'Glycine (no Cβ) can also sit in "forbidden" regions, e.g. with positive φ.',
        'Proline has φ fixed around −60° because of its ring (in 1BBB: −48° to −66°).',
        'Outliers in forbidden regions point to errors or strain in the model → quality control.',
      ],
      facts: [['Introduced', '1963 (Ramachandran, Ramakrishnan & Sasisekharan)'], ['Haemoglobin 1BBB', 'mainly α region (all-α protein)'], ['Good structure (MolProbity)', '> 98 % in the favoured regions'], ['Exception', 'glycine']],
      why: 'The plot is a standard check for experimental and predicted structures, and shows at a glance which secondary structure a protein contains.',
    },
    sources: [RAMA, LOVELL, CHEN, HOLLINGSWORTH, PDB1BBB, SILVA, SP_SEC],
  },
  tertiair: {
    nl: {
      kort: 'De tertiaire structuur is de volledige 3D-vouw van één keten: [[helices|helix]], strengen en lussen samen in een compact bolletje. Waterschuwe zijketens zitten binnenin, waterminnende buiten. Zo ontstaan plekken waar het eiwit iets kan binden, zoals het [[heem|heem]] in hemoglobine.',
      what: 'De tertiaire structuur is de globale 3D-vouw van één polypeptideketen: hoe helices, strengen en lussen samen gepakt zijn. Hier spelen de zijketens de hoofdrol. Tussenniveaus zijn supersecundaire structuren (motieven) en domeinen.',
      how: [
        'Hydrofoob effect: apolaire zijketens verzamelen zich in de kern, polaire en geladen aan het oppervlak.',
        'Waterstofbruggen tussen zijketens onderling en met de backbone.',
        'Zoutbruggen (ionparen) tussen tegengesteld geladen zijketens (Lys/Arg ↔ Asp/Glu).',
        'Disulfidebruggen (covalent, Cys–S–S–Cys), vooral in eiwitten buiten de cel.',
        'Liganden en metaalionen stabiliseren de vouw (heem-Fe²⁺ in globines, Zn²⁺ in zinkvingers).',
        'Motieven: helix-turn-helix, vierhelixbundel, β-haarspeld, Greek key, β-sandwich, β-barrel, Rossmann-vouw, hoefijzer.',
        'Domein: herkenbaar deel dat meestal zelfstandig kan vouwen en in verschillende eiwitten kan terugkomen.',
        'Indeling: all-α, all-β, α/β, α+β; globulair, membraan of fibreus.',
      ],
      facts: [['β-globine', '8 helices (A–H), één domein, all-α'], ['Heem', 'Fe²⁺ gebonden aan proximale His92 (F8); distale His63 (E7)'], ['Eerste 3D-model van myoglobine', 'Kendrew e.a., 1958'], ['Disulfides in β-globine', 'geen (Cys93, Cys112 vrij)']],
      why: 'De tertiaire structuur plaatst de chemische groepen die de functie bepalen op de juiste plek in 3D, bv. de heempocket die O₂ bindt.',
    },
    en: {
      kort: 'The tertiary structure is the complete 3D fold of one chain: [[helices|helix]], strands and loops packed into a compact ball. Water-avoiding side chains sit inside, water-loving ones outside. This creates spots where the protein can bind something, like the [[haem|heem]] in haemoglobin.',
      what: 'The tertiary structure is the global 3D fold of a single polypeptide chain: how helices, strands and loops pack together. Here the side chains play the main role. Intermediate levels are supersecondary structures (motifs) and domains.',
      how: [
        'Hydrophobic effect: non-polar side chains gather in the core, polar and charged ones at the surface.',
        'Hydrogen bonds between side chains and with the backbone.',
        'Salt bridges (ion pairs) between oppositely charged side chains (Lys/Arg ↔ Asp/Glu).',
        'Disulfide bonds (covalent, Cys–S–S–Cys), mainly in proteins outside the cell.',
        'Ligands and metal ions stabilise the fold (haem Fe²⁺ in globins, Zn²⁺ in zinc fingers).',
        'Motifs: helix-turn-helix, four-helix bundle, β-hairpin, Greek key, β-sandwich, β-barrel, Rossmann fold, horseshoe.',
        'Domain: recognisable part that can usually fold on its own and can recur in different proteins.',
        'Classification: all-α, all-β, α/β, α+β; globular, membrane or fibrous.',
      ],
      facts: [['β-globin', '8 helices (A–H), one domain, all-α'], ['Haem', 'Fe²⁺ bound to proximal His92 (F8); distal His63 (E7)'], ['First 3D model of myoglobin', 'Kendrew et al., 1958'], ['Disulfides in β-globin', 'none (Cys93, Cys112 free)']],
      why: 'The tertiary structure places the chemical groups that determine function at the right place in 3D, e.g. the haem pocket that binds O₂.',
    },
    sources: [SP_TER, ALBERTS, PDB1BBB, MOTM, JAKUBEC, AZIZ, CAMILLONI, FEIGE, KRISHNA, BROWN, KENDREW, NOBEL62, ZHANG, HANUKOGLU, { t: 'ChEBI 26355 — heme b (ijzer gebonden in protoporfyrine)', url: 'https://www.ebi.ac.uk/chebi/searchId.do?chebiId=CHEBI:26355' }],
  },
  quaternair: {
    nl: {
      kort: 'Sommige eiwitten bestaan uit meerdere ketens die samen één geheel vormen; hoe die samen liggen, is de quaternaire structuur. [[Hemoglobine|hemoglobine]] heeft er vier: twee α- en twee β-ketens. Omdat de ketens elkaar beïnvloeden, kan hemoglobine zuurstof goed opnemen en weer afgeven.',
      what: 'De quaternaire structuur is de ruimtelijke schikking van meerdere polypeptideketens (subeenheden) in één eiwitcomplex. Identieke ketens geven een homomeer, verschillende een heteromeer. Menselijk hemoglobine A is een α₂β₂-heterotetrameer: een dimeer van twee αβ-protomeren.',
      how: [
        'Elke keten vouwt tot zijn eigen tertiaire structuur (α: 141, β: 146 residuen, beide globinevouw).',
        'Hydrofobe plekken aan het oppervlak worden bedekt door een andere keten: zo ontstaan grensvlakken.',
        'Grensvlak α1β1 is groot; α1β2 is kleiner en verandert bij O₂-binding (T ↔ R).',
        'Dezelfde krachten als bij tertiaire structuur: hydrofobe contacten, H-bruggen, zoutbruggen en in sommige eiwitten disulfidebruggen tussen ketens (bv. antistoffen); in hemoglobine is alles niet-covalent.',
        'Samenwerking tussen de subeenheden geeft coöperatieve O₂-binding.',
        'Naamgeving: monomeer, dimeer, trimeer, tetrameer…; protomeer = de herhaalde eenheid.',
      ],
      facts: [['Hemoglobine A', 'α₂β₂, 4 hemen, 4 O₂-bindingsplaatsen'], ['PDB 1BBB', 'HbA met CO (R2-toestand), 1,7 Å (1992)'], ['Hemoglobinestructuur', 'Perutz e.a., 1960 (paard, 5,5 Å); Nobelprijs 1962'], ['HbS', 'Glu6Val in β → polymerisatie van deoxy-HbS']],
      why: 'Veel eiwitten werken pas als complex. Bij hemoglobine maakt de quaternaire structuur coöperatieve binding mogelijk: efficiënt O₂ opladen in de longen en afgeven in weefsels.',
    },
    en: {
      kort: 'Some proteins consist of several chains that together form one unit; how they fit together is the quaternary structure. [[Haemoglobin|hemoglobine]] has four: two α and two β chains. Because the chains influence each other, haemoglobin can take up and release oxygen efficiently.',
      what: 'The quaternary structure is the spatial arrangement of several polypeptide chains (subunits) in one protein complex. Identical chains give a homomer, different ones a heteromer. Human haemoglobin A is an α₂β₂ heterotetramer: a dimer of two αβ protomers.',
      how: [
        'Each chain folds into its own tertiary structure (α: 141, β: 146 residues, both globin fold).',
        'Hydrophobic surface patches are covered by another chain: this creates interfaces.',
        'Interface α1β1 is large; α1β2 is smaller and changes upon O₂ binding (T ↔ R).',
        'The same forces as in tertiary structure: hydrophobic contacts, H-bonds, salt bridges and, in some proteins, disulfide bonds between chains (e.g. antibodies); in haemoglobin everything is non-covalent.',
        'Cooperation between the subunits gives cooperative O₂ binding.',
        'Naming: monomer, dimer, trimer, tetramer…; protomer = the repeating unit.',
      ],
      facts: [['Haemoglobin A', 'α₂β₂, 4 haems, 4 O₂ binding sites'], ['PDB 1BBB', 'HbA with CO (R2 state), 1.7 Å (1992)'], ['Haemoglobin structure', 'Perutz et al., 1960 (horse, 5.5 Å); Nobel Prize 1962'], ['HbS', 'Glu6Val in β → polymerisation of deoxy-HbS']],
      why: 'Many proteins only work as a complex. In haemoglobin the quaternary structure enables cooperative binding: efficient O₂ loading in the lungs and release in the tissues.',
    },
    sources: [MOTM, PDB1BBB, SILVA, UNIPROT, PERUTZ, NOBEL62, GURJAR, SP_PRIM, ALBERTS],
  },
};
