# Verificatie ronde 3 — stage `prot` en de atlasschema's na de opruimronde

Datum: 30 september 2026
Aanleiding: bij de opruimronde (29–30 september) zijn honderden labels en stapteksten ingekort, samengevoegd of verplaatst, en zijn enkele stappen herontworpen (vouwing stap 5 Levinthal-raster, primair 1/2/5, peptide 3/4, misvouwing stap 2 kinetiekcurve, ptm stap 8 E3-ligase, aminozuren-quiz, secundair helixschets "1 winding = 5,4 Å"). De atlasschema's (`atlas/diagrams.js`) zijn herbouwd met de legende in HTML.

Bereik:
- alle scènes in `app/scenes/prot/` (16 scènes; `_a_*`/`_b_kit` enkel waar ze zichtbare tekst maken): stap-`title`/`text`, SVG-labels (`T2`, `L({nl,en})`, `txt`), `simplified`, `extra`, `scale`, `time`, `org`, legenda's;
- `atlas/diagrams.js` (mRNA, pre-mRNA, mtDNA, plasmide, cDNA, lncRNA, T-DNA) inclusief de HTML-legendes, stappen en notities;
- `atlas/entries.js`, enkel de zeven items die bij een schema horen.

Methode:
- Per scène alle zichtbare tekst uitgelezen en met een scriptje (stringvergelijking) naast de back-up van vóór de opruimronde gelegd (`protA/orig`, `protB/orig`, `fixC/orig` in de scratchpad), zodat elke weggevallen of nieuwe zin apart bekeken werd; daarna de huidige tekst als geheel gelezen.
- Wat in ronde 2 al met bron bevestigd was en inhoudelijk ongewijzigd bleef, is niet opnieuw opgezocht (zie `verificatie-ronde-2-prot-atlas.md`); wel gecontroleerd dat inkorten de betekenis, getallen en NL/EN-gelijkheid niet veranderde.
- mtDNA-genkaart: alle 37 loci (begin, einde, streng) vergeleken met de NCBI-featuretabel van NC_012920.1 (E-utilities `efetch rettype=ft`).
- Nieuwe of twijfelachtige beweringen nagekeken in reviews en primaire literatuur (zie per item).
- Na de wijzigingen: `node --check` op elk gewijzigd bestand (als .mjs), `tools/check.html` headless → **PROBLEMS (0)**, `tools/text-check.html?w=1000&min=13&ids=aminozuren,peptide,ramachandran,quaternair,secundair,chaperones,misvouwing,ptm` → overal **klein 0**, drukke stappen 0; `atlas/index.html?id=tdna|plasmid|mtdna` headless → geen `Uncaught`-fouten; T-DNA-schema als PNG gerenderd en visueel nagekeken.

Legenda: ✅ klopt · ⚠️ klopt in grote lijnen, nuance of verduidelijking nodig · ❌ fout (verbeterd)

Aantal nagekeken beweringen: ≈ 330 zichtbare beweringen in scènes en schema's, plus de 37 mtDNA-loci afzonderlijk.

---

## Samenvatting van de wijzigingen

| # | Bestand | Voor → na | Reden en bron |
|---|---|---|---|
| 1 | `atlas/diagrams.js` (T-DNA, stap 2 + tekening) | "De enkelstrengige T-streng, **bedekt met VirE2**, gaat via type IV-secretie naar de plantencel"; tekening: VirE2-bolletjes op de T-streng in de bacterie → "De enkelstrengige T-streng (met VirD2) en, **apart**, VirE2 gaan via type IV-secretie naar de plantencel; daar bedekt VirE2 de T-streng → kern" (+ EN); VirE2 nu als losse bolletjes naast de T-streng getekend | ❌ VirE2 wordt onafhankelijk van het VirD2–T-streng-complex door hetzelfde VirB/D4-systeem uitgescheiden en vormt pas in het cytoplasma van de plantencel het T-complex (Vergunst et al. 2000, *Science* 290:979; Li et al. 2014, PMC3937733 "Visualization of VirE2 protein translocation…"). |
| 2 | `atlas/entries.js` (`tdna.what`, NL+EN) | "…T-streng, die bedekt met VirE2 via een type IV-secretiesysteem de plantencel binnengaat" → "…die via een type IV-secretiesysteem de plantencel binnengaat; VirE2 wordt apart uitgescheiden en bedekt de T-streng pas in de plantencel" | idem #1 (de fout zat ook in de begeleidende atlastekst). |
| 3 | `app/scenes/prot/secundair.js` (stap 1, helixschets) | diepte-coördinaat `+cos` → `−cos` | ❌ De zijaanzichtschets gaf met de helderheid (voor/achter) een **linkshandige** helix weer (torsie van (t, sin t, cos t) is negatief). Met `−cos` is ze rechtshandig, zoals de tekst naast de schets zegt. De spoed "1 winding = 5,4 Å" (3,6 × 1,5 Å) klopt en is ongewijzigd. |
| 4 | `app/scenes/prot/chaperones.js` (stap 8 + `extra`, NL+EN) | "Hsp70 helpt **de meeste** ketens, chaperoninen een deel" → "Hsp70 helpt **veel** ketens, chaperoninen een **kleiner** deel" | ⚠️→ verbeterd: pulse-chase-metingen geven ~10–20 % van de nieuwe ketens via Hsp70 (post-translationeel) en ~10 % via TRiC; de meerderheid vouwt zonder die stroomafwaartse chaperones (Hartl, Bracher & Hayer-Hartl 2011, *Nature* 475:324, fig. 3; Thulasiraman, Yang & Frydman 1999, *EMBO J* 18:85). "De meeste" was dus te sterk. |
| 5 | `aminozuren.js`, `peptide.js`, `ramachandran.js`, `quaternair.js` (`scale`) | één NL-string (`'≈ 0,5–1 nm'`, `'≈ 0,1–1 nm'`, `'1 residu · 0,1–1 nm'`, `'≈ 6,5 nm'`) → `{ nl, en }` met decimale punt en "residue" | ❌ (NL/EN) In de Engelse versie verschenen een decimale komma en het Nederlandse woord "residu". |
| 6 | `quaternair.js` (stap 5, paneel) | "alles niet-covalent" → "in Hb: alles niet-covalent" (+ EN) | ⚠️ Na het inkorten las de regel als algemene regel voor quaternaire structuur; de cursus (en ronde 2, #1) noemt ook disulfidebruggen tussen ketens (bv. antistoffen). Voor hemoglobine klopt het. |
| 7 | `misvouwing.js` (stap 3, NL) | "Twee bladen (~10 Å) grijpen in elkaar" → "Twee bladen (~10 Å uit elkaar) grijpen in elkaar" | ⚠️ NL/EN-gelijkschakeling (EN: "~10 Å apart"); in NL was niet duidelijk wat 10 Å was. |
| 8 | `secundair.js` (stap 5, NL) | "Alleen is ze niet stabiel" → "Op zichzelf is ze niet stabiel" | ⚠️ Dubbelzinnig NL ("alleen" = "enkel" of "op zichzelf"); EN "Alone it is not stable". |
| 9 | `ptm.js` (`extra`, methylatie, NL+EN) | "me1/me2/me3 (Lys)" → "me1/me2/me3 op Lys (ook Arg: me1/me2)" | ⚠️ Na het verplaatsen van de kaartdetails naar `extra` suggereerde de regel dat enkel Lys gemethyleerd wordt; Arg wordt mono- en (a)symmetrisch gedimethyleerd (in lijn met ronde 2, #11). |
| 10 | `atlas/diagrams.js` (plasmide, legende promotor) | "een eukaryote promotor (bv. CMV)" → "een promotor voor RNA-polymerase II (bv. de virale CMV-promotor)" (+ EN) | ⚠️ De CMV-promotor is viraal (humaan cytomegalovirus), niet eukaryoot van oorsprong; wel een Pol II-promotor die in zoogdiercellen werkt. |

Regeleinden (CRLF waar het origineel CRLF had) zijn behouden. De map `dist/` (build-uitvoer) is **niet** aangepast; die bevat nog de oude T-DNA-tekst tot de volgende build.

---

## A · Scènes (`app/scenes/prot/`)

### aminozuren — De 20 aminozuren
Veranderd bij de opruimronde: groepstitels zonder "meestal binnenin/aan het oppervlak", nieuwe quiz (namen verschijnen één voor één), panelen glycine/proline/Cys/L-D ingekort, Sec/Pyl-kaarten met "UGA → Sec", "UAG → Pyl".

| Claim | Verdict |
|---|---|
| Cα met aminogroep, carboxylgroep, H en zijketen R; enkel R verschilt | ✅ |
| Zwitterion bij pH 7 (NH₃⁺/COO⁻) | ✅ |
| Indeling hydrofoob GAVLIMFWP / polair STCNQY / + KR(H) / − DE; Gly/Pro "speciaal" | ✅ (cursus; `simplified` meldt dat handboeken verschillen) |
| Hydrofoob "meestal in de kern", polair "meestal aan het oppervlak" (nu enkel in de stapteksten) | ✅ betekenis bewaard |
| His + in zuur milieu; pKa ≈ 6 | ✅ |
| Gly achiraal, flexibel; Pro: ring op eigen N, star imino-zuur | ✅ (weggevallen "φ ligt vast" staat nog in ramachandran) |
| Cys–SH + HS–Cys → Cys–S–S–Cys + 2 H⁺ + 2 e⁻; vooral extracellulaire eiwitten, gevormd in het ER | ✅ |
| L-aminozuren; Fischer: NH₃⁺ links = L (tekening L links, D rechts, spiegelvlak) | ✅ |
| D-vormen zeldzaam, niet via ribosomen | ✅ |
| Sec op UGA + SECIS; Pyl op UAG in sommige archaea/bacteriën | ✅ |
| Quiz: 20 kaarten, namen NL/EN correct gespeld | ✅ |
| `scale` enkel NL-notatie | ❌ → #5 |

### peptide — Peptidebinding & φ/ψ
| Claim | Verdict |
|---|---|
| Condensatie Gly + Ala, water komt vrij; amidebinding; N- en C-terminus; leesrichting N → C | ✅ |
| Resonantie: C–N ≈ 1,32 Å tussen enkel (≈ 1,47) en dubbel (≈ 1,27); geen vrije draaiing | ✅ |
| Twee resonantievormen (O⁻/N⁺) en trans-tekening (O en H, Cα en Cα aan weerszijden) | ✅ |
| 6 atomen in één vlak; trans bijna altijd, cis zeldzaam, vooral vóór Pro | ✅ |
| φ rond N–Cα, ψ rond Cα–C; "phi heeft de N, psi heeft de C" | ✅ |
| Botsingen beperken φ/ψ → Ramachandran | ✅ |
| Peptide tot ± 50 residuen | ✅ (cursus) |
| Ideale geometrie (Engh & Huber), 5–6 bindingen/s (mens) | ✅ (ronde 2) |
| `scale` enkel NL-notatie | ❌ → #5 |

### primair — Primaire structuur
Herontworpen stappen 1, 2 en 5.

| Claim | Verdict |
|---|---|
| CDS NM_000518.5: AUG GUG CAU CUG ACU CCU GAG GAG AAG UCU → M V H L T P E E K S; start-Met wordt verwijderd | ✅ |
| Rijpe nummering Val = 1; N-terminus Val1, C-terminus His146 | ✅ |
| FASTA: kopregel ">", 60 letters per regel, `sp|P68871|HBB_HUMAN … OS=Homo sapiens OX=9606 GN=HBB PE=1 SV=2`; UniProt 147, rijp eiwit en PDB 1BBB 146 | ✅ |
| Annotaties sp = Swiss-Prot, accessie, OS = organisme, GN = gen | ✅ |
| Hydrofobe residuen die om de 3–4 posities terugkeren vormen in een helix één kant | ✅ (amfipathische helix, 3,6 res./winding) |
| Helices A–H uit 1BBB | ✅ (ronde 2) |
| Glu6Val: GAG → GUG, − geladen → hydrofoob | ✅ |
| Residu/peptide/polypeptide; Sanger: zelfde eiwit → zelfde sequentie | ✅ |
| Schaal 146 residuen ≈ 50 nm (3,5 Å/res.) | ✅ |

### secundair — Secundaire structuur
| Claim | Verdict |
|---|---|
| α-helix rechtshandig, 3,6 res./winding, 1,5 Å/res.; "1 winding = 5,4 Å" | ✅ |
| Helixschets (zijaanzicht, 12 residuen) | ❌ gaf een linkshandige helix weer → #3 |
| C=O(i) ··· H–N(i+4); 100° per residu | ✅ |
| 3₁₀ (i→i+3, 3,0 res./winding, 56–59) en π (i→i+5, 4,4) | ✅ |
| β-streng ~3,5 Å/res., vaak 5–8 residuen, getekend als pijl N → C | ✅ |
| "Alleen is ze niet stabiel" | ⚠️ dubbelzinnig NL → #8 |
| β1 ⇅ β2 (antiparallel, H-bruggen recht), β1 ∥ β5 (parallel, schuin); gemengd blad; 5 strengen | ✅ (1UBQ SHEET-records, ronde 2) |
| Haarspeld 7–10 (Gly10); lussen 18–22 en 51–55 | ✅ (tussen de SS-elementen van 1UBQ) |
| Twist rechtshandig, φ/ψ ≈ −120°/+130°; β-bulge = één extra residu | ✅ |
| Lussen: haarspeld ± 2–5, omega 6–16, random coil > 16 | ✅ / ⚠️ open punt uit ronde 2 blijft |
| Helixwiel: "groen = hydrofoob · blauw/rood = geladen" | ✅ (polair cyaan niet vermeld, niet fout) |

### ramachandran — Ramachandran-plot
| Claim | Verdict |
|---|---|
| φ/ψ van −180° tot +180°; voorbeeld ideale α-helix (−60°, −45°) | ✅ |
| Verboden gebieden door botsing van O, N, H, Cβ | ✅ |
| Hb vooral α; β-punten in lussen/uiteinden; eiwitten met β-bladen hebben een tweede wolk | ✅ |
| Gly zonder Cβ ook bij positieve φ; Pro φ ≈ −65° | ✅ |
| Goed model > 98 % in voorkeursgebieden (MolProbity) | ✅ |
| Legende "voorkeur/toegestaan" met de juiste kleuren (#2b5ea8 / #173a6b) | ✅ (fout uit ronde 2 niet teruggekomen) |
| `scale` "1 residu · 0,1–1 nm" ook in EN | ❌ → #5 |

### tertiair — Tertiaire structuur & domeinen
| Claim | Verdict |
|---|---|
| β-globine 146 residuen, globulair, één heem; tertiair = 3D-vorm van één keten | ✅ |
| Acht helices A–H, CD-hoek; all-α | ✅ |
| Hydrofoob effect: geordend water vrij, entropie ↑ | ✅ (ingekort zonder betekenisverlies) |
| Polair/geladen oppervlak; groene plekken vaak contactvlakken | ✅ |
| Heem tussen E en F; Fe²⁺ aan His92 (F8, proximaal); O₂ (hier CO) naast His63 (E7, distaal); heem = protoporfyrine IX + Fe²⁺ | ✅ |
| Zoutbrug = ionpaar (+/−); H-brug; backbone-H-bruggen in de kern voldaan | ✅ |
| Cys93 en Cys112 zonder S–S; cytosol reducerend | ✅ |
| Motieven HTH, vierhelixbundel, β-haarspeld, Greek key, β-sandwich, β-barrel, Rossmann (βαβαβ), hoefijzer (LRR) | ✅ |
| Klassen all-α, all-β, α/β, α+β; globulair/membraan/fibreus | ✅ |

### quaternair — Quaternaire structuur
| Claim | Verdict |
|---|---|
| α₂β₂, α 141 / β 146, 4 hemen; Perutz 1959, Nobelprijs 1962 | ✅ ("samen met Kendrew" weggevallen: niet fout) |
| Heterotetrameer, α en β homoloog (globinevouw) | ✅ |
| Protomeer = αβ; dimeer van twee αβ-protomeren | ✅ |
| α1β1 groot, stabiel; α1β2 kleiner, dimeren schuiven (T → R) na trek aan de proximale His | ✅ (Perutz-mechanisme) |
| "Dezelfde krachten … hier tussen ketens"; paneel "alles niet-covalent" | ⚠️ → #6 |
| Coöperatieve binding; longen/weefsels | ✅ |
| HbS: Glu6Val, deoxy-HbS vormt lange vezels | ✅ |
| 1BBB = CO-gebonden R2-toestand (`simplified`) | ✅ (ronde 2) |
| `scale` enkel NL-notatie | ❌ → #5 |

### vouwing — Eiwitvouwing
Herontworpen stap 5 (Levinthal-raster).

| Claim | Verdict |
|---|---|
| Co-translationele vouwing; 80S-ribosoom, uitgangstunnel, N-terminus eerst | ✅ |
| Random coil, hydrofobe collaps als drijvende kracht, molten globule, natieve toestand | ✅ |
| HP-model Lau & Dill 1989; H = A V L I M F W; β-globine 1–40 | ✅ |
| Anfinsen: RNase A 124 residuen, 4 S–S → 8 × SH, 8 M ureum + β-mercapto-ethanol, dialyse + O₂; Nobelprijs 1972 | ✅ |
| Levinthal 1969: 3¹⁰⁰ ≈ 5·10⁴⁷; bij 10¹³/s ± 10²⁷ jaar; heelal 1,4·10¹⁰ jaar; echte eiwitten µs–s | ✅ (nagerekend: 5,15·10³⁴ s = 1,6·10²⁷ j) |
| Raster met voorbeeldconformaties (van het 40-residumodel) naast de "100 residuen"-rekensom | ✅ illustratief, geen tegenspraak |
| Energietrechter, valkuil (lokaal minimum), natieve structuur = laagste vrije energie | ✅ |
| Hsp70 schermt af, TRiC biedt een vouwkamer; misvouwing/aggregatie | ✅ |

### chaperones — Chaperones
Netwerklabels ("nieuwe keten", "meeste ketens", "via E3 (bv. CHIP)" …) zijn verplaatst naar `extra`.

| Claim | Verdict |
|---|---|
| Hsp70·ATP: deksel open, lage affiniteit; Hsp40 (J-eiwit) brengt substraat en stimuleert hydrolyse; ADP: dicht, hoge affiniteit; NEF wisselt ADP → ATP | ✅ |
| GroEL 2 × 7, GroES-deksel, 7 ATP, wand wordt hydrofiel, tot ~60 kDa, ~10 s; ATP op de andere ring stoot uit | ✅ |
| Mens: TRiC/CCT, 2 × 8 verschillende subeenheden, ingebouwd deksel | ✅ |
| Cytosol ~300–400 g/L | ✅ |
| "Hsp70 helpt de meeste ketens" | ⚠️ te sterk → #4 |
| Hsp90: kinasen, steroïdreceptoren; E3 (CHIP) → afbraak | ✅ |

### ptm — Post-translationele modificaties
Herontworpen stap 8 (E3-ligase met ubiquitines die één voor één aan de keten komen); kaartdetails naar `extra`.

| Claim | Verdict |
|---|---|
| Kinase: γ-fosfaat van ATP → Ser-OH, ATP → ADP; 2 negatieve ladingen; ook Thr/Tyr; ~500 kinasen | ✅ |
| Fosfaat ↔ Arg trekt de lus weg (activatielus) — `simplified` meldt dat dit één mechanisme is | ✅ |
| Fosfatase hydrolyseert (Pᵢ) | ✅ |
| Raf → MEK → ERK (MAPKKK/MAPKK/MAPK); MEK fosforyleert ERK op Thr én Tyr; via Ras | ✅ |
| Kaarten: Ser, Lys-Ac, Lys-CH₃, Lys-Ub, Asn-glycaan, Gly(N-term)/Cys-lipide, S–S, Pro → Hyp | ✅ |
| `extra` methylatie "(Lys)" | ⚠️ → #9 |
| Prolyl-4-hydroxylase in het ER, Fe²⁺ + vitamine C; Gly op elke 3e positie; scheurbuik; collageen ~300 nm | ✅ |
| E3-ligase, K48-polyubiquitine, ≥ 4 ubiquitines = afbraak | ✅ (Thrower 2000) |

### glyco — N-glycosylatie
Geen tekstwijzigingen t.o.v. ronde 2 (stringvergelijking: niets toegevoegd of verwijderd). Opnieuw gelezen: SRP/Sec61, sequon N-X-S/T (X ≠ Pro), Glc₃Man₉GlcNAc₂ (14 suikers) op dolichol-PP, OST en bloc, glucosidase I/II, calnexine/calreticuline, UGGT, ER-mannosidase I, ERAD, Golgi-verwerking, O-GalNAc begint in het Golgi ✅.

### disulfide — Disulfidebruggen
Enige wijziging: insulinelabel ingekort tot "uit één proinsulineketen; C-peptide later weggeknipt" ✅ (de weggevallen "de bruggen vormen in het ER" staat in stap 7/8 en in de ER-panelen).
Verder ✅: Cys 12 en 58 liggen 46 residuen uit elkaar (klopt met de fictieve nummering); oxidatie 2 –SH → –S–S– + 2 H⁺ + 2 e⁻; PDI CGHC, thioredoxinevouw; Ero1 via FAD → O₂ → H₂O₂; isomerisatie door gereduceerde PDI; GSH:GSSG ER ≈ 1:1–3:1, cel ≈ 30:1–100:1; insuline A 21 / B 30 aa, A6–A11, A7–B7, A20–B19.

### golgi — Golgi & secretie
Enige wijziging: de labels "endosoom (pH ≈ 6)" en "lysosoom (pH ≈ 4,5–5)" zijn weggevallen (geen fout; de stappen noemen het "zure endosoom"). Overige tekst ongewijzigd en ✅ (COPII/ERGIC, KDEL-receptor/COPI, cisternale rijping, M6P, constitutieve vs gereguleerde secretie).

### misvouwing — Misvouwing & aggregatie
Herontworpen stap 2 (kinetiekcurve).

| Claim | Verdict |
|---|---|
| Misgevouwen eiwit met hydrofobe stukken buiten; Hsp70/TRiC → opnieuw vouwen; anders ubiquitine → proteasoom | ✅ |
| Aggregatie bij overbelasting; amorfe klonten of oligomeren → fibrillen | ✅ |
| Kinetiek: lag-fase (nucleatie), groei (monomeren aan de uiteinden), plateau; seed verkort/omzeilt de lag-fase; y-as "massa in fibrillen"; `simplified` vermeldt secundaire nucleatie en fragmentatie | ✅ (Chiti & Dobson 2017; Knowles et al. 2009) |
| Cross-β: strengen ⟂ as, ~4,7 Å; H-bruggen ∥ as; bladen ~10 Å; steric zipper | ✅ / NL-formulering → #7 |
| Aβ/tau, α-synucleïne, IAPP, PrP; oligomeren toxisch | ✅ |
| PrPSc als mal, PrPC α-rijk; "2 → 4 → 8" | ✅ |
| UPR: BiP laat IRE1/PERK/ATF6 los; XBP1-splicing, eIF2α-P, ATF6 → Golgi → ATF6(N); langdurig → apoptose | ✅ |

### idp — Intrinsiek ongeordende eiwitten
Kaarten ingekort ("groot contactvlak, matige affiniteit", "eukaryoten ~1/3 · bacteriën ~4 %", "Aβ, α-synucleïne → amyloïd"). De uitleg "specifiek maar snel omkeerbaar" staat in de kaarttitel, stap 7 en `extra` ✅. Getallen ongewijzigd (IDR > 30 aa: ~1/3 eukaryoten, ~4 % bacteriën — Ward et al. 2004) ✅. Overige tekst ✅ (ronde 2).

### ubiquitine — Ubiquitine–proteasoom
Labels ingekort ("activerend enzym" voor E1, "Rpt1–6", slotzin "Van gen tot eiwit tot afbraak.") ✅. Stapteksten ongewijzigd en ✅ (E1-adenylaat/thio-ester, E2~Ub, E3 + degron, isopeptidebinding, K48 ≥ 4, K63/mono-Ub, Rpn1/10/13, Rpn11, Rpt1–6, α7β7β7α7, β1/β2/β5, 3–22 aa).

---

## B · Atlasschema's (`atlas/diagrams.js`) en bijhorende atlasteksten

### mRNA
| Claim | Verdict |
|---|---|
| 5'-cap m⁷GpppNm (cap 1); eIF4E → 43S laadt; cap beschermt tegen 5'→3'-afbraak | ✅ |
| 5'-UTR: scannen naar het eerste AUG, Kozak gccRccAUGG | ✅ |
| CDS van AUG tot stop; stopcodons UAA/UAG/UGA; EJC's → NMD | ✅ |
| 3'-UTR: miRNA-seeds, ARE's, AAUAAA | ✅ |
| Poly(A) ~200–250 nt bij synthese; PABP–eIF4G "gesloten lus"; deadenylatie start afbraak | ✅ (entries: "daarna geleidelijk ingekort") |
| Richting 5' → 3', niet op schaal | ✅ |

### pre-mRNA
| Claim | Verdict |
|---|---|
| Intron begint met GU, eindigt op AG; vertakkingspunt-A stroomopwaarts, polypyrimidinetraject tussen A en AG | ✅ (tekening in die volgorde) |
| 2 transesterificaties; lariat met 2'–5'-binding op het vertakkings-A | ✅ |
| EJC's op de exonovergangen | ✅ |
| Entries: A ~20–50 nt stroomopwaarts; >90 % van de multi-exongenen alternatief gespliced; ~9 exonen van ~150 nt | ✅ (Wang et al. 2008) |

### mtDNA
| Claim | Verdict |
|---|---|
| Alle 37 loci (begin/einde/streng) | ✅ **exact gelijk** aan de NCBI-featuretabel NC_012920.1 (L-streng = omgekeerde coördinaten: TRNQ, TRNA, TRNN, TRNC, TRNY, TRNS1, ND6, TRNE, TRNP) |
| Tellingen: 13 eiwit, 2 rRNA, 22 tRNA; H 28, L 9 (ND6 + 8 tRNA) | ✅ (nageteld uit de datatabel) |
| Controleregio 16024–576 (~1,1 kb), D-lus, HSP/LSP, OH (191) | ✅ |
| OL in de tRNA-cluster WANCY (merkteken 5750, OL = 5721–5798) | ✅ |
| 12S/16S, ATP8/6 en ND4L/4 overlappen → één label | ✅ |
| Complexen I (ND1–6, ND4L), III (CYTB), IV (COX1–3), V (ATP6, ATP8) | ✅ |
| 2 tRNA-genen voor Leu en 2 voor Ser | ✅ |
| Nummering rCRS met de klok mee vanaf boven | ✅ (hoekfunctie nagekeken) |
| Entries: 16 569 bp; mt-code UGA = Trp, AUA = Met, AGA/AGG = stop; stopcodons door polyadenylering; naamgeving H/L volgens MITOMAP | ✅ |

### Plasmide
| Claim | Verdict |
|---|---|
| Promotor → MCS → insert → pA; AmpR (bla), ori (kopieaantal, E. coli) | ✅ |
| "eukaryote promotor (bv. CMV)" | ⚠️ → #10 |
| ~5 kb, dubbelstrengig, circulair; na transfectie episomaal | ✅ |

### cDNA
| Claim | Verdict |
|---|---|
| Oligo(dT)-primer op poly(A); RT verlengt 5'→3' (in de tekening naar het 5'-uiteinde van het mRNA) | ✅ |
| RNA–DNA-hybride (A-achtig); RNase H knipt, fragmenten als primers (Gubler–Hoffman) | ✅ |
| ds cDNA zonder intronen en promotor | ✅ |
| Entries: Temin/Baltimore 1970; LINE-1 ~17 %; telomerase = RT | ✅ |

### lncRNA
| Claim | Verdict |
|---|---|
| Gids (XIST → PRC2), steiger (NEAT1, paraspeckles), lokvogel (miRNA/RBP), signaal/transcriptie in cis | ✅ (archetypen volgens Wang & Chang 2011; Statello 2021) |
| Entries: > 200 nt; XIST ~17 kb; GENCODE ~20 000 lncRNA-genen | ✅ |

### T-DNA
| Claim | Verdict |
|---|---|
| Ti-plasmide ~200 kb; T-DNA tussen LB en RB; vir-genen; ori | ✅ |
| VirD1/D2 knippen; VirD2 aan het 5'-uiteinde | ✅ |
| "T-streng, bedekt met VirE2, gaat via T4SS naar de plantencel" (schema én entries) | ❌ → #1, #2 |
| Integratie dubbelstrengig in een plantenchromosoom; "niet in de menselijke cel" | ✅ |

---

## C · Open punten

1. **Haarspeldlussen** (secundair, stap 9): "± 2–5 residuen" tegenover de cursus "minimum 4–5" — open punt uit ronde 2, ongewijzigd gelaten.
2. **Hsp70-aandeel** (chaperones): de nieuwe formulering "veel ketens, chaperoninen een kleiner deel" is voorzichtig. In gist bindt het ribosoomgebonden Hsp70 (Ssb) co-translationeel wél een groot deel van de ontluikende ketens (Willmund et al. 2013); als de docent Hsp70 als "belangrijkste" chaperone voorstelt, kan dat aan de uitlegtekst toegevoegd worden, maar "de meeste ketens" zonder nuance is niet te onderbouwen voor menselijke cellen.
3. **`dist/`-map**: bevat nog de oude T-DNA-tekst (VirE2 op de T-streng). Opnieuw bouwen na deze ronde.
4. **Levinthal-raster** (vouwing, stap 5): de kleine voorbeeldconformaties komen uit het 40-residumodel, terwijl de rekensom over 100 residuen gaat. Dat is geen fout (het raster is illustratief), maar een onderschrift als "voorbeeldvormen" zou verwarring voorkomen. Niet aangepast om het beeld niet voller te maken.
5. **Helixwiel** (secundair, stap 4): het onderschrift noemt enkel groen en blauw/rood; de cyaan (polaire) residuen en geel (Gly/Pro) worden niet benoemd. Niet fout, wel onvolledig.
6. **Quaternair** zit niet in `tools/text-check.html` (molScene); de gewijzigde paneelregel is visueel niet automatisch op lettergrootte gecontroleerd (de lengte is maar 7 tekens langer).
