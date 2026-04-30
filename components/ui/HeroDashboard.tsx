"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle2, AlertTriangle, Lock, Eye, Activity, Terminal, Wifi } from "lucide-react";

const sessions = [
  { user: "admin@corp.com",   target: "prod-db-01",     proto: "SSH",  status: "active",    time: "0:04:32" },
  { user: "devops@corp.com",  target: "k8s-cluster-3",  proto: "K8s",  status: "active",    time: "0:01:15" },
  { user: "ops@corp.com",     target: "win-server-22",  proto: "RDP",  status: "recorded",  time: "0:12:07" },
  { user: "jane@corp.com",    target: "mysql-prod",     proto: "DB",   status: "reviewing", time: "0:00:48" },
];

const alerts = [
  { msg: "MFA verified",             icon: CheckCircle2, color: "text-emerald-400" },
  { msg: "Credential rotated",       icon: Lock,         color: "text-[#6366F1]" },
  { msg: "Session recorded",         icon: Eye,          color: "text-[#A78BFA]" },
  { msg: "Anomaly blocked",          icon: AlertTriangle,color: "text-amber-400" },
];

const statusColors: Record<string, string> = {
  active:    "bg-emerald-500",
  recorded:  "bg-[#6366F1]",
  reviewing: "bg-amber-400",
};

const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };
const list = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } } };

export default function HeroDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
      className="relative w-full max-w-[580px] mx-auto select-none"
    >
      {/* Outer glow ring */}
      <div className="absolute -inset-px rounded-2xl bg-[#6366F1]/20 blur-sm pointer-events-none" />

      <div className="relative rounded-2xl border border-[#6366F1]/25 bg-[#0E0E1C] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.8)]">

        {/* ── Window chrome ── */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#13132A]">
          <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
          <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
          <span className="w-3 h-3 rounded-full bg-[#22C55E]" />
          <div className="flex-1 mx-3 h-5 rounded bg-[#1A1A38] flex items-center px-3">
            <span className="text-[10px] text-slate-500 font-mono">omnipriv.io / console / sessions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            />
            <span className="text-[10px] text-emerald-400 font-semibold">LIVE</span>
          </div>
        </div>

        <div className="p-5 space-y-4">

          {/* ── Summary bar ── */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-4 gap-2"
          >
            {[
              { label: "Active",    val: "4",    color: "text-emerald-400" },
              { label: "Recorded",  val: "12",   color: "text-[#A78BFA]" },
              { label: "Policies",  val: "128",  color: "text-[#6366F1]" },
              { label: "Threats",   val: "0",    color: "text-amber-400" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-[#13132A] border border-white/[0.05] p-3 text-center">
                <div className={`text-lg font-extrabold ${s.color}`} style={{ fontFamily: "var(--font-syne)" }}>{s.val}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* ── Active sessions ── */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-[#6366F1]" />
                Live Sessions
              </span>
              <span className="text-[10px] text-slate-600">4 active</span>
            </div>
            <motion.div variants={list} initial="hidden" animate="show" className="space-y-1.5">
              {sessions.map((s) => (
                <motion.div
                  key={s.user}
                  variants={item}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#13132A] border border-white/[0.04] hover:border-[#6366F1]/20 transition-colors"
                >
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusColors[s.status]}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-white font-medium truncate">{s.user}</span>
                      <span className="text-[10px] text-slate-600">→</span>
                      <span className="text-[11px] text-[#A78BFA] truncate">{s.target}</span>
                    </div>
                  </div>
                  <span className="text-[9px] bg-[#6366F1]/15 text-[#A78BFA] px-1.5 py-0.5 rounded font-mono flex-shrink-0">{s.proto}</span>
                  <span className="text-[10px] text-slate-500 font-mono flex-shrink-0">{s.time}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Activity feed ── */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Terminal className="w-3 h-3 text-[#6366F1]" />
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Event Log</span>
            </div>
            <div className="rounded-xl bg-[#030308] border border-[#6366F1]/10 p-3 font-mono space-y-1.5">
              {alerts.map((a, i) => (
                <motion.div
                  key={a.msg}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                  className="flex items-center gap-2"
                >
                  <a.icon className={`w-3 h-3 ${a.color} flex-shrink-0`} />
                  <span className="text-[10px] text-slate-400">{a.msg}</span>
                  <span className="ml-auto text-[9px] text-slate-600">just now</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── MFA status bar ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-emerald-500/[0.07] border border-emerald-500/20"
          >
            <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="text-xs text-emerald-300 font-semibold">All sessions MFA-verified · Zero standing privilege</span>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="ml-auto w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
