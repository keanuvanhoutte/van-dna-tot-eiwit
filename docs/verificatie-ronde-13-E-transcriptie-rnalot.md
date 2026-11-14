# Verificatieronde 13 — pakket E: transcriptie & RNA-lot

**Datum:** 14-11-2026 · **Controleur:** onafhankelijke wetenschappelijke controle (Claude)

## Bereik
- `shared/details/txn.js`: transcriptie, genregulatie, promoter, rnapol, operon, polymerasen
- `shared/details/rna2.js`: lokalisatie, korrels, lncrna, riboswitch
- `shared/details/bact2.js`: alleen het item `vergelijk`
- Scènes: `app/scenes/txn/*` (incl. `_txn.js`, `index.js`), `app/scenes/rna/{lokalisatie,korrels,lncrna,riboswitch}.js`, `app/scenes/bact/vergelijk.js`
- Knoopsamenvattingen in `shared/graph.js` / `graph.en.js` en stapnamen in `shared/steptags.js` (alleen gelezen)

## Methode
- Elke zichtbare uitspraak NL én EN gelezen: kort, what, how, facts, why, sources; in de scènes title, scale, time, org, legend, extra, simplified, staptitels en -teksten en alle labels in de tekening.
- Bronnen gelezen via Europe PMC (metadata + abstract) en NCBI BioC / PMC (volledige tekst): Jonkers, Kwak & Lis 2014 (PMC4001325, volledige tekst); Core & Adelman 2019 (volledig); Roy & Singer 2015 (volledig); Vo Ngoc et al. 2017 (volledig); Juven-Gershon & Kadonaga 2010 (volledig); Deaton & Bird 2011 (volledig); Allen & Taatjes 2015 (volledig); Hsin & Manley 2012 (volledig); Bushnell 2002 (volledig); Misiaszek 2021 (volledig); Girbig 2021 (volledig); Seifert-Davila 2025 (volledig); Orioli 2011 (volledig); Zhou & Van Bortle 2023 (volledig); Lambert 2018 (volledig); Kislauskis 1994 (volledige tekst via Europe PMC); Martin & Ephrussi 2009, Lionnet 2011, Protter & Parker 2016, Li 2013, Wang & Chang 2011, Mattick 2023, Lemay 2011, McCown 2017, Vilar 2003, Edgell 2000 (volledig); abstracts van Weinmann 1974, Kim 1993, Kim Y 1993, Wu 2001, Hieb 2007, He 2016, Grünberg 2012, Gnatt 2001, Cramer 2001, Bernecky 2016, Bushnell & Kornberg 2003, Rasmussen & Lis 1993, Liu & Wang 1987, Schultz 1991, Harley & Reynolds 1987, Lewis 1996, Kimata 1997, Inada 1996, Wilson 2007, Lettice 2003, Wolfe 2000, Kedersha 1999, Hubstenberger 2017, Courel 2019, Engreitz 2016, Holt 2019, Núñez 2022, Hüttelmaier 2005, Serganov 2004, Blechar 2024, Miller 1970, Cahová 2015, Webster 2020, Schwinghammer 2013. GENCODE-statistiekpagina (release 50) gelezen. NCBI Gene (lacZ/lacY/lacA) voor genlengtes.
- NCBI Bookshelf (Alberts, Cooper) gaf een captcha; uitspraken die alleen daarop steunden, zijn met een gelezen artikel bevestigd of herschreven.
- Eigen metingen: `data/pdb/5FLM.cif` (NADFDGD = Rpb1 493–499; Mg²⁺–Asp495 2,28 Å, Asp499 2,17 Å, Asp497 3,42 Å; laatste gemodelleerde Rpb1-residu 1487; brughelix TPTEFFFHAMGG… 832–869; TL 1109–1114 niet gemodelleerd; eiwitafmeting 15,6 × 14,4 × 13,0 nm; som entiteiten A–L = 517 kDa; DNA 39 nt, RNA 20 nt), `data/pdb/1Y26.pdb` (71 nt, residuen 13–83; ADE 90 + 5 MG; ADE N1–U74 N3 2,65 Å; G37–C61 en G38–C60 3,0 Å; grootste afmeting 6,9 nm). RCSB REST: 5FLM = Bos taurus, 3,4 Å; 1Y26 = Vibrio vulnificus, 2,1 Å; 1I6H = S. cerevisiae, 10 eiwitentiteiten.
- Pas na de eigen controle de eerdere verslagen (ronde 1, 2, 5, 11, 13-B) gelezen.

## Per knoop

### transcriptie (details + scène)
- ✅ Matrijs 3′→5′ gelezen, RNA 5′→3′; RNA = coderende streng met U — Alberts (eerder), Gnatt 2001.
- ✅ Hybride ≈ 8–9 bp — Gnatt 2001 ("nine base pairs of DNA-RNA hybrid").
- ✅ Pauze na de start, vrijgave via P-TEFb; NELF laat los, DSIF rijdt mee — Core & Adelman 2019.
- ✅ Positieve supercoils vóór, negatieve achter, topo-isomerasen — Liu & Wang 1987 (nieuwe bron).
- ✅ CTD 52 × YSPTSPS bij gewervelden; Ser5 door CDK7, Ser2 door CDK9 — Hsin & Manley 2012.
- ✅ Pol II leest voorbij de poly(A)-plaats (stap 8) — Hsin & Manley 2012.
- ✅ Pol II schrijft ook de adenovirus-eiwitgenen af — Weinmann 1974.
- ❌ Snelheid "≈ 1–4 kb/min, vaak ≈ 2" en scène-tijd "≈ 30 nt/s ≈ 2–3 kb/min" (rekenfout: 30 nt/s = 1,8 kb/min) → "≈ 0,5–4 kb/min (≈ 8–65 nt/s), gemiddeld ≈ 2 kb/min (≈ 30–40 nt/s)"; scène "≈ 30–40 nt/s ≈ 2 kb/min" — Jonkers, Kwak & Lis 2014 (0,5–4 kb/min; gemiddeld 1,8–2,4 kb/min).
- ❌ simplified "Pol II is hier ~100× trager" → "tientallen keren trager" (eigen berekening: 930 px = ~42 bp in ~48 s ≈ 0,9 nt/s → ~35× trager).
- ❌ Stap 7 "zodra ~20–30 basen RNA uit het enzym steken" → "als het RNA ~20–30 basen lang is"; in facts "(gemeten bij de fruitvlieg)" — Rasmussen & Lis 1993 ("bulk of capping occurs as transcripts pass between 20 and 30 nucleotides").
- 🔧 Staptitel "Het DNA raakt in de knoop" (supercoiling is geen knoop) → "Spanning in het DNA".
- Bronnen toegevoegd: Jonkers 2014, Gnatt 2001, Rasmussen & Lis 1993, Liu & Wang 1987, Core & Adelman, Weinmann.

### genregulatie
- ✅ TF-families (C2H2-zinkvinger, homeodomein, bHLH, bZIP), CBP/p300-HAT's, SWI/SNF, Mediator als brug — Lambert 2018. α-helix in de grote groef — Wolfe 2000 (zinkvinger), Schultz 1991 (CAP, HTH).
- ✅ Mediator 26 subeenheden + kinasemodule van 4 — Allen & Taatjes 2015 (volledige tekst).
- ✅ CTCF + cohesine en lusdomeinen — Merkenschlager & Nora 2016.
- ✅ HDAC's bij repressie — Deaton & Bird 2011 (corepressoren met HDAC-activiteit).
- ✅ p300/CBP acetyleert H3K27 (label) — in lijn met Lambert (p300 als enhancermerker); de inzet tekent dit schematisch.
- 🔧 "kb tot honderden kb (soms ~1 Mb)", scale "≈ 1–100 kb", simplified "vaak tientallen kb" en figuurlabel "… tientallen kb …": geen gelezen bron voor de bereiken → "kan groot zijn, bv. ≈ 1 Mb (enhancer van SHH)", scale "DNA-afstanden ingekort", label "… afstand sterk ingekort …" — Lettice 2003 (ZRS 1 Mb van Shh). Zelfde aanpak als ronde 13-B.

### promoter
- ✅ BREu −38/−32 SSRCGCC, BREd −23/−17 RTDKKKK, TATA (5′-T op −31/−30) TATAWAWR, DPE +28/+32, MTE +18/+27 — Roy & Singer 2015; Vo Ngoc 2017; Juven-Gershon & Kadonaga 2010. Inr YYANWYY (mens) — Juven-Gershon 2010.
- ✅ TATA-box in een minderheid van de promoters — Roy & Singer ("5–7 %"). CpG-eilanden ≈ 70 % van de promoters, meestal zonder TATA en met verspreide start — Deaton & Bird 2011.
- ✅ TBP als zadel in de kleine groef — Kim 1993; TFIIA stabiliseert TBP–TATA — Hieb 2007; TFIIB/BRE — Vo Ngoc 2017; TAF's ↔ Inr/DPE — Juven-Gershon 2010; XPB als translocase opent het DNA — Grünberg 2012, He 2016 (humaan PIC).
- ❌ Pauze "~20–60 nt" (details how, facts en scènestap 8) → "~25–50 nt" — Core & Adelman 2019 ("typically pauses within the region 25–50 nt downstream from the TSS").
- 🔧 Buiging "≈ 80°" → "≈ 80° (in kristalstructuren)" — Wu 2001 (kristallen ≈ 80°, in oplossing sequentieafhankelijk).
- 🔧 DPE-code RGWYV is die van de fruitvlieg (Vo Ngoc 2017: menselijke consensus nog niet bepaald) → vermeld in `extra`.
- Bronnen toegevoegd: Wu 2001, Hieb 2007, Vo Ngoc 2017, Juven-Gershon 2010, He 2016, Hsin.

### rnapol (details + 3D-scène 5FLM)
- ✅ 5FLM: rund, cryo-EM 3,4 Å, 12 subeenheden, ketens A–L/T/N/P, 39 nt DNA + 20 nt RNA — RCSB; rund-Pol II verschilt 7 residuen van de mens — Bernecky 2016.
- ✅ NADFDGD = 493–499, brughelix 832–869, triggerlus 1099–1129 (1109–1114 ontbreken), laatste residu 1487 — eigen meting.
- ✅ ≈ 0,5 MDa (517 kDa), ≈ 15 nm — eigen meting/RCSB. 1I6H = gist, 10 subeenheden zonder Rpb4/7 — RCSB, Cramer 2001.
- ❌ "transcribeert alle eiwitcoderende genen" → "… in de kern" (mitochondriale genen worden door POLRMT afgeschreven) — Schwinghammer 2013.
- ❌ α-amanitine "bij brughelix/triggerlus, blokkeert translocatie" → "bindt onder de brughelix en remt zo het opschuiven" — Bushnell 2002 (bindplaats onder de brughelix; triggerlus niet genoemd).
- 🔧 "Mg²⁺ vastgehouden door drie aspartaten" → "door aspartaten van het NADFDGD-motief" (eigen meting: twee direct, de derde op 3,4 Å).
- 🔧 Rpb4/7 "kunnen het RNA vastpakken" → "pakken mogelijk het RNA vast" (details + scènestap) — Bushnell & Kornberg 2003 ("may bind RNA").
- 🔧 Scène-tijd "≈ 20–50 nt/s" → "gemiddeld ≈ 30–40 nt/s" — Jonkers 2014.

### operon (lac)
- ✅ lacZ/lacY/lacA, polycistronisch, LacI op O1, hulpoperatoren O2/O3, allolactose, IPTG, CAP–cAMP nodig voor sterke transcriptie — Vilar 2003; tetrameer en repressielussen — Lewis 1996; −35 TTGACA, −10 TATAAT, 17 ± 1 bp — Harley & Reynolds 1987; CAP buigt ≈ 90° — Schultz 1991; genlengtes 3075/1254/612 bp — NCBI Gene; gekoppelde transcriptie–translatie — Miller 1970.
- ❌ "toonde (Jacob & Monod) voor het eerst dat genen door eiwitten aan- en uitgezet worden" → "stelden Jacob & Monod in 1961 het operonmodel voor; de schakelaar bleek later het eiwit LacI" — Wilson 2007, Lewis 1996 (dat de repressor een eiwit is, was in 1961 nog niet aangetoond).
- 🔧 Glucose-effect: details, scènestap 5 en simplified noemen nu het cAMP–CAP-verhaal "het klassieke model" en zeggen dat glucose volgens later onderzoek vooral via inducer-uitsluiting werkt — Kimata 1997, Inada 1996.

### polymerasen
- ✅ α-amanitine 50 %: Pol II 0,02 · Pol III 20 · Pol I resistent ≤ 200 µg/ml (KB-cellen); VA/5,5S-RNA via Pol III — Weinmann 1974.
- ✅ Pol I mens 13, gist 14 — Misiaszek 2021; Pol III 17 met RPABC1–5 (5 gedeeld) — Girbig 2021.
- ✅ Promotertypes 1 (A-box, IE, C-box; TFIIIA → TFIIIC → TFIIIB), 2 (A- en B-box), 3 (DSE met OCT1, PSE met SNAPc, TATA) — Seifert-Davila 2025; stop op een reeks T's in de coderende streng — Orioli 2011, Girbig 2021.
- ✅ Pol III-producten (tRNA, 5S, U6, 7SL, 7SK, RNase P-RNA, Y-RNA, vault-RNA) — Zhou & Van Bortle 2023.
- ❌ "Pol II maakt het mRNA van alle eiwitgenen" (stap 3 + label) → "… in de kern".
- 🔧 `extra`: "POLRMT, één subeenheid" en "Planten hebben Pol IV en Pol V" stonden in geen enkele gelezen bron → "heel ander RNA-polymerase (POLRMT), in de verte verwant aan dat van faag T7" — Schwinghammer 2013; zin over planten geschrapt.

### lokalisatie
- ✅ Zipcode van 54 nt "within the first 54 nt of the 3′UTR including the stop codon" in kippenembryofibroblasten; antisense → verspreid mRNA en andere lamellipodia — Kislauskis 1994 (volledige tekst).
- ✅ ZBP1 blokkeert de start van de translatie; Src fosforyleert aan de rand — Hüttelmaier 2005. ZBP1 = IGF2BP1/IMP1 — Núñez 2022. MS2-muis, losse mRNA's in hippocampusneuronen — Lionnet 2011. Motoren langs het cytoskelet — Martin & Ephrussi 2009. Lokale translatie in neuronen — Holt 2019. Geen correcties.

### korrels
- ✅ Stressgranules uit mRNA's die vastzitten in de initiatie; IDR's; "actieve vloeistof"; kleinste ≈ 200 nm — Protter & Parker 2016. TIA-1, omkeerbaar na stress — Kedersha 1999. P-bodies: onderdrukt, niet afgebroken — Hubstenberger 2017; Courel 2019. DCP1/2, XRN1 in P-bodies; TDP-43/FUS en ALS — Li 2013.
- 🔧 "stopt de cel even met eiwitten maken" / staptitel "stopt de cel met vertalen" / "start geen nieuwe eiwitten meer" → "maakt / vertaalt / start veel minder" (te stellig).

### lncrna
- ✅ >200 nt (arbitraire grens), XIST (afstoten van euchromatische factoren, steiger), NORAD vangt Pumilio, minderheid goed bekend — Mattick 2023; vier archetypen — Wang & Chang 2011; transcriptie zelf kan een buurgen regelen — Engreitz 2016; 35 885 lncRNA- vs 19 442 eiwitgenen — GENCODE 50.
- 🔧 Stap 1 "een lang RNA dat nooit vertaald wordt" → "niet vertaald wordt" (Mattick: sommige lncRNA's maken kleine peptiden).

### riboswitch
- ✅ 1Y26: V. vulnificus, röntgen 2,1 Å, 71 nt, adenine + 5 Mg²⁺, A–U74, lus-lusparen G37–C61/G38–C60 — RCSB + eigen meting; ingekapseld purine, WC-paar met U resp. C — Serganov 2004; add werkt op translatie, pbuE (B. subtilis) op transcriptie — Lemay 2011; TPP in schimmels (72), planten (23), algen (4), dieren vrijwel niet, niet bij de mens — McCown 2017.
- ❌ Scale "≈ 6 nm" → "≈ 7 nm" (eigen meting: 6,9 nm).
- 🔧 simplified "bij deze schakelaar helpt ook het ribosoom zelf mee" (geen bron in de lijst) → "helpt ook een eiwit van het ribosoom (S1) het RNA open te vouwen" — Blechar 2024 (nieuwe bron).

### vergelijk (bact2.js-item + scène)
- ✅ Gekoppelde transcriptie–translatie — Miller 1970; expressoom — Webster 2020; zeldzame zelfsplicende introns — Edgell 2000; NAD-kap op een deel van de RNA's — Cahová 2015; koppeling van processing aan transcriptie — Hsin & Manley 2012 (toegevoegd).
- ❌ Figuurlabel "geen kern · geen splicing · geen kap" → "geen spliceosoom · geen kap zoals bij de mens" (bacteriën hebben wél zelfsplicende introns — Edgell 2000).
- 🔧 Tabelrij "5′-kap en staart — bacterie: geen kap" suggereerde dat bacteriën geen poly(A) hebben → rij heet nu "5′-kap".
- 🔧 "kap, splicing en staart gebeuren al tijdens de transcriptie" → "beginnen al tijdens" (details + simplified).
- 🔧 Stap 5 "de kern verdwijnt. Een bacterie is één ruimte" → "In de tekening … verdwijnt de kern. Een bacterie heeft geen kern: het DNA ligt in het cytoplasma."

## Te verwerken in gedeelde bestanden
- `shared/graph.js` (korrels, `s`) · `Bij stress (bv. hitte) valt de start van de translatie stil;` → `Bij stress (bv. hitte) wordt de start van de translatie sterk geremd;`
- `shared/graph.en.js` (korrels) · `Under stress (e.g. heat) translation initiation stalls;` → `Under stress (e.g. heat) translation initiation is strongly inhibited;`

De stapnamen in `steptags.js` passen nog bij de aangepaste staptitels (transcriptie stap 8 "spanning", korrels stap 2 "hitte").

## Verworpen
- Jonkers & Lis 2015 (Nat Rev): blijft als bron voor "snelheid verschilt per gen", maar de getallen kwamen niet uit het abstract; vervangen door Jonkers 2014 (volledige tekst).
- Kim 1993 (TBP): het abstract noemt geen 80°; het getal steunt nu op Wu 2001.
- Bacteriële poly(A)-staarten: niet als uitspraak toegevoegd (geen gelezen bron); de misleidende tabelformulering is weggehaald.

## Eindoordeel
Na deze ronde steunen alle zichtbare uitspraken van pakket E op een gelezen bron of een eigen meting. De ernstigste fouten waren: een te ruim pauzegebied (20–60 i.p.v. 25–50 nt), een interne rekenfout in de elongatiesnelheid, "~100× trager" (eigenlijk ~35×), de α-amanitinebindplaats ("triggerlus"), het cAMP-model van het glucose-effect dat als vaststaand feit stond, en "geen splicing" bij bacteriën. Alle bestanden slagen voor `node --check` en laden zonder fouten. Er moet één NL/EN-paar in de gedeelde bestanden worden verwerkt.
