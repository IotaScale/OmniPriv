import Link from "next/link";
import { ArrowRight, Bot, Cpu, Sparkles, Users } from "lucide-react";

import { solutions, solutionHref } from "@/app/platform/data";

/*
 * Homepage: the nine capability modules, each linking to its redesigned page,
 * with the identity-led solution pages underneath. Titles, taglines and
 * capability counts come straight from app/platform/data.ts, so this section
 * stays in step with the platform pages.
 */

const BY_IDENTITY = [
    { href: "/solutions/human-identity-security", label: "Human identities", icon: Users },
    { href: "/solutions/machine-identity-security", label: "Machine identities", icon: Cpu },
    { href: "/solutions/ai-agent-security", label: "AI agents", icon: Bot },
    { href: "/solutions/ai-pam-solutions", label: "AI-ready PAM", icon: Sparkles },
];

export default function ModuleGrid() {
    return (
        <section id="modules" className="aip relative">
            <div className="container-xl op-sec">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="max-w-3xl" data-aos="fade-up">
                        <h2 className="op-h2">
                            Nine capabilities. <span className="text-slate-500 dark:text-slate-400">One platform.</span>
                        </h2>
                        <p className="mt-4 aip-lede text-[1.0625rem]">
                            Every module runs on the same policy engine, credential store and audit trail. Start with the one your auditors ask about first; the rest are already there.
                        </p>
                    </div>
                    <Link href="/platform" className="op-link inline-flex shrink-0 items-center gap-1.5 text-[0.9375rem] font-semibold group" data-aos="fade-up">
                        Explore the platform
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                </div>

                <ul className="op-body grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {solutions.map((s, k) => {
                        const Icon = s.icon;
                        const lead = k === 0;
                        return (
                            <li key={s.slug} className="min-w-0" data-aos="fade-up" data-aos-delay={String((k % 3) * 60)}>
                                <Link
                                    href={solutionHref(s)}
                                    className={`aip-card group relative flex h-full flex-col overflow-hidden rounded-3xl border p-5 sm:p-6 ${lead ? "border-[#00B8DB]/40" : ""}`}
                                >
                                    {lead && <span className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#00B8DB]/[0.12] blur-2xl" aria-hidden="true" />}
                                    <div className="relative flex items-center gap-3">
                                        <span className="icon-wrapper shrink-0">
                                            <Icon className="w-5 h-5" aria-hidden="true" />
                                        </span>
                                        {lead && <span className="rounded-full bg-[#00B8DB]/[0.12] px-2.5 py-0.5 text-[0.6875rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]">AI-first</span>}
                                        <span className="ml-auto text-[0.75rem] font-semibold tabular-nums text-slate-400">{String(k + 1).padStart(2, "0")}</span>
                                        <ArrowRight className="w-4 h-4 shrink-0 op-link sm:hidden" aria-hidden="true" />
                                    </div>
                                    <h3 className="op-card-title relative mt-4 sm:mt-5">{s.title}</h3>
                                    <p className="op-card-text relative mt-2 flex-1">{s.tagline}</p>
                                    <span className="relative mt-5 hidden sm:flex items-center justify-between gap-3 border-t border-slate-900/[0.06] dark:border-white/[0.06] pt-4 text-[0.8125rem]">
                                        <span className="text-slate-500 dark:text-slate-400">{s.features.length} capabilities</span>
                                        <span className="op-link inline-flex items-center gap-1 font-semibold">
                                            Open
                                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                                        </span>
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3" data-aos="fade-up">
                    <span className="text-[0.875rem] font-semibold text-[#0a1628] dark:text-white">Or start from the identity:</span>
                    <ul className="flex flex-wrap gap-2">
                        {BY_IDENTITY.map((b) => (
                            <li key={b.href}>
                                <Link href={b.href} className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-900/[0.1] dark:border-white/[0.1] bg-white dark:bg-[#15171a] px-4 text-[0.875rem] font-semibold text-slate-700 dark:text-slate-200 transition-colors hover:border-[#00B8DB]/50 hover:text-[#00667A] dark:hover:text-[#7FE3F2] active:scale-[0.97]">
                                    <b.icon className="w-4 h-4" aria-hidden="true" />
                                    {b.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
