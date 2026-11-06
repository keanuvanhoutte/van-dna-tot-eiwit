/* A · "Bekijk echt in 3D": generieke knop voor structuurknopen. De 2D-tekening blijft staan; de knop legt er
 * een 3D-paneel over met de echte PDB-structuur (vloeiende fade, achtergrond = paneelkleur, dus nooit zwart). */
import { L } from '../../shared/i18n.js';
import { NODES, title, summary } from '../../shared/content.js';
import { pdbUrl } from '../../shared/pdb.js';
import { $, t, sources } from './common.js';

const DEMO = [
  { id: 'dnahelix', pdb: '1BNA', atlas: '?id=bdna', src: 'drew' },
  { id: 'trna', pdb: '1EHZ', atlas: '?id=trna', src: 'shi' },
  { id: 'secundair', pdb: '1UBQ', atlas: '?pdb=1UBQ', src: 'vijay' },
];
const BG = '#0d1426';
let viewer, cur = DEMO[0], style = 'cartoon';
const txtCache = new Map();

/* ---------- vereenvoudigde 2D-tekeningen (plaatshouders voor de bestaande scènes) ---------- */
const TAG = () => `<text x="24" y="40" font-size="20" fill="#93a0bb" font-family="Inter">${t('a2dTag')}</text>`;
function ladder() {
  const W = 1200, H = 520, x0 = 160, x1 = 1040;
  let s1 = '', s2 = '', rungs = '';
  for (let i = 0; i <= 120; i++) {
    const x = x0 + (x1 - x0) * i / 120, ph = i / 120 * Math.PI * 4;
    s1 += `${i ? 'L' : 'M'}${x.toFixed(1)},${(260 - 120 * Math.sin(ph)).toFixed(1)} `;
    s2 += `${i ? 'L' : 'M'}${x.toFixed(1)},${(260 + 120 * Math.sin(ph)).toFixed(1)} `;
  }
  const seq = 'CGCGAATTCGCG';
  for (let k = 0; k < 12; k++) {
    const i = (k + 1) * 120 / 13, x = x0 + (x1 - x0) * i / 120, ph = i / 120 * Math.PI * 4, a = 120 * Math.sin(ph);
    const gc = seq[k] === 'G' || seq[k] === 'C';
    rungs += `<line x1="${x}" y1="${260 - a}" x2="${x}" y2="${260 + a}" stroke="${gc ? '#7cc4ff' : '#ffc247'}" stroke-width="9" stroke-linecap="round" opacity=".85"/>`;
  }
  return `<svg viewBox="0 0 ${W} ${H}">${TAG()}${rungs}<path d="${s1}" fill="none" stroke="#4f8ff7" stroke-width="12" stroke-linecap="round"/><path d="${s2}" fill="none" stroke="#9cc0ff" stroke-width="12" stroke-linecap="round"/>
    <text x="600" y="470" text-anchor="middle" font-size="24" fill="#93a0bb" font-family="Inter">A–T <tspan fill="#ffc247">━</tspan>   G–C <tspan fill="#7cc4ff">━</tspan></text></svg>`;
}
function clover() {
  const c = '#ffc247', st = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="10" stroke-linecap="round"/>`;
  const loop = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${c}" stroke-width="8"/>`;
  return `<svg viewBox="0 0 1200 520">${TAG()}
    ${st(600, 60, 600, 230)}${st(620, 60, 620, 230)}
    ${st(590, 250, 440, 250)}${loop(395, 250, 45)}
    ${st(630, 250, 780, 250)}${loop(825, 250, 45)}
    ${st(600, 270, 600, 380)}${loop(600, 425, 45)}
    <text x="640" y="70" font-size="24" fill="#e8edf7" font-family="Inter">CCA</text>
    <text x="600" y="505" text-anchor="middle" font-size="24" fill="#e8edf7" font-family="Inter">anticodon</text></svg>`;
}
function ss() {
  let coil = '';
  for (let i = 0; i <= 200; i++) { const x = 180 + i * 2.2, y = 260 + 70 * Math.sin(i / 200 * Math.PI * 9); coil += `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)} `; }
  const arrow = (y, dir) => { const a = 720, b = 1060, [p, q] = dir > 0 ? [a, b] : [b, a];
    return `<path d="M${p},${y - 16} L${q - 40 * dir},${y - 16} L${q - 40 * dir},${y - 32} L${q},${y} L${q - 40 * dir},${y + 32} L${q - 40 * dir},${y + 16} L${p},${y + 16} Z" fill="#ffc247" opacity=".9"/>`; };
  return `<svg viewBox="0 0 1200 520">${TAG()}<path d="${coil}" fill="none" stroke="#f06bc0" stroke-width="12" stroke-linecap="round"/>
    ${arrow(170, 1)}${arrow(260, -1)}${arrow(350, 1)}
    <path d="M620,260 C660,260 670,170 720,170" fill="none" stroke="#8a93a8" stroke-width="7"/>
    <text x="400" y="420" text-anchor="middle" font-size="26" fill="#f06bc0" font-family="Inter">α-helix</text>
    <text x="890" y="430" text-anchor="middle" font-size="26" fill="#ffc247" font-family="Inter">β-${L({ nl: 'blad', en: 'sheet' })}</text></svg>`;
}
const DRAW = { dnahelix: ladder, trna: clover, secundair: ss };

/* ---------- 3D ---------- */
async function text(code) {
  if (!txtCache.has(code)) txtCache.set(code, fetch(pdbUrl(code)).then(r => { if (!r.ok) throw new Error(r.status); return r.text(); }));
  return txtCache.get(code);
}
function applyStyle() {
  if (!viewer) return;
  const prot = cur.id === 'secundair';
  const s = style === 'cartoon' ? { cartoon: prot ? { color: 'spectrum' } : { colorfunc: a => (a.chain === 'B' ? '#9cc0ff' : cur.id === 'trna' ? '#ffc247' : '#4f8ff7') } }
    : style === 'stick' ? { stick: { radius: .18 } } : { sphere: { scale: .9 } };
  viewer.setStyle({}, s);
  viewer.setStyle({ resn: ['HOH', 'MG', 'NA', 'K', 'CL', 'SO4'] }, {});
  viewer.render();
}
async function open() {
  const ov = $('aOv');
  $('aOvT').textContent = `${title(NODES[cur.id])} · PDB ${cur.pdb}`;
  $('aAtlas').textContent = t('aAtlas');
  $('aAtlas').href = '../../atlas/index.html' + cur.atlas;
  $('aFoot').innerHTML = t('aFoot') + `<b>${cur.pdb}</b>`;
  try {
    const txt = await text(cur.pdb);
    /* nieuwe viewer per structuur: verse camera (draaiing van de vorige structuur blijft niet hangen) */
    if (viewer) { viewer.clear(); $('aView').querySelector('canvas')?.remove(); }
    viewer = $3Dmol.createViewer($('aView'), { backgroundColor: BG, antialias: true });
    viewer.addModel(txt, 'pdb'); applyStyle();
    if (cur.id === 'dnahelix') { viewer.rotate(90, 'x'); viewer.rotate(90, 'y'); }     /* helixas liggend in het brede venster */
    viewer.zoomTo({ resn: ['HOH'], invert: true }); viewer.zoom(cur.id === 'dnahelix' ? 1.2 : 1.5); viewer.render();
  } catch { $('aFoot').textContent = t('loadErr'); }
  requestAnimationFrame(() => { ov.classList.add('open'); ov.setAttribute('aria-hidden', 'false'); $('aClose').focus(); });
}
function close() { const ov = $('aOv'); ov.classList.remove('open'); ov.setAttribute('aria-hidden', 'true'); $('aOpen').focus(); }

function pick(d) {
  cur = d;
  const n = NODES[d.id];
  $('aTitle').textContent = title(n);
  $('aSum').textContent = summary(n);
  $('a2d').innerHTML = DRAW[d.id]();
  for (const b of $('aNodes').children) b.setAttribute('aria-pressed', String(b.dataset.v === d.id));
  if ($('aOv').classList.contains('open')) open();
}

export function init() {
  for (const d of DEMO) {
    const b = document.createElement('button'); b.dataset.v = d.id;
    b.textContent = `${title(NODES[d.id])} · ${d.pdb}`; b.onclick = () => pick(d);
    $('aNodes').append(b);
  }
  $('aOpen').textContent = t('aOpen');
  $('aClose').textContent = t('aClose');
  $('aOpen').onclick = open; $('aClose').onclick = close;
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && $('aOv').classList.contains('open')) close(); });
  for (const b of $('aStyle').children) b.onclick = () => { style = b.dataset.v; for (const x of $('aStyle').children) x.setAttribute('aria-pressed', String(x === b)); applyStyle(); };
  sources($('srcA'), ['drew', 'shi', 'vijay', 'mol3d']);
  const q = new URLSearchParams(location.search);
  pick(DEMO.find(d => d.id === q.get('node')) ?? DEMO[0]);
  if (q.get('open') === '1') open();
  return { shown: () => viewer?.resize() };
}
