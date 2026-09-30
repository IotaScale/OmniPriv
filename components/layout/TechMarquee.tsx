"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/* ─── Official brand marks (source: Iconify "logos" icon set) ─── */
const logos = [
    { name: "Linux", src: "/tech/linux.svg" },
    { name: "Windows", src: "/tech/windows.svg" },
    { name: "Kubernetes", src: "/tech/kubernetes.svg" },
    { name: "PostgreSQL", src: "/tech/postgresql.svg" },
    { name: "MongoDB", src: "/tech/mongodb.svg" },
    { name: "Redis", src: "/tech/redis.svg" },
    { name: "MySQL", src: "/tech/mysql.svg" },
    { name: "Oracle", src: "/tech/oracle.svg" },
    { name: "AWS", src: "/tech/aws.svg" },
    { name: "Azure", src: "/tech/azure.svg" },
    { name: "GCP", src: "/tech/gcp.svg" },
    { name: "VMware", src: "/tech/vmware.svg" },
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
            <section className="py-16 border-b border-slate-900/[0.05] dark:border-white/[0.04] overflow-hidden">
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
                                className="flex-shrink-0 flex items-center gap-3 px-8 py-3 mx-2 rounded-xl border border-slate-900/[0.08] dark:border-white/[0.06] bg-slate-100/40 dark:bg-[#0A1628]/40 hover:border-[#00B8FF]/30 hover:bg-slate-100/80 dark:hover:bg-[#0A1628]/80 transition-all duration-300 group cursor-default select-none"
                            >
                                <Image
                                    src={logo.src}
                                    alt={logo.name}
                                    width={40}
                                    height={40}
                                    unoptimized
                                    className="w-10 h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <span className="text-slate-600 dark:text-slate-400 group-hover:text-slate-950 dark:group-hover:text-white text-sm font-semibold tracking-wide transition-colors whitespace-nowrap">
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
                                className="flex-shrink-0 flex items-center gap-3 px-8 py-3 mx-2 rounded-xl border border-slate-900/[0.08] dark:border-white/[0.06] bg-slate-100/40 dark:bg-[#0A1628]/40 hover:border-[#00B8FF]/30 hover:bg-slate-100/80 dark:hover:bg-[#0A1628]/80 transition-all duration-300 group cursor-default select-none"
                            >
                                <Image
                                    src={logo.src}
                                    alt={logo.name}
                                    width={40}
                                    height={40}
                                    unoptimized
                                    className="w-10 h-10 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <span className="text-slate-600 dark:text-slate-400 group-hover:text-slate-950 dark:group-hover:text-white text-sm font-semibold tracking-wide transition-colors whitespace-nowrap">
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
