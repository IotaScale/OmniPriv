import Link from "next/link";
import {
    UserCheck,
    Lock,
    Key,
    Eye,
    ArrowRight,
    Fingerprint,
    ShieldCheck,
    RefreshCw,
    AlertTriangle,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Data — short, verb-first, one sentence per pillar.
   Full feature detail lives on the linked /platform pages.
───────────────────────────────────────────────────────────── */
export const pillarsData = [
    {
        id: "authentication",
        keyword: "Authentication",
        headline: "Prove every identity",
        body: "SSO, MFA, LDAP and conditional access enforced at every privileged entry point — with built-in brute-force and CAPTCHA protection.",
        href: "/platform/enterprise-integration",
        cta: "Explore authentication",
        icon: UserCheck,
        accent: "#00B8FF",
    },
    {
        id: "authorization",
        keyword: "Authorization",
        headline: "Enforce least privilege",
        body: "Role-based, just-in-time and time-boxed access with multi-party approval — so users reach exactly what they need, and nothing more.",
        href: "/platform/workflow-access-control",
        cta: "Explore authorization",
        icon: Lock,
        accent: "#818cf8",
    },
    {
        id: "account",
        keyword: "Account Management",
        headline: "Eliminate standing credentials",
        body: "Automated discovery, encrypted vaulting and scheduled rotation remove raw passwords from your team and your memory.",
        href: "/platform/password-credential-management",
        cta: "Explore account management",
        icon: Key,
        accent: "#34d399",
    },
    {
        id: "audit",
        keyword: "Audit & Compliance",
        headline: "Record every action",
        body: "Indexed session recording, command-level logs and tamper-proof evidence give auditors a complete, replayable chain of custody.",
        href: "/platform/audit-compliance",
        cta: "Explore audit & compliance",
        icon: Eye,
        accent: "#38bdf8",
    },
];

/* ─────────────────────────────────────────────────────────────
   Compact product visuals — one per pillar
───────────────────────────────────────────────────────────── */
function VisualShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full h-[132px] rounded-xl border border-slate-900/[0.07] dark:border-white/[0.06] bg-slate-50 dark:bg-[#060b14] p-3 flex flex-col justify-center gap-2 overflow-hidden">
            {children}
        </div>
    );
}

function AuthenticationVisual() {
    const rows = [
        { label: "Okta / Azure AD", meta: "SAML 2.0", status: "SSO" },
        { label: "FIDO2 Hardware Key", meta: "WebAuthn", status: "MFA" },
        { label: "Active Directory", meta: "4,820 objects", status: "SYNC" },
    ];
    return (
        <VisualShell>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#00B8FF] mb-0.5">
                <Fingerprint className="w-3 h-3" />
                IDENTITY PIPELINE
            </div>
            {rows.map((row) => (
                <div
                    key={row.label}
                    className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-md border border-slate-900/[0.05] dark:border-white/[0.05] bg-white dark:bg-[#091222]"
                >
                    <span className="text-[10.5px] font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {row.label}
                    </span>
                    <span className="text-[9px] font-mono text-emerald-400 flex-shrink-0">{row.status}</span>
                </div>
            ))}
        </VisualShell>
    );
}

function AuthorizationVisual() {
    return (
        <VisualShell>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#818cf8] mb-0.5">
                <ShieldCheck className="w-3 h-3" />
                ACCESS POLICY
            </div>
            <div className="px-2 py-1.5 rounded-md border border-slate-900/[0.05] dark:border-white/[0.05] bg-white dark:bg-[#091222]">
                <div className="text-[10.5px] font-semibold text-slate-800 dark:text-slate-200 truncate">
                    prod-db-01 &middot; Production DB
                </div>
                <div className="text-[9px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                    JIT window &middot; DROP / ALTER filtered
                </div>
            </div>
            <div className="flex items-center justify-between px-2 py-1.5 rounded-md border border-emerald-500/25 bg-emerald-500/[0.07]">
                <span className="text-[10px] font-semibold text-slate-800 dark:text-slate-200">Approval</span>
                <span className="text-[9px] font-mono font-bold text-emerald-400">2 / 2 GRANTED</span>
            </div>
        </VisualShell>
    );
}

function AccountManagementVisual() {
    return (
        <VisualShell>
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#34d399] mb-0.5">
                <RefreshCw className="w-3 h-3" />
                CREDENTIAL VAULT
            </div>
            <div className="px-2 py-1.5 rounded-md border border-slate-900/[0.05] dark:border-white/[0.05] bg-white dark:bg-[#091222]">
                <div className="text-[10.5px] font-semibold text-slate-800 dark:text-slate-200 truncate">
                    root@linux-srv-401
                </div>
                <div className="text-[9px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                    Auto-discovered &middot; Encrypted at rest
                </div>
            </div>
            <div className="flex items-center justify-between px-2 py-1.5 rounded-md border border-slate-900/[0.05] dark:border-white/[0.05] bg-white dark:bg-[#091222]">
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Next rotation</span>
                <span className="text-[9px] font-mono font-bold text-[#00B8FF]">IN 22H</span>
            </div>
        </VisualShell>
    );
}

function AuditComplianceVisual() {
    return (
        <VisualShell>
            <div className="flex items-center justify-between mb-0.5">
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#38bdf8]">
                    <Eye className="w-3 h-3" />
                    SESSION LOG
                </span>
                <span className="flex items-center gap-1 text-[9px] font-mono text-red-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    REC
                </span>
            </div>
            <div className="px-2 py-1.5 rounded-md border border-slate-900/[0.05] dark:border-white/[0.05] bg-white dark:bg-[#091222] text-[9.5px] font-mono text-slate-600 dark:text-slate-400 truncate">
                <span className="text-emerald-400">OK</span> &nbsp;sudo systemctl status prod-db
            </div>
            <div className="px-2 py-1.5 rounded-md border border-amber-500/25 bg-amber-500/[0.08] flex items-center gap-1.5">
                <AlertTriangle className="w-3 h-3 text-amber-400 flex-shrink-0" />
                <span className="text-[9.5px] font-mono text-amber-600 dark:text-amber-300 truncate">
                    /etc/shadow read &mdash; blocked
                </span>
            </div>
        </VisualShell>
    );
}

const visuals: Record<string, () => React.JSX.Element> = {
    authentication: AuthenticationVisual,
    authorization: AuthorizationVisual,
    account: AccountManagementVisual,
    audit: AuditComplianceVisual,
};

/* ─────────────────────────────────────────────────────────────
   Section
───────────────────────────────────────────────────────────── */
export default function FourPillarsSection() {
    return (
        <section
            id="capabilities"
            className="section-padding relative overflow-hidden bg-slate-50 dark:bg-[#060b17] border-b border-slate-900/[0.05] dark:border-white/[0.04]"
        >
            <div
                className="absolute top-1/3 left-1/4 w-[700px] h-[400px] pointer-events-none opacity-20"
                style={{
                    background:
                        "radial-gradient(ellipse, rgba(0, 184, 255, 0.08) 0%, transparent 65%)",
                }}
            />

            <div className="container-xl relative z-10">
                {/* Header — badge, short title, one sentence */}
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <div className="badge-cyan mb-5 inline-flex">Core Capabilities</div>
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white mb-5 tracking-tight"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        The Four Pillars of{" "}
                        <span className="text-gradient">Privileged Access Management</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                        One governed platform covering the full 4A framework &mdash; authenticate,
                        authorize, manage, audit.
                    </p>
                </div>

                {/* 4 compact cards */}
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
                    {pillarsData.map((pillar) => {
                        const Visual = visuals[pillar.id];
                        return (
                            <div
                                key={pillar.id}
                                id={pillar.id}
                                className="group relative flex flex-col rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.07] bg-white dark:bg-[#070e1c] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#00B8FF]/40 hover:shadow-[0_8px_20px_rgba(0,0,0,0.10)]"
                            >
                                <Visual />

                                <div className="h-px w-full bg-slate-900/[0.07] dark:bg-white/[0.07] my-4" />

                                <div
                                    className="text-[10.5px] font-mono font-bold uppercase tracking-[0.14em] mb-2"
                                    style={{ color: pillar.accent }}
                                >
                                    {pillar.keyword}
                                </div>

                                <h3
                                    className="text-xl font-bold text-slate-950 dark:text-white tracking-tight mb-2.5"
                                    style={{ fontFamily: "var(--font-syne)" }}
                                >
                                    {pillar.headline}
                                </h3>

                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5 flex-1">
                                    {pillar.body}
                                </p>

                                <Link
                                    href={pillar.href}
                                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00B8FF] hover:text-[#38bdf8] group-hover:gap-2.5 transition-all duration-300"
                                >
                                    {pillar.cta}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
