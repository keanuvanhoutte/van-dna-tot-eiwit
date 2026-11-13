/*
 * Slimme filter voor de atlas (zonder AI): herkent gewone woorden als eigenschappen
 *   "human dubbelstreng" → in de mens + dubbele helix,  "enkel streng", "triple helix", "linkshandig", "met medicijn", …
 * De rest van de woorden zoekt (met tikfouten en begin van woorden) in naam, uitleg en eiwitnamen.
 *
 * smartFilter(query, entries, { L, SIMPLE }) → { list, concepts: [{label}], loose: bool }
 *   loose = geen enkel item voldoet aan alles: dan de beste gedeeltelijke treffers.
 */
import { variants } from '../shared/synonyms.js';

const norm = s => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const has = (e, k, v) => (e[k] ?? []).includes(v);
const orgTxt = e => norm(e.org ? e.org.nl + ' ' + e.org.en : '');

/* test(e) → 0 … 1 (1 = past helemaal) */
const CONCEPTS = [
  { label: { nl: 'in de mens', en: 'in humans' }, keys: ['mens', 'menselijk', 'menselijke', 'humaan', 'humane', 'human', 'homo sapiens', 'bij de mens', 'in de mens', 'menselijke cel', 'human cell'],
    test: e => /\bmens|human/.test(orgTxt(e)) ? 1 : has(e, 'ctx', 'cell') ? .9 : 0 },
  { label: { nl: 'dubbele streng (dubbele helix)', en: 'double strand (double helix)' }, keys: ['dubbelstreng', 'dubbelstrengig', 'dubbelstrengs', 'dubbele streng', 'dubbel streng', 'twee strengen', 'double strand', 'double stranded', 'dsdna', 'dsrna', 'duplex', 'dubbele helix', 'dubbelhelix', 'double helix', 'dubbel helix'],
    test: e => has(e, 'cls', 'duplex') ? 1 : 0 },
  { label: { nl: 'één streng', en: 'single strand' }, keys: ['enkelstreng', 'enkelstrengig', 'enkelstrengs', 'enkele streng', 'enkel streng', 'een streng', 'eenstrengig', 'single strand', 'single stranded', 'ssdna', 'ssrna', 'enkelvoudig'],
    test: e => has(e, 'cls', 'single') ? 1 : has(e, 'cls', 'folded') && !has(e, 'cls', 'duplex') ? .6 : 0 },   // gevouwen RNA is ook één streng
  { label: { nl: 'drie strengen (triple helix)', en: 'three strands (triple helix)' }, keys: ['triple helix', 'triplehelix', 'triplex', 'tripel helix', 'drie strengen', 'driestrengig', 'drievoudige helix', 'triple', 'three strands', 'triple stranded', 'hdna', 'h dna'],
    test: e => has(e, 'cls', 'triplex') ? 1 : 0 },
  { label: { nl: 'vier strengen (quadruplex)', en: 'four strands (quadruplex)' }, keys: ['quadruplex', 'g quadruplex', 'g4', 'vier strengen', 'vierstrengig', 'four strands', 'i motif', 'imotif', 'kwartet', 'g kwartet', 'quartet', 'tetraplex'],
    test: e => has(e, 'cls', 'quad') ? 1 : 0 },
  { label: { nl: 'kruispunt van strengen', en: 'strand junction' }, keys: ['kruispunt', 'kruising', 'junction', 'holliday', 'four way junction', 'vierwegkruising'],
    test: e => has(e, 'cls', 'junction') ? 1 : 0 },
  { label: { nl: 'ringvormig', en: 'ring-shaped' }, keys: ['ring', 'ringvormig', 'circulair', 'circular', 'cirkel', 'kringvormig'],
    test: e => has(e, 'cls', 'circular') ? 1 : 0 },
  { label: { nl: 'gevouwen RNA', en: 'folded RNA' }, keys: ['gevouwen', 'opgevouwen', 'folded', 'vouwing', 'haarspeld', 'hairpin', 'stem loop', 'stamlus'],
    test: e => has(e, 'cls', 'folded') ? 1 : 0 },
  { label: { nl: 'met eiwit', en: 'with protein' }, keys: ['met eiwit', 'eiwit', 'eiwitten', 'protein', 'proteins', 'with protein', 'complex', 'eiwitcomplex'],
    test: e => has(e, 'type', 'prot') || has(e, 'cls', 'complex') ? 1 : 0 },
  { label: { nl: 'met medicijn', en: 'with a drug' }, keys: ['medicijn', 'medicijnen', 'geneesmiddel', 'drug', 'drugs', 'medicine', 'met medicijn', 'chemotherapie', 'chemo', 'antikanker', 'antibioticum'],
    test: e => has(e, 'type', 'drug') || has(e, 'ctx', 'drug') ? 1 : 0 },
  { label: { nl: 'virus', en: 'virus' }, keys: ['virus', 'virussen', 'viraal', 'virale', 'viral', 'viruses', 'hiv', 'corona'],
    test: e => has(e, 'ctx', 'virus') ? 1 : 0 },
  { label: { nl: 'bacterie', en: 'bacterium' }, keys: ['bacterie', 'bacterien', 'bacterieel', 'bacteriele', 'bacteria', 'bacterial', 'bacterium', 'e coli', 'ecoli'],
    test: e => /bacter|coli/.test(orgTxt(e)) ? 1 : has(e, 'ctx', 'other') ? .3 : 0 },
  { label: { nl: 'lab & biotech', en: 'lab & biotech' }, keys: ['lab', 'labo', 'laboratorium', 'biotech', 'biotechnologie', 'synthetisch', 'synthetic', 'kunstmatig'],
    test: e => has(e, 'ctx', 'lab') || /synthet/.test(orgTxt(e)) ? 1 : 0 },
  { label: { nl: 'DNA', en: 'DNA' }, keys: ['dna'], test: e => has(e, 'type', 'dna') ? 1 : 0 },
  { label: { nl: 'RNA', en: 'RNA' }, keys: ['rna'], test: e => has(e, 'type', 'rna') ? 1 : 0 },
  { label: { nl: 'DNA–RNA-hybride', en: 'DNA–RNA hybrid' }, keys: ['hybride', 'hybrid', 'dna rna', 'rna dna', 'dna rna hybride'],
    test: e => has(e, 'type', 'hybrid') ? 1 : 0 },
  { label: { nl: 'linksom gedraaid', en: 'left-handed' }, keys: ['linkshandig', 'linksdraaiend', 'linksom', 'left handed', 'lefthanded', 'links gedraaid', 'z dna', 'zdna'],
    test: e => e.hand === 'l' ? 1 : 0 },
  { label: { nl: 'rechtsom gedraaid', en: 'right-handed' }, keys: ['rechtshandig', 'rechtsdraaiend', 'rechtsom', 'right handed', 'righthanded'],
    test: e => e.hand === 'r' ? 1 : 0 },
  { label: { nl: 'schema (geen 3D)', en: 'diagram (no 3D)' }, keys: ['schema', 'tekening', 'diagram', 'geen 3d'],
    test: e => has(e, 'cls', 'info') ? 1 : 0 },
];
const KEYMAP = new Map();
for (const c of CONCEPTS) for (const k of c.keys) KEYMAP.set(norm(k).replace(/ /g, ''), c);

const STOP = new Set('de het een van in op met en of die dat is the a an of with and in on for structuur structure'.split(' '));
const lev = (a, b) => {
  const m = [...Array(b.length + 1).keys()];
  for (let i = 1; i <= a.length; i++) { let p = m[0]; m[0] = i; for (let j = 1; j <= b.length; j++) { const t = m[j]; m[j] = Math.min(m[j] + 1, m[j - 1] + 1, p + (a[i - 1] === b[j - 1] ? 0 : 1)); p = t; } }
  return m[b.length];
};
function wordScore(q, w) {
  if (q === w) return 1;
  if (q.length >= 3 && w.startsWith(q)) return .85;
  if (q.length >= 4 && w.includes(q)) return .7;
  if (q.length >= 5 && Math.abs(q.length - w.length) <= 2 && lev(q, w) <= (q.length >= 8 ? 2 : 1)) return .5;
  return 0;
}

/* zoekwoorden opsplitsen in herkende eigenschappen (langste combinatie eerst) en vrije woorden */
export function parse(query) {
  const toks = norm(query).split(' ').filter(Boolean);
  const concepts = [], free = [];
  for (let i = 0; i < toks.length;) {
    let hit = null, n = 0;
    for (let k = Math.min(4, toks.length - i); k >= 1 && !hit; k--) { const j = toks.slice(i, i + k).join(''); if (KEYMAP.has(j)) { hit = KEYMAP.get(j); n = k; } }
    if (!hit && toks[i].length >= 6) for (const [k, c] of KEYMAP) if (k.length >= 6 && lev(toks[i], k) <= 1) { hit = c; n = 1; break; }   // tikfout in een eigenschap
    if (hit) { if (!concepts.includes(hit)) concepts.push(hit); i += n; }
    else { if (!STOP.has(toks[i])) free.push(toks[i]); i++; }
  }
  return { concepts, free };
}

export function smartFilter(query, entries, { SIMPLE = {} } = {}) {
  const { concepts, free } = parse(query);
  const hayOf = e => {
    const sp = SIMPLE[e.id];
    const strong = norm([e.id, e.pdb ?? '', e.name?.nl, e.name?.en, sp?.title?.nl, sp?.title?.en, e.sub?.nl, e.sub?.en, sp?.sub?.nl, sp?.sub?.en].join(' ')).split(' ');
    const weak = norm([sp?.kort?.nl, sp?.kort?.en, e.what?.nl, e.what?.en, ...(e.feat?.nl ?? []), ...(e.feat?.en ?? []), e.cell?.nl, e.cell?.en, e.org?.nl, e.org?.en].join(' ')).split(' ');
    return { strong: [...new Set(strong)], weak: [...new Set(weak)] };
  };
  const scored = entries.map(e => {
    let ok = 0, score = 0;
    for (const c of concepts) { const v = c.test(e); if (v > 0) { ok++; score += 3 * v; } }
    if (free.length) {
      const h = e._hay ??= hayOf(e);
      for (const q of free) {
        let best = 0;
        // ook andere naamversies van hetzelfde begrip (bv. alkylering ↔ crosslink), enkel exact of begin van een woord
        const alt = variants(q).slice(1), sc = w => Math.max(wordScore(q, w), ...alt.map(v => { const s = wordScore(v, w); return s >= .85 ? s * .95 : 0; }));
        for (const w of h.strong) best = Math.max(best, sc(w) * 2);
        if (best < 1.7) for (const w of h.weak) best = Math.max(best, sc(w));
        if (best > 0) { ok++; score += best; }
      }
    }
    return { e, ok, score };
  });
  const need = concepts.length + free.length;
  let list = scored.filter(x => x.ok === need);
  let loose = false;
  if (!list.length && need > 1) { loose = true; list = scored.filter(x => x.ok >= Math.max(1, need - 1)); }
  list.sort((a, b) => b.ok - a.ok || b.score - a.score);
  return { list: list.map(x => x.e), concepts, free, loose };
}
