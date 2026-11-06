/*
 * "Bekijk echt in 3D" (fase 4, uit poc/03-diepte): een paneel dat over de (vereenvoudigde) 2D-tekening schuift en de echte
 * PDB-structuur van de knoop toont. Achtergrond = paneelkleur (nooit zwart), zachte CSS-fade, afspelen pauzeert.
 *  - weergave: cartoon / stokjes / bolletjes; water en ionen verborgen; langste as liggend (PCA, starre draaiing)
 *  - meerdere PDB-codes → keuzechips; link naar de atlas; sluiten met ✕ of Esc
 *  - "Atoomniveau": waterstofbruggen (DSSP-criterium) + Ramachandran-grafiek voor eiwitten, Watson-Crick-bruggen voor DNA
 * Alleen lokale kopieën (data/pdb) worden getoond, zodat het ook zonder RCSB werkt.
 */
import { L, lang } from '../shared/i18n.js';
import { NODES, title } from '../shared/content.js';
import { localPdb, rcsbEntryUrl } from '../shared/pdb.js';
import { load3Dmol } from './kit3d.js';
import { inspect, analyseProtein, principalFrame, applyFrame, WATER_IONS, FAV, ALLOW, MAX_RES } from './atomic.js';

const BG = '#0d1426';                                         // = var(--bg-2), de paneelkleur
const SS = { helix: '#f06bc0', sheet: '#ffc247', other: '#8a93a8' };
const HB = '#7cc4ff', AT = '#ffc247', GC = '#7fdc6a', GLY = '#5fd3e6';
const PAL = ['#9b7bff', '#7fdc6a', '#5fd3e6', '#f06bc0', '#ffc247', '#c9a574', '#ff8a3d', '#6f5bd6'];
const ELEM = { N: '#3050f8', O: '#ff3b3b', P: '#ff8000', S: '#ffd84a', H: '#e8edf7', FE: '#e06633', ZN: '#7d80b0', MG: '#8aff00' };

const T = {
  open: { nl: 'Bekijk echt in 3D', en: 'View in real 3D' },
  openTip: { nl: 'Leg het echte molecuul (PDB) over de tekening', en: 'Lay the real molecule (PDB) over the drawing' },
  close: { nl: 'Sluiten', en: 'Close' }, closeTip: { nl: 'Terug naar de tekening (Esc)', en: 'Back to the drawing (Esc)' },
  atlas: { nl: 'Verder in de atlas →', en: 'More in the atlas →' },
  cartoon: { nl: 'Cartoon', en: 'Cartoon' }, stick: { nl: 'Stokjes', en: 'Sticks' }, sphere: { nl: 'Bolletjes', en: 'Spheres' },
  styleLbl: { nl: 'Weergave', en: 'Style' },
  atomic: { nl: 'Atoomniveau', en: 'Atomic level' },
  atomicTip: { nl: 'Toon wat de vorm bij elkaar houdt: waterstofbruggen, berekend uit de echte atoomposities', en: 'Show what holds the shape together: hydrogen bonds, computed from the real atom positions' },
  loading: { nl: 'Structuur laden…', en: 'Loading structure…' },
  loadErr: { nl: 'De structuur kon niet geladen worden.', en: 'The structure could not be loaded.' },
  help: { nl: 'Sleep om te draaien · scroll om te zoomen · echte atoomcoördinaten uit de Protein Data Bank', en: 'Drag to rotate · scroll to zoom · real atomic coordinates from the Protein Data Bank' },
  src: { nl: 'Bronnen', en: 'Sources' },
  coarse: { nl: 'Ingekorte kopie: één bolletje per bouwsteen (alleen de Cα- en P-atomen).', en: 'Trimmed copy: one bead per building block (only the Cα and P atoms).' },
  noCoarse: { nl: 'Deze kopie bevat alleen de Cα- en P-atomen (ingekort voor snelheid): te weinig om waterstofbruggen te berekenen.', en: 'This copy only contains the Cα and P atoms (trimmed for speed): too few to compute hydrogen bonds.' },
  noBig: { nl: `De eiwitketen is te groot (meer dan ${MAX_RES} bouwstenen) om hier snel door te rekenen.`, en: `The protein chain is too large (more than ${MAX_RES} building blocks) to compute here quickly.` },
  noRna: { nl: 'Voor RNA rekent de app geen bruggen uit: RNA vouwt op zichzelf met veel soorten paren. Bekijk het in de atlas.', en: 'The app does not compute bonds for RNA: RNA folds onto itself with many kinds of pairs. Look at it in the atlas.' },
  noOther: { nl: 'Atoomniveau werkt voor eiwitten en voor gewone DNA-dubbelhelices. Deze structuur is geen van beide.', en: 'The atomic level works for proteins and for ordinary DNA double helices. This structure is neither.' },
  modeProt: { nl: 'Eiwit', en: 'Protein' }, modeDna: { nl: 'DNA', en: 'DNA' },
  /* eiwit */
  pHead: { nl: 'Wat houdt het eiwit in vorm?', en: 'What keeps the protein in shape?' },
  nHb: { nl: 'waterstofbruggen in de ruggengraat', en: 'hydrogen bonds in the backbone' },
  nFav: { nl: 'in een gunstig gebied', en: 'in a favoured region' },
  counted: { nl: 'geteld: alle bouwstenen behalve glycine en proline', en: 'counted: all building blocks except glycine and proline' },
  nSS: { nl: 'bouwstenen in helix · blad · rest', en: 'building blocks in helix · sheet · other' },
  helix: { nl: 'helix', en: 'helix' }, sheet: { nl: 'blad (β)', en: 'sheet (β)' }, other: { nl: 'rest', en: 'other' }, hbLeg: { nl: 'waterstofbrug', en: 'hydrogen bond' },
  ramaH: { nl: 'Twee draaipunten per bouwsteen (φ en ψ)', en: 'Two hinges per building block (φ and ψ)' },
  fav: { nl: 'gunstig', en: 'favoured' }, allow: { nl: 'toegestaan', en: 'allowed' },
  glyLeg: { nl: 'glycine heeft meer vrijheid', en: 'glycine has more freedom' }, proLeg: { nl: 'proline', en: 'proline' },
  more: { nl: 'Hoe werkt dit?', en: 'How does this work?' },
  hint: { nl: 'Klik op een punt in de grafiek of op het eiwit in 3D.', en: 'Click a dot in the plot or the protein in 3D.' },
  inFav: { nl: 'in een gunstig gebied', en: 'in a favoured region' }, inAllow: { nl: 'in een toegestaan gebied', en: 'in an allowed region' }, inOut: { nl: 'buiten de getekende gebieden', en: 'outside the drawn regions' },
  isGly: { nl: 'glycine heeft geen zijketen en dus meer vrijheid: telt niet mee', en: 'glycine has no side chain and so more freedom: not counted' },
  isPro: { nl: 'proline heeft een ring die φ vastzet: telt niet mee', en: 'proline has a ring that fixes φ: not counted' },
  partners: { nl: 'bruggen met', en: 'bonds with' },
  chainOnly: { nl: 'Alleen keten', en: 'Only chain' },
  phipsi: { nl: 'Elke bouwsteen heeft twee draaipunten in de ruggengraat: φ (phi) en ψ (psi). Niet elke combinatie kan, want dan botsen atomen. Elke stip is één bouwsteen.', en: 'Every building block has two hinges in the backbone: φ (phi) and ψ (psi). Not every combination is possible, because atoms would bump into each other. Each dot is one building block.' },
  ruleP: { nl: 'Zo rekent de app: een brug telt volgens de DSSP-regel. Het H-atoom wordt 1,0 Å van N gezet, en de elektrische aantrekking tussen N–H en C=O wordt berekend; sterker dan −0,5 kcal/mol = brug. Helix = twee bruggen na elkaar van i naar i+4; blad = minstens twee bruggen op een rij tussen twee strengen. Vereenvoudigd: geen 3₁₀- of π-helices en geen β-uitstulpingen; de gebieden in de grafiek zijn rechthoeken die de vorm van de echte gebieden benaderen.',
    en: 'How the app computes this: a bond counts according to the DSSP rule. The H atom is placed 1.0 Å from N and the electrical attraction between N–H and C=O is computed; stronger than −0.5 kcal/mol = bond. Helix = two consecutive bonds from i to i+4; sheet = at least two bonds in a row between two strands. Simplified: no 3₁₀ or π helices and no β bulges; the regions in the plot are rectangles that approximate the shape of the real regions.' },
  /* DNA */
  dHead: { nl: 'Wat houdt de DNA-ladder bij elkaar?', en: 'What holds the DNA ladder together?' },
  dP: { nl: 'Een A tegenover een T houdt vast met 2 waterstofbruggen, een G tegenover een C met 3. Je browser meet nu elke brug in de echte structuur (1 Å = 0,1 nm).', en: 'An A opposite a T holds on with 2 hydrogen bonds, a G opposite a C with 3. Your browser now measures every bond in the real structure (1 Å = 0.1 nm).' },
  dSum: { nl: 'waterstofbruggen gemeten', en: 'hydrogen bonds measured' },
  dMean: { nl: 'gemiddelde lengte', en: 'mean length' },
  dRange: { nl: 'kortste – langste', en: 'shortest – longest' },
  pairs: { nl: 'basenparen', en: 'base pairs' }, pair: { nl: 'paar', en: 'pair' }, bonds: { nl: 'bruggen', en: 'bonds' },
  dHint: { nl: 'Klik op een paar in de lijst of op een base in 3D; de afstanden verschijnen bij het gekozen paar.', en: 'Click a pair in the list or a base in 3D; the distances appear for the chosen pair.' },
  prev: { nl: 'Vorig paar', en: 'Previous pair' }, next: { nl: 'Volgend paar', en: 'Next pair' },
  ruleD: { nl: 'Zo rekent de app: twee basen op verschillende strengen vormen een paar als A tegenover T of G tegenover C ligt en het N1-atoom van de grote base minder dan 3,4 Å van het N3-atoom van de kleine base ligt. Daarna meet de app elke Watson-Crick-brug (A–T: N6–O4, N1–N3; G–C: O6–N4, N1–N3, N2–O2).',
    en: 'How the app computes this: two bases on different strands form a pair if A is opposite T or G opposite C and the N1 atom of the larger base lies less than 3.4 Å from the N3 atom of the smaller base. The app then measures every Watson-Crick bond (A–T: N6–O4, N1–N3; G–C: O6–N4, N1–N3, N2–O2).' },
};
const t = k => L(T[k]) ?? k;
const fmt = s => String(s).replace(/(\d)\.(\d)/g, lang === 'nl' ? '$1,$2' : '$1.$2').replace(/^-/, '−');
const f1 = x => fmt(x.toFixed(1)), f2 = x => fmt(x.toFixed(2));
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const SRC = {
  mol3d: { t: 'Rego & Koes (2015) 3Dmol.js. Bioinformatics 31:1322', url: 'https://doi.org/10.1093/bioinformatics/btu829' },
  kabsch: { t: 'Kabsch & Sander (1983) DSSP. Biopolymers 22:2577', url: 'https://doi.org/10.1002/bip.360221211' },
  lovell: { t: 'Lovell et al. (2003) Ramachandran-gebieden. Proteins 50:437', tEn: 'Lovell et al. (2003) Ramachandran regions. Proteins 50:437', url: 'https://doi.org/10.1002/prot.10286' },
  rama: { t: 'Ramachandran et al. (1963) J Mol Biol 7:95', url: 'https://doi.org/10.1016/S0022-2836(63)80023-6' },
  wc: { t: 'Watson & Crick (1953) Nature 171:737', url: 'https://doi.org/10.1038/171737a0' },
  alb: { t: 'Alberts et al., MBoC 4e: The Structure and Function of DNA (NCBI)', url: 'https://www.ncbi.nlm.nih.gov/books/NBK26821/' },
};

let ENTRIES = null;
const textCache = new Map(), metaCache = new Map();
const getText = code => { if (!textCache.has(code)) textCache.set(code, fetch(localPdb(code).url).then(r => { if (!r.ok) throw new Error(r.status); return r.text(); }).catch(e => { textCache.delete(code); throw e; })); return textCache.get(code); };
const getMeta = code => { if (!metaCache.has(code)) metaCache.set(code, fetch(rcsbEntryUrl(code)).then(r => r.ok ? r.json() : null).catch(() => null)); return metaCache.get(code); };

/* PDB-codes van een knoop die lokaal beschikbaar zijn */
export const localCodes = id => (NODES[id]?.pdb ?? []).filter(c => localPdb(c));

export function createReal3D({ stage, button, pause, resume }) {
  const ov = document.createElement('div');
  ov.className = 'r3d'; ov.id = 'r3d';
  ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-hidden', 'true'); ov.setAttribute('aria-labelledby', 'r3T');
  ov.innerHTML = `
    <div class="r3bar">
      <b id="r3T"></b>
      <div class="r3chips" id="r3Chips"></div>
      <div class="r3seg" id="r3Style" role="group" aria-label="${t('styleLbl')}">
        <button data-v="cartoon" aria-pressed="true">${t('cartoon')}</button><button data-v="stick" aria-pressed="false">${t('stick')}</button><button data-v="sphere" aria-pressed="false">${t('sphere')}</button>
      </div>
      <button class="r3tog" id="r3Atom" aria-pressed="false" title="${t('atomicTip')}"><i></i>${t('atomic')}</button>
      <span class="r3sp"></span>
      <a class="r3atl" id="r3Atlas"></a>
      <button class="r3x" id="r3Close" title="${t('closeTip')}">${t('close')} ✕</button>
    </div>
    <div class="r3body">
      <div class="r3view" id="r3View"></div>
      <div class="r3load" id="r3Load"></div>
      <aside class="r3side" id="r3Side" hidden></aside>
    </div>
    <div class="r3foot"><span id="r3Note"></span><span id="r3Help">${t('help')}</span><span class="r3src" id="r3Src"></span></div>`;
  stage.append(ov);
  const $ = id => ov.querySelector('#' + id);
  const view = $('r3View'), side = $('r3Side');
  button.title = t('openTip');

  let nodeId = null, codes = [], code = null, style = 'cartoon', atomic = false, mode = 'prot', isOpen = false, wasPlaying = false, token = 0;
  let v = null, atoms = [], info = null, prot = null, sel = null, dsel = 1, mol = null, lastFocus = null;

  /* ---------- kleuren ---------- */
  function molColors() {
    const chainIdx = new Map(), protChains = new Set(), nuc = new Set(), rnaRes = new Set();
    for (const a of atoms) {
      if (!chainIdx.has(a.chain)) chainIdx.set(a.chain, chainIdx.size);
      if (a.atom === "C4'") nuc.add(a.chain + '|' + a.resi);
      if (a.atom === "O2'") rnaRes.add(a.chain + '|' + a.resi);
      if (a.atom === 'CA' && !a.hetflag) protChains.add(a.chain);
    }
    const one = protChains.size === 1, rng = { lo: Infinity, hi: -Infinity };
    if (one) for (const a of atoms) if (a.atom === 'CA' && !a.hetflag) { rng.lo = Math.min(rng.lo, a.resi); rng.hi = Math.max(rng.hi, a.resi); }
    const pc = [...protChains];
    const rnaCol = nodeId === 'trna' ? '#ffc247' : '#ff8a3d';
    mol = a => {
      const k = a.chain + '|' + a.resi;
      if (nuc.has(k)) return rnaRes.has(k) ? rnaCol : (chainIdx.get(a.chain) % 2 ? '#9cc0ff' : '#4f8ff7');
      if (one && protChains.has(a.chain)) { const u = (a.resi - rng.lo) / Math.max(1, rng.hi - rng.lo); return hsl(240 - 240 * u, .75, .62); }
      return PAL[Math.max(0, pc.indexOf(a.chain)) % PAL.length];
    };
  }
  const elemCol = a => (a.elem === 'C' ? mol(a) : ELEM[a.elem?.toUpperCase()] ?? '#c9d2e4');
  const NOT_WATER = { not: { resn: WATER_IONS } };

  /* ---------- weergave ---------- */
  function baseStyle() {
    v.setStyle({}, {});
    if (info?.coarse) v.setStyle(NOT_WATER, { sphere: { radius: 1.9, colorfunc: mol } });   // ingekorte kopie: één bolletje per bouwsteen
    else if (style === 'cartoon') {
      v.setStyle(NOT_WATER, { cartoon: { colorfunc: mol } });
      v.addStyle({ hetflag: true, not: { resn: WATER_IONS } }, { stick: { radius: .16, colorfunc: elemCol } });
    } else if (style === 'stick') v.setStyle(NOT_WATER, { stick: { radius: .16, colorfunc: elemCol } });
    else v.setStyle(NOT_WATER, { sphere: { scale: .9, colorfunc: elemCol } });
    v.setStyle({ resn: WATER_IONS }, {});
  }
  function render() {
    if (!v) return;
    v.removeAllLabels(); v.removeAllShapes(); v.setClickable({}, false, () => {});
    if (!atomic) baseStyle();
    else if (mode === 'prot') protStyle();
    else dnaStyle();
    v.render();
  }

  /* ---------- eiwit op atoomniveau ---------- */
  const ssOf = new Map();
  function protStyle() {
    const c = prot.chain, ss = a => SS[ssOf.get(a.resi) ?? 'other'];
    v.setStyle({}, {});
    v.setStyle({ not: { or: [{ chain: c }, { resn: WATER_IONS }] } }, { cartoon: { color: '#3a4560' } });
    v.setStyle({ chain: c, hetflag: false }, { cartoon: { colorfunc: ss, opacity: .85 } });
    v.addStyle({ chain: c, hetflag: false, atom: ['N', 'CA', 'C', 'O'] }, { stick: { radius: .1, colorfunc: ss } });
    for (const h of prot.hb) v.addCylinder({ start: xyz(h.o), end: xyz(h.n), radius: .07, color: HB, dashed: true, dashLength: .25, gapLength: .18, fromCap: 1, toCap: 1 });
    const s = sel != null ? prot.res[sel] : null;
    if (s) {
      v.addStyle({ chain: c, resi: s.resi }, { stick: { radius: .22, colorscheme: 'whiteCarbon' } });
      v.addLabel(`${s.resn} ${s.resi}`, { position: xyz(s.at.CA), backgroundColor: '#0a1224', backgroundOpacity: .85, fontColor: '#ffffff', fontSize: 15, borderColor: HB, borderThickness: 1, inFront: true });
    }
    v.setClickable({ chain: c, hetflag: false }, true, a => { const i = prot.res.findIndex(r => r.resi === a.resi); if (i >= 0) pickRes(i); });
  }
  function pickRes(i) { sel = i; render(); protPanel(); }

  function rama() {
    const S = 300, m = 44, X = f => m + (f + 180) / 360 * S, Y = p => 10 + (180 - p) / 360 * S;
    const rect = ([a, b, c, d], fill) => `<rect x="${X(a)}" y="${Y(d)}" width="${X(b) - X(a)}" height="${Y(c) - Y(d)}" fill="${fill}" rx="3"/>`;
    let s = `<svg viewBox="0 0 ${S + m + 10} ${S + 52}" font-family="Inter" role="img" aria-label="Ramachandran">`;
    s += `<rect x="${m}" y="10" width="${S}" height="${S}" fill="#070b16" stroke="rgba(160,180,220,.3)"/>`;
    s += ALLOW.map(r => rect(r, 'rgba(124,196,255,.12)')).join('') + FAV.map(r => rect(r, 'rgba(124,196,255,.30)')).join('');
    for (const q of [-180, -90, 0, 90, 180]) {
      s += `<line x1="${X(q)}" y1="10" x2="${X(q)}" y2="${10 + S}" stroke="rgba(160,180,220,.12)"/><line x1="${m}" y1="${Y(q)}" x2="${m + S}" y2="${Y(q)}" stroke="rgba(160,180,220,.12)"/>`;
      s += `<text x="${X(q)}" y="${S + 28}" font-size="13" fill="#93a0bb" text-anchor="middle">${q}</text><text x="${m - 6}" y="${Y(q) + 4}" font-size="13" fill="#93a0bb" text-anchor="end">${q}</text>`;
    }
    s += `<text x="${m + S / 2}" y="${S + 47}" font-size="15" fill="#e8edf7" text-anchor="middle">φ (°)</text><text x="13" y="${10 + S / 2}" font-size="15" fill="#e8edf7" text-anchor="middle">ψ</text>`;
    s += `<text x="${X(-112)}" y="${Y(160)}" font-size="15" fill="#e8edf7" text-anchor="middle">β</text><text x="${X(-100)}" y="${Y(-38) + 5}" font-size="15" fill="#e8edf7" text-anchor="middle">α</text><text x="${X(68)}" y="${Y(45) + 5}" font-size="15" fill="#e8edf7" text-anchor="middle">Lα</text>`;
    const dot = (r, i, on) => {
      const x = X(r.phi).toFixed(1), y = Y(r.psi).toFixed(1), st = on ? `stroke="#fff" stroke-width="2.5"` : `stroke="#070b16" stroke-width="1"`;
      const tip = `<title>${r.resn} ${r.resi}</title>`;
      if (r.kind === 'gly') { const k = on ? 8 : 5.5; return `<path class="pt" data-i="${i}" d="M${x},${(+y - k).toFixed(1)} l${k},${k} l${-k},${k} l${-k},${-k} z" fill="none" stroke="${GLY}" stroke-width="${on ? 3 : 2}">${tip}</path>`; }
      if (r.kind === 'pro') { const k = on ? 7 : 4.5; return `<rect class="pt" data-i="${i}" x="${(+x - k).toFixed(1)}" y="${(+y - k).toFixed(1)}" width="${2 * k}" height="${2 * k}" fill="${SS[r.ss]}" ${st}>${tip}</rect>`; }
      return `<circle class="pt" data-i="${i}" cx="${x}" cy="${y}" r="${on ? 8 : 4.5}" fill="${SS[r.ss]}" ${st}>${tip}</circle>`;
    };
    prot.res.forEach((r, i) => { if (r.phi != null && r.psi != null && i !== sel) s += dot(r, i, false); });
    if (sel != null && prot.res[sel]?.phi != null && prot.res[sel]?.psi != null) s += dot(prot.res[sel], sel, true);
    return s + '</svg>';
  }
  function protPanel() {
    const P = prot, s = sel != null ? P.res[sel] : null;
    const pct = P.nJudged ? 100 * P.nFav / P.nJudged : 0;
    const where = r => r.kind === 'gly' ? t('isGly') : r.kind === 'pro' ? t('isPro') : r.reg ? t(r.reg === 'fav' ? 'inFav' : r.reg === 'allow' ? 'inAllow' : 'inOut') : '';
    const partners = s ? [...new Set(s.partners)].sort((a, b) => a - b).map(i => `${P.res[i].resn} ${P.res[i].resi}`) : [];
    side.classList.add('two');
    side.innerHTML = `<div class="r3colA">` + modeSeg() + `<h3>${t('pHead')}</h3>
      <div class="r3leg">${['helix', 'sheet', 'other'].map(k => `<span><i style="background:${SS[k]}"></i>${t(k)}</span>`).join('')}<span><i class="hb"></i>${t('hbLeg')}</span></div>
      <div class="r3big">
        <div><b>${P.hb.length}</b><span>${t('nHb')} <sup>[K&S]</sup></span></div>
        <div><b>${f1(pct)}%</b><span>${P.nFav}/${P.nJudged} ${t('nFav')} <sup>[L]</sup></span></div>
        <div class="w"><b>${P.ss.helix} · ${P.ss.sheet} · ${P.ss.other}</b><span>${t('nSS')}</span></div>
      </div>
      <div class="r3muted">${t('counted')} (${lang === 'nl' ? 'niet geteld' : 'not counted'}: ${P.nGly} glycine, ${P.nPro} proline). ${P.multi ? `${t('chainOnly')} ${esc(P.chain)}.` : ''}</div>
      ${s ? `<div class="r3sel"><b>${s.resn} ${s.resi}</b> · <span style="color:${SS[s.ss]}">${t(s.ss)}</span><br>φ = ${s.phi == null ? '—' : f1(s.phi) + '°'} · ψ = ${s.psi == null ? '—' : f1(s.psi) + '°'}<br><span class="r3muted">${where(s)}</span><br>
          <span class="r3muted">${t('partners')}: ${partners.length ? partners.join(', ') : '—'}</span></div>` : `<div class="r3sel r3muted">${t('hint')}</div>`}
      <details class="r3more"><summary>${t('more')}</summary><p>${t('phipsi')} <sup>[R]</sup></p><div class="r3rule">${t('ruleP')}</div></details></div>
      <div class="r3rama"><div class="r3sub">${t('ramaH')}</div>${rama()}
        <div class="r3leg"><span><i style="background:rgba(124,196,255,.45)"></i>${t('fav')}</span><span><i style="background:rgba(124,196,255,.18)"></i>${t('allow')}</span><span><i class="gly"></i>${t('glyLeg')}</span><span><i class="pro"></i>${t('proLeg')}</span></div></div>`;
    side.querySelectorAll('.pt').forEach(c => c.addEventListener('click', () => pickRes(+c.dataset.i)));
    wireModeSeg();
  }

  /* ---------- DNA op atoomniveau ---------- */
  function dnaStyle() {
    const pairs = info.pairs, p = pairs[dsel - 1];
    v.setStyle({}, {});
    v.setStyle({ hetflag: false, not: { resn: WATER_IONS } }, { stick: { radius: .13, colorfunc: a => a.elem === 'C' || a.elem === 'N' || a.elem === 'O' ? mol(a) : elemCol(a) } });
    for (const q of pairs) for (const b of q.bonds) if (b.a && b.b) v.addCylinder({ start: xyz(b.a), end: xyz(b.b), radius: q === p ? .11 : .08, color: q.type === 'AT' ? AT : GC, dashed: true, dashLength: .22, gapLength: .16, fromCap: 1, toCap: 1 });
    if (p) {
      for (const r of [p.s1, p.s2]) v.addStyle({ chain: r.chain, resi: r.resi }, { stick: { radius: .22, colorscheme: 'whiteCarbon' } });
      for (const b of p.bonds) if (b.a && b.b) v.addLabel(f2(b.d) + ' Å', { position: { x: (b.a.x + b.b.x) / 2, y: (b.a.y + b.b.y) / 2, z: (b.a.z + b.b.z) / 2 }, backgroundColor: '#0a1224', backgroundOpacity: .85, fontColor: p.type === 'AT' ? AT : GC, fontSize: 14, inFront: true, alignment: 'center' });
    }
    v.setClickable({ hetflag: false }, true, a => { const k = info.pairs.findIndex(q => [q.s1, q.s2].some(r => r.chain === a.chain && r.resi === a.resi)); if (k >= 0) pickPair(k + 1); });
  }
  function pickPair(k) { dsel = Math.max(1, Math.min(info.pairs.length, k)); render(); dnaPanel(); }
  function dnaPanel() {
    const pairs = info.pairs, all = pairs.flatMap(p => p.bonds).filter(b => isFinite(b.d)), ds = all.map(b => b.d);
    const mean = ds.reduce((s, x) => s + x, 0) / ds.length, nAT = pairs.filter(p => p.type === 'AT').length, nGC = pairs.length - nAT, p = pairs[dsel - 1];
    side.classList.add('two');
    side.innerHTML = `<div class="r3colA">` + modeSeg() + `<h3>${t('dHead')}</h3><p>${t('dP')} <sup>[WC]</sup> <sup>[A]</sup></p>
      <div class="r3big">
        <div><b>${all.length}</b><span>${t('dSum')} · ${pairs.length} ${t('pairs')} (${nAT}×2 + ${nGC}×3)</span></div>
        <div><b>${f2(mean)} Å</b><span>${t('dMean')} · ${t('dRange')} ${f2(Math.min(...ds))}–${f2(Math.max(...ds))} Å</span></div>
      </div>
      <div class="r3sel r3pair"><button class="r3step" id="r3Prev" title="${t('prev')}" aria-label="${t('prev')}">‹</button>
        <div><b class="${p.type === 'AT' ? 'at' : 'gc'}">${t('pair')} ${p.k}: ${p.name}</b><br>${p.bonds.map(b => `${b.lbl} <b>${isFinite(b.d) ? f2(b.d) + ' Å' : '—'}</b>`).join(' · ')}</div>
        <button class="r3step" id="r3Next" title="${t('next')}" aria-label="${t('next')}">›</button></div>
      <div class="r3muted">${t('dHint')}</div><div class="r3rule">${t('ruleD')}</div></div>
      <div class="r3colB"><table class="r3tab"><thead><tr><th>${t('pair')}</th><th>${lang === 'nl' ? 'basen' : 'bases'}</th><th>${t('bonds')}</th></tr></thead><tbody>
        ${pairs.map(q => `<tr data-k="${q.k}" class="${q.k === dsel ? 'on' : ''}" tabindex="0"><td>${q.k}</td><td class="${q.type === 'AT' ? 'at' : 'gc'}"><b>${q.name}</b></td><td>${q.bonds.filter(b => isFinite(b.d)).length}</td></tr>`).join('')}
      </tbody></table></div>`;
    $('r3Prev').onclick = () => pickPair(dsel - 1); $('r3Next').onclick = () => pickPair(dsel + 1);
    side.querySelectorAll('tbody tr').forEach(tr => { tr.onclick = () => pickPair(+tr.dataset.k); tr.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pickPair(+tr.dataset.k); } }; });
    side.querySelector('tr.on')?.scrollIntoView({ block: 'nearest' });
    wireModeSeg();
  }

  /* eiwit én DNA in dezelfde structuur → kleine keuzeknop */
  const modeSeg = () => prot && info.pairs ? `<div class="r3seg small" id="r3Mode"><button data-v="prot" aria-pressed="${mode === 'prot'}">${t('modeProt')}</button><button data-v="dna" aria-pressed="${mode === 'dna'}">${t('modeDna')}</button></div>` : '';
  function wireModeSeg() { side.querySelectorAll('#r3Mode button').forEach(b => b.onclick = () => { mode = b.dataset.v; render(); panel(); }); }
  const panel = () => (mode === 'prot' ? protPanel() : dnaPanel());

  /* ---------- atoomniveau aan/uit ---------- */
  function atomReason() {
    if (!info) return '';
    if (info.prot || info.pairs) return '';
    if (info.coarse) return t('noCoarse');
    if (info.protTooBig) return t('noBig');
    if (info.nRna > 0) return t('noRna');
    return t('noOther');
  }
  function syncAtomBtn() {
    const why = atomReason(), b = $('r3Atom');
    b.setAttribute('aria-disabled', String(!!why));
    b.title = why || t('atomicTip');
    b.setAttribute('aria-pressed', String(atomic));
    $('r3Style').hidden = atomic || !!info?.coarse;
    $('r3Note').textContent = info?.coarse ? t('coarse') : '';
  }
  function setAtomic(on) {
    const why = atomReason();
    if (on && why) { $('r3Note').textContent = why; return; }
    atomic = on;
    side.hidden = !on;
    if (on) panel(); else side.innerHTML = '';
    syncAtomBtn(); sources();
    requestAnimationFrame(() => { v?.resize(); render(); });
  }

  /* ---------- bronnen in de voetregel ---------- */
  async function sources() {
    const my = token, list = [];
    const meta = await getMeta(code);
    if (my !== token) return;
    const c = meta?.rcsb_primary_citation, au = c?.rcsb_authors ?? [];
    const who = au.length ? `${au[0].split(',')[0]}${au.length > 2 ? ' et al.' : au.length === 2 ? ' & ' + au[1].split(',')[0] : ''}` : '';
    list.push({ t: `PDB ${code}${who ? ` — ${who}${c.year ? ` (${c.year})` : ''}${c.journal_abbrev ? ` ${c.journal_abbrev}` : ''}` : ''}`, title: c?.title ?? meta?.struct?.title ?? '', url: c?.pdbx_database_id_DOI ? `https://doi.org/${c.pdbx_database_id_DOI}` : `https://www.rcsb.org/structure/${code}` });
    list.push(SRC.mol3d);
    if (atomic && mode === 'prot') list.push({ ...SRC.kabsch, k: 'K&S' }, { ...SRC.lovell, k: 'L' }, { ...SRC.rama, k: 'R' });
    if (atomic && mode === 'dna') list.push({ ...SRC.wc, k: 'WC' }, { ...SRC.alb, k: 'A' });
    $('r3Src').innerHTML = `${t('src')}: ` + list.map(s => `<a href="${s.url}" target="_blank" rel="noopener" title="${esc(s.title ?? '')}">${s.k ? `[${s.k}] ` : ''}${esc(lang === 'en' && s.tEn ? s.tEn : s.t)}</a>`).join(' · ');
  }

  /* ---------- structuur laden ---------- */
  async function load(c) {
    code = c; const my = ++token;
    $('r3T').textContent = `${title(NODES[nodeId])} · PDB ${c}`;
    $('r3Chips').innerHTML = codes.length > 1 ? codes.map(x => `<button data-c="${x}" aria-pressed="${x === c}">${x}</button>`).join('') : '';
    $('r3Chips').querySelectorAll('button').forEach(b => b.onclick = () => { if (b.dataset.c !== code) load(b.dataset.c); });
    atlasLink(c);
    $('r3Load').textContent = t('loading'); $('r3Load').hidden = false; $('r3Note').textContent = '';
    sources();
    try {
      const [M, txt] = await Promise.all([load3Dmol(), getText(c)]);
      if (my !== token) return;
      /* nieuwe viewer per structuur: verse camera, niets van de vorige blijft hangen */
      dispose();
      v = M.createViewer(view, { backgroundColor: BG, antialias: true });
      const model = v.addModel(txt, localPdb(c).fmt);
      atoms = model.selectedAtoms({});
      /* langste as liggend in het brede venster (starre draaiing), behalve als de lokale kopie al bewust gedraaid is */
      if (!/star gedraaid|starre draaiing/i.test(txt.slice(0, 3000))) applyFrame(atoms, principalFrame(atoms.filter(a => !WATER_IONS.includes(a.resn))));
      info = inspect(atoms);
      prot = info.prot ? analyseProtein(info.prot) : null;
      if (prot) { prot.multi = new Set(atoms.filter(a => a.atom === 'CA' && !a.hetflag).map(a => a.chain)).size > 1; ssOf.clear(); for (const r of prot.res) ssOf.set(r.resi, r.ss); }
      mode = info.pairs && (!prot || NODES[nodeId]?.stage === 'genome') ? 'dna' : 'prot';
      sel = null; dsel = info.pairs ? Math.min(info.pairs.length, Math.ceil(info.pairs.length / 3)) : 1;
      molColors();
      if (atomic && atomReason()) atomic = false;
      side.hidden = !atomic;
      if (atomic) panel();
      syncAtomBtn();
      render();
      v.zoomTo(NOT_WATER); v.zoom(info.prot && !info.pairs ? 1.45 : 1.2); v.render();
      $('r3Load').hidden = true;
      sources();
      if (window.__r3dTest) window.__r3dTest = { info, prot, code, v };          // alleen voor tests
    } catch (e) {
      if (my !== token) return;
      console.warn('[real3d]', e); $('r3Load').textContent = t('loadErr');
    }
  }
  async function atlasLink(c) {
    const a = $('r3Atlas');
    a.textContent = t('atlas');
    const base = new URL('../atlas/index.html', import.meta.url);
    base.searchParams.set('pdb', c); base.searchParams.set('lang', lang); base.searchParams.set('from', nodeId);
    a.href = base.href;
    try {
      ENTRIES ??= (await import('../atlas/entries.js')).ENTRIES;
      const hits = ENTRIES.filter(x => x.pdb === c);
      const e = hits.find(x => x.scenes?.includes(nodeId)) ?? hits.find(x => x.id === nodeId) ?? hits[0];
      if (e && code === c) { const u = new URL('../atlas/index.html', import.meta.url); u.searchParams.set('id', e.id); u.searchParams.set('lang', lang); u.searchParams.set('from', nodeId); a.href = u.href; }
    } catch {}
  }
  function dispose() {
    if (!v) return;
    try { v.clear(); } catch {}
    view.innerHTML = ''; v = null;
  }

  /* ---------- openen / sluiten ---------- */
  function open(c) {
    if (!codes.length) return;
    if (!isOpen) {
      isOpen = true; lastFocus = document.activeElement;
      wasPlaying = pause();
      ov.setAttribute('aria-hidden', 'false');
      ov.classList.add('open');                                // zichtbaar (fade via CSS), dan pas de focus erin
      requestAnimationFrame(() => $('r3Close').focus({ preventScroll: true }));
    }
    load(c ?? (codes.includes(code) ? code : codes[0]));
  }
  function close() {
    if (!isOpen) return;
    isOpen = false; token++;
    ov.classList.remove('open'); ov.setAttribute('aria-hidden', 'true');
    setTimeout(() => { if (!isOpen) dispose(); }, 400);       // na de fade de WebGL-viewer vrijgeven
    if (wasPlaying) resume();
    const back = lastFocus && lastFocus !== document.body && document.contains(lastFocus) && !lastFocus.hidden ? lastFocus : button;
    if (!button.hidden || back !== button) back.focus?.({ preventScroll: true });
  }

  /* bediening */
  button.addEventListener('click', () => open());
  $('r3Close').onclick = close;
  $('r3Atom').onclick = () => setAtomic(!atomic);
  $('r3Style').querySelectorAll('button').forEach(b => b.onclick = () => {
    style = b.dataset.v;
    $('r3Style').querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    render();
  });
  ov.addEventListener('keydown', e => {
    if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); return; }
    if (e.key !== 'Tab') return;
    const f = [...ov.querySelectorAll('button, a[href], [tabindex="0"]')].filter(x => !x.hidden && x.offsetParent !== null);
    if (!f.length) return;
    const i = f.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
  });
  new ResizeObserver(() => v?.resize()).observe(view);
  addEventListener('resize', () => v?.resize());

  return {
    /* bij elke scènewissel: knop tonen als de knoop een lokale PDB heeft en de scène zelf 2D is */
    sync(id, is3d) {
      if (id !== nodeId) { if (isOpen) close(); code = null; atomic = false; side.hidden = true; nodeId = id; }
      codes = localCodes(id);
      button.hidden = !(codes.length && !is3d);
    },
    open, close,
    isOpen: () => isOpen,
  };
}
const xyz = a => ({ x: a.x, y: a.y, z: a.z });
/* 3Dmol kent geen hsl()-tekst in colorfunc → zelf omzetten naar #rrggbb (regenboog van N- naar C-uiteinde) */
function hsl(h, s, l) {
  const f = n => { const k = (n + h / 30) % 12, c = l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k - 3, 9 - k, 1)); return Math.round(255 * c).toString(16).padStart(2, '0'); };
  return `#${f(0)}${f(8)}${f(4)}`;
}
