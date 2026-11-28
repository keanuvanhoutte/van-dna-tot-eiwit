# Verificatieronde 14 — uitleg per onderdeel ("Wat zie je?")

Datum: 2026-11-28

**Wat:** elke animatie (120 figuren) kreeg een tabblad "Wat zie je?": elk onderdeel van de figuur met een eenvoudige zin (hobbyist/secundair) en een vaktaalzin (hoger), in het Nederlands en het Engels. Woorden in de figuur zijn aanklikbaar en springen naar hun uitleg.

**Hoe gecontroleerd:** de teksten zijn geschreven door zes bouwers (per tak). Daarna controleerden drie aparte controleurs (A: bacterie, binnenkomst, signalen; B: genoom, eiwitten; C: replicatie, transcriptie, RNA, translatie) elke zin op juistheid, overeenkomst met de figuur (kleuren, vormen), eenvoud en taal, zonder het bouwverslag te volgen. Feiten die de bouwers zelf als niet-app-bron meldden, zijn apart nagegaan met een bron. Dekking (welke figuurwoorden een uitleg hebben) wordt gemeten met tools/parts-check.html.

Opmerking bij controle C: de bron voor de Zn²⁺-liganden en R175 van p53 is Cho et al., Science 1994 (primaire publicatie van PDB 1TUP, nagekeken via RCSB).


---

# Controle A: "Wat zie je?"-uitleg (parts), 42 scènes (bact, entry, signal)

Werkwijze: alle 540 parts uitgelezen via import van de scènemodules (`scratchpad/dumpA.mjs` → `dumpA.txt`), naast legende en stapteksten gelegd. Kleurwoorden in `d` vergeleken met de kleur `c` en waar twijfel was met de tekencode (nucleolus, cholesterol-OH, pH-kleuren, fosfaat, TFIID, EGF in cel). Twijfelachtige feiten nagekeken in `shared/details`, `shared/pro` en de broncommentaren van de scènes, verder handboekkennis. Na elke aanpassing `node --check` (alles ok) en opnieuw een import van alle 42 scènes (ok).

## Oordeel per scène

| scène | oordeel |
|---|---|
| antibiotica | ok |
| bafbraak | aangepast (1) |
| bcel | ok |
| beftu | ok |
| bgen | ok |
| bmrna | ok |
| bnucleoid | ok |
| bplasmide | ok |
| bpol | ok |
| breplicatie | ok |
| bribosoom | ok |
| bsplicing | ok |
| bterm | ok |
| btrp | ok |
| crispr | aangepast (1) |
| faag | aangepast (1) |
| gyraseremmers | ok |
| resistentie | aangepast (1) |
| ribosoomremmers | aangepast (1) |
| rifampicine | ok |
| vergelijk | aangepast (1) |
| adeno | ok |
| assemblage | ok |
| baltimore | aangepast (1) |
| cel | aangepast (1) |
| dubbellaag | aangepast (1) |
| endocytose | ok |
| integratie | ok |
| kernimport | ok |
| lnp | aangepast (2) |
| rt | ok |
| schaar | ok |
| sleutel | ok |
| virus | ok |
| viruskopie | ok |
| gpcr | ok (zie opmerking legende) |
| mapk | ok |
| rtk | ok |
| signaal | ok |
| srf | ok |
| steroid | ok |

## Aanpassingen (11 onderdelen, telkens NL + EN)

1. **bafbraak – motor (ClpX), p.nl**
   - oud: "poriehaarspelden grijpen het substraat …"
   - nieuw: "porielussen grijpen het substraat …"
   - reden: de vakterm is *pore loops* (porielussen), geen haarspelden; zo is de NL-zin ook gelijk aan de EN-zin.

2. **crispr – faag-DNA, p**
   - oud: "Cas1–Cas2 knippen er een protospacer uit voor integratie." / "Cas1–Cas2 excise a protospacer from it for integration."
   - nieuw: "een fragment ervan (prespacer) wordt door het integrasecomplex Cas1–Cas2 in de CRISPR-rij ingebouwd." / "a fragment of it (prespacer) is integrated into the CRISPR array by the Cas1–Cas2 integrase complex."
   - reden: Cas1–Cas2 is de integrase die de prespacer inbouwt. Het fragment wordt meestal door andere nucleasen gemaakt (bij E. coli I-E o.a. RecBCD), dus "knippen er een protospacer uit" klopt niet. Handboekkennis; Nuñez et al. 2015 (PMID 25707795), Levy et al. 2015 (PMID 25874675).

3. **faag – faag, p**
   - oud: "(Caudovirales, zoals T4 of λ)"
   - nieuw: "(klasse Caudoviricetes, zoals T4 of λ)" / "(class Caudoviricetes, …)"
   - reden: het ICTV heeft de orde Caudovirales in 2022 afgeschaft. Fagen met een staart vallen nu onder de klasse Caudoviricetes. Bron: Turner et al. 2023, Arch Virol 168:74 (PMID 36683075).

4. **ribosoomremmers – Tetracycline, d**
   - oud: "Zit op de kleine helft naast de aankomstplek …" / "next to the arrival spot"
   - nieuw: "Zit op de kleine helft, precies op de aankomstplek, …" / "right at the arrival spot"
   - reden: tetracycline bindt in de A-plaats van de 30S. Zo stemt de zin ook overeen met staptekst 1 ("houdt de A-plaats bezet") en met de p-zin.

5. **vergelijk – poly(A)-staart, d**
   - oud: "Ze maakt het RNA steviger." / "It makes the RNA more stable."
   - nieuw: "Ze maakt het RNA stabieler, zodat het langer meegaat." / "It makes the RNA more stable, so it lasts longer."
   - reden: "steviger" betekent mechanisch sterker. Bedoeld is een stabieler RNA dat minder snel wordt afgebroken. NL en EN zeggen nu hetzelfde.

6. **resistentie – ontvanger, d**
   - oud: "… krijgt een kopie van het plasmide via het buisje …" / "through the tube"
   - nieuw: "… krijgt van de bovenste een kopie van het plasmide …" / "from the top one"
   - reden: dit sprak de bplasmide-scène tegen. Die zegt (in de p-zin en de vereenvoudiging) dat de pilus de cellen samentrekt en dat het DNA via het T4SS op de contactplek overgaat.

7. **baltimore – (−)ssRNA, d**
   - oud: "… die het spiegelbeeld is van mRNA." / "the mirror image of mRNA"
   - nieuw: "… die de tegenstreng is van mRNA: de letters passen erop, maar ribosomen kunnen ze niet lezen." / "the counter-strand of mRNA: its letters pair with it, but ribosomes cannot read them."
   - reden: een complementaire streng is geen spiegelbeeld. "Tegenstreng" sluit aan bij staptekst 5.

8. **cel – lysosoom, d**
   - oud: "De rode blaasjes: het afvalverwerkingsblaasje van de cel …" / "waste-processing vesicle"
   - nieuw: "De rode blaasjes: de afvalverwerking van de cel …" / "the cell's waste processing"
   - reden: meervoud en enkelvoud botsten in dezelfde zin.

9. **dubbellaag – cel (ingezoomd), p**
   - oud: "Detail van het plasmamembraan, ≈ 37 px per nm."
   - nieuw: "Uitvergroot detail van het plasmamembraan; de maatlijn geeft de dikte van ≈ 4 nm aan." / EN idem
   - reden: pixels per nm is een interne tekenschaal. Die zegt de lezer niets, omdat de figuur op elk scherm anders schaalt.

10. **lnp – celkern, p**
    - oud: "het mRNA heeft geen kernlokalisatiesignaal en wordt niet geïmporteerd." / "no nuclear localisation signal"
    - nieuw: "cytosolisch mRNA wordt niet actief de kern in getransporteerd (mRNA-transport door de kernporie verloopt van kern naar cytoplasma)." / EN idem
    - reden: een NLS is een signaal in een eiwit, niet in een RNA. Handboekkennis (mRNA-export via NXF1/TREX).

11. **lnp – geen reverse transcriptase · geen integratie, p**
    - oud: "Zonder reverse transcriptase en integrase is omzetting naar DNA en integratie uitgesloten." / "are excluded"
    - nieuw: "Het vaccin codeert geen reverse transcriptase of integrase; omzetting naar DNA en integratie maken geen deel uit van het werkingsmechanisme." / "… are not part of its mechanism of action."
    - reden: "uitgesloten" is absoluter dan de bronnen toelaten. Er is een omstreden in-vitrostudie met LINE-1 in Huh7-cellen (Aldén et al. 2022, PMID 35192408). De nieuwe zin is juist en verdedigbaar. De d-zin en staptekst 6 heb ik zo gelaten: ze passen bij het vereenvoudigde beeld.

## Nagekeken en in orde (selectie van het niet-triviale)
- bnucleoid: IhfA 99 aa, IhfB 94 aa (UniProt P0A6X7/P0A6Y1); Pro65 (α) en Pro64 (β) intercaleren (Rice et al. 1996, PMID 8980235).
- bpol: σ4 HTH op −35, σ2 op −10, W433/W434 (UniProt P00579, staat in het broncommentaar van de scène); ω als chaperone voor β′ (Minakhin et al. 2001, PMID 11158566).
- rifampicine: NADFDGD van β′ D460/D462/D464; S531/H526/D516 als de meest voorkomende resistentieposities bij M. tuberculosis (E. coli-nummering); pocket ≈ 12 Å van het actieve centrum (Campbell et al. 2001, PMID 11290325).
- bmrna: anti-SD …CCUCCUUA-3′; initiator-anticodon CAU. beftu: anticodon GAA·UUC.
- bgen: zeven σ-factoren; Keio 303 essentiële genen (Baba 2006); groep II-introns in ≈ ¼ van de genomen.
- breplicatie: C-periode ≈ 40 min bij ≈ 1 000 nt/s per vork; oriC ≈ 250 bp; DnaB 5′→3′ op de matrijs van de achterblijvende streng.
- crispr: 42 % (Makarova 2020: 42,3 %, staat in shared/details/virus2.js).
- adeno/kernimport: hexon 240 trimeren; docking op Nup214; kinesine-1 (Kif5C via Nup358, Klc op het capside; Strunze 2011).
- sleutel: RBD 333–526, ACE2 19–615, 17/20 contactresiduen (Lan 2020).
- viruskopie: 29 903 nt; PLpro (nsp3) en Mpro (nsp5); DMV-porie nsp3 (Wolff 2020).
- dubbellaag: 3,6–4,3 nm komt overeen met Mitra 2004 (35,6–42,5 Å, in het broncommentaar van de scène).
- mapk: MEK1 Ser218/222, ERK2 Thr185/Tyr187, RAS-mutaties bij ≈ 19 % van de kankerpatiënten (Prior 2020).
- rtk: EGF 53 aa, binding tussen domein I en III, 1IVO, asymmetrisch kinasedimeer 2GS2.
- steroid: GR 777 aa; GRE AGAACAnnnTGTTCT.
- Kleurwoorden in `d` gecontroleerd tegen `c` en de tekencode. Zo is de nucleolus in cel echt donker getekend (#2b3e66), staat het OH van cholesterol rood (#ff6b6b), lopen de pH-kleuren in endocytose van groen naar rood, is EGF in cel blauwgroen (#5fd3e6) en is TFIID in srf lichtpaars (#c9b8ff). Ik vond geen fout.

## Opmerking buiten het parts-blok (niet aangepast)
- **gpcr, legende:** daar staat fosfaat als `#ff6b6b` (rood), maar `phos()` tekent het als PHOS = `#ff9f43` (oranje). Het label "fosfaat" in de figuur staat in `#ff8f8f`. De parts zeggen terecht "oranje". De legende zou op `#ff9f43` moeten staan (regel 23 van app/scenes/signal/gpcr.js).

## Feiten uit controle-feiten.md (mijn scènes)

| feit | oordeel | bron |
|---|---|---|
| srf: SRF is een MADS-box-factor | klopt | handboek; Pellegrini et al. 1995 (PMID 7637780) |
| srf: halfwaardetijd FOS-mRNA ≈ 10 min | klopt (gemeten 8,5–12,4 min) | Reddy et al. 2013, Mol Endocrinol 27:253 (in shared/details/signal2.js) |
| schaar: nirmatrelvir bindt covalent via zijn nitril | klopt (omkeerbaar thioimidaat met Cys145) | Owen et al. 2021, Science 374:1586 (PMID 34726479) |
| lnp: DSPC als helperfosfolipide | klopt (zowel BNT162b2 als mRNA-1273 bevatten DSPC) | Hou et al. 2021, Nat Rev Mater (PMID 34394960) |
| kernimport/endocytose (adeno): dyneïne naar het min-uiteinde | klopt (min-uiteinden bij het MTOC/de kern) | handboek |
| steroid: cortisol uit de bijnierschors | klopt (zona fasciculata) | handboek |
| gpcr: legende rood, getekend oranje | parts (oranje) klopt met de tekening; de legende moet worden aangepast (zie hierboven) | code: PHOS = #ff9f43 in app/scenes/prot/_b_kit.js |
| gyraseremmers: GyrA Ser83/Asp87 als ankerplaatsen | klopt | Aldred et al. 2014, Biochemistry 53:1565 (PMID 24576155) |
| bnucleoid: IHF, twee knikken ≈ 9 bp uit elkaar, motief RNPxT | klopt: knikken 9 bp uit elkaar; beide subeenheden hebben op de armtop "GRNPKTG" (IhfA/IhfB, UniProt P0A6X7/P0A6Y1) | Rice et al. 1996, Cell 87:1295 (PMID 8980235) |
| bafbraak: ssrA-tag AANDENYALAA | klopt | Keiler et al. 1996, Science 271:990 (PMID 8584937) |
| bpol: bubbel ≈ 13 bp (−11 tot +2); ω helpt bij de vouwing van β′ | klopt (−11…+2 = 13 posities); ω als chaperone voor β′ | Minakhin et al. 2001, PNAS 98:892 (PMID 11158566); RPo-bubbel: handboek |
| ribosoomremmers: uitgangstunnel ≈ 100 Å; mitoribosomen 55S | klopt | Nissen et al. 2000, Science 289:920 (PMID 10937990); 55S bij zoogdieren: handboek |
| beftu: kirromycine bindt tussen domein 1 en 3 van EF-Tu | klopt | Vogeley et al. 2001, Biochemistry 40:11423 (PMID 11560490) |
| vergelijk: poly(A) ≈ 200 nt | klopt (bij zoogdieren ≈ 200–250 nt bij synthese) | handboek |

---

# Controle B — "Wat zie je?" (parts), 42 scènes genome + prot

Werkwijze: per scène het volledige `parts`-blok gelezen (NL+EN, d en p), vergeleken met de stapteksten, legende/kleurconstanten in de scènecode (kit.js `C`, `BASE`, `HC`, `DEST`, lokale constanten) en de bronnen in `shared/details`. Alle aangepaste bestanden: `node --check` ok.

## Oordeel per scène

| scène | oordeel |
|---|---|
| basenparing | aangepast (1 onderdeel, d+p) |
| chromatine | ok |
| chromosoom | ok |
| dnahelix | ok |
| dnamethyl | aangepast (1 d) |
| dnavormen | ok |
| enhancer | aangepast (1 d, taal) |
| gen | aangepast (1 d) |
| histonmod | ok (H3.1-sequentie 1–30 en lysineposities nagekeken) |
| imprinting | ok |
| kern | ok |
| lussen | ok (2,1 kb/s, STAG1, 7W1M staan in genome3.js) |
| noncanon | ok |
| nucleolus | aangepast (1 d EN) |
| nucleosoom | ok (kleuren H3/H4/H2A/H2B en rode lysines kloppen met de code) |
| nucleotide | aangepast (1 d) |
| remodeler | aangepast (1 d + p) |
| supercoiling | ok |
| xinact | ok |
| aminozuren | ok |
| autofagie | ok |
| chaperones | ok |
| disulfide | ok (insuline-Cys A6/A7/A11/A20, B7/B19) |
| glyco | ok (SNFG-kleuren kloppen) |
| golgi | ok |
| idp | ok |
| lysosoom | aangepast (1 d) |
| membraan | ok |
| misvouwing | ok |
| mito | ok (MitoCarta in prot3.js) |
| peptide | ok |
| perox | ok |
| primair | ok (FASTA P68871 nagekeken) |
| proteasoom | ok |
| ptm | ok |
| quaternair | ok |
| ramachandran | ok (donkerblauw = toegestaan #173a6b, lichter = voorkeur #2b5ea8: klopt) |
| secundair | ok |
| sortering | ok |
| tertiair | ok (His92 F8 / His63 E7, Cys93/Cys112 van β-globine) |
| ubiquitine | aangepast (1 d) |
| vouwing | aangepast (1 p, taal) |

## Aanpassingen

1. **basenparing – Hoogsteen**
   - d oud: "…A draait om en paart met T via een andere kant. Zo ontstaan driedubbele stukken DNA (triplex) en G-kwartetten." → nieuw: "…Diezelfde kant van A of G gebruikt DNA ook in driedubbele stukken (triplex) en G-kwartetten." (EN idem)
   - p oud: "Hoogsteen-paring via de Hoogsteen-rand van de purine (N7, N6) met syn-adenine; komt voor in triplexen en G-quadruplexen." → nieuw: "Hoogsteen-paring via de Hoogsteen-rand van de purine (N7 en N6/O6); in een duplex draait de purine daarvoor naar syn. Dezelfde rand wordt gebruikt in triplexen en G-quadruplexen." (EN idem)
   - Reden: G-kwartetten bestaan uit G's, niet uit A·T-paren, en in triplexen blijft de purine anti; syn geldt voor Hoogsteen-paren in een duplex. Handboekkennis.
2. **dnamethyl – wat het stilhoudt** (d): "het extra X-chromosoom" → "één van de twee X-chromosomen bij een vrouw" (EN "one of the two X chromosomes in a woman"). Reden: "extra" klinkt als een afwijking (bv. 47,XXY); het gaat om het tweede X bij XX.
3. **enhancer – Pol II** (d NL): "Alleen start het maar traag." → "Op zichzelf start het maar traag." Reden: "alleen" kon ook "slechts" betekenen; nu gelijk aan het Engels ("On its own").
4. **gen – TFIID** (d): "Een eiwit…" → "Een eiwitcomplex…" (EN "A protein complex…"). Reden: TFIID bestaat uit TBP en ~13 TAF's; p zegt al "subeenheid TBP".
5. **nucleolus – CRM1** (d EN): "one at a time" → "each part separately". Reden: NL "apart" betekent dat de twee subeenheden los van elkaar naar buiten gaan, niet "één voor één".
6. **nucleotide – base** (d): "een platte ring van koolstof en stikstof" → "platte ringen van koolstof en stikstof" (EN "flat rings"). Reden: adenine (het voorbeeld) heeft twee ringen.
7. **remodeler – activator**
   - d: "Het kan pas op het DNA gaan zitten als dat vrij ligt." → "Meestal kan het pas…" (EN "Usually it can only…")
   - p: "…die nucleosoomvrij DNA nodig heeft om te binden." → "…; de meeste (pionierfactoren uitgezonderd) binden vooral nucleosoomvrij DNA." (EN idem)
   - Reden: pionierfactoren (bv. FOXA, SOX2) binden wel op nucleosomaal DNA. Zo stond het te absoluut. Handboekkennis (Zaret & Carroll, Genes Dev 2011, PMID 22056668).
8. **lysosoom – fosfaat eraf** (d): "gaat het label er meteen af" → "gaat het label eraf" (EN "comes off right away" → "comes off"). Reden: wie het fosfaat weghaalt staat in de bron (ACP2/ACP5), maar "meteen" (de snelheid) staat er niet in. Daarom de tijdsaanduiding geschrapt.
9. **ubiquitine – 26S-proteasoom** (d): "aan elk uiteinde een kap" → "aan één of beide uiteinden een kap" (EN "at one or both ends"). Reden: dit sprak de p ("één of twee 19S") en de proteasoomscène ("hier met één kap") tegen.
10. **vouwing – Levinthal** (p NL): "een gerichte energielandschap" → "een gericht energielandschap". Reden: taalfout (het landschap).

## Opmerkingen (niet aangepast, buiten parts of verdedigbaar)
- nucleotide: de figuurlabels (m) geven P–P ≈ 6,7 Å (C2′-endo) en ≈ 6,0 Å (C3′-endo). Handboeken (Saenger) geven ≈ 7,0 en ≈ 5,9 Å. Dat staat in de figuur, niet in `parts`, dus niet aangepast. Wel het nakijken waard.
- enhancer/gen: activatoren "willen" een gen aanzetten. Dat is een beeldspraak in eenvoudige taal en geen fout, dus gelaten.

## Feiten uit controle-feiten.md (genome + prot)

| feit | oordeel | bron |
|---|---|---|
| supercoiling: TOP1 (type IB), "gecontroleerde rotatie" | juist: het vastgelegde mechanisme van humaan TOP1 (tyrosyl-3′-fosfodiësterbinding, streng draait gecontroleerd rond de intacte streng) | Stewart et al., Science 1998, PMID 9488650; ook genome2.js |
| dnahelix: groefbreedte ≈ 6 Å en ≈ 12 Å | juist: de standaardwaarden voor B-DNA (klein ≈ 5,7–6 Å, groot ≈ 11,7–12 Å) | handboekkennis (Dickerson; Saenger, Principles of Nucleic Acid Structure) |
| gen: poly(A) ~200 nt; AATAAA ~10–30 nt vóór de knipplaats | juist: zoogdier-poly(A) wordt gesynthetiseerd tot ≈ 200–250 nt. AAUAAA ligt 10–30 nt stroomopwaarts van de knipplaats | handboekkennis (Proudfoot, Genes Dev 2011, PMID 21896655) |
| peptide: C–N ~40 % dubbelbindingskarakter | juist: de klassieke waarde van Pauling | Pauling, Corey & Branson, PNAS 1951, PMID 14816373 |
| lysosoom: ACP2/ACP5 | juist: beide verwijderen het fosfaat van M6P in lysosomen. "Meteen" geschrapt (zie aanpassing 8) | Makrypidi et al., Mol Cell Biol 2012, PMID 22158965 (op PubMed gecontroleerd) |
| lysosoom: zure α-glucosidase bij Pompe | juist: GAA-tekort, glycogeenstapelingsziekte type II | handboekkennis |

---

# Controle C — "Wat zie je?" (parts), 37 scènes (repl, txn, rna, tl)

Werkwijze: alle `parts` uitgelezen (dump: scratchpad `dumpC.txt`), elke d/p-zin (NL+EN) nagelezen tegen stapteksten, legende, scènecode (kleuren, sequenties, PDB-kop) en `shared/details`. Kleuren in d nagekeken in de tekencode waar twijfel was (replicatie, operon, promoter, herstel, export, rnai, translatie, seleno, rnapol, p53).

## Oordeel per scène

| scène | oordeel |
|---|---|
| ber, dsb, herstel, mmr, mutaties, ner, origins, replisoom, ssdna, telomeren | ok |
| **p53** | **aangepast** (1 zin) |
| **replicatie** | **aangepast** (1 zin) |
| genregulatie, operon, polymerasen, promoter, rnapol, transcriptie | ok |
| editing, export, korrels, lncrna, lokalisatie, mrnaafbraak, nmd, riboswitch, rnai, rnaprocessing, rnastructuur | ok |
| aars, codon, er, ribogenese, ribosoom, seleno, translatie, trna | ok |

## Aanpassingen

### replicatie — part "Okazaki-fragmenten" (d, NL+EN)
- Oud: "… (RNA-primer, **roze** uiteinde)." / "(RNA primer, **pink** end)."
- Nieuw: "… (RNA-primer, **oranje** uiteinde)." / "(RNA primer, **orange** end)."
- Reden: klopt niet met de figuur — PRIMER = C.rna = oranje (`repl/_draw.js`), legende "RNA-primer" #ff8a3d.

### p53 — part "merkteken" (p, NL+EN)
- Oud: "Fosforylering door ATM/ATR (o.a. Ser15, Ser20) in het N-terminale deel; …"
- Nieuw: "Fosforylering door ATM/ATR en hun effectorkinasen CHK2/CHK1 (o.a. Ser15, Ser20) in het N-terminale deel; …" (EN idem)
- Reden: Ser15 wordt direct door ATM/ATR gefosforyleerd, Ser20 vooral door CHK2/CHK1. Bron: Chehab et al., Genes Dev 2000, PMID 10673500.

## Nagekeken punten zonder wijziging (selectie)
- mutaties: rs713040 = HBB codon 2 CAT→CAC (synoniem); c.27_28insG → p.Ser10Valfs*14 nagerekend op de HBB-CDS (klopt); codon 17 AAG→TAG en codon 39 CAG→TAG (β⁰) kloppen; HGVS p.Glu7Val ok.
- herstel: mini-ladder GACTCGTACG — MMR-rij G·T (T in nieuwe streng), BER-rij C→U: klopt met d.
- ber: 1EMH, P2U (deoxypseudo-uridine) en uracilholte-residuen kloppen met scènekop.
- rnapol: 5FLM (rund) met humane nummering; Asp495/497/499, brughelix 832–869, triggerlus 1099–1129 kloppen met de controle in de scènekop; Mg²⁺ groen getekend.
- operon: lac −35 TTTACA / −10 TATGTT / 18 bp tussenruimte; cAMP gele en allolactose groene zeshoeken in de tekening.
- translatie: CDS AUGGCUUUCAAGGAUUGGCACGGACUGACCGAAAGCUAA = MAFKDWHGLTES + UAA; tRNA's als klaverblad getekend.
- telomeren: hTR-matrijs 3′-CAAUCCCAAUC-5′, paring 5 nt met …GTTAG-3′ en 6 nt GGTTAG overgeschreven: klopt.
- er: signaalpeptide MKWVTFISLLFLFSSAYS en propeptide RGVFRR (UniProt P02768) kloppen.
- trna: 14 modificaties in gist-tRNA^Phe (m²G10, D16, D17, m²₂G26, Cm32, Gm34, yW37, Ψ39, m⁵C40, m⁷G46, m⁵C49, T54, Ψ55, m¹A58) klopt.
- editing: apoB C6666 / codon 2153 CAA→UAA; GluA2 Q/R klopt.
- replisoom: vorksnelheid 1–3 kb/min = shared/details/repl.js.
- lncrna: 19 442 / 35 885 (GENCODE 50) = shared/details/rna2.js en graph.js.
- polymerasen: α-amanitine 0,02 / 20 µg/ml volgens Weinmann, Raskas & Roeder 1974 (bron in de scène).

## Feiten uit controle-feiten.md (repl/txn/rna/tl)

| feit | oordeel | bron |
|---|---|---|
| HR: Pol δ verlengt de streng | juist ("o.a. Pol δ") | Maloisel et al., Mol Cell Biol 2008, PMID 18086882 |
| NER: XPD van TFIIH verifieert de schade | juist ("helpt verifiëren") | handboek (Molecular Biology of the Cell / Friedberg, DNA Repair) |
| TPP1 "TEL patch" rekruteert telomerase | juist | Nandakumar et al., Nature 2012, PMID 23103865 |
| POT1 onderdrukt ATR, TRF2 onderdrukt ATM | juist | Denchi & de Lange, Nature 2007, PMID 17687332 |
| telomerase actief in "de meeste tumoren" | juist (≈ 85–90 %) | handboek |
| ssdna: OB-vouw als β-ton | juist (vijfstrengige β-barrel) | handboek; Bochkarev et al. 1997 (bron in scène) |
| p53 R175 verstoort de vouwing; Zn²⁺ = Cys176, His179, Cys238, Cys242 | juist | Cho et al., Science 1994 (primaire publicatie van PDB 1TUP, via RCSB) |
| ribosoom ≈ 4,3 MDa | juist | handboek |
| PABPC1 ≈ 27 nt per kopie | juist | handboek (Baer & Kornberg 1983) |
| rijp β-globine = 146 aminozuren | juist (147 codons incl. Met, die wordt verwijderd) | UniProt P68871 |
| CPSF-knipplek ≈ 10–30 nt na AAUAAA | juist | handboek |
| cytoplasmatisch exosoom met DIS3L | juist (DIS3L cytoplasmatisch, DIS3 vooral nucleair) | handboek / Tomecki et al. 2010 |
| LysRS bestaat in klasse I én II | juist (klasse I-LysRS in de meeste archaea en sommige bacteriën) | handboek / Ibba et al. 1997 |
| I34 ontstaat door ADAT2/3 | juist | handboek / Gerber & Keller 1999 |
