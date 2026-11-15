import { C, L, defs, rng, squiggle, f1 } from '../../kit.js';
import { membraanPts, kernEnvelop, kernporie, mitochondrion, cisterne, blaasje, ribosoomKlein, eiwit, eiwitPad, tmHelix, ptsCirkel } from '../../bio.js';
import { capsid, viralGenome, lnpParticle, zakBoog, ptsPad } from './_bits.js';

/*
 * Overzicht van een menselijke cel (detailronde 15-11-2026): plasmamembraan als lipidedubbellaag, kern met een dubbel
 * membraan en poriën, ruw ER als platte zakken met ribosomen aan de cytosolkant, Golgi als gestapelde cisternen,
 * mitochondriën met cristae, lysosomen en endosomen als blaasjes met één membraan, ribosomen als twee eenheden.
 */
export function sceneCel() {
  const r = rng(7);
  const nx = 790, ny = 470, nr = 150;
  const P = (a, rad, cx = nx, cy = ny) => [cx + Math.cos(a * Math.PI / 180) * rad, cy + Math.sin(a * Math.PI / 180) * rad];
  // plasmamembraan: onregelmatige epitheelcel
  const wob = a => 1 + .06 * Math.sin(a * 3 * Math.PI / 180) + .03 * Math.sin(a * 7 * Math.PI / 180);
  const memAt = a => [800 + Math.cos(a * Math.PI / 180) * 560 * wob(a), 460 + Math.sin(a * Math.PI / 180) * 360 * wob(a)];
  const memP = []; for (let a = 0; a < 360; a += 2) memP.push(memAt(a));
  const mem = ptsPad(memP, true);
  /* buitenwaartse normaal (graden) op hoek a van de celrand */
  const normAt = a => { const p = memAt(a - 1), q = memAt(a + 1); return Math.atan2(-(q[0] - p[0]), q[1] - p[1]) * 180 / Math.PI; };
  // chromatine
  let chrom = '';
  for (let i = 0; i < 18; i++) {
    const a = r() * 6.28, d = r() * nr * .7;
    chrom += `<path d="${squiggle(r, nx + Math.cos(a) * d, ny + Math.sin(a) * d, 7, 10, 10)}" stroke="${C.dna}" stroke-width="2.2" fill="none" opacity="${.35 + r() * .45}"/>`;
  }
  // kernenvelop: buiten- en binnenmembraan die bij elke porie in elkaar overgaan; poriën apart (klikbaar naar kernimport)
  const PA = Array.from({ length: 18 }, (_, i) => i * 20 + 10);
  const env = kernEnvelop(ptsCirkel(nx, ny, nr + 5, 120), { poriën: PA.map(a => a / 360), w: 5, gap: 6, poreW: 13, npc: false });
  const pores = PA.map(a => { const [x, y] = P(a, nr + 5); return kernporie(x, y, a + 90, { s: .34, H: 16, poreW: 13 }); }).join('');
  // ruw ER: platte zakken rond de kern, ribosomen aan de cytosolkant
  let er = '', erRibo = '';
  for (let k = 0; k < 4; k++) {
    const rad = nr + 32 + k * 27;
    er += zakBoog(nx, ny, rad, -50, 124, { dik: 11, w: 4.5 });
    for (let a = -44; a <= 118; a += 9) {
      const [x, y] = P(a + (k % 2) * 4, rad + 5.5 + 6.5);
      erRibo += ribosoomKlein(x, y, { s: .5, rot: a + (k % 2) * 4 + 90 });
    }
  }
  // ER-lumen loopt door in de ruimte tussen de twee kernmembranen: korte halzen tussen het buitenste kernmembraan en de
  // binnenste ER-zak (tussen twee poriën), zodat de ER-zakken niet los naast de kern liggen.
  for (const a of [0, 60, 100]) {
    const [x0, y0] = P(a, nr + 10), [x1, y1] = P(a, nr + 28), t = (a + 90) * Math.PI / 180, dx = Math.cos(t) * 5.5, dy = Math.sin(t) * 5.5;
    er += `<path d="M${f1(x0 + dx)},${f1(y0 + dy)} L${f1(x1 + dx)},${f1(y1 + dy)} L${f1(x1 - dx)},${f1(y1 - dy)} L${f1(x0 - dx)},${f1(y0 - dy)}Z" fill="rgba(143,179,232,.16)"/>` +
      membraanPts([[x0 + dx, y0 + dy], [x1 + dx, y1 + dy]], { w: 4.5 }) + membraanPts([[x0 - dx, y0 - dy], [x1 - dx, y1 - dy]], { w: 4.5 });
  }
  // centrosoom + microtubuli (sporen voor transport naar de kern)
  const mtoc = [600, 330];
  let mt = '';
  for (let a = 0; a < 360; a += 22) {
    const len = 330 + r() * 180, bend = (r() - .5) * 60, t = a * Math.PI / 180;
    mt += `<path d="M${mtoc[0]},${mtoc[1]} q${Math.cos(t) * len / 2 + bend},${Math.sin(t) * len / 2 - bend} ${Math.cos(t) * len},${Math.sin(t) * len}" stroke="#7c8aa8" stroke-width="1.3" fill="none" opacity=".28"/>`;
  }
  const mito = [[1120, 250, 20], [1230, 520, -60], [1040, 740, 10], [470, 560, 70], [620, 740, -20], [980, 170, -10]]
    .map(([x, y, rot]) => mitochondrion(x, y, 42, 18, { rot, n: 4, w: 3.4 })).join('');
  const lyso = [[1290, 405], [430, 460], [1180, 660]]   // volledig in het cytosol, los van het plasmamembraan
   .map(([x, y]) => blaasje(x, y, 17, { lumen: 'rgba(141,108,196,.45)', w: 5.5 })).join('');
  // vrije polysomen in het cytosol: ribosomen (twee eenheden) op één mRNA
  let poly = '';
  for (const [x, y] of [[1150, 380], [1190, 440], [1110, 470]]) {
    poly += `<path d="M${x},${y} q20,-12 40,0 t40,0" stroke="${C.rna}" stroke-width="2" fill="none"/>`;
    for (let i = 0; i < 4; i++) { const u = (i + .5) / 4, yy = y - 6 * Math.sin(u * 2 * Math.PI); poly += ribosoomKlein(x + u * 80, yy + 2, { s: .62 }); }
  }
  // adenovirus: eiwitjas (capside) zonder membraan, met vezels; binnenin DNA
  const virion = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${capsid(22, { fibre: 15, hexons: false })}${viralGenome(17, 1, false)}</g>`;
  // lipidenanodeeltje met mRNA
  const lnp = (x, y) => `<g transform="translate(${x} ${y})">${lnpParticle(24)}</g>`;
  // EGF-receptor zonder EGF: een monomeer (domein buiten, één transmembraanhelix, kinasedomein in het cytosol).
  // Pas als EGF bindt, vormen twee receptoren een dimeer (ligand-geïnduceerde dimerisatie, Alberts/MBoC hfst. 15).
  const egfr = (a, k = 0) => {
    const [x, y] = memAt(a), rot = normAt(a) + 90;
    return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)})">` + tmHelix(0, -10, 10, C.prot, 1, 6) +
      eiwit(1, -24, 8, 11, C.prot, { seed: 21 + k, bumps: .08 }) + eiwit(1, 21, 8.5, 8, '#b9a6ff', { seed: 24 + k, bumps: .08 }) + '</g>';
  };

  const [px, py] = P(215, nr + 4);
  const vPath = `M395,300 C470,300 520,315 ${mtoc[0] - 20},${mtoc[1] + 10} S${px - 30},${py - 20} ${px - 16},${py - 10}`;
  const lPath = `M400,650 C470,640 520,610 560,600 S650,640 700,690`;
  const mPath = `M${P(-20, nr)[0].toFixed(0)},${P(-20, nr)[1].toFixed(0)} C1000,390 1060,380 1110,400`;
  const [ma, mb] = memAt(96);

  return `<svg viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg">${defs}
    <path d="${mem}" fill="url(#gCyto)"/>
    <g data-node="dubbellaag" data-color="${C.mem}" data-label="${L({ nl: 'Celmembraan (dubbellaag)', en: 'Cell membrane (bilayer)' })}">
      <path d="${mem}" fill="none" stroke="transparent" stroke-width="26"/>${membraanPts(memP, { w: 14, closed: true })}
      <circle data-anchor="dubbellaag" cx="${f1(ma)}" cy="${f1(mb - 6)}" r="1" fill="none"/>
    </g>
    <clipPath id="cellClip"><path d="${mem}"/></clipPath>
    <g clip-path="url(#cellClip)">${mt}</g>
    <circle cx="${mtoc[0]}" cy="${mtoc[1]}" r="9" fill="#9aa6c2" opacity=".8"/>
    <text x="${mtoc[0] - 16}" y="${mtoc[1] + 34}" fill="${C.muted}" font-size="22" text-anchor="end" font-family="Inter" opacity=".85">${L({ nl: 'centrosoom', en: 'centrosome' })}</text>
    ${mito}${lyso}
    <g data-node="golgi" data-color="#d7b46a" data-nolabel>
    <g opacity=".95">${[0, 1, 2, 3].map(i => cisterne(600, 612 + i * 13, { len: 96 - i * 9, dik: 8, buig: 14, vert: false, w: 3.4, lumen: 'rgba(215,180,106,.30)' })).join('')}</g>
    <text x="590" y="690" fill="${C.muted}" font-size="22" text-anchor="middle" font-family="Inter" opacity=".85">Golgi</text>
    </g>

    <g data-node="er" data-color="${C.rrna}" data-label="${L({ nl: 'Ruw ER', en: 'Rough ER' })}">${er}<g data-node="ribosoom" data-color="${C.rrna}" data-nolabel>${erRibo}</g><circle data-anchor="er" cx="${P(60, nr + 110)[0]}" cy="${P(60, nr + 110)[1]}" r="1" fill="none"/></g>
    <g data-node="translatie" data-color="${C.rrna}" data-label="${L({ nl: 'Ribosomen · translatie', en: 'Ribosomes · translation' })}">
      <rect x="1090" y="350" width="150" height="130" fill="transparent"/>${poly}
    </g>
    <g data-node="kern" data-color="${C.dna}">
      <circle cx="${nx}" cy="${ny}" r="${nr + 5}" fill="url(#gNuc)"/>
      ${env}
      <g data-node="nucleolus" data-color="#9cc0ff" data-nolabel><ellipse cx="${nx + 35}" cy="${ny - 20}" rx="46" ry="38" fill="#2b3e66" opacity=".9"/></g>
      <g data-node="chromatine" data-color="${C.dna}" data-nolabel>${chrom}</g><g data-node="kernimport" data-color="${C.prot}" data-nolabel>${pores}</g>
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
      ${blaasje(415, 325, 40, { w: 8 })}${virion(415, 325, .6)}
      ${blaasje(425, 632, 40, { w: 8 })}${lnp(425, 632)}
      <circle data-anchor="endocytose" data-pos="below" cx="425" cy="682" r="1" fill="none"/>
    </g>
    <!-- route 2: mRNA in lipidenanodeeltje -->
    <g data-node="lnp" data-color="${C.trna}" data-label="${L({ nl: 'mRNA-vaccin (LNP)', en: 'mRNA vaccine (LNP)' })}">
      <circle data-anchor="lnp" cx="205" cy="668" r="1" fill="none"/>
      ${lnp(205, 700)}
      <path d="${lPath}" stroke="transparent" stroke-width="28" fill="none"/>
      <path d="${lPath}" stroke="${C.rna}" stroke-width="1" stroke-dasharray="3 6" fill="none" opacity=".45"/>
      ${[0, 2.5].map(b => `<path d="M-10,0 q4,-6 8,0 t8,0 t8,0" stroke="${C.rna}" stroke-width="3" fill="none"><animateMotion dur="5s" begin="-${b}s" repeatCount="indefinite" path="${lPath}" rotate="auto"/></path>`).join('')}
      ${[[700, 692], [735, 707]].map(([x, y]) => ribosoomKlein(x, y, { s: .7 })).join('')}
    </g>
    <!-- route 3 (verhaal 2): een signaalmolecule (groeifactor EGF) bindt een receptor in het membraan -->
    <g data-node="signaal" data-color="${C.prot}" data-label="${L({ nl: 'Signaalmolecule (EGF)', en: 'Signal molecule (EGF)' })}">
      <circle data-anchor="signaal" cx="1350" cy="118" r="1" fill="none"/>
      <rect x="1235" y="110" width="200" height="130" fill="transparent"/>
      ${egfr(-44, 0)}${egfr(-35, 1)}
      ${[[1290, 170], [1335, 140], [1385, 180], [1400, 130]].map(([x, y], i) => `<g><path d="${eiwitPad(x, y, 8, 7, 11 + i, .12)}" fill="#5fd3e6" opacity="${i ? .85 : 1}"/><animateTransform attributeName="transform" type="translate" values="0 0;0 -6;0 0" dur="${3 + i * .7}s" repeatCount="indefinite"/></g>`).join('')}
    </g>
    <text x="110" y="120" fill="${C.muted}" font-size="22" font-family="Inter" opacity=".75">${L({ nl: 'extracellulair', en: 'extracellular' })}</text>
    <text x="1075" y="600" fill="${C.muted}" font-size="22" font-family="Inter" opacity=".75">cytosol</text>
  </svg>`;
}
