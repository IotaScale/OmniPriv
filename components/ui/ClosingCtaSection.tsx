"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import LightBeamButton from "@/components/ui/LightBeamButton";

export default function ClosingCtaSection() {
  return (
    <section className="section-padding border-b border-slate-900/[0.05] dark:border-white/[0.04] bg-white dark:bg-[#0B0C0E]">
      <div className="container-xl max-w-5xl mx-auto">
        <div className="relative rounded-2xl border border-slate-900/[0.1] dark:border-white/[0.08] bg-slate-100 dark:bg-[#0b0c0e] p-8 sm:p-12 lg:p-16 overflow-hidden" data-aos="fade-up">
          {/* Subtle top border accent */}
          <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[#00B8DB]/40 to-transparent" />

          <div className="text-center max-w-3xl mx-auto">
            {/* Small product-status accent */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-900/[0.1] dark:border-white/[0.08] bg-slate-900/[0.02] dark:bg-white/[0.03] text-slate-700 dark:text-slate-300 text-xs font-mono mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B8DB] animate-pulse" />
              <span>Enterprise PAM Ready &middot; AI-Native Architecture</span>
            </div>

            {/* Heading */}
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white leading-tight mb-5"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Ready to strengthen control over privileged access?
            </h2>

            {/* Body */}
            <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Explore OmniPriv’s enterprise PAM solutions and discover how centralized access control, Just-in-Time privileges, credential protection, and session visibility can help secure your organization’s most sensitive systems.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link
                href="/platform"
                className="btn-primary text-base px-8 py-3.5 w-full sm:w-auto text-center"
              >
                Explore Enterprise PAM
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <LightBeamButton
                href="/demo"
                className="text-base px-8 py-3.5 w-full sm:w-auto text-center"
              >
                Request a Technical Demo
              </LightBeamButton>
            </div>

            {/* Subdued reassurance row */}
            <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                AI-Driven JIT Access
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Session Video &amp; Keystroke Logging
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Brokered Multi-Cloud Proxy
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
