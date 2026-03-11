import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { solutions, getSolutionBySlug } from "../data";

/* ── Static params for all 8 slugs ─────────────────────────── */
export function generateStaticParams() {
    return solutions.map((s) => ({ slug: s.slug }));
}

/* ── Dynamic metadata per page ─────────────────────────────── */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const solution = getSolutionBySlug(slug);
    if (!solution) return {};
    return {
        title: solution.metaTitle,
        description: solution.metaDescription,
    };
}

/* ── Page component ────────────────────────────────────────── */
export default async function SolutionPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const solution = getSolutionBySlug(slug);
    if (!solution) notFound();

    const Icon = solution.icon;

    return (
        <>
            {/* Hero */}
            <section className="relative pt-32 pb-20 border-b border-white/[0.04] overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030711]" />
                <div className="container-xl relative z-10">
                    {/* Breadcrumb */}
                    <Link
                        href="/solutions"
                        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#00B8FF] transition-colors mb-8"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        All Solutions
                    </Link>

                    <div className="max-w-3xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="icon-wrapper w-14 h-14 rounded-xl">
                                <Icon className="w-7 h-7" />
                            </div>
                            <div className="badge-cyan">{solution.title}</div>
                        </div>
                        <h1
                            className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight"
                            style={{ fontFamily: "var(--font-syne)" }}
                        >
                            {solution.title}
                        </h1>
                        <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
                            {solution.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="section-padding-lg">
                <div className="container-xl">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <div className="badge-cyan mb-5">Capabilities</div>
                        <h2
                            className="text-3xl md:text-4xl font-extrabold text-white mb-4"
                            style={{ fontFamily: "var(--font-syne)" }}
                        >
                            Key <span className="text-gradient">Features</span>
                        </h2>
                        <p className="text-slate-400 text-lg">{solution.tagline}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {solution.features.map((feature) => (
                            <div
                                key={feature.name}
                                className="p-6 rounded-2xl border border-white/[0.06] bg-[#0A1628]/60 hover:border-[#00B8FF]/20 transition-all duration-300 group card-shine"
                            >
                                <div className="icon-wrapper w-10 h-10 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-4.5 h-4.5" />
                                </div>
                                <h3
                                    className="text-base font-bold text-white mb-2"
                                    style={{ fontFamily: "var(--font-syne)" }}
                                >
                                    {feature.name}
                                </h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding">
                <div className="container-xl">
                    <div className="relative rounded-3xl overflow-hidden border border-[#00B8FF]/15 p-10 md:p-16 text-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] to-[#030711]" />
                        <div className="absolute inset-0 bg-grid opacity-20" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#00B8FF]/40 to-transparent" />
                        <div className="relative z-10">
                            <h2
                                className="text-3xl md:text-4xl font-extrabold text-white mb-4"
                                style={{ fontFamily: "var(--font-syne)" }}
                            >
                                See {solution.title} in Action
                            </h2>
                            <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                                Get a personalized walkthrough of how OmniPriv&apos;s {solution.title.toLowerCase()}{" "}
                                capabilities can be deployed in your environment.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href="/demo" className="btn-primary text-base px-8 py-3.5">
                                    Request a Demo <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link href="/solutions" className="btn-secondary text-base px-8 py-3.5">
                                    Explore All Solutions
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
