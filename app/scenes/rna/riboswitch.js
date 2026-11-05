import { C, T2, svgOpen, FULL, sub, ease, lerp, f1 } from '../../kit.js';
import { inset3d, withInset } from '../../kit3d.js';
import { T, smooth } from '../prot/_b_kit.js';
import { btn, frame3d } from '../prot/_fate.js';
import { ribo, arrow } from './_rna.js';

/*
 * Riboswitch (zijpad "Het leven van een RNA", 05-11-2026). Stap 0–1 (2D): principe van de add-riboswitch van Vibrio vulnificus,
 * een AAN-schakelaar op het niveau van de translatie: zonder adenine verstopt een haarspeld de Shine-Dalgarno-volgorde
 * (landingsplaats) en het startcodon; adenine bindt het vanggedeelte (aptameer), het RNA vouwt om en het ribosoom kan binden
 * (Lemay et al. 2011). Stap 2–5 (3D): PDB 1Y26, "A-riboswitch-adenine complex", röntgen 2,1 Å (Serganov et al., Chem Biol 2004):
 * het aptameer (71 nt, residuen 13–83, keten X) met adenine (ADE 90) en 5 Mg²⁺. Nagemeten in het bestand (05-11-2026):
 * P1 13–21/75–83, P2 25–31/39–45 (lus L2), P3 54–59/67–72 (lus L3), lus–lus-paren G37–C61 en G38–C60; adenine raakt
 * U22, U47, U51, U74 (2,65 Å: Watson–Crick met U74). Lokale kopie data/pdb/1Y26.pdb. Nagekeken in docs/verificatie-ronde-11-rna-lot.md.
 */
const L3 = (nl, en) => ({ nl, en });
const RNA = C.rna, ADE = '#5fd3e6', SD = '#ffd166', ARM1 = '#ffc247', ARM2 = '#7fdc6a', U74 = '#ff6b6b', GREY = '#55607a';
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const NUC = { hetflag: false };
const CART = col => ({ cartoon: { color: col } });
const BASE3 = [{ sel: NUC, style: CART(RNA) }, { sel: { resn: 'ADE' }, style: { sphere: { color: ADE, radius: 1 } } }, { sel: { resn: 'MG' }, style: {} }];
const GREYALL = { sel: NUC, style: CART(GREY) };
const S3 = {
  2: { spin: .012 },
  3: { spin: .01, focus: [GREYALL, { sel: { resi: range(25, 45) }, style: CART(ARM1), label: L3('arm 1', 'arm 1') }, { sel: { resi: range(54, 72) }, style: CART(ARM2) },
    { sel: { resi: [37, 38, 60, 61] }, style: { cartoon: { color: '#ffffff' }, stick: { color: '#ffffff', radius: .3 } }, label: L3('lussen raken elkaar', 'loops touch') }] },
  4: { spin: .006, zoom: { resi: [22, 47, 51, 74, 90] }, focus: [GREYALL, { sel: { resn: 'ADE' }, style: { sphere: { color: ADE, radius: 1.1 } }, label: L3('adenine', 'adenine') },
    { sel: { resi: 74, ...NUC }, style: { cartoon: { color: U74 }, stick: { color: U74, radius: .35 } }, label: L3('U', 'U') }] },
  5: { spin: .012 },
};

/* 2D: mRNA-begin met vanggedeelte (links) en schakeldeel met landingsplaats (midden) */
const Y = 600;
const APT = [[150, Y], [285, Y], [285, 470], [240, 430], [180, 330], [190, 270], [235, 300], [275, 400], [300, 420], [325, 400], [365, 300], [410, 270], [420, 330], [360, 430], [315, 470], [315, Y], [600, Y]];
/* schakeldeel: u = 0..1 langs het stuk 600 → 900; uit (haarspeld) of aan (plat) */
function swPt(u, k) {
  const flat = [600 + 300 * u, Y];
  let hp;
  if (u < .1) hp = [600 + 800 * u, Y];
  else if (u < .45) hp = [680, Y - 220 * (u - .1) / .35];
  else if (u < .55) { const a = Math.PI * (u - .45) / .1; hp = [700 - 20 * Math.cos(a), Y - 220 - 20 * Math.sin(a)]; }
  else if (u < .9) hp = [720, Y - 220 + 220 * (u - .55) / .35];
  else hp = [720 + 1800 * (u - .9), Y];
  return [lerp(hp[0], flat[0], k), lerp(hp[1], flat[1], k)];
}

export default {
  id: 'riboswitch',
  title: L3('Een RNA-schakelaar voelt een klein molecuul', 'An RNA switch senses a small molecule'),
  scale: L3('vanggedeelte: 71 letters · ≈ 6 nm', 'catching part: 71 letters · ≈ 6 nm'),
  time: L3('omklappen: snel (niet op tijdschaal)', 'flipping: fast (not to time scale)'),
  org: L3('bacterie (Vibrio vulnificus) · PDB 1Y26', 'bacterium (Vibrio vulnificus) · PDB 1Y26'),
  legend: [[RNA, 'mRNA'], [ADE, L3('adenine (klein molecuul)', 'adenine (small molecule)')], [SD, L3('landingsplaats van het ribosoom', 'ribosome landing site')], [C.rrna, L3('ribosoom', 'ribosome')],
    [ARM1, L3('arm 1', 'arm 1')], [ARM2, L3('arm 2', 'arm 2')], [U74, L3('de U die met adenine paart', 'the U that pairs with adenine')]],
  simplified: {
    nl: 'De 2D-tekening is een schema: de echte schakelaar telt ruim honderd letters en het omklappen verloopt via tussenvormen; bij deze schakelaar helpt ook het ribosoom zelf mee. De 3D-structuur toont alleen het vanggedeelte met adenine, zonder het schakeldeel en zonder de landingsplaats; het RNA werd in het lab gemaakt. Dat er bij de mens geen schakelaars bekend zijn, betekent niet dat ze zeker ontbreken: er kunnen er nog ontdekt worden.',
    en: 'The 2D drawing is a diagram: the real switch has over a hundred letters and the flip goes through intermediate shapes; for this switch the ribosome itself also helps. The 3D structure only shows the catching part with adenine, without the switching part and without the landing site; the RNA was made in the lab. That no switches are known in humans does not mean they are surely absent: more may still be discovered.' },
  steps: [
    { dur: 9000, cam: FULL, title: L3('Een schakelaar in het mRNA zelf', 'A switch in the mRNA itself'),
      text: L3('Bij bacteriën kan het begin van een mRNA een klein molecuul voelen. Zonder adenine verstopt het de landingsplaats van het ribosoom.', 'In bacteria the start of an mRNA can sense a small molecule. Without adenine it hides the ribosome’s landing site.') },
    { dur: 9500, cam: FULL, title: L3('Adenine zet het gen aan', 'Adenine switches the gene on'),
      text: L3('Bindt adenine, dan klapt het RNA om. De landingsplaats komt vrij en het ribosoom kan beginnen.', 'When adenine binds, the RNA flips over. The landing site comes free and the ribosome can start.') },
    { dur: 9000, cam: FULL, title: L3('Het vanggedeelte in 3D', 'The catching part in 3D'),
      text: L3('Dit is het echte vanggedeelte van zo’n schakelaar, uit de bacterie Vibrio vulnificus. Het is één RNA-streng van 71 letters.', 'This is the real catching part of such a switch, from the bacterium Vibrio vulnificus. It is a single RNA strand of 71 letters.') },
    { dur: 9000, cam: FULL, title: L3('Twee lussen houden elkaar vast', 'Two loops hold on to each other'),
      text: L3('Twee armen van het RNA raken elkaar met hun lussen. Dat houdt de vorm stevig bij elkaar.', 'Two arms of the RNA touch each other with their loops. That holds the shape firmly together.') },
    { dur: 9500, cam: FULL, title: L3('Adenine zit opgesloten in het midden', 'Adenine is locked in the middle'),
      text: L3('Adenine zit diep in het midden, helemaal omsloten. Eén letter U paart ermee, net als A met U in RNA.', 'Adenine sits deep in the middle, completely enclosed. One letter U pairs with it, just like A with U in RNA.') },
    { dur: 9500, cam: FULL, title: L3('Vooral bij bacteriën', 'Mainly in bacteria'),
      text: L3('Zulke schakelaars kent men vooral bij bacteriën; planten en schimmels hebben er één soort. Bij de mens is er nog geen gevonden.', 'Such switches are known mainly in bacteria; plants and fungi have one kind. None has been found in humans yet.') },
  ],
  svg() {
    return svgOpen() + `
    <g id="rw-2d"><g id="rw-v"></g></g>
    <g id="rw-3d" opacity="0">
      ${frame3d('rw-box', 140, 130, 1060, 610, '', '')}
      <g opacity=".5"><path d="${smooth(APT.slice(0, 16).map(([x, y]) => [x + 370, y - 100]))}" stroke="${RNA}" stroke-width="12" fill="none" stroke-linecap="round"/><circle cx="670" cy="345" r="16" fill="${ADE}"/></g>
      ${T(670, 640, T2('3D-structuur laden…', '3D structure loading…'), { size: 24, col: C.muted, w: 500 })}
      ${T(1230, 330, T2('Het echte vanggedeelte', 'The real catching part'), { size: 28, anchor: 'start', w: 700 })}
      ${T(1230, 370, T2('bacterie · PDB 1Y26', 'bacterium · PDB 1Y26'), { size: 24, anchor: 'start', col: C.muted, w: 500 })}
      ${T(1230, 430, T2('oranje: RNA', 'orange: RNA'), { size: 24, anchor: 'start', col: RNA })}
      ${T(1230, 466, T2('blauw: adenine', 'blue: adenine'), { size: 24, anchor: 'start', col: ADE })}
    </g>
    ${btn('rnastructuur', 40, 330, T2('↑ hoe RNA zich vouwt', '↑ how RNA folds'), C.rna)}
    ${btn('btrp', 560, 400, T2('vergelijk: het trp-operon', 'compare: the trp operon'), '#d65a5a')}
    ${btn('bmrna', 1100, 460, T2('bacterie: de landingsplaats →', 'bacterium: the landing site →'), C.rrna)}
    </svg>`;
  },
  init(svg, api) {
    const $ = id => svg.getElementById(id);
    const v3 = inset3d(svg, { pdb: '1Y26', format: 'pdb', box: 'rw-box', base: BASE3, steps: S3, dimOpacity: false, off: !api?.node });
    return withInset({
      update(t, s) {
        const { step, p } = s;
        const op3 = v3.update(s);
        $('rw-3d').setAttribute('opacity', f1(op3));
        $('rw-2d').setAttribute('opacity', f1(1 - op3));
        if (op3 > .995) { $('rw-v').innerHTML = ''; return; }
        const ph = (i, a, b) => step > i ? 1 : step < i ? 0 : ease(sub(p, a, b));
        const kA = ph(1, .05, .35), kOn = ph(1, .35, .6), kR = ph(1, .6, .8), kP = ph(1, .8, 1);
        let o = '';
        // vanggedeelte
        o += `<path d="${smooth(APT)}" stroke="${RNA}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
        o += `<line x1="205" y1="285" x2="395" y2="285" stroke="#fff" stroke-width="3" stroke-dasharray="5 5" opacity=".7"/>`;
        for (let y = 490; y <= 580; y += 22) o += `<line x1="291" y1="${y}" x2="309" y2="${y}" stroke="#fff" stroke-width="3" opacity="${f1(kOn)}"/>`;
        o += `<circle cx="300" cy="445" r="24" fill="none" stroke="${ADE}" stroke-width="3" stroke-dasharray="6 5" opacity="${f1(1 - kA)}"/>`;
        o += T(300, 200, T2('vanggedeelte', 'catching part'), { size: 26, col: RNA, w: 700 });
        // adenine komt binnen
        const ax = lerp(560, 300, kA), ay = lerp(230, 445, kA);
        o += `<circle cx="${f1(ax)}" cy="${f1(ay)}" r="18" fill="${ADE}" stroke="#0a1224" stroke-width="2" opacity="${f1(step === 0 ? 0 : 1)}"/>` +
          T(ax, ay + 8, 'A', { size: 22, col: '#0a1224', halo: false, w: 800, op: step === 0 ? 0 : 1 }) +
          T(lerp(560, 300, kA) + 40, lerp(230, 445, kA) - 30, 'adenine', { size: 24, col: ADE, anchor: 'start', op: step === 1 ? 1 - sub(p, .3, .45) : 0 });
        // schakeldeel + landingsplaats
        const pts = Array.from({ length: 41 }, (_, i) => swPt(i / 40, kOn));
        o += `<path d="${smooth(pts)}" stroke="${RNA}" stroke-width="12" fill="none" stroke-linecap="round"/>`;
        const sd = Array.from({ length: 9 }, (_, i) => swPt(.62 + i * .025, kOn));
        o += `<path d="${smooth(sd)}" stroke="${SD}" stroke-width="20" fill="none" stroke-linecap="round"/>`;
        if (kOn < .99) for (let i = 0; i < 6; i++) { const yy = Y - 50 - i * 26; o += `<line x1="688" y1="${yy}" x2="712" y2="${yy}" stroke="#fff" stroke-width="3" opacity="${f1(1 - kOn)}"/>`; }
        o += T(745, 455, T2('landingsplaats verstopt', 'landing site hidden'), { size: 24, col: SD, anchor: 'start', op: 1 - kOn }) +
          T(830, 670, T2('landingsplaats vrij', 'landing site free'), { size: 24, col: SD, op: kOn });
        // coderend deel
        o += `<line x1="900" y1="${Y}" x2="1480" y2="${Y}" stroke="${RNA}" stroke-width="12" stroke-linecap="round"/>` +
          `<rect x="915" y="${Y - 16}" width="60" height="32" rx="6" fill="${C.ok}"/>` + T(945, Y + 8, 'AUG', { size: 22, col: '#0a1224', halo: false, w: 800, font: 'JetBrains Mono' }) +
          T(1250, Y + 60, T2('gen', 'gene'), { size: 26, col: C.text });
        // ribosoom
        const rx = lerp(860, 930, kR), ry = lerp(330, Y, kR);
        o += ribo(rx, ry, .9, 1, '');
        if (step === 0) o += `<g opacity="${f1(sub(p, .45, .65))}"><path d="M${rx + 70},${ry - 60} l40,40 M${rx + 110},${ry - 60} l-40,40" stroke="${C.danger}" stroke-width="8" stroke-linecap="round"/></g>`;
        for (let i = 0; i < Math.round(7 * kP); i++) o += `<circle cx="${f1(rx + 8 + 6 * Math.sin(i * 1.4))}" cy="${f1(ry - 100 - i * 22)}" r="10" fill="${C.chain}" stroke="#0a1224" stroke-width="2"/>`;
        o += T(1300, 420, T2('gen uit', 'gene off'), { size: 34, col: C.danger, w: 800, op: (step === 0 ? sub(p, .55, .75) : 1) * (1 - kOn) }) +
          T(1300, 420, T2('gen aan', 'gene on'), { size: 34, col: C.ok, w: 800, op: kR });
        $('rw-v').innerHTML = o;
      },
    }, v3);
  },
};
