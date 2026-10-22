/* eslint-disable react/no-array-index-key */
import { useId } from 'react';
import './Artwork.css';

/**
 * ARTWORK — original CSS/SVG compositions used as replaceable concept visuals.
 * Each variant is a pure function of (colors, props). Swap any usage for a real
 * image by changing the media object's `kind` to 'image' in data/projects.js.
 */

const SCHEMES = {
  ivory: { bg: '#F4F0E8', fg: '#171717', accent: '#304FFE', accent2: '#FF4D24', muted: '#888780', surface: '#E6E1D6', line: 'rgba(23,23,23,0.18)' },
  ink: { bg: '#171717', fg: '#F4F0E8', accent: '#FF4D24', accent2: '#304FFE', muted: 'rgba(244,240,232,0.5)', surface: '#2A2A2A', line: 'rgba(244,240,232,0.18)' },
  cobalt: { bg: '#304FFE', fg: '#F4F0E8', accent: '#FF4D24', accent2: '#171717', muted: 'rgba(244,240,232,0.6)', surface: 'rgba(244,240,232,0.16)', line: 'rgba(244,240,232,0.3)' },
  orange: { bg: '#FF4D24', fg: '#171717', accent: '#F4F0E8', accent2: '#304FFE', muted: 'rgba(23,23,23,0.55)', surface: 'rgba(23,23,23,0.12)', line: 'rgba(23,23,23,0.3)' },
};

const range = (n) => Array.from({ length: n }, (_, i) => i);

/** UI mockups keep a readable light screen when the outer scheme is a loud colour. */
const screenPalette = (c) => (c === SCHEMES.cobalt || c === SCHEMES.orange ? SCHEMES.ivory : c);

/* ---------- small building blocks ---------- */
const Lines = ({ x, y, w, n = 3, gap = 14, h = 6, color, widths }) =>
  range(n).map((i) => (
    <rect key={i} x={x} y={y + i * gap} width={widths ? w * widths[i % widths.length] : w * (i === n - 1 ? 0.6 : 1)} height={h} rx={h / 2} fill={color} />
  ));

const ImgBox = ({ x, y, w, h, c, r = 4 }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={r} fill={c.surface} />
    <line x1={x} y1={y} x2={x + w} y2={y + h} stroke={c.line} strokeWidth="1" />
    <line x1={x + w} y1={y} x2={x} y2={y + h} stroke={c.line} strokeWidth="1" />
  </g>
);

const Halftone = ({ id, color }) => (
  <pattern id={id} width="9" height="9" patternUnits="userSpaceOnUse">
    <circle cx="4.5" cy="4.5" r="1.3" fill={color} />
  </pattern>
);

/* ---------- variants ---------- */
const variants = {
  monogram: (c, p, uid) => ({
    vb: '0 0 800 600',
    el: (
      <>
        <defs>
          <Halftone id={`ht-${uid}`} color={c.fg} />
        </defs>
        <rect width="800" height="600" fill={c.bg} />
        <circle cx="640" cy="150" r="90" fill={c.accent2} />
        <rect x="0" y="330" width="800" height="270" fill={`url(#ht-${uid})`} opacity="0.35" />
        <rect x="80" y="110" width="360" height="360" rx="180" fill="none" stroke={c.fg} strokeWidth="2" />
        <text x="260" y="400" textAnchor="middle" className="art-display" fontSize="300" fill={c.fg}>
          S
        </text>
        <rect x="430" y="330" width="140" height="48" fill={c.accent} transform="rotate(-10 500 354)" />
        <text x="80" y="540" className="art-mono" fontSize="14" fill={c.muted}>
          MONOGRAM / CONSTRUCTION V3
        </text>
        <text x="720" y="540" textAnchor="end" className="art-mono" fontSize="14" fill={c.muted}>
          01 — IDENTITY
        </text>
        {['#171717', '#F4F0E8', '#FF4D24', '#304FFE', '#888780'].map((hex, i) => (
          <rect key={hex} x={520 + i * 40} y={440} width="32" height="32" fill={hex} stroke={c.line} />
        ))}
      </>
    ),
  }),

  marks: (c, p) => {
    const cells = range(12);
    const cw = 200;
    const ch = 200;
    const draw = (i, cx, cy) => {
      if (p.mode === 'layouts') {
        return (
          <g key={i}>
            <rect x={cx - 60} y={cy - 70} width="120" height="140" fill={c.bg} stroke={c.line} />
            {i % 3 === 0 && <rect x={cx - 48} y={cy - 56} width="96" height="52" fill={c.surface} />}
            {i % 3 === 1 && <circle cx={cx + 20} cy={cy - 30} r="24" fill={c.surface} />}
            <Lines x={cx - 48} y={cy + (i % 3 === 2 ? -50 : 10)} w={96} n={i % 3 === 2 ? 5 : 3} gap={11} h={5} color={c.fg} widths={[1, 0.8, 0.5]} />
          </g>
        );
      }
      const shapes = [
        <circle cx={cx} cy={cy} r="40" fill={c.fg} />,
        <rect x={cx - 34} y={cy - 34} width="68" height="68" fill={c.fg} transform={`rotate(45 ${cx} ${cy})`} />,
        <path d={`M${cx - 40},${cy} a40,40 0 0 1 80,0 z`} fill={c.accent} />,
        <circle cx={cx} cy={cy} r="40" fill="none" stroke={c.fg} strokeWidth="10" />,
        <path d={`M${cx},${cy - 42} L${cx + 42},${cy + 34} L${cx - 42},${cy + 34} z`} fill={c.fg} />,
        <g>
          <rect x={cx - 42} y={cy - 8} width="84" height="16" fill={c.fg} />
          <rect x={cx - 8} y={cy - 42} width="16" height="84" fill={c.fg} />
        </g>,
        <g>
          <circle cx={cx - 18} cy={cy} r="26" fill={c.accent2} />
          <circle cx={cx + 18} cy={cy} r="26" fill={c.fg} />
        </g>,
        <rect x={cx - 40} y={cy - 40} width="80" height="80" rx="24" fill="none" stroke={c.fg} strokeWidth="8" />,
        <path d={`M${cx - 40},${cy + 30} Q${cx},${cy - 60} ${cx + 40},${cy + 30}`} fill="none" stroke={c.fg} strokeWidth="10" strokeLinecap="round" />,
        <text x={cx} y={cy + 28} textAnchor="middle" className="art-display" fontSize="84" fill={c.fg}>
          S
        </text>,
        <g>
          <circle cx={cx} cy={cy} r="40" fill={c.fg} />
          <circle cx={cx} cy={cy} r="16" fill={c.bg} />
        </g>,
        <text x={cx} y={cy + 24} textAnchor="middle" className="art-serif" fontSize="92" fill={c.accent}>
          s
        </text>,
      ];
      return (
        <g key={i}>
          {shapes[i % shapes.length]}
          <text x={cx - 84} y={cy + 84} className="art-mono" fontSize="11" fill={c.muted}>
            {String(i + 1).padStart(2, '0')}
          </text>
        </g>
      );
    };
    return {
      vb: '0 0 800 600',
      el: (
        <>
          <rect width="800" height="600" fill={c.bg} />
          {range(3).map((r) => (
            <line key={`h${r}`} x1="0" y1={ch * (r + 1)} x2="800" y2={ch * (r + 1)} stroke={c.line} />
          ))}
          {range(3).map((r) => (
            <line key={`v${r}`} x1={cw * (r + 1)} y1="0" x2={cw * (r + 1)} y2="600" stroke={c.line} />
          ))}
          {cells.map((i) => draw(i, (i % 4) * cw + cw / 2, Math.floor(i / 4) * ch + ch / 2))}
        </>
      ),
    };
  },

  palette: (c) => ({
    vb: '0 0 800 450',
    el: (
      <>
        <rect width="800" height="450" fill={c.bg} />
        {[
          ['#F4F0E8', 'IVORY'],
          ['#171717', 'INK'],
          ['#FF4D24', 'ORANGE'],
          ['#304FFE', 'COBALT'],
          ['#888780', 'STONE'],
        ].map(([hex, name], i) => (
          <g key={hex}>
            <rect x={40 + i * 76} y="60" width="68" height={200 - i * 18} fill={hex} stroke={c.line} />
            <text x={40 + i * 76} y="290" className="art-mono" fontSize="11" fill={c.fg}>
              {name}
            </text>
            <text x={40 + i * 76} y="306" className="art-mono" fontSize="11" fill={c.muted}>
              {hex}
            </text>
          </g>
        ))}
        <line x1="440" y1="40" x2="440" y2="410" stroke={c.line} />
        <text x="480" y="190" className="art-display" fontSize="150" fill={c.fg}>
          Aa
        </text>
        <text x="640" y="190" className="art-serif" fontSize="150" fill={c.accent}>
          Aa
        </text>
        <text x="480" y="250" className="art-mono" fontSize="12" fill={c.muted}>
          SPACE GROTESK / INSTRUMENT SERIF
        </text>
        <text x="480" y="330" className="art-mono" fontSize="56" fill={c.fg}>
          0123
        </text>
        <text x="480" y="360" className="art-mono" fontSize="12" fill={c.muted}>
          JETBRAINS MONO — DATA & LABELS
        </text>
        <text x="40" y="400" className="art-sans" fontSize="16" fill={c.fg}>
          Colour roles: surface · text · highlight · secondary · metadata
        </text>
      </>
    ),
  }),

  menu: (c) => ({
    vb: '0 0 600 800',
    el: (
      <>
        <rect width="600" height="800" fill={c.bg} />
        <circle cx="500" cy="110" r="46" fill={c.accent2} />
        <text x="50" y="140" className="art-display" fontSize="110" fill={c.fg}>
          MENU
        </text>
        <text x="52" y="190" className="art-serif" fontSize="40" fill={c.accent}>
          evening, from six
        </text>
        {['Starters', 'Mains', 'Breads & Rice', 'Sweet'].map((sec, s) => (
          <g key={sec} transform={`translate(50 ${250 + s * 128})`}>
            <text y="0" className="art-mono" fontSize="12" fill={c.muted}>
              {String(s + 1).padStart(2, '0')} — {sec.toUpperCase()}
            </text>
            {range(3).map((i) => (
              <g key={i} transform={`translate(0 ${26 + i * 26})`}>
                <rect x="0" y="-9" width={150 + ((i * 37 + s * 19) % 110)} height="9" rx="4" fill={c.fg} />
                <line x1={320} y1="-4" x2="440" y2="-4" stroke={c.line} strokeDasharray="2 4" />
                <text x="500" y="0" textAnchor="end" className="art-mono" fontSize="13" fill={c.fg}>
                  {(4 + i * 2 + s * 3).toFixed(2)}
                </text>
              </g>
            ))}
          </g>
        ))}
        <line x1="50" y1="748" x2="550" y2="748" stroke={c.line} />
        <text x="50" y="774" className="art-mono" fontSize="11" fill={c.muted}>
          ALL PRICES INCLUSIVE · ASK ABOUT ALLERGENS
        </text>
      </>
    ),
  }),

  social: (c, p, uid) => {
    const tiles = range(9);
    return {
      vb: '0 0 600 600',
      el: (
        <>
          <defs>
            <Halftone id={`ht-${uid}`} color={c.fg} />
          </defs>
          <rect width="600" height="600" fill={c.bg} />
          {tiles.map((i) => {
            const x = (i % 3) * 200;
            const y = Math.floor(i / 3) * 200;
            const kind = i % 4;
            const fills = [c.fg, c.accent2, c.accent, c.surface];
            return (
              <g key={i}>
                <rect x={x + 6} y={y + 6} width="188" height="188" fill={fills[kind]} />
                {kind === 0 && (
                  <text x={x + 24} y={y + 150} className="art-display" fontSize="96" fill={c.bg}>
                    {['NEW', 'HOT', 'SIX'][i % 3]}
                  </text>
                )}
                {kind === 1 && <circle cx={x + 100} cy={y + 100} r="56" fill={`url(#ht-${uid})`} />}
                {kind === 2 && (
                  <text x={x + 24} y={y + 120} className="art-serif" fontSize="64" fill={c.bg}>
                    tonight
                  </text>
                )}
                {kind === 3 && <rect x={x + 60} y={y + 60} width="80" height="80" fill={c.fg} transform={`rotate(${i * 11} ${x + 100} ${y + 100})`} />}
                <text x={x + 20} y={y + 178} className="art-mono" fontSize="10" fill={kind === 3 ? c.muted : c.bg}>
                  {`POST ${String(i + 1).padStart(2, '0')}`}
                </text>
              </g>
            );
          })}
        </>
      ),
    };
  },

  phone: (outer, p) => {
    const c = screenPalette(outer);
    const screen = p.screen || 'home';
    const X = 90;
    const Y = 40;
    const W = 300;
    const H = 560;
    const body = {
      home: (
        <>
          <rect x={X + 20} y={Y + 60} width={W - 40} height="40" rx="20" fill={c.surface} />
          <circle cx={X + 42} cy={Y + 80} r="7" fill="none" stroke={c.fg} strokeWidth="2" />
          <text x={X + 60} y={Y + 85} className="art-sans" fontSize="13" fill={c.muted}>
            Search products
          </text>
          {range(4).map((i) => (
            <rect key={i} x={X + 20 + i * 68} y={Y + 118} width="58" height="26" rx="13" fill={i === 0 ? c.fg : 'none'} stroke={c.line} />
          ))}
          <rect x={X + 20} y={Y + 164} width={W - 40} height="130" rx="10" fill={c.accent} />
          <text x={X + 36} y={Y + 210} className="art-display" fontSize="30" fill={c.bg === c.accent ? c.fg : '#F4F0E8'}>
            NEW
          </text>
          <text x={X + 36} y={Y + 240} className="art-display" fontSize="30" fill={c.bg === c.accent ? c.fg : '#F4F0E8'}>
            SEASON
          </text>
          {range(4).map((i) => (
            <g key={i}>
              <ImgBox x={X + 20 + (i % 2) * 134} y={Y + 314 + Math.floor(i / 2) * 118} w="126" h="80" c={c} />
              <Lines x={X + 20 + (i % 2) * 134} y={Y + 402 + Math.floor(i / 2) * 118} w={126} n={1} h={6} color={c.fg} widths={[0.7]} />
            </g>
          ))}
        </>
      ),
      product: (
        <>
          <ImgBox x={X + 20} y={Y + 56} w={W - 40} h="220" c={c} r={12} />
          <circle cx={X + W - 50} cy={Y + 250} r="16" fill={c.accent2} />
          <text x={X + 20} y={Y + 318} className="art-display" fontSize="22" fill={c.fg}>
            Linen overshirt
          </text>
          <text x={X + 20} y={Y + 344} className="art-mono" fontSize="14" fill={c.fg}>
            NPR 4,200
          </text>
          <text x={X + W - 20} y={Y + 344} textAnchor="end" className="art-mono" fontSize="11" fill={c.accent}>
            IN STOCK · 2 DAYS
          </text>
          {['S', 'M', 'L', 'XL'].map((s, i) => (
            <g key={s}>
              <rect x={X + 20 + i * 48} y={Y + 366} width="40" height="34" rx="6" fill={i === 1 ? c.fg : 'none'} stroke={c.line} />
              <text x={X + 40 + i * 48} y={Y + 388} textAnchor="middle" className="art-mono" fontSize="12" fill={i === 1 ? c.bg : c.fg}>
                {s}
              </text>
            </g>
          ))}
          <Lines x={X + 20} y={Y + 420} w={W - 40} n={3} gap={12} h={5} color={c.muted} widths={[1, 0.9, 0.5]} />
          <rect x={X + 20} y={Y + 484} width={W - 40} height="48" rx="24" fill={c.accent} />
          <text x={X + W / 2} y={Y + 514} textAnchor="middle" className="art-sans" fontSize="14" fill="#F4F0E8" fontWeight="600">
            Add to cart
          </text>
        </>
      ),
      cart: (
        <>
          <text x={X + 20} y={Y + 80} className="art-display" fontSize="26" fill={c.fg}>
            Cart (3)
          </text>
          {range(3).map((i) => (
            <g key={i} transform={`translate(${X + 20} ${Y + 110 + i * 92})`}>
              <ImgBox x={0} y={0} w="70" h="70" c={c} r={8} />
              <Lines x={84} y={10} w={120} n={2} gap={16} h={7} color={c.fg} widths={[1, 0.6]} />
              <text x={W - 40} y={20} textAnchor="end" className="art-mono" fontSize="12" fill={c.fg}>
                {(1200 + i * 800).toLocaleString()}
              </text>
              <rect x={84} y={46} width="70" height="22" rx="11" fill="none" stroke={c.line} />
            </g>
          ))}
          <line x1={X + 20} y1={Y + 400} x2={X + W - 20} y2={Y + 400} stroke={c.line} />
          {['Subtotal', 'Delivery', 'Total'].map((t, i) => (
            <g key={t}>
              <text x={X + 20} y={Y + 426 + i * 22} className="art-sans" fontSize="12" fill={i === 2 ? c.fg : c.muted}>
                {t}
              </text>
              <text x={X + W - 20} y={Y + 426 + i * 22} textAnchor="end" className="art-mono" fontSize="12" fill={c.fg}>
                {['4,800', '150', '4,950'][i]}
              </text>
            </g>
          ))}
          <rect x={X + 20} y={Y + 484} width={W - 40} height="48" rx="24" fill={c.fg} />
          <text x={X + W / 2} y={Y + 514} textAnchor="middle" className="art-sans" fontSize="14" fill={c.bg} fontWeight="600">
            Checkout
          </text>
        </>
      ),
      checkout: (
        <>
          {range(3).map((i) => (
            <rect key={i} x={X + 20 + i * 88} y={Y + 64} width="80" height="4" rx="2" fill={i < 2 ? c.fg : c.line} />
          ))}
          <text x={X + 20} y={Y + 110} className="art-display" fontSize="24" fill={c.fg}>
            Where to?
          </text>
          {['Full name', 'Street address', 'City', 'Phone'].map((l, i) => (
            <g key={l} transform={`translate(${X + 20} ${Y + 140 + i * 70})`}>
              <text y="0" className="art-mono" fontSize="10" fill={c.muted}>
                {l.toUpperCase()}
              </text>
              <rect x="0" y="10" width={W - 40} height="40" rx="8" fill="none" stroke={i === 0 ? c.fg : c.line} strokeWidth={i === 0 ? 1.5 : 1} />
              {i === 0 && <rect x="14" y="24" width="90" height="10" rx="5" fill={c.fg} />}
            </g>
          ))}
          <rect x={X + 20} y={Y + 484} width={W - 40} height="48" rx="24" fill={c.accent} />
          <text x={X + W / 2} y={Y + 514} textAnchor="middle" className="art-sans" fontSize="14" fill="#F4F0E8" fontWeight="600">
            Continue to payment
          </text>
        </>
      ),
      tasks: (
        <>
          <text x={X + 20} y={Y + 80} className="art-display" fontSize="26" fill={c.fg}>
            Today
          </text>
          <text x={X + W - 20} y={Y + 80} textAnchor="end" className="art-mono" fontSize="11" fill={c.muted}>
            5 ITEMS
          </text>
          {range(5).map((i) => (
            <g key={i} transform={`translate(${X + 20} ${Y + 110 + i * 68})`}>
              <rect x="0" y="0" width={W - 40} height="54" rx="10" fill={c.surface} />
              <rect x="14" y="17" width="20" height="20" rx="6" fill={i < 2 ? c.accent : 'none'} stroke={i < 2 ? c.accent : c.fg} />
              <Lines x={48} y={16} w={150} n={2} gap={14} h={6} color={c.fg} widths={[1, 0.5]} />
              <circle cx={W - 60} cy="27" r="5" fill={i === 2 ? c.accent2 : c.muted} />
            </g>
          ))}
        </>
      ),
    };
    return {
      vb: '0 0 480 640',
      el: (
        <>
          <rect width="480" height="640" fill={outer.bg} />
          <rect x={X - 10} y={Y - 10} width={W + 20} height={H + 20} rx="42" fill={outer.fg} opacity="0.1" />
          <rect x={X} y={Y} width={W} height={H} rx="36" fill={c.bg === '#171717' ? '#1F1F1F' : '#FFFFFF'} stroke={outer.fg} strokeWidth="2" />
          <rect x={X + 100} y={Y + 14} width="100" height="22" rx="11" fill={c.fg} />
          {/* content colours should read on the screen regardless of scheme */}
          <g>{body[screen] || body.home}</g>
          <rect x={X + 100} y={Y + H - 14} width="100" height="4" rx="2" fill={c.fg} />
        </>
      ),
    };
  },

  flow: (c, p) => {
    const nodes = p.nodes || ['Start', 'Step', 'Step', 'End'];
    const perRow = 4;
    return {
      vb: '0 0 800 450',
      el: (
        <>
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" fill={c.fg} />
            </marker>
          </defs>
          <rect width="800" height="450" fill={c.bg} />
          {nodes.map((n, i) => {
            const row = Math.floor(i / perRow);
            const col = row % 2 === 0 ? i % perRow : perRow - 1 - (i % perRow);
            const x = 70 + col * 180;
            const y = 90 + row * 150;
            const next = nodes[i + 1];
            const nrow = Math.floor((i + 1) / perRow);
            const ncol = nrow % 2 === 0 ? (i + 1) % perRow : perRow - 1 - ((i + 1) % perRow);
            const nx = 70 + ncol * 180;
            const ny = 90 + nrow * 150;
            const isEnd = i === nodes.length - 1 || i === 0;
            return (
              <g key={i}>
                {next && (
                  <path
                    d={nrow === row ? `M${x + (col < ncol ? 130 : 0)},${y + 30} L${nx + (col < ncol ? 0 : 130)},${ny + 30}` : `M${x + 65},${y + 60} L${nx + 65},${ny}`}
                    stroke={c.fg}
                    strokeWidth="1.5"
                    fill="none"
                    markerEnd="url(#arr)"
                  />
                )}
                <rect x={x} y={y} width="130" height="60" rx={isEnd ? 30 : 8} fill={isEnd ? c.accent : c.bg} stroke={c.fg} strokeWidth="1.5" />
                <text x={x + 65} y={y + 35} textAnchor="middle" className="art-sans" fontSize="14" fontWeight="500" fill={isEnd ? '#F4F0E8' : c.fg}>
                  {n}
                </text>
                <text x={x} y={y - 10} className="art-mono" fontSize="10" fill={c.muted}>
                  {String(i + 1).padStart(2, '0')}
                </text>
              </g>
            );
          })}
          <text x="40" y="420" className="art-mono" fontSize="11" fill={c.muted}>
            PRIMARY FLOW — ILLUSTRATIVE
          </text>
        </>
      ),
    };
  },

  wireframe: (c, p) => {
    const g = { bg: '#F4F0E8', fg: '#171717', surface: '#DDD8CC', line: 'rgba(23,23,23,0.25)', muted: '#888780' };
    if (p.device === 'desktop') {
      const screen = p.screen || 'dashboard';
      return {
        vb: '0 0 800 500',
        el: (
          <>
            <rect width="800" height="500" fill={g.bg} />
            <rect x="40" y="30" width="720" height="440" fill="#fff" stroke={g.fg} />
            <rect x="40" y="30" width="720" height="34" fill={g.surface} />
            <rect x="40" y="64" width="160" height="406" fill={g.surface} opacity="0.6" />
            <Lines x={56} y={90} w={128} n={6} gap={30} h={8} color={g.fg} widths={[0.9, 0.6, 0.7, 0.5, 0.8, 0.4]} />
            {screen === 'dashboard' ? (
              <>
                {range(3).map((i) => (
                  <rect key={i} x={230 + i * 175} y={90} width="155" height="80" fill="none" stroke={g.fg} />
                ))}
                <ImgBox x={230} y={200} w="330" h="240" c={g} />
                <rect x="580" y="200" width="155" height="240" fill="none" stroke={g.fg} />
                <Lines x={596} y={220} w={120} n={6} gap={28} h={8} color={g.fg} widths={[1, 0.7, 0.8, 0.5, 0.9, 0.6]} />
              </>
            ) : (
              <>
                <rect x="230" y="90" width="500" height="36" fill={g.surface} />
                {range(8).map((i) => (
                  <g key={i}>
                    <line x1="230" y1={166 + i * 36} x2="735" y2={166 + i * 36} stroke={g.line} />
                    <rect x="230" y={142 + i * 36} width="14" height="14" fill="none" stroke={g.fg} />
                    <rect x="260" y={144 + i * 36} width={180 - (i % 3) * 40} height="9" rx="4" fill={g.fg} />
                    <rect x="600" y={144 + i * 36} width="60" height="9" rx="4" fill={g.muted} />
                  </g>
                ))}
              </>
            )}
            <text x="40" y="490" className="art-mono" fontSize="11" fill={g.muted}>
              LO-FI WIREFRAME — {screen.toUpperCase()}
            </text>
          </>
        ),
      };
    }
    const screen = p.screen || 'home';
    return {
      vb: '0 0 480 640',
      el: (
        <>
          <rect width="480" height="640" fill={g.bg} />
          <rect x="90" y="40" width="300" height="560" rx="24" fill="#fff" stroke={g.fg} />
          <rect x="110" y="70" width="260" height="36" fill={g.surface} />
          {screen === 'home' && (
            <>
              {range(4).map((i) => (
                <rect key={i} x={110 + i * 66} y="120" width="56" height="24" fill="none" stroke={g.fg} />
              ))}
              <ImgBox x={110} y={160} w="260" h="120" c={g} />
              {range(4).map((i) => (
                <ImgBox key={i} x={110 + (i % 2) * 134} y={300 + Math.floor(i / 2) * 120} w="126" h="100" c={g} />
              ))}
            </>
          )}
          {screen === 'product' && (
            <>
              <ImgBox x={110} y={120} w="260" h="200" c={g} />
              <Lines x={110} y={340} w={260} n={2} gap={20} h={10} color={g.fg} widths={[0.8, 0.4]} />
              {range(4).map((i) => (
                <rect key={i} x={110 + i * 46} y="390" width="38" height="30" fill="none" stroke={g.fg} />
              ))}
              <Lines x={110} y={440} w={260} n={3} gap={14} h={6} color={g.muted} />
              <rect x="110" y="520" width="260" height="44" fill={g.fg} />
            </>
          )}
          {screen === 'checkout' && (
            <>
              {range(3).map((i) => (
                <rect key={i} x={110 + i * 90} y="124" width="80" height="6" fill={i < 2 ? g.fg : g.surface} />
              ))}
              {range(4).map((i) => (
                <g key={i}>
                  <rect x="110" y={160 + i * 76} width="100" height="8" fill={g.muted} />
                  <rect x="110" y={176 + i * 76} width="260" height="40" fill="none" stroke={g.fg} />
                </g>
              ))}
              <rect x="110" y="520" width="260" height="44" fill={g.fg} />
            </>
          )}
          <text x="90" y="625" className="art-mono" fontSize="11" fill={g.muted}>
            LO-FI WIREFRAME — {screen.toUpperCase()}
          </text>
        </>
      ),
    };
  },

  system: (c) => ({
    vb: '0 0 800 450',
    el: (
      <>
        <rect width="800" height="450" fill={c.bg} />
        <text x="40" y="50" className="art-mono" fontSize="11" fill={c.muted}>
          BUTTONS
        </text>
        <rect x="40" y="66" width="150" height="46" rx="23" fill={c.accent} />
        <text x="115" y="95" textAnchor="middle" className="art-sans" fontSize="14" fontWeight="600" fill="#F4F0E8">
          Primary
        </text>
        <rect x="204" y="66" width="150" height="46" rx="23" fill="none" stroke={c.fg} />
        <text x="279" y="95" textAnchor="middle" className="art-sans" fontSize="14" fontWeight="600" fill={c.fg}>
          Secondary
        </text>
        <rect x="368" y="66" width="150" height="46" rx="23" fill={c.surface} />
        <text x="443" y="95" textAnchor="middle" className="art-sans" fontSize="14" fontWeight="600" fill={c.muted}>
          Disabled
        </text>

        <text x="40" y="150" className="art-mono" fontSize="11" fill={c.muted}>
          INPUTS
        </text>
        <rect x="40" y="166" width="300" height="46" rx="10" fill="none" stroke={c.fg} strokeWidth="1.5" />
        <text x="56" y="195" className="art-sans" fontSize="14" fill={c.fg}>
          hello@example.com
        </text>
        <rect x="356" y="166" width="162" height="46" rx="10" fill="none" stroke={c.accent2} strokeWidth="1.5" />
        <text x="372" y="195" className="art-sans" fontSize="14" fill={c.accent2}>
          Required
        </text>

        <text x="40" y="250" className="art-mono" fontSize="11" fill={c.muted}>
          CHIPS & TOGGLES
        </text>
        {['All', 'Men', 'Women', 'Kids'].map((t, i) => (
          <g key={t}>
            <rect x={40 + i * 86} y="266" width="76" height="32" rx="16" fill={i === 0 ? c.fg : 'none'} stroke={c.line} />
            <text x={78 + i * 86} y="287" textAnchor="middle" className="art-sans" fontSize="13" fill={i === 0 ? c.bg : c.fg}>
              {t}
            </text>
          </g>
        ))}
        <rect x="400" y="268" width="52" height="28" rx="14" fill={c.accent} />
        <circle cx="438" cy="282" r="10" fill="#F4F0E8" />
        <rect x="464" y="268" width="52" height="28" rx="14" fill={c.surface} />
        <circle cx="478" cy="282" r="10" fill={c.bg} />

        <text x="560" y="50" className="art-mono" fontSize="11" fill={c.muted}>
          CARD
        </text>
        <rect x="560" y="66" width="200" height="232" rx="12" fill={c.surface} />
        <ImgBox x={572} y={78} w="176" h="110" c={{ ...c, surface: c.bg }} r={8} />
        <Lines x={572} y={204} w={176} n={2} gap={18} h={8} color={c.fg} widths={[0.9, 0.5]} />
        <text x="572" y="276" className="art-mono" fontSize="12" fill={c.fg}>
          NPR 2,400
        </text>
        <circle cx="736" cy="272" r="12" fill={c.accent} />

        <text x="40" y="350" className="art-mono" fontSize="11" fill={c.muted}>
          TYPE SCALE
        </text>
        <text x="40" y="400" className="art-display" fontSize="40" fill={c.fg}>
          H1
        </text>
        <text x="110" y="400" className="art-display" fontSize="28" fill={c.fg}>
          H2
        </text>
        <text x="166" y="400" className="art-sans" fontSize="18" fill={c.fg}>
          Body
        </text>
        <text x="220" y="400" className="art-mono" fontSize="12" fill={c.muted}>
          LABEL
        </text>
        <text x="560" y="350" className="art-mono" fontSize="11" fill={c.muted}>
          SPACING 4 · 8 · 16 · 24 · 40
        </text>
        {[4, 8, 16, 24, 40].map((s, i) => (
          <rect key={s} x={560 + i * 40} y={400 - s} width="24" height={s} fill={c.accent2} />
        ))}
      </>
    ),
  }),

  desktop: (outer) => {
    const c = screenPalette(outer);
    return {
    vb: '0 0 800 500',
    el: (
      <>
        <rect width="800" height="500" fill={outer.bg} />
        <rect x="30" y="24" width="740" height="452" rx="12" fill={c.bg === '#F4F0E8' ? '#FFFFFF' : c.surface} stroke={outer.fg} strokeWidth="1.5" />
        <circle cx="52" cy="44" r="5" fill={c.accent2} />
        <circle cx="68" cy="44" r="5" fill={c.muted} />
        <circle cx="84" cy="44" r="5" fill={c.muted} />
        <rect x="30" y="64" width="170" height="412" fill={c.surface} opacity={c.bg === '#171717' ? 0.4 : 1} />
        {['Today', 'Projects', 'People', 'Search'].map((t, i) => (
          <g key={t}>
            <rect x="44" y={86 + i * 40} width="142" height="30" rx="6" fill={i === 0 ? c.fg : 'none'} />
            <text x="58" y={106 + i * 40} className="art-sans" fontSize="13" fontWeight="500" fill={i === 0 ? c.bg : c.fg}>
              {t}
            </text>
          </g>
        ))}
        <text x="230" y="104" className="art-display" fontSize="30" fill={c.fg}>
          Today
        </text>
        <text x="750" y="100" textAnchor="end" className="art-mono" fontSize="11" fill={c.muted}>
          THU · 3 DUE
        </text>
        {[
          ['12', 'Open'],
          ['3', 'Due today'],
          ['1', 'Overdue'],
        ].map(([n, l], i) => (
          <g key={l}>
            <rect x={230 + i * 176} y="126" width="160" height="80" rx="10" fill="none" stroke={c.line} />
            <text x={246 + i * 176} y="172" className="art-display" fontSize="34" fill={i === 2 ? c.accent2 : c.fg}>
              {n}
            </text>
            <text x={246 + i * 176} y="192" className="art-mono" fontSize="10" fill={c.muted}>
              {l.toUpperCase()}
            </text>
          </g>
        ))}
        {range(6).map((i) => (
          <g key={i}>
            <line x1="230" y1={262 + i * 36} x2="750" y2={262 + i * 36} stroke={c.line} />
            <rect x="230" y={236 + i * 36} width="16" height="16" rx="4" fill={i < 2 ? c.accent : 'none'} stroke={i < 2 ? c.accent : c.fg} />
            <rect x="260" y={240 + i * 36} width={200 - (i % 3) * 50} height="9" rx="4" fill={c.fg} />
            <rect x="560" y={238 + i * 36} width="60" height="14" rx="7" fill={i === 3 ? c.accent2 : c.surface} />
            <text x="750" y={250 + i * 36} textAnchor="end" className="art-mono" fontSize="10" fill={c.muted}>
              {['09:00', '11:30', '14:00', '15:15', '17:00', '18:30'][i]}
            </text>
          </g>
        ))}
      </>
    ),
  };
  },

  ia: (c, p) => {
    const nodes = p.nodes || ['A', 'B', 'C'];
    const root = p.root || 'ROOT';
    const n = nodes.length;
    const spread = 640;
    return {
      vb: '0 0 800 450',
      el: (
        <>
          <rect width="800" height="450" fill={c.bg} />
          <rect x="330" y="60" width="140" height="56" rx="28" fill={c.fg} />
          <text x="400" y="95" textAnchor="middle" className="art-mono" fontSize="13" fill={c.bg}>
            {root}
          </text>
          <line x1="400" y1="116" x2="400" y2="180" stroke={c.fg} strokeWidth="1.5" />
          <line x1={80 + spread / n / 2} y1="180" x2={80 + spread - spread / n / 2} y2="180" stroke={c.fg} strokeWidth="1.5" />
          {nodes.map((node, i) => {
            const x = 80 + (spread / n) * i + spread / n / 2;
            return (
              <g key={node}>
                <line x1={x} y1="180" x2={x} y2="220" stroke={c.fg} strokeWidth="1.5" />
                <rect x={x - 60} y="220" width="120" height="50" rx="8" fill={i === 0 ? c.accent : c.bg} stroke={c.fg} strokeWidth="1.5" />
                <text x={x} y="251" textAnchor="middle" className="art-sans" fontSize="13" fontWeight="500" fill={i === 0 ? '#F4F0E8' : c.fg}>
                  {node}
                </text>
                {range(3).map((k) => (
                  <g key={k}>
                    <line x1={x} y1={270} x2={x} y2={300 + k * 32} stroke={c.line} />
                    <rect x={x - 40} y={300 + k * 32} width="80" height="20" rx="4" fill="none" stroke={c.line} />
                  </g>
                ))}
              </g>
            );
          })}
          <text x="40" y="420" className="art-mono" fontSize="11" fill={c.muted}>
            INFORMATION ARCHITECTURE — THREE LEVELS
          </text>
        </>
      ),
    };
  },

  poster: (c, p, uid) => {
    const lines = (p.text || 'MAKE\nIT\nFEEL.').split('\n');
    return {
      vb: '0 0 600 800',
      el: (
        <>
          <defs>
            <Halftone id={`ht-${uid}`} color={c.fg} />
          </defs>
          <rect width="600" height="800" fill={c.bg} />
          <circle cx="470" cy="190" r="150" fill={`url(#ht-${uid})`} />
          <circle cx="430" cy="230" r="80" fill={c.accent2} />
          {lines.map((l, i) => (
            <text key={i} x={i % 2 === 0 ? 40 : 110} y={360 + i * 125} className="art-display" fontSize="130" fill={c.fg}>
              {l}
            </text>
          ))}
          <text x="40" y="120" className="art-serif" fontSize="40" fill={c.fg}>
            a visual study, no. {String((lines.join('').length % 9) + 1).padStart(2, '0')}
          </text>
          <line x1="40" y1="740" x2="560" y2="740" stroke={c.fg} strokeWidth="1.5" />
          <text x="40" y="770" className="art-mono" fontSize="12" fill={c.fg}>
            KATHMANDU — 27.7172° N
          </text>
          <text x="560" y="770" textAnchor="end" className="art-mono" fontSize="12" fill={c.fg}>
            SP / 2026
          </text>
        </>
      ),
    };
  },

  typegrid: (c) => {
    const cols = 8;
    const rows = 6;
    const weights = [400, 500, 600, 700];
    return {
      vb: '0 0 800 600',
      el: (
        <>
          <rect width="800" height="600" fill={c.bg} />
          {range(rows).map((r) =>
            range(cols).map((col) => {
              const i = r * cols + col;
              const serif = (r + col) % 5 === 0;
              const size = 48 + ((r * 7 + col * 11) % 36);
              return (
                <text
                  key={i}
                  x={col * 100 + 50}
                  y={r * 100 + 80}
                  textAnchor="middle"
                  className={serif ? 'art-serif' : 'art-display'}
                  fontSize={size}
                  fontWeight={weights[(r + col) % weights.length]}
                  fill={i % 11 === 0 ? c.accent : i % 7 === 0 ? c.accent2 : c.fg}
                  opacity={0.6 + ((r * col) % 4) * 0.13}
                >
                  {serif ? 'a' : 'A'}
                </text>
              );
            })
          )}
          <text x="24" y="584" className="art-mono" fontSize="11" fill={c.muted}>
            WEIGHT × SIZE × STYLE — 48 CELLS
          </text>
        </>
      ),
    };
  },

  shapes: (c) => ({
    vb: '0 0 600 600',
    el: (
      <>
        <rect width="600" height="600" fill={c.bg} />
        <g className="art-spin" style={{ transformOrigin: '300px 300px' }}>
          {range(8).map((i) => (
            <rect key={i} x="150" y="150" width="300" height="300" fill="none" stroke={c.fg} strokeWidth="1.5" transform={`rotate(${i * 11.25} 300 300)`} opacity={0.9 - i * 0.08} />
          ))}
        </g>
        <g className="art-spin-rev" style={{ transformOrigin: '300px 300px' }}>
          <circle cx="300" cy="120" r="34" fill={c.accent2} />
          <rect x="430" y="280" width="60" height="60" fill={c.accent} transform="rotate(20 460 310)" />
        </g>
        <circle cx="300" cy="300" r="70" fill={c.fg} />
        <circle cx="300" cy="300" r="26" fill={c.bg} />
        <text x="24" y="580" className="art-mono" fontSize="11" fill={c.muted}>
          ROTATION SYSTEM · 11.25° STEP
        </text>
      </>
    ),
  }),

  responsive: (outer) => {
    const c = screenPalette(outer);
    const frame = (x, y, w, h, r) => (
      <>
        <rect x={x} y={y} width={w} height={h} rx={r} fill={c.bg === '#F4F0E8' ? '#FFFFFF' : c.surface} stroke={outer.fg} strokeWidth="1.5" />
        <rect x={x + 12} y={y + 16} width={w - 24} height={h * 0.3} rx="6" fill={c.accent} />
        <text x={x + 20} y={y + 16 + h * 0.3 - 10} className="art-display" fontSize={w / 9} fill="#F4F0E8">
          NEW
        </text>
        {range(w > 300 ? 3 : w > 150 ? 2 : 1).map((i) => (
          <ImgBox key={i} x={x + 12 + i * ((w - 24) / (w > 300 ? 3 : w > 150 ? 2 : 1))} y={y + 16 + h * 0.3 + 12} w={(w - 24) / (w > 300 ? 3 : w > 150 ? 2 : 1) - 8} h={h * 0.28} c={c} />
        ))}
        <Lines x={x + 12} y={y + 16 + h * 0.3 + 12 + h * 0.28 + 12} w={w - 24} n={2} gap={12} h={6} color={c.fg} widths={[0.8, 0.4]} />
      </>
    );
    return {
      vb: '0 0 800 450',
      el: (
        <>
          <rect width="800" height="450" fill={outer.bg} />
          {frame(40, 90, 120, 260, 18)}
          {frame(200, 70, 220, 300, 14)}
          {frame(460, 50, 310, 340, 10)}
          <text x="40" y="380" className="art-mono" fontSize="11" fill={outer.muted}>
            375
          </text>
          <text x="200" y="400" className="art-mono" fontSize="11" fill={outer.muted}>
            768
          </text>
          <text x="460" y="420" className="art-mono" fontSize="11" fill={outer.muted}>
            1440
          </text>
        </>
      ),
    };
  },
};

export default function Artwork({ variant = 'monogram', props = {}, className = '', title }) {
  const c = SCHEMES[props.scheme] || SCHEMES.ivory;
  const make = variants[variant] || variants.monogram;
  // stable unique id per instance for <pattern> defs
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const { vb, el } = make(c, props, uid);
  return (
    <svg
      className={`artwork ${className}`}
      viewBox={vb}
      preserveAspectRatio="xMidYMid slice"
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {el}
    </svg>
  );
}

export const artworkVariants = Object.keys(variants);
