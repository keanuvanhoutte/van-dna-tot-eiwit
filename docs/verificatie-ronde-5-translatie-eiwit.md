# Verificatie ronde 5 — eenvoudige taal: `tl` en `prot` (ondertitels + `kort`)

Datum: 1 oktober 2026
Bereik: alle in commit 11fd50c herschreven staptitels en -teksten in `app/scenes/tl/*.js` (8 scènes) en
`app/scenes/prot/*.js` (16 scènes), en de nieuwe `kort`-samenvattingen (NL + EN) in
`shared/details/tl.js` (11 knopen), `prot.js` (8 knopen) en `prot2.js` (8 knopen).

Werkwijze: `git diff 15e4e1f 11fd50c` per bestand; elke nieuwe zin is naast de vorige, eerder geverifieerde
tekst (rondes 1–3) en naast de uitlegpanelen (`what`/`how`/`facts`/`why`) gelegd. Gecontroleerd op: weggevallen
voorbehouden, overgeneralisaties, verkeerde oorzakelijke verbanden, misleidende vergelijkingen en NL ≠ EN.
Eenvoudiger maar nog juist = ✅. Wat in eerdere rondes met bronnen beslecht was, is niet opnieuw uitgezocht.

Aantal gecontroleerde uitspraken: ≈ 470 (≈ 165 stappen × titel + tekst in NL en EN, met gemiddeld ±2 uitspraken
per tekst; 27 `kort`-velden × 3 zinnen × 2 talen).

Legenda: ✅ klopt · ⚠️ nuance/klein punt · ❌ fout (gecorrigeerd)

Na de wijzigingen: gewijzigde bestanden slagen voor `node --check`; `tools/check.html` (headless) →
**PROBLEMS (0)**.

---

## Samenvatting van de wijzigingen

| # | Verdict | Bestand | Voor → na (NL / EN) | Reden / bron |
|---|---|---|---|---|
| 1 | ❌ | `shared/details/tl.js` — `aars.kort` | "Ze controleren hun eigen werk en verbeteren fouten." / "They check their own work…" → "**Veel ervan** controleren hun eigen werk…" / "**Many of them** check their own work…" | Slechts ongeveer de helft van de aaRS heeft een editeerfunctie (o.a. IleRS, ValRS, LeuRS, MetRS, ThrRS, AlaRS, PheRS, ProRS, LysRS); TyrRS, CysRS, GluRS, … niet. Ibba & Söll 2000, *Annu Rev Biochem* 69:617; Perona & Gruic-Sovulj 2014, *Top Curr Chem* 344:1. |
| 2 | ❌ | `shared/details/tl.js` — `seleno.kort` | "…omdat een extra signaal in het mRNA het ribosoom laat doorlezen." → "…: selenocysteïne op UGA als een extra signaal in het mRNA dat aangeeft, pyrrolysine op UAG, en dat alleen in sommige microben." (EN idem) | De zin schreef het mRNA-signaal (SECIS) aan beide aminozuren toe. Voor Pyl is geen algemeen vereist mRNA-element aangetoond (PYLIS is omstreden; inbouw is vooral concurrentie tussen Pyl-tRNA en RF). Bovendien: Pyl komt niet bij de mens voor — nu expliciet. Zie scènetekst seleno stap 6 en `how` van dezelfde knoop; Brugère et al. 2018, *Biochimie* 151:1 (review pyrrolysine). |
| 3 | ⚠️→fix | `shared/details/prot.js` — `secundair.kort` | "de platte β-strengen" / "the flat β-strands" → "de **gestrekte** β-strengen" / "the **extended** β-strands" | β-bladen zijn geplooid en rechtshandig getwist; de scène zelf zegt (stap 7) "Het blad is niet plat". "Plat" sprak dat tegen. |
| 4 | ⚠️→fix | `shared/details/prot.js` — `vouwing.kort` | "Ze vouwt zich vanzelf tot één vaste 3D-vorm" / "It folds by itself…" → "**Meestal** vouwt ze zich vanzelf…" / "It **usually** folds by itself…" | Zonder voorbehoud in strijd met de knopen `idp` (geen vaste vorm) en `chaperones`/`misvouwing` (sommige ketens hebben hulp nodig of vouwen fout). |
| 5 | ⚠️→fix | `app/scenes/prot/secundair.js` stap 4 (NL) | "Alleen is ze niet stabiel" → "Op zichzelf is ze niet stabiel" | NL dubbelzinnig ("alleen" = "maar" of "in haar eentje"); EN "Alone it is not stable" was wel eenduidig. Nu NL = EN. |

---

## Per scène — ondertitels

### `tl/aars` (8 stappen)
- st1 "Elk aminozuur heeft een eigen enzym (aaRS)… Hier wordt de genetische code echt vertaald." ✅ (Sec gebruikt SerRS en EPRS is bifunctioneel; op bachelorniveau aanvaardbaar, en de titel "Eén synthetase per aminozuur" was al zo.)
- st2 activering met ATP → Ile-AMP + PPi ✅
- st3 herkenning via anticodon en acceptorstam, "tweede genetische code" ✅ (base 73 weggelaten: ok)
- st4 aminozuur van AMP naar A76 van CCA; AMP vrij ✅ (2'-OH-detail weggelaten: ok)
- st5 twee klassen van ≈ 10, los van elkaar ontstaan, grijpen de acceptorstam langs een andere kant ✅
- st6 Phe te groot (eerste zeef); Val iets kleiner en past ✅
- st7 tweede, kleinere holte (editeerplaats) knipt Val eraf ✅
- st8 eEF1A brengt naar A-plaats; ribosoom controleert enkel codon–anticodon ✅

### `tl/codon` (8)
- st1 codon = 3 basen, 4³ = 64 ✅ · st2 5'→3', zonder overlap/tussenruimte ✅ · st3 AUG start, 3 stops, eRF1 "stopeiwit" ✅
- st4 61 codons voor 20 aminozuren, meeste hebben er meerdere (Leu 6, Met 1), vooral 3e base ✅ (18 van 20 hebben > 1)
- st5 "eerste base van het anticodon" (pos. 34, 5'→3' gelezen) paart losser; inosine leest GCU/GCC/GCA ✅
- st6 drie leesramen, AUG bepaalt het raam ✅ · st7 frameshift ✅
- st8 bijna universeel; mt: UGA = Trp, AUA = Met; UGA ook Sec ✅ (Pyl weggelaten: ok)

### `tl/er` (9)
- st1 prepro-albumine, ER = membraannetwerk ✅ · st2 signaalpeptide ≈ 18 aa: positief begin, hydrofoob midden, knipplaats ✅
- st3 SRP grijpt het hydrofobe midden en remt de translatie ✅ · st4 SRP en receptor binden GTP ✅
- st5 GTP-hydrolyse → SRP los; signaalpeptide opent een "zijdeur" (laterale poort) ✅
- st6 co-translationeel naar het lumen ✅ · st7 signaalpeptidase (actieve plaats in lumen) knipt; peptide blijft in membraan en wordt afgebroken ✅
- st8 OST, N-X-S/T; albumine heeft geen sequon ✅ · st9 stop-transfer en signaalanker ✅

### `tl/ribogenese` (8)
- st1 nucleolus zonder membraan, rond rDNA ✅ · st2 honderden kopieën op 5 chromosomen, Pol I, "kerstboom" ✅
- st3 47S bevat 18S, 5,8S, 28S met spacers → gelijke hoeveelheden ✅ · st4 snoRNP's: 2'-O-methyl en Ψ ✅
- st5 90S vouwt 18S-deel, knippen splitst routes ✅ · st6 ≈ 80 eiwitten geïmporteerd; 5S van Pol III buiten de nucleolus ✅
- st7 aparte export (CRM1) ✅ · st8 18S op maat geknipt, factoren eraf, pas dan 80S ✅

### `tl/ribosoom` (9)
- st1 ≈ 25–30 nm, 4 rRNA's + ≈ 80 eiwitten, PDB 6Y0G ✅ · st2 S = bezinkingssnelheid, telt niet op ✅
- st3 rRNA vormt skelet en werkende delen ✅ · st4 40S houdt mRNA vast, decodeercentrum ✅ · st5 60S, 3 rRNA's, peptidebinding ✅
- st6 A (aankomst), P (keten), E (exit) ✅ · st7 PTC = rRNA = ribozym ✅ · st8 tunnel ≈ 100 Å ✅
- st9 70S met andere rRNA's → selectieve antibiotica ✅ (ook eiwitverschillen spelen mee; "met andere rRNA's" is niet fout)

### `tl/seleno` (7)
- st1 25 menselijke genen, UGA = Sec ✅ · st2 Sec op zijn tRNA, eerst Ser, "zuurstof wordt selenium" ✅ (netto: Ser-O → Sec-Se via fosfoserine)
- st3 SECIS in 3'-UTR, SBP2, eEFSec ✅ · st4 eEFSec i.p.v. eEF1A, UCA·UGA ✅ · st5 doorlezen; zonder Se/SECIS stop ✅
- st6 Pyl in archaea/bacteriën, uit 2 Lys, eigen enzym laadt rechtstreeks ✅ · st7 Sec in drie domeinen, Pyl enkel in enkele microben ✅

### `tl/translatie` (15)
- st1 alleen AUG…UAA vertaald; UTR's, cap, staart niet ✅
- st2 eIF's herkennen cap; 40S + start-tRNA = 43S ✅ · st3 48S scant 5'→3' naar eerste AUG ✅
- st4 CAU·AUG, Kozak helpt, factoren laten los ✅ · st5 60S erbij → 80S, start-tRNA in P ✅
- st6 eEF1A brengt geladen tRNA ✅ · st7 alleen passend anticodon blijft; eEF1A los met GTP-hydrolyse ✅
- st8 rRNA maakt de peptidebinding (ribozym) ✅ · st9 eEF2, 3 nt, A→P→E ✅ · st10 E = exit ✅ · st11 cyclus ✅
- st12 tunnel in grote subeenheid, vouwen begint ✅ · st13 eRF1 lijkt op tRNA ✅ · st14 hydrolyse door water ✅ · st15 ABCE1, polysoom ✅

### `tl/trna` (8)
- st1 ≈ 76 nt, gist-tRNA-Phe ✅ · st2 klaverblad, vier armen (variabele lus weggelaten: ok) ✅ · st3 CCA, aminozuur op A76 ✅
- st4 Gm34 wobble: UUC en UUU ✅ · st5 14 gemodificeerde basen, Ψ, D ✅ · st6 L-vorm, 1EHZ ✅
- st7 twee armen per helix, elleboog D/T-lus ✅ · st8 ≈ 75 Å = afstand decodeercentrum–PTC ✅

### `prot/aminozuren` (9)
Alle ✅. Opmerking: "zuurgroep (carboxyl)" en proline "star" zijn correcte vereenvoudigingen; Sec "op UGA als een signaal in het mRNA dat aangeeft" ✅.

### `prot/peptide` (7) · `prot/primair` (7) · `prot/ramachandran` (8)
Alle ✅ (condensatie, resonantie, 6 atomen in vlak, trans, φ/ψ; 146 vs 147 aa; Glu6Val GAG→GUG; > 98 % favoured).

### `prot/secundair` (9)
Alle ✅ behalve st4 NL-dubbelzinnigheid (#5, gecorrigeerd). 3₁₀ "strakker", π "wijder" ✅.

### `prot/tertiair` (9) · `prot/quaternair` (8) · `prot/vouwing` (8)
Alle ✅. "Binnenin zitten bijna alleen waterschuwe zijketens" ⚠️ licht sterker dan "de meest begraven zijketens zijn bijna allemaal hydrofoob", maar aanvaardbaar als vereenvoudiging. Hb-coöperativiteit, T→R langs α1β2, Cys93/Cys112 zonder brug ✅. Anfinsen-, Levinthal- en trechtertekst ✅.

### `prot/chaperones` (≈ 9) · `prot/disulfide` (≈ 8) · `prot/glyco` (≈ 8) · `prot/golgi` (≈ 8)
Alle ✅ (Hsp70-ATP/ADP-cyclus, NEF, GroEL/GroES, ~10 s, Hsp90; PDI/Ero1 → H₂O₂; ER oxiderend, cytosol reducerend; N-X-S/T, 14 suikers op dolichol, calnexinecyclus, UGGT, ERAD; COPII/ERGIC, KDEL/COPI, cisternale rijping, M6P, constitutief vs gereguleerd).

### `prot/idp` (≈ 8) · `prot/misvouwing` (≈ 8) · `prot/ptm` (≈ 8) · `prot/ubiquitine` (≈ 9)
Alle ✅ (pKID–KIX, lading/hydropathie; nucleatie, cross-β, prionen, UPR; kinase, γ-fosfaat, fosfatase, MAPK, Hyp/vitamine C; E1–E2–E3, K48 ≥ 4, K63, 19S/20S, drie soorten actieve plaatsen).

---

## `kort`-velden

| Knoop | Verdict | Opmerking |
|---|---|---|
| tl: translatie, elongatie, terminatie, ribosoom, trna, codon, ribogenese, er | ✅ | — |
| tl: initiatie | ⚠️ | "anders zou er een volledig verkeerd eiwit ontstaan": strikt genomen alleen bij een start buiten het leesraam; bij een in-frame start verderop ontstaat een ingekort eiwit. Dezelfde formulering staat al in het eerder geverifieerde `why`; niet gewijzigd (zie open vragen). |
| tl: aars | ❌ → fix #1 | |
| tl: seleno | ❌ → fix #2 | |
| prot: primair, aminozuren, peptide, ramachandran, tertiair, quaternair | ✅ | — |
| prot: vouwing | ⚠️ → fix #4 | |
| prot: secundair | ⚠️ → fix #3 | |
| prot2: ptm, ubiquitine, chaperones, glyco, disulfide, golgi, misvouwing, idp | ✅ | ubiquitine: "zodat de aminozuren hergebruikt kunnen worden" klopt (peptiden worden verder door peptidasen afgebroken). |

NL en EN zijn in alle gecontroleerde ondertitels en `kort`-velden inhoudelijk gelijk (enige afwijking: #5).

---

## Open vragen

1. `tl/initiatie` (`kort` én `why`, NL+EN): "volledig verkeerd eiwit" eventueel nuanceren tot "een verkeerd of ingekort eiwit". Inhoudelijk een kleine overdrijving, geen echte fout; beslissing aan de auteur.
2. `tl/er` `kort`: "Eiwitten die de cel uit moeten of in een membraan horen, worden al tijdens hun aanmaak naar het ER gebracht" — tail-anchored membraaneiwitten gaan post-translationeel (GET/TRC40-route). Op bachelorniveau aanvaardbaar als hoofdregel; eventueel "meestal" toevoegen.
