# Verificatie ronde 13 — pakket J: eiwitlot (14-11-2026)

**Bereik.** Alle zichtbare uitspraken (NL én EN) van de knopen `sortering`, `membraan`, `lysosoom`, `mito`, `perox`,
`proteasoom` en `autofagie` in `shared/details/prot3.js` (kort, what, how, facts, why, bronnen), de scènes
`app/scenes/prot/{sortering,membraan,lysosoom,mito,perox,proteasoom,autofagie}.js` en het hulpbestand `_fate.js`
(titels, stapteksten, labels, legendes, scale/time/org, simplified, extra, en wat de tekening zelf beweert:
N→C-richting van ketens, welke kant van een membraan, aantal ringen/subeenheden). Daarnaast gelezen, niet gewijzigd:
`s` in `shared/graph.js`, `S_EN` in `shared/graph.en.js` en de stapnamen in `shared/steptags.js` voor deze knopen.
Ongeveer 480 losse uitspraken nagekeken (NL en EN apart geteld).

**Methode.**
- Volledige teksten gelezen via PMC (BioC-JSON, Europe PMC fullTextXML, of de PMC-artikelpagina voor auteursmanuscripten):
  Shao & Hegde 2011, Itskanov 2023, Lange 2007, Lu 2021, Jiang 2025, Pfanner 2019, Rath 2021 (MitoCarta3.0), Guan 2021,
  Gould 1988, Walton 1995, Skowyra/Rapoport 2024, Thoms 2015, Braverman 2016, Khan & Tomatsu 2020, Schoser 2026,
  Yim & Mizushima 2020, Bard 2018, Dong 2019, Tong 2026, en nieuw: Hirn 2025, Vigneron 2014, Kisselev 2021.
- PubMed-samenvattingen (efetch): Braulke 2009, Mindell 2012, Anderson 1981, Kisselev 1999, Mizushima 2007, Dikic 2018, Hara 2006.
- Metadata (titel, tijdschrift, volume, pagina's, jaar) van alle PMC-bronnen gecontroleerd via de Europe PMC-API.
- Structuren via de RCSB-API: titel, resolutie, citatie, ketens en organisme per entiteit van 8DNV, 7CP9 en 6MSB;
  de eiwitsequenties van 8DNV en 7CP9 vergeleken met UniProt (P61619, P60059, P60468; Q8N4H5, Q96B49, Q9P0U1, Q9NS69, O96008).
- Eigen metingen met Python in `data/pdb/`: Thr op residu 1 van ketens N/O/R/n/o/r in 6MSB; afmetingen van 8DNV, 7CP9 en 6MSB;
  residutypes/bereik van TM2 (77–96) en TM7 (289–309) in 8DNV keten A. UniProt-API: transmembraansegmenten P61619, signaalpeptide P02768.
- De eerdere verslagen (o.a. ronde 8) pas na de eigen controle gelezen.

## sortering
- ✅ "Bijna elk eiwit wordt in het cytosol gemaakt; zonder label blijft het in het cytosol" — Jiang 2025 ("Without targeting peptides, these proteins remain in the cytosol"); Pfanner 2019 (13 mtDNA-eiwitten als uitzondering).
- ✅ ER: N-terminaal hydrofoob signaalpeptide, SRP, cotranslationeel — Shao & Hegde 2011; Jiang 2025.
- ✅ Klassiek NLS basisch (K/R), importine α/β — Lange 2007; Lu 2021 (monopartite 4–8 basische resten).
- 🔧 "het mag overal in het eiwit liggen" / "it can lie anywhere" → "bijna overal" / "almost anywhere" — Lu 2021: "can be located at almost any part of the protein sequence".
- ✅ Presequentie N-terminaal, positief, amfipathisch, Tom20/Tom22 — Pfanner 2019.
- ✅ PTS1 Ser-Lys-Leu (of variant), PEX5 — Gould 1988; Skowyra 2024.
- ✅ Lysosoom: M6P in het Golgi, M6P-receptoren — Braulke 2009; Khan & Tomatsu 2020.
- ✅ I-celziekte, Zellweger-spectrum — Khan & Tomatsu 2020; Braverman 2016.
- ✅ Scène `simplified`: albumine-signaalpeptide 18 aminozuren — UniProt P02768 (signaal 1–18); bron nu ook bij de knoop vermeld.
- 🔧 Stap 5: "het peroxisoom, een klein afbraakblaasje" (kan verward worden met het lysosoom) → "een klein blaasje dat o.a. vetzuren afbreekt" — Skowyra 2024, Braverman 2016.
- ✅ Tekening: ER- en mito-label op het begin (index 0 = N), PTS1 op de laatste drie bolletjes, NLS intern, lysosoomketen met signaalpeptide + suiker-fosfaat.

## membraan
- ✅ TMD ≈ 20 aminozuren α-helix, ER-dubbellaag ≈ 30 Å — Shao & Hegde 2011.
- ✅ Laterale poort vooral helix 2 en 7 — Shao & Hegde 2011; TM2 = 77–96, TM7 = 289–309 — UniProt P61619, residuen aanwezig in 8DNV keten A (9–468).
- ✅ Type I na geknipt signaalpeptide; positive-inside rule als statistische regel; topologie in het ER bepaald — Shao & Hegde 2011.
- ✅ Natuurlijke (en synthetische) remmers binden aan een pocket bij de gedeeltelijk open laterale poort — Itskanov 2023.
- ✅ 8DNV: 3,03 Å, "partially-open apo state", ketens A = Sec61α, B = Sec61γ, C = Sec61β — RCSB.
- ❌ 8DNV werd voorgesteld als volledig menselijk Sec61. Sequentievergelijking met UniProt P61619: Sec61α in 8DNV heeft de cytosolische lussen L6/7 (rond 262–278) en L8/9 (rond 386–416) van gist; Itskanov 2023 bevestigt het "human-yeast chimeric Sec complex". Sec61β en -γ zijn wel 100 % menselijk. → feit "PDB 8DNV: menselijk Sec61 (twee korte lussen van gist)" en zin toegevoegd in `simplified` (NL+EN).
- 🔧 Schaal "kanaal ≈ 8 nm" → "kanaal ≈ 7 nm breed": gemeten in 8DNV is het complex ≈ 6–7 nm breed in het membraanvlak (8 nm is de hoogte langs de membraannormaal, inclusief lussen).
- ✅ Tekening: ribosoom aan de cytosolkant, N-uiteinde in het lumen, C-uiteinde in het cytosol; in het blaasje wijst het begin naar binnen (lumenzijde) — Shao & Hegde 2011.

## lysosoom
- ✅ pH 4,5–5,0, V-ATPase, zuur activeert hydrolasen — Mindell 2012.
- ✅ Meeste oplosbare zure hydrolasen M6P; andere via LIMP-2/sortiline; cytosolstaart-signalen — Braulke 2009.
- ✅ Tweestaps-label: GlcNAc-1-fosfotransferase in cis-Golgi, "uncovering enzyme" in trans-Golgi; GNPTAB/GNPTG — Khan & Tomatsu 2020.
- ✅ > 60 hydrolasen; lysosoom ≈ 0,5 µm — Yim & Mizushima 2020.
- ✅ Mucolipidose II: hypersecretie, verhoogd in plasma, lysosomen vol onverteerd materiaal — Khan & Tomatsu 2020.
- ✅ Stap 4: ontvanger laat in het endosoom los en keert terug naar het Golgi — nu gedekt door nieuwe bron Hirn 2025 (dissociatie in het zure endosoom, recycling naar het TGN, endosoom rijpt tot lysosoom). (In ronde 8 nog zonder bron.)
- 🔧 Pompe: "zure α-glucosidase ontbreekt" / "één enzym kwijt" → "te weinig zure α-glucosidase" / "Eén enzym te weinig" (feiten, why, stap 6; NL+EN) — Schoser 2026: "deficiency of acid alpha-glucosidase"; bij lateonsetvormen is er restactiviteit. ERT als behandeling ✅ Schoser 2026.

## mito
- ✅ mtDNA 16 569 bp — Anderson 1981; 13 eiwitten, alle onderdelen van de OXPHOS-complexen — Pfanner 2019, Rath 2021.
- ❌ "De rest van het proteoom (MitoCarta3.0: 1 136 genen) wordt in de kern gecodeerd" en feit "Geïmporteerd: 1 136 genen": MitoCarta3.0 telt 1 136 genen *inclusief* de 13 mtDNA-genen (99 % nucleair) — Rath 2021. → "MitoCarta3.0 telt in totaal 1 136 menselijke genen …; op die 13 na in de kern" en feit "Proteoom: 1 136 genen, waarvan 13 in het mtDNA".
- 🔧 `kort`: "Een plus-spiraal leidt ze [de > 1000] uitgerold …" → "De meeste leidt een plus-spiraal …": de presequentieroute vervoert ≈ 60 % — Pfanner 2019.
- ✅ Presequentie, Tom20/Tom22, Tom40 β-ton, TIM23, Δψ (binnen negatief) activeert het kanaal en trekt de presequentie, PAM/mtHsp70, MPP, Hsp60–Hsp10 — Pfanner 2019; Guan 2021.
- ✅ Ontvouwen import ("alleen een uitgerolde keten") — Skowyra 2024: ER en mitochondria "can only import proteins as monomers in an unfolded conformation".
- ✅ Import als gevoelige meter, lagere Δψ bij ademhalingsziekten, mitofagie — Pfanner 2019 (Box 3).
- ✅ 7CP9: 3,0 Å, dimeer TOM-kerncomplex, ketens I/J TOM40, G/H TOM22, A/B TOM5, C/D TOM6, E/F TOM7; alle sequenties 100 % menselijk (UniProt) — RCSB, Guan 2021. Kerncomplex zonder Tom20/Tom70 — Guan 2021.
- ✅ Schaal "poort ≈ 13 nm breed" — gemeten 12,7 × 11,6 nm in het membraanvlak (7CP9).
- ✅ Tekening: + aan de buitenkant, − in de matrix; label vooraan (N) gaat eerst naar binnen.

## perox
- ✅ PTS1 C-terminaal SKL of variant, TPR van PEX5, PEX13/PEX14, conduit van PEX13, mono-ubiquitinering op cysteïne, PTS2 + PEX7 — Skowyra 2024; Gould 1988.
- ✅ Gevouwen, met disulfidebruggen vastgezette eiwitten en complexen worden geïmporteerd — Walton 1995; Thoms 2015.
- ✅ Eén membraan; o.a. oxidatie van (zeer lange) vetzuren, VLCFA ≥ 24 C — Skowyra 2024; Braverman 2016.
- ✅ PEX1 ≈ 70 % van de PBD-ZSD; van pasgeborenen tot volwassenen — Braverman 2016.
- 🔧 `kort`: "Zijn eiwitten dragen … S-K-L" → "De meeste van zijn eiwitten dragen drie letters op het einde, zoals S-K-L" (PTS1 = meerderheid, PTS2 bestaat) — Skowyra 2024.
- 🔧 Feit frequentie "1 op 50 000" gold in Braverman voor alle peroxisoom-bouwziekten (PBD's), niet alleen het Zellweger-spectrum → label aangevuld.
- 🔧 Stap 2: "Het eiwit is dan al helemaal opgevouwen" → "mag dan al opgevouwen zijn" — Walton 1995 ("proteins may fold … before their import").
- 🔧 Stap 6: "Dat is vaak al bij baby's ernstig" → "kan al bij baby's ernstig zijn" (geen frequentie in de bron) — Braverman 2016.

## proteasoom
- ✅ ≈ 2,5 MDa — Dong 2019. 19S aan één of beide uiteinden; actieve plaatsen enkel via smalle poriën; Rpn1/Rpn10/Rpn13; Rpn11 Zn-afhankelijke DUB; zes verschillende Rpt-ATPasen; deksel als steiger — Bard 2018.
- ✅ Vier ringen van zeven, α buiten, β binnen; drie katalytische β per ring; Thr1 — nieuwe bronnen Vigneron 2014 en Kisselev 2021; β1 na zure, β2 na basische, β5 na hydrofobe resten — Kisselev 2021. Zes actieve plaatsen — Kisselev 1999.
- ✅ Producten 3–22 aminozuren, meestal kort — Kisselev 1999 (konijn); verder afgebroken door cytosolische peptidasen tot aminozuren — Vigneron 2014 (nieuwe bron).
- ✅ 6MSB: 3,0 Å, 33 entiteiten (32 proteasoomeiwitten + ubiquitine), één 19S-kap; ketenkoppeling (G–M/g–m α, N–T/n–t β, N/O/R = β1/β2/β5, A–F ATPasen, c = PSMD14/Rpn11, u/w ubiquitine) — RCSB; Thr op residu 1 van N/O/R/n/o/r — eigen meting. Lengte ≈ 31 nm — eigen meting.
- 🔧 Legende "basis: ontvangers" kleurt ook PSMD1 (Rpn2, een steiger, geen ubiquitinereceptor) → "basis: o.a. ontvangers" — Bard 2018.
- 🔧 Tijd "in elke cel" → "in onze cellen" (de bronnen spreken over eukaryote cellen; "elke" is te stellig).

## autofagie
- ✅ Fagofoor, willekeurig of via receptoren, bol met één opening, dubbelmembraan, LC3/RAB7, SNARE, afbraak van binnenmembraan, mTORC1 laat los bij honger, CMA en microautofagie, doelwitten — Yim & Mizushima 2020.
- ✅ Basale autofagie, Atg5-knock-out in neurale cellen → inclusies en neurodegeneratie zonder ziektegen; vooral rustende cellen zoals neuronen — Hara 2006.
- ✅ Rol bij kanker en neurodegeneratie — Dikic 2018. Stappen sequestratie → afbraak → hergebruik — Mizushima 2007. Aggregaten/organellen via autofagie — Tong 2026.
- 🔧 `simplified`: "met hulp van tientallen eiwitten" (aantal niet in een gelezen bron) → "met hulp van veel eiwitten".

## Te verwerken in gedeelde bestanden
- `shared/graph.js` · `Mens: 13 eiwitten door het mtDNA gecodeerd, de rest (MitoCarta3.0: 1 136 genen) geïmporteerd.` → `Mens: 13 eiwitten door het mtDNA gecodeerd, de rest geïmporteerd (MitoCarta3.0 telt in totaal 1 136 genen).`
- `shared/graph.en.js` · `Human: 13 proteins encoded by mtDNA, the rest (MitoCarta3.0: 1,136 genes) imported.` → `Human: 13 proteins encoded by mtDNA, the rest imported (MitoCarta3.0 lists 1,136 genes in total).`
- `shared/graph.js` · `bij de ziekte van Pompe ontbreekt één enzym (zure α-glucosidase).` → `bij de ziekte van Pompe is één enzym (zure α-glucosidase) te weinig werkzaam.`
- `shared/graph.en.js` · `in Pompe disease one enzyme (acid α-glucosidase) is missing.` → `in Pompe disease one enzyme (acid α-glucosidase) is deficient.`
- `shared/steptags.js`: geen wijzigingen nodig.

## Eindoordeel
Het pakket is inhoudelijk sterk; geen van de mechanismen was fout. Er waren 2 echte fouten (8DNV is een mens-gist-chimeer;
MitoCarta3.0-getal bevat de 13 mtDNA-genen) en 12 te stellige of onvolledige formuleringen, alle verbeterd in NL en EN
(14 correcties). Vier nieuwe, gelezen bronnen toegevoegd (UniProt P02768, Hirn 2025, Vigneron 2014, Kisselev 2021).
Alle bestanden slagen voor `node --check`. Twee wijzigingen (4 tekstparen, NL en EN) wachten nog op de gedeelde bestanden (`graph.js`/`graph.en.js`).
