import { C, L, T2, svgOpen, cam, sub, ease, lerp, clamp, f1, rng } from '../../kit.js';
import { T, TL, smooth, chain, enz, tag, arrowDefs, arr, panel, spark, lerpPts, ATPC, blob } from './_b_kit.js';
import { ribosoom80S, vouwing, strengPijl } from '../../bio.js';

/* Paneel A (x 0–1600): Hsp70-cyclus · Paneel B (x 1700–3300): chaperonine (GroEL–GroES) · Paneel C (x 3400–5000): netwerk */
const HYD = '#ff9f43';                                   // hydrofoob segment
const HINGE = [992, 440];                               // scharnier van het deksel (SBDα) op het SBDβ-domein
const CH_FREE = [[300, 250], [380, 330], [520, 300], [640, 360], [760, 320], [880, 330], [990, 320], [1080, 360], [1150, 330]];
const CH_BOUND = [[300, 250], [380, 330], [520, 300], [640, 350], [760, 390], [880, 398], [990, 398], [1080, 420], [1150, 395]];
const CX = 2500, EQ = 470;                               // chaperonine: middenas en evenaar

const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });

export default {
  id: 'chaperones',
  title: { nl: 'Chaperones', en: 'Molecular chaperones' },
  scale: { nl: '≈ 5–20 nm (GroEL–GroES ≈ 14 × 19 nm)', en: '≈ 5–20 nm (GroEL–GroES ≈ 14 × 19 nm)' },
  time: { nl: 'GroEL-kooi ≈ 10 s per ronde · vouwen met Hsp70 (proefbuis): minuten of langer', en: 'GroEL cage ≈ 10 s per round · folding with Hsp70 (test tube): minutes or longer' },
  org: { nl: 'mens (Hsp70, Hsp90, TRiC); GroEL–GroES als bacterieel model', en: 'human (Hsp70, Hsp90, TRiC); GroEL–GroES as bacterial model' },
  legend: [[C.chain, { nl: 'nieuwe polypeptideketen', en: 'new polypeptide chain' }], [HYD, { nl: 'hydrofoob segment', en: 'hydrophobic segment' }], [C.prot, 'Hsp70 · GroEL'], [C.prot2, { nl: 'co-chaperones (Hsp40, NEF) · GroES', en: 'co-chaperones (Hsp40, NEF) · GroES' }], [ATPC, 'ATP / ADP'], [C.rrna, { nl: 'ribosoom', en: 'ribosome' }]],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">3D: GroEL–GroES–(ADP)7, PDB <a href="https://www.rcsb.org/structure/1AON" target="_blank" rel="noopener">1AON</a> (E. coli).</p><p style="font-size:13px;color:#93a0bb">Netwerk: Hsp70 + Hsp40 helpen veel nieuwe ketens; chaperoninen (mens: TRiC/CCT) een deel; Hsp90 rijpt o.a. kinasen en steroïdreceptoren. Wat blijvend misvouwt, wordt via een E3 (bv. CHIP) gemerkt voor afbraak; faalt alles, dan aggregeert het.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">3D: GroEL–GroES–(ADP)7, PDB <a href="https://www.rcsb.org/structure/1AON" target="_blank" rel="noopener">1AON</a> (E. coli).</p><p style="font-size:13px;color:#93a0bb">Network: Hsp70 + Hsp40 help many new chains; chaperonins (human: TRiC/CCT) a subset; Hsp90 matures e.g. kinases and steroid receptors. What stays misfolded is tagged for degradation via an E3 (e.g. CHIP); if everything fails, it aggregates.</p>' },
  simplified: {
    nl: 'Hsp70 is getekend als nucleotide-bindend domein (NBD) plus substraatbindend domein met een helixdeksel; de echte vorm is complexer. Het chaperonine is in doorsnede getekend met 2 van de 7 subeenheden per ring. In menselijke cellen vervult TRiC/CCT (8 verschillende subeenheden per ring, ingebouwd deksel) die rol in het cytosol; GroEL–GroES (E. coli) is het best bestudeerde model en wordt hier getoond. Hsp90 wordt enkel in het netwerk vermeld. In bacteriën heten de tegenhangers van het 80S-ribosoom en Hsp70 het 70S-ribosoom en DnaK.',
    en: 'Hsp70 is drawn as a nucleotide-binding domain (NBD) plus a substrate-binding domain with a helical lid; the real shape is more complex. The chaperonin is drawn in cross-section showing 2 of the 7 subunits per ring. In human cells TRiC/CCT (8 different subunits per ring, built-in lid) plays this role in the cytosol; GroEL–GroES (E. coli) is the best-studied model and is shown here. Hsp90 is only mentioned in the network. In bacteria the counterparts of the 80S ribosome and Hsp70 are the 70S ribosome and DnaK.' },
  /* "Wat zie je?" (zijpaneel): elk onderdeel van de figuur in één zin — d = eenvoudig, p = vaktaal (hoger) */
  parts: [
    { c: C.rrna, t: { nl: 'ribosoom', en: 'ribosome' }, m: ['mens 80S · bacterie 70S', 'human 80S · bacteria 70S'], d: { nl: 'De eiwitfabriek. Hier komt de nieuwe keten uit.', en: 'The protein factory. The new chain comes out of it.' },
      p: { nl: '80S-ribosoom (bacterie: 70S); de naar buiten komende keten wordt al cotranslationeel door chaperones gebonden.', en: '80S ribosome (bacteria: 70S); the emerging chain is already bound co-translationally by chaperones.' } },
    { c: C.chain, t: { nl: 'nieuwe keten', en: 'new chain' }, m: ['vrij → vouwen of opnieuw binden', 'free → fold or bind again'], d: { nl: 'De groene draad: een pas gemaakte eiwitketen die nog moet vouwen.', en: 'The green strand: a newly made protein chain that still has to fold.' },
      p: { nl: 'Naar buiten komend polypeptide; na loslaten door Hsp70 vouwt het of wordt het opnieuw gebonden (meerdere cycli).', en: 'Nascent polypeptide; after release by Hsp70 it folds or is bound again (several cycles).' } },
    { c: HYD, t: { nl: 'hydrofoob segment', en: 'hydrophobic segment' }, m: ['hydrofoob segment blootgesteld', 'hydrophobic segment exposed'], d: { nl: 'Het oranje stuk mijdt water (waterschuw). Ligt het bloot, dan kan het aan andere ketens blijven plakken.', en: 'The orange stretch avoids water. If it is exposed, it can stick to other chains.' },
      p: { nl: 'Blootgesteld hydrofoob segment; dit is het motief dat Hsp70 herkent en dat zonder bescherming aggregatie veroorzaakt.', en: 'Exposed hydrophobic segment; this is the motif Hsp70 recognises and that causes aggregation if unprotected.' } },
    { c: C.danger, t: { nl: 'aggregaat', en: 'aggregate' }, m: ['aggregatie', 'aggregation'], d: { nl: 'Ketens die aan elkaar plakken tot een klont. Zo’n klont werkt niet meer en kan de cel schaden.', en: 'Chains that stick together into a clump. Such a clump no longer works and can harm the cell.' },
      p: { nl: 'Intermoleculaire associatie van blootgestelde hydrofobe segmenten tot niet-functionele aggregaten.', en: 'Intermolecular association of exposed hydrophobic segments into non-functional aggregates.' } },
    { c: '#8a93a8', t: { nl: 'drukke cel', en: 'crowded cell' }, m: ['zeer vol: overal andere eiwitten en grote moleculen', 'very crowded: other proteins and large molecules everywhere'], d: { nl: 'De grijze bolletjes: de cel zit propvol andere eiwitten. Daardoor botsen ketens vaak tegen elkaar.', en: 'The grey dots: the cell is packed with other proteins. That makes chains bump into each other often.' },
      p: { nl: 'Macromoleculaire verdringing (crowding) in het cytosol verhoogt de kans op aggregatie.', en: 'Macromolecular crowding in the cytosol increases the risk of aggregation.' } },
    { c: C.prot, t: 'Hsp70', m: ['bacterie: DnaK', 'bacteria: DnaK', 'Hsp70 + Hsp40'], d: { nl: 'Een vouwhelper (chaperone) die het waterschuwe stuk even vastklemt, zodat het niet klontert. In bacteriën heet hij DnaK.', en: 'A folding helper (chaperone) that briefly clamps the water-avoiding stretch so it does not clump. In bacteria it is called DnaK.' },
      p: { nl: 'Hsp70-chaperone (bacterie: DnaK); bindt hydrofobe segmenten in een ATP-gereguleerde cyclus van binden en loslaten.', en: 'Hsp70 chaperone (bacteria: DnaK); binds hydrophobic segments in an ATP-regulated cycle of binding and release.' } },
    { c: C.prot, t: 'NBD', d: { nl: 'Het grote deel van de vouwhelper waar de brandstof ATP in zit.', en: 'The large part of the folding helper that holds the fuel ATP.' },
      p: { nl: 'Nucleotide-bindend domein van Hsp70; de ATP- of ADP-toestand ervan stuurt allosterisch het substraatbindend domein.', en: 'Nucleotide-binding domain of Hsp70; its ATP or ADP state allosterically controls the substrate-binding domain.' } },
    { c: C.prot, t: 'SBDβ', d: { nl: 'Het kleinere deel met een groef waarin het waterschuwe stuk van de keten komt te liggen.', en: 'The smaller part with a groove in which the water-avoiding stretch of the chain comes to lie.' },
      p: { nl: 'β-sandwich-subdomein van het substraatbindend domein; bindt het hydrofobe peptidesegment.', en: 'β-sandwich subdomain of the substrate-binding domain; binds the hydrophobic peptide segment.' } },
    { c: C.prot, t: { nl: 'deksel', en: 'lid' }, d: { nl: 'Klapt dicht over de keten en houdt die vast. Met ATP staat het open, met ADP is het dicht.', en: 'Snaps shut over the chain and holds it. With ATP it is open, with ADP it is closed.' },
      p: { nl: 'α-helixdeksel (SBDα); sluit na ATP-hydrolyse over het gebonden substraat.', en: 'α-Helical lid (SBDα); closes over the bound substrate after ATP hydrolysis.' } },
    { c: ATPC, t: 'ATP', m: ['ADP', '7 ATP', '7 ADP'], d: { nl: 'De brandstof van de cel. Als ATP gesplitst wordt, blijft ADP over; dat verandert de vorm van de helper.', en: 'The cell’s fuel. When ATP is split, ADP remains; this changes the shape of the helper.' },
      p: { nl: 'Nucleotiden die de conformatie sturen: ATP-hydrolyse en ATP/ADP-uitwisseling drijven de cycli van Hsp70 en GroEL.', en: 'Nucleotides that control the conformation: ATP hydrolysis and ATP/ADP exchange drive the cycles of Hsp70 and GroEL.' } },
    { c: C.ok, t: { nl: 'hoge affiniteit', en: 'high affinity' }, m: ['lage affiniteit', 'low affinity'], d: { nl: 'Hoe stevig de helper de keten vasthoudt: los met ATP, stevig met ADP.', en: 'How tightly the helper holds the chain: loosely with ATP, tightly with ADP.' },
      p: { nl: 'ATP-toestand: lage affiniteit en snelle uitwisseling van substraat; ADP-toestand: hoge affiniteit, trage uitwisseling.', en: 'ATP state: low affinity and fast substrate exchange; ADP state: high affinity, slow exchange.' } },
    { c: C.prot2, t: 'Hsp40', d: { nl: 'Een hulpje dat de keten naar de vouwhelper brengt en hem zijn ATP laat splitsen.', en: 'A helper that brings the chain to the folding helper and makes it split its ATP.' },
      p: { nl: 'J-domeineiwit (co-chaperone); levert substraat aan en stimuleert de ATPase-activiteit van Hsp70.', en: 'J-domain protein (co-chaperone); delivers substrate and stimulates the ATPase activity of Hsp70.' } },
    { c: C.prot2, t: 'NEF', d: { nl: 'Een hulpje dat ADP vervangt door nieuw ATP. Daardoor gaat het deksel weer open.', en: 'A helper that replaces ADP with new ATP. This makes the lid open again.' },
      p: { nl: 'Nucleotide-uitwisselingsfactor; versnelt het vrijkomen van ADP, waarna ATP bindt en het substraat loskomt.', en: 'Nucleotide exchange factor; speeds up ADP release, after which ATP binds and the substrate is released.' } },
    { c: C.prot, t: 'GroEL', m: ['GroEL: 2 ringen × 7 subeenheden (doorsnede)', 'GroEL: 2 rings × 7 subunits (cross-section)'], d: { nl: 'Een vouwkooi uit bacteriën: twee ringen rug aan rug. Je ziet een doorsnede, dus maar twee van de zeven stukken per ring.', en: 'A folding cage from bacteria: two rings back to back. You see a cross-section, so only two of the seven pieces per ring.' },
      p: { nl: 'Chaperonine van E. coli: twee heptamere ringen met elk een centrale holte; elke subeenheid heeft een equatoriaal, intermediair en apicaal domein.', en: 'E. coli chaperonin: two heptameric rings, each with a central cavity; every subunit has an equatorial, intermediate and apical domain.' } },
    { c: HYD, t: { nl: 'hydrofobe plaatsen', en: 'hydrophobic sites' }, d: { nl: 'Waterschuwe plekken aan de rand van de open ring. Daarmee vangt de kooi de ongevouwen keten.', en: 'Water-avoiding spots on the rim of the open ring. With these the cage catches the unfolded chain.' },
      p: { nl: 'Hydrofobe residuen op de apicale domeinen die niet-natieve substraten binden.', en: 'Hydrophobic residues on the apical domains that bind non-native substrates.' } },
    { c: C.prot2, t: 'GroES', d: { nl: 'Het deksel van de kooi. Het gaat erop zodra ATP gebonden is.', en: 'The lid of the cage. It goes on as soon as ATP is bound.' },
      p: { nl: 'Heptamere co-chaperonine; bindt ATP-afhankelijk op de cis-ring en sluit de holte af.', en: 'Heptameric co-chaperonin; binds the cis ring in an ATP-dependent manner and seals the cavity.' } },
    { c: '#5fd3e6', t: { nl: 'hydrofiele wand', en: 'hydrophilic wall' }, m: ['~10 s alleen in de kooi', '~10 s alone in the cage'], d: { nl: 'Als het deksel erop zit, wordt de binnenwand waterminnend. De keten vouwt dan ongeveer 10 seconden alleen, zonder te klonteren.', en: 'Once the lid is on, the inner wall turns water-loving. The chain then folds alone for about 10 seconds, without clumping.' },
      p: { nl: 'Bij GroES-binding draaien de apicale domeinen en wordt de holte hydrofiel; het substraat vouwt ~10 s in afzondering (Anfinsen-kooi).', en: 'On GroES binding the apical domains rotate and the cavity becomes hydrophilic; the substrate folds for ~10 s in isolation (Anfinsen cage).' } },
    { c: C.muted, t: 'cis', m: ['trans'], d: { nl: 'Cis is de ring met het deksel erop; trans is de andere ring eronder.', en: 'Cis is the ring with the lid on; trans is the other ring below.' },
      p: { nl: 'Cis-ring: GroES- en nucleotidegebonden; ATP-binding aan de trans-ring zet het vrijkomen van GroES, ADP en substraat uit de cis-ring in gang.', en: 'Cis ring: GroES- and nucleotide-bound; ATP binding to the trans ring triggers release of GroES, ADP and substrate from the cis ring.' } },
    { c: C.ok, t: { nl: 'natief eiwit', en: 'native protein' }, m: ['natief eiwit vrij', 'native protein released'], d: { nl: 'Het goed gevouwen, werkende eiwit.', en: 'The correctly folded, working protein.' },
      p: { nl: 'Eiwit in zijn natieve, functionele conformatie.', en: 'Protein in its native, functional conformation.' } },
    { c: C.prot, t: { nl: 'chaperonine', en: 'chaperonin' }, m: ['TRiC/CCT', 'mens: TRiC/CCT (2 × 8 verschillende subeenheden, ingebouwd deksel)', 'human: TRiC/CCT (2 × 8 different subunits, built-in lid)'], d: { nl: 'De menselijke vouwkooi (TRiC). Ze lijkt op die van bacteriën, maar heeft acht verschillende stukken per ring en een ingebouwd deksel.', en: 'The human folding cage (TRiC). It resembles the bacterial one, but has eight different pieces per ring and a built-in lid.' },
      p: { nl: 'Groep II-chaperonine van het eukaryote cytosol (TRiC/CCT): 2 × 8 paraloge subeenheden met ingebouwd apicaal deksel.', en: 'Group II chaperonin of the eukaryotic cytosol (TRiC/CCT): 2 × 8 paralogous subunits with a built-in apical lid.' } },
    { c: C.prot2, t: 'Hsp90', d: { nl: 'Een vouwhelper voor de laatste stap: hij brengt bepaalde eiwitten in hun werkende vorm.', en: 'A folding helper for the last step: it brings certain proteins into their working form.' },
      p: { nl: 'Hsp90 zorgt voor de late rijping van o.a. kinasen en steroïdreceptoren.', en: 'Hsp90 handles the late maturation of e.g. kinases and steroid receptors.' } },
    { c: '#ffd166', t: { nl: 'afbraak', en: 'degradation' }, d: { nl: 'Wat ondanks alle hulp niet goed vouwt, krijgt een label en wordt afgebroken.', en: 'Whatever fails to fold despite all the help gets a tag and is broken down.' },
      p: { nl: 'Blijvend misgevouwen substraten worden via een E3-ligase (bv. CHIP) geubiquitineerd en door het proteasoom afgebroken.', en: 'Persistently misfolded substrates are ubiquitinated via an E3 ligase (e.g. CHIP) and degraded by the proteasome.' } },
    { c: C.text, t: { nl: 'Proteostase', en: 'Proteostasis' }, m: ['Proteostase: vouwen, bewaken of afbreken', 'Proteostasis: fold, guard or degrade'], d: { nl: 'Het hele netwerk dat ervoor zorgt dat eiwitten goed gevouwen worden, bewaakt worden of opgeruimd worden.', en: 'The whole network that makes sure proteins are folded correctly, kept in check or cleared away.' },
      p: { nl: 'Proteostasenetwerk: geïntegreerd systeem van chaperones en afbraakroutes dat het proteoom in balans houdt.', en: 'Proteostasis network: integrated system of chaperones and degradation pathways that keeps the proteome in balance.' } },
  ],
  steps: [
    ST(8000, cam(760, 420, 1600), 'Het gevaar: klonteren', 'The danger: clumping',
      'Een nieuwe keten heeft waterschuwe stukken. In de drukke cel kunnen die aan andere ketens blijven plakken.',
      'A new chain has water-avoiding stretches. In the crowded cell they can stick to other chains.'),
    ST(8000, cam(850, 440, 1050), 'Een vouwhelper met een deksel', 'A folding helper with a lid',
      'Hsp70 is een vouwhelper (chaperone). Met ATP staat zijn deksel open; een hulpje brengt het waterschuwe stuk.',
      'Hsp70 is a folding helper (chaperone). With ATP its lid is open; a helper brings the water-avoiding stretch.'),
    ST(8000, cam(870, 440, 950), 'Het deksel gaat dicht', 'The lid closes',
      'Hsp70 splitst zijn ATP. Dan klemt het deksel het stuk vast, zodat het niet kan klonteren.',
      'Hsp70 splits its ATP. Then the lid clamps the stretch, so it cannot clump.'),
    ST(8000, cam(880, 420, 1050), 'Het deksel gaat weer open', 'The lid opens again',
      'Een ander eiwit ruilt ADP voor nieuw ATP. Het deksel gaat open: de keten komt vrij en kan vouwen.',
      'Another protein swaps ADP for new ATP. The lid opens: the chain is released and can fold.'),
    ST(7500, cam(2500, 458, 1350), 'Een vouwkooi', 'A folding cage',
      'Sommige eiwitten vouwen in een gesloten kooi (chaperonine): twee ringen rug aan rug. Hier: een bacteriële.',
      'Some proteins fold in a closed cage (chaperonin): two rings back to back. Shown here: a bacterial one.'),
    ST(7500, cam(2500, 420, 1250), 'De keten wordt gevangen', 'The chain is caught',
      'De open ring vangt de ongevouwen keten met waterschuwe plekken aan zijn rand.',
      'The open ring catches the unfolded chain with water-avoiding patches on its rim.'),
    ST(9000, cam(2500, 420, 1250), 'De kooi sluit', 'The cage closes',
      'ATP en een deksel binden. De wand wordt waterminnend: binnenin vouwt de keten alleen, zonder te klonteren.',
      'ATP and a lid bind. The wall turns water-loving: inside, the chain folds alone, without clumping.'),
    ST(8500, cam(2500, 420, 1250), 'De kooi gaat weer open', 'The cage opens again',
      'Na ongeveer 10 seconden gaan deksel en eiwit eruit. Nog niet gevouwen? Dan volgt nog een ronde.',
      'After about 10 seconds, lid and protein are released. Not folded yet? Then another round follows.'),
    ST(8500, cam(4200, 460, 1650), 'Een netwerk van helpers', 'A network of helpers',
      'Verschillende vouwhelpers werken samen. Wat toch niet goed vouwt, wordt afgebroken.',
      'Different folding helpers work together. Whatever still fails to fold is broken down.'),
  ],
  svg() {
    const r = rng(7);
    let crowd = '';
    for (let i = 0; i < 46; i++) { const x = r() * 1600, y = 120 + r() * 700, rr = 14 + r() * 34; if (Math.hypot(x - 850, y - 470) < 280 || (x < 420 && y < 380)) continue; crowd += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(rr)}" fill="#8a93a8" opacity=".09"/>`; }
    // netwerk (paneel C)
    const box = (x, y, w, lab, col, node, sub2) => {
      const b = panel(x - w / 2, y - 48, w, 96, { col }) + T(x, sub2 ? y - 6 : y + 10, lab, { size: 28, col, w: 700 }) + (sub2 ? T(x, y + 30, sub2, { size: 23, col: '#c9d2e4', w: 500 }) : '');
      return node ? `<g data-node="${node}" data-color="${col}" data-label="${L({ nl: '→ ' + { vouwing: 'Eiwitvouwing', ubiquitine: 'Ubiquitine–proteasoom', misvouwing: 'Misvouwing & aggregatie', translatie: 'Translatie' }[node], en: '→ ' + { vouwing: 'Protein folding', ubiquitine: 'Ubiquitin–proteasome', misvouwing: 'Misfolding & aggregation', translatie: 'Translation' }[node] })}">${b}<circle data-anchor="${node}" cx="${node === 'translatie' ? x : x + w / 2 - 10}" cy="${y - 50}" r="1" fill="none"/></g>` : b;
    };
    let net = box(3560, 460, 250, T2('ribosoom', 'ribosome'), C.rrna, 'translatie');
    net += box(3940, 300, 270, 'Hsp70 + Hsp40', C.prot, null);
    net += box(3940, 620, 270, T2('chaperonine', 'chaperonin'), C.prot, null, 'TRiC/CCT');
    net += box(4360, 300, 250, 'Hsp90', C.prot2, null);
    net += box(4760, 460, 250, T2('natief eiwit', 'native protein'), C.ok, 'vouwing');
    net += box(4360, 780, 280, T2('afbraak', 'degradation'), '#ffd166', 'ubiquitine');
    net += box(4760, 780, 250, T2('aggregatie', 'aggregation'), C.danger, 'misvouwing');
    const A = (x0, y0, x1, y1, c = C.muted, b = 0) => arr(x0, y0, x1, y1, c, 'ch-m', { w: 4, bend: b });
    net += A(3690, 430, 3800, 320) + A(3690, 490, 3800, 600) + A(4080, 300, 4230, 300) + A(4485, 300, 4640, 430) + A(4080, 330, 4640, 450, C.muted, .08) + A(4080, 620, 4640, 480) +
      A(3940, 675, 4230, 760, C.muted) + A(4360, 350, 4360, 725, C.muted) + A(4640, 520, 4700, 725, C.danger);
    net += T(4200, 160, T2('Proteostase: vouwen, bewaken of afbreken', 'Proteostasis: fold, guard or degrade'), { size: 31, w: 700 });
    return svgOpen(arrowDefs('ch', { m: C.muted, w: '#fff' })) + `
    ${crowd}
    <g data-node="translatie" data-color="${C.rrna}" data-label="${T2('Ribosoom (translatie)', 'Ribosome (translation)')}">
      <g transform="rotate(-90 300 250)">${ribosoom80S(300, 252, { s: .82 }).svg}</g>
      ${T(255, 400, T2('ribosoom', 'ribosome'), { size: 22, col: C.rrna })}<g id="ch-r70">${T(250, 432, T2('mens 80S · bacterie 70S', 'human 80S · bacteria 70S'), { size: 22, col: C.muted, anchor: 'start' })}</g>
    </g>
    <g data-node="misvouwing" data-color="${C.danger}" data-nolabel><g id="ch-agg"></g></g>
    <g id="ch-hsp"></g>
    <g id="ch-lid"></g>
    <g data-node="vouwing" data-color="${C.chain}" data-label="${T2('Nieuwe keten → vouwing', 'New chain → folding')}"><g id="ch-chain"></g><circle id="ch-chainA" data-anchor="vouwing" r="1" fill="none"/></g>
    <g id="ch-co"></g>
    <g id="ch-lbl"></g>
    <!-- paneel B -->
    <g id="ch-groel"></g>
    <!-- paneel C -->
    ${net}
    </svg>`;
  },
  init(svg) {
    /* NBD: twee lobben + ATP-kloof; SBDβ: β-sandwich (statisch, eenmalig berekend) */
    const NBDFOLD = `<path d="M760,470 Q752,520 760,560" stroke="#0b1224" stroke-width="10" fill="none" opacity=".7"/>` +
      vouwing(708, 575, 52, 62, { col: C.prot, kern: false }) + vouwing(812, 575, 52, 62, { col: C.prot, kern: false, spiegel: true });
    const SBDFOLD = `<g opacity=".45">` + [-24, -6, 12, 30].map((dx, i) => strengPijl(930 + dx, i % 2 ? 422 : 484, 930 + dx, i % 2 ? 484 : 422, { h: 7 })).join('') + '</g>' + [-30, -12, 6, 24].map((dx, i) => strengPijl(930 + dx, i % 2 ? 430 : 492, 930 + dx, i % 2 ? 492 : 430, { h: 7 })).join('') +
      [-21, -3, 15].map(dx => [444, 460, 476].map(yy => `<line x1="${930 + dx - 4}" y1="${yy}" x2="${930 + dx + 4}" y2="${yy}" stroke="#e8edf6" stroke-width="1.4" stroke-dasharray="2 2"/>`).join('')).join('');
    /* opgerold lint langs een willekeurige lijn (voor het deksel) */
    const coilAlong = (P, turns, amp, w) => {
      let bk = '', fr = ''; const n = P.length - 1;
      const q = j => { const a = P[Math.max(0, j - 1)], b = P[Math.min(n, j + 1)], L0 = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, s = Math.sin(j / n * turns * 6.2832) * amp; return [P[j][0] - (b[1] - a[1]) / L0 * s, P[j][1] + (b[0] - a[0]) / L0 * s]; };
      for (let j = 0; j < n; j++) { const [ax, ay] = q(j), [bx, by] = q(j + 1), seg = `M${f1(ax)},${f1(ay)}L${f1(bx)},${f1(by)}`; if (Math.cos((j + .5) / n * turns * 6.2832) >= 0) fr += seg; else bk += seg; }
      return `<path d="${bk}" stroke="#5a4bb8" stroke-width="${w * .65}" stroke-linecap="round" fill="none"/><path d="${fr}" stroke="#0a1224" stroke-width="${w + 3}" stroke-linecap="round" fill="none"/><path d="${fr}" stroke="${C.prot}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
    };
    const $ = id => svg.getElementById(id);
    /* ---- chaperonine: één wand (linkerhelft, bovenring); k = 0 open/trans, 1 = GroES-gebonden (cis) ---- */
    function wall(k, hyd) {
      const out = 38 * k, ang = -38 * k;
      let s = `<rect x="${f1(2250 - out)}" y="${EQ - 70}" width="95" height="66" rx="16" fill="${C.prot}" fill-opacity=".35" stroke="${C.prot}" stroke-width="3"/>`;   // equatoriaal
      s += `<rect x="${f1(2262 - out)}" y="${EQ - 134}" width="80" height="60" rx="16" fill="${C.prot}" fill-opacity=".25" stroke="${C.prot}" stroke-width="3"/>`;  // intermediair
      s += `<g transform="rotate(${f1(ang)} ${f1(2290 - out)} ${EQ - 134})"><rect x="${f1(2262 - out)}" y="${EQ - 214}" width="140" height="76" rx="22" fill="${C.prot}" fill-opacity=".3" stroke="${C.prot}" stroke-width="3"/>` +
        `<rect x="${f1(2390 - out)}" y="${EQ - 204}" width="12" height="56" rx="5" fill="${hyd ? HYD : '#5fd3e6'}"/></g>`;           // apicaal met binnenzijde
      return s;
    }
    const ring = (k, hyd, bottom) => {
      const w = wall(k, hyd);
      const pair = w + `<g transform="translate(${2 * CX} 0) scale(-1 1)">${w}</g>`;
      return bottom ? `<g transform="translate(0 ${2 * EQ}) scale(1 -1)">${pair}</g>` : pair;
    };
    const unf = (cx, cy, s, a = 1) => chain([[cx - 70 * s, cy + 10], [cx - 40 * s, cy - 30], [cx - 10 * s, cy + 20], [cx + 20 * s, cy - 25], [cx + 50 * s, cy + 15], [cx + 75 * s, cy - 15]], { w: 7, op: a });
    const folded = (cx, cy, a = 1) => `<g opacity="${f1(a)}">${blob(f1(cx), f1(cy), 52, 42, { fill: 'rgba(127,220,106,.25)', stroke: C.chain, sw: 4, seed: 103 })}` + chain([[cx - 30, cy], [cx - 10, cy - 22], [cx + 12, cy - 4], [cx + 28, cy - 22], [cx + 30, cy + 14], [cx - 10, cy + 20]], { w: 5, op: .7 }) + '</g>';

    return {
      update(t, s) {
        const { step, p } = s;
        /* ---------- paneel A: Hsp70 ---------- */
        let bind = 0, lid = 0, nuc = 'ATP', h40 = 0, nef = 0, rel = 0;       // lid: 0 open, 1 dicht
        if (step === 1) { bind = ease(sub(p, .2, .75)); h40 = ease(sub(p, 0, .35)); }
        if (step === 2) { bind = 1; h40 = 1 - ease(sub(p, .6, .9)); lid = ease(sub(p, .3, .7)); nuc = p > .3 ? 'ADP' : 'ATP'; }
        if (step === 3) { nef = ease(sub(p, 0, .3)) * (1 - ease(sub(p, .8, 1))); nuc = p < .35 ? 'ADP' : p < .5 ? '' : 'ATP'; lid = 1 - ease(sub(p, .5, .75)); bind = 1 - ease(sub(p, .65, 1)); rel = sub(p, .65, 1); }
        if (step >= 4) { bind = 0; }
        const pts = lerpPts(CH_FREE, CH_BOUND, bind);
        let cs = chain(pts, { w: 8 });
        // hydrofoob segment: tussen punten 5 en 7
        cs += `<path d="${smooth(pts.slice(5, 8))}" stroke="${HYD}" stroke-width="12" fill="none" stroke-linecap="round" opacity=".9"/>`;
        $('ch-chain').innerHTML = cs;
        $('ch-r70').setAttribute('opacity', step === 0 ? 1 : 0);   // enkel in het overzicht (de ingezoomde camera's snijden het af)
        $('ch-chainA').setAttribute('cx', 520); $('ch-chainA').setAttribute('cy', step <= 3 ? 290 : -9999);
        // Hsp70
        // NBD: twee lobben (I en II) met de ATP-kloof ertussen; SBDβ: β-sandwich (strengen met H-bruggen) met de groef voor de keten
        let hs = enz(760, 560, 130, 95, '', {}) + NBDFOLD + T(760, 682, 'NBD', { size: 24, w: 800, col: '#c9b8ff' }) +
          enz(930, 470, 78, 55, '', {}) + SBDFOLD + T(930, 518, 'SBDβ', { size: 19, w: 800, col: '#c9b8ff' });
        hs += tag(760, 530, nuc || '·', ATPC, { fs: 20, op: nuc ? 1 : 0 });
        if (step === 2) hs += spark(760, 530, sub(p, .25, .5));
        if (step === 3 && p > .3 && p < .55) hs += tag(lerp(760, 600, sub(p, .3, .5)), lerp(530, 700, sub(p, .3, .5)), 'ADP', ATPC, { fs: 18, op: 1 - sub(p, .45, .55) });
        if (step === 3 && p > .4 && p < .6) hs += tag(lerp(560, 760, sub(p, .4, .5)), lerp(720, 530, sub(p, .4, .5)), 'ATP', ATPC, { fs: 18 });
        hs += T(615, 480, 'Hsp70', { size: 30, col: C.prot, w: 800, anchor: 'end' }) + T(615, 514, T2('bacterie: DnaK', 'bacteria: DnaK'), { size: 22, col: C.muted, anchor: 'end' });
        $('ch-hsp').innerHTML = step <= 3 ? hs : hs.replace('<g ', '<g ');
        // deksel (SBDα, helixdomein) hangt met zijn scharnier aan SBDβ; open (ATP) = weggeklapt naar rechtsonder,
        // dicht (ADP) = over de keten die in de groef van SBDβ ligt (Mayer & Bukau 2005). Getekend achter de keten.
        const ctl = [lerp(1030, 1062, lid), lerp(505, 338, lid)], end = [lerp(1067, 858, lid), lerp(570, 352, lid)];
        const ld = `M${HINGE[0]},${HINGE[1]} Q${f1(ctl[0])},${f1(ctl[1])} ${f1(end[0])},${f1(end[1])}`;
        // deksel = helixdomein: opgerold lint langs de boog
        const lidPts = Array.from({ length: 49 }, (_, i) => { const u = i / 48, v = 1 - u; return [v * v * HINGE[0] + 2 * v * u * ctl[0] + u * u * end[0], v * v * HINGE[1] + 2 * v * u * ctl[1] + u * u * end[1]]; });
        $('ch-lid').innerHTML = `<path d="${ld}" stroke="${C.prot}" stroke-width="34" stroke-linecap="round" fill="none" opacity=".22"/>` +
          coilAlong(lidPts, 4.5, 12, 11) +
          T(lerp(1105, 940, lid), lerp(560, 318, lid), T2('deksel', 'lid'), { size: 21, col: '#c9b8ff', anchor: lid > .5 ? 'middle' : 'start', op: step === 0 ? 0 : step === 1 ? sub(p, 0, .2) : 1 });
        // co-chaperones
        let co = '';
        if (h40 > .01) co += enz(lerp(700, 850, h40), lerp(300, 380, h40), 70, 36, 'Hsp40', { col: C.prot2, fs: 20, op: h40, fillOp: .5 });
        if (nef > .01) co += enz(lerp(420, 610, nef), lerp(660, 600, nef), 70, 36, 'NEF', { col: C.prot2, fs: 20, op: nef, fillOp: .5 });
        $('ch-co').innerHTML = co;
        // labels
        let lb = '';
        if (step === 0) {
          lb += T(820, 250, T2('hydrofoob segment blootgesteld', 'hydrophobic segment exposed'), { size: 22, col: HYD });
        }
        if (step === 1) lb += tag(1200, 660, T2('lage affiniteit', 'low affinity'), '#8a93a8', { fs: 20, op: sub(p, .5, .7) });
        if (step === 2) lb += tag(1200, 660, T2('hoge affiniteit', 'high affinity'), C.ok, { fs: 20, op: sub(p, .6, .8) });
        if (step === 3) lb += T(1100, 250, T2('vrij → vouwen of opnieuw binden', 'free → fold or bind again'), { size: 22, col: C.chain, op: rel });
        $('ch-lbl').innerHTML = lb;
        // aggregaat (stap 0)
        let ag = '';
        if (step === 0) {
          const k = sub(p, .3, .7);
          ag += chain([[1250, 640], [1300, 600], [1280, 560], [1340, 540], [1330, 600], [1390, 620]], { col: '#8fbf86', w: 7, op: .8 }) + chain([[1270, 540], [1320, 580], [1370, 560], [1360, 500], [1410, 520]], { col: '#6f9a68', w: 7, op: .8 }) +
            chain([[1230, 590], [1290, 620], [1350, 640], [1400, 580]], { col: '#a3c79b', w: 7, op: .8 });
          ag += T(1320, 700, T2('aggregaat', 'aggregate'), { size: 22, col: C.danger, op: k });
          ag += T(760, 800, T2('zeer vol: overal andere eiwitten en grote moleculen', 'very crowded: other proteins and large molecules everywhere'), { size: 24, col: C.muted, op: k });
        }
        $('ch-agg').innerHTML = ag;

        /* ---------- paneel B: GroEL–GroES ---------- */
        let g = '';
        const cisK = step === 6 ? ease(sub(p, .1, .45)) : step === 7 ? 1 - ease(sub(p, .45, .75)) : 0;   // bovenring
        const transK = step === 7 ? ease(sub(p, .45, .75)) * 0 : 0;
        g += ring(cisK, cisK < .5, false) + ring(transK, true, true);
        g += `<line x1="2180" y1="${EQ}" x2="2820" y2="${EQ}" stroke="${C.muted}" stroke-width="2" stroke-dasharray="6 6"/>`;
        // GroES-deksel
        let esY = step === 6 ? lerp(120, EQ - 262, ease(sub(p, .1, .45))) : step === 7 ? lerp(EQ - 262, 60, ease(sub(p, .5, .8))) : 120;
        const esOp = step === 6 ? sub(p, 0, .1) : step === 7 ? 1 - sub(p, .75, .9) : step >= 4 && step < 6 ? 0 : 0;
        if (esOp > .01) g += `<g opacity="${f1(esOp)}"><path d="M${CX - 170},${f1(esY + 50)} C${CX - 150},${f1(esY - 10)} ${CX + 150},${f1(esY - 10)} ${CX + 170},${f1(esY + 50)} Z" fill="${C.prot2}" fill-opacity=".5" stroke="${C.prot2}" stroke-width="3"/>` + T(CX, esY + 34, 'GroES', { size: 22 }) + '</g>';
        // ATP
        const atpOn = step === 6 ? sub(p, .05, .2) : step === 7 ? 1 : 0;
        const adp = step === 7 && p > .3;
        // ADP komt samen met GroES en het eiwit vrij zodra ATP aan de trans-ring bindt (Koike-Takeshita et al., J Biol Chem 2008)
        const nucOp = atpOn * (step === 7 ? 1 - ease(sub(p, .5, .75)) : 1);
        for (const sx of [-1, 1]) g += tag(CX + sx * 205 - (sx * 38 * cisK), EQ - 38, adp ? 'ADP' : 'ATP', ATPC, { fs: 15, op: nucOp });
        if (nucOp > .5) g += T(CX, EQ - 20, adp ? T2('7 ADP', '7 ADP') : T2('7 ATP', '7 ATP'), { size: 20, col: ATPC, w: 800 });
        if (step === 7) { g += tag(CX + 205, EQ + 38, 'ATP', ATPC, { fs: 15, op: sub(p, .35, .45) }) + tag(CX - 205, EQ + 38, 'ATP', ATPC, { fs: 15, op: sub(p, .35, .45) }); g += spark(CX + 205, EQ - 38, sub(p, .1, .35)); }
        // substraat
        if (step === 4) g += unf(CX, 150, 1.2);
        if (step === 5) { const k = ease(sub(p, .1, .6)); g += unf(CX, lerp(150, EQ - 225, k), lerp(1.2, 1.45, k)); }
        if (step === 6) {
          const k = ease(sub(p, .3, .55)), f = ease(sub(p, .55, .95));
          const y = lerp(EQ - 225, EQ - 110, k);
          g += unf(CX, y, lerp(1.45, .6, f), 1 - f) + folded(CX, y, f);
          g += T(CX, EQ - 330 - 30, T2('~10 s alleen in de kooi', '~10 s alone in the cage'), { size: 20, col: C.chain, op: sub(p, .6, .8) });
        }
        if (step === 7) { const y = lerp(EQ - 110, 110, ease(sub(p, .55, .9))); g += folded(CX, y, 1); g += T(CX + 250, 130, T2('natief eiwit vrij', 'native protein released'), { size: 20, col: C.chain, op: sub(p, .8, .95), anchor: 'start' }); }
        // labels paneel B
        g += T(CX, 760, T2('GroEL: 2 ringen × 7 subeenheden (doorsnede)', 'GroEL: 2 rings × 7 subunits (cross-section)'), { size: 22, col: C.prot });
        if (step === 4) g += TL(CX, 830, [T2('mens: TRiC/CCT (2 × 8 verschillende subeenheden, ingebouwd deksel)', 'human: TRiC/CCT (2 × 8 different subunits, built-in lid)')], { size: 20, col: '#c9d2e4', w: 500 });
        if (step === 5) g += T(CX + 290, EQ - 190, T2('hydrofobe plaatsen', 'hydrophobic sites'), { size: 20, col: HYD, anchor: 'start' });
        if (step === 6) g += T(CX + 330, EQ - 150, T2('hydrofiele wand', 'hydrophilic wall'), { size: 20, col: '#5fd3e6', anchor: 'start', op: sub(p, .35, .5) });
        g += T(2160, EQ - 150, 'cis', { size: 20, col: C.muted, anchor: 'end', op: step >= 6 ? 1 : 0 }) + T(2160, EQ + 160, 'trans', { size: 20, col: C.muted, anchor: 'end', op: step >= 6 ? 1 : 0 });
        $('ch-groel').innerHTML = g;
      },
    };
  },
};
