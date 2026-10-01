# Verificatie ronde 5: eenvoudige taal in entry, signaal en genoom

Datum: 1 oktober 2026
Bereik: de wijzigingen uit commit `11fd50c` ("toegankelijkere uitleg"), telkens in NL en EN:
- de stapondertitels (`title`/`text`) in `app/scenes/entry/*`, `app/scenes/signal/*` en `app/scenes/genome/*`;
- de nieuwe samenvattingen `kort` in `shared/details/entry.js`, `signal1.js`, `signal2.js`, `genome.js` en `genome2.js`.

## Methode
- Elke gewijzigde ondertitel en elke nieuwe `kort` is naast de vorige, geverifieerde tekst gelegd (`git diff 15e4e1f 11fd50c`).
- Elke nieuwe uitspraak is gecontroleerd op wetenschappelijke juistheid op bachelorniveau. Als referentie dienden de oude tekst, de detailpanelen (`what`/`how`/`facts`) en de rapporten van ronde 2–4. Waar nodig is standaardkennis uit handboeken gebruikt (Alberts, *Molecular Biology of the Cell*; Lodish, *Molecular Cell Biology*).
- Het doel is eenvoudige taal. Een ware maar minder gedetailleerde uitspraak is dus ✅. Enkel fouten, misleidende vereenvoudigingen, onterechte veralgemeningen en verschillen tussen NL en EN worden gemarkeerd.
- Gecontroleerd: ≈ 245 NL/EN-paren (entry ≈ 68, signaal ≈ 52, genoom ≈ 95, `kort` 29), samen **≈ 560 afzonderlijke uitspraken**.

Legenda: ✅ klopt · ⚠️ genuanceerd of kleine onnauwkeurigheid · ❌ fout of misleidend (gecorrigeerd)

### Controle na de wijzigingen
- `node --check` (als tijdelijke `.mjs`) slaagt voor `baltimore.js`, `chromosoom.js`, `nucleolus.js`, `nucleotide.js`, `shared/details/entry.js` en `shared/details/genome.js`.
- `tools/check.html` (headless Chrome): **PROBLEMS (0)**.
- Alle aangepaste ondertitels blijven onder ~180 tekens.

---

## 0 · Samenvatting

### ❌ Gecorrigeerd
| # | Waar | Vóór → na | Reden / bron |
|---|---|---|---|
| 1 | `entry/baltimore.js`, klasse III | "… dus **dit virus** brengt zijn eigen kopieerenzym mee (RdRp). Uitzondering: het hepatitis-deltavirus …" → "… dus **RNA-virussen brengen** hun eigen kopieerenzym mee (RdRp). Uitzondering: …" (EN: *this virus brings* → *RNA viruses bring*) | Door "dit virus" leek het hepatitis-deltavirus een uitzondering bínnen de dsRNA-klasse. HDV is echter een circulair (−)ssRNA-viroïdachtig virus. De oude tekst sprak algemeen over RNA-virussen. Bron: Lai 1995, *Annu Rev Biochem* 64:259; Baltimore 1971. |
| 2 | `entry/baltimore.js`, klasse V | "het **spiegelbeeld** (complement) van mRNA" → "de **complementaire tegenstreng** van mRNA" (EN: *mirror image (complement)* → *complementary counterpart*) | "Spiegelbeeld" doet denken aan een omgekeerde volgorde of een enantiomeer, niet aan basencomplementariteit. Die beeldspraak misleidt. |
| 3 | `genome/chromosoom.js`, stap 2 | "Vijf chromosomen dragen de genen voor ribosomaal RNA." → "… de genen voor **het meeste** ribosomaal RNA." (EN idem) | Te sterk veralgemeend. De vijf acrocentrische chromosomen dragen het 45S-rDNA (18S, 5.8S, 28S). De 5S-rRNA-genen liggen op chromosoom 1 (1q42, cluster *RNA5S1–17*). Bron: Sørensen & Frederiksen 1991, *Nucleic Acids Res* 19:4147; Stults et al. 2008, *Genome Res* 18:13. De oude tekst sprak correct van "rDNA-genen". |
| 4 | `genome/nucleolus.js`, stap 1 | "rond de genen voor ribosomaal RNA (rDNA)" → "rond de genen voor **het meeste** ribosomaal RNA (rDNA)" (EN idem) | Zelfde reden als #3. De nucleolus vormt zich rond de NOR's (45S-rDNA). Het 5S-rRNA wordt elders door Pol III gemaakt (zie stap 6 en `kort` nucleolus: "de meeste RNA's"). |
| 5 | `details/entry.js`, `kort` baltimore | "is het genoom DNA of RNA, enkel- of dubbelstrengig?" → "…, en zelf al leesbaar als mRNA (+) of niet (−)?" (EN idem) | Zonder polariteit volgt de slotzin ("zo zie je meteen welke enzymen een virus moet meebrengen") niet. Het verschil tussen klasse IV en V (RdRp wel of niet in het virion) hangt net aan (+)/(−). |
| 6 | `details/entry.js`, `kort` kernimport | "zodat alleen zijn DNA naar binnen gaat" → "zodat alleen zijn DNA, **met wat eiwit eraan**, naar binnen gaat" (EN idem) | Het adenovirus-DNA gaat de kern in samen met het kerneiwit VII. Zo staat het ook in de geverifieerde `what` en in de oude ondertitels. Bron: Greber & Flatt 2019, *Annu Rev Virol* 6:177. |
| 7 | `details/entry.js`, `kort` endocytose | "Voor virussen en mRNA-vaccins is die ontsnapping **de moeilijkste stap**." → "Voor virussen en mRNA-vaccins **die zo binnenkomen**, is die ontsnapping **een grote hindernis**." (EN idem) | Twee onterechte veralgemeningen: (a) niet alle virussen komen via endocytose binnen (HIV-1 fuseert aan het plasmamembraan, zie `virus.js` stap 5), en (b) "de moeilijkste" is niet aantoonbaar. Voor LNP's is endosomale ontsnapping wél de bekende flessenhals. Bron: Gilleron et al. 2013, *Nat Biotechnol* 31:638. |

### ⚠️ Kleine verduidelijkingen (aangepast)
| # | Waar | Vóór → na | Reden |
|---|---|---|---|
| 8 | `genome/nucleotide.js`, stap 3 | "aan dezelfde kant van de ring (β)" → "aan dezelfde kant van de ring **als C5′** (β)" (EN idem) | Zonder referentiepunt zegt "dezelfde kant" niets. De β-configuratie is gedefinieerd ten opzichte van C5′ (zie oude tekst). |
| 9 | `details/genome.js`, `kort` gen | "Bij de mens bestaat een gen uit … (exonen) en … (intronen)" → "bestaat een gen **meestal** uit …" (EN *usually*) | Niet elk menselijk gen heeft intronen; replicatie-afhankelijke histongenen bijvoorbeeld zijn intronloos (≈ 3–5 % van de genen). |

### Open vragen
Geen echte open vragen. Twee bewuste keuzes ter info:
- `kort` lnp: "Het mRNA komt niet in de kern". Dit volgt de eerder geverifieerde `what` ("it does not enter the nucleus"). In delende cellen verdwijnt de kernenvelop tijdelijk, maar er is geen mechanisme dat vaccin-mRNA actief naar de kern brengt, en de ondertitel van stap 6 formuleert het zo. Niet aangepast.
- `kort` basenparing: "A paart **altijd** met T en G **altijd** met C". In de Watson–Crick-helix is dat correct. Hoogsteen-paren in dezelfde scène zijn ook A·T en G·C. Mismatches zijn fouten, geen regel. Niet aangepast.

---

## 1 · Entry (`app/scenes/entry/*`)

| Scène | Gecontroleerde uitspraken (samengevat) | Oordeel |
|---|---|---|
| `cel` | menselijke epitheelcel ~20 µm; plasmamembraan, cytosol, organellen; twee routes (DNA via adenovirus, mRNA via LNP), beide via endocytose; virus ontsnapt uit blaasje, microtubuli naar kernporie; mRNA hoeft niet naar de kern; vrije en ER-gebonden ribosomen | ✅ |
| `virus` | virus = erfelijk materiaal in eiwitjas ± envelop, heeft ribosomen/enzymen van de cel nodig; receptor bepaalt welke weefsels (tropisme); endocytose + ontsnapping (adeno: eiwit VI); enkel omhulde virussen fuseren (HIV-1); uncoating maakt genoom bereikbaar voor enzymen en sensoren; routes = Baltimore; lysis of budding | ✅ |
| `adeno` | capside ≈ 90 nm, 20 driehoekige vlakken uit hexonen, 12 hoeken met pentonbasis + vezel + knop; lineair dsDNA ≈ 36 000 bp met eiwit VII; knop bindt CAR (aanhechting); RGD-lus bindt integrines (opnamesignaal, jas wordt losser); klathrine, dynamine; eiwit VI breekt blaasje open; dyneïne over microtubuli; aanmeren en openbreken aan de porie; DNA episomaal, afgelezen door Pol II | ✅ |
| `endocytose` | adaptoreiwitten; klathrinemandje; dynamine knijpt de hals dicht met GTP; ontmanteling van de jas, vroeg endosoom, v-ATPase pompt H⁺; laat endosoom zuurder als ontsnappingsseintje; adeno-eiwit VI vroeg; ioniseerbare lipiden worden positief; lysosoom pH ≈ 4,5; vervolg naar de kernporie | ✅ |
| `baltimore` | ribosomen lezen enkel mRNA; I dsDNA via Pol II; II ssDNA eerst aanvullen; III RdRp (+ uitzondering HDV); IV (+)ssRNA meteen vertaald, naakt RNA besmettelijk; V (−)ssRNA, RdRp in het virion; VI RT + integratie (HIV-1); VII HBV via RNA-tussenstap | ❌ 2 (#1, #2), rest ✅ |
| `kernimport` | dyneïne; dubbel membraan met poriën; ~30 nucleoporinen in veelvouden van 8, duizenden poriën; FG-zeef, kleine moleculen passief; NLS–importine α/β; geen pomp maar zeef; Ran·GTP in de kern, GTP-hydrolyse buiten; capside te groot, aanmeren aan Nup214 (cytoplasmatische zijde); kinesine-1 grijpt porie (Nup358) en capside; histon H1 helpt; DNA episomaal, Pol II | ✅ |
| `lnp` | vier soorten lipiden en hun rol; cap, coderend deel, poly(A); alle U → m1Ψ, minder immuunactivatie; opname in een blaasje; neutraal bij pH 7,4, positief in een zuur blaasje; destabilisatie, klein deel ontsnapt; antigeen; geen kerntransport, geen RT in het vaccin, afbraak binnen enkele dagen | ✅ |
| `rt` | HIV-1: twee identieke RNA-kopieën; RT; primer = tRNA (Lys3) op de PBS; RNase H breekt gekopieerd RNA af (R, U5); eerste sprong via R aan beide uiteinden; PPT blijft als primer voor de (+)-streng; kopie van de PBS uit tRNA; tweede sprong via PBS; product dsDNA met twee LTR's (U3-R-U5), langer dan het RNA | ✅ |
| `integratie` | dsDNA met LTR's komt de kern in samen met virale en cellulaire eiwitten (PIC); intasoom; 3′-processing (GT weg, vrije 3′-OH); strengoverdracht op 5 bp afstand; gaten opgevuld → 5 bp duplicatie; provirus; LEDGF/p75 stuurt naar actieve genen; 5′-LTR als promoter, latentie | ✅ |

NL/EN-gelijkwaardigheid: overal gelijk. Enkel de twee baltimore-zinnen zijn in beide talen aangepast.

## 2 · Signaal (`app/scenes/signal/*`)

| Scène | Gecontroleerde uitspraken | Oordeel |
|---|---|---|
| `signaal` | membraan = lipidendubbellaag met vettig binnenste; EGF (klein eiwit) en adrenaline wateroplosbaar → receptor aan het oppervlak; cortisol uit cholesterol, vetoplosbaar, GR binnenin; drie receptortypes; doorgeven en versterken; transcriptiefactoren in de kern; verhaal 2: EGF → Ras–MAPK → FOS → c-Fos | ✅ |
| `gpcr` | adrenaline uit de bijnier (merg); Gs-GDP in de uit-stand; 7 TM, helix 6 zwaait naar buiten; receptor laat GDP los (GEF), GTP in overmaat; Gαs-GTP laat Gβγ los, één receptor activeert meerdere G-eiwitten; adenylylcyclase ATP → cAMP; PKA: cAMP bindt de remmende (R) delen, C komt vrij; C in de kern fosforyleert CREB op het CRE; CBP/p300 (acetylering → toegankelijker) en Pol II; GTPase-activiteit van Gαs, PDE's, fosfatasen | ✅ |
| `rtk` | EGF 53 aminozuren; inactieve monomeren; klem tussen domein I en III, dimerisatiearm in II; receptorgemedieerd dimeer (EGF's raken elkaar niet); asymmetrisch kinasedimeer (één activeert de ander); trans-autofosforylering van tyrosines in de staart (fosfaat uit ATP); Grb2 SH2 ↔ pY, 2 × SH3 ↔ SOS; Ras met lipide-anker; actief complex aan de binnenkant | ✅ |
| `mapk` | Raf, MEK en ERK als kinasen; Ras-GDP uit / Ras-GTP aan, SOS als GEF, overmaat GTP; Ras-GTP rekruteert Raf naar het membraan; Raf fosforyleert MEK op twee plaatsen; MEK fosforyleert ERK op Thr én Tyr, volledig actief met beide; versterking (schematisch); ERK in de kern → Elk-1 bij FOS; trage intrinsieke GTPase, GAP versnelt; fosfatasen; G12/G13/Q61 → GAP-ongevoelig; ≈ 1 op 5 kankerpatiënten (Prior et al. 2020: ≈ 19 %) | ✅ |
| `srf` | SRE stroomopwaarts van FOS met voorgebonden factoren; CArG-box met SRF-dimeer; Ets-plek naast CArG, Elk-1 bindt enkel samen met SRF (ternair complex); ERK fosforyleert het activatiedomein op meerdere plaatsen; Mediator (MED23) naar Pol II; FOS-pre-mRNA binnen minuten; primair responsgen (ook onder cycloheximide); c-Fos + c-Jun = AP-1, secundaire genen; fosfatasen, korte halfwaardetijd, puls | ✅ |
| `steroid` | cortisol uit de bijnierschors, uit cholesterol, vetoplosbaar; passieve diffusie zonder transporter of oppervlaktereceptor; GR in het cytosol met chaperones (Hsp90); binding → vormverandering, chaperones los, NLS vrij; importines; GR-homodimeer op het GRE, elk DBD leest een halve plaats met zinkvingers; co-activatoren, PEPCK in de lever; receptor = transcriptiefactor | ✅ |

`kort` signal1 (signaal, gpcr, steroid) en signal2 (rtk, mapk/Ras, srf/FOS): alles ✅. FOS: "de nodige eiwitten zitten al klaar op het DNA" klopt (TCF/SRF voorgebonden op het SRE). Ras: "blijft vast 'aan' → kan bijdragen tot kanker" klopt.

## 3 · Genoom (`app/scenes/genome/*`)

| Scène | Gecontroleerde uitspraken | Oordeel |
|---|---|---|
| `kern` | DNA met eiwitten als chromatine; transcriptie; nucleolus bouwt ribosomen; 46 chromosomen, ~2 m DNA, kern ~8 µm; twee membranen, duizenden poriën als enige doorgang; euchromatine actief, heterochromatine aan de rand; Pol I maakt rRNA, subeenheden worden opgebouwd; meerdere Pol II per gen, langere RNA's verderop; mRNA-export; adeno-DNA episomaal en door Pol II gelezen | ✅ |
| `chromatine` | ~2 m in 5–10 µm; chromosoomterritoria; heterochromatine aan de lamina en rond de nucleolus; cohesine (ringvormig, ATP) extrudeert lussen tot convergente CTCF; TAD's, Hi-C-driehoeken; eu-/heterochromatine, merktekens + lezers; kralen aan een snoer, ~200 bp per nucleosoom; 30 nm-vezel in vitro, onregelmatig in vivo; ~147 bp rond 8 histonen | ✅ |
| `chromosoom` | 23 paren (22 autosomen + XX/XY), ruim 3 miljard bp; chr1/chr21 > 5× (248/45 Mb); rDNA op 5 chromosomen; zusterchromatiden, centromeer, p/q; cohesine, separase in de anafase; centromeer: herhaald DNA met CENP-A, kinetochoor; telomeren TTAGGG, shelterin, telomerase; condensine, ~10 000× compactie; terug naar chromatine | ❌ 1 (#3), rest ✅ |
| `nucleolus` | grootste lichaampje zonder membraan, rond rDNA op 5 chromosomen; drie zones (FC, DFC, GC), rRNA beweegt naar buiten; honderden tandemkopieën, deels afgeschreven, spacer; tientallen Pol I per gen (kerstboom); 47S met 18S/5.8S/28S; snoRNA's sturen modificaties; 18S → klein, 5.8S/28S/5S → groot, ~80 eiwitten; aparte export; rRNA ≈ 80 % van het RNA | ❌ 1 (#4), rest ✅ |
| `nucleosoom` | 1KX5: DNA rond 8 histonen, schijf ~11 nm; ~1,7 linkshandige superhelixwindingen (147 bp ≈ 1,65), DNA zelf rechtshandig B; (H3–H4)₂-tetrameer eerst; 2 × H2A–H2B → octameer; drie α-helices, handdrukmotief; staarten met lysines, merktekens; contact via de ruggengraat → sequentie-onafhankelijk; linker 20–80 bp | ✅ |
| `dnahelix` | dubbelhelix, B-DNA rechtshandig; antiparallel 5′→3′; suiker-fosfaatruggengraat buiten, negatief geladen; A–T 2 en G–C 3 H-bruggen, stapeling; grote/kleine groef door asymmetrische suikeraanhechting; 2 nm, 3,4 Å, 10,5 bp, 3,5 nm per winding; 34°; 1BNA = 12 bp kristal (1981) | ✅ |
| `basenparing` | A–T 2 H-bruggen, G–C 3; GC-stabiliteit vooral door stapeling; purine + pyrimidine even breed; kleine groef aan de suikerzijde, patroon in de grote groef; Chargaff, mens ≈ 41 % GC; stapeling > H-bruggen; Hoogsteen = purine 180° (anti → syn), triplexen/G4; G·U-wobble, één tRNA leest meerdere codons | ✅ |
| `dnavormen` | A/B/Z, 16 bp op schaal; B: rechts, 10,5 bp, 2 nm, basen loodrecht, grote groef breed; A: rechts, korter/breder, 11 bp, basen gekanteld en naast de as, grote groef smal en diep; Z: links, 12 bp, zigzag door G syn / C anti; spoed 28/36/45 Å; holte in A; C3′-endo → fosfaten dichter; waar welke vorm voorkomt (Z bij hoog zout of onderwonden DNA) | ✅ |
| `nucleotide` | base + pentose + fosfaat; 1′–5′, deoxyribose versus ribose; base aan C1′, β; nucleoside/nucleotide, dATP als bouwsteen; purines 2 ringen, pyrimidines 1; T = U + methyl; naamgeving; 3′→5′-fosfodiësterbinding, richting; C2′-endo (B) / C3′-endo (A, RNA); anti/syn (G syn in Z-DNA) | ⚠️ 1 (#8), rest ✅ |
| `noncanon` | lokale alternatieve structuren; G-kwartet met 8 Hoogsteen-H-bruggen; K⁺ tussen kwartetten; propeller (K⁺, kristal) / mand (Na⁺, oplossing); telomeer-3′-overhang, G-rijke promoters, helicasen; triplex in de grote groef met de purines, C⁺ vraagt een zuurder milieu; H-DNA bij een spiegelherhaling; kruisvorm bij een palindroom; i-motief C·C⁺ bij licht zure pH | ✅ |
| `gen` | gen = getranscribeerde sequentie + regulerende regio's; ~1–1,5 % codeert eiwit; enhancers via een DNA-lus; startcomplex op de promoter, +1; exonen/intronen, GT–AG; ATG tot stop, UTR's niet vertaald; AATAAA, knip, poly(A); cap, splicing, poly(A) → rijp mRNA | ✅ |
| `histonmod` | staarten van de 8 histonen; zes lysines vooraan in H3 (K4, K9, K14, K18, K23, K27); HAT's neutraliseren de lading; HDAC's; methylatie behoudt de lading, H3K4me3 aan actieve promoters; H3K9me3 en H3K27me3/Polycomb; bromodomein ↔ Kac, chromodomein ↔ Kme (HP1); schrijvers, wissers, lezers | ✅ |
| `dnamethyl` | CpG (C vóór G), symmetrisch; 5-methylcytosine in de grote groef, paring onveranderd; DNMT3A/B de novo, SAM; hemimethylering na replicatie; DNMT1 onderhoud; CpG-eilanden ongemethyleerd, gemethyleerde promoter trekt repressoren aan; TET + herstel (TDG/BER); transposons, Xi, imprinting | ✅ (UHRF1 weggelaten: vereenvoudiging, geen fout) |
| `supercoiling` | lussen met vaste uiteinden; 10,5 bp per winding; Lk = Tw + Wr, verandert enkel bij een strengbreuk; ΔLk = −2, onderwonden; overgang naar writhe, Lk 10 = Tw 12 + Wr −2; cellulair DNA licht onderwonden, spanning vooral in nucleosomen; twin-domain; TOP1 één streng zonder ATP; TOP2 beide strengen met ATP, decatenatie; kankergeneesmiddelen | ✅ |

`kort` genome/genome2:
- `gen`: ⚠️ (#9).
- `nucleolus`: "de meeste RNA's van het ribosoom" is correct (5S komt van Pol III).
- Alle andere: kern, chromosoom, chromatine, nucleosoom ("bijna twee keer rond"), histonmod, dnamethyl, dnahelix, dnavormen, noncanon, basenparing, nucleotide en supercoiling: ✅.

## 4 · Gewijzigde bestanden
- `app/scenes/entry/baltimore.js`: #1, #2
- `app/scenes/genome/chromosoom.js`: #3
- `app/scenes/genome/nucleolus.js`: #4
- `app/scenes/genome/nucleotide.js`: #8
- `shared/details/entry.js`: #5, #6, #7
- `shared/details/genome.js`: #9
