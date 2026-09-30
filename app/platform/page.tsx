import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Cpu, CheckCircle2 } from "lucide-react";
import { solutions, datasheetStats, complianceStandards, platformSpecs } from "./data";

export const metadata: Metadata = {
  title: "Platform: Enterprise PAM Capabilities & Specifications",
  description:
    "Explore OmniPriv's 8 core PAM capability modules covering 80+ enterprise requirements, 100% agentless architecture, regulatory compliance, and on-premise deployment specifications.",
};

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-16 pb-20 border-b border-slate-900/[0.05] dark:border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-[#030711]" />
        <div className="container-xl relative z-10 text-center">
          <div className="badge-cyan mb-6 inline-flex mx-auto">Enterprise PAM Platform</div>
          <h1
            className="text-5xl md:text-6xl font-extrabold text-slate-950 dark:text-white mb-6 max-w-4xl mx-auto"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Enterprise-Grade <span className="text-gradient">PAM Platform</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            OmniPriv delivers complete privileged access lifecycle management — from credential vaulting
            and session isolation to AI-driven threat detection and regulatory compliance — in a unified,
            agentless platform deployable on-premise across any enterprise environment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/demo" className="btn-primary text-base px-8 py-3.5">
              Request a Demo <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#specifications" className="btn-secondary text-base px-8 py-3.5">
              View Specifications
            </a>
          </div>
        </div>
      </section>

      {/* Datasheet Highlights Bar */}
      <section className="border-b border-slate-900/[0.05] dark:border-white/[0.04] bg-slate-100/80 dark:bg-[#071322]/80 backdrop-blur-sm py-8">
        <div className="container-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {datasheetStats.map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl border border-slate-900/[0.05] dark:border-white/[0.04] bg-slate-900/[0.02] dark:bg-white/[0.02]">
                <div
                  className="text-3xl lg:text-4xl font-extrabold text-[#00B8FF] mb-1"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-950 dark:text-white mb-0.5">{stat.label}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Cards Grid */}
      <section className="section-padding border-b border-slate-900/[0.05] dark:border-white/[0.04]">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="badge-cyan mb-5">Core Capabilities</div>
            <h2
              className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white mb-4"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              8 Pillars of Privileged Access Management
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Each capability module addresses a critical dimension of modern PAM. Click any module
              to explore its detailed feature set.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {solutions.map((solution) => (
              <Link
                key={solution.slug}
                href={`/platform/${solution.slug}`}
                className="group p-6 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.06] bg-slate-100/60 dark:bg-[#0A1628]/60 hover:border-[#00B8FF]/25 hover:bg-slate-100/80 dark:hover:bg-[#0A1628]/80 transition-all duration-300 card-shine flex flex-col"
              >
                <div className="icon-wrapper w-12 h-12 rounded-xl mb-5 group-hover:scale-110 transition-transform duration-300">
                  <solution.icon className="w-6 h-6" />
                </div>
                <h3
                  className="text-lg font-bold text-slate-950 dark:text-white mb-2"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {solution.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5 flex-1">
                  {solution.tagline}
                </p>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-[#00B8FF] group-hover:gap-2.5 transition-all duration-300">
                  Learn More <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Compliance Standards Summary */}
      <section className="section-padding bg-slate-100/50 dark:bg-[#071322]/50 border-b border-slate-900/[0.05] dark:border-white/[0.04]">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="badge-cyan mb-4 inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Compliance Readiness
            </div>
            <h2
              className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white mb-4"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Regulatory Standards Supported <span className="text-gradient">Out of the Box</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              OmniPriv provides automated reports, immutable audit trails, and strict access governance
              mapped directly to leading global and regional regulations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {complianceStandards.map((std) => (
              <div
                key={std.code}
                className="p-5 rounded-xl border border-slate-900/[0.08] dark:border-white/[0.06] bg-slate-100/70 dark:bg-[#0A1628]/70 hover:border-[#00B8FF]/20 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-extrabold text-[#00B8FF] text-base font-mono">{std.code}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="text-sm font-semibold text-slate-950 dark:text-white mb-1.5">{std.fullName}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{std.applicability}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Specifications */}
      <section id="specifications" className="section-padding scroll-mt-20 border-b border-slate-900/[0.05] dark:border-white/[0.04]">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="badge-cyan mb-4 inline-flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Technical Specifications
            </div>
            <h2
              className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white mb-4"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Platform <span className="text-gradient">Specifications</span> &amp; Architecture
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Engineered for seamless enterprise rollout — completely hardware-agnostic, agentless,
              and hardened for AI-native security.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {platformSpecs.map((spec) => (
              <div
                key={spec.label}
                className="p-4 rounded-xl border border-slate-900/[0.08] dark:border-white/[0.06] bg-slate-100/60 dark:bg-[#0A1628]/60 flex flex-col justify-between"
              >
                <span className="text-xs font-semibold text-[#00B8FF] uppercase tracking-wider mb-1">
                  {spec.label}
                </span>
                <span className="text-sm text-slate-800 dark:text-slate-200 leading-snug">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding border-b border-slate-900/[0.05] dark:border-white/[0.04]">
        <div className="container-xl">
          <div className="relative rounded-3xl overflow-hidden border border-[#00B8FF]/15 p-10 md:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 dark:from-[#0A1628] to-white dark:to-[#030711]" />
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#00B8FF]/40 to-transparent" />
            <div className="relative z-10">
              <h2
                className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white mb-4"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Ready to Secure Your Privileged Access?
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                Request a demo or contact our engineering team to discuss your enterprise PAM deployment requirements.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/demo" className="btn-primary text-base px-8 py-3.5">
                  Request a Demo <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/enterprise" className="btn-secondary text-base px-8 py-3.5">
                  Enterprise Plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
