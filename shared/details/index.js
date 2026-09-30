/* Uitgebreide uitleg per knoop (zie app/SCENES.md voor het formaat). Eén bestand per stage (of deel). */
import entry from './entry.js';
import genome from './genome.js';
import genome2 from './genome2.js';
import repl from './repl.js';
import txn from './txn.js';
import rna from './rna.js';
import tl from './tl.js';
import prot from './prot.js';
import prot2 from './prot2.js';
export const DETAILS = { ...entry, ...genome, ...genome2, ...repl, ...txn, ...rna, ...tl, ...prot, ...prot2 };
