"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePartnerPortal, StatusChip, EmptyState, LoadingSkeleton } from "@/components/partner-portal/PartnerPortalContext";
import { MarketingFundActivity } from "@/lib/partner-portal/types";
import {
  Megaphone,
  Plus,
  Calendar,
  DollarSign,
  FileCheck,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
} from "lucide-react";

export default function MarketingPage() {
  const { can, refreshKey, refresh } = usePartnerPortal();
  const [mdfs, setMdfs] = useState<MarketingFundActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<MarketingFundActivity | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Activity Form
  const [formData, setFormData] = useState({
    activity_name: "",
    activity_type: "Conference Booth" as any,
    target_audience: "Enterprise CISOs and Security Operations Leaders",
    start_date: "2026-06-15",
    end_date: "2026-06-16",
    total_budget_usd: "10000",
    requested_mdf_amount_usd: "5000",
    expected_leads_count: "30",
  });

  // Claim Form
  const [claimData, setClaimData] = useState({
    claim_amount_usd: "5000",
    evidence_summary: "Booth photo evidence, attendee lead badge scans, and vendor invoice receipts attached.",
  });

  useEffect(() => {
    async function loadMdfs() {
      setLoading(true);
      try {
        const res = await fetch("/api/partner/mdf");
        if (res.ok) {
          const data = await res.json();
          setMdfs(data.mdfs || []);
        }
      } catch (err) {
        console.error("Failed to load MDFs", err);
      } finally {
        setLoading(false);
      }
    }
    loadMdfs();
  }, [refreshKey]);

  async function handleCreateActivity(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/partner/mdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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

  async function handleSubmitClaim(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedActivity) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/partner/mdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "claim",
          activityId: selectedActivity.id,
          ...claimData,
        }),
      });
      if (res.ok) {
        refresh();
        setClaimModalOpen(false);
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
            Marketing Funds
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Request approval for eligible co-marketing activities and track their review, completion, and claim status.
          </p>
        </div>

        {can("channel.mdf.manage_own") && (
          <button
            onClick={() => setModalOpen(true)}
            className="btn-primary text-sm px-4 py-2.5 rounded-lg flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Create Marketing Activity
          </button>
        )}
      </div>

      {/* Security Guidance Note */}
      <div className="p-4 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02] text-sm text-slate-600 dark:text-slate-400 flex items-center justify-between gap-4">
        <div>
          <span className="font-semibold text-slate-900 dark:text-white">Secure Settlement Rule:</span>
          {" "}Raw banking and payment coordinates are never gathered on MDF campaign forms. Approved claims are settled exclusively against your verified{" "}
          <Link href="/partner-portal/payout" className="text-cyan-500 font-medium hover:underline">
            Payout Profile
          </Link>.
        </div>
        <Link
          href="/partner-portal/payout"
          className="shrink-0 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-cyan-500 flex items-center gap-1"
        >
          <span>Payout Profile</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : mdfs.length === 0 ? (
        <EmptyState
          title="No marketing activities have been submitted"
          description="Create an activity when an approved co-marketing program is available."
          actionLabel="Create Activity"
          onAction={() => setModalOpen(true)}
        />
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628]/80 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Code & Activity</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Dates</th>
                  <th className="py-3 px-4">Budget Requested</th>
                  <th className="py-3 px-4">Target Leads</th>
                  <th className="py-3 px-4">Stage</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                {mdfs.map((mdf) => (
                  <tr key={mdf.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 dark:text-white">{mdf.activity_name}</div>
                      <div className="font-mono text-[11px] text-cyan-600 dark:text-cyan-400">{mdf.activity_code}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                      {mdf.activity_type}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {mdf.start_date} to {mdf.end_date}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      ${mdf.requested_mdf_amount_usd.toLocaleString()} / ${mdf.total_budget_usd.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      {mdf.expected_leads_count} Leads
                    </td>
                    <td className="py-3 px-4">
                      <StatusChip status={mdf.stage} />
                    </td>
                    <td className="py-3 px-4 text-right">
                      {mdf.stage === "approved" && (
                        <button
                          onClick={() => {
                            setSelectedActivity(mdf);
                            setClaimData({
                              claim_amount_usd: String(mdf.requested_mdf_amount_usd),
                              evidence_summary: "Booth photo evidence, attendee lead badge scans, and vendor invoice receipts attached.",
                            });
                            setClaimModalOpen(true);
                          }}
                          className="btn-primary text-xs px-2.5 py-1 rounded inline-flex items-center gap-1"
                        >
                          <FileCheck className="w-3 h-3" />
                          Submit Claim
                        </button>
                      )}
                      {mdf.stage === "claim_submitted" && (
                        <span className="text-amber-500 font-medium inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Claim in Audit
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* New Activity Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-white/[0.08]">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Create Co-Marketing Proposal</h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateActivity} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Activity Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Regional CISO Executive Roundtable & PAM Demo"
                  value={formData.activity_name}
                  onChange={(e) => setFormData({ ...formData, activity_name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Campaign Type</label>
                  <select
                    value={formData.activity_type}
                    onChange={(e) => setFormData({ ...formData, activity_type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
                  >
                    <option value="Conference Booth">Conference Booth</option>
                    <option value="Executive Dinner">Executive Dinner</option>
                    <option value="Customer Workshop">Customer Workshop</option>
                    <option value="Webinar">Webinar</option>
                    <option value="Digital Campaign">Digital Campaign</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Expected Leads</label>
                  <input
                    type="number"
                    value={formData.expected_leads_count}
                    onChange={(e) => setFormData({ ...formData, expected_leads_count: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Total Budget (USD)</label>
                  <input
                    type="number"
                    value={formData.total_budget_usd}
                    onChange={(e) => setFormData({ ...formData, total_budget_usd: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Requested Co-Funding (USD)</label>
                  <input
                    type="number"
                    value={formData.requested_mdf_amount_usd}
                    onChange={(e) => setFormData({ ...formData, requested_mdf_amount_usd: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200 dark:border-white/[0.08]">
                <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary text-xs px-3 py-2 rounded-lg">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-primary text-xs px-4 py-2 rounded-lg">
                  {submitting ? "Submitting..." : "Submit Proposal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Submit Claim Modal */}
      {claimModalOpen && selectedActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-white/[0.08]">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Submit Reimbursement Claim</h2>
                <div className="text-xs text-slate-500">{selectedActivity.activity_name}</div>
              </div>
              <button onClick={() => setClaimModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitClaim} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Claim Amount (USD) *</label>
                <input
                  type="number"
                  required
                  value={claimData.claim_amount_usd}
                  onChange={(e) => setClaimData({ ...claimData, claim_amount_usd: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Evidence & Invoices Summary *</label>
                <textarea
                  rows={3}
                  required
                  value={claimData.evidence_summary}
                  onChange={(e) => setClaimData({ ...claimData, evidence_summary: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
                />
              </div>

              <div className="p-3 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05] rounded-lg text-slate-500">
                Disbursements are credited to your active verified Payout Profile upon Channel Finance audit approval.
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200 dark:border-white/[0.08]">
                <button type="button" onClick={() => setClaimModalOpen(false)} className="btn-secondary text-xs px-3 py-2 rounded-lg">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="btn-primary text-xs px-4 py-2 rounded-lg">
                  {submitting ? "Submitting..." : "Submit Claim for Audit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
