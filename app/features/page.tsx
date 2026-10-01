import type { Metadata } from "next";
import Link from "next/link";
import {
  UserCheck, Lock, Key, Eye, ArrowRight,
  Shield, Fingerprint, Building2,
  ShieldCheck, Link2, Radio, GitBranch,
  Users, Timer, Ban, ClipboardCheck, Terminal,
  ScanSearch, RotateCcw, KeyRound, Upload, ShieldAlert, UserPlus,
  Video, Activity, TrendingUp, ScrollText, Share2, FileCheck2,
  Network, BarChart3,
  AlertTriangle, Bot, Cpu, FileSearch, Zap,
} from "lucide-react";

import LogoMarquee from "@/components/sections/LogoMarquee";

export const metadata: Metadata = {
  title: "Features: Complete PAM Capabilities",
  description:
    "Explore OmniPriv's full feature set: Multi-factor authentication, RBAC, JIT access, credential vaulting, session recording, and compliance reporting for enterprise environments.",
};

const authFeatures = [
  { icon: ShieldCheck,  title: "Built-in CAPTCHA",             desc: "Configurable CAPTCHA protects login pages from automated brute-force attacks." },
  { icon: Network,      title: "LDAP / AD Integration",        desc: "Bidirectional sync with Active Directory and LDAP directories. Automatic user and group provisioning." },
  { icon: Link2,        title: "Single Sign-On (SSO)",         desc: "SAML 2.0, OAuth 2.0, and OpenID Connect support for seamless enterprise identity integration." },
  { icon: Fingerprint,  title: "Multi-Factor Authentication",  desc: "TOTP (Google Authenticator), FIDO2/WebAuthn hardware keys, SMS/email OTP, and push notifications." },
  { icon: Radio,        title: "RADIUS Support",               desc: "Manage network device authentication through the industry-standard RADIUS protocol." },
  { icon: GitBranch,    title: "Conditional Access",           desc: "Context-aware policies based on user location, device posture, time of day, and risk score." },
];

const authzFeatures = [
  { icon: Users,           title: "Role-Based Access Control (RBAC)", desc: "Fine-grained permission model with custom roles, assignable at the organization, project, or asset level." },
  { icon: Timer,           title: "Just-In-Time (JIT) Access",        desc: "Provision time-limited access for specific tasks. Access expires automatically—no standing privileges." },
  { icon: Ban,             title: "IP & Time-Based ACLs",             desc: "Restrict access by source IP range, day of week, and time window to enforce least-privilege policies." },
  { icon: Building2,       title: "Multi-Tenant Architecture",        desc: "Full resource isolation with per-organization policies, users, and assets. Ideal for MSSPs and enterprises with subsidiaries." },
  { icon: ClipboardCheck,  title: "Approval Workflows",               desc: "Require manager or peer approval before sensitive access is granted. Integrate with ITSM platforms." },
  { icon: Terminal,        title: "Command-Level Controls",           desc: "Whitelist or blacklist specific shell commands for SSH sessions. Block dangerous operations in real time." },
];

const accountFeatures = [
  { icon: ScanSearch,  title: "Asset & Account Discovery",     desc: "Automatically discover privileged accounts across your entire infrastructure — on-prem, cloud, and hybrid." },
  { icon: RotateCcw,   title: "Credential Rotation",           desc: "Rotate passwords, SSH keys, and API tokens on a schedule or on-demand, for thousands of assets simultaneously." },
  { icon: KeyRound,    title: "Encrypted Credential Vault",    desc: "Store credentials with AES-256 encryption. No user ever sees raw passwords — they authenticate through OmniPriv." },
  { icon: Upload,      title: "Credential Push",               desc: "Push updated credentials directly to target assets after rotation. No manual steps, no outages." },
  { icon: ShieldAlert, title: "Break-Glass Access",            desc: "Emergency access procedures with mandatory approval, time limits, and full session recording." },
  { icon: UserPlus,    title: "Account Lifecycle Management",  desc: "Provision, deprovision, and modify privileged accounts across all systems from a single control plane." },
];

const auditFeatures = [
  { icon: Video,       title: "HD Session Recording",        desc: "Record every privileged session in text (searchable) or video format. Replay any session from any point in time." },
  { icon: Activity,    title: "Real-Time Session Monitoring", desc: "Watch live sessions, send notifications to users, or terminate suspicious sessions in one click." },
  { icon: TrendingUp,  title: "Analytics Dashboards",        desc: "Executive-level risk dashboards showing access patterns, anomalies, and compliance status." },
  { icon: ScrollText,  title: "Command History",             desc: "Full keystroke logging and command execution history for every SSH and terminal session." },
  { icon: Share2,      title: "SIEM Integration",            desc: "Stream all events to Splunk, IBM QRadar, Elastic SIEM, or any syslog-compatible system." },
  { icon: FileCheck2,  title: "Compliance Reports",          desc: "One-click audit reports pre-formatted for SOC 2, ISO 27001, PCI-DSS, HIPAA, and more." },
];

const aiFeatures = [
  { icon: AlertTriangle, title: "ML Anomaly Detection",       desc: "IsolationForest scoring runs on every privileged login and session, catching lateral movement, credential harvesting and brute force in real time." },
  { icon: Fingerprint,   title: "Behavioural Analytics",      desc: "AI keystroke-dynamics and per-agent baselines flag impossible travel, off-hours access and deviation from learned behaviour." },
  { icon: ShieldCheck,   title: "Adaptive MFA Step-Up",      desc: "Keystroke rhythm, speed and pattern are compared against the identity's baseline at login — drift triggers an MFA challenge automatically." },
  { icon: Bot,           title: "AI Agent Governance",       desc: "Every MCP agent gets a verifiable identity, tool allowlist and data scope. More than 100 MCP tools sit under policy rather than under a borrowed human login." },
  { icon: UserCheck,     title: "Human-in-the-Loop Approval", desc: "High-risk agent actions — drop table, delete cluster, transfer funds — pause for explicit human approval before they execute." },
  { icon: Lock,          title: "Prompt-Injection Guard",     desc: "Even when an LLM's reasoning is manipulated, every tool call is re-verified against deterministic policy before it is allowed to run." },
  { icon: FileSearch,    title: "Agent Session Audit Trail", desc: "A full forensic trace from human to agent to MCP server to tool to resource — with decision, privilege level and duration recorded." },
  { icon: Zap,           title: "Automated Threat Response", desc: "Each session is scored 0–1 across 39 features and escalates in tiers: dashboard alert, then admin alert, then automatic block on a 10-second sweep." },
];

function FeatureSection({
  id, icon: Icon, title, subtitle, description, features, reverse = false, cta,
}: {
  id: string; icon: React.ElementType; title: string; subtitle: string; description: string;
  features: { icon: React.ElementType; title: string; desc: string }[]; reverse?: boolean;
  cta?: { href: string; label: string };
}) {
  return (
    <div id={id} className="scroll-mt-24 section-padding border-b border-slate-900/[0.05] dark:border-white/[0.04]">
      <div className="container-xl">
        <div className={`grid lg:grid-cols-2 gap-16 items-start ${reverse ? "lg:grid-flow-dense" : ""}`}>
          <div className={reverse ? "lg:col-start-2" : ""}>
            <div className="flex items-center gap-3 mb-5">
              <div className="icon-wrapper w-12 h-12 rounded-xl">
                <Icon className="w-6 h-6" />
              </div>
              <div className="badge-cyan">{subtitle}</div>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              {title}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">{description}</p>

            {cta && (
              <Link
                href={cta.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#00B8FF] hover:gap-3 transition-all"
              >
                {cta.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${reverse ? "lg:col-start-1 lg:row-start-1" : ""}`}>
            {features.map((f) => (
              <div key={f.title} className="feature-card group">
                <div className="feature-card-body p-5 flex flex-col">
                  <div className="icon-wrapper w-11 h-11 rounded-xl mb-4">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-bold text-slate-950 dark:text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>{f.title}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-16 pb-20 border-b border-slate-900/[0.05] dark:border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-[#030711]" />
        <div className="container-xl relative z-10 text-center">
          <div className="badge-cyan mb-6 inline-flex mx-auto">Platform Features</div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-950 dark:text-white mb-6 max-w-4xl mx-auto" style={{ fontFamily: "var(--font-syne)" }}>
            Complete <span className="text-gradient">PAM Feature Set</span> for Modern Enterprises
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
            Every capability your security team needs to manage privileged access, protect sensitive systems, and maintain continuous compliance — in one unified platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/demo" className="btn-primary text-base px-8 py-3.5">
              Talk to Sales <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Protocol & platform marquee — identical to the homepage banner,
          only the label differs. Was 16 hand-drawn inline SVG icons in a
          different chip style; now the real brand marks via the shared
          component. */}
      <LogoMarquee label="Supported Protocols &amp; Asset Types" />

      {/* Authentication */}
      <FeatureSection
        id="authentication"
        icon={UserCheck}
        title="Authentication: Verify Every Identity"
        subtitle="01: Authentication"
        description="Block unauthorized access with enterprise-grade identity verification. OmniPriv integrates seamlessly with your existing identity infrastructure while adding layers of protection that prevent credential abuse, account takeovers, and unauthorized entry."
        features={authFeatures}
      />

      {/* Authorization */}
      <FeatureSection
        id="authorization"
        icon={Lock}
        title="Authorization: Enforce Least Privilege"
        subtitle="02: Authorization"
        description="Prevent internal misuse and privilege escalation with granular access controls. Every access decision is policy-driven, time-limited, and fully logged — giving your security team complete control over who can do what, where, and when."
        features={authzFeatures}
        reverse
      />

      {/* Account Management */}
      <FeatureSection
        id="account"
        icon={Key}
        title="Account Management: Full Credential Lifecycle"
        subtitle="03: Account Management"
        description="Eliminate the credential hygiene problem that plagues enterprise IT. OmniPriv automates every aspect of privileged account management — from discovery to rotation to deprovisioning — so your team focuses on security, not manual credential tasks."
        features={accountFeatures}
      />

      {/* Audit */}
      <FeatureSection
        id="audit"
        icon={Eye}
        title="Audit & Compliance: Full Traceability"
        subtitle="04: Audit & Compliance"
        description="Every privileged action leaves a permanent, tamper-proof record in OmniPriv. Compliance teams can generate audit reports in minutes, security teams can investigate incidents in real time, and executives get the visibility they need to manage risk."
        features={auditFeatures}
        reverse
      />

      {/* AI & Automation */}
      <FeatureSection
        id="ai"
        icon={Cpu}
        title="AI & Automation: Intelligence on Every Privileged Action"
        subtitle="05: AI & Automation"
        description="OmniPriv's AI-PAM engine scores behaviour on every privileged action and governs autonomous agents through the same policy engine that governs people. Detection, approval and enforcement happen inside the platform, not in an analytics product bolted onto it."
        features={aiFeatures}
        cta={{ href: "/ai-pam", label: "Explore the AI-PAM engine" }}
      />

    </>  
  );
} 