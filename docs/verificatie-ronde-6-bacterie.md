# Verificatie ronde 6 — bacterie-route (E. coli)

Datum: 4 november 2026. Onafhankelijke controle (aparte agent, niet de bouwer) van alle beweringen in de bacterie-route, gevolgd door correcties.

**Status na de ronde:** alle 3 ❌ en alle 20 ⚠️ uit de tabel hieronder zijn verwerkt in de code (NL en EN), met de voorgestelde bronnen toegevoegd aan `shared/details/bact.js` en `bact2.js` (o.a. Campbell 2001, Fei 2020 e61496, Pearce 2008, Hocher 2023, Cahová 2015, Oppenheim & Yanofsky 1980, Yanofsky et al. 1984, Lundgren 2004). Daarna: `node --check` op alle gewijzigde bestanden en `tools/check.html` → PROBLEMS (0). De bacterieknopen staan daarom op 'nagekeken' (CHECKED in `shared/graph.js`).

Hergebruikte menselijke scènes in de bacterie-verhaallijn (`operon`, `codon`, `vouwing`, `chaperones`) waren al nagekeken in rondes 1–5; de brugzinnen naar die scènes zijn wel in deze ronde meegenomen.

**Tweede controle (zelfde dag):** dezelfde onafhankelijke controleur bevestigde dat alle 23 punten juist en in beide talen verwerkt zijn, en dat de nieuwe bronnen (PMID/PMC, titels) kloppen en aan de juiste knopen hangen. Drie restpunten zijn daarna ook opgelost: `bterm.kort` zegt nu "gen of operon"; bron Said et al. 2021 (PubMed 33243850) toegevoegd voor de zin over Rho; lidwoord "het bacteriële en het menselijke RNA-polymerase" in `bpol.why`.

---

## 1. Problemen

| # | Oordeel | Bestand + veld/stap | Huidige tekst (NL / EN) | Voorstel (NL / EN) | Bron |
|---|---|---|---|---|---|
| 1 | ❌ fout | shared/details/bact.js → bpol.nl/en.why | "Het verschil (geen σ, wel algemene transcriptiefactoren bij de mens) verklaart waarom antibiotica zoals rifampicine het bacteriële enzym remmen maar het onze niet." / "The difference (no σ, but general transcription factors in humans) explains why antibiotics such as rifampicin inhibit the bacterial enzyme but not ours." | NL: "Rifampicine past in een holte van de β-subeenheid van het bacteriële enzym en blokkeert zo de uitgang van het RNA. Ons Pol II heeft die holte niet, en wordt dus niet geremd." EN: "Rifampicin fits into a pocket of the β subunit of the bacterial enzyme and blocks the exit path of the RNA. Our Pol II lacks this pocket, so it is not inhibited." (σ en de transcriptiefactoren hebben er niets mee te maken.) | Campbell et al. 2001, Cell 104:901, PMID 11290327 |
| 2 | ❌ fout (te algemeen) | app/scenes/bact/bafbraak.js stap 0 tekst; bact2.js bafbraak.kort | "Bacteriën hebben geen ubiquitine en geen proteasoom." / "Bacteria have no ubiquitin and no proteasome." (kort: "zonder ubiquitine of proteasoom") | NL: "E. coli heeft geen ubiquitine en geen proteasoom. Ze gebruikt eigen afbraakmachines, zoals ClpXP." EN: "E. coli has no ubiquitin and no proteasome. It uses its own degradation machines, such as ClpXP." Eventueel in simplified: "Sommige bacteriën (zoals de tuberculosebacterie) hebben wel een proteasoom, met een eigen label (Pup). HslV in E. coli is familie van het proteasoom." / "Some bacteria (such as the tuberculosis bacterium) do have a proteasome, with their own tag (Pup). HslV in E. coli is related to the proteasome." (graph.js 's' "geen ubiquitine of 26S-proteasoom" klopt wel.) | Pearce et al. 2008, Science 322:1104, PMID 18832610 |
| 3 | ❌ fout (bron) | shared/details/bact2.js → S.fei (bron voor 6WRF) en scène-commentaar/extra van bafbraak.js | S.fei = "Fei et al. (2020) Structures of the ATP-fueled ClpXP proteolytic machine bound to protein substrate. eLife 9:e52774 (PMC7112951)" | 6WRF komt uit een ander artikel van dezelfde groep: "Fei, Bell, Barkow, Baker & Sauer (2020) Structural basis of ClpXP recognition and unfolding of ssrA-tagged substrates. eLife 9:e61496 (PMID 33089779, PMC7652416)". Die bron toevoegen of vervangen (e52774 = PMID 32108573 mag als achtergrond blijven). "Fei et al., eLife 2020" in de scène klopt dan. | mmCIF 6WRF _citation (PMID 33089779); PMC-idconv PMC7112951 → eLife.52774 |
| 4 | ⚠️ nuance | app/scenes/bact/bnucleoid.js stap 0; bact2.js bnucleoid.kort | "Bacteriën hebben geen histonen." / "Bacteria have no histones." | NL: "E. coli en de meeste bacteriën hebben geen histonen. Kleine eiwitten buigen en bundelen hun DNA." EN: "E. coli and most bacteria have no histones. Small proteins bend and bundle their DNA." | Hocher et al. 2023, Nat Microbiol 8:2006, PMID 37814071 (histonen in Bdellovibrio) |
| 5 | ⚠️ nuance | bact.js bmrna.kort + bmrna.js stap 5 + tabelrij "5′-cap, splicing, poly(A) → nee" | "Het krijgt geen kapje, geen staart en wordt niet geknipt." / "It gets no cap, no tail and is not cut." | NL: "Het krijgt geen kapje zoals bij ons en wordt niet gesplicet." EN: "It gets no cap like ours and is not spliced." Toevoegen aan simplified: "Bacteriën plakken soms wel een korte poly(A)-staart aan RNA, maar dan als signaal om het af te breken. Sommige RNA's krijgen een ander kapje (NAD). Bacterieel mRNA wordt ook wel in stukken geknipt door RNasen." / "Bacteria do sometimes add a short poly(A) tail to RNA, but as a signal for breakdown. Some RNAs get a different cap (NAD). Bacterial mRNA is also cut into pieces by RNases." ("Niet geknipt" is fout: RNase E/III knippen bacterieel mRNA voortdurend.) | Cahová et al. 2015, Nature 519:374, PMID 25533955; Mohanty & Kushner 2011, Wiley Interdiscip Rev RNA (poly(A) in E. coli), PMC-review |
| 6 | ⚠️ nuance | bterm.js stap 0 titel + tekst | "Elk gen heeft een stopsignaal" / "Achter het gen ligt een terminator." / "Every gene has a stop signal" / "After the gene lies a terminator." | NL: "Elk transcript eindigt met een stopsignaal" / "Achter een gen of operon ligt een terminator." EN: "Every transcript ends with a stop signal" / "After a gene or an operon lies a terminator." (Genen in een operon delen één terminator; de story-brug zegt dat zelf ook.) | Ray-Soni et al. 2016, PMID 27023849 |
| 7 | ⚠️ nuance | bact2.js breplicatie.why | "Het verschil met de mens (veel startplaatsen, trager, telomeren aan de uiteinden) volgt uit de vorm: één ring tegenover lange lineaire chromosomen." / "...follows from the shape: one ring versus long linear chromosomes." | NL: "De mens heeft telomeren omdat zijn chromosomen lineair zijn. Veel startplaatsen zijn nodig omdat ons DNA veel groter is en de vorken trager lopen." EN: "Humans need telomeres because their chromosomes are linear. Many origins are needed because our DNA is much larger and the forks move more slowly." (Het aantal startplaatsen volgt niet uit de ringvorm: archaea zoals Sulfolobus hebben een ring met 3 startplaatsen.) | Alberts MBoC 4e, NBK26826; Lundgren et al. 2004 PNAS 101:7046 (Sulfolobus, 3 origins), PMID 15107501 |
| 8 | ⚠️ nuance | bact2.js bribosoom.why (en kort "vaak") | "De koppeling met het polymerase verklaart waarom bacteriën zo snel op hun omgeving reageren." / "The coupling with the polymerase explains why bacteria react so quickly to their environment." | NL: "Omdat er geen kern is en mRNA meteen vertaald wordt (en snel weer afgebroken), kan een bacterie snel bijsturen." EN: "Because there is no nucleus and mRNA is translated at once (and soon broken down), a bacterium can adjust quickly." In kort "vaak" → "kan" ("kan het vlak achter ... rijden"): hoe vaak ribosomen echt fysiek aan RNAP vastzitten, is nog onderzoek. | Webster et al. 2020, PMID 32820062 (abstract: "potentially contacts", "otherwise-variable interface") |
| 9 | ⚠️ nuance | bribosoom.js stap 4 (tekst + label 'fMet-tRNA (P)') en commentaar "AW fMet-tRNA" | "In de P-plaats zit het start-tRNA met fMet" / "The P site holds the start tRNA with fMet" | In 6ZTJ is AW 'tRNA(fmet) P-site' zonder aminozuur; het enige aminozuur-ligand is Phe (aan het A-tRNA). NL: "In de P-plaats zit het start-tRNA (tRNA-fMet), in de A-plaats het volgende tRNA." EN: "The P site holds the start tRNA (tRNA-fMet), the A site holds the next tRNA." Label: "start-tRNA (P)" / "start tRNA (P)". | mmCIF 6ZTJ: entiteit 23 'tRNA(fmet) P-site', 24 'Phe-NH-tRNA(Phe) A-site', ligand 67 PHENYLALANINE |
| 10 | ⚠️ nuance | bcel.js stap 2 tekst | "Al het DNA zit in één gesloten ring" / "All the DNA sits in one closed ring" | NL: "Het chromosoom is één gesloten ring van ≈ 4,6 miljoen basenparen." EN: "The chromosome is one closed ring of ≈ 4.6 million base pairs." (Botst anders met de volgende stap over plasmiden.) | Blattner et al. 1997, PMID 9278503 |
| 11 | ⚠️ nuance | btrp.js simplified/scale + bact2.js btrp.sources | Getallen ≈ 70×, ≈ 8–10×, ≈ 600× en "leider 162 nt" | Getallen kloppen met de literatuur, maar staan niet in de geciteerde Yanofsky 2000 (die noemt 14 aa, tandem-Trp, 1:2 pauze/2:3/3:4 en "termination 90–95% complete"). Bron toevoegen: Yanofsky, Kelley & Horn 1984, J Bacteriol 158:1018 (PMC215544: "regulated over a 500- to 600-fold range"). Liefst ook "repressie ≈ 70×, attenuatie tot ≈ 10×". | PMC215544; PMC94232 |
| 12 | ⚠️ nuance (commentaar) | btrp.js kopcommentaar | "Regio's 1–4 van het leider-RNA: 1:2 en 3:4 = terminator, 2:3 = antiterminator." | "1:2 = pauzehaarspeld, 3:4 = terminator, 2:3 = antiterminator." (Details zeggen terecht "alleen 3:4 werkt als terminator".) | Yanofsky 2000, PMC94232 (fig.: "pause structure (1:2), antiterminator (2:3), terminator (3:4)") |
| 13 | ⚠️ nuance | bterm.js stap 4 tekst + simplified | "Rho haalt het RNA-polymerase in en duwt het van het DNA." / "Rho catches up with RNA polymerase and pushes it off the DNA." | Tekst mag blijven, maar in simplified toevoegen: "Hoe Rho het enzym precies stopt, wordt nog onderzocht: Rho kan ook al vroeg aan het polymerase binden en het dan uitschakelen." / "Exactly how Rho stops the enzyme is still being studied: Rho can also bind the polymerase early and then switch it off." | Said et al. 2021, Science 371:eabd1673, PMID 33243850 |
| 14 | ⚠️ nuance | bmrna.js stap 4 tekst; bact.js bmrna.how[3] | "In een operon-mRNA heeft elk gen een eigen Shine-Dalgarno. Zo vertalen ribosomen elk gen apart." | NL: "In een operon-mRNA heeft elk gen meestal een eigen Shine-Dalgarno en startcodon. Zo vertalen ribosomen elk gen apart." EN: "...each gene usually has its own Shine-Dalgarno and start codon..." (Bij overlappende genen, bv. trpE–trpD, hangt de start van het volgende gen af van het vorige: translatiekoppeling.) | Oppenheim & Yanofsky 1980, Genetics 95:785, PMID 6162715 |
| 15 | ⚠️ nuance (commentaar) | bnucleoid.js kopcommentaar | "motief R-x-N-P-x-T-G: IHFα Pro65 (A 63–67 RNPKT) en IHFβ Pro64 (B 62–66 RNPKT)" | Residu's kloppen (A R63-N64-P65-K66-T67-G68; B R62-N63-P64-K65-T66-G67), maar het motief is "R-N-P-x-T-G", zonder x tussen R en N. | mmCIF 1IHF (auth-ketens A/B) |
| 16 | ⚠️ nuance | bact.js bplasmide.facts "bla-product: TEM-1 β-lactamase (286 aminozuren)" | 286 aa | "286 aminozuren (263 na het afknippen van het signaalpeptide)" / "286 amino acids (263 after removal of the signal peptide)". Het signaalpeptide (1–23) verklaart ook waarom het enzym in het periplasma zit. | UniProt P62593 (length 286, SIGNAL 1..23) |
| 17 | ⚠️ nuance (klein) | bplasmide.js stap 0 tekst | "van enkele duizenden tot ruim honderdduizend basenparen" / "from a few thousand to over a hundred thousand base pairs" | NL: "van enkele duizenden tot honderdduizenden basenparen (soms nog meer)". EN: "from a few thousand to hundreds of thousands of base pairs (sometimes more)". Er bestaan ook megaplasmiden > 1 Mb; details zeggen al "honderden kb". | del Solar et al. 1998, PMC98921 |
| 18 | ⚠️ nuance (klein) | bgen.js scale | "≈ 1–2 kb per gen" / "≈ 1–2 kb per gene" | "gemiddeld ≈ 1 kb per gen" / "on average ≈ 1 kb per gene" (gemiddeld eiwit ≈ 317 aa ≈ 0,95 kb). | Blattner et al. 1997 (4 288 genen op 4,64 Mb, ≈ 88 % coderend) |
| 19 | ⚠️ nuance (klein) | bmrna.js tabelrij RNA-polymerase "mens: 3 soorten (I, II, III)"; bact.js bpol.facts "mens: 3 RNA-polymerasen" | 3 soorten | "3 in de kern (I, II, III)" / "3 in the nucleus (I, II, III)" (mitochondriën hebben nog een eigen, vierde RNA-polymerase). | Alberts MBoC 4e, NBK26887 |
| 20 | ⚠️ nuance (klein) | story.js brug na bribosoom | "de genetische code is dezelfde als bij ons" / "the genetic code is the same as ours" | "bij E. coli is de genetische code dezelfde als bij ons" / "in E. coli the genetic code is the same as ours" (Mycoplasma leest UGA als Trp). | NCBI Genetic Codes, transl_table 4 (https://www.ncbi.nlm.nih.gov/Taxonomy/Utils/wprintgc.cgi) |
| 21 | ⚠️ nuance (klein) | bact2.js bsplicing.why | "Zelfsplicende introns ... zijn mogelijk de evolutionaire voorlopers van het spliceosoom." | "Vooral groep II-introns zijn mogelijk de voorlopers van onze introns en van het spliceosoom." / "Group II introns in particular may be the ancestors of our introns and the spliceosome." | Lambowitz & Zimmerly 2011, PMC3140690 (abstract) |
| 22 | ⚠️ nuance (klein) | bact2.js bafbraak.how[0] | "ribosomen die vastlopen op een beschadigd mRNA" / "ribosomes that stall on a damaged mRNA" | "ribosomen die vastlopen op een mRNA zonder stopcodon (bv. een afgebroken mRNA)" / "ribosomes that stall on an mRNA without a stop codon (e.g. a broken mRNA)". | Fei et al. 2020, PMID 33089779 (abstract); Baker & Sauer 2012, PMC3209554 |
| 23 | ⚠️ nuance (klein) | bmrna.js stap 2 "brengt fMet naar AUG" | AUG als enig startcodon | Prima voor de stap; in simplified toevoegen: "Soms is het startcodon GUG of UUG; ook dan begint het eiwit met fMet." / "Sometimes the start codon is GUG or UUG; then too the protein starts with fMet." (graph.js zegt al "meestal AUG".) | Alberts MBoC 4e, NBK26829 |

Niet opgenomen als fout, wel om te weten: bnucleoid `time` "binden en loslaten: seconden" kon ik niet met een bron bevestigen. IHF blijft op een specifieke bindplaats eerder minuten zitten; liever "sec. tot min." of weglaten. bterm U-reeks: details "≈ 7–8 U's" klopt; de figuur in bgen tekent er 4 (UUUU) en bterm 7, wat een beetje inconsistent is.

## 2. Bevestigde beweringen (✅) per bestand

**bcel.js + bact.js bcel + graph bcel**
- ✅ Genoom K-12 MG1655 4 639 221 bp, één ring; 4 288 eiwitgenen (≈ 4 300): Blattner 1997, PMID 9278503.
- ✅ Chromosoom uitgerekt ≈ 1,5 mm (4,64 Mb × 0,34 nm = 1,58 mm), honderden keren de cellengte (≈ 750×): berekend.
- ✅ Cel ≈ 2 µm; de schaalbalk "≈ 1 µm" (660 px) past bij de staaf van 1 340 px.
- ✅ Deling 20–60 min; Gram-negatief; binnenmembraan + dun peptidoglycaan + buitenmembraan; geen organellen met membraan; nucleoïd zonder membraan; ribosomen vooral rond de nucleoïd; duizenden tot tienduizenden ribosomen; MG1655 zonder plasmiden (F⁻): Alberts/Cooper, standaardkennis.
- ✅ 70S = 30S + 50S; vertalen tijdens transcriptie: Miller 1970, PMID 4915822.

**bnucleoid.js + bact2.js bnucleoid + graph**
- ✅ 1IHF: röntgen 2,5 Å (mmCIF refine 2.5), 35 bp DNA, Rice et al. Cell 1996 (PMID 8980235).
- ✅ Ketens (mmCIF, auth): A IHFα, B IHFβ, C 35 nt, D 15 nt + E 20 nt (genickte tweede streng).
- ✅ αPro65 (A) en βPro64 (B) bestaan en liggen in RNPKTG; focusselecties A 60–70 / B 59–69 kloppen.
- ✅ Buiging > 160°, twee knikken met elk een intercalerende proline, indirecte herkenning via de kleine groef/ruggengraat: Rice 1996 (abstract).
- ✅ HU (geen voorkeur voor een volgorde), H-NS (overbrugt, zet AT-rijk/vreemd DNA stil), Fis (veel bij snelle groei), tienduizenden kopieën die met de groeifase wisselen: Dillon & Dorman 2010, PMID 20140026.
- ✅ Gyrase (type II, ATP) brengt negatieve supercoils aan; doelwit van fluorochinolonen; niet bij de mens: Bush et al. 2015.

**bplasmide.js + bact.js bplasmide + graph**
- ✅ Dubbelstrengs, meestal rond, eigen ori, kopieaantal geregeld door regel-RNA's/-eiwitten; F 1–2 kopieën, kleine plasmiden tientallen of meer; theta- en rolling-circle-replicatie: del Solar 1998, PMC98921.
- ✅ F ≈ 100 kb (99 159 bp, GenBank AP001918); kloneerplasmiden ≈ 3 kb (pUC19 2 686 bp).
- ✅ Conjugatie: relaxase knipt bij oriT, één streng via T4SS, aanvullen in donor en ontvanger, de ontvanger wordt donor; de pilus brengt de cellen samen: Virolle 2020, PMC7690428.
- ✅ bla → TEM-1 β-lactamase, 286 aa, signaalpeptide → periplasma; hydrolyseert de β-lactamring van ampicilline: UniProt P62593.

**bgen.js + bact.js bgen + graph**
- ✅ −35 TTGACA, −10 TATAAT, 17 bp tussenruimte (optimaal); consensus = ideaal: Cooper NBK9850.
- ✅ Zeven σ-factoren in E. coli met de juiste genen en rollen (σ70 RpoD, σ38 RpoS, σ32 RpoH, σ24 RpoE, σ54 RpoN, σ28 FliA, σ19 FecI): Feklístov 2014, PMID 25002089.
- ✅ lac-operator overlapt het startpunt; CAP als activator.
- ✅ SD AGGAGG ↔ 16S 3′ …CCUCCUUA-3′ (ook bevestigd in de 16S-sequentie van 6ZTJ: eindigt op "…GGAUCACCUCCUUA"): Shine & Dalgarno 1974.
- ✅ SD-afstand ≈ 5–10 nt; figuur 6 nt.
- ✅ Groep II in ≈ ¼ van de genomen ("present in ∼25% of sequenced genomes"), met eigen IEP: Lambowitz & Zimmerly 2011, PMC3140690. Groep I in tRNA- en faaggenen: Edgell 2000.
- ✅ oriC + DnaA opent het DNA: Katayama 2010.
- ✅ Keio: 4 288 genen geprobeerd, 303 niet uit te schakelen (kandidaat-essentieel, in LB): Baba 2006, PMID 16738554. De balk 303/4 288 klopt.

**bpol.js + bact.js bpol + graph**
- ✅ 6OUL = cryo-EM 3,4 Å, Eσ70 op de rpsT P2-promoter (RPo), Chen et al. eLife 2019 (PMID 31841111).
- ✅ Ketens: G, H, R α (R = α-CTD-fragment 250–322), I β, J β′, K ω, L σ70, P niet-matrijs, Q matrijs.
- ✅ P 26–31 = TTGACA; Q 65–70 = TGTCAA (antiparallelle partner); P 58–62 niet gemodelleerd; P 49–54 = CATATT (bij 17 bp tussenruimte; niet-consensus −10, wat past bij "idealen").
- ✅ σ70 L 429–437 = TYATWWIRQ (W433/W434), L 584–591 = RERIRQIE; RpoD = 613 aa (UniProt P00579).
- ✅ Core α₂ββ′ω; holo ≈ 0,46 MDa (≈ 389 kDa core + 70 kDa σ); domein 4 → −35 in de grote groef, domein 2 → −10 + opening; σ laat meestal los; β′/β ≈ Rpb1/Rpb2; Pol II 12 subeenheden.

**bterm.js + bact2.js bterm + graph**
- ✅ Intrinsiek: GC-haarspeld + U-reeks (≈ 7–8 U); rU:dA het zwakste hybride; Rho is een hexamere helicase die afhangt van ATP en 5′→3′ beweegt over rut (C-rijk, G-arm, onbedekt); polariteit doordat ribosomen het RNA afschermen; NusA/NusG beïnvloeden terminatie: Ray-Soni 2016, PMID 27023849.

**bmrna.js + bact.js bmrna + graph**
- ✅ SEQ/R16-uitlijning in de figuur: SD 2–7 (AGGAGG) paart precies met 3′-AUUCCUCCAC-5′ (posities 2–7 = UCCUCC); AUG 14–16; afstand 6 nt (zoals simplified zegt); anticodon UAC 3′→5′ correct onder AUG; E-P-A in de juiste richting (E aan de 5′-kant).
- ✅ IF1/2/3 + GTP; fMet, formyl (vaak + Met) later verwijderd; Svedberg niet optelbaar; 70S ≈ 20–25 nm; 10–20 aa/s; antibiotica streptomycine/tetracycline; expressoom: Alberts NBK26829; Webster 2020.

**bribosoom.js + bact2.js bribosoom + graph**
- ✅ 6ZTJ = "70S-RNAP expressome complex in NusG-coupled state (38 nt intervening mRNA)", cryo-EM 3,4 Å, Webster et al. Science 2020.
- ✅ Alle ketens in het commentaar kloppen (mmCIF): AA 16S; AB–AU = S2–S21; AY = S1; AJ = S10; AV mRNA; AW tRNA-fMet (P); AX Phe-NH-tRNA-Phe (A; amide = niet-reactief analoog ✅); BA 23S; BB 5S; BC–BZ + B1–B7 = 31 50S-eiwitten; CA/CB α, CC β, CD β′, CE ω, CF NusG, CN/CT DNA.
- ✅ 30S = 16S + 21 eiwitten; 50S = 23S + 5S + ruim 30 (33) eiwitten; ≈ 2,5 MDa, ≈ ⅔ RNA; 23S-rRNA katalyseert de peptidebinding; NusG-NTD ↔ RNAP en KOW (CTD) ↔ uS10; L7/L12 ontbreken.

**bafbraak.js + bact2.js bafbraak + graph**
- ✅ 6WRF: cryo-EM 3,14 Å, "ClpX-ClpP complex bound to GFP-ssrA, recognition complex"; A–F ClpX (6), H–N ClpP (7 = één ring), S = residu's 268–274 "ENYALAA" (staart van ssrA).
- ✅ ssrA = AANDENYALAA; tmRNA/trans-translatie; ClpX AAA+-zesring; ClpP 2 × 7 met 14 actieve serineplaatsen (Ser-His-Asp); Lon voor misvouwde eiwitten en regeleiwitten (SulA, RcsA); andere proteasen Lon, ClpAP, FtsH, HslUV: Baker & Sauer 2012; Gottesman 1996.

**breplicatie.js + bact2.js breplicatie + graph**
- ✅ Eén oriC, DnaA-ATP, DUE, DnaB, primase, Pol III, Okazaki + Pol I + ligase, bidirectioneel, Tus–ter eenrichtingspoortjes, topo IV ontkoppelt: Katayama 2010; Neylon 2005, PMC1197808; Alberts NBK26850.
- ✅ ≈ 1 000 nt/s per vork (bacterie) en ≈ 50 nt/s (eukaryoot): Alberts MBoC. ≈ 40 min (2 320 kb / 1 000 nt/s = 38,7 min).
- ✅ Multifork-replicatie bij snelle groei (verklaart 40 min > 20 min deling); 2–3 Pol III-kernen; mens tienduizenden origins; semiconservatief.

**btrp.js + bact2.js btrp + graph**
- ✅ trpEDCBA; leiderpeptide 14 aa met twee Trp naast elkaar (MKAIFVLKGWWRTS); 1:2 / 2:3 / 3:4-logica; ribosoom bedekt regio 2 bij veel Trp; zonder translatie vormt 1:2 + 3:4 → stop ("super-attenuation"): Yanofsky 2000, PMC94232.
- ✅ Combinatie ≈ 500–600×: PMC215544; repressie ≈ 70×, attenuatie ≈ 8–10×: standaard handboekwaarden.
- ✅ Operon ≈ 7 kb; leider 162 nt (+1 tot trpE): Bertrand et al. 1975 / handboeken (zie punt 11 voor het bronnenlijstje).
- ✅ TRAP bij B. subtilis.

**bsplicing.js + bact2.js bsplicing + graph**
- ✅ 1U6B: röntgen 3,1 Å; Azoarcus pre-tRNA-Ile groep I-intron met beide exonen, toestand vóór exonligatie (Adams 2004, PMID 15175762).
- ✅ Ketens: B intron 197-mer; C "GROUP I EXON" 22 nt (synthetisch); D 3 nt (CA-5MU); A U1A (Y31H/Q36R, kristallisatiehulp).
- ✅ Groep I-mechanisme (exogeen G valt de 5′-splitsplaats aan, dan valt het 5′-exon-3′-OH de 3′-splitsplaats aan); groep II lariat via een uitstulpend A, mobiel met een eigen RT; inteïnes: Mills 2014, PMC4031507.

**story.js BACTERIE**
- ✅ Volgorde en bruggen kloppen inhoudelijk (zie punt 20 voor de enige kanttekening). GroEL–GroES is een bacterieel voorbeeld ✅.

**graph.js ↔ graph.en.js**
- ✅ Alle 12 bact-samenvattingen in NL en EN zeggen hetzelfde; geen verschillen tussen de talen gevonden. In de details- en scèneteksten ook geen inhoudelijke verschillen tussen NL en EN; de problemen hierboven staan telkens in beide talen.

## 3. Omvang

Ongeveer 260 beweringen nagekeken (inclusief figuurlabels, getallen, commentaar over ketens en residu's en de vijf PDB-structuren): 3 ❌, 20 ⚠️ (waarvan 9 klein of alleen in commentaar), de rest ✅.
