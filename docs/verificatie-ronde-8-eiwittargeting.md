# Verificatieronde 8 — zijpad "Waar een eiwit heen gaat en hoe het verdwijnt" (05-11-2026)

Nagekeken: de zeven nieuwe knopen `sortering`, `membraan`, `lysosoom`, `mito`, `perox`, `proteasoom`, `autofagie` (graph.js, graph.en.js, shared/details/prot3.js, scènes in app/scenes/prot/) en de overgangszinnen van de verhaallijn `targeting` (app/story.js). De bestaande hoofdstukken `er`, `golgi`, `kernimport`, `ubiquitine` en `misvouwing` waren al nagekeken; daar zijn alleen klikbare verwijzingen bijgekomen.
Methode: elke bewering in kort/what/how/facts/why, stapteksten, labels, schaal/duur en `simplified` vergeleken met de bron in `sources` (opgehaald op 05-11-2026: PubMed-abstracts via E-utilities, volledige teksten via PMC). PDB-ID's gecontroleerd via `https://data.rcsb.org/rest/v1/core/entry/<ID>` en `/polymer_entity/<ID>/<n>` (organisme per entiteit); ketens, residuen en afmetingen nagekeken in de coördinatenbestanden zelf.
Opmerking: NCBI Bookshelf (Alberts) gaf opnieuw een reCAPTCHA. Waar een bewering alleen door het handboek gedekt is, staat ze hieronder als ⚠️.

## PDB-structuren

| ID | RCSB-titel | Methode | Organisme | Gebruik | Nagekeken in het bestand |
|---|---|---|---|---|---|
| 6MSB | Cryo-EM structures and dynamics of substrate-engaged human 26S proteasome (Dong et al., Nature 2019) | cryo-EM 3,0 Å | alle 33 entiteiten *Homo sapiens* | `proteasoom` (3D, hele scène) | 48 ketens, één 19S-kap. 20S: G–M (PSMA), N–T en n–t (PSMB), g–m (PSMA) = 4 ringen van 7; Thr1 (auth 1 = THR) op N/n (PSMB6 = β1), O/o (PSMB7 = β2), R/r (PSMB5 = β5), UniProt P28072/Q99436/P28074 bevestigen de namen β1/β2/β5. 19S: A–F = PSMC1–6 (ATPasen), deksel V W X Y Z a c d e, c = PSMD14 (Rpn11), ubiquitine u en w. 32 verschillende proteasoomeiwitten + ubiquitine. Lengte (CA) ≈ 31 nm. Lokaal ingekort tot CA (104 938 → 13 501 atomen), star gedraaid (lengteas = y), 1,1 MB |
| 7CP9 | Cryo-EM structure of human mitochondrial translocase TOM complex at 3.0 angstrom (Guan et al., Cell Discov 2021) | cryo-EM 3,0 Å | alle 5 entiteiten *Homo sapiens* | `mito` (3D in stap 3–4) | dimeer: I, J = TOM40 (twee β-tonnen), G, H = TOM22, A–F = TOM5/6/7. Breedte ≈ 13 nm. Membraannormaal = z-as van het bestand (bepaald uit de enkele TM-helices van TOM5/6/7); TOM22-N-uiteinde (cytosol) boven. Star gedraaid, volledige atomen, 0,8 MB |
| 8DNV | Cryo-EM structure of the human Sec61 complex in a partially-open apo state (Class 1) (Itskanov et al., Nat Chem Biol 2023) | cryo-EM 3,03 Å | alle 3 entiteiten *Homo sapiens* | `membraan` (3D in stap 1–2) | A = Sec61α (9–468), B = Sec61γ, C = Sec61β. Laterale poort: TM2 (77–96) en TM7 (289–309) volgens UniProt P61619. Membraannormaal bepaald uit de tien TM-helices (afwisselende richting); star gedraaid (cytosol = +y, poort naar de kijker). Afmeting ≈ 7–8 nm. 0,4 MB |

Kandidaten die afvielen: 5GJR (mens, 26S met twee kappen; 19 945 residuen → als CA-bestand ≈ 2 MB, te groot), 5LE5 (alleen 20S, geen kap), 7CK6 (TOM, 3,4 Å; 7CP9 is scherper). Een mens ribosoom–Sec61-complex bestaat (6R7Q, XBP1u, 88 ketens), maar is te groot; het losse menselijke Sec61 (8DNV) volstaat om het kanaal en de zijdeur te tonen.

## Beweringen per knoop

### sortering — Shao & Hegde 2011 (PMC4163802), Lange et al. 2007 (PMC4502416), Pfanner et al. 2019 (PMC6684368), Gould et al. 1988 (PMC2115268), Skowyra et al. 2024 (PMC10957506), Braulke & Bonifacino 2009 (PubMed 19046998), Khan & Tomatsu 2020 (PMC7555117)
- ✅ ER-signaal = N-terminaal signaalpeptide met hydrofobe kern, co-translationeel herkend — Shao.
- ✅ Klassiek NLS = basisch, herkend door importine α/β — Lange (abstract). ⚠️ "ergens in het eiwit (intern)": algemeen bekend (Alberts), in Lange alleen indirect (NLS-voorspelling in hele eiwitten).
- ✅ Presequentie = N-terminale positief geladen amfipathische α-helix, herkend door Tom20/Tom22 — Pfanner.
- ✅ PTS1 = C-terminaal Ser-Lys-Leu of variant — Gould (tripeptide S-K/H-L; SKL → SNL schakelt uit), Skowyra.
- ✅ Lysosoom via mannose-6-fosfaat in het Golgi, M6P-receptoren — Braulke, Khan & Tomatsu.
- ✅ "Bijna elk eiwit begint in het cytosol": 99 % van de mitochondriale eiwitten nucleair gecodeerd (MitoCarta3.0); alleen 13 door mtDNA.
- ⚠️ "Zonder label blijft het eiwit in het cytosol": handboekregel (Alberts, Bookshelf niet leesbaar); niet letterlijk in de gelezen bronnen.

### membraan — Shao & Hegde 2011, Itskanov et al. 2023 (PMC11458068), UniProt P61619
- ✅ "Ideale" TMD ≈ 20 residuen α-helix, optimaal voor de ≈ 30 Å dikke ER-membraan — Shao.
- ✅ Sec61 = α, β, γ; laterale poort "formed primarily by helices 2 and 7" (met bijdragen van 3 en 8); plug aan de lumenkant — Shao; drie ketens in 8DNV.
- ✅ Een TMD verlaat het kanaal via de laterale poort naar de lipidelaag (stop-transfer); na een geknipt signaalpeptide krijgt een intern TMD een type I-topologie (N in het lumen, C in het cytosol) — Shao.
- ✅ Positive-inside rule — Shao.
- ✅ Remmers binden een lipide-blootgestelde holte gevormd door de half open laterale poort en de plug — Itskanov (abstract).
- ⚠️ Vesikels behouden de oriëntatie (lumenkant blijft binnenkant van het blaasje): handboek (Alberts), niet in de gelezen bronnen.
- 🔧 Schaal "≈ 20 nm" (geschat) → "membraan ≈ 3 nm dik · kanaal ≈ 8 nm" (Shao + gemeten in 8DNV).
- 🔧 Een NL-uitlegzin met een getal zonder bron ("een op de vier genen …") geschrapt.

### lysosoom — Braulke & Bonifacino 2009, Ghosh, Dahms & Kornfeld 2003 (PubMed 12612639, achtergrond), Mindell 2012 (PubMed 22335796), Yim & Mizushima 2020 (PMC7010707), Khan & Tomatsu 2020 (PMC7555117), Schoser 2026 (PMC13428432)
- ✅ pH 4,5–5,0 activeert de hydrolasen; V-ATPase pompt protonen — Mindell (abstract).
- ✅ > 60 luminale hydrolasen — Yim.
- ✅ Tweestapsmerkteken: GlcNAc-1-fosfotransferase (cis-Golgi) zet GlcNAc-1-P op mannose; het "uncovering enzyme" legt M6P bloot in het trans-Golgi; M6P-receptoren brengen de enzymen naar de lysosomen — Khan & Tomatsu.
- ✅ Andere routes (LIMP-2, sortiline) en cytosolische sorteersignalen — Braulke.
- ✅ Receptor brengt enzymen naar het endosoom en keert terug — Ghosh (abstract) en de al nagekeken `golgi`-scène.
- ✅ I-celziekte = mucolipidose II (α/β); tekort aan GlcNAc-1-fosfotransferase → hypersecretie van lysosoomenzymen (sterk verhoogd in plasma), tekort in de lysosomen; GNPTAB/GNPTG — Khan & Tomatsu; mediane overleving ML II 5 jaar (Dogterom 2021, niet in de app gebruikt).
- ✅ Pompe = lysosomale glycogeenstapelingsziekte door tekort aan zure α-glucosidase (GAA); enzymvervangingstherapie — Schoser.
- 🔧 Stap 4 bewust zonder "het zuur laat de receptor los": dat mechanisme stond in geen enkele gelezen bron; nu alleen "laat los en keert terug".
- 🔧 Duur "minuten tot uren" (geen bron) → "schematisch".

### mito — Pfanner et al. 2019, Rath et al. 2021 (MitoCarta3.0, PMC7778944), Anderson et al. 1981 (PubMed 7219534), Guan et al. 2021 (PMC8041818), Skowyra et al. 2024
- ✅ 13 eiwitten door het menselijke mtDNA (16 569 bp) — Anderson (genoomgrootte), Pfanner ("13 proteins in humans"), MitoCarta ("13 originating from the mtDNA").
- 🔧 Opdracht: "> 1000 geïmporteerd — verifiëren". MitoCarta3.0: 1 136 menselijke genen (99 % nucleair); Pfanner schat 1 000–1 500 verschillende eiwitten. Gebruikt: "meer dan 1000" en in de feiten "1 136 genen (MitoCarta3.0)".
- ✅ Presequentieroute ≈ 60 % van de mitochondriale eiwitten; Tom20/Tom22; Tom40-kanaal; TIM23; Δψ (binnen negatief) activeert Tim23 en trekt de presequentie; PAM met mtHsp70; MPP knipt; mtHsp70 en Hsp60–Hsp10 helpen vouwen — Pfanner.
- ✅ Mitochondriën importeren alleen ontvouwen monomeren — Skowyra ("only import proteins as monomers in an unfolded conformation").
- ✅ Tom40 = kanaalvormende β-ton; kerncomplex zonder Tom20/Tom70 — Guan; dimeer met twee tonnen in 7CP9.
- ✅ Lagere Δψ remt import; mitofagie ruimt beschadigde mitochondriën op — Pfanner.
- 🔧 Schaal "≈ 50 nm" en duur "seconden tot minuten" (geschat, geen bron) → "schematisch (de echte poort is ≈ 13 nm breed)" (gemeten in 7CP9) en "vertraagd (schematisch)".

### perox — Gould et al. 1988, Walton et al. 1995 (PMC301228), Thoms 2015 (PMC4680570), Skowyra et al. 2024, Braverman et al. 2016 (PMC5214431)
- ✅ PTS1 SKL aan het C-uiteinde; PEX5 (TPR-domein) bindt het in het cytosol; PEX13/PEX14; doorgang gevormd door PEX13; PEX5 keert terug na monoubiquitinering op een cysteïne; PTS2 (N-terminaal) via de adapter PEX7 — Skowyra.
- ✅ Gevouwen eiwitten, met disulfidebruggen vastgezette eiwitten, IgG en zelfs goudpartikels met PTS1 worden geïmporteerd — Walton; gevouwen en oligomere eiwitten — Thoms, Skowyra.
- ✅ Eén membraan — Walton ("the single membrane of this organelle").
- ✅ Zellweger-spectrum (PBD-ZSD): mutaties in PEX-genen (14 genen; PEX1 ≈ 70 %); β-oxidatie van zeer lange vetzuren (≥ 24 C) gestoord; van ernstig bij pasgeborenen tot langzaam bij volwassenen; ≈ 1 op 50 000 geboorten in Noord-Amerika (schatting) — Braverman.
- 🔧 Schaal "≈ 1 µm" en duur "minuten" (geen bron) → "schematisch".

### proteasoom — Bard et al. 2018 (PMC6422034), Dong et al. 2019 (PMC6370054), Kisselev et al. 1999 (PubMed 9920878), Groll et al. 1997 (PubMed 9087403, achtergrond)
- ✅ ≈ 2,5 MDa, ATP-afhankelijk — Dong (abstract).
- ✅ Actieve plaatsen in de kamer van het vatvormige 20S, alleen via smalle poriën bereikbaar die gevouwen eiwitten uitsluiten; 19S op één of beide uiteinden; basis met zes ATPasen (Rpt1–6) die ontvouwen en induwen; deksel; Rpn11 = Zn-afhankelijke deubiquitinase die de ketens verwijdert vóór de ATPase; Rpn1/Rpn10/Rpn13 als ubiquitinereceptoren; poortopening — Bard.
- ✅ Vier ringen van zeven en Thr1 van β1, β2, β5 — nagekeken in 6MSB zelf (ketens en residu 1); Groll (abstract, gist) bevestigt dat Thr1 van β1/β2/β5 het actieve residu is.
- ✅ Zes actieve plaatsen: twee "chymotryptic", twee "tryptic", twee "post-acidic" — Kisselev.
- 🔧 Opdracht: "peptiden 3–15 aa". Kisselev: producten van 3 tot 22 residuen (log-normaal, de meeste kort; < 15 % is 8–9 lang). Gebruikt: "3 tot ongeveer 20" (stap) en "3–22" (uitleg).
- 🔧 Duur "ongeveer een minuut per eiwit" (eigen schatting, geen bron) → "doorlopend, in elke cel". "32 verschillende eiwitten" → "ruim 30" (6MSB bevat 32; in de cel kunnen losser gebonden onderdelen erbij komen). Een zin over bortezomib (niet in de bronnen) geschrapt.
- ✅ Producten worden verder afgebroken en hergebruikt: zelfde bewering als in de al nagekeken `ubiquitine`-scène (aminozuren → nieuwe eiwitten).

### autofagie — Yim & Mizushima 2020, Mizushima 2007 (PubMed 18006683), Hara et al. 2006 (PubMed 16625204), Dikic & Elazar 2018 (PubMed 29618831)
- ✅ Fagofoor groeit rond cytoplasmatisch materiaal (willekeurig of gericht), sluit tot autofagosoom met dubbele membraan, versmelt (SNARE-afhankelijk, met LC3 en RAB7) met het lysosoom; de enzymen breken binnenmembraan en inhoud af; producten gaan terug naar het cytosol; doelwitten o.a. aggregaten, ER, mitochondriën; lysosoom ≈ 0,5 µm; honger → mTORC1 laat los van het lysosoom → macroautofagie — Yim.
- ✅ Stappen opsluiten → transport → afbraak → hergebruik — Mizushima (abstract).
- ✅ Basale autofagie ruimt voortdurend op, vooral belangrijk in zenuwcellen; Atg5-knock-out in neuronen → inclusies en neurodegeneratie — Hara (abstract).
- ✅ Rol bij kanker en neurodegeneratie — Dikic & Elazar (abstract).
- ⚠️ "Past niet in het proteasoom": afgeleid uit Bard (smalle poriën laten alleen uitgerolde ketens door) en Yim (macroautofagie voor materiaal dat te groot is voor andere routes).
- 🔧 Schaal "blaasje ≈ 0,5–1 µm" (geen bron) → "schematisch (een lysosoom is ≈ 0,5 µm)" (Yim); duur "minuten" → "schematisch".

### Overgangszinnen (verhaallijn `targeting`)
- ✅ Volgorde sortering → er → membraan → golgi → lysosoom → kernimport → mito → perox → ubiquitine → proteasoom → autofagie → misvouwing; elke zin herhaalt alleen beweringen die hierboven of in eerdere rondes nagekeken zijn.

## Correctie in deze ronde zelf
- 🔧 `sortering.simplified` noemt "het ER-label ≈ 15–30 aminozuren". Niet in een gelezen bron → vervangen door het nagekeken voorbeeld uit de `er`-scène: "het ER-label van albumine telt 18 aminozuren" (UniProt P02768).

## Resultaat
- 7 nieuwe knopen nagekeken; 11 correcties doorgevoerd (🔧), 4 nuances (⚠️) aanvaard (handboekkennis of afgeleid).
- Status: `sortering`, `membraan`, `lysosoom`, `mito`, `perox`, `proteasoom`, `autofagie` → **nagekeken** (CHECKED in shared/graph.js).
