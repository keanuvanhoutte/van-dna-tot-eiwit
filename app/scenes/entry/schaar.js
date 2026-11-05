import { structure3d } from '../../kit3d.js';

/* PDB 7RFW: hoofdprotease (Mpro, 3CLpro, nsp5) van SARS-CoV-2 met nirmatrelvir (PF-07321332, ligand 4WI), röntgen 1,73 Å
 * (Owen et al., Science 2021 — de studie waarin Pfizer nirmatrelvir voorstelde). Eén entiteit: 3C-like proteinase, SARS-CoV-2.
 * Lokale kopie data/pdb/7RFW.cif: biologische eenheid (assembly 1 = dimeer; tweede kopie A-2 hernoemd tot B), ingekort tot
 * CA-atomen + volledige His41 en Cys145 + nirmatrelvir; geen water (4 870 → 776 atomen). Nagekeken in het bestand (05-11-2026):
 * Cys145-SG ligt 1,92 Å van atoom C3 van 4WI (covalente binding), His41-NE2 3,62 Å van Cys145-SG (katalytische dyade). */
const L3 = (nl, en) => ({ nl, en });
const PA = '#b39ddb', PB = '#7e6bd6', SITE = '#ff6b6b', DRUG = '#5fd3e6', GREY = '#33415c';
const S = (color, r = 2.4) => ({ sphere: { color, radius: r } });
const PROT = { atom: 'CA', hetflag: false };
const base = [{ sel: { chain: 'A', ...PROT }, style: S(PA) }, { sel: { chain: 'B', ...PROT }, style: S(PB) }, { sel: { resn: '4WI' }, style: {} }];
const DYAD = (ch, r = 4.2, label) => [{ sel: { chain: ch, resi: [41, 145], atom: 'CA' }, style: S(SITE, r), label }];
const DRUGS = (ch, label) => ({ sel: { chain: ch, resn: '4WI' }, style: { stick: { color: DRUG, radius: .45 }, sphere: { color: DRUG, radius: 1.1 } }, label });

export default structure3d({
  id: 'schaar', pdb: '7RFW',
  title: L3('Een virusschaar knipt de lange keten', 'A virus scissors cuts the long chain'),
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
  steps: [
    { dur: 8000, title: L3('Een virusschaar knipt de lange keten', 'A virus scissors cuts the long chain'), focus: null, zoom: {}, spin: .012,
      text: L3('Dit is de echte schaar van het coronavirus. Ze knipt de lange eiwitketen op minstens elf plaatsen.', 'This is the real scissors of the coronavirus. It cuts the long protein chain in at least eleven places.') },
    { dur: 8500, title: L3('De schaar werkt als paar', 'The scissors work as a pair'), zoom: {}, spin: .01,
      focus: [{ sel: { chain: 'A', ...PROT }, style: S(PA, 2.6) }, { sel: { chain: 'B', ...PROT }, style: S(PB, 2.6) },
        { sel: { chain: 'A', resi: 250, atom: 'CA' }, style: S(PA, 2.6), label: L3('helft 1', 'half 1') }, { sel: { chain: 'B', resi: 250, atom: 'CA' }, style: S(PB, 2.6), label: L3('helft 2', 'half 2') }],
      text: L3('De schaar bestaat uit twee gelijke helften. Alleen samen kunnen ze knippen.', 'The scissors consist of two identical halves. Only together can they cut.') },
    { dur: 9000, title: L3('Het knipmes zit in een groef', 'The blade sits in a groove'), zoom: { chain: 'A', resi: [41, 145, 166, 189] }, spin: .006,
      focus: [{ sel: { chain: 'A', ...PROT }, style: S(PA, 2) }, { sel: { chain: 'B', ...PROT }, style: S(GREY, 1.6) }, ...DYAD('A', 4.2, L3('knipplek', 'cutting site'))],
      text: L3('Twee bouwstenen in een groef doen het knippen. Daar past normaal een stukje van de keten in.', 'Two building blocks in a groove do the cutting. Normally a piece of the chain fits in there.') },
    { dur: 9000, title: L3('Een medicijn blokkeert de schaar', 'A medicine blocks the scissors'), zoom: { chain: 'A', resi: [41, 145, 166, 189] }, spin: .006,
      focus: [{ sel: { chain: 'A', ...PROT }, style: S(PA, 2) }, { sel: { chain: 'B', ...PROT }, style: S(GREY, 1.6) }, ...DYAD('A', 3.4), DRUGS('A', L3('medicijn', 'medicine'))],
      text: L3('Dit medicijn past in dezelfde groef en hecht zich aan het knipmes. Zo zit de schaar vast.', 'This medicine fits into the same groove and attaches to the blade. That locks the scissors.') },
    { dur: 8500, title: L3('Elke helft heeft een eigen groef', 'Each half has its own groove'), zoom: {}, spin: .01,
      focus: [{ sel: { chain: 'A', ...PROT }, style: S(PA, 2.2) }, { sel: { chain: 'B', ...PROT }, style: S(PB, 2.2) }, ...DYAD('A', 3.4), ...DYAD('B', 3.4), DRUGS('A'), DRUGS('B')],
      text: L3('Elke helft heeft een eigen knipplek. In deze structuur zit in allebei een medicijn.', 'Each half has its own cutting site. In this structure both hold a medicine.') },
    { dur: 9000, title: L3('Zonder knippen geen kopieermachine', 'No cutting, no copying machine'), focus: null, zoom: {}, spin: .012,
      text: L3('Blijft de keten heel, dan ontstaat er geen kopieermachine. Het virus kan zich dan veel minder vermenigvuldigen.', 'If the chain stays whole, no copying machine is formed. The virus can then multiply much less.') },
  ],
  hotspots: [
    { node: 'viruskopie', label: L3('↑ De lange keten', '↑ The long chain'), color: '#7fdc6a' },
    { node: 'assemblage', label: L3('Nieuwe virussen bouwen →', 'Building new viruses →'), color: '#ff9d5c' },
    { node: 'proteasoom', label: L3('Vergelijk: de afbraakbuis van de cel', 'Compare: the cell’s breakdown tube'), color: '#9b7bff' },
  ],
});
