import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cpu } from "lucide-react";
import AiPamEngineSection from "@/components/ui/AiPamEngineSection";

export const metadata: Metadata = {
    title: "AI-PAM Engine: ML Threat Detection & MCP Agent Governance",
    description:
        "OmniPriv's AI-PAM engine pairs IsolationForest behavioral anomaly detection with Model Context Protocol agent governance — 12 agent security pillars, 100+ MCP tools, and a 10-second auto-block sweeper.",
};

export default function AiPamPage() {
    return (
        <>
            {/* Hero — fades into the dark engine section below */}
            <section className="relative pt-16 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050b16]" />

                <div className="container-xl relative z-10 text-center">
                    <div className="badge-cyan mb-6 inline-flex mx-auto items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5" />
                        AI-PAM Engine
                    </div>

                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 dark:text-white mb-6 max-w-4xl mx-auto tracking-tight"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        AI-PAM: <span className="text-gradient">Autonomous ML &amp; Multi-Agent Security</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                        IsolationForest anomaly detection and Model Context Protocol agent governance —
                        the engine that keeps every privileged action, human or autonomous, inside
                        mathematically verified boundaries.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/demo" className="btn-primary text-base px-8 py-3.5">
                            Request a Technical Demo
                            <ArrowRight className="w-5 h-5 ml-1.5" />
                        </Link>
                        <Link href="/platform" className="btn-secondary text-base px-8 py-3.5">
                            Explore the Platform
                        </Link>
                    </div>
                </div>
            </section>

            {/* The full AI-PAM deep dive */}
            <AiPamEngineSection />

            {/* Dark continuation CTA */}
            <section className="relative bg-[#050b16] border-b border-white/[0.06] py-16">
                <div className="container-xl text-center">
                    <h2
                        className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        See the engine on your own infrastructure
                    </h2>
                    <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                        We will walk through live anomaly scoring, MCP agent scoping and the
                        10-second auto-block sweeper against your environment.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/demo" className="btn-primary text-base px-8 py-3.5">
                            Book a Demo
                            <ArrowRight className="w-5 h-5 ml-1.5" />
                        </Link>
                        <Link
                            href="/features"
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-white/15 text-white text-base font-semibold hover:bg-white/[0.06] transition-colors"
                        >
                            View All Features
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
