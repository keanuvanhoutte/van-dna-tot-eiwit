/* Pagina "Over de app" (docs/over.html) — tweetalig, tabbladen, gegevens rechtstreeks uit de app zelf:
 * aantallen, inhoudskaart, alle bronnen en alle 3D-structuren worden bij het laden opgebouwd uit dezelfde bestanden
 * die de app gebruikt, zodat deze pagina nooit achterloopt op de inhoud. */
import { NODES, STAGES, SCALES } from '../shared/graph.js';
import { S_EN, SCALES_EN } from '../shared/graph.en.js';
import { DETAILS } from '../shared/details/index.js';
import { LINES, MAIN_KEYS, SIDE_KEYS } from '../app/story.js';
import { ENTRIES } from '../atlas/entries.js';
import { localPdb } from '../shared/pdb.js';
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
  13: ['verificatie-ronde-13-A-binnenkomst-virussen.md', 'verificatie-ronde-13-B-signalen-epigenetica.md', 'verificatie-ronde-13-C-genoom-dna.md', 'verificatie-ronde-13-D-replicatie-herstel.md', 'verificatie-ronde-13-E-transcriptie-rnalot.md', 'verificatie-ronde-13-F-rna.md', 'verificatie-ronde-13-G-translatie.md', 'verificatie-ronde-13-H-eiwitstructuur.md', 'verificatie-ronde-13-I-eiwitbewerking.md', 'verificatie-ronde-13-J-eiwitlot.md', 'verificatie-ronde-13-K-3d-bibliotheek.md', 'verificatie-ronde-13-L-verhalen-woordenlijst-startpagina.md'],
};

/* ---------- gegevens uit de app ---------- */
const nodeIds = Object.keys(NODES);
const lineCount = MAIN_KEYS.length + SIDE_KEYS.length;
const pdbSet = new Set();
/* enkel structuren die je echt kan bekijken: 'Bekijk echt in 3D' (knoop + lokale kopie) of de 3D-bibliotheek */
for (const n of Object.values(NODES)) for (const p of n.pdb ?? []) if (localPdb(p)) pdbSet.add(p.toUpperCase());
for (const e of ENTRIES) if (e.pdb) pdbSet.add(String(e.pdb).toUpperCase());

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
/* PDB-pagina's ≠ 3D-structuren: een bron kan een structuurpagina of een PDB-101-artikel zijn, en niet elke geciteerde structuur is in 3D te bekijken */
const pdbPages = SOURCES.filter(s => s.kind === 'pdb');
const pdbStructPages = pdbPages.filter(s => /rcsb\.org\/structure\//i.test(s.url)).length;
const pdbOther = pdbPages.length - pdbStructPages;

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
  sPdb: { nl: 'echte 3D-structuren om zelf te draaien (PDB)', en: 'real 3D structures you can rotate (PDB)' },
  sRounds: { nl: 'controlerondes', en: 'verification rounds' },
  tabs: {
    about: { nl: 'Wat is Dogma?', en: 'What is Dogma?' }, nav: { nl: 'Zo navigeer je', en: 'How to navigate' }, map: { nl: 'Inhoudskaart', en: 'Content map' },
    sci: { nl: 'Wetenschappelijke borging', en: 'Scientific quality' }, src: { nl: 'Alle bronnen', en: 'All sources' }, look: { nl: 'Kleuren & beeld', en: 'Colours & visuals' },
  },
};

/* ---------- gedeelde bouwstenen: in één oogopslag ---------- */
const glance = (big, small) => `<div class="glance"><span class="gk">${esc(L({ nl: 'In één oogopslag', en: 'At a glance' }))}</span><p class="gb">${L(big)}</p>${small ? `<p class="gs">${L(small)}</p>` : ''}</div>`;
const fact = (ic, h, p) => `<div class="fact"><span class="ic">${ic}</span><div><b>${esc(L(h))}</b><span>${L(p)}</span></div></div>`;

/* ---------- tab 1: wat is Dogma ---------- */
function tabAbout() {
  const lineItem = k => `<li><a href="../app/index.html?scene=${LINES[k].chapters[0].id}&story=${k}">${esc(L(LINES[k].title).replace(/^(Zijpad|Side path)\s*·\s*/, ''))}</a> <small>· ${LINES[k].chapters.length} ${en ? 'chapters' : 'hoofdstukken'}</small></li>`;
  return `
  <h2>${esc(L({ nl: 'Wat is Dogma?', en: 'What is Dogma?' }))}</h2>
  ${glance({ nl: 'Korte animaties die tonen hoe een cel van <b>DNA</b> via <b>RNA</b> tot <b>eiwit</b> komt.', en: 'Short animations that show how a cell gets from <b>DNA</b> via <b>RNA</b> to <b>protein</b>.' },
    { nl: 'Van de hele cel tot op de atomen · bij de mens én bij een bacterie · elke uitspraak met een bron. De naam komt van het centrale dogma van de biologie.', en: 'From the whole cell down to the atoms · in humans and in a bacterium · every statement with a source. The name comes from the central dogma of biology.' })}
  <div class="facts">
    ${fact('🎓', { nl: 'Voor wie', en: 'Who for' }, { nl: 'Secundair (wetenschappen) en 1ste bachelor. Geen voorkennis nodig.', en: 'Secondary school (science) and first-year bachelor. No prior knowledge needed.' })}
    ${fact('🧩', { nl: 'Twee lagen uitleg', en: 'Two layers' }, { nl: 'Per stap één korte zin. Meer uitleg in het paneel rechts.', en: 'One short sentence per step. More in the panel on the right.' })}
    ${fact('🔬', { nl: 'Echte 3D', en: 'Real 3D' }, { nl: 'Gemeten structuren uit de Protein Data Bank.', en: 'Measured structures from the Protein Data Bank.' })}
    ${fact('🦠', { nl: 'Mens én bacterie', en: 'Human and bacterium' }, { nl: 'Hetzelfde proces in E. coli, met één klik wisselen.', en: 'The same process in E. coli, one click to switch.' })}
    ${fact('🌐', { nl: 'Nederlands en Engels', en: 'Dutch and English' }, { nl: 'Alles in beide talen, nooit gemengd.', en: 'Everything in both languages, never mixed.' })}
    ${fact('⚖️', { nl: 'Geen handboek', en: 'Not a textbook' }, { nl: 'Animaties zijn schematisch; elke animatie zegt wat vereenvoudigd is.', en: 'Animations are schematic; each one says what is simplified.' })}
  </div>

  <h3>${esc(L({ nl: 'Waar begin je?', en: 'Where do you start?' }))}</h3>
  <div class="grid">
    <div class="card"><h4><span class="ic">🧬</span>${esc(L({ nl: 'Hoofdverhalen', en: 'Main stories' }))}</h4><p>${esc(L({ nl: 'Het hele traject, hoofdstuk na hoofdstuk.', en: 'The whole route, chapter by chapter.' }))}</p><ul>${MAIN_KEYS.map(lineItem).join('')}</ul></div>
    <div class="card"><h4><span class="ic">↳</span>${esc(L({ nl: 'Zijpaden', en: 'Side paths' }))}</h4><p>${esc(L({ nl: 'Eén thema, kort en apart.', en: 'One theme, short and separate.' }))}</p><ul>${SIDE_KEYS.map(lineItem).join('')}</ul></div>
    <div class="card"><h4><span class="ic">📚</span>${esc(L({ nl: '3D-bibliotheek', en: '3D library' }))}</h4><p>${esc(L({ nl: `${ENTRIES.length} vormen van DNA, RNA en eiwitcomplexen in echte 3D. Of zoek zelf een eiwit of gen in de volledige PDB.`, en: `${ENTRIES.length} forms of DNA, RNA and protein complexes in real 3D. Or look up a protein or gene yourself in the full PDB.` }))}</p><p><a href="../atlas/index.html">${esc(L({ nl: 'Open de 3D-bibliotheek →', en: 'Open the 3D library →' }))}</a></p></div>
  </div>

  <h3>${esc(L({ nl: 'Hoe werkt de app achter de schermen?', en: 'How does the app work behind the scenes?' }))}</h3>
  <details class="acc"><summary>${esc(L({ nl: 'In gewone taal uitgelegd', en: 'Explained in plain language' }))} <small>${esc(L({ nl: 'privacy, 3D, broncode, AI', en: 'privacy, 3D, source code, AI' }))}</small></summary><div class="in"><ul>
    <li>${L({ nl: '<b>Een website, niets te installeren.</b> Dogma draait volledig in de browser van de gebruiker. Er is geen account, Dogma verzamelt geen gegevens en er is geen volgsoftware. Enkel je taalkeuze, je laatst gekozen verhaal, je recent bekeken 3D-codes en enkele weergavekeuzes worden in je eigen browser onthouden. Lettertypes, de 3D-viewer en het zoeken in de 3D-bibliotheek halen wel bestanden op bij externe diensten (Google Fonts, jsDelivr, RCSB PDB en UniProt).', en: '<b>A website, nothing to install.</b> Dogma runs entirely in the user’s browser. There is no account, Dogma collects no data and there is no tracking software. Only your language choice, your last chosen story, your recently viewed 3D codes and a few display choices are remembered in your own browser. Fonts, the 3D viewer and the search in the 3D library do fetch files from external services (Google Fonts, jsDelivr, RCSB PDB and UniProt).' })}</li>
    <li>${L({ nl: '<b>Eén kennisnetwerk.</b> Alle onderwerpen staan in één lijst, met per onderwerp waar je kan inzoomen, wat erna komt en wat ermee samenhangt. Daaruit worden de verhalen, de inhoudskaart, het zoeken en deze pagina opgebouwd.', en: '<b>One knowledge network.</b> All topics are in one list, with for each topic where you can zoom in, what comes next and what it connects to. The stories, the content map, the search and this page are built from it.' })}</li>
    <li>${L({ nl: '<b>Animaties als stappen.</b> Elke animatie bestaat uit korte stappen. Een stap toont één ding; je kan pauzeren, herhalen, terugspoelen en de snelheid kiezen.', en: '<b>Animations as steps.</b> Each animation consists of short steps. A step shows one thing; you can pause, repeat, rewind and choose the speed.' })}</li>
    <li>${L({ nl: '<b>3D uit echte metingen.</b> De 3D-figuren worden getekend met de open-source viewer 3Dmol.js (Rego &amp; Koes 2015) uit atoomcoördinaten van de PDB. Een kopie van die bestanden staat bij de app zelf, zodat ze snel laden. Bij erg grote complexen is (een deel van) de structuur ingekort tot één bolletje per bouwsteen; dat staat dan in de figuur vermeld.', en: '<b>3D from real measurements.</b> The 3D figures are drawn with the open-source viewer 3Dmol.js (Rego &amp; Koes 2015) from PDB atomic coordinates. A copy of those files is stored with the app so they load quickly. For very large complexes, (part of) the structure is reduced to one bead per building block; the figure then says so.' })}</li>
    <li>${L({ nl: '<b>Rekenen in plaats van tekenen.</b> Waar het kan, rekent de app zelf: de aminozuren bij translatie volgen uit de genetische code, de punten in de Ramachandran-grafiek en de waterstofbruggen worden berekend uit de echte coördinaten.', en: '<b>Computing instead of drawing.</b> Where possible, the app computes things itself: the amino acids in translation follow from the genetic code, and the points in the Ramachandran plot and the hydrogen bonds are calculated from the real coordinates.' })}</li>
    <li>${L({ nl: '<b>Open en controleerbaar.</b> De volledige broncode en alle controleverslagen staan openbaar op <a href="https://github.com/keanuvanhoutte/van-dna-tot-eiwit" target="_blank" rel="noopener">GitHub</a>.', en: '<b>Open and verifiable.</b> The full source code and all verification reports are public on <a href="https://github.com/keanuvanhoutte/van-dna-tot-eiwit" target="_blank" rel="noopener">GitHub</a>.' })}</li>
    <li>${L({ nl: '<b>Gemaakt met hulp van AI.</b> Teksten, animaties en code zijn geschreven met een AI-assistent (Claude, van Anthropic), onder sturing van de maker. Juist daarom is elke uitspraak achteraf in aparte controlerondes tegen een gelezen wetenschappelijke bron gelegd (zie Wetenschappelijke borging).', en: '<b>Made with the help of AI.</b> Texts, animations and code were written with an AI assistant (Claude, by Anthropic), directed by the maker. Precisely for that reason, every statement was afterwards checked against a scientific source that was actually read, in separate verification rounds (see Scientific quality).' })}</li>
  </ul></div></details>`;
}

/* ---------- tab 2: navigeren ---------- */
function tabNav() {
  const card = (ic, h, p) => `<div class="card"><h4><span class="ic">${ic}</span>${esc(L(h))}</h4><p>${L(p)}</p></div>`;
  const K = s => s.split(' ').map(k => `<kbd>${k}</kbd>`).join(' ');
  const goals = [
    [{ nl: 'verder in het verhaal', en: 'move on in the story' }, { nl: '▶ speelt vanzelf door; of <b>Volgend</b> rechtsonder', en: '▶ plays on by itself; or <b>Next</b> at the bottom right' }, K(L({ nl: 'spatie', en: 'space' }))],
    [{ nl: 'een stap terug of vooruit', en: 'go one step back or forward' }, { nl: '‹ › in de afspeelbalk, of klik een bolletje', en: '‹ › in the playback bar, or click a dot' }, K('← →')],
    [{ nl: 'een stap opnieuw zien', en: 'see a step again' }, { nl: '🔁 in de afspeelbalk', en: '🔁 in the playback bar' }, ''],
    [{ nl: 'dieper ingaan op een onderdeel', en: 'go deeper into a part' }, { nl: 'klik op wat oplicht in de figuur', en: 'click what lights up in the figure' }, ''],
    [{ nl: 'terug naar waar ik was', en: 'go back to where I was' }, { nl: '<b>Uitzoomen</b>, of het kruimelpad bovenaan', en: '<b>Zoom out</b>, or the breadcrumb trail at the top' }, K('Esc')],
    [{ nl: 'iets opzoeken', en: 'look something up' }, { nl: 'de zoekbalk (NL of EN, ook met een tikfout)', en: 'the search bar (Dutch or English, typos are fine)' }, K('/')],
    [{ nl: 'zien waar ik ben in het geheel', en: 'see where I am in the whole' }, { nl: '<b>Waar ben ik?</b> opent de inhoudskaart', en: '<b>Where am I?</b> opens the content map' }, K('M')],
    [{ nl: 'meer uitleg of de bronnen', en: 'more explanation or the sources' }, { nl: 'het uitlegpaneel rechts; bronnen onder <b>Meer</b>', en: 'the explanation panel on the right; sources under <b>More</b>' }, ''],
    [{ nl: 'de echte molecule zien', en: 'see the real molecule' }, { nl: '<b>Bekijk echt in 3D</b>', en: '<b>View in real 3D</b>' }, ''],
    [{ nl: 'hetzelfde bij een bacterie', en: 'the same in a bacterium' }, { nl: '<b>Mens ⇄ Bacterie</b> bovenaan (als er een tegenhanger is)', en: '<b>Human ⇄ Bacterium</b> at the top (when there is a counterpart)' }, ''],
    [{ nl: 'de figuur groter', en: 'a bigger figure' }, { nl: '› klapt het uitlegpaneel in; ▾ de stapuitleg', en: '› folds the explanation panel; ▾ the step explanation' }, K('C')],
    [{ nl: 'snelheid, leestijd of labels', en: 'speed, reading time or labels' }, { nl: '⚙ in de afspeelbalk; <b>Labels</b> aan/uit', en: '⚙ in the playback bar; <b>Labels</b> on/off' }, ''],
    [{ nl: 'een andere taal', en: 'another language' }, { nl: '<b>NL | EN</b>', en: '<b>NL | EN</b>' }, ''],
  ];
  const zones = [
    [1, { nl: 'Bovenbalk', en: 'Top bar' }, { nl: 'in welk verhaal en hoofdstuk je zit; Mens ⇄ Bacterie', en: 'which story and chapter you are in; Human ⇄ Bacterium' }],
    [2, { nl: 'Verhaal links', en: 'Story on the left' }, { nl: 'één streepje per hoofdstuk; geel = hier ben je', en: 'one stripe per chapter; yellow = you are here' }],
    [3, { nl: 'Figuur', en: 'Figure' }, { nl: 'klik wat oplicht om in te zoomen', en: 'click what lights up to zoom in' }],
    [4, { nl: 'Uitlegpaneel', en: 'Explanation panel' }, { nl: 'meer uitleg, kerncijfers en bronnen', en: 'more explanation, key numbers and sources' }],
    [5, { nl: 'Afspeelbalk', en: 'Playback bar' }, { nl: '▶ ⏸ 🔁, de stappen, Volgend en ⚙', en: '▶ ⏸ 🔁, the steps, Next and ⚙' }],
  ];
  return `
  <h2>${esc(L({ nl: 'Zo navigeer je', en: 'How to navigate' }))}</h2>
  ${glance({ nl: 'Klik wat <b>oplicht</b> om in te zoomen · <b>▶</b> om verder te spelen · <b>Esc</b> om terug te gaan.', en: 'Click what <b>lights up</b> to zoom in · <b>▶</b> to play on · <b>Esc</b> to go back.' },
    { nl: 'Kwijt? <b>Waar ben ik?</b> (toets M) toont waar je zit in het geheel.', en: 'Lost? <b>Where am I?</b> (M key) shows where you are in the whole.' })}

  <h3>${esc(L({ nl: 'Wat zie je op het scherm?', en: 'What is on the screen?' }))}</h3>
  <div class="scr">
    <div class="mock" aria-hidden="true"><i class="z1">1</i><i class="z2">2</i><i class="z3">3</i><i class="z4">4</i><i class="z5">5</i></div>
    <ol class="zones">${zones.map(([n, h, p]) => `<li><span class="zn">${n}</span><div><b>${esc(L(h))}</b><span>${esc(L(p))}</span></div></li>`).join('')}</ol>
  </div>

  <h3>${esc(L({ nl: 'Ik wil…', en: 'I want to…' }))}</h3>
  <div class="tscroll"><table class="goals"><thead><tr><th>${esc(L({ nl: 'Ik wil…', en: 'I want to…' }))}</th><th>${esc(L({ nl: 'Zo doe je het', en: 'How' }))}</th><th>${esc(L({ nl: 'Toets', en: 'Key' }))}</th></tr></thead>
    <tbody>${goals.map(([g, h, k]) => `<tr><td><b>${esc(L(g))}</b></td><td>${L(h)}</td><td class="k">${k}</td></tr>`).join('')}</tbody></table></div>

  <h3>${esc(L({ nl: 'Meer weten?', en: 'Want to know more?' }))}</h3>
  <details class="acc"><summary>${esc(L({ nl: 'Alle details per onderdeel', en: 'All details per part' }))} <small>${esc(L({ nl: 'drie manieren om te bewegen, elk onderdeel van het scherm', en: 'three ways to move, every part of the screen' }))}</small></summary><div class="in">
  <p class="sub">${esc(L({ nl: 'De inhoud is geen rechte lijn maar een netwerk: het ribosoom hoort zowel bij translatie als bij de bouw van ribosomen. Daarom kan je op drie manieren bewegen, en vind je altijd de weg terug.', en: 'The content is not a straight line but a network: the ribosome belongs to translation as well as to the building of ribosomes. That is why you can move in three ways, and you can always find your way back.' }))}</p>
  <div class="moves">
    <div style="--c:#7fdc6a"><b>① ${esc(L({ nl: 'Inzoomen', en: 'Zoom in' }))}</b><span>${esc(L({ nl: 'Klik op wat oplicht. De camera vliegt erheen en een nieuwe animatie toont dat onderdeel in detail.', en: 'Click what lights up. The camera flies there and a new animation shows that part in detail.' }))}</span></div>
    <div style="--c:#ff8a3d"><b>② ${esc(L({ nl: 'Verder in het verhaal', en: 'On with the story' }))}</b><span>${esc(L({ nl: 'Na de laatste stap gaat het verhaal vanzelf naar het volgende hoofdstuk, of je klikt zelf rechtsonder op "Volgend".', en: 'After the last step the story moves on to the next chapter by itself, or you click "Next" at the bottom right yourself.' }))}</span></div>
    <div style="--c:#9b7bff"><b>③ ${esc(L({ nl: 'Zijsprong', en: 'Detour' }))}</b><span>${esc(L({ nl: 'Knoppen in de animatie en het uitlegpaneel brengen je naar iets wat ermee samenhangt. Het kruimelpad bovenaan en het verhaal links tonen dat je een zijsprong maakt; onderaan staat een knop terug naar het hoofdstuk.', en: 'Buttons in the animation and in the explanation panel take you to something related. The breadcrumb trail at the top and the story on the left show that you are on a detour; at the bottom there is a button back to the chapter.' }))}</span></div>
    <div style="--c:#93a0bb"><b>↩ ${esc(L({ nl: 'Terug', en: 'Back' }))}</b><span>${esc(L({ nl: '"Uitzoomen" (of Esc) gaat één niveau terug; het kruimelpad bovenaan toont de weg die je kwam; "Startmenu" brengt je naar de startpagina.', en: '"Zoom out" (or Esc) goes back one level; the breadcrumb trail at the top shows the way you came; "Main menu" takes you to the home page.' }))}</span></div>
  </div>
  <div class="grid" style="margin-top:14px">
    ${card('🏁', { nl: 'Startpagina', en: 'Home page' }, { nl: 'Kies een hoofdverhaal (menselijke cel of bacterie), een zijpad over één thema, de 3D-bibliotheek, of zoek meteen wat je wil zien.', en: 'Pick a main story (human cell or bacterium), a side path about one theme, the 3D library, or search right away for what you want to see.' })}
    ${card('🔎', { nl: 'Zoeken', en: 'Search' }, { nl: 'Typ een woord in het Nederlands of Engels, ook met een tikfout of een andere naam (bv. "crosslink" vindt alkylering). Je krijgt "Bedoel je…" en ziet in welk verhaal het zit. Sneltoets: <kbd>/</kbd>.', en: 'Type a word in Dutch or English, even with a typo or another name (e.g. "crosslink" finds alkylation). You get "Did you mean…" and see which story it is in. Shortcut: <kbd>/</kbd>.' })}
    ${card('🗺️', { nl: 'Inhoudskaart ("Waar ben ik?")', en: 'Content map ("Where am I?")' }, { nl: 'Het overzicht van alles: als verhalen met haltes, per onderwerp of van groot naar klein. Klik een onderwerp voor een korte uitleg en open dan de animatie. Hier ben je = geel omrand. Sneltoets: <kbd>M</kbd>. Ook op deze pagina, bij het tabblad Inhoudskaart.', en: 'The overview of everything: as stories with stops, by topic, or from large to small. Click a topic for a short explanation, then open the animation. You are here = yellow outline. Shortcut: <kbd>M</kbd>. Also on this page, in the Content map tab.' })}
    ${card('🧭', { nl: 'Bovenbalk en verhaal links', en: 'Top bar and story on the left' }, { nl: 'Bovenaan staat altijd in welk verhaal en hoofdstuk je zit (genummerd), met de zijsprongen in het geel. Links staat het hele verhaal als streepjes: één per hoofdstuk, in de kleur van zijn fase; het gele streepje is waar je nu bent. Klik een streepje om naar dat hoofdstuk te gaan. Met ☰ klapt het open: de fases met hun hoofdstukken, en onder het huidige hoofdstuk de stappen om aan te klikken. Ook "Waar ben ik?" staat daar.', en: 'At the top you always see which story and chapter you are in (numbered), with detours in yellow. On the left is the whole story as stripes: one per chapter, in the colour of its phase; the yellow stripe is where you are now. Click a stripe to go to that chapter. ☰ opens it: the phases with their chapters, and under the current chapter the steps to click. "Where am I?" is there too.' })}
    ${card('▶️', { nl: 'Afspeelbalk onderaan', en: 'Playback bar at the bottom' }, { nl: '▶ speelt en gaat vanzelf verder, ⏸ pauzeert echt, 🔁 herhaalt de huidige stap. ‹ › springen een stap. De bolletjes tonen de stappen (het brede is de huidige stap): klik om erheen te gaan; de naam van de stap staat ernaast. Rechts brengt "Volgend" je naar het volgende hoofdstuk. Onder ⚙ kies je hoe ver het vanzelf doorspeelt (het hele verhaal, tot het einde van het hoofdstuk, of elke stap herhalen), de leestijd na een stap, de snelheid, labels aan/uit en waar de uitleg van de stap staat. Die keuzes blijven bewaard.', en: '▶ plays and moves on by itself, ⏸ really pauses, 🔁 repeats the current step. ‹ › jump one step. The dots show the steps (the wide one is the current step): click to go there; the name of the step is next to them. On the right, "Next" takes you to the next chapter. Under ⚙ you choose how far it plays on by itself (the whole story, to the end of the chapter, or repeat each step), the reading time after a step, the speed, labels on/off and where the step explanation appears. These choices are kept.' })}
    ${card('📖', { nl: 'Uitlegpaneel', en: 'Explanation panel' }, { nl: 'Rechts, in tabbladen: "In het kort" in gewone taal (onderlijnde woorden kan je aantikken voor een uitleg van één zin) met de kleurenlegende, dan Wat, Zo werkt het, Kerncijfers en Waarom belangrijk, en onder Meer de stappen, waar je verder kan klikken, "Wat is hier vereenvoudigd?" en de bronnen. Met › klap je het paneel in tot een smal tabje "Uitleg" aan de rand, zodat de figuur groter wordt. De korte uitleg van elke stap staat onder de figuur; met ▾ (of C) klap je ze in tot een klein pilletje. Onder ⚙ kan je ze ook als versleepbaar venster op de figuur zetten of verbergen. Wat je in- of uitklapt, blijft bewaard.', en: 'On the right, in tabs: "In short" in plain language (underlined words can be tapped for a one-sentence explanation) with the colour legend, then What, How it works, Key numbers and Why it matters, and under More the steps, where to click on, "What is simplified here?" and the sources. With › you fold the panel into a narrow "Info" tab at the edge, so the figure gets bigger. The short explanation of each step is below the figure; ▾ (or C) folds it into a small pill. Under ⚙ you can also put it as a draggable window on the figure, or hide it. What you fold or unfold is kept.' })}
    ${card('⇄', { nl: 'Mens ⇄ Bacterie', en: 'Human ⇄ Bacterium' }, { nl: 'Verschijnt bovenaan als er een echte tegenhanger is (bv. menselijk ribosoom ⇄ bacterieel ribosoom). Eén klik toont hetzelfde proces in het andere organisme.', en: 'Appears at the top when there is a real counterpart (e.g. human ribosome ⇄ bacterial ribosome). One click shows the same process in the other organism.' })}
    ${card('🧬', { nl: 'Bekijk echt in 3D', en: 'View in real 3D' }, { nl: 'Bij een tekening die een echte structuur heeft, opent deze knop de gemeten 3D-structuur. Met "Atoomniveau" zie je waterstofbruggen, helices en bladen, en bij eiwitten een gekoppelde Ramachandran-grafiek.', en: 'For a drawing that has a real structure, this button opens the measured 3D structure. With "Atomic level" you see hydrogen bonds, helices and sheets, and for proteins a linked Ramachandran plot.' })}
    ${card('📚', { nl: '3D-bibliotheek', en: '3D library' }, { nl: 'Een aparte verzameling vormen van DNA, RNA en complexen in 3D, met weergaven, kleuren per onderdeel, "Wat is welk deel?", vergelijken naast elkaar, en zelf zoeken in de volledige PDB.', en: 'A separate collection of DNA, RNA and complex shapes in 3D, with display modes, colours per part, "Which part is which?", side-by-side comparison, and searching the full PDB yourself.' })}
    ${card('🏷️', { nl: 'Labels en taal', en: 'Labels and language' }, { nl: '"Labels" zet de namen in de figuur aan of uit. NL | EN wisselt de taal van alles.', en: '"Labels" turns the names in the figure on or off. NL | EN switches the language of everything.' })}
  </div></div></details>`;
}

/* ---------- tab 3: inhoudskaart ---------- */
function tabMap() {
  return `<h2>${esc(L({ nl: 'Inhoudskaart', en: 'Content map' }))}</h2>
  ${glance({ nl: 'Alles wat in Dogma zit, op één kaart.', en: 'Everything in Dogma, on one map.' })}
  <ol class="how3">
    <li><b>1</b>${esc(L({ nl: 'Zoek een onderwerp, of kies links een verhaal', en: 'Search for a topic, or pick a story on the left' }))}</li>
    <li><b>2</b>${esc(L({ nl: 'Klik een halte voor een korte uitleg', en: 'Click a stop for a short explanation' }))}</li>
    <li><b>3</b>${esc(L({ nl: 'Open de animatie', en: 'Open the animation' }))}</li>
  </ol>
  <p class="hint">${esc(L({ nl: 'In de app open je dezelfde kaart met "Waar ben ik?" of de toets M.', en: 'In the app you open the same map with "Where am I?" or the M key.' }))}</p>
  <div id="mapHost"></div>`;
}

/* ---------- tab 4: wetenschappelijke borging ---------- */
function tabSci() {
  const R = VERIF.rounds;
  const fmtDate = d => new Date(d + 'T12:00:00').toLocaleDateString(en ? 'en-GB' : 'nl-BE', { day: 'numeric', month: 'short', year: 'numeric' });
  const repLinks = nr => (REPORTS[nr] ?? []).map((f, i) => `<a href="${GH}${f}" target="_blank" rel="noopener">${esc(L({ nl: 'verslag', en: 'report' }))}${REPORTS[nr].length > 1 ? ' ' + (i + 1) : ''} ↗</a>`).join(' · ');
  const rounds = R.map(r => `<details class="acc"><summary>${esc(L(r.scope))} <small>${fmtDate(r.date)}</small></summary><div class="in">
      <p><span class="pill">${esc(L({ nl: 'methode', en: 'method' }))}</span>${esc(L(r.method))}</p>
      <p style="font-size:13px">${repLinks(r.nr)}${en ? ' <small>(reports in Dutch)</small>' : ''}</p></div></details>`).join('');

  return `<h2>${esc(L({ nl: 'Wetenschappelijke borging', en: 'Scientific quality assurance' }))}</h2>
  ${glance({ nl: 'Elke uitspraak steunt op een <b>wetenschappelijke bron die echt gelezen is</b>, en werd daarna door een <b>aparte controleur</b> nagekeken.', en: 'Every statement rests on a <b>scientific source that was actually read</b>, and was then checked by a <b>separate reviewer</b>.' },
    { nl: 'Wat vereenvoudigd is, staat er altijd bij. Wat niet in een bron staat, werd geschrapt.', en: 'What is simplified is always stated. What is not in a source was removed.' })}

  <h3>${esc(L({ nl: 'Van bron tot zin in de app', en: 'From source to sentence in the app' }))}</h3>
  <ol class="flow">
    <li><b>${esc(L({ nl: 'Opzoeken', en: 'Search' }))}</b><span>${esc(L({ nl: 'recente review of het oorspronkelijke artikel (PubMed)', en: 'recent review or the original paper (PubMed)' }))}</span></li>
    <li><b>${esc(L({ nl: 'Lezen', en: 'Read' }))}</b><span>${esc(L({ nl: 'de tekst zelf, niet enkel de titel', en: 'the text itself, not just the title' }))}</span></li>
    <li><b>${esc(L({ nl: 'Gewone taal', en: 'Plain language' }))}</b><span>${esc(L({ nl: 'één korte zin; details in het uitlegpaneel', en: 'one short sentence; details in the explanation panel' }))}</span></li>
    <li><b>${esc(L({ nl: 'Controleren', en: 'Check' }))}</b><span>${esc(L({ nl: 'een aparte controleur legt elke zin opnieuw naast de bron, in NL en EN', en: 'a separate reviewer compares every sentence with the source again, in Dutch and English' }))}</span></li>
  </ol>

  <h3>${esc(L({ nl: 'Welke bronnen?', en: 'Which sources?' }))}</h3>
  <div class="facts">
    ${fact('📄', { nl: `Artikels · ${nKind('paper')}`, en: `Papers · ${nKind('paper')}` }, { nl: 'peer-reviewed onderzoek en reviews: eerste keuze', en: 'peer-reviewed research and reviews: first choice' })}
    ${fact('📘', { nl: `Handboeken · ${nKind('book')}`, en: `Textbooks · ${nKind('book')}` }, { nl: 'universitaire handboeken (NCBI Bookshelf)', en: 'university textbooks (NCBI Bookshelf)' })}
    ${fact('🧊', { nl: `PDB-pagina’s · ${nKind('pdb')}`, en: `PDB pages · ${nKind('pdb')}` }, { nl: 'gemeten 3D-structuren en PDB-101', en: 'measured 3D structures and PDB-101' })}
    ${fact('🗄️', { nl: `Databanken · ${nKind('db')}`, en: `Databases · ${nKind('db')}` }, { nl: 'UniProt, Ensembl, ICTV, BioNumbers…', en: 'UniProt, Ensembl, ICTV, BioNumbers…' })}
    ${fact('🚫', { nl: 'Nooit als bron', en: 'Never a source' }, { nl: 'Wikipedia, blogs, populaire media, AI-samenvattingen', en: 'Wikipedia, blogs, popular media, AI summaries' })}
  </div>

  <h3>${esc(L({ nl: 'Ik wil…', en: 'I want to…' }))}</h3>
  <div class="tscroll"><table class="goals"><tbody>
    <tr><td><b>${esc(L({ nl: 'de bron van een uitspraak zien', en: 'see the source of a statement' }))}</b></td><td>${L({ nl: 'in de animatie: uitlegpaneel → <b>Meer</b> → Bronnen', en: 'in the animation: explanation panel → <b>More</b> → Sources' })}</td></tr>
    <tr><td><b>${esc(L({ nl: 'weten wat vereenvoudigd is', en: 'know what is simplified' }))}</b></td><td>${L({ nl: '<b>Wat is hier vereenvoudigd?</b> bij elke animatie', en: '<b>What is simplified here?</b> in every animation' })}</td></tr>
    <tr><td><b>${esc(L({ nl: 'alle bronnen doorzoeken', en: 'search all sources' }))}</b></td><td><a href="#src">${esc(L({ nl: 'tabblad Alle bronnen →', en: 'All sources tab →' }))}</a></td></tr>
    <tr><td><b>${esc(L({ nl: 'de controleverslagen lezen', en: 'read the verification reports' }))}</b></td><td>${L({ nl: 'hieronder, <b>Wat er gecontroleerd is</b>', en: 'below, <b>What was checked</b>' })}</td></tr>
    <tr><td><b>${esc(L({ nl: 'de grenzen van de app kennen', en: 'know the limits of the app' }))}</b></td><td>${L({ nl: 'hieronder, <b>Bekende grenzen</b>', en: 'below, <b>Known limitations</b>' })}</td></tr>
  </tbody></table></div>

  <h3>${esc(L({ nl: 'Alle details', en: 'All details' }))}</h3>
  <div class="stats" style="margin-top:0">
    <div><b>${SOURCES.length}</b><span>${esc(L({ nl: 'bronnen in de app', en: 'sources in the app' }))}</span></div>
    <div><b>${VERIF.totals.dois_checked}</b><span>${esc(L({ nl: "DOI's nagekeken via Crossref", en: 'DOIs checked via Crossref' }))}</span></div>
    <div><b>${nodeIds.filter(id => DETAILS[id]?.sources?.length).length}/${nodeIds.length}</b><span>${esc(L({ nl: 'onderwerpen met bronnen', en: 'topics with sources' }))}</span></div>
  </div>

  <details class="acc"><summary>1 · ${esc(L({ nl: 'Werkwijze in zes regels', en: 'Method in six rules' }))}</summary><div class="in"><ol class="steps">
    <li>${L({ nl: '<b>Bron per uitspraak.</b> Elk getal, elke naam en elke volgorde in een ondertitel, label of uitleg moet terug te vinden zijn in een bron die bij dat onderwerp in de app staat (uitlegpaneel → tabblad Meer → Bronnen).', en: '<b>A source per statement.</b> Every number, name and order in a caption, label or explanation must be traceable to a source listed for that topic in the app (explanation panel → More tab → Sources).' })}</li>
    <li>${L({ nl: '<b>Gelezen, niet enkel geciteerd.</b> Een bron telt pas als de tekst echt opgehaald en gelezen is (samenvatting via PubMed, volledige tekst via PubMed Central). Wat niet in de gelezen tekst staat, wordt herschreven of geschrapt, ook als het “waarschijnlijk klopt”.', en: '<b>Read, not just cited.</b> A source only counts once its text has actually been retrieved and read (abstract via PubMed, full text via PubMed Central). What is not in the text that was read is rewritten or removed, even if it is “probably right”.' })}</li>
    <li>${L({ nl: '<b>Onafhankelijke controle.</b> Na het bouwen legt een afzonderlijke controleur, die de tekst niet zelf schreef, elke uitspraak opnieuw tegen de bron. Dat is voor de hele app gebeurd: alle verhalen, zijpaden, uitlegpanelen, de woordenlijst en de 3D-bibliotheek. Daarna wordt nagekeken of elke correctie juist en in beide talen verwerkt is.', en: '<b>Independent check.</b> After building, a separate reviewer who did not write the text checks every statement against its source again. This was done for the whole app: all stories, side paths, explanation panels, the glossary and the 3D library. Afterwards it is checked that every correction was made correctly and in both languages.' })}</li>
    <li>${L({ nl: '<b>3D = echte data.</b> Elke PDB-code wordt via de officiële RCSB-databank gecontroleerd (titel, organisme, methode). Ketens, residuen en afstanden worden in de coördinatenbestanden zelf nagemeten voor er een label bij komt.', en: '<b>3D = real data.</b> Every PDB code is checked via the official RCSB database (title, organism, method). Chains, residues and distances are measured in the coordinate files themselves before a label is added.' })}</li>
    <li>${L({ nl: '<b>Eerlijk over eenvoud en onzekerheid.</b> Elke animatie heeft een vakje "Wat is hier vereenvoudigd?". Waar de wetenschap het nog niet weet, zegt de tekst dat ook (bv. "wordt nog onderzocht").', en: '<b>Honest about simplification and uncertainty.</b> Every animation has a box "What is simplified here?". Where science does not yet know, the text says so (e.g. "is still being studied").' })}</li>
    <li>${L({ nl: '<b>Organisme vermeld.</b> Veel details verschillen tussen mens, gist en bacterie. Elke animatie zegt voor welk organisme ze geldt, en uit welk organisme een 3D-structuur komt.', en: '<b>Organism stated.</b> Many details differ between humans, yeast and bacteria. Every animation states which organism it applies to, and which organism a 3D structure comes from.' })}</li>
  </ol></div></details>

  <details class="acc"><summary>2 · ${esc(L({ nl: 'Welke bronnen wel, en welke niet', en: 'Which sources are used, and which are not' }))} <small>${esc(L({ nl: 'rangorde van betrouwbaarheid', en: 'order of reliability' }))}</small></summary><div class="in"><div class="tiers">
    <div class="tier"><div class="lv">${esc(L({ nl: 'Artikels', en: 'Papers' }))}<small>${nKind('paper')} ${esc(L({ nl: 'in de app', en: 'in the app' }))}</small></div><p>${esc(L({ nl: 'Peer-reviewed onderzoeksartikels en overzichtsartikels (reviews) in wetenschappelijke tijdschriften, opgezocht via PubMed en gelezen via PubMed Central of Europe PMC. Eerste keuze voor getallen, mechanismen en recente inzichten. Bij voorkeur een recente review van erkende experts; voor een ontdekking het oorspronkelijke artikel.', en: 'Peer-reviewed research papers and review articles in scientific journals, found via PubMed and read via PubMed Central or Europe PMC. First choice for numbers, mechanisms and recent insights. Preferably a recent review by recognised experts; for a discovery, the original paper.' }))}</p></div>
    <div class="tier"><div class="lv">${esc(L({ nl: 'Handboeken', en: 'Textbooks' }))}<small>${nKind('book')} ${esc(L({ nl: 'in de app', en: 'in the app' }))}</small></div><p>${esc(L({ nl: 'Gratis universitaire handboeken op NCBI Bookshelf, zoals Alberts (Molecular Biology of the Cell), Lodish, Berg en Cooper, plus Cell Biology by the Numbers. Basis voor algemene processen. Omdat Bookshelf soms een captcha toonde, is elke uitspraak die enkel op een handboek steunde, opnieuw bevestigd met een gelezen artikel of herschreven.', en: 'Free university textbooks on NCBI Bookshelf, such as Alberts (Molecular Biology of the Cell), Lodish, Berg and Cooper, plus Cell Biology by the Numbers. The basis for general processes. Because Bookshelf sometimes showed a captcha, every statement that relied only on a textbook was confirmed again with a read paper, or rewritten.' }))}</p></div>
    <div class="tier"><div class="lv">${esc(L({ nl: 'Structuurdata', en: 'Structure data' }))}<small>${nKind('pdb')} ${esc(L({ nl: 'pagina’s in de app', en: 'pages in the app' }))}</small></div><p>${esc(L({ nl: 'RCSB Protein Data Bank (gemeten structuren met auteurs, methode en resolutie) en PDB-101, de educatieve kant van de PDB.', en: 'RCSB Protein Data Bank (measured structures with authors, method and resolution) and PDB-101, the educational side of the PDB.' }))}</p></div>
    <div class="tier"><div class="lv">${esc(L({ nl: 'Databanken', en: 'Databases' }))}<small>${nKind('db')} ${esc(L({ nl: 'in de app', en: 'in the app' }))}</small></div><p>${esc(L({ nl: 'Gecureerde wetenschappelijke databanken: UniProt (eiwitten), GENCODE en Ensembl (genen), ICTV en ViralZone (virussen), BioNumbers (getallen uit de celbiologie).', en: 'Curated scientific databases: UniProt (proteins), GENCODE and Ensembl (genes), ICTV and ViralZone (viruses), BioNumbers (numbers from cell biology).' }))}</p></div>
    <div class="tier no"><div class="lv">${esc(L({ nl: 'Niet gebruikt', en: 'Not used' }))}<small>${esc(L({ nl: 'nooit als bron', en: 'never as a source' }))}</small></div><p>${esc(L({ nl: 'Wikipedia, blogs, populaire media, lesnotities en samenvattingen door AI. Zulke teksten mogen hoogstens helpen om de echte bron te vinden; in de app staat dan altijd die echte bron. Een getal dat alleen “uit het hoofd” of uit een opdracht kwam, telt niet: het moet in een gelezen bron staan.', en: 'Wikipedia, blogs, popular media, lecture notes and AI summaries. Such texts may at most help to find the real source; the app then always lists that real source. A number that came only “from memory” or from an instruction does not count: it must be in a source that was read.' }))}</p></div>
  </div></div></details>

  <details class="acc"><summary>3 · ${esc(L({ nl: 'Wat geschrapt of afgewezen werd, en waarom', en: 'What was removed or rejected, and why' }))} <small>${VERIF.rejected.length} ${esc(L({ nl: 'concrete gevallen', en: 'concrete cases' }))}</small></summary><div class="in"><ul>
    ${VERIF.rejected.map(x => `<li>${esc(L(x))}</li>`).join('')}</ul></div></details>

  <details class="acc"><summary>4 · ${esc(L({ nl: 'Hoe een bron een zin in de app wordt', en: 'How a source becomes a sentence in the app' }))}</summary><div class="in"><ol class="steps">
    <li>${L({ nl: '<b>Opzoeken.</b> Voor elk onderwerp worden een recente review en waar nodig het oorspronkelijke artikel gezocht in PubMed; voor structuren de PDB-entry met de beste resolutie en het juiste organisme.', en: '<b>Search.</b> For each topic a recent review and, where needed, the original paper are looked up in PubMed; for structures, the PDB entry with the best resolution and the right organism.' })}</li>
    <li>${L({ nl: '<b>Lezen en noteren.</b> De samenvatting of volledige tekst wordt opgehaald; getallen worden letterlijk overgenomen met de bron erbij (met PubMed-, PMC- of DOI-nummer).', en: '<b>Read and note.</b> The abstract or full text is retrieved; numbers are taken over literally together with the source (with a PubMed, PMC or DOI number).' })}</li>
    <li>${L({ nl: '<b>Vertalen naar gewone taal.</b> De ondertitel krijgt één korte zin met hooguit één nieuw vakwoord. Het vakjargon, de exacte getallen en de nuances gaan naar de tabbladen van het uitlegpaneel.', en: '<b>Translate into plain language.</b> The caption gets one short sentence with at most one new technical term. The jargon, exact numbers and nuances go to the tabs of the explanation panel.' })}</li>
    <li>${L({ nl: '<b>Vereenvoudiging benoemen.</b> Wat in de animatie anders is dan in de cel (schaal, snelheid, aantal moleculen, weggelaten tussenstappen), komt in "Wat is hier vereenvoudigd?".', en: '<b>Name the simplification.</b> What differs in the animation from the real cell (scale, speed, number of molecules, omitted intermediate steps) goes into "What is simplified here?".' })}</li>
    <li>${L({ nl: '<b>Controleren.</b> Een aparte controleronde vergelijkt elke zin, in beide talen, opnieuw met de bron. Fouten, te stellige uitspraken en verschillen tussen NL en EN worden verbeterd; het verslag wordt bewaard.', en: '<b>Check.</b> A separate verification round compares every sentence, in both languages, with the source again. Errors, overconfident statements and differences between Dutch and English are corrected; the report is kept.' })}</li>
    <li>${L({ nl: '<b>Bronnen zelf nakijken.</b> Elke DOI is via Crossref opgevraagd om te bevestigen dat ze bestaat en bij de vermelde publicatie hoort; elke PDB-code via de RCSB-databank.', en: '<b>Check the sources themselves.</b> Every DOI was looked up via Crossref to confirm that it exists and belongs to the publication named; every PDB code via the RCSB database.' })}</li>
  </ol></div></details>

  <details class="acc"><summary>5 · ${esc(L({ nl: 'Wat er gecontroleerd is, met de verslagen', en: 'What was checked, with the reports' }))}</summary><div class="in">${rounds}
    <p style="font-size:13.5px">${esc(L({ nl: 'Ook nagekeken (13-11-2026): alle DOI’s in de app via Crossref en alle structuren van de 3D-bibliotheek tegen hun RCSB-gegevens. Daarbij werden enkele formuleringen preciezer gemaakt.', en: 'Also checked (13-11-2026): all DOIs in the app via Crossref and all structures of the 3D library against their RCSB data. Some wordings were made more precise in the process.' }))}</p></div></details>

  <details class="acc"><summary>6 · ${esc(L({ nl: 'Werkregels van de controleurs', en: 'Working rules of the reviewers' }))} <small>${VERIF.principles.length}</small></summary><div class="in"><ul>
    ${VERIF.principles.map(x => `<li>${esc(L(x))}</li>`).join('')}</ul></div></details>

  <details class="acc"><summary>7 · ${esc(L({ nl: 'Alle 3D-structuren', en: 'All 3D structures' }))} <small>${pdbSet.size} ${esc(L({ nl: 'PDB-codes', en: 'PDB codes' }))}</small></summary><div class="in">
    <p>${esc(L({ nl: 'Elke code opent de officiële RCSB-pagina met auteurs, methode, resolutie en het oorspronkelijke artikel.', en: 'Each code opens the official RCSB page with authors, method, resolution and the original paper.' }))}</p>
    <p>${[...pdbSet].sort().map(p => `<a class="pill" href="https://www.rcsb.org/structure/${p}" target="_blank" rel="noopener">${p}</a>`).join(' ')}</p></div></details>

  <details class="acc"><summary>8 · ${esc(L({ nl: 'Bekende grenzen', en: 'Known limitations' }))}</summary><div class="in"><ul>
    <li>${esc(L({ nl: '2D-animaties zijn schematisch: groottes en afstanden zijn niet op schaal, en processen zijn meestal sterk vertraagd (soms versneld). De echte grootte staat onderaan bij elke animatie, en ook de echte duur waar die gekend is en een zin heeft; anders staat er bv. "schematisch" of "geen tijdsas".', en: '2D animations are schematic: sizes and distances are not to scale, and processes are usually strongly slowed down (sometimes sped up). The real size is shown at the bottom of each animation, and also the real duration where it is known and meaningful; otherwise it says e.g. "schematic" or "no time axis".' }))}</li>
    <li>${esc(L({ nl: 'Bij zeer grote 3D-complexen (zoals het ribosoom) is (een deel van) de structuur ingekort tot één bolletje per bouwsteen om snel te laden; dat staat in de figuur vermeld.', en: 'For very large 3D complexes (such as the ribosome), (part of) the structure is reduced to one bead per building block to load quickly; the figure says so.' }))}</li>
    <li>${esc(L({ nl: 'De waterstofbruggen op atoomniveau volgen de energieformule van DSSP (Kabsch & Sander 1983), opnieuw geprogrammeerd in de app; het is geen uitvoer van het DSSP-programma zelf.', en: 'The hydrogen bonds at the atomic level follow the DSSP energy formula (Kabsch & Sander 1983), re-implemented in the app; it is not output of the DSSP program itself.' }))} ${esc(L({ nl: 'Vergeleken met de secundaire structuur die de auteurs van ubiquitine (PDB 1UBQ) zelf in de PDB vermelden: de α-helix (23–34) is identiek en de vijf β-strengen liggen op dezelfde plaats, aan de uiteinden soms 1–2 aminozuren korter. De korte 3₁₀-helix (56–59) wordt niet apart getoond.', en: 'Compared with the secondary structure that the authors of ubiquitin (PDB 1UBQ) themselves deposited in the PDB: the α-helix (23–34) is identical and the five β-strands lie in the same places, sometimes 1–2 amino acids shorter at the ends. The short 3₁₀ helix (56–59) is not shown separately.' }))}</li>
    <li>${esc(L({ nl: 'De wetenschap staat niet stil. Bronnen hebben een jaartal; nieuwere inzichten kunnen details veranderen.', en: 'Science does not stand still. Sources carry a year; newer insights can change details.' }))}</li>
  </ul></div></details>`;
}

/* ---------- tab 5: alle bronnen ---------- */
const KIND = { paper: { nl: 'Artikels', en: 'Papers' }, book: { nl: 'Handboeken', en: 'Textbooks' }, pdb: { nl: 'PDB-pagina’s', en: 'PDB pages' }, db: { nl: 'Databanken', en: 'Databases' } };
function tabSrc() {
  return `<h2>${esc(L({ nl: 'Alle bronnen', en: 'All sources' }))}</h2>
  <p class="sub">${esc(L({ nl: `Deze lijst wordt bij het openen opgebouwd uit de bronnen die echt in de app staan: ${SOURCES.length} verschillende bronnen. Onder elke bron zie je waar ze gebruikt wordt; klik om die animatie of dat 3D-item te openen. De ${nKind('pdb')} PDB-pagina’s zijn ${pdbStructPages} structuurpagina’s en ${pdbOther} uitlegartikels (PDB-101). Dat is iets anders dan de ${pdbSet.size} 3D-structuren bovenaan: dat zijn de structuren die je in de app zelf kan draaien.`, en: `This list is built when the page opens from the sources that are actually in the app: ${SOURCES.length} distinct sources. Under each source you see where it is used; click to open that animation or 3D item. The ${nKind('pdb')} PDB pages are ${pdbStructPages} structure pages and ${pdbOther} explainer articles (PDB-101). That is not the same as the ${pdbSet.size} 3D structures at the top: those are the structures you can rotate yourself in the app.` }))}</p>
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
    <div class="card"><h4>${esc(L({ nl: 'Schaal en tijd', en: 'Scale and time' }))}</h4><p>${esc(L({ nl: 'Onderaan elke animatie staat de echte grootte, en de echte duur waar die gekend is. Een balkje toont het zoomniveau: van de hele cel tot de atomen.', en: 'At the bottom of every animation you see the real size, and the real duration where it is known. A small bar shows the zoom level: from the whole cell to the atoms.' }))}</p></div>
    <div class="card"><h4>${esc(L({ nl: 'Wat oplicht, kan je aanklikken', en: 'What lights up can be clicked' }))}</h4><p>${esc(L({ nl: 'Een onderdeel met een gloed of een label is klikbaar en opent het detail.', en: 'A part with a glow or a label is clickable and opens the detail.' }))}</p></div>
    <div class="card"><h4>${esc(L({ nl: 'Letters van DNA en RNA', en: 'Letters of DNA and RNA' }))}</h4><p>${bases.map(([b, c]) => `<span class="pill" style="background:${c}22;color:${c}">${b}</span>`).join('')}</p></div>
  </div>`;
}

/* ---------- opbouw ---------- */
document.title = L(T.title);
for (const id of ['navHome', 'navAtlas', 'eyebrow', 'h1', 'lead']) $(id).textContent = L(T[id]);
$('langBox').append(langSwitch());
$('stats').innerHTML = [[nodeIds.length, T.sTopics], [lineCount, T.sLines], [SOURCES.length, T.sSrc], [pdbSet.size, T.sPdb]]
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

$('foot').innerHTML = L({ nl: `Dogma · inhoud in controlerondes nagekeken tegen wetenschappelijke bronnen ·broncode en verslagen op <a href="https://github.com/keanuvanhoutte/van-dna-tot-eiwit" target="_blank" rel="noopener">GitHub</a> · 3D-structuren: <a href="https://www.rcsb.org" target="_blank" rel="noopener">RCSB PDB</a> · viewer: <a href="https://doi.org/10.1093/bioinformatics/btu829" target="_blank" rel="noopener">3Dmol.js</a>`,
  en: `Dogma · content checked against scientific sources in verification rounds ·source code and reports on <a href="https://github.com/keanuvanhoutte/van-dna-tot-eiwit" target="_blank" rel="noopener">GitHub</a> · 3D structures: <a href="https://www.rcsb.org" target="_blank" rel="noopener">RCSB PDB</a> · viewer: <a href="https://doi.org/10.1093/bioinformatics/btu829" target="_blank" rel="noopener">3Dmol.js</a>` });
