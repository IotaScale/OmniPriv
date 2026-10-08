import Link from "next/link";
import { ArrowRight, Cpu } from "lucide-react";

/* Slim homepage teaser for the AI-PAM engine.
   The full deep dive lives on /ai-pam. */
const stats = [
    { value: "39", label: "ML features scored per session" },
    { value: "12", label: "Agent security pillars" },
    { value: "100+", label: "MCP tools governed" },
    { value: "10s", label: "Auto-block sweeper" },
];

export default function AiPamTeaser() {
    return (
        <section className="section-padding relative overflow-hidden border-b border-slate-900/[0.05] dark:border-white/[0.04] bg-slate-50 dark:bg-[#050a14]">
            <div
                className="absolute -top-32 right-1/4 w-[620px] h-[380px] pointer-events-none opacity-60"
                style={{
                    background: "radial-gradient(ellipse, rgba(0, 184, 219,0.09) 0%, transparent 65%)",
                }}
            />

            <div className="container-xl relative z-10">
                <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16 items-center">
                    {/* Copy */}
                    <div data-aos="fade-right">
                        <div className="badge-cyan mb-5 inline-flex items-center gap-1.5">
                            <Cpu className="w-3.5 h-3.5" />
                            AI-PAM Engine
                        </div>

                        <h2
                            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white mb-5 tracking-tight"
                            style={{ fontFamily: "var(--font-syne)" }}
                        >
                            Autonomous ML Engine &amp;{" "}
                            <span className="text-gradient">Multi-Agent AI Security</span>
                        </h2>

                        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
                            From real-time behavioural anomaly detection to Model Context Protocol
                            (MCP) agent scoping, OmniPriv keeps autonomous AI agents and human
                            administrators inside least-privilege boundaries that are re-verified
                            against deterministic policy before anything runs.
                        </p>

                        <Link href="/ai-pam" className="btn-primary text-base px-7 py-3.5">
                            Explore the AI Engine
                            <ArrowRight className="w-5 h-5 ml-1.5" />
                        </Link>
                    </div>

                    {/* Stat grid */}
                    <div className="grid grid-cols-2 gap-4" data-aos="fade-left">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="p-5 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.07] bg-white dark:bg-[#0A1628]/40 hover:border-[#00B8DB]/35 hover:shadow-[0_0_14px_rgba(0, 184, 219,0.04)] transition-all duration-300"
                            >
                                <div
                                    className="text-3xl lg:text-4xl font-extrabold text-[#00B8DB] mb-1.5"
                                    style={{ fontFamily: "var(--font-syne)" }}
                                >
                                    {stat.value}
                                </div>
                                <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 leading-snug">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
