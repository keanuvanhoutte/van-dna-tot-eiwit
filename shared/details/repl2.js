/* Uitleg per knoop voor het zijpad "DNA kopiëren en herstellen" (05-11-2026) — zie app/SCENES.md.
 * Nagekeken in docs/verificatie-ronde-7-replicatie-herstel.md. */
const ALB_INIT = { t: 'Alberts et al., MBoC 4e ed. — The Initiation and Completion of DNA Replication in Chromosomes (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK26826/' };
const ALB_REPAIR = { t: 'Alberts et al., MBoC 4e ed. — DNA Repair (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK26879/' };
const BURGERS = { t: 'Burgers & Kunkel (2017) Eukaryotic DNA replication fork. Annu Rev Biochem 86:417 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5597965/' };
const BLOW = { t: 'Blow & Hodgson (2002) Replication licensing — defining the proliferative state? Trends Cell Biol 12:72 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3604914/' };
const LI = { t: 'Li et al. (2023) The human pre-replication complex is an open complex. Cell 186:98 (PubMed 36608662)', url: 'https://pubmed.ncbi.nlm.nih.gov/36608662/' };
const KUNKEL = { t: 'Kunkel & Erie (2015) Eukaryotic mismatch repair in relation to DNA replication. Annu Rev Genet 49:291 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5439269/' };
const WARREN = { t: 'Warren et al. (2007) Structure of the human MutSα DNA lesion recognition complex. Mol Cell 26:579 (PubMed 17531815)', url: 'https://pubmed.ncbi.nlm.nih.gov/17531815/' };
const KROKAN = { t: 'Krokan & Bjørås (2013) Base excision repair. Cold Spring Harb Perspect Biol 5:a012583 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3683898/' };
const PARIKH = { t: 'Parikh et al. (2000) Uracil-DNA glycosylase–DNA substrate and product structures. PNAS 97:5083 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC25785/' };
const SCHARER = { t: 'Schärer (2013) Nucleotide excision repair in eukaryotes. Cold Spring Harb Perspect Biol 5:a012609 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3783044/' };
const REARDON = { t: 'Reardon & Sancar (2002) Molecular anatomy of the human excision nuclease assembled at sites of DNA damage (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC133982/' };
const CHANG = { t: 'Chang et al. (2017) Non-homologous DNA end joining and alternative pathways to double-strand break repair. Nat Rev Mol Cell Biol 18:495 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7062608/' };
const MAO = { t: 'Mao et al. (2008) Comparison of nonhomologous end joining and homologous recombination in human cells. DNA Repair 7:1765 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2695993/' };
const SULLIVAN = { t: 'Sullivan & Bernstein (2018) RAD-ical new insights into RAD51 regulation. Genes 9:629 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6316741/' };
const KOKIC = { t: 'Kokic et al. (2019) Structural basis of TFIIH activation for nucleotide excision repair. Nat Commun 10:2885', url: 'https://doi.org/10.1038/s41467-019-10745-5' };
const APPLEBY = { t: 'Appleby et al. (2023) A metal ion-dependent mechanism of RAD51 nucleoprotein filament disassembly. iScience 26:106689', url: 'https://doi.org/10.1016/j.isci.2023.106689' };
const WALKER = { t: 'Walker, Corpina & Goldberg (2001) Structure of the Ku heterodimer bound to DNA. Nature 412:607 (PubMed 11493912)', url: 'https://pubmed.ncbi.nlm.nih.gov/11493912/' };
const GNANA = { t: 'Gnanasundram et al. (2021) p53 mRNA metabolism links with the DNA damage response. Genes 12:1446 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8465283/' };
const OLIVIER = { t: 'Olivier, Hollstein & Hainaut (2010) TP53 mutations in human cancers: origins, consequences, and clinical use. Cold Spring Harb Perspect Biol 2:a001008 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2827900/' };
const KANDOTH = { t: 'Kandoth et al. (2013) Mutational landscape and significance across 12 major cancer types. Nature 502:333 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3927368/' };
const CHO = { t: 'Cho et al. (1994) Crystal structure of a p53 tumor suppressor–DNA complex. Science 265:346 (PubMed 8023157)', url: 'https://pubmed.ncbi.nlm.nih.gov/8023157/' };
const KUMARI = { t: 'Kumari, Kohli & Das (2014) p53 regulation upon genotoxic stress: intricacies and complexities. Mol Cell Oncol 1:e969653 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4904996/' };
const LANE = { t: 'Lane (1992) p53, guardian of the genome. Nature 358:15 (PubMed 1614522)', url: 'https://pubmed.ncbi.nlm.nih.gov/1614522/' };
const PDB = (id, t) => ({ t: `RCSB PDB ${id} — ${t}`, url: `https://www.rcsb.org/structure/${id}` });

export default {
  origins: {
    nl: {
      kort: 'Het DNA van een mens wordt op duizenden plaatsen tegelijk gekopieerd. Op elke startplaats ligt eerst een slapende kopieermachine klaar. Die mag maar één keer per celcyclus vertrekken, zodat geen stuk DNA twee keer gekopieerd wordt.',
      what: 'Eukaryote chromosomen hebben vele replicatie-origins. Een origin wordt in twee gescheiden stappen gebruikt: in G1 krijgt ze een "licentie" (het helicasecomplex MCM2-7 wordt geladen, maar blijft inactief) en pas in de S-fase "vuurt" ze (het helicase wordt actief). Omdat laden en activeren in verschillende fasen gebeuren, wordt elk stuk DNA maar één keer per celcyclus gekopieerd.',
      how: [
        'Late mitose en G1 (lage CDK-activiteit): het origin-herkenningscomplex ORC bindt het DNA en werkt samen met Cdc6 en Cdt1.',
        'Zo worden twee MCM2-7-ringen (elk zes verschillende eiwitten, MCM2 tot MCM7) na elkaar rond dubbelstrengig DNA gelegd: een inactieve dubbelhexameer (het pre-replicatiecomplex).',
        'In de menselijke dubbelhexameer (PDB 7W1Y) is het DNA op de plek waar de twee ringen elkaar raken al iets ontwonden; één basenpaar is volledig gescheiden.',
        'Begin S-fase: de kinasen DDK (Cdc7–Dbf4) en CDK zorgen dat Cdc45 en GINS binden; met hulp van o.a. Mcm10 ontstaan twee actieve CMG-helicasen.',
        "Elke CMG omsluit één streng (de matrijs van de leidende streng) en loopt er 3'→5' over; de twee helicasen lopen uit elkaar, zodat elke origin twee replicatievorken krijgt.",
        'In S, G2 en vroege mitose kan geen nieuwe MCM2-7 geladen worden (hoge CDK-activiteit); een origin die gevuurd heeft, verliest haar MCM en kan niet opnieuw vuren.',
      ],
      facts: [['Licentie', 'late mitose + G1'], ['Vuren', 'S-fase (DDK + CDK)'], ['MCM2-7', 'ring van 6 verschillende eiwitten; geladen als dubbelhexameer'], ['Actief helicase', "CMG = Cdc45 + MCM2-7 + GINS, loopt 3'→5'"], ['Structuur', 'PDB 7W1Y: menselijke MCM-dubbelhexameer op DNA (cryo-EM 2,59 Å)']],
      why: 'Als een stuk DNA twee keer gekopieerd zou worden, krijgt de cel extra kopieën van genen en ontstaan breuken: genoominstabiliteit. De scheiding tussen licentie (G1) en vuren (S) is daarom een van de belangrijkste veiligheden van de celcyclus.',
    },
    en: {
      kort: 'Human DNA is copied at thousands of places at the same time. At each starting point a sleeping copying machine is first put in place. It may set off only once per cell cycle, so no piece of DNA is copied twice.',
      what: 'Eukaryotic chromosomes have many replication origins. An origin is used in two separate steps: in G1 it is "licensed" (the helicase complex MCM2-7 is loaded but stays inactive) and only in S phase does it "fire" (the helicase becomes active). Because loading and activation happen in different phases, each piece of DNA is copied only once per cell cycle.',
      how: [
        'Late mitosis and G1 (low CDK activity): the origin recognition complex ORC binds the DNA and works together with Cdc6 and Cdt1.',
        'This way two MCM2-7 rings (each made of six different proteins, MCM2 to MCM7) are placed one after the other around double-stranded DNA: an inactive double hexamer (the pre-replication complex).',
        'In the human double hexamer (PDB 7W1Y) the DNA is already slightly unwound where the two rings meet; one base pair is fully separated.',
        'Start of S phase: the kinases DDK (Cdc7–Dbf4) and CDK make Cdc45 and GINS bind; with help from Mcm10 among others, two active CMG helicases form.',
        "Each CMG encircles one strand (the leading-strand template) and moves 3'→5' along it; the two helicases move apart, so each origin gets two replication forks.",
        'In S, G2 and early mitosis no new MCM2-7 can be loaded (high CDK activity); an origin that has fired loses its MCM and cannot fire again.',
      ],
      facts: [['Licensing', 'late mitosis + G1'], ['Firing', 'S phase (DDK + CDK)'], ['MCM2-7', 'ring of 6 different proteins; loaded as a double hexamer'], ['Active helicase', "CMG = Cdc45 + MCM2-7 + GINS, moves 3'→5'"], ['Structure', 'PDB 7W1Y: human MCM double hexamer on DNA (cryo-EM 2.59 Å)']],
      why: 'If a piece of DNA were copied twice, the cell would gain extra copies of genes and breaks would arise: genome instability. Separating licensing (G1) from firing (S) is therefore one of the most important safeguards of the cell cycle.',
    },
    sources: [BLOW, BURGERS, LI, PDB('7W1Y', 'human MCM double hexamer bound to natural DNA duplex'), ALB_INIT],
  },

  mmr: {
    nl: {
      kort: 'Bij het kopiëren zet de [[polymerase|polymerase]] soms een verkeerde letter. Meestal ziet het enzym dat zelf en haalt het de letter meteen weg. Ontsnapt een fout toch, dan vindt een tweede ploeg eiwitten de foute paring, knipt het stuk uit de nieuwe streng en maakt het opnieuw.',
      what: 'De nauwkeurigheid van replicatie komt uit drie stappen na elkaar: de polymerase kiest de juiste base, leest zelf na (proeflezen) en wat dan nog ontsnapt, wordt door mismatch-herstel (MMR) verbeterd. MMR moet daarbij weten welke streng nieuw is, want alleen daar zit de fout.',
      how: [
        "Proeflezen: Pol δ en Pol ε hebben een 3'→5'-exonuclease die een net ingebouwde foute base meteen weer verwijdert.",
        'MutSα (MSH2–MSH6) glijdt langs het DNA en herkent een foute basenparing (bv. G·T) of een kleine insertie/deletie. In de structuur 2O8B duwt Phe432 van MSH6 tegen de foute paring en is het DNA geknikt.',
        'PCNA, door RFC op het DNA geladen, activeert MutLα (MLH1–PMS2) om de nieuwe streng in te knippen. De nieuwe streng wordt herkend aan haar onderbrekingen (o.a. de uiteinden van Okazaki-fragmenten) en aan de oriëntatie van PCNA.',
        "EXO1 breekt de nieuwe streng af (5'→3') tot voorbij de fout; een andere route werkt met strengverdringing door Pol δ.",
        'Pol δ maakt het stuk opnieuw met de oude streng als matrijs; een ligase sluit de streng.',
      ],
      facts: [['Fouten vóór proeflezen', '≈ 1 per 10⁴–10⁵ bases (in vitro)'], ['MMR-efficiëntie', 'gemiddeld ≈ 99 % (≈ 100× minder fouten)'], ['Herkenning', 'MutSα = MSH2 + MSH6'], ['Knippen', 'MutLα = MLH1 + PMS2, geactiveerd door PCNA'], ['Structuur', 'PDB 2O8B: menselijk MutSα op een G·T-paring (2,75 Å)']],
      why: 'Zonder MMR loopt het aantal mutaties sterk op, vooral in herhaalde stukjes DNA (microsatellietinstabiliteit). Erfelijke defecten in MMR-genen veroorzaken het Lynch-syndroom (erfelijke darmkanker zonder poliepen, HNPCC); bij ongeveer de helft van de bekende families ligt de oorzaak in MutSα.',
    },
    en: {
      kort: 'When copying, the [[polymerase|polymerase]] sometimes puts in a wrong letter. Usually the enzyme notices this itself and removes the letter at once. If an error still escapes, a second team of proteins finds the wrong pairing, cuts the stretch out of the new strand and makes it again.',
      what: 'The accuracy of replication comes from three steps in a row: the polymerase picks the right base, proofreads itself, and whatever still escapes is corrected by mismatch repair (MMR). MMR has to know which strand is new, because only there is the error.',
      how: [
        "Proofreading: Pol δ and Pol ε have a 3'→5' exonuclease that immediately removes a wrong base that was just built in.",
        'MutSα (MSH2–MSH6) slides along the DNA and recognises a wrong base pair (e.g. G·T) or a small insertion/deletion. In structure 2O8B, Phe432 of MSH6 pushes against the mispair and the DNA is kinked.',
        'PCNA, loaded onto the DNA by RFC, activates MutLα (MLH1–PMS2) to nick the new strand. The new strand is recognised by its discontinuities (e.g. the ends of Okazaki fragments) and by the orientation of PCNA.',
        "EXO1 degrades the new strand (5'→3') until past the error; another route uses strand displacement by Pol δ.",
        'Pol δ makes the stretch again using the old strand as template; a ligase seals the strand.',
      ],
      facts: [['Errors before proofreading', '≈ 1 per 10⁴–10⁵ bases (in vitro)'], ['MMR efficiency', 'on average ≈ 99 % (≈ 100× fewer errors)'], ['Recognition', 'MutSα = MSH2 + MSH6'], ['Nicking', 'MutLα = MLH1 + PMS2, activated by PCNA'], ['Structure', 'PDB 2O8B: human MutSα on a G·T mispair (2.75 Å)']],
      why: 'Without MMR the number of mutations rises sharply, especially in repeated stretches of DNA (microsatellite instability). Inherited defects in MMR genes cause Lynch syndrome (hereditary nonpolyposis colorectal cancer, HNPCC); in about half of the known families the cause lies in MutSα.',
    },
    sources: [KUNKEL, BURGERS, WARREN, PDB('2O8B', 'human MutSα (MSH2/MSH6) bound to ADP and a G·T mispair')],
  },

  ber: {
    nl: {
      kort: 'Soms verandert één letter vanzelf, bijvoorbeeld een C die een U wordt. Een herstelenzym klapt die ene letter uit het DNA en knipt ze los. Daarna zetten andere enzymen de juiste letter terug en plakken ze de streng weer dicht.',
      what: 'Base-excisieherstel (BER) verwijdert kleine schade aan één base, zoals uracil (U) in DNA, oxidatie (8-oxoG) of alkylering. Een gespecialiseerde DNA-glycosylase herkent de foute base, klapt ze uit de helix in haar eigen holte en knipt de binding tussen base en suiker. De andere streng dient als voorbeeld om de juiste base terug te zetten.',
      how: [
        'Oorzaak: cytosine verliest spontaan een aminogroep (deaminatie) en wordt uracil. U paart met A: na een kopie zou C·G zo T·A worden.',
        'Een DNA-glycosylase (voor uracil: UNG/UDG) klapt de U uit de helix en knipt de N-glycosidische binding: er blijft een abasische plaats (AP-plaats) over.',
        "APE1 knipt de ruggengraat aan de 5'-kant van de AP-plaats.",
        "Pol β zet één nieuwe nucleotide (hier C, tegenover G) en verwijdert met een tweede activiteit de losse suikerrest (5'-dRP).",
        'Een ligase (ligase IIIα–XRCC1 of ligase I) sluit de streng. Dit is de korte-patchroute (1 nt); bij de lange-patchroute worden 2–10 nt vervangen.',
      ],
      facts: [['Schade', 'één base: U, 8-oxoG, gealkyleerde basen, …'], ['Eerste enzym', 'DNA-glycosylase (minstens 11 soorten bij zoogdieren)'], ['Korte patch', '1 nucleotide (Pol β)'], ['Lange patch', '2–10 nucleotiden'], ['Structuur', 'PDB 1EMH: menselijk UDG met uitgeklapte (niet-knipbare) pseudo-uridine']],
      why: 'Deze kleine schade ontstaat in elke cel voortdurend. Zonder BER zouden U·G-paren bij de volgende kopie C→T-mutaties geven. Het eerste enzym voor uracil, UNG, is van alle DNA-glycosylasen veruit het snelste.',
    },
    en: {
      kort: 'Sometimes one letter changes by itself, for example a C that becomes a U. A repair enzyme flips that single letter out of the DNA and cuts it loose. Then other enzymes put back the right letter and seal the strand again.',
      what: 'Base excision repair (BER) removes small damage to a single base, such as uracil (U) in DNA, oxidation (8-oxoG) or alkylation. A specialised DNA glycosylase recognises the wrong base, flips it out of the helix into its own pocket and cuts the bond between base and sugar. The other strand serves as the template for putting back the right base.',
      how: [
        'Cause: cytosine spontaneously loses an amino group (deamination) and becomes uracil. U pairs with A: after one copy, C·G would become T·A.',
        'A DNA glycosylase (for uracil: UNG/UDG) flips the U out of the helix and cuts the N-glycosidic bond: an abasic site (AP site) is left.',
        "APE1 cuts the backbone on the 5' side of the AP site.",
        "Pol β inserts one new nucleotide (here C, opposite G) and with a second activity removes the loose sugar remnant (5'-dRP).",
        'A ligase (ligase IIIα–XRCC1 or ligase I) seals the strand. This is the short-patch route (1 nt); in the long-patch route 2–10 nt are replaced.',
      ],
      facts: [['Damage', 'one base: U, 8-oxoG, alkylated bases, …'], ['First enzyme', 'DNA glycosylase (at least 11 kinds in mammals)'], ['Short patch', '1 nucleotide (Pol β)'], ['Long patch', '2–10 nucleotides'], ['Structure', 'PDB 1EMH: human UDG with a flipped-out (non-cleavable) pseudouridine']],
      why: 'This small damage arises in every cell all the time. Without BER, U·G pairs would give C→T mutations at the next copy. The first enzyme for uracil, UNG, is by far the fastest of all DNA glycosylases.',
    },
    sources: [KROKAN, PARIKH, PDB('1EMH', 'human uracil-DNA glycosylase bound to uncleaved substrate-containing DNA'), ALB_REPAIR],
  },

  ner: {
    nl: {
      kort: 'UV-licht kan twee T’s naast elkaar aan elkaar koppelen. Dat maakt een bult in het DNA. Eiwitten zien die bult, knippen aan beide kanten een stukje streng weg en bouwen het opnieuw, met de andere streng als voorbeeld.',
      what: 'Nucleotide-excisieherstel (NER) verwijdert grote letsels die de dubbele helix vervormen: UV-schade (cyclobutaan-pyrimidinedimeren en 6-4-fotoproducten) en omvangrijke chemische adducten. In plaats van één base wordt een stuk enkelstrengig DNA met het letsel weggeknipt.',
      how: [
        'Herkenning in het hele genoom (GG-NER): XPC–RAD23B, soms geholpen door UV-DDB. In genen die afgeschreven worden (TC-NER) stopt RNA-polymerase II bij het letsel; CSA, CSB en XAB2 roepen dan de herstelploeg op.',
        'TFIIH opent het DNA rond het letsel (subeenheid XPB); XPA en RPA binden. RPA bedekt de onbeschadigde streng en plaatst de twee knipenzymen.',
        "Dubbele incisie: eerst knipt ERCC1–XPF aan de 5'-kant, daarna XPG aan de 3'-kant. Een stuk van 24–32 nucleotiden met het letsel komt vrij.",
        'Pol δ, Pol ε of Pol κ (met PCNA) vult het gat op met de andere streng als matrijs; ligase IIIα–XRCC1 of ligase I sluit.',
      ],
      facts: [['Letsels', 'UV-dimeren (CPD, 6-4PP), omvangrijke adducten'], ['Uitgeknipt', '24–32 nt'], ['Herkenning', 'XPC–RAD23B (globaal) of vastgelopen RNA-pol II (transcriptie)'], ['Ziekte', 'xeroderma pigmentosum: > 2 000× meer kans op huidkanker'], ['3D-structuur', 'PDB 6RO4: kern van TFIIH (o.a. XPB en XPD) met XPA op gedeeltelijk geopend DNA, cryo-EM 3,5 Å']],
      why: 'NER is het enige herstel voor UV-schade bij de mens. Mensen met xeroderma pigmentosum (een defect in een XP-gen) zijn extreem gevoelig voor zonlicht en krijgen veel vaker huidkanker. NER verwijdert ook schade door sommige chemotherapieën.',
    },
    en: {
      kort: 'UV light can link two neighbouring Ts together. That makes a bump in the DNA. Proteins spot the bump, cut away a short piece of strand on both sides and build it again, with the other strand as a guide.',
      what: 'Nucleotide excision repair (NER) removes large lesions that distort the double helix: UV damage (cyclobutane pyrimidine dimers and 6-4 photoproducts) and bulky chemical adducts. Instead of one base, a piece of single-stranded DNA carrying the lesion is cut out.',
      how: [
        'Recognition throughout the genome (GG-NER): XPC–RAD23B, sometimes helped by UV-DDB. In genes being transcribed (TC-NER), RNA polymerase II stalls at the lesion; CSA, CSB and XAB2 then call in the repair team.',
        'TFIIH opens the DNA around the lesion (subunit XPB); XPA and RPA bind. RPA covers the undamaged strand and positions the two cutting enzymes.',
        "Dual incision: first ERCC1–XPF cuts on the 5' side, then XPG on the 3' side. A piece of 24–32 nucleotides carrying the lesion is released.",
        'Pol δ, Pol ε or Pol κ (with PCNA) fills the gap using the other strand as template; ligase IIIα–XRCC1 or ligase I seals.',
      ],
      facts: [['Lesions', 'UV dimers (CPD, 6-4PP), bulky adducts'], ['Excised', '24–32 nt'], ['Recognition', 'XPC–RAD23B (global) or stalled RNA pol II (transcription)'], ['Disease', 'xeroderma pigmentosum: > 2,000× higher risk of skin cancer'], ['3D structure', 'PDB 6RO4: core of TFIIH (including XPB and XPD) with XPA on partly opened DNA, cryo-EM 3.5 Å']],
      why: 'NER is the only repair for UV damage in humans. People with xeroderma pigmentosum (a defect in an XP gene) are extremely sensitive to sunlight and get skin cancer far more often. NER also removes damage caused by some chemotherapy drugs.',
    },
    sources: [SCHARER, REARDON, ALB_REPAIR, KOKIC, PDB('6RO4', 'Structure of the core TFIIH-XPA-DNA complex (3D-stappen)')],
  },

  dsb: {
    nl: {
      kort: 'Bij een dubbelstrengbreuk is het DNA in twee stukken. De cel kan de uiteinden snel weer aan elkaar zetten, maar verliest daarbij soms een paar letters. Na het kopiëren kan ze ook de identieke kopie van het [[chromosoom|chromosoom]] als voorbeeld gebruiken: trager, maar nauwkeurig.',
      what: 'Een dubbelstrengbreuk (DSB) is een van de gevaarlijkste DNA-letsels: er is geen intacte complementaire streng meer op die plek. Mensencellen hebben twee hoofdroutes. Niet-homologe eindverbinding (NHEJ) zet de uiteinden direct weer aan elkaar, in elke fase van de celcyclus. Homologe recombinatie (HR) kopieert de ontbrekende informatie van de zusterchromatide en werkt dus alleen in S en G2.',
      how: [
        'NHEJ: de ring Ku70–Ku80 schuift op elk uiteinde; Ku raakt de basen niet maar houdt de helix op zijn plaats en roept de andere eiwitten op.',
        'DNA-PKcs bindt Ku en activeert Artemis, dat niet-passende uiteinden bijknipt. XRCC4–ligase IV (met XLF/PAXX) zet de uiteinden aan elkaar. Vaak gaan daarbij een paar nucleotiden verloren.',
        "HR: MRN–CtIP, EXO1 en DNA2 knippen de 5'-strengen terug (resectie); de vrije 3'-staarten worden eerst door RPA bedekt.",
        'BRCA2 brengt RAD51 op het enkelstrengige DNA; het RAD51-filament zoekt de passende volgorde op de zusterchromatide en dringt binnen (D-lus).',
        'Een polymerase kopieert de ontbrekende letters van de zuster. Bij SDSA (een HR-variant waarbij maar één uiteinde binnendringt) keert de verlengde streng terug, paart met het andere uiteinde en het gat wordt opgevuld.',
      ],
      facts: [['NHEJ', 'elke fase · ≈ 30 min · kan letters verliezen'], ['HR', 'S/G2 · ≥ 7 uur · zusterchromatide als matrijs'], ['Verhouding in S/G2', 'NHEJ : HR ≈ 4 : 1'], ['Ku', 'ring die ≈ 2 windingen DNA steunt (PDB 1JEY)'], ['HR-genen', 'BRCA1, BRCA2, RAD51'], ['RAD51-draad', 'elk RAD51 houdt 3 letters vast (PDB 8BQ2, cryo-EM 3,8 Å)']],
      why: 'Eén onherstelde breuk kan een stuk chromosoom doen verdwijnen of chromosomen verkeerd doen samenkomen. Erfelijke BRCA1/2-mutaties schakelen HR uit en verhogen de kans op borst- en eierstokkanker sterk. Immuuncellen gebruiken NHEJ ook bewust om antistofgenen samen te stellen.',
    },
    en: {
      kort: 'In a double-strand break the DNA is in two pieces. The cell can quickly join the ends again, but sometimes loses a few letters in the process. After copying, it can also use the identical copy of the [[chromosome|chromosoom]] as a guide: slower, but accurate.',
      what: 'A double-strand break (DSB) is one of the most dangerous DNA lesions: at that spot there is no intact complementary strand left. Human cells have two main routes. Non-homologous end joining (NHEJ) joins the ends directly, in every phase of the cell cycle. Homologous recombination (HR) copies the missing information from the sister chromatid and therefore only works in S and G2.',
      how: [
        'NHEJ: the ring Ku70–Ku80 slides onto each end; Ku does not touch the bases but holds the helix in place and recruits the other proteins.',
        'DNA-PKcs binds Ku and activates Artemis, which trims ends that do not fit. XRCC4–ligase IV (with XLF/PAXX) joins the ends. Often a few nucleotides are lost.',
        "HR: MRN–CtIP, EXO1 and DNA2 trim back the 5' strands (resection); the free 3' tails are first coated by RPA.",
        'BRCA2 brings RAD51 onto the single-stranded DNA; the RAD51 filament searches for the matching sequence on the sister chromatid and invades it (D-loop).',
        'A polymerase copies the missing letters from the sister. In SDSA (an HR variant in which only one end invades) the extended strand returns, pairs with the other end and the gap is filled in.',
      ],
      facts: [['NHEJ', 'any phase · ≈ 30 min · may lose letters'], ['HR', 'S/G2 · ≥ 7 hours · sister chromatid as template'], ['Ratio in S/G2', 'NHEJ : HR ≈ 4 : 1'], ['Ku', 'ring that supports ≈ 2 turns of DNA (PDB 1JEY)'], ['HR genes', 'BRCA1, BRCA2, RAD51'], ['RAD51 filament', 'each RAD51 holds 3 letters (PDB 8BQ2, cryo-EM 3.8 Å)']],
      why: 'One unrepaired break can make a piece of chromosome disappear or join chromosomes the wrong way. Inherited BRCA1/2 mutations switch off HR and greatly raise the risk of breast and ovarian cancer. Immune cells also use NHEJ on purpose to assemble antibody genes.',
    },
    sources: [CHANG, MAO, SULLIVAN, WALKER, PDB('1JEY', 'Ku heterodimer bound to DNA'), APPLEBY, PDB('8BQ2', 'Pre-synaptic RAD51 nucleoprotein filament (3D-stappen)'), ALB_REPAIR],
  },

  p53: {
    nl: {
      kort: 'p53 is een eiwit dat alarm slaat bij DNA-schade. Het zet genen aan die de celdeling pauzeren, zodat er tijd is om te herstellen. Is de schade te groot, dan laat p53 de cel zichzelf opruimen. In veel tumoren is het gen voor p53 kapot.',
      what: 'p53 is een [[transcriptiefactor|transcriptiefactor]] die de "bewaker van het genoom" genoemd wordt. Zonder stress houdt MDM2 de hoeveelheid p53 laag door het te laten afbreken. Bij DNA-schade wordt p53 gestabiliseerd en bindt het DNA-responselementen van genen die de celcyclus stilleggen, herstel helpen of apoptose starten.',
      how: [
        'Een dubbelstrengbreuk activeert via het MRN-complex de kinase ATM; enkelstrengig DNA (bedekt door RPA) activeert ATR. Ze fosforyleren o.a. CHK2 en CHK1.',
        'ATM en ATR fosforyleren p53 (o.a. op serine 15; ook serine 20 wordt gefosforyleerd). Daardoor laat MDM2 los en wordt p53 niet meer afgebroken: p53 stapelt zich op.',
        'p53 zet o.a. het gen voor p21 aan, een remmer van cyclineafhankelijke kinasen: de cel stopt in G1 en heeft tijd om te herstellen.',
        'Bij ernstige schade zet p53 genen voor apoptose aan (o.a. PUMA, NOXA, BAX) of gaat de cel in senescentie (blijvende stop).',
        'Het kerndomein van p53 bindt het DNA: een lus-blad-helixmotief in de grote groef en arginine 248 in de kleine groef; een zinkatoom houdt twee lussen bij elkaar (PDB 1TUP).',
      ],
      facts: [['Vaakst gemuteerd gen in kanker', 'TP53: 42 % van de tumoren in 12 kankertypes'], ['Per kankertype', 'van ≈ 5 % tot 38–50 % (bv. eierstok, slokdarm, darm, long)'], ['Soort mutaties', 'meestal missense; 87,9 % in codons 125–300 (DNA-bindend deel)'], ['Hotspots', 'contact: R248, R273 · structuur: R175, G245, R249, R282'], ['Structuur', 'PDB 1TUP: drie p53-kerndomeinen op DNA (2,2 Å)']],
      why: 'Omdat p53 beslist tussen herstellen en opruimen, verliezen tumoren het vaak als eerste veiligheid. De meeste TP53-mutaties veranderen één aminozuur in het DNA-bindende deel, zodat p53 zijn doelgenen niet meer kan aanzetten. Dat verklaart waarom TP53 het vaakst gemuteerde gen in kanker is.',
    },
    en: {
      kort: 'p53 is a protein that raises the alarm when DNA is damaged. It switches on genes that pause cell division, so there is time to repair. If the damage is too great, p53 makes the cell clear itself away. In many tumours the gene for p53 is broken.',
      what: 'p53 is a [[transcription factor|transcriptiefactor]] known as the "guardian of the genome". Without stress, MDM2 keeps the amount of p53 low by having it degraded. On DNA damage p53 is stabilised and binds the DNA response elements of genes that halt the cell cycle, help repair or start apoptosis.',
      how: [
        'A double-strand break activates the kinase ATM via the MRN complex; single-stranded DNA (coated by RPA) activates ATR. They phosphorylate CHK2 and CHK1, among others.',
        'ATM and ATR phosphorylate p53 (e.g. on serine 15; serine 20 is phosphorylated too). As a result MDM2 lets go and p53 is no longer degraded: p53 accumulates.',
        'p53 switches on the gene for p21, among others, an inhibitor of cyclin-dependent kinases: the cell stops in G1 and has time to repair.',
        'With severe damage p53 switches on genes for apoptosis (e.g. PUMA, NOXA, BAX) or the cell enters senescence (a permanent stop).',
        'The core domain of p53 binds the DNA: a loop-sheet-helix motif in the major groove and arginine 248 in the minor groove; a zinc atom holds two loops together (PDB 1TUP).',
      ],
      facts: [['Most frequently mutated gene in cancer', 'TP53: 42 % of tumours across 12 cancer types'], ['Per cancer type', 'from ≈ 5 % to 38–50 % (e.g. ovary, oesophagus, colon, lung)'], ['Kind of mutations', 'mostly missense; 87.9 % in codons 125–300 (DNA-binding part)'], ['Hotspots', 'contact: R248, R273 · structural: R175, G245, R249, R282'], ['Structure', 'PDB 1TUP: three p53 core domains on DNA (2.2 Å)']],
      why: 'Because p53 decides between repairing and clearing away, tumours often lose it as their first safeguard. Most TP53 mutations change one amino acid in the DNA-binding part, so p53 can no longer switch on its target genes. That explains why TP53 is the most frequently mutated gene in cancer.',
    },
    sources: [GNANA, KUMARI, KANDOTH, OLIVIER, CHO, LANE, PDB('1TUP', 'tumor suppressor p53 complexed with DNA')],
  },
};
