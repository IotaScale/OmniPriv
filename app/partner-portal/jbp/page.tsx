"use client";

import React, { useState, useEffect } from "react";
import { usePartnerPortal, StatusChip, EmptyState, LoadingSkeleton } from "@/components/partner-portal/PartnerPortalContext";
import { JointBusinessPlan } from "@/lib/partner-portal/types";
import {
  TrendingUp,
  Plus,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  X,
} from "lucide-react";

export default function JbpPage() {
  const { can, refreshKey, refresh } = usePartnerPortal();
  const [jbps, setJbps] = useState<JointBusinessPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fiscal_year: "2026",
    revenue_target_usd: "500000",
    dedicated_sales_headcount: "3",
    dedicated_technical_headcount: "2",
    requested_omnipriv_support: "Channel SE dedication for Tier-1 banking opportunities",
    target_industries: "Banking, Financial Services, Critical Infrastructure",
    key_initiatives: "PAM migration campaign from legacy vault hardware",
  });

  useEffect(() => {
    async function loadJbps() {
      setLoading(true);
      try {
        const res = await fetch("/api/partner/jbp");
        if (res.ok) {
          const data = await res.json();
          setJbps(data.jbps || []);
        }
      } catch (err) {
        console.error("Failed to load JBPs", err);
      } finally {
        setLoading(false);
      }
    }
    loadJbps();
  }, [refreshKey]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/partner/jbp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fiscal_year: formData.fiscal_year,
          revenue_target_usd: Number(formData.revenue_target_usd),
          dedicated_sales_headcount: Number(formData.dedicated_sales_headcount),
          dedicated_technical_headcount: Number(formData.dedicated_technical_headcount),
          requested_omnipriv_support: formData.requested_omnipriv_support,
          target_industries: formData.target_industries.split(",").map((s) => s.trim()),
          key_initiatives: formData.key_initiatives.split(",").map((s) => s.trim()),
        }),
      });
      if (res.ok) {
        refresh();
        setModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Joint Business Plan
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Create a shared plan with OmniPriv for the upcoming period, including goals, target markets, planned opportunities, and requested support.
          </p>
        </div>

        {can("channel.jbp.manage_own") && (
          <button
            onClick={() => setModalOpen(true)}
            className="btn-primary text-sm px-4 py-2.5 rounded-lg flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Create Business Plan
          </button>
        )}
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : jbps.length === 0 ? (
        <EmptyState
          title="No joint business plan has been created for the current period"
          description="Save a draft while you gather information. Submit when the plan is ready for OmniPriv review."
          actionLabel="Create Plan"
          onAction={() => setModalOpen(true)}
        />
      ) : (
        <div className="space-y-4">
          {jbps.map((plan) => (
            <div
              key={plan.id}
              className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628]/80 p-6 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/[0.05] pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-base text-slate-900 dark:text-white">
                      FY{plan.fiscal_year} Joint Growth Commitment
                    </span>
                    <StatusChip status={plan.status} />
                  </div>
                  <div className="text-xs text-slate-500">
                    Annual Target: ${plan.revenue_target_usd.toLocaleString()} USD
                  </div>
                </div>

                <div className="text-xs text-slate-500 text-left sm:text-right">
                  <div>Dedicated Staff: {plan.dedicated_sales_headcount} Sales / {plan.dedicated_technical_headcount} Technical</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 dark:text-slate-300">
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white mb-1">Target Sectors</div>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-500">
                    {plan.target_industries.map((ind, i) => (
                      <li key={i}>{ind}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="font-semibold text-slate-900 dark:text-white mb-1">Requested OmniPriv Enablement</div>
                  <p className="text-slate-500">{plan.requested_omnipriv_support}</p>
                </div>
              </div>

              {plan.review_notes && (
                <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs text-emerald-800 dark:text-emerald-300">
                  <strong>Partner Manager Feedback:</strong> {plan.review_notes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* JBP Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-white/[0.08]">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Create Joint Business Plan</h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Fiscal Year</label>
                  <input
                    type="text"
                    value={formData.fiscal_year}
                    onChange={(e) => setFormData({ ...formData, fiscal_year: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Revenue (USD)</label>
                  <input
                    type="number"
                    value={formData.revenue_target_usd}
                    onChange={(e) => setFormData({ ...formData, revenue_target_usd: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Industries (Comma-separated)</label>
                <input
                  type="text"
                  value={formData.target_industries}
                  onChange={(e) => setFormData({ ...formData, target_industries: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Strategic Initiatives</label>
                <textarea
                  rows={2}
                  value={formData.key_initiatives}
                  onChange={(e) => setFormData({ ...formData, key_initiatives: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Requested OmniPriv Channel Support</label>
                <textarea
                  rows={2}
                  value={formData.requested_omnipriv_support}
                  onChange={(e) => setFormData({ ...formData, requested_omnipriv_support: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200 dark:border-white/[0.08]">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary text-xs px-3 py-2 rounded-lg">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-primary text-xs px-4 py-2 rounded-lg">
                  {submitting ? "Submitting..." : "Submit Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
