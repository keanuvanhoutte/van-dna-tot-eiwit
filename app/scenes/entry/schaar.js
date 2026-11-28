import { structure3d, ghost } from '../../kit3d.js';

/* PDB 7RFW: hoofdprotease (Mpro, 3CLpro, nsp5) van SARS-CoV-2 met nirmatrelvir (PF-07321332, ligand 4WI), röntgen 1,73 Å
 * (Owen et al., Science 2021 — de studie waarin Pfizer nirmatrelvir voorstelde). Eén entiteit: 3C-like proteinase, SARS-CoV-2.
 * Lokale kopie data/pdb/7RFW.cif: biologische eenheid (assembly 1 = dimeer; tweede kopie A-2 hernoemd tot B), ingekort tot
 * CA-atomen + volledige His41 en Cys145 + nirmatrelvir; geen water (4 870 → 776 atomen). Nagekeken in het bestand (05-11-2026):
 * Cys145-SG ligt 1,92 Å van atoom C3 van 4WI (covalente binding), His41-NE2 3,62 Å van Cys145-SG (katalytische dyade). */
const L3 = (nl, en) => ({ nl, en });
const TAG = (sel, nl, en, labelColor, labelOff) => ({ sel, label: { nl, en }, labelColor, labelOff });   // naamkaartje in een overzichtsstap (niets gedimd)
const PA = '#b39ddb', PB = '#7e6bd6', SITE = '#ff6b6b', DRUG = '#5fd3e6';
const S = (color, r = 2.4) => ({ sphere: { color, radius: r } });
const PROT = { atom: 'CA', hetflag: false };
const base = [{ sel: { chain: 'A', ...PROT }, style: S(PA) }, { sel: { chain: 'B', ...PROT }, style: S(PB) }, { sel: { resn: '4WI' }, style: {} }];
const DYAD = (ch, r = 4.2, label) => [{ sel: { chain: ch, resi: [41, 145], atom: 'CA' }, style: S(SITE, r), label }];
const DRUGS = (ch, label, r = 1.1, labelOff) => ({ sel: { chain: ch, resn: '4WI' }, style: { stick: { color: DRUG, radius: .45 }, sphere: { color: DRUG, radius: r } }, label, labelColor: DRUG, labelOff });

export default structure3d({
  id: 'schaar', pdb: '7RFW',
  title: L3('Een virusschaar knipt de lange keten', 'The virus’s scissors cut the long chain'),
  scale: L3('≈ 7 nm (twee helften)', '≈ 7 nm (two halves)'), time: L3('vertraagd getoond (schematisch)', 'shown slowed down (schematic)'),
  org: L3('SARS-CoV-2 · PDB 7RFW', 'SARS-CoV-2 · PDB 7RFW'),
  legend: [[PA, L3('schaar, helft 1', 'scissors, half 1')], [PB, L3('schaar, helft 2', 'scissors, half 2')], [SITE, L3('knipplek (His41 + Cys145)', 'cutting site (His41 + Cys145)')],
    [DRUG, L3('medicijn (nirmatrelvir)', 'medicine (nirmatrelvir)')]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Echte röntgenstructuur van de hoofdprotease van SARS-CoV-2 met het geneesmiddel nirmatrelvir (Owen et al., <i>Science</i> 2021). Eiwit: één bolletje per aminozuur; het medicijn met al zijn atomen. Sleep om te draaien, scroll om te zoomen.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Real X-ray structure of the SARS-CoV-2 main protease with the drug nirmatrelvir (Owen et al., <i>Science</i> 2021). Protein: one bead per amino acid; the drug with all its atoms. Drag to rotate, scroll to zoom.</p>' },
  simplified: {
    nl: 'Van het eiwit is alleen de ruggengraat getekend (één bolletje per aminozuur); de knipplek toont de twee belangrijkste bouwstenen. Het virus heeft nog een tweede, kleinere schaar (PLpro) die de eerste stukken van de keten losknipt. Het knippen zelf gebeurt niet in deze momentopname en wordt alleen verteld. Het medicijn wordt samen met ritonavir gegeven, dat de afbraak ervan in het lichaam vertraagt.',
    en: 'Only the backbone of the protein is drawn (one bead per amino acid); the cutting site shows the two most important building blocks. The virus also has a second, smaller scissors (PLpro) that cuts the first pieces off the chain. The cutting itself does not happen in this snapshot and is only told. The medicine is given together with ritonavir, which slows down its breakdown in the body.' },
  base,
  dimOpacity: false,
  parts: [
    { c: PA, t: L3('helft 1', 'half 1'), d: L3('De lichtpaarse helft van de virusschaar. Elk bolletje is één bouwsteen (aminozuur) van het eiwit.', 'The light-purple half of the virus scissors. Each bead is one building block (amino acid) of the protein.'),
      p: L3('Protomeer A van de hoofdprotease (Mpro, nsp5), weergegeven als Cα-atomen.', 'Protomer A of the main protease (Mpro, nsp5), shown as Cα atoms.') },
    { c: PB, t: L3('helft 2', 'half 2'), d: L3('De tweede, gelijke helft (donkerder paars). De schaar knipt alleen als de twee helften samen zitten.', 'The second, identical half (darker purple). The scissors only cut when the two halves are together.'),
      p: L3('Protomeer B; Mpro is enkel als homodimeer katalytisch actief.', 'Protomer B; Mpro is catalytically active only as a homodimer.') },
    { c: SITE, t: L3('knipplek', 'cutting site'), m: ['actief centrum 1', 'active site 1', 'actief centrum 2', 'active site 2'], d: L3('Twee bouwstenen in een groef (rood) doen het eigenlijke knippen. Elke helft heeft er zo één.', 'Two building blocks in a groove (red) do the actual cutting. Each half has one.'),
      p: L3('Katalytische dyade His41–Cys145 in het substraatbindende groefje van elk protomeer.', 'Catalytic dyad His41–Cys145 in the substrate-binding cleft of each protomer.') },
    { c: DRUG, t: L3('medicijn', 'medicine'), d: L3('Het medicijn nirmatrelvir (blauwgroen) past in dezelfde groef en hecht zich vast aan het knipmes. Zo zit de schaar vast.', 'The medicine nirmatrelvir (blue-green) fits into the same groove and attaches to the blade. That locks the scissors.'),
      p: L3('Nirmatrelvir, een peptidomimetische remmer die covalent (via zijn nitril) aan Cys145 bindt.', 'Nirmatrelvir, a peptidomimetic inhibitor that binds Cys145 covalently (via its nitrile).') },
  ],
  steps: [
    { dur: 8000, title: L3('Een virusschaar knipt de lange keten', 'The virus’s scissors cut the long chain'), focus: null, zoom: {}, tags: [TAG({ chain: 'A', resi: 250, atom: 'CA' }, 'helft 1', 'half 1', PA), TAG({ chain: 'B', resi: 250, atom: 'CA' }, 'helft 2', 'half 2', PB)], spin: .012,
      text: L3('Dit is de echte schaar van het coronavirus. Ze knipt de lange eiwitketen op minstens elf plaatsen.', 'This is the real scissors of the coronavirus. It cuts the long protein chain in at least eleven places.') },
    { dur: 8500, title: L3('De schaar werkt als paar', 'The scissors work as a pair'), zoom: {}, spin: .01,
      focus: [{ sel: { chain: 'A', ...PROT }, style: S(PA, 2.6) }, { sel: { chain: 'B', ...PROT }, style: S(PB, 2.6) },
        { sel: { chain: 'A', resi: 250, atom: 'CA' }, style: S(PA, 2.6), label: L3('helft 1', 'half 1'), labelColor: PA }, { sel: { chain: 'B', resi: 250, atom: 'CA' }, style: S(PB, 2.6), label: L3('helft 2', 'half 2'), labelColor: PB }],
      text: L3('De schaar bestaat uit twee gelijke helften. Alleen samen kunnen ze knippen.', 'The scissors consist of two identical halves. Only together can they cut.') },
    { dur: 9000, title: L3('Het knipmes zit in een groef', 'The blade sits in a groove'), zoom: { chain: 'A', resi: [41, 145, 166, 189] }, spin: .006,
      focus: [{ sel: { chain: 'A', ...PROT }, style: S(PA, 1.2) }, { sel: { chain: 'B', ...PROT }, style: ghost(3.6, .12) }, ...DYAD('A', 4.2, L3('knipplek', 'cutting site'))],
      text: L3('Twee bouwstenen in een groef doen het knippen. Daar past normaal een stukje van de keten in.', 'Two building blocks in a groove do the cutting. Normally a piece of the chain fits in there.') },
    { dur: 9000, title: L3('Een medicijn blokkeert de schaar', 'A medicine blocks the scissors'), zoom: { chain: 'A', resi: [41, 145, 166, 189] }, spin: .006,
      focus: [{ sel: { chain: 'A', ...PROT }, style: S(PA, 1.2) }, { sel: { chain: 'B', ...PROT }, style: ghost(3.6, .12) }, ...DYAD('A', 3.4), DRUGS('A', L3('medicijn', 'medicine'), 1.1, [120, 70])],
      text: L3('Dit medicijn past in dezelfde groef en hecht zich aan het knipmes. Zo zit de schaar vast.', 'This medicine fits into the same groove and attaches to the blade. That locks the scissors.') },
    { dur: 8500, title: L3('Elke helft heeft een eigen groef', 'Each half has its own groove'), zoom: {}, spin: .01,
      focus: [{ sel: { chain: 'A', ...PROT }, style: S(PA, 2.2) }, { sel: { chain: 'B', ...PROT }, style: S(PB, 2.2) }, ...DYAD('A', 3.6, L3('actief centrum 1', 'active site 1')), ...DYAD('B', 3.6, L3('actief centrum 2', 'active site 2')), DRUGS('A', null, 2), DRUGS('B', null, 2)],
      text: L3('Elke helft heeft een eigen knipplek, met elk een medicijn. Het tweede ligt achteraan en draait zo in beeld.', 'Each half has its own cutting site, each with a medicine. The second one lies at the back and turns into view.') },
    { dur: 9000, title: L3('Zonder knippen geen kopieermachine', 'No cutting, no copying machine'), focus: null, zoom: {}, tags: [TAG({ chain: 'A', resi: 250, atom: 'CA' }, 'helft 1', 'half 1', PA), TAG({ chain: 'B', resi: 250, atom: 'CA' }, 'helft 2', 'half 2', PB)], spin: .012,
      text: L3('Blijft de keten heel, dan ontstaat er geen kopieermachine. Het virus kan zich dan veel minder vermenigvuldigen.', 'If the chain stays whole, no copying machine is formed. The virus can then multiply much less.') },
  ],
  hotspots: [
    { node: 'viruskopie', label: L3('↑ De lange keten', '↑ The long chain'), color: '#7fdc6a' },
    { node: 'assemblage', label: L3('Nieuwe virussen bouwen →', 'Building new viruses →'), color: '#ff9d5c' },
    { node: 'proteasoom', label: L3('Vergelijk: de afbraakbuis van de cel', 'Compare: the proteasome'), color: '#9b7bff' },
  ],
});
