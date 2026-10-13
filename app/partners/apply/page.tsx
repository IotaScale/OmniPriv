import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Boxes, Building2, Check, ClipboardList, Globe, KeyRound, Layers, ShieldCheck, UserCheck } from "lucide-react";

import { Heading, PageHero, mutedBand, sectionLine } from "@/components/pageui/blocks";
import { cn } from "@/lib/utils";

/*
 * /partners/apply: explains the partner application before handing over to
 * the application form at /sign-up (which also creates the partner workspace
 * login). Previously this route was a silent redirect to /sign-up. Partner
 * types and the information asked for mirror that form.
 */

export const metadata: Metadata = {
    title: { absolute: "Apply to the Partner Program | OmniPriv" },
    description:
        "Apply to become an OmniPriv channel partner: resellers, system integrators, MSPs and MSSPs, and technology alliances. See what the application asks for and what happens next.",
};

const TYPES = [
    { title: "Value-Added Reseller (VAR)", text: "Direct enterprise sales & PAM fulfillment", icon: Building2 },
    { title: "System Integrator (SI)", text: "Complex architecture, IAM & security integration", icon: Layers },
    { title: "Managed Service Provider (MSP/MSSP)", text: "Multi-tenant managed PAM operations", icon: Globe },
    { title: "Technology Alliance", text: "Software & technology co-selling partnerships", icon: Boxes },
];

const NEEDS = [
    "Your company's operating and legal name, and website",
    "The industries you serve and a short overview of your security practice",
    "A primary contact: name, work email, phone and role",
    "Confirmation that you are authorized to apply on the company's behalf",
];

const STEPS = [
    { title: "Apply", text: "Choose your partner type, describe your company and create your partner workspace login.", icon: ClipboardList },
    { title: "Review", text: "The OmniPriv channel team reviews the application.", icon: UserCheck },
    { title: "Onboard", text: "Once approved, complete onboarding in the partner workspace.", icon: KeyRound },
    { title: "Get listed", text: "Approved partners can appear in the public partner directory.", icon: ShieldCheck },
];

function StepsCard() {
    return (
        <div className="aip-console overflow-hidden">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">Partner application · 4 steps</span>
            </div>
            <ol className="relative p-4 space-y-2">
                <span className="absolute left-[2.1rem] top-7 bottom-7 w-px bg-white/[0.08]" aria-hidden="true" />
                {STEPS.map((s, k) => (
                    <li key={s.title} className={`relative grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-xl border px-3 py-3 ${k === 0 ? "border-[#00B8DB]/50 bg-[#00B8DB]/[0.08]" : "border-white/[0.08] bg-white/[0.03]"}`}>
                        <span className={`relative inline-flex w-8 h-8 items-center justify-center rounded-lg ${k === 0 ? "bg-[#0d2a33] text-[#7FE3F2]" : "bg-[#111418] text-slate-400"}`}>
                            <s.icon className="w-4 h-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                            <span className="block text-[0.8125rem] font-semibold text-white">
                                {k + 1}. {s.title}
                            </span>
                            <span className="block text-[0.75rem] leading-snug text-slate-400">{s.text}</span>
                        </span>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default function PartnerApplyPage() {
    return (
        <div className="aip">
            <PageHero
                id="apply-hero"
                titleLead="Apply to the OmniPriv"
                titleAccent="Partner Program"
                paragraphs={[["Expand your cybersecurity portfolio with high-margin enterprise PAM, AI governance, and cloud bastion solutions designed for resellers and MSPs."]]}
                primary={{ href: "/sign-up", label: "Start your application" }}
                secondary={{ href: "/sign-in", label: "Already a partner? Sign in" }}
                visual={<StepsCard />}
            />

            <section className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <Heading title="Which partner type fits you?">
                        <p className="text-[1.0625rem]">You choose one of these on the first screen of the application.</p>
                    </Heading>
                    <ul className="op-body grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {TYPES.map((t) => (
                            <li key={t.title} className="aip-card min-w-0 rounded-3xl border p-6">
                                <span className="icon-wrapper">
                                    <t.icon className="w-5 h-5" aria-hidden="true" />
                                </span>
                                <h3 className="op-card-title mt-4">{t.title}</h3>
                                <p className="op-card-text mt-2">{t.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-start">
                        <div className="min-w-0">
                            <Heading title="What the application asks for" />
                            <ul className="mt-7 space-y-3">
                                {NEEDS.map((n) => (
                                    <li key={n} className="flex items-start gap-3 text-[1rem] leading-relaxed text-slate-700 dark:text-slate-300">
                                        <Check className="mt-1 w-4 h-4 shrink-0 text-[#00667A] dark:text-[#00B8DB]" strokeWidth={3} aria-hidden="true" />
                                        {n}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-6 text-[0.9375rem] text-slate-600 dark:text-slate-400">The same form creates your partner workspace login, so you will also choose a password.</p>
                        </div>
                        <div className="min-w-0 rounded-3xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a] p-6 sm:p-8">
                            <h2 className="op-h3">Ready to apply?</h2>
                            <p className="mt-3 text-[1rem] leading-relaxed text-slate-600 dark:text-slate-400">Start the application now, or look at the partners already listed in your region.</p>
                            <div className="mt-6 flex flex-col gap-3">
                                <Link href="/sign-up" className="hp-btn-primary group">
                                    Start your application
                                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                                </Link>
                                <Link href="/partners" className="hp-btn-secondary">
                                    Browse the partner directory
                                </Link>
                            </div>
                            <p className="mt-5 text-[0.875rem] text-slate-500 dark:text-slate-400">
                                Questions first?{" "}
                                <Link href="/demo?intent=partner" className="op-link font-semibold">
                                    Talk to the channel team
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
