# Verificatie ronde 1 — inhoudelijke controle van `shared/graph.js` en de kernpunten-notities

Datum: 28 september 2026
Bereik: de `s`-velden van de gevraagde knopen, de jaartallen in
`transcripten/DNA-RNA structuur - kernpunten.md`, de gebruikte PDB-codes, en een reeks
losse cijfers (snelheden, aantallen, afmetingen).

**Scopewijziging tijdens deze ronde:** de app gaat uit van een **menselijke cel**. De
Agrobacterium-/T-DNA-knopen (`agro`, `virinductie`, `tiplasmide`, `tstrand`, `t4ss`,
`tcomplex`, `tdnaint`) zijn daarom **niet** nagekeken in deze ronde; in de plaats daarvan
zijn adenovirus-entry, mRNA-LNP-vaccins, HIV-1 en de afmetingen van een menselijke cel
geverifieerd. De Agrobacterium-knopen blijven op status `concept`; als ze in de graaf
blijven staan (bv. als zijspoor "plantentransformatie"), moeten ze in een latere ronde
apart nagekeken worden.

Legenda: ✅ klopt · ⚠️ nuance nodig · ❌ fout

---

## 1 · Nieuwe knopen: binnenkomst in een menselijke cel

### 1.1 Adenovirus (HAdV-C5) — entry in humane epitheelcellen

| # | Claim | Verdict |
|---|---|---|
| 1 | Fiber-knob bindt CAR (coxsackie- en adenovirusreceptor) als primaire receptor | ✅ |
| 2 | Opname via αv-integrinen (RGD-motief in de penton base), klathrine-gemedieerde endocytose | ✅ |
| 3 | Endosomale ontsnapping door het membraanlytische **proteïne VI** | ✅ |
| 4 | Transport naar de kern via **dyneïne** over microtubuli | ✅ |
| 5 | Capside dokt aan het kernporiecomplex via **hexon–Nup214** | ✅ |
| 6 | **Kinesine-1** helpt de capside ontmantelen | ⚠️ |
| 7 | Genoom wordt de kern in geïmporteerd | ⚠️ |
| 8 | Genoom blijft **episomaal**, integreert niet | ✅ |
| 9 | Transcriptie door gastheer-**RNA-polymerase II** | ⚠️ |

**Nuances en voorgestelde formuleringen**

- (2) CAR is een *aanhechtings*receptor, niet de opnameroute: "CAR faciliteert aanhechting
  maar niet celbinnenkomst" — de αv-integrinen (αvβ3/αvβ5) leveren het signaal voor
  klathrine-gemedieerde endocytose. Vermeld dus expliciet de tweestapsvolgorde.
- (6) Kinesine-1 werkt niet direct op de capside: de **zware keten Kif5C** bindt via
  **Nup358** (dat zelf aan Nup214/Nup88 hangt), terwijl de **lichte keten Klc1/2** aan de
  capside bindt. Kinesine-1 trekt de gedokte capside kapot en sleurt daarbij nucleoporinen
  het cytoplasma in — de kernporie zelf wordt dus mede ontregeld.
- (7) De ontmanteling aan de porie vraagt bovendien **histon H1** en H1-importfactoren
  (Trotman et al. 2001); het genoom komt de kern binnen samen met het virale
  kerneiwit **VII**.
- (9) Correct voor de vroege (E1A–E4) en late genen, maar niet volledig: de **VA-RNA's**
  worden door **RNA-polymerase III** gemaakt. Zet er "de eiwitcoderende genen" bij.

**Voorstel NL-tekst (knoop "adenovirus-entry")**

> De fiber-knob van HAdV-C5 bindt eerst CAR op het epitheeloppervlak; daarna zorgen
> αv-integrinen (via het RGD-motief van de penton base) voor opname in klathrine-vesikels.
> In het endosoom komt het membraanlytische proteïne VI vrij, dat het vesikel openbreekt.
> De deels ontmantelde capside reist met dyneïne over microtubuli naar de kernporie, dokt
> daar via hexon aan Nup214, en wordt door kinesine-1 (Kif5C via Nup358, Klc1/2 op de
> capside) samen met histon H1 verder afgebroken. Het genoom komt met proteïne VII de kern
> binnen, blijft daar **episomaal** (het integreert niet) en wordt door gastheer-RNA-pol II
> afgeschreven (de VA-RNA's door pol III).

Bronnen:
- Kremer EJ, Nemerow GR. *Adenovirus Tales: From the Cell Surface to the Nuclear Pore Complex.* PLoS Pathog 2015;11(6):e1004821. DOI 10.1371/journal.ppat.1004821 — https://pmc.ncbi.nlm.nih.gov/articles/PMC4456001/
- Strunze S et al. *Kinesin-1-mediated capsid disassembly and disruption of the nuclear pore complex promote virus infection.* Cell Host Microbe 2011;10:210–23. DOI 10.1016/j.chom.2011.08.010 — https://pubmed.ncbi.nlm.nih.gov/21925109/
- Trotman LC et al. *Import of adenovirus DNA involves the nuclear pore complex receptor CAN/Nup214 and histone H1.* Nat Cell Biol 2001;3:1092–1100. DOI 10.1038/ncb1201-1092 — https://www.nature.com/articles/ncb1201-1092
- Cassany A et al. *Nuclear import of adenovirus DNA involves direct interaction of hexon with an N-terminal domain of the nucleoporin Nup214.* J Virol 2015. DOI 10.1128/JVI.02639-14 — https://journals.asm.org/doi/full/10.1128/jvi.02639-14
- *Adenoviral vectors in gene therapy: a detailed overview* (episomaal, geen integratie) — https://pmc.ncbi.nlm.nih.gov/articles/PMC13535870/

---

### 1.2 mRNA-vaccin in lipidenanopartikels (LNP)

| # | Claim | Verdict |
|---|---|---|
| 1 | Opname van LNP's door endocytose | ✅ |
| 2 | Ioniseerbare lipiden maken endosomale ontsnapping mogelijk | ✅ |
| 3 | Slechts een paar procent van de lading ontsnapt | ⚠️ |
| 4 | mRNA bevat **N1-methylpseudouridine** (m1Ψ) | ✅ |
| 5 | mRNA wordt in het cytosol getransleerd en komt niet in de kern | ✅ |

**Nuances**

- (2) Mechanisme scherper: de ioniseerbare lipiden zijn (bijna) neutraal bij pH 7,4 en
  worden **geprotoneerd in het verzurende endosoom (pH ≈ 6,5–5,4)**; de positieve lading
  gaat dan interageren met de negatief geladen endosoommembraan, die daardoor destabiliseert.
- (3) Het klassieke cijfer **1–2 %** komt van Gilleron et al. 2013, gemeten met
  **siRNA**-LNP's, niet met mRNA-vaccins. Recentere reviews houden "ongeveer 2 %" aan als
  orde van grootte. Presenteer het dus als orde van grootte, niet als vaccin-specifiek
  gemeten getal.
- (4) m1Ψ zit in **beide** goedgekeurde SARS-CoV-2-vaccins (BNT162b2 en mRNA-1273). Effect:
  minder activatie van TLR3/TLR7/RIG-I én hogere translatie-efficiëntie en stabiliteit —
  dus twee effecten, niet alleen "minder immuunreactie".
- (5) Klopt: mRNA werkt in het cytosol; er is geen mechanisme dat het mRNA de kern in brengt
  en geen reverse transcriptase aanwezig. (Goed punt om expliciet te maken in de app, want
  dit is een veelvoorkomend misverstand.)

**Voorstel NL-tekst**

> Het lipidenanopartikel wordt via endocytose opgenomen. De ioniseerbare lipiden zijn
> neutraal bij pH 7,4 maar raken geprotoneerd in het verzurende endosoom, waardoor de
> endosoommembraan destabiliseert en een deel van het mRNA in het cytosol terechtkomt —
> in de orde van enkele procenten; de rest wordt afgebroken. Het mRNA is gemodificeerd met
> N1-methylpseudouridine (m1Ψ), wat de aangeboren immuunrespons (TLR3/TLR7/RIG-I) dempt en
> de translatie-opbrengst en stabiliteit verhoogt. Translatie gebeurt volledig in het
> cytosol: het mRNA komt niet in de kern en wordt niet in het genoom opgenomen.

Bronnen:
- Gilleron J et al. *Image-based analysis of lipid nanoparticle-mediated siRNA delivery, intracellular trafficking and endosomal escape.* Nat Biotechnol 2013;31:638–46. DOI 10.1038/nbt.2612 — https://www.nature.com/articles/nbt.2612
- *Endosomal escape: a bottleneck for LNP-mediated therapeutics.* PNAS 2023. DOI 10.1073/pnas.2307800120 — https://www.pnas.org/doi/10.1073/pnas.2307800120
- *Mechanism of pH-sensitive amphiphilic endosomal escape of ionizable lipid nanoparticles.* Pharm Res 2025 — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12304063/
- Karikó K et al., zoals samengevat in *Mechanisms of innate and adaptive immunity to the Pfizer-BioNTech BNT162b2 vaccine.* Nat Immunol 2022. DOI 10.1038/s41590-022-01163-9 — https://pmc.ncbi.nlm.nih.gov/articles/PMC8989677/
- *N1-methylpseudouridine modification level correlates with protein expression, immunogenicity, and stability of mRNA* — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11406044/

---

### 1.3 HIV-1 (bestaande knoop `rt`, uitgebreid)

Huidige tekst: *"Retrovirussen (bv. HIV) kopiëren hun enkelstrengig RNA-genoom met reverse
transcriptase naar dubbelstrengig DNA; integrase bouwt dit provirus in het gastheergenoom in."*

| # | Claim | Verdict |
|---|---|---|
| 1 | Reverse transcriptase maakt dsDNA uit het ssRNA-genoom | ✅ |
| 2 | Integrase integreert het provirus in het gastheergenoom | ✅ |
| 3 | Doelcellen: CD4⁺ T-cellen en macrofagen | ✅ |

**Nuances voor de animatie (niet fout, wel onvolledig)**

- Het HIV-1-genoom is **diploïd**: twee identieke (+)ssRNA-moleculen per virion.
- Reverse transcriptie gebeurt in het **cytoplasma binnen de capside**; de pre-integratie-
  /capsidecomplex passeert de kernporie en integratie gebeurt in de kern. In niet-delende
  macrofagen is reverse transcriptie traag (volledig viraal DNA pas na 36–48 u) en kan ze
  zelfs in kernniches doorlopen.
- Integratie is niet willekeurig: HIV-1 verkiest **transcriptioneel actieve genlichamen**
  (via LEDGF/p75). Macrofagen en rustende CD4⁺-cellen vormen het latente reservoir.

**Voorstel NL-tekst**

> HIV-1 infecteert CD4⁺ T-cellen en macrofagen. Reverse transcriptase kopieert het
> (+)ssRNA-genoom (twee kopieën per virion) naar dubbelstrengig DNA, grotendeels nog binnen
> de capside in het cytoplasma. Het complex passeert de kernporie en integrase bouwt het
> provirus in het gastheergenoom in, met voorkeur voor transcriptioneel actieve genen
> (LEDGF/p75). Daarna gebruikt het virus de gastheer-RNA-polymerase II.

Bronnen:
- *The HIV life cycle* (NIH/HIVinfo) — https://hivinfo.nih.gov/understanding-hiv/fact-sheets/hiv-life-cycle
- Rensen E et al. *Clustering and reverse transcription of HIV-1 genomes in nuclear niches of macrophages.* EMBO J 2021. DOI 10.15252/embj.2020105247 — https://link.springer.com/article/10.15252/embj.2020105247
- O'Brien WA et al. *HIV-1 entry and reverse transcription in macrophages.* — https://pubmed.ncbi.nlm.nih.gov/8083599/

---

### 1.4 Afmetingen van een menselijke cel

| # | Claim | Verdict |
|---|---|---|
| 1 | Celdiameter ~10–30 µm | ✅ |
| 2 | Kerndiameter ~5–10 µm | ✅ |
| 3 | Aantal kernporiecomplexen in een humane (HeLa) kern | ✅ (≈ 3 000) |

Details: typische dierlijke cellen 10–30 µm; HeLa ≈ 20 µm. Zoogdierkern doorgaans
5–10 µm. HeLa-kernen bevatten **gemiddeld ≈ 3 000 NPC's**; over celtypes heen varieert dat
van enkele honderden tot tienduizenden (literatuurband voor gewervelden: **2 000–5 000**
per kern). Klassieke EM-metingen (Maul & Deaven 1977): longweefsel 2 788, cervix 3 934.

⚠️ Let op in de UI: een getal als "2 000–5 000 poriën" mag niet als "per µm²" gepresenteerd
worden — dat is een veelgemaakte fout in secundaire bronnen. De *dichtheid* is ordegrootte
**10–20 NPC/µm²** bij zoogdieren (en 40–50 NPC/µm² in tabak-BY-2-cellen, dus plantencellen
zijn duidelijk dichter bezet).

Bronnen:
- *How big is a human cell?* / *How big are nuclei?* — Milo & Phillips, *Cell Biology by the Numbers* — https://book.bionumbers.org/how-big-is-a-human-cell/ en https://book.bionumbers.org/how-big-are-nuclei/
- Ori A et al. *Cell type-specific nuclear pores: a case in point for context-dependent stoichiometry of molecular machines.* Mol Syst Biol 2013;9:648. DOI 10.1038/msb.2013.4 — https://www.embopress.org/doi/full/10.1038/msb.2013.4
- McCloskey A et al. *Tpr regulates the total number of nuclear pore complexes per cell nucleus.* Genes Dev 2018;32:1321 — https://genesdev.cshlp.org/content/32/19-20/1321.full
- Fiserova J et al. *Nuclear envelope and nuclear pore complex structure and organization in tobacco BY-2 cells.* Plant J 2009. DOI 10.1111/j.1365-313X.2009.03865.x — https://pubmed.ncbi.nlm.nih.gov/19392704/

---

## 2 · Kernimport en kern

### `kernimport`
> *"Kernporiecomplex van ~30 verschillende nucleoporines in veelvoud. Cargo met een NLS wordt door importine α/β binnengebracht; de RanGTP-gradiënt (hoog in de kern) bepaalt de richting."*

| Claim | Verdict |
|---|---|
| ~30 verschillende nucleoporinen, elk in veelvoud | ✅ |
| Importine α/β brengt NLS-cargo binnen | ✅ |
| RanGTP hoog in de kern, bepaalt de richting | ✅ |

Aanvulling (optioneel, geen correctie): elk NPC bevat ~500–1 000 nucleoporine-moleculen,
de ~30 soorten komen voor in veelvouden van 8 wegens de achtvoudige symmetrie. RanGTP is
hoog in de kern door de chromatine-gebonden GEF **RCC1**, en laag in het cytoplasma door
**RanGAP**; in de kern maakt RanGTP het importine-α/β-complex los.

⚠️ Als de app de kernporie animeert: voeg toe dat de porie ook een **passieve** route heeft
voor moleculen tot ~40 kDa / ~5 nm, en dat de FG-repeat-mesh de selectiviteit levert.

Bronnen:
- *Structure, function and assembly of nuclear pore complexes* — https://pmc.ncbi.nlm.nih.gov/articles/PMC13242641/
- *The nuclear pore complex – structure and function at a glance.* J Cell Sci 2015;128:423 — https://pmc.ncbi.nlm.nih.gov/articles/PMC4311126/
- Beck M, Hurt E. *The nuclear pore complex: understanding its function through structural insight.* Nat Rev Mol Cell Biol 2017. DOI 10.1038/nrm.2016.147 — https://www.nature.com/articles/nrm.2016.147

### `kern`
> *"Omgeven door een dubbele kernenvelop met kernporiën. Bevat chromatine en de nucleolus (ribosoomaanmaak)."*

✅ Klopt. ⚠️ Optionele verfijning: de kernenvelop bestaat uit twee membranen waarvan het
buitenmembraan continu is met het **ER**; aan de binnenkant ligt de **kernlamina**
(lamine A/C en B). Dat is voor de animatie relevanter dan "dubbele envelop" alleen.

---

## 3 · Genoom en chromatine

### `chromosoom`
> *"Mens: 46 chromosomen (23 paren) in een diploïde lichaamscel; haploïd genoom ~3,1 miljard bp, samen ~2 m DNA per cel."*

| Claim | Verdict |
|---|---|
| 46 chromosomen, 23 paren, diploïd | ✅ |
| Haploïd genoom ~3,1 miljard bp | ⚠️ |
| ~2 m DNA per cel | ✅ |

⚠️ Het cijfer 3,1 Gb hoort bij **GRCh38** (inclusief gaten/plaatshouders). De volledige
telomeer-tot-telomeer-assemblage **T2T-CHM13v2.0** komt op **≈ 3,05 Gb** (X-bevattend);
een Y-bevattend haploïd genoom is ~2,93 Gb. "≈ 3,1 miljard bp" is als afronding
verdedigbaar, maar "≈ 3,0–3,1 miljard bp" is nauwkeuriger.

**Voorstel:** *"Mens: 46 chromosomen (23 paren) in een diploïde lichaamscel; een haploïd
genoom is ongeveer 3,0–3,1 miljard basenparen, samen ruwweg 2 m DNA per cel."*

Bronnen:
- Nurk S et al. *The complete sequence of a human genome.* Science 2022. DOI 10.1126/science.abj6987 — https://www.science.org/doi/10.1126/science.abj6987
- NCBI Assembly T2T-CHM13v2.0 — https://www.ncbi.nlm.nih.gov/datasets/genome/GCF_009914755.1/

### `chromatine`
> *"DNA + eiwitten. Euchromatine is open en actief, heterochromatine compact en meestal stil. Lussen en domeinen (TADs) worden o.a. door cohesine en CTCF gevormd."*

✅ Klopt. ⚠️ Kleine nuance: het huidige model is **loop extrusion** — cohesine duwt actief
DNA door zijn ring tot het op **convergent geörienteerde CTCF-plaatsen** stuit. "Worden
gevormd door" is dus correct maar mag mechanistischer.

### `nucleosoom`
> *"~147 bp DNA in ~1,65 linkshandige superhelische windingen rond een histonoctameer (2× H2A, H2B, H3, H4). Linker-DNA en histon H1 verbinden opeenvolgende nucleosomen."*

| Claim | Verdict |
|---|---|
| ~147 bp | ✅ |
| ~1,65 linkshandige superhelische windingen | ⚠️ |
| Histonoctameer 2× (H2A, H2B, H3, H4) | ✅ |
| Linker-DNA + H1 | ✅ |

⚠️ 1,65 windingen hoort bij de **146 bp** van Luger et al. 1997 (PDB 1AOI); voor de
**147 bp** van NCP147 (PDB 1KX5, Davey et al. 2002) wordt meestal **~1,67** (soms 1,7)
winding vermeld. De app gebruikt 147 bp én 1,65 → intern inconsistent.

**Voorstel:** *"~147 bp DNA in ongeveer 1,7 linkshandige superhelische windingen rond een
histonoctameer (2× H2A, H2B, H3, H4)."*

De vermelde PDB-codes zijn juist en goed gekozen:
- **1AOI** — Luger K et al. *Crystal structure of the nucleosome core particle at 2.8 Å resolution.* Nature 1997;389:251–60. DOI 10.1038/38444
- **1KX5** — Davey CA et al. *Solvent mediated interactions in the structure of the nucleosome core particle at 1.9 Å resolution.* J Mol Biol 2002;319:1097–113. DOI 10.1016/S0022-2836(02)00386-8

---

## 4 · DNA-conformaties en basenparing

### `dnavormen`
> *"B-DNA: rechtshandig, ~10,5 bp/winding, 3,4 Å per bp, ~20 Å breed. A-DNA: rechtshandig, ~11 bp/winding, compacter en breder (typisch voor dsRNA en RNA–DNA-hybriden). Z-DNA: linkshandig, 12 bp/winding, zigzag-ruggengraat, bij alternerende purine–pyrimidine (CG)n."*

| Claim | Verdict |
|---|---|
| B-DNA rechtshandig, ~10,5 bp/winding | ⚠️ |
| 3,4 Å stijging per bp, ~20 Å diameter | ✅ |
| A-DNA rechtshandig, ~11 bp/winding | ✅ |
| A-vorm typisch voor dsRNA en RNA–DNA-hybriden | ✅ |
| Z-DNA linkshandig, 12 bp/winding, zigzag | ✅ |
| Z-DNA bij alternerende purine–pyrimidine (CG)n | ✅ |

⚠️ **Inconsistentie met de cursus.** De kernpunten zeggen "~10 bp/winding (vezelmodel)"
voor B-DNA, de graaf zegt "~10,5". Beide zijn correct maar in een andere context:
- **10,0 bp/winding** = het klassieke vezeldiffractiemodel (Watson–Crick),
- **10,5 bp/winding** = B-DNA in **oplossing**,
- **~10,1 bp/winding** = het Dickerson-dodecameer-kristal (1BNA).

Voor examenconsistentie met de docent: noem het vezelgetal én het oplossingsgetal.

⚠️ "A-DNA compacter **en breder**" is dubbelop en verwarrend. Beter: A-DNA is **korter en
dikker** (grotere diameter, kleinere stijging per bp, fosfaten dichter bij elkaar ≈ 5,9 Å
i.p.v. ~7 Å), met **C3′-endo**-suikerpuckering en gekantelde basenparen; grote groef diep
en smal, kleine groef breed en ondiep.

⚠️ Bij Z-DNA hoort in deze cursus expliciet: **alternerend syn/anti** (de guanines staan
*syn*) en de suikerpuckering wisselt — dat is precies het examenpunt in de kernpunten.

**PDB-codes van deze knoop — alle drie correct en passend:**
- **1BNA** (B-DNA) — Drew HR et al. *Structure of a B-DNA dodecamer: conformation and dynamics.* PNAS 1981;78:2179. DOI 10.1073/pnas.78.4.2179
- **440D** (A-DNA) — Gao YG, Robinson H, Wang AH-J. *High-resolution A-DNA crystal structures of d(AGGGGCCCCT).* Eur J Biochem 1999. DOI 10.1046/j.1432-1327.1999.00270.x
- **1DCG** (Z-DNA) — Gessner RV et al. *The molecular structure of the left-handed Z-DNA double helix at 1.0-Å atomic resolution: d(CGCGCG).* J Biol Chem 1989. PMID 2722771

### `noncanon`
> *"Guaninerijke sequenties kunnen G-quadruplexen vormen (gestapelde G-kwartetten, gestabiliseerd door K⁺); daarnaast triplex-DNA (H-DNA) en kruisvormen bij palindromen."*

✅ Klopt. ⚠️ Twee aanvullingen conform de cursus:
- de H-bruggen in een G-kwartet zijn van het **Hoogsteen**-type,
- **Na⁺** werkt ook (K⁺ stabiliseert sterker); noem "een centraal monovalent kation
  (K⁺ > Na⁺)".
- Er ontbreekt een **PDB-code** bij deze knoop — zie §7.

### `basenparing`
> *"Watson–Crick: A–T met 2 en G–C met 3 waterstofbruggen. Alternatieve paringen (Hoogsteen, wobble G–U in RNA) maken andere structuren mogelijk."*

✅ Klopt volledig. Optionele aanvulling uit de cursus die goed bij deze knoop past: de
**C1′–C1′-afstand is ≈ 10,5–10,7 Å voor beide paartypes**, waardoor A–T en G–C
uitwisselbaar zijn in dezelfde helix — precies waarom een uniforme dubbelhelix kan bestaan.

Bron voor §4 algemeen: Berg JM, Tymoczko JL, Stryer L. *Biochemistry*, NCBI Bookshelf
(DNA-structuur) — https://www.ncbi.nlm.nih.gov/books/NBK21514/ ; Rich A. *Left-handed
Z-DNA: structure and function.* Genetica — https://link.springer.com/article/10.1023/A:1003768526018

---

## 5 · Transcriptie

### `transcriptie`
> *"RNA-polymerase leest de matrijsstreng 3'→5' en maakt RNA 5'→3' in een transcriptiebel; achter de polymerase sluit de DNA-helix weer."*

✅ Klopt.

### `rnapol`
> *"12 subeenheden (Rpb1–12). De C-terminale staart (CTD) van Rpb1 bestaat uit herhalingen YSPTSPS (52 bij de mens) waarvan het fosforyleringspatroon de processing-machines rekruteert."*

| Claim | Verdict |
|---|---|
| 12 subeenheden Rpb1–12 | ✅ |
| CTD op Rpb1 | ✅ |
| Consensus-heptade YSPTSPS | ✅ |
| 52 repeats bij de mens | ✅ |
| Fosforyleringspatroon rekruteert processing-machinerie | ✅ |

Detail dat de app mag tonen: van de 52 humane repeats zijn **Tyr1 en Pro6 in alle 52
aanwezig**, terwijl **Ser7 slechts in 26** voorkomt; bakkersgist heeft **26** heptaden.
Ser5-P piekt bij de start (capping), Ser2-P tegen het einde (splicing, 3′-processing).

Bron: Hsin J-P, Manley JL. *The RNA polymerase II CTD coordinates transcription and RNA
processing.* Genes Dev 2012;26:2119–37. DOI 10.1101/gad.200303.112 —
https://genesdev.cshlp.org/content/26/19/2119.long

**PDB 1I6H** ✅ correct en zeer passend: Gnatt AL, Cramer P, Fu J, Bushnell DA, Kornberg RD.
*Structural basis of transcription: an RNA polymerase II elongation complex at 3.3 Å
resolution.* Science 2001. DOI 10.1126/science.1059495.
⚠️ Wel opletten: 1I6H is **gist**-Pol II en bevat **10** subeenheden (Rpb4/7 ontbreken).
Als de app "12 subeenheden" naast deze structuur zet, komt dat niet overeen. Overweeg
**5FLM / 5IY6** (humaan Pol II) of vermeld in de UI dat 1I6H het 10-subeenheden-kerncomplex
van gist is.

### `promoter`
> *"Kernpromoterelementen (bv. TATA-box, Inr) binden de algemene transcriptiefactoren TFIID (met TBP), -A, -B, -E, -F, -H. TFIIH opent het DNA en fosforyleert Ser5 van de CTD."*

✅ Klopt. ⚠️ Precisering: het is de **XPB/ERCC3-translocase** in TFIIH die het DNA opent en
de **CDK7-kinasesubeenheid** (CAK-module) die Ser5 fosforyleert — twee verschillende
activiteiten in hetzelfde complex. Ook: TFIID bindt de TATA-box via TBP; de meeste humane
promoters hebben **géén** TATA-box (CpG-eilandpromoters), dus "bv." is goed gekozen.

### Pol II-elongatiesnelheid in vivo

| Claim | Verdict |
|---|---|
| Pol II-elongatiesnelheid in vivo | ✅ ≈ **1,3–3,5 kb/min**, mediaan ≈ 2–3 kb/min → **≈ 20–50 nt/s** |

Voor de app: gebruik **"ongeveer 2 kb per minuut, dus ruwweg 30 nucleotiden per seconde"**
(met de bandbreedte 1–4 kb/min erbij). De snelheid is genafhankelijk en neemt toe over de
lengte van het gen; na de promoter zit er eerst een **pauze** (~20–60 nt) vóór
pauzevrijgave door P-TEFb.

Bronnen:
- Jonkers I, Lis JT. *Getting up to speed with transcription elongation by RNA polymerase II.* Nat Rev Mol Cell Biol 2015;16:167–77. DOI 10.1038/nrm3953 — https://www.nature.com/articles/nrm3953
- Muniz L, Nicolas E, Trouche D. *RNA polymerase II speed: a key player in controlling and adapting transcriptome composition.* EMBO J 2021 — https://pmc.ncbi.nlm.nih.gov/articles/PMC8327950/
- Sheridan RM et al. *Widespread backtracking by RNA Pol II…* Mol Cell 2019 (mediaan 2–3 kb/min) — https://www.cell.com/molecular-cell/fulltext/S1097-2765(18)30891-8

---

## 6 · RNA-processing

### `capping`
> *"Kort na de start krijgt het pre-mRNA een 7-methylguanosine, via een 5'–5'-trifosfaatbrug gekoppeld. Beschermt tegen afbraak en is nodig voor export en translatie-initiatie."*

✅ Klopt. Optioneel: "kort na de start" mag concreet worden — capping gebeurt als het
transcript **~20–30 nt** lang is, door enzymen die aan de Ser5-gefosforyleerde CTD hangen.

### `splicing`
> *"snRNP's (U1, U2, U4, U5, U6) verwijderen intronen (meestal GU…AG) via twee transesterificaties met het vertakkingspunt-A; het intron komt vrij als lariat. Alternatieve splicing maakt meerdere eiwitten per gen."*

✅ Klopt. ⚠️ Twee nuances:
- De vijf snRNP's zijn correct, maar de assemblage is sequentieel (E → A → B → B\* → C) en
  **U1 en U4 verlaten het complex** vóór de katalyse; U6 neemt de 5′-splitsplaats over. Als
  de animatie de vijf snRNP's tegelijk toont, is dat mechanistisch misleidend.
- Het **U12-type spliceosoom** (U11/U12/U4atac/U6atac, "minor spliceosome") verwerkt een
  kleine minderheid van de intronen — mag als voetnoot.

### `polya`
> *"CPSF herkent AAUAAA; het RNA wordt ~10–30 nt verderop geknipt en poly(A)-polymerase voegt een staart van ~200–250 A toe."*

| Claim | Verdict |
|---|---|
| CPSF herkent AAUAAA | ✅ |
| Knip ~10–30 nt stroomafwaarts | ✅ |
| Staart ~200–250 A | ✅ |

⚠️ Nuances:
- Binnen CPSF is het specifiek **CPSF30 + WDR33** dat AAUAAA bindt en **CPSF73** dat knipt;
  de knipplaats ligt tussen AAUAAA en een **GU-rijk downstream-element** dat door **CstF**
  wordt gebonden.
- 200–250 A geldt voor **nieuw gesynthetiseerde** staarten in zoogdiercellen; in het
  cytoplasma worden ze door deadenylases korter (steady-state veel korter). Voeg
  "vers gesynthetiseerd" toe, anders wekt de app de indruk dat elk mRNA 250 A's heeft.
- De lengtebegrenzing komt door **PABPN1**, dat de processieve stimulatie van
  poly(A)-polymerase door CPSF rond ~250 nt verbreekt — mooi animatie-element.

Bronnen:
- Kühn U et al. *Poly(A) tail length is controlled by the nuclear poly(A)-binding protein…* J Biol Chem 2009 — https://www.sciencedirect.com/science/article/pii/S0021925817307858
- Passmore LA, Coller J. *Birth of a poly(A) tail: mechanisms and control of mRNA polyadenylation.* Nat Rev Mol Cell Biol 2022. PMID 36416579 — https://pubmed.ncbi.nlm.nih.gov/36416579/
- *Cleavage and polyadenylation: ending the message expands gene regulation* — https://pmc.ncbi.nlm.nih.gov/articles/PMC5546720/

### `export`
> *"Het rijpe mRNP wordt via TREX en de exportreceptor NXF1–NXT1 door de kernporie gebracht (grotendeels Ran-onafhankelijk)."*

✅ Klopt, en de expliciete vermelding "grotendeels Ran-onafhankelijk" is een sterk punt —
dat is precies het contrast met eiwit-import. ⚠️ Aanvulling: de directionaliteit komt van
**DDX19/Dbp5** aan de cytoplasmatische zijde (geactiveerd door Gle1 en InsP6), dat NXF1 van
het mRNA afduwt; **ALYREF/THOC** koppelen TREX aan de cap. Een uitzondering die de
"Ran-onafhankelijk"-regel nuanceert: sommige mRNA's (o.a. via **CRM1/XPO1**) gaan wél via
de Ran-route.

---

## 7 · Translatie

### `translatie`
> *"Ribosomen lezen het mRNA 5'→3' in codons en koppelen aminozuren via peptidebindingen; meerdere ribosomen tegelijk vormen een polysoom."*

✅ Klopt.

**Elongatiesnelheid van de translatie** (gevraagd): ✅ **≈ 5–6 aminozuren per seconde** in
zoogdiercellen (ribosome profiling ≈ 5,5 aa/s; rattenlever ≈ 5,7 aa/s; per orgaan:
lever 6,8 · nier 5,0 · skeletspier 4,3 aa/s). Bacteriën: **15–20 aa/s**. Voor de app:
*"ongeveer 5–6 aminozuren per seconde bij de mens, twee tot drie keer sneller bij
bacteriën."*

Bronnen:
- *Translation elongation rate varies among organs and decreases with age.* Nucleic Acids Res 2021;49:e9. DOI 10.1093/nar/gkaa1113 — https://academic.oup.com/nar/article/49/2/e9/6017408
- Riba A et al. / *What determines eukaryotic translation elongation?* Open Biol 2020;10:200292. DOI 10.1098/rsob.200292 — https://royalsocietypublishing.org/rsob/article/10/12/200292/90892/
- *The ribosome in action: tuning of translational efficiency and protein folding* — https://pmc.ncbi.nlm.nih.gov/articles/PMC4972197/

### `ribosoom`
> *"Eukaryoot 80S (40S + 60S), bacterieel 70S (30S + 50S). A-, P- en E-plaats. De peptidyltransferase-activiteit zit in het rRNA: het ribosoom is een ribozym."*

✅ Alle claims kloppen. Aanvullingen die met de cursus (kernpunten §5) overeenkomen en in de
knoop zouden passen: 70S ≈ 2 500 kDa; 30S = 16S rRNA (~1 500 nt) + ~20 eiwitten;
50S = 23S rRNA (~2 900 nt) + 5S rRNA + ~30 eiwitten; kleine subeenheid controleert de
codon–anticodonparing, grote subeenheid katalyseert de peptidebinding; **S = Svedberg**
(sedimentatiecoëfficiënt, daarom niet optelbaar: 30 + 50 ≠ 70).

**PDB-codes:**
- **4UG0** ✅ Khatter H, Myasnikov AG, Natchiar SK, Klaholz BP. *Structure of the human 80S ribosome.* Nature 2015. DOI 10.1038/nature14427 — ideaal voor het eukaryote 80S.
- **4V6F** ✅ Jenner LB, Demeshkina N, Yusupova G, Yusupov M. *Structural aspects of messenger RNA reading frame maintenance by the ribosome.* Nat Struct Mol Biol 2010. DOI 10.1038/nsmb.1790 — 70S **met drie tRNA's en mRNA**, dus uitstekend om A-, P- en E-plaats te tonen.

### `trna`
> *"~76 nt; klaverbladvorm in 2D, L-vorm in 3D. Anticodon aan één kant, CCA-uiteinde met het aminozuur aan de andere kant (~70 Å verder)."*

| Claim | Verdict |
|---|---|
| ~76 nt | ✅ |
| Klaverblad 2D / L-vorm 3D | ✅ |
| Anticodon en CCA aan tegenovergestelde uiteinden | ✅ |
| ~70 Å ertussen | ⚠️ |

⚠️ De gangbare waarde is **≈ 76 Å** (soms "meer dan 70 Å"). "~70 Å" is niet fout maar aan de
lage kant. **Voorstel:** *"…aan de andere kant (ongeveer 75 Å verder)."* Dat is bovendien
een leuk toeval om te tonen: ~76 nucleotiden én ~76 Å.

**PDB 1EHZ** ✅ Shi H, Moore PB. *The crystal structure of yeast phenylalanine tRNA at 1.93 Å
resolution: a classic structure revisited.* RNA 2000. DOI 10.1017/S1355838200000364 —
perfect, want dit is dezelfde tRNA^Phe-uit-gist waar de cursus (kernpunten §5) over spreekt.

### `codon`
> *"64 codons: 61 coderen voor aminozuren, 3 zijn stopcodons (UAA, UAG, UGA). AUG = start (Met). Gedegenereerd; wobble aan de derde codonpositie."*

✅ Alles klopt. Optioneel: bij bacteriën is het startaminozuur **formyl-methionine (fMet)**;
en de "3 stopcodons" geldt voor de standaardcode — mitochondriale en sommige
protozoaire codes wijken af (mooie brug naar de `seleno`-knoop).

### `initiatie`
> *"Eukaryoten: eIF4F bindt de cap, het 43S-complex (40S + eIF2–GTP–Met-tRNAi + eIF3 …) scant naar het start-AUG (Kozak-context), daarna koppelt de 60S. Bacteriën: Shine–Dalgarno paart met 16S-rRNA."*

| Claim | Verdict |
|---|---|
| eIF4F (eIF4E+4G+4A) bindt de cap | ✅ |
| 43S = 40S + eIF2–GTP–Met-tRNAi + eIF3 … | ⚠️ |
| Scannen naar start-AUG, Kozak-context | ✅ |
| Daarna koppelt de 60S | ✅ |
| Bacteriën: Shine–Dalgarno paart met 16S-rRNA | ✅ |

⚠️ Nomenclatuur: het **43S** preinitiatiecomplex is 40S + eIF2-TC + eIF1/1A/3/5 **zonder
mRNA**; zodra het mRNA gebonden is heet het **48S**, en het is dit 48S-complex dat **scant**.
Zoals de zin nu staat, scant het 43S — dat is strikt genomen onjuist.

**Voorstel:** *"Eukaryoten: eIF4F bindt de cap; het 43S-preinitiatiecomplex (40S +
eIF2–GTP–Met-tRNAi + eIF1, eIF1A, eIF3, eIF5) wordt op het mRNA geladen (dan 48S) en scant
naar het eerste AUG in gunstige Kozak-context; eIF5B helpt daarna de 60S koppelen tot 80S.
Bacteriën: de Shine–Dalgarno-sequentie paart met het 3'-uiteinde van het 16S-rRNA."*

### `elongatie`
> *"eEF1A (EF-Tu) brengt aminoacyl-tRNA naar de A-plaats; peptidebinding in het ribosoom; eEF2 (EF-G) verplaatst het ribosoom één codon."*

✅ Klopt. ⚠️ Twee aanvullingen: de peptidyltransferase-reactie wordt door het **rRNA**
gekatalyseerd (consistent met de `ribosoom`-knoop), en de translocatie zet het peptidyl-tRNA
van A naar P en het lege tRNA van P naar E. Bacteriën hebben daarnaast **EF-Ts** (GEF voor
EF-Tu); de eukaryote tegenhanger is **eEF1B**. Optioneel: **eEF3** bestaat alleen in gist.

### `terminatie`
> *"eRF1 herkent alle drie stopcodons (bacteriën: RF1 voor UAA/UAG, RF2 voor UAA/UGA); het peptide wordt vrijgemaakt en het ribosoom gerecycleerd."*

✅ Alle claims kloppen, inclusief de RF1/RF2-specificiteit. ⚠️ Aanvulling: eRF1 werkt als
complex met de GTPase **eRF3**; de recyclage gebeurt door **ABCE1** (bacterieel: RRF +
EF-G). Dat maakt "gerecycleerd" concreet voor een animatie.

### `seleno`
> *"Hercodering van stopcodons: UGA → selenocysteïne (met SECIS-element in het mRNA), UAG → pyrrolysine in sommige methanogene archaea."*

| Claim | Verdict |
|---|---|
| UGA → selenocysteïne, SECIS-element | ⚠️ |
| UAG → pyrrolysine in methanogene archaea | ⚠️ |

⚠️ SECIS: bij **eukaryoten en archaea** ligt het SECIS-element in de **3′-UTR** (en werkt via
**SBP2 + eEFSec**), bij **bacteriën** ligt het **onmiddellijk stroomafwaarts van het
UGA-codon** (en werkt via **SelB**). "In het mRNA" is te vaag voor een cursus die juist dit
detail behandelt.

⚠️ Pyrrolysine: komt voor in methanogene archaea (**Methanosarcina**-soorten) **maar ook in
enkele bacteriën**, zoals *Desulfitobacterium hafniense*. "In sommige methanogene archaea"
is dus te beperkt. Het cis-element heet **PYLIS** en is minder goed onderbouwd dan SECIS.

**Voorstel:** *"Hercodering van stopcodons: UGA → selenocysteïne, gestuurd door een
SECIS-haarspeld die bij ons in de 3'-UTR ligt (bij bacteriën pal achter het UGA-codon);
UAG → pyrrolysine bij methanogene archaea (Methanosarcina) en enkele bacteriën."*

Bronnen:
- Ambrogelly A, Palioura S, Söll D e.a.; *Pyrrolysine and selenocysteine use dissimilar decoding strategies.* J Biol Chem — https://www.jbc.org/article/S0021-9258(20)64079-0/fulltext
- *Why selenocysteine is unique?* — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6987413/
- *Selenocysteine insertion directed by the 3′-UTR SECIS element in Escherichia coli.* Nucleic Acids Res 2005;33:2486 — https://academic.oup.com/nar/article/33/8/2486/2401502
- Namy O et al. *In vivo contextual requirements for UAG translation as pyrrolysine.* Mol Microbiol 2007. DOI 10.1111/j.1365-2958.2006.05500.x

---

## 8 · PDB-codes uit de kernpunten

### 8.1 `6BNA` — netropsine + Dickerson-dodecameer?

✅ **Klopt**, met één belangrijke precisering.

**6BNA** = *"Binding of an antitumor drug to DNA. Netropsin and C-G-C-G-A-A-T-T-BrC-G-C-G"*,
Kopka ML, Yoon C, Goodsell D, Pjura P, Dickerson RE, **J Mol Biol 1985**,
DOI 10.1016/0022-2836(85)90171-8 — https://www.rcsb.org/structure/6BNA

⚠️ Precisering: het is niet letterlijk hetzelfde dodecameer als 1BNA. 1BNA is
d(CGCGAATTCGCG); 6BNA is de **5-broomcytosine-variant** d(CGCGAATT**Br**CGCG) met
netropsine in de kleine groef. Het is dus "het Dickerson-dodecameer (broomgesubstitueerde
variant)" — zelfde groep, zelfde sequentiecontext, zwaar-atoomderivaat voor de fasering.
De claim in de kernpunten mag van `[te verifiëren]` naar bevestigd, met deze voetnoot.

**Voorstel kernpunten:** *"netropsine in het Dickerson-dodecameer (broomgesubstitueerde
variant d(CGCGAATT-BrC-GCG), PDB 6BNA — Kopka et al., J Mol Biol 1985)"*

### 8.2 De G-quadruplex: "193D" is ❌ **fout**

**193D** = *"Solution structure of a quinomycin bisintercalator–DNA complex"* (Chen H,
Patel DJ, J Mol Biol 1995, DOI 10.1006/jmbi.1994.0074) — dat is een **intercalator**structuur,
géén G-quadruplex. Interessant genoeg past 193D dus wél bij het *eerste* drug–DNA-type in
de cursus (intercalatie), maar niet bij de quadruplex.

De docent bedoelde vrijwel zeker **143D** (het cijfer dat "1…93D" het dichtst benadert en
inhoudelijk klopt):

- ✅ **143D** — *Solution structure of the human telomeric repeat d[AG3(T2AG3)3] G-tetraplex*,
  Wang Y, Patel DJ, **Structure 1993**;1:263–282, DOI 10.1016/0969-2126(93)90015-9 —
  https://www.rcsb.org/structure/143D
  NMR-structuur van de **menselijke telomeerherhaling**, dus exact het voorbeeld
  ("guaninerijke sequenties, bv. telomeren") uit de kernpunten. Antiparallelle
  intramoleculaire quadruplex, Na⁺.

Voor een kristalstructuur met duidelijk zichtbaar **K⁺ in het centrale kanaal** (visueel het
sterkste voor de app) is de betere keuze:

- ✅ **1KF1** — Parkinson GN, Lee MPH, Neidle S. *Crystal structure of parallel quadruplexes
  from human telomeric DNA.* **Nature 2002**;417:876–880, DOI 10.1038/nature755 —
  https://www.rcsb.org/structure/1KF1
  Parallelle ("propeller") quadruplex van dezelfde humane telomeerherhaling, met de
  K⁺-ionen tussen de G-kwartetten.

**Aanbeveling:** noteer in de kernpunten **143D** als "wat de docent bedoelde" en voeg
**1KF1** toe als de aanbevolen structuur voor de 3D-modus; geef eventueel beide, want ze
illustreren mooi dat dezelfde sequentie in **verschillende topologieën** (antiparallel vs.
parallel) kan vouwen. Voeg `pdb: ['143D', '1KF1']` toe aan de knoop `noncanon` — die heeft
nu **geen** PDB-code.

---

## 9 · Jaartallen in `DNA-RNA structuur - kernpunten.md`

| Bewering | Jaar in notitie | Verdict |
|---|---|---|
| Darwin, natuurlijke selectie (*On the Origin of Species*) | 1859 | ✅ |
| Miescher isoleert "nucleïne" | 1869 | ✅ |
| Avery: DNA is de drager van genen (Avery–MacLeod–McCarty) | 1944 | ✅ |
| Watson & Crick, dubbelhelix | 1953 | ✅ |
| Nobelprijs Watson, Crick, Wilkins | 1962 | ✅ |
| Rosalind Franklin overleden (dus geen Nobelprijs) | 1958 | ✅ |
| Eerste atomaire dubbelhelix: ApU en GpC | 1973 | ⚠️ |
| B-DNA-kristalstructuur, Dickerson-dodecameer = 1BNA | 1980–81 | ✅ |
| Z-DNA (linkshandig) | 1979 | ✅ |
| Eerste RNA-kristalstructuur, tRNA^Phe uit gist | 1974 | ✅ |
| Mendel, erfelijkheidswetten | *geen jaar* | — (1865/1866) |
| Levene, tetranucleotide-hypothese | *geen jaar* | — (1919, later weerlegd) |

**Details en correcties**

- **1869 (Miescher)** ✅ — Miescher isoleerde "Nuclein" in 1869 in Tübingen; publicatie 1871.
  De notitie zegt "kernen van witte bloedcellen": correct, hij gebruikte leukocyten uit pus
  van verbanden.
- **1973 (ApU/GpC)** ⚠️ **Tijdschriftattributie fout.** De notitie zegt "(PNAS)" voor beide.
  In werkelijkheid:
  - **ApU**: Rosenberg JM, Seeman NC, Kim JJP, Suddath FL, Nicholas HB, Rich A.
    *Double helix at atomic resolution.* **Nature** 1973;243:150–154.
    DOI 10.1038/243150a0 — https://www.nature.com/articles/243150a0
  - **GpC**: Day RO, Seeman NC, Rosenberg JM, Rich A. *A crystalline fragment of the double
    helix: the structure of the dinucleoside phosphate guanylyl-3′,5′-cytidine.*
    **PNAS** 1973;70:849–853. DOI 10.1073/pnas.70.3.849 —
    https://www.pnas.org/doi/abs/10.1073/pnas.70.3.849

  **Voorstel:** *"Eerste atomaire dubbelhelix: kristalstructuren van zelfcomplementaire
  dinucleosidefosfaten ApU (Nature) en GpC (PNAS), beide 1973."*
- **1979 (Z-DNA)** ✅ — Wang AH-J, Quigley GJ, Kolpak FJ, Crawford JL, van Boom JH,
  van der Marel G, Rich A. *Molecular structure of a left-handed double helical DNA fragment
  at atomic resolution.* **Nature** 1979;282:680–686. DOI 10.1038/282680a0.
  ⚠️ Let op dat de graaf-knoop `dnavormen` **PDB 1DCG** gebruikt: dat is de latere
  1,0 Å-herbepaling van d(CGCGCG) uit **1989** (Gessner et al., JBC), niet de originele
  structuur uit 1979. Dat is prima voor 3D-weergave, maar niet "de structuur uit 1979".
- **1980–81 (B-DNA)** ✅ — Wing R et al. *Crystal structure analysis of a complete turn of
  B-DNA.* Nature 1980;287:755–758; Drew HR et al. PNAS 1981;78:2179 (= **1BNA**).
  De spanne "1980–81" is dus juist onderbouwd.
- **1974 (tRNA^Phe)** ✅ — Kim SH et al. *Three-dimensional tertiary structure of yeast
  phenylalanine transfer RNA.* Science 1974;185:435–440; Robertus JD et al. *Structure of
  yeast phenylalanine tRNA at 3 Å resolution.* Nature 1974;250:546–551.
  De bewering "20 jaar lang de enige RNA-structuur" is ⚠️ een didactische
  overdrijving — er kwamen wél andere tRNA-structuren; bedoeld is dat het lang de enige
  **soort** RNA-molecuul met een kristalstructuur bleef (tot het hammerhead-ribozym en de
  P4-P6-groep-I-intron-domeinen rond 1994–96).
- **Mendel / Levene:** voeg eventueel 1865–66 (Mendel) en 1919 (Levene, tetranucleotide) toe
  voor volledigheid — maar de docent zegt expliciet dat jaartallen (behalve Watson & Crick)
  geen examenstof zijn.

---

## 10 · Belangrijkste correcties (samenvatting)

**❌ Fout — moet aangepast worden**

1. **PDB "193D" is niet de G-quadruplex.** 193D is een quinomycine-**bisintercalator**–
   DNA-complex (Chen & Patel, J Mol Biol 1995). Bedoeld is **143D** (humane telomeerherhaling,
   Wang & Patel, Structure 1993); voor de 3D-modus is **1KF1** (Parkinson et al., Nature 2002,
   met K⁺ in het kanaal) de beste keuze. → corrigeer de kernpunten en geef `noncanon` een
   `pdb`-veld.
2. **Kernpunten: "ApU en GpC (PNAS) [1973]"** — ApU stond in **Nature** (Rosenberg et al.
   1973), GpC in PNAS (Day et al. 1973). Het jaartal is juist, de tijdschriftattributie niet.

**⚠️ Nuance nodig — belangrijkste gevallen**

3. **`nucleosoom`: 147 bp met 1,65 windingen is intern inconsistent.** 1,65 hoort bij 146 bp
   (1AOI); bij 147 bp (1KX5) is het ~1,67. Gebruik "~147 bp in ongeveer 1,7 windingen".
4. **`initiatie`: het 43S-complex scant niet.** Met mRNA erop heet het **48S**, en dát scant.
5. **`seleno`: SECIS-locatie ontbreekt.** 3′-UTR bij eukaryoten/archaea (via SBP2/eEFSec),
   direct achter het UGA bij bacteriën (via SelB). Pyrrolysine komt ook in enkele
   **bacteriën** voor, niet alleen in methanogene archaea.
6. **`trna`: "~70 Å"** tussen anticodon en CCA is aan de lage kant; gangbaar is **~76 Å**.
7. **`dnavormen`: "A-DNA compacter én breder"** is verwarrend → "korter en dikker, fosfaten
   dichter bij elkaar (≈5,9 i.p.v. ~7 Å), C3′-endo, gekantelde basenparen". Ook: de graaf
   zegt 10,5 bp/winding voor B-DNA en de cursusnotitie 10 (vezelmodel) — maak dat verschil
   expliciet, anders lijkt één van de twee fout. Z-DNA: voeg **alternerend syn/anti** toe,
   want dat is examenstof.
8. **`polya`: "staart van ~200–250 A"** geldt voor **vers gesynthetiseerde** staarten;
   cytoplasmatische staarten zijn korter door deadenylatie.
9. **`rnapol` + PDB 1I6H:** de tekst zegt 12 subeenheden, maar 1I6H is het
   **10-subeenheden gist**-kerncomplex (Rpb4/7 afwezig). Vermeld dat, of gebruik een humane
   Pol II-structuur (5FLM/5IY6).
10. **`chromosoom`: "~3,1 miljard bp"** → nauwkeuriger "≈ 3,0–3,1 miljard bp" (T2T-CHM13
    geeft 3,05 Gb).
11. **Adenovirus:** CAR is een **aanhechtings**receptor (niet de opnameroute); kinesine-1
    werkt **indirect** (Kif5C–Nup358, Klc1/2–capside) en ontmanteling vraagt ook
    **histon H1**; transcriptie door Pol II geldt voor de eiwitcoderende genen — de
    **VA-RNA's** komen van **Pol III**.
12. **mRNA-LNP:** het cijfer **1–2 %** endosomale ontsnapping komt van **siRNA**-LNP's
    (Gilleron 2013), niet van mRNA-vaccins; presenteer het als orde van grootte.
13. **Kernporie-aantallen:** "2 000–5 000" is **per kern**, niet per µm² (die fout staat in
    veel secundaire bronnen). HeLa ≈ 3 000 per kern.

**✅ Zonder opmerkingen correct bevonden**

`kern`, `kernimport`, `chromatine` (mechanistisch te verfijnen), `basenparing`, `noncanon`
(inhoudelijk), `transcriptie`, `promoter` (op de XPB/CDK7-precisering na), `capping`,
`splicing` (assemblage-orde nuanceren), `export`, `translatie`, `ribosoom`, `codon`,
`elongatie`, `terminatie`, en de PDB-codes **1BNA, 440D, 1DCG, 1AOI, 1KX5, 1EHZ, 4UG0,
4V6F, 6BNA**. Van de jaartallen in de kernpunten zijn **alle** historisch correct; alleen
de tijdschriftattributie bij 1973 moet bij.

**Nog te doen in ronde 2**

- Agrobacterium-knopen: ofwel verwijderen uit de graaf, ofwel apart verifiëren (ze zijn in
  deze ronde bewust overgeslagen na de scopewijziging naar de menselijke cel).
- Niet-gevraagde knopen die wel factclaims bevatten: `replicatie` (Meselson–Stahl 1958),
  `replisoom`, `telomeren`, `nmd` (50–55 nt-regel), `rnai`, `polymerasen` (45S vs 47S
  pre-rRNA), `ribogenese` (~80 ribosomale eiwitten), `secundair` (3,6 residu/winding),
  `ramachandran`, `quaternair`, `vouwing`, `glyco`, `ubiquitine`.
- Overweeg de nieuwe knopen uit de kernpunten toe te voegen: drug–DNA-complexen,
  conformatiewiel/torsiehoeken, ribozymen, bulges/mismatches.
