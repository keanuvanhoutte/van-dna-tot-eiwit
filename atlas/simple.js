/* Eenvoudige laag van de atlas: per item een begrijpelijke titel, "In het kort", "Wat zie je?", "Waarom belangrijk"
 * en een tabel met nuttige feiten (NL/EN). De vakinhoud uit entries.js blijft beschikbaar onder "Voor wie meer wil".
 * Vaktermen staan als [[woord|sleutel]] in de tekst → aantikbaar (shared/glossary.js + EXTRA_GLOSS hieronder). */
import * as d1 from './simple-1.js';
import * as d2 from './simple-2.js';
import * as d3 from './simple-3.js';

export const SIMPLE = { ...d1.SIMPLE, ...d2.SIMPLE, ...d3.SIMPLE };
export const EXTRA_GLOSS = { ...d1.EXTRA_GLOSS, ...d2.EXTRA_GLOSS, ...d3.EXTRA_GLOSS };
