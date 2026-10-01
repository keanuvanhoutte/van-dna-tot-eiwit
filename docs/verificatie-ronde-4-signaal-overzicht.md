# Verificatie ronde 4: verhaallijn 2, overzicht en zijpaden (`signaal`, `gpcr`, `steroid`)

Datum: 1 oktober 2026
Bereik: alle zichtbare teksten in `app/scenes/signal/signaal.js`, `gpcr.js` en `steroid.js`, telkens in NL en EN. Daaronder vallen stap-`title`/`text`, SVG-labels (`T()`/`T2()`), `legend`, `simplified`, `extra`, `scale`, `time` en `org`. Daarnaast:
- de tekenlogica in `app/scenes/signal/_sig1.js`, waar die feiten vastlegt (topologie van de 7TM-receptor, beweging van helix 6, domeinen van GR, Hsp90-dimeer);
- de uitleg in `shared/details/signal1.js` (what/how/facts/why/sources);
- de samenvattingen in `shared/graph.js` en `shared/graph.en.js` (ids `signaal`, `gpcr`, `steroid`);
- de hotspot "Signaalmolecule (EGF)" in `app/scenes/entry/_celsvg.js`.

## Methode
- Elke scène en het detailbestand zijn volledig gelezen. Tekenfuncties zijn alleen gelezen waar ze iets inhoudelijks vastleggen.
- Eiwitgegevens komen uit de UniProt REST-API: lengte, massa, domeinen, TM-segmenten, isoformen en gemodificeerde residuen.
  - P07550 (ADRB2), P63092 (GNAS), P10644 (PRKAR1A), P16220 (CREB1, alle isoformen) en P04150 (NR3C1).
  - P06536 (rat-GR), om het DBD van 1R4R te vergelijken met het menselijke.
- PDB-entries zijn nagekeken via `data.rcsb.org/rest/v1/core/entry` en `polymer_entity`: 3SN6, 1R4R, en ter vergelijking 1R4O en 1GLU.
- Elke geciteerde PubMed-/PMC-bron is opgevraagd via NCBI E-utilities (esummary/efetch). Auteurs, tijdschrift, volume, pagina's en abstract zijn vergeleken met de bewering.
- De NCBI Bookshelf-ID's zijn via de `books`-database opgezocht, omdat de webpagina's een captcha tonen. Oakley & Cidlowski (2013) is gelezen in PMC.
- Aantal gecontroleerde feitelijke uitspraken: **≈ 175**. Per onderdeel: signaal ≈ 45, gpcr ≈ 60, steroid ≈ 50, bronnen 25, graph/hotspot ≈ 6.

Legenda: ✅ klopt · ⚠️ genuanceerd of gehedged · ❌ fout (gecorrigeerd)

### Controle na de wijzigingen
- `node --check` (als tijdelijke `.mjs`) slaagt voor `shared/details/signal1.js` en `app/scenes/signal/_sig1.js`.
- `tools/check.html` (headless Chrome): **nodes 78 · scenes 78 · details 78 · PROBLEMS (0)**.
- `tools/text-check.html?w=1000&min=13&ids=signaal,gpcr,steroid`:
  - signaal: klein 0 · drukke stappen 0/8
  - gpcr: klein 0 · drukke stappen 0/9
  - steroid: klein 0 · drukke stappen 0/8
- Controlebeeld van `gpcr` stap 3 (`tools/shot.sh`): helix 6 zwaait nu met zijn cytosolische uiteinde weg van de bundel (zie ❌ 1).
- `CHECKED` in `shared/graph.js` is niet aangeraakt.

---

## 0 · Samenvatting

### ❌ Fouten gecorrigeerd
| # | Waar | Vóór → na | Bron |
|---|---|---|---|
| 1 | `_sig1.js` → `gpcr7()`, gebruikt in `gpcr` en `signaal` | Bij activatie draaide helix 6 met `rotate(+tilt)` rond zijn extracellulaire uiteinde. Het cytosolische uiteinde schoof daardoor naar links, **naar het midden van de bundel** (over helix 5). Dat beeld spreekt tekst en label "helix 6 zwaait uit" tegen. → `rotate(-tilt)`: het cytosolische uiteinde zwaait nu **weg van de bundel**, aan de kant waar Gs aanmeert. | Rasmussen et al. 2011 (PMID 21772288): "14 Å outward movement at the cytoplasmic end of TM6" |
| 2 | `signal1.js` gpcr, bron | "**Berkowitz et al.** (1989) Multiple sequence elements in the c-fos promoter …" → "**Fisch, Prywes, Simon & Roeder** (1989) … Genes Dev 3:198". PMID 2541049 is van Fisch et al.; de vermelde auteur bestond voor dit artikel niet. | PubMed 2541049 |
| 3 | `signal1.js` steroid, bron | "**Lim et al. (2015)** Glucocorticoid receptor binds half sites as a monomer … Genome Biol **16:3**" → "**Schiller et al. (2014)** … Genome Biol **15:418**". De DOI in de link (10.1186/s13059-014-0418-y) hoort bij Schiller et al. Lim et al. 2015 is een ander artikel, in *Genome Res*. | PubMed 25085117 (en 25957148 ter vergelijking) |
| 4 | `signal1.js` gpcr how 7 (NL) | "bindt **de** KIX-domein" → "bindt **het** KIX-domein" (taal) | — |

### ⚠️ Verduidelijkt of aangevuld
| Waar | Wijziging |
|---|---|
| `signal1.js` gpcr facts, CREB | "Ser133 (in UniProt P16220, isoform CREB-B: Ser119)" → "Ser133 (isoform CREB-A, 341 aa; UniProt P16220 toont CREB-B, 327 aa: daar Ser119)", EN idem.<br>De oude formulering was niet fout, maar liet in het midden welke isoform 133 gebruikt. Nagekeken in UniProt: P16220-1 (341 aa) heeft het RRPS-motief op Ser133, de canonieke P16220-2 (327 aa) op Ser119. |
| `signal1.js` steroid, bronnen | Twee bronnen toegevoegd voor beweringen die nog geen bron hadden:<br>• **Freedman & Yamamoto 2004** (PMID 15004228): importine α bindt selectief NL1, importine 7/8 binden NL1 en NL2. Steunt "Importines herkennen NL1".<br>• **Davies, Ning & Sánchez 2002** (PMID 11751894): na hormoonbinding wordt FKBP51 vervangen door FKBP52 en blijft Hsp90 gebonden tijdens het transport. Steunt de hedge in `simplified`. |

### Open punten (niet zelf beslist)
1. **GRE-consensus, eerste base.** De app gebruikt **A**GAACAnnnTGTTCT. Oakley & Cidlowski 2013, de hoofdbron van de scène, schrijft **G**GAACAnnnTGTTCT. Beide schrijfwijzen komen in de literatuur voor; in de motieflogo's staat op die positie G/A. Niet fout. Wil je het exact laten aansluiten bij de geciteerde bron, schrijf dan "GGAACAnnnTGTTCT" of "(A/G)GAACAnnnTGTTCT" in `facts`/`how`. Het label in de figuur (`AGAACA`) zou dan mee moeten veranderen.
2. **Helix 6 in 2D.** In het platte, uitgerolde beeld raakt de uitgezwaaide helix 6 nu helix 7 een beetje. Vóór de correctie raakte hij helix 5. In een 2D-rij is "naar buiten" alleen bij benadering te tonen. Eventueel kan de hoek iets kleiner (11° → 8°); dat is een ontwerpkeuze.
3. **"Gαs·GTP maakt zich los van Gβγ".** Dit is het klassieke dissociatiemodel uit het handboek en klopt op bachelorniveau. Nieuwere studies tonen dat Gα en Gβγ soms herschikken in plaats van volledig te scheiden. Optioneel kan dat in `simplified` (één zin). Niet gewijzigd.
4. **Doelgen PEPCK.** Dit is een klassiek GR-doelgen. Het regulatorische gebied is wel een samengestelde "glucocorticoid response unit" met niet-consensus-GRE's en hulpfactoren. Dat valt buiten bachelorniveau en is niet gewijzigd.

---

## Scène `signaal` (overzicht)

| Uitspraak (NL = EN) | Oordeel | Bron / opmerking |
|---|---|---|
| Hormonen, groeifactoren en neurotransmitters dragen boodschappen tussen cellen | ✅ | Alberts NBK26813 (*General Principles of Cell Communication*; ID bevestigd via NCBI books) |
| Plasmamembraan = lipidendubbellaag, hydrofobe kern, ≈ 5 nm | ✅ | Alberts |
| EGF (peptide) en adrenaline zijn wateroplosbaar en gaan niet door de bilaag; receptor op het celoppervlak | ✅ | Alberts NBK26813 |
| Alleen cellen met de receptor reageren | ✅ | idem |
| Cortisol = steroïdhormoon uit cholesterol, diffundeert door het membraan en bindt GR in de cel | ✅ | Oakley & Cidlowski 2013 |
| Drie strategieën: RTK, GPCR, kernreceptor (ionkanaalreceptoren staan in `how` genoemd als derde oppervlakteklasse) | ✅ | Alberts NBK26813/26822/26912 |
| Eiwitten geven het signaal door en versterken het (kinasen, cAMP) | ✅ | Alberts |
| Om genen aan te zetten moet het signaal de kern bereiken; transcriptiefactoren binden het DNA | ✅ | — |
| Verhaal 2: EGF → EGFR → Ras–MAPK → FOS → c-Fos; FOS is een onmiddellijk-vroeg gen | ✅ | consistent met `rtk`/`mapk`/`srf` |
| `simplified`: niet elke cel heeft alle drie de receptoren · Ras is een GTPase (geen kinase) aan het membraan · AC/PKA symbolisch · GR bindt als dimeer | ✅ | — |
| `scale`: cel ≈ 20 µm → membraan ≈ 5 nm · `time`: seconden tot minuten | ✅ | — |
| Legenda: EGF (groeifactor, peptide), adrenaline, cortisol (steroïdhormoon), Gs, cAMP, Hsp90 | ✅ | — |
| Tekening: twee EGFR-monomeren dimeriseren en dragen een fosfaat; Hsp90 komt los van GR; tweede GR wordt toegevoegd; PKA (C) en ERK gaan de kern in | ✅ | symbolisch, in `simplified` vermeld |
| how: EGF = 53 aa, UniProt P01133, rijpe keten 971–1023 | ✅ | UniProt (1023 − 971 + 1 = 53) |
| how: twee EGFR's dimeriseren en fosforyleren elkaars tyrosines | ✅ | Alberts NBK26822 |
| how: adrenaline = catecholamine uit het bijniermerg, afgeleid van tyrosine; cortisol uit de bijnierschors, afgeleid van cholesterol | ✅ | handboek |
| facts: "≈ 800 GPCR's, grootste familie van membraanreceptoren" | ✅ | Fredriksson et al. 2003 (PMID 12761335): "more than 800 human GPCR sequences" |
| how: ERK, PKA of GR gaat de kern in en wijzigt transcriptiefactoren | ✅ | — |
| NL = EN (stappen, labels, details) | ✅ | De titel verschilt bewust ("Signaalmolecule & receptor" / "Cell signalling"); de graph gebruikt dezelfde titels. |
| graph `signaal` (NL/EN) | ✅ | — |
| Hotspot `_celsvg.js` "Signaalmolecule (EGF)" / "Signal molecule (EGF)": receptoren in het membraan met signaalmoleculen erboven | ✅ | — |

## Scène `gpcr` (adrenaline → β2AR → Gs → AC → cAMP → PKA → CREB)

| Uitspraak | Oordeel | Bron / opmerking |
|---|---|---|
| Adrenaline: catecholamine uit het bijniermerg | ✅ | — |
| β2-adrenerge receptor: 413 aa, 7 TM-helices | ✅ | UniProt P07550: lengte 413, TM1–TM7 (30–56 … 305–326) |
| Adrenaline bindt in een holte tussen de helices | ✅ | UniProt: bindingsresiduen D113 (TM3), S203 (TM5), N293 (TM6), N312 (TM7) |
| Tekening 7TM: N-terminus extracellulair, C-terminus cytosolisch, lussen afwisselend (ICL1, ECL1, ICL2 …) | ✅ | Helix 6 = 6e staaf (index 5) ✅ |
| Helix 6 zwaait aan de binnenkant naar buiten; grootste beweging ≈ 14 Å | ✅ (tekst) / ❌ → ✅ (tekening) | Rasmussen 2011. De richting in de tekening is gecorrigeerd (❌ 1). |
| In rust wacht Gs met GDP gebonden | ✅ | Alberts NBK26912 |
| Actieve receptor = GEF: GDP eruit, GTP erin; GTP is in de cel veel overvloediger dan GDP | ✅ | Alberts; Rasmussen (nucleotidevrij complex) |
| Gαs·GTP laat Gβγ los en schuift langs het membraan naar AC | ✅ / ⚠️ | klassiek model (open punt 3) |
| Eén receptor kan na elkaar meerdere G-eiwitten aanzetten | ✅ | Alberts |
| AC zet ATP om in cAMP (+ PPᵢ); cAMP = tweede boodschapper, verspreidt zich snel | ✅ | Alberts |
| `simplified`: AC heeft 12 TM-helices en twee katalytische domeinen | ✅ | transmembranaire AC1–9: 2 × 6 TM, C1a/C2a |
| PKA = R₂C₂; elke R bindt 2 cAMP; 4 cAMP maken 2 C vrij | ✅ | Turnham & Scott 2016: "binding of two molecules … cAMP to each R subunit … release the C subunits". UniProt P10644: twee clusters cAMP-bindingsplaatsen (CNB-A/B). Kim et al. 2007 (PMID 17889648). |
| Tekening: 2 R-staafjes, 4 cAMP op R, 2 C komen vrij | ✅ | — |
| `simplified`: AKAP's, C laat niet altijd volledig los, CREB ook door andere kinasen, desensitisatie (GRK/β-arrestine) weggelaten | ✅ | Turnham & Scott; UniProt P16220 (CaMK, RSK, MSK …) |
| Vrije C gaat de kern in en fosforyleert CREB op Ser133 | ✅ | Mayr & Montminy 2001 |
| Ser133 = klassieke nummering (CREB-A, 341 aa); UniProt-canoniek CREB-B (327 aa): Ser119 | ✅ (verduidelijkt) | UniProt P16220-1/-2, nagekeken op het RRPS-motief |
| CREB zit als dimeer op het CRE, consensus TGACGTCA | ✅ | Mayr & Montminy 2001 |
| Fosfo-CREB bindt het KIX-domein van CBP/p300; CBP/p300 acetyleert histonen en helpt Pol II | ✅ | idem (lidwoord gecorrigeerd) |
| Uitschakelen: intrinsieke GTPase van Gαs → GDP, bindt Gβγ opnieuw; PDE: cAMP → AMP; fosfatasen halen het fosfaat van CREB | ✅ | Alberts |
| Gαs (GNAS): 394 aa | ✅ | UniProt P63092: de canonieke isoform (Gαs-lang) telt 394 aa. 3SN6 bevat de korte isoform van rund; dat is niet in strijd hiermee. |
| PDB 3SN6 = β2AR–Gs-complex, Rasmussen et al. 2011, *Nature* 477:549 | ✅ | RCSB (3,2 Å) + PubMed 21772288 |
| Het FOS-gen heeft zowel een SRE als een CRE; cAMP kan FOS aanzetten | ✅ | Fisch et al. 1989: cAMP-inductie via o.a. de ATF/CRE-plaats −72/−54, onafhankelijk van het SRE (auteur in de bron gecorrigeerd, ❌ 2) |
| ≈ een derde van de goedgekeurde geneesmiddelen werkt via GPCR's; bv. β2-agonisten bij astma | ✅ | Hauser et al. 2017 (PMID 29075003): "475 drugs (~34 % of all drugs approved by the FDA) act at 108 unique GPCRs" |
| `org`: luchtwegepitheel, gladde spiercel · `scale`: receptor ≈ 5 nm · `time`: cAMP binnen seconden, genen na minuten | ✅ | — |
| `extra` 3SN6-link | ✅ | — |
| Overige bronnen: Turnham & Scott 2016, *Gene* 577:101 (PMC4713328) · Kim et al. 2007, *Cell* 130:1032 · Mayr & Montminy 2001, *Nat Rev Mol Cell Biol* 2:599 · Alberts NBK26912 | ✅ | E-utilities / NCBI books |
| graph `gpcr` NL/EN | ✅ | — |
| NL = EN | ✅ | — |

## Scène `steroid` (cortisol → GR → GRE)

| Uitspraak | Oordeel | Bron / opmerking |
|---|---|---|
| Cortisol: steroïdhormoon uit de bijnierschors, gemaakt uit cholesterol, vetoplosbaar | ✅ | — |
| Diffundeert door de bilaag zonder transporteiwit of oppervlaktereceptor | ✅ | klassiek model (Oakley & Cidlowski) |
| GR (NR3C1): 777 aa, ≈ 86 kDa | ✅ | UniProt P04150: 777 aa, 85 659 Da |
| Drie domeinen: NTD (AF1, ongeordend), DBD met twee zinkvingers, LBD (AF2) | ✅ | UniProt: "Modulating" 1–420 met ongeordende stukken |
| DBD aa 418–493, twee C4-zinkvingers | ✅ | UniProt: DNA binding 418–493; zinkvingers 421–441 en 457–476 |
| LBD aa 524–758 | ✅ | UniProt: NR LBD 524–758 (scharnier 487–523) |
| In rust: complex met een Hsp90-dimeer, p23 en FKBP51 (stap); facts: Hsp90, Hsp70, p23, FKBP51/52 | ✅ | Oakley & Cidlowski: "hsp90, hsp70, and p23 … FKBP51 and FKBP52"; FKBP51 overheerst bij ongebonden GR (Davies 2002) |
| Bij binding: vormverandering, chaperones laten los, NLS komt vrij | ✅ / ⚠️ | Oakley & Cidlowski. Gehedged in `simplified`: Hsp90 blijft soms gebonden, FKBP51 wordt FKBP52 (Davies 2002, nu als bron toegevoegd). |
| Twee NLS'en, NL1 (DBD/scharnier) en NL2 (LBD); importines herkennen NL1 | ✅ | Oakley & Cidlowski; Freedman & Yamamoto 2004 (toegevoegd) |
| Tekening: NLS tussen DBD en LBD; importine α (bindt NLS) + β | ✅ | — |
| GR bindt als homodimeer een GRE: 2 × 6 bp met 3 bp ertussen | ✅ | Oakley & Cidlowski: "The three nucleotide spacing … is strictly required" |
| Consensus AGAACAnnnTGTTCT (label AGAACA nnn TGTTCT) | ⚠️ | variant in de schrijfwijze, zie open punt 1 |
| Elk DBD leest een halve plaats met zijn zinkvingers; tekening kop-aan-kop op twee halve plaatsen | ✅ | 1R4R |
| PDB 1R4R = rat-GR-DBD op GRE; "nagenoeg gelijk aan het menselijke" | ✅ | RCSB: Luisi et al. 1991, *Rattus norvegicus*. Het DNA (TCAGAACA**TGA**TGTTCTCA) heeft een spacer van 3 bp; 1R4O is de variant met 4 bp. Rat- en mens-DBD verschillen in 1 van 91 residuen. |
| Co-activatoren SRC-1 tot -3 en CBP/p300; maken chromatine open en helpen Pol II | ✅ | Oakley & Cidlowski |
| Doelgenen PEPCK en G6Pase (glucoseaanmaak in de lever) | ✅ | Endotext NBK279171 (Nicolaides, Chrousos & Kino; bevestigd via Europe PMC); open punt 4 |
| GR remt ook genen via NF-κB en AP-1 | ✅ | Oakley & Cidlowski |
| Receptor = transcriptiefactor, geen tweede boodschapper; andere steroïdreceptoren werken gelijkaardig | ✅ | — |
| Dexamethason werkt via GR; glucocorticoïden behoren tot de meest voorgeschreven ontstekingsremmers | ✅ | — |
| `org`: GR in bijna alle celtypes · `time`: import binnen minuten, doelgenen na minuten tot uren | ✅ | — |
| Bron "Lim et al. 2015" | ❌ → ✅ | gecorrigeerd naar Schiller et al. 2014 (❌ 3) |
| Overige bronnen: Oakley & Cidlowski 2013 (PMC4084612, *JACI* 132:1033) · Alberts NBK26813 en NBK26932 · PDB-101 MOTM 108 (Hsp90) | ✅ | — |
| graph `steroid` NL/EN | ✅ | klassiek model; nuance in `simplified` |
| NL = EN | ✅ | — |

## Decimale komma's
Er komen geen decimale getallen voor in de NL-teksten van deze drie scènes. Getallen als ≈ 5 nm, ≈ 14 Å en ≈ 86 kDa zijn gehele getallen. ✅

## Gewijzigde bestanden
- `app/scenes/signal/_sig1.js`: richting van helix 6 in `gpcr7()`.
- `shared/details/signal1.js`: twee bronvermeldingen gecorrigeerd, twee bronnen toegevoegd, "het KIX-domein", CREB-isoformnotitie.

## Nabehandeling (keuze gebruiker, 01-10-2026)
- Open punt 1 (GRE-consensus): op vraag van de gebruiker volgt de app nu de hoofdbron (Oakley & Cidlowski 2013): **GGAACAnnnTGTTCT**, zowel in de figuur (steroid.js) als in de uitleg (signal1.js, NL en EN).
