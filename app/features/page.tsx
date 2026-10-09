import type { Metadata } from "next";
import Link from "next/link";
import {
  UserCheck, Lock, ArrowRight,
  Fingerprint, Building2,
  ShieldCheck, Link2, Radio, GitBranch,
  Users, Timer, Ban, ClipboardCheck, Terminal,
  ScanSearch, RotateCcw, KeyRound, Upload, ShieldAlert, UserPlus,
  Video, Activity, TrendingUp, ScrollText, Share2, FileCheck2,
  Network,
  AlertTriangle, Bot, FileSearch, Zap,
} from "lucide-react";

import SplitHero from "@/components/sections/SplitHero";
import LogoMarquee from "@/components/sections/LogoMarquee";
import FaqSection, { type FaqEntry } from "@/components/sections/FaqSection";

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
  { icon: Timer,           title: "Just-In-Time (JIT) Access",        desc: "Provision time-limited access for specific tasks. Access expires automatically, no standing privileges." },
  { icon: Ban,             title: "IP & Time-Based ACLs",             desc: "Restrict access by source IP range, day of week, and time window to enforce least-privilege policies." },
  { icon: Building2,       title: "Multi-Tenant Architecture",        desc: "Full resource isolation with per-organization policies, users, and assets. Ideal for MSSPs and enterprises with subsidiaries." },
  { icon: ClipboardCheck,  title: "Approval Workflows",               desc: "Require manager or peer approval before sensitive access is granted. Integrate with ITSM platforms." },
  { icon: Terminal,        title: "Command-Level Controls",           desc: "Whitelist or blacklist specific shell commands for SSH sessions. Block dangerous operations in real time." },
];

const accountFeatures = [
  { icon: ScanSearch,  title: "Asset & Account Discovery",     desc: "Automatically discover privileged accounts across your entire infrastructure, on-prem, cloud, and hybrid." },
  { icon: RotateCcw,   title: "Credential Rotation",           desc: "Rotate passwords, SSH keys, and API tokens on a schedule or on-demand, for thousands of assets simultaneously." },
  { icon: KeyRound,    title: "Encrypted Credential Vault",    desc: "Store credentials in an encrypted vault. No user ever sees raw passwords, they authenticate through OmniPriv." },
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
  { icon: FileCheck2,  title: "Compliance Reports",          desc: "One-click audit reports pre-formatted for SOC 2, ISO 27001, NIST SP 800-53, HIPAA, PCI DSS and SOX 404." },
];

const aiFeatures = [
  { icon: AlertTriangle, title: "ML Anomaly Detection",       desc: "Machine-learning behavioural scoring runs on every privileged login and session, catching lateral movement, credential harvesting and brute force in real time." },
  { icon: Fingerprint,   title: "Behavioural Analytics",      desc: "AI keystroke-dynamics and per-agent baselines flag impossible travel, off-hours access and deviation from learned behaviour." },
  { icon: ShieldCheck,   title: "Adaptive MFA Step-Up",      desc: "Keystroke rhythm, speed and pattern are compared against the identity's baseline at login, drift triggers an MFA challenge automatically." },
  { icon: Bot,           title: "AI Agent Governance",       desc: "Every MCP agent gets a verifiable identity, tool allowlist and data scope. All 53 MCP tools sit under policy rather than under a borrowed human login." },
  { icon: UserCheck,     title: "Human-in-the-Loop Approval", desc: "High-risk agent actions, drop table, delete cluster, transfer funds, pause for explicit human approval before they execute." },
  { icon: Lock,          title: "Prompt-Injection Guard",     desc: "Even when an LLM's reasoning is manipulated, every tool call is re-verified against deterministic policy before it is allowed to run." },
  { icon: FileSearch,    title: "Agent Session Audit Trail", desc: "A full forensic trace from human to agent to MCP server to tool to resource, with decision, privilege level and duration recorded." },
  { icon: Zap,           title: "Automated Threat Response", desc: "Each session is scored 0-1 across 39 features and escalates in tiers: dashboard alert, then admin alert, then automatic block on a 10-second sweep." },
];

const featureFaqs: FaqEntry[] = [
  {
    question: "What does the OmniPriv platform include?",
    answer:
      "OmniPriv covers authentication, authorization, privileged account management, session audit and AI-driven controls in one platform. That means MFA and SSO, role-based and just-in-time access, credential vaulting and rotation, full session recording, and an AI engine that scores behaviour on every privileged action.",
  },
  {
    question: "Do we need to replace our existing identity provider?",
    answer:
      "No. OmniPriv works with the directory and identity infrastructure you already run: Active Directory and LDAP for directory sync, and SAML 2.0, OAuth 2.0 or OpenID Connect for single sign-on, with RADIUS for network devices. It adds privileged access controls on top of your identity provider rather than replacing it.",
  },
  {
    question: "How does just-in-time access differ from standard RBAC?",
    answer: [
      "RBAC decides what an identity is allowed to reach. Just-in-time access decides when, it provisions time-limited access for a specific task and revokes it automatically when the window closes.",
      "The result is no standing privilege: an account that is compromised outside an approved window has nothing to use.",
    ],
  },
  {
    question: "Can OmniPriv rotate credentials without manual work?",
    answer:
      "Yes. Passwords, SSH keys and API tokens can be rotated on a schedule or on demand, and the updated values are pushed directly to the target assets. No user ever sees the raw credential, they authenticate through OmniPriv instead.",
  },
  {
    question: "How are AI agents governed?",
    answer: [
      "Every MCP agent is given a verifiable identity, a tool allowlist and a data scope, so it operates under policy rather than through a borrowed human login.",
      "High-risk actions pause for explicit human approval, and each tool call is re-verified against deterministic policy before it runs, even when the model's own reasoning has been manipulated. Every session leaves a forensic trail from human to agent to tool to resource.",
    ],
  },
  {
    question: "Which compliance frameworks can OmniPriv report against?",
    answer:
      "Audit reporting covers SOC 2, ISO 27001, NIST SP 800-53, HIPAA, PCI DSS and SOX 404. Every privileged action is recorded with the identity, the access decision, the privilege level and the duration, so evidence is available without reconstructing it after an incident.",
  },
];

function FeatureSection({
  id, title, description, features, reverse = false, cta,
}: {
  id: string; title: string; description: string;
  features: { icon: React.ElementType; title: string; desc: string }[]; reverse?: boolean;
  cta?: { href: string; label: string };
}) {
  return (
    <section id={id} className="scroll-mt-24 section-padding border-b border-slate-900/[0.06] dark:border-white/[0.06]">
      <div className="container-xl">
        <h2 className="op-h2 mb-6" data-aos="fade-up">{title}</h2>

        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-start ${reverse ? "lg:grid-flow-dense" : ""}`}>
          <div className={reverse ? "lg:col-start-2" : ""} data-aos="fade-up">
            <p className="op-lede">{description}</p>

            {cta && (
              <Link
                href={cta.href}
                className="op-link font-semibold mt-6 inline-flex items-center gap-2 text-sm hover:underline underline-offset-2"
              >
                {cta.label}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            )}
          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${reverse ? "lg:col-start-1 lg:row-start-1" : ""}`} data-aos="fade-up">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex flex-col rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171A] p-6 hover:border-[#00B8DB]/45 transition-colors"
              >
                <div className="icon-wrapper mb-4">
                  <f.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="op-card-title mb-2">{f.title}</h3>
                <p className="op-card-text">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function FeaturesPage() {
  return (
    <>
      {/* Hero: copy left, product screenshot right (shared SplitHero). */}
      <SplitHero
        titleLead={<>Complete <span className="text-gradient">PAM Feature Set</span> for Modern Enterprises</>}
        primary={{ href: "/demo", label: "Talk to Sales" }}
        media={{
          src: "/product/dashboard.png",
          alt: "OmniPriv dashboard showing privileged sessions, assets and access activity",
          fit: "contain",
        }}
      >
        <p>
          Every capability your security team needs to manage privileged access, protect sensitive systems, and maintain continuous compliance, in one unified platform.
        </p>
      </SplitHero>

      {/* Protocol & platform marquee, identical to the homepage banner,
          only the label differs. */}
      <LogoMarquee label="Supported Protocols &amp; Asset Types" />

      {/* Authentication */}
      <FeatureSection
        id="authentication"
        title="Authentication: Verify Every Identity"
        description="Block unauthorized access with enterprise-grade identity verification. OmniPriv integrates seamlessly with your existing identity infrastructure while adding layers of protection that prevent credential abuse, account takeovers, and unauthorized entry."
        features={authFeatures}
      />

      {/* Authorization */}
      <FeatureSection
        id="authorization"
        title="Authorization: Enforce Least Privilege"
        description="Prevent internal misuse and privilege escalation with granular access controls. Every access decision is policy-driven, time-limited, and fully logged, giving your security team complete control over who can do what, where, and when."
        features={authzFeatures}
        reverse
      />

      {/* Account Management */}
      <FeatureSection
        id="account"
        title="Account Management: Full Credential Lifecycle"
        description="Eliminate the credential hygiene problem that plagues enterprise IT. OmniPriv automates every aspect of privileged account management, from discovery to rotation to deprovisioning, so your team focuses on security, not manual credential tasks."
        features={accountFeatures}
      />

      {/* Audit */}
      <FeatureSection
        id="audit"
        title="Audit & Compliance: Full Traceability"
        description="Every privileged action leaves a permanent, tamper-proof record in OmniPriv. Compliance teams can generate audit reports in minutes, security teams can investigate incidents in real time, and executives get the visibility they need to manage risk."
        features={auditFeatures}
        reverse
      />

      {/* AI & Automation */}
      <FeatureSection
        id="ai"
        title="AI & Automation: Intelligence on Every Privileged Action"
        description="OmniPriv's AI-PAM engine scores behaviour on every privileged action and governs autonomous agents through the same policy engine that governs people. Detection, approval and enforcement happen inside the platform, not in an analytics product bolted onto it."
        features={aiFeatures}
        cta={{ href: "/ai-pam", label: "Explore the AI-PAM engine" }}
      />

      {/* FAQ
          Closes the page. `FaqSection` rather than `FaqAccordion` so the band,
          the centred heading and the FAQPage structured data all come from the
          shared component and stay server-rendered. `tone="muted"` is set by
          the component itself, which keeps it alternating against the default
          surface of the AI section above. */}
      <FaqSection
        title="Frequently Asked Questions"
        subtitle="Common questions about deploying and running OmniPriv."
        items={featureFaqs}
      />

    </>  
  );
} 