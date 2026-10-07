"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePartnerPortal, StatusChip, EmptyState, LoadingSkeleton } from "@/components/partner-portal/PartnerPortalContext";
import { DealRegistration, PartnerLead, RenewalOpportunity } from "@/lib/partner-portal/types";
import {
  ShieldCheck,
  Award,
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Target,
  KeyRound,
  CheckCircle2,
  Clock,
  ChevronRight,
  FileText,
  UserCheck,
} from "lucide-react";

export default function PartnerDashboardPage() {
  const { profile, tierInfo, can, user, loading: sessionLoading } = usePartnerPortal();
  const [deals, setDeals] = useState<DealRegistration[]>([]);
  const [leads, setLeads] = useState<PartnerLead[]>([]);
  const [renewals, setRenewals] = useState<RenewalOpportunity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadMetrics() {
      setLoading(true);
      try {
        const [dealsRes, leadsRes, renewalsRes] = await Promise.all([
          fetch("/api/partner/deals"),
          fetch("/api/partner/leads"),
          fetch("/api/partner/renewals"),
        ]);
        if (dealsRes.ok) {
          const d = await dealsRes.json();
          setDeals(d.deals || []);
        }
        if (leadsRes.ok) {
          const l = await leadsRes.json();
          setLeads(l.leads || []);
        }
        if (renewalsRes.ok) {
          const r = await renewalsRes.json();
          setRenewals(r.renewals || []);
        }
      } catch (err) {
        console.error("Failed to load dashboard metrics", err);
      } finally {
        setLoading(false);
      }
    }
    loadMetrics();
  }, []);

  if (sessionLoading) {
    return <LoadingSkeleton rows={5} />;
  }

  // Derive genuine action-required items from real API data
  const actionLeads = leads.filter((l) => l.status === "assigned");
  const reviewDeals = deals.filter((d) => d.status === "under_review" || d.conflict_detected);
  const expiringDeals = deals.filter((d) => d.status === "approved");

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Partner Portal
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your OmniPriv partnership, customer opportunities, enablement, and commercial requests in one place.
          </p>
        </div>

        {can("channel.deal.create") && (
          <div className="flex items-center gap-3">
            <Link
              href="/partner-portal/deals"
              className="btn-primary text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 shadow-sm font-semibold"
            >
              <Briefcase className="w-4 h-4" />
              Register Deal
            </Link>
          </div>
        )}
      </div>

      {/* Overview Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Partnership Status & Tier Card */}
        <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Partnership Status
            </span>
            <StatusChip status={profile?.program_status || "Active"} />
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-extrabold text-slate-950 dark:text-white">
              {tierInfo?.tier || profile?.current_tier || "Registered"}
            </span>
            <span className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold">Tier Partner</span>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            {profile?.partner_types?.length ? profile.partner_types.join(" & ") : "Registered Reseller"} Program
          </p>
          <div className="pt-3 border-t border-slate-100 dark:border-white/[0.05] flex items-center justify-between text-xs">
            <span className="text-slate-500">Partner Manager:</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {profile?.primary_partner_manager_name || "Assigned Channel Team"}
            </span>
          </div>
        </div>

        {/* Onboarding Status Card */}
        <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Partner Setup
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {profile?.onboarding_completed ? "Ready" : "In Progress"}
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-950 dark:text-white mb-1">
            {profile?.onboarding_completed ? "100%" : "85%"}
          </div>
          <p className="text-xs text-slate-500 mb-4">
            {profile?.onboarding_completed
              ? "All onboarding requirements satisfied."
              : "Review onboarding checklist for outstanding milestones."}
          </p>
          <div className="pt-3 border-t border-slate-100 dark:border-white/[0.05]">
            <Link
              href="/partner-portal/onboarding"
              className="text-xs text-[#00B8FF] hover:underline flex items-center justify-between font-semibold"
            >
              <span>View Onboarding Tasks</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Real Pipeline Summary Card */}
        <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Commercial Pipeline
            </span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center py-1">
            <div>
              <div className="text-xl font-bold text-slate-950 dark:text-white">{deals.length}</div>
              <div className="text-xs text-slate-500">Deals</div>
            </div>
            <div>
              <div className="text-xl font-bold text-slate-950 dark:text-white">{leads.length}</div>
              <div className="text-xs text-slate-500">Leads</div>
            </div>
            <div>
              <div className="text-xl font-bold text-slate-950 dark:text-white">{renewals.length}</div>
              <div className="text-xs text-slate-500">Renewals</div>
            </div>
          </div>
          <div className="pt-3 border-t border-slate-100 dark:border-white/[0.05] mt-3">
            <Link
              href="/partner-portal/deals"
              className="text-xs text-[#00B8FF] hover:underline flex items-center justify-between font-semibold"
            >
              <span>Manage Opportunities</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Real Action Required List */}
      <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] p-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          Action Required
        </h2>

        {actionLeads.length === 0 && reviewDeals.length === 0 ? (
          <div className="text-xs text-slate-500 dark:text-slate-400 py-3">
            No items currently require immediate attention. All assigned leads and deal protection locks are up to date.
          </div>
        ) : (
          <div className="space-y-3">
            {actionLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-white/[0.05] bg-slate-50/70 dark:bg-white/[0.02] gap-3"
              >
                <div className="flex items-start gap-3">
                  <Target className="w-4 h-4 text-cyan-500 mt-1" />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      Lead Acceptance SLA: {lead.prospect_company}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Assigned opportunity awaiting team acceptance before SLA deadline ({new Date(lead.sla_deadline).toLocaleDateString()}).
                    </p>
                  </div>
                </div>
                <Link
                  href="/partner-portal/leads"
                  className="btn-secondary text-xs px-3 py-1.5 rounded-lg self-start sm:self-auto"
                >
                  Review Lead
                </Link>
              </div>
            ))}

            {reviewDeals.map((deal) => (
              <div
                key={deal.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-white/[0.05] bg-slate-50/70 dark:bg-white/[0.02] gap-3"
              >
                <div className="flex items-start gap-3">
                  <Briefcase className="w-4 h-4 text-amber-500 mt-1" />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      Deal Under Channel Review: {deal.opportunity_name} ({deal.deal_code})
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {deal.conflict_detected
                        ? "Potential registration conflict flagged. OmniPriv Channel Admin is currently arbitrating protection rights."
                        : "Awaiting Channel Admin confirmation for 90-day protection lock."}
                    </p>
                  </div>
                </div>
                <Link
                  href="/partner-portal/deals"
                  className="btn-secondary text-xs px-3 py-1.5 rounded-lg self-start sm:self-auto"
                >
                  Inspect Deal
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/partner-portal/deals"
          className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] hover:border-cyan-500/50 transition-all shadow-sm group"
        >
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-3">
            <Briefcase className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Deals & Opportunities</h3>
          <p className="text-xs text-slate-500">Register new customer accounts and track protection locks.</p>
        </Link>

        <Link
          href="/partner-portal/leads"
          className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] hover:border-cyan-500/50 transition-all shadow-sm group"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
            <Target className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Assigned Leads</h3>
          <p className="text-xs text-slate-500">Review qualified enterprise leads assigned by OmniPriv.</p>
        </Link>

        <Link
          href="/partner-portal/requests"
          className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] hover:border-cyan-500/50 transition-all shadow-sm group"
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
            <KeyRound className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Licenses & Trials</h3>
          <p className="text-xs text-slate-500">Request 30-day PoC keys, NFR lab licenses, and quotes.</p>
        </Link>

        <Link
          href="/partner-portal/resources"
          className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] hover:border-cyan-500/50 transition-all shadow-sm group"
        >
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
            <FileText className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Resource Library</h3>
          <p className="text-xs text-slate-500">Download architecture whitepapers and technical guides.</p>
        </Link>
      </div>
    </div>
  );
}
