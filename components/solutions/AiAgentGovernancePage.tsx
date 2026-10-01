import {
    AlertTriangle,
    Bot,
    Eye,
    KeyRound,
    ScrollText,
    ShieldCheck,
} from "lucide-react";

import ArrowLink from "@/components/sections/ArrowLink";
import CheckList from "@/components/sections/CheckList";
import CtaBand from "@/components/sections/CtaBand";
import FaqSection from "@/components/sections/FaqSection";
import MediaSplit from "@/components/sections/MediaSplit";
import Prose from "@/components/sections/Prose";
import Section from "@/components/sections/Section";
import SectionHeading from "@/components/sections/SectionHeading";
import SplitHero from "@/components/sections/SplitHero";
import { cardBorder, cardSurface, displayFont } from "@/lib/styles";
import type { FaqEntry } from "@/components/sections/FaqSection";
import type { RichText } from "@/lib/rich-text";

/*
 * Bespoke layout for /platform/ai-agent-governance — the destination of
 * the "AI Governance / Govern AI agents securely" challenge card.
 *
 * Routing still belongs to app/platform/[slug]/page.tsx, which renders this
 * component instead of the generic capability template when the slug appears
 * in its `bespokePages` map. That keeps all nine capability routes working
 * and lets any of them get a richer layout later without touching routing.
 */

const hero = {
    badge: "AI Agent Governance",
    titleLead: "AI agents are already in your environment.",
    titleAccent: "Identity is the control point.",
    intro: [
        "AI agents act for your teams but run on their own, at machine speed. They reach systems, call tools and cross your environment faster than anyone can review by hand.",
    ] as RichText,
    body: [
        "Most organizations cannot see which agents are running, what they can reach, or what they have already done. Traditional identity tooling was never designed for an identity that acts without a person at the keyboard. Zero Standing Privileges is the operating model — OmniPriv is how you get there.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/ai-pam", label: "Explore AI-PAM" },
    image: {
        src: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=1200&q=70",
        alt: "Circuit board shaped as a brain, representing autonomous AI agents running inside enterprise infrastructure",
    },
};

const identitySection = {
    icon: Bot,
    title: "A new identity class needs a new level of control",
    paragraphs: [
        [
            "An AI agent is owned by a person but is not that person. It authenticates like a machine identity, acts on its own, and may touch a dozen systems to complete a single task — reading a ticket, querying a database, opening a pull request, rotating a key.",
        ],
        [
            "That combination breaks the assumptions most access models rest on. Standing privilege, session-based review and manual sign-off all assume a human is the one doing the clicking. OmniPriv treats every agent as a first-class identity: its own verifiable credentials, its own permissions, its own audit trail.",
        ],
    ] as RichText[],
    grants: [
        "A verifiable identity of its own — never a borrowed human account",
        "An explicit tool allowlist, so it can only call what the task requires",
        "A data scope that bounds which records and resources it can read",
        "Human approval before any high-risk action is allowed to execute",
    ],
};

const riskSection = {
    icon: AlertTriangle,
    title: "The window between compromise and containment keeps shrinking",
    paragraphs: [
        [
            "Attackers are getting faster, and the same automation that helps your teams also helps them find and exploit weaknesses before anyone can respond. What does not change is what they are after: credentials, access, and the systems sitting behind them.",
        ],
        [
            "This is not a moment to wait and see. Scoped agents, injected credentials and recorded sessions remove the standing privilege that makes a breach worth pursuing in the first place.",
        ],
    ] as RichText[],
    image: {
        src: "https://images.unsplash.com/photo-1585079374502-415f8516dcc3?auto=format&fit=crop&w=1200&q=70",
        alt: "Glowing fingerprint on a dark circular scanner, representing verifiable identity for autonomous agents",
    },
};

const pillarsSection = {
    title: "How OmniPriv secures AI agents",
    lead: [
        "Securing AI agents is an identity problem. OmniPriv solves it across four areas: visibility, runtime enforcement, credential protection and session accountability.",
    ] as RichText,
};

const pillars = [
    {
        icon: Eye,
        title: "Visibility",
        text: "You cannot govern what you cannot see. OmniPriv inventories the agents, MCP servers and tools running in your environment, maps what each one can reach, and surfaces shadow AI that nobody registered.",
    },
    {
        icon: ShieldCheck,
        title: "Runtime enforcement",
        text: "Checking access at the door is not enough. OmniPriv evaluates every action — each tool call, query and command — against policy before it runs. Anything outside policy is blocked before it executes rather than interrupted partway through, and prompt-injection attempts are stopped at the same boundary.",
    },
    {
        icon: KeyRound,
        title: "Credential protection",
        text: "Agents are routinely granted more access than any single task needs. OmniPriv sits as a proxy between the agent and the databases, servers and cloud services it connects to. Access is scoped to the task, issued just-in-time, and the agent never holds the raw credential. With no standing access, there is nothing to steal.",
    },
    {
        icon: ScrollText,
        title: "Session accountability",
        text: "Every action ties back to a specific identity — the person directing the agent, or the service account it runs under. OmniPriv records each session in full, and behavioural analytics surface risky patterns and explain what happened. When an auditor asks what your agents did, you have an answer.",
    },
];

const stats = [
    { value: "39", label: "ML detection features", sub: "Behavioural analytics" },
    { value: "12", label: "Agent security pillars", sub: "Governance model" },
    { value: "100+", label: "MCP tools governed", sub: "Allowlist and data scope" },
    { value: "10s", label: "Anomaly sweep interval", sub: "Continuous detection" },
];

const closing = {
    title: "The controls are in place. Put them to work.",
    body: [
        "OmniPriv secures every identity in your environment — human, machine and AI.",
        "Every agent governed. Every credential protected. Every session recorded and explained.",
    ],
    kicker: "Nothing standing. Nothing shared. Nothing unrecorded.",
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/ai-pam", label: "Explore AI-PAM" },
};

const faqs: FaqEntry[] = [
    {
        question: "What is AI agent governance?",
        answer:
            "AI agent governance is the practice of giving every autonomous agent a verifiable identity, an explicit set of permitted tools, a bounded data scope and a recorded session history — so an agent can do its job without holding privileges nobody is watching.",
    },
    {
        question: "How does an MCP agent get its own identity?",
        answer:
            "Each MCP agent is registered as its own identity rather than borrowing a human account or sharing a service account. Credentials are issued to that identity just-in-time and revoked when the task ends.",
    },
    {
        question: "What is a tool allowlist and why does it matter?",
        answer:
            "A tool allowlist names the specific tools and MCP servers an agent is permitted to call. Everything else is refused at policy evaluation, which limits how far an agent can reach if it is manipulated or misconfigured.",
    },
    {
        question: "Can a human approve high-risk agent actions?",
        answer:
            "Yes. Actions classified as high risk are held for human approval before they execute. OmniPriv approval workflows support multiple approvers and time-based conditions, and no requester can approve their own request.",
    },
];

export default function AiAgentGovernancePage() {
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

            {/* ─── A NEW IDENTITY CLASS ─────────────── */}
            <Section tone="muted" border="bottom">
                <div className="max-w-3xl">
                    <div className="icon-wrapper mb-5">
                        <identitySection.icon className="w-5 h-5" />
                    </div>

                    <SectionHeading title={identitySection.title}>
                        {identitySection.paragraphs.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === identitySection.paragraphs.length - 1 ? "" : "mb-4"
                                }
                            />
                        ))}
                    </SectionHeading>
                </div>

                <CheckList items={identitySection.grants} className="mt-10 max-w-3xl" />
            </Section>

            {/* ─── THREAT WINDOW ────────────────────── */}
            <Section border="bottom">
                <MediaSplit media={riskSection.image} ratio="even" height="sm" align="start">
                    <div className="icon-wrapper mb-5">
                        <riskSection.icon className="w-5 h-5" />
                    </div>

                    <SectionHeading title={riskSection.title}>
                        {riskSection.paragraphs.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === riskSection.paragraphs.length - 1 ? "" : "mb-4"
                                }
                            />
                        ))}
                    </SectionHeading>

                    <ArrowLink href="/ai-pam" className="mt-8">
                        See how OmniPriv detects agent anomalies
                    </ArrowLink>
                </MediaSplit>
            </Section>

            {/* ─── THE FOUR AREAS (dark band) ───────── */}
            <Section tone="dark" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={pillarsSection.title} className="mb-2">
                        <Prose segments={pillarsSection.lead} />
                    </SectionHeading>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mt-14">
                    {pillars.map((pillar) => (
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

            {/* ─── OUTCOMES ─────────────────────────── */}
            <Section border="bottom">
                <SectionHeading
                    title="Governance you can point at"
                    align="center"
                    size="lg"
                    className="mb-12"
                >
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Agent security is not a policy document. These are the controls running
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
                            <div className="text-xs text-slate-500">{stat.sub}</div>
                        </div>
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
                subtitle="Common questions about governing autonomous AI agents under privileged access management."
                items={faqs}
            />
        </>
    );
}
