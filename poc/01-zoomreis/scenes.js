/*
 * Scènes voor POC 1 "Zoomreis".
 * Elke scène: svg() levert de tekening, init() start de animatie en geeft een opruimfunctie terug.
 * Klikbare onderdelen dragen data-node="<knoop-id uit shared/graph.js>".
 *   - bestaat er een scène met die id  → camera vliegt erin
 *   - data-href                        → gaat naar een andere pagina (bv. 3D-viewer)
 *   - anders                           → conceptkaart
 */

import { L } from '../../shared/i18n.js';

const C = {
  dna: '#4f8ff7', dna2: '#9cc0ff', tdna: '#f06bc0', rna: '#ff8a3d', trna: '#ffc247', rrna: '#2cc6a8',
  prot: '#9b7bff', chain: '#7fdc6a', mem: '#c9a574', bact: '#d65a5a', histone: '#8a93a8',
  text: '#e8edf7', muted: '#93a0bb',
};
const BASE = { A: '#5ad17a', T: '#ff6b6b', U: '#ff6b6b', G: '#ffc247', C: '#4fb0ff' };
const COMP = { A: 'T', T: 'A', G: 'C', C: 'G' };
const RNA_COMP = { A: 'U', T: 'A', G: 'C', C: 'G' };      // RNA-base tegenover een DNA-matrijsbase

/* deterministische toevalsgenerator: tekening is elke keer identiek */
function rng(seed) { return () => (seed = (seed * 16807) % 2147483647) / 2147483647; }

const defs = `
<defs>
  <radialGradient id="gNuc" cx="50%" cy="45%" r="60%"><stop offset="0" stop-color="#1a2a4f"/><stop offset="1" stop-color="#0f1a33"/></radialGradient>
  <radialGradient id="gVac" cx="50%" cy="50%" r="60%"><stop offset="0" stop-color="rgba(120,170,230,.10)"/><stop offset="1" stop-color="rgba(120,170,230,.03)"/></radialGradient>
  <radialGradient id="gCyto" cx="45%" cy="50%" r="70%"><stop offset="0" stop-color="#132143"/><stop offset="1" stop-color="#0c1530"/></radialGradient>
  <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="1.2"/></filter>
  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>`;

/* golvende lijn (voor chromatine, mRNA, flagellen) */
function squiggle(r, x, y, n, step, amp) {
  let d = `M${x.toFixed(1)},${y.toFixed(1)}`, a = r() * 6.28;
  for (let i = 0; i < n; i++) {
    a += (r() - .5) * 1.4;
    x += Math.cos(a) * step; y += Math.sin(a) * step;
    d += ` Q${(x + (r() - .5) * amp).toFixed(1)},${(y + (r() - .5) * amp).toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return d;
}

/* ════════════════════════════════════════════════════════════════
   SCÈNE 1 · Menselijke cel met twee binnenkomstroutes
   ════════════════════════════════════════════════════════════════ */
function sceneCel() {
  const r = rng(7);
  const nx = 790, ny = 470, nr = 150;
  const P = (a, rad, cx = nx, cy = ny) => [cx + Math.cos(a * Math.PI / 180) * rad, cy + Math.sin(a * Math.PI / 180) * rad];
  // plasmamembraan: onregelmatige epitheelcel
  let mem = '';
  for (let a = 0; a <= 360; a += 6) {
    const w = 1 + .06 * Math.sin(a * 3 * Math.PI / 180) + .03 * Math.sin(a * 7 * Math.PI / 180);
    const [x, y] = [800 + Math.cos(a * Math.PI / 180) * 560 * w, 460 + Math.sin(a * Math.PI / 180) * 360 * w];
    mem += `${a ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`;
  }
  mem += 'Z';
  // chromatine
  let chrom = '';
  for (let i = 0; i < 18; i++) {
    const a = r() * 6.28, d = r() * nr * .7;
    chrom += `<path d="${squiggle(r, nx + Math.cos(a) * d, ny + Math.sin(a) * d, 7, 10, 10)}" stroke="${C.dna}" stroke-width="2.2" fill="none" opacity="${.35 + r() * .45}"/>`;
  }
  let pores = '';
  for (let a = 0; a < 360; a += 20) {
    const [x, y] = P(a, nr);
    pores += `<rect x="${x - 4}" y="${y - 7}" width="8" height="14" rx="3" fill="#0a1224" stroke="${C.prot}" stroke-width="1.2" transform="rotate(${a} ${x} ${y})"/>`;
  }
  // ruw ER rond de kern (rechts en onder), continu met de buitenste kernmembraan
  let er = '', erRibo = '';
  for (let k = 0; k < 4; k++) {
    const rad = nr + 30 + k * 26;
    let d = '';
    for (let a = -50; a <= 150; a += 4) {
      const t = a * Math.PI / 180, w = rad + Math.sin(a * .35 + k) * 6;
      d += `${a === -50 ? 'M' : 'L'}${(nx + Math.cos(t) * w).toFixed(1)},${(ny + Math.sin(t) * w).toFixed(1)}`;
      if ((a + 50) % 12 === 4) erRibo += `<circle cx="${(nx + Math.cos(t) * (w + 5)).toFixed(1)}" cy="${(ny + Math.sin(t) * (w + 5)).toFixed(1)}" r="3" fill="${C.rrna}"/>`;
    }
    er += `<path d="${d}" stroke="#8fb3e8" stroke-width="5" fill="none" opacity=".45" stroke-linecap="round"/>`;
  }
  // centrosoom + microtubuli (sporen voor transport naar de kern)
  const mtoc = [600, 330];
  let mt = '';
  for (let a = 0; a < 360; a += 22) {
    const len = 330 + r() * 180, bend = (r() - .5) * 60, t = a * Math.PI / 180;
    mt += `<path d="M${mtoc[0]},${mtoc[1]} q${Math.cos(t) * len / 2 + bend},${Math.sin(t) * len / 2 - bend} ${Math.cos(t) * len},${Math.sin(t) * len}" stroke="#7c8aa8" stroke-width="1.3" fill="none" opacity=".28"/>`;
  }
  const mito = [[1120, 250, 20], [1230, 520, -60], [1040, 740, 10], [470, 560, 70], [620, 740, -20], [980, 170, -10]]
    .map(([x, y, rot]) => `<g transform="translate(${x} ${y}) rotate(${rot})"><ellipse rx="34" ry="15" fill="#5a3f36" stroke="#a37565" stroke-width="1.5"/>
      <path d="M-24,0 q4,-10 8,0 t8,0 t8,0 t8,0 t8,0 t8,0" stroke="#d09a85" stroke-width="1.5" fill="none"/></g>`).join('');
  const lyso = [[1300, 380], [430, 460], [1180, 660]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="16" fill="#3d2a5c" stroke="#8d6cc4" stroke-width="1.5"/>`).join('');
  // vrije polysomen in het cytosol
  let poly = '';
  for (const [x, y] of [[1150, 380], [1190, 440], [1110, 470]]) {
    poly += `<path d="M${x},${y} q20,-12 40,0 t40,0" stroke="${C.rna}" stroke-width="2" fill="none"/>`;
    for (let i = 0; i < 4; i++) poly += `<circle cx="${x + 10 + i * 20}" cy="${y - 4 + (i % 2) * 3}" r="5.5" fill="${C.rrna}"/>`;
  }
  // adenovirus: icosaëdrisch capside (zeshoek-silhouet) met vezels
  const virion = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
      ${[0, 60, 120, 180, 240, 300].map(a => `<line x1="0" y1="0" x2="${(Math.cos(a * Math.PI / 180) * 34).toFixed(1)}" y2="${(Math.sin(a * Math.PI / 180) * 34).toFixed(1)}" stroke="#f3a6d3" stroke-width="2"/><circle cx="${(Math.cos(a * Math.PI / 180) * 36).toFixed(1)}" cy="${(Math.sin(a * Math.PI / 180) * 36).toFixed(1)}" r="3.2" fill="#f3a6d3"/>`).join('')}
      <polygon points="${[0, 60, 120, 180, 240, 300].map(a => `${(Math.cos((a + 30) * Math.PI / 180) * 22).toFixed(1)},${(Math.sin((a + 30) * Math.PI / 180) * 22).toFixed(1)}`).join(' ')}" fill="#4a2440" stroke="${C.tdna}" stroke-width="2.5"/>
      <path d="M-10,-4 q5,-7 10,0 t10,0 M-10,5 q5,-7 10,0 t10,0" stroke="${C.tdna}" stroke-width="2" fill="none"/></g>`;
  // lipidenanodeeltje met mRNA
  const lnp = (x, y) => `<g transform="translate(${x} ${y})"><circle r="24" fill="rgba(255,194,71,.12)" stroke="#e8c27a" stroke-width="4" stroke-dasharray="3 2"/>
      <path d="M-12,-4 q4,-8 8,0 t8,0 t8,0 M-12,6 q4,-8 8,0 t8,0 t8,0" stroke="${C.rna}" stroke-width="2.2" fill="none"/></g>`;

  const [px, py] = P(215, nr + 4);
  const vPath = `M395,300 C470,300 520,315 ${mtoc[0] - 20},${mtoc[1] + 10} S${px - 30},${py - 20} ${px - 16},${py - 10}`;
  const lPath = `M400,650 C470,640 520,610 560,600 S650,640 700,690`;
  const mPath = `M${P(-20, nr)[0].toFixed(0)},${P(-20, nr)[1].toFixed(0)} C1000,390 1060,380 1110,400`;

  return `<svg viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">${defs}
    <path d="${mem}" fill="url(#gCyto)" stroke="${C.mem}" stroke-width="9" stroke-linejoin="round"/>
    <path d="${mem}" fill="none" stroke="#f1d7a8" stroke-width="1.5" opacity=".6" transform="translate(800 460) scale(.985) translate(-800 -460)"/>
    <clipPath id="cellClip"><path d="${mem}"/></clipPath>
    <g clip-path="url(#cellClip)">${mt}</g>
    <circle cx="${mtoc[0]}" cy="${mtoc[1]}" r="9" fill="#9aa6c2" opacity=".8"/>
    <text x="${mtoc[0] + 14}" y="${mtoc[1] - 10}" fill="${C.muted}" font-size="12" font-family="Inter" opacity=".7">${L({ nl: 'centrosoom', en: 'centrosome' })}</text>
    ${mito}${lyso}
    <g transform="translate(600 610)" opacity=".85">${[0, 10, 20, 30].map(o => `<path d="M${-46 + o / 2},${o} Q0,${o - 18} ${46 - o / 2},${o}" stroke="#d7b46a" stroke-width="5.5" fill="none" stroke-linecap="round"/>`).join('')}</g>
    <text x="600" y="668" fill="${C.muted}" font-size="12" text-anchor="middle" font-family="Inter" opacity=".7">Golgi</text>

    <g data-node="er" data-color="${C.rrna}" data-label="${L({ nl: 'Ruw ER', en: 'Rough ER' })}">${er}${erRibo}<circle data-anchor="er" cx="${P(60, nr + 110)[0]}" cy="${P(60, nr + 110)[1]}" r="1" fill="none"/></g>
    <g data-node="translatie" data-color="${C.rrna}" data-label="${L({ nl: 'Ribosomen · translatie', en: 'Ribosomes · translation' })}">
      <rect x="1090" y="350" width="150" height="130" fill="transparent"/>${poly}
    </g>
    <g data-node="kern" data-color="${C.dna}">
      <circle cx="${nx}" cy="${ny}" r="${nr + 5}" fill="none" stroke="#7aa0d8" stroke-width="2.5" opacity=".7"/>
      <circle cx="${nx}" cy="${ny}" r="${nr}" fill="url(#gNuc)" stroke="#9cc0ff" stroke-width="2"/>
      <ellipse cx="${nx + 35}" cy="${ny - 20}" rx="46" ry="38" fill="#2b3e66" opacity=".9"/>
      ${chrom}${pores}
    </g>
    <g data-node="export" data-color="${C.rna}" data-label="${L({ nl: 'mRNA-export', en: 'mRNA export' })}">
      <circle data-anchor="export" cx="1010" cy="380" r="1" fill="none"/>
      <path d="${mPath}" stroke="transparent" stroke-width="26" fill="none"/>
      ${[0, 1.3, 2.6].map(b => `<path d="M-9,0 q4,-6 9,0 t9,0" stroke="${C.rna}" stroke-width="3" fill="none"><animateMotion dur="4s" begin="-${b}s" repeatCount="indefinite" path="${mPath}" rotate="auto"/></path>`).join('')}
    </g>

    <!-- route 1: adenovirus -->
    <g data-node="adeno" data-color="${C.tdna}" data-label="${L({ nl: 'Adenovirus (dsDNA)', en: 'Adenovirus (dsDNA)' })}">
      <circle data-anchor="adeno" cx="200" cy="222" r="1" fill="none"/>
      ${virion(200, 270)}
      <path d="${vPath}" stroke="transparent" stroke-width="28" fill="none"/>
      <path d="${vPath}" stroke="${C.tdna}" stroke-width="1" stroke-dasharray="3 6" fill="none" opacity=".45"/>
      <g><g transform="scale(.55)">${virion(0, 0)}</g><animateMotion dur="7s" repeatCount="indefinite" path="${vPath}"/></g>
    </g>
    <g data-node="endocytose" data-color="${C.mem}" data-label="${L({ nl: 'Endosoom', en: 'Endosome' })}">
      <circle cx="330" cy="300" r="40" fill="rgba(201,165,116,.12)" stroke="${C.mem}" stroke-width="3"/>${virion(330, 300, .6)}
      <circle cx="345" cy="650" r="40" fill="rgba(201,165,116,.12)" stroke="${C.mem}" stroke-width="3"/>${lnp(345, 650)}
      <circle data-anchor="endocytose" data-pos="below" cx="338" cy="700" r="1" fill="none"/>
    </g>
    <!-- route 2: mRNA in lipidenanodeeltje -->
    <g data-node="lnp" data-color="${C.trna}" data-label="${L({ nl: 'mRNA-vaccin (LNP)', en: 'mRNA vaccine (LNP)' })}">
      <circle data-anchor="lnp" cx="205" cy="668" r="1" fill="none"/>
      ${lnp(205, 700)}
      <path d="${lPath}" stroke="transparent" stroke-width="28" fill="none"/>
      <path d="${lPath}" stroke="${C.rna}" stroke-width="1" stroke-dasharray="3 6" fill="none" opacity=".45"/>
      ${[0, 2.5].map(b => `<path d="M-10,0 q4,-6 8,0 t8,0 t8,0" stroke="${C.rna}" stroke-width="3" fill="none"><animateMotion dur="5s" begin="-${b}s" repeatCount="indefinite" path="${lPath}" rotate="auto"/></path>`).join('')}
      ${[[700, 690], [735, 705]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="${C.rrna}"/>`).join('')}
    </g>
    <text x="120" y="120" fill="${C.muted}" font-size="14" font-family="Inter" opacity=".6">${L({ nl: 'extracellulair', en: 'extracellular' })}</text>
    <text x="1230" y="300" fill="${C.muted}" font-size="14" font-family="Inter" opacity=".6">cytosol</text>
  </svg>`;
}

/* ════════════════════════════════════════════════════════════════
   SCÈNE 2 · Celkern
   ════════════════════════════════════════════════════════════════ */
function sceneKern() {
  const r = rng(11);
  const cx = 760, cy = 470, R = 400;
  const P = (a, rad) => [cx + Math.cos(a * Math.PI / 180) * rad, cy + Math.sin(a * Math.PI / 180) * rad];
  // chromatine-territoria
  let chrom = '';
  const terr = [[560, 330], [620, 640], [900, 620], [1000, 420], [820, 230], [480, 520]];
  terr.forEach(([x, y], k) => {
    for (let i = 0; i < 22; i++) chrom += `<path d="${squiggle(r, x + (r() - .5) * 120, y + (r() - .5) * 110, 9, 11, 12)}" stroke="${C.dna}" stroke-width="${1.6 + r() * 1.4}" fill="none" opacity="${.25 + r() * .5}"/>`;
  });
  // heterochromatine tegen de envelop
  let hetero = '';
  for (let a = 0; a < 360; a += 3) if (r() > .35) {
    const [x, y] = P(a, R - 30 - r() * 14);
    hetero += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${3 + r() * 5}" fill="#27457e" opacity=".7"/>`;
  }
  // kernporiecomplexen
  let npc = '';
  for (let a = 0; a < 360; a += 15) {
    const [x, y] = P(a, R - 8);
    npc += `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${a})">
      <rect x="-14" y="-15" width="28" height="30" rx="7" fill="#0b1427" stroke="${C.prot}" stroke-width="2"/>
      <rect x="-9" y="-4" width="18" height="8" rx="3" fill="${C.prot}" opacity=".5"/></g>`;
  }
  // cytoplasma: ER + polysomen rechts
  let cyto = '';
  for (let k = 0; k < 3; k++) {
    let d = '';
    for (let y = 120; y <= 820; y += 10) d += `${y === 120 ? 'M' : 'L'}${(1210 + k * 60 + Math.sin(y / 60 + k) * 18).toFixed(1)},${y}`;
    cyto += `<path d="${d}" stroke="#8fb3e8" stroke-width="7" fill="none" opacity=".25" stroke-linecap="round"/>`;
  }
  let poly = '';
  for (const [x, y] of [[1270, 300], [1330, 520], [1250, 690], [1420, 380]]) {
    poly += `<path d="M${x},${y} q25,-16 50,0 t50,0 t50,0" stroke="${C.rna}" stroke-width="2.5" fill="none"/>`;
    for (let i = 0; i < 6; i++) poly += `<g transform="translate(${x + 12 + i * 25} ${y - 3 + (i % 2) * 4})"><circle r="9" fill="${C.rrna}"/><circle cy="7" r="6" fill="#1f9d86"/></g>`;
  }
  // transcriptieplaats: "kerstboom" zoals in Miller-preparaten (RNA's worden langer richting het geneinde)
  const gx0 = 860, gy = 330, gx1 = 1060;
  let tree = `<path d="M${gx0 - 40},${gy + 30} C${gx0},${gy} ${gx1},${gy} ${gx1 + 40},${gy + 30}" stroke="${C.dna}" stroke-width="3" fill="none"/>`;
  for (let i = 0; i < 7; i++) {
    const x = gx0 + i * 30, len = 12 + i * 11;
    tree += `<path d="M${x},${gy + 8} q-6,${-len / 2} 0,${-len}" stroke="${C.rna}" stroke-width="2.2" fill="none" opacity=".95"/><circle cx="${x}" cy="${gy + 8}" r="4.5" fill="${C.prot}"/>`;
  }
  const exportPath = `M${gx1 + 10},${gy - 40} C1100,260 1110,230 ${P(-35, R + 40).map(v => v.toFixed(0)).join(',')} S1300,190 1330,240`;
  const importPath = `M${P(192, R + 20).map(v => v.toFixed(0)).join(',')} L${P(192, R - 40).map(v => v.toFixed(0)).join(',')} C430,480 480,560 520,575`;

  return `<svg viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">${defs}
    <rect x="-800" y="-500" width="3200" height="1900" fill="#0c1530" opacity=".6"/>
    ${cyto}
    <g data-node="translatie" data-color="${C.rrna}" data-label="${L({ nl: 'Polysomen · translatie', en: 'Polysomes · translation' })}">
      <rect x="1230" y="250" width="330" height="480" fill="transparent"/>${poly}
    </g>
    <!-- kernenvelop: dubbel membraan met perinucleaire ruimte -->
    <circle cx="${cx}" cy="${cy}" r="${R + 12}" fill="none" stroke="#7aa0d8" stroke-width="5" opacity=".75"/>
    <circle cx="${cx}" cy="${cy}" r="${R + 5}" fill="none" stroke="#12203f" stroke-width="8"/>
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#gNuc)" stroke="#9cc0ff" stroke-width="4"/>
    ${hetero}
    <g data-node="chromatine" data-color="${C.dna}">${chrom}<circle data-anchor="chromatine" cx="560" cy="300" r="1" fill="none"/></g>
    <g data-node="nucleolus" data-color="${C.rrna}">
      <path d="M640,420 C650,350 760,340 790,400 C830,470 770,540 700,520 C650,505 635,470 640,420Z" fill="#2a3d63" stroke="#4d6aa0" stroke-width="2"/>
      ${Array.from({ length: 40 }, () => `<circle cx="${(660 + r() * 120).toFixed(1)}" cy="${(390 + r() * 120).toFixed(1)}" r="${(1.5 + r() * 2.5).toFixed(1)}" fill="${C.rrna}" opacity=".55"/>`).join('')}
      <circle cx="690" cy="440" r="14" fill="#1b2a47"/><circle cx="740" cy="470" r="11" fill="#1b2a47"/>
    </g>
    <g data-node="kernimport" data-color="${C.prot}" data-label="${L({ nl: 'Kernporiecomplex', en: 'Nuclear pore complex' })}">${npc}<circle data-anchor="kernimport" cx="${P(192, R + 20)[0]}" cy="${P(192, R + 20)[1] - 20}" r="1" fill="none"/></g>

    <g data-node="transcriptie" data-color="${C.prot}" data-label="${L({ nl: 'Transcriptie van een gen', en: 'Transcription of a gene' })}">
      <rect x="${gx0 - 50}" y="${gy - 90}" width="${gx1 - gx0 + 100}" height="130" fill="transparent"/>${tree}
    </g>
    <g data-node="export" data-color="${C.rna}" data-label="${L({ nl: 'mRNA-export', en: 'mRNA export' })}">
      <circle data-anchor="export" cx="1150" cy="215" r="1" fill="none"/>
      <path d="${exportPath}" stroke="transparent" stroke-width="24" fill="none"/>
      ${[0, 1.5, 3].map(b => `<path d="M-12,0 q6,-8 12,0 t12,0" stroke="${C.rna}" stroke-width="3.5" fill="none"><animateMotion dur="4.5s" begin="-${b}s" repeatCount="indefinite" path="${exportPath}" rotate="auto"/></path>`).join('')}
    </g>
    <!-- adenovirus: capside dokt aan een kernporie, het DNA gaat de kern in en blijft episomaal -->
    <g data-node="adeno" data-color="${C.tdna}" data-label="${L({ nl: 'Adenovirus-DNA (episomaal)', en: 'Adenovirus DNA (episomal)' })}">
      <g transform="translate(${P(192, R + 50).map(v => v.toFixed(0)).join(' ')}) rotate(12)">
        ${[0, 60, 120, 180, 240, 300].map(a => `<circle cx="${(Math.cos(a * Math.PI / 180) * 40).toFixed(1)}" cy="${(Math.sin(a * Math.PI / 180) * 40).toFixed(1)}" r="4" fill="#f3a6d3"/>`).join('')}
        <polygon points="${[30, 90, 150, 210, 270, 330].map(a => `${(Math.cos(a * Math.PI / 180) * 30).toFixed(1)},${(Math.sin(a * Math.PI / 180) * 30).toFixed(1)}`).join(' ')}" fill="#4a2440" stroke="${C.tdna}" stroke-width="3" opacity=".75"/>
      </g>
      <path d="${importPath}" stroke="transparent" stroke-width="26" fill="none"/>
      <path id="adenoDNA" d="${importPath}" stroke="${C.tdna}" stroke-width="3.5" fill="none" stroke-dasharray="900" stroke-dashoffset="900">
        <animate attributeName="stroke-dashoffset" values="900;0;0" keyTimes="0;.6;1" dur="6s" repeatCount="indefinite"/></path>
      <path d="M520,575 q-30,30 0,55 q40,25 70,-10 q20,-30 -20,-50 q-30,-12 -50,5" stroke="${C.tdna}" stroke-width="3.5" fill="none" opacity=".85" filter="url(#glow)"/>
      <circle data-anchor="adeno" cx="555" cy="560" r="1" fill="none"/>
    </g>
    <text x="${cx}" y="${cy + R - 60}" fill="${C.muted}" font-size="14" text-anchor="middle" font-family="Inter" opacity=".6">${L({ nl: 'nucleoplasma', en: 'nucleoplasm' })}</text>
    <text x="1420" y="850" fill="${C.muted}" font-size="14" text-anchor="middle" font-family="Inter" opacity=".6">${L({ nl: 'cytoplasma', en: 'cytoplasm' })}</text>
  </svg>`;
}

/* ════════════════════════════════════════════════════════════════
   SCÈNE 3 · Transcriptie door RNA-polymerase II (procedureel)
   ════════════════════════════════════════════════════════════════ */
const GENE = 'TATAAAAGGCCTGACGATGGCTTTCAAGGATTGGCACGGACTGACCGAAAGCTAAGGTCACGTTAGCCATGGACTTCGAAGCTGCATGCCTAGTCAGGATCCATGA';

function sceneTranscriptie() {
  return `<svg viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">${defs}
    <g id="tx-super"></g>
    <g data-node="dnavormen" data-href="../02-dna-vormen/index.html" data-label="${L({ nl: 'DNA-dubbelhelix · 3D', en: 'DNA double helix · 3D' })}" data-color="${C.dna}">
      <rect x="0" y="400" width="1600" height="140" fill="transparent"/>
      <circle data-anchor="dnavormen" cx="1420" cy="425" r="1" fill="none"/>
      <g id="tx-rungs"></g>
      <path id="tx-s1" stroke="${C.dna}" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path id="tx-s2" stroke="${C.dna2}" stroke-width="7" fill="none" stroke-linecap="round"/>
    </g>
    <g data-node="promoter" data-color="${C.prot}" data-label="${L({ nl: 'Promoter (TATA-box)', en: 'Promoter (TATA box)' })}">
      <rect x="112" y="432" width="118" height="76" rx="10" fill="rgba(155,123,255,.12)" stroke="${C.prot}" stroke-dasharray="5 4"/>
    </g>
    <g data-node="rnaprocessing" data-color="${C.rna}" data-label="${L({ nl: 'pre-mRNA → processing', en: 'pre-mRNA → processing' })}">
      <path id="tx-rna-hit" stroke="transparent" stroke-width="26" fill="none"/>
      <g id="tx-rna-bases"></g>
      <path id="tx-rna" stroke="${C.rna}" stroke-width="6" fill="none" stroke-linecap="round"/>
    </g>
    <g data-node="capping" data-color="${C.rna}" data-label="${L({ nl: '5\'-cap (m⁷G)', en: '5\' cap (m⁷G)' })}">
      <g id="tx-cap"><circle r="11" fill="#ffb27a" stroke="${C.rna}" stroke-width="2"/><text y="4" font-size="9" text-anchor="middle" fill="#3a1a05" font-family="Inter" font-weight="700">m⁷G</text></g>
    </g>
    <g id="tx-capenz" opacity="0"><ellipse rx="26" ry="18" fill="${C.prot}" opacity=".7"/><text y="4" font-size="10" text-anchor="middle" fill="#fff" font-family="Inter">capping</text></g>
    <g data-node="rnapol" data-color="${C.prot}" data-label="${L({ nl: 'RNA-polymerase II', en: 'RNA polymerase II' })}">
      <g id="tx-pol">
        <path d="M-150,-40 C-150,-120 -60,-150 20,-140 C110,-130 160,-80 150,-10 C145,60 110,110 20,115 C-70,120 -150,80 -150,-40Z" fill="rgba(155,123,255,.22)" stroke="${C.prot}" stroke-width="3"/>
        <path d="M-60,112 q10,30 -5,50 q-15,20 0,40 q15,20 0,40" stroke="${C.prot}" stroke-width="3" fill="none" opacity=".7"/>
        ${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="${-62 + (i % 2 ? 6 : -6)}" cy="${128 + i * 14}" r="4" fill="${C.prot}"/>`).join('')}
        <text x="-20" y="236" fill="${C.muted}" font-size="12" font-family="Inter">CTD (YSPTSPS-herhalingen)</text>
        <circle cx="96" cy="0" r="7" fill="#fff" opacity=".85" filter="url(#glow)"/>
      </g>
    </g>
    <g data-node="supercoiling" data-color="${C.dna2}" data-label="Supercoiling" id="tx-sc"></g>
    <g font-family="JetBrains Mono, monospace" font-size="15" fill="${C.text}">
      <text x="40" y="408">5'</text><text x="1545" y="408">3'</text>
      <text x="40" y="560">3'</text><text x="1545" y="560">5'</text>
    </g>
    <g font-family="Inter" font-size="13" fill="${C.muted}">
      <text x="72" y="395" fill="${C.dna}">${L({ nl: 'coderende streng (niet-matrijs) 5\'→3\'', en: 'coding (non-template) strand 5\'→3\'' })}</text>
      <text x="72" y="585" fill="${C.dna2}">${L({ nl: 'matrijsstreng (template) 3\'→5\' — wordt gelezen', en: 'template strand 3\'→5\' — is read' })}</text>
      <text id="tx-dir" x="800" y="840" text-anchor="middle">${L({ nl: 'richting van transcriptie →   ·   RNA groeit 5\'→3\'', en: 'direction of transcription →   ·   RNA grows 5\'→3\'' })}</text>
    </g>
  </svg>`;
}

function initTranscriptie(svg, ctx) {
  const $ = id => svg.getElementById(id);
  const cy = 470, A = 26, bp = 22, k = 2 * Math.PI / (bp * 10.5); // B-DNA: ~10,5 bp per winding
  const x0 = 40, n = Math.floor((1560 - x0) / bp);
  const seq = Array.from({ length: n }, (_, i) => GENE[i % GENE.length]); // coderende streng 5'→3'
  const startX = 320, endX = 1330, holfW = 120; // transcriptiestart net na de promoter
  let polX = startX, last = performance.now(), raf, capped = false, capT = 0;

  function sep(x) { // hoe ver de strengen uit elkaar staan (transcriptiebel ~13 bp)
    const d = Math.abs(x - polX);
    return d < holfW ? 1 : d < holfW + 60 ? 1 - (d - holfW) / 60 : 0;
  }
  const s1y = x => cy - A * Math.sin(k * x) * (1 - sep(x)) - 78 * sep(x) ** 1.5;
  const s2y = x => cy + A * Math.sin(k * x + 2.3) * (1 - sep(x)) + 60 * sep(x) ** 1.5;
  const path = f => { let d = ''; for (let x = x0; x <= 1560; x += 6) d += `${x === x0 ? 'M' : 'L'}${x},${f(x).toFixed(1)}`; return d; };

  function frame(now) {
    const dt = Math.min(50, now - last); last = now;
    if (!ctx.isPaused()) polX += dt * .045;
    if (polX > endX) { polX = startX; capped = false; }
    $('tx-s1').setAttribute('d', path(s1y));
    $('tx-s2').setAttribute('d', path(s2y));

    // basenparen (buiten de bel) en vrije matrijsbasen (in de bel)
    let rungs = '';
    const active = polX + 96;              // actieve plaats (3'-uiteinde van het RNA)
    for (let i = 0; i < n; i++) {
      const x = x0 + 10 + i * bp, s = sep(x), b = seq[i], m = COMP[b];
      if (s < .05) {
        const y1 = s1y(x), y2 = s2y(x), ym = (y1 + y2) / 2;
        rungs += `<line x1="${x}" y1="${y1}" x2="${x}" y2="${ym}" stroke="${BASE[b]}" stroke-width="5"/><line x1="${x}" y1="${ym}" x2="${x}" y2="${y2}" stroke="${BASE[m]}" stroke-width="5"/>`;
      } else {
        rungs += `<line x1="${x}" y1="${s1y(x)}" x2="${x}" y2="${s1y(x) + 16}" stroke="${BASE[b]}" stroke-width="5" opacity="${s}"/>`;
        rungs += `<line x1="${x}" y1="${s2y(x)}" x2="${x}" y2="${s2y(x) - 16}" stroke="${BASE[m]}" stroke-width="5" opacity="${s}"/>`;
      }
    }
    $('tx-rungs').innerHTML = rungs;

    // RNA: hybride van ~8 bp met de matrijs, daarna via het uitgangskanaal naar boven
    const rnaLen = Math.max(0, active - startX);
    const hyb = Math.min(rnaLen, 8 * bp), yH = s2y(polX) - 30;
    const pts = [];
    for (let s = 0; s <= rnaLen; s += 4) {
      let x, y;
      if (s <= 8 * bp) { x = active - s; y = yH; }
      else if (s <= 8 * bp + 160) { const u = (s - 8 * bp) / 160; x = active - 8 * bp - u * 110; y = yH - u * u * 140 - u * 60; }
      else { const u = s - 8 * bp - 160; x = active - 8 * bp - 110 - u * .82; y = yH - 200 - 34 * Math.sin(u / 55) - u * .12; }
      pts.push([x, y]);
    }
    const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('');
    $('tx-rna').setAttribute('d', d); $('tx-rna-hit').setAttribute('d', d);
    // RNA-basen in de hybride: complementair aan de matrijs = zelfde sequentie als de coderende streng (U i.p.v. T)
    let rb = '';
    for (let i = 0; i < n; i++) {
      const x = x0 + 10 + i * bp;
      if (x <= active && x >= active - hyb) rb += `<line x1="${x}" y1="${yH}" x2="${x}" y2="${yH + 14}" stroke="${BASE[RNA_COMP[COMP[seq[i]]]]}" stroke-width="5"/>`;
    }
    $('tx-rna-bases').innerHTML = rb;

    // 5'-cap: wordt toegevoegd zodra het RNA ~25 nt lang is en uit de polymerase steekt
    const end = pts[pts.length - 1] ?? [active, yH];
    const capEnz = $('tx-capenz'), cap = $('tx-cap');
    if (!capped && rnaLen > 25 * bp) { capped = true; capT = now; }
    cap.setAttribute('opacity', capped ? Math.min(1, (now - capT) / 600) : 0);
    cap.setAttribute('transform', `translate(${end[0] - 8} ${end[1]})`);
    capEnz.setAttribute('transform', `translate(${end[0] - 10} ${end[1] - 30})`);
    capEnz.setAttribute('opacity', capped ? Math.max(0, 1 - (now - capT) / 1500) : rnaLen > 18 * bp ? .9 : 0);

    $('tx-pol').setAttribute('transform', `translate(${polX} ${cy})`);
    // supercoiling: positief vóór, negatief achter de polymerase
    $('tx-sc').innerHTML = `
      <g transform="translate(${polX + 260} 620)"><circle r="15" fill="none" stroke="${C.dna2}" stroke-width="2"/><text y="5" text-anchor="middle" fill="${C.dna2}" font-size="16" font-family="Inter">+</text></g>
      <g transform="translate(${polX - 260} 620)"><circle r="15" fill="none" stroke="${C.dna2}" stroke-width="2"/><text y="5" text-anchor="middle" fill="${C.dna2}" font-size="18" font-family="Inter">−</text></g>
      <text x="${polX + 260}" y="656" text-anchor="middle" fill="${C.muted}" font-size="11" font-family="Inter">${L({ nl: 'positieve supercoils', en: 'positive supercoils' })}</text>
      <text x="${polX - 260}" y="656" text-anchor="middle" fill="${C.muted}" font-size="11" font-family="Inter">${L({ nl: 'negatieve supercoils', en: 'negative supercoils' })}</text>`;
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(raf);
}

/* ════════════════════════════════════════════════════════════════
   SCÈNE 4 · Translatie aan het ribosoom (procedureel)
   ════════════════════════════════════════════════════════════════ */
// standaard genetische code, volgorde U C A G
const AA = 'FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG';
const IDX = { U: 0, C: 1, A: 2, G: 3 };
const translate = cod => AA[IDX[cod[0]] * 16 + IDX[cod[1]] * 4 + IDX[cod[2]]];
const THREE = { A: 'Ala', R: 'Arg', N: 'Asn', D: 'Asp', C: 'Cys', Q: 'Gln', E: 'Glu', G: 'Gly', H: 'His', I: 'Ile', L: 'Leu', K: 'Lys', M: 'Met', F: 'Phe', P: 'Pro', S: 'Ser', T: 'Thr', W: 'Trp', Y: 'Tyr', V: 'Val' };
const CLASS = { A: 'h', V: 'h', L: 'h', I: 'h', M: 'h', F: 'h', W: 'h', G: 's', P: 's', S: 'p', T: 'p', C: 'p', N: 'p', Q: 'p', Y: 'p', K: '+', R: '+', H: '+', D: '-', E: '-' };
const CLASSCOL = { h: '#7fdc6a', s: '#ffc247', p: '#5fd3e6', '+': '#4f8ff7', '-': '#ff6b6b' };
// mRNA (5'→3'): 5'-UTR zonder AUG · Kozak-context GCCACC·AUG·G · codons · stop UAA · 3'-UTR · poly(A) (verkort)
// Aminozuren volgen automatisch uit de genetische code.
const UTR5 = 'GGAUCCAGCUUCGAAUUCGCCACC', CDS = 'AUGGCUUUCAAGGAUUGGCACGGACUGACCGAAAGCUAA', UTR3 = 'GCGGCCUCUAGC', POLYA = 'A'.repeat(18);
const MRNA = UTR5 + CDS + UTR3 + POLYA;

function sceneTranslatie() {
  return `<svg viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">${defs}
    <g data-node="ribosoom" data-color="${C.rrna}" data-label="${L({ nl: 'Ribosoom (80S)', en: 'Ribosome (80S)' })}">
      <g id="tl-large">
        <path d="M520,520 C470,380 560,230 760,215 C960,200 1110,300 1090,440 C1080,500 1040,525 1000,528 L560,528 C540,528 526,525 520,520Z" fill="rgba(44,198,168,.16)" stroke="${C.rrna}" stroke-width="3"/>
        <text x="1070" y="300" fill="${C.rrna}" font-size="14" font-family="Inter">${L({ nl: 'grote subeenheid (60S)', en: 'large subunit (60S)' })}</text>
        <path d="M800,260 C790,220 800,190 830,150" stroke="rgba(44,198,168,.5)" stroke-width="26" fill="none" stroke-linecap="round"/>
        <text x="850" y="170" fill="${C.muted}" font-size="12" font-family="Inter">${L({ nl: 'uitgangstunnel', en: 'exit tunnel' })}</text>
        <g font-family="JetBrains Mono, monospace" font-size="16" fill="${C.text}" text-anchor="middle" opacity=".85">
          <text x="710" y="250">E</text><text x="800" y="250">P</text><text x="890" y="250">A</text>
        </g>
      </g>
      <g id="tl-small">
        <path d="M560,602 C560,650 640,690 800,692 C960,694 1050,660 1050,604 Z" fill="rgba(44,198,168,.22)" stroke="${C.rrna}" stroke-width="3"/>
        <text x="1060" y="690" fill="${C.rrna}" font-size="14" font-family="Inter">${L({ nl: 'kleine subeenheid (40S)', en: 'small subunit (40S)' })}</text>
      </g>
    </g>
    <g data-node="polya" data-color="${C.rna}" data-label="${L({ nl: 'Poly(A)-staart', en: 'Poly(A) tail' })}"><g id="tl-polya"></g></g>
    <g data-node="vouwing" data-color="${C.chain}" data-label="${L({ nl: 'Groeiende keten → vouwing', en: 'Growing chain → folding' })}"><g id="tl-chain"></g></g>
    <g data-node="trna" data-color="${C.trna}" data-label="tRNA"><g id="tl-trnas"></g></g>
    <g data-node="elongatie" data-color="${C.prot}" data-label="eEF1A (EF-Tu)"><g id="tl-eef"></g></g>
    <g data-node="terminatie" data-color="${C.prot}" data-label="${L({ nl: 'Release factor eRF1', en: 'Release factor eRF1' })}" data-nolabel><g id="tl-rf"></g></g>
    <g data-node="codon" data-color="${C.rna}" data-label="${L({ nl: 'mRNA · codons', en: 'mRNA · codons' })}"><g id="tl-mrna"></g></g>
    <g data-node="initiatie" data-color="${C.rna}" data-label="${L({ nl: '5\'-cap · initiatie', en: '5\' cap · initiation' })}"><g id="tl-cap"></g><g id="tl-eif"></g></g>
    <g font-family="Inter" font-size="13" fill="${C.muted}">
      <text x="800" y="780" text-anchor="middle" id="tl-status"></text>
      <text x="800" y="806" text-anchor="middle" font-size="12">${L({ nl: 'het ribosoom schuift 5\'→3\' over het mRNA (hier: mRNA schuift t.o.v. een vast ribosoom)', en: 'the ribosome moves 5\'→3\' along the mRNA (here: the mRNA slides past a fixed ribosome)' })}</text>
    </g>
  </svg>`;
}

function initTranslatie(svg, ctx) {
  const $ = id => svg.getElementById(id);
  const nt = 30, cod = 3 * nt, yM = 565;
  const start = MRNA.indexOf('AUG');
  const codons = []; for (let i = start; i + 3 <= MRNA.length; i += 3) codons.push(MRNA.slice(i, i + 3));
  const stopIdx = codons.findIndex(c => translate(c) === '*');
  const SITE = { E: 710, P: 800, A: 890 };
  const SCAN0 = start * nt - 125;                            // bij binding aan de cap ligt het AUG nog SCAN0 px verder
  let i = 0, phase = 'i0', t = 0, last = performance.now(), raf;
  let chain = ['M'];                                         // initiator-tRNA (Met-tRNAi) zit al in het 43S-complex
  const tr = [{ codon: 0, site: 'P', aa: 'M', charged: true, x: SITE.P, y: 0, op: 0 }];
  let eef = null, rf = null, released = null;

  const anticodon = c => c.split('').map(b => ({ A: 'U', U: 'A', G: 'C', C: 'G' })[b]).join(''); // gelezen 3'→5'
  function trnaSVG(o) {
    const x = o.x, y = yM - 22 + o.y;
    const ac = anticodon(codons[o.codon]);
    return `<g opacity="${o.op}">
      <path d="M${x - 24},${y} L${x - 24},${y - 70} Q${x - 24},${y - 88} ${x - 8},${y - 92} L${x + 26},${y - 100} L${x + 26},${y - 150} L${x + 10},${y - 150} L${x + 10},${y - 112} L${x - 6},${y - 108} L${x - 6},${y}" fill="rgba(255,194,71,.22)" stroke="${C.trna}" stroke-width="3" stroke-linejoin="round"/>
      ${ac.split('').map((b, j) => `<rect x="${x - 38 + j * 26}" y="${y - 2}" width="20" height="18" rx="4" fill="${BASE[b]}"/><text x="${x - 28 + j * 26}" y="${y + 12}" font-size="12" text-anchor="middle" fill="#0a1224" font-family="JetBrains Mono" font-weight="700">${b}</text>`).join('')}
      ${o.charged ? `<circle cx="${x + 18}" cy="${y - 164}" r="13" fill="${CLASSCOL[CLASS[o.aa]]}" stroke="#0a1224" stroke-width="2"/><text x="${x + 18}" y="${y - 160}" font-size="10" text-anchor="middle" fill="#0a1224" font-family="Inter" font-weight="700">${THREE[o.aa]}</text>` : ''}
    </g>`;
  }
  function draw() {
    // mRNA: codon i staat in de P-plaats; tijdens translocatie verschuift alles één codon naar links
    const shift = phase === 2 ? t * cod : 0;
    const scan = phase === 'i0' ? SCAN0 : phase === 'i1' ? SCAN0 * (1 - t) : 0;   // 43S scant 5'→3'
    const off = SITE.P - cod / 2 - i * cod - shift + scan;
    // subeenheden: 40S (met Met-tRNAi) bindt eerst, 60S komt pas na herkenning van het AUG
    const smallOp = phase === 'i0' ? Math.min(1, t * 1.5) : released && phase === 3 ? 1 - t : 1;
    const largeOp = phase === 'i0' || phase === 'i1' ? 0 : phase === 'i2' ? Math.min(1, t * 1.4) : released && phase === 3 ? 1 - t : 1;
    const largeDy = phase === 'i2' ? -140 * (1 - t) : released && phase === 3 ? -140 * t : 0;
    $('tl-small').setAttribute('opacity', smallOp);
    $('tl-large').setAttribute('opacity', largeOp);
    $('tl-large').setAttribute('transform', `translate(0 ${largeDy})`);
    if (phase === 'i0') tr[0].op = smallOp;
    let m = `<line x1="0" y1="${yM}" x2="1600" y2="${yM}" stroke="${C.rna}" stroke-width="5"/>`;
    for (let j = 0; j < MRNA.length; j++) {
      const x = off - start * nt + j * nt + nt / 2;
      if (x < -20 || x > 1620) continue;
      const cIdx = Math.floor((j - start) / 3), inFrame = j >= start && cIdx <= stopIdx;
      m += `<rect x="${x - 12}" y="${yM + 4}" width="24" height="22" rx="4" fill="${BASE[MRNA[j]]}" opacity="${inFrame ? 1 : .45}"/>
            <text x="${x}" y="${yM + 20}" font-size="13" text-anchor="middle" fill="#0a1224" font-family="JetBrains Mono" font-weight="700">${MRNA[j]}</text>`;
      if (inFrame && (j - start) % 3 === 0) m += `<line x1="${x - nt / 2}" y1="${yM + 30}" x2="${x - nt / 2}" y2="${yM + 44}" stroke="${C.muted}" stroke-width="1.5"/>
            <text x="${x + nt}" y="${yM + 58}" font-size="11" text-anchor="middle" fill="${C.muted}" font-family="Inter">${translate(codons[cIdx]) === '*' ? 'STOP' : THREE[translate(codons[cIdx])]}</text>`;
    }
    const capX = off - start * nt - 30;
    $('tl-cap').innerHTML = capX > -40 ? `<circle cx="${capX}" cy="${yM}" r="13" fill="#ffb27a" stroke="${C.rna}" stroke-width="2"/><text x="${capX}" y="${yM + 4}" font-size="9" text-anchor="middle" fill="#3a1a05" font-family="Inter" font-weight="700">m⁷G</text>
      <text x="${capX}" y="${yM - 22}" font-size="13" text-anchor="middle" fill="${C.text}" font-family="JetBrains Mono">5'</text>` : '';
    const aStart = off - start * nt + (MRNA.length - POLYA.length) * nt, aEnd = off - start * nt + MRNA.length * nt;
    m += `<text x="${Math.min(1575, aEnd + 10)}" y="${yM - 12}" font-size="13" fill="${C.text}" font-family="JetBrains Mono">3'</text>`;
    $('tl-polya').innerHTML = aStart < 1600 ? `<rect x="${aStart}" y="${yM - 14}" width="${aEnd - aStart}" height="60" fill="transparent"/>
      <path d="M${aStart + 4},${yM + 64} v8 H${aEnd - 4} v-8" stroke="${C.rna}" stroke-width="1.5" fill="none"/>
      <text x="${(aStart + aEnd) / 2}" y="${yM + 90}" font-size="12" text-anchor="middle" fill="${C.rna}" font-family="Inter">${L({ nl: 'poly(A)-staart (hier verkort; ~200–250 nt)', en: 'poly(A) tail (shortened here; ~200–250 nt)' })}</text>` : '';
    const eifOp = phase === 'i0' ? Math.min(1, t * 2) : phase === 'i1' ? 1 - t : 0;
    $('tl-eif').innerHTML = eifOp > 0 ? `<g transform="translate(${capX + 36} ${yM - 30})" opacity="${eifOp}"><ellipse rx="32" ry="20" fill="${C.prot}" opacity=".85"/><text y="4" font-size="11" text-anchor="middle" fill="#fff" font-family="Inter">eIF4F</text></g>` : '';
    $('tl-mrna').innerHTML = m;
    $('tl-trnas').innerHTML = tr.map(o => trnaSVG({ ...o, x: o.x - shift })).join('');

    // polypeptide: vastgemaakt aan de tRNA die de keten draagt, dan door de tunnel naar buiten
    const carrier = tr.find(o => o.hasChain) ?? tr.find(o => o.site === 'P');
    let beads = '';
    const pts = [];
    const ax = released ? released.x : (carrier ? carrier.x - (phase === 2 ? t * cod : 0) + 18 : SITE.P + 18), ay = released ? released.y : yM - 22 - 164 + (carrier?.y ?? 0);
    for (let j = chain.length - 1, s = 0; j >= 0; j--, s++) {
      let x, y;
      if (s === 0) { x = ax; y = ay; }
      else if (s < 4) { x = ax + (815 - ax) * (s / 4); y = ay - s * 22; }
      else { const u = s - 4; x = 830 - u * 26 + Math.sin(u * 1.3) * 16; y = ay - 88 - u * 16 + Math.cos(u * 1.1) * 12; }
      pts.push([x, y, chain[j]]);
    }
    if (!released && carrier?.charged === false) pts.shift();
    beads += `<path d="${pts.map((p, j) => `${j ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('')}" stroke="${C.chain}" stroke-width="3" fill="none"/>`;
    beads += pts.map(([x, y, a]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="11" fill="${CLASSCOL[CLASS[a]]}" stroke="#0a1224" stroke-width="2"/><text x="${x.toFixed(1)}" y="${(y + 3.5).toFixed(1)}" font-size="9" text-anchor="middle" fill="#0a1224" font-family="Inter" font-weight="700">${THREE[a]}</text>`).join('');
    $('tl-chain').innerHTML = beads;
    $('tl-eef').innerHTML = eef ? `<g transform="translate(${eef.x} ${eef.y})" opacity="${eef.op}"><ellipse rx="34" ry="22" fill="${C.prot}" opacity=".8"/><text y="4" font-size="11" text-anchor="middle" fill="#fff" font-family="Inter">eEF1A·GTP</text></g>` : '';
    $('tl-rf').innerHTML = rf ? `<g transform="translate(${rf.x} ${rf.y})" opacity="${rf.op}"><path d="M-24,0 L-24,-120 L24,-120 L24,0 Z" fill="rgba(155,123,255,.35)" stroke="${C.prot}" stroke-width="3" rx="8"/><text y="-56" font-size="12" text-anchor="middle" fill="#fff" font-family="Inter">eRF1</text></g>` : '';
  }

  const status = s => $('tl-status').textContent = s;
  const DUR = { i0: 1600, i1: 3200, i2: 1400, 0: 1100, 1: 600, 2: 900, 3: 800 }; // initiatie · aankomst · peptidebinding · translocatie · E-tRNA weg
  function step(dt) {
    t += dt / DUR[phase];
    if (phase === 'i0') { status(L({ nl: "43S-complex (40S + Met-tRNAi + eIF2, eIF3 …) bindt via eIF4F aan de 5'-cap", en: "43S complex (40S + Met-tRNAi + eIF2, eIF3 …) binds the 5' cap via eIF4F" })); if (t >= 1) { phase = 'i1'; t = 0; } return; }
    if (phase === 'i1') { status(L({ nl: "Met het mRNA gebonden heet het 48S-complex: het scant 5'→3' door de 5'-UTR naar het eerste AUG in een goede Kozak-context (GCCACC AUG G)", en: "Bound to the mRNA it is called the 48S complex: it scans 5'→3' through the 5' UTR to the first AUG in a good Kozak context (GCCACC AUG G)" })); if (t >= 1) { phase = 'i2'; t = 0; } return; }
    if (phase === 'i2') { status(L({ nl: 'Start-AUG herkend → 60S-subeenheid bindt → 80S-ribosoom met Met-tRNAi in de P-plaats', en: 'Start AUG recognised → 60S subunit joins → 80S ribosome with Met-tRNAi in the P site' })); if (t >= 1) { phase = 0; t = 0; } return; }
    const aCodon = i + 1, stop = aCodon < codons.length && translate(codons[aCodon]) === '*';
    if (phase === 0) {
      if (stop) {                                           // terminatie: eRF1 herkent het stopcodon in de A-plaats
        rf = rf ?? { x: 1150, y: yM - 300, op: 0 };
        rf.x = 1150 + (SITE.A - 1150) * Math.min(1, t); rf.y = yM - 22 - 300 * (1 - Math.min(1, t)); rf.op = Math.min(1, t * 2);
        status(L({ nl: `Stopcodon ${codons[aCodon]} in de A-plaats → release factor eRF1 bindt`, en: `Stop codon ${codons[aCodon]} in the A site → release factor eRF1 binds` }));
      } else {
        let inc = tr.find(o => o.site === 'A');
        if (!inc) { const aa = translate(codons[aCodon]); inc = { codon: aCodon, site: 'A', aa, charged: true, x: 1250, y: -330, op: 0 }; tr.push(inc); eef = { x: 1280, y: 120, op: 1 }; }
        const u = Math.min(1, t);
        inc.x = 1250 + (SITE.A - 1250) * u; inc.y = -330 * (1 - u); inc.op = Math.min(1, u * 2);
        eef.x = inc.x + 40; eef.y = yM - 22 - 150 + inc.y - 10; eef.op = 1 - Math.max(0, (u - .8) / .2);
        status(L({ nl: `Aminoacyl-tRNA met ${THREE[inc.aa]} (anticodon voor ${codons[aCodon]}) komt in de A-plaats`, en: `Aminoacyl-tRNA carrying ${THREE[inc.aa]} (anticodon for ${codons[aCodon]}) enters the A site` }));
      }
      if (t >= 1) { phase = 1; t = 0; eef = null; }
    } else if (phase === 1) {
      if (stop) {                                           // hydrolyse: keten komt los
        released = released ?? { x: SITE.P + 18, y: yM - 186 };
        released.y -= dt * .25; status(L({ nl: 'Keten wordt vrijgemaakt en verlaat het ribosoom → vouwing', en: 'The chain is released and leaves the ribosome → folding' }));
        if (t >= 1) { phase = 3; t = 0; }
        return;
      }
      const p = tr.find(o => o.site === 'P'), a = tr.find(o => o.site === 'A');
      if (t >= .5 && p.charged) { p.charged = false; a.hasChain = true; chain.push(a.aa); a.charged = false; }
      status(L({ nl: 'Peptidebinding: de keten wordt overgedragen op het aminozuur in de A-plaats (rRNA = ribozym)', en: 'Peptide bond: the chain is transferred to the amino acid in the A site (rRNA = ribozyme)' }));
      if (t >= 1) { phase = 2; t = 0; }
    } else if (phase === 2) {
      status(L({ nl: 'Translocatie (eEF2): het ribosoom schuift één codon op · A → P, P → E', en: 'Translocation (eEF2): the ribosome moves one codon · A → P, P → E' }));
      if (t >= 1) {
        for (const o of tr) { o.site = o.site === 'A' ? 'P' : o.site === 'P' ? 'E' : 'gone'; o.x = SITE[o.site] ?? o.x - cod; }
        i++; phase = 3; t = 0;
      }
    } else if (phase === 3) {
      for (const o of tr.filter(o => o.site === 'E' || o.site === 'gone')) { o.y -= dt * .18; o.x -= dt * .12; o.op = Math.max(0, 1 - t); }
      if (rf) rf.op = Math.max(0, 1 - t);
      if (released) { released.y -= dt * .25; released.x -= dt * .1; }
      status(released ? L({ nl: 'Ribosoom valt uiteen in subeenheden en wordt gerecycleerd; het mRNA kan opnieuw vertaald worden', en: 'The ribosome splits into subunits and is recycled; the mRNA can be translated again' }) : L({ nl: 'Ongeladen tRNA verlaat de E-plaats', en: 'Uncharged tRNA leaves the E site' }));
      if (t >= 1) {
        for (let k = tr.length - 1; k >= 0; k--) if (tr[k].site === 'E' || tr[k].site === 'gone') tr.splice(k, 1);
        phase = 0; t = 0;
        if (released) { i = 0; chain = ['M']; released = null; rf = null; tr.length = 0; tr.push({ codon: 0, site: 'P', aa: 'M', charged: true, x: SITE.P, y: 0, op: 0 }); phase = 'i0'; }
      }
    }
  }
  function frame(now) {
    const dt = Math.min(50, now - last); last = now;
    if (!ctx.isPaused()) step(dt);
    draw();
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(raf);
}

/* ════════════════════════════════════════════════════════════════
   SCÈNE 5 · RNA-processing: cap → splicing → knippen + poly(A) → export (procedureel)
   ════════════════════════════════════════════════════════════════ */
function sceneProcessing() {
  const T = (nl, en) => L({ nl, en });
  return `<svg viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">${defs}
    <!-- kernenvelop met porie bovenaan -->
    <path d="M-50,95 Q800,40 1650,95" stroke="#7aa0d8" stroke-width="5" fill="none" opacity=".7"/>
    <path d="M-50,112 Q800,57 1650,112" stroke="#9cc0ff" stroke-width="3" fill="none" opacity=".8"/>
    <g data-node="export" data-color="${C.prot}" data-label="${T('Kernporie · export', 'Nuclear pore · export')}">
      <g transform="translate(900 74)"><rect x="-26" y="-22" width="52" height="44" rx="10" fill="#0b1427" stroke="${C.prot}" stroke-width="3"/><rect x="-14" y="-6" width="28" height="12" rx="4" fill="${C.prot}" opacity=".5"/></g>
    </g>
    <text x="1480" y="40" fill="${C.muted}" font-size="13" font-family="Inter" opacity=".7">${T('cytoplasma', 'cytoplasm')}</text>
    <g data-node="translatie" data-color="${C.rrna}" data-label="${T('Ribosomen · translatie', 'Ribosomes · translation')}">
      <rect x="1060" y="-10" width="320" height="70" fill="transparent"/>
      <path d="M1080,30 q25,-14 50,0 t50,0 t50,0 t50,0" stroke="${C.rna}" stroke-width="2.5" fill="none"/>
      ${[0, 1, 2, 3, 4, 5, 6].map(i => `<g transform="translate(${1092 + i * 28} ${26 + (i % 2) * 4})"><circle r="9" fill="${C.rrna}"/><circle cy="7" r="6" fill="#1f9d86"/></g>`).join('')}
    </g>
    <text x="1480" y="150" fill="${C.muted}" font-size="13" font-family="Inter" opacity=".7">${T('nucleoplasma', 'nucleoplasm')}</text>

    <g data-node="rnapol" data-color="${C.prot}" data-label="${T('RNA-polymerase II', 'RNA polymerase II')}"><g id="pr-pol"></g></g>
    <g id="pr-down"></g>
    <g data-node="splicing" data-color="${C.prot}" data-label="${T('Spliceosoom', 'Spliceosome')}"><g id="pr-intron"></g><g id="pr-snrnp"></g></g>
    <g data-node="rnaprocessing" data-nolabel><g id="pr-mrna"></g></g>
    <g data-node="capping" data-color="${C.rna}" data-label="${T("5'-cap", "5' cap")}"><g id="pr-cap"></g></g>
    <g data-node="nmd" data-color="${C.prot}" data-label="${T('EJC → NMD-controle', 'EJC → NMD check')}"><g id="pr-ejc"></g></g>
    <g data-node="polya" data-color="${C.rna}" data-label="${T('Knippen & poly(A)', 'Cleavage & poly(A)')}"><g id="pr-pa"></g></g>

    <g font-family="Inter" fill="${C.muted}">
      <text x="800" y="790" text-anchor="middle" font-size="15" fill="${C.text}" id="pr-step"></text>
      <text x="800" y="818" text-anchor="middle" font-size="13" id="pr-status"></text>
    </g>
    <g id="pr-legend" font-family="Inter" font-size="12" fill="${C.muted}">
      <rect x="60" y="850" width="26" height="8" rx="4" fill="${C.rna}"/><text x="94" y="858">${T('exon', 'exon')}</text>
      <rect x="160" y="852" width="26" height="4" rx="2" fill="#a9876f"/><text x="194" y="858">${T('intron', 'intron')}</text>
    </g>
  </svg>`;
}

function initProcessing(svg, ctx) {
  const $ = id => svg.getElementById(id);
  const T = (nl, en) => L({ nl, en });
  const Y = 520;
  // oorspronkelijke posities (px) langs het pre-mRNA; ~3 px per nucleotide
  const X = { cap: 146, e1: [160, 360], i1: [360, 680], br1: 640, e2: [680, 850], i2: [850, 1010], e3: [1010, 1200], utr: [1200, 1330], pas: [1250, 1292], cut: 1330, dse: [1362, 1404], down: [1330, 1500], pol: 1535 };
  const L1 = X.i1[1] - X.i1[0], L2 = X.i2[1] - X.i2[0];
  const PH = [ // [duur ms, stapnaam, status]
    [2200, T('1 · Capping', '1 · Capping'), T("RNGTT verwijdert een fosfaat en koppelt GMP 5'–5'; RNMT methyleert → m⁷G-cap, daarna gebonden door CBC", "RNGTT removes a phosphate and adds GMP 5'–5'; RNMT methylates → m⁷G cap, then bound by CBC")],
    [2400, T('2 · Spliceosoom: herkenning (E/A-complex)', '2 · Spliceosome: recognition (E/A complex)'), T("U1 paart met de 5'-splicesite (GU), U2AF bindt het polypyrimidinestuk en AG, U2 paart rond het vertakkingspunt-A (de A puilt uit)", "U1 pairs with the 5' splice site (GU), U2AF binds the polypyrimidine tract and AG, U2 pairs around the branch-point A (the A bulges out)")],
    [1800, T('3 · Tri-snRNP bindt (B-complex)', '3 · Tri-snRNP joins (B complex)'), T('Het U4/U6·U5-tri-snRNP voegt zich bij het complex', 'The U4/U6·U5 tri-snRNP joins the complex')],
    [1600, T('4 · Activatie', '4 · Activation'), T('U1 en U4 verlaten het complex; U6 paart met de 5\'-splicesite en met U2 → katalytisch actief spliceosoom (RNA-katalyse)', "U1 and U4 leave; U6 pairs with the 5' splice site and with U2 → catalytically active spliceosome (RNA catalysis)")],
    [2400, T('5 · Eerste transesterificatie', '5 · First transesterification'), T("De 2'-OH van het vertakkingspunt-A valt de 5'-splicesite aan → vrij exon 1 + lariat-intermediair (2'–5'-binding)", "The 2'-OH of the branch-point A attacks the 5' splice site → free exon 1 + lariat intermediate (2'–5' bond)")],
    [2600, T('6 · Tweede transesterificatie', '6 · Second transesterification'), T("De 3'-OH van exon 1 valt de 3'-splicesite aan → exonen gekoppeld, lariat vrij (DBR1 ontvertakt, daarna afbraak); EJC blijft ~20–24 nt stroomopwaarts van de junctie", "The 3'-OH of exon 1 attacks the 3' splice site → exons joined, lariat released (debranched by DBR1, then degraded); an EJC stays ~20–24 nt upstream of the junction")],
    [1800, T('7 · Tweede intron', '7 · Second intron'), T('Zelfde mechanisme; splicing verloopt grotendeels co-transcriptioneel', 'Same mechanism; splicing is largely co-transcriptional')],
    [2000, T('8 · 3\'-herkenning', "8 · 3' end recognition"), T('CPSF bindt het AAUAAA-signaal, CstF het GU-rijke element stroomafwaarts', 'CPSF binds the AAUAAA signal, CstF the GU-rich element downstream')],
    [1800, T('9 · Knippen', '9 · Cleavage'), T("CPSF73 knipt ~10–30 nt na AAUAAA. Xrn2 breekt het stroomafwaartse RNA af en helpt Pol II loskomen (torpedomodel)", "CPSF73 cleaves ~10–30 nt after AAUAAA. Xrn2 degrades the downstream RNA and helps release Pol II (torpedo model)")],
    [2600, T('10 · Polyadenylatie', '10 · Polyadenylation'), T('Poly(A)-polymerase voegt ~200–250 A toe; PABPN1 bedekt de staart en regelt de lengte', 'Poly(A) polymerase adds ~200–250 A; PABPN1 coats the tail and controls its length')],
    [3000, T('11 · Rijp mRNP → export', '11 · Mature mRNP → export'), T('TREX en de exportreceptor NXF1–NXT1 brengen het mRNP naar de kernporie', 'TREX and the export receptor NXF1–NXT1 take the mRNP to the nuclear pore')],
  ];
  const START = []; let acc = 0; for (const p of PH) { START.push(acc); acc += p[0]; }
  const TOTAL = acc + 800;
  let clock = ctx.startAt || 0, last = performance.now(), raf;
  const prog = i => Math.max(0, Math.min(1, (clock - START[i]) / PH[i][0]));   // 0..1 binnen fase i
  const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const pill = (x, y, w, h, txt, col = C.prot, op = 1) => op <= 0 ? '' : `<g opacity="${op.toFixed(2)}"><rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${col}" opacity=".85"/><text x="${x}" y="${y + 4}" font-size="12" text-anchor="middle" fill="#fff" font-family="Inter" font-weight="600">${txt}</text></g>`;
  const seg = (x0, x1, y, col, w) => `<line x1="${x0.toFixed(1)}" y1="${y}" x2="${x1.toFixed(1)}" y2="${y}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
  const txt = (x, y, s, col = C.text, size = 12) => `<text x="${x.toFixed(1)}" y="${y}" font-size="${size}" text-anchor="middle" fill="${col}" font-family="JetBrains Mono" font-weight="600">${s}</text>`;

  function frame(now) {
    const dt = Math.min(50, now - last); last = now;
    if (!ctx.isPaused()) clock += dt;
    if (clock > TOTAL) clock = 0;
    let ph = PH.length - 1; for (let i = 0; i < PH.length; i++) if (clock >= START[i]) ph = i;
    $('pr-step').textContent = PH[ph][1];
    $('pr-status').textContent = PH[ph][2];

    const lig1 = ease(prog(5)), lig2 = ease(prog(6));        // exon 1 schuift naar exon 2; daarna exon 1+2 naar exon 3
    const off = x => x + (x <= X.e1[1] + .1 ? lig1 * L1 : 0) + (x <= X.e2[1] + .1 ? lig2 * L2 : 0);
    const cut = prog(8) > .35, gone = ease(prog(10));
    const moveY = -330 * gone, fade = 1 - Math.max(0, (gone - .6) / .4);
    const up = `transform="translate(0 ${moveY.toFixed(1)})" opacity="${fade.toFixed(2)}"`;

    // mRNA-exonen (+ 3'-UTR)
    let m = `<g ${up}>`;
    m += seg(off(X.e1[0]), off(X.e1[1]), Y, C.rna, 9) + seg(off(X.e2[0]), off(X.e2[1]), Y, C.rna, 9) + seg(X.e3[0], X.e3[1], Y, C.rna, 9);
    m += seg(X.utr[0], X.utr[1], Y, '#d9854a', 6);
    m += txt(off((X.e1[0] + X.e1[1]) / 2), Y + 34, 'exon 1', C.rna) + txt(off((X.e2[0] + X.e2[1]) / 2), Y + 34, 'exon 2', C.rna) + txt((X.e3[0] + X.e3[1]) / 2, Y + 34, 'exon 3', C.rna);
    m += txt((X.pas[0] + X.pas[1]) / 2, Y - 16, 'AAUAAA', '#ffb27a', 11) + txt(X.utr[0] + 30, Y + 34, "3'-UTR", '#d9854a', 11);
    // poly(A)-staart
    const pa = ease(prog(9));
    if (ph >= 9) {
      const len = 150 * Math.min(1, pa + (ph > 9 ? 1 : 0));
      m += `<path d="M${X.cut},${Y} q${len * .4},${len * .05} ${len * .7},${len * .25} t${len * .3},${len * .15}" stroke="#ffb27a" stroke-width="5" fill="none" stroke-dasharray="2 3"/>`;
      for (let k = 12; k < len; k += 26) m += `<circle cx="${(X.cut + k * .95).toFixed(1)}" cy="${(Y + k * .22 + 6).toFixed(1)}" r="6" fill="${C.prot}" opacity=".7"/>`;
      if (len > 60) m += txt(X.cut + 90, Y + 72, 'poly(A)', '#ffb27a', 12);
    }
    m += `</g>`;
    $('pr-mrna').innerHTML = m;

    // 5'-cap (+ CBC)
    const capOp = Math.min(1, prog(0) * 1.6), capX = off(X.cap);
    $('pr-cap').innerHTML = `<g ${up}>` + (capOp > 0 ? `<g opacity="${capOp}"><circle cx="${capX}" cy="${Y}" r="13" fill="#ffb27a" stroke="${C.rna}" stroke-width="2"/><text x="${capX}" y="${Y + 4}" font-size="9" text-anchor="middle" fill="#3a1a05" font-family="Inter" font-weight="700">m⁷G</text></g>` : '')
      + pill(capX + 6, Y - 52, 110, 24, 'RNGTT · RNMT', C.prot, ph === 0 ? 1 - Math.max(0, (prog(0) - .75) / .25) : 0)
      + pill(capX - 4, Y - 30, 46, 20, 'CBC', '#6f5bd6', ph >= 1 ? 1 : 0)
      + txt(capX - 10, Y - 60, "5'", C.text, 13) + `</g>`;

    // introns: intron 1 vormt de lariat, intron 2 wordt korter en verdwijnt
    const lar = ease(prog(4));                                // 0 = recht, 1 = lariat
    const rel = ease(prog(5));                                // lariat komt vrij
    let intr = '';
    if (ph <= 5) {
      const a0 = X.i1[0], bx = X.br1, a1 = X.i1[1], r = (bx - a0) / (2 * Math.PI);
      const cx = bx, cy = Y - 18 - r;
      let d = '';
      for (let k = 0; k <= 40; k++) {
        const f = k / 40, sx = a0 + f * (bx - a0), sy = Y;
        const ang = Math.PI / 2 + f * 2 * Math.PI;             // cirkel die sluit aan het vertakkingspunt
        const lx = cx + r * Math.cos(ang) * -1, ly = cy + r * Math.sin(ang);
        const px = sx + (lx - sx) * lar, py = sy + (ly - sy) * lar;
        d += `${k ? 'L' : 'M'}${px.toFixed(1)},${py.toFixed(1)}`;
      }
      d += `L${bx},${Y - 18 * lar} L${a1},${Y}`;
      intr += `<g transform="translate(0 ${(-170 * rel).toFixed(1)})" opacity="${(1 - rel * .9).toFixed(2)}">
        <path d="${d}" stroke="#a9876f" stroke-width="4" fill="none" stroke-linejoin="round"/>
        ${txt(a0 + 14, Y - 14, lar < .3 ? 'GU' : '', '#ffc247', 11)}
        ${txt(bx, Y - 30 * lar - 10, 'A', '#5ad17a', 13)}
        ${txt(a1 - 18, Y - 14, 'AG', '#ffc247', 11)}
        ${lar < .1 ? txt(a1 - 58, Y + 22, '(Py)n', '#a9876f', 11) : ''}
      </g>`;
    }
    if (ph <= 6) {
      const s2 = off(X.i2[0]), e2 = X.i2[1];
      if (e2 - s2 > 2) intr += `<g opacity="${(1 - lig2).toFixed(2)}">${seg(s2, e2, Y, '#a9876f', 4)}${lig2 < .2 ? txt(s2 + 14, Y - 14, 'GU', '#ffc247', 11) + txt(e2 - 16, Y - 14, 'AG', '#ffc247', 11) : ''}</g>`;
      if (ph === 6) intr += `<circle cx="${(e2 - 30).toFixed(1)}" cy="${(Y - 40 - 90 * lig2).toFixed(1)}" r="${(14 * (1 - lig2 * .3)).toFixed(1)}" fill="none" stroke="#a9876f" stroke-width="3" opacity="${(lig2 * (1 - lig2) * 4).toFixed(2)}"/>`;
    }
    $('pr-intron').innerHTML = intr;

    // snRNP's rond intron 1
    const fadeIn = (i, t0 = 0) => Math.min(1, Math.max(0, (prog(i) - t0) * 3));
    const u1 = ph < 1 ? 0 : ph <= 2 ? fadeIn(1) : ph === 3 ? 1 - prog(3) * 1.5 : 0;
    const u2af = ph < 1 ? 0 : ph <= 3 ? fadeIn(1) : ph === 4 ? 1 - prog(4) * 2 : 0;
    const u2 = ph < 1 ? 0 : ph === 1 ? fadeIn(1, .4) : ph <= 5 ? 1 - (ph === 5 ? prog(5) : 0) : 0;
    const tri = ph < 2 ? 0 : ph === 2 ? fadeIn(2) : ph <= 5 ? 1 - (ph === 5 ? prog(5) : 0) : 0;
    const u4 = ph < 2 ? 0 : ph === 2 ? fadeIn(2) : ph === 3 ? 1 - prog(3) * 1.5 : 0;
    const lyUp = -170 * rel;
    let sn = '';
    if (tri > 0) sn += `<g opacity="${tri.toFixed(2)}" transform="translate(0 ${lyUp.toFixed(1)})"><ellipse cx="${(X.i1[0] + X.br1) / 2 + 20}" cy="${Y - 110}" rx="170" ry="62" fill="rgba(155,123,255,.16)" stroke="${C.prot}" stroke-width="2" stroke-dasharray="6 4"/></g>`;
    sn += `<g transform="translate(0 ${lyUp.toFixed(1)})">`;
    sn += pill(X.i1[0] + 6, Y - 34, 44, 24, 'U1', '#8e6cf0', Math.max(0, u1));
    sn += pill(X.br1, Y + 34, 44, 24, 'U2', '#6f5bd6', Math.max(0, u2));
    sn += pill(X.i1[1] - 28, Y + 60, 64, 22, 'U2AF', '#5a4bb8', Math.max(0, u2af));
    sn += pill(X.i1[0] + 110, Y - 132, 86, 24, 'U6·U5', '#8e6cf0', tri);
    sn += pill(X.i1[0] + 220, Y - 132, 50, 24, 'U4', '#5a4bb8', Math.max(0, u4));
    sn += `</g>`;
    $('pr-snrnp').innerHTML = sn;

    // EJC ~20–24 nt stroomopwaarts van elke exon-exonjunctie
    const ejc = [];
    if (ph >= 5 && lig1 > .95) ejc.push(off(X.e1[1]) - 66);
    if (ph >= 6 && lig2 > .95) ejc.push(off(X.e2[1]) - 66);
    $('pr-ejc').innerHTML = `<g ${up}>` + ejc.map(x => pill(x, Y - 26, 44, 20, 'EJC', '#7a62e0')).join('') + `</g>`;

    // 3'-uiteinde: CPSF/CstF, knippen, PAP, Xrn2-torpedo op het stroomafwaartse RNA, Pol II
    const f3 = ph < 7 ? 0 : ph === 7 ? fadeIn(7) : ph <= 9 ? 1 : 0;
    const cstf = ph < 7 ? 0 : ph === 7 ? fadeIn(7) : ph === 8 ? 1 - prog(8) : 0;
    let p3 = `<g ${up}>`;
    p3 += pill((X.pas[0] + X.pas[1]) / 2, Y - 46, 64, 24, 'CPSF', '#8e6cf0', f3);
    p3 += `</g>`;
    p3 += pill((X.dse[0] + X.dse[1]) / 2, Y + 40, 60, 22, 'CstF', '#5a4bb8', cstf);
    if (ph === 8 && prog(8) > .3 && prog(8) < .6) p3 += `<path d="M${X.cut - 10},${Y - 22} l20,44 M${X.cut + 10},${Y - 22} l-20,44" stroke="#fff" stroke-width="3" opacity=".9"/>`;
    if (ph === 9) p3 += pill(X.cut + 40 + 120 * ease(prog(9)), Y + 18 + 30 * ease(prog(9)), 50, 22, 'PAP', '#6f5bd6');
    $('pr-pa').innerHTML = p3;

    // stroomafwaarts RNA naar Pol II + Xrn2
    const chew = ph < 8 ? 0 : ph === 8 ? Math.max(0, (prog(8) - .45) / .55) * .5 : ph === 9 ? .5 + .5 * prog(9) : 1;
    const polOp = ph < 9 ? 1 : ph === 9 ? 1 - Math.max(0, (prog(9) - .6) / .4) : 0;
    let dn = '';
    const ds = cut ? X.cut + 6 + chew * (X.down[1] - X.cut) : X.cut;
    if (!cut) dn += seg(X.cut, X.down[1], Y, '#c07a4a', 5);
    else if (ds < X.down[1] - 2) dn += seg(ds, X.down[1], Y, '#c07a4a', 5) + `<g opacity="${polOp.toFixed(2)}">${pill(ds - 4, Y - 26, 52, 22, 'Xrn2', '#5a4bb8')}</g>`;
    dn += txt((X.dse[0] + X.dse[1]) / 2, Y + 20, ph < 9 ? T('GU-rijk', 'GU-rich') : '', '#c07a4a', 10);
    $('pr-down').innerHTML = dn;
    $('pr-pol').innerHTML = polOp > 0 ? `<g opacity="${polOp.toFixed(2)}" transform="translate(${X.pol} ${Y})"><path d="M-40,-10 C-40,-60 10,-70 40,-50 C70,-30 70,30 40,50 C10,70 -40,60 -40,-10Z" fill="rgba(155,123,255,.22)" stroke="${C.prot}" stroke-width="3"/><text x="0" y="5" font-size="12" text-anchor="middle" fill="${C.text}" font-family="Inter">Pol II</text></g>
      <line x1="${X.pol + 10}" y1="${Y + 58}" x2="1650" y2="${Y + 58}" stroke="${C.dna}" stroke-width="5" opacity="${polOp.toFixed(2)}"/>` : '';

    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(raf);
}

/* ════════════════════════════════════════════════════════════════ */
export const SCENES = {
  cel: {
    node: 'cel', title: { nl: 'Menselijke cel', en: 'Human cell' }, scale: '≈ 20 µm', time: { nl: 'minuten – uren', en: 'minutes – hours' }, org: { nl: 'menselijke epitheelcel', en: 'human epithelial cell' },
    svg: sceneCel,
    legend: [[C.tdna, { nl: 'viraal DNA / adenovirus', en: 'viral DNA / adenovirus' }], [C.trna, { nl: 'lipidenanodeeltje', en: 'lipid nanoparticle' }], [C.dna, { nl: 'kern-DNA', en: 'nuclear DNA' }], [C.rna, 'mRNA'], [C.rrna, { nl: 'ribosomen', en: 'ribosomes' }], [C.prot, { nl: 'kernporiën', en: 'nuclear pores' }], [C.mem, { nl: 'membranen', en: 'membranes' }], ['#5a3f36', 'mitochondrion'], ['#3d2a5c', { nl: 'lysosoom', en: 'lysosome' }], ['#d7b46a', 'Golgi']],
    simplified: {
      nl: 'Het adenovirus (~90 nm) en het lipidenanodeeltje (~100 nm) zijn sterk vergroot: in werkelijkheid zijn ze honderden keren kleiner dan de cel. mRNA-moleculen en ribosomen zijn symbolen; echte aantallen (miljoenen ribosomen) en groottes zijn niet op schaal. Het cytoskelet toont enkel microtubuli vanuit het centrosoom.',
      en: 'The adenovirus (~90 nm) and the lipid nanoparticle (~100 nm) are greatly enlarged: in reality they are hundreds of times smaller than the cell. mRNA molecules and ribosomes are symbols; real numbers (millions of ribosomes) and sizes are not to scale. The cytoskeleton only shows microtubules radiating from the centrosome.' },
  },
  kern: {
    node: 'kern', title: { nl: 'Celkern', en: 'Nucleus' }, scale: '≈ 8 µm', time: { nl: 'seconden – minuten', en: 'seconds – minutes' }, org: { nl: 'menselijke cel', en: 'human cell' },
    svg: sceneKern,
    legend: [[C.dna, { nl: 'chromatine', en: 'chromatin' }], ['#27457e', { nl: 'heterochromatine', en: 'heterochromatin' }], [C.rrna, { nl: 'nucleolus / ribosomen', en: 'nucleolus / ribosomes' }], [C.prot, { nl: 'kernporiën & Pol II', en: 'nuclear pores & Pol II' }], [C.rna, 'mRNA'], [C.tdna, { nl: 'adenovirus-DNA', en: 'adenovirus DNA' }]],
    simplified: {
      nl: 'Het aantal kernporiën is veel groter dan getekend (~3 000 per menselijke kern). De "kerstboom" bij de transcriptieplaats is gebaseerd op elektronenmicroscopie (Miller-preparaten): RNA\'s worden langer richting het einde van het gen. Het adenovirus-DNA gaat in werkelijkheid als lineair genoom met eiwitten door de porie nadat het capside aan de porie uiteenvalt; de plek in de kern is willekeurig gekozen.',
      en: 'There are far more nuclear pores than drawn (~3,000 per human nucleus). The "Christmas tree" at the transcription site is based on electron microscopy (Miller spreads): RNAs get longer towards the end of the gene. In reality the adenovirus DNA passes through the pore as a linear, protein-bound genome after the capsid disassembles at the pore; its position in the nucleus is arbitrary.' },
  },
  transcriptie: {
    node: 'transcriptie', title: { nl: 'Transcriptie', en: 'Transcription' }, scale: '≈ 25 nm', time: { nl: '≈ 30 nt/s ≈ 2–3 kb/min (hier sterk vertraagd)', en: '≈ 30 nt/s ≈ 2–3 kb/min (strongly slowed down here)' }, org: { nl: 'eukaryoot (RNA-pol II)', en: 'eukaryote (RNA Pol II)' },
    svg: sceneTranscriptie, init: initTranscriptie,
    legend: [[C.dna, { nl: 'coderende streng', en: 'coding strand' }], [C.dna2, { nl: 'matrijsstreng', en: 'template strand' }], [C.rna, 'pre-mRNA'], [C.prot, { nl: 'RNA-polymerase II', en: 'RNA polymerase II' }], [BASE.A, 'A'], [BASE.T, 'T / U'], [BASE.G, 'G'], [BASE.C, 'C']],
    extra: {
      nl: '<p style="font-size:13px;color:#93a0bb">Kijk naar de kleuren: de RNA-basen in de RNA–DNA-hybride zijn complementair aan de matrijsstreng en dus gelijk aan de coderende streng (U in plaats van T).</p>',
      en: '<p style="font-size:13px;color:#93a0bb">Look at the colours: the RNA bases in the RNA–DNA hybrid are complementary to the template strand and therefore identical to the coding strand (U instead of T).</p>' },
    simplified: {
      nl: 'De dubbelhelix is als platte golf getekend (~10,5 bp per winding klopt wel). De bel (~13 bp) en de RNA–DNA-hybride (~8 bp) zijn op schaal; de vorm van Pol II is schematisch (echte structuren: PDB 1I6H gist, 5FLM zoogdier). Algemene transcriptiefactoren, Mediator en nucleosomen zijn weggelaten. Capping gebeurt hier na ~25 nt, in werkelijkheid rond 20–30 nt.',
      en: 'The double helix is drawn as a flat wave (~10.5 bp per turn is correct). The bubble (~13 bp) and the RNA–DNA hybrid (~8 bp) are to scale; the shape of Pol II is schematic (real structures: PDB 1I6H yeast, 5FLM mammal). General transcription factors, Mediator and nucleosomes are omitted. Capping happens here after ~25 nt, in reality at around 20–30 nt.' },
  },
  rnaprocessing: {
    node: 'rnaprocessing', title: { nl: 'RNA-processing', en: 'RNA processing' }, scale: '≈ 50 nm', time: { nl: 'seconden – minuten (hier vertraagd)', en: 'seconds – minutes (slowed down here)' }, org: { nl: 'mens (Pol II-transcripten)', en: 'human (Pol II transcripts)' },
    svg: sceneProcessing, init: initProcessing,
    legend: [[C.rna, 'exon'], ['#a9876f', 'intron'], ['#ffb27a', { nl: "m⁷G-cap / poly(A)", en: "m⁷G cap / poly(A)" }], [C.prot, { nl: 'snRNP\'s & processingfactoren', en: 'snRNPs & processing factors' }], [C.dna, 'DNA']],
    extra: {
      nl: '<p style="font-size:13px;color:#93a0bb">Examenrelevant: splicing = <b>twee transesterificaties</b>. Eerst valt de 2\'-OH van het vertakkingspunt-A de 5\'-splicesite aan (lariat), daarna de vrije 3\'-OH van exon 1 de 3\'-splicesite. De katalyse gebeurt door RNA (U2/U6): het spliceosoom is een ribozym.</p>',
      en: '<p style="font-size:13px;color:#93a0bb">Exam-relevant: splicing = <b>two transesterifications</b>. First the 2\'-OH of the branch-point A attacks the 5\' splice site (lariat), then the free 3\'-OH of exon 1 attacks the 3\' splice site. Catalysis is carried out by RNA (U2/U6): the spliceosome is a ribozyme.</p>' },
    simplified: {
      nl: 'De stappen staan na elkaar, maar in de cel overlappen ze en gebeuren ze grotendeels terwijl Pol II nog transcribeert. Het spliceosoom bevat ook ~100–150 eiwitten (o.a. Prp8, helicasen) die niet getekend zijn; de U-snRNP\'s zijn bolletjes. De poly(A)-staart en afstanden zijn niet op schaal (~3 px per nt). Echte structuren: spliceosoomcomplexen via cryo-EM (bv. PDB 5YZG, humaan C-complex na stap 1; 5XJC, C*-complex vlak voor de exonligatie).',
      en: 'The steps are shown one after another, but in the cell they overlap and happen largely while Pol II is still transcribing. The spliceosome also contains ~100–150 proteins (e.g. Prp8, helicases) that are not drawn; the U snRNPs are shown as blobs. The poly(A) tail and distances are not to scale (~3 px per nt). Real structures: spliceosome complexes by cryo-EM (e.g. PDB 5YZG, human C complex after step 1; 5XJC, C* complex just before exon ligation).' },
  },
  translatie: {
    node: 'translatie', title: { nl: 'Translatie', en: 'Translation' }, scale: '≈ 25 nm', time: { nl: '≈ 5–6 aminozuren/s (hier vertraagd)', en: '≈ 5–6 amino acids/s (slowed down here)' }, org: { nl: 'eukaryoot (80S)', en: 'eukaryote (80S)' },
    svg: sceneTranslatie, init: initTranslatie,
    legend: [[C.rna, 'mRNA'], [C.trna, 'tRNA'], [C.rrna, { nl: 'ribosoom', en: 'ribosome' }], [C.prot, { nl: 'factoren (eIF4F, eEF1A, eRF1)', en: 'factors (eIF4F, eEF1A, eRF1)' }], [CLASSCOL.h, { nl: 'hydrofoob', en: 'hydrophobic' }], [CLASSCOL.p, { nl: 'polair', en: 'polar' }], [CLASSCOL['+'], { nl: 'positief geladen', en: 'positively charged' }], [CLASSCOL['-'], { nl: 'negatief geladen', en: 'negatively charged' }], [CLASSCOL.s, 'Gly / Pro']],
    extra: {
      nl: '<p style="font-size:13px;color:#93a0bb">Opgebouwd zoals het translatiefilmpje uit de les: 43S bindt de 5\'-cap, het 48S-complex scant naar het start-AUG (Kozak-context GCCACC<b>AUG</b>G) → 60S bindt → elongatie → stopcodon; aan het 3\'-uiteinde de poly(A)-staart. De aminozuren worden niet getekend maar berekend uit de genetische code; de anticodons zijn complementair en antiparallel (3\'→5\' gelezen).</p>',
      en: '<p style="font-size:13px;color:#93a0bb">Built like the translation movie from the course: 43S binds the 5\' cap, the 48S complex scans to the start AUG (Kozak context GCCACC<b>AUG</b>G) → 60S joins → elongation → stop codon; the poly(A) tail sits at the 3\' end. The amino acids are not drawn by hand but computed from the genetic code; the anticodons are complementary and antiparallel (read 3\'→5\').</p>' },
    simplified: {
      nl: 'Het ribosoom is een 2D-schets (echte structuur: PDB 4UG0); tRNA\'s zijn vereenvoudigde L-vormen. eEF2 (translocatie), GTP-hydrolyse en de rol van de E-plaats zijn sterk vereenvoudigd. De aminozuurkleuren volgen de cursusindeling (hydrofoob / polair / geladen); histidine staat bij positief, wat afhangt van de pH.',
      en: 'The ribosome is a 2D sketch (real structure: PDB 4UG0); tRNAs are simplified L shapes. eEF2 (translocation), GTP hydrolysis and the role of the E site are strongly simplified. Amino-acid colours follow the course grouping (hydrophobic / polar / charged); histidine is shown as positive, which depends on pH.' },
  },
};

export const EXTERNAL = { dnavormen: '../02-dna-vormen/index.html' };
