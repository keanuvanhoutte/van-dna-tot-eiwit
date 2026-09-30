/* Uitleg per knoop voor stage 'rna' — zie app/SCENES.md */
const ALB_DNA_RNA = { t: 'Alberts et al., Molecular Biology of the Cell (4e) – From DNA to RNA (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK26887/' };
const ALB_POST = { t: 'Alberts et al., Molecular Biology of the Cell (4e) – Posttranscriptional Controls (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK26890/' };
const ALB_RNAWORLD = { t: 'Alberts et al., Molecular Biology of the Cell (4e) – The RNA World and the Origins of Life (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK26876/' };

export default {
  rnaprocessing: {
    nl: {
      what: 'Een pas gemaakt pre-mRNA is nog niet bruikbaar. Terwijl RNA-polymerase II nog transcribeert, krijgt het een 5\'-cap, worden de intronen eruit gesplicet en wordt het 3\'-uiteinde geknipt en van een poly(A)-staart voorzien. Pas dan is het een rijp mRNP dat de kern mag verlaten.',
      how: [
        'De CTD-staart van Pol II (herhalingen van YSPTSPS) wordt gefosforyleerd en dient als platform voor de processingenzymen.',
        'Na ≈ 20–30 nt zet het capping-enzym (RNGTT) een GMP 5\'–5\' op het eerste nucleotide; RNMT methyleert het tot m⁷G. CBC bindt de cap.',
        'Het spliceosoom (U1, U2, U4/U6, U5 snRNP\'s + >100 eiwitten) herkent GU…AG en het vertakkingspunt-A en knipt intronen eruit via twee transesterificaties.',
        'Na elke splicing blijft een exon-junctiecomplex (EJC) ≈ 20–24 nt vóór de junctie achter.',
        'CPSF herkent AAUAAA, CstF een GU-rijk element; CPSF73 knipt ≈ 10–30 nt verder en poly(A)-polymerase voegt ≈ 200–250 A toe (PABPN1 bindt).',
        'Xrn2 breekt het RNA na de knipplaats af en helpt Pol II loskomen (torpedomodel).',
        'Het rijpe mRNP krijgt TREX en NXF1–NXT1 mee en wordt geëxporteerd.',
      ],
      facts: [['Cap', 'm⁷G, 5\'–5\'-trifosfaatbrug'], ['Intron-grenzen', 'meestal GU … AG'], ['EJC-positie', '≈ 20–24 nt vóór de exon-exonjunctie'], ['Poly(A)-signaal', 'AAUAAA, knip ≈ 10–30 nt verder'], ['Staartlengte', '≈ 200–250 A bij synthese (zoogdieren); in het cytoplasma korter']],
      why: 'Processing beschermt het mRNA, bepaalt welke eiwitvariant ontstaat (alternatieve splicing) en is een kwaliteitscontrole: alleen correct bewerkt mRNA wordt geëxporteerd en vertaald.',
    },
    en: {
      what: 'A freshly made pre-mRNA is not yet usable. While RNA polymerase II is still transcribing, it receives a 5\' cap, its introns are spliced out and its 3\' end is cleaved and given a poly(A) tail. Only then is it a mature mRNP that may leave the nucleus.',
      how: [
        'The CTD tail of Pol II (YSPTSPS repeats) is phosphorylated and serves as a platform for the processing enzymes.',
        'After ≈ 20–30 nt the capping enzyme (RNGTT) adds a GMP 5\'–5\' to the first nucleotide; RNMT methylates it to m⁷G. CBC binds the cap.',
        'The spliceosome (U1, U2, U4/U6, U5 snRNPs + >100 proteins) recognises GU…AG and the branch-point A and removes introns by two transesterifications.',
        'After each splicing event an exon junction complex (EJC) stays ≈ 20–24 nt upstream of the junction.',
        'CPSF recognises AAUAAA, CstF a GU-rich element; CPSF73 cleaves ≈ 10–30 nt downstream and poly(A) polymerase adds ≈ 200–250 A (bound by PABPN1).',
        'Xrn2 degrades the RNA downstream of the cleavage site and helps release Pol II (torpedo model).',
        'The mature mRNP is loaded with TREX and NXF1–NXT1 and exported.',
      ],
      facts: [['Cap', 'm⁷G, 5\'–5\' triphosphate bridge'], ['Intron boundaries', 'usually GU … AG'], ['EJC position', '≈ 20–24 nt upstream of the exon–exon junction'], ['Poly(A) signal', 'AAUAAA, cleavage ≈ 10–30 nt downstream'], ['Tail length', '≈ 200–250 A when made (mammals); shorter in the cytoplasm']],
      why: 'Processing protects the mRNA, determines which protein variant is made (alternative splicing) and acts as quality control: only properly processed mRNA is exported and translated.',
    },
    sources: [ALB_DNA_RNA, { t: 'Wilkinson, Charenton & Nagai (2020) RNA splicing by the spliceosome. Annu Rev Biochem (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/31794245/' },
      { t: 'Mechanistic insights into mRNA 3′-end processing (PMC review)', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6900580/' }, { t: 'RCSB PDB 5YZG – human spliceosome C complex', url: 'https://www.rcsb.org/structure/5YZG' }],
  },

  capping: {
    nl: {
      what: 'De 5\'-cap is een 7-methylguanosine die via een ongewone 5\'–5\'-trifosfaatbrug aan het eerste nucleotide van elk Pol II-transcript hangt. Hij wordt al aangebracht als het RNA nog maar ≈ 20–30 nt lang is.',
      how: [
        'RNA-trifosfatase (domein van RNGTT) haalt het γ-fosfaat van het 5\'-uiteinde: pppN → ppN.',
        'Guanylyltransferase (ook RNGTT) koppelt GMP uit GTP aan dat difosfaat: GpppN (5\'–5\').',
        'RNMT (met RAM) zet een methylgroep van S-adenosylmethionine op N7 van de guanine: m⁷GpppN (cap 0).',
        'CMTR1 kan daarna de 2\'-OH van het eerste nucleotide methyleren (cap 1).',
        'Het nucleaire capbindende complex CBC (CBP80 + CBP20) bindt de cap; in het cytoplasma neemt eIF4E het over.',
      ],
      facts: [['Structuur', 'm⁷G(5\')ppp(5\')N'], ['Moment', 'na ≈ 20–30 nt, gekoppeld aan de Pol II-CTD'], ['Enzymen', 'RNGTT (2 activiteiten) + RNMT'], ['Bindende eiwitten', 'CBC (kern), eIF4E (cytoplasma)']],
      why: 'De cap beschermt tegen 5\'→3\'-exonucleasen, is nodig voor splicing van het eerste intron, voor export (CBC trekt TREX aan) en voor de start van translatie (eIF4E). Verwijdering (decapping door DCP2) is een sleutelstap in mRNA-afbraak.',
    },
    en: {
      what: 'The 5\' cap is a 7-methylguanosine attached to the first nucleotide of every Pol II transcript through an unusual 5\'–5\' triphosphate bridge. It is added when the RNA is only ≈ 20–30 nt long.',
      how: [
        'RNA triphosphatase (a domain of RNGTT) removes the γ-phosphate from the 5\' end: pppN → ppN.',
        'Guanylyltransferase (also RNGTT) links GMP from GTP to that diphosphate: GpppN (5\'–5\').',
        'RNMT (with RAM) transfers a methyl group from S-adenosylmethionine to N7 of the guanine: m⁷GpppN (cap 0).',
        'CMTR1 can then methylate the 2\'-OH of the first nucleotide (cap 1).',
        'The nuclear cap-binding complex CBC (CBP80 + CBP20) binds the cap; in the cytoplasm eIF4E takes over.',
      ],
      facts: [['Structure', 'm⁷G(5\')ppp(5\')N'], ['Timing', 'after ≈ 20–30 nt, coupled to the Pol II CTD'], ['Enzymes', 'RNGTT (2 activities) + RNMT'], ['Binding proteins', 'CBC (nucleus), eIF4E (cytoplasm)']],
      why: 'The cap protects against 5\'→3\' exonucleases and is needed for splicing of the first intron, for export (CBC recruits TREX) and for translation initiation (eIF4E). Its removal (decapping by DCP2) is a key step in mRNA decay.',
    },
    sources: [ALB_DNA_RNA, { t: 'RNMT-dependent RNA cap methylation in health and disease (PMC review)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12599247/' },
      { t: 'Cap-binding complex (CBC). Biochem J 457:231 (Portland Press)', url: 'https://portlandpress.com/biochemj/article/457/2/231/46321/Cap-binding-complex-CBC' }],
  },

  splicing: {
    nl: {
      what: 'Splicing verwijdert de intronen uit het pre-mRNA en plakt de exonen aan elkaar. Het spliceosoom is een grote RNA-eiwitmachine waarvan het katalytisch centrum uit RNA (U2/U6) bestaat: het is een ribozym.',
      how: [
        'U1-snRNP paart met de 5\'-splicesite (GU); U2AF bindt het polypyrimidinestuk en de 3\'-AG.',
        'U2-snRNP paart rond het vertakkingspunt; de vertakkings-A puilt uit (A-complex).',
        'Het U4/U6·U5-tri-snRNP komt erbij (B-complex); U1 en U4 verlaten het complex, U6 paart met de 5\'-splicesite en U2 → actief spliceosoom.',
        'Stap 1: de 2\'-OH van de vertakkings-A valt de 5\'-splicesite aan → vrij exon 1 + lariat (2\'–5\'-binding).',
        'Stap 2: de 3\'-OH van exon 1 valt de 3\'-splicesite aan → exonen verbonden, lariat vrij (DBR1 ontvertakt).',
        'Een EJC blijft ≈ 20–24 nt vóór de nieuwe junctie op het mRNA liggen.',
      ],
      facts: [['Consensus', 'GU … vertakkings-A … (Py)n AG'], ['Chemie', '2 transesterificaties, geen nettoverbruik van bindingen'], ['Katalyse', 'RNA (U2/U6) + 2 metaalionen'], ['Alternatieve splicing', 'bij ≈ 95 % van de menselijke genen met meerdere exonen']],
      why: 'Door alternatieve splicing kan één gen meerdere eiwitten opleveren. Mutaties in splicesites zijn een frequente oorzaak van ziekte; de EJC\'s die splicing achterlaat, sturen export en NMD.',
    },
    en: {
      what: 'Splicing removes the introns from the pre-mRNA and joins the exons. The spliceosome is a large RNA–protein machine whose catalytic centre consists of RNA (U2/U6): it is a ribozyme.',
      how: [
        'U1 snRNP pairs with the 5\' splice site (GU); U2AF binds the polypyrimidine tract and the 3\' AG.',
        'U2 snRNP pairs around the branch point; the branch-point A bulges out (A complex).',
        'The U4/U6·U5 tri-snRNP joins (B complex); U1 and U4 leave, U6 pairs with the 5\' splice site and U2 → active spliceosome.',
        'Step 1: the 2\'-OH of the branch-point A attacks the 5\' splice site → free exon 1 + lariat (2\'–5\' bond).',
        'Step 2: the 3\'-OH of exon 1 attacks the 3\' splice site → exons joined, lariat released (debranched by DBR1).',
        'An EJC stays on the mRNA ≈ 20–24 nt upstream of the new junction.',
      ],
      facts: [['Consensus', 'GU … branch-point A … (Py)n AG'], ['Chemistry', '2 transesterifications, no net change in number of bonds'], ['Catalysis', 'RNA (U2/U6) + 2 metal ions'], ['Alternative splicing', 'in ≈ 95 % of human multi-exon genes']],
      why: 'Alternative splicing lets one gene produce several proteins. Splice-site mutations are a frequent cause of disease; the EJCs left behind by splicing guide export and NMD.',
    },
    sources: [{ t: 'Wilkinson, Charenton & Nagai (2020) RNA splicing by the spliceosome. Annu Rev Biochem (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/31794245/' }, ALB_DNA_RNA,
      { t: 'RCSB PDB 5YZG – human spliceosome, catalytic step I (C complex)', url: 'https://www.rcsb.org/structure/5YZG' }, { t: 'RCSB PDB 5XJC – human spliceosome C* complex', url: 'https://www.rcsb.org/structure/5XJC' }],
  },

  polya: {
    nl: {
      what: 'Het 3\'-uiteinde van een mRNA ontstaat niet waar Pol II stopt, maar door een knip: het transcript wordt achter een poly(A)-signaal geknipt en krijgt dan een staart van adenines die niet in het DNA gecodeerd is.',
      how: [
        'CPSF (via CPSF30 en WDR33) herkent het signaal AAUAAA; CstF bindt een GU/U-rijk element stroomafwaarts.',
        'De endonuclease CPSF73 knipt het RNA ≈ 10–30 nt na AAUAAA, vaak na een CA.',
        'Poly(A)-polymerase (PAP) voegt A\'s toe zonder matrijs; PABPN1 bindt de groeiende staart en stopt bij ≈ 200–250 A.',
        'Het RNA stroomafwaarts van de knip wordt door Xrn2 afgebroken, wat Pol II helpt loslaten (torpedomodel).',
        'In het cytoplasma wordt PABPN1 vervangen door PABPC1 en wordt de staart geleidelijk korter (deadenylatie).',
      ],
      facts: [['Signaal', 'AAUAAA (variant AUUAAA)'], ['Knip', 'CPSF73, ≈ 10–30 nt na het signaal'], ['Staart', '≈ 200–250 A bij synthese (mens); daarna korter'], ['Bindende eiwitten', 'PABPN1 (kern), PABPC1 (cytoplasma)']],
      why: 'De poly(A)-staart bevordert export en translatie (gesloten lus met eIF4G) en beschermt tegen afbraak; zijn inkorting is het startschot voor mRNA-afbraak. Alternatieve polyadenylatie kan 3\'-UTR\'s met regulerende elementen in- of uitsluiten.',
    },
    en: {
      what: 'The 3\' end of an mRNA is not made where Pol II stops but by a cut: the transcript is cleaved downstream of a poly(A) signal and then receives a tail of adenines that is not encoded in the DNA.',
      how: [
        'CPSF (via CPSF30 and WDR33) recognises the AAUAAA signal; CstF binds a GU/U-rich element downstream.',
        'The endonuclease CPSF73 cleaves the RNA ≈ 10–30 nt after AAUAAA, often after a CA.',
        'Poly(A) polymerase (PAP) adds A\'s without a template; PABPN1 binds the growing tail and stops it at ≈ 200–250 A.',
        'The RNA downstream of the cut is degraded by Xrn2, which helps release Pol II (torpedo model).',
        'In the cytoplasm PABPN1 is replaced by PABPC1 and the tail is gradually shortened (deadenylation).',
      ],
      facts: [['Signal', 'AAUAAA (variant AUUAAA)'], ['Cleavage', 'CPSF73, ≈ 10–30 nt after the signal'], ['Tail', '≈ 200–250 A when made (human); shorter later'], ['Binding proteins', 'PABPN1 (nucleus), PABPC1 (cytoplasm)']],
      why: 'The poly(A) tail promotes export and translation (closed loop with eIF4G) and protects against decay; its shortening is the starting signal for mRNA decay. Alternative polyadenylation can include or exclude 3\' UTRs with regulatory elements.',
    },
    sources: [{ t: 'Mechanistic insights into mRNA 3′-end processing (PMC review)', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6900580/' },
      { t: 'Mandel et al. (2006) CPSF-73 is the pre-mRNA 3′-end-processing endonuclease. Nature', url: 'https://www.nature.com/articles/nature05363' }, ALB_DNA_RNA],
  },

  export: {
    nl: {
      what: 'Een rijp mRNA verlaat de kern als mRNP (mRNA + eiwitten) door een kernporie. Bulk-mRNA gebruikt daarvoor de exportreceptor NXF1–NXT1, niet de Ran-GTP-afhankelijke karioferines die eiwitten en kleine RNA\'s vervoeren.',
      how: [
        'Het rijpe mRNP draagt CBC op de cap, EJC\'s op de exon-junctiesites en PABPN1 op de poly(A)-staart.',
        'Het TREX-complex (THO-subcomplex, de helicase UAP56/DDX39B en de adaptor ALYREF) wordt via CBC en splicing aangetrokken.',
        'UAP56 helpt ALYREF het mRNA over te dragen aan NXF1–NXT1 (TAP–p15); een mRNP draagt meerdere kopieën.',
        'Het mRNP meert aan bij de kernkorf (TPR) van de kernporie.',
        'NXF1–NXT1 binden telkens kort aan de ongeordende FG-herhalingen van nucleoporines en glippen zo door het centrale kanaal, 5\'-uiteinde voorop.',
        'Aan de cytoplasmatische filamenten (Nup214) remodelleert de ATPase DDX19, geactiveerd door Gle1 (+ IP6), het mRNP en haalt NXF1 eraf: export wordt onomkeerbaar.',
        'In het cytoplasma wordt CBC vervangen door eIF4E en PABPN1 door PABPC1; het eerste ribosoom verwijdert de EJC\'s.',
      ],
      facts: [['Exportreceptor', 'NXF1–NXT1 (TAP–p15)'], ['Kernporie (mens)', '≈ 110 MDa, ≈ 30 soorten nucleoporines'], ['Doortocht', '≈ 0,2 s (live imaging van β-actine-mRNA)'], ['Energie/richting', 'ATP-hydrolyse door DDX19 (UAP56 in de kern), geen RanGTP']],
      why: 'Export koppelt kwaliteitscontrole aan genexpressie: alleen correct gecapte, gesplicete en gepolyadenyleerde mRNA\'s krijgen TREX en NXF1 mee. Zo komen er geen onbewerkte transcripten bij de ribosomen.',
    },
    en: {
      what: 'A mature mRNA leaves the nucleus as an mRNP (mRNA + proteins) through a nuclear pore. Bulk mRNA uses the export receptor NXF1–NXT1 for this, not the Ran-GTP-dependent karyopherins that carry proteins and small RNAs.',
      how: [
        'The mature mRNP carries CBC on the cap, EJCs at exon-junction sites and PABPN1 on the poly(A) tail.',
        'The TREX complex (THO subcomplex, the helicase UAP56/DDX39B and the adaptor ALYREF) is recruited via CBC and splicing.',
        'UAP56 helps ALYREF hand the mRNA over to NXF1–NXT1 (TAP–p15); an mRNP carries several copies.',
        'The mRNP docks at the nuclear basket (TPR) of the pore.',
        'NXF1–NXT1 repeatedly bind the disordered FG repeats of nucleoporins briefly and so slip through the central channel, 5\' end first.',
        'At the cytoplasmic filaments (Nup214) the ATPase DDX19, activated by Gle1 (+ IP6), remodels the mRNP and strips off NXF1: export becomes irreversible.',
        'In the cytoplasm CBC is replaced by eIF4E and PABPN1 by PABPC1; the first ribosome removes the EJCs.',
      ],
      facts: [['Export receptor', 'NXF1–NXT1 (TAP–p15)'], ['Nuclear pore (human)', '≈ 110 MDa, ≈ 30 kinds of nucleoporins'], ['Passage', '≈ 0.2 s (live imaging of β-actin mRNA)'], ['Energy/direction', 'ATP hydrolysis by DDX19 (UAP56 in the nucleus), no RanGTP']],
      why: 'Export couples quality control to gene expression: only correctly capped, spliced and polyadenylated mRNAs are loaded with TREX and NXF1. This keeps unprocessed transcripts away from the ribosomes.',
    },
    sources: [{ t: 'Chen, Jiang, Fan & Cheng (2024) Nuclear mRNA export (PMC review)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11802349/' },
      { t: 'Structure, maintenance and regulation of nuclear pore complexes (PMC review)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8789946/' },
      { t: 'Grünwald & Singer (2010) In vivo imaging of labelled endogenous β-actin mRNA during nucleocytoplasmic transport. Nature', url: 'https://www.nature.com/articles/nature09438' },
      { t: 'Lin et al. (2018) Structural and functional analysis of mRNA export regulation by the nuclear pore complex (PMC)', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5998080/' }],
  },

  nmd: {
    nl: {
      what: 'Nonsense-mediated decay (NMD) is een kwaliteitscontrole die mRNA\'s met een vroegtijdig stopcodon (PTC) herkent en afbreekt, zodat er geen afgeknotte, mogelijk schadelijke eiwitten ontstaan.',
      how: [
        'Bij splicing blijft ≈ 20–24 nt vóór elke exon-exonjunctie een exon-junctiecomplex (EJC) op het mRNA.',
        'Het eerste ribosoom (pioniersronde; klassiek op CBC-gebonden mRNA, maar NMD kan ook later op eIF4E-gebonden mRNA) duwt de EJC\'s van het mRNA terwijl het leest.',
        'Normaal ligt het stopcodon in het laatste exon: na terminatie blijft er geen EJC over.',
        'Ligt het stopcodon > 50–55 nt vóór de laatste junctie, dan blijft er een EJC stroomafwaarts van het ribosoom.',
        'UPF1 (met de kinase SMG1) bindt het stoppende ribosoom (eRF1–eRF3); UPF2 en UPF3B op de EJC maken contact met UPF1.',
        'SMG1 fosforyleert UPF1; gefosforyleerd UPF1 trekt SMG6 (endonuclease, knipt bij de PTC) en SMG5–SMG7 (roepen CCR4–NOT en decapping op) aan.',
        'XRN1 (5\'→3\') en het exosoom (3\'→5\') breken de fragmenten af.',
      ],
      facts: [['EJC-positie', '≈ 20–24 nt vóór de junctie'], ['NMD-regel', 'PTC > 50–55 nt vóór de laatste exon-exonjunctie'], ['Kernfactor', 'UPF1 (RNA-helicase), gefosforyleerd door SMG1'], ['Afbraak', 'SMG6 (endonucleolytisch) en SMG5–SMG7 (exonucleolytisch)']],
      why: 'NMD bepaalt hoe een nonsensemutatie uitpakt: bv. bij β⁰-thalassemie (β-globine, codon 39 CAG → UAG) wordt het mutante mRNA afgebroken, waardoor dragers gezond blijven; PTC\'s in het laatste exon ontsnappen en kunnen dominant schadelijke eiwitten geven. NMD regelt ook normale genen en is een doelwit voor therapie (read-through).',
    },
    en: {
      what: 'Nonsense-mediated decay (NMD) is a quality-control pathway that recognises and degrades mRNAs with a premature termination codon (PTC), so that no truncated, potentially harmful proteins are made.',
      how: [
        'During splicing an exon junction complex (EJC) is left on the mRNA ≈ 20–24 nt upstream of each exon–exon junction.',
        'The first ribosome (pioneer round; classically on CBC-bound mRNA, but NMD can also occur later on eIF4E-bound mRNA) pushes the EJCs off the mRNA as it reads.',
        'Normally the stop codon lies in the last exon: after termination no EJC is left.',
        'If the stop codon lies > 50–55 nt upstream of the last junction, an EJC remains downstream of the ribosome.',
        'UPF1 (with the kinase SMG1) binds the terminating ribosome (eRF1–eRF3); UPF2 and UPF3B on the EJC contact UPF1.',
        'SMG1 phosphorylates UPF1; phosphorylated UPF1 recruits SMG6 (endonuclease, cleaves near the PTC) and SMG5–SMG7 (recruit CCR4–NOT and decapping).',
        'XRN1 (5\'→3\') and the exosome (3\'→5\') degrade the fragments.',
      ],
      facts: [['EJC position', '≈ 20–24 nt upstream of the junction'], ['NMD rule', 'PTC > 50–55 nt upstream of the last exon–exon junction'], ['Core factor', 'UPF1 (RNA helicase), phosphorylated by SMG1'], ['Decay', 'SMG6 (endonucleolytic) and SMG5–SMG7 (exonucleolytic)']],
      why: 'NMD determines how a nonsense mutation plays out: e.g. in β⁰-thalassaemia (β-globin, codon 39 CAG → UAG) the mutant mRNA is degraded, so carriers stay healthy; PTCs in the last exon escape and can give dominant harmful proteins. NMD also regulates normal genes and is a therapeutic target (read-through).',
    },
    sources: [{ t: 'Nonsense-mediated mRNA decay at the crossroads of many cellular pathways (PMC review)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5437961/' },
      { t: 'Boehm et al. (2021) SMG5-SMG7 authorize NMD by enabling SMG6 endonucleolytic activity (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8233366/' },
      { t: 'Lejeune et al. (2002) The EJC is detected on CBP80-bound but not eIF4E-bound mRNA (PubMed)', url: 'https://pubmed.ncbi.nlm.nih.gov/12093754/' },
      { t: 'SMG6 cleavage generates metastable decay intermediates from nonsense-containing β-globin mRNA (PMC)', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3783490/' }],
  },

  rnai: {
    nl: {
      what: 'MicroRNA\'s (miRNA\'s) zijn RNA\'s van ≈ 22 nt die in het RISC-complex (met Argonaute) mRNA\'s herkennen via basenparing en hun translatie remmen of hun afbraak versnellen. siRNA\'s gebruiken dezelfde machine maar paren perfect en laten het doel-mRNA knippen (RNA-interferentie).',
      how: [
        'RNA-polymerase II schrijft een MIR-gen over tot een pri-miRNA met cap en poly(A) dat een haarspeld vormt.',
        'In de kern knipt de Microprocessor (Drosha + DGCR8) de haarspeld eruit: pre-miRNA van ≈ 60–70 nt met een 2-nt-3\'-overhang.',
        'Exportine-5 met RanGTP brengt het pre-miRNA naar het cytoplasma.',
        'Dicer (met TRBP) knipt de lus eraf → duplex van ≈ 22 nt (≈ 20 bp gepaard, met 2-nt 3′-overhangen).',
        'Het duplex wordt in een Argonaute-eiwit (AGO1–4) geladen; de gidsstreng blijft, de passagiersstreng verdwijnt.',
        'De seed (nt 2–8 van de gids) paart met sites, vooral in de 3\'-UTR van doel-mRNA\'s.',
        'miRNA: AGO bindt GW182 (TNRC6) → CCR4–NOT/PAN2–PAN3 → deadenylatie, translatierepressie en afbraak. siRNA met volledige paring: AGO2 knipt het doel tegenover nt 10–11.',
      ],
      facts: [['Rijp miRNA', '≈ 22 nt'], ['pre-miRNA', '≈ 60–70 nt haarspeld'], ['Seed', 'nt 2–8 van de gidsstreng'], ['Argonautes (mens)', 'AGO1–4; vrijwel alleen AGO2 knipt (AGO3 slechts beperkt)'], ['Export', 'Exportine-5 + RanGTP']],
      why: 'miRNA\'s stellen de expressie van een groot deel van de menselijke genen fijn af (ontwikkeling, kanker). Omdat een seed van 7 nt volstaat, kan één miRNA honderden mRNA\'s treffen. siRNA-geneesmiddelen (bv. tegen leverziekten) maken gebruik van dezelfde RISC-machine.',
    },
    en: {
      what: 'MicroRNAs (miRNAs) are ≈ 22-nt RNAs that, in the RISC complex (with Argonaute), recognise mRNAs by base pairing and repress their translation or speed up their decay. siRNAs use the same machinery but pair perfectly and have the target mRNA sliced (RNA interference).',
      how: [
        'RNA polymerase II transcribes a MIR gene into a capped, polyadenylated pri-miRNA that forms a hairpin.',
        'In the nucleus the Microprocessor (Drosha + DGCR8) cuts out the hairpin: a pre-miRNA of ≈ 60–70 nt with a 2-nt 3\' overhang.',
        'Exportin-5 with RanGTP carries the pre-miRNA to the cytoplasm.',
        'Dicer (with TRBP) cuts off the loop → duplex of ≈ 22 nt (≈ 20 bp paired, with 2-nt 3′ overhangs).',
        'The duplex is loaded into an Argonaute protein (AGO1–4); the guide strand remains, the passenger strand is discarded.',
        'The seed (nt 2–8 of the guide) pairs with sites, mainly in the 3\' UTR of target mRNAs.',
        'miRNA: AGO binds GW182 (TNRC6) → CCR4–NOT/PAN2–PAN3 → deadenylation, translational repression and decay. siRNA with full pairing: AGO2 slices the target opposite nt 10–11.',
      ],
      facts: [['Mature miRNA', '≈ 22 nt'], ['pre-miRNA', '≈ 60–70 nt hairpin'], ['Seed', 'nt 2–8 of the guide strand'], ['Argonautes (human)', 'AGO1–4; essentially only AGO2 slices (AGO3 only weakly)'], ['Export', 'Exportin-5 + RanGTP']],
      why: 'miRNAs fine-tune the expression of a large fraction of human genes (development, cancer). Because a 7-nt seed is enough, one miRNA can hit hundreds of mRNAs. siRNA drugs (e.g. for liver diseases) use the same RISC machinery.',
    },
    sources: [{ t: 'O’Brien et al. (2018) Overview of microRNA biogenesis, mechanisms of actions, and circulation (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6085463/' },
      { t: 'Kim et al. (2016) Re-evaluation of the roles of DROSHA, Exportin 5, and DICER in microRNA biogenesis (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4822641/' }, ALB_POST],
  },

  mrnaafbraak: {
    nl: {
      what: 'Elk mRNA wordt uiteindelijk afgebroken; de snelheid daarvan bepaalt mee hoeveel eiwit ervan gemaakt wordt. In zoogdiercellen begint afbraak meestal met het inkorten van de poly(A)-staart, gevolgd door verwijdering van de cap en afbraak vanaf de uiteinden.',
      how: [
        'Een actief mRNA vormt een gesloten lus: eIF4E op de cap, PABPC1 op de poly(A)-staart, verbonden via eIF4G.',
        'Signalen in de 3\'-UTR (bv. AU-rijke elementen, AUUUA) binden eiwitten zoals TTP die de afbraakmachine aantrekken; miRNA\'s doen hetzelfde via GW182.',
        'Deadenylatie: eerst PAN2–PAN3, daarna CCR4–NOT korten de staart in; PABPC1 valt af. Dit is meestal de snelheidsbepalende stap.',
        'LSm1–7–PAT1 bindt het korte oligo(A)-uiteinde en roept de decapping-machine op; DCP2 (met DCP1) knipt de cap eraf (m⁷GDP).',
        'XRN1 breekt het RNA vanaf het 5\'-monofosfaat af (5\'→3\', hoofdroute).',
        'Alternatief breekt het cytoplasmatische exosoom, geholpen door het SKI-complex, het RNA 3\'→5\' af; DcpS ruimt de overgebleven cap op.',
        'Afbraakfactoren en niet-vertaalde mRNA\'s kunnen samenklonteren in P-bodies.',
      ],
      facts: [['Eerste stap', 'deadenylatie (PAN2–PAN3 → CCR4–NOT)'], ['Decapping', 'DCP2 (+ DCP1), product m⁷GDP'], ['5\'→3\'', 'XRN1'], ['3\'→5\'', 'exosoom + SKI-complex'], ['Halfwaardetijd', 'minuten tot vele uren, per mRNA verschillend']],
      why: 'Door afbraak kan een cel snel stoppen met het maken van een eiwit (bv. cytokines met ARE\'s). Gespecialiseerde routes (NMD, miRNA\'s) sluiten op dezelfde nucleasen aan. Voor mRNA-vaccins is stabiliteit juist een ontwerpdoel (gemodificeerde nucleosiden, optimale UTR\'s en poly(A)).',
    },
    en: {
      what: 'Every mRNA is eventually degraded; the rate of decay helps determine how much protein is made from it. In mammalian cells decay usually starts with shortening of the poly(A) tail, followed by removal of the cap and degradation from the ends.',
      how: [
        'An active mRNA forms a closed loop: eIF4E on the cap, PABPC1 on the poly(A) tail, linked by eIF4G.',
        'Signals in the 3\' UTR (e.g. AU-rich elements, AUUUA) bind proteins such as TTP that recruit the decay machinery; miRNAs do the same via GW182.',
        'Deadenylation: first PAN2–PAN3, then CCR4–NOT shorten the tail; PABPC1 falls off. This is usually the rate-limiting step.',
        'LSm1–7–PAT1 binds the short oligo(A) end and recruits the decapping machinery; DCP2 (with DCP1) removes the cap (m⁷GDP).',
        'XRN1 degrades the RNA from the 5\' monophosphate (5\'→3\', main route).',
        'Alternatively the cytoplasmic exosome, assisted by the SKI complex, degrades the RNA 3\'→5\'; DcpS clears the leftover cap.',
        'Decay factors and untranslated mRNAs can cluster in P-bodies.',
      ],
      facts: [['First step', 'deadenylation (PAN2–PAN3 → CCR4–NOT)'], ['Decapping', 'DCP2 (+ DCP1), product m⁷GDP'], ['5\'→3\'', 'XRN1'], ['3\'→5\'', 'exosome + SKI complex'], ['Half-life', 'minutes to many hours, differs per mRNA']],
      why: 'Decay lets a cell stop making a protein quickly (e.g. cytokines with AREs). Specialised routes (NMD, miRNAs) feed into the same nucleases. For mRNA vaccines, stability is a design goal (modified nucleosides, optimal UTRs and poly(A)).',
    },
    sources: [{ t: 'Regulation of eukaryotic mRNA deadenylation and degradation by the Ccr4-Not complex (PMC review)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10157403/' },
      { t: 'Proteins involved in the degradation of cytoplasmic mRNA in the major eukaryotic model systems. RNA Biol (Taylor & Francis)', url: 'https://www.tandfonline.com/doi/full/10.4161/rna.34406' }, ALB_POST],
  },

  editing: {
    nl: {
      what: 'Bij RNA-editing wordt een base in het RNA na transcriptie chemisch veranderd, zodat de boodschap afwijkt van het DNA. Bij de mens zijn er twee hoofdtypes: A → I door ADAR-enzymen en C → U door APOBEC1.',
      how: [
        'ADAR1 en ADAR2 binden dubbelstrengig RNA via dsRNA-bindende domeinen (ADAR3 is katalytisch inactief).',
        'Het deaminasedomein klapt een adenosine uit de helix en deamineert het (hydrolyse, NH₃ vrij) tot inosine.',
        'Inosine paart met C en wordt door ribosoom en spliceosoom als G gelezen.',
        'Voorbeeld: in het GluA2-pre-mRNA (AMPA-receptor) maakt ADAR2 van CAG (Gln) CIG ≙ CGG (Arg): de Q/R-plaats, bijna 100 % ge-edit in de hersenen.',
        'APOBEC1 vormt met A1CF een editosoom dat cytidine 6666 in het apoB-mRNA deamineert tot uridine.',
        'Daardoor wordt codon 2153 CAA (Gln) het stopcodon UAA: de darm maakt apoB-48, de lever het volledige apoB-100.',
      ],
      facts: [['A → I', 'ADAR1, ADAR2; substraat = dsRNA'], ['Leesregel', 'I wordt gelezen als G'], ['C → U', 'APOBEC1 + A1CF (editosoom)'], ['apoB', 'C6666 → U, codon 2153 CAA → UAA'], ['apoB-48', '≈ 48 % van apoB-100 (N-terminale deel)']],
      why: 'Editing vergroot de diversiteit van eiwitten zonder het genoom te veranderen (bv. de Ca²⁺-doorlaatbaarheid van AMPA-receptoren). De meeste A-naar-I-plaatsen bij de mens liggen in Alu-herhalingen; ADAR1 voorkomt zo ook dat eigen dsRNA als viraal wordt herkend. Editing is ook een nieuwe route voor RNA-therapie.',
    },
    en: {
      what: 'In RNA editing a base in the RNA is chemically changed after transcription, so the message differs from the DNA. In humans there are two main types: A → I by ADAR enzymes and C → U by APOBEC1.',
      how: [
        'ADAR1 and ADAR2 bind double-stranded RNA through dsRNA-binding domains (ADAR3 is catalytically inactive).',
        'The deaminase domain flips an adenosine out of the helix and deaminates it (hydrolysis, NH₃ released) to inosine.',
        'Inosine pairs with C and is read as G by the ribosome and spliceosome.',
        'Example: in the GluA2 pre-mRNA (AMPA receptor) ADAR2 turns CAG (Gln) into CIG ≙ CGG (Arg): the Q/R site, edited in almost 100 % of transcripts in the brain.',
        'APOBEC1 forms an editosome with A1CF that deaminates cytidine 6666 in the apoB mRNA to uridine.',
        'As a result codon 2153 CAA (Gln) becomes the stop codon UAA: the intestine makes apoB-48, the liver full-length apoB-100.',
      ],
      facts: [['A → I', 'ADAR1, ADAR2; substrate = dsRNA'], ['Reading rule', 'I is read as G'], ['C → U', 'APOBEC1 + A1CF (editosome)'], ['apoB', 'C6666 → U, codon 2153 CAA → UAA'], ['apoB-48', '≈ 48 % of apoB-100 (N-terminal part)']],
      why: 'Editing increases protein diversity without changing the genome (e.g. the Ca²⁺ permeability of AMPA receptors). Most human A-to-I sites lie in Alu repeats; ADAR1 thereby also prevents self dsRNA from being sensed as viral. Editing is also a new route for RNA therapy.',
    },
    sources: [{ t: 'The role of RNA editing enzyme ADAR1 in human disease (PMC review)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8651834/' },
      { t: 'A-to-I RNA editing by ADAR and its therapeutic applications (PMC review)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10947335/' },
      { t: 'Optimization of apolipoprotein B mRNA editing by APOBEC1 apoenzyme and the role of ACF (PMC)', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3225921/' }, ALB_POST],
  },

  rnastructuur: {
    nl: {
      what: 'RNA is meestal enkelstrengig, maar vouwt terug op zichzelf: complementaire stukken vormen dubbelstrengige stammen (A-vorm), de rest vormt lussen. Zo ontstaan secundaire structuren (haarspelden, bulges, interne lussen, juncties, pseudoknopen) en compacte 3D-vormen zoals de L-vorm van tRNA en katalytische ribozymen.',
      how: [
        'Ribose draagt een 2\'-OH en RNA bevat U i.p.v. T; de 2\'-OH maakt RNA reactiever (zelfknippen) en houdt de suiker in C3\'-endo.',
        'Complementaire stukken paren antiparallel tot een stam; de ongepaarde basen ertussen vormen een haarspeldlus.',
        'Naast Watson–Crick-paren komen G·U-wobbleparen veel voor.',
        'Ongepaarde basen aan één kant van een stam = bulge (bv. de UCU-bulge van HIV-1 TAR, bindingsplaats van Tat); aan beide kanten = interne lus; waar ≥ 3 helices samenkomen = junctie.',
        'Basen in een lus die paren met een stuk buiten de stam vormen een pseudoknoop (kruisende paren).',
        'Dubbelstrengig RNA vormt een A-helix: ≈ 11 bp/winding, gekantelde basenparen, diepe smalle grote groef, ondiepe brede kleine groef.',
        'Stammen stapelen in 3D: tRNA (≈ 76 nt, 4 stammen) vormt een L met CCA-uiteinde en anticodon ≈ 75 Å uit elkaar.',
        'Sommige gevouwen RNA\'s zijn enzymen (ribozymen): hammerhead, zelfsplicende intronen, RNase P, het ribosoom en het spliceosoom.',
      ],
      facts: [['Helixtype', 'A-vorm, ≈ 11 bp/winding, C3\'-endo'], ['Niet-canoniek paar', 'G·U-wobble (2 H-bruggen)'], ['tRNA', '≈ 76 nt; eerste RNA-kristalstructuur (gist-tRNA^Phe, PDB 1EHZ = herbepaling)'], ['HIV-1 TAR', 'bulge U23-C24-U25 (PDB 1ANR)'], ['Hammerhead-ribozym', 'zelfknippend, PDB 2OEU']],
      why: 'De vorm van een RNA bepaalt zijn functie: herkenning door eiwitten (Tat–TAR, SRP), katalyse (ribosoom = ribozym) en regulatie (riboswitches, frameshift-pseudoknopen). RNA-structuren zijn doelwitten voor geneesmiddelen, en structuurvoorspelling is een klassiek onderwerp van de structurele bio-informatica.',
    },
    en: {
      what: 'RNA is usually single-stranded but folds back on itself: complementary stretches form double-stranded stems (A-form), the rest forms loops. This produces secondary structures (hairpins, bulges, internal loops, junctions, pseudoknots) and compact 3D shapes such as the L shape of tRNA and catalytic ribozymes.',
      how: [
        'Ribose carries a 2\'-OH and RNA contains U instead of T; the 2\'-OH makes RNA more reactive (self-cleavage) and keeps the sugar C3\'-endo.',
        'Complementary stretches pair antiparallel into a stem; the unpaired bases in between form a hairpin loop.',
        'Besides Watson–Crick pairs, G·U wobble pairs are common.',
        'Unpaired bases on one side of a stem = bulge (e.g. the UCU bulge of HIV-1 TAR, binding site of Tat); on both sides = internal loop; where ≥ 3 helices meet = junction.',
        'Bases in a loop that pair with a stretch outside the stem form a pseudoknot (crossing pairs).',
        'Double-stranded RNA forms an A helix: ≈ 11 bp/turn, tilted base pairs, deep narrow major groove, shallow wide minor groove.',
        'Stems stack in 3D: tRNA (≈ 76 nt, 4 stems) forms an L with the CCA end and anticodon ≈ 75 Å apart.',
        'Some folded RNAs are enzymes (ribozymes): hammerhead, self-splicing introns, RNase P, the ribosome and the spliceosome.',
      ],
      facts: [['Helix type', 'A-form, ≈ 11 bp/turn, C3\'-endo'], ['Non-canonical pair', 'G·U wobble (2 H-bonds)'], ['tRNA', '≈ 76 nt; first RNA crystal structure (yeast tRNA^Phe, PDB 1EHZ = re-determination)'], ['HIV-1 TAR', 'bulge U23-C24-U25 (PDB 1ANR)'], ['Hammerhead ribozyme', 'self-cleaving, PDB 2OEU']],
      why: 'An RNA\'s shape determines its function: recognition by proteins (Tat–TAR, SRP), catalysis (ribosome = ribozyme) and regulation (riboswitches, frameshift pseudoknots). RNA structures are drug targets, and structure prediction is a classic topic in structural bioinformatics.',
    },
    sources: [ALB_RNAWORLD, { t: 'PDB-101 Molecule of the Month: Transfer RNA', url: 'https://pdb101.rcsb.org/motm/15' },
      { t: 'RCSB PDB 1EHZ – yeast tRNA^Phe at 1.93 Å', url: 'https://www.rcsb.org/structure/1EHZ' }, { t: 'RCSB PDB 1ANR – HIV-1 TAR RNA (NMR)', url: 'https://www.rcsb.org/structure/1ANR' },
      { t: 'RCSB PDB 2OEU – full-length hammerhead ribozyme', url: 'https://www.rcsb.org/structure/2OEU' }],
  },
};
