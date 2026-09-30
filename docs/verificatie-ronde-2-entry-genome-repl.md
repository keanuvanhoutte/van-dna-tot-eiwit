# Verificatie ronde 2 — stages `entry`, `genome` en `repl`

Datum: 29 september 2026
Bereik: de uitlegpanelen (`shared/details/entry.js`, `genome.js`, `genome2.js`, `repl.js`: what/how/facts/why + bronnen, NL en EN), de scèneteksten en labels in `app/scenes/entry|genome|repl/*.js`, en de knoopsamenvattingen (`s` in `shared/graph.js`, `S_EN` in `shared/graph.en.js`) van 29 knopen.
Ronde 1 (`docs/verificatie-ronde-1.md`) is als vertrekpunt gebruikt; wat daar al beslist was, is hier niet opnieuw uitgezocht. Wel is nagegaan of de teksten er nu mee overeenkomen.

Methode: elke feitelijke claim (getallen, namen, mechanismen, 5'→3'-richtingen, subeenheden, PDB-codes en hun inhoud) is getoetst aan PubMed/Europe PMC-abstracts, de RCSB-API, UniProt, PDB-101 en handboeken. NL en EN zijn naast elkaar gelegd, en de bron-URL's/PMID's zijn gecontroleerd.

Legenda: ✅ klopt · ⚠️ genuanceerd/gehedged · ❌ fout (gecorrigeerd)

Controle na alle wijzigingen: alle bestanden in scope parsen (`node … new Function(…)`). `tools/check.html` (headless Chrome) geeft **nodes 72 · scenes 72 · details 72** en **PROBLEMS (0)**.

---

## 0 · Samenvatting

### ❌ Fouten gecorrigeerd
| Knoop | Fout | Correctie |
|---|---|---|
| `baltimore` | "Baltimore stelde in 1971 … zeven klassen" | In 1971 waren het **zes** klassen; klasse VII (dsDNA-RT) kwam later. Aangepast in details (NL+EN) en in de graaf (Koonin et al. 2021, PMC8483701) |
| `virus` | Scèneschaal "≈ 30–200 nm" tegenover "≈ 20–300 nm" in de details | Gelijkgetrokken naar 20–300 nm |
| `supercoiling` | Stap 3: "12 bp per winding" na onderwinding | 126 bp / 10 windingen = **≈ 12,6** bp per winding |
| `noncanon` | Bron "Mirkin (2024)" met onvolledige auteurslijst | "Hisey, Masnovo & Mirkin (2024)", PMID 39723156 |
| `mutaties` | "NMD onderdrukt ≈ 1/3 van de ziekteveroorzakende mRNA's" staat niet in de geciteerde bron | Nonsense ≈ 11 % van de erfelijke ziektemutaties (Mort 2008, PMID 18454449); met frameshifts e.d. vaak ≈ 1/3 |
| `replicatie` | "Het proef van Meselson & Stahl" | "De proef" |

### Wijzigingen in `shared/graph.js` / `shared/graph.en.js` (door de coördinator)
| Knoop | Vóór → na (NL; EN idem) |
|---|---|
| `noncanon` | "(gestapelde G-kwartetten, gestabiliseerd door K⁺); daarnaast triplex-DNA (H-DNA) en kruisvormen bij palindromen." → "(gestapelde G-kwartetten met Hoogsteen-H-bruggen, gestabiliseerd door een centraal kation, K⁺ > Na⁺); daarnaast triplex-DNA (H-DNA), kruisvormen bij palindromen en i-motieven in C-rijke strengen." |
| `dnavormen` (alleen EN) | "shorter and wider" → "shorter and thicker (wider)", in lijn met NL "korter en dikker" |
| `nucleolus` (alleen NL) | "het rRNA-voorloper" → "de rRNA-voorloper" |
| `kern` | "dubbele kernenvelop met kernporiën" → "dubbele kernenvelop (buitenmembraan loopt door in het ER, binnenkant gesteund door de kernlamina) met kernporiën" (voorstel uit ronde 1) |
| `baltimore` | + "(Baltimore 1971: zes klassen; klasse VII kwam later)" |
| `replisoom` | "Helicase (MCM2-7 bij eukaryoten), primase," → "Helicase CMG (Cdc45–MCM2-7–GINS), Pol α-primase," |

De overige 23 samenvattingen zijn gecontroleerd. Ze zijn correct, stemmen overeen met de details en scènes, en NL en EN zeggen hetzelfde.

### Nagekeken (alle claims geverifieerd of gehedged) — 29 knopen
`cel`, `virus`, `adeno`, `lnp`, `endocytose`, `baltimore`, `rt`, `integratie`, `kernimport`,
`kern`, `nucleolus`, `chromosoom`, `chromatine`, `nucleosoom`, `histonmod`, `dnamethyl`, `gen`,
`dnahelix`, `dnavormen`, `noncanon`, `basenparing`, `nucleotide`, `supercoiling`,
`replicatie`, `replisoom`, `ssdna`, `telomeren`, `herstel`, `mutaties`.

### Open punten (geen feitelijke fouten; niet blokkerend)
1. **`mutaties` (visueel):** in de frameshiftstap staat het label "vroeg stopcodon" op `cx(21)`, maar het stopcodon zit op positie 22. Voorstel: `cx(22)`. Dat is een layoutwijziging en valt dus buiten het fixbeleid.
2. **`supercoiling` / 3D-atlas:** 1ZXM is alleen het ATPase-domein van TOP2A. De tekst zegt dat nu. Als de 3D-weergave een TOP2–DNA-complex moet tonen, zijn 3QX3 (humaan TOP2B–DNA–etoposide) of 4FM9 (humaan TOP2A–DNA) beter. Beide zijn bevestigd in RCSB.
3. **`replisoom`:** "Pol ε, gebonden aan CMG en PCNA" klopt, maar Pol ε wordt vooral door CMG vastgehouden (de PCNA-binding is zwak). Eventueel nuanceren.
4. **`ssdna`:** de tijdregel "RPA bindt in milliseconden" is vereenvoudigd, maar aanvaardbaar.
5. **`nucleolus`:** "tientallen" Pol I-moleculen per actieve rDNA-eenheid staat voor de mens niet exact vast in de literatuur (tot ~100). Niet fout.
6. **Bronvermeldingen (cosmetisch):**
   - De bron `nucleolusRev` vermeldt geen auteurs; het gaat om Lam & Trinkle-Mulcahy 2015.
   - De bronregel bij `adeno` noemt 1KAC (Ad12) en 1QIU (Ad2) naast 6B1T (HAdV-C5).
7. **Optioneel:** `pdb: [..., '1D3X']` bij `noncanon`, en "… en negatieve erachter (twin-domain-model)" in de samenvatting van `supercoiling`.

Van de originele bestanden staan kopieën in de scratchpad van deze sessie (niet in het project).

---

## Sectie `entry` — verificatieronde 2

Bereik: `shared/details/entry.js` (knopen cel, virus, adeno, lnp, endocytose, baltimore, rt,
integratie, kernimport) + de bijbehorende scènes in `app/scenes/entry/` (incl. tekstlabels in
`_bits.js`/`_celsvg.js`). Ronde 1 (docs/verificatie-ronde-1.md §1.1–1.4 en §2) is als
uitgangspunt genomen en niet opnieuw gecontroleerd.

Legenda: ✅ klopt · ⚠️ genuanceerd/gehedged · ❌ fout (gecorrigeerd)

---

### `cel`

| Claim | Verdict |
|---|---|
| Epitheelcel ≈ 20 µm; typisch 10–30 µm (HeLa ≈ 20 µm) | ✅ (ronde 1) |
| Kerndiameter ≈ 5–10 µm | ✅ (ronde 1) |
| Kernporiën per kern ≈ 3 000 (HeLa), band 2 000–5 000 bij gewervelden | ✅ (ronde 1) |
| Haploïd genoom ≈ 3,0–3,1 miljard bp | ✅ (T2T-CHM13v2.0 ≈ 3,05 Gb) |
| ~2 m DNA per cel | ✅ |
| Mitochondriaal genoom 16 569 bp | ✅ (rCRS/GRCh38 mtDNA) |
| Schaalreeks 20 µm → 120 nm (porie) → 25 nm (ribosoom) → 0,34 nm (rise per bp) | ✅ |
| Scène: adenovirus ~90 nm, LNP ~100 nm sterk vergroot; alleen microtubuli getekend | ✅ (correct als vereenvoudiging benoemd) |
| Scène: "DNA moet de kern in om afgelezen te worden" | ✅ |

Geen wijzigingen. NL/EN gelijk.
Bronnen: https://book.bionumbers.org/how-big-is-a-human-cell/ ·
https://www.science.org/doi/10.1126/science.abj6987 ·
https://www.embopress.org/doi/full/10.1038/msb.2013.4

---

### `virus`

| Claim | Verdict |
|---|---|
| Virus = genoom + capside, soms envelop uit de vorige gastheercel; geen ribosomen, geen eigen energievoorziening | ✅ |
| Tropisme bepaald door receptorherkenning | ✅ |
| Grootte virusdeeltje ≈ 20–300 nm (adenovirus ≈ 90 nm, HIV-1 ≈ 100–120 nm) | ✅ |
| Klathrine-blaasje ≈ 100 nm | ✅ |
| Alleen omhulde virussen kunnen direct fuseren; HIV-1 als voorbeeld | ✅ |
| Baltimore: 7 klassen op basis van de weg naar mRNA | ⚠️ zie `baltimore` (klasse VII is later toegevoegd) |
| Scènetitel/schaal "≈ 30–200 nm (virusdeeltje)" | ❌ inconsistent met details (20–300 nm) → aangepast |

Wijziging — `app/scenes/entry/virus.js`:
`scale: '≈ 30–200 nm (virusdeeltje)' / '≈ 30–200 nm (virion)'` →
`'≈ 20–300 nm (virusdeeltje)' / '≈ 20–300 nm (virion)'` (nu gelijk aan de details-tekst;
parvovirus ≈ 20 nm, pokkenvirus ≈ 250–350 nm).

Bronnen: https://viralzone.expasy.org/ ·
https://pmc.ncbi.nlm.nih.gov/articles/PMC4456001/

---

### `adeno`

| Claim | Verdict |
|---|---|
| HAdV-C5 niet omhuld, icosaëdrisch capside ≈ 90 nm | ✅ |
| Lineair dsDNA ≈ 36 kb (HAdV-C5: 35 938 bp), Baltimore-klasse I | ✅ |
| 240 hexonen (vlakken) + 12 pentonbasissen (hoeken), elk met vezel + knop | ✅ |
| Vezelknop ↔ CAR = aanhechting, nog geen opname | ✅ (ronde 1) |
| RGD-lus op de pentonbasis ↔ αvβ3/αvβ5 → klathrine-endocytose | ✅ (ronde 1) |
| Dynamine snoert het blaasje af | ✅ |
| Proteïne VI (amfipathische helix) breekt het endosoommembraan open | ✅ (ronde 1) |
| Dyneïne trekt het capside over microtubuli naar de kern | ✅ (ronde 1) |
| Hexon dokt aan Nup214 | ✅ (Cassany 2015) |
| Kinesine-1: zware keten Kif5C via Nup358, lichte keten Klc1/2 op het capside | ✅ letterlijk bevestigd in de abstract van Strunze 2011 |
| Histon H1 nodig voor ontmanteling | ✅ (Trotman 2001) |
| Genoom gaat met proteïne VII naar binnen, blijft episomaal | ✅ |
| Pol II leest de eiwitcoderende genen (E1A eerst), VA-RNA's door Pol III | ✅ (ronde 1) |
| Bronvermelding PDB 6B1T / 1KAC / 1QIU bij PDB-101 MotM 132 | ✅ MotM 132 = Adenovirus; 6B1T = HAdV-5 cryo-EM met proteïne VI/VII, 1KAC = knob–CAR (serotype 12), 1QIU = vezel-schacht (triple β-spiral) |

Geen wijzigingen. NL/EN gelijk.
Bronnen: https://pubmed.ncbi.nlm.nih.gov/21925109/ ·
https://www.nature.com/articles/ncb1201-1092 ·
https://journals.asm.org/doi/full/10.1128/jvi.02639-14 ·
https://pdb101.rcsb.org/motm/132 · https://data.rcsb.org/rest/v1/core/entry/6B1T

---

### `lnp`

| Claim | Verdict |
|---|---|
| LNP ≈ 80–100 nm | ✅ |
| Vier lipiden: ioniseerbaar lipide, helperfosfolipide, cholesterol, PEG-lipide | ✅ (geen ratio's geclaimd, dus niets te controleren) |
| Opname via endocytose, o.a. na ApoE-binding aan lipoproteïnereceptoren | ✅ |
| v-ATPase verzuurt: 7,4 → ≈ 6,5 → ≈ 5,5 | ✅ |
| Ioniseerbaar lipide: "schijnbare pKa ongeveer 6–7" | ⚠️ te ruim → gehedged naar 6–6,7 (ALC-0315 ≈ 6,1; SM-102 ≈ 6,7; optimum 6,2–6,5) |
| Positieve lading destabiliseert het (negatieve) endosoommembraan | ✅ (ronde 1) |
| Ontsnapping: orde van enkele procenten (1–2 % gemeten met siRNA-LNP's, Gilleron 2013) | ✅ correct geattribueerd, niet als vaccincijfer gepresenteerd |
| Alle uridines → m1Ψ; minder TLR/RIG-I-activatie én meer eiwitopbrengst | ✅ (ronde 1) |
| Geen kernimport, geen reverse transcriptase, geen integratie | ✅ |
| mRNA binnen enkele dagen afgebroken | ✅ |

Wijziging — `shared/details/entry.js` (lnp.how, NL + EN):
`schijnbare pKa ongeveer 6–7` → `ongeveer 6–6,7` / `apparent pKa around 6–7` → `around 6–6.7`.

Bronnen: https://www.nature.com/articles/nbt.2612 ·
https://www.pnas.org/doi/10.1073/pnas.2307800120 ·
https://pmc.ncbi.nlm.nih.gov/articles/PMC8989677/

---

### `endocytose`

| Claim | Verdict |
|---|---|
| AP-2 en andere adaptoren selecteren de vracht | ✅ |
| Klathrine-triskelia vormen een gebogen mandje; klathrine-blaasje ≈ 100 nm | ✅ |
| Dynamine (GTPase) knijpt de hals door met GTP-hydrolyse | ✅ |
| Vroeg endosoom pH ≈ 6,5 · laat endosoom ≈ 5,5 · lysosoom ≈ 4,5 | ✅ (als "typische waarden" benoemd in `simplified`) |
| v-ATPase = vacuolair H⁺-ATPase, pompt H⁺ naar binnen | ✅ |
| Fagosomen > 250 nm | ✅ |
| Rijping in ~10–30 min | ✅ (orde van grootte) |
| Adenovirus ontsnapt via proteïne VI; LNP via ioniseerbare lipiden | ✅ |
| Het grootste deel van de vracht ontsnapt niet en gaat naar het lysosoom | ✅ |

Geen wijzigingen. NL/EN gelijk. Rab5/Rab7 en ESCRT worden expliciet als weggelaten benoemd —
correct, geen onjuiste claim.
Bronnen: https://www.ncbi.nlm.nih.gov/books/NBK26870/ ·
https://link.springer.com/article/10.1186/s40035-015-0041-1

---

### `baltimore`

| Claim | Verdict |
|---|---|
| Criterium = de route van het genoom naar (+)mRNA, niet verwantschap | ✅ |
| "David Baltimore stelde in 1971 … Dat levert zeven klassen op" | ❌ Baltimore 1971 (Bacteriol Rev) beschreef **zes** klassen; klasse VII (dsDNA-RT) is later toegevoegd → gecorrigeerd |
| Klasse I dsDNA → host Pol II; voorbeelden adenovirus, herpes, pokkenvirus | ⚠️ pokkenvirus gebruikt zijn **eigen** multisubunit-RNA-polymerase in het cytoplasma → verduidelijkt |
| Klasse II ssDNA → eerst dsDNA; parvovirus B19 | ✅ |
| Klasse III dsRNA → virale RdRp; rotavirus, reovirus | ✅ |
| Klasse IV (+)ssRNA meteen leesbaar; poliovirus, SARS-CoV-2, hepatitis A; naakt RNA besmettelijk | ✅ |
| Klasse V (−)ssRNA, RdRp moet in het virion; influenza, rabiës, mazelen, ebola | ✅ |
| Klasse VI ssRNA-RT → integratie; HIV-1 | ✅ |
| Klasse VII dsDNA-RT via RNA-tussenstap; hepatitis B | ✅ |

Wijzigingen:
- `shared/details/entry.js` baltimore.nl.what: `Dat levert zeven klassen op` → `Baltimore beschreef zes klassen; met de later toegevoegde klasse VII (dsDNA-RT) zijn het er zeven`; idem EN (`This yields seven classes` → `Baltimore described six classes; with the later addition of class VII (dsDNA-RT) there are seven`).
- baltimore.facts NL: `['Voorgesteld door', 'David Baltimore, 1971']` → `'David Baltimore, 1971 (zes klassen)'`; `['Aantal klassen', '7']` → `'7 (klasse VII later toegevoegd)'`; idem EN.
- baltimore.how[0] NL: `pokkenvirus (dat in het cytoplasma repliceert)` → `en het pokkenvirus, dat in het cytoplasma repliceert met zijn eigen RNA-polymerase`; idem EN.
- `app/scenes/entry/baltimore.js` `simplified`: `repliceert in het cytoplasma —` → `repliceert in het cytoplasma, met zijn eigen RNA-polymerase —`; EN idem (`using its own RNA polymerase`).

Bron: Koonin et al., MMBR 2021 — abstract: *"The six 'Baltimore classes' of viruses, with a
subsequently added 7th class…"* — https://pmc.ncbi.nlm.nih.gov/articles/PMC8483701/
(PMID 34259570)

---

### `rt`

| Claim | Verdict |
|---|---|
| Genoom ≈ 9,7 kb (+)ssRNA, twee identieke kopieën per virion (diploïd) | ✅ (HXB2 9 719 nt) |
| Reverse transcriptie grotendeels binnen het capside in het cytoplasma | ✅ (ronde 1) |
| Doelcellen CD4⁺-T-cellen en macrofagen; trager in macrofagen | ✅ (ronde 1) |
| RT: DNA op RNA-matrijs, DNA op DNA-matrijs, RNase H; twee actieve plaatsen | ✅ |
| Primer = gastheer-tRNA-Lys3 op de PBS | ✅ |
| Genoomordening 5'-R-U5-PBS-(gag/pol/env)-PPT-U3-R-3' | ✅ (scène-segmenten kloppen) |
| Minus-strand strong-stop DNA bevat R + U5; RNase H ruimt R-U5 op | ✅ |
| 1ᵉ strengoverdracht via de R-herhaling naar het 3'-uiteinde | ✅ |
| PPT blijft gespaard en is de primer voor de (+)-streng; (+)-DNA kopieert een stuk tRNA → PBS in DNA | ✅ |
| 2ᵉ strengoverdracht via PBS↔PBS na wegknippen van tRNA en PPT | ✅ |
| Eindproduct: lineair dsDNA met twee volledige LTR's (U3-R-U5), langer dan het RNA | ✅ |
| RT heeft geen proefleesfunctie → hoge mutatiesnelheid, snelle resistentie | ✅ (geen 3'→5'-exonuclease) |
| PDB 1RTD = catalytisch complex HIV-1 RT | ✅ "Structure of a catalytic complex of HIV-1 reverse transcriptase…" |
| PDB 1HYS = HIV-1 RT met PPT RNA:DNA | ✅ "Crystal structure of HIV-1 reverse transcriptase in complex with a polypurine tract RNA:DNA" |

Geen wijzigingen. NL/EN gelijk. (p66/p51 en RNase H-subdomein worden niet geclaimd; de scène
noemt alleen "RT" en "RNase H" — correct.)
Bronnen: https://pmc.ncbi.nlm.nih.gov/articles/PMC3475395/ ·
https://data.rcsb.org/rest/v1/core/entry/1RTD ·
https://data.rcsb.org/rest/v1/core/entry/1HYS

---

### `integratie`

| Claim | Verdict |
|---|---|
| Integrase bindt beide virale DNA-uiteinden in één complex: het intasoom | ✅ |
| HIV-1-intasoom als tetrameer | ✅ (PDB 5U1C: "Structure of tetrameric HIV-1 Strand Transfer Complex Intasome") |
| 3'-processing: 2 nt (GT) per 3'-uiteinde weg → geconserveerde CA-3'OH | ✅ |
| Gecoördineerde strengoverdracht op twee posities, 5 bp uit elkaar, op tegenoverliggende strengen | ✅ |
| Gevolg: 5 bp gastheersequentie dubbel (HIV-1); MLV 4 bp | ✅ |
| Gaten/5'-uiteinden worden door gastheer-herstelenzymen gedicht (welke precies onduidelijk) | ✅ correct gehedged |
| Linker-LTR = promoter; Pol II schrijft het provirus af; stil provirus = latent reservoir | ✅ |
| LEDGF/p75 stuurt naar transcriptioneel actieve genlichamen | ✅ (ronde 1) |
| Integraseremmers, bv. dolutegravir | ✅ |
| Intasoom ≈ 10 nm (scèneschaal) | ✅ orde van grootte |
| PDB 3OS0 = PFV strand transfer complex | ✅ "PFV strand transfer complex (STC) at 2.81 Å" |

Geen wijzigingen. NL/EN gelijk.
Bronnen: https://pmc.ncbi.nlm.nih.gov/articles/PMC3385939/ ·
https://pmc.ncbi.nlm.nih.gov/articles/PMC4334468/ ·
https://data.rcsb.org/rest/v1/core/entry/5U1C ·
https://data.rcsb.org/rest/v1/core/entry/3OS0

---

### `kernimport`

| Claim | Verdict |
|---|---|
| NPC = enige doorgang, achtvoudig symmetrisch, ~30 soorten nucleoporinen in veelvouden van 8 | ✅ (ronde 1) |
| Massa "≈ 120 MDa" | ⚠️ literatuur geeft ≈ 110 MDa (humaan, structuurbepalingen) tot ≈ 120–125 MDa (gewervelden) → gehedged naar 110–120 MDa |
| "~500 eiwitmoleculen per porie" | ⚠️ ronde 1 noemt ~500–1 000 → gehedged naar ~500–1 000 |
| Centraal kanaal ≈ 40 nm, buitendiameter 80–120 nm; scèneschaal ≈ 120 nm | ✅ |
| Passieve grens ≈ 40 kDa / ~5 nm door de FG-mesh | ✅ (ronde 1) |
| NLS = kort basisch motief, bv. PKKKRKV (SV40 large T) | ✅ |
| Importine α = adapter voor de NLS, importine β passeert de FG-zeef | ✅ |
| Translocatie kost zelf geen ATP ("hoppen" langs FG-herhalingen); één translocatie in enkele ms | ✅ |
| Ran·GTP in de kern maakt de vracht los; RanGAP hydrolyseert in het cytoplasma; RCC1 op chromatine | ✅ (ronde 1) |
| ~3 000 poriën per (HeLa-)kern | ✅ (ronde 1) |
| Adenoviruscapside (≈ 90 nm) past niet door het kanaal (~40 nm) → ontmanteling aan de porie, alleen DNA + proteïne VII naar binnen | ✅ |
| Kinesine-1 Kif5C via Nup358 + histon H1 | ✅ (Strunze 2011) |
| Buitenmembraan continu met het ER (scènelabel) | ✅ |
| PDB 7R5K = human nuclear pore complex (constricted), cryo-EM | ✅ |

Wijzigingen:
- `shared/details/entry.js` kernimport.nl.what: `ongeveer 120 MDa` → `ongeveer 110–120 MDa`;
  `~500 eiwitmoleculen per porie` → `~500–1 000 eiwitmoleculen per porie`; EN idem
  (`about 110–120 MDa`, `~500–1,000 protein molecules per pore`).
- kernimport.facts: `Massa NPC ≈ 120 MDa` → `≈ 110–120 MDa`; `~500 moleculen per porie` →
  `~500–1 000 moleculen per porie`; EN idem.
- `app/scenes/entry/kernimport.js` label stap 1: `≈ 120 MDa · ~3 000 poriën per kern` →
  `≈ 110–120 MDa · ~3 000 poriën per kern`; EN idem (label blijft even kort).

Bronnen: https://pmc.ncbi.nlm.nih.gov/articles/PMC4311126/ ·
https://www.nature.com/articles/nrm.2016.147 ·
https://data.rcsb.org/rest/v1/core/entry/7R5K

---

## Bronnen-URL's: bereikbaarheid

Alle 30 `url`-velden in `shared/details/entry.js` resolveren (HTTP 200/203). Vier geven 403 door
bot-blokkering, niet door een dode link: hivinfo.nih.gov, journals.asm.org (Cassany), pnas.org,
science.org. PubMed-ID 21925109 hoort inderdaad bij Strunze et al. 2011 (kinesine-1), en alle
genoemde PDB-codes bevatten wat de tekst beweert (7R5K, 5U1C, 3OS0, 1RTD, 1HYS, 6B1T, 1KAC, 1QIU).

Kleine nuance (niet gewijzigd): in de adeno-bronregel staat "structuren 6B1T, 1KAC, 1QIU" — 1KAC
is de knob–CAR-structuur van **serotype 12** en 1QIU de vezelschacht van Ad2, niet van C5. Dat
staat alleen in een brontitel, dus geen inhoudelijke claim in de app.

---

## Voorstellen voor graph.js / graph.en.js

De `s`-samenvattingen van mijn negen knopen zijn inhoudelijk in overeenstemming met de details- en
scèneteksten (CAR + αv-integrine + klathrine, proteïne VI, dyneïne, Nup214, kinesine-1 + histon H1,
episomaal, Pol II/Pol III, 1–2 % siRNA-LNP, m1Ψ, ~30 nups, ~3 000 poriën, importine α/β, RanGTP).
Eén voorstel, om aan te sluiten bij de correctie in `baltimore`:

`shared/graph.js`, knoop `baltimore`:
- vóór: `s: 'Zeven klassen op basis van genoomtype en hoe mRNA gemaakt wordt: dsDNA, ssDNA, dsRNA, (+)ssRNA, (−)ssRNA, ssRNA-RT, dsDNA-RT.',`
- na: `s: 'Zeven klassen op basis van genoomtype en hoe mRNA gemaakt wordt: dsDNA, ssDNA, dsRNA, (+)ssRNA, (−)ssRNA, ssRNA-RT, dsDNA-RT (Baltimore 1971: zes klassen; klasse VII kwam later).',`

`shared/graph.en.js`, `S_EN.baltimore`:
- vóór: `baltimore: 'Seven classes based on genome type and how mRNA is made: dsDNA, ssDNA, dsRNA, (+)ssRNA, (−)ssRNA, ssRNA-RT, dsDNA-RT.',`
- na: `baltimore: 'Seven classes based on genome type and how mRNA is made: dsDNA, ssDNA, dsRNA, (+)ssRNA, (−)ssRNA, ssRNA-RT, dsDNA-RT (Baltimore 1971: six classes; class VII was added later).',`

(Optioneel, geen fout: `kernimport` vermeldt geen NPC-massa, dus daar is niets te hedgen.)

---

## Status

**Nagekeken** (alle claims geverifieerd of gehedged): `cel`, `virus`, `adeno`, `lnp`,
`endocytose`, `baltimore`, `rt`, `integratie`, `kernimport` — alle negen.

**Open punten:** geen inhoudelijke. Twee restpunten ter info:
1. De graph-samenvatting van `baltimore` mist nog de 1971-nuance (voorstel hierboven; graph.js
   valt buiten mijn scope).
2. Brontitel bij `adeno` noemt 1KAC/1QIU (serotype 12 resp. Ad2) naast 6B1T (C5); alleen een
   bronvermelding, geen claim in de app — desgewenst later te verfijnen.

Alle gewijzigde bestanden parseren (`node -e new Function(...)`-check: OK voor
`shared/details/entry.js`, `app/scenes/entry/virus.js`, `baltimore.js`, `kernimport.js`).
Er is geen animatielogica, layout of bestandsstructuur aangepast.


---

## Stage "genome" deel A — kern, nucleolus, chromosoom, chromatine, nucleosoom, histonmod, dnamethyl, gen

Nagekeken: `shared/details/genome.js` (alle NL/EN-velden + bronnenlijst) en `app/scenes/genome/{kern,nucleolus,chromosoom,chromatine,nucleosoom,histonmod,dnamethyl,gen}.js` (titels, stappen, simplified/extra, time, scale, legend, labels op het scherm), plus de getoonde labels in `_kernsvg.js` en `_a_kit.js`.
Wat in ronde 1 al is afgehandeld (envelop/ER/lamina, 46 chromosomen, 3,05 Gb, ~2 m, lusextrusie, 147 bp / ~1,7 windingen, 1AOI/1KX5) is consistent toegepast in details, scènes en graph.

**Bronnenlijst:** alle 18 PubMed-ID's uit `S` bestaan en passen bij de vermelde auteurs, titel, tijdschrift, volume en pagina's (gecontroleerd via Europe PMC). Toegevoegd: Saxonov et al. 2006 (PMID 16432200).

---

### `kern`
| Claim | Verdict |
|---|---|
| Dubbel membraan, buitenmembraan loopt door in het ruw ER, lamina, heterochromatine aan de lamina | ✅ |
| Kernporiën enige doorgang; passieve diffusie voor kleine moleculen, NLS-import via importines en RanGTP | ✅ |
| Diameter ~5–10 µm; scène "≈ 8 µm" | ✅ |
| ~6 miljard bp per diploïde cel ≈ 2 m (6,1 Gb × 0,34 nm) | ✅ |
| "~3 000 kernporiecomplexen per menselijke kern" (scène) | ⚠️ te precies: het aantal hangt sterk af van het celtype (McCloskey 2018; Maul & Deaven 1977) → **aangepast** |
| Miller-"kerstboom" met transcripten die langer worden naar het einde van het gen | ✅ |
| Adenovirus: capside valt uiteen aan de porie, genoom met eiwitten gaat naar binnen, blijft episomaal, wordt afgelezen door Pol II | ✅ |

Wijzigingen in `app/scenes/genome/kern.js`:
- simplified: "(~3 000 per menselijke kern)" → "(enkele duizenden per menselijke kern, afhankelijk van het celtype)". EN idem.
- stap 2: "met ~3 000 kernporiecomplexen" → "met duizenden kernporiecomplexen". EN: "with thousands of …".

Bronnen: https://pubmed.ncbi.nlm.nih.gov/30228202/ · https://pubmed.ncbi.nlm.nih.gov/406262/

### `nucleolus`
| Claim | Verdict |
|---|---|
| Geen membraan; grootste kernlichaam; vormt zich rond NOR's op de korte armen van 13, 14, 15, 21 en 22 | ✅ (Lam & Trinkle-Mulcahy 2015) |
| rDNA-herhaling ~43 kb, waarvan ~13 kb getranscribeerd; IGS ~30 kb | ✅ |
| 47S pre-rRNA (~13 kb) → 18S + 5.8S + 28S; volgorde 5'ETS–18S–ITS1–5.8S–ITS2–28S–3'ETS | ✅ |
| "~300–400 rDNA-kopieën per diploïde cel" | ⚠️ sterk variabel. In menselijk sperma (haploïd) 98–404 kopieën, gemiddeld 219 (Potabattula 2025), dus diploïd grofweg 200–800 → **aangepast** naar "honderden (vaak ~400; sterk variabel)" |
| Pol I transcribeert aan de grens FC/DFC; box C/D-snoRNA + fibrillarine → 2'-O-Me; box H/ACA + dyskerine → Ψ | ✅ |
| "~200 modificaties" | ✅ Taoka 2018: 228 plaatsen in het menselijke 80S-ribosoom, de meeste 2'-O-Me en Ψ |
| 5S-rRNA door Pol III, cluster op chr 1 (1q42) | ✅ |
| ~80 ribosomale eiwitten, geïmporteerd | ✅ (33 + 47 = 80 in het humane 80S-ribosoom) |
| Pre-40S en pre-60S worden apart geëxporteerd, o.a. via CRM1/XPO1, en rijpen af in het cytoplasma | ✅ |
| Nucleoli per kern meestal 1–3 (maximaal 10 NOR's) | ✅ |
| rRNA ≈ 80 % van al het RNA; duizenden ribosomen per minuut | ✅ (orde van grootte) |
| Tijd ~30–60 min van rDNA tot subeenheid | ✅ als orde van grootte (zo aangeduid) |

Wijzigingen:
- `genome.js`, facts: "~300–400 per diploïde cel (variabel)" → "honderden per diploïde cel (vaak ~400; sterk variabel)". EN idem.
- `nucleolus.js`, stap 3: "Samen ~300–400 kopieën per cel." → "Samen honderden kopieën per cel (sterk variabel, vaak ~400)." EN idem.
- `nucleolus.js`, label: "één herhaling ≈ 43 kb · ~300–400 kopieën" → "… · honderden kopieën". EN: "hundreds of copies".

Bronnen: https://pubmed.ncbi.nlm.nih.gov/26097721/ · https://pubmed.ncbi.nlm.nih.gov/30356013/ · https://pubmed.ncbi.nlm.nih.gov/30202881/ · https://pubmed.ncbi.nlm.nih.gov/40362434/

### `chromosoom`
| Claim | Verdict |
|---|---|
| 46 = 22 paren autosomen + XX/XY; 23 per gameet | ✅ |
| Haploïd genoom ≈ 3,05 Gb (T2T-CHM13) | ✅ (Nurk 2022: 3,055 Gb) |
| Lengtes in het karyogram (chr1 248,4 … chr21 45,1, chr22 51,3, X 154,3 Mb; Y 62,5 Mb uit HG002) | ✅ komen overeen met T2T-CHM13v2.0 |
| Chr 21 is het kleinste chromosoom | ✅ |
| Acrocentrische chromosomen 13, 14, 15, 21 en 22 dragen het rDNA | ✅ |
| Cohesine: van de armen verwijderd in de profase, aan het centromeer beschermd door shugoshin, geknipt door separase in de anafase | ✅ |
| Condensine vouwt lussen rond een as; ~10 000× compactie | ✅ (klassieke waarde uit Alberts) |
| α-satelliet met een monomeer van 171 bp; CENP-A; kinetochoor | ✅ |
| "megabasen α-satelliet" | ⚠️ actieve HOR-arrays zijn ongeveer 0,3–5 Mb groot (Altemose 2022) → **aangepast** naar "honderden kb tot enkele Mb" |
| Telomeer (TTAGGG)ₙ, 3'-overhang, shelterin, telomerase; lengte "enkele tot ~15 kb" | ✅ |
| "duizenden herhalingen" | ⚠️ enkele kb is maar een paar honderd herhalingen van 6 bp → **aangepast** naar "honderden tot duizenden" |
| Mitose ≈ 1 uur | ✅ |

Wijzigingen in `chromosoom.js`, stap 5 en stap 6 (NL en EN), zoals hierboven.

Bronnen: https://pubmed.ncbi.nlm.nih.gov/35357919/ · https://pubmed.ncbi.nlm.nih.gov/35357911/ · https://pubmed.ncbi.nlm.nih.gov/16166375/

### `chromatine`
| Claim | Verdict |
|---|---|
| 10 nm-vezel, nucleosoom ~11 nm, herhaling ~200 bp | ✅ |
| 30 nm-vezel alleen in vitro; in vivo een onregelmatige keten van 5–24 nm (ChromEMT) | ✅ letterlijk zo in Ou et al. 2017 |
| Contactdomeinen met een mediaan van ~185 kb; ~10 000 lussen; >90 % convergente CTCF | ✅ letterlijk zo in Rao et al. 2014 |
| TAD-paneel "~100 kb – 1 Mb", lus "~50 kb–1 Mb" | ✅ als typisch bereik (Rao: 40 kb–3 Mb) |
| Lusextrusie "tot ~2 kb/s (in vitro)" | ✅ Davidson 2019: "up to 2.1 kbp/s" |
| Lusextrusie is ATP-afhankelijk en stopt bij convergente CTCF | ✅ |
| Heterochromatine ligt aan de lamina en rond de nucleolus; H3K9me3 + HP1 | ✅ |

Geen wijzigingen.
Bronnen: https://pubmed.ncbi.nlm.nih.gov/28751582/ · https://pubmed.ncbi.nlm.nih.gov/25497547/ · https://pubmed.ncbi.nlm.nih.gov/31753851/

### `nucleosoom`
| Claim | Verdict |
|---|---|
| ~147 bp, ~1,7 (1,65–1,7) linkshandige windingen, octameer 2×(H2A, H2B, H3, H4) | ✅ (ronde 1) |
| PDB 1KX5: 1,94 Å, 147 bp; ketens A/E = H3, B/F = H4, C/G = H2A, D/H = H2B, I/J = DNA; histonen van *Xenopus laevis*, DNA "Homo sapiens" (α-satelliet) | ✅ gecontroleerd via de RCSB API; de ketenmapping in de scène klopt |
| PDB 1AOI: 2,8 Å, 146 bp | ✅ (RCSB) |
| Histonplooi α1–L1–α2–L2–α3 in een "handdruk"; residubereiken van de plooi (H3 63–131, H4 30–93) | ✅ |
| (H3–H4)₂ bindt eerst, daarna 2 × H2A–H2B | ✅ |
| ~14 contactplaatsen met de kleine groef, arginines in de kleine groef, vooral fosfaatcontacten | ✅ (Luger 1997) |
| ~11 nm × ~5,5 nm | ✅ (schijf van ~110 × 55–60 Å) |
| Linker-DNA ~20–80 bp | ✅ in afgezwakte vorm (NRL 160–240 bp) |
| Xenopus- en menselijke histonen verschillen maar op enkele posities | ✅ |

Geen wijzigingen.
Bronnen: https://data.rcsb.org/rest/v1/core/entry/1KX5 · https://data.rcsb.org/rest/v1/core/entry/1AOI · https://pubmed.ncbi.nlm.nih.gov/9305837/ · https://pubmed.ncbi.nlm.nih.gov/12079350/

### `histonmod`
| Claim | Verdict |
|---|---|
| Sequentie van de H3.1-staart ARTKQTARKSTGGKAPRKQLATKAARKSAP; K4, K9, K14, K18, K23 en K27; nummering na Met1 | ✅ (residu per residu gecontroleerd) |
| HATs p300/CBP en GCN5 gebruiken acetyl-CoA; HDACs; LSD1 en JmjC; KMT's gebruiken SAM | ✅ |
| Acetylatie neutraliseert de lading, methylatie niet; chemische formules me1/me2/me3 | ✅ |
| H3K4me3 aan promoters (SET1/MLL); H3K27ac; H3K9me3 via SUV39H1/SETDB1; H3K27me3 via PRC2/EZH2 | ✅ |
| Lezers: bromodomein ↔ Kac (BRD4); chromodomein ↔ HP1-H3K9me3 en CBX-H3K27me3; PHD ↔ H3K4me3 (TAF3, ING) | ✅ |
| Eén lysine draagt nooit tegelijk acetyl en methyl | ✅ |

Geen wijzigingen.
Bronnen: https://pubmed.ncbi.nlm.nih.gov/21321607/

### `dnamethyl`
| Claim | Verdict |
|---|---|
| 5mC op C5, vooral in CpG, grote groef, paring met G verandert niet | ✅ (Moore 2013) |
| DNMT3A/B + DNMT3L de novo; DNMT1 + UHRF1 als onderhoud; SAM | ✅ |
| ~70–80 % van de CpG's gemethyleerd in lichaamscellen | ✅ (vaak vermeld, o.a. Petryk et al. NAR 2021) |
| CpG-eilanden "in ~50–70 % van de promoters" | ⚠️ Deaton & Bird: "Approximately 70%"; Saxonov: 72 % HCG-promoters → **aangepast** naar ~60–70 % |
| TET: 5mC → 5hmC → 5fC → 5caC; TDG + BER verwijderen 5fC/5caC; passieve verdunning | ✅ (Tahiliani 2009) |
| MBD/MeCP2 rekruteren HDAC; methylatie kan TF-binding blokkeren | ✅ |
| Time: "patronen blijven levenslang" | ⚠️ te absoluut → "kunnen levenslang blijven" |

Wijzigingen:
- `genome.js`, facts (NL en EN): "~50–70 %" → "~60–70 %". Bron Saxonov 2006 toegevoegd aan `S` en aan de bronnen van deze knoop.
- `dnamethyl.js`, time: "patronen blijven levenslang" → "patronen kunnen levenslang blijven". EN: "patterns can last a lifetime".

Bronnen: https://pubmed.ncbi.nlm.nih.gov/21576262/ (PMC3093116) · https://pubmed.ncbi.nlm.nih.gov/16432200/ · https://academic.oup.com/nar/article/49/6/3020/6029163

### `gen`
| Claim | Verdict |
|---|---|
| "Net geen 20 000" eiwitcoderende genen | ✅ Amaral 2023: "fewer than 20,000" |
| Coderend deel "~1–2 %" | ⚠️ de CDS beslaat ~1,1–1,5 % (≈35 Mb op 3,1 Gb) → **aangepast** naar ~1–1,5 % |
| TATA-box ~−30 in een minderheid van de promoters; vaak in een CpG-eiland | ✅ |
| GT–AG-regel (bijna altijd), vertakkingspunt-A | ✅ |
| ATG / TAA, TAG, TGA; 5'- en 3'-UTR; AATAAA; knip ~10–30 nt verder; Pol II loopt nog even door | ✅ |
| Enhancer-lus via cohesine en Mediator; afstand "10–1000 kb" | ✅ (typisch bereik) |
| Genen van enkele kb tot >1 Mb (DMD, CNTNAP2 ≈ 2,2–2,3 Mb); transcriptie duurt minuten tot uren | ✅ |

Wijzigingen:
- `genome.js`, facts (NL en EN): "~1–2 %" → "~1–1,5 %".
- `gen.js`, stap 1 (NL en EN): idem.

Bronnen: https://pubmed.ncbi.nlm.nih.gov/37794265/

### Labels in `_kernsvg.js` en `_a_kit.js`
✅ Geen fouten: "Polysomen · translatie", "Kernporiecomplex", "Adenovirus-DNA (episomaal)", "nucleoplasma" en "cytoplasma". De histonvolgorde in `nucleo()` (H3 H4 H2B H2A | H2A H2B H4 H3) is een schematische weergave.

---

### Voorstellen voor graph.js / graph.en.js
Er zijn geen inhoudelijke conflicten met de details en de scènes. Twee kleine punten:
- `graph.js` nucleolus, taalfout: "waar RNA-polymerase I het rRNA-voorloper maakt" → "waar RNA-polymerase I de rRNA-voorloper maakt". EN is correct.
- Optioneel (ronde 1 al gemeld), `kern`: "Omgeven door een dubbele kernenvelop met kernporiën. Bevat chromatine en de nucleolus (ribosoomaanmaak)." → "Omgeven door een dubbele kernenvelop (buitenmembraan loopt door in het ER, binnenkant gesteund door de kernlamina) met kernporiën. Bevat chromatine en de nucleolus (ribosoomaanmaak)." EN idem: "…double nuclear envelope (outer membrane continuous with the ER, lined inside by the nuclear lamina)…".

### Status
- **Nagekeken:** kern, nucleolus, chromosoom, chromatine, nucleosoom, histonmod, dnamethyl, gen.
- **Open punten:** geen blokkerende. Kleine kanttekeningen:
  - Het aantal Pol I-moleculen per actieve rDNA-eenheid ("tientallen") is voor de mens in de literatuur niet exact vastgelegd. Het kan oplopen tot ~100; de tekst is niet fout.
  - De naam van de bron `nucleolusRev` geeft geen auteurs. Het gaat om Lam & Trinkle-Mulcahy 2015; die namen kunnen in de titel worden gezet (cosmetisch).

Controles: alle bewerkte .js-bestanden parsen (node new Function). De headless check.html geeft **PROBLEMS (0)** en **72/72/72**.


---

## Genome deel B — dnahelix, dnavormen, noncanon, basenparing, nucleotide, supercoiling

Gecontroleerd: `shared/details/genome2.js` en de scènes `app/scenes/genome/{dnahelix,dnavormen,noncanon,basenparing,nucleotide,supercoiling}.js`, plus `_b_chem.js`, `_b_helix.js` en `_b_pdb.js`. In die laatste drie staan geen zichtbare teksten, maar de Kekulé-structuren in `_b_chem.js` zijn wel nagelopen: de amino/keto-tautomeren, N9 bij purines, N1 bij pyrimidines en de posities van N3/N1 aan de paringsrand. Ze kloppen alle vijf (A, G, C, T, U).
Alle PDB-codes zijn via de RCSB-API nagekeken en alle PubMed-/PMC-verwijzingen via Europe PMC. Na de wijzigingen parsen alle bestanden, en `tools/check.html` (headless Chrome) geeft **PROBLEMS (0)** en **72 · 72 · 72**.
Consistent met ronde 1 (§4, §8): B-DNA 10,0 (vezel) / 10,5 (oplossing), A-DNA "korter en dikker/breder", Z-DNA syn/anti, Hoogsteen in G-kwartetten, K⁺ > Na⁺, C1′–C1′ ≈ 10,5 Å.

### `dnahelix`
| Claim | Verdict |
|---|---|
| Twee antiparallelle strengen, ruggengraat buiten, basen binnen, rechtshandig B-DNA | ✅ |
| Stijging ≈ 3,4 Å (model 3,38 Å), diameter ≈ 20 Å | ✅ |
| ≈ 10,5 bp/winding in oplossing; twist ≈ 34,3° (360/10,5); "34–36°" (36° = vezelmodel) | ✅ |
| 1 winding ≈ 35,7 Å (10,5 × 3,4) | ✅ |
| Grote/kleine groef ≈ 12 / 6 Å breed (11,7 / 5,7 Å) | ✅ |
| Eiwitten lezen de sequentie vooral via de grote groef | ✅ |
| Fosfodiëster C3′ → C5′ | ✅ |
| PDB 1BNA = Dickerson-dodecameer CGCGAATTCGCG, 1981 (Drew et al., PNAS 78:2179) | ✅ (RCSB) |
| Vezelmodel 10 bp/winding werd niet vermeld (vraag uit ronde 1) | ⚠️ → aangevuld |

**Wijziging** in `genome2.js` (facts): `≈ 10,5 (in oplossing)` → `≈ 10,5 (in oplossing; vezelmodel 10)`, en in het EN `(in solution; fibre model 10)`.
Bronnen: https://www.rcsb.org/structure/1BNA ; PMID 6941276 / PMC319307 ; Alberts 4e NBK26821 (titel "The Structure and Function of DNA" bevestigd via E-utilities) ; https://pdb101.rcsb.org/motm/23

### `dnavormen`
| Claim | Verdict |
|---|---|
| B: rechtshandig, 10,5 bp/winding, 3,4 Å, 20 Å, C2′-endo, anti; grote groef breed en diep, kleine groef smal en diep | ✅ |
| A: ≈ 11 bp/winding, twist ≈ 33° (32,7°), ≈ 2,6 Å/bp (in de extra-tekst gehedged: 2,3–2,6), Ø ≈ 23 Å (23–26), C3′-endo, basenparen ≈ 20° gekanteld, holle kern | ✅ |
| A: grote groef smal en diep, kleine groef breed en ondiep | ✅ |
| P–P ≈ 5,9 Å (C3′-endo) tegenover ≈ 7,0 Å (C2′-endo) | ✅ |
| Z: linkshandig, 12 bp/winding, ≈ 3,7 Å/bp, Ø ≈ 18 Å, dinucleotide-eenheid; G syn/C3′-endo, C anti/C2′-endo; ≈ −60° per dinucleotide | ✅ |
| Spoed: A ≈ 28 Å, B ≈ 36 Å, Z ≈ 45 Å | ✅ |
| Z: bij (CG)n, hoog zout of negatieve supercoiling; Zα-domeinen (ADAR1, ZBP1) | ✅ |
| "RNA-duplexen zijn **altijd** A-vorm" | ⚠️ te absoluut → "(vrijwel) altijd" |
| "Z-DNA **ontstaat** tijdelijk achter RNA-polymerase" | ⚠️ hypothese/model → "kan tijdelijk ontstaan … (negatieve supercoiling)" |
| Het how-punt over B-DNA vermeldde het vezelmodel niet | ⚠️ → "in oplossing (klassiek vezelmodel: 10)" |
| Tijdlabel "B ↔ Z/A: ms – s" | ⚠️ de B↔Z-overgang van (CG)n kan in vitro minuten duren → "ms – min" |
| PDB 440D (A, d(AGGGGCCCCT)), 1BNA, 1DCG (Z, d(CGCGCG), 1,0 Å) | ✅ (RCSB) |
| Wang et al. 1979 Nature 282:680 (PMID 514347); Rich & Zhang 2003 Nat Rev Genet 4:566 (PMID 12838348) | ✅ |

**Wijzigingen:**
- In `genome2.js`, how-punt B-DNA: `≈ 10,5 bp/winding,` → `≈ 10,5 bp/winding in oplossing (klassiek vezelmodel: 10),` (EN idem).
- In `genome2.js`, why: `altijd A-vorm` → `(vrijwel) altijd A-vorm`, en `Z-DNA ontstaat tijdelijk achter RNA-polymerase` → `Z-DNA kan tijdelijk ontstaan achter RNA-polymerase (negatieve supercoiling)` (EN idem).
- In `dnavormen.js`, time: `ms – s` → `ms – min` (NL en EN).

### `noncanon`
| Claim | Verdict |
|---|---|
| G-kwartet: 8 Hoogsteen-H-bruggen, N1–H···O6 en N2–H···N7 | ✅ |
| K⁺ tussen twee kwartetten, 8 × O6; Na⁺ kleiner, kan ook in het vlak zitten | ✅ |
| Afstand tussen gestapelde kwartetten ≈ 3,3 Å | ✅ |
| 1KF1 = parallelle propeller, K⁺, kristal (Parkinson 2002, Nature 417:876) | ✅ (RCSB) |
| 143D = antiparallelle mand, Na⁺, NMR (Wang & Patel 1993) | ✅ (RCSB) |
| Hybride (3+1) overheerst in K⁺-oplossing (vermeld in "simplified") | ✅ |
| 1D3X = intramoleculaire triplex (NMR, 1998; strengen verbonden via hexa-ethyleenglycol-linkers) | ✅ (klopt; het is een modeltriplex, geen natuurlijk H-DNA) |
| Triplex: Hoogsteen in de grote groef; T·A–T, C⁺·G–C (N3 geprotoneerd, zuurder milieu) | ✅ |
| H-DNA (H-y-vorm): de helft van de pyrimidinestreng vouwt terug, de complementaire purinestreng blijft enkelstrengig; spiegelherhaling getoond (AGGAGAAG\|GAAGAGGA, klopt als spiegel) | ✅ |
| Kruisvorm bij omgekeerde herhaling, vierwegsknooppunt, aangedreven door negatieve supercoiling | ✅ |
| i-motief: hemi-geprotoneerde C·C⁺ (3 H-bruggen, extra H⁺ op N3), stabiel bij licht zure pH | ✅ |
| Telomeer TTAGGG, ≈ 5–15 kb dubbelstrengig, 3′-overhang ≈ 50–300 nt; MYC-promoter-G4 | ✅ |
| Bron "Mirkin (2024)" | ❌ onvolledige auteurslijst: Hisey JA, Masnovo C, Mirkin SM (PMID 39723156) |
| Varshney 2020 (PMC7115845), Zeraati 2018 (PMID 29686376), Parkinson 2002 (PMID 12050675) | ✅ |

**Wijziging** in `genome2.js`, sources: `Mirkin (2024)` → `Hisey, Masnovo & Mirkin (2024)`.
Bronnen: https://www.rcsb.org/structure/1KF1 , /143D , /1D3X ; https://pubmed.ncbi.nlm.nih.gov/39723156/

### `basenparing`
| Claim | Verdict |
|---|---|
| A–T: N6–H···O4, N1···H–N3; G–C: O6···H–N4, N1–H···N3, N2–H···O2 | ✅ |
| C1′–C1′ ≈ 10,5 Å voor beide; glycosidische bindingen aan de kant van de kleine groef | ✅ |
| H-bruggen ≈ 2,8–3,0 Å (label 2,9 Å) | ✅ |
| Purine–purine te breed, pyrimidine–pyrimidine te smal | ✅ |
| Chargaff A = T, G = C, A+G = T+C; mens ≈ 41 % GC → 29,5 / 20,5 % | ✅ (IHGSC 2001) |
| Stapeling draagt meer bij dan H-bruggen (Yakovchuk 2006) | ✅ |
| "G–C 3 H-bruggen. **Daarom** smelt GC-rijk DNA hoger" | ⚠️ spreekt de stapelstap tegen: volgens Yakovchuk 2006 komt de GC-afhankelijkheid vooral van stapeling → aangepast |
| Hoogsteen: purine 180° naar syn, N7/N6-rand, C1′–C1′ ≈ 8,5 Å | ✅ (Nikolova 2011) |
| Wobble G·U: 2 H-bruggen, U naar de grote groef (G naar de kleine groef), één tRNA leest meerdere codons | ✅ |
| Tijdlabel "H-bruggen vormen en breken in pico- tot nanoseconden" | ⚠️ misleidend voor basenparen: de levensduur van een basenpaar is ≈ ms, paren openen één voor één (Leroy et al. 1988) → aangepast |

**Wijzigingen:**
- In `basenparing.js`, stap 2: `Daarom smelt GC-rijk DNA bij een hogere temperatuur.` → `GC-rijk DNA smelt bij een hogere temperatuur, vooral door de sterkere stapeling van GC-paren (niet enkel de derde H-brug).` (EN idem).
- In `basenparing.js`, time: → `basenparen openen spontaan, één voor één: levensduur ≈ ms` / `base pairs open spontaneously, one at a time: lifetime ≈ ms`.
- In `genome2.js`, sources: bron toegevoegd, Leroy et al. 1988, J Mol Biol 200:223 (PMID 2836594).

Bronnen: PMC1360284, PMC3074620, PMID 5969078, PMID 11237011, PMID 2836594.

### `nucleotide`
| Claim | Verdict |
|---|---|
| Base + pentose + fosfaat; nucleoside = zonder fosfaat | ✅ |
| Priemnummering 1′–5′; DNA 2′-H, RNA 2′-OH (reactiever) | ✅ |
| β-N-glycosidisch aan C1′: N9 bij purines, N1 bij pyrimidines; β = aan de kant van C5′ | ✅ |
| dAMP/dADP/dATP; dNTP's zijn het substraat van DNA-polymerase | ✅ |
| Fosfodiëster C3′–O–P–O–C5′; 5′-uiteinde (fosfaat), 3′-uiteinde (OH); pCpG-OH | ✅ |
| C2′-endo (South) bij B; C3′-endo (North) bij A/RNA; "endo" = aan de kant van C5′ | ✅ |
| χ = O4′–C1′–N9–C4 (purine) / O4′–C1′–N1–C2 (pyrimidine); anti standaard, syn bij G in Z-DNA en in Hoogsteen-paren | ✅ |
| Purines zes- + vijfring, pyrimidines één zesring, T = 5-methyluracil | ✅ |
| Naamgeving: (deoxy)adenosine, -guanosine, -cytidine, thymidine | ✅ |
| Bronnen: Alberts NBK26883 (dit hoofdstuk bevat inderdaad "Panel 2-6. A Survey of the Nucleotides"), PDB-101 Paper Models DNA (URL werkt) | ✅ |

Geen wijzigingen.

### `supercoiling`
| Claim | Verdict |
|---|---|
| Lk is een geheel getal en verandert enkel door een strengbreuk; Lk = Tw + Wr | ✅ |
| Lk₀ = N/10,5; 126 bp → Lk₀ = 12; ≈ 43 nm | ✅ |
| ΔLk = −2 → Lk = 10 = Tw 12 + Wr (−2); σ = −2/12 ≈ −0,17 | ✅ |
| "onderwonden: **12** bp per winding i.p.v. 10,5" | ❌ als Lk = 10 volledig als twist wordt opgenomen, is dat 126/10 = **12,6** bp/winding → gecorrigeerd |
| σ in cellen ≈ −0,06; bij de mens grotendeels vastgelegd in nucleosomen (ΔLk ≈ −1 per nucleosoom, linkshandige toroïdale wikkeling) | ✅ |
| Twin-domain-model (Liu & Wang 1987, PNAS 84:7024): + vóór, − achter | ✅ (PMC299221) |
| TOP1 type IB: knipt één streng, covalente Tyr-binding, gecontroleerde rotatie, geen ATP, relaxeert + en −; "ΔLk = 1 per doorgang" strikt voor type IA (staat al in "simplified") | ✅ |
| TOP2: G-/T-segment, ATP, ΔLk = ±2, ontwart dochterchromatiden | ✅ |
| Camptothecine (irinotecan, topotecan) → TOP1; etoposide, doxorubicine → TOP2 | ✅ |
| Geen gyrase genoemd (correct voor een menselijke cel) | ✅ |
| PDB 1A36 = humaan TOP1–DNA (Redinbo 1998 Science) | ✅ (RCSB) |
| PDB 1ZXM als "TOP2" | ⚠️ is enkel het **ATPase-domein** van humaan TOP2A met AMP-PNP (Wei 2005 JBC) → verduidelijkt en 3QX3 (humaan TOP2B–DNA–etoposide, Wu 2011) toegevoegd |
| Pommier 2016 (PMC9248348), Champoux 2001 (PMID 11395412), Alberts NBK26850 (bevat "DNA Topoisomerases Prevent DNA Tangling During Replication") | ✅ |

**Wijzigingen** in `supercoiling.js`:
- Label: `12 bp per winding` → `≈ 12,6 bp per winding` / `≈ 12.6 bp per turn`.
- Simplified: `TOP2 PDB 1ZXM` → `TOP2A-ATPase-domein PDB 1ZXM, TOP2B–DNA–etoposide PDB 3QX3` (EN: `TOP2A ATPase domain … TOP2B–DNA–etoposide PDB 3QX3`).

Bronnen: https://www.rcsb.org/structure/1A36 , /1ZXM , /3QX3 ; PMC299221.

### Voorstellen voor graph.js / graph.en.js
1. **noncanon** (consistentie met ronde 1 §4 en de uitlegtekst):
   - NL vóór: `…(gestapelde G-kwartetten, gestabiliseerd door K⁺); daarnaast triplex-DNA (H-DNA) en kruisvormen bij palindromen.`
   - NL na: `…(gestapelde G-kwartetten met Hoogsteen-H-bruggen, gestabiliseerd door een centraal kation, K⁺ > Na⁺); daarnaast triplex-DNA (H-DNA), kruisvormen bij palindromen en i-motieven in C-rijke strengen.`
   - EN vóór: `…(stacked G-quartets stabilised by K⁺); in addition triplex DNA (H-DNA) and cruciforms at palindromes.`
   - EN na: `…(stacked G-quartets with Hoogsteen H-bonds, stabilised by a central cation, K⁺ > Na⁺); in addition triplex DNA (H-DNA), cruciforms at palindromes and i-motifs in C-rich strands.`
   - Optioneel: `pdb: ['143D', '1KF1']` → `pdb: ['143D', '1KF1', '1D3X']` (triplex, al genoemd in de scène).
2. **dnavormen**, klein NL/EN-verschil: NL "korter en dikker" tegenover EN "shorter and wider". Beide zijn correct, maar voor exacte gelijkheid EN `shorter and wider` → `shorter and thicker (wider)`. (De uitlegtekst en de scène gebruiken "korter en breder / shorter and wider"; inhoudelijk geen conflict.)
3. **supercoiling**: `Replicatie en transcriptie veroorzaken positieve supercoils vóór de machine.` Dat klopt; eventueel aanvullen met `… en negatieve erachter (twin-domain-model).` / `… and negative ones behind (twin-domain model).`
4. **dnahelix, basenparing, nucleotide**: geen conflicten.

### Status
- **Nagekeken:** `dnahelix`, `dnavormen`, `noncanon`, `basenparing`, `nucleotide`, `supercoiling`.
- **Open punten** (geen fouten, enkel om te overwegen):
  - noncanon: de graafsamenvatting mist Hoogsteen en K⁺ > Na⁺ (voorstel 1, voor de coördinator).
  - supercoiling: voor de 3D-atlas is 1ZXM (enkel het ATPase-domein) geen goed "TOP2"-voorbeeld. Als de atlas die code gebruikt, is **3QX3** (TOP2B–DNA–etoposide) of **4FM9** (TOP2A–DNA) beter. Beide zijn via RCSB nagekeken.


---

## Stage `repl` — replicatie, replisoom, ssdna, telomeren, herstel, mutaties

Nagekeken: `shared/details/repl.js` en `app/scenes/repl/{replicatie,replisoom,ssdna,telomeren,herstel,mutaties}.js` (titels, stapteksten, simplified, extra, time/scale, legendes, labels op het scherm). In `_draw.js` staan geen vaste tekstlabels, alleen tekenhulpfuncties. Na elke bewerking parset elk bestand. `tools/check.html` geeft **PROBLEMS (0)** en nodes/scenes/details **72/72/72**.

Legenda: ✅ klopt · ⚠️ nuance/hedge · ❌ fout (gecorrigeerd)

Alle 7 PDB-codes zijn gecontroleerd via de RCSB-API:

| PDB | RCSB-titel / organisme / methode | Beschrijving in de app | Verdict |
|---|---|---|---|
| 6XTX | CryoEM structure of **human** CMG bound to ATPγS and DNA; EM 3,29 Å (Rzechorzek 2020 NAR) | "humaan CMG" | ✅ |
| 1AXC | Human PCNA; X-ray 2,6 Å (Gulbis 1996 Cell) | "humaan PCNA" | ✅ |
| 1JMC | ssDNA-binding domain of **human** RPA bound to ssDNA, RPA70 res. 183–420; dC8; X-ray **2,4 Å** (Bochkarev 1997 Nature) | "humaan RPA70 + dC8, 2,4 Å" | ✅ (codecommentaar noemt 181–422; enkel commentaar/selectie, geen weergegeven tekst) |
| 7BG9 | Catalytic core lobe of **human** telomerase with telomeric DNA substrate; EM 3,8 Å (Ghanim 2021 Nature) | "humaan telomerase" / "catalytic core of human telomerase" | ✅ |
| 143D | NMR, humane telomeerrepeat d(AG3[T2AG3]3) G-quadruplex (Wang & Patel 1993) | G-quadruplex | ✅ |
| 1KF1 | Structure and packing of human telomeric DNA; X-ray 2,1 Å (Parkinson 2002 Nature) | G-quadruplex | ✅ |
| 1JEY | Crystal structure of the Ku heterodimer bound to DNA; X-ray 2,5 Å (Walker 2001 Nature) | "Ku70/80 op DNA" | ✅ |

De bronnen zijn gecontroleerd via Europe PMC. Alle PMC-ID's en PubMed-ID's in `repl.js` verwijzen naar het juiste artikel: PMC5597965 Burgers & Kunkel 2017, PMC3552508 Balakrishnan & Bambara 2013, PMC5474181 Chatterjee & Walker 2017, PMC528642 Meselson & Stahl 1958, PMC6622447 Marks/Fu/Aladjem 2017, PMC3628614 Kunkel 2009, PMC8210275 Dueva & Iliakis 2020, PMC2819049 de Lange 2009, PMC7610991 Ghanim 2021, PMC6223129 Nguyen 2018, PMC133982 Reardon & Sancar 2002, PMC4760306 Kurosaki & Maquat 2016, PMID 8990123 Bochkarev 1997, PMID 2185829 Frederico 1990. BioNumbers 111770 werkt ook (Méchali 2010: mens 2–3 kb/min, E. coli 60 kb/min).

---

### `replicatie`

| Claim | Verdict | Toelichting / bron |
|---|---|---|
| Semi-conservatief; Meselson & Stahl 1958, ¹⁵N/¹⁴N, CsCl; gen. 1 alleen hybride, gen. 2 hybride + licht | ✅ | PMC528642. De banden in de animatie liggen goed: zwaar onderaan, licht bovenaan |
| Proef gedaan met E. coli, principe universeel | ✅ | |
| G1-licentie: ORC + Cdc6 + Cdt1 laden MCM2-7 als inactief dubbelhexameer rond dsDNA | ✅ | Burgers & Kunkel 2017 |
| S-fase: DDK + CDK → Cdc45 + GINS → 2 CMG's; die schuiven langs elkaar en lopen uit elkaar | ✅ | |
| CMG loopt 3'→5' over de leidende-streng-matrijs | ✅ | Ook de geometrie in de animatie klopt: CMG zit bij beide vorken op de leidende-streng-matrijs, en leidend/Okazaki staan per kwadrant juist |
| Bidirectioneel, 2 vorken per origin; vroege en late origins; reserve-origins | ✅ | Marks et al. 2017 |
| Terminatie: vorken ontmoeten elkaar, CMG wordt verwijderd | ✅ | |
| Nucleosomen herstellen achter de vork; cohesine | ✅ | |
| Vorksnelheid ≈ 1–3 kb/min (mens) | ✅ | BioNumbers 111770: 2–3 kb/min; DNA-vezelassays geven meestal ~1–2 kb/min. Het bereik dekt beide |
| S-fase "enkele uren" | ✅ | (≈ 6–8 h) |
| "origins gemiddeld tientallen kb uit elkaar" | ⚠️→ aangepast | Alberts (MBoC, NBK26826): 30 000–300 000 bp |
| "Het proef van Meselson & Stahl" | ❌ taalfout | "de proef" |
| "Sld/Treslin" weggelaten firingfactoren | ⚠️→ aangepast | De menselijke namen zijn TopBP1 (Dpb11), Treslin–MTBP (Sld3–Sld7) en RecQL4 (Sld2) |
| Licentie (G1) en vuren (S) gescheiden → één keer per celcyclus; genoominstabiliteit bij kanker | ✅ | |

**Wijzigingen** (`app/scenes/repl/replicatie.js`, `simplified`):
- NL "origins liggen in menselijke cellen gemiddeld tientallen kb uit elkaar" → "… ruwweg 30–300 kb uit elkaar". EN "on average tens of kb apart" → "roughly 30–300 kb apart".
- NL "Het proef van Meselson & Stahl" → "De proef van Meselson & Stahl".
- NL/EN "(o.a. Sld/Treslin, Mcm10 en Pol ε weggelaten)" → "(o.a. TopBP1, Treslin–MTBP, RecQL4, Mcm10 en Pol ε weggelaten)", en idem in het Engels.

### `replisoom`

| Claim | Verdict | Toelichting / bron |
|---|---|---|
| CMG = Cdc45–MCM2-7–GINS, omsluit de leidende-streng-matrijs, 3'→5' | ✅ | Burgers & Kunkel 2017; 6XTX |
| Topo I/II halen positieve supercoils vóór de vork weg (I knipt 1 streng, II beide) | ✅ | |
| RPA bedekt ssDNA van de volgende-streng-matrijs; RPA = RPA70/32/14 | ✅ | |
| Primer ≈ 10 nt RNA (primase) + ≈ 20 nt DNA (Pol α) | ✅ | Burgers & Kunkel: RNA-primer "limit[ed] … to ~10 nt"; DNA-deel ~20–30 nt |
| RFC laadt PCNA (ring) op het primer-3'-uiteinde; wissel van Pol α naar Pol δ | ✅ | |
| Pol ε leidende streng (gebonden aan CMG); Pol δ volgende streng | ✅ | De nuance "vooral" staat er terecht bij |
| "Pol ε, gebonden aan CMG **en PCNA**" (steptekst) | ⚠️ | Pol ε wordt vooral door CMG vastgehouden; zijn interactie met PCNA is zwakker. Niet aangepast (de animatie tekent PCNA op de leidende streng) |
| Strengverdringing door Pol δ → flap; FEN1 knipt; nick-translatie; Lig1 sluit; RNase H2 | ✅ | Burgers & Kunkel (nick-translatie, Dna2 voor lange flaps) |
| Proeflezen 3'→5'-exo in Pol δ/ε; verbetert ≈ 10–100× | ✅ | Kunkel 2009: "proofreading improves replication fidelity by about 10- to 100-fold" |
| Basenselectie alleen ≈ 1 fout per 10⁴ (Pol α) | ✅ | Kunkel 2009 |
| Okazaki-fragment "≈ 200 nt (eukaryoten) vs ≈ 1200 nt (bacteriën)" | ⚠️→ aangepast | Bij eukaryoten ≈ 150–200 nt (ongeveer de grootte van een nucleosoom); bij bacteriën 1–2 kb. Het getal "1200" was te specifiek |
| Weergegeven structuren 6XTX (humaan CMG), 1AXC (humaan PCNA) | ✅ | RCSB |
| Kankermutaties in POLE; topo-isomeraseremmers | ✅ | |

**Wijziging** (`shared/details/repl.js`, facts): NL "≈ 200 nt (eukaryoten) vs ≈ 1200 nt (bacteriën)" → "≈ 150–200 nt (eukaryoten) vs ≈ 1–2 kb (bacteriën)". Het Engels is op dezelfde manier aangepast.

### `ssdna`

| Claim | Verdict | Toelichting / bron |
|---|---|---|
| ssDNA ontstaat tijdelijk bij replicatie, herstel en recombinatie; RPA bij eukaryoten, SSB bij bacteriën | ✅ | |
| RPA-heterotrimeer RPA70–RPA32–RPA14 met OB-folds; DBD-A en DBD-B binden het sterkst | ✅ | Bochkarev 1997; Dueva & Iliakis 2020 |
| Phe238, Phe269 (DBD-A), Trp361, Phe386 (DBD-B) stapelen op de basen | ✅ | Bochkarev 1997 |
| OB-fold = β-vat van 5 strengen | ✅ | |
| DBD-A + DBD-B ≈ 8 nt (1JMC, dC8) | ✅ | RCSB 1JMC |
| Volledig trimeer ≈ 30 nt | ✅ | Dueva & Iliakis: "RPA binding to ssDNA of around 30 nt" |
| Cytosinedeaminatie ≈ 140× sneller in ssDNA | ✅ | Frederico 1990: 1×10⁻¹⁰ s⁻¹ vs ≈7×10⁻¹³ s⁻¹, "approximately 140-fold" |
| RPA verhindert haarspelden/G4 en beschermt tegen nucleasen; schuift dynamisch | ✅ | Dueva & Iliakis (glijdende diffusie smelt haarspelden) |
| RPA-ssDNA rekruteert ATR–ATRIP; overdracht aan Pol α-primase, NER, RAD51 | ✅ | |
| time: "RPA bindt in milliseconden" | ⚠️ | Associatie is zeer snel en individuele DBD's wisselen op ms-schaal; het trimeer als geheel zit juist erg stabiel. Aanvaardbaar, niet aangepast |

Geen wijzigingen.

### `telomeren`

| Claim | Verdict | Toelichting / bron |
|---|---|---|
| TTAGGG (gewervelden); humane telomeren duizenden bp; 3'-G-overhang van tientallen tot honderden nt | ✅ | de Lange 2009 (≈5–15 kb; overhang ~50–300 nt) |
| Eindreplicatieprobleem: de laatste primer op de volgende streng valt weg, geen 3'-OH; nucleasen dragen ook bij | ✅ | Geometrie klopt: de G-rijke streng is de matrijs voor de volgende streng aan het uiteinde |
| Verkorting → DNA-schaderespons → senescentie | ✅ | |
| Telomerase = TERT + hTR (**451 nt**) | ✅ | Ghanim 2021 / Nguyen 2018 (tabel: hTR 451) |
| Matrijs 11 nt, geschreven als **3'-CAAUCCCAAUC-5'** (= 5'-CUAACCCUAAC-3', nt 46–56) | ✅ | Let op: de opdracht noemt "3'-CUAACCCUAAC-5'". Die oriëntatie is omgekeerd. De app heeft het juist |
| 5 nt aligneren met …GTTAG-3'; toevoeging van GGTTAG; translocatie 6 nt | ✅ | Zelf nagerekend (C46–C51 → GGTTAG; C52–C56 paren met GTTAG). Ghanim 2021: "alignment region … 6 consecutive nucleotide additions" |
| CST + Pol α-primase vullen de C-streng aan | ✅ | |
| Shelterin = 6 eiwitten (TRF1, TRF2, POT1, TIN2, TPP1, RAP1); TRF1/2 op dsDNA, POT1 op ss-overhang; blokkeert ATM/ATR en NHEJ | ✅ | de Lange 2009 |
| T-lus met D-lus, met hulp van TRF2 | ✅ | de Lange 2009 |
| Telomerase actief in kiemcellen, stamcellen en de meeste kankercellen (≈85–90 %) | ✅ | |
| Dyskeratosis congenita; dyskerine en TCAB1 horen bij het holoenzym | ✅ | Nguyen 2018 |
| G-quadruplexen aan telomeren in cellen: nog onderzocht | ✅ | Voorzichtig geformuleerd |
| Hayflick-limiet, Nobelprijs 2009, telomeerlengte als getal | — | Niet vermeld in de app, dus niets te controleren |

Geen wijzigingen.

### `herstel`

| Claim | Verdict | Toelichting / bron |
|---|---|---|
| ≈ 10 000 abasische plaatsen per menselijke cel per dag | ✅ | Chatterjee & Walker 2017: "about 10,000 abasic sites are created per day" |
| BER: glycosylase (UNG) → AP-plaats → APE1 knipt 5' → Pol β (1 nt + dRP-lyase) → Lig III–XRCC1 (of Lig I) | ✅ | |
| C→U door deaminatie; U paart met A → mutatie | ✅ | |
| NER: XPC–RAD23B (GG) / RNA-pol II + CSB (TC); TFIIH, XPA, RPA; XPF–ERCC1 knipt 5', XPG 3'; excisie 24–32 nt; Pol δ/ε/κ + PCNA | ✅ | Reardon & Sancar 2002 |
| MMR: MutSα MSH2–MSH6, MutLα MLH1–PMS2 knipt de nieuwe streng (via onderbrekingen/PCNA), EXO1, Pol δ, Lig I; >100× nauwkeuriger | ✅ | Kunkel 2009 (MMR ~10²–10³) |
| NHEJ: Ku70/80, DNA-PKcs, Artemis, XRCC4–Lig IV–XLF; in elke fase, foutgevoelig | ✅ | 1JEY humaan Ku |
| HR: MRN–CtIP, EXO1/DNA2 (resectie); RPA → RAD51 (via BRCA2); invasie van de zuster (D-lus); SDSA; S/G2 | ✅ | |
| HR "foutloos" | ⚠️→ aangepast | HR is zeer nauwkeurig, maar de DNA-synthese erin is licht mutageen. Daarom nu "(vrijwel) foutloos" |
| XP (NER), Lynch (MLH1, MSH2, MSH6, PMS2), BRCA1/2 (HR); cisplatine, bestraling, PARP-remmers | ✅ | |

**Wijzigingen:**
- `shared/details/repl.js`, stap HR: "foutloos herstel" → "(vrijwel) foutloos herstel". EN "error-free repair" → "(essentially) error-free repair".
- `shared/details/repl.js`, fact HR: "S/G2, zusterchromatide als matrijs" → "…, (vrijwel) foutloos". Het Engels is op dezelfde manier aangepast.
- `app/scenes/repl/herstel.js`, steptekst HR: "Foutloos, maar alleen in S/G2." → "Vrijwel foutloos, maar alleen in S/G2." EN "Error-free" → "Essentially error-free". Het korte label "foutloos hersteld" in de animatie is ongewijzigd gelaten.

### `mutaties`

| Claim | Verdict | Toelichting / bron |
|---|---|---|
| Transitie/transversie-definities; 4 transities en 8 transversies (gerichte substituties) | ✅ | |
| HBB-CDS (ENST00000335295): de eerste 23 codons vertalen naar MVHLTPEEKSAVTALWGKVNVDE | ✅ | Zelf vertaald. Lys17 en Glu6 kloppen met de traditionele nummering |
| Stil: codon 2 CAT→CAC (His), gemarkeerd als fictief | ✅ | |
| HbS: codon 6 GAG→GTG, Glu6Val; HGVS p.Glu7Val (c.20A>T) | ✅ | |
| Nonsense: codon 17 AAG→TAG (β⁰-thal); exon 1; β-keten 146 aa | ✅ | HbVar |
| Frameshift codons 8/9 +G (c.27_28insG, p.Ser10Valfs*14) | ✅ | Zelf nagerekend: het nieuwe kader Val-Cys-Arg-Tyr-Cys-Pro-Val-Gly-Gln-Gly-Glu-Arg-Gly-TGA eindigt op fs*14, bij traditioneel codon 22 |
| NMD-regel "> ~50–55 nt vóór **een** exon-exonovergang" | ⚠️→ aangepast | De standaardformulering is "vóór de **laatste** exon-exonovergang" (Kurosaki & Maquat 2016). Dat past ook bij het label in de scène |
| "CpG-transities ≈ 1/3 van de puntmutaties bij erfelijke ziekten" | ⚠️→ aangepast | Cooper & Youssoufian 1988: 35 % van de ziekteveroorzakende puntmutaties **in coderende gebieden** |
| "NMD onderdrukt ≈ 1/3 van de ziekteveroorzakende mRNA's" | ❌ → herschreven | Niet te vinden in de opgegeven bron (Kurosaki & Maquat). Het gaat eigenlijk om de klassieke schatting dat ≈ 1/3 van de ziektemutaties een vroeg stopcodon geeft. Mort 2008: nonsense alleen ≈ 11 % van alle beschreven ziektelaesies |
| Oorzaken: replicatiefouten, deaminatie van 5-mC → T in CpG, UV, straling | ✅ | |
| Ts/Tv-ratio, kiembaanmutatiesnelheid, CFTR ΔF508 | — | Niet vermeld in de app |

**Wijzigingen:**
- `shared/details/repl.js`, stap NMD: "vóór een exon-exonovergang" → "vóór de laatste exon-exonovergang". EN "upstream of an exon–exon junction" → "upstream of the last exon–exon junction".
- `shared/details/repl.js`, facts:
  - "NMD-regel": zelfde aanpassing als hierboven.
  - "CpG-transities": "≈ 1/3 van de puntmutaties bij erfelijke ziekten" → "≈ 1/3 van de ziekteveroorzakende puntmutaties in coderende sequenties".
  - ['NMD', 'onderdrukt ≈ 1/3 van de ziekteveroorzakende mRNA\'s'] → ['Vroege stopcodons', 'nonsense ≈ 11 % van de erfelijke ziektemutaties; met frameshifts e.d. vaak geschat op ≈ 1/3 (NMD-doelwitten)'].
  - Het Engels is op dezelfde manier aangepast.
- `shared/details/repl.js`, bronnen: twee toegevoegd:
  - Cooper & Youssoufian 1988 (https://pubmed.ncbi.nlm.nih.gov/3338800/)
  - Mort et al. 2008 (https://pubmed.ncbi.nlm.nih.gov/18454449/)
- `app/scenes/repl/mutaties.js`, steptekst NMD: "vóór een exon-exonovergang" → "vóór de laatste exon-exonovergang". Het Engels is op dezelfde manier aangepast.

**Visuele kleinigheid (niet aangepast):** bij de frameshiftstap staat het label "vroeg stopcodon" op `cx(21)`, maar het stopcodon zelf (TGA) valt op positie 22. Het label staat dus één codon links van de stop. Dat is een lay-outkwestie; eventueel `cx(22)` gebruiken.

---

### Voorstellen voor graph.js / graph.en.js

1. `replisoom`. De actieve helicase is CMG en niet MCM2-7 alleen. Primase hoort in eukaryoten bij Pol α.
   - graph.js: `'Helicase (MCM2-7 bij eukaryoten), primase, DNA-polymerasen (ε voornamelijk leidende, δ volgende streng), glijklem PCNA, RPA, ligase. …'` → `'Helicase CMG (Cdc45–MCM2-7–GINS), Pol α-primase, DNA-polymerasen (ε voornamelijk leidende, δ volgende streng), glijklem PCNA, RPA, ligase. …'`
   - graph.en.js: `'Helicase (MCM2-7 in eukaryotes), primase, DNA polymerases …'` → `'CMG helicase (Cdc45–MCM2-7–GINS), Pol α-primase, DNA polymerases …'`
2. Bij `replicatie`, `ssdna`, `telomeren`, `herstel` en `mutaties` zijn er geen conflicten met de teksten.

### Status

- **Nagekeken:** `replicatie`, `replisoom`, `ssdna`, `telomeren`, `herstel`, `mutaties`.
- **Kleine open punten (geen fouten):**
  - `replisoom`: "Pol ε gebonden aan CMG en PCNA" zou genuanceerd kunnen worden.
  - `ssdna`: de time-regel "bindt in milliseconden" is vereenvoudigd.
  - `mutaties`: het label "vroeg stopcodon" staat één codon naast de stop (visueel).
  - `replisoom`: voorstel voor graph.js/graph.en.js (zie hierboven).


---

