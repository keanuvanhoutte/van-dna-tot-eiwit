# Verificatie ronde 13 — pakket F-rna

**Datum:** 14-11-2026
**Bereik:** knopen `rnaprocessing`, `capping`, `splicing`, `polya`, `export`, `nmd`, `rnai`, `mrnaafbraak`, `editing`, `rnastructuur` — `shared/details/rna.js` en de scènes `app/scenes/rna/{rnaprocessing, capping, splicing, polya, export, nmd, rnai, mrnaafbraak, editing, rnastructuur, _rna}.js` (NL en EN), plus de knoopsamenvattingen in `shared/graph.js` / `shared/graph.en.js` en de staptags in `shared/steptags.js` (alleen gelezen).

## Methode
- Elke zichtbare uitspraak (kort, what, how, facts, why, staptitels/-teksten, labels in de figuur, legend, extra, simplified, time, org) is tegen een **gelezen** bron gelegd. Volledige teksten via de PMC BioC-API of NCBI efetch (db=pmc); samenvattingen via PubMed efetch; metadata via Europe PMC en Crossref; PDB-gegevens via de RCSB-API.
- Alberts (NCBI Bookshelf) gaf een captcha en kon niet gelezen worden; elke uitspraak die daar steunde, is opnieuw gestaafd met een gelezen review of artikel.
- Eigen metingen in `1EHZ` (gedownload van RCSB): afstand anticodon (nt 34–36) tot het CCA-uiteinde (P van A76) = 67,6–75,9 Å (nt 35: 73,0 Å) → "≈ 75 Å" klopt; G4·U69-wobble: N1–O2 2,82 Å en O6–N3 2,91 Å (derde afstand 3,79 Å) → "2 H-bruggen" klopt; lengte 76 nt.
- RCSB: 5YZG (mens, C-complex, 4,1 Å, Zhan 2018), 5XJC (mens, C*, 3,6 Å, Zhang 2017), 1EHZ (gist-tRNA^Phe, 1,93 Å, Shi & Moore 2000), 1ANR (HIV-1 TAR, NMR, sequentie GGCAGAUCUGAGCCUGGGAGCUCUCUGCC = nt 17–45), 2OEU (volledig hammerhead-ribozym met Mn²⁺, 2,0 Å), 1RNK (MMTV-frameshift-pseudoknoop, NMR), 4UG0 (menselijk 80S, 3,6 Å) — allemaal correct benoemd.
- Sequenties in de tekeningen nagerekend: haarspeld GGAUGCUUCGGUAUCC (G5·U12-wobble, cUUCGg-lus), TAR-paren 17–45 … 29–36 met bulge U23-C24-U25 en lus 30–35, let-7a-5p UGAGGUAGUAGGUUGUAUAGUU (22 nt), GluA2 A tegenover C, apoB CAA/UAA met de "mooring"-sequentie stroomafwaarts — allemaal correct. Richtingen (5′→3′, antiparallel, MID bij het 5′-einde van de gids, exosoom 3′→5′ op het 5′-fragment en XRN1 5′→3′ op het 3′-fragment na de SMG6-knip) kloppen.
- Pas na de eigen controle de eerdere verslagen gelezen (ronde 2, 3, 5); hun conclusies over IP6, "5′-uiteinde eerst", "meerdere NXF1 per mRNP" en "eerste RNA-kristalstructuur" zijn hier **niet** overgenomen (zie hieronder).

### Gelezen bronnen (selectie)
Kumar et al. 2019 (PMC6900580) · Tian & Manley 2017 (PMC5483950) · West et al. 2004 (PMID 15565158) · Mills et al. 2025 (PMC12599247) · Chen et al. 2024 (PMC11802349) · Raices & D'Angelo 2022 (PMC8789946) · Lin et al. 2018 (PMC5998080) · Grünwald & Singer 2010 (PMID 20844488) · Lejeune 2017 (PMC5437961) · Boehm et al. 2021 (PMC8233366) · Lejeune et al. 2002 (PMID 12093754) · Hall & Thein 1994 (PMID 8161774) · Wilkinson et al. 2020 (PMID 31794245) · Fica et al. 2013 (PMID 24196718) · Jurica & Moore 2003 (PMID 12887888) · Pan et al. 2008 (PMID 18978789) · Huang et al. 2026 (PMC13493724) · Nishimura et al. 2022 (PMC9459249) · Buerer et al. 2024 (PMC11139901) · O'Brien et al. 2018 (PMC6085463) · Bartel 2018 (PMC6091663) · Kim et al. 2016 (PMID 26976605) · Park et al. 2017 (PMID 29040713) · Kiseleva et al. 2026 (PMC12840921) · Pavanello et al. 2023 (PMC10157403) · Vidya & Duchaine 2022 (PMC8984151) · Borbolis & Syntichaki 2015 (PMC4710634) · Morton et al. 2018 (PMC5769741) · Dolicka et al. 2020 (PMC7554771) · Shuvalova et al. 2025 (PMC11894530) · Dahm et al. 2026 (PMC12860496) · Song et al. 2022 (PMC8651834) · Datta et al. 2023 (PMC10947335) · Matthews et al. 2016 (PMC4918759) · Wright & Vissel 2012 (PMC3324117) · Wang & Cheng 2024 (PMC11439182) · UniProt P04114 · Shi & Moore 2000 (PMID 10943889) · Egli & Manoharan 2023 (PMC10085713) · Lv et al. 2019 (PMC6451107) · Cheong et al. 1990 (PMID 1696688) · Aboul-ela et al. 1996 (PMC146214) · Shen & Tinoco 1995 (PMID 7723043) · Sperschneider & Datta 2010 (PMC2853144) · Chi et al. 2008 (PMC2553840) · Nissen et al. 2000 (PMID 10937990) · Guerrier-Takada et al. 1983 (PMID 6197186) · Šponer et al. 2018 (PMC5920944).

## Resultaten per knoop

### rnaprocessing
- ✅ Processing tijdens transcriptie; cap → splicing → knip + poly(A) → export — Chen 2024, Mills 2025.
- 🔧 "CTD (herhalingen van YSPTSPS)" → "52 herhalingen van 7 aminozuren" — de gelezen bron (Mills 2025) noemt 52 heptapeptiden, niet de sequentie.
- 🔧 Cap "na ≈ 20–30 nt" → "≈ 25–30 nt" — Chen 2024: "after the synthesis of the first 25–30 nucleotides".
- 🔧 Poly(A) "≈ 200–250 A (zoogdieren)" → "≈ 250 A (mens)" — Kumar 2019: "∼250 As in human"; ook in stap 10 van de scène.
- ✅ Spliceosoom U1, U2, U4/U6, U5 + >100 eiwitten — Huang 2026, Jurica & Moore 2003 (≈ 100 → bijna 200 geïdentificeerd).
- 🔧 Scène-`simplified`: "~100–150 eiwitten" → "meer dan 100 eiwitten" (Jurica & Moore).
- ✅ EJC ≈ 20–24 nt vóór de junctie (in de tekening 66 px = 22 nt) — Lejeune 2017.
- ✅ CPSF/AAUAAA, CstF/GU-rijk, CPSF73 knipt 10–30 nt verder, PABPN1 — Kumar 2019, Tian & Manley 2017, Mandel 2006.
- ✅ Xrn2-torpedo — West 2004.
- ✅ Stap 3 (U1 en U4 vertrekken, U2/U6 vormen het actieve centrum) — Wilkinson 2020, Fica 2013.

### capping
- ✅ RNGTT (trifosfatase + guanylyltransferase), RNMT + RAM, m⁷GpppN = cap 0, CMTR1 = cap 1, "omgekeerde G" — Mills 2025.
- ✅ CBC (CBP80/CBP20) → eIF4E in het cytoplasma — Lejeune 2017, Mills 2025.
- 🔧 "≈ 20–30 nt" → "≈ 25–30 nt" (what + facts) — Chen 2024.
- 🔧 "nodig voor splicing van het eerste intron" → "helpt bij splicing" — Mills 2025 zegt dat de cap splicing ondersteunt; de specifieke regel over het eerste intron staat in geen gelezen bron.
- ✅ CBC trekt TREX aan — Chen 2024. ✅ Decapping door DCP2 — Mills 2025, Vidya & Duchaine 2022.

### splicing
- ✅ Consensus GU…AG (meestal) — Nishimura 2022 (>99 % van de intronen U2-type, GT–AG).
- ✅ U1 op 5′SS; U2AF65 op (Py)n, U2AF35 op 3′SS; U2 op het vertakkingspunt (A-complex); tri-snRNP (B-complex) — Huang 2026, Wilkinson 2020.
- ✅ U6 neemt de 5′SS over van U1 en vormt met U2 het RNA-actieve centrum met 2 metaalionen; ribozym — Wilkinson 2020, Fica 2013.
- ✅ Twee transesterificaties, lariat; DBR1 ontvertakt — Huang 2026, Buerer 2024.
- ✅ Alternatieve splicing bij ≈ 95 % van de genen met meerdere exonen — Pan 2008 (ook Lejeune 2017).
- ✅ Splicesitemutaties als frequente ziekteoorzaak — Huang 2026.

### polya
- ✅ AAUAAA (variant AUUAAA = A[A/U]UAAA), CPSF30/WDR33, CstF, knip 10–30 nt, "vaak na een CA" — Kumar 2019, Tian & Manley 2017.
- 🔧 "≈ 200–250 A" → "≈ 250 A" (how + facts) — Kumar 2019.
- ✅ PABPN1 → PABPC1, deadenylatie, gesloten lus, alternatieve polyadenylatie — Lejeune 2017, Shuvalova 2025, Tian & Manley 2017.

### export
- ✅ NXF1–NXT1, geen RanGTP voor bulk-mRNA (CRM1/Exportine-5 wel) — Chen 2024.
- ✅ TREX (THO, UAP56, ALYREF) via CBC en EJC; TPR-korf; FG-herhalingen (ongeordend) — Chen 2024, Raices & D'Angelo 2022.
- ✅ NPC mens ≈ 120 nm, ≈ 110 MDa, ≈ 30 nucleoporines, 8-voudig — Raices & D'Angelo 2022.
- ✅ Doortocht ≈ 0,2 s (180 ± 10 ms) — Grünwald & Singer 2010.
- ❌ "DDX19, geactiveerd door Gle1 (+ IP6)" en het label "IP6" in de menselijke scène — Lin et al. 2018 (al als bron vermeld!) tonen dat **menselijk DDX19 geen IP6 nodig heeft**, in tegenstelling tot gist → "bij gist ook door IP6"; label "IP6 (gist)"; `simplified` aangepast.
- ❌ "5′-uiteinde voorop" (details) / "kapje voorop" (stap 5) — staat in geen gelezen bron; Grünwald & Singer zien mRNA zelfs in beide richtingen bewegen in de porie → geschrapt; `simplified` meldt dat de getekende richting een voorbeeld is.
- 🔧 "UAP56 helpt ALYREF het mRNA over te dragen …; een mRNP draagt meerdere kopieën" → "ALYREF (met THOC5) bindt NXF1–NXT1 en zet die aan om het mRNA te binden" — Chen 2024; het aantal NXF1 per mRNP is in geen gelezen bron gevonden.
- ✅ CBC → eIF4E, PABPN1 → PABPC1, eerste ribosoom verwijdert EJC's — Lejeune 2017.

### nmd
- ✅ 50–55 nt-regel, EJC 20–24 nt, UPF3B/UPF2, SURF (SMG1–UPF1–eRF1–eRF3), fosforylatie, SMG6 knipt nabij de PTC, SMG5–SMG7 → CCR4–NOT/decapping — Lejeune 2017, Boehm 2021.
- ✅ Pioniersronde op CBC-mRNA — Lejeune 2002; NMD ook op eIF4E-mRNA — Lejeune 2017.
- ✅ β⁰39 (CAG → UAG, codon 39 in exon 2): dragers zonder klachten, bijna geen mutant mRNA; PTC's in exon 3 ontsnappen en geven een ernstiger fenotype — Hall & Thein 1994 (nieuwe bron).
- ✅ Read-through als therapie — Lejeune 2017.

### rnai
- ✅ ≈ 22 nt, Microprocessor = 1 Drosha + 2 DGCR8, stam ≈ 35 bp, 2-nt-3′-overhang, Exportine-5 + RanGTP, Dicer (+ TRBP), HSC70/HSP90, seed nt 2–8, 3′-UTR, GW182/TNRC6 → PAN2–PAN3/CCR4–NOT — Bartel 2018, O'Brien 2018.
- ❌ "pri-miRNA met cap en poly(A)" — Bartel 2018: alle canonieke pri-miRNA's hebben een cap, maar **niet noodzakelijk een poly(A)-staart** → "met cap".
- 🔧 pre-miRNA "≈ 60–70 nt" → "≈ 60 nt" — Bartel 2018.
- ✅ "vrijwel alleen AGO2 knipt (AGO3 slechts beperkt)" — Park 2017 (AGO3 knipt alleen met sommige gidsen).
- ✅ AGO2 knipt tegenover nt 10–11 — Kiseleva 2026.
- ✅ "Eén miRNA → honderden mRNA's" (> 300 sites per familie) en "groot deel van de genen" — Bartel 2018.
- 🔧 "siRNA-geneesmiddelen (bv. tegen leverziekten)" → "bv. givosiran tegen acute hepatische porfyrie" — Kiseleva 2026 noemt patisiran (amyloïdose) en givosiran.

### mrnaafbraak
- ✅ Deadenylatie eerst en snelheidsbepalend; PAN2–PAN3 dan CCR4–NOT; LSm1–7/Pat1 → DCP1–DCP2 → XRN1 — Pavanello 2023.
- ✅ DCP2 geeft m⁷GDP + 5′-monofosfaat-RNA; DcpS (m⁷GpppN → m⁷GMP); P-bodies; decapping-activatoren (Edc3/4, Ddx6) — Vidya & Duchaine 2022.
- ✅ Exosoom 3′→5' met het SKI-complex — Borbolis 2015, Morton 2018. 🔧 Label "SKI2·3·8" (gistnamen in een menselijke scène) → "SKI-complex".
- ✅ ARE (AUUUA), TTP → CCR4–NOT, cytokines — Dolicka 2020, Pavanello 2023.
- ✅ Halfwaardetijd minuten tot vele uren — Borbolis 2015.
- ✅ Gesloten lus eIF4E–eIF4G–PABP — Shuvalova 2025.
- 🔧 Vaccinzin "(gemodificeerde nucleosiden, optimale UTR's en poly(A))" → "(gemodificeerde nucleosiden, een aangepaste cap en poly(A)-staart)" — Dahm 2026.
- 🔧 Scène-`extra` "Afbraak is net zo belangrijk als transcriptie" (niet gestaafd) → "Naast transcriptie bepaalt ook afbraak hoeveel er van een mRNA is (halfwaardetijd van minuten tot vele uren)".
- 🔧 Scène-`simplified`: "≈ 200–250 nt" → "≈ 250 nt"; "(bv. via SMG6 of IRE1)" → "(bv. via SMG6)" (IRE1 niet gestaafd).

### editing
- ✅ ADAR1/ADAR2 actief, ADAR3 katalytisch inactief; dsRBD's + deaminasedomein; base-flipping; inosine gelezen als G door ribosoom en spliceosoom; Alu; ADAR1/MDA5; therapie — Datta 2023, Song 2022, Matthews 2016.
- ✅ GluA2 Q/R: CAG → CIG ≙ CGG, ≈ 99–100 % ge-edit, ECS in intron 11, Ca²⁺-ondoorlaatbaar — Wright & Vissel 2012.
- ✅ ADAR2 als dimeer — Song 2022.
- ✅ APOBEC1 + A1CF, C6666 → U, codon 2153 CAA → UAA, mooring-sequentie stroomafwaarts, RBM47, darm vs. lever — Wang & Cheng 2024.
- ✅ apoB-48 ≈ 48 % (residu 28–2179 = 2152 aa van 4536 aa = 47,4 %), chylomicronen vs. VLDL/LDL — UniProt P04114.

### rnastructuur
- ✅ 2′-OH, C3′-endo, A-vorm ≈ 11 bp/winding, sterk gekantelde basen; B-DNA ≈ 10 bp — Egli & Manoharan 2023. ✅ Diepe smalle grote groef, ondiepe brede kleine groef — Lv 2019.
- 🔧 Scène-`extra` NL "de 2′-OH verhindert C2′-endo" → "maakt C2′-endo ongunstig" (Egli: ribonucleotiden nemen soms toch de South-vorm aan; EN had al "disfavours").
- ✅ G·U-wobble met 2 H-bruggen (eigen meting 1EHZ G4·U69); G·U komt vaak voor — Egli 2023.
- ✅ cUUCGg-tetralus zeer stabiel — Cheong 1990. ✅ TAR-bulge U23-C24-U25, Tat bindt de bulge — Aboul-ela 1996.
- ✅ Pseudoknoop = kruisende paren, niet in klassieke (niet-kruisende) dynamische programmering — Sperschneider & Datta 2010; MMTV-voorbeeld — Shen & Tinoco 1995.
- ✅ tRNA ≈ 76 nt, L-vorm, ≈ 75 Å (eigen meting).
- ❌ "eerste RNA-kristalstructuur (gist-tRNA^Phe)" — staat niet in een gelezen bron (Shi & Moore 2000 spreken van een "classic structure" waarvan de voorgangers > 20 jaar eerder bepaald zijn) → "klassieke kristalstructuur van gist-tRNA^Phe (PDB 1EHZ = herbepaling uit 2000)".
- ✅ Hammerhead: 2′,3′-cyclisch fosfaat + 5′-OH — Chi 2008. ✅ Ribosoom = ribozym — Nissen 2000. ✅ RNase P-RNA katalytisch — Guerrier-Takada 1983. ✅ Spliceosoom U2/U6 — Fica 2013.
- ✅ Vouwing µs – s — Šponer 2018.

### Bronnenlijst
Ongeveer 40 bronnen toegevoegd of van auteurs/jaar voorzien in `shared/details/rna.js`, zodat elke uitspraak een gelezen bron heeft; alle ingevoegde bronnen zijn gelezen (volledige tekst of samenvatting) en de metadata zijn gecontroleerd via Europe PMC/Crossref.

## Te verwerken in gedeelde bestanden
- `shared/graph.js` · `poly(A)-polymerase voegt een staart toe van ~200–250 A` → `poly(A)-polymerase voegt een staart toe van ~250 A`
- `shared/graph.en.js` · `poly(A) polymerase adds a tail of ~200–250 A` → `poly(A) polymerase adds a tail of ~250 A`

(De staptags in `shared/steptags.js` kloppen met het aantal stappen en de inhoud; geen wijziging nodig. De andere knoopsamenvattingen kloppen.)

## Eindoordeel
Ongeveer 300 uitspraken nagekeken, 18 correcties (4 ❌, 14 🔧). De ernstigste fouten zaten in uitspraken die eerdere rondes hadden goedgekeurd: IP6 als activator van menselijk DDX19 (tegengesproken door een bron die de app zelf al citeerde), "mRNA gaat kapje voorop door de porie" (niet gestaafd), en pri-miRNA's die altijd een poly(A)-staart zouden hebben. Na deze ronde steunt elke uitspraak in pakket F-rna op een gelezen bron of op een eigen meting. Alle bestanden slagen voor `node --check`; er is niets gecommit.
