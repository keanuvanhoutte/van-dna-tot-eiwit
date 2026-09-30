# Verificatie ronde 3 — stages `txn`, `rna`, `tl` (na de declutter)

Datum: 30 september 2026
Bereik: alle zichtbare scènetekst in `app/scenes/{txn,rna,tl}/*.js` (NL en EN): staptitels en -teksten,
`simplified`, `extra`, `org/scale/time`, legenda, en alle SVG-labels (`T2()`, `L({nl,en})`, `txt`, tekstvakken,
`data-label`), inclusief de nieuwe tekeningen van vandaag (o.a. de drie mini-mRNA's in NMD-stap 8, de
Pyl-voorbeeldcodons AUG AAA **UAG** GCA UUC GGA in seleno-stap 6, TFIIIA/C/B-volgorde in polymerasen-stap 5,
de ≈ 22-haak in rnai-stap 4, de TAR-nummering in rnastructuur-stap 4).

Werkwijze: met een tijdelijke headless-dumppagina werd per scène en per stap alle zichtbare tekst
(p = 0,15 / 0,4 / 0,65 / 0,97, binnen het camerakader) uitgeschreven, voor de huidige bestanden én voor de
back-ups van vóór de declutter. Beide dumps (NL en EN) werden woord-per-woord vergeleken om te zien wat
het inkorten veranderd heeft; daarna is de volledige huidige tekst in zijn geheel gelezen. Wat in ronde 1 en 2
al beslecht was (bronnen zie daar) is niet opnieuw uitgezocht, alleen gecontroleerd of het nog correct en
NL = EN in beeld staat. Sequenties die in de code staan (TAR 17–45, cUUCGg-haarspeld, let-7a-5p, codonwiel-
voorbeeld, frameshift-mutant, anticodons in seleno) zijn met de hand nagerekend.

Aantal gecontroleerde uitspraken: ≈ 400 (≈ 205 stapteksten, 54 `simplified`/`extra`/meta-velden, ≈ 140
inhoudelijke labels/tekstvakken; pure symbolen als 5'/3', aminozuurafkortingen en tellers niet meegeteld).

Legenda: ✅ klopt · ⚠️ nuance/klein punt · ❌ fout (gecorrigeerd)

Na alle wijzigingen: alle gewijzigde bestanden slagen voor `node --check`; `tools/check.html` →
**PROBLEMS (0)**; `tools/text-check.html?w=1000&min=13&ids=codon,aars,translatie,seleno,nmd,rnai,rnaprocessing,polymerasen`
→ overal **klein 0**, drukke stappen 0.

---

## Samenvatting van de wijzigingen

| # | Verdict | Bestand (stap) | Voor → na (NL / EN) | Bron |
|---|---|---|---|---|
| 1 | ❌ | `tl/codon.js` (stap 1, label) | "61 aminozuren + 3 stop" / "61 amino acid + 3 stop" → "61 voor aminozuren + 3 stop" / "61 for amino acids + 3 stop". Door het inkorten ("61 aminozuur-codons" → "61 aminozuren") stond er dat er 61 aminozuren zijn. | standaard genetische code (vgl. stap 4 "61 zinvolle codons voor 20 aminozuren") |
| 2 | ❌ | `tl/aars.js` (stap 5, tekstvak klasse I) | "bv. IleRS, MetRS, TyrRS" → "bv. IleRS, MetRS, ValRS". Na het inkorten van de lijst bleef net TyrRS over als voorbeeld naast "bindt vanaf de kleine groef": TyrRS is een klasse-I-uitzondering die de acceptorstam vanaf de **grote** groef bindt en ook de 3'-OH kan laden. | Yaremchuk et al. 2002, *EMBO J* 21:3829, "Class I tyrosyl-tRNA synthetase has a class II mode of cognate tRNA recognition" (https://link.springer.com/article/10.1093/emboj/cdf373) |
| 3 | ❌ | `tl/aars.js` (stap 5, tekstvak klasse II) | "meestal 3'-OH … bv. SerRS, AlaRS, PheRS" → "… bv. SerRS, AlaRS, ThrRS". De oorspronkelijke toevoeging "(PheRS: 2'-OH)" was weggevallen, waardoor precies de uitzondering als voorbeeld van de regel stond (PheRS laadt de 2'-OH; zie ook `simplified` en de tRNA-scène). | Sprinzl & Cramer 1975; `simplified` van dezelfde scène; ronde 2 (`trna`) |
| 4 | ⚠️→fix | `tl/translatie.js` (stap 1) | "(hier ingekort; echt ~200–250 nt)" / "really ~200–250 nt" → "(hier ingekort; bij synthese ~200–250 nt)" / "(~200–250 nt when made)". In het cytoplasma zijn staarten veel korter (mediaan ≈ 50–100 nt); zelfde correctie als ronde 2 #7 in de uitlegpanelen. | Subtelny et al. 2014, *Nature* 508:66 (mediaan 67–96 nt in zoogdiercellen; https://pubmed.ncbi.nlm.nih.gov/24476825/) |
| 5 | ⚠️→fix | `rna/nmd.js` (stap 4) | "De EJC achter het ribosoom ligt ruim meer dan 50–55 nt verder en blijft dus zitten." → "De laatste exon-exonjunctie ligt ruim meer dan 50–55 nt verder: de EJC ervoor blijft zitten." (EN idem). De 50–55-nt-regel geldt t.o.v. de junctie, niet t.o.v. het EJC (dat ~24 nt vóór de junctie ligt); nu gelijk aan het label "> 50–55 nt tot de laatste junctie" en aan ronde 2 #5. | Boehm et al. 2021 (PMC8233366); ronde 2 |
| 6 | ⚠️→fix | `rna/rnai.js` (stap 4, tekst + label) | "duplex van ≈ 22 bp met aan elke kant een 2-nt-overhang" + label "≈ 22 bp" → "≈ 22 nt" (NL en EN). Twee strengen van ~22 nt met 2-nt-3'-overhangen hebben ~20 bp gepaard; "22 bp + overhang" was intern tegenstrijdig. | Ha & Kim 2014, *Nat Rev Mol Cell Biol* 15:509 |
| 7 | ⚠️→fix | `tl/seleno.js` (stap 5, tekstvak) | "→ afgebroken eiwit" → "→ afgeknot eiwit" (EN "truncated protein" ongewijzigd). "Afgebroken" las als "gedegradeerd"; bedoeld is een ingekorte keten. Nu ook consistent met de NMD-scène. | — (NL = EN) |
| 8 | ⚠️→fix | `txn/rnapol.js` (`scale`) | één string "≈ 15 nm · ≈ 0,5 MDa" (ook in EN met decimale komma) → `{ nl: '… 0,5 MDa', en: '… 0.5 MDa' }` | — (NL/EN) |
| 9 | ⚠️→fix | `txn/polymerasen.js` (`scale`, stap 4) | EN "(per enzym)" → "(per enzyme)"; EN-label "tRNA's" → "tRNAs" | — (NL/EN) |
| 10 | ⚠️→fix | `rna/rnaprocessing.js` (stap 8–9, label) | label "GU-rich" stond ook in de NL-versie → `L({ nl: 'GU-rijk', en: 'GU-rich' })` | — (NL/EN) |

---

## Stage `txn`

### `transcriptie` ✅
- Declutter: enkel dubbele strenglabels en CTD-label in tussenstappen verwijderd; geen inhoud veranderd.
- TATA-box/TFIID-TBP; PIC-volgorde TFIIA/B → Pol II·F → E/H; TFIIH ontwindt + Ser5-P; escape (TFIID kan blijven); matrijs 3'→5', RNA 5'→3'; hybride ~8; cap bij ~20–30 nt; + supercoils vóór, − achter; Ser2-P; voorbij het poly(A)-signaal ✅ (ronde 1/2).
- NL = EN ✅.

### `genregulatie` ✅
- Nieuwe `extra`-zin (groene bolletjes = Ac; silencers ook via H3K9/H3K27-methylatie en DNA-methylatie) ✅.
- Labels ingekort ("CTCF-isolator" → "CTCF", "HAT: acetyleert H3K27, …" → "… H3K27", "Ac weg → compact") — betekenis behouden ✅. Mediator "tot ~30 subeenheden" ✅.

### `promoter` ✅
- Stap 1 herschreven: "~70 % ligt in een CpG-eiland, meestal zonder TATA-box" ✅ (Deaton & Bird 2011; ronde 2). BREu SSRCGCC, TATAWAWR (~−31/−30), BREd RTDKKKK, Inr YYANWYY, MTE, DPE RGWYV (+28…+32) ✅.
- "≈ 12°", "17/34/35/55 nt" zijn geanimeerde tellers (hoek loopt naar ≈ 80°, RNA-lengte groeit) ✅.
- TBP op de kleine groef ~80°; XPB-translocase; CDK7 → Ser5; pauze na ~20–60 nt (DSIF/NELF); P-TEFb fosforyleert NELF, DSIF, Ser2 ✅.

### `rnapol` ✅ (na fix #8)
- 12 subeenheden, ≈ 0,5 MDa, Rpb1 ~1970 aa, 5FLM (rund), 39 nt DNA/20 nt RNA, NADFDGD-Mg²⁺, triggerlus/brughelix, Rpb4/7, CTD 52 × YSPTSPS ✅ (ronde 2).
- ⚠️ "Drie aspartaten houden een Mg²⁺-ion vast": er zijn er twee in het actieve centrum (metaal A stevig gebonden, metaal B komt met de NTP); als vereenvoudiging aanvaardbaar.

### `operon` ✅
- Consensus "op de niet-matrijsstreng" nu in de staptekst i.p.v. een apart label ✅. σ70 −35/−10, ~17 bp; holo-enzym α₂ββ′ω + σ70; LacI/allolactose; cAMP–CAP via αCTD; gekoppelde transcriptie-translatie; β-galactosidase/lactosepermease/transacetylase ✅.
- In stap 8 (logicatabel) zijn de labels "op operator/los/gebonden" weg; de tabel toont nog uit/laag/HOOG per combinatie ✅.

### `polymerasen` ✅ (na fix #9)
- 13/12/17 subeenheden (mens; gist-Pol I 14), 5 gedeelde (Rpb5, 6, 8, 10, 12), "de twee grootste homoloog" ✅ (ronde 2).
- Stap 5 (nieuw getekend): type 1 (A-box, IE, C-box; volgorde TFIIIA → TFIIIC → TFIIIB), type 2 (A-, B-box; TFIIIC → TFIIIB), type 3 (DSE–Oct-1, PSE–SNAPc, TATA–TFIIIB, stroomopwaarts), TTTT-terminator ✅.
  ⚠️ Staptekst "TFIIIC bindt en plaatst TFIIIB" noemt TFIIIA niet voor type 1; de figuur toont wel dat TFIIIA eerst bindt → aanvaardbaar.
- α-amanitine 0,02 / 20 µg/ml / resistent ≤ 200 µg/ml (Weinmann et al. 1974), "blokkeert de translocatie" ✅.

---

## Stage `rna`

### `rnaprocessing` ✅ (na fix #10)
- Capping (RNGTT/RNMT, CBC), E/A-complex (U1, U2AF op (Py)n + AG, U2 op het vertakkingspunt-A), tri-snRNP, activatie (U1 en U4 weg), 2 transesterificaties, 2'–5'-lariat, DBR1, EJC ~20–24 nt, CPSF/CstF, CPSF73 ~10–30 nt, Xrn2-torpedo, ~200–250 A (bij synthese, in de kern) ✅.
- Klein schrijfpuntje (niet inhoudelijk): in `extra` staat een spatie vóór de punt ("transesterificaties .") omdat een `<b>`-tag erop volgt.

### `export` ✅
- Enkel labelverschuivingen ("NXF1–NXT1 terug naar de kern" → "NXF1–NXT1 → kern") ✅.
- TREX (THO + UAP56 + ALYREF), NXF1–NXT1, TPR-korf, FG, 5'-uiteinde eerst, geen RanGTP, DDX19 + Gle1 (+ IP6) aan Nup214, CBC → eIF4E, PABPN1 → PABPC1, 43S ✅.
- ⚠️ Stap 8 "pioniersronde, cap nog met CBC" blijft het klassieke model; de nuance staat in `simplified` (zoals in ronde 2 aanvaard).

### `nmd` ✅ (na fix #5)
- β-globine: 3 exonen, 2 EJC's, codon 39 CAG → UAG (C → T), PTC in exon 2 (exon 2 = codons 31–104) ✅.
- UPF1 + SMG1 aan het ribosoom, UPF2/UPF3B op het EJC, fosfo-UPF1, SMG6 knipt bij de PTC, SMG5–SMG7 → CCR4–NOT/decapping ✅.
- Stap 7 (nieuw): na de SMG6-knip wordt het 5'-fragment 3'→5' door het exosoom en het 3'-fragment 5'→3' door XRN1 afgebroken — richting in figuur en tekst klopt ✅.
- Stap 8 (nieuw, drie mini-mRNA's): normaal allel (stop in exon 3, geen EJC erachter → volledig eiwit); mutant (PTC in exon 2, EJC vóór de exon 2/3-junctie blijft → afbraak, geen eiwit, β⁰-thalassemie recessief); PTC in het laatste exon (geen EJC → geen NMD → afgeknot eiwit, kan dominant werken, zie `extra`) ✅. EJC-bolletje staat terecht net vóór de junctie ✅.

### `rnai` ✅ (na fix #6)
- let-7a-5p-sequentie UGAGGUAGUAGGUUGUAUAGUU (22 nt) ✅. Drosha + DGCR8, pre-miRNA ≈ 60–70 nt met 2-nt-3'-overhang, Exportine-5–RanGTP, Dicer/TRBP, laden in AGO2 (minst stabiel 5'-uiteinde = gids), seed 2–8, GW182/TNRC6 → CCR4–NOT, AGO2 knipt tegenover nt 10–11 ✅.
- ⚠️ Stap 7 "AGO2 bindt GW182": alle vier humane AGO's binden TNRC6; hier is AGO2 het getekende voorbeeld — aanvaardbaar.

### `mrnaafbraak` ✅
- Stap 4–6 herwerkt: label "m⁷GDP" weg maar de tekst zegt nog "m⁷GDP komt vrij" ✅; "losse nucleotiden (NMP)" bij het exosoom ✅; DcpS: m⁷GpppN → m⁷GMP ✅.
- Gesloten lus, ARE/TTP (TNF-α), PAN2–PAN3 → CCR4–NOT (snelheidsbepalend), LSm1–7–PAT1 → DCP1–DCP2, XRN1 hoofdroute, SKI2–SKI3–SKI8 + exosoom, P-bodies niet strikt nodig ✅.

### `editing` ✅
- Stap 1: "het DNA blijft ongewijzigd" nu in de tekst i.p.v. een label ✅. ADAR2/dsRBD's, base-flipping, A → I (NH₃), I leest als G, CAG → CIG (Q/R), Ca²⁺-ondoorlaatbaar; APOBEC1 (2×) + A1CF, mooring stroomafwaarts, C6666, codon 2153 CAA → UAA, apoB-48 ≈ 48 % ✅.
- Klein schrijfpuntje: spatie vóór de dubbele punt in `extra` ("deamineringen :"), zelfde oorzaak als bij rnaprocessing.

### `rnastructuur` ✅
- TAR 17–45 = GGCAGAUCUGAGCCUGGGAGCUCUCUGCC nagerekend: bulge U23-C24-U25 en lus C30–A35 op de juiste nummers ✅ (1ANR).
- Haarspeld GGAUGCUUCGGUAUCC: G1–C16 … G5·U12, C6–G11, cUUCGg ✅. A-vorm ≈ 11 bp, C3'-endo; G·U 2 H-bruggen; pseudoknoop (MMTV 1RNK); tRNA ≈ 75 Å; hammerhead → 2',3'-cyclisch fosfaat + 5'-OH; groep I/II, RNase P, ribosoom, spliceosoom ✅.

(`capping`, `splicing`, `polya` zijn aliassen van `rnaprocessing` — geen eigen tekst behalve de titel ✅.)

---

## Stage `tl`

### `translatie` ✅ (na fix #4)
- 43S = 40S + eIF2·GTP·Met-tRNAi + eIF1, 1A, 3, 5; 48S scant 5'→3'; CAU–AUG, Kozak GCCACC AUG G; eIF5B; A/P/E; eEF1A·GTP; PTC = rRNA; eEF2 (3 nt); eRF1 + eRF3·GTP; ABCE1 ✅.
- ⚠️ Stap 4 "eIF2 hydrolyseert GTP, eIF1 laat los": de hydrolyse gebeurt al tijdens het scannen (door eIF5 gestimuleerd); bij AUG-herkenning komt eIF1 los en daarna Pᵢ. Gangbare leerboekvereenvoudiging; niet aangepast.

### `ribosoom` ✅
- Labels samengevoegd ("40S · 18S", "60S · 28S + 5,8S + 5S"); massa-rij (2,5/4 MDa) weg uit de tabel maar staat nog in stap 1-tekst ✅. 33/47 eiwitten, 21/≈ 33 bij bacteriën; 1870/5070/157/121 nt; tunnel ≈ 100 Å (model ≈ 90 Å); antibiotica nu in de staptekst ✅.

### `trna` ✅
- Stap 5: "14 gemodificeerde nucleotiden (wit omrand)" — alle 14 posities uit 1EHZ hebben een witte rand (`MOD` in de code); 13 krijgen een tekstlabel (D17 niet, naast D16). Omdat de tekst nu naar de randen verwijst, is dat geen tegenspraak meer ✅ (open punt uit ronde 2 opgelost).
- Anticodon GmAA leest UUC/UUU, A73 discriminator, 7 bp acceptorstam, G18–Ψ55 / G19–C56, ≈ 75 Å ✅.
- ⚠️ `extra`: "(PDB 1EHZ, 1,93 Å), de eerste RNA-structuur die ooit werd opgelost (1974)" — de eerste was tRNA-Phe van gist in 1974; 1EHZ zelf is een herbepaling uit 2000. Leest dubbelzinnig maar is niet fout.

### `aars` ❌→✅ (na fix #2, #3)
- Netto-reactie nu in stap 1 ✅; Ile + ATP → Ile-AMP + PPi; identiteit GAU + base 73; IleRS klasse I → 2'-OH ✅; zeef 1 (Phe te groot, Leu andere vorm), Val (C₅) past; zeef 2 in CP1 ✅; Chapeville-proef nu in `extra` ✅.
- Voorbeeldlijsten klasse I/II gecorrigeerd (zie #2, #3).

### `codon` ❌→✅ (na fix #1)
- Wiel en verdeling 6/4/3/2/1 ✅; SEQ AUG GCU UUC AAG GAU UGG; ramen 2 en 3 nagerekend; mutant met 1 U na nt 12 → AUG GCU UUC AAG **UGA** ✅; wobble-tabel (G → C/U, U → A/G, I → U/C/A, C → G, A → U zeldzaam), tRNA-Ala IGC ✅; mito UGA = Trp, AUA = Met, AGA/AGG geen Arg ✅; UAG → Pyl (archaea, bact.) ✅.

### `ribogenese` ✅
- Nucleoluslagen nu als "FC: rDNA · FC/DFC-grens: transcriptie · DFC: processing · GC: assemblage" — open punt uit ronde 2 is opgelost ✅.
- chr 13, 14, 15, 21, 22; 47S ≈ 13 kb; rijp ≈ 7 kb; C/D (fibrillarine) / H/ACA (dyskerine) ≈ 100×; 90S + U3; knip in ITS1; 5S (Pol III) + uL5/uL18; CRM1/NMD3; NOB1 18S-E → 18S; eIF6/NMD3 los ✅.

### `seleno` ✅ (na fix #7)
- Stap 1: "bv. glutathionperoxidasen, deiodinasen" nu in de tekst (thioredoxinereductasen weggevallen — geen fout) ✅. 25 humane selenoproteïnen; tRNA-Sec UCA; SerRS → PSTK → SepSecS, SPS2 ✅.
- Anticodons in de tekening nagerekend (links → rechts = 3'→5'): P-plaats UGU ↔ ACA, A-plaats UGA ↔ ACU (= 5'-UCA-3'), Pyl UAG ↔ AUC (= 5'-CUA-3') ✅.
- Stap 6 (Pyl): codons AUG AAA UAG GCA UUC GGA zijn illustratief; tRNA-Pyl staat correct boven UAG ✅. ⚠️ `simplified` zegt alleen dat "de codons rond UGA" illustratief zijn; voor de Pyl-rij is dat impliciet.
- Tabel stap 7: SECIS (euk. 3'-UTR) / geen vereist; op tRNA uit Ser / vrij aminozuur; eEFSec (bact. SelB) / EF-Tu; mens 25 / nee ✅.

### `er` ✅
- Enkel labels (aminozuurbolletjes) uit tussenstappen gehaald; "OST herkent" → "sequon N-X-S/T (X ≠ Pro)"; voorbeeld transferrine weg ✅.
- Albumine P02768: signaalpeptide 1–18, propeptide RGVFRR, rijpe N-terminus DAHK…; SRP54/Alu; SRα/SRβ (GTP); Sec61, laterale poort; SPC; OST Glc₃Man₉GlcNAc₂ op dolichol-PP; type I/II ✅.

(`initiatie`, `elongatie`, `terminatie` zijn aliassen van `translatie` ✅.)

---

## Open vragen / suggesties (niet aangepast)

1. **`shared/details/rna.js` (`rnai`, how, NL en EN)**: "Dicer … → duplex van ≈ 22 bp" — valt buiten deze opdracht (alleen scènes), maar moet voor consistentie met fix #6 ook "≈ 22 nt" worden.
2. **`translatie` stap 4** — "eIF2 hydrolyseert GTP, eIF1 laat los": beslissen of de volgorde (hydrolyse al tijdens scannen, Pᵢ-vrijgave na eIF1-vertrek) explicieter moet, of als vereenvoudiging in `simplified` vermeld wordt.
3. **`polymerasen` stap 5** — eventueel "(type 1: eerst TFIIIA)" aan de tekst toevoegen; de figuur toont het al.
4. **`rnapol` stap 6** — "Drie aspartaten … houden een Mg²⁺-ion vast": eventueel "twee Mg²⁺-ionen (één vast, één met de NTP)".
5. **`trna` `extra`** — "de eerste RNA-structuur die ooit werd opgelost (1974)" herformuleren tot "tRNA-Phe was in 1974 de eerste opgeloste RNA-structuur", zodat het niet lijkt alsof 1EHZ uit 1974 is.
6. Cosmetisch: spatie vóór "." / ":" in de `extra`-teksten van `rnaprocessing` en `editing` (door een `<b>`-tag).

## Bronnen (nieuw in deze ronde)

- Yaremchuk A, Kriklivyi I, Tukalo M, Cusack S (2002) Class I tyrosyl-tRNA synthetase has a class II mode of cognate tRNA recognition. *EMBO J* 21:3829–3840. https://link.springer.com/article/10.1093/emboj/cdf373
- Subtelny AO, Eichhorn SW, Chen GR, Sive H, Bartel DP (2014) Poly(A)-tail profiling reveals an embryonic switch in translational control. *Nature* 508:66–71. https://pubmed.ncbi.nlm.nih.gov/24476825/
- Ha M, Kim VN (2014) Regulation of microRNA biogenesis. *Nat Rev Mol Cell Biol* 15:509–524.
- Overige bronnen: zie `docs/verificatie-ronde-1.md` en `docs/verificatie-ronde-2-txn-rna-tl.md`.

## Conclusie

Het inkorten heeft in deze drie stages **drie echte fouten** geïntroduceerd (codon "61 aminozuren", en twee
voorbeeldlijsten bij de aaRS-klassen waarin juist de uitzondering overbleef) en enkele onnauwkeurigheden
(poly(A)-lengte, NMD-regel t.o.v. EJC i.p.v. junctie, "22 bp + overhang", "afgebroken" eiwit) plus drie
NL/EN-lekken. Alles is gecorrigeerd; de nieuw getekende stappen (NMD 7–8, seleno, polymerasen 5, rnai 4,
rnastructuur 4) zijn inhoudelijk correct. De drie visuele open punten uit ronde 2 (trna D17, ribogenese
FC/DFC) zijn intussen opgelost; `rnapol`-residubereiken blijven een visuele check.
