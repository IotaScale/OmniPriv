"use client";

import React, { useState, useEffect } from "react";
import { usePartnerPortal, StatusChip, EmptyState, LoadingSkeleton } from "@/components/partner-portal/PartnerPortalContext";
import { PartnerEntitlementRequest, EntitlementRequestType } from "@/lib/partner-portal/types";
import {
  KeyRound,
  Plus,
  Shield,
  Clock,
  CheckCircle2,
  Lock,
  X,
  FileCode,
} from "lucide-react";

export default function RequestsPage() {
  const { profile, can, refreshKey, refresh } = usePartnerPortal();
  const [requests, setRequests] = useState<PartnerEntitlementRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    request_type: "poc" as EntitlementRequestType,
    product_edition: "OmniPriv Enterprise PAM (High Availability)",
    target_customer_name: "",
    duration_days: "30",
    requested_seats: "100",
    justification: "",
  });

  useEffect(() => {
    async function loadRequests() {
      setLoading(true);
      try {
        const res = await fetch("/api/partner/requests");
        if (res.ok) {
          const data = await res.json();
          setRequests(data.requests || []);
        }
      } catch (err) {
        console.error("Failed to load requests", err);
      } finally {
        setLoading(false);
      }
    }
    loadRequests();
  }, [refreshKey]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/partner/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        refresh();
        setModalOpen(false);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to submit entitlement request");
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
            Licenses, Trials, and Requests
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Request quotes, trials, proof-of-concept access, internal-use licenses, and approved license changes.
          </p>
        </div>

        {can("channel.entitlement.request") && (
          <button
            onClick={() => setModalOpen(true)}
            className="btn-primary text-sm px-4 py-2.5 rounded-lg flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            New Entitlement Request
          </button>
        )}
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : requests.length === 0 ? (
        <EmptyState
          title="No commercial requests have been submitted"
          description="Start with a trial, quote, or internal-use NFR lab request when available to your partner tier."
          actionLabel="Request Entitlement"
          onAction={() => setModalOpen(true)}
        />
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628]/80 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Request Code & Type</th>
                  <th className="py-3 px-4">Edition / Scope</th>
                  <th className="py-3 px-4">Target Customer</th>
                  <th className="py-3 px-4">Duration & Seats</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Issued License Key</th>
                  <th className="py-3 px-4">Submitted By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                {requests.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 dark:text-white uppercase text-[11px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded inline-block mb-1">
                        {r.request_type}
                      </div>
                      <div className="font-mono text-cyan-600 dark:text-cyan-400">{r.request_code}</div>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                      {r.product_edition}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      {r.target_customer_name || "Internal Lab (NFR)"}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      <div>{r.duration_days} Days</div>
                      <div className="text-[11px] text-slate-500">{r.requested_seats} Node capacity</div>
                    </td>
                    <td className="py-3 px-4">
                      <StatusChip status={r.status} />
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-slate-700 dark:text-slate-300">
                      {r.license_key_masked || "Pending Approval"}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {r.requested_by_user_name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Request Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-white/[0.08]">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">New Entitlement Request</h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Request Type *</label>
                <select
                  value={formData.request_type}
                  onChange={(e) => setFormData({ ...formData, request_type: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
                >
                  <option value="poc">Proof of Concept (PoC) Key</option>
                  <option value="trial">Customer Trial (30 Days)</option>
                  <option value="nfr">Not-For-Resale (NFR) Partner Lab License</option>
                  <option value="quote">Commercial Quote Generation</option>
                  <option value="subscription">Subscription Provisioning</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Product Edition *</label>
                <input
                  type="text"
                  required
                  value={formData.product_edition}
                  onChange={(e) => setFormData({ ...formData, product_edition: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
                />
              </div>

              {formData.request_type !== "nfr" && (
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Customer / Account</label>
                  <input
                    type="text"
                    placeholder="e.g. Atlas Logistics Group"
                    value={formData.target_customer_name}
                    onChange={(e) => setFormData({ ...formData, target_customer_name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    value={formData.duration_days}
                    onChange={(e) => setFormData({ ...formData, duration_days: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Nodes / Seats</label>
                  <input
                    type="number"
                    value={formData.requested_seats}
                    onChange={(e) => setFormData({ ...formData, requested_seats: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Business Justification *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain testing scope, architecture needs, or client evaluation criteria..."
                  value={formData.justification}
                  onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200 dark:border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-secondary text-xs px-3 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary text-xs px-4 py-2 rounded-lg"
                >
                  {submitting ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
