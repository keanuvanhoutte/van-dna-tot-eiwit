# Verificatie ronde 13 — pakket B: signalen & epigenetica (14-11-2026)

**Bereik.** Alle zichtbare uitspraken (NL én EN) van de knopen `signaal`, `gpcr`, `steroid` (`shared/details/signal1.js`),
`rtk`, `mapk`, `srf` (`shared/details/signal2.js`) en `remodeler`, `lussen`, `enhancer`, `xinact`, `imprinting`
(`shared/details/genome3.js`), plus alle scènes in `app/scenes/signal/` (incl. `_sig1.js`) en
`app/scenes/genome/{remodeler,lussen,enhancer,xinact,imprinting}.js`: staptitels en -teksten, labels in de figuur,
`legend`, `scale`, `time`, `org`, `simplified`, `extra`. Gelezen maar niet gewijzigd: de samenvattingen `s`/`S_EN`
in `shared/graph.js` / `shared/graph.en.js` en de stapnamen in `shared/steptags.js`. Ongeveer 410 losse uitspraken nagekeken.

**Methode.** Bronnen zelf gelezen:
- PubMed-samenvattingen via efetch (26 PMID's, o.a. Fredriksson 2003, Rasmussen 2011, Kim 2007, Fisch 1989, Hauser 2017,
  Freedman & Yamamoto 2004, Davies 2002, Lemmon & Schlessinger 2010, Prior 2020, Treisman 1986, Stevens 2002,
  Clapier & Cairns 2009, Davidson 2019, Davidson & Peters 2021, Soutourina 2018, Schoenfelder & Fraser 2019, Lettice 2003,
  Brown 1991, Carrel & Willard 2005, Patrat 2020, Bell & Felsenfeld 2000, Monk 2019, Buiting 2010, Zhang 2023).
- Volledige teksten (PMC BioC-JSON / efetch db=pmc / PMC-webpagina): Oakley & Cidlowski 2013, Turnham & Scott 2016,
  Lemmon & Schlessinger 2010, Prior 2020, Thiel 2021, Reddy 2013, Latinkic 1996 (samenvatting), Clapier 2017, Kadoch 2013,
  Rao 2014, Rao 2017, Gabriele 2022, Clemson 1996, Tukiainen 2017, Heard & Martienssen 2014, Horsthemke 2018,
  Papulino 2020, Kaelin 2025, Jang & Yoo 2026, Park 2026, Fu 2026, Bartolomei 2011 (samenvatting), en drie nieuw
  gevonden reviews: Ahmed 2022 (Cells), Farjami & Akbarin 2026 (Med Oncol), Xu 2026 (Mil Med Res).
- UniProt REST (lengte, ketens, gemodificeerde residuen, domeinen, isovormen): P07550, P63092, P16220, P01133, P00533,
  P62993, Q02750, P28482, P19419, P11831, P01100, P04150.
- RCSB-API (entry + polymer_entity): 3SN6, 1R4R, 1IVO, 2GS2, 5P21, 1K6O, 1FOS, 7W1M. Eigen meting in `data/pdb/7W1M.cif`
  (Python, CA/P-atomen): ketens A–H aanwezig; CTCF (H) loopt van rest 223 tot 577; alleen de N-terminale resten
  223–230 liggen binnen 11 Å van STAG1 (D); resten 271–569 liggen tegen het DNA (F/G).
- DNA-sequenties in de structuren als eigen meting: 1R4R-DNA TCAGAACA**TGA**TGTTCTCA (GRE met 3 bp tussenruimte),
  1FOS-DNA ATGA**CTCA**T (TRE TGACTCA).
- NCBI Bookshelf (Alberts 4e, Endotext) gaf een captcha; die bronnen zijn niet als bewijs gebruikt (zie "Verworpen").
- De eerdere verslagen (ronde 4, 5 en 9) zijn pas na de eigen controle gelezen.

Legenda: ✅ bevestigd (met bron) · ❌ fout → verbeterd · 🔧 verzacht/herschreven (met reden).

---

## signaal
- ✅ EGF 53 aminozuren, rest 971–1023 van een membraangebonden voorloper van 1207 aa met drie disulfidebruggen (976–990, 984–1001, 1003–1012) — UniProt P01133.
- ✅ ≈ 800 GPCR's in het menselijk genoom — Fredriksson 2003 ("more than 800 human GPCR sequences").
- ✅ Cortisol bindt GR in het cytosol; GR is zelf een transcriptiefactor; GR in bijna alle cellen — Oakley & Cidlowski 2013.
- *Aanvulling na de coördinator:* de uitspraken die eerst alleen door Alberts (captcha) gedekt waren, zijn nu elk met een gelezen bron afgewerkt of herschreven:
  - ❌ Membraan "≈ 5 nm" (`how`, `scale` en label in `signaal`, `scale` in `rtk`): Mitra et al. 2004 (PNAS, PMC384699) meten in plasmamembranen 35,6–42,5 Å van fosfaat tot fosfaat. Nu "≈ 4 nm dik (gemeten van fosfaat tot fosfaat)" (NL en EN). In `gpcr` stond "receptor ≈ 5 nm; beeld ≈ 100 nm", wat niet gedekt was. Nu "membraan ≈ 4 nm dik; niet op schaal".
  - 🔧 "Peptiden en catecholamines kunnen niet door het membraan" (`what`, `how`, stap 3 en label "hydrofiel" in `signaal`): de gelezen bronnen zeggen dat peptiden "generally poor cell membrane permeability" hebben (Lee et al. 2019, PMC6566176) en dat de hydrofobe kern een energiebarrière is voor hydrofiele groepen (Watson 2015, PMC4626904). Catecholamines binden receptoren op het celoppervlak (Sie & Tropini 2026). Overal nu "kunnen nauwelijks door" (NL en EN).
  - ✅ Drie klassen membraanreceptoren (ionkanaal-, G-eiwit- en enzymgekoppeld) — Park et al. 2024 (Exp Mol Med, PMC11671587), letterlijk. RTK's als enzymgekoppelde receptoren — Lemmon & Schlessinger 2010.
  - ✅ Adrenaline uit het bijniermerg en gemaakt uit tyrosine; cortisol uit de bijnierschors en gemaakt uit cholesterol; glucocorticoïden zijn lipofiel en binden een receptor in de cel — Sie & Tropini 2026 (NPJ Biofilms Microbiomes, PMC13005035). Cortisol diffundeert passief door het plasmamembraan — Oakley & Cidlowski 2013.
  - ✅ (mapk) Farnesylanker en extra palmitoylgroep bij een isovorm (KRAS4A); SOS als GEF en GAP's — Liu, Wang & Li 2019 (Acta Pharm Sin B, PMC6804475).
  - ✅ (srf) Onmiddellijk-vroege genen: mRNA stijgt binnen minuten en onafhankelijk van eiwitsynthese (cycloheximide) — Duclot & Kabbaj 2017 (Front Behav Neurosci, PMC5337695).
  - ✅ "cel ≈ 20 µm" (`signaal`) en "cel ≈ 10–20 µm" (`mapk`) vallen binnen de 10–30 µm die pakket A in deze ronde in Milo & Phillips las.
  - Al deze bronnen staan nu in `sources` van de betrokken knopen.
- ✅ Scène: drie routes naast elkaar met eerlijke `simplified`; legende en labels (hydrofiel/lipofiel, receptoren op het oppervlak) kloppen.

## gpcr
- ✅ β2-adrenerge receptor 413 aa, 7 TM-helices — UniProt P07550 (TM 30–56 … 305–326).
- ✅ PDB 3SN6 = β2AR–Gs, Nature 477:549 (2011); helix 6 ≈ 14 Å naar buiten — Rasmussen 2011 (samenvatting). (3SN6: receptor mens, Gαs/Gγ rund, Gβ rat; de app noemt geen organisme voor het complex.)
- ✅ Gαs 394 aa — UniProt P63092.
- ✅ PKA = R₂C₂; elke R bindt 2 cAMP, de 2 C komen vrij — Turnham & Scott 2016.
- ✅ C-subeenheden gaan de kern in en fosforyleren CREB op Ser133; KID–KIX-binding met CBP — Ahmed 2022 (nieuw als bron toegevoegd).
- ✅ Ser133 bij CREB-A (341 aa); UniProt P16220 toont isovorm CREB-B (327 aa) met Ser119 — UniProt (isovormen + residu 119), lengte P16220-1 = 341 nagemeten.
- ✅ CRE-consensus TGACGTCA — Farjami & Akbarin 2026 (nieuw als bron toegevoegd).
- ✅ FOS heeft naast het SRE een CRE/ATF-plaats (−72/−54); cAMP kan FOS aanzetten — Fisch 1989.
- ✅ ≈ een derde van de goedgekeurde geneesmiddelen via GPCR's — Hauser 2017 (475 geneesmiddelen, ≈ 34 %).
- ✅ Fosfodiësterase breekt cAMP af tot AMP; AKAP-verankering (simplified) — Ahmed 2022.
- 🔧 Bronnen: Mayr & Montminy 2001 is niet vrij leesbaar; daarom twee gelezen bronnen toegevoegd (Ahmed 2022, Farjami & Akbarin 2026).

## steroid
- ✅ GR 777 aa, ≈ 86 kDa (85 659 Da); DBD 418–493 met C4-zinkvingers 421–441 en 457–476; LBD 524–758 — UniProt P04150.
- ✅ Chaperones Hsp90, Hsp70, p23, FKBP51/52; NL1 (DBD/scharnier) en NL2 (LBD); SRC-1–3 en CBP/p300; GRE GGAACAnnnTGTTCT uit twee halve plaatsen van 6 bp; remming via NF-κB en AP-1; "één van de meest voorgeschreven geneesmiddelen" — Oakley & Cidlowski 2013 (letterlijk).
- ✅ Importine α bindt NL1; importine α/β (en importine 7) importeren GR — Freedman & Yamamoto 2004. Label "importine α/β" klopt.
- ✅ PDB 1R4R: rat-GR-DBD (2 ketens) op een GRE met 3 bp tussenruimte — RCSB + eigen lezing van de DNA-sequentie.
- 🔧 `how` stap 4 ("het chaperonecomplex komt los"): het klassieke model (Oakley) staat er nog, maar Davies 2002 toont dat Hsp90 na hormoonbinding blijft zitten, FKBP51 → FKBP52 wisselt en het complex pas in de kern uiteenvalt. Een korte nuancering toegevoegd (NL en EN), zoals de scène die al in `simplified` had.
- 🔧 Doelgenen PEPCK en glucose-6-fosfatase: de geciteerde Endotext-pagina was niet leesbaar (captcha). Bevestigd in Xu et al. 2026 (Mil Med Res, tabel 3: PEPCK↑, G6Pase↑) en die bron toegevoegd.

## rtk
- ✅ EGFR 1210 aa incl. signaalpeptide (keten 25–1210); Tyr1068/1086 klassiek = Tyr1092/1110 in UniProt (fosfotyrosine, autokatalytisch) — UniProt P00533.
- ✅ Grb2 217 aa — UniProt P62993.
- ✅ "Tethered" vorm (arm van domein II tegen domein IV), bivalente binding, dimeer volledig door de receptor gevormd, asymmetrisch kinasedimeer (C-lob activator tegen N-lob ontvanger) — Lemmon & Schlessinger 2010 (volledige tekst).
- ✅ PDB 1IVO (Cell 110:775, 2002) en 2GS2 (Cell 125:1137, 2006) — RCSB.
- ✅ Scène-`simplified` (inactieve predimeren, Shc, onzekerheid over volgorde van fosforylering) is eerlijk; geen wijziging.

## mapk
- ✅ MEK1 Ser218/Ser222 door RAF; ERK2 Thr185/Tyr187 door MEK1/2 — UniProt Q02750 en P28482.
- ✅ ≈ 19 % van de kankerpatiënten heeft een RAS-mutatie; G12/G13/Q61 — Prior 2020 (volledige tekst: "five mutations (G12D, G12V, G12C, G13D and Q61R) account for 70%").
- ✅ GEF/GAP-mechanisme — Prior 2020.
- ✅ PDB 5P21 (EMBO J 9:2351, 1990, 1,35 Å) — RCSB.
- 🔧 `why`: "worden niet meer door GAP's uitgeschakeld en blijven in de GTP-vorm: permanent aan" was te stellig. Prior 2020: oncogene mutanten hebben *snellere nucleotide-uitwisseling en/of minder GAP-binding*, en sommige zijn "fast-cycling" eerder dan GAP-ongevoelig. Nu: "worden slecht door GAP's uitgeschakeld of nemen sneller GTP op, en blijven zo veel vaker in de GTP-vorm" (NL en EN). Bron-URL naar de PMC-volledige tekst gezet en Lemmon & Schlessinger mee als bron.

## srf
- ✅ SRE ≈ 300 bp vóór de cap-plaats — Treisman 1986; Fisch 1989 (−317/−298).
- ✅ CArG CC[A/T]₆GG met SRF-dimeer; Ets-kern GGA(A/T); B-box van Elk-1 bindt SRF; Mediator en p300 als co-activatoren; ERK dokt via D-box/DEF — Thiel 2021 (volledige tekst).
- ✅ "Elk-1 bindt het FOS-SRE alleen samen met SRF" — Latinkic 1996: "TCF alone does not bind the SRE of c-fos" (hun nieuwe vondst geldt voor andere SRE's, niet voor FOS).
- ✅ MED23/Sur2 is nodig voor activering door Elk-1 — Stevens 2002.
- ✅ Elk-1 428 aa, P-Ser383 en P-Ser389 door MAPK1; SRF 508 aa; c-Fos 380 aa — UniProt.
- ✅ TRE TGA(C/G)TCA — eigen lezing van het DNA in PDB 1FOS (…ATGACTCAT…); 1K6O = SAP-1/SRF/c-fos-SRE (J Mol Biol 314:495) — RCSB.
- ✅ c-Fos-eiwit ≈ 100 min (100,3 min) — Reddy 2013 (volledige tekst).
- ❌ Halfwaardetijd FOS-mRNA "≈ 10–15 min": Reddy 2013 meet 12,4 min (tonisch) en 8,5 min (puls). Nu "≈ 10 min (gemeten 8,5–12,4 min)" (NL en EN); de bronvermelding aangepast.

## remodeler
- ✅ Vier families ISWI, CHD, SWI/SNF, INO80; verschuiven, uitwerpen, histonvarianten (SWR1, SRCAP, p400), regelmatige afstand; de translocase-motor zit op een vaste plaats op het octameer — Clapier 2017 (volledige tekst); Clapier & Cairns 2009.
- ✅ mSWI/SNF gemuteerd in 19,6 % van de tumoren — Kadoch 2013 (volledige tekst).
- ✅ Scène: nucleosoom ≈ 11 nm, "1 op 5" als gemiddelde — juist gekaderd.

## lussen
- ✅ Cohesine = SMC1A, SMC3, RAD21 + STAG1/2; lussen symmetrisch tot 2,1 kb/s met NIPBL–MAU2 — Davidson 2019.
- ✅ Contactdomeinen 40 kb–3 Mb, mediaan 185 kb; > 90 % (92 %) convergente CTCF-motieven — Rao 2014.
- ✅ Zonder cohesine verdwijnen alle lusdomeinen; "many megabase-sized loops recovered in under an hour" — Rao 2017.
- ✅ Fbn2-lus (505 kb, muis-ES-cellen) volledig gesloten ≈ 3–6,5 % van de tijd — Gabriele 2022.
- ✅ N-terminaal motief van CTCF bereikt STAG1 alleen als het N-uiteinde naar cohesine wijst — Zhang 2023; PDB 7W1M = mens, cryo-EM 6,5 Å, ketens A SMC1A, B SMC3, C RAD21, D SA-1, E NIPBL, F/G DNA (118 bp), H CTCF — RCSB; eigen meting: CTCF-resten 223–230 raken STAG1.
- ❌ `scale` "lussen van ≈ 50 000 tot 1 miljoen basenparen" en `simplified` "tienduizenden tot een miljoen basenparen": Rao 2014 vindt domeinen van 40 kb tot 3 Mb en lussen die in 98 % van de gevallen korter zijn dan 2 Mb, dus 1 miljoen als bovengrens is te laag. Nu "meestal ≈ 40 000 tot 2 miljoen basenparen" en "tienduizenden tot ongeveer twee miljoen basenparen" (NL en EN).

## enhancer
- ✅ ZRS ligt in intron 5 van LMBR1, 1 Mb van SHH; puntmutaties → preaxiale polydactylie — Lettice 2003.
- ✅ Mediator geeft signalen van activatoren op enhancers door aan het PIC — Soutourina 2018; enhancers overbruggen vaak grote afstanden — Schoenfelder & Fraser 2019; lussen binnen TADs beperken enhancers tot de juiste genen — Jang & Yoo 2026.
- 🔧 "tot ≈ 1 Mb" (facts, `scale`, label in de figuur, stap 2) maakte van 1 Mb een bovengrens. Geen gelezen bron zegt dat 1 Mb het maximum is; de ZRS is een *voorbeeld* van 1 Mb. Nu "kan groot zijn, bv. ≈ 1 Mb" / "soms ≈ 1 miljoen basenparen" / "wel een miljoen letters" (NL en EN).
- ❌ Stap 1 "Vlak vóór een gen ligt de startplaats": de startplaats is het begin van het gen zelf, niet een plek ervóór. Nu "Aan het begin van een gen ligt de startplaats" / "At the beginning of a gene lies the start site".
- 🔧 Stap 6 "een versterker voor de groei van vingers": de ZRS stuurt SHH in de ZPA van de ledemaatknop, dus het gaat om de aanleg van de vingers en niet om hun groei. Nu "voor de aanleg van vingers" / "for forming fingers".

## xinact
- ✅ Lyon 1961; XIST ontdekt in 1991 en alleen van het inactieve X afgeschreven — Brown 1991; XIST-RNA "paints" Xi — Clemson 1996.
- ✅ ≈ 15 % ontsnapt, ≈ 10 % wisselend — Carrel & Willard 2005; ≥ 23 % onvolledig — Tukiainen 2017.
- ✅ Bij de mens één X willekeurig stil rond de innesteling — Park 2026 ("Upon implantation, one X chromosome is randomly inactivated"); Patrat 2020.
- ✅ Barr-lichaampje = compact heterochromatisch Xi — Fu 2026; oranje vacht X-gebonden, lapjes-/schildpadkat = willekeurige X-inactivatie — Kaelin 2025.

## imprinting
- ✅ ≈ 100 geïmprinte genen; ICR's met ouderspecifieke DNA-methylatie uit de kiemlijn, behouden ondanks herprogrammering — Bartolomei & Ferguson-Smith 2011.
- ✅ IGF2 en H19 delen een enhancer; vaderlijk gemethyleerde ICR; CTCF-isolator op het moederlijke allel — Bell & Felsenfeld 2000. Tekening (merkteken op het vaderlijke controlestuk, stop-eiwit op het moederlijke) klopt.
- ✅ Deletie 15q11–q13 vaderlijk → Prader-Willi, moederlijk → Angelman; UBE3A in de hersenen alleen van de moeder — Buiting 2010. 11p15.5 — Papulino 2020.
- ✅ Overerving over generaties bij planten en wormen wel, bij de mens niet overtuigend aangetoond — Heard & Martienssen 2014; Horsthemke 2018.
- 🔧 Stap 3 "Dat merkteken blijft in elke cel van het kind": in de kiemcellen van het kind wordt het juist gewist (de volgende stap toont dat). Nu "blijft in de lichaamscellen van het kind" / "stays in the body cells of the child".

---

## Te verwerken in gedeelde bestanden
Geen inhoudelijke fouten. Twee kleine, optionele aanpassingen voor consistentie:
- `shared/graph.js` · `die laat Hsp90 los, gaat de kern in` → `die laat (in het klassieke model) Hsp90 los, gaat de kern in`
- `shared/graph.en.js` · `the receptor releases Hsp90, enters the nucleus` → `the receptor releases Hsp90 (classic model), enters the nucleus`
- `shared/steptags.js` · `["buurten", "neighborhoods"]` → `["buurten", "neighbourhoods"]` (Britse spelling zoals elders in de app)

## Verworpen
- Alberts 4e (NCBI Bookshelf NBK26813/26822/26912) en Endotext NBK279171 gaven een captcha. Ze zijn dus niet gelezen en niet als bewijs gebruikt. Elke uitspraak die eerst alleen op Alberts steunde, heeft nu een gelezen bron of is herschreven: Mitra 2004, Watson 2015, Lee 2019, Park 2024, Sie & Tropini 2026, Liu 2019 en Duclot & Kabbaj 2017. Voor PEPCK/G6Pase is Xu 2026 toegevoegd.
- "Membraan ≈ 5 nm" (handboekwaarde) is verworpen. De gelezen meting (Mitra 2004) geeft 3,6–4,3 nm van fosfaat tot fosfaat.
- "Ras-mutanten worden niet meer door GAP's uitgeschakeld" als algemene regel: Prior 2020 beschrijft ook snel wisselende ("fast-cycling") mutanten.
- 1 Mb als maximale afstand voor enhancers en 1 Mb als bovengrens voor lussen: de bronnen (Lettice, Rao 2014) geven 1 Mb als voorbeeld en lussen tot ≈ 2 Mb.

## Eindoordeel
Het pakket is wetenschappelijk degelijk. Alle getallen, residunummers, lengtes, PDB-ID's en ketens kloppen met UniProt, RCSB en een eigen meting in 7W1M. Er stonden geen grove fouten in. Wel waren er twee kleine onjuistheden (het startpunt van een gen en de bovengrens van lussen) en twee getallen die iets te hoog lagen (de halfwaardetijd van FOS-mRNA en de membraandikte ≈ 5 → ≈ 4 nm). Daarnaast stonden er een paar te stellige formuleringen: Ras-mutanten, enhancerafstand, "elke cel", het loslaten van de chaperones en "kan niet door het membraan". Elke uitspraak steunt nu op een gelezen bron. Die zijn in NL en EN rechtgezet. Alle gewijzigde bestanden doorstaan `node --check`.
