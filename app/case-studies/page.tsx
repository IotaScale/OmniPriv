import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendingDown, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "Omnipriv Case Studies | Proven PAM Solutions in Action",
  },
  description:
    "Discover real-world success stories. Learn how Omnipriv delivers scalable PAM solutions to solve complex cybersecurity challenges for leading businesses.",
};

const industries = ["All Industries", "Financial Services", "Healthcare", "Manufacturing", "Technology", "Government", "Energy"];

const featured = {
  company: "Global Investment Bank",
  industry: "Financial Services",
  logo: "GIB",
  challenge:
    "A top-10 global investment bank managing significant assets under management faced mounting pressure from regulators after a privileged account misuse incident. With over 3,000 privileged accounts across 12 countries and no unified audit trail, the bank could not demonstrate adequate control.",
  solution:
    "OmniPriv was deployed across 4 data centers in 2 regions over 12 weeks. The bank leveraged JIT access, MFA enforcement, session recording, and automated account rotation to lock down all privileged paths.",
  results: [
    { metric: "68%", label: "Reduction in privilege account attack surface" },
    { metric: "100%", label: "Regulatory audit coverage achieved" },
    { metric: "Zero", label: "Privilege-related incidents post-deployment" },
    { metric: "90 days", label: "Time to full compliance posture" },
  ],
  quote: "OmniPriv didn't just solve our privileged access problem. It transformed how we think about trust across our entire infrastructure. The regulators were impressed. Our board was relieved.",
  attribution: "Chief Information Security Officer",
};

const cases = [
  {
    company: "Regional Health System",
    industry: "Healthcare",
    logo: "RHS",
    metric: "HIPAA compliant in 90 days",
    highlight: "Secured EHR & medical device access across 6 hospitals",
    desc: "A regional health system needed HIPAA-compliant privileged access across its EHR, medical devices, and distributed IT staff. OmniPriv delivered full session recording and JIT access within 90 days.",
  },
  {
    company: "European Automaker",
    industry: "Manufacturing",
    logo: "EA",
    metric: "Reduced unplanned access events by 70%",
    highlight: "OT/ICS privileged access secured across 3 plants",
    desc: "A European automotive manufacturer protecting its connected factory environment deployed OmniPriv to secure privileged access to PLCs, SCADA systems, and industrial IoT â€” without impacting production uptime.",
  },
  {
    company: "SaaS Scale-up",
    industry: "Technology",
    logo: "SS",
    metric: "SOC 2 audit passed first attempt",
    highlight: "AWS/GCP secrets management unified in one platform",
    desc: "A growth-stage SaaS company with 40+ AWS accounts needed to unify cloud secrets management before their SOC 2 audit. OmniPriv consolidated their tooling and achieved full vault coverage in eight weeks.",
  },
  {
    company: "Federal Defense Agency",
    industry: "Government",
    logo: "FDA",
    metric: "FISMA compliant in 6 months",
    highlight: "Air-gapped deployment for classified environments",
    desc: "A federal agency with air-gapped networks deployed OmniPriv in a classified environment to meet NIST 800-53 and FISMA requirements. Zero-trust privileged access replaced legacy bastion hosts.",
  },
  {
    company: "Energy Operator",
    industry: "Energy",
    logo: "EO",
    metric: "2,400 privileged accounts brought under management",
    highlight: "Unified PAM across onshore and cloud systems",
    desc: "An energy company coordinating operations across onshore refineries and cloud infrastructure unified privileged access management across 2,400 accounts and 3 operating divisions.",
  },
  {
    company: "Insurance Carrier",
    industry: "Financial Services",
    logo: "IC",
    metric: "40% reduction in audit preparation time",
    highlight: "Automated SOC 2 and PCI-DSS evidence collection",
    desc: "A mid-market insurance carrier replaced manual privilege reviews with OmniPriv's automated control evidence collection â€” cutting SOC 2 and PCI-DSS audit prep from 6 weeks to about 3.5 weeks.",
  },
  {
    company: "Academic Medical Center",
    industry: "Healthcare",
    logo: "AMC",
    metric: "Shared credentials eliminated in production",
    highlight: "Replaced shared privileged accounts across 2 data centers",
    desc: "An academic medical center eliminated shared privileged credentials across its two data centers, replacing them with individually managed accounts with full session accountability under OmniPriv.",
  },
  {
    company: "Regional Telco",
    industry: "Technology",
    logo: "RT",
    metric: "8,000 sessions recorded per day",
    highlight: "Session recording with anomaly alerting",
    desc: "A regional telco processing thousands of privileged sessions daily deployed OmniPriv's anomaly detection to flag unusual access patterns and strengthen insider threat visibility.",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-16 pb-20 border-b border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#07070E]" />
        <div className="container-xl relative z-10 text-center max-w-3xl mx-auto">
          <div className="badge-cyan mb-6">Customer Success</div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
            Real Results from <span className="text-accent">Real Enterprises</span>
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
          <div className="rounded-3xl border border-[#6366F1]/15 bg-gradient-to-br from-[#0E0E1C] to-[#07070E] overflow-hidden">
            <div className="p-10 md:p-14">
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#6366F1]/10 flex items-center justify-center text-sm font-bold text-[#6366F1]" style={{ fontFamily: "var(--font-syne)" }}>
                  {featured.logo}
                </div>
                <div>
                  <div className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>{featured.company}</div>
                  <div className="text-xs text-[#6366F1] font-semibold">{featured.industry}</div>
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
                    <div className="text-2xl font-extrabold text-[#6366F1] mb-1" style={{ fontFamily: "var(--font-syne)" }}>{r.metric}</div>
                    <div className="text-xs text-slate-400 leading-snug">{r.label}</div>
                  </div>
                ))}
              </div>

              <blockquote className="border-l-2 border-[#6366F1] pl-5">
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
      <section className="py-10 border-y border-white/[0.04] bg-[#0E0E1C]/30">
        <div className="container-xl">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <TrendingDown className="w-8 h-8 text-[#6366F1]" />
              <div className="text-2xl font-extrabold text-white" style={{ fontFamily: "var(--font-syne)" }}>60%+</div>
              <div className="text-sm text-slate-400">Average reduction in privilege attack surface</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Clock className="w-8 h-8 text-[#6366F1]" />
              <div className="text-2xl font-extrabold text-white" style={{ fontFamily: "var(--font-syne)" }}>12 weeks</div>
              <div className="text-sm text-slate-400">Typical time to full enterprise deployment</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="w-8 h-8 text-[#6366F1]" />
              <div className="text-2xl font-extrabold text-white" style={{ fontFamily: "var(--font-syne)" }}>90%+</div>
              <div className="text-sm text-slate-400">Customers pass their next compliance audit</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar (display only â€” non-interactive without client component) */}
      <section className="section-padding-lg">
        <div className="container-xl">
          <div className="flex flex-wrap gap-2 mb-10">
            {industries.map((ind, i) => (
              <button key={ind} className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${i === 0 ? "bg-[#6366F1]/10 border-[#6366F1]/30 text-[#6366F1]" : "border-white/[0.08] text-slate-400 hover:border-[#6366F1]/20 hover:text-slate-300"}`}>
                {ind}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cases.map((c) => (
              <div key={c.company} className="group p-6 rounded-2xl border border-white/[0.06] bg-[#0E0E1C]/60 hover:border-[#6366F1]/20 transition-all card-shine flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#6366F1]/10 flex items-center justify-center text-xs font-bold text-[#6366F1] flex-shrink-0" style={{ fontFamily: "var(--font-syne)" }}>
                    {c.logo}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white leading-tight" style={{ fontFamily: "var(--font-syne)" }}>{c.company}</div>
                    <div className="text-[10px] text-slate-500">{c.industry}</div>
                  </div>
                </div>

                <div className="text-sm font-semibold text-[#6366F1] mb-2">{c.metric}</div>
                <div className="text-xs font-medium text-slate-300 mb-3">{c.highlight}</div>
                <p className="text-xs text-slate-500 leading-relaxed flex-1">{c.desc}</p>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding border-t border-white/[0.04]">
        <div className="container-xl text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
            Ready to Write Your <span className="text-accent">Own Success Story?</span>
          </h2>
          <p className="text-slate-400 mb-8">
            Join growing enterprises that have strengthened their privileged access management with OmniPriv.
          </p>
          <Link href="/demo" className="btn-primary">
            Request a Demo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

