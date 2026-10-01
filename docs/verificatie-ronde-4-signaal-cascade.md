# Verificatie ronde 4 — verhaallijn 2: `rtk`, `mapk`, `srf`

Datum: 1 oktober 2026
Bereik: alle zichtbare tekst (NL en EN) van `app/scenes/signal/{rtk,mapk,srf}.js` (staptitels en -teksten,
`simplified`, `extra`, `org/scale/time`, legenda, SVG-labels via `T2()`/`L()`/`T()`, `data-label`), de
uitlegpanelen in `shared/details/signal2.js` (what/how/facts/why/sources), de grafiekzinnen in
`shared/graph.js` en `shared/graph.en.js` (ids `rtk`, `mapk`, `srf`) en de overgangszinnen van `SIGNAAL` in
`app/story.js`. Ook de tekenlogica is gelezen waar ze feiten vastlegt (welke residuen, volgorde van de
plaatsen op het DNA, aantal fosfaten, domeinopbouw van Grb2, oriëntatie van het asymmetrische kinasedimeer).

Werkwijze: residunummers en lengtes rechtstreeks uit de UniProt-REST-API (P01133, P00533, P62993, Q02750,
P28482, P19419, P11831, P01100); elke geciteerde PDB-ID via `https://data.rcsb.org/rest/v1/core/entry/<ID>`;
abstracts en bibliografische gegevens via Europe PMC; de NAR-1996- en Mol-Endocrinol-2013-artikels via de
uitgeverssite.

Aantal gecontroleerde uitspraken: ≈ 150 (≈ 26 stapteksten, 9 `simplified`/`extra`/meta-velden, ≈ 55
inhoudelijke labels, ≈ 45 uitspraken in de uitlegpanelen, 6 grafiekzinnen, 3 overgangszinnen, 25 bronnen).

Legenda: ✅ klopt · ⚠️ nuance/klein punt · ❌ fout (gecorrigeerd)

Na alle wijzigingen: `node --check` op beide gewijzigde bestanden ✅; `tools/check.html` → **PROBLEMS (0)**;
`tools/text-check.html?w=1000&min=13&ids=rtk,mapk,srf` → **klein 0**, drukke stappen 0/8, 0/9, 0/9.

---

## Samenvatting van de wijzigingen

| # | Verdict | Bestand (plaats) | Voor → na (NL / EN) | Bron |
|---|---|---|---|---|
| 1 | ⚠️→fix | `signal/srf.js` (stap 3) | "zet fosfaten op serines in het C-terminale activatiedomein, o.a. Ser383 en Ser389" → "zet fosfaten op meerdere plaatsen in …"; EN "adds phosphates to serines" → "adds phosphates at several sites". ERK fosforyleert in Elk-1 ook threonines (Thr336, Thr353, Thr363, Thr368, Thr417); "op serines" suggereerde dat alleen serines geraakt worden. Nu gelijk aan het uitlegpaneel. | UniProt P19419 (Modified residue: S324, T336, T353, T363, T368, S383, S389, T417, S422, "by MAPK1") |
| 2 | ⚠️→fix | `details/signal2.js` (srf, facts) | Halfwaardetijd FOS-mRNA "≈ 10–20 min" → "≈ 10–15 min" (NL en EN). Gemeten waarden: ≈ 9 min (rijp cytoplasmatisch c-fos-mRNA in fibroblasten), algemeen 10–15 min; 20 min wordt nergens gevonden. | Shyu, Greenberg & Belasco 1989, *Genes Dev* 3:60; Reddy et al. 2013 ("as little as 9 min") |
| 3 | ⚠️→fix | `details/signal2.js` (srf, bronnen) | Bron zonder auteurs "Elk-1 can recruit SRF … NAR (1996) 24:1345" → "Latinkic, Zeremski & Lau (1996) … 24:1345–1351" | uitgeverssite NAR |
| 4 | ⚠️→fix | `details/signal2.js` (srf, bronnen) | "Mol. Endocrinol. (2013) GnRH increases c-Fos half-life …" → "Reddy, Xie, Lindaman & Coss (2013) … Mol Endocrinol 27:253–265 (c-Fos protein ≈ 100 min; FOS mRNA as short as ≈ 9 min)" | uitgeverssite Mol Endocrinol |
| 5 | ⚠️→fix | `details/signal2.js` (bronnen 1K6O, 1FOS, 5P21) | tijdschrift/volume/pagina toegevoegd: J Mol Biol 314:495; Nature 373:257–261; EMBO J 9:2351–2359 (titel 5P21 aangevuld "at 1.35 Å resolution") | RCSB primary citation |

Geen inhoudelijke ❌-fouten gevonden.

---

## `rtk` — Receptortyrosinekinase (EGFR) ✅

- EGF = 53 aa, rest 971–1023 van de voorloper (1207 aa, membraangebonden), drie disulfidebruggen ✅ (UniProt P01133: Chain "Epidermal growth factor" 971–1023).
- EGFR 1210 aa incl. signaalpeptide (1–24) ✅ (P00533). ErbB1/HER1 ✅.
- Klassieke Tyr1068/1086 = UniProt Tyr1092/1110 (verschil 24 = signaalpeptide) ✅; beide "Phosphotyrosine; by autocatalysis" in UniProt ✅.
- Domeinen I–IV; EGF tussen I en III; zonder ligand "gesloten/tethered" met de dimerisatie-arm van II tegen IV; na binding open en arm vrij ✅ (Lemmon & Schlessinger 2010; Ogiso 2002).
- Rug-aan-rugdimeer 2:2, EGF's raken elkaar niet, contact via de receptoren ✅ (PDB 1IVO = Ogiso et al., *Cell* 110:775, 2002 — gecontroleerd in RCSB).
- Asymmetrisch kinasedimeer: C-lob van de activator tegen N-lob van de ontvanger, ontvanger wordt actief ✅ (PDB 2GS2 = Zhang et al., *Cell* 125:1137, 2006 — RCSB). Tekening: C-lob activator (y 607) ligt naast N-lob ontvanger (y 607); alleen de ontvanger gloeit ✅.
- Trans-autofosforylering met ATP → ADP; fosfotyrosines als dockingplaatsen ✅.
- Grb2 217 aa, SH3(1–58)–SH2(60–152)–SH3(156–215) ✅ (P62993); tekening: één SH2 met twee SH3 naar SOS ✅. SH2 bindt pTyr (bv. Tyr1068), SH3's binden de prolinerijke C-staart van SOS ✅.
- SOS = GEF; Ras met lipide-anker aan het binnenblad ✅.
- `why`: EGFR-mutaties/overexpressie bij longkanker; gefitinib (TKI), cetuximab (antilichaam) ✅.
- `scale` membraan ≈ 5 nm ✅. `simplified` (rolwissel, clusters, Shc, endocytose weggelaten) ✅.
- ⚠️ (geen wijziging) Stap 0 "EGF-receptoren wachten als losse, inactieve monomeren": de meeste receptoren zijn zonder ligand monomeer, maar een deel vormt al inactieve (pre)dimeren. Didactisch aanvaardbaar; zie open vragen.
- ⚠️ (geen wijziging) Tekening stap 4: de staart van de ontvanger (R2) wordt eerst gefosforyleerd, daarna die van de activator. Welk kinase welke staart fosforyleert in het asymmetrische dimeer is niet eenduidig vastgelegd; `simplified` zegt dat dit nog onderzocht wordt ✅.
- Graph-zin, overgangszin ("De geactiveerde receptor zet een kinasecascade in gang") ✅. NL = EN ✅.

## `mapk` — Ras–MAPK-cascade ✅

- Ras = klein GTPase, GTP aan / GDP uit; SOS = GEF; cytosol veel meer GTP dan GDP ✅ (Alberts).
- Lipide-anker: farnesyl, bij sommige isovormen ook palmitoyl ✅ (H-, N-Ras, K-Ras4A).
- Ras-GTP bindt het RBD van Raf; Raf-activatie via dimerisatie, (de)fosforylering, 14-3-3 (in `simplified`) ✅.
- MEK1 Ser218 + Ser222 "by BRAF and RAF1" ✅ (UniProt Q02750). Label "2× Ser-P" ✅.
- ERK2 (humaan, P28482, 360 aa) TEY-motief 185–187; pThr185 + pTyr187 "by MAP2K1 and MAP2K2" ✅. (Rattenummering Thr183/Tyr185 en ERK1 Thr202/Tyr204 worden niet gebruikt — correct.) Dubbelspecifiek MEK; beide fosfaten nodig ✅ (Roskoski 2012, *Pharmacol Res* 66:105).
- Versterking kwalitatief, met disclaimer ✅.
- Kernimport: deel van ERK, verschillende mechanismen (importine-7, directe nucleoporinebinding) ✅.
- Uitschakelen: trage intrinsieke GTP-hydrolyse, GAP (NF1) versnelt; DUSP/MKP-fosfatasen ✅.
- Hotspots G12, G13, Q61; mutant Ras blijft GTP-gebonden ✅. "~1 op 5 kankerpatiënten" / "≈ 19 %" ✅ — Prior, Hood & Hartley 2020, *Cancer Res* 80:2969–2974 (PMID 32209560): "approximately 19% of patients with cancer harbor Ras mutations".
- PDB 5P21 = H-Ras met GTP-analoog (GppNHp), Pai et al. 1990 *EMBO J* 9:2351 ✅ (RCSB).
- Isovormen, MAPKKK/MAPKK/MAPK-namen, BRAF V600E ✅. `scale` cel 10–20 µm ✅.
- Graph-zin, overgangszin ("Actief ERK is in de kern en zet een gen aan") ✅. NL = EN; "≈ 19 %" (NL) / "≈ 19%" (EN) ✅.

## `srf` — Onmiddellijk-vroege genen (SRE) ✅ (na fix 1–2)

- SRE ≈ 300 bp vóór de cap-site van FOS ✅ (Treisman 1986, *Cell* 46:567: "located 300 bp 5' to the mRNA cap site").
- CArG-box CC(A/T)₆GG met SRF-dimeer ✅; Ets-kern GGA(A/T) ✅. Tekening: Ets-plek stroomopwaarts (5') van de CArG-box, zoals in het c-fos-SRE (…CAG**GA**TGT**CCATATTAGG**…) ✅.
- Elk-1 bindt het zwakke Ets-achtige element van het FOS-SRE niet alleen, enkel samen met SRF; B-box–SRF-contact; ternair complex ✅ (Latinkic et al. 1996: "does not bind to the c-fos Ets-like site by itself"; Buchwalter et al. 2004; Thiel et al. 2021). Opmerking: Latinkic toont ook dat Elk-1 op andere SRE's (sterke Ets-plek) SRF kan rekruteren — de tekst beperkt de uitspraak terecht tot het FOS-SRE ✅.
- Elk-1 428 aa; pSer383, pSer389 door ERK ✅ (P19419). Stap 3 aangepast (fix 1).
- MED23 (Sur2) als Mediator-contact van Elk-1 ✅ (Stevens et al. 2002, *Science* 296:755); CBP/p300 ✅ (Thiel 2021).
- Pol II kan al klaarstaan (pauze) ✅; FOS heeft een TATA-box (TFIID getekend) ✅.
- Inductie ook met cycloheximide (kenmerk IEG) ✅.
- c-Fos–c-Jun = AP-1, bZIP/leucineritssluiting; TRE TGA(C/G)TCA ✅; PDB 1FOS ✅; PDB 1K6O = ternair SAP-1/SRF/c-fos-SRE (Mo et al. 2001, *J Mol Biol* 314:495) ✅ — SAP-1 is een TCF ✅.
- SRF 508 aa (P11831), c-Fos 380 aa (P01100), FOS op chromosoom 14 (14q24.3) ✅.
- FOS-mRNA ARE in 3'-UTR ✅ (Shyu 1989; daar ook een tweede, coderende instabiliteitsdeterminant). Halfwaardetijd aangepast (fix 2).
- c-Fos-eiwit ≈ 1,5–2 u ✅ (Reddy et al. 2013: ≈ 100 min in LβT2-cellen; celtypeafhankelijk vermeld). Decimale komma NL ✅.
- Elk-1 uitzetten door fosfatase ✅ (calcineurine; Thiel 2021).
- Graph-zin, overgangszin ("Aan de promoter van FOS wordt de transcriptiemachine opgebouwd") ✅. NL = EN ✅.

---

## Open vragen (niet gewijzigd)

1. `rtk` stap 0: "losse, inactieve monomeren". Er bestaan ook ligandloze (inactieve) EGFR-dimeren/clusters. Eventueel in `simplified` één bijzin toevoegen ("een deel vormt ook zonder EGF al inactieve dimeren") — inhoudelijke keuze voor de lead.
2. `rtk` tekening stap 4: volgorde (eerst staart van de ontvanger). Niet fout gezien de disclaimer, maar wie strikt het "receiver fosforyleert in trans de activator"-model volgt, zou eerst de staart van de activator verwachten.
3. `srf` FOS-mRNA "≈ 10–15 min": goed onderbouwd voor fibroblasten/NIH 3T3; in andere celtypen kunnen waarden afwijken. Een primaire bron met een expliciet getal (bv. het NAR-1987-artikel "Posttranscriptional regulation of c-fos mRNA expression") kan nog als extra bron worden toegevoegd.
