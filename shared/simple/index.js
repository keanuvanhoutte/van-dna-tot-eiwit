/* Eenvoudige teksten voor de niveaus hobbyist en secundair (zie shared/level.js), één bestand per tak.
 * Per animatie: { hobby: { kort, steps }, secundair: { kort, terms, steps } }; steps = { stapnummer: { tag, title, text } } (enkel kernstappen).
 * Bij nieuwe of gewijzigde kernstappen (shared/levels.js, cijfer 1) hier ook aanvullen; ontbreekt een tekst, dan valt de app terug op de gewone tekst. */
import entry from './entry.js';
import genome from './genome.js';
import repl from './repl.js';
import txnrna from './txnrna.js';
import tl from './tl.js';
import prot from './prot.js';
import bact from './bact.js';
export const SIMPLE = { ...entry, ...genome, ...repl, ...txnrna, ...tl, ...prot, ...bact };
