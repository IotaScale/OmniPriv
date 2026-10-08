import {
    ArrowRight,
    Eye,
    Fingerprint,
    KeyRound,
    ScanSearch,
    ScrollText,
    Timer,
    Zap,
} from "lucide-react";

import ArrowLink from "@/components/sections/ArrowLink";
import CheckList from "@/components/sections/CheckList";
import ChipList from "@/components/sections/ChipList";
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
 * Bespoke layout for /platform/ai-threat-protection, the destination of the
 * "AI Threat Defense / Defend against AI-era attacks" challenge card.
 *
 * Routing still belongs to app/platform/[slug]/page.tsx, which renders this
 * component instead of the generic capability template when the slug appears
 * in its `bespokePages` map. The SEO metadata continues to come from the
 * module entry in app/platform/data.ts. The former /platform/threat-detection
 * URL 301s here (see next.config.js).
 *
 * Every figure quoted below is OmniPriv's own and is verifiable in this
 * repository, see app/ai-pam/page.tsx for the 39-feature model, its
 * escalation tiers and the 10-second sweeper.
 */

const hero = {
    badge: "Defend Against AI-Driven Threats",
    titleLead: "Defend Against AI-Driven Attacks",
    titleAccent: "with Privileged Access Security",
    intro: [
        "AI is increasing the speed at which both businesses and attackers operate. Automated reconnaissance, credential attacks, compromised identities, and machine-speed lateral movement can turn excessive privilege into a serious security risk.",
    ] as RichText,
    body: [
        "OmniPriv delivers AI threat protection at the privileged-access layer. By combining Just-in-Time access, Zero Standing Privileges, credential protection, intelligent behavioral analysis, session control, and automated response, OmniPriv helps contain threats before privileged access becomes a wider breach.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/ai-pam", label: "Explore AI-PAM" },
    image: {
        src: "/challenges/ai-threat-protection.jpeg",
        alt: "OmniPriv AI threat protection console denying a privileged access request from an AI assistant identity after policy evaluation flagged it high risk",
    },
};

const targetSection = {
    title: "AI-Driven Attacks Turn Identity into a High-Value Target",
    paragraphs: [
        [
            "Attackers do not always need to break through every security layer. A single compromised identity with excessive privilege may already provide access to critical infrastructure.",
        ],
        [
            "The risk grows as enterprises introduce AI agents, automation, machine identities, cloud workloads, and increasingly connected systems.",
        ],
        [
            "Effective identity threat protection therefore needs to control what happens after authentication, not simply verify a login.",
        ],
        [
            "OmniPriv applies ",
            { text: "policy-driven Privileged Access Management", href: "/platform" },
            " across human, machine, vendor, and AI identities, helping organizations control how privileged access is granted, used, monitored, and revoked.",
        ],
    ] as RichText[],
    image: {
        src: "/challenges/reduce-privileged-identity-risk.jpeg",
        alt: "A privileged identity protected while attacker paths are flagged and blocked",
    },
};

const privilegeSection = {
    title: "Reduce the Privilege an Attacker Can Exploit",
    lead: [
        "Permanent administrator access gives attackers more opportunity if an account or credential is compromised. OmniPriv uses just-in-time privileged access to provide temporary, task-specific permissions that automatically expire.",
    ] as RichText,
    subheading: "Move Toward Zero Standing Privileges",
    body: [
        "With Zero Standing Privileges, elevated permissions do not remain available simply because someone may need them later. This helps reduce:",
    ] as RichText,
    reduces: [
        "Persistent administrator rights",
        "Unnecessary privileged access",
        "Stale access paths",
        "Excessive permissions",
        "Privilege available to compromised identities",
    ],
    note: [
        "Just-in-time access is already a core part of OmniPriv's privileged-access model for both human and automated identities.",
    ] as RichText,
};

const credentialsSection = {
    title: "Protect the Credentials Attackers Want",
    paragraphs: [
        ["Credentials remain a critical target in AI-driven cyber attacks."],
        [
            "Passwords, SSH keys, API tokens, and privileged secrets can provide direct access to sensitive infrastructure if they are exposed or remain valid for too long.",
        ],
        [
            "OmniPriv strengthens privileged credential protection through encrypted vaulting and automated rotation. Passwords, SSH keys, and API tokens can be rotated automatically on schedule or after privileged sessions. This reduces reliance on long-lived secrets and limits the value of stolen credentials.",
        ],
    ] as RichText[],
    image: {
        src: "https://images.unsplash.com/photo-1614064548237-096f735f344f?auto=format&fit=crop&w=1200&q=70",
        alt: "AI threat protection securing privileged credentials behind a padlock on a keyboard, lit by data trails",
    },
};

const detectSection = {
    title: "Detect Privileged Threats with AI and Machine Learning",
    lead: [
        "Stopping modern attacks requires more than static access rules. OmniPriv's AI threat protection uses machine-learning-based behavioral analysis to identify activity that differs from expected privileged behavior. The platform can detect patterns such as:",
    ] as RichText,
    patterns: [
        "Unusual commands",
        "Abnormal access times",
        "Unexpected data volumes",
        "Credential harvesting",
        "Privilege abuse",
        "Lateral movement",
        "Attempts to bypass PAM controls",
    ],
    note: [
        "OmniPriv's AI-PAM engine also uses machine-learning-based anomaly scoring across privileged sessions and supports automated escalation and blocking based on risk.",
    ] as RichText,
    image: {
        src: "/product/dashboard.png",
        alt: "OmniPriv dashboard with live risk posture and anomaly indicators",
        fit: "contain" as const,
    },
};

const containSection = {
    title: "Contain Threats Before They Move Further",
    paragraphs: [
        ["Detection has limited value if risky activity can continue unchecked."],
        [
            "OmniPriv combines privileged access threat detection with access controls and session intervention to help contain suspicious activity.",
        ],
        [
            "When an identity begins behaving unexpectedly, security teams can investigate the activity, restrict access, and terminate risky privileged sessions.",
        ],
        [
            "This provides an additional layer of lateral movement prevention by reducing how freely compromised identities can move between sensitive resources.",
        ],
    ] as RichText[],
    image: {
        src: "https://images.unsplash.com/photo-1691435828932-911a7801adfb?auto=format&fit=crop&w=1200&q=70",
        alt: "Network switch with structured cabling, representing containment of lateral movement between privileged systems",
    },
};

const monitorSection = {
    title: "Monitor What Happens After Access Is Granted",
    paragraphs: [
        ["A successful login should never mean unlimited trust."],
        [
            "OmniPriv provides privileged session monitoring across SSH, RDP, VNC, HTTP, and database access. Sessions can be recorded, isolated, searched, and controlled throughout their lifecycle.",
        ],
    ] as RichText[],
    flowLabel: "Security teams can see",
    flow: [
        "Who accessed the resource",
        "What they did",
        "When it happened",
        "Whether risk appeared",
        "How the session ended",
    ],
    note: [
        "Session controls can also restrict specific actions and trigger automated responses when defined security events occur.",
    ] as RichText,
};

const agentsSection = {
    title: "Protect AI Agents with Deterministic Privilege Controls",
    paragraphs: [
        [
            "AI agents can operate faster and more autonomously than traditional users. That makes AI agent security an important part of modern PAM.",
        ],
        [
            "OmniPriv gives AI and automated identities controlled privilege boundaries rather than unrestricted authority. Its current AI-PAM capabilities include:",
        ],
    ] as RichText[],
    capabilities: [
        "Per-agent identities",
        "Tool allowlists",
        "Scoped access",
        "Human approval for high-risk actions",
        "Policy verification",
        "Agent session audit trails",
    ],
    note: [
        "Even when AI reasoning is influenced by unsafe input, privileged actions can remain subject to deterministic access policies.",
    ] as RichText,
};

const modelSection = {
    title: "One AI Threat Protection Model Across Every Identity",
    lead: [
        "Modern attacks can involve humans, machines, vendors, service accounts, or autonomous agents. OmniPriv brings these identities under one privileged-access security model.",
    ] as RichText,
    note: [
        "This gives organizations ",
        { text: "AI security monitoring", href: "/security" },
        " and privileged-access control from a unified platform rather than disconnected security tools.",
    ] as RichText,
};

const modelSteps: IconCard[] = [
    {
        eyebrow: "01",
        icon: Fingerprint,
        title: "Verify",
        text: "Authenticate and assess every privileged access request.",
    },
    {
        eyebrow: "02",
        icon: Timer,
        title: "Limit",
        text: "Apply least privilege and time-bound permissions.",
    },
    {
        eyebrow: "03",
        icon: KeyRound,
        title: "Protect",
        text: "Vault and rotate privileged credentials.",
    },
    {
        eyebrow: "04",
        icon: Eye,
        title: "Monitor",
        text: "Record sessions and privileged activity.",
    },
    {
        eyebrow: "05",
        icon: ScanSearch,
        title: "Detect",
        text: "Use behavioral analytics to identify suspicious patterns.",
    },
    {
        eyebrow: "06",
        icon: Zap,
        title: "Respond",
        text: "Alert, restrict, or terminate risky activity.",
    },
    {
        eyebrow: "07",
        icon: ScrollText,
        title: "Audit",
        text: "Maintain tamper-resistant evidence for investigations and compliance.",
    },
];

const stats = [
    { value: "39", label: "ML features scored per session", sub: "Behavioural model" },
    { value: "10s", label: "Auto-block sweep interval", sub: "Tiered escalation" },
    { value: "0", label: "Standing privileges", sub: "Access expires with the task" },
    { value: "9", label: "Regulatory standards mapped", sub: "SOX through ISO 27001" },
];

const keepReading = [
    { href: "/ai-pam", label: "How the anomaly scoring engine works" },
    { href: "/case-studies", label: "Read the anomaly detection case study" },
    { href: "/security", label: "Security architecture and framework mappings" },
];

const closing = {
    title: "Stop AI-Driven Threats from Becoming Privileged Breaches",
    body: [
        "Organizations cannot prevent every identity from being targeted. They can control how much privilege that identity holds and how far an attacker can move if it is compromised.",
        "OmniPriv AI threat protection combines Zero Trust PAM, JIT privileges, credential security, behavioral analytics, real-time session visibility, and automated response to reduce the impact of AI-driven attacks.",
    ],
    kicker:
        "Reduce standing privilege. Detect abnormal behavior. Contain risky access. Maintain complete accountability.",
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/case-studies", label: "Read the Case Studies" },
};

const faqs: FaqEntry[] = [
    {
        question: "What is AI threat protection?",
        answer:
            "AI threat protection uses security controls, behavioral analytics, access policies, and automated response to identify and limit threats involving AI-powered attacks, compromised identities, automation, and privileged access.",
    },
    {
        question: "How does PAM help defend against AI attacks?",
        answer:
            "PAM limits the privilege an attacker can inherit. JIT access, credential protection, session monitoring, least privilege, and threat detection can reduce what a compromised identity is able to access or do.",
    },
    {
        question: "How does OmniPriv detect suspicious privileged activity?",
        answer:
            "OmniPriv uses machine-learning behavioral analysis and anomaly detection to identify unusual command patterns, access times, data volumes, privilege abuse, credential harvesting, and lateral movement.",
    },
    {
        question: "Why are Zero Standing Privileges important?",
        answer:
            "Zero Standing Privileges reduce permanent elevated access. If an identity is compromised while it does not hold unnecessary administrative rights, the attacker has fewer privileges immediately available to exploit.",
    },
    {
        question: "Can OmniPriv protect AI agents?",
        answer:
            "Yes. OmniPriv currently provides controls for AI and automated identities including scoped privileges, policy enforcement, JIT access, human approval for high-risk actions, and agent activity auditing.",
    },
    {
        question: "Can OmniPriv respond to suspicious sessions?",
        answer:
            "Yes. OmniPriv supports behavioral alerts, session controls, real-time intervention, and automated session termination for detected security events.",
    },
];

export default function AiThreatProtectionPage() {
    return (
        <>
            <SplitHero
                badge={hero.badge}
                titleLead={hero.titleLead}
                titleAccent={hero.titleAccent}
                primary={hero.primary}
                secondary={hero.secondary}
                media={hero.image}
                ratio="wide-last"
                height="video"
            >
                <Prose segments={hero.intro} className="text-lg mb-5" />
                <Prose segments={hero.body} className="text-lg mb-8" />
            </SplitHero>

            {/* ─── IDENTITY IS THE TARGET ───────────── */}
            <Section tone="muted" border="bottom">
                <MediaSplit
                    media={targetSection.image}
                    ratio="wide-last"
                    height="sm"
                    align="start"
                    heading={<SectionHeading title={targetSection.title} />}
                >
                    <div className="op-hero-copy">
                        {targetSection.paragraphs.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === targetSection.paragraphs.length - 1 ? "" : "mb-4"
                                }
                            />
                        ))}
                    </div>
                </MediaSplit>
            </Section>

            {/* ─── REDUCE THE PRIVILEGE ───────────────
                Hardcoded dark band. `tone="dark"` also wraps the section in a
                `.dark` ancestor, without which the theme-aware text inside would
                render dark-on-dark while the site is in light mode. Sits between
                two `muted` bands, so the rhythm reads muted → dark → muted. */}
            <Section tone="dark" border="bottom">
                <SectionHeading title={privilegeSection.title}>
                    <Prose segments={privilegeSection.lead} />
                </SectionHeading>

                <div className="max-w-3xl">
                    <SectionHeading
                        as="h3"
                        size="sm"
                        title={privilegeSection.subheading}
                        className="mt-12 mb-4"
                    >
                        <Prose segments={privilegeSection.body} />
                    </SectionHeading>

                    <CheckList items={privilegeSection.reduces} className="mt-6" />

                    <Prose segments={privilegeSection.note} className="mt-8" />
                </div>
            </Section>

            {/* ─── PROTECT THE CREDENTIALS ──────────── */}
            <Section tone="muted" border="bottom">
                <MediaSplit
                    media={credentialsSection.image}
                    ratio="wide-last"
                    height="sm"
                    align="start"
                    heading={<SectionHeading title={credentialsSection.title} />}
                >
                    <div className="op-hero-copy">
                        {credentialsSection.paragraphs.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === credentialsSection.paragraphs.length - 1
                                        ? ""
                                        : "mb-4"
                                }
                            />
                        ))}
                    </div>
                </MediaSplit>
            </Section>

            {/* ─── DETECT WITH AI AND ML ────────────── */}
            <Section border="bottom">
                <MediaSplit
                    media={detectSection.image}
                    ratio="wide-last"
                    height="sm"
                    align="start"
                    heading={<SectionHeading title={detectSection.title} />}
                >
                    <div className="op-hero-copy">
                        <Prose segments={detectSection.lead} />
                    </div>

                    <CheckList items={detectSection.patterns} className="mt-8" />

                    <Prose segments={detectSection.note} className="mt-8" />
                </MediaSplit>
            </Section>

            {/* ─── OUTCOMES ───────────────────────────
                Hardcoded dark band, matching the other dark sections on this page.
                `tone="dark"` also wraps the section in `.dark`, which is what flips
                `cardSurface` and the `dark:*` text inside to the dark palette, without it the stat cards would be white-on-dark. */}
            <Section tone="dark" border="bottom">
                <SectionHeading
                    title="AI threat protection you can point at"
                    align="center"
                    size="lg"
                    className="mb-12 sm:mb-16"
                >
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Detection is not a dashboard screenshot. These are the controls running
                        behind it.
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
                            {/* `dark:` variant is required now this band is dark:
                                plain slate-500 on the dark card is 4.05:1, under
                                the 4.5:1 minimum for 12px text. */}
                            <div className="text-xs text-slate-500 dark:text-slate-400">{stat.sub}</div>
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

            {/* ─── CONTAIN THE MOVEMENT ────────────── */}
            <Section border="bottom">
                <MediaSplit
                    media={containSection.image}
                    ratio="wide-last"
                    height="sm"
                    align="start"
                    heading={<SectionHeading title={containSection.title} />}
                >
                    <div className="op-hero-copy">
                        {containSection.paragraphs.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === containSection.paragraphs.length - 1 ? "" : "mb-4"
                                }
                            />
                        ))}
                    </div>
                </MediaSplit>
            </Section>

            {/* ─── MONITOR AFTER ACCESS ─────────────── */}
            <Section tone="muted" border="bottom">
                <SectionHeading title={monitorSection.title}>
                    <Prose segments={monitorSection.paragraphs[0]} className="mb-4" />
                    <Prose segments={monitorSection.paragraphs[1]} />
                </SectionHeading>

                <div className="max-w-3xl">
                    <div className="mt-10 mb-4 text-xs font-mono font-semibold uppercase tracking-[0.14em] text-[#00667A] dark:text-[#00B8DB]">
                        {monitorSection.flowLabel}
                    </div>

                    <ChipList
                        items={monitorSection.flow}
                        variant="accent"
                        separator={<ArrowRight className="h-4 w-4 text-[#00667A] dark:text-[#00B8DB]" />}
                    />

                    <Prose segments={monitorSection.note} className="mt-8" />
                </div>
            </Section>

            {/* ─── PROTECT AI AGENTS ────────────────── */}
            <Section border="bottom">
                <SectionHeading title={agentsSection.title}>
                    <Prose segments={agentsSection.paragraphs[0]} className="mb-4" />
                    <Prose segments={agentsSection.paragraphs[1]} />
                </SectionHeading>

                <div className="max-w-3xl">
                    <CheckList items={agentsSection.capabilities} className="mt-8" />

                    <Prose segments={agentsSection.note} className="mt-8" />

                    <ArrowLink href="/ai-pam" className="mt-8">
                        See how AI-PAM governs agent privilege
                    </ArrowLink>
                </div>
            </Section>

            {/* ─── ONE MODEL (dark band) ────────────── */}
            <Section tone="dark" border="bottom">
                <SectionHeading title={modelSection.title}>
                    <Prose segments={modelSection.lead} />
                </SectionHeading>

                <IconCardGrid items={modelSteps} columns={4} className="mt-12" />

                <Prose segments={modelSection.note} className="mt-10" />
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
                subtitle="Common questions about AI threat protection, privileged access threat detection and containing AI-driven attacks."
                items={faqs}
            />
        </>
    );
}
