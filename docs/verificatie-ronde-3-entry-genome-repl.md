# Verificatie ronde 3: stages `entry`, `genome` en `repl` (na het opruimen van de scènes)

Datum: 30 september 2026
Bereik: alle zichtbare teksten in `app/scenes/entry/*.js`, `app/scenes/genome/*.js` en `app/scenes/repl/*.js`. Daaronder vallen stap-`title`/`text`, SVG-labels (`T2()`/`L({nl,en})`), `simplified`, `extra`, `scale`, `time`, `org` en `legend`, telkens in NL en EN.
Aanleiding: bij het opruimen zijn honderden labels en stapteksten ingekort, samengevoegd of verplaatst. In deze ronde gaan we na of dat de betekenis heeft veranderd. Denk aan weggevallen nuances, verkeerde getallen, omgewisselde strengen of richtingen, en NL en EN die niet meer hetzelfde zeggen.

## Methode
- Alle string-literals en tekstknopen zijn uit de huidige bestanden gehaald met een AST-parser (acorn): ≈ 3 400 regels, NL en EN samen.
- Waar er een back-up van vóór het opruimen bestaat, is die er tekst per tekst naast gelegd:
  - `entry/*.orig.js`
  - `genomeA/orig/`: bevat ook de part-B-scènes basenparing, dnahelix, dnavormen, noncanon, nucleotide en supercoiling
  - `repl/bak/`

  Daarna is de volledige huidige tekst van elke scène gelezen, dus niet alleen de verschillen.
- Nieuwe controles zijn gedaan met dbSNP/ClinVar, handboeken (Saenger; Alberts; NCBI Bookshelf) en de bronnen uit ronde 1 en 2. Wat in ronde 2 al bevestigd was, is niet opnieuw opgezocht. Wel is nagegaan of de ingekorte tekst er nog mee overeenkomt.
- Aantal gecontroleerde feitelijke uitspraken: **≈ 610**. Per stage: entry ≈ 170, genome ≈ 300, repl ≈ 140.

Legenda: ✅ klopt · ⚠️ genuanceerd of gehedged · ❌ fout (gecorrigeerd)

### Controle na de wijzigingen
- Alle 8 gewijzigde bestanden doorstaan `node --check`, telkens als tijdelijke `.mjs`.
- `tools/check.html` (headless Chrome): **nodes 72 · scenes 72 · details 72 · PROBLEMS (0)**.
- `tools/text-check.html?w=1000&min=13&ids=rt,baltimore,virus,kernimport,endocytose,gen,chromatine,mutaties` geeft voor alle acht scènes **klein 0** en **drukke stappen 0**.

---

## 0 · Samenvatting

### ❌ Fouten gecorrigeerd
| Scène | Vóór → na (NL; EN idem) | Bron |
|---|---|---|
| `rt` stap 2 | "Elk polymerase heeft een primer nodig" → "Elk **DNA-**polymerase heeft een primer nodig". RNA-polymerasen en primase starten zonder primer. | Alberts, *Molecular Biology of the Cell*, hfst. 5 (NCBI Bookshelf NBK26850) |
| `mutaties` simplified | "De stille mutatie in codon 2 is een **fictief** voorbeeld" → "… codon 2 (CAT→CAC) is een **echte, onschadelijke variant (rs713040)**". HBB c.9T>C (p.His3=, traditioneel codon 2) is een bekende, benigne synonieme variant. | dbSNP rs713040; ClinVar RCV000328523 (benign) |
| `virus` stap 6, label bij het HIV-1-genoom | Door het opruimen viel het label "retrovirus: eerst DNA maken" weg. Het RNA dat uit het HIV-1-deeltje kwam, had daardoor alleen nog het label "blijft meestal in het cytosol". Dat is fout voor HIV-1, en het label zei ook "meestal" waar de stap "vaak" zegt. → "vaak cytosol · retrovirus: eerst DNA" / "often cytosol · retrovirus: DNA first" | stapstekst van dezelfde scène; ronde 2 (`rt`, `integratie`) |
| `baltimore` stap 6 | "Het genoom is het **spiegelbeeld** van mRNA" (EN "mirror image") → "Het genoom is **complementair** aan mRNA". Het label zegt al "complement van mRNA". | Koonin et al. 2021 (PMC8483701) |
| `gen` stap 8 (taal) | "de gen wordt aangezet" → "het gen wordt aangezet" | — |

### ⚠️ Gehedged of verduidelijkt (geen harde fout, wel misleidend na het inkorten)
| Scène | Vóór → na |
|---|---|
| `chromatine` paneellabel ② | "② Lussen (TADs)" → "② Lussen & TADs". Na het inkorten las het alsof lus = TAD. |
| `kernimport` stap 2 | "Een menselijke kern heeft er ~3 000." → "… heeft er duizenden (HeLa ~3 000)." Nu in lijn met de hedge die in ronde 2 in `kern.js` is gezet: het aantal hangt af van het celtype. |
| `kernimport` stap 7 | NL "te groot" → "veel te groot", zoals EN "far too large". |
| `endocytose` stap 5 | "het signaal waar virussen … op wachten" → "waar **veel** virussen …". Zie open punt 1. |

### Open punten (niet zelf beslist)
1. **`endocytose`, volgorde van de stappen:** de ontsnapping van het adenovirus met proteïne VI komt ná de rijping tot laat endosoom (pH ≈ 5,5). Voor HAdV-C wordt de ontsnapping in de literatuur vooral beschreven als snel (binnen ~15 min) en uit vroege endosomen, en grotendeels onafhankelijk van een lage pH (o.a. Wiethoff 2005; Luisoni 2015, *Cell Host Microbe*).
   - De tekst is gehedged ("veel virussen"), maar de animatie suggereert nog steeds ontsnapping uit het late endosoom.
   - Voorstel: in `simplified` vermelden dat het adenovirus in werkelijkheid al vroeg ontsnapt. Dat vergt een inhoudelijke keuze.
2. **`baltimore` stap 4:** "Een cel heeft geen enzym dat RNA naar RNA kopieert" klopt op bachelorniveau. Er is één uitzondering: het hepatitis-deltavirus laat zijn RNA door Pol II kopiëren. Eventueel "geen eigen RdRp" schrijven. Niet gewijzigd.
3. **`noncanon`, label "palindroom: 5′-GAATTC-3′":** de sequentie is een correct palindroom, maar 6 bp is te kort voor een echte kruisvorm. Het gaat duidelijk om een voorbeeldsequentie. Eventueel "(voorbeeld)" toevoegen.
4. Uit ronde 2 blijft staan: `replisoom`, "Pol ε, gebonden aan CMG en PCNA". De PCNA-binding van Pol ε is zwak. Niet opnieuw gewijzigd.

---

## Stage `entry`

### `cel` (geen tekstwijziging bij het opruimen)
Epitheelcel ≈ 20 µm ✅ · adenovirus ~90 nm en LNP ~100 nm "honderden keren kleiner" ✅ (20 µm / 90 nm ≈ 220×) · organellenlijst ✅ · beide routes via endocytose ✅ · mRNA wordt direct in het cytosol vertaald ✅ · NL = EN ✅.

### `virus`
Genoom + eiwitjas, soms een envelop ✅ · tropisme via de receptor ✅ · alleen omhulde virussen fuseren, HIV-1 als voorbeeld ✅ · uncoating maakt het genoom zichtbaar voor sensoren ✅ · lysis of knopvorming ✅ · 20–300 nm ✅ (ronde 2).
- ❌ → gecorrigeerd: het label bij het HIV-1-RNA (zie samenvatting).

### `adeno`
De stapteksten zijn ongewijzigd, op één na: stap 8 zegt nu ook "kinesine-1 (via Nup358) en histon H1 breken het open" ✅ (Strunze 2011). Nagekeken:
- ✅ 240 hexonen, 12 pentonbasissen met vezel en knop
- ✅ dsDNA ≈ 36 kb met proteïne VII, klasse I
- ✅ CAR is alleen een aanhechtingsreceptor
- ✅ RGD ↔ αvβ3/αvβ5 zet de opname in gang en maakt het capside losser; vezels gaan al verloren
- ✅ dynamine
- ✅ proteïne VI en dyneïne
- ✅ hexon ↔ Nup214
- ✅ episomaal, Pol II

De ingekorte labels ("hexon ↔ Nup214", "kinesine-1 + histon H1", "proteïne VI breekt het endosoom open") zijn correct. NL = EN ✅.

### `lnp`
- ✅ Vier lipiden met hun functie
- ✅ Cap, UTR's, CDS, poly(A); alle U → m1Ψ
- ✅ Neutraal bij pH 7,4, positief bij pH ≈ 6,5–5,5
- ✅ Positieve lipiden destabiliseren het negatieve endosoommembraan
- ✅ Slechts enkele procenten ontsnappen
- ✅ Geen kernimport, geen RT, afgebroken binnen enkele dagen: deze zin is van een label naar de stapstekst verhuisd en is nog steeds correct
- ✅ ApoE/LDL-R

### `endocytose`
- ✅ AP-2 en adaptoren
- ✅ Klathrine-triskelia
- ✅ Dynamine en GTP
- ✅ Vroeg ≈ 6,5, laat ≈ 5,5, lysosoom ≈ 4,5
- ✅ v-ATPase
- ✅ Proteïne VI is amfipathisch: dit woord is van het label naar de stapstekst verhuisd, correct
- ✅ Ioniseerbaar lipide
- ✅ Het grootste deel van de vracht gaat naar het lysosoom
- ✅ Blaasje in ~1 min, rijping in 10–30 min
- ⚠️ Stap 5 gehedged; zie open punt 1.

### `baltimore`
De voorbeelden zijn ingekort: klasse I "adenovirus, herpesvirussen" (het pokkenvirus viel weg, maar staat nog correct in `simplified`); klasse IV zonder hepatitis A; klasse V zonder rabiës. De indeling blijft correct:
- ✅ I: dsDNA via Pol II van de gastheer
- ✅ II: parvovirus B19
- ✅ III: rota/reo met RdRp
- ✅ IV: polio, SARS-CoV-2; naakt RNA is besmettelijk
- ✅ V: influenza, mazelen, ebola; RdRp zit in het virion
- ✅ VI: HIV-1, RT, integratie
- ✅ VII: HBV via een RNA-tussenstap

Correcties en nuances:
- ❌ → gecorrigeerd: "spiegelbeeld" (zie samenvatting).
- ⚠️ Open punt 2.

### `rt`
- ✅ Twee (+)ssRNA-kopieën
- ✅ R-U5-PBS…PPT-U3-R
- ✅ tRNA-Lys3 op de PBS
- ✅ Twee actieve plaatsen; RNase H breekt R-U5 af
- ✅ 1ᵉ strengoverdracht via R
- ✅ PPT is de primer van de (+)-streng; die kopieert een stuk tRNA, waardoor de PBS ontstaat
- ✅ Label "(+)-DNA: U3-R-U5-PBS"
- ✅ 2ᵉ strengoverdracht via PBS↔PBS
- ✅ Eindproduct: twee volledige LTR's, langer dan het RNA
- ❌ → gecorrigeerd: "Elk polymerase heeft een primer nodig".

Het weggevallen label "PBS paart met PBS" wordt nog gedekt door de stapstekst ✅.

### `integratie` (tekst ongewijzigd)
- ✅ Intasoom (tetrameer)
- ✅ 3'-processing: GT weg, dan CA-3'OH
- ✅ Strengoverdracht op twee plaatsen 5 bp uit elkaar, op tegenoverliggende strengen
- ✅ Duplicatie van 5 bp
- ✅ LEDGF/p75
- ✅ Linker-LTR is de promoter; latent reservoir
- ⚠️ Cosmetisch: NL "scharen" en EN "tools" gebruiken een ander beeld voor hetzelfde. Niet gewijzigd.

### `kernimport`
- ✅ De opmerking "buitenste membraan loopt door in het ER" is van het label naar stap 1 verhuisd
- ✅ ~30 nucleoporinen in veelvouden van 8
- ✅ Passieve grens < ~40 kDa / ~5 nm
- ✅ NLS PKKKRKV
- ✅ Importine α/β
- ✅ Hoppen langs FG-herhalingen, geen pomp
- ✅ RCC1 en RanGAP
- ✅ Capside ≈ 90 nm tegenover een kanaal van ~40 nm
- ✅ Kif5C via Nup358 en de lichte keten op het capside
- ✅ Histon H1
- ✅ Proteïne VII, episomaal
- ✅ ≈ 110–120 MDa
- ⚠️ Stap 2 (~3 000 poriën) en stap 7 (NL/EN) gehedged of gelijkgetrokken; zie samenvatting.

---

## Stage `genome`

### `kern` (ongewijzigd t.o.v. ronde 2)
~8 µm, 46 chromosomen, ~2 m ✅ · duizenden NPC's ✅ · heterochromatine vooral aan de rand ✅ · Pol I in de nucleolus ✅ · Miller-kerstboom ✅ · adenovirus-DNA episomaal via Pol II ✅.

### `nucleolus`
- ✅ NOR's op 13, 14, 15, 21, 22
- ✅ FC/DFC/GC en de beweging van binnen naar buiten
- ✅ Herhaling van 43 kb, waarvan 13 kb getranscribeerd en een IGS van ~30 kb
- ✅ Honderden kopieën (vaak ~400)
- ✅ Tientallen Pol I per eenheid; "knopjes = vroege processomen" (van het label naar de stapstekst verhuisd)
- ✅ 47S → 18S/5.8S/28S; ~200 modificaties (C/D-box → 2'-O-Me, H/ACA-box → Ψ)
- ✅ 5S via Pol III op chr 1
- ✅ ~80 r-eiwitten
- ✅ Pre-40S en pre-60S apart via CRM1
- ✅ rRNA ≈ 80 %
- ✅ De labels pre-40S/pre-60S zijn deels weggevallen; de stapstekst dekt het.

### `chromosoom`
- ✅ 22 paren + XX/XY; 3,05 Gb
- ✅ chr1 ~248 Mb, chr21 ~45 Mb
- ✅ Acrocentrische chromosomen dragen het rDNA
- ✅ Zusterchromatiden, p/q
- ✅ Cohesine, shugoshin/separase-verhaal
- ✅ α-satelliet 171 bp; honderden kb tot enkele Mb; CENP-A
- ✅ Telomeer: honderden tot duizenden TTAGGG, 3'-overhang, shelterin; label "(CCCTAA)ₙ" ✅
- ✅ Condensine ~10 000×
- ✅ Ingekorte labels ("(man: 46,XY)", "kinetochoor", "α-satelliet-DNA · CENP-A-nucleosomen") zijn correct.

### `chromatine`
- ✅ ~2 m DNA in een kern van 5–10 µm
- ✅ Territoria; heterochromatine aan de lamina en de nucleolus
- ✅ Lusextrusie is ATP-afhankelijk en stopt bij convergente CTCF
- ✅ TAD als driehoek in Hi-C
- ✅ Eu/hetero: Ac tegenover H3K9me3, HP1, 5mC
- ✅ 10 nm-vezel met om de ~200 bp een nucleosoom; H1
- ✅ 30 nm-vezel alleen in vitro, in de cel 5–24 nm
- ✅ ~147 bp, ~1,7 windingen
- ⚠️ Label ② aangepast (zie samenvatting).

### `nucleosoom`
- ✅ 1KX5, 1,9 Å; Xenopus-histonen met humaan α-satelliet-DNA
- ✅ ~11 × 5,5 nm
- ✅ 147 bp, ~1,7 linkshandige superhelix, lokaal B-DNA
- ✅ (H3–H4)₂ bindt eerst
- ✅ 2 × H2A–H2B
- ✅ Histonplooi α1-L1-α2-L2-α3, handdruk
- ✅ Staarten met lysines
- ✅ ~14 contacten met de ruggengraat, arginines in de kleine groef
- ✅ Linker van 20–80 bp
- ✅ Label "147 bp DNA": de windingen staan nog in de titel van stap 3.

### `histonmod`
- ✅ H3 1–30 = ARTKQTARKSTGGKAPRKQLATKAARKSAP met zes K's (K4, 9, 14, 18, 23, 27); zelf nageteld
- ✅ HAT's (p300/CBP, GCN5) en acetyl-CoA; HDAC's
- ✅ me1–3 via SAM, blijft positief
- ✅ H3K4me3 = actieve promoter (SET1/MLL)
- ✅ H3K9me3 (SUV39H1, SETDB1); H3K27me3 (PRC2/EZH2)
- ✅ Bromodomein, chromodomein, PHD (TAF3, ING)
- ✅ Nieuw label "schrijvers · wissers · lezers bepalen samen welke genen actief zijn" ✅

### `dnamethyl` (tekst ongewijzigd)
- ✅ CpG is palindroom
- ✅ 5mC in de grote groef; paring blijft
- ✅ DNMT3A/B de novo met SAM
- ✅ Hemigemethyleerd → DNMT1 + UHRF1
- ✅ De meeste CpG's zijn gemethyleerd, CpG-eilanden niet
- ✅ MBD/MeCP2/HDAC
- ✅ TET → 5hmC/5fC/5caC → TDG + BER
- ✅ Transposons, Xi, imprinting

### `gen`
- ✅ Net geen 20 000 eiwitcoderende genen; CDS ≈ 1–1,5 %
- ✅ Enhancerlus (cohesine, Mediator), 10–1 000 kb
- ✅ TATA-box bij een minderheid, ~−30; CpG-eiland
- ✅ GT–AG en het vertakkingspunt-A
- ✅ ATG … TAA/TAG/TGA; UTR's
- ✅ AATAAA; knip ~10–30 nt verder; Pol II loopt door
- ✅ Rijp mRNA
- ❌ Taalfout "de gen" gecorrigeerd.

### `dnahelix`
- ✅ B-DNA rechtshandig, antiparallel
- ✅ Fosfodiësterbinding C3′→C5′: van het label naar de stapstekst verhuisd, correct
- ✅ A–T 2 en G–C 3 H-bruggen
- ✅ Groeven ≈ 6 en ≈ 12 Å
- ✅ 20 Å, 3,4 Å/bp, 10,5 bp, 35,7 Å
- ✅ 34,3°/bp
- ✅ 1BNA = Dickerson-dodecameer (1981)

### `basenparing`
- ✅ H-brugatomen A–T (N6–H···O4, N1···H–N3) en G–C (O6···H–N4, N1–H···N3, N2–H···O2)
- ✅ GC stabieler vooral door stapeling
- ✅ C1′–C1′ ≈ 10,5 Å; purine–purine te breed
- ✅ D/A-patroon in de grote groef, gelezen zonder de helix te openen (van het label naar de stapstekst verhuisd)
- ✅ Chargaff 41 % GC → 29,5/20,5 %
- ✅ Stapeling > H-bruggen
- ✅ Hoogsteen syn, 10,5 → 8,5 Å
- ✅ G·U-wobble: U naar de grote groef (van het label naar de stapstekst verhuisd)
- ✅ Levensduur van een paar ≈ ms

### `dnavormen`
Veel labels zijn weggevallen. Alles wat nog staat, klopt (Saenger 1984; 440D/1BNA/1DCG):
- ✅ B: 10,5 bp, 3,4 Å, Ø 20 Å, C2′-endo
- ✅ A: 11 bp, 2,6 Å, Ø 23 Å, C3′-endo, 20° gekanteld, holte in het midden
- ✅ Z: 12 bp, 3,7 Å, Ø 18 Å, G syn/C anti, links
- ✅ Spoed 28/36/45 Å
- ✅ P–P 5,9 tegenover 7,0 Å (dezelfde streng)
- ✅ A: dsRNA/hybriden; Z: (CG)n, hoog zout, negatieve supercoiling, Zα (ADAR1, ZBP1)

De vergelijkingstabel heeft geen rijen meer voor de groeven, maar de stapstekst verwijst er correct naar.

### `noncanon`
- ✅ G-kwartet met 8 Hoogsteen-H-bruggen (N1–H···O6, N2–H···N7)
- ✅ K⁺ tussen de lagen (8 × O6); Na⁺ ook in het vlak
- ✅ AG₃(T₂AG₃)₃: 1KF1 (K⁺, parallel, kristal) en 143D (Na⁺, mand, NMR); 4 G-banen × 3 = 3 kwartetten
- ✅ Overhang 50–300 nt; telomeer 5–15 kb
- ✅ T·A–T en C⁺·G–C
- ✅ H-DNA bij een spiegelherhaling: …AGGAGAAG|GAAGAGGA… is inderdaad een spiegelherhaling
- ✅ Kruisvorm met vierwegsknooppunt
- ✅ i-motief: hemigeprotoneerde C·C⁺ bij zure pH
- ⚠️ Open punt 3.

### `nucleotide`
- ✅ Base, pentose, fosfaat
- ✅ C1′–C5′; deoxy = geen O op C2′
- ✅ N9/N1 β-glycosidisch
- ✅ Nucleoside/nucleotide, dAMP/dADP/dATP
- ✅ T = 5-methyluracil
- ✅ Fosfodiësterbinding 3′→5′, 5′-fosfaat en 3′-OH
- ✅ C2′-endo (S) = B; C3′-endo (N) = A/RNA; endo = kant van C5′
- ✅ χ-definities (O4′–C1′–N9–C4 en O4′–C1′–N1–C2)
- ✅ Syn bij G in Z-DNA en in Hoogsteen-paren

De labels zijn ingekort tot dAMP/AMP enz. De di- en trifosfaten staan in de stapstekst ✅.

### `supercoiling`
- ✅ Lk = Tw + Wr, geheel getal
- ✅ 126 bp / 10,5 = 12; ΔLk −2 → Lk 10 = Tw 12 + Wr −2
- ✅ ≈ 12,6 bp/winding
- ✅ Rechtshandige plectoneem bij negatieve supercoiling
- ✅ σ ≈ −0,06; nucleosoom linkshandig met ΔLk ≈ −1
- ✅ Twin-domain (Liu & Wang 1987)
- ✅ TOP1: Tyr-binding, geen ATP, camptothecine
- ✅ TOP2: G/T-segment, ATP, ΔLk 2, etoposide/doxorubicine
- ✅ ≈ 40 nm (126 × 0,34 = 43 nm)

---

## Stage `repl`

### `replicatie`
- ✅ Semi-conservatief; Meselson–Stahl 1958 (¹⁵N/¹⁴N, CsCl; na 1 deling alleen hybride)
- ✅ ORC, Cdc6, Cdt1 → inactieve MCM-dubbelhexameer
- ✅ DDK/CDK → Cdc45 + GINS = CMG, 3'→5', schuiven langs elkaar
- ✅ Bidirectioneel, leidend/volgend
- ✅ Vroege en late origins
- ✅ Terminatie en CMG-verwijdering
- ✅ Cohesine; nucleosomen
- ✅ Vork 1–3 kb/min
- ✅ Origins 30–300 kb uit elkaar; Okazaki-fragment ~200 nt

De ingekorte labels ("zusterchromatide 1: oud + nieuw") zijn correct.

### `replisoom`
- ✅ De details van CMG (Cdc45 · MCM2-7 · GINS, 3'→5' over de matrijs van de leidende streng) zijn van het label naar stap 1 verhuisd
- ✅ Positieve supercoils vóór de vork, TOP1/2
- ✅ RPA
- ✅ Primase ~10 nt RNA + Pol α ~20 nt DNA
- ✅ RFC → PCNA
- ✅ Pol ε leidend, Pol δ volgend, 5'→3', flap
- ✅ FEN1, ligase I
- ✅ 3'→5'-exo
- ✅ MMR achteraf
- ✅ Legenda: matrijs van de leidende/volgende streng

### `ssdna` (ongewijzigd)
- ✅ 1JMC (Bochkarev 1997, *Nature* 385:176), 2,4 Å, dC8
- ✅ DBD-A/B als OB-fold (β-vat van 5 strengen); ~8 nt
- ✅ Phe238, Phe269, Trp361, Phe386
- ✅ ~30 nt per heterotrimeer
- ✅ Deaminatie ~140× sneller (Frederico 1990)
- ✅ ATR, Pol α, NER, RAD51

### `telomeren`
- ✅ G-rijke streng 5'→3' naar het uiteinde, 3'-overhang
- ✅ Eindreplicatieprobleem (vereenvoudigd en zo gemeld)
- ✅ Senescentie
- ✅ TERT + hTR (451 nt); matrijs van 11 nt 3'-CAAUCCCAAUC-5': 5 nt paren met …GTTAG-3', 6 nt worden +GGTTAG (zelf nagerekend)
- ✅ Translocatie van 6 nt
- ✅ CST + Pol α-primase
- ✅ Shelterin (6 eiwitten): geen ATM/ATR-alarm, geen NHEJ (van het label naar de stapstekst verhuisd)
- ✅ T-lus met TRF2, ingekort getekend (nu in `simplified`)
- ✅ Telomerase actief in kiemcellen, stamcellen en de meeste kankercellen

### `herstel`
- ✅ ~10 000 abasische plaatsen per dag
- ✅ BER: UNG, APE1 5', Pol β (dRP-lyase), ligase III–XRCC1; C→U-label
- ✅ NER: XPC–RAD23B, TFIIH, XPA, RPA, XPF–ERCC1 5', XPG 3', 24–32 nt, Pol δ/ε
- ✅ MMR: MutSα, MutLα, EXO1, Pol δ, ligase I, > 100×; herkenning van de nieuwe streng staat in `simplified`
- ✅ NHEJ: Ku, DNA-PKcs, Artemis, XRCC4–LigIV, in elke fase, foutgevoelig
- ✅ HR/SDSA: MRN–CtIP, EXO1, BRCA2 → RAD51, D-lus, S/G2
- ✅ XP, Lynch, BRCA1/2

De ingekorte labels ("replicatiefout (G·T)", "Lynch-syndroom → darmkanker") zijn correct. TC-NER staat nog in `simplified`.

### `mutaties`
- ✅ De HBB-sequentie en codons 1–22 zelf vertaald: codon 6 GAG = Glu, codon 17 AAG = Lys, frameshift +G na codon 8 → stop TGA op codon 22 (het label staat nu op `cx(22)`: het open punt uit ronde 2 is opgelost)
- ✅ Transitie en transversie (4/8)
- ✅ HbS p.Glu7Val
- ✅ Codon 17 A>T → UAG (β⁰-thal)
- ✅ NMD bij > 50–55 nt
- ✅ Codons 8/9 +G
- ✅ CpG C→T
- ✅ Kiemcel/lichaamscel
- ❌ → gecorrigeerd: "fictief voorbeeld" voor codon 2 CAT→CAC. Dat is de echte benigne variant rs713040. Ook de codecommentaar bovenaan het bestand is aangepast.

---

## Gewijzigde bestanden
`app/scenes/entry/rt.js`, `baltimore.js`, `virus.js`, `kernimport.js`, `endocytose.js`; `app/scenes/genome/gen.js`, `chromatine.js`; `app/scenes/repl/mutaties.js`.
Kopieën van vóór deze ronde staan in de scratchpad (`r3/pre/`). Layout, animatielogica en de lengte van de labels zijn niet wezenlijk veranderd.

## Bronnen (nieuw in deze ronde)
- dbSNP rs713040: https://www.ncbi.nlm.nih.gov/snp/rs713040
- ClinVar HBB c.9T>C (p.His3=), benign: https://www.ncbi.nlm.nih.gov/clinvar/RCV000328523/
- Alberts et al., *Molecular Biology of the Cell*, DNA-replicatie (primers): https://www.ncbi.nlm.nih.gov/books/NBK26850/
- Koonin et al. 2021, Baltimore-klassen: https://pmc.ncbi.nlm.nih.gov/articles/PMC8483701/
- Luisoni et al. 2015, adenovirus-ontsnapping (open punt 1): https://doi.org/10.1016/j.chom.2015.06.006
