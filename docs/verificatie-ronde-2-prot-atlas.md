# Verificatie ronde 2 — stage `prot` en de nucleïnezuren-atlas

Datum: 29 september 2026
Bereik:
- uitlegpanelen `shared/details/prot.js` en `shared/details/prot2.js` (what/how/facts/why + bronnen, NL en EN);
- scèneteksten (stappen, `simplified`, `extra`, `time`, `scale`, `org` en zichtbare labels) in `app/scenes/prot/*.js`;
- knoopsamenvattingen (`s` in `shared/graph.js`, `S_EN` in `shared/graph.en.js`) van de 16 prot-knopen;
- alle items van `atlas/entries.js` (namen, beschrijvingen, kenmerken, PDB-codes, bronnen);
- afstemming op de cursus (transcripten 1–3 eiwitstructuur en de DNA/RNA-kernpunten).

Methode: elke feitelijke bewering nagekeken tegen primaire literatuur (PubMed-abstracts via NCBI E-utilities, Europe PMC), RCSB PDB (REST-API `data.rcsb.org/rest/v1/core/entry/<ID>` en `polymer_entity`, plus de PDB-headers voor HELIX/SHEET-records), UniProt en PDB-101. NCBI Bookshelf toonde een captcha; de NBK-nummers zijn daarom via E-utilities (`db=books`) en Europe PMC opgezocht.
Na elke bewerking: parsecontrole van het .js-bestand met `new Function(...)`, `tools/check.html` in headless Chrome → **72 · 72 · 72, PROBLEMS (0)**, en `atlas/index.html?id=bdna` → geen `Uncaught`-fouten.

Legenda: ✅ klopt · ⚠️ klopt in grote lijnen, nuance of bron nodig · ❌ fout (verbeterd)

---

## Samenvatting van de wijzigingen

| # | Bestand | Voor → na | Reden |
|---|---|---|---|
| 1 | `shared/details/prot.js` (quaternair, how[3], NL+EN) | "Dezelfde niet-covalente krachten … hydrofobe contacten, H-bruggen, zoutbruggen" → "Dezelfde krachten … en in sommige eiwitten disulfidebruggen tussen ketens (bv. antistoffen); in hemoglobine is alles niet-covalent" | De cursus (transcript 3, [00:36]) noemt disulfidebruggen expliciet bij de stabilisatie van quaternaire structuur; "enkel niet-covalent" sprak dat tegen. |
| 2 | `shared/details/prot.js` (quaternair, facts) | "HbA met CO, 1,7 Å (1992)" → "HbA met CO (R2-toestand), 1,7 Å (1992)" (+ EN) | 1BBB is de R2-toestand ("a third quaternary structure"), niet de klassieke R-toestand. |
| 3 | `app/scenes/prot/quaternair.js` (`simplified`, NL+EN) | "1BBB toont één liganden-gebonden vorm" → "1BBB toont met CO (niet O₂) een tweede liganden-gebonden vorm, de R2-toestand (“derde quaternaire structuur” naast T en R)" | idem; bron Silva, Rogers & Arnone 1992. |
| 4 | `app/scenes/prot/ramachandran.js` (stap 1, paneel) | "donkerblauw = voorkeur · blauw = toegestaan" → "helderblauw = voorkeur · donkerblauw = toegestaan" (+ EN) | ❌ Omgekeerde kleurbeschrijving: het voorkeursgebied is `#2b5ea8` (helderder), het toegestane gebied `#173a6b` (donkerder). De legenda was juist, de uitlegtekst niet. |
| 5 | `app/scenes/prot/ramachandran.js` (stap 7, NL) | "(voorspelde) structuur" → "(experimentele of voorspelde) structuur" | NL/EN-gelijkschakeling (EN zei al "experimental or predicted"). |
| 6 | `app/scenes/prot/ubiquitine.js` (`scale`) | `'≈ 30 nm (26S ≈ 2,5 MDa)'` (enkel NL-notatie) → `{ nl: '26S ≈ 45 nm lang, ≈ 2,5 MDa (met twee 19S-kappen)', en: '26S ≈ 45 nm long, ≈ 2.5 MDa (with two 19S caps)' }` | "30 nm" had geen bron en de 2,5 MDa hoort bij het dubbel gekapte 26S; gemeten lengte ≈ 45 nm. Bovendien was de string niet tweetalig. |
| 7 | `shared/details/prot2.js` (ubiquitine, facts, NL+EN) | "≈ 2,5 MDa: 20S-kern + 1 of 2 × 19S" → "20S-kern + 1 of 2 × 19S; ≈ 2,5 MDa en ≈ 45 nm lang met twee kappen" | 2,5 MDa geldt voor 20S + 2 × 19S; lengte toegevoegd met bron. |
| 8 | `shared/details/prot2.js` (ubiquitine, bronnen) | bron toegevoegd: PubMed 10984418 (26S ≈ 45 nm) | onderbouwing van #6/#7. |
| 9 | `shared/details/prot2.js` (ubiquitine, bronnen) | Kisselev-link `jbc.org/article/S0021-9258(19)87955-3/fulltext` (HTTP 403) → `pubmed.ncbi.nlm.nih.gov/9920878/` (+ "274:3363") | link resolveerde niet; PubMed-abstract bevestigt "products range in length from 3 to 22 residues". |
| 10 | `shared/details/prot2.js` (glyco, bronnen) | `NBK20720` (niet te verifiëren) → `NBK579964` "Essentials of Glycobiology (4e, 2022) — N-Glycans" | NBK20720 kon via E-utilities/Europe PMC niet teruggevonden worden; NBK579964 is bevestigd (Europe PMC). |
| 11 | `shared/details/prot2.js` (ptm, how[4], NL+EN) | "Acetylatie en methylatie op Lys (en Arg)" → "Acetylatie (op Lys) en methylatie (op Lys en Arg)" | Arg wordt gemethyleerd, niet geacetyleerd; de oude zin kon zo gelezen worden. |
| 12 | `shared/details/prot2.js` (idp, bronnen) | "1KDX — KIX domain of CBP in complex with pKID of CREB" → "… CBP (mouse) … CREB (rat)" | RCSB: KIX van muis, pKID van rat. |
| 13 | `app/scenes/prot/idp.js` (`org` + `extra`, NL+EN) | "mens (voorbeeld: CREB en CBP)" → "… ; structuur 1KDX van muis/rat"; extra: "pKID van CREB (rat) … KIX-domein van CBP (muis)" | idem: de app gaat uit van een menselijke cel, maar deze structuur is niet menselijk. |
| 14 | `app/scenes/prot/golgi.js` (stap 4, label trans-cisterne) | "trans: Gal, Sia; / O-glycanen" → "trans: Gal, Sia / (ook op O-glycanen)" (+ EN) | Mucine-type O-glycosylatie (GalNAc op Ser/Thr) **begint** al in het cis-Golgi; in het trans-Golgi worden O-glycanen verder verlengd/gesialyleerd. Het oude label suggereerde dat O-glycosylatie een trans-stap is. |

Alle andere teksten zijn ongewijzigd gebleven.

---

## A · Uitlegpanelen en scènes, per knoop

### vouwing — Eiwitvouwing
| Claim | Verdict |
|---|---|
| Sequentie bevat de info voor de natieve structuur (Anfinsen); RNase A vouwt terug na ureum + β-mercapto-ethanol; Nobelprijs Scheikunde 1972 | ✅ |
| RNase A 124 residuen, 4 S–S (8 × SH); 8 M ureum; heroxidatie met O₂ na dialyse | ✅ |
| Levinthal 1969; 3¹⁰⁰ ≈ 5·10⁴⁷; bij 10¹³ vormen/s ≈ 10²⁷ jaar (5·10³⁴ s = 1,6·10²⁷ j); heelal 1,4·10¹⁰ j | ✅ (nagerekend) |
| Energietrechter, hydrofobe collaps, molten globule, co-translationele vouwing | ✅ |
| Vouwtijd µs–s | ✅ (cursus: villin in µs) |
| HP-roostermodel Lau & Dill 1989; sequentie β-globine 1–40 = `VHLTPEEKSA…LVVYPWTQR` | ✅ (vergeleken met UniProt P68871) |
| Chaperones Hsp70, TRiC | ✅ |

Wijzigingen: geen. Bronnen: PubMed 4124164 (Anfinsen), 8989315 (Dill & Chan), 21776078 (Hartl) — alle drie geresolveerd en correct.

### primair — Primaire structuur
| Claim | Verdict |
|---|---|
| β-globine 146 residuen rijp, UniProt 147 met start-Met | ✅ |
| CDS NM_000518 start `AUG GUG CAU CUG ACU CCU GAG GAG AAG UCU` → M V H L T P E E K S | ✅ |
| Sikkelcel GAG → GTG (mRNA GUG), Glu6Val (rijpe nummering) | ✅ |
| FASTA-kop `>sp|P68871|HBB_HUMAN … OS=Homo sapiens OX=9606 GN=HBB PE=1 SV=2`, 60 letters per regel | ✅ |
| Helixgrenzen A 4–18, B 19–34, C 35–41, D 50–56, E 57–76, F 85–93, G 99–117, H 123–143 | ✅ exact gelijk aan de HELIX-records van 1BBB keten B |
| C-terminus His146 | ✅ |
| Peptide tot ± 50 residuen (cursus) | ✅ (transcript 1, [00:21]) |
| 146 residuen ≈ 50 nm gestrekt (≈ 3,5 Å/residu) | ✅ |
| Sanger: vaste sequentie per eiwit | ✅ |

Wijzigingen: geen. Bron: https://www.rcsb.org/structure/1BBB (header gecontroleerd), https://www.uniprot.org/uniprotkb/P68871/entry.

### aminozuren — De 20 aminozuren
| Claim | Verdict |
|---|---|
| Namen, drie- en éénlettercodes (20 + Sec U, Pyl O) | ✅ |
| Indeling: hydrofoob G A V L I M F W P; polair S T C N Q Y; + K R (H); − D E | ✅ volgt de cursus (transcript 1, [00:13]–[00:17]); de `simplified`-tekst vermeldt terecht dat handboeken verschillen |
| His-zijketen pKa ≈ 6, + in zuur milieu | ✅ |
| Glycine achiraal; proline cyclisch imino-zuur; L-aminozuren; D-vormen niet via ribosomen | ✅ |
| Sec op UGA (SECIS), Pyl op UAG in sommige archaea/bacteriën | ✅ (cursus: "methanogene archaea") |
| Aromatisch: Phe, Tyr, Trp (en His) | ✅ (cursus noemt His ook) |
| Fischer-projectie: NH₃⁺ links = L | ✅ |

Wijzigingen: geen.

### peptide — Peptidebinding & φ/ψ
| Claim | Verdict |
|---|---|
| Condensatie, amidebinding; in de cel peptidyltransfer in het ribosoom | ✅ |
| C–N ≈ 1,32–1,33 Å; enkel ≈ 1,47 Å; dubbel ≈ 1,27 Å | ✅ (Pauling-waarden) |
| Zes atomen in één vlak; ω ≈ 180° (trans), cis vooral vóór Pro | ✅ |
| φ rond N–Cα, ψ rond Cα–C; ezelsbrug "phi heeft de N" | ✅ (cursus) |
| Ideale geometrie N–Cα 1,458, Cα–C 1,525, C–N 1,329 Å (Engh & Huber) | ✅ |
| Snelheid ≈ 5–6 bindingen/s (mens) | ✅ (≈ 5,6 aa/s, ribosome profiling) |

Wijzigingen: geen.

### secundair — Secundaire structuur
| Claim | Verdict |
|---|---|
| α-helix rechtshandig, 3,6 res./winding, 1,5 Å/res., 5,4 Å/winding, i→i+4, 100°/residu | ✅ |
| 3₁₀: i→i+3, 3 res./winding; π: i→i+5, 4,4 res./winding | ✅ (cursus) |
| φ/ψ α ≈ −60/−45, β ≈ −120/+130 | ✅ (cursus: −120/+120) |
| β-streng ≈ 3,3–3,5 Å/residu, 5–8 residuen | ✅ (cursus) |
| Rechtshandige twist, β-bulge | ✅ (cursus [00:15]–[00:16]) |
| Omega-lus 6–16 residuen; random coil > 16 | ✅ (cursus) |
| Haarspeldlus "± 2–5 residuen" | ⚠️ cursus zegt "minimum about 4–5"; 2-residu-β-turns zijn in de literatuur de meest voorkomende haarspelden. Geen tegenspraak (4–5 valt binnen 2–5), niet gewijzigd. |
| 1UBQ: helix 23–34, 3₁₀ 56–59, strengen 1–7, 10–17, 40–45, 48–50, 64–72; β1 ⇅ β2, β1 ∥ β5; gemengd 5-strengs blad; Gly10 in de haarspeld | ✅ exact volgens de HELIX/SHEET-records van 1UBQ |
| 1UBQ = mens, 1,8 Å, 76 residuen | ✅ |

Wijzigingen: geen. Bron: https://files.rcsb.org/header/1UBQ.pdb.

### ramachandran — Ramachandran-plot
| Claim | Verdict |
|---|---|
| Ramachandran, Ramakrishnan & Sasisekharan 1963 | ✅ (PubMed 13990617) |
| Toegestane gebieden: α rechts, β, α links; glycine uitzondering; proline φ ≈ −65° | ✅ |
| Goed model > 98 % in voorkeursgebieden (MolProbity) | ✅ (Lovell 2003, PubMed 12557186) |
| Hemoglobine: vooral α; β-punten in lussen (geen β-bladen) | ✅ |
| Paneeltekst "donkerblauw = voorkeur, blauw = toegestaan" | ❌ omgekeerd t.o.v. de gebruikte kleuren → verbeterd (#4) |
| NL "(voorspelde)" vs EN "(experimental or predicted)" | ⚠️ NL/EN-verschil → gelijkgeschakeld (#5) |

### tertiair — Tertiaire structuur & domeinen
| Claim | Verdict |
|---|---|
| Hydrofoob effect, H-bruggen, zoutbruggen, disulfides, liganden/metalen (heem, Zn-vinger) | ✅ (cursus [00:19]–[00:30]) |
| Motieven: HTH, vierhelixbundel, β-haarspeld, Greek key, β-sandwich, β-barrel, Rossmann, hoefijzer (α/β) | ✅ (cursus) |
| Klassen all-α, all-β, α/β, α+β; globulair/membraan/fibreus | ✅ |
| β-globine 8 helices A–H, all-α, één domein | ✅ |
| Proximale His92 (F8), distale His63 (E7) | ✅ |
| Cys93 en Cys112 in β-globine, geen S–S | ✅ |
| Myoglobine eerste structuur (Kendrew 1958) | ✅ (cursus) |
| Heempocket tussen helices E en F | ✅ |

Wijzigingen: geen.

### quaternair — Quaternaire structuur
| Claim | Verdict |
|---|---|
| HbA α₂β₂, α 141 / β 146 residuen, 4 hemen | ✅ |
| Dimeer van twee αβ-protomeren; homo-/heteromeer; naamgeving | ✅ (cursus) |
| α1β1 groot en stabiel; α1β2 kleiner, verschuift bij T ↔ R | ✅ (Silva 1992: "switch region of the critical α1β2 interface") |
| α 7 helices / β 8 helices | ✅ |
| Perutz 1959, Nobelprijs 1962 samen met Kendrew | ✅ (cursus) |
| CO bindt op dezelfde plaats, veel sterker dan O₂ | ✅ |
| HbS: Glu6Val, polymerisatie van deoxy-HbS | ✅ |
| 1BBB = "HbA met CO" | ⚠️ preciezer: de **R2**-toestand → aangevuld (#2, #3) |
| "Dezelfde niet-covalente krachten" (detailpaneel) | ⚠️ in strijd met de cursus, die ook disulfides noemt → aangepast (#1) |
| Schaal ≈ 6,5 nm | ✅ (Hb ≈ 6,4 × 5,5 × 5,0 nm) |

Bron: PubMed 1512262 (Silva, Rogers & Arnone 1992, abstract gelezen); https://www.rcsb.org/structure/2HHB (deoxy-Hb, gebruikt in graph.js-`pdb`) ✅.

### ptm — Post-translationele modificaties
| Claim | Verdict |
|---|---|
| Kinase: γ-fosfaat van ATP → Ser/Thr/Tyr-OH; fosfatase hydrolyseert; ~2 negatieve ladingen (pSer ≈ 2− bij pH 7) | ✅ |
| 518 eiwitkinasen (Manning 2002) / "~500" in de scène | ✅ (PubMed 12471243) |
| Raf → MEK → ERK; MEK fosforyleert ERK op Thr én Tyr | ✅ |
| Acetylatie/methylatie | ⚠️ formulering verduidelijkt (#11) |
| Lipidering: myristoyl (N-terminale Gly), palmitoyl/prenyl (Cys) | ✅ |
| Prolyl-4-hydroxylase: Pro + O₂ + 2-oxoglutaraat → 4-Hyp + succinaat + CO₂; Fe²⁺, ascorbaat houdt Fe gereduceerd; in het ER | ✅ |
| Collageen Gly–X–Y, elke 3e positie Gly, triple helix ≈ 300 nm; scheurbuik | ✅ (cursus [00:28]) |
| K48-keten ≥ 4 ubiquitines = afbraak | ✅ (Thrower 2000, PMC1171781) |

### ubiquitine — Ubiquitine–proteasoom
| Claim | Verdict |
|---|---|
| Ubiquitine 76 aa, ≈ 8,5 kDa, β-grasp; C-terminale Gly76; isopeptidebinding op Lys | ✅ |
| E1: Ub-adenylaat (ATP → AMP + PPᵢ), thio-ester op Cys; E2~Ub; RING direct, HECT via eigen Cys | ✅ |
| Mens: 2 E1 · ~40 E2 · > 600 E3 | ✅ |
| Tetra-ubiquitine minimaal afbraaksignaal | ✅ (Thrower 2000) |
| K63/mono-Ub: signalering (NF-κB), DNA-herstel, endocytose | ✅ (Komander & Rape 2012) |
| Rpn1, Rpn10, Rpn13 receptoren; Rpn11 DUB; Rpt1–6 AAA+ | ✅ |
| 20S α7β7β7α7; β1 caspase-achtig (na zure), β2 trypsine-achtig (na basische), β5 chymotrypsine-achtig (na hydrofobe); N-terminale Thr | ✅ |
| Peptiden 3–22 aa | ✅ (Kisselev 1999, abstract: "products range in length from 3 to 22 residues") |
| 26S ≈ 2,5 MDa; schaal "≈ 30 nm" | ⚠️ → 45 nm met twee kappen, massa verduidelijkt (#6, #7, #8) |
| PDB 5GJR = humaan 26S, cryo-EM 3,5 Å (Huang et al. 2016) | ✅ |

### chaperones — Chaperones
| Claim | Verdict |
|---|---|
| Hsp70: ATP-toestand deksel open (lage affiniteit), ADP dicht (hoge affiniteit); Hsp40/J-eiwit stimuleert hydrolyse; NEF wisselt ADP → ATP | ✅ (Hartl 2011) |
| GroEL 2 × 7 × ~57 kDa, GroES 7 × ~10 kDa; 7 ATP per ring; kooi hydrofiel, ~10 s, substraat tot ~60 kDa; ATP-binding aan trans-ring opent | ✅ |
| TRiC/CCT 2 × 8 verschillende subeenheden, ingebouwd deksel | ✅ |
| Hsp90: kinasen, steroïdreceptoren; CHIP als E3 | ✅ |
| Cytosol ~300–400 g/L macromoleculen | ✅ (Hartl 2011) |
| PDB 1AON = GroEL–GroES–(ADP)₇, E. coli, 3,0 Å | ✅ |

### glyco — N-glycosylatie
| Claim | Verdict |
|---|---|
| Glc₃Man₉GlcNAc₂ (14 suikers) op dolichol-PP, en bloc op Asn in N-X-S/T (X ≠ Pro) | ✅ |
| OST: STT3A co-translationeel, STT3B ook later | ✅ (PMC9496733) |
| Glucosidase I/II, calnexine/calreticuline (Glc₁), UGGT-cyclus, ER-mannosidase I, ERAD | ✅ (Essentials of Glycobiology, "Glycans in Glycoprotein Quality Control", NBK453081 bevestigd) |
| Golgi: complexe glycanen (GlcNAc, Gal, Sia, Fuc); O-GalNAc begint in het Golgi | ✅ |
| SNFG-kleuren/symbolen | ✅ |
| Bron NBK20720 | ⚠️ niet verifieerbaar → vervangen (#10) |

### disulfide — Disulfidebruggen
| Claim | Verdict |
|---|---|
| Oxidatie 2 Cys-SH → S–S + 2 H⁺ + 2 e⁻; S–S ≈ 2,05 Å | ✅ |
| PDI a–b–b′–a′, 2 × CGHC; Ero1 via FAD → O₂ → H₂O₂; isomerisatie door gereduceerde PDI; PRDX4 als alternatieve route | ✅ (PMC7316501) |
| GSH:GSSG ER ≈ 1:1–3:1, cel ≈ 30:1–100:1 | ✅ (Hwang, Sinskey & Lodish 1992, PubMed 1523409) |
| Insuline A6–A11, A7–B7, A20–B19; A 21 aa, B 30 aa; uit proinsuline | ✅ |
| "enige veelvoorkomende covalente interactie tussen zijketens" (cursus) | ✅ (transcript 3, [00:26]) |

### golgi — Golgi & secretie
| Claim | Verdict |
|---|---|
| COPII (ER → Golgi), ERGIC, COPI retrograad, KDEL-receptor; BiP en PDI dragen KDEL | ✅ |
| Cisternale rijping als huidige consensus, vesiculair transport komt ook voor | ✅ (Glick & Luini 2011, PubMed 21875986) |
| M6P (GlcNAc-fosfotransferase in cis), M6P-receptor, clathrine, zuur endosoom; I-cell disease | ✅ |
| pH endosoom ≈ 6, lysosoom ≈ 4,5–5 | ✅ |
| Constitutieve vs gereguleerde (Ca²⁺) secretie; insulinegranules | ✅ |
| ~⅓ van de eiwitten via de secretieroute; stapel 4–8 cisternen; ER → PM tientallen minuten | ✅ |
| Label "trans: … O-glycanen" | ⚠️ → verduidelijkt (#14) |

### misvouwing — Misvouwing & aggregatie
| Claim | Verdict |
|---|---|
| Cross-β: strengen ⟂ fibrilas, ≈ 4,7 Å; bladen ≈ 10 Å; steric zipper; fibril ≈ 10 nm breed | ✅ |
| Nucleatie-afhankelijke kinetiek (lag, groei, plateau; seeding); secundaire nucleatie vermeld | ✅ (Chiti & Dobson 2017) |
| Aβ/tau (Alzheimer), α-synucleïne (Parkinson, Lewy), IAPP (T2D), PrP (CJD); oligomeren toxisch; functioneel amyloïd | ✅ |
| PrPSc als mal, PrPC α-rijk | ✅ |
| UPR: BiP-dissociatie; IRE1 → XBP1s; PERK → eIF2α-P; ATF6 → Golgi-splitsing | ✅ (Walter & Ron 2011) |
| PDB 2BEG = Aβ(1–42)-fibril, NMR (Lührs et al. 2005, mens) | ✅ |

### idp — Intrinsiek ongeordende eiwitten
| Claim | Verdict |
|---|---|
| IDR arm aan orde-bevorderende grote hydrofobe residuen, rijk aan geladen/polair, Pro, Gly, Ser | ✅ |
| Uversky-grens ⟨H⟩ = (⟨R⟩ + 1,151)/2,785 | ✅ (Uversky 2000, PubMed 11025552) |
| Telling voorbeeldsequenties: 14/25 hydrofoob; 0 hydrofoob, 11 geladen | ✅ (nageteld) |
| pLDDT < 50, geen elektronendichtheid, weinig verspreide NMR-pieken | ✅ |
| CREB-KID, PKA → Ser133; ontmoetingscomplex, dan twee helices (αA, αB) op KIX | ✅ (Sugase 2007, PubMed 17522630) |
| ≈ 33 % eukaryote eiwitten met IDR > 30 aa; bacteriën ≈ 4 % | ✅ (Ward 2004, PubMed 15019783) |
| p53-TAD als helix op MDM2 (1YCR, mens) | ✅ |
| 1KDX = "mens" | ⚠️ structuur is muis-KIX + rat-pKID → vermeld (#12, #13) |
| IDP's in het laatste hoofdstuk van de cursus | ✅ (transcript 3, [00:03]) |

---

## B · Knoopsamenvattingen (`graph.js` / `graph.en.js`)

Alle 16 prot-knopen (`aminozuren`, `peptide`, `primair`, `secundair`, `ramachandran`, `tertiair`, `quaternair`, `vouwing`, `chaperones`, `ptm`, `glyco`, `disulfide`, `golgi`, `ubiquitine`, `misvouwing`, `idp`): NL en EN inhoudelijk gelijk en feitelijk correct ✅. Kleine opmerking: `ramachandran` noemt β "rond −120/+120" (zoals de cursus), de scènes "−120/+130" — beide binnen het β-gebied, geen tegenspraak. `quaternair.pdb` = 1BBB en 2HHB (deoxy-HbA, Fermi & Perutz 1984) ✅.

---

## C · Atlas (`atlas/entries.js`)

Alle 27 PDB-codes opgehaald via `https://data.rcsb.org/rest/v1/core/entry/<ID>`; titel, methode, resolutie, primaire publicatie en (waar relevant) sequentie/organisme via `polymer_entity` vergeleken met de tekst.

| id | PDB | RCSB-controle | Inhoud | Verdict |
|---|---|---|---|---|
| bdna | 1BNA | B-DNA-dodecameer, X-ray 1,9 Å, Drew 1981 PNAS 78:2179 | ~10,5 bp/winding, twist 34–36°, 3,4 Å, 20 Å, C2′-endo, buiging ~19°, hydratatieruggengraat | ✅ |
| adna | 440D | d(AGGGGCCCCT), 1,1 Å, Gao 1999 EJB 261:413 | 11 bp, 2,6 Å, 23 Å, C3′-endo, P–P 5,9 vs 7 Å (cursus) | ✅ |
| zdna | 1DCG | d(CGCGCG), 1,0 Å, Gessner 1989 JBC 264:7921 | linkshandig, −9°/−51°, G syn/C3′-endo, C anti/C2′-endo, 3,7 Å, 18 Å | ✅ |
| zalpha | 1QBJ | Zα (ADAR1, mens) + d(TCGCGCG), 2,1 Å, Schwartz 1999 | winged HTH, conformatiespecifiek | ✅ |
| g4 | 1KF1 | d[AG₃(T₂AG₃)₃], 2,1 Å, Parkinson 2002 | parallel, K⁺ met 8 × O6, alle G anti; BG4 (Biffi 2013) | ✅ |
| g4basket | 143D | NMR, Na⁺, Wang & Patel 1993 | basket, syn/anti-afwisseling | ✅ |
| imotif | 1EL2 | NMR, 22-mer met één 5-meC en één U, Phan 2000 | C·C⁺, zure pH; iMab 2018 | ✅ |
| triplex | 1BWG | NMR; keten C = CTCTCT; Asensio 1999 | T·A–T, C⁺·G–C, parallel aan purinestreng | ✅ |
| holliday | 1DCW | d(CCGGTACCGG)₄, 2,1 Å, Eichman 2000 | gestapelde X; GEN1, SLX1–SLX4–MUS81, BTR | ✅ |
| netropsin | 6BNA | netropsine + dodecameer met BrC, 2,2 Å, Kopka 1985 | kleine groef AATT, N3(A)/O2(T) | ✅ |
| intercalator | 1D11 | daunomycine + d(CGTACG), 1,18 Å, Wang 1987 | intercalatie ~6,8 Å; topo II-vergif | ✅ |
| cisplatin | 1AIO | 2,6 Å, Takahara 1995 Nature 377:649 | 1,2-d(GpG), N7, knik naar grote groef, HMG, NER | ✅ / ⚠️ "~40°": de twee duplexen in het kristal verschillen (± 39–55° in de volledige analyse); orde van grootte juist, niet gewijzigd |
| dsrna | 1RNA | UUAUAUAUAUAUAA = U(UA)₆A, 2,25 Å, Dock-Bregeon 1989 | A-vorm, 11 bp; MDA5/RIG-I/PKR; rotavirus (klasse III) | ✅ |
| hybrid | 479D | r(GAAGAAGAG)·d(CTCTTCTTC), 1,9 Å, Xiong 2000 | A-achtig, RNase H | ✅ |
| tar | 1ANR | NMR, 29 nt, Aboul-ela 1996 | bulge U23-C24-U25, 6-nt lus, Tat/P-TEFb | ✅ (nummering nagerekend) |
| trna | 1EHZ | tRNA^Phe gist 1,93 Å, Shi & Moore 2000 | L-vorm, ~75 Å, eerste RNA-structuur 1974 | ✅ |
| pseudoknot | 437D | BWYV, 1,6 Å, Su 1999 | kleine-groeftriplex, −1-frameshift; SARS-CoV-2 drie stammen, HIV-1 haarspeld | ✅ |
| terc | 1YMO | NMR, 47 nt, Theimer 2005 | U·A–U-tripletten, dyskeratosis congenita | ✅ |
| hammerhead | 2OEU | S. mansoni, Mn²⁺, 2,0 Å; substraat met OMC | 2′,3′-cyclisch fosfaat + 5′-OH | ✅ |
| groupi | 1U6B | Azoarcus, beide exonen, 3,1 Å, Adams 2004 | U1A als kristallisatiehulp; Cech 1989 | ✅ |
| rnasep | 3Q1Q | T. maritima holo-enzym + tRNA, 3,8 Å, Reiter 2010 | H1-RNA + ~10 eiwitten (mens), PRORP | ✅ |
| riboswitch | 1Y26 | V. vulnificus add-riboswitch, 71 nt, 2,1 Å, Serganov 2004 | U74, AAN-schakelaar translatie | ✅ |
| ribosome | 1J5E | T. thermophilus 30S, 16S (1522 nt) + 20 eiwitten, 3,05 Å | G530/A1492/A1493; mens 18S ~1870 nt, 33 eiwitten | ✅ |
| mirna | 4W5N | humaan AGO2 + gids-RNA, 2,9 Å, Schirle 2014 | seed 2–8, PIWI slicing | ✅ |
| snrna | 4PJO | minimal U1 snRNP, 3,3 Å, Kondo 2015 | Sm-ring, U1-70K, U1-C | ✅ |
| nucleosome | 1KX5 | NCP147, 1,94 Å; DNA mens (α-satelliet), histonen Xenopus | 147 bp, 1,65 windingen | ✅ |
| ssdna | 1JMC | RPA70 (mens) + dC₈, 2,4 Å, Bochkarev 1997 | OB-folds, stapeling met Phe/Trp; ATR | ✅ |
| mrna, premrna, mtdna, plasmid, cdna, lncrna, tdna | — (diagram) | — | cap 1, Kozak, poly(A) 200–250; GU–AG, branchpunt; mtDNA 16 569 bp, 37 genen (13/2/22), 28 genen via HSP, ND6 + 8 tRNA via LSP, mt-code; LINE-1 ~17 %; XIST ~17 kb; GENCODE ~20 000 lncRNA-genen; T-DNA 25-bp-grenzen, VirD2 | ✅ |

Atlasbronnen: alle DOI's/PMID's horen bij de juiste publicatie (zelfde auteurs/tijdschrift/volume/pagina als de RCSB-primaire citaties). Wijzigingen aan de atlas: **geen**. Headless-controle `atlas/index.html?id=bdna`: geen `Uncaught`-fouten.

---

## D · Afstemming op de cursus

- Aminozuurindeling, aromaten (incl. His), Sec/Pyl, L/D, peptidegrens ± 50, planaire peptidebinding, φ/ψ-ezelsbrug: in overeenstemming.
- Helixparameters (3,6 / i+4; 3₁₀ i+3; π 4,4 / i+5), β-strengen 5–8 residuen, twist, bulge, lussen (omega 6–16, random coil > 16): in overeenstemming. Haarspeld: zie ⚠️ bij secundair.
- Tertiair: hydrofoob effect als dominante kracht, H-bruggen, zoutbrug = ionpaar met netto lading 0, disulfide als covalente uitzondering, hydroxyproline in collageen, Zn-vinger (Cys/His), motieven en klassen: in overeenstemming.
- Quaternair: cursus noemt ook disulfidebruggen → detailpaneel aangepast (#1).
- Jaartallen Kendrew 1958, Perutz 1959, Nobel 1962, Ramachandran 1963: in overeenstemming (de cursus zegt dat jaartallen geen examenstof zijn).
- IDP's als laatste hoofdstuk: in overeenstemming.
- DNA/RNA-kernpunten (A/B/Z-parameters, 440D, 1BNA, 1DCG, 6BNA, 143D/1KF1, 1EHZ, ribozymen, 16S/23S): de atlas spreekt ze nergens tegen.

---

## E · Visuele opmerkingen (niet aangepast)

- `ramachandran.js`: de tekstfout over de blauwtinten is verbeterd; overweeg in de legenda "voorkeursgebied" en "toegestaan gebied" iets meer contrast te geven, want beide blauwen liggen dicht bij elkaar.
- `ubiquitine.js`: het proteasoom wordt met één 19S-kap getekend (staat al in `simplified`); de nieuwe schaaltekst noemt expliciet "met twee 19S-kappen".
- `misvouwing.js`: de NL-titel "Misvouwing & aggregatie" en de EN-titel "Misfolding & amyloid" verschillen licht in nadruk (ook in `graph.js`); inhoudelijk geen probleem.

---

## F · Lijsten

**Prot-knopen die op `nagekeken` kunnen** (alle 16):
`aminozuren`, `peptide`, `primair`, `secundair`, `ramachandran`, `tertiair`, `quaternair`, `vouwing`, `chaperones`, `ptm`, `glyco`, `disulfide`, `golgi`, `ubiquitine`, `misvouwing`, `idp`.

**Open punten**
1. `shared/details/prot.js`: de ankerlinks `NBK26830/box/A393/` (Panel 3-1) en `NBK26830/figure/A390/` (peptidebinding) konden door de NCBI-captcha niet geopend worden. Panel 3-1 bestaat wel in NBK26830 (E-utilities); controleer de ankers eens in een browser.
2. Cisplatine-knik (atlas `cisplatin`): "~40°" is de ondergrens van het bereik tussen de twee duplexen in het kristal; eventueel "~40–55°" schrijven als de volledige Takahara-analyse (JACS 1996) bevestigd wordt.
3. Haarspeldlussen: app "± 2–5 residuen" tegenover cursus "minimum 4–5" — geen tegenspraak, maar de docent kan het anders formuleren; eventueel "2–5 (vaak 2)" of cursusformulering volgen.
4. `graph.js`: de status wordt door de `CHECKED`-set bepaald; de 16 prot-knopen hierboven zijn nog niet toegevoegd (buiten de opdracht van deze ronde).
