import { C, BASE, COMP, L, T2, svgOpen, txt, pill, cam, FULL, sub, ease, lerp, clamp, f1 } from '../../kit.js';
import { NEW, seg, tag, arrow } from './_draw.js';

/*
 * DNA-herstel — OVERZICHT (05-11-2026): welke schade → welke herstelroute. De routes zelf staan in eigen scènes
 * (mmr, ber, ner, dsb), zodat niets dubbel getoond wordt. Vier rijen op 1600 × 900:
 *   kopieerfout → MMR · één beschadigde letter → BER · UV-bult → NER · breuk → NHEJ/HR; rechts: als herstel faalt.
 */
const ROWS = [
  { k: 'mmr', y: 205, col: '#5fd3e6', dmg: { nl: 'kopieerfout', en: 'copying error' }, how: { nl: 'stuk nieuwe streng opnieuw maken', en: 'remake a stretch of the new strand' }, abbr: 'MMR', name: { nl: 'mismatch-herstel', en: 'mismatch repair' } },
  { k: 'ber', y: 375, col: '#7fdc6a', dmg: { nl: 'één beschadigde letter', en: 'one damaged letter' }, how: { nl: 'die ene letter vervangen', en: 'replace that one letter' }, abbr: 'BER', name: { nl: 'base-excisieherstel', en: 'base excision repair' } },
  { k: 'ner', y: 545, col: '#ffc247', dmg: { nl: 'bult door UV-licht', en: 'bump from UV light' }, how: { nl: 'stuk van ± 30 letters vervangen', en: 'replace a piece of ± 30 letters' }, abbr: 'NER', name: { nl: 'nucleotide-excisieherstel', en: 'nucleotide excision repair' } },
  { k: 'dsb', y: 715, col: '#ff8a3d', dmg: { nl: 'breuk door beide strengen', en: 'break through both strands' }, how: { nl: 'lijmen, of de kopie gebruiken', en: 'glue, or use the copy' }, abbr: 'NHEJ / HR', name: { nl: 'eindverbinding / recombinatie', en: 'end joining / recombination' } },
];
const SEQ = 'GACTCGTACG', BP = 34, DX = 70;          // mini-ladder: 10 bp × 34 px, x 70–410
const xi = i => DX + BP / 2 + i * BP;

/* kleine ladder met letters en de schade van de rij */
function mini(kind, y) {
  const G = 44, yt = y - G / 2, yb = y + G / 2;
  let s = '', fx = '';
  const top = SEQ.split(''), bot = top.map(b => COMP[b]);
  let skip = -1;
  if (kind === 'mmr') bot[5] = 'G';                   // G tegenover T (T op positie 5 bovenaan)
  if (kind === 'ber') top[4] = 'U';                   // C → U
  if (kind === 'ner') { top[4] = 'T'; top[5] = 'T'; bot[4] = 'A'; bot[5] = 'A'; }
  if (kind === 'dsb') skip = 5;                       // breuk tussen 4 en 5
  const bump = i => kind === 'ner' ? -10 * clamp(1 - Math.abs(i - 4.5) / 3) : 0;
  const dx = i => kind === 'dsb' ? (i < skip ? -16 : 16) : 0;
  if (kind === 'dsb') {
    s += seg(DX - 16, yt, xi(4) + BP / 2 - 16, yt, C.dna, 6) + seg(DX - 16, yb, xi(4) + BP / 2 - 16, yb, C.dna2, 6);
    s += seg(xi(5) - BP / 2 + 16, yt, DX + 10 * BP + 16, yt, C.dna, 6) + seg(xi(5) - BP / 2 + 16, yb, DX + 10 * BP + 16, yb, C.dna2, 6);
  } else {
    const pts = top.map((_, i) => `${i ? 'L' : 'M'}${f1(xi(i))},${f1(yt + bump(i))}`).join('');
    s += `<path d="M${DX},${yt}L${f1(xi(0))},${yt}${pts.replace(/^M/, 'L')}L${DX + 10 * BP},${yt}" stroke="${C.dna}" stroke-width="6" fill="none" stroke-linejoin="round"/>` + seg(DX, yb, DX + 10 * BP, yb, kind === 'mmr' ? NEW : C.dna2, 6);
  }
  for (let i = 0; i < 10; i++) {
    const x = xi(i) + dx(i), b = top[i], m = bot[i], ty = yt + bump(i);
    s += seg(x, ty, x, y - 2, BASE[b], 6) + seg(x, y + 2, x, yb, BASE[m], 6);
    s += txt(x, ty - 11, b, BASE[b], 21, 'middle', 700, 'JetBrains Mono') + txt(x, yb + 27, m, BASE[m], 21, 'middle', 700, 'JetBrains Mono');
  }
  if (kind === 'mmr') fx += `<rect x="${xi(5) - 18}" y="${yt - 34}" width="36" height="${G + 68}" rx="10" fill="none" stroke="${C.danger}" stroke-width="3.5"/>`;
  if (kind === 'ber') fx += `<rect x="${xi(4) - 18}" y="${yt - 34}" width="36" height="${G / 2 + 36}" rx="10" fill="none" stroke="${C.danger}" stroke-width="3.5"/>`;
  if (kind === 'ner') fx += `<rect x="${xi(4) - 20}" y="${yt - 44}" width="${BP + 40}" height="${G / 2 + 44}" rx="12" fill="none" stroke="${C.danger}" stroke-width="3.5"/>` + seg(xi(4) + 5, yt - 6, xi(5) - 5, yt - 6, C.danger, 5);
  if (kind === 'dsb') fx += `<path d="M${xi(4) + BP / 2 - 8},${yt - 30}l8,14l-8,14l8,14l-8,14l8,14l-8,14" stroke="${C.danger}" stroke-width="3" fill="none"/>`;
  return s + fx;
}

const S = (dur, c, nl, en, tnl, ten) => ({ dur, cam: c, title: { nl, en }, text: { nl: tnl, en: ten } });
const CW = 1200, CH = CW * 9 / 16;
const rowCy = y => clamp(y, CH / 2, 900 - CH / 2);
const rowCam = y => cam(CW / 2, rowCy(y), CW);

export default {
  id: 'herstel',
  title: { nl: 'Elk soort DNA-schade heeft zijn eigen herstel', en: 'Each kind of DNA damage has its own repair' },
  scale: '≈ 5–50 nm',
  time: { nl: 'seconden tot uren per letsel', en: 'seconds to hours per lesion' },
  org: { nl: 'mens', en: 'human' },
  legend: [[C.dna, { nl: 'DNA-streng', en: 'DNA strand' }], [C.dna2, { nl: 'complementaire streng', en: 'complementary strand' }], [NEW, { nl: 'nieuwe streng (na het kopiëren)', en: 'new strand (after copying)' }],
    [C.danger, { nl: 'schade / fout', en: 'damage / error' }], ['#5fd3e6', 'MMR'], ['#7fdc6a', 'BER'], ['#ffc247', 'NER'], ['#ff8a3d', 'NHEJ / HR']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Overzicht: welke schade door welke route hersteld wordt. Klik op een route om ze stap voor stap te zien: mismatch-herstel (MMR), base-excisieherstel (BER), nucleotide-excisieherstel (NER) en voor breuken niet-homologe eindverbinding (NHEJ) of homologe recombinatie (HR).</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Overview: which damage is repaired by which route. Click a route to see it step by step: mismatch repair (MMR), base excision repair (BER), nucleotide excision repair (NER) and for breaks non-homologous end joining (NHEJ) or homologous recombination (HR).</p>' },
  simplified: {
    nl: 'Een overzicht in vier rijen; elke route heeft een eigen scène met de echte stappen. De DNA-stukjes zijn schematisch (geen helix, niet op schaal). Er zijn nog andere routes die hier niet getoond worden, zoals het rechtstreeks terugdraaien van sommige alkylschade (MGMT) en het overslaan van schade tijdens het kopiëren (translesiesynthese).',
    en: 'An overview in four rows; each route has its own scene with the real steps. The DNA pieces are schematic (no helix, not to scale). There are other routes not shown here, such as directly reversing some alkylation damage (MGMT) and bypassing damage during copying (translesion synthesis).' },
  steps: [
    S(8000, FULL, 'Elk soort schade heeft zijn eigen herstel', 'Each kind of damage has its own repair',
      'DNA raakt elke dag beschadigd, en bij het kopiëren sluipen fouten in. De cel kiest per soort schade een eigen herstelroute.',
      'DNA is damaged every day, and copying lets errors slip in. The cell picks its own repair route for each kind of damage.'),
    S(7000, rowCam(205), 'Kopieerfout → het stuk opnieuw maken', 'Copying error → make the stretch again',
      'Staat er na het kopiëren een foute letter in de nieuwe streng, dan halen eiwitten dat stuk weg en maken het opnieuw.',
      'If a wrong letter sits in the new strand after copying, proteins remove that stretch and make it again.'),
    S(7000, rowCam(375), 'Eén beschadigde letter → alleen die vervangen', 'One damaged letter → replace only that one',
      'Is één letter zelf beschadigd, dan knipt een enzym alleen die letter weg en zet de juiste terug.',
      'If one letter itself is damaged, an enzyme cuts out just that letter and puts back the right one.'),
    S(7000, rowCam(545), 'Bult door UV → een stuk streng vervangen', 'Bump from UV → replace a piece of strand',
      'UV-licht maakt een bult in het DNA. Dan wordt een stukje streng van ongeveer 30 letters vervangen.',
      'UV light makes a bump in the DNA. Then a piece of strand of about 30 letters is replaced.'),
    S(8000, rowCam(715), 'Breuk → lijmen, of de kopie gebruiken', 'Break → glue, or use the copy',
      'Zijn beide strengen gebroken, dan lijmt de cel de uiteinden, of gebruikt ze na het kopiëren de identieke kopie.',
      'If both strands are broken, the cell glues the ends, or after copying it uses the identical copy.'),
    S(9000, FULL, 'Als herstel faalt, stapelen fouten zich op', 'When repair fails, errors pile up',
      'Werkt een route niet, dan ontstaan meer mutaties en stijgt de kans op kanker. Het eiwit p53 kan de cel dan laten pauzeren of opruimen.',
      'If a route fails, more mutations arise and the risk of cancer goes up. The protein p53 can then make the cell pause or clear itself away.'),
  ],
  svg() {
    let rows = '';
    for (const r of ROWS) {
      rows += `<g id="hr-${r.k}">
        <rect x="30" y="${r.y - 78}" width="1140" height="156" rx="22" fill="rgba(13,20,38,.6)" stroke="${r.col}" stroke-opacity=".35" stroke-width="2"/>
        <g data-node="dnahelix" data-nolabel data-color="${C.dna}">${mini(r.k, r.y + 20)}</g>
        ${txt(240, r.y - 52, L(r.dmg), C.text, 24, 'middle', 700)}
        ${arrow(450, r.y + 8, 560, r.y + 8, C.muted, 4)}
        <g data-node="${r.k}" data-nolabel data-color="${r.col}">
          <rect x="580" y="${r.y - 56}" width="570" height="128" rx="20" fill="${r.col}" fill-opacity=".12" stroke="${r.col}" stroke-width="2.5"/>
          ${txt(610, r.y - 10, r.abbr, r.col, 34, 'start', 800)}${txt(610 + (r.abbr.length > 4 ? 200 : 100), r.y - 10, `· ${L(r.name)}`, C.muted, 21, 'start', 600)}
          ${txt(610, r.y + 36, L(r.how), C.text, 24, 'start', 600)}
          ${txt(1120, r.y + 36, '›', r.col, 40, 'end', 700)}
        </g>
      </g>`;
    }
    const dis = [['NER', T2('xeroderma pigmentosum', 'xeroderma pigmentosum'), T2('→ huidkanker', '→ skin cancer'), '#ffc247'], ['MMR', T2('Lynch-syndroom', 'Lynch syndrome'), T2('→ darmkanker', '→ colon cancer'), '#5fd3e6'], ['HR', 'BRCA1 / BRCA2', T2('→ borst- en eierstokkanker', '→ breast and ovarian cancer'), '#9b7bff']];
    let side = `<rect x="1200" y="127" width="370" height="664" rx="22" fill="rgba(13,20,38,.6)" stroke="${C.danger}" stroke-opacity=".4" stroke-width="2"/>` + txt(1385, 180, T2('Als herstel faalt', 'When repair fails'), C.danger, 28, 'middle', 800);
    dis.forEach(([a, b, c, col], i) => { const y = 238 + i * 118; side += pill(1385, y, 110, 40, a, col, 1, 22) + txt(1385, y + 50, b, C.text, 22, 'middle', 600) + txt(1385, y + 78, c, C.muted, 22, 'middle', 600); });
    return svgOpen() + `
    <g id="hr-head">${txt(30, 92, T2('Schade', 'Damage'), C.muted, 26, 'start', 700)}${txt(580, 92, T2('Herstelroute (klik)', 'Repair route (click)'), C.muted, 26, 'start', 700)}</g>
    ${rows}
    <g id="hr-side">${side}
      <g data-node="mutaties" data-nolabel data-color="${C.danger}"><rect x="1225" y="590" width="320" height="58" rx="29" fill="rgba(255,107,107,.14)" stroke="${C.danger}" stroke-width="2"/>${txt(1385, 628, T2('→ mutaties', '→ mutations'), C.text, 24, 'middle', 700)}</g>
      <g data-node="p53" data-nolabel data-color="${C.prot}"><rect x="1225" y="668" width="320" height="58" rx="29" fill="rgba(155,123,255,.16)" stroke="${C.prot}" stroke-width="2"/>${txt(1385, 706, T2('bewaker p53 →', 'guardian p53 →'), C.text, 24, 'middle', 700)}</g>
    </g>
    <g data-node="replisoom" data-color="${C.prot}" data-label="${T2('Eerst: de polymerase leest zelf na', 'First: the polymerase proofreads itself')}"><circle id="hr-rpa" data-anchor="replisoom" cx="-99" cy="-99" r="1" fill="none"/><rect id="hr-rpr" x="-99" y="-99" width="1" height="1" fill="transparent"/></g>
    <g data-node="integratie" data-color="${C.tdna}" data-label="${T2('Virussen gebruiken breukherstel', 'Viruses use break repair')}"><circle id="hr-ina" data-anchor="integratie" cx="-99" cy="-99" r="1" fill="none"/><rect id="hr-inr" x="-99" y="-99" width="1" height="1" fill="transparent"/></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const place = (a, r, on, x, y) => {
      const c = $(a), b = $(r);
      if (on) { c.setAttribute('cx', x); c.setAttribute('cy', y); b.setAttribute('x', x - 90); b.setAttribute('y', y - 20); b.setAttribute('width', 180); b.setAttribute('height', 40); }
      else { c.setAttribute('cx', -99); c.setAttribute('cy', -99); b.setAttribute('x', -99); b.setAttribute('y', -99); b.setAttribute('width', 1); b.setAttribute('height', 1); }
    };
    return {
      update(t, s) {
        const { step, p } = s;
        // zichtbaarheid per stap: actieve rij 1, andere rijen binnen de camera .3, buiten de camera 0 (niets half afgesneden)
        const ACT = ['', 'mmr', 'ber', 'ner', 'dsb', ''];
        const inCam = (st, y0, y1) => { const c = rowCy(ROWS[st - 1].y); return y0 >= c - CH / 2 && y1 <= c + CH / 2; };
        const vis = (st, key, y0, y1) => {
          if (st === 0) return 1;
          if (st === 5) return key === 'side' ? 1 : .55;
          if (key === 'side') return 0;
          if (key === ACT[st]) return 1;
          if (key === 'head') return inCam(st, y0, y1) ? 1 : 0;
          return inCam(st, y0, y1) ? .3 : 0;
        };
        const k = ease(sub(p, 0, .25));                // overgang in de eerste 25 % van de stap: begin = eindbeeld van de vorige stap
        const mix = (key, y0, y1) => step === 0 ? 1 : lerp(vis(step - 1, key, y0, y1), vis(step, key, y0, y1), k);
        for (const r of ROWS) $('hr-' + r.k).setAttribute('opacity', f1(mix(r.k, r.y - 80, r.y + 80)));
        $('hr-head').setAttribute('opacity', f1(mix('head', 60, 100)));
        $('hr-side').setAttribute('opacity', f1(mix('side', 0, 0)));
        place('hr-rpa', 'hr-rpr', step === 1, 870, 205 + 92);
        place('hr-ina', 'hr-inr', step === 4, 870, 715 + 92);
      },
    };
  },
};
