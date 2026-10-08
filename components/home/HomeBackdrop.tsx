/*
 * Homepage backdrop: a quiet technical texture instead of a flat page or a
 * colour gradient.
 *
 *   - A fine dot field on a 24px grid, like engineering paper.
 *   - Sparse "access nodes" drawn from the OmniPriv mark (a hub with four
 *     spokes), sitting on the same grid. Some hubs are cyan, like live
 *     connections. It is completely still: texture, not decoration that
 *     competes with the content.
 *
 * The layer is fixed and sits behind everything, so the page content scrolls
 * over a still surface. All colour comes from CSS (`.op-bd-*`), so light and
 * dark themes are handled in app/globals.css. Server component: no JS.
 */

/* Node positions inside one 960 x 720 tile; snapped to the 24px grid. */
const NODES = [
  { x: 168, y: 120, live: true },
  { x: 744, y: 216, live: false },
  { x: 456, y: 456, live: true },
  { x: 96, y: 576, live: false },
  { x: 840, y: 624, live: true },
];

const ARM = 48; // spoke length, two grid steps

export default function HomeBackdrop() {
  return (
    <svg className="op-backdrop" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="op-bd-dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="12" r="1" className="op-bd-dot" />
        </pattern>
        <pattern id="op-bd-nodes" width="960" height="720" patternUnits="userSpaceOnUse">
          {NODES.map((n, i) => (
            <g key={i} transform={`translate(${n.x + 12} ${n.y + 12})`}>
              {[
                [-ARM, -ARM],
                [ARM, -ARM],
                [-ARM, ARM],
                [ARM, ARM],
              ].map(([dx, dy], k) => (
                <g key={k}>
                  <line x1="0" y1="0" x2={dx} y2={dy} className="op-bd-spoke" />
                  <circle cx={dx} cy={dy} r="3" className="op-bd-leaf" />
                </g>
              ))}
              <circle r="5" className={`op-bd-hub ${n.live ? "is-live" : ""}`} />
            </g>
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#op-bd-dots)" />
      <rect width="100%" height="100%" fill="url(#op-bd-nodes)" />
    </svg>
  );
}
