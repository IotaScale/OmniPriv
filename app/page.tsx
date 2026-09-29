import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TechMarquee from "@/components/layout/TechMarquee";
import AmbientTechnicalBackground from "@/components/layout/AmbientTechnicalBackground";
import HeroPolicyFlow from "@/components/ui/HeroPolicyFlow";
import FourPillarsSection from "@/components/ui/FourPillarsSection";
import ThreeStepsLifecycle from "@/components/ui/ThreeStepsLifecycle";
import PamFaqSection from "@/components/ui/PamFaqSection";
import ClosingCtaSection from "@/components/ui/ClosingCtaSection";
import { posts as blogData } from "@/lib/blog-data";
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

const latestBlogPosts = Object.entries(blogData)
  .map(([slug, post]) => {
    const imageMatch = post.content.match(/!\[.*?\]\((.*?)\)/);
    return {
      category: post.category,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      readTime: post.readTime,
      href: `/blog/${slug}`,
      image: imageMatch ? imageMatch[1] : "/blog/pam-best-practices-2026/least-privilege.svg",
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

/* ─── Page Component ────────────────────────── */

export default function HomePage() {
  return (
    <>
      <AmbientTechnicalBackground />
      {/* ─── HERO ──────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white dark:bg-[#030711] pt-12 pb-16 lg:py-24 border-b border-slate-900/[0.08] dark:border-white/[0.06]">
        {/* Subtle architectural background */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 dark:from-[#030711]/40 via-white/80 dark:via-[#030711]/80 to-white dark:to-[#030711]" />
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(0,184,255,0.08) 0%, transparent 65%)",
          }}
        />

        <div className="container-xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">
            {/* Left: text */}
            <div className="text-center lg:text-left">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00B8FF]/25 bg-[#00B8FF]/[0.08] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B8FF]" />
                <span className="text-[#00B8FF] text-xs font-semibold uppercase tracking-wider font-mono">
                  ENTERPRISE PRIVILEGED ACCESS MANAGEMENT
                </span>
              </div>

              {/* H1 */}
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-slate-950 dark:text-white leading-[1.12] tracking-tight mb-6"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Redefining Privileged Access Management for the Modern Enterprise
              </h1>

              {/* Two Paragraphs Body Copy */}
              <div className="space-y-4 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl lg:mx-0 mx-auto">
                <p>
                  Modern enterprises depend on employees, vendors, applications, and automated systems that require privileged access to critical infrastructure. Without the right controls, these identities can increase security risk and expand the attack surface.
                </p>
                <p>
                  OmniPriv delivers modern PAM solutions with Zero Trust access, Just-in-Time privileges, secure credential management, and complete session visibility—helping organizations control every privileged interaction with confidence.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                <Link
                  href="/platform"
                  className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto text-center"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <Link
                  href="/demo"
                  className="btn-secondary text-base px-8 py-3.5 w-full sm:w-auto text-center"
                >
                  Request a Technical Demo
                </Link>
              </div>

              {/* Protocol tags */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-1.5">
                {protocols.slice(0, 8).map((p) => (
                  <span
                    key={p.name}
                    className="px-2.5 py-1 rounded text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-900/[0.02] dark:bg-white/[0.03] border border-slate-900/[0.08] dark:border-white/[0.06]"
                  >
                    {p.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Hero Product Visual (Responsive: underneath on mobile/tablet, right on desktop) */}
            <div className="w-full">
              <HeroPolicyFlow />
            </div>
          </div>
        </div>
      </section>

      {/* ─── DATASHEET HIGHLIGHTS ───────────────── */}
      <section className="border-y border-slate-900/[0.08] dark:border-white/[0.06] bg-slate-100/90 dark:bg-[#071322]/90 backdrop-blur-sm py-6">
        <div className="container-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3">
              <div className="text-2xl lg:text-3xl font-extrabold text-[#00B8FF]" style={{ fontFamily: "var(--font-syne)" }}>80+</div>
              <div className="text-xs font-semibold text-slate-950 dark:text-white mt-1">Requirement Points Covered</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400">Enterprise PAM coverage</div>
            </div>
            <div className="p-3 border-l border-slate-900/[0.08] dark:border-white/[0.06]">
              <div className="text-2xl lg:text-3xl font-extrabold text-[#00B8FF]" style={{ fontFamily: "var(--font-syne)" }}>8</div>
              <div className="text-xs font-semibold text-slate-950 dark:text-white mt-1">Core Capability Modules</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400">End-to-end access lifecycle</div>
            </div>
            <div className="p-3 border-t md:border-t-0 md:border-l border-slate-900/[0.08] dark:border-white/[0.06]">
              <div className="text-2xl lg:text-3xl font-extrabold text-[#00B8FF]" style={{ fontFamily: "var(--font-syne)" }}>Zero</div>
              <div className="text-xs font-semibold text-slate-950 dark:text-white mt-1">Software Agents Required</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400">100% Agentless architecture</div>
            </div>
            <div className="p-3 border-t md:border-t-0 md:border-l border-slate-900/[0.08] dark:border-white/[0.06]">
              <div className="text-2xl lg:text-3xl font-extrabold text-[#00B8FF]" style={{ fontFamily: "var(--font-syne)" }}>100%</div>
              <div className="text-xs font-semibold text-slate-950 dark:text-white mt-1">Encrypted Credential Vault</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400">AES-256 + SHA-512 &amp; HSM</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TECH MARQUEE (SVG logos) ─────────── */}
      <TechMarquee />



      {/* ─── FOUR PILLARS ──────────────────────── */}
      <FourPillarsSection />

      {/* ─── FEATURES GRID ─────────────────────── */}
      <section className="section-padding border-y border-slate-900/[0.05] dark:border-white/[0.04] bg-white dark:bg-[#030711]">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="badge-cyan mb-5">Platform Features</div>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white mb-5"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              The Ultimate{" "}
              <span className="text-gradient">Privileged Identity Management Solution</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Simplify your security stack with our comprehensive PAM platform. OmniPriv delivers enterprise-grade protection in one unified interface, making it a powerful Privileged Identity Management Solution for modern enterprises. It eliminates the need for complex, bolt-on tools while helping organizations secure privileged access with greater control and efficiency.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative p-6 rounded-2xl border border-slate-900/[0.09] dark:border-white/[0.07] bg-slate-100/40 dark:bg-[#0A1628]/40 hover:border-[#00B8FF]/35 hover:bg-slate-100/80 dark:hover:bg-[#0A1628]/80 hover:shadow-[0_0_30px_rgba(0,184,255,0.08)] transition-all duration-300 card-shine cursor-default overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00B8FF]/[0.07] via-transparent to-violet-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00B8FF]/0 to-transparent group-hover:via-[#00B8FF]/70 transition-all duration-300" />
                <div className="relative">
                  <div className="icon-wrapper mb-5">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h3
                    className="text-base font-bold text-slate-950 dark:text-white mb-2"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
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

          <div className="mt-14 rounded-2xl border border-[#00B8FF]/15 bg-slate-100/60 dark:bg-[#0A1628]/60 overflow-hidden">
            <div className="grid lg:grid-cols-[1.1fr_1.4fr] gap-0">
              <div className="p-8 border-b lg:border-b-0 lg:border-r border-slate-900/[0.08] dark:border-white/[0.06]">
                <div className="badge-cyan mb-4">Live Visibility</div>
                <h3
                  className="text-2xl font-extrabold text-slate-950 dark:text-white mb-3"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Unified Security Command Center
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
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
                  <div key={title} className="p-6 border-t sm:border-t-0 sm:border-l first:sm:border-l-0 border-slate-900/[0.08] dark:border-white/[0.06]">
                    <div className="icon-wrapper mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-slate-950 dark:text-white font-semibold mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                      {title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS (SECURE ACCESS IN THREE STEPS) ─── */}
      <section className="section-padding-lg border-y border-slate-900/[0.05] dark:border-white/[0.04] bg-white dark:bg-[#040814]">
        <div className="container-xl">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00B8FF]/25 bg-[#00B8FF]/[0.08] mb-5">
              <span className="text-[#00B8FF] text-xs font-semibold uppercase tracking-wider font-mono">
                Access Lifecycle
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white mb-5 tracking-tight"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Secure Access in Three Steps
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              OmniPriv turns privileged access into a controlled lifecycle: connect critical infrastructure, enforce the right policy, and continuously observe every privileged interaction.
            </p>
          </div>

          <ThreeStepsLifecycle />

          <div className="text-center mt-12 sm:mt-16">
            <Link href="/platform" className="btn-primary text-base px-8 py-3.5">
              Explore the Platform
              <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── COMPLIANCE ────────────────────────── */}
      <section className="section-padding border-y border-slate-900/[0.05] dark:border-white/[0.04]" style={{ background: "linear-gradient(180deg, #0A1628 0%, #030711 100%)" }}>
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="badge-cyan mb-6">Compliance & Certifications</div>
              <h2
                className="text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white mb-5"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Built for the{" "}
                <span className="text-gradient">Most Regulated</span>{" "}
                Environments
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">
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
                      <div className="text-slate-950 dark:text-white font-semibold text-sm mb-0.5">{item.title}</div>
                      <div className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {certs.map((cert) => (
                <div
                  key={cert.name}
                  className="flex flex-col items-center justify-center p-6 rounded-2xl border border-[#00B8FF]/18 bg-[#00B8FF]/[0.05] hover:bg-[#00B8FF]/[0.14] hover:border-[#00B8FF]/45 hover:shadow-[0_0_30px_rgba(0,184,255,0.12)] transition-all duration-300 group"
                >
                  <cert.icon className="w-8 h-8 text-[#00B8FF] mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-bold text-slate-950 dark:text-white text-center whitespace-pre-line leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
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
              className="text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white mb-5"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Trusted by Security Leaders{" "}
              <span className="text-gradient">Worldwide</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
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
      <section className="section-padding border-t border-slate-900/[0.05] dark:border-white/[0.04] bg-slate-100/30 dark:bg-[#0A1628]/30">
        <div className="container-xl">
          <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
            <div>
              <div className="badge-cyan mb-3">Latest Insights</div>
              <h2
                className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white"
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
            {latestBlogPosts.map((post) => (
              <Link
                key={post.title}
                href={post.href}
                className="group flex flex-col rounded-2xl border border-slate-900/[0.09] dark:border-white/[0.07] bg-slate-100/50 dark:bg-[#0A1628]/50 hover:border-[#00B8FF]/[0.28] hover:bg-slate-100/80 dark:hover:bg-[#0A1628]/80 hover:shadow-[0_0_30px_rgba(0,184,255,0.07)] transition-all duration-300 overflow-hidden"
              >
                {/* Cover image */}
                <div className="relative h-44 overflow-hidden bg-slate-200 dark:bg-[#0F1E35]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-100 dark:from-[#0A1628] to-transparent opacity-60" />
                  <span className="absolute bottom-3 left-4 tag text-xs">{post.category}</span>
                </div>
                {/* Text */}
                <div className="p-5 flex flex-col flex-1">
                  <h3
                    className="text-sm font-bold text-slate-950 dark:text-white mb-2.5 group-hover:text-sky-300 transition-colors line-clamp-2 leading-snug"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 flex-1 mb-4">
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

      {/* ─── COMPLETE FAQ SECTION ───────────────── */}
      <PamFaqSection />

      {/* ─── CLOSING CTA ───────────────────────── */}
      <ClosingCtaSection />
    </>
  );
}
