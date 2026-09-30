/* Inhoud in de gekozen taal: titel en samenvatting per knoop, namen van stappen en zoomniveaus. */
import { NODES, STAGES, SCALES } from './graph.js';
import { S_EN, SCALES_EN } from './graph.en.js';
import { lang } from './i18n.js';

export { NODES, STAGES, SCALES };
export const title = n => (lang === 'en' ? n.en : n.t);
export const sub = n => (lang === 'en' ? n.t : n.en);          // de term in de andere taal, als hulp
export const summary = n => (lang === 'en' ? S_EN[n.id] ?? n.s : n.s);
export const stageTitle = s => (lang === 'en' ? s.en : s.t);
export const scaleTitle = s => (lang === 'en' ? SCALES_EN[s.id] : s.t);
