import type { Metadata } from "next";
import {
  Shield, Lock, Eye, Fingerprint, Network, Server, Database,
  AlertTriangle, ShieldCheck, Globe,
  Layers, Cpu, FileSearch, BarChart3, RefreshCw, UserCheck,
} from "lucide-react";

import SectionNav from "@/components/aipam/SectionNav";
import Spotlight from "@/components/aipam/Spotlight";
import { ChainVisual, PathVisual } from "@/components/appsec/Visuals";
import CheckChips from "@/components/pageui/CheckChips";
import { FactsStrip, Heading, PageHero, mutedBand, sectionLine } from "@/components/pageui/blocks";
import { IdentityVisual, SecurityHero, TrustVisual } from "@/components/security/Visuals";
import CheckList from "@/components/sections/CheckList";
import { cn } from "@/lib/utils";

/*
 * /security. Copy unchanged; layout rebuilt on the shared page kit
 * (components/pageui) so it matches the redesigned pages. Each principle now
 * carries an illustration of the control instead of a stock image. Values in
 * illustrations are illustrative.
 */

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
      "All data in transit is encrypted, and all stored data, credentials, session recordings and audit logs, is encrypted at rest. Keys sit in a layered key hierarchy (KEK, DEK, SEK) rather than alongside the data they protect.",
    details: [
      "Encryption for all transport-layer communications",
      "Encryption at rest for every stored artefact",
      "Layered key hierarchy: KEK, DEK and SEK",
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
    description: "Continuous CVE monitoring with automated patch deployment.",
  },
  {
    icon: Cpu,
    title: "Supply Chain Security",
    description: "All software components are verified with cryptographic signatures.",
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

const PRINCIPLE_VISUAL = [<TrustVisual key="t" />, <PathVisual key="p" />, <IdentityVisual key="i" />, <ChainVisual key="c" />];

const NAV = [
  { id: "sc-principles", label: "Principles" },
  { id: "sc-depth", label: "Defense in depth" },
  { id: "sc-frameworks", label: "Frameworks" },
  { id: "sc-disclosure", label: "Disclosure" },
];

/* Counted from this page, plus the verified audit-chain checkpoint interval. */
const FACTS = [
  { value: frameworks.length, label: "compliance frameworks the controls are mapped to" },
  { value: securityPrinciples.length, label: "security principles applied at every layer" },
  { value: securityFeatures.length, label: "overlapping controls, from network to supply chain" },
  { value: 50, label: "audit rows per HMAC-SHA256 integrity checkpoint" },
];

export default function SecurityPage() {
  return (
    <div className="aip">
      <SectionNav items={NAV} startId="sc-hero" />
      <Spotlight />

      <PageHero
        id="sc-hero"
        titleLead="Security is Our"
        titleAccent="Foundation"
        paragraphs={[["OmniPriv is built with security at its core, from AI-native architecture and end-to-end encryption to controls mapped to the major compliance frameworks."]]}
        primary={{ href: "/demo?intent=security", label: "Request a Security Briefing" }}
        secondary={{ href: "mailto:security@omnipriv.com", label: "Report a Vulnerability" }}
        visual={<SecurityHero />}
      >
        <FactsStrip facts={FACTS} />
      </PageHero>

      {/* ─── PRINCIPLES ──────────────────────────────────── */}
      <section id="sc-principles" className={cn(mutedBand, sectionLine)}>
        <div className="container-xl op-sec space-y-20 lg:space-y-24">
          <Heading title={<>Security Principles That <span className="text-gradient">Never Compromise</span></>} />
          {securityPrinciples.map((p, i) => (
            <div key={p.title} className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
              <div className={cn("min-w-0", i % 2 === 1 && "lg:order-2")}>
                <div className="flex items-center gap-3" data-aos="fade-up">
                  <span className="icon-wrapper shrink-0">
                    <p.icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <h3 className="op-h3">{p.title}</h3>
                </div>
                <p className="mt-5 text-[1.0156rem] leading-[1.7] text-slate-600 dark:text-slate-400" data-aos="fade-up">
                  {p.description}
                </p>
                <CheckList items={p.details} className="mt-6" />
              </div>
              <div className={cn("min-w-0", i % 2 === 1 && "lg:order-1")} data-aos="fade-up" data-aos-delay="100">
                {PRINCIPLE_VISUAL[i]}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── DEFENSE IN DEPTH ───────────────────────────── */}
      <section id="sc-depth" className={sectionLine}>
        <div className="container-xl op-sec">
          <Heading title="Defense in Depth">
            <p>Multiple overlapping security controls at every layer of the stack.</p>
          </Heading>
          <ul className="op-body grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {securityFeatures.map((f, i) => (
              <li key={f.title} className="aip-card group min-w-0 rounded-3xl border p-6" data-aos="fade-up" data-aos-delay={String((i % 4) * 60)}>
                <span className="icon-wrapper transition-colors duration-200 group-hover:bg-[#00B8DB] group-hover:text-[#03121c]">
                  <f.icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="op-card-title mt-5">{f.title}</h3>
                <p className="op-card-text mt-2">{f.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── FRAMEWORKS ─────────────────────────────────── */}
      <section id="sc-frameworks" className={cn(mutedBand, sectionLine)}>
        <div className="container-xl op-sec">
          <Heading title={<>Mapped to the Frameworks <span className="text-gradient">You Report Against</span></>}>
            <p>OmniPriv&apos;s access, audit and encryption controls are mapped to the major security and compliance frameworks.</p>
          </Heading>
          <ul className="op-body grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {frameworks.map((fw, i) => (
              <li key={fw.name} className="aip-card min-w-0 rounded-3xl border p-6" data-aos="fade-up" data-aos-delay={String((i % 3) * 70)}>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-3">
                    <span className="icon-wrapper shrink-0">
                      <fw.icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <span className="text-[1.25rem] font-bold tracking-[-0.02em] text-[#0a1628] dark:text-white" style={{ fontFamily: "var(--font-syne)" }}>
                      {fw.name}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#00B8DB]/10 px-2.5 py-1 text-[0.6875rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]">
                    <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" /> Mapped
                  </span>
                </div>
                <p className="op-card-text mt-4">{fw.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── RESPONSIBLE DISCLOSURE ─────────────────────── */}
      <section id="sc-disclosure" className={sectionLine}>
        <div className="container-xl op-sec">
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a] p-8 lg:p-12" data-aos="fade-up">
            <div className="pointer-events-none absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(0,184,219,0.18),transparent_65%)]" aria-hidden="true" />
            <div className="relative grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] gap-8 items-center">
              <div className="min-w-0">
                <h2 className="op-h2">Found a Security Vulnerability?</h2>
                <p className="mt-4 max-w-2xl text-[1.0156rem] leading-[1.7] text-slate-600 dark:text-slate-400">
                  We take all security reports seriously. Contact our security team at{" "}
                  <a href="mailto:security@omnipriv.com" className="font-semibold op-link underline-offset-2 hover:underline">security@omnipriv.com</a>. Please share the details privately so we can investigate and coordinate a fix before anything is made public.
                </p>
                <div className="mt-6">
                  <CheckChips steps={["Report privately", "We investigate"]} outcome="Coordinated disclosure" />
                </div>
              </div>
              <div className="flex flex-col gap-3 lg:max-w-[18rem] lg:ml-auto w-full">
                <a href="mailto:security@omnipriv.com" className="hp-btn-primary">Email security@omnipriv.com</a>
                <a href="/demo?intent=security" className="hp-btn-secondary">Request a Security Briefing</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
