/*
 * Zoeken in de app (zonder AI): kernwoorden → "Bedoel je …?"-voorstellen → naar die scène.
 *
 *  - doorzoekt per knoop: titel (NL + EN), id, korte samenvatting, "In het kort" en (licht) de vakuitleg
 *  - herkent tikfouten (Levenshtein), begin van woorden (repl → replicatie), samengestelde woorden (vouwing ⊂ eiwitvouwing)
 *  - kent gewone woorden en synoniemen (kanker → p53, corona → spike, vaccin → mRNA-vaccin, …)
 *  - zegt bij elk voorstel waar het in de app ligt: in welk verhaal of zijpad, welk hoofdstuk, of onder welk hoofdstuk
 *
 * makeSearch({ NODES, LINES, DETAILS?, S_EN?, has? }) → { query(text, { line }) → [{ id, score, fixed, loc }], locate(id, line) }
 * DETAILS mag later bijgeladen worden met addDetails(DETAILS) (startpagina: pas bij het eerste zoeken).
 */

export const norm = s => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
  .replace(/\[\[([^\]|]+)\|[^\]]+\]\]/g, '$1').replace(/<[^>]+>/g, ' ').replace(/[^a-z0-9α-ωµ]+/g, ' ').trim();

const STOP = new Set(('de het een van in op aan met voor naar door hoe wat waar wie is zijn wordt worden je jij ik er dat die dit en of om bij uit als ook nog niet ' +
  'the a an of in on to for with by how what where who is are be and or it its this that do does from at as').split(' '));

/* gewone woorden en synoniemen → knopen (genormaliseerd; meerdere woorden zonder spatie, bv. "eiwitmaken") */
const SYN = {
  kopieren: ['replicatie', 'replisoom'], kopie: ['replicatie'], gekopieerd: ['replicatie'], kopieert: ['replicatie'], kopieer: ['replicatie'], copy: ['replicatie'], copying: ['replicatie'], verdubbelen: ['replicatie'], dnakopieren: ['replicatie'],
  schade: ['herstel', 'dsb', 'ber', 'ner'], damage: ['herstel', 'dsb'], repair: ['herstel'], beschadigd: ['herstel'], uv: ['ner'], zonlicht: ['ner'], breuk: ['dsb'],
  kanker: ['p53', 'mutaties', 'telomeren', 'mmr'], cancer: ['p53', 'mutaties', 'telomeren'], tumor: ['p53'], tumour: ['p53'],
  corona: ['sleutel', 'viruskopie', 'schaar', 'assemblage'], coronavirus: ['sleutel', 'viruskopie', 'schaar'], covid: ['sleutel', 'schaar', 'viruskopie'], sars: ['sleutel', 'viruskopie'], spike: ['sleutel'], paxlovid: ['schaar'],
  vaccin: ['lnp'], vaccine: ['lnp'], mrnavaccin: ['lnp'], prik: ['lnp'],
  antibiotica: ['bribosoom', 'ribosoom'], antibiotic: ['bribosoom', 'ribosoom'], antibioticum: ['bribosoom', 'ribosoom'],
  hiv: ['rt', 'integratie'], aids: ['rt'], retrovirus: ['rt', 'integratie'],
  eiwitmaken: ['translatie'], eiwitsynthese: ['translatie'], proteinsynthesis: ['translatie'], vertalen: ['translatie'], vertaling: ['translatie'],
  aflezen: ['transcriptie'], afschrijven: ['transcriptie'], overschrijven: ['transcriptie'], genaflezen: ['transcriptie'], dnaaflezen: ['transcriptie'],
  knippen: ['splicing', 'rnaprocessing'], plakken: ['splicing'], intron: ['splicing'], introns: ['splicing'], exon: ['splicing'], exons: ['splicing'],
  plooien: ['vouwing'], vouwen: ['vouwing'], folding: ['vouwing'], fold: ['vouwing'], plooiing: ['vouwing'],
  afbraak: ['ubiquitine', 'proteasoom', 'autofagie', 'mrnaafbraak'], afbreken: ['ubiquitine', 'proteasoom'], opruimen: ['proteasoom', 'autofagie'], degradation: ['ubiquitine', 'proteasoom'],
  alzheimer: ['misvouwing'], parkinson: ['misvouwing'], klonteren: ['misvouwing'], klonters: ['misvouwing'], prion: ['misvouwing'],
  erfelijk: ['gen', 'dnahelix'], erfelijkheid: ['gen', 'chromosoom'], erfelijkmateriaal: ['dnahelix', 'chromosoom'],
  vrouw: ['xinact'], vrouwen: ['xinact'], xchromosoom: ['xinact'], kat: ['xinact'],
  veroudering: ['telomeren'], ouderworden: ['telomeren'], aging: ['telomeren'], ageing: ['telomeren'],
  bacterie: ['bcel', 'vergelijk'], bacteria: ['bcel'], bacterium: ['bcel'], ecoli: ['bcel'],
  groeifactor: ['signaal', 'rtk'], egf: ['rtk'], hormoon: ['signaal', 'gpcr', 'steroid'], adrenaline: ['gpcr'], cortisol: ['steroid'], signal: ['signaal'],
  letters: ['codon', 'basenparing'], code: ['codon'], drieletters: ['codon'],
  aanzetten: ['genregulatie', 'enhancer'], uitzetten: ['genregulatie', 'dnamethyl'], genaanzetten: ['genregulatie'], switch: ['riboswitch', 'genregulatie'],
  merkteken: ['histonmod', 'dnamethyl'], merktekens: ['histonmod', 'dnamethyl'], epigenetica: ['histonmod', 'dnamethyl', 'chromatine'], epigenetics: ['histonmod', 'dnamethyl'],
  verpakking: ['chromatine', 'nucleosoom'], inpakken: ['chromatine', 'nucleosoom'], opvouwen: ['chromatine'],
  energie: ['mito'], krachtcentrale: ['mito'], mitochondrien: ['mito'], mitochondria: ['mito'],
  adres: ['sortering'], adreslabel: ['sortering'], postcode: ['sortering'],
  suiker: ['glyco', 'nucleotide'], suikers: ['glyco'],
  crispr: ['crispr'], cas9: ['crispr'], faag: ['faag'], phage: ['faag'],
  proteinmade: ['translatie'], makeprotein: ['translatie'], makingprotein: ['translatie'], eiwitgemaakt: ['translatie'],
  ziekte: ['misvouwing', 'p53', 'mutaties'], disease: ['misvouwing', 'mutaties'],
};

const BACT_WORDS = new Set(['bacterie', 'bacterien', 'bacteria', 'bacterial', 'bacterieel', 'bacteriele', 'ecoli', 'coli', 'prokaryoot', 'prokaryote', 'operon', '70s', 'faag', 'phage']);

const lev = (a, b, max) => {                         // Levenshtein met vroegtijdig stoppen
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]; let best = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      if (cur[j] < best) best = cur[j];
    }
    if (best > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
};

/* hoe goed past zoekwoord q bij woord w? 1 = exact … 0 = niet */
function wordMatch(q, w) {
  if (q === w) return 1;
  if (q.length >= 3 && w.startsWith(q)) return .85;
  if (q.length >= 4 && w.includes(q)) return .7;              // samengestelde woorden: vouwing ⊂ eiwitvouwing
  if (w.length >= 5 && q.length > w.length && q.length - w.length <= 2 && q.startsWith(w)) return .6;   // "replicaties" → replicatie (niet: "trans" in "transkriptie")
  if (q.length >= 4) {
    const max = q.length >= 8 ? 2 : 1;
    const d = lev(q, w.length > q.length + 2 ? w.slice(0, q.length + 1) : w, max);
    if (d <= max) return w.length > q.length + 2 ? .45 : .55;   // tikfout (ook in het begin van een lang woord)
  }
  return 0;
}

export function makeSearch({ NODES, LINES, LINKS = {}, DETAILS = null, S_EN = {}, STEPS = {}, has = () => true }) {
  const docs = [];
  const byId = {};
  const LINE_KEYS = Object.keys(LINES);
  const MAIN = LINE_KEYS.filter(k => !LINES[k].side), SIDE = LINE_KEYS.filter(k => LINES[k].side);
  const relIn = {};                                          // wie verwijst naar mij als zijsprong
  for (const n of Object.values(NODES)) for (const r of n.rel ?? []) (relIn[r] ??= []).push(n.id);
  const hotIn = {};                                          // vanuit welke scène kan je erop klikken (shared/links.js)
  for (const [s, ts] of Object.entries(LINKS)) for (const x of ts) (hotIn[x] ??= []).push(s);

  for (const n of Object.values(NODES)) {
    const d = { id: n.id, fields: [] };
    const add = (txt, w) => { const ws = norm(txt).split(' ').filter(x => x.length > 1); if (ws.length) d.fields.push({ ws: [...new Set(ws)], w }); };
    add(n.t + ' ' + n.en, 10);
    add(n.id, 8);
    add(n.s + ' ' + (S_EN[n.id] ?? ''), 2.2);
    d.add = add;
    // korte stapstitels (shared/steptags.js): "knippen" vindt de scène én springt naar die stap
    (STEPS[n.id] ?? []).forEach((tg, k) => { const ws = norm(tg.join(' ')).split(' ').filter(x => x.length > 1); if (ws.length) d.fields.push({ ws: [...new Set(ws)], w: 4.5, step: k }); });
    docs.push(d); byId[n.id] = d;
  }
  // synoniemen als extra veld
  for (const [k, ids] of Object.entries(SYN)) for (const id of ids) byId[id]?.fields.push({ ws: [k], w: 9 });
  function addDetails(DET) {
    for (const [id, det] of Object.entries(DET ?? {})) {
      const d = byId[id]; if (!d || d.hasDet) continue; d.hasDet = true;
      for (const l of ['nl', 'en']) { const x = det[l]; if (!x) continue; d.add(x.kort ?? '', 3.2); d.add(x.what ?? '', 1.2); }
    }
  }
  if (DETAILS) addDetails(DETAILS);

  /* waar ligt een knoop in de app? Kosten: aantal stappen omhoog + kleine straf voor een andere lijn dan de huidige,
   * een zijpad, of een bacterielijn voor een menselijke knoop (en omgekeerd). Laagste kost wint. */
  function locate(id, pref) {
    const isBact = x => NODES[x]?.stage === 'bact';
    const cost = (k, x, depth) => depth + (k === pref ? 0 : LINES[k].side ? 1.2 : .4) + ((k === 'bacterie') !== isBact(id) ? 2.5 : 0) + (x !== id && NODES[x]?.stage !== NODES[id]?.stage ? .3 : 0);   // liefst een hoofdstuk over hetzelfde onderwerp
    let best = null;
    const consider = (x, depth, seenMap) => {
      for (const k of LINE_KEYS) {
        const ci = LINES[k].chapters.findIndex(c => c.id === x); if (ci < 0 || !has(x)) continue;
        const c = cost(k, x, depth);
        if (!best || c < best.c) {
          const path = []; for (let y = x; y; y = seenMap.get(y)) path.push(y);
          best = { c, line: k, ci, path: path.filter(has), inside: depth > 0 };
        }
      }
    };
    const seen = new Map([[id, null]]); let frontier = [id];
    consider(id, 0, seen);
    for (let depth = 1; depth <= 6 && frontier.length && !(best && best.c <= depth); depth++) {
      const nxt = [];
      for (const x of frontier) {
        const n = NODES[x]; if (!n) continue;
        for (const p of [...(hotIn[x] ?? []), ...(n.parents ?? []), ...(n.prev ?? []), ...(relIn[x] ?? [])]) {
          if (seen.has(p) || !NODES[p]) continue;
          seen.set(p, x); nxt.push(p);
        }
      }
      for (const p of nxt) consider(p, depth, seen);
      frontier = nxt;
    }
    if (best) { const { c, ...r } = best; return r; }
    return { line: pref ?? MAIN[0], ci: -1, path: [id], inside: true };
  }

  function query(text, { line = null, limit = 6 } = {}) {
    const raw = norm(text).split(' ').filter(Boolean);
    let toks = raw.filter(w => !STOP.has(w) && w.length > 1);
    if (!toks.length) toks = raw.filter(w => w.length > 1);
    if (!toks.length) return [];
    // woordparen samen ook als één synoniem proberen ("eiwit maken" → eiwitmaken, "x chromosoom" → xchromosoom)
    const pairs = [];
    for (let i = 0; i < raw.length - 1; i++) { const j = raw[i] + raw[i + 1]; if (SYN[j]) pairs.push(j); }
    const qs = [...toks, ...pairs];
    // 1) per knoop en per zoekwoord de beste treffer
    const rows = [];
    const df = qs.map(() => 0), exactAnywhere = qs.map(() => false);
    for (const d of docs) {
      if (!has(d.id)) continue;
      const per = qs.map((q, qi) => {
        let best = 0, m0 = 0, bw = null, title = 0, step = null, stepV = 0;
        for (const f of d.fields) for (const w of f.ws) {
          const m = wordMatch(q, w); if (!m) continue;
          const v = m * f.w; if (v > best) { best = v; m0 = m; bw = w; }
          if (f.step !== undefined && m >= .6 && v > stepV) { stepV = v; step = f.step; }
          if (f.w === 10) title = Math.max(title, m);
        }
        if (best) { df[qi]++; if (m0 >= .6) exactAnywhere[qi] = true; }
        return { best, m0, bw, title, step, stepV };
      });
      if (per.some(p => p.best)) rows.push({ d, per });
    }
    // 2) zeldzame woorden wegen zwaarder ("dna" staat overal, "gekopieerd" bijna nergens)
    const N = docs.length, idf = df.map(n => n ? .35 + Math.log(1 + N / n) / Math.log(1 + N) : 0);
    const res = rows.map(({ d, per }) => {
      let score = 0, hit = 0; const fixed = [];
      per.forEach((p, qi) => {
        if (!p.best || (p.m0 < .6 && exactAnywhere[qi])) return;   // tikfout-treffer negeren als het woord ook echt bestaat
        score += p.best * idf[qi] * (qi >= toks.length ? 2 : 1);   // herkende woordparen zijn heel specifiek
        if (qi < toks.length) hit++;
        if (p.m0 < .6 && !exactAnywhere[qi]) fixed.push([qs[qi], p.bw]);
      });
      const n = NODES[d.id];
      const tw = norm(n.t).split(' ').filter(w => w.length > 1);
      const cover = tw.length ? tw.reduce((a, w) => a + Math.max(0, ...qs.map(q => wordMatch(q, w))), 0) / tw.length : 0;   // titel bijna volledig = sterk
      const all = hit >= toks.length;
      const bactPen = n.stage === 'bact' && !qs.some(q => BACT_WORDS.has(q)) ? .85 : 1;   // bij gewone vragen eerst de mens
      const chapter = LINE_KEYS.some(k => LINES[k].chapters.some(c => c.id === d.id));
      // de stap waarvan de korte titel het best overeenkomt (enkel bij een echte treffer, geen tikfout-gok)
      let step = null, sv = 0; for (const p of per) if (p.step !== null && p.stepV > sv) { sv = p.stepV; step = p.step; }
      return { id: d.id, score: (score * (all ? 1.5 : .5 + hit / toks.length) + 6 * cover + (qs.includes(d.id) ? 4 : 0) + (chapter ? 1 : 0)) * bactPen, all, fixed, step, stepTag: step !== null ? STEPS[d.id][step] : null };
    });
    res.sort((a, b) => (b.all - a.all) || (b.score - a.score));
    const top = res.slice(0, limit);
    if (!top.length) return [];
    const cut = top[0].score * .3;                             // zwakke staart weglaten
    return top.filter(r => r.score >= cut).map(r => ({ ...r, loc: locate(r.id, line) }));
  }

  /* één tikfout-verbetering voor de hele zoekvraag ("Bedoel je: replicatie?") */
  function suggestion(text, results) {
    const fx = results.flatMap(r => r.fixed ?? []);
    if (!fx.length) return null;
    let s = norm(text); for (const [a, b] of fx) s = s.replace(new RegExp(`\\b${a}\\b`), b);
    return s === norm(text) ? null : s;
  }

  return { query, locate, addDetails, suggestion };
}
