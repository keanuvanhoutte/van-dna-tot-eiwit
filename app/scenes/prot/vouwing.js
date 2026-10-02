import { C, L, T2, svgOpen, txt, cam, FULL, sub, ease, lerp, clamp, f1, rng, AACLASS, CLASSCOL } from '../../kit.js';

/*
 * Vouwing als HP-roostermodel (Lau & Dill 1989): 40 residuen van β-globine, H = hydrofoob (A V L I M F W), P = de rest.
 * Bij het laden draait een deterministische Monte-Carlo-simulatie (simulated annealing) die het contact tussen H-residuen
 * maximaliseert. De animatie toont die echte trajectorie: van random coil via collaps naar een compacte toestand.
 */
const SEQ = 'VHLTPEEKSAVTALWGKVNVDEVGGEALGRLLVVYPWTQR';          // β-globine residuen 1–40 (UniProt P68871, zonder Met)
const HP = [...SEQ].map(a => AACLASS[a] === 'h');
const N = SEQ.length, A = 46, CX = 640, CY = 440;
const DIRS = [[1, 0], [0, 1], [-1, 0], [0, -1]];

function simulate(seed = 20240917) {
  const r = rng(seed);
  let P = Array.from({ length: N }, (_, i) => [i, 0]);
  const key = (x, y) => (x + 500) * 2000 + (y + 500);
  const valid = Q => { const s = new Set(); for (const [x, y] of Q) { const k = key(x, y); if (s.has(k)) return false; s.add(k); } return true; };
  const energy = Q => {
    const m = new Map(); Q.forEach(([x, y], i) => m.set(key(x, y), i));
    let e = 0;
    Q.forEach(([x, y], i) => { if (!HP[i]) return; for (const [dx, dy] of DIRS) { const j = m.get(key(x + dx, y + dy)); if (j !== undefined && j > i + 1 && HP[j]) e--; } });
    return e;
  };
  const OPS = [([x, y]) => [-y, x], ([x, y]) => [-x, -y], ([x, y]) => [y, -x], ([x, y]) => [x, -y], ([x, y]) => [-x, y]];
  function pivot(Q) {
    const k = 1 + Math.floor(r() * (N - 2)), op = OPS[Math.floor(r() * OPS.length)], c = Q[k];
    const side = r() < .5;
    return Q.map((p, i) => (side ? i > k : i < k) ? (([dx, dy]) => [c[0] + dx, c[1] + dy])(op([p[0] - c[0], p[1] - c[1]])) : p);
  }
  function local(Q) {
    const i = Math.floor(r() * N), R = Q.slice();
    if (i === 0 || i === N - 1) {
      const nb = Q[i === 0 ? 1 : N - 2], d = DIRS[Math.floor(r() * 4)];
      R[i] = [nb[0] + d[0], nb[1] + d[1]];
    } else {
      const a = Q[i - 1], b = Q[i + 1];
      if (Math.abs(a[0] - b[0]) === 1 && Math.abs(a[1] - b[1]) === 1) R[i] = [a[0] + b[0] - Q[i][0], a[1] + b[1] - Q[i][1]];
      else return null;
    }
    return R;
  }
  // 1. random coil (alle geldige pivots aanvaard)
  for (let k = 0; k < 4000; k++) { const Q = pivot(P); if (valid(Q)) P = Q; }
  let E = energy(P), best = { P, E };
  const snaps = [{ P, E }];
  const IT = 70000;
  for (let k = 0; k < IT; k++) {
    const T = 2.2 * Math.pow(0.12 / 2.2, k / IT);
    const Q = r() < .35 ? pivot(P) : local(P);
    if (!Q || !valid(Q)) continue;
    const E2 = energy(Q);
    if (E2 <= E || r() < Math.exp((E - E2) / T)) { P = Q; E = E2; if (E < best.E) best = { P, E }; }
    if (k % 350 === 0) snaps.push({ P, E });
  }
  snaps.push(best, best);
  // centreren
  for (const s of snaps) {
    const cx = s.P.reduce((a, p) => a + p[0], 0) / N, cy = s.P.reduce((a, p) => a + p[1], 0) / N;
    s.C = s.P.map(p => [p[0] - cx, p[1] - cy]);
    s.rg = Math.sqrt(s.C.reduce((a, p) => a + p[0] * p[0] + p[1] * p[1], 0) / N);
  }
  return { snaps, best };
}

const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });
const PX = 1130;

export default {
  id: 'vouwing',
  title: { nl: 'Eiwitvouwing', en: 'Protein folding' },
  scale: '≈ 2–5 nm', time: { nl: 'µs tot s (afhankelijk van het eiwit)', en: 'µs to s (depending on the protein)' },
  org: { nl: 'mens (β-globine, residuen 1–40)', en: 'human (β-globin, residues 1–40)' },
  legend: [[CLASSCOL.h, { nl: 'hydrofoob (H)', en: 'hydrophobic (H)' }], [CLASSCOL.p, { nl: 'polair', en: 'polar' }], [CLASSCOL['+'], { nl: 'positief', en: 'positive' }], [CLASSCOL['-'], { nl: 'negatief', en: 'negative' }], [CLASSCOL.s, 'Gly / Pro'], ['#4f8ff7', { nl: 'water', en: 'water' }], [C.rrna, { nl: 'ribosoom', en: 'ribosome' }], [C.prot, 'chaperone']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">De vouwanimatie is een echte (kleine) simulatie: het 2D-HP-roostermodel van Lau &amp; Dill (1989). Elk residu van β-globine 1–40 is H (hydrofoob: A, V, L, I, M, F, W) of P (rest). De energie is −1 per contact tussen twee H-residuen die niet naast elkaar in de keten liggen. Monte-Carlo-stappen met dalende temperatuur (simulated annealing) zoeken de laagste energie.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">The folding animation is a real (small) simulation: the 2D HP lattice model of Lau &amp; Dill (1989). Each residue of β-globin 1–40 is H (hydrophobic: A, V, L, I, M, F, W) or P (the rest). The energy is −1 per contact between two H residues that are not neighbours in the chain. Monte Carlo moves with decreasing temperature (simulated annealing) search for the lowest energy.</p>' },
  simplified: {
    nl: 'Het HP-roostermodel is sterk vereenvoudigd: 2D, één bolletje per residu, alleen hydrofobe contacten en geen water of H-bruggen. Het toont het principe (hydrofobe collaps, energietrechter), niet de echte vouwing van β-globine, die in de cel samen met de α-keten en het heem gebeurt. Het ribosoom is een schets. Levinthal-getallen zijn een gedachte-experiment.',
    en: 'The HP lattice model is strongly simplified: 2D, one bead per residue, only hydrophobic contacts and no water or H-bonds. It shows the principle (hydrophobic collapse, energy funnel), not the real folding of β-globin, which in the cell happens together with the α chain and the haem. The ribosome is a sketch. Levinthal numbers are a thought experiment.' },
  steps: [
    ST(8000, cam(620, 388, 1250), 'De keten komt uit het ribosoom', 'The chain leaves the ribosome', 'De nieuwe keten komt met haar begin eerst naar buiten. Ze begint al te vouwen terwijl ze nog groeit.', 'The new chain comes out start first. It already begins to fold while it is still growing.'),
    ST(9000, FULL, 'Een losse, slappe keten', 'A loose, floppy chain', 'In water kan de losse keten talloze vormen aannemen. De waterschuwe aminozuren (groen) liggen bloot.', 'In water the loose chain can take countless shapes. The water-avoiding amino acids (green) are exposed.'),
    ST(9000, FULL, 'De keten klapt samen', 'The chain collapses', 'De waterschuwe aminozuren kruipen samen en duwen water weg. Zo wordt de keten snel compact.', 'The water-avoiding amino acids huddle together and push water away. The chain quickly becomes compact.'),
    ST(8500, FULL, 'Eerst losjes, dan de juiste vorm', 'First loose, then the right shape', 'Eerst een compacte, nog wiebelige tussenvorm. Dan de eindvorm: waterschuwe delen binnen, waterminnende buiten.', 'First a compact but still wobbly in-between form. Then the final shape: water-avoiding parts inside, water-loving outside.'),
    ST(9000, FULL, 'De volgorde bepaalt de vorm', 'The sequence decides the shape', 'Anfinsen ontvouwde een enzym met chemicaliën. Zonder die stoffen vouwde het vanzelf terug en werkte het weer.', 'Anfinsen unfolded an enzyme with chemicals. Once they were removed, it refolded by itself and worked again.'),
    ST(8500, FULL, 'Alles uitproberen duurt te lang', 'Trial and error takes too long', 'Elke vorm uitproberen zou langer duren dan het heelal oud is. Toch vouwt een eiwit in seconden of sneller.', 'Trying every shape would take longer than the age of the universe. Yet a protein folds in seconds or faster.'),
    ST(9500, FULL, 'Bergaf rollen in een trechter', 'Rolling downhill in a funnel', 'Vouwen is geen blind zoeken maar bergaf rollen: elk contact verlaagt de energie, tot de eindvorm.', 'Folding is not a blind search but rolling downhill: each contact lowers the energy, down to the final shape.'),
    ST(8500, FULL, 'Hulp en valkuilen', 'Help and pitfalls', 'Vouwhelpers (chaperones) schermen waterschuwe stukken af. Loopt het toch mis, dan kan het eiwit klonteren.', 'Folding helpers (chaperones) shield water-avoiding stretches. If it still goes wrong, the protein can clump.'),
    ST(7500, FULL, 'Van keten naar vorm: vier niveaus', 'From chain to shape: four levels', 'Primair (volgorde) → secundair (spiralen, bladen) → tertiair (één keten) → quaternair (meerdere ketens).', 'Primary (order) → secondary (spirals, sheets) → tertiary (one chain) → quaternary (several chains).'),
  ],
  svg() {
    return svgOpen() + `
    <g id="vo-bg"></g>
    <g data-node="disulfide" data-color="#ffd84a" data-nolabel><g id="vo-ss"></g></g>
    <g id="vo-water"></g>
    <g id="vo-chain"></g>
    <g id="vo-over"></g>
    <g data-node="chaperones" data-color="${C.prot}" data-nolabel><g id="vo-tric"></g></g>
    <g id="vo-panel"></g>
    <g id="vo-hs-tl" data-node="translatie" data-color="${C.rrna}" data-label="${T2('Terug: translatie', 'Back: translation')}">
      <path d="M140,300 C120,190 190,110 330,100 C470,92 560,160 560,250 C560,300 530,330 480,330 L200,330 C170,330 146,320 140,300Z" fill="rgba(44,198,168,.15)" stroke="${C.rrna}" stroke-width="3"/>
      <path d="M140,340 C150,390 230,420 350,420 C470,420 540,390 550,340 Z" fill="rgba(44,198,168,.22)" stroke="${C.rrna}" stroke-width="3"/>
      <path d="M350,230 C400,200 470,180 560,170" stroke="rgba(44,198,168,.55)" stroke-width="30" fill="none" stroke-linecap="round"/>
      ${txt(330, 300, T2('ribosoom (80S)', 'ribosome (80S)'), C.rrna, 24)}
      ${txt(330, 172, T2('uitgangstunnel', 'exit tunnel'), '#9fb0cc', 21)}
      <line x1="140" y1="335" x2="560" y2="335" stroke="${C.rna}" stroke-width="5"/>
      <circle data-anchor="translatie" cx="330" cy="420" r="1" fill="none" data-pos="below"/>
    </g>
    <g id="vo-hs-ch" data-node="chaperones" data-color="${C.prot}" data-label="${T2('Chaperones', 'Chaperones')}">
      <g id="vo-hsp"></g><circle id="vo-hspA" data-anchor="chaperones" data-pos="below" cx="0" cy="0" r="1" fill="none"/>
    </g>
    <g id="vo-hs-mis" data-node="misvouwing" data-color="${C.danger}" data-label="${T2('Misvouwing & aggregatie', 'Misfolding & aggregation')}">
      <g id="vo-agg"></g><circle data-anchor="misvouwing" cx="1350" cy="560" r="1" fill="none"/>
    </g>
    <g id="vo-hs-idp" data-node="idp" data-color="#5fd3e6" data-label="${T2('Ongeordende eiwitten', 'Disordered proteins')}">
      <rect x="1110" y="684" width="480" height="62" rx="31" fill="rgba(95,211,230,.10)" stroke="#5fd3e6"/>
      ${txt(1350, 724, T2('sommige eiwitten vouwen nooit vast', 'some proteins never fold rigidly'), '#5fd3e6', 24)}
      <circle data-anchor="idp" cx="1350" cy="684" r="1" fill="none"/>
    </g>
    <g id="vo-hs-lv">
      ${[['primair', T2('Primair', 'Primary'), CLASSCOL.h, 180], ['secundair', T2('Secundair', 'Secondary'), C.prot, 520], ['tertiair', T2('Tertiair', 'Tertiary'), C.prot2, 860], ['quaternair', T2('Quaternair', 'Quaternary'), C.prot3, 1200]].map(([id, lab, col, x], i) =>
        `<g data-node="${id}" data-color="${col}" data-label="${lab}" data-nolabel><rect x="${x}" y="700" width="260" height="70" rx="16" fill="${col}" fill-opacity=".18" stroke="${col}" stroke-width="2.5"/>${txt(x + 130, 745, `${i + 1}. ${lab}`, C.text, 24)}</g>` + (i < 3 ? txt(x + 300, 747, '→', C.muted, 30) : '')).join('')}
    </g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const sim = simulate();
    const S = sim.snaps, M = S.length - 1;
    const rgF = S[M].rg;
    const iCollapse = Math.max(8, S.findIndex(s => s.rg < rgF * 1.35));
    const iMolten = Math.max(iCollapse + 5, S.findIndex(s => s.E <= Math.round(sim.best.E * .8)));
    // posities op een continue "tijd" u (0..M)
    const at = u => {
      const i = Math.max(0, Math.min(M - 1, Math.floor(u))), f = clamp(u - i);
      return S[i].C.map((p, k) => [lerp(p[0], S[i + 1].C[k][0], f), lerp(p[1], S[i + 1].C[k][1], f)]);
    };
    // Levinthal-stap: negen uiteenlopende toestanden uit de simulatie, elk passend gemaakt in een vakje van 192 × 122
    const LEV = [0, .03, .06, .1, .16, .25, .4, .65, 1].map(f => {
      const P = S[Math.round(f * M)].C, mx = Math.max(...P.map(q => Math.abs(q[0]))), my = Math.max(...P.map(q => Math.abs(q[1])));
      const sc = Math.min(15, 84 / (mx + .5), 50 / (my + .5));
      return { P, sc, r: Math.max(3, sc * .46) };
    });
    const W = rng(7); const WATER = Array.from({ length: 150 }, () => [W() * 1100 + 90, W() * 620 + 130]);
    const bead = (x, y, a, r = 17, op = 1, letter = true) => `<g opacity="${f1(op)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${CLASSCOL[AACLASS[a]]}" stroke="#0a1224" stroke-width="2"/>${letter ? `<text x="${f1(x)}" y="${f1(y + r * .36)}" font-size="${Math.round(r * .95)}" text-anchor="middle" fill="#0a1224" font-family="JetBrains Mono" font-weight="700">${a}</text>` : ''}</g>`;
    function chainSVG(Pp, { jitter = 0, t = 0, contacts = false, cx = CX, cy = CY, sc = A, r = 17, letters = true } = {}) {
      const pts = Pp.map(([x, y], i) => [cx + x * sc + jitter * Math.sin(t * .004 + i * 1.7), cy + y * sc + jitter * Math.cos(t * .0037 + i * 2.3)]);
      let s = '';
      if (contacts) {
        const m = new Map(); Pp.forEach(([x, y], i) => m.set(Math.round(x) + ',' + Math.round(y), i));
        Pp.forEach(([x, y], i) => { if (!HP[i]) return; for (const [dx, dy] of DIRS) { const j = m.get(Math.round(x + dx) + ',' + Math.round(y + dy)); if (j !== undefined && j > i + 1 && HP[j]) s += `<line x1="${f1(pts[i][0])}" y1="${f1(pts[i][1])}" x2="${f1(pts[j][0])}" y2="${f1(pts[j][1])}" stroke="${CLASSCOL.h}" stroke-width="4" stroke-dasharray="5 5" opacity=".8"/>`; } });
      }
      s = `<path d="M${pts.map(p => f1(p[0]) + ',' + f1(p[1])).join(' L')}" stroke="${C.chain}" stroke-width="6" fill="none" stroke-linejoin="round" opacity=".85"/>` + s;
      s += pts.map((p, i) => bead(p[0], p[1], SEQ[i], r, 1, letters)).join('');
      const dx = pts[0][0] - pts[1][0], dy = pts[0][1] - pts[1][1], dl = Math.hypot(dx, dy) || 1, nx = pts[0][0] + dx / dl * (r + 16), ny = pts[0][1] + dy / dl * (r + 16) + 8;
      s += `<text x="${f1(nx)}" y="${f1(ny)}" font-size="22" text-anchor="middle" fill="#6fa8ff" font-family="Inter" font-weight="700" paint-order="stroke" stroke="#070b16" stroke-width="4">N</text>`;
      return { s, pts };
    }
    function waterSVG(pts, push) {
      return WATER.map(([x, y]) => {
        let near = 1e9; for (const p of pts) near = Math.min(near, Math.hypot(p[0] - x, p[1] - y));
        const op = near < 30 ? 0 : near < 60 ? .3 : .55;
        return `<circle cx="${f1(x)}" cy="${f1(y)}" r="5" fill="#4f8ff7" opacity="${f1(op * push)}"/>`;
      }).join('');
    }
    const panel = (y, h, inner) => `<rect x="${PX}" y="${y}" width="420" height="${h}" rx="16" fill="#0d1426" stroke="#2a3550" stroke-width="2"/>${inner}`;
    const T = (y, s, col = '#c3cde2', size = 19, w = 600) => txt(PX + 24, y, s, col, size, 'start', w);
    const contactsOf = Pp => { let e = 0; const m = new Map(); Pp.forEach(([x, y], i) => m.set(Math.round(x) + ',' + Math.round(y), i)); Pp.forEach(([x, y], i) => { if (!HP[i]) return; for (const [dx, dy] of DIRS) { const j = m.get(Math.round(x + dx) + ',' + Math.round(y + dy)); if (j !== undefined && j > i + 1 && HP[j]) e++; } }); return e; };
    const energyPlot = (u, x0, y0, w, h) => {
      const Emin = sim.best.E;
      let d = '';
      for (let i = 0; i <= Math.min(M, Math.floor(u)); i++) d += `${i ? 'L' : 'M'}${f1(x0 + i / M * w)},${f1(y0 + S[i].E / Emin * h)}`;
      return `<line x1="${x0}" y1="${y0}" x2="${x0 + w}" y2="${y0}" stroke="#2a3550" stroke-width="2"/><line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y0 + h}" stroke="#2a3550" stroke-width="2"/>` +
        `<path d="${d}" stroke="${C.trna}" stroke-width="3" fill="none"/>` + txt(x0 - 10, y0 + 8, '0', C.muted, 22, 'end') + txt(x0 - 10, y0 + h + 8, '−' + (-Emin), C.muted, 22, 'end') +
        txt(x0 - 58, y0 + h / 2 + 8, 'E', C.trna, 24) + txt(x0 + w / 2, y0 + h + 40, T2('simulatiestappen →', 'simulation steps →'), C.muted, 22);
    };
    return {
      update(t, s) {
        const { step, p } = s;
        let bg = '', water = '', ch = '', over = '', pan = '', hsp = '', agg = '', ssg = '', tric = '';
        $('vo-hs-tl').setAttribute('opacity', step === 0 ? 1 : 0);
        $('vo-hs-ch').setAttribute('opacity', step === 0 || step === 7 ? 1 : 0);
        $('vo-hs-mis').setAttribute('opacity', step === 7 ? 1 : 0);
        $('vo-hs-idp').setAttribute('opacity', step === 7 ? 1 : 0);
        $('vo-hs-lv').setAttribute('opacity', step === 8 ? 1 : 0);

        if (step === 0) {
          // keten komt uit de tunnel; de eerste residuen vormen al een kleine helix-achtige krul
          const n = Math.round(6 + 16 * ease(p));
          const pts = [];
          for (let i = 0; i < n; i++) {
            const d = n - 1 - i;                      // afstand vanaf de tunnel-uitgang (N-terminus = verst)
            let x = 590 + d * 30, y = 165 + Math.sin(d * .8) * 10;
            if (d > 8) { const a = (d - 8) * 1.75; x = 590 + 8 * 30 + 40 + Math.cos(a) * 36 + (d - 8) * 9; y = 165 + 40 + Math.sin(a) * 36; }
            pts.push([x, y, SEQ[i]]);
          }
          ch += `<path d="M560,170 L${pts.slice().reverse().map(q => f1(q[0]) + ',' + f1(q[1])).join(' L')}" stroke="${C.chain}" stroke-width="5" fill="none"/>`;
          ch += pts.map(([x, y, a]) => bead(x, y, a, 15)).join('');
          ch += txt(pts[0][0] + 20, pts[0][1] - 95, T2('N-terminus', 'N-terminus'), '#6fa8ff', 22);
          hsp = `<ellipse cx="760" cy="265" rx="60" ry="36" fill="${C.prot}" fill-opacity=".3" stroke="${C.prot}" stroke-width="3" opacity="${f1(sub(p, .4, .7))}"/>` + `<text x="760" y="272" font-size="21" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="700" opacity="${f1(sub(p, .4, .7))}">Hsp70</text>`;
          $('vo-hspA').setAttribute('cx', 760); $('vo-hspA').setAttribute('cy', 302);
        } else if (step >= 1 && step <= 3) {
          let u, jitter = 0, push = 1;
          if (step === 1) u = iCollapse * .25 * ease(p);
          else if (step === 2) u = lerp(iCollapse * .25, iMolten, ease(p));
          else { u = lerp(iMolten, M, ease(sub(p, 0, .8))); jitter = 5 * (1 - sub(p, .3, .9)); }
          if (step === 2) jitter = 3;
          const Pp = at(u);
          const r = chainSVG(Pp, { jitter, t, contacts: step === 3 && p > .8 });
          ch = r.s; water = waterSVG(r.pts, push);
          const nc = contactsOf(Pp);
          pan = panel(150, 360, T(200, T2('HP-model (β-globine 1–40)', 'HP model (β-globin 1–40)'), C.text, 24, 700) +
            T(252, T2('H–H-contacten', 'H–H contacts'), '#c3cde2', 24) + `<text x="${PX + 250}" y="254" font-size="34" fill="${CLASSCOL.h}" font-family="JetBrains Mono" font-weight="700">${nc}</text>` +
            energyPlot(u, PX + 90, 300, 300, 130));
          if (step === 3 && p > .8) over += txt(CX, 130, T2('hydrofobe kern (streepjes: H–H-contacten)', 'hydrophobic core (dashes: H–H contacts)'), CLASSCOL.h, 24);
          if (step === 2 && p > .5) over += txt(CX, 130, T2('water wordt weggeduwd', 'water is pushed away'), '#4f8ff7', 24);
        } else if (step === 4) {
          // Anfinsen-experiment met ribonuclease A (124 residuen, 4 disulfidebruggen)
          const cols = [220, 800, 1380], y = 390;
          const k1 = ease(sub(p, .1, .35)), k2 = ease(sub(p, .5, .75));
          const blobN = (x, op) => `<g opacity="${f1(op)}"><path d="M${x - 110},${y} C${x - 120},${y - 110} ${x + 40},${y - 140} ${x + 100},${y - 60} C${x + 150},${y + 10} ${x + 60},${y + 110} ${x - 20},${y + 100} C${x - 90},${y + 95} ${x - 105},${y + 50} ${x - 110},${y}Z" fill="${C.prot}" fill-opacity=".22" stroke="${C.prot}" stroke-width="4"/>` +
            [[-50, -40, 20, -70], [30, 20, 70, -20], [-60, 40, -10, 70], [10, -20, -30, 10]].map(([a, b, c, d]) => `<line x1="${x + a}" y1="${y + b}" x2="${x + c}" y2="${y + d}" stroke="#ffd84a" stroke-width="5"/>`).join('') + '</g>';
          const coil = (x, op) => { let d = `M${x - 200},${y}`; for (let i = 1; i <= 16; i++) d += ` Q${x - 200 + i * 25 - 12},${y + (i % 2 ? -50 : 50)} ${x - 200 + i * 25},${y + Math.sin(i) * 12}`; return `<g opacity="${f1(op)}"><path d="${d}" stroke="${C.prot}" stroke-width="5" fill="none"/>` + [0, 1, 2, 3, 4, 5, 6, 7].map(i => `<circle cx="${x - 180 + i * 52}" cy="${y + (i % 2 ? 26 : -26)}" r="7" fill="#ffd84a"/>`).join('') + '</g>'; };
          const lab = (x, yy, s2, col = '#fff') => txt(x, yy, s2, col, 23);
          bg += blobN(cols[0], 1) + txt(cols[0], y - 170, T2('natief · actief', 'native · active'), C.ok, 26) + lab(cols[0], y + 170, T2('4 S–S-bruggen', '4 S–S bridges'), '#ffd84a');
          bg += `<g opacity="${f1(k1)}"><path d="M${cols[0] + 165},${y} H${cols[1] - 225}" stroke="#fff" stroke-width="4" marker-end="url(#arrow)"/>` + lab((cols[0] + cols[1]) / 2 - 10, y - 104, T2('+ ureum (8 M)', '+ urea (8 M)')) + lab((cols[0] + cols[1]) / 2 - 10, y - 74, '+ β-mercapto-ethanol') +
            coil(cols[1], 1) + txt(cols[1], y - 170, T2('ontvouwen · inactief', 'unfolded · inactive'), C.danger, 26) + lab(cols[1], y + 170, T2('S–S verbroken → 8 × SH', 'S–S broken → 8 × SH'), '#ffd84a') + '</g>';
          bg += `<g opacity="${f1(k2)}"><path d="M${cols[1] + 225},${y} H${cols[2] - 165}" stroke="#fff" stroke-width="4" marker-end="url(#arrow)"/>` + lab((cols[1] + cols[2]) / 2 + 10, y - 104, T2('stoffen weg (dialyse)', 'remove them (dialysis)')) + lab((cols[1] + cols[2]) / 2 + 10, y - 74, T2('+ O₂ (lucht)', '+ O₂ (air)')) +
            blobN(cols[2], 1) + txt(cols[2], y - 170, T2('opnieuw natief · actief', 'native again · active'), C.ok, 26) + lab(cols[2], y + 170, T2('zelfde 4 S–S-bruggen', 'same 4 S–S bridges'), '#ffd84a') + '</g>';
          ssg = bg; bg = '';
          over += txt(800, 140, T2('Ribonuclease A (124 residuen) · Anfinsen', 'Ribonuclease A (124 residues) · Anfinsen'), C.text, 26);
        } else if (step === 5) {
          // links: enkele van de vele mogelijke vormen (echte toestanden uit de simulatie), van bij het begin zichtbaar;
          // een kader loopt ze één voor één af ("alles uitproberen"). Rechts: de getallen.
          const k = ease(sub(p, 0, .1)), k2 = ease(sub(p, .4, .65));
          over += `<rect x="200" y="160" width="1200" height="520" rx="20" fill="#0d1426" stroke="#2a3550" stroke-width="2"/>`;
          over += txt(800, 225, T2('Gedachte-experiment (Levinthal, 1969)', 'Thought experiment (Levinthal, 1969)'), C.text, 28);
          const cur = Math.min(LEV.length - 1, Math.floor(clamp(p / .85) * LEV.length));
          LEV.forEach((m, i) => {
            const x = 232 + (i % 3) * 204, y = 258 + Math.floor(i / 3) * 134, on = i === cur;
            over += `<rect x="${x}" y="${y}" width="192" height="122" rx="12" fill="#131c34" stroke="${on ? C.trna : '#34426a'}" stroke-width="${on ? 4 : 2}"/>` +
              `<path d="M${m.P.map(q => f1(x + 96 + q[0] * m.sc) + ',' + f1(y + 61 + q[1] * m.sc)).join(' L')}" stroke="${C.chain}" stroke-width="3" fill="none" stroke-linejoin="round" opacity=".8"/>` +
              m.P.map((q, j) => `<circle cx="${f1(x + 96 + q[0] * m.sc)}" cy="${f1(y + 61 + q[1] * m.sc)}" r="${f1(m.r)}" fill="${CLASSCOL[AACLASS[SEQ[j]]]}"/>`).join('');
          });
          const RX = 1130;
          over += txt(RX, 300, T2('100 residuen × 3 standen per residu', '100 residues × 3 states per residue'), '#c3cde2', 23);
          over += `<g opacity="${f1(k)}">` +
            `<text x="${RX}" y="378" font-size="50" text-anchor="middle" fill="${C.trna}" font-family="Inter" font-weight="700">3<tspan dy="-20" font-size="30">100</tspan><tspan dy="20"> ≈ 5 · 10</tspan><tspan dy="-20" font-size="30">47</tspan></text>` + txt(RX, 422, T2('mogelijke vormen', 'possible shapes'), '#c3cde2', 24) + '</g>';
          over += `<g opacity="${f1(k2)}">` + txt(RX, 500, T2('aan 10¹³ vormen/s: ± 10²⁷ jaar', 'at 10¹³ shapes/s: ± 10²⁷ years'), C.danger, 27) +
            txt(RX, 543, T2('heelal: ± 1,4 · 10¹⁰ jaar oud', 'universe: ± 1.4 · 10¹⁰ years old'), '#c3cde2', 24) +
            txt(RX, 620, T2('echte eiwitten: µs tot s', 'real proteins: µs to s'), C.ok, 28) + '</g>';
        } else if (step === 6) {
          // energietrechter (doorsnede) + bal
          const fx = x => 800 + x * 520, top = 190, bot = 640;
          const curve = x => top + (bot - top) * (1 - Math.abs(x)) ** 1.35 + 22 * Math.sin(x * 23) * Math.abs(x) ** .6 + (Math.abs(x) > .35 && Math.abs(x) < .45 ? 30 : 0);
          let d = '';
          for (let i = 0; i <= 200; i++) { const x = -1 + i / 100; d += `${i ? 'L' : 'M'}${f1(fx(x))},${f1(curve(x))}`; }
          bg += `<path d="${d}" stroke="${C.prot}" stroke-width="5" fill="none"/>`;
          bg += `<path d="${d} L${fx(1)},${top} L${fx(-1)},${top}Z" fill="${C.prot}" fill-opacity=".07"/>`;
          const k = ease(p), bx = -.95 + .95 * k, by = curve(bx) - 22;
          bg += `<circle cx="${f1(fx(bx))}" cy="${f1(by)}" r="20" fill="${C.trna}" stroke="#fff" stroke-width="3"/>`;
          bg += `<path d="M180,${top} V${bot + 20}" stroke="${C.muted}" stroke-width="3" marker-end="url(#arrow)"/>` + `<text x="145" y="${(top + bot) / 2}" font-size="25" fill="${C.muted}" font-family="Inter" font-weight="600" text-anchor="middle" transform="rotate(-90 145 ${(top + bot) / 2})">${T2('vrije energie', 'free energy')}</text>`;
          bg += txt(800, top - 32, T2('ongevouwen: zeer veel vormen (hoge entropie)', 'unfolded: very many shapes (high entropy)'), '#c3cde2', 25);
          bg += txt(fx(.62), curve(.4) + 64, T2('valkuil (lokaal minimum)', 'trap (local minimum)'), C.danger, 24);
          bg += txt(fx(-.52), curve(-.35) + 76, 'molten globule', '#c3cde2', 24);
          bg += txt(800, bot + 55, T2('natieve structuur', 'native structure'), C.ok, 28);
        } else if (step === 7) {
          const Pp = at(lerp(iCollapse, iMolten, .5));
          const r = chainSVG(Pp, { cx: 430, cy: 450, sc: 42, r: 16, jitter: 2, t, letters: false });
          ch = r.s;
          // Hsp70 bindt een blootliggend hydrofoob stuk (links van de keten)
          const hi = r.pts.map((q, i) => ({ q, i })).filter(o => HP[o.i]).sort((a, b) => a.q[0] - b.q[0])[0];
          const hx = hi.q[0] - 76, hy = hi.q[1];
          const ho = f1(ease(sub(p, .1, .4)));
          hsp = `<g opacity="${ho}"><ellipse cx="${f1(hx)}" cy="${f1(hy)}" rx="64" ry="44" fill="${C.prot}" fill-opacity=".45" stroke="${C.prot}" stroke-width="3"/>` + txt(hx, hy + 8, 'Hsp70', '#fff', 24) + '</g>';
          $('vo-hspA').setAttribute('cx', f1(hx)); $('vo-hspA').setAttribute('cy', f1(hy + 50));
          // chaperonine-kooi (TRiC/CCT)
          tric += `<g opacity="${f1(ease(sub(p, .3, .6)))}"><rect x="760" y="310" width="170" height="220" rx="30" fill="${C.prot}" fill-opacity=".12" stroke="${C.prot}" stroke-width="4"/><line x1="760" y1="420" x2="930" y2="420" stroke="${C.prot}" stroke-width="3" stroke-dasharray="6 6"/>` +
            txt(845, 285, T2('chaperonine (TRiC)', 'chaperonin (TRiC)'), C.prot, 25) + '</g>';
          // aggregaat
          const ar = rng(3);
          agg = `<g opacity="${f1(ease(sub(p, .55, .85)))}">` + Array.from({ length: 5 }, (_, i) => `<path d="M${1230 + i * 22},${460 + (i % 2) * 8} l12,-40 l12,40 l12,-40 l12,40 l12,-40 l12,40" stroke="${C.danger}" stroke-width="5" fill="none" transform="translate(0 ${f1(ar() * 20)})"/>`).join('') +
            txt(1350, 395, T2('aggregaat / amyloïd', 'aggregate / amyloid'), C.danger, 25) + '</g>';
        } else if (step === 8) {
          const r = chainSVG(S[M].C, { cx: 800, cy: 400, sc: 40, r: 16, contacts: true, letters: false });
          ch = r.s;
          over += txt(800, 140, T2('De vier structuurniveaus (klik om in te zoomen)', 'The four levels of structure (click to zoom in)'), C.text, 26);
        }
        $('vo-bg').innerHTML = bg; $('vo-water').innerHTML = water; $('vo-chain').innerHTML = ch; $('vo-over').innerHTML = over; $('vo-panel').innerHTML = pan;
        $('vo-hsp').innerHTML = hsp; $('vo-agg').innerHTML = agg;
        $('vo-ss').innerHTML = ssg; $('vo-tric').innerHTML = tric;
      },
    };
  },
};
