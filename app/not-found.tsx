import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, BrainCircuit, FileText, Layers, ShieldCheck, Users } from "lucide-react";

import { solutions, solutionHref } from "@/app/platform/data";
import NotFoundHint from "@/components/layout/NotFoundHint";

/*
 * Site-wide 404. Rendered inside the normal layout (header and footer), so a
 * mistyped or retired URL is never a dead end: the visitor gets the main
 * destinations and, where the address resembles a real page, a suggestion.
 */

export const metadata: Metadata = {
    title: { absolute: "Page not found | OmniPriv" },
    robots: { index: false, follow: true },
};

const DESTINATIONS = [
    { href: "/platform", label: "Platform", text: "Nine capability modules on one policy engine", icon: Layers },
    { href: "/ai-pam", label: "AI-PAM Engine", text: "ML threat detection and AI agent governance", icon: BrainCircuit },
    { href: "/solutions/ai-agent-security", label: "Solutions", text: "Human, machine and AI identity security", icon: Users },
    { href: "/security", label: "Security Center", text: "How OmniPriv secures itself", icon: ShieldCheck },
    { href: "/blog", label: "Blog", text: "PAM research and best practice", icon: BookOpen },
    { href: "/docs", label: "Documentation", text: "Guides and references", icon: FileText },
];

/* Every real top-level destination, for the "did you mean" hint. */
const KNOWN = [
    "/", "/platform", "/ai-pam", "/features", "/integrations", "/enterprise", "/security", "/about", "/blog", "/docs",
    "/case-studies", "/demo", "/partners", "/privacy-policy", "/terms", "/platform/identity-security", "/platform/consolidation",
    "/solutions/ai-agent-security", "/solutions/ai-pam-solutions", "/solutions/human-identity-security", "/solutions/machine-identity-security",
    ...solutions.map((s) => solutionHref(s)),
];

export default function NotFound() {
    return (
        <div className="aip">
            <section className="relative overflow-hidden">
                <div className="aip-hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
                <div className="container-xl relative pt-16 pb-16 lg:pt-24 lg:pb-24">
                    <div className="max-w-3xl">
                        <p className="font-mono text-[0.8125rem] font-semibold tracking-[0.08em] text-[#00667A] dark:text-[#7FE3F2]">Error 404</p>
                        <h1 className="op-h1 aip-h1 mt-4">This page is not here.</h1>
                        <p className="mt-6 max-w-[38rem] text-[1.0625rem] leading-[1.7] text-slate-600 dark:text-slate-400">
                            The address may have been mistyped, or the page has moved. Everything on the site is still reachable from the places below.
                        </p>
                        <NotFoundHint known={KNOWN} />
                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <Link href="/" className="hp-btn-primary group">
                                Back to the homepage
                                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                            </Link>
                            <Link href="/demo" className="hp-btn-secondary">
                                Request a Demo
                            </Link>
                        </div>
                    </div>

                    <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {DESTINATIONS.map((d) => (
                            <li key={d.href} className="min-w-0">
                                <Link href={d.href} className="aip-card group flex h-full items-start gap-4 rounded-2xl border p-5">
                                    <span className="icon-wrapper shrink-0">
                                        <d.icon className="w-5 h-5" aria-hidden="true" />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="op-card-title block text-[0.9844rem]">{d.label}</span>
                                        <span className="mt-1 block text-[0.875rem] text-slate-600 dark:text-slate-400">{d.text}</span>
                                    </span>
                                    <ArrowRight className="mt-1 w-4 h-4 shrink-0 op-link transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}
