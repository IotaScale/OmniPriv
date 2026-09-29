"use client";

import React, { useState } from "react";
import {
  Fingerprint,
  ShieldCheck,
  Users,
  Clock,
  Video,
  Database,
  Terminal,
  Lock,
  Radio,
  CheckCircle2,
  Cpu,
  Bot,
  Network,
  ShieldAlert,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  Key,
  FileCheck,
  Layers,
  ArrowRight,
  Eye,
  Shield,
  Zap,
  Sliders,
  ChevronRight,
  Activity,
  Crosshair,
  KeyRound,
  FileCode,
  ArrowUpRight
} from "lucide-react";

type ModeKey = "ml" | "agent" | "pam";

interface CapabilityScenario {
  id: string;
  navTitle: string;
  navSubtitle: string;
  badge: string;
  badgeStyle: string;
  icon: React.ElementType;
  engineName: string;
  headline: string;
  subheadline: string;
  statusBadge: string;
  statusStyle: string;
  telemetryKind:
    | "anomaly-gauge"
    | "sweeper-radar"
    | "terminal-intercept"
    | "retrain-pipeline"
    | "agent-delegation"
    | "mcp-matrix"
    | "prompt-firewall"
    | "ephemeral-vault"
    | "pam-fido2"
    | "pam-polp"
    | "pam-approval"
    | "pam-recording";
  primaryStat: { value: string; label: string };
  secondaryStat: { value: string; label: string };
  tertiaryStat: { value: string; label: string };
  visualData: any;
  whyItMatters: string;
}

export default function HeroPolicyFlow() {
  const [activeMode, setActiveMode] = useState<ModeKey>("ml");
  const [activeScenarioId, setActiveScenarioId] = useState<string>("anomaly-detection");

  // Mode 1: Core ML Engine & Real-Time Threat Lanes
  const mlScenarios: CapabilityScenario[] = [
    {
      id: "anomaly-detection",
      navTitle: "Behavioral Anomaly Detection",
      navSubtitle: "IsolationForest · 39 features · RobustScaler",
      badge: "ML Inference",
      badgeStyle: "text-sky-400 bg-sky-500/10 border-sky-500/25",
      icon: Activity,
      engineName: "isolation-forest-engine",
      headline: "IsolationForest Behavioral Anomaly Scorer",
      subheadline:
        "Every closed privileged session is evaluated against 39 learned features. Automated tiered escalation routes suspicious behavior from alerts to instant auto-blocks.",
      statusBadge: "0.88 HIGH ANOMALY · AUTO-BLOCK ARMED",
      statusStyle: "text-rose-400 bg-rose-500/10 border-rose-500/25",
      telemetryKind: "anomaly-gauge",
      primaryStat: { value: "0.88", label: "Anomaly Score" },
      secondaryStat: { value: "0.72", label: "Cutoff Threshold" },
      tertiaryStat: { value: "39", label: "Features Evaluated" },
      visualData: {
        score: 0.88,
        threshold: 0.72,
        indicators: [
          { name: "Off-hours command execution", impact: "+0.31 weight", color: "text-rose-400" },
          { name: "Impossible subnet hop", impact: "+0.29 weight", color: "text-rose-400" },
          { name: "Privilege escalation query", impact: "+0.28 weight", color: "text-amber-400" },
        ],
        tier: "Tier 3: Instant Auto-Block",
      },
      whyItMatters:
        "Scores 0–1 with tiered escalation (Dashboard → Admin → Auto-Block). Catches novel insider misuse without static rules.",
    },
    {
      id: "auto-block-sweeper",
      navTitle: "10s Live Auto-Block Sweeper",
      navSubtitle: "Offenders only · Superadmins immune",
      badge: "10s Sweep Daemon",
      badgeStyle: "text-rose-400 bg-rose-500/10 border-rose-500/25",
      icon: Crosshair,
      engineName: "auto-block-sweeper",
      headline: "10-Second Live Threat Sweeper & Quarantine",
      subheadline:
        "Autonomous sweeper checks all active sessions every 10 seconds. Verified offenders are isolated instantly with detailed reasons, while superadmins are protected from lockouts.",
      statusBadge: "SWEEPER ACTIVE · OFFENDER ISOLATED",
      statusStyle: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
      telemetryKind: "sweeper-radar",
      primaryStat: { value: "10.0s", label: "Sweep Interval" },
      secondaryStat: { value: "15s", label: "Grace Period" },
      tertiaryStat: { value: "0.0%", label: "Admin Lockout Risk" },
      visualData: {
        offender: "vendor_ext_92 (SSH Session #84920)",
        reason: "Lateral Movement Pivot Detected",
        action: "TLS Socket Force-Closed & Token Invalidated",
        superadminState: "Superadmins Immune (Whitelisted)",
      },
      whyItMatters:
        "Offenders are quarantined in seconds without risking enterprise operational outages or administrator lockouts.",
    },
    {
      id: "command-script-scanner",
      navTitle: "Live Command & Script Scanner",
      navSubtitle: "sshpass, crackmapexec, wmiexec, .ps1, .sh",
      badge: "In-Session Intercept",
      badgeStyle: "text-amber-400 bg-amber-500/10 border-amber-500/25",
      icon: Terminal,
      engineName: "in-session-lane-filter",
      headline: "Real-Time In-Session Typed & Script Analyzer",
      subheadline:
        "Scans keystrokes and executed scripts (.sh, .ps1, .bat) in flight. Flags lateral movement tools and backdoor indicators with sub-8ms detection latency.",
      statusBadge: "PIVOT TOOL DETECTED · BLOCKED",
      statusStyle: "text-rose-400 bg-rose-500/10 border-rose-500/25",
      telemetryKind: "terminal-intercept",
      primaryStat: { value: "< 8ms", label: "Intercept Latency" },
      secondaryStat: { value: "5 Lanes", label: "Active Threat Lanes" },
      tertiaryStat: { value: "Instant", label: "Enforcement Mode" },
      visualData: {
        command: "crackmapexec smb 10.0.1.0/24 -u admin",
        flag: "Lateral Movement (Pivot Signature)",
        script: "deploy_backdoor.sh -> AUTO-BLOCKED",
        status: "Command execution prevented before shell spawn",
      },
      whyItMatters:
        "Detects Brute Force, Lateral Movement, Backdoor Accounts, Credential Harvesting, and Off-hours travel as commands are typed.",
    },
    {
      id: "auto-retraining-pipeline",
      navTitle: "Self-Training & Evaluation",
      navSubtitle: "Auto-retrain @ 300 analyses · export_eval.py",
      badge: "Autonomous MLOps",
      badgeStyle: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
      icon: RefreshCw,
      engineName: "model-lifecycle-daemon",
      headline: "Autonomous Retraining & Evaluation Engine",
      subheadline:
        "Self-training pipeline automatically warm-starts the model after 300 new analyses per organization, backs up .bak, and hot-swaps model_bundle.pkl in place with export_eval.py validation.",
      statusBadge: "WARM-START COMPLETE · MODEL SYNCED",
      statusStyle: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
      telemetryKind: "retrain-pipeline",
      primaryStat: { value: "300 / 300", label: "Analysis Quota" },
      secondaryStat: { value: "80 / 20", label: "Train/Test Split" },
      tertiaryStat: { value: "0 Downtime", label: "Hot Swap State" },
      visualData: {
        split: "80% Train / 20% Test Split",
        evalTool: "export_eval.py (Excel Workbook Output)",
        backup: "model_bundle.bak successfully archived",
        swap: "model_bundle.pkl replaced in place live",
      },
      whyItMatters:
        "The model automatically adapts to your organization's evolving baseline without manual data science overhead.",
    },
  ];

  // Mode 2: Multi-Agent AI-PAM & MCP Architecture
  const agentScenarios: CapabilityScenario[] = [
    {
      id: "agent-identity-delegation",
      navTitle: "Agent Identity & Delegation",
      navSubtitle: "Human → Agent JWT · Cryptographic ID",
      badge: "JWT Attestation",
      badgeStyle: "text-sky-400 bg-sky-500/10 border-sky-500/25",
      icon: Bot,
      engineName: "agent-identity-provider",
      headline: "Cryptographic Agent Identity & Human Delegation",
      subheadline:
        "Each AI agent is registered with a unique name, status, and hashed API key. Instead of the AI inheriting a human's full credentials, the JWT carries who delegated, ensuring accountability stays with the human.",
      statusBadge: "DELEGATION ATTESTED · ACCOUNTABLE",
      statusStyle: "text-sky-400 bg-sky-500/10 border-sky-500/25",
      telemetryKind: "agent-delegation",
      primaryStat: { value: "Alex Chen", label: "Human Delegator" },
      secondaryStat: { value: "SRE-Agent-01", label: "Assigned Agent" },
      tertiaryStat: { value: "100%", label: "Traceability" },
      visualData: {
        human: "Alex Chen (Lead SRE)",
        claim: "sub: alex.chen@omnipriv.com",
        agent: "SRE-Agent-01 (Type: Autonomous SRE)",
        scope: "Restricted DB Tier (Non-Admin Privileges)",
      },
      whyItMatters:
        "The AI can act, but it never gets unrestricted authority. Every action is cryptographically tied to a human.",
    },
    {
      id: "mcp-server-scoping",
      navTitle: "MCP Server & Data RBAC",
      navSubtitle: "100+ MCP tools · CASL field masking",
      badge: "Model Context Protocol",
      badgeStyle: "text-indigo-400 bg-indigo-500/10 border-indigo-500/25",
      icon: Network,
      engineName: "omnipriv-mcp-gateway",
      headline: "MCP Server Tool Scoping & Data-Level Authorization",
      subheadline:
        "Exposes 100+ platform tools to Claude, Copilot, and DeepSeek via OAuth device-flow. The same tool returns different data per agent (Sales-Agent: no salary; HR-Agent: full record) enforced by CASL schemas.",
      statusBadge: "MCP SCOPING ENFORCED · CASL MASKED",
      statusStyle: "text-indigo-400 bg-indigo-500/10 border-indigo-500/25",
      telemetryKind: "mcp-matrix",
      primaryStat: { value: "100+ Tools", label: "MCP Capabilities" },
      secondaryStat: { value: "CASL", label: "Data-Level RBAC" },
      tertiaryStat: { value: "Per-Agent", label: "Tool Allowlist" },
      visualData: {
        toolAllowed: "db_query_catalog (ALLOWED - Masked PII/Salary)",
        toolDenied: "db_drop_table (DENIED - Human Approval Required)",
        mcpServer: "Finance-MCP: Allowed | HR-MCP: Denied",
      },
      whyItMatters:
        "Finance agents cannot reach HR systems, and tool outputs are filtered at the database/API gateway layer.",
    },
    {
      id: "prompt-injection-guard",
      navTitle: "Prompt-Injection Guard & HITL",
      navSubtitle: "Pre-execution check · Human-in-the-Loop",
      badge: "Deterministic Firewall",
      badgeStyle: "text-rose-400 bg-rose-500/10 border-rose-500/25",
      icon: ShieldAlert,
      engineName: "prompt-injection-firewall",
      headline: "Deterministic Policy Defense & Human-in-the-Loop",
      subheadline:
        "Even if an attacker manipulates the LLM reasoning with prompt injection, OmniPriv's deterministic PAM engine re-verifies every tool call before execution. High-risk actions strictly require human sign-off.",
      statusBadge: "INJECTION BLOCKED · HITL REQUIRED",
      statusStyle: "text-rose-400 bg-rose-500/10 border-rose-500/25",
      telemetryKind: "prompt-firewall",
      primaryStat: { value: "Zero Trust", label: "LLM Reasoning Trust" },
      secondaryStat: { value: "HITL", label: "Sensitive Approvals" },
      tertiaryStat: { value: "Enforced", label: "Agent Trust Graph" },
      visualData: {
        attack: "Attempted prompt injection: 'Drop user audit tables'",
        reverification: "Deterministic policy check: FAILED (High Risk Tool)",
        hitlAction: "Execution suspended pending SecOps Lead approval",
        trustGraph: "Customer-Agent -> Payroll-Agent [REJECTED]",
      },
      whyItMatters:
        "The LLM can request actions, but the deterministic PAM engine makes the final authorization decision.",
    },
    {
      id: "jit-vault-audit",
      navTitle: "JIT Secrets & 5-Tier Audit",
      navSubtitle: "Dynamic vault tokens · Human-to-SQL trace",
      badge: "Zero Standing Privilege",
      badgeStyle: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
      icon: KeyRound,
      engineName: "ephemeral-vault-gateway",
      headline: "Dynamic Vault Secrets & End-to-End Audit Trace",
      subheadline:
        "AI agents never hold permanent credentials. Dynamic secrets are issued from the vault on demand per action and revoked immediately. Complete trace: Human → Agent → Server → Tool → Resource.",
      statusBadge: "DYNAMIC TOKEN ACTIVE · EXPIRES 15M",
      statusStyle: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
      telemetryKind: "ephemeral-vault",
      primaryStat: { value: "15m 00s", label: "Token Lifespan" },
      secondaryStat: { value: "0", label: "Standing Secrets" },
      tertiaryStat: { value: "5-Tier", label: "Forensic Depth" },
      visualData: {
        checkout: "Checked out ephemeral credential pg_temp_role_8492",
        autoRevoke: "Armed for automatic disposal on session completion",
        trace: "Human (Alex) -> Agent (DeepSeek) -> MCP -> db_query -> PostgreSQL",
      },
      whyItMatters:
        "If an agent is compromised, there are zero permanent keys, static passwords, or credentials to steal.",
    },
  ];

  // Mode 3: Traditional Zero Trust PAM Lifecycle
  const pamScenarios: CapabilityScenario[] = [
    {
      id: "pam-verified-identity",
      navTitle: "Verified Identity & Hardware MFA",
      navSubtitle: "FIDO2 WebAuthn · Device posture check",
      badge: "Continuous Auth",
      badgeStyle: "text-sky-400 bg-sky-500/10 border-sky-500/25",
      icon: Fingerprint,
      engineName: "identity-authenticator",
      headline: "FIDO2 Hardware Attestation & Device Verification",
      subheadline:
        "Every connection begins with hardware-backed authentication. Enforces WebAuthn FIDO2 keys and device posture checks before network paths are created.",
      statusBadge: "HARDWARE KEY VERIFIED · COMPLIANT",
      statusStyle: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
      telemetryKind: "pam-fido2",
      primaryStat: { value: "FIDO2", label: "Auth Standard" },
      secondaryStat: { value: "100%", label: "MFA Mandatory" },
      tertiaryStat: { value: "0.02", label: "Context Risk" },
      visualData: {
        token: "YubiKey 5C NFC Attested",
        device: "Encrypted disk, EDR healthy, patch compliant",
        posture: "Ashburn, VA (IP 198.51.100.24)",
      },
      whyItMatters:
        "Eliminates credential stuffing and stolen password breaches at the front door.",
    },
    {
      id: "pam-policy-polp",
      navTitle: "Granular Policy & Least Privilege",
      navSubtitle: "RBAC & command ACLs · Ticket linkage",
      badge: "Least Privilege",
      badgeStyle: "text-indigo-400 bg-indigo-500/10 border-indigo-500/25",
      icon: ShieldCheck,
      engineName: "pam-policy-engine",
      headline: "Policy-Bound Access & Command-Level ACLs",
      subheadline:
        "Binds every access request to an approved IT ticket and role policy. Restricts command sets so admins can only execute authorized maintenance commands.",
      statusBadge: "POLICY & TICKET LINKED (CHG-84920)",
      statusStyle: "text-indigo-400 bg-indigo-500/10 border-indigo-500/25",
      telemetryKind: "pam-polp",
      primaryStat: { value: "CHG-84920", label: "Approved Ticket" },
      secondaryStat: { value: "PoLP", label: "Access Level" },
      tertiaryStat: { value: "Enforced", label: "Command ACL" },
      visualData: {
        allowed: "SELECT, ALTER TABLE, CREATE INDEX",
        blocked: "DROP, TRUNCATE, GRANT (PoLP Denied)",
        scope: "Isolated to Org DB Cluster #01",
      },
      whyItMatters:
        "Prevents accidental disasters and malicious insiders by constraining permissions to the exact task.",
    },
    {
      id: "pam-dual-authorization",
      navTitle: "Dual Authorization & Approvals",
      navSubtitle: "2/2 approvals · Four-eyes principle",
      badge: "Four-Eyes Sign-off",
      badgeStyle: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
      icon: Users,
      engineName: "approval-workflow-service",
      headline: "Multi-Party Cryptographic Sign-Off Workflow",
      subheadline:
        "Sensitive production assets require dual approval. Access cannot be granted by a single user alone; SecOps and Engineering managers must dual-sign each session.",
      statusBadge: "2/2 APPROVALS SECURED · SHA-256",
      statusStyle: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
      telemetryKind: "pam-approval",
      primaryStat: { value: "2 of 2", label: "Sign-offs" },
      secondaryStat: { value: "1m 42s", label: "Approval Time" },
      tertiaryStat: { value: "SHA-256", label: "Audit Hash" },
      visualData: {
        signoff1: "SecOps Lead (Approved via FIDO2)",
        signoff2: "Team Lead (Approved via FIDO2)",
        compliance: "SOC 2 Type II / ISO 27001 Certified Record",
      },
      whyItMatters:
        "Enforces the four-eyes principle on critical systems so no single actor can compromise infrastructure.",
    },
    {
      id: "pam-recording-audit",
      navTitle: "Session Recording & Forensic Audit",
      navSubtitle: "Keystroke indexing · TLS 1.3 gateway",
      badge: "WORM Compliant",
      badgeStyle: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
      icon: Video,
      engineName: "session-proxy-recorder",
      headline: "Tamper-Proof Video & Keystroke Recording",
      subheadline:
        "Proxies all SSH, RDP, Database, and Web sessions through an isolated gateway. Captures full video, typed keystrokes, and file transfers with tamper-proof hashing.",
      statusBadge: "RECORDING LIVE · TAMPER-PROOF",
      statusStyle: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
      telemetryKind: "pam-recording",
      primaryStat: { value: "HD Video", label: "Recording Fidelity" },
      secondaryStat: { value: "100%", label: "Keystroke Capture" },
      tertiaryStat: { value: "Live", label: "SOC Stream" },
      visualData: {
        proxy: "TLS 1.3 gateway active on port 5432",
        index: "Searchable keystroke index buffer synced",
        integrity: "WORM compliant (Write Once Read Many)",
      },
      whyItMatters:
        "Eliminates 'he said, she said' disputes during audits and provides complete proof of compliance.",
    },
  ];

  const currentScenarios =
    activeMode === "ml"
      ? mlScenarios
      : activeMode === "agent"
      ? agentScenarios
      : pamScenarios;

  const currentScenario =
    currentScenarios.find((s) => s.id === activeScenarioId) || currentScenarios[0];

  const handleModeSwitch = (mode: ModeKey) => {
    setActiveMode(mode);
    if (mode === "ml") setActiveScenarioId("anomaly-detection");
    else if (mode === "agent") setActiveScenarioId("agent-identity-delegation");
    else setActiveScenarioId("pam-verified-identity");
  };

  return (
    <div className="relative w-full">
      {/* Outer subtle glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-[#00B8FF]/15 via-[#6366f1]/10 to-transparent blur-xl pointer-events-none" />

      {/* Main Container */}
      <div className="relative rounded-2xl border border-slate-900/[0.1] dark:border-white/[0.09] bg-white dark:bg-[#070e1c] shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.65)] overflow-hidden">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-900/[0.08] dark:border-white/[0.07] bg-slate-50 dark:bg-[#0a1324]/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>
            <span className="h-3 w-px bg-slate-200 dark:bg-white/[0.08]" />
            <div className="flex items-center gap-2 text-xs font-mono">
              <Lock className="w-3.5 h-3.5 text-[#00B8FF]" />
              <span className="text-slate-800 dark:text-slate-200 font-semibold tracking-tight">omnipriv.ai</span>
              <span className="text-slate-400 dark:text-slate-600">/</span>
              <span className="text-[#00B8FF]">{currentScenario.engineName}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-[10px] font-semibold text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE ENFORCEMENT
            </div>
          </div>
        </div>

        {/* 3 Capability Mode Switchers (Tabs) */}
        <div className="px-4 sm:px-5 py-2.5 border-b border-slate-900/[0.08] dark:border-white/[0.06] bg-slate-100/70 dark:bg-[#081120] flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-[#040812] border border-slate-900/[0.06] dark:border-white/[0.06]">
            <button
              onClick={() => handleModeSwitch("ml")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeMode === "ml"
                  ? "bg-[#00B8FF]/15 text-[#00B8FF] border border-[#00B8FF]/30 shadow-[0_0_12px_rgba(0,184,255,0.15)]"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Core ML Engine
            </button>

            <button
              onClick={() => handleModeSwitch("agent")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeMode === "agent"
                  ? "bg-[#6366f1]/20 text-[#6366f1] dark:text-[#a5b4fc] border border-[#6366f1]/35 shadow-[0_0_12px_rgba(99,102,241,0.2)]"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              Multi-Agent AI-PAM
            </button>

            <button
              onClick={() => handleModeSwitch("pam")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeMode === "pam"
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Zero Trust PAM
            </button>
          </div>

          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">
            Select a capability to inspect telemetry
          </span>
        </div>

        {/* 2-Column Master-Detail Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[440px]">
          {/* Left Column: Selectable Scenarios (5 cols) */}
          <div className="md:col-span-5 p-3.5 sm:p-4 border-b md:border-b-0 md:border-r border-slate-900/[0.08] dark:border-white/[0.06] bg-slate-50/60 dark:bg-[#060c18] space-y-2">
            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1 pb-1">
              {activeMode === "ml"
                ? "Autonomous ML Modules"
                : activeMode === "agent"
                ? "Agent Governance Scenarios"
                : "Privileged Access Controls"}
            </div>

            <div className="space-y-1.5">
              {currentScenarios.map((scenario) => {
                const isSelected = scenario.id === currentScenario.id;
                const IconComponent = scenario.icon;

                return (
                  <button
                    key={scenario.id}
                    onClick={() => setActiveScenarioId(scenario.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                      isSelected
                        ? "border-[#00B8FF]/40 bg-sky-500/[0.08] dark:bg-[#0e1d35] shadow-[0_0_20px_rgba(0,184,255,0.08)] translate-x-0.5"
                        : "border-slate-900/[0.05] dark:border-white/[0.04] bg-white dark:bg-[#081220] hover:border-slate-900/[0.1] dark:hover:border-white/[0.09] hover:bg-slate-100/70 dark:hover:bg-[#0b1626]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected
                            ? "bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/35"
                            : "bg-slate-100 dark:bg-white/[0.04] text-slate-500 dark:text-slate-400 border border-slate-900/[0.06] dark:border-white/[0.06]"
                        }`}
                      >
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>

                      <div className="min-w-0">
                        <div
                          className={`text-xs font-semibold truncate transition-colors ${
                            isSelected ? "text-slate-950 dark:text-white" : "text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {scenario.navTitle}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {scenario.navSubtitle}
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {isSelected ? (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00B8FF] animate-pulse" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Telemetry & Enforcement View (7 cols) */}
          <div className="md:col-span-7 p-4 sm:p-5 bg-white dark:bg-[#081222]/90 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-3 border-b border-slate-900/[0.08] dark:border-white/[0.06] gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-[#00B8FF] font-semibold uppercase tracking-wider">
                      INSPECTOR TELEMETRY
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">&bull;</span>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      {currentScenario.engineName}
                    </span>
                  </div>
                  <h3
                    className="text-base sm:text-lg font-bold text-slate-950 dark:text-white leading-snug"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {currentScenario.headline}
                  </h3>
                </div>

                <div
                  className={`self-start sm:self-auto px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold border whitespace-nowrap ${currentScenario.statusStyle}`}
                >
                  {currentScenario.statusBadge}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentScenario.subheadline}
              </p>

              {/* 3 Spacious Stats */}
              <div className="grid grid-cols-3 gap-2 py-1">
                <div className="p-2.5 rounded-xl border border-slate-900/[0.06] dark:border-white/[0.06] bg-slate-50 dark:bg-[#050b14] text-center">
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{currentScenario.primaryStat.label}</div>
                  <div className="text-sm font-bold text-slate-950 dark:text-white mt-0.5">
                    {currentScenario.primaryStat.value}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl border border-slate-900/[0.06] dark:border-white/[0.06] bg-slate-50 dark:bg-[#050b14] text-center">
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{currentScenario.secondaryStat.label}</div>
                  <div className="text-sm font-bold text-slate-950 dark:text-white mt-0.5">
                    {currentScenario.secondaryStat.value}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl border border-slate-900/[0.06] dark:border-white/[0.06] bg-slate-50 dark:bg-[#050b14] text-center">
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{currentScenario.tertiaryStat.label}</div>
                  <div className="text-sm font-bold text-slate-950 dark:text-white mt-0.5">
                    {currentScenario.tertiaryStat.value}
                  </div>
                </div>
              </div>

              {/* Real-time Technical Telemetry Card (Custom per scenario) */}
              <div className="rounded-xl border border-slate-900/[0.08] dark:border-white/[0.07] bg-slate-950 dark:bg-[#040810] p-3 text-xs font-mono">
                {/* Anomaly Gauge Visual */}
                {currentScenario.telemetryKind === "anomaly-gauge" && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Anomaly Index:</span>
                      <span className="text-rose-400 font-bold">0.88 (Escalated to Tier 3)</span>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="relative w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-[88%] bg-gradient-to-r from-sky-500 via-amber-400 to-rose-500 rounded-full" />
                      <div className="absolute left-[72%] top-0 bottom-0 w-[2px] bg-white z-10" />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>0.00 (Normal)</span>
                      <span className="text-white font-semibold">Threshold 0.72</span>
                      <span>1.00 (Anomaly)</span>
                    </div>
                    <div className="pt-2 border-t border-white/[0.06] space-y-1 text-[10px]">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">&bull; Off-hours command burst:</span>
                        <span className="text-rose-400">+0.31 weight</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">&bull; Impossible subnet traversal:</span>
                        <span className="text-rose-400">+0.29 weight</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sweeper Radar Visual */}
                {currentScenario.telemetryKind === "sweeper-radar" && (
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between text-emerald-400 text-[10px] pb-1 border-b border-white/[0.06]">
                      <span>● SWEEPER DAEMON SCANNING (10s)</span>
                      <span>0 LOCKOUTS</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">&gt; Target:</span>
                      <span className="text-slate-200">{currentScenario.visualData.offender}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">&gt; Detection:</span>
                      <span className="text-amber-400 font-semibold">{currentScenario.visualData.reason}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">&gt; Enforcement:</span>
                      <span className="text-emerald-400">{currentScenario.visualData.action}</span>
                    </div>
                  </div>
                )}

                {/* Command & Script Terminal Intercept */}
                {currentScenario.telemetryKind === "terminal-intercept" && (
                  <div className="space-y-1.5 text-[11px]">
                    <div className="text-slate-400 text-[10px] pb-1 border-b border-white/[0.06] flex items-center justify-between">
                      <span>$ TYPED TERMINAL INPUT</span>
                      <span className="text-rose-400 font-semibold">INTERCEPTED</span>
                    </div>
                    <div className="text-rose-300">
                      &gt; {currentScenario.visualData.command}
                    </div>
                    <div className="text-amber-400 text-[10px]">
                      [POLICY ENGINE] Flagged: {currentScenario.visualData.flag}
                    </div>
                    <div className="text-emerald-400 text-[10px]">
                      [RESULT] {currentScenario.visualData.status}
                    </div>
                  </div>
                )}

                {/* Autonomous Retraining Pipeline */}
                {currentScenario.telemetryKind === "retrain-pipeline" && (
                  <div className="space-y-1.5 text-[11px]">
                    <div className="text-emerald-400 text-[10px] pb-1 border-b border-white/[0.06] flex items-center justify-between">
                      <span>● PIPELINE RUN COMPLETED</span>
                      <span>export_eval.py OK</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">&gt; Train/Test Split:</span>
                      <span className="text-slate-200">{currentScenario.visualData.split}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">&gt; Model Swap:</span>
                      <span className="text-emerald-400">{currentScenario.visualData.swap}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">&gt; Backup State:</span>
                      <span className="text-sky-400">{currentScenario.visualData.backup}</span>
                    </div>
                  </div>
                )}

                {/* Multi-Agent Delegation Visual */}
                {currentScenario.telemetryKind === "agent-delegation" && (
                  <div className="space-y-1.5 text-[11px]">
                    <div className="text-sky-400 text-[10px] pb-1 border-b border-white/[0.06] flex items-center justify-between">
                      <span>● JWT DELEGATION ATTESTATION</span>
                      <span>TRACEABLE</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">&gt; Delegator:</span>
                      <span className="text-white font-semibold">{currentScenario.visualData.human}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">&gt; Acting Agent:</span>
                      <span className="text-sky-400">{currentScenario.visualData.agent}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">&gt; Delegated Scope:</span>
                      <span className="text-emerald-400">{currentScenario.visualData.scope}</span>
                    </div>
                  </div>
                )}

                {/* MCP Matrix */}
                {currentScenario.telemetryKind === "mcp-matrix" && (
                  <div className="space-y-1.5 text-[11px]">
                    <div className="text-indigo-400 text-[10px] pb-1 border-b border-white/[0.06] flex items-center justify-between">
                      <span>● MCP TOOL AUTHORIZATION MATRIX</span>
                      <span>CASL MASKED</span>
                    </div>
                    <div className="text-emerald-400 text-[10px]">
                      &gt; {currentScenario.visualData.toolAllowed}
                    </div>
                    <div className="text-rose-400 text-[10px]">
                      &gt; {currentScenario.visualData.toolDenied}
                    </div>
                    <div className="text-slate-400 text-[10px]">
                      &gt; Boundary: {currentScenario.visualData.mcpServer}
                    </div>
                  </div>
                )}

                {/* Prompt Injection Firewall */}
                {currentScenario.telemetryKind === "prompt-firewall" && (
                  <div className="space-y-1.5 text-[11px]">
                    <div className="text-rose-400 text-[10px] pb-1 border-b border-white/[0.06] flex items-center justify-between">
                      <span>● DETERMINISTIC PROMPT-INJECTION FIREWALL</span>
                      <span>BLOCKED</span>
                    </div>
                    <div className="text-rose-300 text-[10px]">
                      &gt; Attack: {currentScenario.visualData.attack}
                    </div>
                    <div className="text-amber-400 text-[10px]">
                      &gt; Policy Verdict: {currentScenario.visualData.reverification}
                    </div>
                    <div className="text-emerald-400 text-[10px]">
                      &gt; Safeguard: {currentScenario.visualData.hitlAction}
                    </div>
                  </div>
                )}

                {/* Ephemeral Vault Secrets */}
                {currentScenario.telemetryKind === "ephemeral-vault" && (
                  <div className="space-y-1.5 text-[11px]">
                    <div className="text-emerald-400 text-[10px] pb-1 border-b border-white/[0.06] flex items-center justify-between">
                      <span>● ZERO STANDING PRIVILEGE</span>
                      <span>AUTO-REVOKE</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">&gt; Credential:</span>
                      <span className="text-white">{currentScenario.visualData.checkout}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">&gt; Revoke Policy:</span>
                      <span className="text-emerald-400">{currentScenario.visualData.autoRevoke}</span>
                    </div>
                  </div>
                )}

                {/* PAM Steps (FIDO2, PoLP, Approvals, Recording) */}
                {currentScenario.telemetryKind.startsWith("pam-") && (
                  <div className="space-y-1.5 text-[11px]">
                    <div className="text-emerald-400 text-[10px] pb-1 border-b border-white/[0.06] flex items-center justify-between">
                      <span>● ZERO TRUST PAM ENFORCED</span>
                      <span>TAMPER-PROOF</span>
                    </div>
                    {Object.entries(currentScenario.visualData).map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-400 capitalize">&gt; {k}:</span>
                        <span className="text-slate-200">{String(v)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Value Note */}
            <div className="pt-3 border-t border-slate-900/[0.06] dark:border-white/[0.06] flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 mt-3">
              <Zap className="w-3.5 h-3.5 text-[#00B8FF] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-950 dark:text-white">Why it matters: </strong>
                <span>{currentScenario.whyItMatters}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Status Bar */}
        <div className="px-4 sm:px-5 py-2.5 border-t border-slate-900/[0.08] dark:border-white/[0.07] bg-slate-50 dark:bg-[#050b14] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[11px]">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>Active Plane: <strong className="text-slate-700 dark:text-slate-200">OmniPriv AI-PAM Gateway</strong></span>
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:inline">
            DeepSeek Function Calling &bull; 100+ MCP Tools &bull; CASL RBAC
          </div>
        </div>
      </div>
    </div>
  );
}
