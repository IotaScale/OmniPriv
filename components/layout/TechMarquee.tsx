"use client";

import { useEffect, useRef } from "react";

/* ─── SVG logos for the scrolling marquee ───
   Each logo is a simplified, recognizable SVG rendered in OmniPriv's cyan palette.
   These represent the protocols/platforms OmniPriv supports. */

const logos = [
    {
        name: "Linux",
        svg: (
            <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                <path d="M20 4C18.5 4 17.2 5.8 16.5 8.5C16 10.5 15.8 13 16 15.5C14 16.5 12.5 18 11.5 20C10 23 10 26 11 28C12 29.5 13.5 30 15 30C16 30 17 29.5 18 29C19 30 20 30.5 20 30.5C20 30.5 21 30 22 29C23 29.5 24 30 25 30C26.5 30 28 29.5 29 28C30 26 30 23 28.5 20C27.5 18 26 16.5 24 15.5C24.2 13 24 10.5 23.5 8.5C22.8 5.8 21.5 4 20 4Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="17.5" cy="14" r="1.5" fill="currentColor" />
                <circle cx="22.5" cy="14" r="1.5" fill="currentColor" />
                <path d="M17 18C18 19.5 22 19.5 23 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        name: "Windows",
        svg: (
            <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                <path d="M6 11.5L17.5 9.8V19.5H6V11.5Z" fill="currentColor" opacity="0.8" />
                <path d="M19 9.5L34 7V19.5H19V9.5Z" fill="currentColor" opacity="0.8" />
                <path d="M6 21H17.5V30.2L6 28.5V21Z" fill="currentColor" opacity="0.8" />
                <path d="M19 21H34V33L19 30.5V21Z" fill="currentColor" opacity="0.8" />
            </svg>
        ),
    },
    {
        name: "Kubernetes",
        svg: (
            <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                <path d="M20 6L32 13V27L20 34L8 27V13L20 6Z" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="20" cy="20" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M20 16V10M20 24V30M16 18L11 15M24 22L29 25M16 22L11 25M24 18L29 15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                <circle cx="20" cy="20" r="1.5" fill="currentColor" />
            </svg>
        ),
    },
    {
        name: "PostgreSQL",
        svg: (
            <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                <ellipse cx="20" cy="12" rx="11" ry="5" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.2" />
                <path d="M9 12V28C9 30.8 14 33 20 33C26 33 31 30.8 31 28V12" stroke="currentColor" strokeWidth="1.2" fill="none" />
                <path d="M9 19C9 21.8 14 24 20 24C26 24 31 21.8 31 19" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                <path d="M9 25C9 27.8 14 30 20 30C26 30 31 27.8 31 25" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            </svg>
        ),
    },
    {
        name: "MongoDB",
        svg: (
            <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                <path d="M20 5C20 5 14 12 14 22C14 28 16.5 32 20 35C23.5 32 26 28 26 22C26 12 20 5 20 5Z" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.2" />
                <line x1="20" y1="15" x2="20" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        name: "Redis",
        svg: (
            <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                <path d="M20 9L34 16L20 23L6 16L20 9Z" fill="currentColor" opacity="0.2" />
                <path d="M6 16L20 23L34 16" stroke="currentColor" strokeWidth="1.2" fill="none" />
                <path d="M6 22L20 29L34 22" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.6" />
                <path d="M6 28L20 35L34 28" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.3" />
                <path d="M20 9L34 16L20 23L6 16L20 9Z" stroke="currentColor" strokeWidth="1.2" fill="none" />
            </svg>
        ),
    },
    {
        name: "MySQL",
        svg: (
            <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                <circle cx="20" cy="20" r="13" fill="currentColor" opacity="0.08" stroke="currentColor" strokeWidth="1.2" />
                <path d="M13 15C15 12 18 11 20 11C25 11 27 14 27 17C27 20 24 22 22 23L22 26" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <circle cx="22" cy="29" r="1.2" fill="currentColor" />
            </svg>
        ),
    },
    {
        name: "Oracle",
        svg: (
            <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                <rect x="6" y="13" width="28" height="14" rx="7" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.2" />
                <rect x="11" y="17" width="18" height="6" rx="3" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
        ),
    },
    {
        name: "AWS",
        svg: (
            <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                <path d="M9 24C12 26 16 27 20 27C24 27 28 26 31 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M28 25L32 23L30 27" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 11L20 22L26 11" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 16H24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        name: "Azure",
        svg: (
            <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                <path d="M12 30L21 8H17L8 26L12 30Z" fill="currentColor" opacity="0.5" />
                <path d="M21 8L28 26L20 30H33L21 8Z" fill="currentColor" opacity="0.8" />
            </svg>
        ),
    },
    {
        name: "GCP",
        svg: (
            <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                <path d="M25 10H15L8 20L15 30H25L32 20L25 10Z" fill="currentColor" opacity="0.1" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="20" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <path d="M24 14L27 10M16 14L13 10M16 26L13 30M24 26L27 30" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        name: "VMware",
        svg: (
            <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                <path d="M6 16C8 14 10 13 12 15L18 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M14 16L20 26L26 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M23 16L29 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M34 16C32 14 30 13 28 15L26 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
];

/* ─── Scroll Reveal Hook ─── */
function useScrollReveal() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");
                    }
                });
            },
            { threshold: 0.15 }
        );
        const children = el.querySelectorAll(".reveal-item");
        children.forEach((child) => observer.observe(child));
        return () => observer.disconnect();
    }, []);
    return ref;
}

export default function TechMarquee() {
    const ref = useScrollReveal();

    return (
        <div ref={ref}>
            <section className="py-16 border-b border-white/[0.04] overflow-hidden">
                <div className="container-xl mb-8">
                    <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest reveal-item">
                        Supports Every Protocol &amp; Platform
                    </p>
                </div>

                {/* Row 1 — scrolls left */}
                <div className="marquee-wrapper mb-4">
                    <div className="marquee-track">
                        {[...logos, ...logos, ...logos].map((logo, i) => (
                            <div
                                key={`${logo.name}-${i}`}
                                className="flex-shrink-0 flex items-center gap-3 px-8 py-3 mx-2 rounded-xl border border-white/[0.06] bg-[#0A1628]/40 hover:border-[#00B8FF]/30 hover:bg-[#0A1628]/80 transition-all duration-300 group cursor-default select-none"
                            >
                                <div className="text-[#00B8FF]/70 group-hover:text-[#00B8FF] transition-colors">
                                    {logo.svg}
                                </div>
                                <span className="text-slate-400 group-hover:text-white text-sm font-semibold tracking-wide transition-colors whitespace-nowrap">
                                    {logo.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 2 — scrolls right (reverse direction) */}
                <div className="marquee-wrapper">
                    <div className="marquee-track-reverse">
                        {[...logos, ...logos, ...logos].reverse().map((logo, i) => (
                            <div
                                key={`rev-${logo.name}-${i}`}
                                className="flex-shrink-0 flex items-center gap-3 px-8 py-3 mx-2 rounded-xl border border-white/[0.06] bg-[#0A1628]/40 hover:border-[#00B8FF]/30 hover:bg-[#0A1628]/80 transition-all duration-300 group cursor-default select-none"
                            >
                                <div className="text-[#00B8FF]/70 group-hover:text-[#00B8FF] transition-colors">
                                    {logo.svg}
                                </div>
                                <span className="text-slate-400 group-hover:text-white text-sm font-semibold tracking-wide transition-colors whitespace-nowrap">
                                    {logo.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
