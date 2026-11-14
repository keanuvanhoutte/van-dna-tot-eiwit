/* Pagina "Over de app" (docs/over.html) — tweetalig, tabbladen, gegevens rechtstreeks uit de app zelf:
 * aantallen, inhoudskaart, alle bronnen en alle 3D-structuren worden bij het laden opgebouwd uit dezelfde bestanden
 * die de app gebruikt, zodat deze pagina nooit achterloopt op de inhoud. */
import { NODES, STAGES, SCALES } from '../shared/graph.js';
import { S_EN, SCALES_EN } from '../shared/graph.en.js';
import { DETAILS } from '../shared/details/index.js';
import { LINES, MAIN_KEYS, SIDE_KEYS } from '../app/story.js';
import { ENTRIES } from '../atlas/entries.js';
import { LOCAL } from '../shared/pdb.js';
import { LINKS } from '../shared/links.js';
import { L, lang, langSwitch } from '../shared/i18n.js';
import { makeSearch } from '../shared/search.js';
import { mountMap } from '../shared/contentmap.js';
import { VERIF } from './over-data.js';

const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const en = lang === 'en';
const tt = n => (en ? n.en : n.t);
const APP = id => `../app/index.html?scene=${id}`;
const GH = 'https://github.com/keanuvanhoutte/van-dna-tot-eiwit/blob/main/docs/';
const REPORTS = {
  1: ['verificatie-ronde-1.md'], 2: ['verificatie-ronde-2-entry-genome-repl.md', 'verificatie-ronde-2-txn-rna-tl.md', 'verificatie-ronde-2-prot-atlas.md'],
  3: ['verificatie-ronde-3-entry-genome-repl.md', 'verificatie-ronde-3-txn-rna-tl.md', 'verificatie-ronde-3-prot-atlas.md'],
  4: ['verificatie-ronde-4-signaal-cascade.md', 'verificatie-ronde-4-signaal-overzicht.md'],
  5: ['verificatie-ronde-5-entry-signaal-genoom.md', 'verificatie-ronde-5-repl-txn-rna.md', 'verificatie-ronde-5-translatie-eiwit.md'],
  6: ['verificatie-ronde-6-bacterie.md'], 7: ['verificatie-ronde-7-replicatie-herstel.md'], 8: ['verificatie-ronde-8-eiwittargeting.md'],
  9: ['verificatie-ronde-9-epigenetica.md'], 10: ['verificatie-ronde-10-virussen.md'], 11: ['verificatie-ronde-11-rna-lot.md'], 12: ['verificatie-ronde-12-antibiotica.md'],
};

/* ---------- gegevens uit de app ---------- */
const nodeIds = Object.keys(NODES);
const lineCount = MAIN_KEYS.length + SIDE_KEYS.length;
const pdbSet = new Set();
for (const n of Object.values(NODES)) for (const p of n.pdb ?? []) pdbSet.add(p.toUpperCase());
for (const e of ENTRIES) if (e.pdb) pdbSet.add(String(e.pdb).toUpperCase());
for (const f of LOCAL) pdbSet.add(f.split('.')[0].toUpperCase());

/* alle bronnen: uitlegpanelen (per knoop) + 3D-bibliotheek (per item), ontdubbeld op adres */
const SRC = new Map();
const addSrc = (s, use) => {
  const url = s.url ?? '', t = String(L(s.t ?? s.label ?? url) ?? url);   // sommige labels zijn tweetalig ({nl, en})
  const k = url || t;
  if (!SRC.has(k)) SRC.set(k, { t, url, use: [] });
  const r = SRC.get(k); if (!r.use.some(u => u.href === use.href)) r.use.push(use);
};
for (const [id, d] of Object.entries(DETAILS)) for (const s of d.sources ?? []) if (NODES[id]) addSrc(s, { href: APP(id), label: tt(NODES[id]) });
for (const e of ENTRIES) for (const s of e.src ?? []) addSrc(s, { href: `../atlas/index.html?id=${e.id}`, label: '3D · ' + L(e.name) });
const kindOf = s => {
  const u = s.url.toLowerCase();
  if (/ncbi\.nlm\.nih\.gov\/books|book\.bionumbers/.test(u)) return 'book';
  if (/rcsb\.org|wwpdb|pdbe/.test(u)) return 'pdb';
  if (/uniprot|ensembl|gencode|ictv|viralzone|bionumbers\.hms|globin\.bx|hivinfo|rfam|ebi\.ac\.uk/.test(u)) return 'db';
  return 'paper';
};
const SOURCES = [...SRC.values()].map(s => ({ ...s, kind: kindOf(s) })).sort((a, b) => a.t.localeCompare(b.t));
const nKind = k => SOURCES.filter(s => s.kind === k).length;

/* ---------- teksten ---------- */
const T = {
  title: { nl: 'Dogma · Over de app', en: 'Dogma · About the app' },
  navHome: { nl: '← Startpagina', en: '← Home' }, navAtlas: { nl: '3D-bibliotheek', en: '3D library' },
  eyebrow: { nl: 'Over de app', en: 'About the app' },
  h1: { nl: 'Hoe Dogma werkt, en waarom je de inhoud kan vertrouwen', en: 'How Dogma works, and why you can trust its content' },
  lead: { nl: 'Dogma toont in korte, klikbare animaties hoe een cel van DNA tot eiwit komt: van de hele cel tot op de atomen, bij de mens en bij een bacterie. Deze pagina legt uit hoe je je weg vindt, wat erin zit, en hoe elke uitspraak gecontroleerd werd tegen wetenschappelijke bronnen.',
    en: 'Dogma shows in short, clickable animations how a cell gets from DNA to protein: from the whole cell down to the atoms, in humans and in a bacterium. This page explains how to find your way, what is in it, and how every statement was checked against scientific sources.' },
  sTopics: { nl: 'onderwerpen, elk met een animatie', en: 'topics, each with an animation' },
  sLines: { nl: 'verhalen en zijpaden', en: 'stories and side paths' },
  sSrc: { nl: 'verschillende bronnen', en: 'distinct sources' },
  sPdb: { nl: 'echte 3D-structuren (PDB)', en: 'real 3D structures (PDB)' },
  sRounds: { nl: 'controlerondes', en: 'verification rounds' },
  tabs: {
    about: { nl: 'Wat is Dogma?', en: 'What is Dogma?' }, nav: { nl: 'Zo navigeer je', en: 'How to navigate' }, map: { nl: 'Inhoudskaart', en: 'Content map' },
    sci: { nl: 'Wetenschappelijke borging', en: 'Scientific quality' }, src: { nl: 'Alle bronnen', en: 'All sources' }, look: { nl: 'Kleuren & beeld', en: 'Colours & visuals' },
  },
};

/* ---------- tab 1: wat is Dogma ---------- */
function tabAbout() {
  const lineItem = k => `<li><a href="../app/index.html?scene=${LINES[k].chapters[0].id}&story=${k}">${esc(L(LINES[k].title))}</a> <small>· ${LINES[k].chapters.length} ${en ? 'chapters' : 'hoofdstukken'}</small></li>`;
  return `
  <h2>${esc(L({ nl: 'Wat is Dogma?', en: 'What is Dogma?' }))}</h2>
  <p class="sub">${esc(L({ nl: 'De naam verwijst naar het centrale dogma van de biologie: informatie gaat van DNA naar RNA naar eiwit. Dogma maakt die weg zichtbaar als één samenhangend verhaal, waarin je op elk onderdeel kan klikken om dieper te gaan.', en: 'The name refers to the central dogma of biology: information flows from DNA to RNA to protein. Dogma makes that path visible as one connected story, in which you can click any part to go deeper.' }))}</p>
  <div class="grid">
    <div class="card"><h4><span class="ic">🎓</span>${esc(L({ nl: 'Voor wie?', en: 'Who is it for?' }))}</h4><p>${esc(L({ nl: 'Leerlingen in het secundair onderwijs (wetenschappelijke richtingen) en beginnende bachelorstudenten in biologie, biomedische wetenschappen, bio-informatica en verwante richtingen. Voorkennis is niet nodig: elke animatie begint eenvoudig.', en: 'Secondary-school pupils (science tracks) and first-year bachelor students in biology, biomedical sciences, bioinformatics and related fields. No prior knowledge is needed: every animation starts simple.' }))}</p></div>
    <div class="card"><h4><span class="ic">🧩</span>${esc(L({ nl: 'Twee lagen uitleg', en: 'Two layers of explanation' }))}</h4><p>${esc(L({ nl: 'Elke stap heeft één korte zin in gewone taal, met hooguit één nieuw vakwoord dat meteen uitgelegd wordt. Wie meer wil, opent in het uitlegpaneel de laag "Voor wie meer wil": met vaktermen, kerncijfers en bronnen.', en: 'Each step has one short sentence in plain language, with at most one new technical term that is explained right away. Those who want more open the layer "Want to know more?" in the explanation panel: with technical terms, key numbers and sources.' }))}</p></div>
    <div class="card"><h4><span class="ic">🔬</span>${esc(L({ nl: 'Echte structuren', en: 'Real structures' }))}</h4><p>${esc(L({ nl: 'Zodra je tot op molecuulniveau inzoomt, toont Dogma geen tekening meer maar echte, gemeten 3D-structuren uit de Protein Data Bank (PDB).', en: 'Once you zoom in to the molecular level, Dogma no longer shows a drawing but real, measured 3D structures from the Protein Data Bank (PDB).' }))}</p></div>
    <div class="card"><h4><span class="ic">🦠</span>${esc(L({ nl: 'Mens én bacterie', en: 'Human and bacterium' }))}</h4><p>${esc(L({ nl: 'Het hoofdverhaal speelt in een menselijke cel. Een tweede verhaal volgt dezelfde weg in de bacterie E. coli, en een schakelaar springt tussen de twee waar er een echte tegenhanger is.', en: 'The main story takes place in a human cell. A second story follows the same path in the bacterium E. coli, and a switch jumps between the two wherever there is a real counterpart.' }))}</p></div>
    <div class="card"><h4><span class="ic">🌐</span>${esc(L({ nl: 'Nederlands en Engels', en: 'Dutch and English' }))}</h4><p>${esc(L({ nl: 'Alles bestaat in beide talen. Kies je Engels, dan is ook alles Engels (geen gemengde teksten).', en: 'Everything exists in both languages. If you choose English, everything is in English (no mixed texts).' }))}</p></div>
    <div class="card"><h4><span class="ic">⚖️</span>${esc(L({ nl: 'Wat Dogma níet is', en: 'What Dogma is not' }))}</h4><p>${esc(L({ nl: 'Geen vervanging van een handboek of les. Animaties zijn schematisch: groottes, aantallen en snelheden zijn aangepast om iets zichtbaar te maken. Elke animatie zegt daarom zelf wat er vereenvoudigd is.', en: 'Not a replacement for a textbook or a lesson. Animations are schematic: sizes, numbers and speeds are adjusted to make something visible. That is why every animation states what has been simplified.' }))}</p></div>
  </div>

  <h3>${esc(L({ nl: 'Wat zit erin?', en: 'What is inside?' }))}</h3>
  <div class="grid">
    <div class="card"><h4>${esc(L({ nl: 'Hoofdverhalen', en: 'Main stories' }))}</h4><ul>${MAIN_KEYS.map(lineItem).join('')}</ul></div>
    <div class="card"><h4>${esc(L({ nl: 'Zijpaden', en: 'Side paths' }))}</h4><ul>${SIDE_KEYS.map(lineItem).join('')}</ul></div>
    <div class="card"><h4>${esc(L({ nl: '3D-bibliotheek', en: '3D library' }))}</h4><p>${esc(L({ nl: `${ENTRIES.length} uitgekozen vormen van DNA, RNA en eiwitcomplexen in echte 3D, met uitleg per onderdeel. Je kan er ook zelf elk eiwit of gen opzoeken in de volledige PDB.`, en: `${ENTRIES.length} selected forms of DNA, RNA and protein complexes in real 3D, with an explanation per part. You can also look up any protein or gene in the full PDB yourself.` }))}</p><p><a href="../atlas/index.html">${esc(L({ nl: 'Open de 3D-bibliotheek →', en: 'Open the 3D library →' }))}</a></p></div>
  </div>

  <h3>${esc(L({ nl: 'Hoe werkt de app achter de schermen?', en: 'How does the app work behind the scenes?' }))}</h3>
  <details class="acc"><summary>${esc(L({ nl: 'In gewone taal uitgelegd', en: 'Explained in plain language' }))} <small>${esc(L({ nl: 'voor wie wil weten hoe het gebouwd is', en: 'for those who want to know how it is built' }))}</small></summary><div class="in"><ul>
    <li>${L({ nl: '<b>Een website, niets te installeren.</b> Dogma draait volledig in de browser van de gebruiker. Er is geen account, er worden geen gegevens verzameld en er is geen volgsoftware. Enkel je taalkeuze en enkele weergavekeuzes worden in je eigen browser onthouden.', en: '<b>A website, nothing to install.</b> Dogma runs entirely in the user’s browser. There is no account, no data is collected and there is no tracking software. Only your language choice and a few display choices are remembered in your own browser.' })}</li>
    <li>${L({ nl: '<b>Eén kennisnetwerk.</b> Alle onderwerpen staan in één lijst, met per onderwerp waar je kan inzoomen, wat erna komt en wat ermee samenhangt. Daaruit worden de verhalen, de inhoudskaart, het zoeken en deze pagina opgebouwd.', en: '<b>One knowledge network.</b> All topics are in one list, with for each topic where you can zoom in, what comes next and what it connects to. The stories, the content map, the search and this page are built from it.' })}</li>
    <li>${L({ nl: '<b>Animaties als stappen.</b> Elke animatie bestaat uit korte stappen. Een stap toont één ding; je kan pauzeren, herhalen, terugspoelen en de snelheid kiezen.', en: '<b>Animations as steps.</b> Each animation consists of short steps. A step shows one thing; you can pause, repeat, rewind and choose the speed.' })}</li>
    <li>${L({ nl: '<b>3D uit echte metingen.</b> De 3D-figuren worden getekend met de open-source viewer 3Dmol.js (Rego &amp; Koes 2015) uit atoomcoördinaten van de PDB. Een kopie van die bestanden staat bij de app zelf, zodat ze snel laden. Erg grote complexen zijn ingekort tot één bolletje per bouwsteen; dat staat dan in de figuur vermeld.', en: '<b>3D from real measurements.</b> The 3D figures are drawn with the open-source viewer 3Dmol.js (Rego &amp; Koes 2015) from PDB atomic coordinates. A copy of those files is stored with the app so they load quickly. Very large complexes are reduced to one bead per building block; the figure then says so.' })}</li>
    <li>${L({ nl: '<b>Rekenen in plaats van tekenen.</b> Waar het kan, rekent de app zelf: de aminozuren bij translatie volgen uit de genetische code, de punten in de Ramachandran-grafiek en de waterstofbruggen worden berekend uit de echte coördinaten.', en: '<b>Computing instead of drawing.</b> Where possible, the app computes things itself: the amino acids in translation follow from the genetic code, and the points in the Ramachandran plot and the hydrogen bonds are calculated from the real coordinates.' })}</li>
    <li>${L({ nl: '<b>Open en controleerbaar.</b> De volledige broncode en alle controleverslagen staan openbaar op <a href="https://github.com/keanuvanhoutte/van-dna-tot-eiwit" target="_blank" rel="noopener">GitHub</a>.', en: '<b>Open and verifiable.</b> The full source code and all verification reports are public on <a href="https://github.com/keanuvanhoutte/van-dna-tot-eiwit" target="_blank" rel="noopener">GitHub</a>.' })}</li>
    <li>${L({ nl: '<b>Gemaakt met hulp van AI.</b> Teksten, animaties en code zijn geschreven met een AI-assistent (Claude, van Anthropic), onder sturing van de maker. Juist daarom is elke uitspraak achteraf in aparte controlerondes tegen een gelezen wetenschappelijke bron gelegd (zie Wetenschappelijke borging).', en: '<b>Made with the help of AI.</b> Texts, animations and code were written with an AI assistant (Claude, by Anthropic), directed by the maker. Precisely for that reason, every statement was afterwards checked against a scientific source that was actually read, in separate verification rounds (see Scientific quality).' })}</li>
  </ul></div></details>`;
}

/* ---------- tab 2: navigeren ---------- */
function tabNav() {
  const card = (ic, h, p) => `<div class="card"><h4><span class="ic">${ic}</span>${esc(L(h))}</h4><p>${L(p)}</p></div>`;
  const keys = [
    ['<kbd>␣</kbd> ' + L({ nl: 'spatie', en: 'space' }), { nl: 'afspelen / pauzeren', en: 'play / pause' }],
    ['<kbd>←</kbd> <kbd>→</kbd>', { nl: 'vorige / volgende stap', en: 'previous / next step' }],
    ['<kbd>Esc</kbd>', { nl: 'één niveau uitzoomen, of een open venster sluiten', en: 'zoom out one level, or close an open window' }],
    ['<kbd>M</kbd>', { nl: 'inhoudskaart ("Waar ben ik?")', en: 'content map ("Where am I?")' }],
    ['<kbd>/</kbd>', { nl: 'naar de zoekbalk', en: 'go to the search bar' }],
    ['<kbd>C</kbd>', { nl: 'ondertitel klein maken of weer volledig tonen', en: 'shrink the caption or show it in full again' }],
  ];
  return `
  <h2>${esc(L({ nl: 'Zo navigeer je', en: 'How to navigate' }))}</h2>
  <p class="sub">${esc(L({ nl: 'De inhoud is geen rechte lijn maar een netwerk: het ribosoom hoort zowel bij translatie als bij de bouw van ribosomen. Daarom kan je op drie manieren bewegen, en vind je altijd de weg terug.', en: 'The content is not a straight line but a network: the ribosome belongs to translation as well as to the building of ribosomes. That is why you can move in three ways, and you can always find your way back.' }))}</p>
  <div class="moves">
    <div style="--c:#7fdc6a"><b>① ${esc(L({ nl: 'Inzoomen', en: 'Zoom in' }))}</b><span>${esc(L({ nl: 'Klik op wat oplicht. De camera vliegt erheen en een nieuwe animatie toont dat onderdeel in detail.', en: 'Click what lights up. The camera flies there and a new animation shows that part in detail.' }))}</span></div>
    <div style="--c:#ff8a3d"><b>② ${esc(L({ nl: 'Verder in het verhaal', en: 'On with the story' }))}</b><span>${esc(L({ nl: 'Na de laatste stap gaat het verhaal vanzelf naar het volgende hoofdstuk, of je klikt zelf "Volgend hoofdstuk".', en: 'After the last step the story moves on to the next chapter by itself, or you click "Next chapter" yourself.' }))}</span></div>
    <div style="--c:#9b7bff"><b>③ ${esc(L({ nl: 'Zijsprong', en: 'Detour' }))}</b><span>${esc(L({ nl: 'Knoppen in de animatie en het uitlegpaneel brengen je naar iets wat ermee samenhangt. Bovenaan zie je dat je een zijsprong maakt, met een knop terug.', en: 'Buttons in the animation and in the explanation panel take you to something related. At the top you see that you are on a detour, with a button back.' }))}</span></div>
    <div style="--c:#93a0bb"><b>↩ ${esc(L({ nl: 'Terug', en: 'Back' }))}</b><span>${esc(L({ nl: '"Uitzoomen" (of Esc) gaat één niveau terug; het kruimelpad bovenaan toont de weg die je kwam; "Startmenu" brengt je naar de startpagina.', en: '"Zoom out" (or Esc) goes back one level; the breadcrumb trail at the top shows the way you came; "Main menu" takes you to the home page.' }))}</span></div>
  </div>

  <h3>${esc(L({ nl: 'Alle manieren om je weg te vinden', en: 'All ways to find your way' }))}</h3>
  <div class="grid">
    ${card('🏁', { nl: 'Startpagina', en: 'Home page' }, { nl: 'Kies een hoofdverhaal (menselijke cel of bacterie), een zijpad over één thema, de 3D-bibliotheek, of zoek meteen wat je wil zien.', en: 'Pick a main story (human cell or bacterium), a side path about one theme, the 3D library, or search right away for what you want to see.' })}
    ${card('🔎', { nl: 'Zoeken', en: 'Search' }, { nl: 'Typ een woord in het Nederlands of Engels, ook met een tikfout of een andere naam (bv. "crosslink" vindt alkylering). Je krijgt "Bedoel je…" en ziet in welk verhaal het zit. Sneltoets: <kbd>/</kbd>.', en: 'Type a word in Dutch or English, even with a typo or another name (e.g. "crosslink" finds alkylation). You get "Did you mean…" and see which story it is in. Shortcut: <kbd>/</kbd>.' })}
    ${card('🗺️', { nl: 'Inhoudskaart ("Waar ben ik?")', en: 'Content map ("Where am I?")' }, { nl: 'Het overzicht van alles: als verhalen met haltes, per onderwerp of van groot naar klein. Klik een onderwerp voor een korte uitleg en open dan de animatie. Hier ben je = geel omrand. Sneltoets: <kbd>M</kbd>. Ook op deze pagina, bij het tabblad Inhoudskaart.', en: 'The overview of everything: as stories with stops, by topic, or from large to small. Click a topic for a short explanation, then open the animation. You are here = yellow outline. Shortcut: <kbd>M</kbd>. Also on this page, in the Content map tab.' })}
    ${card('🧭', { nl: 'Bovenbalk', en: 'Top bar' }, { nl: 'Toont altijd in welk verhaal en hoofdstuk je zit (genummerd), en de zijsprongen in het geel. Klik een hoofdstuk om ernaartoe te gaan.', en: 'Always shows which story and chapter you are in (numbered), and detours in yellow. Click a chapter to go there.' })}
    ${card('▶️', { nl: 'Afspeelbalk onderaan', en: 'Playback bar at the bottom' }, { nl: '▶ speelt en gaat vanzelf verder, ⏸ pauzeert echt, 🔁 herhaalt de huidige stap. ‹ › springen een stap. De tijdlijn toont elke stap met een korte titel: klik om erheen te gaan. Snelheid zit onder ⚙.', en: '▶ plays and moves on by itself, ⏸ really pauses, 🔁 repeats the current step. ‹ › jump one step. The timeline shows every step with a short title: click to go there. Speed is under ⚙.' })}
    ${card('📖', { nl: 'Uitlegpaneel', en: 'Explanation panel' }, { nl: 'Rechts: "In het kort" in gewone taal (onderlijnde woorden kan je aantikken voor een uitleg van één zin), de stappen van de animatie, en dichtgeklapt "Voor wie meer wil" met kerncijfers, bronnen en "Wat is hier vereenvoudigd?". De knop "Uitleg" toont of verbergt het paneel.', en: 'On the right: "In short" in plain language (underlined words can be tapped for a one-sentence explanation), the steps of the animation, and folded away "Want to know more?" with key numbers, sources and "What is simplified here?". The "Explanation" button shows or hides the panel.' })}
    ${card('⇄', { nl: 'Mens ⇄ Bacterie', en: 'Human ⇄ Bacterium' }, { nl: 'Verschijnt bovenaan als er een echte tegenhanger is (bv. menselijk ribosoom ⇄ bacterieel ribosoom). Eén klik toont hetzelfde proces in het andere organisme.', en: 'Appears at the top when there is a real counterpart (e.g. human ribosome ⇄ bacterial ribosome). One click shows the same process in the other organism.' })}
    ${card('🧬', { nl: 'Bekijk echt in 3D', en: 'View in real 3D' }, { nl: 'Bij een tekening die een echte structuur heeft, opent deze knop de gemeten 3D-structuur. Met "Atoomniveau" zie je waterstofbruggen, helices en bladen, en bij eiwitten een gekoppelde Ramachandran-grafiek.', en: 'For a drawing that has a real structure, this button opens the measured 3D structure. With "Atomic level" you see hydrogen bonds, helices and sheets, and for proteins a linked Ramachandran plot.' })}
    ${card('📚', { nl: '3D-bibliotheek', en: '3D library' }, { nl: 'Een aparte verzameling vormen van DNA, RNA en complexen in 3D, met weergaven, kleuren per onderdeel, "Wat is welk deel?", vergelijken naast elkaar, en zelf zoeken in de volledige PDB.', en: 'A separate collection of DNA, RNA and complex shapes in 3D, with display modes, colours per part, "Which part is which?", side-by-side comparison, and searching the full PDB yourself.' })}
    ${card('🏷️', { nl: 'Labels en taal', en: 'Labels and language' }, { nl: '"Labels" zet de namen in de figuur aan of uit. NL | EN wisselt de taal van alles.', en: '"Labels" turns the names in the figure on or off. NL | EN switches the language of everything.' })}
  </div>
  <h3>${esc(L({ nl: 'Sneltoetsen in een animatie', en: 'Keyboard shortcuts in an animation' }))}</h3>
  <div class="tscroll" style="max-width:640px"><table><tbody>${keys.map(([k, v]) => `<tr><td style="white-space:nowrap">${k}</td><td>${esc(L(v))}</td></tr>`).join('')}</tbody></table></div>`;
}

/* ---------- tab 3: inhoudskaart ---------- */
function tabMap() {
  return `<h2>${esc(L({ nl: 'Inhoudskaart', en: 'Content map' }))}</h2>
  <p class="sub">${esc(L({ nl: 'Alles wat in Dogma zit, op één plek. Kies bovenaan hoe je wil kijken, klik een onderwerp voor een korte uitleg, en open dan de animatie. Dezelfde kaart open je in de app met "Waar ben ik?" of de toets M.', en: 'Everything in Dogma in one place. Choose at the top how you want to look, click a topic for a short explanation, and then open the animation. You open the same map in the app with "Where am I?" or the M key.' }))}</p>
  <div id="mapHost"></div>`;
}

/* ---------- tab 4: wetenschappelijke borging ---------- */
function tabSci() {
  const R = VERIF.rounds;
  const totalCorr = R.reduce((a, r) => a + (r.corrections ?? 0), 0);
  const fmtDate = d => new Date(d + 'T12:00:00').toLocaleDateString(en ? 'en-GB' : 'nl-BE', { day: 'numeric', month: 'short', year: 'numeric' });
  const repLinks = nr => (REPORTS[nr] ?? []).map((f, i) => `<a href="${GH}${f}" target="_blank" rel="noopener">${esc(L({ nl: 'verslag', en: 'report' }))}${REPORTS[nr].length > 1 ? ' ' + (i + 1) : ''} ↗</a>`).join(' · ');
  const rounds = R.map(r => `<details class="acc"><summary>${esc(L({ nl: 'Ronde', en: 'Round' }))} ${esc(r.nr)} <small>${fmtDate(r.date)} · ${esc(L(r.scope))}</small></summary><div class="in">
      <p><span class="pill">${esc(L({ nl: 'methode', en: 'method' }))}</span>${esc(L(r.method))}</p>
      <p>${r.checked ? `<span class="pill g">≈ ${r.checked} ${esc(L({ nl: 'uitspraken nagekeken', en: 'statements checked' }))}</span>` : ''}${r.corrections != null ? `<span class="pill y">${r.corrections} ${esc(L({ nl: 'correcties verwerkt', en: 'corrections made' }))}</span>` : ''}</p>
      ${r.examples?.length ? `<p style="margin-bottom:2px"><b>${esc(L({ nl: 'Voorbeelden van correcties', en: 'Examples of corrections' }))}</b></p><ul class="ex">${r.examples.map(x => `<li>${esc(L(x))}</li>`).join('')}</ul>` : ''}
      <p style="font-size:13px">${repLinks(r.nr)}${en ? ' <small>(reports in Dutch)</small>' : ''}</p></div></details>`).join('');

  return `<h2>${esc(L({ nl: 'Wetenschappelijke borging', en: 'Scientific quality assurance' }))}</h2>
  <p class="sub">${esc(L({ nl: 'Uitgangspunt: geen enkele uitspraak in Dogma zonder een wetenschappelijke bron die echt gelezen is, en elke vereenvoudiging wordt benoemd. Hieronder staat hoe dat in de praktijk gebeurde, met de verslagen erbij.', en: 'Starting point: no statement in Dogma without a scientific source that was actually read, and every simplification is named. Below is how that was done in practice, with the reports included.' }))}</p>
  <div class="stats" style="margin-top:0">
    <div><b>${R.length}</b><span>${esc(L({ nl: 'controlerondes', en: 'verification rounds' }))}</span></div>
    <div><b>${totalCorr > 200 ? (en ? 'over 200' : 'ruim 200') : totalCorr}</b><span>${esc(L({ nl: 'correcties verwerkt', en: 'corrections made' }))}</span></div>
    <div><b>${SOURCES.length}</b><span>${esc(L({ nl: 'bronnen in de app', en: 'sources in the app' }))}</span></div>
    <div><b>${VERIF.totals.dois_checked}</b><span>${esc(L({ nl: "DOI's nagekeken via Crossref", en: 'DOIs checked via Crossref' }))}</span></div>
    <div><b>${nodeIds.length}/${nodeIds.length}</b><span>${esc(L({ nl: 'onderwerpen met bronnen', en: 'topics with sources' }))}</span></div>
  </div>

  <details class="acc" open><summary>1 · ${esc(L({ nl: 'Werkwijze in zes regels', en: 'Method in six rules' }))}</summary><div class="in"><ol class="steps">
    <li>${L({ nl: '<b>Bron per uitspraak.</b> Elk getal, elke naam en elke volgorde in een ondertitel, label of uitleg moet terug te vinden zijn in een bron die bij dat onderwerp in de app staat (uitlegpaneel → "Voor wie meer wil" → Bronnen).', en: '<b>A source per statement.</b> Every number, name and order in a caption, label or explanation must be traceable to a source listed for that topic in the app (explanation panel → "Want to know more?" → Sources).' })}</li>
    <li>${L({ nl: '<b>Gelezen, niet enkel geciteerd.</b> Een bron telt pas als de tekst echt opgehaald en gelezen is (samenvatting via PubMed, volledige tekst via PubMed Central). Wat niet in de gelezen tekst staat, wordt herschreven of geschrapt, ook als het “waarschijnlijk klopt”.', en: '<b>Read, not just cited.</b> A source only counts once its text has actually been retrieved and read (abstract via PubMed, full text via PubMed Central). What is not in the text that was read is rewritten or removed, even if it is “probably right”.' })}</li>
    <li>${L({ nl: '<b>Aparte controleronde.</b> Na het bouwen wordt elke uitspraak in een aparte controleronde opnieuw tegen de bron gelegd. Bij de bacterie-route en het zijpad over antibiotica deed een afzonderlijke controleur dat, die de tekst niet zelf schreef. Daarna wordt nagekeken of elke correctie juist en in beide talen verwerkt is.', en: '<b>Separate verification round.</b> After building, every statement is checked against its source again in a separate verification round. For the bacterial route and the side path on antibiotics, this was done by a separate reviewer who did not write the text. Afterwards it is checked that every correction was made correctly and in both languages.' })}</li>
    <li>${L({ nl: '<b>3D = echte data.</b> Elke PDB-code wordt via de officiële RCSB-databank gecontroleerd (titel, organisme, methode). Ketens, residuen en afstanden worden in de coördinatenbestanden zelf nagemeten voor er een label bij komt.', en: '<b>3D = real data.</b> Every PDB code is checked via the official RCSB database (title, organism, method). Chains, residues and distances are measured in the coordinate files themselves before a label is added.' })}</li>
    <li>${L({ nl: '<b>Eerlijk over eenvoud en onzekerheid.</b> Elke animatie heeft een vakje "Wat is hier vereenvoudigd?". Waar de wetenschap het nog niet weet, zegt de tekst dat ook (bv. "wordt nog onderzocht").', en: '<b>Honest about simplification and uncertainty.</b> Every animation has a box "What is simplified here?". Where science does not yet know, the text says so (e.g. "is still being studied").' })}</li>
    <li>${L({ nl: '<b>Organisme vermeld.</b> Veel details verschillen tussen mens, gist en bacterie. Elke animatie zegt voor welk organisme ze geldt, en uit welk organisme een 3D-structuur komt.', en: '<b>Organism stated.</b> Many details differ between humans, yeast and bacteria. Every animation states which organism it applies to, and which organism a 3D structure comes from.' })}</li>
  </ol></div></details>

  <details class="acc"><summary>2 · ${esc(L({ nl: 'Welke bronnen wel, en welke niet', en: 'Which sources are used, and which are not' }))} <small>${esc(L({ nl: 'rangorde van betrouwbaarheid', en: 'order of reliability' }))}</small></summary><div class="in"><div class="tiers">
    <div class="tier"><div class="lv">${esc(L({ nl: 'Artikels', en: 'Papers' }))}<small>${nKind('paper')} ${esc(L({ nl: 'in de app', en: 'in the app' }))}</small></div><p>${esc(L({ nl: 'Peer-reviewed onderzoeksartikels en overzichtsartikels (reviews) in wetenschappelijke tijdschriften, opgezocht via PubMed en gelezen via PubMed Central of Europe PMC. Eerste keuze voor getallen, mechanismen en recente inzichten. Bij voorkeur een recente review van erkende experts; voor een ontdekking het oorspronkelijke artikel.', en: 'Peer-reviewed research papers and review articles in scientific journals, found via PubMed and read via PubMed Central or Europe PMC. First choice for numbers, mechanisms and recent insights. Preferably a recent review by recognised experts; for a discovery, the original paper.' }))}</p></div>
    <div class="tier"><div class="lv">${esc(L({ nl: 'Handboeken', en: 'Textbooks' }))}<small>${nKind('book')} ${esc(L({ nl: 'in de app', en: 'in the app' }))}</small></div><p>${esc(L({ nl: 'Gratis universitaire handboeken op NCBI Bookshelf, zoals Alberts (Molecular Biology of the Cell), Lodish, Berg en Cooper, plus Cell Biology by the Numbers. Basis voor algemene processen. Omdat Bookshelf soms een captcha toonde, is elke uitspraak die enkel op een handboek steunde, opnieuw bevestigd met een gelezen artikel of herschreven.', en: 'Free university textbooks on NCBI Bookshelf, such as Alberts (Molecular Biology of the Cell), Lodish, Berg and Cooper, plus Cell Biology by the Numbers. The basis for general processes. Because Bookshelf sometimes showed a captcha, every statement that relied only on a textbook was confirmed again with a read paper, or rewritten.' }))}</p></div>
    <div class="tier"><div class="lv">${esc(L({ nl: 'Structuurdata', en: 'Structure data' }))}<small>${nKind('pdb')} ${esc(L({ nl: 'in de app', en: 'in the app' }))}</small></div><p>${esc(L({ nl: 'RCSB Protein Data Bank (gemeten structuren met auteurs, methode en resolutie) en PDB-101, de educatieve kant van de PDB.', en: 'RCSB Protein Data Bank (measured structures with authors, method and resolution) and PDB-101, the educational side of the PDB.' }))}</p></div>
    <div class="tier"><div class="lv">${esc(L({ nl: 'Databanken', en: 'Databases' }))}<small>${nKind('db')} ${esc(L({ nl: 'in de app', en: 'in the app' }))}</small></div><p>${esc(L({ nl: 'Gecureerde wetenschappelijke databanken: UniProt (eiwitten), GENCODE en Ensembl (genen), ICTV en ViralZone (virussen), BioNumbers (getallen uit de celbiologie).', en: 'Curated scientific databases: UniProt (proteins), GENCODE and Ensembl (genes), ICTV and ViralZone (viruses), BioNumbers (numbers from cell biology).' }))}</p></div>
    <div class="tier no"><div class="lv">${esc(L({ nl: 'Niet gebruikt', en: 'Not used' }))}<small>${esc(L({ nl: 'nooit als bron', en: 'never as a source' }))}</small></div><p>${esc(L({ nl: 'Wikipedia, blogs, populaire media, lesnotities en samenvattingen door AI. Zulke teksten mogen hoogstens helpen om de echte bron te vinden; in de app staat dan altijd die echte bron. Een getal dat alleen “uit het hoofd” of uit een opdracht kwam, telt niet: het moet in een gelezen bron staan.', en: 'Wikipedia, blogs, popular media, lecture notes and AI summaries. Such texts may at most help to find the real source; the app then always lists that real source. A number that came only “from memory” or from an instruction does not count: it must be in a source that was read.' }))}</p></div>
  </div></div></details>

  <details class="acc"><summary>3 · ${esc(L({ nl: 'Wat geschrapt of afgewezen werd, en waarom', en: 'What was removed or rejected, and why' }))} <small>${VERIF.rejected.length} ${esc(L({ nl: 'concrete gevallen', en: 'concrete cases' }))}</small></summary><div class="in"><ul>
    ${VERIF.rejected.map(x => `<li>${esc(L(x))}</li>`).join('')}</ul></div></details>

  <details class="acc"><summary>4 · ${esc(L({ nl: 'Hoe een bron een zin in de app wordt', en: 'How a source becomes a sentence in the app' }))}</summary><div class="in"><ol class="steps">
    <li>${L({ nl: '<b>Opzoeken.</b> Voor elk onderwerp worden een recente review en waar nodig het oorspronkelijke artikel gezocht in PubMed; voor structuren de PDB-entry met de beste resolutie en het juiste organisme.', en: '<b>Search.</b> For each topic a recent review and, where needed, the original paper are looked up in PubMed; for structures, the PDB entry with the best resolution and the right organism.' })}</li>
    <li>${L({ nl: '<b>Lezen en noteren.</b> De samenvatting of volledige tekst wordt opgehaald; getallen worden letterlijk overgenomen met de bron erbij (met PubMed-, PMC- of DOI-nummer).', en: '<b>Read and note.</b> The abstract or full text is retrieved; numbers are taken over literally together with the source (with a PubMed, PMC or DOI number).' })}</li>
    <li>${L({ nl: '<b>Vertalen naar gewone taal.</b> De ondertitel krijgt één korte zin met hooguit één nieuw vakwoord. Het vakjargon, de exacte getallen en de nuances gaan naar "Voor wie meer wil".', en: '<b>Translate into plain language.</b> The caption gets one short sentence with at most one new technical term. The jargon, exact numbers and nuances go to "Want to know more?".' })}</li>
    <li>${L({ nl: '<b>Vereenvoudiging benoemen.</b> Wat in de animatie anders is dan in de cel (schaal, snelheid, aantal moleculen, weggelaten tussenstappen), komt in "Wat is hier vereenvoudigd?".', en: '<b>Name the simplification.</b> What differs in the animation from the real cell (scale, speed, number of molecules, omitted intermediate steps) goes into "What is simplified here?".' })}</li>
    <li>${L({ nl: '<b>Controleren.</b> Een aparte controleronde vergelijkt elke zin, in beide talen, opnieuw met de bron. Fouten, te stellige uitspraken en verschillen tussen NL en EN worden verbeterd; het verslag wordt bewaard.', en: '<b>Check.</b> A separate verification round compares every sentence, in both languages, with the source again. Errors, overconfident statements and differences between Dutch and English are corrected; the report is kept.' })}</li>
    <li>${L({ nl: '<b>Bronnen zelf nakijken.</b> Elke DOI is via Crossref opgevraagd om te bevestigen dat ze bestaat en bij de vermelde publicatie hoort; elke PDB-code via de RCSB-databank.', en: '<b>Check the sources themselves.</b> Every DOI was looked up via Crossref to confirm that it exists and belongs to the publication named; every PDB code via the RCSB database.' })}</li>
  </ol></div></details>

  <details class="acc"><summary>5 · ${esc(L({ nl: 'De controlerondes, één voor één', en: 'The verification rounds, one by one' }))} <small>${R.length} ${esc(L({ nl: 'rondes, met verslag', en: 'rounds, with report' }))}</small></summary><div class="in">${rounds}
    <p style="font-size:13.5px">${esc(L({ nl: 'Ook nagekeken (13-11-2026): alle DOI’s in de app via Crossref en alle structuren van de 3D-bibliotheek tegen hun RCSB-gegevens. Daarbij werden enkele formuleringen preciezer gemaakt.', en: 'Also checked (13-11-2026): all DOIs in the app via Crossref and all structures of the 3D library against their RCSB data. Some wordings were made more precise in the process.' }))}</p></div></details>

  <details class="acc"><summary>6 · ${esc(L({ nl: 'Werkregels van de controleurs', en: 'Working rules of the reviewers' }))} <small>${VERIF.principles.length}</small></summary><div class="in"><ul>
    ${VERIF.principles.map(x => `<li>${esc(L(x))}</li>`).join('')}</ul></div></details>

  <details class="acc"><summary>7 · ${esc(L({ nl: 'Alle 3D-structuren', en: 'All 3D structures' }))} <small>${pdbSet.size} ${esc(L({ nl: 'PDB-codes', en: 'PDB codes' }))}</small></summary><div class="in">
    <p>${esc(L({ nl: 'Elke code opent de officiële RCSB-pagina met auteurs, methode, resolutie en het oorspronkelijke artikel.', en: 'Each code opens the official RCSB page with authors, method, resolution and the original paper.' }))}</p>
    <p>${[...pdbSet].sort().map(p => `<a class="pill" href="https://www.rcsb.org/structure/${p}" target="_blank" rel="noopener">${p}</a>`).join(' ')}</p></div></details>

  <details class="acc"><summary>8 · ${esc(L({ nl: 'Bekende grenzen', en: 'Known limitations' }))}</summary><div class="in"><ul>
    <li>${esc(L({ nl: '2D-animaties zijn schematisch: groottes en afstanden zijn niet op schaal, en processen zijn sterk vertraagd. De echte schaal en duur staan onderaan bij elke animatie.', en: '2D animations are schematic: sizes and distances are not to scale, and processes are strongly slowed down. The real scale and duration are shown at the bottom of each animation.' }))}</li>
    <li>${esc(L({ nl: 'Zeer grote 3D-complexen (zoals het ribosoom) zijn ingekort tot één bolletje per bouwsteen om snel te laden; dat staat in de figuur vermeld.', en: 'Very large 3D complexes (such as the ribosome) are reduced to one bead per building block to load quickly; the figure says so.' }))}</li>
    <li>${esc(L({ nl: 'De waterstofbruggen op atoomniveau volgen de energieformule van DSSP (Kabsch & Sander 1983), opnieuw geprogrammeerd in de app; het is geen uitvoer van het DSSP-programma zelf.', en: 'The hydrogen bonds at the atomic level follow the DSSP energy formula (Kabsch & Sander 1983), re-implemented in the app; it is not output of the DSSP program itself.' }))} ${esc(L({ nl: 'Vergeleken met de secundaire structuur die de auteurs van ubiquitine (PDB 1UBQ) zelf in de PDB vermelden: de α-helix (23–34) is identiek en de vijf β-strengen liggen op dezelfde plaats, aan de uiteinden soms 1–2 aminozuren korter. De korte 3₁₀-helix (56–59) wordt niet apart getoond.', en: 'Compared with the secondary structure that the authors of ubiquitin (PDB 1UBQ) themselves deposited in the PDB: the α-helix (23–34) is identical and the five β-strands lie in the same places, sometimes 1–2 amino acids shorter at the ends. The short 3₁₀ helix (56–59) is not shown separately.' }))}</li>
    <li>${esc(L({ nl: 'De wetenschap staat niet stil. Bronnen hebben een jaartal; nieuwere inzichten kunnen details veranderen.', en: 'Science does not stand still. Sources carry a year; newer insights can change details.' }))}</li>
  </ul></div></details>`;
}

/* ---------- tab 5: alle bronnen ---------- */
const KIND = { paper: { nl: 'Artikels', en: 'Papers' }, book: { nl: 'Handboeken', en: 'Textbooks' }, pdb: { nl: 'Structuurdata (PDB)', en: 'Structure data (PDB)' }, db: { nl: 'Databanken', en: 'Databases' } };
function tabSrc() {
  return `<h2>${esc(L({ nl: 'Alle bronnen', en: 'All sources' }))}</h2>
  <p class="sub">${esc(L({ nl: `Deze lijst wordt bij het openen opgebouwd uit de bronnen die echt in de app staan: ${SOURCES.length} verschillende bronnen. Onder elke bron zie je waar ze gebruikt wordt; klik om die animatie of dat 3D-item te openen.`, en: `This list is built when the page opens from the sources that are actually in the app: ${SOURCES.length} distinct sources. Under each source you see where it is used; click to open that animation or 3D item.` }))}</p>
  <div class="srctools"><input type="search" id="srcQ" placeholder="${esc(L({ nl: 'Zoek op auteur, jaartal, tijdschrift of onderwerp…', en: 'Search by author, year, journal or topic…' }))}">
    <button class="f" data-k="" aria-pressed="true">${esc(L({ nl: 'Alles', en: 'All' }))}</button>${Object.keys(KIND).map(k => `<button class="f" data-k="${k}" aria-pressed="false">${esc(L(KIND[k]))} (${nKind(k)})</button>`).join('')}
    <span class="n" id="srcN"></span></div>
  <ol class="srcs" id="srcList"></ol><button class="more" id="srcMore" hidden></button>`;
}
function wireSrc() {
  let k = '', q = '', lim = 60;
  const draw = () => {
    const words = q.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').split(/\s+/).filter(Boolean);
    const list = SOURCES.filter(s => (!k || s.kind === k) && words.every(w => (s.t + ' ' + s.url + ' ' + s.use.map(u => u.label).join(' ')).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').includes(w)));
    $('srcN').textContent = `${list.length} ${L({ nl: 'bronnen', en: 'sources' })}`;
    $('srcList').innerHTML = list.slice(0, lim).map(s => `<li><span class="pill">${esc(L(KIND[s.kind]))}</span><a class="t" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.t)}</a>
      <div class="use">${esc(L({ nl: 'gebruikt bij:', en: 'used in:' }))} ${s.use.map(u => `<a href="${u.href}">${esc(u.label)}</a>`).join('')}</div></li>`).join('');
    const more = $('srcMore'); more.hidden = list.length <= lim; more.textContent = L({ nl: `Toon alle ${list.length}`, en: `Show all ${list.length}` });
  };
  $('srcQ').oninput = e => { q = e.target.value; lim = 60; draw(); };
  document.querySelectorAll('.srctools .f').forEach(b => b.onclick = () => { k = b.dataset.k; lim = 60; document.querySelectorAll('.srctools .f').forEach(x => x.setAttribute('aria-pressed', String(x === b))); draw(); });
  $('srcMore').onclick = () => { lim = 1e9; draw(); };
  draw();
}

/* ---------- tab 6: kleuren & beeld ---------- */
function tabLook() {
  const sw = [['--dna', { nl: 'DNA van de cel', en: 'The cell’s DNA' }], ['--dna-2', { nl: 'tweede DNA-streng', en: 'second DNA strand' }], ['--tdna', { nl: 'vreemd DNA (virus)', en: 'foreign DNA (virus)' }], ['--rna', { nl: 'mRNA', en: 'mRNA' }], ['--trna', { nl: 'tRNA', en: 'tRNA' }],
    ['--rrna', { nl: 'ribosoom', en: 'ribosome' }], ['--prot', { nl: 'enzymen en eiwitcomplexen', en: 'enzymes and protein complexes' }], ['--chain', { nl: 'nieuwe eiwitketen', en: 'new protein chain' }], ['--histone', { nl: 'histonen', en: 'histones' }], ['--membrane', { nl: 'membranen en celwand', en: 'membranes and cell wall' }], ['--bact', { nl: 'bacterie', en: 'bacterium' }]];
  const bases = [['A', '#5ad17a'], ['T / U', '#ff6b6b'], ['G', '#ffc247'], ['C', '#4fb0ff']];   // = BASE in app/kit.js
  return `<h2>${esc(L({ nl: 'Kleuren & beeld', en: 'Colours & visuals' }))}</h2>
  <p class="sub">${esc(L({ nl: 'Elke soort molecule heeft overal in de app dezelfde kleur, in 2D en in 3D. Zo herken je een molecule terug als je in- of uitzoomt. De donkere achtergrond laat de moleculen opvallen, zoals in wetenschappelijke animaties.', en: 'Every kind of molecule has the same colour everywhere in the app, in 2D and in 3D. That way you recognise a molecule when you zoom in or out. The dark background makes the molecules stand out, as in scientific animations.' }))}</p>
  <div class="sw">${sw.map(([v, t]) => `<div><i style="background:var(${v})"></i>${esc(L(t))}</div>`).join('')}</div>
  <h3>${esc(L({ nl: 'Andere vaste afspraken', en: 'Other fixed conventions' }))}</h3>
  <div class="grid">
    <div class="card"><h4>${esc(L({ nl: 'Richting', en: 'Direction' }))}</h4><p>${esc(L({ nl: 'Strengen worden van 5′ naar 3′ getekend en de twee DNA-strengen lopen antiparallel. Eiwitten worden gelezen van N- naar C-terminus.', en: 'Strands are drawn from 5′ to 3′ and the two DNA strands run antiparallel. Proteins are read from N- to C-terminus.' }))}</p></div>
    <div class="card"><h4>${esc(L({ nl: 'Schaal en tijd', en: 'Scale and time' }))}</h4><p>${esc(L({ nl: 'Onderaan elke animatie staat de echte grootte en de echte duur. Een balkje toont het zoomniveau: van de hele cel tot de atomen.', en: 'At the bottom of every animation you see the real size and the real duration. A small bar shows the zoom level: from the whole cell to the atoms.' }))}</p></div>
    <div class="card"><h4>${esc(L({ nl: 'Wat oplicht, kan je aanklikken', en: 'What lights up can be clicked' }))}</h4><p>${esc(L({ nl: 'Een onderdeel met een gloed of een label is klikbaar en opent het detail.', en: 'A part with a glow or a label is clickable and opens the detail.' }))}</p></div>
    <div class="card"><h4>${esc(L({ nl: 'Letters van DNA en RNA', en: 'Letters of DNA and RNA' }))}</h4><p>${bases.map(([b, c]) => `<span class="pill" style="background:${c}22;color:${c}">${b}</span>`).join('')}</p></div>
  </div>`;
}

/* ---------- opbouw ---------- */
document.title = L(T.title);
for (const id of ['navHome', 'navAtlas', 'eyebrow', 'h1', 'lead']) $(id).textContent = L(T[id]);
$('langBox').append(langSwitch());
$('stats').innerHTML = [[nodeIds.length, T.sTopics], [lineCount, T.sLines], [SOURCES.length, T.sSrc], [pdbSet.size, T.sPdb], [VERIF.rounds.length, T.sRounds]]
  .map(([n, t]) => `<div><b>${n}</b><span>${esc(L(t))}</span></div>`).join('');

const TABS = { about: tabAbout, nav: tabNav, map: tabMap, sci: tabSci, src: tabSrc, look: tabLook };
$('tabs').innerHTML = Object.keys(TABS).map(k => `<button role="tab" id="tab-${k}" aria-controls="p-${k}" data-k="${k}">${esc(L(T.tabs[k]))}</button>`).join('');
$('main').innerHTML = Object.entries(TABS).map(([k, f]) => `<section role="tabpanel" id="p-${k}" aria-labelledby="tab-${k}" hidden>${f()}</section>`).join('');

let mapMounted = false;
function show(k, push = true) {
  if (!TABS[k]) k = 'about';
  document.querySelectorAll('#tabs button').forEach(b => b.setAttribute('aria-selected', String(b.dataset.k === k)));
  document.querySelectorAll('main section[role="tabpanel"]').forEach(s => { s.hidden = s.id !== 'p-' + k; });
  if (k === 'map' && !mapMounted) {
    mapMounted = true;
    mountMap($('mapHost'), { NODES, STAGES, SCALES, SCALES_EN, LINES, MAIN_KEYS, SIDE_KEYS, DETAILS, S_EN, lang, L,
      engine: async () => makeSearch({ NODES, LINES, LINKS, DETAILS, S_EN }),
      onOpen: (id, line) => { location.href = `../app/index.html?scene=${id}${line ? '&story=' + line : ''}`; } });
  }
  if (push) history.replaceState(null, '', '#' + k);
}
document.querySelectorAll('#tabs button').forEach(b => b.onclick = () => { show(b.dataset.k); window.scrollTo({ top: $('tabs').offsetTop - 0, behavior: 'smooth' }); });
$('tabs').onkeydown = e => {
  if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
  const ks = Object.keys(TABS), cur = ks.indexOf(document.querySelector('#tabs [aria-selected="true"]').dataset.k);
  const nk = ks[(cur + (e.key === 'ArrowRight' ? 1 : ks.length - 1)) % ks.length]; show(nk); $('tab-' + nk).focus();
};
wireSrc();
show(location.hash.slice(1) || 'about', false);
window.addEventListener('hashchange', () => show(location.hash.slice(1), false));

$('foot').innerHTML = L({ nl: `Dogma · alle inhoud nagekeken tegen wetenschappelijke bronnen · broncode en verslagen op <a href="https://github.com/keanuvanhoutte/van-dna-tot-eiwit" target="_blank" rel="noopener">GitHub</a> · 3D-structuren: <a href="https://www.rcsb.org" target="_blank" rel="noopener">RCSB PDB</a> · viewer: <a href="https://doi.org/10.1093/bioinformatics/btu829" target="_blank" rel="noopener">3Dmol.js</a>`,
  en: `Dogma · all content checked against scientific sources · source code and reports on <a href="https://github.com/keanuvanhoutte/van-dna-tot-eiwit" target="_blank" rel="noopener">GitHub</a> · 3D structures: <a href="https://www.rcsb.org" target="_blank" rel="noopener">RCSB PDB</a> · viewer: <a href="https://doi.org/10.1093/bioinformatics/btu829" target="_blank" rel="noopener">3Dmol.js</a>` });
