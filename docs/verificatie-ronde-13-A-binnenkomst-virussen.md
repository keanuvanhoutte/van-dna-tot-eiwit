# Verificatie ronde 13 — pakket A: binnenkomst & virussen (14-11-2026)

**Bereik.** Alle zichtbare uitspraken (NL én EN) van de knopen `cel`, `virus`, `adeno`, `lnp`, `endocytose`,
`baltimore`, `rt`, `integratie`, `kernimport` (`shared/details/entry.js`) en `sleutel`, `viruskopie`, `schaar`,
`assemblage`, `faag`, `crispr` (`shared/details/virus2.js`), plus de scènes in `app/scenes/entry/` (inclusief
`_bits.js`, `_corona.js`, `_celsvg.js`) en `app/scenes/bact/faag.js` + `app/scenes/bact/crispr.js`. Daarnaast
gelezen (niet gewijzigd): de knoopsamenvattingen in `shared/graph.js` / `shared/graph.en.js` en de stapnamen in
`shared/steptags.js`. Ongeveer 430 losse uitspraken nagekeken.

**Methode.** Bronnen zelf gelezen: PubMed-samenvattingen (efetch), volledige teksten via PMC/Europe PMC
(BioC-JSON en fullTextXML), en metadata van structuren via de RCSB-API
(`data.rcsb.org/rest/v1/core/entry/<ID>`). Het raakvlak in 6M0J is zelf nagemeten: het volledige PDB-bestand
opgehaald bij RCSB en alle zware atomen van keten A en keten E op ≤ 4 Å vergeleken met een eigen script.
De eerdere verslagen (`docs/verificatie-ronde-*.md`) zijn pas na deze eigen controle bekeken.

*Noot:* tijdens deze ronde zijn in `shared/details/entry.js` ook door een andere hand wijzigingen gemaakt
(o.a. in `cel`, `virus`, `adeno`, `lnp` en `endocytose`). Die zijn nagekeken, blijken inhoudelijk juist
(de nieuwe formulering "≈ 3 000 (in HeLa gemeten: 3 376 ± 1 304)" komt exact overeen met wat ik zelf bij Ori
et al. 2013 terugvond) en zijn ongemoeid gelaten; mijn eigen verbeteringen staan er los naast.

---

## cel
- ✅ Celdiameter 10–30 µm, kern 5–10 µm, ≈ 2 m DNA per cel — Milo & Phillips, *Cell Biology by the Numbers*.
- ✅ "Kernporiën per kern ≈ 3 000 (HeLa); band 2 000–5 000": Ori et al. (Mol Syst Biol 2013, PMC3619942) meten
  **3 376 ± 1 304 NPC per kern**; de band in de app valt daar netjes binnen.
- ✅ Haploïd genoom ≈ 3,0–3,1 miljard bp (T2T-CHM13) en mitochondriaal genoom 16 569 bp.
- ✅ Schaalreeks in `why` (20 µm → 120 nm → 25 nm → 0,34 nm) klopt met de rest van de app.

## virus
- ✅ Virusdeeltje ≈ 20–300 nm; adenovirus ≈ 90 nm; HIV-1 ≈ 100–120 nm (ViralZone, Alberts).
- ✅ "Alleen omhulde virussen kunnen fuseren" — correct geformuleerd (fusie vereist een envelop).
- 🔧 Scène `virus.js`, stap 4: "Zo komt HIV-1 binnen" → "Zo **kan** HIV-1 binnenkomen" (EN: "This is one way
  HIV-1 can get in"). Reden: directe fusie aan het plasmamembraan is het klassieke model, maar binnenkomst na
  endocytose is voor HIV-1 beschreven; de stelligheid was niet gedekt.

## adeno
- ✅ Capside ≈ 90 nm, 240 hexonen + 12 pentonbasissen, lineair dsDNA ≈ 36 kb met proteïne VII — Kremer &
  Nemerow (PLoS Pathog 2015), PDB-101.
- ✅ Vezelknop ↔ CAR, penton-RGD ↔ αvβ3/αvβ5 → klathrine-endocytose; proteïne VI breekt het endosoom open.
- ✅ "Kinesine-1: zware keten Kif5C via Nup358, lichte keten op het capside" — exact wat Strunze et al.
  (Cell Host Microbe 2011, PMID 21925109) melden: het capside bindt Nup214 én kinesine-lichte keten Klc1/2,
  en Nup358 (gebonden aan Nup214/Nup88) bindt de zware keten Kif5C.
- ✅ Docking hexon ↔ Nup214 (Cassany 2015); histon H1 nodig (Trotman 2001); genoom blijft episomaal; Pol II
  leest de eiwitgenen, Pol III de VA-RNA's.
- ✅ Scènetekst: "20 vlakken" en "12 hoeken met een vezel" — klopt voor een icosaëder.

## lnp
- ✅ Deeltje ≈ 80–100 nm; vier lipidensoorten; ioniseerbaar lipide met schijnbare pKa ≈ 6–6,7.
- ✅ "Endosomale ontsnapping, orde van enkele procenten (1–2 % gemeten met siRNA-LNP's)" — Gilleron et al.
  (Nat Biotechnol 2013, PMID 23792630) schrijven letterlijk "low efficiency (1-2%)".
- ✅ Endosoom-pH 7,4 → 6,5 → 5,5; mRNA komt niet in de kern, geen reverse transcriptase, geen integratie.
- 🔧 Feit "Modificatie: alle uridines vervangen door m1Ψ" → "**in de covid-mRNA-vaccins**: alle uridines …".
  Reden: dit geldt voor BNT162b2/mRNA-1273, niet voor élk mRNA-vaccin (er bestaan ongemodificeerde vaccins).

## endocytose
- ✅ Klathrine-blaasje ≈ 100 nm; vroeg endosoom pH ≈ 6,5, laat ≈ 5,5, lysosoom ≈ 4,5; v-ATPase; dynamine met
  GTP-hydrolyse (Alberts, Hu et al. 2015).
- ✅ "Het adenovirus wacht niet op het zuur": Luisoni et al. (Cell Host Microbe 2015, PMID 26159720) beschrijven
  dat proteïne VI door **mechanische** prikkels bij de receptorbinding wordt blootgelegd en het membraan
  openbreekt; Wiethoff et al. 2005 tonen de membraanlyse door proteïne VI. De `simplified`-tekst vermeldt
  correct dat het virus in werkelijkheid al uit het vroege endosoom ontsnapt.

## baltimore
- ✅ Zeven klassen, voorgesteld door Baltimore in 1971 met zes klassen; klasse VII later (Koonin et al. 2021).
- ✅ Voorbeelden per klasse (adenovirus, parvovirus B19, rota-/reovirus, polio/SARS-CoV-2/hepatitis A,
  influenza/rabiës/mazelen/ebola, HIV-1, hepatitis B) kloppen; het pokkenvirus wordt correct als klasse I met
  cytoplasmatische replicatie en eigen RNA-polymerase genoemd.
- ✅ De uitzondering bij klasse III — hepatitis-deltavirus laat zijn RNA door gastheer-Pol II kopiëren —
  is gedekt door Taylor (2015).
- 🔧 Feit "Klassen met eigen polymerase: III, V, VI, VII" → "Klassen **die hun polymerase meebrengen in het
  deeltje**". Reden: ook klasse IV codeert een eigen RdRp; alleen het *meebrengen in het virusdeeltje* is
  kenmerkend voor III, V, VI en VII.

## rt
- ✅ Genoom ≈ 9,7 kb (+)ssRNA, twee kopieën per deeltje; primer tRNA-Lys3 op de PBS; polymerase- én
  RNase H-activiteit; PPT als tweede primer; eindproduct lineair dsDNA met twee LTR's (U3-R-U5); geen
  proefleesfunctie (Hu & Hughes, Cold Spring Harb Perspect Med 2012).
- ✅ Beide strengoverdrachten, de volgorde van de banen in de scène en het label "(+)-DNA: U3-R-U5-PBS" kloppen.
- ✅ PDB 1RTD en 1HYS bestaan en zijn wat ze volgens de bronvermelding zijn (RCSB-API nagekeken).

## integratie
- ✅ 3'-processing: 2 nucleotiden (GT) weg per uiteinde → geconserveerd CA-3'OH; strengoverdracht op twee
  posities 5 bp uit elkaar (4 bp bij MLV); 5 bp duplicatie van gastheersequentie; herstel door gastheerenzymen
  (welke precies is nog onduidelijk); LEDGF/p75 stuurt naar actieve genlichamen (Craigie & Bushman 2012,
  Engelman & Cherepanov 2014).
- ✅ PDB 5U1C is inderdaad "Structure of tetrameric HIV-1 Strand Transfer Complex Intasome" en 3OS0 het
  PFV-strand-transfercomplex — de `simplified`-tekst noemt het tetrameer correct.

## kernimport
- ✅ NPC ≈ 110–120 MDa, ~30 soorten nucleoporinen in veelvouden van acht, centraal kanaal ≈ 40 nm, passieve
  grens ≈ 40 kDa / ~5 nm, ≈ 3 000 poriën per kern; Ran·GTP-gradiënt met RCC1 binnen en RanGAP buiten
  (Kabachinski & Schwartz 2015, Beck & Hurt 2017).
- ✅ "Hoppen door de FG-zeef kost zelf geen ATP" — correct: de richting komt van de Ran-gradiënt.
- ✅ Het adenoviruscapside (≈ 90 nm) past niet door het kanaal (~40 nm) en wordt aan de porie ontmanteld.
- ✅ PDB 7R5K = "Human nuclear pore complex (constricted)".

## sleutel
- ✅ **Zelf nagemeten in 6M0J**: op ≤ 4 Å raken precies **17 residuen van de RBD (keten E)** en **20 residuen
  van ACE2 (keten A)** elkaar — en de residulijsten in `sleutel.js` (IE/IA) komen exact overeen met die meting.
- ✅ PDB 6M0J: röntgen, 2,45 Å, twee entiteiten (ACE2 + RBD) — bevestigd via de RCSB-API.
- ✅ Trimeer (Walls 2020, Ke 2020); knippen door TMPRSS2 of cathepsine L vóór de fusie (Hoffmann 2020,
  Jackson 2022); ACE2 vooral in de neus, minder diep in de longen (Jackson 2022).
- 🔧 "De toppen staan **afwisselend** omhoog of omlaag" → "Elke top staat **nu eens** omhoog …, **dan weer**
  omlaag". Reden: "afwisselend" suggereert een regelmatige beurtrol; de stand is in werkelijkheid toevallig.

## viruskopie
- ✅ Genoom 29 903 letters met kap en poly(A) (Wu et al. 2020); 16 stukken nsp1–16; kopiëren in blaasjes met
  dubbel membraan uit het ER (Snijder 2020); poortje door beide membranen (Wolff 2020) — correct als
  voorstel geformuleerd.
- ❌ **Fout gevonden en verbeterd.** Feit "Verspringing: bij ongeveer de helft van de ribosomen" (EN: "in about
  half of the ribosomes"). Kelly et al. (J Biol Chem 2020, PMC7397099) — de bron die hier gebruikt wordt —
  meten een −1-frameshift van **∼20 % in HEK-cellen** en **25 ± 3 % / 36 ± 3 %** in de lysaatmetingen.
  "Ongeveer de helft" is dus te hoog. Nu: "bij ongeveer **20–30 %** van de ribosomen (gemeten)" /
  "in about 20–30% of the ribosomes (measured)".

## schaar
- ✅ PDB 7RFW: röntgen **1,729 Å** (afgerond 1,73 Å), één entiteit, "Structure of SARS-CoV-2 main protease in
  complex with a covalent inhibitor" — bevestigd via de RCSB-API.
- ✅ "Ten minste 11 knipplaatsen, meestal achter Leu-Gln", "werkt als dimeer", "His41 + Cys145": Zhang et al.
  (Science 2020, PMC7164518) schrijven letterlijk "no fewer than 11 cleavage sites … Leu-Gln↓(Ser, Ala, Gly)"
  en beschrijven de dimerisatie en de dyade.
- ✅ "De cel heeft zelf geen eiwit dat er sterk op lijkt" — gedekt: "no human proteases with a similar cleavage
  specificity are known" (Zhang 2020).
- ✅ Nirmatrelvir covalent aan Cys145 en de klinische winst bij hoogrisicodeelnemers (Owen 2021, Hammond 2022);
  de app noemt geen percentage en blijft dus binnen wat de bron zegt.

## assemblage
- ✅ S, E en M in het ER-membraan, N pakt het RNA in, afknoppen in het ERGIC, uitgang via blaasjes
  (V'kovski 2021, Klein 2020); virusdeeltje ≈ 0,1 µm.
- 🔧 Stap "Bij β-coronavirussen gebeurt dat via lysosomen" → "**loopt die uitgang in gekweekte cellen** via
  lysosomen" (EN idem). Reden: Ghosh et al. (2020) toonden dit in celkweek; de `why` en `simplified` hadden de
  nuance al, de stap zelf nog niet.

## faag
- ✅ Lambda-genoom 48 502 bp; inbouwen op één vaste att-plaats met Int; CI houdt de lytische genen uit.
- ✅ "T-even fagen ≈ 20–25 minuten tot lysis": Abedon (Viruses 2019, PMC6832632) schrijft "T-even latent periods
  instead typically are roughly 20- to 25-min long".
- ❌ **Fout gevonden en verbeterd.** "Bij DNA-schade … knipt **het enzym Xis** de profaag los." Casjens &
  Hendrix (Virology 2015, PMC4424060) stellen: "Int (with its host factors) is sufficient to integrate lambda
  DNA, another phage-encoded protein **Xis is required for the reverse excision reaction**". Xis is dus een
  richtinggevende factor, niet de knipper. Nu: "het enzym **Int** knipt de profaag dan **samen met het
  faageiwit Xis** weer los" (EN idem). De toelichting bovenaan `app/scenes/bact/faag.js` is meegecorrigeerd.

## crispr
- ✅ "42,3 % van de bacterie- en 85,2 % van de archaeagenomen": Makarova et al. (Nat Rev Microbiol 2020,
  PMC8905525) melden 276/324 archaeagenomen (85,2 %) en 5 412/12 792 bacteriegenomen (42,3 %). Ook het label
  "bij ≈ 4 op 10 bacteriën" in de scène klopt daarmee.
- ✅ Spacers meestal 32 letters bij E. coli; Cascade + Cas3 (Brouns 2008); Cas9 met twee RNA's en PAM
  (Jinek 2012); toepassing in menselijke en muizencellen (Cong 2013).
- ✅ PDB 4OO8 = "Crystal structure of Streptococcus pyogenes Cas9 in complex with guide RNA and target DNA"
  (Nishimasu 2014) — bevestigd via de RCSB-API; de 3D-knop in de scène verwijst naar dezelfde structuur.

---

## Te verwerken in gedeelde bestanden

1. `shared/graph.js` · `…inactiveert geactiveerd RecA de repressor CI, Xis knipt de profaag los en de lytische
   cyclus start.` → `…inactiveert geactiveerd RecA de repressor CI, Int knipt de profaag samen met Xis los en de
   lytische cyclus start.`  *(reden: Int katalyseert de excisie, Xis is de richtinggevende factor — Casjens &
   Hendrix 2015, PMC4424060)*
2. `shared/graph.en.js` · `…activated RecA inactivates the CI repressor, Xis excises the prophage and the lytic
   cycle starts.` → `…activated RecA inactivates the CI repressor, Int excises the prophage together with Xis and
   the lytic cycle starts.`  *(zelfde reden)*
3. `shared/graph.js` (knoop `assemblage`, optioneel) · `β-coronavirussen gebruiken daarvoor lysosomen, die minder
   zuur worden.` → `β-coronavirussen gebruiken daarvoor volgens celkweekonderzoek lysosomen, die minder zuur
   worden.`  *(reden: Ghosh et al. 2020 is celkweekwerk; de knooptekst hedget dit al)*

Geen aanpassingen nodig in `shared/steptags.js`: de stapnamen van alle vijftien knopen komen qua aantal en
inhoud overeen met de scènes.

## Eindoordeel

Het pakket is wetenschappelijk solide. Twee echte fouten gevonden en verbeterd (frameshift-percentage bij
`viruskopie`, Xis als knipper bij `faag`) en vijf te stellige of te algemene formuleringen verzacht. Alle
structuren (6M0J, 7RFW, 4OO8, 5U1C, 3OS0, 1RTD, 1HYS, 7R5K) bestaan en kloppen met wat de app erover zegt; het
raakvlak 17 + 20 aminozuren in 6M0J is onafhankelijk nagemeten en klopt tot op het residu. Na de verbeteringen
staat er in dit pakket geen uitspraak meer zonder gelezen bron of eigen meting. Twee tekstparen moeten nog in
de gedeelde bestanden worden verwerkt (zie hierboven).
