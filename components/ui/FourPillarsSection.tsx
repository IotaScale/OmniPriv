"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  UserCheck,
  Lock,
  Key,
  Eye,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  AlertTriangle,
  Fingerprint,
  Database,
  Server,
  RefreshCw,
  Video,
  FileCheck,
  Shield,
  Layers,
  Terminal,
  Activity
} from "lucide-react";

export const pillarsData = [
  {
    id: "authentication",
    number: "01",
    icon: UserCheck,
    title: "Authentication",
    subtitle: "Verify every identity, every time",
    description:
      "Prevent identity spoofing and credential reuse with an enterprise-grade privileged identity management solution. OmniPriv integrates with every major identity provider and enforces MFA at every access point.",
    features: [
      "Built-in CAPTCHA & brute-force protection",
      "LDAP / Active Directory integration & sync",
      "Single Sign-On (SSO) via OIDC, OAuth2, SAML2",
      "Multi-Factor Authentication (TOTP, FIDO2, SMS)",
      "RADIUS protocol support",
      "Conditional access policies",
    ],
    accentColor: "#00B8FF",
    glowGradient: "from-[#00B8FF]/10 via-[#00B8FF]/[0.02] to-transparent",
  },
  {
    id: "authorization",
    number: "02",
    icon: Lock,
    title: "Authorization",
    subtitle: "Enforce least-privilege access",
    description:
      "Stop internal misuse and privilege abuse before it happens. OmniPriv enforces granular access controls ensuring users can only access exactly what they need, when they need it.",
    features: [
      "Role-Based Access Control (RBAC)",
      "Just-In-Time (JIT) access provisioning",
      "Time-based & IP-restricted access windows",
      "Command-level ACL controls",
      "Multi-tenant organization architecture",
      "Approval workflows & ticket integration",
    ],
    accentColor: "#818cf8",
    glowGradient: "from-[#6366f1]/12 via-[#6366f1]/[0.02] to-transparent",
  },
  {
    id: "account",
    number: "03",
    icon: Key,
    title: "Account Management",
    subtitle: "Full credential lifecycle control",
    description:
      "Eliminate standing privileges and stale credentials. OmniPriv automates credential discovery, rotation, and secure storage so your team never has to handle raw passwords.",
    features: [
      "Automated credential discovery",
      "Scheduled credential rotation",
      "Encrypted credential vault & backup",
      "Push credentials to managed assets",
      "Privileged account lifecycle management",
      "Break-glass emergency access controls",
    ],
    accentColor: "#34d399",
    glowGradient: "from-[#10b981]/12 via-[#10b981]/[0.02] to-transparent",
  },
  {
    id: "audit",
    number: "04",
    icon: Eye,
    title: "Audit & Compliance",
    subtitle: "Full session visibility & traceability",
    description:
      "Maintain an unbreakable chain of evidence for every privileged action. OmniPriv's advanced PAM solutions record, index, and replay every session, giving compliance teams everything they need for audits.",
    features: [
      "HD session recording & indexed playback",
      "Real-time session monitoring & termination",
      "Complete login & operation history",
      "Command-level execution logs",
      "Automated compliance reporting",
      "SIEM & syslog integration",
    ],
    accentColor: "#38bdf8",
    glowGradient: "from-[#0284c7]/12 via-[#0284c7]/[0.02] to-transparent",
  },
];

/* ─────────────────────────────────────────────────────────────
   Pillar 1: Authentication Product Visual
───────────────────────────────────────────────────────────── */
function AuthenticationVisual({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="w-full rounded-xl border border-white/[0.08] bg-[#091222] p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#00B8FF]/15 border border-[#00B8FF]/30 flex items-center justify-center text-[#00B8FF]">
            <Fingerprint className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Identity Verification Pipeline</div>
            <div className="text-[10px] font-mono text-slate-400">Context-Aware Zero Trust</div>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Passed 100%
        </span>
      </div>

      {/* Identity Verification Nodes */}
      <div className="space-y-2.5 my-4">
        {/* Node 1: IdP SSO */}
        <div className="p-2.5 rounded-lg border border-white/[0.05] bg-[#060b14] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#00B8FF]" />
            <div>
              <div className="text-[11px] font-semibold text-slate-200">Identity Provider (IdP)</div>
              <div className="text-[9.5px] font-mono text-slate-400">Okta / Azure AD &middot; SAML 2.0 / OIDC</div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-semibold">SSO Verified</span>
        </div>

        {/* Node 2: MFA Challenge */}
        <div className="p-2.5 rounded-lg border border-white/[0.05] bg-[#060b14] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#00B8FF]" />
            <div>
              <div className="text-[11px] font-semibold text-slate-200">Security Challenge (MFA)</div>
              <div className="text-[9.5px] font-mono text-slate-400">FIDO2 Hardware Key &middot; WebAuthn</div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#00B8FF] font-semibold">Token Matched</span>
        </div>

        {/* Node 3: Device Posture & Directory Sync */}
        <div className="p-2.5 rounded-lg border border-white/[0.05] bg-[#060b14] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#00B8FF]" />
            <div>
              <div className="text-[11px] font-semibold text-slate-200">Directory &amp; Posture Sync</div>
              <div className="text-[9.5px] font-mono text-slate-400">corp.local / Active Directory &middot; Compliant</div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-400">4,820 Objects</span>
        </div>
      </div>

      {/* Footer Status */}
      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full bg-[#00B8FF] ${isHovered ? "animate-ping" : ""}`} />
          Brute-Force &amp; CAPTCHA Guard Active
        </span>
        <span className="text-slate-500">Latency: 48ms</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Pillar 2: Authorization Product Visual
───────────────────────────────────────────────────────────── */
function AuthorizationVisual({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="w-full rounded-xl border border-white/[0.08] bg-[#091222] p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#6366f1]/15 border border-[#6366f1]/30 flex items-center justify-center text-[#818cf8]">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Access Policy Enforcement</div>
            <div className="text-[10px] font-mono text-slate-400">Least-Privilege Engine (PoLP)</div>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
          Enforced
        </span>
      </div>

      {/* Policy Details */}
      <div className="space-y-2.5 my-4">
        {/* Request Details */}
        <div className="p-2.5 rounded-lg border border-white/[0.05] bg-[#060b14] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-slate-400">Target Asset Request</div>
            <div className="text-[11px] font-bold text-white flex items-center gap-1.5 mt-0.5">
              <Database className="w-3.5 h-3.5 text-[#00B8FF]" /> prod-db-01 &middot; PostgreSQL
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#818cf8] bg-[#6366f1]/10 px-2 py-0.5 rounded border border-[#6366f1]/20">
            JIT: 30 min
          </span>
        </div>

        {/* Policy Conditions */}
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="p-2 rounded bg-[#060b14] border border-white/[0.04]">
            <div className="text-slate-400 font-mono">Role Mapping:</div>
            <div className="font-semibold text-slate-200 mt-0.5">DB Administrator</div>
          </div>
          <div className="p-2 rounded bg-[#060b14] border border-white/[0.04]">
            <div className="text-slate-400 font-mono">Command ACL:</div>
            <div className="font-semibold text-indigo-300 mt-0.5">DROP/ALTER Filtered</div>
          </div>
        </div>

        {/* Dual Approval Badge */}
        <div className="p-2.5 rounded-lg border border-emerald-500/25 bg-emerald-500/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] font-semibold text-white">Multi-Party Authorization</span>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
            Approved 2/2
          </span>
        </div>
      </div>

      {/* Footer Status */}
      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-[#818cf8]" />
          Access Window: 29m 45s remaining
        </span>
        <span className="text-slate-500">Auto-Revoke Armed</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Pillar 3: Account Management Product Visual
───────────────────────────────────────────────────────────── */
function AccountManagementVisual({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="w-full rounded-xl border border-white/[0.08] bg-[#091222] p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#10b981]/15 border border-[#10b981]/30 flex items-center justify-center text-[#34d399]">
            <Key className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Credential Vault &amp; Lifecycle</div>
            <div className="text-[10px] font-mono text-slate-400">Hardware Security Module (HSM)</div>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          AES-256 Vaulted
        </span>
      </div>

      {/* Lifecycle Progression */}
      <div className="space-y-2.5 my-4">
        {/* Step 1: Discovered Account */}
        <div className="p-2.5 rounded-lg border border-white/[0.05] bg-[#060b14] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-slate-400">01</span>
            <div>
              <div className="text-[11px] font-semibold text-slate-200">Automated Discovery</div>
              <div className="text-[9.5px] font-mono text-slate-400">root@linux-srv-401 &middot; Unmanaged detected</div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#34d399]">Onboarded</span>
        </div>

        {/* Step 2: Encrypted Vaulting */}
        <div className="p-2.5 rounded-lg border border-white/[0.05] bg-[#060b14] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-slate-400">02</span>
            <div>
              <div className="text-[11px] font-semibold text-slate-200">Zero Plain-Text Vaulting</div>
              <div className="text-[9.5px] font-mono text-slate-400">KMS Key Sealed &middot; Ephemeral Tokens Only</div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">100% Sealed</span>
        </div>

        {/* Step 3: Scheduled Rotation */}
        <div className="p-2.5 rounded-lg border border-white/[0.05] bg-[#060b14] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-slate-400">03</span>
            <div>
              <div className="text-[11px] font-semibold text-slate-200">Scheduled Rotation Cycle</div>
              <div className="text-[9.5px] font-mono text-slate-400">Last rotated: 2h ago &middot; Next: in 22h</div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#00B8FF] flex items-center gap-1">
            <RefreshCw className="w-2.5 h-2.5" /> 24h Policy
          </span>
        </div>
      </div>

      {/* Footer Status */}
      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3 h-3 text-[#34d399]" />
          Zero Standing Passwords in Memory
        </span>
        <span className="text-slate-500">Break-Glass Ready</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Pillar 4: Audit & Compliance Product Visual
───────────────────────────────────────────────────────────── */
function AuditComplianceVisual({ isHovered }: { isHovered: boolean }) {
  return (
    <div className="w-full rounded-xl border border-white/[0.08] bg-[#091222] p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#00B8FF]/15 border border-[#00B8FF]/30 flex items-center justify-center text-[#38bdf8]">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Live Session Evidence &amp; Audit</div>
            <div className="text-[10px] font-mono text-slate-400">Immutable Cryptographic Log</div>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
          REC 1080p
        </span>
      </div>

      {/* Session Events Stream */}
      <div className="space-y-2 my-3 font-mono text-[10px]">
        {/* Normal event 1 */}
        <div className="p-2 rounded bg-[#060b14] border border-white/[0.04] flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="text-[#00B8FF]">&gt;</span>
            <span className="text-slate-300 truncate">11:02:14 &middot; TLS 1.3 Bastion handshake verified</span>
          </div>
          <span className="text-emerald-400 text-[9px] flex-shrink-0">OK</span>
        </div>

        {/* Normal event 2 */}
        <div className="p-2 rounded bg-[#060b14] border border-white/[0.04] flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="text-[#00B8FF]">&gt;</span>
            <span className="text-slate-300 truncate">11:03:02 &middot; sudo systemctl status postgresql</span>
          </div>
          <span className="text-emerald-400 text-[9px] flex-shrink-0">OK</span>
        </div>

        {/* Single Restrained Anomaly Event */}
        <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/25 flex items-start gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-amber-300 font-bold text-[10px]">
              11:04:19 &middot; Risk Alert: Unauthorized /etc/shadow read
            </div>
            <div className="text-amber-200/80 text-[9px] mt-0.5">
              Action: Blocked by command ACL &middot; Alert logged to SIEM
            </div>
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <FileCheck className="w-3 h-3 text-[#00B8FF]" />
          SHA-256 Hash Tamper-Proof Verified
        </span>
        <span className="text-slate-500">SOC 2 / ISO 27001</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main FourPillarsSection Component
───────────────────────────────────────────────────────────── */
export default function FourPillarsSection() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="capabilities" className="section-padding-lg relative overflow-hidden bg-[#060b17] border-y border-white/[0.05]">
      {/* Background subtle atmospheric glow */}
      <div
        className="absolute top-1/3 left-1/4 w-[700px] h-[400px] pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(ellipse, rgba(0, 184, 255, 0.08) 0%, transparent 65%)",
        }}
      />

      <div className="container-xl max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00B8FF]/25 bg-[#00B8FF]/[0.08] mb-5">
            <span className="text-[#00B8FF] text-xs font-semibold uppercase tracking-wider font-mono">
              Core Capabilities
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            The Four Pillars of Privileged Access Management
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            OmniPriv is built on the 4A framework — Authentication, Authorization, Account
            Management, and Audit — providing end-to-end coverage of every privileged access scenario
            in your enterprise. Built around the best practices for privileged access management, it helps organizations enforce least-privilege access, secure critical accounts, and monitor privileged activity in real time.
          </p>
        </div>

        {/* 4 Rich Alternating Product Cards */}
        <div className="space-y-8">
          {pillarsData.map((pillar, idx) => {
            const isHovered = hoveredCard === pillar.id;
            const isEven = idx % 2 === 0; // Card 1 & 3: Text Left, Visual Right. Card 2 & 4: Visual Left, Text Right

            return (
              <div
                key={pillar.id}
                id={pillar.id}
                onMouseEnter={() => setHoveredCard(pillar.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative rounded-2xl border transition-all duration-200 bg-[#070e1c] overflow-hidden ${
                  isHovered
                    ? "border-[#00B8FF]/45 -translate-y-1 shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_24px_rgba(0,184,255,0.06)]"
                    : "border-white/[0.08] hover:border-white/[0.16]"
                }`}
                style={{ minHeight: "380px" }}
              >
                {/* Subtle corner glow accent */}
                <div
                  className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl ${pillar.glowGradient} opacity-60 pointer-events-none transition-opacity duration-200`}
                />

                {/* Large Faded Pillar Number in Background (5-8% opacity) */}
                <div
                  className="absolute right-6 bottom-2 text-8xl sm:text-9xl font-black text-white/[0.04] select-none pointer-events-none font-mono"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {pillar.number}
                </div>

                <div className="relative z-10 p-6 sm:p-8 lg:p-10">
                  <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Content Column (7 cols on desktop) */}
                    <div
                      className={`lg:col-span-7 flex flex-col justify-between ${
                        isEven ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <div>
                        {/* Eyebrow number + Title */}
                        <div className="flex items-center gap-3.5 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#00B8FF]">
                            <pillar.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-mono font-bold text-[#00B8FF] uppercase tracking-wider">
                              Pillar {pillar.number}
                            </span>
                            <h3
                              className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
                              style={{ fontFamily: "var(--font-syne)" }}
                            >
                              {pillar.title}
                            </h3>
                          </div>
                        </div>

                        {/* Subtitle & Description */}
                        <p className="text-[#00B8FF] font-semibold text-sm mb-2.5">
                          {pillar.subtitle}
                        </p>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                          {pillar.description}
                        </p>

                        {/* Features List (2 columns on tablet/desktop) */}
                        <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
                          {pillar.features.map((feature) => (
                            <div
                              key={feature}
                              className="flex items-start gap-2.5 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] transition-colors"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#00B8FF] flex-shrink-0 mt-0.5" />
                              <span className="text-xs sm:text-sm text-slate-200 leading-snug">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Learn More link */}
                      <div>
                        <Link
                          href={`/platform#${pillar.id}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#00B8FF] hover:text-[#38bdf8] transition-colors group"
                        >
                          <span>Learn more about {pillar.title}</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>

                    {/* Product Visual Column (5 cols on desktop) */}
                    <div
                      className={`lg:col-span-5 w-full flex items-center justify-center ${
                        isEven ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      {pillar.id === "authentication" && (
                        <AuthenticationVisual isHovered={isHovered} />
                      )}
                      {pillar.id === "authorization" && (
                        <AuthorizationVisual isHovered={isHovered} />
                      )}
                      {pillar.id === "account" && (
                        <AccountManagementVisual isHovered={isHovered} />
                      )}
                      {pillar.id === "audit" && (
                        <AuditComplianceVisual isHovered={isHovered} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
