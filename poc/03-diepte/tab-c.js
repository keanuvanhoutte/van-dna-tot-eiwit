/* C · Mens ⇄ bacterie: één deterministische SVG-animatie "van gen tot eiwit".
 * Het beeld is een pure functie draw(p, s): p = fase in de cyclus (0..1), s = schakelaar (0 = mens, 1 = bacterie).
 * requestAnimationFrame levert alleen de tijd; geen setTimeout. Wisselen morpht in 0,8 s: celvorm, DNA-positie,
 * en beide moleculaire lagen hangen via één affiene afbeelding aan het DNA, zodat niets "loskomt". */
import { L } from '../../shared/i18n.js';
import { $, t, sources } from './common.js';

const T = 14000, MORPH = 800;
const C = { dna: '#4f8ff7', dna2: '#9cc0ff', rna: '#ff8a3d', rib: '#2cc6a8', rib2: '#7fe0cc', pol: '#9b7bff', cap: '#f06bc0', intron: '#8a93a8', mem: '#c9a574', bact: '#d65a5a', env: '#8a93a8', text: '#e8edf7', muted: '#93a0bb' };
const PROT = ['#7fdc6a', '#9b7bff', '#ffc247'];

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, x) => a + (b - a) * x;
const ss = (a, b, x) => { const u = clamp((x - a) / (b - a)); return u * u * (3 - 2 * u); };
const win = (a, b, c, d, x) => ss(a, b, x) * (1 - ss(c, d, x));       /* zichtbaar tussen b en c, zachte randen */
const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
const mixC = (a, b, x) => { const A = hex(a), B = hex(b); return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], x))).join(',')})`; };
const n1 = x => x.toFixed(1);

/* teksten in de animatie (groot en weinig) */
const TX = {
  h: [[0, .24, { nl: '1 · In de kern schrijft RNA-polymerase het gen over', en: '1 · In the nucleus RNA polymerase copies the gene' }],
      [.24, .40, { nl: '2 · Introns eruit, kap en poly-A-staart erbij', en: '2 · Introns out, cap and poly-A tail added' }],
      [.40, .62, { nl: '3 · Het rijpe mRNA gaat door een kernporie naar buiten', en: '3 · The mature mRNA leaves through a nuclear pore' }],
      [.62, 1.01, { nl: '4 · Ribosomen in het cytoplasma maken het eiwit', en: '4 · Ribosomes in the cytoplasm make the protein' }]],
  b: [[0, .15, { nl: '1 · Geen kern: RNA-polymerase schrijft het operon over', en: '1 · No nucleus: RNA polymerase copies the operon' }],
      [.15, .66, { nl: '2 · Ribosomen beginnen al terwijl het mRNA nog groeit', en: '2 · Ribosomes start while the mRNA is still growing' }],
      [.66, 1.01, { nl: '3 · Eén mRNA met drie genen → drie eiwitten', en: '3 · One mRNA with three genes → three proteins' }]],
  nucleus: { nl: 'celkern', en: 'nucleus' }, pore: { nl: 'kernporie', en: 'nuclear pore' }, pre: { nl: 'pre-mRNA', en: 'pre-mRNA' },
  intron: { nl: 'introns eruit', en: 'introns out' }, cap: { nl: '5′-kap', en: '5′ cap' }, tail: { nl: 'poly-A-staart', en: 'poly-A tail' },
  rib: { nl: 'ribosoom', en: 'ribosome' }, prot: { nl: 'eiwit', en: 'protein' }, cyto: { nl: 'cytoplasma', en: 'cytoplasm' },
  nucleoid: { nl: 'nucleoïde: DNA los in het cytoplasma', en: 'nucleoid: DNA loose in the cytoplasm' },
  gene: { nl: 'gen', en: 'gene' }, exon: { nl: 'exon', en: 'exon' },
  coupled: { nl: 'ribosomen op een mRNA dat nog gemaakt wordt', en: 'ribosomes on an mRNA still being made' },
  none: { nl: 'geen kern · geen splicing · geen kap of staart', en: 'no nucleus · no splicing · no cap or tail' },
};
const lbl = (x, y, s, a, o = {}) => a < .01 ? '' : `<text x="${n1(x)}" y="${n1(y)}" font-size="${o.size ?? 28}" font-weight="${o.w ?? 500}" fill="${o.fill ?? C.text}" text-anchor="${o.anchor ?? 'middle'}" opacity="${a.toFixed(3)}" paint-order="stroke" stroke="#0d1426" stroke-width="6">${s}</text>`;

/* ---------- vormpjes ---------- */
const strands = (x0, x1, y) => `<line x1="${x0}" y1="${y - 6}" x2="${x1}" y2="${y - 6}" stroke="${C.dna}" stroke-width="7" stroke-linecap="round"/><line x1="${x0}" y1="${y + 6}" x2="${x1}" y2="${y + 6}" stroke="${C.dna2}" stroke-width="7" stroke-linecap="round"/>`;
const pol = (x, y, a) => a < .01 ? '' : `<ellipse cx="${n1(x)}" cy="${y}" rx="36" ry="27" fill="${C.pol}" opacity="${(.92 * a).toFixed(3)}"/>`;
function ribosome(x, y, a, up) {      /* up: grote eenheid boven het mRNA (mens) of eronder (bacterie) */
  if (a < .01) return '';
  const big = up ? y - 20 : y + 22, small = up ? y + 13 : y - 12;
  return `<g opacity="${a.toFixed(3)}"><ellipse cx="${n1(x)}" cy="${big}" rx="32" ry="21" fill="${C.rib}"/><ellipse cx="${n1(x)}" cy="${small}" rx="25" ry="12" fill="${C.rib2}"/></g>`;
}
function chain(x, y, n, dir, col, a) {   /* groeiende eiwitketen: kraaltjes die van het ribosoom weg kronkelen */
  if (a < .01 || n < 1) return '';
  let s = '';
  for (let m = 0; m < n; m++) s += `<circle cx="${n1(x + 11 * Math.sin(m * .9) + m * 2.5)}" cy="${n1(y + dir * m * 12)}" r="6.5" fill="${col}"/>`;
  return `<g opacity="${a.toFixed(3)}">${s}</g>`;
}
function zigzag(x, y, len) { if (len < 2) return ''; let d = `M${n1(x)},${y}`; for (let i = 1; i <= Math.ceil(len / 8); i++) d += ` L${n1(x - Math.min(len, i * 8))},${y + (i % 2 ? -6 : 6)}`; return `<path d="${d}" fill="none" stroke="${C.cap}" stroke-width="5" stroke-linejoin="round"/>`; }

/* ---------- mens (coördinaten bij s = 0) ---------- */
const HD = { x0: 200, x1: 740, y: 420 };
const H_SEG = [['e', 0, 100], ['i', 100, 190], ['e', 190, 290], ['i', 290, 360], ['e', 360, 440]];   /* u = afstand vanaf 5′ (x = 700 − u) */
function human(p, fl) {
  let s = '', labels = [];
  /* kern met dubbele envelop en een porie op 0° */
  const cx = 470, cy = 490, gap = 4.2 * Math.PI / 180;
  const arc = r => `M${n1(cx + r * Math.cos(gap))},${n1(cy - r * Math.sin(gap))} A${r},${r} 0 1 0 ${n1(cx + r * Math.cos(gap))},${n1(cy + r * Math.sin(gap))}`;
  s += `<circle cx="${cx}" cy="${cy}" r="300" fill="rgba(138,147,168,.09)"/><path d="${arc(300)}" fill="none" stroke="${C.env}" stroke-width="5"/><path d="${arc(286)}" fill="none" stroke="${C.env}" stroke-width="4"/>`;
  s += `<rect x="780" y="458" width="18" height="12" rx="4" fill="${C.env}"/><rect x="780" y="510" width="18" height="12" rx="4" fill="${C.env}"/>`;
  labels.push([470, 248, L(TX.nucleus), 1, { w: 600 }]);
  labels.push([805, 598, L(TX.pore), win(.38, .42, .6, .64, p), { anchor: 'start' }]);
  /* gen: exons (oranje) en introns (grijs) op het DNA */
  s += strands(HD.x0, HD.x1, HD.y);
  for (const [k, a, b] of H_SEG) s += `<rect x="${700 - b}" y="404" width="${b - a}" height="32" rx="5" fill="${k === 'e' ? C.rna : C.intron}" opacity=".45"/>`;
  labels.push([650, 390, L(TX.exon), win(0, .02, .2, .24, p), { size: 24, fill: C.rna }]);
  labels.push([555, 390, 'intron', win(0, .02, .2, .24, p), { size: 24, fill: C.muted }]);
  /* transcriptie */
  const polX = lerp(705, 255, clamp((p - .03) / .19)), uT = clamp(700 - polX, 0, 440);
  s += pol(polX, HD.y, win(.01, .03, .22, .25, p) * fl);
  /* splicing: exons schuiven aan, introns worden lussen en verdwijnen */
  const q = ss(.24, .40, p), sh = [0, 0, 90 * q, 90 * q, 160 * q];
  const qe1 = ss(.40, .47, p), qe2 = ss(.47, .60, p);
  const hx = lerp(lerp(700, 740, qe1), 1380, qe2), hy = lerp(478, 490, qe1);
  const L5 = 440 - 160 * q;
  let rna = '';
  if (p < .24) {   /* groeiend pre-mRNA, aan de polymerase vast */
    rna += `<line x1="${n1(polX)}" y1="446" x2="${n1(polX)}" y2="${hy}" stroke="${C.rna}" stroke-width="6"/>`;
    for (const [k, a, b] of H_SEG) if (uT > a) rna += `<line x1="${n1(hx - a)}" y1="${hy}" x2="${n1(hx - Math.min(b, uT))}" y2="${hy}" stroke="${k === 'e' ? C.rna : C.intron}" stroke-width="7" stroke-linecap="round"/>`;
    labels.push([480, 540, L(TX.pre), win(.08, .11, .21, .24, p) * fl, { fill: C.rna }]);
  } else {
    H_SEG.forEach(([k, a, b], i) => {
      if (k === 'e') rna += `<line x1="${n1(hx - a + sh[i])}" y1="${n1(hy)}" x2="${n1(hx - b + sh[i])}" y2="${n1(hy)}" stroke="${C.rna}" stroke-width="7" stroke-linecap="round"/>`;
      else if (q < 1) {
        const xa = hx - a + sh[i - 1], xb = hx - b + sh[i + 1], H = 40 + 90 * q;
        rna += `<path d="M${n1(xa)},${hy} C${n1(xa)},${n1(hy + H)} ${n1(xb)},${n1(hy + H)} ${n1(xb)},${hy}" fill="none" stroke="${C.intron}" stroke-width="6" opacity="${(1 - ss(.65, 1, q)).toFixed(3)}"/>`;
      }
    });
    labels.push([480, 640, L(TX.intron), win(.25, .28, .37, .40, p), { fill: C.muted }]);
  }
  /* kap en staart */
  const capA = clamp(uT / 20);
  rna += capA > 0 ? `<circle cx="${n1(hx + 8)}" cy="${n1(hy)}" r="10" fill="${C.cap}" opacity="${capA}"/>` : '';
  rna += zigzag(hx - L5, hy, 56 * ss(.30, .40, p));
  labels.push([hx + 8, hy - 26, L(TX.cap), win(.26, .29, .5, .54, p) * fl, { fill: C.cap, size: 26 }]);
  labels.push([hx - L5 - 30, hy + 44, L(TX.tail), win(.32, .35, .5, .54, p) * fl, { fill: C.cap, size: 26 }]);
  s += `<g opacity="${fl.toFixed(3)}">${rna}</g>`;
  /* translatie in het cytoplasma */
  for (let k = 0; k < 3; k++) {
    const p0 = .62 + .08 * k, pr = clamp((p - p0) / .18), u = lerp(15, 265, pr);
    const a = win(p0 - .01, p0 + .01, p0 + .18, p0 + .21, p) * fl;
    s += chain(hx - u, hy - 44, Math.floor(pr * 13), -1, PROT[0], (p > p0 ? 1 : 0) * fl);
    s += ribosome(hx - u, hy, a, true);
  }
  labels.push([1380 - 15, 560, L(TX.rib), win(.62, .65, .9, .93, p) * fl, { fill: C.rib }]);
  labels.push([1200, 230, L(TX.prot), win(.74, .77, .93, .95, p) * fl, { fill: PROT[0] }]);
  return { s, labels };
}

/* ---------- bacterie (coördinaten bij s = 1) ---------- */
const BD = { x0: 260, x1: 1360, y: 380 };
const GENES = [[1300, 1030], [1000, 730], [700, 430]];
function bacterium(p, fl) {
  let s = '', labels = [];
  s += `<ellipse cx="810" cy="380" rx="610" ry="95" fill="rgba(79,143,247,.08)" stroke="rgba(124,196,255,.35)" stroke-width="3" stroke-dasharray="10 9"/>`;
  labels.push([810, 268, L(TX.nucleoid), 1, { w: 600 }]);
  s += strands(BD.x0, BD.x1, BD.y);
  GENES.forEach(([a, b], g) => { s += `<rect x="${b}" y="364" width="${a - b}" height="32" rx="5" fill="${PROT[g]}" opacity=".45"/>`; labels.push([(a + b) / 2, 352, `${L(TX.gene)} ${g + 1}`, 1, { size: 24, fill: PROT[g] }]); });
  const polX = lerp(1305, 425, clamp((p - .03) / .60)), uT = clamp(1300 - polX, 0, 875);
  s += pol(polX, BD.y, win(.01, .03, .63, .66, p) * fl);
  let m = '';
  if (uT > 0) m += `<line x1="${n1(polX)}" y1="406" x2="${n1(polX)}" y2="440" stroke="${C.rna}" stroke-width="6"/><line x1="1300" y1="440" x2="${n1(1300 - uT)}" y2="440" stroke="${C.rna}" stroke-width="7" stroke-linecap="round"/>`;
  /* per gen twee ribosomen, die starten zodra de polymerase voorbij de start is: gekoppelde transcriptie-translatie */
  const vPol = 875 / .60, vRib = vPol * .7;
  GENES.forEach((_, g) => {
    for (let j = 0; j < 2; j++) {
      const u0 = 300 * g + 10, pS = .03 + (u0 + 30 + 120 * j) / vPol, u = Math.min(u0 + 250, u0 + vRib * (p - pS)), pr = clamp((u - u0) / 250);
      const pE = pS + 250 / vRib;
      if (p < pS) continue;
      m += chain(1300 - u, 486, Math.floor(pr * 12), 1, PROT[g], 1);
      m += ribosome(1300 - u, 440, 1 - ss(pE, pE + .03, p), false);
    }
  });
  s += `<g opacity="${fl.toFixed(3)}">${m}</g>`;
  labels.push([810, 710, L(TX.coupled), win(.16, .2, .64, .68, p) * fl, { fill: C.rib }]);
  labels.push([810, 710, L(TX.none), win(.68, .72, .95, .98, p), { fill: C.muted }]);
  return { s, labels };
}

/* ---------- samenstellen: pure functie van (p, s) ---------- */
export function draw(p, s) {
  const fl = ss(0, .03, p) * (1 - ss(.95, 1, p));            /* moleculen faden aan het einde van de cyclus */
  const m = ss(0, 1, s), aH = 1 - ss(.15, .85, s), aB = ss(.15, .85, s), capH = 1 - ss(.3, .5, s), capB = ss(.5, .7, s);
  /* cel: rond (mens) → staafje (bacterie) */
  const R = { x: lerp(40, 90, m), y: lerp(110, 190, m), w: lerp(1520, 1420, m), h: lerp(760, 560, m), rx: lerp(200, 280, m) };
  const memC = mixC(C.mem, C.bact, m);
  let out = `<rect x="${n1(R.x)}" y="${n1(R.y)}" width="${n1(R.w)}" height="${n1(R.h)}" rx="${n1(R.rx)}" fill="rgba(201,165,116,.05)" stroke="${memC}" stroke-width="6"/>`;
  out += `<rect x="${n1(R.x + 14)}" y="${n1(R.y + 14)}" width="${n1(R.w - 28)}" height="${n1(R.h - 28)}" rx="${n1(R.rx - 14)}" fill="none" stroke="${memC}" stroke-width="3" opacity="${aB.toFixed(3)}"/>`;
  /* DNA-afbeelding: elke laag hangt aan het huidige DNA */
  const X0 = lerp(HD.x0, BD.x0, m), X1 = lerp(HD.x1, BD.x1, m), Y = lerp(HD.y, BD.y, m);
  const map = D => { const sx = (X1 - X0) / (D.x1 - D.x0); return { sx, tx: X0 - D.x0 * sx, ty: Y - D.y, f: (x, y) => [X0 + (x - D.x0) * sx, y + Y - D.y] }; };
  const layers = [[human(p, fl), map(HD), aH], [bacterium(p, fl), map(BD), aB]];
  let labels = '';
  for (const [{ s: g, labels: ls }, M, a] of layers) {
    if (a < .005) continue;
    out += `<g opacity="${a.toFixed(3)}" transform="translate(${n1(M.tx)},${n1(M.ty)}) scale(${M.sx.toFixed(4)},1)">${g}</g>`;
    for (const [x, y, txt, la, o] of ls) { const [X, Yy] = M.f(x, y); labels += lbl(X, Yy, txt, la * a, o); }
  }
  out += labels;
  out += lbl(lerp(1430, 1420, m), lerp(820, 600, m), L(TX.cyto), 1, { size: 24, fill: C.muted, anchor: 'end' });
  /* bijschrift bovenaan */
  for (const [k, a] of [['h', capH], ['b', capB]]) for (const [p0, p1, txt] of TX[k]) out += lbl(800, 70, L(txt), a * (p0 === 0 ? 1 - ss(p1 - .005, p1 + .015, p) : win(p0 - .015, p0 + .005, p1 - .005, p1 + .015, p)), { size: 36, w: 700 });
  return out;
}

/* ---------- tab ---------- */
let playing = true, phase0 = 0, tStart = 0, sFrom = 0, sTo = 0, tSw = -1e9, raf = 0, visible = false;
const sAt = now => lerp(sFrom, sTo, ss(0, 1, (now - tSw) / MORPH));
const pAt = now => playing ? (phase0 + (now - tStart) / T) % 1 : phase0;
function frame(now) {
  const p = pAt(now), s = sAt(now);
  $('cSvg').innerHTML = draw(p, s);
  if (playing) $('cTime').value = Math.round(p * 1000);
  raf = visible && (playing || now - tSw < MORPH + 50) ? requestAnimationFrame(frame) : 0;
}
const kick = () => { if (!raf && visible) raf = requestAnimationFrame(frame); };

function table(cite) {
  const R = [
    [{ nl: 'Kern', en: 'Nucleus' }, { nl: 'ja: DNA in de celkern, met poriën in de envelop', en: 'yes: DNA in the nucleus, with pores in the envelope' }, 'alb_rna', { nl: 'nee: DNA ligt in het cytoplasma (nucleoïde)', en: 'no: DNA lies in the cytoplasm (nucleoid)' }, 'cooper'],
    [{ nl: 'Introns uitknippen', en: 'Cutting out introns' }, { nl: 'ja, door het spliceosoom', en: 'yes, by the spliceosome' }, 'alb_rna', { nl: 'geen spliceosoom; zeldzame introns knippen zichzelf uit', en: 'no spliceosome; rare introns cut themselves out' }, 'edgell'],
    [{ nl: '5′-kap en poly-A-staart', en: '5′ cap and poly-A tail' }, { nl: 'ja, allebei', en: 'yes, both' }, 'alb_rna', { nl: 'geen kap zoals bij de mens (enkele RNA’s: NAD-kap)', en: 'no cap like in humans (a few RNAs: NAD cap)' }, 'cahova'],
    [{ nl: 'Genen per mRNA', en: 'Genes per mRNA' }, { nl: 'meestal één', en: 'usually one' }, 'alb_prot', { nl: 'vaak meerdere (operon)', en: 'often several (operon)' }, 'cooper'],
    [{ nl: 'Wanneer vertalen?', en: 'When is it translated?' }, { nl: 'na de export, in het cytoplasma', en: 'after export, in the cytoplasm' }, 'alb_rna', { nl: 'al terwijl het mRNA gemaakt wordt', en: 'already while the mRNA is being made' }, 'miller'],
  ];
  $('cTable').innerHTML = `<thead><tr><th></th><th>${t('cMens')}</th><th>${t('cBact')} (E. coli)</th></tr></thead><tbody>` +
    R.map(([k, h, hs, b, bs]) => `<tr><td>${L(k)}</td><td>${L(h)} ${cite(hs)}</td><td>${L(b)} ${cite(bs)}${bs === 'miller' ? ' ' + cite('webster') : ''}</td></tr>`).join('') + '</tbody>';
}

function setOrg(o, now = performance.now()) {
  sFrom = sAt(now); sTo = o === 'bact' ? 1 : 0; tSw = now;
  for (const b of $('cOrg').children) b.setAttribute('aria-pressed', String(b.dataset.v === o));
  kick();
}
function setPlay(on, now = performance.now()) {
  phase0 = pAt(now); playing = on; tStart = now;
  $('cPlay').textContent = t(on ? 'pause' : 'play');
  kick();
}

export function init() {
  const cite = sources($('srcC'), ['alb_rna', 'alb_prot', 'cooper', 'miller', 'webster', 'cahova', 'edgell']);
  table(cite);
  for (const b of $('cOrg').children) b.onclick = () => setOrg(b.dataset.v);
  $('cPlay').onclick = () => setPlay(!playing);
  $('cTime').oninput = e => { phase0 = e.target.value / 1000; tStart = performance.now(); kick(); };
  const q = new URLSearchParams(location.search);
  if (q.get('org') === 'bact') { sFrom = sTo = 1; for (const b of $('cOrg').children) b.setAttribute('aria-pressed', String(b.dataset.v === 'bact')); }
  if (q.has('t')) { phase0 = clamp(+q.get('t')); playing = false; $('cTime').value = Math.round(phase0 * 1000); }
  $('cPlay').textContent = t(playing ? 'pause' : 'play');
  tStart = performance.now();
  window.__drawC = draw;                         /* alleen voor tests: beeld bij willekeurige (p, s) */
  return { shown: () => { visible = true; tStart = performance.now(); kick(); }, hidden: () => { if (visible) { phase0 = pAt(performance.now()); visible = false; } } };
}
