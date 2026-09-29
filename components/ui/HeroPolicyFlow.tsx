"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  Users,
  Video,
  Database,
  Terminal,
  ChevronRight,
  ShieldAlert,
  Lock,
  Radio,
  Fingerprint
} from "lucide-react";

export default function HeroPolicyFlow() {
  const [activeStep, setActiveStep] = useState<number>(3); // JIT window focused

  const steps = [
    {
      id: 1,
      title: "Verified Identity",
      badge: "MFA Verified",
      badgeColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
      detail: "Alex Chen (Lead SRE) · FIDO2 Hardware Key",
      metadata: "IP 198.51.100.24 · Compliant Device",
      icon: Fingerprint,
      completed: true,
    },
    {
      id: 2,
      title: "Policy Evaluation",
      badge: "RBAC & PoLP",
      badgeColor: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
      detail: "Rule: DB-Tier-Migration · Ticket: CHG-84920",
      metadata: "Restricted command set enforced",
      icon: ShieldCheck,
      completed: true,
    },
    {
      id: 3,
      title: "Dual Authorization",
      badge: "2/2 Approvals",
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
      detail: "SecOps Lead (Approved) · Team Lead (Approved)",
      metadata: "Timestamped audit record generated",
      icon: Users,
      completed: true,
    },
    {
      id: 4,
      title: "JIT Access Window",
      badge: "JIT: 30 min",
      badgeColor: "text-[#00B8FF] bg-[#00B8FF]/10 border-[#00B8FF]/30",
      detail: "Ephemeral token active · 28:14 remaining",
      metadata: "Zero standing privilege · Auto-revoke armed",
      icon: Clock,
      completed: true,
      active: true,
    },
    {
      id: 5,
      title: "Live Session Monitoring",
      badge: "● Live Recording",
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      detail: "Proxied TLS 1.3 gateway · Keystroke capture",
      metadata: "Real-time anomaly scoring: Normal",
      icon: Video,
      completed: true,
      active: true,
    },
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto lg:max-w-none">
      {/* Subtle architectural container glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-[#00B8FF]/10 via-[#0284c7]/5 to-transparent blur-xl pointer-events-none" />

      {/* Main Console Surface */}
      <div className="relative rounded-2xl border border-slate-900/[0.1] dark:border-white/[0.08] bg-slate-100 dark:bg-[#070d18] shadow-2xl overflow-hidden">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-900/[0.08] dark:border-white/[0.06] bg-slate-100/80 dark:bg-[#0a1220]/80 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700/80" />
            </div>
            <span className="h-3 w-px bg-slate-900/[0.06] dark:bg-white/[0.08] mx-1" />
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-600 dark:text-slate-400">
              <Lock className="w-3 h-3 text-[#00B8FF]" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">omnipriv.gateway</span>
              <span className="text-slate-600">/</span>
              <span>policy-pipeline</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border border-[#00B8FF]/25 bg-[#00B8FF]/[0.08] text-[10px] font-semibold text-[#00B8FF]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B8FF] animate-pulse" />
              POLICY ENGINE ACTIVE
            </div>
            <span className="text-[10px] font-mono text-slate-500 hidden sm:inline-block">
              REQ-84920
            </span>
          </div>
        </div>

        {/* Protected Asset Banner */}
        <div className="p-4 sm:p-5 border-b border-slate-900/[0.08] dark:border-white/[0.06] bg-slate-100 dark:bg-[#09111e]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#00B8FF]/10 border border-[#00B8FF]/25 flex items-center justify-center text-[#00B8FF] flex-shrink-0 mt-0.5">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-slate-950 dark:text-white tracking-tight">
                    prod-db-cluster-01.us-east
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-900/[0.04] dark:bg-white/[0.05] border border-slate-900/[0.1] dark:border-white/[0.08] text-slate-700 dark:text-slate-300">
                    PostgreSQL 16
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Isolated Proxy
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Access scope: Schema migration &middot; Sensitive telemetry encrypted &middot; Port 5432
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-slate-900/[0.02] dark:bg-white/[0.03] border border-slate-900/[0.08] dark:border-white/[0.06] px-2.5 py-1 rounded-md">
                JIT Window: <strong className="text-[#00B8FF]">28m 14s</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Visual Policy Flow Stages */}
        <div className="p-4 sm:p-5 space-y-2.5">
          <div className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-2 flex items-center justify-between">
            <span>Privileged Access Lifecycle Verification</span>
            <span className="text-[#00B8FF]">5/5 Policy Controls Enforced</span>
          </div>

          <div className="space-y-2">
            {steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`group relative p-3 sm:p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-[#00B8FF]/40 bg-slate-200 dark:bg-[#0c182c] shadow-[0_0_20px_rgba(0,184,255,0.06)]"
                      : "border-slate-900/[0.06] dark:border-white/[0.05] bg-slate-100 dark:bg-[#080f1c] hover:border-slate-900/[0.15] dark:hover:border-white/[0.12] hover:bg-slate-100 dark:hover:bg-[#0a1324]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected
                            ? "bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/30"
                            : "bg-slate-900/[0.03] dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border border-slate-900/[0.08] dark:border-white/[0.06] group-hover:text-slate-800 dark:group-hover:text-slate-200"
                        }`}
                      >
                        <step.icon className="w-3.5 h-3.5" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                            {step.title}
                          </span>
                          <span
                            className={`text-[10px] font-medium px-2 py-0.2 rounded-full border ${step.badgeColor} flex-shrink-0`}
                          >
                            {step.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate mt-0.5">
                          {step.detail}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[10px] font-mono text-slate-500 hidden sm:inline-block">
                        {step.metadata}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Terminal & Governance Footer */}
        <div className="px-4 sm:px-5 py-3.5 border-t border-slate-900/[0.08] dark:border-white/[0.06] bg-slate-50 dark:bg-[#060b14] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse flex-shrink-0" />
            <span className="text-slate-700 dark:text-slate-300 font-mono text-[11px]">
              Active Session: <span className="text-emerald-400 font-semibold">Live Audit Recording</span>
            </span>
            <span className="text-slate-600 hidden sm:inline">&middot;</span>
            <span className="text-slate-500 text-[11px] hidden sm:inline">
              Keystroke &amp; Protocol Proxy
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-[10px] font-mono text-slate-500 bg-slate-900/[0.02] dark:bg-white/[0.03] px-2 py-1 rounded border border-slate-900/[0.06] dark:border-white/[0.05]">
              Zero Standing Privilege
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 font-semibold">
              Encrypted Vault
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
