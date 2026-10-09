import type { Metadata } from "next";
import type { ComponentType } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { solutions, getSolutionBySlug } from "../data";
import MediaSplit from "@/components/sections/MediaSplit";
import AiThreatProtectionPage from "@/components/solutions/AiThreatProtectionPage";
import ApplicationSecurityPage from "@/components/solutions/ApplicationSecurityPage";
import AuditCompliancePage from "@/components/solutions/AuditCompliancePage";
import EnterpriseIntegrationPage from "@/components/solutions/EnterpriseIntegrationPage";
import InfrastructureDeploymentPage from "@/components/solutions/InfrastructureDeploymentPage";
import PasswordCredentialManagementPage from "@/components/solutions/PasswordCredentialManagementPage";
import SecureAiAgentsPage from "@/components/solutions/SecureAiAgentsPage";
import SecureRemoteAccessPage from "@/components/solutions/SecureRemoteAccessPage";
import WorkflowAccessControlPage from "@/components/solutions/WorkflowAccessControlPage";

/*
 * Capabilities that need more than the generic layout below.
 *
 * All nine modules in ../data.ts are currently bespoke. The route stays
 * dynamic and only the body is swapped, so a bespoke page cannot collide
 * with the [slug] segment the way a sibling static route would.
 *
 * The generic branch after this map is deliberately dormant rather than
 * deleted: it is the default a module falls back to between being added to
 * data.ts and getting its own page.
 */
const bespokePages: Record<string, ComponentType> = {
    "ai-threat-protection": AiThreatProtectionPage,
    "application-security": ApplicationSecurityPage,
    "audit-compliance": AuditCompliancePage,
    "enterprise-integration": EnterpriseIntegrationPage,
    "infrastructure-deployment": InfrastructureDeploymentPage,
    "password-credential-management": PasswordCredentialManagementPage,
    "secure-ai-agents-omnipriv": SecureAiAgentsPage,
    "secure-remote-access": SecureRemoteAccessPage,
    "workflow-access-control": WorkflowAccessControlPage,
};

/* ── Static params for all 9 slugs ─────────────────────────── */
export function generateStaticParams() {
    // Modules with their own top-level URL (see `path` in data.ts) are
    // served there; next.config.js redirects the old /platform address.
    return solutions.filter((s) => !s.path).map((s) => ({ slug: s.slug }));
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
        // metaTitle already carries the brand, so it must bypass the
        // "%s | OmniPriv" template in app/layout.tsx or the suffix doubles up.
        title: { absolute: solution.metaTitle },
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

    const Bespoke = bespokePages[slug];
    if (Bespoke) return <Bespoke />;

    const Icon = solution.icon;

    return (
        <>
            {/* Hero */}
            <section className="relative pt-16 pb-20 border-b border-slate-900/[0.05] dark:border-white/[0.04] overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-[#0B0C0E]" />
                <div className="container-xl relative z-10">
                    {/* Breadcrumb */}
                    <Link
                        href="/platform"
                        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#00B8DB] transition-colors mb-8"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        All Capabilities
                    </Link>

                    <h1 className="op-h1 mb-8">
                        {solution.title}
                    </h1>
                    <MediaSplit
                        media={{
                            src: "/product/dashboard.png",
                            alt: `OmniPriv dashboard for ${solution.title}`,
                            fit: "contain",
                        }}
                        ratio="wide-last"
                        height="md"
                    >
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="icon-wrapper w-14 h-14 rounded-xl">
                                    <Icon className="w-7 h-7" />
                                </div>
                                <div className="badge-cyan">{solution.title}</div>
                            </div>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                {solution.description}
                            </p>
                        </div>
                    </MediaSplit>
                </div>
            </section>

            {/* Features Grid */}
            <section className="section-padding border-b border-slate-900/[0.05] dark:border-white/[0.04]">
                <div className="container-xl">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <div className="badge-cyan mb-5">Capabilities</div>
                        <h2
                            className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white mb-4"
                            style={{ fontFamily: "var(--font-syne)" }}
                        >
                            Key <span className="text-gradient">Features</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">{solution.tagline}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {solution.features.map((feature) => (
                            <div
                                key={feature.name}
                                className="p-6 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.06] bg-slate-100/60 dark:bg-[#0B0C0E]/60 hover:border-[#00B8DB]/20 transition-all duration-300 group card-shine"
                            >
                                <div className="icon-wrapper w-10 h-10 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-5 h-5" />
                                </div>
                                <h3
                                    className="text-base font-bold text-slate-950 dark:text-white mb-2"
                                    style={{ fontFamily: "var(--font-syne)" }}
                                >
                                    {feature.name}
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding border-b border-slate-900/[0.05] dark:border-white/[0.04]">
                <div className="container-xl">
                    <div className="relative rounded-3xl overflow-hidden border border-[#00B8DB]/15 p-10 md:p-16 text-center">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 dark:from-[#0B0C0E] to-white dark:to-[#0B0C0E]" />
                        <div className="absolute inset-0 bg-grid opacity-20" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[37.5rem] h-px bg-gradient-to-r from-transparent via-[#00B8DB]/40 to-transparent" />
                        <div className="relative z-10">
                            <h2
                                className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white mb-4"
                                style={{ fontFamily: "var(--font-syne)" }}
                            >
                                See {solution.title} in Action
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                                Get a personalized walkthrough of how OmniPriv&apos;s {solution.title.toLowerCase()}{" "}
                                capabilities can be deployed in your environment.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link href="/demo" className="btn-primary text-base px-8 py-3.5">
                                    Request a Demo <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link href="/platform" className="btn-secondary text-base px-8 py-3.5">
                                    Explore All Capabilities
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
