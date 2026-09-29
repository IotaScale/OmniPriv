export default function HeroBackground3() {
  const c = { x: 600, y: 300 };
  const SWEEP = 6; // seconds — must match .hero-radar-sweep + .hero-blip

  // Contacts scattered around the scope (bearing in degrees, clockwise from east)
  const contacts = [
    { deg: 40, dist: 210, label: "AI AGENT" },
    { deg: 118, dist: 300, label: "MACHINE IDENTITY" },
    { deg: 205, dist: 250, label: "HUMAN ADMIN" },
    { deg: 298, dist: 330, label: "SERVICE ACCOUNT" },
  ].map((k) => {
    const rad = (k.deg * Math.PI) / 180;
    return {
      ...k,
      x: c.x + Math.cos(rad) * k.dist,
      y: c.y + Math.sin(rad) * k.dist,
      delay: (k.deg / 360) * SWEEP,
    };
  });

  // The anomaly that gets auto-blocked
  const anomaly = (() => {
    const rad = (352 * Math.PI) / 180;
    return {
      x: c.x + Math.cos(rad) * 190,
      y: c.y + Math.sin(rad) * 190,
      delay: (352 / 360) * SWEEP,
    };
  })();

  const rangeRings = [140, 240, 340];
  const bearings = Array.from({ length: 72 }, (_, i) => i * 5);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Radar sweep beam */}
      <div className="hero-radar absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full">
        <div className="hero-radar-sweep absolute inset-0 rounded-full" />
      </div>

      {/* HUD corner brackets */}
      <div className="hero-hud-corner hero-hud-corner-tl" />
      <div className="hero-hud-corner hero-hud-corner-tr" />
      <div className="hero-hud-corner hero-hud-corner-bl" />
      <div className="hero-hud-corner hero-hud-corner-br" />

      {/* HUD readouts */}
      <div className="hero-hud-readout hidden md:block" style={{ top: "13%", left: "4%" }}>
        AI PAM SCOPE &middot; ACTIVE
      </div>
      <div className="hero-hud-readout hidden md:block" style={{ top: "13%", right: "4%" }}>
        MODE &middot; AUTO-BLOCK
      </div>
      <div className="hero-hud-readout hidden md:block" style={{ bottom: "13%", left: "4%" }}>
        FEATURES &middot; 39
      </div>
      <div className="hero-hud-readout hidden md:block" style={{ bottom: "13%", right: "4%" }}>
        ANOMALY &middot; 0.88
      </div>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Crosshair + diagonals */}
        <line x1={c.x} y1="0" x2={c.x} y2="600" stroke="#00B8FF" strokeOpacity="0.07" />
        <line x1="0" y1={c.y} x2="1200" y2={c.y} stroke="#00B8FF" strokeOpacity="0.07" />
        <line x1={c.x - 430} y1={c.y - 430} x2={c.x + 430} y2={c.y + 430} stroke="#00B8FF" strokeOpacity="0.05" />
        <line x1={c.x - 430} y1={c.y + 430} x2={c.x + 430} y2={c.y - 430} stroke="#00B8FF" strokeOpacity="0.05" />

        {/* Range rings + distance labels */}
        {rangeRings.map((r, i) => (
          <g key={`r-${i}`}>
            <circle cx={c.x} cy={c.y} r={r} stroke="#00B8FF" strokeOpacity="0.17" strokeWidth="1" />
            <text
              x={c.x + r * 0.707}
              y={c.y - r * 0.707 + 10}
              fontSize="8"
              letterSpacing="1"
              fill="#00B8FF"
              fillOpacity="0.35"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            >
              {(i + 1) * 10}
            </text>
          </g>
        ))}

        {/* Bearing scale ticks */}
        {bearings.map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const strong = deg % 45 === 0;
          const r1 = 372;
          const r2 = strong ? 352 : 362;
          return (
            <line
              key={`b-${deg}`}
              x1={c.x + Math.cos(rad) * r1}
              y1={c.y + Math.sin(rad) * r1}
              x2={c.x + Math.cos(rad) * r2}
              y2={c.y + Math.sin(rad) * r2}
              stroke="#00B8FF"
              strokeOpacity={strong ? 0.4 : 0.18}
              strokeWidth={strong ? 1.4 : 1}
            />
          );
        })}

        {/* Rotating dashed rings */}
        {[
          { r: 120, dur: 44, rev: false, op: 0.18 },
          { r: 200, dur: 60, rev: true, op: 0.14 },
          { r: 280, dur: 38, rev: false, op: 0.12 },
        ].map((ring, i) => (
          <circle
            key={`dr-${i}`}
            cx={c.x}
            cy={c.y}
            r={ring.r}
            stroke="#00B8FF"
            strokeOpacity={ring.op}
            strokeWidth="1"
            strokeDasharray="1 9"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${c.x} ${c.y}`}
              to={`${ring.rev ? -360 : 360} ${c.x} ${c.y}`}
              dur={`${ring.dur}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Sweep leading edge */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${c.x} ${c.y}`}
            to={`360 ${c.x} ${c.y}`}
            dur={`${SWEEP}s`}
            repeatCount="indefinite"
          />
          <line x1={c.x} y1={c.y} x2={c.x + 372} y2={c.y} stroke="#00B8FF" strokeOpacity="0.5" strokeWidth="1.4" />
          <circle cx={c.x + 372} cy={c.y} r="3.5" fill="#00B8FF" fillOpacity="0.95" />
        </g>

        {/* Core — the OmniPriv engine */}
        <circle cx={c.x} cy={c.y} r="66" stroke="#00B8FF" strokeOpacity="0.18" strokeWidth="1" className="hero-pulse-ring" />
        <polygon points="600,272 624,286 624,314 600,328 576,314 576,286" stroke="#00B8FF" strokeOpacity="0.4" strokeWidth="1.2" />
        <circle cx={c.x} cy={c.y} r="8" fill="#00B8FF" fillOpacity="0.45" className="hero-node-pulse" />

        {/* Contacts — blip bright as the sweep passes over them */}
        {contacts.map((k, i) => (
          <g key={`c-${i}`}>
            <circle cx={k.x} cy={k.y} r="16" stroke="#00B8FF" strokeOpacity="0.2" strokeWidth="1" />
            <circle
              cx={k.x}
              cy={k.y}
              r="3.2"
              fill="#00B8FF"
              className="hero-blip"
              style={{ animationDelay: `${k.delay}s` }}
            />
            <text
              x={k.x}
              y={k.y - 22}
              textAnchor="middle"
              fontSize="8.5"
              letterSpacing="1.2"
              fill="#00B8FF"
              fillOpacity="0.5"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            >
              {k.label}
            </text>
          </g>
        ))}

        {/* Anomaly contact — detected, then auto-blocked */}
        <g>
          <circle
            cx={anomaly.x}
            cy={anomaly.y}
            r="3.2"
            fill="#f43f5e"
            className="hero-blip"
            style={{ animationDelay: `${anomaly.delay}s` }}
          />
          <circle
            cx={anomaly.x}
            cy={anomaly.y}
            r="18"
            stroke="#f43f5e"
            strokeWidth="1.4"
            className="hero-block-ring"
          />
          <text
            x={anomaly.x}
            y={anomaly.y - 24}
            textAnchor="middle"
            fontSize="8.5"
            letterSpacing="1.2"
            fill="#f43f5e"
            fillOpacity="0.6"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          >
            ANOMALY
          </text>
        </g>
      </svg>
    </div>
  );
}
