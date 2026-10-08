"use client";

import { useEffect } from "react";

/*
 * Homepage scroll controller. No dependency; one wheel listener.
 *
 * 1. Smooth scrolling: wheel input moves a target, and the page eases towards
 *    it every frame, so the whole page from hero to footer glides at one
 *    consistent pace instead of jumping in wheel-notch steps.
 * 2. Stepped zones: any element with `data-scroll-steps="N"` and
 *    `data-step-vh="H"` (the pinned challenges story) is walked one step per
 *    scroll gesture. Gestures are told apart by a pause in wheel input or by
 *    a fresh push during a decaying momentum tail, so a second flick moves
 *    the next slide straight away while the first flick's momentum never
 *    skips one. Steps are at least STEP_MIN_MS apart; a flick inside that
 *    window is queued, not dropped. At the first and last step, a new
 *    gesture carries on out of the zone as normal.
 * 3. Programmatic scrolls: dispatch `op:scrollto` with a `detail` y position
 *    to glide there (used by the challenge index buttons).
 *
 * Only for fine pointers (mouse, trackpad). Touch keeps native scrolling, and
 * keyboard / scrollbar input is native too; the controller re-syncs to it.
 * Reduced motion: does nothing at all.
 */

const EASE = 0.1; // share of the remaining distance covered per frame
const STEP_EASE = 0.17; // faster settle when moving between slides
const STEP_MIN_MS = 420; // shortest time between two slides
const GESTURE_GAP_MS = 140; // a pause this long starts a new gesture
const HEADER = 72;

export default function SmoothScroll() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const root = document.documentElement;
    const prevBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    let target = window.scrollY;
    let current = window.scrollY;
    let raf = 0;
    let animating = false;
    let ease = EASE;

    // Gesture tracking
    let gesture = 0; // id of the current gesture
    let lastTime = 0;
    let lastAbs = 0;
    let lastSign = 0;
    let peak = 0;
    let consumed = -1; // gesture that already moved a step
    let lastStepAt = -Infinity;
    let queued: ReturnType<typeof setTimeout> | null = null;

    const maxScroll = () => root.scrollHeight - window.innerHeight;
    const clamp = (y: number) => Math.max(0, Math.min(maxScroll(), y));

    const tick = () => {
      current += (target - current) * ease;
      if (Math.abs(target - current) < 0.5) {
        current = target;
        window.scrollTo(0, current);
        animating = false;
        return;
      }
      window.scrollTo(0, current);
      raf = requestAnimationFrame(tick);
    };
    const glide = (y: number, k = EASE) => {
      target = clamp(y);
      ease = k;
      if (!animating) {
        animating = true;
        current = window.scrollY;
        raf = requestAnimationFrame(tick);
      }
    };

    /* Step positions for the stepped zone, if one is on screen at this width. */
    const stepPositions = (): number[] | null => {
      const el = document.querySelector<HTMLElement>("[data-scroll-steps]");
      if (!el || el.offsetParent === null) return null;
      const n = Number(el.dataset.scrollSteps);
      const stepPx = (Number(el.dataset.stepVh) * window.innerHeight) / 100;
      const top = el.getBoundingClientRect().top + window.scrollY;
      return Array.from({ length: n }, (_, i) => (i === 0 ? top - HEADER : top + i * stepPx));
    };

    /* Where one step in direction `sign` lands from `base`, or null if outside the zone. */
    const stepTarget = (pos: number[], base: number, sign: number, dy: number): number | null => {
      const tol = 6;
      const first = pos[0];
      const last = pos[pos.length - 1];
      const reach = window.innerHeight * 0.35;
      if (sign > 0) {
        if (base < first - tol) return base + dy >= first - reach ? first : null;
        if (base < last - tol) return pos.find((p) => p > base + tol) ?? null;
        return null;
      }
      if (base > last + tol) return base + dy <= last + reach ? last : null;
      if (base > first + tol) return [...pos].reverse().find((p) => p < base - tol) ?? null;
      return null;
    };

    const inZone = (pos: number[], base: number) => base >= pos[0] - 6 && base <= pos[pos.length - 1] + 6;

    const takeStep = (y: number) => {
      lastStepAt = performance.now();
      consumed = gesture;
      glide(y, STEP_EASE);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // pinch / browser zoom
      const t = e.target as HTMLElement | null;
      if (t?.closest("[data-native-scroll], .nav-panel, .nav-sheet")) return;

      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 16;
      else if (e.deltaMode === 2) dy *= window.innerHeight;
      if (dy === 0) return;
      e.preventDefault();

      const now = performance.now();
      const abs = Math.abs(dy);
      const sign = Math.sign(dy);

      // New gesture: a pause, a change of direction, or a fresh push while
      // the previous one was already decaying (trackpad momentum).
      const decaying = peak > 0 && lastAbs < peak * 0.7;
      if (
        now - lastTime > GESTURE_GAP_MS ||
        sign !== lastSign ||
        (decaying && abs > lastAbs * 1.6 && abs > 10)
      ) {
        gesture++;
        peak = 0;
      }
      peak = Math.max(peak, abs);
      lastTime = now;
      lastAbs = abs;
      lastSign = sign;

      const pos = stepPositions();
      const base = animating ? target : window.scrollY;

      if (pos && pos.length > 1) {
        // This gesture already moved a step: its tail never moves another,
        // and never carries the page out of the zone.
        if (gesture === consumed) {
          if (inZone(pos, base)) return;
        } else {
          const y = stepTarget(pos, base, sign, dy);
          if (y !== null) {
            const wait = STEP_MIN_MS - (now - lastStepAt);
            if (wait <= 0) return takeStep(y);
            // Too soon after the last slide: queue this flick, do not drop it.
            consumed = gesture;
            if (!queued) {
              queued = setTimeout(() => {
                queued = null;
                const p2 = stepPositions();
                if (!p2) return;
                const y2 = stepTarget(p2, animating ? target : window.scrollY, sign, dy);
                if (y2 !== null) {
                  lastStepAt = performance.now();
                  glide(y2, STEP_EASE);
                }
              }, wait);
            }
            return;
          }
          if (inZone(pos, base)) {
            // At an edge step, pointing out of the zone: leave normally.
            consumed = -1;
          }
        }
      }

      glide(base + dy);
    };

    /* Native scrolling (keyboard, scrollbar, find-in-page): follow it. */
    const onScroll = () => {
      if (!animating) {
        target = window.scrollY;
        current = window.scrollY;
      }
    };

    const onScrollTo = (e: Event) => {
      const y = (e as CustomEvent<number>).detail;
      if (typeof y === "number") {
        lastStepAt = performance.now();
        consumed = gesture;
        glide(y, STEP_EASE);
      }
    };

    const onResize = () => {
      target = clamp(target);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("op:scrollto", onScrollTo);
    return () => {
      cancelAnimationFrame(raf);
      if (queued) clearTimeout(queued);
      root.style.scrollBehavior = prevBehavior;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("op:scrollto", onScrollTo);
    };
  }, []);

  return null;
}
