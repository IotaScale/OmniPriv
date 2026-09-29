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
  FileCode,
  Crosshair,
  GitBranch,
  KeyRound
} from "lucide-react";

type ModeKey = "ml" | "agent" | "pam";

interface FeatureItem {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  subtitle: string;
  icon: React.ElementType;
  statusText: string;
  engineName: string;
  engineTag: string;
  specSummary: string;
  detailTitle: string;
  detailDescription: string;
  telemetryType: "anomaly" | "sweeper" | "threat" | "retrain" | "agent-delegation" | "mcp-rbac" | "prompt-guard" | "jit-vault" | "pam-step";
  telemetryData: {
    primaryValue?: string;
    secondaryValue?: string;
    statusLabel?: string;
    statusColor?: string;
    tags?: string[];
    logs?: { label: string; value: string; color?: string }[];
    metrics?: { label: string; val: string }[];
  };
  whyItMatters: string;
}

export default function HeroPolicyFlow() {
  const [activeMode, setActiveMode] = useState<ModeKey>("ml");
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>("anomaly-detection");

  // Mode 1: Core ML Engine & Live Threat Sweeper
  const mlFeatures: FeatureItem[] = [
    {
      id: "anomaly-detection",
      title: "Behavioral Anomaly Detection",
      badge: "IsolationForest (39 Features)",
      badgeColor: "text-sky-400 bg-sky-500/10 border-sky-500/25",
      subtitle: "RobustScaler scoring 0–1 per closed session",
      icon: Activity,
      statusText: "Scoring Active",
      engineName: "isolation-forest-engine-v4.2",
      engineTag: "ML Inference",
      specSummary: "39 features normalized via RobustScaler · Auto-escalation",
      detailTitle: "IsolationForest Behavioral Anomaly Engine",
      detailDescription:
        "Scores every closed privileged session from 0 to 1 based on 39 behavioral dimensions. Automatic tiered escalation triggers dashboard alerts, notifies security administrators, and activates auto-blocks for high-risk anomalies.",
      telemetryType: "anomaly",
      telemetryData: {
        primaryValue: "0.88",
        secondaryValue: "Anomaly Threshold: 0.72",
        statusLabel: "HIGH ANOMALY · ESCALATING",
        statusColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
        metrics: [
          { label: "Features", val: "39 normalized" },
          { label: "Scaler", val: "RobustScaler" },
          { label: "Inference", val: "6.2 ms" },
          { label: "Tier", val: "Tier 3: Auto-Block" },
        ],
        logs: [
          { label: "Off-hours command burst", value: "+0.31 weight", color: "text-rose-400" },
          { label: "Privilege escalation attempt", value: "+0.28 weight", color: "text-rose-400" },
          { label: "Source IP subnet anomaly", value: "+0.29 weight", color: "text-amber-400" },
        ],
      },
      whyItMatters:
        "Tiers: Dashboard alert → Admin alert → Auto-block. Catches novel insider misuse without brittle static rules.",
    },
    {
      id: "auto-block-sweeper",
      title: "10s Live Auto-Block Sweeper",
      badge: "10s Interval Enforcer",
      badgeColor: "text-rose-400 bg-rose-500/10 border-rose-500/25",
      subtitle: "Offenders only · Superadmins immune · Grace period",
      icon: Crosshair,
      statusText: "Sweeping Live",
      engineName: "live-sweeper-daemon",
      engineTag: "Real-time Daemon",
      specSummary: "Offender-only isolation · 15s graceful socket tear-down",
      detailTitle: "Automated Offender Sweeper & Quarantine",
      detailDescription:
        "Runs an autonomous 10-second live sweep across active sessions. Isolates only verified offenders with detailed reasons ('Backdoor', 'Lateral Movement') while guaranteeing superadmins are never locked out.",
      telemetryType: "sweeper",
      telemetryData: {
        primaryValue: "10s",
        secondaryValue: "Active Sweep Cycle",
        statusLabel: "SWEEPER ACTIVE · OFFENDER ISOLATED",
        statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        metrics: [
          { label: "Sweep Interval", val: "10.0 sec" },
          { label: "Superadmins", val: "Immune (Whitelisted)" },
          { label: "Grace Period", val: "15s before kill" },
          { label: "False Positives", val: "0.00%" },
        ],
        logs: [
          { label: "Active offender", value: "vendor_ext_92 (CHG-84920)", color: "text-rose-400" },
          { label: "Trigger Reason", value: "Lateral Movement Pivot", color: "text-amber-400" },
          { label: "Action Taken", value: "Socket force-closed, token revoked", color: "text-emerald-400" },
        ],
      },
      whyItMatters:
        "Offenders are quarantined in seconds without risking enterprise operational outages or admin lockouts.",
    },
    {
      id: "lateral-movement",
      title: "Live Command & Script Scanner",
      badge: "In-Session Typed & Script",
      badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/25",
      subtitle: "Detects sshpass, wmiexec, crackmapexec, .ps1, .sh",
      icon: Terminal,
      statusText: "Real-time Intercept",
      engineName: "in-session-lane-filter",
      engineTag: "Deep Packet & Terminal",
      specSummary: "Live command detector + script scanner flagged live",
      detailTitle: "Real-Time In-Session Threat Interception",
      detailDescription:
        "Scans typed keystrokes and executed script files (.sh, .ps1, .bat) as they happen. Immediately flags reconnaissance and pivot tools (sshpass, wmiexec, crackmapexec, impacket) and blocks execution.",
      telemetryType: "threat",
      telemetryData: {
        primaryValue: "< 8ms",
        secondaryValue: "Command Scan Latency",
        statusLabel: "COMMAND INTERCEPTED · BLOCKED",
        statusColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
        metrics: [
          { label: "Command Scanner", val: "Live Keystroke" },
          { label: "Script Inspector", val: ".sh / .ps1 / .bat" },
          { label: "Threat Lanes", val: "5 Active Lanes" },
          { label: "Enforcement", val: "Instant Block" },
        ],
        logs: [
          { label: "Typed Input", value: "crackmapexec smb 10.0.1.0/24 -u admin", color: "text-rose-400 font-mono" },
          { label: "Pattern Detected", value: "Lateral Movement (Pivot Signature)", color: "text-amber-400" },
          { label: "Script Execution", value: "deploy_backdoor.sh -> AUTO-BLOCKED", color: "text-rose-400 font-mono" },
        ],
      },
      whyItMatters:
        "Brute Force, Lateral Movement, Backdoor Accounts, Credential Harvesting, and Off-hours impossible travel are detected in real time.",
    },
    {
      id: "auto-retraining",
      title: "Self-Training & Model Evaluation",
      badge: "Auto-Retrain @ 300 Analyses",
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
      subtitle: "Warm-starts model, .bak backup, export_eval.py",
      icon: RefreshCw,
      statusText: "Pipeline Ready",
      engineName: "model-lifecycle-daemon",
      engineTag: "MLOps Pipeline",
      specSummary: "80/20 train/test split · model_bundle.pkl in-place replacement",
      detailTitle: "Autonomous Retraining & Evaluation Engine",
      detailDescription:
        "Self-training pipeline automatically warm-starts the model after 300 new analyses per organization, backs up .bak, and updates model_bundle.pkl in place. Evaluation tool (export_eval.py) provides threshold sweep and feature separation.",
      telemetryType: "retrain",
      telemetryData: {
        primaryValue: "300 / 300",
        secondaryValue: "Analysis Quota Met",
        statusLabel: "WARM-START COMPLETE · ACTIVE",
        statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        metrics: [
          { label: "Trigger Cycle", val: "Every 300 sessions" },
          { label: "Train/Test Split", val: "80 / 20" },
          { label: "Backup State", val: "model_bundle.bak OK" },
          { label: "Eval Report", val: "Excel Workbook Out" },
        ],
        logs: [
          { label: "Threshold Sweep", value: "Optimal F1 @ 0.72 cutoff", color: "text-sky-400" },
          { label: "Feature Separation", value: "0.94 ROC-AUC on holdout", color: "text-emerald-400" },
          { label: "Hot Swap", value: "model_bundle.pkl swapped live", color: "text-slate-300" },
        ],
      },
      whyItMatters:
        "The model automatically adapts to your organization's evolving baseline without manual data science overhead.",
    },
  ];

  // Mode 2: Omnipriv AI-PAM — Multi-Agent Architecture
  const agentFeatures: FeatureItem[] = [
    {
      id: "agent-identity",
      title: "Agent Identity & Delegation",
      badge: "Human → Agent JWT",
      badgeColor: "text-sky-400 bg-sky-500/10 border-sky-500/25",
      subtitle: "Cryptographic ID; accountability stays with human",
      icon: Bot,
      statusText: "Identity Enforced",
      engineName: "agent-identity-provider",
      engineTag: "Cryptographic Attestation",
      specSummary: "Verifiable agent identity · Human delegation claim embedded",
      detailTitle: "Verifiable Multi-Agent Identity & Delegation",
      detailDescription:
        "Each AI agent is registered with a unique name, status, and hashed API key. Instead of the AI inheriting a human's full credentials, the JWT carries who delegated access, ensuring accountability strictly remains with the human.",
      telemetryType: "agent-delegation",
      telemetryData: {
        primaryValue: "Alex Chen",
        secondaryValue: "Delegated to SRE-Agent-01",
        statusLabel: "HUMAN DELEGATION VERIFIED",
        statusColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
        metrics: [
          { label: "Agent Name", val: "SRE-Agent-01" },
          { label: "Delegator", val: "Alex Chen (Lead SRE)" },
          { label: "Auth Token", val: "Signed JWT (Hashed API)" },
          { label: "Accountability", val: "100% Traceable" },
        ],
        logs: [
          { label: "Delegation Claim", value: "sub: alex.chen@omnipriv.com", color: "text-slate-300 font-mono" },
          { label: "Agent Identity", value: "act_as: agent-sre-prod-01", color: "text-sky-400 font-mono" },
          { label: "Inherited Scope", value: "Restricted DB Tier (Non-Admin)", color: "text-emerald-400" },
        ],
      },
      whyItMatters:
        "Agents do real work against production systems, but can never act anonymously or exceed delegated limits.",
    },
    {
      id: "mcp-server-rbac",
      title: "MCP Server & Tool-Level RBAC",
      badge: "100+ MCP Tools · CASL",
      badgeColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/25",
      subtitle: "Per-agent allow/deny, data masking & server scoping",
      icon: Network,
      statusText: "Transport Active",
      engineName: "omnipriv-mcp-gateway",
      engineTag: "Model Context Protocol",
      specSummary: "OAuth device-flow · Data-level RBAC · Multi-tenant scoping",
      detailTitle: "MCP Tool-Level & Data-Level Authorization",
      detailDescription:
        "Exposes 100+ platform tools to AI clients (Claude, Copilot, DeepSeek) with device-flow OAuth and JWT scoping. The same tool returns different data per agent (Sales-Agent: no salary; HR-Agent: full record) layered on CASL RBAC/ABAC.",
      telemetryType: "mcp-rbac",
      telemetryData: {
        primaryValue: "100+",
        secondaryValue: "Platform MCP Tools Exposed",
        statusLabel: "MCP SCOPING ENFORCED",
        statusColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
        metrics: [
          { label: "Transport", val: "Standard MCP Server" },
          { label: "Tool Policy", val: "Per-Agent Allow/Deny" },
          { label: "Data Scope", val: "CASL / Org Schemas" },
          { label: "Server Scope", val: "Allowlist Enforced" },
        ],
        logs: [
          { label: "Finance-Agent", value: "Finance-MCP: ALLOWED | HR-MCP: DENIED", color: "text-emerald-400" },
          { label: "Data Filtering", value: "Filtered 4 restricted columns via CASL", color: "text-indigo-300" },
          { label: "OAuth Device Flow", value: "JWT Scoped Refresh Token Active", color: "text-sky-400" },
        ],
      },
      whyItMatters:
        "Finance agents cannot reach HR systems, and tool outputs are filtered at the data level before reaching the LLM.",
    },
    {
      id: "prompt-injection-guard",
      title: "Prompt-Injection Guard & HITL",
      badge: "Deterministic Policy Check",
      badgeColor: "text-rose-400 bg-rose-500/10 border-rose-500/25",
      subtitle: "Human-in-the-Loop for high risk; agent trust graph",
      icon: ShieldAlert,
      statusText: "Shield Armed",
      engineName: "prompt-injection-firewall",
      engineTag: "Dual Verification",
      specSummary: "Pre-execution policy re-check · Sensitive action human approval",
      detailTitle: "Prompt-Injection Defense & Human-in-the-Loop",
      detailDescription:
        "Even if an attacker manipulates the LLM reasoning with a prompt injection, OmniPriv's deterministic PAM engine re-verifies every tool call against strict policy before execution. Sensitive actions (delete, refund, transfer) require human approval.",
      telemetryType: "prompt-guard",
      telemetryData: {
        primaryValue: "BLOCKED",
        secondaryValue: "Injection Bypass Thwarted",
        statusLabel: "POLICY RE-VERIFIED & ENFORCED",
        statusColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
        metrics: [
          { label: "Injection Guard", val: "Deterministic PAM" },
          { label: "Sensitive Tools", val: "Human Approval (HITL)" },
          { label: "Trust Graph", val: "Agent-to-Agent Verified" },
          { label: "LLM Trust", val: "Zero Implicit Trust" },
        ],
        logs: [
          { label: "LLM Output", value: "Tool call: drop_table('users')", color: "text-rose-400 font-mono" },
          { label: "Policy Verdict", value: "DENIED: Requires SecOps Human Sign-off", color: "text-amber-400 font-semibold" },
          { label: "Agent Trust", value: "Customer-Agent -> Payroll-Agent [REJECTED]", color: "text-rose-400 font-mono" },
        ],
      },
      whyItMatters:
        "The LLM can make requests, but the PAM policy engine makes the final authorization decision.",
    },
    {
      id: "jit-vault-secrets",
      title: "JIT Secrets & Full Audit Trail",
      badge: "Dynamic Ephemeral Secrets",
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
      subtitle: "Zero permanent credentials; human→agent audit trace",
      icon: KeyRound,
      statusText: "Vault Integrated",
      engineName: "ephemeral-vault-gateway",
      engineTag: "JIT Privileges",
      specSummary: "Short-lived tokens · Per-agent baseline behavioral analytics",
      detailTitle: "Dynamic Vault Secrets & End-to-End Audit",
      detailDescription:
        "Agents never hold permanent credentials. Dynamic secrets are issued on-the-fly from the vault per action and expired immediately after. Complete audit trail records human → agent → server → tool → resource.",
      telemetryType: "jit-vault",
      telemetryData: {
        primaryValue: "15m 00s",
        secondaryValue: "Ephemeral Agent Token",
        statusLabel: "ZERO STANDING CREDENTIALS",
        statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        metrics: [
          { label: "Standing Privilege", val: "0% (Zero)" },
          { label: "Secret Type", val: "Dynamic Vault Token" },
          { label: "Trace Depth", val: "5-Tier (Human to SQL)" },
          { label: "Agent Baseline", val: "Anomaly Monitored" },
        ],
        logs: [
          { label: "Credential Checkout", value: "Dynamic pg_temp_role_8492 issued", color: "text-slate-300 font-mono" },
          { label: "Auto-Revoke", value: "Token armed for auto-deletion on exit", color: "text-emerald-400" },
          { label: "Behavioral Baseline", value: "Agent tool request rate: Normal", color: "text-sky-400" },
        ],
      },
      whyItMatters:
        "Full trace: human → agent → server → tool → resource, with decision, privilege, and duration.",
    },
  ];

  // Mode 3: Traditional Zero Trust PAM Lifecycle
  const pamFeatures: FeatureItem[] = [
    {
      id: "verified-identity",
      title: "Verified Identity & Device Posture",
      badge: "MFA & FIDO2 Hardware",
      badgeColor: "text-sky-400 bg-sky-500/10 border-sky-500/25",
      subtitle: "Alex Chen (Lead SRE) · Compliant Device",
      icon: Fingerprint,
      statusText: "Identity Verified",
      engineName: "identity-authenticator",
      engineTag: "Zero Trust PAM",
      specSummary: "Hardware token attestation · Source IP 198.51.100.24",
      detailTitle: "Continuous Authentication & Device Verification",
      detailDescription:
        "Every privileged connection begins with strict identity validation. Enforces FIDO2 hardware tokens, device compliance posture checks, and conditional access before any network path is opened.",
      telemetryType: "pam-step",
      telemetryData: {
        primaryValue: "FIDO2",
        secondaryValue: "YubiKey 5C NFC Verified",
        statusLabel: "HARDWARE KEY ATTESTED",
        statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        metrics: [
          { label: "Identity", val: "Alex Chen (Lead SRE)" },
          { label: "Device State", val: "EDR & TPM Compliant" },
          { label: "IP Geolocation", val: "Ashburn, VA (Expected)" },
          { label: "Risk Score", val: "0.02 (Low)" },
        ],
        logs: [
          { label: "MFA Protocol", value: "WebAuthn / FIDO2 Level 2", color: "text-emerald-400" },
          { label: "Device Health", value: "Encrypted disk, patch level current", color: "text-sky-400" },
          { label: "Posture Check", value: "Zero standing credentials on endpoint", color: "text-slate-300" },
        ],
      },
      whyItMatters:
        "Eliminates stolen password attacks and ensures only legitimate administrators on secured hardware can connect.",
    },
    {
      id: "policy-evaluation",
      title: "Granular Policy & Least Privilege",
      badge: "RBAC & PoLP Enforced",
      badgeColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/25",
      subtitle: "Rule: DB-Tier-Migration · Ticket: CHG-84920",
      icon: ShieldCheck,
      statusText: "Policy Evaluated",
      engineName: "pam-policy-engine",
      engineTag: "Least Privilege",
      specSummary: "Command-level ACLs · Multi-tenant organization architecture",
      detailTitle: "Just-Enough & Least-Privilege Enforcement",
      detailDescription:
        "Binds every access request to an approved IT ticket and role policy. Restricts command sets so admins can only execute authorized maintenance commands without unrestricted root access.",
      telemetryType: "pam-step",
      telemetryData: {
        primaryValue: "CHG-84920",
        secondaryValue: "ServiceNow Verified",
        statusLabel: "POLICY & TICKET LINKED",
        statusColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
        metrics: [
          { label: "Policy Rule", val: "DB-Tier-Migration" },
          { label: "Ticket ID", val: "CHG-84920 (Approved)" },
          { label: "Command ACL", val: "Restricted Schema Only" },
          { label: "Root Access", val: "Denied (PoLP)" },
        ],
        logs: [
          { label: "Allowed Commands", value: "SELECT, ALTER TABLE, CREATE INDEX", color: "text-emerald-400 font-mono" },
          { label: "Blocked Commands", value: "DROP, TRUNCATE, GRANT", color: "text-rose-400 font-mono" },
          { label: "Tenant Scope", value: "Isolated to Org DB Cluster #01", color: "text-slate-300" },
        ],
      },
      whyItMatters:
        "Prevents accidental disasters and malicious insiders by constraining permissions to the exact task.",
    },
    {
      id: "dual-authorization",
      title: "Dual Authorization & Approval",
      badge: "2/2 Approvals Confirmed",
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
      subtitle: "SecOps Lead (Approved) · Team Lead (Approved)",
      icon: Users,
      statusText: "Authorized",
      engineName: "approval-workflow-service",
      engineTag: "Four-Eyes Principle",
      specSummary: "Cryptographic sign-offs · Immutable audit stamp",
      detailTitle: "Four-Eyes Multi-Party Approval Workflow",
      detailDescription:
        "High-sensitivity production assets require multi-party approval. Access cannot be granted by a single user alone; SecOps and Engineering managers must dual-sign each session request.",
      telemetryType: "pam-step",
      telemetryData: {
        primaryValue: "2 of 2",
        secondaryValue: "Cryptographic Signatures",
        statusLabel: "DUAL APPROVAL SECURED",
        statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        metrics: [
          { label: "Approver 1", val: "SecOps Lead (Approved)" },
          { label: "Approver 2", val: "Team Lead (Approved)" },
          { label: "Audit Hash", val: "SHA-256 Verified" },
          { label: "Time-to-Approve", val: "1m 42s" },
        ],
        logs: [
          { label: "Sign-off 1", value: "secops.lead@omnipriv.com (FIDO2 signed)", color: "text-emerald-400" },
          { label: "Sign-off 2", value: "team.lead@omnipriv.com (FIDO2 signed)", color: "text-emerald-400" },
          { label: "Compliance Tag", value: "SOC 2 Type II / ISO 27001 Certified", color: "text-sky-400" },
        ],
      },
      whyItMatters:
        "Enforces the four-eyes principle on critical systems so no single actor can compromise infrastructure.",
    },
    {
      id: "jit-access-window",
      title: "Just-In-Time (JIT) Access Window",
      badge: "JIT: 30 min (Countdown)",
      badgeColor: "text-[#00B8FF] bg-[#00B8FF]/10 border-[#00B8FF]/30",
      subtitle: "Ephemeral token active · 28:14 remaining",
      icon: Clock,
      statusText: "Time-Limited Window",
      engineName: "jit-token-issuer",
      engineTag: "Zero Standing Privilege",
      specSummary: "Zero permanent keys · Automatic credential disposal",
      detailTitle: "Ephemeral Just-in-Time Access Provisioning",
      detailDescription:
        "Zero standing privileges exist in your environment. Temporary, scoped credentials are generated on-demand only for the duration of the change window and automatically destroyed upon completion.",
      telemetryType: "pam-step",
      telemetryData: {
        primaryValue: "28m 14s",
        secondaryValue: "Active Countdown Remaining",
        statusLabel: "JIT WINDOW ACTIVE",
        statusColor: "text-[#00B8FF] bg-[#00B8FF]/10 border-[#00B8FF]/20",
        metrics: [
          { label: "Window Length", val: "30 Minutes" },
          { label: "Remaining", val: "28m 14s" },
          { label: "Credential Life", val: "Auto-Revoke Armed" },
          { label: "Standing Risk", val: "Zero (No stored pw)" },
        ],
        logs: [
          { label: "Token Type", value: "Short-lived Mutual TLS Cert", color: "text-sky-400" },
          { label: "Target Host", value: "prod-db-cluster-01.us-east:5432", color: "text-slate-300 font-mono" },
          { label: "Auto-Revoke", value: "Armed for 14:30:00 UTC cutoff", color: "text-emerald-400" },
        ],
      },
      whyItMatters:
        "If a laptop is stolen or compromised tomorrow, there are zero active passwords or credentials to steal.",
    },
    {
      id: "live-session-monitoring",
      title: "Live Session Recording & Audit",
      badge: "HD Live Recording",
      badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
      subtitle: "Proxied TLS 1.3 gateway · Keystroke capture",
      icon: Video,
      statusText: "Auditing Live",
      engineName: "session-proxy-recorder",
      engineTag: "Tamper-Proof Audit",
      specSummary: "Indexed video playback · Live stream to SIEM & SOC",
      detailTitle: "Full Session Recording & Forensic Traceability",
      detailDescription:
        "Proxies all SSH, RDP, Database, and Web sessions through an isolated gateway. Captures full video, typed keystrokes, and file transfers with tamper-proof hashing ready for regulatory compliance.",
      telemetryType: "pam-step",
      telemetryData: {
        primaryValue: "REC ●",
        secondaryValue: "TLS 1.3 Proxied Session",
        statusLabel: "TAMPER-PROOF AUDIT RECORDING",
        statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        metrics: [
          { label: "Recording Mode", val: "HD Video & Keystroke" },
          { label: "Integrity", val: "SHA-256 Chained Hash" },
          { label: "SIEM Export", val: "Syslog / Splunk Live" },
          { label: "Session Termination", val: "1-Click Kill Available" },
        ],
        logs: [
          { label: "TLS Gateway", value: "Forward proxy active on port 5432", color: "text-emerald-400" },
          { label: "Keystroke Capture", value: "Real-time index buffer synced", color: "text-sky-400" },
          { label: "Forensic Chain", value: "WORM compliant (Write Once Read Many)", color: "text-slate-300" },
        ],
      },
      whyItMatters:
        "Eliminates 'he said, she said' disputes during security audits and provides total proof of compliance.",
    },
  ];

  const currentFeatures =
    activeMode === "ml"
      ? mlFeatures
      : activeMode === "agent"
      ? agentFeatures
      : pamFeatures;

  const currentFeature =
    currentFeatures.find((f) => f.id === selectedFeatureId) || currentFeatures[0];

  const handleModeChange = (mode: ModeKey) => {
    setActiveMode(mode);
    if (mode === "ml") setSelectedFeatureId("anomaly-detection");
    else if (mode === "agent") setSelectedFeatureId("agent-identity");
    else setSelectedFeatureId("verified-identity");
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Outer subtle glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-[#00B8FF]/15 via-[#6366f1]/10 to-transparent blur-xl pointer-events-none" />

      {/* Main Console Container */}
      <div className="relative rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.09] bg-white dark:bg-[#070e1a] shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* Top Control Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-900/[0.08] dark:border-white/[0.07] bg-slate-50 dark:bg-[#0a1324]/90 backdrop-blur-md gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700/90" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700/90" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700/90" />
            </div>
            <span className="h-3 w-px bg-slate-300 dark:bg-white/[0.08]" />
            <div className="flex items-center gap-2 text-xs font-mono">
              <Lock className="w-3.5 h-3.5 text-[#00B8FF]" />
              <span className="text-slate-700 dark:text-slate-300 font-semibold tracking-tight">omnipriv.gateway</span>
              <span className="text-slate-400 dark:text-slate-600">/</span>
              <span className="text-[#00B8FF]">{currentFeature.engineName}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#00B8FF]/30 bg-[#00B8FF]/10 text-[11px] font-semibold text-[#00B8FF] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B8FF] animate-pulse" />
              {currentFeature.statusText.toUpperCase()}
            </div>
            <span className="text-[10px] font-mono text-slate-500 hidden md:inline-block">
              {currentFeature.engineTag}
            </span>
          </div>
        </div>

        {/* Mode Switcher Tabs (PAM vs ML vs Multi-Agent) */}
        <div className="px-4 sm:px-6 py-2.5 border-b border-slate-900/[0.08] dark:border-white/[0.06] bg-slate-100/70 dark:bg-[#08101e] flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-[#040812] border border-slate-900/[0.06] dark:border-white/[0.06]">
            <button
              onClick={() => handleModeChange("ml")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeMode === "ml"
                  ? "bg-[#00B8FF]/15 text-[#00B8FF] border border-[#00B8FF]/30 shadow-[0_0_12px_rgba(0,184,255,0.15)]"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Core ML Engine
            </button>

            <button
              onClick={() => handleModeChange("agent")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeMode === "agent"
                  ? "bg-[#6366f1]/20 text-[#6366f1] dark:text-[#a5b4fc] border border-[#6366f1]/35 shadow-[0_0_12px_rgba(99,102,241,0.2)]"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              Multi-Agent AI-PAM
            </button>

            <button
              onClick={() => handleModeChange("pam")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeMode === "pam"
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Zero Trust PAM
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden lg:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Interactive Console — Click any item on the left to inspect</span>
          </div>
        </div>

        {/* Master-Detail Interactive Surface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          {/* Left Column: Selectable Features / Pipeline Stages (5 cols on lg) */}
          <div className="lg:col-span-5 p-4 sm:p-5 border-b lg:border-b-0 lg:border-r border-slate-900/[0.08] dark:border-white/[0.06] bg-slate-50/70 dark:bg-[#060c18] space-y-2.5">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>
                {activeMode === "ml"
                  ? "Detection & ML Modules"
                  : activeMode === "agent"
                  ? "Multi-Agent Controls"
                  : "Access Verification Stages"}
              </span>
              <span className="text-[#00B8FF] font-mono">
                {currentFeatures.length} Active Modules
              </span>
            </div>

            <div className="space-y-2">
              {currentFeatures.map((feat) => {
                const isSelected = feat.id === currentFeature.id;
                const IconComponent = feat.icon;

                return (
                  <button
                    key={feat.id}
                    type="button"
                    onClick={() => setSelectedFeatureId(feat.id)}
                    className={`w-full text-left group relative p-3 sm:p-3.5 rounded-xl border transition-all duration-200 ${
                      isSelected
                        ? "border-[#00B8FF]/45 bg-sky-500/[0.08] dark:bg-[#0d1c33] shadow-[0_0_24px_rgba(0,184,255,0.08)] -translate-y-0.5"
                        : "border-slate-900/[0.06] dark:border-white/[0.05] bg-white dark:bg-[#081222] hover:border-slate-900/[0.12] dark:hover:border-white/[0.12] hover:bg-slate-100 dark:hover:bg-[#0a1528]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors mt-0.5 ${
                          isSelected
                            ? "bg-[#00B8FF]/20 text-[#00B8FF] border border-[#00B8FF]/35"
                            : "bg-slate-100 dark:bg-white/[0.04] text-slate-500 dark:text-slate-400 border border-slate-900/[0.06] dark:border-white/[0.06] group-hover:text-slate-800 dark:group-hover:text-slate-200"
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span
                            className={`text-xs font-semibold tracking-tight transition-colors ${
                              isSelected ? "text-slate-950 dark:text-white" : "text-slate-700 dark:text-slate-300 group-hover:text-slate-950 dark:group-hover:text-white"
                            }`}
                          >
                            {feat.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${feat.badgeColor}`}>
                            {feat.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-1">
                          {feat.subtitle}
                        </p>
                      </div>

                      <div className="flex items-center self-center flex-shrink-0 pl-1">
                        {isSelected ? (
                          <ChevronRight className="w-4 h-4 text-[#00B8FF] animate-pulse" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-slate-400 dark:text-slate-600 group-hover:text-slate-600 dark:group-hover:text-slate-400" />
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Deep-Inspection Panel (7 cols on lg) */}
          <div className="lg:col-span-7 p-5 sm:p-6 bg-white dark:bg-[#081222]/80 flex flex-col justify-between">
            <div>
              {/* Header of Active Feature */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-900/[0.08] dark:border-white/[0.06] gap-2 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono text-[#00B8FF] uppercase tracking-wider font-semibold">
                      INSPECTOR TELEMETRY
                    </span>
                    <span className="text-slate-400 dark:text-slate-600">&bull;</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      {currentFeature.specSummary}
                    </span>
                  </div>
                  <h3
                    className="text-base sm:text-lg font-bold text-slate-950 dark:text-white tracking-tight"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {currentFeature.detailTitle}
                  </h3>
                </div>

                <div
                  className={`self-start sm:self-center px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold border ${currentFeature.telemetryData.statusColor}`}
                >
                  {currentFeature.telemetryData.statusLabel}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                {currentFeature.detailDescription}
              </p>

              {/* Metric Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
                {currentFeature.telemetryData.metrics?.map((m) => (
                  <div
                    key={m.label}
                    className="p-2.5 rounded-xl border border-slate-900/[0.08] dark:border-white/[0.06] bg-slate-50 dark:bg-[#050b14] text-center"
                  >
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{m.label}</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5 truncate">
                      {m.val}
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Technical Output / Telemetry Log Console */}
              <div className="rounded-xl border border-slate-900/[0.08] dark:border-white/[0.07] bg-slate-950 dark:bg-[#040810] p-3.5 mb-4 font-mono text-xs">
                <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 border-b border-white/[0.08] pb-2 mb-2.5">
                  <span className="flex items-center gap-1.5 text-slate-300 dark:text-slate-400">
                    <Terminal className="w-3 h-3 text-[#00B8FF]" />
                    LIVE ENFORCEMENT &amp; REASONING LOGS
                  </span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    STREAMING
                  </span>
                </div>

                <div className="space-y-1.5">
                  {currentFeature.telemetryData.logs?.map((log, i) => (
                    <div key={i} className="flex items-start justify-between gap-3 text-[11px]">
                      <span className="text-slate-400 truncate">&gt; {log.label}:</span>
                      <span className={`font-semibold flex-shrink-0 ${log.color || "text-slate-200"}`}>
                        {log.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Callout: Why It Matters */}
            <div className="pt-3.5 border-t border-slate-900/[0.08] dark:border-white/[0.06] flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400 bg-slate-50/70 dark:bg-white/[0.01] -mx-5 -mb-6 p-4 rounded-b-2xl">
              <Zap className="w-4 h-4 text-[#00B8FF] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-950 dark:text-white">Why it matters: </strong>
                <span>{currentFeature.whyItMatters}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Console Live Status Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-slate-900/[0.08] dark:border-white/[0.07] bg-slate-50 dark:bg-[#050b14] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse flex-shrink-0" />
            <span className="text-slate-700 dark:text-slate-300">
              Active Security Plane: <strong className="text-emerald-400">OmniPriv Hybrid Gateway</strong>
            </span>
            <span className="text-slate-400 dark:text-slate-600 hidden sm:inline">&bull;</span>
            <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">Zero-Trust &amp; AI Attestation</span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 bg-slate-900/[0.03] dark:bg-white/[0.04] px-2.5 py-1 rounded border border-slate-900/[0.06] dark:border-white/[0.07]">
              CASL Data RBAC
            </span>
            <span className="text-[10px] font-mono text-[#00B8FF] bg-[#00B8FF]/10 px-2.5 py-1 rounded border border-[#00B8FF]/25 font-semibold">
              DeepSeek &amp; MCP Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
