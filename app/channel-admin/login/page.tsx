"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldAlert,
  UserCheck,
  Lock,
  ArrowRight,
  AlertCircle,
  KeyRound,
  Shield,
  Terminal,
} from "lucide-react";

function ChannelAdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawReturnUrl = searchParams.get("returnUrl") || "/channel-admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [forbiddenState, setForbiddenState] = useState<{
    role: string;
    orgName: string;
  } | null>(null);

  // If already authenticated as Channel Admin, redirect directly to /channel-admin
  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/auth/session");
        if (res.ok) {
          const data = await res.json();
          if (
            data.user &&
            (data.user.role === "Channel Admin" || data.user.role === "Partner Manager")
          ) {
            router.replace("/channel-admin");
          }
        }
      } catch {
        // Unauthenticated or network issue - proceed with login form
      }
    }
    checkSession();
  }, [router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setForbiddenState(null);

    try {
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          returnUrl: rawReturnUrl,
          loginType: "channel_admin",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 403) {
          setForbiddenState({
            role: data.role || "Partner User",
            orgName: data.orgName || "Partner Tenant",
          });
        } else {
          setErrorMsg(data.error || "Authentication failed. Access denied.");
        }
      } else {
        router.push(data.returnUrl || "/channel-admin");
      }
    } catch {
      setErrorMsg("A network communication error occurred with the security gateway.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#070D18] p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Subtle security ambient accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Badge */}
        <div className="text-center mb-6 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[#00B8FF] text-xs font-semibold mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span className="tracking-wide uppercase text-[10px]">Restricted Internal Gateway</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Sign in to OmniPriv Channel Administration
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Use your authorized OmniPriv administrator account to manage partner organizations, channel operations, and commercial governance.
          </p>
        </div>

        {/* 403 Forbidden Access State for Non-Admin Accounts */}
        {forbiddenState && (
          <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300 text-xs mb-5 space-y-2">
            <div className="flex items-center gap-2 font-semibold text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>403 Forbidden — Access Not Available</span>
            </div>
            <p>
              Your account is registered as a partner user and is not authorized to access internal Channel Administration operations.
            </p>
            <div className="pt-2 border-t border-rose-500/20 flex items-center justify-between">
              <Link
                href="/partner-portal"
                className="text-cyan-400 hover:underline font-semibold inline-flex items-center gap-1"
              >
                Go to Partner Portal Workspace <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

        {/* Standard Error Notice */}
        {errorMsg && !forbiddenState && (
          <div className="flex items-start gap-2.5 p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs mb-5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>{errorMsg}</div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 relative">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              OmniPriv Admin Username or Email
            </label>
            <div className="relative">
              <UserCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Admin username or corporate email"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Security Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Audit enforced: All access attempts recorded with IP and timestamp.</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/20 disabled:opacity-60"
          >
            {loading ? "Verifying Administrative Session..." : "Authenticate as Channel Admin"}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/[0.06] text-center text-xs text-slate-500 dark:text-slate-400">
          Not an OmniPriv channel administrator?{" "}
          <Link href="/sign-in" className="text-[#00B8FF] hover:underline font-medium">
            Standard Partner Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ChannelAdminLoginPage() {
  return (
    <section className="min-h-screen bg-slate-900 dark:bg-[#030611] flex flex-col items-center justify-center p-4">
      {/* Brand logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <KeyRound className="w-5 h-5 text-white" />
        </div>
        <div className="text-left">
          <div className="text-lg font-bold tracking-tight text-white leading-tight">
            OmniPriv
          </div>
          <div className="text-[10px] uppercase tracking-wider font-semibold text-cyan-400">
            Channel Governance & Administration
          </div>
        </div>
      </Link>

      <Suspense fallback={<div className="text-xs text-slate-400">Loading administrative gateway...</div>}>
        <ChannelAdminLoginForm />
      </Suspense>
    </section>
  );
}
