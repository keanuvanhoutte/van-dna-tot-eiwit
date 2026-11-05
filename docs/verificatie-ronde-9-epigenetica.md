# Verificatieronde 9 — zijpad "Hoe de cel kiest welke genen aan staan" (05-11-2026)

Nagekeken: de vijf nieuwe knopen `remodeler`, `lussen`, `enhancer`, `xinact`, `imprinting` (graph.js, graph.en.js, shared/details/genome3.js, scènes in app/scenes/genome/) en de overgangszinnen van de verhaallijn `epigen` (app/story.js). De bestaande hoofdstukken `chromatine`, `nucleosoom`, `histonmod` en `dnamethyl` waren al nagekeken; daar zijn alleen verwijzingen bijgekomen (chromatine: de klikzone van paneel ② gaat nu naar `lussen`; `rel` naar de nieuwe knopen).
Methode: elke bewering in kort/what/how/facts/why, stapteksten, labels, schaal/duur en `simplified` vergeleken met de bron in `sources` (opgehaald op 05-11-2026: PubMed-abstracts via E-utilities; volledige teksten van Clapier 2017 en Kadoch 2013 via de PMC-BioC-API). PDB-ID gecontroleerd via `https://data.rcsb.org/rest/v1/core/entry/<ID>` en `/polymer_entity/<ID>/<n>` (organisme per entiteit); ketens en residuen nagekeken in het coördinatenbestand.
Beweringen die eerst alleen door een handboek of een niet gelezen volledige tekst gedekt waren, zijn in de bronnencontrole van 05-11-2026 met een gelezen bron bevestigd. 🔧 = correctie tegenover de opdracht of de eerste versie.

## PDB-structuur

| ID | RCSB-titel | Methode | Organisme | Gebruik | Nagekeken in het bestand |
|---|---|---|---|---|---|
| 7W1M | Cryo-EM structure of human cohesin-CTCF-DNA complex (Zhang et al., Mol Cell 2023, PubMed 37536339) | cryo-EM 6,5 Å | alle 8 entiteiten *Homo sapiens* | `lussen` (3D in stap 3 en 5) | A = SMC1A (399 CA: vooral de kop, res. 2–162 en 1027–1225), B = SMC3 (528 CA), C = RAD21, D = STAG1 (SA1), E = NIPBL (1193–2628), F + G = DNA (2 × 118 nt, 107 P), H = CTCF (223–577). Het N-terminale motief van CTCF (res. 223–231) ligt ≈ 6 Å van STAG1, de zinkvingers ≈ 6 Å van het DNA (zoals Zhang beschrijft). Lokaal ingekort tot CA/P (34 251 → 3 904 atomen) en star gedraaid (lange as = y, CTCF onderaan), 0,32 MB |

Kandidaten die afvielen: 6WG3 (mens, cohesine–NIPBL–DNA, 5,3 Å) bevat geen CTCF en kan dus het stoppen niet tonen; 6YUF (cohesine met lader, 3,9 Å) bevat evenmin CTCF. 🔧 Omdat van de SMC-armen vooral de koppen opgelost zijn, zegt de stap niet "lange armen" maar "de ring en zijn helper houden het DNA vast"; `simplified` vermeldt dit.

## Beweringen per knoop

### remodeler — Clapier et al. 2017 (PMC8127953, volledige tekst), Clapier & Cairns 2009 (PubMed 19355820), Kadoch et al. 2013 (PMC3667980, volledige tekst), Kadoch & Crabtree 2015 (PMC4640607)
- ✅ ATP-afhankelijke remodelers verschuiven (sliding), werpen uit (ejection) of bouwen histonvarianten in; alle families hebben een ATPase-translocase-motor die DNA verplaatst vanaf een vaste plaats in het nucleosoom — Clapier 2017 (abstract).
- ✅ Vier subfamilies: ISWI, CHD, SWI/SNF, INO80 — Clapier 2017 (tekst).
- ✅ "Alleen SWI/SNF-remodelers kunnen nucleosomen uitwerpen" (hogere translocatie-efficiëntie) — Clapier 2017; in de app: "vooral SWI/SNF".
- ✅ Histonen wisselen: SWR1C, SRCAP, p400 (INO80-subfamilie); ISWI en CHD als assemblage-/spacing-remodelers — Clapier 2017.
- ✅ Activatoren kunnen remodelers aantrekken en uitwerpen bevorderen — Clapier 2017.
- ✅ mSWI/SNF-subeenheden gemuteerd in 19,6 % van alle menselijke tumoren (44 studies) — Kadoch 2013 (abstract). 🔧 Opdracht zei "≈ 20 %": in de app "ongeveer één op de vijf" en in de feiten exact 19,6 %.
- ✅ Voorbeelden SMARCA4 (BRG1), SMARCB1 (hSNF5, rhabdoïde tumoren), ARID1A — Kadoch 2013 (tekst).

### lussen — Davidson et al. 2019 (PubMed 31753851), Davidson & Peters 2021 (PubMed 33767413), Rao et al. 2014 (PMC5635824), Rao et al. 2017 (PMC5846482), Dixon et al. 2012 (PMC3356448), Fudenberg et al. 2016 (PMC4889513), Gabriele et al. 2022 (PMC9069445), Zhang et al. 2023 (PubMed 37536339)
- ✅ Eén menselijk cohesinecomplex vormt symmetrisch lussen tot 2,1 kb/s; afhankelijk van ATPase en NIPBL–MAU2; cohesine en NIPBL zitten aan de voet van de lus → extrusie — Davidson 2019.
- ✅ Lussen en TADs; lusextrusiehypothese; CTCF-afhankelijke grenzen; rol bij enhancer–promotercontact — Davidson & Peters 2021; Fudenberg 2016; Dixon 2012 (TADs, "megabase-sized").
- ✅ Contactdomeinen mediaan 185 kb; lusankers binden meestal CTCF; > 90 % van de CTCF-plaatsen aan lusankers convergent — Rao 2014.
- ✅ Afbraak van cohesine → alle lusdomeinen weg; na herstel vormen veel megabase-lussen zich binnen een uur — Rao 2017.
- ✅ Het N-terminale motief van CTCF bindt STAG1 en blokkeert cohesine alleen als het N-uiteinde naar cohesine wijst ("daarom telt de richting") — Zhang 2023.
- ✅ "Volgens het huidige model … in levende cellen beweeglijk en vaak maar half af": Fbn2-lus volledig gesloten ≈ 3–6,5 % van de tijd, ≈ 92 % van de tijd lussen binnen de TAD zonder beide grenzen te overbruggen (muis-ES-cellen, één locus) — Gabriele 2022. In de feiten staat "één locus, muis".
- ✅ Schaal "≈ 50 000 tot 1 miljoen bp": zoals in de al nagekeken scène `chromatine`; mediaan 185 kb (Rao) valt erbinnen.

### enhancer — Soutourina 2018 (PubMed 29209056), Schoenfelder & Fraser 2019 (PubMed 31086298), Lettice et al. 2003 (PubMed 12837695), Rao et al. 2014
- ✅ Mediator geeft signalen van activatoren op enhancers door aan het PIC op de promoter; algemeen nodig voor Pol II-transcriptie — Soutourina.
- ✅ Enhancers maken fysiek contact met hun promoters, vaak over grote afstanden; de 3D-architectuur maakt contacten mogelijk en begrenst ze — Schoenfelder & Fraser.
- ✅ ZRS ligt in intron 5 van LMBR1, 1 Mb van SHH; puntmutaties in de ZRS → preaxiale polydactylie — Lettice. Ondertitel "een extra vinger"; feiten: "aan de duimkant".
- 🔧 "Typische afstand tientallen kb" niet in de gelezen bronnen → vervangen door "kan groot zijn: tot ≈ 1 Mb".
- 🔧 "Werken in beide oriëntaties" (handboek) geschrapt: niet in de gelezen bronnen.
- ✅ "Vaak binnen dezelfde lus of TAD": Jang & Yoo 2026, *Exp Mol Med* 58:1734 (PMC13324790, volledige tekst): lussen verbinden enhancers met hun promoters en "loops are organized within TADs, which function as insulated regulatory neighbourhoods that restrict enhancer activity to appropriate targets". Toegevoegd aan `sources` (bronnencontrole 05-11-2026).

### xinact — Lyon 1961 (PubMed 13764598), Brown et al. 1991 (PubMed 1985261), Clemson et al. 1996 (PMC2120729), Carrel & Willard 2005 (PubMed 15772666), Tukiainen et al. 2017 (PMC5685192), Patrat et al. 2020 (PubMed 31900287), Kaelin et al. 2025 (PMC12187551)
- ✅ Eén X willekeurig inactief in vrouwelijke zoogdiercellen (Lyon); dosiscompensatie — Patrat (abstract).
- ✅ XIST wordt alleen van het inactieve X gemaakt — Brown; XIST-RNA bedekt ("paints") het inactieve X in de interfase — Clemson.
- ✅ ≈ 15 % van de X-genen ontsnapt, ≈ 10 % wisselend — Carrel & Willard. 🔧 Opdracht zei "15–25 %": in de app "ongeveer 15 %"; Tukiainen (onvolledige inactivatie bij ≥ 23 % van de X-genen) staat als extra bron.
- ✅ Oranje vacht = X-gebonden (5-kb-deletie → ARHGAP36); oranje/zwarte vlekken bij lapjes- en schildpadkatten tonen de willekeurige X-inactivatie — Kaelin 2025. 🔧 "Lapjeskatten zijn bijna altijd vrouwtjes" niet gebruikt (niet in de bron).
- ✅ "Bij de mens rond de innesteling": Park, Yin & Theunissen 2026, *Cell Mol Life Sci* 83:23 (PMC12775239, volledige tekst): "Upon implantation, one X chromosome is randomly inactivated in the embryonic lineages"; ook Fukuda 2026 (PMC13542833): begin van willekeurige XCI rond dag 8–10. Park toegevoegd aan `sources` (bronnencontrole 05-11-2026).
- ✅ Barr-lichaampje = het compacte inactieve X: Fu et al. 2026, *Genes Dis* 13:101964 (PMC13196324, volledige tekst): het Barr-lichaampje "became recognized as the cytological manifestation of X chromosome inactivation"; het stille X neemt "a condensed, heterochromatic state, corresponding to the Barr body" aan. Toegevoegd aan `sources` (bronnencontrole 05-11-2026).
- 🔧 Uit de uitleg geschrapt (geen bron gelezen): "met DNA-methylatie en histonmerktekens" en "draagsters van X-gebonden ziekten hebben mildere verschijnselen".

### imprinting — Bartolomei & Ferguson-Smith 2011 (PMC3119911), Bell & Felsenfeld 2000 (PubMed 10839546), Monk et al. 2019 (PubMed 30647469), Buiting 2010 (PubMed 20803659), Heard & Martienssen 2014 (PMC4020004), Horsthemke 2018 (PMC6065375)
- ✅ ≈ 100 geïmprinte genen gerapporteerd bij zoogdieren; ICR's met ouderspecifieke merktekens (DNA-methylatie) uit de kiemlijn, behouden na de bevruchting ondanks herprogrammering — Bartolomei. 🔧 Opdracht zei "≈ 100–200": alleen "≈ 100 (2011)" is gedekt; `simplified` vermeldt dat later meer kandidaten gevonden zijn.
- ✅ Merktekens worden in de kiemlijn gezet, onderhouden en gewist — Monk (abstract).
- ✅ IGF2 alleen van het vaderlijke, H19 alleen van het moederlijke allel; gedeelde enhancer; vaderspecifieke methylatie stroomopwaarts van H19; CTCF-afhankelijke grens die door methylatie wordt uitgeschakeld — Bell & Felsenfeld.
- ✅ 15q11–q13: SNORD116 en andere vaderlijk tot expressie gebrachte genen (PWS); UBE3A in de hersenen alleen van het moederlijke allel (AS); de vaakste oorzaak is een de-novodeletie — Buiting.
- ✅ Transgenerationele epigenetische overerving bij de mens niet aangetoond (verstrengeld met genetische, ecologische en culturele overerving); wel bij planten, nematoden, fruitvliegen — Horsthemke; Heard & Martienssen ("in humans remain unclear"). Staat als feit en als waarschuwing tegen de mythe in `imprinting`.
- ✅ IGF2 en H19 op chromosoom 11 (in `simplified`): Papulino et al. 2020, *Front Genet* 11:563718 (PMC7522569, abstract): het geïmprinte gebied 11p15.5 bevat "IGF2" en "H19". Toegevoegd aan `sources` (bronnencontrole 05-11-2026).

### Verhaallijn `epigen` (app/story.js)
- ✅ De overgangszinnen herhalen alleen beweringen hierboven of uit de al nagekeken hoofdstukken (nucleosoom = DNA rond acht histonen; methylgroep op DNA).

## Testen (05-11-2026)
- `tools/check.html`: 108 knopen, 108 scènes, 108 uitlegteksten, PROBLEMS (0).
- `tools/text-check.html?w=1000&min=13` voor de vijf nieuwe scènes en `chromatine`: 0 te kleine teksten, 0 drukke stappen.
- `tools/clip-check.html`: 0 afgesneden elementen. `tools/blank-check.html`: 0 meldingen voor de nieuwe scènes (de bestaande melding bij `chromatine` stap 2 hoort bij de zoomovergang van die scène en is niet nieuw).

## Bronnencontrole (05-11-2026)
- 4 eerder open nuances: alle 4 met een gelezen bron bevestigd (✅; Jang & Yoo 2026, Park et al. 2026, Fu et al. 2026, Papulino et al. 2020) en aan `sources` toegevoegd. 0 onzekere punten.
