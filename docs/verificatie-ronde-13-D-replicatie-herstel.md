# Verificatieronde 13 — pakket D: replicatie & herstel

**Datum:** 14-11-2026 · **Controleur:** onafhankelijke wetenschappelijke controle (niet de auteur)

## Bereik
- Knopen in `shared/details/repl.js`: replicatie, replisoom, ssdna, telomeren, herstel, mutaties.
- Knopen in `shared/details/repl2.js`: origins, mmr, ber, ner, dsb, p53.
- Alle scènes in `app/scenes/repl/` (replicatie, origins, replisoom, ssdna, telomeren, herstel, mmr, ber, ner, dsb, p53, mutaties, `_draw.js`, `_mix3d.js`): staptitels en -teksten (NL + EN), labels in de figuur, legend, scale, time, org, simplified, extra, 3D-labels, en de feiten in de tekening (5′→3′, antiparallel, welke streng leidend/volgend, waar CMG zit, primers aan het 5′-uiteinde, gradiëntbanden, codons).
- Knoopsamenvattingen `s` (graph.js), `S_EN` (graph.en.js) en korte stapnamen (steptags.js) voor deze 12 knopen.

## Methode
- **Gelezen volledige teksten** (PMC BioC-API of de PMC-artikelpagina): Burgers & Kunkel 2017; Balakrishnan & Bambara 2013; Kunkel 2009; Kunkel & Erie 2015; Gorman 2007; Krokan & Bjørås 2013; Parikh 2000; Schärer 2013; Reardon & Sancar 2002; Chang 2017; Mao 2008; Sullivan & Bernstein 2018; Chatterjee & Walker 2017; Dueva & Iliakis 2020; Blow & Hodgson 2002; Marks, Fu & Aladjem 2017; de Lange 2009; Nguyen 2018; Ghanim 2021; Kurosaki & Maquat 2016; Kandoth 2013; Olivier 2010; Kumari 2014; Gnanasundram 2021; Meselson & Stahl 1958. **Nieuw gelezen en toegevoegd:** Greenberg & Simon 2022 (vorksnelheid, afstand tussen origins, S-fase), Jones/Reynolds-Winczura/Gambus 2024 (terminatie, CMG-verwijdering), Bell & Labib 2016 (chromatine achter de vork, cohesine), Shay 2016 (telomerase in 85–90 % van de tumoren, stamachtige cellen, telomeerlengte), Kim 1994 (90/101 tumorbiopten telomerase-positief), Méchali 2010 (30 000–50 000 origins per deling).
- **Gelezen samenvattingen (PubMed efetch):** Walker 2001, Cho 1994, Lane 1992, Warren 2007, Li 2023, Bochkarev 1997, Frederico 1990, Cooper & Youssoufian 1988, Mort 2008, Kim 1994, Griffith 1999, Méchali 2010.
- **Andere databanken:** BioNumbers BNID 111770 (citaat uit Méchali 2010); HbVar/Huisman (codon 17 A→T, codons 8/9 +G); dbSNP-API rs713040 (NM_000518.5:c.9T>C, p.His3=, ClinVar benign/likely benign).
- **Metadata** van alle PMC-bronnen via Europe PMC (auteurs, jaar, tijdschrift, volume, pagina) en van alle PDB-ID's via de RCSB-API (titel, resolutie, methode, organisme, ketens).
- **Eigen metingen in de structuurbestanden** (`data/pdb`, Python): 2O8B (Phe432-ring MSH6 op 3,3 Å van T F23 en G F24, 3,4 Å van G E8; E8 = dG, F23 = dT), 1JMC (dC8 = B11–18 volledig gemodelleerd; Phe238, Phe269, Trp361, Phe386 op 3,0–3,4 Å van de basen), 1TUP (zink in A/B/C telkens gebonden door Cys176, His179, Cys238, Cys242; R248 en R273 van keten B raken het DNA), 1EMH (P2U op B5), 7QXA (hTR 451 nt, matrijs 46–56 = 5′-CUAACCCUAAC-3′; 253 van 451 nt gemodelleerd = "ongeveer de helft"; telomeer-DNA (TTAGGG)₅, gemodelleerd 19–30), HBB-coderende sequentie vertaald en codon/HGVS-nummering nagerekend (HbS, codon 17, p.Ser10Valfs\*14 telt 14 codons tot TGA).
- **NCBI Bookshelf (Alberts)** gaf een captcha; uitspraken die alleen op Alberts steunden, zijn met een gelezen review gedekt of herschreven.

## Per knoop

### replicatie
- ✅ Semi-conservatief, Meselson & Stahl PNAS 44:671 (1958); figuur: generatie 0 zwaar, 1 enkel hybride, 2 hybride + licht; zwaarste band onderaan — Meselson & Stahl.
- ✅ Tekening: bovenstreng 5′→3′ L→R; links van de origin bovenaan continu, onderaan rechts continu; Okazaki-fragmenten met de primer aan het 5′-uiteinde; CMG op de leidende-streng-matrijs en 3′→5′ — Burgers & Kunkel.
- ✅ Licentie in late mitose/G1, vuren in S, geen MCM-laden in S/G2/vroege M — Blow & Hodgson.
- ✅ Reserve-origins (dormant) — Marks et al.; vroeg/laat vuren — Marks et al.
- ✅ Vorksnelheid ≈ 1–3 kb/min (eukaryoten; mens 2–3) — Greenberg & Simon 2022; BioNumbers/Méchali. Bron toegevoegd.
- ✅ Terminatie waar vorken samenkomen, CMG wordt verwijderd — Jones et al. 2024 (toegevoegd). Chromatine meteen achter de vork hersteld met ouder- en nieuwe histonen; cohesine houdt zusterchromatiden samen — Bell & Labib 2016 (toegevoegd).
- 🔧 `simplified`: "origins 30–300 kb uit elkaar" stond in geen gelezen bron → "gebruikte origins gemiddeld ruwweg 100–200 kb uit elkaar" (Greenberg & Simon: 120–124 kb in keratinocyten, 189 kb in HeLa).
- ✅ Okazaki-fragment ≈ 200 nt — Balakrishnan & Bambara.

### replisoom
- ✅ Drie polymerasen; Pol ε leidend (aan CMG), Pol δ volgend; CMG 3′→5′ op de leidende-streng-matrijs — Burgers & Kunkel.
- ✅ Primer ≈ 10 nt RNA + ≈ 20(–30) nt DNA — Burgers & Kunkel.
- ✅ Okazaki ≈ 200 nt (eukaryoot) vs ≈ 1200 nt (bacterie); FEN1, RNase H2, ligase I, strengverdringing tot een flap — Balakrishnan & Bambara.
- ✅ Pol α zonder proeflezen ≈ 10⁻⁴; proeflezen verbetert 10–100× — Kunkel 2009.
- ✅ Tekening: richtingen van beide matrijzen, primer rechts (5′) op elk fragment, groeirichting van Pol δ weg van de vork.
- ✅ 3D: 7PFO = core human replisome, cryo-EM 3,2 Å, Jones et al. EMBO J 40:e108819; ketens (2–7 MCM, C Cdc45, D–G GINS, A/B Pol ε, H–J AND-1, K Timeless, L Tipin, Q Claspin, M "leading strand DNA", N "lagging strand DNA") — RCSB. 6XTX (humaan CMG, 3,29 Å), 1AXC (humaan PCNA) — RCSB.

### ssdna
- ✅ Cytosine-deaminatie ≈ 140× sneller in ssDNA — Frederico 1990.
- ✅ 1JMC: humaan RPA70, 2,4 Å, dC8; aromaten Phe238/Phe269/Trp361/Phe386 stapelen op de basen — Bochkarev 1997 + eigen meting.
- ✅ RPA ≈ 30 nt, DBD-A/-B hoogste affiniteit, beschermt tegen nucleasen, haarspelden en G4, ATRIP-binding, doorgeven aan RAD51/NER-factoren, verschuift langs ssDNA — Dueva & Iliakis.
- 🔧 `time`: "RPA bindt in milliseconden" (geen bron) → "bindt sterk, maar wordt snel uitgewisseld en kan verschuiven" (Dueva & Iliakis).

### telomeren
- ✅ TTAGGG, shelterin = 6 eiwitten, TRF1/TRF2 dsDNA, POT1 ssDNA, T-lus via invasie van de 3′-overhang, TRF2 — de Lange 2009; Griffith 1999.
- ✅ hTR 451 nt; matrijs 3′-CAAUCCCAAUC-5′ (11 nt, positie 46–56); paring met …GTTAG-3′ en toevoeging van GGTTAG nagerekend — RCSB-sequentie 7QXA + Ghanim 2021.
- ✅ 7QXA (3,2 Å, Sekne 2022, Science 375:1173), 7BG9 (3,8 Å, Ghanim 2021), 143D (NMR), 1KF1 (2,1 Å) — RCSB.
- ✅ Telomerase in de meeste kankercellen (85–90 %), in stamachtige delende cellen en kiemcellen; telomeren duizenden bp — Shay 2016, Kim 1994 (toegevoegd).
- 🔧 `why`: "defecten in telomerase of shelterin geven dyskeratosis congenita" → "defecten in telomerase" (enkel de telomerase-kant staat in de gelezen bronnen: Ghanim, Nguyen).
- 🔧 `time`: "telomerase: seconden–minuten" (geen bron) → "telomerase voegt telkens 6 letters toe".
- 🔧 `simplified`: lengte van de 3′-overhang ("tientallen tot honderden nt") en "T-lus: kilobasen" stonden in geen gelezen bron → geschrapt resp. "veel kleiner getekend dan in werkelijkheid" (Griffith: "large duplex loop").

### herstel (overzicht)
- ✅ ≈ 10 000 abasische plaatsen per cel per dag — Chatterjee & Walker.
- ✅ BER-, NER-, MMR-, NHEJ- en HR-stappen — Krokan; Schärer; Reardon & Sancar; Kunkel & Erie; Chang; Sullivan.
- ✅ MMR maakt replicatie > 100× nauwkeuriger — Kunkel 2009 (verlies van MMR: 100–1000× meer mutaties).
- ✅ PARP-remmers bij HR-defecte tumoren — Sullivan & Bernstein (bron toegevoegd).
- ❌ Label in de scène "Virussen gebruiken breukherstel" klopt niet: bij integratie knipt integrase zelf; de cel dicht daarna enkelstrengs gaatjes (zie knoop integratie) → "Ingebouwd virus: de cel dicht de gaatjes".
- 🔧 Mini-ladder MMR-rij toonde G·G (commentaar zei G·T) → G·T met de T in de nieuwe streng, zoals in de MMR-scène.

### mutaties
- ✅ HBB-sequentie vertaald: codon 2 CAT→CAC (His, rs713040 c.9T>C, benign — dbSNP), codon 6 GAG→GTG (HbS, p.Glu7Val), codon 17 AAG→TAG, codons 8/9 +G (p.Ser10Valfs\*14) — eigen vertaling + HbVar.
- ✅ 4 transities / 8 transversies (telling); NMD > 50–55 nt, EJC 20–24 nt, ≈ 1/3 van de ziekten door vroege stopcodons — Kurosaki & Maquat. Nonsense ≈ 11 % — Mort 2008. CpG ≈ 35 % (≈ 1/3) — Cooper & Youssoufian.
- 🔧 Label "transities komen vaker voor" (algemene uitspraak zonder gelezen bron) → "vaak bij ziekten: C→T bij CpG, na deaminatie van gemethyleerd C" (Cooper & Youssoufian: > 90 % van de CpG-mutaties zijn C→T/G→A, 42× vaker dan verwacht).

### origins
- ✅ 7W1Y: humane MCM-DH, 2,59 Å; DNA bijna een halve winding vervormd, 1 bp volledig gescheiden — Li 2023 + RCSB.
- ✅ Licentie/vuren/geen herladen — Blow & Hodgson; CMG 3′→5′ — Burgers & Kunkel.
- 🔧 `kort`: "op duizenden plaatsen tegelijk gekopieerd" (origins vuren verspreid over de S-fase, niet tegelijk) → "bij elke deling vanuit tienduizenden startplaatsen" (Méchali 2010: 30 000–50 000; bron toegevoegd).
- 🔧 `extra`: "rond een stuk menselijk DNA" — het DNA in 7W1Y is een poly-AT-proefstuk → "twee menselijke MCM2-7-ringen … rond een kort stuk DNA".

### mmr
- ✅ MMR ≈ 99 % gemiddeld; PCNA-oriëntatie en strengonderbrekingen; EXO1 of strengverdringing — Kunkel & Erie.
- ✅ MutSα glijdt langs het DNA, DNA geknikt 45–60° — Gorman 2007. Phe432 tegen het mispaar — eigen meting 2O8B.
- ✅ Ongeveer de helft van de HNPCC-families door MutSα — Warren 2007. 2O8B 2,75 Å — RCSB.

### ber
- ✅ Minstens 11 glycosylasen bij zoogdieren; korte patch 1 nt, lange patch 2–10 nt; APE1 5′ van de AP-plaats, Pol β + 5′-dRP; ligase IIIα–XRCC1 of ligase I — Krokan & Bjørås.
- ✅ 1EMH 1,8 Å, pseudo-uridine, Tyr147 houdt T buiten — Parikh 2000 + RCSB.
- ❌ `why`: "UNG is van alle DNA-glycosylasen veruit het snelste" — Krokan zegt dit in de vergelijking van de uracil-DNA-glycosylasen → "Van de enzymen die uracil uit DNA halen, is UNG veruit het snelste".
- 🔧 Scène stap 3: "niet bij T of C" — alleen T wordt in Parikh uitdrukkelijk uitgesloten (Tyr147) → "een T past er niet in".

### ner
- ✅ 24–32 nt — Reardon & Sancar. Eerst 5′-incisie door ERCC1–XPF, dan XPG; Pol δ/κ of ε; ligase IIIα–XRCC1 of ligase I; XPC–RAD23B, UV-DDB, CSA/CSB/XAB2; XP > 2000× huidkanker — Schärer 2013.
- ✅ 6RO4: kern-TFIIH + XPA op DNA, 3,5 Å, Kokic 2019 — RCSB.
- 🔧 `why`: "NER is het enige herstel voor UV-schade bij de mens" → "de belangrijkste route; wij missen fotolyase" (Schärer: "main pathway"; Chatterjee & Walker: fotolyase bij lagere organismen en buideldieren, niet bij placentale zoogdieren; bron toegevoegd).

### dsb
- ✅ Ku: voorgevormde ring, steunt twee windingen, geen contact met basen, 2,5 Å — Walker 2001.
- ✅ NHEJ ≈ 30 min, HR ≥ 7 h — Mao 2008. NHEJ : HR ≈ 4 : 1 ook in S/G2, NHEJ in G1 > 50× — Chang 2017. (Mao vindt 3 : 1 in delende cellen in het algemeen; de 4 : 1 voor S/G2 staat letterlijk in Chang.)
- ✅ DNA-PKcs activeert Artemis; XRCC4–ligase IV met XLF/PAXX; V(D)J — Chang. RPA eerst, RAD51 verdringt RPA, BRCA2 als mediator, 3 nt per RAD51 — Sullivan & Bernstein. 8BQ2 (ATP + Ca²⁺, 3,8 Å) — RCSB.
- ✅ Tekening HR: 5′-strengen teruggeknipt, 3′-staarten blijven — Chang/Sullivan.

### p53
- ✅ 42 % in 12 kankertypes — Kandoth. 38–50 % tot ≈ 5 % per type; hotspots contact R248/R273, structureel R175/G245/R249/R282 — Olivier.
- ✅ Ser15/Ser20, ATM/ATR/CHK1/CHK2, MDM2 laat los — Kumari; MRN → ATM — Gnanasundram; PUMA/NOXA/BAX — Gnanasundram.
- ✅ Lus-blad-helix in de grote groef, arginine in de kleine groef, zink houdt twee lussen bij elkaar, 2,2 Å — Cho 1994 + eigen meting (Cys176/His179/Cys238/Cys242).
- ❌ Feit "meestal missense; 87,9 % in codons 125–300" verwisselt twee getallen. Olivier: 86 % van de mutaties ligt in codons 125–300, en daar is 87,9 % missense → aangepast.
- ❌ `why`: "tumoren verliezen p53 vaak als eerste veiligheid" — Olivier: TP53-mutaties zijn vaker in gevorderde stadia → herschreven ("een tumorcel heeft er voordeel bij als p53 uitvalt").
- 🔧 `why`: "Dat verklaart waarom TP53 het vaakst gemuteerde gen is" (oorzakelijke sprong zonder bron) → als losse feitelijke zin (Kandoth).

### Gedeelde bestanden (graph.js, graph.en.js, steptags.js)
- ✅ Alle 12 samenvattingen (NL + EN) stemmen overeen met de gelezen bronnen.
- ✅ Steptags: aantal en volgorde kloppen met de 2D- en 3D-stappen van alle 12 scènes.

## Te verwerken in gedeelde bestanden
Geen. Alle nodige verbeteringen zaten in de eigen bestanden van dit pakket.

## Eindoordeel
Ongeveer 430 uitspraken en tekeningfeiten nagekeken over 12 knopen en 14 scènebestanden. 18 correcties (4 ❌, 14 🔧) en 9 nieuwe, gelezen bronnen toegevoegd. De ernstigste fouten zitten in de getallen en conclusies over p53 (verwisselde percentages, "eerste veiligheid"), een te brede bewering over UNG en een fout verwijzingslabel ("virussen gebruiken breukherstel"). Alle richtingen in de tekeningen (5′→3′, leidende/volgende streng, CMG, primers, resectie) en alle PDB-ID's, ketens, resoluties en organismen kloppen. Alle bestanden zijn gecontroleerd met `node --check`. Na deze ronde zijn er geen open punten in dit pakket.
