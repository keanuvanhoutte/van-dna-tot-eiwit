import { C, L, T2, CLASSCOL } from '../../kit.js';
import { molScene, PX, ptxt, phead, plines } from './_a_mol.js';

/* β-globine = keten B van PDB 1BBB (menselijk HbA). Helixgrenzen uit de struct_conf-records van 1BBB (keten B). */
const HEL = [['A', 4, 18], ['B', 19, 34], ['C', 35, 41], ['D', 50, 56], ['E', 57, 76], ['F', 85, 93], ['G', 99, 117], ['H', 123, 143]];
const HCOL = ['#ff6b6b', '#ff8a3d', '#ffc247', '#c9e04a', '#7fdc6a', '#2cc6a8', '#4fb0ff', '#9b7bff'];
const HYD = ['ALA', 'VAL', 'LEU', 'ILE', 'MET', 'PHE', 'TRP', 'PRO', 'GLY'];
const POL = ['SER', 'THR', 'CYS', 'ASN', 'GLN', 'TYR'];
const B = { chain: 'B' };
const rng = (a, b) => `${a}-${b}`;
const cartoon = (color, extra = {}) => ({ cartoon: { color, thickness: .5, ...extra } });

const ST = (dur, nl, en, tnl, ten, o) => ({ dur, title: { nl, en }, text: { nl: tnl, en: ten }, ...o });
const hemeStyle = { stick: { colorscheme: 'orangeCarbon', radius: .22 } };

export default molScene({
  id: 'tertiair', pdb: '1BBB',
  title: { nl: 'Tertiaire structuur & domeinen', en: 'Tertiary structure & domains' },
  scale: '≈ 5 nm', time: { nl: 'vouwing: µs–s (hier stilstaand)', en: 'folding: µs–s (static here)' },
  org: { nl: 'mens (β-globine uit hemoglobine, PDB 1BBB)', en: 'human (β-globin from haemoglobin, PDB 1BBB)' },
  legend: [[CLASSCOL.h, { nl: 'hydrofoob', en: 'hydrophobic' }], [CLASSCOL.p, { nl: 'polair', en: 'polar' }], [CLASSCOL['+'], { nl: 'positief (Lys, Arg, His)', en: 'positive (Lys, Arg, His)' }], [CLASSCOL['-'], { nl: 'negatief (Asp, Glu)', en: 'negative (Asp, Glu)' }], ['#ff8a3d', { nl: 'heem (Fe)', en: 'haem (Fe)' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">De helixgrenzen A–H komen uit de 1BBB-records van keten B. De zoutbruggen worden in de browser berekend (N van Lys/Arg binnen 4 Å van O van Asp/Glu). Niet-eiwitmoleculen en metaalionen (heem, Zn²⁺ in een zinkvinger) helpen structuur én functie. Hemoglobine hoort bij de globinevouw, dezelfde vouw als myoglobine (de eerste opgeloste eiwitstructuur, 1958).</p>',
    en: '<p style="font-size:13px;color:#93a0bb">The helix boundaries A–H come from the 1BBB records of chain B. Salt bridges are computed in the browser (N of Lys/Arg within 4 Å of O of Asp/Glu). Non-protein molecules and metal ions (haem, Zn²⁺ in a zinc finger) support structure and function. Haemoglobin has the globin fold, the same fold as myoglobin (the first protein structure solved, 1958).</p>' },
  simplified: {
    nl: 'Getoond is één keten (β) uit het tetrameer; in de cel vouwt β-globine niet los van de α-keten en het heem. 1BBB bevat CO in plaats van O₂ (zelfde bindingsplaats). Waterstoffen en watermoleculen zijn verborgen; de hydrofobe/polaire indeling volgt de cursus (Gly en Pro bij hydrofoob).',
    en: 'One chain (β) of the tetramer is shown; in the cell β-globin does not fold separately from the α chain and the haem. 1BBB contains CO instead of O₂ (same binding site). Hydrogens and water molecules are hidden; the hydrophobic/polar grouping follows the course (Gly and Pro counted as hydrophobic).' },
  overlay: () => `
    <g class="a-hs" data-node="quaternair" data-color="${C.prot}" data-label="${T2('Volgende: quaternaire structuur', 'Next: quaternary structure')}">
      <rect x="1030" y="640" width="520" height="56" rx="12" fill="rgba(155,123,255,.16)" stroke="${C.prot}"/>
      <text x="1290" y="677" font-size="23" text-anchor="middle" fill="${C.text}" font-family="Inter" font-weight="600">${T2('4 ketens samen → quaternair', '4 chains together → quaternary')}</text>
      <circle data-anchor="quaternair" cx="1290" cy="640" r="1" fill="none"/>
    </g>
    <g class="a-hs2" data-node="disulfide" data-color="#ffc247" data-label="${T2('Disulfidebruggen', 'Disulfide bonds')}">
      <rect x="1030" y="560" width="520" height="50" rx="12" fill="rgba(255,194,71,.10)" stroke="#ffc247" stroke-dasharray="5 4"/>
      <text x="1290" y="593" font-size="22" text-anchor="middle" fill="#ffc247" font-family="Inter" font-weight="600">${T2('S–S-bruggen (in andere eiwitten)', 'S–S bridges (in other proteins)')}</text>
      <circle data-anchor="disulfide" cx="1290" cy="560" r="1" fill="none"/>
    </g>`,
  overlayUpdate(ov, t, s) {
    ov.querySelector('.a-hs').setAttribute('opacity', s.step === 9 ? 1 : 0);
    ov.querySelector('.a-hs2').setAttribute('opacity', s.step === 6 ? 1 : 0);
  },
  onload(ctx) {
    const at = ctx.sel(B);
    const pos = at.filter(a => (a.resn === 'LYS' && a.atom === 'NZ') || (a.resn === 'ARG' && ['NH1', 'NH2', 'NE'].includes(a.atom)));
    const neg = at.filter(a => (a.resn === 'ASP' && ['OD1', 'OD2'].includes(a.atom)) || (a.resn === 'GLU' && ['OE1', 'OE2'].includes(a.atom)));
    const sb = new Map();
    for (const p of pos) for (const n of neg) {
      const d = Math.hypot(p.x - n.x, p.y - n.y, p.z - n.z);
      const k = p.resi + '-' + n.resi;
      if (d < 4 && (!sb.has(k) || sb.get(k).d > d)) sb.set(k, { p, n, d });
    }
    ctx.data.sb = [...sb.values()];
    /* begraven vs blootgesteld: aantal Cα-atomen binnen 10 Å van het zijketenzwaartepunt */
    const res = new Map();
    for (const a of at) if (!a.hetflag) { if (!res.has(a.resi)) res.set(a.resi, { resi: a.resi, resn: a.resn, sc: [], ca: null }); const r = res.get(a.resi); if (a.atom === 'CA') r.ca = a; else if (!['N', 'C', 'O'].includes(a.atom)) r.sc.push(a); }
    const list = [...res.values()].filter(r => r.ca);
    const cas = list.map(r => r.ca);
    for (const r of list) {
      const pts = r.sc.length ? r.sc : [r.ca], n = pts.length;
      const c = pts.reduce((s, a) => [s[0] + a.x / n, s[1] + a.y / n, s[2] + a.z / n], [0, 0, 0]);
      r.nb = cas.filter(a => Math.hypot(a.x - c[0], a.y - c[1], a.z - c[2]) < 10).length;
    }
    list.sort((a, b) => b.nb - a.nb);
    const q = Math.round(list.length * .25);
    ctx.data.core = list.slice(0, q); ctx.data.surf = list.slice(-q);
    const frac = l => Math.round(100 * l.filter(r => HYD.includes(r.resn)).length / l.length);
    ctx.data.fCore = frac(ctx.data.core); ctx.data.fSurf = frac(ctx.data.surf);
  },
  steps: [
    ST(8000, 'Eén keten, één vouwing', 'One chain, one fold', 'De keten van 146 residuen vouwt tot een compact bolletje: de tertiaire structuur. Kleur: van N-terminus (blauw) naar C-terminus (rood).', 'The chain of 146 residues folds into a compact globule: the tertiary structure. Colour: from N-terminus (blue) to C-terminus (red).', {
      show(c) { c.style(B, cartoon('spectrum')); c.style({ chain: 'B', resn: 'HEM' }, hemeStyle); },
      zoom: B, spin: .02,
      panel: () => phead(T2('β-globine (hemoglobine)', 'β-globin (haemoglobin)')) + plines(222, [
        [T2('• één keten: 146 residuen', '• one chain: 146 residues'), C.text], [T2('• globulair (bolvormig, oplosbaar)', '• globular (spherical, soluble)'), C.text],
        [T2('• bindt één heemgroep', '• binds one haem group'), C.text], '',
        [T2('tertiair = 3D-vorm van één keten', 'tertiary = 3D shape of one chain'), C.muted, 22]]),
    }),
    ST(8500, 'Acht helices: A tot H', 'Eight helices: A to H', 'De globinevouw bestaat uit acht α-helices, A tot H genoemd, verbonden door korte lussen (bv. de CD-hoek).', 'The globin fold consists of eight α-helices, named A to H, connected by short loops (e.g. the CD corner).', {
      show(c) {
        c.style(B, cartoon('#56607a'));
        HEL.forEach(([n, a, b], i) => { c.style({ chain: 'B', resi: rng(a, b) }, cartoon(HCOL[i])); c.label(n, c.center(c.sel({ chain: 'B', resi: rng(a, b), atom: 'CA' })), { size: 20, border: HCOL[i] }); });
        c.style({ chain: 'B', resn: 'HEM' }, hemeStyle);
      },
      zoom: B, spin: .02,
      panel: () => phead(T2('Helices A–H (residuen)', 'Helices A–H (residues)')) + HEL.map(([n, a, b], i) =>
        `<rect x="${PX}" y="${194 + i * 46}" width="32" height="32" rx="6" fill="${HCOL[i]}"/>` + ptxt(PX + 16, 218 + i * 46, n, '#0a1224', 21, 700, 'middle') +
        ptxt(PX + 50, 219 + i * 46, `${a}–${b}`, C.text, 23)).join('') +
        ptxt(PX + 230, 222, T2('geen β-strengen:', 'no β-strands:'), C.muted, 22) + ptxt(PX + 230, 254, T2('een all-α-eiwit', 'an all-α protein'), C.muted, 22),
    }),
    ST(8500, 'Hydrofobe kern', 'Hydrophobic core', 'Getoond: de meest begraven zijketens, bijna allemaal hydrofoob (groen). Samen gebundeld maken ze geordend water vrij (entropie ↑): dit hydrofoob effect drijft de vouwing.', 'Shown: the most buried side chains, nearly all hydrophobic (green). Clustered together they free ordered water (entropy ↑): this hydrophobic effect drives folding.', {
      show(c) {
        c.style(B, cartoon('#465171'));
        const core = c.data.core ?? [];
        c.style({ chain: 'B', resi: core.filter(r => HYD.includes(r.resn)).map(r => r.resi), not: { atom: ['N', 'C', 'O', 'CA'] } }, { sphere: { color: CLASSCOL.h, radius: 1.5 } });
        c.style({ chain: 'B', resi: core.filter(r => !HYD.includes(r.resn)).map(r => r.resi), not: { atom: ['N', 'C', 'O', 'CA'] } }, { sphere: { color: CLASSCOL.p, radius: 1.5 } });
        c.style({ chain: 'B', resn: 'HEM' }, hemeStyle);
      },
      zoom: B, spin: .025,
      panelKey: (t, s, c) => c.data.fCore ?? '',
      panel: c => phead(T2('Hydrofoob effect', 'Hydrophobic effect')) + plines(222, [
        [T2(`Meest begraven 25 %: ${c.data.fCore ?? '…'} % hydrofoob`, `Most buried 25 %: ${c.data.fCore ?? '…'} % hydrophobic`), CLASSCOL.h, 22, 700],
        [T2(`Meest blootgestelde 25 %: ${c.data.fSurf ?? '…'} % hydrofoob`, `Most exposed 25 %: ${c.data.fSurf ?? '…'} % hydrophobic`), CLASSCOL.p, 22, 700],
        [T2('(buren binnen 10 Å, uit 1BBB)', '(neighbours within 10 Å, from 1BBB)'), C.muted, 21]]),
    }),
    ST(8500, 'Polair oppervlak', 'Polar surface', 'Alle atomen als bolletjes: het oppervlak is vooral polair (cyaan) en geladen (blauw/rood), zodat het eiwit oplost. Groene plekken zijn vaak contactvlakken met andere ketens.', 'All atoms as spheres: the surface is mostly polar (cyan) and charged (blue/red), so the protein dissolves. Green patches are often contact areas with other chains.', {
      show(c) {
        c.style({ chain: 'B', resn: HYD }, { sphere: { color: CLASSCOL.h } });
        c.style({ chain: 'B', resn: POL }, { sphere: { color: CLASSCOL.p } });
        c.style({ chain: 'B', resn: ['LYS', 'ARG', 'HIS'] }, { sphere: { color: CLASSCOL['+'] } });
        c.style({ chain: 'B', resn: ['ASP', 'GLU'] }, { sphere: { color: CLASSCOL['-'] } });
        c.style({ chain: 'B', resn: 'HEM' }, { sphere: { color: '#ff8a3d' } });
      },
      zoom: B, spin: .03,
      panel: () => phead(T2('Binnen apolair, buiten polair', 'Non-polar inside, polar outside')) + plines(222, [
        [T2('● polair: Ser, Thr, Cys, Asn, Gln, Tyr', '● polar: Ser, Thr, Cys, Asn, Gln, Tyr'), CLASSCOL.p, 22], [T2('● positief: Lys, Arg (His)', '● positive: Lys, Arg (His)'), CLASSCOL['+'], 22],
        [T2('● negatief: Asp, Glu', '● negative: Asp, Glu'), CLASSCOL['-'], 22], [T2('● hydrofoob', '● hydrophobic'), CLASSCOL.h, 22]]),
    }),
    ST(9000, 'De heempocket: een metaalion', 'The haem pocket: a metal ion', 'Het heem ligt in een apolaire pocket tussen helix E en F. Fe²⁺ is gebonden aan His92 (F8, proximaal); aan de andere kant bindt O₂ (hier CO), naast His63 (E7, distaal).', 'The haem sits in a non-polar pocket between helices E and F. Fe²⁺ is bound to His92 (F8, proximal); on the other side O₂ binds (here CO), next to His63 (E7, distal).', {
      show(c) {
        c.style(B, { cartoon: { style: 'trace', color: '#465171', thickness: .25 } });
        c.style({ chain: 'B', resi: rng(57, 76) }, { cartoon: { style: 'trace', color: HCOL[4], thickness: .35 } }); c.style({ chain: 'B', resi: rng(85, 93) }, { cartoon: { style: 'trace', color: HCOL[5], thickness: .35 } });
        c.style({ chain: 'B', resn: 'HEM' }, { stick: { colorscheme: 'orangeCarbon', radius: .25 } });
        c.style({ chain: 'B', resn: 'HEM', atom: 'FE' }, { sphere: { color: '#ff8a3d', radius: .9 } });
        c.style({ chain: 'B', resn: 'CMO' }, { stick: { radius: .25 }, sphere: { radius: .45 } });
        c.style({ chain: 'B', resi: [63, 92], not: { atom: ['N', 'C', 'O'] } }, { stick: { colorscheme: 'greenCarbon', radius: .25 } });
        const lab = (s, t, col) => { const a = c.sel(s); if (a.length) c.label(t, c.center(a), { border: col, size: 16 }); };
        lab({ chain: 'B', resi: 92, atom: 'NE2' }, 'His92 (F8)', '#2cc6a8'); lab({ chain: 'B', resi: 63, atom: 'NE2' }, 'His63 (E7)', '#7fdc6a');
        lab({ chain: 'B', resn: 'HEM', atom: 'FE' }, 'Fe²⁺', '#ff8a3d'); lab({ chain: 'B', resn: 'CMO' }, 'CO', '#ffffff');
      },
      zoom: { chain: 'B', within: { distance: 9, sel: { chain: 'B', resn: 'HEM' } } }, spin: .018,
      panel: () => phead(T2('Liganden stabiliseren de vouw', 'Ligands stabilise the fold')) + plines(222, [
        [T2('Heem = protoporfyrine IX + Fe²⁺', 'Haem = protoporphyrin IX + Fe²⁺'), C.text, 23, 700], '',
        T2('• His92 (F8) bindt het Fe²⁺', '• His92 (F8) binds the Fe²⁺'), T2('• O₂ bindt aan de andere kant', '• O₂ binds on the other side'), T2('• His63 (E7) stabiliseert O₂', '• His63 (E7) stabilises O₂')]),
    }),
    ST(8500, 'Zoutbruggen en H-bruggen', 'Salt bridges and H-bonds', 'Tegengesteld geladen zijketens (Lys/Arg ↔ Asp/Glu) vormen zoutbruggen; polaire groepen vormen H-bruggen tussen helices. In de kern moeten alle backbone-H-bruggen voldaan zijn.', 'Oppositely charged side chains (Lys/Arg ↔ Asp/Glu) form salt bridges; polar groups form H-bonds between helices. In the core all backbone H-bonds must be satisfied.', {
      show(c) {
        c.style(B, cartoon('#465171'));
        c.style({ chain: 'B', resn: 'HEM' }, hemeStyle);
        (c.data.sb ?? []).forEach(({ p, n }, i) => {
          c.style({ chain: 'B', resi: [p.resi, n.resi], not: { atom: ['N', 'C', 'O'] } }, { stick: { radius: .35, colorscheme: 'whiteCarbon' } });
          c.addStyle({ chain: 'B', resi: p.resi, atom: p.atom }, { sphere: { color: CLASSCOL['+'], radius: .8 } });
          c.addStyle({ chain: 'B', resi: n.resi, atom: n.atom }, { sphere: { color: CLASSCOL['-'], radius: .8 } });
          if (i < 3) c.label(`${p.resn[0]}${p.resn.slice(1).toLowerCase()}${p.resi}–${n.resn[0]}${n.resn.slice(1).toLowerCase()}${n.resi}`, { x: (p.x + n.x) / 2, y: (p.y + n.y) / 2, z: (p.z + n.z) / 2 }, { size: 16, border: '#ffc247' });
        });
      },
      zoom: B, spin: .02,
      panel: c => phead(T2('Elektrostatische interacties', 'Electrostatic interactions')) + plines(222, [
        [T2(`${c.data.sb?.length ?? '…'} zoutbruggen in keten β`, `${c.data.sb?.length ?? '…'} salt bridges in chain β`), '#ffc247', 23, 700],
        [T2('(N⁺ en O⁻ binnen 4 Å)', '(N⁺ and O⁻ within 4 Å)'), C.muted, 21], '',
        T2('zoutbrug = ionpaar (+ en −)', 'salt bridge = ion pair (+ and −)'), T2('H-brug = gedeeld H tussen N/O', 'H-bond = shared H between N/O')]),
      panelKey: (t, s, c) => c.data.sb?.length ?? 0,
    }),
    ST(8000, 'Disulfidebruggen? Niet in hemoglobine', 'Disulfide bridges? Not in haemoglobin', 'Twee cysteïnes kunnen een covalente S–S-brug vormen. β-globine heeft Cys93 en Cys112, maar die vormen géén brug: het cytosol is reducerend.', 'Two cysteines can form a covalent S–S bridge. β-globin has Cys93 and Cys112, but they form no bridge: the cytosol is reducing.', {
      show(c) {
        c.style(B, cartoon('#465171'));
        c.style({ chain: 'B', resn: 'CYS' }, { stick: { radius: .3, colorscheme: 'yellowCarbon' }, sphere: { radius: .5, colorscheme: 'yellowCarbon' } });
        for (const r of [93, 112]) { const a = c.sel({ chain: 'B', resi: r, atom: 'SG' }); if (a.length) c.label(`Cys${r} – SH`, a[0], { border: '#ffc247', size: 16 }); }
      },
      zoom: { chain: 'B', within: { distance: 9, sel: { chain: 'B', resn: 'CYS' } } }, spin: .02,
      panel: () => phead(T2('Covalent: de disulfidebrug', 'Covalent: the disulfide bridge')) + plines(222, [
        ['Cys–SH + HS–Cys → Cys–S–S–Cys', '#ffc247', 22, 700], '',
        T2('• vooral in eiwitten buiten de cel', '• mainly in proteins outside the cell'), T2('• gevormd in het ER (bv. antistoffen)', '• formed in the ER (e.g. antibodies)'), T2('• verbindt ook verre residuen', '• can join residues far apart')]),
    }),
    ST(9000, 'Supersecundaire structuren', 'Supersecondary structures', 'Tussen secundair en tertiair: vaste combinaties van enkele elementen, zoals helix-turn-helix, β-haarspeld, Greek key of de Rossmann-vouw.', 'Between secondary and tertiary: recurring combinations of a few elements, such as helix-turn-helix, β-hairpin, Greek key or the Rossmann fold.', {
      show(c) { c.style(B, cartoon('#56607a')); HEL.forEach(([n, a, b], i) => c.style({ chain: 'B', resi: rng(a, b) }, cartoon(HCOL[i]))); },
      zoom: B, spin: .02,
      panel: () => phead(T2('Motieven (topologie)', 'Motifs (topology)')) + motifs(),
    }),
    ST(9000, 'Domeinen en vouwklassen', 'Domains and fold classes', 'Een domein is een compact deel dat op zichzelf kan vouwen en in verschillende eiwitten terugkomt. β-globine is één domein met een all-α-vouw. Naar vorm: globulair, membraan- of fibreus eiwit.', 'A domain is a compact part that can fold on its own and recurs in different proteins. β-globin is one domain with an all-α fold. By shape: globular, membrane or fibrous protein.', {
      show(c) { c.style(B, cartoon('spectrum')); c.style({ chain: 'B', resn: 'HEM' }, hemeStyle); },
      zoom: B, spin: .03,
      panel: () => phead(T2('Hoe deel je vouwingen in?', 'How to classify folds?')) + classes(),
    }),
    ST(7500, 'Eén keten is nog niet het hele eiwit', 'One chain is not yet the whole protein', 'Hemoglobine bestaat uit vier zulke ketens. Hoe ze samen passen, is de quaternaire structuur.', 'Haemoglobin consists of four such chains. How they fit together is the quaternary structure.', {
      show(c) {
        c.style({}, cartoon('#343d57'));
        c.style(B, cartoon('spectrum'));
        c.style({ resn: 'HEM' }, { stick: { colorscheme: 'orangeCarbon', radius: .2 } });
      },
      zoom: {}, spin: .03,
      panel: () => phead(T2('Op naar het tetrameer', 'On to the tetramer')) + plines(222, [
        T2('Hydrofobe plekken op β-globine', 'Hydrophobic patches on β-globin'), T2('passen tegen de α-ketens.', 'fit against the α chains.'), '',
        [T2('Samen: α₂β₂', 'Together: α₂β₂'), C.text, 27, 700]]),
    }),
  ],
});

/* schematische topologieën (2 kolommen × 4); elk icoon past in ± 150 × 92 px */
function motifs() {
  const hx = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(w, h) / 2}" fill="#9b7bff"/>`;
  const st = (x, y1, y2, col = '#ffc247') => { const d = Math.sign(y2 - y1), yb = y2 - d * 16; return `<path d="M${x - 6},${y1} L${x - 6},${yb} L${x - 13},${yb} L${x},${y2} L${x + 13},${yb} L${x + 6},${yb} L${x + 6},${y1}Z" fill="${col}"/>`; };
  const lp = d => `<path d="${d}" fill="none" stroke="#93a0bb" stroke-width="3"/>`;
  const T = 8, Bm = 88;
  const items = [
    ['helix-turn-helix', (x, y) => hx(x, y + 12, 84, 22) + lp(`M${x + 84},${y + 23} q20,0 20,22`) + hx(x + 93, y + 42, 22, 50), 'α'],
    [T2('vierhelixbundel', 'four-helix bundle'), (x, y) => [0, 1, 2, 3].map(i => hx(x + 8 + i * 30, y + T, 22, 80)).join(''), 'α'],
    [T2('β-haarspeld', 'β-hairpin'), (x, y) => st(x + 30, y + Bm, y + T + 6) + lp(`M${x + 30},${y + T + 4} q17,-16 34,0`) + st(x + 64, y + T + 6, y + Bm), 'β'],
    ['Greek key', (x, y) => st(x + 45, y + Bm, y + T + 10) + st(x + 75, y + T + 10, y + Bm) + st(x + 105, y + Bm, y + T + 10) + st(x + 15, y + T + 10, y + Bm) +
      lp(`M${x + 45},${y + T + 8} q15,-14 30,0`) + lp(`M${x + 75},${y + Bm + 2} q15,14 30,0`) + lp(`M${x + 105},${y + T + 8} C${x + 105},${y - 14} ${x + 15},${y - 14} ${x + 15},${y + T + 8}`), 'β'],
    [T2('β-sandwich', 'β-sandwich'), (x, y) => [0, 1, 2, 3].map(i => st(x + 40 + i * 24, i % 2 ? y + T : y + 62, i % 2 ? y + 62 : y + T, '#9c6f25')).join('') + [0, 1, 2, 3].map(i => st(x + 16 + i * 24, i % 2 ? y + 28 : y + Bm, i % 2 ? y + Bm : y + 28)).join(''), 'β'],
    [T2('β-barrel', 'β-barrel'), (x, y) => `<ellipse cx="${x + 62}" cy="${y + 48}" rx="50" ry="38" fill="none" stroke="#ffc247" stroke-width="12" stroke-dasharray="16 7"/>`, 'β'],
    [T2('Rossmann-vouw (βαβαβ)', 'Rossmann fold (βαβαβ)'), (x, y) => st(x + 10, y + Bm, y + T) + hx(x + 26, y + 26, 20, 56) + st(x + 62, y + Bm, y + T) + hx(x + 78, y + 26, 20, 56) + st(x + 114, y + Bm, y + T), 'α/β'],
    [T2('hoefijzer (LRR)', 'horseshoe (LRR)'), (x, y) => `<path d="M${x + 20},${y + Bm} A44,44 0 1,1 ${x + 108},${y + Bm}" fill="none" stroke="#ffc247" stroke-width="11"/><path d="M${x},${y + Bm} A64,64 0 0,1 ${x + 128},${y + Bm}" fill="none" stroke="#9b7bff" stroke-width="9" stroke-dasharray="24 9"/>`, 'α/β'],
  ];
  return items.map(([name, draw, cls], i) => {
    const col = i % 2, row = Math.floor(i / 2), x = PX + col * 262, y = 188 + row * 130;
    return draw(x + 4, y) + ptxt(x + 190, y + 50, cls, cls === 'α' ? '#9b7bff' : cls === 'β' ? '#ffc247' : '#7fdc6a', 23, 700) + ptxt(x, y + 118, name, '#c3cde2', 21, 600);
  }).join('');
}
function classes() {
  const row = (y, name, desc, col) => ptxt(PX, y, name, col, 23, 700) + ptxt(PX + 110, y, desc, '#c3cde2', 22, 500);
  return ptxt(PX, 215, T2('Volgens secundaire structuur', 'By secondary structure'), C.muted, 22) +
    row(262, 'all-α', T2('bijna alleen helices (globines)', 'almost only helices (globins)'), '#9b7bff') +
    row(304, 'all-β', T2('bijna alleen β-strengen', 'almost only β-strands'), '#ffc247') +
    row(346, 'α/β', T2('α en β afwisselend', 'α and β alternating'), '#7fdc6a') +
    row(388, 'α+β', T2('α en β in aparte gebieden', 'α and β in separate regions'), '#5fd3e6');
}
