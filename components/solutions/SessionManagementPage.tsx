import {
    AlertTriangle,
    Boxes,
    ClipboardCheck,
    Database,
    Eye,
    Globe,
    KeyRound,
    Monitor,
    ShieldAlert,
    ShieldCheck,
    Timer,
    Users,
} from "lucide-react";

import ArrowLink from "@/components/sections/ArrowLink";
import CheckList from "@/components/sections/CheckList";
import CtaBand from "@/components/sections/CtaBand";
import FaqSection from "@/components/sections/FaqSection";
import IconCardGrid from "@/components/sections/IconCardGrid";
import MediaSplit from "@/components/sections/MediaSplit";
import Prose from "@/components/sections/Prose";
import Section from "@/components/sections/Section";
import SectionHeading from "@/components/sections/SectionHeading";
import SplitHero from "@/components/sections/SplitHero";
import { cardBorder, cardSurface, displayFont } from "@/lib/styles";
import type { FaqEntry } from "@/components/sections/FaqSection";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * Bespoke layout for /platform/session-management — the destination of the
 * "Remote Access / Secure remote & hybrid access" challenge card.
 *
 * Routing still belongs to app/platform/[slug]/page.tsx, which renders this
 * component instead of the generic capability template when the slug appears
 * in its `bespokePages` map. SEO metadata continues to come from the module
 * entry in app/platform/data.ts.
 *
 * Claims here are limited to what this repository already states: the
 * protocol list on app/features/page.tsx, its capability set (JIT access,
 * vaulting, RBAC, approval workflows, session recording, keystroke logging),
 * and the 4-eyes approval rule in app/platform/data.ts.
 */

const hero = {
    badge: "Privileged Session Management",
    titleLead: "Your workforce is remote.",
    titleAccent: "Your controls do not have to be.",
    intro: [
        "People and vendors need the same reach they had inside the office — without the VPN client, the endpoint agent or the inbound port that used to make it possible.",
    ] as RichText,
    body: [
        "OmniPriv gives remote users browser-based access to servers, desktops, databases and web applications, injects vaulted credentials so nobody handles a raw secret, and records the whole session. Access is granted just-in-time and expires on its own.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/features", label: "Browse All Capabilities" },
    image: {
        src: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=70",
        alt: "Dashboard on a laptop screen, representing a remote worker reaching enterprise systems",
    },
};

const framingSection = {
    title: "Remote work moved the perimeter. It did not move the risk.",
    lead: [
        "Three things changed at once, and each one hands an attacker something useful.",
    ] as RichText,
};

const framingCards: IconCard[] = [
    {
        icon: Globe,
        title: "The same reach, less visibility",
        text: "Remote workers need the systems they had in the office, but IT loses the network position that used to give it oversight of how they connect.",
    },
    {
        icon: AlertTriangle,
        title: "Home networks, unfamiliar hours",
        text: "Off-hours access from unmanaged locations and personal networks is what makes a remote identity the easiest one to attack.",
    },
    {
        icon: ShieldCheck,
        title: "Central, policy-based control",
        text: "One gateway, one vault and one audit trail for everyone — employees, contractors and vendors — wherever they happen to connect from.",
    },
];

const vaultSection = {
    icon: KeyRound,
    title: "Vault the credentials and drop the VPN",
    paragraphs: [
        [
            "Remote access normally means extending your network out to the user. OmniPriv inverts that: the user reaches the target through OmniPriv, and your infrastructure stays closed behind it.",
        ],
        [
            "Nobody handles a raw password. Users sign in through OmniPriv with a directory account they already have, the vault injects the credential on the far side, and the secret is never disclosed to the endpoint or transmitted to the user's machine.",
        ],
    ] as RichText[],
    points: [
        "No VPN client and no inbound ports — users reach targets through OmniPriv, not into your network",
        "Your existing directory — Active Directory, LDAP or a cloud directory account, with SAML, OAuth and OIDC single sign-on",
        "Vaulted credentials — no user ever sees a raw password; they authenticate through OmniPriv",
        "Just-in-time and time-bound — access expires automatically, so no standing privilege is left behind",
        "Conditional access — policy can depend on location, device posture, time of day and risk score",
    ],
};

const reachSection = {
    title: "Everything a remote user needs, in one browser tab",
    lead: [
        "Nothing to install on the workstation and no path to open into the network. Administrators who prefer their own tools can keep using them.",
    ] as RichText,
};

const reachCards: IconCard[] = [
    {
        icon: Monitor,
        title: "Servers and desktops",
        text: "SSH/SFTP, RDP, VNC and network-device sessions launched from the browser, with no local client required.",
    },
    {
        icon: Database,
        title: "Databases",
        text: "MySQL, PostgreSQL, Oracle, SQL Server, MongoDB and Redis through a transparent proxy, with query controls and dynamic data masking.",
    },
    {
        icon: Globe,
        title: "Web apps and RemoteApp",
        text: "Publish internal web applications and remote applications to the right people without exposing them directly to the internet.",
    },
    {
        icon: Boxes,
        title: "Cloud and containers",
        text: "AWS, Azure, GCP and Kubernetes reachable under the same policy and the same audit trail as everything else.",
    },
];

const vendorSection = {
    title: "Third-party and vendor access, on your terms",
    lead: [
        "Contractors and vendors need access to do the job, and need it gone when the job ends. Standing vendor accounts are how a project quietly becomes a permanent way in.",
    ] as RichText,
};

const vendorPillars = [
    {
        icon: Timer,
        title: "Access that ends with the project",
        text: "Third-party access is issued just-in-time and expires automatically when the engagement does, so no orphaned vendor account survives the work it was created for.",
    },
    {
        icon: ClipboardCheck,
        title: "Approval before access",
        text: "Manager or peer approval gates sensitive grants, with ITSM integration so an approved ticket can drive the request instead of a separate process.",
    },
    {
        icon: Users,
        title: "4-eyes on sensitive grants",
        text: "Sensitive access requires a minimum of two independent approvers, and no requester is able to approve their own request.",
    },
    {
        icon: ShieldAlert,
        title: "Break-glass, still contained",
        text: "Emergency access stays governed: mandatory approval, a hard time limit, and full session recording from the first keystroke.",
    },
];

const oversightSection = {
    icon: Eye,
    title: "Watch the session, not just the login",
    paragraphs: [
        [
            "Remote and third-party users warrant closer oversight than in-house teams. A login tells you who connected. The session tells you what they did once they were in.",
        ],
    ] as RichText[],
    image: {
        src: "https://images.unsplash.com/photo-1788790716354-00a65a62bf58?auto=format&fit=crop&w=1200&q=70",
        alt: "Terminal window showing system information and network statistics on a dark screen",
    },
    points: [
        "HD session recording — text (fully searchable) or video, replayable from any point in time",
        "Real-time monitoring — watch a live session, message the user, or end it in one click",
        "Full keystroke logging and command execution history for every SSH and terminal session",
        "Command-level controls — whitelist or blacklist specific shell commands and block dangerous operations as they are attempted",
        "Every event streamed to Splunk, IBM QRadar, Elastic SIEM or any syslog-compatible target",
    ],
};

const stats = [
    { value: "0", label: "Software agents on endpoints", sub: "100% agentless" },
    { value: "16", label: "Protocols and platforms", sub: "SSH through Kubernetes" },
    { value: "100%", label: "Credential vault encryption", sub: "AES-256 with HSM" },
    { value: "9", label: "Regulatory standards mapped", sub: "SOX through ISO 27001" },
];

const keepReading = [
    { href: "/features", label: "See the full capability list" },
    { href: "/integrations", label: "Check directory and ITSM integrations" },
    { href: "/security", label: "Security architecture and certifications" },
];

const closing = {
    title: "Secure every identity, wherever it connects from",
    body: [
        "OmniPriv reduces risk across human, machine, vendor and AI identities with central, policy-based authorization.",
        "No VPN, no endpoint agent and no inbound ports — with a recorded session behind everything that happens next.",
    ],
    kicker: "Nothing standing. Nobody holds the secret. Nothing unrecorded.",
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/case-studies", label: "Read the Case Studies" },
};

const faqs: FaqEntry[] = [
    {
        question: "What is privileged session management?",
        answer:
            "Privileged session management is the practice of brokering every privileged connection through a single control point, injecting credentials on the far side, and recording what happens inside the session. It differs from simply vaulting passwords because the recorded session, not the login, is what proves what an identity actually did.",
    },
    {
        question: "Do remote users need a VPN or a client installed?",
        answer:
            "No. Sessions are brokered through a browser, so there is no VPN client to distribute and no software agent on the workstation. Because users connect to OmniPriv rather than into your network, no inbound port has to be opened either. Administrators who prefer their own terminal or RDP client can continue using it.",
    },
    {
        question: "How is the credential kept away from the user?",
        answer:
            "Credentials are held in an encrypted vault and injected on the far side of the connection, so the raw password or key is never disclosed to the endpoint and never transmitted to the user's machine. The user authenticates through OmniPriv; the target receives the credential from OmniPriv.",
    },
    {
        question: "Can contractors and vendors get access safely?",
        answer:
            "Yes. Third-party access is issued just-in-time, gated on manager or peer approval — optionally driven from an ITSM ticket — and expires automatically when the engagement ends. Sensitive grants follow a 4-eyes rule with a minimum of two independent approvers, and the whole session is recorded.",
    },
    {
        question: "What happens to access when a task or project ends?",
        answer:
            "It expires on its own. Just-in-time access is time-boxed to the task, so there is no standing privilege to remove later and no orphaned account left holding access nobody remembers granting. Nothing needs to be cleaned up manually for the risk to go away.",
    },
];

export default function SessionManagementPage() {
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

            {/* ─── WHY REMOTE CHANGES THE RISK ──────── */}
            <Section tone="muted" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={framingSection.title} className="mb-2">
                        <Prose segments={framingSection.lead} />
                    </SectionHeading>
                </div>

                <IconCardGrid items={framingCards} columns={3} className="mt-12" />
            </Section>

            {/* ─── VAULT, DROP THE VPN ──────────────── */}
            <Section border="bottom">
                <div className="max-w-3xl">
                    <div className="icon-wrapper mb-5">
                        <vaultSection.icon className="w-5 h-5" />
                    </div>

                    <SectionHeading title={vaultSection.title}>
                        {vaultSection.paragraphs.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === vaultSection.paragraphs.length - 1 ? "" : "mb-4"
                                }
                            />
                        ))}
                    </SectionHeading>
                </div>

                <CheckList items={vaultSection.points} className="mt-10 max-w-3xl" />
            </Section>

            {/* ─── WHAT REMOTE USERS REACH ─────────── */}
            <Section tone="muted" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={reachSection.title} className="mb-2">
                        <Prose segments={reachSection.lead} />
                    </SectionHeading>
                </div>

                <IconCardGrid items={reachCards} columns={4} className="mt-12" />
            </Section>

            {/* ─── VENDORS (dark band) ──────────────── */}
            <Section tone="dark" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={vendorSection.title} className="mb-2">
                        <Prose segments={vendorSection.lead} />
                    </SectionHeading>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mt-14">
                    {vendorPillars.map((pillar) => (
                        <div key={pillar.title}>
                            <div className="icon-wrapper mb-5">
                                <pillar.icon className="w-5 h-5" />
                            </div>

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

            {/* ─── SESSION OVERSIGHT ────────────────── */}
            <Section border="bottom">
                <MediaSplit media={oversightSection.image} ratio="even" height="sm" align="start">
                    <div className="icon-wrapper mb-5">
                        <oversightSection.icon className="w-5 h-5" />
                    </div>

                    <SectionHeading title={oversightSection.title}>
                        {oversightSection.paragraphs.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === oversightSection.paragraphs.length - 1
                                        ? ""
                                        : "mb-4"
                                }
                            />
                        ))}
                    </SectionHeading>

                    <CheckList items={oversightSection.points} className="mt-8" />

                    <ArrowLink href="/platform/audit-compliance" className="mt-8">
                        See how sessions become audit evidence
                    </ArrowLink>
                </MediaSplit>
            </Section>

            {/* ─── OUTCOMES ─────────────────────────── */}
            <Section tone="muted" border="bottom">
                <SectionHeading
                    title="Remote access you can point at"
                    align="center"
                    size="lg"
                    className="mb-12 sm:mb-16"
                >
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Not a policy document. These are the controls standing behind remote access.
                    </p>
                </SectionHeading>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className={`p-6 rounded-2xl border text-center ${cardBorder} ${cardSurface}`}
                        >
                            <div
                                className="text-3xl font-extrabold text-slate-950 dark:text-white mb-1"
                                style={displayFont}
                            >
                                {stat.value}
                            </div>
                            <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                {stat.label}
                            </div>
                            <div className="text-xs text-slate-500">{stat.sub}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 grid sm:grid-cols-3 gap-6">
                    {keepReading.map((link) => (
                        <ArrowLink key={link.href} href={link.href}>
                            {link.label}
                        </ArrowLink>
                    ))}
                </div>
            </Section>

            {/* ─── CLOSING ──────────────────────────── */}
            <CtaBand
                title={closing.title}
                body={closing.body}
                kicker={closing.kicker}
                primary={closing.primary}
                secondary={closing.secondary}
            />

            {/* ─── FAQ ──────────────────────────────── */}
            <FaqSection
                title="Frequently Asked Questions"
                subtitle="Common questions about remote access, vendor access and session oversight under privileged access management."
                items={faqs}
            />
        </>
    );
}
