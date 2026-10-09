"use client";

import React, { useState, useEffect } from "react";
import { usePartnerPortal, StatusChip, EmptyState, LoadingSkeleton } from "@/components/partner-portal/PartnerPortalContext";
import { PartnerPayoutProfile } from "@/lib/partner-portal/types";
import {
  CreditCard,
  ShieldCheck,
  Lock,
  AlertTriangle,
  CheckCircle2,
  FileCheck,
  Building,
  EyeOff,
  History,
  X,
} from "lucide-react";

export default function PayoutProfilePage() {
  const { can, role, refreshKey, refresh } = usePartnerPortal();
  const [payout, setPayout] = useState<PartnerPayoutProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    account_holder_legal_name: "",
    bank_country: "United Kingdom",
    settlement_currency: "GBP",
    routing_code: "",
    account_number: "",
    supporting_doc_reference: "Articles of Incorporation & Certificate of Incumbency",
  });

  useEffect(() => {
    async function loadPayout() {
      setLoading(true);
      try {
        const res = await fetch("/api/partner/payout");
        if (res.ok) {
          const data = await res.json();
          setPayout(data.payout);
          if (data.payout) {
            setFormData({
              account_holder_legal_name: data.payout.account_holder_legal_name,
              bank_country: data.payout.bank_country,
              settlement_currency: data.payout.settlement_currency,
              routing_code: "",
              account_number: "",
              supporting_doc_reference: data.payout.supporting_doc_reference || "",
            });
          }
        }
      } catch (err) {
        console.error("Failed to load payout profile", err);
      } finally {
        setLoading(false);
      }
    }
    loadPayout();
  }, [refreshKey]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/partner/payout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        refresh();
        setIsEditing(false);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update payout profile");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Payout Profile
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Provide the verified account details used only for approved OmniPriv partner payouts.
        </p>
      </div>

      {/* Security notice */}
      <div className="p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.06] text-sm text-slate-700 dark:text-slate-300 flex items-start gap-3">
        <Lock className="w-5 h-5 text-[#00B8FF] shrink-0 mt-0.5" />
        <div>
          <div className="font-semibold text-slate-900 dark:text-white mb-0.5">Hardware Vault & KMS Tokenization Active</div>
          <p className="text-slate-500 dark:text-slate-400">
            For your protection, saved account details are masked. Only authorized finance reviewers can verify payout information through a controlled, audited dual-control process. Full values are never exposed to partner users.
          </p>
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : !payout && !isEditing ? (
        <EmptyState
          title="No verified payout account is on file"
          description="Add one only when requested for an approved partner payout or co-marketing disbursement."
          actionLabel="Add Payout Account"
          onAction={() => setIsEditing(true)}
        />
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628]/80 p-6 space-y-6 shadow-sm">
          {/* Header Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-white/[0.05]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Account Verification Status
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-base font-bold text-slate-900 dark:text-white">
                    {payout?.status === "verified"
                      ? "Verified for Disbursements"
                      : payout?.status === "under_review"
                      ? "Verification in Progress"
                      : "Action Required"}
                  </span>
                  <StatusChip status={payout?.status || "Draft"} />
                </div>
              </div>
            </div>

            {can("channel.payout.manage_own") && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-secondary text-xs px-3 py-1.5 rounded-lg self-start sm:self-auto"
              >
                Replace Payout Account
              </button>
            )}
          </div>

          {/* Masked Display Card */}
          {!isEditing && payout && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.05] space-y-3">
                <div>
                  <span className="text-slate-400 block mb-0.5">Legal Account Holder</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {payout.account_holder_legal_name}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Bank Country</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {payout.bank_country}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Settlement Currency</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {payout.settlement_currency}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.05] space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Routing / Sort Code</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                      {payout.routing_code_masked}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Bank Account / IBAN</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                      {payout.account_number_masked}
                    </span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-white/[0.05] text-[11px] text-slate-500">
                  Profile Version: v{payout.version} • Token: <span className="font-mono">Vault-Secured</span>
                </div>
              </div>
            </div>
          )}

          {/* Edit / Submission Form */}
          {isEditing && (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs border-t border-slate-100 dark:border-white/[0.05] pt-4">
              <div className="font-semibold text-sm text-slate-900 dark:text-white">
                Submit New Bank Settlement Details
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Legal Entity Name on Bank Account *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Exact legal name registered on corporate bank account"
                  value={formData.account_holder_legal_name}
                  onChange={(e) => setFormData({ ...formData, account_holder_legal_name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Bank Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.bank_country}
                    onChange={(e) => setFormData({ ...formData, bank_country: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Settlement Currency *
                  </label>
                  <select
                    value={formData.settlement_currency}
                    onChange={(e) => setFormData({ ...formData, settlement_currency: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
                  >
                    <option value="GBP">GBP (£)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Routing Code / Sort Code *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter routing number"
                    value={formData.routing_code}
                    onChange={(e) => setFormData({ ...formData, routing_code: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Account Number / IBAN *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter account number"
                    value={formData.account_number}
                    onChange={(e) => setFormData({ ...formData, account_number: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Supporting Verification Document Reference
                </label>
                <input
                  type="text"
                  value={formData.supporting_doc_reference}
                  onChange={(e) => setFormData({ ...formData, supporting_doc_reference: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
                />
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-800 dark:text-amber-200">
                <strong>Review Before Submit:</strong> Values will be immediately encrypted into OmniPriv KMS and permanently masked.
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary text-xs px-3 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary text-xs px-4 py-2 rounded-lg"
                >
                  {submitting ? "Encrypting..." : "Submit for Verification"}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
