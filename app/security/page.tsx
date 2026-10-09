import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Shield, Lock, Eye, Fingerprint, Network, Server, Database,
  AlertTriangle, CheckCircle2, ArrowRight, ShieldCheck, Globe,
  Layers, Cpu, FileSearch, BarChart3, RefreshCw, UserCheck,
} from "lucide-react";

import IconCardGrid from "@/components/sections/IconCardGrid";
import SplitHero from "@/components/sections/SplitHero";

export const metadata: Metadata = {
  title: "Security: AI-Native Architecture & Compliance",
  description:
    "OmniPriv is built on AI-native security principles with encryption at rest and in transit, immutable audit logs, and controls mapped to the major compliance frameworks, including SOC 2, ISO 27001, NIST SP 800-53, HIPAA, PCI DSS and SOX 404.",
};

const securityPrinciples = [
  {
    icon: Shield,
    title: "AI-Native Security Architecture",
    image: {
      src: "/challenges/consolidate-pam-identity-security.jpeg",
      alt: "A central governed node routing allowed access paths and blocking untrusted ones",
    },
    description:
      "OmniPriv implements AI-native security at every layer. No user, device, or network is inherently trusted. Every access request is authenticated, authorized, and logged, regardless of origin.",
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
    image: {
      src: "/challenges/defend-ai-driven-threats.jpeg",
      alt: "A key, crown and vault illustrating encrypted, vaulted credentials",
    },
    description:
      "All data in transit is encrypted, and all stored data, credentials, session recordings and audit logs, is encrypted at rest. Encryption keys are held in hardware security modules rather than alongside the data they protect.",
    details: [
      "Encryption for all transport-layer communications",
      "Encryption at rest for every stored artefact",
      "Hardware-backed key management",
      "Per-tenant encryption key isolation",
    ],
  },
  {
    icon: Fingerprint,
    title: "Strong Identity Assurance",
    image: {
      src: "/challenges/reduce-privileged-identity-risk.jpeg",
      alt: "A privileged identity shielded while threat paths are blocked",
    },
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
    image: {
      src: "/challenges/audit-governance-compliance.jpeg",
      alt: "A central shield governing laptops, servers and cloud resources",
    },
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
    description: "The built-in credential vault encrypts every stored secret. No credentials are ever stored in plaintext.",
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

const frameworks = [
  {
    name: "SOC 2",
    icon: ShieldCheck,
    description: "Controls mapped to the Trust Services Criteria: security, availability, processing integrity, confidentiality, and privacy.",
  },
  {
    name: "ISO 27001",
    icon: Shield,
    description: "Information security management controls mapped to ISO 27001 across OmniPriv platform operations and development processes.",
  },
  {
    name: "NIST SP 800-53",
    icon: BarChart3,
    description: "Controls mapped to the federal security and privacy control catalogue used as the baseline for regulated environments.",
  },
  {
    name: "HIPAA",
    icon: UserCheck,
    description: "Business Associate Agreement (BAA) available. Controls mapped to the HIPAA Security Rule.",
  },
  {
    name: "PCI DSS",
    icon: Lock,
    description: "Controls mapped to PCI DSS requirements for environments that handle payment card data.",
  },
  {
    name: "SOX 404",
    icon: Globe,
    description: "Access governance and audit controls mapped to Section 404 financial-reporting requirements.",
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
      <SplitHero
        titleLead="Security is Our"
        titleAccent="Foundation"
        primary={{ href: "/demo", label: "Request a Security Briefing" }}
        media={{
          src: "/product/compliance.png",
          alt: "OmniPriv compliance dashboard showing security controls",
          fit: "contain",
        }}
      >
        <p>
          OmniPriv is built with security at its core, from AI-native architecture and end-to-end encryption to independent penetration testing and controls mapped to the major compliance frameworks.
        </p>
      </SplitHero>

      {/* Core Security Principles */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="section-heading" data-aos="fade-up">
            <h2 className="op-h2">
              Security Principles That <span className="text-gradient">Never Compromise</span>
            </h2>
          </div>

          <div className="op-body space-y-14 lg:space-y-20">
            {securityPrinciples.map((p) => (
              <div key={p.title} data-aos="fade-up">
                <h3 className="op-h3 mb-8">{p.title}</h3>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                  <div>
                    <p className="text-base leading-[1.7] text-slate-600 dark:text-slate-400">{p.description}</p>
                    <ul className="mt-6 space-y-3">
                      {p.details.map((d) => (
                        <li key={d} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#00667A] dark:text-[#00B8DB] flex-shrink-0 mt-1" aria-hidden="true" />
                          <span className="text-[0.9375rem] leading-[1.6] text-slate-700 dark:text-slate-300">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative w-full aspect-[3/1] rounded-2xl overflow-hidden border border-slate-900/[0.08] dark:border-white/[0.08]">
                    <Image
                      src={p.image.src}
                      alt={p.image.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 560px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Features Grid */}
      <section className="section-padding bg-slate-50 op-band-muted">
        <div className="container-xl">
          <div className="section-heading" data-aos="fade-up">
            <h2 className="op-h2">Defense in Depth</h2>
            <p className="op-lede">
              Multiple overlapping security controls at every layer of the stack.
            </p>
          </div>
          <IconCardGrid
            columns={4}
            className="op-body"
            items={securityFeatures.map((f) => ({ icon: f.icon, title: f.title, text: f.description }))}
          />
        </div>
      </section>

      {/* Compliance frameworks */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="section-heading" data-aos="fade-up">
            <h2 className="op-h2">
              Mapped to the Frameworks <span className="text-gradient">You Report Against</span>
            </h2>
            <p className="op-lede">
              OmniPriv&apos;s access, audit and encryption controls are mapped to the major security and compliance frameworks.
            </p>
          </div>

          <div className="op-body grid sm:grid-cols-2 lg:grid-cols-3 gap-5" data-aos="fade-up">
            {frameworks.map((fw) => (
              <div key={fw.name} className="rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171A] p-6 hover:border-[#00B8DB]/45 transition-colors">
                <div className="icon-wrapper mb-4">
                  <fw.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="op-card-title mb-2">{fw.name}</h3>
                <p className="op-card-text">{fw.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pen Testing */}
      <section className="section-padding bg-slate-50 op-band-muted">
        <div className="container-xl">
          <h2 className="op-h2 mb-6" data-aos="fade-up">
            Penetration Testing &amp; <span className="text-gradient">Vulnerability Research</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <p className="op-lede" data-aos="fade-up">
              Security cannot be assumed; it must be continuously verified. OmniPriv undergoes rigorous, independent security testing including white-box penetration testing, red team exercises, and bug bounty programs with the world&apos;s leading security researchers.
            </p>
            <dl className="rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171A] divide-y divide-slate-900/[0.06] dark:divide-white/[0.06]" data-aos="fade-up">
              {penTestFacts.map((f) => (
                <div key={f.label} className="flex flex-col sm:flex-row gap-1 sm:gap-4 p-5">
                  <dt className="text-sm font-semibold text-[#00667A] dark:text-[#00B8DB] sm:w-32 flex-shrink-0">{f.label}</dt>
                  <dd className="text-[0.9375rem] leading-[1.6] text-slate-700 dark:text-slate-300">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Responsible disclosure */}
      <div className="dark">
        <section className="op-band-navy section-padding">
          <div className="container-xl max-w-3xl mx-auto text-center" data-aos="fade-up">
            <h2 className="op-h2 op-h2-lg">Found a Security Vulnerability?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base sm:text-[1.0625rem] leading-[1.7] text-slate-400">
              We take all security reports seriously. Contact our security team at{" "}
              <a href="mailto:security@omnipriv.com" className="text-white font-semibold underline-offset-2 hover:underline">security@omnipriv.com</a> and we&apos;ll respond within 24 hours. Responsible disclosures are rewarded through our bug bounty program.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
