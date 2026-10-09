"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield, Mail, ArrowRight, Lock, AlertCircle, Loader2, Building, ShieldCheck } from "lucide-react";

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/partner-portal";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
          returnUrl,
          loginType: "partner",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Authentication failed. Please verify credentials.");
        return;
      }

      // Successful login -> navigate to returned safe return URL
      router.push(data.returnUrl || "/partner-portal");
      router.refresh();
    } catch (err: any) {
      console.error("Sign-in error", err);
      setError("Unable to connect to OmniPriv security gateway. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center py-16 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 dark:from-[#0B0C0E]/60 via-white/85 dark:via-[#0B0C0E]/85 to-white dark:to-[#0B0C0E]" />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,184,255,0.09) 0%, transparent 65%)" }}
      />

      <div className="w-full max-w-md relative z-10 flex flex-col items-center">
        {/* Logo mark */}
        <Link href="/" className="flex items-center gap-2.5 mb-8">
          <div className="icon-wrapper w-10 h-10 rounded-xl">
            <Shield className="w-5 h-5 text-[#00B8FF]" />
          </div>
          <span
            className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            OmniPriv
          </span>
        </Link>

        {/* Card */}
        <div className="w-full rounded-2xl border border-slate-900/[0.1] dark:border-white/[0.08] bg-slate-100/90 dark:bg-[#0B0C0E]/90 backdrop-blur-xl p-8 shadow-[0_14px_34px_rgba(0,0,0,0.14)]">
          <div className="text-center mb-6">
            <div className="badge-cyan mx-auto mb-3">Partner Portal</div>
            <h1
              className="text-2xl font-extrabold text-slate-950 dark:text-white mb-1.5"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Partner Sign In
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Sign in with your corporate partner credentials.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs leading-relaxed">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider"
              >
                Work Email or Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 dark:bg-white/[0.05] border border-slate-900/[0.12] dark:border-white/[0.1] text-slate-950 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#00B8FF]/60 transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 dark:bg-white/[0.05] border border-slate-900/[0.12] dark:border-white/[0.1] text-slate-950 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#00B8FF]/60 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3 mt-3 font-semibold shadow-md disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In to Partner Portal <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </form>

          {/* New partner company CTA */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/[0.08] text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Represent a new security reseller, MSP, or system integrator?
            </p>
            <Link
              href="/sign-up"
              className="btn-secondary w-full justify-center py-2.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 border-cyan-500/20 hover:border-cyan-500/50"
            >
              <Building className="w-3.5 h-3.5 mr-1.5" />
              Register Your Partner Organization
            </Link>
          </div>
        </div>

        {/* Dedicated Channel Admin link */}
        <div className="mt-6 text-center">
          <Link
            href="/channel-admin/login"
            className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors inline-flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
            <span>OmniPriv Internal Team? Go to Channel Admin Console</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
