# Dogma — van DNA tot eiwit

Een interactieve, stap-voor-stap moleculaire animatie van een menselijke cel: van genetische informatie of een signaal dat de cel bereikt, via transcriptie, RNA-bewerking en translatie, tot eiwitvouwing, modificaties en afbraak. Gemaakt als studiehulp op bachelorniveau (structurele bio-informatica). Nederlands en Engels.

**Openen:** https://van-dna-tot-eiwit.web.app (Firebase) · ook op https://keanuvanhoutte.github.io/van-dna-tot-eiwit/

**Online zetten (Firebase):** `firebase deploy --only hosting` (project `van-dna-tot-eiwit`; cursusmateriaal, `tools/` en lokale bestanden worden uitgesloten in `firebase.json`).

## Wat zit erin
- **Twee verhalen** (`app/`), samen 78 scènes. Elke scène speelt stap voor stap; je klikt zelf verder. Klik op onderdelen van een figuur om in te zoomen op een deelproces; met "Waar ben ik?" zie je waar je zit en wissel je van verhaal.
  - **Verhaal 1 · Een virus brengt DNA binnen** (21 hoofdstukken): adenovirus → endocytose → kern → chromatine → transcriptie → RNA-bewerking → translatie → vouwing → afbraak.
  - **Verhaal 2 · Een signaal zet een gen aan** (17 hoofdstukken): groeifactor EGF → EGF-receptor → Ras–MAPK-cascade → het onmiddellijk-vroege gen *FOS* → … → het eiwit c-Fos. Zijpaden: adrenaline → GPCR → cAMP → CREB, en cortisol → glucocorticoïdreceptor.
- **DNA/RNA-atlas** (`atlas/`): 34 soorten nucleïnezuren (A/B/Z-DNA, quadruplexen, tRNA, ribozymen, geneesmiddel–DNA-complexen …) in 3D uit echte PDB-structuren, met filters en vergelijkmodus.
- **Zoeken** (`shared/search.js`, `shared/searchbox.js`): zoekbalk op de startpagina en bovenaan in de app. Kernwoorden (ook met tikfouten of gewone woorden zoals "kanker" of "vaccin") geven een lijst "Bedoel je …?" met waar elk onderdeel in de app ligt; een klik brengt je erheen, met het pad vanaf het hoofdstuk in de bovenbalk. Werkt zonder AI. De verbanden tussen scènes staan in `shared/links.js` — opnieuw maken na het toevoegen van scènes met `node tools/build-links.mjs`.
- **Slimme atlasfilter** (`atlas/smartsearch.js`): typ bv. "mens dubbelstreng", "enkel streng", "triple helix" of een eiwitnaam.
- **Uitleg met bronnen** (`shared/details/`): per onderwerp wat, hoe, kerncijfers, waarom belangrijk en bronnen. Verificatierapporten staan in `docs/`.

## Lokaal draaien
Vereist Python 3.

```
python tools/serve.py 5173
```

Open daarna http://localhost:5173 (of dubbelklik op `Start app.bat` op Windows).

## Techniek
Vanilla JavaScript (ES-modules), SVG-animaties en [3Dmol.js](https://3dmol.csb.pitt.edu/) voor 3D. De PDB-coördinaten in `data/pdb/` komen van de [RCSB Protein Data Bank](https://www.rcsb.org/). Testhulpmiddelen staan in `tools/` (`check.html`, `text-check.html`, `blank-check.html`, `engine-test.html`).
