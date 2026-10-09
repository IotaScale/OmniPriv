import type { Metadata } from "next";
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
} from "lucide-react";

import FaqSection from "@/components/sections/FaqSection";
import IconCardGrid from "@/components/sections/IconCardGrid";
import Prose from "@/components/sections/Prose";
import Section from "@/components/sections/Section";
import SectionHeading from "@/components/sections/SectionHeading";
import SplitHero from "@/components/sections/SplitHero";
import DemoForm from "@/components/demo/DemoForm";
import type { FaqEntry } from "@/components/sections/FaqSection";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * /demo
 *
 * Previously a single "use client" page: a hand-rolled centred hero plus one
 * grid holding the form. That blocked the shared section library, since
 * SplitHero, Section and FaqSection are server components.
 *
 * The form now lives in components/demo/DemoForm.tsx and this file is a
 * server component, so the page composes the same primitives as the rest of
 * the site. Metadata moved back here from app/demo/layout.tsx, which existed
 * only because a client page cannot export it.
 *
 * Removed: the commented-out "Trusted By Security Leaders" block and its
 * `trustStats` array, which claimed "100+ Enterprise Customers" and a
 * "99.99% Uptime SLA". Neither figure traced to anything the site publishes.
 *
 * No CtaBand: the form is the call to action, so a closing band pointing at
 * /demo would be circular. This page therefore has one content dark band
 * rather than the usual two, see components/sections/README.md.
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
            "On-premise, on infrastructure you control. Data is encrypted at rest and in transit, with hardware-backed protection for stored keys. The installation key is generated at installation and stored externally and independently of the platform, so a compromise of our storage is not a compromise of yours.",
    },
    {
        question: "What happens to the information I submit?",
        answer:
            "It is sent to our sales team so they can prepare for the call, and handled under our privacy policy. The form asks for your name, work contact details, company, job title, company size and primary use case; the additional context field is optional. You can ask us to delete it at any point.",
    },
];

export default function DemoPage() {
    return (
        <>
            <SplitHero
                badge={hero.badge}
                titleLead={hero.titleLead}
                titleAccent={hero.titleAccent}
                primary={hero.primary}
                secondary={hero.secondary}
                media={hero.image}
            >
                <Prose segments={hero.intro} className="text-lg mb-5" />
                <Prose segments={hero.body} className="text-lg mb-8" />
            </SplitHero>

            {/* ─── WHAT TO EXPECT ─────────────────────────────────── */}
            <Section tone="muted" border="bottom">
                <SectionHeading
                    badge="The Process"
                    title={expectationsSection.title}
                    className="mb-2"
                >
                    <Prose segments={expectationsSection.lead} />
                </SectionHeading>

                <IconCardGrid items={whatToExpect} columns={4} className="mt-12" />
            </Section>

            {/* ─── THE FORM ───────────────────────────────────────── */}
            <Section border="bottom">
                <div id="demo-form" className="grid lg:grid-cols-5 gap-14 items-start">
                    <div className="lg:col-span-3 scroll-mt-28">
                        <DemoForm />
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                        <div className="p-6 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.07] bg-white dark:bg-[#15171A]">
                            <h3 className="text-sm font-bold text-slate-950 dark:text-white mb-4">
                                Prefer to talk directly?
                            </h3>
                            <a
                                href="mailto:info@omnipriv.com"
                                className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 hover:text-[#00B8DB] transition-colors"
                            >
                                <Mail className="w-4 h-4 text-[#00667A] dark:text-[#00B8DB]" aria-hidden="true" />
                                info@omnipriv.com
                            </a>
                            <p className="mt-4 text-xs text-slate-500 leading-relaxed">
                                Email us with the systems that matter and we will scope the session
                                around them.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.07] bg-white dark:bg-[#15171A]">
                            <h3 className="text-sm font-bold text-slate-950 dark:text-white mb-4">
                                What we will not do
                            </h3>
                            <ul className="space-y-2.5 text-xs text-slate-500 leading-relaxed">
                                <li>No discovering a &ldquo;special price&rdquo; that expires today.</li>
                                <li>No passing your details to a partner network.</li>
                                <li>No renewal pressure on a free proof-of-concept.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Section>

            {/* ─── WHAT WE'LL WALK THROUGH (dark band) ────────────── */}
            <Section tone="dark" border="bottom">
                <SectionHeading
                    badge="Session Agenda"
                    title={walkthroughSection.title}
                    className="mb-2"
                >
                    <Prose segments={walkthroughSection.lead} />
                </SectionHeading>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mt-14">
                    {walkthroughPillars.map((pillar) => (
                        <div key={pillar.title}>
                            <SectionHeading
                                as="h3"
                                size="sm"
                                title={pillar.title}
                                titleClassName="max-w-3xl"
                            >
                                <Prose segments={[pillar.text]} />
                            </SectionHeading>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ─── FAQ ────────────────────────────────────────────── */}
            <FaqSection
                title="Frequently Asked Questions"
                subtitle="Common questions about the demo process, evaluation and data handling."
                items={faqs}
            />
        </>
    );
}
