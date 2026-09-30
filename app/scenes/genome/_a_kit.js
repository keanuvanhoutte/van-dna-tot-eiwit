/* Privé-hulpjes voor de genome-scènes van deel A (chromatine, nucleosoom, …). */
import { C, f1 } from '../../kit.js';

/* stap-helper: ST(dur, cam, titelNL, titelEN, tekstNL, tekstEN) */
export const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

/* vaste histonkleuren (zelfde in 2D en 3D) */
export const HC = { H3: '#b39ddb', H4: '#7fc8a9', H2A: '#e0bd6e', H2B: '#e08f8f', H1: '#c7cedc' };

/*
 * Nucleosoom van bovenaf (face-on): histonkern + DNA dat er ~1,7 keer omheen loopt.
 * Geeft { svg, a, b } terug: a = intrede-, b = uittredepunt van het DNA (om linker-DNA aan te knopen).
 */
export function nucleo(x, y, r, o = {}) {
  const { rot = -90, turns = 1.7, dna = C.dna, core = C.histone, op = 1, octa = false, w = r * .26, stroke = '#0a1224' } = o;
  let s = `<g opacity="${f1(op)}">`;
  const cr = octa ? r * .8 : r * .86;
  if (octa) {
    // 8 histonen, spiegelsymmetrisch rond de dyade-as (boven): H3 H4 H2B H2A | H2A H2B H4 H3
    const q = ['H3', 'H4', 'H2B', 'H2A', 'H2A', 'H2B', 'H4', 'H3'];
    for (let k = 0; k < 8; k++) {
      const a0 = (k * 45 + rot) * Math.PI / 180, a1 = ((k + 1) * 45 + rot) * Math.PI / 180, am = (a0 + a1) / 2;
      s += `<path d="M${f1(x)},${f1(y)} L${f1(x + cr * Math.cos(a0))},${f1(y + cr * Math.sin(a0))} A${f1(cr)},${f1(cr)} 0 0 1 ${f1(x + cr * Math.cos(a1))},${f1(y + cr * Math.sin(a1))} Z" fill="${HC[q[k]]}" stroke="${stroke}" stroke-width="${f1(r * .02)}"/>`;
      if (o.lab) s += `<text x="${f1(x + cr * .62 * Math.cos(am))}" y="${f1(y + cr * .62 * Math.sin(am) + o.lab * .35)}" font-size="${o.lab}" text-anchor="middle" fill="#0a1224" font-family="Inter" font-weight="700">${q[k]}</text>`;
    }
  } else s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(cr)}" fill="${core}" stroke="${stroke}" stroke-width="${f1(r * .03)}"/>`;
  const n = 90, span = turns * 2 * Math.PI, th0 = rot * Math.PI / 180 + span / 2;   // midden van het DNA (dyade) ligt bij 'rot'
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const u = i / n, th = th0 - u * span;             // 2D-bovenaanzicht: de draairichting van de superhelix is hier niet zichtbaar
    const rr = r * (1.06 - .2 * u);
    pts.push([x + rr * Math.cos(th), y + rr * Math.sin(th)]);
  }
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${f1(p[0])},${f1(p[1])}`).join('');
  s += `<path d="${d}" stroke="${dna}" stroke-width="${f1(w)}" fill="none" stroke-linecap="round"/>`;
  s += `<path d="${d}" stroke="#cfe0ff" stroke-width="${f1(w * .28)}" fill="none" stroke-dasharray="${f1(w * .5)} ${f1(w * 1.1)}" opacity=".7"/>`;
  return { svg: s + '</g>', a: pts[0], b: pts[n] };
}

/* histon-"vlaggetje" voor een modificatie op een staart */
export function flag(x, y, lbl, col, op = 1, fs = 11) {
  if (op <= .01) return '';
  const w = lbl.length * fs * .62 + 10;
  return `<g opacity="${f1(op)}"><line x1="${f1(x)}" y1="${f1(y)}" x2="${f1(x)}" y2="${f1(y - fs * 1.6)}" stroke="${col}" stroke-width="${f1(fs * .15)}"/>` +
    `<rect x="${f1(x)}" y="${f1(y - fs * 2.6)}" width="${f1(w)}" height="${f1(fs * 1.3)}" rx="${f1(fs * .3)}" fill="${col}"/>` +
    `<text x="${f1(x + w / 2)}" y="${f1(y - fs * 1.62)}" font-size="${fs}" text-anchor="middle" fill="#0a1224" font-family="Inter" font-weight="700">${lbl}</text></g>`;
}

/* vloeiend pad door punten (Catmull-Rom → cubic Bézier) */
export function smooth(pts) {
  if (pts.length < 2) return '';
  let d = `M${f1(pts[0][0])},${f1(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    d += ` C${f1(p1[0] + (p2[0] - p0[0]) / 6)},${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)},${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])},${f1(p2[1])}`;
  }
  return d;
}

/* paneelkader met titel */
export function panel(x, y, w, h, title, col = '#2a3a60', fs = 16) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="rgba(13,20,38,.55)" stroke="${col}" stroke-width="2"/>` +
    `<text class="ptitle" x="${x + 18}" y="${y + fs + 10}" font-size="${fs}" fill="#c9d2e4" font-family="Inter" font-weight="700">${title}</text>`;
}
