/* Downloaden met voortgang: telt de binnenkomende bytes, zodat de laadbalk een percentage kan tonen.
 * PROGRESS.get(url) = { got, total } (total = 0 als de server de grootte niet meldt of het bestand onderweg gecomprimeerd is). */
export const PROGRESS = new Map();

export async function fetchText(url, { gz = false } = {}) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  // Content-Length is enkel bruikbaar als het bestand niet onderweg (door de server) gecomprimeerd wordt
  const enc = r.headers.get('content-encoding');
  const total = enc && enc !== 'identity' ? 0 : +(r.headers.get('content-length') ?? 0);
  const p = { got: 0, total };
  PROGRESS.set(url, p);
  if (!r.body || typeof TransformStream === 'undefined') { const txt = await r.text(); p.got = p.total || txt.length; return txt; }
  let body = r.body.pipeThrough(new TransformStream({ transform(chunk, ctl) { p.got += chunk.byteLength; ctl.enqueue(chunk); } }));
  if (gz) body = body.pipeThrough(new DecompressionStream('gzip'));
  const txt = await new Response(body).text();
  p.done = true;
  return txt;
}
