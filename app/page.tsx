import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TechMarquee from "@/components/layout/TechMarquee";
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
    color: "from-blue-500/20 to-cyan-500/10",
    borderColor: "border-blue-500/20",
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
    color: "from-purple-500/20 to-indigo-500/10",
    borderColor: "border-purple-500/20",
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
    color: "from-emerald-500/20 to-teal-500/10",
    borderColor: "border-emerald-500/20",
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
    color: "from-orange-500/20 to-red-500/10",
    borderColor: "border-orange-500/20",
  },
];

const features = [
  {
    icon: Server,
    title: "Bastion Host Gateway",
    description:
      "Zero-trust bastion host for SSH, RDP, VNC, Telnet, and K8s clusters. No VPN required — access through a secure, audited web terminal.",
  },
  {
    icon: Monitor,
    title: "Multi-Protocol Support",
    description:
      "Connect to Linux, Windows, databases, Kubernetes pods, web applications, and remote apps — all from a single browser-based interface.",
  },
  {
    icon: Database,
    title: "Database Access Control",
    description:
      "Secure access to MySQL, PostgreSQL, Oracle, SQL Server, MongoDB, and Redis without exposing credentials to end users.",
  },
  {
    icon: Fingerprint,
    title: "Identity Security",
    description:
      "Tie every privileged action to a verified human identity. Context-aware authentication prevents account takeovers and insider threats.",
  },
  {
    icon: RefreshCw,
    title: "Automatic Credential Rotation",
    description:
      "Rotate passwords, SSH keys, and API tokens on a schedule or on-demand — for thousands of assets simultaneously.",
  },
  {
    icon: FileSearch,
    title: "Immutable Audit Trails",
    description:
      "Cryptographically signed session logs that cannot be tampered with. Meet SOC2, ISO 27001, HIPAA, and PCI-DSS audit requirements.",
  },
  {
    icon: Network,
    title: "Distributed Architecture",
    description:
      "Horizontally scalable to support millions of concurrent sessions. Deploy on-premises, in the cloud, or as a hybrid configuration.",
  },
  {
    icon: Layers,
    title: "Multi-Cloud & Multi-Tenant",
    description:
      "Manage assets across AWS, Azure, GCP, and on-premises environments from a single platform with per-tenant access isolation.",
  },
  {
    icon: AlertTriangle,
    title: "Threat Detection & Alerts",
    description:
      "Real-time anomaly detection flags suspicious privileged activity. Automatically alert security teams and terminate risky sessions.",
  },
  {
    icon: Clock,
    title: "Just-In-Time Access",
    description:
      "Grant time-limited, purpose-specific access that expires automatically. Eliminate standing privileges that attackers exploit.",
  },
  {
    icon: Workflow,
    title: "Workflow & Approvals",
    description:
      "Built-in approval workflows for sensitive access requests. Integrate with ServiceNow, Jira, and custom ITSM systems.",
  },
  {
    icon: BarChart3,
    title: "Risk & Compliance Dashboards",
    description:
      "Executive-ready dashboards showing privilege risk posture, session activity, and compliance status — in real time.",
  },
];

const steps = [
  {
    step: "01",
    title: "Connect Your Infrastructure",
    description:
      "Onboard your entire infrastructure in minutes. OmniPriv auto-discovers assets across your cloud, on-premises, and hybrid environments — no agents required on most targets.",
    detail: "Supports Linux, Windows, macOS, network devices, databases, Kubernetes clusters, web apps, and more.",
  },
  {
    step: "02",
    title: "Define & Enforce Access Policies",
    description:
      "Create fine-grained access policies using RBAC, JIT provisioning, and conditional access rules. Assign roles, set approval workflows, and enforce the principle of least privilege.",
    detail: "Policies are version-controlled, auditable, and can be applied across thousands of assets instantly.",
  },
  {
    step: "03",
    title: "Monitor, Audit & Respond",
    description:
      "Every privileged session is recorded, indexed, and searchable. Security teams get real-time alerts on anomalous behavior and can terminate sessions instantly from anywhere.",
    detail: "Generate one-click compliance reports for SOC2, ISO 27001, PCI-DSS, HIPAA, and GDPR audits.",
  },
];

const protocols = [
  { name: "SSH / SFTP", color: "text-[#00B8FF]" },
  { name: "RDP", color: "text-purple-400" },
  { name: "VNC", color: "text-emerald-400" },
  { name: "Telnet", color: "text-orange-400" },
  { name: "MySQL", color: "text-blue-400" },
  { name: "PostgreSQL", color: "text-indigo-400" },
  { name: "Oracle DB", color: "text-red-400" },
  { name: "SQL Server", color: "text-pink-400" },
  { name: "MongoDB", color: "text-green-400" },
  { name: "Redis", color: "text-rose-400" },
  { name: "Kubernetes", color: "text-blue-300" },
  { name: "Web Portal", color: "text-teal-400" },
];

const certs = [
  { name: "SOC 2\nType II", icon: ShieldCheck },
  { name: "ISO\n27001", icon: Shield },
  { name: "PCI\nDSS", icon: Lock },
  { name: "HIPAA", icon: UserCheck },
  { name: "GDPR", icon: Globe },
  { name: "FedRAMP\nReady", icon: Building2 },
];

const testimonials = [
  {
    quote:
      "OmniPriv transformed how we manage privileged access across our global infrastructure. What took days now takes minutes, and our audit team has never been happier. The session recording feature alone saved us during our last SOC2 audit.",
    author: "Sarah Chen",
    title: "CISO",
    company: "Global Financial Group",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80",
  },
  {
    quote:
      "We evaluated CyberArk, BeyondTrust, and OmniPriv. OmniPriv won hands-down on feature parity, deployment speed, and total cost of ownership. The JIT access module is a game-changer for our DevOps teams.",
    author: "Marcus Weber",
    title: "VP of Infrastructure Security",
    company: "European Manufacturing Corp",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80",
  },
  {
    quote:
      "After a privileged account compromise incident, we deployed OmniPriv across 5,000 assets in under two weeks. The credential rotation feature eliminated our most significant attack vector. I can't recommend it enough.",
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
    excerpt:
      "Zero-trust architecture requires that every privileged access request is verified, regardless of network location. Learn how to implement a comprehensive zero-trust PAM framework.",
    date: "February 18, 2026",
    readTime: "12 min read",
    href: "/blog/zero-trust-pam-guide",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=600&h=280&q=75",
  },
  {
    category: "Security Advisory",
    title: "The Hidden Risk of Stale Privileged Accounts — and How to Eliminate Them",
    excerpt:
      "Dormant privileged accounts represent one of the most exploited attack vectors in modern enterprise breaches. Here's how OmniPriv's automated discovery and credential rotation close the gap.",
    date: "January 30, 2026",
    readTime: "8 min read",
    href: "/blog/stale-privilege-accounts",
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=600&h=280&q=75",
  },
  {
    category: "Case Study",
    title: "Case Study: Fortune 500 Bank Reduces Audit Prep Time by 90% with OmniPriv",
    excerpt:
      "Learn how a leading financial institution replaced a complex, legacy PAM setup with OmniPriv — cutting audit preparation time from weeks to hours.",
    date: "January 12, 2026",
    readTime: "6 min read",
    href: "/blog/bank-case-study",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=280&q=75",
  },
];

/* ─── Page Component ────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=60"
            alt=""
            fill
            className="object-cover opacity-[0.18]"
            priority
          />
        </div>
        {/* Background layers */}
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030711]/50 via-[#030711]/75 to-[#030711]" />
        {/* Cyan primary orb */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(0,184,255,0.12) 0%, transparent 65%)",
          }}
        />
        {/* Purple depth orb — top right */}
        <div
          className="absolute top-0 right-0 w-[700px] h-[500px]"
          style={{
            background: "radial-gradient(ellipse at top right, rgba(124,58,237,0.12) 0%, transparent 65%)",
          }}
        />
        {/* Indigo accent — bottom left */}
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[400px]"
          style={{
            background: "radial-gradient(ellipse at bottom left, rgba(99,102,241,0.08) 0%, transparent 60%)",
          }}
        />
        {/* Floating accent dots */}
        <div className="absolute top-1/4 left-[15%] w-1.5 h-1.5 rounded-full bg-[#00B8FF]/70 animate-pulse" />
        <div className="absolute top-1/3 right-[12%] w-2 h-2 rounded-full bg-violet-400/50 animate-pulse" style={{ animationDelay: "0.8s" }} />
        <div className="absolute top-2/3 right-[20%] w-1 h-1 rounded-full bg-[#00B8FF]/50 animate-pulse" style={{ animationDelay: "1.2s" }} />
        <div className="absolute top-1/2 right-[35%] w-1 h-1 rounded-full bg-sky-400/40 animate-pulse" style={{ animationDelay: "2.4s" }} />
        <div className="absolute bottom-1/3 left-[25%] w-1.5 h-1.5 rounded-full bg-indigo-400/40 animate-pulse" style={{ animationDelay: "1.8s" }} />
        <div className="absolute top-[60%] left-[8%] w-1 h-1 rounded-full bg-purple-400/30 animate-pulse" style={{ animationDelay: "3s" }} />

        <div className="container-xl relative z-10 py-16 sm:py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00B8FF]/25 bg-[#00B8FF]/[0.08] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B8FF] animate-pulse" />
              <span className="text-[#00B8FF] text-xs font-semibold uppercase tracking-wider">
                Enterprise PAM Platform
              </span>
            </div>

            {/* Heading */}
            <h1
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Zero-Trust{" "}
              <span className="text-gradient">Privileged Access</span>
              <br />
              Management for the{" "}
              <span className="relative inline-block">
                Enterprise
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#00B8FF] to-[#0060FF] rounded-full" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
              Omnipriv secures your most critical systems with industry-leading PAM solutions. As a comprehensive privileged identity management solution, we provide automated credential management, full session auditing, and real-time threat detection.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
              <Link href="/demo" className="btn-primary text-base px-8 py-3.5">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/platform" className="btn-secondary text-base px-8 py-3.5">
                Explore Features
              </Link>
            </div>

            {/* Protocol tags — hidden on mobile */}
            <div className="hidden sm:flex flex-wrap justify-center gap-2 mb-8">
              {protocols.map((p) => (
                <span
                  key={p.name}
                  className={`tag text-xs font-semibold ${p.color}`}
                >
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Bottom fade line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00B8FF]/30 to-transparent" />
      </section>

      {/* ─── TECH MARQUEE (SVG logos) ─────────── */}
      <TechMarquee />



      {/* ─── FOUR PILLARS ──────────────────────── */}
      <section id="capabilities" className="section-padding-lg">
        <div className="container-xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="badge-cyan mb-5">Core Capabilities</div>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-white mb-5"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              The Four Pillars of{" "}
              <span className="text-gradient">Privileged Access Management</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              OmniPriv is built on the 4A framework — Authentication, Authorization, Account
              Management, and Audit — providing end-to-end coverage of every privileged access scenario
              in your enterprise. Built around the best practices for privileged access management, it helps organizations enforce least-privilege access, secure critical accounts, and monitor privileged activity in real time.
            </p>
          </div>

          {/* Pillars */}
          <div className="space-y-6">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.id}
                id={pillar.id}
                className={`group relative rounded-2xl border ${pillar.borderColor} overflow-hidden card-glass card-shine`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-40`} />
                <div className="relative z-10 p-8 md:p-10">
                  <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div className={idx % 2 === 1 ? "md:order-2" : ""}>
                      <div className="flex items-center gap-4 mb-5">
                        <div className="icon-wrapper">
                          <pillar.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#00B8FF] uppercase tracking-wider mb-0.5">
                            {String(idx + 1).padStart(2, "0")}
                          </div>
                          <h3
                            className="text-2xl font-bold text-white"
                            style={{ fontFamily: "var(--font-syne)" }}
                          >
                            {pillar.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-[#00B8FF]/80 font-semibold text-sm mb-3">
                        {pillar.subtitle}
                      </p>
                      <p className="text-slate-400 leading-relaxed mb-6">
                        {pillar.description}
                      </p>
                      <Link
                        href={`/platform#${pillar.id}`}
                        className="inline-flex items-center gap-2 text-[#00B8FF] text-sm font-semibold hover:underline"
                      >
                        Learn more <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                    <div className={idx % 2 === 1 ? "md:order-1" : ""}>
                      <ul className="space-y-3">
                        {pillar.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors"
                          >
                            <CheckCircle2 className="w-5 h-5 text-[#00B8FF] flex-shrink-0 mt-0.5" />
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
      </section>

      {/* ─── FEATURES GRID ─────────────────────── */}
      <section className="section-padding border-y border-white/[0.04] bg-[#030711]">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="badge-cyan mb-5">Platform Features</div>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-white mb-5"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              The Ultimate{" "}
              <span className="text-gradient">Privileged Identity Management Solution</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Simplify your security stack with our comprehensive PAM platform. OmniPriv delivers enterprise-grade protection in one unified interface, making it a powerful Privileged Identity Management Solution for modern enterprises. It eliminates the need for complex, bolt-on tools while helping organizations secure privileged access with greater control and efficiency.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative p-6 rounded-2xl border border-white/[0.07] bg-[#0A1628]/40 hover:border-[#00B8FF]/30 hover:bg-[#0A1628]/80 transition-all duration-300 card-shine cursor-default overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00B8FF]/[0.04] via-transparent to-violet-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00B8FF]/0 to-transparent group-hover:via-[#00B8FF]/50 transition-all duration-300" />
                <div className="relative">
                  <div className="icon-wrapper mb-5">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h3
                    className="text-base font-bold text-white mb-2"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/platform" className="btn-secondary">
              View All Features <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-14 rounded-2xl border border-[#00B8FF]/15 bg-[#0A1628]/60 overflow-hidden">
            <div className="grid lg:grid-cols-[1.1fr_1.4fr] gap-0">
              <div className="p-8 border-b lg:border-b-0 lg:border-r border-white/[0.06]">
                <div className="badge-cyan mb-4">Live Visibility</div>
                <h3
                  className="text-2xl font-extrabold text-white mb-3"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Unified Security Command Center
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Give security, infrastructure, and compliance teams one place to review active sessions,
                  investigate privileged activity, and make access decisions without jumping between tools.
                </p>
              </div>
              <div className="grid sm:grid-cols-3">
                {[
                  {
                    icon: Monitor,
                    title: "Active Sessions",
                    text: "See who is connected, where they came from, and what systems are currently in use.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Policy Status",
                    text: "Track approval rules, MFA posture, and policy enforcement across every privileged workflow.",
                  },
                  {
                    icon: BarChart3,
                    title: "Audit Context",
                    text: "Surface searchable recordings, commands, and evidence needed for investigations and audits.",
                  },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title} className="p-6 border-t sm:border-t-0 sm:border-l first:sm:border-l-0 border-white/[0.06]">
                    <div className="icon-wrapper mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-white font-semibold mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                      {title}
                    </h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ──────────────────────── */}
      <section className="section-padding-lg">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="badge-cyan mb-5">How It Works</div>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-white mb-5"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Secure Access in{" "}
              <span className="text-gradient">Three Steps</span>
            </h2>
            <p className="text-slate-400 text-lg">
              OmniPriv is designed for fast deployment without sacrificing enterprise-grade controls, built around privileged access management best practices that help organizations secure critical systems with confidence. Most organizations are fully operational within 48 hours, making it easier to strengthen privileged access security without added complexity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-[#00B8FF]/40 via-violet-400/30 to-[#00B8FF]/10 hidden md:block" />

            {steps.map((step, i) => (
              <div
                key={step.step}
                className="relative p-8 rounded-2xl border border-white/[0.07] bg-gradient-to-b from-[#0A1628]/80 to-[#060d1f]/60 hover:border-[#00B8FF]/25 transition-all duration-300 group overflow-hidden"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00B8FF]/[0.03] to-violet-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity" />
                {/* Step number */}
                <div
                  className="text-6xl font-extrabold leading-none select-none mb-5"
                  style={{
                    fontFamily: "var(--font-syne)",
                    background: "linear-gradient(135deg, rgba(56,189,248,0.25) 0%, rgba(139,92,246,0.15) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {step.step}
                </div>
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {step.description}
                </p>
                <p className="text-xs text-slate-500 border-t border-white/[0.05] pt-4">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/platform" className="btn-primary text-base px-8 py-3.5">
              Explore the Platform
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="mt-16 rounded-2xl border border-[#00B8FF]/15 bg-[#0A1628]/60 p-8 md:p-10">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <div className="badge-cyan mb-4 inline-flex">Zero-Trust Access Flow</div>
              <h3
                className="text-2xl font-extrabold text-white mb-3"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Every privileged request is verified, approved, and observed
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                OmniPriv replaces standing access with a policy-driven flow that validates identity,
                grants only the access required, and records the full session from start to finish.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  step: "Verify",
                  text: "Authenticate the user, check device and policy context, and enforce MFA before access begins.",
                },
                {
                  step: "Grant",
                  text: "Issue time-limited access to the exact system, command set, or session window required for the task.",
                },
                {
                  step: "Audit",
                  text: "Record activity, stream alerts on risky behavior, and retain evidence for compliance and response teams.",
                },
              ].map((item, index) => (
                <div key={item.step} className="rounded-2xl border border-white/[0.06] bg-[#030711]/60 p-6">
                  <div className="text-xs font-semibold text-[#00B8FF] uppercase tracking-[0.2em] mb-3">
                    0{index + 1}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                    {item.step}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMPLIANCE ────────────────────────── */}
      <section className="section-padding border-y border-white/[0.04]" style={{ background: "linear-gradient(180deg, #0A1628 0%, #030711 100%)" }}>
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="badge-cyan mb-6">Compliance & Certifications</div>
              <h2
                className="text-4xl md:text-5xl font-extrabold text-white mb-5"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Built for the{" "}
                <span className="text-gradient">Most Regulated</span>{" "}
                Environments
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                OmniPriv is designed from the ground up to meet the strictest global compliance
                standards. Our platform generates audit-ready reports in minutes — not days.
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "Audit-Ready Reports",
                    desc: "One-click exports in formats required by SOC2, ISO 27001, PCI-DSS, and HIPAA auditors.",
                  },
                  {
                    title: "Immutable Session Logs",
                    desc: "Cryptographically signed logs that cannot be altered or deleted — even by administrators.",
                  },
                  {
                    title: "Continuous Compliance Monitoring",
                    desc: "Real-time dashboards track compliance posture across all assets and user accounts.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#00B8FF] flex-shrink-0 mt-0.5" />
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
                  className="flex flex-col items-center justify-center p-6 rounded-2xl border border-[#00B8FF]/15 bg-[#00B8FF]/[0.05] hover:bg-[#00B8FF]/[0.1] hover:border-[#00B8FF]/30 transition-all group"
                >
                  <cert.icon className="w-8 h-8 text-[#00B8FF] mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-bold text-white text-center whitespace-pre-line leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
                    {cert.name}
                  </div>
                  <span className="mt-2 text-[10px] text-[#00B8FF]/60 font-medium">Certified</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ──────────────────────── */}
      <section className="section-padding-lg">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="badge-cyan mb-5">Customer Stories</div>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-white mb-5"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Trusted by Security Leaders{" "}
              <span className="text-gradient">Worldwide</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Hear from the CISOs, security architects, and IT leaders who rely on OmniPriv
              to protect their most critical systems.
            </p>
          </div>

          

          <div className="text-center mt-10">
            <Link href="/case-studies" className="btn-secondary">
              Read All Case Studies <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── BLOG PREVIEW ──────────────────────── */}
      <section className="section-padding border-t border-white/[0.04] bg-[#0A1628]/30">
        <div className="container-xl">
          <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="badge-cyan mb-3">Latest Insights</div>
              <h2
                className="text-3xl md:text-4xl font-extrabold text-white"
                style={{ fontFamily: "var(--font-syne)" }}
              >
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
                className="group flex flex-col rounded-2xl border border-white/[0.07] bg-[#0A1628]/50 hover:border-white/[0.14] hover:bg-[#0A1628]/80 transition-all duration-300 overflow-hidden"
              >
                {/* Cover image */}
                <div className="relative h-44 overflow-hidden bg-[#0F1E35]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] to-transparent opacity-60" />
                  <span className="absolute bottom-3 left-4 tag text-xs">{post.category}</span>
                </div>
                {/* Text */}
                <div className="p-5 flex flex-col flex-1">
                  <h3
                    className="text-sm font-bold text-white mb-2.5 group-hover:text-sky-300 transition-colors line-clamp-2 leading-snug"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 flex-1 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">{post.date} · {post.readTime}</span>
                    <span className="text-xs text-sky-400 font-semibold flex items-center gap-1">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DEMO CTA ──────────────────────────── */}
      <section className="section-padding-lg">
        <div className="container-xl">
          <div className="relative rounded-3xl overflow-hidden border border-[#00B8FF]/15">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f0d2e] to-[#0A1628]" />
            <div className="absolute inset-0 bg-grid opacity-25" />
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-25"
              style={{ background: "radial-gradient(ellipse, rgba(0,184,255,0.6) 0%, transparent 60%)" }}
            />
            <div
              className="absolute bottom-0 right-0 w-[500px] h-[350px] opacity-15"
              style={{ background: "radial-gradient(ellipse at bottom right, rgba(124,58,237,0.8) 0%, transparent 60%)" }}
            />

            {/* Content */}
            <div className="relative z-10 text-center py-20 px-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00B8FF]/25 bg-[#00B8FF]/[0.08] mb-8">
                <Shield className="w-3.5 h-3.5 text-[#00B8FF]" />
                <span className="text-[#00B8FF] text-xs font-semibold uppercase tracking-wider">
                  Enterprise Demo Available
                </span>
              </div>

              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 max-w-3xl mx-auto"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Ready to Eliminate Privileged Access{" "}
                <span className="text-gradient">Risk?</span>
              </h2>

              <p className="text-slate-400 text-xl mb-10 max-w-2xl mx-auto">
                See OmniPriv in a live, personalized demo tailored to your environment.
                Our PAM experts will walk you through how our PAM solutions solve your specific security challenges and strengthen privileged access security across your organization.
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

              {/* Trust signals */}
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500">
                {[
                  { icon: Shield, label: "No commitment required" },
                  { icon: Clock, label: "30-minute demo" },
                  { icon: Users, label: "Dedicated PAM expert" },
                  { icon: Cpu, label: "Tailored to your stack" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#00B8FF]/60" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
