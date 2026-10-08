"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, Lock, Info, AlertCircle } from "lucide-react";

const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5";
const fieldIcon =
  "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none";
const cardClass =
  "rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#0F2140]";

export default function SignInPage() {
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("Invalid username/password.");
  }

  return (
    <>
      <section className="flex min-h-[calc(100svh-72px)] items-center py-12">
        <div className="container-xl">
          <div className="mx-auto w-full max-w-md">
            <h1 className="op-h1 mb-8 text-center">OmniPriv Partner Portal</h1>

            <div className={`${cardClass} p-6 sm:p-8 shadow-[0_1px_2px_rgba(10,22,40,0.04),0_16px_40px_-20px_rgba(10,22,40,0.18)] dark:shadow-none`}>
              <p className="text-[0.9375rem] leading-[1.65] text-slate-600 dark:text-slate-400">
                Enter the credentials provided by your account team.
              </p>

              <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#00667A]/20 bg-[#00B8DB]/[0.06] p-4 dark:border-[#00B8DB]/20">
                <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#00667A] dark:text-[#00B8DB]" aria-hidden="true" />
                <p className="text-sm leading-[1.6] text-slate-700 dark:text-slate-300">
                  OmniPriv is an enterprise platform. Sign-in credentials are
                  issued exclusively by our sales team after your account is
                  provisioned. If you don&apos;t have credentials yet, contact
                  sales below.
                </p>
              </div>

              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                {error && (
                  <div
                    role="alert"
                    className="flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/[0.08] p-3 text-sm text-red-700 dark:text-red-300"
                  >
                    <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    {error}
                  </div>
                )}
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className={fieldIcon} aria-hidden="true" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@company.com"
                      className="input-dark !pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className={labelClass}>
                    Password
                  </label>
                  <div className="relative">
                    <Lock className={fieldIcon} aria-hidden="true" />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      placeholder="••••••••••••"
                      className="input-dark !pl-10"
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full justify-center">
                  Sign In <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container-xl">
          <div className="mx-auto w-full max-w-md">
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-900/[0.08] dark:bg-white/[0.08]" />
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Don&apos;t have access yet?
              </span>
              <div className="h-px flex-1 bg-slate-900/[0.08] dark:bg-white/[0.08]" />
            </div>

            <div className={`${cardClass} p-6`}>
              <div className="icon-wrapper mb-4">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </div>
              <h2 className="op-card-title">Get Your Credentials from Sales</h2>
              <p className="op-card-text mt-2">
                OmniPriv accounts are provisioned by our sales team. Reach out to
                start an evaluation or request access for your organisation.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link href="/demo" className="btn-primary btn-sm">
                  Schedule a Demo <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/demo" className="btn-secondary btn-sm">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
