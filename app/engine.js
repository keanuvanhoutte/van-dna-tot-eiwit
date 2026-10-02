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
import { SCENES } from './scenes/index.js';
import { LINES, LINE_KEYS } from './story.js';

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
/* scène die alleen in een andere lijn voorkomt → naar die lijn overschakelen */
function lineFor(id) {
  if (STORY_IDS.includes(id)) return line;
  return LINE_KEYS.find(k => LINES[k].chapters.some(c => c.id === id)) ?? line;
}

const UI2 = {
  home: { nl: 'Start', en: 'Start' }, zoomOut: { nl: 'Uitzoomen', en: 'Zoom out' }, whereAmI: { nl: 'Waar ben ik?', en: 'Where am I?' },
  atlas: { nl: 'DNA/RNA-atlas', en: 'DNA/RNA atlas' }, labels: { nl: 'Labels', en: 'Labels' }, captions: { nl: 'Ondertitels', en: 'Captions' }, info: { nl: 'Uitleg', en: 'Info' },
  chapter: { nl: 'Hoofdstuk', en: 'Chapter' }, sidePath: { nl: 'Zijpad', en: 'Side path' }, backTo: { nl: '↩ terug naar het verhaal', en: '↩ back to the story' },
  nextChapter: { nl: 'Volgend hoofdstuk', en: 'Next chapter' }, step: { nl: 'stap', en: 'step' },
  what: { nl: 'Wat', en: 'What' }, how: { nl: 'Zo werkt het', en: 'How it works' }, facts: { nl: 'Kerncijfers', en: 'Key numbers' },
  why: { nl: 'Waarom belangrijk', en: 'Why it matters' }, sources: { nl: 'Bronnen', en: 'Sources' }, stepsHere: { nl: 'Stappen in deze animatie', en: 'Steps in this animation' },
  up: { nl: 'Uitzoomen naar', en: 'Zoom out to' }, zoomIn: { nl: 'Inzoomen', en: 'Zoom in' }, next: { nl: 'Volgende stap →', en: 'Next step →' }, side: { nl: 'Zijsprongen', en: 'Side paths' },
  legend: { nl: 'Legende', en: 'Legend' }, simplified: { nl: 'Wat is hier vereenvoudigd?', en: 'What is simplified here?' },
  struct3d: { nl: '3D-structuren (PDB)', en: '3D structures (PDB)' }, mapTitle: { nl: 'Waar ben ik?', en: 'Where am I?' },
  mapSub: { nl: 'Het hoofdverhaal (genummerd) en alle zijtakken. Geel = hier ben je. Klik om ernaartoe te gaan.', en: 'The main story (numbered) and all side paths. Yellow = you are here. Click to go there.' },
  close: { nl: 'Sluiten', en: 'Close' }, noScene: { nl: 'Voor deze knoop is nog geen animatie gebouwd.', en: 'No animation has been built for this node yet.' },
  play: { nl: 'Afspelen (spatie)', en: 'Play (space)' }, pause: { nl: 'Pauze (spatie)', en: 'Pause (space)' }, prevStep: { nl: 'Vorige stap (←)', en: 'Previous step (←)' }, nextStep: { nl: 'Volgende stap (→)', en: 'Next step (→)' }, inShort: { nl: 'In het kort', en: 'In short' },
  playAuto: { nl: 'Vanzelf verder gaan (spatie)', en: 'Continue by itself (space)' }, holdStep: { nl: 'Blijf bij deze stap (spatie)', en: 'Stay on this step (space)' },
  stateAuto: { nl: '▶ gaat vanzelf verder', en: '▶ continues by itself' }, stateHold: { nl: '⏸ blijft bij deze stap (herhaalt)', en: '⏸ stays on this step (repeats)' },
  speedLbl: { nl: 'Snelheid', en: 'Speed' }, settings: { nl: 'Instellingen', en: 'Settings' }, more: { nl: 'Voor wie meer wil', en: 'Want to know more?' },
  homeTip: { nl: 'Terug naar het begin van het verhaal', en: 'Back to the start of the story' }, upTip: { nl: 'Eén niveau uitzoomen (Esc)', en: 'Zoom out one level (Esc)' },
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
let goal = 0, ff = null, held = false, done = false, holdT = 0;
const FF_MS = 650;
/* Na afloop blijft een stap niet stilstaan: na een korte pauze speelt ze opnieuw (zacht overvloeiend),
 * tot de gebruiker zelf verder klikt. Pauze (⏸ / spatie) zet alles stil. */
const LOOP_WAIT = 2600;
/* Automatisch verder (standaard aan): na een stap blijft het eindbeeld een leestijd staan en gaat het dan vanzelf
 * (zacht overvloeiend) naar de volgende stap; aan het einde van een hoofdstuk naar het volgende hoofdstuk van de lijn.
 * Uit: de stap herhaalt zich tot de gebruiker zelf klikt. ⏸ zet altijd alles stil. Keuze wordt onthouden (?auto=0|1). */
const AUTO_KEY = 'dna-app-auto';
let auto = (() => {
  const u = new URLSearchParams(location.search).get('auto');
  if (u === '0' || u === '1') return u === '1';
  try { const v = localStorage.getItem(AUTO_KEY); if (v === '0' || v === '1') return v === '1'; } catch {}
  return true;
})();
const CHAPTER_WAIT = 2500;                        // extra pauze vóór een nieuw hoofdstuk
/* leestijd: genoeg om titel + ondertitel rustig te lezen (≈ 55 ms per teken), 4–12 s, sneller bij hogere snelheid */
function readMs(i) {
  const st = current?.steps[i]; if (!st) return 5000;
  const n = (L(st.title) ?? '').length + (L(st.text) ?? '').length;
  return Math.min(12000, Math.max(4000, 1800 + 55 * n)) / Math.max(.5, speed);
}
let camNow = FULL.slice(), camTarget = FULL.slice(), camSnap = false;

/* ---------- vaste teksten ---------- */
document.querySelectorAll('[data-u]').forEach(e => e.textContent = V(e.dataset.u));
$('bHome').title = V('homeTip'); $('bUp').title = V('upTip');
$('tPrev').title = V('prevStep'); $('tNext').title = V('nextStep'); $('gearBtn').title = V('settings');
$('langBox').append(langSwitch('btn'));
$('bAtlas').href = new URL(`../atlas/index.html?lang=${lang}`, import.meta.url).href;   // werkt ook als de pagina elders staat (online)

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
function frame(now) {
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
    try { current.api?.update?.(s.t, s); } catch (e) { console.error(e); }
    if (si.step !== lastStep) { lastStep = si.step; onStep(si.step); }
    // camera
    if (current.svg) {
      camTarget = current.steps[si.step].cam ?? FULL;
      const k = camSnap ? 1 : 1 - Math.exp(-dt / 550); camSnap = false;
      camNow = camNow.map((v, i) => v + (camTarget[i] - v) * k);
      current.svg.setAttribute('viewBox', camNow.map(n => n.toFixed(2)).join(' '));
    }
    fadeGhost(now);
    updateSegs(si);
    if (showLabels) updateLabels();
  }
  requestAnimationFrame(frame);
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
  $('capText').textContent = L(st.text) ?? '';
  $('stepNo').textContent = `${V('step')} ${i + 1}/${current.steps.length}`;
  side.querySelectorAll('.stepsList li').forEach((li, k) => li.classList.toggle('cur', k === i));
  syncPlayBtn();
}
function setPlaying(v) {
  playing = v; syncPlayBtn();
  if (current?.svg) current.svg[v ? 'unpauseAnimations' : 'pauseAnimations']();
}
const stepEnd = i => stepStart(i + 1) - 1;       // net vóór het begin van de volgende stap
const isLast = () => stepInfo(t).step >= current.steps.length - 1;
/* Bediening als videospeler: ▶ = vanzelf verder (met leespauze), ⏸ = blijf bij deze stap (de stap herhaalt zich).
 * Het beeld zelf stilzetten gebeurt niet meer via de knop (enkel ?freeze, voor de testhulpmiddelen). */
function syncPlayBtn() {
  $('tPlay').textContent = auto ? '⏸' : '▶'; $('tPlay').title = V(auto ? 'holdStep' : 'playAuto');
  $('tPlay').setAttribute('aria-label', $('tPlay').title);
  $('playState').textContent = V(auto ? 'stateAuto' : 'stateHold');
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
  goal = stepEnd(i); held = false; done = false; setAutoFill(0, false);
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
  setAuto(!auto); if (!playing) setPlaying(true);
  // ▶ na een stap die al helemaal getoond is: meteen verder (niet eerst de herhaling uitspelen)
  if (auto && done && current) { const i = stepInfo(t).step; if (i < current.steps.length - 1) playStep(i + 1); else { held = true; holdT = 1e9; } }
};
$('tPrev').onclick = prevStep;
$('tNext').onclick = nextStep;
$('speed').onchange = e => speed = +e.target.value;
document.addEventListener('click', e => { if (!e.target.closest('#gear')) $('gear').open = false; });
/* tijdlijn in stukken: één stuk per stap (klikbaar, met de naam erbij); het stuk vult zich terwijl de stap speelt,
 * een lichtere vulling toont de leespauze voor het vanzelf verder gaat */
function drawTicks() {
  const tr = $('track'); tr.innerHTML = '';
  current.steps.forEach((s, i) => {
    const b = document.createElement('button'); b.className = 'seg';
    b.title = `${i + 1}. ${L(s.title) ?? ''}`; b.setAttribute('aria-label', `${V('step')} ${b.title}`);
    b.innerHTML = '<span class="sl"></span><i><s></s><em></em></i>';
    b.querySelector('.sl').textContent = L(s.title) ?? '';
    b.onclick = () => gotoStep(i);
    tr.append(b);
  });
}
function updateSegs(si) {
  const segs = $('track').children;
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
function toggleCap() { showCap = !showCap; $('caption').classList.toggle('mini', !showCap); }
$('bLabels').onclick = e => { showLabels = !showLabels; e.currentTarget.setAttribute('aria-pressed', showLabels); labelsEl.classList.toggle('hide', !showLabels); };

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
  t = 0; endedOnce = false; lastStep = -1; ff = null; playStep(0);
  if (push) { const i = trail.indexOf(id); trail = i >= 0 ? trail.slice(0, i + 1) : [...trail, id]; }
  const lk = lineFor(id); if (lk !== line) { setLine(lk); lastChapter = 0; }
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
  return id === 'cel' ? null : STORY_IDS[lastChapter] ?? 'cel';
}
function zoomOut() { const p = parentOf(current.id); if (p) go(p, null, 'out'); }
$('bUp').onclick = zoomOut;
$('bHome').onclick = () => { trail = []; go('cel', null, 'out'); };

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
  const dots = STORY.map((c, i) => `<i class="${i === ci ? 'cur' : i <= lastChapter ? 'on' : ''}"></i>`).join('');
  if (ci >= 0) {
    $('sInfo').innerHTML = `${L(LINES[line].short)} · ${V('chapter')} <b>${ci + 1}/${STORY.length}</b><div class="dots">${dots}</div>`;
    const pv = STORY[ci - 1], nx = STORY[ci + 1];   // hoofdstukken enkel hier, met de naam van het vorige/volgende erbij
    $('sPrevName').textContent = pv ? title(NODES[pv.id]) : ''; $('sNextName').textContent = nx ? title(NODES[nx.id]) : '';
    $('sPrev').title = pv ? `${V('chapter')} ${ci}: ${title(NODES[pv.id])}` : ''; $('sNext').title = nx ? `${V('chapter')} ${ci + 2}: ${title(NODES[nx.id])}` : '';
    $('sPrev').disabled = !pv; $('sNext').disabled = !nx;
    $('sPrev').onclick = () => chapterGo(ci - 1); $('sNext').onclick = () => chapterGo(ci + 1);
  } else {
    $('sInfo').innerHTML = `${V('sidePath')}<div class="dots">${dots}</div>`;
    $('sPrevName').textContent = ''; $('sPrev').title = ''; $('sPrev').disabled = true;
    $('sNextName').textContent = `${V('backTo')} (${lastChapter + 1})`; $('sNext').title = title(NODES[STORY[lastChapter].id]);
    $('sNext').disabled = false; $('sNext').onclick = () => chapterGo(lastChapter);
  }
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
/* "In het kort": 2–3 zinnen in eenvoudige taal (details[lang].kort), bovenaan het uitlegpaneel */
const kortOf = id => { const d = DETAILS[id]; return d ? (d[lang] ?? d.nl).kort ?? '' : ''; };
function detailsHTML(id, open = true) {
  const d = DETAILS[id]; if (!d) return '';
  const x = d[lang] ?? d.nl;
  let h = '';
  if (x.what) h += `<details class="sec" ${open ? 'open' : ''}><summary>${V('what')}</summary><p>${x.what}</p></details>`;
  // de diepgang blijft beschikbaar, maar staat standaard dicht (enkel "Wat" is open)
  if (x.how?.length) h += `<details class="sec"><summary>${V('how')}</summary><ol>${x.how.map(s => `<li>${s}</li>`).join('')}</ol></details>`;
  if (x.facts?.length) h += `<details class="sec"><summary>${V('facts')}</summary><dl class="facts">${x.facts.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl></details>`;
  if (x.why) h += `<details class="sec"><summary>${V('why')}</summary><p>${x.why}</p></details>`;
  if (d.sources?.length) h += `<details class="sec"><summary>${V('sources')} (${d.sources.length})</summary><ol class="src">${d.sources.map(s => `<li>${s.url ? `<a href="${s.url}" target="_blank" rel="noopener">${s.t}</a>` : s.t}</li>`).join('')}</ol></details>`;
  return h;
}
function render() {
  const def = current.def, base = current.base, n = NODES[current.id];
  $('crumbs').innerHTML = trail.map((id, i) => i === trail.length - 1 ? `<b>${L(SCENES[id].title) ?? title(NODES[id])}</b>`
    : `<button data-i="${i}">${L(SCENES[id].title) ?? title(NODES[id])}</button><span>›</span>`).join('');
  $('crumbs').querySelectorAll('button').forEach(b => b.onclick = () => go(trail[+b.dataset.i], null, 'out'));
  const lvl = n?.scale ?? 3;
  const sc = L(def.scale ?? base.scale), tm = L(def.time ?? base.time);
  $('scalebox').innerHTML = `<span class="zoomlvl" title="${L({ nl: 'Zoomniveau: van cel (links) tot atomen (rechts)', en: 'Zoom level: from cell (left) to atoms (right)' })}">${SCALES.map(s => `<i class="${s.id <= lvl ? 'on' : ''}" title="${scaleTitle(s)}"></i>`).join('')}</span>` +
    (sc ? `<span title="${L({ nl: 'Hoe groot dit in werkelijkheid is', en: 'How big this is in reality' })}">📏 ${L({ nl: 'Echte grootte', en: 'Real size' })}: <b>${sc}</b></span>` : '') +
    (tm ? `<span title="${L({ nl: 'Hoe lang dit proces in de cel echt duurt. De animatie is vertraagd of versneld om het te kunnen volgen.', en: 'How long this process really takes in the cell. The animation is slowed down or sped up so you can follow it.' })}">⏱ ${L({ nl: 'Echte duur', en: 'Real duration' })}: <b>${tm}</b></span>` : '');
  const ups = n ? [...new Set([...n.parents, ...n.prev])] : [];
  side.innerHTML = `
    <button class="btn sheetclose" id="sheetClose">${V('close')} ✕</button>
    <div class="kind">${n ? U(n.kind === 'process' ? 'process' : 'structure') : ''} · ${L(def.org ?? base.org) ?? ''} · ${n ? stageTitle(STAGES.find(s => s.id === n.stage)) : ''}</div>
    <h1>${n ? title(n) : L(def.title)}${n ? `<span class="status ${n.status === 'nagekeken' ? 'ok' : ''}">${statusText(n.status)}</span>` : ''}</h1>
    ${n ? `<div class="en">${sub(n)}</div>${kortOf(current.id) ? `<div class="kort"><b>${V('inShort')}</b>${kortOf(current.id)}</div>` : `<p>${summary(n)}</p>`}` : ''}
    ${detailsHTML(current.id)}
    <details class="sec" open><summary>${V('stepsHere')}</summary><ol class="stepsList">${current.steps.map((s, i) => `<li data-i="${i}">${L(s.title)}</li>`).join('')}</ol></details>
    ${L(def.extra ?? base.extra) ?? ''}
    ${ups.length ? `<div class="sec"><div class="kind" style="color:var(--muted)">${V('up')}</div>${chipsOf(ups, 'up')}</div>` : ''}
    ${n?.in.length ? `<div class="sec"><div class="kind" style="color:var(--muted)">${V('zoomIn')}</div>${chipsOf(n.in, '')}</div>` : ''}
    ${n?.next.length ? `<div class="sec"><div class="kind" style="color:var(--muted)">${V('next')}</div>${chipsOf(n.next, 'next')}</div>` : ''}
    ${n?.rel.length ? `<div class="sec"><div class="kind" style="color:var(--muted)">${V('side')}</div>${chipsOf(n.rel, 'rel')}</div>` : ''}
    ${n?.pdb.length ? `<div class="sec"><div class="kind" style="color:var(--muted)">${V('struct3d')}</div>${n.pdb.map(p => `<a class="chip" href="https://www.rcsb.org/structure/${p}" target="_blank" rel="noopener">PDB ${p} ↗</a>`).join('')}</div>` : ''}
    ${(def.legend ?? base.legend) ? `<div class="sec"><div class="kind" style="color:var(--muted)">${V('legend')}</div><div class="legend">${(def.legend ?? base.legend).map(([c, x]) => `<span><i style="background:${c}"></i>${L(x)}</span>`).join('')}</div></div>` : ''}
    <div class="simp"><b>${V('simplified')}</b><br>${L(def.simplified ?? base.simplified) ?? ''}</div>`;
  $('sheetClose').onclick = () => toggleInfo(false);
  side.querySelectorAll('.chip[data-id]').forEach(c => c.onclick = () => { if (narrow()) toggleInfo(false); chipGo(c.dataset.id); });
  side.querySelectorAll('.stepsList li').forEach(li => li.onclick = () => gotoStep(+li.dataset.i));
  side.scrollTop = 0;
  renderStory();
  onStep(stepInfo(t).step);
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
    <p style="font-size:14px;line-height:1.6;color:#c9d2e4">${summary(n)}</p>${detailsHTML(id, false)}
    <div>${chipsOf(n.in, '')}${chipsOf(n.next, 'next')}${chipsOf(n.rel, 'rel')}</div>
    <p style="font-size:12.5px;color:var(--muted);margin-top:14px">${V('noScene')}</p>`;
  $('card').classList.add('show');
  $('cClose').onclick = hideOverlays;
  $('cardbody').querySelectorAll('.chip[data-id]').forEach(c => c.onclick = () => { hideOverlays(); chipGo(c.dataset.id); });
}
const STAGECOL = { entry: 'var(--tdna)', genome: 'var(--dna)', repl: 'var(--dna-2)', txn: 'var(--prot)', rna: 'var(--rna)', tl: 'var(--rrna)', prot: 'var(--chain)' };
function showMap() {
  const here = current.id;
  let h = `<button class="btn close" id="mClose">${V('close')} ✕</button><h2>${V('mapTitle')}</h2><p class="sub">${V('mapSub')}</p>`;
  for (const k of LINE_KEYS) {
    const ch = LINES[k].chapters;
    h += `<div class="linehd ${k === line ? 'cur' : ''}">${L(LINES[k].title)}${k === line ? ` <span>· ${L({ nl: 'nu gekozen', en: 'current' })}</span>` : ''}</div>`;
    h += `<div class="storyrow">${ch.map((c, i) => `<button data-id="${c.id}" data-line="${k}" class="${c.id === here && k === line ? 'cur' : ''}"><b>${i + 1}</b>${title(NODES[c.id])}</button>`).join('')}</div>`;
  }
  h += `<div style="overflow-x:auto"><div class="mgrid"><div class="hd">↓ ${L({ nl: 'zoom', en: 'zoom' })} · ${L({ nl: 'proces', en: 'process' })} →</div>`;
  h += STAGES.map(s => `<div class="hd">${stageTitle(s)}</div>`).join('');
  for (const sc of SCALES) {
    h += `<div class="rh">${sc.id}. ${scaleTitle(sc)}<br><span style="font:400 10px var(--mono)">${sc.range}</span></div>`;
    for (const st of STAGES) {
      h += `<div class="cell">` + Object.values(NODES).filter(n => n.stage === st.id && n.scale === sc.id).map(n => {
        const ch = STORY_IDS.indexOf(n.id);
        return `<button class="n ${n.id === here ? 'here' : ''} ${ch >= 0 ? 'story' : ''} ${hasScene(n.id) ? '' : 'noscene'}" data-ch="${ch + 1}" data-id="${n.id}" style="--c:${STAGECOL[n.stage]}">${title(n)}</button>`;
      }).join('') + `</div>`;
    }
  }
  h += `</div></div>`;
  $('mapbody').innerHTML = h;
  $('map').classList.add('show');
  $('mClose').onclick = hideOverlays;
  $('mapbody').querySelectorAll('[data-id]').forEach(b => b.onclick = () => {
    hideOverlays();
    if (b.dataset.line && b.dataset.line !== line) { setLine(b.dataset.line); lastChapter = Math.max(0, STORY_IDS.indexOf(b.dataset.id)); if (b.dataset.id === current.id) { render(); return; } }
    chipGo(b.dataset.id);
  });
}
$('bMap').onclick = showMap;

/* ---------- toetsenbord ---------- */
document.addEventListener('keydown', e => {
  if (e.target.closest('select, input')) return;
  if (e.key === 'Escape') { if ($('card').classList.contains('show') || $('map').classList.contains('show')) hideOverlays(); else zoomOut(); }
  else if (e.key === ' ') { e.preventDefault(); $('tPlay').click(); }   // ▶ vanzelf verder / ⏸ blijf bij deze stap
  else if (e.key === 'ArrowRight') $('tNext').click();
  else if (e.key === 'ArrowLeft') $('tPrev').click();
  else if (e.key === 'm') showMap();
  else if (e.key === 'c') toggleCap();
  else if (e.key === 'a') $('tPlay').click();
});
addEventListener('resize', () => requestAnimationFrame(placeLabels));

/* ---------- start ---------- */
const startId = hasScene(q.get('scene')) ? q.get('scene') : (hasScene('cel') ? 'cel' : Object.keys(SCENES)[0]);
const fromId = q.get('from');
if (fromId && hasScene(fromId) && fromId !== startId) trail = [fromId];
if (startId) {
  current = build(startId);
  trail = [...trail, startId];
  setLine(lineFor(startId));
  const ci = STORY_IDS.indexOf(startId); if (ci >= 0) lastChapter = ci;
  camNow = (current.steps[0].cam ?? FULL).slice();
  if (q.has('t')) t = Math.min(current.total - 1, +q.get('t'));
  if (q.has('step')) { const k = Math.max(0, Math.min(current.steps.length - 1, +q.get('step') || 0)); t = stepStart(k) + (q.has('p') ? +q.get('p') * current.steps[k].dur : 1); }   // stap buiten bereik (bv. overzichtsscène) → begrenzen
  camSnap = true;
  render(); drawTicks();
  playStep(stepInfo(t).step);
  if (q.has('freeze')) setPlaying(false);
  const boot = $('boot'); if (boot) { boot.classList.add('gone'); setTimeout(() => boot.remove(), 500); }
  requestAnimationFrame(placeLabels);
}
