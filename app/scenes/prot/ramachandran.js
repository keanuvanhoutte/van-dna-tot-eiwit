import { C, L, T2, svgOpen, txt, mono, cam, FULL, sub, ease, clamp, lerp, f1, THREE } from '../../kit.js';
import { fetchPDB, parsePDB, residues, phiPsi } from './_a_geo.js';

/* plotgebied: φ −180…180 → x, ψ 180…−180 → y */
const X0 = 170, Y0 = 90, S = 690;
const X = phi => X0 + (phi + 180) / 360 * S, Y = psi => Y0 + (180 - psi) / 360 * S;

/* Schematische gebieden (graden) naar de algemene MolProbity-contouren (Lovell et al. 2003). */
const ALLOWED = [
  [[-180, 180], [-35, 180], [-35, 135], [-45, 100], [-40, 60], [-20, 20], [-15, -25], [-25, -60], [-45, -80], [-100, -75], [-150, -55], [-180, -45]],
  [[-180, -180], [-45, -180], [-50, -165], [-180, -150]],
  [[40, 90], [75, 95], [95, 55], [95, 5], [70, -15], [45, 0], [35, 45]],
];
const FAV = [
  [[-180, 180], [-48, 180], [-52, 150], [-68, 128], [-100, 110], [-140, 100], [-180, 110]],
  [[-95, -5], [-40, -5], [-35, -30], [-50, -65], [-80, -65], [-100, -40]],
  [[48, 65], [70, 60], [72, 25], [55, 15], [45, 35]],
];
const inPoly = (x, y, poly) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
const allowed = r => ALLOWED.some(p => inPoly(r.phi, r.psi, p));
const isAlpha = r => r.phi > -160 && r.phi < -20 && r.psi > -100 && r.psi < 50;
const isBeta = r => r.phi < -45 && (r.psi > 90 || r.psi < -150);
const polyPath = poly => poly.map((p, i) => `${i ? 'L' : 'M'}${f1(X(p[0]))},${f1(Y(p[1]))}`).join('') + 'Z';
const CHAIN = { A: 'α1', B: 'β1', C: 'α2', D: 'β2' };

const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'ramachandran',
  title: { nl: 'Ramachandran-plot', en: 'Ramachandran plot' },
  scale: '1 residu · 0,1–1 nm', time: { nl: 'geen tijdsas (structuuranalyse)', en: 'no time axis (structure analysis)' },
  org: { nl: 'mens (hemoglobine, PDB 1BBB)', en: 'human (haemoglobin, PDB 1BBB)' },
  legend: [['#2b5ea8', { nl: 'voorkeursgebied', en: 'favoured region' }], ['#173a6b', { nl: 'toegestaan gebied', en: 'allowed region' }], ['#ffc247', { nl: 'residu (φ,ψ)', en: 'residue (φ,ψ)' }], ['#ff8a3d', 'Gly'], ['#7fdc6a', 'Pro'], [C.danger, { nl: 'uitschieter', en: 'outlier' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">De punten worden live berekend: de scène downloadt 1BBB van de RCSB PDB, leest de backbone-atomen N, Cα en C van alle vier ketens en berekent per residu φ = C(i−1)–N–Cα–C en ψ = N–Cα–C–N(i+1). Zelf proberen met andere structuren kan met de Ramachandran-tool uit de les.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">The points are computed live: the scene downloads 1BBB from the RCSB PDB, reads the backbone atoms N, Cα and C of all four chains and computes for each residue φ = C(i−1)–N–Cα–C and ψ = N–Cα–C–N(i+1). You can try other structures with the Ramachandran tool from the course.</p>' },
  simplified: {
    nl: 'De gekleurde gebieden zijn met de hand vereenvoudigde contouren van de algemene (niet-Gly, niet-Pro) MolProbity-verdeling; echte validatie gebruikt aparte verdelingen voor Gly, Pro, pre-Pro en Ile/Val. "Uitschieter" betekent hier: buiten die vereenvoudigde contour — geen officieel validatierapport. Het eerste en laatste residu van elke keten hebben geen φ of ψ en ontbreken dus.',
    en: 'The coloured regions are hand-simplified outlines of the general (non-Gly, non-Pro) MolProbity distribution; real validation uses separate distributions for Gly, Pro, pre-Pro and Ile/Val. "Outlier" here means: outside that simplified outline — not an official validation report. The first and last residue of each chain have no φ or ψ and are therefore missing.' },
  steps: [
    ST(7500, FULL, 'Elk residu = één punt (φ, ψ)', 'Each residue = one point (φ, ψ)', 'De twee torsiehoeken van de backbone, φ (rond N–Cα) en ψ (rond Cα–C), zijn de coördinaten van één punt, van −180° tot +180°. Voorbeeld: een ideale α-helix.', 'The two backbone torsion angles, φ (around N–Cα) and ψ (around Cα–C), are the coordinates of one point, from −180° to +180°. Example: an ideal α-helix.'),
    ST(8500, FULL, 'Toegestane en verboden gebieden', 'Allowed and forbidden regions', 'Bij de meeste φ/ψ-combinaties komen O-, N-, H- of Cβ-atomen van buren te dicht bij elkaar (botsing). Enkel de blauwe gebieden blijven over.', 'For most φ/ψ combinations O, N, H or Cβ atoms of neighbours get too close (clash). Only the blue regions remain.'),
    ST(10000, FULL, 'Hemoglobine, residu per residu', 'Haemoglobin, residue by residue', 'Nu echte data: φ en ψ van alle residuen van de vier ketens van menselijk hemoglobine (PDB 1BBB), berekend uit de atoomcoördinaten.', 'Now real data: φ and ψ of all residues of the four chains of human haemoglobin (PDB 1BBB), computed from the atomic coordinates.'),
    ST(8000, FULL, 'Grote wolk rond (−60°, −45°): α-helix', 'Big cloud around (−60°, −45°): α-helix', 'Hemoglobine bestaat vooral uit α-helices (3,6 residuen per winding, H-brug C=O(i)···H–N(i+4)), dus de meeste punten liggen in het rechtshandige α-gebied.', 'Haemoglobin consists mostly of α-helices (3.6 residues per turn, H-bond C=O(i)···H–N(i+4)), so most points lie in the right-handed α region.'),
    ST(8000, FULL, 'β-gebied (−120°, +130°)', 'β region (−120°, +130°)', 'Uitgestrekte residuen liggen linksboven. Hemoglobine heeft geen β-bladen: deze punten zitten in lussen en uiteinden. Eiwitten met β-bladen hebben hier een tweede grote wolk.', 'Extended residues lie at the top left. Haemoglobin has no β-sheets: these points sit in loops and chain ends. Proteins with β-sheets have a second big cloud here.'),
    ST(8500, FULL, 'Glycine: de uitzondering', 'Glycine: the exception', 'Glycine heeft als zijketen enkel een H-atoom (geen Cβ): minder botsingen, dus ook punten in "verboden" gebieden, zoals bij positieve φ. Vaak in scherpe bochten.', 'Glycine has only an H atom as side chain (no Cβ): fewer clashes, so also points in "forbidden" regions, such as at positive φ. Often in tight turns.'),
    ST(8000, FULL, 'Proline: φ ligt vast rond −65°', 'Proline: φ is fixed around −65°', 'De ring van proline (imino-zuur) zit vast aan zijn eigen stikstof; daardoor kan φ nauwelijks draaien.', 'The ring of proline (imino acid) is bonded to its own nitrogen, so φ can hardly rotate.'),
    ST(8500, FULL, 'Uitschieters = kwaliteitscontrole', 'Outliers = quality check', 'Punten in verboden gebieden wijzen op sterische botsingen of modelfouten. Een goed model heeft > 98 % van de residuen in de voorkeursgebieden (MolProbity).', 'Points in forbidden regions point to steric clashes or model errors. A good model has > 98 % of its residues in the favoured regions (MolProbity).'),
  ],
  svg() {
    const grid = [], ticks = [];
    for (let a = -180; a <= 180; a += 60)
      grid.push(`<line x1="${X(a)}" y1="${Y0}" x2="${X(a)}" y2="${Y0 + S}" stroke="#2a3550" stroke-width="${a === 0 ? 2 : 1}"/>`, `<line x1="${X0}" y1="${Y(a)}" x2="${X0 + S}" y2="${Y(a)}" stroke="#2a3550" stroke-width="${a === 0 ? 2 : 1}"/>`);
    for (let a = -180; a <= 180; a += 90) {
      const s = a < 0 ? '−' + (-a) : String(a);
      ticks.push(txt(X(a), Y0 + S + 34, s, C.muted, 22), txt(X0 - 14, Y(a) + 8, s, C.muted, 22, 'end'));
    }
    const reg = (id, x, y, s, anchor = 'middle', col = '#dfe8ff') => `<text id="${id}" x="${f1(x)}" y="${f1(y)}" font-size="25" text-anchor="${anchor}" fill="${col}" font-family="Inter" font-weight="700" opacity="0" paint-order="stroke" stroke="#0b1224" stroke-width="5" stroke-linejoin="round">${s}</text>`;
    return svgOpen() + `
    <rect x="${X0}" y="${Y0}" width="${S}" height="${S}" fill="#0b1224" stroke="#3a4a6b" stroke-width="2"/>
    <g id="ra-reg" opacity="0">
      ${ALLOWED.map(p => `<path d="${polyPath(p)}" fill="#173a6b"/>`).join('')}
      ${FAV.map(p => `<path d="${polyPath(p)}" fill="#2b5ea8"/>`).join('')}
    </g>
    ${grid.join('')}${ticks.join('')}
    ${txt(X0 + S / 2, Y0 + S + 76, 'φ (°)', C.chain, 26)}
    <text x="${X0 - 88}" y="${Y0 + S / 2}" font-size="26" text-anchor="middle" fill="${C.trna}" font-family="Inter" font-weight="600" transform="rotate(-90 ${X0 - 88} ${Y0 + S / 2})">ψ (°)</text>
    <g id="ra-pts"></g>
    <g>
      ${reg('ra-lb', X(-115), Y(160), T2('β-streng', 'β-strand'))}
      <g data-node="secundair" data-color="${C.prot}" data-label="${T2('α-helix → secundaire structuur', 'α-helix → secondary structure')}">
        <rect x="${X(-100)}" y="${Y(10)}" width="${X(-30) - X(-100)}" height="${Y(-80) - Y(10)}" fill="transparent"/>
        ${reg('ra-la', X(-20), Y(-72), T2('α (rechts)', 'α (right)'), 'start')}
        <circle data-anchor="secundair" cx="${X(-65)}" cy="${Y(-100)}" r="1" fill="none"/>
      </g>
      ${reg('ra-ll', X(105), Y(85), T2('α (links)', 'α (left)'), 'start')}
      ${reg('ra-lf', X(90), Y(-120), T2('verboden', 'forbidden'), 'middle', '#93a0bb')}
    </g>
    <g id="ra-hi"></g>
    <!-- één residu: waar liggen φ en ψ -->
    <g data-node="peptide" data-color="${C.chain}" data-label="${T2('φ en ψ: peptidebinding', 'φ and ψ: peptide bond')}">
      <rect x="930" y="110" width="630" height="230" rx="16" fill="#0d1426" stroke="#2a3550" stroke-width="2"/>
      <circle data-anchor="peptide" cx="1245" cy="110" r="1" fill="none"/>
      <g font-family="JetBrains Mono" font-weight="700" font-size="32">
        <line x1="975" y1="250" x2="1080" y2="250" stroke="${C.muted}" stroke-width="5"/>
        <line x1="1118" y1="250" x2="1225" y2="250" stroke="${C.chain}" stroke-width="7"/>
        <line x1="1282" y1="250" x2="1385" y2="250" stroke="${C.trna}" stroke-width="7"/>
        <line x1="1422" y1="250" x2="1520" y2="250" stroke="${C.muted}" stroke-width="5"/>
        <text x="1100" y="261" text-anchor="middle" fill="#4f8ff7">N</text>
        <text x="1253" y="261" text-anchor="middle" fill="${C.text}">Cα</text>
        <text x="1404" y="261" text-anchor="middle" fill="${C.text}">C</text>
        <text x="990" y="306" text-anchor="middle" fill="${C.muted}" font-size="23">C(i−1)</text>
        <text x="1510" y="306" text-anchor="middle" fill="${C.muted}" font-size="23">N(i+1)</text>
      </g>
      <path d="M1150,222 a24,14 0 1,1 45,0" fill="none" stroke="${C.chain}" stroke-width="3" marker-end="url(#arrow)"/>
      <path d="M1310,222 a24,14 0 1,1 45,0" fill="none" stroke="${C.trna}" stroke-width="3" marker-end="url(#arrow)"/>
      ${txt(1172, 194, 'φ', C.chain, 36)}${txt(1332, 194, 'ψ', C.trna, 36)}
    </g>
    <g id="ra-info"></g>
    <text id="ra-load" x="${X0 + S / 2}" y="${Y0 + S / 2}" font-size="25" text-anchor="middle" fill="${C.muted}" font-family="Inter" opacity="0">${T2('1BBB laden uit de PDB…', 'Loading 1BBB from the PDB…')}</text>
    </svg>`;
  },
  init(svg, api) {
    const $ = id => svg.getElementById(id);
    let data = null, err = null;
    fetchPDB('1BBB').then(t => { data = phiPsi(residues(parsePDB(t))); }).catch(e => { err = e.message; });
    const L3 = r => `${CHAIN[r.chain] ?? r.chain} ${r.resn[0] + r.resn.slice(1).toLowerCase()}${r.resi}`;
    const deg = v => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(Math.round(v)) + '°';
    const box = (y, h) => `<rect x="930" y="${y}" width="630" height="${h}" rx="16" fill="#0d1426" stroke="#2a3550" stroke-width="2"/>`;
    /* welk gebiedslabel is zichtbaar in welke stap (stap 1–2: alle vier) */
    const REG = { 'ra-lb': 4, 'ra-la': 3, 'ra-ll': 5, 'ra-lf': 7 };
    const vis = (id, k) => k <= 0 ? 0 : k <= 2 ? 1 : REG[id] === k ? 1 : 0;
    let lastKey = '';
    return {
      update(t, s) {
        const { step, p } = s;
        $('ra-reg').setAttribute('opacity', f1(step === 0 ? 0 : step === 1 ? ease(sub(p, 0, .35)) : 1));
        for (const id in REG) {
          const o = step === 0 ? 0 : step === 1 ? ease(sub(p, .35, .6)) : lerp(vis(id, step - 1), vis(id, step), ease(sub(p, 0, .3)));
          $(id).setAttribute('opacity', f1(o));
        }
        $('ra-load').setAttribute('opacity', !data && step >= 2 ? 1 : 0);
        if (err) $('ra-load').textContent = 'PDB 1BBB: ' + err;
        const n = data ? data.length : 0;
        const shown = !data || step < 2 ? 0 : step === 2 ? Math.round(n * clamp(p / .85)) : n;
        const key = (data ? 1 : 0) + ':' + step + ':' + shown + (step <= 1 ? f1(p) : '');
        if (key === lastKey) return; lastKey = key;

        /* punten */
        let pts = '';
        const hl = { 3: isAlpha, 4: isBeta, 5: r => r.resn === 'GLY', 6: r => r.resn === 'PRO', 7: r => r.resn !== 'GLY' && !allowed(r) }[step];
        const hcol = { 3: '#ffc247', 4: '#ffc247', 5: '#ff8a3d', 6: '#7fdc6a', 7: C.danger }[step];
        for (let i = 0; i < shown; i++) {
          const r = data[i];
          const on = !hl || hl(r);
          pts += `<circle cx="${f1(X(r.phi))}" cy="${f1(Y(r.psi))}" r="${on && hl ? 6 : 4.5}" fill="${on ? (hl ? hcol : '#ffc247') : '#6b7590'}" opacity="${on ? .95 : .35}" stroke="#0a1224" stroke-width="1"/>`;
        }
        $('ra-pts').innerHTML = pts;

        /* uitgelicht punt + korte info rechts */
        let hi = '', info = '';
        const title = s2 => txt(960, 434, s2, C.text, 25, 'start');
        const big = (s2, col) => `<text x="960" y="492" font-size="36" fill="${col}" font-family="JetBrains Mono" font-weight="700">${s2}</text>`;
        const small = s2 => txt(960, 545, s2, '#c3cde2', 23, 'start');
        /* voorbeeldpunt (ideale α-helix) + kaderje; in stap 1 vervagen ze */
        const exBox = op => `<g opacity="${f1(op)}">` + box(390, 150) + title(T2('Voorbeeld: ideale α-helix', 'Example: ideal α-helix')) + big('φ −60°  ψ −45°', C.text) + '</g>';
        if (step === 0 || (step === 1 && p < .35)) {
          const k = step === 0 ? ease(sub(p, .2, .7)) : 1, fo = step === 0 ? 1 : 1 - ease(sub(p, 0, .3));
          const ph = -180 + k * 120, ps = 0 - k * 45;
          info = exBox(fo);
          hi += `<g opacity="${f1(fo)}"><line x1="${f1(X(ph))}" y1="${Y0 + S}" x2="${f1(X(ph))}" y2="${f1(Y(ps))}" stroke="${C.chain}" stroke-width="2.5" stroke-dasharray="6 5"/>` +
            `<line x1="${X0}" y1="${f1(Y(ps))}" x2="${f1(X(ph))}" y2="${f1(Y(ps))}" stroke="${C.trna}" stroke-width="2.5" stroke-dasharray="6 5"/>` +
            `<circle cx="${f1(X(ph))}" cy="${f1(Y(ps))}" r="11" fill="#ffc247" stroke="#fff" stroke-width="2"/>` +
            txt(X(ph) + 20, Y(ps) - 20, `(${deg(ph)}, ${deg(ps)})`, '#fff', 26, 'start') + '</g>';
        }
        if (step === 1) {
          info += `<g opacity="${f1(ease(sub(p, .35, .6)))}">` + box(390, 150) +
            `<rect x="960" y="418" width="34" height="26" rx="4" fill="#2b5ea8"/>` + txt(1010, 440, T2('voorkeur', 'favoured'), C.text, 25, 'start') +
            `<rect x="960" y="472" width="34" height="26" rx="4" fill="#173a6b" stroke="#3a4a6b"/>` + txt(1010, 494, T2('toegestaan', 'allowed'), C.text, 25, 'start') + '</g>';
        } else if (step >= 2 && data) {
          const cur = data[Math.max(0, Math.min(n - 1, shown - 1))];
          const cnt = f => data.slice(0, shown).filter(f).length;
          const pct = f => Math.round(100 * cnt(f) / Math.max(1, shown));
          if (step === 2 && cur) {
            hi += `<circle cx="${f1(X(cur.phi))}" cy="${f1(Y(cur.psi))}" r="12" fill="none" stroke="#fff" stroke-width="3"/>`;
            info = box(390, 200) + `<text x="960" y="440" font-size="32" fill="#ffc247" font-family="JetBrains Mono" font-weight="700">${L3(cur)}</text>` +
              `<text x="960" y="490" font-size="27" fill="${C.text}" font-family="JetBrains Mono">φ ${deg(cur.phi)}  ψ ${deg(cur.psi)}</text>` +
              txt(960, 545, T2(`${shown} van ${n} residuen`, `${shown} of ${n} residues`), C.muted, 23, 'start');
          } else {
            const nGp = cnt(r => r.resn === 'GLY' && r.phi > 0);
            const lines = {
              3: [T2('In het α-gebied', 'In the α region'), `${cnt(isAlpha)} / ${n} (${pct(isAlpha)} %)`],
              4: [T2('In het β-gebied', 'In the β region'), `${cnt(isBeta)} / ${n} (${pct(isBeta)} %)`],
              5: [T2('Glycine (Gly)', 'Glycine (Gly)'), `${cnt(r => r.resn === 'GLY')}`, T2(`waarvan ${nGp} met φ > 0`, `of which ${nGp} with φ > 0`)],
              6: [T2('Proline (Pro)', 'Proline (Pro)'), `${cnt(r => r.resn === 'PRO')}`],
              7: [T2('Uitschieters (zonder Gly)', 'Outliers (Gly excluded)'), `${cnt(r => r.resn !== 'GLY' && !allowed(r))}`],
            }[step];
            info = box(390, lines[2] ? 200 : 140) + title(lines[0]) + big(lines[1], hcol) + (lines[2] ? small(lines[2]) : '');
            if (step === 6) hi += `<line x1="${f1(X(-65))}" y1="${Y0}" x2="${f1(X(-65))}" y2="${Y0 + S}" stroke="#7fdc6a" stroke-width="2.5" stroke-dasharray="8 6" opacity=".9"/>` +
              `<text x="${f1(X(-65) + 12)}" y="${Y0 + 40}" font-size="25" fill="#7fdc6a" font-family="Inter" font-weight="700" paint-order="stroke" stroke="#0b1224" stroke-width="5">φ ≈ −65°</text>`;
            if (step === 7) data.filter(r => r.resn !== 'GLY' && !allowed(r)).forEach(r => { hi += `<circle cx="${f1(X(r.phi))}" cy="${f1(Y(r.psi))}" r="12" fill="none" stroke="${C.danger}" stroke-width="2.5"/>`; });
          }
        }
        $('ra-hi').innerHTML = hi; $('ra-info').innerHTML = info;
      },
    };
  },
};
