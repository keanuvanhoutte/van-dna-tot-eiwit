/* Scènes voor stage 'prot' — zie app/SCENES.md. part_a/part_b = deelagenten; daarna het zijpad eiwitlot (05-11-2026) */
import a from './part_a.js';
import b from './part_b.js';
import sortering from './sortering.js';
import membraan from './membraan.js';
import lysosoom from './lysosoom.js';
import mito from './mito.js';
import perox from './perox.js';
import proteasoom from './proteasoom.js';
import autofagie from './autofagie.js';
export default [...a, ...b, sortering, membraan, lysosoom, mito, perox, proteasoom, autofagie];
