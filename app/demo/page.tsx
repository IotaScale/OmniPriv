"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import Link from "next/link";
import {
  Shield, Clock, Users, CheckCircle2, Star,
  ArrowRight, Phone, Mail, Linkedin, Twitter,
} from "lucide-react";
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_DEMO_TEMPLATE_ID,
} from "@/lib/emailjs";

const companySizes = [
  "1–50 employees",
  "51–200 employees",
  "201–1,000 employees",
  "1,001–5,000 employees",
  "5,001–10,000 employees",
  "10,000+ employees",
];

const useCases = [
  "Privileged Session Management",
  "Just-in-Time (JIT) Access",
  "MFA & Identity Governance",
  "Cloud Secrets Management",
  "DevOps / CI-CD Pipeline Security",
  "Compliance & Audit Reporting",
  "Third-Party & Vendor Access",
  "Other / Not Sure Yet",
];

const trustStats = [
  { icon: Users, value: "100+", label: "Enterprise Customers" },
  { icon: Shield, value: "SOC 2 Type II", label: "Certified Security" },
  { icon: Star, value: "99.99%", label: "Uptime SLA" },
  { icon: Clock, value: "< 1 hr", label: "Support Response Time" },
];

const whatToExpect = [
  {
    step: "01",
    title: "Introductory Call",
    description: "A 30-minute discovery conversation with a PAM specialist to understand your environment, challenges, and goals.",
  },
  {
    step: "02",
    title: "Personalized Walkthrough",
    description: "A tailored live demonstration of OmniPriv configured for your specific use cases, industry, and compliance requirements.",
  },
  {
    step: "03",
    title: "Architecture Review",
    description: "Our solution architects review your existing infrastructure and design a deployment plan with no disruption to operations.",
  },
  {
    step: "04",
    title: "Free Proof-of-Concept",
    description: "Optionally, run OmniPriv in your environment at no cost for 30 days with full support from our engineering team.",
  },
];

export default function DemoPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    companySize: "",
    useCase: "",
    context: "",
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_DEMO_TEMPLATE_ID,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          jobTitle: formData.jobTitle,
          company: formData.company,
          companySize: formData.companySize,
          useCase: formData.useCase,
          context: formData.context || "No additional context provided.",
        },
        EMAILJS_PUBLIC_KEY,
      );
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us at info@omnipriv.com");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-16 pb-16 border-b border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030711]" />
        <div className="container-xl relative z-10 text-center max-w-3xl mx-auto">
          <div className="badge-cyan mb-6">Request a Demo</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
            See OmniPriv in Your <span className="text-gradient">Environment</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Get a personalized, no-commitment walkthrough tailored to your infrastructure and compliance requirements. Our PAM specialists will show you exactly how OmniPriv eliminates privilege-based risk at your scale.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="section-padding-lg">
        <div className="container-xl">
          <div className="grid lg:grid-cols-5 gap-14 items-start">

            {/* LEFT: Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="p-12 rounded-3xl border border-[#00B8FF]/25 bg-[#00B8FF]/[0.04] text-center">
                  <div className="w-16 h-16 rounded-full bg-[#00B8FF]/15 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 className="w-8 h-8 text-[#00B8FF]" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>Demo Request Received!</h2>
                  <p className="text-slate-400 mb-8 max-w-md mx-auto">
                    A member of our team will contact you within one business day to schedule your personalized walkthrough.
                  </p>
                  <Link href="/" className="btn-secondary">
                    Return to Home
                  </Link>
                </div>
              ) : (
                <div className="p-8 rounded-3xl border border-white/[0.06] bg-[#0A1628]/60">
                  <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-syne)" }}>
                    Tell Us About Your Needs
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">First Name *</label>
                        <input
                          required
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Alexandra"
                          className="input-dark"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Last Name *</label>
                        <input
                          required
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Mercer"
                          className="input-dark"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Work Email *</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="input-dark"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 000-0000"
                          className="input-dark"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Company *</label>
                        <input
                          required
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Acme Corporation"
                          className="input-dark"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Job Title *</label>
                      <input
                        required
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        placeholder="CISO / IT Director / VP Engineering"
                        className="input-dark"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Company Size *</label>
                        <select
                          required
                          name="companySize"
                          value={formData.companySize}
                          onChange={handleChange}
                          className="select-dark"
                        >
                          <option value="">Select a range</option>
                          {companySizes.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Primary Use Case *</label>
                        <select
                          required
                          name="useCase"
                          value={formData.useCase}
                          onChange={handleChange}
                          className="select-dark"
                        >
                          <option value="">Select a use case</option>
                          {useCases.map((u) => (
                            <option key={u} value={u}>{u}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Additional Context</label>
                      <textarea
                        rows={4}
                        name="context"
                        value={formData.context}
                        onChange={handleChange}
                        placeholder="Describe your current environment, key challenges, timeline, or anything else we should know to make the demo as relevant as possible."
                        className="input-dark resize-none"
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        required
                        type="checkbox"
                        id="agree"
                        name="agree"
                        checked={formData.agree}
                        onChange={handleChange}
                        className="mt-1 w-4 h-4 rounded border-white/20 bg-[#0F1E35] accent-[#00B8FF]"
                      />
                      <label htmlFor="agree" className="text-sm text-slate-400 leading-relaxed">
                        I agree to OmniPriv&apos;s{" "}
                        <Link href="/privacy-policy" className="text-[#00B8FF] hover:underline">Privacy Policy</Link>{" "}
                        and{" "}
                        <Link href="/terms" className="text-[#00B8FF] hover:underline">Terms of Service</Link>.
                        I agree to receive communications from OmniPriv about products and services.
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full justify-center text-base py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2 justify-center">
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        <>Request Your Demo <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>

                    <p className="text-xs text-slate-500 text-center">
                      No credit card required &bull; No commitment &bull; Respond within 1 business day
                    </p>

                    {error && (
                      <p className="text-sm text-red-400 text-center border border-red-500/20 bg-red-500/10 rounded-xl px-4 py-3">
                        {error}
                      </p>
                    )}
                  </form>
                </div>
              )}
            </div>

            {/* RIGHT: What to Expect + Trust + Contact */}
            <div className="lg:col-span-2 space-y-8">

              {/* Trust stats */}
              {/* <div className="p-6 rounded-2xl border border-white/[0.06] bg-[#0A1628]/60">
                <h3 className="text-sm font-bold text-white mb-5 uppercase tracking-wider" style={{ fontFamily: "var(--font-syne)" }}>Trusted By Security Leaders</h3>
                <div className="grid grid-cols-2 gap-4">
                  {trustStats.map((t) => (
                    <div key={t.label} className="text-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <div className="w-8 h-8 rounded-lg bg-[#00B8FF]/10 flex items-center justify-center mx-auto mb-2">
                        <t.icon className="w-4 h-4 text-[#00B8FF]" />
                      </div>
                      <div className="text-sm font-bold text-white mb-0.5" style={{ fontFamily: "var(--font-syne)" }}>{t.value}</div>
                      <div className="text-[10px] text-slate-500">{t.label}</div>
                    </div>
                  ))}
                </div>
              </div> */}

              {/* What to Expect */}
              <div>
                <h3 className="text-base font-bold text-white mb-5" style={{ fontFamily: "var(--font-syne)" }}>What to Expect</h3>
                <div className="space-y-4">
                  {whatToExpect.map((step) => (
                    <div key={step.step} className="flex gap-4 p-4 rounded-xl border border-white/[0.04] bg-[#0A1628]/40">
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#00B8FF]/10 flex items-center justify-center text-[#00B8FF] font-bold text-xs" style={{ fontFamily: "var(--font-syne)" }}>
                        {step.step}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white mb-1">{step.title}</div>
                        <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="p-6 rounded-2xl border border-white/[0.06] bg-[#0A1628]/60">
                <h3 className="text-sm font-bold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>Prefer to Talk Directly?</h3>
                <div className="space-y-3">
                  <a href="mailto:info@omnipriv.com" className="flex items-center gap-3 text-sm text-slate-400 hover:text-[#00B8FF] transition-colors">
                    <Mail className="w-4 h-4 text-[#00B8FF]" />
                    info@omnipriv.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
