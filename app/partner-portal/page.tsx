"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { usePartnerPortal, StatusChip, EmptyState, LoadingSkeleton } from "@/components/partner-portal/PartnerPortalContext";
import { DealRegistration, PartnerLead, RenewalOpportunity } from "@/lib/partner-portal/types";
import {
  ShieldCheck,
  Award,
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Target,
  RefreshCw,
  CheckCircle2,
  Clock,
  ChevronRight,
  FileText,
  Building,
  PlusCircle,
  Sparkles,
  DollarSign,
} from "lucide-react";

function PartnerDashboardContent() {
  const searchParams = useSearchParams();
  const isWelcome = searchParams.get("welcome") === "true";

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

  // Derive genuine metrics from PostgreSQL data
  const openDeals = deals.filter((d) => !["closed_won", "closed_lost", "declined", "expired"].includes(d.status));
  const reviewDeals = deals.filter((d) => ["awaiting_approval", "under_review", "submitted"].includes(d.status) || d.conflict_detected);
  const approvedDeals = deals.filter((d) => d.status === "approved");
  const actionLeads = leads.filter((l) => l.status === "assigned");
  const totalPipelineARR = openDeals.reduce((sum, d) => sum + Number(d.estimated_value_usd || 0), 0);
  const approvedPipelineARR = approvedDeals.reduce((sum, d) => sum + Number(d.estimated_value_usd || 0), 0);

  return (
    <div className="space-y-8">
      {/* Welcome Banner for Newly Registered Organizations */}
      {isWelcome && (
        <div className="p-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 via-cyan-500/5 to-transparent text-cyan-950 dark:text-cyan-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg backdrop-blur-xl">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-[#00B8FF] flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Welcome to OmniPriv Channel Partner Program
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5 max-w-xl leading-relaxed">
                Your company is enrolled at the <strong>Registered</strong> tier with immediate operational workspace access. 
                You can now register customer opportunities, manage assigned leads, and download enablement resources.
              </p>
            </div>
          </div>
          <Link
            href="/partner-portal/deals/new"
            className="btn-primary text-xs px-4 py-2.5 rounded-xl font-bold shrink-0 shadow-md flex items-center gap-1.5"
          >
            Register Your First Deal <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Channel Admin Notice */}
      {(user?.role === "Channel Admin" || user?.role === "Partner Manager") && (
        <div className="p-5 rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950/80 via-slate-900 to-cyan-950/80 border-l-4 border-l-[#00B8FF] text-cyan-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-[#00B8FF] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white">OmniPriv Channel Administration</h2>
                <span className="text-[10px] font-mono uppercase bg-cyan-500/20 text-[#00B8FF] px-2 py-0.5 rounded font-semibold border border-cyan-500/30">
                  Internal Purview
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                You are currently inside a single tenant workspace. To review and arbitrate all registered deals, domain collisions, and partner organizations across the entire channel, open the <strong>Channel Administration Console</strong>.
              </p>
            </div>
          </div>
          <Link
            href="/channel-admin"
            className="btn-primary text-xs px-4 py-2.5 rounded-xl font-bold shrink-0 shadow-md flex items-center gap-2"
          >
            Open Channel Admin Console <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="badge-cyan font-semibold">Kaspersky-Model B2B Workspace</div>
            <span className="text-[11px] font-mono text-slate-400">
              Org: {profile?.company_name || user?.orgName}
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Partner Workspace Overview
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time pipeline, deal protection registrations, and assigned customer leads for your organization.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/partner-portal/deals/new"
            className="btn-primary text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20 font-bold"
          >
            <PlusCircle className="w-4 h-4" />
            Register a Deal
          </Link>
        </div>
      </div>

      {/* Live Operational Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Metric 1: Total Pipeline ARR */}
        <div className="relative overflow-hidden p-5 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#070D18] shadow-md hover:shadow-cyan-500/10 hover:border-cyan-500/30 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Pipeline</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            ${(totalPipelineARR / 1000).toFixed(0)}k <span className="text-xs font-normal text-slate-400">USD</span>
          </div>
          <p className="text-[11px] text-emerald-500 mt-1 font-medium">
            ${(approvedPipelineARR / 1000).toFixed(0)}k protected lock
          </p>
        </div>

        {/* Metric 2: Open Deals */}
        <div className="relative overflow-hidden p-5 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#070D18] shadow-md hover:shadow-cyan-500/10 hover:border-cyan-500/30 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Deals</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-[#00B8FF] flex items-center justify-center">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            {openDeals.length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Commercial opportunities</p>
        </div>

        {/* Metric 3: Deals Awaiting Review */}
        <div className="relative overflow-hidden p-5 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#070D18] shadow-md hover:shadow-amber-500/10 hover:border-amber-500/30 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Under Review</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-500 tracking-tight">
            {reviewDeals.length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Pending vendor review</p>
        </div>

        {/* Metric 4: Approved / Protected Deals */}
        <div className="relative overflow-hidden p-5 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#070D18] shadow-md hover:shadow-emerald-500/10 hover:border-emerald-500/30 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Protected Locks</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-500 tracking-tight">
            {approvedDeals.length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">90-day protection lock</p>
        </div>

        {/* Metric 5: Assigned Leads */}
        <div className="relative overflow-hidden p-5 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#070D18] shadow-md hover:shadow-rose-500/10 hover:border-rose-500/30 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assigned Leads</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            {actionLeads.length}
          </div>
          <p className="text-[11px] text-rose-500 mt-1 font-medium">Awaiting team SLA response</p>
        </div>
      </div>

      {/* Action Required Feed (Real Data Only) */}
      {(actionLeads.length > 0 || reviewDeals.length > 0) && (
        <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Action Required
          </h2>

          <div className="space-y-3">
            {actionLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-white/[0.05] bg-slate-50/70 dark:bg-white/[0.02] gap-3"
              >
                <div className="flex items-start gap-3">
                  <Target className="w-4 h-4 text-cyan-500 mt-1 shrink-0" />
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
                  className="btn-secondary text-xs px-3.5 py-1.5 rounded-lg self-start sm:self-auto font-semibold"
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
                  <Briefcase className="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      Deal Under Channel Review: {deal.opportunity_name} ({deal.deal_code})
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {deal.conflict_detected
                        ? "Domain conflict flagged. OmniPriv Channel Admin is currently arbitrating protection rights."
                        : "Awaiting Channel Admin confirmation for 90-day protection lock."}
                    </p>
                  </div>
                </div>
                <Link
                  href="/partner-portal/deals"
                  className="btn-secondary text-xs px-3.5 py-1.5 rounded-lg self-start sm:self-auto font-semibold"
                >
                  Inspect Deal
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Opportunities Table (When Deals Exist) */}
      {deals.length > 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#070D18] overflow-hidden shadow-md">
          <div className="p-5 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-[#00B8FF] flex items-center justify-center">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Recent Registered Opportunities
                </h2>
                <p className="text-[11px] text-slate-500">Live pipeline and protection lock status</p>
              </div>
            </div>
            <Link
              href="/partner-portal/deals"
              className="text-xs font-bold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
            >
              View All Deals ({deals.length}) &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.08] text-slate-500 uppercase font-semibold text-[11px]">
                <tr>
                  <th className="py-3 px-4">Opportunity & Customer</th>
                  <th className="py-3 px-4">Deal Code</th>
                  <th className="py-3 px-4">Contract Value</th>
                  <th className="py-3 px-4">Protection & Expiry</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                {deals.slice(0, 5).map((deal) => (
                  <tr key={deal.id} className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 dark:text-white">{deal.opportunity_name}</div>
                      <div className="flex items-center gap-1.5 text-slate-400 mt-0.5 text-[11px]">
                        <span>{deal.customer_name}</span>
                        <span>•</span>
                        <span className="font-mono text-cyan-600 dark:text-cyan-400">{deal.customer_domain}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      {deal.deal_code}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      ${Number(deal.estimated_value_usd || 0).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      {deal.status === "approved" && deal.protection_expires_at ? (
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Locked: {new Date(deal.protection_expires_at).toLocaleDateString()}</span>
                        </div>
                      ) : deal.conflict_detected ? (
                        <span className="text-[10px] text-amber-500 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                          Conflict Under Arbitration
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400">Review in Progress</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <StatusChip status={deal.status} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href="/partner-portal/deals"
                        className="btn-secondary text-[11px] px-2.5 py-1 rounded-lg font-semibold inline-flex items-center gap-1 hover:border-cyan-500/40"
                      >
                        Details <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Useful Empty States when no records exist */}
      {deals.length === 0 && (
        <EmptyState
          title="Register your first customer opportunity"
          description="Register prospective OmniPriv PAM enterprise engagements to lock in 90-day deal protection and receive vendor co-selling assistance."
          actionLabel="Register an Opportunity"
          onAction={() => window.location.assign("/partner-portal/deals/new")}
        />
      )}

      {leads.length === 0 && (
        <div className="p-6 rounded-xl border border-dashed border-slate-200 dark:border-white/[0.08] text-center text-xs text-slate-500">
          No leads have been assigned to your company yet. As enterprise prospect requests arrive in your territory, they will appear here with an acceptance SLA.
        </div>
      )}

      {renewals.length === 0 && (
        <div className="p-6 rounded-xl border border-dashed border-slate-200 dark:border-white/[0.08] text-center text-xs text-slate-500">
          No upcoming customer renewals currently scheduled for your organization.
        </div>
      )}

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/partner-portal/deals/new"
          className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] hover:border-cyan-500/50 transition-all shadow-sm group"
        >
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-3">
            <PlusCircle className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Register a Deal</h3>
          <p className="text-xs text-slate-500">Submit customer opportunities for 90-day vendor protection lock.</p>
        </Link>

        <Link
          href="/partner-portal/deals"
          className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] hover:border-cyan-500/50 transition-all shadow-sm group"
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
            <Briefcase className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">My Deals</h3>
          <p className="text-xs text-slate-500">Track approved deals, review statuses, and pipeline ARR.</p>
        </Link>

        <Link
          href="/partner-portal/leads"
          className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] hover:border-cyan-500/50 transition-all shadow-sm group"
        >
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
            <Target className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Assigned Leads</h3>
          <p className="text-xs text-slate-500">Review, accept, and convert inbound enterprise PAM leads.</p>
        </Link>

        <Link
          href="/partner-portal/resources"
          className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] hover:border-cyan-500/50 transition-all shadow-sm group"
        >
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
            <FileText className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Resources & Enablement</h3>
          <p className="text-xs text-slate-500">Sales battlecards, architecture collateral, and onboarding kits.</p>
        </Link>
      </div>
    </div>
  );
}

export default function PartnerDashboardPage() {
  return (
    <Suspense fallback={<LoadingSkeleton rows={5} />}>
      <PartnerDashboardContent />
    </Suspense>
  );
}
