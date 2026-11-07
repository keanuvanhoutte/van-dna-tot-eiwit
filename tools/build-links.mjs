/* Genereert shared/links.js: per scène de knopen waarnaar ze een klikbare hotspot heeft (data-node).
 * Gebruikt door de zoekfunctie (shared/search.js) om te weten via welk hoofdstuk je bij een onderdeel komt.
 * Opnieuw draaien na het toevoegen of wijzigen van scènes:  node tools/build-links.mjs */
import { writeFileSync } from 'node:fs';
globalThis.document = { documentElement: {}, createElement: () => ({ style: {} }), head: { append() {} } };
globalThis.location = { search: '' }; globalThis.localStorage = { getItem: () => null, setItem() {} };
globalThis.matchMedia = () => ({ matches: false });
const root = new URL('../', import.meta.url);
const { SCENES } = await import(new URL('app/scenes/index.js', root));
const links = {};
for (const [id, d] of Object.entries(SCENES)) {
  const base = d.alias ? SCENES[d.alias] : d;
  const h = base.kind === '3d' ? base.html() : base.svg();
  const s = new Set([...h.matchAll(/data-node="([a-z0-9_]+)"/g)].map(m => m[1])); s.delete(id);
  links[id] = [...s].sort();
}
const body = Object.entries(links).sort().map(([k, v]) => `  ${k}: [${v.map(x => `'${x}'`).join(', ')}],`).join('\n');
writeFileSync(new URL('shared/links.js', root), `/* Automatisch gemaakt door tools/build-links.mjs — niet met de hand aanpassen.\n * Per scène: de knopen waarnaar je vanuit die scène kunt klikken (hotspots). */\nexport const LINKS = {\n${body}\n};\n`);
console.log(Object.keys(links).length, 'scènes');
