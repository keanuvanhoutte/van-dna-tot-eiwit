/* Gedeeld door de DNA-bib en de verhaal-app. Werkt op platte tekst (vóór vaktermen [[woord|sleutel]] omgezet worden);
 * stukken tussen [[ ]] blijven ongemoeid. Stijl: klasse .cw met --c = de kleur. */
/* kleurwoorden ("blauw is de stam") krijgen een bolletje in die kleur: zo hoort de tekst zichtbaar bij de figuur */
const CW = { blauw: '#4f8ff7', blue: '#4f8ff7', lichtblauw: '#9cc0ff', 'light blue': '#9cc0ff', oranje: '#ff8a3d', orange: '#ff8a3d', roze: '#f06bc0', pink: '#f06bc0',
  geel: '#ffd84d', gele: '#ffd84d', yellow: '#ffd84d', grijs: '#8a93a8', grijze: '#8a93a8', grey: '#8a93a8', gray: '#8a93a8', groen: '#7fdc6a', groene: '#7fdc6a', green: '#7fdc6a',
  paars: '#9b7bff', paarse: '#9b7bff', purple: '#9b7bff', rood: '#ff6b6b', rode: '#ff6b6b', red: '#ff6b6b', blauwe: '#4f8ff7', turquoise: '#5fd3e6', turkoois: '#5fd3e6', cyaan: '#5fd3e6', cyan: '#5fd3e6' };
const CW_RE = new RegExp(`(^|[^\\p{L}\\[|])(${Object.keys(CW).sort((a, b) => b.length - a.length).join('|')})(?![\\p{L}\\]|])`, 'giu');
export const colourWords = txt => (txt ?? '').split(/(\[\[[^\]]*\]\])/).map((part, i) => i % 2 ? part : part.replace(CW_RE, (_, pre, w) => `${pre}<span class="cw" style="--c:${CW[w.toLowerCase()]}">${w}</span>`)).join('');
