"use client";

import { useEffect } from "react";

/*
 * Pointer-following glow on /ai-pam cards (`.aip-card`). One delegated
 * listener sets --mx / --my on the card under the pointer; the glow itself
 * is CSS (globals.css) and only shows on fine pointers.
 */
export default function Spotlight() {
    useEffect(() => {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const onMove = (e: PointerEvent) => {
            const card = (e.target as HTMLElement | null)?.closest<HTMLElement>(".aip-card");
            if (!card) return;
            const r = card.getBoundingClientRect();
            card.style.setProperty("--mx", `${e.clientX - r.left}px`);
            card.style.setProperty("--my", `${e.clientY - r.top}px`);
        };
        document.addEventListener("pointermove", onMove, { passive: true });
        return () => document.removeEventListener("pointermove", onMove);
    }, []);
    return null;
}
