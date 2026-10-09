"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePartnerPortal, StatusChip, EmptyState, LoadingSkeleton } from "@/components/partner-portal/PartnerPortalContext";
import { DealRegistration } from "@/lib/partner-portal/types";
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  Calendar,
  DollarSign,
  ShieldCheck,
  Building2,
  Clock,
  ArrowRight,
  ExternalLink,
  Info,
  Copy,
  Check,
  Layers,
  Sparkles,
  TrendingUp,
  Percent,
  User,
  Mail,
  Phone,
  Globe,
  ChevronRight,
  X,
} from "lucide-react";

function getPartnerMargins(tier?: string) {
  const t = (tier || "Registered").toLowerCase();
  if (t === "platinum") return { base: 30, rebate: 12, total: 42, label: "Platinum" };
  if (t === "gold") return { base: 25, rebate: 10, total: 35, label: "Gold" };
  if (t === "silver") return { base: 20, rebate: 8, total: 28, label: "Silver" };
  return { base: 15, rebate: 5, total: 20, label: "Registered" };
}

export default function MyDealsPage() {
  const { profile, tierInfo, refreshKey } = usePartnerPortal();
  const [deals, setDeals] = useState<DealRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeal, setSelectedDeal] = useState<DealRegistration | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<"overview" | "commercial" | "protection">("overview");

  const currentTier = tierInfo?.tier || profile?.current_tier || "Registered";
  const margins = getPartnerMargins(currentTier);

  useEffect(() => {
    async function loadDeals() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (statusFilter !== "all") queryParams.set("status", statusFilter);
        if (searchQuery) queryParams.set("query", searchQuery);

        const res = await fetch(`/api/partner/deals?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setDeals(data.deals || []);
        }
      } catch (err) {
        console.error("Failed to load deals", err);
      } finally {
        setLoading(false);
      }
    }
    loadDeals();
  }, [statusFilter, searchQuery, refreshKey]);

  // Aggregate metrics
  const metrics = useMemo(() => {
    const totalCount = deals.length;
    const totalArr = deals.reduce((acc, d) => acc + (Number(d.estimated_value_usd) || 0), 0);
    const awaitingReview = deals.filter((d) => d.status === "awaiting_approval");
    const protectedDeals = deals.filter((d) => d.status === "approved");
    const wonDeals = deals.filter((d) => d.status === "closed_won");

    const protectedArr = protectedDeals.reduce((acc, d) => acc + (Number(d.estimated_value_usd) || 0), 0);
    const wonArr = wonDeals.reduce((acc, d) => acc + (Number(d.estimated_value_usd) || 0), 0);

    return {
      totalCount,
      totalArr,
      awaitingCount: awaitingReview.length,
      protectedCount: protectedDeals.length,
      protectedArr,
      wonCount: wonDeals.length,
      wonArr,
    };
  }, [deals]);

  function copyToClipboard(text: string, e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 2000);
  }

  function getDaysRemaining(expiryDateStr?: string | null) {
    if (!expiryDateStr) return null;
    const expiry = new Date(expiryDateStr).getTime();
    const now = Date.now();
    const diffDays = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              My Deals
            </h1>
            <span className="text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
              {metrics.totalCount} Registered Opportunities
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Commercial pipeline and protected customer accounts registered by{" "}
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {profile?.company_name || "your organization"}
            </span>
            .
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/partner-portal/deals/new"
            className="btn-primary text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 font-semibold shadow-md shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Register a Deal</span>
          </Link>
        </div>
      </div>

      {/* Pipeline Metric Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Total Pipeline ARR</span>
            <DollarSign className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            ${metrics.totalArr.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">
            {metrics.totalCount} total opportunities
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Active Protection</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
            ${metrics.protectedArr.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80 mt-1 font-medium">
            {metrics.protectedCount} locked accounts (90-day safe)
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Awaiting Review</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">
            {metrics.awaitingCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            OmniPriv SecOps arbitration queue
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Closed Won ARR</span>
            <TrendingUp className="w-4 h-4 text-[#00B8FF]" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#00B8FF]">
            ${metrics.wonArr.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {metrics.wonCount} finalized subscriptions
          </div>
        </div>
      </div>

      {/* Filter and Quick Chips Bar */}
      <div className="space-y-3">
        {/* Quick Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 flex items-center gap-1.5 ${
              statusFilter === "all"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-sm"
                : "bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:border-cyan-500/40"
            }`}
          >
            <span>All Deals</span>
            <span className="opacity-70 font-mono">({metrics.totalCount})</span>
          </button>
          <button
            onClick={() => setStatusFilter("awaiting_approval")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 flex items-center gap-1.5 ${
              statusFilter === "awaiting_approval"
                ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                : "bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:border-amber-500/40"
            }`}
          >
            <Clock className="w-3 h-3 text-amber-500" />
            <span>Awaiting Review</span>
            <span className="opacity-70 font-mono">({metrics.awaitingCount})</span>
          </button>
          <button
            onClick={() => setStatusFilter("approved")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 flex items-center gap-1.5 ${
              statusFilter === "approved"
                ? "bg-emerald-500 text-slate-950 font-bold shadow-sm"
                : "bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:border-emerald-500/40"
            }`}
          >
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span>Active Protection</span>
            <span className="opacity-70 font-mono">({metrics.protectedCount})</span>
          </button>
          <button
            onClick={() => setStatusFilter("closed_won")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 flex items-center gap-1.5 ${
              statusFilter === "closed_won"
                ? "bg-[#00B8FF] text-slate-950 font-bold shadow-sm"
                : "bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:border-[#00B8FF]/40"
            }`}
          >
            <span>Closed Won</span>
            <span className="opacity-70 font-mono">({metrics.wonCount})</span>
          </button>
          <button
            onClick={() => setStatusFilter("declined")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
              statusFilter === "declined"
                ? "bg-rose-500 text-white font-bold shadow-sm"
                : "bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:border-rose-500/40"
            }`}
          >
            Declined
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0A1628] p-3 rounded-xl border border-slate-200 dark:border-white/[0.08] shadow-sm">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by customer, deal reference code (DR-...), or opportunity title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
            <Percent className="w-3.5 h-3.5 text-cyan-500" />
            <span>Your Effective Tier Margin:</span>
            <span className="font-bold text-slate-900 dark:text-white font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20">
              {margins.total}% ({margins.base}% base + {margins.rebate}% deal reg)
            </span>
          </div>
        </div>
      </div>

      {/* Deals Table */}
      {loading ? (
        <LoadingSkeleton rows={5} />
      ) : deals.length === 0 ? (
        <EmptyState
          title={statusFilter !== "all" || searchQuery ? "No matching deals found" : "No deals registered yet"}
          description={
            statusFilter !== "all" || searchQuery
              ? "Try adjusting your search criteria or resetting the status filter."
              : "Register your customer opportunities to lock in 90-day account protection and guarantee deal registration margin discounts."
          }
          actionLabel={statusFilter !== "all" || searchQuery ? "Clear Filters" : "Register Your First Opportunity"}
          onAction={() => {
            if (statusFilter !== "all" || searchQuery) {
              setStatusFilter("all");
              setSearchQuery("");
            } else {
              window.location.assign("/partner-portal/deals/new");
            }
          }}
        />
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-slate-400 uppercase font-semibold text-[11px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Opportunity & Customer</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Target Product</th>
                  <th className="py-3.5 px-4">Est. Value (ARR)</th>
                  <th className="py-3.5 px-4">Estimated Margin</th>
                  <th className="py-3.5 px-4">Protection Expiry</th>
                  <th className="py-3.5 px-4">Est. Close</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                {deals.map((deal) => {
                  const estValue = Number(deal.estimated_value_usd) || 0;
                  const estimatedMarginDollar = Math.round(estValue * (margins.total / 100));
                  const expiryDate = deal.protection_expires_at || deal.deal_protection_expiry;
                  const daysRemaining = getDaysRemaining(expiryDate);
                  const isProtected = deal.status === "approved" && daysRemaining !== null && daysRemaining > 0;

                  return (
                    <tr
                      key={deal.id}
                      onClick={() => setSelectedDeal(deal)}
                      className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5 group-hover:text-cyan-500 transition-colors">
                          <span>{deal.opportunity_name}</span>
                          {deal.conflict_detected && (
                            <span
                              title={deal.conflict_notes || "Domain conflict detected"}
                              className="text-amber-500 flex items-center gap-0.5 bg-amber-500/10 px-1.5 py-0.5 rounded text-[10px] font-medium"
                            >
                              <AlertTriangle className="w-3 h-3" />
                              Conflict
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-slate-500 dark:text-slate-400">
                          <span className="font-medium text-slate-700 dark:text-slate-300">
                            {deal.customer_name}
                          </span>
                          <span>•</span>
                          <span className="text-[11px] font-mono text-slate-400">
                            {deal.customer_domain}
                          </span>
                          <span>•</span>
                          <button
                            type="button"
                            onClick={(e) => copyToClipboard(deal.deal_code, e)}
                            className="font-mono text-cyan-600 dark:text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-cyan-500/10 px-1.5 py-0.5 rounded transition-all"
                            title="Click to copy Deal Reference Code"
                          >
                            <span>{deal.deal_code}</span>
                            {copiedCode === deal.deal_code ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-2.5 h-2.5 opacity-60" />
                            )}
                          </button>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <StatusChip status={deal.status} />
                      </td>

                      <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                        <div className="font-medium truncate max-w-[190px]">
                          {Array.isArray(deal.target_products) ? deal.target_products[0] : "OmniPriv Enterprise PAM"}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {deal.license_model || "Annual Subscription"}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white font-mono text-sm">
                        ${estValue.toLocaleString()} USD
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                          ~${estimatedMarginDollar.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium">
                          {margins.total}% effective
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        {deal.status === "approved" && expiryDate ? (
                          isProtected ? (
                            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20 w-fit">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>{daysRemaining}d left</span>
                            </div>
                          ) : (
                            <div className="text-slate-400 font-medium">Expired</div>
                          )
                        ) : deal.status === "declined" ? (
                          <span className="text-rose-500 font-medium">Protection Denied</span>
                        ) : (
                          <div className="flex items-center gap-1 text-amber-500 font-medium">
                            <Clock className="w-3 h-3" />
                            <span>Pending Review</span>
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-medium">
                        {deal.estimated_close_date
                          ? new Date(deal.estimated_close_date).toLocaleDateString()
                          : "—"}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedDeal(deal)}
                          className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-300 group-hover:translate-x-0.5 transition-all inline-flex items-center gap-1"
                        >
                          <span>View Details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upgraded Deal Detail Inspection Modal */}
      {selectedDeal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#070E1B] rounded-2xl border border-slate-200 dark:border-white/10 p-6 sm:p-7 max-w-2xl w-full shadow-2xl space-y-5 text-xs animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-white/[0.08] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/20">
                    {selectedDeal.deal_code}
                  </span>
                  <StatusChip status={selectedDeal.status} />
                  {selectedDeal.conflict_detected && (
                    <span className="bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1 border border-amber-500/20">
                      <AlertTriangle className="w-3 h-3" />
                      Conflict Flagged
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedDeal.opportunity_name}
                </h2>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mt-1">
                  <Building2 className="w-3.5 h-3.5" />
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedDeal.customer_name}
                  </span>
                  <span>•</span>
                  <Globe className="w-3.5 h-3.5" />
                  <span>{selectedDeal.customer_domain}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedDeal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/[0.08] pb-2">
              <button
                onClick={() => setActiveModalTab("overview")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activeModalTab === "overview"
                    ? "bg-slate-900 text-white dark:bg-white/10 dark:text-white font-bold"
                    : "text-slate-500 dark:text-slate-400 hover:text-white"
                }`}
              >
                Opportunity Scope
              </button>
              <button
                onClick={() => setActiveModalTab("commercial")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                  activeModalTab === "commercial"
                    ? "bg-slate-900 text-white dark:bg-white/10 dark:text-white font-bold"
                    : "text-slate-500 dark:text-slate-400 hover:text-white"
                }`}
              >
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>Commercial & Margin</span>
              </button>
              <button
                onClick={() => setActiveModalTab("protection")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
                  activeModalTab === "protection"
                    ? "bg-slate-900 text-white dark:bg-white/10 dark:text-white font-bold"
                    : "text-slate-500 dark:text-slate-400 hover:text-white"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#00B8FF]" />
                <span>Protection Status</span>
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeModalTab === "overview" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.05]">
                    <div className="text-slate-500 dark:text-slate-400 text-[11px] mb-1">Target Product</div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {Array.isArray(selectedDeal.target_products)
                        ? selectedDeal.target_products.join(", ")
                        : selectedDeal.target_products || "OmniPriv Enterprise PAM"}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.05]">
                    <div className="text-slate-500 dark:text-slate-400 text-[11px] mb-1">Licensing Model</div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {selectedDeal.license_model || "Annual Subscription"}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.05]">
                    <div className="text-slate-500 dark:text-slate-400 text-[11px] mb-1">Estimated Close Date</div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {selectedDeal.estimated_close_date
                        ? new Date(selectedDeal.estimated_close_date).toLocaleDateString()
                        : "Not specified"}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.05]">
                    <div className="text-slate-500 dark:text-slate-400 text-[11px] mb-1">Estimated Privileged Seats</div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {selectedDeal.estimated_seats || "50-250 seats"}
                    </div>
                  </div>
                </div>

                {/* Customer Contact Card */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.05]">
                  <div className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Customer Decision Maker / Point of Contact</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-300">
                    <div>
                      <span className="text-slate-400">Contact:</span>{" "}
                      <span className="font-medium text-slate-900 dark:text-white">
                        {selectedDeal.customer_contact_name || "Enterprise IT Team"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400">Email:</span>{" "}
                      <span className="font-mono text-cyan-600 dark:text-cyan-400">
                        {selectedDeal.customer_contact_email || "Not specified"}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400">Industry:</span>{" "}
                      <span>{selectedDeal.customer_industry || "Enterprise"}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Country:</span>{" "}
                      <span>{selectedDeal.customer_country || "United States"}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Commercial & Margin */}
            {activeModalTab === "commercial" && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-transparent border border-emerald-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                      Calculated Commercial Return ({margins.label} Tier)
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                      {margins.total}% Total Margin
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 my-3 text-center">
                    <div className="p-2.5 rounded-lg bg-black/20 border border-white/5">
                      <div className="text-[10px] text-slate-400">Total ARR</div>
                      <div className="text-sm font-black text-white font-mono mt-0.5">
                        ${Number(selectedDeal.estimated_value_usd).toLocaleString()}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/20 border border-white/5">
                      <div className="text-[10px] text-slate-400">Base Margin ({margins.base}%)</div>
                      <div className="text-sm font-black text-slate-200 font-mono mt-0.5">
                        ${Math.round(Number(selectedDeal.estimated_value_usd) * (margins.base / 100)).toLocaleString()}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/20 border border-emerald-500/20">
                      <div className="text-[10px] text-emerald-400 font-semibold">Deal Reg Bonus (+{margins.rebate}%)</div>
                      <div className="text-sm font-black text-emerald-400 font-mono mt-0.5">
                        +${Math.round(Number(selectedDeal.estimated_value_usd) * (margins.rebate / 100)).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-emerald-500/20 text-xs">
                    <span className="font-semibold text-slate-300">Net Partner Profit on Closing:</span>
                    <span className="font-black text-base text-emerald-400 font-mono">
                      ~${Math.round(Number(selectedDeal.estimated_value_usd) * (margins.total / 100)).toLocaleString()} USD
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 leading-relaxed p-3 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.05]">
                  <strong className="text-slate-300">Commercial Margin Rule:</strong> Approved deal registrations protect your pricing quotation. If another partner attempts to quote this domain during your protection window, OmniPriv grants deal registration rebate discounts exclusively to your account.
                </div>
              </div>
            )}

            {/* Tab 3: Protection Status & Governance */}
            {activeModalTab === "protection" && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.05] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Protection Lock Expiry:</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {selectedDeal.protection_expires_at || selectedDeal.deal_protection_expiry
                        ? new Date(selectedDeal.protection_expires_at || selectedDeal.deal_protection_expiry!).toLocaleDateString()
                        : "Awaiting Channel Admin Approval"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Submission Timestamp:</span>
                    <span className="font-mono text-slate-300">
                      {new Date(selectedDeal.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Protection Extension Count:</span>
                    <span className="font-semibold text-slate-200">
                      {(selectedDeal as any).extension_count || 0} / 2 Allowed
                    </span>
                  </div>
                </div>

                {selectedDeal.conflict_detected && (
                  <div className="p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs">
                    <div className="font-bold flex items-center gap-1.5 mb-1">
                      <AlertTriangle className="w-4 h-4" />
                      Domain Conflict Notice
                    </div>
                    <p className="text-[11px] text-slate-300 leading-normal">
                      {selectedDeal.conflict_notes || "Another partner organization holds or recently registered an opportunity with this customer domain. OmniPriv Channel Management arbitrates protection rights."}
                    </p>
                  </div>
                )}

                {selectedDeal.review_notes && (
                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.02]">
                    <div className="font-bold text-slate-900 dark:text-white mb-1">OmniPriv Channel Admin Review Notes:</div>
                    <div className="text-slate-600 dark:text-slate-300">{selectedDeal.review_notes}</div>
                  </div>
                )}
              </div>
            )}

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-100 dark:border-white/[0.08] flex items-center justify-between">
              <button
                type="button"
                onClick={() => copyToClipboard(selectedDeal.deal_code)}
                className="btn-secondary text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 font-medium"
              >
                {copiedCode === selectedDeal.deal_code ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied Reference!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy Deal Ref ({selectedDeal.deal_code})</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setSelectedDeal(null)}
                className="btn-secondary text-xs px-4 py-2 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
