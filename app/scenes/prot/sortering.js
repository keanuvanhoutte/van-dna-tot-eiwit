import { C, T2, svgOpen, FULL, sub, ease, f1 } from '../../kit.js';
import { T } from './_b_kit.js';
import { arrow } from '../repl/_draw.js';
import { DEST, HYD, PLUS, beads, ribo, icon } from './_fate.js';

/*
 * Overzicht: een adreslabel (sorteersignaal) in de aminozuurketen bepaalt waar een eiwit heen gaat.
 * Links: het eiwit van de huidige stap (groot). Rechts: de tabel label → bestemming; elke rij is klikbaar naar haar hoofdstuk.
 * Index 0 van een keten = het begin (N-uiteinde), de laatste = het einde (C-uiteinde).
 */
const N = 11;
const VAR = {
  cyt: { lab: [] },
  er: { lab: [{ from: 0, to: 2, col: HYD }] },
  kern: { lab: [{ from: 5, to: 6, col: PLUS }] },
  mito: { lab: [{ from: 0, to: 2, col: DEST.mito }] },
  perox: { lab: [{ from: N - 3, to: N - 1, col: DEST.perox }] },
  lyso: { lab: [{ from: 0, to: 2, col: HYD }], sugar: 6 },
};
const ROWS = [
  { k: 'cyt', node: 'vouwing', d: T2('geen label', 'no label'), name: T2('cytosol', 'cytosol') },
  { k: 'er', node: 'er', d: T2('vettig stuk vooraan', 'greasy stretch at the start'), name: T2('ER', 'ER') },
  { k: 'kern', node: 'kernimport', d: T2('positief stukje erin', 'positive patch inside'), name: T2('kern', 'nucleus') },
  { k: 'mito', node: 'mito', d: T2('plus-spiraal vooraan', '+ charged helix at the start'), name: T2('mitochondrion', 'mitochondrion') },
  { k: 'perox', node: 'perox', d: T2('S-K-L op het einde', 'S-K-L at the very end'), name: T2('peroxisoom', 'peroxisome') },
  { k: 'lyso', node: 'lysosoom', d: T2('suikerlabel, via ER + Golgi', 'sugar tag, via ER + Golgi'), name: T2('lysosoom', 'lysosome') },
];
const RY = i => 170 + i * 100, RX = 620;
const BIG = { x0: 110, y: 470, sp: 38, r: 15 };

/* suikerlabel met fosfaat (lysosoom) boven bolletje i van een keten: mannose-6-fosfaat, mannose als groene cirkel (SNFG, Varki et al. 2015) */
const sugar = (x, y, s = 1, op = 1, letter = s > 1.2) => op <= .01 ? '' : `<g opacity="${f1(op)}" transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><line x1="0" y1="0" x2="0" y2="-26" stroke="#c9d2e4" stroke-width="3"/>` +
  `<circle cx="0" cy="-35" r="9.5" fill="#00A651" stroke="#0a1224" stroke-width="1"/><circle cx="14" cy="-48" r="${letter ? 10 : 9}" fill="#ff9f43"/>${letter ? '<text x="14" y="-43" font-size="13" text-anchor="middle" fill="#0a1224" font-family="Inter" font-weight="800">P</text>' : ''}</g>`;

function chainOf(k, x0, y, sp, r, op) {
  const v = VAR[k];
  let s = beads(x0, y, N, { sp, r, lab: v.lab, op });
  if (v.sugar !== undefined) s += sugar(x0 + v.sugar * sp, y - r, sp / 22, op);
  return s;
}

export default {
  id: 'sortering',
  title: { nl: 'Een adreslabel bepaalt waar een eiwit heen gaat', en: 'An address label decides where a protein goes' },
  scale: { nl: '≈ 10 µm (hele cel, schematisch)', en: '≈ 10 µm (whole cell, schematic)' },
  time: { nl: 'tijdens of vlak na de aanmaak', en: 'during or right after synthesis' },
  org: { nl: 'mens', en: 'human' },
  legend: [[C.chain, { nl: 'aminozuurketen (eiwit)', en: 'amino-acid chain (protein)' }], [HYD, { nl: 'vettig (waterafstotend) label → ER', en: 'greasy (water-repelling) label → ER' }], [PLUS, { nl: 'positief label → kern', en: 'positive label → nucleus' }],
    [DEST.mito, { nl: 'plus-spiraal → mitochondrion', en: 'positively charged helix → mitochondrion' }], [DEST.perox, { nl: 'S-K-L → peroxisoom', en: 'S-K-L → peroxisome' }], [DEST.lyso, { nl: 'suiker met fosfaat → lysosoom', en: 'sugar with phosphate → lysosome' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Klik in de tabel op een bestemming om naar dat hoofdstuk te gaan.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Click a destination in the table to go to that chapter.</p>' },
  simplified: {
    nl: 'Schematisch: een keten van 11 bolletjes staat voor een eiwit van honderden aminozuren, en elk label is als een paar gekleurde bolletjes getekend. Echte labels zijn langer of korter (het ER-label van albumine telt 18 aminozuren, het peroxisoomlabel 3) en er bestaan meer routes (bv. een tweede peroxisoomlabel, eiwitten met twee bestemmingen, ER-eiwitten die naar het celmembraan of naar buiten gaan).',
    en: 'Schematic: a chain of 11 beads stands for a protein of hundreds of amino acids, and each label is drawn as a few coloured beads. Real labels are longer or shorter (the ER label of albumin has 18 amino acids, the peroxisome label 3) and there are more routes (e.g. a second peroxisome label, proteins with two destinations, ER proteins that go to the cell membrane or out of the cell).' },
  /* "Wat zie je?" (zijpaneel): elk onderdeel van de figuur in één zin — d = eenvoudig, p = vaktaal (hoger) */
  parts: [
    { c: C.rrna, t: { nl: 'ribosoom', en: 'ribosome' }, d: { nl: 'De eiwitfabriek in het celvocht. Bijna elk eiwit wordt hier gemaakt.', en: 'The protein factory in the cell fluid. Almost every protein is made here.' },
      p: { nl: 'Cytosolisch 80S-ribosoom; de synthese van vrijwel alle kerngecodeerde eiwitten begint in het cytosol.', en: 'Cytosolic 80S ribosome; synthesis of nearly all nuclear-encoded proteins begins in the cytosol.' } },
    { c: C.chain, t: { nl: 'aminozuurketen', en: 'amino-acid chain' }, m: ['begin', 'start', 'einde', 'end', 'waarheen?', 'where to?'], d: { nl: 'De rij groene bolletjes: een eiwit. Gekleurde bolletjes zijn het adreslabel; links is het begin, rechts het einde.', en: 'The row of green beads: a protein. Coloured beads are the address label; the start is on the left, the end on the right.' },
      p: { nl: 'Polypeptide van N- (begin) naar C-terminus (einde); sorteersignalen liggen N-terminaal, intern of C-terminaal.', en: 'Polypeptide from N- (start) to C-terminus (end); sorting signals lie N-terminally, internally or C-terminally.' } },
    { c: C.muted, t: 'label', m: ['bestemming', 'destination', 'klik op een rij →', 'click a row →'], d: { nl: 'De tabel: links het adreslabel, rechts waar het eiwit heen gaat. Klik op een rij om dat hoofdstuk te openen.', en: 'The table: on the left the address label, on the right where the protein goes. Click a row to open that chapter.' },
      p: { nl: 'Overzicht van sorteersignalen en hun doelcompartiment.', en: 'Overview of sorting signals and their target compartment.' } },
    { c: DEST.cyt, t: { nl: 'geen label', en: 'no label' }, m: ['cytosol'], d: { nl: 'Zonder adreslabel blijft het eiwit in het celvocht (cytosol), waar het gemaakt is.', en: 'Without an address label the protein stays in the cell fluid (cytosol), where it was made.' },
      p: { nl: 'Zonder sorteersignaal blijft een eiwit cytosolisch (standaardbestemming).', en: 'Without a sorting signal a protein stays cytosolic (default destination).' } },
    { c: HYD, t: { nl: 'vettig stuk vooraan', en: 'greasy stretch at the start' }, m: ['ER'], d: { nl: 'Een waterafstotend stuk aan het begin: het adres van het ER, een netwerk van membranen.', en: 'A water-repelling stretch at the start: the address of the ER, a network of membranes.' },
      p: { nl: 'N-terminaal signaalpeptide met hydrofobe kern; herkend door SRP, cotranslationele import in het ER.', en: 'N-terminal signal peptide with a hydrophobic core; recognised by SRP, co-translational import into the ER.' } },
    { c: PLUS, t: { nl: 'positief stukje erin', en: 'positive patch inside' }, m: ['kern', 'nucleus'], d: { nl: 'Een kort stukje met plusladingen, ergens midden in het eiwit: het adres van de kern.', en: 'A short patch with plus charges, somewhere in the middle of the protein: the address of the nucleus.' },
      p: { nl: 'Nucleair lokalisatiesignaal (NLS), basisch (bv. PKKKRKV); herkend door importine, import door de kernporie.', en: 'Nuclear localisation signal (NLS), basic (e.g. PKKKRKV); recognised by importin, import through the nuclear pore.' } },
    { c: DEST.mito, t: { nl: 'plus-spiraal vooraan', en: '+ charged helix at the start' }, m: ['mitochondrion'], d: { nl: 'Een spiraaltje met plusladingen aan het begin: het adres van de energiecentrale (mitochondrion).', en: 'A small spiral with plus charges at the start: the address of the power station (mitochondrion).' },
      p: { nl: 'N-terminale presequentie: amfipathische, positief geladen helix; import via TOM/TIM23.', en: 'N-terminal presequence: amphipathic, positively charged helix; import via TOM/TIM23.' } },
    { c: DEST.perox, t: { nl: 'S-K-L op het einde', en: 'S-K-L at the very end' }, m: ['peroxisoom', 'peroxisome'], d: { nl: 'Drie bouwstenen helemaal op het einde (S, K, L): het adres van het peroxisoom.', en: 'Three building blocks at the very end (S, K, L): the address of the peroxisome.' },
      p: { nl: 'PTS1 (C-terminaal Ser-Lys-Leu), herkend door PEX5.', en: 'PTS1 (C-terminal Ser-Lys-Leu), recognised by PEX5.' } },
    { c: DEST.lyso, t: { nl: 'suikerlabel, via ER + Golgi', en: 'sugar tag, via ER + Golgi' }, m: ['lysosoom', 'lysosome', 'P'], d: { nl: 'Eerst naar het ER en het Golgi; daar krijgt het eiwit een suiker met een fosfaat (P). Dat is het adres van het lysosoom.', en: 'First to the ER and the Golgi; there the protein gets a sugar with a phosphate (P). That is the address of the lysosome.' },
      p: { nl: 'Mannose-6-fosfaat op een N-glycaan, aangebracht in het cis-Golgi; herkend door M6P-receptoren.', en: 'Mannose 6-phosphate on an N-glycan, added in the cis-Golgi; recognised by M6P receptors.' } },
  ],
  steps: [
    { dur: 7500, cam: FULL, title: { nl: 'Bijna elk eiwit begint in het cytosol', en: 'Almost every protein starts in the cytosol' },
      text: { nl: 'Ribosomen maken eiwitten in het cytosol, de vloeistof die de cel vult. Daarna moet elk eiwit naar zijn plek.', en: 'Ribosomes make proteins in the cytosol, the fluid that fills the cell. Then each protein has to reach its place.' } },
    { dur: 7000, cam: FULL, title: { nl: 'Zonder label blijft een eiwit in het cytosol', en: 'Without a label a protein stays in the cytosol' },
      text: { nl: 'Heeft het eiwit geen adreslabel, dan blijft het waar het gemaakt is.', en: 'If the protein has no address label, it stays where it was made.' } },
    { dur: 7500, cam: FULL, title: { nl: 'Een vettig stuk vooraan: naar het ER', en: 'A greasy stretch at the start: to the ER' },
      text: { nl: 'Een waterafstotend stuk aan het begin stuurt het eiwit naar het ER, een netwerk van membranen.', en: 'A water-repelling stretch at the start sends the protein to the ER, a network of membranes.' } },
    { dur: 7500, cam: FULL, title: { nl: 'Een positief stukje: naar de kern', en: 'A positive patch: to the nucleus' },
      text: { nl: 'Een kort stukje met plusladingen, ergens in het eiwit, is het adres van de kern.', en: 'A short patch with plus charges, somewhere in the protein, is the address of the nucleus.' } },
    { dur: 7500, cam: FULL, title: { nl: 'Een plus-spiraal vooraan: naar het mitochondrion', en: 'A positively charged helix at the start: to the mitochondrion' },
      text: { nl: 'Een spiraaltje met plusladingen aan het begin stuurt het eiwit naar het mitochondrion, de energiecentrale.', en: 'A short helix with positive charges at the start sends the protein to the mitochondrion, the power plant.' } },
    { dur: 7500, cam: FULL, title: { nl: 'Drie letters op het einde: naar het peroxisoom', en: 'Three letters at the end: to the peroxisome' },
      text: { nl: 'Eindigt het eiwit op S-K-L, dan gaat het naar het peroxisoom, een klein blaasje dat o.a. vetzuren afbreekt.', en: 'If the protein ends in S-K-L, it goes to the peroxisome, a small vesicle that breaks down fatty acids, among other things.' } },
    { dur: 8000, cam: FULL, title: { nl: 'Een suikerlabel stuurt het door naar het lysosoom', en: 'A sugar tag sends it on to the lysosome' },
      text: { nl: 'Sommige eiwitten gaan eerst naar het ER en het Golgi. Daar krijgen ze een suikerlabel voor het lysosoom.', en: 'Some proteins first go to the ER and the Golgi. There they get a sugar tag for the lysosome.' } },
    { dur: 8000, cam: FULL, title: { nl: 'Het label is het adres', en: 'The label is the address' },
      text: { nl: 'Klik op een bestemming om te zien hoe het eiwit daar binnenkomt.', en: 'Click a destination to see how the protein gets in there.' } },
  ],
  svg() {
    let rows = '';
    ROWS.forEach((r, i) => {
      const y = RY(i);
      rows += `<g id="so-row${i}" data-node="${r.node}" data-nolabel data-color="${DEST[r.k]}" opacity="0" style="cursor:pointer">` +
        `<rect id="so-bg${i}" x="${RX}" y="${y - 42}" width="950" height="84" rx="18" fill="rgba(13,20,38,.85)" stroke="${DEST[r.k]}" stroke-width="2"/>` +
        chainOf(r.k, RX + 26, y + 6, 20, 8, 1) +
        T(RX + 250, y + 9, r.d, { size: 24, anchor: 'start', col: '#dfe6f5', w: 500 }) +
        arrow(RX + 575, y, RX + 630, y, C.muted, 4) +
        icon(r.k, RX + 680, y, 28) +
        T(RX + 730, y + 10, r.name, { size: 28, anchor: 'start', col: DEST[r.k], w: 700 }) + '</g>';
    });
    return svgOpen() + `
    ${T(RX + 26, 100, T2('label', 'label'), { size: 24, anchor: 'start', col: C.muted, w: 600 })}${T(RX + 730, 100, T2('bestemming', 'destination'), { size: 24, anchor: 'start', col: C.muted, w: 600 })}
    <g id="so-head" opacity="0"></g>
    ${rows}
    <g data-node="translatie" data-color="${C.rrna}" data-label="${T2('Ribosoom', 'Ribosome')}">${ribo(300, 250, 1.15)}<circle data-anchor="translatie" cx="300" cy="134" r="1" fill="none"/></g>
    <g id="so-big"></g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    return {
      update(t, s) {
        const { step, p } = s;
        // rijen: rij i verschijnt in stap i+1 en blijft
        ROWS.forEach((r, i) => {
          const k = step > i + 1 ? 1 : step < i + 1 ? 0 : ease(sub(p, .05, .3));
          $(`so-row${i}`).setAttribute('opacity', f1(k));
          const cur = step === i + 1 || step === 7;
          $(`so-bg${i}`).setAttribute('stroke-width', cur && step !== 7 ? '5' : '2');
          $(`so-bg${i}`).setAttribute('fill', cur && step !== 7 ? 'rgba(30,42,72,.95)' : 'rgba(13,20,38,.85)');
        });
        // links: het eiwit van de huidige stap groot, met zijn bestemming eronder
        const kOf = i => i === 0 ? 'cyt' : i >= 1 && i <= 6 ? ROWS[i - 1].k : null;
        const kNow = kOf(step), kPrev = step > 0 ? kOf(step - 1) : null;
        const kIn = ease(sub(p, .05, .3)), kOut = 1 - ease(sub(p, 0, .25));
        const drawK = (k, opC, opD) => {
          if (!k) return '';
          let o = '';
          if (opC > .01) o += chainOf(k, BIG.x0, BIG.y, BIG.sp, BIG.r, opC) + T(BIG.x0, BIG.y + 52, T2('begin', 'start'), { size: 22, col: C.muted, op: opC }) +
            T(BIG.x0 + (N - 1) * BIG.sp, BIG.y + 52, T2('einde', 'end'), { size: 22, col: C.muted, op: opC });
          if (opD > .01) o += arrow(300, BIG.y + 78, 300, 598, C.muted, 4, opD) + icon(k, 300, 650, 44, opD) + T(300, 735, ROWS.find(r => r.k === k).name, { size: 32, col: DEST[k], w: 700, op: opD });
          return o;
        };
        let g = '';
        if (step === 0) g = drawK('cyt', 1, 0) + T(300, 650, T2('waarheen?', 'where to?'), { size: 34, col: C.text, w: 700, op: ease(sub(p, .3, .55)) });
        else if (step === 1) g = drawK('cyt', 1, kIn) + T(300, 650, T2('waarheen?', 'where to?'), { size: 34, col: C.text, w: 700, op: kOut });
        else if (step === 7) g = drawK(kPrev, kOut, kOut) + T(300, 560, T2('klik op een rij →', 'click a row →'), { size: 32, col: C.text, w: 700, op: ease(sub(p, .25, .5)) });
        else g = drawK(kPrev, kOut, kOut) + drawK(kNow, kIn, kIn);
        $('so-big').innerHTML = g;
      },
    };
  },
};
