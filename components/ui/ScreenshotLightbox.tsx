"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

/*
 * The site's first modal. Follows the house pattern in
 * .github/skills/animations/references/patterns.md §9, which until now was
 * documented but unused, because nothing in the codebase needed a dialog.
 *
 * Contract carried over from that pattern:
 *   - Escape closes
 *   - the scrim closes
 *   - body scroll locks while open
 *   - focus moves into the panel on open and returns to the trigger on close
 *   - 200ms, opacity + a barely-there scale/translate. No bounce, no slide.
 */

export interface ScreenshotLightboxProps {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  /** Shown as the dialog's accessible name. */
  label: string;
  width: number;
  height: number;
}

export default function ScreenshotLightbox({
  open,
  onClose,
  src,
  alt,
  label,
  width,
  height,
}: ScreenshotLightboxProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = "screenshot-lightbox-title";

  // Escape closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Body scroll lock, same idiom as the mobile menu
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Focus in on open, back to the trigger on close
  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    return () => trigger?.focus();
  }, [open]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={`fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8 transition-opacity duration-200 ${
        open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}
    >
      {/* scrim */}
      <div
        data-motion
        className="absolute inset-0 bg-[#030711]/85 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        data-motion
        className={`relative w-full max-w-6xl outline-none transition-all duration-200 ease-out ${
          open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.97] translate-y-1"
        }`}
      >
        <div className="flex items-center justify-between gap-4 mb-3 px-1">
          <h2
            id={titleId}
            className="text-sm sm:text-base font-semibold text-white"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {label}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close screenshot"
            className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 bg-white/[0.06] text-slate-300 hover:text-white hover:bg-white/[0.12] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="rounded-xl overflow-hidden border border-white/10 bg-[#050b16] shadow-[0_24px_70px_-20px_rgba(0,0,0,0.9)]">
          {/*
           * Only once something has actually been opened. next/image warns on
           * an empty src, and mounting the capture up front would pull a
           * full-width image on every page load for a dialog nobody opened.
           */}
          {src ? (
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes="(min-width: 1152px) 1152px, 92vw"
              className="w-full h-auto"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
