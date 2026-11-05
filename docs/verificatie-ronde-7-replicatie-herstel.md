# Verificatieronde 7 — zijpad "DNA kopiëren en herstellen" (05-11-2026)

Nagekeken: de zes nieuwe knopen `origins`, `mmr`, `ber`, `ner`, `dsb`, `p53` (graph.js, graph.en.js, shared/details/repl2.js, scènes in app/scenes/repl/), het herwerkte overzicht `herstel` en de overgangszinnen van de verhaallijn `herstel` (app/story.js).
Methode: elke bewering in kort/what/how/facts/why, in de stapteksten, labels en `simplified` vergeleken met de bron in `sources` (opgehaald op 05-11-2026). PDB-ID's gecontroleerd via `https://data.rcsb.org/rest/v1/core/entry/<ID>`; ketens, residuen en contacten nagekeken in de coördinatenbestanden zelf.
Opmerking: NCBI Bookshelf (Alberts) gaf bij ophalen een reCAPTCHA; de Bookshelf-hoofdstukken blijven als achtergrondbron staan (in eerdere rondes nagekeken), maar elke bewering hieronder is gedekt door een PMC/PubMed/RCSB-bron die wel gelezen is.

## PDB-structuren

| ID | RCSB-titel | Methode | Gebruik | Nagekeken in het bestand |
|---|---|---|---|---|
| 7W1Y | Human MCM double hexamer bound to natural DNA duplex (polyAT/polyTA) | cryo-EM 2,59 Å | `origins` (3D) | ketens 2–7 = ring 1, A–F = ring 2 (entiteit 1–6 = MCM2–MCM7), O/S = DNA; zwaartepunten ring 1 z ≈ 170 Å, ring 2 z ≈ 272 Å. Lokaal ingekort tot CA/P (68 655 → 8 232 atomen, alt. conformatie A), 0,8 MB |
| 2O8B | human MutSalpha (MSH2/MSH6) bound to ADP and a G T mispair | röntgen 2,75 Å | `mmr` (3D) | A = MSH2, B = MSH6 (362–1335), E/F = DNA; enige mispaar G E8 · T F23; Phe432 (B) binnen 4 Å van E7, E8, F23, F24 |
| 1EMH | Crystal structure of human uracil-DNA glycosylase bound to uncleaved substrate-containing DNA | röntgen 1,8 Å | `ber` (3D) | A = UDG 82–304, B5 = P2U (2'-deoxypseudo-uridine, niet knipbaar) uit de helix geklapt; holte: Gln144–Tyr147, Cys157, Phe158, Pro167–Ser169, Asn204, His268 |
| 1JEY | Crystal Structure of the Ku heterodimer bound to DNA | röntgen 2,5 Å | `dsb` (knop naar de atlas, `?pdb=1JEY`) | A = Ku70, B = Ku80, C/D = DNA |
| 1TUP | Tumor suppressor p53 complexed with DNA | röntgen 2,2 Å | `p53` (3D + knop naar de atlas) | A/B/C = kerndomeinen; B maakt de meeste DNA-contacten (K120, S241, R248, R273, A276, C277, R280); zink per keten, liganden C176, H179, C238, C242 |

## Beweringen per knoop

### origins (Startplaatsen) — Blow & Hodgson 2002 (PMC3604914), Burgers & Kunkel 2017 (PMC5597965), Li et al. 2023 (PubMed 36608662)
- ✅ Licentie alleen in late mitose en G1 (lage CDK); in S, G2 en vroege mitose kan geen MCM2-7 meer geladen worden; een gevuurde origin verliest haar MCM — Blow.
- ✅ ORC + Cdc6 + Cdt1 laden twee MCM2-7-hexameren als symmetrische dubbelhexameer rond dsDNA (inactief) — Burgers.
- ✅ DDK (Cdc7–Dbf4) en CDK; Mcm10 (en RPA) zetten de dubbelhexameer om in CMG = Cdc45 + MCM2-7 + GINS; CMG is een 3'→5'-helicase op de matrijs van de leidende streng — Burgers.
- ✅ "Duizenden" origins — Blow ("thousands of replication origins").
- ✅ In 7W1Y is het DNA op de junctie ontwonden, met één volledig gescheiden basenpaar — Li et al. (abstract).
- 🔧 Stap 2-tekst "ring met een gat in het midden" vervangen door "ring rond het DNA" (in de zijaanzicht-3D was het gat niet zichtbaar).
- 🔧 Schaal gemeten in het bestand (≈ 24 nm met DNA) i.p.v. een geschatte 25 nm.

### mmr — Kunkel & Erie 2015 (PMC5439269), Burgers & Kunkel 2017, Warren et al. 2007 (PubMed 17531815)
- ✅ Drie stappen: basenselectie, proeflezen, MMR; vóór proeflezen ≈ 1 fout per 10⁴–10⁵ (in vitro) — Kunkel.
- ✅ Pol ε en Pol δ hebben een 3'-exonuclease (proeflezen) — Burgers.
- ✅ MutSα herkent base-base- en indel-mispaar; MutSα wordt een klem die langs het DNA beweegt; knikt het DNA bij de fout — Kunkel. (⚠️ nuance: "zoekt/scant" is voor MutS-homologen beschreven; de stap zegt "glijdt over het DNA en zoekt foute paren", aanvaardbaar als vereenvoudiging.)
- ✅ PCNA (geladen door RFC) activeert MutLα, dat de nieuwe streng inknipt; strengherkenning via onderbrekingen (Okazaki-uiteinden) en oriëntatie van PCNA; EXO1 5'→3' of strengverdringing door Pol δ; Pol δ + ligase — Kunkel.
- ✅ Gemiddelde MMR-efficiëntie ≈ 99 % → "≈ 100× minder fouten" — Kunkel.
- ✅ MutSα-inactivatie bij ongeveer de helft van de bekende HNPCC(Lynch)-families — Warren (abstract).
- ✅ Phe432 van MSH6 tegen het mispaar: nagekeken met een contactanalyse in 2O8B (zie tabel); niet in de abstract van Warren, wel in de structuur zelf.
- 🔧 "Echte duur: seconden tot minuten" (geen bron) vervangen door "vlak achter de kopieervork"; schaal "≈ 250 kDa" vervangen door de gemeten ≈ 14 nm.

### ber — Krokan & Bjørås 2013 (PMC3683898), Parikh et al. 2000 (PMC25785)
- ✅ Spontane deaminatie C → U; U·G geeft zonder herstel C:G → T:A; glycosylasen klappen de base uit de helix en knippen de N-glycosidische binding (AP-plaats); APE1 knipt 5' van de AP-plaats; Pol β zet 1 nt en verwijdert 5'-dRP; ligase IIIα–XRCC1 of ligase I; korte patch 1 nt, lange patch 2–10 nt — Krokan.
- ✅ UNG is veruit het efficiëntste (turnover) glycosylase — Krokan.
- 🔧 "≈ 11 soorten bij de mens" → "minstens 11 bij zoogdieren" (Krokan: "At least 11 distinct mammalian DNA glycosylases").
- 🔧 `simplified`: "mitochondriale en kernvorm gelijk" (niet zo in de bron) → "verschillen alleen in het begin van de keten" (Krokan: alternatieve N-terminale sequenties).
- ✅ 1EMH: substraatanaloog, de base volledig uitgeklapt — Parikh (abstract) en het bestand.

### ner — Schärer 2013 (PMC3783044), Reardon & Sancar 2002 (PMC133982)
- ✅ UV-letsels (CPD, 6-4PP) en omvangrijke adducten; GG-NER via XPC–RAD23B (soms UV-DDB); TC-NER via vastgelopen RNA-pol II met CSA, CSB, XAB2; TFIIH (XPB) opent; XPA; RPA op de gave streng plaatst ERCC1–XPF en XPG; eerst 5'-incisie (ERCC1–XPF), dan 3' (XPG); Pol δ/ε/κ met PCNA; ligase IIIα–XRCC1 of ligase I; XP: > 2 000× meer huidkanker — Schärer.
- ✅ Uitgeknipt stuk 24–32 nt — Reardon & Sancar.
- 🔧 "TFIIH heeft tien subeenheden" (niet in de gelezen bron) geschrapt; "zoals cisplatine" → "sommige chemotherapieën" (Schärer); "minuten tot uren per letsel" (geen bron) → "één letsel, stap voor stap (vertraagd)".

### dsb — Chang et al. 2017 (PMC7062608), Mao et al. 2008 (PMC2695993), Sullivan & Bernstein 2018 (PMC6316741), Walker et al. 2001 (PubMed 11493912)
- ✅ NHEJ overheerst in de hele celcyclus (in G1 > 50× boven andere routes); NHEJ : HR ≈ 4 : 1 in S/G2; Ku bindt uiteinden en roept factoren op; DNA-PKcs activeert Artemis; XRCC4–ligase IV, met XLF/PAXX; vaak verlies van enkele nucleotiden; NHEJ in V(D)J-recombinatie — Chang.
- ✅ NHEJ ≈ 30 min, HR ≥ 7 uur — Mao (abstract).
- ✅ HR in S/G2 met de zusterchromatide; resectie door MRN/CtIP met EXO1 of BLM–DNA2; RPA bedekt de 3'-staarten, RAD51 verdringt RPA; BRCA2 brengt RAD51 op ssDNA; RAD51-filament zoekt homologie en dringt binnen (D-lus); bij SDSA dringt één uiteinde binnen; HR is "high-fidelity"; BRCA1/2 ↔ borst- en eierstokkanker; DSB = "one of the most toxic lesions" — Sullivan.
- ✅ Ku: voorgevormde ring rond dsDNA, steunt ≈ 2 windingen, geen contact met de basen — Walker (abstract).
- 🔧 "PARP-remmers" (geen bron in de lijst) geschrapt; "SDSA = de gewone route in lichaamscellen" (niet gedekt) → "HR-variant waarbij één uiteinde binnendringt"; "het gevaarlijkste letsel" → "een van de gevaarlijkste letsels" (ook in de overgangszin); "zonder fouten / geen fouten" → "nauwkeurig" (bron: high-fidelity, niet foutloos); resectielengte "honderden tot duizenden nt" (geen getal in de bron) → "veel langer".

### p53 — Gnanasundram et al. 2021 (PMC8465283), Kumari et al. 2014 (PMC4904996), Kandoth et al. 2013 (PMC3927368), Olivier et al. 2010 (PMC2827900), Cho et al. 1994 (PubMed 8023157), Lane 1992 (PubMed 1614522)
- ✅ MRN → ATM bij DSB; RPA-ssDNA → ATR; CHK1/CHK2; fosforylering van p53 op Ser15 door ATM/ATR; MDM2 laat p53 normaal ubiquitineren en afbreken; p53 zet p21 aan → stop in G1 voor herstel; bij zware schade senescentie of apoptose (BAX, NOXA, PUMA) — Gnanasundram.
- ✅ S15/S20-fosforylering verbreekt de p53–MDM2-binding; tetramervorming — Kumari.
- ✅ TP53 = het vaakst gemuteerde gen in de pan-kankercohort (42 % van de stalen) — Kandoth.
- 🔧 Opdracht vermeldde "> 50 % van de tumoren": dat klopt niet volgens de bron. Olivier: 38–50 % in o.a. eierstok-, slokdarm-, darm-, hoofd-hals- en longkanker, tot ≈ 5 % in andere. Gebruikt: "vaakst gemuteerde gen" (Kandoth, 42 %) en "per kankertype ≈ 5 % tot 38–50 %".
- ✅ Meestal missense; 87,9 % missense in codons 125–300; contactmutanten R248, R273; structurele R175, G245, R249, R282 — Olivier.
- ✅ Kerndomein: lus-blad-helixmotief in de grote groef, een arginine in de kleine groef (R248, bevestigd door contactanalyse in 1TUP), zink houdt twee lussen bij elkaar — Cho (abstract) + bestand.
- ✅ "Guardian of the genome" — Lane 1992.
- 🔧 "Echte duur: binnen uren" (geen bron) → "na DNA-schade".

### herstel (overzicht) en overgangszinnen
- ✅ Rijen kopieerfout → MMR, één letter → BER, UV-bult → NER (± 30 letters = 24–32 nt), breuk → NHEJ/HR; ziekten XP (NER), Lynch (MMR), BRCA1/2 (HR) — zelfde bronnen als hierboven en de bestaande uitleg van `herstel`.
- 🔧 `kort` vereenvoudigd; "duizenden keren per dag" weggelaten (het getal ≈ 10 000 AP-plaatsen staat al met bron in de feiten).

## Resultaat
- 6 nieuwe knopen nagekeken; 17 correcties doorgevoerd (🔧), 1 nuance (⚠️) aanvaard.
- Status: `origins`, `mmr`, `ber`, `ner`, `dsb`, `p53` → **nagekeken** (CHECKED in shared/graph.js). `herstel` was al nagekeken.
