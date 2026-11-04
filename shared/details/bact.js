/* Uitleg per knoop voor de bacterie-route (stage 'bact', verhaallijn 3) — zie app/SCENES.md en docs/bacterie-schema.md.
 * Elke bewering is gedekt door een van de bronnen hieronder (POC 04-11-2026, nog niet in een verificatieronde nagekeken). */
const S = {
  blattner: { t: 'Blattner et al. (1997) The complete genome sequence of Escherichia coli K-12. Science 277:1453 (PubMed 9278503)', url: 'https://pubmed.ncbi.nlm.nih.gov/9278503/' },
  cooper_prok: { t: 'Cooper, The Cell, 2nd ed. — Transcription in Prokaryotes (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK9850/' },
  alberts_prot: { t: 'Alberts et al., Molecular Biology of the Cell (4e): From RNA to Protein (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK26829/' },
  alberts_rna: { t: 'Alberts et al., Molecular Biology of the Cell, 4th ed. — From DNA to RNA (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK26887/' },
  miller: { t: 'Miller, Hamkalo & Thomas (1970) Visualization of bacterial genes in action. Science 169:392 (PubMed 4915822)', url: 'https://pubmed.ncbi.nlm.nih.gov/4915822/' },
  webster: { t: 'Webster et al. (2020) Structural basis of transcription-translation coupling and collision in bacteria. Science 369:1355 (PubMed 32820062)', url: 'https://pubmed.ncbi.nlm.nih.gov/32820062/' },
  shine: { t: 'Shine & Dalgarno (1974) The 3′-terminal sequence of E. coli 16S ribosomal RNA. PNAS 71:1342 (PMC388224)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC388224/' },
  delsolar: { t: 'del Solar et al. (1998) Replication and control of circular bacterial plasmids. Microbiol Mol Biol Rev 62:434 (PMC98921)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC98921/' },
  virolle: { t: 'Virolle et al. (2020) Plasmid transfer by conjugation in Gram-negative bacteria: from the cellular to the community level. Genes 11:1239 (PMC7690428)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7690428/' },
  katayama: { t: 'Katayama et al. (2010) Regulation of the replication cycle: conserved and diverse regulatory systems for DnaA and oriC. Nat Rev Microbiol 8:163 (PubMed 20157337)', url: 'https://pubmed.ncbi.nlm.nih.gov/20157337/' },
  baba: { t: 'Baba et al. (2006) Construction of E. coli K-12 in-frame, single-gene knockout mutants: the Keio collection. Mol Syst Biol 2:2006.0008 (PMC1681482)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC1681482/' },
  landick: { t: 'Ray-Soni, Bellecourt & Landick (2016) Mechanisms of bacterial transcription termination: all good things must end. Annu Rev Biochem 85:319 (PubMed 27023849)', url: 'https://pubmed.ncbi.nlm.nih.gov/27023849/' },
  feklistov: { t: 'Feklístov et al. (2014) Bacterial sigma factors: a historical, structural, and genomic perspective. Annu Rev Microbiol 68:357 (PubMed 25002089)', url: 'https://pubmed.ncbi.nlm.nih.gov/25002089/' },
  edgell: { t: 'Edgell, Belfort & Shub (2000) Barriers to intron promiscuity in bacteria. J Bacteriol 182:5281 (PMC110968)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC110968/' },
  lambowitz: { t: 'Lambowitz & Zimmerly (2011) Group II introns: mobile ribozymes that invade DNA. Cold Spring Harb Perspect Biol 3:a003616 (PMC3140690)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3140690/' },
  mills: { t: 'Mills, Johnson & Perler (2014) Protein splicing: how inteins escape from precursor proteins. J Biol Chem 289:14498 (PMC4031507)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4031507/' },
  pdb6oul: { t: 'RCSB PDB 6OUL — E. coli RNA polymerase bound to rpsT P2 promoter DNA (Chen et al., eLife 2019)', url: 'https://www.rcsb.org/structure/6OUL' },
  pdb4ybb: { t: 'RCSB PDB 4YBB — High-resolution structure of the Escherichia coli ribosome (Noeske et al., NSMB 2015)', url: 'https://www.rcsb.org/structure/4YBB' },
  pdb6ztj: { t: 'RCSB PDB 6ZTJ — E. coli 70S–RNAP expressome complex (Webster et al., Science 2020)', url: 'https://www.rcsb.org/structure/6ZTJ' },
  rpod: { t: 'UniProt P00579 — RNA polymerase sigma factor RpoD (σ70), E. coli K-12', url: 'https://www.uniprot.org/uniprotkb/P00579/entry' },
  tem1: { t: 'UniProt P62593 — β-lactamase TEM (bla), E. coli', url: 'https://www.uniprot.org/uniprotkb/P62593/entry' },
  dnaa: { t: 'UniProt P03004 — Chromosomal replication initiator protein DnaA, E. coli K-12', url: 'https://www.uniprot.org/uniprotkb/P03004/entry' },
};

export default {
  bcel: {
    nl: {
      kort: 'Een bacterie zoals E. coli heeft geen kern. Haar DNA ligt opgevouwen in het cytoplasma, in een zone die de nucleoïd heet. Er is één ringvormig chromosoom, vaak met kleine extra ringen ([[plasmiden|bplasmide]]), en de ribosomen liggen er vlak naast.',
      what: 'E. coli is een staafvormige, Gram-negatieve bacterie van ongeveer 2 µm lang. Ze heeft geen kern en geen andere organellen met een membraan. Het genoom is één circulair chromosoom: bij de labstam K-12 MG1655 ≈ 4,6 miljoen basenparen met ≈ 4 300 eiwitgenen.',
      how: [
        'De celenvelop bestaat uit een binnenmembraan, een dunne laag peptidoglycaan (de celwand) en een buitenmembraan.',
        'Het chromosoom ligt sterk opgevouwen in de nucleoïd; die zone heeft geen membraan.',
        'Veel stammen bevatten daarnaast plasmiden: kleine DNA-ringen die zichzelf apart kopiëren.',
        'Ribosomen (70S) liggen in het cytoplasma en kunnen een mRNA al vertalen terwijl het nog gemaakt wordt.',
      ],
      facts: [['Lengte cel', '≈ 2 µm'], ['Genoom (K-12 MG1655)', '4 639 221 bp, één ring'], ['Eiwitgenen', '≈ 4 300'], ['Ribosoom', '70S (30S + 50S)']],
      why: 'De bacterie is het eenvoudigste model om de weg van DNA tot eiwit te volgen. Door te vergelijken met de menselijke cel zie je wat universeel is (de genetische code, het ribosoom, de basisstappen) en wat eukaryoten extra doen (kern, RNA-bewerking).',
    },
    en: {
      kort: 'A bacterium such as E. coli has no nucleus. Its DNA lies folded up in the cytoplasm, in a zone called the nucleoid. There is one circular chromosome, often with small extra rings ([[plasmids|bplasmide]]), and the ribosomes lie right next to it.',
      what: 'E. coli is a rod-shaped, Gram-negative bacterium about 2 µm long. It has no nucleus and no other membrane-bound organelles. The genome is a single circular chromosome: in the lab strain K-12 MG1655 ≈ 4.6 million base pairs with ≈ 4,300 protein genes.',
      how: [
        'The cell envelope consists of an inner membrane, a thin layer of peptidoglycan (the cell wall) and an outer membrane.',
        'The chromosome is tightly folded in the nucleoid; this zone has no membrane.',
        'Many strains also carry plasmids: small DNA rings that copy themselves separately.',
        'Ribosomes (70S) lie in the cytoplasm and can translate an mRNA while it is still being made.',
      ],
      facts: [['Cell length', '≈ 2 µm'], ['Genome (K-12 MG1655)', '4,639,221 bp, one ring'], ['Protein genes', '≈ 4,300'], ['Ribosome', '70S (30S + 50S)']],
      why: 'The bacterium is the simplest model for following the path from DNA to protein. Comparing it with the human cell shows what is universal (the genetic code, the ribosome, the basic steps) and what eukaryotes add (nucleus, RNA processing).',
    },
    sources: [S.blattner, S.cooper_prok, S.alberts_prot, S.miller],
  },

  bplasmide: {
    nl: {
      kort: 'Een plasmide is een kleine DNA-ring naast het chromosoom. Het heeft een eigen startplaats om te kopiëren en draagt vaak extra genen, zoals een gen dat een antibioticum onschadelijk maakt. Sommige plasmiden kunnen naar een andere bacterie overgaan.',
      what: 'Plasmiden zijn extrachromosomale DNA-moleculen, meestal circulair en dubbelstrengs, van enkele kb tot honderden kb. Ze repliceren onafhankelijk van het chromosoom vanaf hun eigen oorsprong (ori). Ze zijn niet altijd nodig om te overleven, maar geven vaak een voordeel zoals antibioticumresistentie.',
      how: [
        'De ori en de bijhorende regelelementen (regel-RNA’s of -eiwitten) houden het kopieaantal per cel constant: van 1–2 bij grote plasmiden zoals F tot tientallen of meer bij kleine plasmiden.',
        'Een resistentiegen zoals bla codeert β-lactamase; dat enzym opent de β-lactamring van penicillines zoals ampicilline, waardoor die niet meer werken.',
        'Conjugatieve plasmiden dragen tra-genen. Een relaxase knipt één streng bij oriT; die streng gaat via een transportkanaal (type IV-secretiesysteem) naar de ontvanger.',
        'In donor en ontvanger wordt de enkele streng weer aangevuld tot dubbelstrengs DNA; de ontvanger kan het plasmide nu zelf doorgeven.',
      ],
      facts: [['Grootte', '≈ 2 kb tot > 100 kb (F ≈ 100 kb)'], ['Kopieaantal', '1–2 (F) tot tientallen of meer'], ['bla-product', 'TEM-1 β-lactamase (286 aminozuren)'], ['Overdracht', 'conjugatie (één streng, vanaf oriT)']],
      why: 'Plasmiden verklaren waarom resistentie tegen antibiotica zich zo snel verspreidt. In het lab zijn ze ook het belangrijkste werktuig om een gen in een bacterie te brengen, bv. om een menselijk eiwit zoals insuline te laten maken.',
    },
    en: {
      kort: 'A plasmid is a small DNA ring next to the chromosome. It has its own starting point for copying and often carries extra genes, such as a gene that makes an antibiotic harmless. Some plasmids can pass to another bacterium.',
      what: 'Plasmids are extrachromosomal DNA molecules, usually circular and double-stranded, from a few kb to hundreds of kb. They replicate independently of the chromosome from their own origin (ori). They are not always needed to survive, but often give an advantage such as antibiotic resistance.',
      how: [
        'The ori and its control elements (control RNAs or proteins) keep the copy number per cell constant: from 1–2 for large plasmids such as F to tens or more for small plasmids.',
        'A resistance gene such as bla encodes β-lactamase; this enzyme opens the β-lactam ring of penicillins such as ampicillin, so they no longer work.',
        'Conjugative plasmids carry tra genes. A relaxase nicks one strand at oriT; this strand passes through a transport channel (type IV secretion system) to the recipient.',
        'In donor and recipient the single strand is filled in again to double-stranded DNA; the recipient can now pass the plasmid on itself.',
      ],
      facts: [['Size', '≈ 2 kb to > 100 kb (F ≈ 100 kb)'], ['Copy number', '1–2 (F) to tens or more'], ['bla product', 'TEM-1 β-lactamase (286 amino acids)'], ['Transfer', 'conjugation (one strand, from oriT)']],
      why: 'Plasmids explain why resistance to antibiotics spreads so fast. In the lab they are also the main tool for bringing a gene into a bacterium, e.g. to have it make a human protein such as insulin.',
    },
    sources: [S.delsolar, S.virolle, S.tem1],
  },

  bgen: {
    nl: {
      kort: 'Een bacterieel gen is een rij onderdelen: een [[promoter|bpol]] om te starten, soms een operator als aan/uit-knop, een landingsplaats voor het ribosoom, het coderende deel en een terminator. Introns zijn zeldzaam: de code loopt meestal in één stuk door.',
      what: 'De promoter bestaat uit twee korte elementen, −35 (consensus TTGACA) en −10 (TATAAT), ≈ 17 bp uit elkaar. Een σ-factor herkent ze en brengt het RNA-polymerase in positie. Achter het startpunt (+1) volgen de Shine-Dalgarno-volgorde, het startcodon, het coderende deel, het stopcodon en een terminator.',
      how: [
        'σ-factoren bepalen welke promoters gelezen worden. E. coli heeft er zeven: σ70 voor de meeste genen en andere voor bv. hitte (σ32), stress (σ38), envelopschade (σ24), stikstof (σ54), zweepharen (σ28) en ijzer (σ19).',
        'Repressoren binden een operator en blokkeren de start; activatoren (zoals CAP) helpen het RNA-polymerase binden.',
        'De Shine-Dalgarno-volgorde (ideaal AGGAGG) ligt enkele nucleotiden vóór het startcodon en paart met het 3′-uiteinde van het 16S-rRNA.',
        'Een intrinsieke terminator is een GC-rijke haarspeld in het RNA, gevolgd door een reeks U’s; andere terminators hebben het eiwit Rho nodig.',
        'Bacteriën hebben geen spliceosoom. Zeldzame groep I- en groep II-introns zijn ribozymen die zichzelf uitknippen; inteïnes knippen zichzelf uit een eiwit (eiwitsplicing).',
        'Het chromosoom heeft één replicatie-oorsprong, oriC, waar DnaA bindt en het DNA opent. In een genoombrede studie konden 303 genen niet uitgeschakeld worden: ze zijn (in rijk medium) onmisbaar.',
      ],
      facts: [['−35 / −10 (σ70)', 'TTGACA / TATAAT, ≈ 17 bp ertussen'], ['σ-factoren in E. coli', '7'], ['Shine-Dalgarno', 'AGGAGG ↔ 16S-rRNA …CCUCCUUA-3′'], ['Introns', 'zeldzaam, zelfsplicend (groep I/II)'], ['Onmisbare genen', '303 van ≈ 4 300 (Keio-collectie)']],
      why: 'Wie de onderdelen van een gen kent, kan een gen "lezen" én ontwerpen: in biotechnologie kies je een promoter, een Shine-Dalgarno en een terminator om een eiwit in E. coli te laten maken. Het verschil met het menselijke gen (introns, geen Shine-Dalgarno) verklaart waarom je daarvoor cDNA gebruikt.',
    },
    en: {
      kort: 'A bacterial gene is a row of parts: a [[promoter|bpol]] to start, sometimes an operator as on/off button, a landing site for the ribosome, the coding part and a terminator. Introns are rare: the code usually runs in one piece.',
      what: 'The promoter consists of two short elements, −35 (consensus TTGACA) and −10 (TATAAT), ≈ 17 bp apart. A σ factor recognises them and puts RNA polymerase in position. After the start site (+1) come the Shine-Dalgarno sequence, the start codon, the coding part, the stop codon and a terminator.',
      how: [
        'σ factors decide which promoters are read. E. coli has seven: σ70 for most genes and others for e.g. heat (σ32), stress (σ38), envelope damage (σ24), nitrogen (σ54), flagella (σ28) and iron (σ19).',
        'Repressors bind an operator and block initiation; activators (such as CAP) help RNA polymerase bind.',
        'The Shine-Dalgarno sequence (ideally AGGAGG) lies a few nucleotides before the start codon and pairs with the 3′ end of the 16S rRNA.',
        'An intrinsic terminator is a GC-rich hairpin in the RNA followed by a run of U’s; other terminators need the protein Rho.',
        'Bacteria have no spliceosome. Rare group I and group II introns are ribozymes that cut themselves out; inteins cut themselves out of a protein (protein splicing).',
        'The chromosome has one origin of replication, oriC, where DnaA binds and opens the DNA. In a genome-wide study 303 genes could not be knocked out: they are essential (in rich medium).',
      ],
      facts: [['−35 / −10 (σ70)', 'TTGACA / TATAAT, ≈ 17 bp apart'], ['σ factors in E. coli', '7'], ['Shine-Dalgarno', 'AGGAGG ↔ 16S rRNA …CCUCCUUA-3′'], ['Introns', 'rare, self-splicing (group I/II)'], ['Essential genes', '303 of ≈ 4,300 (Keio collection)']],
      why: 'Knowing the parts of a gene lets you "read" and design one: in biotechnology you choose a promoter, a Shine-Dalgarno and a terminator to have E. coli make a protein. The difference from the human gene (introns, no Shine-Dalgarno) explains why cDNA is used for this.',
    },
    sources: [S.cooper_prok, S.feklistov, S.shine, S.landick, S.edgell, S.lambowitz, S.mills, S.katayama, S.baba, S.dnaa],
  },

  bpol: {
    nl: {
      kort: 'Bacteriën hebben maar één soort RNA-polymerase. Een hulpeiwit, de σ-factor, leidt het naar de promoter en helpt het DNA openen. De kern van dit enzym is familie van ons eigen [[RNA-polymerase II|rnapol]].',
      what: 'Het kernenzym (core) bestaat uit vijf subeenheden: α₂ββ′ω. Met een σ-factor erbij heet het holo-enzym. σ70 herkent de −35 met domein 4 en de −10 met domein 2; daar gaan de DNA-strengen uit elkaar (open complex) en komt de matrijsstreng in het actieve centrum.',
      how: [
        'β′ en β vormen samen een klem rond het DNA en dragen het actieve centrum, zoals Rpb1 en Rpb2 bij Pol II.',
        'σ70-domein 4 bindt de −35 in de grote groef; domein 2 bindt de −10 en helpt de strengen scheiden.',
        'De α-subeenheden houden het enzym bijeen; hun staarten (α-CTD) kunnen DNA en activatoren zoals CAP binden.',
        'Na het verlaten van de promoter komt σ meestal vrij en schrijft de kern het gen verder af.',
      ],
      facts: [['Subeenheden core', 'α₂ββ′ω (5)'], ['σ70 (RpoD)', '613 aminozuren'], ['Structuur', 'PDB 6OUL, cryo-EM 3,4 Å'], ['Vergelijk', 'mens: 3 RNA-polymerasen, Pol II = 12 subeenheden']],
      why: 'Dat de bacteriële en menselijke RNA-polymerase dezelfde kern delen, toont dat dit enzym heel oud is. Het verschil (geen σ, wel algemene transcriptiefactoren bij de mens) verklaart waarom antibiotica zoals rifampicine het bacteriële enzym remmen maar het onze niet.',
    },
    en: {
      kort: 'Bacteria have only one kind of RNA polymerase. A helper protein, the σ factor, guides it to the promoter and helps open the DNA. The core of this enzyme is related to our own [[RNA polymerase II|rnapol]].',
      what: 'The core enzyme consists of five subunits: α₂ββ′ω. With a σ factor added it is called the holoenzyme. σ70 recognises the −35 with domain 4 and the −10 with domain 2; there the DNA strands come apart (open complex) and the template strand enters the active site.',
      how: [
        'β′ and β together form a clamp around the DNA and carry the active site, like Rpb1 and Rpb2 in Pol II.',
        'σ70 domain 4 binds the −35 in the major groove; domain 2 binds the −10 and helps separate the strands.',
        'The α subunits hold the enzyme together; their tails (α-CTD) can bind DNA and activators such as CAP.',
        'After leaving the promoter, σ is usually released and the core goes on to transcribe the gene.',
      ],
      facts: [['Core subunits', 'α₂ββ′ω (5)'], ['σ70 (RpoD)', '613 amino acids'], ['Structure', 'PDB 6OUL, cryo-EM 3.4 Å'], ['Compare', 'human: 3 RNA polymerases, Pol II = 12 subunits']],
      why: 'That bacterial and human RNA polymerase share the same core shows how old this enzyme is. The difference (no σ, but general transcription factors in humans) explains why antibiotics such as rifampicin inhibit the bacterial enzyme but not ours.',
    },
    sources: [S.pdb6oul, S.rpod, S.feklistov, S.cooper_prok, S.alberts_rna],
  },

  bmrna: {
    nl: {
      kort: 'In een bacterie wordt mRNA al vertaald terwijl het nog gemaakt wordt. Het krijgt geen kapje, geen staart en wordt niet geknipt. Het ribosoom vindt de start via een korte landingsplaats, de Shine-Dalgarno-volgorde. Vergelijk met de [[start bij de mens|initiatie]].',
      what: 'Omdat er geen kern is, zijn transcriptie en translatie gekoppeld: ribosomen binden het 5′-uiteinde van het mRNA terwijl het RNA-polymerase verder schrijft. De 30S-eenheid vindt het startcodon doordat de Shine-Dalgarno-volgorde paart met het 3′-uiteinde van het 16S-rRNA. Daarna komt fMet-tRNA op het AUG en sluit de 50S-eenheid aan: het 70S-ribosoom.',
      how: [
        'Elektronenmicroscopie (Miller, 1970) toonde ribosomen op mRNA dat nog aan het DNA vastzat; cryo-EM toont dat RNA-polymerase en het eerste ribosoom een complex kunnen vormen (expressoom).',
        'De Shine-Dalgarno-volgorde (bv. AGGAGG) paart met …CCUCC… in het 16S-rRNA en zet het startcodon in de P-plaats.',
        'Het eerste tRNA draagt N-formylmethionine (fMet); hulpfactoren IF1, IF2 en IF3 en GTP sturen de start.',
        'In een polycistronisch mRNA (operon) heeft elk gen een eigen Shine-Dalgarno en startcodon.',
        'Bacterieel mRNA krijgt geen 5′-cap en geen poly(A)-staart zoals bij de mens, en wordt niet gesplicet.',
      ],
      facts: [['Ribosoom', '70S = 30S + 50S (16S, 23S, 5S rRNA)'], ['Eerste aminozuur', 'fMet (mens: Met)'], ['Translatiesnelheid', '≈ 10–20 aminozuren/s'], ['Structuren', 'PDB 4YBB (70S), 6ZTJ (RNAP + 70S)']],
      why: 'Omdat bacteriële ribosomen (70S) verschillen van de onze (80S), kunnen veel antibiotica (bv. streptomycine, tetracycline) gericht de bacteriële translatie remmen. Het gebrek aan RNA-bewerking verklaart ook waarom bacteriën een menselijk gen met introns niet correct kunnen aflezen.',
    },
    en: {
      kort: 'In a bacterium, mRNA is translated while it is still being made. It gets no cap, no tail and is not cut. The ribosome finds the start via a short landing site, the Shine-Dalgarno sequence. Compare with the [[start in humans|initiatie]].',
      what: 'Because there is no nucleus, transcription and translation are coupled: ribosomes bind the 5′ end of the mRNA while RNA polymerase keeps writing. The 30S subunit finds the start codon because the Shine-Dalgarno sequence pairs with the 3′ end of the 16S rRNA. Then fMet-tRNA arrives on the AUG and the 50S subunit joins: the 70S ribosome.',
      how: [
        'Electron microscopy (Miller, 1970) showed ribosomes on mRNA still attached to the DNA; cryo-EM shows that RNA polymerase and the first ribosome can form a complex (expressome).',
        'The Shine-Dalgarno sequence (e.g. AGGAGG) pairs with …CCUCC… in the 16S rRNA and places the start codon in the P site.',
        'The first tRNA carries N-formylmethionine (fMet); helper factors IF1, IF2 and IF3 and GTP drive initiation.',
        'In a polycistronic mRNA (operon) each gene has its own Shine-Dalgarno and start codon.',
        'Bacterial mRNA gets no 5′ cap and no poly(A) tail as in humans, and is not spliced.',
      ],
      facts: [['Ribosome', '70S = 30S + 50S (16S, 23S, 5S rRNA)'], ['First amino acid', 'fMet (human: Met)'], ['Translation speed', '≈ 10–20 amino acids/s'], ['Structures', 'PDB 4YBB (70S), 6ZTJ (RNAP + 70S)']],
      why: 'Because bacterial ribosomes (70S) differ from ours (80S), many antibiotics (e.g. streptomycin, tetracycline) can specifically inhibit bacterial translation. The lack of RNA processing also explains why bacteria cannot correctly read a human gene with introns.',
    },
    sources: [S.miller, S.webster, S.shine, S.alberts_prot, S.pdb4ybb, S.pdb6ztj],
  },
};
