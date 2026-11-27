/*
 * structure3d(): bouwt een 3D-scène rond een echte PDB-structuur (3Dmol.js, pas geladen wanneer nodig).
 *
 * structure3d({
 *   id: 'nucleosoom', pdb: '1KX5', format: 'cif' | 'pdb' (standaard 'cif'),
 *   title, scale, time, org, legend, simplified, extra,     // zoals elke scène
 *   base: [ { sel: {...3Dmol-selectie}, style: {...} }, ... ],   // basisweergave (volgorde telt)
 *   steps: [ { dur, title, text,
 *              focus: { sel, style, label: {nl,en}, node } | [ … ] | null,   // wat deze stap uitlicht (rest wordt gedimd)
 *                     (optioneel labelSel: selectie waarop het label staat, labelColor: randkleur van het label,
 *                      labelOff: [dx, dy] verschuiving in px (dy > 0 = omhoog), node: knoop/scène waarnaar een klik op het label gaat)
 *              zoom: sel | null,                                  // waarop inzoomen (standaard focus.sel of alles)
 *              spin: 0.02,                                        // graden per ms rond de y-as
 *              rock: 35,                                          // optioneel: heen en weer wiegen (± graden) i.p.v. rond draaien
 *              pad: .8 } ],                                       // optioneel: iets verder uitzoomen dan zoomTo (< 1 = meer ruimte rondom)
 *   zoomPad: .85,                                                 // standaard-pad voor alle stappen
 *   hotspots: [ { node: 'histonmod', label: {nl,en}, color, href? } ],   // klikbare knoppen links in beeld (href: bv. '../atlas/index.html?pdb=1TUP')
 *   hide: { resn: ['HOH'] },                                      // wat te verbergen (standaard water)
 *   dimOpacity: false,                                            // optioneel: niet doorschijnend dimmen (de scène dimt dan zelf in focus)
 *   outline: true,                                                // optioneel: donkere omtreklijn rond alle vormen (handboekstijl)
 *   rotate: [['x', 90]],                                          // optioneel: beginoriëntatie (draaiingen in graden, na het laden)
 * })
 *
 * Vlot draaien en wisselen: het PDB-bestand wordt één keer geparst (en bewaard: warm()), en elke weergave wordt per keten
 * één keer als apart 3Dmol-model opgebouwd. Een stapwissel toont/verbergt dan alleen modellen (geen nieuwe geometrie).
 * De weergaven van de volgende stappen worden op de achtergrond voorbereid, telkens een klein stukje per beeld.
 * Labels zijn HTML-naamkaartjes boven het 3D-beeld: ze blijven binnen beeld, overlappen niet, krijgen een lijntje naar
 * hun onderdeel als ze verschoven zijn, en zijn klikbaar als ze een `node` hebben.
 * Testhulp: ?ang3d=90 zet het beeld vast onder die hoek (geen draaiing, geen zoomanimatie) voor beeldcontrole.
 */
import { L, C, SPIN, TRNA_SITE } from './kit.js';
import { pdbUrl } from '../shared/pdb.js';

/* 3Dmol.js pas laden wanneer een 3D-scène het nodig heeft (anders wacht de hele app op ~1 MB van de CDN) */
let lib = null;
export function load3Dmol() {
  if (window.$3Dmol) return Promise.resolve(window.$3Dmol);
  return lib ??= new Promise((res, rej) => {
    const sc = document.createElement('script');
    sc.src = 'https://cdn.jsdelivr.net/npm/3dmol@2.5.5/build/3Dmol-min.js';
    sc.onload = () => res(window.$3Dmol); sc.onerror = () => { lib = null; rej(new Error('3Dmol.js')); };
    document.head.append(sc);
  });
}

/* ---------- één stijl voor alle ribosomen in 3D ----------
 * Handboekstijl (zoals PDB-101): de lokale kopieën bevatten alleen CA/P-atomen; grote bollen daarop smelten samen tot een
 * gesloten vorm in vlakke kleuren, met een donkere omlijning (optie outline). Kleuren volgen de 2D-afspraak:
 * kleine eenheid licht groenblauw, grote eenheid donker groenblauw; rRNA verzadigd, ribosoomeiwitten grijziger;
 * tRNA geel (P) / lichtgeel (A) / oker (E), mRNA oranje. Gedimde delen: één rustige, doorschijnende grijsblauwe vorm. */
export const RIBO3D = { r30: '#8df0dc', p30: '#b2d6cf', r50: '#23a88f', p50: '#5f9a90', tP: TRNA_SITE.P, tA: TRNA_SITE.A, tE: TRNA_SITE.E, mrna: C.rna, ghost: '#8a9ac0' };
export const blob = (color, r = 4.2) => ({ sphere: { color, radius: r } });
/* doorschijnende bollen kosten veel grafisch werk (overlappende lagen): gedimde vormen tekenen maar één op de drie atomen,
 * met iets grotere bollen — de omtrek blijft, de grafische kaart doet ≈ 3× minder (thin: zie prepare in makeStage) */
export const ghost = (r = 4.2, op = .1, color = RIBO3D.ghost, thin = 3) => ({ sphere: { color, radius: r * (thin > 1 ? 1.25 : 1), opacity: op, thin } });

/* ---------- cache op moduleniveau: bestand + geparst model (nooit zelf getekend) ---------- */
const TXT = new Map(), MOD = new Map(), MAXMOD = 4;
const idle = () => new Promise(r => { window.requestIdleCallback?.(() => r(), { timeout: 1200 }); setTimeout(r, 1300); });   // vangnet: sommige omgevingen (headless) roepen idle-callbacks nooit aan
function getText(pdb, fmt) {
  const k = `${pdb}.${fmt}`;
  if (!TXT.has(k)) {
    const p = fetch(pdbUrl(pdb, fmt)).then(r => { if (!r.ok) throw new Error(r.status); return r.text(); });
    p.catch(() => TXT.delete(k));
    TXT.set(k, p);
  }
  return TXT.get(k);
}
/* geparst model (3Dmol GLModel zonder viewer): het parsen gebeurt op een rustig moment (requestIdleCallback) */
export function getModel(pdb, fmt = 'cif') {
  const k = `${pdb}.${fmt}`;
  let p = MOD.get(k);
  if (p) { MOD.delete(k); MOD.set(k, p); return p; }      // LRU: recent gebruikt achteraan
  p = Promise.all([load3Dmol(), getText(pdb, fmt)]).then(async ([M, txt]) => {
    await idle();
    const m = new M.GLModel(0, {});
    m.addMolData(txt, fmt === 'cif' ? 'cif' : 'pdb', {});
    TXT.delete(k);                                          // de tekst is niet meer nodig
    return m;
  });
  p.catch(() => MOD.delete(k));
  MOD.set(k, p);
  while (MOD.size > MAXMOD) MOD.delete(MOD.keys().next().value);
  return p;
}
/* op voorhand ophalen en parsen (de engine roept scene.warm() aan voor scènes die waarschijnlijk volgen) */
export const warm3d = (pdb, fmt = 'cif') => { getModel(pdb, fmt).catch(() => {}); };

const WATER = { resn: ['HOH', 'WAT', 'DOD'] };
const DIM = .28;
const q = new URLSearchParams(location.search);
const FIXANG = q.has('ang3d') ? +q.get('ang3d') : null;   // testhulp: vaste hoek

/* de lijst setStyle-opdrachten van één weergave */
function viewOps(base, focus, dimOpacity, hide) {
  const ops = [];
  const dim = !!focus;
  for (const b of base) {
    const st = JSON.parse(JSON.stringify(b.style));
    if (dim && dimOpacity !== false) for (const k of Object.keys(st)) st[k].opacity = Math.min(st[k].opacity ?? 1, DIM);
    ops.push({ sel: b.sel, style: st });
  }
  for (const f of [].concat(focus ?? [])) ops.push({ sel: f.sel, style: f.style });
  ops.push({ sel: hide, style: {} });
  return ops;
}

/*
 * Stage: één 3Dmol-viewer met vooraf opgebouwde weergaven.
 *   views: [{ ops, labels: [{ text, color, node, sel, off }], zoom, spin, rock }]
 */
function makeStage(M, el, master, views, o) {
  const viewer = M.createViewer(el, { backgroundColor: '#0b1224', antialias: true });
  /* omlijning (handboekstijl) alleen in weergaven zonder doorschijnende delen: 3Dmol omlijnt anders elke doorschijnende bol zwart */
  const OUTLINE = o.outline ? { style: 'outline', color: '#04070f', width: o.outline.width ?? .3 } : null;
  let outlined = false;
  const setOutline = on => { if (!OUTLINE || on === outlined) return; outlined = on; viewer.setViewStyle(on ? { ...OUTLINE } : { style: '' }); };
  const atoms = master.atoms;
  const EMPTY = {};                  // gedeelde lege stijl (geen duizenden nieuwe objecten per weergave)
  for (const a of atoms) a.style = EMPTY;
  /* proxy: alle atomen één keer, zonder stijl (geen geometrie) — voor zoomTo en de diepte (slab); de stukken zelf houden
   * na het opbouwen geen atomen meer bij (scheelt veel geheugen) */
  const proxy = viewer.addModel();
  proxy.addAtoms(atoms);
  const styleIds = new Map();
  const sid = st => { const k = JSON.stringify(st); if (!styleIds.has(k)) styleIds.set(k, styleIds.size); return styleIds.get(k); };
  const pieces = new Map();          // sleutel keten|handtekening → { model | null, atoms, styles, n }
  const prepared = [];               // per weergave: lijst sleutels
  let msPerAtom = .004;              // schatting bouwkost (kopiëren + geometrie + inkorten; wordt bijgesteld)
  const stats = { prep: 0, pump: 0, built: 0, doneAt: 0 };
  const selCache = new Map();

  /* weergave i voorbereiden: stijlen op het hoofdmodel zetten en per keten een handtekening maken (geen geometrie) */
  function prepare(i) {
    if (prepared[i]) return prepared[i];
    const t0 = performance.now();
    for (const a of atoms) a.style = EMPTY;
    const sig = new Map();
    for (const op of views[i].ops) {
      const sk = JSON.stringify(op.sel);
      let sel = selCache.get(sk); if (!sel) selCache.set(sk, sel = master.selectedAtoms(op.sel));   // dezelfde selecties keren in elke weergave terug
      const id = sid(op.style), per = new Map();
      const st = Object.keys(op.style).length ? op.style : EMPTY;
      const thin = st.sphere?.thin > 1 ? st.sphere.thin : 0;
      for (const a of sel) {
        a.style = thin && a.index % thin ? EMPTY : st;   // gedeeld stijlobject (3Dmol muteert het niet); 'thin': de rest leeg
        const c = a.chain ?? '';
        let e = per.get(c); if (!e) per.set(c, e = [0, 0]);
        e[0]++; e[1] += a.index;
      }
      for (const [c, e] of per) sig.set(c, (sig.get(c) ?? '') + `${id}:${e[0]}:${e[1]};`);
    }
    const byChain = new Map();
    for (const a of atoms) {
      if (a.style === EMPTY) continue;
      const c = a.chain ?? '';
      let g = byChain.get(c); if (!g) byChain.set(c, g = []);
      g.push(a);
    }
    const keys = [];
    for (const [c, g] of byChain) {
      const k = `${c}|${sig.get(c)}`;
      keys.push(k);
      if (!pieces.has(k)) {
        const styles = g.map(a => a.style);
        const see = styles.some(st => Object.values(st).some(x => (x.opacity ?? 1) < 1));
        // gedimde (doorschijnende) stukken: grovere cartoon (half zoveel geometrie; onder 28 % dekking niet te zien)
        const ghost = styles.every(st => Object.values(st).every(x => (x.opacity ?? 1) < .5));
        pieces.set(k, { model: null, atoms: g, styles, n: g.length, ghost, see });
      }
    }
    for (const a of atoms) a.style = EMPTY;
    stats.prep = Math.max(stats.prep, performance.now() - t0); (stats.preps ??= []).push(Math.round(performance.now() - t0));
    return (prepared[i] = keys);
  }
  function build(p) {
    const m = viewer.addModel(undefined, '', { cartoonQuality: p.ghost ? 4 : 6 });
    m.addAtoms(p.atoms);
    for (let k = 0; k < m.atoms.length; k++) m.atoms[k].style = p.styles[k];
    m.hide();
    p.model = m; p.atoms = p.styles = null;
    fresh.push(m);
    return p.n;
  }
  let fresh = [];
  /* na het opbouwen: atomen loslaten en de geometrie-buffers inkorten (3Dmol reserveert per groep een vaste, ruime
   * capaciteit en kort die alleen in schijn in; bij veel kleine stukken liep dat op tot honderden MB) */
  const trim = o => {
    if (!o) return;
    for (const g of o.geometry?.geometryGroups ?? []) g.truncateArrayBuffers?.(o.geometry.mesh, true);
    for (const c of o.children ?? []) trim(c);
  };
  const drop = () => { for (const m of fresh) if (m.molObj) { m.atoms = []; m.frames = []; trim(m.molObj); } fresh = fresh.filter(m => m.atoms.length); };
  let shown = -1, queue = [];
  function show(i) {
    const keys = prepare(i);
    let n = 0;
    for (const k of keys) { const p = pieces.get(k); if (!p.model) n += build(p); }
    const on = new Set(keys);
    for (const [k, p] of pieces) if (p.model) { if (on.has(k)) p.model.show(); else p.model.hide(); }
    setOutline(!keys.some(k => pieces.get(k).see));
    shown = i;
    return n;
  }
  /* op de achtergrond: weergaven in volgorde voorbereiden, een beperkt aantal atomen per beeld */
  function plan(from) {
    queue = [];
    for (let d = 1; d < views.length; d++) queue.push((from + d) % views.length);
  }
  function pump(budget = 10) {
    if (!queue.length) return 0;
    const i = queue[0];
    if (!prepared[i]) { prepare(i); return 0; }          // voorbereiden is al een stukje werk: bouwen pas volgend beeld
    let n = 0;
    for (const k of prepared[i]) {
      const p = pieces.get(k);
      if (p.model) continue;
      if (n && (n + p.n) * msPerAtom > budget) return n;
      n += build(p);
    }
    queue.shift();
    return n;
  }
  /* een weergave stukje per stukje opbouwen (achter de laadmelding), zonder het beeld lang te bevriezen */
  async function buildView(i, dead) {
    const frame = () => new Promise(r => { requestAnimationFrame(() => r()); setTimeout(r, 40); });   // ook als er geen beelden komen (achtergrond, headless)
    prepare(i); await frame();
    for (const k of prepared[i]) {
      if (dead()) return;
      const p = pieces.get(k); if (p.model) continue;
      const t0 = performance.now(), n = build(p);
      render(n, t0);
      await frame();
    }
  }
  /* een render die nieuwe stukken opbouwt: kost meten en de schatting bijstellen */
  let baseMs = 4;
  function render(nNew, t = performance.now()) {
    viewer.render();
    if (fresh.length) drop();
    const ms = performance.now() - t;
    if (nNew > 200) msPerAtom = .6 * msPerAtom + .4 * Math.max(.0005, (ms - baseMs) / nNew);
    else if (!nNew) baseMs = .8 * baseMs + .2 * ms;
    if (nNew) { (stats.list ??= []).push([nNew, Math.round(ms)]); stats.pump = Math.max(stats.pump, ms); stats.built += nNew; if (!queue.length) stats.doneAt = performance.now(); }
    return ms;
  }
  /* zwaartepunt van een selectie (op het hoofdmodel: elk atoom één keer) */
  function centroid(sel) {
    const s = master.selectedAtoms(sel); if (!s.length) return null;
    let x = 0, y = 0, z = 0; for (const a of s) { x += a.x; y += a.y; z += a.z; }
    return { x: x / s.length, y: y / s.length, z: z / s.length };
  }
  /* camera: zelf vloeiend verschuiven/zoomen (alleen positie en afstand; de draaiing loopt intussen gewoon door) */
  let anim = null;
  function cam(sel, dur = 900, pad = o.zoomPad ?? 1) {
    const cur = viewer.getView();
    viewer.zoomTo({ ...sel, model: proxy });
    if (pad !== 1) viewer.zoom(pad);
    const to = viewer.getView();
    if (!dur) { anim = null; return; }
    viewer.setView(cur, true);
    anim = { from: cur, to, t0: performance.now(), dur };
  }
  function tick() {
    if (!anim) return false;
    const k = Math.min(1, (performance.now() - anim.t0) / anim.dur), e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
    const v = viewer.getView();
    for (const j of [0, 1, 2, 3, 8, 9]) if (anim.to[j] !== undefined && anim.from[j] !== undefined) v[j] = anim.from[j] + (anim.to[j] - anim.from[j]) * e;
    viewer.setView(v, true);
    if (k >= 1) anim = null;
    return true;
  }
  return { viewer, proxy, show, plan, pump, buildView, render, centroid, stats, cam, tick, get moving() { return !!anim; }, get shown() { return shown; } };
}

/* HTML-naamkaartjes boven een 3D-beeld */
function makeLabels(host, viewer, onNode, fs) {
  const wrap = document.createElement('div');
  wrap.className = 'lab3d';
  wrap.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:2;overflow:hidden';
  wrap.innerHTML = '<svg style="position:absolute;inset:0;width:100%;height:100%;overflow:visible"></svg>';
  host.append(wrap);
  const svg = wrap.firstChild;
  let items = [];
  function set(list) {
    for (const it of items) it.el.remove();
    svg.innerHTML = '';
    items = list.filter(l => l.pos).map(l => {
      const el = document.createElement('div');
      const col = l.color ?? '#7cc4ff';
      el.textContent = l.text;
      el.style.cssText = `position:absolute;left:0;top:0;white-space:nowrap;font:600 ${fs}px/1.25 system-ui,sans-serif;color:#fff;background:rgba(11,18,36,.88);` +
        `border:${l.color ? 2 : 1}px solid ${col};border-radius:7px;padding:3px 9px;visibility:hidden;` + (l.node ? 'pointer-events:auto;cursor:pointer;' : '');
      if (l.node) {
        el.title = '→';
        el.insertAdjacentHTML('beforeend', ' <span style="opacity:.75;font-weight:500">›</span>');
        el.addEventListener('click', e => { e.stopPropagation(); onNode(l.node); });
        el.addEventListener('mouseenter', () => { el.style.background = 'rgba(30,44,80,.95)'; });
        el.addEventListener('mouseleave', () => { el.style.background = 'rgba(11,18,36,.88)'; });
      }
      wrap.append(el);
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('stroke', col); line.setAttribute('stroke-width', '1.5'); line.setAttribute('opacity', '.85');
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('r', '3.5'); dot.setAttribute('fill', col);
      svg.append(line, dot);
      return { ...l, el, line, dot, w: 0, h: 0 };
    });
  }
  /* plaatsen: anker + verschuiving, daarna binnen beeld houden en overlap wegduwen */
  function place(avoid = []) {
    if (!items.length) return;
    const W = wrap.clientWidth, H = wrap.clientHeight;
    if (!W || !H) return;
    const off = viewer.canvasOffset();                 // modelToScreen geeft paginacoördinaten; het canvas vult dezelfde ruimte als de labellaag
    for (const it of items) {
      if (!it.w) { it.w = it.el.offsetWidth; it.h = it.el.offsetHeight; }
      const s = viewer.modelToScreen(it.pos);
      it.ax = s.x - off.left; it.ay = s.y - off.top;
      it.x = it.ax + (it.off?.[0] ?? 0); it.y = it.ay - (it.off?.[1] ?? 0);
    }
    const M = 8;
    const clampIt = it => {
      it.x = Math.max(M + it.w / 2, Math.min(W - M - it.w / 2, it.x));
      it.y = Math.max(M + it.h / 2, Math.min(H - M - it.h / 2, it.y));
      for (const a of avoid) {                                         // hotspotknoppen, uitlegvenster e.d. niet bedekken
        const ox = Math.min(it.x + it.w / 2, a.r) - Math.max(it.x - it.w / 2, a.l), oy = Math.min(it.y + it.h / 2, a.b) - Math.max(it.y - it.h / 2, a.t);
        if (ox <= 0 || oy <= 0) continue;
        // kleinste verschuiving die binnen beeld blijft: links, rechts, boven of onder het obstakel
        const opts = [[a.l - it.w / 2 - 6, it.y], [a.r + it.w / 2 + 6, it.y], [it.x, a.t - it.h / 2 - 6], [it.x, a.b + it.h / 2 + 6]]
          .filter(([x, y]) => x - it.w / 2 >= M && x + it.w / 2 <= W - M && y - it.h / 2 >= M && y + it.h / 2 <= H - M)
          .sort((u, v) => Math.hypot(u[0] - it.x, u[1] - it.y) - Math.hypot(v[0] - it.x, v[1] - it.y));
        if (opts.length) [it.x, it.y] = opts[0];
      }
    };
    items.forEach(clampIt);
    for (let pass = 0; pass < 6; pass++) {
      let moved = false;
      for (let a = 0; a < items.length; a++) for (let b = a + 1; b < items.length; b++) {
        const A = items[a], B = items[b];
        const ox = (A.w + B.w) / 2 + 6 - Math.abs(A.x - B.x), oy = (A.h + B.h) / 2 + 4 - Math.abs(A.y - B.y);
        if (ox > 0 && oy > 0) {
          const d = (oy / 2 + .5) * (A.y <= B.y ? 1 : -1);
          A.y -= d; B.y += d; clampIt(A); clampIt(B); moved = true;
        }
      }
      if (!moved) break;
    }
    for (const it of items) {
      it.el.style.transform = `translate(${(it.x - it.w / 2).toFixed(1)}px,${(it.y - it.h / 2).toFixed(1)}px)`;
      it.el.style.visibility = 'visible';
      // lijntje naar het onderdeel als het kaartje er niet meer op staat
      const dx = it.ax - it.x, dy = it.ay - it.y, far = Math.abs(dx) > it.w / 2 + 4 || Math.abs(dy) > it.h / 2 + 4;
      const inside = it.ax > -20 && it.ax < W + 20 && it.ay > -20 && it.ay < H + 20;
      if (far && inside) {
        const k = Math.min((it.w / 2) / Math.max(1e-6, Math.abs(dx)), (it.h / 2) / Math.max(1e-6, Math.abs(dy)));
        it.line.setAttribute('x1', (it.x + dx * k).toFixed(1)); it.line.setAttribute('y1', (it.y + dy * k).toFixed(1));
        it.line.setAttribute('x2', it.ax.toFixed(1)); it.line.setAttribute('y2', it.ay.toFixed(1));
        it.dot.setAttribute('cx', it.ax.toFixed(1)); it.dot.setAttribute('cy', it.ay.toFixed(1));
        it.line.style.display = it.dot.style.display = '';
      } else it.line.style.display = it.dot.style.display = 'none';
    }
  }
  return { set, place, remove: () => wrap.remove() };
}

/* de draaiing van een stap: rond draaien (spin) of heen en weer wiegen (rock, ± graden).
 * Wiegen gaat bewust heel traag (één volle zwaai per 60 s): snel heen en weer leidt af en helpt niet om de figuur te lezen. */
const ROCK_PERIOD = 60000;
function rotor(viewer) {
  let lastT = performance.now(), rockA = 0, tRock = 0;
  return (st, force) => {
    const now = performance.now(), dt = now - lastT;
    if (dt < 32 && !force) return false;         // ~30 beelden/s volstaat voor rustig draaien
    lastT = now;
    if (FIXANG !== null || dt > 200) return true;
    if (st.rock) {
      tRock += dt;
      const a = st.rock * Math.sin(tRock / ROCK_PERIOD * 2 * Math.PI);
      viewer.rotate(a - rockA, 'y'); rockA = a;
    } else {
      const spin = (st.spin ?? .012) * SPIN;
      if (spin) viewer.rotate(dt * spin, 'y');
    }
    return true;
  };
}

/* wachten tot de zoomovergang van de engine voorbij is (de laag heeft dan geen transform meer), anders hapert die */
function whenSettled(layer, cb) {
  const t0 = performance.now();
  let saw = false;
  const tick = () => {
    if (!layer.isConnected && performance.now() - t0 > 4000) return;
    const tr = layer.style.transform;
    if (tr) saw = true;
    if ((saw && !tr) || performance.now() - t0 > 1900) return cb();
    setTimeout(tick, 60);
  };
  tick();
}

/* close-ups (zoom op residuen of liganden): standaard iets meer ruimte rondom en heen en weer wiegen i.p.v. rond draaien,
 * anders schuiven delen vlak voor de camera over het uitgelichte stukje of draait het uit beeld */
const isClose = z => !!z && !!(z.resi || z.resn || z.or || z.atom);
export function motion(st, o) {
  const z = st.zoom === undefined ? [].concat(st.focus ?? [])[0]?.sel : st.zoom, close = isClose(z);
  return { spin: st.spin, rock: st.rock ?? (close ? 30 : 0), pad: st.pad ?? (close ? .7 : o.zoomPad ?? 1) };
}

function labelsOf(focus) {
  return [].concat(focus ?? []).filter(f => f.label).map(f => ({ text: L(f.label), color: f.labelColor, node: f.node, sel: f.labelSel ?? f.sel, off: f.labelOff }));
}

export function structure3d(o) {
  const fmt = o.format ?? 'cif';
  const nodes = [...new Set(o.steps.flatMap(st => [].concat(st.focus ?? []).map(f => f.node).filter(Boolean)))];
  return {
    ...o,
    kind: '3d',
    warm() { warm3d(o.pdb, fmt); },
    html() {
      const hs = (o.hotspots ?? []).map(h => `<button class="h3" data-node="${h.node}"${h.href ? ` data-href="${h.href}"` : ''} data-nolabel style="--c:${h.color ?? C.accent ?? '#7cc4ff'}">${L(h.label)}</button>`).join('');
      // verborgen knoppen voor de klikbare 3D-labels (de engine koppelt navigatie aan elk [data-node] in de laag)
      const hid = nodes.filter(n => !(o.hotspots ?? []).some(h => h.node === n)).map(n => `<button data-node="${n}" data-nolabel hidden tabindex="-1"></button>`).join('');
      return `<div class="v3d"></div>
        <div class="h3wrap">${hs}</div>${hid}
        <div class="load3d">${L({ nl: `Structuur ${o.pdb} laden uit de Protein Data Bank…`, en: `Loading structure ${o.pdb} from the Protein Data Bank…` })}</div>
        <a class="pdbtag" href="https://www.rcsb.org/structure/${o.pdb}" target="_blank" rel="noopener">PDB ${o.pdb} ↗</a>`;
    },
    init(layer) {
      const el = layer.querySelector('.v3d');
      let stage = null, labs = null, spin = null, dead = false, ready = false, lastStep = -1;
      const base = o.base ?? [{ sel: {}, style: { cartoon: { color: 'spectrum' } } }];
      const hide = o.hide ?? WATER;
      const views = o.steps.map(st => ({ ops: viewOps(base, st.focus, o.dimOpacity, hide), focus: st.focus }));
      const MOT = o.steps.map(st => motion(st, o));
      const onNode = n => layer.querySelector(`[data-node="${n}"]`)?.click();
      let want = 0;
      Promise.all([load3Dmol(), getModel(o.pdb, fmt)]).then(([M, master]) => new Promise(r => whenSettled(layer, () => r([M, master])))).then(async ([M, master]) => {
        if (dead) return;
        stage = makeStage(M, el, master, views, o);
        await stage.buildView(want, () => dead);
        if (dead) return;
        labs = makeLabels(layer, stage.viewer, onNode, 15);
        spin = rotor(stage.viewer);
        ready = true; lastStep = -1;
        layer.querySelector('.load3d')?.remove();
        if (FIXANG !== null) {                       // testhulp voor beeldcontrole: hoek instellen vanuit de console/CDP
          let cur = FIXANG;
          window.__k3d = { stats: stage.stats, get step() { return lastStep; }, get rock() { return lastStep >= 0 ? motion(o.steps[lastStep], o).rock : 0; }, ang(d) { stage.viewer.rotate(d - cur, 'y'); cur = d; stage.render(0); avT = 0; place(); } };
        }
      }).catch(e => { const l = layer.querySelector('.load3d'); if (l) l.textContent = L({ nl: `Structuur ${o.pdb} kon niet geladen worden (geen internet?)`, en: `Structure ${o.pdb} could not be loaded (offline?)` }) + ` · ${e.message}`; });

      let first = true;
      // niet onder de hotspotknoppen, het PDB-label of het zwevende uitlegvenster van de engine (#caption) leggen
      const avoid = () => { const h = layer.getBoundingClientRect(); return [...layer.querySelectorAll('.h3wrap, .pdbtag'), document.querySelector('#caption.float:not([hidden])')].filter(Boolean)
        .map(e => e.getBoundingClientRect()).filter(r => r.width && r.height).map(r => ({ l: r.left - h.left, r: r.right - h.left, t: r.top - h.top, b: r.bottom - h.top })); };
      let av = [], avT = 0;
      const place = () => { const now = performance.now(); if (now - avT > 500) { av = avoid(); avT = now; } labs.place(av); };
      function applyStep(i) {
        const st = o.steps[i], v = stage.viewer;
        const nNew = stage.show(i);
        if (first) {
          stage.cam({}, 0);
          for (const [axis, deg] of o.rotate ?? []) v.rotate(deg, axis);   // optioneel: beginoriëntatie (bv. lange as verticaal)
          if (FIXANG) v.rotate(FIXANG, 'y');
        }
        const z = st.zoom === undefined ? ([].concat(st.focus ?? [])[0]?.sel ?? {}) : (st.zoom ?? {});
        stage.cam(z, first || FIXANG !== null ? 0 : 900, motion(st, o).pad);
        first = false;
        labs.set(labelsOf(st.focus).map(l => ({ ...l, pos: stage.centroid(l.sel) })));
        avT = 0;
        stage.render(nNew);
        place();
        stage.plan(i);
      }
      return {
        update(t, s) {
          want = s.step;
          if (!ready) return;
          if (s.step !== lastStep) { lastStep = s.step; applyStep(s.step); return; }
          if (!spin(MOT[s.step], stage.moving)) return;
          stage.tick();
          const t0 = performance.now(), n = stage.pump();
          stage.render(n, t0);
          place();
        },
        destroy() {
          dead = true;
          labs?.remove();
          try { stage?.viewer.clear(); } catch {}
          // WebGL-geheugen meteen vrijgeven (anders stapelen de 3D-beelden zich op bij elke scènewissel)
          try { for (const cv of el.querySelectorAll('canvas')) (cv.getContext('webgl2') ?? cv.getContext('webgl'))?.getExtension('WEBGL_lose_context')?.loseContext(); } catch {}
        },
      };
    },
  };
}

/*
 * inset3d(): een echte 3D-structuur als venster in een 2D-scène (SVG), alleen tijdens bepaalde stappen.
 * De 2D-scène tekent zelf het kader (een <rect id="…"> in de SVG); het 3D-venster volgt dat kader op het scherm,
 * ook als de camera van de engine zoomt of het scherm smal is.
 *
 *   const v = inset3d(svg, { pdb, format, box: 'mi-box', base, dimOpacity, off: !api?.node, steps: { 2: { focus, zoom, spin }, 3: {…} } });
 *   in update(t, s):  const op = v.update(s);     // 0..1: zichtbaarheid (zelfde waarde gebruiken voor het SVG-kader)
 *   in destroy():     v.destroy();
 *   in init():        return withInset({ update(t, s) {…}, destroy() {…} }, v);
 *   op het scèneobject (optioneel): warm() { warm3d(pdb, format); }   → bestand al ophalen en parsen
 * withInset zorgt dat de engine update() elk beeld blijft aanroepen zolang het 3D-venster te zien is (de engine slaat
 * update anders over als t niet verandert, bv. tijdens het wachten op het eindbeeld): de sleutel api.__k klopt dan nooit.
 * Zichtbaarheid: een 3D-stap na een 2D-stap fadet in (eerste 15 % van de stap); een 2D-stap na een 3D-stap fadet uit.
 * Het 3D-venster is dekkend: teken in het SVG-kader een eenvoudige plaatsvervanger (die zien de testhulpmiddelen en wie geen WebGL heeft).
 * Labels met `node` zijn klikbaar: de klik gaat naar het eerste [data-node="…"]-element in de SVG.
 */
export const insetOp = (steps, s) => {
  const now = !!steps[s.step], prev = !!steps[s.step - 1], k = Math.min(1, Math.max(0, s.p / .15));
  return now ? (prev || s.step === 0 ? 1 : k) : (prev ? 1 - k : 0);   // een 3D-eerste stap is er meteen (geen leeg beginbeeld)
};
export function inset3d(svg, o) {
  // in de testhulpmiddelen (tools/*.html: init zonder api.node) geen 3D laden: daar telt alleen de SVG
  if (o.off) return { live: false, update: s => insetOp(o.steps, s), destroy() {} };
  const host = svg.parentNode, box = svg.getElementById(o.box);
  const el = document.createElement('div');
  el.className = 'v3d-inset';
  el.style.cssText = 'position:absolute;left:0;top:0;width:10px;height:10px;opacity:0;pointer-events:none;z-index:2';
  host.append(el);
  let stage = null, labs = null, spin = null, dead = false, ready = false, lastStep = -1, lastSize = '', first = true;
  const fmt = o.format ?? 'pdb';
  const keys = Object.keys(o.steps).map(Number).sort((a, b) => a - b);
  const views = keys.map(k => ({ ops: viewOps(o.base, o.steps[k].focus, o.dimOpacity, WATER) }));
  const onNode = n => svg.querySelector(`[data-node="${n}"]`)?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  Promise.all([load3Dmol(), getModel(o.pdb, fmt)]).then(([M, master]) => new Promise(r => whenSettled(host, () => r([M, master])))).then(async ([M, master]) => {
    if (dead) return;
    stage = makeStage(M, el, master, views, o);
    await stage.buildView(0, () => dead);
    if (dead) return;
    labs = makeLabels(el, stage.viewer, onNode, 16);
    spin = rotor(stage.viewer);
    ready = true; lastStep = -1;
  }).catch(e => console.warn(`[inset3d] ${o.pdb}: ${e.message}`));
  function applyStep(key) {
    const st = o.steps[key], v = stage.viewer, i = keys.indexOf(key);
    const nNew = stage.show(i);
    if (first) { stage.cam({}, 0); if (FIXANG) v.rotate(FIXANG, 'y'); }
    stage.cam(st.zoom ?? {}, first || FIXANG !== null ? 0 : 900, motion({ zoom: st.zoom ?? {}, ...st }, o).pad);
    first = false;
    labs.set(labelsOf(st.focus).map(l => ({ ...l, pos: stage.centroid(l.sel) })));
    stage.render(nNew);
    labs.place();
    stage.plan(i);
  }
  return {
    live: false,                                      // true zolang het venster zichtbaar is
    update(s) {
      const op = insetOp(o.steps, s);
      this.live = op > .005;
      el.style.opacity = op.toFixed(3);
      el.style.visibility = op > .005 ? 'visible' : 'hidden';
      if (op <= .005) return op;
      // het kader volgen (de engine kan de camera van de SVG veranderen)
      const hb = host.getBoundingClientRect(), bb = box.getBoundingClientRect();
      const size = `${Math.round(bb.width)}x${Math.round(bb.height)}`;
      el.style.left = `${(bb.left - hb.left).toFixed(1)}px`; el.style.top = `${(bb.top - hb.top).toFixed(1)}px`;
      el.style.width = `${bb.width.toFixed(1)}px`; el.style.height = `${bb.height.toFixed(1)}px`;
      if (!ready) return op;
      if (size !== lastSize) { lastSize = size; stage.viewer.resize(); stage.render(0); labs.place(); }
      const key = o.steps[s.step] ? s.step : s.step - 1, st = o.steps[key];
      if (key !== lastStep && st) { lastStep = key; applyStep(key); return op; }
      if (!st || !spin(motion({ zoom: st.zoom ?? {}, ...st }, o), stage.moving)) return op;
      stage.tick();
      const t0 = performance.now(), n = stage.pump();
      stage.render(n, t0);
      labs.place();
      return op;
    },
    destroy() {
      dead = true;
      labs?.remove();
      try { stage?.viewer.clear(); } catch {}
      try { for (const cv of el.querySelectorAll('canvas')) (cv.getContext('webgl2') ?? cv.getContext('webgl'))?.getExtension('WEBGL_lose_context')?.loseContext(); } catch {}
      el.remove();
    },
  };
}

/* het api-object van een 2D-scène met inset3d: elk beeld opnieuw tekenen zolang het 3D-venster zichtbaar is */
export function withInset(api, v) {
  let k;
  Object.defineProperty(api, '__k', { get: () => (v.live ? null : k), set: x => { k = x; }, configurable: true });
  return api;
}
