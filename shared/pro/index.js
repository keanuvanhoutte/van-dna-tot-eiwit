/*
 * Vaktaal-laag voor niveau hoger onderwijs (bachelor/master). De basisteksten van de app (scènes, details, woordenlijst) zijn op
 * plaatsen in eenvoudige taal geschreven; op niveau hoger vervangt deze laag ze door vaktaal. Hobbyist en secundair gebruiken
 * ze niet (die hebben shared/simple/). Eén bestand per tak, elk met:
 *   labels:  { nl: { 'origineel': 'vaktaal', 'animatie-id|origineel': 'vaktaal' }, en: {…} }   — tekst IN de figuren (SVG, 3D-labels, legende)
 *   steps:   { 'animatie-id': [ { title?: {nl,en}, text?: {nl,en}, tag?: ['nl','en'] } | null, … ] } — per stap (index zoals in de scène), null = ongewijzigd; tag = korte naam op de tijdlijn
 *   meta:    { 'animatie-id': { title?: {nl,en}, simplified?: {nl,en} } }                   — titel van de scène (o.a. knop 'Volgend') en 'Wat is vereenvoudigd?'
 *   details: { 'animatie-id': { nl: { kort?, what?, how?, facts?, why? }, en: {…} } }       — zijpaneel, enkel de velden die wijzigen
 *   gloss:   { 'sleutel': { nl: [term, uitleg], en: [term, uitleg] } }                       — woordenlijst (shared/glossary.js)
 */
import entry from './entry.js';
import repl from './repl.js';
import txn from './txn.js';
import genome from './genome.js';
import rna from './rna.js';
import tl from './tl.js';
import prot from './prot.js';
import bact from './bact.js';
import signal from './signal.js';
import misc from './misc.js';
import polish from './polish.js';   // woordvervangingen in technische zijpaneelvelden (eerst; de takken gaan voor)
const parts = [entry, repl, txn, genome, rna, tl, prot, bact, signal, misc];
export const PRO_LABELS = { nl: Object.assign({}, ...parts.map(p => p.labels?.nl)), en: Object.assign({}, ...parts.map(p => p.labels?.en)) };
export const PRO_STEPS = Object.assign({}, ...parts.map(p => p.steps));
/* zijpaneel: per knoop en per taal veld voor veld samenvoegen (polish eerst, zodat een tak die een veld volledig herschrijft voorgaat) */
export const PRO_DETAILS = {};
for (const p of [polish, ...parts]) for (const [id, d] of Object.entries(p.details ?? {})) {
  const t = PRO_DETAILS[id] ??= {};
  for (const [lg, f] of Object.entries(d)) t[lg] = { ...(t[lg] ?? {}), ...f };
}
export const PRO_GLOSS = Object.assign({}, ...parts.map(p => p.gloss));
export const PRO_META = Object.assign({}, ...parts.map(p => p.meta ?? {}));
/* overgangszinnen tussen hoofdstukken (app/story.js): sleutel = originele Nederlandse zin */
export const PRO_BRIDGE = Object.assign({}, ...parts.map(p => p.bridges ?? {}));
