import type { Metadata } from "next";
import { ArrowRight, CalendarCheck, CalendarPlus, FlaskConical, MapPin, Navigation, Network, Server, Target, Timer } from "lucide-react";

import EventForm from "@/components/events/EventForm";
import EventPoster from "@/components/events/EventPoster";
import { EVENT } from "@/components/events/event";
import {
    ClosingBand,
    FactsStrip,
    FaqSplit,
    Heading,
    PageHero,
    Paras,
    mutedBand,
    sectionLine,
} from "@/components/pageui/blocks";
import Countdown from "@/components/events/Countdown";
import DayPicker from "@/components/events/DayPicker";
import DemoStations, { type Station } from "@/components/events/DemoStations";
import Prose from "@/components/sections/Prose";
import { cn } from "@/lib/utils";
import type { FaqEntry } from "@/components/sections/FaqAccordion";
import type { RichText } from "@/lib/rich-text";

/*
 * /events/black-hat-mea-2026. The destination for the site-wide popup and the
 * footer button. Composed from the shared page kit so it reads as the same
 * site; no booth numbers, customer counts or claims we cannot stand behind.
 */

export const metadata: Metadata = {
    title: `Meet OmniPriv at ${EVENT.name}, Riyadh`,
    description: `OmniPriv is exhibiting at ${EVENT.name} in ${EVENT.location}, ${EVENT.dates}. Book a meeting with the team and see how AI-powered PAM secures privileged users, machines and AI agents.`,
    alternates: { canonical: EVENT.href },
    openGraph: {
        type: "website",
        url: EVENT.href,
        title: `Meet OmniPriv at ${EVENT.name}, Riyadh`,
        description: `Book a meeting with OmniPriv at ${EVENT.name}, ${EVENT.dates}, ${EVENT.location}.`,
    },
};

const FACTS = [
    { value: "01–03", label: "December 2026" },
    { value: "Riyadh", label: "Saudi Arabia" },
    { value: 9, label: "capability modules in the platform" },
    { value: "1:1", label: "meetings with our PAM team" },
];

const heroIntro: RichText = [
    `OmniPriv is exhibiting at ${EVENT.name} in ${EVENT.city} from ${EVENT.dates}. Three days of conversations about how AI-powered privileged access secures the users, machines and AI agents that hold the keys to your estate.`,
];

const heroBody: RichText = [
    "If you are at the show, book a slot with the team. If you are not travelling, the same walkthrough runs over a call.",
];

const showingLead: RichText = [
    "The demonstration follows the platform's nine modules rather than a slide deck. These are the four conversations most teams want to have at the show, and each links to the capability behind it.",
];

const showing: Station[] = [
    {
        key: "ai",
        eyebrow: "AI agents",
        title: "Agent identity and tool scope",
        text: "How autonomous agents get their own identity, a scoped allowlist of tools and an approval path, instead of borrowing a human credential.",
        href: "/platform/secure-ai-agents",
    },
    {
        key: "secrets",
        eyebrow: "Secrets",
        title: "Vaulting and rotation",
        text: "Where secrets sit today in configuration files, databases, registries and services, and what moving them into a vault with automated rotation involves.",
        href: "/platform/password-credential-management",
    },
    {
        key: "access",
        eyebrow: "Access",
        title: "Just-in-time privilege",
        text: "How access is requested, approved under the 4-eyes principle and expires on its own, so standing privilege stops accumulating.",
        href: "/platform/workflow-access-control",
    },
    {
        key: "evidence",
        eyebrow: "Evidence",
        title: "An audit you can hand over",
        text: "Session recordings, hash-chained audit records and entitlement reports mapped to the frameworks that apply to you.",
        href: "/privileged-access-audit-compliance",
    },
];

const meetingIntro: RichText = [
    "A short meeting is usually enough to work out whether the platform fits. You describe the estate; we show the controls that apply to it, and say plainly where they do not.",
];

const meetingPoints = [
    {
        icon: Network,
        title: "Your estate",
        text: "Which systems, clouds and agent workloads hold privileged access in your estate today.",
    },
    {
        icon: Target,
        title: "Your priority",
        text: "The control that matters most to you: vaulting, JIT access, approval workflow or audit evidence.",
    },
    {
        icon: Server,
        title: "How it deploys",
        text: "How the platform deploys in your environment, on-premise or as a hardware-agnostic appliance.",
    },
    {
        icon: FlaskConical,
        title: "After the show",
        text: "What a proof-of-concept would look like if you want to test it after the show.",
    },
];

const STEPS = [
    "Send the form with the day you are at the show.",
    "We reply within one business day to confirm a time.",
    "We send the meeting point before you arrive.",
];

const faqs: FaqEntry[] = [
    {
        question: `Do I need a ticket to ${EVENT.name} to meet you?`,
        answer:
            "Yes. The meetings take place at the show, so you need a ticket for the day you book. If you would rather not travel, the same walkthrough runs over a call and you can book that through the demo page.",
    },
    {
        question: "Where exactly will we meet?",
        answer:
            "We confirm the meeting point with your slot rather than asking you to find a stand on the day. The show floor is large, so the confirmation includes a precise meeting point.",
    },
    {
        question: "What should I bring?",
        answer:
            "Nothing formal. It helps to know roughly how many privileged accounts you manage, which directory service you use, and whether your estate is on-premise, cloud or both.",
    },
    {
        question: "Can we see the platform without travelling?",
        answer:
            "Yes. The same walkthrough runs over a call, including an optional 30-day proof-of-concept in your own environment with support from our engineering team.",
    },
    {
        question: "Is the meeting free?",
        answer:
            "Yes. There is no charge and no obligation, and you do not need to sit through a slide deck.",
    },
];

const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: EVENT.name,
    startDate: EVENT.startISO,
    endDate: EVENT.endISO,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    description: `OmniPriv is exhibiting at ${EVENT.name} in ${EVENT.location}, ${EVENT.dates}.`,
    location: {
        "@type": "Place",
        name: EVENT.location,
        address: {
            "@type": "PostalAddress",
            addressLocality: EVENT.city,
            addressCountry: "SA",
        },
    },
    image: ["https://omnipriv.com/og-image.png"],
    organizer: { "@type": "Organization", name: "OmniPriv", url: "https://omnipriv.com" },
};

export default function BlackHatMeaPage() {
    return (
        <div className="aip">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
            />

            <PageHero
                titleLead="The future of access,"
                titleAccent="live in Riyadh."
                tagline={`OmniPriv at ${EVENT.name}`}
                paragraphs={[heroIntro, heroBody]}
                primary={{ href: "#meeting", label: "Book a meeting" }}
                secondary={{ href: "/platform", label: "See what we will show" }}
                visual={
                    <EventPoster />
                }
            >
                <FactsStrip facts={FACTS} />
            </PageHero>

            {/* ─── WHAT WE'RE SHOWING ────────────────────────────── */}
            <section id="bh-showing" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <Heading title="What we're showing">
                        <Prose segments={showingLead} className="text-[1.0625rem]" />
                    </Heading>
                    <div className="op-body">
                        <DemoStations stations={showing} />
                    </div>
                </div>
            </section>

            {/* ─── THE MEETING + WHERE TO FIND US ────────────────── */}
            <section id="bh-meeting-agenda" className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
                        <div className="min-w-0" data-aos="fade-up">
                            <Heading title="A conversation, not a slide deck" />
                            <Paras items={[meetingIntro]} className="mt-6" />
                            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                                <a href="#meeting" className="hp-btn-primary group">
                                    Book a meeting
                                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                                </a>
                                <a
                                    href="/events/black-hat-mea-2026.ics"
                                    download
                                    className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold op-link hover:underline"
                                >
                                    <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                                    Add the dates to your calendar
                                </a>
                            </div>
                        </div>

                        {/* What the meeting covers, as a run of four topics */}
                        <div className="aip-card min-w-0 rounded-3xl border p-6 sm:p-8" data-aos="fade-up" data-aos-delay="80">
                            <div className="flex items-center justify-between gap-3">
                                <h3 className="op-card-title">What we cover together</h3>
                                <span className="shrink-0 whitespace-nowrap rounded-full bg-[#00B8DB]/10 px-2.5 py-1 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-[#00667A] dark:text-[#7FE3F2]">
                                    1:1 meeting
                                </span>
                            </div>
                            <ol className="relative mt-6 space-y-5">
                                <span
                                    className="absolute bottom-5 left-[1.1875rem] top-5 w-px bg-gradient-to-b from-[#00B8DB]/60 via-[#00B8DB]/25 to-transparent"
                                    aria-hidden="true"
                                />
                                {meetingPoints.map((m) => (
                                    <li key={m.title} className="relative grid grid-cols-[auto_minmax(0,1fr)] gap-4">
                                        <span className="relative z-[1] inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#00B8DB]/25 bg-white text-[#00667A] dark:bg-[#111214] dark:text-[#7FE3F2]">
                                            <m.icon className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
                                        </span>
                                        <span className="min-w-0 pt-0.5">
                                            <span className="block text-[1rem] font-semibold text-[#0A1628] dark:text-white">{m.title}</span>
                                            <span className="mt-1 block text-[0.9375rem] leading-[1.6] text-slate-600 dark:text-slate-400">
                                                {m.text}
                                            </span>
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    {/* Where to find us: one strip of facts under the meeting */}
                    <dl className="mt-12 grid overflow-hidden rounded-3xl border border-slate-900/[0.08] bg-slate-900/[0.08] dark:border-white/[0.08] dark:bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4 gap-px" data-aos="fade-up">
                        {[
                            { icon: CalendarCheck, k: "Dates", v: <>{EVENT.dates}</> },
                            { icon: MapPin, k: "Location", v: <>{EVENT.location}</> },
                            { icon: Timer, k: "Doors open in", v: <Countdown variant="compact" /> },
                            { icon: Navigation, k: "Meeting point", v: <>Sent with your confirmation</> },
                        ].map((f) => (
                            <div key={f.k} className="flex min-w-0 items-start gap-3.5 bg-white p-5 dark:bg-[#15171a] sm:p-6">
                                <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-[#00667A] dark:text-[#00B8DB]" aria-hidden="true" />
                                <div className="min-w-0">
                                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-slate-500">{f.k}</dt>
                                    <dd className="mt-1 text-[0.9375rem] font-semibold text-[#0a1628] dark:text-white">{f.v}</dd>
                                </div>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* ─── PICK YOUR DAY ─────────────────────────────────── */}
            <section id="bh-days" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <Heading title="Three days. Pick yours.">
                        <p className="text-[1.0625rem]">
                            We take meetings on all three days of the show. Choose one and it is filled in on the
                            form below.
                        </p>
                    </Heading>
                    <div className="op-body">
                        <DayPicker />
                    </div>
                </div>
            </section>

            {/* ─── BOOK A MEETING ────────────────────────────────── */}
            <div className="dark">
            <section id="meeting" className="relative overflow-hidden scroll-mt-24 op-band-navy">
                <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                <div className="container-xl relative op-sec">
                    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
                        <div className="min-w-0 lg:sticky lg:top-28" data-aos="fade-up">
                            <span className="badge-cyan">Book a meeting</span>
                            <h2 className="op-h2 mt-4">Meet us in Riyadh.</h2>
                            <p className="mt-4 text-[1.0156rem] leading-[1.7] text-slate-600 dark:text-slate-400">
                                Tell us which day you are at the show and what you want to cover. We will
                                confirm a slot and send the meeting point.
                            </p>

                            <div className="mt-8 rounded-2xl border border-slate-900/[0.08] bg-white p-6 dark:border-white/[0.08] dark:bg-[#15171a]">
                                <h3 className="op-card-title">What happens next</h3>
                                <ol className="mt-4 space-y-3">
                                    {STEPS.map((step, i) => (
                                        <li key={step} className="flex items-start gap-3">
                                            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00B8DB]/[0.12] text-[0.6875rem] font-bold text-[#00667A] dark:text-[#7FE3F2]">
                                                {i + 1}
                                            </span>
                                            <span className="text-[0.9375rem] leading-[1.6] text-slate-700 dark:text-slate-300">
                                                {step}
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            <p className="mt-5 text-[0.875rem] text-slate-500 dark:text-slate-400">
                                Prefer email?{" "}
                                <a
                                    href="mailto:info@omnipriv.com"
                                    className="font-semibold op-link hover:underline"
                                >
                                    info@omnipriv.com
                                </a>
                            </p>
                        </div>

                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <EventForm />
                        </div>
                    </div>
                </div>
            </section>
            </div>

            <FaqSplit id="bh-faq" title="Black Hat MEA, answered" items={faqs} />

            <ClosingBand
                title="Not in Riyadh?"
                body={[
                    "The same walkthrough runs over a call, including an optional 30-day proof-of-concept in your own environment.",
                ]}
                primary={{ href: "/demo", label: "Request a Demo" }}
                secondary={{ href: "/platform", label: "Explore the Platform" }}
            />
        </div>
    );
}
