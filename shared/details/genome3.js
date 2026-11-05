/* Uitleg per knoop voor het zijpad "Hoe de cel kiest welke genen aan staan" (05-11-2026) — zie app/SCENES.md.
 * Nagekeken in docs/verificatie-ronde-9-epigenetica.md. */
const S = (ref, nl, en, url) => ({ t: { nl: `${ref} — ${nl}`, en: `${ref} — ${en}` }, url });
const PM = id => `https://pubmed.ncbi.nlm.nih.gov/${id}/`, PMC = id => `https://pmc.ncbi.nlm.nih.gov/articles/${id}/`;
const CLAPIER = S('Clapier et al. (2017) Mechanisms of action and regulation of ATP-dependent chromatin-remodelling complexes. Nat Rev Mol Cell Biol 18:407 (PMC)', 'verschuiven, uitwerpen en histonen wisselen; gedeelde ATPase-motor', 'sliding, ejection and histone exchange; shared ATPase motor', PMC('PMC8127953'));
const CLAPIER09 = S('Clapier & Cairns (2009) The biology of chromatin remodeling complexes. Annu Rev Biochem 78:273 (PubMed 19355820)', 'de vier families SWI/SNF, ISWI, CHD en INO80', 'the four families SWI/SNF, ISWI, CHD and INO80', PM(19355820));
const KADOCH = S('Kadoch et al. (2013) Proteomic and bioinformatic analysis of mammalian SWI/SNF complexes identifies extensive roles in human malignancy. Nat Genet 45:592 (PMC)', 'mSWI/SNF-subeenheden gemuteerd in 19,6 % van de tumoren', 'mSWI/SNF subunits mutated in 19.6% of tumours', PMC('PMC3667980'));
const KADOCH15 = S('Kadoch & Crabtree (2015) Mammalian SWI/SNF chromatin remodeling complexes and cancer. Sci Adv 1:e1500447 (PMC)', 'overzicht SWI/SNF en kanker', 'review of SWI/SNF and cancer', PMC('PMC4640607'));
const DAVIDSON = S('Davidson et al. (2019) DNA loop extrusion by human cohesin. Science 366:1338 (PubMed 31753851)', 'één cohesinecomplex trekt lussen tot 2,1 kb/s, met NIPBL–MAU2', 'single cohesin complexes extrude loops up to 2.1 kb/s, with NIPBL–MAU2', PM(31753851));
const DAVPET = S('Davidson & Peters (2021) Genome folding through loop extrusion by SMC complexes. Nat Rev Mol Cell Biol 22:445 (PubMed 33767413)', 'overzicht van het lusextrusiemodel', 'review of the loop extrusion model', PM(33767413));
const RAO14 = S('Rao et al. (2014) A 3D map of the human genome at kilobase resolution reveals principles of chromatin looping. Cell 159:1665 (PMC)', 'contactdomeinen (mediaan 185 kb); > 90 % van de CTCF-lusankers convergent', 'contact domains (median 185 kb); > 90% of CTCF loop anchors convergent', PMC('PMC5635824'));
const RAO17 = S('Rao et al. (2017) Cohesin loss eliminates all loop domains. Cell 171:305 (PMC)', 'zonder cohesine verdwijnen alle lusdomeinen', 'without cohesin all loop domains disappear', PMC('PMC5846482'));
const DIXON = S('Dixon et al. (2012) Topological domains in mammalian genomes identified by analysis of chromatin interactions. Nature 485:376 (PMC)', 'ontdekking van TADs', 'discovery of TADs', PMC('PMC3356448'));
const FUDEN = S('Fudenberg et al. (2016) Formation of chromosomal domains by loop extrusion. Cell Rep 15:2038 (PMC)', 'lusextrusie verklaart domeinen en CTCF-oriëntatie', 'loop extrusion explains domains and CTCF orientation', PMC('PMC4889513'));
const GABRIELE = S('Gabriele et al. (2022) Dynamics of CTCF- and cohesin-mediated chromatin looping revealed by live-cell imaging. Science 376:496 (PMC)', 'in levende cellen is de volledige lus zeldzaam (≈ 3–6,5 %)', 'in living cells the fully looped state is rare (≈ 3–6.5%)', PMC('PMC9069445'));
const ZHANG = S('Zhang et al. (2023) CTCF and R-loops are boundaries of cohesin-mediated DNA looping. Mol Cell 83:2856 (PubMed 37536339)', 'N-terminaal motief van CTCF bindt STAG1; structuur 7W1M', 'N-terminal motif of CTCF binds STAG1; structure 7W1M', PM(37536339));
const PDB7W1M = { t: { nl: 'RCSB PDB 7W1M — cryo-EM-structuur van menselijk cohesine–CTCF–DNA (6,5 Å)', en: 'RCSB PDB 7W1M — cryo-EM structure of human cohesin–CTCF–DNA (6.5 Å)' }, url: 'https://www.rcsb.org/structure/7W1M' };
const SOUT = S('Soutourina (2018) Transcription regulation by the Mediator complex. Nat Rev Mol Cell Biol 19:262 (PubMed 29209056)', 'Mediator geeft signalen van activatoren op enhancers door aan het PIC', 'Mediator relays signals from enhancer-bound activators to the PIC', PM(29209056));
const SCHOEN = S('Schoenfelder & Fraser (2019) Long-range enhancer–promoter contacts in gene expression control. Nat Rev Genet 20:437 (PubMed 31086298)', 'enhancers overbruggen vaak grote afstanden', 'enhancers often bridge large distances', PM(31086298));
const LETTICE = S('Lettice et al. (2003) A long-range Shh enhancer regulates expression in the developing limb and fin and is associated with preaxial polydactyly. Hum Mol Genet 12:1725 (PubMed 12837695)', 'de ZRS ligt 1 Mb van SHH; mutaties → extra vingers', 'the ZRS lies 1 Mb from SHH; mutations → extra digits', PM(12837695));
const LYON = S('Lyon (1961) Gene action in the X-chromosome of the mouse (Mus musculus L.). Nature 190:372 (PubMed 13764598)', 'de Lyon-hypothese: één X willekeurig inactief', 'the Lyon hypothesis: one X randomly inactive', PM(13764598));
const BROWN = S('Brown et al. (1991) A gene from the region of the human X inactivation centre is expressed exclusively from the inactive X chromosome. Nature 349:38 (PubMed 1985261)', 'ontdekking van XIST', 'discovery of XIST', PM(1985261));
const CLEMSON = S('Clemson et al. (1996) XIST RNA paints the inactive X chromosome at interphase. J Cell Biol 132:259 (PMC)', 'XIST-RNA bedekt het inactieve X', 'XIST RNA coats the inactive X', PMC('PMC2120729'));
const CARREL = S('Carrel & Willard (2005) X-inactivation profile reveals extensive variability in X-linked gene expression in females. Nature 434:400 (PubMed 15772666)', '≈ 15 % van de X-genen ontsnapt, ≈ 10 % wisselend', '≈ 15% of X genes escape, ≈ 10% variably', PM(15772666));
const TUKI = S('Tukiainen et al. (2017) Landscape of X chromosome inactivation across human tissues. Nature 550:244 (PMC)', 'onvolledige X-inactivatie bij ≥ 23 % van de X-genen', 'incomplete XCI for ≥ 23% of X genes', PMC('PMC5685192'));
const JANG = S('Jang & Yoo (2026) 3D chromatin architecture in cancer. Exp Mol Med 58:1734 (PMC)', 'lussen liggen binnen TADs, die de werking van enhancers tot de juiste genen beperken', 'loops lie within TADs, which restrict enhancer activity to the right genes', PMC('PMC13324790'));
const PARK = S('Park, Yin & Theunissen (2026) Exiting the ground state: the broad spectrum of cell fates accessible from naïve human pluripotent stem cells. Cell Mol Life Sci 83:23 (PMC)', 'bij de innesteling wordt één X willekeurig stilgezet', 'upon implantation one X is randomly inactivated', PMC('PMC12775239'));
const FU = S('Fu et al. (2026) From inactivation to intervention: X chromosome silencing in disease pathogenesis. Genes Dis 13:101964 (PMC)', 'het Barr-lichaampje is het zichtbare, compacte inactieve X', 'the Barr body is the visible, condensed inactive X', PMC('PMC13196324'));
const PAPULINO = S('Papulino et al. (2020) Preclinical and clinical epigenetic-based reconsideration of Beckwith-Wiedemann syndrome. Front Genet 11:563718 (PMC)', 'IGF2 en H19 liggen in 11p15.5', 'IGF2 and H19 lie in 11p15.5', PMC('PMC7522569'));
const PATRAT = S('Patrat, Ouimette & Rougeulle (2020) X chromosome inactivation in human development. Development 147:dev183095 (PubMed 31900287)', 'X-inactivatie in het vroege menselijke embryo', 'X inactivation in the early human embryo', PM(31900287));
const KAELIN = S('Kaelin et al. (2025) Molecular and genetic characterization of sex-linked orange coat color in the domestic cat. Curr Biol 35:2826 (PMC)', 'oranje vacht: X-gebonden, lapjeskat = willekeurige X-inactivatie', 'orange coat: X-linked, calico = random X inactivation', PMC('PMC12187551'));
const BARTO = S('Bartolomei & Ferguson-Smith (2011) Mammalian genomic imprinting. Cold Spring Harb Perspect Biol 3:a002592 (PMC)', '≈ 100 geïmprinte genen; ICR’s, wissen en opnieuw zetten in de kiemlijn', '≈ 100 imprinted genes; ICRs, erasure and resetting in the germline', PMC('PMC3119911'));
const BELL = S('Bell & Felsenfeld (2000) Methylation of a CTCF-dependent boundary controls imprinted expression of the Igf2 gene. Nature 405:482 (PubMed 10839546)', 'IGF2 vaderlijk, H19 moederlijk; CTCF-grens', 'IGF2 paternal, H19 maternal; CTCF boundary', PM(10839546));
const MONK = S('Monk et al. (2019) Genomic imprinting disorders: lessons on how genome, epigenome and environment interact. Nat Rev Genet 20:235 (PubMed 30647469)', 'imprintingziekten', 'imprinting disorders', PM(30647469));
const BUITING = S('Buiting (2010) Prader-Willi syndrome and Angelman syndrome. Am J Med Genet C 154C:365 (PubMed 20803659)', 'deletie 15q11–q13; UBE3A moederlijk in de hersenen', 'deletion 15q11–q13; UBE3A maternal in the brain', PM(20803659));
const HEARD = S('Heard & Martienssen (2014) Transgenerational epigenetic inheritance: myths and mechanisms. Cell 157:95 (PMC)', 'overerving over generaties bij de mens onduidelijk', 'transgenerational inheritance in humans unclear', PMC('PMC4020004'));
const HORST = S('Horsthemke (2018) A critical view on transgenerational epigenetic inheritance in humans. Nat Commun 9:2973 (PMC)', 'bij de mens niet overtuigend aangetoond', 'not convincingly shown in humans', PMC('PMC6065375'));

export default {
  remodeler: {
    nl: {
      kort: 'Nucleosomen kunnen DNA afdekken. Remodelers zijn eiwitmachines die met energie uit ATP nucleosomen opzij schuiven of wegnemen. Zo komt een stuk DNA vrij om afgelezen te worden.',
      what: 'ATP-afhankelijke chromatine-remodelers zijn grote complexen met een ATPase-motor. Die motor verplaatst DNA vanaf een vaste plaats op het nucleosoom. Er zijn vier families: SWI/SNF, ISWI, CHD en INO80.',
      how: [
        'De remodeler bindt het nucleosoom (vaak geholpen door merktekens op de histonen of door transcriptiefactoren).',
        'De ATPase-motor trekt DNA langs het histonoctameer: het nucleosoom schuift op (sliding).',
        'Sommige remodelers (vooral SWI/SNF) kunnen een nucleosoom ook helemaal uitwerpen.',
        'Andere wisselen histonen om voor varianten (bv. INO80- en SWR-achtige complexen) of zetten nucleosomen op regelmatige afstanden (ISWI, CHD).',
      ],
      facts: [['Families', 'SWI/SNF, ISWI, CHD, INO80'], ['Energie', 'ATP'], ['Uitkomsten', 'schuiven, uitwerpen, histonen wisselen, ordenen'], ['Kanker', 'mSWI/SNF-subeenheden gemuteerd in 19,6 % van de tumoren']],
      why: 'Zonder remodelers blijft veel DNA verstopt onder nucleosomen. Daarom zijn ze nodig om genen aan te zetten. Mutaties in subeenheden van het menselijke SWI/SNF-complex (o.a. ARID1A, SMARCA4, SMARCB1) komen voor in ongeveer één op de vijf tumoren.',
    },
    en: {
      kort: 'Nucleosomes can cover DNA. Remodellers are protein machines that use energy from ATP to slide nucleosomes aside or remove them. That frees a stretch of DNA to be read.',
      what: 'ATP-dependent chromatin remodellers are large complexes with an ATPase motor. That motor translocates DNA from a fixed location on the nucleosome. There are four families: SWI/SNF, ISWI, CHD and INO80.',
      how: [
        'The remodeller binds the nucleosome (often helped by marks on the histones or by transcription factors).',
        'The ATPase motor pulls DNA along the histone octamer: the nucleosome slides along (sliding).',
        'Some remodellers (mainly SWI/SNF) can also eject a nucleosome completely.',
        'Others swap histones for variants (e.g. INO80- and SWR-like complexes) or space nucleosomes evenly (ISWI, CHD).',
      ],
      facts: [['Families', 'SWI/SNF, ISWI, CHD, INO80'], ['Energy', 'ATP'], ['Outcomes', 'sliding, ejection, histone exchange, spacing'], ['Cancer', 'mSWI/SNF subunits mutated in 19.6% of tumours']],
      why: 'Without remodellers much DNA stays hidden under nucleosomes, so they are needed to switch genes on. Mutations in subunits of the human SWI/SNF complex (e.g. ARID1A, SMARCA4, SMARCB1) occur in about one in five tumours.',
    },
    sources: [CLAPIER, CLAPIER09, KADOCH, KADOCH15],
  },
  lussen: {
    nl: {
      kort: 'Het DNA in de kern ligt in lussen. Volgens het huidige model trekt een eiwitring het DNA door zich heen tot hij een stop-eiwit raakt. Elke lus vormt een buurt waarin DNA-stukken elkaar vaak raken.',
      what: 'Cohesine is een ring van SMC1A, SMC3 en RAD21 (met STAG1 of STAG2). Met de lader NIPBL trekt het DNA tot lussen (lusextrusie). CTCF bindt een richtingsgevoelige DNA-plaats; als die naar de ring wijst, stopt de ring. Zo ontstaan lusdomeinen en TADs (topologically associating domains).',
      how: [
        'NIPBL laadt cohesine op het DNA; de ring trekt met ATP het DNA aan twee kanten door zich heen (in de proefbuis tot 2,1 kb/s).',
        'CTCF-plaatsen aan beide uiteinden van een lus wijzen meestal naar elkaar (convergent, > 90 % van de lusankers).',
        'Het N-terminale stukje van CTCF raakt de STAG1-subeenheid van cohesine, maar alleen als CTCF met die kant naar de ring wijst (structuur 7W1M).',
        'Breek je cohesine af, dan verdwijnen alle lusdomeinen; na het terugzetten vormen veel lussen van een megabase zich binnen een uur opnieuw.',
      ],
      facts: [['Contactdomeinen', 'mediaan ≈ 185 kb (Hi-C, mens)'], ['Snelheid (in vitro)', 'tot 2,1 kb/s'], ['CTCF-oriëntatie', '> 90 % convergent'], ['In levende cellen', 'volledige lus ≈ 3–6,5 % van de tijd (één locus, muis)'], ['Structuur', 'PDB 7W1M: mens, cryo-EM 6,5 Å']],
      why: 'Lussen bepalen welke verre versterkers (enhancers) bij welk gen kunnen komen. Het lusextrusiemodel is sterk onderbouwd (rechtstreeks gezien in de proefbuis, verklaart Hi-C-kaarten), maar hoe het in levende cellen precies verloopt, wordt nog onderzocht: lussen blijken daar beweeglijk en vaak maar half af.',
    },
    en: {
      kort: 'The DNA in the nucleus lies in loops. According to the current model a protein ring pulls the DNA through itself until it meets a stop protein. Each loop forms a neighbourhood in which pieces of DNA often touch.',
      what: 'Cohesin is a ring of SMC1A, SMC3 and RAD21 (with STAG1 or STAG2). With the loader NIPBL it pulls DNA into loops (loop extrusion). CTCF binds a direction-sensitive DNA site; when that site faces the ring, the ring stops. This creates loop domains and TADs (topologically associating domains).',
      how: [
        'NIPBL loads cohesin onto the DNA; using ATP, the ring pulls the DNA through itself on both sides (in the test tube up to 2.1 kb/s).',
        'CTCF sites at both ends of a loop usually face each other (convergent, > 90% of loop anchors).',
        'The N-terminal stretch of CTCF touches the STAG1 subunit of cohesin, but only when CTCF faces the ring with that side (structure 7W1M).',
        'Degrade cohesin and all loop domains disappear; after restoring it many megabase-sized loops re-form within an hour.',
      ],
      facts: [['Contact domains', 'median ≈ 185 kb (Hi-C, human)'], ['Speed (in vitro)', 'up to 2.1 kb/s'], ['CTCF orientation', '> 90% convergent'], ['In living cells', 'full loop ≈ 3–6.5% of the time (one locus, mouse)'], ['Structure', 'PDB 7W1M: human, cryo-EM 6.5 Å']],
      why: 'Loops decide which distant switches (enhancers) can reach which gene. The loop extrusion model is strongly supported (seen directly in the test tube, explains Hi-C maps), but exactly how it works in living cells is still being studied: there, loops turn out to be dynamic and often only partly formed.',
    },
    sources: [DAVIDSON, DAVPET, RAO14, RAO17, DIXON, FUDEN, GABRIELE, ZHANG, PDB7W1M],
  },
  enhancer: {
    nl: {
      kort: 'Een enhancer is een stukje DNA dat een gen sterker aanzet. Hij kan ver van het gen liggen. Een lus brengt hem met zijn activatoren naast de startplaats, en het Mediator-complex geeft het signaal door.',
      what: 'Enhancers zijn regulerende DNA-elementen waarop activatoren (transcriptiefactoren) binden. Ze kunnen over grote afstanden werken. Mediator is een groot complex van meerdere eiwitten dat de activatoren verbindt met het preinitiatiecomplex en RNA-polymerase II op de promoter.',
      how: [
        'Activatoren binden hun herkenningsplaatsen in de enhancer en halen co-activatoren aan.',
        'Een chromatinelus brengt de enhancer bij de promoter, vaak binnen dezelfde lus of TAD.',
        'Mediator geeft het signaal van de activatoren door aan de algemene transcriptiefactoren en RNA-polymerase II.',
        'Het preinitiatiecomplex wordt sneller opgebouwd en het gen wordt vaker afgelezen.',
      ],
      facts: [['Afstand', 'kan groot zijn: tot ≈ 1 Mb'], ['Voorbeeld', 'ZRS ligt 1 Mb van SHH (in een intron van LMBR1)'], ['Ziekte', 'ZRS-mutaties → preaxiale polydactylie (extra vinger aan de duimkant)'], ['Doorgever', 'Mediator']],
      why: 'Enhancers bepalen in welk weefsel en op welk moment een gen aan gaat. Omdat ze ver weg kunnen liggen, kan een fout ver van een gen dat gen toch verstoren, zoals bij de ZRS en extra vingers.',
    },
    en: {
      kort: 'An enhancer is a stretch of DNA that turns a gene on more strongly. It can lie far from the gene. A loop brings it with its activators next to the start site, and the Mediator complex passes the signal on.',
      what: 'Enhancers are regulatory DNA elements bound by activators (transcription factors). They can work over large distances. Mediator is a large complex of many proteins that connects the activators with the preinitiation complex and RNA polymerase II at the promoter.',
      how: [
        'Activators bind their recognition sites in the enhancer and recruit co-activators.',
        'A chromatin loop brings the enhancer to the promoter, often within the same loop or TAD.',
        'Mediator passes the activators’ signal on to the general transcription factors and RNA polymerase II.',
        'The preinitiation complex assembles faster and the gene is read more often.',
      ],
      facts: [['Distance', 'can be large: up to ≈ 1 Mb'], ['Example', 'ZRS lies 1 Mb from SHH (in an intron of LMBR1)'], ['Disease', 'ZRS mutations → preaxial polydactyly (extra digit on the thumb side)'], ['Relay', 'Mediator']],
      why: 'Enhancers decide in which tissue and at what moment a gene switches on. Because they can lie far away, a fault far from a gene can still disturb that gene, as with the ZRS and extra fingers.',
    },
    sources: [SOUT, SCHOEN, LETTICE, RAO14, JANG],
  },
  xinact: {
    nl: {
      kort: 'Vrouwen hebben twee X-chromosomen, mannen één. Vroeg in het embryo zet elke vrouwelijke cel bij toeval één X stil, en alle dochtercellen houden die keuze. Daarom is een vrouw een mozaïek.',
      what: 'X-inactivatie zorgt voor dosiscompensatie: in vrouwelijke zoogdiercellen werkt maar één X volop. Het gen XIST op het te stillen X maakt een lang niet-coderend RNA dat dat X bedekt. Daarna wordt het X compact en stil; onder de microscoop is het het Barr-lichaampje.',
      how: [
        'Vroeg in de ontwikkeling (bij de mens rond de innesteling) kiest elke cel willekeurig het X van de moeder of dat van de vader.',
        'Het gekozen X maakt XIST-RNA, dat zich over het hele chromosoom verspreidt.',
        'Het X wordt omgebouwd tot stil, compact heterochromatine (Barr-lichaampje).',
        'Bij elke celdeling blijft hetzelfde X stil, zodat vlekken (klonen) ontstaan met het ene of het andere actieve X.',
      ],
      facts: [['Ontsnappen', '≈ 15 % van de X-genen, nog ≈ 10 % wisselend'], ['Ontdekt', 'Lyon-hypothese, 1961'], ['RNA', 'XIST (1991), bedekt het inactieve X'], ['Voorbeeld', 'lapjeskat en schildpadkat: oranje gen op het X']],
      why: 'X-inactivatie verklaart waarom vrouwen een mozaïek zijn voor genen op het X. Bij katten is het oranje-gen X-gebonden: de oranje en zwarte vlekken van een lapjeskat tonen de willekeurige keuze.',
    },
    en: {
      kort: 'Women have two X chromosomes, men one. Early in the embryo every female cell silences one X at random, and all daughter cells keep that choice. That is why a woman is a mosaic.',
      what: 'X inactivation provides dosage compensation: in female mammalian cells only one X is fully active. The XIST gene on the X to be silenced makes a long non-coding RNA that coats that X. The X then becomes compact and silent; under the microscope it is the Barr body.',
      how: [
        'Early in development (in humans around implantation) each cell randomly picks the mother’s or the father’s X.',
        'The chosen X makes XIST RNA, which spreads over the whole chromosome.',
        'The X is remodelled into silent, compact heterochromatin (Barr body).',
        'At every cell division the same X stays silent, so patches (clones) arise with one or the other active X.',
      ],
      facts: [['Escape', '≈ 15% of X genes, another ≈ 10% variably'], ['Discovered', 'Lyon hypothesis, 1961'], ['RNA', 'XIST (1991), coats the inactive X'], ['Example', 'calico and tortoiseshell cats: orange gene on the X']],
      why: 'X inactivation explains why women are mosaics for genes on the X. In cats the orange gene is X-linked: the orange and black patches of a calico show the random choice.',
    },
    sources: [LYON, BROWN, CLEMSON, CARREL, TUKI, PATRAT, PARK, FU, KAELIN],
  },
  imprinting: {
    nl: {
      kort: 'Van de meeste genen werken beide kopieën. Bij ongeveer honderd genen werkt alleen de kopie van de moeder of alleen die van de vader. Een merkteken uit de eicel of de zaadcel beslist dat.',
      what: 'Bij genomische imprinting hangt de activiteit van een gen af van de ouder van wie het komt. Het merkteken is DNA-methylatie op een imprintingcontroleregio (ICR), gezet in de eicel of de zaadcel. Die merktekens blijven na de bevruchting staan, ook als de rest van het genoom herprogrammeerd wordt.',
      how: [
        'In de kiemcellen worden de oude merktekens gewist en opnieuw gezet volgens het geslacht van de ouder.',
        'IGF2 en H19 delen een enhancer. Op de kopie van de vader is de ICR gemethyleerd: CTCF kan niet binden en de enhancer bereikt IGF2.',
        'Op de kopie van de moeder bindt CTCF de ongemethyleerde ICR als isolator: de enhancer bereikt alleen H19.',
        'In het gebied 15q11–q13 werken sommige genen alleen van de vader, UBE3A in de hersenen alleen van de moeder.',
      ],
      facts: [['Aantal', '≈ 100 genen (zoogdieren, overzicht 2011)'], ['Voorbeeld', 'IGF2 vaderlijk, H19 moederlijk'], ['Deletie 15q11–q13', 'vaderlijk → Prader-Willi, moederlijk → Angelman'], ['Overerving over generaties', 'bij de mens niet aangetoond']],
      why: 'Imprinting verklaart waarom hetzelfde verlies van een stukje DNA twee heel verschillende ziekten kan geven. Let op een veelgehoorde mythe: dat ervaringen van ouders of grootouders via epigenetische merktekens worden doorgegeven aan volgende generaties, is bij de mens niet aangetoond. Bij planten en wormen gebeurt het wel, maar bij mensen zijn genetische, culturele en omgevingsinvloeden niet te scheiden van epigenetische, en worden de merktekens in de kiemlijn grotendeels gewist.',
    },
    en: {
      kort: 'For most genes both copies work. For about a hundred genes only the mother’s or only the father’s copy works. A mark from the egg or the sperm decides that.',
      what: 'In genomic imprinting the activity of a gene depends on the parent it comes from. The mark is DNA methylation on an imprinting control region (ICR), set in the egg or the sperm. These marks survive after fertilisation, even when the rest of the genome is reprogrammed.',
      how: [
        'In the germ cells the old marks are erased and set again according to the sex of the parent.',
        'IGF2 and H19 share an enhancer. On the father’s copy the ICR is methylated: CTCF cannot bind and the enhancer reaches IGF2.',
        'On the mother’s copy CTCF binds the unmethylated ICR as an insulator: the enhancer only reaches H19.',
        'In the region 15q11–q13 some genes work only from the father, UBE3A in the brain only from the mother.',
      ],
      facts: [['Number', '≈ 100 genes (mammals, 2011 review)'], ['Example', 'IGF2 paternal, H19 maternal'], ['Deletion 15q11–q13', 'paternal → Prader-Willi, maternal → Angelman'], ['Inheritance across generations', 'not shown in humans']],
      why: 'Imprinting explains why the same loss of a piece of DNA can cause two very different disorders. Beware of a common myth: that experiences of parents or grandparents are passed on to later generations through epigenetic marks has not been shown in humans. It does happen in plants and worms, but in humans genetic, cultural and environmental influences cannot be separated from epigenetic ones, and the marks are largely erased in the germline.',
    },
    sources: [BARTO, BELL, MONK, BUITING, HEARD, HORST, PAPULINO],
  },
};
