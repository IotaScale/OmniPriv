"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Mail, ArrowRight, Lock, Info, AlertCircle } from "lucide-react";

export default function SignInPage() {
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("Invalid username/password.");
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070E]/60 via-[#07070E]/85 to-[#07070E]" />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,184,255,0.09) 0%, transparent 65%)" }}
      />

      <div className="container-xl relative z-10 flex flex-col items-center">
        {/* Logo mark */}
        <Link href="/" className="flex items-center gap-2.5 mb-10">
          <div className="icon-wrapper w-10 h-10 rounded-xl">
            <Shield className="w-5 h-5" />
          </div>
          <span
            className="text-xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            OmniPriv
          </span>
        </Link>

        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0E0E1C]/80 backdrop-blur-xl p-8 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            <div className="text-center mb-6">
              <div className="badge-cyan mx-auto mb-3">Partner Portal</div>
              <h1
                className="text-2xl font-extrabold text-white mb-1.5"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                OmniPriv Partner Portal
              </h1>
              <p className="text-sm text-slate-400">
                Enter the credentials provided by your account team.
              </p>
            </div>

            {/* Info banner */}
            <div className="flex items-start gap-3 p-4 rounded-xl border border-[#6366F1]/20 bg-[#6366F1]/[0.07] mb-7">
              <Info className="w-4 h-4 text-[#6366F1] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300 leading-relaxed">
                OmniPriv is an enterprise platform. Sign-in credentials are
                issued exclusively by our sales team after your account is
                provisioned. If you don&apos;t have credentials yet, contact
                sales below.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <div className="flex items-center gap-2.5 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider"
                >
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@company.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#6366F1]/50 focus:bg-white/[0.07] transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[#6366F1]/50 focus:bg-white/[0.07] transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center mt-2"
              >
                Sign In <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px bg-white/[0.07]" />
            <span className="text-xs text-slate-600 uppercase tracking-wider font-medium">
              Don&apos;t have access yet?
            </span>
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>

          {/* Sales CTA card */}
          <div className="rounded-2xl border border-white/[0.07] bg-[#0E0E1C]/60 p-7 text-center">
            <div className="icon-wrapper w-11 h-11 rounded-xl mx-auto mb-4">
              <Mail className="w-5 h-5" />
            </div>
            <h2
              className="text-base font-bold text-white mb-2"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Get Your Credentials from Sales
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              OmniPriv accounts are provisioned by our sales team. Reach out to
              start an evaluation or request access for your organisation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/demo" className="btn-primary text-sm px-5 py-2.5 rounded-lg">
                Schedule a Demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/demo"
                className="btn-secondary text-sm px-5 py-2.5 rounded-lg"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

