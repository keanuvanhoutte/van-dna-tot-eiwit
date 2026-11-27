import { C, L, T2, CLASSCOL } from '../../kit.js';
import { molScene, PX, ptxt, phead, plines } from './_a_mol.js';

/* β-globine = keten B van PDB 1BBB (menselijk HbA). Helixgrenzen uit de struct_conf-records van 1BBB (keten B). */
const HEL = [['A', 4, 18], ['B', 19, 34], ['C', 35, 41], ['D', 50, 56], ['E', 57, 76], ['F', 85, 93], ['G', 99, 117], ['H', 123, 143]];
const HCOL = ['#ff6b6b', '#ff8a3d', '#ffc247', '#c9e04a', '#7fdc6a', '#2cc6a8', '#4fb0ff', '#9b7bff'];
const HYD = ['ALA', 'VAL', 'LEU', 'ILE', 'MET', 'PHE', 'TRP', 'PRO', 'GLY'];
const POL = ['SER', 'THR', 'CYS', 'ASN', 'GLN', 'TYR'];
const B = { chain: 'B' };
const rng = (a, b) => `${a}-${b}`;
/* 'spectrum' = begin blauw → einde rood (zoals de ondertitel zegt); de 3Dmol-eigen 'spectrum' begint bij paars */
const SPECTRUM = { colorscheme: { prop: 'resi', gradient: 'roygb', min: 146, max: 1 } };
const cartoon = (color, extra = {}) => ({ cartoon: { ...(color === 'spectrum' ? SPECTRUM : { color }), thickness: .5, ...extra } });

const ST = (dur, nl, en, tnl, ten, o) => ({ dur, title: { nl, en }, text: { nl: tnl, en: ten }, ...o });
const hemeStyle = { stick: { colorscheme: 'orangeCarbon', radius: .22 } };

export default molScene({
  id: 'tertiair', pdb: '1BBB',
  title: { nl: 'Tertiaire structuur & domeinen', en: 'Tertiary structure & domains' },
  scale: '≈ 4 nm', time: { nl: 'vouwing: µs–s (hier stilstaand)', en: 'folding: µs–s (static here)' },
  org: { nl: 'mens (β-globine uit hemoglobine, PDB 1BBB)', en: 'human (β-globin from haemoglobin, PDB 1BBB)' },
  legend: [[CLASSCOL.h, { nl: 'hydrofoob', en: 'hydrophobic' }], [CLASSCOL.p, { nl: 'polair', en: 'polar' }], [CLASSCOL['+'], { nl: 'positief (Lys, Arg, His)', en: 'positive (Lys, Arg, His)' }], [CLASSCOL['-'], { nl: 'negatief (Asp, Glu)', en: 'negative (Asp, Glu)' }], ['#ff8a3d', { nl: 'heem (Fe)', en: 'haem (Fe)' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">De helixgrenzen A–H komen uit de 1BBB-records van keten B. De zoutbruggen worden in de browser berekend (N van Lys/Arg binnen 4 Å van O van Asp/Glu). Niet-eiwitmoleculen en metaalionen (heem, Zn²⁺ in een zinkvinger) helpen structuur én functie. Hemoglobine hoort bij de globinevouw, dezelfde vouw als myoglobine, waarvan Kendrew en collega\'s in 1958 een eerste 3D-model publiceerden.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">The helix boundaries A–H come from the 1BBB records of chain B. Salt bridges are computed in the browser (N of Lys/Arg within 4 Å of O of Asp/Glu). Non-protein molecules and metal ions (haem, Zn²⁺ in a zinc finger) support structure and function. Haemoglobin has the globin fold, the same fold as myoglobin, of which Kendrew and colleagues published a first 3D model in 1958.</p>' },
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
      <text x="1290" y="593" font-size="22" text-anchor="middle" fill="#ffc247" font-family="Inter" font-weight="600">${T2('S–S-bruggen (in andere eiwitten)', 'S–S bonds (in other proteins)')}</text>
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
    ST(8000, 'Eén keten, één vouw', 'One chain, one fold', 'De keten van 146 aminozuren vouwt tot een compact bolletje. Kleur: van begin (blauw) tot einde (rood).', 'The chain of 146 amino acids folds into a compact ball. Colour: from start (blue) to end (red).', {
      show(c) {
        c.style(B, cartoon('spectrum')); c.style({ chain: 'B', resn: 'HEM' }, hemeStyle);
        const at = (r, a = 'CA') => c.sel({ chain: 'B', resi: r, atom: a })[0];
        if (at(1)) c.label(T2('begin', 'start'), at(1), { border: '#4f6bff', size: 16 });
        if (at(146)) c.label(T2('einde', 'end'), at(146), { border: '#ff4b4b', size: 16 });
        const fe = c.sel({ chain: 'B', resn: 'HEM', atom: 'FE' })[0]; if (fe) c.label(T2('heem', 'haem'), fe, { border: '#ff8a3d', size: 16 });
      },
      zoom: B, spin: .02,
      panel: () => phead(T2('β-globine (hemoglobine)', 'β-globin (haemoglobin)')) + plines(222, [
        [T2('• één keten: 146 residuen', '• one chain: 146 residues'), C.text], [T2('• globulair (bolvormig, oplosbaar)', '• globular (spherical, soluble)'), C.text],
        [T2('• bindt één heemgroep', '• binds one haem group'), C.text], '',
        [T2('tertiair = 3D-vorm van één keten', 'tertiary = 3D shape of one chain'), C.muted, 22]]),
    }),
    ST(8500, 'Acht spiralen: A tot H', 'Eight spirals: A to H', 'Dit eiwit heeft acht spiralen (helices A tot H), verbonden door korte lussen.', 'This protein has eight spirals (helices A to H), linked by short loops.', {
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
    ST(8500, 'Een waterschuwe kern', 'A water-avoiding core', 'Binnenin zitten bijna alleen waterschuwe zijketens (groen). Hun samenklonteren drijft de vouwing aan.', 'Inside sit almost only water-avoiding side chains (green). Their clustering together drives the folding.', {
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
    ST(8500, 'Een waterminnende buitenkant', 'A water-loving outside', 'Aan de buitenkant zitten vooral waterminnende en geladen zijketens, zodat het eiwit oplost in water.', 'The outside has mostly water-loving and charged side chains, so the protein dissolves in water.', {
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
    ST(9000, 'Een zakje voor het heem', 'A pocket for the haem', 'Het heem (een ring met een ijzeratoom) ligt in een waterschuw zakje. Daar bindt zuurstof (hier CO).', 'The haem (a ring with an iron atom) sits in a water-avoiding pocket. Oxygen binds there (here CO).', {
      show(c) {
        /* volwaardig lint (geen Cα-lijn): helix E en F in hun kleur, de rest grijsblauw; het heem ligt in de open zak en komt tijdens het draaien in beeld */
        /* enkel het zakje: lint van de residuen binnen 12 Å van het heem (de rest van de keten zou het heem verbergen) */
        const near = { chain: 'B', byres: true, within: { distance: 12, sel: { chain: 'B', resn: 'HEM' } } };
        c.style({ ...near, not: { resn: ['HEM', 'CMO', 'HOH'] } }, cartoon('#6b7699'));
        c.style({ ...near, resi: rng(57, 76) }, cartoon(HCOL[4])); c.style({ ...near, resi: rng(85, 93) }, cartoon(HCOL[5]));
        c.style({ chain: 'B', resn: 'HEM' }, { stick: { colorscheme: 'orangeCarbon', radius: .3 } });
        c.style({ chain: 'B', resn: 'HEM', atom: 'FE' }, { sphere: { color: '#ff8a3d', radius: 1.1 } });
        c.style({ chain: 'B', resn: 'CMO' }, { stick: { radius: .3 }, sphere: { scale: .35 } });
        c.style({ chain: 'B', resi: [63, 92], not: { atom: ['N', 'C', 'O'] } }, { stick: { colorscheme: 'greenCarbon', radius: .3 } });
        /* coördinatie: His92 NE2 → Fe (proximaal) en Fe → C van CO (distaal) */
        const fe = c.sel({ chain: 'B', resn: 'HEM', atom: 'FE' })[0], ne = c.sel({ chain: 'B', resi: 92, atom: 'NE2' })[0], co = c.sel({ chain: 'B', resn: 'CMO', atom: 'C' })[0];
        if (fe && ne) c.cyl(ne, fe, '#ff8a3d', .16, true);
        if (fe && co) c.cyl(fe, co, '#ff8a3d', .16, true);
        const lab = (s, t, col, off = 26) => { const a = c.sel(s); if (a.length) c.label(t, c.center(a), { border: col, size: 16, offset: off }); };
        // labels uit elkaar: His92 op zijn Cα (verder van het heem dan NE2), CO op het O-atoom; het Fe-label staat al in het paneel
        lab({ chain: 'B', resi: 92, atom: 'CA' }, 'His92 (F8)', '#2cc6a8'); lab({ chain: 'B', resi: 63, atom: 'NE2' }, 'His63 (E7)', '#7fdc6a');
        lab({ chain: 'B', resn: 'CMO', atom: 'O' }, 'CO', '#ffffff', -22);
      },
      zoom: { chain: 'B', byres: true, within: { distance: 12, sel: { chain: 'B', resn: 'HEM' } } }, zoomFactor: 2.2, spin: .018,
      panel: () => phead(T2('Liganden stabiliseren de vouw', 'Ligands stabilise the fold')) + plines(222, [
        [T2('Heem = protoporfyrine IX + Fe²⁺', 'Haem = protoporphyrin IX + Fe²⁺'), C.text, 23, 700], '',
        [T2('groen = helix E · blauwgroen = helix F', 'green = helix E · teal = helix F'), C.muted, 21],
        T2('• His92 (F8) bindt het Fe²⁺', '• His92 (F8) binds the Fe²⁺'), T2('• O₂ bindt aan de andere kant', '• O₂ binds on the other side'), T2('• His63 (E7) ligt aan de O₂-kant', '• His63 (E7) sits on the O₂ side')]),
    }),
    ST(8500, 'Bruggen houden de vouw vast', 'Bonds hold the fold in place', 'Plus- en mingeladen zijketens trekken elkaar aan, en andere vormen waterstofbruggen. Zo blijft de vouw vast.', 'Plus and minus charged side chains attract each other, and others form hydrogen bonds. This holds the fold.', {
      show(c) {
        c.style(B, cartoon('#5a6585'));   // heem hier niet getoond (aandacht op de zoutbruggen)
        (c.data.sb ?? []).forEach(({ p, n }, i) => {
          c.style({ chain: 'B', resi: [p.resi, n.resi], not: { atom: ['N', 'C', 'O'] } }, { stick: { radius: .38, colorscheme: 'whiteCarbon' } });
          c.cyl(p, n, '#ffc247', .3, true);   // de zoutbrug zelf (N⁺ ··· O⁻)
          c.addStyle({ chain: 'B', resi: p.resi, atom: p.atom }, { sphere: { color: CLASSCOL['+'], radius: 1.05 } });
          c.addStyle({ chain: 'B', resi: n.resi, atom: n.atom }, { sphere: { color: CLASSCOL['-'], radius: 1.05 } });
          c.label(`${p.resn[0]}${p.resn.slice(1).toLowerCase()}${p.resi}–${n.resn[0]}${n.resn.slice(1).toLowerCase()}${n.resi}`, { x: (p.x + n.x) / 2, y: (p.y + n.y) / 2, z: (p.z + n.z) / 2 }, { size: 16, border: '#ffc247', offset: 26, dx: [-70, 70, 0, -70, 70][i % 5] });
        });
      },
      zoom: B, spin: .02,
      panel: c => phead(T2('Elektrostatische interacties', 'Electrostatic interactions')) + plines(222, [
        [T2(`${c.data.sb?.length ?? '…'} zoutbruggen in keten β`, `${c.data.sb?.length ?? '…'} salt bridges in chain β`), '#ffc247', 23, 700],
        [T2('(N⁺ en O⁻ binnen 4 Å)', '(N⁺ and O⁻ within 4 Å)'), C.muted, 21], '',
        T2('zoutbrug = ionpaar (+ en −)', 'salt bridge = ion pair (+ and −)'), T2('H-brug = gedeeld H tussen N/O', 'H-bond = shared H between N/O')]),
      panelKey: (t, s, c) => c.data.sb?.length ?? 0,
    }),
    ST(8000, 'Zwavelbruggen? Hier niet', 'Disulfide bonds? Not here', 'Twee cysteïnes kunnen een sterke zwavelbrug maken. Hier niet: in de celvloeistof lukt dat meestal niet.', 'Two cysteines can form a strong disulfide bond. Not here: in the cell fluid (cytosol) they usually do not form.', {
      show(c) {
        c.style(B, cartoon('#5a6585'));   // Cys112 ligt in de kern: het label wijst hem aan met een lijntje
        c.style({ chain: 'B', resn: 'CYS', not: { atom: ['N', 'C', 'O'] } }, { stick: { radius: .38, colorscheme: 'yellowCarbon' } });
        c.addStyle({ chain: 'B', resn: 'CYS', atom: 'SG' }, { sphere: { color: '#ffd84a', radius: 1.3 } });   // het zwavelatoom (S–H)
        for (const r of [93, 112]) { const a = c.sel({ chain: 'B', resi: r, atom: 'SG' }); if (a.length) c.label(`Cys${r} – SH`, a[0], { border: '#ffc247', size: 16, offset: 30 }); }
      },
      zoom: { chain: 'B', within: { distance: 9, sel: { chain: 'B', resn: 'CYS' } } }, spin: .02,
      panel: () => phead(T2('Covalent: de disulfidebrug', 'Covalent: the disulfide bond')) + plines(222, [
        ['Cys–SH + HS–Cys → Cys–S–S–Cys', '#ffc247', 22, 700], [T2('(oxidatie: + 2 H⁺ + 2 e⁻)', '(oxidation: + 2 H⁺ + 2 e⁻)'), C.muted, 20], '',
        T2('• vooral in eiwitten buiten de cel', '• mainly in proteins outside the cell'), T2('• gevormd in het ER (bv. antistoffen)', '• formed in the ER (e.g. antibodies)'), T2('• verbindt ook verre residuen', '• can join residues far apart')]),
    }),
    ST(9000, 'Vaste combinaties', 'Recurring combinations', 'Kleine combinaties van spiralen of strengen komen vaak terug (motieven), zoals helix-bocht-helix.', 'Small combinations of spirals or strands recur often (motifs), such as helix-turn-helix.', {
      show(c) {
        /* voorbeeld in dit eiwit: helix G en H liggen tegen elkaar, verbonden door een korte lus (een α-haarspeld) */
        c.style(B, cartoon('#3f4864'));
        c.style({ chain: 'B', resi: rng(99, 117) }, cartoon(HCOL[6])); c.style({ chain: 'B', resi: rng(123, 143) }, cartoon(HCOL[7]));
        c.style({ chain: 'B', resi: rng(118, 122) }, cartoon('#ffffff'));
        const mid = (a, b) => c.center(c.sel({ chain: 'B', resi: rng(a, b), atom: 'CA' }));
        c.label(T2('spiraal G', 'spiral G'), mid(99, 117), { border: HCOL[6], size: 17 });
        c.label(T2('spiraal H', 'spiral H'), mid(123, 143), { border: HCOL[7], size: 17 });
        c.label(T2('korte bocht', 'short turn'), mid(118, 122), { border: '#ffffff', size: 16, offset: 30 });
      },
      zoom: B, spin: .02,
      panel: () => phead(T2('Motieven (topologie)', 'Motifs (topology)')) + motifs(),
    }),
    ST(9000, 'Domeinen: losse bouwblokken', 'Domains: separate building blocks', 'Een domein is een stuk dat op zich kan vouwen en in andere eiwitten terugkomt. Dit eiwit is één domein.', 'A domain is a part that can fold on its own and recurs in other proteins. This protein is one domain.', {
      show(c) { c.style(B, cartoon('spectrum')); c.style({ chain: 'B', resn: 'HEM' }, hemeStyle); },
      zoom: B, spin: .03,
      panel: () => phead(T2('Hoe deel je vouwingen in?', 'How to classify folds?')) + classes(),
    }),
    ST(7500, 'Nog niet het hele eiwit', 'Not yet the whole protein', 'Hemoglobine bestaat uit vier zulke ketens. Hoe ze samen passen, heet de quaternaire structuur.', 'Haemoglobin is made of four such chains. How they fit together is called the quaternary structure.', {
      show(c) {
        /* de keten van deze scène in kleur; de drie andere ketens zacht in hun eigen kleur (α paars, β groen, zoals bij quaternair) */
        c.style({ chain: ['A', 'C'] }, cartoon('#5d5490'));
        c.style({ chain: 'D' }, cartoon('#3c6a4c'));
        c.style(B, cartoon('spectrum'));
        c.style({ resn: 'HEM' }, { stick: { colorscheme: 'orangeCarbon', radius: .2 } });
        const mid = k => c.center(c.sel({ chain: k, atom: 'CA' }));
        c.label(T2('deze keten (β)', 'this chain (β)'), mid('B'), { border: '#ffc247', size: 18 });
        c.label('α', mid('A'), { border: '#b39dff', size: 18 }); c.label('α', mid('C'), { border: '#b39dff', size: 18 });
        c.label('β', mid('D'), { border: '#7fdc6a', size: 18 });
      },
      zoom: {}, spin: .03,
      panel: () => phead(T2('Op naar het tetrameer', 'On to the tetramer')) + plines(222, [
        T2('Hydrofobe plekken op β-globine', 'Hydrophobic patches on β-globin'), T2('passen tegen de α-ketens.', 'fit against the α chains.'), '',
        [T2('Samen: α₂β₂', 'Together: α₂β₂'), C.text, 27, 700]]) +
        [['#b39dff', 'α'], ['#7fdc6a', 'β'], ['#b39dff', 'α'], ['url(#tspec)', 'β']].map(([col, t], i) =>
          `<circle cx="${PX + 60 + (i % 2) * 64}" cy="${430 + Math.floor(i / 2) * 64}" r="29" fill="${col}"/>` + ptxt(PX + 60 + (i % 2) * 64, 439 + Math.floor(i / 2) * 64, t, '#0a1224', 24, 700, 'middle')).join('') +
        '<defs><linearGradient id="tspec"><stop offset="0" stop-color="#4f6bff"/><stop offset=".5" stop-color="#7fdc6a"/><stop offset="1" stop-color="#ff4b4b"/></linearGradient></defs>' +
        ptxt(PX + 170, 455, T2('regenboog = de keten', 'rainbow = the chain'), C.muted, 22) + ptxt(PX + 170, 485, T2('uit deze scène', 'from this scene'), C.muted, 22),
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
    [T2('hoefijzer (LRR)', 'horseshoe (LRR)'), (x, y) => `<path d="M${x + 20},${y + Bm} A44,44 0 1,1 ${x + 108},${y + Bm}" fill="none" stroke="#ffc247" stroke-width="11"/><path d="M${x},${y + Bm} A64,64 0 0,1 ${x + 128},${y + Bm}" fill="none" stroke="#9b7bff" stroke-width="9" stroke-dasharray="24 9"/>`, ''],
  ];
  /* vier duidelijke voorbeelden (2 × 2, groter getekend); de volledige lijst staat in het uitlegpaneel */
  return [0, 1, 2, 5].map(k => items[k]).map(([name, draw, cls], i) => {
    const col = i % 2, row = Math.floor(i / 2), x = PX + col * 262, y = 200 + row * 215;
    return `<g transform="translate(${x + 10},${y}) scale(1.35) translate(${-x - 10},${-y})">${draw(x + 10, y)}</g>` +
      ptxt(x + 215, y + 30, cls, cls === 'α' ? '#9b7bff' : '#ffc247', 26, 700) + ptxt(x + 4, y + 168, name, '#e2e8f5', 24, 600);
  }).join('') + ptxt(PX, 640, T2('wit in de figuur: de bocht tussen', 'white in the figure: the turn between'), C.muted, 22) + ptxt(PX, 670, T2('twee spiralen (G en H)', 'two spirals (G and H)'), C.muted, 22);
}
function classes() {
  const row = (y, name, desc, col) => ptxt(PX, y, name, col, 23, 700) + ptxt(PX + 110, y, desc, '#c3cde2', 22, 500);
  return ptxt(PX, 215, T2('Volgens secundaire structuur', 'By secondary structure'), C.muted, 22) +
    row(262, 'all-α', T2('bijna alleen helices (globines)', 'almost only helices (globins)'), '#9b7bff') +
    row(304, 'all-β', T2('bijna alleen β-strengen', 'almost only β-strands'), '#ffc247') +
    row(346, 'α/β', T2('α en β afwisselend', 'α and β alternating'), '#7fdc6a') +
    row(388, 'α+β', T2('α en β in aparte gebieden', 'α and β in separate regions'), '#5fd3e6');
}
