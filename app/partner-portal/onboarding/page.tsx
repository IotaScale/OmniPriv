"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePartnerPortal, StatusChip } from "@/components/partner-portal/PartnerPortalContext";
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  Users,
  FileCheck,
  GraduationCap,
  Award,
  Send,
  Building,
  CreditCard,
} from "lucide-react";

export default function OnboardingPage() {
  const { profile, refresh } = usePartnerPortal();
  const [termsAccepted, setTermsAccepted] = useState(Boolean(profile?.terms_accepted_at));
  const [savingTerms, setSavingTerms] = useState(false);

  const steps = [
    {
      id: "profile",
      title: "Complete Company Profile",
      description: "Verify your legal entity details, primary headquarters, and designated contacts.",
      status: profile?.company_name ? "Completed" : "Action Required",
      href: "/partner-portal/company",
      ctaText: "Review Profile",
    },
    {
      id: "terms",
      title: "Accept OmniPriv Channel Partner Agreement",
      description: "Review and accept the legal partner terms, code of business conduct, and security standards.",
      status: termsAccepted ? "Completed" : "Action Required",
      href: "#terms",
      ctaText: termsAccepted ? "Terms Accepted" : "Accept Agreement",
    },
    {
      id: "team",
      title: "Invite Core Team Members",
      description: "Provision access for your sales reps, presales engineers, and finance operations leads.",
      status: "Completed",
      href: "/partner-portal/company",
      ctaText: "Manage Team",
    },
    {
      id: "learning",
      title: "Complete Technical & Sales Curriculum",
      description: "Complete fundamental modules in OP-101 PAM Fundamentals & Value Proposition.",
      status: "Completed",
      href: "/partner-portal/learning",
      ctaText: "View Learning",
    },
    {
      id: "certs",
      title: "Validate Certifications for Tier Standing",
      description: "Ensure required sales and technical certificates remain valid for program eligibility.",
      status: "Completed",
      href: "/partner-portal/learning",
      ctaText: "Inspect Certifications",
    },
    {
      id: "payout",
      title: "Configure Secure Payout Profile",
      description: "Submit masked settlement bank details for future approved co-op marketing disbursements.",
      status: "Completed",
      href: "/partner-portal/payout",
      ctaText: "View Payout Account",
    },
  ];

  const completedCount = steps.filter((s) => s.status === "Completed").length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  function handleAcceptTerms() {
    setSavingTerms(true);
    setTimeout(() => {
      setTermsAccepted(true);
      setSavingTerms(false);
      refresh();
    }, 400);
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Partner Onboarding
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Complete the steps required to activate and make the most of your OmniPriv partnership.
        </p>
      </div>

      {/* Progress banner */}
      <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Activation Status: {profile?.program_status === "active" ? "Fully Activated" : "Under Review"}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {completedCount} of {steps.length} onboarding milestones satisfied for {profile?.company_name || "Partner Organization"}.
            </p>
          </div>
          <StatusChip status={profile?.program_status || "Active"} />
        </div>

        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#00B8FF] h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        {steps.map((step, idx) => (
          <div
            key={step.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] hover:border-cyan-500/40 transition-colors gap-4 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 font-bold text-xs text-slate-700 dark:text-slate-300">
                {idx + 1}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{step.title}</h3>
                  <StatusChip status={step.status} />
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            </div>

            <div className="sm:shrink-0 flex items-center gap-2">
              {step.id === "terms" && !termsAccepted ? (
                <button
                  onClick={handleAcceptTerms}
                  disabled={savingTerms}
                  className="btn-primary text-xs px-3.5 py-2 rounded-lg font-semibold"
                >
                  {savingTerms ? "Saving..." : "Accept Agreement"}
                </button>
              ) : (
                <Link
                  href={step.href}
                  className="text-xs font-semibold text-[#00B8FF] hover:underline flex items-center gap-1"
                >
                  <span>{step.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
