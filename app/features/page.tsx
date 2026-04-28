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
} from "lucide-react";

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

const protocolSupport = [
  { protocol: "SSH / SFTP", category: "Linux & Unix", color: "bg-blue-500/10 border-blue-500/20 text-blue-400" },
  { protocol: "RDP", category: "Windows", color: "bg-purple-500/10 border-purple-500/20 text-purple-400" },
  { protocol: "VNC", category: "Desktop", color: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" },
  { protocol: "Telnet / Serial", category: "Network Devices", color: "bg-orange-500/10 border-orange-500/20 text-orange-400" },
  { protocol: "MySQL", category: "Database", color: "bg-teal-500/10 border-teal-500/20 text-teal-400" },
  { protocol: "PostgreSQL", category: "Database", color: "bg-blue-500/10 border-blue-500/20 text-blue-300" },
  { protocol: "Oracle DB", category: "Database", color: "bg-red-500/10 border-red-500/20 text-red-400" },
  { protocol: "SQL Server", category: "Database", color: "bg-pink-500/10 border-pink-500/20 text-pink-400" },
  { protocol: "MongoDB", category: "Database", color: "bg-green-500/10 border-green-500/20 text-green-400" },
  { protocol: "Redis", category: "Database", color: "bg-rose-500/10 border-rose-500/20 text-rose-400" },
  { protocol: "Kubernetes", category: "Cloud Native", color: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" },
  { protocol: "Web Apps", category: "Web Access", color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" },
  { protocol: "RemoteApp", category: "Applications", color: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400" },
  { protocol: "AWS", category: "Cloud", color: "bg-amber-500/10 border-amber-500/20 text-amber-400" },
  { protocol: "Azure", category: "Cloud", color: "bg-blue-500/10 border-blue-500/20 text-blue-400" },
  { protocol: "GCP", category: "Cloud", color: "bg-red-500/10 border-red-500/20 text-red-300" },
];

function FeatureSection({
  id, icon: Icon, title, subtitle, description, features, reverse = false,
}: {
  id: string; icon: React.ElementType; title: string; subtitle: string; description: string;
  features: { icon: React.ElementType; title: string; desc: string }[]; reverse?: boolean;
}) {
  return (
    <div id={id} className="scroll-mt-24 section-padding border-b border-white/[0.04]">
      <div className="container-xl">
        <div className={`grid lg:grid-cols-2 gap-16 items-start ${reverse ? "lg:grid-flow-dense" : ""}`}>
          <div className={reverse ? "lg:col-start-2" : ""}>
            <div className="flex items-center gap-3 mb-5">
              <div className="icon-wrapper w-12 h-12 rounded-xl">
                <Icon className="w-6 h-6" />
              </div>
              <div className="badge-cyan">{subtitle}</div>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              {title}
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">{description}</p>

          </div>
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${reverse ? "lg:col-start-1 lg:row-start-1" : ""}`}>
            {features.map((f) => (
              <div key={f.title} className="feature-card group">
                <div className="feature-card-body p-5 flex flex-col">
                  <div className="icon-wrapper w-11 h-11 rounded-xl mb-4">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-bold text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>{f.title}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{f.desc}</div>
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
      <section className="relative pt-16 pb-20 border-b border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030711]" />
        <div className="container-xl relative z-10 text-center">
          <div className="badge-cyan mb-6 inline-flex mx-auto">Platform Features</div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 max-w-4xl mx-auto" style={{ fontFamily: "var(--font-syne)" }}>
            Complete <span className="text-gradient">PAM Feature Set</span> for Modern Enterprises
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Every capability your security team needs to manage privileged access, protect sensitive systems, and maintain continuous compliance — in one unified platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/demo" className="btn-primary text-base px-8 py-3.5">
              Talk to Sales <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Protocol Support — Scrolling Marquee */}
      <section className="py-14 border-b border-white/[0.04] bg-[#0A1628]/30 overflow-hidden">
        <div className="container-xl mb-8">
          <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest">
            Supported Protocols &amp; Asset Types
          </p>
        </div>

        {/* Row 1 */}
        <div className="marquee-wrapper mb-3">
          <div className="marquee-track">
            {[...Array(3)].flatMap((_, rep) => [
              { name: "SSH / SFTP", svg: <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7"><rect x="4" y="7" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.08" /><path d="M8 21h4M8 18h8M8 15h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg> },
              { name: "Windows RDP", svg: <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7"><path d="M4 10L14.5 8.5V16H4V10Z" fill="currentColor" opacity="0.7" /><path d="M16 8L28 6V16H16V8Z" fill="currentColor" opacity="0.7" /><path d="M4 17H14.5V25.5L4 24V17Z" fill="currentColor" opacity="0.7" /><path d="M16 17H28V28L16 26V17Z" fill="currentColor" opacity="0.7" /></svg> },
              { name: "VNC", svg: <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7"><rect x="5" y="6" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.3" fill="currentColor" fillOpacity="0.06" /><path d="M13 22H19V25H13Z" fill="currentColor" opacity="0.3" /><rect x="10" y="25" width="12" height="2" rx="1" fill="currentColor" opacity="0.4" /><circle cx="16" cy="14" r="3" stroke="currentColor" strokeWidth="1" fill="none" /></svg> },
              { name: "Kubernetes", svg: <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7"><path d="M16 4L27 10.5V21.5L16 28L5 21.5V10.5L16 4Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.2" /><circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.2" fill="none" /><path d="M16 13V8M16 19V24M13 14.5L9 12M19 17.5L23 20M13 17.5L9 20M19 14.5L23 12" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" /></svg> },
              { name: "MySQL", svg: <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7"><ellipse cx="16" cy="9" rx="9" ry="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.2" /><path d="M7 9V23C7 25.2 11 27 16 27C21 27 25 25.2 25 23V9" stroke="currentColor" strokeWidth="1.2" fill="none" /><path d="M7 16C7 18.2 11 20 16 20C21 20 25 18.2 25 16" stroke="currentColor" strokeWidth="0.8" opacity="0.4" /></svg> },
              { name: "PostgreSQL", svg: <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7"><ellipse cx="16" cy="9" rx="9" ry="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.2" /><path d="M7 9V23C7 25.2 11 27 16 27C21 27 25 25.2 25 23V9" stroke="currentColor" strokeWidth="1.2" fill="none" /><path d="M7 16C7 18.2 11 20 16 20C21 20 25 18.2 25 16" stroke="currentColor" strokeWidth="0.8" opacity="0.4" /><circle cx="16" cy="22" r="2" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.2" /></svg> },
              { name: "Oracle DB", svg: <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7"><rect x="5" y="11" width="22" height="10" rx="5" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.2" /><rect x="9" y="14" width="14" height="4" rx="2" stroke="currentColor" strokeWidth="0.8" fill="none" /></svg> },
              { name: "MongoDB", svg: <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7"><path d="M16 4C16 4 11 10 11 18C11 23 13 27 16 29C19 27 21 23 21 18C21 10 16 4 16 4Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.2" /><line x1="16" y1="12" x2="16" y2="24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg> },
            ].map((item, j) => (
              <div key={`r1-${rep}-${j}`} className="flex-shrink-0 flex items-center gap-3 px-7 py-3.5 mx-2 rounded-xl border border-white/[0.06] bg-[#0A1628]/50 hover:border-[#00B8FF]/25 hover:bg-[#0A1628]/80 transition-all duration-300 group cursor-default select-none">
                <div className="text-[#00B8FF]/70 group-hover:text-[#00B8FF] transition-colors">{item.svg}</div>
                <span className="text-slate-400 group-hover:text-white text-sm font-semibold tracking-wide transition-colors whitespace-nowrap">{item.name}</span>
              </div>
            )))}
          </div>
        </div>

        {/* Row 2 — reverse */}
        <div className="marquee-wrapper">
          <div className="marquee-track-reverse">
            {[...Array(3)].flatMap((_, rep) => [
              { name: "Redis", svg: <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7"><path d="M16 7L28 13L16 19L4 13L16 7Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" /><path d="M4 18L16 24L28 18" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" /><path d="M4 23L16 29L28 23" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.25" /></svg> },
              { name: "SQL Server", svg: <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7"><ellipse cx="16" cy="9" rx="9" ry="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.2" /><path d="M7 9V23C7 25.2 11 27 16 27C21 27 25 25.2 25 23V9" stroke="currentColor" strokeWidth="1.2" fill="none" /><path d="M12 15L15 18L21 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg> },
              { name: "Telnet / Serial", svg: <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7"><rect x="5" y="8" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.06" /><path d="M9 20h4M9 17h8M9 14h6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" /><circle cx="23" cy="14" r="1.5" fill="currentColor" opacity="0.4" /></svg> },
              { name: "Web Apps", svg: <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7"><circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.06" /><ellipse cx="16" cy="16" rx="4" ry="10" stroke="currentColor" strokeWidth="0.8" fill="none" /><path d="M6 16H26M7 11H25M7 21H25" stroke="currentColor" strokeWidth="0.6" opacity="0.4" /></svg> },
              { name: "RemoteApp", svg: <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7"><rect x="6" y="6" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.06" /><path d="M13 20H19V23H13Z" fill="currentColor" opacity="0.3" /><rect x="10" y="23" width="12" height="1.5" rx="0.75" fill="currentColor" opacity="0.4" /><rect x="10" y="10" width="6" height="4" rx="1" fill="currentColor" opacity="0.2" /></svg> },
              { name: "AWS", svg: <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7"><path d="M7 20C10 22 13 23 16 23C19 23 22 22 25 20" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /><path d="M23 21L26 19L24 23" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" /><path d="M11 9L16 18L21 9" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg> },
              { name: "Azure", svg: <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7"><path d="M10 25L17 7H14L7 22L10 25Z" fill="currentColor" opacity="0.5" /><path d="M17 7L23 22L17 25H27L17 7Z" fill="currentColor" opacity="0.7" /></svg> },
              { name: "GCP", svg: <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7"><path d="M20 8H12L6 16L12 24H20L26 16L20 8Z" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.2" /><circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.2" fill="none" /><path d="M19 11L22 8M13 11L10 8M13 21L10 24M19 21L22 24" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" /></svg> },
            ].map((item, j) => (
              <div key={`r2-${rep}-${j}`} className="flex-shrink-0 flex items-center gap-3 px-7 py-3.5 mx-2 rounded-xl border border-white/[0.06] bg-[#0A1628]/50 hover:border-[#00B8FF]/25 hover:bg-[#0A1628]/80 transition-all duration-300 group cursor-default select-none">
                <div className="text-[#00B8FF]/70 group-hover:text-[#00B8FF] transition-colors">{item.svg}</div>
                <span className="text-slate-400 group-hover:text-white text-sm font-semibold tracking-wide transition-colors whitespace-nowrap">{item.name}</span>
              </div>
            )))}
          </div>
        </div>
      </section>

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

    </>  
  );
} 