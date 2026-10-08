import { cn } from "@/lib/utils";

/*
 * A bento card carrying the mouse-following spotlight, the reactive border
 * glow and drifting particles, wrapped around whatever card markup the caller
 * already has.
 *
 * Presentational only, no state and no listeners, so it stays a server
 * component. The single pointer listener that feeds it lives in
 * BentoGlowGrid, which finds these cards by their `data-bento-card` attribute.
 *
 * The reference implementation for this effect shipped four more behaviours
 * that are deliberately NOT here:
 *
 *   - 3D tilt and magnetism both move the card out from under the cursor while
 *     the user is reading it, and on a 4-up grid the tilt makes neighbours
 *     overlap. They belong on a portfolio page, not a feature list.
 *   - A click ripple on cards that are not links (`cursor-default`, no href)
 *     promises an interaction that does not exist.
 *   - GSAP: none of the remaining effects need it, and it is not a dependency
 *     of this project.
 *
 * The effects are real elements rather than pseudo-elements on purpose:
 * `.card-shine` already owns this element's `::after`, and the bento rules in
 * globals.css are unlayered, so a `::after` here would silently out-rank and
 * kill the shine sweep.
 */

export interface BentoCardProps {
  children: React.ReactNode;
  /** Merged with `.bento-card`, pass the card's own surface classes here. */
  className?: string;
  /** Particles per card. 0 removes them entirely. */
  particleCount?: number;
  "data-aos"?: string;
  "data-aos-delay"?: number;
}

export default function BentoCard({
  children,
  className,
  particleCount = 5,
  ...rest
}: BentoCardProps) {
  return (
    <div
      data-bento-card=""
      className={cn("bento-card group relative overflow-hidden", className)}
      {...rest}
    >
      <span className="bento-spotlight" aria-hidden="true" />
      <span className="bento-border" aria-hidden="true" />
      {particleCount > 0 && (
        <span className="bento-particles" aria-hidden="true">
          {Array.from({ length: particleCount }, (_, i) => (
            <span key={i} className={`bento-dot bento-dot-${i + 1}`} />
          ))}
        </span>
      )}
      {children}
    </div>
  );
}
