import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield, Lock, Eye, Fingerprint, Network, Server, Database,
  AlertTriangle, CheckCircle2, ArrowRight, ShieldCheck, Globe,
  Key, Layers, Cpu, FileSearch, BarChart3, RefreshCw, UserCheck,
} from "lucide-react";
export const metadata: Metadata = {
  title: "Security: Zero-Trust Architecture & Compliance",
  description:
    "OmniPriv is built on zero-trust principles with AES-256 encryption, immutable audit logs, and comprehensive compliance certifications including SOC2, ISO 27001, HIPAA, and PCI-DSS.",
};

const securityPrinciples = [
  {
    icon: Shield,
    title: "Zero-Trust Architecture",
    description:
      "OmniPriv implements zero-trust at every layer. No user, device, or network is inherently trusted. Every access request is authenticated, authorized, and logged, regardless of origin.",
    details: [
      "Verify every identity before granting access",
      "Enforce least-privilege on every session",
      "Assume breach and log everything",
      "Micro-segment privileged access",
    ],
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description:
      "All data in transit is encrypted with TLS 1.3. All stored data (credentials, session recordings, audit logs) is encrypted at rest with AES-256-GCM. Encryption keys are managed with FIPS 140-2 Level 2 compliant HSMs.",
    details: [
      "TLS 1.3 for all transport layer communications",
      "AES-256-GCM for data at rest",
      "FIPS 140-2 Level 2 key management",
      "Per-tenant encryption key isolation",
    ],
  },
  {
    icon: Fingerprint,
    title: "Strong Identity Assurance",
    description:
      "OmniPriv enforces multi-factor authentication on every privileged session. Combined with SSO integration and contextual risk scoring, every access event is tied to a verified identity.",
    details: [
      "TOTP, FIDO2/WebAuthn, and pushbutton MFA",
      "Identity risk scoring and adaptive authentication",
      "Phishing-resistant hardware key support",
      "Session re-authentication for sensitive operations",
    ],
  },
  {
    icon: Eye,
    title: "Immutable Audit Trail",
    description:
      "Every privileged action produces a tamper-proof record. Cryptographically signed logs cannot be modified or deleted, even by administrators. This provides irrefutable evidence for forensic investigations and compliance audits.",
    details: [
      "Cryptographic signing of all session logs",
      "Write-once storage for audit records",
      "Chain-of-custody preservation",
      "Real-time SIEM streaming",
    ],
  },
];

const securityFeatures = [
  {
    icon: Network,
    title: "Network Isolation",
    description: "OmniPriv acts as a network proxy. Target systems are never directly exposed. All connections route through the controlled bastion layer.",
  },
  {
    icon: AlertTriangle,
    title: "Anomaly Detection",
    description: "Machine learning-based behavioral analysis detects unusual command patterns, access times, or data volumes, triggering automated alerts and session termination.",
  },
  {
    icon: RefreshCw,
    title: "Automated Secret Rotation",
    description: "Eliminate long-lived credentials. OmniPriv rotates passwords, SSH keys, and API tokens automatically, on schedule or post-session.",
  },
  {
    icon: Layers,
    title: "Role Separation",
    description: "Segregation of duties prevents administrators from accessing audit logs or modifying session recordings. Security and operations roles are enforced by the platform.",
  },
  {
    icon: Server,
    title: "Hardened Infrastructure",
    description: "OmniPriv's platform components are deployed with CIS Benchmark hardening, minimal attack surface, and regular vulnerability scanning.",
  },
  {
    icon: Database,
    title: "Secure Credential Storage",
    description: "The built-in credential vault uses AES-256 encryption with PBKDF2 key derivation. No credentials are ever stored in plaintext.",
  },
  {
    icon: FileSearch,
    title: "Vulnerability Management",
    description: "Continuous CVE monitoring with automated patch deployment. Critical vulnerabilities are addressed within 24 hours of disclosure.",
  },
  {
    icon: Cpu,
    title: "Supply Chain Security",
    description: "All software components are verified with cryptographic signatures. OmniPriv maintains a complete SBOM (Software Bill of Materials) for all releases.",
  },
];

const certs = [
  {
    name: "SOC 2 Type II",
    icon: ShieldCheck,
    description: "Annual third-party audit verifying security, availability, processing integrity, confidentiality, and privacy controls.",
    color: "border-blue-500/20 bg-blue-500/5",
    textColor: "text-blue-400",
  },
  {
    name: "ISO 27001",
    icon: Shield,
    description: "Information security management system certification covering all OmniPriv platform operations and development processes.",
    color: "border-teal-500/20 bg-teal-500/5",
    textColor: "text-teal-400",
  },
  {
    name: "PCI-DSS Level 1",
    icon: Lock,
    description: "Highest level of PCI compliance, validated by a Qualified Security Assessor (QSA). Suitable for payment card data environments.",
    color: "border-purple-500/20 bg-purple-500/5",
    textColor: "text-purple-400",
  },
  {
    name: "HIPAA",
    icon: UserCheck,
    description: "Business Associate Agreement (BAA) available. HIPAA Security Rule controls implemented and independently verified.",
    color: "border-rose-500/20 bg-rose-500/5",
    textColor: "text-rose-400",
  },
  {
    name: "GDPR",
    icon: Globe,
    description: "Full GDPR compliance including data processing agreements, data residency options, and privacy-by-design architecture.",
    color: "border-orange-500/20 bg-orange-500/5",
    textColor: "text-orange-400",
  },
  {
    name: "FedRAMP Ready",
    icon: BarChart3,
    description: "FedRAMP Moderate baseline controls implemented and documented. Authorizing agency engagement in progress.",
    color: "border-cyan-500/20 bg-cyan-500/5",
    textColor: "text-cyan-400",
  },
  {
    name: "NIST CSF",
    icon: Key,
    description: "Full NIST Cybersecurity Framework alignment across Identify, Protect, Detect, Respond, and Recover functions.",
    color: "border-emerald-500/20 bg-emerald-500/5",
    textColor: "text-emerald-400",
  },
  {
    name: "FIPS 140-2",
    icon: Fingerprint,
    description: "FIPS 140-2 validated cryptographic modules used for all key management and encryption operations.",
    color: "border-yellow-500/20 bg-yellow-500/5",
    textColor: "text-yellow-400",
  },
];

const penTestFacts = [
  { label: "Frequency", value: "Quarterly penetration testing by independent security firms" },
  { label: "Scope", value: "Full application, API, infrastructure, and red team assessments" },
  { label: "Bug Bounty", value: "Active Responsible Disclosure Program with rewards up to $50,000" },
  { label: "Remediation", value: "Critical findings patched within 24 hours of disclosure" },
  { label: "Transparency", value: "Executive summaries available to Enterprise customers under NDA" },
];

export default function SecurityPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-16 pb-20 border-b border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#07070E] pointer-events-none" />
        <div className="container-xl relative z-10 text-center">
          <div className="badge-cyan mb-6 inline-flex mx-auto">Security & Trust</div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 max-w-4xl mx-auto" style={{ fontFamily: "var(--font-syne)" }}>
            Security is Our <span className="text-accent">Foundation</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            OmniPriv is built with security at its core, from zero-trust architecture and end-to-end encryption to independent penetration testing and comprehensive compliance certifications.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/demo" className="btn-primary text-base px-8 py-3.5 inline-flex items-center gap-2">
              Request a Security Briefing <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Core Security Principles */}
      <section className="section-padding-lg">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="badge-cyan mb-5">Architecture</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              Security Principles That <span className="text-accent">Never Compromise</span>
            </h2>
          </div>

          <div className="space-y-6">
            {securityPrinciples.map((p, idx) => (
              <div key={p.title} className={`p-8 md:p-10 rounded-2xl border border-white/[0.07] bg-[#0E0E1C]/60 grid md:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? "md:grid-flow-dense" : ""}`}>
                <div className={idx % 2 === 1 ? "md:col-start-2" : ""}>
                  <div className="icon-wrapper mb-5">
                    <p.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>{p.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{p.description}</p>
                </div>
                <div className={idx % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}>
                  <div className="space-y-3">
                    {p.details.map((d) => (
                      <div key={d} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                        <CheckCircle2 className="w-4 h-4 text-[#6366F1] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features Grid */}
      <section className="section-padding border-y border-white/[0.04] bg-[#0E0E1C]/30">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              Defense in Depth
            </h2>
            <p className="text-slate-400 text-lg">
              Multiple overlapping security controls at every layer of the stack.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {securityFeatures.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-white/[0.06] bg-[#0E0E1C]/60 hover:border-[#6366F1]/20 transition-all card-shine group">
                <div className="icon-wrapper mb-4 w-10 h-10 rounded-lg">
                  <f.icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding-lg">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="badge-cyan mb-5">Certifications</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              Independently Verified Compliance
            </h2>
            <p className="text-slate-400 text-lg">
              Our certifications aren't marketing; they're independently audited, annually renewed proof of our security posture.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {certs.map((cert) => (
              <div key={cert.name} className={`p-6 rounded-2xl border ${cert.color} hover:border-opacity-40 transition-all group`}>
                <div className="flex items-center gap-3 mb-4">
                  <cert.icon className={`w-7 h-7 ${cert.textColor}`} />
                  <h3 className={`font-bold text-sm ${cert.textColor}`} style={{ fontFamily: "var(--font-syne)" }}>{cert.name}</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{cert.description}</p>
                <div className="mt-3 flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-green-400 font-semibold">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pen Testing */}
      <section className="section-padding border-y border-white/[0.04] bg-[#0E0E1C]/30">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="badge-cyan mb-6">Independent Testing</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                Penetration Testing & <span className="text-accent">Vulnerability Research</span>
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Security cannot be assumed; it must be continuously verified. OmniPriv undergoes rigorous, independent security testing including white-box penetration testing, red team exercises, and bug bounty programs with the world's leading security researchers.
              </p>
            </div>
            <div className="space-y-3">
              {penTestFacts.map((f) => (
                <div key={f.label} className="flex gap-4 p-4 rounded-xl border border-white/[0.05] bg-white/[0.02]">
                  <div className="text-xs font-bold text-[#6366F1] uppercase w-24 flex-shrink-0 pt-0.5">{f.label}</div>
                  <div className="text-sm text-slate-300">{f.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-xl text-center">
          <div className="badge-cyan mb-6 inline-flex mx-auto">Responsible Disclosure</div>
          <h2 className="text-3xl font-extrabold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
            Found a Security Vulnerability?
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            We take all security reports seriously. Contact our security team at{" "}
            <span className="text-white font-medium">security@omnipriv.com</span> and we&apos;ll respond within 24 hours. Responsible disclosures are rewarded through our bug bounty program.
          </p>
        </div>
      </section>
    </>
  );
}

