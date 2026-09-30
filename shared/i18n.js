/*
 * Taal / language
 * - keuze op de startpagina, bewaard in localStorage, overschrijfbaar met ?lang=en
 * - L({ nl, en })  → tekst in de gekozen taal (valt terug op NL)
 * - U(key)         → vaste interfacetekst
 */
const KEY = 'dna-app-lang';
function readLang() {
  const q = new URLSearchParams(location.search).get('lang');
  if (q === 'nl' || q === 'en') { try { localStorage.setItem(KEY, q); } catch {} return q; }
  try { const v = localStorage.getItem(KEY); if (v === 'nl' || v === 'en') return v; } catch {}
  return 'nl';                                   // standaard Nederlands; wisselen kan overal met NL/EN
}
export const lang = readLang();
document.documentElement.lang = lang;

export function setLang(l) {
  try { localStorage.setItem(KEY, l); } catch {}
  const u = new URL(location.href); u.searchParams.delete('lang');
  location.href = u.toString();
}

export const L = v => (v && typeof v === 'object' && !Array.isArray(v)) ? (v[lang] ?? v.nl) : v;

const UI = {
  labels: { nl: 'Labels', en: 'Labels' },
  pause: { nl: 'Pauze', en: 'Pause' },
  play: { nl: 'Afspelen', en: 'Play' },
  map: { nl: 'Inhoudskaart', en: 'Content map' },
  tip: { nl: 'Klik op een onderdeel om in te zoomen · Esc of broodkruimels om terug te gaan', en: 'Click a part to zoom in · Esc or breadcrumbs to go back' },
  scale: { nl: 'schaal', en: 'scale' },
  time: { nl: 'tijd', en: 'time' },
  process: { nl: 'proces', en: 'process' },
  structure: { nl: 'structuur', en: 'structure' },
  zoomIn: { nl: 'Inzoomen', en: 'Zoom in' },
  next: { nl: 'Volgende stap →', en: 'Next step →' },
  side: { nl: 'Zijsprongen', en: 'Side paths' },
  legend: { nl: 'Legende', en: 'Legend' },
  simplified: { nl: 'Wat is hier vereenvoudigd?', en: 'What is simplified here?' },
  conceptCard: { nl: 'conceptkaart', en: 'concept card' },
  noScene: { nl: 'Voor deze knoop is nog geen animatie gebouwd. In de volledige app krijgt ze een eigen scène; tot dan toont de app deze kaart, zodat de navigatie nooit doodloopt.',
             en: 'No animation has been built for this node yet. In the full app it will get its own scene; until then this card is shown so navigation never dead-ends.' },
  close: { nl: 'Sluiten (Esc)', en: 'Close (Esc)' },
  status_concept: { nl: 'concept', en: 'draft' },
  status_nagekeken: { nl: 'nagekeken', en: 'checked' },
  status_gevalideerd: { nl: 'gevalideerd', en: 'validated' },
};
export const U = k => L(UI[k]) ?? k;
export const statusText = s => U('status_' + s);

/* NL | EN-schakelaar */
export function langSwitch(cls = 'btn') {
  const w = document.createElement('div');
  w.style.display = 'inline-flex'; w.style.gap = '4px';
  for (const l of ['nl', 'en']) {
    const b = document.createElement('button');
    b.className = cls; b.textContent = l.toUpperCase();
    b.setAttribute('aria-pressed', String(l === lang));
    b.title = l === 'nl' ? 'Nederlands' : 'English';
    b.onclick = () => { if (l !== lang) setLang(l); };
    w.append(b);
  }
  return w;
}
