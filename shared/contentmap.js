/*
 * Inhoudskaart — één gedeeld onderdeel voor de app ("Waar ben ik?") en de pagina "Over de app".
 * Opbouw (zo eenvoudig mogelijk):
 *   - bovenaan "Hier ben je": onderwerp, verhaal, halte x van y en een voortgangsbalk
 *   - Verhalen:     links de lijst met verhalen, rechts het gekozen verhaal als één verticale route
 *   - Onderwerpen:  alle onderwerpen per thema (groot → klein)
 *   - zoeken:       één lijst met treffers
 * Klik op een onderwerp → de uitleg en de knop om de animatie te openen klappen eronder open.
 *
 * mountMap(host, {
 *   NODES, STAGES, SCALES, SCALES_EN, LINES, MAIN_KEYS, SIDE_KEYS, DETAILS, S_EN, lang, L,
 *   here?: knoop-id waar de gebruiker nu is,  line?: huidige verhaallijn,
 *   engine?: () => Promise<zoekmotor met query()>   (shared/search.js, optioneel: slimmer zoeken),
 *   onOpen(id, lineKey)  — animatie openen,  view?: 'lines' | 'topics'
 * })
 */

const STAGECOL = { entry: '#f06bc0', genome: '#4f8ff7', repl: '#9cc0ff', txn: '#9b7bff', rna: '#ff8a3d', tl: '#2cc6a8', prot: '#7fdc6a', bact: '#d65a5a' };
const LINECOL = { virus: '#ff8a3d', signaal: '#7fdc6a', bacterie: '#ff8f8f', herstel: '#4f8ff7', targeting: '#9b7bff', epigen: '#ffc247', virusroute: '#ff9d5c', rnalot: '#2cc6a8', antibiotica: '#e8a23a' };
const lineCol = k => LINECOL[k] ?? '#7cc4ff';
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const norm = s => String(s ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const plain = s => String(s ?? '').replace(/\[\[([^|\]]+)\|[^\]]+\]\]/g, '$1').replace(/<[^>]+>/g, '');

const T = {
  lines: { nl: 'Verhalen', en: 'Stories' },
  topics: { nl: 'Alle onderwerpen', en: 'All topics' },
  hLines: { nl: 'Kies links een verhaal. Klik op een halte voor uitleg.', en: 'Pick a story on the left. Click a stop for an explanation.' },
  hTopics: { nl: 'Per thema, van groot (een cel) naar klein (moleculen). Klik op een onderwerp voor uitleg.', en: 'By theme, from large (a cell) to small (molecules). Click a topic for an explanation.' },
  search: { nl: 'Zoek een onderwerp (bv. ribosoom, splicing, virus)', en: 'Search a topic (e.g. ribosome, splicing, virus)' },
  hits: { nl: 'treffers voor', en: 'matches for' }, hit1: { nl: 'treffer voor', en: 'match for' },
  none: { nl: 'Geen treffers. Probeer een ander woord.', en: 'No matches. Try another word.' },
  clear: { nl: 'Wis zoeken', en: 'Clear search' },
  main: { nl: 'Hoofdverhalen', en: 'Main stories' }, sides: { nl: 'Zijpaden', en: 'Side paths' },
  stops: { nl: 'haltes', en: 'stops' }, stop: { nl: 'halte', en: 'stop' }, of: { nl: 'van', en: 'of' },
  youHere: { nl: 'Hier ben je', en: 'You are here' }, hereTag: { nl: 'hier ben je', en: 'you are here' },
  loose: { nl: 'los onderwerp, niet in een verhaal', en: 'separate topic, not in a story' },
  branchOff: { nl: 'Takt af van', en: 'Branches off' }, at: { nl: 'bij', en: 'at' },
  side: { nl: 'zijpad', en: 'side path' },
  open: { nl: '▶ Open de animatie', en: '▶ Open the animation' },
  back: { nl: '▶ Terug naar deze animatie', en: '▶ Back to this animation' },
  also: { nl: 'Zit ook in', en: 'Also in' }, inStory: { nl: 'Zit in', en: 'Part of' },
};

let styled = false;
function addStyle() {
  if (styled) return; styled = true;
  const s = document.createElement('style');
  s.textContent = `
.cmap { --cm-line: rgba(160,180,220,.16); --cm-mut: var(--muted, #93a0bb); --cm-acc: #7cc4ff; --cm-here: #ffc247; color: var(--text, #e8edf7); }
.cmap button { font: inherit; color: inherit; }
.cmap button:focus-visible, .cmap input:focus-visible { outline: 2px solid var(--cm-acc); outline-offset: 2px; }

/* hier ben je */
.cmap .cm-you { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; padding: 12px 16px; margin-bottom: 14px; border-radius: 12px;
  background: rgba(255,194,71,.08); border: 1px solid rgba(255,194,71,.35); }
.cmap .cm-you .pin { width: 12px; height: 12px; border-radius: 50%; background: var(--cm-here); box-shadow: 0 0 0 4px rgba(255,194,71,.25); flex: none; }
.cmap .cm-you .txt { font-size: 15px; line-height: 1.4; }
.cmap .cm-you .txt small { display: block; font-size: 12px; letter-spacing: .06em; text-transform: uppercase; color: var(--cm-here); font-weight: 700; }
.cmap .cm-you .txt b { font-size: 17px; }
.cmap .cm-you .where { color: var(--cm-mut); }
.cmap .cm-you .prog { flex: 1 1 160px; max-width: 260px; margin-left: auto; }
.cmap .cm-you .prog span { display: block; font-size: 12.5px; color: var(--cm-mut); margin-bottom: 4px; text-align: right; }
.cmap .cm-you .prog div { height: 8px; border-radius: 4px; background: rgba(255,255,255,.1); overflow: hidden; }
.cmap .cm-you .prog i { display: block; height: 100%; background: var(--lc); border-radius: 4px; }

/* bovenbalk */
.cmap .cm-top { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 6px; }
.cmap .cm-tabs { display: inline-flex; border: 1px solid var(--cm-line); border-radius: 12px; padding: 3px; gap: 3px; }
.cmap .cm-tabs button { all: unset; cursor: pointer; font-size: 14.5px; font-weight: 600; padding: 8px 16px; border-radius: 9px; color: var(--cm-mut); }
.cmap .cm-tabs button[aria-selected="true"] { background: rgba(124,196,255,.16); color: var(--text, #e8edf7); }
.cmap .cm-q { flex: 1 1 260px; max-width: 440px; margin-left: auto; background: #0d1426; border: 1px solid var(--cm-line); color: inherit; border-radius: 10px; padding: 9px 12px; font: inherit; font-size: 14px; }
.cmap .cm-q:focus { outline: none; border-color: var(--cm-acc); }
.cmap .cm-help { margin: 2px 0 14px; font-size: 14px; color: var(--cm-mut); }

/* verhalen: lijst links, route rechts */
.cmap .cm-split { display: grid; grid-template-columns: 250px minmax(0, 1fr); gap: 22px; align-items: start; }
@media (max-width: 760px) { .cmap .cm-split { grid-template-columns: 1fr; } }
.cmap .cm-split > * { max-height: var(--cm-h, 56vh); overflow: auto; position: relative; scrollbar-width: thin; }
.cmap .cm-list { display: grid; gap: 4px; align-content: start; padding-right: 4px; }
.cmap .cm-grp { font: 700 11.5px var(--mono, monospace); letter-spacing: .08em; text-transform: uppercase; color: var(--cm-mut); margin: 4px 0 4px 4px; }
.cmap .cm-grp.sep { margin-top: 14px; }
.cmap .cm-ln { all: unset; cursor: pointer; display: grid; grid-template-columns: 12px 1fr auto; gap: 4px 10px; align-items: center; padding: 8px 10px; border-radius: 10px; border: 1px solid transparent; }
.cmap .cm-ln i { width: 12px; height: 12px; border-radius: 50%; background: var(--lc); }
.cmap .cm-ln span { font-size: 14px; line-height: 1.3; }
.cmap .cm-ln small { font-size: 12px; color: var(--cm-mut); }
.cmap .cm-ln .yh { grid-column: 2 / 4; font-size: 11.5px; font-weight: 700; color: var(--cm-here); }
.cmap .cm-ln:hover { background: rgba(255,255,255,.05); }
.cmap .cm-ln[aria-current="true"] { background: rgba(255,255,255,.07); border-color: var(--lc); }

.cmap .cm-route header { margin-bottom: 12px; position: sticky; top: 0; z-index: 2; background: var(--bg-2, #0d1426); padding-bottom: 8px; }
.cmap .cm-route header small { display: block; font: 700 12px var(--mono, monospace); letter-spacing: .07em; text-transform: uppercase; color: var(--lc); }
.cmap .cm-route header h3 { margin: 2px 0 4px; font-size: 21px; line-height: 1.25; }
.cmap .cm-route header p { margin: 0; font-size: 13.5px; color: var(--cm-mut); }
.cmap .cm-route header p button { all: unset; cursor: pointer; color: var(--text, #e8edf7); text-decoration: underline; text-underline-offset: 3px; }
.cmap ol.cm-stops { list-style: none; margin: 0; padding: 0; max-width: 640px; }
.cmap .cm-st { position: relative; padding: 3px 0 3px 46px; }
.cmap .cm-st::before { content: ""; position: absolute; left: 15px; top: 0; bottom: 0; width: 4px; background: var(--lc); }
.cmap .cm-st:first-child::before { top: 20px; }
.cmap .cm-st:last-child::before { bottom: auto; height: 20px; }
.cmap .cm-st.later::before { opacity: .28; }
.cmap .cm-st > b { position: absolute; left: 3px; top: 7px; width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center; z-index: 1;
  background: var(--lc); color: #0a0f1d; font: 700 12.5px var(--mono, monospace); }
.cmap .cm-st.later > b { background: #1a2338; color: var(--lc); box-shadow: inset 0 0 0 2px var(--lc); }
.cmap .cm-st.here > b { box-shadow: 0 0 0 3px var(--bg-2, #0b1120), 0 0 0 6px var(--cm-here); }
.cmap .cm-it { all: unset; cursor: pointer; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; width: 100%; box-sizing: border-box; padding: 8px 12px; border-radius: 10px; font-size: 15px; line-height: 1.3; }
.cmap .cm-it:hover { background: rgba(255,255,255,.06); }
.cmap .cm-it[aria-expanded="true"] { background: rgba(255,255,255,.07); }
.cmap .cm-tag { font-size: 11.5px; font-weight: 700; padding: 2px 8px; border-radius: 999px; background: rgba(255,194,71,.18); color: var(--cm-here); }
.cmap .cm-br { all: unset; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; margin: 0 0 4px 12px; font-size: 12.5px; color: var(--cm-mut); }
.cmap .cm-br i { width: 9px; height: 9px; border-radius: 50%; background: var(--bc); }
.cmap .cm-br:hover { color: var(--text, #e8edf7); text-decoration: underline; }

/* uitleg die openklapt */
.cmap .cm-more { margin: 4px 0 10px 12px; padding: 12px 14px; border-radius: 10px; background: #0d1426; border: 1px solid var(--cm-line); font-size: 14px; line-height: 1.55; max-width: 600px; }
.cmap .cm-more p { margin: 0 0 10px; }
.cmap .cm-go { all: unset; cursor: pointer; display: inline-block; padding: 8px 14px; border-radius: 9px; font-weight: 700; font-size: 14px; background: var(--cm-acc); color: #07101f !important; }
.cmap .cm-go:hover { filter: brightness(1.1); }
.cmap .cm-also { margin-top: 10px; font-size: 12.5px; color: var(--cm-mut); display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.cmap .cm-in { all: unset; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; padding: 3px 9px; border-radius: 999px; border: 1px solid var(--lc); color: var(--text, #e8edf7); }
.cmap .cm-in i { width: 8px; height: 8px; border-radius: 50%; background: var(--lc); }
.cmap .cm-in:hover { background: rgba(255,255,255,.07); }

/* alle onderwerpen */
.cmap .cm-topics { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; align-items: start; }
.cmap .cm-tc { border: 1px solid var(--cm-line); border-top: 3px solid var(--sc); border-radius: 12px; padding: 8px 6px 6px; }
.cmap .cm-tc h4 { margin: 2px 8px 6px; font-size: 15px; display: flex; justify-content: space-between; gap: 8px; }
.cmap .cm-tc h4 small { font-weight: 400; color: var(--cm-mut); font-size: 12.5px; }
.cmap .cm-tc ul, .cmap .cm-res { list-style: none; margin: 0; padding: 0; }
.cmap .cm-tc .cm-it { font-size: 14px; padding: 6px 8px; }
.cmap .cm-tc .cm-more { margin: 2px 4px 8px; }

/* zoekresultaten */
.cmap .cm-rhead { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; font-size: 14px; color: var(--cm-mut); }
.cmap .cm-rhead button { all: unset; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; color: var(--text, #e8edf7); }
.cmap .cm-res { max-width: 720px; display: grid; gap: 4px; }
.cmap .cm-res li { border-left: 3px solid var(--sc); padding-left: 4px; }
.cmap .cm-res .cm-it small { color: var(--cm-mut); font-size: 12.5px; }
`;
  document.head.append(s);
}

export function mountMap(host, o) {
  addStyle();
  const { NODES, STAGES, LINES, MAIN_KEYS, SIDE_KEYS, DETAILS = {}, S_EN = {}, lang, L } = o;
  const en = lang === 'en';
  const tt = n => (en ? n.en : n.t);
  const stageT = s => (en ? s.en : s.t);
  const kort = id => plain(DETAILS[id]?.[lang]?.kort ?? (en ? S_EN[id] ?? NODES[id]?.s : NODES[id]?.s));
  const ids = Object.keys(NODES).filter(id => STAGES.some(s => s.id === NODES[id].stage));
  const allKeys = [...MAIN_KEYS, ...SIDE_KEYS].filter(k => LINES[k]);
  const stopsOf = k => LINES[k].chapters.filter(c => NODES[c.id]).map(c => c.id);
  const inLines = id => allKeys.flatMap(k => { const i = stopsOf(k).indexOf(id); return i < 0 ? [] : [[k, i + 1]]; });
  /* "Verhaal 1 · Een virus brengt DNA binnen" → label "Verhaal 1", naam "Een virus brengt DNA binnen" */
  const parts = k => { const t = L(LINES[k].title), i = t.indexOf(' · '); return i < 0 ? ['', t] : [t.slice(0, i), t.slice(i + 3)]; };
  const shortName = k => L(LINES[k].short ?? LINES[k].title);
  const branchesAt = id => SIDE_KEYS.filter(k => LINES[k]?.from === id);

  const here = o.here && NODES[o.here] ? o.here : null;
  const hereLines = here ? inLines(here) : [];
  const hereLine = (hereLines.find(([k]) => k === o.line) ?? hereLines[0])?.[0] ?? null;
  const hereIdx = hereLine ? stopsOf(hereLine).indexOf(here) : -1;

  let view = o.view === 'topics' ? 'topics' : 'lines';
  let story = hereLine ?? o.line ?? allKeys[0];
  let openId = here;            /* welk onderwerp staat opengeklapt */
  let hits = null, qText = '';

  host.innerHTML = `<div class="cmap">${youHTML()}
    <div class="cm-top"><div class="cm-tabs" role="tablist">${['lines', 'topics'].map(v => `<button role="tab" data-v="${v}">${esc(L(T[v]))}</button>`).join('')}</div>
      <input class="cm-q" type="search" placeholder="${esc(L(T.search))}" aria-label="${esc(L(T.search))}"></div>
    <p class="cm-help"></p><div class="cm-view"></div></div>`;
  const root = host.firstElementChild, $v = root.querySelector('.cm-view'), $q = root.querySelector('.cm-q'), $h = root.querySelector('.cm-help');

  function youHTML() {
    if (!here) return '';
    const n = stopsOf(hereLine ?? allKeys[0]).length;
    const where = hereLine ? `${esc(shortName(hereLine))} · ${esc(L(T.stop))} ${hereIdx + 1} ${esc(L(T.of))} ${n}` : esc(L(T.loose));
    const prog = hereLine ? `<div class="prog" style="--lc:${lineCol(hereLine)}"><span>${hereIdx + 1} / ${n}</span><div><i style="width:${Math.round((hereIdx + 1) / n * 100)}%"></i></div></div>` : '';
    return `<div class="cm-you"><span class="pin"></span><div class="txt"><small>${esc(L(T.youHere))}</small><b>${esc(tt(NODES[here]))}</b> <span class="where">· ${where}</span></div>${prog}</div>`;
  }

  /* uitleg onder een onderwerp: korte tekst, knop, en in welke (andere) verhalen het zit */
  function moreHTML(id, k) {
    const others = inLines(id).filter(([x]) => x !== k);
    const label = k ? T.also : T.inStory;
    return `<div class="cm-more"><p>${esc(kort(id))}</p>
      <button class="cm-go" data-open="${id}" data-line="${k ?? inLines(id)[0]?.[0] ?? ''}">${esc(L(id === here ? T.back : T.open))}</button>
      ${others.length ? `<div class="cm-also">${esc(L(label))}:${others.map(([x, i]) => `<button class="cm-in" data-story="${x}" data-pick="${id}" style="--lc:${lineCol(x)}"><i></i>${esc(shortName(x))} · ${esc(L(T.stop))} ${i}</button>`).join('')}</div>` : ''}</div>`;
  }
  const itemHTML = (id, k, extra = '') => `<button class="cm-it" data-id="${id}" aria-expanded="${openId === id}">${extra}<span>${esc(tt(NODES[id]))}</span>${id === here ? `<span class="cm-tag">${esc(L(T.hereTag))}</span>` : ''}</button>${openId === id ? moreHTML(id, k) : ''}`;

  function drawLines() {
    const lnBtn = k => {
      const [lbl, name] = parts(k);
      return `<button class="cm-ln" data-story="${k}" aria-current="${k === story}" style="--lc:${lineCol(k)}"><i></i><span>${esc(LINES[k].side ? name : `${lbl}: ${name}`)}</span><small>${stopsOf(k).length}</small>${k === hereLine ? `<span class="yh">● ${esc(L(T.hereTag))}</span>` : ''}</button>`;
    };
    const list = `<nav class="cm-list"><div class="cm-grp">${esc(L(T.main))}</div>${MAIN_KEYS.filter(k => LINES[k]).map(lnBtn).join('')}
      ${SIDE_KEYS.length ? `<div class="cm-grp sep">${esc(L(T.sides))}</div>${SIDE_KEYS.filter(k => LINES[k]).map(lnBtn).join('')}` : ''}</nav>`;

    const ln = LINES[story], stops = stopsOf(story), [lbl, name] = parts(story);
    const cut = story === hereLine ? hereIdx : Infinity;   /* haltes na "hier ben je" zijn nog te gaan */
    let from = '';
    if (ln.from && NODES[ln.from]) {
      const parent = MAIN_KEYS.find(k => LINES[k] && stopsOf(k).includes(ln.from));
      from = `<p>${esc(L(T.branchOff))} ${parent ? `${esc(shortName(parent))} ` : ''}${esc(L(T.at))} <button data-story="${parent ?? ''}" data-pick="${ln.from}">${esc(tt(NODES[ln.from]))}</button></p>`;
    }
    const route = `<section class="cm-route" style="--lc:${lineCol(story)}"><header><small>${esc(lbl || L(T.side))} · ${stops.length} ${esc(L(T.stops))}</small><h3>${esc(name)}</h3>${from}</header>
      <ol class="cm-stops">${stops.map((id, i) => `<li class="cm-st${i > cut ? ' later' : ''}${id === here && story === hereLine ? ' here' : ''}"><b>${i + 1}</b>${itemHTML(id, story)}
        ${ln.side ? '' : branchesAt(id).map(k => `<button class="cm-br" data-story="${k}" style="--bc:${lineCol(k)}"><i></i>↳ ${esc(L(T.side))}: ${esc(parts(k)[1])}</button>`).join('')}</li>`).join('')}</ol></section>`;
    return `<div class="cm-split">${list}${route}</div>`;
  }

  function drawTopics() {
    return `<div class="cm-topics">${STAGES.map(st => {
      const list = ids.filter(id => NODES[id].stage === st.id).sort((a, b) => NODES[a].scale - NODES[b].scale);
      if (!list.length) return '';
      return `<div class="cm-tc" style="--sc:${STAGECOL[st.id]}"><h4>${esc(stageT(st))}<small>${list.length}</small></h4><ul>${list.map(id => `<li>${itemHTML(id, null)}</li>`).join('')}</ul></div>`;
    }).join('')}</div>`;
  }

  function drawHits() {
    if (!hits.length) return `<div class="cm-rhead">${esc(L(T.none))} <button data-clear>${esc(L(T.clear))}</button></div>`;
    return `<div class="cm-rhead">${hits.length} ${esc(L(hits.length === 1 ? T.hit1 : T.hits))} “${esc(qText)}” <button data-clear>${esc(L(T.clear))}</button></div>
      <ul class="cm-res">${hits.map(id => { const st = STAGES.find(s => s.id === NODES[id].stage);
        return `<li style="--sc:${STAGECOL[NODES[id].stage]}">${itemHTML(id, null, '')}</li>`.replace('</span>', `</span><small>${esc(stageT(st))}</small>`); }).join('')}</ul>`;
  }

  function draw(scrollTo) {
    root.querySelectorAll('.cm-tabs button').forEach(b => b.setAttribute('aria-selected', String(!hits && b.dataset.v === view)));
    $h.textContent = hits ? '' : L(view === 'lines' ? T.hLines : T.hTopics);
    $h.hidden = !!hits;
    $v.innerHTML = hits ? drawHits() : view === 'lines' ? drawLines() : drawTopics();
    $v.querySelectorAll('.cm-it').forEach(b => b.onclick = () => {
      const y = $v.querySelector('.cm-route')?.scrollTop;     /* openklappen: route blijft op dezelfde plek staan */
      openId = openId === b.dataset.id ? null : b.dataset.id; draw();
      const r = $v.querySelector('.cm-route'); if (r && y != null) r.scrollTop = y;
    });
    $v.querySelectorAll('[data-open]').forEach(b => b.onclick = () => o.onOpen(b.dataset.open, b.dataset.line || null));
    $v.querySelectorAll('[data-story]').forEach(b => b.onclick = () => {
      if (b.dataset.story) story = b.dataset.story;
      if (b.dataset.pick) openId = b.dataset.pick;
      hits = null; $q.value = ''; view = 'lines'; draw(b.dataset.pick ?? 'top');
    });
    $v.querySelectorAll('[data-clear]').forEach(b => b.onclick = () => { hits = null; $q.value = ''; draw(); $q.focus(); });
    if (scrollTo) reveal(scrollTo === 'top' ? null : scrollTo);
  }
  /* scroll binnen de route (niet het hele venster), zodat "Hier ben je" en de tabs zichtbaar blijven */
  function reveal(id) {
    const el = id && $v.querySelector(`.cm-it[data-id="${id}"]`);
    const box = $v.querySelector('.cm-route');
    if (!box) { el?.scrollIntoView({ block: 'nearest' }); return; }
    box.scrollTop = el ? Math.max(0, box.scrollTop + el.getBoundingClientRect().top - box.getBoundingClientRect().top - box.clientHeight / 3) : 0;
  }

  let eng = null, qTimer = 0;
  async function filter() {
    const q = $q.value.trim();
    if (q.length < 2) { if (hits) { hits = null; draw(); } return; }
    const words = norm(q).split(/\s+/).filter(Boolean);
    /* volgorde: eerst de beste treffers van de zoekmotor, dan titels, dan onderwerpen waar het woord in de uitleg staat */
    const best = [];
    if (o.engine) { try { eng ??= await o.engine(); for (const r of eng.query(q, { limit: 8 })) if (NODES[r.id] && ids.includes(r.id)) best.push(r.id); } catch {} }
    const inTitle = ids.filter(id => { const n = NODES[id], h = norm(n.t + ' ' + n.en); return words.every(w => h.includes(w)); });
    const inText = ids.filter(id => {
      const n = NODES[id], hay = norm([n.t, n.en, n.s, S_EN[id], DETAILS[id]?.nl?.kort, DETAILS[id]?.en?.kort].join(' '));
      return words.every(w => hay.includes(w));
    });
    if ($q.value.trim() !== q) return;
    hits = [...new Set([...best, ...inTitle, ...inText])]; qText = q;
    openId = hits.length === 1 ? hits[0] : null;
    draw();
  }
  $q.oninput = () => { clearTimeout(qTimer); qTimer = setTimeout(filter, 160); };
  $q.onkeydown = e => { if (e.key === 'Enter' && hits?.length) o.onOpen(hits[0], inLines(hits[0])[0]?.[0] ?? null); };
  root.querySelectorAll('.cm-tabs button').forEach(b => b.onclick = () => { view = b.dataset.v; hits = null; $q.value = ''; draw(view === 'lines' ? openId : null); });

  draw();
  if (here) setTimeout(() => reveal(here), 0);
  const select = id => { if (!NODES[id]) return; openId = id; const l = inLines(id)[0]; if (l) story = l[0]; view = l ? 'lines' : 'topics'; hits = null; draw(id); };
  return { focus: () => $q.focus(), select };
}
