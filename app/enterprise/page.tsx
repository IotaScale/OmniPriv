import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Shield, Zap, Users, Clock,
  Building2, Globe, Server, BarChart3, Headphones, Award, Star, Lock,
} from "lucide-react";

import IconCardGrid from "@/components/sections/IconCardGrid";
import SplitHero from "@/components/sections/SplitHero";

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
      "Controls mapped to SOC 2 and ISO 27001, and built with AI-native architecture. OmniPriv meets the strictest enterprise security requirements.",
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
      <SplitHero
        titleLead="Secure Your Enterprise with"
        titleAccent="OmniPriv"
        primary={{ href: "/demo", label: "Talk to Sales" }}
        secondary={{ href: "/demo", label: "Contact Sales" }}
        media={{
          src: "/product/dashboard.png",
          alt: "OmniPriv dashboard showing privileged access activity",
          fit: "contain",
        }}
      >
        <p>
          OmniPriv is a premium, enterprise-grade PAM solution. All plans include our complete security platform; pricing is tailored to your organization&apos;s size, deployment requirements, and support needs.
        </p>
      </SplitHero>

      {/* Plans */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="section-heading" data-aos="fade-up">
            <h2 className="op-h2">Plans for Every Scale</h2>
            <p className="op-lede">
              Each plan is a fully commercial, enterprise-grade offering. Contact our sales team for custom pricing.
            </p>
          </div>

          <div className="op-body grid sm:grid-cols-2 xl:grid-cols-4 gap-5" data-aos="fade-up">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col rounded-2xl border bg-white dark:bg-[#0F2140] transition-colors hover:border-[#00B8DB]/45 ${plan.highlight
                  ? "border-[#00B8DB]/45"
                  : "border-slate-900/[0.08] dark:border-white/[0.08]"
                  }`}
              >
                <div className="p-6 border-b border-slate-900/[0.06] dark:border-white/[0.06]">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="op-h3">{plan.name}</h3>
                    {plan.badge && <span className="badge-cyan text-[10px]">{plan.badge}</span>}
                  </div>
                  <p className="op-card-text">{plan.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#00667A] dark:text-[#00B8DB] flex-shrink-0" aria-hidden="true" />
                      {plan.seats}
                    </li>
                    <li className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-[#00667A] dark:text-[#00B8DB] flex-shrink-0" aria-hidden="true" />
                      {plan.assets}
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#00667A] dark:text-[#00B8DB] flex-shrink-0" aria-hidden="true" />
                      HA: {plan.ha}
                    </li>
                  </ul>
                  <div className="mt-5">
                    <div className="text-sm font-semibold text-[#0a1628] dark:text-white">Custom Pricing</div>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Contact us for a quote tailored to your needs.</p>
                  </div>
                </div>

                <div className="p-6 flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#00667A] dark:text-[#00B8DB] flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 pt-0">
                  <Link href="/demo" className={`${plan.highlight ? "btn-primary" : "btn-secondary"} w-full`}>
                    {plan.name === "Enterprise" ? "Contact Sales" : "Request a Demo"}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            All prices are quoted annually. Multi-year discounts available.{" "}
            <Link href="/demo" className="op-link font-semibold">Contact sales</Link> for volume licensing.
          </p>
        </div>
      </section>

      {/* Enterprise features */}
      <section className="section-padding bg-slate-50 op-band-muted">
        <div className="container-xl">
          <div className="section-heading" data-aos="fade-up">
            <h2 className="op-h2">
              Built for Enterprise <span className="text-gradient">Scale &amp; Complexity</span>
            </h2>
          </div>
          <IconCardGrid
            columns={3}
            className="op-body"
            items={enterpriseFeatures.map((f) => ({ icon: f.icon, title: f.title, text: f.description }))}
          />
        </div>
      </section>

      {/* SLA */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="section-heading" data-aos="fade-up">
            <h2 className="op-h2">Enterprise SLA Commitments</h2>
            <p className="op-lede">
              We stand behind our platform with contractual commitments on availability, support response, and service quality.
            </p>
          </div>
          <div className="op-body grid sm:grid-cols-2 lg:grid-cols-4 gap-5" data-aos="fade-up">
            {slaHighlights.map((s) => (
              <div key={s.metric} className="rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#0F2140] p-6 hover:border-[#00B8DB]/45 transition-colors">
                <div className="font-display text-[2rem] font-bold leading-none tracking-[-0.03em] text-[#00667A] dark:text-[#00B8DB]">
                  {s.metric}
                </div>
                <h3 className="op-card-title mt-4 mb-2">{s.label}</h3>
                <p className="op-card-text">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-slate-50 op-band-muted">
        <div className="container-xl">
          <div className="section-heading" data-aos="fade-up">
            <h2 className="op-h2">What Enterprise Customers Say</h2>
          </div>
          <div className="op-body grid md:grid-cols-2 gap-5" data-aos="fade-up">
            {testimonials.map((t) => (
              <figure key={t.author} className="flex flex-col rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#0F2140] p-6 sm:p-8">
                <div className="flex items-center gap-0.5 mb-4" aria-label={`${t.rating} out of 5`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="flex-1 text-base leading-[1.7] text-[#0a1628] dark:text-slate-200">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 pt-4 border-t border-slate-900/[0.06] dark:border-white/[0.06] text-sm font-medium text-slate-600 dark:text-slate-400">
                  {t.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <div className="dark">
        <section className="op-band-navy section-padding">
          <div className="container-xl">
            <h2 className="op-h2 op-h2-lg mb-8" data-aos="fade-up">Let&apos;s Build the Right Plan for Your Organization</h2>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div>
                <p className="op-lede">
                  Our enterprise sales team will analyze your environment, identify the right plan, and provide a custom quote with no obligation.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link href="/demo" className="btn-primary w-full sm:w-auto">
                    Schedule a Call
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  { icon: Clock, text: "30-minute exploratory call with a PAM expert" },
                  { icon: Lock, text: "Custom architecture review for your environment" },
                  { icon: Award, text: "Proof-of-concept deployment at no cost" },
                  { icon: BarChart3, text: "ROI analysis and compliance gap report" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-[#0F2140] p-4">
                    <div className="icon-wrapper flex-shrink-0">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-[0.9375rem] text-slate-200">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
