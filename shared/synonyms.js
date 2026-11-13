/* Woorden die (voor het zoeken) hetzelfde betekenen: Nederlands, Engels, afkortingen en vaktermen naast gewone woorden.
 * Zoek je één naamversie, dan vind je ook wat onder een andere naam staat (bv. "alkylering" vindt "crosslink").
 * Gebruikt door de zoekbalk van de app (shared/search.js) en de 3D-bibliotheek (atlas/smartsearch.js).
 * Elke groep = één begrip; woorden zonder spaties (zoekwoorden worden per woord vergeleken). */
const GROUPS = [
  // schade en medicijnen die aan DNA vastgrijpen
  ['crosslink', 'crosslinks', 'crosslinking', 'crosslinker', 'kruisverbinding', 'kruisverbindingen', 'alkylering', 'alkyleren', 'alkylerend', 'gealkyleerd', 'alkylation', 'alkylating', 'alkylated', 'adduct', 'adducten', 'adducts'],
  ['intercalatie', 'intercalator', 'intercalatoren', 'intercaleren', 'interkalatie', 'intercalation', 'intercalating', 'intercalators'],
  ['groefbinder', 'groefbinders', 'groovebinder', 'groovebinders'],
  ['medicijn', 'medicijnen', 'geneesmiddel', 'geneesmiddelen', 'drug', 'drugs', 'medicine', 'medicines'],
  ['antibioticum', 'antibiotica', 'antibiotic', 'antibiotics'],
  ['dsb', 'dubbelstrengsbreuk', 'dubbelstrengbreuk', 'doublestrandbreak'],
  ['uv', 'ultraviolet', 'zonlicht', 'sunlight'],
  ['mutatie', 'mutaties', 'mutation', 'mutations'],
  // soorten nucleïnezuren
  ['mrna', 'boodschapperrna', 'boodschapper', 'messengerrna', 'messenger'],
  ['trna', 'transferrna', 'overdrachtsrna'],
  ['rrna', 'ribosomaalrna', 'ribosomalrna'],
  ['mirna', 'microrna', 'micrornas', 'mirnas'],
  ['sirna', 'rnai', 'rnainterferentie', 'rnainterference', 'silencing'],
  ['lncrna', 'lncrnas', 'langnietcoderendrna', 'longnoncodingrna'],
  ['cdna', 'complementairdna', 'complementarydna', 'kopiedna', 'copydna'],
  ['mtdna', 'mitochondriaaldna', 'mitochondrialdna'],
  ['plasmide', 'plasmiden', 'plasmid', 'plasmids'],
  ['premrna', 'voorlopermrna', 'precursormrna', 'hnrna'],
  // vormen
  ['quadruplex', 'quadruplexen', 'quadruplexes', 'gquadruplex', 'g4', 'tetraplex', 'gkwartet', 'quartet'],
  ['triplex', 'triplehelix', 'driestrengig', 'drievoudig', 'hdna'],
  ['holliday', 'hollidayjunction', 'hollidaykruispunt'],
  ['zdna', 'linksdraaiend', 'linkshandig', 'lefthanded'],
  ['haarspeld', 'hairpin', 'stamlus', 'stemloop'],
  ['bulge', 'bulges', 'uitstulping', 'uitstulpingen'],
  ['pseudoknoop', 'pseudoknopen', 'pseudoknot', 'pseudoknots'],
  ['mismatch', 'mismatches', 'misparing', 'foutparing', 'mispairing'],
  ['wobble', 'gupaar', 'gupair'],
  ['basenpaar', 'basenparen', 'basepair', 'basepairs'],
  // moleculen en onderdelen
  ['eiwit', 'eiwitten', 'proteine', 'proteinen', 'protein', 'proteins'],
  ['ribosoom', 'ribosomen', 'ribosome', 'ribosomes'],
  ['ribozym', 'ribozymen', 'ribozyme', 'ribozymes', 'rnaenzym', 'katalytischrna'],
  ['riboswitch', 'riboswitches', 'riboschakelaar', 'rnaschakelaar'],
  ['histon', 'histonen', 'histone', 'histones'],
  ['nucleosoom', 'nucleosomen', 'nucleosome', 'nucleosomes'],
  ['chromosoom', 'chromosomen', 'chromosome', 'chromosomes'],
  ['telomeer', 'telomeren', 'telomere', 'telomeres'],
  ['promotor', 'promoter', 'promotors', 'promoters'],
  ['celkern', 'nucleus', 'kern'],
  ['spliceosoom', 'spliceosome', 'splicingmachine'],
  // processen
  ['transcriptie', 'transcription', 'afschrijven'],
  ['translatie', 'translation', 'vertaling', 'eiwitsynthese', 'proteinsynthesis'],
  ['replicatie', 'replication', 'verdubbeling'],
  ['splicing', 'splitsing', 'uitknippen'],
  ['methylering', 'methylatie', 'methylation', 'gemethyleerd', 'methylated'],
  ['fosforylering', 'fosforylatie', 'phosphorylation', 'gefosforyleerd', 'phosphorylated'],
  ['ubiquitine', 'ubiquitin', 'ubiquitinering', 'ubiquitination'],
  ['vouwing', 'folding', 'plooiing'],
  // organismen
  ['virus', 'virussen', 'viruses', 'viraal', 'viral'],
  ['bacterie', 'bacterien', 'bacteria', 'bacterium', 'bacterieel', 'bacterial'],
  ['vaccin', 'vaccins', 'vaccine', 'vaccines'],
];
const n = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '');
const MAP = new Map();
for (const g of GROUPS) {
  const ng = [...new Set(g.map(n))];
  for (const w of ng) MAP.set(w, [...new Set([...(MAP.get(w) ?? []), ...ng.filter(x => x !== w)])]);
}
/* het zoekwoord zelf + alle andere naamversies van hetzelfde begrip */
export const variants = tok => [tok, ...(MAP.get(n(tok)) ?? [])];
export const SYN_GROUPS = GROUPS;
