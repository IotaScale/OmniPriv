"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BarChart3, ChevronRight, Cloud, Cpu, Database, ShieldCheck } from "lucide-react";
import ScreenshotLightbox from "@/components/ui/ScreenshotLightbox";

/*
 * Homepage hero visual: the real Compliance Reports capture on a 3D laptop,
 * a glass shield in front, two floating stat cards and three connected
 * capability nodes behind.
 *
 * Built from the supplied hero mock-up. Every figure on the stage is lifted
 * from the product captures in /public/product: 7 assets (Asset Types donut
 * on dashboard.png) and 78 ML anomalies (Security Overview on dashboard.png), * so nothing here is invented.
 *
 * Geometry: the stage is a fixed 100 × 72 box (aspect 25/18). Everything is
 * placed in percentages of that box and all text is sized in `cqw` against
 * the stage, so the composition scales as one picture at every width rather
 * than reflowing.
 *
 * Layering, same rule as HeroPanelCluster: parallax (`[data-depth]`, written
 * by JS), entrance (`.hero-reveal`) and the ambient bob (`.hero-bob`) each sit
 * on their own element, because they all drive `transform` and a CSS
 * animation would otherwise pin the scripted parallax to zero.
 */

const SCREEN = {
  src: "/product/compliance.png",
  label: "Compliance Reports",
  alt: "OmniPriv compliance reporting showing 86% readiness, posture distribution across 42 controls and framework readiness for SOC 2, ISO 27001, NIST SP 800-53, HIPAA, PCI DSS and SOX 404",
  width: 1919,
  height: 936,
};

/* Capability nodes on the connector ring. Centres in the 100 × 72 stage units. */
const NODES = [
  { Icon: Cloud, label: "Cloud", x: 9, y: 26, delay: "0s" },
  { Icon: Cpu, label: "AI agents", x: 95, y: 31, delay: "-2s" },
  { Icon: Database, label: "Databases", x: 94, y: 49, delay: "-4s" },
] as const;

export default function HeroLaptopShowcase() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);

  // Pointer parallax, written straight to the nodes, as in HeroPanelCluster.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const layers = Array.from(stage.querySelectorAll<HTMLElement>("[data-depth]"));

    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      const dx = e.clientX - r.left - r.width / 2;
      const dy = e.clientY - r.top - r.height / 2;
      for (const el of layers) {
        const d = Number(el.dataset.depth) || 0;
        el.style.transform = `translate3d(${(dx / 40) * d}px, ${(dy / 40) * d}px, 0)`;
      }
    };
    const onLeave = () => {
      for (const el of layers) el.style.transform = "";
    };

    stage.addEventListener("pointermove", onMove, { passive: true });
    stage.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={stageRef}
        className="hero-stage relative w-full aspect-[25/18] select-none"
        style={{ containerType: "inline-size" }}
      >
        {/* ── Ambient halo ─────────────────────────────── */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <div data-motion className="hero-pulse-soft w-[70%] aspect-square rounded-full bg-[#00B8DB]/15 blur-3xl" />
        </div>

        {/* ── Connector ring (decorative) ──────────────── */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full hidden sm:block"
          viewBox="0 0 100 72"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="hero-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#00B8DB" stopOpacity="0.55" />
              <stop offset="1" stopColor="#00B8DB" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          <g stroke="url(#hero-ring)" strokeWidth="1.2" strokeDasharray="3 4" vectorEffect="non-scaling-stroke">
            {/* cloud → assets card */}
            <path d="M9 21 C 10 14, 16 9, 23 7" vectorEffect="non-scaling-stroke" />
            {/* assets card → security card, arching over the lid */}
            <path d="M52 6 C 58 2, 63 2, 67 4" vectorEffect="non-scaling-stroke" />
            {/* security card → AI node */}
            <path d="M97 11 C 99 16, 98 21, 95 25" vectorEffect="non-scaling-stroke" />
            {/* AI → database */}
            <path d="M96 36 C 97 40, 96 42, 95 44" vectorEffect="non-scaling-stroke" />
            {/* database → sweep under the laptop */}
            <path d="M92 54 C 86 64, 60 70, 34 70" vectorEffect="non-scaling-stroke" />
            {/* cloud → down towards the shield */}
            <path d="M8 31 C 5 37, 4 41, 5 45" vectorEffect="non-scaling-stroke" />
          </g>
        </svg>

        {/* ── Pedestal ─────────────────────────────────── */}
        <div className="pointer-events-none absolute left-[12%] right-[2%] top-[84%] h-[16%]" aria-hidden="true">
          <div className="hero-pedestal absolute inset-0 rounded-[50%]" />
          <div className="absolute inset-x-[12%] top-[8%] h-[40%] rounded-[50%] bg-[#00B8DB]/20 blur-2xl" />
        </div>

        {/* ── Laptop ───────────────────────────────────── */}
        <div data-depth="0.5" className="absolute left-[16%] top-[19%] w-[73%] z-20">
          <div className="hero-reveal" style={{ animationDelay: "0.25s" }}>
            <div className="hero-laptop">
              {/* Lid, the screenshot opens full size in the lightbox */}
              <button
                type="button"
                onClick={() => {
                  setOpen(true);
                  setEverOpened(true);
                }}
                aria-label="View the Compliance Reports screenshot"
                className="hero-laptop-lid group block w-full text-left cursor-zoom-in"
              >
                <div className="hero-laptop-screen relative overflow-hidden rounded-[0.6cqw] bg-[#2b2d38]">
                  <Image
                    src={SCREEN.src}
                    alt=""
                    width={SCREEN.width}
                    height={SCREEN.height}
                    priority
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="block w-full h-auto transition-[filter] duration-300 group-hover:brightness-110"
                  />
                  {/* glass reflection */}
                  <span className="hero-laptop-glare pointer-events-none absolute inset-0" aria-hidden="true" />
                </div>
              </button>
              {/* Keyboard deck, a plane hinged at the lid's bottom edge */}
              <div className="hero-laptop-deck" aria-hidden="true">
                <div className="hero-laptop-keys" />
                <div className="hero-laptop-pad" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Floating stat cards ──────────────────────── */}
        <div data-depth="1.1" className="absolute left-[22%] top-[0%] w-[30%] z-30 hidden sm:block">
          <div className="hero-reveal" style={{ animationDelay: "0.45s" }}>
            <div data-motion className="hero-bob" style={{ animationDelay: "-1s" }}>
              <div className="hero-glass-card rotate-[-5deg]">
                <span className="flex items-center justify-center rounded-[1cqw] bg-[#1d6bff] text-white w-[5.4cqw] h-[5.4cqw] shrink-0 shadow-[0_0_24px_rgba(29,107,255,0.45)]">
                  <BarChart3 className="w-[3cqw] h-[3cqw]" strokeWidth={2.4} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-white text-[1.9cqw] leading-tight">All Assets</span>
                  <span className="block text-slate-300 text-[1.35cqw] mt-[0.3cqw]">7 Total Assets</span>
                </span>
                <ChevronRight className="w-[2.2cqw] h-[2.2cqw] text-slate-300 shrink-0" />
              </div>
            </div>
          </div>
        </div>

        <div data-depth="1.3" className="absolute right-[1%] top-[-3%] w-[30%] z-30 hidden sm:block">
          <div className="hero-reveal" style={{ animationDelay: "0.55s" }}>
            <div data-motion className="hero-bob" style={{ animationDelay: "-3.5s" }}>
              <div className="hero-glass-card rotate-[-4deg]">
                <span className="flex items-center justify-center rounded-[1cqw] bg-emerald-500/15 border border-emerald-400/50 text-emerald-400 w-[5.4cqw] h-[5.4cqw] shrink-0">
                  <ShieldCheck className="w-[3cqw] h-[3cqw]" strokeWidth={2.2} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-white text-[1.7cqw] leading-tight">Security Overview</span>
                  <span className="block text-white font-extrabold text-[2.1cqw] leading-tight mt-[0.3cqw]">78</span>
                  <span className="block text-slate-300 text-[1.3cqw]">ML Anomalies</span>
                </span>
                <ChevronRight className="w-[2.2cqw] h-[2.2cqw] text-slate-300 shrink-0" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Capability nodes ─────────────────────────── */}
        {NODES.map(({ Icon, label, x, y, delay }, i) => (
          <div
            key={label}
            data-depth="0.8"
            className="absolute z-10 w-[9%] -ml-[4.5%] -mt-[4.5%] hidden sm:block"
            style={{ left: `${x}%`, top: `${(y / 72) * 100}%` }}
          >
            <div className="hero-reveal" style={{ animationDelay: `${0.6 + i * 0.08}s` }}>
              <div data-motion className="hero-bob" style={{ animationDelay: delay }}>
                <div className="hero-node" title={label}>
                  {label === "AI agents" ? (
                    <span className="flex items-center justify-center rounded-[0.6cqw] border-[0.25cqw] border-current w-[4cqw] h-[4cqw] font-extrabold text-[1.6cqw] leading-none">
                      AI
                    </span>
                  ) : (
                    <Icon className="w-[4cqw] h-[4cqw]" strokeWidth={1.8} />
                  )}
                  <span className="sr-only">{label}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* ── Shield ───────────────────────────────────── */}
        <div data-depth="1.6" className="absolute left-[0%] top-[42%] w-[27%] z-40" aria-hidden="true">
          <div className="hero-reveal" style={{ animationDelay: "0.4s" }}>
            <div data-motion className="hero-bob" style={{ animationDuration: "7s" }}>
              <HeroShield />
            </div>
            {/* glow pad under the shield */}
            <div className="mx-auto -mt-[12%] w-[80%] aspect-[4/1] rounded-[50%] border border-[#00B8DB]/60 bg-[#00B8DB]/20 blur-[1px] shadow-[0_0_40px_rgba(0, 184, 219,0.55)]" />
          </div>
        </div>
      </div>

      <ScreenshotLightbox
        open={open}
        onClose={() => setOpen(false)}
        src={everOpened ? SCREEN.src : ""}
        alt={SCREEN.alt}
        label={SCREEN.label}
        width={SCREEN.width}
        height={SCREEN.height}
      />
    </>
  );
}

/* Glass shield with a padlock, pure SVG, no request, scales with its box. */
function HeroShield() {
  return (
    <svg viewBox="0 0 200 230" className="w-full h-auto drop-shadow-[0_0_28px_rgba(0, 184, 219,0.55)]">
      <defs>
        <linearGradient id="shield-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5fd4ff" stopOpacity="0.55" />
          <stop offset="0.55" stopColor="#0a6cff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#032a66" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="shield-edge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bdefff" />
          <stop offset="1" stopColor="#00B8DB" />
        </linearGradient>
        <linearGradient id="lock-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e8faff" />
          <stop offset="1" stopColor="#5fd4ff" />
        </linearGradient>
      </defs>
      {/* outer shield */}
      <path
        d="M100 6 L186 38 V104 C186 160 148 204 100 224 C52 204 14 160 14 104 V38 Z"
        fill="url(#shield-fill)"
        stroke="url(#shield-edge)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* inner bevel */}
      <path
        d="M100 26 L168 51 V106 C168 150 139 186 100 203 C61 186 32 150 32 106 V51 Z"
        fill="none"
        stroke="#9be7ff"
        strokeOpacity="0.55"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* highlight sweep */}
      <path d="M100 26 L32 51 V106 C32 130 40 150 54 166 L100 26 Z" fill="#ffffff" fillOpacity="0.08" />
      {/* padlock */}
      <path
        d="M76 104 V88 C76 74 86 64 100 64 C114 64 124 74 124 88 V104"
        fill="none"
        stroke="url(#lock-fill)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <rect x="64" y="100" width="72" height="58" rx="10" fill="url(#lock-fill)" />
      <circle cx="100" cy="124" r="8" fill="#0a4fb8" />
      <rect x="96" y="126" width="8" height="18" rx="4" fill="#0a4fb8" />
    </svg>
  );
}
