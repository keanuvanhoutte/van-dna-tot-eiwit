# Fixlijst
- [x] Niet alles is mooi in beeld: delen van figuren en tekst vallen buiten het scherm (bv. nucleolus) | pagina: alle scènes | verwacht: in elke stap valt alle tekst en elke relevante figuur volledig binnen het beeld, op pc en gsm
- [x] Een structuur licht op als je erover gaat, maar is niet altijd klikbaar | pagina: alle scènes | verwacht: alles wat oplicht is klikbaar en opent die structuur in detail (scène of uitlegkaart)
- [x] Overzichtsscènes (bv. de cel) spelen een verhaal met inzoomen; dat stoort | pagina: /app/index.html?scene=cel (en andere overzichten) | verwacht: een overzicht toont het hele beeld met een korte uitleg, zonder inzoomen tijdens de animatie; verhaalanimaties enkel in de detailscènes
- [x] De startpagina maakt onderscheid tussen verhaal 1 en verhaal 2, terwijl beide in hetzelfde hoofdmenu (de cel) uitkomen | pagina: / | verwacht: één ingang; de keuze (virus, signaalmolecule, …) maak je in de cel zelf
- [x] Het signaalverhaal brengt je naar een andere, "verse" cel | pagina: /app/index.html?scene=signaal | verwacht: vanuit de cel zoom je in op het membraan van diezelfde cel, zonder een nieuwe cel te tekenen
- [x] De overgang tussen twee animaties is abrupt | pagina: alle scène-overgangen | verwacht: een veel vloeiendere overgang: inzoomen op het aangeklikte onderdeel en zacht overvloeien naar de volgende animatie
- [x] De uitleg is te diepgaand; zonder voorkennis van elk domein is het verhaal moeilijk te volgen | pagina: ondertitels + uitlegpaneel | verwacht: ondertitels in eenvoudige taal; het uitlegpaneel begint met een korte, toegankelijke samenvatting; de diepgang blijft beschikbaar maar staat niet meer standaard open
- [x] De afspeelbediening is niet intuïtief (9 knoppen voor stap/hoofdstuk, ⏸ en Auto overlappen, tijdlijn zonder namen) | pagina: alle scènes (onderstrook + bovenbalk) | verwacht: voorstel B "videospeler": ▶/⏸ = vanzelf verder / blijf bij deze stap (stap herhaalt); tijdlijn in benoemde stukken (één per stap, klikbaar); ‹ › voor vorige/volgende stap; hoofdstukken enkel bovenaan, met de namen van vorig/volgend hoofdstuk; op de laatste stap wordt de verder-knop "Volgend hoofdstuk: …"; snelheid in een ⚙-menu; aparte Auto-knop weg
- [x] Ondertitels zijn nog te moeilijk (te veel vaknamen tegelijk) | pagina: alle scènes | verwacht: per stap één korte zin in gewone taal (hooguit ~2 korte zinnen), hooguit één nieuwe vakterm en die meteen uitgelegd; titels zeggen wat er gebeurt ("Het DNA gaat open"), geen vaknaam ("Promoter escape"); niveau zoals de voorbeelden in https://claude.ai/artifact/1vnDw5ToRHCEoRj17g71cv; NL en EN
- [x] Uitlegpaneel nog te moeilijk | pagina: uitlegpaneel (alle knopen) | verwacht: "In het kort" = 2–3 eenvoudige zinnen; vaktermen in het kort-blok onderlijnd en aantikbaar voor een uitleg van één zin; de diepere inhoud blijft beschikbaar onder een dichtgeklapte laag "Voor wie meer wil"

## Fix-ronde 04-11-2026 — bacterie-route op de standaard van de rest van de app
- [x] Te kleine tekst in bacteriescènes (tools/text-check: 36 teksten < 13 px op 1000 px; mens: 0) | pagina: bgen st. 3 en 8, btrp, bterm, bmrna, breplicatie st. 3 | verwacht: text-check meldt 0 kleine teksten voor alle bacteriescènes — **na: 0 (was 36)**
- [x] Kaders en tekst half buiten beeld (tools/clip-check) | pagina: bgen st. 2, 4, 5, 6; bmrna st. 3, 4 | verwacht: clip-check meldt niets voor de bacteriescènes — **na: 0 (was 26); totaal app 91 → 65, de rest zijn menselijke scènes**
- [x] Bijna lege of plots donkere beelden bij een stapovergang (tools/blank-check) | pagina: bmrna st. 5 en 6, btrp st. 3, breplicatie st. 1–2, bgen st. 3, bterm st. 4 | verwacht: blank-check meldt niets voor de bacteriescènes (geen zwarte schermen) — **na: 0 meldingen (was 11); overige 7 zijn menselijke scènes**
- [x] Wetenschappelijke correcties uit verificatieronde 6 nog niet zelf nagekeken | pagina: alle bacteriescènes + uitlegpaneel | verwacht: tweede, onafhankelijke controle bevestigt dat alle 23 punten juist verwerkt zijn — **na: 23/23 bevestigd; 3 restpunten (bterm.kort, bron Rho, lidwoord) ook opgelost**

## Fix-ronde 05-11-2026 — zijpad replicatie en herstel (tak 1)
- [x] Startpagina noemt nog "Fase 2" terwijl de zijpaden (fase 3) online komen | pagina: / | verwacht: fase-label klopt — **na: "Fase 3 · zijpaden in opbouw" / "Phase 3 · side paths in progress"**
- [x] Nieuwe scènes nagekeken op pc en gsm (375 px), NL en EN: origins, mmr, ber, ner, dsb, p53, herstel | verwacht: geen console-fouten, 3D laadt, startpagina en kaart tonen het zijpad — **na: 0 console-fouten; check.html 96·96·96, PROBLEMS (0)**
- [~] Op een gsm zijn 2D-scènes met cam: FULL (herstel, ner, dsb) klein — dat geldt app-breed voor overzichtsbeelden zonder inzoom-camera, geen fout van dit zijpad; kandidaat voor de latere aanpassingen aan doorloop/weergave

## Fix-ronde 05-11-2026 — 3D-aanvulling tak 1 + zijpad eiwitlot (tak 2)
- [x] Tak 1 te weinig 3D | pagina: replisoom, telomeren, ner, dsb | verwacht: echte menselijke structuren — **na: 3D-stappen met 7PFO, 7QXA, 6RO4, 1JEY, 8BQ2; tak 1 nu 9/12 scènes met 3D**
- [x] Zijpad eiwitlot gebouwd en nagekeken (pc + 375 px, NL + EN) | verwacht: check/text/clip/blank 0 — **na: check 103·103·103 PROBLEMS (0), text 0, clip 0, blank 0, 0 console-fouten; verificatieronde 8: 11 correcties**
- [~] Drie uitspraken niet met een bron in één stuk bevestigd (geen label = cytosol; kernlabel kan overal liggen; blaasjes behouden de oriëntatie) — standaard handboekkennis, gemarkeerd ⚠️ in docs/verificatie-ronde-8-eiwittargeting.md

## Fix-ronde 05-11-2026 — zijpad epigenetica (tak 3)
- [x] Woordkeuze botste: de genregulatie-scène noemt de enhancer "versterker" en de activator "schakelaar-eiwit", de nieuwe scènes noemden de enhancer "schakelaar" | pagina: enhancer, imprinting, lussen | verwacht: overal dezelfde term — **na: "versterker" in enhancer.js, imprinting.js, lussen.js, genome3.js, story.js; 0 keer "schakelaar" voor de enhancer**
- [x] Nieuwe scènes nagekeken | verwacht: check/text/clip/blank 0, geen console-fouten — **na: check 108·108·108 PROBLEMS (0); 0 console-fouten; verificatieronde 9 (o.a. ≈100 ingeprente genen, ≈15 % + 10 % variabel ontsnapt aan X-inactivatie)**
- [~] Twee handboekfeiten (X-inactivatie rond innesteling, Barr-lichaampje = inactieve X) niet met een gelezen bron bevestigd — gemarkeerd ⚠️ in docs/verificatie-ronde-9-epigenetica.md

## Fix-ronde 05-11-2026 — zijpad virussen (tak 4)
- [x] Console-fout "circle r: negative value (-12.1)" in viruskopie/assemblage: blaasje met binnenrand r − 13 terwijl het blaasje nog groeit | verwacht: geen console-fouten — **na: binnenrand begrensd op ≥ 0 (_corona.js); alle stappen van beide scènes doorgerekend (21 tijdstippen per stap): 0 negatieve stralen**
- [x] Nieuwe scènes nagekeken | verwacht: check/text/clip/blank 0 — **na: check 114·114·114 PROBLEMS (0); verificatieronde 10 (o.a. twee binnenkomstroutes, spacer 32 nt, geen burst size zonder bron)**
