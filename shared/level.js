/*
 * Moeilijkheidsgraad (niveau) — één keuze voor de hele app, bewaard op dit toestel.
 *   hobby     geen academische achtergrond: enkel de kernstappen, korte uitleg (1 zin, zonder vaktermen tussen haakjes),
 *             enkel labels naar de hoofdverhalen, zijpaneel = "In het kort" (geen verdieping)
 *   secundair kern + belangrijke tussenstappen, volledige uitleg, verdieping zonder kerncijfers
 *   bachelor  alles (zoals de app altijd was)
 *   master    alles, met de verdieping (cijfers, bronnen) meteen open
 * Welke stap bij welk niveau hoort: shared/levels.js (STEP_LEVEL). Overschrijfbaar met ?level=… (voor tests).
 * Te kiezen met een keuzelijst in het startmenu en in ⚙ van de animaties (geen venster bij het openen); niets gekozen = bachelor.
 * Elke keuzelijst heeft als laatste optie "Wat toont elk niveau?": die opent een uitlegvenster.
 */
import { L } from './i18n.js';

export const LEVEL_KEY = 'dna-app-level';
export const LEVELS = [
  { id: 'hobby', rank: 1, ico: '🌱', t: { nl: 'Hobbyist', en: 'Hobbyist' },
    d: { nl: 'Geen academische achtergrond. Enkel de kern, in korte zinnen.', en: 'No academic background. Just the core, in short sentences.' } },
  { id: 'secundair', rank: 2, ico: '🎒', t: { nl: 'Secundair onderwijs', en: 'Secondary school' },
    d: { nl: 'De kern en de belangrijkste tussenstappen, met eenvoudige uitleg.', en: 'The core and the main in-between steps, with simple explanations.' } },
  { id: 'bachelor', rank: 3, ico: '🎓', t: { nl: 'Bachelor', en: 'Bachelor' },
    d: { nl: 'Alle stappen en de volledige uitleg.', en: 'All steps and the full explanation.' } },
  { id: 'master', rank: 4, ico: '🔬', t: { nl: 'Masterstudent', en: 'Master’s student' },
    d: { nl: 'Alles, met de verdieping (cijfers, bronnen) meteen open.', en: 'Everything, with the in-depth part (numbers, sources) open right away.' } },
];
const byId = id => LEVELS.find(l => l.id === id);

/* gekozen niveau, of null als er nog niets gekozen is */
export function chosenLevel() {
  const q = new URLSearchParams(location.search).get('level');
  if (byId(q)) return q;
  try { const v = localStorage.getItem(LEVEL_KEY); if (byId(v)) return v; } catch {}
  return null;
}
export const level = chosenLevel() ?? 'bachelor';          // niets gekozen = zoals de app altijd was
export const levelInfo = id => byId(id ?? level);
export const rank = byId(level).rank;
export function saveLevel(id) { try { localStorage.setItem(LEVEL_KEY, id); } catch {} }

/* wat elk niveau wel en niet toont (uitlegvenster) */
const SHOW = {
  hobby: {
    yes: { nl: ['Enkel de kernstappen van elke animatie (ongeveer de helft)', 'Per stap één korte zin', '“In het kort” in eenvoudige taal', 'Labels naar de hoofdstukken van het verhaal', 'De bronnen'],
      en: ['Only the core steps of each animation (about half)', 'One short sentence per step', '“In short” in plain language', 'Labels to the chapters of the story', 'The sources'] },
    no: { nl: ['Tussenstappen en details', 'Vaktermen tussen haakjes', 'De verdieping (wat, zo werkt het, kerncijfers, waarom belangrijk)', 'Zijsprongen en de lijst met 3D-structuren (PDB) in het zijpaneel', 'Labels naar zijsprongen (klikken op de figuur kan wel)'],
      en: ['In-between steps and details', 'Technical terms in brackets', 'The in-depth part (what, how it works, key numbers, why it matters)', 'Side paths and the 3D structure list (PDB) in the side panel', 'Labels to side paths (you can still click the figure)'] } },
  secundair: {
    yes: { nl: ['De kernstappen en de belangrijkste tussenstappen (ongeveer 4 op 5)', 'De volledige uitleg bij elke stap', 'De verdieping: wat, zo werkt het, waarom belangrijk, bronnen', 'Alle labels en zijsprongen'],
      en: ['The core steps and the main in-between steps (about 4 in 5)', 'The full explanation for each step', 'The in-depth part: what, how it works, why it matters, sources', 'All labels and side paths'] },
    no: { nl: ['Detailstappen (moleculaire details, uitzonderingen, getallen)', 'Kerncijfers', 'De lijst met 3D-structuren (PDB) in het zijpaneel'],
      en: ['Detail steps (molecular details, exceptions, numbers)', 'Key numbers', 'The 3D structure list (PDB) in the side panel'] } },
  bachelor: {
    yes: { nl: ['Alle stappen van elke animatie', 'De volledige uitleg', 'De verdieping (dichtgeklapt: je opent ze zelf)', 'Kerncijfers, bronnen, 3D-structuren (PDB)'],
      en: ['All steps of every animation', 'The full explanation', 'The in-depth part (folded: you open it yourself)', 'Key numbers, sources, 3D structures (PDB)'] },
    no: { nl: ['Niets wordt weggelaten'], en: ['Nothing is left out'] } },
  master: {
    yes: { nl: ['Alles zoals bij bachelor', 'De verdieping staat meteen open, met “zo werkt het” en de kerncijfers'],
      en: ['Everything as in bachelor', 'The in-depth part is open right away, with “how it works” and the key numbers'] },
    no: { nl: ['Niets wordt weggelaten'], en: ['Nothing is left out'] } },
};
const UI = {
  info: { nl: 'ℹ️ Wat toont elk niveau?', en: 'ℹ️ What does each level show?' },
  head: { nl: 'Moeilijkheidsgraad', en: 'Difficulty level' },
  sub: { nl: 'Het niveau bepaalt hoeveel stappen, uitleg en labels je ziet. De inhoud is op elk niveau dezelfde en klopt; je kiest enkel hoeveel detail. Je keuze wordt bewaard op dit toestel.',
    en: 'The level decides how many steps, explanations and labels you see. The content is the same and correct at every level; you only choose how much detail. Your choice is kept on this device.' },
  yes: { nl: 'Wel', en: 'Shown' }, no: { nl: 'Niet', en: 'Not shown' },
  now: { nl: 'jouw keuze', en: 'your choice' },
  close: { nl: 'Sluiten', en: 'Close' },
};

let css = false;
function addCss() {
  if (css) return; css = true;
  const s = document.createElement('style');
  s.textContent = `
  .lvlback { position: fixed; inset: 0; z-index: 1000; background: rgba(3,6,14,.72); backdrop-filter: blur(4px); display: grid; place-items: center; padding: 16px; }
  .lvlbox { width: min(760px, 100%); max-height: calc(100vh - 32px); overflow: auto; box-sizing: border-box; background: var(--bg-2, #0d1426); border: 1px solid var(--line, rgba(160,180,220,.16)); border-radius: 16px; padding: 24px 24px 20px; color: var(--text, #e8edf7); font-family: var(--font, Inter, system-ui, sans-serif); box-shadow: 0 24px 70px rgba(0,0,0,.55); text-align: left; white-space: normal; }
  .lvlbox h2 { margin: 0 0 6px; font-size: 22px; }
  .lvlbox p.ls { margin: 0 0 16px; color: var(--muted, #93a0bb); font-size: 14px; line-height: 1.5; }
  .lvlgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .lvlcard { border: 1px solid var(--line, rgba(160,180,220,.16)); border-radius: 12px; padding: 12px 14px; background: rgba(255,255,255,.03); }
  .lvlcard.on { border-color: var(--accent, #7cc4ff); background: rgba(124,196,255,.08); }
  .lvlcard h3 { margin: 0 0 2px; font-size: 15.5px; }
  .lvlcard h3 small { font-weight: 500; font-size: 11.5px; color: var(--accent, #7cc4ff); }
  .lvlcard .ld { margin: 0 0 8px; font-size: 12.5px; color: var(--muted, #93a0bb); line-height: 1.4; }
  .lvlcard b.k { display: block; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; margin: 6px 0 2px; }
  .lvlcard b.k.y { color: #7fdc6a; } .lvlcard b.k.n { color: #ff8f8f; }
  .lvlcard ul { margin: 0; padding-left: 18px; font-size: 13px; line-height: 1.45; }
  .lvlx { all: unset; cursor: pointer; float: right; font-size: 13px; color: var(--muted, #93a0bb); }
  .lvlx:hover, .lvlx:focus-visible { color: var(--text, #e8edf7); }
  @media (max-width: 620px) { .lvlgrid { grid-template-columns: 1fr; } }`;
  document.head.append(s);
}

/* uitlegvenster: per niveau wat er wel en niet getoond wordt (enkel als de gebruiker erom vraagt) */
export function openLevelInfo() {
  addCss();
  document.querySelector('.lvlback')?.remove();
  const cur = chosenLevel() ?? 'bachelor';
  const li = a => `<ul>${L(a).map(x => `<li>${x}</li>`).join('')}</ul>`;
  const back = document.createElement('div'); back.className = 'lvlback';
  back.innerHTML = `<div class="lvlbox" role="dialog" aria-modal="true" aria-labelledby="lvlH">
    <button class="lvlx" type="button">${L(UI.close)} ✕</button>
    <h2 id="lvlH">${L(UI.head)}</h2><p class="ls">${L(UI.sub)}</p>
    <div class="lvlgrid">${LEVELS.map(l => `<div class="lvlcard ${l.id === cur ? 'on' : ''}">
      <h3>${l.ico} ${L(l.t)}${l.id === cur ? ` <small>· ${L(UI.now)}</small>` : ''}</h3><p class="ld">${L(l.d)}</p>
      <b class="k y">✓ ${L(UI.yes)}</b>${li(SHOW[l.id].yes)}<b class="k n">✕ ${L(UI.no)}</b>${li(SHOW[l.id].no)}</div>`).join('')}</div>
  </div>`;
  const close = () => { back.remove(); document.removeEventListener('keydown', esc, true); };
  const esc = e => { if (e.key === 'Escape') { e.stopPropagation(); close(); } };
  document.addEventListener('keydown', esc, true);
  back.querySelector('.lvlx').onclick = close;
  back.addEventListener('click', e => { e.stopPropagation(); if (e.target === back) close(); });
  document.body.append(back);
  back.querySelector('.lvlx').focus();
}

/* keuzelijst: de vier niveaus + als laatste optie de uitleg. onChange(id) na een nieuwe keuze (al bewaard). */
export function levelSelect(sel, { onChange } = {}) {
  sel.innerHTML = LEVELS.map(l => `<option value="${l.id}">${l.ico} ${L(l.t)}</option>`).join('') +
    `<option disabled>──────────</option><option value="info">${L(UI.info)}</option>`;
  const cur = () => chosenLevel() ?? 'bachelor';
  sel.value = cur();
  sel.title = L(UI.head);
  sel.addEventListener('change', () => {
    if (sel.value === 'info') { sel.value = cur(); openLevelInfo(); return; }
    saveLevel(sel.value); onChange?.(sel.value);
  });
  return sel;
}
