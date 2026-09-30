/*
 * Nucleïnezuren-atlas: inhoud per item (NL/EN).
 * Elke PDB-code is nagekeken via https://data.rcsb.org/rest/v1/core/entry/<ID> (titel + inhoud).
 *
 * velden
 *   id, pdb (of null = enkel overzicht), name{nl,en}, sub{nl,en} (korte ondertitel)
 *   type[]  : dna | rna | hybrid | prot | drug
 *   cls[]   : duplex | quad | triplex | junction | single | folded | complex | circular | info
 *   ctx[]   : cell | virus | drug | lab | other
 *   org     : organisme waaruit de structuur komt (badge)
 *   helix   : ketens waarop helixparameters berekend worden (enkel dubbelhelices)
 *   hand    : verwachte draairichting ('r' | 'l') voor de controle
 *   third   : keten van de derde streng (triplex)
 *   keep    : enkel deze ketens tonen (één kopie uit de asymmetrische eenheid)
 *   assembly: biologische assemblage laden (.pdb1; symmetriekopieën worden extra ketens)
 *   heavy   : grote structuur → lichtere weergave
 *   bent    : helix sterk gebogen → parameters met waarschuwing
 *   what, feat[], cell : tekst;  scenes[] : knopen in de verhaal-app;  src[] : bronnen
 *   cmp[]   : voorgestelde vergelijkingen
 */
const doi = (d, label) => ({ label, url: 'https://doi.org/' + d });
const pubmed = (id, label) => ({ label, url: 'https://pubmed.ncbi.nlm.nih.gov/' + id + '/' });

export const ENTRIES = [
  /* ================= DNA-dubbelhelices ================= */
  {
    id: 'bdna', pdb: '1BNA', type: ['dna'], cls: ['duplex'], ctx: ['cell'], org: { nl: 'synthetisch', en: 'synthetic' },
    name: { nl: 'B-DNA', en: 'B-DNA' }, sub: { nl: 'Dickerson-dodecameer d(CGCGAATTCGCG)', en: 'Dickerson dodecamer d(CGCGAATTCGCG)' },
    helix: ['A', 'B'], hand: 'r', cmp: ['adna', 'zdna'], scenes: ['dnahelix', 'dnavormen'],
    what: {
      nl: 'De klassieke Watson–Crick-helix en de standaardvorm van DNA in de cel: rechtshandig, ~10,5 bp per winding in oplossing, basenparen bijna loodrecht op de as en gecentreerd. De suikers staan in C2\'-endo. Een brede grote groef en een smalle kleine groef maken de randen van de basen bereikbaar voor eiwitten.',
      en: 'The classic Watson–Crick helix and the standard form of DNA in the cell: right-handed, ~10.5 bp per turn in solution, base pairs almost perpendicular to the axis and centred on it. The sugars are C2\'-endo. A wide major groove and a narrow minor groove expose the edges of the bases to proteins.' },
    feat: {
      nl: ['twist ~+34–36° per bp, stijging ~3,4 Å', 'diameter ~20 Å', 'suikers C2\'-endo (South), basen anti', 'dit kristal is licht gebogen (~19°) en heeft een smalle kleine groef in het AATT-centrum, bezet door een "hydratatieruggengraat" van watermoleculen'],
      en: ['twist ~+34–36° per bp, rise ~3.4 Å', 'diameter ~20 Å', 'sugars C2\'-endo (South), bases anti', 'this crystal is slightly bent (~19°) and has a narrow minor groove in the AATT centre, occupied by a "spine of hydration" of water molecules'] },
    cell: {
      nl: 'Vrijwel al het genomische DNA (in chromatine, rond nucleosomen gewonden) is B-vormig. Transcriptiefactoren lezen de sequentie vooral via de grote groef; sommige eiwitten herkennen de vorm en breedte van de kleine groef.',
      en: 'Practically all genomic DNA (in chromatin, wrapped around nucleosomes) is B-form. Transcription factors read the sequence mainly through the major groove; some proteins recognise the shape and width of the minor groove.' },
    src: [doi('10.1073/pnas.78.4.2179', 'Drew et al. (1981) PNAS 78:2179')],
  },
  {
    id: 'adna', pdb: '440D', type: ['dna'], cls: ['duplex'], ctx: ['lab'], org: { nl: 'synthetisch', en: 'synthetic' },
    name: { nl: 'A-DNA', en: 'A-DNA' }, sub: { nl: 'd(AGGGGCCCCT) · model voor poly(dG)·poly(dC)', en: 'd(AGGGGCCCCT) · model for poly(dG)·poly(dC)' },
    helix: ['A', 'B'], hand: 'r', cmp: ['bdna', 'zdna'], scenes: ['dnavormen'],
    what: {
      nl: 'Rechtshandige dubbelhelix met ~11 bp per winding. De suikers staan in C3\'-endo, waardoor opeenvolgende fosfaten dichter bij elkaar liggen (~5,9 i.p.v. ~7 Å) en de basenparen sterk gekanteld en van de as weggeschoven zijn: langs de as ontstaat een hol kanaal. De grote groef is smal en diep, de kleine groef breed en ondiep.',
      en: 'Right-handed double helix with ~11 bp per turn. The sugars are C3\'-endo, so consecutive phosphates are closer together (~5.9 instead of ~7 Å) and the base pairs are strongly inclined and displaced from the axis: a hollow channel runs along the axis. The major groove is narrow and deep, the minor groove wide and shallow.' },
    feat: {
      nl: ['twist ~+33° per bp, ~11 bp/winding', 'stijging ~2,6 Å per bp; diameter ~23 Å', 'suikers C3\'-endo (North), basen anti', 'basenparen ~20° gekanteld t.o.v. de as'],
      en: ['twist ~+33° per bp, ~11 bp/turn', 'rise ~2.6 Å per bp; diameter ~23 Å', 'sugars C3\'-endo (North), bases anti', 'base pairs inclined ~20° to the axis'] },
    cell: {
      nl: 'Zuiver A-DNA is zeldzaam in de cel: DNA neemt de A-vorm aan bij dehydratatie (kristallen, vezels) en lokaal in sommige eiwitcomplexen, bv. vlak bij het actieve centrum van DNA-polymerasen. Belangrijk: dubbelstrengig RNA en RNA–DNA-hybriden zijn wél (bijna) altijd A-vormig, omdat de 2\'-OH de C3\'-endo-suiker bevoordeelt.',
      en: 'Pure A-DNA is rare in the cell: DNA adopts the A form upon dehydration (crystals, fibres) and locally in some protein complexes, e.g. close to the active site of DNA polymerases. Importantly, double-stranded RNA and RNA–DNA hybrids are (almost) always A-form, because the 2\'-OH favours the C3\'-endo sugar.' },
    src: [doi('10.1046/j.1432-1327.1999.00270.x', 'Gao et al. (1999) Eur J Biochem 261:413')],
  },
  {
    id: 'zdna', pdb: '1DCG', type: ['dna'], cls: ['duplex'], ctx: ['cell', 'lab'], org: { nl: 'synthetisch', en: 'synthetic' },
    name: { nl: 'Z-DNA', en: 'Z-DNA' }, sub: { nl: 'd(CGCGCG) · 1,0 Å', en: 'd(CGCGCG) · 1.0 Å' },
    helix: ['A', 'B'], hand: 'l', cmp: ['bdna', 'zalpha'], scenes: ['dnavormen'],
    what: {
      nl: 'Linkshandige dubbelhelix met een zigzaggende ruggengraat: de herhalingseenheid is een dinucleotide. In alternerende purine–pyrimidinesequenties zoals (CG)n staan de guanines syn met een C3\'-endo-suiker en de cytosines anti met een C2\'-endo-suiker. ~12 bp per winding, een vrijwel vlakke "grote groef" en een smalle, diepe kleine groef.',
      en: 'Left-handed double helix with a zigzag backbone: the repeating unit is a dinucleotide. In alternating purine–pyrimidine sequences such as (CG)n the guanines are syn with a C3\'-endo sugar and the cytosines anti with a C2\'-endo sugar. ~12 bp per turn, an almost flat "major groove" and a narrow, deep minor groove.' },
    feat: {
      nl: ['linkshandig: gemiddelde twist ~−30° (per stap afwisselend ≈ −9° en −51°)', 'syn-guanines — zet "syn-basen markeren" aan', 'zigzag-fosfaatketen — kies weergave "Ruggengraat"', 'stijging ~3,7 Å; diameter ~18 Å'],
      en: ['left-handed: mean twist ~−30° (alternating ≈ −9° and −51° per step)', 'syn guanines — switch on "highlight syn bases"', 'zigzag phosphate chain — choose the "Backbone" view', 'rise ~3.7 Å; diameter ~18 Å'] },
    cell: {
      nl: 'Z-DNA ontstaat tijdelijk achter een transcriberend RNA-polymerase, waar negatieve supercoiling de helix ontwindt, vooral in (CG)n- of (CA)n-herhalingen. Eiwitten met een Zα-domein (ADAR1, ZBP1) herkennen Z-DNA en Z-RNA; ZBP1 speelt een rol in de afweer tegen virussen en in geprogrammeerde celdood.',
      en: 'Z-DNA forms transiently behind a transcribing RNA polymerase, where negative supercoiling unwinds the helix, especially in (CG)n or (CA)n repeats. Proteins with a Zα domain (ADAR1, ZBP1) recognise Z-DNA and Z-RNA; ZBP1 has a role in antiviral defence and programmed cell death.' },
    src: [pubmed('2722771', 'Gessner et al. (1989) J Biol Chem 264:7921'), doi('10.1038/282680a0', 'Wang et al. (1979) Nature 282:680 — eerste Z-DNA / first Z-DNA')],
  },
  {
    id: 'zalpha', pdb: '1QBJ', type: ['dna', 'prot'], cls: ['duplex', 'complex'], ctx: ['cell'], org: { nl: 'mens (Zα van ADAR1)', en: 'human (Zα of ADAR1)' },
    name: { nl: 'Z-DNA + Zα (ADAR1)', en: 'Z-DNA + Zα (ADAR1)' }, sub: { nl: 'eiwit dat de linkshandige vorm herkent', en: 'protein that recognises the left-handed form' },
    helix: ['D', 'E'], hand: 'l', keep: ['A', 'B', 'D', 'E'], cmp: ['zdna', 'bdna'], scenes: ['dnavormen', 'editing'],
    what: {
      nl: 'Twee Zα-domeinen van het menselijke RNA-editingenzym ADAR1 gebonden aan een korte Z-DNA-helix van d(TCGCGCG). Het domein (een "winged helix-turn-helix") herkent vooral de zigzaggende suiker-fosfaatruggengraat en een syn-guanine, niet de basenvolgorde: de herkenning is conformatiespecifiek.',
      en: 'Two Zα domains of the human RNA-editing enzyme ADAR1 bound to a short Z-DNA helix of d(TCGCGCG). The domain (a "winged helix-turn-helix") mainly recognises the zigzag sugar–phosphate backbone and a syn guanine, not the base sequence: recognition is conformation-specific.' },
    feat: {
      nl: ['helix blijft linkshandig — vergelijk de berekende twist met 1DCG', 'contacten met ruggengraatfosfaten en met een syn-G', 'eiwit in paars, DNA in blauw (kleur per ketentype)'],
      en: ['the helix stays left-handed — compare the computed twist with 1DCG', 'contacts with backbone phosphates and a syn G', 'protein in purple, DNA in blue (colour by chain type)'] },
    cell: {
      nl: 'Bewijs dat de Z-vorm in de cel "gelezen" wordt. ADAR1 zet in dubbelstrengig RNA adenosine om in inosine (A→I-editing); de Zα-domeinen van ADAR1 en ZBP1 binden Z-RNA/Z-DNA en zijn betrokken bij de aangeboren immuniteit en ontsteking.',
      en: 'Evidence that the Z form is "read" in the cell. ADAR1 converts adenosine to inosine in double-stranded RNA (A→I editing); the Zα domains of ADAR1 and ZBP1 bind Z-RNA/Z-DNA and are involved in innate immunity and inflammation.' },
    src: [doi('10.1126/science.284.5421.1841', 'Schwartz et al. (1999) Science 284:1841')],
  },

  /* ================= niet-canoniek DNA ================= */
  {
    id: 'g4', pdb: '1KF1', type: ['dna'], cls: ['quad'], ctx: ['cell'], org: { nl: 'menselijke telomeersequentie', en: 'human telomeric sequence' },
    name: { nl: 'G-quadruplex (K⁺, parallel)', en: 'G-quadruplex (K⁺, parallel)' }, sub: { nl: 'humane telomeer d[AG₃(T₂AG₃)₃] · kristal', en: 'human telomere d[AG₃(T₂AG₃)₃] · crystal' },
    cmp: ['g4basket', 'imotif'], scenes: ['noncanon', 'telomeren'], ions: true,
    what: {
      nl: 'Vier guanines vormen een vlak G-kwartet: elke G gebruikt zijn Watson–Crick-rand (N1, N2) én zijn Hoogsteen-rand (O6, N7) voor waterstofbruggen met zijn buren. Drie kwartetten stapelen op elkaar; in het centrale kanaal zitten K⁺-ionen, elk omringd door de acht O6-carbonylzuurstoffen van twee kwartetten. In dit kristal lopen de vier strengsegmenten parallel en zijn alle guanines anti ("propeller"-lussen).',
      en: 'Four guanines form a planar G-quartet: each G uses its Watson–Crick edge (N1, N2) and its Hoogsteen edge (O6, N7) to hydrogen-bond with its neighbours. Three quartets stack; K⁺ ions sit in the central channel, each surrounded by the eight O6 carbonyl oxygens of two quartets. In this crystal all four strand segments are parallel and all guanines are anti ("propeller" loops).' },
    feat: {
      nl: ['G-kwartetten en K⁺-coördinatie worden hieronder uit de coördinaten berekend', 'zet "ionen" aan om de K⁺ in het kanaal te zien', 'alle G\'s anti — vergelijk met de NMR-structuur in Na⁺ (syn/anti afwisselend)', 'kleur "per base": de kwartetten zijn geel (G)'],
      en: ['G-quartets and K⁺ coordination are computed from the coordinates below', 'switch on "ions" to see the K⁺ in the channel', 'all Gs anti — compare with the NMR structure in Na⁺ (alternating syn/anti)', 'colour "by base": the quartets are yellow (G)'] },
    cell: {
      nl: 'Menselijke telomeren eindigen op een enkelstrengige 3\'-overhang van TTAGGG-herhalingen die G-quadruplexen kan vormen; ook in promotoren (bv. MYC) en in RNA komen ze voor. Met het antilichaam BG4 zijn ze in menselijke celkernen zichtbaar gemaakt. Liganden die G4 stabiliseren remmen telomerase in het lab en worden onderzocht als antikankerstrategie.',
      en: 'Human telomeres end in a single-stranded 3\' overhang of TTAGGG repeats that can form G-quadruplexes; they also occur in promoters (e.g. MYC) and in RNA. The antibody BG4 has visualised them in human cell nuclei. Ligands that stabilise G4 inhibit telomerase in the lab and are being studied as an anticancer strategy.' },
    simpl: {
      nl: 'De topologie hangt af van de omstandigheden: in K⁺-oplossing vormt deze sequentie vooral "hybride" (3+1)-vormen; de volledig parallelle vorm werd in het kristal (en onder moleculaire crowding) gezien. Het K⁺-ion aan het uiteinde van de stapel wordt in het kristal gedeeld met een naburig molecule; daarom liggen maar 4 van zijn O6-liganden in deze kopie.',
      en: 'The topology depends on conditions: in K⁺ solution this sequence mainly forms "hybrid" (3+1) folds; the fully parallel form was seen in the crystal (and under molecular crowding). The K⁺ ion at the end of the stack is shared with a neighbouring molecule in the crystal, so only 4 of its O6 ligands belong to this copy.' },
    src: [doi('10.1038/nature755', 'Parkinson et al. (2002) Nature 417:876'), doi('10.1038/nchem.1548', 'Biffi et al. (2013) Nat Chem 5:182 — G4 in menselijke cellen / in human cells')],
  },
  {
    id: 'g4basket', pdb: '143D', type: ['dna'], cls: ['quad'], ctx: ['lab'], org: { nl: 'menselijke telomeersequentie', en: 'human telomeric sequence' },
    name: { nl: 'G-quadruplex (Na⁺, antiparallel)', en: 'G-quadruplex (Na⁺, antiparallel)' }, sub: { nl: 'zelfde telomeersequentie · NMR, "basket"', en: 'same telomeric sequence · NMR, "basket"' },
    cmp: ['g4'], scenes: ['noncanon', 'telomeren'],
    what: {
      nl: 'Dezelfde telomeersequentie d[AG₃(T₂AG₃)₃], maar bepaald met NMR in Na⁺-oplossing: een antiparallelle "mand" (basket) met één diagonale en twee laterale lussen. Omdat buurstrengen antiparallel lopen, wisselen syn- en anti-guanines elkaar af in elk kwartet en langs elke streng.',
      en: 'The same telomeric sequence d[AG₃(T₂AG₃)₃], but determined by NMR in Na⁺ solution: an antiparallel "basket" with one diagonal and two lateral loops. Because neighbouring strands run antiparallel, syn and anti guanines alternate in each quartet and along each strand.' },
    feat: {
      nl: ['3 G-kwartetten, antiparallel', 'syn/anti-afwisseling (berekend) — zet "syn-basen markeren" aan', 'de Na⁺-ionen zitten niet in het NMR-model'],
      en: ['3 G-quartets, antiparallel', 'alternating syn/anti (computed) — switch on "highlight syn bases"', 'the Na⁺ ions are not part of the NMR model'] },
    cell: {
      nl: 'Toont dat G-quadruplexen polymorf zijn: de vouwing hangt af van het kation (Na⁺ of K⁺), de lussen en de omstandigheden. In de cel is K⁺ het belangrijkste kation (~140 mM), Na⁺ is intracellulair laag.',
      en: 'Shows that G-quadruplexes are polymorphic: the fold depends on the cation (Na⁺ or K⁺), the loops and the conditions. Inside the cell K⁺ is the main cation (~140 mM); intracellular Na⁺ is low.' },
    src: [doi('10.1016/0969-2126(93)90015-9', 'Wang & Patel (1993) Structure 1:263')],
  },
  {
    id: 'imotif', pdb: '1EL2', type: ['dna'], cls: ['quad'], ctx: ['cell', 'lab'], org: { nl: 'menselijke telomeersequentie', en: 'human telomeric sequence' },
    name: { nl: 'i-motief', en: 'i-motif' }, sub: { nl: 'C-rijke telomeerstreng · NMR', en: 'C-rich telomeric strand · NMR' },
    cmp: ['g4', 'g4basket'], scenes: ['noncanon', 'telomeren'],
    what: {
      nl: 'Een vierstrengige structuur van cytosinerijk DNA: twee parallelle duplexen met hemigeprotoneerde C·C⁺-paren (drie waterstofbruggen) schuiven antiparallel in elkaar ("intercalated motif"). Omdat één cytosine per paar aan N3 geprotoneerd is, is licht zure pH nodig. Dit NMR-model is een fragment van de complementaire (C-rijke) streng van de menselijke telomeer, d(CCCTAA)₃CCCT, met één 5-methylcytosine en één uracil als stabiliserende modificaties.',
      en: 'A four-stranded structure of cytosine-rich DNA: two parallel duplexes with hemiprotonated C·C⁺ pairs (three hydrogen bonds) slide into each other antiparallel ("intercalated motif"). Because one cytosine per pair is protonated at N3, slightly acidic pH is needed. This NMR model is a fragment of the complementary (C-rich) strand of the human telomere, d(CCCTAA)₃CCCT, with one 5-methylcytosine and one uracil as stabilising modifications.' },
    feat: {
      nl: ['C·C⁺-paren: hieronder geteld uit de N3–N3- en N4–O2-afstanden', 'zeer smalle groeven, basenparen van beide duplexen afwisselend gestapeld', 'stabiel bij pH < ~6,5'],
      en: ['C·C⁺ pairs: counted below from N3–N3 and N4–O2 distances', 'very narrow grooves, base pairs of both duplexes alternately stacked', 'stable at pH < ~6.5'] },
    cell: {
      nl: 'i-motieven kunnen zich vormen in de C-rijke streng van telomeren en promotoren, tegenover G-quadruplexen. In 2018 werden ze met het antilichaam iMab in menselijke celkernen gedetecteerd, afhankelijk van de celcyclusfase.',
      en: 'i-Motifs can form in the C-rich strand of telomeres and promoters, opposite G-quadruplexes. In 2018 they were detected in human cell nuclei with the antibody iMab, depending on the cell-cycle phase.' },
    src: [doi('10.1006/jmbi.2000.3613', 'Phan, Guéron & Leroy (2000) J Mol Biol 299:123'), doi('10.1038/s41557-018-0046-3', 'Zeraati et al. (2018) Nat Chem 10:631')],
  },
  {
    id: 'triplex', pdb: '1BWG', type: ['dna'], cls: ['triplex'], ctx: ['cell', 'lab'], org: { nl: 'synthetisch', en: 'synthetic' },
    name: { nl: 'Triplex-DNA', en: 'Triplex DNA' }, sub: { nl: 'parallelle triplex (pyrimidinemotief) · NMR', en: 'parallel triplex (pyrimidine motif) · NMR' },
    helix: ['A', 'B'], hand: 'r', third: 'C', cmp: ['bdna', 'g4'], scenes: ['noncanon'],
    what: {
      nl: 'Een derde streng (hier CTCTCT, keten C) ligt in de grote groef van een B-achtige duplex en loopt parallel aan de purinestreng, waaraan ze via Hoogsteen-waterstofbruggen bindt: basentripletten T·A–T en C⁺·G–C. De cytosines van de derde streng moeten aan N3 geprotoneerd zijn, dus is een licht zure pH nodig. Aan beide kanten gaat de triplex over in gewone duplex.',
      en: 'A third strand (here CTCTCT, chain C) lies in the major groove of a B-like duplex and runs parallel to the purine strand, to which it binds through Hoogsteen hydrogen bonds: base triples T·A–T and C⁺·G–C. The cytosines of the third strand must be protonated at N3, so slightly acidic pH is needed. On both sides the triplex continues as an ordinary duplex.' },
    feat: {
      nl: ['basentripletten T·A–T en C⁺·G–C', 'derde streng in de grote groef (kleur per streng)', 'Hoogsteen-gepaarde nucleotiden van de derde streng: hieronder geteld', 'helixparameters berekend op de Watson–Crick-duplex (ketens A + B)'],
      en: ['base triples T·A–T and C⁺·G–C', 'third strand in the major groove (colour by strand)', 'Hoogsteen-paired nucleotides of the third strand: counted below', 'helix parameters computed on the Watson–Crick duplex (chains A + B)'] },
    cell: {
      nl: 'Intramoleculaire triplexen (H-DNA) kunnen zich vormen in lange polypurine·polypyrimidine-spiegelherhalingen en worden in verband gebracht met genomische instabiliteit. Triplexvormende oligonucleotiden (TFO\'s) werden ontwikkeld om een DNA-sequentie gericht te binden — een vorm van groefbinding in de grote groef.',
      en: 'Intramolecular triplexes (H-DNA) can form in long polypurine·polypyrimidine mirror repeats and have been linked to genomic instability. Triplex-forming oligonucleotides (TFOs) were developed to bind a DNA sequence specifically — a form of major-groove binding.' },
    src: [doi('10.1016/S0969-2126(99)80004-5', 'Asensio et al. (1999) Structure 7:1'), doi('10.1146/annurev.bi.64.070195.000433', 'Frank-Kamenetskii & Mirkin (1995) Annu Rev Biochem 64:65')],
  },
  {
    id: 'holliday', pdb: '1DCW', type: ['dna'], cls: ['junction'], ctx: ['cell'], org: { nl: 'synthetisch', en: 'synthetic' },
    name: { nl: 'Holliday-junctie', en: 'Holliday junction' }, sub: { nl: 'vierwegsvertakking d(CCGGTACCGG)₄', en: 'four-way junction d(CCGGTACCGG)₄' },
    cmp: ['bdna'], scenes: ['herstel'], ions: true,
    what: {
      nl: 'Vier DNA-strengen vormen vier dubbelstrengige armen die in één punt samenkomen: het centrale intermediair van homologe recombinatie. In dit kristal stapelen de armen paarsgewijs tot twee quasi-continue helices in een antiparallelle "gestapelde X"-vorm; twee van de vier strengen wisselen in het centrum van helix.',
      en: 'Four DNA strands form four double-stranded arms meeting at one point: the central intermediate of homologous recombination. In this crystal the arms stack pairwise into two quasi-continuous helices in an antiparallel "stacked-X" form; two of the four strands cross over between the helices at the centre.' },
    feat: {
      nl: ['4 strengen, 4 armen (kleur per streng)', 'gestapelde-X-vorm, gestabiliseerd door kationen; zonder kationen opent de junctie tot een vlak vierkant', 'helixparameters niet zinvol: vier korte armen met een knik'],
      en: ['4 strands, 4 arms (colour by strand)', 'stacked-X form, stabilised by cations; without cations the junction opens into a square-planar form', 'helix parameters not meaningful: four short arms with a kink'] },
    cell: {
      nl: 'Ontstaat bij homologe recombinatie (meiose, herstel van dubbelstrengbreuken, herstart van replicatievorken). Wordt verwerkt door resolvasen (GEN1, SLX1–SLX4–MUS81) of "ontbonden" door het BLM–TOPOIIIα–RMI-complex.',
      en: 'Forms during homologous recombination (meiosis, double-strand break repair, restart of replication forks). It is processed by resolvases (GEN1, SLX1–SLX4–MUS81) or "dissolved" by the BLM–TOPOIIIα–RMI complex.' },
    src: [doi('10.1073/pnas.97.8.3971', 'Eichman et al. (2000) PNAS 97:3971')],
  },

  /* ================= geneesmiddel–DNA ================= */
  {
    id: 'netropsin', pdb: '6BNA', type: ['dna', 'drug'], cls: ['duplex'], ctx: ['drug'], org: { nl: 'synthetisch + natuurstof', en: 'synthetic + natural product' },
    name: { nl: 'Netropsine (kleine-groefbinder)', en: 'Netropsin (minor-groove binder)' }, sub: { nl: 'in het Dickerson-dodecameer', en: 'in the Dickerson dodecamer' },
    helix: ['A', 'B'], hand: 'r', cmp: ['bdna', 'intercalator', 'cisplatin'], scenes: ['dnahelix'],
    what: {
      nl: 'Netropsine, een natuurlijk antibioticum met een halvemaanvorm, schuift in de smalle kleine groef van B-DNA ter hoogte van het AATT-centrum (hier in het Dickerson-dodecameer met één 5-broomcytosine). De amide-NH-groepen vormen waterstofbruggen met N3 van adenine en O2 van thymine. Het DNA blijft B-vormig: er is geen intercalatie.',
      en: 'Netropsin, a crescent-shaped natural antibiotic, slides into the narrow minor groove of B-DNA at the AATT centre (here in the Dickerson dodecamer with one 5-bromocytosine). Its amide NH groups hydrogen-bond to N3 of adenine and O2 of thymine. The DNA stays B-form: there is no intercalation.' },
    feat: {
      nl: ['groefbinding: sterk sequentiespecifiek (AT-rijk)', 'G·C-paren zijn ongunstig: de NH₂ van guanine steekt in de kleine groef', 'verdringt de "hydratatieruggengraat" van 1BNA', 'zet "liganden" aan; vergelijk de helixparameters met 1BNA'],
      en: ['groove binding: highly sequence-specific (AT-rich)', 'G·C pairs are unfavourable: the guanine NH₂ protrudes into the minor groove', 'displaces the "spine of hydration" of 1BNA', 'switch on "ligands"; compare the helix parameters with 1BNA'] },
    cell: {
      nl: 'Kleine-groefbinders zoals netropsine en distamycine zijn de prototypes van sequentiespecifieke DNA-liganden (bv. pyrrool–imidazool-polyamiden). Ook de fluorescente DNA-kleurstoffen Hoechst 33258 en DAPI binden in de AT-rijke kleine groef.',
      en: 'Minor-groove binders such as netropsin and distamycin are the prototypes of sequence-specific DNA ligands (e.g. pyrrole–imidazole polyamides). The fluorescent DNA stains Hoechst 33258 and DAPI also bind in the AT-rich minor groove.' },
    src: [doi('10.1016/0022-2836(85)90171-8', 'Kopka et al. (1985) J Mol Biol 183:553')],
  },
  {
    id: 'intercalator', pdb: '1D11', type: ['dna', 'drug'], cls: ['duplex'], ctx: ['drug'], org: { nl: 'synthetisch + natuurstof', en: 'synthetic + natural product' },
    name: { nl: 'Daunomycine (intercalatie)', en: 'Daunomycin (intercalation)' }, sub: { nl: 'd(CGTACG) + 2 daunomycine · 1,2 Å', en: 'd(CGTACG) + 2 daunomycin · 1.2 Å' },
    helix: ['A', 'B'], hand: 'r', assembly: true, cmp: ['netropsin', 'bdna', 'cisplatin'], scenes: ['dnahelix', 'supercoiling'],
    what: {
      nl: 'Daunomycine (daunorubicine) is een antracycline: een vlak aromatisch ringsysteem schuift tussen twee basenparen (intercalatie), terwijl de aminosuiker in de kleine groef ligt. Eén molecule zit aan elke CpG-stap aan de uiteinden van d(CGTACG). Op die plaats verdubbelt de afstand tussen de basenparen (~3,4 → ~6,8 Å) en wordt de helix lokaal ontwonden.',
      en: 'Daunomycin (daunorubicin) is an anthracycline: a planar aromatic ring system slides between two base pairs (intercalation) while its amino sugar lies in the minor groove. One molecule sits at each CpG step at the ends of d(CGTACG). There the distance between base pairs doubles (~3.4 → ~6.8 Å) and the helix is locally unwound.' },
    feat: {
      nl: ['intercalatie: zie "stijging per stap" (~7 Å op de intercalatieplaatsen)', 'lokale ontwinding: lagere twist op die stappen', 'aminosuiker in de kleine groef', 'duplex opgebouwd uit de biologische assemblage (kristal: 1 streng + 1 geneesmiddel)'],
      en: ['intercalation: see "rise per step" (~7 Å at the intercalation sites)', 'local unwinding: lower twist at those steps', 'amino sugar in the minor groove', 'duplex built from the biological assembly (crystal: 1 strand + 1 drug)'] },
    cell: {
      nl: 'Antracyclines (daunorubicine, doxorubicine) zijn chemotherapeutica, o.a. tegen leukemie en borstkanker. Ze werken niet alleen door intercalatie: ze "vergiftigen" topo-isomerase II, dat dan covalent aan geknipt DNA blijft hangen → dubbelstrengbreuken. Een klassieke labintercalator is ethidiumbromide.',
      en: 'Anthracyclines (daunorubicin, doxorubicin) are chemotherapy drugs, e.g. against leukaemia and breast cancer. They act not only by intercalation: they "poison" topoisomerase II, which stays covalently attached to cut DNA → double-strand breaks. A classic lab intercalator is ethidium bromide.' },
    bentNote: {
      nl: 'Slechts 6 bp met twee intercalatieplaatsen: de gemiddelden worden sterk door de uiteinden beïnvloed; kijk vooral naar de waarden per stap.',
      en: 'Only 6 bp with two intercalation sites: the means are strongly affected by the ends; look mainly at the per-step values.' },
    src: [doi('10.1021/bi00378a025', 'Wang et al. (1987) Biochemistry 26:1152')],
  },
  {
    id: 'cisplatin', pdb: '1AIO', type: ['dna', 'drug'], cls: ['duplex'], ctx: ['drug'], org: { nl: 'synthetisch', en: 'synthetic' },
    name: { nl: 'Cisplatine–DNA-adduct', en: 'Cisplatin–DNA adduct' }, sub: { nl: '1,2-d(GpG)-intrastrengcrosslink · 2,6 Å', en: '1,2-d(GpG) intrastrand cross-link · 2.6 Å' },
    helix: ['A', 'B'], hand: 'r', keep: ['A', 'B'], bent: true, cmp: ['bdna', 'intercalator', 'netropsin'], scenes: ['herstel'],
    what: {
      nl: 'Cisplatine (cis-diammineplatina(II)) bindt covalent aan N7 van twee naburige guanines op dezelfde streng: de 1,2-intrastreng-d(GpG)-crosslink, het belangrijkste adduct. De kristalstructuur van een dodecameer met dit adduct toont een helix die ~35–40° naar de grote groef knikt (in oplossing meet NMR zelfs ~78°), met een verbrede, ondiepe kleine groef.',
      en: 'Cisplatin (cis-diammineplatinum(II)) binds covalently to N7 of two neighbouring guanines on the same strand: the 1,2-intrastrand d(GpG) cross-link, the major adduct. The crystal structure of a dodecamer with this adduct shows a helix kinked by ~35–40° towards the major groove (in solution NMR even measures ~78°), with a widened, shallow minor groove.' },
    feat: {
      nl: ['covalent: Pt–N7-bindingen met twee G\'s (zet "liganden" aan; Pt = grijs bolletje)', 'knik richting grote groef: ~35–40° (kristal), ~78° (NMR)', 'de verbrede kleine groef wordt herkend door HMG-box-eiwitten', 'in de cursus bij "alkylering" ingedeeld; strikt genomen is het platinering'],
      en: ['covalent: Pt–N7 bonds to two Gs (switch on "ligands"; Pt = grey sphere)', 'kink towards the major groove: ~35–40° (crystal), ~78° (NMR)', 'the widened minor groove is recognised by HMG-box proteins', 'grouped under "alkylation" in the course; strictly speaking it is platination'] },
    cell: {
      nl: 'Cisplatine is een van de meest gebruikte kankergeneesmiddelen (o.a. testis-, ovarium- en longkanker). De adducten blokkeren replicatie en transcriptie en worden hersteld door nucleotide-excisieherstel (NER).',
      en: 'Cisplatin is one of the most widely used anticancer drugs (e.g. testicular, ovarian and lung cancer). The adducts block replication and transcription and are repaired by nucleotide excision repair (NER).' },
    bentNote: {
      nl: 'Sterk geknikte helix: één rechte cilinder past slecht, dus twist, stijging en diameter zijn ruwe schattingen. Het kristal bevat twee duplexen; hier wordt er één getoond.',
      en: 'Strongly kinked helix: a single straight cylinder fits poorly, so twist, rise and diameter are rough estimates. The crystal contains two duplexes; one is shown here.' },
    src: [doi('10.1038/377649a0', 'Takahara et al. (1995) Nature 377:649'), doi('10.1021/ja9625079', 'Takahara et al. (1996) J Am Chem Soc 118:12309'), doi('10.1021/bi973176v', 'Gelasco & Lippard (1998) Biochemistry 37:9230 (NMR)')],
  },

  /* ================= RNA en hybriden ================= */
  {
    id: 'dsrna', pdb: '1RNA', type: ['rna'], cls: ['duplex'], ctx: ['cell', 'virus'], org: { nl: 'synthetisch', en: 'synthetic' },
    name: { nl: 'Dubbelstrengig RNA (A-vorm)', en: 'Double-stranded RNA (A-form)' }, sub: { nl: '[U(UA)₆A]₂ · 2,25 Å', en: '[U(UA)₆A]₂ · 2.25 Å' },
    helix: ['A', 'B'], hand: 'r', cmp: ['adna', 'hybrid', 'bdna'], scenes: ['rnastructuur', 'rnai'],
    what: {
      nl: 'Dubbelstrengig RNA vormt vrijwel altijd een A-vormige helix: de 2\'-OH-groep bevoordeelt de C3\'-endo-suiker en past slecht in de B-vorm. Resultaat: ~11 bp per winding, gekantelde basenparen, een diepe en zeer smalle grote groef en een brede, ondiepe kleine groef.',
      en: 'Double-stranded RNA almost always forms an A-form helix: the 2\'-OH group favours the C3\'-endo sugar and fits poorly in the B form. The result: ~11 bp per turn, inclined base pairs, a deep and very narrow major groove and a wide, shallow minor groove.' },
    feat: {
      nl: ['suikers C3\'-endo (berekend), basen anti', '~11 bp per winding — vergelijk met A-DNA (440D)', 'smalle grote groef → eiwitten lezen dsRNA vooral via de kleine groef en de 2\'-OH-groepen'],
      en: ['sugars C3\'-endo (computed), bases anti', '~11 bp per turn — compare with A-DNA (440D)', 'narrow major groove → proteins read dsRNA mainly via the minor groove and the 2\'-OH groups'] },
    cell: {
      nl: 'Stammen in tRNA, rRNA, pre-miRNA-haarspelden en siRNA\'s zijn A-vormig. Lang dsRNA is vaak een teken van virusinfectie en wordt herkend door sensoren zoals MDA5, RIG-I en PKR. dsRNA-virussen (Baltimore-klasse III, bv. rotavirus) hebben een dsRNA-genoom.',
      en: 'Stems in tRNA, rRNA, pre-miRNA hairpins and siRNAs are A-form. Long dsRNA is often a sign of viral infection and is recognised by sensors such as MDA5, RIG-I and PKR. dsRNA viruses (Baltimore class III, e.g. rotavirus) have a dsRNA genome.' },
    src: [doi('10.1016/0022-2836(89)90010-7', 'Dock-Bregeon et al. (1989) J Mol Biol 209:459')],
  },
  {
    id: 'hybrid', pdb: '479D', type: ['hybrid', 'dna', 'rna'], cls: ['duplex'], ctx: ['cell', 'virus'], org: { nl: 'synthetisch', en: 'synthetic' },
    name: { nl: 'RNA–DNA-hybride', en: 'RNA–DNA hybrid' }, sub: { nl: 'r(GAAGAAGAG) · d(CTCTTCTTC)', en: 'r(GAAGAAGAG) · d(CTCTTCTTC)' },
    helix: ['A', 'B'], hand: 'r', cmp: ['dsrna', 'bdna', 'adna'], scenes: ['replicatie', 'rt'],
    what: {
      nl: 'Een purinerijke RNA-streng gepaard met een complementaire DNA-streng. De hybride is A-achtig omdat de RNA-suikers C3\'-endo blijven. De DNA-streng is flexibeler: in oplossing (NMR) vertonen de DNA-suikers vaak tussenvormen (O4\'-endo), maar in dit kristal staan ze eveneens C3\'-endo (zie de suikertelling per streng hieronder). De kleine groef van hybriden is doorgaans smaller dan in zuiver A-RNA, een kenmerk dat RNase H gebruikt om ze te herkennen.',
      en: 'A purine-rich RNA strand paired with a complementary DNA strand. The hybrid is A-like because the RNA sugars stay C3\'-endo. The DNA strand is more flexible: in solution (NMR) its sugars often show intermediate puckers (O4\'-endo), but in this crystal they are C3\'-endo as well (see the per-strand sugar counts below). The minor groove of hybrids is usually narrower than in pure A-RNA, a feature RNase H uses to recognise them.' },
    feat: {
      nl: ['kleur per streng of per ketentype: DNA blauw, RNA oranje', 'suikerpuckering per streng: hieronder berekend', 'in dit kristal vrijwel zuivere A-vorm (~11 bp per winding)'],
      en: ['colour by strand or chain type: DNA blue, RNA orange', 'sugar pucker per strand: computed below', 'in this crystal essentially pure A-form (~11 bp per turn)'] },
    cell: {
      nl: 'RNA–DNA-hybriden komen voor als RNA-primers van Okazaki-fragmenten, in R-lussen tijdens transcriptie en als tussenstap van reverse transcriptie (retrovirussen, telomerase, retrotransposons). RNase H1 en H2 breken het RNA in hybriden af.',
      en: 'RNA–DNA hybrids occur as the RNA primers of Okazaki fragments, in R-loops during transcription and as an intermediate of reverse transcription (retroviruses, telomerase, retrotransposons). RNase H1 and H2 degrade the RNA in hybrids.' },
    src: [doi('10.1093/nar/28.10.2171', 'Xiong & Sundaralingam (2000) Nucleic Acids Res 28:2171')],
  },
  {
    id: 'tar', pdb: '1ANR', type: ['rna'], cls: ['folded'], ctx: ['virus'], org: { nl: 'HIV-1', en: 'HIV-1' },
    name: { nl: 'HIV-1 TAR-RNA (bulge)', en: 'HIV-1 TAR RNA (bulge)' }, sub: { nl: 'haarspeld met trinucleotide-bulge · NMR', en: 'hairpin with trinucleotide bulge · NMR' },
    cmp: ['dsrna', 'pseudoknot'], scenes: ['rnastructuur', 'integratie'],
    what: {
      nl: 'Het TAR-element (transactivation response) is een haarspeld aan het 5\'-uiteinde van alle HIV-1-transcripten. Een bulge van drie ongepaarde nucleotiden (U23-C24-U25) onderbreekt de A-vormige stam en laat de helix knikken; bovenaan zit een lus van zes nucleotiden. Dit NMR-model toont het 29-nt kerngedeelte.',
      en: 'The TAR element (transactivation response) is a hairpin at the 5\' end of all HIV-1 transcripts. A bulge of three unpaired nucleotides (U23-C24-U25) interrupts the A-form stem and kinks the helix; a six-nucleotide loop sits at the top. This NMR model shows the 29-nt core.' },
    feat: {
      nl: ['bulge = ongepaarde nucleotiden in één streng van een helix', 'de bulge verbreedt de grote groef, zodat het virale Tat-eiwit (arginine) kan binden', 'NMR: model 1 van 20'],
      en: ['bulge = unpaired nucleotides in one strand of a helix', 'the bulge widens the major groove so the viral Tat protein (arginine) can bind', 'NMR: model 1 of 20'] },
    cell: {
      nl: 'In een geïnfecteerde menselijke cel bindt Tat de bulge en rekruteert het P-TEFb-complex (cycline T1–CDK9), dat RNA-polymerase II fosforyleert zodat de transcriptie van het provirus doorloopt. TAR is daarom een doelwit voor antivirale RNA-liganden.',
      en: 'In an infected human cell Tat binds the bulge and recruits the P-TEFb complex (cyclin T1–CDK9), which phosphorylates RNA polymerase II so that transcription of the provirus continues. TAR is therefore a target for antiviral RNA ligands.' },
    src: [doi('10.1093/nar/24.20.3974', 'Aboul-ela, Karn & Varani (1996) Nucleic Acids Res 24:3974')],
  },
  {
    id: 'trna', pdb: '1EHZ', type: ['rna'], cls: ['folded'], ctx: ['cell'], org: { nl: 'gist (S. cerevisiae)', en: 'yeast (S. cerevisiae)' },
    name: { nl: 'tRNA (L-vorm)', en: 'tRNA (L-shape)' }, sub: { nl: 'tRNA^Phe van gist · 1,93 Å', en: 'yeast tRNA^Phe · 1.93 Å' },
    cmp: ['rnasep', 'riboswitch'], scenes: ['trna', 'aars'], ions: true,
    what: {
      nl: 'Transfer-RNA vouwt zijn klaverbladstructuur (acceptorstam, D-arm, anticodonarm, variabele lus, TψC-arm) tot een L-vorm: de acceptorstam stapelt op de TψC-arm en de anticodonstam op de D-stam. Zo liggen het 3\'-CCA-uiteinde (met het aminozuur) en het anticodon ~75 Å uit elkaar — de afstand tussen het peptidyltransferasecentrum en het decodeercentrum van het ribosoom. Gist-tRNA^Phe was in 1974 de eerste RNA-structuur op atoomniveau; dit is de herbepaling uit 2000.',
      en: 'Transfer RNA folds its cloverleaf (acceptor stem, D arm, anticodon arm, variable loop, TψC arm) into an L-shape: the acceptor stem stacks on the TψC arm and the anticodon stem on the D stem. The 3\'-CCA end (carrying the amino acid) and the anticodon end up ~75 Å apart — the distance between the peptidyl-transferase centre and the decoding centre of the ribosome. Yeast tRNA^Phe was the first RNA structure at atomic resolution (1974); this is the 2000 redetermination.' },
    feat: {
      nl: ['76 nt, twee gestapelde helixdomeinen', 'veel gemodificeerde nucleotiden (o.a. ψ, m²G, wybutosine naast het anticodon) — hieronder opgesomd', 'tertiaire basentripletten in de "elleboog" (D- en T-lus)', 'Mg²⁺-ionen stabiliseren de vouwing'],
      en: ['76 nt, two stacked helical domains', 'many modified nucleotides (e.g. ψ, m²G, wybutosine next to the anticodon) — listed below', 'tertiary base triples in the "elbow" (D and T loops)', 'Mg²⁺ ions stabilise the fold'] },
    cell: {
      nl: 'Elke menselijke cel bevat tientallen tRNA-soorten, gecodeerd door honderden tRNA-genen en gemaakt door RNA-polymerase III. Aminoacyl-tRNA-synthetasen koppelen het juiste aminozuur aan het 3\'-CCA-uiteinde; in het ribosoom paart het anticodon met het codon.',
      en: 'Every human cell contains dozens of tRNA species, encoded by hundreds of tRNA genes and made by RNA polymerase III. Aminoacyl-tRNA synthetases attach the correct amino acid to the 3\'-CCA end; in the ribosome the anticodon pairs with the codon.' },
    src: [doi('10.1017/S1355838200000364', 'Shi & Moore (2000) RNA 6:1091')],
  },
  {
    id: 'pseudoknot', pdb: '437D', type: ['rna'], cls: ['folded'], ctx: ['virus'], org: { nl: 'beet western yellows virus', en: 'beet western yellows virus' },
    name: { nl: 'Frameshift-pseudoknoop', en: 'Frameshifting pseudoknot' }, sub: { nl: 'viraal mRNA-element · 1,6 Å', en: 'viral mRNA element · 1.6 Å' },
    cmp: ['terc', 'tar'], scenes: ['rnastructuur', 'elongatie'], ions: true,
    what: {
      nl: 'Een pseudoknoop ontstaat als nucleotiden in de lus van een haarspeld paren met een stuk buiten die haarspeld. Twee stammen stapelen dan tot een quasi-continue helix, overbrugd door twee lussen. In deze pseudoknoop van het beet western yellows virus liggen lusnucleotiden in de kleine groef van een stam en vormen er basentripletten ("kleine-groeftriplex").',
      en: 'A pseudoknot forms when nucleotides in the loop of a hairpin pair with a segment outside that hairpin. Two stems then stack into a quasi-continuous helix, bridged by two loops. In this beet western yellows virus pseudoknot, loop nucleotides lie in the minor groove of a stem and form base triples there ("minor-groove triplex").' },
    feat: {
      nl: ['twee gestapelde stammen + twee lussen', 'kleine-groeftripletten: lus-A\'s in de kleine groef', 'kristal met Mg²⁺ en Na⁺ (zet "ionen" aan)'],
      en: ['two stacked stems + two loops', 'minor-groove triples: loop As in the minor groove', 'crystal with Mg²⁺ and Na⁺ (switch on "ions")'] },
    cell: {
      nl: 'Zo\'n pseudoknoop net stroomafwaarts van een "glijdende" sequentie laat het ribosoom met een bepaalde kans één nucleotide terugschuiven (programmed −1 ribosomal frameshifting): het virus maakt zo twee eiwitten uit één mRNA. Ook SARS-CoV-2 gebruikt een (drie-stammige) pseudoknoop; HIV-1 een haarspeld.',
      en: 'Such a pseudoknot just downstream of a "slippery" sequence makes the ribosome slip back by one nucleotide with a certain probability (programmed −1 ribosomal frameshifting): the virus thus makes two proteins from one mRNA. SARS-CoV-2 also uses a (three-stemmed) pseudoknot; HIV-1 uses a hairpin.' },
    src: [doi('10.1038/6722', 'Su et al. (1999) Nat Struct Biol 6:285')],
  },
  {
    id: 'terc', pdb: '1YMO', type: ['rna'], cls: ['folded'], ctx: ['cell'], org: { nl: 'mens', en: 'human' },
    name: { nl: 'Telomerase-RNA-pseudoknoop', en: 'Telomerase RNA pseudoknot' }, sub: { nl: 'menselijk hTR, P2b–P3 · NMR', en: 'human hTR, P2b–P3 · NMR' },
    cmp: ['pseudoknot', 'g4'], scenes: ['telomeren'],
    what: {
      nl: 'Het RNA van menselijk telomerase (hTR, ~450 nt) bevat de matrijs voor TTAGGG én een geconserveerde pseudoknoop. Dit NMR-model (47 nt) toont dat de U-rijke lus in de grote groef van stam P2b ligt en daar U·A–U-basentripletten vormt: een grote-groeftriplex die nodig is voor telomerase-activiteit.',
      en: 'The RNA of human telomerase (hTR, ~450 nt) contains the template for TTAGGG and a conserved pseudoknot. This NMR model (47 nt) shows that the U-rich loop lies in the major groove of stem P2b, forming U·A–U base triples: a major-groove triplex required for telomerase activity.' },
    feat: {
      nl: ['pseudoknoop met grote-groeftriplex (vergelijk met de kleine-groeftriplex van BWYV)', 'menselijk RNA', 'NMR: model 1 van 20'],
      en: ['pseudoknot with major-groove triplex (compare with the minor-groove triplex of BWYV)', 'human RNA', 'NMR: model 1 of 20'] },
    cell: {
      nl: 'Telomerase (TERT + hTR) verlengt de telomeren in stam- en kiemcellen en in de meeste kankercellen. Mutaties in deze pseudoknoop veroorzaken dyskeratosis congenita, een ziekte met te korte telomeren.',
      en: 'Telomerase (TERT + hTR) extends telomeres in stem and germ cells and in most cancer cells. Mutations in this pseudoknot cause dyskeratosis congenita, a disease with too-short telomeres.' },
    src: [doi('10.1016/j.molcel.2005.01.017', 'Theimer, Blois & Feigon (2005) Mol Cell 17:671')],
  },
  {
    id: 'hammerhead', pdb: '2OEU', type: ['rna'], cls: ['folded'], ctx: ['other'], org: { nl: 'Schistosoma mansoni', en: 'Schistosoma mansoni' },
    name: { nl: 'Hammerhead-ribozym', en: 'Hammerhead ribozyme' }, sub: { nl: 'volledig zelfknippend ribozym · 2,0 Å', en: 'full-length self-cleaving ribozyme · 2.0 Å' },
    cmp: ['groupi', 'rnasep'], scenes: ['rnastructuur'], ions: true,
    what: {
      nl: 'Een klein zelfknippend ribozym: drie helices rond een geconserveerde kern. Het RNA knipt zichzelf op één fosfodiësterbinding: de 2\'-OH naast de knipplaats valt het fosfaat aan (transesterificatie), wat een 2\',3\'-cyclisch fosfaat en een 5\'-OH oplevert. In deze volledige vorm houdt een tertiair contact tussen stam I en stam II de kern actief gevouwen. De knipplaats draagt hier een 2\'-O-methylgroep (OMC), zodat het kristal niet knipt.',
      en: 'A small self-cleaving ribozyme: three helices around a conserved core. The RNA cleaves itself at one phosphodiester bond: the 2\'-OH next to the cleavage site attacks the phosphate (transesterification), giving a 2\',3\'-cyclic phosphate and a 5\'-OH. In this full-length form a tertiary contact between stems I and II keeps the core in its active fold. The cleavage site carries a 2\'-O-methyl group (OMC) so that the crystal does not cleave.' },
    feat: {
      nl: ['ribozym = katalytisch RNA', 'drie helices + kern; tertiair contact stam I–stam II', 'Mn²⁺ gebonden in het actieve centrum (zet "ionen" aan)', 'twee ketens: enzymstreng + substraatstreng'],
      en: ['ribozyme = catalytic RNA', 'three helices + core; stem I–stem II tertiary contact', 'Mn²⁺ bound at the active site (switch on "ions")', 'two chains: enzyme strand + substrate strand'] },
    cell: {
      nl: 'Hammerhead-ribozymen werden ontdekt in viroïden en satelliet-RNA\'s van planten, waar ze de multimere replicatieproducten knippen. Het motief komt ook voor in genomen van dieren, waaronder zoogdieren; zijn functie daar is grotendeels onbekend. Het is een modelsysteem voor RNA-katalyse.',
      en: 'Hammerhead ribozymes were discovered in plant viroids and satellite RNAs, where they cleave the multimeric replication products. The motif also occurs in animal genomes, including mammals; its function there is largely unknown. It is a model system for RNA catalysis.' },
    src: [doi('10.1016/j.chembiol.2008.03.010', 'Martick et al. (2008) Chem Biol 15:332'), doi('10.1016/j.cell.2006.06.036', 'Martick & Scott (2006) Cell 126:309')],
  },
  {
    id: 'groupi', pdb: '1U6B', type: ['rna', 'prot'], cls: ['folded'], ctx: ['other'], org: { nl: 'Azoarcus (bacterie)', en: 'Azoarcus (bacterium)' },
    name: { nl: 'Zelfsplicend groep I-intron', en: 'Self-splicing group I intron' }, sub: { nl: 'met beide exonen · 3,1 Å', en: 'with both exons · 3.1 Å' },
    cmp: ['hammerhead', 'snrna'], scenes: ['splicing'], ions: true,
    what: {
      nl: 'Een groep I-intron van ~200 nt dat zichzelf uit een voorloper-RNA knipt, zonder eiwit. Stap 1: een externe guanosine valt de 5\'-splicingsite aan. Stap 2: de vrijgekomen 3\'-OH van het 5\'-exon valt de 3\'-splicingsite aan en verbindt de exonen. Deze structuur is vastgelegd vlak vóór stap 2, met beide exonen aanwezig. Het U1A-eiwit is een kristallisatiehulp, gebonden aan een ingebouwde lus.',
      en: 'A ~200-nt group I intron that excises itself from a precursor RNA without protein. Step 1: an external guanosine attacks the 5\' splice site. Step 2: the released 3\'-OH of the 5\' exon attacks the 3\' splice site and joins the exons. This structure is trapped just before step 2, with both exons present. The U1A protein is a crystallisation aid bound to an engineered loop.' },
    feat: {
      nl: ['twee opeenvolgende transesterificaties — dezelfde chemie als het spliceosoom', 'ionen in het actieve centrum (zet "ionen" aan)', 'RNA-vouwing met veel gestapelde helices'],
      en: ['two consecutive transesterifications — the same chemistry as the spliceosome', 'ions in the active site (switch on "ions")', 'RNA fold of many stacked helices'] },
    cell: {
      nl: 'Groep I-intronen zitten in rRNA-, tRNA- en organelgenen van bacteriën, schimmels, planten en protisten (de ontdekking in Tetrahymena leverde Cech de Nobelprijs van 1989 op), niet in het menselijke kerngenoom. Menselijke pre-mRNA\'s worden door het spliceosoom gespliced.',
      en: 'Group I introns occur in rRNA, tRNA and organelle genes of bacteria, fungi, plants and protists (the discovery in Tetrahymena earned Cech the 1989 Nobel Prize), not in the human nuclear genome. Human pre-mRNAs are spliced by the spliceosome.' },
    src: [doi('10.1038/nature02642', 'Adams et al. (2004) Nature 430:45')],
  },
  {
    id: 'rnasep', pdb: '3Q1Q', type: ['rna', 'prot'], cls: ['folded', 'complex'], ctx: ['cell'], org: { nl: 'Thermotoga maritima (bacterie)', en: 'Thermotoga maritima (bacterium)' },
    name: { nl: 'RNase P + tRNA', en: 'RNase P + tRNA' }, sub: { nl: 'bacterieel holo-enzym · 3,8 Å', en: 'bacterial holoenzyme · 3.8 Å' },
    cmp: ['trna', 'hammerhead'], scenes: ['trna'], heavyish: true,
    what: {
      nl: 'RNase P knipt de 5\'-leader van pre-tRNA\'s af. Het is een ribozym: in bacteriën voert de RNA-component (~350–400 nt) de katalyse uit, geholpen door één klein eiwit. Deze structuur toont het holo-enzym met een tRNA (het product): het RNA herkent de "elleboog" en de acceptorstam van het tRNA, zoals ook het ribosoom doet.',
      en: 'RNase P removes the 5\' leader of pre-tRNAs. It is a ribozyme: in bacteria the RNA component (~350–400 nt) performs catalysis, helped by one small protein. This structure shows the holoenzyme with a tRNA (the product): the RNA recognises the "elbow" and acceptor stem of the tRNA.' },
    feat: {
      nl: ['RNase P-RNA (ketentype RNA) + eiwit (paars) + tRNA', 'katalyse door het RNA, met Mg²⁺', 'herkenning van de tRNA-vorm, niet van de sequentie'],
      en: ['RNase P RNA (chain type RNA) + protein (purple) + tRNA', 'catalysis by the RNA, with Mg²⁺', 'recognition of tRNA shape, not sequence'] },
    cell: {
      nl: 'Menselijke kern-RNase P bestaat uit het H1-RNA plus ~10 eiwitten; in mitochondriën doet een eiwitenzym (PRORP, zonder RNA) hetzelfde werk. Samen met het ribosoom is RNase P het bekendste universele ribozym.',
      en: 'Human nuclear RNase P consists of H1 RNA plus ~10 proteins; in mitochondria a protein-only enzyme (PRORP) does the same job. Together with the ribosome, RNase P is the best-known universal ribozyme.' },
    src: [doi('10.1038/NATURE09516', 'Reiter et al. (2010) Nature 468:784')],
  },
  {
    id: 'riboswitch', pdb: '1Y26', type: ['rna'], cls: ['folded'], ctx: ['other'], org: { nl: 'Vibrio vulnificus (bacterie)', en: 'Vibrio vulnificus (bacterium)' },
    name: { nl: 'Adenine-riboswitch', en: 'Adenine riboswitch' }, sub: { nl: 'aptameerdomein + adenine · 2,1 Å', en: 'aptamer domain + adenine · 2.1 Å' },
    cmp: ['trna', 'pseudoknot'], scenes: ['genregulatie'], ions: true,
    what: {
      nl: 'Een riboswitch is een stuk mRNA (meestal in de 5\'-UTR) dat een klein metaboliet rechtstreeks bindt en daardoor van vorm verandert. Dit aptameerdomein (71 nt) vormt een drieweg-junctie waarvan de twee haarspeldlussen elkaar "kussen"; het adenine-ligand wordt volledig ingesloten in de junctie en herkend door Watson–Crick-paring met U74.',
      en: 'A riboswitch is a piece of mRNA (usually in the 5\' UTR) that binds a small metabolite directly and changes shape as a result. This aptamer domain (71 nt) forms a three-way junction whose two hairpin loops "kiss"; the adenine ligand is completely enclosed in the junction and recognised by Watson–Crick pairing with U74.' },
    feat: {
      nl: ['ligand omsloten door RNA (zet "liganden" aan)', 'specificiteit door één base: U74 (adenine) ↔ C74 in de guanine-riboswitch', 'hier werkt adeninebinding als AAN-schakelaar voor translatie'],
      en: ['ligand enclosed by RNA (switch on "ligands")', 'specificity from one base: U74 (adenine) ↔ C74 in the guanine riboswitch', 'here adenine binding acts as an ON switch for translation'] },
    cell: {
      nl: 'Riboswitches regelen genexpressie zonder eiwit, vooral in bacteriën (via transcriptieterminatie of translatie-initiatie). In mensen zijn geen riboswitches bekend; eukaryote voorbeelden (TPP-riboswitch) komen voor in planten en schimmels. Ze zijn doelwitten voor nieuwe antibiotica.',
      en: 'Riboswitches regulate gene expression without protein, mainly in bacteria (via transcription termination or translation initiation). No riboswitches are known in humans; eukaryotic examples (TPP riboswitch) occur in plants and fungi. They are targets for new antibiotics.' },
    src: [doi('10.1016/j.chembiol.2004.11.018', 'Serganov et al. (2004) Chem Biol 11:1729')],
  },
  {
    id: 'ribosome', pdb: '1J5E', type: ['rna', 'prot'], cls: ['folded', 'complex'], ctx: ['cell'], org: { nl: 'Thermus thermophilus (bacterie)', en: 'Thermus thermophilus (bacterium)' },
    name: { nl: 'Ribosoom: 30S-subeenheid', en: 'Ribosome: 30S subunit' }, sub: { nl: '16S-rRNA + ~20 eiwitten · 3,05 Å', en: '16S rRNA + ~20 proteins · 3.05 Å' },
    heavy: true, cmp: ['trna', 'mirna'], scenes: ['ribosoom', 'translatie'],
    what: {
      nl: 'De kleine ribosomale subeenheid van een bacterie: het 16S-rRNA (~1500 nt) vormt het skelet (lichaam, platform, hoofd), bezet met ~20 eiwitten die vooral aan de buitenkant liggen. Het decodeercentrum — waar codon en anticodon paren — bestaat vrijwel volledig uit RNA (o.a. G530, A1492, A1493).',
      en: 'The small ribosomal subunit of a bacterium: the 16S rRNA (~1500 nt) forms the scaffold (body, platform, head), decorated with ~20 proteins that lie mostly on the outside. The decoding centre — where codon and anticodon pair — is made almost entirely of RNA (e.g. G530, A1492, A1493).' },
    feat: {
      nl: ['kleur per ketentype: rRNA oranje, eiwitten paars', 'RNA bepaalt vorm én functie', 'grote structuur (~52 000 atomen): cartoonweergave; stokjes of bollen zijn traag', 'de grote subeenheid katalyseert de peptidebinding — ook dat doet RNA (het ribosoom is een ribozym)'],
      en: ['colour by chain type: rRNA orange, proteins purple', 'RNA determines shape and function', 'large structure (~52,000 atoms): cartoon view; sticks or spheres are slow', 'the large subunit catalyses peptide-bond formation — also done by RNA (the ribosome is a ribozyme)'] },
    cell: {
      nl: 'Menselijke ribosomen zijn 80S (40S + 60S); de 40S bevat het 18S-rRNA (~1870 nt) en 33 eiwitten. De kern van het rRNA en het decodeercentrum zijn geconserveerd, daarom is de bacteriële 30S een goed model. Antibiotica zoals aminoglycosiden en tetracyclines binden het bacteriële ribosoom veel sterker dan het cytosolische menselijke.',
      en: 'Human ribosomes are 80S (40S + 60S); the 40S contains the 18S rRNA (~1870 nt) and 33 proteins. The rRNA core and the decoding centre are conserved, which makes the bacterial 30S a good model. Antibiotics such as aminoglycosides and tetracyclines bind the bacterial ribosome much more strongly than the human cytosolic one.' },
    src: [doi('10.1038/35030006', 'Wimberly et al. (2000) Nature 407:327')],
  },
  {
    id: 'mirna', pdb: '4W5N', type: ['rna', 'prot'], cls: ['single', 'complex'], ctx: ['cell', 'lab'], org: { nl: 'mens', en: 'human' },
    name: { nl: 'miRNA in Argonaute-2', en: 'miRNA in Argonaute-2' }, sub: { nl: 'humaan AGO2 + 21-nt gids-RNA · 2,9 Å', en: 'human AGO2 + 21-nt guide RNA · 2.9 Å' },
    cmp: ['dsrna', 'ssdna'], scenes: ['rnai'],
    what: {
      nl: 'Argonaute-2 (AGO2) is de kern van het RNA-geïnduceerde silencingcomplex (RISC). Het houdt een ~21-nt gids-RNA (miRNA of siRNA) vast met beide uiteinden verankerd: het 5\'-fosfaat in de MID-domeinpocket, het 3\'-uiteinde in het PAZ-domein. Nucleotiden 2–8 (de "seed") liggen voorgevormd in een A-achtige halve helix, klaar om met een doel-mRNA te paren.',
      en: 'Argonaute-2 (AGO2) is the core of the RNA-induced silencing complex (RISC). It holds a ~21-nt guide RNA (miRNA or siRNA) with both ends anchored: the 5\' phosphate in the MID-domain pocket, the 3\' end in the PAZ domain. Nucleotides 2–8 (the "seed") are pre-arranged in an A-like half-helix, ready to pair with a target mRNA.' },
    feat: {
      nl: ['eiwit (N, PAZ, MID, PIWI) + enkelstrengig gids-RNA', 'seed-regio (nt 2–8) blootgesteld', 'PIWI = RNase H-achtig domein: bij perfecte paring knipt AGO2 het doel ("slicing")', 'niet het hele gids-RNA is geordend in het kristal'],
      en: ['protein (N, PAZ, MID, PIWI) + single-stranded guide RNA', 'seed region (nt 2–8) exposed', 'PIWI = RNase H-like domain: with perfect pairing AGO2 cleaves the target ("slicing")', 'not the whole guide RNA is ordered in the crystal'] },
    cell: {
      nl: 'miRNA\'s worden als pri-miRNA door Pol II gemaakt, door Drosha–DGCR8 (kern) en Dicer (cytoplasma) versneden en in AGO geladen. Via de seed herkent RISC doelsequenties (meestal in 3\'-UTR\'s), onderdrukt de translatie en bevordert de afbraak van het mRNA. siRNA-geneesmiddelen gebruiken dezelfde machinerie.',
      en: 'miRNAs are made by Pol II as pri-miRNAs, trimmed by Drosha–DGCR8 (nucleus) and Dicer (cytoplasm) and loaded into AGO. Through the seed, RISC recognises target sequences (mostly in 3\' UTRs), represses translation and promotes mRNA decay. siRNA drugs use the same machinery.' },
    src: [doi('10.1126/science.1258040', 'Schirle, Sheu-Gruttadauria & MacRae (2014) Science 346:608')],
  },
  {
    id: 'snrna', pdb: '4PJO', type: ['rna', 'prot'], cls: ['folded', 'complex'], ctx: ['cell'], org: { nl: 'mens', en: 'human' },
    name: { nl: 'snRNA: U1 snRNP', en: 'snRNA: U1 snRNP' }, sub: { nl: 'U1-snRNA + Sm-ring + U1-70K + U1-C · 3,3 Å', en: 'U1 snRNA + Sm ring + U1-70K + U1-C · 3.3 Å' },
    keep: ['1', 'X', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'K', 'L'], cmp: ['premrna', 'groupi'], scenes: ['splicing'],
    what: {
      nl: 'Het U1 snRNP herkent de 5\'-splicingsite van elk intron. Deze kristalstructuur toont een ingekort, deels aangepast menselijk U1-snRNA met de zevenledige Sm-eiwitring (SmB, D1, D2, D3, E, F, G) en de U1-specifieke eiwitten U1-70K en U1-C. Het 5\'-uiteinde van het snRNA paart met een RNA-oligo dat een 5\'-splicingsite nabootst (AG|GUAAGU); U1-C stabiliseert die korte duplex.',
      en: 'The U1 snRNP recognises the 5\' splice site of every intron. This crystal structure shows a shortened, partly engineered human U1 snRNA with the seven-membered Sm protein ring (SmB, D1, D2, D3, E, F, G) and the U1-specific proteins U1-70K and U1-C. The 5\' end of the snRNA pairs with an RNA oligo mimicking a 5\' splice site (AG|GUAAGU); U1-C stabilises this short duplex.' },
    feat: {
      nl: ['RNA–eiwitcomplex (kleur per ketentype)', 'Sm-ring rond de Sm-plaats van het snRNA', 'basenparing snRNA ↔ 5\'-splicingsite', 'één van de kopieën uit de asymmetrische eenheid'],
      en: ['RNA–protein complex (colour by chain type)', 'Sm ring around the Sm site of the snRNA', 'base pairing snRNA ↔ 5\' splice site', 'one of the copies in the asymmetric unit'] },
    cell: {
      nl: 'snRNA\'s (U1, U2, U4, U5, U6 en de minor U11, U12, U4atac, U6atac) zijn korte (~100–190 nt), uridinerijke niet-coderende RNA\'s in de kern. Samen met eiwitten vormen ze het spliceosoom, dat intronen uit pre-mRNA verwijdert; U2 en U6 vormen het katalytische RNA-centrum.',
      en: 'snRNAs (U1, U2, U4, U5, U6 and the minor U11, U12, U4atac, U6atac) are short (~100–190 nt), uridine-rich non-coding RNAs in the nucleus. Together with proteins they form the spliceosome, which removes introns from pre-mRNA; U2 and U6 form the catalytic RNA centre.' },
    src: [doi('10.7554/eLife.04986', 'Kondo et al. (2015) eLife 4:e04986')],
  },

  /* ================= DNA–eiwit ================= */
  {
    id: 'nucleosome', pdb: '1KX5', type: ['dna', 'prot'], cls: ['duplex', 'complex'], ctx: ['cell'], org: { nl: 'menselijk DNA + Xenopus-histonen', en: 'human DNA + Xenopus histones' },
    name: { nl: 'Nucleosoom', en: 'Nucleosome' }, sub: { nl: 'kerndeeltje: 147 bp rond een histonoctameer · 1,9 Å', en: 'core particle: 147 bp around a histone octamer · 1.9 Å' },
    cmp: ['bdna', 'ssdna'], scenes: ['nucleosoom', 'chromatine'], histone: true, heavyish: true,
    what: {
      nl: 'Het nucleosoomkerndeeltje: 147 bp DNA gewonden in ~1,65 linkshandige superhelixwindingen rond een histonoctameer (2× H2A, H2B, H3, H4). Het DNA is sterk en ongelijkmatig gebogen; waar de kleine groef naar het octameer kijkt, steken arginines erin. De flexibele histonstaarten steken uit het deeltje en dragen de meeste histonmodificaties.',
      en: 'The nucleosome core particle: 147 bp of DNA wrapped in ~1.65 left-handed superhelical turns around a histone octamer (2× H2A, H2B, H3, H4). The DNA is strongly and unevenly bent; where the minor groove faces the octamer, arginines insert into it. The flexible histone tails protrude from the particle and carry most histone modifications.' },
    feat: {
      nl: ['147 bp (menselijke α-satellietsequentie) + histonen (grijs)', '~1,65 superhelixwindingen, linkshandig', 'per nucleotide: vrijwel B-vorm (suikers berekend)', 'helixparameters niet zinvol: de as is zelf een superhelix'],
      en: ['147 bp (human α-satellite sequence) + histones (grey)', '~1.65 superhelical turns, left-handed', 'per nucleotide: essentially B-form (sugars computed)', 'helix parameters not meaningful: the axis itself is a superhelix'] },
    cell: {
      nl: 'Chromatine bestaat uit nucleosomen om de ~200 bp, verbonden door linker-DNA waaraan histon H1 bindt. Nucleosoompositie en histonmodificaties bepalen of transcriptiefactoren en RNA-polymerase het DNA kunnen bereiken.',
      en: 'Chromatin consists of nucleosomes every ~200 bp, connected by linker DNA to which histone H1 binds. Nucleosome positioning and histone modifications determine whether transcription factors and RNA polymerase can reach the DNA.' },
    src: [doi('10.1016/S0022-2836(02)00386-8', 'Davey et al. (2002) J Mol Biol 319:1097'), doi('10.1038/38444', 'Luger et al. (1997) Nature 389:251')],
  },
  {
    id: 'ssdna', pdb: '1JMC', type: ['dna', 'prot'], cls: ['single', 'complex'], ctx: ['cell'], org: { nl: 'mens (RPA70)', en: 'human (RPA70)' },
    name: { nl: 'Enkelstrengig DNA + RPA', en: 'Single-stranded DNA + RPA' }, sub: { nl: 'RPA70 DBD-A/B + dC₈ · 2,4 Å', en: 'RPA70 DBD-A/B + dC₈ · 2.4 Å' },
    cmp: ['mirna', 'bdna'], scenes: ['ssdna', 'replisoom'],
    what: {
      nl: 'Enkelstrengig DNA is flexibel en kwetsbaar; in de cel wordt het meteen bedekt door replicatie-eiwit A (RPA). Deze structuur toont de twee DNA-bindende domeinen (DBD-A en DBD-B, OB-vouwen) van de grootste RPA-subeenheid, gebonden aan 8 cytidines. Het DNA ligt uitgestrekt in een groef van het eiwit; de basen stapelen met aromatische zijketens (Phe, Trp) in plaats van met elkaar.',
      en: 'Single-stranded DNA is flexible and vulnerable; in the cell it is immediately coated by replication protein A (RPA). This structure shows the two DNA-binding domains (DBD-A and DBD-B, OB folds) of the largest RPA subunit bound to 8 cytidines. The DNA lies extended in a groove of the protein; the bases stack with aromatic side chains (Phe, Trp) instead of with each other.' },
    feat: {
      nl: ['geen basenparing: enkelstrengig', 'OB-fold-domeinen, stapeling met aromatische aminozuren', 'helixparameters niet van toepassing'],
      en: ['no base pairing: single-stranded', 'OB-fold domains, stacking with aromatic amino acids', 'helix parameters not applicable'] },
    cell: {
      nl: 'RPA (RPA70–RPA32–RPA14) beschermt ssDNA bij replicatie (o.a. op de achterblijvende streng), herstel (resectie van breuken) en recombinatie, en is een platform: RPA-bedekt ssDNA activeert de checkpointkinase ATR.',
      en: 'RPA (RPA70–RPA32–RPA14) protects ssDNA during replication (e.g. on the lagging strand), repair (resection of breaks) and recombination, and acts as a platform: RPA-coated ssDNA activates the checkpoint kinase ATR.' },
    src: [doi('10.1038/385176a0', 'Bochkarev et al. (1997) Nature 385:176')],
  },

  /* ================= overzichten zonder 3D-model ================= */
  {
    id: 'mrna', pdb: null, diagram: 'mrna', type: ['rna'], cls: ['single', 'info'], ctx: ['cell', 'lab'],
    name: { nl: 'Rijp mRNA', en: 'Mature mRNA' }, sub: { nl: 'cap · UTR\'s · CDS · poly(A)', en: 'cap · UTRs · CDS · poly(A)' },
    scenes: ['translatie', 'rnaprocessing', 'lnp'], cmp: ['premrna', 'mirna'],
    what: {
      nl: 'Het rijpe eukaryote mRNA is een enkelstrengig RNA met een vaste opbouw: 5\'-cap (7-methylguanosine via een 5\'–5\'-trifosfaatbrug), 5\'-UTR, de coderende sequentie (CDS, van AUG tot stopcodon), 3\'-UTR en een poly(A)-staart. Het is geen gestrekte draad: het vouwt lokaal tot haarspelden en is in de cel altijd met eiwitten bedekt (mRNP).',
      en: 'The mature eukaryotic mRNA is a single-stranded RNA with a fixed layout: 5\' cap (7-methylguanosine via a 5\'–5\' triphosphate bridge), 5\' UTR, the coding sequence (CDS, from AUG to stop codon), 3\' UTR and a poly(A) tail. It is not an extended thread: it folds locally into hairpins and in the cell it is always coated with proteins (mRNP).' },
    feat: {
      nl: ['cap: m⁷GpppN; bij mensen is nt 1 ook 2\'-O-gemethyleerd (cap 1)', '5\'-UTR: het 43S-complex scant naar het startcodon (Kozak-context gccRccAUGG)', '3\'-UTR: plaatsen voor miRNA\'s en regulerende eiwitten; AAUAAA-signaal voor de 3\'-knip', 'poly(A): ~200–250 A bij synthese in de kern, daarna geleidelijk ingekort; gebonden door PABP'],
      en: ['cap: m⁷GpppN; in humans nt 1 is also 2\'-O-methylated (cap 1)', '5\' UTR: the 43S complex scans to the start codon (Kozak context gccRccAUGG)', '3\' UTR: sites for miRNAs and regulatory proteins; AAUAAA signal for 3\' cleavage', 'poly(A): ~200–250 A when made in the nucleus, then gradually shortened; bound by PABP'] },
    cell: {
      nl: 'Gemaakt in de kern door RNA-polymerase II; cotranscriptioneel gecapt, gespliced en gepolyadenyleerd, daarna via de kernporie geëxporteerd. Cap en poly(A)-staart (via eIF4E–eIF4G–PABP) bevorderen translatie en beschermen tegen afbraak. mRNA-vaccins bootsen deze opbouw na (met gemodificeerde uridines).',
      en: 'Made in the nucleus by RNA polymerase II; capped, spliced and polyadenylated co-transcriptionally, then exported through the nuclear pore. The cap and poly(A) tail (via eIF4E–eIF4G–PABP) promote translation and protect against decay. mRNA vaccines mimic this layout (with modified uridines).' },
    why3d: {
      nl: 'Een volledig mRNA heeft geen vaste 3D-structuur: het is lang, flexibel en eiwitgebonden. Enkel fragmenten (bv. de cap in eIF4E, poly(A) in PABP) zijn als structuur bepaald.',
      en: 'A complete mRNA has no fixed 3D structure: it is long, flexible and protein-bound. Only fragments (e.g. the cap in eIF4E, poly(A) in PABP) have been solved.' },
    src: [doi('10.1093/nar/gkw551', 'Ramanathan, Robb & Chan (2016) Nucleic Acids Res 44:7511'), doi('10.1038/s41580-021-00417-y', 'Passmore & Coller (2022) Nat Rev Mol Cell Biol 23:93')],
  },
  {
    id: 'premrna', pdb: null, diagram: 'premrna', type: ['rna'], cls: ['single', 'info'], ctx: ['cell'],
    name: { nl: 'Pre-mRNA', en: 'Pre-mRNA' }, sub: { nl: 'exonen, intronen en splicingsignalen', en: 'exons, introns and splicing signals' },
    scenes: ['splicing', 'rnaprocessing'], cmp: ['mrna', 'snrna'],
    what: {
      nl: 'Het primaire transcript van RNA-polymerase II bevat naast de exonen ook intronen, die bij mensen meestal veel langer zijn dan de exonen. Intronen beginnen bijna altijd met GU en eindigen op AG; een vertakkingspunt-A ligt ~20–50 nt stroomopwaarts van het 3\'-splicingsite, gevolgd door een polypyrimidinetraject.',
      en: 'The primary transcript of RNA polymerase II contains introns besides the exons; in humans introns are usually much longer than exons. Introns almost always start with GU and end with AG; a branch-point A lies ~20–50 nt upstream of the 3\' splice site, followed by a polypyrimidine tract.' },
    feat: {
      nl: ['5\'-splicingsite: exon…AG|GURAGU…', 'vertakkingspunt: …YNYURAY… (de A valt de 5\'-splicingsite aan → lariat)', '3\'-splicingsite: polypyrimidinetraject …YAG|exon', 'menselijk gen: gemiddeld ~9 exonen van ~150 nt; intronen vaak kilobasen lang'],
      en: ['5\' splice site: exon…AG|GURAGU…', 'branch point: …YNYURAY… (its A attacks the 5\' splice site → lariat)', '3\' splice site: polypyrimidine tract …YAG|exon', 'human gene: on average ~9 exons of ~150 nt; introns often kilobases long'] },
    cell: {
      nl: 'Splicing gebeurt in de kern door het spliceosoom (U1, U2, U4/U6, U5 snRNP + >100 eiwitten), grotendeels tijdens de transcriptie. Door alternatieve splicing codeert één gen voor meerdere eiwitten: dat gebeurt bij >90% van de menselijke genen met meerdere exonen.',
      en: 'Splicing takes place in the nucleus by the spliceosome (U1, U2, U4/U6, U5 snRNPs + >100 proteins), largely during transcription. Through alternative splicing one gene encodes several proteins: this happens for >90% of human multi-exon genes.' },
    why3d: {
      nl: 'Pre-mRNA\'s zijn tot honderden kilobasen lang en worden al tijdens de synthese door eiwitten bedekt; er bestaat geen enkelvoudige 3D-structuur.',
      en: 'Pre-mRNAs can be hundreds of kilobases long and are coated by proteins during synthesis; there is no single 3D structure.' },
    src: [doi('10.1016/j.cell.2009.02.009', 'Wahl, Will & Lührmann (2009) Cell 136:701'), doi('10.1038/nature07509', 'Wang et al. (2008) Nature 456:470')],
  },
  {
    id: 'mtdna', pdb: null, diagram: 'mtdna', type: ['dna'], cls: ['duplex', 'circular', 'info'], ctx: ['cell'],
    name: { nl: 'Mitochondriaal DNA', en: 'Mitochondrial DNA' }, sub: { nl: '16 569 bp · circulair · 37 genen', en: '16,569 bp · circular · 37 genes' },
    scenes: ['cel'], cmp: ['plasmid', 'bdna'],
    what: {
      nl: 'Het menselijke mitochondriale genoom is een circulair dubbelstrengig DNA van 16 569 bp, aanwezig in honderden tot duizenden kopieën per cel en verpakt in nucleoïden (met o.a. TFAM). Het codeert 37 genen: 13 eiwitten van de oxidatieve fosforylering, 2 rRNA\'s (12S, 16S) en 22 tRNA\'s. Het is uiterst compact: geen intronen, enkele genen overlappen (ATP8/ATP6, ND4L/ND4) en sommige stopcodons ontstaan pas door polyadenylering.',
      en: 'The human mitochondrial genome is a circular double-stranded DNA of 16,569 bp, present in hundreds to thousands of copies per cell and packaged in nucleoids (with e.g. TFAM). It encodes 37 genes: 13 proteins of oxidative phosphorylation, 2 rRNAs (12S, 16S) and 22 tRNAs. It is extremely compact: no introns, some genes overlap (ATP8/ATP6, ND4L/ND4) and some stop codons are only completed by polyadenylation.' },
    feat: {
      nl: ['zware (H) en lichte (L) streng, genoemd naar hun verschil in G-gehalte (dichtheid)', '28 genen worden afgelezen vanaf de H-strengpromotor; ND6 en 8 tRNA\'s vanaf de L-strengpromotor', 'controleregio (~1,1 kb, D-lus) met promotoren en replicatieoorsprong OH; OL ligt in een cluster van tRNA-genen', 'afwijkende genetische code: UGA = Trp, AUA = Met, AGA/AGG = stop'],
      en: ['heavy (H) and light (L) strands, named for their difference in G content (density)', '28 genes are read from the H-strand promoter; ND6 and 8 tRNAs from the L-strand promoter', 'control region (~1.1 kb, D-loop) with promoters and replication origin OH; OL lies in a cluster of tRNA genes', 'variant genetic code: UGA = Trp, AUA = Met, AGA/AGG = stop'] },
    cell: {
      nl: 'In de mitochondriale matrix. Beide strengen worden als lange polycistronische transcripten afgelezen die bij de tRNA\'s worden geknipt ("tRNA-punctuatie"). Overerving via de moeder; mutaties veroorzaken mitochondriale ziekten (bv. MELAS, LHON), vaak met heteroplasmie.',
      en: 'In the mitochondrial matrix. Both strands are transcribed as long polycistronic transcripts that are cut at the tRNAs ("tRNA punctuation"). Maternal inheritance; mutations cause mitochondrial diseases (e.g. MELAS, LHON), often with heteroplasmy.' },
    why3d: {
      nl: 'Een genoom van 16,6 kb heeft geen vaste atomaire structuur; het diagram toont de genkaart (posities volgens de revised Cambridge Reference Sequence, NC_012920).',
      en: 'A 16.6-kb genome has no fixed atomic structure; the diagram shows the gene map (positions from the revised Cambridge Reference Sequence, NC_012920).' },
    simpl: {
      nl: 'De naamgeving "H-streng-gecodeerd" is in de literatuur niet eenduidig (matrijs- of coderende streng); hier volgen we MITOMAP. tRNA-genen zijn als smalle streepjes getekend en niet allemaal gelabeld.',
      en: 'The naming "H-strand-encoded" is not used consistently in the literature (template or coding strand); here we follow MITOMAP. tRNA genes are drawn as thin ticks and not all are labelled.' },
    src: [doi('10.1038/290457a0', 'Anderson et al. (1981) Nature 290:457'), doi('10.1038/13779', 'Andrews et al. (1999) Nat Genet 23:147 (rCRS)'), { label: 'NCBI NC_012920.1', url: 'https://www.ncbi.nlm.nih.gov/nuccore/NC_012920.1' }, { label: 'MITOMAP genome loci', url: 'https://www.mitomap.org/foswiki/bin/view/MITOMAP/GenomeLoci' }],
  },
  {
    id: 'plasmid', pdb: null, diagram: 'plasmid', type: ['dna'], cls: ['duplex', 'circular', 'info'], ctx: ['lab', 'other'],
    name: { nl: 'Plasmide', en: 'Plasmid' }, sub: { nl: 'circulair DNA in bacteriën · kloneringsvector', en: 'circular DNA in bacteria · cloning vector' },
    scenes: ['operon'], cmp: ['mtdna', 'tdna'],
    what: {
      nl: 'Een plasmide is een klein, meestal circulair dubbelstrengig DNA dat onafhankelijk van het chromosoom repliceert, vooral in bacteriën (en gist). Natuurlijke plasmiden dragen vaak "extra" genen, zoals antibioticumresistentie. In het lab zijn ze het werkpaard van de moleculaire biologie: een vector bevat minstens een replicatieoorsprong (ori), een selectiemerker en een multiple cloning site (MCS).',
      en: 'A plasmid is a small, usually circular double-stranded DNA that replicates independently of the chromosome, mainly in bacteria (and yeast). Natural plasmids often carry "extra" genes such as antibiotic resistance. In the lab they are the workhorse of molecular biology: a vector contains at least an origin of replication (ori), a selection marker and a multiple cloning site (MCS).' },
    feat: {
      nl: ['in de bacterie negatief supercoiled', 'ori bepaalt kopieaantal en gastheer', 'selectie: bv. bla (β-lactamase → ampicillineresistentie)', 'expressievector voor menselijke cellen: bv. CMV-promotor + polyadenyleringssignaal', 'grootte typisch 2–10 kb'],
      en: ['negatively supercoiled in the bacterium', 'ori determines copy number and host', 'selection: e.g. bla (β-lactamase → ampicillin resistance)', 'expression vector for human cells: e.g. CMV promoter + polyadenylation signal', 'size typically 2–10 kb'] },
    cell: {
      nl: 'Menselijke cellen hebben geen plasmiden. Plasmide-DNA wordt wel in menselijke cellen gebracht bij transfectie (onderzoek, productie van eiwitten en virale vectoren) en DNA-vaccins; het blijft dan episomaal en gaat bij delingen verloren. Ook voor mRNA-vaccins is een plasmide de matrijs voor in-vitrotranscriptie.',
      en: 'Human cells have no plasmids. Plasmid DNA is introduced into human cells by transfection (research, production of proteins and viral vectors) and DNA vaccines; it then stays episomal and is lost during divisions. For mRNA vaccines too, a plasmid is the template for in-vitro transcription.' },
    why3d: {
      nl: 'Een plasmide van enkele kilobasen heeft geen vaste atomaire structuur; het diagram toont een typische vectorkaart (schematisch, niet op schaal van één bepaalde vector).',
      en: 'A plasmid of a few kilobases has no fixed atomic structure; the diagram shows a typical vector map (schematic, not to scale of any particular vector).' },
    src: [doi('10.1128/MMBR.62.2.434-464.1998', 'del Solar et al. (1998) Microbiol Mol Biol Rev 62:434')],
  },
  {
    id: 'cdna', pdb: null, diagram: 'cdna', type: ['dna', 'hybrid'], cls: ['duplex', 'info'], ctx: ['lab', 'virus', 'cell'],
    name: { nl: 'cDNA', en: 'cDNA' }, sub: { nl: 'DNA-kopie van mRNA via reverse transcriptase', en: 'DNA copy of mRNA via reverse transcriptase' },
    scenes: ['rt'], cmp: ['hybrid', 'mrna'],
    what: {
      nl: 'Complementair DNA (cDNA) is DNA gemaakt op een RNA-matrijs door reverse transcriptase. Van een mRNA ontstaat zo een kopie zonder intronen: eerst een RNA–DNA-hybride (eerste streng), daarna — na afbraak van het RNA door RNase H — een tweede DNA-streng.',
      en: 'Complementary DNA (cDNA) is DNA made on an RNA template by reverse transcriptase. From an mRNA this produces a copy without introns: first an RNA–DNA hybrid (first strand), then — after the RNA is degraded by RNase H — a second DNA strand.' },
    feat: {
      nl: ['geen intronen en geen promotor: enkel de rijpe mRNA-sequentie', 'eerste streng met een oligo(dT)-primer op de poly(A)-staart of met random primers', 'basis van RT-qPCR, RNA-seq-bibliotheken en cDNA-klonering (bv. menselijk insuline in bacteriën)', 'reverse transcriptase ontdekt in retrovirussen (Temin; Baltimore, 1970)'],
      en: ['no introns and no promoter: only the mature mRNA sequence', 'first strand with an oligo(dT) primer on the poly(A) tail or with random primers', 'basis of RT-qPCR, RNA-seq libraries and cDNA cloning (e.g. human insulin in bacteria)', 'reverse transcriptase discovered in retroviruses (Temin; Baltimore, 1970)'] },
    cell: {
      nl: 'Ook in cellen wordt RNA naar DNA overgeschreven: retrovirussen (HIV) en het LINE-1-retrotransposon (~17% van het menselijke genoom) hebben een reverse transcriptase; zo ontstonden "processed pseudogenes" zonder intronen. Telomerase is eveneens een reverse transcriptase, met een eigen RNA-matrijs.',
      en: 'Cells also copy RNA into DNA: retroviruses (HIV) and the LINE-1 retrotransposon (~17% of the human genome) have a reverse transcriptase; this is how intron-less "processed pseudogenes" arose. Telomerase is also a reverse transcriptase, with its own RNA template.' },
    why3d: {
      nl: 'cDNA is gewoon B-DNA (dubbelstrengig) of een RNA–DNA-hybride (eerste streng): bekijk daarvoor de items B-DNA en RNA–DNA-hybride.',
      en: 'cDNA is ordinary B-DNA (double-stranded) or an RNA–DNA hybrid (first strand): see the B-DNA and RNA–DNA hybrid entries.' },
    src: [doi('10.1038/2261211a0', 'Temin & Mizutani (1970) Nature 226:1211'), doi('10.1038/2261209a0', 'Baltimore (1970) Nature 226:1209')],
  },
  {
    id: 'lncrna', pdb: null, diagram: 'lncrna', type: ['rna'], cls: ['folded', 'info'], ctx: ['cell'],
    name: { nl: 'Lang niet-coderend RNA (lncRNA)', en: 'Long non-coding RNA (lncRNA)' }, sub: { nl: '> 200 nt, niet vertaald · bv. XIST', en: '> 200 nt, not translated · e.g. XIST' },
    scenes: ['genregulatie', 'dnamethyl'], cmp: ['mrna', 'snrna'],
    what: {
      nl: 'Lange niet-coderende RNA\'s zijn transcripten van meer dan 200 nt die niet voor een eiwit coderen. Veel worden net als mRNA door Pol II gemaakt, gecapt, gespliced en gepolyadenyleerd, maar ze zijn minder geconserveerd, vaak laag en celtypespecifiek tot expressie gebracht. Hun werking hangt af van hun vouwing en van de eiwitten die ze binden.',
      en: 'Long non-coding RNAs are transcripts longer than 200 nt that do not code for a protein. Many are made like mRNA by Pol II — capped, spliced and polyadenylated — but they are less conserved and often expressed at low levels and cell-type-specifically. Their action depends on their folding and on the proteins they bind.' },
    feat: {
      nl: ['XIST (~17 kb): bedekt één X-chromosoom in vrouwelijke cellen en zet het stil', 'NEAT1: steiger van paraspeckles; MALAT1: in nuclear speckles', 'werkingswijzen: gids (chromatine-enzymen naar een locus), steiger, lokvogel (decoy) voor eiwitten of miRNA\'s, of via de transcriptie zelf', 'GENCODE telt bij de mens ~20 000 lncRNA-genen'],
      en: ['XIST (~17 kb): coats one X chromosome in female cells and silences it', 'NEAT1: scaffold of paraspeckles; MALAT1: in nuclear speckles', 'modes of action: guide (chromatin enzymes to a locus), scaffold, decoy for proteins or miRNAs, or through the act of transcription', 'GENCODE counts ~20,000 lncRNA genes in humans'] },
    cell: {
      nl: 'Vooral in de kern, sommige in het cytoplasma. Slechts voor een minderheid is de functie experimenteel aangetoond: een actief onderzoeksveld.',
      en: 'Mainly in the nucleus, some in the cytoplasm. Function has been demonstrated experimentally for only a minority: an active research field.' },
    why3d: {
      nl: 'Voor lange lncRNA\'s bestaat geen volledige 3D-structuur; ze zijn modulair en dynamisch. Het diagram toont de belangrijkste werkingswijzen.',
      en: 'No complete 3D structure exists for long lncRNAs; they are modular and dynamic. The diagram shows the main modes of action.' },
    src: [doi('10.1038/s41580-020-00315-9', 'Statello et al. (2021) Nat Rev Mol Cell Biol 22:96')],
  },
  {
    id: 'tdna', pdb: null, diagram: 'tdna', type: ['dna'], cls: ['single', 'info'], ctx: ['other', 'lab'], plant: true,
    name: { nl: 'T-DNA (Agrobacterium)', en: 'T-DNA (Agrobacterium)' }, sub: { nl: 'plant & biotech — niet in de menselijke cel', en: 'plant & biotech — not in the human cell' },
    scenes: ['integratie'], cmp: ['plasmid', 'cdna'],
    what: {
      nl: 'Transfer-DNA is het stuk van het Ti-plasmide van de bodembacterie Agrobacterium tumefaciens dat naar een plantencel wordt overgebracht en in het plantengenoom integreert. Het wordt begrensd door twee imperfecte herhalingen van 25 bp (rechter- en linkergrens, RB/LB). VirD1/VirD2 knippen de onderste streng bij de grenzen; VirD2 blijft covalent aan het 5\'-uiteinde van de enkelstrengige T-streng, die via een type IV-secretiesysteem de plantencel binnengaat; VirE2 wordt apart uitgescheiden en bedekt de T-streng pas in de plantencel.',
      en: 'Transfer DNA is the part of the Ti plasmid of the soil bacterium Agrobacterium tumefaciens that is transferred into a plant cell and integrates into the plant genome. It is bounded by two imperfect 25-bp repeats (right and left border, RB/LB). VirD1/VirD2 nick the bottom strand at the borders; VirD2 stays covalently attached to the 5\' end of the single-stranded T-strand, which enters the plant cell through a type IV secretion system; VirE2 is exported separately and coats the T-strand only inside the plant cell.' },
    feat: {
      nl: ['enkelstrengig tijdens transport, dubbelstrengig na integratie', 'natuurlijk: genen voor auxine- en cytokininesynthese en opinen → tumor (kroongal)', 'biotech: "ontwapende" binaire vectoren; het gewenste gen tussen RB en LB', 'integratie op min of meer willekeurige plaatsen via de DNA-herstelmachinerie van de plant'],
      en: ['single-stranded during transfer, double-stranded after integration', 'natural: genes for auxin and cytokinin synthesis and opines → tumour (crown gall)', 'biotech: "disarmed" binary vectors; the gene of interest between RB and LB', 'integration at more or less random sites via the plant\'s DNA repair machinery'] },
    cell: {
      nl: 'Komt niet voor in menselijke cellen: dit is plantenbiologie en biotechnologie (genetisch gewijzigde planten). In deze app krijgt vreemd DNA (T-DNA, viraal) de roze kleur; het menselijke tegenstuk is de integratie van een retroviraal provirus (HIV).',
      en: 'Does not occur in human cells: this is plant biology and biotechnology (genetically modified plants). In this app foreign DNA (T-DNA, viral) is pink; the human counterpart is the integration of a retroviral provirus (HIV).' },
    why3d: {
      nl: 'T-DNA is een stuk gewoon DNA van ~10–25 kb; het bijzondere zit in het transport (eiwitten), niet in een aparte 3D-vorm.',
      en: 'T-DNA is a stretch of ordinary DNA of ~10–25 kb; what is special is its transfer (proteins), not a distinct 3D shape.' },
    src: [doi('10.1128/MMBR.67.1.16-37.2003', 'Gelvin (2003) Microbiol Mol Biol Rev 67:16')],
  },
];

/* filtercategorieën */
export const FILTERS = {
  type: {
    label: { nl: 'Soort', en: 'Kind' },
    opts: {
      dna: { nl: 'DNA', en: 'DNA' }, rna: { nl: 'RNA', en: 'RNA' }, hybrid: { nl: 'Hybride', en: 'Hybrid' },
      prot: { nl: 'Met eiwit', en: 'With protein' }, drug: { nl: 'Met geneesmiddel', en: 'Drug complex' },
    },
  },
  cls: {
    label: { nl: 'Structuurklasse', en: 'Structural class' },
    opts: {
      duplex: { nl: 'Dubbelhelix', en: 'Double helix' }, quad: { nl: 'Vierstrengig (G4, i-motief)', en: 'Four-stranded (G4, i-motif)' },
      triplex: { nl: 'Triplex', en: 'Triplex' }, junction: { nl: 'Vertakking', en: 'Junction' },
      single: { nl: 'Enkelstrengig', en: 'Single-stranded' }, folded: { nl: 'Gevouwen RNA & ribozymen', en: 'Folded RNA & ribozymes' },
      complex: { nl: 'Nucleoproteïnecomplex', en: 'Nucleoprotein complex' }, circular: { nl: 'Circulair', en: 'Circular' },
      info: { nl: 'Overzicht (geen 3D)', en: 'Overview (no 3D)' },
    },
  },
  ctx: {
    label: { nl: 'Context', en: 'Context' },
    opts: {
      cell: { nl: 'In de menselijke cel', en: 'In the human cell' }, virus: { nl: 'Virus', en: 'Virus' },
      drug: { nl: 'Geneesmiddel', en: 'Drug' }, lab: { nl: 'Lab & biotech', en: 'Lab & biotech' },
      other: { nl: 'Ander organisme', en: 'Other organism' },
    },
  },
};

/* snelle vergelijkingen */
export const PRESETS = [
  { ids: ['adna', 'bdna', 'zdna'], label: { nl: 'A · B · Z', en: 'A · B · Z' } },
  { ids: ['dsrna', 'hybrid', 'bdna'], label: { nl: 'RNA · hybride · DNA', en: 'RNA · hybrid · DNA' } },
  { ids: ['netropsin', 'intercalator', 'cisplatin'], label: { nl: 'Groef · intercalatie · crosslink', en: 'Groove · intercalation · cross-link' } },
  { ids: ['g4', 'g4basket', 'imotif'], label: { nl: 'G4 (K⁺) · G4 (Na⁺) · i-motief', en: 'G4 (K⁺) · G4 (Na⁺) · i-motif' } },
  { ids: ['pseudoknot', 'terc', 'tar'], label: { nl: 'Pseudoknopen & bulge', en: 'Pseudoknots & bulge' } },
  { ids: ['trna', 'hammerhead', 'riboswitch'], label: { nl: 'Gevouwen RNA', en: 'Folded RNA' } },
];
