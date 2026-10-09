"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  Building,
  Mail,
  User,
  Phone,
  Globe,
  Briefcase,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Info,
} from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    company_name: "",
    legal_name: "",
    website: "",
    country: "United States",
    company_type: "Reseller",
    primary_vertical: "Enterprise IT & Cybersecurity",
    company_profile: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    contact_role: "Managing Director / Partner Principal",
    password: "",
    confirm_password: "",
    terms_agreed: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const countries = [
    "United States",
    "United Kingdom",
    "Germany",
    "France",
    "Netherlands",
    "Switzerland",
    "Canada",
    "Australia",
    "Singapore",
    "Japan",
    "UAE",
    "Saudi Arabia",
    "Brazil",
    "India",
    "Sweden",
    "Spain",
    "Italy",
    "Poland",
  ];

  const partnerTypes = [
    { id: "Reseller", label: "Value-Added Reseller (VAR)", desc: "Direct enterprise sales & PAM fulfillment" },
    { id: "System Integrator", label: "System Integrator (SI)", desc: "Complex architecture, IAM & security integration" },
    { id: "MSP/MSSP", label: "Managed Service Provider (MSP/MSSP)", desc: "Multi-tenant managed PAM operations" },
    { id: "Technology Alliance", label: "Technology Alliance", desc: "Software & technology co-selling partnerships" },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const compName = formData.company_name.trim();
    const legalName = formData.legal_name.trim() || compName;
    const contactName = formData.contact_name.trim();
    const contactEmail = formData.contact_email.trim().toLowerCase();
    let website = formData.website.trim();
    if (website && !/^https?:\/\//i.test(website)) {
      website = `https://${website}`;
    }

    // Client-side validations
    if (!compName) {
      setError("Please provide your company operating or trade name.");
      return;
    }

    if (!contactName) {
      setError("Please provide the primary partner contact's full name.");
      return;
    }

    if (!contactEmail) {
      setError("Please provide your corporate work email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      setError("Please enter a valid corporate email address.");
      return;
    }

    if (formData.password.length < 12) {
      setError("Password must be at least 12 characters long for enterprise security compliance.");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.terms_agreed) {
      setError("Please check the declaration box to agree to the OmniPriv Channel Partner Agreement.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name: compName,
          legal_name: legalName,
          website: website,
          country: formData.country,
          company_type: formData.company_type,
          program_tracks: ["Sell"],
          contact_name: contactName,
          contact_email: contactEmail,
          contact_phone: formData.contact_phone.trim(),
          contact_role: formData.contact_role.trim(),
          password: formData.password,
          intended_vertical: formData.primary_vertical,
          company_profile: formData.company_profile.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Partner registration failed. Please try again.");
        return;
      }

      // Successful registration -> session cookie is set -> navigate to partner workspace
      router.push("/partner-portal?welcome=true");
      router.refresh();
    } catch (err: any) {
      console.error("Registration error:", err);
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative min-h-screen py-16 px-4 overflow-hidden bg-slate-50 dark:bg-[#030711] text-slate-900 dark:text-slate-100">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,184,255,0.08) 0%, transparent 65%)" }}
      />

      <div className="w-full max-w-3xl mx-auto relative z-10">
        {/* Header / Brand */}
        <div className="flex flex-col items-center text-center mb-10">
          <Link href="/" className="flex items-center gap-2.5 mb-6">
            <div className="icon-wrapper w-10 h-10 rounded-xl">
              <Shield className="w-5 h-5 text-[#00B8FF]" />
            </div>
            <span
              className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              OmniPriv
            </span>
          </Link>

          <div className="badge-cyan mb-3">Kaspersky-Model B2B Channel Operations</div>
          <h1
            className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Register Your Partner Organization
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mt-2 leading-relaxed">
            Gain immediate access to deal registration, vendor-assigned commercial leads, 
            and PAM enablement resources. Immediate access upon registration.
          </p>
        </div>

        {/* Card Form */}
        <div className="rounded-2xl border border-slate-900/[0.1] dark:border-white/[0.08] bg-white dark:bg-[#0A1628]/95 backdrop-blur-xl p-6 sm:p-10 shadow-xl">
          {error && (
            <div className="mb-8 flex items-start gap-3 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-500 text-xs sm:text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            {/* 1. Company Information */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200 dark:border-white/[0.08]">
                <Building className="w-4 h-4 text-cyan-500" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  1. Company & Entity Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Operating Trade Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                    placeholder="e.g. CyberShield Technologies"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Registered Legal Entity Name <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.legal_name}
                    onChange={(e) => setFormData({ ...formData, legal_name: e.target.value })}
                    placeholder="e.g. CyberShield Tech Ltd / LLC (defaults to operating name)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Corporate Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="e.g. cybershield.com"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Operating Country / Region *
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                  >
                    {countries.map((c) => (
                      <option key={c} value={c} className="bg-white dark:bg-[#0A1628] text-slate-900 dark:text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Partner Type Selector */}
              <div className="mt-4">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                  Partner Operating Model *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {partnerTypes.map((t) => {
                    const isSelected = formData.company_type === t.id;
                    return (
                      <div
                        key={t.id}
                        onClick={() => setFormData({ ...formData, company_type: t.id })}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? "border-cyan-500 bg-cyan-500/10 text-slate-900 dark:text-white"
                            : "border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02] text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/[0.2]"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                          <span>{t.label}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 leading-normal">{t.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Primary Market / Vertical
                </label>
                <input
                  type="text"
                  value={formData.primary_vertical}
                  onChange={(e) => setFormData({ ...formData, primary_vertical: e.target.value })}
                  placeholder="e.g. Financial Services, Healthcare, Energy & Utilities, Public Sector"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>

              <div className="mt-4">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Short Company Profile
                </label>
                <textarea
                  rows={2}
                  value={formData.company_profile}
                  onChange={(e) => setFormData({ ...formData, company_profile: e.target.value })}
                  placeholder="Brief overview of security practice, geographic coverage, and customer base..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all resize-none"
                />
              </div>
            </div>

            {/* 2. Primary Account Owner */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200 dark:border-white/[0.08]">
                <User className="w-4 h-4 text-cyan-500" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  2. Primary Partner Owner Account
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={formData.contact_name}
                      onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                      placeholder="e.g. Marcus Vance"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Corporate Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={formData.contact_email}
                      onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                      placeholder="marcus.v@cybershield.com"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      value={formData.contact_phone}
                      onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Role / Job Title *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={formData.contact_role}
                      onChange={(e) => setFormData({ ...formData, contact_role: e.target.value })}
                      placeholder="Managing Director / Channel Lead"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Security Credentials */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200 dark:border-white/[0.08]">
                <Lock className="w-4 h-4 text-cyan-500" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
                  3. Security Credentials
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Password (Min. 12 characters) *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                    />
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {formData.password.length >= 12 ? (
                      <span className="text-emerald-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Password length requirement met
                      </span>
                    ) : (
                      <span>Current: {formData.password.length} / 12 characters minimum</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={formData.confirm_password}
                      onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Declarations */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-white/[0.02]">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.terms_agreed}
                  onChange={(e) => setFormData({ ...formData, terms_agreed: e.target.checked })}
                  className="mt-1 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
                />
                <span className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  I certify on behalf of <strong>{formData.company_name || "our company"}</strong> that I am an authorized corporate officer. 
                  Our organization agrees to the OmniPriv Channel Partner Agreement. We understand deal registrations require 
                  vendor verification before protection lock is issued, and that partner credentials strictly govern commercial pipeline operations.
                </span>
              </label>
            </div>

            {/* Submit CTA */}
            {error && (
              <div className="flex items-start gap-3 p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-500 text-xs sm:text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-3.5 text-sm font-bold shadow-lg disabled:opacity-60 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Provisioning Partner Organization...
                  </>
                ) : (
                  <>
                    Complete Registration & Open Partner Workspace <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="text-center text-xs text-slate-500 space-y-2 pt-2 border-t border-slate-200 dark:border-white/[0.08]">
              <div>
                Already registered your organization?{" "}
                <Link href="/sign-in" className="text-cyan-500 hover:underline font-semibold">
                  Sign in to Partner Portal
                </Link>
              </div>
              <div>
                <a
                  href={process.env.NEXT_PUBLIC_MAIN_SITE_URL || "https://omnipriv.com"}
                  className="text-slate-400 hover:text-cyan-500 transition-colors inline-flex items-center gap-1"
                >
                  &larr; Return to OmniPriv.com
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
