/*
 * Ribosoombiogenese (mens) — rDNA → 47S pre-rRNA (Pol I) → snoRNP-modificaties → knippen (90S/SSU-processoom)
 * → r-eiwitten + 5S (Pol III) → aparte export van pre-40S en pre-60S → rijping in het cytoplasma.
 */
import { C, BASE, L, T2, svgOpen, pill, txt, cam, FULL, sub, ease, lerp, f1 } from '../../kit.js';
import { hud, placeHud, textBox, factor } from './_tlkit.js';
import { kernEnvelop, kernporie, ptsEllips, eiwit, ribosoom80S } from '../../bio.js';

const NUC = [560, 460, 470, 390], NO = [500, 430, 265, 215];      // kern en nucleolus (ellipsen)
const PORE1 = [1020, 380], PORE2 = [1020, 540];
/* kernenvelop (dubbel membraan) langs de ellips van de kern; poriën als fractie van de omtrek (gemeten vanaf de rechterkant, met de klok mee) */
const PW = 82, NUCP = ptsEllips(NUC[0], NUC[1], NUC[2], NUC[3], 260);
const POREF = (() => { const L = [0]; for (let i = 1; i <= NUCP.length; i++) { const a = NUCP[i - 1], b = NUCP[i % NUCP.length]; L.push(L[i - 1] + Math.hypot(b[0] - a[0], b[1] - a[1])); }
  const tot = L[L.length - 1]; return [PORE1, PORE2].map(([px, py]) => { let bi = 0, bd = 1e9; NUCP.forEach((q, i) => { const d = Math.hypot(q[0] - px, q[1] - py); if (d < bd) { bd = d; bi = i; } }); return L[bi] / tot; }); })();
const PANG = [PORE1, PORE2].map(([px, py]) => { const a = Math.atan2((py - NUC[1]) / NUC[3], (px - NUC[0]) / NUC[2]); return Math.atan2(NUC[3] * Math.cos(a), -NUC[2] * Math.sin(a)) * 180 / Math.PI; });
/* 47S pre-rRNA (≈ 13,4 kb): segmenten met lengte in kb */
const SEG = [['5′ETS', 3.66, 'sp'], ['18S', 1.87, 'r40'], ['ITS1', 1.08, 'sp'], ['5.8S', .16, 'r60'], ['ITS2', 1.17, 'sp'], ['28S', 5.07, 'r60'], ['3′ETS', .36, 'sp']];
const BX = 180, BY = 250, KB = 47;                               // balk: begin x, hoogte, px per kb
const SEGX = []; { let x = BX; for (const s of SEG) { const w = Math.max(16, s[1] * KB); SEGX.push([x, w]); x += w; } }
const COL = { sp: '#6b7894', r40: '#8df0dc', r60: C.rrna };
const ST = (dur, camv, nl, en, tnl, ten) => ({ dur, cam: camv, title: { nl, en }, text: { nl: tnl, en: ten } });
const E2 = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
const P40 = [400, 500], P60 = [640, 500];                        // plaats van pre-40S / pre-60S in de nucleolus
const R80 = ribosoom80S(0, 0, { s: .5, tRNAs: 0, mrna: false });   // rijp 80S (bio.js), gespiegeld getekend: 60S boven, 40S onder

export default {
  id: 'ribogenese',
  title: { nl: 'Ribosoombiogenese', en: 'Ribosome biogenesis' },
  scale: '≈ 1–5 µm', time: { nl: 'sterk versneld getoond', en: 'shown greatly sped up' },
  org: { nl: 'mens', en: 'human' },
  legend: [[C.dna, 'rDNA'], ['#8df0dc', '18S (→ 40S)'], [C.rrna, { nl: '5,8S + 28S (→ 60S)', en: '5.8S + 28S (→ 60S)' }], ['#6b7894', { nl: 'spacers (worden afgebroken)', en: 'spacers (degraded)' }], [C.prot, { nl: 'r-eiwitten / factoren', en: 'r-proteins / factors' }], ['#c3f06b', '5S rRNA'], ['#ffc247', 'snoRNA']],
  extra: {
    nl: '<p style="font-size:13px;color:#93a0bb">Lagen van de nucleolus: FC = fibrillair centrum (rDNA), DFC = dicht fibrillaire component (processing), GC = granulaire component (assemblage); de transcriptie gebeurt op de grens FC/DFC. De rRNA-modificaties (Me, Ψ) liggen vooral in de functionele centra van het ribosoom.</p>',
    en: '<p style="font-size:13px;color:#93a0bb">Layers of the nucleolus: FC = fibrillar centre (rDNA), DFC = dense fibrillar component (processing), GC = granular component (assembly); transcription takes place at the FC/DFC border. The rRNA modifications (Me, Ψ) lie mostly in the functional centres of the ribosome.</p>' },
  simplified: {
    nl: 'Sterk vereenvoudigd: in werkelijkheid gebeuren transcriptie, modificatie, knippen en assemblage grotendeels tegelijk (co-transcriptioneel), met > 200 assemblagefactoren en meerdere alternatieve knip-routes. Het 47S-transcript is op schaal (≈ 13 kb) maar de balk is 2D. Aantal en plaats van de getoonde modificaties zijn illustratief.',
    en: 'Strongly simplified: in reality transcription, modification, cleavage and assembly largely overlap (co-transcriptional), with > 200 assembly factors and several alternative processing pathways. The 47S transcript is to scale (≈ 13 kb) but the bar is 2D. Number and position of the modifications shown are illustrative.' },
  steps: [
    ST(8000, FULL, 'De bouw begint in de kern', 'Building starts in the nucleus', 'Dat gebeurt in de nucleolus: een plek in de kern zonder membraan, rond de genen voor ribosoom-RNA.', 'This happens in the nucleolus: a spot in the nucleus without a membrane, around the genes for ribosome RNA.'),
    ST(9000, cam(560, 470, 900), 'Honderden kopieën van het gen', 'Hundreds of copies of the gene', 'Deze genen liggen in honderden kopieën achter elkaar. Veel enzymen lezen tegelijk één gen: een kerstboom.', 'These genes lie in hundreds of copies in a row. Many enzymes read one gene at once: a Christmas tree.'),
    ST(8500, cam(510, 300, 820), 'Eén lang voorloper-RNA', 'One long precursor RNA', 'Eén lang RNA bevat drie ribosoom-RNA’s met opvulstukken ertussen. Zo ontstaan ze in gelijke aantallen.', 'One long RNA contains three ribosome RNAs with spacer pieces in between. This makes them in equal numbers.'),
    ST(9000, cam(520, 360, 900), 'Het RNA wordt aangepast', 'The RNA is modified', 'Kleine RNA’s met eiwitten zoeken de juiste plekken op en passen daar letters van het RNA chemisch aan.', 'Small RNAs with proteins find the right spots and chemically modify letters of the RNA there.'),
    ST(9000, cam(520, 400, 900), 'Knippen in twee routes', 'Cutting into two routes', 'Het RNA wordt geknipt: een deel voor de kleine helft, de rest voor de grote. Opvulstukken worden afgebroken.', 'The RNA is cut: one part goes to the small half, the rest to the large one. Spacer pieces are broken down.'),
    ST(9000, cam(720, 490, 1250), 'Eiwitten komen erbij', 'Proteins join', '≈ 80 eiwitten worden buiten de kern gemaakt en binnengebracht. Een klein RNA (5S) gaat naar de grote helft.', '≈ 80 proteins are made outside the nucleus and brought in. A small RNA (5S) joins the large half.'),
    ST(9000, cam(820, 460, 1350), 'Apart de kern uit', 'Leaving the nucleus separately', 'De twee helften verlaten de kern apart, door poriën in de kernwand, met hulp van transporteiwitten.', 'The two halves leave the nucleus separately, through pores in its wall, helped by transport proteins.'),
    ST(9500, cam(1240, 460, 820), 'Afwerking buiten de kern', 'Finishing outside the nucleus', 'Buiten de kern wordt het RNA op maat geknipt en gaan hulpeiwitten eraf. Pas bij de start van translatie vormen ze samen een ribosoom.', 'Outside the nucleus the RNA is trimmed and helper proteins come off. Only at the start of translation do the halves form a ribosome.'),
  ],
  svg() {
    const [nx, ny, nrx, nry] = NUC, [ox, oy, orx, ory] = NO;
    return svgOpen() + `
    <path d="M${nx + nrx},-200 h1200 v1300 h-1200 Z" fill="url(#gCyto)" opacity=".5"/>
    <g data-node="kern" data-color="${C.dna}" data-label="${T2('Celkern', 'Nucleus')}" data-nolabel>
      <ellipse cx="${nx}" cy="${ny}" rx="${nrx}" ry="${nry}" fill="url(#gNuc)"/>
      ${kernEnvelop(NUCP, { poriën: POREF, poreW: PW, w: 12, gap: 12, npc: false })}
    </g>
    <g data-node="kernimport" data-color="#9db4d8" data-label="${T2('Kernporie', 'Nuclear pore')}" data-nolabel>${[PORE1, PORE2].map(([x, y], k) => kernporie(x, y, PANG[k], { s: 1.3, H: 36, poreW: PW })).join('')}</g>
    <g data-node="nucleolus" data-color="${C.rrna}" data-label="${T2('Nucleolus', 'Nucleolus')}">
      <ellipse cx="${ox}" cy="${oy}" rx="${orx}" ry="${ory}" fill="rgba(44,198,168,.08)" stroke="${C.rrna}" stroke-width="2.5" stroke-dasharray="3 7"/>
      ${[[360, 330], [620, 320], [420, 600], [640, 590]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="42" fill="rgba(44,198,168,.14)"/><circle cx="${x}" cy="${y}" r="20" fill="rgba(79,143,247,.18)"/>`).join('')}
      <circle id="rg-nA" data-anchor="nucleolus" cx="${ox - 60}" cy="${oy - ory + 20}" r="1" fill="none"/>
    </g>
    <g id="rg-lab"></g>
    <g data-node="polymerasen" data-color="${C.dna}" data-label="${T2('RNA-polymerase I', 'RNA polymerase I')}"><g id="rg-rdna"></g><circle id="rg-pA" data-anchor="polymerasen" r="1" fill="none"/></g>
    <g data-node="rnastructuur" data-color="${C.rrna}" data-label="rRNA" data-href="../atlas/index.html?id=rrna"><g id="rg-bar"></g><circle id="rg-bA" data-anchor="rnastructuur" r="1" fill="none"/></g>
    <g id="rg-sno"></g>
    <g data-node="ribosoom" data-color="${C.rrna}" data-label="${T2('Ribosoom (80S)', 'Ribosome (80S)')}"><g id="rg-part"></g><circle id="rg-rA" data-anchor="ribosoom" r="1" fill="none"/></g>
    <g data-node="translatie" data-color="${C.rna}" data-label="${T2('Translatie', 'Translation')}"><g id="rg-tl"></g><circle id="rg-tA" data-anchor="translatie" r="1" fill="none"/></g>
    <g id="rg-ov"></g>
    ${hud('rg-hud', [
      { node: 'translatie', label: { nl: '↩ Translatie (hoofdverhaal)', en: '↩ Translation (main story)' }, color: C.rrna },
      { node: 'ribosoom', label: { nl: 'Ribosoom (structuur)', en: 'Ribosome (structure)' }, color: C.rrna },
      { node: 'rnastructuur', label: { nl: 'rRNA in 3D', en: 'rRNA in 3D' }, color: C.rrna, href: '../atlas/index.html?id=ribosome' },
    ])}
    </svg>`;
  },
  init(svg) {
    const STEPS = this?.steps ?? [];
    const $ = id => svg.getElementById(id);
    const hide = id => $(id).setAttribute('cx', '-9999');
    /* deeltjes: kleine (pre-)40S en grote (pre-)60S subeenheid, met factoren (grijs-paarse bolletjes) */
    /* pre-40S (klein) en pre-60S (groot): rRNA met r-eiwitten, als bobbelige deeltjes; f = assemblagefactoren (paarse eiwitjes) */
    const small = (x, y, op = 1, f = 1, lab = '') => op <= .01 ? '' : `<g opacity="${f1(op)}">${eiwit(x, y, 30, 18, '#8df0dc', { seed: 40, bumps: .08 })}` +
      (f > .01 ? `<g opacity="${f1(f)}">${eiwit(x - 27, y + 14, 9, 7, C.prot3, { seed: 3 })}${eiwit(x + 27, y + 13, 8, 7, C.prot3, { seed: 4 })}</g>` : '') +
      (lab ? txt(x, y - 30, lab, '#8df0dc', 20, 'middle', 700) : '') + '</g>';
    const large = (x, y, op = 1, f = 1, lab = '', onder = false) => op <= .01 ? '' : `<g opacity="${f1(op)}">${eiwit(x, y, 38, 27, C.rrna, { seed: 60, bumps: .07 })}` +
      (f > .01 ? `<g opacity="${f1(f)}">${eiwit(x - 33, y - 17, 9, 8, C.prot3, { seed: 5 })}${eiwit(x + 34, y - 12, 9, 7, C.prot3, { seed: 6 })}${eiwit(x + 4, y - 29, 9, 7, C.prot3, { seed: 7 })}</g>` : '') +
      (lab ? txt(x, onder ? y + 64 : y - 50, lab, C.rrna, 20, 'middle', 700) : '') + '</g>';
    /* de 47S-balk; cut = 0..1 (knippen en uit elkaar), marks = modificaties */
    function bar(op, cut, marks) {
      if (op <= .01) return '';
      let s = `<g opacity="${f1(op)}">`;
      SEG.forEach(([name, kb, kind], j) => {
        let [x, w] = SEGX[j], y = BY;
        let o = 1;
        if (cut > 0) {
          if (kind === 'sp') { o = 1 - sub(cut, .35, .7); y += 40 * sub(cut, .35, .7); }
          else if (kind === 'r40') { x += (P40[0] - 44 - x) * sub(cut, .5, 1); y += (P40[1] - 40 - BY) * sub(cut, .5, 1); }
          else { const tx = name === '28S' ? P60[0] - 100 : P60[0] - 130; x += (tx - x) * sub(cut, .5, 1); y += (P60[1] - 44 - BY) * sub(cut, .5, 1); if (name === '28S') w = lerp(w, 200, sub(cut, .5, 1)); }
        }
        if (cut > 0 && kind !== 'sp') o = 1 - sub(cut, .85, 1);
        if (o <= .01) return;
        s += `<g opacity="${f1(o)}"><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="40" rx="6" fill="${COL[kind]}" fill-opacity="${kind === 'sp' ? .55 : .9}" stroke="#0a1224" stroke-width="2"/>`;
        const lab = name.replace('5.8S', L({ nl: '5,8S', en: '5.8S' }));
        if (cut < .5) s += txt(x + w / 2, j % 2 ? y + 72 : y - 14, lab, kind === 'sp' ? C.muted : COL[kind], kind === 'sp' ? 18 : 22, 'middle', 800);
        s += '</g>';
      });
      if (cut < .3) s += txt(BX - 16, BY + 28, "5′", '#fff', 22, 'end', 700) + txt(SEGX[6][0] + SEGX[6][1] + 12, BY + 28, "3′", '#fff', 22, 'start', 700);
      for (const [x, kind, k] of marks) if (k > .01) s += `<g opacity="${f1(k)}"><circle cx="${f1(x)}" cy="${BY - 2}" r="11" fill="${kind === 'm' ? '#ffffff' : '#ffc247'}" stroke="#0a1224" stroke-width="2"/><text x="${f1(x)}" y="${BY + 3}" font-size="${kind === 'm' ? 12 : 14}" text-anchor="middle" fill="#0a1224" font-family="Inter" font-weight="800">${kind === 'm' ? 'Me' : 'Ψ'}</text></g>`;
      return s + '</g>';
    }
    const MARKS = [[SEGX[1][0] + 20, 'm'], [SEGX[1][0] + 60, 'p'], [SEGX[5][0] + 30, 'p'], [SEGX[5][0] + 90, 'm'], [SEGX[5][0] + 150, 'm'], [SEGX[5][0] + 210, 'p'], [SEGX[3][0] + 6, 'm']];

    return {
      update(t, s) {
        placeHud(svg, 'rg-hud', .015, .105, STEPS[s.step]?.cam);
        const { step: i, p } = s;
        let rd = '', br = '', sno = '', part = '', tl = '', ov = '', lab = '';
        // vaste labels (overzicht)
        if (i === 0) {
          const k = sub(p, .1, .3);
          lab += `<g opacity="${f1(k)}">` + txt(NO[0], NO[1] - NO[3] - 16, 'nucleolus', C.rrna, 30, 'middle', 800) + txt(NUC[0] - 200, NUC[1] + 250, T2('kern (nucleoplasma)', 'nucleus (nucleoplasm)'), '#9cc0ff', 24, 'middle', 700) + txt(1300, 200, T2('cytoplasma', 'cytoplasm'), C.muted, 26, 'middle', 700) + txt(1070, PORE1[1] - 40, T2('kernporie', 'nuclear pore'), C.prot, 24, 'start', 700) + '</g>';
          lab += `<g opacity="${f1(sub(p, .4, .6))}">` + textBox(1110, 420, 440, [T2('FC: rDNA', 'FC: rDNA'), T2('FC/DFC-grens: transcriptie', 'FC/DFC border: transcription'), T2('DFC: processing', 'DFC: processing'), T2('GC: assemblage', 'GC: assembly')], { title: T2('Lagen van de nucleolus', 'Layers of the nucleolus'), col: C.rrna, fs: 23 }) + '</g>';
        }
        $('rg-lab').innerHTML = lab;
        $('rg-nA').setAttribute('cx', i === 0 ? '-9999' : f1(NO[0] - 60));   // stap 1 heeft de titel 'nucleolus' al op die plek
        // rDNA-kerstboom (stap 1–2)
        if (i <= 2) {
          const op = i === 0 ? .6 : i === 2 ? 1 - .7 * sub(p, 0, .3) : 1;
          const y = 520, g0 = 260, g1 = 700;
          rd += `<g opacity="${f1(op)}"><line x1="170" y1="${y}" x2="840" y2="${y}" stroke="${C.dna}" stroke-width="8" stroke-linecap="round"/>` +
            `<rect x="${g0}" y="${y - 8}" width="${g1 - g0}" height="16" rx="6" fill="${C.dna2}" opacity=".6"/>`;
          const n = 13, grow = i === 1 ? sub(p, .05, .9) : 1;
          for (let k = 0; k < n; k++) {
            const x = g0 + 12 + k * ((g1 - g0 - 24) / (n - 1)) * grow, len = 14 + (x - g0) * .36;
            rd += `<path d="M${f1(x)},${y - 10} q${f1(-len * .15)},${f1(-len * .5)} ${f1(len * .1)},${f1(-len)}" stroke="${C.rrna}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="${f1(x)}" cy="${y}" r="9" fill="${C.prot}" stroke="#0a1224" stroke-width="2"/>`;
          }
          if (i === 1) rd += `<g opacity="${f1(sub(p, .2, .35))}">` + txt(g0, y + 50, T2('rRNA-gen (≈ 13 kb)', 'rRNA gene (≈ 13 kb)'), C.dna2, 20, 'start', 700) + txt(790, y + 50, T2('spacer', 'spacer'), C.muted, 18, 'middle', 600) +
            txt(480, y + 90, T2('Pol I + groeiende transcripten', 'Pol I + growing transcripts'), '#fff', 20, 'middle', 700) + txt(g0 + 10, y - 60, "5′", '#fff', 18, 'middle') + '</g>' +
            `<g opacity="${f1(sub(p, .55, .7))}">` + textBox(705, 262, 300, [T2('honderden kopieën', 'hundreds of copies'), T2('in tandem op chr', 'in tandem on chr'), '13, 14, 15, 21, 22'], { col: C.dna2, fs: 18 }) + '</g>';
          rd += '</g>';
          $('rg-pA').setAttribute('cx', '215'); $('rg-pA').setAttribute('cy', f1(y - 14));
        } else if (i === 5) {
          // 5S-gen (Pol III) in het nucleoplasma
          rd += `<g opacity="${f1(sub(p, .3, .45))}"><line x1="430" y1="720" x2="650" y2="720" stroke="${C.dna}" stroke-width="7"/><circle cx="510" cy="720" r="9" fill="${C.prot2}" stroke="#0a1224" stroke-width="2"/>${txt(430, 758, T2('5S-gen (chr 1) · Pol III', '5S gene (chr 1) · Pol III'), C.dna2, 18, 'start', 700)}</g>`;
          hide('rg-pA');                                  // de chip hoort bij Pol I op het rDNA; hier staat 'Pol III' al bij het 5S-gen
        } else hide('rg-pA');
        $('rg-rdna').innerHTML = rd;
        // 47S-balk
        const barOp = i === 2 ? sub(p, .15, .4) : i === 3 ? 1 : i === 4 ? 1 - sub(p, .9, 1) : 0;
        const marks = MARKS.map(([x, k], j) => [x, k, i === 3 ? sub(p, .25 + j * .08, .3 + j * .08) : i === 4 ? 1 - sub(p, .5, .6) : 0]);
        br = bar(barOp, i === 4 ? sub(p, .1, .9) : 0, marks);
        if (i === 2) ov += `<g opacity="${f1(sub(p, .5, .7))}">` + txt(BX + 330, BY + 150, T2('47S pre-rRNA ≈ 13 kb (Pol I)', '47S pre-rRNA ≈ 13 kb (Pol I)'), '#fff', 26, 'middle', 800) + txt(BX + 330, BY + 184, T2('rijp rRNA ≈ 7 kb · spacers ≈ 6 kb', 'mature rRNA ≈ 7 kb · spacers ≈ 6 kb'), C.muted, 20, 'middle', 600) + '</g>';
        $('rg-bar').innerHTML = br;
        if (barOp > .1) { $('rg-bA').setAttribute('cx', f1(SEGX[5][0] + 120)); $('rg-bA').setAttribute('cy', f1(BY - 40)); } else hide('rg-bA');
        // snoRNP's
        if (i === 3) {
          const cd = ease(sub(p, .05, .3)), ha = ease(sub(p, .35, .6));
          const guide = (x, y, col, name, prot, k) => k <= .01 ? '' : `<g opacity="${f1(k)}"><path d="M${x - 60},${y} h120" stroke="${col}" stroke-width="6" stroke-linecap="round"/><path d="M${x - 60},${y} q-30,30 0,60 h120 q30,-30 0,-60" stroke="${col}" stroke-width="4" fill="none" opacity=".7"/>` +
            `<ellipse cx="${x}" cy="${y + 58}" rx="54" ry="22" fill="${C.prot}" opacity=".85"/>${txt(x, y + 64, prot, '#fff', 16, 'middle', 700)}${txt(x, y + 110, name, col, 20, 'middle', 800)}` +
            [-40, -20, 0, 20, 40].map(dx => `<path d="M${x + dx},${y - 4} V${BY + 80} M${x + dx},${BY + 52} V${BY + 44}" stroke="#fff" stroke-width="2" stroke-dasharray="3 3"/>`).join('') + '</g>';
          sno += guide(SEGX[5][0] + 90, BY + 96 + (1 - cd) * 80, '#ffc247', T2('C/D-box-snoRNA', 'C/D box snoRNA'), T2('fibrillarine', 'fibrillarin'), cd);
          sno += guide(SEGX[1][0] + 60, BY + 96 + (1 - ha) * 80, '#ffe08a', T2('H/ACA-snoRNA', 'H/ACA snoRNA'), T2('dyskerine', 'dyskerin'), ha);
          ov += `<g opacity="${f1(sub(p, .7, .85))}">` + textBox(330, 505, 470, [T2('Me = 2′-O-methylribose (≈ 100×)', 'Me = 2′-O-methylribose (≈ 100×)'), T2('Ψ = pseudo-uridine (≈ 100×)', 'Ψ = pseudouridine (≈ 100×)')], { col: '#ffc247', fs: 19 }) + '</g>';
        }
        $('rg-sno').innerHTML = sno;
        // deeltjes
        const fac = i < 7 ? 1 : 1 - sub(p, .15, .45);
        if (i === 4) {
          part += small(P40[0], P40[1], sub(p, .75, .95), 1, T2('pre-40S', 'pre-40S')) + large(P60[0] + 30, P60[1] + 30, sub(p, .75, .95), 1, T2('pre-60S', 'pre-60S'));
          ov += `<g opacity="${f1(sub(p, .1, .3) * (1 - sub(p, .6, .7)))}">` + txt(SEGX[2][0] + SEGX[2][1] / 2, BY - 30, '✂', '#fff', 40, 'middle', 800) + txt(SEGX[0][0] + SEGX[0][1], BY - 30, '✂', '#fff', 40, 'middle', 800) + txt(SEGX[4][0] + SEGX[4][1] / 2, BY - 30, '✂', '#fff', 40, 'middle', 800) + '</g>';
          ov += `<g opacity="${f1(sub(p, .1, .3))}">` + txt(SEGX[0][0] + 60, BY + 120, T2('SSU-processoom (90S) + U3', 'SSU processome (90S) + U3'), C.prot, 20, 'start', 700) + '</g>';
          ov += `<g opacity="${f1(sub(p, .4, .6) * (1 - sub(p, .8, .95)))}">` + pill(SEGX[4][0] + 20, BY + 150, 190, 34, T2('exosoom: spacers weg', 'exosome: spacers gone'), '#5b6478', 1, 17) + '</g>';
        }
        let p40 = P40, p60 = [P60[0] + 30, P60[1] + 30];
        if (i === 5) {
          part += small(p40[0], p40[1], 1, 1, T2('pre-40S', 'pre-40S')) + large(p60[0], p60[1], 1, 1, T2('pre-60S', 'pre-60S'));
          // r-eiwitten importeren
          for (let k = 0; k < 10; k++) {
            const t0 = .05 + k * .05, kk = sub(p, t0, t0 + .35), path = kk < .5 ? E2([1400 - k * 20, 250 + k * 50], [PORE1[0] + (k % 2) * 0, (k % 2 ? PORE2 : PORE1)[1]], kk * 2) : E2((k % 2 ? PORE2 : PORE1), k % 2 ? p60 : p40, (kk - .5) * 2);
            if (kk > 0 && kk < 1) part += eiwit(path[0], path[1], 9, 8, C.prot, { seed: 20 + k });
          }
          const k5 = ease(sub(p, .5, .85)), f5 = E2([560, 710], [p60[0] + 10, p60[1] - 20], k5);
          part += `<g opacity="${f1(sub(p, .45, .5))}"><path d="M${f1(f5[0] - 10)},${f1(f5[1] + 18)} v-26 a10,10 0 0 1 20,0 v26" stroke="#c3f06b" stroke-width="6" fill="none" stroke-linecap="round"/></g>`;
          ov += `<g opacity="${f1(sub(p, .1, .25))}">` + txt(1170, 200, T2('r-eiwitten uit het cytoplasma', 'r-proteins from the cytoplasm'), C.prot, 22, 'middle', 700) + '</g>' +
            `<g opacity="${f1(sub(p, .6, .75))}">` + txt(p60[0], p60[1] + 66, T2('5S rRNA (+ uL5, uL18)', '5S rRNA (+ uL5, uL18)'), '#c3f06b', 20, 'middle', 700) + '</g>';
        }
        if (i === 6) {
          const k6 = ease(sub(p, .1, .55)), k4 = ease(sub(p, .4, .85));
          const q60 = k6 < .5 ? E2(p60, PORE2, k6 * 2) : E2(PORE2, [1260, 590], (k6 - .5) * 2), q40 = k4 < .5 ? E2(p40, PORE1, k4 * 2) : E2(PORE1, [1250, 350], (k4 - .5) * 2);
          part += large(q60[0], q60[1], 1, 1, T2('pre-60S', 'pre-60S')) + small(q40[0], q40[1], 1, 1, T2('pre-40S', 'pre-40S'));
          part += `<g opacity="${f1(sub(p, .1, .2) * (1 - sub(p, .6, .7)))}">${factor(q60[0], q60[1] + 54, 128, 26, 'CRM1 · NMD3', C.prot2, 1, 15)}</g>`;
          part += `<g opacity="${f1(sub(p, .4, .5) * (1 - sub(p, .88, .95)))}">${factor(q40[0], q40[1] - 80, 70, 26, 'CRM1', C.prot2, 1, 15)}</g>`;
          ov += `<g opacity="${f1(sub(p, .85, 1))}">` + txt(1250, 780, T2('apart, niet als 80S!', 'separately, not as 80S!'), '#fff', 24, 'middle', 800) + '</g>';
        }
        if (i === 7) {
          // zoals bij de start van translatie: eerst bindt de 40S (onder het mRNA) op het startcodon AUG, daarna komt de 60S (erboven) erbij
          const j40 = ease(sub(p, .45, .68)), j60 = ease(sub(p, .64, .85)), join = j60;
          const a40 = E2([1215, 620], [1185, 524], j40), a60 = E2([1225, 330], [1190, 474], j60);   // 60S boven, 40S onder, het mRNA ertussen
          const mk = sub(p, .8, .92);                       // de losse helften gaan over in één 80S: twee eenheden tegen elkaar, het mRNA ertussen
          part += `<g opacity="${f1(1 - mk)}">` + large(a60[0], a60[1], 1, fac, join < .5 ? T2('pre-60S → 60S', 'pre-60S → 60S') : '') + small(a40[0], a40[1], 1, fac, '') +
            (j40 < .5 ? txt(a40[0], a40[1] + 44, sub(p, .2, .4) > .5 ? '18S-E → 18S' : '18S-E', '#8df0dc', 20, 'middle', 700) : '') + '</g>';
          if (mk > .01) part += `<g opacity="${f1(mk)}" transform="translate(1190 511) scale(1 -1) translate(0 ${f1(-R80.mrnaY)})">${R80.svg}</g>`;
          { const off = ease(sub(p, .15, .45)), fo = 1 - sub(p, .45, .6);   // rijpingsfactoren (klein t.o.v. de subeenheden) zitten er eerst nog op en gaan er dan af
            const fz = (x, y, lab, sd, an) => eiwit(x, y, 13, 10, C.prot2, { seed: sd }) + txt(x + (an === 'end' ? -20 : 20), y + 7, lab, '#c9bfff', 21, an, 700);
            ov += `<g opacity="${f1(fo)}">` + fz(lerp(1282, 1380, off), lerp(362, 320, off), 'NOB1', 31, 'start') +
              fz(lerp(1282, 1400, off), lerp(612, 660, off), 'eIF6', 32, 'start') + fz(lerp(1226, 1120, off), lerp(616, 680, off), 'NMD3', 33, 'end') + '</g>'; }
          tl += `<g><line x1="1066" y1="511" x2="1500" y2="511" stroke="${C.rna}" stroke-width="7"/>${[...'GCCACCAUGGCUUCAGGAUCUGAAUAA'].map((b, k) => { const bx = 1078 + k * 16; return `<rect x="${bx - 6}" y="514" width="12" height="16" rx="3" fill="${BASE[b]}"/>`; }).join('')}${txt(1500, 494, "mRNA", C.rna, 22, "end", 700)}${txt(1066, 545, "5′", C.rna, 20, 'start', 700)}${txt(1500, 545, "3′", C.rna, 20, 'end', 700)}</g>`;
          ov += `<g opacity="${f1(sub(p, .85, .95))}">` + txt(1190, 650, T2('80S op het startcodon (AUG)', '80S on the start codon (AUG)'), '#fff', 24, 'middle', 800) + '</g>';
          $('rg-tA').setAttribute('cx', '1100'); $('rg-tA').setAttribute('cy', '505');
          $('rg-rA').setAttribute('cx', f1(a60[0])); $('rg-rA').setAttribute('cy', f1(a60[1] - 70));
        } else { hide('rg-tA'); hide('rg-rA'); }
        $('rg-part').innerHTML = part; $('rg-tl').innerHTML = tl; $('rg-ov').innerHTML = ov;
      },
    };
  },
};
