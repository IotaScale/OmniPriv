"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Activity, AlertTriangle, CheckCircle, Users } from "lucide-react";

const sessions = [
  { user: "admin@corp.com",   resource: "prod-db-01",    status: "active",  time: "Just now" },
  { user: "devops@corp.com",  resource: "k8s-cluster",   status: "active",  time: "2m ago" },
  { user: "svc-deploy",       resource: "ci-runner-03",  status: "ended",   time: "8m ago" },
  { user: "jane.doe@corp.com",resource: "vault-secrets", status: "active",  time: "12m ago" },
];

const metrics = [
  { icon: Users,         label: "Active Sessions", value: "24",    color: "text-[#6366F1]",  bg: "bg-[#6366F1]/10" },
  { icon: Shield,        label: "Threats Blocked", value: "138",   color: "text-emerald-400", bg: "bg-emerald-400/10" },
  { icon: Lock,          label: "Vaulted Creds",   value: "4,812", color: "text-sky-400",     bg: "bg-sky-400/10" },
  { icon: AlertTriangle, label: "Open Alerts",     value: "2",     color: "text-amber-400",   bg: "bg-amber-400/10" },
];

export default function HeroDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="relative rounded-2xl border border-white/[0.08] bg-[#0D0D1A]/80 backdrop-blur-sm overflow-hidden shadow-2xl"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#6366F1]" />
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            PAM Console
          </span>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"
          />
          All systems operational
        </span>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 gap-px bg-white/[0.04] border-b border-white/[0.06]">
        {metrics.map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className="bg-[#0D0D1A] px-4 py-3.5 flex items-center gap-3">
            <div className={`${bg} p-2 rounded-lg`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <div>
              <div className={`text-lg font-bold ${color}`}>{value}</div>
              <div className="text-[11px] text-slate-500">{label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Session list */}
      <div className="px-5 py-3.5">
        <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-3">
          Recent Sessions
        </div>
        <div className="space-y-2">
          {sessions.map((s, i) => (
            <motion.div
              key={s.user + s.resource}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center justify-between rounded-lg px-3 py-2 bg-white/[0.03] border border-white/[0.05]"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-6 h-6 rounded-full bg-[#6366F1]/20 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-[#A78BFA]">
                    {s.user[0].toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="text-xs text-slate-300 truncate max-w-[130px]">{s.user}</div>
                  <div className="text-[11px] text-slate-600 truncate max-w-[130px]">{s.resource}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-2">
                {s.status === "active" ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-slate-600 inline-block" />
                )}
                <span className="text-[11px] text-slate-600">{s.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-[11px] text-slate-600">Encrypted · Zero-trust enforced</span>
        <Lock className="w-3.5 h-3.5 text-slate-600" />
      </div>

      {/* Glow accent */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#6366F1]/10 blur-3xl" />
    </motion.div>
  );
}
