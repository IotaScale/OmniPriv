"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/* Orbiting service nodes for the hero.

   The orbit system is ported from `pam-guardian-hero-v5.html`. Its hand-drawn
   SVG bot is GONE, the user supplied their own AI render, which now sits
   full-bleed behind this as the hero background (see `app/page.tsx`). This
   component draws only the eight labelled services and their electron dots
   travelling three tilted ellipses around the AI's head.

   ALIGNMENT, the important bit. The background image and this SVG must use the
   SAME cover mapping, or the orbits drift off the head as the viewport
   changes. The image uses `object-cover object-right`; this SVG therefore uses
   `preserveAspectRatio="xMaxYMid slice"`. Both anchor right and centre
   vertically, so they stay locked together at every size. Changing one without
   the other breaks the alignment.

   `CX`/`CY` are the head's centre in the source render (1366x768), and the
   orbit radii clear the head's roughly 225x232 half-size.

   Precession is a gentle oscillation (~+/-14 degrees) rather than the original
   full sweep: a full sweep swings the ellipse's major axis toward the corners,
   overshoots, and clips nodes off the edge of the viewBox.

   Reduced motion renders one frame at t=2.2s so the nodes sit spread out
   rather than stacked at their start angles. */

const NS = "http://www.w3.org/2000/svg";

/* Head centre and orbit radii, in the 1366x768 viewBox */
const CX = 1015;
const CY = 288;
const RX = 280;
const RY = 278;

/* ---- EDIT HERE: orbits, services, colours, speed ---- */
const ORBITS = [
  {
    angle: 0,
    speed: 0.42,
    color: "#38e1ff",
    services: [
      { label: "AI Agents", icon: "ai" },
      { label: "Credential Vault", icon: "lock" },
      { label: "Session Recording", icon: "rec" },
    ],
  },
  {
    angle: 60,
    speed: -0.36,
    color: "#a493ff",
    services: [
      { label: "Human Users", icon: "user" },
      { label: "JIT Access", icon: "clock" },
      { label: "Machines", icon: "server" },
    ],
  },
  {
    angle: 120,
    speed: 0.32,
    color: "#35f0b0",
    services: [
      { label: "Endpoints", icon: "laptop" },
      { label: "Least Privilege", icon: "shield" },
    ],
  },
];

type Orbit = (typeof ORBITS)[number] & { a?: number; ring?: SVGElement };
type Item = { g: SVGElement; orbit: Orbit; phase: number; k: number };

export default function PamGuardian({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = svgRef.current;
    if (!root) return;

    const rings = root.querySelector<SVGGElement>("#pamg-rings");
    const nodes = root.querySelector<SVGGElement>("#pamg-nodes");
    if (!rings || !nodes) return;

    /* Re-bound as non-null consts: TypeScript does not carry the narrowing
       above into the closures further down. */
    const ringLayer = rings;
    const nodeLayer = nodes;

    /* Clear first: React StrictMode and Fast Refresh both run effects twice,
       which would otherwise stack two copies of every node. */
    ringLayer.innerHTML = "";
    nodeLayer.innerHTML = "";

    const el = (name: string, attrs: Record<string, string>, html?: string) => {
      const n = document.createElementNS(NS, name);
      for (const k in attrs) n.setAttribute(k, attrs[k]);
      if (html) n.innerHTML = html;
      return n;
    };

    const items: Item[] = [];

    ORBITS.forEach((o, oi) => {
      const orbit = o as Orbit;
      const ring = el("g", {});
      orbit.ring = ring;
      ring.innerHTML =
        '<ellipse rx="' + RX + '" ry="' + RY + '" fill="none" stroke="' + o.color +
        '" stroke-opacity=".3" stroke-width="1.3" stroke-dasharray="3 7"/>';
      ringLayer.appendChild(ring);

      const n = o.services.length;
      o.services.forEach((s, i) => {
        const w = Math.round(s.label.length * 7 + 22);
        const c = o.color;
        const g = el(
          "g",
          {},
          '<circle class="n-bg" r="23"/>' +
            '<circle class="n-ring" r="23" stroke="' + c + '" style="filter:drop-shadow(0 0 7px ' + c + ')"/>' +
            '<use href="#pamg-ic-' + s.icon + '" x="-12" y="-12" width="24" height="24" class="ic" style="--c:' + c + '"/>' +
            '<g transform="translate(0 40)">' +
            '<rect class="pill" x="' + -w / 2 + '" y="-11" width="' + w + '" height="22" rx="11"/>' +
            '<text class="lbl" y="4.5">' + s.label + "</text>" +
            "</g>",
        );
        nodeLayer.appendChild(g);
        items.push({ g, orbit, phase: (i / n) * Math.PI * 2 + oi * 0.7, k: 1 });
      });

      /* tiny electrons */
      for (let e = 0; e < 2; e++) {
        const dot = el("circle", {
          r: "3.2",
          fill: o.color,
          style: "filter:drop-shadow(0 0 4px " + o.color + ")",
        });
        nodeLayer.appendChild(dot);
        items.push({ g: dot, orbit, phase: e * Math.PI + oi * 1.9, k: 2.6 });
      }
    });

    let time = 0;
    let last: number | null = null;
    let raf = 0;
    let running = true;

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function render() {
      ORBITS.forEach((o) => {
        const orbit = o as Orbit;
        orbit.a = o.angle + Math.sin(time * 0.35) * 14;
        orbit.ring?.setAttribute(
          "transform",
          "translate(" + CX + " " + CY + ") rotate(" + orbit.a + ")",
        );
      });

      items.forEach((it) => {
        const o = it.orbit;
        const th = it.phase + o.speed * it.k * time;
        const lx = RX * Math.cos(th);
        const ly = RY * Math.sin(th);
        const r = ((o.a ?? 0) * Math.PI) / 180;
        const x = CX + lx * Math.cos(r) - ly * Math.sin(r);
        const y = CY + lx * Math.sin(r) + ly * Math.cos(r);

        /* -1 at the back of the orbit .. 1 at the front. Depth is expressed by
           size and opacity only, with the AI render as a full-bleed
           background there is no occluding layer left to hide nodes behind,
           so the nodes always draw in front. */
        const depth = ly / RY;
        const s = 0.84 + (0.16 * (depth + 1)) / 2;
        it.g.setAttribute(
          "transform",
          "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") scale(" + s.toFixed(3) + ")",
        );
        it.g.style.opacity = (0.55 + (0.45 * (depth + 1)) / 2).toFixed(2);
      });
    }

    const frame = (ts: number) => {
      if (!running) {
        raf = 0;
        return;
      }
      if (last === null) last = ts;
      time += Math.min((ts - last) / 1000, 0.05);
      last = ts;
      render();
      raf = requestAnimationFrame(frame);
    };

    /* Reduced motion: draw one representative frame and stop. */
    if (reduce) {
      time = 2.2;
      render();
      return;
    }

    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((entries) => {
        running = entries[0].isIntersecting;
        if (running && !raf) {
          last = null;
          raf = requestAnimationFrame(frame);
        }
      });
      io.observe(root);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1366 768"
      preserveAspectRatio="xMaxYMid slice"
      className={cn("pamg", className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* service icons */}
        <symbol id="pamg-ic-ai" viewBox="0 0 24 24">
          <text x="10" y="17" textAnchor="middle" fontSize="12.5" fontWeight="800" fontFamily="system-ui, sans-serif" fill="currentColor" stroke="none">AI</text>
          <path d="M19.5 3v5M17 5.5h5" />
        </symbol>
        <symbol id="pamg-ic-user" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="3.6" />
          <path d="M5 20c0-4 3.2-6 7-6s7 2 7 6" />
        </symbol>
        <symbol id="pamg-ic-server" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="6.5" rx="1.6" />
          <rect x="4" y="13.5" width="16" height="6.5" rx="1.6" />
          <path d="M8 7.2h.01M8 16.8h.01M12 7.2h5M12 16.8h5" />
        </symbol>
        <symbol id="pamg-ic-laptop" viewBox="0 0 24 24">
          <rect x="5" y="6" width="14" height="9.5" rx="1.6" />
          <path d="M3 19h18" />
        </symbol>
        <symbol id="pamg-ic-shield" viewBox="0 0 24 24">
          <path d="M12 3l7 3v5.5c0 4.6-3 7.6-7 9.5-4-1.9-7-4.9-7-9.5V6z" />
          <path d="M9 12l2.2 2.2L15.2 10" />
        </symbol>
        <symbol id="pamg-ic-clock" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        </symbol>
        <symbol id="pamg-ic-rec" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="2.8" fill="currentColor" />
        </symbol>
        <symbol id="pamg-ic-lock" viewBox="0 0 24 24">
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </symbol>
      </defs>
      <g id="pamg-rings" />
      <g id="pamg-nodes" />
    </svg>
  );
}
