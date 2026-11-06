/*
 * Schakelaar mens ⇄ bacterie (fase 4): springt naar dezelfde structuur of hetzelfde proces bij het andere organisme.
 * Alleen paren die echt hetzelfde vergelijken (nagekeken op titel en samenvatting in shared/graph.js):
 *   menselijke cel ↔ bacteriecel · chromatine/nucleosoom ↔ nucleoïd (DNA opvouwen, met of zonder histonen) ·
 *   gen ↔ bacterieel gen · RNA-polymerase II (en Pol I/II/III) ↔ bacterieel RNA-polymerase · transcriptie ↔ prokaryote
 *   transcriptie & operon · DNA-replicatie ↔ bacteriële replicatie · splicing ↔ zelfsplicende introns · translatie ↔
 *   bacterieel mRNA & 70S-translatie · ribosoom ↔ 70S-ribosoom · proteasoom/ubiquitine ↔ ClpXP & Lon (eiwitafbraak).
 * Bewust niet: 'terminatie' (= einde van de translatie) ↔ 'bterm' (= einde van de transcriptie); 'mrnaafbraak' (mRNA)
 * ↔ 'bafbraak' (eiwitten) — dat zijn verschillende processen.
 */
import { NODES, title } from '../shared/content.js';
import { L } from '../shared/i18n.js';

const TO_BACT = {
  cel: 'bcel', chromatine: 'bnucleoid', nucleosoom: 'bnucleoid', gen: 'bgen', rnapol: 'bpol', polymerasen: 'bpol',
  transcriptie: 'operon', replicatie: 'breplicatie', splicing: 'bsplicing', translatie: 'bmrna', ribosoom: 'bribosoom',
  proteasoom: 'bafbraak', ubiquitine: 'bafbraak',
};
const TO_HUMAN = {
  bcel: 'cel', bnucleoid: 'chromatine', bgen: 'gen', bpol: 'rnapol', operon: 'transcriptie', breplicatie: 'replicatie',
  bsplicing: 'splicing', bmrna: 'translatie', bribosoom: 'ribosoom', bafbraak: 'proteasoom',
};
export const COUNTERPART = { ...TO_BACT, ...TO_HUMAN };
export const isBact = id => id in TO_HUMAN;

/* knoptekst: het huidige organisme vet, het andere gedimd */
export function orgButton(id) {
  const other = COUNTERPART[id];
  if (!other || !NODES[other]) return null;
  const H = L({ nl: 'Mens', en: 'Human' }), B = L({ nl: 'Bacterie', en: 'Bacterium' }), b = isBact(id);
  return {
    target: other,
    html: `<span>⇄</span> <em>${b ? `<span class="o">${H}</span> ⇄ <b>${B}</b>` : `<b>${H}</b> ⇄ <span class="o">${B}</span>`}</em>`,
    tip: L({ nl: `Bekijk hetzelfde bij ${b ? 'de mens' : 'de bacterie'}: ${title(NODES[other])}`, en: `See the same in ${b ? 'humans' : 'the bacterium'}: ${title(NODES[other])}` }),
  };
}
