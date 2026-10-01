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
    text: { nl: 'Kies je route: een virus of mRNA-vaccin brengt genetische informatie binnen, of een signaalmolecule zet een gen aan. Klik op een onderdeel om in te zoomen.',
            en: 'Choose your route: a virus or mRNA vaccine brings in genetic information, or a signal molecule switches on a gene. Click any part to zoom in.' } },
  steps: [
    { dur: 7000, cam: FULL, title: { nl: 'Een menselijke cel', en: 'A human cell' },
      text: { nl: 'Een menselijke epitheelcel, ongeveer 20 µm breed. Volg het verhaal met ▶ of klik zelf op een onderdeel om in te zoomen.', en: 'A human epithelial cell, about 20 µm across. Follow the story with ▶ or click a part yourself to zoom in.' } },
    { dur: 7000, cam: cam(800, 460, 1250), title: { nl: 'Membraan en organellen', en: 'Membrane and organelles' },
      text: { nl: 'Het plasmamembraan omsluit de celvloeistof (het cytosol) met de organellen: kern, ruw ER, Golgi-apparaat, mitochondriën en lysosomen.', en: 'The plasma membrane encloses the cell fluid (the cytosol) with the organelles: nucleus, rough ER, Golgi apparatus, mitochondria and lysosomes.' } },
    { dur: 8000, cam: cam(330, 480, 820), title: { nl: 'Genetische informatie komt binnen', en: 'Genetic information enters' },
      text: { nl: 'Twee routes: een adenovirus brengt DNA binnen (boven), een mRNA-vaccin brengt mRNA (onder). De cel slokt beide op in een blaasje: endocytose.', en: 'Two routes: an adenovirus brings in DNA (top), an mRNA vaccine brings in mRNA (bottom). The cell swallows both in a vesicle: endocytosis.' } },
    { dur: 8000, cam: cam(440, 350, 720), title: { nl: 'Route 1: DNA naar de kern', en: 'Route 1: DNA to the nucleus' },
      text: { nl: 'Het virus ontsnapt uit het blaasje en reist over microtubuli (de ‘sporen’ van de cel) naar een kernporie. Het DNA moet de kern in om afgelezen te worden.', en: 'The virus escapes the vesicle and travels along microtubules (the cell’s ‘tracks’) to a nuclear pore. The DNA must enter the nucleus to be read.' } },
    { dur: 7000, cam: cam(460, 660, 720), title: { nl: 'Route 2: mRNA meteen naar de ribosomen', en: 'Route 2: mRNA straight to the ribosomes' },
      text: { nl: 'mRNA uit het nanodeeltje hoeft niet naar de kern: ribosomen in het cytosol lezen het meteen en maken er eiwit van.', en: 'mRNA from the nanoparticle does not need the nucleus: ribosomes in the cytosol read it straight away and make protein from it.' } },
    { dur: 7000, cam: cam(790, 470, 640), title: { nl: 'De kern: hier ligt het genoom', en: 'The nucleus: home of the genome' },
      text: { nl: 'In de kern wordt DNA overgeschreven naar RNA. Klik op de kern om in te zoomen.', en: 'In the nucleus DNA is transcribed into RNA. Click the nucleus to zoom in.' } },
    { dur: 7000, cam: cam(1080, 450, 700), title: { nl: 'Ribosomen maken eiwit', en: 'Ribosomes make protein' },
      text: { nl: 'Het mRNA verlaat de kern. Ribosomen, vrij in het cytosol of op het ruw ER, lezen het en bouwen het eiwit.', en: 'The mRNA leaves the nucleus. Ribosomes, free in the cytosol or on the rough ER, read it and build the protein.' } },
  ],
  svg: sceneCel,
};
