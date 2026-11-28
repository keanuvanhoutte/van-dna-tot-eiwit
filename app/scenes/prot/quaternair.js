import { C, L, T2, CLASSCOL } from '../../kit.js';
import { molScene, PX, ptxt, phead, plines } from './_a_mol.js';

/* Menselijk HbA, PDB 1BBB: ketens A en C = α (141 res.), B en D = β (146 res.). Gangbare naamgeving: A = α1, B = β1, C = α2, D = β2. */
const CH = { A: ['α1', '#c4b0ff'], B: ['β1', '#7fdc6a'], C: ['α2', '#7b61ff'], D: ['β2', '#2fa36b'] };
const cart = col => ({ cartoon: { color: col, thickness: .5 } });
const allChains = c => Object.entries(CH).forEach(([k, [, col]]) => c.style({ chain: k }, cart(col)));
const hemes = c => c.style({ resn: 'HEM' }, { stick: { colorscheme: 'orangeCarbon', radius: .22 } });
const chainLabels = c => Object.entries(CH).forEach(([k, [n, col]]) => c.label(n, c.center(c.sel({ chain: k, atom: 'CA' })), { size: 22, border: col }));
const ST = (dur, nl, en, tnl, ten, o) => ({ dur, title: { nl, en }, text: { nl: tnl, en: ten }, ...o });
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
/* punt iets naar buiten schuiven, weg van het midden van het tetrameer (labels liggen dan niet allemaal in het midden op elkaar) */
const outward = (c, p, k = .6) => { const m = c.center(c.sel({ hetflag: false, atom: 'CA' })); return { x: p.x + (p.x - m.x) * k, y: p.y + (p.y - m.y) * k, z: p.z + (p.z - m.z) * k }; };

export default molScene({
  id: 'quaternair', pdb: '1BBB',
  title: { nl: 'Quaternaire structuur', en: 'Quaternary structure' },
  scale: { nl: '≈ 6,5 nm', en: '≈ 6.5 nm' }, time: { nl: 'geen tijdsas (stilstaande structuur)', en: 'no time axis (static structure)' },
  org: { nl: 'mens (hemoglobine A, PDB 1BBB)', en: 'human (haemoglobin A, PDB 1BBB)' },
  legend: [[CH.A[1], 'α1 (A)'], [CH.B[1], 'β1 (B)'], [CH.C[1], 'α2 (C)'], [CH.D[1], 'β2 (D)'], ['#ff8a3d', { nl: 'heem', en: 'haem' }], [CLASSCOL['+'], { nl: 'positief', en: 'positive' }], [CLASSCOL['-'], { nl: 'negatief', en: 'negative' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">1BBB is menselijk hemoglobine A met CO gebonden, opgelost bij 1,7 Å (Silva, Rogers &amp; Arnone, 1992). De grensvlakken en contacten worden in de browser berekend uit de atoomcoördinaten (afstand ≤ 4 Å, polaire contacten N/O ≤ 3,5 Å).</p>',
    en: '<p style="font-size:13px;color:#93a0bb">1BBB is human haemoglobin A with CO bound, solved at 1.7 Å (Silva, Rogers &amp; Arnone, 1992). Interfaces and contacts are computed in the browser from the atomic coordinates (distance ≤ 4 Å, polar contacts N/O ≤ 3.5 Å).</p>' },
  simplified: {
    nl: 'Hemoglobine wisselt tussen een deoxy- (T) en een oxy-toestand (R); 1BBB toont met CO (niet O₂) een tweede liganden-gebonden vorm, de R2-toestand ("derde quaternaire structuur" naast T en R). Contactcriteria zijn eenvoudige afstandsgrenzen; waterstoffen en watermoleculen zijn niet getoond.',
    en: 'Haemoglobin switches between a deoxy (T) and an oxy (R) state; with CO (not O₂) bound, 1BBB shows a second liganded form, the R2 state (a "third quaternary structure" besides T and R). Contact criteria are simple distance cut-offs; hydrogens and water molecules are not shown.' },
  overlay: () => `
    <g class="q-hs1" data-node="primair" data-color="${C.chain}" data-label="${T2('Sequentie: Glu6 → Val', 'Sequence: Glu6 → Val')}">
      <rect x="1030" y="568" width="520" height="46" rx="12" fill="rgba(127,220,106,.10)" stroke="${C.chain}" stroke-dasharray="5 4"/>
      <text x="1290" y="599" font-size="22" text-anchor="middle" fill="${C.chain}" font-family="Inter" font-weight="600">${T2('Eén letter in de primaire structuur', 'One letter in the primary structure')}</text>
      <circle data-anchor="primair" cx="1290" cy="568" r="1" fill="none"/>
    </g>
    <g class="q-hs2" data-node="ptm" data-color="${C.prot}" data-nolabel data-label="${T2('Volgende: post-translationele modificaties', 'Next: post-translational modifications')}">
      <rect x="1030" y="662" width="520" height="48" rx="12" fill="rgba(155,123,255,.16)" stroke="${C.prot}"/>
      <text x="1290" y="694" font-size="22" text-anchor="middle" fill="${C.text}" font-family="Inter" font-weight="600">${T2('Verder: modificaties na de translatie', 'Next: modifications after translation')}</text>
      <circle data-anchor="ptm" cx="1290" cy="662" r="1" fill="none"/>
    </g>`,
  overlayUpdate(ov, t, s) {
    ov.querySelector('.q-hs1').setAttribute('opacity', s.step === 7 ? 1 : 0);
    ov.querySelector('.q-hs2').setAttribute('opacity', s.step === 7 ? 1 : 0);
  },
  onload(c) {
    const prot = c.sel({ hetflag: false });
    const by = {}; for (const a of prot) (by[a.chain] ??= []).push(a);
    c.data.nres = Object.fromEntries(Object.entries(by).map(([k, v]) => [k, new Set(v.map(a => a.resi)).size]));
    const iface = (x, y) => {
      const rx = new Set(), ry = new Set();
      for (const a of by[x]) for (const b of by[y]) if (Math.abs(a.x - b.x) < 4 && Math.abs(a.y - b.y) < 4 && dist(a, b) <= 4) { rx.add(a.resi); ry.add(b.resi); }
      return { [x]: [...rx], [y]: [...ry], n: rx.size + ry.size };
    };
    c.data.ab = iface('A', 'B'); c.data.ad = iface('A', 'D');
    /* polaire contacten en zoutbruggen tussen ketens */
    const pol = prot.filter(a => a.elem === 'N' || a.elem === 'O');
    const plus = a => (a.resn === 'LYS' && a.atom === 'NZ') || (a.resn === 'ARG' && ['NH1', 'NH2', 'NE'].includes(a.atom));
    const minus = a => (a.resn === 'ASP' && ['OD1', 'OD2'].includes(a.atom)) || (a.resn === 'GLU' && ['OE1', 'OE2'].includes(a.atom));
    let hb = 0; const sb = new Map();
    for (let i = 0; i < pol.length; i++) for (let j = i + 1; j < pol.length; j++) {
      const a = pol[i], b = pol[j]; if (a.chain === b.chain) continue;
      if (Math.abs(a.x - b.x) > 4 || Math.abs(a.y - b.y) > 4) continue;
      const d = dist(a, b);
      if (d <= 3.5) hb++;
      if (d <= 4 && ((plus(a) && minus(b)) || (plus(b) && minus(a)))) { const [p, n] = plus(a) ? [a, b] : [b, a]; sb.set(p.chain + p.resi + n.chain + n.resi, { p, n }); }
    }
    c.data.hb = hb; c.data.sb = [...sb.values()];
  },
  panelKey: (t, s, c) => (c.data.ab ? 1 : 0),
  steps: [
    ST(8500, 'Vier ketens samen', 'Four chains together', 'Hemoglobine heeft vier ketens: twee α en twee β. Elke keten heeft een heem dat zuurstof bindt.', 'Haemoglobin has four chains: two α and two β. Each chain has a haem that binds oxygen.', {
      show(c) { allChains(c); hemes(c); chainLabels(c); },
      zoom: {}, spin: .02,
      panel: c => phead(T2('Hemoglobine A (HbA)', 'Haemoglobin A (HbA)')) + plines(222, [
        [T2('• 4 ketens (subeenheden)', '• 4 chains (subunits)'), C.text], [`• 2 × α (${c.data.nres?.A ?? 141} res.) + 2 × β (${c.data.nres?.B ?? 146} res.)`, C.text],
        [T2('• 4 hemen → 4 O₂-plaatsen', '• 4 haems → 4 O₂ sites'), C.text]]),
    }),
    ST(8500, 'Twee soorten ketens', 'Two kinds of chains', 'α en β hebben een andere volgorde, maar zijn verwant en vouwen op dezelfde manier rond een heem.', 'α and β have a different order, but they are related and fold the same way around a haem.', {
      show(c) { c.style({ chain: ['A', 'C'] }, cart('#b39dff')); c.style({ chain: ['B', 'D'] }, cart('#7fdc6a')); hemes(c); chainLabels(c); },
      zoom: {}, spin: .02,
      panel: () => {
        const dot = (x, y, col, t) => `<circle cx="${x}" cy="${y}" r="26" fill="${col}"/>` + ptxt(x, y + 8, t, '#0a1224', 22, 700, 'middle');
        return phead(T2('Homo- of heteromeer?', 'Homo- or heteromer?')) +
          dot(PX + 40, 240, '#7fdc6a', 'A') + dot(PX + 94, 240, '#7fdc6a', 'A') + ptxt(PX + 140, 236, T2('homodimeer', 'homodimer'), C.text, 23, 700) + ptxt(PX + 140, 266, T2('identieke ketens', 'identical chains'), C.muted, 21) +
          dot(PX + 40, 340, '#7fdc6a', 'A') + dot(PX + 94, 340, '#b39dff', 'B') + ptxt(PX + 140, 336, T2('heterodimeer', 'heterodimer'), C.text, 23, 700) + ptxt(PX + 140, 366, T2('verschillende ketens', 'different chains'), C.muted, 21) +
          dot(PX + 40, 440, '#b39dff', 'α') + dot(PX + 94, 440, '#7fdc6a', 'β') + dot(PX + 40, 494, '#b39dff', 'α') + dot(PX + 94, 494, '#7fdc6a', 'β') +
          ptxt(PX + 140, 460, T2('hemoglobine: heterotetrameer', 'haemoglobin: heterotetramer'), C.text, 23, 700) + ptxt(PX + 140, 490, 'α₂β₂', C.muted, 22);
      },
    }),
    ST(8500, 'Twee gelijke paren', 'Two identical pairs', 'Hemoglobine bestaat uit twee identieke αβ-paren: de bouwsteen die zich herhaalt (protomeer).', 'Haemoglobin is made of two identical αβ pairs: the repeating building block (protomer).', {
      show(c) { c.style({ chain: ['A', 'B'] }, cart('#ffc247')); c.style({ chain: ['C', 'D'] }, cart('#4fb0ff')); hemes(c);
        c.label(T2('protomeer 1 (α1β1)', 'protomer 1 (α1β1)'), outward(c, c.center(c.sel({ chain: ['A', 'B'], atom: 'CA' })), 1.2), { size: 18, border: '#ffc247' });
        c.label(T2('protomeer 2 (α2β2)', 'protomer 2 (α2β2)'), outward(c, c.center(c.sel({ chain: ['C', 'D'], atom: 'CA' })), 1.2), { size: 18, border: '#4fb0ff' }); },
      zoom: {}, spin: .02,
      panel: () => phead(T2('Oligomeren benoemen', 'Naming oligomers')) + plines(222, [
        [T2('1 keten  → monomeer', '1 chain  → monomer'), C.text], [T2('2 ketens → dimeer', '2 chains → dimer'), C.text], [T2('3 ketens → trimeer', '3 chains → trimer'), C.text],
        [T2('4 ketens → tetrameer', '4 chains → tetramer'), C.text], [T2('5, 6 … → pentameer, hexameer …', '5, 6 … → pentamer, hexamer …'), C.text]]),
    }),
    ST(8500, 'Een stevig contactvlak', 'A firm contact surface', 'Waar α en β elkaar raken, ligt een contactvlak. Dit vlak (α1β1) is groot: veel contacten houden α en β samen.', 'Where α and β touch is a contact surface. This one (α1β1) is large: many contacts hold α and β together.', {
      show(c) {
        c.style({}, cart('#343d57')); c.style({ chain: 'A' }, cart(CH.A[1])); c.style({ chain: 'B' }, cart(CH.B[1]));
        if (c.data.ab) {
          c.style({ chain: 'A', resi: c.data.ab.A }, { sphere: { color: CH.A[1] } }); c.style({ chain: 'B', resi: c.data.ab.B }, { sphere: { color: CH.B[1] } });
          c.label(T2('contactvlak', 'contact surface'), c.center(c.sel({ chain: 'A', resi: c.data.ab.A, atom: 'CA' }).concat(c.sel({ chain: 'B', resi: c.data.ab.B, atom: 'CA' }))), { size: 18, border: '#ffc247', offset: -30 });
        }
        c.label('α1', c.center(c.sel({ chain: 'A', atom: 'CA' })), { size: 20, border: CH.A[1] }); c.label('β1', c.center(c.sel({ chain: 'B', atom: 'CA' })), { size: 20, border: CH.B[1] });
      },
      zoom: {}, spin: .02,   // hele tetrameer in beeld (zoals de andere stappen): ingezoomd op α1β1 werd het tetrameer rechts afgekapt door de rand van het 3D-venster (vóór de infokaart)
      panel: c => phead(T2('Grensvlak α1β1', 'Interface α1β1')) + plines(222, [
        [T2(`${c.data.ab?.A.length ?? '…'} residuen van α1 + ${c.data.ab?.B.length ?? '…'} van β1`, `${c.data.ab?.A.length ?? '…'} residues of α1 + ${c.data.ab?.B.length ?? '…'} of β1`), '#ffc247', 23, 700],
        [T2('(binnen 4 Å van de andere keten)', '(within 4 Å of the other chain)'), C.muted, 21]]),
    }),
    ST(8500, 'Een scharnier', 'A hinge', 'Het kleinere vlak (α1β2) is een scharnier: bindt zuurstof, dan schuiven de twee paren tegen elkaar.', 'The smaller surface (α1β2) is a hinge: when oxygen binds, the two pairs slide against each other.', {
      show(c) {
        c.style({}, cart('#343d57')); c.style({ chain: 'A' }, cart(CH.A[1])); c.style({ chain: 'D' }, cart(CH.D[1]));
        if (c.data.ad) {
          c.style({ chain: 'A', resi: c.data.ad.A }, { sphere: { color: CH.A[1] } }); c.style({ chain: 'D', resi: c.data.ad.D }, { sphere: { color: CH.D[1] } });
          c.label(T2('scharnier', 'hinge'), c.center(c.sel({ chain: 'A', resi: c.data.ad.A, atom: 'CA' }).concat(c.sel({ chain: 'D', resi: c.data.ad.D, atom: 'CA' }))), { size: 18, border: '#ffc247', offset: -30 });
        }
        c.label('α1', c.center(c.sel({ chain: 'A', atom: 'CA' })), { size: 20, border: CH.A[1] }); c.label('β2', c.center(c.sel({ chain: 'D', atom: 'CA' })), { size: 20, border: CH.D[1] });
      },
      zoom: { chain: ['A', 'D'] }, spin: .02,
      panel: c => phead(T2('Grensvlak α1β2', 'Interface α1β2')) + plines(222, [
        [T2(`${c.data.ad?.A.length ?? '…'} residuen van α1 + ${c.data.ad?.D.length ?? '…'} van β2`, `${c.data.ad?.A.length ?? '…'} residues of α1 + ${c.data.ad?.D.length ?? '…'} of β2`), '#ffc247', 23, 700],
        [T2(`(α1β1 had er ${c.data.ab ? c.data.ab.n : '…'})`, `(α1β1 had ${c.data.ab ? c.data.ab.n : '…'})`), C.muted, 21], '',
        T2('O₂-binding: dimeren schuiven', 'O₂ binding: dimers slide'), T2('→ coöperativiteit', '→ cooperativity')]),
    }),
    ST(8500, 'Wat houdt de ketens samen?', 'What holds the chains together?', 'Dezelfde krachten als binnen één keten: waterschuwe contacten, zoutbruggen en waterstofbruggen.', 'The same forces as inside one chain: water-avoiding contacts, salt bridges and hydrogen bonds.', {
      show(c) {
        Object.entries(CH).forEach(([k, [, col]]) => c.style({ chain: k }, { cartoon: { color: col, thickness: .5 } }));
        const placed = [];
        for (const { p, n } of c.data.sb ?? []) {
          c.style({ chain: p.chain, resi: p.resi, not: { atom: ['N', 'C', 'O'] } }, { stick: { radius: .42, colorscheme: 'whiteCarbon' } });
          c.style({ chain: n.chain, resi: n.resi, not: { atom: ['N', 'C', 'O'] } }, { stick: { radius: .42, colorscheme: 'whiteCarbon' } });
          c.cyl(p, n, '#ffc247', .28, true);   // zoutbrug tussen twee ketens
          const nm = a => `${CH[a.chain][0]} ${a.resn[0]}${a.resn.slice(1).toLowerCase()}${a.resi}`;
          const m = { x: (p.x + n.x) / 2, y: (p.y + n.y) / 2, z: (p.z + n.z) / 2 };
          const same = q => q.p.resn + q.p.resi === p.resn + p.resi && q.q.resn + q.q.resi === n.resn + n.resi;
          const g = placed.find(q => same(q) && Math.hypot(q.x - m.x, q.y - m.y, q.z - m.z) < 10);   // dezelfde brug in de twee αβ-paren, vlak bij elkaar: één label
          if (g) { g.n++; g.text = `${g.text} (+ ${CH[p.chain][0]}–${CH[n.chain][0]})`; }
          else placed.push({ ...m, p, q: n, n: 1, text: `${nm(p)} – ${nm(n)}` });
          c.addStyle({ chain: p.chain, resi: p.resi, atom: p.atom }, { sphere: { color: CLASSCOL['+'], radius: .8 } });
          c.addStyle({ chain: n.chain, resi: n.resi, atom: n.atom }, { sphere: { color: CLASSCOL['-'], radius: .8 } });
        }
        placed.forEach(g => c.label(g.text, g, { size: 15, border: '#ffc247', offset: 26 }));
      },
      zoom: {}, spin: .02,
      panel: c => phead(T2('Contacten tussen de ketens', 'Contacts between the chains')) + plines(222, [
        [T2(`${c.data.sb?.length ?? '…'} zoutbruggen tussen ketens`, `${c.data.sb?.length ?? '…'} salt bridges between chains`), '#ffc247', 23, 700],
        [T2(`${c.data.hb ?? '…'} polaire N/O-contacten ≤ 3,5 Å`, `${c.data.hb ?? '…'} polar N/O contacts ≤ 3.5 Å`), '#ffc247', 23, 700],
        T2('+ vele hydrofobe contacten', '+ many hydrophobic contacts'), '',
        [T2('in Hb: alles niet-covalent', 'in Hb: all non-covalent'), C.muted, 22]]),
    }),
    ST(8500, 'Vier hemen werken samen', 'Four haems work together', 'Elke keten bindt één zuurstofmolecuul. Het eerste bindt moeilijk, de volgende makkelijker. (Dit model bindt CO.)', 'Each chain binds one oxygen molecule. The first binds with difficulty, the next ones more easily. (This model binds CO.)', {
      show(c) {
        Object.entries(CH).forEach(([k, [, col]]) => c.style({ chain: k }, { cartoon: { color: col, thickness: .5 } }));
        c.style({ resn: 'HEM' }, { stick: { colorscheme: 'orangeCarbon', radius: .4 } });
        c.style({ resn: 'HEM', atom: 'FE' }, { sphere: { color: '#ff8a3d', radius: 1.3 } });
        c.style({ resn: 'CMO' }, { sphere: { radius: .6 } });
        for (const k of Object.keys(CH)) { const fe = c.sel({ chain: k, resn: 'HEM', atom: 'FE' }); if (fe.length) c.label(`${L({ nl: 'heem', en: 'haem' })} (${CH[k][0]})`, fe[0], { size: 16, border: '#ff8a3d', offset: 22 }); }
      },
      zoom: {}, spin: .02,
      panel: () => phead(T2('Structuur → functie', 'Structure → function')) + plines(222, [
        [T2('O₂-transport in rode bloedcellen', 'O₂ transport in red blood cells'), C.text, 23, 700], '',
        T2('• longen: veel O₂ → bindt alle 4', '• lungs: lots of O₂ → binds all 4'), T2('• weefsels: minder O₂ → laat los', '• tissues: less O₂ → releases it')]),
    }),
    ST(9000, 'Eén fout: sikkelcelhemoglobine', 'One change: sickle-cell haemoglobin', 'Op plaats 6 van β staat Val i.p.v. Glu. Zonder zuurstof plakt die waterschuwe plek hemoglobines aaneen tot vezels.', 'β has Val instead of Glu at position 6. Without oxygen, that water-avoiding spot sticks haemoglobins together into fibres.', {
      show(c) {
        allChains(c); hemes(c);
        c.style({ chain: ['B', 'D'], resi: 6 }, { sphere: { color: CLASSCOL['-'] } });
        for (const k of ['B', 'D']) { const a = c.sel({ chain: k, resi: 6, atom: 'CD' }); if (a.length) c.label(`${CH[k][0]} Glu6`, a[0], { size: 17, border: CLASSCOL['-'] }); }
      },
      zoom: {}, spin: .02,
      panel: () => phead(T2('Primair → quaternair', 'Primary → quaternary')) + plines(222, [
        ['GAG → GTG  ·  Glu6 → Val (β)', '#ffc247', 23, 700],
        T2('Glu (−, polair) → Val (hydrofoob)', 'Glu (−, polar) → Val (hydrophobic)')]) + fibre(),
    }),
  ],
});

/* sikkelcel: hemoglobines (zonder O₂) haken met hun Val6-plek (rood) in de volgende → een lange vezel */
function fibre() {
  const y = 372, out = [];
  for (let i = 0; i < 5; i++) {
    const x = PX + 46 + i * 98;
    out.push(`<ellipse cx="${x}" cy="${y}" rx="44" ry="34" fill="#2b3550" stroke="#7fdc6a" stroke-width="3"/>`,
      `<path d="M${x - 44},${y - 9} a10,10 0 0,1 0,18" fill="#0d1426"/>`,          // het zakje waar de Val van de buur in past
      i < 4 ? `<circle cx="${x + 46}" cy="${y}" r="9" fill="${CLASSCOL['-']}"/>` : '');
  }
  return out.join('') + ptxt(PX, y + 70, T2('zonder O₂ haakt de Val-plek (rood)', 'without O₂ the Val spot (red)'), C.text, 23, 600) +
    ptxt(PX, y + 102, T2('in de buur → een lange vezel', 'hooks into the next → a long fibre'), C.text, 23, 600);
}
