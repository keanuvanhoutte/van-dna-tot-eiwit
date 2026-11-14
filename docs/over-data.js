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
  },
  {
   "nr": "13",
   "date": "2026-11-14",
   "scope": {
    "nl": "Onafhankelijke diepe controle van de hele app: alle verhalen en zijpaden, alle uitlegpanelen, de woordenlijst, de startpagina, deze pagina en de volledige 3D-bibliotheek.",
    "en": "Independent in-depth check of the whole app: all stories and side paths, all explanation panels, the glossary, the home page, this page and the complete 3D library."
   },
   "method": {
    "nl": "Twaalf afzonderlijke controleurs, die de teksten niet zelf schreven, legden elk een afgebakend deel zin per zin (NL en EN) opnieuw tegen de bronnen. Ze lazen samenvattingen via PubMed en volledige teksten via PubMed Central en Europe PMC, controleerden elke bronvermelding via Crossref, elke PDB-code via de RCSB-databank, en maten afstanden en residuen zelf na in de structuurbestanden. Ze lazen de eerdere verslagen pas na hun eigen controle. Wat niet in een gelezen bron stond, werd herschreven of geschrapt.",
    "en": "Twelve separate reviewers, who did not write the texts, each re-checked a defined part sentence by sentence (Dutch and English) against the sources. They read abstracts via PubMed and full texts via PubMed Central and Europe PMC, checked every reference via Crossref and every PDB code via the RCSB database, and measured distances and residues themselves in the structure files. They read the earlier reports only after their own check. What was not in a source that was read was rewritten or removed."
   },
   "checked": null,
   "corrections": null,
   "examples": []
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
  },
  {
   "nl": "De uitspraak 'zo komt HIV-1 binnen' bij het versmelten met het celmembraan is verzacht tot 'zo kan HIV-1 binnenkomen': binnenkomst via een blaasje is voor HIV-1 ook beschreven, dus de stellige vorm was niet gedekt.",
   "en": "The statement 'this is how HIV-1 gets in' about fusing with the cell membrane was softened to 'this is one way HIV-1 can get in': entry through a vesicle has also been described for HIV-1, so the definite wording was not covered."
  },
  {
   "nl": "De zin dat coronavirussen de cel via lysosomen verlaten, is als vaststaand feit verworpen: dat werk (Ghosh, 2020) is in gekweekte cellen gedaan. De stap zegt dat er nu bij.",
   "en": "The sentence that coronaviruses leave the cell via lysosomes was rejected as settled fact: that work (Ghosh, 2020) was done in cultured cells. The step now says so."
  },
  {
   "nl": "'Alle uridines vervangen door m1Psi' gold als algemene regel voor mRNA-vaccins. Dat klopt voor de covidvaccins, niet voor elk mRNA-vaccin; de regel is nu tot de covidvaccins beperkt.",
   "en": "'Every uridine replaced by m1Psi' stood as a general rule for mRNA vaccines. That holds for the COVID vaccines, not for every mRNA vaccine; the statement is now limited to the COVID vaccines."
  },
  {
   "nl": "'De toppen staan afwisselend omhoog of omlaag' suggereerde een vaste beurtrol bij het coronavirus-uitsteeksel. De stand wisselt toevallig, dus de formulering is aangepast.",
   "en": "'The tips are alternately up or down' suggested a fixed turn-taking for the coronavirus spike. The position changes at random, so the wording was adjusted."
  },
  {
   "nl": "Het handboek van Alberts en de Endotext-pagina waren niet leesbaar door een captcha en tellen niet als bewijs. Wat eerst alleen daarop steunde, kreeg een gelezen bron of werd herschreven. Een voorbeeld: de membraandikte ging van ≈ 5 naar ≈ 4 nm, naar de meting van Mitra et al. (2004).",
   "en": "The Alberts textbook and the Endotext page could not be read (captcha), so they do not count as evidence. Everything that rested only on them now has a source we read or was rewritten, e.g. the membrane thickness went from ≈ 5 to ≈ 4 nm after the measurement of Mitra et al. (2004)."
  },
  {
   "nl": "Een enhancer werd voorgesteld als 'tot 1 miljoen basenparen' van zijn gen. Dat maximum werd verworpen: de bron (Lettice et al., 2003) geeft 1 miljoen als voorbeeld van de ZRS, niet als grens.",
   "en": "Describing an enhancer as lying 'up to 1 million base pairs' from its gene was rejected: the source (Lettice et al., 2003) gives 1 million as an example (the ZRS), not as a limit."
  },
  {
   "nl": "Het klassieke beeld 'cortisol bindt en de helper-eiwitten laten meteen los' is niet de enige versie. Davies et al. (2002) tonen dat Hsp90 kan meegaan tot in de kern. Daarom staat er nu een korte nuancering bij.",
   "en": "The classic picture 'cortisol binds and the helper proteins let go at once' is not the only version: Davies et al. (2002) show that Hsp90 can travel along into the nucleus, so a short caveat was added."
  },
  {
   "nl": "'Peptiden en adrenaline kunnen niet door het membraan' was te absoluut. De gelezen bronnen spreken van een slechte doorlaatbaarheid, dus nu staat er 'nauwelijks'.",
   "en": "'Peptides and adrenaline cannot cross the membrane' was too absolute: the sources we read speak of poor permeability, so the text now says 'can hardly'."
  },
  {
   "nl": "Een eerdere ronde noemde '70–80 % van de CpG's gemethyleerd' bevestigd via een bron die niet in de app staat en die we niet konden lezen. We schreven het om naar wat een gelezen review zegt: de meeste CpG's, behalve in CpG-eilanden.",
   "en": "An earlier round called '70–80% of CpGs methylated' confirmed through a source that is not in the app and that we could not read. We rewrote it to what a review we did read says: most CpGs, except in CpG islands."
  },
  {
   "nl": "Volgens een eerdere ronde stond 'Hoogsteen-paar: C1′–C1′ ≈ 8,5 Å' in Nikolova et al. 2011. In de volledige tekst staat dat getal niet. Het is daarom geschrapt.",
   "en": "An earlier round said 'Hoogsteen pair: C1′–C1′ ≈ 8.5 Å' came from Nikolova et al. 2011. The number is not in the full text, so it was removed."
  },
  {
   "nl": "De waarden σ ≈ −0,06 en '−1 per nucleosoom' hadden geen gelezen bron. Een recente review geeft −0,05 als fysiologische waarde. Die staat er nu, en het tweede getal is geschrapt.",
   "en": "σ ≈ −0.06 and '−1 per nucleosome' had no source we could read. A recent review gives −0.05 as the physiological value; that is used now and the second number was removed."
  },
  {
   "nl": "De voorbeelden BRD4 en TAF3 als 'lezers' en Mediator bij enhancerlussen stonden niet in de gelezen bronnen. Ze zijn geschrapt; de voorbeelden die de bronnen wel noemen, bleven staan.",
   "en": "BRD4 and TAF3 as example 'readers', and Mediator in enhancer loops, were not in the sources we read; they were removed and the sourced examples kept."
  },
  {
   "nl": "Een eerdere ronde koppelde 'NHEJ : HR ≈ 4 : 1 in S/G2' aan Mao et al. (2008), maar Mao meet 3 : 1 in delende cellen in het algemeen. De uitspraak blijft staan omdat ze letterlijk in Chang et al. (2017) staat.",
   "en": "An earlier round linked 'NHEJ : HR ≈ 4 : 1 in S/G2' to Mao et al. (2008), but Mao measures 3 : 1 in dividing cells in general. The statement stays because it appears verbatim in Chang et al. (2017)."
  },
  {
   "nl": "Uitspraken die geen gelezen bron hadden, zijn herschreven of geschrapt: 'RPA bindt in milliseconden', 'telomerase werkt in seconden tot minuten', de lengte van de telomeer-overhang, 'T-lus: kilobasen' en 'origins 30–300 kb uit elkaar'.",
   "en": "Statements without a source we had read were rewritten or removed: 'RPA binds within milliseconds', 'telomerase works in seconds to minutes', the length of the telomere overhang, 't-loop: kilobases' and 'origins 30–300 kb apart'."
  },
  {
   "nl": "'NER is het enige herstel voor UV-schade bij de mens' werd verworpen: Schärer (2013) noemt NER de belangrijkste route, en Chatterjee & Walker (2017) noemen ook andere manieren om met UV-schade om te gaan. Nu staat er dat NER de belangrijkste route is, omdat de mens geen fotolyase heeft.",
   "en": "'NER is the only repair for UV damage in humans' was rejected: Schärer (2013) calls NER the main pathway, and Chatterjee & Walker (2017) also list other ways of dealing with UV damage. It now says NER is the main route, because humans lack photolyase."
  },
  {
   "nl": "Het verwijzingslabel 'Virussen gebruiken breukherstel' werd verworpen: bij hiv-integratie knipt het virale enzym zelf, en de cel vult daarna alleen kleine gaatjes op.",
   "en": "The link label 'Viruses use break repair' was rejected: in HIV integration the viral enzyme does the cutting itself, and the cell then only fills in small gaps."
  },
  {
   "nl": "Het getal 80° voor de knik door TBP staat niet in het abstract van Kim et al. 1993; we gebruiken daarvoor Wu et al. 2001, die zegt dat het om kristalstructuren gaat.",
   "en": "The 80° bend by TBP is not in the abstract of Kim et al. 1993; we now cite Wu et al. 2001 for it, which says it applies to crystal structures."
  },
  {
   "nl": "Dat mitochondriaal RNA-polymerase uit één subeenheid bestaat en dat planten Pol IV en Pol V hebben, stond in geen gelezen bron; die zinnen zijn verzacht of geschrapt.",
   "en": "That mitochondrial RNA polymerase is a single subunit and that plants have Pol IV and Pol V was not in any source we read; those sentences were softened or removed."
  },
  {
   "nl": "'Bij deze riboswitch helpt het ribosoom zelf mee' had geen bron; het werd vervangen door wat Blechar et al. 2024 echt aantonen: een ribosoomeiwit (S1) helpt het RNA open te vouwen.",
   "en": "'For this riboswitch the ribosome itself helps' had no source; it was replaced by what Blechar et al. 2024 actually show: a ribosomal protein (S1) helps unfold the RNA."
  },
  {
   "nl": "Alberts, Molecular Biology of the Cell (NCBI Bookshelf) kon niet gelezen worden (captcha); uitspraken die enkel daarop steunden, zijn opnieuw gestaafd met gelezen artikels.",
   "en": "Alberts, Molecular Biology of the Cell (NCBI Bookshelf) could not be read (captcha); claims that relied only on it were re-sourced with articles we did read."
  },
  {
   "nl": "Eerdere rondes keurden 'tRNA^Phe = eerste RNA-kristalstructuur' goed zonder gelezen bron; de bron over 1EHZ zegt alleen 'klassieke structuur'. Het woord 'eerste' is verwijderd.",
   "en": "Earlier rounds accepted 'tRNA^Phe = first RNA crystal structure' without a source we could read; the source on 1EHZ only says 'classic structure'. The word 'first' was removed."
  },
  {
   "nl": "De bron Chester et al. 2004 (APOBEC1) dekt de details over C6666, codon 2153 en de mooring-sequentie niet; die zijn nu gestaafd met Wang & Cheng 2024 en UniProt P04114.",
   "en": "The source Chester et al. 2004 (APOBEC1) does not cover C6666, codon 2153 or the mooring sequence; these are now backed by Wang & Cheng 2024 and UniProt P04114."
  },
  {
   "nl": "'Een mRNP draagt meerdere kopieën van NXF1' en 'IRE1 knipt mRNA' stonden in geen gelezen bron en zijn geschrapt.",
   "en": "'An mRNP carries several copies of NXF1' and 'IRE1 cuts mRNA' were not in any source we read and were removed."
  },
  {
   "nl": "Henras e.a. (2015) werd niet aanvaard als bron voor 'meer dan 200 assemblagefactoren': het getal 200 in dat artikel gaat over snoRNP's. Vervangen door Tafforeau e.a. (2013, 286 factoren).",
   "en": "Henras et al. (2015) was not accepted as the source for 'more than 200 assembly factors': the number 200 in that article refers to snoRNPs. Replaced by Tafforeau et al. (2013, 286 factors)."
  },
  {
   "nl": "'Twee families van synthetasen, apart ontstaan' werd verworpen: de gelezen review bespreekt juist de hypothese dat beide uit één gen komen.",
   "en": "'Two families of synthetases that arose separately' was rejected: the review we read discusses the hypothesis that both come from a single gene."
  },
  {
   "nl": "Tijdschalen zonder gelezen bron ('milliseconden per lading', 'minuten tot een uur per ribosoom') en 'selenol is reactiever' werden geschrapt of herschreven.",
   "en": "Time scales without a source we read ('milliseconds per charging event', 'minutes to an hour per ribosome') and 'the selenol is more reactive' were removed or rewritten."
  },
  {
   "nl": "Het NCBI-boek (Alberts) gaf een captcha; elke uitspraak die erop steunde kreeg een gelezen open bron (o.a. Mohanty 2020 voor de suikerketen in het ER).",
   "en": "The NCBI Bookshelf (Alberts) returned a captcha; every statement that relied on it got an open source we read (e.g. Mohanty 2020 for the sugar chain in the ER)."
  },
  {
   "nl": "De originele artikels van Chapeville (1962, enkel een scan) en Crick (1966, niet vrij toegankelijk) werden uit de bronnenlijst gehaald; de uitspraken steunen nu op gelezen reviews (Shandell 2021, Agris 2018, Lei & Burton 2022).",
   "en": "The original papers by Chapeville (1962, scan only) and Crick (1966, not freely available) were removed from the source list; the statements now rest on reviews we read (Shandell 2021, Agris 2018, Lei & Burton 2022)."
  },
  {
   "nl": "De wobble-regel 'A paart alleen met U' werd verworpen: een gelezen review beschrijft een tRNA met A op die plaats dat ook C leest. Nu staat er dat A daar zeldzaam is en meestal tot inosine wordt omgezet.",
   "en": "The wobble rule 'A pairs only with U' was rejected: a review we read describes a tRNA with A at that position that also reads C. It now says A is rare there and is usually converted to inosine."
  },
  {
   "nl": "Vorige rondes keurden lusgroottes (haarspeld minstens 4–5, omega-lus 6–16, random coil > 16), 4,4 residuen per π-winding en β-strengen van 5–8 residuen goed op basis van de cursus. Dat is geen publieke bron en we vonden deze getallen niet in gelezen literatuur. Ze zijn herschreven of vervangen door eigen metingen.",
   "en": "Earlier rounds approved loop sizes (hairpin at least 4–5, omega loop 6–16, random coil > 16), 4.4 residues per π turn and β-strands of 5–8 residues on the basis of the course. That is not a public source, and we did not find these numbers in literature we read. They were rewritten or replaced by our own measurements."
  },
  {
   "nl": "Lovell e.a. (2003) stond als bron voor '> 98 % in de voorkeursgebieden', maar de samenvatting noemt dat getal niet. Chen e.a. (2010, MolProbity) zegt het wel en is als bron toegevoegd.",
   "en": "Lovell et al. (2003) was cited for '> 98 % in the favoured regions', but its abstract does not give that number. Chen et al. (2010, MolProbity) does and was added as a source."
  },
  {
   "nl": "'Dubbele C=N-binding ≈ 1,27 Å' en 'His63 stabiliseert O₂' stonden in geen enkele gelezen bron. Het eerste is vervangen door gemeten bindingslengtes, het tweede door wat de structuur toont (His63 ligt aan de kant waar O₂ bindt).",
   "en": "'C=N double bond ≈ 1.27 Å' and 'His63 stabilises O₂' were not in any source we read. The first was replaced by measured bond lengths, the second by what the structure shows (His63 sits on the side where O₂ binds)."
  },
  {
   "nl": "Vier basisfeiten (Arg is positief, de codes U en O, His is aromatisch, wat een domein is) steunden enkel op handboeken die we deze ronde niet konden openen. We lieten ze niet zomaar staan: elk kreeg een gelezen open bron (Fitch 2015, UniProt-help, Liao 2013, Jakubec 2018). De domeindefinitie werd voorzichtiger: een domein vouwt 'meestal' zelfstandig.",
   "en": "Four basic facts (Arg is positive, the codes U and O, His is aromatic, what a domain is) rested only on textbooks we could not open this round. We did not simply leave them: each got a read open source (Fitch 2015, UniProt help, Liao 2013, Jakubec 2018). The domain definition was made more careful: a domain 'usually' folds on its own."
  },
  {
   "nl": "'Tetra-ubiquitine is het minimale afbraaksignaal' niet langer als harde regel gebruikt: nieuwere metingen tonen dat meerdere korte ketens even goed of beter werken (Lu 2015; Swatek & Komander 2016).",
   "en": "'Tetra-ubiquitin is the minimal degradation signal' is no longer used as a strict rule: newer measurements show that several short chains work as well or better (Lu 2015; Swatek & Komander 2016)."
  },
  {
   "nl": "Een review als bron voor '300–400 g/L in het menselijk cytosol' verworpen: het getal komt uit metingen in E. coli.",
   "en": "A review as the source for '300–400 g/L in the human cytosol' was rejected: the value comes from measurements in E. coli."
  },
  {
   "nl": "Uitspraken zonder gelezen bron geschrapt of herschreven: 'fibril tot µm lang', 'monomeer ≈ 3 nm', 'ongeordende stukken rijk aan Pro, Gly en Ser', 'Hsp70 werkt in seconden' (de bron zegt minuten of langer).",
   "en": "Statements without a source we could read were removed or rewritten: 'fibril up to µm long', 'monomer ≈ 3 nm', 'disordered regions rich in Pro, Gly and Ser', 'Hsp70 works in seconds' (the source says minutes or longer)."
  },
  {
   "nl": "Het getal '1 op 50 000 geboorten' werd voorgesteld als frequentie van het Zellweger-spectrum; de bron (Braverman et al. 2016) geeft het voor alle peroxisoom-bouwziekten samen. Het label is aangepast.",
   "en": "The figure '1 in 50,000 births' was presented as the frequency of the Zellweger spectrum; the source (Braverman et al. 2016) gives it for all peroxisome biogenesis disorders together. The label was adjusted."
  },
  {
   "nl": "'Met hulp van tientallen eiwitten' (autofagie) stond in geen enkele gelezen bron als aantal; vervangen door 'veel eiwitten'.",
   "en": "'With the help of dozens of proteins' (autophagy) appeared as a number in none of the sources read; replaced by 'many proteins'."
  },
  {
   "nl": "De schaal 'kanaal ≈ 8 nm' klopte niet met een eigen meting in 8DNV: in het membraanvlak is het kanaal ongeveer 6 à 7 nm breed (8 nm is de hoogte). Nu '≈ 7 nm breed'.",
   "en": "The scale 'channel ≈ 8 nm' did not match our own measurement in 8DNV: in the plane of the membrane the channel is about 6–7 nm wide (8 nm is its height). Now '≈ 7 nm wide'."
  },
  {
   "nl": "'Een kernlabel mag overal in het eiwit liggen' was te stellig; de bron (Lu et al. 2021) zegt 'bijna overal'.",
   "en": "'A nuclear label can lie anywhere in the protein' was too absolute; the source (Lu et al. 2021) says 'almost anywhere'."
  },
  {
   "nl": "De uitspraak dat de kleine groef van RNA–DNA-hybriden smaller is dan in RNA werd geschrapt: het bijbehorende artikel (Xiong & Sundaralingam 2000) vond in dit kristal net een brede groef.",
   "en": "The claim that the minor groove of RNA–DNA hybrids is narrower than in RNA was removed: the matching paper (Xiong & Sundaralingam 2000) found a wide groove in this very crystal."
  },
  {
   "nl": "'G·U is het meest voorkomende afwijkende paar' werd niet gevonden in de gelezen overzichtsbron (Varani & McClain 2000); vervangen door wat die bron wel zegt: het komt in bijna elke soort RNA voor.",
   "en": "'G·U is the most common unusual pair' was not found in the review we read (Varani & McClain 2000); replaced by what that source does say: it occurs in nearly every kind of RNA."
  },
  {
   "nl": "Het overzicht van Ghosh & Bansal (2003) over DNA-vormen kon niet gelezen worden (geen toegang); de helixwaarden van A-, B- en Z-DNA werden daarom zelf gemeten in de structuurbestanden.",
   "en": "The review by Ghosh & Bansal (2003) on DNA forms could not be read (no access); the helix values of A-, B- and Z-DNA were therefore measured directly in the structure files."
  },
  {
   "nl": "'Ti-plasmide ~200 kb' en 'GENCODE ~20 000 lncRNA-genen' kwamen niet overeen met de gelezen bronnen (Gelvin 2003: 200–800 kb; Statello 2021: meer dan 16 000) en zijn aangepast.",
   "en": "'Ti plasmid ~200 kb' and 'GENCODE ~20,000 lncRNA genes' did not match the sources read (Gelvin 2003: 200–800 kb; Statello 2021: more than 16,000) and were corrected."
  },
  {
   "nl": "Enkele handboekuitspraken zonder leesbare bron werden geschrapt in plaats van behouden: nucleosomen 'om de ~200 bp', snRNA-lengtes, daunorubicine 'tegen leukemie' en de EJC-vermelding in de schema's. De oude vertakkingsconsensus YNYURAY werd vervangen door de gemeten menselijke consensus yUnAy (Gao et al. 2008).",
   "en": "Some textbook claims without a readable source were removed rather than kept: nucleosomes 'every ~200 bp', snRNA lengths, daunorubicin 'against leukaemia' and the EJC mention in the diagrams. The old branch-point consensus YNYURAY was replaced by the measured human consensus yUnAy (Gao et al. 2008)."
  },
  {
   "nl": "De uitspraak 'alle 66 DOI's in de app zijn nagekeken' werd niet overgenomen, omdat er na die controle bronnen bijkwamen. Alle 68 DOI's zijn opnieuw via Crossref opgevraagd; één bronlabel had een verkeerd jaartal (PNAS 2023 in plaats van 2024).",
   "en": "The statement 'all 66 DOIs in the app were checked' was not kept, because sources were added after that check. All 68 DOIs were looked up again via Crossref; one source label had the wrong year (PNAS 2023 instead of 2024)."
  },
  {
   "nl": "Een teller '125/125 onderwerpen met bronnen' werd niet echt geteld maar stond vast in de code. Hij telt nu echt hoeveel onderwerpen bronnen hebben.",
   "en": "A counter '125/125 topics with sources' was not actually counted but fixed in the code. It now really counts how many topics have sources."
  },
  {
   "nl": "'Dat doet p53' (p53 beslist of de cel herstelt of stopt) werd afgewezen als te stellig: p53 speelt een sleutelrol, maar beslist niet alleen.",
   "en": "'That is p53' (p53 decides whether the cell repairs or stops) was rejected as too strong: p53 plays a key role but does not decide alone."
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
   "nl": "De DOI's in de bronvermeldingen zijn via Crossref nagekeken: 66 op 13-11-2026 en opnieuw alle 68 op 14-11-2026. Ze bestaan en horen bij de vermelde publicatie.",
   "en": "The DOIs in the source references were checked via Crossref: 66 on 13-11-2026 and all 68 again on 14-11-2026. They exist and belong to the publication cited."
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
   "nl": "Een controle door de bouwer zelf volstaat niet: sinds ronde 12 krijgen nieuwe onderdelen daarna ook een onafhankelijke controle die het bouwverslag pas na de eigen controle leest.",
   "en": "A check by the builder alone is not enough: since round 12, new parts then also get an independent check that reads the build report only after its own check."
  }
 ],
 "totals": {
  "rounds": 12,
  "corrections": 235,
  "dois_checked": 68,
  "pdb_checked": 37
 }
};
