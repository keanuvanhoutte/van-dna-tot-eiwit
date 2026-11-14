/* Verificatierondes en broncontrole — samengevat uit docs/verificatie-ronde-*.md en FIXES.md (14-11-2026).
 * Gebruikt door docs/over.js. Volledige verslagen: docs/verificatie-ronde-*.md (Nederlands). */
export const VERIF = {
 "rounds": [
  {
   "nr": "1",
   "date": "2026-09-28",
   "scope": {
    "nl": "De korte samenvattingen van de kernbegrippen (van kernporie tot translatie), de jaartallen in de cursusnotities, de gebruikte PDB-codes en losse cijfers zoals snelheden, aantallen en afmetingen; daarbij voor het eerst de binnenkomst van adenovirus, mRNA-vaccin en HIV-1 in een menselijke cel.",
    "en": "The short summaries of the core concepts (from nuclear pore to translation), the dates in the course notes, the PDB codes used, and individual numbers such as speeds, counts and sizes; for the first time also the entry of adenovirus, mRNA vaccine and HIV-1 into a human cell."
   },
   "method": {
    "nl": "Elke bewering kreeg een oordeel (klopt, nuance nodig, fout) met de bron erbij: primaire artikels en reviews met DOI of PMID, de RCSB-pagina van elke PDB-code, NCBI Assembly (T2T-genoom) en BioNumbers voor afmetingen.",
    "en": "Each claim received a verdict (correct, needs nuance, wrong) with its source: primary articles and reviews with DOI or PMID, the RCSB page of each PDB code, NCBI Assembly (T2T genome) and BioNumbers for sizes."
   },
   "checked": null,
   "corrections": 13,
   "examples": [
    {
     "nl": "PDB 193D stond in de notities als G-quadruplex, maar is een structuur van een geneesmiddel dat tussen de DNA-basen schuift (Chen & Patel 1995). Vervangen door 143D (menselijk telomeer-DNA, Wang & Patel 1993) en 1KF1 (met K⁺ in het kanaal, Parkinson et al. 2002).",
     "en": "PDB 193D was listed in the notes as a G-quadruplex, but it is a structure of a drug that slides between DNA bases (Chen & Patel 1995). Replaced by 143D (human telomeric DNA, Wang & Patel 1993) and 1KF1 (with K⁺ in the channel, Parkinson et al. 2002)."
    },
    {
     "nl": "Nucleosoom: ‘147 bp in 1,65 windingen’ was intern tegenstrijdig, want 1,65 hoort bij de 146 bp van PDB 1AOI. Werd ‘~147 bp in ongeveer 1,7 windingen’ (Luger et al. 1997; Davey et al. 2002, PDB 1KX5).",
     "en": "Nucleosome: ‘147 bp in 1.65 turns’ was internally inconsistent, because 1.65 belongs to the 146 bp of PDB 1AOI. Became ‘~147 bp in about 1.7 turns’ (Luger et al. 1997; Davey et al. 2002, PDB 1KX5)."
    },
    {
     "nl": "Translatiestart: de tekst liet het 43S-complex het mRNA aftasten; met het mRNA erop heet het 48S, en dat complex tast af. Ook: de ‘1–2 %’ endosomale ontsnapping van lipidenanopartikels is gemeten met siRNA (Gilleron et al. 2013), niet met mRNA-vaccins, en wordt daarom als ordegrootte gebracht.",
     "en": "Translation start: the text had the 43S complex scanning the mRNA; once the mRNA is bound it is called 48S, and that complex scans. Also: the ‘1–2 %’ endosomal escape of lipid nanoparticles was measured with siRNA (Gilleron et al. 2013), not with mRNA vaccines, so it is presented as an order of magnitude."
    }
   ]
  },
  {
   "nr": "2",
   "date": "2026-09-29",
   "scope": {
    "nl": "Alle uitlegpanelen, scèneteksten en samenvattingen van 72 begrippen (binnenkomst, genoom, replicatie, transcriptie, RNA, translatie, eiwitten) en de 3D-bibliotheek, telkens in het Nederlands en het Engels.",
    "en": "All explanation panels, scene texts and summaries of 72 concepts (entry, genome, replication, transcription, RNA, translation, proteins) and the 3D library, each in Dutch and English."
   },
   "method": {
    "nl": "Elke feitelijke bewering getoetst aan PubMed/Europe PMC-abstracts (via NCBI E-utilities), de RCSB-API (titel, methode, organisme, ketens), UniProt en PDB-101; van elke PMID/PMC-ID zijn auteurs en titel opgevraagd en elke bron-URL is opgeroepen; Nederlands en Engels naast elkaar gelegd.",
    "en": "Every factual claim tested against PubMed/Europe PMC abstracts (via NCBI E-utilities), the RCSB API (title, method, organism, chains), UniProt and PDB-101; authors and title of every PMID/PMC ID were retrieved and every source URL was opened; Dutch and English compared side by side."
   },
   "checked": null,
   "corrections": 57,
   "examples": [
    {
     "nl": "‘Baltimore stelde in 1971 zeven klassen voor’ werd ‘Baltimore beschreef zes klassen; klasse VII kwam later’ (Koonin et al. 2021, PMC8483701).",
     "en": "‘Baltimore proposed seven classes in 1971’ became ‘Baltimore described six classes; class VII was added later’ (Koonin et al. 2021, PMC8483701)."
    },
    {
     "nl": "‘NMD onderdrukt ongeveer 1/3 van de ziekteveroorzakende mRNA's’ stond niet in de geciteerde bron en werd herschreven: nonsense-mutaties zijn ongeveer 11 % van de erfelijke ziektemutaties (Mort et al. 2008, PMID 18454449).",
     "en": "‘NMD suppresses about 1/3 of disease-causing mRNAs’ was not in the cited source and was rewritten: nonsense mutations are about 11 % of inherited disease mutations (Mort et al. 2008, PMID 18454449)."
    },
    {
     "nl": "RNA-polymerase I heeft bij de mens 13 subeenheden, niet 14 (dat is gist); en een bron stond onder een verkeerde eerste auteur (‘Pelletier’ werd ‘Gilles et al. 2020’, nagekeken via PMC7140421).",
     "en": "Human RNA polymerase I has 13 subunits, not 14 (that is yeast); and a source was listed under the wrong first author (‘Pelletier’ became ‘Gilles et al. 2020’, checked via PMC7140421)."
    }
   ]
  },
  {
   "nr": "3",
   "date": "2026-09-30",
   "scope": {
    "nl": "Alle zichtbare teksten in de scènes en de schema's van de 3D-bibliotheek, na een ronde waarin honderden labels en ondertitels werden ingekort: is er betekenis verloren gegaan?",
    "en": "All visible texts in the scenes and the 3D-library diagrams, after a round in which hundreds of labels and captions were shortened: was any meaning lost?"
   },
   "method": {
    "nl": "Alle teksten automatisch uitgelezen en tekst per tekst naast de versie van vóór het inkorten gelegd, daarna volledig herlezen; nieuwe punten nagekeken in dbSNP/ClinVar, reviews en primaire literatuur, en de 37 genen van het mitochondriaal DNA vergeleken met de NCBI-featuretabel (E-utilities).",
    "en": "All texts extracted automatically and compared text by text with the version before shortening, then reread in full; new points checked in dbSNP/ClinVar, reviews and primary literature, and the 37 genes of mitochondrial DNA compared with the NCBI feature table (E-utilities)."
   },
   "checked": 1340,
   "corrections": 29,
   "examples": [
    {
     "nl": "Door het inkorten stond er ‘61 aminozuren + 3 stop’; dat werd ‘61 voor aminozuren + 3 stop’ (standaard genetische code).",
     "en": "Shortening had produced ‘61 amino acids + 3 stop’; this became ‘61 for amino acids + 3 stop’ (standard genetic code)."
    },
    {
     "nl": "T-DNA-schema: de T-streng werd getekend als al bedekt met VirE2 in de bacterie; VirE2 wordt echter apart uitgescheiden en bedekt de streng pas in de plantencel (Vergunst et al. 2000; Li et al. 2014, PMC3937733).",
     "en": "T-DNA diagram: the T-strand was drawn already coated with VirE2 inside the bacterium; VirE2 is in fact secreted separately and coats the strand only in the plant cell (Vergunst et al. 2000; Li et al. 2014, PMC3937733)."
    },
    {
     "nl": "‘De stille mutatie in codon 2 is een fictief voorbeeld’ werd ‘een echte, onschadelijke variant (rs713040)’ (dbSNP; ClinVar: benign). Ook tekende een schets de α-helix per ongeluk linkshandig; die is rechtgezet.",
     "en": "‘The silent mutation in codon 2 is a fictional example’ became ‘a real, harmless variant (rs713040)’ (dbSNP; ClinVar: benign). A sketch also drew the α-helix left-handed by mistake; this was corrected."
    }
   ]
  },
  {
   "nr": "4",
   "date": "2026-10-01",
   "scope": {
    "nl": "Het signaalverhaal: EGF-receptor, MAPK-cascade en SRF, plus het overzicht met G-eiwitgekoppelde receptor en steroïdreceptor, inclusief tekeningen die feiten vastleggen.",
    "en": "The signalling story: EGF receptor, MAPK cascade and SRF, plus the overview with the G-protein-coupled receptor and the steroid receptor, including drawings that encode facts."
   },
   "method": {
    "nl": "Residunummers en lengtes rechtstreeks uit de UniProt-API, elke PDB-ID via de RCSB-API, elke geciteerde PubMed-bron via NCBI E-utilities (auteurs, tijdschrift, pagina's en abstract vergeleken met de bewering), Bookshelf-ID's via de books-database.",
    "en": "Residue numbers and lengths taken directly from the UniProt API, every PDB ID via the RCSB API, every cited PubMed source via NCBI E-utilities (authors, journal, pages and abstract compared with the claim), Bookshelf IDs via the books database."
   },
   "checked": 325,
   "corrections": 11,
   "examples": [
    {
     "nl": "In de tekening zwaaide helix 6 van de receptor bij activatie naar het midden van de bundel; in werkelijkheid beweegt het binnenste uiteinde ongeveer 14 Å naar buiten (Rasmussen et al. 2011). De tekening is omgedraaid.",
     "en": "In the drawing, helix 6 of the receptor swung towards the centre of the bundle on activation; in reality its inner end moves about 14 Å outwards (Rasmussen et al. 2011). The drawing was reversed."
    },
    {
     "nl": "Twee bronnen stonden onder een verkeerde auteur: ‘Berkowitz et al. 1989’ werd ‘Fisch et al. 1989’ (PMID 2541049) en ‘Lim et al. 2015’ werd ‘Schiller et al. 2014’ (de DOI in de link hoorde bij Schiller).",
     "en": "Two sources were listed under the wrong author: ‘Berkowitz et al. 1989’ became ‘Fisch et al. 1989’ (PMID 2541049) and ‘Lim et al. 2015’ became ‘Schiller et al. 2014’ (the DOI in the link belonged to Schiller)."
    },
    {
     "nl": "Halfwaardetijd van FOS-mRNA ‘10–20 min’ werd ‘10–15 min’: gemeten waarden liggen rond 9 tot 15 min, 20 min werd nergens gevonden (Shyu et al. 1989; Reddy et al. 2013).",
     "en": "Half-life of FOS mRNA ‘10–20 min’ became ‘10–15 min’: measured values are around 9 to 15 min; 20 min was found nowhere (Shyu et al. 1989; Reddy et al. 2013)."
    }
   ]
  },
  {
   "nr": "5",
   "date": "2026-10-01",
   "scope": {
    "nl": "Alle ondertitels en korte samenvattingen die in eenvoudige taal herschreven waren: bleef alles juist na het vereenvoudigen?",
    "en": "All captions and short summaries rewritten in plain language: did everything stay correct after simplifying?"
   },
   "method": {
    "nl": "Elke nieuwe zin naast de vorige, al nagekeken tekst en het uitlegpaneel gelegd (git diff); gezocht naar weggevallen voorbehouden, oververalgemeningen en verkeerde oorzaak-gevolg; een eenvoudigere maar nog ware zin telde als juist.",
    "en": "Every new sentence compared with the previous, already-checked text and the explanation panel (git diff); searched for dropped qualifications, overgeneralisations and wrong cause-and-effect; a simpler but still true sentence counted as correct."
   },
   "checked": 1420,
   "corrections": 21,
   "examples": [
    {
     "nl": "‘Pol II maakt alle mRNA's (dus van alle eiwitgenen)’ werd ‘de mRNA's van alle eiwitgenen in de kern’, want de 13 eiwitgenen van het mitochondriaal DNA worden door een eigen polymerase (POLRMT) afgeschreven (UniProt O00411).",
     "en": "‘Pol II makes all mRNAs (so for all protein genes)’ became ‘the mRNAs of all protein genes in the nucleus’, because the 13 protein genes of mitochondrial DNA are transcribed by a separate polymerase (POLRMT) (UniProt O00411)."
    },
    {
     "nl": "‘Ze controleren hun eigen werk’ over de enzymen die tRNA's laden werd ‘Veel ervan controleren hun eigen werk’: slechts ongeveer de helft heeft een controlefunctie (Ibba & Söll 2000).",
     "en": "‘They check their own work’ about the enzymes that charge tRNAs became ‘Many of them check their own work’: only about half have a proofreading function (Ibba & Söll 2000)."
    },
    {
     "nl": "‘Vijf chromosomen dragen de genen voor ribosomaal RNA’ werd ‘voor het meeste ribosomaal RNA’, omdat de 5S-rRNA-genen op chromosoom 1 liggen (Sørensen & Frederiksen 1991; Stults et al. 2008).",
     "en": "‘Five chromosomes carry the genes for ribosomal RNA’ became ‘for most ribosomal RNA’, because the 5S rRNA genes lie on chromosome 1 (Sørensen & Frederiksen 1991; Stults et al. 2008)."
    }
   ]
  },
  {
   "nr": "6",
   "date": "2026-11-04",
   "scope": {
    "nl": "De volledige bacterieroute (E. coli): uitleg, scènes, figuurlabels, getallen en de vijf gebruikte 3D-structuren.",
    "en": "The complete bacterial route (E. coli): explanations, scenes, figure labels, numbers and the five 3D structures used."
   },
   "method": {
    "nl": "Onafhankelijke controle door een aparte AI-controleur (niet de bouwer), met bronnen uit PubMed/PMC, UniProt en de mmCIF-bestanden van de structuren; daarna een tweede controle door dezelfde controleur om na te gaan of alle correcties juist en in beide talen verwerkt waren.",
    "en": "Independent check by a separate AI reviewer (not the builder), using sources from PubMed/PMC, UniProt and the mmCIF files of the structures; followed by a second check by the same reviewer to confirm that all corrections were made correctly and in both languages."
   },
   "checked": 260,
   "corrections": 23,
   "examples": [
    {
     "nl": "‘Rifampicine remt het bacteriële enzym omdat het geen σ heeft en de mens wel transcriptiefactoren’ was fout. Nu: rifampicine past in een holte van de β-subeenheid van het bacteriële enzym en blokkeert de uitgang van het RNA; ons Pol II heeft die holte niet (Campbell et al. 2001, PMID 11290327).",
     "en": "‘Rifampicin inhibits the bacterial enzyme because it lacks σ while humans have transcription factors’ was wrong. Now: rifampicin fits a pocket in the β subunit of the bacterial enzyme and blocks the RNA exit; our Pol II lacks that pocket (Campbell et al. 2001, PMID 11290327)."
    },
    {
     "nl": "‘Bacteriën hebben geen ubiquitine en geen proteasoom’ werd ‘E. coli heeft geen …’, omdat sommige bacteriën (zoals de tuberculosebacterie) wel een proteasoom hebben (Pearce et al. 2008).",
     "en": "‘Bacteria have no ubiquitin and no proteasome’ became ‘E. coli has no …’, because some bacteria (such as the tuberculosis bacterium) do have a proteasome (Pearce et al. 2008)."
    },
    {
     "nl": "De bron bij 3D-structuur 6WRF was een ander artikel van dezelfde groep; via het citaat in het structuurbestand zelf werd het juiste artikel gevonden (Fei et al. 2020, eLife 9:e61496).",
     "en": "The source attached to 3D structure 6WRF was a different paper by the same group; the citation inside the structure file itself identified the right paper (Fei et al. 2020, eLife 9:e61496)."
    }
   ]
  },
  {
   "nr": "7",
   "date": "2026-11-05",
   "scope": {
    "nl": "Het zijpad ‘DNA kopiëren en herstellen’: startplaatsen van replicatie, foutherstel (MMR, BER, NER), breukherstel, p53, plus vijf nieuwe 3D-stappen met menselijke structuren.",
    "en": "The side path ‘Copying and repairing DNA’: replication origins, error repair (MMR, BER, NER), break repair, p53, plus five new 3D steps with human structures."
   },
   "method": {
    "nl": "Elke bewering vergeleken met de opgehaalde bron (PMC/PubMed, voor vier artikels de volledige tekst); PDB-ID's via de RCSB-API, en ketens, residuen en contacten nagemeten in de coördinatenbestanden zelf.",
    "en": "Every claim compared with the retrieved source (PMC/PubMed, full text for four papers); PDB IDs via the RCSB API, and chains, residues and contacts measured in the coordinate files themselves."
   },
   "checked": null,
   "corrections": 17,
   "examples": [
    {
     "nl": "De opdracht vermeldde ‘TP53 is gemuteerd in meer dan 50 % van de tumoren’; volgens de bronnen klopt dat niet. Nu: ‘het vaakst gemuteerde gen’ (42 % van de stalen, Kandoth et al. 2013) en per kankertype van ongeveer 5 % tot 38–50 % (Olivier et al. 2010).",
     "en": "The brief stated ‘TP53 is mutated in more than 50 % of tumours’; according to the sources this is not correct. Now: ‘the most frequently mutated gene’ (42 % of samples, Kandoth et al. 2013) and, per cancer type, from about 5 % to 38–50 % (Olivier et al. 2010)."
    },
    {
     "nl": "Breukherstel via homologe recombinatie heette ‘zonder fouten’; de bron zegt ‘high-fidelity’, dus werd het ‘nauwkeurig’, en ‘het gevaarlijkste letsel’ werd ‘een van de gevaarlijkste letsels’ (Sullivan & Bernstein 2018).",
     "en": "Break repair by homologous recombination was called ‘error-free’; the source says ‘high-fidelity’, so it became ‘accurate’, and ‘the most dangerous lesion’ became ‘one of the most dangerous lesions’ (Sullivan & Bernstein 2018)."
    },
    {
     "nl": "‘Ongeveer 11 soorten glycosylasen bij de mens’ werd ‘minstens 11 bij zoogdieren’, zoals de bron het zegt (Krokan & Bjørås 2013).",
     "en": "‘About 11 kinds of glycosylases in humans’ became ‘at least 11 in mammals’, as the source puts it (Krokan & Bjørås 2013)."
    }
   ]
  },
  {
   "nr": "8",
   "date": "2026-11-05",
   "scope": {
    "nl": "Het zijpad ‘Waar een eiwit heen gaat en hoe het verdwijnt’: sortering, membraaneiwitten, lysosoom, mitochondriën, peroxisomen, proteasoom en autofagie.",
    "en": "The side path ‘Where a protein goes and how it disappears’: sorting, membrane proteins, lysosome, mitochondria, peroxisomes, proteasome and autophagy."
   },
   "method": {
    "nl": "Elke bewering vergeleken met de bron: PubMed-abstracts via E-utilities en volledige teksten via PMC; PDB-ID's via de RCSB-API (organisme per entiteit), afmetingen en ketens nagemeten in de coördinatenbestanden.",
    "en": "Every claim compared with its source: PubMed abstracts via E-utilities and full texts via PMC; PDB IDs via the RCSB API (organism per entity), sizes and chains measured in the coordinate files."
   },
   "checked": null,
   "corrections": 12,
   "examples": [
    {
     "nl": "Het proteasoom maakt volgens de opdracht stukjes van 3–15 aminozuren; de bron meet 3 tot 22 (Kisselev et al.). Nu ‘3 tot ongeveer 20’ in de stap en ‘3–22’ in de uitleg.",
     "en": "According to the brief, the proteasome makes pieces of 3–15 amino acids; the source measures 3 to 22 (Kisselev et al.). Now ‘3 to about 20’ in the step and ‘3–22’ in the explanation."
    },
    {
     "nl": "‘Meer dan 1000 eiwitten worden in het mitochondrion ingevoerd’ werd onderbouwd met MitoCarta3.0: 1 136 menselijke genen.",
     "en": "‘More than 1000 proteins are imported into the mitochondrion’ was backed with MitoCarta3.0: 1,136 human genes."
    },
    {
     "nl": "Geschatte schalen en duren zonder bron (‘≈ 50 nm’, ‘seconden tot minuten’) werden ‘schematisch’ of vervangen door een maat die in de structuur zelf gemeten is (de importpoort is ≈ 13 nm breed in 7CP9).",
     "en": "Estimated scales and durations without a source (‘≈ 50 nm’, ‘seconds to minutes’) became ‘schematic’ or were replaced by a size measured in the structure itself (the import gate is ≈ 13 nm wide in 7CP9)."
    }
   ]
  },
  {
   "nr": "9",
   "date": "2026-11-05",
   "scope": {
    "nl": "Het zijpad ‘Hoe de cel kiest welke genen aan staan’: chromatine-remodelers, DNA-lussen, versterkers, X-inactivatie en imprinting.",
    "en": "The side path ‘How the cell chooses which genes are on’: chromatin remodellers, DNA loops, enhancers, X inactivation and imprinting."
   },
   "method": {
    "nl": "Elke bewering vergeleken met de bron: PubMed-abstracts via E-utilities en volledige teksten via de PMC-BioC-API; PDB-ID via de RCSB-API en ketens nagekeken in het coördinatenbestand.",
    "en": "Every claim compared with its source: PubMed abstracts via E-utilities and full texts via the PMC BioC API; PDB ID via the RCSB API and chains checked in the coordinate file."
   },
   "checked": null,
   "corrections": 8,
   "examples": [
    {
     "nl": "De opdracht noemde ‘≈ 100–200 ingeprente genen’; alleen ‘≈ 100’ is door de bron gedekt (Bartolomei), dus dat getal staat in de app, met de vermelding dat later meer kandidaten gevonden zijn.",
     "en": "The brief mentioned ‘≈ 100–200 imprinted genes’; only ‘≈ 100’ is covered by the source (Bartolomei), so that number is used, noting that more candidates were found later."
    },
    {
     "nl": "Genen die aan X-inactivatie ontsnappen: de opdracht zei ‘15–25 %’; de app zegt ‘ongeveer 15 %’ (plus ≈ 10 % wisselend) volgens Carrel & Willard.",
     "en": "Genes escaping X inactivation: the brief said ‘15–25 %’; the app says ‘about 15 %’ (plus ≈ 10 % variable) according to Carrel & Willard."
    },
    {
     "nl": "Remodeler-mutaties: ‘≈ 20 % van de tumoren’ werd ‘ongeveer één op de vijf’, met in de feiten het exacte getal 19,6 % (Kadoch et al. 2013).",
     "en": "Remodeller mutations: ‘≈ 20 % of tumours’ became ‘about one in five’, with the exact figure of 19.6 % in the facts (Kadoch et al. 2013)."
    }
   ]
  },
  {
   "nr": "10",
   "date": "2026-11-05",
   "scope": {
    "nl": "Het zijpad ‘Hoe een virus zichzelf laat maken’: SARS-CoV-2 (binden, kopiëren, knippen, assembleren), bacteriofagen en CRISPR.",
    "en": "The side path ‘How a virus gets itself made’: SARS-CoV-2 (binding, copying, cutting, assembly), bacteriophages and CRISPR."
   },
   "method": {
    "nl": "Elke bewering vergeleken met de bron: PubMed-abstracts via E-utilities en zes volledige teksten via de PMC-BioC-API; PDB-ID's via de RCSB-API, en contactresiduen en afstanden zelf nagemeten in de coördinaten (bv. de covalente binding van nirmatrelvir aan Cys145 op 1,92 Å in 7RFW).",
    "en": "Every claim compared with its source: PubMed abstracts via E-utilities and six full texts via the PMC BioC API; PDB IDs via the RCSB API, and contact residues and distances measured in the coordinates (e.g. the covalent bond of nirmatrelvir to Cys145 at 1.92 Å in 7RFW)."
   },
   "checked": null,
   "corrections": 13,
   "examples": [
    {
     "nl": "De app zegt niet ‘alleen via een blaasje’: SARS-CoV-2 heeft twee routes naar binnen, via TMPRSS2 aan het celoppervlak of via cathepsine L in het endosoom (Jackson et al. 2022; Hoffmann et al. 2020).",
     "en": "The app does not say ‘only via a vesicle’: SARS-CoV-2 has two entry routes, via TMPRSS2 at the cell surface or via cathepsin L in the endosome (Jackson et al. 2022; Hoffmann et al. 2020)."
    },
    {
     "nl": "‘≈ 30 letters’ voor een CRISPR-spacer werd ‘≈ 30 letters (bij E. coli meestal 32)’ (Brouns et al. 2008).",
     "en": "‘≈ 30 letters’ for a CRISPR spacer became ‘≈ 30 letters (in E. coli usually 32)’ (Brouns et al. 2008)."
    },
    {
     "nl": "De PAM-herkenning werd eerst aan ‘de schaar’ in het algemeen toegeschreven met een uitleg die de bron niet dekt; nu staat er alleen wat de bron zegt: Cas9 knipt alleen als naast de passende letters een kort herkenningsstukje (PAM) ligt (Nishimasu et al. 2014).",
     "en": "PAM recognition was first attributed to ‘the scissors’ in general, with an explanation the source does not cover; now only what the source says remains: Cas9 cuts only if a short recognition piece (PAM) lies next to the matching letters (Nishimasu et al. 2014)."
    }
   ]
  },
  {
   "nr": "11",
   "date": "2026-11-05",
   "scope": {
    "nl": "Het zijpad ‘Het leven van een RNA’: RNA naar een vaste plek sturen, korrels (stressgranules, P-bodies), lange niet-coderende RNA's en riboswitches.",
    "en": "The side path ‘The life of an RNA’: sending RNA to a set place, granules (stress granules, P-bodies), long non-coding RNAs and riboswitches."
   },
   "method": {
    "nl": "Elke bewering vergeleken met de bron: RCSB-API, de statistiekpagina van GENCODE, volledige teksten van twee reviews en abstracts van de overige; basenparen en ligandcontacten zelf nagemeten in PDB 1Y26 met een Python-script.",
    "en": "Every claim compared with its source: RCSB API, the GENCODE statistics page, full texts of two reviews and abstracts of the others; base pairs and ligand contacts measured in PDB 1Y26 with a Python script."
   },
   "checked": null,
   "corrections": 12,
   "examples": [
    {
     "nl": "Aantal lncRNA-genen: een review uit 2023 noemde nog ‘~20 000’; de app gebruikt het actuele getal uit GENCODE release 50 (35 885 lncRNA-genen tegenover 19 442 eiwitgenen) en vermeldt dat het per versie verschuift.",
     "en": "Number of lncRNA genes: a 2023 review still gave ‘~20,000’; the app uses the current figure from GENCODE release 50 (35,885 lncRNA genes versus 19,442 protein-coding genes) and notes that it shifts between releases."
    },
    {
     "nl": "Fasescheiding als oorzaak van RNA-korrels wordt als ‘het huidige model, wordt nog onderzocht’ gebracht, en of zulke druppels de klonters bij ALS veroorzaken als open vraag (Protter & Parker 2016; Li et al. 2013).",
     "en": "Phase separation as the cause of RNA granules is presented as ‘the current model, still under study’, and whether such droplets cause the clumps in ALS as an open question (Protter & Parker 2016; Li et al. 2013)."
    },
    {
     "nl": "Het RNA-adresverhaal werd eerlijk gemaakt: onderzocht in kippen- en muizencellen, niet ‘in menselijke cellen’; ZBP1 is het kippeneiwit, de menselijke tegenhanger heet IGF2BP1 (Núñez et al. 2022).",
     "en": "The RNA address story was made accurate: studied in chicken and mouse cells, not ‘in human cells’; ZBP1 is the chicken protein, the human counterpart is called IGF2BP1 (Núñez et al. 2022)."
    }
   ]
  },
  {
   "nr": "12",
   "date": "2026-11-14",
   "scope": {
    "nl": "Het 70S-ribosoom met EF-Tu in 3D en het zijpad over antibiotica (rifampicine, ribosoomremmers, gyraseremmers, resistentie).",
    "en": "The 70S ribosome with EF-Tu in 3D and the side path on antibiotics (rifampicin, ribosome inhibitors, gyrase inhibitors, resistance)."
   },
   "method": {
    "nl": "Eerst een controle door de bouwer tegen de gelezen bronnen en eigen metingen in de structuurbestanden (5AFI, 5UAC); daarna een onafhankelijke controle door een aparte AI-controleur die de tekst niet schreef: volledige PMC-teksten van zes bronnen gelezen, alle 17 bronvermeldingen (auteurs, jaar, PMID/DOI) en de metingen opnieuw nagekeken.",
    "en": "First a check by the builder against the sources that were read and own measurements in the structure files (5AFI, 5UAC); then an independent check by a separate AI reviewer that did not write the text: full PMC texts of six sources read, all 17 references (authors, year, PMID/DOI) and the measurements checked again."
   },
   "checked": 140,
   "corrections": 19,
   "examples": [
    {
     "nl": "‘Antibiotica tegen de aanmaak van foliumzuur’ stond in geen enkele gelezen bron en werd vervangen door een voorbeeld dat er wel in staat: middelen die het celmembraan aantasten, zoals daptomycine.",
     "en": "‘Antibiotics against folate synthesis’ was not in any source that was read and was replaced by an example that is: drugs that damage the cell membrane, such as daptomycin."
    },
    {
     "nl": "‘Gentamicine en erytromycine binden niet aan ons ribosoom’ was te stellig. Nu: op die plek heeft ons ribosoom een G in plaats van een A, en dat is mede de reden dat ze bij ons niet werken (Lin et al. 2018).",
     "en": "‘Gentamicin and erythromycin do not bind our ribosome’ was too strong. Now: at that spot our ribosome has a G instead of an A, and that is a key reason they do not work in us (Lin et al. 2018)."
    },
    {
     "nl": "Het tweede tRNA in de structuur 5AFI werd eerst zonder plaats getoond. Een eigen meting toont dat het op 3,1 Å van het codon vóór het startcodon ligt: in de E-plaats; zo staat het nu in de figuur.",
     "en": "The second tRNA in structure 5AFI was first shown without a site. Our own measurement shows it lies 3.1 Å from the codon before the start codon: in the E site; the figure now says so."
    }
   ]
  }
 ],
 "rejected": [
  {
   "nl": "Handboek niet leesbaar: NCBI Bookshelf (Alberts) toonde een captcha/reCAPTCHA. In rondes 2 en 4 zijn de hoofdstuknummers daarom via E-utilities (books-database) en Europe PMC opgezocht; in rondes 7 en 8 bleef het handboek enkel als achtergrondbron staan en is elke bewering gedekt door een PMC-, PubMed- of RCSB-bron die wel gelezen is.",
   "en": "Textbook not readable: NCBI Bookshelf (Alberts) showed a captcha/reCAPTCHA. In rounds 2 and 4 the chapter IDs were therefore looked up via E-utilities (books database) and Europe PMC; in rounds 7 and 8 the textbook remained only a background source and every claim is covered by a PMC, PubMed or RCSB source that was actually read."
  },
  {
   "nl": "Beweringen die eerst alleen door een handboek of een niet gelezen volledige tekst gedekt waren (zijpaden 2 tot 5), zijn in een aparte bronnencontrole met een gelezen bron bevestigd of herschreven; wat niet lukte, werd geschrapt (bv. ‘werken in beide oriëntaties’ bij versterkers).",
   "en": "Claims that were at first covered only by a textbook or an unread full text (side paths 2 to 5) were confirmed with a read source or rewritten in a separate source check; what could not be confirmed was removed (e.g. ‘work in both orientations’ for enhancers)."
  },
  {
   "nl": "Bronvermelding NBK20720 kon via E-utilities en Europe PMC niet teruggevonden worden en werd vervangen door het bevestigde NBK579964 (Essentials of Glycobiology, 4e druk).",
   "en": "Source reference NBK20720 could not be found via E-utilities or Europe PMC and was replaced by the confirmed NBK579964 (Essentials of Glycobiology, 4th edition)."
  },
  {
   "nl": "Een bewering die niet in de geciteerde bron stond (‘NMD onderdrukt ≈ 1/3 van de ziekteveroorzakende mRNA's’) werd herschreven op basis van een bron die het wel zegt (Mort et al. 2008).",
   "en": "A claim that was not in the cited source (‘NMD suppresses ≈ 1/3 of disease-causing mRNAs’) was rewritten based on a source that does state it (Mort et al. 2008)."
  },
  {
   "nl": "Bronnen met een verkeerde of verzonnen beschrijving zijn gecorrigeerd na opvraging van de echte gegevens: een verzonnen ondertitel bij een exportreview, verkeerde eerste auteurs (‘Pelletier’ → Gilles; ‘Berkowitz’ → Fisch; ‘Lim’ → Schiller) en een onvolledige auteurslijst (‘Mirkin’ → Hisey, Masnovo & Mirkin).",
   "en": "Sources with a wrong or made-up description were corrected after retrieving the real records: a made-up subtitle on an export review, wrong first authors (‘Pelletier’ → Gilles; ‘Berkowitz’ → Fisch; ‘Lim’ → Schiller) and an incomplete author list (‘Mirkin’ → Hisey, Masnovo & Mirkin)."
  },
  {
   "nl": "Getallen zonder gelezen bron geschrapt of vervangen: ‘TFIIH heeft tien subeenheden’, resectielengte ‘honderden tot duizenden nt’, ‘een op de vier genen …’, ‘ruim honderd letters’ voor een riboswitch, ‘≈ 15–30 aminozuren’ voor het ER-label (vervangen door het nagekeken voorbeeld van albumine: 18) en ‘30 nm’ voor het proteasoom (vervangen door gemeten ≈ 45 nm met bron).",
   "en": "Numbers without a read source removed or replaced: ‘TFIIH has ten subunits’, resection length ‘hundreds to thousands of nt’, ‘one in four genes …’, ‘more than a hundred letters’ for a riboswitch, ‘≈ 15–30 amino acids’ for the ER tag (replaced by the checked albumin example: 18) and ‘30 nm’ for the proteasome (replaced by a measured ≈ 45 nm with a source)."
  },
  {
   "nl": "Geen burst size bij bacteriofagen: de gelezen bronnen geven geen eenduidig aantal nieuwe fagen per cel, dus zegt de app ‘veel meer nieuwe fagen dan getekend’ in plaats van ‘tientallen tot honderden’.",
   "en": "No burst size for bacteriophages: the sources read give no single number of new phages per cell, so the app says ‘many more new phages than drawn’ instead of ‘tens to hundreds’."
  },
  {
   "nl": "Ordegroottes van tijd en grootte zonder bron (bv. ‘een fractie van een seconde’, ‘minuten tot uren per letsel’, ‘ongeveer een minuut per eiwit’, reistijd van RNA ‘minuten tot uren’, geschatte schalen in nm of µm) werden vervangen door ‘vertraagd getoond (schematisch)’ of door een maat die zelf in de 3D-structuur gemeten is.",
   "en": "Orders of magnitude for time and size without a source (e.g. ‘a fraction of a second’, ‘minutes to hours per lesion’, ‘about a minute per protein’, RNA travel time ‘minutes to hours’, estimated scales in nm or µm) were replaced by ‘shown slowed down (schematic)’ or by a size measured in the 3D structure itself."
  },
  {
   "nl": "Uitspraken die in de literatuur wel voorkomen maar niet in de gelezen tekst stonden, zijn toch weggelaten: ‘vaak doordat eIF2α gefosforyleerd wordt’ (stressgranules), ‘PARP-remmers’, een zin over bortezomib, ‘lapjeskatten zijn bijna altijd vrouwtjes’, ‘draagsters van X-gebonden ziekten hebben mildere verschijnselen’ en het mechanisme ‘het zuur laat de receptor los’.",
   "en": "Statements that do appear in the literature but were not in the text actually read were still left out: ‘often because eIF2α is phosphorylated’ (stress granules), ‘PARP inhibitors’, a sentence on bortezomib, ‘tortoiseshell cats are almost always female’, ‘carriers of X-linked diseases have milder symptoms’ and the mechanism ‘the acid releases the receptor’."
  },
  {
   "nl": "Getallen uit de opdracht van de bouwer werden niet overgenomen als de bron iets anders zegt: ‘> 50 % van de tumoren’ (TP53), ‘3–15 aminozuren’ (proteasoom), ‘15–25 %’ (X-inactivatie), ‘≈ 100–200’ ingeprente genen.",
   "en": "Numbers from the builder's brief were not adopted when the source says otherwise: ‘> 50 % of tumours’ (TP53), ‘3–15 amino acids’ (proteasome), ‘15–25 %’ (X inactivation), ‘≈ 100–200’ imprinted genes."
  },
  {
   "nl": "Een cijfer uit een andere context werd niet als vaccincijfer gebracht: de 1–2 % endosomale ontsnapping komt uit metingen met siRNA-nanopartikels (Gilleron et al. 2013) en staat daarom als ordegrootte.",
   "en": "A figure from another context was not presented as a vaccine figure: the 1–2 % endosomal escape comes from measurements with siRNA nanoparticles (Gilleron et al. 2013) and is therefore given as an order of magnitude."
  },
  {
   "nl": "Een veelgemaakte fout in secundaire bronnen werd vermeden: ‘2 000–5 000 kernporiën’ geldt per kern, niet per µm²; de app noemt ‘duizenden, afhankelijk van het celtype (HeLa ~3 000)’.",
   "en": "A common error in secondary sources was avoided: ‘2,000–5,000 nuclear pores’ applies per nucleus, not per µm²; the app says ‘thousands, depending on cell type (HeLa ~3,000)’."
  },
  {
   "nl": "Een verouderd getal uit een review (Mattick 2023: ~20 000 lncRNA-loci) werd vervangen door de actuele databank (GENCODE release 50).",
   "en": "An outdated figure from a review (Mattick 2023: ~20,000 lncRNA loci) was replaced by the current database (GENCODE release 50)."
  },
  {
   "nl": "Te sterke formuleringen werden afgezwakt tot wat de bron toelaat: ‘in de PDB bestaat geen 3D-structuur van het T-DNA zelf’ (zelf nagezocht) in plaats van ‘nooit gemeten’; bij de mens ‘nog geen riboswitch gevonden’ in plaats van ‘bestaan niet’; ‘wellicht’ bij het verlaten van de cel via lysosomen (alleen in gekweekte cellen aangetoond).",
   "en": "Overly strong wording was toned down to what the source allows: ‘no 3D structure of the T-DNA itself exists in the PDB’ (searched ourselves) instead of ‘never measured’; in humans ‘no riboswitch found yet’ instead of ‘do not exist’; ‘possibly’ for leaving the cell via lysosomes (shown only in cultured cells)."
  },
  {
   "nl": "Een PDB-code die niet paste werd niet gebruikt: 193D (intercalator) stond als G-quadruplex. Ook 3D-kandidaten vielen af als ze niet toonden wat de tekst beweert (6WG3 en 6YUF bevatten geen CTCF) of niet uit de geciteerde publicatie kwamen (7SI9 en 7VH8 ten voordele van 7RFW).",
   "en": "A PDB code that did not fit was not used: 193D (an intercalator) was listed as a G-quadruplex. 3D candidates were also dropped if they did not show what the text claims (6WG3 and 6YUF contain no CTCF) or did not come from the cited publication (7SI9 and 7VH8 in favour of 7RFW)."
  }
 ],
 "principles": [
  {
   "nl": "Elke zichtbare bewering (ondertitel, label, uitleg, getal, schaal, duur) wordt vergeleken met de bron die in de app bij dat onderdeel staat, en die bron wordt echt opgehaald en gelezen.",
   "en": "Every visible claim (caption, label, explanation, number, scale, duration) is compared with the source listed for that item in the app, and that source is actually retrieved and read."
  },
  {
   "nl": "Bronnen worden via officiële databanken opgehaald: PubMed-abstracts via NCBI E-utilities, volledige teksten via PubMed Central (ook de PMC-BioC-API), metadata via Europe PMC.",
   "en": "Sources are retrieved through official databases: PubMed abstracts via NCBI E-utilities, full texts via PubMed Central (including the PMC BioC API), metadata via Europe PMC."
  },
  {
   "nl": "Van elke bron worden auteurs, titel, tijdschrift, volume en pagina's nagekeken tegen de databank, en elke bron-URL wordt opgeroepen; een link die een script weigert (HTTP 403) wordt onderscheiden van een dode link.",
   "en": "For every source, authors, title, journal, volume and pages are checked against the database, and every source URL is opened; a link that refuses a script (HTTP 403) is distinguished from a dead link."
  },
  {
   "nl": "Alle 66 DOI's in de app zijn via Crossref nagekeken: ze bestaan en horen bij de vermelde publicatie.",
   "en": "All 66 DOIs in the app were checked via Crossref: they exist and belong to the publication cited."
  },
  {
   "nl": "Elke PDB-ID wordt via de RCSB-API gecontroleerd (titel, meetmethode, resolutie, organisme per keten, primaire publicatie), en ketens, residuen en afstanden worden zelf nagemeten in het coördinatenbestand.",
   "en": "Every PDB ID is checked via the RCSB API (title, method, resolution, organism per chain, primary publication), and chains, residues and distances are measured directly in the coordinate file."
  },
  {
   "nl": "Residunummers en eiwitlengtes komen rechtstreeks uit UniProt; genposities uit de NCBI-featuretabel; genaantallen uit de actuele databank (GENCODE).",
   "en": "Residue numbers and protein lengths come directly from UniProt; gene positions from the NCBI feature table; gene counts from the current database (GENCODE)."
  },
  {
   "nl": "De app gaat uit van een menselijke cel: menselijke structuren krijgen voorrang, en waar een structuur of proef van een ander organisme komt, wordt dat vermeld (bv. muis/rat bij 1KDX, kip en muis bij RNA-transport).",
   "en": "The app is based on a human cell: human structures get priority, and where a structure or experiment comes from another organism, this is stated (e.g. mouse/rat for 1KDX, chicken and mouse for RNA transport)."
  },
  {
   "nl": "Geen getal of uitspraak zonder gelezen bron: wat geen bron heeft, wordt geschrapt, als ‘schematisch’ getoond of vervangen door een zelf gemeten waarde.",
   "en": "No number or statement without a read source: anything without a source is removed, shown as ‘schematic’ or replaced by a value measured directly."
  },
  {
   "nl": "Onzekerheid wordt als onzeker geformuleerd (‘het huidige model’, ‘wordt nog onderzocht’, ‘wellicht’, ‘nog geen gevonden’), en afgeronde of veranderlijke getallen worden als bereik of ordegrootte gebracht.",
   "en": "Uncertainty is phrased as uncertain (‘the current model’, ‘still being studied’, ‘possibly’, ‘none found yet’), and rounded or variable numbers are given as a range or order of magnitude."
  },
  {
   "nl": "Vereenvoudigen mag, zolang de zin waar blijft: weglaten van detail is toegestaan, maar weggevallen voorbehouden, oververalgemeningen en verkeerde oorzaak-gevolg worden gecorrigeerd.",
   "en": "Simplifying is allowed as long as the sentence stays true: leaving out detail is fine, but dropped qualifications, overgeneralisations and wrong cause-and-effect are corrected."
  },
  {
   "nl": "Na elke herschrijving (inkorten, eenvoudige taal) volgt een nieuwe ronde die elke nieuwe zin naast de eerder nagekeken versie legt.",
   "en": "Every rewrite (shortening, plain language) is followed by a new round that compares each new sentence with the previously checked version."
  },
  {
   "nl": "Nederlands en Engels worden naast elkaar gelegd en moeten inhoudelijk hetzelfde zeggen.",
   "en": "Dutch and English are compared side by side and must say the same thing."
  },
  {
   "nl": "Onafhankelijke controle: in ronde 6 controleerde een aparte AI-controleur, niet de bouwer, alle beweringen en daarna opnieuw of de correcties juist en in beide talen verwerkt waren (23 van 23 bevestigd).",
   "en": "Independent review: in round 6 a separate AI reviewer, not the builder, checked all claims and then checked again that the corrections were applied correctly and in both languages (23 of 23 confirmed)."
  },
  {
   "nl": "Wat in een vorige ronde met bron beslist is, wordt niet opnieuw uitgezocht, maar wel nagekeken of de huidige tekst er nog mee overeenkomt.",
   "en": "What was settled with a source in an earlier round is not researched again, but it is checked whether the current text still matches it."
  },
  {
   "nl": "Open punten die niet zelf beslist konden worden, worden in het verslag apart vermeld in plaats van stilzwijgend aangepast.",
   "en": "Open points that could not be decided by the reviewer are listed separately in the report instead of being changed silently."
  },
  {
   "nl": "Een controle door de bouwer zelf volstaat niet: nieuwe onderdelen krijgen daarna een onafhankelijke controle die het bouwverslag pas na de eigen controle leest.",
   "en": "A check by the builder alone is not enough: new parts then get an independent check that reads the build report only after its own check."
  }
 ],
 "totals": {
  "rounds": 12,
  "corrections": 216,
  "dois_checked": 66,
  "pdb_checked": 37
 }
};
