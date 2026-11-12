/*
 * Zoekbalk met "Bedoel je …?"-lijst (startpagina en bovenbalk van de app). Werkt met shared/search.js.
 *
 * mountSearch(host, {
 *   engine: () => Promise<engine> | engine,    // makeSearch(...) (mag pas bij het eerste gebruik geladen worden)
 *   NODES, LINES, L, title, summary,            // inhoud en taalhulp
 *   line: () => huidige lijn (of null),         // voorkeur bij "waar ligt dit?"
 *   onPick: (result) => void,                   // naar de scène gaan
 *   atlasHref: term => url | null,              // geen treffer: in de DNA-bib zoeken
 *   compact: false,                             // smallere versie voor de bovenbalk
 * })
 */
const T = {
  ph: { nl: 'Zoek een proces of onderdeel… bv. ribosoom, kanker, splicing', en: 'Search a process or part… e.g. ribosome, cancer, splicing' },
  phShort: { nl: 'Zoeken… (bv. splicing)', en: 'Search… (e.g. splicing)' },
  mean: { nl: 'Bedoel je …', en: 'Did you mean …' },
  fix: { nl: 'Bedoel je', en: 'Did you mean' },
  none: { nl: q => `Niets gevonden voor „${q}”.`, en: q => `Nothing found for “${q}”.` },
  tryW: { nl: 'Probeer een ander woord, bv. DNA kopiëren, ribosoom, kanker of vaccin.', en: 'Try another word, e.g. copying DNA, ribosome, cancer or vaccine.' },
  atlas: { nl: q => `🧬 „${q}” zoeken in de DNA-bib (eiwitten en genen)`, en: q => `🧬 Search “${q}” in the DNA library (proteins and genes)` },
  ch: { nl: 'hoofdstuk', en: 'chapter' }, stepW: { nl: 'stap', en: 'step' },
  inside: { nl: 'onderdeel van', en: 'part of' },
  keys: { nl: '↑↓ kiezen · Enter openen · Esc sluiten', en: '↑↓ choose · Enter open · Esc close' },
  label: { nl: 'Zoeken in de app', en: 'Search the app' },
};

let styled = false;
function addStyle() {
  if (styled) return; styled = true;
  const s = document.createElement('style');
  s.textContent = `
  .sbx { position: relative; min-width: 0; }
  .sbx input { box-sizing: border-box; width: 100%; font: 500 14px Inter, system-ui, sans-serif; color: var(--text, #e8eefc); background: rgba(13,20,38,.9);
    border: 1px solid var(--line, #24314d); border-radius: 12px; padding: 11px 14px 11px 38px; outline: none; transition: border-color .15s; }
  .sbx input:focus { border-color: rgba(124,196,255,.7); box-shadow: 0 0 0 3px rgba(124,196,255,.12); }
  .sbx .mg { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: var(--muted, #93a0bb); pointer-events: none; }
  .sbx.compact input { font-size: 13px; padding: 6px 10px 6px 30px; border-radius: 9px; height: 30px; }
  .sbx.compact .mg { left: 10px; width: 14px; height: 14px; }
  .sbx .dd { position: absolute; left: 0; right: 0; top: calc(100% + 6px); z-index: 60; background: #0e1630; border: 1px solid #2c3a5c; border-radius: 14px;
    box-shadow: 0 18px 50px rgba(0,0,0,.55); padding: 8px; display: none; max-height: min(70vh, 560px); overflow-y: auto; text-align: left; }
  .sbx.compact .dd { width: min(560px, 92vw); right: auto; }
  .sbx.open .dd { display: block; }
  .sbx .hd { font: 600 11px var(--mono, monospace); letter-spacing: .1em; text-transform: uppercase; color: var(--muted, #93a0bb); padding: 6px 8px 8px; display: flex; justify-content: space-between; gap: 8px; }
  .sbx .hd i { font-style: normal; text-transform: none; letter-spacing: 0; font-weight: 400; opacity: .8; }
  .sbx .fix { padding: 4px 8px 10px; font-size: 14px; color: var(--muted, #93a0bb); }
  .sbx .fix button { all: unset; cursor: pointer; color: #ffc247; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }
  .sbx .opt { all: unset; box-sizing: border-box; display: grid; grid-template-columns: 6px 1fr; gap: 12px; width: 100%; cursor: pointer; padding: 10px 10px; border-radius: 10px; }
  .sbx .opt:hover, .sbx .opt.on { background: rgba(124,196,255,.1); }
  .sbx .opt .bar { border-radius: 3px; background: var(--c, #7cc4ff); }
  .sbx .opt b { display: block; font-size: 15px; color: var(--text, #e8eefc); font-weight: 600; }
  .sbx .opt .where { display: block; font-size: 12.5px; color: var(--c, #7cc4ff); margin-top: 2px; }
  .sbx .opt .stp { display: block; font-size: 12.5px; color: #ffc247; margin-top: 2px; }
  .sbx .opt .stp b { font-weight: 700; }
  .sbx .opt .snip { display: block; font-size: 13px; color: var(--muted, #93a0bb); line-height: 1.45; margin-top: 4px; }
  .sbx .empty { padding: 10px; font-size: 14px; color: var(--muted, #93a0bb); line-height: 1.5; }
  .sbx .atl { all: unset; cursor: pointer; display: block; margin: 4px 2px 2px; padding: 9px 10px; border-radius: 10px; font-size: 13.5px; color: #7cc4ff; }
  .sbx .atl:hover, .sbx .atl.on { background: rgba(124,196,255,.1); }`;
  document.head.append(s);
}

const LINECOL = { virus: '#ff8a3d', signaal: '#7fdc6a', bacterie: '#ff8f8f', herstel: '#4f8ff7', targeting: '#9b7bff', epigen: '#ffc247', virusroute: '#ff9d5c', rnalot: '#2cc6a8' };
export const lineColor = k => LINECOL[k] ?? '#7cc4ff';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* "Verhaal 1 · hoofdstuk 15: Translatie" of "onderdeel van Verhaal 1 · hoofdstuk 15 (Translatie) › Codon" */
export function whereText(loc, { LINES, NODES, L, title }) {
  const ln = LINES[loc.line]; if (!ln) return '';
  const ch = ln.chapters[loc.ci];
  const chap = ch ? `${L(T.ch)} ${loc.ci + 1}` : '';
  if (!loc.inside) return `${L(ln.short)} · ${chap}`;
  const mid = loc.path.slice(1, -1).map(id => NODES[id] ? title(NODES[id]) : id);
  return `${L(T.inside)} ${L(ln.short)} · ${chap} (${ch ? title(NODES[ch.id]) : ''})${mid.length ? ' › ' + mid.join(' › ') : ''}`;
}

export function mountSearch(host, o) {
  addStyle();
  const { L } = o;
  host.classList.add('sbx'); if (o.compact) host.classList.add('compact');
  host.innerHTML = `<svg class="mg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>
    <input type="search" autocomplete="off" spellcheck="false" aria-label="${esc(L(T.label))}" placeholder="${esc(L(o.compact ? T.phShort : T.ph))}" role="combobox" aria-expanded="false">
    <div class="dd" role="listbox"></div>`;
  const inp = host.querySelector('input'), dd = host.querySelector('.dd');
  let eng = null, items = [], sel = -1, timer = 0, lastQ = '';
  const getEng = async () => eng ??= await o.engine();
  inp.addEventListener('focus', () => { getEng(); if (inp.value.trim()) run(); });

  function close() { host.classList.remove('open'); inp.setAttribute('aria-expanded', 'false'); sel = -1; }
  function mark() { items.forEach((b, i) => b.classList.toggle('on', i === sel)); items[sel]?.scrollIntoView({ block: 'nearest' }); }
  async function run() {
    const qv = inp.value.trim(); lastQ = qv;
    if (qv.length < 2) { close(); return; }
    const e = await getEng(); if (qv !== lastQ) return;
    const res = e.query(qv, { line: o.line?.() ?? null });
    const fix = e.suggestion?.(qv, res);
    let h = '';
    if (res.length) {
      h += `<div class="hd"><span>${L(T.mean)}</span><i>${L(T.keys)}</i></div>`;
      if (fix) h += `<div class="fix">${L(T.fix)}: <button data-fix="${esc(fix)}">${esc(fix)}</button>?</div>`;
      h += res.map((r, i) => {
        const n = o.NODES[r.id];
        let snip = (o.summary(n) ?? '').replace(/\s+/g, ' ');
        if (snip.length > 130) snip = snip.slice(0, 127).replace(/\s\S*$/, '') + '…';
        return `<button class="opt" data-i="${i}" role="option" style="--c:${lineColor(r.loc.line)}"><span class="bar"></span><span><b>${esc(o.title(n))}</b>` +
          `<span class="where">${esc(whereText(r.loc, o))}</span>${r.stepTag ? `<span class="stp">▸ ${esc(L(T.stepW))} ${r.step + 1}: <b>${esc(L({ nl: r.stepTag[0], en: r.stepTag[1] }))}</b></span>` : ''}<span class="snip">${esc(snip)}</span></span></button>`;
      }).join('');
    } else {
      h += `<div class="empty">${esc(L(T.none)(qv))}<br>${L(T.tryW)}</div>`;
    }
    const ah = o.atlasHref?.(qv);
    if (ah) h += `<a class="atl" href="${esc(ah)}">${esc(L(T.atlas)(qv))}</a>`;
    dd.innerHTML = h;
    items = [...dd.querySelectorAll('.opt, .atl')]; sel = res.length ? 0 : -1; mark();
    dd.querySelectorAll('.opt').forEach(b => b.onclick = () => pick(res[+b.dataset.i]));
    dd.querySelector('[data-fix]')?.addEventListener('click', ev => { inp.value = ev.currentTarget.dataset.fix; inp.focus(); run(); });
    host.classList.add('open'); inp.setAttribute('aria-expanded', 'true');
  }
  function pick(r) { if (!r) return; close(); inp.value = ''; inp.blur(); o.onPick(r); }
  inp.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(run, 120); });
  inp.addEventListener('keydown', e => {
    e.stopPropagation();                                     // pijltjes/spatie niet naar de videospeler sturen
    if (e.key === 'Escape') { if (host.classList.contains('open')) close(); else inp.blur(); return; }
    if (!host.classList.contains('open')) { if (e.key === 'Enter') run(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); sel = Math.min(items.length - 1, sel + 1); mark(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); sel = Math.max(0, sel - 1); mark(); }
    else if (e.key === 'Enter') { e.preventDefault(); items[sel]?.click(); }
  });
  document.addEventListener('pointerdown', e => { if (!host.contains(e.target)) close(); });
  return { focus: () => inp.focus(), input: inp };
}
