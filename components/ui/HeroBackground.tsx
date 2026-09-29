export default function HeroBackground() {
  const hub = { x: 600, y: 300 };

  const nodes = [
    { x: 600, y: 90, label: "SSH" },
    { x: 952, y: 169, label: "RDP" },
    { x: 1039, y: 347, label: "Databases" },
    { x: 795, y: 489, label: "Kubernetes" },
    { x: 405, y: 489, label: "Web Apps" },
    { x: 161, y: 347, label: "Cloud IAM" },
    { x: 248, y: 169, label: "MCP" },
  ];

  const crossLinks: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 0],
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Cross links between identities (mesh) */}
        {crossLinks.map(([a, b], i) => (
          <line
            key={`x-${i}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="#6366F1"
            strokeOpacity="0.1"
            strokeWidth="1"
            strokeDasharray="3 10"
            className="hero-flow"
          />
        ))}

        {/* Access requests flowing into the OmniPriv hub */}
        {nodes.map((n, i) => (
          <g key={`l-${i}`}>
            <line
              x1={hub.x}
              y1={hub.y}
              x2={n.x}
              y2={n.y}
              stroke="#00B8FF"
              strokeOpacity="0.1"
              strokeWidth="1"
            />
            <line
              x1={hub.x}
              y1={hub.y}
              x2={n.x}
              y2={n.y}
              stroke="#00B8FF"
              strokeOpacity="0.32"
              strokeWidth="1"
              strokeDasharray="4 12"
              className="hero-flow"
              style={{ animationDelay: `${i * 0.25}s` }}
            />
            <circle r="2.5" fill="#00B8FF">
              <animateMotion
                dur={`${5 + (i % 3)}s`}
                repeatCount="indefinite"
                begin={`${i * 0.4}s`}
                path={`M ${n.x},${n.y} L ${hub.x},${hub.y}`}
              />
            </circle>
          </g>
        ))}

        {/* Central hub: OmniPriv access gateway */}
        <g>
          <circle
            cx={hub.x}
            cy={hub.y}
            r="72"
            stroke="#00B8FF"
            strokeOpacity="0.14"
            strokeWidth="1"
            strokeDasharray="2 8"
            className="hero-spin-slow"
          />
          <circle
            cx={hub.x}
            cy={hub.y}
            r="46"
            stroke="#00B8FF"
            strokeOpacity="0.16"
            strokeWidth="1"
            className="hero-pulse-ring"
          />
          <circle cx={hub.x} cy={hub.y} r="26" stroke="#00B8FF" strokeOpacity="0.12" strokeWidth="1" />
          <circle
            cx={hub.x}
            cy={hub.y}
            r="9"
            fill="#00B8FF"
            fillOpacity="0.4"
            className="hero-node-pulse"
          />
        </g>

        {/* Identity nodes + labels */}
        {nodes.map((n, i) => (
          <g key={`n-${i}`}>
            <circle
              cx={n.x}
              cy={n.y}
              r="4"
              fill="#00B8FF"
              fillOpacity="0.7"
              className="hero-node-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
            <circle cx={n.x} cy={n.y} r="9" stroke="#00B8FF" strokeOpacity="0.18" strokeWidth="1" />
            <text
              x={n.x}
              y={n.y - 14}
              textAnchor="middle"
              fontSize="9"
              letterSpacing="1.5"
              fill="#00B8FF"
              fillOpacity="0.5"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
