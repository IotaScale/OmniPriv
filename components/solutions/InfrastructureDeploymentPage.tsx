import { Building2, Cpu, Globe, Key, Layers, Lock, RefreshCw, Zap } from "lucide-react";

import SectionNav from "@/components/aipam/SectionNav";
import Spotlight from "@/components/aipam/Spotlight";
import DeployHero from "@/components/infra/DeployHero";
import { BrowserCliVisual, ConsoleVisual, EstateVisual, FailoverVisual, HypervisorVisual, TenantVisual } from "@/components/infra/Visuals";
import CheckChips from "@/components/pageui/CheckChips";
import { ClosingBand, FactsStrip, FaqSplit, Heading, KeepReading, PageHero, Paras, mutedBand, sectionLine } from "@/components/pageui/blocks";
import ArrowLink from "@/components/sections/ArrowLink";
import CheckList from "@/components/sections/CheckList";
import Prose from "@/components/sections/Prose";
import { platformSpecs } from "@/app/platform/data";
import { cn } from "@/lib/utils";
import type { FaqEntry } from "@/components/sections/FaqAccordion";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * Bespoke layout for /platform/infrastructure-deployment, the destination
 * of the "Infrastructure & Deployment" entry in the platform dropdown.
 *
 * Routing belongs to app/platform/[slug]/page.tsx; SEO metadata comes from
 * the module entry in app/platform/data.ts.
 *
 * This page is also the natural home for `platformSpecs` from
 * app/platform/data.ts, which the /platform index no longer renders.
 * Every figure quoted comes from that data file. Built from the shared page
 * kit (components/pageui); sample values in illustrations are illustrative.
 */

const hero = {
    badge: "Infrastructure & Deployment",
    titleLead: "Runs on your infrastructure.",
    titleAccent: "Managed from one control plane.",
    intro: [
        "OmniPriv deploys on-premise across VMware, Red Hat and OpenStack as a hardware-agnostic software appliance, on the infrastructure you already run.",
    ] as RichText,
    body: [
        "High availability, tenant isolation, disaster recovery and break-glass access are handled by the platform itself, so the operational questions are answered by the product rather than by a professional services engagement.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/enterprise", label: "Enterprise Deployment" },
    image: {
        src: "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?auto=format&fit=crop&w=1200&q=70",
        alt: "Rack of servers in a data centre server room",
    },
};

const postureSection = {
    title: "Four decisions this makes for you",
    lead: [
        "The deployment model is part of the security argument. These are the choices OmniPriv makes so you do not have to.",
    ] as RichText,
};

const postureCards: IconCard[] = [
    {
        icon: Zap,
        eyebrow: "On-premise",
        title: "Runs where your systems run",
        text: "Deployed on your own infrastructure rather than reached as a service over the internet, so privileged traffic stays inside your estate.",
    },
    {
        icon: Cpu,
        eyebrow: "Software appliance",
        title: "Hardware-agnostic by design",
        text: "Delivered as a software appliance, so it is not tied to a particular vendor's iron or to a specific hypervisor generation.",
    },
    {
        icon: Layers,
        eyebrow: "Unified administration",
        title: "One console, one repository",
        text: "A single administration UI over one central credential repository, rather than a separate console for every function.",
    },
    {
        icon: Globe,
        eyebrow: "Browser and CLI",
        title: "Reachable the way you work",
        text: "Full control from Edge, Chrome, Firefox or Safari, or from the command line for teams that automate everything.",
    },
];

const availabilitySection = {
    icon: RefreshCw,
    title: "High availability, without a second product",
    paragraphs: [
        [
            "Availability is a property of the deployment rather than an add-on. OmniPriv clusters across nodes with health checking and replication built in, so the platform survives losing a node the same way your other critical systems do.",
        ],
    ] as RichText[],
    image: {
        src: "https://images.unsplash.com/photo-1680992046626-418f7e910589?auto=format&fit=crop&w=1200&q=70",
        alt: "Rack of electronic equipment with status lights in a dark room",
    },
    points: [
        "Multi-node clustering with container-based health checks and automatic restart",
        "Heartbeat monitoring between nodes, so a stalled node is noticed rather than waited on",
        "Database replication and load balancing across the cluster",
        "Granular disaster recovery, credentials restored without restoring the entire system",
        "Offline device management, credentials for devices that rarely reach the corporate network stay managed and current",
    ],
};

const isolationSection = {
    title: "Tenants and emergency access",
    lead: [
        "Remote sites, subsidiaries and the worst day of the year each need an answer that does not undermine the rest of the model.",
    ] as RichText,
};

const isolationPillars = [
    {
        icon: RefreshCw,
        title: "Offline device management",
        text: "Credentials for devices that rarely reach the corporate network stay managed and current, rather than drifting out of the vault.",
    },
    {
        icon: Building2,
        title: "Strict multi-tenancy",
        text: "Isolation via org_id on every resource with schema-per-tenant data separation and per-organization RBAC, including dedicated ROOT, DEFAULT and SYSTEM organizations.",
    },
    {
        icon: Key,
        title: "Break-glass, still recorded",
        text: "A built-in procedure to bypass the platform in a genuine emergency, available when you need it, and fully written to the audit trail when you use it.",
    },
    {
        icon: Lock,
        title: "Secondary security password",
        text: "An additional mandatory layer in front of password vault access, so reaching stored credentials takes more than an authenticated session.",
    },
];

const specsSection = {
    title: "Platform specifications",
    lead: [
        "The deployment facts, stated plainly. Nothing here depends on a particular hypervisor.",
    ] as RichText,
};

const closing = {
    title: "Deploy it on hardware you already own",
    body: [
        "OmniPriv runs on-premise as a software appliance, with clustering and disaster recovery built in.",
        "We will walk through the topology that suits your estate, standalone, active-standby or a full HA cluster.",
    ],
    kicker: "Your infrastructure. Your keys. Your topology.",
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/platform", label: "Explore the Platform" },
};

const faqs: FaqEntry[] = [
    {
        question: "Where can OmniPriv be deployed?",
        answer:
            "On-premise across VMware, Red Hat and OpenStack or other OpenSource-based platforms, as well as in private or public cloud. It supports standalone, active-standby and full high-availability cluster topologies, so the same product covers a single site and a distributed one.",
    },
    {
        question: "Does OmniPriv need inbound ports opened to managed systems?",
        answer:
            "No. Privileged connections are brokered through the platform rather than intercepted at the machine, so an inbound port does not have to be opened on the target system.",
    },
    {
        question: "How does high availability actually work?",
        answer:
            "OmniPriv clusters across multiple nodes with container-based health checks and automatic restart, heartbeat monitoring between nodes, database replication and load balancing. A node that stops responding is detected and worked around rather than waited on.",
    },
    {
        question: "What happens if the PAM platform itself is unavailable?",
        answer:
            "There is a built-in break-glass procedure for exactly that emergency. It lets administrators bypass the platform to reach a system, and every use is written to the audit trail, so the exception is available without becoming an invisible bypass.",
    },
    {
        question: "Can we run separate tenants for subsidiaries or customers?",
        answer:
            "Yes. Isolation is enforced via org_id on every resource with schema-per-tenant data separation, and each organization gets its own RBAC. The model includes dedicated ROOT, DEFAULT and SYSTEM organizations, which is what makes it workable for MSPs as well as for enterprises with subsidiaries.",
    },
];

const keepReading = [
    { href: "/platform", label: "Browse all nine capabilities" },
    { href: "/platform/secure-remote-access", label: "How privileged sessions are brokered" },
    { href: "/enterprise", label: "Enterprise deployment" },
];

const NAV = [
    { id: "id-posture", label: "Deployment posture" },
    { id: "id-availability", label: "High availability" },
    { id: "id-isolation", label: "Tenants & emergency access" },
    { id: "id-specs", label: "Specifications" },
    { id: "id-faq", label: "FAQ" },
];

/* Verified figures only: app/platform/data.ts and the FAQ below. */
const FACTS = [
    { value: 3, label: "platform families: VMware, Red Hat and OpenStack" },
    { value: 3, label: "topologies: standalone, active-standby or full HA cluster" },
    { value: 4, label: "supported browsers, plus a full command-line CLI" },
    { value: 0, label: "inbound ports to open on managed target systems" },
];

const POSTURE_VISUAL = [EstateVisual, HypervisorVisual, ConsoleVisual, BrowserCliVisual];

export default function InfrastructureDeploymentPage() {
    return (
        <div className="aip">
            <SectionNav items={NAV} startId="id-hero" />
            <Spotlight />

            <PageHero
                id="id-hero"
                titleLead={hero.titleLead}
                titleAccent={hero.titleAccent}
                paragraphs={[hero.intro, hero.body]}
                primary={hero.primary}
                secondary={hero.secondary}
                visual={<DeployHero />}
            >
                <FactsStrip facts={FACTS} />
            </PageHero>

            {/* ─── DEPLOYMENT POSTURE ─────────────────────────────── */}
            <section id="id-posture" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <Heading title={postureSection.title}>
                        <Prose segments={postureSection.lead} className="text-[1.0625rem]" />
                    </Heading>
                    <div className="op-body grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        {postureCards.map((c, i) => {
                            const V = POSTURE_VISUAL[i];
                            return (
                                <article key={c.title} className="aip-card min-w-0 rounded-3xl border p-6 flex flex-col gap-5" data-aos="fade-up" data-aos-delay={String(i * 70)}>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <span className="icon-wrapper">
                                                <c.icon className="w-5 h-5" aria-hidden="true" />
                                            </span>
                                            <span className="text-[0.8125rem] font-semibold op-link">{c.eyebrow}</span>
                                        </div>
                                        <h3 className="op-card-title mt-5">{c.title}</h3>
                                        <p className="op-card-text mt-2">{c.text}</p>
                                    </div>
                                    <div className="mt-auto">
                                        <V />
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── AVAILABILITY ───────────────────────────────────── */}
            <section id="id-availability" className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={availabilitySection.title} />
                            <Paras items={availabilitySection.paragraphs} className="mt-6" />
                            <CheckList items={availabilitySection.points} className="mt-8" />
                            <ArrowLink href="/platform/secure-remote-access" className="mt-8">
                                See how privileged sessions are brokered
                            </ArrowLink>
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <FailoverVisual />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── TENANTS AND RECOVERY (dark band) ───────────────── */}
            <div className="dark">
                <section id="id-isolation" className="relative overflow-hidden op-band-navy">
                    <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                    <div className="container-xl op-sec relative">
                        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-start">
                            <div className="min-w-0">
                                <Heading title={isolationSection.title}>
                                    <Prose segments={isolationSection.lead} className="text-[1.0625rem]" />
                                </Heading>
                                <div className="mt-10 grid sm:grid-cols-2 gap-4">
                                    {isolationPillars.map((p, i) => (
                                        <article key={p.title} className="aip-card min-w-0 rounded-3xl border p-6" data-aos="fade-up" data-aos-delay={String((i % 2) * 70)}>
                                            <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl border border-[#00B8DB]/40 bg-[#0b0c0e] text-[#00B8DB]">
                                                <p.icon className="w-5 h-5" aria-hidden="true" />
                                            </span>
                                            <h3 className="op-card-title mt-5">{p.title}</h3>
                                            <p className="op-card-text mt-2">{p.text}</p>
                                        </article>
                                    ))}
                                </div>
                            </div>
                            <div className="min-w-0 lg:sticky lg:top-40" data-aos="fade-up" data-aos-delay="100">
                                <TenantVisual />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* ─── SPECIFICATIONS ─────────────────────────────────── */}
            <section id="id-specs" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <Heading title={specsSection.title}>
                        <Prose segments={specsSection.lead} className="text-[1.0625rem]" />
                    </Heading>
                    <dl className="op-body grid md:grid-cols-2 gap-x-10 rounded-3xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a] px-6 lg:px-8 py-2" data-aos="fade-up">
                        {platformSpecs.map((spec) => (
                            <div key={spec.label} className="grid grid-cols-1 sm:grid-cols-[11rem_minmax(0,1fr)] gap-1 sm:gap-4 py-4 border-b border-slate-900/[0.06] dark:border-white/[0.06]">
                                <dt className="text-[0.8125rem] font-semibold op-link">{spec.label}</dt>
                                <dd className="text-[0.9375rem] leading-relaxed text-slate-700 dark:text-slate-300">{spec.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* ─── KEEP READING ───────────────────────────────────── */}
            <section className={sectionLine}>
                <div className="container-xl py-12 lg:py-14">
                    <h2 className="op-h3 mb-6" data-aos="fade-up">Keep reading</h2>
                    <KeepReading links={keepReading} />
                </div>
            </section>

            <ClosingBand
                title={closing.title}
                accent={<CheckChips steps={["Your infrastructure", "Your keys"]} outcome="Your topology" />}
                lead={closing.body[0]}
                body={closing.body.slice(1)}
                primary={closing.primary}
                secondary={closing.secondary}
            />

            <FaqSplit id="id-faq" title="Frequently Asked Questions" items={faqs} />
        </div>
    );
}
