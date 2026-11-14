# Verificatieronde 12 — 70S-ribosoom met EF-Tu (3D) en zijpad "Hoe antibiotica bacteriën stilleggen" (14-11-2026)

Nagekeken: de zes nieuwe knopen `beftu`, `antibiotica`, `rifampicine`, `ribosoomremmers`, `gyraseremmers` en `resistentie` (stage `bact`) — shared/graph.js, shared/graph.en.js, shared/details/bact3.js, scènes in app/scenes/bact/ — plus de overgangszinnen van de verhaallijnen `bacterie` (bribosoom → beftu → codon) en `antibiotica` (app/story.js), de zijpadkaart op de startpagina en de nieuwe klikplek in `bribosoom`.
Methode: elke bewering in kort/what/how/facts/why, stapteksten, labels in de figuren, schaal/duur en `simplified` vergeleken met de bron in `sources`. Opgehaald op 14-11-2026: RCSB REST-API (entry + polymer_entity + nonpolymer_entity), UniProt REST, PubMed-abstracts (E-utilities) en de volledige teksten uit PubMed Central van Kohanski 2010, Schmeing 2009, Molodtsov 2017, Aldred 2014, Lin 2018 en Munita & Arias 2016. Structuurgegevens zelf nagemeten in de mmCIF-bestanden (Python: afstanden tussen atomen).
✅ = bevestigd met de genoemde (gelezen) bron · 🔧 = aangepast tegenover de eerste versie. Er blijven geen onbevestigde uitspraken over.

## PDB-structuren

| ID | RCSB-titel | Methode | Inhoud (auth-ketens) | Gebruik | Nagemeten in het bestand |
|---|---|---|---|---|---|
| 5AFI | 2.9A Structure of E. coli ribosome-EF-TU complex by cs-corrected cryo-EM (Fischer et al., *Nature* 520:567, 2015, PubMed 25707802) | cryo-EM 2,9 Å | a 16S-rRNA, b–u S2–S21, A 23S, B 5S, C–Z/0–6 50S-eiwitten, v+w "P-site fMet-tRNAfMet" (entiteit 22), x mRNA, y "A/T-site Phe-tRNAPhe", z EF-Tu 2 (UniProt P0CE48); liganden KIR (kirromycine) en GDP op z, FME op v | `beftu` (3D, lokale kopie: ribosoom CA/P, tRNA/mRNA/EF-Tu/liganden volledig; 152 717 → 18 614 atomen) | anticodon y G34·A35·A36 paart met codon x C21·U20·U19 (2,6–2,8 Å) → GAA leest UUC (Phe); x A16–G18 = AUG; centroïden v–y 52 Å, w–y 90 Å, v–w 40 Å (w ligt verder van de A-plaats) |
| 5UAC | Escherichia coli RNA polymerase and Rifampin complex, wild-type (Molodtsov et al., *Mol Microbiol* 103:1034, 2017, PubMed 28009073) | röntgen 3,8 Å | A,B α · C β (P0A8V2) · D β′ · E ω · F σ70 (tweede kopie G–L weggelaten); RFP (rifampicine) op C; Mg²⁺ op D | `rifampicine` (3D, lokale kopie: één holo-enzym + RFP + Mg van D; 55 049 → 27 640 atomen) | binnen 4 Å van RFP: β 509, 510, 512, 513, 514, 516, 526, 529, 531, 533, 540, 564, 572, 687 (dus D516, H526, S531 in de holte); Mg²⁺ gebonden door β′ D460, D462, D464 en 14,4 Å van RFP; grootste afstand binnen RFP 14,1 Å |

EF-Tu: UniProt P0CE48 (tufB) 394 aminozuren, 43 284 Da (tufA P0CE47: idem); RCSB entiteit 25 formulegewicht 43,2 kDa ✅.

## Beweringen per knoop

### beftu — Fischer 2015 (abstract), Schmeing 2009 (PMC3763470, volledige tekst), Parmeggiani & Nissen 2006 (abstract), Dever & Green 2012, UniProt P0CE48
- ✅ EF-Tu brengt aminoacyl-tRNA naar het ribosoom als ternair complex aminoacyl-tRNA·GTP·EF-Tu; het hydrolyseert GTP en laat het tRNA los als reactie op codonherkenning — Schmeing 2009 (abstract en tekst).
- ✅ Het tRNA raakt tegelijk het decodeercentrum van de 30S en EF-Tu op de factorplek, waarvoor het vervormd wordt — Schmeing 2009 (abstract: "tRNA distortion").
- ✅ Kirromycine verhindert de herschikking van EF-Tu na GTP-hydrolyse en vangt zo het complex op het ribosoom — Schmeing 2009 ("Kirromycin prevents rearrangements of EF-Tu following GTP hydrolysis and Pi release, thus trapping the complex on the ribosome"); Parmeggiani & Nissen 2006 ("Kirromycin and enacyloxin block EF-Tu.GDP on the ribosome").
- ✅ 5AFI = 70S van E. coli met EF-Tu, aminoacyl-tRNA en kirromycine, 2,65–2,9 Å — Fischer 2015 (abstract); "2,65 Å in de kern" = "functionally important ribosomal core".
- ✅ Codon UUC / anticodon GAA, start-tRNA met fMet in de P-plaats: zelf nagemeten in 5AFI (zie tabel).
- 🔧 Keten w: de RCSB noemt v en w allebei "P-site fMet-tRNAfMet". De app noemt w "tweede kopie van het start-tRNA, verder van de A-plaats" en tekent het donker, zonder een plaats (E) te claimen die niet in de bron staat.
- ✅ Bij de mens doet eEF1A hetzelfde (eEF1A ≈ EF-Tu) — Dever & Green 2012; zelfde bron als de knoop `elongatie` (verificatieronde 5).
- ✅ Tijd "≈ 10–20 aminozuren/s": dezelfde, eerder nagekeken waarde als `bribosoom` (ronde 6). 🔧 De eerste versie zei "een fractie van een seconde" zonder bron; vervangen.
- 🔧 Stap 5: "Zo bleef dit moment staan voor de foto" → "Zo konden onderzoekers dit moment vastleggen" (cryo-EM is geen foto).

### antibiotica — Kohanski 2010 (PMC2896384, volledige tekst), Vollmer 2008 (abstract), Lin 2018, Aldred 2014, Molodtsov 2017
- ✅ "Most current bactericidal antimicrobials … inhibit DNA synthesis, RNA synthesis, cell wall synthesis, or protein synthesis" — Kohanski 2010. In de app: "De meeste antibiotica die bacteriën doden".
- ✅ β-lactams (penicillines, carbapenems, cefalosporines) remmen de transpeptidasen (PBP’s) die het peptidoglycaan dwars verbinden; met autolysinen leidt dat tot lysis — Kohanski 2010.
- ✅ Chinolonen vangen gyrase/topo IV in de knipstap en verhinderen het dichtplakken → dubbelstrengsbreuken — Kohanski 2010.
- ✅ Rifamycines binden de β-subeenheid van het RNA-polymerase — Kohanski 2010.
- ✅ 50S-remmers: macroliden (erytromycine), lincosamiden, streptogramines, chlooramfenicol, oxazolidinonen; 30S-remmers: tetracyclines en aminoglycosiden (streptomycine, gentamicine) — Kohanski 2010. Ampicilline als β-lactam: al nagekeken in `bplasmide` (ronde 6).
- ✅ Aminoglycosiden zijn de enige breed bactericide ribosoomremmers — Kohanski 2010.
- ✅ Peptidoglycaan is "a unique and essential structural element in the cell wall of most bacteria" — Vollmer 2008 (abstract). App: "Wij hebben geen celwand van peptidoglycaan".
- ✅ Gespaard: menselijk topo II mist de ankerplaatsen (Aldred 2014); ons cytosolisch ribosoom heeft G1408 en een G op de plaats van A2058 (Lin 2018); de rifampicineholte (cluster I) is "highly conserved among bacterial RNAPs, but not archaeal or eukaryotic RNAPs" (Molodtsov 2017).
- ✅ Chlooramfenicol remt ook de translatie in mitochondriën — Lin 2018 ("as well as in mitochondria, but not in the cytoplasm of eukaryotic cells"). Vermeld in `simplified` en de feiten ("gespaard" ≠ "zonder bijwerkingen").
- 🔧 "Vier dingen" gekoppeld aan de bron: `simplified` meldt dat er nog andere klassen bestaan (foliumzuur, membraan) en dat bactericide/bacteriostatisch per middel en soort verschilt (Kohanski 2010).

### rifampicine — Campbell 2001 (abstract), Molodtsov 2017 (PMC5344776, volledige tekst), Kohanski 2010, Zaychikov 1996 (abstract)
- ✅ Rifampicine bindt een holte van de β-subeenheid diep in het DNA/RNA-kanaal, meer dan 12 Å van de actieve plek, en blokkeert het RNA bij 2–3 nt — Campbell 2001; Molodtsov 2017 ("blocking RNA extension beyond the length of 2–3 nt"). Nagemeten: 14,4 Å tot het Mg²⁺ van de actieve plek. App: "ruim 1 nanometer verder".
- ✅ Het Mg²⁺ van de actieve plek wordt vastgehouden door het NADFDGD-motief van β′ — Zaychikov 1996; in 5UAC zit het Mg tussen β′ D460, D462, D464 (nagemeten).
- ✅ Hoeksteen van de tbc-behandeling — Molodtsov 2017 (abstract); vaak in combinatie vanwege snelle resistentie — Kohanski 2010. 🔧 "altijd samen" → "vaak samen".
- ✅ Resistente tbc-isolaten: ≈ 85 % S531, H526 of D516 (S531L ≈ 41 %, H526Y ≈ 36 %, D516V ≈ 9 %), in E. coli-nummering — Molodtsov 2017.
- ✅ Mechanismen: S531L → fork loop 2 wordt wanordelijk bij binding (≈ 40 % minder contactoppervlak); H526Y → holte vervormd, sterische botsing, geen binding; D516V → andere elektrostatische lading — Molodtsov 2017.
- ✅ Mutaties laten de katalytische activiteit meestal intact — Munita & Arias 2016 ("they usually spare the catalytic activity of the polymerase").
- ✅ Grootte rifampicine ≈ 1,4 nm: nagemeten (14,1 Å).
- 🔧 Eerste versie zei "verhindert niet het binden aan de promoter": niet in een gelezen bron, geschrapt.

### ribosoomremmers — Lin 2018 (PMC9176271, volledige tekst), Kohanski 2010, Wilson 2014 (abstract), Parmeggiani & Nissen 2006
- ✅ Ribosoomremmers vormen "more than half of all medicines used to treat infections" — Lin 2018 (abstract). App: "meer dan de helft van de geneesmiddelen tegen infecties".
- ✅ Tetracyclines binden in het decodeercentrum en verhinderen dat aa-tRNA de A-plaats bereikt — Lin 2018, Kohanski 2010. Doxycycline = tweede generatie tetracycline — Lin 2018.
- ✅ Aminoglycosiden (paromomycine, gentamicine) binden de top van h44 van het 16S-rRNA; leesfouten (mistranslatie); foute eiwitten kunnen misvouwen — Lin 2018, Kohanski 2010.
- ✅ Macroliden (erytromycine, azitromycine) binden bij de ingang van de uitgangstunnel (desosamine–A2058/A2059) en remmen contextafhankelijk; sommige eiwitten worden nog gemaakt — Lin 2018. 🔧 App zegt "bij veel eiwitten stokt de aanmaak", niet "alle".
- ✅ Kirromycine raakt EF-Tu, niet het ribosoom — Parmeggiani & Nissen 2006.
- ✅ Mens: G1408 in het cytosolische ribosoom verklaart waarom aminoglycosiden er niet op werken; eukaryote ribosomen hebben een G op de plaats van A2058 en zijn van nature resistent tegen macroliden (met nog andere factoren) — Lin 2018. App: "Ze binden er slecht".
- ✅ Resistentie door methylering of mutatie van A2058 — Lin 2018; erm-genen — Munita & Arias 2016.
- ✅ De mitochondriale ribosomen kunnen wel geraakt worden — Lin 2018 (chlooramfenicol).

### gyraseremmers — Aldred 2014 (PMC3985860, volledige tekst), Kohanski 2010, Hooper & Jacoby 2016 (abstract)
- ✅ Gyrase en topo IV geven een tijdelijke dubbelstrengsbreuk (4 bp verschoven) en halen er een intacte dubbele helix door; gyrase is het enige type II-topoisomerase dat actief negatieve supercoils maakt; A₂B₂-tetrameer — Aldred 2014.
- ✅ Chinolonen stabiliseren het knipcomplex door het dichtplakken te remmen; twee medicijnmoleculen per dubbelstrengsbreuk — Aldred 2014.
- ✅ Botsingen van replicatievorken of transcriptiecomplexen maken er blijvende breuken van; chinolonen "fragment the bacterial chromosome" — Aldred 2014.
- ✅ Bij E. coli is gyrase het belangrijkste doelwit, topo IV het tweede — Aldred 2014, Kohanski 2010.
- ✅ Gyrase ongeveer om de 100 kb op het chromosoom — Kohanski 2010.
- ✅ Water–metaalionbrug met een serine en een zuur aminozuur; het menselijke topo IIα/β mist die en kan die brug niet gebruiken; dat verklaart "in part" de therapeutische marge — Aldred 2014. 🔧 App: "een belangrijk deel van de verklaring" in de uitleg ("voor een deel"), niet "de" verklaring.
- ✅ Meest gemuteerde plaatsen bij resistentie = juist die serine en dat zure aminozuur — Aldred 2014. Daarnaast pompen en Qnr-eiwitten op plasmiden — Hooper & Jacoby 2016.
- ✅ Gyrase brengt negatieve supercoils aan in de nucleoïd (`bnucleoid`, ronde 6) — consistent.

### resistentie — Munita & Arias 2016 (PMC4888801, volledige tekst), Lin 2018, Molodtsov 2017, Hooper & Jacoby 2016
- ✅ Twee genetische strategieën: mutaties en verwerving van vreemd DNA (horizontale genoverdracht) — Munita & Arias 2016.
- ✅ Transformatie, transductie en conjugatie; plasmiden en transposons zijn de belangrijkste mobiele elementen — Munita & Arias 2016.
- ✅ Doelwit verandert: puntmutatie (rifampicine), enzymatische wijziging (erm-methylering), vervanging (mecA → PBP2a) — Munita & Arias 2016. 🔧 "PBP2a bij MRSA" → "PBP2a, gen mecA, bij stafylokokken" (formulering van de bron).
- ✅ β-lactamasen knippen de β-lactamring; > 1 000 beschreven; TEM-1 = plasmide-β-lactamase in gram-negatieven, jaren 1960 — Munita & Arias 2016. Aminoglycosidemodificerende enzymen (acetyl-, nucleotidyl-, fosfotransferasen) — Lin 2018.
- ✅ Hydrofiele middelen (β-lactams, tetracyclines, sommige fluorochinolonen) gaan door porines; minder/andere porines → meestal lage resistentie, vaak samen met pompen — Munita & Arias 2016 (vermeld in `simplified`).
- ✅ Tet-pompen voor tetracycline; tripartiete pompen zoals AcrAB–TolC door de hele envelop — Munita & Arias 2016.
- ✅ Conjugatie vereist celcontact en gebeurt efficiënt — Munita & Arias 2016; voorstelling van conjugatie zelf: zie `bplasmide` (ronde 6, Virolle 2020).

## Overgangszinnen (app/story.js)
- bacterie: bribosoom → "Hoe komt elk nieuw tRNA bij het ribosoom? Een helper, EF-Tu, brengt het." ✅ (Schmeing 2009); beftu → codon: de oude, nagekeken zin over de genetische code.
- antibiotica: bcel → antibiotica → rifampicine → ribosoomremmers → beftu → gyraseremmers → resistentie; elke zin herhaalt alleen wat in de volgende scène staat ✅.

## Resultaat
Alle beweringen zijn met een gelezen bron of met een eigen meting in het structuurbestand bevestigd; 6 correcties (🔧) verwerkt in de code (NL en EN). De zes knopen staan op 'nagekeken' (CHECKED in shared/graph.js).

## Onafhankelijke controle (14-11-2026)

Uitgevoerd door een tweede controleur die de inhoud niet schreef; dit verslag pas gelezen ná de eigen controle.

**Gelezen:** PubMed-abstracts (E-utilities) van Fischer 2015 (25707802), Parmeggiani & Nissen 2006 (16876786), Vollmer 2008 (18194336), Campbell 2001 (11290327), Zaychikov 1996 (8658176), Wilson 2014 (24336183); volledige teksten via PMC (efetch db=pmc) van Kohanski 2010, Molodtsov 2017, Lin 2018, Aldred 2014, Munita & Arias 2016 en Schmeing 2009; samenvatting van Hooper & Jacoby 2016; Dever & Green 2012 (artikelpagina PMC3385960, deel over eEF1A). RCSB REST (entry 5AFI/5UAC, polymer_entity 5AFI/22–25 en 5UAC/1–5), UniProt REST (P0CE48 en P0CE47). Zelf nagemeten in data/pdb/5AFI.cif en 5UAC.cif (Python, mmCIF-atomen). Bibliografische gegevens (auteurs, jaar, tijdschrift, volume, eerste pagina, PMID/PMC/DOI) van alle 17 bronnen in shared/details/bact3.js vergeleken met PubMed/PMC: alle juist, op één getal na (zie 🔧1).

**Bevestigd (✅), ongeveer 140 beweringen over de zes scènes, bact3.js, graph.js/graph.en.js en story.js, o.a.:**
- 5AFI: 70S van E. coli + EF-Tu + aminoacyl-tRNA + kirromycine, cryo-EM 2,9 Å (2,65 Å in de kern) — Fischer 2015, RCSB. Gemeten: codon x U19–U20–C21 paart met anticodon y A36–A35–G34 (2,6–2,8 Å), x16–18 = AUG, v paart met AUG (P-plaats, 2,7 Å), FME aan v A77, GDP + KIR op keten z (EF-Tu 1–393).
- EF-Tu-mechanisme (ternair complex, vervormd A/T-tRNA dat tegelijk decodeercentrum en EF-Tu raakt, GTP-hydrolyse na codonherkenning, kirromycine verhindert de herschikking na GTP-hydrolyse) — Schmeing 2009; kirromycine houdt EF-Tu·GDP op het ribosoom — Parmeggiani & Nissen 2006; eEF1A = ortholoog van EF-Tu met dezelfde werking, en na het loslaten van de factor schuift het tRNA in de A-plaats — Dever & Green 2012.
- 5UAC: E. coli-RNAP-σ70 + rifampicine, röntgen 3,8 Å, ketens A/B α, C β, D β′, E ω, F σ70 — RCSB. Gemeten: binnen 4 Å van RFP precies de opgegeven β-posities 509–687 (met D516, H526, S531); Mg²⁺ tussen β′ D460/D462/D464; Mg–RFP 14,4 Å; RFP 14,1 Å lang; molecuul ≈ 14–17 nm.
- Rifampicine: holte in β diep in het kanaal, > 12 Å van de actieve plek, blokkeert RNA van 2–3 nt — Campbell 2001 (bij Thermus aquaticus; in E. coli nagemeten); 41/36/9 % en E. coli-nummering, mechanismen S531L/H526Y/D516V, holte niet bewaard bij eukaryoten, "cornerstone" van tbc — Molodtsov 2017; snelle resistentie → vaak combinatie — Kohanski 2010; enzym blijft werken — Munita & Arias 2016.
- Vier doelwitten van bactericide middelen, β-lactams/PBP's, rifamycines op β, 30S/50S-lijsten, aminoglycosiden als enige breed bactericide ribosoomremmers, gyrase ≈ om de 100 kb — Kohanski 2010; peptidoglycaan uniek — Vollmer 2008.
- > helft van de anti-infectiemiddelen, tetracycline in het decodeercentrum, aminoglycosiden op h44 (paromomycine, gentamicine) → leesfouten, macroliden aan A2058/A2059 en contextafhankelijk, G1408 en G2058 bij de mens, chlooramfenicol ook in mitochondriën, methylering van A2058 — Lin 2018.
- Gyrase A₂B₂, knip 4 bp verschoven, enige type II-topo met negatieve supercoils, twee chinolonmoleculen per knip, water–Mg²⁺-brug met serine + zuur aminozuur, ontbreekt bij menselijk topo IIα/β ("in part"), botsingen met vorken/transcriptie → blijvende breuken, "fragment the bacterial chromosome", Qnr — Aldred 2014; Hooper & Jacoby 2016.
- Resistentie: twee genetische wegen, transformatie/transductie/conjugatie, plasmiden + transposons, mecA → PBP2a, > 1 000 β-lactamasen, TEM-1 (jaren 1960, plasmide, gram-negatief), porines (β-lactams, tetracyclines, sommige fluorochinolonen; meestal lage resistentie, vaak samen met pompen), Tet-pompen, AcrAB–TolC door de hele envelop — Munita & Arias 2016.

**Gecorrigeerd (🔧) — NL en EN samen aangepast:**
1. 🔧 bact3.js, bron UniProt P0CE48: "43,2 kDa" → "43,3 kDa". UniProt geeft voor P0CE48 (tufB) 43 314 Da; de 43 284 Da in de tabel hierboven hoort bij P0CE47 (tufA). De "≈ 43 kDa" in scène en feiten blijft juist.
2. 🔧 antibiotica.js `simplified`: "middelen tegen de aanmaak van foliumzuur" stond in geen enkele gelezen bron → "middelen die het celmembraan aantasten, zoals daptomycine" (Kohanski 2010).
3. 🔧 antibiotica.js stap 1: "De meeste antibiotica remmen één van vier dingen" → "De meeste antibiotica die bacteriën doden, …" (Kohanski spreekt alleen over bactericide middelen; zo stond het al in `kort`).
4. 🔧 antibiotica.js tijd "werking: minuten tot uren" (geen bron) → "werking: verschilt per middel en per soort" (Kohanski 2010).
5. 🔧 gyraseremmers.js schaal "gyrase ≈ 15 nm" en tijd "één knip-en-plakbeurt: seconden" (geen bron) → "knip: 4 basenparen verschoven" / "het medicijn grijpt in tijdens de knip" (Aldred 2014).
6. 🔧 gyraseremmers.js + bact3.js: "twee medicijnmoleculen nodig per knip" → "per knip binden twee medicijnmoleculen"; "meestal één van die twee bouwstenen veranderd" → "vaak" (Aldred: meest gemuteerde plaatsen binnen de doelwitmutaties; daarnaast pompen en plasmiden — Hooper & Jacoby 2016).
7. 🔧 resistentie.js tijd "minuten (conjugatie) tot jaren" (jaren zonder bron) → "via deling en via genoverdracht" (Munita & Arias 2016).
8. 🔧 bact3.js resistentie `why`: "veel sneller dan door mutaties alleen" (niet in de bron) → resistentie kan ook bacteriën bereiken die zelf nooit de mutatie kregen; conjugatie is een heel efficiënte weg (Munita & Arias 2016).
9. 🔧 ribosoomremmers.js `simplified`: "Kirromycine is geen gewoon geneesmiddel bij mensen" (geen bron) → "Onderzoekers gebruiken kirromycine om EF-Tu vast te zetten, zoals in 5AFI" (Fischer 2015, Schmeing 2009).
10. 🔧 ribosoomremmers.js stap 6, bact3.js feiten en graph.js/graph.en.js: "binden er slecht / binden niet" was te stellig voor macroliden. Lin 2018: G1408 verklaart waarom aminoglycosiden niet werken; G2058 maakt eukaryote ribosomen van nature resistent tegen macroliden, maar in gist volstaat G→A niet ("other determinants contribute"). Nu: "mede daardoor werken ze bij ons niet" / "wat mee verklaart waarom …".
11. 🔧 bact3.js ribosoomremmers `why`: "Het ribosoom is zo oud en zo belangrijk dat bacteriën het niet zomaar kunnen veranderen" (geen bron) → meerdere kopieën van de rRNA-genen (Munita & Arias 2016, gen-dosiseffect) en een wijziging kan de groei vertragen (Lin 2018: A2058-methylering "decreases cell fitness"); Munita & Arias toegevoegd aan de bronnen van die knoop.
12. 🔧 beftu.js `simplified`: keten w ligt niet zomaar "verder van de A-plaats". Gemeten: het anticodon van w (C34–A35–U36) ligt op 3,1 Å van mRNA-nucleotiden 13–15, het codon vóór AUG, dus op de E-plaats (v–mRNA 16–18: 2,7 Å = P; y–mRNA 19–21 = A). Tekst nu: "ligt op de E-plaats, tegen het mRNA vóór het startcodon". De RCSB noemt de entiteit van v én w "P-site fMet-tRNAfMet"; de plaats van w volgt uit de meting.
13. 🔧 beftu.js stap 6: "klaar voor de koppeling" was te vroeg (het tRNA staat nog in de A/T-stand) → "Laat EF-Tu los, dan schuift het nieuwe tRNA helemaal in de A-plaats en volgt de koppeling" (Dever & Green 2012; Schmeing 2009).

**Niet aangepast, wel opgemerkt:** de tijd "≈ 10–20 aminozuren/s", de schalen "70S ≈ 20 nm" en "cel ≈ 2 µm" en de brugzin over de genetische code komen ongewijzigd uit eerder nagekeken knopen (bribosoom, bcel, bact.js) en zijn hier niet opnieuw tegen een bron gelegd. Wilson 2014 en Hooper & Jacoby 2016 waren alleen als samenvatting beschikbaar; geen bewering steunt uitsluitend op hun volledige tekst. Het verslag hierboven noemde de foliumzuurklasse en "43 284 Da" als bevestigd; beide zijn hier rechtgezet (🔧1, 🔧2).

**Eindoordeel:** wetenschappelijk degelijk. De kerngegevens (structuren, ketens, afstanden, percentages, mechanismen, bronvermeldingen) kloppen en zijn controleerbaar. De 13 correcties gaan over één verkeerd getal (massa EF-Tu), vijf uitspraken zonder bron (foliumzuur, kirromycine-gebruik, tijd/schaal bij gyrase en antibiotica, "oud ribosoom"), enkele te stellige formuleringen (macroliden "binden niet", "meestal", "veel sneller", "klaar voor de koppeling") en een nauwkeuriger plaats voor het tweede tRNA in 5AFI. Na deze correcties is elke zichtbare bewering gedekt door een gelezen bron of een eigen meting. `node --check` slaagt op alle gewijzigde .js-bestanden.
