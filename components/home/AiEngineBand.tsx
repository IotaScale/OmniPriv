import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CountUp from "@/components/home/CountUp";
import RevealScope from "@/components/home/RevealScope";

/*
 * AI-PAM engine teaser: a panel on the shared homepage surface (op-panel),
 * so it reads in the same language as every other section.
 * Figures are the ones the old AiPamTeaser carried (from /ai-pam).
 */

const STATS = [
  { to: 39, suffix: "", label: "ML features scored on every session" },
  { to: 12, suffix: "", label: "Security pillars for every AI agent" },
  { to: 100, suffix: "+", label: "MCP tools under governance" },
  { to: 10, suffix: "s", label: "Auto-block sweep interval" },
];

export default function AiEngineBand() {
  return (
    <section className="relative">
      <div className="container-xl py-12 lg:py-16">
        <div className="ai-band op-panel relative overflow-hidden rounded-[2rem] text-slate-950 dark:text-white px-6 py-16 sm:px-12 lg:px-16 lg:py-20">
          <div
            className="ai-band-grid pointer-events-none absolute inset-0"
            aria-hidden="true"
          />
          <div
            className="ai-band-glow pointer-events-none absolute inset-0"
            aria-hidden="true"
          />

          <div className="relative">
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 lg:gap-20 items-center">
              <div data-aos="fade-up">
                <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#00667a] dark:text-[#00B8DB] font-mono">
                  <span
                    className="block w-8 h-px bg-[#00B8DB]"
                    aria-hidden="true"
                  />
                  AI-PAM Engine
                </p>
                <h2
                  className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-[1.08]"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  An ML engine that watches every privileged move
                </h2>
                <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                  Real-time behavioural anomaly detection and MCP agent scoping
                  keep AI agents and human administrators inside least-privilege
                  boundaries, re-verified against deterministic policy before
                  anything runs.
                </p>
                <Link href="/ai-pam" className="hp-btn-primary group mt-9">
                  Explore the AI engine
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>

              <RevealScope className="grid grid-cols-2 border-t border-l border-slate-900/[0.08] dark:border-white/[0.08]">
                {STATS.map((s, i) => (
                  <div
                    key={s.label}
                    className="reveal-item border-r border-b border-slate-900/[0.08] dark:border-white/[0.08] p-6 sm:p-8"
                    style={{ transitionDelay: `${i * 90}ms` }}
                  >
                    <div
                      className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-slate-950 dark:text-white"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      <CountUp to={s.to} suffix={s.suffix} />
                    </div>
                    <div className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-snug">
                      {s.label}
                    </div>
                  </div>
                ))}
              </RevealScope>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
