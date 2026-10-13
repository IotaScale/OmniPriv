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

import SectionNav from "@/components/aipam/SectionNav";
import Spotlight from "@/components/aipam/Spotlight";
import { FeaturesHero, JitTerminal, LiveAudit, LoginLayers, RotationRun, ScoreTiers } from "@/components/features/Visuals";
import { FactsStrip, FaqSplit, Heading, PageHero, mutedBand, sectionLine } from "@/components/pageui/blocks";
import LogoMarquee from "@/components/sections/LogoMarquee";
import { type FaqEntry } from "@/components/sections/FaqSection";
import { cn } from "@/lib/utils";

/*
 * /features. Built from the shared page kit (components/pageui) so it matches
 * the other redesigned pages. Copy is unchanged; values inside illustrations
 * are illustrative.
 */

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

type Feature = { icon: React.ElementType; title: string; desc: string };

const NAV = [
  { id: "authentication", label: "Authentication" },
  { id: "authorization", label: "Authorization" },
  { id: "account", label: "Accounts" },
  { id: "audit", label: "Audit" },
  { id: "ai", label: "AI & automation" },
  { id: "features-faq", label: "FAQ" },
];

const ALL = [authFeatures, authzFeatures, accountFeatures, auditFeatures, aiFeatures];

/* Counts come from this page; 6 frameworks and 39 features from its copy. */
const FACTS = [
  { value: ALL.length, label: "capability areas in one platform" },
  { value: ALL.reduce((s, g) => s + g.length, 0), label: "features across authentication, access, accounts, audit and AI" },
  { value: 6, label: "compliance frameworks in one-click audit reports" },
  { value: 39, label: "behavioural features scored on every session" },
];

function FeatureCards({ features, cols = 3 }: { features: Feature[]; cols?: 3 | 4 }) {
  return (
    <ul className={cn("op-body grid gap-4 sm:grid-cols-2", cols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
      {features.map((f, k) => (
        <li key={f.title} className="aip-card min-w-0 rounded-2xl border p-5 lg:p-6" data-aos="fade-up" data-aos-delay={String((k % cols) * 60)}>
          <span className="icon-wrapper">
            <f.icon className="w-5 h-5" aria-hidden="true" />
          </span>
          <h3 className="op-card-title mt-4">{f.title}</h3>
          <p className="op-card-text mt-2">{f.desc}</p>
        </li>
      ))}
    </ul>
  );
}

function FeatureSection({
  id, title, description, features, visual, reverse = false, muted = false, cols = 3, cta,
}: {
  id: string; title: string; description: string; features: Feature[]; visual: React.ReactNode;
  reverse?: boolean; muted?: boolean; cols?: 3 | 4; cta?: { href: string; label: string };
}) {
  return (
    <section id={id} className={cn(muted && mutedBand, sectionLine)}>
      <div className="container-xl op-sec">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
          <div className={cn("min-w-0", reverse && "lg:order-2")}>
            <Heading title={title}>
              <p className="text-[1.0625rem] text-slate-600 dark:text-slate-400">{description}</p>
            </Heading>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#00B8DB]/30 bg-[#00B8DB]/[0.07] px-3 py-1 text-[0.8125rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]" data-aos="fade-up">
              {features.length} features
            </span>
            {cta && (
              <div className="mt-6" data-aos="fade-up">
                <Link href={cta.href} className="op-link inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold group">
                  {cta.label}
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
          <div className={cn("min-w-0", reverse && "lg:order-1")} data-aos="fade-up" data-aos-delay="100">
            {visual}
          </div>
        </div>
        <FeatureCards features={features} cols={cols} />
      </div>
    </section>
  );
}

export default function FeaturesPage() {
  return (
    <div className="aip">
      <SectionNav items={NAV} startId="features-hero" />
      <Spotlight />

      <PageHero
        id="features-hero"
        titleLead={<>Complete <span className="text-gradient">PAM Feature Set</span> for Modern Enterprises</>}
        paragraphs={[["Every capability your security team needs to manage privileged access, protect sensitive systems, and maintain continuous compliance, in one unified platform."]]}
        primary={{ href: "/demo", label: "Talk to Sales" }}
        visual={<FeaturesHero />}
      >
        <FactsStrip facts={FACTS} />
      </PageHero>

      {/* Protocol & platform marquee, identical to the homepage banner,
          only the label differs. */}
      <LogoMarquee label="Supported Protocols &amp; Asset Types" />

      <FeatureSection
        id="authentication"
        title="Authentication: Verify Every Identity"
        description="Block unauthorized access with enterprise-grade identity verification. OmniPriv integrates seamlessly with your existing identity infrastructure while adding layers of protection that prevent credential abuse, account takeovers, and unauthorized entry."
        features={authFeatures}
        visual={<LoginLayers />}
        muted
      />

      <FeatureSection
        id="authorization"
        title="Authorization: Enforce Least Privilege"
        description="Prevent internal misuse and privilege escalation with granular access controls. Every access decision is policy-driven, time-limited, and fully logged, giving your security team complete control over who can do what, where, and when."
        features={authzFeatures}
        visual={<JitTerminal />}
        reverse
      />

      <FeatureSection
        id="account"
        title="Account Management: Full Credential Lifecycle"
        description="Eliminate the credential hygiene problem that plagues enterprise IT. OmniPriv automates every aspect of privileged account management, from discovery to rotation to deprovisioning, so your team focuses on security, not manual credential tasks."
        features={accountFeatures}
        visual={<RotationRun />}
        muted
      />

      <FeatureSection
        id="audit"
        title="Audit & Compliance: Full Traceability"
        description="Every privileged action leaves a permanent, tamper-proof record in OmniPriv. Compliance teams can generate audit reports in minutes, security teams can investigate incidents in real time, and executives get the visibility they need to manage risk."
        features={auditFeatures}
        visual={<LiveAudit />}
        reverse
      />

      {/* AI & Automation (dark band) */}
      <div className="dark">
        <div className="relative overflow-hidden op-band-navy">
          <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative">
            <FeatureSection
              id="ai"
              title="AI & Automation: Intelligence on Every Privileged Action"
              description="OmniPriv's AI-PAM engine scores behaviour on every privileged action and governs autonomous agents through the same policy engine that governs people. Detection, approval and enforcement happen inside the platform, not in an analytics product bolted onto it."
              features={aiFeatures}
              visual={<ScoreTiers />}
              cols={4}
              cta={{ href: "/ai-pam", label: "Explore the AI-PAM engine" }}
            />
          </div>
        </div>
      </div>

      <FaqSplit id="features-faq" title="Frequently Asked Questions" items={featureFaqs} />
    </div>
  );
}
