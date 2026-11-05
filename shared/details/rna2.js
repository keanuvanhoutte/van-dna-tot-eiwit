/* Uitleg per knoop voor het zijpad "Het leven van een RNA" (05-11-2026) — zie app/SCENES.md.
 * Nagekeken in docs/verificatie-ronde-11-rna-lot.md. */
const S = (ref, nl, en, url) => ({ t: { nl: `${ref} — ${nl}`, en: `${ref} — ${en}` }, url });
const PM = id => `https://pubmed.ncbi.nlm.nih.gov/${id}/`, PMC = id => `https://pmc.ncbi.nlm.nih.gov/articles/${id}/`;
const KISL = S('Kislauskis, Zhu & Singer (1994) J Cell Biol 127:441', 'het adreslabel van 54 letters in het β-actine-mRNA (kippenembryocellen)', 'the 54-letter address label in β-actin mRNA (chicken embryo cells)', 'https://rupress.org/jcb/article/127/2/441/20281/');
const HUTT = S('Hüttelmaier et al. (2005) Nature 438:512 (PubMed 16306994)', 'ZBP1 houdt de translatie tegen tot het aan de rand loslaat', 'ZBP1 holds back translation until it lets go at the edge', PM(16306994));
const LION = S('Lionnet et al. (2011) Nat Methods 8:165 (PMC)', 'muis met gemerkt β-actine-mRNA; losse mRNA’s in zenuwcellen gevolgd', 'mouse with labelled β-actin mRNA; single mRNAs followed in nerve cells', PMC('PMC3076588'));
const MART = S('Martin & Ephrussi (2009) Cell 136:719 (PMC)', 'overzicht: adreslabels, lezende eiwitten, motoren en sporen', 'review: address labels, reader proteins, motors and tracks', PMC('PMC2819924'));
const HOLT = S('Holt, Martin & Schuman (2019) Nat Struct Mol Biol 26:557', 'lokale translatie in zenuwcellen', 'local translation in nerve cells', 'https://doi.org/10.1038/s41594-019-0263-5');
const NUNEZ = S('Núñez et al. (2022) Tagged actin mRNA dysregulation in IGF2BP1 mice. Proc Natl Acad Sci USA 119:e2208465119 (PMC)', 'ZBP1 (kip) is hetzelfde eiwit als IGF2BP1/IMP1 bij zoogdieren', 'ZBP1 (chicken) is the same protein as IGF2BP1/IMP1 in mammals', PMC('PMC9477413'));
const KED = S('Kedersha et al. (1999) J Cell Biol 147:1431 (PMC)', 'hitte doet stressgranules ontstaan in menselijke cellen; na de stress verdwijnen ze', 'heat makes stress granules form in human cells; after the stress they disappear', PMC('PMC2174242'));
const ENGR = S('Engreitz et al. (2016) Nature 539:452 (PMC)', 'soms regelt het afschrijven zelf een buurgen, niet het RNA', 'sometimes the act of transcription itself, not the RNA, regulates a neighbouring gene', PMC('PMC6853796'));
const PROT = S('Protter & Parker (2016) Trends Cell Biol 26:668 (PMC)', 'eigenschappen van stressgranules', 'properties of stress granules', PMC('PMC4993645'));
const HUB = S('Hubstenberger et al. (2017) Mol Cell 68:144 (PubMed 28965817)', 'gezuiverde P-bodies: mRNA’s onderdrukt, niet afgebroken', 'purified P-bodies: mRNAs repressed, not degraded', PM(28965817));
const COUR = S('Courel et al. (2019) eLife 8:e49708', 'P-bodies bij de mens: vooral bewaren', 'P-bodies in humans: mainly storage', 'https://elifesciences.org/articles/49708');
const LI = S('Li et al. (2013) J Cell Biol 201:361 (PMC)', 'TDP-43 en FUS, stressgranules en ALS', 'TDP-43 and FUS, stress granules and ALS', PMC('PMC3639398'));
const WANG = S('Wang & Chang (2011) Mol Cell 43:904 (PMC)', 'vier rollen: signaal, lokaas, gids, steiger', 'four roles: signal, decoy, guide, scaffold', PMC('PMC3199020'));
const MATT = S('Mattick et al. (2023) Nat Rev Mol Cell Biol 24:430 (PMC)', 'definitie, functies, XIST, NORAD; werking van een minderheid bekend', 'definition, functions, XIST, NORAD; function of a minority known', PMC('PMC10213152'));
const GENC = S('GENCODE, menselijke release 50 (statistieken)', '35 885 genen voor lange RNA’s, 19 442 eiwitgenen', '35,885 long RNA genes, 19,442 protein-coding genes', 'https://www.gencodegenes.org/human/stats.html');
const SERG = S('Serganov et al. (2004) Chem Biol 11:1729 (PubMed 15610857)', 'structuur van de adenine-schakelaar (1Y26)', 'structure of the adenine switch (1Y26)', PM(15610857));
const P1Y26 = { t: { nl: 'RCSB PDB 1Y26 — vanggedeelte van de adenine-schakelaar (Vibrio vulnificus) met adenine, röntgen 2,1 Å', en: 'RCSB PDB 1Y26 — catching part of the adenine switch (Vibrio vulnificus) with adenine, X-ray 2.1 Å' }, url: 'https://www.rcsb.org/structure/1Y26' };
const LEMAY = S('Lemay et al. (2011) PLoS Genet 7:e1001278 (PMC)', 'add-schakelaar van V. vulnificus werkt op de translatie', 'add switch of V. vulnificus acts on translation', PMC('PMC3024265'));
const MCC = S('McCown et al. (2017) RNA 23:995 (PMC)', 'overzicht van alle bekende soorten schakelaars en waar ze voorkomen', 'overview of all known kinds of switches and where they occur', PMC('PMC5473149'));

export default {
  lokalisatie: {
    nl: {
      kort: 'Sommige mRNA’s hebben een adreslabel in hun staart. Een eiwit leest dat label, motoreiwitten brengen het mRNA naar de juiste plek, en pas daar wordt het vertaald. Zo ontstaat het eiwit precies waar het nodig is.',
      what: 'Veel mRNA’s dragen in het stuk achter het stopcodon (de 3′-UTR) een adreslabel of ‘zipcode’: een korte volgorde of vorm die RNA-bindende eiwitten herkennen. Het mRNA wordt met die eiwitten ingepakt en door motoreiwitten langs het cytoskelet vervoerd. Onderweg blijft de translatie geremd; op de bestemming wordt ze vrijgegeven (lokale translatie).',
      how: [
        'Het adreslabel van β-actine-mRNA (54 letters, vlak na het stopcodon) werd gevonden in fibroblasten van kippenembryo’s; het stuurt het mRNA naar de voorste rand.',
        'Het eiwit ZBP1 (bij de mens heet het IMP1) bindt dat label en blokkeert intussen de start van de translatie.',
        'Motoreiwitten vervoeren het pakketje langs sporen: microtubuli of actinedraden.',
        'Aan de rand zet het enzym Src een fosfaatgroep op ZBP1; het laat los en ribosomen vertalen het mRNA ter plekke.',
        'In muizen met een gemerkt β-actine-mRNA zag men losse mRNA’s door de uitlopers van zenuwcellen reizen. Zenuwcellen vertalen veel mRNA’s ver van de kern, in de uitlopers.',
      ],
      facts: [['Voorbeeld', 'β-actine-mRNA → voorste rand'], ['Adreslabel', '54 letters, in de 3′-UTR'], ['Lezer', 'ZBP1 (mens: IMP1)'], ['Sporen', 'microtubuli en actinedraden'], ['Onderzocht in', 'kippen- en muizencellen']],
      why: 'Zo kan een cel één deel van zichzelf anders maken dan de rest: de voorste rand bouwt actine, een zenuwuitloper maakt eiwitten bij één contactpunt. Wordt het adreslabel geblokkeerd, dan raakt het β-actine-mRNA verspreid en verandert de vorm van de rand.',
    },
    en: {
      kort: 'Some mRNAs carry an address label in their tail. A protein reads that label, motor proteins take the mRNA to the right spot, and only there is it translated. That way the protein is made exactly where it is needed.',
      what: 'Many mRNAs carry an address label or ‘zipcode’ in the part behind the stop codon (the 3′ UTR): a short sequence or shape recognised by RNA-binding proteins. The mRNA is packed with those proteins and carried along the cytoskeleton by motor proteins. On the way, translation stays blocked; at the destination it is released (local translation).',
      how: [
        'The address label of β-actin mRNA (54 letters, right after the stop codon) was found in chicken embryo fibroblasts; it sends the mRNA to the leading edge.',
        'The protein ZBP1 (in humans called IMP1) binds that label and meanwhile blocks the start of translation.',
        'Motor proteins carry the package along tracks: microtubules or actin filaments.',
        'At the edge the enzyme Src puts a phosphate group on ZBP1; it lets go and ribosomes translate the mRNA on the spot.',
        'In mice with a labelled β-actin mRNA, single mRNAs were seen travelling through the branches of nerve cells. Nerve cells translate many mRNAs far from the nucleus, in their branches.',
      ],
      facts: [['Example', 'β-actin mRNA → leading edge'], ['Address label', '54 letters, in the 3′ UTR'], ['Reader', 'ZBP1 (human: IMP1)'], ['Tracks', 'microtubules and actin filaments'], ['Studied in', 'chicken and mouse cells']],
      why: 'This lets a cell make one part of itself different from the rest: the leading edge builds actin, a nerve branch makes proteins at one contact point. If the address label is blocked, β-actin mRNA becomes scattered and the shape of the edge changes.',
    },
    sources: [KISL, HUTT, LION, MART, HOLT, NUNEZ],
  },
  korrels: {
    nl: {
      kort: 'Bij stress, zoals hitte, stopt de cel even met eiwitten maken. De vrije mRNA’s klonteren met eiwitten samen in druppels zonder membraan. Na de stress lossen die weer op. Andere druppels, P-bodies, zijn er altijd.',
      what: 'Stressgranules zijn druppels zonder membraan in het cytoplasma. Ze bevatten mRNA’s die niet vertaald worden, vastgelopen startcomplexen van de translatie en RNA-bindende eiwitten zoals G3BP1 en TIA-1. P-bodies zijn verwante druppels die ook zonder stress bestaan, met eiwitten van de mRNA-afbraak (zoals DCP2 en XRN1) en mRNA’s die niet vertaald worden.',
      how: [
        'Stress (hitte, oxidatie, een virus) remt de start van de translatie. De ribosomen lopen van de mRNA’s af.',
        'De vrije mRNA’s en hun eiwitten kleven via veel zwakke contacten aan elkaar.',
        'Volgens het huidige model ontstaat zo een aparte vloeibare fase, zoals olie in water (fasescheiding). Hoe dat precies verloopt, wordt nog onderzocht.',
        'Na de stress lossen de granules op en worden veel mRNA’s weer vertaald.',
        'Gezuiverde P-bodies bevatten vooral mRNA’s die onderdrukt zijn maar niet afgebroken. Of P-bodies vooral bewaren of afbreken, is nog onderwerp van discussie.',
      ],
      facts: [['Wand', 'geen membraan'], ['Oorzaak', 'start van de translatie geremd'], ['Kenmerkende eiwitten', 'G3BP1, TIA-1 (stress); DCP2, XRN1 (P-body)'], ['P-bodies', 'ook zonder stress aanwezig'], ['Ziekte', 'ALS-eiwitten TDP-43 en FUS in de druppels']],
      why: 'Zo kan een cel snel omschakelen: bij stress worden gewone eiwitten even niet gemaakt, terwijl de mRNA’s vermoedelijk bewaard blijven voor later. Bij ALS vindt men eiwitten uit deze druppels (TDP-43, FUS) terug in klonters in de zenuwcellen die afsterven; of blijvende druppels die klonters veroorzaken, wordt nog onderzocht.',
    },
    en: {
      kort: 'Under stress, such as heat, the cell briefly stops making proteins. The free mRNAs clump together with proteins in droplets without a membrane. After the stress these dissolve again. Other droplets, P-bodies, are always there.',
      what: 'Stress granules are droplets without a membrane in the cytoplasm. They contain mRNAs that are not being translated, stalled translation start complexes and RNA-binding proteins such as G3BP1 and TIA-1. P-bodies are related droplets that also exist without stress, with proteins of mRNA decay (such as DCP2 and XRN1) and mRNAs that are not being translated.',
      how: [
        'Stress (heat, oxidation, a virus) blocks the start of translation. The ribosomes run off the mRNAs.',
        'The free mRNAs and their proteins stick together through many weak contacts.',
        'According to the current model this creates a separate liquid phase, like oil in water (phase separation). Exactly how this happens is still being studied.',
        'After the stress the granules dissolve and many mRNAs are translated again.',
        'Purified P-bodies mainly contain mRNAs that are repressed but not degraded. Whether P-bodies mainly store or break down is still debated.',
      ],
      facts: [['Wall', 'no membrane'], ['Cause', 'start of translation blocked'], ['Typical proteins', 'G3BP1, TIA-1 (stress); DCP2, XRN1 (P-body)'], ['P-bodies', 'present even without stress'], ['Disease', 'ALS proteins TDP-43 and FUS in the droplets']],
      why: 'This lets a cell switch quickly: under stress ordinary proteins are briefly not made, while the mRNAs are probably kept for later. In ALS, proteins from these droplets (TDP-43, FUS) are found in clumps in the dying nerve cells; whether lasting droplets cause those clumps is still being studied.',
    },
    sources: [PROT, KED, HUB, COUR, LI],
  },
  lncrna: {
    nl: {
      kort: 'Niet elk RNA wordt een eiwit. Lange RNA’s zonder eiwit kunnen eiwitten bij elkaar houden, naar een plek op het DNA brengen of wegvangen. Een bekend voorbeeld is [[XIST|xinact]]. Van de meeste kennen we de werking nog niet.',
      what: 'Lange niet-coderende RNA’s (lncRNA’s) zijn RNA’s van meer dan 200 letters die niet vertaald worden. Er zijn er volgens de telling van GENCODE meer genen voor dan voor eiwitten. Sommige hebben een goed onderzochte taak, maar van de meeste is de werking nog onbekend.',
      how: [
        'Steiger: het RNA houdt verschillende eiwitten samen tot één geheel.',
        'Gids: het RNA brengt eiwitten naar een bepaalde plek op het DNA.',
        'Lokaas: het RNA vangt eiwitten weg; NORAD houdt zo PUMILIO-eiwitten vast.',
        'XIST combineert rollen: het bedekt één X-chromosoom, houdt eiwitten weg die genen aanzetten en trekt eiwitten aan die het X stilleggen.',
        'Soms telt niet het RNA zelf maar het afschrijven ervan, dat een buurgen beïnvloedt.',
      ],
      facts: [['Lengte', 'meer dan 200 letters'], ['Genen (GENCODE 50)', '35 885 (eiwitgenen: 19 442)'], ['Rollen', 'steiger, gids, lokaas'], ['Voorbeelden', 'XIST, NORAD'], ['Werking bekend', 'van een minderheid']],
      why: 'Lange RNA’s tonen dat RNA meer is dan een boodschapper. Twee mythen kloppen niet: ze zijn niet allemaal ‘rommel’, en ze zijn ook niet allemaal belangrijk. Voor elk afzonderlijk RNA moet de werking nog aangetoond worden.',
    },
    en: {
      kort: 'Not every RNA becomes a protein. Long RNAs without protein can hold proteins together, bring them to a spot on the DNA or catch them away. A well-known example is [[XIST|xinact]]. For most of them we do not yet know how they work.',
      what: 'Long non-coding RNAs (lncRNAs) are RNAs of more than 200 letters that are not translated. According to the GENCODE count there are more genes for them than for proteins. Some have a well-studied job, but for most the function is still unknown.',
      how: [
        'Scaffold: the RNA holds different proteins together as one unit.',
        'Guide: the RNA brings proteins to a particular spot on the DNA.',
        'Decoy: the RNA catches proteins away; NORAD holds on to PUMILIO proteins in this way.',
        'XIST combines roles: it coats one X chromosome, keeps away proteins that switch genes on and attracts proteins that silence the X.',
        'Sometimes it is not the RNA itself that counts but the act of copying it, which affects a neighbouring gene.',
      ],
      facts: [['Length', 'more than 200 letters'], ['Genes (GENCODE 50)', '35,885 (protein genes: 19,442)'], ['Roles', 'scaffold, guide, decoy'], ['Examples', 'XIST, NORAD'], ['Function known', 'for a minority']],
      why: 'Long RNAs show that RNA is more than a messenger. Two myths are wrong: they are not all ‘junk’, and they are not all important either. For each individual RNA the function still has to be shown.',
    },
    sources: [WANG, MATT, ENGR, GENC],
  },
  riboswitch: {
    nl: {
      kort: 'Een riboswitch is een schakelaar in een mRNA zelf. Een deel van het RNA vangt een klein molecuul, zoals adenine, en verandert daardoor van vorm. Zo gaat een gen aan of uit, zonder hulp van een eiwit. Vooral bacteriën gebruiken dit.',
      what: 'Een riboswitch heeft twee delen: een vanggedeelte (aptameer) dat een klein molecuul bindt, en een schakeldeel dat daardoor anders vouwt. Bij de add-schakelaar van Vibrio vulnificus verstopt het schakeldeel zonder adenine de landingsplaats van het ribosoom (Shine-Dalgarno) en het startcodon; met adenine komen die vrij en wordt het gen vertaald. De structuur 1Y26 toont het vanggedeelte (71 letters) met adenine.',
      how: [
        'Zonder adenine vormt het schakeldeel een haarspeld die de landingsplaats en het startcodon bedekt: het gen staat uit.',
        'Adenine bindt in het vanggedeelte; het RNA vouwt om en de landingsplaats komt vrij: het gen staat aan.',
        'In 3D: drie dubbele stukken komen samen in een kruispunt; de lussen van twee armen paren met elkaar (G37–C61, G38–C60).',
        'Adenine zit volledig omsloten in het kruispunt en paart met U74. In de verwante guanine-schakelaar staat daar een C, die guanine herkent.',
        'Andere schakelaars werken door het afschrijven te laten stoppen (zoals de adenine-schakelaar van Bacillus subtilis).',
      ],
      facts: [['Structuur', 'PDB 1Y26, röntgen 2,1 Å'], ['Organisme', 'Vibrio vulnificus (bacterie)'], ['Vanggedeelte', '71 letters + adenine + 5 Mg²⁺'], ['Herkenning', 'adenine paart met U74'], ['Waar', 'vooral bacteriën; TPP-schakelaar ook in planten, schimmels, algen; niet bij de mens bekend']],
      why: 'Riboswitches tonen dat RNA zelf kan voelen en beslissen, zonder eiwit. Omdat bacteriën ze gebruiken voor belangrijke bouwstoffen en de mens ze niet heeft (voor zover bekend), zijn ze een mogelijk doelwit voor nieuwe antibiotica.',
    },
    en: {
      kort: 'A riboswitch is a switch inside an mRNA itself. Part of the RNA catches a small molecule, such as adenine, and changes shape as a result. That turns a gene on or off without the help of a protein. Mainly bacteria use this.',
      what: 'A riboswitch has two parts: a catching part (aptamer) that binds a small molecule, and a switching part that then folds differently. In the add switch of Vibrio vulnificus, the switching part hides the ribosome landing site (Shine-Dalgarno) and the start codon when there is no adenine; with adenine they come free and the gene is translated. Structure 1Y26 shows the catching part (71 letters) with adenine.',
      how: [
        'Without adenine the switching part forms a hairpin that covers the landing site and the start codon: the gene is off.',
        'Adenine binds in the catching part; the RNA refolds and the landing site comes free: the gene is on.',
        'In 3D: three double-stranded parts meet in a junction; the loops of two arms pair with each other (G37–C61, G38–C60).',
        'Adenine sits fully enclosed in the junction and pairs with U74. In the related guanine switch a C sits there, which recognises guanine.',
        'Other switches work by stopping the copying (such as the adenine switch of Bacillus subtilis).',
      ],
      facts: [['Structure', 'PDB 1Y26, X-ray 2.1 Å'], ['Organism', 'Vibrio vulnificus (bacterium)'], ['Catching part', '71 letters + adenine + 5 Mg²⁺'], ['Recognition', 'adenine pairs with U74'], ['Where', 'mainly bacteria; TPP switch also in plants, fungi, algae; not known in humans']],
      why: 'Riboswitches show that RNA itself can sense and decide, without a protein. Because bacteria use them for important building blocks and humans do not have them (as far as we know), they are a possible target for new antibiotics.',
    },
    sources: [SERG, P1Y26, LEMAY, MCC],
  },
};
