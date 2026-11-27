/* Eenvoudige labels IN de figuren voor de hobbyist: per taal origineel → eenvoudig ('' = verbergen); niet vermeld = ongewijzigd.
 * Eén bestand per tak (labels-<tak>.js). Opnieuw verzamelen van alle labels: tools/label-dump.html?lang=nl|en. */
import entry from './labels-entry.js';
import genome from './labels-genome.js';
import repl from './labels-repl.js';
import txnrna from './labels-txnrna.js';
import tl from './labels-tl.js';
import prot from './labels-prot.js';
import bact from './labels-bact.js';
import d3 from './labels-d3.js';           // naamkaartjes op de 3D-modellen
import fix from './labels-fix.js';         // per animatie ('id|tekst'), uit de beeldcontrole
import legend from './labels-legend.js';   // legende in het zijpaneel (apart: korte sleutels zoals H/N/O mogen de figuren niet raken)
const parts = [entry, genome, repl, txnrna, tl, prot, bact, d3, fix];
export const LABELS = { nl: Object.assign({}, ...parts.map(p => p.nl)), en: Object.assign({}, ...parts.map(p => p.en)) };
/* legende: eerst de eigen legendewoorden, anders dezelfde vervanging als in de figuur */
const shown = m => Object.fromEntries(Object.entries(m).filter(([, v]) => v));   // in de figuur verborgen ('') ≠ weg uit de legende
export const LEGEND = { nl: { ...shown(LABELS.nl), ...shown(legend.nl) }, en: { ...shown(LABELS.en), ...shown(legend.en) } };
