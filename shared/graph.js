/*
 * Kennisgraaf "Van DNA tot eiwit"
 * ---------------------------------------------------------------
 * Eén node = één structuur of proces dat een eigen animatie/scène kan krijgen.
 *
 *   id      unieke sleutel
 *   t       titel (NL)          en   vakterm (EN, zoals in de cursus)
 *   stage   kolom in de kaart (zie STAGES)
 *   scale   zoomniveau (zie SCALES)
 *   kind    'structure' | 'process'
 *   s       korte inhoud (concept, moet nog geverifieerd worden)
 *   in      inzoomen: onderdelen/deelprocessen  (verticale as)
 *   next    volgende stap in de tijd            (horizontale as)
 *   rel     zijsprongen / kruisverbanden
 *   pdb     echte structuren (RCSB PDB) voor 3D-weergave
 *   status  'concept' -> 'nagekeken' -> 'gevalideerd' (zie verificatieprotocol)
 *   course  true = expliciet behandeld in BIT 03 "Fundamentals of protein structure"
 *
 * Alle inhoud staat op 'concept' tot ze tegen een primaire bron is nagekeken.
 */

export const STAGES = [
  { id: 'entry',   t: 'Binnenkomst & signalen', en: 'Entry & signalling' },
  { id: 'genome',  t: 'Genoom & chromatine',    en: 'Genome & chromatin' },
  { id: 'repl',    t: 'Replicatie & herstel',   en: 'Replication & repair' },
  { id: 'txn',     t: 'Regulatie & transcriptie', en: 'Regulation & transcription' },
  { id: 'rna',     t: 'RNA-processing & -lot',  en: 'RNA processing & fate' },
  { id: 'tl',      t: 'Translatie',             en: 'Translation' },
  { id: 'prot',    t: 'Eiwitstructuur & -lot',  en: 'Protein structure & fate' },
];

export const SCALES = [
  { id: 1, t: 'Cel & organisme',        range: '1–100 µm' },
  { id: 2, t: 'Organel & compartiment', range: '0,1–10 µm' },
  { id: 3, t: 'Macromoleculair complex', range: '10–50 nm' },
  { id: 4, t: 'Molecuul & vouwing',     range: '1–10 nm' },
  { id: 5, t: 'Atomair',                range: '0,1–1 nm (Å)' },
];

const N = [
  // ───────────── BINNENKOMST ─────────────
  { id: 'cel', t: 'Menselijke cel', en: 'Human cell', stage: 'entry', scale: 1, kind: 'structure',
    s: 'Startpunt: een menselijke epitheelcel. Het genoom zit in de kern (plus een klein genoom in de mitochondriën); eiwitsynthese gebeurt in het cytosol en aan het ruw ER.',
    in: ['kern', 'ribosoom', 'er'], rel: ['adeno', 'lnp', 'virus', 'signaal'] },
  /* verhaallijn 2: een signaalmolecule zet een gen aan */
  { id: 'signaal', t: 'Signaalmolecule & receptor', en: 'Cell signalling', stage: 'entry', scale: 1, kind: 'process',
    s: 'Een signaalmolecule (bv. de groeifactor EGF, adrenaline of cortisol) bindt aan een receptor. De receptor zet het signaal om in een reactie in de cel, vaak tot in de kern, waar genen aan- of uitgaan.',
    in: ['rtk', 'gpcr', 'steroid'], next: ['rtk'] },
  { id: 'rtk', t: 'Receptortyrosinekinase (EGFR)', en: 'Receptor tyrosine kinase (EGFR)', stage: 'entry', scale: 3, kind: 'process',
    s: 'EGF bindt de EGF-receptor; twee receptoren dimeriseren en fosforyleren elkaars tyrosines. Grb2 bindt die fosfotyrosines en brengt SOS naar het membraan.',
    next: ['mapk'] },
  { id: 'mapk', t: 'Ras–MAPK-cascade', en: 'Ras–MAPK cascade', stage: 'entry', scale: 3, kind: 'process',
    s: 'SOS zet Ras-GDP om in Ras-GTP; Ras activeert Raf, Raf fosforyleert MEK en MEK fosforyleert ERK. Actief ERK gaat de kern in.',
    next: ['srf'], rel: ['ptm'] },
  { id: 'srf', t: 'Onmiddellijk-vroege genen (SRE)', en: 'Immediate early genes (SRE)', stage: 'txn', scale: 3, kind: 'process',
    s: 'In de kern fosforyleert ERK de transcriptiefactor Elk-1, die samen met SRF op het serum-responselement (SRE) van het FOS-gen zit: binnen minuten wordt FOS afgeschreven.',
    next: ['promoter', 'transcriptie'], rel: ['genregulatie'] },
  { id: 'gpcr', t: 'G-eiwitgekoppelde receptor (cAMP)', en: 'G protein-coupled receptor (cAMP)', stage: 'entry', scale: 3, kind: 'process',
    s: 'Adrenaline bindt de β2-adrenerge receptor; die activeert Gs, adenylylcyclase maakt cAMP, PKA wordt actief en fosforyleert in de kern de transcriptiefactor CREB.',
    rel: ['srf', 'genregulatie'] },
  { id: 'steroid', t: 'Kernreceptor (cortisol)', en: 'Nuclear receptor (cortisol)', stage: 'entry', scale: 3, kind: 'process',
    s: 'Het lipofiele cortisol gaat door het membraan en bindt de glucocorticoïdreceptor in het cytosol; die laat Hsp90 los, gaat de kern in en bindt als dimeer het glucocorticoïd-responselement (GRE).',
    rel: ['kernimport', 'genregulatie', 'chaperones'] },
  { id: 'virus', t: 'Virale infectie', en: 'Viral entry', stage: 'entry', scale: 1, kind: 'process',
    s: 'Een virus bindt receptoren op het celoppervlak, komt binnen via endocytose of membraanfusie en laat zijn genoom vrij. Wat daarna gebeurt hangt af van het genoomtype (Baltimore-klassen).',
    in: ['endocytose', 'baltimore'], rel: ['adeno', 'rt'] },
  { id: 'adeno', t: 'Adenovirus: DNA naar de kern', en: 'Adenovirus entry & nuclear delivery', stage: 'entry', scale: 1, kind: 'process',
    s: 'Dubbelstrengig DNA-virus. De vezels hechten aan de CAR-receptor, opname gebeurt via αv-integrines en klathrine-endocytose; eiwit VI helpt ontsnappen uit het endosoom. Dyneïne brengt het capside over microtubuli naar een kernporie, waar het aan Nup214 dokt en (met hulp van kinesine-1 en histon H1) uiteenvalt, zodat het DNA de kern in kan. Het genoom blijft meestal episomaal; de eiwitgenen worden door RNA-polymerase II van de cel afgeschreven (de VA-RNA\'s door Pol III).',
    in: ['endocytose'], next: ['kernimport'], rel: ['baltimore', 'transcriptie'] },
  { id: 'lnp', t: 'mRNA-vaccin (lipidenanodeeltje)', en: 'mRNA–lipid nanoparticle delivery', stage: 'entry', scale: 1, kind: 'process',
    s: 'mRNA verpakt in een lipidenanodeeltje wordt via endocytose opgenomen; ioniseerbare lipiden helpen een klein deel ontsnappen uit het endosoom (bij siRNA-LNP\'s gemeten: ~1–2 %). Het mRNA bevat N1-methylpseudouridine, wat de aangeboren immuunherkenning vermindert en de translatie verhoogt. Het wordt in het cytosol vertaald en komt de kern niet in.',
    in: ['endocytose'], next: ['initiatie'], rel: ['mrnaafbraak', 'translatie'] },
  { id: 'endocytose', t: 'Endocytose & endosomale ontsnapping', en: 'Endocytosis & endosomal escape', stage: 'entry', scale: 2, kind: 'process',
    s: 'Instulping van het plasmamembraan vormt een vesikel; bij verzuring van het endosoom ontsnappen virussen of nanodeeltjes naar het cytosol, anders volgt afbraak in het lysosoom.' },
  { id: 'baltimore', t: 'Baltimore-klassen', en: 'Baltimore classification', stage: 'entry', scale: 4, kind: 'structure',
    s: 'Zeven klassen op basis van genoomtype en hoe mRNA gemaakt wordt: dsDNA, ssDNA, dsRNA, (+)ssRNA, (−)ssRNA, ssRNA-RT, dsDNA-RT (Baltimore 1971: zes klassen; klasse VII kwam later).',
    rel: ['rt', 'rnastructuur'] },
  { id: 'rt', t: 'Retrovirus: reverse transcriptie', en: 'Reverse transcription (HIV-1)', stage: 'entry', scale: 3, kind: 'process',
    s: 'Retrovirussen zoals HIV-1 (infecteert o.a. CD4⁺-T-cellen en macrofagen) kopiëren hun enkelstrengig RNA-genoom met reverse transcriptase naar dubbelstrengig DNA.',
    next: ['integratie'], rel: ['replicatie', 'telomeren'] },
  { id: 'integratie', t: 'Integratie van het provirus', en: 'Retroviral integration', stage: 'entry', scale: 3, kind: 'process',
    s: 'Het virale integrase knipt het virale DNA en bouwt het in het chromosoom van de gastheer in; dit provirus wordt daarna als een gewoon gen afgeschreven.',
    rel: ['herstel', 'chromatine'], next: ['transcriptie'] },
  { id: 'kernimport', t: 'Kernporie & kernimport', en: 'Nuclear pore complex & import', stage: 'entry', scale: 3, kind: 'process',
    s: 'Kernporiecomplex van ~30 verschillende nucleoporines in veelvoud; een menselijke kern (bv. HeLa) heeft er ~3 000. Cargo met een NLS wordt door importine α/β binnengebracht; de RanGTP-gradiënt (hoog in de kern) bepaalt de richting.',
    rel: ['kern', 'export', 'adeno'] },

  // ───────────── GENOOM & CHROMATINE ─────────────
  { id: 'kern', t: 'Celkern', en: 'Nucleus', stage: 'genome', scale: 2, kind: 'structure',
    s: 'Omgeven door een dubbele kernenvelop (buitenmembraan loopt door in het ER, binnenkant gesteund door de kernlamina) met kernporiën. Bevat chromatine en de nucleolus (ribosoomaanmaak).',
    in: ['chromosoom', 'nucleolus', 'kernimport', 'transcriptie'] },
  { id: 'nucleolus', t: 'Nucleolus', en: 'Nucleolus', stage: 'genome', scale: 2, kind: 'structure',
    s: 'Kernlichaam rond de rDNA-herhalingen waar RNA-polymerase I de rRNA-voorloper maakt en ribosoomsubeenheden worden geassembleerd.',
    in: ['ribogenese'] },
  { id: 'chromosoom', t: 'Chromosoom', en: 'Chromosome', stage: 'genome', scale: 2, kind: 'structure',
    s: 'Mens: 46 chromosomen (23 paren) in een diploïde lichaamscel; haploïd genoom ≈3,0–3,1 miljard bp (T2T-referentie: 3,05 Gb), samen ~2 m DNA per cel.',
    in: ['chromatine', 'telomeren'], rel: ['replicatie'] },
  { id: 'chromatine', t: 'Chromatine', en: 'Chromatin', stage: 'genome', scale: 3, kind: 'structure',
    s: 'DNA + eiwitten. Euchromatine is open en actief, heterochromatine compact en meestal stil. Lussen en domeinen (TADs) worden o.a. door cohesine en CTCF gevormd.',
    in: ['nucleosoom', 'histonmod', 'dnamethyl'], rel: ['genregulatie'] },
  { id: 'nucleosoom', t: 'Nucleosoom', en: 'Nucleosome core particle', stage: 'genome', scale: 3, kind: 'structure',
    s: '~147 bp DNA in ongeveer 1,7 linkshandige superhelische windingen rond een histonoctameer (2× H2A, H2B, H3, H4). Linker-DNA en histon H1 verbinden opeenvolgende nucleosomen.',
    in: ['dnahelix', 'histonmod'], pdb: ['1KX5', '1AOI'] },
  { id: 'histonmod', t: 'Histonmodificaties', en: 'Histone modifications', stage: 'genome', scale: 4, kind: 'process',
    s: 'Chemische merktekens op histonstaarten. Acetylatie hangt samen met open chromatine; methylatie is contextafhankelijk (H3K4me3 actief, H3K9me3/H3K27me3 onderdrukkend).',
    rel: ['genregulatie', 'ptm'] },
  { id: 'dnamethyl', t: 'DNA-methylatie', en: 'DNA methylation', stage: 'genome', scale: 4, kind: 'process',
    s: 'Bij zoogdieren vooral 5-methylcytosine in CpG-dinucleotiden. DNMT3A/B zetten nieuwe methylgroepen, DNMT1 onderhoudt het patroon na replicatie. Promotermethylatie gaat samen met uitschakeling.',
    rel: ['genregulatie', 'replicatie'] },
  { id: 'gen', t: 'Architectuur van een gen', en: 'Gene structure', stage: 'genome', scale: 4, kind: 'structure',
    s: 'Promoter, 5\'-UTR, exonen en intronen, 3\'-UTR met polyadenylatiesignaal; regulerende enhancers/silencers kunnen ver weg liggen.',
    in: ['promoter'], next: ['transcriptie'], rel: ['splicing'] },
  { id: 'dnahelix', t: 'DNA-dubbelhelix', en: 'DNA double helix', stage: 'genome', scale: 4, kind: 'structure',
    s: 'Twee antiparallelle strengen met een suiker-fosfaatruggengraat buiten en gepaarde basen binnen. Grote en kleine groef geven eiwitten toegang tot de basen.',
    in: ['dnavormen', 'basenparing', 'nucleotide', 'supercoiling', 'noncanon'], pdb: ['1BNA'] },
  { id: 'dnavormen', t: 'DNA-conformaties A, B, Z', en: 'A-, B- and Z-DNA', stage: 'genome', scale: 4, kind: 'structure',
    s: 'B-DNA: rechtshandig, ~10,5 bp/winding in oplossing (10 in het klassieke vezelmodel), 3,4 Å per bp, ~20 Å breed, C2\'-endo. A-DNA: rechtshandig, ~11 bp/winding, korter en dikker, fosfaten dichter bij elkaar, C3\'-endo, gekantelde basenparen (typisch voor dsRNA en RNA–DNA-hybriden). Z-DNA: linkshandig, 12 bp/winding, zigzag-ruggengraat, alternerend syn (G) en anti (C), bij alternerende (CG)n.',
    pdb: ['440D', '1BNA', '1DCG'], rel: ['rnastructuur'] },
  { id: 'noncanon', t: 'Niet-canonieke structuren', en: 'G-quadruplex, triplex, cruciform', stage: 'genome', scale: 4, kind: 'structure',
    s: 'Guaninerijke sequenties kunnen G-quadruplexen vormen (gestapelde G-kwartetten met Hoogsteen-H-bruggen, gestabiliseerd door een centraal kation, K⁺ > Na⁺); daarnaast triplex-DNA (H-DNA), kruisvormen bij palindromen en i-motieven in C-rijke strengen.',
    pdb: ['143D', '1KF1'], rel: ['telomeren', 'basenparing'] },
  { id: 'basenparing', t: 'Basenparing', en: 'Base pairing', stage: 'genome', scale: 5, kind: 'structure',
    s: 'Watson–Crick: A–T met 2 en G–C met 3 waterstofbruggen. Alternatieve paringen (Hoogsteen, wobble G–U in RNA) maken andere structuren mogelijk.',
    rel: ['codon', 'noncanon'] },
  { id: 'nucleotide', t: 'Nucleotide', en: 'Nucleotide', stage: 'genome', scale: 5, kind: 'structure',
    s: 'Base + (deoxy)ribose + fosfaat. Purines A en G, pyrimidines C en T (U in RNA). Fosfodiësterbindingen geven de streng een 5\'→3\'-richting.',
    rel: ['rnastructuur'] },
  { id: 'supercoiling', t: 'Supercoiling & topo-isomerasen', en: 'Supercoiling & topoisomerases', stage: 'genome', scale: 3, kind: 'process',
    s: 'Torsiespanning in DNA. Topo-isomerase I knipt één streng, topo-isomerase II beide (ATP-afhankelijk). Replicatie en transcriptie veroorzaken positieve supercoils vóór de machine.',
    rel: ['replicatie', 'transcriptie', 'dnavormen'] },

  // ───────────── REPLICATIE & HERSTEL ─────────────
  { id: 'replicatie', t: 'DNA-replicatie', en: 'DNA replication', stage: 'repl', scale: 2, kind: 'process',
    s: 'Semi-conservatief (Meselson–Stahl, 1958). Start aan vele origins per eukaryoot chromosoom tijdens de S-fase.',
    in: ['replisoom', 'telomeren'], rel: ['herstel', 'nucleosoom'] },
  { id: 'replisoom', t: 'Replisoom', en: 'Replisome', stage: 'repl', scale: 3, kind: 'structure',
    s: 'Helicase CMG (Cdc45–MCM2-7–GINS), Pol α-primase, DNA-polymerasen (ε voornamelijk leidende, δ volgende streng), glijklem PCNA, RPA, ligase. De volgende streng wordt in Okazaki-fragmenten gemaakt.',
    rel: ['ssdna', 'supercoiling'] },
  { id: 'ssdna', t: 'Enkelstrengig DNA', en: 'Single-stranded DNA', stage: 'repl', scale: 4, kind: 'structure',
    s: 'Tijdelijk aanwezig bij replicatie en herstel; beschermd door bindingseiwitten (RPA bij eukaryoten, SSB bij bacteriën).' },
  { id: 'telomeren', t: 'Telomeren & telomerase', en: 'Telomeres', stage: 'repl', scale: 3, kind: 'structure',
    s: 'Herhalingen (TTAGGG bij gewervelden) aan chromosoomuiteinden; telomerase is een reverse transcriptase met een eigen RNA-matrijs.',
    rel: ['rt', 'noncanon'] },
  { id: 'herstel', t: 'DNA-herstel', en: 'DNA repair', stage: 'repl', scale: 3, kind: 'process',
    s: 'Base-excisie (BER), nucleotide-excisie (NER), mismatch-herstel (MMR), en voor dubbelstrengbreuken homologe recombinatie (HR) of niet-homologe eindverbinding (NHEJ).',
    rel: ['mutaties', 'integratie'] },
  { id: 'mutaties', t: 'Mutaties', en: 'Mutations', stage: 'repl', scale: 4, kind: 'process',
    s: 'Puntmutaties (stil, missense, nonsense), inserties/deleties (frameshift). Effect zichtbaar in eiwitsequentie en -structuur.',
    rel: ['codon', 'nmd', 'aminozuren'] },

  // ───────────── REGULATIE & TRANSCRIPTIE ─────────────
  { id: 'genregulatie', t: 'Genregulatie', en: 'Gene regulation', stage: 'txn', scale: 3, kind: 'process',
    s: 'Transcriptiefactoren binden enhancers en promoters; co-activatoren (o.a. Mediator) en chromatine-toegankelijkheid bepalen of RNA-polymerase II start.',
    in: ['promoter', 'operon'], next: ['transcriptie'] },
  { id: 'promoter', t: 'Promoter & preinitiatiecomplex', en: 'Core promoter & PIC', stage: 'txn', scale: 3, kind: 'structure',
    s: 'Kernpromoterelementen (bv. TATA-box, Inr) binden de algemene transcriptiefactoren TFIID (met TBP), -A, -B, -E, -F, -H. TFIIH opent het DNA en fosforyleert Ser5 van de CTD.',
    next: ['transcriptie'] },
  { id: 'rnapol', t: 'RNA-polymerase II', en: 'RNA polymerase II', stage: 'txn', scale: 3, kind: 'structure',
    s: '12 subeenheden (Rpb1–12). De C-terminale staart (CTD) van Rpb1 bestaat uit herhalingen YSPTSPS (52 bij de mens) waarvan het fosforyleringspatroon de processing-machines rekruteert. Let op: PDB 1I6H is gist-Pol II zonder Rpb4/7 (10 subeenheden); 5FLM is een transcriberend Pol II-complex van een zoogdier.',
    pdb: ['1I6H', '5FLM'], rel: ['capping', 'splicing', 'polya'] },
  { id: 'transcriptie', t: 'Transcriptie', en: 'Transcription', stage: 'txn', scale: 3, kind: 'process',
    s: 'RNA-polymerase leest de matrijsstreng 3\'→5\' en maakt RNA 5\'→3\' in een transcriptiebel; achter de polymerase sluit de DNA-helix weer.',
    in: ['rnapol', 'promoter'], next: ['rnaprocessing'], rel: ['supercoiling', 'operon'] },
  { id: 'operon', t: 'Prokaryote transcriptie & operon', en: 'Bacterial transcription, lac operon', stage: 'txn', scale: 3, kind: 'process',
    s: 'Sigmafactor herkent de −35 en −10 (Pribnow) box. Genen in een operon worden samen afgeschreven; transcriptie en translatie zijn gekoppeld omdat er geen kern is.',
    rel: ['translatie'] },
  { id: 'polymerasen', t: 'RNA-polymerasen I, II en III', en: 'RNA polymerases I, II & III', stage: 'txn', scale: 3, kind: 'structure',
    s: 'Mensen hebben drie nucleaire RNA-polymerasen: Pol I maakt de 47S-rRNA-voorloper (→ 18S, 5,8S, 28S), Pol II mRNA en de meeste snRNA’s en miRNA’s, Pol III o.a. tRNA, 5S rRNA en U6 snRNA.',
    rel: ['ribogenese', 'trna'] },

  // ───────────── RNA-PROCESSING & -LOT ─────────────
  { id: 'rnaprocessing', t: 'RNA-processing', en: 'pre-mRNA processing', stage: 'rna', scale: 3, kind: 'process',
    s: 'Het pre-mRNA wordt al tijdens de transcriptie bewerkt: 5\'-cap, verwijderen van intronen door het spliceosoom, knippen en polyadenylatie van het 3\'-uiteinde. De CTD van Pol II brengt de enzymen ter plaatse. Pas het rijpe mRNP wordt geëxporteerd.',
    in: ['capping', 'splicing', 'polya', 'editing'], next: ['export'], rel: ['nmd', 'gen', 'rnapol'] },
  { id: 'capping', t: '5\'-capping', en: '5\' cap', stage: 'rna', scale: 4, kind: 'process',
    s: 'Kort na de start krijgt het pre-mRNA een 7-methylguanosine, via een 5\'–5\'-trifosfaatbrug gekoppeld. Beschermt tegen afbraak en is nodig voor export en translatie-initiatie.',
    next: ['splicing'] },
  { id: 'splicing', t: 'Splicing & spliceosoom', en: 'Splicing', stage: 'rna', scale: 3, kind: 'process',
    s: 'snRNP\'s (U1, U2, U4, U5, U6) verwijderen intronen (meestal GU…AG) via twee transesterificaties met het vertakkingspunt-A; het intron komt vrij als lariat. Alternatieve splicing maakt meerdere eiwitten per gen.',
    next: ['polya'], pdb: ['5YZG', '5XJC'], rel: ['nmd', 'gen', 'editing'] },
  { id: 'polya', t: 'Polyadenylatie', en: 'Cleavage & polyadenylation', stage: 'rna', scale: 4, kind: 'process',
    s: 'CPSF herkent het signaal AAUAAA (via CPSF30 en WDR33) en CstF een GU-rijk element verderop; CPSF73 knipt ~10–30 nt na het signaal en poly(A)-polymerase voegt een staart toe van ~200–250 A (in het cytoplasma daarna geleidelijk korter door deadenylatie).',
    next: ['export'] },
  { id: 'editing', t: 'RNA-editing', en: 'RNA editing', stage: 'rna', scale: 4, kind: 'process',
    s: 'Sequentie wordt na transcriptie gewijzigd: A→I door ADAR, C→U door APOBEC1 (bv. apolipoproteïne B).',
    rel: ['codon'] },
  { id: 'export', t: 'mRNA-export', en: 'mRNA nuclear export', stage: 'rna', scale: 3, kind: 'process',
    s: 'Het rijpe mRNP wordt via TREX en de exportreceptor NXF1–NXT1 door de kernporie gebracht (grotendeels Ran-onafhankelijk).',
    next: ['initiatie'], rel: ['kernimport', 'rnai', 'mrnaafbraak'] },
  { id: 'nmd', t: 'Nonsense-mediated decay', en: 'NMD', stage: 'rna', scale: 3, kind: 'process',
    s: 'Kwaliteitscontrole: een stopcodon dat meer dan 50–55 nt vóór de laatste exon-exonjunctie ligt, laat een exon-junctiecomplex achter het ribosoom; dat wijst op een fout mRNA dat dan wordt afgebroken.',
    rel: ['mutaties', 'splicing'] },
  { id: 'rnai', t: 'miRNA & RNA-interferentie', en: 'miRNA / siRNA pathway', stage: 'rna', scale: 3, kind: 'process',
    s: 'pri-miRNA → Drosha/DGCR8 → pre-miRNA → Exportine-5 → Dicer → RISC met Argonaute; onderdrukt translatie of knipt doel-mRNA.',
    rel: ['mrnaafbraak'] },
  { id: 'mrnaafbraak', t: 'mRNA-afbraak', en: 'mRNA decay', stage: 'rna', scale: 3, kind: 'process',
    s: 'Meestal deadenylatie, dan decapping (DCP2) en 5\'→3\'-afbraak door XRN1, of 3\'→5\' door het exosoom.' },
  { id: 'rnastructuur', t: 'RNA-structuur', en: 'RNA structure', stage: 'rna', scale: 4, kind: 'structure',
    s: 'Enkelstrengig maar vouwt op zichzelf: haarspelden, bulges, pseudoknopen. De 2\'-OH maakt RNA reactiever en dwingt dubbelstrengige stukken in A-vorm.',
    rel: ['dnavormen', 'trna', 'ribosoom'] },

  // ───────────── TRANSLATIE ─────────────
  { id: 'translatie', t: 'Translatie', en: 'Translation', stage: 'tl', scale: 2, kind: 'process',
    s: 'Ribosomen lezen het mRNA 5\'→3\' in codons en koppelen aminozuren via peptidebindingen; meerdere ribosomen tegelijk vormen een polysoom.',
    in: ['initiatie', 'elongatie', 'terminatie', 'ribosoom'], next: ['vouwing'] },
  { id: 'ribosoom', t: 'Ribosoom', en: 'Ribosome', stage: 'tl', scale: 3, kind: 'structure',
    s: 'Eukaryoot 80S (40S + 60S), bacterieel 70S (30S + 50S). A-, P- en E-plaats. De peptidyltransferase-activiteit zit in het rRNA: het ribosoom is een ribozym.',
    pdb: ['4UG0', '4V6F'], rel: ['ribogenese', 'rnastructuur'] },
  { id: 'ribogenese', t: 'Ribosoombiogenese', en: 'Ribosome biogenesis', stage: 'tl', scale: 2, kind: 'process',
    s: 'rRNA-voorloper wordt in de nucleolus geknipt en gemodificeerd, samen met ~80 ribosomale eiwitten geassembleerd en als aparte subeenheden geëxporteerd.',
    rel: ['nucleolus', 'polymerasen'] },
  { id: 'codon', t: 'Genetische code', en: 'Genetic code', stage: 'tl', scale: 4, kind: 'structure',
    s: '64 codons: 61 coderen voor aminozuren, 3 zijn stopcodons (UAA, UAG, UGA). AUG = start (Met). Gedegenereerd; wobble aan de derde codonpositie.',
    rel: ['trna', 'seleno', 'mutaties'] },
  { id: 'trna', t: 'tRNA', en: 'Transfer RNA', stage: 'tl', scale: 4, kind: 'structure',
    s: '~76 nt; klaverbladvorm in 2D, L-vorm in 3D. Anticodon aan één kant, CCA-uiteinde met het aminozuur aan de andere kant, ongeveer 75 Å verder.',
    in: ['aars'], pdb: ['1EHZ'], rel: ['rnastructuur', 'codon'] },
  { id: 'aars', t: 'Aminoacyl-tRNA-synthetasen', en: 'Aminoacyl-tRNA synthetases', stage: 'tl', scale: 3, kind: 'process',
    s: 'Koppelen elk aminozuur ATP-afhankelijk aan de juiste tRNA\'s; twee structurele klassen (I en II), vaak met proeflees-activiteit.',
    next: ['elongatie'] },
  { id: 'initiatie', t: 'Translatie-initiatie', en: 'Initiation', stage: 'tl', scale: 3, kind: 'process',
    s: 'Eukaryoten: het 43S-preinitiatiecomplex (40S + eIF2–GTP–Met-tRNAi + eIF1, eIF1A, eIF3, eIF5) bindt via eIF4F aan de cap; zodra het mRNA gebonden is heet het 48S-complex en dat scant 5\'→3\' naar het start-AUG (Kozak-context). Daarna koppelt de 60S (eIF5B). Bacteriën: Shine–Dalgarno paart met het 16S-rRNA.',
    next: ['elongatie'] },
  { id: 'elongatie', t: 'Elongatie', en: 'Elongation cycle', stage: 'tl', scale: 3, kind: 'process',
    s: 'eEF1A (EF-Tu) brengt aminoacyl-tRNA naar de A-plaats; peptidebinding in het ribosoom; eEF2 (EF-G) verplaatst het ribosoom één codon.',
    next: ['terminatie'], rel: ['peptide'] },
  { id: 'terminatie', t: 'Terminatie', en: 'Termination', stage: 'tl', scale: 3, kind: 'process',
    s: 'eRF1 herkent alle drie stopcodons (bacteriën: RF1 voor UAA/UAG, RF2 voor UAA/UGA); het peptide wordt vrijgemaakt en het ribosoom gerecycleerd.',
    next: ['vouwing'] },
  { id: 'seleno', t: 'Selenocysteïne & pyrrolysine', en: '21st & 22nd amino acid', stage: 'tl', scale: 4, kind: 'process',
    s: 'Hercodering van stopcodons: UGA → selenocysteïne dankzij een SECIS-element (bij eukaryoten en archaea in de 3\'-UTR, bij bacteriën net achter het UGA); UAG → pyrrolysine in sommige archaea (methanogenen) en enkele bacteriën.',
    course: true, rel: ['aminozuren', 'codon'] },
  { id: 'er', t: 'Ruw ER & SRP-route', en: 'Co-translational targeting', stage: 'tl', scale: 2, kind: 'process',
    s: 'Een N-terminaal signaalpeptide wordt door SRP herkend; het ribosoom koppelt aan het Sec61-translocon en het eiwit wordt tijdens translatie het ER in of het membraan in gebracht.',
    next: ['golgi'], rel: ['glyco', 'disulfide'] },

  // ───────────── EIWITSTRUCTUUR & -LOT ─────────────
  { id: 'aminozuren', t: 'De 20 aminozuren', en: 'Standard amino acids', stage: 'prot', scale: 5, kind: 'structure',
    s: 'Cα met aminogroep, carboxylgroep, H en variabele zijketen (R). Groepering: hydrofoob, polair/hydrofiel, geladen (+/−). Naam + drie- en éénlettercode zijn examenstof.',
    course: true, rel: ['peptide', 'seleno'] },
  { id: 'peptide', t: 'Peptidebinding & φ/ψ', en: 'Peptide bond & dihedral angles', stage: 'prot', scale: 5, kind: 'structure',
    s: 'Amidebinding (condensatie, water vrij). Vlak (planair) en star; draaiing kan enkel rond N–Cα (φ) en Cα–C (ψ). Glycine (achiraal) en proline (cyclisch) zijn uitzonderingen.',
    course: true, next: ['secundair'], rel: ['ramachandran'] },
  { id: 'primair', t: 'Primaire structuur', en: 'Primary structure', stage: 'prot', scale: 4, kind: 'structure',
    s: 'De aminozuursequentie van N- naar C-terminus; bepaalt uiteindelijk de 3D-structuur.',
    course: true, in: ['aminozuren', 'peptide'], next: ['secundair'] },
  { id: 'secundair', t: 'Secundaire structuur', en: 'Secondary structure', stage: 'prot', scale: 4, kind: 'structure',
    s: 'Lokale 3D-structuur door backbone-waterstofbruggen: α-helix (i→i+4, 3,6 residu/winding), 3₁₀- en π-helix, β-strengen/-bladen (parallel, antiparallel, gemengd), lussen.',
    course: true, in: ['ramachandran'], next: ['tertiair'] },
  { id: 'ramachandran', t: 'Ramachandran-plot', en: 'Ramachandran plot', stage: 'prot', scale: 5, kind: 'structure',
    s: 'Uitzetting van φ tegen ψ per residu; toont toegelaten gebieden (α-helix rond −60/−45, β rond −120/+120) en uitschieters door sterische hinder.',
    course: true },
  { id: 'tertiair', t: 'Tertiaire structuur & domeinen', en: 'Tertiary structure, supersecondary motifs, domains', stage: 'prot', scale: 4, kind: 'structure',
    s: 'Globale vouwing van één keten, gestabiliseerd door hydrofoob effect, H-bruggen, zoutbruggen, disulfidebruggen en liganden. Tussenniveau: supersecundaire structuren (helix-turn-helix, Greek key, Rossmann-fold…) en domeinen.',
    course: true, next: ['quaternair'], rel: ['disulfide'] },
  { id: 'quaternair', t: 'Quaternaire structuur', en: 'Quaternary structure', stage: 'prot', scale: 3, kind: 'structure',
    s: 'Meerdere ketens (protomeren) samen: homo- of heteromeer. Voorbeeld uit de cursus: hemoglobine, een α2β2-heterotetrameer.',
    course: true, pdb: ['1BBB', '2HHB'] },
  { id: 'vouwing', t: 'Eiwitvouwing', en: 'Protein folding', stage: 'prot', scale: 4, kind: 'process',
    s: 'De sequentie bevat de informatie voor de natieve structuur (Anfinsen). Vouwing verloopt via een energietrechter, vaak al co-translationeel, in µs tot s (Levinthal-paradox).',
    in: ['primair', 'secundair', 'tertiair', 'chaperones'], next: ['ptm', 'er'], rel: ['idp', 'misvouwing'] },
  { id: 'chaperones', t: 'Chaperones', en: 'Molecular chaperones', stage: 'prot', scale: 3, kind: 'structure',
    s: 'Hsp70 (en trigger factor bij bacteriën) beschermt ontstaande ketens; chaperonines (GroEL/GroES, TRiC/CCT) bieden een afgesloten vouwkamer.' },
  { id: 'ptm', t: 'Post-translationele modificaties', en: 'Post-translational modifications', stage: 'prot', scale: 4, kind: 'process',
    s: 'Fosforylatie (Ser/Thr/Tyr), glycosylatie, methylatie, acetylatie, ubiquitinering, hydroxylering (bv. hydroxyproline in collageen).',
    course: true, in: ['glyco', 'disulfide'], rel: ['histonmod', 'ubiquitine'] },
  { id: 'glyco', t: 'N-glycosylatie', en: 'N-linked glycosylation', stage: 'prot', scale: 4, kind: 'process',
    s: 'Oligosaccharyltransferase zet in het ER een voorgevormde suikerboom op Asn in het motief N-X-S/T (X ≠ Pro); in het Golgi verder bewerkt.' },
  { id: 'disulfide', t: 'Disulfidebruggen', en: 'Disulfide bonds', stage: 'prot', scale: 5, kind: 'process',
    s: 'Covalente S–S-binding tussen twee cysteïnes, gevormd in de oxiderende omgeving van het ER met hulp van PDI.',
    course: true },
  { id: 'golgi', t: 'Golgi & secretie', en: 'Secretory pathway', stage: 'prot', scale: 2, kind: 'process',
    s: 'Vesikels van ER naar Golgi; sortering naar plasmamembraan, secretie of lysosoom.' },
  { id: 'ubiquitine', t: 'Ubiquitine–proteasoom', en: 'Ubiquitin–proteasome system', stage: 'prot', scale: 3, kind: 'process',
    s: 'E1–E2–E3-cascade hangt ubiquitineketens aan; K48-gekoppelde ketens sturen het eiwit naar het 26S-proteasoom voor afbraak.' },
  { id: 'misvouwing', t: 'Misvouwing & aggregatie', en: 'Misfolding & aggregation', stage: 'prot', scale: 4, kind: 'process',
    s: 'Verkeerd gevouwen eiwitten kunnen aggregeren tot amyloïdfibrillen (cross-β); betrokken bij o.a. Alzheimer en Parkinson.',
    rel: ['ubiquitine', 'chaperones'] },
  { id: 'idp', t: 'Intrinsiek ongeordende eiwitten', en: 'Intrinsically disordered proteins', stage: 'prot', scale: 4, kind: 'structure',
    s: 'Eiwitten of regio\'s zonder vaste structuur die pas ordenen bij binding of onder bepaalde condities (laatste hoofdstuk van de cursus).',
    course: true },
];

const CHECKED = new Set(['entry', 'genome', 'repl', 'txn', 'rna', 'tl', 'prot', 'cel', 'virus', 'adeno', 'lnp', 'endocytose', 'baltimore', 'rt', 'integratie', 'kernimport', 'kern', 'nucleolus', 'chromosoom', 'chromatine', 'nucleosoom', 'histonmod', 'dnamethyl', 'gen', 'dnahelix', 'dnavormen', 'noncanon', 'basenparing', 'nucleotide', 'supercoiling', 'replicatie', 'replisoom', 'ssdna', 'telomeren', 'herstel', 'mutaties', 'genregulatie', 'promoter', 'transcriptie', 'rnapol', 'operon', 'polymerasen', 'rnaprocessing', 'capping', 'splicing', 'polya', 'editing', 'export', 'nmd', 'rnai', 'mrnaafbraak', 'rnastructuur', 'translatie', 'ribosoom', 'ribogenese', 'codon', 'trna', 'aars', 'initiatie', 'elongatie', 'terminatie', 'seleno', 'er', 'aminozuren', 'peptide', 'primair', 'secundair', 'ramachandran', 'tertiair', 'quaternair', 'vouwing', 'chaperones', 'ptm', 'glyco', 'disulfide', 'golgi', 'ubiquitine', 'misvouwing', 'idp']); // verificatierondes 1 + 2 (docs/verificatie-ronde-*.md); rnapol: residubereiken 5FLM nagekeken via alignering met gist-Rpb1 (29-09-2026)
export const NODES = Object.fromEntries(N.map(n => [n.id, { in: [], next: [], rel: [], pdb: [], status: CHECKED.has(n.id) ? 'nagekeken' : 'concept', ...n }]));

/* Bereken ook de omgekeerde verbanden (wie verwijst naar mij) */
for (const n of Object.values(NODES)) {
  n.parents = []; n.prev = [];
}
for (const n of Object.values(NODES)) {
  for (const c of n.in) NODES[c]?.parents.push(n.id);
  for (const c of n.next) NODES[c]?.prev.push(n.id);
}

export function missingRefs() {
  const out = [];
  for (const n of Object.values(NODES))
    for (const k of ['in', 'next', 'rel'])
      for (const r of n[k]) if (!NODES[r]) out.push(`${n.id}.${k} → ${r}`);
  return out;
}
