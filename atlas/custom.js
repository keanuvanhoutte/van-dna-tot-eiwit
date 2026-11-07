/*
 * Zelf een PDB-code opzoeken: gegevens en coördinaten rechtstreeks van RCSB (in de browser, geen eigen server nodig).
 *  - fetchMeta(code): één GraphQL-vraag → titel, moleculen (eiwit/DNA/RNA, ketens, organisme), kleine moleculen, methode, grootte
 *  - fetchCoords(code, big): .pdb-bestand; bestaat dat niet (zeer grote structuren) of is de structuur groot → .cif.gz, in de browser uitgepakt
 *  - customEntry(code, meta): maakt een atlas-item met automatisch opgebouwde, eenvoudige tekst en feiten (NL/EN)
 */
import { fetchText } from './fetchprog.js';
export const CODE_RE = /^[0-9][A-Z0-9]{3}$/;

const GQL = 'https://data.rcsb.org/graphql';
const Q = id => `{entry(entry_id:"${id}"){
  rcsb_id struct{title} struct_keywords{pdbx_keywords} rcsb_accession_info{initial_release_date}
  exptl{method} rcsb_entry_info{resolution_combined deposited_atom_count molecular_weight deposited_model_count}
  polymer_entities{rcsb_polymer_entity{pdbx_description} entity_poly{type pdbx_strand_id rcsb_sample_sequence_length}
    rcsb_entity_source_organism{scientific_name ncbi_common_names}}
  nonpolymer_entities{nonpolymer_comp{chem_comp{id name}}}
}}`;

export async function fetchMeta(code) {
  const r = await fetch(GQL + '?query=' + encodeURIComponent(Q(code)));
  if (!r.ok) throw new Error(`RCSB ${r.status}`);
  const j = await r.json();
  return j?.data?.entry ?? null;
}

/* coördinaten: .pdb, of .cif.gz (in de browser uitgepakt) als de structuur groot is of geen .pdb-bestand heeft.
 * Geeft ook de url terug, zodat de laadbalk de voortgang (fetchprog.js) kan volgen. */
export const coordUrl = (code, fmt) => `https://files.rcsb.org/download/${code}.${fmt === 'cif' ? 'cif.gz' : 'pdb'}`;
export async function fetchCoords(code, big) {
  if (!big) {
    try { return { txt: await fetchText(coordUrl(code, 'pdb')), fmt: 'pdb' }; } catch { /* geen .pdb → mmCIF */ }
  }
  return { txt: await fetchText(coordUrl(code, 'cif'), { gz: true }), fmt: 'cif' };
}

/* ---------- van RCSB-gegevens naar een eenvoudig atlas-item ---------- */
const KIND = { 'polypeptide(L)': 'prot', 'polypeptide(D)': 'prot', polydeoxyribonucleotide: 'dna', polyribonucleotide: 'rna', 'polydeoxyribonucleotide/polyribonucleotide hybrid': 'hybrid' };
const KIND_TXT = {
  prot: { nl: ['eiwitketen', 'eiwitketens'], en: ['protein chain', 'protein chains'] },
  dna: { nl: ['DNA-streng', 'DNA-strengen'], en: ['DNA strand', 'DNA strands'] },
  rna: { nl: ['RNA-streng', 'RNA-strengen'], en: ['RNA strand', 'RNA strands'] },
  hybrid: { nl: ['DNA/RNA-streng', 'DNA/RNA-strengen'], en: ['DNA/RNA strand', 'DNA/RNA strands'] },
  other: { nl: ['ander polymeer', 'andere polymeren'], en: ['other polymer', 'other polymers'] },
};
/* water, buffers en kristallisatiehulpmiddelen: geen "extra molecule" voor de lezer */
const BORING = new Set(['HOH', 'DOD', 'GOL', 'EDO', 'SO4', 'PO4', 'ACT', 'MPD', 'PEG', 'PG4', 'PGE', '1PE', 'TRS', 'EPE', 'MES', 'CAC', 'FMT', 'DMS', 'BME', 'NO3', 'ACY', 'MRD', 'IPA', 'EOH', 'MOH', 'CIT', 'TAR', 'P6G', 'CL', 'NA', 'K', 'IOD', 'BR', 'UNX', 'UNL',
  /* metaalionen staan apart in de tabel (Metaalionen) */ 'MG', 'MN', 'CA', 'ZN', 'SR', 'BA', 'CS', 'RB', 'CO', 'NI', 'CD', 'TL', 'LI', 'CU', 'FE', 'HG', 'NH4']);
/* PDB-teksten staan vaak in HOOFDLETTERS: enkel die omzetten naar gewone zinsvorm, en afkortingen herstellen */
const ACR = { dna: 'DNA', rna: 'RNA', trna: 'tRNA', mrna: 'mRNA', rrna: 'rRNA', snrna: 'snRNA', mirna: 'miRNA', atp: 'ATP', gtp: 'GTP', adp: 'ADP', gdp: 'GDP', nad: 'NAD', nadh: 'NADH', nadph: 'NADPH', fad: 'FAD', hiv: 'HIV', 'hiv-1': 'HIV-1', nmr: 'NMR', ii: 'II', iii: 'III', iv: 'IV' };
const sentence = s => {
  let x = (s ?? '').trim(); if (!x) return '';
  if (x !== x.toUpperCase()) return x.charAt(0).toUpperCase() + x.slice(1);
  x = x.toLowerCase().replace(/\b[a-z0-9-]+\b/g, w => ACR[w] ?? (/^\d+s$/.test(w) ? w.toUpperCase() : w));
  return x.charAt(0).toUpperCase() + x.slice(1);
};
/* beschrijvingen die enkel een sequentie zijn, bv. DNA (5'-D(*CP*GP*...)-3') */
const seqLike = d => /\*|5'-|5’-/.test(d ?? '');
const cut = (s, n) => s.length > n ? s.slice(0, n - 1).replace(/\s+\S*$/, '') + '…' : s;
const both = (nl, en) => ({ nl, en });
/* organismen: Nederlandse naam voor de bekendste, anders de wetenschappelijke naam */
const ORG_NL = { 'Homo sapiens': 'mens', 'Mus musculus': 'muis', 'Rattus norvegicus': 'rat', 'Bos taurus': 'rund', 'Sus scrofa': 'varken', 'Gallus gallus': 'kip', 'Danio rerio': 'zebravis', 'Drosophila melanogaster': 'fruitvlieg', 'Saccharomyces cerevisiae': 'bakkersgist', 'Escherichia coli': 'E. coli (bacterie)', 'Escherichia coli K-12': 'E. coli (bacterie)', 'Arabidopsis thaliana': 'zandraket (plant)', 'Xenopus laevis': 'klauwkikker', 'Oryctolagus cuniculus': 'konijn', 'Equus caballus': 'paard', 'Canis lupus familiaris': 'hond', 'synthetic construct': 'kunstmatig gemaakt' };

export function customEntry(code, m) {
  const ents = (m.polymer_entities ?? []).map(p => {
    const kind = KIND[p.entity_poly?.type] ?? 'other';
    const chains = (p.entity_poly?.pdbx_strand_id ?? '').split(',').map(s => s.trim()).filter(Boolean);
    const org = p.rcsb_entity_source_organism?.[0];
    return { kind, chains, len: p.entity_poly?.rcsb_sample_sequence_length, desc: p.rcsb_polymer_entity?.pdbx_description ?? '', org: org ? both(ORG_NL[org.scientific_name] ?? org.scientific_name, org.ncbi_common_names?.[0] ?? org.scientific_name) : null, sci: org?.scientific_name };
  });
  const smalls = (m.nonpolymer_entities ?? []).map(n => n.nonpolymer_comp?.chem_comp).filter(c => c && !BORING.has(c.id));
  const title = sentence(m.struct?.title);
  const info = m.rcsb_entry_info ?? {};
  const atoms = info.deposited_atom_count ?? 0;
  const models = info.deposited_model_count ?? 1;
  const kinds = [...new Set(ents.map(e => e.kind))];
  // grootte per soort (aantal ketens)
  const count = {}; for (const e of ents) count[e.kind] = (count[e.kind] ?? 0) + e.chains.length;
  const partsL = l => Object.entries(count).map(([k, n]) => `${n} ${KIND_TXT[k][l][n === 1 ? 0 : 1]}`);
  const join = (arr, l) => arr.length <= 1 ? arr.join('') : arr.slice(0, -1).join(', ') + (l === 'nl' ? ' en ' : ' and ') + arr.at(-1);
  // dubbelhelix? precies twee korte DNA- of RNA-strengen → helixparameters proberen (worden enkel getoond als er echte basenparen zijn)
  const naChains = ents.filter(e => ['dna', 'rna', 'hybrid'].includes(e.kind)).flatMap(e => e.chains.map(c => ({ c, len: e.len })));
  const helix = naChains.length === 2 && naChains.every(x => (x.len ?? 99) <= 40) ? naChains.map(x => x.c) : undefined;
  const orgs = l => [...new Set(ents.map(e => e.org?.[l]).filter(Boolean))];
  const year = (m.rcsb_accession_info?.initial_release_date ?? '').slice(0, 4);
  const colours = {
    nl: [count.prot && 'eiwit is paars', count.dna && 'DNA is blauw', count.rna && 'RNA is oranje', smalls.length && 'kleine moleculen zijn groen'].filter(Boolean),
    en: [count.prot && 'protein is purple', count.dna && 'DNA is blue', count.rna && 'RNA is orange', smalls.length && 'small molecules are green'].filter(Boolean),
  };
  const MAXM = 6;
  const molRow = l => ents.slice(0, ents.length > MAXM + 1 ? MAXM : MAXM + 1).map(e => `${seqLike(e.desc) ? ({ dna: 'DNA', rna: 'RNA', hybrid: 'DNA/RNA' }[e.kind] ?? sentence(e.desc)) : cut(sentence(e.desc), 48)} <span class="ref">${{ prot: { nl: 'eiwit', en: 'protein' }, dna: { nl: 'DNA', en: 'DNA' }, rna: { nl: 'RNA', en: 'RNA' }, hybrid: { nl: 'DNA/RNA', en: 'DNA/RNA' }, other: { nl: 'ander', en: 'other' } }[e.kind][l]}${e.chains.length > 1 ? ` × ${e.chains.length}` : ''}${e.len ? ` · ${e.len} ${e.kind === 'prot' ? (l === 'nl' ? 'aminozuren' : 'amino acids') : (l === 'nl' ? 'letters' : 'letters')}` : ''}</span>`).join('<br>')
    + (ents.length > MAXM + 1 ? `<br><span class="ref">${l === 'nl' ? `+ ${ents.length - MAXM} andere soorten moleculen` : `+ ${ents.length - MAXM} other kinds of molecules`}</span>` : '');
  const facts = [
    [both('Titel in de PDB', 'Title in the PDB'), both(`${title} <span class="ref">(Engels, zoals in de databank)</span>`, title)],
    [both('Wat zit erin?', 'What is in it?'), both(molRow('nl'), molRow('en'))],
  ];
  if (smalls.length) facts.push([both('Kleine moleculen', 'Small molecules'), both(smalls.slice(0, 6).map(c => sentence(c.name)).join(', ') + (smalls.length > 6 ? ' …' : ''), smalls.slice(0, 6).map(c => sentence(c.name)).join(', ') + (smalls.length > 6 ? ' …' : ''))]);
  if (orgs('nl').length) facts.push([both('Afkomstig van', 'Comes from'), both(orgs('nl').slice(0, 4).join(', '), orgs('en').slice(0, 4).join(', '))]);
  if (info.molecular_weight) facts.push([both('Gewicht', 'Weight'), both(`${Math.round(info.molecular_weight)} kDa <span class="ref">ter vergelijking: water = 0,018 kDa</span>`, `${Math.round(info.molecular_weight)} kDa <span class="ref">for comparison: water = 0.018 kDa</span>`)]);
  if (m.struct_keywords?.pdbx_keywords) facts.push([both('Trefwoord in de PDB', 'PDB keyword'), both(`${sentence(m.struct_keywords.pdbx_keywords)} <span class="ref">(Engels)</span>`, sentence(m.struct_keywords.pdbx_keywords))]);
  if (year) facts.push([both('Gepubliceerd', 'Released'), both(year, year)]);
  return {
    id: 'pdb-' + code, pdb: code, custom: true, big: atoms > 60000, heavy: atoms > 25000, noHb: atoms > 150000, helix,
    type: kinds.filter(k => k !== 'other'), cls: [], ctx: [], scenes: [], src: [], facts,
    name: both(cut(title, 70) || code, cut(title, 70) || code), sub: both(`zelf opgezocht · ${join(partsL('nl'), 'nl')}`, `looked up yourself · ${join(partsL('en'), 'en')}`),
    what: both('', ''), feat: both([], []), cell: both('', ''),
    kort: both(
      `Deze structuur heb je zelf opgezocht in de PDB, de wereldwijde databank van 3D-modellen van moleculen. Het model bevat ${join(partsL('nl'), 'nl') || 'één molecule'}${smalls.length ? `, met ${smalls.length} ${smalls.length === 1 ? 'klein molecule' : 'kleine moleculen'}` : ''}. Voor zelf opgezochte structuren is er geen uitleg op maat: de tabel naast de figuur is automatisch opgebouwd.`,
      `You looked up this structure yourself in the PDB, the worldwide database of 3D models of molecules. The model contains ${join(partsL('en'), 'en') || 'one molecule'}${smalls.length ? `, with ${smalls.length} small molecule${smalls.length === 1 ? '' : 's'}` : ''}. There is no tailored explanation for structures you look up yourself: the table next to the figure is built automatically.`),
    look: both(
      `Kleuren: ${join(colours.nl, 'nl')}. Elke keten heeft een eigen tint; met Kleur → Per keten krijgt elke keten een duidelijk andere kleur${count.prot > 1 ? ' (zo zie je uit hoeveel delen het eiwit bestaat)' : ''}.${count.dna || count.rna ? ' Via Tonen kan je het DNA/RNA verbergen.' : ''} Draai de figuur met de muis en zoom met het scrolwiel.${models > 1 ? ' Dit is een NMR-structuur: je ziet enkel het eerste model.' : ''}`,
      `Colours: ${join(colours.en, 'en')}. Each chain has its own shade; Colour → By chain gives every chain a clearly different colour${count.prot > 1 ? ' (so you see how many parts the protein has)' : ''}.${count.dna || count.rna ? ' Use Show to hide the DNA/RNA.' : ''} Rotate the figure with the mouse and zoom with the scroll wheel.${models > 1 ? ' This is an NMR structure: only the first model is shown.' : ''}`),
    atoms, ligNames: Object.fromEntries(smalls.map(c => [c.id, sentence(c.name)])),
  };
}

/* ---------- zoeken op gen- of eiwitnaam (bv. TP53, CDK1, insuline) ----------
 * 1. UniProt: is het een gennaam? eerst bij de mens, anders bij eender welk organisme (nagekeken Swiss-Prot-items)
 * 2. RCSB: alle PDB-structuren die dat UniProt-eiwit bevatten (via SIFTS gekoppeld, dus ook oude klassiekers zoals 1TUP)
 * 3. geen gennaam → gewone tekstzoekopdracht in de PDB
 * Daarna één GraphQL-vraag voor titel, methode, scherpte en welk deel van het eiwit erin zit, en een rangschikking
 * die de meest leerrijke structuren bovenaan zet (groot stuk van het eiwit, scherp gemeten). */
const UNIPROT = 'https://rest.uniprot.org/uniprotkb/search';
const SEARCH = 'https://search.rcsb.org/rcsbsearch/v2/query';
const MAXHITS = 150;

/* Nederlandse eiwitnamen → Engelse naam zoals in UniProt */
const NL_EN = { insuline: 'insulin', hemoglobine: 'hemoglobin', myoglobine: 'myoglobin', collageen: 'collagen', keratine: 'keratin', actine: 'actin', myosine: 'myosin', tubuline: 'tubulin', histon: 'histone', histonen: 'histone', ubiquitine: 'ubiquitin', lysozym: 'lysozyme', trypsine: 'trypsin', pepsine: 'pepsin', albumine: 'albumin', ferritine: 'ferritin', elastine: 'elastin', fibrine: 'fibrin', glucagon: 'glucagon', calmoduline: 'calmodulin', rodopsine: 'rhodopsin', telomerase: 'telomerase', helicase: 'helicase', ligase: 'ligase', 'groen fluorescent eiwit': 'green fluorescent protein' };
const PREF = [9606, 83333, 562, 10090, 559292, 7227]; // mens, E. coli, muis, gist, fruitvlieg
const orgRank = u => PREF.indexOf(u.organism?.taxonId) + 1 || 99;
async function uniprot(q, size = 10, extra = '') {
  const r = await fetch(`${UNIPROT}?query=${encodeURIComponent(q)}&fields=accession,gene_primary,protein_name,organism_name,length${extra}&size=${size}&format=json`);
  return r.ok ? ((await r.json()).results ?? []) : [];
}
/* gennaam: liefst een eiwit waarvan dit de HOOFDnaam is (recA → bacterieel RecA, niet het menselijke RAD51 dat "RECA" als bijnaam heeft) */
async function uniprotGene(term) {
  const prim = u => (u.genes?.[0]?.geneName?.value ?? '').toLowerCase() === term.toLowerCase();
  const human = await uniprot(`gene_exact:${term} AND organism_id:9606 AND reviewed:true`, 5);
  let u = human.find(prim);
  if (!u) {
    const any = (await uniprot(`gene_exact:${term} AND reviewed:true`, 25)).sort((a, b) => orgRank(a) - orgRank(b));
    u = any.find(prim) ?? human[0] ?? any[0];
  }
  return u ? toProt(u, term) : null;
}
/* eiwitnaam (hemoglobin, insulin): eerst bij de mens, dan bij eender welk organisme */
async function uniprotName(term) {
  const en = NL_EN[term.toLowerCase()] ?? term;
  const q = `protein_name:"${en.replace(/"/g, '')}" AND reviewed:true`;
  // het eiwit met de meeste PDB-structuren: "hemoglobin" → α- of β-keten, niet de zeldzame embryonale ε-keten
  const nPdb = u => (u.uniProtKBCrossReferences ?? []).filter(x => x.database === 'PDB').length;
  const best = list => list.filter(u => nPdb(u) > 0).sort((a, b) => nPdb(b) - nPdb(a))[0];
  const u = best(await uniprot(`${q} AND organism_id:9606`, 10, ',xref_pdb')) ?? best((await uniprot(q, 25, ',xref_pdb')).sort((a, b) => orgRank(a) - orgRank(b)));
  return u ? toProt(u, term) : null;
}
function toProt(u, term) {
  const pd = u.proteinDescription ?? {};
  return {
    acc: u.primaryAccession, gene: u.genes?.[0]?.geneName?.value ?? term,
    name: pd.recommendedName?.fullName?.value ?? pd.submissionNames?.[0]?.fullName?.value ?? term,
    org: u.organism?.commonName ?? u.organism?.scientificName, sci: u.organism?.scientificName, len: u.sequence?.length,
  };
}
async function rcsbIds(query, rows) {
  const r = await fetch(SEARCH, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query, return_type: 'entry', request_options: { paginate: { start: 0, rows } } }) });
  if (r.status === 204) return { total: 0, ids: [] };
  if (!r.ok) throw new Error(`RCSB ${r.status}`);
  const j = await r.json();
  return { total: j.total_count ?? 0, ids: (j.result_set ?? []).map(x => x.identifier) };
}
const QS = ids => `{entries(entry_ids:${JSON.stringify(ids)}){
  rcsb_id struct{title} exptl{method} rcsb_entry_info{resolution_combined deposited_atom_count} rcsb_accession_info{initial_release_date}
  polymer_entities{entity_poly{type rcsb_sample_sequence_length pdbx_strand_id} rcsb_polymer_entity{pdbx_description}
    rcsb_polymer_entity_container_identifiers{reference_sequence_identifiers{database_name database_accession}}
    rcsb_entity_source_organism{scientific_name}}
}}`;

export async function searchPDB(raw) {
  const term = String(raw ?? '').trim().replace(/[^\p{L}\p{N} .,'()/+-]/gu, '').slice(0, 60);
  if (!term) return null;
  let prot = null;
  if (/^[\p{L}\p{N}.-]{2,15}$/u.test(term)) prot = await uniprotGene(term);
  /* meerdere woorden ("tumor suppressor TP53", "het eiwit p53"): eerst het woord dat op een gennaam lijkt (cijfer of hoofdletters) */
  if (!prot && /\s/.test(term)) for (const w of term.split(/\s+/).filter(w => /^[\p{L}\p{N}-]{2,12}$/u.test(w) && (/\d/.test(w) || (w === w.toUpperCase() && /\p{L}/u.test(w))))) { prot = await uniprotGene(w); if (prot) break; }
  if (!prot) prot = await uniprotName(term);
  if (!prot && /\s/.test(term)) for (const w of term.split(/\s+/).filter(w => /\d/.test(w) && w.length >= 2)) { prot = await uniprotName(w); if (prot) break; }
  const byAcc = acc => ({ type: 'terminal', service: 'text', parameters: { attribute: 'rcsb_polymer_entity_container_identifiers.reference_sequence_identifiers.database_accession', operator: 'exact_match', value: acc } });
  let hits = prot ? await rcsbIds(byAcc(prot.acc), MAXHITS) : { total: 0, ids: [] };
  if (!hits.ids.length) { prot = null; hits = await rcsbIds({ type: 'terminal', service: 'full_text', parameters: { value: NL_EN[term.toLowerCase()] ?? term } }, 40); }
  const { total, ids } = hits;
  if (!ids.length) return { term, prot, total: 0, items: [] };
  const r = await fetch(GQL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: QS(ids) }) });
  if (!r.ok) throw new Error(`RCSB ${r.status}`);
  const entries = (await r.json())?.data?.entries ?? [];
  const items = entries.filter(Boolean).map((m, rank) => {
    const ents = m.polymer_entities ?? [];
    const kinds = new Set(ents.map(p => KIND[p.entity_poly?.type] ?? 'other'));
    // alle stukken van dit eiwit samen (insuline = A- en B-keten uit één gen)
    const mineAll = prot ? ents.filter(p => (p.rcsb_polymer_entity_container_identifiers?.reference_sequence_identifiers ?? []).some(x => x.database_accession === prot.acc)) : [];
    const mine = mineAll[0] ?? null;
    // stukken van één gen (insuline: A- + B-keten) optellen, maar dezelfde keten twee keer (twee kopieën als aparte entiteit) niet
    const lens = [...new Set(mineAll.map(p => p.entity_poly?.rcsb_sample_sequence_length ?? 0))];
    const len = lens.reduce((n, l) => n + l, 0) || undefined;
    const meth = (m.exptl?.[0]?.method ?? '').toUpperCase();
    const res = m.rcsb_entry_info?.resolution_combined?.[0] ?? null;
    return {
      code: m.rcsb_id, title: cut(sentence(m.struct?.title), 90), rank,
      odd: /mutant|mutation|variant|analog|designed|engineered|mini-|single-chain|inhibitor|fragment|compound|small molecule|drug|\b[A-Z]\d{2,4}[A-Z]\b/i.test(m.struct?.title ?? ''),
      method: /X-RAY/.test(meth) ? 'xray' : /NMR/.test(meth) ? 'nmr' : /ELECTRON/.test(meth) ? 'em' : 'other', res,
      year: (m.rcsb_accession_info?.initial_release_date ?? '').slice(0, 4), atoms: m.rcsb_entry_info?.deposited_atom_count ?? 0,
      len, cov: prot?.len && len ? Math.min(1, len / prot.len) : null,
      copies: mineAll.reduce((n, p) => n + ((p.entity_poly?.pdbx_strand_id ?? '').split(',').filter(Boolean).length || 1), 0),
      dna: kinds.has('dna') || kinds.has('hybrid'), rna: kinds.has('rna'), partners: ents.filter(p => !mineAll.includes(p) && KIND[p.entity_poly?.type] === 'prot').length,
      org: (mine ?? ents[0])?.rcsb_entity_source_organism?.[0]?.scientific_name ?? null,
    };
  });
  if (prot) {
    // leerrijk eerst: een groot stuk van het eiwit (≥ helft), dan scherp gemeten; korte peptiden achteraan
    // + de natuurlijke vorm vóór mutanten en geneesmiddel-screenings, en complexen met DNA/RNA (ziet het eiwit aan het werk)
    const bucket = x => x.cov == null ? 2 : x.cov >= .4 ? 0 : x.cov >= .15 ? 1 : 3;
    const sharp = x => Math.min(x.res ?? (x.method === 'nmr' ? 3 : 9), 4.5);
    const score = x => bucket(x) * 10
      + (/mutant|mutation|variant|analog|designed|engineered|mini-|single-chain|\b[A-Z]\d{2,4}[A-Z]\b/i.test(x.title) ? 3 : 0)
      + (/inhibitor|fragment|compound|small molecule|ligand \d|drug/i.test(x.title) ? 2 : 0)
      - (x.dna || x.rna ? 2 : 0) + sharp(x)
      - (+x.year && +x.year <= 2000 ? 1.5 : 0);   // de eerste structuren van een eiwit zijn meestal de bekende uit de handboeken (bv. p53 + DNA: 1TUP, 1995)
    items.sort((a, b) => score(a) - score(b) || a.year.localeCompare(b.year));
    // spreiding: een titel die (bijna) hetzelfde begint als een eerder resultaat schuift naar achteren
    const seen = new Set(), first = [], later = [];
    for (const x of items) {
      const key = x.title.toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean).slice(0, 4).join(' ');
      (seen.has(key) ? later : first).push(x); seen.add(key);
    }
    items.splice(0, items.length, ...first, ...later);
  } else items.sort((a, b) => a.rank - b.rank);
  return { term, prot, total, items };
}
