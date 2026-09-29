import type { CSSProperties } from "react";

const SWEEP = 7; // seconds — must match .hero-radar-sweep / .hero-grant / .hero-scan-blip

export default function HeroBackground4() {
  const c = { x: 600, y: 300 };
  const rx = 460;
  const ry = 215;

  const targets = ["SSH", "RDP", "Databases", "Kubernetes", "Web Apps", "Cloud IAM", "MCP"];

  const nodes = targets.map((label, i) => {
    const deg = -90 + (i * 360) / targets.length;
    const rad = (deg * Math.PI) / 180;
    const x = c.x + Math.cos(rad) * rx;
    const y = c.y + Math.sin(rad) * ry;
    const norm = ((deg % 360) + 360) % 360;
    const anchor: "start" | "middle" | "end" =
      x > c.x + 130 ? "end" : x < c.x - 130 ? "start" : "middle";
    return {
      label,
      x,
      y,
      anchor,
      // fires exactly when the sweep beam reaches this node
      delay: (norm / 360) * SWEEP,
      gx: c.x - x,
      gy: c.y - y,
    };
  });

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Radar sweep beam (no rings) */}
      <div className="hero-radar absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full">
        <div
          className="hero-radar-sweep absolute inset-0 rounded-full"
          style={{ animationDuration: `${SWEEP}s` }}
        />
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
        SWEEP &middot; 360&deg;
      </div>
      <div className="hero-hud-readout hidden md:block" style={{ bottom: "13%", left: "4%" }}>
        ENDPOINTS &middot; 7
      </div>
      <div className="hero-hud-readout hidden md:block" style={{ bottom: "13%", right: "4%" }}>
        GRANTS &middot; STREAMING
      </div>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Faint crosshair */}
        <line x1={c.x} y1="0" x2={c.x} y2="600" stroke="#00B8FF" strokeOpacity="0.06" />
        <line x1="0" y1={c.y} x2="1200" y2={c.y} stroke="#00B8FF" strokeOpacity="0.06" />

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
          <line x1={c.x} y1={c.y} x2={c.x + 470} y2={c.y} stroke="#00B8FF" strokeOpacity="0.5" strokeWidth="1.4" />
          <circle cx={c.x + 470} cy={c.y} r="3.5" fill="#00B8FF" fillOpacity="0.95" />
        </g>

        {/* Access grants travelling from each endpoint into the core */}
        {nodes.map((n, i) => (
          <circle
            key={`g-${i}`}
            cx={n.x}
            cy={n.y}
            r="3.2"
            fill="#00B8FF"
            className="hero-grant"
            style={
              {
                animationDelay: `${n.delay}s`,
                "--gx": `${n.gx}px`,
                "--gy": `${n.gy}px`,
              } as CSSProperties
            }
          />
        ))}

        {/* Endpoint blips + labels — flash as the beam scans them */}
        {nodes.map((n, i) => (
          <g key={`n-${i}`}>
            <circle cx={n.x} cy={n.y} r="14" stroke="#00B8FF" strokeOpacity="0.16" strokeWidth="1" />
            <circle
              cx={n.x}
              cy={n.y}
              r="3.4"
              fill="#00B8FF"
              className="hero-scan-blip"
              style={{ animationDelay: `${n.delay}s` }}
            />
            <text
              x={n.anchor === "end" ? n.x + 14 : n.anchor === "start" ? n.x - 14 : n.x}
              y={n.y - 20}
              textAnchor={n.anchor}
              fontSize="9.5"
              letterSpacing="1.6"
              fill="#00B8FF"
              fillOpacity="0.55"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* Core — OmniPriv access engine */}
        <circle cx={c.x} cy={c.y} r="56" stroke="#00B8FF" strokeOpacity="0.2" strokeWidth="1" className="hero-pulse-ring" />
        <polygon
          points="600,262 633,281 633,319 600,338 567,319 567,281"
          stroke="#00B8FF"
          strokeOpacity="0.4"
          strokeWidth="1.2"
        />
        <circle cx={c.x} cy={c.y} r="9" fill="#00B8FF" fillOpacity="0.5" className="hero-node-pulse" />
      </svg>
    </div>
  );
}
