# Verificatie ronde 13 — pakket K: 3D-bibliotheek (atlas/)

**Datum:** 14-11-2026
**Bereik:** alle zichtbare teksten (NL en EN) en feiten in `atlas/entries.js` (37 items: what, feat, cell, simpl, why3d, sub, name, org, mark-labels, src), `atlas/simple-1.js` t/m `simple-4.js` (eenvoudige uitleg + infotabellen), `atlas/roles.js` ("Wat is welk deel?"), `atlas/diagrams.js` (7 schema's), `atlas/aa2d.js` en `atlas/base2d.js` (structuurformules). `atlas.js`, `analyse.js`, `custom.js`: enkel steekproef van zichtbare vaste teksten (geen fouten gevonden, niets aangepast).

## Methode
- **PDB:** alle 36 PDB-codes opgehaald via `data.rcsb.org/rest/v1/core/entry/<ID>` en `/polymer_entity/<ID>/<n>`: titel, methode, resolutie, primaire publicatie (auteurs, tijdschrift, volume, pagina, jaar), organisme, ketens en sequenties per entiteit. Elke `org`, `sub` (resolutie, sequentie), ketenrol in `roles.js` en elke bron-label vergeleken.
- **Bronnen:** 56 bronverwijzingen: samenvatting gelezen via PubMed efetch (of Crossref als PubMed de DOI niet kende). Volledige tekst gelezen waar nodig: Schirle 2014 (Ago2, PMC4313529), Brown 2014 (MALAT1, PMC4096706), Statello 2021 (lncRNA, PMC7754182), Serganov 2004 (PMC4692365), Xiong & Sundaralingam 2000 (PMC105378), Gelvin 2003 (PMC150518), Wyatt & West 2014 (PMC4142969), Nitiss 2009 (PMC2748742), Jarrous & Liu 2023 (PMC9945436).
- **Eigen metingen** in `data/pdb/*.pdb` met Python (scripts in de scratchpad): waterstofbruggen tussen basen (N/O op 2,6–3,3 Å) voor 1LNT, 1D4R, 1EHZ, 1ANR, 1Y26, 1AIO; helixas (cilinderfit op P-atomen), stijging, twist, P–P-afstanden, diameter en suiker-δ voor 440D, 1BNA, 1DCG, 1RNA, 479D; atoomtelling 1J5E; mtDNA-genposities tegen de NCBI-featuretabel van NC_012920.1; 18S-lengte en 40S-eiwitten via RCSB 4UG0.
- Eerdere verslagen (ronde 2/3 prot-atlas) pas na de eigen controle gelezen; zij vonden de hieronder gemelde fouten niet.

## Resultaten per item

### DNA-helices
- **bdna (1BNA)** ✅ titel/Drew 1981 kloppen; gemeten stijging 3,35 Å, twist 35,8° (Drew: 36,9° in het midden), buitendiameter ~20 Å, licht gebogen 19° (Drew). ✅ "hydratatieruggengraat" in de AATT-kleine groef: bevestigd door Kopka 1985 → als bron toegevoegd (Drew & Dickerson 1981 JMB heeft geen leesbare samenvatting, niet toegevoegd).
- **adna (440D)** 🔧 "fosfaten ~5,9 i.p.v. ~7 Å" niet in een gelezen bron → vervangen door eigen meting (6,1 Å in 440D tegenover 6,7 Å in 1BNA). ✅ ~11 bp/winding (gemeten 11,3), stijging ~2,6 (gemeten 2,5), basenparen weg van de as (bp-centrum 7,4 Å van de as tegenover 2,2 Å in B-DNA → hol kanaal), buitendiameter groter dan B (21,7 vs 20,2 Å).
- **zdna (1DCG)** ✅ twist per stap gemeten −7°/−53° (tekst −9°/−51°), stijging 3,85 Å, 12 bp/winding (Wang 1979). ✅ Z-DNA door negatieve supercoiling bij transcriptie: Rich & Zhang 2003 toegevoegd; ✅ ZBP1 in virusafweer en celdood: Kuriakose 2018 toegevoegd.
- **zalpha (1QBJ)** ✅ Zα van menselijk ADAR1, contacten met de zigzag-ruggengraat + één syn-G (Schwartz 1999). Ketens D/E = DNA, A/B = Zα ✅.

### Niet-canoniek DNA
- **g4 (1KF1)** ✅ parallel, propellerlussen, K⁺ (Parkinson 2002); ✅ BG4 (Biffi 2013). 🔧 "in K⁺ vormt deze sequentie vooral hybride (3+1)" + "moleculaire crowding": crowding had geen gelezen bron → geschrapt; hybride vorm in K⁺ nu met Ambrus 2006 (geldt voor de menselijke telomeersequentie).
- **g4basket (143D)** ✅ Na⁺, 1 diagonale + 2 laterale lussen (Wang & Patel 1993).
- **imotif (1EL2)** ✅ 5-methyl-C + U, fragment van de C-rijke streng (Phan 2000); ✅ iMab 2018, celcyclus- en pH-afhankelijk (Zeraati 2018). 🔧 "stabiel bij pH < ~6,5" (geen bron) → "stabieler naarmate de pH lager is".
- **triplex (1BWG)** ✅ CTCTCT derde streng (keten C), parallelle triplex, Hoogsteen, C⁺ (Asensio 1999); ✅ H-DNA/TFO (Frank-Kamenetskii & Mirkin 1995).
- **holliday (1DCW)** ✅ stacked-X (Eichman 2000). ✅ zonder kationen open vierkante vorm (Wyatt & West 2014). 🔧 resolvasen preciezer benoemd: "GEN1, MUS81–EME1, SLX1–SLX4" en "BLM–TOPOIIIα–RMI1/2" (Wyatt & West 2014, toegevoegd).

### Geneesmiddel–DNA
- **netropsin (6BNA)** ✅ AATT, H-bruggen naar A N3 / T O2, G-NH₂ in de weg, verdringt de hydratatieruggengraat, geen ontwinding (Kopka 1985). 🔧 eenvoudige tekst "de helix blijft recht" → "buigt hooguit een klein beetje" (Kopka: 8° buiging).
- **intercalator (1D11)** ✅ 2 daunomycines aan de CpG-uiteinden, aminosuiker in de kleine groef (Wang 1987). ✅ antracyclines zijn topo-II-gif (Nitiss 2009, toegevoegd).
- **cisplatin (1AIO)** ✅ Pt op G6/G7 van keten A (gemeten); ✅ 78° NMR, verbrede kleine groef, HMG-herkenning (Gelasco & Lippard 1998; Takahara 1995).

### RNA en hybriden
- **dsrna (1RNA)** ✅ A-vorm, gemeten twist 33,4° (10,8 bp/winding).
- **hybrid (479D)** ❌ "de kleine groef van hybriden is doorgaans smaller dan in A-RNA" — Xiong & Sundaralingam vinden in dít kristal net een brede A-vormige kleine groef → herschreven: RNase H leest onder meer de breedte van de kleine groef (Sarafianos 2001, toegevoegd). 🔧 "in oplossing (NMR) O4'-endo" stond niet in de bron → geschrapt. ✅ alle 18 suikers C3'-endo (gemeten δ = 78–86°; bron: "all the sugars in the C3'-endo puckering").
- **mismatch (1LNT)** ❌ De tekst noemde één A·C, één G·A en "drie basen zonder partner (C5, G18, A20)". Deng et al. 2003: de symmetrische lus CAGG/AGCA vormt **twee** A·C-paren (in twee vormen), een **sheared G·G** en een G·A. Eigen meting: C5·A20 en G7·G18 hebben maar één H-brug, daarom miste de automatische telling ze. → beschrijving, markering (nu 4 mismatchparen) en uitleg van de telling herschreven (NL+EN, ook simple-4). ✅ G·U-paar U4·G21 (gemeten O6–N3 2,68 Å, N1–O2 3,01 Å). 🔧 "Ffh bindt precies op deze lus" → "Ffh bindt op domein IV, in een vervormde kleine groef" (Batey 2000, toegevoegd); bacterieel SRP brengt het ribosoom naar het celmembraan, niet het ER (toegevoegd). 🔧 "RNA verdraagt zulke paren veel beter dan DNA" → wat Deng zegt (A·C-paren als eiwitbindingsplaats).
- **wobble (1D4R)** ❌ "twee G·U-wobbleparen": gemeten zijn er vier (U8·G21 twee keer in het midden, G1·U28 twee keer aan de uiteinden) → tekst aangepast. 🔧 "G·U is het meest voorkomende niet-WC-paar" staat niet in de gelezen bron → vervangen door Varani & McClain 2000: komt voor in bijna elke RNA-klasse en kan G–C/A–U vervangen (bron toegevoegd). ✅ G·G-paren (gemeten), SRP19-binding (Wild 1999).
- **stemloop / trna (1EHZ)** ✅ stam 27–31/39–43 (gemeten, 4 paren met ≥2 bruggen + A31·Ψ39), anticodon Gm34-A35-A36, 76 nt, gist (RCSB). 🔧 simple trna: "vijf onderdelen" noemde er maar vier → variabele lus toegevoegd.
- **tar (1ANR)** ✅ bulge U23-C24-U25, lus C30–A35 (sequentie). 🔧 "P-TEFb fosforyleert Pol II" niet in een gelezen bron → herschreven volgens Wei 1998 (Tat + cycline T + CDK9 naar Pol II; cycline T heeft de TAR-lus nodig), bron toegevoegd.
- **pseudoknot (437D)** ✅ (Su 1999). **terc (1YMO)** ✅ 451 nt hTR, U·A–U-triplex (Theimer 2005).
- **hammerhead (2OEU)** ✅ Mn²⁺ op A9-fosfaat (Martick 2008). 🔧 "functie in zoogdieren grotendeels onbekend" → het motief zit in bacteriën, planten en dieren (de la Peña 2010) en verlaagt in knaagdier-mRNA de eiwitproductie (Martick 2008 Nature); bronnen toegevoegd.
- **groupi (1U6B)** ✅ 3,1 Å, beide exonen, vóór stap 2 (Adams 2004); U1A = menselijk hulpeiwit (RCSB).
- **rnasep (3Q1Q)** ❌ "herkenning van de tRNA-vorm, niet van de sequentie" — Reiter 2010: vorm + specifieke contacten **+ basenparen** → aangepast (entries + simple). 🔧 NL had een zin die in EN ontbrak ("zoals ook het ribosoom doet") → geschrapt. 🔧 mitochondriaal RNase P = enzym uit drie eiwitten zonder RNA (Holzmann 2008); ✅ menselijk kern-RNase P: H1-RNA + 10 eiwitten (Jarrous & Liu 2023). Beide bronnen toegevoegd.
- **riboswitch (1Y26)** ✅ 71 nt, adenine paart met U74, volledig omsloten, translatie-AAN ("likely", Serganov 2004 volledige tekst).
- **ribosome (1J5E)** ✅ 20 eiwitten (S2–S20 + Thx), 16S 1522 nt, 51 933 atomen (gemeten). ✅ mens: 18S = 1869 nt, 33 eiwitten in de 40S (RCSB 4UG0).
- **mirna (4W5N)** ❌ "nt 2–8 (seed) liggen voorgevormd in een A-achtige halve helix" — Schirle 2014: nt 2–6 voorgevormd, knik tussen g6 en g7 (helix-7), eerst paring met nt 2–5, daarna 2–8 → herschreven (what, feat, simple).
- **snrna (4PJO)** ❌ "herkent de 5'-splicingsite van **elk** intron" — U12-type intronen (< 0,5%) gebruiken U11 (Turunen 2013, toegevoegd) → aangepast in entries en simple-3 (2×). ✅ Sm-ring, U1-70K, U1-C, oligo AGGUAAGUCC (RCSB, Kondo 2015).

### DNA–eiwit en lange moleculen
- **nucleosome (1KX5)** ✅ 147 bp menselijk DNA + Xenopus-histonen, ketens per histon (RCSB). **ssdna (1JMC)** ✅ RPA70, dC₈ (Bochkarev 1997).
- **mrna (1CVJ)** ✅ PABP RRM1/2 + poly(A) (Deo 1999), 27-A-herhaling (Baer & Kornberg 1983).
- **premrna (1K1G)** ✅ SF1 KH-QUA2 + UACUAAC, vertakkings-A diep begraven (Liu 2001); >90% alternatief gesplicet (Wang 2008: 92–94%).
- **mtdna (3TQ6)** ✅ alle 37 genposities en strengen in `diagrams.js` identiek aan de NCBI-featuretabel NC_012920.1; 16 569 bp, 13/2/22 (Anderson 1981); TFAM U-bocht ~180° (Rubio-Cosials 2011).
- **plasmid (1REP)** ✅ RepE-monomeer op 19-bp-iteron van F (Komori 1999).
- **cdna (1HYS)** ✅ RT p66/p51 + PPT-RNA:DNA (Sarafianos 2001); ketenrollen ✅.
- **lncrna (4PLX)** ✅ MALAT1 ENE + A-rijk staartje, U·A–U-triplex, stabiliteit (Brown 2014 volledige tekst). ❌ "GENCODE ~20 000 lncRNA-genen" — de gelezen bron (Statello 2021) zegt "meer dan 16 000" → aangepast (entries + simple-3). ✅ XIST 17 kb (Brown 1992, toegevoegd).
- **tdna (3BTP)** ❌ "Ti-plasmide ~200 kb" — Gelvin 2003: 200–800 kbp → aangepast (simple-3, schema 2×). 🔧 T-DNA "10–25 kb" → 10–30 kbp (Gelvin). ✅ 25-bp-grenzen, onderste streng, VirD2 aan 5'-uiteinde, T4SS, VirE2 kan zonder T-streng overgaan (Gelvin); VirE1 houdt VirE2 vast (Dym 2008).

### roles.js, aa2d.js, base2d.js
- ✅ Elke keten-ID en rol vergeleken met de RCSB-entiteiten (hybride, triplex, Zα, hammerhead 43/20 nt, groep I 197/22/3 nt + U1A, RNase P 347 nt, 30S, AGO2, U1 snRNP: A=D3, B=B, C=D1, D=D2, E–G, K=U1-70K, L=U1-C, nucleosoom, RPA, PABP, SF1, TFAM, RepE, RT p66/p51, VirE2/VirE1). Geen fouten.
- ✅ Structuurformules: alle 20 aminozuren (zijketens, ringen, Kekulé-structuren van Phe/Tyr/His/Trp, Pro-ring) en de vijf basen (posities N1/N3/N9, dubbele bindingen, C2=O/C4-NH₂ enz.) en β-D-(deoxy)ribose in Haworth-vorm kloppen. Opmerking (niet aangepast, didactische keuze): de ruggengraat staat neutraal (H₂N–…–COOH) terwijl Asp/Glu/Lys/Arg geladen getekend zijn.

## Handboekfeiten: afgewerkt in een tweede ronde (op vraag van de coördinator)
Elk van de eerder open handboekfeiten kreeg een gelezen bron of werd herschreven/geschrapt (NL+EN samen):
- ❌→🔧 **B-DNA "~10,5 bp/winding in oplossing"** → ~10,4 (Wang 1979 PNAS: 10,4 ± 0,1 bp/winding); bron toegevoegd.
- ✅ **Kozak-context gccRccAUGG** = consensus (GCC)GCCA/GCCATGG (Kozak 1987); bron toegevoegd.
- 🔧 **EJC/NMD** (schema's mRNA en pre-mRNA): geen gelezen bron → geschrapt.
- 🔧 **poly(A) "~200–250 A"** → "~250 A" bij synthese in zoogdiercellen, AAUAAA (Kühn et al. 2009); entries, simple-3 en schema (2×) aangepast, bron toegevoegd.
- ❌ **vertakkingspunt "YNYURAY", "~20–50 nt"** → menselijke consensus yUnAy, meestal 21–34 nt stroomopwaarts (Gao et al. 2008); bron toegevoegd.
- 🔧 **"~9 exonen van ~150 nt; intronen vaak kilobasen lang / pre-mRNA tot honderden kb"** → 8,8 exonen per gen, ~80% korter dan 200 nt, sommige intronen > 11 000 nt; pre-mRNA "meer dan 10 000 nt" (Sakharkar et al. 2004); bron toegevoegd.
- 🔧 **snRNA-lengte 100–190 nt, "uridinerijk"**: geen gelezen bron → geschrapt; in de infotabel vervangen door de U12/U11-uitzondering (Turunen 2013).
- 🔧 **Hoechst en DAPI "in de AT-rijke kleine groef"** → Hoechst 33258 in de AT-rijke kleine groef (Pjura et al. 1987), DAPI als kleine-groefbinder (Barcellona & Gratton 1996); bronnen toegevoegd.
- ✅ **cisplatine tegen o.a. teelbal-, eierstok- en longkanker** (Dasari & Tchounwou 2014); bron toegevoegd.
- 🔧 **daunorubicine "tegen leukemie"**: niet in een gelezen bron → geschrapt; "borstkanker" blijft (Nitiss 2009).
- ✅ **RPA-bedekt ssDNA activeert ATR** (Zou & Elledge 2003); bron toegevoegd.
- 🔧 **"nucleosomen om de ~200 bp"**: geen gelezen bron → geschrapt; nu "rij nucleosomen verbonden door linker-DNA; H1 bindt kort waar het DNA in- en uitgaat" (Flanagan & Brown 2016); bron toegevoegd.

## Te verwerken in gedeelde bestanden
Geen.

## Eindoordeel
Ongeveer 425 uitspraken nagekeken, 34 correcties (❌ 9, 🔧 25) en 26 nieuwe, gelezen bronnen; geen uitspraak zonder gelezen bron of eigen meting blijft over. De ernstigste fouten zaten in de beschrijving van de 3D-structuren zelf (1LNT-mismatchlus en 1D4R-G·U-telling, nagemeten in de coördinaten) en in te stellige of verouderde uitspraken (U1 bij "elk" intron, seed 2–8 voorgevormd, Ti-plasmide ~200 kb, GENCODE-aantal). Alle PDB-codes, organismen, ketenrollen en bronvermeldingen kloppen. `node --check` op alle aangepaste bestanden: OK.
