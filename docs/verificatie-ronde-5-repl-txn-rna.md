# Verificatie ronde 5 — stages `repl`, `txn`, `rna` (na de vereenvoudiging in eenvoudige taal)

Datum: 1 oktober 2026
Bereik: alle in commit `11fd50c` gewijzigde staptitels en -teksten in `app/scenes/{repl,txn,rna}/*.js` (NL en EN)
en de nieuwe `kort`-velden (NL en EN) in `shared/details/{repl,txn,rna}.js`.

Werkwijze: `git diff 15e4e1f 11fd50c` per bestand; elke nieuwe zin naast de vorige, in ronde 1–3 geverifieerde
tekst gelegd en naast de `what`/`how`-velden van het uitlegpaneel. Gecontroleerd op: weggevallen kwalificaties,
overgeneralisaties, verkeerde oorzaak-gevolg, misleidende vergelijkingen, interne consistentie tussen scènes
en NL = EN. Vereenvoudiging die waar blijft maar minder detail geeft, is als ✅ beschouwd. Feiten die al in
ronde 1–3 met bron zijn beslecht (zie `verificatie-ronde-2/3-*.md`), zijn niet opnieuw opgezocht.

Aantal gecontroleerde uitspraken: ≈ 390 (157 gewijzigde stapteksten/-titels — repl 49, txn 48, rna 60 —
en 21 nieuwe `kort`-velden, elk NL + EN).

Legenda: ✅ klopt · ⚠️ nuance/klein punt · ❌ fout of misleidend (gecorrigeerd)

Na de wijzigingen: alle gewijzigde bestanden slagen voor `node --check`; `tools/check.html` (headless) →
**PROBLEMS (0)**. Geen commit gemaakt.

---

## Samenvatting van de wijzigingen

| # | Verdict | Bestand (stap/veld) | Voor → na (NL / EN) | Reden / bron |
|---|---|---|---|---|
| 1 | ❌ | `repl/herstel.js` (MMR-stap) | "Een fout basenpaar (G·T) ontsnapte aan de replicatie." / "…escaped replication." → "…glipte bij de replicatie door het proeflezen." / "…slipped past proofreading during replication." | De mismatch is juist door de replicatie gemaakt; ze ontsnapt aan het proeflezen. Vorige tekst: "een G·T-fout die de replicatie miste"; `herstel.what` en `mutaties`-stap ("kopieerfouten die aan proeflezen … ontsnappen"). |
| 2 | ⚠️→fix | `txn/genregulatie.js` (stap 1) | "promoter (startplaats)" / "promoter (start site)" → "promoter (startregio)" / "promoter (start region)" | "Startplaats (+1)" is in `txn/promoter.js` de term voor de transcriptiestartplaats (TSS); de promoter is het DNA-gebied (~−40…+40) rond die plaats (`promoter.what`). Verwarring van twee begrippen vermeden. |
| 3 | ⚠️→fix | `txn/operon.js` (stap 1) | idem "(startplaats)" / "(start site)" → "(startregio)" / "(start region)" | idem; bacteriële promoter = −35/−10-gebied, TSS = +1 (stap 2 van dezelfde scène). |
| 4 | ❌ | `txn/polymerasen.js` (Pol I-stap) | "Pol I schrijft de genen voor ribosomaal RNA af" / "the ribosomal RNA genes" → "de genen voor de grote ribosomale RNA's" / "the genes for the large ribosomal RNAs" | Het 5S-rRNA komt van Pol III (twee stappen verder in dezelfde scène: "Pol III maakt … 5S rRNA"). "De" rRNA-genen was een overgeneralisatie; nu gelijk aan `polymerasen.kort`/`what` ("de grote rRNA's"). |
| 5 | ❌ | `txn/polymerasen.js` (Pol II-stap) | "Pol II maakt alle mRNA's (dus van alle eiwitgenen)" / "all mRNAs (so for all protein genes)" → "Pol II maakt de mRNA's van alle eiwitgenen in de kern" / "the mRNAs of all protein genes in the nucleus" | De 13 eiwitgenen van het mtDNA worden door het mitochondriale RNA-polymerase (POLRMT) afgeschreven, niet door Pol II (Alberts, *Molecular Biology of the Cell*, h. 14; UniProt O00411 POLRMT). De toevoeging "dus van alle eiwitgenen" was nieuw. |
| 6 | ⚠️→fix | `shared/details/txn.js` (`transcriptie.kort`) | "Bij transcriptie maakt het enzym RNA-polymerase II een RNA-kopie van een gen." / "…the enzyme RNA polymerase II makes…" → "Bij transcriptie maakt een RNA-polymerase een RNA-kopie van een gen; voor eiwitgenen is dat RNA-polymerase II." / "…an RNA polymerase makes an RNA copy of a gene; for protein genes this is RNA polymerase II." | Als definitie van transcriptie was "Pol II" te eng: rRNA- en tRNA-genen worden door Pol I/III afgeschreven (zie scène `polymerasen`). |
| 7 | ⚠️→fix | `shared/details/txn.js` (`rnapol.kort`) | "…alle eiwitcoderende genen naar RNA kopieert" / "…all protein-coding genes into RNA" → "…alle eiwitcoderende genen in de kern …" / "…in the nucleus …" | Zelfde reden als #5 (mtDNA-genen: POLRMT). |

Lengtes na wijziging: alle stapteksten ≤ 180 tekens (langste gewijzigde: herstel-MMR NL 180).

---

## Per scène / knoop

### `repl/herstel.js`
- Stap 1 "water, zuurstofradicalen, UV en straling … alleen al door water verliest een cel ~10 000 basen per dag" — ✅ spontane depurinatie door hydrolyse ≈ 10⁴ purines/cel/dag (Lindahl 1993, *Nature* 362:709); vorige tekst sprak van ~10 000 abasische plaatsen = hetzelfde fenomeen.
- BER "een C werd spontaan een U … glycosylase … er blijft een suiker zonder base over" — ✅ (UNG, AP-plaats).
- "APE1 knipt de ruggengraat bij die lege plek. Pol β … ruimt de suikerrest op; een DNA-ligase sluit" — ✅ (5'-kant en ligase III–XRCC1 weggelaten = minder detail).
- NER "UV koppelt twee naburige T's … eiwitten herkennen, openen en houden open" — ✅. "Twee enzymen knippen links en rechts … 24–32 nucleotiden … polymerase vult, ligase sluit" — ✅.
- MMR — ❌ → fix #1.
- NHEJ "kan altijd" / "always possible" — ⚠️ bedoeld als "in elke fase van de celcyclus" (vorige tekst); in contrast met HR "alleen in S/G2" in de volgende stap is dit correct te lezen. Niet gewijzigd.
- HR "RAD51 bedekt het uitstekende enkelstrengige uiteinde en zoekt dezelfde sequentie op de zusterchromatide … alleen na replicatie (S/G2)" — ✅ (resectie impliciet; "dezelfde sequentie" = homologe sequentie).
- Ziekten (XP/NER, Lynch/MMR, BRCA1/2/HR), "kans op kanker stijgt" — ✅.

### `repl/mutaties.js`
- Codon/aminozuur, transitie A↔G/C↔T vs transversie — ✅.
- Stil CAT→CAC (His) — ✅. Sikkelcel GAG→GTG, "geladen → waterafstotend", "bij weinig zuurstof klitten … tot vezels" — ✅ (deoxy-HbS polymeriseert).
- AAG→TAG codon 17 (β⁰-thal.) — ✅. NMD-regel "> ~50–55 nt vóór de laatste naad tussen twee exons" — ✅ (t.o.v. de junctie, zoals in ronde 3 gecorrigeerd).
- Frameshift; "drie basen erbij of eraf houdt het kader intact" — ✅. Oorsprong mutaties (proeflezen/herstel, UV-dimeren, C→T op gemethyleerde CpG) — ✅.

### `repl/replicatie.js`
- Semi-conservatief, Meselson–Stahl 1958 — ✅. "In G1 worden origins klaargezet: twee MCM-ringen … nog niet actief" — ✅ (licensing laat M/G1). "In de S-fase … twee CMG-helicasen … ritsen open en lopen uit elkaar" — ✅.
- Bidirectioneel, leidend/volgend — ✅. Vele origins, niet elke gebruikt — ✅. Terminatie: helicase verwijderd, ligase — ✅. Resultaat "twee identieke DNA-moleculen (zusterchromatiden) … cohesine … rond histonen" — ✅.

### `repl/replisoom.js`
- CMG ritst open, antiparallel — ✅. "Openritsen draait het DNA vóór de vork steeds strakker op" (= positieve supercoils); topo I/II knippen één of beide strengen en sluiten weer — ✅.
- RPA tegen haarspelden/afbraak — ✅. Pol α-primase: ~10 nt RNA + ~20 nt DNA — ✅. RFC/PCNA, "houdt de polymerase op het DNA", Pol δ neemt over — ✅.
- Pol ε leidende streng, gebonden aan CMG en PCNA — ✅. Pol δ, Okazaki, flap; FEN1, ligase I — ✅. Proeflezen via exonuclease-plaats van Pol ε — ✅. Replisoom/MMR — ✅.

### `repl/ssdna.js`
- RPA70 + ssDNA (echte structuur), goot van twee domeinen — ✅. "cytosine verandert ~140× sneller in uracil dan in dsDNA" — ✅ (Frederico et al. 1990, *Biochemistry* 29:2532). OB-fold = vat van vijf β-strengen — ✅. A+B ≈ 8 nt — ✅. Aromatische stapeling, sequentie-onafhankelijk — ✅. ~30 nt, ATR, doorgeven aan replicatie/herstel — ✅.

### `repl/telomeren.js`
- TTAGGG, 3'-overhang — ✅. Eindreplicatieprobleem ("geen startpunt (3'-OH)") — ✅. Senescentie via DNA-schaderespons — ✅.
- TERT (DNA op RNA-matrijs) + hTR, 5 nt paren met …GTTAG-3' — ✅. Toevoeging GGTTAG, translocatie 6 nt — ✅; "vele herhalingen" (was "meerdere") ⚠️ licht sterker, maar menselijk telomerase is repeat-processief (tientallen herhalingen in vitro) — aanvaardbaar.
- CST + Pol α-primase — ✅. Shelterin "zes eiwitten", geen alarm, geen fusies — ✅. T-lus met TRF2 — ✅.

### `txn/genregulatie.js`
- Stap 1 — ⚠️ → fix #2; rest ✅. TF met DNA-bindend deel + activatiedomein dat helpers oproept — ✅. α-helix in de grote groef "leest" de sequentie — ✅. Co-activatoren: acetylering + remodelers — ✅. Mediator — ✅. DNA-lus — ✅. "Grenseiwitten (CTCF met cohesine)", silencers/repressoren — ✅. PIC — ✅.

### `txn/operon.js`
- Stap 1 — ⚠️ → fix #3; "operator (aan/uit-schakelaar)", één mRNA — ✅. σ-factor herkent −35 en −10, lac-promoter zwak — ✅. LacI constitutief, allolactose, CAP–cAMP, koppeling transcriptie-translatie, "drie eiwitten", AND-logica — ✅.

### `txn/polymerasen.js`
- "drie verwante RNA-polymerasen in de kern … 12 tot 17 subeenheden, gedeelde kern" — ✅ (13/12/17, vijf gedeelde subeenheden).
- Pol I — ❌ → fix #4. Pol II — ❌ → fix #5. Pol III "korte, stabiele RNA's zoals tRNA's en 5S rRNA", VA-RNA — ✅.
- Pol III-promoters intern (tRNA, 5S) of stroomopwaarts (U6), T-reeks termineert — ✅. α-Amanitine (Pol II ≪ Pol III, Pol I ongevoelig) — ✅.

### `txn/promoter.js`
- "de meeste menselijke promoters hebben geen TATA-box" — ✅ (± 10–20 % TATA-houdend; vorige tekst: ~70 % CpG-eiland, meestal zonder TATA). TBP-zadel, ~80° knik, andere TFIID-delen (TAF's) herkennen Inr/DPE — ✅.
- TFIIA, TFIIB "naast de TATA-box" (BRE) — ✅. Pol II + TFIIF, Mediator — ✅. TFIIE → TFIIH, PIC — ✅. TFIIH opent DNA met ATP (XPB) — ✅. CDK7 → Ser5-P, promoter escape — ✅. Pauze na ~20–60 nt (DSIF/NELF) — ✅. P-TEFb → NELF weg, DSIF mee — ✅.

### `txn/rnapol.js`
- 12 subeenheden, Rpb1 grootste met actief centrum/klem/CTD, kaken Rpb1/Rpb2, matrijsstreng naar actief centrum, ~8 bp hybride, Mg²⁺ door drie Asp, triggerlus + brughelix, trechter, Rpb4/7 ontbreekt in 1I6H, 52 × YSPTSPS — alle ✅.

### `txn/transcriptie.js`
- Promoter/TBP/TATA, PIC, TFIIH opent + fosforyleert CTD, promoter escape, 3'→5' lezen / 5'→3' bouwen, ~8 basen gepaard, cap bij ~20–30 nt, over-/onderwonden DNA + Ser2-P, doorschrijven voorbij poly(A)-signaal — alle ✅.

### `rna/editing.js`
- A→I (ADAR), C→U (APOBEC1), DNA ongewijzigd — ✅. GluA2: exon paart met intron (ECS), ADAR2 — ✅. "aminogroep → zuurstof" (deaminering) — ✅. I leest als G, Q→R, receptor laat geen Ca²⁺ meer door — ✅ (GluA2-bevattende AMPA-receptoren). APOBEC1 + hulpeiwit (A1CF), apoB vervoert vetten — ✅. CAA→UAA "ongeveer halverwege het coderende deel" — ✅ (codon 2153 van 4563). apoB-48 ≈ voorste helft — ✅.

### `rna/export.js`
- mRNP met CBC, EJC vlak vóór elke naad, PABPN1 — ✅. TREX via cap en splicing — ✅. NXF1–NXT1 loodst door de porie, meerdere per mRNP — ✅. Kernporie met FG-draden, kort binden — ✅. DDX19 + ATP, eenrichtingsverkeer — ✅ (Gle1/IP6 weggelaten = minder detail). NXF1 keert terug — ✅. Pioniersronde / NMD — ✅. eIF4E/PABPC1/eIF4G-lus — ✅.

### `rna/mrnaafbraak.js`
- Gesloten lus beschermt — ✅. ARE (AUUUA) → afbraak, TNF-α — ✅. Deadenylatie PAN2–PAN3 → CCR4–NOT, meestal snelheidsbepalend — ✅. Decapping DCP2 na korte staart — ✅. XRN1 5'→3' hoofdroute; exosoom 3'→5', DcpS — ✅. P-bodies membraanloos, niet vereist — ✅.

### `rna/nmd.js`
- EJC vlak vóór elke naad, β-globine 3 exonen/2 EJC's — ✅. Normaal stopcodon: alle EJC's weg — ✅. Codon 39 CAG→UAG in exon 2 — ✅. "EJC bij de laatste naad ligt een flink stuk verder" — ✅ (geen expliciete 50–55-nt-claim meer; geen fout). UPF1/UPF2/UPF3B, SMG1 fosforyleert UPF1, SMG6 knipt, SMG5–7 → deadenylatie/decapping, XRN1/exosoom — ✅. β⁰-thalassemie recessief — ✅.

### `rna/rnai.js`
- Pol II → pri-miRNA-haarspeld; Drosha/DGCR8 in de kern; Exportine-5; Dicer ~22 nt duplex — ✅. "Argonaute (AGO2); samen heet dat RISC" — ⚠️ strikt is AGO + geladen gidsstreng het (minimale) RISC; als vereenvoudiging aanvaardbaar. Seed nt 2–8 in 3'-UTR, onvolledige paring bij dieren — ✅. GW182 → staartinkorting, minder translatie, afbraak — ✅. Perfecte paring (siRNA) → AGO2 knipt, gids herbruikbaar — ✅.

### `rna/rnaprocessing.js`
- Cap: "twee enzymen" (RNGTT bifunctioneel + RNMT), omgekeerde gemethyleerde G, CBC — ✅. U1 → 5'-SS (GU), U2 → vertakkingspunt-A puilt uit — ✅. Tri-snRNP: "compleet maar nog niet actief" (B-complex) — ✅. U1/U4 vertrekken, U6–U2 vormen RNA-actief centrum — ✅. Twee transesterificaties, lariat, EJC vóór de naad — ✅. Co-transcriptioneel — ✅. CPSF/AAUAAA, CstF/GU-rijk — ✅. Knip + afbraak stroomafwaarts helpt Pol II loskomen (torpedo) — ✅. Poly(A) 200–250 A zonder matrijs, PABPN1 — ✅. Export — ✅.

### `rna/rnastructuur.js`
- 2'-OH, U i.p.v. T, terugvouwen — ✅. Haarspeld — ✅. G·U-wobble, 2 H-bruggen — ✅. Bulge, Tat op TAR-bulge — ✅. Bouwstenen secundaire structuur — ✅. Pseudoknoop (telomerase-RNA, virussen) — ✅. A-vorm ≈ 11 bp/winding, diepe smalle grote groef — ✅. tRNA L-vorm ≈ 75 Å — ✅. Ribozymen (hammerhead, ribosoom) — ✅.

### `kort`-velden (`shared/details`)
- **repl**: `replicatie` ✅ (geldt voor het kerngenoom; mtDNA buiten beschouwing, zoals `what`), `replisoom` ✅, `ssdna` ✅, `telomeren` ✅, `herstel` ✅ ("duizenden keren per dag" is eerder een onderschatting — 10⁴–10⁵ letsels/cel/dag — maar niet fout), `mutaties` ✅.
- **txn**: `transcriptie` ⚠️ → fix #6; `genregulatie` ✅; `promoter` ✅ ("hier valt de beslissing" — de signalen van enhancers komen samen op de promoter; aanvaardbaar); `rnapol` ⚠️ → fix #7; `operon` ✅; `polymerasen` ✅.
- **rna**: `rnaprocessing`, `capping`, `splicing`, `polya`, `export`, `nmd`, `rnai` (siRNA's als geneesmiddel: o.a. patisiran — ✅), `mrnaafbraak`, `editing`, `rnastructuur` — alle ✅, NL = EN.

---

## Open punten
1. `shared/details/txn.js` → `rnapol.what` en `polymerasen.what` (niet nieuw in deze commit, dus buiten scope gelaten) zeggen "alle eiwitcoderende genen" / "de mRNA's" zonder "in de kern"; in de context ("de eukaryote kern heeft…") correct te lezen, maar voor consistentie met fixes #5/#7 eventueel "nucleaire" toevoegen.
2. `txn/polymerasen.js` Pol I-stap en `polymerasen.kort` noemen 5,8S bij "de grote rRNA's": gangbare formulering (5,8S komt uit dezelfde 47S-voorloper), maar strikt is 5,8S klein. Geen wijziging voorgesteld tenzij gewenst.
3. `repl/herstel.js` NHEJ "kan altijd" — eventueel "kan in elke fase van de celcyclus" voor extra precisie (nu ✅/⚠️, niet fout).
