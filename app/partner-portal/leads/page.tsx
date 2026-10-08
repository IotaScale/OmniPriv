"use client";

import React, { useState, useEffect } from "react";
import { usePartnerPortal, StatusChip, EmptyState, LoadingSkeleton } from "@/components/partner-portal/PartnerPortalContext";
import { PartnerLead } from "@/lib/partner-portal/types";
import {
  Target,
  Clock,
  CheckCircle2,
  XCircle,
  Briefcase,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function LeadsPage() {
  const { can, refreshKey, refresh } = usePartnerPortal();
  const [leads, setLeads] = useState<PartnerLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  useEffect(() => {
    async function loadLeads() {
      setLoading(true);
      try {
        const res = await fetch("/api/partner/leads");
        if (res.ok) {
          const data = await res.json();
          setLeads(data.leads || []);
        }
      } catch (err) {
        console.error("Failed to load leads", err);
      } finally {
        setLoading(false);
      }
    }
    loadLeads();
  }, [refreshKey]);

  async function handleLeadAction(leadId: string, action: "accept" | "decline" | "convert") {
    setActionInProgress(leadId);
    try {
      const res = await fetch("/api/partner/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, action }),
      });
      if (res.ok) {
        refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Action failed.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionInProgress(null);
    }
  }

  const pendingLeads = leads.filter((l) => l.status === "assigned");

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Leads
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Review qualified opportunities assigned to your organization and keep their progress up to date.
        </p>
      </div>

      {/* SLA Alert banner */}
      {pendingLeads.length > 0 && (
        <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-950 dark:text-cyan-200 text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[#00B8FF] shrink-0" />
            <span>
              <strong>Action Required:</strong> Accept or decline assigned leads before their SLA deadline to maintain priority tier lead routing.
            </span>
          </div>
          <span className="font-mono font-bold bg-cyan-500/20 px-2.5 py-1 rounded text-xs shrink-0">
            {pendingLeads.length} Pending Acceptance
          </span>
        </div>
      )}

      {loading ? (
        <LoadingSkeleton rows={4} />
      ) : leads.length === 0 ? (
        <EmptyState
          title="There are no active leads assigned to your organization"
          description="New qualified leads will appear here when assigned by OmniPriv based on your regional tier and certified specializations."
        />
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.08] text-slate-500 uppercase font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Prospect & Scope</th>
                  <th className="py-3.5 px-4">Country</th>
                  <th className="py-3.5 px-4">Assigned On</th>
                  <th className="py-3.5 px-4">SLA Deadline</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-sm text-slate-900 dark:text-white">{lead.prospect_company}</div>
                      <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">{lead.estimated_scope}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                      {lead.prospect_country}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {new Date(lead.assigned_at).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-medium text-slate-800 dark:text-slate-200">
                        {new Date(lead.sla_deadline).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusChip status={lead.status} />
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      {lead.status === "assigned" && (
                        <>
                          <button
                            onClick={() => handleLeadAction(lead.id, "accept")}
                            disabled={actionInProgress === lead.id}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-3 py-1.5 rounded-lg text-xs transition-colors"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleLeadAction(lead.id, "decline")}
                            disabled={actionInProgress === lead.id}
                            className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg text-xs transition-colors"
                          >
                            Decline
                          </button>
                        </>
                      )}

                      {lead.status === "working" && (
                        <button
                          onClick={() => handleLeadAction(lead.id, "convert")}
                          disabled={actionInProgress === lead.id}
                          className="btn-primary text-xs px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 font-semibold"
                        >
                          <Briefcase className="w-3.5 h-3.5" />
                          Convert to Deal
                        </button>
                      )}

                      {lead.status === "converted" && (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold inline-flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Deal Created
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
