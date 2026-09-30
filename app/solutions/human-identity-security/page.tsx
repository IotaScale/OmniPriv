import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowRight,
    UserCheck,
    Code2,
    Users,
    Building2,
    CheckCircle2,
    KeyRound,
    Monitor,
    Sparkles,
    ScrollText,
} from "lucide-react";

export const metadata: Metadata = {
    title: {
        absolute: "Human Identity Security & PAM Solutions | OmniPriv",
    },
    description:
        "Secure admins, employees, developers, and vendors with OmniPriv human identity security, JIT access, least privilege, AI-driven detection, and PAM.",
};

/* People who need privileged access */
const personas = [
    {
        icon: UserCheck,
        title: "IT Administrators",
        text: "Control powerful administrative accounts with MFA, policy-based authorization, JIT access, and monitored sessions.",
    },
    {
        icon: Code2,
        title: "Developers & DevOps Teams",
        text: "Enable secure developer privileged access without exposing long-lived administrative credentials.",
    },
    {
        icon: Users,
        title: "Employees",
        text: "Apply least privilege and conditional access to reduce unnecessary employee privileged access.",
    },
    {
        icon: Building2,
        title: "Vendors & Contractors",
        text: "Secure third-party privileged access with approvals, time limits, credential protection, and session visibility.",
    },
];

/* The access lifecycle principle */
const lifecycle = ["Verify", "Authorize", "Grant", "Monitor", "Revoke"];

/* What session visibility gives security teams */
const sessionInsights = [
    "Who accessed a critical resource",
    "When the session started",
    "What actions were performed",
    "Whether suspicious behavior occurred",
    "How the privileged session ended",
];

/* Governance capabilities */
const governancePoints = [
    "Audit trails",
    "Privileged-account accountability",
    "Activity reporting",
    "Policy alerts",
    "Scheduled compliance reports",
];

const faqs = [
    {
        q: "What is human identity security?",
        a: "Human identity security protects employees, administrators, developers, contractors, and vendors by controlling how they authenticate and access sensitive enterprise resources.",
    },
    {
        q: "How does PAM protect human identities?",
        a: "Privileged Access Management adds least privilege, JIT access, credential protection, session monitoring, and audit controls to high-risk human access.",
    },
    {
        q: "What is just-in-time privileged access?",
        a: "JIT access provides elevated permissions only when required and removes them after the approved task or access period, reducing permanent privileged access.",
    },
    {
        q: "How does AI improve privileged identity security?",
        a: "AI and machine learning can analyze privileged behavior for unusual patterns. OmniPriv uses behavioral analysis to help identify suspicious commands, access times, and activity volumes.",
    },
];

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
};

/* Shared prose styling */
const prose = "text-slate-600 dark:text-slate-400 leading-relaxed";

export default function HumanIdentitySecurityPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* ─── HERO ─────────────────────────────── */}
            <section className="relative pt-16 pb-20 border-b border-slate-900/[0.05] dark:border-white/[0.04] overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-[#030711]" />
                <div
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[520px] pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse, rgba(0,184,255,0.08) 0%, transparent 65%)",
                    }}
                />

                <div className="container-xl relative z-10">
                    <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
                        <div>
                            <div className="badge-cyan mb-6 inline-flex">Human Identity Security</div>

                            <h1
                                className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 dark:text-white mb-6 leading-tight tracking-tight"
                                style={{ fontFamily: "var(--font-syne)" }}
                            >
                                Human Identity Security for the{" "}
                                <span className="text-gradient">AI-Enabled Enterprise</span>
                            </h1>

                            <p className={`text-lg ${prose} mb-5`}>
                                Human identities remain one of the most important access points to critical
                                infrastructure. Administrators, developers, employees, contractors, and
                                vendors often need elevated permissions — but permanent or excessive access
                                increases security risk.
                            </p>

                            <p className={`text-lg ${prose} mb-8`}>
                                OmniPriv delivers human identity security through enterprise{" "}
                                <Link
                                    href="https://omnipriv.com/"
                                    className="text-[#00B8FF] font-semibold hover:underline"
                                >
                                    Privileged Access Management
                                </Link>
                                , combining identity verification, least privilege, Just-in-Time access,
                                credential protection, session monitoring, and intelligent threat detection.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3.5">
                                <Link
                                    href="/demo"
                                    className="btn-primary text-base px-7 py-3.5 w-full sm:w-auto text-center"
                                >
                                    Request a Demo
                                    <ArrowRight className="w-5 h-5 ml-1.5" />
                                </Link>
                                <Link
                                    href="/platform"
                                    className="btn-secondary text-base px-7 py-3.5 w-full sm:w-auto text-center"
                                >
                                    Explore OmniPriv PAM
                                    <ArrowRight className="w-5 h-5 ml-1.5" />
                                </Link>
                            </div>
                        </div>

                        {/* Hero image */}
                        <div className="relative w-full h-64 sm:h-80 lg:h-[420px] rounded-2xl overflow-hidden border border-slate-900/[0.08] dark:border-white/[0.08]">
                            <Image
                                src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?auto=format&fit=crop&w=1200&q=70"
                                alt="Human identity security team reviewing privileged access with PAM"
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 560px"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── WHO NEEDS PRIVILEGED ACCESS ──────── */}
            <section className="section-padding-lg border-b border-slate-900/[0.05] dark:border-white/[0.04] bg-slate-50 dark:bg-[#050a14]">
                <div className="container-xl">
                    <div className="max-w-3xl mb-12">
                        <div className="badge-cyan mb-5 inline-flex">Who We Protect</div>
                        <h2
                            className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white mb-5 tracking-tight"
                            style={{ fontFamily: "var(--font-syne)" }}
                        >
                            Secure Every Human Identity with Privileged Access Control
                        </h2>
                        <p className={`text-lg ${prose} mb-4`}>
                            Modern organizations need more than authentication. They need to control what
                            users can access, when they can access it, and what they can do after access is
                            granted.
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 font-semibold">
                            OmniPriv protects privileged access for:
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {personas.map((persona) => (
                            <div
                                key={persona.title}
                                className="group flex flex-col rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.07] bg-white dark:bg-[#070e1c] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00B8FF]/40"
                            >
                                <div className="icon-wrapper mb-5">
                                    <persona.icon className="w-5 h-5" />
                                </div>
                                <h3
                                    className="text-lg font-bold text-slate-950 dark:text-white mb-2.5 tracking-tight"
                                    style={{ fontFamily: "var(--font-syne)" }}
                                >
                                    {persona.title}
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {persona.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    <p className={`text-base ${prose} mt-10 max-w-3xl`}>
                        OmniPriv integrates with enterprise identity providers, cloud platforms, SIEM, ITSM,
                        databases, and development environments.
                    </p>
                </div>
            </section>

            {/* ─── JIT ACCESS ───────────────────────── */}
            <section className="section-padding-lg border-b border-slate-900/[0.05] dark:border-white/[0.04]">
                <div className="container-xl">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div>
                            <div className="badge-cyan mb-5 inline-flex">Just-In-Time Access</div>
                            <h2
                                className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white mb-5 tracking-tight"
                                style={{ fontFamily: "var(--font-syne)" }}
                            >
                                Replace Standing Privileges with JIT Access
                            </h2>
                            <p className={`${prose} mb-4`}>
                                Permanent administrator permissions create unnecessary exposure.
                            </p>
                            <p className={`${prose} mb-4`}>
                                OmniPriv helps organizations apply just-in-time privileged access and
                                least-privilege policies so elevated access is provided only when required.
                            </p>
                            <p className={prose}>
                                This supports a Zero Standing Privileges strategy by reducing persistent
                                administrative rights and limiting how long powerful permissions remain
                                available.
                            </p>

                            <p className="text-slate-700 dark:text-slate-300 font-semibold mt-8 mb-4">
                                For modern human identity security, access should follow a simple principle:
                            </p>

                            {/* Lifecycle flow */}
                            <div className="flex flex-wrap items-center gap-2">
                                {lifecycle.map((step, i) => (
                                    <span key={step} className="flex items-center gap-2">
                                        <span className="px-3.5 py-2 rounded-lg border border-[#00B8FF]/25 bg-[#00B8FF]/[0.07] text-sm font-semibold text-[#00B8FF]">
                                            {step}
                                        </span>
                                        {i < lifecycle.length - 1 && (
                                            <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="relative w-full h-64 sm:h-80 lg:h-[400px] rounded-2xl overflow-hidden border border-slate-900/[0.08] dark:border-white/[0.08]">
                            <Image
                                src="https://images.unsplash.com/photo-1688380692117-63178554d76d?auto=format&fit=crop&w=1200&q=70"
                                alt="Engineer requesting just-in-time privileged access under human identity security policy"
                                fill
                                sizes="(max-width: 1024px) 100vw, 560px"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CREDENTIALS + SESSIONS (dark band) ── */}
            <div className="dark">
                <section className="section-padding-lg border-y border-slate-900/[0.05] dark:border-white/[0.04] bg-[#050b16]">
                    <div className="container-xl">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                            {/* Credentials */}
                            <div>
                                <div className="icon-wrapper mb-5">
                                    <KeyRound className="w-5 h-5" />
                                </div>
                                <h2
                                    className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white mb-5 tracking-tight"
                                    style={{ fontFamily: "var(--font-syne)" }}
                                >
                                    Protect Privileged Credentials
                                </h2>
                                <p className={`${prose} mb-4`}>
                                    Human users should not need unrestricted access to administrative
                                    passwords, SSH keys, or sensitive secrets.
                                </p>
                                <p className={`${prose} mb-4`}>
                                    OmniPriv combines privileged credential management with secure storage and
                                    automated secret rotation. Its{" "}
                                    <Link
                                        href="https://omnipriv.com/security"
                                        className="text-[#00B8FF] font-semibold hover:underline"
                                    >
                                        security architecture
                                    </Link>{" "}
                                    supports automatic rotation of passwords, SSH keys, and API tokens.
                                </p>
                                <p className={prose}>
                                    This helps reduce exposure from shared passwords, long-lived credentials,
                                    and unmanaged privileged accounts.
                                </p>
                            </div>

                            {/* Sessions */}
                            <div>
                                <div className="icon-wrapper mb-5">
                                    <Monitor className="w-5 h-5" />
                                </div>
                                <h2
                                    className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white mb-5 tracking-tight"
                                    style={{ fontFamily: "var(--font-syne)" }}
                                >
                                    Monitor Every Privileged Session
                                </h2>
                                <p className={`${prose} mb-4`}>Authentication is only the beginning.</p>
                                <p className={`${prose} mb-6`}>
                                    OmniPriv{" "}
                                    <Link
                                        href="https://omnipriv.com/platform/session-management"
                                        className="text-[#00B8FF] font-semibold hover:underline"
                                    >
                                        Privileged Session Management
                                    </Link>{" "}
                                    records, isolates, and monitors privileged activity across supported
                                    environments. Security teams gain searchable session histories, script
                                    monitoring, session controls, and the ability to intervene when required.
                                </p>

                                <p className="text-slate-700 dark:text-slate-300 font-semibold mb-4">
                                    This gives organizations visibility into:
                                </p>
                                <ul className="space-y-2.5">
                                    {sessionInsights.map((item) => (
                                        <li key={item} className="flex items-start gap-2.5">
                                            <CheckCircle2 className="w-4 h-4 text-[#00B8FF] flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-slate-700 dark:text-slate-300">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* ─── AI + GOVERNANCE ──────────────────── */}
            <section className="section-padding-lg border-b border-slate-900/[0.05] dark:border-white/[0.04]">
                <div className="container-xl">
                    {/* AI-driven intelligence */}
                    <div className="mb-16">
                        <div className="icon-wrapper mb-5">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <h2
                            className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white mb-5 tracking-tight max-w-3xl"
                            style={{ fontFamily: "var(--font-syne)" }}
                        >
                            Add AI-Driven Intelligence to Identity Security
                        </h2>
                        <div className="max-w-3xl">
                            <p className={`${prose} mb-4`}>
                                As organizations adopt AI and automation, workforce identity security needs
                                more context than static permissions alone.
                            </p>
                            <p className={`${prose} mb-4`}>
                                OmniPriv uses machine-learning-based behavioral analysis to identify unusual
                                command patterns, abnormal access times, and unexpected data volumes. Automated
                                alerts and session termination can help security teams respond to suspicious
                                activity faster.
                            </p>
                            <p className={prose}>
                                This AI-assisted approach strengthens{" "}
                                <Link
                                    href="https://omnipriv.com/blog/one-identity-privileged-access-management"
                                    className="text-[#00B8FF] font-semibold hover:underline"
                                >
                                    identity risk management
                                </Link>{" "}
                                by helping detect situations where a valid identity begins behaving
                                unexpectedly.
                            </p>
                        </div>
                    </div>

                    {/* Governance */}
                    <div>
                        <div className="icon-wrapper mb-5">
                            <ScrollText className="w-5 h-5" />
                        </div>
                        <h2
                            className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white mb-5 tracking-tight max-w-3xl"
                            style={{ fontFamily: "var(--font-syne)" }}
                        >
                            Strengthen Privileged Access Governance
                        </h2>
                        <div className="max-w-3xl">
                            <p className={`${prose} mb-6`}>
                                Effective privileged access governance requires clear accountability throughout
                                the access lifecycle.
                            </p>

                            <div className="flex flex-wrap gap-2.5 mb-6">
                                {governancePoints.map((point) => (
                                    <span
                                        key={point}
                                        className="px-3.5 py-2 rounded-lg border border-slate-900/[0.08] dark:border-white/[0.08] bg-slate-100/60 dark:bg-[#0A1628]/50 text-sm font-medium text-slate-700 dark:text-slate-300"
                                    >
                                        {point}
                                    </span>
                                ))}
                            </div>

                            <p className={prose}>
                                Together, these controls help organizations manage privileged user access
                                across cloud, on-premises, and hybrid infrastructure from a unified PAM
                                platform, supported by{" "}
                                <Link
                                    href="https://omnipriv.com/platform/audit-compliance"
                                    className="text-[#00B8FF] font-semibold hover:underline"
                                >
                                    audit and compliance reporting
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CLOSING ──────────────────────────── */}
            <div className="dark">
                <section className="section-padding-lg bg-[#050b16] border-b border-white/[0.06]">
                    <div className="container-xl max-w-4xl mx-auto text-center">
                        <div className="badge-cyan mb-6 inline-flex mx-auto">OmniPriv PAM</div>
                        <h2
                            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white mb-6 tracking-tight"
                            style={{ fontFamily: "var(--font-syne)" }}
                        >
                            Secure Human Identities Without Slowing Your Teams
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-4">
                            Modern users still need access to critical systems. The goal is to provide the
                            right person with the right privilege, for the right reason and the right amount
                            of time.
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-10">
                            OmniPriv combines human identity security, Privileged Access Management, JIT
                            access, credential protection, intelligent monitoring, and auditability to help
                            enterprises reduce privileged-access risk while keeping teams productive.
                        </p>

                        <p className="text-slate-950 dark:text-white font-semibold text-lg mb-6">
                            Ready to strengthen human privileged access?
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-3.5">
                            <Link href="/demo" className="btn-primary text-base px-8 py-3.5">
                                Request an OmniPriv Demo
                                <ArrowRight className="w-5 h-5 ml-1.5" />
                            </Link>
                            <Link href="/platform" className="btn-secondary text-base px-8 py-3.5">
                                Explore the Platform
                            </Link>
                        </div>
                    </div>
                </section>
            </div>

            {/* ─── FAQ ──────────────────────────────── */}
            <section className="section-padding-lg border-b border-slate-900/[0.05] dark:border-white/[0.04] bg-slate-50 dark:bg-[#050a14]">
                <div className="container-xl max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2
                            className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white mb-4 tracking-tight"
                            style={{ fontFamily: "var(--font-syne)" }}
                        >
                            Frequently Asked Questions
                        </h2>
                        <p className={prose}>
                            Common questions about human identity security, privileged access management and
                            JIT access.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq) => (
                            <div
                                key={faq.q}
                                className="rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.07] bg-white dark:bg-[#070e1c] p-6"
                            >
                                <h3
                                    className="text-lg font-bold text-slate-950 dark:text-white mb-3 tracking-tight"
                                    style={{ fontFamily: "var(--font-syne)" }}
                                >
                                    {faq.q}
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
