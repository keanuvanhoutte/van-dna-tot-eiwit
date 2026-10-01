import { C, BASE, L, T2, svgOpen, txt, cam, FULL, sub, ease, clamp, lerp, f1, THREE, AACLASS, CLASSCOL, translate } from '../../kit.js';

/* Menselijk β-globine (HBB). UniProt P68871 (147 aa incl. start-Met); het rijpe eiwit (146 aa) begint bij Val1.
 * Coderende sequentie: RefSeq NM_000518.5 (eerste 30 nt). Helices A–H: PDB 1BBB, keten B. */
const UNI = 'MVHLTPEEKSAVTALWGKVNVDEVGGEALGRLLVVYPWTQRFFESFGDLSTPDAVMGNPKVKAHGKKVLGAFSDGLAHLDNLKGTFATLSELHCDKLHVDPENFRLLGNVLVCVLAHHFGKEFTPPVQAAYQKVVAGVANALAHKYH';
const SEQ = UNI.slice(1);                      // rijp β-globine, 146 residuen
const CDS = 'AUGGUGCAUCUGACUCCUGAGGAGAAGUCU';   // mRNA (U i.p.v. T)
const HEL = [['A', 4, 18], ['B', 19, 34], ['C', 35, 41], ['D', 50, 56], ['E', 57, 76], ['F', 85, 93], ['G', 99, 117], ['H', 123, 143]];
const HCOL = ['#ff6b6b', '#ff8a3d', '#ffc247', '#c9e04a', '#7fdc6a', '#2cc6a8', '#4fb0ff', '#9b7bff'];
const helixOf = i => HEL.findIndex(([, a, b]) => i >= a && i <= b);

const PER = 25, CW = 50, X0 = 170, Y0 = 230, RH = 84;
const pos = i => [X0 + ((i - 1) % PER) * CW, Y0 + Math.floor((i - 1) / PER) * RH];   // i = 1..146

const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'primair',
  title: { nl: 'Primaire structuur', en: 'Primary structure' },
  scale: { nl: '146 residuen ≈ 50 nm gestrekt', en: '146 residues ≈ 50 nm stretched out' }, time: { nl: 'vastgelegd tijdens de translatie', en: 'fixed during translation' },
  org: { nl: 'mens (β-globine, HBB)', en: 'human (β-globin, HBB)' },
  legend: [[CLASSCOL.h, { nl: 'hydrofoob', en: 'hydrophobic' }], [CLASSCOL.s, 'Gly / Pro'], [CLASSCOL.p, { nl: 'polair', en: 'polar' }], [CLASSCOL['+'], { nl: 'positief', en: 'positive' }], [CLASSCOL['-'], { nl: 'negatief', en: 'negative' }], [BASE.A, 'A'], [BASE.U, 'U'], [BASE.G, 'G'], [BASE.C, 'C']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Sequentie: UniProt P68871 (HBB_HUMAN). Codons: RefSeq NM_000518.5. De aminozuren onder de codons worden berekend met de genetische code. Nummering volgt het rijpe eiwit (Val = 1), zoals in PDB 1BBB en in de naam "Glu6Val".</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Sequence: UniProt P68871 (HBB_HUMAN). Codons: RefSeq NM_000518.5. The amino acids under the codons are computed with the genetic code. Numbering follows the mature protein (Val = 1), as in PDB 1BBB and in the name "Glu6Val".</p>' },
  simplified: {
    nl: 'In de cel wordt het start-methionine van β-globine na de translatie verwijderd; daarom telt de UniProt-sequentie 147 en het rijpe eiwit 146 residuen. De helixgrenzen komen uit één kristalstructuur (1BBB) en verschillen licht tussen structuren.',
    en: 'In the cell the start methionine of β-globin is removed after translation; that is why the UniProt sequence has 147 and the mature protein 146 residues. The helix boundaries come from one crystal structure (1BBB) and differ slightly between structures.' },
  steps: [
    ST(8500, cam(800, 420, 1300), 'Van codons naar residuen', 'From codons to residues', 'Het ribosoom las het HBB-mRNA codon per codon. Elk codon gaf één aminozuur: zo ligt de volgorde vast.', 'The ribosome read the HBB mRNA codon by codon. Each codon gave one amino acid: this fixes the order.'),
    ST(8500, FULL, 'De sequentie van N naar C', 'The sequence from N to C', 'Primaire structuur = de aminozuurvolgorde, altijd geschreven van N-terminus naar C-terminus. β-globine: 146 residuen.', 'Primary structure = the amino acid order, always written from N-terminus to C-terminus. β-globin: 146 residues.'),
    ST(9000, FULL, 'Een FASTA-bestand lezen', 'Reading a FASTA file', 'Databanken als UniProt geven sequenties in FASTA: een kopregel met ">", daaronder de éénlettercodes (60 per regel). UniProt telt 147 residuen (met start-Met), het rijpe eiwit en PDB 1BBB 146.', 'Databases such as UniProt give sequences in FASTA: a header line starting with ">", then the one-letter codes (60 per line). UniProt counts 147 residues (with start Met), the mature protein and PDB 1BBB 146.'),
    ST(8500, FULL, 'Kleur = eigenschap', 'Colour = property', 'Elke letter is een zijketen met een eigenschap. Dat patroon bepaalt de vouwing: in een helix vormen hydrofobe residuen die om de 3–4 posities terugkeren samen één binnenkant.', 'Each letter is a side chain with a property. That pattern determines the fold: in a helix, hydrophobic residues recurring every 3–4 positions together form one inner face.'),
    ST(8500, FULL, 'De sequentie bevat de helices', 'The sequence contains the helices', 'Onder de sequentie: de acht helices (A–H) uit de 3D-structuur. Hun plaats ligt besloten in de volgorde.', 'Below the sequence: the eight helices (A–H) from the 3D structure. Their position is encoded in the order.'),
    ST(9000, cam(765, 410, 1380), 'Eén letter verschil: Glu6Val', 'One letter different: Glu6Val', 'In sikkelcelhemoglobine is het codon voor residu 6 veranderd van GAG in GUG: Glu (−) wordt Val (hydrofoob). Eén letter verandert het eiwit.', 'In sickle-cell haemoglobin the codon for residue 6 has changed from GAG into GUG: Glu (−) becomes Val (hydrophobic). One letter changes the protein.'),
    ST(7500, FULL, 'Residu, peptide, eiwit', 'Residue, peptide, protein', 'Elk ingebouwd aminozuur heet een residu. Tot ± 50 residuen spreken we van een peptide, daarboven van een polypeptide of eiwit. Zelfde eiwit → zelfde sequentie (Sanger).', 'Each incorporated amino acid is called a residue. Up to ± 50 residues we speak of a peptide, above that of a polypeptide or protein. Same protein → same sequence (Sanger).'),
  ],
  svg() {
    return svgOpen() + `
    <g data-node="codon" data-color="${C.rna}" data-nolabel><g id="pr-cod"></g></g>
    <g id="pr-grid"></g>
    <g id="pr-fasta"></g>
    <g id="pr-extra"></g>
    <g data-node="mutaties" data-color="${CLASSCOL.h}" data-nolabel><g id="pr-mut"></g></g>
    <g id="pr-hs-aa" data-node="aminozuren" data-color="${CLASSCOL.h}" data-label="${T2('De 20 aminozuren', 'The 20 amino acids')}">
      <rect x="170" y="760" width="400" height="52" rx="26" fill="rgba(127,220,106,.12)" stroke="${CLASSCOL.h}"/>
      ${txt(370, 795, T2('Wat betekent elke letter?', 'What does each letter mean?'), CLASSCOL.h, 24)}
      <circle data-anchor="aminozuren" cx="370" cy="760" r="1" fill="none"/>
    </g>
    <g id="pr-hs-pep" data-node="peptide" data-color="${C.chain}" data-label="${T2('Peptidebinding & φ/ψ', 'Peptide bond & φ/ψ')}">
      <rect x="600" y="760" width="400" height="52" rx="26" fill="rgba(127,220,106,.12)" stroke="${C.chain}"/>
      ${txt(800, 795, T2('Hoe zitten ze aan elkaar?', 'How are they linked?'), C.chain, 24)}
      <circle data-anchor="peptide" cx="800" cy="760" r="1" fill="none"/>
    </g>
    <g id="pr-hs-sec" data-node="secundair" data-color="${C.prot}" data-label="${T2('Volgende: secundaire structuur', 'Next: secondary structure')}">
      <rect x="1030" y="760" width="400" height="52" rx="26" fill="rgba(155,123,255,.14)" stroke="${C.prot}"/>
      ${txt(1230, 795, T2('Sequentie → helices', 'Sequence → helices'), C.text, 24)}
      <circle data-anchor="secundair" cx="1230" cy="760" r="1" fill="none"/>
    </g>
    <g id="pr-hs-codon" data-node="codon" data-color="${C.rna}" data-label="${T2('Genetische code', 'Genetic code')}">
      <rect x="250" y="600" width="1100" height="16" fill="transparent"/>
      <circle data-anchor="codon" cx="330" cy="236" r="1" fill="none"/>
    </g>
    </svg>`;
  },
  init(svg) {
    const $ = id => svg.getElementById(id);
    const cell = (i, x, y, a, { op = 1, hl = false, size = 30, col } = {}) => {
      const c = col ?? CLASSCOL[AACLASS[a]];
      return `<g opacity="${f1(op)}"><rect x="${f1(x - 21)}" y="${f1(y - 30)}" width="42" height="42" rx="8" fill="${c}" fill-opacity="${hl ? 1 : .2}" stroke="${hl ? '#fff' : c}" stroke-width="${hl ? 3 : 1.5}"/>` +
        `<text x="${f1(x)}" y="${f1(y + 1)}" font-size="${size}" text-anchor="middle" fill="${hl ? '#0a1224' : c}" font-family="JetBrains Mono" font-weight="700">${a}</text></g>`;
    };
    let last = '';
    return {
      update(t, s) {
        const { step, p } = s;
        const key = step + ':' + (step <= 1 ? f1(p) : step === 5 ? f1(p) : '');
        ['pr-hs-aa', 'pr-hs-pep'].forEach(id => $(id).setAttribute('opacity', step === 6 ? 1 : 0));
        $('pr-hs-sec').setAttribute('opacity', step === 4 ? 1 : 0);
        $('pr-hs-codon').setAttribute('opacity', step === 0 ? 1 : 0);
        if (key === last) return; last = key;
        let cod = '', grid = '', fa = '', ex = '';

        if (step === 0) {
          // 10 codons (incl. AUG) en hun residuen
          const n = Math.min(10, 1 + Math.floor(clamp(p / .8) * 10));
          const cx0 = 250, cw = 112, y = 280;
          cod += txt(cx0 - 60, y + 22, "5'", C.text, 22) + `<line x1="${cx0 - 40}" y1="${y + 34}" x2="${cx0 + 10 * cw + 20}" y2="${y + 34}" stroke="${C.rna}" stroke-width="5"/>` + txt(cx0 + 10 * cw + 44, y + 22, "3'", C.text, 22);
          for (let k = 0; k < 10; k++) {
            const x = cx0 + k * cw, codon = CDS.slice(3 * k, 3 * k + 3), a = translate(codon);
            for (let j = 0; j < 3; j++) cod += `<rect x="${x + j * 34}" y="${y}" width="32" height="30" rx="5" fill="${BASE[codon[j]]}" opacity="${k < n ? 1 : .35}"/><text x="${x + j * 34 + 16}" y="${y + 22}" font-size="19" text-anchor="middle" fill="#0a1224" font-family="JetBrains Mono" font-weight="700">${codon[j]}</text>`;
            if (k < n) {
              cod += `<path d="M${x + 50},${y + 44} v40" stroke="${C.muted}" stroke-width="2" marker-end="url(#arrow)"/>`;
              cod += `<circle cx="${x + 50}" cy="${y + 128}" r="30" fill="${CLASSCOL[AACLASS[a]]}" opacity="${k === 0 ? .45 : 1}"/>` + txt(x + 50, y + 136, THREE[a], '#0a1224', 19);
              cod += txt(x + 50, y + 186, a, CLASSCOL[AACLASS[a]], 26);
              if (k > 0) cod += txt(x + 50, y + 216, String(k), C.muted, 19);
              if (k > 0 && k < n - 1) cod += `<line x1="${x + 80}" y1="${y + 128}" x2="${x + cw + 20}" y2="${y + 128}" stroke="${C.chain}" stroke-width="5"/>`;
            }
          }
          cod += txt(cx0 + 10, y + 252, T2('start-Met: wordt later verwijderd', 'start Met: removed later'), C.muted, 21, 'start');
          cod += txt(800, 620, T2('N-terminus  →  groeiende keten  →  C-terminus', 'N-terminus  →  growing chain  →  C-terminus'), C.text, 22);
          cod += txt(800, 180, T2('HBB-mRNA (codons 1–10)  ·  rijpe nummering: Val = 1', 'HBB mRNA (codons 1–10)  ·  mature numbering: Val = 1'), C.muted, 20);
        }
        if (step >= 1 && step <= 6 && step !== 2) {
          // stap 1: het volledige rooster staat er van bij het begin (gedimd); de keten licht op van N naar C.
          // De eerste 9 residuen (Val1–Ser9) sluiten aan op de codons van de vorige stap.
          const lit = step === 1 ? Math.max(9, Math.round(146 * clamp(p / .7))) : 146, shown = 146;
          const dim5 = step === 5 ? lerp(1, .5, ease(sub(p, 0, .15))) : 1;
          for (let i = 1; i <= shown; i++) {
            const [x, y] = pos(i), a = SEQ[i - 1];
            const hx = helixOf(i);
            let op = 1, hl = false, col;
            if (step === 1) { col = '#c9d2e4'; if (i > lit) op = .6; else if (i === lit && lit < 146) hl = true; }
            if (step === 5) { op = i === 6 ? 1 : dim5; hl = i === 6; }
            if (step === 6) op = .5;
            if (step === 4) col = hx >= 0 ? HCOL[hx] : '#6b7590';
            grid += cell(i, x, y, a, { op, hl, col });
          }
          for (let r = 0; r * PER < shown; r++) grid += txt(X0 - 36, Y0 + r * RH, String(r * PER + 1), C.muted, 20, 'end');
          if (shown > 0) grid += txt(X0 - 36, Y0 - 50, T2('N-terminus (Val1)', 'N-terminus (Val1)'), '#6fa8ff', 24, 'start');
          if (shown === 146) { const [x, y] = pos(146); grid += txt(x + 34, y, T2('C-terminus (His146)', 'C-terminus (His146)'), '#ff7b7b', 24, 'start'); }
          if (step === 4) {
            HEL.forEach(([n, a, b], k) => {
              for (let i = a; i <= b; i++) { const [x, y] = pos(i); grid += `<rect x="${x - 25}" y="${y + 18}" width="50" height="8" fill="${HCOL[k]}"/>`; }
              const [x, y] = pos(a); grid += `<text x="${x - 20}" y="${y + 44}" font-size="23" fill="${HCOL[k]}" font-family="Inter" font-weight="800">${n}</text>`;
            });
            grid += txt(800, 736, T2('gekleurd = α-helix (PDB 1BBB) · grijs = lus', 'coloured = α-helix (PDB 1BBB) · grey = loop'), C.muted, 23);
          }
          if (step === 5) {
            const [x, y] = pos(6), k = ease(sub(p, .25, .55));
            ex += `<g transform="translate(${x} ${y + 40})">` +
              `<path d="M0,0 v36" stroke="#fff" stroke-width="2.5"/>` +
              `<rect x="-150" y="40" width="300" height="190" rx="16" fill="#0d1426" stroke="#2a3550" stroke-width="2"/>` +
              txt(-75, 80, 'HbA', C.text, 20) + txt(75, 80, 'HbS', C.text, 20) +
              `<g font-family="JetBrains Mono" font-size="24" font-weight="700">` +
              ['G', 'A', 'G'].map((b, j) => `<rect x="${-120 + j * 30}" y="96" width="28" height="30" rx="5" fill="${BASE[b]}"/><text x="${-106 + j * 30}" y="118" text-anchor="middle" fill="#0a1224" font-size="18">${b}</text>`).join('') +
              ['G', 'U', 'G'].map((b, j) => `<rect x="${30 + j * 30}" y="96" width="28" height="30" rx="5" fill="${BASE[b]}" ${j === 1 ? `stroke="#fff" stroke-width="${f1(3 * k)}"` : ''}/><text x="${44 + j * 30}" y="118" text-anchor="middle" fill="#0a1224" font-size="18">${b}</text>`).join('') + '</g>' +
              `<circle cx="-75" cy="170" r="28" fill="${CLASSCOL['-']}"/>` + txt(-75, 177, 'Glu', '#0a1224', 18) +
              `<g opacity="${f1(k)}"><circle cx="75" cy="170" r="28" fill="${CLASSCOL.h}"/>` + txt(75, 177, 'Val', '#0a1224', 18) + '</g>' +
              txt(0, 177, '→', '#fff', 26) + txt(0, 218, T2('− geladen → hydrofoob', '− charged → hydrophobic'), C.muted, 18) + '</g>';
          }
          if (step === 6) {
            ex += `<rect x="330" y="260" width="940" height="250" rx="20" fill="#0b1224" fill-opacity=".94" stroke="#2a3550" stroke-width="2"/>` +
              txt(800, 320, T2('residu = één aminozuur in de keten', 'residue = one amino acid in the chain'), C.text, 26) +
              `<g font-family="Inter" font-weight="700" font-size="24">` +
              `<rect x="380" y="370" width="250" height="90" rx="14" fill="rgba(95,211,230,.14)" stroke="#5fd3e6"/>` + txt(505, 405, 'peptide', '#5fd3e6', 26) + txt(505, 442, T2('tot ± 50 residuen', 'up to ± 50 residues'), C.muted, 22) +
              `<rect x="680" y="370" width="540" height="90" rx="14" fill="rgba(155,123,255,.14)" stroke="${C.prot}"/>` + txt(950, 405, T2('polypeptide / eiwit', 'polypeptide / protein'), C.prot, 26) + txt(950, 442, T2('bv. β-globine: 146 residuen', 'e.g. β-globin: 146 residues'), C.muted, 22) + '</g>';
          }
        }
        if (step === 2) {
          const lines = [UNI.slice(0, 60), UNI.slice(60, 120), UNI.slice(120)];
          const hdr = '>sp|P68871|HBB_HUMAN Hemoglobin subunit beta OS=Homo sapiens OX=9606 GN=HBB PE=1 SV=2';
          fa += `<rect x="90" y="190" width="1420" height="290" rx="16" fill="#0b1224" stroke="#2a3550" stroke-width="2"/>`;
          fa += `<text x="120" y="250" font-size="23" fill="#ffc247" font-family="JetBrains Mono" font-weight="700">${hdr}</text>`;
          // elke letter op een vaste plaats met een gekleurd vakje erachter (zelfde kleurcode als het rooster)
          lines.forEach((ln, r) => {
            const y = 316 + r * 52;
            fa += [...ln].map((a, j) => `<rect x="${f1(121 + j * 22.6)}" y="${y - 29}" width="21" height="38" rx="4" fill="${CLASSCOL[AACLASS[a]]}" fill-opacity=".26"/>`).join('');
            fa += `<text y="${y}" font-size="27" font-family="JetBrains Mono" font-weight="700" text-anchor="middle">` + [...ln].map((a, j) => `<tspan x="${f1(131.5 + j * 22.6)}" fill="${CLASSCOL[AACLASS[a]]}">${a}</tspan>`).join('') + '</text>';
          });
          const k = ease(sub(p, .15, .45));
          const ann = [['sp', 'Swiss-Prot'], ['P68871', T2('accessie', 'accession')], ['OS', T2('organisme', 'organism')], ['GN', T2('gen', 'gene')]];
          fa += `<text x="800" y="160" text-anchor="middle" font-size="24" font-family="Inter" font-weight="600" opacity="${f1(k)}">` + ann.map(([a, b], i) => `<tspan fill="#ffc247" font-family="JetBrains Mono" font-weight="700">${a}</tspan><tspan fill="#c3cde2"> = ${b}${i < ann.length - 1 ? '  ·  ' : ''}</tspan>`).join('') + '</text>';
        }
        $('pr-cod').innerHTML = cod; $('pr-grid').innerHTML = grid; $('pr-fasta').innerHTML = fa; $('pr-extra').innerHTML = step === 5 ? '' : ex; $('pr-mut').innerHTML = step === 5 ? ex : '';
      },
    };
  },
};
