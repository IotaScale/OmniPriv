import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield, Target, Eye, Users, Award, Globe, ArrowRight,
  CheckCircle2, Linkedin, Twitter, Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About — Our Mission to Secure Privileged Access",
  description:
    "OmniPriv was founded on the belief that every enterprise deserves world-class privileged access management. Learn about our mission, values, leadership, and commitment to enterprise security.",
};

const values = [
  {
    icon: Shield,
    title: "Security First",
    description:
      "Every product decision starts with security. We never compromise on protection to ship faster or cut costs. Our customers' trust depends on it.",
  },
  {
    icon: Target,
    title: "Enterprise Excellence",
    description:
      "We build for the world's most demanding environments — banks, hospitals, governments, and global enterprises. Good enough is never good enough.",
  },
  {
    icon: Eye,
    title: "Complete Transparency",
    description:
      "We share our security practices, certifications, and test results openly. Our customers deserve to know exactly how we protect their data.",
  },
  {
    icon: Users,
    title: "Customer Partnership",
    description:
      "We don't just sell software — we partner with our customers to solve their privileged access challenges, for the long term.",
  },
];



const team = [
  {
    name: "Alexandra Mercer",
    title: "Chief Executive Officer",
    bio: "Former VP Security at Palo Alto Networks. 20+ years building enterprise security solutions. Executive MBA from Wharton.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Dr. Rajan Krishnamurthy",
    title: "Chief Technology Officer",
    bio: "PhD in Computer Science (MIT). Former Principal Engineer at Amazon Web Services. 15+ patents in distributed systems and identity security.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Chen Wei",
    title: "Chief Product Officer",
    bio: "Previously CPO at two enterprise security unicorns. Expert in zero-trust architecture and enterprise identity platforms.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Dr. Priya Anand",
    title: "Chief Security Architect",
    bio: "Former NSA and CISA with 18 years in cyber operations. Certified CISSP, CISM, and GREM. Leads OmniPriv's security design.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Marcus Washington",
    title: "VP Threat Intelligence",
    bio: "SANS Institute instructor and threat intelligence researcher. Formerly at CrowdStrike Adversary Intelligence team.",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Jennifer Park",
    title: "VP Global Compliance",
    bio: "JD with 15 years in cybersecurity law and compliance. Led compliance programs at two major financial institutions before joining OmniPriv.",
    linkedin: "#",
    twitter: "#",
  },
];

const stats = [
  { value: "500+", label: "Employees Worldwide" },
  { value: "10+", label: "Countries Served" },
  { value: "100+", label: "Enterprise Customers" },
];

const investors = [
  "Sequoia Capital",
  "Andreessen Horowitz",
  "Insight Partners",
  "Tiger Global",
  "General Catalyst",
];

const certBadges = [
  "SOC 2 Type II",
  "ISO 27001",
  "PCI-DSS Level 1",
  "HIPAA",
  "GDPR",
  "FedRAMP Ready",
  "NIST CSF",
  "FIPS 140-2",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 border-b border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030711]" />
        <div className="container-xl relative z-10">
          <div className="max-w-3xl">
            <div className="badge-cyan mb-6">About OmniPriv</div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
              We Exist to <span className="text-gradient">Eliminate Privilege-Based Risk</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              OmniPriv was founded by security professionals who were tired of watching enterprises suffer breaches caused by uncontrolled privileged access. We set out to build the PAM platform we always wished existed — one that's powerful enough for the world's most demanding environments, yet practical enough to actually deploy.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/features" className="btn-primary">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="mailto:hello@OmniPriv.com" className="btn-secondary">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 border-b border-white/[0.04] bg-[#0A1628]/40">
        <div className="container-xl">
          <div className="grid grid-cols-3 gap-10">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="stat-number mb-2">{s.value}</div>
                <div className="text-slate-400 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding-lg">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="badge-cyan mb-6">Our Mission</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5" style={{ fontFamily: "var(--font-syne)" }}>
                Making Enterprise Security <span className="text-gradient">Achievable for Everyone</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-5">
                The security industry has a dirty secret: the best privileged access management tools were historically so complex and expensive that only the largest enterprises could afford them. Meanwhile, thousands of mid-market companies were left exposed with inadequate controls.
              </p>
              <p className="text-slate-400 leading-relaxed mb-5">
                OmniPriv changes that. We've built enterprise-grade PAM that's accessible to organizations of all sizes — without sacrificing the depth and rigor that Fortune 500 companies demand.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Today, OmniPriv secures the privileged access for over 3,000 organizations across six continents — from 50-person technology startups to 200,000-employee global enterprises and government agencies.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: Shield, text: "Security professionals, not just software engineers, build every feature" },
                { icon: Award, text: "Independently certified to the highest global compliance standards" },
                { icon: Globe, text: "Built for global scale with multi-region, air-gapped, and sovereign cloud options" },
                { icon: Users, text: "Customer success team with average 8-year enterprise security experience" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-4 p-5 rounded-xl border border-white/[0.05] bg-[#0A1628]/60">
                  <div className="icon-wrapper w-10 h-10 rounded-lg flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding border-y border-white/[0.04] bg-[#0A1628]/30">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="badge-cyan mb-5">Our Values</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              What We Stand For
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="p-7 rounded-2xl border border-white/[0.06] bg-[#0A1628]/60 text-center group hover:border-[#00B8FF]/20 transition-all card-shine">
                <div className="icon-wrapper w-12 h-12 mx-auto mb-5 rounded-xl">
                  <v.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>{v.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-padding-lg">
        <div className="container-xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="badge-cyan mb-5">Leadership</div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
              Led by Security Veterans
            </h2>
            <p className="text-slate-400 text-lg">
              Our leadership team brings together decades of experience from the world's top security organizations, intelligence agencies, and enterprise software companies.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member.name} className="p-7 rounded-2xl border border-white/[0.06] bg-[#0A1628]/60 hover:border-[#00B8FF]/20 transition-all group card-shine">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00B8FF]/30 to-[#0060FF]/20 flex items-center justify-center text-white font-bold text-xl flex-shrink-0" style={{ fontFamily: "var(--font-syne)" }}>
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-0.5" style={{ fontFamily: "var(--font-syne)" }}>{member.name}</h3>
                    <div className="text-xs text-[#00B8FF] font-semibold">{member.title}</div>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">{member.bio}</p>
                <div className="flex items-center gap-3 border-t border-white/[0.05] pt-4">
                  <a href={member.linkedin} className="p-1.5 rounded-lg hover:bg-[#00B8FF]/10 text-slate-500 hover:text-[#00B8FF] transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href={member.twitter} className="p-1.5 rounded-lg hover:bg-[#00B8FF]/10 text-slate-500 hover:text-[#00B8FF] transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Investors — Scrolling Marquee */}
      <section className="section-padding">
        <div className="container-xl">
          <p className="text-center text-sm text-slate-500 uppercase tracking-widest font-medium mb-8">Backed By</p>
          <div className="marquee-wrapper mb-16">
            <div className="marquee-track">
              {[...investors, ...investors, ...investors].map((inv, i) => (
                <div
                  key={`${inv}-${i}`}
                  className="flex-shrink-0 flex items-center gap-3 px-8 py-4 mx-2 rounded-xl border border-white/[0.06] bg-[#0A1628]/40 hover:border-[#00B8FF]/25 transition-all duration-300 group cursor-default select-none"
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00B8FF]/20 to-[#0060FF]/10 border border-[#00B8FF]/15 flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 text-[#00B8FF]" />
                  </div>
                  <span className="text-slate-300 group-hover:text-white text-sm font-semibold tracking-wide transition-colors whitespace-nowrap">
                    {inv}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-slate-500 uppercase tracking-widest font-medium mb-8">Certifications &amp; Compliance</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {certBadges.map((b) => (
              <div
                key={b}
                className="relative group p-5 rounded-2xl border border-white/[0.06] bg-gradient-to-b from-[#0A1628]/80 to-[#030711] hover:border-[#00B8FF]/25 transition-all duration-300 text-center"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#00B8FF]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[#00B8FF]/15 to-[#0060FF]/10 border border-[#00B8FF]/15 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-[#00B8FF]" />
                  </div>
                  <span className="text-sm font-bold text-white tracking-wide">{b}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding border-t border-white/[0.04]">
        <div className="container-xl">
          <div className="grid md:grid-cols-2 gap-10 items-center p-10 rounded-3xl border border-[#00B8FF]/15 bg-gradient-to-br from-[#0A1628] to-[#030711]">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                Join 100+ Enterprises Securing Their Infrastructure
              </h2>
              <p className="text-slate-400">
                Talk to our team and discover how OmniPriv can protect your most sensitive systems.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
              <Link href="/demo" className="btn-primary">
                Schedule a Call <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="mailto:hello@OmniPriv.com" className="btn-secondary flex items-center gap-2">
                <Mail className="w-4 h-4" /> Say Hello
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
