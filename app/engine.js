/*
 * Engine v2 — één doorlopend, doorklikbaar verhaal.
 *  - klok met stappen (afspelen/pauze, stap vooruit/achteruit, snelheid), ondertiteling per stap
 *  - camera die per stap inzoomt (cam in de stap), vloeiende overgang tussen scènes
 *  - verhaallijn (STORY), overzichtskaart "Waar ben ik?", uitzoomen naar het bovenliggende niveau, start
 *  - zijpaneel met uitgebreide uitleg (shared/details) en bronnen
 */
import { NODES, STAGES, SCALES, title, sub, summary, stageTitle, scaleTitle } from '../shared/content.js';
import { L, U, statusText, langSwitch, lang } from '../shared/i18n.js';
import { DETAILS } from '../shared/details/index.js';
import { GLOSSARY } from '../shared/glossary.js';
import { SCENES } from './scenes/index.js';
import { LINES, LINE_KEYS, MAIN_KEYS, SIDE_KEYS } from './story.js';
import { orgButton } from './orgswitch.js';
import { makeSearch } from '../shared/search.js';
import { STEP_TAGS } from '../shared/steptags.js';
import { colourWords } from '../shared/colourwords.js';
import { mountSearch, whereText, lineColor } from '../shared/searchbox.js';
import { S_EN, SCALES_EN } from '../shared/graph.en.js';
import { mountMap } from '../shared/contentmap.js';
import { LINKS } from '../shared/links.js';

/* ---------- verhaallijnen ---------- */
const LINE_KEY = 'dna-app-story';
let line = (() => {
  const u = new URLSearchParams(location.search).get('story');
  if (LINES[u]) { try { localStorage.setItem(LINE_KEY, u); } catch {} return u; }
  try { const v = localStorage.getItem(LINE_KEY); if (LINES[v]) return v; } catch {}
  return 'virus';
})();
let STORY = LINES[line].chapters, STORY_IDS = STORY.map(c => c.id);
function setLine(k) {
  if (!LINES[k] || k === line) return;
  line = k; STORY = LINES[k].chapters; STORY_IDS = STORY.map(c => c.id);
  try { localStorage.setItem(LINE_KEY, k); } catch {}
}
/* scène die alleen in een andere lijn voorkomt → naar die (hoofd)lijn overschakelen; zijpaden kies je alleen zelf (startpagina of kaart) */
function lineFor(id) {
  if (STORY_IDS.includes(id)) return line;
  return MAIN_KEYS.find(k => LINES[k].chapters.some(c => c.id === id)) ?? line;
}

const UI2 = {
  home: { nl: 'Startmenu', en: 'Main menu' }, zoomOut: { nl: 'Uitzoomen', en: 'Zoom out' }, whereAmI: { nl: 'Waar ben ik?', en: 'Where am I?' },
  atlas: { nl: '3D-bibliotheek', en: '3D library' }, labels: { nl: 'Labels', en: 'Labels' }, captions: { nl: 'Ondertitels', en: 'Captions' }, info: { nl: 'Uitleg', en: 'Info' },
  chapter: { nl: 'Hoofdstuk', en: 'Chapter' }, sidePath: { nl: 'Zijsprong', en: 'Detour' }, backTo: { nl: '↩ terug naar hoofdstuk', en: '↩ back to chapter' },
  nextChapter: { nl: 'Volgend hoofdstuk', en: 'Next chapter' }, step: { nl: 'stap', en: 'step' },
  what: { nl: 'Wat', en: 'What' }, how: { nl: 'Zo werkt het', en: 'How it works' }, facts: { nl: 'Kerncijfers', en: 'Key numbers' },
  why: { nl: 'Waarom belangrijk', en: 'Why it matters' }, sources: { nl: 'Bronnen', en: 'Sources' }, stepsHere: { nl: 'Stappen in deze animatie', en: 'Steps in this animation' },
  up: { nl: 'Uitzoomen naar', en: 'Zoom out to' }, zoomIn: { nl: 'Inzoomen', en: 'Zoom in' }, next: { nl: 'Volgende stap →', en: 'Next step →' }, side: { nl: 'Zijsprongen', en: 'Side paths' },
  legend: { nl: 'Legende', en: 'Legend' }, simplified: { nl: 'Wat is hier vereenvoudigd?', en: 'What is simplified here?' },
  struct3d: { nl: '3D-structuren (PDB)', en: '3D structures (PDB)' }, mapTitle: { nl: 'Waar ben ik?', en: 'Where am I?' },
  mapSub: { nl: 'Alle verhalen, zijpaden en onderwerpen. Geel omrand = hier ben je. Klik op een onderwerp voor uitleg, en open dan de animatie.', en: 'All stories, side paths and topics. Yellow outline = you are here. Click a topic for an explanation, then open the animation.' },
  close: { nl: 'Sluiten', en: 'Close' }, noScene: { nl: 'Voor deze knoop is nog geen animatie gebouwd.', en: 'No animation has been built for this node yet.' },
  play: { nl: 'Afspelen (spatie)', en: 'Play (space)' }, pause: { nl: 'Pauze (spatie)', en: 'Pause (space)' }, prevStep: { nl: 'Vorige stap (←)', en: 'Previous step (←)' }, nextStep: { nl: 'Volgende stap (→)', en: 'Next step (→)' }, inShort: { nl: 'In het kort', en: 'In short' },
  repeatOn: { nl: 'Herhalen staat aan: deze stap speelt opnieuw tot je verder klikt (klik om uit te zetten)', en: 'Repeat is on: this step replays until you click on (click to turn off)' },
  repeatOff: { nl: 'Deze stap blijven herhalen in plaats van verder te gaan', en: 'Keep repeating this step instead of moving on' },
  stateAuto: { nl: '▶ speelt · gaat vanzelf verder', en: '▶ playing · continues by itself' }, stateRepeat: { nl: '🔁 herhaalt deze stap', en: '🔁 repeating this step' },
  statePaused: { nl: '⏸ gepauzeerd · ▶ of spatie om verder te kijken', en: '⏸ paused · ▶ or space to continue' },
  speedLbl: { nl: 'Snelheid', en: 'Speed' }, settings: { nl: 'Instellingen', en: 'Settings' }, more: { nl: 'Verdieping', en: 'In depth' },
  pPlay: { nl: 'Vanzelf verder', en: 'Continue by itself' }, pRead: { nl: 'Leestijd na een stap', en: 'Reading time after a step' },
  pCap: { nl: 'Uitleg bij de stap', en: 'Step explanation' }, pLabels: { nl: 'Labels in de figuur', en: 'Labels in the figure' },
  pReset: { nl: 'Uitlegvenster terug op zijn plaats', en: 'Put the explanation window back' },
  pKeys: { nl: 'Sneltoetsen: spatie ▶/⏸ · ← → stap · Esc uitzoomen · / zoeken · M kaart · C uitleg in-/uitklappen', en: 'Shortcuts: space ▶/⏸ · ← → step · Esc zoom out · / search · M map · C fold explanation' },
  pSaved: { nl: 'Je keuzes blijven bewaard op dit toestel tot je ze verandert.', en: 'Your choices are kept on this device until you change them.' },
  playAll: { nl: 'het hele verhaal door', en: 'through the whole story' }, playChapter: { nl: 'tot einde hoofdstuk', en: 'to end of chapter' },
  playStep: { nl: 'nee, stap herhalen', en: 'no, repeat the step' },
  readShort: { nl: 'kort', en: 'short' }, readNormal: { nl: 'normaal', en: 'normal' }, readLong: { nl: 'lang', en: 'long' },
  capFloat: { nl: 'zwevend venster', en: 'floating window' }, capDock: { nl: 'onder de figuur', en: 'below the figure' }, capOff: { nl: 'verbergen', en: 'hide' },
  capGrip: { nl: 'uitleg · versleep mij', en: 'explanation · drag me' }, capMin: { nl: 'In- of uitklappen (C)', en: 'Fold or unfold (C)' }, capDockTip: { nl: 'Onder de figuur zetten', en: 'Put below the figure' },
  stateChapter: { nl: '▶ speelt · stopt aan het einde van het hoofdstuk', en: '▶ playing · stops at the end of the chapter' },
  real3d: { nl: 'Bekijk echt in 3D', en: 'View in real 3D' },
  homeTip: { nl: 'Terug naar het startmenu (kies een ander verhaal of zijpad)', en: 'Back to the main menu (pick another story or side path)' }, upTip: { nl: 'Eén niveau uitzoomen (Esc)', en: 'Zoom out one level (Esc)' },
};
const V = k => L(UI2[k]);

const $ = id => document.getElementById(id);
const stage = $('stage'), labelsEl = $('labels'), side = $('side');
const FULL = [0, 0, 1600, 900];
const q = new URLSearchParams(location.search);

let current = null;            // { id, def, base, steps, offset, total, layer, svg, is3d, api }
let trail = [];                // broodkruimels (scène-id's)
let lastChapter = 0;           // laatst bezochte hoofdstuk
let busy = false, playing = true, speed = 1, showLabels = true, t = 0, endedOnce = false;
/* Stap-voor-stap: elke stap speelt één keer en blijft dan staan op het eindbeeld (goal).
 * De gebruiker gaat zelf verder; 'ff' spoelt eerst zichtbaar (snel, maar zonder sprong) naar een tijdstip. */
let goal = 0, ff = null, held = false, done = false, holdT = 0, endStop = false;
const FF_MS = 650;
/* Na afloop blijft een stap niet stilstaan: na een korte pauze speelt ze opnieuw (zacht overvloeiend),
 * tot de gebruiker zelf verder klikt. Pauze (⏸ / spatie) zet alles stil. */
const LOOP_WAIT = 2600;
/* Automatisch verder (standaard aan): na een stap blijft het eindbeeld een leestijd staan en gaat het dan vanzelf
 * (zacht overvloeiend) naar de volgende stap; aan het einde van een hoofdstuk naar het volgende hoofdstuk van de lijn.
 * Uit: de stap herhaalt zich tot de gebruiker zelf klikt. ⏸ zet altijd alles stil. Keuze wordt onthouden (?auto=0|1). */
const AUTO_KEY = 'dna-app-auto';
/* Instellingen (⚙) blijven bewaard op dit toestel tot de gebruiker ze verandert:
 *   play  'all' (hele verhaal door) | 'chapter' (stopt aan het einde van het hoofdstuk) | 'step' (elke stap herhalen)
 *   read  leestijd-factor na een stap (0,6 / 1 / 1,6) · speed · labels (aan/uit)
 *   cap   uitleg bij de stap: 'float' (zwevend, versleepbaar venster op een leeg stuk van de figuur) | 'dock' (onder de figuur) | 'off'
 *   capPos  zelf versleepte plaats van het venster (fracties van de vrije ruimte), anders kiest de app een lege hoek */
const PREF_KEY = 'dna-app-prefs';
const prefs = (() => { try { const v = JSON.parse(localStorage.getItem(PREF_KEY)); return v && typeof v === 'object' ? v : {}; } catch { return {}; } })();
const savePrefs = () => { try { localStorage.setItem(PREF_KEY, JSON.stringify(prefs)); } catch {} };
if (!['all', 'chapter', 'step'].includes(prefs.play)) {          // overnemen uit de oudere aan/uit-keuze
  let a = true; try { const v = localStorage.getItem(AUTO_KEY); if (v === '0' || v === '1') a = v === '1'; } catch {}
  prefs.play = a ? 'all' : 'step';
}
{ const u = new URLSearchParams(location.search).get('auto'); if (u === '0' || u === '1') prefs.play = u === '1' ? 'all' : 'step'; }
if (![.6, 1, 1.6].includes(prefs.read)) prefs.read = 1;
if (!['float', 'dock', 'off'].includes(prefs.cap)) prefs.cap = 'float';
let auto = prefs.play !== 'step';
if ([.5, .75, 1, 1.5, 2].includes(prefs.speed)) speed = prefs.speed;
if (typeof prefs.labels === 'boolean') showLabels = prefs.labels;
const CHAPTER_WAIT = 2500;                        // extra pauze vóór een nieuw hoofdstuk
/* leestijd: genoeg om titel + ondertitel rustig te lezen (≈ 55 ms per teken), 4–12 s, sneller bij hogere snelheid; × leestijd-keuze */
function readMs(i) {
  const st = current?.steps[i]; if (!st) return 5000;
  const n = (L(st.title) ?? '').length + (L(st.text) ?? '').length;
  return Math.min(12000, Math.max(4000, 1800 + 55 * n)) * prefs.read / Math.max(.5, speed);
}
let camNow = FULL.slice(), camTarget = FULL.slice(), camSnap = false;

/* ---------- vaste teksten ---------- */
document.querySelectorAll('[data-u]').forEach(e => e.textContent = V(e.dataset.u));
$('bHome').title = V('homeTip'); $('bUp').title = V('upTip');
$('tPrev').title = V('prevStep'); $('tNext').title = V('nextStep'); $('gearBtn').title = V('settings');
$('langBox').append(langSwitch('btn'));
document.title = 'Dogma';
if (lang === 'en') for (const o of $('speed').options) o.textContent = o.textContent.replace(',', '.');   // 0,5× → 0.5×
$('bAtlas').href = new URL(`../atlas/index.html?lang=${lang}`, import.meta.url).href;   // werkt ook als de pagina elders staat (online)
/* fase 4: echte 3D-structuur over de tekening (app/real3d.js) en de schakelaar mens ⇄ bacterie (app/orgswitch.js) */
/* apart geladen: lukt het 3D-paneel niet (bv. een half bijgewerkt bestand in de browsercache), dan werkt de rest van de app gewoon */
let real3d = { sync() {}, close() {}, isOpen: () => false };
import('./real3d.js').then(m => {
  real3d = m.createReal3D({ stage, button: $('bReal3d'), pause: () => { const was = playing; setPlaying(false); return was; }, resume: () => setPlaying(true) });
  if (current) real3d.sync(current.id, current.is3d);
}).catch(e => console.warn('3D-paneel niet geladen:', e));
function syncOrg() {
  const o = current && orgButton(current.id), b = $('bOrg');
  b.hidden = !o; if (!o) return;
  b.innerHTML = o.html; b.title = o.tip; b.dataset.target = o.target;
}
$('bOrg').onclick = () => { const id = $('bOrg').dataset.target; if (id && hasScene(id)) go(id, null, 'in'); };

/* ---------- scène-definities ---------- */
function resolve(id) {
  const def = SCENES[id];
  if (!def) return null;
  /* Overzichtsscène (bv. de cel): één volledig beeld met een korte uitleg, geen verhaal met inzoomen.
   * def.overview = { step: k, text: {nl,en}, title?, cam?, dur? } → toont het eindbeeld van stap k van de scène. */
  if (def.overview) {
    const ov = def.overview, st = def.steps[ov.step ?? 0];
    const before = def.steps.slice(0, ov.step ?? 0).reduce((a, x) => a + x.dur, 0);
    return { def, base: def, offset: 0, ov: { ...ov, t0: before + st.dur * .999 },
      steps: [{ dur: ov.dur ?? 9000, cam: ov.cam ?? st.cam ?? FULL, title: ov.title ?? st.title, text: ov.text }] };
  }
  if (!def.alias) return { def, base: def, steps: def.steps, offset: 0 };
  const base = SCENES[def.alias];
  const from = def.from ?? 0, to = def.to ?? base.steps.length - 1;
  const offset = base.steps.slice(0, from).reduce((s, x) => s + x.dur, 0);
  const steps = base.steps.slice(from, to + 1).map((s, i) => ({ ...s, ...(def.steps?.[i] ?? {}) }));
  return { def, base, steps, offset, from };
}
const hasScene = id => !!SCENES[id];

function build(id) {
  const r = resolve(id);
  const layer = document.createElement('div'); layer.className = 'layer';
  const is3d = r.base.kind === '3d';
  layer.innerHTML = is3d ? r.base.html() : r.base.svg();
  stage.insertBefore(layer, labelsEl);
  const svg = is3d ? null : layer.querySelector('svg');
  const root = is3d ? layer : svg;
  if (svg) svg.setAttribute('viewBox', FULL.join(' '));
  root.querySelectorAll('[data-node]').forEach(el => {
    el.addEventListener('click', e => { e.stopPropagation(); activate(el); });
    el.addEventListener('mouseenter', () => hoverNode(el.dataset.node, true));
    el.addEventListener('mouseleave', () => hoverNode(el.dataset.node, false));
  });
  let api = null;
  try { api = r.base.init?.(is3d ? layer : svg, { lang, L, node: id }) ?? null; } catch (e) { console.error(e); }
  const total = r.steps.reduce((s, x) => s + x.dur, 0);
  return { id, ...r, total, layer, svg, root, is3d, api };
}

/* korte melding onderaan (bv. als een scène niet laadt) */
function toast(msg) {
  let el = $('toast');
  if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; document.body.append(el); }
  el.textContent = msg; el.classList.add('show'); clearTimeout(toast.h); toast.h = setTimeout(() => el.classList.remove('show'), 5000);
}

/* ---------- klok ---------- */
function stepInfo(tt) {
  let acc = 0;
  for (let i = 0; i < current.steps.length; i++) {
    const d = current.steps[i].dur;
    if (tt < acc + d || i === current.steps.length - 1) return { step: i, p: Math.min(1, Math.max(0, (tt - acc) / d)), start: acc };
    acc += d;
  }
}
const stepStart = i => current.steps.slice(0, i).reduce((s, x) => s + x.dur, 0);

// test-hulp: ?rafpoly vervangt requestAnimationFrame door een timer (headless Chrome rendert anders geen frames)
if (q.has('rafpoly')) window.requestAnimationFrame = cb => setTimeout(() => cb(performance.now()), 16);
let lastFrame = performance.now(), lastStep = -1;
/* Zuinig tekenen: hoogstens ~60 beelden/s (ook op 120/144 Hz-schermen), en alleen opnieuw tekenen wat veranderd is.
 * Staat het beeld stil (pauze of wachten op het eindbeeld), dan kost een frame bijna niets. */
const MIN_FRAME = 1000 / 62;
let lastScene = null, lastVB = '', lastLabelsAt = 0, labelsDirty = true;
function frame(now) {
  requestAnimationFrame(frame);
  if (now - lastFrame < MIN_FRAME - 1) return;
  const dt = Math.min(60, now - lastFrame); lastFrame = now;
  if (current && !busy) {
    if (playing) {
      if (ff) {                                   // zichtbaar vooruit/terug spoelen
        const d = ff.to - t, stepT = Math.sign(d) * Math.min(Math.abs(d), ff.rate * dt);
        t += stepT;
        if (Math.abs(ff.to - t) < 1e-6) { t = ff.to; ff = null; }
      } else if (held) {                          // even op het eindbeeld: daarna verder (auto) of de stap opnieuw
        holdT += dt;
        const si = stepInfo(t);
        if (auto) {
          const last = si.step >= current.steps.length - 1, ci = STORY_IDS.indexOf(current.id);
          const wait = readMs(si.step) + (last ? CHAPTER_WAIT : 0);
          setAutoFill(Math.min(1, holdT / wait), last);
          if (holdT > wait) {
            if (!last) playStep(si.step + 1);
            else if (prefs.play === 'chapter') { setAutoFill(0, true); holdT = 0; endStop = true; setPlaying(false); }   // einde hoofdstuk: hier stoppen (knop "Volgend hoofdstuk" blijft staan; ▶ gaat verder)
            else if (ci >= 0 && ci < STORY.length - 1) { held = false; chapterGo(ci + 1); }
            else { makeGhost(); t = stepStart(si.step) + 1; held = false; }   // einde verhaal of zijpad: rustig herhalen
          }
        } else if (holdT > LOOP_WAIT) { makeGhost(); t = stepStart(si.step) + 1; held = false; }
      } else {
        t = Math.min(goal, t + dt * speed);
        if (t >= goal) hold();
      }
    }
    const si = stepInfo(t);
    if (si.step !== lastStep && lastStep >= 0) makeGhost();      // vorig beeld bewaren om zacht over te vloeien
    const s = current.ov ? { step: current.ov.step ?? 0, p: .999, t: current.ov.t0 + t, total: current.total }   // overzicht: vast eindbeeld, omgeving beweegt mee
      : { step: si.step + (current.from ?? 0), p: si.p, t: t + current.offset, total: current.total };
    // update(t, s) is deterministisch: zelfde tijd → zelfde beeld, dus overslaan als er niets veranderd is (3D draait wel altijd)
    const key = `${s.t}|${s.step}|${s.p}`;
    let changed = false;
    if ((current.is3d && playing) || lastScene !== current.api || current.api?.__k !== key) {
      try { current.api?.update?.(s.t, s); } catch (e) { console.error(e); }
      if (current.api) current.api.__k = key;
      lastScene = current.api; changed = true;
    }
    if (si.step !== lastStep) { lastStep = si.step; onStep(si.step); }
    // camera
    if (current.svg) {
      camTarget = current.steps[si.step].cam ?? FULL;
      const k = camSnap ? 1 : 1 - Math.exp(-dt / 550); camSnap = false;
      camNow = camNow.map((v, i) => Math.abs(camTarget[i] - v) < .01 ? camTarget[i] : v + (camTarget[i] - v) * k);
      const vb = camNow.map(n => n.toFixed(2)).join(' ');
      if (vb !== lastVB || current.svg.getAttribute('viewBox') !== vb) { current.svg.setAttribute('viewBox', vb); lastVB = vb; changed = true; }
    }
    if (ghost) { fadeGhost(now); changed = true; }
    updateSegs(si);
    // labels volgen het beeld; bij stilstand enkel af en toe nakijken (bv. na het openklappen van een paneel)
    if (showLabels && (changed || labelsDirty || now - lastLabelsAt > 300)) { updateLabels(); lastLabelsAt = now; labelsDirty = false; }
  }
}
requestAnimationFrame(frame);

/* Overvloeien tussen stappen: een kopie van het laatste beeld van de vorige stap ligt even over de nieuwe stap en
 * vervaagt. Zo ontstaat er nooit een donker gat of een harde sprong, ook niet als een stap zijn inhoud vernieuwt. */
let ghost = null;
const GHOST_MS = 1100;
function makeGhost() {
  if (!current?.svg) return;
  ghost?.el.remove();
  const el = current.svg.cloneNode(true);
  el.querySelectorAll('[id]').forEach(n => { if (!n.closest('defs')) n.removeAttribute('id'); });
  el.querySelectorAll('[data-node]').forEach(n => n.removeAttribute('data-node'));
  el.classList.add('ghost');
  el.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none';
  current.svg.after(el);
  ghost = { el, t0: performance.now(), owner: current };
}
function fadeGhost(now) {
  if (!ghost) return;
  if (ghost.owner !== current) { ghost.el.remove(); ghost = null; return; }
  const k = Math.min(1, Math.max(0, (now - ghost.t0 - 120) / GHOST_MS));   // heel even vasthouden, dan vervagen
  ghost.el.style.opacity = (1 - k * k * (3 - 2 * k)).toFixed(3);
  ghost.el.setAttribute('viewBox', camNow.map(n => n.toFixed(2)).join(' '));
  if (k >= 1) { ghost.el.remove(); ghost = null; }
}

function onStep(i) {
  const st = current.steps[i];
  $('capTitle').textContent = L(st.title) ?? '';
  $('capText').innerHTML = colourWords(esc(L(st.text) ?? ''));
  $('stepNo').textContent = `${V('step')} ${i + 1}/${current.steps.length}`;
  side.querySelectorAll('.stepsList li').forEach((li, k) => li.classList.toggle('cur', k === i));
  syncPlayBtn();
  // zwevend uitlegvenster: kort na het begin van de stap de rustigste hoek kiezen (en bij de grootte van de nieuwe tekst)
  capPlace(); clearTimeout(onStep.h); onStep.h = setTimeout(() => capAuto(), 900);
}
function setPlaying(v) {
  playing = v; syncPlayBtn();
  if (current?.svg) current.svg[v ? 'unpauseAnimations' : 'pauseAnimations']();
}
const stepEnd = i => stepStart(i + 1) - 1;       // net vóór het begin van de volgende stap
const isLast = () => stepInfo(t).step >= current.steps.length - 1;
/* Bediening als videospeler: ▶ speelt (en gaat na een leespauze vanzelf naar de volgende stap), ⏸ zet alles meteen stil.
 * 🔁 (aan/uit) = de huidige stap blijven herhalen in plaats van verder te gaan. */
function syncPlayBtn() {
  $('tPlay').textContent = playing ? '⏸' : '▶'; $('tPlay').title = V(playing ? 'pause' : 'play');
  $('tPlay').setAttribute('aria-label', $('tPlay').title);
  $('tRepeat').setAttribute('aria-pressed', String(!auto)); $('tRepeat').title = V(auto ? 'repeatOff' : 'repeatOn'); $('tRepeat').setAttribute('aria-label', $('tRepeat').title);
  $('playState').textContent = V(!playing ? 'statePaused' : !auto ? 'stateRepeat' : prefs.play === 'chapter' ? 'stateChapter' : 'stateAuto');
  if ($('pPlay').value !== prefs.play) $('pPlay').value = prefs.play;
  const last = !!current && isLast();
  $('tNext').disabled = last;
  $('tPrev').disabled = !!current && stepInfo(t).step === 0;
  $('tNext').classList.toggle('pulse', done && !auto && !last);
}
let autoFill = 0;                                 // leespauze (0–1) van de huidige stap, getoond in haar stuk van de tijdlijn
function setAutoFill(k, last) {
  autoFill = last ? 0 : k;
  const b = $('nextCh').querySelector('button');
  if (b) b.style.setProperty('--fill', ((last ? k : 0) * 100).toFixed(1) + '%');
}
function setAuto(v) {
  auto = v; try { localStorage.setItem(AUTO_KEY, v ? '1' : '0'); } catch {}
  if (!v) setAutoFill(0, false);
  if (held) holdT = 0;
  syncPlayBtn();
}
function hold() {
  held = true; holdT = 0; done = true; syncPlayBtn();
  if (isLast() && !endedOnce) { endedOnce = true; showNextChapter(); }
}
/* speel stap i vanaf tijdstip 'from' (optioneel eerst zichtbaar spoelen) tot het einde van die stap */
function playStep(i, from = null) {
  if (!current) return;
  i = Math.max(0, Math.min(current.steps.length - 1, i));
  goal = stepEnd(i); held = false; done = false; endStop = false; setAutoFill(0, false);
  if (from !== null && Math.abs(from - t) > 1) ff = { to: from, rate: Math.max(1, Math.abs(from - t) / FF_MS) };
  setPlaying(true);
}
function nextStep() {
  const si = stepInfo(t);
  if (si.step >= current.steps.length - 1) return;
  if (held || t >= stepEnd(si.step) - 2) playStep(si.step + 1);      // op het eindbeeld: gewoon verder
  // midden in een stap (ook tijdens een herhaling): eerst zichtbaar doorspoelen naar het einde, dan de volgende stap
  else { ff = { to: stepEnd(si.step), rate: Math.max(1, (stepEnd(si.step) - t) / FF_MS) }; goal = stepEnd(si.step + 1); held = false; done = false; setPlaying(true); }
}
function prevStep() {
  const si = stepInfo(t);
  const i = si.p > .15 ? si.step : si.step - 1;
  playStep(Math.max(0, i), stepStart(Math.max(0, i)) + 1);
}
function gotoStep(i) { i = Math.max(0, Math.min(current.steps.length - 1, i)); t = stepStart(i) + 1; ff = null; playStep(i); }
$('tPlay').onclick = () => {
  if (!playing && endStop) {                       // gestopt aan het einde van een hoofdstuk: ▶ = verder met het volgende hoofdstuk
    endStop = false; const ci = STORY_IDS.indexOf(current.id);
    if (ci >= 0 && ci < STORY.length - 1) { held = false; setPlaying(true); chapterGo(ci + 1); return; }
  }
  setPlaying(!playing);
};
$('tRepeat').onclick = () => setPlay(auto ? 'step' : (prefs.lastPlay ?? 'all'));
$('tPrev').onclick = prevStep;
$('tNext').onclick = nextStep;

/* ---------- ⚙ instellingen ---------- */
const opts = (sel, list) => { sel.innerHTML = list.map(([v, k]) => `<option value="${v}">${V(k)}</option>`).join(''); };
opts($('pPlay'), [['all', 'playAll'], ['chapter', 'playChapter'], ['step', 'playStep']]);
opts($('pRead'), [['0.6', 'readShort'], ['1', 'readNormal'], ['1.6', 'readLong']]);
opts($('pCap'), [['float', 'capFloat'], ['dock', 'capDock'], ['off', 'capOff']]);
function setPlay(v) {
  prefs.play = v; if (v !== 'step') prefs.lastPlay = v; savePrefs();
  try { localStorage.setItem(AUTO_KEY, v === 'step' ? '0' : '1'); } catch {}
  setAuto(v !== 'step');
}
function syncPrefsUI() {
  $('pPlay').value = prefs.play; $('pRead').value = String(prefs.read); $('pCap').value = prefs.cap;
  $('speed').value = String(speed); $('pLabels').checked = showLabels;
  $('pReset').hidden = prefs.cap !== 'float' || !prefs.capPos;
}
$('pPlay').onchange = e => { setPlay(e.target.value); syncPrefsUI(); };
$('pRead').onchange = e => { prefs.read = +e.target.value; savePrefs(); if (held) holdT = Math.min(holdT, readMs(stepInfo(t).step) * .5); };
$('speed').onchange = e => { speed = +e.target.value; prefs.speed = speed; savePrefs(); };
$('pCap').onchange = e => setCapMode(e.target.value);
$('pLabels').onchange = e => setLabels(e.target.checked);
$('pReset').onclick = () => { prefs.capPos = null; savePrefs(); capAuto(true); syncPrefsUI(); };
document.addEventListener('click', e => { if (!e.target.closest('#gear')) $('gear').open = false; });
/* tijdlijn in stukken: één stuk per stap (klikbaar, met de naam erbij); het stuk vult zich terwijl de stap speelt,
 * een lichtere vulling toont de leespauze voor het vanzelf verder gaat */
function drawTicks() {
  const tr = $('track'); tr.innerHTML = ''; segKey = ''; curSeg = -1;
  current.steps.forEach((s, i) => {
    const b = document.createElement('button'); b.className = 'seg';
    b.title = `${i + 1}. ${L(s.title) ?? ''}`; b.setAttribute('aria-label', `${V('step')} ${b.title}`);
    b.innerHTML = '<span class="sl"></span><i><s></s><em></em></i><span class="tag"></span>';
    b.querySelector('.sl').textContent = L(s.title) ?? '';
    const tag = STEP_TAGS[current.id]?.[i];
    b.querySelector('.tag').textContent = tag ? (lang === 'en' ? tag[1] : tag[0]) : (L(s.title) ?? '');
    b.onclick = () => gotoStep(i);
    tr.append(b);
  });
  requestAnimationFrame(fitTags);
}
/* korte stapnamen onder de tijdlijn: over max. 2 regels; past één woord niet in de breedte van zijn stuk,
 * dan wordt die ene naam iets kleiner gezet (11,5 → min. 9 px; daarna afkorten met …, nooit midden in een woord breken) in plaats van midden in het woord te breken */
function fitTags() {
  const tr = $('track'), segs = [...tr.children];
  // 1) de actieve stap krijgt altijd de breedte die zijn volledige naam nodig heeft (op 1 of 2 regels, 11,5 px vet);
  //    de andere stukken delen de rest en worden zo nodig kleiner/afgekort
  const cur = segs.find(b => b.classList.contains('cur'));
  for (const b of segs) b.style.flex = '';
  if (cur) {
    const t = cur.querySelector('.tag'), ctx = (fitTags.c ??= document.createElement('canvas').getContext('2d'));
    ctx.font = `600 11.5px ${getComputedStyle(t).fontFamily}`;
    const words = (t.textContent || '').split(/\s+/).filter(Boolean), w = x => ctx.measureText(x).width;
    let need = w(words.join(' '));
    for (let i = 1; i < words.length; i++) need = Math.min(need, Math.max(w(words.slice(0, i).join(' ')), w(words.slice(i).join(' '))));
    need = Math.max(need, ...words.map(w)) + 8;
    if (need > cur.clientWidth) cur.style.flex = `0 0 ${Math.min(need, tr.clientWidth * .3).toFixed(0)}px`;
  }
  for (const b of segs) {
    const t = b.querySelector('.tag');
    t.style.fontSize = ''; t.style.display = ''; t.style.whiteSpace = ''; t.style.textOverflow = '';
    if (b === cur) continue;   // actieve stap: nooit verkleinen of afkorten
    const over = () => t.scrollWidth > t.clientWidth + 1 || t.scrollHeight > t.clientHeight + 1;
    for (let fs = 11.5; fs > 9 && over(); fs -= .5) t.style.fontSize = fs - .5 + 'px';
    if (over()) { t.style.display = 'block'; t.style.whiteSpace = 'nowrap'; t.style.textOverflow = 'ellipsis'; }   // nog te lang: afkorten met … (nooit een woord splitsen; volledige naam in de tooltip van de knop)
  }
}
let curSeg = -1;
addEventListener('resize', () => requestAnimationFrame(fitTags));
let segKey = '';
function updateSegs(si) {
  const sk = `${si.step}|${si.p.toFixed(3)}|${autoFill.toFixed(3)}|${$('track').children.length}`;
  if (sk === segKey) return;
  segKey = sk;
  const segs = $('track').children;
  if (si.step !== curSeg) { curSeg = si.step; requestAnimationFrame(fitTags); }   // nieuwe actieve stap: breedtes opnieuw verdelen
  for (let i = 0; i < segs.length; i++) {
    const b = segs[i], k = i < si.step ? 1 : i > si.step ? 0 : si.p;
    b.classList.toggle('cur', i === si.step); b.classList.toggle('done', i < si.step);
    b.querySelector('em').style.width = (k * 100).toFixed(1) + '%';
    b.querySelector('s').style.width = (i === si.step ? autoFill * 100 : 0).toFixed(1) + '%';
  }
}

/* ---------- labels ---------- */
let labelItems = [];
function hoverNode(node, on) { current?.root.querySelectorAll(`[data-node="${node}"]`).forEach(e => e.classList.toggle('hl', on)); }
function placeLabels() {
  labelsEl.innerHTML = ''; labelItems = [];
  if (!current) return;
  hotEls = [...current.root.querySelectorAll('[data-node]')];
  const seen = new Set();
  for (const el of current.root.querySelectorAll('[data-node]')) {
    const node = el.dataset.node;
    if (seen.has(node) || el.dataset.nolabel !== undefined) continue;
    seen.add(node);
    const anchor = current.root.querySelector(`[data-anchor="${node}"]`) ?? el;
    const lb = document.createElement('div');
    const kind = target(el);
    lb.className = 'lbl' + (kind.type === 'card' ? ' leaf' : '') + (kind.type === 'url' ? ' ext' : '');
    lb.style.setProperty('--dot', el.dataset.color ?? '#7cc4ff');
    lb.textContent = el.dataset.label ?? (NODES[node] ? title(NODES[node]) : node);
    if (anchor.dataset.pos === 'below') lb.style.transform = 'translate(-50%, 0)';
    lb.onclick = () => activate(el);
    lb.onmouseenter = () => hoverNode(node, true);
    lb.onmouseleave = () => hoverNode(node, false);
    labelsEl.append(lb);
    labelItems.push({ lb, anchor });
  }
  updateLabels();
}
function visible(el) {
  for (let e = el; e && e !== current.root && e.getAttribute; e = e.parentNode) { const o = e.getAttribute('opacity'); if (o !== null && +o < .1) return false; }
  return true;
}
let hotEls = [];
function updateHot() {
  // onzichtbare hotspots (opacity < 0,1) niet klikbaar maken
  for (const el of hotEls) { const v = visible(el); if (el.__v !== v) { el.__v = v; el.style.pointerEvents = v ? '' : 'none'; } }
}
function updateLabels() {
  updateHot();
  const s = stage.getBoundingClientRect();
  for (const { lb, anchor } of labelItems) {
    const r = anchor.getBoundingClientRect();
    const off = r.width === 0 && r.height === 0 || r.right < s.left || r.left > s.right || r.bottom < s.top + 40 || r.top > s.bottom - 120 || !visible(anchor);
    lb.style.display = off ? 'none' : '';
    const below = anchor.dataset.pos === 'below';
    lb.style.left = (r.left - s.left + r.width / 2) + 'px';
    lb.style.top = (below ? r.bottom - s.top + 6 : r.top - s.top - 6) + 'px';
  }
}
let showCap = true;
/* uitlegpaneel: op brede schermen in- en uitklappen, op smalle schermen als paneel van onderaan */
const narrow = () => matchMedia('(max-width: 1000px)').matches;
function toggleInfo(force) {
  const app = document.querySelector('.app');
  if (narrow()) { const on = force ?? !app.classList.contains('sideopen'); app.classList.toggle('sideopen', on); $('bInfo').setAttribute('aria-pressed', on); }
  else { const on = force ?? app.classList.contains('noside'); app.classList.toggle('noside', !on); $('bInfo').setAttribute('aria-pressed', on); }
  requestAnimationFrame(placeLabels);
}
$('bInfo').onclick = () => toggleInfo();
/* klik op een onderdeel dat deze scène zelf is: toon de uitleg erover (zijpaneel open, bovenaan, even oplichten) */
function showSelf() {
  toggleInfo(true); side.scrollTop = 0;
  side.classList.remove('flash'); void side.offsetWidth; side.classList.add('flash');
}
$('bInfo').setAttribute('aria-pressed', !narrow());
function toggleCap() { showCap = !showCap; $('caption').classList.toggle('mini', !showCap); capAuto(); }
function setLabels(v) {
  showLabels = v; prefs.labels = v; savePrefs();
  $('bLabels').setAttribute('aria-pressed', v); labelsEl.classList.toggle('hide', !v); stage.classList.toggle('nolab', !v); $('pLabels').checked = v;
  if (v) labelsDirty = true;
}
$('bLabels').onclick = () => setLabels(!showLabels);
$('bLabels').setAttribute('aria-pressed', showLabels); labelsEl.classList.toggle('hide', !showLabels); stage.classList.toggle('nolab', !showLabels);

/* ---------- uitleg bij de stap: zwevend venster (versleepbaar) of onder de figuur ----------
 * Zwevend: het venster ligt op de figuur, in de hoek waar op dat moment het minst te zien is (gemeten met
 * elementsFromPoint op een raster punten; grote achtergrondvlakken en het 3D-canvas tellen niet als inhoud).
 * Heeft de gebruiker het zelf versleept, dan blijft het daar (bewaard), tot "terug op zijn plaats". */
const cap = $('caption'), dockEl = document.querySelector('.dock');
$('capGripTxt').textContent = V('capGrip');
$('capMin').title = V('capMin'); $('capMin').setAttribute('aria-label', V('capMin'));
$('capDock').title = V('capDockTip'); $('capDock').setAttribute('aria-label', V('capDockTip'));
$('capMin').onclick = e => { e.stopPropagation(); toggleCap(); };
$('capDock').onclick = e => { e.stopPropagation(); setCapMode('dock'); };
const floating = () => prefs.cap === 'float' && !narrow();
function setCapMode(m) {
  prefs.cap = m; savePrefs(); applyCapMode(); syncPrefsUI();
}
function applyCapMode() {
  const fl = floating();
  if (fl && cap.parentNode !== stage) stage.append(cap);
  if (!fl && cap.parentNode !== dockEl) dockEl.prepend(cap);
  cap.classList.toggle('float', fl);
  cap.hidden = prefs.cap === 'off';
  if (!fl) { cap.style.left = cap.style.top = ''; }
  labelsDirty = true;
  requestAnimationFrame(() => { placeLabels(); fitTags(); capPlace(); });
}
const CAP_M = 12;                                  // marge tot de rand van de figuur
function capBounds() {
  const W = stage.clientWidth, H = stage.clientHeight, w = cap.offsetWidth, h = cap.offsetHeight;
  return { W, H, w, h, maxX: Math.max(CAP_M, W - w - CAP_M), maxY: Math.max(CAP_M, H - h - CAP_M) };
}
function capMove(x, y, anim) {
  const b = capBounds();
  cap.classList.toggle('anim', !!anim);
  cap.style.left = Math.min(b.maxX, Math.max(CAP_M, x)).toFixed(0) + 'px';
  cap.style.top = Math.min(b.maxY, Math.max(CAP_M, y)).toFixed(0) + 'px';
}
let capCorner = null;
function capPlace() {
  if (!floating() || cap.hidden) return;
  const b = capBounds();
  if (prefs.capPos) return capMove(CAP_M + prefs.capPos.x * (b.maxX - CAP_M), CAP_M + prefs.capPos.y * (b.maxY - CAP_M), false);
  capMove(...capPos(capCorner ?? 'bl', b), false);
}
/* plaatsen voor het venster: 1e letter t/m/b (boven/midden/onder), 2e l/c/r (links/midden/rechts) */
const CAP_KEYS = ['bl', 'br', 'tr', 'tl', 'ml', 'mr', 'bc', 'tc'];
function capPos(k, b = capBounds()) {
  const top = 54;                                     // bovenaan iets lager: daar staan vaak knoppen van de scène
  const x = k[1] === 'l' ? CAP_M : k[1] === 'r' ? b.maxX : (CAP_M + b.maxX) / 2;
  const y = k[0] === 't' ? top : k[0] === 'b' ? b.maxY : (top + b.maxY) / 2;
  return [x, y];
}
/* hoeveel figuurtekst (scènetekst, labels, 3D-naamkaartjes) zou het venster op (x, y) bedekken? Telt elke tekst die
 * voor meer dan 15 % onder het venster valt; zichtbaarheid = niet verborgen en niet (bijna) doorzichtig. */
function textCover(x, y, w, h) {
  if (!current) return 0;
  const sr = stage.getBoundingClientRect(), L0 = sr.left + x, T0 = sr.top + y, R0 = L0 + w, B0 = T0 + h;
  const vis = el => { for (let e = el; e && e !== stage; e = e.parentElement) {
    const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity < .15) return false;
    const o = e.getAttribute?.('opacity'); if (o !== null && o !== undefined && +o < .15) return false; } return true; };
  let n = 0;
  for (const el of stage.querySelectorAll('svg text, .lbl, .lab3d > div')) {
    if (cap.contains(el)) continue;
    const r = el.getBoundingClientRect(); if (r.width < 3 || r.height < 3) continue;
    const ix = Math.min(R0, r.right) - Math.max(L0, r.left), iy = Math.min(B0, r.bottom) - Math.max(T0, r.top);
    if (ix <= 0 || iy <= 0 || ix * iy < .15 * r.width * r.height) continue;
    if (vis(el)) n++;
  }
  return n;
}
/* hoe "vol" is een rechthoek van de figuur (in stage-coördinaten)? */
function busyness(x, y, w, h) {
  if (!current) return 0;
  const sr = stage.getBoundingClientRect(), big = sr.width * sr.height * .3;
  let n = 0;
  for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) {
    const px = sr.left + x + w * (i + .5) / 5, py = sr.top + y + h * (j + .5) / 4;
    for (const el of document.elementsFromPoint(px, py)) {
      if (el === cap || cap.contains(el)) continue;
      if (el.classList?.contains('lbl')) { n += 1.5; break; }
      if (!current.layer.contains(el)) continue;
      if (el.tagName === 'svg' || el.tagName === 'CANVAS' || el.classList.contains('layer') || el.classList.contains('v3d')) break;
      const r = el.getBoundingClientRect();
      if (r.width * r.height > big) continue;        // achtergrondvlak (bv. cytoplasma) telt niet
      n += 1; break;
    }
  }
  return n;
}
function capAuto(force, soft) {
  if (!floating() || cap.hidden || prefs.capPos || drag) return;
  const b = capBounds();
  const score = k => { const [x, y] = capPos(k, b); return textCover(x, y, b.w, b.h) * 10 + busyness(x, y, b.w, b.h); };
  const curK = capCorner ?? 'bl';
  if (soft) { const [x, y] = capPos(curK, b); if (!textCover(x, y, b.w, b.h)) return; }   // tussendoor: enkel verhuizen als het venster tekst bedekt
  let best = curK, bestS = Infinity;
  const cur = capCorner ? score(capCorner) : Infinity;
  for (const k of CAP_KEYS) { const s = score(k) + (k[0] === 'm' || k[1] === 'c' ? 1.5 : 0); if (s < bestS) { bestS = s; best = k; } }   // hoeken lichtjes verkozen
  if (!force && capCorner && cur - bestS < 2) best = capCorner;   // pas verhuizen als het elders duidelijk beter is
  capCorner = best; capMove(...capPos(best, b), !force);
}
setInterval(() => { if (!document.hidden) capAuto(false, true); }, 2500);   // tekst die later in de stap verschijnt: alsnog uitwijken
let drag = null;
cap.addEventListener('pointerdown', e => {
  if (!floating() || e.target.closest('button, a') || e.button !== 0) return;
  const r = cap.getBoundingClientRect();
  drag = { dx: e.clientX - r.left, dy: e.clientY - r.top, moved: false };
  cap.setPointerCapture(e.pointerId); cap.classList.add('drag');
});
cap.addEventListener('pointermove', e => {
  if (!drag) return;
  const sr = stage.getBoundingClientRect();
  drag.moved = true; capMove(e.clientX - sr.left - drag.dx, e.clientY - sr.top - drag.dy, false);
});
const endDrag = () => {
  if (!drag) return;
  cap.classList.remove('drag');
  if (drag.moved) {
    const b = capBounds(), x = parseFloat(cap.style.left), y = parseFloat(cap.style.top);
    prefs.capPos = { x: b.maxX > CAP_M ? (x - CAP_M) / (b.maxX - CAP_M) : 0, y: b.maxY > CAP_M ? (y - CAP_M) / (b.maxY - CAP_M) : 0 };
    savePrefs(); syncPrefsUI();
  }
  drag = null;
};
cap.addEventListener('pointerup', endDrag); cap.addEventListener('pointercancel', endDrag);
addEventListener('resize', () => { applyCapMode(); });
applyCapMode(); syncPrefsUI();

/* ---------- op voorhand laden ----------
 * Kort nadat een scène start, laten de scènes waar je waarschijnlijk naartoe gaat (volgend hoofdstuk, aanklikbare onderdelen)
 * hun zware gegevens al ophalen (bv. 3D-structuren: def.warm()), zodat ze daarna meteen en zonder haperen openen. */
function warmAround() {
  if (!current) return;
  const ids = new Set();
  const ci = STORY_IDS.indexOf(current.id);
  if (ci >= 0 && STORY[ci + 1]) ids.add(STORY[ci + 1].id);
  current.root.querySelectorAll('[data-node]').forEach(el => { if (hasScene(el.dataset.node)) ids.add(el.dataset.node); });
  for (const id of ids) {
    const d = SCENES[id], b = d?.alias ? SCENES[d.alias] : d;
    try { b?.warm?.(); } catch (e) { console.warn('warm', id, e); }
  }
}
let warmH = 0;
const scheduleWarm = () => { clearTimeout(warmH); warmH = setTimeout(() => (window.requestIdleCallback ?? (f => f()))(warmAround), 2000); };

/* ---------- navigatie ---------- */
function target(el) {
  const node = el.dataset.node;
  if (el.dataset.href) return { type: 'url', href: el.dataset.href };
  if (hasScene(node)) return { type: 'scene', id: node };
  return { type: 'card', id: node };
}
function boxOf(el) {
  const bb = el.getBBox ? el.getBBox() : { x: 700, y: 400, width: 200, height: 100 };
  const pad = Math.max(bb.width, bb.height) * .35 + 20;
  let box = [bb.x - pad, bb.y - pad, bb.width + 2 * pad, bb.height + 2 * pad];
  const ar = 16 / 9;
  if (box[2] / box[3] > ar) { const h = box[2] / ar; box[1] -= (h - box[3]) / 2; box[3] = h; }
  else { const w = box[3] * ar; box[0] -= (w - box[2]) / 2; box[2] = w; }
  return box;
}
async function activate(el) {
  if (busy) return;
  const tg = target(el);
  if (tg.type === 'card') return showCard(tg.id);
  const box = current.svg && el.getBBox ? boxOf(el) : null;
  if (tg.type === 'url') {
    const u = new URL(tg.href, location.href); u.searchParams.set('lang', lang); u.searchParams.set('from', current.id);
    await tween(600, k => { current.layer.style.opacity = 1 - k; });
    location.href = u.toString(); return;
  }
  go(tg.id, box, 'in');
}

const easeIO = x => (x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const tween = (ms, fn) => new Promise(res => {
  const t0 = performance.now();
  const step = now => { const k = Math.min(1, (now - t0) / ms); fn(easeIO(k)); k < 1 ? requestAnimationFrame(step) : res(); };
  requestAnimationFrame(step);
});
const lerpBox = (a, b, k) => a.map((x, i) => x + (b[i] - x) * k);

async function go(id, box, dir = 'in', push = true) {
  if (busy || !hasScene(id)) return id && !hasScene(id) ? showCard(id) : null;
  if (current && id === current.id) return showSelf();
  real3d.close();
  busy = true; hideOverlays(); labelsEl.classList.add('hide'); $('nextCh').classList.remove('show');
  const old = current;
  let nxt;
  try { nxt = build(id); } catch (e) {
    console.error(e); busy = false; labelsEl.classList.remove('hide');
    toast(L({ nl: 'Deze scène kon niet geladen worden. Probeer opnieuw of kies een andere.', en: 'This scene could not be loaded. Try again or choose another one.' }));
    return;
  }
  nxt.layer.style.opacity = 0;
  // de nieuwe scène meteen tekenen (anders is ze tijdens de overgang leeg → zwart beeld)
  const drawFirst = () => { try {
    if (nxt.ov) nxt.api?.update?.(nxt.ov.t0, { step: nxt.ov.step ?? 0, p: .999, t: nxt.ov.t0, total: nxt.total });
    else nxt.api?.update?.(nxt.offset, { step: nxt.from ?? 0, p: 0, t: nxt.offset, total: nxt.total });
  } catch (e) { console.error(e); } };
  drawFirst();
  const firstCam = nxt.steps[0].cam ?? FULL;
  /* Doorlopende zoom-overgang (≈ 1,7 s):
   *  in : de oude scène zoomt (met gelijkmatige zoomsnelheid) in op het aangeklikte onderdeel; de nieuwe scène groeit
   *       precies uit dat onderdeel tevoorschijn en neemt het beeld over; de oude vervaagt pas daarna (geen donker gat).
   *  out: omgekeerd — de nieuwe (grotere) scène zoomt uit vanaf het onderdeel dat de oude scène voorstelt, en de oude
   *       krimpt terug in dat onderdeel. */
  const W = stage.clientWidth, H = stage.clientHeight;
  const fit = vb => { const sc = Math.min(W / vb[2], H / vb[3]); return { sc, ox: (W - vb[2] * sc) / 2, oy: (H - vb[3] * sc) / 2 }; };
  const rectOf = (bx, vb) => { const f = fit(vb); return [f.ox + (bx[0] - vb[0]) * f.sc, f.oy + (bx[1] - vb[1]) * f.sc, bx[2] * f.sc, bx[3] * f.sc]; };
  const contentRect = vb => { const f = fit(vb); return [f.ox, f.oy, vb[2] * f.sc, vb[3] * f.sc]; };
  const place = (lay, from, to) => {            // laag zo transformeren dat rechthoek 'from' (in beeld) op 'to' komt
    const sc = to[2] / from[2];
    lay.style.transformOrigin = '0 0';
    lay.style.transform = `translate(${(to[0] - from[0] * sc).toFixed(2)}px, ${(to[1] - from[1] * sc).toFixed(2)}px) scale(${sc.toFixed(4)})`;
  };
  /* zoomen met gelijkmatige snelheid: breedte geometrisch, middelpunt mee in verhouding */
  const zoomBox = (a, b, k) => {
    const w = a[2] * Math.pow(b[2] / a[2], k), h = w * a[3] / a[2];
    const u = Math.abs(b[2] - a[2]) < 1e-6 ? k : (a[2] - w) / (a[2] - b[2]);
    const cx = a[0] + a[2] / 2 + (b[0] + b[2] / 2 - a[0] - a[2] / 2) * u, cy = a[1] + a[3] / 2 + (b[1] + b[3] / 2 - a[1] - a[3] / 2) * u;
    return [cx - w / 2, cy - h / 2, w, h];
  };
  const centerBox = (vb, f = .28) => [vb[0] + vb[2] * (1 - f) / 2, vb[1] + vb[3] * (1 - f) / 2, vb[2] * f, vb[3] * f];
  const smooth = (k, a, b) => { const x = Math.min(1, Math.max(0, (k - a) / (b - a))); return x * x * (3 - 2 * x); };
  const oFrom = old ? camNow.slice() : FULL;
  if (nxt.svg) nxt.svg.setAttribute('viewBox', firstCam.join(' '));
  if (dir === 'in') {
    const target = box ?? centerBox(oFrom);
    await tween(1700, k => {
      const vb = zoomBox(oFrom, target, k);
      if (old) {
        if (old.svg) old.svg.setAttribute('viewBox', vb.join(' '));
        else { old.layer.style.transformOrigin = '50% 50%'; old.layer.style.transform = `scale(${(oFrom[2] / vb[2]).toFixed(4)})`; }   // 3D: met CSS inzoomen
        old.layer.style.opacity = (1 - smooth(k, .5, .95)).toFixed(3);
      }
      place(nxt.layer, contentRect(firstCam), rectOf(target, vb));
      nxt.layer.style.opacity = smooth(k, .12, .5).toFixed(3);
    });
  } else {
    const back = old && nxt.svg ? [...nxt.root.querySelectorAll(`[data-node="${old.id}"]`)].find(e => visible(e)) : null;
    const target = back ? boxOf(back) : centerBox(firstCam);
    const oRect = old ? contentRect(oFrom) : null;
    await tween(1700, k => {
      const vb = zoomBox(target, firstCam, k);
      if (nxt.svg) nxt.svg.setAttribute('viewBox', vb.join(' '));
      else { nxt.layer.style.transformOrigin = '50% 50%'; nxt.layer.style.transform = `scale(${(1 + .6 * (1 - k)).toFixed(4)})`; }
      nxt.layer.style.opacity = smooth(k, 0, .35).toFixed(3);
      if (old) {
        place(old.layer, oRect, nxt.svg ? rectOf(target, vb) : zoomBox(oRect, contentRect(centerBox(FULL)), k));
        old.layer.style.opacity = (1 - smooth(k, .45, .9)).toFixed(3);
      }
    });
  }
  if (old) { try { old.api?.destroy?.(); } catch {} old.layer.remove(); }
  nxt.layer.style.transform = ''; nxt.layer.style.transformOrigin = ''; nxt.layer.style.opacity = '';
  current = nxt; camNow = firstCam.slice();
  t = 0; endedOnce = false; lastStep = -1; ff = null; capCorner = null; playStep(0); scheduleWarm();
  const lk = lineFor(id); if (lk !== line) { setLine(lk); lastChapter = 0; }
  /* kruimelpad: een hoofdstuk van de gekozen lijn is altijd een nieuw begin; daaronder komen de zijsprongen */
  if (push) { const i = trail.indexOf(id); trail = STORY_IDS.includes(id) ? [id] : i >= 0 ? trail.slice(0, i + 1) : [...trail, id]; }
  const ci = STORY_IDS.indexOf(id); if (ci >= 0) lastChapter = ci;
  render(); drawTicks();
  busy = false;
  labelsEl.classList.toggle('hide', !showLabels);
  requestAnimationFrame(placeLabels);
  history.replaceState(null, '', `?scene=${id}&story=${line}`);
}

function parentOf(id) {
  const n = NODES[id]; if (!n) return 'cel';
  const cand = [...n.parents, ...n.prev].filter(hasScene);
  const inTrail = cand.filter(c => trail.includes(c));
  if (inTrail.length) return inTrail.sort((a, b) => trail.indexOf(b) - trail.indexOf(a))[0];
  if (cand.length) return cand[0];
  const ci = STORY_IDS.indexOf(id);
  if (ci > 0) return STORY_IDS[ci - 1];
  return id === 'cel' || id === STORY_IDS[0] ? null : STORY_IDS[lastChapter] ?? 'cel';
}
function zoomOut() { const p = parentOf(current.id); if (p) go(p, null, 'out'); }
$('bUp').onclick = zoomOut;
$('bHome').href = new URL(`../index.html?lang=${lang}`, import.meta.url).href;   // Startmenu = de startpagina (uitzoomen brengt je al terug naar de hele cel)

/* ---------- verhaallijn ---------- */
function chapterGo(i) {
  if (i < 0 || i >= STORY.length) return;
  const id = STORY[i].id, cur = NODES[current.id], nx = NODES[id];
  const dir = (nx?.scale ?? 3) >= (cur?.scale ?? 3) ? 'in' : 'out';
  // staat het volgende hoofdstuk als onderdeel in het huidige beeld (bv. de groeifactor in de cel)? dan daarop inzoomen
  const el = dir === 'in' && current.svg ? [...current.root.querySelectorAll(`[data-node="${id}"]`)].find(e => e.__v !== false && visible(e)) : null;
  go(id, el ? boxOf(el) : null, dir);
}
function renderStory() {
  const ci = STORY_IDS.indexOf(current.id);
  const dots = STORY.map((c, i) => `<button class="${i === ci ? 'cur' : i === lastChapter && ci < 0 ? 'from' : i <= lastChapter ? 'on' : ''}" data-ci="${i}" title="${V('chapter')} ${i + 1}: ${title(NODES[c.id])}"></button>`).join('');
  if (ci >= 0) {
    $('sInfo').innerHTML = `${V('chapter')} <b>${ci + 1}</b> ${L({ nl: 'van', en: 'of' })} ${STORY.length}<div class="dots">${dots}</div>`;
    const pv = STORY[ci - 1], nx = STORY[ci + 1];   // hoofdstukken enkel hier, met de naam van het vorige/volgende erbij
    $('sPrevName').textContent = pv ? title(NODES[pv.id]) : ''; $('sNextName').textContent = nx ? title(NODES[nx.id]) : '';
    $('sPrev').title = pv ? `${V('chapter')} ${ci}: ${title(NODES[pv.id])}` : ''; $('sNext').title = nx ? `${V('chapter')} ${ci + 2}: ${title(NODES[nx.id])}` : '';
    $('sPrev').disabled = !pv; $('sNext').disabled = !nx;
    $('sPrev').onclick = () => chapterGo(ci - 1); $('sNext').onclick = () => chapterGo(ci + 1);
  } else {
    const deep = Math.max(1, trail.length - 1);
    $('sInfo').innerHTML = `<span class="jumpinfo">${V('sidePath')} ${L({ nl: 'vanuit hoofdstuk', en: 'from chapter' })} <b>${lastChapter + 1}</b> · ${deep} ${L(deep === 1 ? { nl: 'niveau dieper', en: 'level deeper' } : { nl: 'niveaus dieper', en: 'levels deeper' })}</span><div class="dots">${dots}</div>`;
    $('sPrevName').textContent = ''; $('sPrev').title = ''; $('sPrev').disabled = true;
    $('sNextName').textContent = `${V('backTo')} ${lastChapter + 1}`; $('sNext').title = title(NODES[STORY[lastChapter].id]);
    $('sNext').disabled = false; $('sNext').onclick = () => chapterGo(lastChapter);
  }
  $('sNext').classList.toggle('back', ci < 0);
  $('sInfo').querySelectorAll('.dots button').forEach(b => b.onclick = () => { const i = +b.dataset.ci; if (STORY[i].id !== current.id) { trail = []; chapterGo(i); } });
}
/* Waar ben ik? Kruimelpad = [gekleurde lijn] › hoofdstuk N › zijsprong › … (lange paden ingekort in het midden) */
function renderCrumbs() {
  const nm = id => L(SCENES[id]?.title) ?? (NODES[id] ? title(NODES[id]) : id);
  const ln = LINES[line];
  const items = trail.map((id, i) => {
    const k = STORY_IDS.indexOf(id), last = i === trail.length - 1;
    const num = k >= 0 ? `<i class="cn">${k + 1}</i>` : '';
    const cls = k >= 0 ? 'ch' : 'jump';
    return last ? `<b class="${cls}">${num}${nm(id)}</b>` : `<button class="${cls}" data-i="${i}" title="${nm(id)}">${num}${nm(id)}</button>`;
  });
  const shown = items.length > 4 ? [items[0], `<span class="more" title="${trail.slice(1, -2).map(nm).join(' › ')}">…</span>`, ...items.slice(-2)] : items;
  $('crumbs').innerHTML = `<button class="linebadge" id="lineBadge" style="--c:${lineColor(line)}" title="${L(ln.title)} — ${L({ nl: 'klik voor het overzicht', en: 'click for the overview' })}">${L(ln.short)}</button>` +
    shown.map(h => `<span class="sep">›</span>${h}`).join('');
  $('crumbs').querySelectorAll('button[data-i]').forEach(b => b.onclick = () => go(trail[+b.dataset.i], null, 'out'));
  $('lineBadge').onclick = showMap;
}
function showNextChapter() {
  const ci = STORY_IDS.indexOf(current.id);
  const box = $('nextCh');
  if (ci < 0 || ci >= STORY.length - 1) return;
  const nx = STORY[ci + 1];
  box.innerHTML = `<button title="${L(STORY[ci].bridge)}"><span>${V('nextChapter')}: <b>${title(NODES[nx.id])}</b> ›</span></button>`;
  box.querySelector('button').onclick = () => chapterGo(ci + 1);
  box.classList.add('show');
}

/* ---------- zijpaneel ---------- */
const chipsOf = (ids, cls) => ids.filter(i => NODES[i]).map(i => `<button class="chip ${cls} ${hasScene(i) ? 'has' : ''}" data-id="${i}">${title(NODES[i])}</button>`).join('');
/* "In het kort": 2–3 zinnen in eenvoudige taal (details[lang].kort), bovenaan het uitlegpaneel.
 * Vaktermen staan erin als [[zoals in de zin|sleutel]] → aantikbaar woord met een uitleg van één zin (shared/glossary.js). */
const glossOf = k => { const g = GLOSSARY[k]; return g ? (g[lang] ?? g.nl) : null; };
const termsHTML = txt => txt.replace(/\[\[([^\]|]+)\|([a-z0-9-]+)\]\]/g, (_, w, k) => glossOf(k) ? `<button class="term" data-g="${k}">${w}</button>` : w);
const kortOf = id => { const d = DETAILS[id]; return d ? termsHTML(colourWords((d[lang] ?? d.nl).kort ?? '')) : ''; };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function showGloss(btn) {
  const box = btn.closest('.kort, .cardbox'); if (!box) return;
  const open = box.querySelector('.gloss');
  if (open) { open.remove(); if (open.dataset.g === btn.dataset.g) return; }
  const [t, d] = glossOf(btn.dataset.g);
  const el = document.createElement('div'); el.className = 'gloss'; el.dataset.g = btn.dataset.g; el.setAttribute('role', 'note');
  el.innerHTML = `<b></b> <span></span>`; el.querySelector('b').textContent = t + ':'; el.querySelector('span').textContent = d;
  btn.closest('.kort, p')?.after(el) ?? box.append(el);
}
document.addEventListener('click', e => { const b = e.target.closest('.term'); if (b) { e.preventDefault(); showGloss(b); } });
function detailsHTML(id, open = true) {
  const d = DETAILS[id]; if (!d) return '';
  const x = d[lang] ?? d.nl;
  let h = '';
  // de diepere uitleg (vakterminologie, cijfers, bronnen) zit samen in één dichtgeklapte laag "Verdieping"
  if (x.what) h += `<details class="sec" ${open ? 'open' : ''}><summary>${V('what')}</summary><p>${x.what}</p></details>`;
  if (x.how?.length) h += `<details class="sec"><summary>${V('how')}</summary><ol>${x.how.map(s => `<li>${s}</li>`).join('')}</ol></details>`;
  if (x.facts?.length) h += `<details class="sec"><summary>${V('facts')}</summary><dl class="facts">${x.facts.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl></details>`;
  if (x.why) h += `<details class="sec"><summary>${V('why')}</summary><p>${x.why}</p></details>`;
  if (d.sources?.length) h += `<details class="sec"><summary>${V('sources')} (${d.sources.length})</summary><ol class="src">${d.sources.map(s => `<li>${s.url ? `<a href="${s.url}" target="_blank" rel="noopener">${L(s.t)}</a>` : L(s.t)}</li>`).join('')}</ol></details>`;
  return h ? `<details class="more"><summary>${V('more')}</summary><div class="morebody">${h}</div></details>` : '';
}
function render() {
  const def = current.def, base = current.base, n = NODES[current.id];
  renderCrumbs();
  const lvl = n?.scale ?? 3;
  const sc = L(def.scale ?? base.scale), tm = L(def.time ?? base.time);
  $('scalebox').innerHTML = `<span class="zoomlvl" title="${L({ nl: 'Zoomniveau: van cel (links) tot atomen (rechts)', en: 'Zoom level: from cell (left) to atoms (right)' })}">${SCALES.map(s => `<i class="${s.id <= lvl ? 'on' : ''}" title="${scaleTitle(s)}"></i>`).join('')}</span>` +
    (sc ? `<span title="${L({ nl: 'Hoe groot dit in werkelijkheid is', en: 'How big this is in reality' })}: ${sc.replace(/"/g, '&quot;')}">📏 <span class="k">${L({ nl: 'Echte grootte', en: 'Real size' })}:</span> <b>${sc}</b></span>` : '') +
    (tm ? `<span title="${L({ nl: 'Hoe lang dit proces in de cel echt duurt. De animatie is vertraagd of versneld om het te kunnen volgen.', en: 'How long this process really takes in the cell. The animation is slowed down or sped up so you can follow it.' })} (${tm.replace(/"/g, '&quot;')})">⏱ <span class="k">${L({ nl: 'Echte duur', en: 'Real duration' })}:</span> <b>${tm}</b></span>` : '');
  const ups = n ? [...new Set([...n.parents, ...n.prev])] : [];
  side.innerHTML = `
    <button class="btn sheetclose" id="sheetClose">${V('close')} ✕</button>
    <div class="kind">${n ? U(n.kind === 'process' ? 'process' : 'structure') : ''} · ${L(def.org ?? base.org) ?? ''} · ${n ? stageTitle(STAGES.find(s => s.id === n.stage)) : ''}</div>
    <h1>${n ? title(n) : L(def.title)}${n ? `<span class="status ${n.status === 'nagekeken' ? 'ok' : ''}">${statusText(n.status)}</span>` : ''}</h1>
    ${n ? `<div class="en">${sub(n)}</div>${kortOf(current.id) ? `<div class="kort"><b>${V('inShort')}</b>${kortOf(current.id)}</div>` : `<p>${summary(n)}</p>`}` : ''}
    ${detailsHTML(current.id)}
    <details class="sec" open><summary>${V('stepsHere')}</summary><ol class="stepsList">${current.steps.map((s, i) => { const tg = STEP_TAGS[current.id]?.[i]; return `<li data-i="${i}">${tg ? `<span class="stag">${esc(lang === 'en' ? tg[1] : tg[0])}</span>` : ''}${L(s.title)}</li>`; }).join('')}</ol></details>
    ${L(def.extra ?? base.extra) ?? ''}
    ${(def.legend ?? base.legend) ? `<div class="card c-leg"><div class="ch"><i>🎨</i>${V('legend')}</div><div class="legend">${(def.legend ?? base.legend).map(([c, x]) => `<span style="--c:${c}"><i></i>${L(x)}</span>`).join('')}</div></div>` : ''}
    ${ups.length ? `<div class="card c-up"><div class="ch"><i>↑</i>${V('up')}</div>${chipsOf(ups, 'up')}</div>` : ''}
    ${n?.in.length ? `<div class="card c-in"><div class="ch"><i>🔍</i>${V('zoomIn')}</div>${chipsOf(n.in, '')}</div>` : ''}
    ${n?.next.length ? `<div class="card c-next"><div class="ch"><i>→</i>${V('next')}</div>${chipsOf(n.next, 'next')}</div>` : ''}
    ${n?.rel.length ? `<div class="card c-rel"><div class="ch"><i>↪</i>${V('side')}</div>${chipsOf(n.rel, 'rel')}</div>` : ''}
    ${n?.pdb.length ? `<div class="card c-pdb"><div class="ch"><i>◆</i>${V('struct3d')}</div>${n.pdb.map(p => `<a class="chip" href="https://www.rcsb.org/structure/${p}" target="_blank" rel="noopener">PDB ${p} ↗</a>`).join('')}</div>` : ''}
    <div class="simp"><b>${V('simplified')}</b><br>${L(def.simplified ?? base.simplified) ?? ''}</div>`;
  $('sheetClose').onclick = () => toggleInfo(false);
  side.querySelectorAll('.chip[data-id]').forEach(c => c.onclick = () => { if (narrow()) toggleInfo(false); chipGo(c.dataset.id); });
  side.querySelectorAll('.stepsList li').forEach(li => li.onclick = () => gotoStep(+li.dataset.i));
  side.scrollTop = 0;
  renderStory();
  onStep(stepInfo(t).step);
  real3d.sync(current.id, current.is3d); syncOrg();
}
function chipGo(id) {
  const el = current.root.querySelector(`[data-node="${id}"]`);
  if (el) return activate(el);
  if (!hasScene(id)) return showCard(id);
  const n = NODES[id], cur = NODES[current.id];
  const ups = cur ? [...cur.parents, ...cur.prev] : [];
  go(id, null, ups.includes(id) || (n && cur && n.scale < cur.scale) ? 'out' : 'in');
}

/* ---------- kaart en conceptkaart ---------- */
function hideOverlays() { $('card').classList.remove('show'); $('map').classList.remove('show'); }
['card', 'map'].forEach(k => $(k).addEventListener('click', e => { if (e.target === $(k)) hideOverlays(); }));
function showCard(id) {
  const n = NODES[id]; if (!n) return;
  $('cardbody').innerHTML = `<button class="btn close" id="cClose">${V('close')} ✕</button>
    <div class="kind" style="font:500 10.5px var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--accent)">${U(n.kind === 'process' ? 'process' : 'structure')}</div>
    <h2 style="margin:6px 0 2px">${title(n)}<span class="status ${n.status === 'nagekeken' ? 'ok' : ''}">${statusText(n.status)}</span></h2>
    <div style="color:var(--muted);font-style:italic;font-size:13px">${sub(n)}</div>
    ${kortOf(id) ? `<div class="kort"><b>${V('inShort')}</b>${kortOf(id)}</div>` : `<p style="font-size:14px;line-height:1.6;color:#c9d2e4">${summary(n)}</p>`}${detailsHTML(id, true)}
    <div>${chipsOf(n.in, '')}${chipsOf(n.next, 'next')}${chipsOf(n.rel, 'rel')}</div>
    <p style="font-size:12.5px;color:var(--muted);margin-top:14px">${V('noScene')}</p>`;
  $('card').classList.add('show');
  $('cClose').onclick = hideOverlays;
  $('cardbody').querySelectorAll('.chip[data-id]').forEach(c => c.onclick = () => { hideOverlays(); chipGo(c.dataset.id); });
}
const STAGECOL = { entry: 'var(--tdna)', genome: 'var(--dna)', repl: 'var(--dna-2)', txn: 'var(--prot)', rna: 'var(--rna)', tl: 'var(--rrna)', prot: 'var(--chain)', bact: '#d65a5a' };
function showMap() {
  $('mapbody').innerHTML = `<button class="btn close" id="mClose">${V('close')} ✕</button><h2>${V('mapTitle')}</h2><p class="sub">${V('mapSub')}</p><div id="cmapHost"></div>`;
  mountMap($('cmapHost'), {
    NODES, STAGES, SCALES, SCALES_EN, LINES, MAIN_KEYS, SIDE_KEYS, DETAILS, S_EN, lang, L, here: current.id, line,
    engine: async () => SEARCH,
    onOpen: (id, k) => {
      hideOverlays();
      if (k && k !== line) { setLine(k); lastChapter = Math.max(0, STORY_IDS.indexOf(id)); if (id === current.id) { render(); return; } }
      if (id === current.id) return;
      chipGo(id);
    },
  });
  $('map').classList.add('show');
  $('mClose').onclick = hideOverlays;
}
$('bMap').onclick = showMap;

/* ---------- zoeken (bovenbalk): kernwoorden → "Bedoel je …?" → naar die scène, met het pad vanaf het hoofdstuk ---------- */
const SEARCH = makeSearch({ NODES, LINES, LINKS, DETAILS, S_EN, STEPS: STEP_TAGS, has: hasScene });
const ctx = { NODES, LINES, L, title };
function info(msg) {
  let el = $('where');
  if (!el) { el = document.createElement('div'); el.id = 'where'; el.className = 'toast info'; document.body.append(el); }
  el.innerHTML = msg; el.classList.add('show'); clearTimeout(info.h); info.h = setTimeout(() => el.classList.remove('show'), 5200);
}
async function jumpTo(r) {
  if (busy || !current) return;
  const loc = r.loc; hideOverlays(); real3d.close();
  if (loc.line && loc.line !== line) setLine(loc.line);
  if (loc.ci >= 0) lastChapter = loc.ci;
  const path = loc.path.filter(hasScene);
  if (r.id === current.id) { trail = path; render(); }
  else { trail = path.slice(0, -1); await go(r.id, null, 'in'); trail = path; render(); }
  if (r.step !== null && r.step !== undefined && current?.id === r.id) gotoStep(r.step);   // gevonden via een stapstitel: meteen naar die stap
  info(`📍 ${L({ nl: 'Je bent nu bij', en: 'You are now at' })} <b>${title(NODES[r.id])}</b><br><span>${whereText(loc, ctx)}</span>`);
}
mountSearch($('searchBox'), {
  engine: () => SEARCH, NODES, LINES, L, title, summary, compact: true,
  line: () => line, onPick: jumpTo,
  atlasHref: qv => new URL(`../atlas/index.html?lang=${lang}&find=${encodeURIComponent(qv)}`, import.meta.url).href,
});
document.addEventListener('keydown', e => { if (e.key === '/' && !e.target.closest?.('input, select, textarea')) { e.preventDefault(); $('searchBox').querySelector('input').focus(); } });

/* ---------- toetsenbord ---------- */
document.addEventListener('keydown', e => {
  if (e.target.closest?.('select, input')) return;
  if (real3d.isOpen()) { if (e.key === 'Escape') real3d.close(); return; }   // het 3D-paneel heeft voorrang
  if (e.key === 'Escape') { if ($('card').classList.contains('show') || $('map').classList.contains('show')) hideOverlays(); else zoomOut(); }
  else if (e.key === ' ') { e.preventDefault(); $('tPlay').click(); }   // ▶ vanzelf verder / ⏸ blijf bij deze stap
  else if (e.key === 'ArrowRight') $('tNext').click();
  else if (e.key === 'ArrowLeft') $('tPrev').click();
  else if (e.key === 'm') showMap();
  else if (e.key === 'c') toggleCap();
  else if (e.key === 'a') $('tPlay').click();
});
addEventListener('resize', () => { labelsDirty = true; requestAnimationFrame(placeLabels); });

/* ---------- start ---------- */
const startId = hasScene(q.get('scene')) ? q.get('scene') : (hasScene('cel') ? 'cel' : Object.keys(SCENES)[0]);
const fromId = q.get('from');
if (fromId && hasScene(fromId) && fromId !== startId) trail = [fromId];
if (startId) {
  current = build(startId);
  setLine(lineFor(startId));
  const ci = STORY_IDS.indexOf(startId); if (ci >= 0) lastChapter = ci;
  /* geen hoofdstuk van de lijn (bv. via een link of de zoekbalk op de startpagina): het pad vanaf het hoofdstuk erbij zoeken */
  if (ci < 0 && !trail.length) {
    const loc = SEARCH.locate(startId, line);
    if (loc.line === line && loc.ci >= 0) { lastChapter = loc.ci; trail = loc.path.filter(hasScene).slice(0, -1); }
  }
  trail = ci >= 0 ? [startId] : [...trail, startId];
  camNow = (current.steps[0].cam ?? FULL).slice();
  if (q.has('t')) t = Math.min(current.total - 1, +q.get('t'));
  if (q.has('step')) { const k = Math.max(0, Math.min(current.steps.length - 1, +q.get('step') || 0)); t = stepStart(k) + (q.has('p') ? +q.get('p') * current.steps[k].dur : 1); }   // stap buiten bereik (bv. overzichtsscène) → begrenzen
  camSnap = true;
  render(); drawTicks();
  playStep(stepInfo(t).step);
  if (q.has('freeze')) setPlaying(false); else scheduleWarm();
  const boot = $('boot'); if (boot) { boot.classList.add('gone'); setTimeout(() => boot.remove(), 500); }
  requestAnimationFrame(placeLabels);
}
