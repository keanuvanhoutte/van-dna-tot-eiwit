import { C, cam, FULL } from '../../kit.js';
import { sceneCel } from './_celsvg.js';

export default {
  id: 'cel',
  title: { nl: 'Menselijke cel', en: 'Human cell' },
  scale: '≈ 20 µm', time: { nl: 'minuten – uren', en: 'minutes – hours' },
  org: { nl: 'menselijke epitheelcel', en: 'human epithelial cell' },
  legend: [[C.tdna, { nl: 'viraal DNA / adenovirus', en: 'viral DNA / adenovirus' }], [C.trna, { nl: 'lipidenanodeeltje', en: 'lipid nanoparticle' }], [C.dna, { nl: 'kern-DNA', en: 'nuclear DNA' }], [C.rna, 'mRNA'], [C.rrna, { nl: 'ribosomen', en: 'ribosomes' }], [C.prot, { nl: 'kernporiën', en: 'nuclear pores' }], [C.mem, { nl: 'membranen', en: 'membranes' }], ['#5a3f36', 'mitochondrion'], ['#3d2a5c', { nl: 'lysosoom', en: 'lysosome' }], ['#d7b46a', 'Golgi']],
  simplified: {
    nl: 'Het adenovirus (~90 nm) en het lipidenanodeeltje (~100 nm) zijn sterk vergroot: in werkelijkheid zijn ze honderden keren kleiner dan de cel. mRNA-moleculen en ribosomen zijn symbolen; echte aantallen (miljoenen ribosomen) en groottes zijn niet op schaal. Het cytoskelet toont enkel microtubuli vanuit het centrosoom.',
    en: 'The adenovirus (~90 nm) and the lipid nanoparticle (~100 nm) are greatly enlarged: in reality they are hundreds of times smaller than the cell. mRNA molecules and ribosomes are symbols; real numbers (millions of ribosomes) and sizes are not to scale. The cytoskeleton only shows microtubules radiating from the centrosome.' },
  /* overzicht: geen verhaal met inzoomen, enkel het hele beeld met een korte uitleg (stap 0) */
  overview: { step: 0, dur: 10000, title: { nl: 'Een menselijke cel', en: 'A human cell' },
    text: { nl: 'Kies een route: een virus of mRNA-vaccin komt binnen, of een signaal zet een gen aan. Klik om in te zoomen.',
            en: 'Choose a route: a virus or mRNA vaccine gets in, or a signal switches on a gene. Click to zoom in.' } },
  steps: [
    { dur: 7000, cam: FULL, title: { nl: 'Een menselijke cel', en: 'A human cell' },
      text: { nl: 'Een menselijke cel van ongeveer 20 µm breed. Speel af met ▶ of klik op een onderdeel om in te zoomen.', en: 'A human cell about 20 µm across. Play with ▶ or click a part to zoom in.' } },
    { dur: 7000, cam: cam(800, 460, 1250), title: { nl: 'Wat zit er in de cel?', en: 'What is inside the cell?' },
      text: { nl: 'Een membraan omsluit de celvloeistof. Daarin liggen de organellen, de ‘orgaantjes’ van de cel, zoals de kern.', en: 'A membrane encloses the cell fluid. In it lie the organelles, the cell’s ‘little organs’, such as the nucleus.' } },
    { dur: 8000, cam: cam(330, 480, 820), title: { nl: 'Erfelijke informatie komt binnen', en: 'Genetic information gets in' },
      text: { nl: 'Een virus brengt DNA binnen (boven), een mRNA-vaccin brengt mRNA (onder). De cel slokt beide op in een blaasje.', en: 'A virus brings in DNA (top), an mRNA vaccine brings in mRNA (bottom). The cell swallows both in a small bubble.' } },
    { dur: 8000, cam: cam(440, 350, 720), title: { nl: 'Route 1: DNA naar de kern', en: 'Route 1: DNA to the nucleus' },
      text: { nl: 'Het virus ontsnapt uit het blaasje en reist langs ‘sporen’ in de cel naar de kern. Daar wordt zijn DNA gelezen.', en: 'The virus escapes the bubble and travels along ‘tracks’ in the cell to the nucleus. There its DNA is read.' } },
    { dur: 7000, cam: cam(460, 660, 720), title: { nl: 'Route 2: mRNA meteen naar de ribosomen', en: 'Route 2: mRNA straight to the ribosomes' },
      text: { nl: 'Het mRNA van het vaccin hoeft niet naar de kern: ribosomen lezen het meteen en maken er eiwit van.', en: 'The vaccine mRNA does not need the nucleus: ribosomes read it straight away and make protein from it.' } },
    { dur: 7000, cam: cam(790, 470, 640), title: { nl: 'In de kern ligt het DNA', en: 'The DNA lies in the nucleus' },
      text: { nl: 'In de kern wordt van een gen een RNA-kopie gemaakt. Klik op de kern om in te zoomen.', en: 'In the nucleus, an RNA copy is made of a gene. Click the nucleus to zoom in.' } },
    { dur: 7000, cam: cam(1080, 450, 700), title: { nl: 'Ribosomen maken eiwit', en: 'Ribosomes make protein' },
      text: { nl: 'Het mRNA verlaat de kern. Ribosomen lezen het en bouwen er het eiwit mee.', en: 'The mRNA leaves the nucleus. Ribosomes read it and use it to build the protein.' } },
  ],
  svg: sceneCel,
};
