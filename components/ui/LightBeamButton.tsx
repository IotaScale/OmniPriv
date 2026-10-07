import Link from "next/link";
import { cn } from "@/lib/utils";

/*
 * A button carrying a rotating conic-gradient border.
 *
 * Adapted from a supplied reference component. Four deliberate changes:
 *
 * 1. NO framer-motion. The original used `motion.button` for whileHover /
 *    whileTap; this codebase has framer-motion installed but imported nowhere,
 *    and the animations skill forbids reaching for it. CSS `hover:scale` /
 *    `active:scale` do the same thing and ship no JavaScript.
 * 2. The CSS lives in app/globals.css, not in a <style> tag inside the
 *    component — which would inject a duplicate copy per instance.
 * 3. Brand colours (#00B8FF + #a78bfa) instead of the reference's violet/cyan.
 * 4. Renders a <Link> when given `href` and a <button> otherwise. The hero CTA
 *    navigates, and a navigation is not a button.
 *
 * The beam itself is pure CSS, so this stays a server component.
 */

export interface LightBeamButtonProps {
  children: React.ReactNode;
  /** Renders an anchor when set, a button otherwise. */
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function LightBeamButton({
  children,
  href,
  className,
  onClick,
  type = "button",
  disabled = false,
}: LightBeamButtonProps) {
  const classes = cn(
    "light-beam group inline-flex items-center justify-center gap-2",
    "px-7 py-3.5 text-sm sm:text-base text-white",
    /* Named properties, not `all` — see .github/skills/animations */
    "transition-[transform,box-shadow] duration-200 ease-out",
    "hover:scale-[1.02] hover:shadow-[0_0_28px_-6px_rgba(0,184,255,0.45)]",
    "active:scale-[0.98]",
    disabled && "opacity-60 cursor-not-allowed",
    className
  );

  const content = (
    <>
      <span className="light-beam-glow" aria-hidden="true" />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}
