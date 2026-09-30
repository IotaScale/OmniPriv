"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  Bot,
  Cpu,
  Shield,
  ShieldAlert,
  Terminal,
  Crosshair,
  RefreshCw,
  FileSpreadsheet,
  Lock,
  KeyRound,
  Network,
  Users,
  Eye,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Zap,
  Sliders,
  Sparkles,
  GitBranch,
  Layers,
  FileCode,
  Radio
} from "lucide-react";

export default function AiPamEngineSection() {
  const [activeTab, setActiveTab] = useState<"ml" | "agents" | "mcp">("ml");
  const [activeThreatIndex, setActiveThreatIndex] = useState<number>(1); // Lateral Movement focused

  // Threat Detection Lanes
  const threatUseCases = [
    {
      name: "Brute Force",
      tag: "Authentication Lane",
      detects: "Rapid failed-login patterns across protocol gateways → real-time scoring + instant socket kill.",
      trigger: "5+ failed logins in <10s across RDP/SSH",
      action: "Instant IP + User Auto-Block",
      risk: "HIGH RISK",
      riskColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    },
    {
      name: "Lateral Movement",
      tag: "Pivot & Reconnaissance",
      detects: "Pivot commands (sshpass, wmiexec, crackmapexec, impacket) + behavioral network pivot indicators.",
      trigger: "Subnet traversal via injected credentials",
      action: "10s Sweeper Isolation & Alert",
      risk: "CRITICAL",
      riskColor: "text-rose-400 bg-rose-500/15 border-rose-500/30",
    },
    {
      name: "Backdoor Accounts",
      tag: "Persistence Detection",
      detects: "Backdoor command indicators, rogue user script authoring, and backdoor risk assessments per identity.",
      trigger: "Unauthorized sudoers / hidden user creation",
      action: "Account Lockout & Admin Alert",
      risk: "CRITICAL",
      riskColor: "text-rose-400 bg-rose-500/15 border-rose-500/30",
    },
    {
      name: "Credential Harvesting",
      tag: "Secret Extraction",
      detects: "Credential-grabbing commands (mimikatz, dump, sam, lsass queries) and harvesting risk scoring.",
      trigger: "Memory scraping or SAM hive extraction",
      action: "Process Killed & Session Severed",
      risk: "CRITICAL",
      riskColor: "text-rose-400 bg-rose-500/15 border-rose-500/30",
    },
    {
      name: "Login-from-Nowhere / Off-Hours",
      tag: "Behavioral Context",
      detects: "Impossible travel geolocation, unusual source IPs, and hour deviation from the user's learned baseline.",
      trigger: "Access from new continent in <2 hours",
      action: "Step-Up Auth / Quarantine",
      risk: "ELEVATED",
      riskColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      name: "Script Execution Abuse",
      tag: "In-Session Scanner",
      detects: "Executed script files (.sh, .ps1, .bat) scanned live in-flight; malicious payloads flagged instantly.",
      trigger: "Obfuscated PowerShell or bash payload",
      action: "Live Script Blocked",
      risk: "HIGH RISK",
      riskColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    },
  ];

  // 12 Multi-Agent Architecture Pillars
  const agentPillars = [
    {
      num: "01",
      title: "Agent Identity",
      desc: "Each agent registered with a unique name, type, status, and hashed API key — cryptographically verifiable, per-org, auditable lifecycle.",
      badge: "Cryptographic Attestation",
    },
    {
      num: "02",
      title: "Human→Agent Delegation",
      desc: "Agent never inherits the human's whole privilege set — the JWT carries who delegated, so accountability strictly stays with the human.",
      badge: "JWT Delegator Claims",
    },
    {
      num: "03",
      title: "Tool-Level Authorization",
      desc: "Per-agent allow/deny/approval per MCP tool. The same MCP server provides different tool capabilities per agent.",
      badge: "MCP Tool Allowlist",
    },
    {
      num: "04",
      title: "Data-Level Authorization",
      desc: "Same tool returns different data per agent (Sales-Agent: no salary; HR-Agent: full record) — layered on existing org RBAC/ABAC and CASL schemas.",
      badge: "Field-Level Masking",
    },
    {
      num: "05",
      title: "MCP Server Scoping",
      desc: "Agent-to-server allowlists — Finance-Agent can reach Finance-MCP but is strictly barred from HR-MCP.",
      badge: "Server-Level Boundaries",
    },
    {
      num: "06",
      title: "Just-in-Time Privileges",
      desc: "No permanent agent privileges — short-lived, ephemeral tokens issued per action and automatically destroyed after use.",
      badge: "Zero Standing Privilege",
    },
    {
      num: "07",
      title: "Sensitive Action Approval",
      desc: "High-risk tools (delete cluster, refund, transfer, drop table) require human approval — true Human-in-the-Loop (HITL) for AI.",
      badge: "Human-in-the-Loop",
    },
    {
      num: "08",
      title: "Agent-to-Agent Trust",
      desc: "Controls which agents may invoke other agents (Customer-Agent → Finance-Agent ✓, → Payroll-Agent ✗) via a cryptographic agent trust graph.",
      badge: "Agent Trust Graph",
    },
    {
      num: "09",
      title: "Prompt-Injection Guard",
      desc: "OmniPriv re-verifies the tool call against deterministic policy before execution, even if the LLM reasoning itself was manipulated.",
      badge: "Deterministic Re-Verification",
    },
    {
      num: "10",
      title: "Agent Session Audit Trail",
      desc: "Full forensic trace: human → agent → server → tool → resource, recording decision, privilege level, and duration.",
      badge: "5-Tier Audit Trace",
    },
    {
      num: "11",
      title: "Agent Behavioral Analytics",
      desc: "Per-agent behavioral baseline (tool mix, request rate) detects anomalous agent behavior → step-up auth / approval / revoke / quarantine.",
      badge: "Rate & Tool Baseline",
    },
    {
      num: "12",
      title: "Vault-Backed Secrets",
      desc: "Agents never hold permanent credentials — dynamic secrets checked out on-demand from the vault per session and rotated immediately.",
      badge: "Dynamic Ephemeral Secrets",
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden bg-[#050b16] border-b border-white/[0.06]">
      {/* Background glow accents */}
      <div
        className="absolute top-1/4 -left-[10%] w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,184,255,0.15) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute bottom-1/4 -right-[10%] w-[600px] h-[600px] rounded-full opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 65%)",
        }}
      />

      <div className="container-xl relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#00B8FF]/25 bg-[#00B8FF]/[0.08] mb-5">
            <Sparkles className="w-3.5 h-3.5 text-[#00B8FF]" />
            <span className="text-[#00B8FF] text-xs font-semibold uppercase tracking-wider font-mono">
              OmniPriv AI-PAM &amp; ML Architecture
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Autonomous ML Engine &amp; Multi-Agent AI Security
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            From real-time <strong className="text-white">IsolationForest</strong> anomaly detection to <strong className="text-white">Model Context Protocol (MCP)</strong> agent scoping, OmniPriv ensures autonomous AI agents and human administrators operate with mathematically verified, least-privilege boundaries.
          </p>

          {/* Navigation Switcher Pills */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            <button
              onClick={() => setActiveTab("ml")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === "ml"
                  ? "bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/40 shadow-[0_0_10px_rgba(0,184,255,0.07)]"
                  : "bg-white/[0.03] text-slate-400 border border-white/[0.08] hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <Activity className="w-4 h-4" />
              Core ML Detection Engine
            </button>

            <button
              onClick={() => setActiveTab("agents")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === "agents"
                  ? "bg-[#6366f1]/25 text-[#a5b4fc] border border-[#6366f1]/45 shadow-[0_0_10px_rgba(99,102,241,0.10)]"
                  : "bg-white/[0.03] text-slate-400 border border-white/[0.08] hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <Bot className="w-4 h-4" />
              Multi-Agent AI Architecture (12 Pillars)
            </button>

            <button
              onClick={() => setActiveTab("mcp")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === "mcp"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.07)]"
                  : "bg-white/[0.03] text-slate-400 border border-white/[0.08] hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <Network className="w-4 h-4" />
              MCP Server &amp; DeepSeek Chat
            </button>
          </div>
        </div>

        {/* ─── TAB 1: CORE ML DETECTION ENGINE ─────────────────────── */}
        {activeTab === "ml" && (
          <div className="space-y-8 animate-fadeIn">
            {/* 4 Feature Highlights Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#070e1c] hover:border-[#00B8FF]/30 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-[#00B8FF]/10 border border-[#00B8FF]/20 flex items-center justify-center text-[#00B8FF] mb-4">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-[#00B8FF] font-semibold mb-1">
                  ISOLATIONFOREST ENGINE
                </div>
                <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                  Behavioral Anomaly Detection
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Evaluates 39 features with RobustScaler normalization. Scores every closed session 0–1 with tiered escalation: Dashboard Alert → Admin Alert → Auto-Block.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#070e1c] hover:border-rose-500/30 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
                  <Crosshair className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-rose-400 font-semibold mb-1">
                  REAL-TIME SWEEPER
                </div>
                <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                  10s Auto-Block Sweeper
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Runs an autonomous 10-second live sweep across active sessions. Isolates verified offenders with grace period before force-close, while superadmins remain immune.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#070e1c] hover:border-emerald-500/30 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-emerald-400 font-semibold mb-1">
                  AUTONOMOUS PIPELINE
                </div>
                <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                  Auto-Retraining Pipeline
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Self-training triggers automatically after 300 new analyses per organization. Warm-starts the model, creates .bak backup, and swaps model_bundle.pkl live.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-white/[0.08] bg-[#070e1c] hover:border-indigo-500/30 transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-indigo-400 font-semibold mb-1">
                  MODEL EVALUATION TOOL
                </div>
                <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                  export_eval.py Engine
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Performs 80/20 train/test split, threshold sweep optimization, feature separation analysis, and outputs comprehensive Excel workbooks for audit and tuning.
                </p>
              </div>
            </div>

            {/* Live Detection Use Cases Console */}
            <div className="rounded-2xl border border-white/[0.09] bg-[#070e1a] p-6 lg:p-8 overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/[0.07] gap-3">
                <div>
                  <div className="badge-cyan mb-2">Live Rule Lanes</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
                    Real-Time In-Session Threat Detection Lanes
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Live command detector scans typed commands as they happen. Live script scanner flags executed scripts (.sh, .ps1, .bat) with offender-only quarantine.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-xs font-mono text-emerald-400 font-semibold self-start md:self-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  6 DETECTION LANES ACTIVE
                </div>
              </div>

              {/* Threat Selector Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {threatUseCases.map((useCase, idx) => {
                  const isSelected = activeThreatIndex === idx;
                  return (
                    <div
                      key={useCase.name}
                      onClick={() => setActiveThreatIndex(idx)}
                      className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "border-[#00B8FF]/45 bg-[#0c182c] shadow-[0_0_12px_rgba(0,184,255,0.04)]"
                          : "border-white/[0.06] bg-[#050b14] hover:border-white/[0.12] hover:bg-[#07101e]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-slate-400">{useCase.tag}</span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${useCase.riskColor}`}>
                          {useCase.risk}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1.5">{useCase.name}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed mb-3">{useCase.detects}</p>
                      <div className="pt-2.5 border-t border-white/[0.05] text-[11px] font-mono text-slate-400 flex items-center justify-between">
                        <span>Action:</span>
                        <span className="text-emerald-400 font-semibold">{useCase.action}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 2: MULTI-AGENT ARCHITECTURE (12 PILLARS) ────────── */}
        {activeTab === "agents" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Architecture Banner */}
            <div className="p-6 sm:p-8 rounded-2xl border border-white/[0.09] bg-gradient-to-br from-[#070e1c] to-[#0a1528]">
              <div className="max-w-3xl">
                <div className="badge-cyan mb-3">One MCP Transport &bull; Many First-Class Identities</div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                  OmniPriv AI-PAM: Multi-Agent Privilege Architecture
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  Instead of an AI inheriting a human’s full credentials, every agent gets its own verifiable identity, its own tool policy, and its own data scope — and every single action is cryptographically traced back to the human who delegated it.
                </p>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#00B8FF]/25 bg-[#00B8FF]/10 text-xs font-mono text-[#00B8FF]">
                  <strong className="text-white">Core Principle:</strong> The AI can act, but it never gets unrestricted authority.
                </div>
              </div>
            </div>

            {/* 12 Feature Cards Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {agentPillars.map((p) => (
                <div
                  key={p.num}
                  className="group p-4 sm:p-5 rounded-xl border border-white/[0.07] bg-[#070e1c] hover:border-[#6366f1]/40 hover:bg-[#091224] transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-[#6366f1] font-bold">#{p.num}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-slate-400">
                        {p.badge}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Value Callout */}
            <div className="p-5 rounded-xl border border-emerald-500/25 bg-emerald-500/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm text-slate-300">
                  <strong className="text-white">Enterprise AI Value:</strong> Agents do real work against SAP, production databases, and ServiceNow — but every capability is scoped, every secret is transient, and every action is attributable to a human.
                </div>
              </div>
              <Link href="/demo" className="btn-secondary text-xs px-4 py-2 flex-shrink-0 whitespace-nowrap">
                Schedule AI-PAM Demo <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>
        )}

        {/* ─── TAB 3: MCP SERVER & AI BEYOND ML ────────────────────── */}
        {activeTab === "mcp" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Feature 1: AI Agent Chat */}
              <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#070e1c]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00B8FF]/10 border border-[#00B8FF]/20 flex items-center justify-center text-[#00B8FF]">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#00B8FF]">ENDPOINT: /agent/chat</span>
                    <h3 className="text-lg font-bold text-white">DeepSeek Function Calling for PAM</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  DeepSeek engine with function calling against OmniPriv APIs, scoped strictly to the caller’s organization — a natural-language assistant for operational PAM tasks, ticket approvals, and session investigations.
                </p>
                <div className="p-3 rounded-xl border border-white/[0.06] bg-[#040810] font-mono text-xs text-slate-400 space-y-1">
                  <div className="text-[#00B8FF]">&gt; User: &quot;Show me all active sessions on prod-db with elevated queries.&quot;</div>
                  <div className="text-emerald-400">&gt; DeepSeek API: Scoped function call `list_sessions(filter=&apos;elevated&apos;)` executed under org CASL RBAC.</div>
                </div>
              </div>

              {/* Feature 2: MCP Server */}
              <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#070e1c]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Network className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-indigo-400">TRANSPORT LAYER</span>
                    <h3 className="text-lg font-bold text-white">MCP Server (100+ Platform Tools)</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Exposes 100+ platform tools to AI clients (Claude, GitHub Copilot, Cursor) with device-flow OAuth, JWT scoping, and auto-refreshing session tokens.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.06] text-slate-300">OAuth Device Flow</span>
                  <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.06] text-slate-300">100+ MCP Tools</span>
                  <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.06] text-slate-300">JWT Scoped Tokens</span>
                </div>
              </div>

              {/* Feature 3: Threat Explainability */}
              <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#070e1c]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-amber-400">FORENSIC TRANSPARENCY</span>
                    <h3 className="text-lg font-bold text-white">Threat Explainability Engine</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Per-session indicator breakdown + feature-separation analysis so security teams and compliance auditors clearly see why a score was elevated, eliminating black-box AI decisions.
                </p>
                <div className="p-3 rounded-xl border border-white/[0.06] bg-[#040810] font-mono text-xs text-slate-400">
                  <span className="text-amber-400">Score 0.84:</span> Command entropy (+0.32), impossible subnet hop (+0.28), script authoring pattern (+0.24).
                </div>
              </div>

              {/* Feature 4: Data-level RBAC for AI */}
              <div className="p-6 rounded-2xl border border-white/[0.08] bg-[#070e1c]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-purple-400">CASL &amp; ORG SCHEMAS</span>
                    <h3 className="text-lg font-bold text-white">Data-Level RBAC for AI</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  AI agents see only what the delegated human’s org and role allows. Data filtering occurs at the database/API gateway layer, preventing prompt leakage of unauthorized records.
                </p>
                <div className="p-3 rounded-xl border border-white/[0.06] bg-[#040810] font-mono text-xs text-slate-400">
                  <span className="text-purple-400">Rule:</span> CASL policy filters out salary, PII, and customer secrets before LLM ingestion.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
