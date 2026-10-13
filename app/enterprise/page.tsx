import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Shield, Clock,
  Building2, Globe, Server, BarChart3, Headphones, Award, Lock, CheckCircle2,
} from "lucide-react";

import SectionNav from "@/components/aipam/SectionNav";
import Spotlight from "@/components/aipam/Spotlight";
import { EnterpriseHero, PlanPicker, SupportTimeline, TenantVisual, type Plan } from "@/components/enterprise/Visuals";
import { FactsStrip, Heading, PageHero, mutedBand, sectionLine } from "@/components/pageui/blocks";
import { cn } from "@/lib/utils";

/*
 * /enterprise. Built from the shared page kit (components/pageui) so it
 * matches the other redesigned pages. Copy, plans and quotes are unchanged;
 * the plan picker only highlights a plan. Values inside illustrations are
 * illustrative.
 */

export const metadata: Metadata = {
  title: "Enterprise Plans: Pricing & Features",
  description:
    "OmniPriv enterprise plans designed for organizations of all sizes. Contact us for custom pricing tailored to your infrastructure scale, compliance needs, and support requirements.",
};

const plans: Plan[] = [
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

/*
 * Example engagements, not customer quotes. The page previously carried two
 * anonymous testimonials (one naming a competitor with a savings figure) that
 * could not be attributed. Real, attributable quotes can be added back here
 * once customers approve them.
 */
const engagements = [
  {
    sector: "Global insurance group",
    title: "Replacing a legacy PAM suite",
    icon: Building2,
    situation: "A separate vault, session recorder and approval tool, each licensed and upgraded on its own schedule.",
    outcome: [
      "Vaulting, session recording and approvals moved onto one platform",
      "One policy engine and one audit trail across business units",
      "Multi-tenant isolation per subsidiary",
    ],
  },
  {
    sector: "Regional bank",
    title: "Custom integrations for legacy systems",
    icon: Server,
    situation: "Core banking systems, including a legacy mainframe, that standard connectors could not reach.",
    outcome: [
      "Custom connectors built with the enterprise team",
      "Privileged sessions on legacy systems recorded like every other target",
      "Delivered under professional services on the Enterprise plan",
    ],
  },
];


const NAV = [
  { id: "ent-plans", label: "Plans" },
  { id: "ent-scale", label: "Enterprise scale" },
  { id: "ent-sla", label: "SLA" },
  { id: "ent-customers", label: "Use cases" },
  { id: "ent-contact", label: "Contact" },
];

/* From the plans and deployment copy on this page. */
const FACTS = [
  { value: plans.length, label: "plans, from 50 users to unlimited" },
  { value: 3, label: "HA options: single node, active-standby, full HA cluster" },
  { value: 3, label: "places to deploy: on-premises, private cloud, public cloud" },
  { value: "Custom", label: "pricing tailored to size, deployment and support" },
];

const NEXT_STEPS = [
  { icon: Clock, text: "30-minute exploratory call with a PAM expert" },
  { icon: Lock, text: "Custom architecture review for your environment" },
  { icon: Award, text: "Proof-of-concept deployment at no cost" },
  { icon: BarChart3, text: "ROI analysis and compliance gap report" },
];

export default function EnterprisePage() {
  return (
    <div className="aip">
      <SectionNav items={NAV} startId="ent-hero" />
      <Spotlight />

      <PageHero
        id="ent-hero"
        titleLead="Secure Your Enterprise with"
        titleAccent="OmniPriv"
        paragraphs={[["OmniPriv is a premium, enterprise-grade PAM solution. All plans include our complete security platform; pricing is tailored to your organization's size, deployment requirements, and support needs."]]}
        primary={{ href: "/demo?intent=sales", label: "Talk to Sales" }}
        secondary={{ href: "#ent-plans", label: "See Plans" }}
        visual={<EnterpriseHero />}
      >
        <FactsStrip facts={FACTS} />
      </PageHero>

      {/* ─── PLANS ────────────────────────────── */}
      <section id="ent-plans" className={sectionLine}>
        <div className="container-xl op-sec">
          <Heading title="Plans for Every Scale">
            <p className="text-[1.0625rem]">Each plan is a fully commercial, enterprise-grade offering. Contact our sales team for custom pricing.</p>
          </Heading>
          <div className="op-body">
            <PlanPicker plans={plans} />
          </div>
          <p className="mt-6 text-[0.875rem] text-slate-500 dark:text-slate-400">
            All prices are quoted annually. Multi-year discounts available.{" "}
            <Link href="/demo?intent=sales" className="op-link font-semibold">Contact sales</Link> for volume licensing.
          </p>
        </div>
      </section>

      {/* ─── ENTERPRISE SCALE ─────────────────── */}
      <section id="ent-scale" className={cn(mutedBand, sectionLine)}>
        <div className="container-xl op-sec">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
            <div className="min-w-0">
              <Heading title={<>Built for Enterprise <span className="text-gradient">Scale &amp; Complexity</span></>} />
            </div>
            <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
              <TenantVisual />
            </div>
          </div>
          <ul className="op-body grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {enterpriseFeatures.map((f, k) => (
              <li key={f.title} className="aip-card min-w-0 rounded-3xl border p-6 lg:p-7" data-aos="fade-up" data-aos-delay={String((k % 3) * 70)}>
                <div className="flex items-center gap-3">
                  <span className="icon-wrapper shrink-0">
                    <f.icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <h3 className="op-card-title">{f.title}</h3>
                </div>
                <p className="op-card-text mt-4">{f.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── SLA (dark band) ──────────────────── */}
      <div className="dark">
        <section id="ent-sla" className="relative overflow-hidden op-band-navy">
          <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="container-xl op-sec relative">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
              <div className="min-w-0">
                <Heading title="Enterprise SLA Commitments">
                  <p className="text-[1.0625rem] text-slate-600 dark:text-slate-400">We stand behind our platform with contractual commitments on availability, support response, and service quality.</p>
                </Heading>
                <ul className="mt-8 grid grid-cols-2 gap-3">
                  {slaHighlights.map((s, k) => (
                    <li key={s.metric} className="aip-card min-w-0 rounded-2xl border p-5" data-aos="fade-up" data-aos-delay={String((k % 2) * 70)}>
                      <div className="text-[1.625rem] sm:text-[1.875rem] font-bold leading-none tracking-[-0.03em] text-[#7FE3F2]" style={{ fontFamily: "var(--font-syne)" }}>
                        {s.metric}
                      </div>
                      <h3 className="op-card-title mt-3 text-[0.9375rem]">{s.label}</h3>
                      <p className="op-card-text mt-1.5 text-[0.8125rem]">{s.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                <SupportTimeline />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ─── EXAMPLE ENGAGEMENTS ──────────────── */}
      <section id="ent-customers" className={cn(mutedBand, sectionLine)}>
        <div className="container-xl op-sec">
          <Heading title="How Enterprise Teams Use OmniPriv">
            <p className="text-[1.0625rem]">Two typical engagements: what the estate looked like before, and what moved onto the platform.</p>
          </Heading>
          <ul className="op-body grid md:grid-cols-2 gap-4">
            {engagements.map((e, k) => (
              <li key={e.title} className="aip-card flex min-w-0 flex-col rounded-3xl border p-6 sm:p-8" data-aos="fade-up" data-aos-delay={String(k * 80)}>
                <div className="flex items-center gap-3">
                  <span className="icon-wrapper shrink-0">
                    <e.icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span className="text-[0.8125rem] font-semibold text-slate-500 dark:text-slate-400">{e.sector}</span>
                  <span className="ml-auto rounded-full border border-slate-900/[0.08] dark:border-white/[0.1] px-2.5 py-0.5 text-[0.6875rem] font-semibold text-slate-500">Example engagement</span>
                </div>
                <h3 className="op-h3 mt-5">{e.title}</h3>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.05] p-4">
                    <div className="text-[0.75rem] font-semibold text-amber-700 dark:text-amber-300">Before</div>
                    <p className="mt-1.5 text-[0.875rem] leading-relaxed text-slate-700 dark:text-slate-300">{e.situation}</p>
                  </div>
                  <div className="rounded-2xl border border-[#00B8DB]/25 bg-[#00B8DB]/[0.05] p-4">
                    <div className="text-[0.75rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]">With OmniPriv</div>
                    <ul className="mt-1.5 space-y-1.5">
                      {e.outcome.map((o) => (
                        <li key={o} className="flex items-start gap-2 text-[0.875rem] leading-snug text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="mt-0.5 w-3.5 h-3.5 shrink-0 text-[#00667A] dark:text-[#00B8DB]" aria-hidden="true" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[0.875rem] text-slate-500 dark:text-slate-400">
            Want to map this onto your own estate?{" "}
            <Link href="/demo?intent=sales" className="op-link font-semibold">Ask our sales team</Link>.
          </p>
        </div>
      </section>

      {/* ─── CONTACT (closing band) ───────────── */}
      <div className="dark">
        <section id="ent-contact" className="relative overflow-hidden op-band-navy">
          <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="container-xl op-sec relative">
            <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-10 lg:gap-14 items-center">
              <div data-aos="fade-up">
                <h2 className="op-h2 op-h2-lg">Let&apos;s Build the Right Plan for Your Organization</h2>
                <p className="mt-5 max-w-[40rem] text-[1.0156rem] leading-[1.7] text-slate-400">
                  Our enterprise sales team will analyze your environment, identify the right plan, and provide a custom quote with no obligation.
                </p>
                <div className="mt-8">
                  <Link href="/demo?intent=sales" className="hp-btn-primary group">
                    Schedule a Call
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
              <ul className="space-y-2.5" data-aos="fade-up" data-aos-delay="100">
                {NEXT_STEPS.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                    <span className="icon-wrapper shrink-0">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <span className="text-[0.9375rem] text-slate-200">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
