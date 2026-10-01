# Scènecontract (engine v2)

Elke knoop uit `shared/graph.js` krijgt één scène. Een scène is een ES-module in
`app/scenes/<stage>/<knoop-id>.js` met een **default export** van dit object:

```js
import { C, L, T2, svgOpen, pill, txt, mono, nt, aa, cam, FULL, sub, ease, lerp, clamp } from '../../kit.js';

export default {
  id: 'transcriptie',                       // = knoop-id uit shared/graph.js (verplicht)
  title: { nl: 'Transcriptie', en: 'Transcription' },
  scale: '≈ 25 nm',                         // string of {nl,en}
  time: { nl: '≈ 30 nt/s (vertraagd)', en: '≈ 30 nt/s (slowed down)' },
  org: { nl: 'mens', en: 'human' },         // voor welk organisme geldt de scène
  legend: [[C.dna, { nl: 'coderende streng', en: 'coding strand' }], ...],
  simplified: { nl: '…', en: '…' },         // "Wat is hier vereenvoudigd?" (verplicht, eerlijk)
  steps: [                                  // verplicht, ≥ 1; de engine toont titel + tekst als ondertitel
    { dur: 6000, title: {nl,en}, text: {nl,en}, cam: cam(800, 450, 900) },   // cam = [x,y,w,h] in scènecoördinaten (optioneel)
    ...
  ],
  loop: false,                              // wordt genegeerd: de engine speelt stap voor stap (zie hieronder)
  svg() { return svgOpen() + `…` + '</svg>'; },  // viewBox 0 0 1600 900
  init(svg, api) {                          // optioneel
    // api.lang, api.L
    return {
      update(t, s) { /* t = ms sinds start scène; s = { step, p (0..1 in stap), t, total } */ },
      destroy() {},
    };
  },
};
```

## Regels
1. **Geen eigen requestAnimationFrame of timers.** Alle beweging is een functie van `(t, s)` die de engine
   aanlevert. Zo werken pauze, snelheid, stap vooruit/achteruit en herstarten altijd. (SMIL `<animate>` voor
   achtergrondbeweging mag.)
2. **Deterministisch**: dezelfde `t` geeft altijd hetzelfde beeld (geen `Math.random()` in `update`; gebruik `rng(seed)` uit de kit).
3. **Stappen = het verhaal.** Elke stap verklaart één ding (titel ≤ 60 tekens, tekst 1–2 zinnen). Duur 4–9 s per stap.
   Zoom met `cam` in op wat er in die stap gebeurt (de engine beweegt de camera vloeiend). Liever te groot dan te klein:
   tekst in beeld minstens 13 px bij volle weergave, belangrijke letters (basen, codons) groter.
4. **Klikbare onderdelen** (hotspots): `data-node="<knoop-id>"` (moet bestaan in `shared/graph.js`), `data-label="${L({nl,en})}"`,
   `data-color`. Optioneel `data-anchor="<id>"` op een klein element om het label te plaatsen, `data-pos="below"`,
   `data-nolabel` (klikbaar zonder label), `data-href="../atlas/index.html?id=…"` voor de nucleïnezuren-atlas.
   Link bij voorkeur naar knopen uit `in`, `next` en `rel` van de eigen knoop, zodat het verhaal doorloopt.
5. **Tweetalig**: alle zichtbare tekst via `L({ nl, en })` of `T2(nl, en)`.
6. **Kleurcodes** uit `C` en `BASE` (DNA blauw, RNA oranje, tRNA geel, ribosoom turquoise, eiwit paars, keten groen, vreemd DNA roze).
7. **Wetenschappelijk correct.** Richting 5'→3', antiparallelle strengen, volgorde van stappen, juiste namen. Getallen alleen als ze
   kloppen (bronnen: NCBI Bookshelf/Alberts, PubMed, RCSB PDB). Vermeld vereenvoudigingen in `simplified`.
8. Een knoop mag een **alias** zijn van een deel van een andere scène:
   `export default { id: 'capping', alias: 'rnaprocessing', from: 0, to: 0, title: … }` (stappen `from..to` van die scène,
   met eigen titel en uitleg). Gebruik dit alleen als die scène het proces echt al groot en duidelijk toont.
9. **3D-scènes** voor structuren: gebruik `structure3d()` uit `app/kit3d.js` (echte PDB-coördinaten, stappen die onderdelen
   uitlichten). Controleer elke PDB-ID via `https://data.rcsb.org/rest/v1/core/entry/<ID>` (titel moet kloppen).

## Registreren
Elke stagemap heeft `app/scenes/<stage>/index.js` die de scènes van die map exporteert:
```js
import transcriptie from './transcriptie.js';
export default [transcriptie, …];
```

## Testen
Server: `http://localhost:5173` (moet draaien). Directe link: `app/index.html?scene=<id>&lang=nl`.
Bevroren beeld: `&t=<ms>&freeze=1`. Schermafbeelding zonder het browserpaneel te storen:
```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --hide-scrollbars --window-size=1600,900 --virtual-time-budget=4000 --screenshot="C:\\pad\\shot.png" "http://localhost:5173/app/index.html?scene=<id>&lang=nl&t=5000&freeze=1"
```
Controleer: geen console-fouten, tekst leesbaar, labels overlappen niet, stappen kloppen inhoudelijk.

## Uitleg per knoop (`shared/details/<stage>.js`)
```js
export default {
  transcriptie: {
    nl: { what: '…2–4 zinnen…', how: ['stap 1', 'stap 2', …], facts: [['Snelheid', '≈ 30 nt/s'], …], why: '…waarom belangrijk / link met het grotere verhaal…' },
    en: { what: '…', how: [...], facts: [...], why: '…' },
    sources: [{ t: 'Alberts et al., Molecular Biology of the Cell (NCBI Bookshelf)', url: 'https://www.ncbi.nlm.nih.gov/books/…' }, …],
  },
};
```
Bachelorniveau (cursus BIT 03 Structural bioinformatics, Howest). Elke bewering moet door een bron gedekt zijn.


## Afspelen: automatisch verder (standaard) of zelf klikken
Elke stap speelt één keer en blijft dan op zijn eindbeeld staan.
- **Auto aan (standaard):** na een leestijd (≈ 1,8 s + 55 ms per teken van titel + ondertitel, 4–12 s, korter bij hogere snelheid) vloeit de
  engine vanzelf over naar de volgende stap; na de laatste stap van een hoofdstuk (+ 2,5 s) naar het volgende hoofdstuk van de verhaallijn.
  Zijpaden en het einde van een verhaal herhalen rustig. De knop "Volgende stap →" loopt vol tijdens de leespauze.
- **Auto uit (knop "Auto" of toets A):** de stap herhaalt zich tot de gebruiker verder klikt. ⏸ / spatie zet altijd alles stil.
Daarom:
- Het eindbeeld van een stap moet een zinvol, volledig beeld zijn (niets half ingefade).
- Het eindbeeld van stap i en het beginbeeld van stap i+1 moeten op elkaar aansluiten (geen sprong).
- Het beginbeeld van stap 0 mag niet leeg zijn: de engine tekent het al tijdens de zoomovergang.
- Klikt de gebruiker midden in een stap op 'volgende' of op 'vorige', dan spoelt de engine zichtbaar (~0,65 s) naar het doel.
