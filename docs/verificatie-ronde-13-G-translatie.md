# Verificatieronde 13 — pakket G: translatie (14-11-2026)

**Bereik.** Knopen `translatie`, `initiatie`, `elongatie`, `terminatie`, `ribosoom`, `trna`, `aars`, `codon`, `ribogenese`, `seleno`, `er`:
`shared/details/tl.js` (kort, what, how, facts, why, [[…]]-woorden, sources), alle scènes in `app/scenes/tl/` (staptitels en -teksten, labels, legend, scale, time, org, simplified, extra, tekening),
de knoopsamenvattingen in `shared/graph.js` / `shared/graph.en.js` en de stapnamen in `shared/steptags.js`. NL en EN telkens samen.

**Methode.** Eerst eigen controle, pas daarna de vorige verslagen (ronde 2, 3, 5) gelezen.
- Volledige tekst gelezen (PMC/BioC of PMC-pagina): Hinnebusch & Lorsch 2012, Dever & Green 2012, Henras 2015, Labunskyy 2014, Longstaff 2007, Akopian 2013, Rubio Gomez & Ibba 2020, Gilles 2020, Ingolia 2011, Dao Duc 2019, Sloan 2017, Berg & Brandl 2021, Zhang 2025; PDB-101 MotM 15 (tRNA) en 16 (aaRS).
- PubMed-samenvatting gelezen: Khatter 2015, Ban 2000, Kozak 1987, Tafforeau 2013, Gaston 2011, Brennan & Nakayama 1994, Shi & Moore 2000.
- Metadata (auteurs, jaar, tijdschrift, volume, pagina's) van alle PMC-bronnen nagekeken via Europe PMC / Crossref.
- Databanken: RCSB (4UG0, 6Y0G, 4V6F, 1EHZ, 1FFY + organisme per entiteit), NCBI RefSeq (NR_003286/3287/3285, NR_023363, NR_002715), GenBank U13369 (featuretabel rDNA), NCBI-tabel genetische code 2, UniProt P02768 (albumine), P41252 en P00956 (IleRS).
- Eigen metingen in `data/pdb/1EHZ.pdb` (Python): C4′(35)–C4′(76) = 71,8 Å; G18–Ψ55 2,78 Å en G19–C56 2,82 Å (waterstofbrugafstanden); 14 gemodificeerde basen; A73 = discriminatorbase; 76 nt.
- Nabehandeling (op vraag van de coördinator): open reviews gezocht via Europe PMC voor Chapeville, de wobble-regels en OST — Shandell 2021, Agris 2018, Lei & Burton 2022, Mohanty 2020 volledig gelezen.
- Na de wijzigingen: `node --check` op alle bestanden, laden van `tl.js` als module (geen lege bron), en `tools/text-check.html` voor de 6 aangepaste scènes (0 te kleine teksten, 0 drukke stappen).
- NCBI Bookshelf (Alberts, Giegé) gaf een captcha: daar steunt geen enkele uitspraak nog uitsluitend op.

## translatie
- ✅ Leesrichting 5′→3′, N→C, A/P/E, polysoom, energie (GTP door eEF1A/eEF2 + 2 fosfaatbindingen bij het laden) — Dever & Green 2012.
- ✅ Snelheid ≈ 5–6 aa/s: Ingolia 2011 meet 5,6 aminozuren/s (muizen-ES-cellen) — bron **toegevoegd** (stond niet in de lijst).
- ✅ Initiatie- en terminatiestappen, eRF1/eRF3, ABCE1 — Hinnebusch & Lorsch 2012; Dever & Green 2012.
- 🔧 Scène stap 15: "De helften beginnen opnieuw, vaak op hetzelfde mRNA" → "De helften kunnen daarna aan een nieuwe ronde beginnen" (EN idem). Dever & Green: de gesloten lus is in vivo niet essentieel en herinitiatie is een bijzonder geval; "vaak hetzelfde mRNA" is niet gedekt.
- ✅ Scène: Kozak-context GCCACC·AUG·G, codons berekend uit de code, stop UAA, 5′-cap m⁷G, scannen 5′→3′.

## initiatie
- ✅ 43S/48S, eIF2·GTP·Met-tRNAi, eIF1/1A/3/5, eIF4E/4A/4G, eIF5B, eIF2B-recycling — Hinnebusch & Lorsch 2012.
- ✅ "Bij herkenning hydrolyseert eIF2 GTP": de bron spreekt van "irreversible hydrolysis of GTP in the TC on AUG recognition" (met gated Pi-release).
- ✅ Kozak GCC(A/G)CC-AUG-G — Kozak 1987 (samenvatting: "(GCC)GCCA/GCCATGG") — bron **toegevoegd**.

## elongatie
- ✅ eEF1A/EF-Tu, eEF2/EF-G, decodering door rRNA (A1492/A1493/G530) — Dever & Green 2012; peptidyltransferase = rRNA — Ban 2000.
- 🔧 Foutkans "ordegrootte 1 per 10³–10⁴" → "geschat tot ≈ 1 per 10³–10⁴ aminozuren (verschilt per aminozuur)". Rubio Gomez & Ibba 2020 noemen 10³–10⁴ als hoogste schattingen; Berg & Brandl 2021 geven 1/3000 tot 1/10⁶ naargelang het aminozuur. Bron Ibba toegevoegd.

## terminatie
- ✅ eRF1 (tRNA-vorm, GGQ in het PTC), eRF3·GTP, ABCE1; RF1 UAA/UAG, RF2 UAA/UGA, RRF + EF-G — Dever & Green 2012.

## ribosoom
- ✅ 40S = 18S + 33 eiwitten, 60S = 28S + 5,8S + 5S + 47 eiwitten (80 samen), ≈ 4 MDa (4,3) — Gilles 2020.
- ✅ rRNA-lengtes 1869 / 5070 / 157 / 121 nt — RefSeq (bron **toegevoegd**).
- ✅ Eiwitten vooral aan het oppervlak, niet in het actieve centrum — Ban 2000 (samenvatting).
- ✅ PDB: 4UG0 (Khatter 2015, 3,6 Å, mens), 6Y0G (Bhaskar e.a. 2020, klassieke PRE, 3,2 Å), 4V6F (*Thermus thermophilus* 70S, 3,1 Å).
- ❌ Bron "Gilles et al. (2020) … Int J Mol Sci 21:1829" bestaat zo niet: PMC7140421 is *Cells* 9:629 (volledige titel aangevuld).
- 🔧 Bacterieel 70S "≈ 2,5 MDa" → "≈ 2,3 MDa" (de gelezen bron Gilles 2020: "4.3 MDa versus 2.3 MDa").
- 🔧 Uitgangstunnel "≈ 100 Å lang, gemiddeld ≈ 15 Å breed" → "≈ 80–100 Å lang, gemiddeld ≈ 10 Å breed" (details how + facts, scène stap 8 "≈ 8–10 nm lang", simplified "literatuur ≈ 80–100 Å"). Dao Duc 2019 mat over 20 soorten 88,8 ± 6,0 Å (eukaryoten 83,3 Å, bacteriën 91,6 Å) en een gemiddelde straal van ≈ 5 Å; de 15 Å kon niet in een gelezen tekst bevestigd worden. Bron toegevoegd. Past nu ook bij de eigen meting in de scène (≈ 90 Å).

## trna
- ✅ L-vorm, twee gestapelde helices, elleboog, CCA 74–76, discriminatorbase 73, wobble 34, modificaties op 34 verruimen/beperken decodering — Berg & Brandl 2021 (bron **toegevoegd**).
- ✅ 1EHZ: 1,93 Å, gist; eigen meting 71,8 Å anticodon–A76; G18–Ψ55 en G19–C56; 14 gemodificeerde basen (m²G10, D16, D17, m²₂G26, Cm32, Gm34, yW37, Ψ39, m⁵C40, m⁷G46, m⁵C49, T54, Ψ55, m¹A58) — klopt met "14 basen" in de scène; Gm34 leest UUC én UUU.
- ✅ PheRS (klasse II) laadt de 2′-OH — Rubio Gomez & Ibba 2020.
- 🔧 Lengte "≈ 76 nt (70–90)" → "meestal 76 nt (76–90)" (Berg & Brandl: "varies from 76 to 90 bases").

## aars
- ✅ Tweestapsreactie, klasse I (Rossmann, HIGH/KMSKS, CP1-editeerdomein, kleine groef, 2′-OH) en II (3 motieven, grote groef, 3′-OH, uitzondering PheRS), G3·U70 in tRNA-Ala, identiteit anticodon + base 73, dubbele zeef (Fersht), mupirocine, CMT/mitochondriale aaRS — Rubio Gomez & Ibba 2020; MotM 16.
- ❌ Scène stap 6 "Leu, Phe: passen niet" → "Met, Phe: passen niet": MotM 16 noemt methionine en fenylalanine als te groot voor de holte van IleRS; leucine is even groot als isoleucine.
- 🔧 Scène stap 5 "twee groepen … apart ontstaan" → "elk met een eigen bouw": Ibba bespreekt juist de Rodin–Ohno-hypothese (beide klassen uit één gen), dus "apart ontstaan" is te stellig.
- 🔧 Scène `time` "milliseconden per lading" → "snel (hier sterk vertraagd)": geen gelezen bron voor die tijdschaal.
- ❌ Scène simplified "echte IleRS ≈ 1000 aminozuren" → "≈ 900–1300 aminozuren; PDB 1FFY = IleRS van *S. aureus*, 917 aminozuren" (RCSB 1FFY entiteit 1; UniProt P00956 E. coli 938, P41252 mens 1262).
- ✅ Chapeville 1962 (Cys-tRNA-Cys chemisch omgezet in Ala-tRNA-Cys → Ala ingebouwd op Cys-codons): expliciet beschreven in Shandell, Tan & Cornish 2021 ("chemically reducing Cys-tRNACys to Ala-tRNACys and showing that Ala would then be incorporated in response to a poly-Cys template"); principe ook in Berg & Brandl 2021. Het origineel (PMC220908) is een scan zonder leesbare tekst en staat daarom **niet** in `sources`; Shandell 2021 en Berg 2021 wel.

## codon
- ✅ 64 = 61 + 3; 6 / 4 / 3 / 2 / 1 codons per aminozuur (som 61); IGC-anticodon leest GCU/GCC/GCA; leesramen en frameshift (logisch afgeleid).
- ✅ Mitochondriaal (mens): UGA = Trp, AUA = Met, AGA/AGG = stop — NCBI tabel 2.
- 🔧 Kort "Er is één startcodon" → "Er is één gewoon startcodon (AUG)" (EN idem): NCBI tabel 1 en 2 en MotM 15 vermelden alternatieve startcodons (bv. AUA/AUU in menselijke mitochondriën, GUG/UUG).
- ✅ Wobble-regels: Agris e.a. 2018 (Crick stelde voor dat U34 met G paart en I34 met U, C en A; ongemodificeerd A34 komt bijna niet voor en wordt bijna altijd I) en Lei & Burton 2022 (G34 paart met U als G·U-wobble of met C; C34 heeft een modificatie nodig om A te lezen). Crick 1966 zelf is niet open toegankelijk en is uit `sources` gehaald; Agris, Lei & Burton en Berg staan er nu in.
- ❌ Regel "A → alleen U (zeldzaam)" (details-facts en tekstvak in de scène): Agris beschrijft dat ongemodificeerd A34 in *Mycoplasma* ACC (dus C) leest. Herschreven tot "A zeldzaam (wordt meestal I)" / "A: zeldzaam (wordt meestal I)", EN idem.

## ribogenese
- ✅ 300–400 rDNA-kopieën ("honderden"), NOR's op chr 13, 14, 15, 21, 22, Pol I, 5S apart (Pol III), C/D + fibrillarine, H/ACA + dyskerine, U3/SSU-processoom, 5S-RNP met Rpl5/Rpl11 (uL18/uL5), NOB1 knipt 18S-E in het cytoplasma, eIF6/Tif6 en Nmd3, ribosomopathieën (Diamond–Blackfan) — Henras 2015.
- ✅ 47S ≈ 13 kb: GenBank U13369, getranscribeerd deel nt 1–13314; rijp rRNA 1869 + 157 + 5070 ≈ 7,1 kb → spacers ≈ 6 kb. Bron **toegevoegd**.
- ✅ ≈ 100 2′-O-methylaties en ≈ 100 Ψ in humaan rRNA — Sloan 2017 ("approximately 100 of each"). Bron **toegevoegd**.
- ✅ "Meer dan 200 assemblagefactoren" — Tafforeau 2013 (286 voor processing nodige nucleolaire eiwitten in HeLa). Henras zegt dit niet (die "200" gaat over snoRNP's). Bron **toegevoegd**.
- 🔧 Scène `time` "minuten tot ≈ een uur per ribosoom" → "sterk versneld getoond": geen gelezen bron voor die duur.

## seleno
- ✅ 25 humane selenoproteïnegenen; SECIS in de 3′-UTR bij eukaryoten en archaea, net na het UGA bij bacteriën; PSTK, SepSecS, SPS2 (uit selenide + ATP), SBP2, eEFSec; eL30, nucleoline; Sec in alle drie de domeinen; 21e/22e aminozuur — Labunskyy 2014.
- ✅ Pyl: UAG, tRNA-Pyl met anticodon CUA, PylS laadt rechtstreeks, als vrij aminozuur gemaakt (pylBCD, tRNA-onafhankelijk), EF-Tu bindt Pyl-tRNA, methylamine-methyltransferasen, ook in een bacterie (*D. hafniense*) — Longstaff 2007. Uit twee lysines — Gaston 2011 (bron **toegevoegd**).
- 🔧 Facts "selenol is reactiever" → "Sec zit meestal in het actieve centrum van het enzym" (Labunskyy: "Sec plays important catalytic functions in most of the known selenoproteins"; reactiviteit stond niet in een gelezen bron).
- 🔧 Scène simplified "honderden tot duizenden nucleotiden verder" en "De inbouw is inefficiënt: vaak wint terminatie door eRF1" → "veel verder, in de 3′-UTR" en "Hoe vaak Sec wordt ingebouwd in plaats van te stoppen, hangt o.a. af van het SECIS-element" (Labunskyy: efficiëntie bepaald door SECIS-structuur; geen getallen).
- 🔧 Scène stap 5 en tekstvak "Zonder selenium of lus stopt het hier" / "eRF1 wint" → "… meestal": Labunskyy beschrijft bij Se-tekort NMD van sommige selenoproteïne-mRNA's, maar ook dat SPS2 dan thiofosfaat kan maken zodat Cys op UGA komt.

## er
- ✅ ≈ 30 % van het proteoom gaat naar het ER, SRP = 6 eiwitten + 7S(L)-RNA, Alu-domein (SRP9/14) remt de elongatie, SRα/SRβ, Sec61 — Akopian 2013. 7SL-RNA 299 nt (RefSeq NR_002715).
- ✅ Signaalpeptide meestal 15–30 aa, n-gebied positief, h, c — Zhang 2025 (bron **toegevoegd**).
- ✅ Albumine: signaal 1–18, propeptide 19–24, rijpe keten 25–609, geen N-X-S/T-sequon in het wildtype (eigen zoektocht in de UniProt-sequentie) — UniProt P02768.
- 🔧 Scène stap 3 "remt de aanmaak af, zodat het eiwit nog niet vouwt" → "…, zodat er tijd is om het ER te bereiken" (Akopian: de elongatieremming geeft een tijdsvenster om het translocon te bereiken).
- 🔧 Scène extra "propeptide … later in het Golgi (furine) verwijderd" → "later, na het ER, verwijderd (waarschijnlijk door furine)": Brennan & Nakayama 1994 tonen dat furine de eigenschappen van de levervormige convertase heeft en dat het knippen in secretieblaasjes gebeurt. Bron **toegevoegd**.
- ✅ OST zet in het ER-lumen Glc₃Man₉GlcNAc₂ van dolichol-pyrofosfaat op Asn in N-X-T/S (X ≠ Pro) — Mohanty e.a. 2020 (bron **toegevoegd**).

## graph.js / graph.en.js / steptags.js
- ✅ Samenvattingen en stapnamen van de 11 knopen gecontroleerd; geen fouten gevonden (ribogenese "~80 ribosomale eiwitten" = Henras 79; trna "≈ 75 Å" = eigen meting 72 Å).

## Te verwerken in gedeelde bestanden
Geen.

## Eindoordeel
Ongeveer 310 uitspraken nagekeken; 18 correcties (4 ❌, 14 🔧), 15 nieuwe gelezen bronnen en 2 ongelezen bronnen geschrapt. De ernstigste punten: een bron met verkeerd tijdschrift/volume (Gilles 2020 staat in *Cells* 9:629), een fout in de aaRS-figuur (Leu i.p.v. Met als "te groot" voor IleRS) en een te grote/niet-gedekte tunnelmaat (≈ 100 Å, 15 Å breed) die nu op een meting over 20 ribosomen steunt. Na de nabehandeling (Chapeville, wobble-regels, OST) steunt elke zichtbare uitspraak van het pakket op een gelezen bron of een eigen meting. In `sources` staan geen ongelezen primaire bronnen meer (Chapeville 1962 en Crick 1966 eruit). Alberts staat er nog als achtergrondbron bij, maar geen uitspraak steunt er nog alleen op.
