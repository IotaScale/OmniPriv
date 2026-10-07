"use client";

import React, { useState, useEffect } from "react";
import { usePartnerPortal, StatusChip, EmptyState, LoadingSkeleton } from "@/components/partner-portal/PartnerPortalContext";
import { RenewalOpportunity, CommercialCustomerSummary } from "@/lib/partner-portal/types";
import {
  RefreshCw,
  Calendar,
  FileCheck,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  AlertCircle,
} from "lucide-react";

export default function RenewalsPage() {
  const { can, refreshKey, refresh } = usePartnerPortal();
  const [renewals, setRenewals] = useState<RenewalOpportunity[]>([]);
  const [summaries, setSummaries] = useState<CommercialCustomerSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [requestingId, setRequestingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadRenewals() {
      setLoading(true);
      try {
        const res = await fetch("/api/partner/renewals");
        if (res.ok) {
          const data = await res.json();
          setRenewals(data.renewals || []);
          setSummaries(data.commercialSummaries || []);
        }
      } catch (err) {
        console.error("Failed to load renewals", err);
      } finally {
        setLoading(false);
      }
    }
    loadRenewals();
  }, [refreshKey]);

  async function handleRequestQuote(renewalId: string) {
    setRequestingId(renewalId);
    try {
      const res = await fetch("/api/partner/renewals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ renewalId }),
      });
      if (res.ok) {
        refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRequestingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Renewals
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Stay ahead of upcoming renewals for the customer relationships assigned to your organization.
        </p>
      </div>

      <div className="p-4 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02] text-sm text-slate-600 dark:text-slate-400 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-900 dark:text-white">Commercial Privacy Boundary Active:</span>
          {" "}Customer technical access, vault secrets, and session histories remain strictly partitioned in client PAM silos. Only commercial entitlement dates and contracted tier models are visible.
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : renewals.length === 0 ? (
        <EmptyState
          title="No renewals are currently assigned to your organization"
          description="Approved customer accounts linked to your reseller or MSP profile will display here prior to annual contract expiration."
        />
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628]/80 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Customer Organization</th>
                  <th className="py-3 px-4">Product / Entitlement</th>
                  <th className="py-3 px-4">Annual Value (ACV)</th>
                  <th className="py-3 px-4">License Expires On</th>
                  <th className="py-3 px-4">Renewal Stage</th>
                  <th className="py-3 px-4">Owner</th>
                  <th className="py-3 px-4 text-right">Next Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                {renewals.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      {item.customer_org_name}
                    </td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                      <div>{item.product_name}</div>
                      <div className="text-[11px] text-slate-500">{item.licensed_asset_capacity} Node Capacity</div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      ${item.annual_contract_value_usd.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-800 dark:text-slate-200">
                      {item.renewal_date}
                    </td>
                    <td className="py-3 px-4">
                      <StatusChip status={item.status} />
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {item.assigned_owner}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {item.status === "upcoming" && (
                        <button
                          onClick={() => handleRequestQuote(item.id)}
                          disabled={requestingId === item.id}
                          className="btn-primary text-xs px-2.5 py-1 rounded inline-flex items-center gap-1"
                        >
                          <RefreshCw className={`w-3 h-3 ${requestingId === item.id ? "animate-spin" : ""}`} />
                          Request Renewal Review
                        </button>
                      )}
                      {item.status === "quote_requested" && (
                        <span className="text-amber-500 font-medium inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Quote in Review
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
    </div>
  );
}
