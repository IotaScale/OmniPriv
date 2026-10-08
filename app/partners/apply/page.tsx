"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  Mail,
  User,
  Phone,
  Globe,
  Briefcase,
  Layers,
  FileText,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Clock,
} from "lucide-react";

export default function PartnerApplyPage() {
  const [formData, setFormData] = useState({
    company_name: "",
    legal_name: "",
    website: "",
    country: "United States",
    region: "Americas",
    primary_contact_name: "",
    primary_contact_email: "",
    primary_contact_phone: "",
    primary_contact_role: "",
    company_type: "Reseller/Distributor",
    program_tracks: ["Sell"] as string[],
    intended_vertical: "Financial Services & Enterprise IT",
    partnership_scope: "",
    experience_summary: "",
    notes: "",
    consent_acknowledged: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedApp, setSubmittedApp] = useState<any | null>(null);

  function handleTrackToggle(track: string) {
    setFormData((prev) => {
      const exists = prev.program_tracks.includes(track);
      if (exists) {
        return { ...prev, program_tracks: prev.program_tracks.filter((t) => t !== track) };
      } else {
        return { ...prev, program_tracks: [...prev.program_tracks, track] };
      }
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!formData.company_name || !formData.legal_name || !formData.primary_contact_name || !formData.primary_contact_email) {
      setError("Please fill in all required company and primary contact fields.");
      return;
    }

    if (!formData.consent_acknowledged) {
      setError("You must acknowledge the channel partner evaluation terms.");
      return;
    }

    if (formData.program_tracks.length === 0) {
      setError("Please select at least one program track.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/public/partner-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit partner application.");
      }

      setSubmittedApp(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030711] text-slate-900 dark:text-slate-100 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/partners" className="hover:text-cyan-500">Partner Directory</Link>
          <span>/</span>
          <span className="text-slate-800 dark:text-slate-200 font-medium">Channel Application</span>
        </div>

        {submittedApp ? (
          /* Confirmation Screen */
          <div className="rounded-2xl border border-emerald-500/30 bg-white dark:bg-[#070D18] p-8 sm:p-12 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                Application Received • Under Review
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
                Application Submitted Successfully
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                Thank you for applying to the OmniPriv B2B Channel Partner Program on behalf of{" "}
                <strong className="text-slate-900 dark:text-white">{submittedApp.companyName}</strong>.
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-left space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/[0.05]">
                <span className="text-slate-500">Tracking Reference:</span>
                <span className="font-mono font-bold text-cyan-500">{submittedApp.applicationNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-white/[0.05]">
                <span className="text-slate-500">Current Status:</span>
                <span className="font-medium text-amber-500">Under Review</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">SLA Evaluation Window:</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">2–3 Business Days</span>
              </div>
            </div>

            <div className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              OmniPriv Channel Administration will verify commercial business filings and reach out to the primary contact email provided. Once approved, you will receive invitation credentials to your private Partner Workspace.
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/partners" className="btn-secondary text-xs px-5 py-2.5 rounded-lg w-full sm:w-auto">
                Return to Directory
              </Link>
              <Link href="/sign-in" className="btn-primary text-xs px-5 py-2.5 rounded-lg w-full sm:w-auto">
                Partner Sign In
              </Link>
            </div>
          </div>
        ) : (
          /* Application Form */
          <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#070D18] p-6 sm:p-10 shadow-xl space-y-8">
            <div className="border-b border-slate-100 dark:border-white/[0.06] pb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Kaspersky-Style B2B Channel Program</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Apply for OmniPriv Partner Organization
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
                OmniPriv partners with vetted enterprise security resellers, systems integrators, and MSSPs. Commercial agreements and Channel Admin due diligence are required before workspace provisioning.
              </p>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3 text-rose-500 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Company Profile */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/[0.06] pb-2">
                  <Building2 className="w-4 h-4 text-cyan-500" />
                  <span>1. Company Commercial Profile</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Trading / Display Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Cyber Solutions Ltd"
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Registered Legal Entity Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Cyber Solutions International Inc."
                      value={formData.legal_name}
                      onChange={(e) => setFormData({ ...formData, legal_name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Corporate Website
                    </label>
                    <input
                      type="url"
                      placeholder="https://company.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Country & Jurisdiction *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. United Kingdom, United States, Germany"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Partner Type & Tracks */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/[0.06] pb-2">
                  <Layers className="w-4 h-4 text-cyan-500" />
                  <span>2. Organization Type & Program Tracks</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Partner Organization Type *
                    </label>
                    <select
                      value={formData.company_type}
                      onChange={(e) => setFormData({ ...formData, company_type: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    >
                      <option value="Reseller/Distributor">Reseller / Distributor</option>
                      <option value="System Integrator">System Integrator (SI)</option>
                      <option value="MSP/MSSP">Managed Service Provider (MSP/MSSP)</option>
                      <option value="Technology Alliance">Technology Alliance Partner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Operating Region *
                    </label>
                    <select
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    >
                      <option value="Americas">Americas</option>
                      <option value="EMEA">EMEA (Europe, Middle East, Africa)</option>
                      <option value="APAC">APAC (Asia Pacific)</option>
                      <option value="Nordics">Nordics</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Requested Program Tracks (Select all that apply) *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: "Sell", title: "Sell", desc: "Reselling & deal registration" },
                      { id: "Deploy", title: "Deploy", desc: "Implementation & architecture" },
                      { id: "Manage", title: "Manage", desc: "MSSP & managed bastion ops" },
                      { id: "Build", title: "Build", desc: "Custom integrations & API" },
                    ].map((t) => {
                      const selected = formData.program_tracks.includes(t.id);
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => handleTrackToggle(t.id)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            selected
                              ? "border-cyan-500 bg-cyan-500/10 text-cyan-400"
                              : "border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02] text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          <div className="font-bold text-xs">{t.title}</div>
                          <div className="text-[10px] opacity-80 mt-0.5">{t.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Section 3: Primary Contact */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/[0.06] pb-2">
                  <User className="w-4 h-4 text-cyan-500" />
                  <span>3. Primary Executive Contact</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.primary_contact_name}
                      onChange={(e) => setFormData({ ...formData, primary_contact_name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Business Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sarah.jenkins@company.com"
                      value={formData.primary_contact_email}
                      onChange={(e) => setFormData({ ...formData, primary_contact_email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 019-2831"
                      value={formData.primary_contact_phone}
                      onChange={(e) => setFormData({ ...formData, primary_contact_phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Job Title / Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. VP Strategic Alliances"
                      value={formData.primary_contact_role}
                      onChange={(e) => setFormData({ ...formData, primary_contact_role: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Capabilities & Scope */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-white/[0.06] pb-2">
                  <Briefcase className="w-4 h-4 text-cyan-500" />
                  <span>4. Partnership Scope & Experience</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Relevant Identity & PAM Experience
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your team's experience selling or deploying Privileged Access Management, Active Directory, or Cloud Infrastructure security solutions..."
                    value={formData.experience_summary}
                    onChange={(e) => setFormData({ ...formData, experience_summary: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
              </div>

              {/* Section 5: Legal Consent */}
              <div className="pt-2 border-t border-slate-100 dark:border-white/[0.06] space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.consent_acknowledged}
                    onChange={(e) => setFormData({ ...formData, consent_acknowledged: e.target.checked })}
                    className="mt-1 rounded text-cyan-500 focus:ring-cyan-500"
                  />
                  <span className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    I confirm that I am authorized to submit this application on behalf of the named organization. I acknowledge that OmniPriv will verify corporate records, and that acceptance into the program is subject to mutual commercial agreement and Channel Administration due diligence.
                  </span>
                </label>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Evaluation response within 2–3 business days.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full sm:w-auto px-8 py-3 text-xs font-semibold rounded-xl flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span>Submitting Application...</span>
                    ) : (
                      <>
                        <span>Submit Partner Application</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
