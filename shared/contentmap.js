/*
 * Inhoudskaart — één gedeeld onderdeel voor de app ("Waar ben ik?") en de pagina "Over de app".
 * Drie manieren om dezelfde inhoud te bekijken:
 *   1. Verhalen   — elk verhaal en zijpad als een lijn met genummerde haltes (zoals een metrokaart)
 *   2. Onderwerpen — alle onderwerpen per thema, van groot naar klein
 *   3. Zoomniveau  — alle onderwerpen per grootte: van de hele cel tot de atomen
 * Klik een onderwerp → rechts een kaartje in gewone taal (wat is het, in welk verhaal, wat hangt ermee samen)
 * met één grote knop om de animatie te openen. Zoeken licht de treffers op in elke weergave.
 *
 * mountMap(host, {
 *   NODES, STAGES, SCALES, SCALES_EN, LINES, MAIN_KEYS, SIDE_KEYS, DETAILS, S_EN, lang, L,
 *   here?: knoop-id waar de gebruiker nu is,  line?: huidige verhaallijn,
 *   engine?: () => Promise<zoekmotor met query()>   (shared/search.js, optioneel: slimmer zoeken),
 *   onOpen(id, lineKey)  — animatie openen,  view?: 'lines' | 'topics' | 'scale'
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
  topics: { nl: 'Onderwerpen', en: 'Topics' },
  scale: { nl: 'Van groot naar klein', en: 'From large to small' },
  hLines: { nl: 'Elk verhaal is een lijn met genummerde haltes. Een zijpad takt af van een hoofdverhaal en gaat dieper op één thema in.', en: 'Each story is a line with numbered stops. A side path branches off a main story and goes deeper into one theme.' },
  hTopics: { nl: 'Alle onderwerpen per thema. Binnen elk thema staan de grote dingen bovenaan en de kleine onderaan.', en: 'All topics by theme. Within each theme, large things are at the top and small ones at the bottom.' },
  hScale: { nl: 'Alle onderwerpen per grootte: van een hele cel tot enkele atomen. De kleur toont het thema.', en: 'All topics by size: from a whole cell down to a few atoms. The colour shows the theme.' },
  search: { nl: 'Zoek een onderwerp (bv. ribosoom, splicing, virus)…', en: 'Search a topic (e.g. ribosome, splicing, virus)…' },
  hits: { nl: 'treffers', en: 'matches' }, none: { nl: 'Geen treffers. Probeer een ander woord.', en: 'No matches. Try another word.' },
  all: { nl: 'onderwerpen', en: 'topics' },
  main: { nl: 'Hoofdverhalen', en: 'Main stories' }, sides: { nl: 'Zijpaden', en: 'Side paths' },
  stops: { nl: 'haltes', en: 'stops' }, branch: { nl: 'takt af bij', en: 'branches off at' },
  pick: { nl: 'Klik op een onderwerp om te zien wat het is, in welk verhaal het zit en waarmee het samenhangt.', en: 'Click a topic to see what it is, which story it is in and what it connects to.' },
  open: { nl: '▶ Open de animatie', en: '▶ Open the animation' },
  inStory: { nl: 'Zit in', en: 'Part of' }, chap: { nl: 'halte', en: 'stop' },
  deeper: { nl: 'Inzoomen: meer detail', en: 'Zoom in: more detail' }, after: { nl: 'Daarna', en: 'Next' }, rel: { nl: 'Hangt samen met', en: 'Connected to' },
  here: { nl: 'hier ben je', en: 'you are here' }, only: { nl: 'enkel via klikken in een animatie', en: 'only by clicking inside an animation' },
  real3d: { nl: 'echte 3D-structuur', en: 'real 3D structure' }, bact: { nl: 'bacterie', en: 'bacterium' }, human: { nl: 'mens', en: 'human' },
  zoom: { nl: 'grootte', en: 'size' },
};

let styled = false;
function addStyle() {
  if (styled) return; styled = true;
  const s = document.createElement('style');
  s.textContent = `
.cmap { --cm-line: rgba(160,180,220,.16); color: var(--text, #e8edf7); }
.cmap .cm-top { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 8px; }
.cmap .cm-tabs { display: inline-flex; border: 1px solid var(--cm-line); border-radius: 12px; padding: 3px; gap: 3px; background: rgba(255,255,255,.02); }
.cmap .cm-tabs button { all: unset; cursor: pointer; font-size: 14px; font-weight: 600; padding: 8px 14px; border-radius: 9px; color: var(--muted, #93a0bb); }
.cmap .cm-tabs button[aria-selected="true"] { background: rgba(124,196,255,.16); color: var(--text, #e8edf7); }
.cmap .cm-tabs button:focus-visible, .cmap button:focus-visible { outline: 2px solid #7cc4ff; outline-offset: 1px; }
.cmap .cm-q { flex: 1 1 260px; max-width: 420px; background: #0d1426; border: 1px solid var(--cm-line); color: inherit; border-radius: 10px; padding: 9px 12px; font: inherit; font-size: 14px; }
.cmap .cm-q:focus { outline: none; border-color: #7cc4ff; }
.cmap .cm-count { font-size: 13px; color: var(--muted, #93a0bb); }
.cmap .cm-help { margin: 4px 0 14px; font-size: 14px; color: var(--muted, #93a0bb); }
.cmap .cm-body { display: grid; grid-template-columns: minmax(0, 1fr) 330px; gap: 16px; align-items: start; }
@media (max-width: 960px) { .cmap .cm-body { grid-template-columns: 1fr; } }
.cmap .cm-view { min-width: 0; }
.cmap .cm-grp { font: 700 12px var(--mono, monospace); letter-spacing: .08em; text-transform: uppercase; color: #7cc4ff; margin: 6px 0 8px; }
.cmap .cm-grp.sep { margin-top: 20px; padding-top: 14px; border-top: 1px solid var(--cm-line); }
.cmap .cm-line { margin: 0 0 16px; }
.cmap .cm-lh { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; font-size: 14.5px; font-weight: 600; margin-bottom: 7px; }
.cmap .cm-lh i { width: 12px; height: 12px; border-radius: 50%; background: var(--lc); align-self: center; flex: none; }
.cmap .cm-lh small { font-weight: 400; font-size: 12.5px; color: var(--muted, #93a0bb); }
.cmap .cm-lh small b { color: var(--text, #e8edf7); font-weight: 500; }
.cmap .cm-stops { display: flex; flex-wrap: wrap; row-gap: 8px; padding-left: 4px; }
.cmap .cm-stop { all: unset; cursor: pointer; position: relative; display: inline-flex; align-items: center; gap: 7px; font-size: 13px; line-height: 1.2;
  padding: 5px 10px 5px 5px; margin-right: 16px; border-radius: 999px; border: 1px solid var(--cm-line); background: rgba(255,255,255,.03); }
.cmap .cm-stop:not(:last-child)::after { content: ""; position: absolute; right: -17px; top: 50%; width: 16px; height: 3px; margin-top: -1.5px; background: var(--lc); opacity: .7; }
.cmap .cm-stop b { display: inline-grid; place-items: center; min-width: 22px; height: 22px; border-radius: 50%; background: var(--lc); color: #0a0f1d; font: 700 11.5px var(--mono, monospace); }
.cmap .cm-stop:hover { border-color: var(--lc); background: rgba(255,255,255,.08); }
.cmap .cm-topics { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 12px; }
.cmap .cm-tc { border: 1px solid var(--cm-line); border-radius: 12px; background: rgba(255,255,255,.02); overflow: hidden; }
.cmap .cm-tc h4 { margin: 0; padding: 10px 12px; font-size: 14px; border-bottom: 1px solid var(--cm-line); border-top: 3px solid var(--sc); display: flex; justify-content: space-between; gap: 8px; }
.cmap .cm-tc h4 small { font-weight: 400; color: var(--muted, #93a0bb); font-size: 12px; }
.cmap .cm-tc ul { list-style: none; margin: 0; padding: 6px; display: grid; gap: 2px; }
.cmap .cm-it { all: unset; cursor: pointer; display: flex; align-items: center; gap: 8px; width: 100%; box-sizing: border-box; font-size: 13px; padding: 5px 7px; border-radius: 7px; }
.cmap .cm-it:hover { background: rgba(255,255,255,.07); }
.cmap .cm-it .sz { display: inline-flex; gap: 2px; flex: none; }
.cmap .cm-it .sz i { width: 4px; height: 10px; border-radius: 2px; background: rgba(255,255,255,.14); }
.cmap .cm-it .sz i.on { background: var(--sc); }
.cmap .cm-it .tg { margin-left: auto; font: 600 10px var(--mono, monospace); color: #7cc4ff; }
.cmap .cm-rows { display: grid; gap: 10px; }
.cmap .cm-row { display: grid; grid-template-columns: 170px minmax(0, 1fr); gap: 12px; border: 1px solid var(--cm-line); border-radius: 12px; padding: 10px 12px; background: rgba(255,255,255,.02); }
@media (max-width: 700px) { .cmap .cm-row { grid-template-columns: 1fr; } }
.cmap .cm-row .rl b { display: block; font-size: 14px; }
.cmap .cm-row .rl small { font: 400 12px var(--mono, monospace); color: var(--muted, #93a0bb); }
.cmap .cm-row .rl .bar { display: flex; gap: 3px; margin-top: 6px; }
.cmap .cm-row .rl .bar i { width: 18px; height: 6px; border-radius: 3px; background: rgba(255,255,255,.12); }
.cmap .cm-row .rl .bar i.on { background: #7cc4ff; }
.cmap .cm-chips { display: flex; flex-wrap: wrap; gap: 5px; align-content: flex-start; }
.cmap .cm-chip { all: unset; cursor: pointer; font-size: 12.5px; padding: 4px 9px 4px 8px; border-radius: 7px; background: rgba(255,255,255,.04); border-left: 3px solid var(--sc); }
.cmap .cm-chip:hover { background: rgba(255,255,255,.1); }
.cmap .is-sel { outline: 2px solid #7cc4ff !important; background: rgba(124,196,255,.16) !important; }
.cmap .is-here { box-shadow: 0 0 0 2px #ffc247 inset; }
.cmap.filtering [data-id]:not(.hit) { opacity: .2; }
.cmap.filtering .cm-line:not(.has), .cmap.filtering .cm-tc:not(.has), .cmap.filtering .cm-row:not(.has) { opacity: .55; }
.cmap .cm-card { position: sticky; top: 12px; border: 1px solid var(--cm-line); border-radius: 14px; background: #0d1426; padding: 16px; font-size: 14px; line-height: 1.5; }
.cmap .cm-card .empty { color: var(--muted, #93a0bb); margin: 0; }
.cmap .cm-card h3 { margin: 6px 0 0; font-size: 19px; line-height: 1.25; }
.cmap .cm-card .alt { color: var(--muted, #93a0bb); font-size: 13px; font-style: italic; }
.cmap .cm-card p { margin: 10px 0; }
.cmap .cm-badges { display: flex; flex-wrap: wrap; gap: 5px; }
.cmap .cm-badges span { font: 500 11px var(--mono, monospace); padding: 3px 7px; border-radius: 5px; background: rgba(255,255,255,.06); color: var(--muted, #93a0bb); }
.cmap .cm-badges span.st { color: #0a0f1d; background: var(--sc); font-weight: 700; }
.cmap .cm-badges span.here { background: rgba(255,194,71,.18); color: #ffc247; }
.cmap .cm-go { all: unset; cursor: pointer; display: block; text-align: center; margin: 12px 0 4px; padding: 11px 14px; border-radius: 11px; font-weight: 700; font-size: 15px; background: #7cc4ff; color: #07101f; }
.cmap .cm-go:hover { filter: brightness(1.1); }
.cmap .cm-sec { margin-top: 12px; }
.cmap .cm-sec > span { display: block; font: 600 11px var(--mono, monospace); letter-spacing: .07em; text-transform: uppercase; color: var(--muted, #93a0bb); margin-bottom: 5px; }
.cmap .cm-sec .cm-chip { margin: 0 3px 4px 0; display: inline-block; }
.cmap .cm-in { all: unset; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; font-size: 12.5px; padding: 4px 9px; border-radius: 999px; border: 1px solid var(--lc); margin: 0 4px 5px 0; }
.cmap .cm-in:hover { background: rgba(255,255,255,.07); }
.cmap .cm-in i { width: 9px; height: 9px; border-radius: 50%; background: var(--lc); }
`;
  document.head.append(s);
}

export function mountMap(host, o) {
  addStyle();
  const { NODES, STAGES, SCALES, LINES, MAIN_KEYS, SIDE_KEYS, DETAILS = {}, S_EN = {}, SCALES_EN = {}, lang, L } = o;
  const en = lang === 'en';
  const tt = n => (en ? n.en : n.t);
  const alt = n => (en ? n.t : n.en);
  const stageT = s => (en ? s.en : s.t);
  const scaleT = s => (en ? SCALES_EN[s.id] ?? s.t : s.t);
  const kort = id => plain(DETAILS[id]?.[lang]?.kort ?? (en ? S_EN[id] ?? NODES[id]?.s : NODES[id]?.s));
  const ids = Object.keys(NODES).filter(id => STAGES.some(s => s.id === NODES[id].stage));
  const inLines = id => Object.keys(LINES).flatMap(k => { const i = LINES[k].chapters.findIndex(c => c.id === id); return i < 0 ? [] : [[k, i + 1]]; });
  const linesSorted = [...MAIN_KEYS, ...SIDE_KEYS];
  const sizeBars = (n, c) => `<span class="sz" title="${esc(L(T.zoom))}: ${esc(scaleT(SCALES.find(s => s.id === n.scale)))}" style="--sc:${c}">${SCALES.map(s => `<i class="${s.id <= n.scale ? 'on' : ''}"></i>`).join('')}</span>`;

  let view = o.view ?? 'lines', sel = null, hits = null;
  host.innerHTML = `<div class="cmap">
    <div class="cm-top"><div class="cm-tabs" role="tablist">${['lines', 'topics', 'scale'].map(v => `<button role="tab" data-v="${v}">${esc(L(T[v]))}</button>`).join('')}</div>
      <input class="cm-q" type="search" placeholder="${esc(L(T.search))}" aria-label="${esc(L(T.search))}"><span class="cm-count"></span></div>
    <p class="cm-help"></p>
    <div class="cm-body"><div class="cm-view"></div><aside class="cm-card" aria-live="polite"></aside></div></div>`;
  const root = host.firstElementChild, $v = root.querySelector('.cm-view'), $c = root.querySelector('.cm-card'), $q = root.querySelector('.cm-q'), $n = root.querySelector('.cm-count');

  function drawLines() {
    const line = k => {
      const ln = LINES[k], ch = ln.chapters.filter(c => NODES[c.id]);
      const from = ln.from && NODES[ln.from] ? ` · ${esc(L(T.branch))} <b>${esc(tt(NODES[ln.from]))}</b>` : '';
      return `<div class="cm-line" style="--lc:${lineCol(k)}"><div class="cm-lh"><i></i>${esc(L(ln.title))}<small>${ch.length} ${esc(L(T.stops))}${from}</small></div>
        <div class="cm-stops">${ch.map((c, i) => `<button class="cm-stop" data-id="${c.id}" data-line="${k}"><b>${i + 1}</b>${esc(tt(NODES[c.id]))}</button>`).join('')}</div></div>`;
    };
    const used = new Set(Object.values(LINES).flatMap(l => l.chapters.map(c => c.id)));
    const rest = ids.filter(id => !used.has(id));
    return `<div class="cm-grp">${esc(L(T.main))}</div>` + MAIN_KEYS.map(line).join('') +
      (SIDE_KEYS.length ? `<div class="cm-grp sep">${esc(L(T.sides))}</div>` + SIDE_KEYS.map(line).join('') : '') +
      (rest.length ? `<div class="cm-grp sep">${esc(L({ nl: 'Losse onderwerpen', en: 'Other topics' }))}</div><p class="cm-help" style="margin-top:0">${esc(L({ nl: 'Niet in een verhaal, wel te openen: via een klik in een animatie of hieronder.', en: 'Not in a story, but you can open them: by clicking inside an animation or below.' }))}</p>
        <div class="cm-line" style="--lc:#7cc4ff"><div class="cm-chips">${rest.map(id => `<button class="cm-chip" data-id="${id}" style="--sc:${STAGECOL[NODES[id].stage]}">${esc(tt(NODES[id]))}</button>`).join('')}</div></div>` : '');
  }
  function drawTopics() {
    return `<div class="cm-topics">${STAGES.map(st => {
      const list = ids.filter(id => NODES[id].stage === st.id).sort((a, b) => NODES[a].scale - NODES[b].scale);
      const c = STAGECOL[st.id];
      return `<div class="cm-tc" style="--sc:${c}"><h4>${esc(stageT(st))}<small>${list.length}</small></h4><ul>${list.map(id => {
        const n = NODES[id];
        return `<li><button class="cm-it" data-id="${id}">${sizeBars(n, c)}<span>${esc(tt(n))}</span>${n.pdb?.length ? `<span class="tg" title="${esc(L(T.real3d))}">3D</span>` : ''}</button></li>`;
      }).join('')}</ul></div>`;
    }).join('')}</div>`;
  }
  function drawScale() {
    return `<div class="cm-rows">${SCALES.map(sc => {
      const list = ids.filter(id => NODES[id].scale === sc.id).sort((a, b) => STAGES.findIndex(s => s.id === NODES[a].stage) - STAGES.findIndex(s => s.id === NODES[b].stage));
      return `<div class="cm-row"><div class="rl"><b>${esc(scaleT(sc))}</b><small>${esc(sc.range)}</small><div class="bar">${SCALES.map(s => `<i class="${s.id <= sc.id ? 'on' : ''}"></i>`).join('')}</div></div>
        <div class="cm-chips">${list.map(id => `<button class="cm-chip" data-id="${id}" style="--sc:${STAGECOL[NODES[id].stage]}">${esc(tt(NODES[id]))}</button>`).join('')}</div></div>`;
    }).join('')}</div>`;
  }

  function card(id) {
    const n = NODES[id];
    if (!n) { $c.innerHTML = `<p class="empty">${esc(L(T.pick))}</p>`; return; }
    const st = STAGES.find(s => s.id === n.stage), sc = SCALES.find(s => s.id === n.scale), c = STAGECOL[n.stage];
    const chip = x => NODES[x] ? `<button class="cm-chip" data-pick="${x}" style="--sc:${STAGECOL[NODES[x].stage]}">${esc(tt(NODES[x]))}</button>` : '';
    const sec = (lbl, arr) => { const h = [...new Set(arr)].map(chip).join(''); return h ? `<div class="cm-sec"><span>${esc(L(lbl))}</span>${h}</div>` : ''; };
    const lns = inLines(id).sort((a, b) => linesSorted.indexOf(a[0]) - linesSorted.indexOf(b[0]));
    const prefer = lns.find(([k]) => k === o.line) ?? lns[0];
    $c.innerHTML = `<div class="cm-badges"><span class="st" style="--sc:${c}">${esc(stageT(st))}</span><span>${esc(L(T.zoom))}: ${esc(scaleT(sc))}</span>
        ${n.pdb?.length ? `<span>${esc(L(T.real3d))}</span>` : ''}${id === o.here ? `<span class="here">${esc(L(T.here))}</span>` : ''}</div>
      <h3>${esc(tt(n))}</h3>${alt(n) && alt(n) !== tt(n) ? `<div class="alt">${esc(alt(n))}</div>` : ''}
      <p>${esc(kort(id))}</p>
      <button class="cm-go" data-open="${id}" data-line="${prefer?.[0] ?? ''}">${esc(L(T.open))}</button>
      ${lns.length ? `<div class="cm-sec"><span>${esc(L(T.inStory))}</span>${lns.map(([k, i]) => `<button class="cm-in" data-open="${id}" data-line="${k}" style="--lc:${lineCol(k)}"><i></i>${esc(L(LINES[k].short ?? LINES[k].title))} · ${esc(L(T.chap))} ${i}</button>`).join('')}</div>`
        : `<div class="cm-sec"><span>${esc(L(T.inStory))}</span><span style="text-transform:none;letter-spacing:0;font:13px var(--font, sans-serif)">${esc(L(T.only))}</span></div>`}
      ${sec(T.deeper, n.in ?? [])}${sec(T.after, n.next ?? [])}${sec(T.rel, n.rel ?? [])}`;
    $c.querySelectorAll('[data-open]').forEach(b => b.onclick = () => o.onOpen(b.dataset.open, b.dataset.line || null));
    $c.querySelectorAll('[data-pick]').forEach(b => b.onclick = () => select(b.dataset.pick, true));
  }

  function select(id, scroll) {
    sel = id;
    root.querySelectorAll('.is-sel').forEach(e => e.classList.remove('is-sel'));
    const els = [...$v.querySelectorAll(`[data-id="${id}"]`)];
    els.forEach(e => e.classList.add('is-sel'));
    if (scroll && els[0]) els[0].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    card(id);
  }

  function draw() {
    root.querySelectorAll('.cm-tabs button').forEach(b => b.setAttribute('aria-selected', String(b.dataset.v === view)));
    root.querySelector('.cm-help').textContent = L({ lines: T.hLines, topics: T.hTopics, scale: T.hScale }[view]);
    $v.innerHTML = view === 'lines' ? drawLines() : view === 'topics' ? drawTopics() : drawScale();
    $v.querySelectorAll('[data-id]').forEach(b => {
      if (b.dataset.id === o.here) b.classList.add('is-here');
      b.onclick = () => select(b.dataset.id);
      b.ondblclick = () => o.onOpen(b.dataset.id, b.dataset.line || null);
      b.title = kort(b.dataset.id).slice(0, 180);
    });
    paint();
    if (sel) select(sel); else card(null);
  }

  function paint() {
    root.classList.toggle('filtering', !!hits);
    $v.querySelectorAll('[data-id]').forEach(b => b.classList.toggle('hit', !!hits?.has(b.dataset.id)));
    $v.querySelectorAll('.cm-line, .cm-tc, .cm-row').forEach(g => g.classList.toggle('has', !!g.querySelector('.hit')));
    $n.textContent = hits ? (hits.size ? `${hits.size} ${L(T.hits)}` : L(T.none)) : `${ids.length} ${L(T.all)}`;
  }

  let eng = null, qTimer = 0;
  async function filter() {
    const q = $q.value.trim();
    if (q.length < 2) { hits = null; paint(); return; }
    const words = norm(q).split(/\s+/).filter(Boolean);
    /* volgorde: eerst de beste treffers van de zoekmotor, dan titels, dan onderwerpen waar het woord in de uitleg staat */
    const best = [];
    if (o.engine) { try { eng ??= await o.engine(); for (const r of eng.query(q, { limit: 8 })) if (NODES[r.id]) best.push(r.id); } catch {} }
    const inTitle = ids.filter(id => { const n = NODES[id], h = norm(n.t + ' ' + n.en); return words.every(w => h.includes(w)); });
    const inText = ids.filter(id => {
      const n = NODES[id], hay = norm([n.t, n.en, n.s, S_EN[id], DETAILS[id]?.nl?.kort, DETAILS[id]?.en?.kort].join(' '));
      return words.every(w => hay.includes(w));
    });
    const set = new Set([...best, ...inTitle, ...inText]);
    if ($q.value.trim() !== q) return;
    hits = set; paint();
    if (set.size) select([...set][0], true);
  }
  $q.oninput = () => { clearTimeout(qTimer); qTimer = setTimeout(filter, 160); };
  $q.onkeydown = e => { if (e.key === 'Enter' && sel) o.onOpen(sel, inLines(sel)[0]?.[0] ?? null); };
  root.querySelectorAll('.cm-tabs button').forEach(b => b.onclick = () => { view = b.dataset.v; draw(); });

  if (o.here && NODES[o.here]) sel = o.here;
  draw();
  if (o.here) setTimeout(() => $v.querySelector('.is-here')?.scrollIntoView({ block: 'center' }), 0);
  return { focus: () => $q.focus(), select };
}
