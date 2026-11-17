/*
 * Privé tekenhulpjes voor de scènes van stage 'entry'.
 * Kleurafspraak (zie app/SCENES.md): roze = vreemd/viraal DNA en viruscapside,
 * geel/oker = lipidenanodeeltje en membranen, paars = eiwitten/nucleoporinen.
 * Alle functies geven SVG-strings terug en zijn deterministisch.
 */
import { C, f1 } from '../../kit.js';
import { membraanPts, eiwit, eiwitPad, tmHelix, LIPID } from '../../bio.js';

export const FIBRE = '#f3a6d3', CAPS = '#4a2440', PINK = C.tdna;
export const LIP = '#e8c27a', PEG = '#9fe3d0', CHOL = '#c5d06b';
const rad = a => a * Math.PI / 180;

/* ── adenoviruscapside ──────────────────────────────────────────────
 * Icosaëder in silhouet = zeshoek; op elke zichtbare hoek een pentonbasis met vezel + knop.
 * o: { fibre, hexons, missing:[hoekindices zonder vezel], bend, op, lytic }                */
export function capsid(R, o = {}) {
  const fl = o.fibre ?? R * .9, op = o.op ?? 1, bend = o.bend ?? 0;
  const miss = o.missing ?? [];
  const V = k => [Math.cos(rad(k * 60 + 30)) * R, Math.sin(rad(k * 60 + 30)) * R];
  let s = `<g opacity="${f1(op)}">`;
  for (let k = 0; k < 6; k++) {
    if (miss.includes(k)) continue;
    const [x, y] = V(k), n = Math.hypot(x, y), ux = x / n, uy = y / n;
    const mx = x + ux * fl * .5 - uy * bend, my = y + uy * fl * .5 + ux * bend;
    const ex = x + ux * fl - uy * bend * 1.6, ey = y + uy * fl + ux * bend * 1.6;
    s += `<path d="M${f1(x)},${f1(y)} Q${f1(mx)},${f1(my)} ${f1(ex)},${f1(ey)}" stroke="${FIBRE}" stroke-width="${f1(Math.max(2, R * .05))}" fill="none" stroke-linecap="round"/>`;
    s += `<circle cx="${f1(ex)}" cy="${f1(ey)}" r="${f1(Math.max(3, R * .1))}" fill="${FIBRE}"/>`;
  }
  s += `<polygon points="${[0, 1, 2, 3, 4, 5].map(k => V(k).map(f1).join(',')).join(' ')}" fill="${CAPS}" stroke="${PINK}" stroke-width="${f1(Math.max(2, R * .055))}" stroke-linejoin="round"/>`;
  if (o.hexons !== false) {
    const d = R * .29, lim = R * .866 - d * .58;
    let dots = '';
    for (let j = -4; j <= 4; j++) {
      const y = j * d * .866;
      for (let i = -5; i <= 5; i++) {
        const x = i * d + (j % 2 ? d / 2 : 0);
        const inside = [0, 60, 120].every(t => Math.abs(x * Math.cos(rad(t)) + y * Math.sin(rad(t))) <= lim);
        if (inside) dots += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(d * .38)}" fill="none" stroke="${PINK}" stroke-width="${f1(Math.max(1, R * .018))}" opacity=".55"/>`;
      }
    }
    s += dots;
  }
  for (let k = 0; k < 6; k++) {
    if (miss.includes(k)) continue;
    const [x, y] = V(k);
    s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(R * .14)}" fill="${PINK}" opacity=".9"/>`;
  }
  return s + '</g>';
}

/* capside dat openbreekt: k = 0 heel … 1 in drie brokstukken uit elkaar (gekartelde breuklijnen, via clipPath). id = unieke naam. */
export function capsidBreuk(R, k, id, o = {}) {
  if (k <= .01) return capsid(R, o);
  const z = R * 1.6, d = R * .5 * k, P = [[[-z, -z], [z * .15, -z], [R * .1, -R * .2], [-R * .2, R * .15], [-z, R * .05]],
    [[z * .15, -z], [z, -z], [z, R * .3], [R * .25, R * .05], [R * .1, -R * .2]],
    [[-z, R * .05], [-R * .2, R * .15], [R * .1, -R * .2], [R * .25, R * .05], [z, R * .3], [z, z], [-z, z]]];
  const dir = [[-1, -.8], [1, -.6], [0, .2]];   // het onderste stuk blijft op de porie liggen in plaats van erin te zakken
  return P.map((poly, i) => `<clipPath id="${id}-${i}"><polygon points="${poly.map(q => q.map(f1).join(',')).join(' ')}"/></clipPath>` +
    `<g transform="translate(${f1(dir[i][0] * d)} ${f1(dir[i][1] * d)}) rotate(${f1(dir[i][0] * 12 * k)})"><g clip-path="url(#${id}-${i})">${capsid(R, o)}</g></g>`).join('');
}

/* viraal genoom in het capside: dsDNA-lus met proteïne VII-bolletjes */
export function viralGenome(R, op = 1, beads = true) {
  const p = `M${f1(-R * .5)},${f1(-R * .1)} C${f1(-R * .6)},${f1(-R * .55)} ${f1(R * .1)},${f1(-R * .62)} ${f1(R * .22)},${f1(-R * .2)}
             C${f1(R * .34)},${f1(R * .2)} ${f1(-R * .3)},${f1(R * .12)} ${f1(-R * .22)},${f1(R * .45)}
             C${f1(-R * .16)},${f1(R * .68)} ${f1(R * .4)},${f1(R * .6)} ${f1(R * .52)},${f1(R * .3)}`;
  let s = `<g opacity="${f1(op)}"><path d="${p}" stroke="${PINK}" stroke-width="${f1(Math.max(2.5, R * .06))}" fill="none" stroke-linecap="round"/>`;
  if (beads) for (const [x, y] of [[-.42, -.3], [-.05, -.45], [.2, -.05], [-.02, .22], [-.2, .5], [.3, .5]])
    s += `<circle cx="${f1(x * R)}" cy="${f1(y * R)}" r="${f1(R * .09)}" fill="#c98fe0" stroke="#3b1130" stroke-width="1"/>`;
  return s + '</g>';
}

/* ── membraan ───────────────────────────────────────────────────────
 * Detailronde 15-11-2026: elk membraan is een lipidedubbellaag (bio.js: kopjes buiten, staartjes binnen).
 * bilayer(d) aanvaardt nog steeds een SVG-pad (M/L/H/V/Q/C/Z, absoluut of relatief); het pad wordt bemonsterd tot punten.
 * col wordt niet meer gebruikt (vaste lipidekleuren); w = oude lijndikte, de dubbellaag wordt ≈ 1,5 × zo breed. */
export function padPts(d, step = 10) {
  const tok = d.match(/[MLHVQCZmlhvqcz]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) || [];
  let i = 0, cmd = 'M', x = 0, y = 0, x0 = 0, y0 = 0;
  const P = [], n = () => parseFloat(tok[i++]), isCmd = k => /^[A-Za-z]$/.test(tok[k] ?? '');
  const curve = (f, len) => { const N = Math.max(4, Math.ceil(len / step)); for (let k = 1; k <= N; k++) P.push(f(k / N)); };
  while (i < tok.length) {
    if (isCmd(i)) cmd = tok[i++];
    const rel = cmd === cmd.toLowerCase(), U = cmd.toUpperCase(), ox = rel ? x : 0, oy = rel ? y : 0;
    if (U === 'Z') { if (P.length) P.push([x0, y0]); x = x0; y = y0; if (!isCmd(i)) i++; continue; }
    if (U === 'M') { x = ox + n(); y = oy + n(); x0 = x; y0 = y; P.push([x, y]); cmd = rel ? 'l' : 'L'; continue; }
    if (U === 'L') { x = ox + n(); y = oy + n(); P.push([x, y]); continue; }
    if (U === 'H') { x = ox + n(); P.push([x, y]); continue; }
    if (U === 'V') { y = oy + n(); P.push([x, y]); continue; }
    if (U === 'Q') {
      const ax = x, ay = y, cx = ox + n(), cy = oy + n(), ex = ox + n(), ey = oy + n();
      curve(t => { const u = 1 - t; return [u * u * ax + 2 * u * t * cx + t * t * ex, u * u * ay + 2 * u * t * cy + t * t * ey]; }, Math.hypot(cx - ax, cy - ay) + Math.hypot(ex - cx, ey - cy));
      x = ex; y = ey; continue;
    }
    if (U === 'C') {
      const ax = x, ay = y, c1x = ox + n(), c1y = oy + n(), c2x = ox + n(), c2y = oy + n(), ex = ox + n(), ey = oy + n();
      curve(t => { const u = 1 - t; return [u * u * u * ax + 3 * u * u * t * c1x + 3 * u * t * t * c2x + t * t * t * ex, u * u * u * ay + 3 * u * u * t * c1y + 3 * u * t * t * c2y + t * t * t * ey]; },
        Math.hypot(c1x - ax, c1y - ay) + Math.hypot(c2x - c1x, c2y - c1y) + Math.hypot(ex - c2x, ey - c2y));
      x = ex; y = ey; continue;
    }
    i++;                                                   // onbekend: overslaan
  }
  return P.filter((p, k) => k === 0 || Math.hypot(p[0] - P[k - 1][0], p[1] - P[k - 1][1]) > .5);
}
export function bilayer(d, col = C.mem, w = 15, o = {}) {
  return membraanPts(padPts(d), { w: w * 1.5, ...o });
}
/* puntenlijst → SVG-pad (voor vullingen, klikzones) */
export const ptsPad = (P, closed = false) => 'M' + P.map(p => f1(p[0]) + ',' + f1(p[1])).join(' L') + (closed ? 'Z' : '');
/* gladmaken: enkele rondes voortschrijdend gemiddelde (eindpunten van een open lijn blijven staan) */
export function glad(P, rondes = 3, closed = false) {
  let Q = P;
  for (let r = 0; r < rondes; r++) Q = Q.map((p, i) => {
    if (!closed && (i === 0 || i === Q.length - 1)) return p;
    const a = Q[(i - 1 + Q.length) % Q.length], b = Q[(i + 1) % Q.length];
    return [(a[0] + 2 * p[0] + b[0]) / 4, (a[1] + 2 * p[1] + b[1]) / 4];
  });
  return Q;
}
/* membraan met een knop (instulping of uitstulping), zoals bij endocytose, afknoppen en membraanfusie.
 * Basislijn van (x0,y0) naar (x1,y1); de knop ligt op afstand u van (x0,y0), straal r.
 * k = 0: vlak · 0,5: halve bol · 1: bol hangt nog aan een smalle hals (afgesnoerd bij k = 1).
 * side = +1: knop aan de kant van de normaal (-dy, dx) (bij een lijn van links naar rechts: naar onder). */
export function knopPts(x0, y0, x1, y1, u, r, k, { side = 1, step = 7, rondes = 3 } = {}) {
  const L = Math.hypot(x1 - x0, y1 - y0), tx = (x1 - x0) / L, ty = (y1 - y0) / L, nx = -ty * side, ny = tx * side;
  const at = (a, v) => [x0 + tx * a + nx * v, y0 + ty * a + ny * v];
  const kk = Math.min(.985, Math.max(0, k)), c = r * (2 * kk - 1), th0 = Math.acos(Math.max(-1, Math.min(1, -c / r))), hc = r * Math.sin(th0);
  const P = [];
  const flat = (a, b) => { if (b <= a) return; const far = 3 * r; const pts = [a]; for (let s = a + step; s < b; s += (Math.abs(s - u) > far ? step * 6 : step)) pts.push(s); pts.push(b); pts.forEach(s => P.push(at(s, 0))); };
  flat(0, u - hc);
  if (th0 > .02) { const N = Math.max(6, Math.ceil(th0 * r / step)); for (let i = 0; i <= N; i++) { const th = -th0 + 2 * th0 * i / N; P.push(at(u + r * Math.sin(th), c + r * Math.cos(th))); } }
  flat(u + hc, L);
  return glad(P, rondes);
}
/* membraanboog: stuk van een cirkelvormig membraan van hoek a0 tot a1 (graden), bv. een opengebroken blaasje */
export function boogPts(cx, cy, r, a0, a1, step = 8) {
  const N = Math.max(3, Math.ceil(Math.abs(a1 - a0) * Math.PI / 180 * r / step));
  return Array.from({ length: N + 1 }, (_, i) => { const a = (a0 + (a1 - a0) * i / N) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
}
/* opengebroken blaasje: dubbellaag met gaten (hoeken in graden, [van, tot]) */
export function blaasjeOpen(cx, cy, r, gaten = [], { w = 18, lumen = 'rgba(201,165,116,.08)', op = 1 } = {}) {
  if (op <= .01) return '';
  const G = gaten.map(([a, b]) => [((a % 360) + 360) % 360, ((a % 360) + 360) % 360 + (b - a)]).sort((p, q) => p[0] - q[0]);
  let g = `<g opacity="${f1(op)}"><circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" fill="${lumen}"/>`;
  if (!G.length) return g + membraanPts(boogPts(cx, cy, r, 0, 360).slice(0, -1), { w, closed: true }) + '</g>';
  for (let i = 0; i < G.length; i++) { const a = G[i][1], b = i + 1 < G.length ? G[i + 1][0] : G[0][0] + 360; if (b - a > 4) g += membraanPts(boogPts(cx, cy, r, a, b), { w }); }
  return g + '</g>';
}
/* gesloten zak langs een boog (ER-cisterne rond de kern): middenstraal rad, van hoek a0 tot a1 (graden), dikte dik */
export function zakBoog(cx, cy, rad, a0, a1, { dik = 16, w = 6, lumen = 'rgba(143,179,232,.16)', op = 1 } = {}) {
  if (op <= .01) return '';
  const ri = rad - dik / 2, ro = rad + dik / 2, uit = boogPts(cx, cy, ro, a0, a1, 6), bin = boogPts(cx, cy, ri, a1, a0, 6);
  const sg = Math.sign(a1 - a0) || 1;
  const kap = (a, bulge, e0) => {                          // halve cirkel rond het uiteinde, van de ene membraanrand naar de andere
    const ar = a * Math.PI / 180, ex = Math.cos(ar), ey = Math.sin(ar), mx = cx + rad * ex, my = cy + rad * ey, bx = -ey * bulge, by = ex * bulge, out = [];
    for (let k = 1; k < 6; k++) { const th = Math.PI * k / 6, c = Math.cos(th) * dik / 2 * e0, sn = Math.sin(th) * dik / 2; out.push([mx + ex * c + bx * sn, my + ey * c + by * sn]); }
    return out;
  };
  const P = [...uit, ...kap(a1, sg, 1), ...bin, ...kap(a0, -sg, -1)];
  return `<g opacity="${f1(op)}"><path d="${ptsPad(P, true)}" fill="${lumen}"/>${membraanPts(P, { w, closed: true })}</g>`;
}

/* ── receptoren ───────────────────────────────────────────────────── */
/* CAR (coxsackie-adenovirusreceptor): type I-membraaneiwit met twee Ig-domeinen buiten (D1 bovenaan bindt de vezelknop),
 * één transmembraanhelix en een staart in het cytosol. (x,y) ≈ buitenkant van het membraan; up = -1: buiten = boven. */
export function car(x, y, up = -1, s = 1, hl = 0) {
  const c = hl > .5 ? '#9fe3d0' : '#7fc9b6';
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)} ${f1(s * -up)})">` +
    tmHelix(0, -5, 13, c, 1, 6) +
    `<path d="M0,13 q5,5 1,10 q-4,4 1,8" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round"/>` +       // staart (cytosol)
    `<path d="M0,-5 L0,-11" stroke="${c}" stroke-width="2.6"/>` +
    eiwit(0, -19, 8.5, 8.5, c, { seed: 31, bumps: .08 }) + eiwit(.5, -36, 8.5, 8.5, c, { seed: 32, bumps: .08 }) + '</g>';
}
/* αv-integrine: heterodimeer (α + β), elk met een kop buiten, een lange poot, één transmembraanhelix en een korte staart */
export function integrin(x, y, s = 1, hl = 0) {
  const a = hl > .5 ? '#ffd166' : '#c9a574', b = hl > .5 ? '#ffb347' : '#a98a5e';
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})">` +
    tmHelix(-5, -3, 16, a, 1, 5.5) + tmHelix(5, -3, 16, b, 1, 5.5) +
    `<path d="M-5,16 q-3,5 -1,9 M5,16 q3,5 1,9" stroke="${a}" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
    `<path d="M-5,-3 L-6,-16 M5,-3 L6,-14" stroke="${a}" stroke-width="3.2" stroke-linecap="round"/>` +
    eiwit(-6, -23, 10, 8.5, a, { seed: 41, bumps: .08 }) + eiwit(7, -20, 7.5, 7, b, { seed: 42, bumps: .08 }) + '</g>';
}
/* klathrine-triskelion */
export function triskelion(x, y, rot = 0, s = 1, col = '#8fa8ff', op = 1) {
  const leg = a => `M0,0 Q${f1(Math.cos(rad(a)) * 16 - Math.sin(rad(a)) * 9)},${f1(Math.sin(rad(a)) * 16 + Math.cos(rad(a)) * 9)} ${f1(Math.cos(rad(a)) * 30)},${f1(Math.sin(rad(a)) * 30)}`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${s})" opacity="${f1(op)}">
    ${[0, 120, 240].map(a => `<path d="${leg(a)}" stroke="${col}" stroke-width="4" fill="none" stroke-linecap="round"/>`).join('')}
    <circle r="4" fill="${col}"/></g>`;
}

/* ── lipidenanodeeltje ────────────────────────────────────────────
 * Geen blaasje met een dubbellaag rond water: buiten één laag lipiden (helperfosfolipide + PEG-lipide, koppen naar buiten,
 * staartjes naar binnen) met cholesterol; binnenin een dichte kern van ioniseerbare lipiden met het mRNA in kleine
 * waterige holtes (zie 'simplified' in lnp.js). protonated (0..1): plusladingen op de ioniseerbare lipiden (zuur endosoom). */
export function lnpParticle(R, op = 1, o = {}) {
  const prot = o.protonated ?? 0, hr = Math.max(1.6, R * .05), pitch = hr * 2.3, tl = R * .07;
  let s = `<g opacity="${f1(op)}">`;
  for (let a = 0; a < 360; a += 24) {                      // PEG-ketens aan de buitenkant
    const [x, y] = [Math.cos(rad(a)) * R, Math.sin(rad(a)) * R];
    s += `<path d="M${f1(x)},${f1(y)} q${f1(Math.cos(rad(a + 30)) * R * .22)},${f1(Math.sin(rad(a + 30)) * R * .22)} ${f1(Math.cos(rad(a)) * R * .3)},${f1(Math.sin(rad(a)) * R * .3)}" stroke="${PEG}" stroke-width="${f1(R * .045)}" fill="none" opacity=".85"/>`;
  }
  s += `<circle r="${f1(R)}" fill="#1b1a22"/><circle r="${f1(R - 2 * hr)}" fill="rgba(232,194,122,.30)"/>`;     // kern van ioniseerbare lipiden
  // buitenste laag: één rij koppen met staartjes naar binnen (monolaag)
  s += `<circle r="${f1(R - 2 * hr - tl / 2)}" fill="none" stroke="${LIPID.tail}" stroke-width="${f1(tl)}" stroke-dasharray="${f1(hr * .35)} ${f1(hr * .45)} ${f1(hr * .35)} ${f1(pitch - hr * 1.15)}"/>`;
  s += `<circle r="${f1(R - hr)}" fill="none" stroke="#c9a574" stroke-width="${f1(hr * 2)}" stroke-linecap="round" stroke-dasharray="0 ${f1(pitch)}"/>`;
  for (let a = 15; a < 360; a += 30) s += `<circle cx="${f1(Math.cos(rad(a)) * R * .84)}" cy="${f1(Math.sin(rad(a)) * R * .84)}" r="${f1(R * .055)}" fill="${CHOL}"/>`;
  // waterige holtes met mRNA, omringd door de koppen van ioniseerbare lipiden
  const H = [[-.36, -.24, .22], [.24, -.32, .19], [.32, .22, .21], [-.2, .32, .2]];
  H.forEach(([u, v, rr], i) => {
    const cx = u * R, cy = v * R, r2 = rr * R;
    s += `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r2)}" fill="#0d1a33" stroke="${LIP}" stroke-width="${f1(hr * 1.8)}" stroke-linecap="round" stroke-dasharray="0 ${f1(hr * 2.4)}"/>`;
    s += `<path d="M${f1(cx - r2 * .62)},${f1(cy)} q${f1(r2 * .31)},${f1(-r2 * .5)} ${f1(r2 * .62)},0 t${f1(r2 * .62)},0" stroke="${C.rna}" stroke-width="${f1(Math.max(1.5, R * .045))}" fill="none" stroke-linecap="round"/>`;
    if (prot > .02) {                                      // plusladingen op de ioniseerbare lipiden
      const [px, py, h] = [cx + r2 * .95, cy - r2 * .95, R * .06];
      s += `<path d="M${f1(px - h)},${f1(py)}h${f1(2 * h)}M${f1(px)},${f1(py - h)}v${f1(2 * h)}" stroke="#ff9d5c" stroke-width="${f1(R * .04)}" stroke-linecap="round" opacity="${f1(prot)}"/>`;
    }
  });
  return s + '</g>';
}

/* ── cytoskelet en motoren ────────────────────────────────────────── */
export function microtubule(x0, y0, x1, y1, w = 14, col = '#7c8aa8') {
  const L = Math.hypot(x1 - x0, y1 - y0), a = Math.atan2(y1 - y0, x1 - x0) * 180 / Math.PI;
  let d = '';
  for (let i = 0; i < L; i += 16) d += `<rect x="${f1(i)}" y="${f1(-w / 2)}" width="13" height="${f1(w)}" rx="3" fill="${col}" opacity="${i % 32 < 16 ? .5 : .32}"/>`;
  return `<g transform="translate(${f1(x0)} ${f1(y0)}) rotate(${f1(a)})">${d}
    <line x1="0" y1="${f1(-w / 2)}" x2="${f1(L)}" y2="${f1(-w / 2)}" stroke="${col}" stroke-width="1.5" opacity=".8"/>
    <line x1="0" y1="${f1(w / 2)}" x2="${f1(L)}" y2="${f1(w / 2)}" stroke="${col}" stroke-width="1.5" opacity=".8"/></g>`;
}
/* motoreiwit dat over een microtubule loopt (dyneïne/kinesine): twee poten + staart naar de vracht */
export function motor(x, y, ang = 0, s = 1, col = C.prot, phase = 0, flip = 1) {
  const l1 = Math.sin(phase) * 9, l2 = Math.sin(phase + Math.PI) * 9;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang)}) scale(${f1(s)},${f1(s * flip)})">
    <path d="M0,0 L${f1(-11 + l1)},20 M0,0 L${f1(11 + l2)},20" stroke="${col}" stroke-width="5" stroke-linecap="round" fill="none"/>
    <ellipse cx="${f1(-11 + l1)}" cy="23" rx="8" ry="5" fill="${col}"/><ellipse cx="${f1(11 + l2)}" cy="23" rx="8" ry="5" fill="${col}"/>
    <path d="M0,0 L0,-16" stroke="${col}" stroke-width="5" stroke-linecap="round"/>
    <circle cy="-20" r="7" fill="${col}"/></g>`;
}

/* kinesine-1 die tegelijk aan twee dingen vastzit (bv. Nup358 van de porie en het capside): de koppen lopen op een
 * microtubule, vanaf het staarteinde gaan twee armen naar de doelen. ang zoals bij motor() (koppen aan de +y-kant).
 * Strunze et al., Cell Host Microbe 2011: het capside bindt de lichte keten (Klc1/2), Nup358 de zware keten (Kif5c). */
export function kinesineGreep(x, y, ang, s, col, phase, doelen = []) {
  const a = ang * Math.PI / 180, hx = x + 20 * s * Math.sin(a), hy = y - 20 * s * Math.cos(a);   // staarteinde = (0,-20) lokaal
  let g = doelen.map(([tx, ty]) => `<path d="M${f1(hx)},${f1(hy)} Q${f1((hx + tx) / 2)},${f1((hy + ty) / 2 - 14)} ${f1(tx)},${f1(ty)}" stroke="${col}" stroke-width="${f1(4 * s)}" fill="none" stroke-linecap="round"/>` +
    `<circle cx="${f1(tx)}" cy="${f1(ty)}" r="${f1(6 * s)}" fill="${col}"/>`).join('');
  return g + motor(x, y, ang, s, col, phase);
}

/* lineair viraal dsDNA (adenovirus) in de kern: twee strengen, aan beide uiteinden het terminaal eiwit (TP),
 * met enkele bolletjes proteïne VII. Het adenovirusgenoom blijft lineair (geen ring). */
export function linDNA(x0, x1, y, { op = 1, amp = 9, vii = 4 } = {}) {
  if (op <= .01) return '';
  const pad = d => { let s = `M${f1(x0)},${f1(y + d)}`; for (let x = x0 + 8; x <= x1; x += 8) s += ` L${f1(x)},${f1(y + d + amp * Math.sin((x - x0) / 26))}`; return s; };
  let g = `<g opacity="${f1(op)}"><path d="${pad(-4)}" stroke="${PINK}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="${pad(4)}" stroke="#e7a9d6" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  for (let i = 0; i < vii; i++) { const x = x0 + (x1 - x0) * (i + 1) / (vii + 1); g += `<circle cx="${f1(x)}" cy="${f1(y + amp * Math.sin((x - x0) / 26))}" r="8" fill="#c98fe0" stroke="#3b1130" stroke-width="1"/>`; }
  for (const x of [x0, x1]) { const yy = y + amp * Math.sin((x - x0) / 26); g += `<path d="${eiwitPad(x + (x === x0 ? -8 : 8), yy, 11, 10, x === x0 ? 21 : 22, .1)}" fill="#ffd166" stroke="#8a6a1c" stroke-width="1.5"/>`; }
  return g + '</g>';
}

/* ── kernporiecomplex in doorsnede ────────────────────────────────── */
/* Getekend rond (x,y): cytoplasma boven (y kleiner), nucleoplasma onder. Het membraan (kernenvelop) tekent de scène zelf;
 * de membraanring van de porie valt op ± 92·s, het poriemembraan hoort daar te liggen (zie kernEnvelop in bio.js). */
export function npc(x, y, s = 1, o = {}) {
  const fg = o.fg ?? 1, col = C.prot, g = [];
  const S = v => f1(v * s);
  // ring-doorsnede: twee "blokken" links en rechts van het kanaal
  for (const side of [-1, 1]) {
    /* per spaak: cytoplasmatische ring, binnenring en kernring (bobbelige eiwitdomeinen) en een membraanring aan de
       buitenkant, die in het poriemembraan zit (waar buiten- en binnenmembraan in elkaar overgaan) */
    const cx0 = side * 62;
    for (const [dy, rx, ry, sd, fo] of [[-27, 25, 13, 1, .5], [0, 21, 12, 2, .32], [27, 25, 13, 3, .5], [0, 8, 11, 4, .7]]) {
      const ox = sd === 4 ? cx0 + side * 30 : cx0;
      const d = eiwitPad(ox * s, dy * s, rx * s, ry * s, 90 + sd * 2 + (side > 0 ? 1 : 0), .07);
      g.push(`<path d="${d}" fill="#1a2242"/><path d="${d}" fill="${col}" fill-opacity="${fo}" stroke="${col}" stroke-width="${S(2.2)}"/>`);
    }
    // cytoplasmatische filamenten (boven) en kernmandje (onder)
    for (let i = 0; i < 3; i++) {
      const fx = side * (40 + i * 14);
      g.push(`<path d="M${S(fx)},${S(-40)} q${S(side * 10)},${S(-26)} ${S(side * 4)},${S(-48)}" stroke="${col}" stroke-width="${S(3.4)}" fill="none" opacity=".75" stroke-linecap="round"/>`);
      g.push(`<path d="M${S(fx)},${S(40)} q${S(-side * 6)},${S(30)} ${S(-side * 16)},${S(48)}" stroke="${col}" stroke-width="${S(3.4)}" fill="none" opacity=".6" stroke-linecap="round"/>`);
    }
  }
  g.push(`<path d="M${S(-58)},${S(88)} L${S(58)},${S(88)}" stroke="${col}" stroke-width="${S(4)}" opacity=".6" stroke-linecap="round"/>`);
  // FG-mesh in het kanaal
  if (fg > .02) {
    let m = '';
    for (let i = 0; i < 26; i++) {
      const px = -36 + (i * 13) % 72, py = -34 + ((i * 29) % 68);
      m += `<path d="M${S(px)},${S(py)} q${S(9)},${S(7)} ${S(2)},${S(15)} t${S(-7)},${S(13)}" stroke="#b9a6ff" stroke-width="${S(2.6)}" fill="none" opacity=".75" stroke-linecap="round"/>`;
    }
    g.push(`<g opacity="${f1(fg)}">${m}</g>`);
  }
  return `<g transform="translate(${f1(x)} ${f1(y)})">${g.join('')}</g>`;
}
