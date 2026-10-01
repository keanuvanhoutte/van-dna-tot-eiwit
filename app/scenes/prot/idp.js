import { C, L, T2, svgOpen, cam, sub, ease, lerp, clamp, f1, CLASSCOL, AACLASS, THREE } from '../../kit.js';
import { T, TL, smooth, chain, enz, tag, arrowDefs, arr, panel, phos, lerpPts } from './_b_kit.js';

/* A (0–1600): geordend domein + IDR · B (1700–3300): sequentie + ladings-hydropathieplot · C (3400–5000): pKID–KIX · D (5100–6700): waarom */
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });
const IDC = '#7fdc6a';
const DOM = [520, 460];

/* deterministische "slierten": ensemble van conformaties */
function tail(x0, y0, seed, t, n = 14, step = 34) {
  const pts = [[x0, y0]]; let a = -.2, x = x0, y = y0;
  for (let i = 1; i <= n; i++) {
    a += .9 * Math.sin(seed * 1.7 + i * 1.3 + t * .0011 * (1 + (i % 3) * .3)) + .25 * Math.sin(t * .0023 + i * seed);
    a = clamp(a, -1.5, 1.5);
    x += Math.cos(a) * step; y += Math.sin(a) * step * .9;
    pts.push([x, y]);
  }
  return pts;
}

export default {
  id: 'idp',
  title: { nl: 'Intrinsiek ongeordende eiwitten', en: 'Intrinsically disordered proteins' },
  scale: '≈ 2–20 nm',
  time: { nl: 'conformaties wisselen in ns–µs', en: 'conformations interconvert in ns–µs' },
  org: { nl: 'mens (voorbeeld: CREB en CBP; structuur 1KDX van muis/rat)', en: 'human (example: CREB and CBP; structure 1KDX from mouse/rat)' },
  legend: [[IDC, { nl: 'ongeordende regio (IDR)', en: 'disordered region (IDR)' }], [C.prot, { nl: 'geordend domein (KIX, MDM2)', en: 'ordered domain (KIX, MDM2)' }], [CLASSCOL.h, { nl: 'hydrofoob', en: 'hydrophobic' }], [CLASSCOL['+'], { nl: 'positief', en: 'positive' }], [CLASSCOL['-'], { nl: 'negatief', en: 'negative' }], [CLASSCOL.p, { nl: 'polair', en: 'polar' }], [CLASSCOL.s, 'Gly / Pro'], ['#ff6b6b', { nl: 'fosfaat', en: 'phosphate' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">3D: pKID van CREB (rat) gebonden aan het KIX-domein van CBP (muis), PDB <a href="https://www.rcsb.org/structure/1KDX" target="_blank" rel="noopener">1KDX</a> (NMR); p53-transactivatiedomein op MDM2, PDB <a href="https://www.rcsb.org/structure/1YCR" target="_blank" rel="noopener">1YCR</a>.</p><p style="font-size:13px;color:#93a0bb">Waarom matige affiniteit? Vouwen tijdens het binden kost entropie, dus de binding is specifiek (groot contactvlak) maar snel omkeerbaar. Het p53-TAD bindt MDM2 als helix en andere partners in andere vormen. ~1/3 van de eukaryote eiwitten heeft een ongeordende regio van > 30 aa, bij bacteriën ~4 %.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">3D: pKID of CREB (rat) bound to the KIX domain of CBP (mouse), PDB <a href="https://www.rcsb.org/structure/1KDX" target="_blank" rel="noopener">1KDX</a> (NMR); p53 transactivation domain on MDM2, PDB <a href="https://www.rcsb.org/structure/1YCR" target="_blank" rel="noopener">1YCR</a>.</p><p style="font-size:13px;color:#93a0bb">Why moderate affinity? Folding upon binding costs entropy, so binding is specific (large interface) yet quickly reversible. The p53 TAD binds MDM2 as a helix and other partners in other shapes. ~1/3 of eukaryotic proteins has a disordered region of > 30 aa, in bacteria ~4 %.</p>' },
  simplified: {
    nl: 'De getoonde sequenties zijn illustratief, niet de echte CREB-sequentie. Het ensemble is een 2D-animatie; in werkelijkheid is een IDR een snel wisselende 3D-wolk van conformaties. KIX is als een bol getekend, pKID vormt in werkelijkheid twee helices (αA en αB) die rond KIX wikkelen. In de ladings-hydropathieplot zijn de punten schematisch; de grenslijn volgt Uversky et al. (2000).',
    en: 'The sequences shown are illustrative, not the real CREB sequence. The ensemble is a 2D animation; in reality an IDR is a rapidly changing 3D cloud of conformations. KIX is drawn as a sphere; in reality pKID forms two helices (αA and αB) that wrap around KIX. In the charge–hydropathy plot the points are schematic; the boundary follows Uversky et al. (2000).' },
  steps: [
    ST(8000, cam(800, 450, 1600), 'Niet elk eiwit heeft één vaste vorm', 'Not every protein has one fixed shape',
      'Veel eiwitten hebben stukken zonder vaste 3D-vorm: intrinsiek ongeordende regio\'s (IDR\'s). Een eiwit dat helemaal zo is, heet een IDP.',
      'Many proteins have parts without a fixed 3D shape: intrinsically disordered regions (IDRs). A protein that is entirely like that is an IDP.'),
    ST(8000, cam(900, 450, 1300), 'Een ensemble, geen structuur', 'An ensemble, not a structure',
      'Een IDR wisselt voortdurend van vorm. Een kristalstructuur of AlphaFold-model toont er daarom geen of een onzekere structuur.',
      'An IDR constantly changes shape. A crystal structure or AlphaFold model therefore shows no structure or an uncertain one.'),
    ST(8500, cam(2440, 250, 1550), 'Andere sequentie: weinig hydrofoob, veel lading', 'Different sequence: little hydrophobic, much charge',
      'IDR\'s hebben weinig grote waterschuwe aminozuren en veel geladen en polaire. Zonder hydrofobe kern is er niets om rond te vouwen.',
      'IDRs have few large water-avoiding amino acids and many charged and polar ones. Without a hydrophobic core there is nothing to fold around.'),
    ST(8500, cam(2500, 560, 1300), 'Lading tegenover waterschuwheid', 'Charge versus hydrophobicity',
      'Zet je netto lading uit tegen waterschuwheid (hydropathie), dan liggen IDP\'s links boven de grenslijn: veel lading, weinig hydrofoob.',
      'Plot net charge against water-avoidance (hydropathy) and IDPs lie above-left of the boundary: much charge, little hydrophobicity.'),
    ST(8000, cam(4000, 450, 1300), 'Een signaal: fosforylatie', 'A signal: phosphorylation',
      'Een stuk van de transcriptiefactor CREB (KID) is ongeordend. Na een signaal hangt het enzym PKA een fosfaat aan Ser133: pKID.',
      'A part of the transcription factor CREB (KID) is disordered. After a signal the enzyme PKA attaches a phosphate to Ser133: pKID.'),
    ST(9500, cam(4200, 450, 1200), 'Vouwen tijdens het binden', 'Folding upon binding',
      'pKID bindt eerst losjes aan het KIX-domein van CBP en vouwt dan op dat oppervlak tot twee helices: vouwen en binden gaan samen.',
      'pKID first binds loosely to the KIX domain of CBP, then folds on that surface into two helices: folding and binding go together.'),
    ST(9000, cam(5900, 460, 1650), 'Waarom ongeordend handig is', 'Why disorder is useful',
      'Zo\'n binding is specifiek maar snel weer los te maken. Eén IDR kan meerdere partners binden en is makkelijk te bereiken voor modificaties.',
      'Such binding is specific yet quickly undone. One IDR can bind several partners and is easy to reach for modifications.'),
    ST(8000, cam(5900, 460, 1650), 'IDP\'s in signalering en ziekte', 'IDPs in signalling and disease',
      'Vooral transcriptiefactoren en signaaleiwitten hebben veel IDR\'s. Sommige (Aβ, α-synucleïne) kunnen misvouwen tot vezelachtige klonten (amyloïd).',
      'Transcription factors and signalling proteins in particular have many IDRs. Some (Aβ, α-synuclein) can misfold into fibrous clumps (amyloid).'),
  ],
  svg() {
    /* paneel B: sequentiebalken */
    const ORD = 'MKVLIAFGWLDRCTYPEVLNAIFKW', DIS = 'SPEKSGESPKQSEEPSKRGSDEQPK';
    const seqRow = (seq, y, lab, col) => T(1760, y + 8, lab, { size: 24, col, anchor: 'start', w: 700 }) +
      seq.split('').map((a, i) => `<circle cx="${2140 + i * 44}" cy="${y}" r="19" fill="${CLASSCOL[AACLASS[a]]}" stroke="#0a1224" stroke-width="2"/>` + T(2140 + i * 44, y + 6, a, { size: 16, col: '#0a1224', halo: false, w: 800, font: 'JetBrains Mono' })).join('');
    let seqB = seqRow(ORD, 200, T2('geordend domein', 'ordered domain'), C.prot) + seqRow(DIS, 290, T2('ongeordende regio', 'disordered region'), IDC);
    seqB += T(2690, 362, T2('(illustratieve sequenties)', '(illustrative sequences)'), { size: 21, col: C.muted });
    /* paneel B-onder: ladings-hydropathieplot (Uversky 2000) */
    const PX = 2060, PY = 820, PW = 620, PH = 330;             // <H> 0..1 (x), <R> 0..0.5 (y)
    const px = h => PX + (h - .2) / .4 * PW, py = r => PY - r / .5 * PH; // x-bereik 0,2–0,6
    let plot = `<line x1="${PX}" y1="${PY}" x2="${PX + PW + 20}" y2="${PY}" stroke="${C.muted}" stroke-width="3" marker-end="url(#id-m)"/><line x1="${PX}" y1="${PY}" x2="${PX}" y2="${PY - PH - 20}" stroke="${C.muted}" stroke-width="3" marker-end="url(#id-m)"/>`;
    plot += T(PX + PW / 2, PY + 44, T2('gemiddelde hydropathie ⟨H⟩', 'mean hydropathy ⟨H⟩'), { size: 20, col: C.muted });
    plot += `<text x="${PX - 26}" y="${PY - PH / 2}" transform="rotate(-90 ${PX - 26} ${PY - PH / 2})" font-size="20" fill="${C.muted}" text-anchor="middle" font-family="Inter" font-weight="600">${T2('gemiddelde netto lading ⟨R⟩', 'mean net charge ⟨R⟩')}</text>`;
    // grens: <H> = (<R> + 1.151) / 2.785  →  R = 2.785 H − 1.151
    const hA = .42, hB = .5864; plot += `<line x1="${f1(px(hA))}" y1="${f1(py(2.785 * hA - 1.151 < 0 ? 0 : 2.785 * hA - 1.151))}" x2="${f1(px(hB))}" y2="${f1(py(2.785 * hB - 1.151))}" stroke="#fff" stroke-width="3" stroke-dasharray="10 6"/>`;
    plot += T(px(.585) + 8, py(.5) + 30, T2('grens', 'boundary'), { size: 18, anchor: 'start' });
    const P = [[.3, .28], [.33, .18], [.36, .35], [.28, .12], [.39, .22], [.31, .4]], Q = [[.47, .05], [.5, .1], [.46, .02], [.52, .07], [.49, .15], [.54, .04]];
    P.forEach(([h, r]) => plot += `<circle cx="${f1(px(h))}" cy="${f1(py(r))}" r="10" fill="${IDC}"/>`);
    Q.forEach(([h, r]) => plot += `<circle cx="${f1(px(h))}" cy="${f1(py(r))}" r="10" fill="${C.prot}"/>`);
    plot += T(px(.3), py(.46), T2('ongeordend', 'disordered'), { size: 22, col: IDC, w: 700 }) + T(px(.53), py(.25), T2('gevouwen', 'folded'), { size: 22, col: C.prot, w: 700 });
    plot += T(PX + PW + 40, PY - 250, T2('Uversky et al. 2000', 'Uversky et al. 2000'), { size: 17, col: C.muted, anchor: 'start' }) + T(PX + PW + 40, PY - 222, '⟨H⟩ₘₐₓ = (⟨R⟩ + 1,151) / 2,785', { size: 17, col: C.muted, anchor: 'start', font: 'JetBrains Mono' });

    /* paneel D: kaarten (rij 1 = stap 6, rij 2 verschijnt in stap 7) */
    const card = (x0, y0, title, line, col, node, lbl) => {
      const b = panel(x0, y0, 500, 220, { col }) + T(x0 + 250, y0 + 82, title, { size: 31, col, w: 800 }) + T(x0 + 250, y0 + 150, line, { size: 26, col: '#c9d2e4', w: 500 });
      return node ? `<g data-node="${node}" data-color="${col}" data-label="${lbl}">${b}<circle data-anchor="${node}" cx="${x0 + 250}" cy="${y0 + 2}" r="1" fill="none"/></g>` : b;
    };
    let row1 = '', row2 = '';
    row1 += card(5140, 190, T2('Specifiek maar omkeerbaar', 'Specific but reversible'), T2('groot contactvlak, matige affiniteit', 'large interface, moderate affinity'), C.prot, null);
    row1 += card(5680, 190, T2('Eén regio, veel partners', 'One region, many partners'), T2('p53-TAD: MDM2 en andere', 'p53 TAD: MDM2 and others'), '#5fd3e6', 'genregulatie', T2('Genregulatie', 'Gene regulation'));
    row1 += card(6220, 190, T2('Bereikbaar voor PTM\'s', 'Accessible to PTMs'), T2('bv. Ser133 van CREB', 'e.g. Ser133 of CREB'), '#ff6b6b', 'ptm', T2('Post-translationele modificaties', 'Post-translational modifications'));
    row2 += card(5140, 510, T2('Hoe vaak? (IDR > 30 aa)', 'How common? (IDR > 30 aa)'), T2('eukaryoten ~1/3 · bacteriën ~4 %', 'eukaryotes ~1/3 · bacteria ~4 %'), C.chain, 'vouwing', T2('Eiwitvouwing', 'Protein folding'));
    row2 += card(5680, 510, T2('Waar?', 'Where?'), T2('TF\'s, signaaleiwitten, linkers', 'TFs, signalling proteins, linkers'), '#ffc247', null);
    row2 += card(6220, 510, T2('Keerzijde: aggregatie', 'Downside: aggregation'), T2('Aβ, α-synucleïne → amyloïd', 'Aβ, α-synuclein → amyloid'), C.danger, 'misvouwing', T2('Misvouwing & aggregatie', 'Misfolding & aggregation'));
    const cards = `<g id="id-row1">${row1}</g><g id="id-row2" opacity="0">${row2}</g>`;

    return svgOpen(arrowDefs('id', { m: C.muted, w: '#fff' })) + `
    <g data-node="tertiair" data-color="${C.prot}" data-label="${T2('Geordend domein (tertiaire structuur)', 'Ordered domain (tertiary structure)')}">
      <ellipse cx="${DOM[0]}" cy="${DOM[1]}" rx="150" ry="120" fill="rgba(155,123,255,.2)" stroke="${C.prot}" stroke-width="4"/>
      ${[[-70, -30], [0, 30], [70, -20]].map(([dx, dy]) => { let d = ''; for (let k = 0; k <= 30; k++) d += `${k ? 'L' : 'M'}${f1(DOM[0] + dx - 40 + k * 2.7)},${f1(DOM[1] + dy + 12 * Math.sin(k * .75))}`; return `<path d="${d}" stroke="${C.prot}" stroke-width="6" fill="none"/>`; }).join('')}
      <circle data-anchor="tertiair" cx="${DOM[0]}" cy="${DOM[1] - 125}" r="1" fill="none"/>
    </g>
    <g id="id-tail"></g>
    <g id="id-a"></g>
    <g id="id-seqB" data-node="primair" data-color="${C.chain}" data-nolabel>${seqB}</g>
    <g id="id-seq"></g>
    <g id="id-plot">${plot}</g>
    <g id="id-c"></g>
    <g data-node="gpcr" data-color="${C.prot}" data-nolabel><g id="id-pka"></g></g>
    ${cards}
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const KIX = [4300, 470];
    // pKID-helices op KIX (gebonden), en ongebonden sliert
    const helixPts = (x0, y0, x1, y1, amp = 13, turns = 5) => { const pts = [], n = turns * 8, dx = x1 - x0, dy = y1 - y0, L0 = Math.hypot(dx, dy), nx = -dy / L0, ny = dx / L0; for (let i = 0; i <= n; i++) { const u = i / n, s = Math.sin(u * turns * 2 * Math.PI) * amp; pts.push([x0 + dx * u + nx * s, y0 + dy * u + ny * s]); } return pts; };
    const bound = [...helixPts(4140, 340, 4320, 335), ...helixPts(4350, 345, 4465, 480, 13, 4).slice(1)];
    return {
      update(t, s) {
        const { step, p } = s;
        /* ---------- paneel A: IDR als ensemble ---------- */
        let tl = '', a = '';
        if (step <= 1) {
          const n = step === 1 ? 6 : 1;
          for (let k = 0; k < n; k++) {
            const pts = tail(DOM[0] + 150, DOM[1], 1 + k * .9, t + k * 700);
            const op = k === 0 ? 1 : .28;
            tl += chain(pts, { col: IDC, w: k === 0 ? 8 : 5, op });
          }
          a += T(DOM[0], DOM[1] + 175, T2('gevouwen domein', 'folded domain'), { size: 22, col: C.prot });
          a += T(1100, 250, T2('ongeordende regio (IDR)', 'disordered region (IDR)'), { size: 22, col: IDC });
          if (step === 1) {
            const k = sub(p, .4, .6);
            a += panel(1060, 600, 480, 170, { op: k }) + T(1300, 645, T2('experimenteel/voorspeld:', 'experimental/predicted:'), { size: 19, col: C.muted, op: k }) +
              T(1300, 685, T2('geen elektronendichtheid (X-ray)', 'no electron density (X-ray)'), { size: 20, op: k }) + T(1300, 720, T2('AlphaFold: pLDDT < 50', 'AlphaFold: pLDDT < 50'), { size: 20, op: k, font: 'JetBrains Mono' }) +
              T(1300, 752, T2('NMR: scherpe, weinig verspreide pieken', 'NMR: sharp, poorly dispersed peaks'), { size: 18, op: k, col: '#c9d2e4' });
          }
        }
        $('id-tail').innerHTML = tl; $('id-a').innerHTML = a;

        /* ---------- paneel B: telling ---------- */
        let sq = '';
        if (step === 2) {
          const k = sub(p, .35, .6);
          sq += T(2690, 410, T2('boven: 14 van 25 hydrofoob · onder: 0 hydrofoob, 11 geladen', 'top: 14 of 25 hydrophobic · bottom: 0 hydrophobic, 11 charged'), { size: 22, op: k });
        }
        $('id-seq').innerHTML = sq;
        $('id-plot').setAttribute('opacity', step === 2 ? '0.15' : step === 3 ? f1(.15 + .85 * sub(p, 0, .25)) : '1');
        $('id-seqB').setAttribute('opacity', step <= 2 ? '1' : step === 3 ? f1(1 - sub(p, 0, .06)) : '0');

        /* ---------- paneel C: CREB-KID + KIX ---------- */
        let c = '', pka = '';
        if (step >= 4 && step <= 5) {
          c += enz(KIX[0], KIX[1] + 20, 150, 125, '', { col: C.prot, fillOp: .25 }) + T(KIX[0], KIX[1] + 60, T2('KIX-domein (CBP)', 'KIX domain (CBP)'), { size: 24, col: '#c9b8ff', w: 700 });
          const phK = step === 4 ? sub(p, .45, .7) : 1;
          const bind = step === 5 ? ease(sub(p, .05, .4)) : 0, fold = step === 5 ? ease(sub(p, .45, .85)) : 0;
          // ongebonden sliert
          const free = tail(3620, 330, 2.3, t, 14, 30);
          const target = bound.length;
          // interpoleer vrij → los (dicht bij KIX) → gevouwen
          const near = bound.map((q, i) => [q[0] + 30 * Math.sin(i * .9 + t * .002), q[1] - 40 + 25 * Math.cos(i * .7 + t * .0017)]);
          const freeR = Array.from({ length: target }, (_, i) => free[Math.round(i / (target - 1) * (free.length - 1))]);
          const mid = lerpPts(freeR, near, bind), pts = lerpPts(mid, bound, fold);
          c += chain(pts, { col: IDC, w: 8 });
          // Ser133 op ~1/3 van de keten
          const si = Math.round(target * .3), sp = pts[si];
          c += `<circle cx="${f1(sp[0])}" cy="${f1(sp[1])}" r="16" fill="${CLASSCOL.p}" stroke="#0a1224" stroke-width="2"/>` + T(sp[0], sp[1] + 5, 'S', { size: 14, col: '#0a1224', halo: false, w: 800 });
          c += phos(sp[0] + 20, sp[1] - 28, 15, phK);
          if (step === 4) {
            pka += enz(3780, 180, 90, 40, 'PKA', { fs: 22, op: sub(p, .15, .3) * (1 - sub(p, .8, 1)), fillOp: .5 }) + tag(3920, 150, 'ATP → ADP', '#5fd3e6', { fs: 19, op: sub(p, .35, .5) * (1 - sub(p, .8, 1)) });
            c += T(3620, 650, T2('KID van CREB: ongeordend', 'KID of CREB: disordered'), { size: 22, col: IDC });
            pka += T(sp[0] + 60, sp[1] - 60, 'Ser133-P', { size: 20, col: '#ff6b6b', op: phK, anchor: 'start' });
          }
          if (step === 5) {
            c += T(4300, 180, fold < .5 ? T2('1. ontmoetingscomplex: los, niet-specifiek', '1. encounter complex: loose, non-specific') : T2('2. gevouwen: twee helices (αA, αB)', '2. folded: two helices (αA, αB)'), { size: 22, col: fold < .5 ? '#c9d2e4' : IDC, op: sub(p, .2, .35) });
            c += T(4500, 390, 'pKID', { size: 24, col: IDC, w: 800, op: fold, anchor: 'start' });
            c += T(4300, 760, T2('→ CBP wordt gerekruteerd: CREB-doelgenen aan', '→ CBP is recruited: CREB target genes on'), { size: 20, col: C.text, op: sub(p, .85, .97) });
          }
        }
        $('id-c').innerHTML = c; $('id-pka').innerHTML = pka;   // PKA (cAMP-route) is klikbaar
        /* ---------- paneel D ---------- */
        $('id-row2').setAttribute('opacity', f1(step === 7 ? ease(sub(p, .1, .5)) : step > 7 ? 1 : 0));
      },
    };
  },
};
