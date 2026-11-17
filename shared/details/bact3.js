/* Uitleg per knoop: 70S-ribosoom met EF-Tu (bacterieverhaal) en het zijpad antibiotica (14-11-2026).
 * Elke bewering is gedekt door een van de bronnen hieronder; nagekeken in verificatieronde 12 (docs/verificatie-ronde-12-antibiotica.md). */
const S = {
  fischer: { t: 'Fischer et al. (2015) Structure of the E. coli ribosome–EF-Tu complex at <3 Å resolution by Cs-corrected cryo-EM. Nature 520:567 (PubMed 25707802)', url: 'https://pubmed.ncbi.nlm.nih.gov/25707802/' },
  schmeing: { t: 'Schmeing et al. (2009) The crystal structure of the ribosome bound to EF-Tu and aminoacyl-tRNA. Science 326:688 (PMC3763470)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3763470/' },
  parmeggiani: { t: 'Parmeggiani & Nissen (2006) Elongation factor Tu-targeted antibiotics: four different structures, two mechanisms of action. FEBS Lett 580:4576 (PubMed 16876786)', url: 'https://pubmed.ncbi.nlm.nih.gov/16876786/' },
  dever: { t: 'Dever & Green (2012) The elongation, termination, and recycling phases of translation in eukaryotes. Cold Spring Harb Perspect Biol 4:a013706 (PMC3385960)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3385960/' },
  pdb5afi: { t: 'RCSB PDB 5AFI — 2.9 Å structure of E. coli ribosome–EF-Tu complex by Cs-corrected cryo-EM (Fischer et al., Nature 2015)', url: 'https://www.rcsb.org/structure/5AFI' },
  uniTu: { t: 'UniProt P0CE48 — Elongation factor Tu 2 (tufB), E. coli K-12 (394 aminozuren, 43,3 kDa)', url: 'https://www.uniprot.org/uniprotkb/P0CE48/entry' },
  kohanski: { t: 'Kohanski, Dwyer & Collins (2010) How antibiotics kill bacteria: from targets to networks. Nat Rev Microbiol 8:423 (PMC2896384)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2896384/' },
  vollmer: { t: 'Vollmer, Blanot & de Pedro (2008) Peptidoglycan structure and architecture. FEMS Microbiol Rev 32:149 (PubMed 18194336)', url: 'https://pubmed.ncbi.nlm.nih.gov/18194336/' },
  campbell: { t: 'Campbell et al. (2001) Structural mechanism for rifampicin inhibition of bacterial RNA polymerase. Cell 104:901 (PubMed 11290327)', url: 'https://pubmed.ncbi.nlm.nih.gov/11290327/' },
  molodtsov: { t: 'Molodtsov et al. (2017) Structural basis for rifamycin resistance of bacterial RNA polymerase by the three most clinically important RpoB mutations found in Mycobacterium tuberculosis. Mol Microbiol 103:1034 (PMC5344776)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5344776/' },
  zaychikov: { t: 'Zaychikov et al. (1996) Mapping of catalytic residues in the RNA polymerase active center. Science 273:107 (PubMed 8658176)', url: 'https://pubmed.ncbi.nlm.nih.gov/8658176/' },
  pdb5uac: { t: 'RCSB PDB 5UAC — Escherichia coli RNA polymerase and rifampin complex, wild-type (Molodtsov et al., 2017)', url: 'https://www.rcsb.org/structure/5UAC' },
  lin: { t: 'Lin et al. (2018) Ribosome-targeting antibiotics: modes of action, mechanisms of resistance, and implications for drug design. Annu Rev Biochem 87:451 (PMC9176271)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9176271/' },
  wilson: { t: 'Wilson (2014) Ribosome-targeting antibiotics and mechanisms of bacterial resistance. Nat Rev Microbiol 12:35 (PubMed 24336183)', url: 'https://pubmed.ncbi.nlm.nih.gov/24336183/' },
  aldred: { t: 'Aldred, Kerns & Osheroff (2014) Mechanism of quinolone action and resistance. Biochemistry 53:1565 (PMC3985860)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3985860/' },
  hooper: { t: 'Hooper & Jacoby (2016) Topoisomerase inhibitors: fluoroquinolone mechanisms of action and resistance. Cold Spring Harb Perspect Med 6:a025320 (PMC5008060)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5008060/' },
  oswald: { t: 'Oswald, Tam & Pos (2016) Transport of lipophilic carboxylates is mediated by transmembrane helix 2 in multidrug transporter AcrB. Nat Commun 7:13819 (PMC5171871)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5171871/' },
  munita: { t: 'Munita & Arias (2016) Mechanisms of antibiotic resistance. Microbiol Spectr 4(2):VMBF-0016-2015 (PMC4888801)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4888801/' },
};

export default {
  beftu: {
    nl: {
      kort: 'Een tRNA komt niet vanzelf bij het ribosoom. Het eiwit EF-Tu brengt het aan. Past het tRNA op het [[codon|codon]], dan laat EF-Tu los en kan het ribosoom het aminozuur koppelen.',
      what: 'EF-Tu (elongatiefactor Tu) vormt met GTP en een geladen tRNA een drietal (ternair complex) dat het tRNA naar de A-plaats van het 70S-ribosoom brengt. Het ribosoom controleert in zijn leesplek of het anticodon op het codon past. Pas dan zet EF-Tu zijn GTP om in GDP en laat het tRNA los.',
      how: [
        'EF-Tu·GTP bindt een aminoacyl-tRNA en brengt het naar de A-plaats.',
        'Het tRNA raakt tegelijk de leesplek van de 30S (anticodon op codon) en EF-Tu op de factorplek; daarvoor wordt het tRNA even vervormd.',
        'Bij een juiste paring wordt het signaal doorgegeven naar EF-Tu: GTP wordt GDP en EF-Tu laat los.',
        'Het antibioticum kirromycine verhindert dat EF-Tu na die stap van vorm verandert en houdt het zo op het ribosoom vast. Zo kon dit moment in de structuur 5AFI worden vastgelegd.',
      ],
      facts: [['EF-Tu', '394 aminozuren, ≈ 43 kDa (UniProt P0CE48)'], ['Structuur', 'PDB 5AFI, cryo-EM 2,9 Å (2,65 Å in de kern)'], ['In deze structuur', 'start-tRNA (fMet) in de P-plaats, Phe-tRNA op weg naar de A-plaats, codon UUC'], ['Antibioticum', 'kirromycine: EF-Tu·GDP blijft op het ribosoom'], ['Bij de mens', 'eEF1A doet hetzelfde werk']],
      why: 'De keuze van het juiste tRNA bepaalt hoe nauwkeurig eiwitten gemaakt worden. Dat het ribosoom pas na controle het signaal geeft om GTP te gebruiken, is een van de manieren waarop het fouten voorkomt. Omdat EF-Tu zo belangrijk is, is het ook een doelwit voor antibiotica.',
    },
    en: {
      kort: 'A tRNA does not reach the ribosome by itself. The protein EF-Tu brings it in. If the tRNA fits the [[codon|codon]], EF-Tu lets go and the ribosome can attach the amino acid.',
      what: 'EF-Tu (elongation factor Tu) forms a trio (ternary complex) with GTP and a charged tRNA that brings the tRNA to the A site of the 70S ribosome. In its decoding site the ribosome checks whether the anticodon fits the codon. Only then does EF-Tu turn its GTP into GDP and release the tRNA.',
      how: [
        'EF-Tu·GTP binds an aminoacyl-tRNA and brings it to the A site.',
        'The tRNA touches both the decoding site of the 30S (anticodon on codon) and EF-Tu at the factor binding site; to do so the tRNA is briefly distorted.',
        'With a correct match the signal passes to EF-Tu: GTP becomes GDP and EF-Tu lets go.',
        'The antibiotic kirromycin prevents EF-Tu from changing shape after that step and so holds it on the ribosome. That is how this moment could be captured in structure 5AFI.',
      ],
      facts: [['EF-Tu', '394 amino acids, ≈ 43 kDa (UniProt P0CE48)'], ['Structure', 'PDB 5AFI, cryo-EM 2.9 Å (2.65 Å in the core)'], ['In this structure', 'start tRNA (fMet) in the P site, Phe-tRNA on its way to the A site, codon UUC'], ['Antibiotic', 'kirromycin: EF-Tu·GDP stays on the ribosome'], ['In humans', 'eEF1A does the same job']],
      why: 'Choosing the right tRNA decides how accurately proteins are made. That the ribosome only signals EF-Tu to use its GTP after checking is one of the ways it avoids errors. Because EF-Tu is so important, it is also a target for antibiotics.',
    },
    sources: [S.pdb5afi, S.fischer, S.schmeing, S.parmeggiani, S.uniTu, S.dever],
  },

  antibiotica: {
    nl: {
      kort: 'De meeste antibiotica die bacteriën doden, remmen één van vier dingen: de celwand, het DNA, het maken van RNA of het maken van eiwit. Onze eigen cellen blijven grotendeels gespaard, omdat ze die onderdelen niet hebben of net anders gebouwd zijn. Bacteriën kunnen wel [[resistent|resistentie]] worden.',
      what: 'Antibiotica worden ingedeeld naar het onderdeel dat ze raken en naar hun effect: bacteriedodend (bactericide) of alleen groeiremmend (bacteriostatisch). De meeste bactericide middelen remmen de aanmaak van DNA, RNA, de celwand of eiwit.',
      how: [
        'Celwand: β-lactams (penicillines, cefalosporines, carbapenems) remmen de transpeptidasen (penicillinebindende eiwitten) die de suikerketens van het peptidoglycaan aan elkaar knopen. De wand verzwakt en de cel barst open.',
        'DNA: fluorochinolonen zetten DNA-gyrase en topoisomerase IV vast op geknipt DNA; er ontstaan dubbelstrengsbreuken.',
        'RNA: rifamycines zoals rifampicine binden de β-subeenheid van het RNA-polymerase en houden het nieuwe RNA tegen.',
        'Eiwit: remmers van de 30S (tetracyclines, aminoglycosiden) en van de 50S (macroliden, chlooramfenicol, oxazolidinonen).',
      ],
      facts: [['Vier doelwitten', 'celwand, DNA, RNA, eiwit'], ['Peptidoglycaan', 'uniek voor bacteriën'], ['Bactericide ribosoomremmers', 'vooral de aminoglycosiden'], ['Let op', 'chlooramfenicol remt ook de ribosomen in onze mitochondriën']],
      why: 'Een goed antibioticum raakt iets wat de bacterie nodig heeft en wat wij niet of anders hebben. Daarom tonen de vergelijkingen tussen mens en bacterie in deze app ook waar geneesmiddelen kunnen aangrijpen.',
    },
    en: {
      kort: 'Most antibiotics that kill bacteria block one of four things: the cell wall, the DNA, making RNA or making protein. Our own cells are largely spared because they lack those parts or have them built slightly differently. Bacteria can, however, become [[resistant|resistentie]].',
      what: 'Antibiotics are classified by the part they hit and by their effect: killing bacteria (bactericidal) or only stopping their growth (bacteriostatic). Most bactericidal drugs block the synthesis of DNA, RNA, the cell wall or protein.',
      how: [
        'Cell wall: β-lactams (penicillins, cephalosporins, carbapenems) inhibit the transpeptidases (penicillin-binding proteins) that cross-link the sugar chains of peptidoglycan. The wall weakens and the cell bursts.',
        'DNA: fluoroquinolones lock DNA gyrase and topoisomerase IV onto cut DNA; double-strand breaks appear.',
        'RNA: rifamycins such as rifampicin bind the β subunit of RNA polymerase and stop the new RNA.',
        'Protein: inhibitors of the 30S (tetracyclines, aminoglycosides) and of the 50S (macrolides, chloramphenicol, oxazolidinones).',
      ],
      facts: [['Four targets', 'cell wall, DNA, RNA, protein'], ['Peptidoglycan', 'unique to bacteria'], ['Bactericidal ribosome inhibitors', 'mainly the aminoglycosides'], ['Note', 'chloramphenicol also inhibits the ribosomes in our mitochondria']],
      why: 'A good antibiotic hits something the bacterium needs and that we lack or have in a different form. That is why the human–bacterium comparisons in this app also show where drugs can strike.',
    },
    sources: [S.kohanski, S.vollmer, S.lin, S.aldred, S.molodtsov],
  },

  rifampicine: {
    nl: {
      kort: 'Rifampicine is een antibioticum dat in een holte van het [[bacteriële RNA-polymerase|bpol]] past. Daar houdt het het nieuwe RNA tegen zodra dat 2 à 3 letters lang is. Het is een hoeksteen van de behandeling van tuberculose.',
      what: 'Rifampicine (een rifamycine) bindt een holte in de β-subeenheid (gen rpoB), diep in het kanaal waar DNA en RNA lopen, maar meer dan 12 Å van de actieve plek. Het blokkeert de weg van het groeiende RNA zodra dat 2 à 3 nucleotiden lang is.',
      how: [
        'Het RNA-polymerase opent de promoter en begint RNA te maken, zoals gewoonlijk.',
        'Bij een RNA van 2 à 3 nucleotiden botst het uiteinde op rifampicine en kan het RNA niet verder.',
        'Resistentie ontstaat vooral door een verandering van één aminozuur in die holte. In de nummering van E. coli zijn S531L, H526Y en D516V de belangrijkste.',
        'S531L maakt een lus van de holte los als rifampicine bindt; H526Y verandert de vorm van de holte zodat rifampicine er niet meer in past; D516V verandert de lading van de holte.',
      ],
      facts: [['Doelwit', 'β-subeenheid (RpoB), > 12 Å van de actieve plek'], ['Blokkeert', 'RNA van 2–3 nucleotiden'], ['Structuur', 'PDB 5UAC, röntgen 3,8 Å (E. coli)'], ['Resistente tbc-isolaten', 'S531L ≈ 41 %, H526Y ≈ 36 %, D516V ≈ 9 %'], ['Bij de mens', 'die holte is niet bewaard in ons RNA-polymerase']],
      why: 'Rifampicine toont mooi hoe een medicijn op een plek van een enzym kan grijpen zonder de actieve plek zelf te raken. Het toont ook waarom resistentie snel ontstaat: één verandering in de holte volstaat, terwijl het enzym blijft werken. Daarom wordt rifampicine vaak samen met andere middelen gegeven.',
    },
    en: {
      kort: 'Rifampicin is an antibiotic that fits into a pocket of [[bacterial RNA polymerase|bpol]]. There it stops the new RNA once it is 2 to 3 letters long. It is a cornerstone of tuberculosis treatment.',
      what: 'Rifampicin (a rifamycin) binds a pocket in the β subunit (gene rpoB), deep in the channel where DNA and RNA run, but more than 12 Å from the active site. It blocks the path of the growing RNA once it is 2 to 3 nucleotides long.',
      how: [
        'RNA polymerase opens the promoter and starts making RNA, as usual.',
        'At an RNA length of 2 to 3 nucleotides the end bumps into rifampicin and the RNA cannot go on.',
        'Resistance arises mainly from a change of one amino acid in that pocket. In E. coli numbering, S531L, H526Y and D516V are the most important.',
        'S531L makes a loop of the pocket disordered when rifampicin binds; H526Y reshapes the pocket so rifampicin no longer fits; D516V changes the charge of the pocket.',
      ],
      facts: [['Target', 'β subunit (RpoB), > 12 Å from the active site'], ['Blocks', 'RNA of 2–3 nucleotides'], ['Structure', 'PDB 5UAC, X-ray 3.8 Å (E. coli)'], ['Resistant TB isolates', 'S531L ≈ 41 %, H526Y ≈ 36 %, D516V ≈ 9 %'], ['In humans', 'this pocket is not conserved in our RNA polymerase']],
      why: 'Rifampicin nicely shows how a drug can grip an enzyme without touching the active site itself. It also shows why resistance arises quickly: one change in the pocket is enough, while the enzyme keeps working. That is why rifampicin is often combined with other drugs.',
    },
    sources: [S.pdb5uac, S.molodtsov, S.campbell, S.kohanski, S.zaychikov, S.munita],
  },

  ribosoomremmers: {
    nl: {
      kort: 'Het bacteriële [[ribosoom|bribosoom]] is het doelwit van veel antibiotica. Elk zit op een andere plek: waar het tRNA landt, waar het codon gecontroleerd wordt of in de tunnel waar de nieuwe keten naar buiten gaat. Ons ribosoom verschilt net op die plekken.',
      what: 'Ribosoomremmers vormen meer dan de helft van de geneesmiddelen tegen infecties. Ze binden vooral op drie functionele plekken: de leesplek (decoding center) van de 30S, het peptidyltransferasecentrum van de 50S en de uitgangstunnel voor de nieuwe keten.',
      how: [
        'Tetracyclines binden in de leesplek en verhinderen dat een aminoacyl-tRNA in de A-plaats komt.',
        'Aminoglycosiden (zoals gentamicine en paromomycine) binden helix 44 van het 16S-rRNA. Het ribosoom aanvaardt dan ook verkeerde tRNA’s en maakt foute eiwitten; als enige ribosoomremmers zijn ze breed bacteriedodend.',
        'Macroliden (zoals erytromycine) binden bij de ingang van de uitgangstunnel (A2058/A2059 van het 23S-rRNA). Ze remmen vooral bij bepaalde aminozuurvolgordes; sommige eiwitten worden nog gemaakt.',
        'Kirromycine raakt niet het ribosoom maar EF-Tu: het houdt EF-Tu·GDP op het ribosoom vast.',
      ],
      facts: [['Aandeel', '> de helft van de geneesmiddelen tegen infecties'], ['30S', 'tetracyclines, aminoglycosiden'], ['50S', 'macroliden, chlooramfenicol, lincosamiden, oxazolidinonen'], ['Mens (cytosol)', 'G op 1408 → aminoglycosiden werken niet; G op 2058 → mee daardoor werken macroliden niet']],
      why: 'Bacteriën kunnen hun ribosoom niet zomaar veranderen: ze hebben vaak meerdere kopieën van de rRNA-genen, en een wijziging kan hun groei vertragen. Toch volstaat soms één letter: resistente bacteriën methyleren of muteren precies de base waar het antibioticum bindt (bv. A2058 voor macroliden).',
    },
    en: {
      kort: 'The bacterial [[ribosome|bribosoom]] is the target of many antibiotics. Each sits in a different spot: where the tRNA lands, where the codon is checked, or in the tunnel where the new chain leaves. Our ribosome differs exactly at those spots.',
      what: 'Ribosome inhibitors make up more than half of the medicines against infections. They bind mainly at three functional sites: the decoding centre of the 30S, the peptidyl transferase centre of the 50S and the exit tunnel for the new chain.',
      how: [
        'Tetracyclines bind in the decoding site and prevent an aminoacyl-tRNA from entering the A site.',
        'Aminoglycosides (such as gentamicin and paromomycin) bind helix 44 of the 16S rRNA. The ribosome then also accepts wrong tRNAs and makes faulty proteins; they are the only broadly bactericidal ribosome inhibitors.',
        'Macrolides (such as erythromycin) bind at the entrance of the exit tunnel (A2058/A2059 of the 23S rRNA). They mainly stall at certain amino acid sequences; some proteins are still made.',
        'Kirromycin does not hit the ribosome but EF-Tu: it holds EF-Tu·GDP on the ribosome.',
      ],
      facts: [['Share', '> half of the medicines against infections'], ['30S', 'tetracyclines, aminoglycosides'], ['50S', 'macrolides, chloramphenicol, lincosamides, oxazolidinones'], ['Human (cytosol)', 'G at 1408 → aminoglycosides do not work; G at 2058 → partly why macrolides do not work']],
      why: 'Bacteria cannot simply change their ribosome: they often have several copies of the rRNA genes, and a change can slow their growth. Yet sometimes one letter is enough: resistant bacteria methylate or mutate exactly the base where the antibiotic binds (e.g. A2058 for macrolides).',
    },
    sources: [S.lin, S.kohanski, S.wilson, S.parmeggiani, S.munita],
  },

  gyraseremmers: {
    nl: {
      kort: 'Gyrase knipt het DNA, haalt er een ander stuk doorheen en plakt het weer dicht (zie de [[nucleoïd|bnucleoid]]). Fluorochinolonen zoals ciprofloxacine zetten gyrase vast terwijl het DNA open is. Zo wordt een nuttig enzym een gif dat het chromosoom in stukken knipt.',
      what: 'Fluorochinolonen zijn synthetische antibiotica die DNA-gyrase en topoisomerase IV raken, de twee type II-topoisomerasen van bacteriën. Ze binden het enzym–DNA-complex op het moment dat beide strengen geknipt zijn en verhinderen dat de breuk weer dicht gaat.',
      how: [
        'Gyrase (A₂B₂) maakt een tijdelijke breuk in beide strengen (4 basenparen verschoven), haalt een ander stuk dubbel DNA erdoor en plakt de breuk dicht. Het is het enige type II-topoisomerase dat negatieve supercoils kan aanbrengen.',
        'Het medicijn bindt het geknipte complex via een brug van water en een Mg²⁺-ion, vastgehouden door een serine en een zuur aminozuur van het enzym.',
        'Botst een replicatievork of RNA-polymerase op zo’n vastgezet complex, dan wordt de tijdelijke knip een blijvende dubbelstrengsbreuk.',
        'Resistentie: vaak een mutatie van die serine of dat zure aminozuur; daarnaast pompen en genen op plasmiden (Qnr-eiwitten).',
      ],
      facts: [['Doelwitten', 'gyrase (vooral bij E. coli) en topoisomerase IV'], ['Gyrase op het chromosoom', 'ongeveer om de 100 kb'], ['Ankerplaatsen', 'serine + zuur aminozuur (water–Mg²⁺-brug)'], ['Mens', 'topoisomerase IIα en IIβ missen die twee ankerplaatsen']],
      why: 'Fluorochinolonen tonen dat een medicijn een enzym niet altijd uitzet, maar het ook tegen de cel kan keren. Dat ons eigen topoisomerase II de twee ankerplaatsen mist, verklaart voor een deel waarom deze middelen onze cellen sparen.',
    },
    en: {
      kort: 'Gyrase cuts the DNA, passes another piece through and reseals it (see the [[nucleoid|bnucleoid]]). Fluoroquinolones such as ciprofloxacin lock gyrase while the DNA is open. This turns a useful enzyme into a poison that cuts the chromosome into pieces.',
      what: 'Fluoroquinolones are synthetic antibiotics that hit DNA gyrase and topoisomerase IV, the two type II topoisomerases of bacteria. They bind the enzyme–DNA complex at the moment both strands are cut and prevent the break from being resealed.',
      how: [
        'Gyrase (A₂B₂) makes a temporary break in both strands (4 base pairs apart), passes another piece of double-stranded DNA through and reseals the break. It is the only type II topoisomerase that can introduce negative supercoils.',
        'The drug binds the cut complex through a bridge of water and an Mg²⁺ ion, held by a serine and an acidic amino acid of the enzyme.',
        'When a replication fork or RNA polymerase runs into such a locked complex, the temporary cut becomes a lasting double-strand break.',
        'Resistance: often a mutation of that serine or acidic amino acid; in addition pumps and plasmid genes (Qnr proteins).',
      ],
      facts: [['Targets', 'gyrase (mainly in E. coli) and topoisomerase IV'], ['Gyrase on the chromosome', 'roughly every 100 kb'], ['Anchor points', 'serine + acidic amino acid (water–Mg²⁺ bridge)'], ['Human', 'topoisomerase IIα and IIβ lack these two anchor points']],
      why: 'Fluoroquinolones show that a drug does not always switch an enzyme off, but can also turn it against the cell. That our own topoisomerase II lacks the two anchor points partly explains why these drugs spare our cells.',
    },
    sources: [S.aldred, S.kohanski, S.hooper],
  },

  resistentie: {
    nl: {
      kort: 'Bacteriën worden resistent door een mutatie in hun eigen DNA of door een resistentiegen van een andere bacterie over te nemen, vaak op een [[plasmide|bplasmide]]. Dan verandert het doelwit, maken ze het antibioticum kapot, laten ze minder binnen of pompen ze het weer naar buiten.',
      what: 'Antibioticaresistentie is een vorm van evolutie: onder antibiotica overleven de bacteriën die toevallig een beschermende mutatie of een overgenomen gen hebben. Overdracht van genen tussen bacteriën gebeurt via opname van los DNA (transformatie), via virussen van bacteriën (transductie) of via conjugatie; plasmiden en transposons spelen daarbij de grootste rol.',
      how: [
        'Doelwit verandert: een puntmutatie (bv. in rpoB tegen rifampicine), een chemische wijziging van de bindingsplek (bv. methylering van het 23S-rRNA tegen macroliden) of een vervangend doelwit (bv. PBP2a, gen mecA, bij stafylokokken).',
        'Antibioticum kapot of gewijzigd: β-lactamasen knippen de β-lactamring open; andere enzymen hangen een groep aan aminoglycosiden.',
        'Minder binnenlaten: hydrofiele middelen zoals β-lactams, tetracyclines en sommige fluorochinolonen gaan door porines in het buitenmembraan; minder of andere porines laten minder door.',
        'Naar buiten pompen: bv. Tet-pompen voor tetracycline, of grote pompen door beide membranen (AcrAB–TolC) die veel soorten middelen buitenwerken.',
      ],
      facts: [['Twee genetische wegen', 'mutatie of overname van genen'], ['β-lactamasen', 'meer dan 1 000 beschreven'], ['TEM-1', 'β-lactamase op een plasmide, jaren 1960 gevonden bij gram-negatieve bacteriën'], ['Vaak samen', 'minder porines + pompen + afbrekend enzym']],
      why: 'Resistentie verklaart waarom antibiotica met zorg gebruikt moeten worden. Omdat resistentiegenen op plasmiden van bacterie naar bacterie springen, kan resistentie ook terechtkomen bij bacteriën die zelf nooit de mutatie kregen; conjugatie is daarvoor een heel efficiënte weg.',
    },
    en: {
      kort: 'Bacteria become resistant through a mutation in their own DNA or by taking over a resistance gene from another bacterium, often on a [[plasmid|bplasmide]]. Then the target changes, they destroy the antibiotic, let less of it in or pump it back out.',
      what: 'Antibiotic resistance is a form of evolution: under antibiotics the bacteria that happen to have a protective mutation or an acquired gene survive. Genes pass between bacteria by uptake of loose DNA (transformation), via viruses of bacteria (transduction) or by conjugation; plasmids and transposons play the largest role.',
      how: [
        'Target changes: a point mutation (e.g. in rpoB against rifampicin), a chemical change of the binding site (e.g. methylation of the 23S rRNA against macrolides) or a replacement target (e.g. PBP2a, gene mecA, in staphylococci).',
        'Antibiotic destroyed or modified: β-lactamases cut open the β-lactam ring; other enzymes attach a group to aminoglycosides.',
        'Letting less in: hydrophilic drugs such as β-lactams, tetracyclines and some fluoroquinolones pass through porins in the outer membrane; fewer or different porins let less through.',
        'Pumping out: e.g. Tet pumps for tetracycline, or large pumps through both membranes (AcrAB–TolC) that remove many kinds of drugs.',
      ],
      facts: [['Two genetic routes', 'mutation or acquiring genes'], ['β-lactamases', 'more than 1,000 described'], ['TEM-1', 'plasmid β-lactamase, found in Gram-negative bacteria in the 1960s'], ['Often combined', 'fewer porins + pumps + degrading enzyme']],
      why: 'Resistance explains why antibiotics must be used with care. Because resistance genes jump from bacterium to bacterium on plasmids, resistance can also reach bacteria that never had the mutation themselves; conjugation is a very efficient route for this.',
    },
    sources: [S.munita, S.lin, S.molodtsov, S.hooper, S.oswald],
  },
};
