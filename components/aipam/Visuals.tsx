import { Ban, Check, Hourglass, KeyRound, Link2, RefreshCw, ShieldCheck } from "lucide-react";

/*
 * Small product-style illustrations for the /ai-pam capability bento.
 * Static markup; motion is CSS only (classes `aip-*` in globals.css) and
 * switches off under prefers-reduced-motion. Values are illustrative.
 */

const frame = "rounded-2xl border border-slate-900/[0.07] dark:border-white/[0.07] bg-slate-50 dark:bg-[#111214]";

export function JitVisual() {
    return (
        <div className={`${frame} p-4`} aria-hidden="true">
            <div className="flex items-center justify-between text-[0.75rem]">
                <span className="font-mono text-slate-700 dark:text-slate-300">j.rahman → prod-db-01</span>
                <span className="font-semibold text-[#00667A] dark:text-[#7FD9EA]">Approved</span>
            </div>
            <div className="mt-3 relative h-3 rounded-full bg-slate-900/[0.06] dark:bg-white/[0.06] overflow-hidden">
                <span className="absolute inset-y-0 left-0 rounded-full bg-[#00B8DB] aip-window" />
            </div>
            <div className="mt-2 flex justify-between gap-2 text-[0.6875rem] font-mono text-slate-500">
                <span>09:30 granted</span>
                <span className="hidden sm:inline">30 min window</span>
                <span>10:00 revoked</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[0.6875rem]">
                <span className="rounded-lg border border-rose-500/20 bg-rose-500/[0.05] px-2.5 py-1.5 text-rose-600 dark:text-rose-300">
                    Standing admin rights: none
                </span>
                <span className="rounded-lg border border-[#00B8DB]/25 bg-[#00B8DB]/[0.06] px-2.5 py-1.5 text-[#00667A] dark:text-[#7FD9EA]">
                    Least privilege: dba, read/write
                </span>
            </div>
        </div>
    );
}

export function VaultVisual() {
    const rows = [
        { k: "SSH key", v: "linux_prod_01" },
        { k: "API token", v: "billing-api" },
        { k: "Service account", v: "svc-backup" },
    ];
    return (
        <div className={`${frame} p-4 space-y-2`} aria-hidden="true">
            {rows.map((r, i) => (
                <div key={r.k} className="flex items-center gap-2.5 rounded-xl bg-white dark:bg-[#15171a] border border-slate-900/[0.06] dark:border-white/[0.06] px-3 py-2">
                    <KeyRound className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-[0.75rem] text-slate-700 dark:text-slate-300 whitespace-nowrap">{r.k}</span>
                    <span className="hidden sm:inline text-[0.6875rem] font-mono text-slate-400 truncate">{r.v}</span>
                    <span className="ml-auto inline-flex items-center gap-1 text-[0.6875rem] font-semibold text-emerald-600 dark:text-emerald-300">
                        <RefreshCw className="w-3 h-3 aip-spin" style={{ animationDelay: `${i * 0.4}s` }} />
                        Rotated
                    </span>
                </div>
            ))}
        </div>
    );
}

export function AgentVisual() {
    const tools = [
        { t: "crm.read", s: "ok" },
        { t: "docs.search", s: "ok" },
        { t: "billing.send", s: "hold" },
        { t: "db.drop_table", s: "block" },
    ] as const;
    return (
        <div className={`${frame} p-4`} aria-hidden="true">
            <div className="text-[0.6875rem] font-mono text-slate-500">ai-agent-07 · tool allowlist</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
                {tools.map((x) => (
                    <span
                        key={x.t}
                        className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[0.6875rem] font-mono ${
                            x.s === "ok"
                                ? "border-[#00B8DB]/30 bg-[#00B8DB]/[0.07] text-[#00667A] dark:text-[#7FD9EA]"
                                : x.s === "hold"
                                  ? "border-amber-400/35 bg-amber-400/[0.08] text-amber-700 dark:text-amber-300"
                                  : "border-rose-500/30 bg-rose-500/[0.06] text-rose-600 dark:text-rose-300 line-through decoration-rose-400/60"
                        }`}
                    >
                        {x.s === "ok" ? <Check className="w-3 h-3" /> : x.s === "hold" ? <Hourglass className="w-3 h-3" /> : <Ban className="w-3 h-3" />}
                        {x.t}
                    </span>
                ))}
            </div>
        </div>
    );
}

export function SessionVisual() {
    return (
        <div className="rounded-2xl border border-white/[0.06] bg-[#0b0c0e] p-4 font-mono text-[0.6875rem] leading-relaxed" aria-hidden="true">
            <div className="flex items-center justify-between text-slate-500">
                <span>ssh · linux_prod_01</span>
                <span className="inline-flex items-center gap-1 text-rose-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 aip-blink" />
                    REC
                </span>
            </div>
            <div className="mt-2 text-slate-300">
                <span className="text-[#7FD9EA]">$</span> systemctl status nginx
            </div>
            <div className="text-slate-300">
                <span className="text-[#7FD9EA]">$</span> tail -n 20 /var/log/auth.log
            </div>
            <div className="text-rose-300">
                <span className="text-[#7FD9EA]">$</span> rm -rf /etc/ssh <span className="text-rose-400">· blocked</span>
            </div>
            <div className="text-slate-300">
                <span className="text-[#7FD9EA]">$</span> <span className="aip-caret">▍</span>
            </div>
        </div>
    );
}

export function BehaviorVisual() {
    return (
        <div className={`${frame} p-4`} aria-hidden="true">
            <svg viewBox="0 0 240 70" className="w-full h-16">
                <line x1="0" y1="22" x2="240" y2="22" stroke="#f43f5e" strokeOpacity="0.55" strokeDasharray="4 4" />
                <path
                    className="aip-draw"
                    d="M0 52 L20 49 L40 54 L60 47 L80 51 L100 46 L120 50 L140 44 L156 8 L172 48 L190 45 L210 50 L240 46"
                    fill="none"
                    stroke="#00B8DB"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    pathLength={1}
                />
                <circle cx="156" cy="8" r="4" fill="#f43f5e" />
            </svg>
            <div className="mt-1 flex justify-between text-[0.6875rem]">
                <span className="text-slate-500">risk threshold</span>
                <span className="font-semibold text-rose-600 dark:text-rose-300">Abnormal command flagged</span>
            </div>
        </div>
    );
}

export function AuditVisual() {
    const blocks = ["Request", "Approval", "Session", "Report"];
    return (
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden" aria-hidden="true">
            {blocks.map((b, i) => (
                <div key={b} className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                    <div className={`${frame} flex-1 min-w-0 px-3 py-2.5`}>
                        <div className="text-[0.6875rem] font-mono text-slate-400">#{String(1042 + i)}</div>
                        <div className="text-[0.8125rem] font-semibold text-slate-800 dark:text-slate-200 truncate">{b}</div>
                    </div>
                    {i < blocks.length - 1 ? (
                        <Link2 className="w-4 h-4 shrink-0 text-slate-300 dark:text-slate-600" />
                    ) : (
                        <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-500" />
                    )}
                </div>
            ))}
        </div>
    );
}
