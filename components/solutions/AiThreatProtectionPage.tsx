import { Eye, Fingerprint, KeyRound, ScanSearch, ScrollText, Timer, Zap } from "lucide-react";

import SectionNav from "@/components/aipam/SectionNav";
import Spotlight from "@/components/aipam/Spotlight";
import { VaultVisual } from "@/components/aipam/Visuals";
import CheckChips from "@/components/pageui/CheckChips";
import { ClosingBand, FactsStrip, FaqSplit, Heading, KeepReading, PageHero, Paras, mutedBand, sectionLine } from "@/components/pageui/blocks";
import { RisksCard, SessionRecord } from "@/components/remote/Visuals";
import Prose from "@/components/sections/Prose";
import ThreatHero from "@/components/threat/ThreatHero";
import { AgentGuard, BlastRadius, ContainVisual, PatternScan } from "@/components/threat/Visuals";
import { cn } from "@/lib/utils";
import type { FaqEntry } from "@/components/sections/FaqAccordion";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * Bespoke layout for /platform/ai-threat-protection ("Defend Against
 * AI-Driven Threats"). Routing belongs to app/platform/[slug]/page.tsx; SEO
 * metadata comes from the module entry in app/platform/data.ts. The former
 * /platform/threat-detection URL 301s here (next.config.js).
 *
 * Copy is the marketing team's, kept verbatim with its links. Figures are
 * OmniPriv's own (39-feature model, 10-second sweep and grace). Built from the
 * shared page kit (components/pageui). Illustration values are illustrative.
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


const NAV = [
    { id: "atp-target", label: "Identity as target" },
    { id: "atp-privilege", label: "Zero standing privilege" },
    { id: "atp-credentials", label: "Credentials" },
    { id: "atp-detect", label: "Detect" },
    { id: "atp-contain", label: "Contain" },
    { id: "atp-agents", label: "AI agents" },
    { id: "atp-model", label: "One model" },
    { id: "atp-faq", label: "FAQ" },
];

const FACTS = [
    { value: 39, label: "behavioral features scored per privileged session" },
    { value: 10, suffix: "s", label: "sweep across active sessions, then a 10s grace window" },
    { value: 7, label: "threat patterns detected, from unusual commands to PAM bypass" },
    { value: 0, label: "standing privileges left for a compromised identity to use" },
];

const MONITOR_VALUES = [
    "svc-deploy · token verified",
    "Ran 18 commands on linux_prod_01",
    "02:14, outside the learned baseline",
    "Risk 0.86: lateral movement flagged",
    "Blocked by the sweep, closed after grace",
];

export default function AiThreatProtectionPage() {
    return (
        <div className="aip">
            <SectionNav items={NAV} startId="atp-hero" />
            <Spotlight />

            <PageHero
                id="atp-hero"
                titleLead={hero.titleLead}
                titleAccent={hero.titleAccent}
                paragraphs={[hero.intro, hero.body]}
                primary={hero.primary}
                secondary={hero.secondary}
                visual={<ThreatHero />}
            >
                <FactsStrip facts={FACTS} />
            </PageHero>

            {/* ─── IDENTITY IS THE TARGET ─────────────────────────── */}
            <section id="atp-target" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={targetSection.title} />
                            <Paras items={targetSection.paragraphs} className="mt-6" />
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <BlastRadius />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── ZERO STANDING PRIVILEGE (dark band) ────────────── */}
            <div className="dark">
                <section id="atp-privilege" className="relative overflow-hidden op-band-navy">
                    <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                    <div className="container-xl op-sec relative">
                        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                            <div className="min-w-0">
                                <Heading title={privilegeSection.title}>
                                    <Prose segments={privilegeSection.lead} className="text-[1.0625rem]" />
                                </Heading>
                                <h3 className="op-h3 mt-10" data-aos="fade-up">{privilegeSection.subheading}</h3>
                                <Prose segments={privilegeSection.body} className="mt-3 text-[1.0156rem]" />
                                <Prose segments={privilegeSection.note} tone="strong" className="mt-6 text-[1.0156rem]" />
                            </div>
                            <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                                <RisksCard risks={privilegeSection.reduces} title="Privilege an attacker could inherit" badge="Zero standing privilege" done="Removed" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* ─── CREDENTIALS ────────────────────────────────────── */}
            <section id="atp-credentials" className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={credentialsSection.title} />
                            <Paras items={credentialsSection.paragraphs} className="mt-6" />
                        </div>
                        <div className="min-w-0 aip-card rounded-3xl border p-6" data-aos="fade-up" data-aos-delay="100">
                            <div className="flex items-center justify-between gap-3">
                                <span className="op-card-title">Rotated on schedule or after each session</span>
                                <span className="text-[0.75rem] font-mono text-slate-500 shrink-0">illustrative</span>
                            </div>
                            <div className="mt-4">
                                <VaultVisual />
                            </div>
                            <p className="mt-4 text-[0.875rem] text-slate-600 dark:text-slate-400">A stolen secret stops working at the next rotation.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── DETECT ─────────────────────────────────────────── */}
            <section id="atp-detect" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={detectSection.title}>
                                <Prose segments={detectSection.lead} className="text-[1.0625rem]" />
                            </Heading>
                            <Prose segments={detectSection.note} tone="strong" className="mt-6 text-[1.0156rem]" />
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <PatternScan patterns={detectSection.patterns} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CONTAIN ────────────────────────────────────────── */}
            <section id="atp-contain" className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0 lg:order-2">
                            <Heading title={containSection.title} />
                            <Paras items={containSection.paragraphs} className="mt-6" />
                        </div>
                        <div className="min-w-0 lg:order-1" data-aos="fade-up" data-aos-delay="100">
                            <ContainVisual />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── MONITOR ────────────────────────────────────────── */}
            <section className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-start">
                        <div className="min-w-0">
                            <Heading title={monitorSection.title} />
                            <Paras items={monitorSection.paragraphs} className="mt-6" />
                            <Prose segments={monitorSection.note} tone="strong" className="mt-6 text-[1.0156rem]" />
                        </div>
                        <div className="min-w-0 lg:sticky lg:top-40" data-aos="fade-up" data-aos-delay="100">
                            <p className="mb-3 text-[0.9375rem] font-semibold text-[#0a1628] dark:text-white">{monitorSection.flowLabel}:</p>
                            <SessionRecord labels={monitorSection.flow} values={MONITOR_VALUES} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── AI AGENTS ──────────────────────────────────────── */}
            <section id="atp-agents" className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={agentsSection.title} />
                            <Paras items={agentsSection.paragraphs} className="mt-6" />
                            <p className="mt-6 pl-4 border-l-2 border-[#00B8DB] text-[1.0625rem] font-semibold text-[#0a1628] dark:text-white" data-aos="fade-up">
                                {agentsSection.note[0] as string}
                            </p>
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <AgentGuard capabilities={agentsSection.capabilities} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── ONE MODEL ──────────────────────────────────────── */}
            <section id="atp-model" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <Heading title={modelSection.title}>
                        <Prose segments={modelSection.lead} className="text-[1.0625rem]" />
                    </Heading>
                    <ol className="op-body grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {modelSteps.map((c, i) => (
                            <li key={c.title} className={cn("aip-card min-w-0 rounded-3xl border p-6", i === 6 && "lg:col-span-1")} data-aos="fade-up" data-aos-delay={String((i % 4) * 60)}>
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#00B8DB] text-[#03121c] shrink-0">
                                        <c.icon className="w-5 h-5" aria-hidden="true" />
                                    </span>
                                    <span className="text-[0.8125rem] font-semibold op-link">Step {i + 1}</span>
                                </div>
                                <h3 className="op-card-title mt-5">{c.title}</h3>
                                <p className="op-card-text mt-2">{c.text}</p>
                            </li>
                        ))}
                        <li className="min-w-0 rounded-3xl border border-[#00B8DB]/30 bg-[#00B8DB]/[0.07] p-6 flex flex-col justify-center" data-aos="fade-up">
                            <Prose segments={modelSection.note} className="text-[1rem]" />
                        </li>
                    </ol>
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
                accent={<CheckChips steps={["Reduce standing privilege", "Detect abnormal behavior", "Contain risky access"]} outcome="Complete accountability" />}
                body={closing.body}
                primary={closing.primary}
                secondary={closing.secondary}
            />

            <FaqSplit id="atp-faq" title="Frequently Asked Questions" items={faqs} />
        </div>
    );
}
