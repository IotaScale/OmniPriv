import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { solutions } from "./data";

export const metadata: Metadata = {
  title: "Solutions — Enterprise PAM Capabilities",
  description:
    "Explore OmniPriv's 8 core PAM capabilities: infrastructure deployment, credential management, application security, enterprise integration, session management, workflow access control, audit compliance, and threat detection.",
};

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 border-b border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030711]" />
        <div className="container-xl relative z-10 text-center">
          <div className="badge-cyan mb-6 inline-flex mx-auto">PAM Capabilities</div>
          <h1
            className="text-5xl md:text-6xl font-extrabold text-white mb-6 max-w-4xl mx-auto"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Enterprise-Grade <span className="text-gradient">PAM Solutions</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            From infrastructure deployment to threat detection — OmniPriv covers every dimension of
            privileged access management with purpose-built, enterprise-ready capabilities.
          </p>
          <Link href="/demo" className="btn-primary text-base px-8 py-3.5">
            Request a Demo <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Solution Cards Grid */}
      <section className="section-padding-lg">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="badge-cyan mb-5">Core Capabilities</div>
            <h2
              className="text-3xl md:text-4xl font-extrabold text-white mb-4"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              8 Pillars of Privileged Access Management
            </h2>
            <p className="text-slate-400 text-lg">
              Each capability is designed to address a critical dimension of PAM — click to explore
              the full feature set.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {solutions.map((solution) => (
              <Link
                key={solution.slug}
                href={`/solutions/${solution.slug}`}
                className="group p-6 rounded-2xl border border-white/[0.06] bg-[#0A1628]/60 hover:border-[#00B8FF]/25 hover:bg-[#0A1628]/80 transition-all duration-300 card-shine flex flex-col"
              >
                <div className="icon-wrapper w-12 h-12 rounded-xl mb-5 group-hover:scale-110 transition-transform duration-300">
                  <solution.icon className="w-6 h-6" />
                </div>
                <h3
                  className="text-lg font-bold text-white mb-2"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {solution.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-5 flex-1">
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

      {/* CTA */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="relative rounded-3xl overflow-hidden border border-[#00B8FF]/15 p-10 md:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] to-[#030711]" />
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#00B8FF]/40 to-transparent" />
            <div className="relative z-10">
              <h2
                className="text-3xl md:text-4xl font-extrabold text-white mb-4"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Not Sure Where to Start?
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                Talk to a PAM expert who can help you identify which capabilities are most relevant
                to your organization's security posture and compliance requirements.
              </p>
              <Link href="/demo" className="btn-primary text-base px-8 py-3.5">
                Schedule a Consultation <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
