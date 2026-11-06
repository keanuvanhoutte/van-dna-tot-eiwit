/* POC 3 · Diepte — tabs en taal. Elke tab wordt pas opgebouwd wanneer je ze voor het eerst opent. */
import { langSwitch } from '../../shared/i18n.js';
import { $, t } from './common.js';

document.title = t('title');
$('ttl').textContent = t('title');
$('ttlSub').textContent = t('sub');
$('home').textContent = t('home');
$('langBox').append(langSwitch('lang'));
for (const el of document.querySelectorAll('[data-t]')) el.innerHTML = t(el.dataset.t);

const MODS = { a: () => import('./tab-a.js'), b: () => import('./tab-b.js'), c: () => import('./tab-c.js') };
const started = {};
const tabs = [...document.querySelectorAll('#tabs button')];
for (const b of tabs) { b.textContent = t('tab' + b.dataset.tab.toUpperCase()); b.onclick = () => show(b.dataset.tab); }

async function show(id) {
  for (const b of tabs) b.setAttribute('aria-selected', String(b.dataset.tab === id));
  for (const k of Object.keys(MODS)) $('tab-' + k).hidden = k !== id;
  const u = new URL(location.href); u.searchParams.set('tab', id); history.replaceState(null, '', u);
  if (!started[id]) started[id] = MODS[id]().then(m => m.init());
  const m = await started[id];
  m?.shown?.();
  for (const k of Object.keys(MODS)) if (k !== id) started[k]?.then(o => o?.hidden?.());
}

const q = new URLSearchParams(location.search).get('tab');
show(MODS[q] ? q : 'a');
