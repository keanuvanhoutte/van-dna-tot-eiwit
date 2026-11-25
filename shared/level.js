/*
 * Moeilijkheidsgraad (niveau) — één keuze voor de hele app, bewaard op dit toestel.
 *   hobby     geen academische achtergrond: enkel de kernstappen, korte uitleg (1 zin, zonder vaktermen tussen haakjes),
 *             enkel labels naar de hoofdverhalen, zijpaneel = "In het kort" (geen verdieping)
 *   secundair kern + belangrijke tussenstappen, volledige uitleg, verdieping zonder kerncijfers
 *   bachelor  alles (zoals de app altijd was)
 *   master    alles, met de verdieping (cijfers, bronnen) meteen open
 * Welke stap bij welk niveau hoort: shared/levels.js (STEP_LEVEL). Overschrijfbaar met ?level=… (voor tests).
 * Gekozen op de startpagina (eerste bezoek), te wijzigen via de knop in het startmenu of ⚙ in de animaties.
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

const UI = {
  head: { nl: 'Hoeveel weet je al?', en: 'How much do you already know?' },
  sub: { nl: 'Kies je niveau. De app toont dan meer of minder stappen en uitleg. Je kunt dit altijd aanpassen in het startmenu of via ⚙.',
    en: 'Choose your level. The app then shows more or fewer steps and explanations. You can always change it in the main menu or via ⚙.' },
  close: { nl: 'Sluiten', en: 'Close' },
};

let css = false;
function addCss() {
  if (css) return; css = true;
  const s = document.createElement('style');
  s.textContent = `
  .lvlback { position: fixed; inset: 0; z-index: 1000; background: rgba(3,6,14,.72); backdrop-filter: blur(4px); display: grid; place-items: center; padding: 16px; }
  .lvlbox { width: min(620px, 100%); background: var(--bg-2, #0d1426); border: 1px solid var(--line, rgba(160,180,220,.16)); border-radius: 16px; padding: 26px 26px 22px; color: var(--text, #e8edf7); font-family: var(--font, Inter, system-ui, sans-serif); box-shadow: 0 24px 70px rgba(0,0,0,.55); }
  .lvlbox h2 { margin: 0 0 6px; font-size: 24px; letter-spacing: -.01em; }
  .lvlbox p.ls { margin: 0 0 18px; color: var(--muted, #93a0bb); font-size: 14.5px; line-height: 1.5; }
  .lvlgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .lvlopt { all: unset; box-sizing: border-box; cursor: pointer; display: flex; gap: 12px; align-items: flex-start; padding: 14px; border-radius: 12px; border: 1px solid var(--line, rgba(160,180,220,.16)); background: rgba(255,255,255,.03); transition: border-color .15s, background .15s; }
  .lvlopt:hover, .lvlopt:focus-visible { border-color: var(--accent, #7cc4ff); background: rgba(124,196,255,.08); }
  .lvlopt.on { border-color: var(--accent, #7cc4ff); background: rgba(124,196,255,.12); }
  .lvlopt i { font-style: normal; font-size: 26px; line-height: 1; }
  .lvlopt b { display: block; font-size: 15.5px; margin-bottom: 3px; }
  .lvlopt span { font-size: 13px; line-height: 1.45; color: var(--muted, #93a0bb); }
  .lvlx { all: unset; cursor: pointer; float: right; font-size: 13px; color: var(--muted, #93a0bb); }
  .lvlx:hover { color: var(--text, #e8edf7); }
  @media (max-width: 560px) { .lvlgrid { grid-template-columns: 1fr; } }`;
  document.head.append(s);
}

/* keuzevenster; first = eerste bezoek (geen sluitknop: eerst kiezen). onPick(id) na de keuze. */
export function openLevelChooser({ first = false, onPick } = {}) {
  addCss();
  document.querySelector('.lvlback')?.remove();
  const cur = chosenLevel();
  const back = document.createElement('div'); back.className = 'lvlback';
  back.innerHTML = `<div class="lvlbox" role="dialog" aria-modal="true" aria-labelledby="lvlH">
    ${first ? '' : `<button class="lvlx" type="button">${L(UI.close)} ✕</button>`}
    <h2 id="lvlH">${L(UI.head)}</h2><p class="ls">${L(UI.sub)}</p>
    <div class="lvlgrid">${LEVELS.map(l => `<button type="button" class="lvlopt ${l.id === cur ? 'on' : ''}" data-l="${l.id}"><i>${l.ico}</i><div><b>${L(l.t)}</b><span>${L(l.d)}</span></div></button>`).join('')}</div>
  </div>`;
  const close = () => { back.remove(); document.removeEventListener('keydown', esc); };
  const esc = e => { if (e.key === 'Escape' && !first) close(); };
  document.addEventListener('keydown', esc);
  back.querySelector('.lvlx')?.addEventListener('click', close);
  if (!first) back.addEventListener('click', e => { if (e.target === back) close(); });
  back.querySelectorAll('.lvlopt').forEach(b => b.onclick = () => { saveLevel(b.dataset.l); close(); onPick?.(b.dataset.l); });
  document.body.append(back);
  (back.querySelector('.lvlopt.on') ?? back.querySelector('.lvlopt')).focus();
  return back;
}
