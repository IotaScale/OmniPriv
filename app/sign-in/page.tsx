"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Briefcase,
  Building,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Megaphone,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

/*
 * Partner Portal sign-in. Rendered inside the site header and footer
 * (app/layout.tsx), so it carries no logo or back link of its own.
 *
 * Behaviour is unchanged: the form posts to /api/auth/sign-in with the same
 * payload (email, password, returnUrl, loginType "partner") and routes to the
 * returned URL. Only the presentation changed: a split layout in the site's
 * visual language, a show/hide password control, Caps Lock hint and a
 * client-side "fill both fields" check before the request is made.
 */

/* Areas that exist in app/partner-portal. */
const AREAS = [
  { t: "Deals & leads", d: "Register opportunities and follow them through", i: Briefcase },
  { t: "Renewals & payouts", d: "Track renewals and partner payouts", i: RefreshCw },
  { t: "Learning", d: "Product training for your team", i: BookOpen },
  { t: "Marketing & resources", d: "Collateral and co-marketing material", i: Megaphone },
];

function PortalPanel() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % AREAS.length), 2600);
    return () => window.clearInterval(t);
  }, [reduce]);
  return (
    <div className="dark relative hidden lg:flex flex-col justify-between overflow-hidden op-band-navy p-10 xl:p-14">
      <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="aip-hero-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <span aria-hidden="true" />

      <div className="relative max-w-md">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00B8DB]/35 bg-[#00B8DB]/[0.1] px-3 py-1 text-[0.75rem] font-semibold text-[#7FE3F2]">
          <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" /> Partner Portal
        </span>
        <h2 className="mt-5 text-[2.25rem] xl:text-[2.75rem] font-bold leading-[1.05] tracking-[-0.03em] text-white" style={{ fontFamily: "var(--font-syne)" }}>
          Everything you need to work with OmniPriv, <span className="text-gradient">in one place.</span>
        </h2>
        <ul className="mt-8 space-y-2">
          {AREAS.map((a, k) => {
            const on = k === i;
            return (
              <li key={a.t} className={`relative flex items-center gap-3.5 rounded-2xl border px-4 py-3 transition-colors duration-300 ${on ? "border-[#00B8DB]/45 bg-[#00B8DB]/[0.08]" : "border-white/[0.07] bg-white/[0.02]"}`}>
                <span className={`inline-flex w-9 h-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${on ? "bg-[#00B8DB] text-[#03121c]" : "bg-white/[0.05] text-[#7FE3F2]"}`}>
                  <a.i className="w-4 h-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.9375rem] font-semibold text-white">{a.t}</span>
                  <span className="block text-[0.8125rem] text-slate-400">{a.d}</span>
                </span>
                {on && !reduce && <motion.span layoutId="portal-dot" className="ml-auto w-1.5 h-1.5 rounded-full bg-[#7FE3F2]" aria-hidden="true" />}
              </li>
            );
          })}
        </ul>
      </div>

      <p className="relative text-[0.8125rem] text-slate-400">
        Access credentials are provisioned by the OmniPriv sales team.
      </p>
    </div>
  );
}

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/partner-portal";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [caps, setCaps] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password) {
      setError("Enter your work email or username and your password.");
      return;
    }
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

  const field =
    "w-full rounded-xl border border-slate-900/[0.12] dark:border-white/[0.12] bg-white dark:bg-[#15171a] py-3 text-[0.9375rem] text-slate-950 dark:text-white placeholder:text-slate-400 outline-none transition-colors focus:border-[#00B8DB]/70 focus:ring-2 focus:ring-[#00B8DB]/20";

  return (
    <div className="aip min-h-[calc(100dvh-4.5rem)] grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] bg-white dark:bg-[#0b0c0e]">
      <PortalPanel />

      <section className="relative flex flex-col px-5 py-8 sm:px-10 lg:px-14 xl:px-20">
        <div className="aip-hero-grid pointer-events-none absolute inset-0 lg:hidden" aria-hidden="true" />
        <div className="relative flex flex-1 items-center justify-center py-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }} className="w-full max-w-[25rem]">
            <span className="lg:hidden inline-flex items-center gap-1.5 rounded-full border border-[#00B8DB]/35 bg-[#00B8DB]/[0.08] px-3 py-1 text-[0.75rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" /> Partner Portal
            </span>
            <h1 className="mt-4 lg:mt-0 text-[2rem] font-bold leading-tight tracking-[-0.03em] text-[#0a1628] dark:text-white" style={{ fontFamily: "var(--font-syne)" }}>
              Partner Sign In
            </h1>
            <p className="mt-2 text-[0.9375rem] text-slate-600 dark:text-slate-400">Sign in with your corporate partner credentials.</p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
              {error && (
                <div role="alert" className="flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/[0.08] p-3.5 text-[0.8125rem] leading-relaxed text-rose-700 dark:text-rose-300">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-[0.8125rem] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Work Email or Username
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" aria-hidden="true" />
                  <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className={`${field} pl-10 pr-4`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-[0.8125rem] font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" aria-hidden="true" />
                  <input
                    id="password"
                    name="password"
                    type={show ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyUp={(e) => setCaps(e.getModifierState("CapsLock"))}
                    onKeyDown={(e) => setCaps(e.getModifierState("CapsLock"))}
                    placeholder="••••••••••••"
                    className={`${field} pl-10 pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    aria-label={show ? "Hide password" : "Show password"}
                    aria-pressed={show}
                    className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex w-9 h-9 items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-900/[0.04] dark:hover:bg-white/[0.06] transition-colors"
                  >
                    {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {caps && <p className="mt-1.5 text-[0.75rem] font-medium text-amber-700 dark:text-amber-300">Caps Lock is on</p>}
              </div>

              <button type="submit" disabled={loading} className="hp-btn-primary group w-full disabled:opacity-60">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Sign In to Partner Portal
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-slate-50 dark:bg-[#15171a] p-5">
              <p className="text-[0.875rem] text-slate-600 dark:text-slate-400">Represent a new security reseller, MSP, or system integrator?</p>
              <Link href="/sign-up" className="mt-3 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold op-link group">
                <Building className="w-4 h-4" aria-hidden="true" />
                Register Your Partner Organization
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[0.75rem] text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" aria-hidden="true" /> Encrypted in transit
          </span>
          <Link href="/channel-admin/login" className="inline-flex items-center gap-1.5 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00B8DB]" aria-hidden="true" />
            OmniPriv Internal Team? Go to Channel Admin Console
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
