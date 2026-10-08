import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  Check,
  Clock,
  FileSearch,
  Fingerprint,
  Key,
  ShieldCheck,
  UserCheck,
  X,
} from "lucide-react";
import BentoCard from "@/components/ui/BentoCard";
import BentoGlowGrid from "@/components/ui/BentoGlowGrid";
import RevealScope from "@/components/home/RevealScope";

/*
 * The eight AI-first capabilities as a bento: two large tiles carry a small
 * live visual (agent tool-call policy, ML anomaly line), the rest stay quiet.
 * Exactly eight cells on a 4 × 3 grid, no blanks.
 */

const SMALL = [
  {
    icon: Fingerprint,
    title: "Behavioural analytics",
    body: "Keystroke dynamics and per-agent baselines flag impossible travel, off-hours access and drift from learned behaviour.",
  },
  {
    icon: UserCheck,
    title: "Human-in-the-loop approvals",
    body: "Drop table, delete cluster, transfer funds: high-risk actions pause for an explicit human decision.",
  },
  {
    icon: ShieldCheck,
    title: "Prompt-injection guard",
    body: "Even when an LLM is manipulated, every tool call is re-verified against deterministic policy before it runs.",
  },
  {
    icon: FileSearch,
    title: "Agent session audit trail",
    body: "A forensic trace from human to agent to MCP server to tool to resource, with the decision recorded.",
  },
  {
    icon: Clock,
    title: "Just-in-Time access",
    body: "Ephemeral, time-boxed privileges for people and agents. Access expires on its own; nothing standing to steal.",
  },
  {
    icon: Key,
    title: "Dynamic secret vault",
    body: "Credentials discovered, vaulted, rotated on schedule and checked out as short-lived tokens per session.",
  },
];

const card =
  "h-full p-6 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.07] bg-white dark:bg-[#0a101c] hover:border-[#00B8DB]/35 transition-colors duration-300";

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[17px] font-semibold text-slate-950 dark:text-white" style={{ fontFamily: "var(--font-syne)" }}>
      {children}
    </h3>
  );
}

export default function CapabilityBento() {
  return (
    <section className="relative border-b border-slate-900/[0.05] dark:border-white/[0.05] bg-slate-50 dark:bg-[#04070e]">
      <div className="container-xl py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6" data-aos="fade-up">
          <div className="max-w-2xl">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-[1.08] text-slate-950 dark:text-white"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Built for the AI era of privileged access
            </h2>
            <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Everything a modern PAM platform needs, in one interface, with no bolt-on tools.
            </p>
          </div>
          <Link href="/features" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#00869f] dark:text-[#00B8DB] shrink-0">
            See all 32 features
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        <BentoGlowGrid className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4" >
          {/* AI agent governance: 2 × 2 */}
          <div className="sm:col-span-2 lg:row-span-2" data-aos="fade-up">
            <BentoCard particleCount={0} className={`${card} flex flex-col`}>
              <div className="relative">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#00B8DB]/10 text-[#00B8DB]">
                  <Bot className="w-5 h-5" aria-hidden="true" />
                </span>
                <div className="mt-5">
                  <Title>AI agent governance</Title>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                    Every MCP agent gets its own verifiable identity, tool allowlist and data scope. It can act, never with
                    unrestricted authority.
                  </p>
                </div>
              </div>

              {/* live policy check */}
              <RevealScope className="relative mt-8 flex-1 rounded-xl border border-slate-900/[0.08] dark:border-white/[0.07] bg-slate-50 dark:bg-[#05080f] p-4 font-mono text-[12.5px]">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 pb-3 border-b border-slate-900/[0.06] dark:border-white/[0.06]">
                  <Bot className="w-3.5 h-3.5 text-[#00B8DB]" aria-hidden="true" />
                  ai-agent-07
                  <span className="ml-auto text-[11px]">policy: finance-readonly</span>
                </div>
                {[
                  { call: "crm.read_customers", verdict: "allow", note: "in scope" },
                  { call: "billing.send_invoice", verdict: "hold", note: "needs approval" },
                  { call: "db.drop_table", verdict: "deny", note: "blocked" },
                ].map((r, i) => (
                  <div
                    key={r.call}
                    className="reveal-item flex items-center gap-3 py-3 border-b last:border-b-0 border-slate-900/[0.06] dark:border-white/[0.05]"
                    style={{ transitionDelay: `${200 + i * 220}ms` }}
                  >
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 rounded-md ${
                        r.verdict === "allow"
                          ? "bg-emerald-500/15 text-emerald-500"
                          : r.verdict === "hold"
                          ? "bg-amber-500/15 text-amber-500"
                          : "bg-rose-500/15 text-rose-500"
                      }`}
                    >
                      {r.verdict === "allow" ? <Check className="w-3 h-3" /> : r.verdict === "hold" ? <Clock className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    </span>
                    <span className="text-slate-800 dark:text-slate-200">{r.call}</span>
                    <span className="ml-auto text-[11px] text-slate-500">{r.note}</span>
                  </div>
                ))}
              </RevealScope>
            </BentoCard>
          </div>

          {/* ML anomaly detection: 2 × 1 */}
          <div className="sm:col-span-2" data-aos="fade-up" data-aos-delay="80">
            <BentoCard particleCount={0} className={`${card} grid sm:grid-cols-[1fr_1.1fr] gap-6 items-center`}>
              <div>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#00B8DB]/10 text-[#00B8DB]">
                  <AlertTriangle className="w-5 h-5" aria-hidden="true" />
                </span>
                <div className="mt-5">
                  <Title>ML anomaly detection</Title>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Behavioural scoring on every privileged login and session catches lateral movement, credential
                    harvesting and brute force as it happens.
                  </p>
                </div>
              </div>
              <RevealScope>
                <svg viewBox="0 0 220 110" className="reveal-item w-full h-auto" aria-hidden="true">
                  <line x1="0" y1="70" x2="220" y2="70" stroke="currentColor" className="text-slate-900/10 dark:text-white/10" strokeDasharray="3 4" />
                  <polyline
                    className="bento-line"
                    fill="none"
                    stroke="#00B8DB"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    points="0,82 18,78 34,84 52,76 70,80 88,74 106,79 122,72 136,20 150,76 168,73 186,79 204,75 220,78"
                  />
                  <circle cx="136" cy="20" r="5" fill="#f43f5e" className="bento-spike" />
                  <circle cx="136" cy="20" r="10" fill="none" stroke="#f43f5e" strokeOpacity="0.5" className="bento-spike-ring" />
                  <text x="130" y="16" fontSize="10" fill="#f43f5e" fontFamily="monospace" textAnchor="end">auto-blocked</text>
                </svg>
              </RevealScope>
            </BentoCard>
          </div>

          {SMALL.map((f, i) => (
            <div key={f.title} data-aos="fade-up" data-aos-delay={((i % 4) * 70).toString()}>
              <BentoCard particleCount={0} className={card}>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#00B8DB]/10 text-[#00B8DB]">
                  <f.icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <div className="mt-5">
                  <Title>{f.title}</Title>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.body}</p>
                </div>
              </BentoCard>
            </div>
          ))}
        </BentoGlowGrid>
      </div>
    </section>
  );
}
