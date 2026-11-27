/* Vaktaal-laag voor niveau hoger onderwijs — laatste schaafronde in het zijpaneel (Wat / Zo werkt het / Kerncijfers / Waarom).
 * Deze velden zijn al technisch, op enkele werkwoorden en woorden na ('knippen', 'plakt dicht', 'label'). In plaats van ze volledig
 * over te schrijven, vervangen we enkel die woorden in de basistekst (shared/details/), zodat latere inhoudelijke correcties daar
 * gewoon doorwerken. Velden die een andere tak al volledig vervangt, blijven ongemoeid (index.js voegt per veld samen). */
import { DETAILS } from '../details/index.js';

const NL = [
  ['die de suikerketens van het peptidoglycaan aan elkaar knopen. De wand verzwakt en de cel barst open.', 'die de suikerketens van het peptidoglycaan crosslinken. De wand verzwakt en de cel lyseert.'],
  ['zetten DNA-gyrase en topoisomerase IV vast op geknipt DNA', 'stabiliseren het klievingscomplex van DNA-gyrase en topoisomerase IV'],
  ['op het moment dat beide strengen geknipt zijn en verhinderen dat de breuk weer dicht gaat', 'nadat beide strengen gekliefd zijn en verhinderen de religatie'],
  ['maakt een tijdelijke breuk in beide strengen', 'klieft tijdelijk beide strengen'],
  ['en plakt de breuk dicht', 'en religeert de breuk'],
  ['Het medicijn bindt het geknipte complex', 'Het geneesmiddel bindt het klievingscomplex'],
  ['dan wordt de tijdelijke knip een blijvende dubbelstrengsbreuk', 'dan wordt de tijdelijke klieving een blijvende dubbelstrengsbreuk'],
  ['β-lactamasen knippen de β-lactamring open', 'β-lactamasen hydrolyseren de β-lactamring'],
  ['ribozymen die zichzelf uitknippen; inteïnes knippen zichzelf uit een eiwit', 'zelfsplicende ribozymen; inteïnes excideren zichzelf uit een eiwit'],
  ['het spliceosoom knipt de introns eruit', 'het spliceosoom verwijdert de introns'],
  ['de zeldzame introns knippen zichzelf uit', 'de zeldzame introns zijn zelfsplicend'],
  ['Helpers', 'Hulpfactoren'],
  ['herkent een afbraaklabel', 'herkent een degron'],
  ['met de knipplaatsen aan de binnenkant', 'met de actieve plaatsen aan de binnenkant'],
  ['Een bekend label is ssrA', 'Een bekend degron is de ssrA-tag'],
  ['grijpt het label', 'grijpt het degron'],
  ['In ClpP knippen 14 serineprotease-plaatsen de keten', 'In ClpP klieven 14 actieve serineproteaseplaatsen de keten'],
  ['met een eigen label (Pup)', 'met een eigen modificatie (Pup)'],
  ['Label', 'Degron'],
  ['knippen in een kamer', 'proteolyse in een afgesloten kamer'],
  ['maar de labels verschillen', 'maar de herkenningssignalen verschillen'],
  ['tot korte peptiden knipt', 'tot korte peptiden hydrolyseert'],
  ['Rpn11 knipt de keten eraf', 'Rpn11 (een deubiquitinase) verwijdert de keten'],
  ['knippen β1 (caspase-achtig)', 'klieven β1 (caspase-achtig)'],
  ['In de β-ringen knippen β1', 'In de β-ringen klieven β1'],
  ['binden het gelabelde eiwit', 'binden het gepolyubiquitineerde eiwit'],
  ['een voorgebouwde suikerboom van 14 suikers', 'een voorgevormd oligosacharide van 14 suikers'],
  ['De glucoses op de boom dienen daarna als "vouwlabel" in de kwaliteitscontrole van het ER', 'De glucoseresten dienen daarna als signaal in de kwaliteitscontrole van het ER (calnexine/calreticulinecyclus)'],
  ['in het Golgi wordt de boom verder bewerkt', 'in het Golgi wordt het glycaan verder bewerkt'],
];
const EN = [
  ['The wall weakens and the cell bursts.', 'The wall weakens and the cell lyses.'],
  ['lock DNA gyrase and topoisomerase IV onto cut DNA', 'stabilise the cleavage complex of DNA gyrase and topoisomerase IV'],
  ['at the moment both strands are cut and prevent the break from being resealed', 'after both strands are cleaved and prevent religation'],
  ['makes a temporary break in both strands', 'transiently cleaves both strands'],
  ['and reseals the break', 'and religates the break'],
  ['The drug binds the cut complex', 'The drug binds the cleavage complex'],
  ['the temporary cut becomes a lasting double-strand break', 'the transient cleavage becomes a lasting double-strand break'],
  ['β-lactamases cut open the β-lactam ring', 'β-lactamases hydrolyse the β-lactam ring'],
  ['ribozymes that cut themselves out; inteins cut themselves out of a protein', 'self-splicing ribozymes; inteins excise themselves from a protein'],
  ['the spliceosome cuts out the introns', 'the spliceosome removes the introns'],
  ['the rare introns cut themselves out', 'the rare introns are self-splicing'],
  ['Helpers', 'Accessory factors'],
  ['recognises a degradation tag', 'recognises a degron'],
  ['with the cutting sites on the inside', 'with the active sites on the inside'],
  ['A well-known tag is ssrA', 'A well-known degron is the ssrA tag'],
  ['grips the tag in its central pore', 'grips the degron in its central pore'],
  ['14 serine-protease sites cut the chain', '14 serine-protease active sites cleave the chain'],
  ['with their own tag (Pup)', 'with their own modifier (Pup)'],
  ['Tag', 'Degron'],
  ['cut in a chamber', 'proteolysis in a sequestered chamber'],
  ['but the tags differ', 'but the recognition signals differ'],
  ['and cuts it into short peptides', 'and hydrolyses it into short peptides'],
  ['β5 (chymotrypsin-like) cut;', 'β5 (chymotrypsin-like) cleave;'],
  ['β5 (after hydrophobic) cut with', 'β5 (after hydrophobic) cleave with'],
  ['a pre-assembled tree of 14 sugars', 'a preassembled oligosaccharide of 14 sugars'],
  ['The glucoses on the tree then serve as a "folding tag" in ER quality control', 'The glucose residues then serve as a signal in ER quality control (calnexin/calreticulin cycle)'],
  ['in the Golgi the tree is processed further', 'in the Golgi the glycan is processed further'],
];
const IDS = ['antibiotica', 'gyraseremmers', 'resistentie', 'bgen', 'vergelijk', 'bterm', 'bafbraak', 'ubiquitine', 'proteasoom', 'glyco'];
const fix = (v, rules) => typeof v === 'string' ? rules.reduce((s, [a, b]) => s.split(a).join(b), v) : Array.isArray(v) ? v.map(x => fix(x, rules)) : v;
const details = {};
for (const id of IDS) {
  const d = DETAILS[id]; if (!d) continue;
  const out = {};
  for (const [lang, rules] of [['nl', NL], ['en', EN]]) {
    const x = d[lang]; if (!x) continue;
    const o = {};
    for (const f of ['what', 'how', 'facts', 'why']) { if (x[f] == null) continue; const y = fix(x[f], rules); if (JSON.stringify(y) !== JSON.stringify(x[f])) o[f] = y; }
    if (Object.keys(o).length) out[lang] = o;
  }
  if (Object.keys(out).length) details[id] = out;
}
export default { labels: { nl: {}, en: {} }, steps: {}, details, gloss: {} };
export const POLISH_RULES = { nl: NL, en: EN };   // voor de controle: elke regel moet ergens toegepast worden
