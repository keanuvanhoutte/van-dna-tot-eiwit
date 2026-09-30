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
import { STORY, STORY_IDS } from './story.js';

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
  play: { nl: 'Afspelen (spatie)', en: 'Play (space)' }, pause: { nl: 'Pauze (spatie)', en: 'Pause (space)' }, prevStep: { nl: 'Vorige stap (←)', en: 'Previous step (←)' }, nextStep: { nl: 'Volgende stap (→)', en: 'Next step (→)' }, nextStepBtn: { nl: 'Volgende stap →', en: 'Next step →' },
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
let camNow = FULL.slice(), camTarget = FULL.slice(), camSnap = false;

/* ---------- vaste teksten ---------- */
document.querySelectorAll('[data-u]').forEach(e => e.textContent = V(e.dataset.u));
$('bHome').title = V('homeTip'); $('bUp').title = V('upTip');
$('tPrev').title = V('prevStep'); $('tNext').title = V('nextStep');
$('langBox').append(langSwitch('btn'));
$('bAtlas').href = new URL(`../atlas/index.html?lang=${lang}`, import.meta.url).href;   // werkt ook als de pagina elders staat (online)

/* ---------- scène-definities ---------- */
function resolve(id) {
  const def = SCENES[id];
  if (!def) return null;
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
      } else if (held) {                          // even op het eindbeeld, dan de stap opnieuw
        holdT += dt;
        if (holdT > LOOP_WAIT) { makeGhost(); t = stepStart(stepInfo(t).step) + 1; held = false; }
      } else {
        t = Math.min(goal, t + dt * speed);
        if (t >= goal) hold();
      }
    }
    const si = stepInfo(t);
    if (si.step !== lastStep && lastStep >= 0) makeGhost();      // vorig beeld bewaren om zacht over te vloeien
    const s = { step: si.step + (current.from ?? 0), p: si.p, t: t + current.offset, total: current.total };
    try { current.api?.update?.(t + current.offset, s); } catch (e) { console.error(e); }
    if (si.step !== lastStep) { lastStep = si.step; onStep(si.step); }
    // camera
    if (current.svg) {
      camTarget = current.steps[si.step].cam ?? FULL;
      const k = camSnap ? 1 : 1 - Math.exp(-dt / 550); camSnap = false;
      camNow = camNow.map((v, i) => v + (camTarget[i] - v) * k);
      current.svg.setAttribute('viewBox', camNow.map(n => n.toFixed(2)).join(' '));
    }
    fadeGhost(now);
    $('fill').style.width = (100 * t / current.total) + '%';
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
}
function setPlaying(v) {
  playing = v; syncPlayBtn();
  if (current?.svg) current.svg[v ? 'unpauseAnimations' : 'pauseAnimations']();
}
const stepEnd = i => stepStart(i + 1) - 1;       // net vóór het begin van de volgende stap
const isLast = () => stepInfo(t).step >= current.steps.length - 1;
function syncPlayBtn() {
  $('tPlay').textContent = playing ? '⏸' : '▶'; $('tPlay').title = playing ? V('pause') : V('play');
  const wait = done && current && !isLast();
  $('tNext').classList.toggle('pulse', wait);
  $('capNext').classList.toggle('show', wait);
}
function hold() {
  held = true; holdT = 0; done = true; syncPlayBtn();
  if (isLast() && !endedOnce) { endedOnce = true; showNextChapter(); }
}
/* speel stap i vanaf tijdstip 'from' (optioneel eerst zichtbaar spoelen) tot het einde van die stap */
function playStep(i, from = null) {
  if (!current) return;
  i = Math.max(0, Math.min(current.steps.length - 1, i));
  goal = stepEnd(i); held = false; done = false;
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
$('tPlay').onclick = () => setPlaying(!playing);
$('tPrev').onclick = prevStep;
$('tNext').onclick = nextStep;
$('capNext').onclick = nextStep;
$('speed').onchange = e => speed = +e.target.value;
$('track').onclick = e => { const r = e.currentTarget.getBoundingClientRect(); t = Math.max(0, Math.min(.999, (e.clientX - r.left) / r.width)) * current.total; ff = null; playStep(stepInfo(t).step); };
function drawTicks() {
  const tr = $('track'); tr.querySelectorAll('.tick').forEach(x => x.remove());
  let acc = 0;
  current.steps.forEach((s, i) => { if (i) { const d = document.createElement('i'); d.className = 'tick'; d.style.left = (100 * acc / current.total) + '%'; tr.append(d); } acc += s.dur; });
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
  if (current && id === current.id) return;
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
  const drawFirst = () => { try { nxt.api?.update?.(nxt.offset, { step: nxt.from ?? 0, p: 0, t: nxt.offset, total: nxt.total }); } catch (e) { console.error(e); } };
  drawFirst();
  const firstCam = nxt.steps[0].cam ?? FULL;
  const nStart = dir === 'in' ? [firstCam[0] + firstCam[2] * .3, firstCam[1] + firstCam[3] * .3, firstCam[2] * .4, firstCam[3] * .4]
                              : [firstCam[0] - firstCam[2] * .5, firstCam[1] - firstCam[3] * .5, firstCam[2] * 2, firstCam[3] * 2];
  const oFrom = camNow.slice();
  const oTo = dir === 'in' ? (box ?? [oFrom[0] + oFrom[2] * .4, oFrom[1] + oFrom[3] * .4, oFrom[2] * .2, oFrom[3] * .2]) : [oFrom[0] - oFrom[2], oFrom[1] - oFrom[3], oFrom[2] * 3, oFrom[3] * 3];
  // 3D-lagen: zoom met CSS-schaal
  const css = (lay, sc) => { lay.style.transform = `scale(${sc})`; };
  if (nxt.svg) nxt.svg.setAttribute('viewBox', nStart.join(' '));
  await tween(1150, k => {
    if (old) {
      if (old.svg) old.svg.setAttribute('viewBox', lerpBox(oFrom, oTo, Math.min(1, k * 1.25)).join(' '));
      else css(old.layer, dir === 'in' ? 1 + k * 2.5 : 1 - k * .6);
      old.layer.style.opacity = 1 - Math.max(0, (k - .35) / .5);
    }
    const kk = Math.max(0, (k - .3) / .7);
    nxt.layer.style.opacity = Math.min(1, kk * 1.6);
    if (nxt.svg) nxt.svg.setAttribute('viewBox', lerpBox(nStart, firstCam, kk).join(' '));
    else css(nxt.layer, dir === 'in' ? .4 + .6 * kk : 2 - kk);
  });
  if (old) { try { old.api?.destroy?.(); } catch {} old.layer.remove(); }
  nxt.layer.style.transform = '';
  current = nxt; camNow = firstCam.slice();
  t = 0; endedOnce = false; lastStep = -1; ff = null; playStep(0);
  if (push) { const i = trail.indexOf(id); trail = i >= 0 ? trail.slice(0, i + 1) : [...trail, id]; }
  const ci = STORY_IDS.indexOf(id); if (ci >= 0) lastChapter = ci;
  render(); drawTicks();
  busy = false;
  labelsEl.classList.toggle('hide', !showLabels);
  requestAnimationFrame(placeLabels);
  history.replaceState(null, '', `?scene=${id}`);
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
  go(id, null, dir);
}
function renderStory() {
  const ci = STORY_IDS.indexOf(current.id);
  const dots = STORY.map((c, i) => `<i class="${i === ci ? 'cur' : i <= lastChapter ? 'on' : ''}"></i>`).join('');
  if (ci >= 0) {
    $('sInfo').innerHTML = `${V('chapter')} <b>${ci + 1}/${STORY.length}</b> · ${title(NODES[current.id])}<div class="dots">${dots}</div>`;
    $('sPrev').disabled = ci === 0; $('sNext').disabled = ci === STORY.length - 1;
    $('sPrev').onclick = () => chapterGo(ci - 1); $('sNext').onclick = () => chapterGo(ci + 1);
  } else {
    $('sInfo').innerHTML = `${V('sidePath')} · <button class="back" id="sBack">${V('backTo')} (${lastChapter + 1})</button><div class="dots">${dots}</div>`;
    $('sBack').onclick = () => chapterGo(lastChapter);
    $('sPrev').disabled = true; $('sNext').disabled = false; $('sNext').onclick = () => chapterGo(lastChapter);
  }
}
function showNextChapter() {
  const ci = STORY_IDS.indexOf(current.id);
  const box = $('nextCh');
  if (ci < 0 || ci >= STORY.length - 1) return;
  const nx = STORY[ci + 1];
  box.innerHTML = `<button title="${L(STORY[ci].bridge)}">${V('nextChapter')}: ${title(NODES[nx.id])} →</button>`;
  box.querySelector('button').onclick = () => chapterGo(ci + 1);
  box.classList.add('show');
}

/* ---------- zijpaneel ---------- */
const chipsOf = (ids, cls) => ids.filter(i => NODES[i]).map(i => `<button class="chip ${cls} ${hasScene(i) ? 'has' : ''}" data-id="${i}">${title(NODES[i])}</button>`).join('');
function detailsHTML(id, open = true) {
  const d = DETAILS[id]; if (!d) return '';
  const x = d[lang] ?? d.nl;
  let h = '';
  if (x.what) h += `<details class="sec" ${open ? 'open' : ''}><summary>${V('what')}</summary><p>${x.what}</p></details>`;
  if (x.how?.length) h += `<details class="sec" ${open ? 'open' : ''}><summary>${V('how')}</summary><ol>${x.how.map(s => `<li>${s}</li>`).join('')}</ol></details>`;
  if (x.facts?.length) h += `<details class="sec" ${open ? 'open' : ''}><summary>${V('facts')}</summary><dl class="facts">${x.facts.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl></details>`;
  if (x.why) h += `<details class="sec" ${open ? 'open' : ''}><summary>${V('why')}</summary><p>${x.why}</p></details>`;
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
    ${n ? `<div class="en">${sub(n)}</div><p>${summary(n)}</p>` : ''}
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
  h += `<div class="storyrow">${STORY.map((c, i) => `<button data-id="${c.id}" class="${c.id === here ? 'cur' : ''}"><b>${i + 1}</b>${title(NODES[c.id])}</button>`).join('')}</div>`;
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
  $('mapbody').querySelectorAll('[data-id]').forEach(b => b.onclick = () => { hideOverlays(); chipGo(b.dataset.id); });
}
$('bMap').onclick = showMap;

/* ---------- toetsenbord ---------- */
document.addEventListener('keydown', e => {
  if (e.target.closest('select, input')) return;
  if (e.key === 'Escape') { if ($('card').classList.contains('show') || $('map').classList.contains('show')) hideOverlays(); else zoomOut(); }
  else if (e.key === ' ') { e.preventDefault(); $('tPlay').click(); }
  else if (e.key === 'ArrowRight') $('tNext').click();
  else if (e.key === 'ArrowLeft') $('tPrev').click();
  else if (e.key === 'm') showMap();
  else if (e.key === 'c') toggleCap();
});
addEventListener('resize', () => requestAnimationFrame(placeLabels));

/* ---------- start ---------- */
const startId = hasScene(q.get('scene')) ? q.get('scene') : (hasScene('cel') ? 'cel' : Object.keys(SCENES)[0]);
const fromId = q.get('from');
if (fromId && hasScene(fromId) && fromId !== startId) trail = [fromId];
if (startId) {
  current = build(startId);
  trail = [...trail, startId];
  const ci = STORY_IDS.indexOf(startId); if (ci >= 0) lastChapter = ci;
  camNow = (current.steps[0].cam ?? FULL).slice();
  if (q.has('t')) t = Math.min(current.total - 1, +q.get('t'));
  if (q.has('step')) t = stepStart(+q.get('step')) + (q.has('p') ? +q.get('p') * current.steps[+q.get('step')].dur : 1);
  camSnap = true;
  render(); drawTicks();
  playStep(stepInfo(t).step);
  if (q.has('freeze')) setPlaying(false);
  requestAnimationFrame(placeLabels);
}
