/*
 * Privé tekenhulpjes voor de scènes van stage 'entry'.
 * Kleurafspraak (zie app/SCENES.md): roze = vreemd/viraal DNA en viruscapside,
 * geel/oker = lipidenanodeeltje en membranen, paars = eiwitten/nucleoporinen.
 * Alle functies geven SVG-strings terug en zijn deterministisch.
 */
import { C, f1 } from '../../kit.js';

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

/* ── membraan ─────────────────────────────────────────────────────── */
export function bilayer(d, col = C.mem, w = 15) {
  return `<path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round"/>` +
    `<path d="${d}" stroke="#2a1f14" stroke-width="${w * .3}" fill="none" stroke-linecap="round" opacity=".55"/>`;
}

/* ── receptoren ───────────────────────────────────────────────────── */
/* CAR: twee Ig-domeinen op een steel (aanhechtingsreceptor) */
export function car(x, y, up = -1, s = 1, hl = 0) {
  const c = hl > .5 ? '#9fe3d0' : '#7fc9b6';
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">
    <rect x="-5" y="${up < 0 ? -8 : 0}" width="10" height="26" rx="3" fill="${c}" opacity=".7"/>
    <rect x="-11" y="${f1(up * 40)}" width="22" height="20" rx="6" fill="${c}"/>
    <rect x="-11" y="${f1(up * 20)}" width="22" height="20" rx="6" fill="${c}" opacity=".85"/></g>`;
}
/* αv-integrine: heterodimeer met twee poten en een kop */
export function integrin(x, y, s = 1, hl = 0) {
  const a = hl > .5 ? '#ffd166' : '#c9a574', b = hl > .5 ? '#ffb347' : '#a98a5e';
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">
    <path d="M-7,26 L-5,-14" stroke="${a}" stroke-width="7" stroke-linecap="round"/>
    <path d="M7,26 L5,-14" stroke="${b}" stroke-width="7" stroke-linecap="round"/>
    <ellipse cx="-6" cy="-22" rx="11" ry="10" fill="${a}"/><ellipse cx="7" cy="-19" rx="9" ry="8" fill="${b}"/></g>`;
}
/* klathrine-triskelion */
export function triskelion(x, y, rot = 0, s = 1, col = '#8fa8ff', op = 1) {
  const leg = a => `M0,0 Q${f1(Math.cos(rad(a)) * 16 - Math.sin(rad(a)) * 9)},${f1(Math.sin(rad(a)) * 16 + Math.cos(rad(a)) * 9)} ${f1(Math.cos(rad(a)) * 30)},${f1(Math.sin(rad(a)) * 30)}`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${s})" opacity="${f1(op)}">
    ${[0, 120, 240].map(a => `<path d="${leg(a)}" stroke="${col}" stroke-width="4" fill="none" stroke-linecap="round"/>`).join('')}
    <circle r="4" fill="${col}"/></g>`;
}

/* ── lipidenanodeeltje ────────────────────────────────────────────── */
export function lnpParticle(R, op = 1, o = {}) {
  const prot = o.protonated ?? 0;
  let s = `<g opacity="${f1(op)}">`;
  for (let a = 0; a < 360; a += 24) {
    const [x, y] = [Math.cos(rad(a)) * R, Math.sin(rad(a)) * R];
    s += `<path d="M${f1(x)},${f1(y)} q${f1(Math.cos(rad(a + 30)) * R * .22)},${f1(Math.sin(rad(a + 30)) * R * .22)} ${f1(Math.cos(rad(a)) * R * .3)},${f1(Math.sin(rad(a)) * R * .3)}" stroke="${PEG}" stroke-width="${f1(R * .045)}" fill="none" opacity=".85"/>`;
  }
  s += `<circle r="${f1(R)}" fill="rgba(255,194,71,.10)" stroke="${LIP}" stroke-width="${f1(R * .11)}"/>`;
  s += `<circle r="${f1(R * .72)}" fill="none" stroke="${LIP}" stroke-width="${f1(R * .07)}" opacity=".6" stroke-dasharray="${f1(R * .12)} ${f1(R * .08)}"/>`;
  for (let a = 15; a < 360; a += 30) {
    const r2 = R * .86;
    s += `<circle cx="${f1(Math.cos(rad(a)) * r2)}" cy="${f1(Math.sin(rad(a)) * r2)}" r="${f1(R * .06)}" fill="${CHOL}"/>`;
  }
  if (prot > .02) for (let a = 0; a < 360; a += 60) {
    const r2 = R * .5;
    /* positieve lading als getekend plusje (geen tekst: blijft scherp bij elke zoom) */
    const [px, py, h] = [Math.cos(rad(a)) * r2, Math.sin(rad(a)) * r2, R * .09];
    s += `<path d="M${f1(px - h)},${f1(py)}h${f1(2 * h)}M${f1(px)},${f1(py - h)}v${f1(2 * h)}" stroke="#ff9d5c" stroke-width="${f1(R * .045)}" stroke-linecap="round" opacity="${f1(prot)}"/>`;
  }
  s += `<path d="M${f1(-R * .45)},${f1(-R * .1)} q${f1(R * .16)},${f1(-R * .3)} ${f1(R * .3)},0 t${f1(R * .3)},0 t${f1(R * .3)},0" stroke="${C.rna}" stroke-width="${f1(R * .08)}" fill="none" stroke-linecap="round"/>`;
  s += `<path d="M${f1(-R * .35)},${f1(R * .26)} q${f1(R * .16)},${f1(-R * .3)} ${f1(R * .3)},0 t${f1(R * .3)},0" stroke="${C.rna}" stroke-width="${f1(R * .08)}" fill="none" stroke-linecap="round"/>`;
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

/* ── kernporiecomplex in doorsnede ────────────────────────────────── */
/* Getekend rond (x,y): cytoplasma boven (y kleiner), nucleoplasma onder. */
export function npc(x, y, s = 1, o = {}) {
  const fg = o.fg ?? 1, col = C.prot, g = [];
  const S = v => f1(v * s);
  // ring-doorsnede: twee "blokken" links en rechts van het kanaal
  for (const side of [-1, 1]) {
    g.push(`<g transform="translate(${S(side * 62)} 0)">
      <rect x="${S(-26)}" y="${S(-40)}" width="${S(52)}" height="${S(80)}" rx="${S(12)}" fill="#1a2242" stroke="${col}" stroke-width="${S(3)}"/>
      <rect x="${S(-18)}" y="${S(-30)}" width="${S(36)}" height="${S(22)}" rx="${S(7)}" fill="${col}" opacity=".35"/>
      <rect x="${S(-18)}" y="${S(8)}" width="${S(36)}" height="${S(22)}" rx="${S(7)}" fill="${col}" opacity=".35"/>
      <rect x="${S(-18)}" y="${S(-11)}" width="${S(36)}" height="${S(19)}" rx="${S(6)}" fill="${col}" opacity=".22"/></g>`);
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
