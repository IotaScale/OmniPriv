import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LogoMarquee from "@/components/sections/LogoMarquee";
import ChallengesSection from "@/components/ui/ChallengesSection";
import HeroSlideshow from "@/components/ui/HeroSlideshow";
// Temporarily disabled — repeats the Challenges section
// import FourPillarsSection from "@/components/ui/FourPillarsSection";
import ControlPlaneSection from "@/components/ui/ControlPlaneSection";
// Temporarily disabled — repeats the Control Plane section
// import ThreeStepsLifecycle from "@/components/ui/ThreeStepsLifecycle";
import PamFaqSection from "@/components/ui/PamFaqSection";
import ClosingCtaSection from "@/components/ui/ClosingCtaSection";
import AiPamTeaser from "@/components/ui/AiPamTeaser";
import { posts as blogData } from "@/lib/blog-data";
import { getCover } from "@/lib/blog-covers";
import {
  ArrowRight,
  Shield,
  Lock,
  Key,
  UserCheck,
  CheckCircle2,
  Monitor,
  Server,
  Globe,
  AlertTriangle,
  FileSearch,
  Fingerprint,
  Clock,
  Building2,
  ChevronRight,
  Cpu,
  BarChart3,
  ShieldCheck,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "OmniPriv | Top Privileged Access Management & PAM Solutions",
  },
  description:
    "Protect your enterprise with OmniPriv advanced PAM solutions. Discover seamless privileged access management to secure critical data and reduce risk.",
};



const trustedBrands = [
  "Microsoft", "Siemens", "Tencent", "Ford", "Deloitte",
  "Lenovo", "Volkswagen", "COSCO", "NTT", "Decathlon",
  "Dyson", "Versace", "McDonald's", "Shangri-La", "DENSO",
  "TCL", "OPPO", "VIVO", "Uniqlo", "MISUMI",
];


/* Homepage shows 8 AI-first capabilities only.
   The complete 32-feature breakdown lives on /features. */
const features = [
  {
    icon: Cpu,
    title: "AI Agent Governance",
    description:
      "Give every MCP agent its own verifiable identity, tool allowlist and data scope. The AI can act — but never with unrestricted authority.",
  },
  {
    icon: AlertTriangle,
    title: "ML Anomaly Detection",
    description:
      "IsolationForest scoring runs on every privileged login and session, catching lateral movement, credential harvesting and brute force in real time.",
  },
  {
    icon: Fingerprint,
    title: "Behavioral Analytics",
    description:
      "AI keystroke-dynamics and per-agent baselines flag impossible travel, off-hours access and deviation from learned behaviour.",
  },
  {
    icon: UserCheck,
    title: "Human-in-the-Loop Approvals",
    description:
      "High-risk agent actions — drop table, delete cluster, transfer funds — pause for explicit human approval before they execute.",
  },
  {
    icon: ShieldCheck,
    title: "Prompt-Injection Guard",
    description:
      "Even when an LLM's reasoning is manipulated, every tool call is re-verified against deterministic policy before it is allowed to run.",
  },
  {
    icon: FileSearch,
    title: "Agent Session Audit Trail",
    description:
      "A full forensic trace from human to agent to MCP server to tool to resource — with decision, privilege level and duration recorded.",
  },
  {
    icon: Clock,
    title: "Just-In-Time Access",
    description:
      "Ephemeral, time-boxed privileges for humans and agents alike. Access expires automatically, so there is no standing access to steal.",
  },
  {
    icon: Key,
    title: "Dynamic Secret Vault",
    description:
      "Credentials are discovered, AES-256 vaulted and rotated on schedule, then checked out as short-lived tokens for each session.",
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

/* Hero photography lives in components/ui/HeroSlideshow.tsx */

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
    const cover = getCover(slug);
    return {
      category: post.category,
      title: post.title,
      excerpt: post.excerpt,
      date: post.date,
      readTime: post.readTime,
      href: `/blog/${slug}`,
      image: imageMatch ? imageMatch[1] : (cover?.src ?? "/blog/pam-best-practices-2026/least-privilege.svg"),
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

/* ─── Page Component ────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ──────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden bg-[#030711] pt-16 pb-20 lg:py-24 border-b border-slate-900/[0.05] dark:border-white/[0.04]">
        {/* Full-bleed rotating background photographs */}
        <HeroSlideshow />

        {/* Overlays keep the headline readable while the photo stays visible */}
        <div className="absolute inset-0 bg-[#030711]/25" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 68% 64% at 50% 47%, rgba(3,7,17,0.72) 0%, rgba(3,7,17,0.34) 55%, rgba(3,7,17,0) 85%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030711]/45 via-transparent to-[#030711]/80" />

        <div className="container-xl relative z-10 w-full">
          <div className="max-w-6xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="hero-reveal inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00B8FF]/35 bg-[#030711]/50 backdrop-blur-sm mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B8FF]" />
              <span className="text-[#00B8FF] text-xs font-semibold uppercase tracking-wider font-mono">
                  AI-POWERED PRIVILEGED ACCESS MANAGEMENT
              </span>
            </div>

            {/* H1 */}
            <h1
              className="hero-reveal text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-syne)", animationDelay: "0.1s" }}
            >
              Secure AI Access
              <br />
              <span className="text-gradient">Control Every Privileged Move</span>
            </h1>

            {/* Two Paragraphs Body Copy */}
            <div
              className="hero-reveal space-y-4 text-base sm:text-lg text-slate-200 leading-relaxed mb-10 max-w-4xl mx-auto"
              style={{ animationDelay: "0.2s" }}
            >
              <p>
                  AI, automation, applications, and human identities are changing how privileged access works across the enterprise. OmniPriv brings Privileged Access Management into the AI era with AI-driven controls, Just-in-Time access, secure credentials, and complete session visibility.
              </p>
              <p>
                Built for organizations exploring modern AI PAM solutions, OmniPriv helps security teams manage privileged identities and reduce unnecessary access without slowing down critical operations. As PAM AI strategies evolve, OmniPriv keeps privileged access controlled, auditable, and aligned with enterprise security requirements.
              </p>
            </div>

            {/* CTAs */}
            <div
              className="hero-reveal flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8"
              style={{ animationDelay: "0.3s" }}
            >
              <Link
                href="/demo"
                className="btn-primary text-sm sm:text-base px-7 py-3.5 w-full sm:w-auto text-center"
              >
                Request a Technical Demo
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
              <Link
                href="/platform"
                className="inline-flex items-center justify-center rounded-[0.625rem] border border-white/30 bg-white/10 backdrop-blur-sm text-white font-semibold text-sm sm:text-base px-7 py-3.5 w-full sm:w-auto text-center hover:bg-white/20 transition-colors"
              >
                Explore Platform
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DATASHEET HIGHLIGHTS ───────────────── */}
      <section className="border-b border-slate-900/[0.05] dark:border-white/[0.04] bg-slate-100/90 dark:bg-[#071322]/90 backdrop-blur-sm py-6">
        <div className="container-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3">
              <div className="text-2xl lg:text-3xl font-extrabold text-[#00B8FF]" style={{ fontFamily: "var(--font-syne)" }}>80+</div>
              <div className="text-xs font-semibold text-slate-950 dark:text-white mt-1">Requirement Points Covered</div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400">Enterprise PAM coverage</div>
            </div>
            <div className="p-3 border-l border-slate-900/[0.08] dark:border-white/[0.06]">
              <div className="text-2xl lg:text-3xl font-extrabold text-[#00B8FF]" style={{ fontFamily: "var(--font-syne)" }}>9</div>
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
      <LogoMarquee label="Supports Every Protocol &amp; Platform" />

      {/* ─── CHALLENGES WE SOLVE (AI first) ────── */}
      <ChallengesSection />

      {/* ─── FOUR PILLARS (temporarily disabled) ── */}
      {/* <FourPillarsSection /> */}

      {/* ─── PRIVILEGED ACCESS CONTROL PLANE ───── */}
      {/* Forced dark band so light mode keeps contrast between sections */}
      <div className="dark">
        <ControlPlaneSection />
      </div>

      {/* ─── IDENTITY COVERAGE CARDS ───────────── */}
      <section className="section-padding border-b border-slate-900/[0.05] dark:border-white/[0.04] bg-slate-50 dark:bg-[#050a14]">
        <div className="container-xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="badge-cyan mb-5">Privileged Access for Every Identity</div>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white mb-5"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Secure Privileged Access Across Every Identity
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Move beyond basic authentication with intelligent, real-time privileged access control for AI agents, human users, and machine identities through OmniPriv.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* AI & Automated Identities */}
            <div className="group relative flex flex-col p-8 rounded-2xl border border-slate-900/[0.09] dark:border-white/[0.07] bg-white dark:bg-[#0A1628]/40 hover:border-[#00B8FF]/35 hover:shadow-[0_8px_20px_rgba(0,184,255,0.04)] transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00B8FF]/[0.06] via-transparent to-violet-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00B8FF]/0 to-transparent group-hover:via-[#00B8FF]/70 transition-all duration-300" />
              <div className="relative z-10 flex flex-col flex-1">
                <div className="relative w-full h-44 mb-6 rounded-xl overflow-hidden border border-slate-900/[0.08] dark:border-white/[0.08]">
                  <Image
                    src="/identities/ai-automated-identities.jpeg"
                    alt="Glowing neural network brain above a lit platform, ringed by security padlocks, representing AI and automated identities"
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#00B8FF]/10 border border-[#00B8FF]/15 flex items-center justify-center mb-5 group-hover:bg-[#00B8FF]/20 group-hover:shadow-[0_0_10px_rgba(0,184,255,0.12)] transition-all duration-300">
                  <Cpu className="w-6 h-6 text-[#00B8FF]" />
                </div>
                <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                  AI &amp; Automated Identities
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                  Secure privileged actions performed by AI-powered tools, automation, and intelligent workflows with policy-based access controls and controlled permissions.
                </p>
                <Link
                  href="/solutions/ai-agent-security"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#00B8FF] hover:gap-3 transition-all"
                >
                  Explore AI-Ready PAM <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Human Identities */}
            <div className="group relative flex flex-col p-8 rounded-2xl border border-slate-900/[0.09] dark:border-white/[0.07] bg-white dark:bg-[#0A1628]/40 hover:border-[#00B8FF]/35 hover:shadow-[0_8px_20px_rgba(0,184,255,0.04)] transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00B8FF]/[0.06] via-transparent to-violet-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00B8FF]/0 to-transparent group-hover:via-[#00B8FF]/70 transition-all duration-300" />
              <div className="relative z-10 flex flex-col flex-1">
                <div className="relative w-full h-44 mb-6 rounded-xl overflow-hidden border border-slate-900/[0.08] dark:border-white/[0.08]">
                  <Image
                    src="/identities/human-identities.jpeg"
                    alt="Colleagues collaborating around a table with holographic identity verification panels and a security shield, representing human identities"
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#00B8FF]/10 border border-[#00B8FF]/15 flex items-center justify-center mb-5 group-hover:bg-[#00B8FF]/20 group-hover:shadow-[0_0_10px_rgba(0,184,255,0.12)] transition-all duration-300">
                  <Users className="w-6 h-6 text-[#00B8FF]" />
                </div>
                <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                  Human Identities
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                  Secure administrators, employees, contractors, and vendors with MFA, role-based access, approval workflows, Just-in-Time privileges, and monitored sessions.
                </p>
                <Link
                  href="/solutions/human-identity-security"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#00B8FF] hover:gap-3 transition-all"
                >
                  Secure Human Access <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Machine Identities */}
            <div className="group relative flex flex-col p-8 rounded-2xl border border-slate-900/[0.09] dark:border-white/[0.07] bg-white dark:bg-[#0A1628]/40 hover:border-[#00B8FF]/35 hover:shadow-[0_8px_20px_rgba(0,184,255,0.04)] transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00B8FF]/[0.06] via-transparent to-violet-500/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00B8FF]/0 to-transparent group-hover:via-[#00B8FF]/70 transition-all duration-300" />
              <div className="relative z-10 flex flex-col flex-1">
                <div className="relative w-full h-44 mb-6 rounded-xl overflow-hidden border border-slate-900/[0.08] dark:border-white/[0.08]">
                  <Image
                    src="/identities/machine-identities.jpeg"
                    alt="Robot presenting a holographic key panel, surrounded by padlocked platforms representing cloud, server, database and application identities"
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#00B8FF]/10 border border-[#00B8FF]/15 flex items-center justify-center mb-5 group-hover:bg-[#00B8FF]/20 group-hover:shadow-[0_0_10px_rgba(0,184,255,0.12)] transition-all duration-300">
                  <Server className="w-6 h-6 text-[#00B8FF]" />
                </div>
                <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                  Machine Identities
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                  Control privileged credentials used by applications, service accounts, databases, cloud workloads, and other non-human identities while reducing unnecessary standing access.
                </p>
                <Link
                  href="/solutions/machine-identity-security"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#00B8FF] hover:gap-3 transition-all"
                >
                  Secure Machine Access <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES GRID ─────────────────────── */}
      <section className="section-padding border-b border-slate-900/[0.05] dark:border-white/[0.04] bg-white dark:bg-[#030711]">
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
                className="group relative p-6 rounded-2xl border border-slate-900/[0.09] dark:border-white/[0.07] bg-slate-100/40 dark:bg-[#0A1628]/40 hover:border-[#00B8FF]/35 hover:bg-slate-100/80 dark:hover:bg-[#0A1628]/80 hover:shadow-[0_0_14px_rgba(0,184,255,0.04)] transition-all duration-300 card-shine cursor-default overflow-hidden"
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
            <Link href="/features" className="btn-secondary">
              View All Features <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Forced dark band so light mode keeps contrast */}
          <div className="dark">
          <div className="mt-14 rounded-2xl border border-[#00B8FF]/15 bg-slate-100/60 dark:bg-[#0A1628] overflow-hidden">
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
                <div className="relative w-full h-48 mt-6 rounded-xl overflow-hidden border border-slate-900/[0.08] dark:border-white/[0.08]">
                  <Image
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=70"
                    alt="Security and infrastructure teams reviewing privileged activity together"
                    fill
                    sizes="(max-width: 1024px) 100vw, 560px"
                    className="object-cover"
                  />
                </div>
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
        </div>
      </section>

      {/* ─── AI-PAM TEASER (full deep dive on /ai-pam) ── */}
      <AiPamTeaser />

      {/* ─── HOW IT WORKS (SECURE ACCESS IN THREE STEPS) ───
          TEMPORARILY DISABLED — repeated the same connect → control → observe
          story as the Control Plane section.

      <section className="section-padding border-b border-slate-900/[0.05] dark:border-white/[0.04] bg-white dark:bg-[#040814]">
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

      */}

      {/* ─── COMPLIANCE ──────────────────────── */}
      {/* This section always has a dark background, so force the dark palette
          — otherwise its text stays near-black in light mode. */}
      <div className="dark">
      <section className="section-padding border-b border-slate-900/[0.05] dark:border-white/[0.04]" style={{ background: "linear-gradient(180deg, #0A1628 0%, #030711 100%)" }}>
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
                  className="flex flex-col items-center justify-center p-6 rounded-2xl border border-[#00B8FF]/18 bg-[#00B8FF]/[0.05] hover:bg-[#00B8FF]/[0.14] hover:border-[#00B8FF]/45 hover:shadow-[0_0_14px_rgba(0,184,255,0.06)] transition-all duration-300 group"
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
      </div>

      {/* ─── TESTIMONIALS ──────────────────────── */}
      <section className="section-padding border-b border-slate-900/[0.05] dark:border-white/[0.04]">
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
      <section className="section-padding border-b border-slate-900/[0.05] dark:border-white/[0.04] bg-slate-100/30 dark:bg-[#0A1628]/30">
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
                className="group flex flex-col rounded-2xl border border-slate-900/[0.09] dark:border-white/[0.07] bg-slate-100/50 dark:bg-[#0A1628]/50 hover:border-[#00B8FF]/[0.28] hover:bg-slate-100/80 dark:hover:bg-[#0A1628]/80 hover:shadow-[0_0_14px_rgba(0,184,255,0.04)] transition-all duration-300 overflow-hidden"
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

      {/* ─── CLOSING CTA ───────────────────────── */}
      {/* Forced dark band so light mode keeps contrast between sections */}
      <div className="dark">
        <ClosingCtaSection />
      </div>

      {/* ─── COMPLETE FAQ SECTION ───────────────── */}
      <PamFaqSection />
    </>
  );
}
