import { C, T2, svgOpen, cam, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { T, smooth, tag, arrowDefs, arr, phos, spark, PHOS } from '../prot/_b_kit.js';

/*
 * Verhaallijn 2, hoofdstuk "rtk": EGF activeert de EGF-receptor (EGFR/ErbB1).
 * Buiten de cel boven, cytosol onder; het plasmamembraan loopt horizontaal (y 400–470).
 * De tekenhulpjes hieronder worden ook gebruikt door mapk.js en srf.js.
 */

/* kleuren verhaallijn 2 (vaste betekenis in rtk, mapk en srf) */
export const K = {
  egf: '#7fdc6a', rec: '#9b7bff', grb: '#4fd1c5', sos: '#e58cff', ras: '#f2c14e', raf: '#ff9a4d', mek: '#ff7eb6', erk: '#5fd3e6',
  gtp: '#f4f6ff', gdp: '#8a93a8', atp: '#c3cde3', tyr: '#dfe6f5',
};

/* fosfolipide dubbellaag tussen y0 en y1 (patroon met kopjes en staarten) */
export function membrane(pre, y0, y1, x0 = -600, x1 = 2200) {
  const h = y1 - y0;
  return `<defs><pattern id="${pre}-lip" x="0" y="${y0}" width="18" height="${h}" patternUnits="userSpaceOnUse">` +
    `<circle cx="9" cy="8" r="7" fill="#c9a574"/><circle cx="9" cy="${h - 8}" r="7" fill="#c9a574"/>` +
    `<path d="M6,15 L6,${h / 2 - 3} M12,15 L12,${h / 2 - 3} M6,${h - 15} L6,${h / 2 + 3} M12,${h - 15} L12,${h / 2 + 3}" stroke="#8a7355" stroke-width="2"/></pattern></defs>` +
    `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${h}" fill="rgba(201,165,116,.12)"/><rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${h}" fill="url(#${pre}-lip)"/>`;
}

/* tweelobbig kinasedomein (N-lob boven, C-lob onder); on = 0..1 actief (gloed) */
export function kinase(kx, ky, col, o = {}) {
  const { op = 1, on = 0, sc = 1 } = o;
  if (op <= .01) return '';
  const g = on > .01 ? `<ellipse cx="${f1(kx)}" cy="${f1(ky + 32 * sc)}" rx="${f1(78 * sc)}" ry="${f1(82 * sc)}" fill="${col}" opacity="${f1(on * .22)}" filter="url(#glow)"/>` : '';
  return `<g opacity="${f1(op)}">${g}<ellipse cx="${f1(kx)}" cy="${f1(ky)}" rx="${f1(40 * sc)}" ry="${f1(28 * sc)}" fill="${col}" fill-opacity="${f1(.2 + .35 * on)}" stroke="${col}" stroke-width="3"/>` +
    `<ellipse cx="${f1(kx)}" cy="${f1(ky + 62 * sc)}" rx="${f1(52 * sc)}" ry="${f1(36 * sc)}" fill="${col}" fill-opacity="${f1(.2 + .35 * on)}" stroke="${col}" stroke-width="3"/></g>`;
}

/* bolletje met letter; de letter valt weg als ze bij camerabreedte cw kleiner dan ~10 px op het scherm zou staan */
export function chip(x, y, r, letter, fill, cw = 1000, o = {}) {
  const { op = 1, tc = '#0a1224', stroke = '#0a1224' } = o;
  if (op <= .01) return '';
  const fs = r * 1.05, show = fs * 1000 / cw >= 10.3;
  return `<g${op < 1 ? ` opacity="${f1(op)}"` : ''}><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>` +
    (show ? `<text x="${f1(x)}" y="${f1(y + r * .37)}" font-size="${f1(fs)}" text-anchor="middle" fill="${tc}" font-family="Inter" font-weight="800">${letter}</text>` : '') + '</g>';
}
export const pdot = (x, y, r, cw = 1000, op = 1) => chip(x, y, r, 'P', PHOS, cw, { op, tc: '#fff', stroke: '#fff' });
/* tyrosine (wit, Y) dat fosfotyrosine wordt (rood, P) */
export function tyr(x, y, k, r = 15, cw = 1000) {
  return k >= .5 ? pdot(x, y, r + 2, cw) : chip(x, y, r, 'Y', K.tyr, cw);
}

/* Ras: G-domein (bol) + staart met lipide-anker in het binnenblad (memY = onderkant membraan) */
export function ras(x, y, memY, o = {}) {
  const { op = 1, on = 0, nuc = 'GDP', r = 36, nucOp = 1, anchor = true } = o;
  if (op <= .01) return '';
  const col = K.ras;
  let s = `<g opacity="${f1(op)}">`;
  if (anchor) s += `<path d="M${f1(x)},${f1(y - r)} C${f1(x - 10)},${f1(y - r - 18)} ${f1(x + 10)},${f1(memY + 22)} ${f1(x)},${f1(memY + 6)}" stroke="${col}" stroke-width="4" fill="none"/>`;
  if (anchor) s += `<path d="M${f1(x)},${f1(memY + 6)} l-5,-7 l10,-7 l-10,-7 l10,-7" stroke="#e3c89c" stroke-width="3.5" fill="none" stroke-linejoin="round"/>`;
  if (on > .01) s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r + 14)}" fill="${col}" opacity="${f1(on * .25)}" filter="url(#glow)"/>`;
  s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${col}" fill-opacity="${f1(.18 + .4 * on)}" stroke="${col}" stroke-width="3"/>`;
  if (nuc && nucOp > .01) s += tag(x, y + 4, nuc, nuc === 'GTP' ? K.gtp : K.gdp, { fs: 17, op: nucOp });
  return s + '</g>';
}

/* Grb2 (SH3–SH2–SH3) met SOS; (x,y) = centrum van het SH2-domein */
export function grbSos(x, y, o = {}) {
  const { op = 1, labels = false, fs = 20 } = o;
  if (op <= .01) return '';
  const sh3a = [x + 50, y - 26], sh3b = [x + 60, y + 30], so = [x + 205, y - 140];
  let s = `<g opacity="${f1(op)}">`;
  s += `<path d="${smooth([[so[0] - 70, so[1] + 38], [sh3a[0] + 30, sh3a[1] - 24], [sh3a[0] + 8, sh3a[1] - 6]])}" stroke="${K.sos}" stroke-width="5" fill="none"/>`;
  s += `<path d="${smooth([[so[0] - 40, so[1] + 48], [sh3b[0] + 60, sh3b[1] - 30], [sh3b[0] + 12, sh3b[1] - 4]])}" stroke="${K.sos}" stroke-width="5" fill="none"/>`;
  s += `<path d="M${f1(x + 14)},${f1(y - 12)} L${f1(sh3a[0])},${f1(sh3a[1])} M${f1(x + 16)},${f1(y + 10)} L${f1(sh3b[0])},${f1(sh3b[1])}" stroke="${K.grb}" stroke-width="5"/>`;
  s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="27" fill="${K.grb}" fill-opacity=".35" stroke="${K.grb}" stroke-width="3"/>`;
  s += `<circle cx="${f1(sh3a[0])}" cy="${f1(sh3a[1])}" r="18" fill="${K.grb}" fill-opacity=".35" stroke="${K.grb}" stroke-width="3"/>`;
  s += `<circle cx="${f1(sh3b[0])}" cy="${f1(sh3b[1])}" r="18" fill="${K.grb}" fill-opacity=".35" stroke="${K.grb}" stroke-width="3"/>`;
  s += `<ellipse cx="${f1(so[0])}" cy="${f1(so[1])}" rx="100" ry="52" fill="${K.sos}" fill-opacity=".25" stroke="${K.sos}" stroke-width="3"/>`;
  s += T(so[0] + 12, so[1] + 9, 'SOS', { size: 26, col: '#fff', w: 800 });
  if (labels) {
    s += T(x, y + 8, 'SH2', { size: 17, col: '#fff', w: 800 });
    s += T(sh3a[0] + 42, sh3a[1] + 6, 'SH3', { size: 16, col: K.grb, w: 700, anchor: 'start' });
    s += T(sh3b[0] + 30, sh3b[1] + 12, 'SH3', { size: 16, col: K.grb, w: 700, anchor: 'start' });
  }
  return s + '</g>';
}
export const SOS_OFF = [205, -140];      // SOS-centrum t.o.v. het SH2-domein

/* ---------------------------------------------------------------- */
const MT = 400, MB = 470;                        // plasmamembraan
const X1A = 560, X1B = 720, X2A = 1040, X2B = 880;
const KY = 545;                                  // N-lob van het kinasedomein (monomeer)
const TAIL = [[0, 0], [25, 30], [60, 52], [100, 64], [145, 70]];   // C-staart t.o.v. onderkant C-lob (R2; R1 gespiegeld)
const DOCK = [1003, 808];                        // SH2 van Grb2 op pTyr (R2, laatste tyrosine)
const FREE = [200, 40];                          // Grb2–SOS los in het cytosol (verschuiving)
const RAS = [1195, 578];
/* extracellulair deel: lobposities (x × zijde s) in gesloten (tethered) en open (extended) vorm */
const ECD = {
  t: { I: [25, 122], II0: [5, 190], II1: [35, 300], arm: [42, 330], III: [-40, 282], IV: [0, 352] },
  e: { I: [-38, 146], II0: [12, 160], II1: [12, 262], arm: [52, 212], III: [-38, 284], IV: [0, 352] },
};
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

function receptor(x, s, ext, kx, ky, o = {}) {
  const { nums = false, armHi = 0, kOn = 0, ys = [0, 0, 0], cw = 1000 } = o;
  const P = k => { const a = ECD.t[k], b = ECD.e[k]; return [x + s * lerp(a[0], b[0], ext), lerp(a[1], b[1], ext)]; };
  const col = K.rec, I = P('I'), II0 = P('II0'), II1 = P('II1'), arm = P('arm'), III = P('III'), IV = P('IV');
  const lobe = (p, rx, ry) => `<ellipse cx="${f1(p[0])}" cy="${f1(p[1])}" rx="${rx}" ry="${ry}" fill="${col}" fill-opacity=".28" stroke="${col}" stroke-width="3"/>`;
  let g = '';
  g += `<rect x="${f1(x - 7)}" y="${MT - 12}" width="14" height="${MB - MT + 22}" rx="6" fill="${col}"/>`;       // transmembraanhelix
  g += lobe(IV, 22, 30) + lobe(III, 38, 36);
  g += `<path d="M${f1(II0[0])},${f1(II0[1])} L${f1(II1[0])},${f1(II1[1])}" stroke="${col}" stroke-width="30" stroke-linecap="round" opacity=".55"/>`;
  g += `<path d="M${f1((II0[0] + II1[0]) / 2)},${f1((II0[1] + II1[1]) / 2)} L${f1(arm[0])},${f1(arm[1])}" stroke="${armHi > .01 ? '#e0d6ff' : col}" stroke-width="12" stroke-linecap="round"/>`;
  g += `<circle cx="${f1(arm[0])}" cy="${f1(arm[1])}" r="${f1(14 + 3 * armHi)}" fill="${armHi > .01 ? '#e0d6ff' : col}"/>`;
  g += lobe(I, 36, 34);
  if (nums) g += [['I', I], ['II', [(II0[0] + II1[0]) / 2 - s * 1, (II0[1] + II1[1]) / 2 - 18]], ['III', III], ['IV', IV]].map(([l, p]) => T(p[0], p[1] + 7, l, { size: 19, col: '#fff', w: 800 })).join('');
  /* cytosolisch deel */
  g += `<path d="M${f1(x)},${MB + 8} C${f1(x)},${MB + 30} ${f1(kx)},${f1(ky - 50)} ${f1(kx)},${f1(ky - 27)}" stroke="${col}" stroke-width="6" fill="none"/>`;
  g += kinase(kx, ky, col, { on: kOn });
  const b = [kx, ky + 98];
  // R1 (s = +1) staart naar links, R2 (s = −1) naar rechts
  const tp = TAIL.map(([dx, dy]) => [b[0] - s * dx, b[1] + dy]);
  g += `<path d="${smooth(tp)}" stroke="${col}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  [2, 3, 4].forEach((i, j) => { g += tyr(tp[i][0], tp[i][1], ys[j], 15, cw); });
  return { g, tp };
}

function egf(x, y, op = 1) {
  if (op <= .01) return '';
  return `<g opacity="${f1(op)}" transform="translate(${f1(x)} ${f1(y)}) scale(1.35) translate(${f1(-x)} ${f1(-y)})"><path d="M${f1(x - 22)},${f1(y)} C${f1(x - 24)},${f1(y - 20)} ${f1(x - 4)},${f1(y - 22)} ${f1(x + 4)},${f1(y - 14)} C${f1(x + 16)},${f1(y - 22)} ${f1(x + 26)},${f1(y - 8)} ${f1(x + 22)},${f1(y + 4)} C${f1(x + 20)},${f1(y + 20)} ${f1(x - 18)},${f1(y + 22)} ${f1(x - 22)},${f1(y)} Z" fill="${K.egf}" fill-opacity=".45" stroke="${K.egf}" stroke-width="3"/></g>`;
}

const SCENE = {
  id: 'rtk',
  title: { nl: 'Receptortyrosinekinase (EGFR)', en: 'Receptor tyrosine kinase (EGFR)' },
  scale: { nl: 'niet op schaal (plasmamembraan ≈ 5 nm dik)', en: 'not to scale (plasma membrane ≈ 5 nm thick)' },
  time: { nl: 'seconden tot minuten na EGF', en: 'seconds to minutes after EGF' },
  org: { nl: 'mens (bv. epitheelcel)', en: 'human (e.g. epithelial cell)' },
  legend: [[K.egf, 'EGF'], [K.rec, { nl: 'EGF-receptor (EGFR)', en: 'EGF receptor (EGFR)' }], [PHOS, { nl: 'fosfaat (P-Tyr)', en: 'phosphate (P-Tyr)' }],
    [K.grb, 'Grb2'], [K.sos, 'SOS'], [K.ras, 'Ras'], [C.mem, { nl: 'plasmamembraan', en: 'plasma membrane' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">3D: EGF gebonden aan het extracellulaire deel van EGFR (2:2-dimeer) PDB <a href="https://www.rcsb.org/structure/1IVO" target="_blank" rel="noopener">1IVO</a>; asymmetrisch dimeer van de kinasedomeinen PDB <a href="https://www.rcsb.org/structure/2GS2" target="_blank" rel="noopener">2GS2</a>.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">3D: EGF bound to the extracellular region of EGFR (2:2 dimer) PDB <a href="https://www.rcsb.org/structure/1IVO" target="_blank" rel="noopener">1IVO</a>; asymmetric dimer of the kinase domains PDB <a href="https://www.rcsb.org/structure/2GS2" target="_blank" rel="noopener">2GS2</a>.</p>' },
  simplified: {
    nl: 'Schematisch en niet op schaal. De vier extracellulaire domeinen (I–IV) zijn bolletjes; de echte vormen staan in PDB 1IVO. Van de vele tyrosines in de lange C-terminale staart tonen we er drie per receptor. Een deel van de receptoren vormt ook zonder EGF al inactieve dimeren. Hier fosforyleert de actieve ontvanger eerst de staart van de activator (in trans); hoe precies beide staarten gefosforyleerd raken (rolwissel binnen het dimeer, grotere clusters van receptoren) wordt nog onderzocht. Grb2 en SOS zijn als vooraf gevormd complex getekend; Grb2 kan ook via het adaptereiwit Shc binden. Endocytose en afbraak van de receptor zijn weggelaten.',
    en: 'Schematic and not to scale. The four extracellular domains (I–IV) are drawn as balls; the real shapes are in PDB 1IVO. Of the many tyrosines in the long C-terminal tail we show three per receptor. Some receptors also form inactive dimers without EGF. Here the active receiver first phosphorylates the activator’s tail (in trans); exactly how both tails get phosphorylated (role swapping within the dimer, larger receptor clusters) is still being studied. Grb2 and SOS are drawn as a preformed complex; Grb2 can also bind via the adaptor protein Shc. Endocytosis and degradation of the receptor are omitted.' },
  steps: [
    ST(7000, cam(800, 470, 1500), 'Een groeifactor bereikt de cel', 'A growth factor reaches the cell',
      'De epidermale groeifactor EGF, een klein eiwit van 53 aminozuren, komt buiten de cel aan. In het plasmamembraan wachten EGF-receptoren als losse, inactieve monomeren.',
      'Epidermal growth factor (EGF), a small protein of 53 amino acids, arrives outside the cell. In the plasma membrane EGF receptors wait as separate, inactive monomers.'),
    ST(8500, cam(800, 290, 1250), 'EGF bindt: de receptor gaat open', 'EGF binds: the receptor opens up',
      'EGF wordt vastgeklemd tussen domein I en III. Daardoor klapt het extracellulaire deel open en komt de dimerisatie-arm van domein II vrij.',
      'EGF is clamped between domains I and III. The extracellular region then swings open and the dimerisation arm of domain II becomes exposed.'),
    ST(8000, cam(800, 300, 1150), 'Twee receptoren vormen een dimeer', 'Two receptors form a dimer',
      'De armen van domein II grijpen in elkaar: een rug-aan-rugdimeer. De twee EGF-moleculen raken elkaar niet; de receptoren zelf maken het contact.',
      'The domain II arms interlock: a back-to-back dimer. The two EGF molecules do not touch each other; the receptors themselves make the contact.'),
    ST(8000, cam(800, 640, 1000), 'Een asymmetrisch kinasedimeer', 'An asymmetric kinase dimer',
      'In het cytosol legt het ene kinasedomein (activator) zijn C-lob tegen de N-lob van het andere (ontvanger). Daardoor wordt het ontvangende kinase actief.',
      'In the cytosol one kinase domain (the activator) presses its C-lobe against the N-lobe of the other (the receiver). This switches the receiver kinase on.'),
    ST(8500, cam(800, 700, 1000), 'Tyrosines krijgen een fosfaat', 'Tyrosines get a phosphate',
      'De receptoren fosforyleren tyrosines in elkaars C-terminale staart (trans-autofosforylering); het fosfaat komt van ATP. Zo ontstaan dockingplaatsen.',
      'The receptors phosphorylate tyrosines in each other\'s C-terminal tail (trans-autophosphorylation); the phosphate comes from ATP. This creates docking sites.'),
    ST(8500, cam(990, 720, 1100), 'Grb2 leest een fosfotyrosine', 'Grb2 reads a phosphotyrosine',
      'Het adaptereiwit Grb2 bindt met zijn SH2-domein een fosfotyrosine. Met zijn twee SH3-domeinen houdt het SOS vast, dat zo mee naar de receptor komt.',
      'The adaptor protein Grb2 binds a phosphotyrosine with its SH2 domain. With its two SH3 domains it holds SOS, which is thereby brought to the receptor.'),
    ST(8000, cam(1100, 600, 1000), 'SOS belandt naast Ras', 'SOS lands next to Ras',
      'Ras hangt met een lipide-anker aan de binnenkant van het membraan. SOS komt nu vlak naast Ras-GDP terecht en kan het activeren.',
      'Ras hangs from the inner side of the membrane by a lipid anchor. SOS now ends up right next to Ras-GDP and can activate it.'),
    ST(7500, cam(800, 470, 1500), 'Het signaal is binnen', 'The signal is inside',
      'Een signaal buiten de cel is nu een actief complex aan de binnenkant van het membraan. Klik op Ras om de cascade naar de kern te volgen.',
      'A signal outside the cell has become an active complex on the inner side of the membrane. Click Ras to follow the cascade to the nucleus.'),
  ],
  loop: false,
  svg() {
    return svgOpen(arrowDefs('rtk', { m: C.muted, r: PHOS, w: '#fff' })) + `
    <rect x="-600" y="${MB}" width="2800" height="1400" fill="url(#gCyto)" opacity=".85"/>
    ${membrane('rtk', MT, MB)}
    <g id="rtk-bg"></g>
    <g data-node="signaal" data-color="${K.egf}" data-label="${T2('← Signalen: overzicht', '← Signals: overview')}"><g id="rtk-egf"></g><g id="rtk-sigA"><circle data-anchor="signaal" cx="300" cy="30" r="1" fill="none"/></g></g>
    <g id="rtk-rec"></g>
    <g data-node="mapk" data-color="${K.ras}" data-label="${T2('Ras–MAPK-cascade →', 'Ras–MAPK cascade →')}"><g id="rtk-ras"></g><g id="rtk-mapkA"><circle data-anchor="mapk" cx="${RAS[0] + 110}" cy="${RAS[1] - 50}" r="1" fill="none"/></g></g>
    <g id="rtk-grb"></g>
    <g id="rtk-fx"></g>
    <g id="rtk-lbl"></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        const cw = SCENE.steps[step]?.cam?.[2] ?? 1600;
        /* ---- toestand ---- */
        const slide = step < 2 ? 0 : step === 2 ? ease(sub(p, .1, .65)) : 1;
        const x1 = lerp(X1A, X1B, slide), x2 = lerp(X2A, X2B, slide);
        const e1 = step < 1 ? 0 : step === 1 ? ease(sub(p, .25, .6)) : 1;
        const e2 = step < 1 ? 0 : step === 1 ? ease(sub(p, .5, .85)) : 1;
        const asym = step < 3 ? 0 : step === 3 ? ease(sub(p, .1, .6)) : 1;
        const k1x = lerp(x1, 735, asym), k2x = lerp(x2, 835, asym), k2y = lerp(KY, KY + 62, asym);
        const on2 = step < 3 ? 0 : step === 3 ? sub(p, .55, .8) : 1;
        const ph = step < 4 ? 0 : step === 4 ? sub(p, .1, .85) * 6 : 6;          // aantal gefosforyleerde tyrosines (0–6)
        const Y = i => clamp(ph - i);
        const armHi = step === 1 ? sub(p, .6, .8) : step === 2 ? 1 : 0;

        /* ---- EGF ---- */
        const pocket = (x, sd) => [x - sd * 82, 216];
        let eg = '';
        const E1s = [330, lerp(120, 160, step === 0 ? ease(p) : 1)], E2s = [1270, lerp(140, 180, step === 0 ? ease(p) : 1)];
        const m1 = step === 0 ? 0 : step === 1 ? ease(sub(p, 0, .4)) : 1, m2 = step === 0 ? 0 : step === 1 ? ease(sub(p, .22, .65)) : 1;
        const pk1 = pocket(x1, 1), pk2 = pocket(x2, -1);
        const E1 = [lerp(E1s[0], pk1[0], m1), lerp(E1s[1], pk1[1], m1)], E2 = [lerp(E2s[0], pk2[0], m2), lerp(E2s[1], pk2[1], m2)];
        const dec = step === 0 ? 1 : step === 1 ? 1 - sub(p, 0, .3) : 0;        // losse EGF's die wegdrijven
        eg += egf(800, lerp(150, 130, step === 0 ? p : 1) - (step === 1 ? 60 * sub(p, 0, .3) : 0), dec) + egf(1420, lerp(250, 230, step === 0 ? p : 1) - (step === 1 ? 60 * sub(p, 0, .3) : 0), dec);
        $('rtk-egf').innerHTML = eg;
        $('rtk-sigA').setAttribute('opacity', step === 0 ? 1 : 0);

        /* ---- receptoren ---- */
        const r1 = receptor(x1, 1, e1, k1x, KY, { nums: step === 1 || step === 2, armHi, ys: [Y(0), Y(1), Y(2)], cw });
        const r2 = receptor(x2, -1, e2, k2x, k2y, { nums: step === 1 || step === 2, armHi, kOn: on2, ys: [Y(3), Y(4), Y(5)], cw });
        let rc = r1.g + r2.g + egf(E1[0], E1[1]) + egf(E2[0], E2[1]);
        if (armHi > .01 && step === 2) rc += `<circle cx="800" cy="212" r="${f1(34 * sub(p, .6, .85))}" fill="#e0d6ff" opacity="${f1(.35 * sub(p, .6, .85))}" filter="url(#glow)"/>`;
        $('rtk-rec').innerHTML = rc;

        /* ---- Ras ---- */
        $('rtk-ras').innerHTML = ras(RAS[0], RAS[1], MB, { r: 36 }) + `<rect x="${RAS[0] - 60}" y="${MB}" width="120" height="130" fill="transparent"/>`;
        $('rtk-mapkA').setAttribute('opacity', step >= 6 ? 1 : 0);

        /* ---- Grb2–SOS ---- */
        const dk = step < 5 ? 0 : step === 5 ? ease(sub(p, .1, .7)) : 1;
        const gx = DOCK[0] + FREE[0] * (1 - dk), gy = DOCK[1] + FREE[1] * (1 - dk);
        $('rtk-grb').innerHTML = grbSos(gx, gy, { labels: step === 5 || step === 6 });

        /* ---- effecten ---- */
        let fx = '';
        if (step === 3) fx += `<circle cx="787" cy="607" r="${f1(10 + 16 * sub(p, .5, .8))}" fill="#fff" opacity="${f1(.5 * sub(p, .5, .7))}" filter="url(#glow)"/>`;
        if (step === 4) {
          for (let i = 0; i < 6; i++) { const k = clamp(ph - i); if (k > 0 && k < 1) { const tp = i < 3 ? r1.tp[i + 2] : r2.tp[i - 1]; /* eerst de staart van de activator: de actieve ontvanger fosforyleert in trans */ fx += spark(tp[0], tp[1], k, PHOS); } }
          fx += arr(800, 712, 660, 728, '#fff', 'rtk-w', { w: 3.5, bend: .3, op: sub(p, .05, .2) }) + arr(745, 682, 905, 792, '#fff', 'rtk-w', { w: 3.5, bend: -.2, op: sub(p, .05, .2) });
          const atpK = sub(p, .15, .8);
          fx += tag(930, 590, atpK < .5 ? 'ATP' : 'ADP', K.atp, { fs: 17 });
        }
        if (step === 5) fx += tag(930, 590, 'ADP', K.atp, { fs: 17, op: 1 - sub(p, 0, .2) });
        if (step === 5 && dk > .95) fx += `<circle cx="${DOCK[0] - 20}" cy="${DOCK[1] - 31}" r="${f1(18 + 14 * sub(p, .7, .9))}" fill="none" stroke="${K.grb}" stroke-width="3" opacity="${f1(1 - sub(p, .85, 1) * .6)}"/>`;
        if (step === 6) fx += `<path d="M${RAS[0] - 70},${RAS[1] + 24} Q${RAS[0] - 50},${RAS[1] + 70} ${RAS[0] - 20},${RAS[1] + 44}" stroke="#fff" stroke-width="3" fill="none" marker-end="url(#rtk-w)" opacity="${f1(sub(p, .4, .6))}"/>`;
        $('rtk-fx').innerHTML = fx;

        /* ---- labels ---- */
        let lb = '';
        const L = (x, y, s, o = {}) => { lb += T(x, y, s, { size: 24, ...o }); };
        if (step === 0 || step === 7) {
          L(80, 380, T2('buiten de cel', 'outside the cell'), { anchor: 'start', col: C.muted, w: 500 });
          L(80, 520, 'cytosol', { anchor: 'start', col: C.muted, w: 500 });
          L(1530, 444, T2('plasmamembraan', 'plasma membrane'), { anchor: 'end', col: '#e3c89c' });
        }
        if (step === 0) {
          L(E1[0] - 40, E1[1] + 9, 'EGF', { col: K.egf, size: 26, w: 800, anchor: 'end' });
          L(800, 262, T2('← EGF-receptoren (EGFR) →', '← EGF receptors (EGFR) →'), { col: '#c9b8ff' });
          L(X1A - 70, 590, T2('kinasedomein', 'kinase domain'), { col: '#c9b8ff', anchor: 'end' });
          L(RAS[0] + 50, RAS[1] + 9, 'Ras', { col: K.ras, anchor: 'start', size: 26, w: 800 });
          L(DOCK[0] + FREE[0] - 40, DOCK[1] + FREE[1] + 8, 'Grb2', { col: K.grb, anchor: 'end' });
        }
        if (step === 1) {
          L(E1[0] - 40, E1[1] + 9, 'EGF', { col: K.egf, w: 800, anchor: 'end', op: sub(p, .35, .5) });
          L(E2[0] + 40, E2[1] + 9, 'EGF', { col: K.egf, w: 800, anchor: 'start', op: sub(p, .6, .75) });
          L(x1 + 72, 204, T2('arm', 'arm'), { anchor: 'start', col: '#e0d6ff', op: sub(p, .6, .8) });
          L(x2 - 72, 204, T2('arm', 'arm'), { anchor: 'end', col: '#e0d6ff', op: sub(p, .85, 1) });
          L(x2 + 40, 60, T2('gesloten', 'closed'), { col: C.muted, op: 1 - sub(p, .5, .7) });
          L(x1 - 40, 60, T2('open', 'open'), { col: '#e0d6ff', op: sub(p, .5, .7) });
        }
        if (step === 2) {
          L(800, 64, T2('rug-aan-rugdimeer', 'back-to-back dimer'), { col: '#e0d6ff', size: 28, w: 800, op: sub(p, .6, .8) });
          L(800, 160, T2('armen', 'arms'), { col: '#e0d6ff', op: sub(p, .65, .85) });
          L(E1[0] - 40, E1[1] + 9, 'EGF', { col: K.egf, w: 800, anchor: 'end' });
          L(E2[0] + 40, E2[1] + 9, 'EGF', { col: K.egf, w: 800, anchor: 'start' });
        }
        if (step === 3) {
          L(660, 560, 'activator', { anchor: 'end', col: '#c9b8ff', op: sub(p, .5, .7) });
          L(910, 640, T2('ontvanger', 'receiver'), { anchor: 'start', col: '#e0d6ff', op: sub(p, .5, .7) });
          L(910, 670, T2('→ actief', '→ active'), { anchor: 'start', col: C.ok, size: 22, op: sub(p, .7, .85) });
          lb += T(k1x, KY + 7, 'N', { size: 18, col: '#fff', w: 800 }) + T(k1x, KY + 69, 'C', { size: 18, col: '#fff', w: 800 });
          lb += T(k2x, k2y + 7, 'N', { size: 18, col: '#fff', w: 800 }) + T(k2x, k2y + 69, 'C', { size: 18, col: '#fff', w: 800 });
        }
        if (step === 4) {
          L(560, 800, T2('C-staart', 'C-tail'), { col: '#c9b8ff' });
          L(1010, 850, T2('Tyr → P-Tyr', 'Tyr → P-Tyr'), { col: PHOS, op: sub(p, .3, .45) });
          L(800, 835, 'in trans', { col: '#fff', size: 22, op: sub(p, .1, .25) });
        }
        if (step === 5) {
          L(gx - 40, gy + 40, 'Grb2', { col: K.grb, anchor: 'end' });
          L(DOCK[0] - 150, DOCK[1] - 56, 'P-Tyr', { col: PHOS, anchor: 'end', op: sub(p, .7, .85) });
        }
        if (step === 6) {
          L(RAS[0] + 52, RAS[1] - 20, 'Ras-GDP', { col: K.ras, anchor: 'start', w: 800 });
          L(RAS[0] + 52, RAS[1] + 12, T2('inactief', 'inactive'), { col: C.muted, anchor: 'start', size: 22 });
          L(RAS[0] - 22, MB + 36, T2('lipide-anker', 'lipid anchor'), { col: '#e3c89c', anchor: 'end', size: 22, op: sub(p, .1, .3) });
          L(RAS[0] + 118, RAS[1] + 110, T2('SOS = GEF', 'SOS = GEF'), { col: K.sos, anchor: 'start', op: sub(p, .45, .65) });
          L(DOCK[0] - 40, DOCK[1] + 40, 'Grb2', { col: K.grb, anchor: 'end' });
        }
        if (step === 7) {
          L(800, 78, T2('EGF-geactiveerd EGFR-dimeer', 'EGF-activated EGFR dimer'), { col: '#e0d6ff' });
          L(DOCK[0] - 40, DOCK[1] + 40, 'Grb2', { col: K.grb, anchor: 'end' });
          L(RAS[0] + 50, RAS[1] + 9, 'Ras', { col: K.ras, anchor: 'start', size: 26, w: 800 });
          L(560, 842, 'P-Tyr', { col: PHOS });
        }
        $('rtk-lbl').innerHTML = lb;
      },
    };
  },
};
export default SCENE;
