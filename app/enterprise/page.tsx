import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Shield, Zap, Users, Clock,
  Building2, Globe, Server, BarChart3, Headphones, Award, Star, Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Enterprise Plans: Pricing & Features",
  description:
    "OmniPriv enterprise plans designed for organizations of all sizes. Contact us for custom pricing tailored to your infrastructure scale, compliance needs, and support requirements.",
};

const plans = [
  {
    name: "Basic",
    seats: "Up to 50 users",
    assets: "Standalone deployment",
    ha: "Single node",
    highlight: false,
    description: "For small teams getting started with PAM controls.",
    features: [
      "Bastion host (SSH, RDP, VNC)",
      "Session recording & playback",
      "Multi-factor authentication",
      "Basic LDAP integration",
      "Web terminal (no client install)",
      "Standard audit reports",
      "Email support",
    ],
  },
  {
    name: "Standard",
    seats: "Up to 500 users",
    assets: "Standalone deployment",
    ha: "Active-standby",
    highlight: false,
    description: "For growing organizations that need robust access controls.",
    features: [
      "Everything in Basic",
      "Single Sign-On (SAML, OIDC, OAuth2)",
      "Role-Based Access Control (RBAC)",
      "Kubernetes cluster access",
      "Database access proxy",
      "Credential rotation",
      "SIEM / syslog integration",
      "Business hours support",
    ],
  },
  {
    name: "Professional",
    seats: "Up to 5,000 users",
    assets: "Cluster deployment",
    ha: "Active-standby",
    highlight: true,
    badge: "Most Popular",
    description: "For enterprises requiring advanced security and compliance controls.",
    features: [
      "Everything in Standard",
      "Just-In-Time (JIT) access",
      "Multi-tenant / multi-org",
      "Approval workflows & ticketing",
      "Command-level ACL",
      "Custom branding & theme",
      "Multi-cloud asset sync",
      "Remote App access",
      "Compliance report templates",
      "Business hours priority support",
    ],
  },
  {
    name: "Enterprise",
    seats: "Unlimited users",
    assets: "Any topology",
    ha: "Full HA cluster",
    highlight: false,
    description: "For large enterprises with complex, global PAM requirements.",
    features: [
      "Everything in Professional",
      "Full high-availability cluster",
      "Dedicated infrastructure",
      "Custom integrations & APIs",
      "Professional services",
      "Dedicated Customer Success Manager",
      "24/7 priority support with SLA",
      "On-site deployment support",
      "Custom compliance frameworks",
      "Air-gapped environment support",
    ],
  },
];

const enterpriseFeatures = [
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description:
      "SOC 2 Type II certified, ISO 27001 compliant, and built with zero-trust architecture. OmniPriv meets the strictest enterprise security requirements.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description:
      "Horizontally scalable to support millions of concurrent sessions across hundreds of geographic regions and cloud environments.",
  },
  {
    icon: Building2,
    title: "Multi-Tenant Architecture",
    description:
      "Complete resource isolation per business unit or subsidiary with independent policies, users, and access controls.",
  },
  {
    icon: Server,
    title: "Flexible Deployment",
    description:
      "Deploy on your infrastructure (on-premises, private cloud, public cloud), in any topology: standalone, active-standby, or full HA cluster.",
  },
  {
    icon: Headphones,
    title: "24/7 Expert Support",
    description:
      "Enterprise customers get a dedicated Customer Success Manager, 24/7 priority support, and guaranteed SLA response times.",
  },
  {
    icon: BarChart3,
    title: "ROI & Risk Reporting",
    description:
      "Executive dashboards and risk quantification reports help you communicate PAM value to board and leadership teams.",
  },
];

const slaHighlights = [
  { metric: "24/7", label: "Support Coverage", desc: "Round-the-clock expert support for Enterprise customers" },
  { metric: "< 1hr", label: "Critical Issue Response", desc: "Guaranteed response time for P1 severity incidents" },
  { metric: "99.99%", label: "Uptime SLA", desc: "High-availability deployment with contractual uptime guarantee" },
  { metric: "Dedicated", label: "Success Manager", desc: "Named Customer Success Manager for your account" },
];

const testimonials = [
  {
    quote: "We replaced CyberArk with OmniPriv and saved 60% on licensing while gaining capabilities we didn't have before.",
    author: "CISO, Global Insurance Group",
    rating: 5,
  },
  {
    quote: "The enterprise team at OmniPriv worked with us to build custom integrations for our legacy mainframe environment. Exceptional service.",
    author: "VP Infrastructure, Regional Bank",
    rating: 5,
  },
];

export default function EnterprisePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-16 pb-20 border-b border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#07070E]" />
        <div className="container-xl relative z-10 text-center">
          <div className="badge-cyan mb-6 inline-flex mx-auto">Enterprise Plans</div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 max-w-4xl mx-auto" style={{ fontFamily: "var(--font-syne)" }}>
            Secure Your Enterprise with <span className="text-accent">OmniPriv</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            OmniPriv is a premium, enterprise-grade PAM solution. All plans include our complete security platform; pricing is tailored to your organization's size, deployment requirements, and support needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/demo" className="btn-primary text-base px-8 py-3.5">
              Talk to Sales <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/demo" className="btn-secondary text-base px-8 py-3.5">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="section-padding-lg">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              Plans for Every Scale
            </h2>
            <p className="text-slate-400 text-lg">
              Each plan is a fully commercial, enterprise-grade offering. Contact our sales team for custom pricing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 ${plan.highlight
                    ? "border-[#6366F1]/40 bg-gradient-to-b from-[#6366F1]/[0.08] to-[#0E0E1C]/80 shadow-[0_0_40px_rgba(0,184,255,0.15)]"
                    : "border-white/[0.07] bg-[#0E0E1C]/60"
                  }`}
              >
                {plan.badge && (
                  <div className="absolute top-4 right-4 badge-cyan text-[10px]">
                    {plan.badge}
                  </div>
                )}
                <div className="p-7 border-b border-white/[0.06]">
                  <h3 className="text-2xl font-extrabold text-white mb-1" style={{ fontFamily: "var(--font-syne)" }}>
                    {plan.name}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">{plan.description}</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Users className="w-3.5 h-3.5 text-[#6366F1]" />
                      {plan.seats}
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Server className="w-3.5 h-3.5 text-[#6366F1]" />
                      {plan.assets}
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Zap className="w-3.5 h-3.5 text-[#6366F1]" />
                      HA: {plan.ha}
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="text-sm font-semibold text-[#6366F1] mb-1">Custom Pricing</div>
                    <p className="text-xs text-slate-500">Contact us for a quote tailored to your needs.</p>
                  </div>
                </div>

                <div className="p-7 flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#6366F1] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-300">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-7 border-t border-white/[0.06]">
                  <Link
                    href="/demo"
                    className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${plan.highlight
                        ? "btn-primary w-full"
                        : "btn-secondary w-full"
                      }`}
                  >
                    {plan.name === "Enterprise" ? "Contact Sales" : "Request a Demo"}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            All prices are quoted annually. Multi-year discounts available.{" "}
            <Link href="/demo" className="text-[#6366F1] hover:underline">Contact sales</Link> for volume licensing.
          </p>
        </div>
      </section>

      {/* Enterprise features */}
      <section className="section-padding border-y border-white/[0.04] bg-[#0E0E1C]/30">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="badge-cyan mb-5">Enterprise Platform</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              Built for Enterprise <span className="text-accent">Scale & Complexity</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enterpriseFeatures.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-white/[0.06] bg-[#0E0E1C]/60 hover:border-[#6366F1]/20 transition-all card-shine">
                <div className="icon-wrapper mb-5">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLA */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="badge-cyan mb-5">Service Level Agreement</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              Enterprise SLA Commitments
            </h2>
            <p className="text-slate-400">
              We stand behind our platform with contractual commitments on availability, support response, and service quality.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {slaHighlights.map((s) => (
              <div key={s.metric} className="text-center p-7 rounded-2xl border border-white/[0.06] bg-[#0E0E1C]/60 hover:border-[#6366F1]/20 transition-all">
                <div className="stat-number mb-2">{s.metric}</div>
                <div className="text-white font-semibold text-sm mb-2" style={{ fontFamily: "var(--font-syne)" }}>{s.label}</div>
                <p className="text-xs text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding border-t border-white/[0.04] bg-[#0E0E1C]/30">
        <div className="container-xl">
          <h2 className="text-3xl font-extrabold text-white mb-10 text-center" style={{ fontFamily: "var(--font-syne)" }}>
            What Enterprise Customers Say
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((t) => (
              <div key={t.author} className="relative p-8 rounded-2xl border border-white/[0.06] bg-[#0E0E1C]/60">
                <span className="quote-mark">"</span>
                <div className="flex items-center gap-0.5 mb-4 mt-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4 italic">"{t.quote}"</p>
                <div className="text-sm font-medium text-slate-400 border-t border-white/[0.05] pt-4">{t.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="relative rounded-3xl overflow-hidden border border-[#6366F1]/15 p-10 md:p-14">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0E0E1C] to-[#07070E]" />
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                  Let's Build the Right Plan for Your Organization
                </h2>
                <p className="text-slate-400 text-lg mb-6">
                  Our enterprise sales team will analyze your environment, identify the right plan, and provide a custom quote with no obligation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/demo" className="btn-primary">
                    Schedule a Call <ArrowRight className="w-4 h-4" />
                  </Link>

                </div>
              </div>
              <div className="space-y-4">
                {[
                  { icon: Clock, text: "30-minute exploratory call with a PAM expert" },
                  { icon: Lock, text: "Custom architecture review for your environment" },
                  { icon: Award, text: "Proof-of-concept deployment at no cost" },
                  { icon: BarChart3, text: "ROI analysis and compliance gap report" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.05] bg-white/[0.02]">
                    <Icon className="w-5 h-5 text-[#6366F1] flex-shrink-0" />
                    <span className="text-sm text-slate-300">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

