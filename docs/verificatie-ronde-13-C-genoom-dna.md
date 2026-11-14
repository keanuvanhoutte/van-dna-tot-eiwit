# Verificatieronde 13 — pakket C: genoom & DNA (14-11-2026)

**Bereik.** Knopen `kern`, `nucleolus`, `chromosoom`, `chromatine`, `nucleosoom`, `histonmod`, `dnamethyl`, `gen` (`shared/details/genome.js`) en `dnahelix`, `dnavormen`, `noncanon`, `basenparing`, `nucleotide`, `supercoiling` (`shared/details/genome2.js`); de scènes in `app/scenes/genome/` behalve `remodeler`, `lussen`, `enhancer`, `xinact`, `imprinting`, inclusief de hulpbestanden `_a_kit`, `_b_chem`, `_b_helix`, `_b_pdb`, `_kernsvg`, `part_a`, `part_b`; de samenvattingen `s` / `S_EN` in `shared/graph.js` / `graph.en.js` en de korte stapnamen in `shared/steptags.js`. NL en EN samen.

**Methode.**
- Alle PubMed-samenvattingen van de bronnen gelezen via E-utilities (o.a. Nurk 2022, Luger 1997, Davey 2002, Ou 2017, Rao 2014, Fudenberg 2016, Davidson 2019, Saxonov 2006, Deaton 2011, Moore 2013, Jones 2012, Tahiliani 2009, de Lange 2005, Altemose 2022, Amaral 2023, Wang 1979 (Z-DNA), Rich & Zhang 2003, Parkinson 2002, Zeraati 2018, Leroy 1988, Champoux 2001).
- Volledige teksten gelezen (PMC/Europe PMC/BioC): McGinty & Tan 2015, Rao 2014, Ou 2017, Nurk 2022 (T2T), Aubert 2018, Lam & Trinkle-Mulcahy 2015, Bannister & Kouzarides 2011, Moore 2013, Deaton & Bird 2011, Varshney 2020, Hisey 2024, Pommier 2016, Yakovchuk 2006, Nikolova 2011, Drew 1981 (samenvatting), Liu & Wang 1987 (samenvatting) en nieuw gevonden bronnen (zie onder).
- Alberts 4e (NCBI Bookshelf gaf een captcha): dezelfde hoofdstukken gelezen via een archiefkopie (web.archive.org): NBK26834, NBK26847, NBK26887, NBK26821, NBK26850, NBK26932, NBK26934.
- RCSB-API voor 1BNA, 440D, 1DCG, 1KF1, 143D, 1D3X, 1KX5, 1AOI, 1A36, 1ZXM, 3QX3 (titel, methode, resolutie, organisme per entiteit).
- **Eigen metingen** met Python in `data/pdb`: 1BNA / 440D / 1DCG (helische stijging en twist via basenpaarframes, C1′–C1′, H-bruggen, P–P binnen een streng, suikerpuckering δ en glycosidische hoek χ); 1KF1 (K⁺-coördinatie, Hoogsteen-H-bruggen, afstand tussen G-kwartetten); 1KX5 (afmetingen van de DNA-schijf, H3-staartsequentie, organisme per keten); 1EHZ (G4·U69-wobble).
- De eerdere verslagen (ronde 1–9) pas na de eigen controle gelezen. Waar die een getal "bevestigd" noemden zonder dat ik een gelezen bron of meting vond, heb ik het toch aangepast (zie "verworpen").

**Nieuwe, gelezen bronnen toegevoegd:** Alberts NBK26932 (kernporiën); Rodriguez-Algarra et al. 2025 (rDNA-eenheid 13 + 30 kb, 43→45 kb); Kubitscheck & Siebrasse 2024 (~10 000 subeenheden/min, CRM1/XPO1); Makrantoni & Marston 2018 (profaseroute, shugoshin); Moser & Swedlow 2011 (lussen rond een as); Srinivas et al. 2020 (telomeer 10–15 kb, overhang 50–300 nt); Thakur et al. 2021 (α-satelliet 171 bp, CENP-A); Padeken et al. 2022 (heterochromatine aan lamina en nucleolus, HP1-chromodomein); Creyghton et al. 2010 (H3K27ac actieve enhancers); Kaustov et al. 2011 (CBX-chromodomeinen); Ito et al. 2011 en He et al. 2011 (5fC/5caC, TDG); Burset et al. 2000 (GT-AG 99,24 %); Proudfoot 2011 (AAUAAA, 20–30 nt); ENCODE 2012 (1,22 % eiwitcoderende exonen); Wang 1979 PNAS (10,4 bp/winding in oplossing); Marini et al. 2021 (A/B-parameters); Tang 2022 (Z-DNA); Spiegel et al. 2020 (G4-topologieën); Heider et al. 2017 (reactieve 2′-OH); Dorman 2026 (Lk/Tw/Wr; type I/II in stappen van 1/2); Hisey et al. 2024 nu ook bij `supercoiling`; Li et al. 2005 (nucleosomaal "ademen", alleen als bron voor de tijdregel).

---

## kern
- ✅ Dubbel membraan, buitenmembraan loopt door in het ER, kernlamina, kernporiën (Alberts NBK26932).
- ✅ "Orde van duizenden" kernporiën; Alberts: 3000–4000 per typische zoogdierkern (nu als bron toegevoegd).
- ✅ Kleine moleculen diffunderen vrij, grote met NLS actief (Alberts NBK26887/NBK26932).
- ✅ 46 chromosomen, ~6 miljard bp ≈ 2 m (T2T 3,055 Gb haploïd; McGinty: genoom > 2 m, kern < 10 µm).
- 🔧 Scène stap 3: "compacte stukken liggen *vooral* aan de rand" → "*vaak* aan de rand" (heterochromatine ligt ook rond de nucleolus; Padeken 2022).

## nucleolus
- ✅ Geen membraan, vormt zich rond NOR's op de 5 acrocentrische chromosomen (Lam & Trinkle-Mulcahy 2015; Aubert 2018).
- ✅ 47S pre-rRNA met 5′ETS-18S-ITS1-5.8S-ITS2-28S-3′ETS; fibrillarine (C/D) en dyskerine (H/ACA) (Aubert 2018).
- ✅ 5S door Pol III op chr 1 (Aubert 2018); 33 + 47 = 80 ribosomale eiwitten (Aubert 2018).
- ✅ 1–3 nucleoli, tot 10 NOR's (Lam & Trinkle-Mulcahy 2015); ~80 % van het RNA is rRNA in snel delende cellen (Alberts).
- ✅ CRM1/XPO1 bij de export van pre-60S en pre-40S (Kubitscheck & Siebrasse 2024).
- 🔧 Herhaling "~43 kb" → "~43–45 kb" (T2T: 45 kbp; Rodriguez-Algarra: 13 kb + 30 kb IGS, referentie 43→45 kb). Details en scènelabel.
- 🔧 rDNA-kopieën "vaak ~400" → "gemiddeld ~300–400" (T2T: gemiddeld 315 ± 104; CHM13 ~400; Aubert ~400).
- ❌ Scène stap 3: "De tussenstukken worden niet afgelezen" — fout: Pol I schrijft ook stukken van de intergene spacer af (niet-coderende IGS-RNA's; Lam & Trinkle-Mulcahy 2015). → "De tussenstukken worden geen ribosoom-RNA."
- 🔧 Tijdregel "rDNA → subeenheid in het cytoplasma ~30–60 min" had geen gelezen bron → "groeiende cel: ~10 000 subeenheden per minuut" (Kubitscheck & Siebrasse 2024). "Duizenden ribosomen per minuut" in stap 8 is daarmee ook gedekt.

## chromosoom
- ✅ Lengtes in het karyogram = T2T-CHM13 v2.0 (chr1 248,4 … chr21 45,1 Mb); "chr1 ruim 5× chr21" (248,4/45,1 = 5,5).
- ✅ Separase knipt cohesine, kinetochoor op het centromeer (Alberts NBK26934); profaseroute en shugoshin aan het centromeer (Makrantoni & Marston 2018); lussen rond een as (Moser & Swedlow 2011); ~10 000× compactie (Alberts NBK26834); territoria (Alberts NBK26847).
- ✅ α-satelliet 171 bp, CENP-A-nucleosomen onder het kinetochoor (Thakur 2021); shelterin, 3′-overhang (de Lange 2005; Srinivas 2020).
- 🔧 Telomeerlengte "enkele tot ~15 kb" → "typisch ~10–15 kb" (Srinivas 2020).

## chromatine
- ✅ Contactdomeinen mediaan 185 kb, ~10 000 lussen, >90 % convergente CTCF (Rao 2014); 5–24 nm-keten (Ou 2017); lusextrusie tot 2,1 kb/s (Davidson 2019); 30 nm-vezel in vitro (Alberts; McGinty).
- ✅ Heterochromatine tegen lamina en nucleolus (Padeken 2022, nu als bron).
- 🔧 Simplified "een lus ~50 kb–1 Mb" → "meestal korter dan 2 Mb" (Rao: 98 % van de lussen < 2 Mb).
- 🔧 Simplified "in de meeste levende cellen" → "in kernen van menselijke cellen zag men met ChromEMT" (Ou onderzocht gefixeerde menselijke cellen).
- 🔧 Stap 2 "vooral aan de rand" → "vaak"; stap 5 "compact chromatine is stil" → "meestal stil" (ook de kort-tekst zegt "meestal").

## nucleosoom
- ✅ 146 bp, 1,65 linkshandige windingen (Luger; McGinty), 147 bp in 1KX5 (Davey); handdruk H3–H4 / H2A–H2B; arginines in de kleine groef; 14 plaatsen = SHL ±0,5 … ±6,5 (McGinty).
- ✅ Afmetingen: eigen meting 1KX5 — DNA-schijf 12,1 nm breed (buitenrand), 5,5 nm hoog; McGinty ~10 nm. "~11 nm" blijft staan.
- ✅ 1KX5: ketens A/E = H3, B/F = H4, C/G = H2A, D/H = H2B (Xenopus laevis), I/J = DNA (humane α-satellietsequentie) — klopt met het org-label.
- 🔧 Linker-DNA "tientallen bp (typisch ~20–80)" → "enkele tot ~80 bp" (Alberts NBK26834).
- 🔧 "Het tetrameer bindt *als eerste*" (details en scène stap 3): geen gelezen bron voor de volgorde → "geraamte van het octameer, houdt het middelste stuk DNA vast" (Alberts; McGinty).
- 🔧 Tijdregel "ademen: ms – s" → "~0,25 s gewikkeld, ~10–50 ms los" (Li et al. 2005).

## histonmod
- ✅ HAT + acetyl-CoA, neutralisatie van de lading, HDAC, LSD1 en JmjC, SAM, PHD ↔ H3K4me3 (ING), HP1-chromodomein ↔ H3K9me3, bromodomein ↔ acetyl-lysine, EZH2 in PRC2, HDAC-remmers bij kanker (Bannister & Kouzarides 2011).
- ✅ Zes lysines in residuen 1–30 van H3 (K4, K9, K14, K18, K23, K27): eigen controle in de sequentie van 1KX5 keten A.
- ❌ Simplified "acht staarten per nucleosoom" — er zijn er tien: acht N-terminale + twee C-terminale (H2A) (McGinty 2015). Verbeterd; figuurlabel → "8 N-staarten".
- 🔧 Methionine-nummering geschrapt (geen gelezen bron).
- 🔧 "Polycomb-CBX ↔ H3K27me3" → "binden H3K27me3, maar minder specifiek" (Kaustov 2011).
- 🔧 "H3K27ac (enhancer/promoter)" → "H3K27ac (actieve enhancers)" (Creyghton 2010).
- 🔧 Lezertabel: BRD4 en TAF3 geschrapt (niet in gelezen bron), ING behouden; enzymlabel "SET1/MLL" → "bv. SET1" (Bannister).
- 🔧 Tijdregel "acetylatie: minuten; methylatie: uren tot celgeneraties" → "acetylatie snel omkeerbaar; methylatie stabieler, deels doorgegeven bij celdeling" (Bannister).
- 🔧 "Een lysine draagt nooit tegelijk acetyl en methyl" geschrapt (geen bron, te stellig).

## dnamethyl
- ✅ 5mC op C5, CpG, DNMT3A/B + DNMT3L, DNMT1 + UHRF1, hemigemethyleerd, MBD/MeCP2, niet-CpG-methylatie in stamcellen en neuronen, transposons/X/imprinting (Moore 2013); CGI-promoters stilgelegd via methylatie (Deaton 2011); TET → 5hmC (Tahiliani 2009).
- ❌ "TDG en BER vervangen 5hmC, 5fC en 5caC door C" — TDG knipt 5caC (en niet 5hmC). → "TDG knipt 5caC weg en BER zet er weer een C" (He 2011; Ito 2011).
- 🔧 "~70–80 % van de CpG's gemethyleerd" (geen gelezen bron) → "de meeste, behalve in CpG-eilanden" (Moore).
- 🔧 CpG-eilanden "in ~60–70 % van de promoters" → "~70 %" (Saxonov 72 %; Deaton en Moore ~70 %).
- 🔧 "Een gemethyleerde promoter wordt stilgelegd" / scène stap 6 "gaat het gen uit" → "meestal" (Jones 2012: het verband is genuanceerd).

## gen
- ✅ GT…AG (99,24 % van de menselijke intronen; Burset 2000), vertakkingspunt-A (Alberts), "net geen 20 000" eiwitcoderende genen (Amaral 2023; T2T 19 969).
- ✅ Enhancer–promoterlussen tot honderden kb (Rao: MYC-lus ~400 kb, α-globine ~70 kb); minderheid van de promoters met TATA (Deaton: CGI-promoters missen meestal een TATA-box).
- ✅ Tijd "minuten tot uren": Pol II ~20 nt/s (Alberts) × genlengte van enkele kb tot > 1 Mb.
- 🔧 TATA "~−30" → "~25 bp vóór de start" / label "≈ −25" (Alberts: typisch 25 nt stroomopwaarts).
- 🔧 Knipplaats "~10–30 nt" → "~20–30 nt" na AAUAAA (Proudfoot 2011).
- 🔧 Coderend deel "~1–1,5 %" → "≈ 1,2 % (eiwitcoderende exonen)" (ENCODE 2012: 1,22 %).
- 🔧 "(cohesine en Mediator)" → "(o.a. via cohesine)" (Mediator: geen gelezen bron); scènelabel "10–1000 kb" → "tot honderden kb".

## dnahelix
- ✅ Antiparallel, rechtshandig, grote groef voor eiwitherkenning (MOTM DNA; Alberts NBK26821).
- ✅ 10,4 ± 0,1 bp/winding in oplossing tegenover 10 in het vezelmodel (Wang 1979, toegevoegd); Marini 2021: 10,5 bp, 3,4 Å, 20 Å, C2′-endo. Eigen meting 1BNA: stijging 3,35 Å, twist 35,9° (in het kristal ≈ 10 bp/winding; Drew: 36,9° in het midden). "≈ 10,5" en "≈ 34°" blijven binnen de foutmarge.
- ✅ C1′–C1′ 10,2–10,9 Å en H-bruggen 2,6–3,2 Å (gemiddeld 2,83 Å), gemeten in 1BNA.

## dnavormen
- ✅ A-DNA: 11 bp/winding, 2,6 Å/bp, ~23 Å, C3′-endo, ~19° gekanteld, diepe smalle grote groef en brede kleine groef (Marini 2021). Eigen meting 440D: stijging binnen ≈ 2,1–2,9 Å (gemiddeld ≈ 2,55), twist 31,8° → 11,3 bp/winding, δ = 67–90° (C3′-endo).
- ✅ Z-DNA: 12 bp/winding (Wang 1979 Nature), 44,6 Å per winding, 18 Å, syn-purine en anti-pyrimidine, geen echte grote groef, diepe kleine groef, B↔Z bij hoog zout (Tang 2022); negatieve supercoiling en Zα/ADAR1 (Rich & Zhang 2003; Tang 2022). Eigen meting 1DCG: stijging ≈ 3,67 Å; G δ ≈ 91–101°, χ ≈ +60° (syn, C3′-endo); C δ ≈ 140–148°, χ ≈ −150° (anti, C2′-endo); twist −10° / −51° per stap.
- 🔧 "≈ 5,9 i.p.v. ≈ 7,0 Å" (Saenger, niet gelezen) → eigen meting "≈ 6,0 Å in 440D i.p.v. ≈ 6,7 Å in 1BNA".
- 🔧 Tijdregel "ms – min" (geen bron) → "overgangen zijn omkeerbaar (bv. B ↔ Z bij hoog zout)" (Tang).
- 🔧 Extra "A-DNA 2,3–2,6 Å/bp, 23–26 Å" (niet gedekt) → algemene zin over meetwijze.

## noncanon
- ✅ 8 Hoogsteen-H-bruggen per kwartet en K⁺ gecoördineerd door 8 × O6: eigen meting 1KF1 (twee K⁺ met 8 O6 binnen 3,2 Å; N1–O6/N2–N7 2,7–3,3 Å).
- ✅ 1KF1 = parallelle propeller met K⁺ (Parkinson 2002); 143D = Na⁺-mand (NMR); 1D3X = intramoleculaire pyrimidinetriplex (T·A–T, C⁺·G–C; RCSB-titel en sequentie); Hoogsteen-triaden TA*T / CG*C⁺ en spiegelherhalingen (Hisey 2024); C⁺:C-paren, zure pH, helicasen, MYC, kanker (Varshney 2020); overhang 50–300 nt (Srinivas 2020).
- ❌ Afstand tussen G-kwartetten "≈ 3,3 Å" → gemeten in 1KF1: 3,40 en 3,43 Å → "≈ 3,4 Å".
- 🔧 H-DNA "de helft van de *pyrimidine*streng vouwt terug" → "de helft van één streng (hier de pyrimidinestreng)": er bestaan H-y- en H-r-vormen (Hisey 2024).
- 🔧 i-motief "(3 H-bruggen)" geschrapt (geen gelezen bron), ook het figuurlabel → "half-geprotoneerd paar".
- 🔧 "Negatieve supercoiling levert de energie voor deze structuren" → "helpt zulke structuren (vooral Z-DNA, kruisvormen, H-DNA) ontstaan" (Hisey; Rich & Zhang).
- 🔧 "Hybride (3+1) G4's overheersen vaak in K⁺" geschrapt; wel "er bestaan nog andere vouwingen, bv. hybride" (Spiegel 2020).
- 🔧 Telomeerlabel "≈ 5–15 kb" → "≈ 10–15 kb" (Srinivas 2020); tijdregel "ms – min" → "tijdelijk, o.a. tijdens transcriptie en replicatie" (Varshney).

## basenparing
- ✅ H-brugpatronen A–T en G–C, C1′–C1′ ≈ 10,5 Å, H-bruggen 2,8–3,0 Å: eigen meting 1BNA. GC 41 % (IHGSC 2001, gelezen op nature.com). Stapeling stabiliseert meer dan paring (Yakovchuk 2006). Basenparen openen één voor één, levensduur ms (Leroy 1988).
- ✅ Wobble G·U: 2 H-bruggen (O6–N3 2,91 Å, N1–O2 2,82 Å), gemeten in 1EHZ G4·U69.
- 🔧 Hoogsteen "C1′–C1′ ≈ 8,5 Å" (staat niet in Nikolova 2011) geschrapt; label → "A draait naar syn" (Nikolova).
- 🔧 "Wobble verschuift U naar de grote groef" (niet gedekt) → "paart verschoven, met 2 H-bruggen" (meting 1EHZ).

## nucleotide
- ✅ Opbouw, N9/N1, β-glycosidisch, 3′→5′-fosfodiësterbinding, puckering, χ-definities (Alberts NBK26821/26883; eigen torsiemeting in 1BNA/440D/1DCG met dezelfde atoomdefinities).
- ✅ "2′-OH maakt RNA reactiever": nu gedekt door Heider 2017 ("reactive 2′-hydroxyl … RNA much less stable than DNA").
- 🔧 P–P-balkjes en simplified "≈ 7,0 / ≈ 5,9 Å (Saenger 1984)" → eigen meting "≈ 6,7 Å (1BNA) / ≈ 6,0 Å (440D)".

## supercoiling
- ✅ Lk = Tw + Wr, type I in stappen van 1, type II in stappen van 2 (Dorman 2026); twin-domain (Liu & Wang 1987; Pommier); TOP1 zonder energie, covalent via Tyr; TOP2 met ATP en strengdoorgang (Alberts NBK26850; Pommier); camptothecine, etoposide, doxorubicine; TOP2 ontwart chromatiden (Pommier).
- 🔧 "σ ≈ −0,06 in cellen" → "fysiologisch ≈ −0,05" (Hisey: σ = −0,05 fysiologisch; tot −0,07 na het verwijderen van nucleosomen; netto superhelicale spanning in eukaryote cellen laag). Details, facts en scènelabel.
- 🔧 "≈ −1 per nucleosoom" (details) en "ΔLk ≈ −1" (scène) geschrapt (geen gelezen bron); vervangen door "zit grotendeels vast in nucleosomen; komt vrij als nucleosomen loskomen" (Hisey).
- 🔧 Tijdregel "topo-isomerasecyclus ms – s" → "spanning ontstaat bij transcriptie en replicatie"; label "TOP2 (dimeer)" → "TOP2" (dimeer niet in een gelezen bron).

## 3D-scènes / PDB
- ✅ 1BNA (1,9 Å, CGCGAATTCGCG), 440D (1,1 Å, d(AGGGGCCCCT)), 1DCG (1,0 Å, d(CGCGCG)), 1KF1 (2,1 Å), 143D (NMR), 1D3X (NMR), 1KX5 (1,94 Å), 1AOI (2,8 Å), 1A36 (TOP1–DNA, 2,8 Å), 1ZXM (TOP2A-ATPase, 1,87 Å), 3QX3 (TOP2B–DNA–etoposide, 2,16 Å): titels en organismen kloppen met de labels.
- ✅ Nucleosoomscène: residubereiken van de histonplooi (H3 63–131, H4 30–93) en staarten (H3 1–37, H4 1–24) passen bij de ketens in 1KX5.

## Graph-, en stapsamenvattingen
- ✅ `s`/`S_EN` voor alle 14 knopen nagelezen: geen fouten. `steptags.js` past bij de (ongewijzigde) staptitels.

## Te verwerken in gedeelde bestanden
Geen.

## Verworpen (bron of eerdere conclusie niet overgenomen)
- Ronde 2/3 noemden "~70–80 % CpG gemethyleerd" bevestigd via Petryk et al. 2021, maar die bron staat niet in de app en ik heb ze niet gelezen → herschreven met Moore 2013.
- Ronde 2/3: "Hoogsteen C1′–C1′ ≈ 8,5 Å (Nikolova 2011)" — de volledige tekst van Nikolova bevat dat getal niet → geschrapt.
- Ronde 3: P–P 7,0/5,9 Å en kwartetafstand 3,3 Å "volgens Saenger" — Saenger niet raadpleegbaar; mijn metingen geven 6,7/6,0 Å en 3,4 Å → aangepast.
- Ronde 2/3: σ ≈ −0,06 en ΔLk ≈ −1 per nucleosoom — geen gelezen bron; Hisey 2024 geeft −0,05 → aangepast.
- Ronde 2/3: BRD4 en TAF3 als voorbeeldlezers — niet in Bannister 2011 → geschrapt.
- Mijn eigen meting van de helixbreedte (A ≈ B op korte oligo's) is te grof om "A ≈ 23 Å" te bevestigen of te ontkrachten; daarvoor geldt Marini 2021.

## Eindoordeel
Ongeveer 470 uitspraken nagekeken (details NL+EN, staptitels en -teksten, figuurlabels, legend/scale/time/org/simplified/extra, PDB-gegevens). 57 correcties (4 ❌, 53 🔧; daarbij ook de bronvermelding van de nucleolusreview, die nu de auteurs Lam & Trinkle-Mulcahy noemt), alle NL+EN samen; `node --check` slaagt op alle aangepaste bestanden. Na deze ronde staat er in dit pakket geen uitspraak meer die niet in een gelezen bron staat of uit een eigen meting volgt.
