"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  User,
  Mail,
  Building2,
  FileText,
  MessageSquare,
  Loader2,
  Search,
  Filter,
  Globe,
  Sparkles,
  ChevronRight,
  X,
  Plus,
} from "lucide-react";

export default function AssignedLeadsPage() {
  const router = useRouter();
  const { profile, can, refreshKey, refresh } = usePartnerPortal();
  const [leads, setLeads] = useState<PartnerLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Decline Modal
  const [declineModalLead, setDeclineModalLead] = useState<PartnerLead | null>(null);
  const [declineReason, setDeclineReason] = useState("");

  // Inspect Lead Modal
  const [selectedLead, setSelectedLead] = useState<PartnerLead | null>(null);

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

  async function handleAccept(leadId: string, e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    setActionInProgress(leadId);
    try {
      const res = await fetch("/api/partner/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, action: "accept" }),
      });
      if (res.ok) {
        refresh();
        if (selectedLead?.id === leadId) {
          setSelectedLead(null);
        }
      } else {
        const data = await res.json();
        alert(data.error || "Failed to accept lead.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionInProgress(null);
    }
  }

  async function handleConfirmDecline(e: React.FormEvent) {
    e.preventDefault();
    if (!declineModalLead) return;

    setActionInProgress(declineModalLead.id);
    try {
      const res = await fetch("/api/partner/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: declineModalLead.id,
          action: "decline",
          reason: declineReason || "Declined by partner organization",
        }),
      });

      if (res.ok) {
        setDeclineModalLead(null);
        setDeclineReason("");
        if (selectedLead?.id === declineModalLead.id) {
          setSelectedLead(null);
        }
        refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to decline lead.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionInProgress(null);
    }
  }

  function handleConvertToDeal(lead: PartnerLead, e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    // Route to /partner-portal/deals/new carrying over prospect information
    const params = new URLSearchParams({
      lead_id: lead.id,
      company: lead.prospect_company || "",
      contact: lead.prospect_contact_name || "",
      email: lead.prospect_contact_email || "",
      country: lead.prospect_country || "United States",
      product: lead.estimated_scope || "OmniPriv Enterprise Credential Vault & Bastion",
    });
    router.push(`/partner-portal/deals/new?${params.toString()}`);
  }

  // Calculate real remaining SLA time with rich badge styling
  function getSlaBadge(deadlineStr: string) {
    const now = new Date().getTime();
    const deadline = new Date(deadlineStr).getTime();
    const diffHours = Math.round((deadline - now) / (1000 * 60 * 60));

    if (diffHours < 0) {
      return (
        <span className="font-mono text-[11px] font-semibold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20 inline-flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>SLA Expired</span>
        </span>
      );
    }

    if (diffHours <= 48) {
      return (
        <span className="font-mono text-[11px] font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 inline-flex items-center gap-1 animate-pulse">
          <AlertTriangle className="w-3 h-3" />
          <span>{diffHours}h Urgency</span>
        </span>
      );
    }

    const diffDays = Math.ceil(diffHours / 24);
    return (
      <span className="font-mono text-[11px] font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/[0.04] px-2 py-0.5 rounded-full inline-flex items-center gap-1">
        <Clock className="w-3 h-3 text-cyan-500" />
        <span>{diffDays}d remaining</span>
      </span>
    );
  }

  // Pipeline metrics
  const metrics = useMemo(() => {
    const total = leads.length;
    const actionRequired = leads.filter((l) => l.status === "assigned").length;
    const activeWorking = leads.filter((l) => l.status === "accepted" || l.status === "working").length;
    const converted = leads.filter((l) => l.status === "converted").length;
    return { total, actionRequired, activeWorking, converted };
  }, [leads]);

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesComp = l.prospect_company?.toLowerCase().includes(q);
        const matchesContact = l.prospect_contact_name?.toLowerCase().includes(q);
        const matchesEmail = l.prospect_contact_email?.toLowerCase().includes(q);
        const matchesScope = l.estimated_scope?.toLowerCase().includes(q);
        if (!matchesComp && !matchesContact && !matchesEmail && !matchesScope) return false;
      }
      return true;
    });
  }, [leads, statusFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Assigned Leads
            </h1>
            <span className="text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
              {metrics.total} Inbound Dispatches
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Enterprise customer leads routed to{" "}
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {profile?.company_name || "your organization"}
            </span>{" "}
            by OmniPriv Channel Management based on your tier and territory.
          </p>
        </div>

        {metrics.actionRequired > 0 && (
          <div className="px-3.5 py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-semibold flex items-center gap-2 self-start sm:self-auto shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <Clock className="w-4 h-4" />
            <span>{metrics.actionRequired} Leads Require Acceptance SLA</span>
          </div>
        )}
      </div>

      {/* Metrics Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Total Assigned</span>
            <Target className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {metrics.total}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Vendor inbound routing</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Needs Acceptance</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">
            {metrics.actionRequired}
          </div>
          <div className="text-[11px] text-amber-600/80 dark:text-amber-400/80 mt-1 font-medium">
            7-day acceptance SLA
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>In Engagement</span>
            <MessageSquare className="w-4 h-4 text-[#00B8FF]" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#00B8FF]">
            {metrics.activeWorking}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Active customer outreach</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Converted to Deals</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {metrics.converted}
          </div>
          <div className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80 mt-1 font-medium">
            Protected opportunities
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 flex items-center gap-1.5 ${
              statusFilter === "all"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-sm"
                : "bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:border-cyan-500/40"
            }`}
          >
            <span>All Leads</span>
            <span className="opacity-70 font-mono">({metrics.total})</span>
          </button>
          <button
            onClick={() => setStatusFilter("assigned")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 flex items-center gap-1.5 ${
              statusFilter === "assigned"
                ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                : "bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:border-amber-500/40"
            }`}
          >
            <Clock className="w-3 h-3 text-amber-500" />
            <span>Needs Acceptance</span>
            <span className="opacity-70 font-mono">({metrics.actionRequired})</span>
          </button>
          <button
            onClick={() => setStatusFilter("accepted")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 flex items-center gap-1.5 ${
              statusFilter === "accepted"
                ? "bg-[#00B8FF] text-slate-950 font-bold shadow-sm"
                : "bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:border-[#00B8FF]/40"
            }`}
          >
            <span>Working</span>
            <span className="opacity-70 font-mono">({metrics.activeWorking})</span>
          </button>
          <button
            onClick={() => setStatusFilter("converted")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 flex items-center gap-1.5 ${
              statusFilter === "converted"
                ? "bg-emerald-500 text-slate-950 font-bold shadow-sm"
                : "bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:border-emerald-500/40"
            }`}
          >
            <span>Converted</span>
            <span className="opacity-70 font-mono">({metrics.converted})</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0A1628] p-3 rounded-xl border border-slate-200 dark:border-white/[0.08] shadow-sm">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by prospect company, contact person, or evaluation scope..."
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
        </div>
      </div>

      {/* Leads Table */}
      {loading ? (
        <LoadingSkeleton rows={4} />
      ) : filteredLeads.length === 0 ? (
        <EmptyState
          title={statusFilter !== "all" || searchQuery ? "No matching leads found" : "No leads assigned yet"}
          description={
            statusFilter !== "all" || searchQuery
              ? "Try resetting your search query or switching status filters."
              : "Inbound enterprise PAM evaluations routed to your territory will appear here with an initial 7-day acceptance SLA."
          }
          actionLabel={statusFilter !== "all" || searchQuery ? "Reset Filters" : undefined}
          onAction={() => {
            setStatusFilter("all");
            setSearchQuery("");
          }}
        />
      ) : (
        <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-slate-400 uppercase font-semibold text-[11px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Prospect & Company</th>
                  <th className="py-3.5 px-4">Key Contact</th>
                  <th className="py-3.5 px-4">Product Interest & Scope</th>
                  <th className="py-3.5 px-4">Territory</th>
                  <th className="py-3.5 px-4">SLA Deadline</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 group-hover:text-cyan-500 transition-colors">
                        <Building2 className="w-4 h-4 text-cyan-500 shrink-0" />
                        <span>{lead.prospect_company}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Assigned on {lead.assigned_at ? new Date(lead.assigned_at).toLocaleDateString() : "Recently"}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800 dark:text-slate-200">
                        {lead.prospect_contact_name || "Enterprise Lead"}
                      </div>
                      <div className="text-slate-400 font-mono text-[11px]">
                        {lead.prospect_contact_email}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 max-w-[220px]">
                      <div className="line-clamp-2 leading-relaxed font-medium">
                        {lead.estimated_scope || "OmniPriv Enterprise PAM Platform"}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5 text-slate-400" />
                        <span>{lead.prospect_country || "United States"}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-1">
                        {lead.status === "assigned" && lead.sla_deadline ? (
                          getSlaBadge(lead.sla_deadline)
                        ) : (
                          <span className="font-mono text-slate-400 text-[11px]">
                            {lead.sla_deadline ? new Date(lead.sla_deadline).toLocaleDateString() : "—"}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusChip status={lead.status} />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {lead.status === "assigned" && (
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={(e) => handleAccept(lead.id, e)}
                            disabled={actionInProgress === lead.id}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors shadow-sm disabled:opacity-50 flex items-center gap-1"
                          >
                            {actionInProgress === lead.id && <Loader2 className="w-3 h-3 animate-spin" />}
                            <span>Accept</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeclineModalLead(lead);
                            }}
                            disabled={actionInProgress === lead.id}
                            className="bg-slate-100 dark:bg-white/[0.06] hover:bg-rose-500/10 hover:text-rose-500 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg text-xs transition-colors border border-slate-200 dark:border-white/[0.08]"
                          >
                            Decline
                          </button>
                        </div>
                      )}

                      {(lead.status === "accepted" || lead.status === "working") && (
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={(e) => handleConvertToDeal(lead, e)}
                            className="btn-primary text-xs px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 font-bold shadow-sm"
                          >
                            <Briefcase className="w-3.5 h-3.5" />
                            <span>Convert to Deal</span>
                          </button>
                        </div>
                      )}

                      {lead.status === "converted" && (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold inline-flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Deal Created
                        </span>
                      )}

                      {lead.status === "declined" && (
                        <span className="text-slate-400 italic">Declined</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Lead Detail Inspection Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#070E1B] rounded-2xl border border-slate-200 dark:border-white/10 p-6 sm:p-7 max-w-lg w-full shadow-2xl space-y-5 text-xs animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-white/[0.08] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <StatusChip status={selectedLead.status} />
                  {selectedLead.sla_deadline && selectedLead.status === "assigned" && getSlaBadge(selectedLead.sla_deadline)}
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedLead.prospect_company}
                </h2>
                <p className="text-slate-500 mt-0.5">Inbound Vendor-Assigned Opportunity</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.05] space-y-2">
                <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 mb-2">
                  <User className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Key Prospect Contact</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
                  <div>
                    <span className="text-slate-400">Name:</span> {selectedLead.prospect_contact_name || "Enterprise Lead"}
                  </div>
                  <div>
                    <span className="text-slate-400">Email:</span>{" "}
                    <span className="font-mono text-cyan-600 dark:text-cyan-400">{selectedLead.prospect_contact_email}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Country:</span> {selectedLead.prospect_country || "United States"}
                  </div>
                  <div>
                    <span className="text-slate-400">Assigned On:</span>{" "}
                    {selectedLead.assigned_at ? new Date(selectedLead.assigned_at).toLocaleDateString() : "—"}
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/[0.05]">
                <div className="font-semibold text-slate-900 dark:text-white mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Evaluation Scope & Notes</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedLead.estimated_scope || "OmniPriv Enterprise Privileged Access Management"}
                </p>
                {(selectedLead.qualification_notes || (selectedLead as any).notes) && (
                  <div className="mt-2 pt-2 border-t border-slate-200 dark:border-white/[0.06] text-slate-500">
                    <strong>Admin Dispatch Notes:</strong> {selectedLead.qualification_notes || (selectedLead as any).notes}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-white/[0.08] flex items-center justify-between">
              <button
                onClick={() => setSelectedLead(null)}
                className="btn-secondary text-xs px-4 py-2 rounded-xl"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                {selectedLead.status === "assigned" && (
                  <>
                    <button
                      onClick={() => setDeclineModalLead(selectedLead)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => handleAccept(selectedLead.id)}
                      disabled={actionInProgress === selectedLead.id}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5"
                    >
                      {actionInProgress === selectedLead.id && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                      <span>Accept Lead Assignment</span>
                    </button>
                  </>
                )}

                {(selectedLead.status === "accepted" || selectedLead.status === "working") && (
                  <button
                    onClick={() => handleConvertToDeal(selectedLead)}
                    className="btn-primary text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 font-bold shadow-md shadow-cyan-500/20"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Convert to Protected Deal</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Decline Reason Modal */}
      {declineModalLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#070E1B] rounded-2xl border border-slate-200 dark:border-white/10 p-6 max-w-md w-full shadow-2xl space-y-4 text-xs">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Decline Lead Assignment
              </h2>
              <p className="text-slate-500 mt-1">
                Declining will re-route this prospect back to OmniPriv Channel Management for re-allocation.
              </p>
            </div>

            <form onSubmit={handleConfirmDecline} className="space-y-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
                  Reason for declining (Optional)
                </label>
                <textarea
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                  placeholder="e.g. Outside our vertical focus, capacity constraints, customer conflict..."
                  className="w-full h-24 p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-cyan-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDeclineModalLead(null)}
                  className="btn-secondary text-xs px-4 py-2 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionInProgress === declineModalLead.id}
                  className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2"
                >
                  {actionInProgress === declineModalLead.id && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Confirm Decline</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
