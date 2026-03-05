import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendingDown, Clock, ShieldCheck, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies — Real Results from Real Enterprises",
  description:
    "Explore how OmniPriv helps Fortune 500 companies, financial institutions, healthcare systems, and government agencies eliminate privileged access risk and achieve compliance.",
};

const industries = ["All Industries", "Financial Services", "Healthcare", "Manufacturing", "Technology", "Government", "Energy"];

const featured = {
  company: "Global Investment Bank",
  industry: "Financial Services",
  logo: "GIB",
  challenge:
    "A top-10 global investment bank managing over $2 trillion AUM faced mounting pressure from regulators after a privileged account misuse incident. With 12,000+ privileged accounts across 60 countries and no unified audit trail, the bank could not demonstrate control.",
  solution:
    "OmniPriv was deployed across 14 data centers in 6 regions over 8 weeks. The bank leveraged JIT access, MFA enforcement, session recording, and automated account rotation to lock down all privileged paths.",
  results: [
    { metric: "94%", label: "Reduction in privilege account attack surface" },
    { metric: "100%", label: "Regulatory audit coverage achieved" },
    { metric: "Zero", label: "Privilege-related incidents since deployment" },
    { metric: "60 days", label: "Time to full compliance posture" },
  ],
  quote: "OmniPriv didn't just solve our privileged access problem — it transformed how we think about trust across our entire infrastructure. The regulators were impressed. Our board was relieved.",
  attribution: "Chief Information Security Officer",
};

const cases = [
  {
    company: "Regional Health System",
    industry: "Healthcare",
    logo: "RHS",
    metric: "HIPAA compliant in 45 days",
    highlight: "Secured EHR & medical device access across 28 hospitals",
    desc: "A multi-state health system needed HIPAA-compliant privileged access across its Epic EHR, 15,000 medical devices, and distributed IT staff. OmniPriv delivered full session recording and JIT access in 45 days.",
  },
  {
    company: "European Automaker",
    industry: "Manufacturing",
    logo: "EA",
    metric: "Zero factory downtime incidents",
    highlight: "OT/ICS privileged access secured across 8 plants",
    desc: "A European automotive manufacturer protecting its connected factory environment deployed OmniPriv to secure privileged access to PLCs, SCADA systems, and industrial IoT — without impacting production uptime.",
  },
  {
    company: "SaaS Unicorn",
    industry: "Technology",
    logo: "SU",
    metric: "3-hour deployment per cloud account",
    highlight: "AWS/GCP/Azure secrets management unified in one platform",
    desc: "A Series D SaaS company with 200+ AWS accounts needed to unify cloud secrets management before their SOC 2 audit. OmniPriv replaced five separate tools and achieved full vault coverage in three weeks.",
  },
  {
    company: "Federal Defense Agency",
    industry: "Government",
    logo: "FDA",
    metric: "FedRAMP-ready in 4 months",
    highlight: "Air-gapped deployment for classified environments",
    desc: "A federal agency with air-gapped networks deployed OmniPriv in a classified environment to meet NIST 800-53 and FISMA requirements. Zero-trust privileged access replaced legacy bastion hosts.",
  },
  {
    company: "Global Energy Conglomerate",
    industry: "Energy",
    logo: "GEC",
    metric: "12,000 privileged accounts automated",
    highlight: "Unified PAM across subsea, onshore, and cloud systems",
    desc: "A major energy company coordinating operations across North Sea platforms, onshore refineries, and cloud infrastructure unified privileged access management across 12,000 accounts and 5 operating companies.",
  },
  {
    company: "Insurance Carrier",
    industry: "Financial Services",
    logo: "IC",
    metric: "60% reduction in audit preparation time",
    highlight: "Automated SOC 2 and PCI-DSS proof-of-compliance",
    desc: "A Fortune 500 insurance carrier replaced manual privilege reviews with OmniPriv's automated control evidence collection — cutting SOC 2 and PCI-DSS audit prep from 6 weeks to 2.5 weeks.",
  },
  {
    company: "Academic Medical Center",
    industry: "Healthcare",
    logo: "AMC",
    metric: "Zero shared credentials in production",
    highlight: "Eliminated privileged shared accounts across 4 data centers",
    desc: "A tier-1 academic medical center eliminated all shared privileged credentials across its four data centers, replacing them with individual managed accounts with full session accountability under OmniPriv.",
  },
  {
    company: "Tier-1 Telco",
    industry: "Technology",
    logo: "T1T",
    metric: "250,000 sessions recorded per day",
    highlight: "Carrier-grade session recording with AI anomaly detection",
    desc: "A 100-million subscriber telco processing 250,000 privileged sessions per day deployed OmniPriv's AI anomaly detection to flag insider threats — catching 3 incidents in the first quarter.",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 border-b border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030711]" />
        <div className="container-xl relative z-10 text-center max-w-3xl mx-auto">
          <div className="badge-cyan mb-6">Customer Success</div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
            Real Results from <span className="text-gradient">Real Enterprises</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            See how the world's most security-conscious organizations use OmniPriv to eliminate privileged access risk, meet compliance requirements, and protect their most critical systems.
          </p>
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="section-padding-lg">
        <div className="container-xl">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-medium mb-6">Featured Case Study</p>
          <div className="rounded-3xl border border-[#00B8FF]/15 bg-gradient-to-br from-[#0A1628] to-[#030711] overflow-hidden">
            <div className="p-10 md:p-14">
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#00B8FF]/10 flex items-center justify-center text-sm font-bold text-[#00B8FF]" style={{ fontFamily: "var(--font-syne)" }}>
                  {featured.logo}
                </div>
                <div>
                  <div className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>{featured.company}</div>
                  <div className="text-xs text-[#00B8FF] font-semibold">{featured.industry}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mb-10">
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">The Challenge</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{featured.challenge}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">The Solution</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{featured.solution}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
                {featured.results.map((r) => (
                  <div key={r.label} className="p-5 rounded-2xl border border-white/[0.06] bg-black/20 text-center">
                    <div className="text-2xl font-extrabold text-[#00B8FF] mb-1" style={{ fontFamily: "var(--font-syne)" }}>{r.metric}</div>
                    <div className="text-xs text-slate-400 leading-snug">{r.label}</div>
                  </div>
                ))}
              </div>

              <blockquote className="border-l-2 border-[#00B8FF] pl-5">
                <p className="text-slate-300 text-base italic leading-relaxed mb-2">&ldquo;{featured.quote}&rdquo;</p>
                <cite className="text-xs text-slate-500 not-italic">&mdash; {featured.attribution}, {featured.company}</cite>
              </blockquote>

              <div className="mt-8">
                <Link href="/demo" className="btn-primary">
                  Get Similar Results <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick outcomes strip */}
      <section className="py-10 border-y border-white/[0.04] bg-[#0A1628]/30">
        <div className="container-xl">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <TrendingDown className="w-8 h-8 text-[#00B8FF]" />
              <div className="text-2xl font-extrabold text-white" style={{ fontFamily: "var(--font-syne)" }}>94%</div>
              <div className="text-sm text-slate-400">Average reduction in privilege attack surface</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock className="w-8 h-8 text-[#00B8FF]" />
              <div className="text-2xl font-extrabold text-white" style={{ fontFamily: "var(--font-syne)" }}>8 weeks</div>
              <div className="text-sm text-slate-400">Average time to full enterprise deployment</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="w-8 h-8 text-[#00B8FF]" />
              <div className="text-2xl font-extrabold text-white" style={{ fontFamily: "var(--font-syne)" }}>100%</div>
              <div className="text-sm text-slate-400">Customers pass their next compliance audit</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar (display only — non-interactive without client component) */}
      <section className="section-padding-lg">
        <div className="container-xl">
          <div className="flex flex-wrap gap-2 mb-10">
            {industries.map((ind, i) => (
              <button key={ind} className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${i === 0 ? "bg-[#00B8FF]/10 border-[#00B8FF]/30 text-[#00B8FF]" : "border-white/[0.08] text-slate-400 hover:border-[#00B8FF]/20 hover:text-slate-300"}`}>
                {ind}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cases.map((c) => (
              <div key={c.company} className="group p-6 rounded-2xl border border-white/[0.06] bg-[#0A1628]/60 hover:border-[#00B8FF]/20 transition-all card-shine flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#00B8FF]/10 flex items-center justify-center text-xs font-bold text-[#00B8FF] flex-shrink-0" style={{ fontFamily: "var(--font-syne)" }}>
                    {c.logo}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white leading-tight" style={{ fontFamily: "var(--font-syne)" }}>{c.company}</div>
                    <div className="text-[10px] text-slate-500">{c.industry}</div>
                  </div>
                </div>

                <div className="text-sm font-semibold text-[#00B8FF] mb-2">{c.metric}</div>
                <div className="text-xs font-medium text-slate-300 mb-3">{c.highlight}</div>
                <p className="text-xs text-slate-500 leading-relaxed flex-1 mb-4">{c.desc}</p>

                <div className="flex items-center gap-1 text-xs text-slate-500 group-hover:text-[#00B8FF] transition-colors border-t border-white/[0.04] pt-4">
                  Read Case Study <ChevronRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding border-t border-white/[0.04]">
        <div className="container-xl text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
            Ready to Write Your <span className="text-gradient">Own Success Story?</span>
          </h2>
          <p className="text-slate-400 mb-8">
            Join 100+ enterprises that have transformed their privileged access management with OmniPriv.
          </p>
          <Link href="/demo" className="btn-primary">
            Request a Demo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
