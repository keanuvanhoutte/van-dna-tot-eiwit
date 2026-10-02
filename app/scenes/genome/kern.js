import { C, cam, FULL } from '../../kit.js';
import { sceneKern } from './_kernsvg.js';

export default {
  id: 'kern',
  title: { nl: 'Celkern', en: 'Nucleus' },
  scale: '≈ 8 µm', time: { nl: 'seconden – minuten', en: 'seconds – minutes' },
  org: { nl: 'menselijke cel', en: 'human cell' },
  legend: [[C.dna, { nl: 'chromatine', en: 'chromatin' }], ['#27457e', { nl: 'heterochromatine', en: 'heterochromatin' }], [C.rrna, { nl: 'nucleolus / ribosomen', en: 'nucleolus / ribosomes' }], [C.prot, { nl: 'kernporiën & Pol II', en: 'nuclear pores & Pol II' }], [C.rna, 'mRNA'], [C.tdna, { nl: 'adenovirus-DNA', en: 'adenovirus DNA' }]],
  simplified: {
    nl: 'Het aantal kernporiën is veel groter dan getekend (enkele duizenden per menselijke kern, afhankelijk van het celtype). De "kerstboom" bij de transcriptieplaats is gebaseerd op elektronenmicroscopie (Miller-preparaten): RNA\'s worden langer richting het einde van het gen. Het adenovirus-DNA gaat in werkelijkheid als lineair genoom met eiwitten door de porie nadat het capside aan de porie uiteenvalt; de plek in de kern is willekeurig gekozen.',
    en: 'There are far more nuclear pores than drawn (several thousand per human nucleus, depending on the cell type). The "Christmas tree" at the transcription site is based on electron microscopy (Miller spreads): RNAs get longer towards the end of the gene. In reality the adenovirus DNA passes through the pore as a linear, protein-bound genome after the capsid disassembles at the pore; its position in the nucleus is arbitrary.' },
  /* overzicht: geen verhaal met inzoomen, enkel het hele beeld met een korte uitleg (stap 0) */
  overview: { step: 0, dur: 10000, title: { nl: 'De celkern', en: 'The nucleus' },
    text: { nl: 'Hier ligt het DNA, en hier worden genen gekopieerd naar RNA. Klik op een onderdeel om in te zoomen.',
            en: 'This is where the DNA lies and where genes are copied into RNA. Click any part to zoom in.' } },
  steps: [
    { dur: 6500, cam: FULL, title: { nl: 'De kern bewaart al het DNA', en: 'The nucleus holds all the DNA' },
      text: { nl: 'Hier liggen 46 chromosomen: samen ongeveer 2 meter DNA, in een bolletje van ~8 µm.', en: 'It holds 46 chromosomes: about 2 metres of DNA in total, in a ball of ~8 µm.' } },
    { dur: 7000, cam: cam(420, 430, 700), title: { nl: 'Poorten in de kernwand', en: 'Gates in the nuclear wall' },
      text: { nl: 'Twee membranen omhullen de kern. Bijna alles gaat in en uit via kleine poorten: de kernporiën.', en: 'Two membranes surround the nucleus. Almost everything goes in and out through small gates: the nuclear pores.' } },
    { dur: 7000, cam: cam(620, 560, 820), title: { nl: 'DNA verpakt met eiwitten', en: 'DNA packed with proteins' },
      text: { nl: 'DNA met eiwitten heet chromatine. Open stukken worden afgelezen; compacte stukken liggen vooral aan de rand.', en: 'DNA plus proteins is called chromatin. Open parts are read; compact parts lie mostly at the edge.' } },
    { dur: 6500, cam: cam(715, 440, 560), title: { nl: 'Hier worden ribosomen gebouwd', en: 'Ribosomes are built here' },
      text: { nl: 'In de nucleolus wordt het meeste RNA voor ribosomen gemaakt. Ook de twee delen van het ribosoom ontstaan hier.', en: 'In the nucleolus most of the RNA for ribosomes is made. The two parts of the ribosome are also put together here.' } },
    { dur: 7500, cam: cam(955, 320, 560), title: { nl: 'Eén gen, veel kopieën tegelijk', en: 'One gene, many copies at once' },
      text: { nl: 'Veel enzymen lezen hetzelfde gen tegelijk af. Hoe verder op het gen, hoe langer hun RNA al is.', en: 'Many enzymes read the same gene at once. The further along the gene, the longer their RNA already is.' } },
    { dur: 7000, cam: cam(1180, 300, 820), title: { nl: 'Het mRNA gaat naar buiten', en: 'The mRNA goes out' },
      text: { nl: 'Het afgewerkte mRNA verlaat de kern via een kernporie, op weg naar de ribosomen.', en: 'The finished mRNA leaves the nucleus through a nuclear pore, on its way to the ribosomes.' } },
    { dur: 7000, cam: cam(470, 490, 720), title: { nl: 'Virus-DNA in de kern', en: 'Virus DNA in the nucleus' },
      text: { nl: 'Het DNA van een virus (adenovirus) blijft los van de chromosomen. Toch leest de cel het gewoon af.', en: 'The DNA of a virus (adenovirus) stays separate from the chromosomes. Even so, the cell simply reads it.' } },
  ],
  svg: sceneKern,
};
