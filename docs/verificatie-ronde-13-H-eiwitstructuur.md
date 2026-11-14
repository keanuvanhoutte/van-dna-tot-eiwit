# Verificatie ronde 13 — pakket H: eiwitstructuur

**Datum:** 14-11-2026
**Bereik:** knopen `vouwing`, `primair`, `aminozuren`, `peptide`, `secundair`, `ramachandran`, `tertiair`, `quaternair` — `shared/details/prot.js` (kort, what, how, facts, why, sources; NL + EN) en de scènes `app/scenes/prot/{vouwing,primair,aminozuren,peptide,secundair,ramachandran,tertiair,quaternair}.js` met de hulpbestanden `_a_chem.js`, `_a_draw.js`, `_a_geo.js`, `_a_mol.js`, `part_a.js` (staptitels, stapteksten, labels in de figuur, legend, scale, time, org, extra, simplified, getekende structuurformules). Daarnaast de knoopsamenvattingen in `shared/graph.js` / `graph.en.js` en de stapnamen in `shared/steptags.js` (enkel gelezen, niet aangepast).

## Methode

- **Eerst alles zelf gelezen**, daarna pas de vorige verslagen (ronde 2 en 3, prot-atlas). Die steunden op veel punten op "de cursus" (lesmateriaal); dat is geen publieke bron, dus die conclusies heb ik niet overgenomen.
- **Bronnen echt gelezen** (PubMed-abstract via eutils, volledige tekst via de PMC-BioC-API, Nobellezing als pdf, NobelPrize.org, PDB-101, UniProt REST, RCSB REST, NCBI RefSeq, IUPAC-JCBN, ChEBI, NASA WMAP, Crossref):
  Anfinsen-Nobellezing 1972 (volledig: ribonuclease 124 residuen, 4 S–S, 8 SH, 8 M ureum + mercapto-ethanol, heroxidatie, thermodynamische hypothese, "a few seconds or less"); Zwanzig 1992 (Levinthal; "proteins can fold in seconds or less"); Kubelka 2004 (snelheidslimiet ≈ N/100 µs); Waudby 2019 (volledig: uitgangstunnel, vouwen begint bij de N-terminus vóór de C-terminus klaar is; Hsp70 Ssb aan het ribosoom); Camilloni 2016 (hydrofoob effect = belangrijke drijvende kracht); Ohgushi & Wada 1983 (titel: molten globule = compact met beweeglijke zijketens); Creighton 1997 (rol van de molten globule betwist); Hartl 2011, Mayer & Bukau 2005 (Hsp70 bindt korte hydrofobe stukken), Gestaut 2019 (TRiC: twee ringen, kamer, voorkomt aggregatie); Hollingsworth & Karplus 2010 (volledig: α (−63, −43), β (−120, +130), drie toegestane gebieden, glycine het meest flexibel, 3₁₀ strakker en kort, π zeldzaam); Chen 2010 MolProbity (volledig: doel 98 % "favored"); Lovell 2003 (abstract; bevat het 98 %-getal níét → Chen gebruikt); Stewart 1990 (cis: 0,05 % gewone, 6,5 % X-Pro-bindingen); Cooley 2010 (π-helix = i→i+5, zelden geannoteerd); Richardson 1978 (β-bulge = twee residuen tegenover één; "usual right-handed strand twist"); Leszczynski & Rose 1986 (Ω-lussen compact, bijna altijd aan het oppervlak, vroeger "random coil"); IUPAC-JCBN 3AA-1 (namen, drie- en éénlettercodes, enkel L voor eiwitsynthese, proline = pyrrolidine-2-carbonzuur); Grimsley 2009 (gemiddelde pK in eiwitten: Asp 3,5, Glu 4,2, His 6,6, Lys 10,5); Labunskyy 2014 (Sec op UGA); Longstaff 2007 (Pyl op UAG, methanogene archaea + een bacterie); Ambrogelly 2007 (Sec en Pyl = enige twee toevoegingen); Feige & Hendershot 2011 (disulfidebruggen in het ER, voor eiwitten buiten de cel); Gurjar 2019 (interketen-disulfides in antistoffen); Krishna 2003 (Zn structureel in zinkvingers); Zhang 2018 (volledig: SCOP-klassen all-α, all-β, α/β = βαβ-eenheden, α+β = gescheiden); Hanukoglu 2015 (Rossmann = afwisselend β en α); Bella 2008 (LRR = gebogen solenoïde); Kendrew 1958, Perutz 1960, Silva 1992 (1BBB, R2-toestand, α1β2-grensvlak), PDB-101 MotM 41 (hemoglobine: 2α + 2β, coöperatief, Glu6Val, deoxy-HbS plakt tot vezels, Perutz' structuur = paardenhemoglobine), UniProt P68871 (sequentie, Met verwijderd, Hb S = E→V, α2β2, O₂-transport), RefSeq NM_000518.5 (CDS), ChEBI heme b, Brown 2013 (Fe²⁺ bindt O₂, Fe³⁺ niet), Ingolia 2011 (volledig: "~6 codons per second", muizen-ES-cellen), Trinidad-Calderón 2021 (peptiden 2–50 aminozuren), NobelPrize.org 1958/1962/1972, NASA WMAP (heelal 13,77 miljard jaar), Crossref (Lau & Dill 1989).
- **Eigen metingen** met Python in `data/pdb/1BBB.pdb` en `data/pdb/1UBQ.pdb`: HELIX/SHEET-records; helixas via SVD: stijging 1,48–1,58 Å/residu, 98–102°/residu, 3,52–3,69 residuen/winding, spoed 5,3–5,6 Å, Cα-torsie +49 tot +53° (rechtshandig), O(i)–N(i+4) 2,8–3,1 Å; 3₁₀ 56–59: O(i)–N(i+3) 2,9–3,1 Å; β-strengen 1UBQ: 3,3 Å/residu (3,1–3,5); peptidebinding C–N 1,32 Å, N–Cα 1,47 Å, C=O 1,245 Å, ω gemiddeld |178°|, geen cis-bindingen; Ramachandran 1BBB: 566 residuen, 88 % in het α-venster, 8 % β, 40 Gly (6 met φ > 0), 28 Pro met φ −48° tot −66° (gemiddeld −56°); keten B: kern (meest begraven 25 %) 89 % hydrofoob, oppervlak 28 %; 5 zoutbruggen; Fe–His92 NE2 2,1 Å, His63 aan de CO-kant (4,5 Å van Fe); geen S–S in 1BBB; grensvlak α1β1 17 + 19 residuen, α1β2 8 + 6; afmeting tetrameer ≈ 6,5 nm, keten B ≈ 3,7–4,0 nm; 1BBB-ketens 141/146 residuen.
- **NCBI Bookshelf (Alberts, StatPearls) en PMC-webpagina's** gaven deze ronde een reCAPTCHA; die heb ik niet omzeild. De Bookshelf-bronnen blijven in de lijst (bestaan bevestigd via Europe PMC: StatPearls NBK470235 = PMID 29262225, NBK470269 = 29262204, NBK564343 = 33232013), maar elke uitspraak die ik kon, heb ik aan een gelezen bron of meting gekoppeld.

## Per knoop

### vouwing
- ✅ Sequentie bepaalt de natieve vorm; laagste vrije energie — Anfinsen-Nobellezing ("thermodynamic hypothesis").
- ✅ Ribonuclease A: 124 residuen, 4 S–S-bruggen, 8 × SH, 8 M ureum + β-mercapto-ethanol; vouwt na verwijderen terug en is weer actief — Anfinsen-Nobellezing. Nobelprijs Scheikunde 1972 — NobelPrize.org.
- ✅ Co-translationeel, N-terminus eerst, via de uitgangstunnel — Waudby 2019 (volledige tekst).
- ✅ Hydrofobe collaps / hydrofoob effect als drijvende kracht — Camilloni 2016.
- ✅ Energietrechter, Levinthal-paradox — Dill & Chan 1997; Zwanzig 1992.
- ✅ 3¹⁰⁰ ≈ 5·10⁴⁷; bij 10¹³/s ≈ 10²⁷ jaar (rekenwerk); heelal ≈ 1,4·10¹⁰ jaar — NASA WMAP (13,77 miljard).
- ✅ Snelheid µs tot s — Kubelka 2004 (≈ N/100 µs), Zwanzig 1992 en Anfinsen ("seconds or less").
- ✅ Hsp70 bindt korte hydrofobe stukken — Mayer & Bukau 2005; TRiC = chaperonine met twee ringen en een kamer — Gestaut 2019; aggregatie/ziekte — Hartl 2011.
- ✅ HP-roostermodel (Lau & Dill 1989) — metadata via Crossref; de simulatie zelf is de code van de scène. β-globine 1–40 klopt met UniProt P68871.
- 🔧 Molten globule "met al veel secundaire structuur" → "compacte tussenvorm met nog beweeglijke zijketens" (wat Ohgushi & Wada definiëren); "Er ontstaat" → "Vaak ontstaat", want de rol van de molten globule is betwist (Creighton 1997).
- 🔧 "Levinthal, 1969": jaartal geschrapt (de oorspronkelijke congrestekst is niet te lezen).
- 🔧 Anfinsen-figuur: "stoffen weg (dialyse)" en "+ O₂ (lucht)" → "stoffen weg" en "S–S terug (oxidatie)"; de Nobellezing spreekt van heroxidatie, niet van dialyse of lucht.

### primair
- ✅ Sequentie HBB (147 aa met Met, rijp 146), FASTA-kop letterlijk gelijk aan UniProt; start-Met verwijderd — UniProt P68871.
- ✅ Codons 1–10 = AUG GUG CAU CUG ACU CCU GAG GAG AAG UCU — RefSeq NM_000518.5 (CDS); codon 6 GAG.
- ✅ Sikkelcel Glu6Val (UniProt: Hb S, E→V); GAG → GTG is de enige Val-codon die één letter van GAG verschilt (genetische code).
- ✅ Helices A–H (4–18, 19–34, 35–41, 50–56, 57–76, 85–93, 99–117, 123–143) = HELIX-records van 1BBB keten B.
- ✅ 146 residuen ≈ 50 nm gestrekt (146 × 3,3–3,5 Å; gemeten strengen 3,3 Å/residu).
- ✅ Peptide tot ± 50 residuen — Trinidad-Calderón 2021 ("2–50 amino acids"); het blijft een afspraak.
- 🔧 why: "Sanger toonde dat elk eiwit een eigen vaste sequentie heeft" → "Sanger bepaalde de volledige aminozuurvolgorde van insuline (Nobelprijs 1958)" — NobelPrize.org.

### aminozuren
- ✅ Alle 20 namen, drie- en éénlettercodes (kaarten en `THREE` in kit.js) — IUPAC-JCBN 3AA-1. Nederlandse namen correct.
- ✅ Indeling (hydrofoob GAVLIMFWP, polair STCNQY, + KRH, − DE): een keuze; `simplified` zegt dat handboeken verschillen. Kern/oppervlak bevestigd met meting in 1BBB (kern 89 % hydrofoob, oppervlak 28 %).
- ✅ Lading bij pH 7: Asp/Glu negatief, Lys positief, His deels — Grimsley 2009 (pK 3,5 / 4,2 / 10,5 / 6,6).
- ✅ Enkel L-aminozuren via eiwitsynthese; glycine niet chiraal — IUPAC.
- ✅ Getekende formules: algemene zwitterion (Cα met H, NH₃⁺, COO⁻, R), glycine (R = H), proline (ring N–Cα–Cβ–Cγ–Cδ, H₂N⁺), L- en D-alanine in Fischer-projectie (NH₃⁺ links = L), Cys-oxidatie (+ 2 H⁺ + 2 e⁻), Gly-Ala-condensatie — chemisch juist.
- ✅ Disulfidebruggen vooral in eiwitten die de cel verlaten — Feige & Hendershot 2011.
- ✅ Sec op UGA — Labunskyy 2014; Pyl op UAG in sommige archaea en een bacterie — Longstaff 2007; nr. 21 en 22 — Ambrogelly 2007.
- ❌ `simplified`: "His (pKa ≈ 6)" → "pK in eiwitten gemiddeld ≈ 6,6" — Grimsley 2009.
- 🔧 "proline is cyclisch (imino-zuur)" → "de zijketen vormt een ring met de eigen N" (IUPAC: pyrrolidine-2-carbonzuur; "iminozuur" is een verouderde term).

### peptide
- ✅ Condensatie (water vrij), ribosoom vormt de binding anders (staat in `simplified`).
- ✅ C–N 1,32 Å, N–Cα 1,47 Å, ω ≈ 180° (trans), 6 atomen in één vlak — eigen meting 1UBQ/1BBB.
- ✅ cis zeldzaam, vooral vóór Pro — Stewart 1990 (0,05 % vs 6,5 %).
- ✅ φ = N–Cα, ψ = Cα–C; botsingen beperken φ/ψ — Ramachandran 1963, Hollingsworth 2010.
- ❌ `time` "≈ 5–6 bindingen/s (mens)" → "≈ 6 bindingen/s (zoogdiercel)" — Ingolia 2011 mat "~6 codons per second" in muizencellen, niet in de mens.
- 🔧 "tussen een enkele (≈ 1,47 Å) en een dubbele binding (≈ 1,27 Å)" → "korter dan een enkele binding (N–Cα ≈ 1,47 Å)": de 1,27 Å stond in geen gelezen bron; de rest is gemeten (scène + details).

### secundair
- ✅ α-helix rechtshandig, 3,6 res./winding, 1,5 Å/residu, 5,4 Å/winding, 100°/residu, H-brug C=O(i)···H–N(i+4) — eigen meting 1UBQ en 1BBB.
- ✅ φ/ψ α ≈ (−60, −45), β ≈ (−120, +130) — Hollingsworth 2010.
- ✅ 1UBQ: helix 23–34, 3₁₀ 56–59 (O(i)–N(i+3) gemeten), strengen 1–7, 10–17, 40–45, 48–50, 64–72; β1/β2 antiparallel, β1/β5 parallel; Gly10 in de haarspeld; lussen 18–22 en 51–55 — SHEET/HELIX-records + RCSB (mens, 1,8 Å, Vijay-Kumar 1987).
- ✅ β-bulge = één extra residu; zijketens afwisselend boven/onder — Richardson 1978.
- ✅ Hemoglobine heeft geen β-blad (geen SHEET-records in 1BBB).
- 🔧 3₁₀ "3 res./winding" en π "4,4 res./winding": geen gelezen bron → geschrapt; nu "strakker, meestal kort" (Hollingsworth) en "breder, zelden benoemd" (Cooley) — details én helixpaneel.
- 🔧 β-streng "± 3,5 Å, vaak 5–8 residuen" → "≈ 3,3 Å per residu" (gemeten) en "hier 3 tot 9 residuen".
- 🔧 "rechtshandige twist" → "meestal rechtshandig" (Richardson: "usual right-handed twist").
- 🔧 Lussen "haarspeld min. 4–5 res., vaak Gly/Pro; omega ± 6–16; random coil > 16, ongeordend" → "haarspeld: korte bocht (hier 7–10); omega-lus: Ω-vormig en compact; lange lus: onregelmatig ("random coil")" — Leszczynski & Rose 1986 en eigen records. De getallen kwamen uit de cursus, niet uit een publieke bron.
- 🔧 `time` "helices vormen zich in ~µs" (geen bron) → "geen tijdsas (stilstaande structuur)".

### ramachandran
- ✅ Ingevoerd 1963 — PubMed 13990617. Drie toegestane gebieden voor niet-Gly/niet-Pro; glycine het meest flexibel — Hollingsworth 2010.
- ✅ Goede structuur > 98 % in de voorkeursgebieden — Chen 2010 (Lovell-abstract noemt het getal niet).
- ✅ 1BBB vooral α (gemeten 88 %), 8 % β-venster in lussen; 6 Gly met φ > 0 (gemeten).
- 🔧 Proline "φ rond −65°" → "rond −60°" (details, staptekst, lijn en label): in 1BBB gemeten −48° tot −66°, gemiddeld −56°; −65° stond in geen gelezen bron.

### tertiair
- ✅ β-globine 146 residuen, 8 helices A–H, één domein, all-α; heem in een hydrofobe zak.
- ✅ His92 (F8) bindt Fe (2,1 Å), CO aan de andere kant; His63 (E7) aan de CO-kant — gemeten; F8/E7 volgen uit de helixgrenzen.
- ✅ Fe²⁺ (ferro) bindt O₂ — Brown 2013; heem = ijzer in protoporfyrine — ChEBI.
- ✅ Geen S–S in β-globine (Cys93, Cys112 vrij) — gemeten.
- ✅ Kern 89 % hydrofoob vs oppervlak 28 % ("bijna alleen" klopt); 5 zoutbruggen (scène rekent ze zelf).
- ✅ Zn²⁺ structureel in zinkvingers — Krishna 2003; disulfides in het ER, voor eiwitten buiten de cel — Feige 2011.
- ✅ Klassen all-α, all-β, α/β (βαβ), α+β (gescheiden) — Zhang 2018; Rossmann βαβ — Hanukoglu 2015.
- ❌ `scale` "≈ 5 nm" → "≈ 4 nm" (keten B meet 3,7–4,0 nm).
- 🔧 "His63 (E7) stabiliseert O₂" → "ligt aan de O₂-kant" (1BBB bevat CO; de H-brug naar O₂ stond in geen gelezen bron).
- 🔧 Hoefijzer (LRR) had het klassenlabel "α/β": niet gedekt (LRR's verschillen) → label weggelaten.
- 🔧 "alle polaire groepen in de kern moeten een partner hebben" (te stellig, geen bron) → "waterstofbruggen tussen zijketens onderling en met de backbone".
- 🔧 "myoglobine, de eerste opgeloste eiwitstructuur (1958)" → "eerste 3D-model van myoglobine (Kendrew e.a., 1958)" (extra + facts).

### quaternair
- ✅ HbA = α₂β₂, 4 hemen, O₂-transport, coöperatief (eerste O₂ moeilijk, volgende makkelijker) — UniProt, MotM 41.
- ✅ 1BBB: mens, HbA met CO, R2-toestand, 1,7 Å, Silva, Rogers & Arnone 1992 — RCSB + PubMed.
- ✅ α 141 / β 146 residuen (gemeten in 1BBB); afmeting ≈ 6,5 nm (gemeten 6,6 nm).
- ✅ α1β1 groot (36 residuen in contact), α1β2 kleiner (14) en verandert bij T ↔ R — gemeten; Silva 1992 (α1β2-schakelgebied); MotM (schommelbeweging).
- ✅ Interketen-disulfides in antistoffen — Gurjar 2019; in Hb alles niet-covalent (geen S–S gemeten).
- ✅ HbS Glu6Val, deoxy-HbS plakt tot vezels — MotM 41, UniProt.
- ❌ "Structuur opgelost: Perutz, 1959" → "Perutz e.a., 1960 (paard, 5,5 Å); Nobelprijs 1962" — Perutz 1960 (Nature 185:416), MotM ("horse hemoglobin"), NobelPrize.org.
- 🔧 "α1β1 is groot en stabiel / houdt elk paar stevig samen" → "groot: veel contacten houden α en β samen" (gemeten; "stabiel" niet gedekt).
- 🔧 `time` "assemblage na (of tijdens) de vouwing" (geen bron) → "geen tijdsas (stilstaande structuur)".

### Hulpbestanden
- ✅ `_a_geo.js`: φ/ψ-definities (C(i−1)–N–Cα–C en N–Cα–C–N(i+1)), amide-H op de bissectrice (1,01 Å); `_a_draw.js`, `_a_chem.js`, `_a_mol.js`, `part_a.js`: geen inhoudelijke uitspraken behalve laadteksten — in orde.

## Te verwerken in gedeelde bestanden

- `shared/graph.js` · `(α-helix rond −60/−45, β rond −120/+120)` → `(α-helix rond −60/−45, β rond −120/+130)` — Hollingsworth 2010; zo zegt de scène het ook.
- `shared/graph.en.js` · `(α-helix around −60/−45, β around −120/+120)` → `(α-helix around −60/−45, β around −120/+130)`.
- ~~`shared/graph.js` (knoop `ramachandran`) · `pdb: ['1UBQ']` → `pdb: ['1BBB']`~~ — **ingetrokken.** Het `pdb`-veld voedt de PDB-chip en de knop "Bekijk echt in 3D" (`app/real3d.js`, `localCodes`), niet de Ramachandran-scène. 1UBQ is daar een goede keuze: ubiquitine heeft zowel helices als een β-blad en dus punten in beide gebieden van de plot. Er is geen fout; niets wijzigen.

## Nagekomen: 4 feiten die enkel op Alberts/StatPearls rustten

Deze 4 rustten eerst enkel op Bookshelf-bronnen (captcha). Nu heeft elk een gelezen open bron:
- ✅ **Arg positief bij pH 7** — Fitch e.a. 2015 (abstract): pKa van de guanidiniumgroep 13,8; Arg is "invariably protonated" bij bijna neutrale pH. Bron `FITCH` toegevoegd aan `aminozuren`.
- ✅ **Codes U (Sec) en O (Pyl)** — UniProt Help "Sequences" (gelezen): IUPAC-één-lettercode, "selenocysteine (Sec; U) and pyrrolysine (Pyl; O)". Ook NCBI BLAST-documentatie noemt U = selenocysteïne. Bron `UNIPROT_SEQ` toegevoegd.
- ✅ **His aromatisch (naast Phe, Tyr, Trp)** — Liao e.a. 2013 (abstract): His werkt als "aromatic π-motif" en stapelt met de "aromatic amino acids (Phe, Tyr, Trp)". Bron `LIAO` toegevoegd.
- 🔧 **Definitie domein** — Jakubec e.a. 2018: "distinct units within proteins that typically can fold independently"; Aziz & Caetano-Anollés 2021: domeinen combineren tot multidomeineiwitten (komen dus terug). De tekst was "compact, zelfstandig vouwend deel" en is nu "herkenbaar deel dat meestal zelfstandig kan vouwen en in verschillende eiwitten kan terugkomen" (NL + EN), omdat de bron "typically" zegt. De staptekst in de scène ("een stuk dat op zich kan vouwen en in andere eiwitten terugkomt") was al voorzichtig genoeg. Bronnen `JAKUBEC` en `AZIZ` toegevoegd aan `tertiair`.

Daarmee rust geen enkele uitspraak in dit pakket nog alleen op een niet-gelezen bron.

## Eindoordeel

Ongeveer 274 uitspraken nagekeken. 23 correcties (inclusief de nagekomen domeindefinitie): 4 echte fouten (Perutz-jaartal, His-pK, vertaalsnelheid "mens", schaal van de β-keten) en 18 herschrijvingen. Die gingen vooral over getallen die uit de cursus kwamen en in geen publieke bron te vinden waren (3₁₀/π-windingen, β-streng 5–8, lusgroottes, Pro −65°, C=N 1,27 Å), of over te stellige woorden ("alle polaire groepen", "stabiel", "eerste structuur"). De structuurgegevens (sequentie, codons, helixgrenzen, ketens, residunummers, φ/ψ, geometrie) kloppen exact met UniProt, RefSeq en de PDB-bestanden. Voor de gedeelde bestanden blijven twee punten over (β −120/+130); het pdb-voorstel is ingetrokken. Alle bestanden geven `node --check` OK, en `tools/text-check.html` rendert de acht scènes zonder fouten in de console.
