import { C, L, defs, rng, squiggle } from '../../kit.js';

export function sceneCel() {
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
    <text x="${mtoc[0] - 16}" y="${mtoc[1] + 34}" fill="${C.muted}" font-size="22" text-anchor="end" font-family="Inter" opacity=".85">${L({ nl: 'centrosoom', en: 'centrosome' })}</text>
    ${mito}${lyso}
    <g transform="translate(600 610)" opacity=".85">${[0, 10, 20, 30].map(o => `<path d="M${-46 + o / 2},${o} Q0,${o - 18} ${46 - o / 2},${o}" stroke="#d7b46a" stroke-width="5.5" fill="none" stroke-linecap="round"/>`).join('')}</g>
    <text x="590" y="676" fill="${C.muted}" font-size="22" text-anchor="middle" font-family="Inter" opacity=".85">Golgi</text>

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
    <!-- route 3 (verhaal 2): een signaalmolecule (groeifactor EGF) bindt een receptor in het membraan -->
    <g data-node="signaal" data-color="${C.prot}" data-label="${L({ nl: 'Signaalmolecule (EGF)', en: 'Signal molecule (EGF)' })}">
      <circle data-anchor="signaal" cx="1350" cy="118" r="1" fill="none"/>
      <rect x="1235" y="110" width="200" height="130" fill="transparent"/>
      ${[[1236, 222, -38], [1262, 240, -35]].map(([x, y, rot]) => `<g transform="translate(${x} ${y}) rotate(${rot + 90})">
        <path d="M0,26 V-6 M0,-6 L-10,-24 M0,-6 L10,-24" stroke="${C.prot}" stroke-width="5" stroke-linecap="round" fill="none"/></g>`).join('')}
      ${[[1290, 180], [1335, 150], [1385, 190], [1400, 140]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="8" fill="#5fd3e6" opacity="${i ? .85 : 1}"><animate attributeName="cy" values="${y};${y - 6};${y}" dur="${3 + i * .7}s" repeatCount="indefinite"/></circle>`).join('')}
    </g>
    <text x="110" y="120" fill="${C.muted}" font-size="22" font-family="Inter" opacity=".75">${L({ nl: 'extracellulair', en: 'extracellular' })}</text>
    <text x="1075" y="600" fill="${C.muted}" font-size="22" font-family="Inter" opacity=".75">cytosol</text>
  </svg>`;
}
