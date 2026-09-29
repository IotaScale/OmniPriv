"use client";

import React, { useState } from "react";
import {
  Server,
  Cloud,
  Database,
  Cpu,
  Shield,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Play,
  Square,
  ArrowRight,
  Terminal,
  Key,
  Users,
  Lock,
  ExternalLink,
  Laptop
} from "lucide-react";

export default function ThreeStepsLifecycle() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="w-full">
      {/* Progression treatment: 01 Connect → 02 Control → 03 Monitor */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-12">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-900/[0.1] dark:border-white/[0.08] bg-slate-100 dark:bg-[#070e1c] text-xs font-mono">
          <span className="text-[#00B8FF] font-bold">01</span>
          <span className="text-slate-950 dark:text-white font-medium">Connect</span>
        </div>
        <span className="text-slate-600 hidden sm:inline text-sm">&rarr;</span>
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-900/[0.1] dark:border-white/[0.08] bg-slate-100 dark:bg-[#070e1c] text-xs font-mono">
          <span className="text-[#00B8FF] font-bold">02</span>
          <span className="text-slate-950 dark:text-white font-medium">Control</span>
        </div>
        <span className="text-slate-600 hidden sm:inline text-sm">&rarr;</span>
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-900/[0.1] dark:border-white/[0.08] bg-slate-100 dark:bg-[#070e1c] text-xs font-mono">
          <span className="text-[#00B8FF] font-bold">03</span>
          <span className="text-slate-950 dark:text-white font-medium">Monitor</span>
        </div>
      </div>

      {/* Connected Cards Grid */}
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
        {/* Subtle progression connector line behind cards (desktop only) */}
        <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-[#00B8FF]/20 to-transparent -translate-y-1/2 pointer-events-none" />

        {/* ── CARD 1: Connect Infrastructure ── */}
        <div
          onMouseEnter={() => setHoveredCard(1)}
          onMouseLeave={() => setHoveredCard(null)}
          className={`group relative flex flex-col rounded-2xl border transition-all duration-200 bg-slate-100 dark:bg-[#08101d] overflow-hidden ${
            hoveredCard === 1
              ? "border-[#00B8FF]/50 -translate-y-1 shadow-[0_12px_32px_rgba(0,184,255,0.08)]"
              : "border-slate-900/[0.1] dark:border-white/[0.08] hover:border-slate-900/[0.2] dark:hover:border-white/[0.16]"
          }`}
        >
          {/* Card Header & Content */}
          <div className="p-6 sm:p-7 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-[#00B8FF] tracking-wider uppercase">
                Step 01 &middot; Infrastructure
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Mesh
              </span>
            </div>

            <h3
              className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white mb-3"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Connect Infrastructure
            </h3>

            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
              Connect cloud, on-premises, hybrid, database, Kubernetes, and third-party environments through a centralized privileged access layer.
            </p>

            {/* Product-Style Infrastructure Map Visual */}
            <div className="mt-auto pt-2">
              <div className="rounded-xl border border-slate-900/[0.08] dark:border-white/[0.06] bg-slate-50 dark:bg-[#050a14] p-4 relative overflow-hidden">
                {/* Central OmniPriv Gateway */}
                <div className="flex flex-col items-center justify-center mb-4">
                  <div className="px-3 py-1.5 rounded-lg border border-[#00B8FF]/40 bg-[#00B8FF]/10 text-slate-950 dark:text-white text-xs font-bold font-mono flex items-center gap-2 shadow-[0_0_15px_rgba(0,184,255,0.15)]">
                    <Shield className="w-3.5 h-3.5 text-[#00B8FF]" />
                    <span>OmniPriv Access Gateway</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono mt-1">
                    Centralized TLS 1.3 Proxy
                  </span>
                </div>

                {/* Connected Endpoints Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { label: "AWS", type: "us-east-1", icon: Cloud, active: true },
                    { label: "On-prem", type: "RHEL 9 Cluster", icon: Server, active: true },
                    { label: "Win Server", type: "AD / RDP", icon: Laptop, active: true },
                    { label: "PostgreSQL", type: "Prod DB-01", icon: Database, active: true },
                    { label: "Kubernetes", type: "EKS Prod", icon: Cpu, active: true },
                    { label: "Vendor access", type: "ZTNA Scoped", icon: Lock, active: true },
                  ].map((node) => (
                    <div
                      key={node.label}
                      className="p-2 rounded-lg border border-slate-900/[0.06] dark:border-white/[0.05] bg-slate-100 dark:bg-[#091222] hover:border-[#00B8FF]/30 transition-colors"
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <node.icon className="w-3 h-3 text-[#00B8FF]" />
                        <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 truncate">
                          {node.label}
                        </span>
                      </div>
                      <div className="text-[9px] font-mono text-slate-500 truncate">
                        {node.type}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Status Bar */}
                <div className="mt-3 pt-2.5 border-t border-slate-900/[0.08] dark:border-white/[0.06] flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Secure connection established
                  </span>
                  <span className="text-slate-500">Agentless</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CARD 2: Define & Enforce Access Policies ── */}
        <div
          onMouseEnter={() => setHoveredCard(2)}
          onMouseLeave={() => setHoveredCard(null)}
          className={`group relative flex flex-col rounded-2xl border transition-all duration-200 bg-slate-100 dark:bg-[#08101d] overflow-hidden ${
            hoveredCard === 2
              ? "border-[#00B8FF]/50 -translate-y-1 shadow-[0_12px_32px_rgba(0,184,255,0.08)]"
              : "border-slate-900/[0.1] dark:border-white/[0.08] hover:border-slate-900/[0.2] dark:hover:border-white/[0.16]"
          }`}
        >
          {/* Card Header & Content */}
          <div className="p-6 sm:p-7 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-[#00B8FF] tracking-wider uppercase">
                Step 02 &middot; Governance
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono text-sky-400 bg-sky-500/10 border border-sky-500/20">
                PoLP Enforced
              </span>
            </div>

            <h3
              className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white mb-3"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Define &amp; Enforce Access Policies
            </h3>

            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
              Apply RBAC, approval workflows, time-bound access, MFA, and command-level policies before privileged access is granted.
            </p>

            {/* Realistic Policy Approval Visual */}
            <div className="mt-auto pt-2">
              <div className="rounded-xl border border-slate-900/[0.08] dark:border-white/[0.06] bg-slate-50 dark:bg-[#050a14] p-4 relative">
                {/* Request Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-900/[0.08] dark:border-white/[0.06]">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-950 dark:text-white">Access Request:</span>
                      <code className="text-xs text-[#00B8FF] font-mono bg-[#00B8FF]/10 px-1.5 py-0.5 rounded">
                        prod-db-01
                      </code>
                    </div>
                    <span className="text-[10px] text-slate-600 dark:text-slate-400">User: m.keller@corp.net &middot; CHG-7712</span>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" /> Approved 2/2
                    </span>
                  </div>
                </div>

                {/* Policy Conditions List */}
                <div className="space-y-1.5 my-3 text-[11px]">
                  <div className="flex items-center justify-between p-1.5 rounded bg-slate-100 dark:bg-[#091222] border border-slate-900/[0.05] dark:border-white/[0.04]">
                    <span className="text-slate-700 dark:text-slate-300">Role: Database Admin</span>
                    <span className="text-[10px] text-emerald-400 font-mono">RBAC Matched</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 rounded bg-slate-100 dark:bg-[#091222] border border-slate-900/[0.05] dark:border-white/[0.04]">
                    <span className="text-slate-700 dark:text-slate-300">MFA verified</span>
                    <span className="text-[10px] text-sky-400 font-mono">FIDO2 Token</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 rounded bg-slate-100 dark:bg-[#091222] border border-slate-900/[0.05] dark:border-white/[0.04]">
                    <span className="text-slate-700 dark:text-slate-300">Command policy applied</span>
                    <span className="text-[10px] text-indigo-300 font-mono">DDL Filtered</span>
                  </div>
                </div>

                {/* JIT Window Expiry Chip */}
                <div className="pt-2 border-t border-slate-900/[0.08] dark:border-white/[0.06] flex items-center justify-between text-[10px] font-mono">
                  <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#00B8FF]" /> JIT: 30 min window
                  </span>
                  <span className="px-2 py-0.5 rounded bg-sky-500/15 text-[#00B8FF] font-semibold">
                    29:45 remaining
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CARD 3: Monitor, Audit & Respond ── */}
        <div
          onMouseEnter={() => setHoveredCard(3)}
          onMouseLeave={() => setHoveredCard(null)}
          className={`group relative flex flex-col rounded-2xl border transition-all duration-200 bg-slate-100 dark:bg-[#08101d] overflow-hidden ${
            hoveredCard === 3
              ? "border-[#00B8FF]/50 -translate-y-1 shadow-[0_12px_32px_rgba(0,184,255,0.08)]"
              : "border-slate-900/[0.1] dark:border-white/[0.08] hover:border-slate-900/[0.2] dark:hover:border-white/[0.16]"
          }`}
        >
          {/* Card Header & Content */}
          <div className="p-6 sm:p-7 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-[#00B8FF] tracking-wider uppercase">
                Step 03 &middot; Observability
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Recording
              </span>
            </div>

            <h3
              className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white mb-3"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Monitor, Audit &amp; Respond
            </h3>

            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
              Record every privileged session, surface risky activity in real time, and retain audit-ready evidence for security investigations and compliance.
            </p>

            {/* Compact Session-Monitoring Console Visual */}
            <div className="mt-auto pt-2">
              <div className="rounded-xl border border-slate-900/[0.08] dark:border-white/[0.06] bg-slate-50 dark:bg-[#050a14] p-4 relative">
                {/* Live Session Row */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-900/[0.08] dark:border-white/[0.06] text-xs">
                  <div>
                    <div className="font-semibold text-slate-950 dark:text-white truncate">m.keller@corp.net</div>
                    <div className="text-[10px] font-mono text-slate-600 dark:text-slate-400">
                      prod-db-01:5432 &middot; TLS/PSQL &middot; 00:12:44
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                    REC 1080p
                  </span>
                </div>

                {/* Command Timeline */}
                <div className="py-2.5 space-y-1.5 font-mono text-[10px]">
                  <div className="flex items-start gap-1.5 text-slate-600 dark:text-slate-400">
                    <span className="text-emerald-400">&gt;</span>
                    <span className="text-slate-700 dark:text-slate-300 truncate">SELECT schema_name FROM information_schema;</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-amber-300 bg-amber-500/10 p-1.5 rounded border border-amber-500/20">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="truncate">
                      <div className="font-bold text-amber-300">Unusual command pattern detected</div>
                      <div className="text-[9px] text-amber-200/80">DROP TABLE user_audit_archive --force</div>
                    </div>
                  </div>
                </div>

                {/* Immediate Response Controls */}
                <div className="pt-2 border-t border-slate-900/[0.08] dark:border-white/[0.06] flex items-center justify-between gap-2">
                  <button
                    type="button"
                    className="flex-1 px-2.5 py-1 rounded text-[10px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-900/[0.04] dark:bg-white/[0.05] hover:bg-slate-900/[0.08] dark:hover:bg-white/[0.1] border border-slate-900/[0.1] dark:border-white/[0.08] transition-colors"
                  >
                    Review session
                  </button>
                  <button
                    type="button"
                    className="flex-1 px-2.5 py-1 rounded text-[10px] font-semibold text-red-300 bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 transition-colors"
                  >
                    Terminate access
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
