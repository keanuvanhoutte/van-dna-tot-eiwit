/* Register van alle scènes: elke stage-map levert een lijst scène-objecten.
 * Elke stage wordt apart geladen: een fout in één stage legt de rest van de app niet plat. */
const STAGES = ['entry', 'genome', 'repl', 'txn', 'rna', 'tl', 'prot'];
const results = await Promise.allSettled(STAGES.map(s => import(`./${s}/index.js`)));
const all = [];
results.forEach((r, i) => {
  if (r.status === 'fulfilled') all.push(...r.value.default);
  else console.error(`[scènes] stage '${STAGES[i]}' kon niet laden:`, r.reason);
});
export const SCENES = Object.fromEntries(all.map(s => [s.id, s]));
export const FAILED_STAGES = STAGES.filter((s, i) => results[i].status === 'rejected');
