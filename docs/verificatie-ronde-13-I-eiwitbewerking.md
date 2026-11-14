# Verificatieronde 13 — pakket I "eiwitbewerking" (14-11-2026)

**Bereik.** Knopen `ptm`, `ubiquitine`, `chaperones`, `glyco`, `disulfide`, `golgi`, `misvouwing`, `idp`:
`shared/details/prot2.js` (kort, what, how, facts, why, woorden tussen `[[…]]`, sources), de scènes
`app/scenes/prot/{ptm,ubiquitine,chaperones,glyco,disulfide,golgi,misvouwing,idp}.js` (titels, stapteksten, alle labels,
legend, scale, time, org, simplified, extra, en de feiten in de tekening) en de hulpbestanden `_b_kit.js` (tekent geen eigen
feiten behalve kleuren: fosfaat rood = negatief, SNFG-suikerkleuren — beide correct) en `part_b.js` (alleen import).
Daarnaast de knoopsamenvattingen in `shared/graph.js` / `shared/graph.en.js` en de korte stapnamen in `shared/steptags.js`.

**Methode.** Elke uitspraak in NL en EN gelezen en naast een gelezen bron of een eigen meting gelegd.
- PubMed-metadata (esummary) van alle 15 PubMed-bronnen gecontroleerd: auteurs, jaar, tijdschrift, volume en pagina's kloppen.
- Samenvattingen gelezen (efetch): Manning 2002, Olsen 2006, Komander & Rape 2012, Bard 2018, Mochida 2000 (26S ≈ 45 nm),
  Kisselev 1999 (3–22 aa), Hartl 2011, Hwang 1992 (GSH:GSSG), Walter & Ron 2011, Chiti & Dobson 2017, Sugase 2007, Ward 2004,
  Uversky 2000, Zimmerman & Trach 1991, Zielinska 2010, Fuhs 2015, Storry & Olsson 2009, Eklund & Freeze 2006, Coutinho 2012,
  Mindell 2012, Maji 2009, Bateman 2012, Gerber & Südhof 2002.
- Volledige tekst gelezen (PMC): Bard 2018, Horwich 2009 (GroEL), Mayer & Bukau 2005 (Hsp70), Gestaut 2019 (TRiC), Lamriben 2016
  (calnexinecyclus), Stanley 2011 (Golgi-glycosylering), STT3A/B-studie (PMC9496733), ERO1–PDI-review (PMC7316501), Braakman & Hebert
  2013, Glick & Luini 2011, Klumperman 2011, Hu 2015, Williams 2024, Buetow & Huang 2016, Stewart 2016, Swatek & Komander 2016,
  Kisselev 2012, Lu 2015, Gorres & Raines 2010, Shoulders & Raines 2009, Jiang 2018 (lipidering), Bannister & Kouzarides 2011,
  Kiyatkin 2020, Iadanza 2018, Eisenberg & Jucker 2012, Zamarra 2024, Hetz 2020, Wright & Dyson 2015, Tunyasuvunakool 2021, Maiti 2024;
  PDB-101 Molecule of the Month (proteasoom, Hsp90, insuline).
- NCBI Bookshelf (Alberts, Essentials of Glycobiology, StatPearls) gaf een captcha: die bronnen blijven staan, maar elke uitspraak
  die erop steunde is nu ook gedekt door een gelezen artikel dat hetzelfde zegt.
- PDB-controle via RCSB (entry + polymer_entity): 1AON (GroEL 14 ketens A–N, GroES 7 ketens O–U, *E. coli*), 5GJR (humaan 26S,
  twee kappen, 2,57 MDa), 2BEG (humaan Aβ1–42, NMR, 5 ketens), 1KDX (KIX muis + pKID rat, NMR), 1YCR (MDM2 mens + p53-peptide), 1UBQ (mens, 76 aa).
- Eigen metingen met Python: 1AON Cα-afmetingen 19,1 × 13,8 nm; humane PDI 4EKZ/4EL1 grootste afstand 8,4–8,9 nm;
  humane insuline 3I40: S–S 2,03–2,04 Å, paren A6–A11, A7–B7, A20–B19, A-keten 21 aa, B-keten 30 aa; ubiquitine (sequentie 1UBQ) 8 565 Da, K48/K63 = Lys, C-term Gly76.
- Telling in de figuur: IDP-sequenties (14/25 hydrofoob; 0 hydrofoob en 11 geladen) en de ligging van de punten t.o.v. de Uversky-grens kloppen.
- Scène `glyco` stap 1 en 3 na de correctie bekeken in de app (localhost).
- De eerdere verslagen (rondes 1–5, 8) pas daarna gelezen; geen conclusies overgenomen.

## ptm — Post-translationele modificaties
- ✅ 518 eiwitkinasegenen bij de mens — Manning 2002 (samenvatting). "~500" in de figuur klopt.
- ✅ Fosforylatie op Ser/Thr/Tyr met γ-fosfaat van ATP, ≈ 2− bij pH 7, fosfatasen draaien om; MEK fosforyleert ERK op Thr én Tyr; Raf → MEK → ERK-cascade.
- ❌ Feit "Gefosforyleerde residuen: Ser, Thr, Tyr (in eukaryoten)" was te absoluut: ook histidine wordt bij zoogdieren gefosforyleerd — Fuhs 2015. → "vooral Ser, Thr en Tyr (ook His)".
- ✅ Acetylatie neutraliseert de lading van Lys; methylatie verandert de lading niet; Lys me1/2/3, Arg me1/me2; donor SAM — Bannister & Kouzarides 2011 (nieuw toegevoegd).
- ✅ Lipidering: myristoyl op N-terminaal Gly, palmitoyl en prenyl op Cys — Jiang 2018 (nieuw).
- ✅ Prolyl-4-hydroxylase in het ER-lumen; Fe²⁺, O₂, 2-oxoglutaraat → succinaat + CO₂; ascorbaat houdt het ijzer in de Fe²⁺-vorm; tekort → scheurbuik — Gorres & Raines 2010 (nieuw).
- ✅ Gly–X–Y, elke derde Gly, ProHypGly meest voorkomend, triple helix ~300 nm — Shoulders & Raines 2009 (nieuw).
- 🔧 `time` "ms (fosforylatie) tot min (cascade)": geen bron voor "ms" → "minuten: na EGF piekt actief ERK na ~5 min (gekweekte cellen)" — Kiyatkin 2020 (nieuw).
- ✅ Kaarten, legenda, versterking 1 → 3 → 6 (als illustratief benoemd in `simplified`), 2 fosfaten op MEK en op ERK.

## ubiquitine — Ubiquitine–proteasoom
- ✅ 2 E1 · ~40 E2 · > 600 E3 — Buetow & Huang 2016 ("two E1s, approximately 38 E2s and over 600 E3s"), Stewart 2016 (~40 E2's).
- ✅ E1-adenylering (AMP + PPᵢ) en thio-ester, RING direct vs HECT via eigen Cys, isopeptidebinding Gly76–Lys — Buetow & Huang 2016.
- ✅ Rpn1/Rpn10/Rpn13 als receptoren, Rpn11 knipt de keten af, Rpt1–6, ongevouwen startstuk nodig — Bard 2018.
- ✅ β1 caspase-, β2 trypsine-, β5 chymotrypsine-achtig; N-terminale Thr; 4 ringen — Kisselev 2012 (nieuw).
- ✅ 26S ≈ 45 nm (Mochida 2000), ≈ 2,5 MDa (5GJR: 2,57 MDa), peptiden 3–22 aa (Kisselev 1999).
- 🔧 "Minimaal afbraaksignaal: tetra-ubiquitine" en "keten van minstens ~4" zijn achterhaald als harde regel: meerdere korte (di-)ketens zijn een even goed of beter signaal — Lu 2015, Swatek & Komander 2016. → "klassiek ~4; ook meerdere korte ketens werken".
- 🔧 Stap 6 "K48 betekent afbraak. Andere kettingen … iets anders" → "meestal / vaak"; details: K63 en mono-ubiquitine "meestal" niet-afbrekend, ook K11 kan naar afbraak leiden — Swatek & Komander 2016.
- 🔧 Ubiquitine "≈ 8,5 kDa" → 8,6 kDa (eigen berekening 8 565 Da).
- 🔧 `time` "seconden tot minuten per eiwit" (geen bron) → "één eiwit (securine) gaat in ~10 s het proteasoom in" — Lu 2015 (nieuw).
- ✅ K63: NF-κB-signalering, DNA-herstel, endocytose — Swatek & Komander 2016, Stewart 2016.

## chaperones — Chaperones
- ✅ Hsp70: ATP-toestand lage affiniteit/snelle uitwisseling, ADP-toestand hoge affiniteit; J-eiwit (Hsp40) brengt substraat en versnelt ATP-hydrolyse; NEF — Mayer & Bukau 2005 (nieuw).
- ✅ GroEL 2 × 7, GroES 7 × 10 kDa, hydrofiele kooi, ~10 s, substraten ~20–60 kDa, ATP aan de trans-ring opent de kooi — Horwich 2009; 1AON-ketens nagekeken.
- ✅ TRiC/CCT 2 × 8 verschillende subeenheden, ingebouwd deksel — Gestaut 2019 (nieuw). Hsp90-cliënten kinasen en steroïdreceptoren — PDB-101. CHIP als E3 — Mayer & Bukau, Buetow & Huang.
- ❌ Label "cytosol: ~300–400 g/L macromoleculen" in een scène met org "mens": die waarde is gemeten in *E. coli* — Zimmerman & Trach 1991. → "zeer vol: in E. coli ~300–400 g/L" + bron.
- ❌ `scale` "≈ 10–15 nm": GroEL–GroES meet ≈ 14 × 19 nm (eigen meting 1AON). → "≈ 5–20 nm (GroEL–GroES ≈ 14 × 19 nm)".
- ❌ `time` "Hsp70: seconden": de bron zegt "Hsp70-dependent protein folding in vitro occurs typically on the time scale of minutes or longer" (Mayer & Bukau). → "GroEL-kooi ≈ 10 s per ronde · vouwen met Hsp70 (proefbuis): minuten of langer".

## glyco — N-glycosylatie
- ❌ **Tekening: sequon in de verkeerde leesrichting.** De keten komt uit het translocon en het N-uiteinde loopt voorop (label "→ N-term" rechts). Van N naar C lees je dus van rechts naar links; de oude kraaltjes S-A-V-L-**N-L-T**-E-K-G gaven dan N…T-L-N: de Thr lag aan de N-kant van de Asn, dus géén geldig sequon. Volgorde omgedraaid (G-S-L-A-V-**N-L-T**-E-K van N naar C), letters S/T · X · N onder de juiste kralen, pijltje "C ← N", en het Pro-voorbeeld in dezelfde richting. Nagekeken in de app.
- ❌ "Alleen Asn in het motief N-X-S/T komt in aanmerking" → "vrijwel altijd …; zelden N-X-C" (ook in de feiten) — Zielinska 2010 (nieuw).
- ❌ Stap 8 "Suikers op Ser of Thr komen pas hier": O-mannose begint in het ER en O-GlcNAc/O-fucose/O-glucose bestaan ook (Stanley 2011). → "De meeste suikers op Ser of Thr komen pas hier"; details: O-GalNAc begint "meestal" in het Golgi (GalNAc-transferasen kunnen naar het ER verhuizen — Stanley 2011).
- ✅ Glc3Man9GlcNAc2 (14 suikers) op dolichol, en bloc, glucosidase I/II, calnexine/calreticuline, UGGT, COPII naar Golgi, ERAD — Lamriben 2016 (nieuw); OST-A/STT3A co-translationeel, STT3B ook later — PMC9496733; sequon ~13 aa diep in het lumen — Braakman & Hebert 2013.
- ✅ Golgi: Man eraf in cis, GlcNAc-T I in medial, Gal/Sia/Fuc erbij; M6P — Stanley 2011. Bloedgroepen = suikerantigenen — Storry & Olsson 2009; CDG — Eklund & Freeze 2006 (beide nieuw).
- ✅ Boomsamenstelling in de tekening (2 GlcNAc, 9 Man, 3 Glc; glucosetak op de α1-3-arm) en SNFG-kleuren.
- 🔧 `time` "kwaliteitscontrole minuten" (geen bron) → "tot het eiwit de cel verlaat: ~20 min tot enkele uren" — Braakman & Hebert 2013, tabel 1.

## disulfide — Disulfidebruggen
- ✅ GSH:GSSG ER 1:1–3:1, hele cel 30:1–100:1 — Hwang 1992 (samenvatting letterlijk).
- ✅ PDI a–b–b′–a′, CGHC, oxideren/isomeriseren/reduceren; Ero1 met FAD → O₂ → H₂O₂; ook peroxiredoxine 4 — ERO1–PDI-review.
- ✅ Insuline: 3 bruggen A6–A11, A7–B7, A20–B19; A 21 en B 30 aa; S–S 2,03–2,04 Å — eigen meting 3I40 (als bron toegevoegd). "≈ 2,05 Å" blijft binnen de afronding.
- 🔧 `scale` "PDI ≈ 10 nm" → "≈ 9 nm" (eigen meting 4EKZ/4EL1: 8,4–8,9 nm).
- 🔧 `time` "seconden tot minuten" (geen bron) → "begint al tijdens de translatie; tot insuline de cel verlaat: ~35 min" — Braakman & Hebert 2013.

## golgi — Golgi & secretie
- ✅ COPII bij ER-uitgangsplaatsen, VTC/ERGIC, KDEL-receptor in COPI, cis/medial/trans + TGN, stapel ≈ 0,7–1,1 µm — Klumperman 2011 (nieuw), Glick & Luini 2011.
- ✅ M6P in het cis-Golgi, M6P-receptoren in het TGN, clathrine, naar endosomen; mucolipidose II — Coutinho 2012 (nieuw). Gereguleerde secretie meestal door Ca²⁺ — Gerber & Südhof 2002 (nieuw).
- ❌ `simplified` "het cisternale-rijpingsmodel (de huidige consensus)": Glick & Luini schrijven juist "this lack of consensus" en noemen rijping de beste kandidaat. Herschreven.
- ❌ `simplified` "vaak 4–8 cisternen" → "4 tot 11 cisternen in zoogdiercellen" — Klumperman 2011.
- 🔧 `time` "ER → plasmamembraan: typisch tientallen minuten" → "door de Golgi-stapel: ~2 tot ~15 min" (albumine < 2 min, VSV-G ~15 min) — Glick & Luini 2011.
- 🔧 pH endosoom "≈ 6" → "≈ 5,5–6,5" (vroeg ~6,5, laat ~5,5 — Hu 2015); lysosoom 4,5–5 — Mindell 2012 (beide nieuw). Ook in het figuurlabel.
- 🔧 "Ongeveer een derde van alle eiwitten gaat door de secretieroute" → "… heeft een signaal voor de secretieroute" — Williams 2024 (nieuw); I-cell disease = mucolipidose II toegevoegd.

## misvouwing — Misvouwing & aggregatie
- ✅ Cross-β: strengen ⟂ as, 4,7–4,8 Å, bladen ~10 Å, steric zipper — Iadanza 2018, Eisenberg & Jucker 2012 (nieuw). Lag-fase, seed, secundaire nucleatie — Iadanza 2018.
- ✅ Aβ-plaques, neurofibrillaire kluwens, Lewy-lichaampjes, IAPP in de eilandjes, PrP — Eisenberg & Jucker 2012, Iadanza 2018. Functioneel amyloïd in hormoongranules — Maji 2009 (nieuw).
- ✅ UPR: IRE1 splicet XBP1-mRNA, PERK fosforyleert eIF2α, ATF6 naar het Golgi en geknipt (S1P/S2P), BiP laat los; bij aanhoudende stress apoptose — Hetz 2020 (nieuw), Walter & Ron 2011.
- 🔧 "Fibril ongeveer 10 nm breed, tot µm lang" en `scale` "monomeer ≈ 3 nm": lengte en monomeermaat zonder bron → "≈ 7,5–10 nm breed, lang en onvertakt" — Zamarra 2024 (diameter 7,5–10 nm), Eisenberg & Jucker (onvertakt).
- 🔧 `time` "uren tot jaren" → "bij erfelijke Alzheimer is amyloïd ~15 jaar vóór de klachten meetbaar" — Bateman 2012 (nieuw).
- ✅ Prionen: dezelfde sequentie, andere vouw; PrPSc als mal.

## idp — Intrinsiek ongeordende eiwitten
- ✅ ~33 % eukaryote eiwitten met IDR > 30 aa, bacteriën 4,2 % — Ward 2004. Uversky-grens ⟨H⟩ = (⟨R⟩ + 1,151)/2,785 — Uversky 2000.
- ✅ pKID (Ser133, PKA) → ontmoetingscomplex → twee helices op KIX — Sugase 2007, Wright & Dyson 2015. 1KDX muis/rat klopt met `org`.
- ✅ pLDDT < 50 = voorspelling van wanorde — Tunyasuvunakool 2021 (nieuw).
- ✅ Hoge specificiteit, matige affiniteit, snelle dissociatie, veel partners, hubs, PTM's, linkers — Wright & Dyson 2015.
- 🔧 "rijk aan … Pro, Gly en Ser" (geen gelezen bron) → "relatief rijk aan kleine hydrofiele en geladen residuen" — Wright & Dyson 2015.
- 🔧 `extra` "vouwen kost entropie … groot contactvlak … p53-TAD bindt andere partners in andere vormen": de laatste twee niet in de bron → herschreven naar wat Wright & Dyson zeggen (entropieverandering, specifiek maar matige affiniteit, p53-TAD vrij nauwelijks helix, bindt MDM2 als helix en ook CBP). Kaartlabel "groot contactvlak" → "hoge specificiteit".
- 🔧 `time` "ns–µs" → "razendsnel (nanoseconden)" — Wright & Dyson 2015.
- ✅ Ontbrekende elektronendichtheid (X-ray) en scherpe, weinig verspreide NMR-pieken als kenmerk van wanorde — Maiti 2024 (nieuw).

## Gedeelde bestanden (graph.js, graph.en.js, steptags.js)
- ✅ De acht `s`/`S_EN`-samenvattingen kloppen (trigger factor bij bacteriën — Hoffmann 2010; geen "alleen"-formuleringen).
- ✅ De stapnamen in `steptags.js` passen bij de (ongewijzigde) stappen.

## Verworpen of niet gebruikt
- Thrower 2000 ("tetra-ubiquitine is het minimale signaal") blijft als historische bron staan, maar de stelling is als harde regel verworpen: Lu 2015 en Swatek & Komander 2016 tonen dat meerdere korte ketens even goed of beter werken.
- Hartl 2011 als bron voor "~300–400 g/L in het cytosol" verworpen voor de mens: het getal komt uit metingen in *E. coli* (Zimmerman & Trach 1991).
- Glick & Luini 2011 steunt "huidige consensus" niet (de bron spreekt van een gebrek aan consensus).
- NCBI Bookshelf (Alberts, Essentials of Glycobiology, StatPearls) kon niet gelezen worden (captcha); metadata van StatPearls (Rahimi & Launico) via PubMed bevestigd; alle steunende uitspraken nu ook gedekt door gelezen artikels.
- Geen gelezen bron gevonden voor "fibril tot µm lang", "monomeer ≈ 3 nm", "IDR's rijk aan Pro/Gly/Ser", "p53-TAD bindt andere partners in andere vormen", "Hsp70: seconden", "ER → membraan tientallen minuten": herschreven of geschrapt.

## Telling
≈ 520 uitspraken nagekeken (NL/EN-paar telt als één; inclusief alle bronvermeldingen; na deze ronde 70 bronnen voor de 8 knopen en 6 PDB-ID's); 33 correcties (10 ❌, 23 🔧).

## Te verwerken in gedeelde bestanden
Geen.

## Eindoordeel
De inhoud was grotendeels juist en goed vereenvoudigd. Eén echte tekenfout (sequon in de verkeerde N→C-richting in `glyco`),
enkele te stellige formuleringen ("alleen", "pas hier", "betekent afbraak", "consensus"), een getal van het verkeerde organisme
(300–400 g/L) en een reeks schaal- en tijdlabels zonder bron zijn verbeterd of herschreven. Elke uitspraak in dit pakket steunt
nu op een gelezen bron of op een eigen meting; er staat geen ⚠️ of "te controleren".
