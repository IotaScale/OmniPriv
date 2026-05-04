"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Activity, AlertTriangle, CheckCircle, Users, TrendingUp, Eye } from "lucide-react";

const sessions = [
  { user: "admin@corp.com",    resource: "prod-db-01",    status: "active", time: "Just now", protocol: "SSH" },
  { user: "devops@corp.com",   resource: "k8s-cluster",   status: "active", time: "2m ago",   protocol: "K8s" },
  { user: "svc-deploy",        resource: "ci-runner-03",  status: "ended",  time: "8m ago",   protocol: "RDP" },
  { user: "jane.doe@corp.com", resource: "vault-secrets", status: "active", time: "12m ago",  protocol: "API" },
];

const chartBars = [32, 55, 40, 72, 60, 88, 65, 90, 75, 95, 70, 85];

const metrics = [
  { icon: Users,         label: "Active Sessions", value: "24",    color: "text-[#818cf8]", border: "border-[#6366F1]/30", bg: "bg-[#6366F1]/[0.12]" },
  { icon: Shield,        label: "Threats Blocked", value: "138",   color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/[0.1]" },
  { icon: Lock,          label: "Vaulted Creds",   value: "4,812", color: "text-sky-400",    border: "border-sky-500/30", bg: "bg-sky-500/[0.1]" },
  { icon: AlertTriangle, label: "Open Alerts",     value: "2",     color: "text-amber-400",  border: "border-amber-500/30", bg: "bg-amber-500/[0.1]" },
];

const protocolColors: Record<string, string> = {
  SSH: "bg-cyan-500/20 text-cyan-300",
  K8s: "bg-blue-500/20 text-blue-300",
  RDP: "bg-purple-500/20 text-purple-300",
  API: "bg-emerald-500/20 text-emerald-300",
};

export default function HeroDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.35 }}
      className="relative"
    >
      {/* Outer glow */}
      <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#6366F1]/20 via-transparent to-[#00B8FF]/10 blur-2xl" />

      {/* Browser chrome */}
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] shadow-[0_32px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)]"
        style={{ background: "linear-gradient(160deg, #0c0e1e 0%, #090b18 100%)" }}>

        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06]"
          style={{ background: "rgba(255,255,255,0.03)" }}>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.05] border border-white/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] text-slate-400 font-mono">omnipriv.console · secure</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-[#6366F1]" />
            <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">PAM Console</span>
          </div>
        </div>

        {/* Metric cards row */}
        <div className="grid grid-cols-4 gap-px bg-white/[0.04] border-b border-white/[0.06]">
          {metrics.map(({ icon: Icon, label, value, color, border, bg }) => (
            <div key={label} className="px-3 py-3 flex flex-col gap-1.5" style={{ background: "#090b18" }}>
              <div className={`w-7 h-7 rounded-lg ${bg} border ${border} flex items-center justify-center`}>
                <Icon className={`w-3.5 h-3.5 ${color}`} />
              </div>
              <div className={`text-base font-extrabold ${color} leading-none`}>{value}</div>
              <div className="text-[10px] text-slate-600 leading-tight">{label}</div>
            </div>
          ))}
        </div>

        {/* Activity chart */}
        <div className="px-4 pt-3.5 pb-2 border-b border-white/[0.05]">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-[#6366F1]" />
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Session Activity (24h)</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-medium">↑ 12% vs yesterday</span>
          </div>
          <div className="flex items-end gap-1 h-14">
            {chartBars.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  background: i >= 9
                    ? "linear-gradient(180deg, #818cf8 0%, #6366F1 100%)"
                    : "rgba(99,102,241,0.22)",
                }}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.04, ease: "easeOut" }}
              />
            ))}
          </div>
        </div>

        {/* Session list */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Live Sessions</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#6366F1]/20 text-[#818cf8] font-semibold">3 active</span>
          </div>
          <div className="space-y-1.5">
            {sessions.map((s, i) => (
              <motion.div
                key={s.user + s.resource}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 border"
                style={{
                  background: s.status === "active" ? "rgba(99,102,241,0.04)" : "rgba(255,255,255,0.02)",
                  borderColor: s.status === "active" ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.04)",
                }}
              >
                {/* Avatar */}
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6366F1]/40 to-[#818cf8]/20 flex items-center justify-center shrink-0 border border-[#6366F1]/25">
                  <span className="text-[9px] font-bold text-[#a5b4fc]">{s.user[0].toUpperCase()}</span>
                </div>
                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] text-slate-300 truncate font-medium">{s.user}</div>
                  <div className="text-[10px] text-slate-600 truncate">{s.resource}</div>
                </div>
                {/* Protocol badge */}
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${protocolColors[s.protocol]}`}>{s.protocol}</span>
                {/* Status */}
                {s.status === "active"
                  ? <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  : <span className="w-1.5 h-1.5 rounded-full bg-slate-600 shrink-0" />
                }
                <span className="text-[10px] text-slate-600 whitespace-nowrap">{s.time}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer status bar */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-white/[0.05]"
          style={{ background: "rgba(99,102,241,0.04)" }}>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
              <CheckCircle className="w-3 h-3" /> Zero-trust enforced
            </span>
            <span className="text-[10px] text-slate-600">·</span>
            <span className="flex items-center gap-1 text-[10px] text-sky-400 font-medium">
              <Lock className="w-3 h-3" /> AES-256 encrypted
            </span>
          </div>
          <span className="text-[10px] text-slate-600 font-mono">v4.2.1</span>
        </div>
      </div>
    </motion.div>
  );
}
