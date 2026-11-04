/*
 * Zelf een PDB-code opzoeken: gegevens en coördinaten rechtstreeks van RCSB (in de browser, geen eigen server nodig).
 *  - fetchMeta(code): één GraphQL-vraag → titel, moleculen (eiwit/DNA/RNA, ketens, organisme), kleine moleculen, methode, grootte
 *  - fetchCoords(code, big): .pdb-bestand; bestaat dat niet (zeer grote structuren) of is de structuur groot → .cif.gz, in de browser uitgepakt
 *  - customEntry(code, meta): maakt een atlas-item met automatisch opgebouwde, eenvoudige tekst en feiten (NL/EN)
 */
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

async function gunzipText(resp) {
  const ds = resp.body.pipeThrough(new DecompressionStream('gzip'));
  return await new Response(ds).text();
}
export async function fetchCoords(code, big) {
  if (!big) {
    const r = await fetch(`https://files.rcsb.org/download/${code}.pdb`);
    if (r.ok) return { txt: await r.text(), fmt: 'pdb' };
  }
  const r = await fetch(`https://files.rcsb.org/download/${code}.cif.gz`);
  if (!r.ok) throw new Error(`${code}: ${r.status}`);
  return { txt: await gunzipText(r), fmt: 'cif' };
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

export function customEntry(code, m) {
  const ents = (m.polymer_entities ?? []).map(p => {
    const kind = KIND[p.entity_poly?.type] ?? 'other';
    const chains = (p.entity_poly?.pdbx_strand_id ?? '').split(',').map(s => s.trim()).filter(Boolean);
    const org = p.rcsb_entity_source_organism?.[0];
    return { kind, chains, len: p.entity_poly?.rcsb_sample_sequence_length, desc: p.rcsb_polymer_entity?.pdbx_description ?? '', org: org ? (org.ncbi_common_names?.[0] ?? org.scientific_name) : null, sci: org?.scientific_name };
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
  const orgs = [...new Set(ents.map(e => e.org).filter(Boolean))];
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
  if (orgs.length) facts.push([both('Afkomstig van', 'Comes from'), both(orgs.slice(0, 4).join(', '), orgs.slice(0, 4).join(', '))]);
  if (info.molecular_weight) facts.push([both('Gewicht', 'Weight'), both(`${Math.round(info.molecular_weight)} kDa <span class="ref">ter vergelijking: water = 0,018 kDa</span>`, `${Math.round(info.molecular_weight)} kDa <span class="ref">for comparison: water = 0.018 kDa</span>`)]);
  if (m.struct_keywords?.pdbx_keywords) facts.push([both('Trefwoord in de PDB', 'PDB keyword'), both(sentence(m.struct_keywords.pdbx_keywords), sentence(m.struct_keywords.pdbx_keywords))]);
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
      `Kleuren: ${join(colours.nl, 'nl')}. Elke keten heeft een eigen tint. Draai de figuur met de muis en zoom met het scrolwiel.${models > 1 ? ' Dit is een NMR-structuur: je ziet enkel het eerste model.' : ''}`,
      `Colours: ${join(colours.en, 'en')}. Each chain has its own shade. Rotate the figure with the mouse and zoom with the scroll wheel.${models > 1 ? ' This is an NMR structure: only the first model is shown.' : ''}`),
    atoms, ligNames: Object.fromEntries(smalls.map(c => [c.id, sentence(c.name)])),
  };
}
