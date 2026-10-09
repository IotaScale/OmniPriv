"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { usePartnerPortal } from "@/components/partner-portal/PartnerPortalContext";
import {
  Briefcase,
  Building2,
  Globe,
  User,
  Mail,
  Phone,
  DollarSign,
  Calendar,
  Layers,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Loader2,
  FileCheck2,
  Percent,
  Sparkles,
  Lock,
  Copy,
  Check,
} from "lucide-react";

function getPartnerMargins(tier?: string) {
  const t = (tier || "Registered").toLowerCase();
  if (t === "platinum") return { base: 30, rebate: 12, total: 42, label: "Platinum" };
  if (t === "gold") return { base: 25, rebate: 10, total: 35, label: "Gold" };
  if (t === "silver") return { base: 20, rebate: 8, total: 28, label: "Silver" };
  return { base: 15, rebate: 5, total: 20, label: "Registered" };
}

function DealRegistrationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const leadId = searchParams.get("lead_id");
  const initialCompany = searchParams.get("company") || "";
  const initialContact = searchParams.get("contact") || "";
  const initialEmail = searchParams.get("email") || "";
  const initialCountry = searchParams.get("country") || "United States";
  const initialProduct = searchParams.get("product") || "";

  const { profile, tierInfo, refresh } = usePartnerPortal();
  const currentTier = tierInfo?.tier || profile?.current_tier || "Registered";
  const margins = getPartnerMargins(currentTier);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedDeal, setSubmittedDeal] = useState<any | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    // Step 1: Customer details
    customer_name: initialCompany,
    customer_domain: "",
    customer_country: initialCountry,
    customer_industry: "Financial Services & Banking",
    customer_contact_name: initialContact,
    customer_contact_email: initialEmail,
    customer_contact_phone: "",

    // Step 2: Opportunity details
    opportunity_name: initialCompany ? `${initialCompany} - PAM Modernization` : "",
    product_type: initialProduct || "OmniPriv Enterprise Credential Vault & Bastion",
    license_model: "Annual Subscription" as "Annual Subscription" | "Perpetual" | "MSP Consumption",
    estimated_value_usd: "75000",
    estimated_seats: "100",
    deployment_timeline: "1-3 months (Q3/Q4)",
    estimated_close_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    opportunity_source: leadId ? "Vendor-Assigned Lead Conversion" : "Direct Partner Outreach",
    partner_notes: leadId ? `Converted from Channel Lead ID: ${leadId}` : "",

    // Step 3: Declaration
    declaration_agreed: false,
  });

  const industries = [
    "Financial Services & Banking",
    "Healthcare & Life Sciences",
    "Energy & Critical Infrastructure",
    "Government & Public Sector",
    "Technology & SaaS",
    "Manufacturing & Industrial OT",
    "Telecommunications",
    "Retail & E-Commerce",
  ];

  const products = [
    "OmniPriv Enterprise Credential Vault & Bastion",
    "OmniPriv Just-In-Time Multi-Cloud Access Gateway",
    "OmniPriv Air-Gapped Industrial & OT PAM proxy",
    "OmniPriv Non-Human Identity & AI Agent Governance",
    "OmniPriv Full PAM Suite (Unified Platform)",
  ];

  const deploymentTimelines = [
    "Immediate (Under 30 days)",
    "1-3 months (Q3/Q4)",
    "3-6 months",
    "6-12 months (Budget cycle)",
  ];

  // Live Clean Domain computation
  const cleanDomain = useMemo(() => {
    return formData.customer_domain
      .replace(/https?:\/\//i, "")
      .replace(/\/.*$/, "")
      .trim()
      .toLowerCase();
  }, [formData.customer_domain]);

  // Projected partner earnings on this deal
  const dealValue = Number(formData.estimated_value_usd) || 0;
  const projectedEarnings = Math.round(dealValue * (margins.total / 100));

  function validateStep1(): boolean {
    if (!formData.customer_name.trim()) {
      setError("Please enter the prospect / customer legal organization name.");
      return false;
    }
    if (!formData.customer_domain.trim()) {
      setError("Customer primary corporate domain is required for 90-day protection registration.");
      return false;
    }
    if (!cleanDomain.includes(".") || cleanDomain.length < 4) {
      setError("Please enter a valid corporate domain (e.g. standardchartered.com or acme-bank.org).");
      return false;
    }
    if (!formData.customer_contact_name.trim() || !formData.customer_contact_email.trim()) {
      setError("Please provide customer key stakeholder name and official email address.");
      return false;
    }
    setError(null);
    return true;
  }

  function validateStep2(): boolean {
    if (!formData.opportunity_name.trim()) {
      setError("Please enter an opportunity project title.");
      return false;
    }
    if (!formData.estimated_close_date) {
      setError("Please select an estimated close date.");
      return false;
    }
    if (Number(formData.estimated_value_usd) <= 0) {
      setError("Please provide a valid estimated ARR or deal value in USD.");
      return false;
    }
    setError(null);
    return true;
  }

  async function handleFinalSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.declaration_agreed) {
      setError("You must confirm the commercial declaration to register this opportunity.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/partner/deals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: formData.customer_name.trim(),
          customer_domain: cleanDomain,
          customer_country: formData.customer_country,
          customer_industry: formData.customer_industry,
          customer_contact_name: formData.customer_contact_name.trim(),
          customer_contact_email: formData.customer_contact_email.trim(),
          customer_contact_phone: formData.customer_contact_phone.trim(),
          opportunity_name: formData.opportunity_name.trim(),
          estimated_value_usd: Number(formData.estimated_value_usd),
          estimated_close_date: formData.estimated_close_date,
          target_products: [formData.product_type],
          estimated_seats: Number(formData.estimated_seats),
          license_model: formData.license_model,
          deployment_timeline: formData.deployment_timeline,
          opportunity_source: formData.opportunity_source,
          partner_notes: formData.partner_notes.trim(),
          source_lead_id: leadId || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit deal registration.");
      }

      setSubmittedDeal(data.deal);
      refresh();
    } catch (err: any) {
      console.error("Deal submission error", err);
      setError(err.message || "An error occurred while saving the registration.");
    } finally {
      setSubmitting(false);
    }
  }

  function copyDealCode(code: string) {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  }

  // Confirmation view after submission
  if (submittedDeal) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/10 animate-in zoom-in-95 duration-200">
          <FileCheck2 className="w-8 h-8" />
        </div>

        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Status: Awaiting Channel Admin Review
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Deal Registration Submitted
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-lg mx-auto">
            Opportunity for <strong className="text-slate-900 dark:text-white">{submittedDeal.customer_name}</strong> has been logged into the OmniPriv channel database.
            OmniPriv Channel Management will arbitrate 90-day vendor deal protection.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] text-left space-y-3.5 text-xs max-w-md mx-auto shadow-sm">
          <div className="flex justify-between items-center py-1.5 border-b border-slate-100 dark:border-white/[0.05]">
            <span className="text-slate-500">Deal Reference Code:</span>
            <button
              onClick={() => copyDealCode(submittedDeal.deal_code)}
              className="font-mono font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1.5 bg-cyan-500/10 px-2 py-0.5 rounded hover:bg-cyan-500/20 transition-colors"
              title="Click to copy code"
            >
              <span>{submittedDeal.deal_code}</span>
              {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 opacity-60" />}
            </button>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-white/[0.05]">
            <span className="text-slate-500">Customer Domain:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{submittedDeal.customer_domain}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-white/[0.05]">
            <span className="text-slate-500">Estimated ARR Value:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">
              ${Number(submittedDeal.estimated_value_usd).toLocaleString()} USD
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-white/[0.05]">
            <span className="text-slate-500">Protected Tier Margin:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              {margins.total}% (~${Math.round(Number(submittedDeal.estimated_value_usd) * (margins.total / 100)).toLocaleString()} USD)
            </span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-slate-500">Protection Status:</span>
            <span className="font-semibold text-amber-500">
              {submittedDeal.conflict_detected ? "Conflict Arbitration Active" : "Pending SecOps Approval"}
            </span>
          </div>

          {submittedDeal.conflict_detected && (
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] leading-relaxed">
              <strong>Domain Arbitration Note:</strong> A prior active registration exists for this domain. OmniPriv Channel Admin will review the engagement timeline.
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link href="/partner-portal/deals" className="btn-primary text-xs px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20">
            <span>View in My Deals</span> <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => {
              setSubmittedDeal(null);
              setStep(1);
              setFormData({
                ...formData,
                customer_name: "",
                customer_domain: "",
                customer_contact_name: "",
                customer_contact_email: "",
                customer_contact_phone: "",
                opportunity_name: "",
                partner_notes: "",
                declaration_agreed: false,
              });
            }}
            className="btn-secondary text-xs px-5 py-2.5 rounded-xl font-semibold"
          >
            Register Another Opportunity
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link href="/partner-portal/deals" className="hover:text-cyan-500 transition-colors">
              My Deals
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-medium">Register a Deal</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Register Customer Opportunity
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Secure a guaranteed 90-day vendor protection lock and preserve your {margins.total}% commercial margin.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-600 dark:text-cyan-400 font-semibold">
            <Percent className="w-3.5 h-3.5" />
            <span>{margins.label} Tier: {margins.total}% Effective Margin</span>
          </div>
          <Link
            href="/partner-portal/deals"
            className="btn-secondary text-xs px-3.5 py-2 rounded-xl font-semibold self-start sm:self-auto"
          >
            Back to Deals
          </Link>
        </div>
      </div>

      {/* Modern Stepper Indicator */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { num: 1, title: "1. Prospect Details", desc: "Customer entity & domain" },
          { num: 2, title: "2. Opportunity Scope", desc: "ARR value & product" },
          { num: 3, title: "3. Review & Submit", desc: "Declarations & protection lock" },
        ].map((s) => {
          const isActive = step === s.num;
          const isDone = step > s.num;
          return (
            <button
              key={s.num}
              type="button"
              onClick={() => {
                if (s.num === 1) setStep(1);
                if (s.num === 2 && validateStep1()) setStep(2);
                if (s.num === 3 && validateStep1() && validateStep2()) setStep(3);
              }}
              className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                isActive
                  ? "border-cyan-500 bg-cyan-500/10 text-slate-900 dark:text-white shadow-md shadow-cyan-500/5"
                  : isDone
                  ? "border-emerald-500/30 bg-emerald-500/5 text-slate-700 dark:text-slate-300"
                  : "border-slate-200 dark:border-white/[0.06] bg-white dark:bg-[#0A1628]/40 text-slate-400"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-bold ${isActive ? "text-cyan-600 dark:text-cyan-400" : ""}`}>
                  {s.title}
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                      isActive
                        ? "bg-cyan-500 text-slate-950"
                        : "bg-slate-200 dark:bg-white/10 text-slate-400"
                    }`}
                  >
                    {s.num}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">{s.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="flex items-start gap-2.5 p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 text-xs sm:text-sm animate-in fade-in duration-150">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Step Content Container */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] p-6 sm:p-8 shadow-sm">
        {/* STEP 1: Customer Details */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <Building2 className="w-4 h-4 text-cyan-500" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Prospect Organization & Key Stakeholder
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Legal Prospect / Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  placeholder="e.g. Standard Chartered Bank"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Customer Primary Domain * (For Protection Check)
                </label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.customer_domain}
                    onChange={(e) => setFormData({ ...formData, customer_domain: e.target.value })}
                    placeholder="sc.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                  />
                </div>
                {cleanDomain && (
                  <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-cyan-600 dark:text-cyan-400 font-mono">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Domain: <strong>{cleanDomain}</strong> (will be checked against 90-day active locks)</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Country / Region *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customer_country}
                  onChange={(e) => setFormData({ ...formData, customer_country: e.target.value })}
                  placeholder="e.g. United Kingdom"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Industry Vertical *
                </label>
                <select
                  value={formData.customer_industry}
                  onChange={(e) => setFormData({ ...formData, customer_industry: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                >
                  {industries.map((ind) => (
                    <option key={ind} value={ind} className="bg-white dark:bg-[#0A1628]">
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Customer Decision Maker Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={formData.customer_contact_name}
                    onChange={(e) => setFormData({ ...formData, customer_contact_name: e.target.value })}
                    placeholder="e.g. David Miller (CISO)"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Customer Corporate Work Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={formData.customer_contact_email}
                    onChange={(e) => setFormData({ ...formData, customer_contact_email: e.target.value })}
                    placeholder="d.miller@sc.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Customer Direct Phone (Optional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    value={formData.customer_contact_phone}
                    onChange={(e) => setFormData({ ...formData, customer_contact_phone: e.target.value })}
                    placeholder="+44 20 7946 0991"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-white/[0.06]">
              <button
                type="button"
                onClick={() => {
                  if (validateStep1()) setStep(2);
                }}
                className="btn-primary text-xs px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-md shadow-cyan-500/10"
              >
                <span>Proceed to Opportunity Details</span> <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Opportunity Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <Briefcase className="w-4 h-4 text-cyan-500" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Commercial Opportunity & OmniPriv PAM Scope
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Opportunity Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.opportunity_name}
                  onChange={(e) => setFormData({ ...formData, opportunity_name: e.target.value })}
                  placeholder="e.g. Standard Chartered - Tier-0 PAM Bastion Replacement"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Target OmniPriv PAM Solution *
                </label>
                <select
                  value={formData.product_type}
                  onChange={(e) => setFormData({ ...formData, product_type: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                >
                  {products.map((p) => (
                    <option key={p} value={p} className="bg-white dark:bg-[#0A1628]">
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Commercial License Model *
                </label>
                <select
                  value={formData.license_model}
                  onChange={(e) => setFormData({ ...formData, license_model: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                >
                  <option value="Annual Subscription" className="bg-white dark:bg-[#0A1628]">Annual Subscription</option>
                  <option value="Perpetual" className="bg-white dark:bg-[#0A1628]">Perpetual with Annual Maintenance</option>
                  <option value="MSP Consumption" className="bg-white dark:bg-[#0A1628]">MSP Consumption / Utility Billing</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Expected Deal Value (ARR in USD) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    required
                    value={formData.estimated_value_usd}
                    onChange={(e) => setFormData({ ...formData, estimated_value_usd: e.target.value })}
                    placeholder="75000"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Expected Privileged Seats / Vault Targets *
                </label>
                <input
                  type="number"
                  required
                  value={formData.estimated_seats}
                  onChange={(e) => setFormData({ ...formData, estimated_seats: e.target.value })}
                  placeholder="100"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Estimated Close Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    required
                    value={formData.estimated_close_date}
                    onChange={(e) => setFormData({ ...formData, estimated_close_date: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Deployment Timeline
                </label>
                <select
                  value={formData.deployment_timeline}
                  onChange={(e) => setFormData({ ...formData, deployment_timeline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                >
                  {deploymentTimelines.map((dt) => (
                    <option key={dt} value={dt} className="bg-white dark:bg-[#0A1628]">
                      {dt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Opportunity Source
                </label>
                <input
                  type="text"
                  value={formData.opportunity_source}
                  onChange={(e) => setFormData({ ...formData, opportunity_source: e.target.value })}
                  placeholder="e.g. Existing Customer Expansion, RFP, Security Audit Finding"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Technical & Commercial Justification Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.partner_notes}
                  onChange={(e) => setFormData({ ...formData, partner_notes: e.target.value })}
                  placeholder="Key customer requirements, incumbent solutions being displaced, compliance mandates..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-all resize-none"
                />
              </div>
            </div>

            {/* Live Tier Margin Return Preview Widget */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 via-emerald-500/10 to-transparent border border-cyan-500/20 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <Percent className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    Estimated Partner Profit: ~${projectedEarnings.toLocaleString()} USD
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                    Based on your <strong>{margins.label}</strong> tier ({margins.base}% base + {margins.rebate}% deal reg rebate = <strong>{margins.total}%</strong> effective margin).
                  </div>
                </div>
              </div>

              <div className="font-mono text-sm font-black text-emerald-400 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5 shrink-0 self-start sm:self-auto">
                {margins.total}% Margin Locked
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-white/[0.06]">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-secondary text-xs px-4 py-2.5 rounded-xl font-semibold flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                type="button"
                onClick={() => {
                  if (validateStep2()) setStep(3);
                }}
                className="btn-primary text-xs px-5 py-2.5 rounded-xl font-bold flex items-center gap-2"
              >
                <span>Review Opportunity</span> <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Review & Submit */}
        {step === 3 && (
          <form onSubmit={handleFinalSubmit} className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
              <ShieldCheck className="w-4 h-4 text-cyan-500" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Review Opportunity Summary & Confirm
              </h2>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-white/[0.06] bg-slate-50/70 dark:bg-white/[0.02] space-y-2">
                <div className="font-bold text-slate-900 dark:text-white mb-2 pb-1 border-b border-slate-200 dark:border-white/[0.06] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Customer & Key Stakeholder</span>
                </div>
                <div><span className="text-slate-500">Customer:</span> <strong className="text-slate-900 dark:text-white ml-1">{formData.customer_name}</strong></div>
                <div><span className="text-slate-500">Corporate Domain:</span> <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold ml-1">{cleanDomain}</span></div>
                <div><span className="text-slate-500">Industry:</span> <span className="text-slate-700 dark:text-slate-300 ml-1">{formData.customer_industry}</span></div>
                <div><span className="text-slate-500">Region:</span> <span className="text-slate-700 dark:text-slate-300 ml-1">{formData.customer_country}</span></div>
                <div><span className="text-slate-500">Contact:</span> <span className="text-slate-700 dark:text-slate-300 ml-1">{formData.customer_contact_name} ({formData.customer_contact_email})</span></div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-white/[0.06] bg-slate-50/70 dark:bg-white/[0.02] space-y-2">
                <div className="font-bold text-slate-900 dark:text-white mb-2 pb-1 border-b border-slate-200 dark:border-white/[0.06] flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Opportunity Scope & Margin</span>
                </div>
                <div><span className="text-slate-500">Opportunity:</span> <strong className="text-slate-900 dark:text-white ml-1">{formData.opportunity_name}</strong></div>
                <div><span className="text-slate-500">Product:</span> <span className="text-slate-700 dark:text-slate-300 ml-1">{formData.product_type}</span></div>
                <div><span className="text-slate-500">License:</span> <span className="text-slate-700 dark:text-slate-300 ml-1">{formData.license_model}</span></div>
                <div><span className="text-slate-500">Estimated ARR:</span> <strong className="text-slate-900 dark:text-white font-mono ml-1">${dealValue.toLocaleString()} USD</strong></div>
                <div><span className="text-slate-500">Calculated Margin:</span> <strong className="text-emerald-600 dark:text-emerald-400 font-mono ml-1">{margins.total}% (~${projectedEarnings.toLocaleString()} USD)</strong></div>
                <div><span className="text-slate-500">Target Close:</span> <span className="text-slate-700 dark:text-slate-300 ml-1">{formData.estimated_close_date}</span></div>
              </div>
            </div>

            {/* Declaration Checkbox */}
            <div className="p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.declaration_agreed}
                  onChange={(e) => setFormData({ ...formData, declaration_agreed: e.target.checked })}
                  className="mt-1 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500 w-4 h-4"
                />
                <span className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  I certify that our partner organization has direct, qualified commercial engagement with this customer prospect. 
                  I acknowledge that submission places the deal into <strong>awaiting_approval</strong> status, and that 
                  the formal 90-day protection lock will become effective upon verification by the OmniPriv Channel Admin team.
                </span>
              </label>
            </div>

            <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-white/[0.06]">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-secondary text-xs px-4 py-2.5 rounded-xl font-semibold flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary text-xs px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-md shadow-cyan-500/20 disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Logging Deal in PostgreSQL...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Deal Registration</span> <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function NewDealPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading deal registration...</div>}>
      <DealRegistrationContent />
    </Suspense>
  );
}
