import { C, L, defs, rng, squiggle } from '../../kit.js';

export function sceneKern() {
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
    <g data-node="er" data-color="#8fb3e8" data-nolabel>${cyto}</g>
    <g data-node="translatie" data-color="${C.rrna}" data-label="${L({ nl: 'Polysomen · translatie', en: 'Polysomes · translation' })}">
      <rect x="1230" y="250" width="330" height="480" fill="transparent"/>${poly}
    </g>
    <!-- kernenvelop: dubbel membraan met perinucleaire ruimte -->
    <circle cx="${cx}" cy="${cy}" r="${R + 12}" fill="none" stroke="#7aa0d8" stroke-width="5" opacity=".75"/>
    <circle cx="${cx}" cy="${cy}" r="${R + 5}" fill="none" stroke="#12203f" stroke-width="8"/>
    <circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#gNuc)" stroke="#9cc0ff" stroke-width="4"/>
    <g data-node="chromatine" data-color="#27457e" data-nolabel>${hetero}</g>
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
    <text x="${cx}" y="${cy + R - 60}" fill="${C.muted}" font-size="22" text-anchor="middle" font-family="Inter" opacity=".75">${L({ nl: 'nucleoplasma', en: 'nucleoplasm' })}</text>
    <text x="1420" y="860" fill="${C.muted}" font-size="22" text-anchor="middle" font-family="Inter" opacity=".75">${L({ nl: 'cytoplasma', en: 'cytoplasm' })}</text>
  </svg>`;
}
