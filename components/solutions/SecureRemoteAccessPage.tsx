import {
    Activity,
    ClipboardCheck,
    Clock,
    Eye,
    Fingerprint,
    Key,
    KeyRound,
    Monitor,
    ScanSearch,
    ShieldCheck,
    Timer,
} from "lucide-react";

import SectionNav from "@/components/aipam/SectionNav";
import Spotlight from "@/components/aipam/Spotlight";
import CheckChips from "@/components/pageui/CheckChips";
import { ClosingBand, FactsStrip, FaqSplit, Heading, KeepReading, PageHero, Paras, mutedBand, sectionLine } from "@/components/pageui/blocks";
import RemoteHero from "@/components/remote/RemoteHero";
import { AccessTrack, BrokerDiagram, Personas, RisksCard, SessionRecord } from "@/components/remote/Visuals";
import ChipList from "@/components/sections/ChipList";
import Prose from "@/components/sections/Prose";
import { cn } from "@/lib/utils";
import type { FaqEntry } from "@/components/sections/FaqAccordion";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * Bespoke layout for /platform/secure-remote-access ("Secure Remote & Hybrid
 * Access"). Routing belongs to app/platform/[slug]/page.tsx; SEO metadata
 * comes from the module entry in app/platform/data.ts. The former
 * /platform/session-management URL 301s here (next.config.js).
 *
 * Copy is the marketing team's, kept verbatim with its links. Layout uses the
 * shared page kit (components/pageui) so it matches /ai-pam and the
 * credentials page. Sample values in the illustrations are illustrative.
 */

const hero = {
    badge: "Secure Remote & Hybrid Access",
    titleLead: "Secure Remote Access for",
    titleAccent: "Your Modern Workforce",
    intro: [
        "Remote administrators, engineers, employees, contractors, and vendors need fast access to critical systems wherever they work. But traditional remote connectivity can create unnecessary exposure when privileged credentials, permanent permissions, or direct connections are left uncontrolled.",
    ] as RichText,
    body: [
        "OmniPriv provides secure remote access through an enterprise ",
        { text: "PAM solution", href: "/" },
        " built around identity verification, least privilege, Just-in-Time access, credential protection, and complete session visibility.",
    ] as RichText,
    kicker: [
        "Give authorized users access to the systems they need, without giving them unrestricted privilege.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/features", label: "Browse All Capabilities" },
    image: {
        src: "/challenges/secure-remote-hybrid-access.jpeg",
        alt: "Secure remote access illustration showing verified identities, governed privileged sessions and audited access to enterprise systems",
    },
};

const surfaceSection = {
    title: "Secure Remote Access Without Expanding Your Attack Surface",
    paragraphs: [
        [
            "Remote work changes where access happens, but it should not change how privileged access is controlled.",
        ],
        [
            "OmniPriv provides access to RDP, SSH, databases, and other enterprise resources from remote locations. Connections are brokered through the platform rather than by exposing target systems directly to the internet.",
        ],
        [
            "Every privileged request can be authenticated, authorized, logged, and governed through centralized PAM controls.",
        ],
    ] as RichText[],
    image: {
        src: "/challenges/audit-governance-compliance.jpeg",
        alt: "Laptops, servers and cloud reached through one governed access point",
    },
};

const zeroTrustSection = {
    title: "Privileged Remote Access with Zero Trust Control",
    subheading: "Verify Every Remote Identity",
    lead: [
        "A remote connection should never be trusted simply because a user has valid credentials.",
    ] as RichText,
    body: [
        "OmniPriv applies strong identity assurance with MFA, enterprise SSO integrations, contextual risk controls, and least-privilege enforcement for privileged sessions. This gives organizations stronger privileged remote access for:",
    ] as RichText,
    personas: [
        "IT administrators",
        "Engineers and DevOps teams",
        "Remote employees",
        "Contractors",
        "Service providers",
        "Third-party vendors",
    ],
    note: ["Users receive only the permissions required for an approved task."] as RichText,
};

const jitSection = {
    title: "Replace Permanent Privileges with JIT Access",
    paragraphs: [
        ["Remote users do not need administrator rights active all day."],
        [
            "OmniPriv uses Just-in-Time access to provide temporary, purpose-specific privileges that expire automatically. This reduces standing access and helps limit the privilege available if an identity becomes compromised. For a secure remote workforce, the access model becomes:",
        ],
    ] as RichText[],
    flow: ["Verify", "Approve", "Grant", "Monitor", "Revoke"],
    note: [
        "Instead of permanent trust, privilege exists only when it is needed.",
    ] as RichText,
    image: {
        src: "https://images.unsplash.com/photo-1688380692117-63178554d76d?auto=format&fit=crop&w=1200&q=70",
        alt: "Secure remote access workflow requesting just-in-time privileged access for an approved task",
    },
};

const credentialsSection = {
    title: "Protect Credentials During Remote Access",
    paragraphs: [
        [
            "Passwords, SSH keys, and administrative credentials should not be unnecessarily exposed to remote users.",
        ],
        [
            "OmniPriv combines encrypted credential vaulting with automated credential lifecycle management so organizations can control sensitive secrets centrally rather than sharing privileged passwords between employees, administrators, and vendors. Its platform includes ",
            { text: "credential vaulting and automated credential management", href: "/platform" },
            " as core PAM capabilities. This helps reduce risks associated with:",
        ],
    ] as RichText[],
    risks: [
        "Shared admin passwords",
        "Long-lived credentials",
        "Credential reuse",
        "Uncontrolled third-party access",
        "Manually distributed privileged secrets",
    ],
};

const monitorSection = {
    title: "Monitor Every Privileged Remote Session",
    paragraphs: [
        ["Secure access does not end when a user signs in."],
        [
            "OmniPriv gives security teams visibility into active privileged sessions and supports session recording, searchable activity, command-level context, and centralized investigation of privileged activity. The platform supports protocols and resources including SSH, RDP, VNC, Kubernetes, databases, web applications, and cloud environments.",
        ],
    ] as RichText[],
    flowLabel: "With privileged remote access, security teams can understand",
    flow: [
        "Who connected",
        "What they accessed",
        "What they did",
        "When it happened",
        "Whether intervention was required",
    ],
    note: [
        "This provides greater accountability for administrators, contractors, and remote support teams.",
    ] as RichText,
};

const workforceSection = {
    title: "Build a Secure Remote Workforce Without Slowing Productivity",
    paragraphs: [
        [
            "A ",
            { text: "secure remote workforce", href: "/solutions/human-identity-security" },
            " needs both security and usability.",
        ],
        [
            "Requiring employees and engineers to work through fragmented VPNs, shared credentials, separate access tools, and manual approvals can slow legitimate work while still leaving security gaps.",
        ],
        [
            "OmniPriv centralizes identity verification, JIT privilege, credential protection, remote sessions, policy enforcement, and auditability in one PAM solution. Its ",
            { text: "identity-security model", href: "/platform/identity-security" },
            " covers human, machine, vendor, and AI identities through a common authorization and audit framework.",
        ],
    ] as RichText[],
};

const vendorSection = {
    title: "Secure Vendor and Third-Party Remote Access",
    lead: [
        "Vendors often need legitimate access to sensitive infrastructure, but that should not require permanent accounts or unrestricted network access. OmniPriv helps organizations control third-party access using:",
    ] as RichText,
    image: {
        src: "https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&w=1200&q=70",
        alt: "Authorisation document being signed and reviewed, representing approval workflows for secure vendor remote access",
    },
};

const vendorControls: IconCard[] = [
    {
        icon: Fingerprint,
        title: "MFA & Identity Verification",
        text: "Confirm who is requesting access.",
    },
    {
        icon: ClipboardCheck,
        title: "Approval Workflows",
        text: "Require authorization before sensitive access begins.",
    },
    {
        icon: Clock,
        title: "Time-Limited Privileges",
        text: "Provide access only for the approved period.",
    },
    {
        icon: Key,
        title: "Credential Protection",
        text: "Reduce direct exposure to privileged secrets.",
    },
    {
        icon: Activity,
        title: "Session Monitoring",
        text: "Maintain visibility into vendor activity.",
    },
];

const solutionsSection = {
    title: "OmniPriv Remote Access Security Solutions",
    lead: [
        "OmniPriv remote access security solutions combine enterprise PAM controls with an architecture designed for cloud, on-premises, database, and hybrid environments.",
    ] as RichText,
};

const solutionCapabilities: IconCard[] = [
    {
        icon: Monitor,
        title: "Brokered Remote Access",
        text: "Enable privileged SSH, RDP, and database access from any location, brokered through the platform.",
    },
    {
        icon: Timer,
        title: "Just-in-Time Privileges",
        text: "Replace unnecessary standing access with time-limited permissions.",
    },
    {
        icon: ShieldCheck,
        title: "MFA & Zero Trust",
        text: "Authenticate and authorize every privileged session instead of trusting network location.",
    },
    {
        icon: KeyRound,
        title: "Credential Protection",
        text: "Vault and manage privileged credentials instead of exposing administrative secrets.",
    },
    {
        icon: Eye,
        title: "Session Visibility",
        text: "Monitor privileged activity and maintain searchable evidence.",
    },
    {
        icon: ScanSearch,
        title: "Intelligent Threat Detection",
        text: "Identify suspicious behavior and privileged-access anomalies before they become larger incidents.",
    },
];

const keepReading = [
    { href: "/features", label: "See the full capability list" },
    { href: "/integrations", label: "Check directory and ITSM integrations" },
    { href: "/security", label: "Security architecture and framework mappings" },
];

const closing = {
    title: "Secure Remote Access with OmniPriv PAM",
    body: [
        "Remote work should not mean weaker privileged-access controls.",
        "OmniPriv brings secure remote access, identity verification, JIT privileges, credential protection, session security, and centralized auditing together in one enterprise PAM solution.",
        "Whether users connect from the office, home, another country, or a third-party environment, privileged access remains governed by the same security policies.",
    ],
    kicker: "Give people access to what they need, not permanent access to everything.",
    primary: { href: "/demo", label: "Request an OmniPriv Demo" },
    secondary: { href: "/case-studies", label: "Read the Case Studies" },
};

const faqs: FaqEntry[] = [
    {
        question: "What is secure remote access?",
        answer:
            "Secure remote access allows authorized users to connect to enterprise systems from outside the traditional network while applying authentication, authorization, least privilege, monitoring, and security policies.",
    },
    {
        question: "What is privileged remote access?",
        answer:
            "Privileged remote access specifically protects remote connections to sensitive systems such as servers, databases, cloud infrastructure, and administrative applications where elevated permissions are required.",
    },
    {
        question: "How does OmniPriv secure remote users?",
        answer:
            "OmniPriv combines MFA, policy-based authorization, JIT access, credential protection, a brokered proxy architecture, and privileged-session visibility to control remote access to sensitive resources.",
    },
    {
        question: "Does OmniPriv support remote SSH and RDP access?",
        answer:
            "Yes. OmniPriv lists SSH, RDP, VNC, database, Kubernetes, web-application, and cloud access among its supported protocols and asset types.",
    },
    {
        question: "How does PAM help secure a remote workforce?",
        answer:
            "A PAM platform reduces remote-access risk by verifying identities, applying least privilege, securing privileged credentials, limiting access duration, and monitoring sensitive sessions.",
    },
    {
        question: "Can OmniPriv secure vendor remote access?",
        answer:
            "Yes. OmniPriv's identity model includes vendor and third-party identities, with policy controls designed to give external users access for defined work and revoke it when that access is no longer required.",
    },
];


const NAV = [
    { id: "sra-surface", label: "Attack surface" },
    { id: "sra-zero-trust", label: "Zero Trust" },
    { id: "sra-jit", label: "JIT access" },
    { id: "sra-credentials", label: "Credentials" },
    { id: "sra-sessions", label: "Sessions" },
    { id: "sra-vendors", label: "Vendors" },
    { id: "sra-solutions", label: "Solutions" },
    { id: "sra-faq", label: "FAQ" },
];

const FACTS = [
    { value: 7, label: "resource types: SSH, RDP, VNC, Kubernetes, databases, web apps, cloud" },
    { value: 5, label: "steps to every grant: verify, approve, grant, monitor, revoke" },
    { value: 0, label: "standing privileges left once the approved task ends" },
    { value: 6, label: "remote identity types governed, from admins to vendors" },
];

const PROTOCOLS = ["SSH", "RDP", "VNC", "Kubernetes", "Databases", "Web applications", "Cloud environments"];

function CardGrid({ items, cols = "lg:grid-cols-3" }: { items: IconCard[]; cols?: string }) {
    return (
        <div className={cn("op-body grid gap-5 sm:grid-cols-2", cols)}>
            {items.map((c, i) => (
                <article key={c.title} className="aip-card min-w-0 rounded-3xl border p-6 lg:p-7" data-aos="fade-up" data-aos-delay={String((i % 3) * 70)}>
                    <span className="icon-wrapper">
                        <c.icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <h3 className="op-card-title mt-5">{c.title}</h3>
                    <p className="op-card-text mt-2">{c.text}</p>
                </article>
            ))}
        </div>
    );
}

export default function SecureRemoteAccessPage() {
    return (
        <div className="aip">
            <SectionNav items={NAV} startId="sra-hero" />
            <Spotlight />

            <PageHero
                id="sra-hero"
                titleLead={hero.titleLead}
                titleAccent={hero.titleAccent}
                tagline={hero.kicker[0] as string}
                paragraphs={[hero.intro, hero.body]}
                primary={hero.primary}
                secondary={hero.secondary}
                visual={<RemoteHero />}
            >
                <FactsStrip facts={FACTS} />
            </PageHero>

            {/* ─── ATTACK SURFACE ─────────────────────────────────── */}
            <section id="sra-surface" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={surfaceSection.title} />
                            <Paras items={surfaceSection.paragraphs} className="mt-6" />
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <BrokerDiagram />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── ZERO TRUST ─────────────────────────────────────── */}
            <section id="sra-zero-trust" className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-start">
                        <div className="min-w-0 lg:sticky lg:top-40">
                            <Heading title={zeroTrustSection.title} />
                            <h3 className="op-h3 mt-8" data-aos="fade-up">{zeroTrustSection.subheading}</h3>
                            <Prose segments={zeroTrustSection.lead} tone="strong" className="mt-3 text-[1.0625rem]" />
                            <Prose segments={zeroTrustSection.body} className="mt-4 text-[1.0156rem]" />
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <Personas items={zeroTrustSection.personas} />
                            <p className="mt-6 pl-4 border-l-2 border-[#00B8DB] text-[1.0625rem] font-semibold text-[#0a1628] dark:text-white">
                                {zeroTrustSection.note[0] as string}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── JIT (dark band) ────────────────────────────────── */}
            <div className="dark">
                <section id="sra-jit" className="relative overflow-hidden op-band-navy">
                    <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                    <div className="container-xl op-sec relative">
                        <Heading title={jitSection.title}>
                            {jitSection.paragraphs.map((p, i) => (
                                <Prose key={i} segments={p} className="text-[1.0625rem]" />
                            ))}
                        </Heading>
                        <div className="mt-14">
                            <AccessTrack steps={jitSection.flow} />
                        </div>
                        <p className="mt-12 text-[1.1875rem] font-semibold text-white" data-aos="fade-up">
                            {jitSection.note[0] as string}
                        </p>
                    </div>
                </section>
            </div>

            {/* ─── CREDENTIALS ────────────────────────────────────── */}
            <section id="sra-credentials" className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={credentialsSection.title} />
                            <Paras items={credentialsSection.paragraphs} className="mt-6" />
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <RisksCard risks={credentialsSection.risks} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── SESSIONS ───────────────────────────────────────── */}
            <section id="sra-sessions" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-12 lg:gap-16 items-start">
                        <div className="min-w-0">
                            <Heading title={monitorSection.title} />
                            <Paras items={monitorSection.paragraphs} className="mt-6" />
                            <div className="mt-6" data-aos="fade-up">
                                <ChipList items={PROTOCOLS} variant="accent" />
                            </div>
                            <Prose segments={monitorSection.note} tone="strong" className="mt-6 text-[1.0156rem]" />
                        </div>
                        <div className="min-w-0 lg:sticky lg:top-40" data-aos="fade-up" data-aos-delay="100">
                            <p className="mb-3 text-[0.9375rem] font-semibold text-[#0a1628] dark:text-white">{monitorSection.flowLabel}:</p>
                            <SessionRecord labels={monitorSection.flow} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── WORKFORCE ──────────────────────────────────────── */}
            <section className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 lg:gap-16">
                        <Heading title={workforceSection.title} />
                        <div data-aos="fade-up">
                            <Paras items={workforceSection.paragraphs} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── VENDORS ────────────────────────────────────────── */}
            <section id="sra-vendors" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <Heading title={vendorSection.title}>
                        <Prose segments={vendorSection.lead} className="text-[1.0625rem]" />
                    </Heading>
                    {/* 3 + 2, no hole */}
                    <div className="op-body grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
                        {vendorControls.map((c, i) => (
                            <article key={c.title} className={cn("aip-card min-w-0 rounded-3xl border p-6 lg:p-7 flex items-start gap-4", i < 3 ? "lg:col-span-2" : "lg:col-span-3", i === 4 && "sm:col-span-2 lg:col-span-3")} data-aos="fade-up" data-aos-delay={String((i % 3) * 70)}>
                                <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#00B8DB] text-[#03121c] shrink-0">
                                    <c.icon className="w-5 h-5" aria-hidden="true" />
                                </span>
                                <span className="min-w-0">
                                    <span className="block op-card-title">{c.title}</span>
                                    <span className="block op-card-text mt-1">{c.text}</span>
                                </span>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── SOLUTIONS ──────────────────────────────────────── */}
            <section id="sra-solutions" className={sectionLine}>
                <div className="container-xl op-sec">
                    <Heading title={solutionsSection.title}>
                        <Prose segments={solutionsSection.lead} className="text-[1.0625rem]" />
                    </Heading>
                    <CardGrid items={solutionCapabilities} />
                </div>
            </section>

            {/* ─── KEEP READING ───────────────────────────────────── */}
            <section className={cn(mutedBand, sectionLine)}>
                <div className="container-xl py-12 lg:py-14">
                    <h2 className="op-h3 mb-6" data-aos="fade-up">Keep reading</h2>
                    <KeepReading links={keepReading} />
                </div>
            </section>

            <ClosingBand
                title={closing.title}
                accent={<CheckChips steps={["Verified", "Approved", "Recorded"]} outcome="Revoked on time" />}
                lead={closing.kicker}
                body={closing.body}
                primary={closing.primary}
                secondary={closing.secondary}
            />

            <FaqSplit id="sra-faq" title="Frequently Asked Questions" items={faqs} />
        </div>
    );
}
