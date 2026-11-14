# Verificatieronde 13 — pakket L: verhalen, woordenlijst, startpagina en "Over de app" (14-11-2026)

**Bereik:** `shared/glossary.js` (57 vakwoorden, NL + EN), `app/story.js` (alle titels van verhalen en zijpaden, alle 104 brugzinnen), `index.html` (alle zichtbare teksten in `T`, de kaarten, de getallen en de draaiende helix), `docs/over.js` en `docs/over-data.js` (pagina "Over de app"), en de samenvattingen `s` / `S_EN` van de 12 knopen van de bacterieroute (`bcel`, `bnucleoid`, `bplasmide`, `bgen`, `bpol`, `bterm`, `bmrna`, `bribosoom`, `bafbraak`, `breplicatie`, `btrp`, `bsplicing`; enkel rapporteren).

**Methode (onafhankelijke controleur, de tekst niet zelf geschreven):**
- Elke uitspraak gelezen in NL en EN, met aandacht voor te stellige woorden, verkeerde volgorde en NL ≠ EN.
- Uitspraken over de app zelf zijn nagegaan in de code en met scripts: alle 125 scènes ingeladen in Node (met een DOM-stub) om `scale`, `time`, `org` en `simplified` per scène op te vragen; sneltoetsen in `app/engine.js`; `localStorage`-gebruik; externe aanvragen (Google Fonts, jsDelivr voor 3Dmol.js, RCSB/UniProt in de 3D-bibliotheek); de zoekmotor (`makeSearch`, "crosslink" → `herstel`, `ber`, `ner`); de getallen op de startpagina (125 knopen, 69 PDB-codes, 9 lijnen); alle PDB-codes van de knopen staan lokaal in `shared/pdb.js`.
- DSSP-uitspraak: de energieformule in `app/atomic.js` (0,084 · 332 · (1/rON + 1/rCH − 1/rOH − 1/rCN), drempel −0,5 kcal/mol) vergeleken met Kabsch & Sander 1983 (Crossref 10.1002/bip.360221211); `analyseProtein` zelf gedraaid op `data/pdb/1UBQ.pdb`: helix 23–34, strengen 2–7, 12–16, 41–45, 48–49, 66–71 tegenover de HELIX/SHEET-records 23–34, 1–7, 10–17, 40–45, 48–50, 64–72 en 3₁₀-helix 56–59.
- 3Dmol.js: Crossref 10.1093/bioinformatics/btu829 = Rego & Koes, *Bioinformatics* 31:1322–1324 (online dec. 2014, nummer 2015); geladen via `cdn.jsdelivr.net/npm/3dmol@2.5.5`.
- Alle 68 DOI's in de bronvermeldingen (uitlegpanelen + 3D-bibliotheek) opnieuw via de Crossref-API opgevraagd en eerste auteur/titel vergeleken met het label.
- PDB-ID's van de bacterieroute via `data.rcsb.org/rest/v1/core/entry/<ID>`: 6ZTJ, 4YBB, 6WRF, 1IHF, 6OUL, 1U6B, 5AFI, 5UAC; atomen per residu per keten in `data/pdb/5AFI.cif` geteld (ribosoom CA/P, tRNA/mRNA/EF-Tu volledig).
- Over-data: elk getal (checked, corrections, datum) en elk voorbeeld teruggezocht in de verslagen `docs/verificatie-ronde-*.md` en `FIXES.md`.
- Nieuwe bronnen voor verzachtingen, gelezen via Europe PMC: Lynnerup et al. 2008 (PMID 18231610, ooglenseiwitten zonder vernieuwing), Khong et al. 2017 (PMID 29129640, "only 10% of bulk mRNA molecules accumulate in mammalian stress granules"), Licht et al. 2019 (PMID 30462291, inosine "primarily interpreted as guanosine", ook als A of U), Mahjoubin-Tehran et al. 2026 (PMID 42121345, AP-1 = Jun-Jun, Jun-Fos, Jun-ATF).
- Eerdere verslagen pas na de eigen controle gelezen.

Legende: ✅ bevestigd · ❌ fout → verbeterd · 🔧 verzacht/herschreven

---

## 1. `shared/glossary.js`

- ✅ 55 van de 57 uitleggen kloppen in NL en EN (o.a. A–T/G–C, 20 standaardaminozuren, 46 chromosomen "meestal", ER, Golgi, kinase = fosfaat van ATP, siRNA, telomeer, topo-isomerase, waterstofbrug).
- 🔧 `cap`: "een omgekeerd geplaatste G" → "een G met een extra methylgroep, omgekeerd vastgemaakt" (7-methylguanosine via 5′–5′-brug; staat zo in `shared/details/rna.js` met Ramanathan et al. 2016, NAR, DOI 10.1093/nar/gkw551).
- 🔧 `inosine`: "het ribosoom leest ze als G" → "meestal als G" (Licht et al. 2019: vooral als G, soms als A of U).
- Opmerking (geen fout): 13 sleutels in `[[…|…]]` in de uitlegpanelen hebben geen woordenlijstitem (`bcel`, `bnucleoid`, `bplasmide`, `bpol`, `bterm`, `bribosoom`, `btrp`, `initiatie`, `kern`, `nucleosoom`, `splicing`, `resistentie`, `xinact`); de engine toont ze als gewone tekst.

## 2. `app/story.js`

Titels van de 9 lijnen: ✅ (kloppen met de inhoud; volgorde van de hoofdstukken ✅).

Verhaal 1 (virus):
- ✅ adenovirus → endocytose → capside naar kernporie → kern → chromatine → nucleosoom → … → afbraak.
- ❌ `nucleosoom`: "Rond elk nucleosoom zit de dubbelhelix zelf" (het nucleosoom ís DNA + histonen) → "Rond de histonen van elk nucleosoom ligt de dubbelhelix zelf".
- 🔧 `vouwing` (ook in verhaal 2): "Eerst vormen zich lokale structuren" legde een vouwingsvolgorde vast die niet voor elk eiwit geldt → "De eerste bouwlaag van die vorm: lokale structuren zoals helices en β-bladen".
- 🔧 `ptm`: "Elk eiwit wordt uiteindelijk ook weer afgebroken" → "Bijna elk eiwit …" (ooglenseiwitten worden rond de geboorte gemaakt en niet vernieuwd: Lynnerup et al. 2008).

Verhaal 2 (signaal):
- ✅ EGF → RTK → kinasecascade → ERK in de kern → FOS-promoter → … → afbraak; ERK fosforyleert c-Fos (al nagekeken in ronde 4).
- 🔧 `mapk`: "zet een gen aan" → "helpt een gen aanzetten" (ERK werkt via Elk-1/SRF, zie scène `srf`).
- 🔧 `tertiair`: "c-Fos werkt pas samen met een partner (c-Jun)" → "werkt samen met een partner, zoals c-Jun" (AP-1 kent ook andere Jun-partners; Mahjoubin-Tehran et al. 2026; heterodimeer in Glover & Harrison 1995, al in de app).

Bacterie:
- ✅ volgorde bcel → vergelijk → nucleoïd → plasmide → gen → σ-factor → lac-operon → terminatie → mRNA → 70S + RNA-polymerase in 3D (6ZTJ = "E. coli 70S-RNAP expressome") → EF-Tu in 3D (5AFI) → code → vouwing → GroEL–GroES → afbraak zonder ubiquitine.
- 🔧 `bpol`: "Zo wordt een groep genen samen aan- en uitgezet" (alsof de σ-factor het operon regelt) → "Soms wordt …".
- 🔧 `operon`: "het kopiëren" (elders = replicatie) → "het afschrijven naar RNA".

Zijpad antibiotica:
- ✅ rifampicine in 3D (5UAC), kirromycine zet EF-Tu vast en dat staat in 5AFI (ligand KIR op keten z), resistentie.
- 🔧 `beftu`: "Andere antibiotica raken het DNA: ze zetten gyrase vast" → "mikken op een enzym dat het DNA ontspant: ze zetten gyrase vast op het DNA" (het doelwit is het enzym).

Zijpad herstel:
- ✅ startplaats één keer per celcyclus, losse strengen, telomeren, MMR → BER → NER → DSB ("een van de gevaarlijkste", zoals ronde 7) → mutatie.
- 🔧 `dsb`: "Wie beslist …? Dat doet p53" → "Wie helpt beslissen …? Een sleutelrol speelt p53" (p53 is niet de enige beslisser).

Zijpad eiwitlot:
- ✅ vettige label → ER → membraan → Golgi → lysosoomlabel → kernimport → mitochondrion (twee membranen) → peroxisoom neemt gevouwen op.
- 🔧 `perox`: "Elk eiwit wordt ooit afgebroken. Eerst krijgt het een afbraaklabel" → "Bijna elk eiwit … Vaak krijgt het eerst een afbraaklabel" (zie hierboven; ook ubiquitine-onafhankelijke afbraak bestaat).

Zijpad epigenetica:
- ✅ nucleosoom = DNA rond acht eiwitten, remodelers, histonmerktekens, DNA-methylering, lussen, X-inactivatie, imprinting.
- ❌ `lussen`: NL "verre versterker" ≠ EN "distant switch" → NL "verre versterker (enhancer)", EN "distant booster (enhancer)".

Zijpad virussen: ✅ alle 10 brugzinnen (twee routes naar binnen, positief RNA meteen aan het werk, Mpro als schaar, fagen, CRISPR, LNP).

Zijpad RNA:
- ✅ lokalisatie, afbraak, NMD, kleine RNA's, lncRNA, structuur, riboswitch.
- 🔧 `korrels`: "houdt de cel haar mRNA's even apart" → "een deel van haar mRNA's" (Khong et al. 2017: ≈ 10 % van het mRNA).

## 3. `index.html` (startpagina)

- ✅ A–T twee en G–C drie waterstofbruggen; ≈ 10,5 bp per winding; de helix-tekening paart A–T en G–C juist en toont een kleine en grote groef.
- ✅ Getallen worden live uit de inhoud geteld (125 animaties: elke knoop heeft een scène; 69 PDB-codes, alle 4-tekencodes van gemeten structuren; 9 verhalen en zijpaden).
- ✅ Route-teksten, "drie soorten ingangen", "Uitzoomen"/"Startmenu" (bestaan in `app/engine.js`), "Met twee echte 3D-structuren" (5UAC en 5AFI).
- 🔧 `why`: "informatie … nooit terug uit een eiwit" → "de volgorde-informatie … nooit van een eiwit terug" (het centrale dogma gaat over volgorde-informatie; RNA → DNA bestaat wel).
- 🔧 `c2p`: "alle vormen van DNA en RNA" → "veel vormen" (37 items).
- 🔧 `c2r`: "elk eiwit of gen zelf opzoeken" → "zelf een eiwit of gen opzoeken in de PDB" (er komt enkel iets terug als er een gemeten structuur bestaat).
- 🔧 `s1p`: "precies één keer kopieert" → "precies één keer per celcyclus".
- 🔧 `s3p`: "Elke cel heeft hetzelfde DNA" → "Bijna elke cel van je lichaam heeft hetzelfde DNA" (rode bloedcellen zonder kern, geslachtscellen, herschikte genen in B- en T-cellen).
- 🔧 `foot`: "Alle inhoud is nagekeken" → "De inhoud is in controlerondes nagekeken" (zie punt 4: één scène staat in geen enkel eerder verslag).

## 4. `docs/over.js` en `docs/over-data.js`

Bevestigd:
- ✅ 3Dmol.js = Rego & Koes 2015 (Crossref), open source, echt gebruikt (`app/kit3d.js`).
- ✅ DSSP-formule en drempel = Kabsch & Sander 1983; geen 3₁₀/π-helices (`app/real3d.js` zegt dat ook); de vergelijking met 1UBQ klopt exact (zie methode).
- ✅ Ramachandran-punten en waterstofbruggen worden berekend; aminozuren bij translatie volgen uit de code (`translate()` in `app/scenes/tl/translatie.js`).
- ✅ Sneltoetsen spatie, ←/→, Esc, M, /, C bestaan zoals beschreven; "Volgend hoofdstuk", "Voor wie meer wil", "Wat is hier vereenvoudigd?", "Bekijk echt in 3D", "Atoomniveau", "Bedoel je…", ⚙-snelheid, "hier ben je" in geel, drie kaartweergaven, mens ⇄ bacterie (`app/orgswitch.js`).
- ✅ Elke animatie heeft `simplified`, `org` en `scale` (125/125, aliassen via hun basisscène).
- ✅ GitHub-repo is openbaar.
- ✅ Aantallen en voorbeelden per ronde teruggevonden in de verslagen: ronde 3 = 610 + 330 + 400 = 1340; ronde 4 = 150 + 175 = 325; ronde 5 = 560 + 390 + 470 = 1420; ronde 6 ≈ 260 en 23/23; ronde 7: 17; ronde 8: 12; ronde 12: ≈ 140 en 6 + 13 = 19 correcties, 17 bronnen; alle 36 voorbeelden en 15 afgewezen gevallen staan in de verslagen.
- ✅ Geen Wikipedia-bronnen in de app; de vermelde handboeken en databanken komen voor.

Verbeterd:
- 🔧 3D-bibliotheek: "zelf elk eiwit of gen opzoeken in de volledige PDB" → "een eiwit of gen opzoeken: de app zoekt dan in de volledige PDB naar gemeten structuren".
- ❌ Privacy: "Enkel je taalkeuze en enkele weergavekeuzes worden onthouden" → ook het laatst gekozen verhaal en recent bekeken 3D-codes (`localStorage` in `app/engine.js`, `atlas/atlas.js`); en vermeld dat lettertypes, de 3D-viewer en het zoeken bestanden ophalen bij Google Fonts, jsDelivr, RCSB en UniProt. "er worden geen gegevens verzameld" → "Dogma verzamelt geen gegevens".
- 🔧 "Erg grote complexen zijn ingekort tot één bolletje per bouwsteen" (2×) → "(een deel van) de structuur": in 5AFI zijn tRNA, mRNA en EF-Tu volledig, enkel het ribosoom is CA/P.
- ❌ Stat "125/125 onderwerpen met bronnen" was hard gecodeerd als n/n → wordt nu echt geteld (`DETAILS[id].sources`; uitkomst vandaag 125/125).
- ❌ "De echte schaal en duur staan onderaan bij elke animatie" en "Onderaan elke animatie staat de echte grootte en de echte duur": bij ± 15 scènes staat er "schematisch", "geen tijdsas", "structuur" of "niet van toepassing" → "de echte grootte, en de echte duur waar die gekend is"; ook "processen zijn sterk vertraagd" → "meestal sterk vertraagd (soms versneld)" (bv. `operon`: "sterk versneld").
- 🔧 Voettekst "alle inhoud nagekeken" → "inhoud in controlerondes nagekeken"; "informatie gaat van DNA naar RNA naar eiwit" → "de volgorde-informatie …".
- ❌ Werkregel "Alle 66 DOI's in de app zijn via Crossref nagekeken": na 13-11 kwamen er DOI's bij → "66 op 13-11-2026 en opnieuw alle 68 op 14-11-2026" (zelf nagekeken; `totals.dois_checked` = 68).
- 🔧 Werkregel "nieuwe onderdelen krijgen daarna een onafhankelijke controle": rondes 7–11 waren controles door de bouwer → "sinds ronde 12".
- 🔧 `totals.corrections` 216 → 235 (som van de 12 rondes; het veld wordt niet getoond).

Opmerkingen:
- Tijdens deze ronde paste iemand anders `docs/over.js` ook aan (rondenummers en correctieaantallen weggehaald). Mijn wijzigingen zijn kleine, exacte vervangingen op de nieuwe tekst.
- De knoop `vergelijk` komt in geen enkel eerder verslag (rondes 1–12) bij naam voor. De uitspraak "elke uitspraak is gecontroleerd" (lead, AI-kaart) is pas volledig waar als een ander pakket van ronde 13 die scène nakijkt.
- Ronde 13 zelf staat nog niet in `VERIF.rounds`; dat voeg je best toe als alle pakketten klaar zijn.

## 5. Bacterieroute: `s` (graph.js) en `S_EN` (graph.en.js), enkel rapporteren

- ✅ `bcel`: K-12 ≈ 4,6 Mbp, ≈ 4 300 eiwitgenen, nucleoïd, 70S. Kleine opmerking: "vaak plasmiden" is juist voor E. coli in het algemeen, maar net K-12 (MG1655) heeft er geen; mag blijven.
- ✅ `bnucleoid`: HU, IHF, H-NS, Fis; IHF buigt > 160° (1IHF); gyrase houdt negatief gesupercoild.
- ✅ `bplasmide`, `bterm`, `bafbraak` (6WRF = ClpX-ClpP + GFP-ssrA), `breplicatie` (≈ 1 000 nt/s, Tus–ter), `btrp` (vijf genen, twee Trp-codons, 3:4 / 2:3), `bsplicing` (1U6B = Azoarcus groep I-intron met beide exonen).
- ✅ `bgen`: −35/−10, σ, Shine-Dalgarno, ≈ 300 essentiële genen.
- 🔧 `bpol`: "Eén RNA-polymerase maakt alle RNA" is te stellig: de RNA-primers bij replicatie maakt primase (DnaG). Voorstel hieronder.
- ✅ `bmrna` (geen cap, geen beschermende poly(A), SD ↔ 16S, meestal AUG), `bribosoom` (21 + ruim 30 eiwitten; expressoom met NusG = 6ZTJ; 4YBB = E. coli-ribosoom).

## Te verwerken in gedeelde bestanden

- `shared/graph.js` · `Eén RNA-polymerase (core α₂ββ′ω) maakt alle RNA.` → `Eén RNA-polymerase (core α₂ββ′ω) maakt alle mRNA, tRNA en rRNA.`
- `shared/graph.en.js` (S_EN.bpol) · `A single RNA polymerase (core α₂ββ′ω) makes all RNA.` → `A single RNA polymerase (core α₂ββ′ω) makes all mRNA, tRNA and rRNA.`
- `shared/details/entry.js` (ander pakket) · bronlabel `Endosomal escape: a bottleneck for LNP-mediated therapeutics. PNAS 2023` → `… PNAS 2024` (Crossref 10.1073/pnas.2307800120: Chatterjee et al., PNAS 121(11), online 4-3-2024).

## Eindoordeel

Wetenschappelijk geen grote fouten in de woordenlijst, de brugzinnen of de startpagina; wel een reeks te stellige woorden ("elk", "alle", "dat doet p53", "haar mRNA's") en één NL/EN-verschil, nu verzacht of rechtgezet. Op de pagina "Over de app" beloofden enkele zinnen meer dan aantoonbaar was (echte duur bij elke animatie, alleen taalkeuze bewaard, een hard gecodeerde 125/125, 66 DOI's als "alle"); die zeggen nu precies wat in de code en de verslagen te vinden is. Na de wijzigingen: `node --check` OK voor `app/story.js`, `shared/glossary.js`, `docs/over.js`, `docs/over-data.js` en het modulescript van `index.html`.
