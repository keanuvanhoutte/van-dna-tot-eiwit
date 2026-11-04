# Schema: bacterie-route (E. coli) — voorstel POC

Status: **volledig uitgewerkt en nagekeken 04-11-2026** (verificatieronde 6: `docs/verificatie-ronde-6-bacterie.md`). Scènes: `app/scenes/bact/`, uitleg + bronnen: `shared/details/bact.js` en `bact2.js`, verhaallijn `bacterie` in `app/story.js`.

## 1. Startpagina: drie keuzes

| Kaart | Gaat naar | Ondertitel (één zin) |
|---|---|---|
| **Menselijke cel** | `app/index.html?scene=cel` (bestaand) | Het DNA zit in een kern; het RNA wordt eerst bewerkt. |
| **Bacteriecel (E. coli)** — nieuw | `app/index.html?scene=bcel&story=bacterie` | Geen kern: kopiëren en vertalen gebeuren tegelijk. |
| **DNA-bib** | `atlas/index.html` (bestaand) | Alle soorten DNA en RNA in 3D. |

De "Blueprint"-kaart wordt een klein linkje onderaan (bij het archief), zodat er precies drie grote keuzes zijn.

## 2. Hoe het in de app past (hergebruik)

- Dezelfde engine (`app/engine.js`) en dezelfde speler (▶/⏸, stappen, NL/EN, zijpaneel, kaart).
- Een **derde verhaallijn** `bacterie` in `app/story.js`, naast "Verhaal 1 · virus" en "Verhaal 2 · signaal".
- Nieuwe scènes in een eigen map `app/scenes/bact/`, nieuwe knopen in `shared/graph.js` (+ `graph.en.js`), uitleg met bronnen in `shared/details/bact.js`.
- De bestaande, al nagekeken scène **`operon`** (lac-operon, σ70, gekoppelde translatie) wordt hoofdstuk 2. Die bestaat al; ik pas niets aan.

## 3. Verhaallijn POC (6 hoofdstukken) — bijgewerkt na akkoord (04-11-2026)

Wensen van de gebruiker: een deel over **plasmiden**, een deel over de **belangrijke stukken van het bacterie-DNA** (promoter, σ-factoren, Shine-Dalgarno, operator, terminator, expressie/regulatie, "splicing-mogelijkheden", noodzakelijke delen) en **op termijn 3D-scènes**, met hergebruik van eukaryote scènes als het principe hetzelfde is.

| # | Scène | Titel (principe) | Wat je ziet (stappen) |
|---|---|---|---|
| 1 | `bcel` nieuw · 2D | **Een bacterie heeft geen kern** | staafje E. coli (wand + membraan) · nucleoïd · één ringvormig chromosoom (≈ 4,6 miljoen bp) · plasmiden · 70S-ribosomen naast het DNA |
| 2 | `bplasmide` nieuw · 2D | **Plasmiden: kleine extra ringen** | eigen startplaats (ori) → kopieert zichzelf los van het chromosoom · kopieaantal (1–2 tot honderden) · resistentiegen (bla → ampicilline) · overdracht via conjugatie (pilus, één streng gaat over, beide cellen maken ze weer dubbel) |
| 3 | `bgen` nieuw · 2D | **De onderdelen van een bacterieel gen** | kaart van links naar rechts: promoter (−35 / −10) · operator · startpunt (+1) · Shine-Dalgarno · startcodon · coderend deel · stopcodon · terminator (haarspeld + U's) · σ-factoren = schakelaars voor groepen genen · splicen? bijna nooit (zeldzame zelfsplicende groep I/II-introns, inteïnes op eiwitniveau) · noodzakelijk: oriC (één startplaats voor replicatie) en ≈ 300 essentiële genen |
| 4 | `bpol` nieuw · **3D** (PDB 6OUL) | **Eén RNA-polymerase, met een σ-factor als gids** | echte cryo-EM-structuur van E. coli RNA-polymerase + σ70 op promoter-DNA · kern α₂ββ′ω · σ70 · σ-deel 4 grijpt de −35 · σ-deel 2 grijpt de −10 en opent het DNA. Zelfde bouwsteen (`structure3d`) als de menselijke RNA-polymerase II-scène |
| 5 | `operon` bestaand | **Eén schakelaar voor drie genen** | ongewijzigd (lac-operon, LacI, CAP, gekoppelde translatie) |
| 6 | `bmrna` nieuw · 2D | **Bacterieel mRNA is meteen klaar** | gekoppelde transcriptie–translatie · Shine-Dalgarno paart met 16S-rRNA · fMet · 30S + 50S = 70S · slotstap: tabel mens ↔ bacterie |

Hergebruik: na hoofdstuk 6 leiden knoppen naar de bestaande scènes **codon**, **elongatie** en **vouwing** (zelfde principe bij mens en bacterie). Volgende ronde 3D: E. coli 70S-ribosoom (PDB 4YBB) en het "expressoom" RNA-polymerase + ribosoom (PDB 6ZTJ), met dezelfde `structure3d`-bouwsteen.

## 4. Verschillen mens ↔ bacterie (wordt ook een tabel in de app: hoofdstuk 6, laatste stap)

| | Mens | Bacterie (E. coli) |
|---|---|---|
| DNA ligt in | kern (2 membranen) | nucleoïd, vrij in het cytoplasma |
| Chromosomen | 46 lineaire, op nucleosomen | 1 ringvormig + vaak plasmiden |
| RNA-polymerase | 3 soorten (I, II, III) | 1 soort, met σ-factor voor de promoter |
| Genen | meestal één gen per mRNA | vaak operons: meerdere genen per mRNA |
| mRNA-bewerking | 5'-cap, splicing, poly(A)-staart | geen van drie |
| Transcriptie & translatie | gescheiden (kern / cytosol) | gekoppeld, tegelijk |
| Start van translatie | ribosoom scant vanaf de cap | Shine-Dalgarno bij het startcodon |
| Ribosoom | 80S (40S + 60S) | 70S (30S + 50S) |

## 5. Bronnen (worden in `shared/details/bact.js` gezet, elke bewering gedekt)

- Alberts et al., *Molecular Biology of the Cell* 4e — NCBI Bookshelf (o.a. hoofdstuk 6, "From DNA to RNA" / "From RNA to protein").
- Lodish et al., *Molecular Cell Biology* 4e — NCBI Bookshelf (bacteriële genregulatie, lac-operon).
- Blattner et al. 1997, *Science* — genoom E. coli K-12 (4 639 221 bp), PubMed 9278503.
- Shine & Dalgarno 1974, *PNAS* — PubMed 4598299.
- Miller, Hamkalo & Thomas 1970, *Science* — gekoppelde transcriptie/translatie zichtbaar in EM, PubMed 4915703.
- Webster et al. 2020, *Science* — "expressoom" (RNAP + ribosoom), PubMed 32820062, PDB 6ZTJ.
- del Solar et al. 1998, *Microbiol Mol Biol Rev* — replicatie en kopieaantal van plasmiden, PubMed 9618448.
- Virolle et al. 2020, *Genes* — conjugatie, PubMed 33105635.
- Katayama et al. 2010, *Nat Rev Microbiol* — DnaA en oriC, PubMed 20157337.
- Baba et al. 2006, *Mol Syst Biol* — Keio-collectie, essentiële genen, PubMed 16738554.
- Ray-Soni, Bellecourt & Landick 2016, *Annu Rev Biochem* — terminatie, PubMed 27023849.
- Feklístov et al. 2014, *Annu Rev Microbiol* — σ-factoren, PubMed 25002089.
- Edgell, Belfort & Shub 2000, *J Bacteriol* — introns in bacteriën, PubMed 10986228; Lambowitz & Zimmerly 2011 — groep II-introns, PubMed 20463000; Mills, Johnson & Perler 2014 — inteïnes, PubMed 24695729.
- RCSB PDB 6OUL (E. coli RNAP-σ70 + rpsT P2-promoter, cryo-EM 3,4 Å; Chen et al., eLife 2019), 4YBB (E. coli 70S).
- UniProt: RpoD/σ70 (P00579), LacI (P03023), TEM-1 β-lactamase (P62593), DnaA (P03004).

## 6. Bewust *niet* in de POC

Replicatie in detail, celdeling, attenuatie (trp-operon), werking van antibiotica, 3D-scènes buiten `bpol`. Kan in een volgende ronde.

## 7. Volledige uitwerking (04-11-2026)

Verhaallijn `bacterie` (13 hoofdstukken), met 3D waar het kan en hergebruik van menselijke scènes waar het principe hetzelfde is:

| # | Scène | Soort | Inhoud |
|---|---|---|---|
| 1 | `bcel` | 2D | geen kern, nucleoïd, ringchromosoom, plasmiden, 70S-ribosomen |
| 2 | `bnucleoid` | **3D** 1IHF | DNA opvouwen zonder histonen: IHF buigt > 160° (Pro65/Pro64), HU, H-NS, Fis, gyrase |
| 3 | `bplasmide` | 2D | ori en kopieaantal, bla-resistentie, conjugatie |
| 4 | `bgen` | 2D | promoter/σ-factoren, operator, SD, terminator, introns/inteïnes, oriC, essentiële genen |
| 5 | `bpol` | **3D** 6OUL | RNA-polymerase + σ70 op de promoter |
| 6 | `operon` | hergebruik | lac-operon |
| 7 | `bterm` | 2D | intrinsieke terminator en Rho, polariteit |
| 8 | `bmrna` | 2D | gekoppeld, Shine-Dalgarno, fMet, 70S, vergelijkingstabel |
| 9 | `bribosoom` | **3D** 6ZTJ | 70S-ribosoom + RNA-polymerase (expressoom), NusG-brug |
| 10 | `codon` | hergebruik | genetische code (bij E. coli dezelfde) |
| 11 | `vouwing` | hergebruik | eiwitvouwing |
| 12 | `chaperones` | hergebruik | o.a. GroEL–GroES (bacterieel) |
| 13 | `bafbraak` | **3D** 6WRF | ClpXP: afbraak zonder ubiquitine |

Zijpaden: `breplicatie` (2D: oriC, twee vorken, ter/Tus), `btrp` (2D: trp-repressor en attenuatie), `bsplicing` (**3D** 1U6B: zelfsplicend groep I-intron, plus groep II en inteïnes). Elke bacteriescène heeft knoppen naar de vergelijkbare menselijke scène.

Lokale structuurbestanden in `data/pdb`: 1IHF, 1U6B, 6OUL volledig; 6ZTJ (alleen CA/P, bolletjesmodel) en 6WRF (alleen ruggengraat) ingekort zodat ze snel laden.

Nog mogelijk in een volgende ronde: antibiotica als zijpad (rifampicine, aminoglycosiden, gyraseremmers), het 70S-ribosoom met EF-Tu in 3D, en fagen (bacterievirussen) als tegenhanger van het adenovirus-verhaal.
