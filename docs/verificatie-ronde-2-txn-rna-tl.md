# Verificatie ronde 2 — stages `txn`, `rna`, `tl`

Datum: 29 september 2026
Bereik: uitlegpanelen `shared/details/{txn,rna,tl}.js` (what/how/facts/why + bronnen, NL en EN),
scèneteksten (`steps`, `simplified`, `extra`, `time`, `scale`, zichtbare labels via `L()/L3()/T2()`)
in `app/scenes/{txn,rna,tl}/*.js`, en de knoopsamenvattingen (`s` in `shared/graph.js`, `S_EN` in
`shared/graph.en.js`) van 27 knopen. Wat in ronde 1 al beslecht werd (o.a. Pol II-snelheid,
43S/48S, SECIS-locatie, 75 Å tRNA, CTD 52 heptaden, 1I6H = 10 subeenheden) is niet opnieuw
uitgezocht, alleen gecontroleerd of het nu correct in de teksten staat.

Legenda: ✅ klopt · ⚠️ nuance/klein punt · ❌ fout (gecorrigeerd)

Na alle wijzigingen: alle gewijzigde .js-bestanden parsen, en `tools/check.html` meldt
**72 nodes · 72 scenes · 72 details · PROBLEMS (0)**.

---

## Samenvatting van de wijzigingen

| # | Verdict | Bestand | Voor → na |
|---|---|---|---|
| 1 | ❌ | `shared/details/txn.js` (`polymerasen`, how + facts, NL/EN) | "Pol I (14 subeenheden)" / "Pol I 14 · Pol II 12 · Pol III 17" → "Pol I (13 subeenheden bij de mens, 14 in gist)" / "Subeenheden (mens): Pol I 13 · Pol II 12 · Pol III 17 (gist-Pol I: 14)" |
| 2 | ❌ | `app/scenes/txn/polymerasen.js` | legende "Pol I (14)" → "Pol I (13)"; `nsub = [14,12,17]` → `[13,12,17]`; stap 1 "met 14, 12 en 17 subeenheden" → "bij de mens hebben ze 13, 12 en 17 subeenheden (gist-Pol I: 14)" (NL/EN) |
| 3 | ⚠️→fix | `shared/details/txn.js` (`transcriptie`, facts) | "≈ 1–4 kb/min, vaak ≈ 2 kb/min (≈ 20–50 nt/s)" → "≈ 1–4 kb/min (≈ 15–65 nt/s), vaak ≈ 2 kb/min (≈ 35 nt/s)" — de omrekening was intern inconsistent (1 kb/min = 17 nt/s, 4 kb/min = 67 nt/s) |
| 4 | ⚠️→fix | `app/scenes/txn/genregulatie.js` (`simplified`) | "~147 bp in ~1,65 windingen" → "~1,7 windingen" (conform ronde 1: 1,65 hoort bij 146 bp) |
| 5 | ⚠️→fix | `shared/graph.js` + `graph.en.js` (`nmd`) | "stopcodon dat ruim (>50–55 nt) vóór een exon-junctiecomplex ligt" → "meer dan 50–55 nt vóór de **laatste exon-exonjunctie** ligt, laat een EJC achter het ribosoom" (de regel is gedefinieerd t.o.v. de junctie, niet t.o.v. het EJC, dat zelf ~24 nt vóór de junctie ligt) |
| 6 | ⚠️→fix | `shared/details/rna.js` (`rnai`, facts) + `app/scenes/rna/rnai.js` (`simplified`) | "alleen AGO2 kan knippen" → "vrijwel alleen AGO2 knipt (AGO3 slechts beperkt)" |
| 7 | ⚠️→fix | `shared/details/rna.js` (`rnaprocessing` + `polya`, facts) | "≈ 200–250 A (zoogdieren / bij de mens)" → "≈ 200–250 A bij synthese …; in het cytoplasma/daarna korter" (ronde-1-aanbeveling nu doorgevoerd) |
| 8 | ⚠️→fix | `shared/details/rna.js` (`nmd`, how) | "pioniersronde, cap nog met CBC" → "pioniersronde; klassiek op CBC-gebonden mRNA, maar NMD kan ook later op eIF4E-gebonden mRNA" (sluit nu aan bij `simplified` van de NMD-scène) |
| 9 | ⚠️→fix | `shared/details/tl.js` (`translatie`, how 1) | "de 40S bindt met Met-tRNAi aan de 5'-cap" → "de 40S met Met-tRNAi wordt via eIF4F naar de 5'-cap gebracht" (de cap wordt door eIF4E gebonden, niet door de 40S); EN-zin gelijkgetrokken |
| 10 | ⚠️→fix | `app/scenes/tl/aars.js` (stap 6 + label + tekstvak) | "Leu en Phe zijn te groot" → "Phe is te groot en Leu heeft een andere vorm: ze passen niet in de synthese-plaats"; label bij het botsende Leu "te groot" → "past niet"; tekstvak "Leu, Phe: te groot" → "Leu, Phe: passen niet" (Leu is een isomeer van Ile, dus niet groter) |
| 11 | ❌ | `shared/details/tl.js` (bron `pelletier`) | "Pelletier et al. (2020)" → "**Gilles** et al. (2020)" (PMC7140421: eerste auteur Gilles A) |
| 12 | ⚠️→fix | `shared/details/rna.js` (bron export) | verzonnen ondertitel "…: mRNA export as a nexus for gene expression regulation" → "Chen, Jiang, Fan & Cheng (2024) Nuclear mRNA export" (echte titel van PMC11802349) |

---

## Stage `txn`

### `transcriptie` ✅ (na fix #3)
- Matrijs 3'→5' gelezen, RNA 5'→3' gemaakt; RNA = coderende streng met U ✅ (ronde 1).
- RNA–DNA-hybride ≈ 8–9 bp ✅ (Gnatt 2001, 1I6H; scène zegt ~8, consistent).
- Bel ~13 bp ✅ (literatuur 11–15 nt).
- Positieve supercoils vóór, negatieve achter ✅ (twin-domain model).
- Capping bij ≈ 20–30 nt ✅; Ser5-P → Ser2-P ✅ (Hsin & Manley 2012).
- PIC-volgorde TFIID → A/B → Pol II·F → E/H ✅.
- Snelheid: getal klopte, omrekening niet → gecorrigeerd (#3). Scène-`time` "≈ 30 nt/s ≈ 2–3 kb/min" is een ruwe maar aanvaardbare afronding ✅.
- Bron: https://www.nature.com/articles/nrm3953 · https://pmc.ncbi.nlm.nih.gov/articles/PMC3465734/

### `genregulatie` ✅ (na fix #4)
- Mediator bij de mens: 26 kernsubeenheden + CDK8-kinasemodule van 4 ✅ (Allen & Taatjes 2015: "a four-subunit cyclin-dependent kinase 8 module can reversibly associate"); scène "tot ~30" consistent.
- Enhancer–promoterafstand tot ~1 Mb ✅ (bv. SHH-ZRS).
- Herkenning via α-helix in grote groef; HTH, zinkvinger (Cys₂His₂), bZIP, bHLH ✅.
- p300/CBP acetyleert H3K27 ✅; SWI/SNF ATP-afhankelijk ✅; CTCF + cohesine begrenzen lusdomeinen ✅.
- Bronnen: https://pmc.ncbi.nlm.nih.gov/articles/PMC4963239/ · https://pubmed.ncbi.nlm.nih.gov/27089971/

### `promoter` ✅
- TATA ~−31/−30 (TATAWAWR), Inr rond +1 (YYANWYY), DPE +28…+32, BRE aan weerszijden ✅ (Roy & Singer 2015).
- TBP op de kleine groef, buiging ~80° ✅ (Kim, Nikolov & Burley 1993 — abstract bevestigt kleine groef en twee knikken; de ~80° is de standaardwaarde uit de volledige tekst/leerboeken).
- XPB opent DNA, CDK7 fosforyleert Ser5 ✅ (ronde-1-precisering is doorgevoerd).
- Pauze na ~20–60 nt (DSIF/NELF), vrijgave door P-TEFb/CDK9 (NELF, DSIF, Ser2) ✅ (Core & Adelman 2019).
- ~70 % van de promoters in CpG-eilanden, meestal TATA-loos ✅ (Deaton & Bird 2011).
- Bronnen: https://pmc.ncbi.nlm.nih.gov/articles/PMC4340783/ · https://pmc.ncbi.nlm.nih.gov/articles/PMC6672056/ · https://pubmed.ncbi.nlm.nih.gov/21576262/

### `rnapol` ✅
- 12 subeenheden, ≈ 0,5 MDa, CTD 52 × YSPTSPS ✅.
- **PDB 5FLM** (RCSB-API): "Structure of transcribing mammalian RNA polymerase II", cryo-EM **3,4 Å**, Bernecky et al. Nature 2016; alle eiwitketens **Bos taurus**; Rpb1 **1970 aa**; DNA-steiger **39 nt**, RNA **20 nt** — alles exact zoals in scène en uitleg ✅.
- **1I6H**: gist-Pol II-elongatiecomplex, 3,3 Å, Science 2001, 10 subeenheden ✅.
- Mg²⁺ op Asp-lus NADFDGD; triggerlus/brughelix; Rpb4/7-stengel naast RNA-uitgang; α-amanitine bij brughelix/triggerlus ✅ (Bushnell 2002, PMC122170).
- ⚠️ Niet onafhankelijk nagerekend: de residubereiken in de 3D-scène (brughelix 832–869, triggerlus 1099–1119, CTD-linker 1455–1487 in runder-nummering). Plausibel (gist-nummering + ~22), maar een visuele check in de viewer is aan te raden.
- Bron: https://data.rcsb.org/rest/v1/core/entry/5FLM · https://www.rcsb.org/structure/1I6H

### `operon` ✅
- σ70-consensus −35 TTGACA / −10 TATAAT, ~17 bp ertussen ✅; holo-enzym α₂ββ′ω + σ ✅.
- LacI tetrameer, hulpoperatoren O2/O3 ✅; allolactose als inductor, IPTG ✅.
- CAP–cAMP buigt DNA ~90° ✅ (Schultz 1991, titel: "the DNA is bent by 90 degrees"); rekrutering via α-CTD ✅; inducer-uitsluiting vermeld ✅.
- Genlengtes lacZ ≈ 3 kb, lacY ≈ 1,3 kb, lacA ≈ 0,6 kb ✅.
- Bron: https://pubmed.ncbi.nlm.nih.gov/1653449/

### `polymerasen` ❌→✅ (na fix #1, #2)
- **Pol I heeft bij de mens 13 subeenheden, niet 14** (14 is gist, met A14). Bron: Misiaszek et al., *Cryo-EM structures of human RNA polymerase I*, NSMB 2021 — "Our structure confirms that human Pol I consists of 13 subunits" (https://europepmc.org/article/MED/34887565, PMC8660638). Omdat de scène expliciet "mens" als organisme vermeldt, was 14 fout.
- Pol II 12, Pol III 17 ✅; 5 gedeelde subeenheden (Rpb5, 6, 8, 10, 12) ✅.
- α-amanitine (humane KB-cellen): Pol II 50 % bij 0,02 µg/ml, Pol III bij 20 µg/ml, Pol I resistent tot ≤ 200 µg/ml ✅ — letterlijk uit Weinmann, Raskas & Roeder 1974 (PMC433786). "~1000× meer" ✅.
- 47S-voorloper via 45S → 18S/5,8S/28S ✅; UBF + SL1 ✅; Pol III-promotertypes 1–3, TFIIIA/C/B, SNAPc, Oct-1, T-reeks-terminatie ✅; POLRMT (T7-verwant) ✅; U6 en 7SK door Pol III, overige U-snRNA's door Pol II ✅.

---

## Stage `rna`

### `rnaprocessing` ✅ (na fix #7)
- Capping bij ≈ 20–30 nt, RNGTT (2 activiteiten) + RNMT, CBC ✅.
- EJC ≈ 20–24 nt stroomopwaarts van de junctie ✅.
- CPSF (AAUAAA), CstF (GU-rijk), CPSF73 knipt ≈ 10–30 nt verder, Xrn2-torpedo ✅ (Mandel 2006; Kumar et al. 2019, PMC6900580).
- Spliceosoom "~100–150 eiwitten" ✅.
- **PDB 5YZG** (RCSB): "Cryo-EM structure of human catalytic step I spliceosome (C complex)", 4,1 Å, Science 2018 ✅. **5XJC**: "human spliceosome just prior to exon ligation" (= C\*), 3,6 Å, Cell 2017 ✅.

### `capping` ✅
- γ-fosfaat eraf, GMP 5'–5', N7-methylering (SAM), cap 0 → cap 1 via CMTR1 ✅; CBC (CBP80/20) → eIF4E ✅; DCP2-decapping ✅.
- Bron: https://pmc.ncbi.nlm.nih.gov/articles/PMC12599247/ (Mills, Hepburn & Cowling 2025).

### `splicing` ✅
- U1 (5'SS), U2AF (Py-stuk + AG), U2 (vertakkingspunt), tri-snRNP (B), U1 en U4 vertrekken, U6–U2 actief ✅ (ronde-1-nuance is verwerkt).
- Twee transesterificaties, 2'–5'-lariat, DBR1 ✅; RNA-katalyse met 2 metaalionen ✅.
- Alternatieve splicing ≈ 95 % van multi-exongenen ✅ (Pan et al. 2008 / Wang et al. 2008: 92–95 %).
- Bron: https://pubmed.ncbi.nlm.nih.gov/31794245/

### `polya` ✅ (na fix #7)
- CPSF30 + WDR33 herkennen AAUAAA, CPSF73 knipt (vaak na CA), PAP zonder matrijs, PABPN1 begrenst ~250 A, PABPN1 → PABPC1 ✅.
- Bron: https://www.nature.com/articles/nature05363 · https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6900580/

### `export` ✅ (na fix #12)
- NXF1–NXT1 (TAP–p15), TREX (THO + UAP56/DDX39B + ALYREF), TPR-korf, FG-herhalingen, DDX19 + Gle1 (+ IP6) aan Nup214 ✅.
- Kernporie ≈ 120 nm, ≈ 110 MDa, ≈ 30 nucleoporinesoorten ✅.
- Doortocht ≈ 0,2 s ✅ — Grünwald & Singer 2010: docking 80 ms + transport 5–20 ms + release 80 ms = **180 ± 10 ms**.
- Exportine-5 en CRM1 wél RanGTP ✅.

### `nmd` ✅ (na fix #5, #8)
- EJC-positie, 50–55 nt-regel, UPF1/SMG1, UPF2/UPF3B, SMG6 (endo), SMG5–SMG7 → CCR4–NOT/decapping ✅ (Boehm 2021, PMC8233366).
- β⁰-thalassemie codon 39 CAG → UAG (C→T), 3 exonen ✅.
- Graaf-samenvatting legde de 50–55 nt-regel t.o.v. het EJC i.p.v. de laatste junctie → gecorrigeerd (#5).
- Pioniersronde: nu gehedged in het uitlegpaneel (#8). ⚠️ De exportscène (stap 8) zegt nog "pioniersronde, cap nog met CBC"; dat is als klassiek model aanvaardbaar omdat de `simplified` van die scène de CBC→eIF4E-timing als vereenvoudiging markeert.

### `rnai` ✅ (na fix #6)
- pre-miRNA ≈ 60–70 nt, 2-nt-3'-overhang; Microprocessor 1 Drosha + 2 DGCR8; Exportine-5–RanGTP; Dicer/TRBP; duplex ≈ 22 bp; seed nt 2–8; AGO2 knipt tegenover nt 10–11; GW182/TNRC6 → CCR4–NOT/PAN2–PAN3 ✅.
- "Alleen AGO2 kan knippen" was te absoluut: Park et al. 2017, *Human Argonaute3 has slicer activity* (NAR; PMC5714244) — AGO3 knipt met sommige gidsen → gehedged (#6).

### `mrnaafbraak` ✅
- Gesloten lus eIF4E–eIF4G–PABPC1; ARE/TTP; tweefasige deadenylatie PAN2–PAN3 → CCR4–NOT; LSm1–7–Pat1; DCP2 → m⁷GDP; XRN1; SKI2–SKI3–SKI8 + exosoom; DcpS; P-bodies niet strikt nodig ✅.
- Bron: https://pmc.ncbi.nlm.nih.gov/articles/PMC10157403/

### `editing` ✅
- ADAR1/2 (ADAR3 inactief), inosine gelezen als G, GluA2 Q/R (CAG→CIG, ~100 % ge-edit, Ca²⁺-ondoorlaatbaar) ✅.
- apoB: C6666 → U, codon 2153 CAA → UAA, apoB-48 ≈ 48 % (2152/4536 aa), APOBEC1 + A1CF (+ RBM47), mooring-sequentie stroomafwaarts ✅.
- Bron: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3225921/ (Chester et al. 2004).

### `rnastructuur` ✅
- A-vorm ≈ 11 bp/winding, C3'-endo, diepe smalle grote groef ✅; G·U-wobble 2 H-bruggen ✅; cUUCGg-tetralus ✅.
- **1ANR** (RCSB): HIV-1 TAR, NMR, 20 modellen, "…in the absence of ligands…", NAR 1996 ✅; bulge U23-C24-U25 ✅.
- **1RNK**: MMTV-frameshift-pseudoknoop, NMR 1995 ✅.
- **2OEU**: "Full-length hammerhead ribozyme with Mn(II) bound", 2,0 Å, Chem Biol 2008 ✅.
- **1EHZ**: gist-tRNA^Phe 1,93 Å (Shi & Moore 2000) ✅.

---

## Stage `tl`

### `translatie` ✅ (na fix #9)
- 5–6 aa/s ✅ (ronde 1); energie: 2 GTP per cyclus + 2 fosfoanhydridebindingen van ATP bij laden ✅.
- Scène: 43S/48S-nomenclatuur correct, Met-tRNAi-anticodon CAU, Kozak GCCACC-AUG-G, eIF5B, eRF1/eRF3, ABCE1 ✅.

### `initiatie` ✅ — factoren en 43S/48S zoals voorgesteld in ronde 1 ✅ (Hinnebusch & Lorsch 2012).
### `elongatie` ✅ — eEF1A/EF-Tu, eEF2/EF-G, foutkans 10⁻³–10⁻⁴, tetracycline (A-plaats), erytromycine (tunnel) ✅.
### `terminatie` ✅ — eRF1 (tRNA-mimicry, GGQ), eRF3·GTP, ABCE1; RF1/RF2-specificiteit, RRF + EF-G ✅.

### `ribosoom` ✅ (na fix #11)
- 40S = 18S + 33 eiwitten, 60S = 28S + 5,8S + 5S + 47 eiwitten (≈ 80) ✅ (Khatter 2015).
- rRNA-lengtes 1870 / 5070 / 157 / 121 nt ✅; ≈ 4 MDa (literatuur ~4,3 MDa) ✅; 70S ≈ 2,5 MDa, 30S = 16S + 21 eiwitten, 50S ≈ 33 eiwitten ✅.
- Tunnel ≈ 100 Å lang, 10–20 Å breed ✅ (Ban et al. 2000).
- **6Y0G** (RCSB): "Structure of human ribosome in classical-PRE state", cryo-EM 3,2 Å, Cell Rep 2020 ✅. **4UG0** en **4V6F** ✅ (ronde 1).
- Bronlabel "Pelletier et al." was fout → "Gilles et al." (#11).

### `trna` ✅
- **Nagerekend in 1EHZ**: C4'(35)–C4'(76) = **71,8 Å** (C4'34–76 = 77,2 Å) → de claim "≈ 72 Å (C4'–C4')" klopt; "≈ 75 Å" als ronde waarde ✅.
- **Gemodificeerde residuen in 1EHZ** (HETATM): 2MG10, H2U16, H2U17, M2G26, OMC32, OMG34, YYG37, PSU39, 5MC40, 7MG46, 5MC49, 5MU54, PSU55, 1MA58 = **14** → "14 modificaties" en de modificatielijst in de facts ✅.
- ⚠️ Visueel: in `app/scenes/tl/trna.js` bevat het labelobject `names` geen positie 17 (D17), terwijl het tekstvak "14 modificaties" zegt; er worden dus 13 labels getoond. Niet aangepast (label-overlap met D16 moet visueel beoordeeld worden) — voorstel: `17: 'D'` toevoegen als dat leesbaar blijft.
- Gm34 leest UUC/UUU; PheRS laadt de 2'-OH ✅.

### `aars` ✅ (na fix #10)
- Klasse I/II-kenmerken, 2'-/3'-OH, HIGH/KMSKS, motieven 1–3, kleine/grote-groefkant, ≈ 10 per klasse ✅; G3·U70 van tRNA-Ala ✅; Chapeville 1962 ✅; mupirocine op IleRS ✅.
- **1FFY** (RCSB): "Insights into editing from an Ile-tRNA synthetase structure with tRNA(Ile) and mupirocin", 1999 ✅.
- "Leu te groot" was onjuist (Leu is een isomeer van Ile) → herformuleerd (#10).

### `codon` ✅
- 64 = 61 + 3; verdeling 6/4/3/2/1 (3 × 6, 5 × 4, 1 × 3, 9 × 2, 2 × 1 = 61) ✅; Crick-wobbleregels ✅; tRNA-Ala (IGC) leest GCU/GCC/GCA ✅; mito (mens) UGA = Trp, AUA = Met, AGA/AGG geen Arg ✅.

### `ribogenese` ✅
- rDNA op chr 13, 14, 15, 21, 22; 47S ≈ 13 kb; rijp rRNA ≈ 7 kb (1869 + 157 + 5070) ✅; 5S-gen op chr 1 door Pol III ✅.
- C/D-snoRNP (fibrillarine) → 2'-O-Me, H/ACA (dyskerine) → Ψ, elk ≈ 100 ✅; SSU-processoom/U3; knip in ITS1; > 200 factoren; 5S-RNP met uL5/uL18; CRM1/NMD3; NOB1 knipt 18S-E; eIF6 ✅ (Henras 2015).
- ⚠️ Klein: tekstvak "dicht fibrillair: transcriptie, modificatie" — transcriptie gebeurt aan de **grens** fibrillair centrum/dicht fibrillaire component. Niet aangepast (lay-out van het tekstvak); voorstel: "FC/DFC-grens: transcriptie · DFC: modificatie".

### `seleno` ✅
- 25 humane selenoproteïnen; tRNA-Sec (UCA); SerRS → PSTK → SepSecS, SPS2; SECIS in 3'-UTR (euk./archaea) vs. net achter UGA (bact., SelB); SBP2 + eEFSec; eL30/nucleoline ✅ (Labunskyy 2014).
- Pyl: uit 2 Lys (PylB/C/D), PylRS, tRNA-Pyl (CUA), EF-Tu, Methanosarcina + enkele bacteriën ✅ (Longstaff 2007).

### `er` ✅
- Albumine P02768: signaalpeptide MKWVTFISLLFLFSSAYS (1–18), propeptide RGVFRR (19–24), knip na A-Y-S (−3/−1-regel) ✅.
- SRP = 7SL-RNA (~300 nt) + SRP9/14/19/54/68/72; SRα/SRβ; Sec61αβγ/SecYEG; OST, Glc₃Man₉GlcNAc₂, N-X-S/T (X ≠ Pro); type I/II-membraaneiwitten ✅.

---

## Bronnen: bereikbaarheid en metadata

- Alle 70 URL's in de drie detail-bestanden zijn opgevraagd: 200 (of 203 voor PubMed). Drie gaven 403 aan een script (genesdev.cshlp.org, portlandpress.com, tandfonline.com) — dat is botblokkering, geen dode link.
- Van alle PMC- en PubMed-ID's zijn titel en auteurs opgevraagd via Europe PMC; ze horen allemaal bij het juiste onderwerp. Twee labels klopten niet en zijn aangepast (#11, #12).
- PDB-101 Molecule of the Month 10/15/16/40/121 = Ribosomal Subunits / Transfer RNA / Aminoacyl-tRNA Synthetases / RNA Polymerase / Ribosome ✅.

---

## Conclusie

**Nagekeken (kunnen op status 'nagekeken'):**
`transcriptie`, `genregulatie`, `promoter`, `operon`, `polymerasen`, `rnaprocessing`, `capping`,
`splicing`, `polya`, `export`, `nmd`, `rnai`, `mrnaafbraak`, `editing`, `rnastructuur`, `translatie`,
`initiatie`, `elongatie`, `terminatie`, `ribosoom`, `aars`, `codon`, `seleno`, `er`.

**Nagekeken, met een kleine open (visuele) kwestie:**
- `rnapol` — residubereiken van brughelix/triggerlus/CTD-linker in de 3D-scène niet onafhankelijk nagerekend (visuele check in de viewer).
- `trna` — labelobject mist D17 (13 labels bij "14 modificaties").
- `ribogenese` — tekstvak nucleoluslagen: transcriptie aan de FC/DFC-grens.

Geen van deze drie is een inhoudelijke fout in de uitlegteksten; ze kunnen op 'nagekeken' zodra de
visuele puntjes beoordeeld zijn.
