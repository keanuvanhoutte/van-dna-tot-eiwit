/* Uitleg per knoop voor het zijpad "Waar een eiwit heen gaat en hoe het verdwijnt" (05-11-2026) — zie app/SCENES.md.
 * Nagekeken in docs/verificatie-ronde-8-eiwittargeting.md. */
const SHAO = { t: 'Shao & Hegde (2011) Membrane protein insertion at the endoplasmic reticulum. Annu Rev Cell Dev Biol 27:25 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4163802/' };
const ITSK = { t: 'Itskanov et al. (2023) A common mechanism of Sec61 translocon inhibition by small molecules. Nat Chem Biol 19:1063–1071 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11458068/' };
const UNI_SEC61 = { t: 'UniProt P61619 — SEC61A1 (topologie, transmembraanhelices)', url: 'https://www.uniprot.org/uniprotkb/P61619/entry' };
const LANGE = { t: 'Lange et al. (2007) Classical nuclear localization signals: definition, function, and interaction with importin α. J Biol Chem 282:5101 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4502416/' };
const PFANNER = { t: 'Pfanner, Warscheid & Wiedemann (2019) Mitochondrial proteins: from biogenesis to functional networks. Nat Rev Mol Cell Biol 20:267 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6684368/' };
const MITOCARTA = { t: 'Rath et al. (2021) MitoCarta3.0: an updated mitochondrial proteome. Nucleic Acids Res 49:D1541 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7778944/' };
const ANDERSON = { t: 'Anderson et al. (1981) Sequence and organization of the human mitochondrial genome. Nature 290:457 (PubMed 7219534)', url: 'https://pubmed.ncbi.nlm.nih.gov/7219534/' };
const GUAN = { t: 'Guan et al. (2021) Structural insights into assembly of human mitochondrial translocase TOM complex. Cell Discov 7:22 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8041818/' };
const GOULD = { t: 'Gould, Keller & Subramani (1988) Identification of peroxisomal targeting signals located at the carboxy terminus of four peroxisomal proteins. J Cell Biol 107:897 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2115268/' };
const WALTON = { t: 'Walton, Hill & Subramani (1995) Import of stably folded proteins into peroxisomes. Mol Biol Cell 6:675 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC301228/' };
const RAPP = { t: 'Skowyra, Feng & Rapoport (2024) Towards solving the mystery of peroxisomal matrix protein import. Trends Cell Biol 34:388 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10957506/' };
const THOMS = { t: 'Thoms (2015) Import of proteins into peroxisomes: piggybacking to a new home away from home. Open Biol 5:150148 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4680570/' };
const BRAV = { t: 'Braverman et al. (2016) Peroxisome biogenesis disorders in the Zellweger spectrum: an overview. Mol Genet Metab 117:313 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5214431/' };
const BRAULKE = { t: 'Braulke & Bonifacino (2009) Sorting of lysosomal proteins. Biochim Biophys Acta 1793:605 (PubMed 19046998)', url: 'https://pubmed.ncbi.nlm.nih.gov/19046998/' };
const MINDELL = { t: 'Mindell (2012) Lysosomal acidification mechanisms. Annu Rev Physiol 74:69 (PubMed 22335796)', url: 'https://pubmed.ncbi.nlm.nih.gov/22335796/' };
const MLREV = { t: 'Khan & Tomatsu (2020) Mucolipidoses overview: past, present, and future. Int J Mol Sci 21:6812 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7555117/' };
const POMPE = { t: 'Schoser (2026) Defining the therapeutic corridor of stability in enzyme replacement therapy for Pompe disease: a position statement. Orphanet J Rare Dis 21:259 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC13428432/' };
const YIM = { t: 'Yim & Mizushima (2020) Lysosome biology in autophagy. Cell Discov 6:6 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7010707/' };
const BARD = { t: 'Bard et al. (2018) Structure and function of the 26S proteasome. Annu Rev Biochem 87:697 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6422034/' };
const DONG = { t: 'Dong et al. (2019) Cryo-EM structures and dynamics of substrate-engaged human 26S proteasome. Nature 565:49 (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6370054/' };
const KISSELEV = { t: 'Kisselev et al. (1999) The sizes of peptides generated from protein by mammalian 26 and 20 S proteasomes. J Biol Chem 274:3363 (PubMed 9920878)', url: 'https://pubmed.ncbi.nlm.nih.gov/9920878/' };
const MIZU = { t: 'Mizushima (2007) Autophagy: process and function. Genes Dev 21:2861 (PubMed 18006683)', url: 'https://pubmed.ncbi.nlm.nih.gov/18006683/' };
const DIKIC = { t: 'Dikic & Elazar (2018) Mechanism and medical implications of mammalian autophagy. Nat Rev Mol Cell Biol 19:349 (PubMed 29618831)', url: 'https://pubmed.ncbi.nlm.nih.gov/29618831/' };
const HARA = { t: 'Hara et al. (2006) Suppression of basal autophagy in neural cells causes neurodegenerative disease in mice. Nature 441:885 (PubMed 16625204)', url: 'https://pubmed.ncbi.nlm.nih.gov/16625204/' };
const PDB = (id, t) => ({ t: `RCSB PDB ${id} — ${t}`, url: `https://www.rcsb.org/structure/${id}` });

export default {
  sortering: {
    nl: {
      kort: 'Bijna elk eiwit wordt in het cytosol gemaakt. Een kort stukje in de keten werkt als adreslabel en bepaalt waar het eiwit heen gaat. Zonder label blijft het in het cytosol.',
      what: 'Sorteersignalen zijn korte stukken aminozuurvolgorde die door receptoren herkend worden. Elk organel heeft zijn eigen soort signaal en zijn eigen invoermachine. Het lysosoom vormt een uitzondering: zijn enzymen gaan eerst via het ER en het Golgi en krijgen daar een suikerlabel.',
      how: [
        'ER: een N-terminaal signaalpeptide met een hydrofobe kern wordt tijdens de translatie herkend (SRP); het eiwit gaat het ER in of in het ER-membraan.',
        'Kern: een klassiek NLS (korte basische stukjes, rijk aan lysine en arginine) wordt herkend door importine α/β; het mag overal in het eiwit liggen.',
        'Mitochondrion: een N-terminale presequentie vormt een positief geladen amfipathische helix, herkend door Tom20 en Tom22.',
        'Peroxisoom: PTS1 = de laatste drie aminozuren Ser-Lys-Leu (of een variant), herkend door de receptor PEX5.',
        'Lysosoom: zure hydrolasen krijgen in het Golgi een mannose-6-fosfaat op hun suikerboom en worden door M6P-receptoren weggebracht.',
      ],
      facts: [['ER-signaal', 'N-terminaal, hydrofoob'], ['NLS', 'basisch, kan intern liggen'], ['Presequentie', 'N-terminaal, positief, amfipathisch'], ['PTS1', 'C-terminaal S-K-L'], ['Lysosoom', 'mannose-6-fosfaat (Golgi)']],
      why: 'Een eiwit werkt alleen op de juiste plek. Fouten in sorteren geven ziekten, zoals I-celziekte (lysosoomenzymen zonder label) of het Zellweger-spectrum (geen werkende peroxisomen).',
    },
    en: {
      kort: 'Almost every protein is made in the cytosol. A short stretch of the chain acts as an address label and decides where the protein goes. Without a label it stays in the cytosol.',
      what: 'Sorting signals are short stretches of amino-acid sequence that are recognised by receptors. Each organelle has its own kind of signal and its own import machine. The lysosome is an exception: its enzymes first go via the ER and the Golgi, where they get a sugar tag.',
      how: [
        'ER: an N-terminal signal peptide with a hydrophobic core is recognised during translation (SRP); the protein enters the ER or the ER membrane.',
        'Nucleus: a classical NLS (short basic stretches, rich in lysine and arginine) is recognised by importin α/β; it can lie anywhere in the protein.',
        'Mitochondrion: an N-terminal presequence forms a positively charged amphipathic helix, recognised by Tom20 and Tom22.',
        'Peroxisome: PTS1 = the last three amino acids Ser-Lys-Leu (or a variant), recognised by the receptor PEX5.',
        'Lysosome: acid hydrolases get a mannose 6-phosphate on their sugar tree in the Golgi and are carried off by M6P receptors.',
      ],
      facts: [['ER signal', 'N-terminal, hydrophobic'], ['NLS', 'basic, may be internal'], ['Presequence', 'N-terminal, positive, amphipathic'], ['PTS1', 'C-terminal S-K-L'], ['Lysosome', 'mannose 6-phosphate (Golgi)']],
      why: 'A protein only works in the right place. Sorting errors cause diseases, such as I-cell disease (lysosomal enzymes without a tag) or the Zellweger spectrum (no working peroxisomes).',
    },
    sources: [SHAO, LANGE, PFANNER, GOULD, RAPP, BRAULKE, MLREV],
  },
  membraan: {
    nl: {
      kort: 'Membraaneiwitten worden in het ER-membraan gebouwd. Een vettig stuk van ongeveer 20 aminozuren stopt in het kanaal en glipt via een zijdeur het membraan in. Daarna reist het eiwit mee in het membraan.',
      what: 'Integrale membraaneiwitten hebben één of meer transmembraansegmenten (TMD\'s): hydrofobe α-helices van ongeveer 20 aminozuren, net lang genoeg voor de ~30 Å dikke ER-membraan. Het Sec61-kanaal heeft naast de opening naar het lumen ook een laterale poort naar de lipidelaag.',
      how: [
        'Het ribosoom zit op het Sec61-kanaal (α, β en γ); de groeiende keten gaat door het kanaal naar het lumen.',
        'Komt een hydrofoob segment in het kanaal, dan stopt de doorgang (stop-transfer) en verlaat het segment het kanaal zijdelings via de laterale poort, gevormd door vooral helix 2 en helix 7 van Sec61α.',
        'Na een geknipt signaalpeptide krijgt zo\'n intern segment een type I-oriëntatie: N-uiteinde in het lumen, C-uiteinde in het cytosol.',
        'Ook de flankerende ladingen spelen mee: positieve ladingen liggen meestal aan de cytosolkant (positive-inside rule).',
        'Vesikels nemen het eiwit mee naar het Golgi; de kant die in het ER-lumen lag, blijft aan de binnenkant van het blaasje.',
      ],
      facts: [['TMD', '≈ 20 aminozuren, α-helix'], ['Membraandikte', '≈ 30 Å (3 nm)'], ['Laterale poort', 'helix 2 en 7 van Sec61α'], ['Structuur', 'PDB 8DNV: menselijk Sec61, cryo-EM 3,03 Å']],
      why: 'Receptoren, kanalen en transporters zijn membraaneiwitten, en hun oriëntatie bepaalt welke kant naar buiten wijst. De laterale poort is ook een doelwit voor geneesmiddelen: verschillende natuurlijke remmers binden precies daar.',
    },
    en: {
      kort: 'Membrane proteins are built into the ER membrane. A greasy stretch of about 20 amino acids stops in the channel and slips through a side gate into the membrane. Then the protein travels along in the membrane.',
      what: 'Integral membrane proteins have one or more transmembrane segments (TMDs): hydrophobic α-helices of about 20 amino acids, just long enough for the ~30 Å thick ER membrane. Besides its opening to the lumen, the Sec61 channel has a lateral gate to the lipid bilayer.',
      how: [
        'The ribosome sits on the Sec61 channel (α, β and γ); the growing chain passes through the channel into the lumen.',
        'When a hydrophobic segment enters the channel, passage stops (stop transfer) and the segment leaves the channel sideways via the lateral gate, formed mainly by helix 2 and helix 7 of Sec61α.',
        'After a cleaved signal peptide such an internal segment takes a type I orientation: N terminus in the lumen, C terminus in the cytosol.',
        'Flanking charges also matter: positive charges usually lie on the cytosolic side (positive-inside rule).',
        'Vesicles carry the protein to the Golgi; the side that faced the ER lumen stays on the inside of the vesicle.',
      ],
      facts: [['TMD', '≈ 20 amino acids, α-helix'], ['Membrane thickness', '≈ 30 Å (3 nm)'], ['Lateral gate', 'helix 2 and 7 of Sec61α'], ['Structure', 'PDB 8DNV: human Sec61, cryo-EM 3.03 Å']],
      why: 'Receptors, channels and transporters are membrane proteins, and their orientation decides which side faces outwards. The lateral gate is also a drug target: several natural inhibitors bind right there.',
    },
    sources: [SHAO, ITSK, UNI_SEC61, PDB('8DNV', 'human Sec61 complex, partially open apo state')],
  },
  lysosoom: {
    nl: {
      kort: 'Het lysosoom is het verteerblaasje van de cel, vol knipenzymen en zuur (pH 4,5–5). De enzymen vinden de weg dankzij een suikerlabel dat ze in het Golgi krijgen. Ontbreekt dat label, dan raakt het lysosoom verstopt.',
      what: 'De meeste oplosbare zure hydrolasen worden in het Golgi gemerkt met mannose-6-fosfaat (M6P). M6P-receptoren herkennen dat merkteken en brengen de enzymen naar het endosoom-lysosoomsysteem. Lysosomen bevatten meer dan 60 verschillende hydrolasen.',
      how: [
        'In het cis-Golgi zet GlcNAc-1-fosfotransferase (genen GNPTAB en GNPTG) GlcNAc-1-fosfaat op bepaalde mannoseresten.',
        'Een tweede enzym ("uncovering enzyme") haalt de GlcNAc eraf: het M6P komt vrij te liggen in het trans-Golgi.',
        'M6P-receptoren binden de enzymen en verpakken ze in blaasjes naar het endosoom; de receptoren keren terug.',
        'Een V-ATPase pompt protonen in het lysosoom: het zure milieu (pH 4,5–5) activeert de hydrolasen.',
        'Andere lysosoomeiwitten gebruiken andere ontvangers (bv. LIMP-2, sortiline) of signalen in hun cytosolstaart.',
      ],
      facts: [['pH binnen', '4,5–5,0'], ['Hydrolasen', '> 60 soorten'], ['Label', 'mannose-6-fosfaat'], ['Mucolipidose II', 'GlcNAc-1-fosfotransferase defect → enzymen uitgescheiden'], ['Pompe', 'zure α-glucosidase (GAA) ontbreekt → glycogeen']],
      why: 'Bij mucolipidose II (I-celziekte) ontbreekt het label: de enzymen worden de cel uit gestuurd (in het bloed zijn ze sterk verhoogd) en lysosomen vullen zich met onverteerd materiaal. Bij de ziekte van Pompe ontbreekt één enzym en blijft glycogeen in de lysosomen liggen; enzymvervangingstherapie is daar een behandeling.',
    },
    en: {
      kort: 'The lysosome is the cell’s digestive vesicle, full of cutting enzymes and acidic (pH 4.5–5). The enzymes find their way thanks to a sugar tag they get in the Golgi. If that tag is missing, the lysosome clogs up.',
      what: 'Most soluble acid hydrolases are marked in the Golgi with mannose 6-phosphate (M6P). M6P receptors recognise that mark and carry the enzymes to the endosome–lysosome system. Lysosomes contain more than 60 different hydrolases.',
      how: [
        'In the cis-Golgi, GlcNAc-1-phosphotransferase (genes GNPTAB and GNPTG) adds GlcNAc-1-phosphate to selected mannose residues.',
        'A second enzyme (the "uncovering enzyme") removes the GlcNAc: the M6P is exposed in the trans-Golgi.',
        'M6P receptors bind the enzymes and package them into vesicles to the endosome; the receptors return.',
        'A V-ATPase pumps protons into the lysosome: the acidic environment (pH 4.5–5) activates the hydrolases.',
        'Other lysosomal proteins use other receivers (e.g. LIMP-2, sortilin) or signals in their cytosolic tail.',
      ],
      facts: [['pH inside', '4.5–5.0'], ['Hydrolases', '> 60 kinds'], ['Tag', 'mannose 6-phosphate'], ['Mucolipidosis II', 'GlcNAc-1-phosphotransferase defect → enzymes secreted'], ['Pompe', 'acid α-glucosidase (GAA) missing → glycogen']],
      why: 'In mucolipidosis II (I-cell disease) the tag is missing: the enzymes are sent out of the cell (they are strongly raised in the blood) and lysosomes fill with undigested material. In Pompe disease one enzyme is missing and glycogen stays in the lysosomes; enzyme replacement therapy is a treatment there.',
    },
    sources: [BRAULKE, MLREV, MINDELL, YIM, POMPE],
  },
  mito: {
    nl: {
      kort: 'Het mitochondrion maakt zelf maar 13 eiwitten; meer dan duizend andere komen uit het cytosol. Een plus-spiraal vooraan leidt ze uitgerold door een poort in elk van de twee membranen. Binnen gaat het label eraf en vouwt het eiwit op.',
      what: 'Het menselijke mtDNA (16 569 bp) codeert 13 eiwitten, alle onderdelen van de ademhalingsketen of ATP-synthase. De rest van het mitochondriale proteoom (MitoCarta3.0: 1 136 menselijke genen) wordt in de kern gecodeerd, in het cytosol gemaakt en geïmporteerd. De presequentieroute vervoert ongeveer 60 % van die eiwitten.',
      how: [
        'De presequentie is een N-terminale, positief geladen amfipathische α-helix; Tom20 en Tom22 herkennen ze aan de buitenkant.',
        'Het eiwit gaat ontvouwen door het kanaal van Tom40 (TOM-complex, buitenmembraan); TOM40 is een β-ton.',
        'Het TIM23-complex in de binnenmembraan neemt het over; de membraanpotentiaal (Δψ, binnen negatief) activeert het kanaal en trekt de positieve presequentie naar binnen.',
        'De motor PAM met mtHsp70 trekt met ATP de rest van de keten de matrix in.',
        'MPP (mitochondrial processing peptidase) knipt de presequentie af; mtHsp70 en Hsp60–Hsp10 helpen het eiwit vouwen.',
      ],
      facts: [['mtDNA', '16 569 bp, 13 eiwitten'], ['Geïmporteerd', 'MitoCarta3.0: 1 136 genen (mens)'], ['Presequentieroute', '≈ 60 % van de mitochondriale eiwitten'], ['Structuur', 'PDB 7CP9: menselijk TOM-kerncomplex, cryo-EM 3,0 Å']],
      why: 'Daalt de membraanpotentiaal, bv. bij ziekten van de ademhalingsketen, dan stokt de invoer. Zo is import een gevoelige meter voor de gezondheid van het mitochondrion; beschadigde mitochondriën worden via mitofagie (een vorm van autofagie) opgeruimd.',
    },
    en: {
      kort: 'The mitochondrion makes only 13 proteins itself; more than a thousand others come from the cytosol. A plus spiral at the start leads them, unrolled, through a gate in each of the two membranes. Inside, the label comes off and the protein folds.',
      what: 'Human mtDNA (16,569 bp) encodes 13 proteins, all parts of the respiratory chain or ATP synthase. The rest of the mitochondrial proteome (MitoCarta3.0: 1,136 human genes) is encoded in the nucleus, made in the cytosol and imported. The presequence pathway carries about 60 % of those proteins.',
      how: [
        'The presequence is an N-terminal, positively charged amphipathic α-helix; Tom20 and Tom22 recognise it on the outside.',
        'The protein passes unfolded through the Tom40 channel (TOM complex, outer membrane); TOM40 is a β-barrel.',
        'The TIM23 complex in the inner membrane takes over; the membrane potential (Δψ, negative inside) activates the channel and pulls the positive presequence in.',
        'The PAM motor with mtHsp70 uses ATP to pull the rest of the chain into the matrix.',
        'MPP (mitochondrial processing peptidase) cuts off the presequence; mtHsp70 and Hsp60–Hsp10 help the protein fold.',
      ],
      facts: [['mtDNA', '16,569 bp, 13 proteins'], ['Imported', 'MitoCarta3.0: 1,136 genes (human)'], ['Presequence pathway', '≈ 60 % of mitochondrial proteins'], ['Structure', 'PDB 7CP9: human TOM core complex, cryo-EM 3.0 Å']],
      why: 'When the membrane potential drops, e.g. in respiratory-chain diseases, import stalls. Import is thus a sensitive gauge of mitochondrial health; damaged mitochondria are cleared by mitophagy (a form of autophagy).',
    },
    sources: [PFANNER, MITOCARTA, ANDERSON, GUAN, RAPP, PDB('7CP9', 'human mitochondrial TOM complex, 3.0 Å')],
  },
  perox: {
    nl: {
      kort: 'Een peroxisoom is een klein blaasje dat o.a. zeer lange vetzuren afbreekt. Zijn eiwitten dragen drie letters op het einde: S-K-L. Anders dan het ER en het mitochondrion neemt het peroxisoom eiwitten gevouwen op.',
      what: 'De meeste peroxisomale matrixeiwitten dragen het signaal PTS1 aan hun C-uiteinde: Ser-Lys-Leu of een variant. De oplosbare receptor PEX5 herkent het in het cytosol en brengt het eiwit naar binnen. Ook gevouwen eiwitten, met disulfidebruggen vastgezette eiwitten en zelfs complexen worden geïmporteerd.',
      how: [
        'Het TPR-domein van PEX5 bindt het PTS1-peptide in het cytosol.',
        'PEX5 met vracht wordt aan het peroxisoom gebonden door een complex met PEX13 en PEX14.',
        'PEX5 brengt de vracht door een doorgang die PEX13 vormt; het hoeft niet ontvouwen te worden.',
        'Daarna keert PEX5 terug naar het cytosol; daarvoor wordt het gemonoubiquitineerd op een cysteïne.',
        'Een tweede, zeldzamer signaal (PTS2, vooraan) wordt herkend door de adapter PEX7.',
      ],
      facts: [['PTS1', 'C-terminaal Ser-Lys-Leu (SKL) of variant'], ['Receptor', 'PEX5 (TPR-domein)'], ['Import', 'gevouwen, ook complexen'], ['Zellweger-spectrum', 'PEX-genen; PEX1 ≈ 70 % van de gevallen'], ['Frequentie', '≈ 1 op 50 000 geboorten (Noord-Amerika, schatting)']],
      why: 'Bij fouten in een van de PEX-genen worden peroxisomen niet goed gebouwd (Zellweger-spectrum). Zeer lange vetzuren (24 koolstofatomen of meer) stapelen op; het beeld gaat van ernstige neurologische problemen bij pasgeborenen tot een langzaam verlopende ziekte bij volwassenen.',
    },
    en: {
      kort: 'A peroxisome is a small vesicle that, among other things, breaks down very long fatty acids. Its proteins carry three letters at the end: S-K-L. Unlike the ER and the mitochondrion, the peroxisome takes up proteins folded.',
      what: 'Most peroxisomal matrix proteins carry the signal PTS1 at their C terminus: Ser-Lys-Leu or a variant. The soluble receptor PEX5 recognises it in the cytosol and brings the protein inside. Folded proteins, proteins locked by disulfide bonds and even complexes are imported.',
      how: [
        'The TPR domain of PEX5 binds the PTS1 peptide in the cytosol.',
        'Cargo-loaded PEX5 is recruited to the peroxisome by a complex with PEX13 and PEX14.',
        'PEX5 carries the cargo through a conduit formed by PEX13; it does not need to be unfolded.',
        'Then PEX5 returns to the cytosol; for this it is monoubiquitinated on a cysteine.',
        'A second, rarer signal (PTS2, at the start) is recognised by the adapter PEX7.',
      ],
      facts: [['PTS1', 'C-terminal Ser-Lys-Leu (SKL) or variant'], ['Receptor', 'PEX5 (TPR domain)'], ['Import', 'folded, complexes too'], ['Zellweger spectrum', 'PEX genes; PEX1 ≈ 70 % of cases'], ['Frequency', '≈ 1 in 50,000 births (North America, estimate)']],
      why: 'When one of the PEX genes is faulty, peroxisomes are not built properly (Zellweger spectrum). Very long fatty acids (24 carbons or more) pile up; the picture ranges from severe neurological problems in newborns to a slowly progressing disease in adults.',
    },
    sources: [GOULD, RAPP, WALTON, THOMS, BRAV],
  },
  proteasoom: {
    nl: {
      kort: 'Het proteasoom is een afgesloten buis die eiwitten in korte stukjes knipt. De knipplekken zitten binnenin, zodat gewone eiwitten veilig zijn. Een kap met zes motoren rolt het eiwit uit en duwt het naar binnen.',
      what: 'Het 26S-proteasoom (≈ 2,5 MDa) bestaat uit het 20S-kerndeeltje en een 19S-regulatordeeltje aan één of beide uiteinden. De 20S-kern is een vat van vier ringen van zeven (α7β7β7α7); de actieve plaatsen liggen in de kamer en zijn alleen bereikbaar via smalle poriën.',
      how: [
        'Ubiquitinereceptoren in de 19S-kap (o.a. Rpn1, Rpn10, Rpn13) binden het gelabelde eiwit.',
        'Rpn11, een zink-afhankelijke deubiquitinase in het deksel, haalt de ubiquitineketen eraf voordat het eiwit de motor ingaat.',
        'Zes verschillende AAA+-ATPasen (Rpt1–6) vormen een ring die met ATP het eiwit ontvouwt en de kern in duwt; daarbij gaat de poort van de α-ring open.',
        'In de β-ringen knippen β1 (na zure resten), β2 (na basische) en β5 (na hydrofobe) met hun N-terminale threonine (Thr1); per kern zijn er zes actieve plaatsen.',
        'Er komen peptiden van 3 tot 22 aminozuren uit, meestal kort; andere peptidasen breken ze verder af.',
      ],
      facts: [['Massa', '≈ 2,5 MDa'], ['20S-kern', '28 subeenheden: α7β7β7α7'], ['Actieve plaatsen', '6 (β1, β2, β5 ×2), Thr1'], ['Producten', '3–22 aminozuren'], ['Structuur', 'PDB 6MSB: mens, cryo-EM 3,0 Å']],
      why: 'Het proteasoom regelt de levensduur van talloze eiwitten, van celcyclusregelaars tot misgevouwen eiwitten. Omdat het zo centraal staat, worden de stappen (herkennen, label eraf, uitrollen) streng gecontroleerd voordat de afbraak echt begint.',
    },
    en: {
      kort: 'The proteasome is a closed tube that cuts proteins into short pieces. The cutting sites sit inside, so ordinary proteins are safe. A cap with six motors unrolls the protein and pushes it in.',
      what: 'The 26S proteasome (≈ 2.5 MDa) consists of the 20S core particle and a 19S regulatory particle at one or both ends. The 20S core is a barrel of four rings of seven (α7β7β7α7); the active sites lie in the chamber and are reachable only through narrow pores.',
      how: [
        'Ubiquitin receptors in the 19S cap (e.g. Rpn1, Rpn10, Rpn13) bind the tagged protein.',
        'Rpn11, a zinc-dependent deubiquitinase in the lid, removes the ubiquitin chain before the protein enters the motor.',
        'Six different AAA+ ATPases (Rpt1–6) form a ring that uses ATP to unfold the protein and push it into the core; the gate of the α ring opens in the process.',
        'In the β rings, β1 (after acidic residues), β2 (after basic) and β5 (after hydrophobic) cut with their N-terminal threonine (Thr1); each core has six active sites.',
        'Peptides of 3 to 22 amino acids come out, mostly short; other peptidases break them down further.',
      ],
      facts: [['Mass', '≈ 2.5 MDa'], ['20S core', '28 subunits: α7β7β7α7'], ['Active sites', '6 (β1, β2, β5 ×2), Thr1'], ['Products', '3–22 amino acids'], ['Structure', 'PDB 6MSB: human, cryo-EM 3.0 Å']],
      why: 'The proteasome sets the lifetime of countless proteins, from cell-cycle regulators to misfolded proteins. Because it is so central, its many steps (recognition, deubiquitination, unfolding) are tightly controlled before it commits to degradation.',
    },
    sources: [BARD, DONG, KISSELEV, PDB('6MSB', 'substrate-engaged human 26S proteasome')],
  },
  autofagie: {
    nl: {
      kort: 'Bij autofagie pakt de cel een stuk van zichzelf in een blaasje in, zoals een kapot mitochondrion of een klont eiwitten. Dat blaasje versmelt met het lysosoom en wordt verteerd. De bouwstenen worden hergebruikt.',
      what: 'Macroautofagie begint met een plat stuk membraan (fagofoor) dat rond cytoplasmatisch materiaal groeit, willekeurig of gericht via autofagiereceptoren. Het sluit tot een autofagosoom met dubbele membraan, dat met lysosomen versmelt. Doelwitten zijn o.a. eiwitaggregaten, ER, mitochondriën en beschadigde lysosomen.',
      how: [
        'Honger of stress: mTORC1 laat los van het lysosoom en wordt inactief; dat zet de start van autofagie aan.',
        'De fagofoor groeit en wordt een bol met één opening; het sluiten van die opening geeft het autofagosoom.',
        'LC3 zit op het autofagosoommembraan en helpt (samen met RAB7 op het lysosoom) bij het vastmaken en versmelten (SNARE-afhankelijk).',
        'Lysosomale enzymen breken de binnenmembraan en de inhoud af.',
        'De afbraakproducten (o.a. aminozuren) gaan terug naar het cytosol en worden opnieuw gebruikt.',
      ],
      facts: [['Start', 'honger: mTORC1 inactief'], ['Membraan', 'dubbel (autofagosoom)'], ['Merker', 'LC3'], ['Andere vormen', 'chaperonne-gemedieerde autofagie, microautofagie']],
      why: 'Basale autofagie ruimt voortdurend afwijkende eiwitten op. Muizen zonder autofagie in zenuwcellen (Atg5 uitgeschakeld) krijgen eiwitophopingen en neurodegeneratie, ook zonder ziektegen. Autofagie speelt daarom een rol bij o.a. kanker en hersenziekten.',
    },
    en: {
      kort: 'In autophagy the cell wraps a piece of itself in a vesicle, such as a damaged mitochondrion or a clump of proteins. That vesicle fuses with the lysosome and is digested. The building blocks are reused.',
      what: 'Macroautophagy starts with a flat piece of membrane (phagophore) that grows around cytoplasmic material, randomly or selectively via autophagy receptors. It closes into a double-membraned autophagosome, which fuses with lysosomes. Targets include protein aggregates, ER, mitochondria and damaged lysosomes.',
      how: [
        'Starvation or stress: mTORC1 dissociates from the lysosome and becomes inactive; this switches on the start of autophagy.',
        'The phagophore expands into a sphere with a single opening; sealing that opening gives the autophagosome.',
        'LC3 sits on the autophagosome membrane and helps (together with RAB7 on the lysosome) with tethering and fusion (SNARE-dependent).',
        'Lysosomal enzymes break down the inner membrane and the contents.',
        'The breakdown products (e.g. amino acids) return to the cytosol and are reused.',
      ],
      facts: [['Trigger', 'starvation: mTORC1 inactive'], ['Membrane', 'double (autophagosome)'], ['Marker', 'LC3'], ['Other forms', 'chaperone-mediated autophagy, microautophagy']],
      why: 'Basal autophagy constantly clears abnormal proteins. Mice lacking autophagy in nerve cells (Atg5 knocked out) develop protein inclusions and neurodegeneration, even without a disease gene. Autophagy therefore plays a role in e.g. cancer and brain diseases.',
    },
    sources: [YIM, MIZU, HARA, DIKIC],
  },
};
