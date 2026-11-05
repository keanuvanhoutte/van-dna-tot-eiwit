# Verificatieronde 11 — zijpad "Het leven van een RNA" (05-11-2026)

Nagekeken: de vier nieuwe knopen `lokalisatie`, `korrels`, `lncrna` en `riboswitch` (stage `rna`) — graph.js, graph.en.js, shared/details/rna2.js, scènes in app/scenes/rna/ — plus de overgangszinnen van de verhaallijn `rnalot` (app/story.js) en de drie nieuwe klikplekken in `export`, `mrnaafbraak` en `rnastructuur`.
Methode: elke bewering in kort/what/how/facts/why, stapteksten, labels, schaal/duur en `simplified` vergeleken met de bron in `sources` (opgehaald op 05-11-2026: RCSB REST-API, GENCODE-statistiekpagina, volledige teksten van Mattick 2023 (eerste 100 000 tekens) en Protter & Parker 2016, abstracts/samenvattingen van de overige). Structuurgegevens zelf nagemeten in data/pdb/1Y26.pdb (Python, afstand N1/N3 < 3,1 Å voor basenparen, < 3,4 Å voor contacten met het ligand).
⚠️ = alleen door een niet volledig gelezen tekst of een ordegrootte gedekt. 🔧 = correctie tegenover de opdracht of de eerste versie.

## PDB-structuur

| ID | RCSB-titel | Methode | Entiteit / organisme | Gebruik | Nagemeten in het bestand |
|---|---|---|---|---|---|
| 1Y26 | A-riboswitch-adenine complex (Serganov et al., *Chem Biol* 11:1729, 2004, PubMed 15610857) | röntgen 2,1 Å | 1 polymeer: *Vibrio vulnificus* A-riboswitch (keten X, 71 nt, residuen 13–83, in vitro gemaakt); ligand ADE 90 (adenine), 5 Mg²⁺, 94 watermoleculen | `riboswitch` (3D in stap 2–5, lokale kopie, al geregistreerd in shared/pdb.js) | P1 = 13–21/75–83, P2 = 25–31/39–45 (lus L2), P3 = 54–59/67–72 (lus L3); lus–lus-paren G37–C61 (3,04 Å) en G38–C60 (3,01 Å); adenine raakt U22 (2,78), U51 (2,77), **U74 (2,65 Å, Watson–Crick)**, U47, A52, U75, A21 |

## Beweringen per knoop

### lokalisatie — Kislauskis 1994 (J Cell Biol 127:441), Hüttelmaier 2005 (PubMed 16306994), Lionnet 2011 (PMC3076588), Martin & Ephrussi 2009 (PMC2819924), Holt, Martin & Schuman 2019 (doi 10.1038/s41594-019-0263-5)
- ✅ Een adreslabel van 54 nt vlak na het stopcodon in de 3′-UTR van β-actine-mRNA stuurt het naar de voorste rand (lamellae) van fibroblasten van kippenembryo’s; antisense tegen dat label verspreidt het mRNA en verandert lamellipodia en stressvezels — Kislauskis 1994 (abstract en latere samenvattingen).
- ✅ ZBP1 bindt het β-actine-transcript al in de kern en blokkeert de start van de translatie; aan het einde van het transport fosforyleert Src een tyrosine van ZBP1, dat daardoor loslaat en de translatie vrijgeeft — Hüttelmaier 2005 (abstract).
- ✅ RNA-eiwitkorrels worden door motoren langs het cytoskelet naar hun bestemming gebracht — Martin & Ephrussi 2009. In de app: "motoreiwit … langs sporen"; `simplified` meldt dat er ook transport over actinedraden (myosine) bestaat.
- ✅ Muizen met MS2-lussen in de 3′-UTR van beide β-actine-allelen; losse mRNA’s gevolgd in hippocampale zenuwcellen — Lionnet 2011.
- ✅ Lokale translatie in de uitlopers (dendrieten en axonen) van zenuwcellen — Holt, Martin & Schuman 2019 (abstract).
- 🔧 Eerlijk over het model: de app zegt "onderzocht in kippen- en muizencellen" (org-veld, feiten, `simplified`), niet "in menselijke cellen". ZBP1 = kippeneiwit; de menselijke tegenhanger heet IMP1 (IGF2BP1) — ⚠️ naamgeving uit handboek/latere literatuur, niet in de gelezen abstracts.
- 🔧 Getallen voor de reistijd ("minuten tot uren") uit de eerste versie geschrapt: niet in een gelezen bron; nu "vertraagd getoond".

### korrels — Protter & Parker 2016 (PMC4993645, volledige tekst), Hubstenberger 2017 (PubMed 28965817), Courel 2019 (eLife 8:e49708), Li et al. 2013 (PMC3639398)
- ✅ Stressgranules ontstaan uit mRNA’s die in de start van de translatie vastlopen, wanneer die start door stress of medicijnen geremd wordt; ze bevatten startfactoren; G3BP1/2 en het eiwit TIA-1 (met een flexibel, prion-achtig stuk) bevorderen de vorming — Protter & Parker 2016 (letterlijk).
- ✅ Na de stress vallen ze uiteen en keren de mRNA’s terug naar de translatie — Protter & Parker 2016 ("disassembly into translating mRNPs").
- ✅ Fasescheiding: "many RNP granules are liquid–liquid phase separations" — Protter & Parker 2016. 🔧 In de app als "het huidige model … wordt nog onderzocht" (stap 3, `simplified`, uitleg), niet als vaststaand feit.
- ✅ Kleinste granules ≈ 200 nm — Protter & Parker 2016. 🔧 Schaalveld van "0,1–2 µm" naar "kleinste druppels ≈ 0,2 µm".
- ✅ P-bodies en stressgranules kunnen tegen elkaar liggen of overlappen — Protter & Parker 2016 (niet in beeld).
- ✅ Gezuiverde P-bodies (fluorescentie-sortering): de mRNA’s erin zijn onderdrukt maar niet afgebroken — Hubstenberger 2017 (abstract); P-bodies bij de mens vooral betrokken bij bewaren eerder dan afbreken — Courel 2019. 🔧 Stap 6 zegt "Recent onderzoek wijst eerder op bewaren", `simplified`: "niet beslist".
- ✅ Bevat afbraakeiwitten (DCP2, XRN1): klassieke P-body-onderdelen, ook al zo getekend in de bestaande scène `mrnaafbraak` (ronde 5).
- ✅ ALS: TDP-43 en FUS klonteren in de afstervende motorneuronen; hun verband met stressgranules zou verklaren hoe normale granulebiologie in ziekte ontspoort — Li 2013 (abstract); mutaties in RNA-bindende eiwitten (FUS, TDP-43, TIA1 …) — Protter & Parker 2016. 🔧 Neutraal geformuleerd: "Of de druppels die klonters veroorzaken, wordt nog onderzocht" (andere reviews noemen een ‘precursor-’ en een ‘onafhankelijk’ model).
- 🔧 "vaak doordat eIF2α gefosforyleerd wordt" geschrapt uit de uitleg: klopt in de literatuur, maar staat niet in de gelezen tekst van Protter & Parker. Duurveld "minuten" vervangen door "zolang de stress duurt".
- ⚠️ "Hitte" als voorbeeld: Protter & Parker bespreken hitte vooral bij gist; als algemene stressor ook in andere reviews (niet volledig gelezen).

### lncrna — Wang & Chang 2011 (PMC3199020), Mattick et al. 2023 (PMC10213152, volledige tekst gedeeltelijk), GENCODE release 50
- ✅ Vier archetypes signaal, lokaas, gids, steiger — Wang & Chang 2011 (abstract). De app toont er drie (steiger, gids, lokaas); `simplified` meldt dat er andere werkwijzen zijn.
- ✅ Werkdefinitie: niet-coderende transcripten van meer dan 200 nt ("arbitrarily defined"; de auteurs stellen > 500 nt voor) — Mattick 2023.
- ✅ XIST: o.a. afstoten van euchromatische factoren, steiger voor nieuwe heterochromatische factoren en herschikken van de chromosoomstructuur — Mattick 2023. In de app: "bedekt één X en legt het stil" + knop naar `xinact`.
- ✅ NORAD vangt PUMILIO-eiwitten weg (lokaas) — Mattick 2023 ("sequestering Pumilio proteins").
- ✅ Slechts een minderheid heeft een betrouwbare annotatie, en van zeer weinig is het mechanisme bekend — Mattick 2023 (letterlijk). Ook: ">2 000 publicaties met gevalideerde functies, de meeste nog niet in detail gevolgd". 🔧 Geen percentage in de app: het rooster in stap 6 is uitdrukkelijk "schematisch".
- ✅ **GENCODE human release 50: 35 885 lncRNA-genen, 19 442 eiwitcoderende genen** — gencodegenes.org/human/stats.html. 🔧 Mattick 2023 noemt nog "~20 000 lncRNA-loci in GENCODE"; het getal is sindsdien flink gestegen (o.a. door lange-leestechnieken). De app gebruikt het actuele getal en zegt in `simplified` dat het per versie verschuift. "net geen 20 000 eiwitgenen" komt overeen met `genome.js` (gen).
- ✅ Twee mythen vermeden: "niet allemaal rommel, niet allemaal belangrijk" — in lijn met Mattick 2023 (vroege twijfel "transcriptional noise", nu > 2 000 gevalideerde functies, maar mechanisme van de meeste onbekend).
- ⚠️ "Soms telt het afschrijven zelf" (uitleg `how`): gangbaar in de literatuur en in Mattick 2023, maar niet in het gelezen deel letterlijk teruggevonden.

### riboswitch — Serganov 2004 (PubMed 15610857) + RCSB 1Y26, Lemay 2011 (PMC3024265), McCown 2017 (PMC5473149)
- ✅ RCSB 1Y26: "A-riboswitch-adenine complex", röntgen 2,1 Å, *Vibrio vulnificus*, citatie Serganov et al. *Chem Biol* 11:1729–1741 (2004), DOI 10.1016/j.chembiol.2004.11.018 — REST-API. Aptameer van 71 nt (SEQRES), synthetisch aangemaakt (SOURCE-veld: "engineered", in het lab gemaakt) — vandaar "het RNA werd in het lab gemaakt" in `simplified`.
- ✅ Drieweg-kruispunt met twee armen waarvan de lussen paren; adenine volledig ingesloten en herkend door paring met U74; de guanine-schakelaar heeft daar C74 — Serganov 2004 (samengevat in atlas/entries.js) + zelf nagemeten (zie tabel).
- ✅ De add-schakelaar van *V. vulnificus* werkt op de translatie: zonder adenine sluit een haarspeld de Shine-Dalgarno-volgorde en het AUG af; adeninebinding maakt ze vrij (AAN-schakelaar). De *B. subtilis* pbuE-schakelaar werkt op de transcriptie — Lemay 2011 (abstract). Latere studies: ook het 30S-ribosoom is nodig om om te schakelen; staat in `simplified`.
- ✅ Riboswitches vooral bij bacteriën; enkel de TPP-klasse is bij eukaryoten gevonden (planten, schimmels, algen); geen riboswitch bekend bij dieren/de mens — McCown 2017 (overzicht van alle gevalideerde klassen en hun verspreiding) en Nguyen et al. 2016 (*J Phycol*, niet in `sources`). 🔧 De app zegt "bij de mens is er nog geen gevonden" en `simplified` dat er nog ontdekt kunnen worden — geen "bestaan niet".
- ⚠️ "Mogelijk doelwit voor nieuwe antibiotica" (`why`): staat in de atlas-tekst en in reviews; in McCown 2017 niet letterlijk nagelezen.
- ✅ 2D-principe (stap 0–1) is een schema: "ruim honderd letters" voor de volledige schakelaar is een ordegrootte (aptameer 71 nt + schakeldeel) ⚠️.

## Overgangszinnen (app/story.js, `rnalot`)
Alle zinnen beschrijven de volgorde van de scènes zonder nieuwe feiten. "Elk mRNA wordt uiteindelijk afgebroken" en "Een fout mRNA wordt extra snel opgeruimd" volgen de bestaande, nagekeken scènes `mrnaafbraak` en `nmd`.

## Woordgebruik, overeenkomstig bestaande scènes
`adreslabel` (kernimport, sortering, mito), `motoreiwit … langs sporen` (adeno), `kapje`/`staart` (export, mrnaafbraak), `druppels zonder membraan` (mrnaafbraak, nucleolus, ribogenese), `landingsplaats` (bmrna), `afbraakeiwitten` (mrnaafbraak), `lang RNA` (xinact). 🔧 De opdracht stelde "druppels zonder vlies" voor; de bestaande scènes zeggen "zonder membraan", dus dat werd gekozen. Vaktermen (zipcode, UTR, stressgranule, P-body, lncRNA, aptameer) staan alleen in de uitleg; uitzondering: de bestaande scène `mrnaafbraak` noemt "P-bodies" al in haar ondertitel.
Spanning met bestaande inhoud: `mrnaafbraak` (stap 6) heet "Afbraakdruppels"; dat klopt (er zitten afbraakeiwitten in), maar de nieuwe scène `korrels` nuanceert dat P-bodies mogelijk vooral bewaren. Niet aangepast (nagekeken scène); wel een klikplek van die stap naar `korrels`.

## Status
De vier knopen zijn na deze ronde aan `CHECKED` in `shared/graph.js` toegevoegd (status "nagekeken").
Niet nagekeken: de volledige teksten van Kislauskis 1994, Hüttelmaier 2005, Holt 2019 en Wang & Chang 2011 (alleen abstracts/samenvattingen); het slepen/draaien van het 3D-venster op een echt toestel.
