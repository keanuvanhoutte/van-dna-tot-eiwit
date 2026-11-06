/* Scènes voor de bacterie-route (verhaallijn 3, E. coli) — zie app/SCENES.md en docs/bacterie-schema.md */
import bcel from './bcel.js';
import bnucleoid from './bnucleoid.js';
import bplasmide from './bplasmide.js';
import bgen from './bgen.js';
import bpol from './bpol.js';
import bterm from './bterm.js';
import bmrna from './bmrna.js';
import bribosoom from './bribosoom.js';
import bafbraak from './bafbraak.js';
import breplicatie from './breplicatie.js';
import btrp from './btrp.js';
import bsplicing from './bsplicing.js';
/* zijpad virussen (05-11-2026) */
import faag from './faag.js';
import crispr from './crispr.js';
/* fase 4 (06-11-2026): mens en bacterie vergeleken */
import vergelijk from './vergelijk.js';
export default [bcel, bnucleoid, bplasmide, bgen, bpol, bterm, bmrna, bribosoom, bafbraak, breplicatie, btrp, bsplicing, faag, crispr, vergelijk];
