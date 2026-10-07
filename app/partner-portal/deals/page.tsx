"use client";

import React, { useState, useEffect } from "react";
import { usePartnerPortal, StatusChip, EmptyState, LoadingSkeleton } from "@/components/partner-portal/PartnerPortalContext";
import { DealRegistration } from "@/lib/partner-portal/types";
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  DollarSign,
  ArrowRight,
  X,
  ShieldAlert,
} from "lucide-react";

export default function DealsPage() {
  const { profile, can, refreshKey, refresh } = usePartnerPortal();
  const [deals, setDeals] = useState<DealRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [conflictAlert, setConflictAlert] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_domain: "",
    customer_country: "United Kingdom",
    opportunity_name: "",
    estimated_value_usd: "75000",
    estimated_close_date: "2026-09-30",
    estimated_seats: "250",
    license_model: "Annual Subscription" as "Annual Subscription" | "Perpetual" | "MSP Consumption",
    target_products: ["Credential Management", "Secure Remote Access"],
  });

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

  async function handleSubmitDeal(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setConflictAlert(null);

    try {
      const res = await fetch("/api/partner/deals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          estimated_value_usd: Number(formData.estimated_value_usd),
          estimated_seats: Number(formData.estimated_seats),
          partner_org_id: profile?.partner_org_id,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to submit deal.");
      } else {
        if (data.deal.conflict_detected) {
          setConflictAlert(data.deal.conflict_notes || "A registration overlap was detected. The submission has been placed under Channel Review.");
        }
        refresh();
        setIsWizardOpen(false);
        setWizardStep(1);
      }
    } catch (err) {
      console.error(err);
      alert("Submission error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Deals
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Register and track customer opportunities. Approved deals receive the commercial protection defined by the OmniPriv partner program.
          </p>
        </div>

        {can("channel.deal.create") && (
          <button
            onClick={() => {
              setConflictAlert(null);
              setIsWizardOpen(true);
            }}
            className="btn-primary text-xs px-4 py-2.5 rounded-lg flex items-center gap-2 self-start sm:self-auto font-semibold shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Register Deal
          </button>
        )}
      </div>

      {conflictAlert && (
        <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold mb-0.5">Commercial Conflict Notice</div>
            <div className="leading-relaxed">{conflictAlert}</div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0A1628] p-3 rounded-xl border border-slate-200 dark:border-white/[0.08] shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer, deal code, or opportunity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-xs rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          >
            <option value="all">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="under_review">Under Review</option>
            <option value="submitted">Submitted</option>
            <option value="declined">Declined</option>
          </select>
        </div>
      </div>

      {/* Deals Table */}
      {loading ? (
        <LoadingSkeleton rows={5} />
      ) : deals.length === 0 ? (
        <EmptyState
          title="No deals have been registered yet"
          description="Register an opportunity to request deal protection. Once approved, the deal is locked against competitor registration for 90 days."
          actionLabel="Register an Opportunity"
          onAction={() => setIsWizardOpen(true)}
        />
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.08] text-slate-500 uppercase font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Opportunity</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Estimated Value</th>
                  <th className="py-3.5 px-4">Close Date</th>
                  <th className="py-3.5 px-4">Protection Expires</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                {deals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-sm text-slate-900 dark:text-white">{deal.opportunity_name}</div>
                      <div className="font-mono text-xs text-cyan-600 dark:text-cyan-400 mt-0.5">{deal.deal_code}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{deal.customer_name}</div>
                      <div className="text-xs text-slate-400">{deal.customer_country}</div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      ${deal.estimated_value_usd.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      {deal.estimated_close_date}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                      {deal.deal_protection_expiry || "—"}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <StatusChip status={deal.status} />
                        {deal.conflict_detected && (
                          <span title={deal.conflict_notes} className="text-amber-500 cursor-help">
                            <AlertTriangle className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {deal.created_by_user_name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3-Step Deal Registration Wizard Modal */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/10 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-white/[0.08]">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Register Opportunity
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Step {wizardStep} of 3: {wizardStep === 1 ? "Deal Details" : wizardStep === 2 ? "Product and Scope" : "Review and Submit"}
                </p>
              </div>
              <button
                onClick={() => setIsWizardOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitDeal} className="p-6 space-y-4">
              {wizardStep === 1 && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Customer / Prospect Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Financial Corp"
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Customer Primary Domain *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. apexfinancial.com"
                      value={formData.customer_domain}
                      onChange={(e) => setFormData({ ...formData, customer_domain: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Opportunity Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Zero-Trust Hybrid Bastion Replacement"
                      value={formData.opportunity_name}
                      onChange={(e) => setFormData({ ...formData, opportunity_name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        value={formData.customer_country}
                        onChange={(e) => setFormData({ ...formData, customer_country: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Estimated Close Date
                      </label>
                      <input
                        type="date"
                        value={formData.estimated_close_date}
                        onChange={(e) => setFormData({ ...formData, estimated_close_date: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Estimated Deal Value (USD) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.estimated_value_usd}
                      onChange={(e) => setFormData({ ...formData, estimated_value_usd: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Estimated Privileged Seats / Nodes
                    </label>
                    <input
                      type="number"
                      value={formData.estimated_seats}
                      onChange={(e) => setFormData({ ...formData, estimated_seats: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      License Model
                    </label>
                    <select
                      value={formData.license_model}
                      onChange={(e) => setFormData({ ...formData, license_model: e.target.value as any })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg text-xs"
                    >
                      <option value="Annual Subscription">Annual Subscription (Recommended)</option>
                      <option value="Perpetual">Perpetual License + Annual Maintenance</option>
                      <option value="MSP Consumption">MSP Monthly Consumption</option>
                    </select>
                  </div>
                </div>
              )}

              {wizardStep === 3 && (
                <div className="space-y-3 text-xs bg-slate-50 dark:bg-white/[0.02] p-4 rounded-xl border border-slate-200 dark:border-white/[0.05]">
                  <div className="font-bold text-slate-900 dark:text-white mb-2">
                    Submission Summary Snapshot
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 text-slate-600 dark:text-slate-300">
                    <div><span className="text-slate-400">Customer:</span> {formData.customer_name}</div>
                    <div><span className="text-slate-400">Domain:</span> {formData.customer_domain}</div>
                    <div><span className="text-slate-400">Estimated Value:</span> ${Number(formData.estimated_value_usd).toLocaleString()}</div>
                    <div><span className="text-slate-400">Target Seats:</span> {formData.estimated_seats}</div>
                    <div><span className="text-slate-400">Model:</span> {formData.license_model}</div>
                    <div><span className="text-slate-400">Close Date:</span> {formData.estimated_close_date}</div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                    Upon submission, automated conflict arbitration will check for existing active registrations. Deal protection lock will apply for 90 days if approved.
                  </p>
                </div>
              )}

              {/* Wizard Nav Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/[0.08]">
                {wizardStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setWizardStep((s) => s - 1)}
                    className="btn-secondary text-xs px-3 py-2 rounded-lg"
                  >
                    Back
                  </button>
                ) : <div />}

                {wizardStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => setWizardStep((s) => s + 1)}
                    className="btn-primary text-xs px-4 py-2 rounded-lg font-semibold"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 font-semibold"
                  >
                    {submitting ? "Submitting..." : "Submit for Deal Protection"}
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
