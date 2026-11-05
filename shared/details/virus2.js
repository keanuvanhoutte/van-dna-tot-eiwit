/* Uitleg per knoop voor het zijpad "Hoe een virus zichzelf laat maken" (05-11-2026) — zie app/SCENES.md.
 * Nagekeken in docs/verificatie-ronde-10-virussen.md. */
const S = (ref, nl, en, url) => ({ t: { nl: `${ref} — ${nl}`, en: `${ref} — ${en}` }, url });
const PM = id => `https://pubmed.ncbi.nlm.nih.gov/${id}/`, PMC = id => `https://pmc.ncbi.nlm.nih.gov/articles/${id}/`;
const PDB = (id, nl, en) => ({ t: { nl: `RCSB PDB ${id} — ${nl}`, en: `RCSB PDB ${id} — ${en}` }, url: `https://www.rcsb.org/structure/${id}` });
const LAN = S('Lan et al. (2020) Nature 581:215 (PubMed 32225176)', 'structuur van het bindende topje op ACE2 (6M0J)', 'structure of the binding tip on ACE2 (6M0J)', PM(32225176));
const P6M0J = PDB('6M0J', 'bindend topje (SARS-CoV-2) op menselijk ACE2, röntgen 2,45 Å', 'binding tip (SARS-CoV-2) on human ACE2, X-ray 2.45 Å');
const JACKSON = S('Jackson et al. (2022) Nat Rev Mol Cell Biol 23:3 (PMC)', 'overzicht van de binnenkomst: trimeer, twee routes, ACE2 in weefsels', 'review of entry: trimer, two routes, ACE2 in tissues', PMC('PMC8491763'));
const HOFF = S('Hoffmann et al. (2020) Cell 181:271 (PMC)', 'ACE2 als aanhechtingseiwit; een enzym van de cel is nodig', 'ACE2 as attachment protein; a cell enzyme is needed', PMC('PMC7102627'));
const WALLS = S('Walls et al. (2020) Cell 181:281 (PMC)', 'het uitsteeksel is een trimeer (cryo-EM)', 'the spike is a trimer (cryo-EM)', PMC('PMC7102599'));
const KE = S('Ke et al. (2020) Nature 588:498 (PMC)', 'uitsteeksels op echte virusdeeltjes', 'spikes on real virus particles', PMC('PMC7116492'));
const VKOV = S('V’kovski et al. (2021) Nat Rev Microbiol 19:155 (PMC)', 'overzicht van de levensloop in de cel', 'review of the life cycle in the cell', PMC('PMC7592455'));
const WU = S('Wu et al. (2020) Nature 579:265 (PMC)', 'genoom van 29 903 letters', 'genome of 29,903 letters', PMC('PMC7094943'));
const SNIJ = S('Snijder et al. (2020) PLoS Biol 18:e3000715 (PMC)', 'het kopiëren gebeurt in blaasjes met dubbel membraan', 'copying happens in double-membrane vesicles', PMC('PMC7302735'));
const WOLFF = S('Wolff et al. (2020) Science 369:1395 (PMC)', 'een poortje door beide membranen van zo’n blaasje', 'a gate through both membranes of such a vesicle', PMC('PMC7665310'));
const KELLY = S('Kelly et al. (2020) J Biol Chem 295:10741 (PMC)', 'de verspringing van het ribosoom (−1-frameshift)', 'the slip of the ribosome (−1 frameshift)', PMC('PMC7397099'));
const ZHANG = S('Zhang et al. (2020) Science 368:409 (PMC)', 'structuur van de schaar: ≥ 11 knipplaatsen, His41/Cys145, werkt als paar', 'structure of the scissors: ≥ 11 cut sites, His41/Cys145, works as a pair', PMC('PMC7164518'));
const OWEN = S('Owen et al. (2021) Science 374:1586 (PubMed 34726479)', 'het middel nirmatrelvir en de structuur 7RFW', 'the drug nirmatrelvir and structure 7RFW', PM(34726479));
const P7RFW = PDB('7RFW', 'schaar van SARS-CoV-2 met nirmatrelvir, röntgen 1,73 Å', 'SARS-CoV-2 scissors with nirmatrelvir, X-ray 1.73 Å');
const HAMMOND = S('Hammond et al. (2022) N Engl J Med 386:1397 (PMC)', 'klinische studie met nirmatrelvir en ritonavir', 'clinical trial with nirmatrelvir and ritonavir', PMC('PMC8908851'));
const KLEIN = S('Klein et al. (2020) Nat Commun 11:5885 (PMC)', 'nieuwe deeltjes ontstaan aan membranen binnen de cel', 'new particles form at membranes inside the cell', PMC('PMC7676268'));
const GHOSH = S('Ghosh et al. (2020) Cell 183:1520 (PMC)', 'uitgang via lysosomen, die daarbij minder zuur worden', 'exit via lysosomes, which become less acidic', PMC('PMC7590812'));
const CASJ = S('Casjens & Hendrix (2015) Virology 479–480:310 (PMC)', 'faag lambda: inbouwen, verstoppen en loskomen na UV', 'phage lambda: integration, hiding and release after UV', PMC('PMC4424060'));
const ABEDON = S('Abedon (2019) Viruses 11:951 (PMC)', 'T-even fagen: ≈ 20–25 minuten tot de cel openbarst', 'T-even phages: ≈ 20–25 minutes until the cell bursts', PMC('PMC6832632'));
const BARR = S('Barrangou et al. (2007) Science 315:1709 (PubMed 17379808)', 'bacteriën bewaren stukjes faag-DNA en worden zo resistent', 'bacteria store pieces of phage DNA and become resistant', PM(17379808));
const BROUNS = S('Brouns et al. (2008) Science 321:960 (PMC)', 'E. coli: de rij wordt tot korte gidsen geknipt', 'E. coli: the array is cut into short guides', PMC('PMC5898235'));
const JINEK = S('Jinek et al. (2012) Science 337:816 (PMC)', 'Cas9 met RNA-gids knipt dubbelstrengs DNA; programmeerbaar', 'Cas9 with RNA guide cuts double-stranded DNA; programmable', PMC('PMC6286148'));
const CONG = S('Cong et al. (2013) Science 339:819 (PMC)', 'Cas9 knipt op gekozen plekken in menselijke en muizencellen', 'Cas9 cuts at chosen spots in human and mouse cells', PMC('PMC3795411'));
const MAKA = S('Makarova et al. (2020) Nat Rev Microbiol 18:67 (PMC)', 'CRISPR in 42,3 % van de bacterie- en 85,2 % van de archaeagenomen', 'CRISPR in 42.3% of bacterial and 85.2% of archaeal genomes', PMC('PMC8905525'));
const NISHI = S('Nishimasu et al. (2014) Cell 156:935 (PMC)', 'structuur 4OO8 van Cas9 met gids en doel-DNA', 'structure 4OO8 of Cas9 with guide and target DNA', PMC('PMC4139937'));

export default {
  sleutel: {
    nl: {
      kort: 'Een virus moet eerst aan de juiste cel binden. Het coronavirus doet dat met de top van zijn uitsteeksels: die past als een sleutel op het eiwit ACE2 op onze cellen.',
      what: 'Het uitsteeksel (spike) bestaat uit drie gelijke ketens. Van elke keten bindt de top (het receptorbindend domein) aan ACE2, een eiwit op onze cellen. In de structuur 6M0J raken 17 aminozuren van die top 20 aminozuren van ACE2.',
      how: [
        'De toppen staan afwisselend omhoog (kunnen binden) of omlaag (kunnen niet binden).',
        'Een top in de stand omhoog bindt ACE2.',
        'Daarna knipt een enzym van de cel het uitsteeksel: TMPRSS2 aan de buitenkant, of cathepsine L in een blaasje na opname.',
        'Pas na dat knippen versmelten de membranen en komt het RNA in de cel.',
      ],
      facts: [['Structuur', 'PDB 6M0J, röntgen 2,45 Å'], ['Raakvlak', '17 + 20 aminozuren'], ['Uitsteeksel', 'drie gelijke ketens (trimeer)'], ['Twee routes', 'aan het oppervlak of via een blaasje'], ['ACE2', 'veel in de neus, minder diep in de longen']],
      why: 'Dit is de eerste stap van een besmetting. Welke cellen ACE2 hebben, bepaalt mee welke cellen besmet raken. Vaccins en antistoffen richten zich vooral op dit uitsteeksel.',
    },
    en: {
      kort: 'A virus first has to bind to the right cell. The coronavirus does this with the tip of its spikes: it fits like a key onto the protein ACE2 on our cells.',
      what: 'The spike consists of three identical chains. The tip of each chain (the receptor-binding domain) binds ACE2, a protein on our cells. In structure 6M0J, 17 amino acids of that tip touch 20 amino acids of ACE2.',
      how: [
        'The tips are alternately up (able to bind) or down (unable to bind).',
        'A tip in the up position binds ACE2.',
        'An enzyme of the cell then cuts the spike: TMPRSS2 on the outside, or cathepsin L inside a vesicle after uptake.',
        'Only after that cut do the membranes fuse and the RNA get into the cell.',
      ],
      facts: [['Structure', 'PDB 6M0J, X-ray 2.45 Å'], ['Contact', '17 + 20 amino acids'], ['Spike', 'three identical chains (trimer)'], ['Two routes', 'at the surface or through a vesicle'], ['ACE2', 'plenty in the nose, less deep in the lungs']],
      why: 'This is the first step of an infection. Which cells carry ACE2 helps decide which cells get infected. Vaccines and antibodies mainly target this spike.',
    },
    sources: [LAN, P6M0J, JACKSON, HOFF, WALLS, KE],
  },
  viruskopie: {
    nl: {
      kort: 'Het RNA van dit virus lijkt op ons eigen mRNA. Onze ribosomen lezen het meteen af en maken één lange eiwitketen, die in stukken geknipt wordt. Een deel van die stukken vormt een kopieermachine voor RNA.',
      what: 'Het genoom is één RNA-streng van 29 903 letters, met een kap en een poly(A)-staart, net als ons mRNA. Het wordt vertaald tot lange ketens (polyproteïnen) die door virale scharen in 16 stukken (nsp1–16) geknipt worden. Die vormen samen het kopieercomplex, met als kern het RNA-afhankelijke RNA-polymerase (RdRp, nsp12).',
      how: [
        'Ribosomen van de cel lezen het virus-RNA meteen af.',
        'Of het ribosoom de korte of de lange keten maakt, hangt af van een verspringing van één letter (−1-frameshift).',
        'Twee scharen in de keten (PLpro en Mpro) knippen zichzelf en de rest los.',
        'De stukken vervormen het ER tot blaasjes met een dubbel membraan en kopiëren daarin het RNA, via een tussenkopie met de omgekeerde letters.',
        'Een poortje in de wand van het blaasje laat de nieuwe kopieën vermoedelijk naar het cytosol.',
      ],
      facts: [['Genoom', '29 903 letters, (+)RNA'], ['Stukken', '16 (nsp1–16)'], ['Verspringing', 'bij ongeveer de helft van de ribosomen'], ['Kopiëren', 'in blaasjes met dubbel membraan uit het ER'], ['Export', 'via een porie door beide membranen']],
      why: 'Een (+)RNA-virus heeft geen eigen kopieermachine mee: het laat die eerst door onze cel maken. Dat verklaart waarom het blokkeren van één enkele stap (de schaar, de kopieermachine) de hele vermenigvuldiging stillegt.',
    },
    en: {
      kort: 'The RNA of this virus resembles our own mRNA. Our ribosomes read it straight away and make one long protein chain, which is cut into pieces. Some of those pieces form a copying machine for RNA.',
      what: 'The genome is a single RNA strand of 29,903 letters, with a cap and a poly(A) tail, just like our mRNA. It is translated into long chains (polyproteins) that viral scissors cut into 16 pieces (nsp1–16). Together these form the copying complex, with the RNA-dependent RNA polymerase (RdRp, nsp12) at its core.',
      how: [
        'Ribosomes of the cell read the virus RNA straight away.',
        'Whether the ribosome makes the short or the long chain depends on a slip of one letter (−1 frameshift).',
        'Two scissors inside the chain (PLpro and Mpro) cut themselves and the rest loose.',
        'The pieces reshape the ER into double-membrane vesicles and copy the RNA inside them, via an intermediate copy with the opposite letters.',
        'A gate in the vesicle wall probably lets the new copies out to the cytosol.',
      ],
      facts: [['Genome', '29,903 letters, (+)RNA'], ['Pieces', '16 (nsp1–16)'], ['Slip', 'in about half of the ribosomes'], ['Copying', 'in double-membrane vesicles from the ER'], ['Export', 'through a pore across both membranes']],
      why: 'A (+)RNA virus brings no copying machine of its own: it has our cell make one first. That explains why blocking a single step (the scissors, the copying machine) stops the whole multiplication.',
    },
    sources: [VKOV, WU, SNIJ, WOLFF, KELLY, KLEIN],
  },
  schaar: {
    nl: {
      kort: 'De lange eiwitketen van het virus moet in stukken geknipt worden. Dat doet een eigen schaar van het virus. Een geneesmiddel past in de groef van die schaar en blokkeert ze.',
      what: 'De hoofdprotease (Mpro, ook 3CLpro of nsp5) knipt de lange ketens op ten minste 11 plaatsen, meestal achter de bouwstenen Leu-Gln. Ze werkt alleen als paar (dimeer); het knippen gebeurt met twee bouwstenen in een groef (His41 en Cys145). Het middel nirmatrelvir hecht zich vast aan Cys145.',
      how: [
        'Twee gelijke helften vormen samen de werkende schaar.',
        'Een stuk van de keten schuift in de groef, waar de twee bouwstenen de binding doorknippen.',
        'Nirmatrelvir past in dezelfde groef en gaat een vaste binding aan met Cys145: de schaar blijft bezet.',
        'Blijft de keten heel, dan ontstaat er geen kopieermachine.',
      ],
      facts: [['Structuur', 'PDB 7RFW, röntgen 1,73 Å'], ['Knipplaatsen', 'ten minste 11'], ['Knipplek', 'His41 + Cys145'], ['Vorm', 'werkt als paar (dimeer)'], ['Middel', 'nirmatrelvir, met ritonavir = Paxlovid']],
      why: 'Deze schaar is een goed doelwit voor een geneesmiddel: de cel heeft zelf geen eiwit dat er sterk op lijkt. In een klinische studie lag het aantal ziekenhuisopnames bij behandelde deelnemers met een hoog risico duidelijk lager dan bij placebo.',
    },
    en: {
      kort: 'The virus’s long protein chain has to be cut into pieces. The virus has its own scissors for that. A medicine fits into the groove of those scissors and blocks them.',
      what: 'The main protease (Mpro, also 3CLpro or nsp5) cuts the long chains at no fewer than 11 sites, mostly after the building blocks Leu-Gln. It works only as a pair (dimer); the cutting is done by two building blocks in a groove (His41 and Cys145). The drug nirmatrelvir attaches to Cys145.',
      how: [
        'Two identical halves together form the working scissors.',
        'A piece of the chain slides into the groove, where the two building blocks cut the bond.',
        'Nirmatrelvir fits into the same groove and forms a fixed bond with Cys145: the scissors stay occupied.',
        'If the chain stays whole, no copying machine is formed.',
      ],
      facts: [['Structure', 'PDB 7RFW, X-ray 1.73 Å'], ['Cut sites', 'at least 11'], ['Cutting site', 'His41 + Cys145'], ['Shape', 'works as a pair (dimer)'], ['Drug', 'nirmatrelvir, with ritonavir = Paxlovid']],
      why: 'These scissors are a good drug target: the cell has no protein that closely resembles them. In a clinical trial, hospital admissions among treated high-risk participants were clearly lower than with placebo.',
    },
    sources: [OWEN, P7RFW, ZHANG, HAMMOND, VKOV],
  },
  assemblage: {
    nl: {
      kort: 'Nieuwe virussen worden binnen in de cel gebouwd, aan membranen tussen het ER en het Golgi. Blaasjes brengen ze naar buiten.',
      what: 'De eiwitten van de virushuid (S, E en M) worden in het ER-membraan gemaakt en reizen naar het tussencompartiment tussen ER en Golgi (ERGIC). Het N-eiwit pakt elke nieuwe RNA-kopie in tot een kluwen. Daar knopt het virus af naar de binnenkant van dat compartiment en verlaat het de cel in blaasjes.',
      how: [
        'Ribosomen op het ER maken de huideiwitten; die blijven in het membraan steken.',
        'Het N-eiwit pakt de nieuwe RNA-kopieën in.',
        'Op het membraan tussen ER en Golgi komen huid en kluwen samen en knopt het deeltje af.',
        'Blaasjes brengen de deeltjes naar de celrand, waar ze vrijkomen (exocytose).',
        'Bij β-coronavirussen gebeurt dat via lysosomen, die daarbij minder zuur worden.',
      ],
      facts: [['Huideiwitten', 'S, E en M'], ['Inpakeiwit', 'N'], ['Plaats', 'tussen ER en Golgi (ERGIC)'], ['Uitgang', 'blaasjes; bij β-coronavirussen via lysosomen'], ['Grootte', 'virusdeeltje ≈ 0,1 µm']],
      why: 'Omdat alles binnen in de cel gebeurt, hoeft de cel niet open te barsten: ze kan lange tijd virussen blijven afgeven. De weg via lysosomen is aangetoond in gekweekte cellen en nog niet in alle details bevestigd.',
    },
    en: {
      kort: 'New viruses are built inside the cell, at membranes between the ER and the Golgi. Vesicles carry them out.',
      what: 'The proteins of the virus coat (S, E and M) are made in the ER membrane and travel to the compartment between ER and Golgi (ERGIC). The N protein packs each new RNA copy into a bundle. There the virus buds into the inside of that compartment and leaves the cell in vesicles.',
      how: [
        'Ribosomes on the ER make the coat proteins; these stay stuck in the membrane.',
        'The N protein packs the new RNA copies.',
        'On the membrane between ER and Golgi, coat and bundle come together and the particle buds off.',
        'Vesicles carry the particles to the edge of the cell, where they are released (exocytosis).',
        'In β-coronaviruses this happens via lysosomes, which become less acidic in the process.',
      ],
      facts: [['Coat proteins', 'S, E and M'], ['Packing protein', 'N'], ['Place', 'between ER and Golgi (ERGIC)'], ['Exit', 'vesicles; in β-coronaviruses via lysosomes'], ['Size', 'virus particle ≈ 0.1 µm']],
      why: 'Because everything happens inside the cell, the cell does not have to burst: it can keep releasing viruses for a long time. The route via lysosomes has been shown in cultured cells and is not yet confirmed in every detail.',
    },
    sources: [VKOV, KLEIN, GHOSH],
  },
  faag: {
    nl: {
      kort: 'Virussen van bacteriën heten bacteriofagen. Ze spuiten hun DNA in de bacterie. Daarna volgt weg 1 (meteen nieuwe fagen maken en de cel openbarsten) of weg 2 (het DNA verstopt zich in het chromosoom).',
      what: 'Een faag hecht aan een bepaald eiwit op de buitenkant van de bacterie en brengt zijn DNA via de staart naar binnen; de eiwitjas blijft buiten. Bij de lytische weg maakt de cel nieuwe fagen en gaat ze kapot. Bij de lysogene weg bouwt faag lambda zijn DNA met het enzym Int op één vaste plaats (att) in het chromosoom in: een profaag.',
      how: [
        'De faag zet zich met zijn poten vast en spuit zijn DNA in de cel.',
        'Weg 1: de bacterie leest het faag-DNA af, bouwt nieuwe fagen en lyseert; bij T-even fagen duurt dat ≈ 20–25 minuten.',
        'Weg 2: het DNA wordt ingebouwd en bij elke celdeling mee gekopieerd; het eiwit CI houdt de lytische genen uit.',
        'Bij DNA-schade (bv. UV-licht) wordt CI afgebroken, knipt het enzym Xis de profaag los en volgt alsnog weg 1.',
      ],
      facts: [['Genoom lambda', '48 502 basenparen'], ['Weg 1', '≈ 20–25 min (T-even fagen)'], ['Weg 2', 'generaties lang verstopt'], ['Inbouwen', 'één vaste plaats (att) met Int'], ['Signaal om los te komen', 'DNA-schade, bv. UV']],
      why: 'Fagen waren het model waarmee onderzoekers leerden hoe genen aan- en uitgaan. Ze zijn ook de reden dat bacteriën afweer zoals CRISPR hebben, en een profaag kan nieuwe genen in een bacterie brengen.',
    },
    en: {
      kort: 'Viruses of bacteria are called bacteriophages. They inject their DNA into the bacterium. Then path 1 follows (make new phages right away and burst the cell) or path 2 (the DNA hides in the chromosome).',
      what: 'A phage attaches to a specific protein on the outside of the bacterium and brings its DNA in through its tail; the protein coat stays outside. On the lytic path the cell makes new phages and is destroyed. On the lysogenic path phage lambda builds its DNA into one fixed site (att) in the chromosome using the enzyme Int: a prophage.',
      how: [
        'The phage attaches with its legs and injects its DNA into the cell.',
        'Path 1: the bacterium reads the phage DNA, builds new phages and lyses; for T-even phages this takes ≈ 20–25 minutes.',
        'Path 2: the DNA is built in and copied along at every cell division; the protein CI keeps the lytic genes off.',
        'Upon DNA damage (e.g. UV light) CI is destroyed, the enzyme Xis cuts the prophage loose and path 1 follows after all.',
      ],
      facts: [['Lambda genome', '48,502 base pairs'], ['Path 1', '≈ 20–25 min (T-even phages)'], ['Path 2', 'hidden for generations'], ['Integration', 'one fixed site (att) with Int'], ['Release signal', 'DNA damage, e.g. UV']],
      why: 'Phages were the model with which researchers learned how genes are switched on and off. They are also the reason bacteria have defences such as CRISPR, and a prophage can bring new genes into a bacterium.',
    },
    sources: [CASJ, ABEDON, BARR],
  },
  crispr: {
    nl: {
      kort: 'Bacteriën bewaren een stukje DNA van een faag in een rij in hun eigen DNA. Daarvan maken ze RNA-gidsen. Komt die faag terug, dan knipt een eiwitschaar zijn DNA door. Mensen hebben van dat systeem een knipgereedschap gemaakt.',
      what: 'CRISPR is een rij herhalingen met daartussen bewaarde stukjes vreemd DNA (spacers, bij E. coli meestal 32 letters). De rij wordt afgeschreven en geknipt tot korte gids-RNA’s (crRNA). Die leiden Cas-eiwitten naar DNA met dezelfde letters. E. coli gebruikt een groep eiwitten (Cascade) met de knipper Cas3; Streptococcus pyogenes gebruikt één groot eiwit, Cas9.',
      how: [
        'Na een infectie wordt een stukje faag-DNA vooraan in de rij gezet.',
        'De rij wordt naar RNA overgeschreven en in korte gidsen geknipt.',
        'Een gids en een Cas-eiwit zoeken samen DNA met dezelfde letters.',
        'Past het, dan wordt dat DNA doorgeknipt; Cas9 doet dat alleen als er ook een kort herkenningsstukje (PAM) naast ligt.',
        'In het lab krijgt Cas9 een zelfgekozen gids, zodat onderzoekers een gen op een gekozen plek kunnen knippen.',
      ],
      facts: [['Voorkomen', '42,3 % van de bacterie- en 85,2 % van de archaeagenomen'], ['Bewaard stukje', 'meestal 32 letters (E. coli)'], ['E. coli', 'Cascade + Cas3'], ['S. pyogenes', 'Cas9 met twee RNA’s'], ['Structuur', 'PDB 4OO8: Cas9 met gids en doel-DNA']],
      why: 'In de bacterie is CRISPR afweer: het vreemde DNA wordt kapotgeknipt. De genbewerking die mensen ermee doen, is een toepassing daarvan: dezelfde schaar, maar met een zelfgekozen gids en met herstel van de knip door de cel.',
    },
    en: {
      kort: 'Bacteria keep a piece of a phage’s DNA in a row in their own DNA. From it they make RNA guides. If that phage returns, a protein scissors cuts its DNA. People turned this system into a cutting tool.',
      what: 'CRISPR is a row of repeats with stored pieces of foreign DNA in between (spacers, mostly 32 letters in E. coli). The row is transcribed and cut into short guide RNAs (crRNA). These lead Cas proteins to DNA with the same letters. E. coli uses a group of proteins (Cascade) with the cutter Cas3; Streptococcus pyogenes uses one large protein, Cas9.',
      how: [
        'After an infection, a piece of phage DNA is placed at the front of the row.',
        'The row is copied into RNA and cut into short guides.',
        'A guide and a Cas protein together search for DNA with the same letters.',
        'If it matches, that DNA is cut; Cas9 only does so if a short recognition piece (PAM) lies next to it.',
        'In the lab Cas9 is given a guide of choice, so researchers can cut a gene at a chosen spot.',
      ],
      facts: [['Occurrence', '42.3% of bacterial and 85.2% of archaeal genomes'], ['Stored piece', 'mostly 32 letters (E. coli)'], ['E. coli', 'Cascade + Cas3'], ['S. pyogenes', 'Cas9 with two RNAs'], ['Structure', 'PDB 4OO8: Cas9 with guide and target DNA']],
      why: 'In the bacterium CRISPR is a defence: the foreign DNA is cut up. The gene editing people do with it is an application of that: the same scissors, but with a guide of choice and with the cut repaired by the cell.',
    },
    sources: [BARR, BROUNS, JINEK, CONG, MAKA, NISHI],
  },
};
