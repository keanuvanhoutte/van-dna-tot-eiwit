/* Scènes voor stage 'genome' — zie app/SCENES.md. kern.js = bestaand; part_a/part_b = deelagenten; daarna het zijpad epigenetica (05-11-2026) */
import kern from './kern.js';
import a from './part_a.js';
import b from './part_b.js';
import remodeler from './remodeler.js';
import lussen from './lussen.js';
import enhancer from './enhancer.js';
import xinact from './xinact.js';
import imprinting from './imprinting.js';
export default [kern, ...a, ...b, remodeler, lussen, enhancer, xinact, imprinting];
