import type { Metadata } from "next";
import Link from "next/link";
import {
    ClipboardCheck,
    FlaskConical,
    KeyRound,
    Layers,
    Mail,
    MonitorPlay,
    PhoneCall,
    Server,
    UserCheck,
    X,
} from "lucide-react";

import Spotlight from "@/components/aipam/Spotlight";
import DemoForm from "@/components/demo/DemoForm";
import ExpectLine from "@/components/demo/ExpectLine";
import Walkthrough from "@/components/demo/Walkthrough";
import { FaqSplit, Heading, Paras, mutedBand, sectionLine } from "@/components/pageui/blocks";
import Prose from "@/components/sections/Prose";
import { cn } from "@/lib/utils";
import type { FaqEntry } from "@/components/sections/FaqAccordion";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * /demo. Server component; the form lives in components/demo/DemoForm.tsx
 * (EmailJS payload unchanged). The form now sits in the hero beside the copy,
 * because it is the page's call to action. Built from the shared page kit
 * (components/pageui). No invented customer counts or SLAs.
 */

export const metadata: Metadata = {
    title: { absolute: "Request a Demo | See OmniPriv PAM in Your Environment" },
    description:
        "Book a 30-minute introductory call, a tailored walkthrough, or an architecture review, including an optional 30-day proof-of-concept in your own environment.",
};

const hero = {
    badge: "Request a Demo",
    titleLead: "See OmniPriv in your",
    titleAccent: "own environment.",
    intro: [
        "A walkthrough is only useful if it looks like your estate. Tell us which systems matter and we will focus the session on those rather than giving a generic tour.",
    ] as RichText,
    body: [
        "No credit card, no commitment, and no obligation to sit through a slide deck, you can start with the architecture review instead if that is the more useful conversation.",
    ] as RichText,
    image: {
        src: "/product/dashboard.png",
        alt: "OmniPriv security dashboard, the first screen shown in a demo",
        fit: "contain" as const,
    },
    primary: { href: "#demo-form", label: "Request Your Demo" },
    secondary: { href: "/platform", label: "Explore the Platform First" },
};

const expectationsSection = {
    title: "What to expect",
    lead: [
        "Four steps, and you can stop after any of them. Nothing is charged at any stage, including the proof-of-concept.",
    ] as RichText,
};

const whatToExpect: IconCard[] = [
    {
        icon: PhoneCall,
        eyebrow: "Step 01",
        title: "Introductory call",
        text: "A 30-minute discovery conversation with a PAM specialist to understand your environment, challenges and goals.",
    },
    {
        icon: MonitorPlay,
        eyebrow: "Step 02",
        title: "Tailored walkthrough",
        text: "A live demonstration configured for your specific use cases, industry and compliance requirements.",
    },
    {
        icon: Layers,
        eyebrow: "Step 03",
        title: "Architecture review",
        text: "Our solution architects review your existing infrastructure and design a deployment plan with no disruption to operations.",
    },
    {
        icon: FlaskConical,
        eyebrow: "Step 04",
        title: "Free proof-of-concept",
        text: "Optionally, run OmniPriv in your own environment at no cost for 30 days, with support from our engineering team.",
    },
];

const walkthroughSection = {
    title: "What we'll walk through",
    lead: [
        "The session follows the platform's own specification: how it deploys, how it handles the secrets you already have, how approval works, and what your audit will look like afterwards.",
    ] as RichText,
};

const walkthroughPillars = [
    {
        icon: Server,
        title: "Your deployment model",
        text: "On-premise on VMware, Red Hat or OpenStack as a hardware-agnostic appliance, with multi-node clustering available for high availability.",
    },
    {
        icon: KeyRound,
        title: "Where your secrets live today",
        text: "We will look at the credentials currently sitting in configuration files, databases, registries, Windows Services, scheduled tasks and IIS App Pools, and show what replacing them with vaulting and automated rotation involves.",
    },
    {
        icon: UserCheck,
        title: "How approval would work for you",
        text: "The 4-eyes principle is the default, a minimum of two independent approvers with the requester excluded. We will map your existing approval chains onto multi-level workflows, including mobile and email approvals.",
    },
    {
        icon: ClipboardCheck,
        title: "What your audit will look like",
        text: "Session recordings, hash-chained audit records and scheduled entitlement reports, against whichever of the six mapped regulatory frameworks applies to you.",
    },
];

const faqs: FaqEntry[] = [
    {
        question: "What actually happens on the demo call?",
        answer:
            "A 30-minute introductory call first, to understand your environment and which of the nine capability modules matter to you. The walkthrough itself is configured for your use cases rather than being a fixed script, and you can switch to an architecture review if a demonstration is not the useful conversation yet.",
    },
    {
        question: "Do I need to prepare anything, or provide access?",
        answer:
            "Nothing for the introductory call. For an architecture review it helps to know your hypervisor, directory service and roughly how many privileged accounts you are dealing with. You never need to give us access to a production system to see the platform.",
    },
    {
        question: "Can we run it in our own environment first?",
        answer:
            "Yes, that is step four, and it is free. OmniPriv can run in your environment for 30 days at no cost with support from our engineering team. The trial is scoped against your environment, and a rollout plan is produced during the architecture review.",
    },
    {
        question: "Where does the platform run, and who holds the keys?",
        answer:
            "On-premise, on infrastructure you control. Data is encrypted at rest and in transit, with a layered key hierarchy protecting stored keys. The installation key is generated at installation and stored externally and independently of the platform, so a compromise of our storage is not a compromise of yours.",
    },
    {
        question: "What happens to the information I submit?",
        answer:
            "It is sent to our sales team so they can prepare for the call, and handled under our privacy policy. The form asks for your name, work contact details, company, job title, company size and primary use case; the additional context field is optional. You can ask us to delete it at any point.",
    },
];

const FACTS = [
    { v: "30 min", l: "introductory call to start" },
    { v: String(whatToExpect.length), l: "steps, and you can stop after any of them" },
    { v: "30 days", l: "optional proof-of-concept in your environment" },
    { v: "0", l: "charged at any stage, including the PoC" },
];

const PROMISES = ["No discovering a \u201cspecial price\u201d that expires today.", "No passing your details to a partner network.", "No renewal pressure on a free proof-of-concept."];

export default function DemoPage() {
    return (
        <div className="aip">
            <Spotlight />

            {/* ─── HERO: copy + the form ─────────────────────────── */}
            <section id="dm-hero" className={cn("relative overflow-hidden", sectionLine)}>
                <div className="aip-hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
                <div className="container-xl relative pt-14 pb-14 lg:pt-20 lg:pb-20">
                    <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-12 lg:gap-14 items-start">
                        <div className="min-w-0 lg:sticky lg:top-28">
                            <h1 className="op-h1 aip-h1" data-aos="fade-up">
                                {hero.titleLead} <span className="text-gradient">{hero.titleAccent}</span>
                            </h1>
                            <div className="mt-6 max-w-[38rem]" data-aos="fade-up" data-aos-delay="120">
                                <Paras items={[hero.intro, hero.body]} />
                            </div>
                            <dl className="mt-9 grid grid-cols-2 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.02]" data-aos="fade-up" data-aos-delay="160">
                                {FACTS.map((f, k) => (
                                    <div key={f.l} className={cn("px-5 py-4", k % 2 === 1 && "border-l border-slate-900/[0.08] dark:border-white/[0.08]", k > 1 && "border-t border-slate-900/[0.08] dark:border-white/[0.08]")}>
                                        <dt className="sr-only">{f.l}</dt>
                                        <dd>
                                            <span className="block text-[1.625rem] font-bold leading-none tracking-[-0.03em] text-[#0a1628] dark:text-white" style={{ fontFamily: "var(--font-syne)" }}>
                                                {f.v}
                                            </span>
                                            <span className="mt-1.5 block text-[0.8125rem] leading-snug text-slate-600 dark:text-slate-400">{f.l}</span>
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.875rem]" data-aos="fade-up" data-aos-delay="200">
                                <a href="mailto:info@omnipriv.com" className="inline-flex items-center gap-1.5 font-semibold op-link hover:underline">
                                    <Mail className="w-4 h-4" aria-hidden="true" /> info@omnipriv.com
                                </a>
                                <Link href={hero.secondary.href} className="font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                                    {hero.secondary.label}
                                </Link>
                            </div>
                        </div>
                        <div id="demo-form" className="min-w-0 scroll-mt-28" data-aos="fade-up" data-aos-delay="120">
                            <DemoForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── WHAT TO EXPECT ─────────────────────────────── */}
            <section id="dm-expect" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <Heading title={expectationsSection.title}>
                        <Prose segments={expectationsSection.lead} className="text-[1.0625rem]" />
                    </Heading>
                    <ol className="op-body relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <ExpectLine />
                        {whatToExpect.map((s, i) => (
                            <li key={s.title} className="relative min-w-0" data-aos="fade-up" data-aos-delay={String(i * 80)}>
                                <div className="aip-card h-full rounded-3xl border p-6">
                                    <span className="relative z-10 inline-flex w-11 h-11 items-center justify-center rounded-2xl bg-[#00B8DB] text-[#03121c] shadow-[0_0_0_6px_rgba(0,184,219,0.12)]">
                                        <s.icon className="w-5 h-5" aria-hidden="true" />
                                    </span>
                                    <h3 className="op-card-title mt-5">{s.title}</h3>
                                    <p className="op-card-text mt-2">{s.text}</p>
                                    {i < whatToExpect.length - 1 && (
                                        <span className="mt-4 inline-flex rounded-full bg-slate-900/[0.05] dark:bg-white/[0.06] px-2.5 py-1 text-[0.6875rem] font-semibold text-slate-600 dark:text-slate-300">Free, stop any time</span>
                                    )}
                                    {i === whatToExpect.length - 1 && (
                                        <span className="mt-4 inline-flex rounded-full bg-[#00B8DB]/10 px-2.5 py-1 text-[0.6875rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]">Optional</span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* ─── WHAT WE'LL WALK THROUGH (dark band) ────────── */}
            <div className="dark">
                <section id="dm-agenda" className="relative overflow-hidden op-band-navy">
                    <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                    <div className="container-xl op-sec relative">
                        <Heading title={walkthroughSection.title}>
                            <Prose segments={walkthroughSection.lead} className="text-[1.0625rem]" />
                        </Heading>
                        <div className="op-body" data-aos="fade-up">
                            <Walkthrough topics={walkthroughPillars.map((p) => ({ title: p.title, text: p.text }))} />
                        </div>
                    </div>
                </section>
            </div>

            {/* ─── TALK DIRECTLY + WHAT WE WON'T DO ───────────── */}
            <section className={cn(mutedBand, sectionLine)}>
                <div className="container-xl py-12 lg:py-16">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="aip-card rounded-3xl border p-6 lg:p-8" data-aos="fade-up">
                            <h2 className="op-h3">Prefer to talk directly?</h2>
                            <a href="mailto:info@omnipriv.com" className="mt-4 inline-flex items-center gap-2 text-[1rem] font-semibold op-link hover:underline">
                                <Mail className="w-4 h-4" aria-hidden="true" /> info@omnipriv.com
                            </a>
                            <p className="mt-3 text-[0.9375rem] text-slate-600 dark:text-slate-400">Email us with the systems that matter and we will scope the session around them.</p>
                        </div>
                        <div className="aip-card rounded-3xl border p-6 lg:p-8" data-aos="fade-up" data-aos-delay="80">
                            <h2 className="op-h3">What we will not do</h2>
                            <ul className="mt-4 space-y-2.5">
                                {PROMISES.map((p) => (
                                    <li key={p} className="flex items-start gap-2.5 text-[0.9375rem] text-slate-700 dark:text-slate-300">
                                        <X className="w-4 h-4 mt-0.5 shrink-0 text-rose-500" aria-hidden="true" />
                                        {p}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <FaqSplit id="dm-faq" title="Frequently Asked Questions" items={faqs} />
        </div>
    );
}
