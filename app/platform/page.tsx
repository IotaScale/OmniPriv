import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { solutions } from "./data";

export const metadata: Metadata = {
  title: "Platform: Enterprise PAM Capabilities",
  description:
    "Explore OmniPriv's 8 core PAM capabilities: infrastructure deployment, credential management, application security, enterprise integration, session management, workflow access control, audit compliance, and threat detection.",
};

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-24 border-b border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=1920&q=50" alt="" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-[#07070E]/80" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-[#07070E]" />
        </div>
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="container-xl relative z-10 text-center">
          <div className="badge-cyan mb-6 inline-flex mx-auto">PAM Capabilities</div>
          <h1
            className="text-5xl md:text-6xl font-extrabold text-white mb-6 max-w-4xl mx-auto"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Enterprise-Grade <span className="text-[#6366F1]">PAM Platform</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            From infrastructure deployment to threat detection, OmniPriv covers every dimension of
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
              Each capability is designed to address a critical dimension of PAM. Click to explore
              the full feature set.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {solutions.map((solution) => (
              <Link
                key={solution.slug}
                href={`/platform/${solution.slug}`}
                className="group p-6 rounded-2xl border border-white/[0.06] bg-[#0E0E1C]/60 hover:border-[#6366F1]/25 hover:bg-[#0E0E1C]/80 transition-all duration-300 card-shine flex flex-col"
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
                <div className="flex items-center gap-1.5 text-sm font-semibold text-[#6366F1] group-hover:gap-2.5 transition-all duration-300">
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
          <div className="relative rounded-3xl overflow-hidden border border-[#6366F1]/15 p-10 md:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0E0E1C] to-[#07070E]" />
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#6366F1]/40 to-transparent" />
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

