/*
 * Quiet background motifs for the homepage.
 *
 * Line drawings of things the product actually does, in the brand cyan:
 *   vault        credentials held in the vault (dial, wheel, keyhole)
 *   shield       policy around a privileged session (shield, lock)
 *   chain        the audit chain (hash-linked records, last one verified)
 *   network      one control point governing identities and targets
 *   key          a credential with its rotation cycle
 *   fingerprint  a verified identity
 * They sit in the empty margins of a few sections only, never behind text,
 * and they do not move.
 *
 * Purely decorative: aria-hidden, no pointer events, hidden below xl where
 * there is no spare margin to put them in. Colours come from CSS
 * (`.bgm`, `.bgm-acc` in app/globals.css) so light and dark are handled there.
 */

type MotifKind = "vault" | "shield" | "chain" | "chainv" | "network" | "key" | "fingerprint" | "radar" | "terminal";

function Drawing({ kind }: { kind: MotifKind }) {
  return (
    <>
      {kind === "vault" && <Vault />}
      {kind === "shield" && <Shield />}
      {kind === "chain" && <Chain />}
      {kind === "chainv" && <ChainVertical />}
      {kind === "network" && <Network />}
      {kind === "key" && <Key />}
      {kind === "fingerprint" && <Fingerprint />}
      {kind === "radar" && <Radar />}
      {kind === "terminal" && <Terminal />}
    </>
  );
}

/*
 * A drawing that lives in the empty gutter beside the content, partly off
 * the edge of the screen, like the vault dial beside "Every identity".
 *
 * `size` is the drawing's width in px. The visible part grows with the
 * gutter: on a 1440px screen only the outer ~90px shows (so it never
 * reaches the text), on wider screens more of it comes into view, up to
 * the whole drawing. Hidden below 1360px, where there is no real gutter.
 */
export function EdgeMotif({
  kind,
  side,
  size,
  aspect = 1,
  top,
}: {
  kind: MotifKind;
  side: "left" | "right";
  size: number;
  /** height / width of the drawing */
  aspect?: number;
  /** CSS top, e.g. "120px" or "35%" */
  top: string;
}) {
  const offset = `min(0px, calc(max(56px, (100vw - 1280px) / 2 + 8px) - ${size}px))`;
  return (
    <div
      className="bgm pointer-events-none select-none absolute hidden min-[1360px]:block"
      style={{ width: size, height: Math.round(size * aspect), top, [side]: offset }}
      aria-hidden="true"
    >
      <Drawing kind={kind} />
    </div>
  );
}

export default function BgMotif({ kind, className }: { kind: MotifKind; className?: string }) {
  return (
    <div className={`bgm pointer-events-none select-none absolute hidden xl:block ${className ?? ""}`} aria-hidden="true">
      <Drawing kind={kind} />
    </div>
  );
}

/* Vault dial: rim, graduated ticks, locking wheel and keyhole. */
function Vault() {
  const c = 200;
  const ticks = Array.from({ length: 72 }, (_, i) => {
    const a = (i * 5 * Math.PI) / 180;
    const major = i % 6 === 0;
    const r1 = major ? 142 : 150;
    const r2 = 160;
    return (
      <line
        key={i}
        x1={c + r1 * Math.sin(a)}
        y1={c - r1 * Math.cos(a)}
        x2={c + r2 * Math.sin(a)}
        y2={c - r2 * Math.cos(a)}
        strokeWidth={major ? 1.6 : 1}
      />
    );
  });

  const spokes = [90, 210, 330].map((deg) => {
    const a = (deg * Math.PI) / 180;
    return (
      <g key={deg}>
        <line x1={c + 40 * Math.cos(a)} y1={c + 40 * Math.sin(a)} x2={c + 96 * Math.cos(a)} y2={c + 96 * Math.sin(a)} />
        <circle cx={c + 108 * Math.cos(a)} cy={c + 108 * Math.sin(a)} r={12} />
      </g>
    );
  });

  // Accent: a short arc on the rim, like the dial's set position.
  const arc = (r: number, from: number, to: number) => {
    const p = (d: number) => {
      const a = ((d - 90) * Math.PI) / 180;
      return `${c + r * Math.cos(a)} ${c + r * Math.sin(a)}`;
    };
    return `M ${p(from)} A ${r} ${r} 0 0 1 ${p(to)}`;
  };

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx={c} cy={c} r={192} />
      <circle cx={c} cy={c} r={174} />
      {ticks}
      <circle cx={c} cy={c} r={128} strokeDasharray="3 9" />
      {spokes}
      <circle cx={c} cy={c} r={40} />
      <circle cx={c} cy={c - 6} r={8} />
      <path d={`M ${c - 4} ${c} L ${c - 7} ${c + 18} H ${c + 7} L ${c + 4} ${c}`} />
      <path className="bgm-acc" d={arc(174, 20, 58)} strokeWidth={2.5} strokeLinecap="round" />
      <circle className="bgm-acc-fill" cx={c} cy={c - 192} r={4} stroke="none" />
    </svg>
  );
}

/* Shield around a lock, with policy lines running out to connected nodes. */
function Shield() {
  const shield = "M160 24 L286 72 V176 C286 262 230 322 160 352 C90 322 34 262 34 176 V72 Z";
  return (
    <svg viewBox="0 0 320 380" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d={shield} />
      <path d={shield} transform="translate(160 188) scale(0.82) translate(-160 -188)" strokeDasharray="3 8" />
      {/* policy lines leaving the shield */}
      <path d="M34 132 H6" />
      <circle cx={6} cy={132} r={4} />
      <path d="M286 132 H314" />
      <circle cx={314} cy={132} r={4} />
      <path d="M60 268 L20 300" />
      <circle cx={20} cy={300} r={4} />
      <path d="M260 268 L300 300" />
      <circle cx={300} cy={300} r={4} />
      {/* lock */}
      <g className="bgm-acc">
        <rect x={128} y={176} width={64} height={52} rx={10} strokeWidth={1.75} />
        <path d="M141 176 V160 a19 19 0 0 1 38 0 V176" strokeWidth={1.75} />
        <circle cx={160} cy={198} r={5} strokeWidth={1.5} />
        <path d="M160 203 V212" strokeWidth={1.5} strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* Audit chain: hash-linked records in a row, the last one verified. */
function Chain() {
  const xs = [8, 166, 324];
  return (
    <svg viewBox="0 0 480 110" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth={1.5}>
      {xs.map((x, i) => (
        <g key={x}>
          <rect x={x} y={12} width={140} height={86} rx={14} />
          {/* hash label and record lines */}
          <rect x={x + 16} y={28} width={42} height={13} rx={6.5} />
          <path d={`M${x + 16} ${58} H${x + 118}`} />
          <path d={`M${x + 16} ${76} H${x + 86}`} />
          {i === xs.length - 1 ? (
            <g className="bgm-acc">
              <circle cx={x + 114} cy={35} r={10} strokeWidth={1.75} />
              <path d={`M${x + 109.5} 35 l3.5 3.5 l6.5 -7`} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
            </g>
          ) : (
            <circle cx={x + 118} cy={35} r={4} />
          )}
          {/* link to the next record */}
          {i < xs.length - 1 && (
            <g>
              <path d={`M${x + 140} 55 H${x + 147}`} />
              <rect x={x + 147} y={48} width={11} height={14} rx={5.5} />
              <path d={`M${x + 158} 55 H${x + 158}`} />
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}

/* One control point: a hub with identities on the left and targets on the right. */
function Network() {
  const left = [
    { x: 40, y: 34 },
    { x: 22, y: 100 },
    { x: 40, y: 166 },
  ];
  const right = [
    { x: 380, y: 30 },
    { x: 400, y: 100 },
    { x: 380, y: 170 },
  ];
  const hub = { x: 220, y: 100 };
  return (
    <svg viewBox="0 0 440 200" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth={1.5}>
      {left.map((n, i) => (
        <path key={`l${i}`} d={`M${n.x + 16} ${n.y} C ${n.x + 90} ${n.y}, ${hub.x - 90} ${hub.y}, ${hub.x - 34} ${hub.y}`} strokeDasharray="4 6" />
      ))}
      {right.map((n, i) => (
        <path
          key={`r${i}`}
          className={i === 1 ? "bgm-acc" : undefined}
          d={`M${hub.x + 34} ${hub.y} C ${hub.x + 90} ${hub.y}, ${n.x - 90} ${n.y}, ${n.x - 18} ${n.y}`}
        />
      ))}
      {/* identities: person, machine, agent */}
      <g>
        <circle cx={left[0].x} cy={left[0].y - 4} r={6} />
        <path d={`M${left[0].x - 10} ${left[0].y + 12} a10 9 0 0 1 20 0`} />
        <rect x={left[1].x - 10} y={left[1].y - 10} width={20} height={20} rx={4} />
        <path d={`M${left[1].x - 5} ${left[1].y - 3} H${left[1].x + 5} M${left[1].x - 5} ${left[1].y + 3} H${left[1].x + 5}`} />
        <rect x={left[2].x - 10} y={left[2].y - 8} width={20} height={16} rx={6} />
        <circle cx={left[2].x - 4} cy={left[2].y} r={1.6} />
        <circle cx={left[2].x + 4} cy={left[2].y} r={1.6} />
      </g>
      {/* targets: server, database, cloud */}
      <g>
        <rect x={right[0].x - 12} y={right[0].y - 12} width={24} height={24} rx={4} />
        <path d={`M${right[0].x - 7} ${right[0].y - 3} H${right[0].x + 7} M${right[0].x - 7} ${right[0].y + 4} H${right[0].x + 7}`} />
        <ellipse className="bgm-acc" cx={right[1].x} cy={right[1].y - 8} rx={11} ry={4} />
        <path className="bgm-acc" d={`M${right[1].x - 11} ${right[1].y - 8} V${right[1].y + 8} a11 4 0 0 0 22 0 V${right[1].y - 8}`} />
        <path d={`M${right[2].x - 12} ${right[2].y + 7} a7 7 0 0 1 2 -13 a9 9 0 0 1 17 2 a6 6 0 0 1 5 11 Z`} />
      </g>
      {/* hub */}
      <circle className="bgm-tint" cx={hub.x} cy={hub.y} r={34} />
      <circle cx={hub.x} cy={hub.y} r={46} strokeDasharray="2 7" />
      <g className="bgm-acc">
        <path d={`M${hub.x} ${hub.y - 16} L${hub.x + 13} ${hub.y - 10} V${hub.y + 1} C${hub.x + 13} ${hub.y + 9} ${hub.x + 7} ${hub.y + 14} ${hub.x} ${hub.y + 17} C${hub.x - 7} ${hub.y + 14} ${hub.x - 13} ${hub.y + 9} ${hub.x - 13} ${hub.y + 1} V${hub.y - 10} Z`} strokeWidth={1.75} />
        <path d={`M${hub.x - 5} ${hub.y} l3.5 3.5 l6.5 -7`} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* a refused path: one identity line stops at a block */}
      <circle cx={hub.x - 70} cy={hub.y + 44} r={7} />
      <path d={`M${hub.x - 74.5} ${hub.y + 39.5} l9 9`} />
    </svg>
  );
}

/* A credential key inside its rotation cycle. */
function Key() {
  return (
    <svg viewBox="0 0 220 220" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx={110} cy={110} r={100} strokeDasharray="3 8" />
      <path className="bgm-acc" d="M110 10 A100 100 0 0 1 205 80" strokeWidth={2.5} strokeLinecap="round" />
      <path className="bgm-acc" d="M196 66 L205 80 L190 86" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle className="bgm-tint" cx={80} cy={110} r={30} />
      <circle cx={80} cy={110} r={11} />
      <path d="M110 110 H168 M150 110 V128 M164 110 V122" strokeLinecap="round" />
    </svg>
  );
}

/* A verified identity: fingerprint ridges with a check. */
function Fingerprint() {
  const arcs = [18, 30, 42, 54, 66];
  return (
    <svg viewBox="0 0 220 220" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
      {arcs.map((r, i) => (
        <path key={r} d={`M${110 - r} ${118 + i * 3} A${r} ${r + 6} 0 0 1 ${110 + r} ${118 - i * 2}`} strokeDasharray={i % 2 ? "14 6" : undefined} />
      ))}
      <path d="M110 112 V150" />
      <path d="M92 124 C 92 150, 100 166, 112 178" />
      <path d="M128 120 C 130 146, 124 168, 118 186" />
      <circle className="bgm-tint" cx={168} cy={168} r={22} />
      <g className="bgm-acc">
        <circle cx={168} cy={168} r={22} strokeWidth={1.75} />
        <path d="M158 168 l7 7 l12 -13" strokeWidth={2} strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/* Audit chain, stacked: four hash-linked records, the last one verified. */
function ChainVertical() {
  const ys = [10, 118, 226, 334];
  return (
    <svg viewBox="0 0 200 440" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth={1.5}>
      {ys.map((y, i) => (
        <g key={y}>
          <rect x={20} y={y} width={160} height={84} rx={14} className={i === ys.length - 1 ? "bgm-tint" : undefined} />
          <rect x={20} y={y} width={160} height={84} rx={14} />
          <rect x={36} y={y + 16} width={42} height={13} rx={6.5} />
          <path d={`M36 ${y + 46} H150`} />
          <path d={`M36 ${y + 64} H110`} />
          {i === ys.length - 1 ? (
            <g className="bgm-acc">
              <circle cx={150} cy={y + 23} r={10} strokeWidth={1.75} />
              <path d={`M145.5 ${y + 23} l3.5 3.5 l6.5 -7`} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
            </g>
          ) : (
            <circle cx={154} cy={y + 23} r={4} />
          )}
          {i < ys.length - 1 && (
            <g>
              <path d={`M100 ${y + 84} V${y + 91}`} />
              <rect x={93} y={y + 91} width={14} height={10} rx={5} />
              <path d={`M100 ${y + 101} V${y + 108}`} />
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}

/* Anomaly detection: a radar sweep with one flagged session. */
function Radar() {
  const c = 200;
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth={1.5}>
      {[190, 140, 90, 40].map((r) => (
        <circle key={r} cx={c} cy={c} r={r} strokeDasharray={r === 140 ? "3 9" : undefined} />
      ))}
      <path d={`M${c - 190} ${c} H${c + 190} M${c} ${c - 190} V${c + 190}`} strokeDasharray="2 10" />
      {/* sweep wedge */}
      <path className="bgm-tint" d={`M${c} ${c} L${c + 134} ${c - 134} A190 190 0 0 1 ${c + 190} ${c} Z`} />
      <path className="bgm-acc" d={`M${c} ${c} L${c + 134} ${c - 134}`} strokeWidth={2} strokeLinecap="round" />
      {/* normal sessions */}
      {[[118, 250], [262, 300], [150, 120], [300, 230]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={4} />
      ))}
      {/* flagged session */}
      <g className="bgm-acc">
        <circle cx={300} cy={150} r={6} strokeWidth={2} />
        <circle cx={300} cy={150} r={15} strokeWidth={1.25} />
      </g>
    </svg>
  );
}

/* Session recording: a terminal with a live REC marker. */
function Terminal() {
  return (
    <svg viewBox="0 0 360 260" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
      <rect className="bgm-tint" x={10} y={10} width={340} height={240} rx={18} />
      <rect x={10} y={10} width={340} height={240} rx={18} />
      <path d="M10 52 H350" />
      <circle cx={36} cy={31} r={5} />
      <circle cx={54} cy={31} r={5} />
      <circle cx={72} cy={31} r={5} />
      <g className="bgm-acc">
        <rect x={276} y={22} width={58} height={18} rx={9} strokeWidth={1.4} />
        <circle className="bgm-acc-fill" cx={289} cy={31} r={4} stroke="none" />
        <path d="M300 31 H324" strokeWidth={1.4} />
      </g>
      <path d="M34 84 l10 8 l-10 8" />
      <path d="M56 100 H170" />
      <path d="M34 128 H240" />
      <path d="M34 152 H200" />
      <path className="bgm-acc" d="M34 184 l10 8 l-10 8 M56 200 H140" strokeWidth={1.75} />
      <path d="M150 200 H160" strokeWidth={3} />
    </svg>
  );
}
