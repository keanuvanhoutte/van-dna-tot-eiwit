# Verificatieronde 10 — zijpad "Hoe een virus zichzelf laat maken" (05-11-2026)

Nagekeken: de zes nieuwe knopen `sleutel`, `viruskopie`, `schaar`, `assemblage` (stage `entry`) en `faag`, `crispr` (stage `bact`) — graph.js, graph.en.js, shared/details/virus2.js, scènes in app/scenes/entry/ en app/scenes/bact/ — plus de overgangszinnen van de verhaallijn `virusroute` (app/story.js). De bestaande hoofdstukken `virus`, `baltimore`, `endocytose` en `lnp` waren al nagekeken (rondes 1–5); daar zijn alleen verwijzingen en één knop bijgekomen.
Methode: elke bewering in kort/what/how/facts/why, stapteksten, labels, schaal/duur en `simplified` vergeleken met de bron in `sources` (opgehaald op 05-11-2026: PubMed-abstracts via E-utilities, volledige teksten van Jackson 2022, V'kovski 2021, Zhang 2020, Casjens & Hendrix 2015, Brouns 2008 en Makarova 2020 via de PMC-BioC-API). PDB-ID's gecontroleerd via `https://data.rcsb.org/rest/v1/core/entry/<ID>` en `/polymer_entity/<ID>/<n>` (organisme per entiteit); ketens, residuen en afstanden nagemeten in het coördinatenbestand van RCSB.
⚠️ = alleen door een handboek of een niet volledig gelezen tekst gedekt. 🔧 = correctie tegenover de opdracht of de eerste versie.

## PDB-structuren

| ID | RCSB-titel | Methode | Entiteiten / organisme | Gebruik | Nagemeten in het bestand |
|---|---|---|---|---|---|
| 6M0J | Crystal structure of SARS-CoV-2 spike receptor-binding domain bound with ACE2 (Lan et al., *Nature* 581:215, 2020, PubMed 32225176) | röntgen 2,45 Å | 2: entiteit 1 = Angiotensin-converting enzyme 2, keten A, *Homo sapiens* (res. 19–615); entiteit 2 = Spike protein S1, keten E, *SARS-CoV-2* (res. 333–526) | `sleutel` (3D) | Raakvlak ≤ 4,0 Å tussen zware atomen: **17 RBD-residuen** (417, 446, 449, 453, 455, 456, 475, 486, 487, 489, 493, 496, 498, 500, 501, 502, 505) en **20 ACE2-residuen** (24–42, 79–83, 330–357, 393). Lokaal ingekort tot CA-atomen (6 406 eiwitatomen → 791) en star gedraaid (ACE2 onder, RBD boven = +y); 0,06 MB |
| 7RFW | Structure of SARS-CoV-2 main protease in complex with a covalent inhibitor (Owen et al., *Science* 374:1586, 2021, PubMed 34726479) | röntgen 1,729 Å | 1 polymeer: 3C-like proteinase, *SARS-CoV-2* (307 res.); ligand 4WI = nirmatrelvir (PF-07321332), C23H34F3N5O4 | `schaar` (3D) | Biologische eenheid 1 = dimeer. **Cys145-SG ligt 1,92 Å van atoom C3 van 4WI** (covalente binding, in beide helften) en **His41-NE2 3,62 Å van Cys145-SG** (katalytische dyade). Lokaal: assembly 1, tweede kopie `A-2` hernoemd tot keten B, alleen CA + volledige His41/Cys145 + ligand, geen water (4 870 → 776 atomen); 0,06 MB |
| 4OO8 | Crystal structure of *Streptococcus pyogenes* Cas9 in complex with guide RNA and target DNA (Nishimasu et al., *Cell* 156:935, 2014) | röntgen 2,5 Å | 3 polymeren (Cas9 + gids-RNA + doel-DNA) | alleen als atlaslink in `crispr` (`?pdb=4OO8`) en in `graph.js` | niet lokaal opgeslagen (de atlas haalt het bij RCSB op) |

Kandidaten die afvielen: 7SI9 (2,0 Å, kamertemperatuur) en 7VH8 (1,59 Å) bevatten hetzelfde ligand 4WI, maar 7RFW is de structuur uit de publicatie waarin nirmatrelvir wordt voorgesteld (Owen et al.) — dat maakt bron en structuur één geheel. 🔧 De opdracht noemde 7SI9 als eerste mogelijkheid; 7RFW is gekozen op die grond en op de resolutie.

## Beweringen per knoop

### sleutel — Lan 2020 (PubMed 32225176), Jackson 2022 (PMC8491763, volledige tekst), Hoffmann 2020 (PMC7102627), Walls 2020 (PMC7102599), Ke 2020 (PMC7116492)
- ✅ Het RBD van de spike bindt ACE2; structuur op atomair niveau — Lan 2020 (abstract) + 6M0J.
- ✅ 17 RBD- en 20 ACE2-residuen in contact — zelf nagemeten in 6M0J (zie tabel); Lan beschrijft "residues … essential for ACE2 binding".
- ✅ De spike is een trimeer (S1 bindt, S2 fuseert), zichtbaar als "kroon" op echte virusdeeltjes — Walls 2020; Ke 2020; Jackson 2022.
- ✅ De drie RBD's wisselen tussen "up" (bindbaar) en "down" — Jackson 2022 ("samples two distinct conformations: 'up' … 'down'").
- ✅ **Twee routes naar binnen**: de S2′-plaats wordt geknipt door TMPRSS2 aan het celoppervlak **of** door cathepsine L in het endosoom na ACE2-afhankelijke endocytose — Jackson 2022 (letterlijk), Hoffmann 2020 (TMPRSS2). 🔧 De scène zegt daarom nooit "alleen via een blaasje": stap 6 en `simplified` noemen beide routes, en de knop naar `endocytose` heet "de weg via een blaasje".
- ✅ ACE2 zit hoog in de neus (trilhaarcellen), beperkt in de diepe long, en ook in darm, nier, hart — Jackson 2022. In de app: "neus, longen en darm", feiten: "veel in de neus, minder diep in de longen".
- ⚠️ "Binden: een fractie van een seconde" (duurveld) is een ordegrootte-uitspraak, niet uit een gelezen bron; daarom staat er geen getal.

### viruskopie — V'kovski 2021 (PMC7592455, volledige tekst), Wu 2020 (PMC7094943), Snijder 2020 (PMC7302735), Wolff 2020 (PMC7665310), Kelly 2020 (PMC7397099)
- ✅ Genoom = 29 903 nucleotiden — Wu 2020 (letterlijk).
- ✅ Het genoom is gekapt en gepolyadenyleerd en wordt rechtstreeks vertaald tot pp1a/pp1ab; "one long chain" in de app — V'kovski 2021.
- ✅ pp1ab ontstaat door een geprogrammeerde −1-frameshift op de overlap van ORF1a en ORF1b; efficiëntie 45–70 % bij SARS-CoV-2 — V'kovski 2021. In de app alleen in de uitleg ("een verspringing van één letter", feit: "bij ongeveer de helft van de ribosomen"); niet in titels of ondertitels. 🔧 De scène zegt dus niet "16 stukken uit één keten", maar `simplified` legt de twee ketens uit.
- ✅ PLpro (in nsp3) en Mpro (nsp5) knippen de polyproteïnen; ORF1a/1b leveren 15–16 nsp's (nsp1–16) — V'kovski 2021. 🔧 De app toont 16 stukken en zegt "zestien losse eiwitten"; de bron schrijft "15–16", daarom vermeldt `simplified` de twee ketens en noemt de scène geen enkel nsp-nummer in beeld.
- ✅ RNA-synthese gebeurt in blaasjes met dubbel membraan (DMV's) uit ER-membranen; DMV's zijn aantoonbaar de plaats van RNA-synthese — Snijder 2020 (EM-autoradiografie), V'kovski 2021.
- ✅ Replicatie via volledige (−)RNA-kopieën; kortere subgenomische boodschappers voor de structurele eiwitten — V'kovski 2021. In de app: alleen in `simplified` en in de uitleg.
- ✅ Een porie (hexameer van een groot viraal membraaneiwit, nsp3) overspant beide membranen van de DMV en zou RNA-export toelaten — Wolff 2020. 🔧 Wolff schrijft "would allow export": de porie is in beeld gebracht, de RNA-export is het voorstel. `simplified` en de uitleg zeggen daarom "vermoedelijk" / "het voorstel van de onderzoekers"; de stap zelf blijft beschrijvend ("door een poortje").
- ⚠️ "Blaasjes ≈ 0,1–0,3 µm" (schaalveld): ordegrootte uit de EM-beelden van Snijder/Klein, niet als getal in de gelezen tekst; de scène zegt "schematisch".

### schaar — Owen 2021 (PubMed 34726479), Zhang 2020 (PMC7164518, volledige tekst), Hammond 2022 (PMC8908851), V'kovski 2021
- ✅ Mpro (3CLpro, nsp5) knipt "no fewer than 11 cleavage sites" op polyproteïne 1ab, meestal Leu-Gln↓(Ser, Ala, Gly) — Zhang 2020 (letterlijk). In de app: "ten minste elf plaatsen".
- ✅ Katalytische bouwstenen Cys145 (nucleofiel) en His41 — Zhang 2020; zelf nagemeten in 7RFW (3,62 Å).
- ✅ Mpro werkt alleen als dimeer (de N-vinger van elke helft vormt de S1-tas van de andere) — Zhang 2020. In de app: "alleen samen kunnen ze knippen".
- ✅ Nirmatrelvir (PF-07321332) is een orale Mpro-inhibitor; 7RFW is de bijhorende structuur — Owen 2021; de covalente binding aan Cys145 is in het bestand nagemeten (1,92 Å).
- ✅ Nirmatrelvir wordt met ritonavir gegeven (farmacokinetische versterker, vertraagt de afbraak) en verlaagde in een fase 2–3-studie bij niet-gevaccineerde risicopatiënten het aantal ziekenhuisopnames/overlijdens sterk — Hammond 2022. 🔧 De uitleg zegt neutraal "duidelijk lager dan bij placebo" en noemt geen percentage of merknaam in de stapteksten; "Paxlovid" staat alleen in `facts` en in `graph.js`.
- ✅ Het virus heeft naast Mpro een tweede protease (PLpro) — V'kovski 2021; staat in `simplified`.

### assemblage — V'kovski 2021, Klein 2020 (PMC7676268), Ghosh 2020 (PMC7590812)
- ✅ Structurele eiwitten (S, E, M) komen in ER-membranen en gaan naar het ER–Golgi-tussencompartiment (ERGIC), waar ze met door N ingepakt genomisch RNA samenkomen en naar het lumen afknoppen; virions worden door exocytose uitgescheiden — V'kovski 2021 (letterlijk).
- ✅ Assemblage aan interne membranen; vRNP's als aparte cilindrische pakketjes, verrijkt op gekromde knopmembranen — Klein 2020. In de app: "kluwen".
- ✅ β-coronavirussen (o.a. SARS-CoV-2) verlaten de cel via lysosomale route in plaats van de klassieke secretieweg; de lysosomen worden daarbij minder zuur en hun enzymen minder actief — Ghosh 2020 (letterlijk, *Cell* 183:1520, 2020). 🔧 Dit is aangetoond in gekweekte cellen; de scène zegt "wellicht" en `simplified` + de uitleg vermelden dat het niet in alle details bevestigd is.
- ✅ "ERGIC" komt alleen in de uitleg en in `graph.js` voor; in beeld staat "tussen ER en Golgi".
- ⚠️ "Virusdeeltje ≈ 0,1 µm": handboekwaarde (coronavirions ≈ 80–120 nm), niet uit de gelezen teksten; de scène zegt "niet op schaal".

### faag — Casjens & Hendrix 2015 (PMC4424060, volledige tekst), Abedon 2019 (PMC6832632), Barrangou 2007 (PubMed 17379808)
- ✅ Na adsorptie wordt het faag-DNA door de staart geïnjecteerd (receptoren en inner-membraaneiwitten bepalen of dat lukt) — Casjens & Hendrix 2015.
- ✅ Lysogenie: Int (met de gastheerfactor IHF) integreert lambda op de att-plaats; Xis is nodig voor het omgekeerde (excisie); CI houdt de lytische genen uit — Casjens & Hendrix 2015.
- ✅ Inductie: profagen worden door DNA-schade (UV, mitomycine C) tot de lytische cyclus aangezet; CI wordt via geactiveerd RecA afgebroken (autoprotease) — Casjens & Hendrix 2015.
- ✅ Lambda-genoom = 48 502 bp (Sangers eerste volledige dsDNA-virusgenoom) — Casjens & Hendrix 2015.
- ✅ "≈ 20–25 minuten tot lysis": latente periode van T-even fagen in eenstapsgroei-experimenten is "roughly 20- to 25-min" — Abedon 2019. 🔧 De opdracht vroeg "veel maken, barsten" zonder tijd; de app zegt "al na zo'n twintig minuten" en `simplified` vermeldt dat het beeld weg 1 als bij T4 en weg 2 als bij lambda tekent (lambda kan ook lytisch gaan — Casjens & Hendrix).
- 🔧 Geen getal voor de burst size: in de gelezen bronnen staat geen eenduidig aantal nieuwe fagen per cel. `simplified` zegt daarom "veel meer nieuwe fagen dan getekend" in plaats van "tientallen tot honderden".
- ✅ Fagen zijn de reden dat bacteriën CRISPR-afweer hebben — Barrangou 2007 (titel/abstract).

### crispr — Barrangou 2007 (PubMed 17379808), Brouns 2008 (PMC5898235, volledige tekst), Jinek 2012 (PMC6286148), Cong 2013 (PMC3795411), Makarova 2020 (PMC8905525, volledige tekst), Nishimasu 2014 (PMC4139937)
- ✅ Na faaguitdaging integreren bacteriën nieuwe spacers uit het faaggenoom; verwijderen of toevoegen van spacers verandert de resistentie; specificiteit = sequentiegelijkenis — Barrangou 2007 (letterlijk).
- ✅ Het CRISPR-transcript (pre-crRNA) wordt door Cascade in elke herhaling geknipt tot crRNA's van ≈ 57 nt; met Cas3 is dat genoeg voor faagresistentie in *E. coli* K-12 — Brouns 2008.
- ✅ Spacers in *E. coli* K-12 zijn meestal 32 nt, herhalingen 29 nt — Brouns 2008. 🔧 De eerste versie zei "≈ 30 letters"; `simplified` zegt nu "≈ 30 letters (bij E. coli meestal 32)".
- ✅ Cas9 van *S. pyogenes* knipt met crRNA:tracrRNA beide strengen (HNH en RuvC-domeinen) en is programmeerbaar met één chimeer RNA — Jinek 2012.
- ✅ PAM-herkenning door het C-terminale domein van Cas9 — Nishimasu 2014 (structuur 4OO8). 🔧 De eerste versie schreef de PAM toe aan "de schaar" in het algemeen en zei dat de bacterie zo haar eigen rij niet knipt; `simplified` zegt nu alleen wat de bron dekt: "Cas9 knipt alleen als naast de passende letters ook een kort herkenningsstukje (PAM) ligt".
- ✅ Gericht knippen in menselijke en muizencellen met korte RNA's; meerdere gidsen in één rij — Cong 2013.
- ✅ **CRISPR–cas komt voor in 276/324 archaeagenomen (85,2 %) en 5 412/12 792 bacteriegenomen (42,3 %)** — Makarova 2020 (letterlijk, 13 116 complete genomen). In de app: "42,3 %" en "85,2 %" in de feiten, "bij ≈ 4 op 10 bacteriën" in beeld.
- ✅ Het verschil afweer ↔ toepassing: in de bacterie wordt vreemd DNA kapotgeknipt (Barrangou, Brouns), genbewerking is de menselijke toepassing met een zelfgekozen gids (Jinek, Cong). De scène zegt dit in stap 5 en in het paneel ("bacterie: faag kapotknippen · lab: een gen aanpassen").

## Woordgebruik, overeenkomstig bestaande scènes
`blaasje` (endocytose, lysosoom, assemblage), `ribosoom`, `eiwitjas` (virus), `keten`, `kopieermachine` (replisoom/mmr), `schaar/knipt` (ber, proteasoom), `sleutel`/`slot` (nieuw voor dit zijpad, in titel en legende), `uitsteeksel` (virus gebruikt "virale glycoproteïnen" in de legende; hier is dat "uitsteeksel (sleutel)" gebleven om jargon in beeld te vermijden). Geen jargon in titels of ondertitels: RdRp, Mpro, nsp, TMPRSS2, cathepsine L, ERGIC, PAM, Cas9, vRNP, frameshift en Paxlovid staan alleen in de uitleg, in `simplified`, in `facts` of in `graph.js`.

## Status
De zes knopen zijn na deze ronde aan `CHECKED` in `shared/graph.js` toegevoegd (status "nagekeken").
Niet nagekeken: de bestaande knopen `virus`, `baltimore`, `endocytose`, `lnp` (rondes 1–5), en het handmatig draaien/slepen van de 3D-vensters op een echt toestel.
