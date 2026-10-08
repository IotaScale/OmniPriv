"use client";

import { useEffect, useRef } from "react";
import { MotionConfig, motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Ban,
  Bot,
  BrainCircuit,
  Check,
  Clock,
  Cpu,
  Database,
  Eye,
  FileCheck2,
  Globe,
  KeyRound,
  Layers,
  Lock,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  User,
  Workflow,
  Zap,
} from "lucide-react";

/*
 * One live product scene per challenge, in place of generic artwork.
 * Each is a small, real slice of the OmniPriv console doing the thing the
 * challenge describes. Figures come from the product captures (78 anomalies,
 * 72 high threat, 86% readiness, 31 / 3 / 4 / 4 of 42 controls, framework
 * bars, real asset names) and from capabilities stated on /ai-pam and the
 * /platform pages. Sized in cqw against the card, so they scale as pictures.
 *
 * Motion: each scene plays its own short story once when it appears (about
 * 1.5s) and then rests. The story is the product doing the job the headline
 * names: a tool call being judged, a spike being caught, a session being
 * brokered, controls being mapped, privilege being cut, tools converging.
 * One easing curve, small distances (6px), opacity and transform only.
 * Reduced motion: nothing moves; scenes only fade and fill in.
 */

const EASE = [0.23, 1, 0.32, 1] as const;

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

/** Tween helper: one curve everywhere, explicit delay. */
const t = (delay: number, duration = 0.4) => ({ delay, duration, ease: EASE });

/** Counts up to `to` once, after `delay`. Renders the final value without JS or with reduced motion. */
function Count({ to, delay = 0, dur = 900, suffix = "" }: { to: number; delay?: number; dur?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    el.textContent = `0${suffix}`;
    let raf = 0;
    let start = 0;
    const timer = window.setTimeout(() => {
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min(1, (ts - start) / dur);
        el.textContent = `${Math.round(to * (1 - Math.pow(1 - p, 3)))}${suffix}`;
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay * 1000);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [to, delay, dur, suffix, reduce]);
  return (
    <span ref={ref}>
      {to}
      {suffix}
    </span>
  );
}

function Frame({
  icon: Icon,
  title,
  chip,
  chipTone = "cyan",
  children,
}: {
  icon: typeof Bot;
  title: string;
  chip: string;
  chipTone?: "cyan" | "rose" | "emerald";
  children: React.ReactNode;
}) {
  return (
    <div className="cv-frame">
      <div className="cv-head">
        <span className="cv-head-icon">
          <Icon className="w-[2.6cqw] h-[2.6cqw]" aria-hidden="true" />
        </span>
        <span className="cv-head-title">{title}</span>
        <span className={`cv-chip is-${chipTone}`}>{chip}</span>
      </div>
      <motion.div className="cv-body" variants={list} initial="hidden" animate="show">
        {children}
      </motion.div>
    </div>
  );
}

/* 1. Secure AI agents: each tool call is judged in turn, then the verdict lands */
function AgentPolicy() {
  const calls = [
    { call: "crm.read_customers", v: "allow", note: "In scope" },
    { call: "invoice.create_draft", v: "allow", note: "In scope" },
    { call: "billing.send_invoice", v: "hold", note: "Waiting for approval" },
    { call: "db.drop_table", v: "deny", note: "Blocked by policy" },
    { call: "shell.exec", v: "deny", note: "Prompt-injection guard" },
  ] as const;
  return (
    <Frame icon={Bot} title="ai-agent-07" chip="MCP: finance-readonly">
      <motion.div variants={item} className="cv-row cv-muted">
        <span>Tool call</span>
        <span className="ml-auto">Decision</span>
      </motion.div>
      {calls.map((c, i) => {
        const at = 0.45 + i * 0.2; // when this call's verdict lands
        return (
          <motion.div key={c.call} variants={item} className="cv-row relative overflow-hidden">
            {c.v === "deny" && (
              <motion.span
                className="absolute inset-0 bg-rose-500/[0.12] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ delay: at, duration: 0.9, times: [0, 0.25, 1] }}
                aria-hidden="true"
              />
            )}
            <motion.span
              className={`cv-verdict is-${c.v}`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={t(at, 0.3)}
            >
              {c.v === "allow" ? <Check /> : c.v === "hold" ? <Clock /> : <Ban />}
            </motion.span>
            <span className="cv-mono">{c.call}</span>
            <span className="relative ml-auto grid">
              <motion.span
                className="cv-note is-checking [grid-area:1/1] justify-self-end"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={t(at, 0.2)}
              >
                Checking policy
              </motion.span>
              <motion.span
                className={`cv-note is-${c.v} [grid-area:1/1] justify-self-end`}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={t(at + 0.05, 0.3)}
              >
                {c.note}
              </motion.span>
            </span>
          </motion.div>
        );
      })}
      <motion.div variants={item} className="cv-foot">
        <ShieldCheck className="w-[2.2cqw] h-[2.2cqw] text-[#00B8DB]" aria-hidden="true" />
        Every call re-verified against deterministic policy before it runs
      </motion.div>
    </Frame>
  );
}

/* 2. AI-driven threats: the score runs along, spikes past the threshold, gets blocked */
function ThreatDetection() {
  // The spike sits at 190/300 of the line; the dot and alert follow the draw.
  const DRAW = 1.1;
  const spikeAt = 0.25 + DRAW * 0.6;
  return (
    <Frame icon={BrainCircuit} title="ML threat detection" chip="Live" chipTone="emerald">
      <motion.div variants={item} className="grid grid-cols-3 gap-[1.6cqw]">
        {[
          { v: 78, s: "", l: "ML anomalies" },
          { v: 72, s: "", l: "High threat" },
          { v: 10, s: "s", l: "Auto-block sweep" },
        ].map((st) => (
          <div key={st.l} className="cv-stat">
            <span className="cv-stat-v">
              <Count to={st.v} suffix={st.s} delay={0.15} dur={800} />
            </span>
            <span className="cv-stat-l">{st.l}</span>
          </div>
        ))}
      </motion.div>
      <motion.div variants={item} className="cv-chart">
        <svg viewBox="0 0 300 110" className="w-full h-full" aria-hidden="true">
          <line x1="0" y1="34" x2="300" y2="34" stroke="#f43f5e" strokeOpacity="0.45" strokeDasharray="4 5" />
          <text x="298" y="28" textAnchor="end" fontSize="9" fill="#fda4af">risk threshold</text>
          <motion.polyline
            fill="none"
            stroke="#00B8DB"
            strokeWidth="2.2"
            strokeLinejoin="round"
            strokeLinecap="round"
            points="0,92 20,88 40,94 60,86 80,90 100,84 120,89 140,82 160,86 176,80 190,14 204,84 224,80 244,86 264,82 284,88 300,84"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.25, duration: DRAW, ease: "linear" }}
          />
          <motion.circle
            cx="190"
            cy="14"
            r="9"
            fill="#f43f5e"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.35, 0], scale: [0.6, 1.6, 2] }}
            transition={{ delay: spikeAt, duration: 0.8, ease: "easeOut" }}
            style={{ transformOrigin: "190px 14px" }}
          />
          <motion.circle
            cx="190"
            cy="14"
            r="4.5"
            fill="#f43f5e"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={t(spikeAt, 0.25)}
            style={{ transformOrigin: "190px 14px" }}
          />
        </svg>
      </motion.div>
      <motion.div
        className="cv-alert"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={t(spikeAt + 0.2)}
      >
        <ShieldAlert className="w-[2.6cqw] h-[2.6cqw] shrink-0" aria-hidden="true" />
        <span>
          <span className="block font-semibold text-white">Brute force on windows_prod_01</span>
          <span className="block">Session terminated and source auto-blocked</span>
        </span>
        <motion.span
          className="cv-chip is-rose ml-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={t(spikeAt + 0.5, 0.3)}
        >
          Blocked
        </motion.span>
      </motion.div>
    </Frame>
  );
}

/* 3. Remote and hybrid: user, gateway and server link up in order, then the session runs */
function RemoteSession() {
  const hops = [
    { icon: User, label: "j.rahman", sub: "MFA verified" },
    { icon: Shield, label: "OmniPriv gateway", sub: "Brokered, no VPN" },
    { icon: Server, label: "linux_prod_01", sub: "SSH, JIT 30 min" },
  ];
  const lines = [
    ["$", "ssh linux_prod_01 --via omnipriv-gw"],
    ["", "Credential injected from vault, never shown"],
    ["$", "sudo systemctl status nginx"],
    ["$", "tail -n 20 /var/log/auth.log"],
  ];
  const hopAt = (i: number) => 0.2 + i * 0.35;
  const termAt = hopAt(hops.length - 1) + 0.3;
  return (
    <Frame icon={Globe} title="Brokered session" chip="Recording" chipTone="rose">
      <motion.div variants={item} className="cv-hops">
        {hops.map((h, i) => (
          <div key={h.label} className="contents">
            <div className="cv-hop">
              <motion.span
                className="cv-hop-icon"
                initial={{ opacity: 0.35, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={t(hopAt(i), 0.35)}
              >
                <h.icon className="w-[2.6cqw] h-[2.6cqw]" aria-hidden="true" />
              </motion.span>
              <span className="cv-hop-label">{h.label}</span>
              <motion.span
                className="cv-hop-sub"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={t(hopAt(i) + 0.1, 0.3)}
              >
                {h.sub}
              </motion.span>
            </div>
            {i < hops.length - 1 && (
              <span className="cv-hop-line" aria-hidden="true">
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: hopAt(i) + 0.15, duration: 0.3, ease: "easeInOut" }}
                />
              </span>
            )}
          </div>
        ))}
      </motion.div>
      <motion.div variants={item} className="cv-term">
        {lines.map(([pr, line], i) => (
          <motion.div
            key={line}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={t(termAt + i * 0.22, 0.25)}
          >
            <span className="text-emerald-400">{pr}</span> {line}
          </motion.div>
        ))}
        <motion.span
          className="cv-caret"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={t(termAt + lines.length * 0.22, 0.2)}
          aria-hidden="true"
        />
      </motion.div>
      <motion.div variants={item} className="cv-timeline">
        <motion.span
          className="cv-timeline-fill"
          initial={{ scaleX: 0.02 }}
          animate={{ scaleX: 0.62 }}
          transition={{ delay: termAt, duration: 1.4, ease: EASE }}
        />
      </motion.div>
    </Frame>
  );
}

/* 4. Audit and compliance: readiness fills in, then each framework's coverage */
function Compliance() {
  const segs = [
    { v: 31, c: "#10b981" },
    { v: 3, c: "#f59e0b" },
    { v: 4, c: "#ef4444" },
    { v: 4, c: "#94a3b8" },
  ];
  const total = 42;
  let acc = 0;
  const fw = [
    { n: "SOC 2", g: 25, a: 2, r: 3 },
    { n: "ISO 27001", g: 14, a: 3, r: 2 },
    { n: "NIST 800-53", g: 26, a: 3, r: 3 },
    { n: "HIPAA", g: 3, a: 1, r: 0 },
    { n: "PCI DSS", g: 21, a: 0, r: 1 },
    { n: "SOX 404", g: 1, a: 1, r: 1 },
  ];
  return (
    <Frame icon={FileCheck2} title="Compliance reports" chip="42 controls">
      <div className="grid grid-cols-[0.8fr_1.2fr] gap-[3cqw] items-center flex-1">
        <motion.div variants={item} className="relative mx-auto w-[24cqw] h-[24cqw]">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90" aria-hidden="true">
            <circle cx="18" cy="18" r="15.9155" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3.4" />
            {segs.map((s, i) => {
              const len = (s.v / total) * 100 - 0.8;
              const start = acc;
              acc += (s.v / total) * 100;
              return (
                <motion.circle
                  key={i}
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke={s.c}
                  strokeWidth="3.4"
                  strokeDashoffset={-start}
                  initial={{ strokeDasharray: `0 100` }}
                  animate={{ strokeDasharray: `${len} ${100 - len}` }}
                  transition={{ delay: 0.2 + (start / 100) * 0.9, duration: Math.max(0.15, (len / 100) * 0.9), ease: "linear" }}
                />
              );
            })}
          </svg>
          <span className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="cv-stat-v">
              <Count to={86} suffix="%" delay={0.2} dur={1000} />
            </span>
            <span className="cv-stat-l">Readiness</span>
          </span>
        </motion.div>
        <div className="grid gap-[1.4cqw]">
          {fw.map((f, i) => (
            <motion.div key={f.n} variants={item} className="grid grid-cols-[13cqw_1fr] items-center gap-[1.4cqw]">
              <span className="cv-label text-right">{f.n}</span>
              <span className="relative h-[1.9cqw]">
                <motion.span
                  className="absolute inset-y-0 left-0 flex rounded-[0.4cqw] overflow-hidden origin-left"
                  style={{ width: `${((f.g + f.a + f.r) / 32) * 100}%` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={t(0.35 + i * 0.08, 0.6)}
                >
                  <span style={{ flex: f.g, background: "#10b981" }} />
                  {f.a > 0 && <span style={{ flex: f.a, background: "#f59e0b" }} />}
                  {f.r > 0 && <span style={{ flex: f.r, background: "#ef4444" }} />}
                </motion.span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div variants={item} className="cv-foot">
        <Lock className="w-[2.2cqw] h-[2.2cqw] text-[#00B8DB]" aria-hidden="true" />
        Immutable session logs, exported as audit-ready evidence in one click
      </motion.div>
    </Frame>
  );
}

/* 5. Identity risk: each finding is fixed in turn while standing privilege drains */
function PrivilegeReview() {
  const rows = [
    { who: "svc-backup", kind: Cpu, priv: "Domain Admin, standing", fix: "Now JIT, 30 min" },
    { who: "contractor.ali", kind: User, priv: "Prod DB write, unused 90 days", fix: "Revoked" },
    { who: "ai-agent-07", kind: Bot, priv: "shell.exec on linux_prod_01", fix: "Scoped to read-only" },
    { who: "j.rahman", kind: User, priv: "root, always on", fix: "Approval required" },
  ];
  const fixAt = (i: number) => 0.6 + i * 0.28;
  return (
    <Frame icon={Eye} title="Privilege review" chip="4 findings" chipTone="rose">
      {rows.map((r, i) => (
        <motion.div key={r.who} variants={item} className="cv-risk">
          <span className="cv-hop-icon !w-[4.6cqw] !h-[4.6cqw]">
            <r.kind className="w-[2.2cqw] h-[2.2cqw]" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block cv-mono text-white">{r.who}</span>
            <span className="block cv-label truncate">{r.priv}</span>
          </span>
          <span className="relative ml-auto grid">
            <motion.span
              className="cv-note is-deny [grid-area:1/1] justify-self-end"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={t(fixAt(i), 0.2)}
            >
              Excess
            </motion.span>
            <motion.span
              className="cv-note is-allow [grid-area:1/1] justify-self-end whitespace-nowrap"
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={t(fixAt(i) + 0.05, 0.3)}
            >
              {r.fix}
            </motion.span>
          </span>
        </motion.div>
      ))}
      <motion.div variants={item} className="cv-meter">
        <span className="cv-label">Standing privilege</span>
        <span className="cv-meter-track">
          <motion.span
            className="cv-meter-fill"
            initial={{ scaleX: 0.9 }}
            animate={{ scaleX: 0.08 }}
            transition={{ delay: 0.6, duration: 1.3, ease: [0.77, 0, 0.175, 1] }}
          />
        </span>
        <span className="cv-label text-emerald-400">Zero standing</span>
      </motion.div>
    </Frame>
  );
}

/* 6. Consolidation: eight tools settle around one policy engine, which then comes on */
function Consolidation() {
  const mods = [
    { icon: KeyRound, n: "Credentials" },
    { icon: Globe, n: "Remote access" },
    { icon: Workflow, n: "Workflow" },
    { icon: Shield, n: "App security" },
    { icon: Zap, n: "Policy engine", core: true },
    { icon: ShieldAlert, n: "Threat protection" },
    { icon: FileCheck2, n: "Audit" },
    { icon: Layers, n: "Integrations" },
    { icon: Database, n: "Deployment" },
  ];
  // Each module starts a little outside its slot and settles in, outer ring first.
  const from = [
    [-5, -4],
    [0, -6],
    [5, -4],
    [-6, 0],
    [0, 0],
    [6, 0],
    [-5, 4],
    [0, 6],
    [5, 4],
  ];
  return (
    <Frame icon={Layers} title="One platform" chip="9 modules">
      <div className="grid grid-cols-3 gap-[1.6cqw] flex-1">
        {mods.map((m, i) => (
          <motion.div
            key={m.n}
            className={`cv-mod relative ${m.core ? "is-core" : ""}`}
            initial={m.core ? { opacity: 0, scale: 0.9 } : { opacity: 0, x: `${from[i][0]}cqw`, y: `${from[i][1]}cqw` }}
            animate={m.core ? { opacity: 1, scale: 1 } : { opacity: 1, x: 0, y: 0 }}
            transition={m.core ? t(0.75, 0.4) : t(0.1 + i * 0.05, 0.55)}
          >
            {m.core && (
              <motion.span
                className="absolute -inset-[0.6cqw] rounded-[2cqw] border border-[#00B8DB] pointer-events-none"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: [0, 0.8, 0], scale: [0.96, 1.04, 1.1] }}
                transition={{ delay: 1.05, duration: 0.9, ease: "easeOut" }}
                aria-hidden="true"
              />
            )}
            <m.icon className="w-[2.8cqw] h-[2.8cqw]" aria-hidden="true" />
            <span>{m.n}</span>
          </motion.div>
        ))}
      </div>
      <motion.div variants={item} className="flex flex-wrap gap-[1.2cqw]">
        {["One credential store", "One policy engine", "One audit trail"].map((t) => (
          <span key={t} className="cv-chip is-cyan">
            {t}
          </span>
        ))}
      </motion.div>
    </Frame>
  );
}

const SCENES = [AgentPolicy, ThreatDetection, RemoteSession, Compliance, PrivilegeReview, Consolidation];

export default function ChallengeVisual({ index }: { index: number }) {
  const Scene = SCENES[index] ?? AgentPolicy;
  return (
    <MotionConfig reducedMotion="user">
      <div className="cv-root" role="img" aria-label="OmniPriv console illustration">
        <Scene />
      </div>
    </MotionConfig>
  );
}

