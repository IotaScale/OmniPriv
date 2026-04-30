import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TechMarquee from "@/components/layout/TechMarquee";
import MotionSection from "@/components/ui/MotionSection";
import HeroDashboard from "@/components/ui/HeroDashboard";
import HeroSection from "@/components/ui/HeroSection";
import {
  ArrowRight,
  Shield,
  Lock,
  Eye,
  Key,
  UserCheck,
  CheckCircle2,
  Monitor,
  Database,
  Server,
  Globe,
  Layers,
  RefreshCw,
  AlertTriangle,
  FileSearch,
  Fingerprint,
  Clock,
  Building2,
  Star,
  ChevronRight,
  Cpu,
  Network,
  BarChart3,
  Workflow,
  ShieldCheck,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "Omnipriv|Top Privileged Access Management & PAM Solutions",
  },
  description:
    "Protect your enterprise with Omnipriv advanced PAM solutions. Discover seamless privileged access management to secure critical data and reduce risk.",
};

const trustedBrands = [
  "Microsoft", "Siemens", "Tencent", "Ford", "Deloitte",
  "Lenovo", "Volkswagen", "COSCO", "NTT", "Decathlon",
  "Dyson", "Versace", "McDonald's", "Shangri-La", "DENSO",
  "TCL", "OPPO", "VIVO", "Uniqlo", "MISUMI",
];

const pillars = [
  {
    id: "authentication",
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
    accentColor: "#6366F1",
    borderClass: "border-[#6366F1]/20",
  },
  {
    id: "authorization",
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
    accentColor: "#A78BFA",
    borderClass: "border-[#A78BFA]/20",
  },
  {
    id: "account",
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
    accentColor: "#22C55E",
    borderClass: "border-[#22C55E]/20",
  },
  {
    id: "audit",
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
    accentColor: "#F59E0B",
    borderClass: "border-[#F59E0B]/20",
  },
];

const features = [
  { icon: Server,      title: "Bastion Host Gateway",          description: "Zero-trust bastion host for SSH, RDP, VNC, Telnet, and K8s clusters. No VPN required — access through a secure, audited web terminal." },
  { icon: Monitor,     title: "Multi-Protocol Support",        description: "Connect to Linux, Windows, databases, Kubernetes pods, web applications, and remote apps — all from a single browser-based interface." },
  { icon: Database,    title: "Database Access Control",       description: "Secure access to MySQL, PostgreSQL, Oracle, SQL Server, MongoDB, and Redis without exposing credentials to end users." },
  { icon: Fingerprint, title: "Identity Security",             description: "Tie every privileged action to a verified human identity. Context-aware authentication prevents account takeovers and insider threats." },
  { icon: RefreshCw,   title: "Automatic Credential Rotation", description: "Rotate passwords, SSH keys, and API tokens on a schedule or on-demand — for thousands of assets simultaneously." },
  { icon: FileSearch,  title: "Immutable Audit Trails",        description: "Cryptographically signed session logs that cannot be tampered with. Meet SOC2, ISO 27001, HIPAA, and PCI-DSS audit requirements." },
  { icon: Network,     title: "Distributed Architecture",      description: "Horizontally scalable to support millions of concurrent sessions. Deploy on-premises, in the cloud, or as a hybrid configuration." },
  { icon: Layers,      title: "Multi-Cloud & Multi-Tenant",    description: "Manage assets across AWS, Azure, GCP, and on-premises environments from a single platform with per-tenant access isolation." },
  { icon: AlertTriangle, title: "Threat Detection & Alerts",   description: "Real-time anomaly detection flags suspicious privileged activity. Automatically alert security teams and terminate risky sessions." },
  { icon: Clock,       title: "Just-In-Time Access",           description: "Grant time-limited, purpose-specific access that expires automatically. Eliminate standing privileges that attackers exploit." },
  { icon: Workflow,    title: "Workflow & Approvals",          description: "Built-in approval workflows for sensitive access requests. Integrate with ServiceNow, Jira, and custom ITSM systems." },
  { icon: BarChart3,   title: "Risk & Compliance Dashboards",  description: "Executive-ready dashboards showing privilege risk posture, session activity, and compliance status — in real time." },
];

const steps = [
  {
    step: "01",
    title: "Connect Your Infrastructure",
    description: "Onboard your entire infrastructure in minutes. OmniPriv auto-discovers assets across your cloud, on-premises, and hybrid environments — no agents required on most targets.",
    detail: "Supports Linux, Windows, macOS, network devices, databases, Kubernetes clusters, web apps, and more.",
  },
  {
    step: "02",
    title: "Define & Enforce Access Policies",
    description: "Create fine-grained access policies using RBAC, JIT provisioning, and conditional access rules. Assign roles, set approval workflows, and enforce the principle of least privilege.",
    detail: "Policies are version-controlled, auditable, and can be applied across thousands of assets instantly.",
  },
  {
    step: "03",
    title: "Monitor, Audit & Respond",
    description: "Every privileged session is recorded, indexed, and searchable. Security teams get real-time alerts on anomalous behavior and can terminate sessions instantly from anywhere.",
    detail: "Generate one-click compliance reports for SOC2, ISO 27001, PCI-DSS, HIPAA, and GDPR audits.",
  },
];

const protocols = [
  { name: "SSH / SFTP",  color: "text-[#6366F1]" },
  { name: "RDP",         color: "text-[#A78BFA]" },
  { name: "VNC",         color: "text-emerald-400" },
  { name: "Telnet",      color: "text-amber-400" },
  { name: "MySQL",       color: "text-blue-400" },
  { name: "PostgreSQL",  color: "text-indigo-400" },
  { name: "Oracle DB",   color: "text-red-400" },
  { name: "SQL Server",  color: "text-pink-400" },
  { name: "MongoDB",     color: "text-green-400" },
  { name: "Redis",       color: "text-rose-400" },
  { name: "Kubernetes",  color: "text-sky-300" },
  { name: "Web Portal",  color: "text-teal-400" },
];

const certs = [
  { name: "SOC 2\nType II", icon: ShieldCheck },
  { name: "ISO\n27001",     icon: Shield },
  { name: "PCI\nDSS",       icon: Lock },
  { name: "HIPAA",          icon: UserCheck },
  { name: "GDPR",           icon: Globe },
  { name: "FedRAMP\nReady", icon: Building2 },
];

const testimonials = [
  {
    quote: "OmniPriv transformed how we manage privileged access across our global infrastructure. What took days now takes minutes, and our audit team has never been happier.",
    author: "Sarah Chen",
    title: "CISO",
    company: "Global Financial Group",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80",
  },
  {
    quote: "We evaluated CyberArk, BeyondTrust, and OmniPriv. OmniPriv won hands-down on feature parity, deployment speed, and total cost of ownership.",
    author: "Marcus Weber",
    title: "VP of Infrastructure Security",
    company: "European Manufacturing Corp",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80",
  },
  {
    quote: "After a privileged account compromise incident, we deployed OmniPriv across 5,000 assets in under two weeks. The credential rotation feature eliminated our most significant attack vector.",
    author: "Jennifer Park",
    title: "Director of IT Security",
    company: "Healthcare Networks Inc.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=80&h=80&q=80",
  },
];

const blogPosts = [
  {
    category: "Best Practices",
    title: "How to Implement Zero-Trust PAM: A Step-by-Step Enterprise Guide",
    excerpt: "Zero-trust architecture requires that every privileged access request is verified, regardless of network location.",
    date: "February 18, 2026",
    readTime: "12 min read",
    href: "/blog/zero-trust-pam-guide",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=600&h=280&q=75",
  },
  {
    category: "Security Advisory",
    title: "The Hidden Risk of Stale Privileged Accounts — and How to Eliminate Them",
    excerpt: "Dormant privileged accounts represent one of the most exploited attack vectors in modern enterprise breaches.",
    date: "January 30, 2026",
    readTime: "8 min read",
    href: "/blog/stale-privilege-accounts",
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=600&h=280&q=75",
  },
  {
    category: "Case Study",
    title: "Fortune 500 Bank Reduces Audit Prep Time by 90% with OmniPriv",
    excerpt: "Learn how a leading financial institution replaced a complex, legacy PAM setup with OmniPriv — cutting audit preparation time from weeks to hours.",
    date: "January 12, 2026",
    readTime: "6 min read",
    href: "/blog/bank-case-study",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=280&q=75",
  },
];

/* ─── Page Component ── */
export default function HomePage() {
  return (
    <>
      {/* ─── HERO ── */}
      <HeroSection protocols={protocols} />

      {/* ─── TECH MARQUEE ── */}
      <TechMarquee />

      {/* ─── FOUR PILLARS ── */}
      <MotionSection id="capabilities" className="section-padding-lg">
        <div className="container-xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="badge-cyan mb-5">Core Capabilities</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5" style={{ fontFamily: "var(--font-syne)" }}>
              The Four Pillars of{" "}
              <span className="text-[#6366F1]">Privileged Access Management</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              OmniPriv is built on the 4A framework — Authentication, Authorization, Account Management, and Audit — providing end-to-end coverage of every privileged access scenario in your enterprise.
            </p>
          </div>

          <div className="space-y-6">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.id}
                id={pillar.id}
                className={`group relative rounded-2xl border ${pillar.borderClass} bg-[#0E0E1C] overflow-hidden card-shine`}
              >
                <div className="relative z-10 p-8 md:p-10">
                  <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div className={idx % 2 === 1 ? "md:order-2" : ""}>
                      <div className="flex items-center gap-4 mb-5">
                        <div className="icon-wrapper">
                          <pillar.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#A78BFA] uppercase tracking-wider mb-0.5">
                            {String(idx + 1).padStart(2, "0")}
                          </div>
                          <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
                            {pillar.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-[#A78BFA] font-semibold text-sm mb-3">{pillar.subtitle}</p>
                      <p className="text-slate-400 leading-relaxed mb-6">{pillar.description}</p>
                      <Link href={`/platform#${pillar.id}`} className="inline-flex items-center gap-2 text-[#6366F1] text-sm font-semibold hover:underline">
                        Learn more <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                    <div className={idx % 2 === 1 ? "md:order-1" : ""}>
                      <ul className="space-y-2">
                        {pillar.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                            <CheckCircle2 className="w-5 h-5 text-[#6366F1] flex-shrink-0 mt-0.5" />
                            <span className="text-slate-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* ─── FEATURES GRID ── */}
      <MotionSection className="section-padding border-y border-white/[0.04] bg-[#07070E]">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="badge-cyan mb-5">Platform Features</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5" style={{ fontFamily: "var(--font-syne)" }}>
              The Ultimate{" "}
              <span className="text-[#6366F1]">Privileged Identity Management Solution</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Simplify your security stack with our comprehensive PAM platform. OmniPriv delivers enterprise-grade protection in one unified interface.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative p-6 rounded-2xl border border-white/[0.07] bg-[#0E0E1C] hover:border-[#6366F1]/30 hover:bg-[#13132A] transition-all duration-300 card-shine cursor-default"
              >
                <div className="icon-wrapper mb-5">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/platform" className="btn-secondary">
              View All Features <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Command Center panel */}
          <div className="mt-14 rounded-2xl border border-[#6366F1]/15 bg-[#0E0E1C] overflow-hidden">
            <div className="grid lg:grid-cols-[1.1fr_1.4fr] gap-0">
              <div className="p-8 border-b lg:border-b-0 lg:border-r border-white/[0.06]">
                <div className="badge-cyan mb-4">Live Visibility</div>
                <h3 className="text-2xl font-extrabold text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                  Unified Security Command Center
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Give security, infrastructure, and compliance teams one place to review active sessions, investigate privileged activity, and make access decisions.
                </p>
              </div>
              <div className="grid sm:grid-cols-3">
                {[
                  { icon: Monitor,    title: "Active Sessions", text: "See who is connected, where they came from, and what systems are currently in use." },
                  { icon: ShieldCheck, title: "Policy Status",  text: "Track approval rules, MFA posture, and policy enforcement across every privileged workflow." },
                  { icon: BarChart3,  title: "Audit Context",   text: "Surface searchable recordings, commands, and evidence needed for investigations and audits." },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title} className="p-6 border-t sm:border-t-0 sm:border-l first:sm:border-l-0 border-white/[0.06]">
                    <div className="icon-wrapper mb-4"><Icon className="w-5 h-5" /></div>
                    <h4 className="text-white font-semibold mb-2" style={{ fontFamily: "var(--font-syne)" }}>{title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* ─── HOW IT WORKS ── */}
      <MotionSection className="section-padding-lg">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="badge-cyan mb-5">How It Works</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5" style={{ fontFamily: "var(--font-syne)" }}>
              Secure Access in{" "}
              <span className="text-[#6366F1]">Three Steps</span>
            </h2>
            <p className="text-slate-400 text-lg">
              OmniPriv is designed for fast deployment without sacrificing enterprise-grade controls. Most organizations are fully operational within 48 hours.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.step}
                className="relative p-8 rounded-2xl border border-white/[0.07] bg-[#0E0E1C] hover:border-[#6366F1]/25 transition-all duration-300 group"
              >
                <div
                  className="text-6xl font-extrabold leading-none select-none mb-5 text-[#6366F1]/20"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{step.description}</p>
                <p className="text-xs text-slate-500 border-t border-white/[0.05] pt-4">{step.detail}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/platform" className="btn-primary text-base px-8 py-3.5">
              Explore the Platform
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Zero-trust flow */}
          <div className="mt-16 rounded-2xl border border-[#6366F1]/15 bg-[#0E0E1C] p-8 md:p-10">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="badge-cyan mb-4 inline-flex">Zero-Trust Access Flow</div>
              <h3 className="text-2xl font-extrabold text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                Every privileged request is verified, approved, and observed
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                OmniPriv replaces standing access with a policy-driven flow that validates identity, grants only the access required, and records the full session.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { step: "Verify", text: "Authenticate the user, check device and policy context, and enforce MFA before access begins." },
                { step: "Grant",  text: "Issue time-limited access to the exact system, command set, or session window required for the task." },
                { step: "Audit",  text: "Record activity, stream alerts on risky behavior, and retain evidence for compliance and response teams." },
              ].map((item, index) => (
                <div key={item.step} className="rounded-2xl border border-white/[0.06] bg-[#13132A] p-6">
                  <div className="text-xs font-semibold text-[#A78BFA] uppercase tracking-[0.2em] mb-3">0{index + 1}</div>
                  <h4 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>{item.step}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      {/* ─── COMPLIANCE ── */}
      <MotionSection className="section-padding border-y border-white/[0.04] bg-[#0E0E1C]">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="badge-cyan mb-6">Compliance & Certifications</div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5" style={{ fontFamily: "var(--font-syne)" }}>
                Built for the{" "}
                <span className="text-[#6366F1]">Most Regulated</span>{" "}
                Environments
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                OmniPriv is designed from the ground up to meet the strictest global compliance standards. Our platform generates audit-ready reports in minutes — not days.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Audit-Ready Reports",           desc: "One-click exports in formats required by SOC2, ISO 27001, PCI-DSS, and HIPAA auditors." },
                  { title: "Immutable Session Logs",        desc: "Cryptographically signed logs that cannot be altered or deleted — even by administrators." },
                  { title: "Continuous Compliance Monitoring", desc: "Real-time dashboards track compliance posture across all assets and user accounts." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#6366F1] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white font-semibold text-sm mb-0.5">{item.title}</div>
                      <div className="text-slate-400 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {certs.map((cert) => (
                <div
                  key={cert.name}
                  className="flex flex-col items-center justify-center p-6 rounded-2xl border border-[#6366F1]/15 bg-[#13132A] hover:bg-[#1A1A38] hover:border-[#6366F1]/30 transition-all group"
                >
                  <cert.icon className="w-8 h-8 text-[#A78BFA] mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-bold text-white text-center whitespace-pre-line leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
                    {cert.name}
                  </div>
                  <span className="mt-2 text-[10px] text-[#A78BFA]/60 font-medium">Certified</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      {/* ─── TESTIMONIALS ── */}
      <MotionSection className="section-padding-lg">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="badge-cyan mb-5">Customer Stories</div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5" style={{ fontFamily: "var(--font-syne)" }}>
              Trusted by Security Leaders{" "}
              <span className="text-[#6366F1]">Worldwide</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Hear from the CISOs, security architects, and IT leaders who rely on OmniPriv to protect their most critical systems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.author} className="relative p-6 rounded-2xl border border-white/[0.07] bg-[#0E0E1C] flex flex-col">
                <div className="quote-mark">&ldquo;</div>
                <div className="flex mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-1">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <Image src={t.avatar} alt={t.author} width={40} height={40} className="rounded-full object-cover" />
                  <div>
                    <div className="text-white font-semibold text-sm">{t.author}</div>
                    <div className="text-slate-500 text-xs">{t.title}, {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/case-studies" className="btn-secondary">
              Read All Case Studies <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </MotionSection>

      {/* ─── BLOG PREVIEW ── */}
      <MotionSection className="section-padding border-t border-white/[0.04] bg-[#0E0E1C]/50">
        <div className="container-xl">
          <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="badge-cyan mb-3">Latest Insights</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white" style={{ fontFamily: "var(--font-syne)" }}>
                PAM Best Practices & Security Research
              </h2>
            </div>
            <Link href="/blog" className="btn-secondary text-sm">
              View All Posts <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.title}
                href={post.href}
                className="group flex flex-col rounded-2xl border border-white/[0.07] bg-[#0E0E1C] hover:border-[#6366F1]/25 hover:bg-[#13132A] transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-44 overflow-hidden bg-[#13132A]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.03] transition-all duration-500"
                  />
                  <span className="absolute bottom-3 left-4 tag text-xs">{post.category}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-sm font-bold text-white mb-2.5 group-hover:text-[#A78BFA] transition-colors line-clamp-2 leading-snug" style={{ fontFamily: "var(--font-syne)" }}>
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 flex-1 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">{post.date} · {post.readTime}</span>
                    <span className="text-xs text-[#6366F1] font-semibold flex items-center gap-1">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* ─── DEMO CTA ── */}
      <MotionSection className="section-padding-lg">
        <div className="container-xl">
          <div className="relative rounded-3xl overflow-hidden border border-[#6366F1]/20 bg-[#0E0E1C]">
            <div className="absolute inset-0 bg-grid opacity-40" />
            {/* Accent line top */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#6366F1]" />

            <div className="relative z-10 text-center py-20 px-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/[0.08] mb-8">
                <Shield className="w-3.5 h-3.5 text-[#A78BFA]" />
                <span className="text-[#A78BFA] text-xs font-semibold uppercase tracking-wider">
                  Enterprise Demo Available
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 max-w-3xl mx-auto" style={{ fontFamily: "var(--font-syne)" }}>
                Ready to Eliminate Privileged Access{" "}
                <span className="text-[#6366F1]">Risk?</span>
              </h2>

              <p className="text-slate-400 text-xl mb-10 max-w-2xl mx-auto">
                See OmniPriv in a live, personalized demo tailored to your environment. Our PAM experts will walk you through how our solutions solve your specific security challenges.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
                <Link href="/demo" className="btn-primary text-base px-10 py-4">
                  Request a Personalized Demo
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/demo" className="btn-secondary text-base px-10 py-4">
                  Contact Sales
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500">
                {[
                  { icon: Shield, label: "No commitment required" },
                  { icon: Clock,  label: "30-minute demo" },
                  { icon: Users,  label: "Dedicated PAM expert" },
                  { icon: Cpu,    label: "Tailored to your stack" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#6366F1]/60" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MotionSection>
    </>
  );
}
