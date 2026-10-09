"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
/*
 * Orbiting hero icons are disabled. See the commented block next to the stage
 * below for how to bring them back.
 */
// import type { LucideIcon } from "lucide-react";
// import {
//   AlertTriangle,
//   Bot,
//   Clock,
//   Cpu,
//   Database,
//   Eye,
//   FileSearch,
//   Fingerprint,
//   Globe,
//   KeyRound,
//   Layers,
//   Lock,
//   Monitor,
//   Network,
//   Server,
//   Shield,
//   ShieldCheck,
//   UserCheck,
//   Workflow,
//   Zap,
// } from "lucide-react";
import { cn } from "@/lib/utils";
import ScreenshotLightbox from "@/components/ui/ScreenshotLightbox";

/*
 * The hero's product screens: four real captures floating in 3D over an
 * animated ground, with orbiting particles and a pulsing halo behind them.
 *
 * Adapted from the supplied reference. Three deliberate departures:
 *
 * 1. Brand cyan (#00B8DB) instead of the reference's #00bcd4, so the hero
 *    matches the accent every other page uses.
 * 2. Four screens rather than three, we have four captures.
 * 3. The hover scale lives on an inner `.hero-screen-card`, never on the
 *    button. Scaling the hover target itself makes its own edges travel under
 *    a stationary cursor, so neighbouring screens blink against each other on
 *    every mouse move across their seam. For the same reason the float sits on
 *    its own layer: CSS animations outrank normal declarations, so a float
 *    keyframe sharing an element with the scripted parallax would win and pin
 *    the parallax to zero.
 */

interface Panel {
  src: string;
  label: string;
  alt: string;
  width: number;
  height: number;
  /** Static placement of the hit box. */
  place: string;
  /** Which float/reveal pair to run. */
  pos: "backleft" | "backright" | "center" | "front";
  /** Parallax multiplier. */
  depth: number;
}

const PANELS: Panel[] = [
  {
    src: "/product/asset.png",
    label: "Asset Inventory",
    alt: "OmniPriv asset inventory listing every managed endpoint with its address, operating system, agent status and reachability",
    width: 1917,
    height: 941,
    /*
     * Kept clear of the headline. Scaled, this card grows ~19% of its width to
     * the left; at left-[-2%] that reached to within 2px of the first line of
     * the h1, and the float varies the Y rotation enough to close that gap.
     * Sitting at top-0 now puts it level with that first line, so it needs the
     * extra inset more than it did when it sat lower.
     */
    place: "left-[7%] top-[8%] w-[55%] z-10",
    pos: "backleft",
    depth: 0.4,
  },
  {
    src: "/product/compliance.png",
    label: "Compliance Reports",
    alt: "OmniPriv compliance reporting showing readiness against SOC 2, ISO 27001, NIST SP 800-53, HIPAA, PCI DSS and SOX 404",
    width: 1919,
    height: 936,
    place: "right-[-2%] top-[20%] w-[58%] z-20",
    pos: "backright",
    depth: 0.7,
  },
  {
    src: "/product/dashboard.png",
    label: "Admin Dashboard",
    alt: "OmniPriv admin dashboard showing the security overview, ML anomaly count, SIEM events and current compliance posture",
    width: 1919,
    height: 941,
    place: "left-[16%] top-[48%] w-[80%] z-30",
    pos: "center",
    depth: 1,
  },
  /*
   * Secure Sign-In, commented out, three screens read better here.
   *
   * Its `is-pos-front` rule and `heroFloatFront` keyframes are still in
   * globals.css, so restoring this entry is all that is needed to bring it
   * back. `public/product/login.png` stays in place for the same reason.
   *
   * The three above were re-spaced when it left: a four-card fan could rely on
   * the front card reaching down past the others, but three cannot, so the
   * remaining cards step further apart to keep overlapping as one stack.
   */
  // {
  //   src: "/product/login.png",
  //   label: "Secure Sign-In",
  //   alt: "OmniPriv sign-in screen with email and password authentication",
  //   width: 1919,
  //   height: 942,
  //   place: "right-[0%] bottom-[18%] w-[52%] z-40",
  //   pos: "front",
  //   depth: 1.2,
  // },
];

/*
 * Orbiting capability icons, drawn from the same vocabulary the rest of the
 * site already uses: Bot for AI agents, Server for assets, KeyRound for
 * credentials, and so on. Abstract shapes said nothing; these read as product
 * surface. Positions and timings are the reference's particle field.
 *
 * Disabled on request. To restore, uncomment this array, the render block
 * below it, and the lucide imports at the top of the file.
 *
const PARTICLES: {
  Icon: LucideIcon;
  place: string;
  size: number;
  dur: string;
  delay: string;
  reverse?: boolean;
}[] = [
  { Icon: Bot, place: "left-[12%] top-[18%]", size: 20, dur: "10s", delay: "-2s" },
  { Icon: Server, place: "left-[30%] top-[8%]", size: 22, dur: "13s", delay: "-6s" },
  { Icon: KeyRound, place: "right-[18%] top-[12%]", size: 16, dur: "9s", delay: "-1s" },
  { Icon: Fingerprint, place: "left-[48%] top-[5%]", size: 20, dur: "12s", delay: "-8s" },
  { Icon: ShieldCheck, place: "right-[5%] top-[32%]", size: 24, dur: "14s", delay: "-4s" },
  { Icon: Eye, place: "left-[4%] top-[42%]", size: 20, dur: "11s", delay: "-7s" },
  { Icon: Database, place: "right-[28%] top-[45%]", size: 18, dur: "10s", delay: "-3s" },
  { Icon: Network, place: "left-[38%] bottom-[8%]", size: 20, dur: "15s", delay: "-10s" },
  { Icon: Lock, place: "right-[10%] bottom-[18%]", size: 22, dur: "12s", delay: "-5s" },
  { Icon: Clock, place: "left-[18%] bottom-[5%]", size: 16, dur: "9.5s", delay: "-2.5s" },
  { Icon: FileSearch, place: "right-[42%] bottom-[4%]", size: 20, dur: "13s", delay: "-9s" },
  { Icon: Workflow, place: "left-[58%] top-[28%]", size: 24, dur: "16s", delay: "-12s" },
  { Icon: Zap, place: "right-[2%] top-[60%]", size: 18, dur: "11s", delay: "-1.5s" },
  { Icon: Layers, place: "left-[22%] top-[62%]", size: 20, dur: "14s", delay: "-7.5s" },
  { Icon: Globe, place: "right-[35%] top-[72%]", size: 16, dur: "10s", delay: "-4.5s" },
  { Icon: Monitor, place: "left-[70%] bottom-[22%]", size: 20, dur: "15s", delay: "-11s" },
  { Icon: UserCheck, place: "left-[8%] top-[30%]", size: 22, dur: "10.5s", delay: "0.4s", reverse: true },
  { Icon: Cpu, place: "left-[26%] top-[24%]", size: 26, dur: "12s", delay: "1.2s" },
  { Icon: AlertTriangle, place: "right-[12%] top-[24%]", size: 24, dur: "9.5s", delay: "1.8s", reverse: true },
  { Icon: Shield, place: "right-[25%] top-[8%]", size: 18, dur: "11.5s", delay: "0.9s" },
];
*/

export default function HeroPanelCluster() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Kept apart from openIndex so the capture stays mounted while the dialog
  // fades out, instead of blanking mid-transition.
  const [lastIndex, setLastIndex] = useState(0);
  const [everOpened, setEverOpened] = useState(false);

  const openAt = (i: number) => {
    setLastIndex(i);
    setOpenIndex(i);
    setEverOpened(true);
  };

  const panel = PANELS[openIndex ?? lastIndex];

  // Pointer parallax. Written straight to the nodes, a state update per
  // frame would re-render four images plus twenty particles.
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
        el.style.transform = `translate3d(${(dx / 35) * d}px, ${(dy / 35) * d}px, 0)`;
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
      {/* ── Desktop: floating 3D screens ─────────────────── */}
      <div
        ref={stageRef}
        className="relative hidden lg:block aspect-[647/620]"
        style={{ perspective: "1600px" }}
      >
        {/*
         * Halo. Sized inside a centring flex parent rather than with
         * `translate(-50%,-50%)`: the pulse keyframes animate `transform`, so
         * a centring transform would be overwritten and the halo would hang
         * off to the bottom-right by half its own size.
         */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div data-motion className="hero-pulse-soft h-[32.5rem] w-[32.5rem] rounded-full bg-[#00B8DB]/15 blur-3xl" />
          <div data-motion className="hero-screen-glow absolute" />
        </div>

        {/*
         * Orbiting capability icons, disabled on request.
         * To restore: uncomment this block, the PARTICLES array above, and the
         * lucide icon imports at the top of this file. The `.hero-particle`
         * rules in globals.css are untouched and will apply again as-is.
         *
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {PARTICLES.map(({ Icon, place, size, dur, delay, reverse }, i) => (
            <Icon
              key={i}
              data-motion
              size={size}
              strokeWidth={1.6}
              className={cn("hero-particle", place, reverse && "is-reverse")}
              style={{ "--duration": dur, "--delay": delay } as React.CSSProperties}
            />
          ))}
        </div>
        */}

        {PANELS.map((item, i) => {
          const isActive = active === i;
          const isDimmed = active !== null && active !== i;
          return (
            <button
              key={item.src}
              type="button"
              data-motion
              onClick={() => openAt(i)}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              aria-label={`View the ${item.label} screenshot`}
              className={cn(
                "hero-screen absolute block text-left cursor-pointer",
                `is-pos-${item.pos}`,
                item.place,
                isActive && "!z-50",
                isDimmed && "opacity-35"
              )}
            >
              <div data-depth={item.depth} className="hero-screen-parallax">
                <div data-motion className="hero-screen-float">
                  <div data-motion className={cn("hero-screen-card", isActive && "is-active")}>
                    <Image
                      src={item.src}
                      alt=""
                      width={item.width}
                      height={item.height}
                      sizes="(min-width: 1024px) 40vw, 80vw"
                      className="w-full h-auto block"
                    />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Below lg: no room for 3D, so a snap row ─────────── */}
      <div className="lg:hidden -mx-5 sm:-mx-8 px-5 sm:px-8 overflow-x-auto snap-x snap-mandatory flex gap-3 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {PANELS.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => openAt(i)}
            aria-label={`View the ${item.label} screenshot`}
            className="snap-center shrink-0 w-[82%] sm:w-[62%] rounded-lg overflow-hidden border border-white/10 bg-[#0A1628] shadow-[0_16px_40px_-16px_rgba(0,0,0,0.8)]"
          >
            <Image
              src={item.src}
              alt=""
              width={item.width}
              height={item.height}
              sizes="(min-width: 640px) 62vw, 82vw"
              className="w-full h-auto block"
            />
          </button>
        ))}
      </div>

      <ScreenshotLightbox
        open={openIndex !== null}
        onClose={() => setOpenIndex(null)}
        src={everOpened ? panel.src : ""}
        alt={panel.alt}
        label={panel.label}
        width={panel.width}
        height={panel.height}
      />
    </>
  );
}
