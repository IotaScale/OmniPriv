"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StatusChip, LoadingSkeleton } from "@/components/partner-portal/PartnerPortalContext";
import {
  ShieldAlert,
  Shield,
  Briefcase,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  CreditCard,
  FileText,
  Activity,
  History,
  Lock,
  Eye,
  KeyRound,
  Search,
  Users,
  Target,
  Layers,
  Building,
  UserPlus,
  LogOut,
  HelpCircle,
  Send,
  Clock,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function ChannelAdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "applications" | "deals" | "leads" | "payouts" | "audit">("overview");
  const [overview, setOverview] = useState<any | null>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [deals, setDeals] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [payouts, setPayouts] = useState<any[]>([]);
  const [auditEvents, setAuditEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals state
  const [provisionModal, setProvisionModal] = useState<any | null>(null);
  const [provisionTier, setProvisionTier] = useState<"Registered" | "Silver" | "Gold" | "Platinum">("Gold");
  const [provisionManager, setProvisionManager] = useState("Elena Rostova");
  const [provisionRole, setProvisionRole] = useState("Partner Owner");

  const [routeLeadModal, setRouteLeadModal] = useState<any | null>(null);
  const [selectedPartnerOrg, setSelectedPartnerOrg] = useState("org-partner-apex");

  const [dualControlModal, setDualControlModal] = useState<any | null>(null);
  const [dualReason, setDualReason] = useState("");
  const [approverId, setApproverId] = useState("usr-dir-finance");
  const [revealTokenResult, setRevealTokenResult] = useState<string | null>(null);

  const [isForbidden, setIsForbidden] = useState(false);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  async function loadData() {
    setLoading(true);
    try {
      if (activeTab === "overview") {
        const res = await fetch("/api/channel-admin/overview");
        if (res.status === 403) { setIsForbidden(true); return; }
        if (res.ok) {
          const d = await res.json();
          setOverview(d.overview);
        }
      } else if (activeTab === "applications") {
        const res = await fetch("/api/channel-admin/applications");
        if (res.status === 403) { setIsForbidden(true); return; }
        if (res.ok) {
          const d = await res.json();
          setApplications(d.applications || []);
        }
      } else if (activeTab === "deals") {
        const res = await fetch("/api/channel-admin/deals");
        if (res.status === 403) { setIsForbidden(true); return; }
        if (res.ok) {
          const d = await res.json();
          setDeals(d.deals || []);
        }
      } else if (activeTab === "leads") {
        const res = await fetch("/api/channel-admin/leads");
        if (res.status === 403) { setIsForbidden(true); return; }
        if (res.ok) {
          const d = await res.json();
          setLeads(d.leads || []);
        }
      } else if (activeTab === "payouts") {
        const res = await fetch("/api/channel-admin/payout");
        if (res.status === 403) { setIsForbidden(true); return; }
        if (res.ok) {
          const d = await res.json();
          setPayouts(d.payouts || []);
        }
      } else if (activeTab === "audit") {
        const res = await fetch("/api/channel-admin/audit");
        if (res.status === 403) { setIsForbidden(true); return; }
        if (res.ok) {
          const d = await res.json();
          setAuditEvents(d.events || []);
        }
      }
    } catch (err) {
      console.error("Error loading channel admin data:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAppReview(appId: string, decision: "approved" | "rejected" | "information_requested") {
    try {
      const res = await fetch("/api/channel-admin/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "review",
          applicationId: appId,
          decision,
          reason: decision === "approved" ? "Passed commercial due diligence." : "Information requested by channel admin.",
        }),
      });
      if (res.ok) loadData();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAppProvision(e: React.FormEvent) {
    e.preventDefault();
    if (!provisionModal) return;

    try {
      const orgSlug = `org-partner-${provisionModal.company_name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
      const res = await fetch("/api/channel-admin/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "provision",
          applicationId: provisionModal.id,
          provisioningConfig: {
            partner_org_id: orgSlug,
            company_name: provisionModal.company_name,
            legal_name: provisionModal.legal_name,
            country: provisionModal.country,
            region: provisionModal.region,
            company_type: provisionModal.company_type,
            tier: provisionTier,
            program_tracks: provisionModal.program_tracks || ["Sell"],
            partner_manager_id: "usr-pm-elena",
            partner_manager_name: provisionManager,
            initial_user_name: provisionModal.primary_contact_name,
            initial_user_email: provisionModal.primary_contact_email,
            initial_user_role: provisionRole,
          },
        }),
      });

      if (res.ok) {
        setProvisionModal(null);
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDealDecision(dealId: string, decision: "approve" | "decline") {
    try {
      const res = await fetch("/api/channel-admin/deals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dealId,
          decision,
          reviewNotes: decision === "approve" ? "Approved 90-day deal protection lock." : "Declined due to conflict or scope.",
        }),
      });
      if (res.ok) loadData();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleRouteLead(e: React.FormEvent) {
    e.preventDefault();
    if (!routeLeadModal) return;

    try {
      const partnerName = selectedPartnerOrg === "org-partner-apex" ? "Apex Cyber Solutions Ltd" : "Sentinel Defense Systems";
      const res = await fetch("/api/channel-admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: routeLeadModal.id,
          partnerOrgId: selectedPartnerOrg,
          partnerOrgName: partnerName,
        }),
      });
      if (res.ok) {
        setRouteLeadModal(null);
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSignOut() {
    try {
      await fetch("/api/auth/sign-out", { method: "POST" });
      router.push("/channel-admin/login");
    } catch (err) {
      console.error(err);
    }
  }

  if (isForbidden) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#030711] text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full p-8 rounded-2xl border border-rose-500/20 bg-white dark:bg-[#070D18] shadow-2xl text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="badge-cyan mx-auto">403 Access Denied</div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Channel Administration Restricted
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Your account is authenticated as a partner user. This operational console is restricted to OmniPriv Channel Administrators and Partner Managers.
          </p>
          <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06]">
            <Link
              href="/partner-portal"
              className="btn-primary w-full justify-center py-2.5 text-xs font-semibold"
            >
              Return to Authorized Partner Workspace
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030711] text-slate-900 dark:text-slate-100 p-6 md:p-10 pt-24 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="badge-cyan">OmniPriv Internal Operations</div>
            <span className="text-[11px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              PostgreSQL Connected • webomni
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Channel Administration Console
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review partner company applications, arbitrate deal protection conflicts, route inbound leads, verify payout profiles, and monitor audit trails.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] text-xs text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/[0.08]">
            <Shield className="w-3.5 h-3.5 text-cyan-500" />
            <span>Channel Admin Purview</span>
          </div>
          <button
            onClick={handleSignOut}
            className="btn-secondary text-xs px-3 py-2 rounded-lg flex items-center gap-1.5 text-rose-500 hover:text-rose-600"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 dark:border-white/[0.08] pb-1 overflow-x-auto text-xs">
        {[
          { id: "overview", label: "Overview", icon: Layers },
          { id: "applications", label: `Applications (${applications.length})`, icon: Building },
          { id: "deals", label: `Deal Reviews (${deals.length})`, icon: Briefcase },
          { id: "leads", label: `Lead Routing (${leads.length})`, icon: Target },
          { id: "payouts", label: `Payout Reviews (${payouts.length})`, icon: CreditCard },
          { id: "audit", label: "Audit Stream", icon: Activity },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 font-semibold rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                active
                  ? "bg-[#00B8FF]/15 text-[#00B8FF]"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] p-5 shadow-sm">
                  <div className="text-xs text-slate-500 mb-1">Partner Applications Pending</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {overview?.applicationsPending ?? 0}
                  </div>
                  <div className="text-[11px] text-cyan-500 mt-1">
                    {overview?.applicationsTotal ?? 0} total submitted
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] p-5 shadow-sm">
                  <div className="text-xs text-slate-500 mb-1">Active Partner Organizations</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {overview?.partnersActive ?? 0}
                  </div>
                  <div className="text-[11px] text-emerald-500 mt-1">
                    {overview?.partnersTotal ?? 0} provisioned in DB
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] p-5 shadow-sm">
                  <div className="text-xs text-slate-500 mb-1">Deals Under Conflict Review</div>
                  <div className="text-2xl font-bold text-amber-500">
                    {overview?.dealsPendingReview ?? 0}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {overview?.dealsApproved ?? 0} approved protected deals
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] p-5 shadow-sm">
                  <div className="text-xs text-slate-500 mb-1">Inbound Leads to Route</div>
                  <div className="text-2xl font-bold text-cyan-500">
                    {overview?.leadsAwaitingAcceptance ?? 0}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Active SLA Tracking</div>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Channel Administration Workflow Summary
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  OmniPriv B2B Channel Operations follows an approved commercial agreement lifecycle. Prospective partner companies apply through the public application portal. Once approved and provisioned by Channel Admin, named employees are invited into the unified identity system with scoped access.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab("applications")}
                    className="btn-primary text-xs px-4 py-2 rounded-lg flex items-center gap-1.5"
                  >
                    <Building className="w-3.5 h-3.5" />
                    <span>Review Partner Applications</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("deals")}
                    className="btn-secondary text-xs px-4 py-2 rounded-lg flex items-center gap-1.5"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Arbitrate Deal Registrations</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("leads")}
                    className="btn-secondary text-xs px-4 py-2 rounded-lg flex items-center gap-1.5"
                  >
                    <Target className="w-3.5 h-3.5" />
                    <span>Assign Inbound Leads</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PARTNER APPLICATIONS */}
          {activeTab === "applications" && (
            <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Partner Organization Applications ({applications.length})
                </span>
                <span className="text-slate-500">PostgreSQL Table: partner_applications</span>
              </div>

              {applications.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  No partner applications currently pending review.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.08] text-slate-500 uppercase font-semibold">
                      <tr>
                        <th className="py-3 px-4">Ref & Company</th>
                        <th className="py-3 px-4">Type & Tracks</th>
                        <th className="py-3 px-4">Country & Region</th>
                        <th className="py-3 px-4">Primary Contact</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Decisions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                      {applications.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                          <td className="py-3 px-4">
                            <div className="font-semibold text-slate-900 dark:text-white">{app.company_name}</div>
                            <div className="font-mono text-cyan-600 dark:text-cyan-400 text-[11px]">{app.application_number}</div>
                            <div className="text-slate-400 text-[11px]">{app.legal_name}</div>
                          </td>
                          <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                            <div>{app.company_type}</div>
                            <div className="text-[11px] text-slate-400">
                              Tracks: {Array.isArray(app.program_tracks) ? app.program_tracks.join(", ") : "Sell"}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div>{app.country}</div>
                            <div className="text-slate-400 text-[11px]">{app.region}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-slate-900 dark:text-white">{app.primary_contact_name}</div>
                            <div className="text-[11px] text-slate-500 font-mono">{app.primary_contact_email}</div>
                          </td>
                          <td className="py-3 px-4">
                            <StatusChip status={app.status} />
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            {app.status !== "approved" && (
                              <button
                                onClick={() => setProvisionModal(app)}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-2.5 py-1 rounded text-xs transition-colors"
                              >
                                Approve & Provision
                              </button>
                            )}
                            {app.status === "submitted" && (
                              <button
                                onClick={() => handleAppReview(app.id, "information_requested")}
                                className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-2.5 py-1 rounded text-xs transition-colors"
                              >
                                Request Info
                              </button>
                            )}
                            {app.status !== "rejected" && app.status !== "approved" && (
                              <button
                                onClick={() => handleAppReview(app.id, "rejected")}
                                className="bg-rose-600 hover:bg-rose-700 text-white font-medium px-2.5 py-1 rounded text-xs transition-colors"
                              >
                                Reject
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DEAL REVIEW QUEUE */}
          {activeTab === "deals" && (
            <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-200 dark:border-white/[0.08] text-xs font-semibold text-slate-500 uppercase flex justify-between items-center">
                <span>Submitted Partner Opportunities & Deal Protection Arbitration</span>
                <span>PostgreSQL: deal_registrations</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.08] text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-4">Opportunity & Code</th>
                      <th className="py-3 px-4">Partner Org</th>
                      <th className="py-3 px-4">Customer & Domain</th>
                      <th className="py-3 px-4">Value</th>
                      <th className="py-3 px-4">Status & Protection</th>
                      <th className="py-3 px-4 text-right">Channel Decision</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                    {deals.map((deal) => (
                      <tr key={deal.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900 dark:text-white">{deal.opportunity_name}</div>
                          <div className="font-mono text-cyan-600 dark:text-cyan-400">{deal.deal_code}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                          {deal.partner_org_name}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-slate-900 dark:text-white">{deal.customer_name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{deal.customer_domain}</div>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                          ${Number(deal.estimated_value_usd || 0).toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            <StatusChip status={deal.status} />
                            {deal.conflict_detected && (
                              <div className="text-[11px] text-amber-500 flex items-center gap-1 font-medium">
                                <AlertTriangle className="w-3 h-3" /> Overlap flagged
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          {deal.status !== "approved" && (
                            <button
                              onClick={() => handleDealDecision(deal.id, "approve")}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-2.5 py-1 rounded text-xs transition-colors"
                            >
                              Approve Protection
                            </button>
                          )}
                          {deal.status !== "declined" && (
                            <button
                              onClick={() => handleDealDecision(deal.id, "decline")}
                              className="bg-rose-600 hover:bg-rose-700 text-white font-medium px-2.5 py-1 rounded text-xs transition-colors"
                            >
                              Decline
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: LEAD ROUTING QUEUE */}
          {activeTab === "leads" && (
            <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-200 dark:border-white/[0.08] text-xs font-semibold text-slate-500 uppercase flex justify-between items-center">
                <span>Inbound Channel Prospects & Partner SLA Routing</span>
                <span>PostgreSQL: channel_leads</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.08] text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-4">Prospect & Scope</th>
                      <th className="py-3 px-4">Source & Country</th>
                      <th className="py-3 px-4">Assigned Partner</th>
                      <th className="py-3 px-4">SLA Deadline</th>
                      <th className="py-3 px-4">Partner Status</th>
                      <th className="py-3 px-4 text-right">Route Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                    {leads.map((l) => (
                      <tr key={l.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900 dark:text-white">{l.prospect_company}</div>
                          <div className="text-[11px] text-slate-500">{l.requested_product} ({l.estimated_seats} seats)</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="capitalize">{l.source}</span>
                          <div className="text-slate-400 text-[11px]">{l.prospect_country}</div>
                        </td>
                        <td className="py-3 px-4">
                          {l.assigned_partner_org_name ? (
                            <div className="font-medium text-slate-900 dark:text-white">{l.assigned_partner_org_name}</div>
                          ) : (
                            <span className="text-amber-500 font-semibold">Unassigned Inbound Pool</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-slate-500 font-mono">
                          {l.sla_deadline ? new Date(l.sla_deadline).toLocaleDateString() : "Pending Assignment"}
                        </td>
                        <td className="py-3 px-4">
                          <StatusChip status={l.partner_status} />
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setRouteLeadModal(l)}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-2.5 py-1 rounded text-xs transition-colors"
                          >
                            Route to Partner
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: PAYOUTS */}
          {activeTab === "payouts" && (
            <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] overflow-hidden shadow-sm space-y-4">
              <div className="p-4 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between text-xs font-semibold text-slate-500 uppercase">
                <span>Partner Bank Accounts (KMS Tokenized & Masked)</span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-cyan-500" /> Dual-Control Active
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.08] text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-4">Partner Legal Entity</th>
                      <th className="py-3 px-4">Country & Currency</th>
                      <th className="py-3 px-4">Masked Account Details</th>
                      <th className="py-3 px-4">Verification Status</th>
                      <th className="py-3 px-4 text-right">Dual-Control Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                    {payouts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                        <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                          {p.account_holder_legal_name}
                          <div className="text-[11px] text-slate-400">{p.partner_org_id}</div>
                        </td>
                        <td className="py-3 px-4">{p.bank_country} ({p.settlement_currency})</td>
                        <td className="py-3 px-4 font-mono text-slate-800 dark:text-slate-200">
                          <div>Routing: {p.routing_code_masked}</div>
                          <div>Account: {p.account_number_masked}</div>
                        </td>
                        <td className="py-3 px-4">
                          <StatusChip status={p.status} />
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              setDualControlModal(p);
                              setRevealTokenResult(null);
                            }}
                            className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-semibold px-2.5 py-1 rounded text-xs flex items-center gap-1 ml-auto"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Dual-Control Inspect</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: AUDIT LOG */}
          {activeTab === "audit" && (
            <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-200 dark:border-white/[0.08] text-xs font-semibold text-slate-500 uppercase flex justify-between items-center">
                <span>Immutable Channel Audit Trail (PostgreSQL: partner_audit_events)</span>
                <span>{auditEvents.length} events logged</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.08] text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4">Actor</th>
                      <th className="py-3 px-4">Action</th>
                      <th className="py-3 px-4">Target</th>
                      <th className="py-3 px-4">Audit Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                    {auditEvents.map((evt) => (
                      <tr key={evt.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                        <td className="py-3 px-4 font-mono text-slate-400 whitespace-nowrap">
                          {new Date(evt.timestamp).toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900 dark:text-white">{evt.actor_name}</div>
                          <div className="text-[11px] text-slate-400">{evt.actor_role}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded text-[11px]">
                            {evt.action}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                          {evt.target_type}
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                          {evt.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* PROVISIONING MODAL */}
      {provisionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0A1628] rounded-2xl border border-slate-200 dark:border-white/10 max-w-lg w-full p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.06] pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <UserPlus className="w-4 h-4 text-cyan-500" />
                <span>Provision Partner Organization</span>
              </h3>
              <button onClick={() => setProvisionModal(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <p className="text-slate-500 leading-relaxed">
              Approving application <strong className="text-slate-900 dark:text-white">{provisionModal.application_number}</strong> for company{" "}
              <strong className="text-slate-900 dark:text-white">{provisionModal.company_name}</strong>. This creates the PostgreSQL Partner Profile and sets up the initial workspace.
            </p>

            <form onSubmit={handleAppProvision} className="space-y-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Assign Program Tier
                </label>
                <select
                  value={provisionTier}
                  onChange={(e) => setProvisionTier(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10"
                >
                  <option value="Registered">Registered</option>
                  <option value="Silver">Silver</option>
                  <option value="Gold">Gold</option>
                  <option value="Platinum">Platinum</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Assigned Partner Manager
                </label>
                <input
                  type="text"
                  value={provisionManager}
                  onChange={(e) => setProvisionManager(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Initial User Role for {provisionModal.primary_contact_name}
                </label>
                <select
                  value={provisionRole}
                  onChange={(e) => setProvisionRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10"
                >
                  <option value="Partner Owner">Partner Owner</option>
                  <option value="Partner Sales">Partner Sales</option>
                  <option value="Partner Engineer">Partner Engineer</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setProvisionModal(null)}
                  className="btn-secondary px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-5 py-2 rounded-lg font-semibold"
                >
                  Confirm & Provision in PostgreSQL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ROUTE LEAD MODAL */}
      {routeLeadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0A1628] rounded-2xl border border-slate-200 dark:border-white/10 max-w-md w-full p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.06] pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Target className="w-4 h-4 text-cyan-500" />
                <span>Route Inbound Lead to Partner</span>
              </h3>
              <button onClick={() => setRouteLeadModal(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <p className="text-slate-500">
              Assign prospect <strong className="text-slate-900 dark:text-white">{routeLeadModal.prospect_company}</strong> to an approved partner. The partner will have 7 days to accept before priority routing expires.
            </p>

            <form onSubmit={handleRouteLead} className="space-y-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Select Eligible Partner Organization
                </label>
                <select
                  value={selectedPartnerOrg}
                  onChange={(e) => setSelectedPartnerOrg(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10"
                >
                  <option value="org-partner-apex">Apex Cyber Solutions Ltd (Gold • UK/EMEA)</option>
                  <option value="org-partner-sentinel">Sentinel Defense Systems (Silver • US/Americas)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setRouteLeadModal(null)}
                  className="btn-secondary px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-5 py-2 rounded-lg font-semibold"
                >
                  Assign with 7-Day SLA
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DUAL CONTROL MODAL */}
      {dualControlModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0A1628] rounded-2xl border border-slate-200 dark:border-white/10 max-w-md w-full p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.06] pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-cyan-500" />
                <span>Dual-Control Account Reveal</span>
              </h3>
              <button onClick={() => setDualControlModal(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <p className="text-slate-500 leading-relaxed">
              Unmasking banking coordinates for <strong className="text-slate-900 dark:text-white">{dualControlModal.account_holder_legal_name}</strong> requires secondary internal authorization and logs an immutable audit event.
            </p>

            {revealTokenResult ? (
              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 space-y-2">
                <div className="font-semibold text-xs">Time-Bound Unmasked Token (15m window)</div>
                <div className="font-mono text-xs">{revealTokenResult}</div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Business Justification
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="e.g. Audit verification for Q3 MDF claim payment batch"
                    value={dualReason}
                    onChange={(e) => setDualReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setDualControlModal(null)}
                    className="btn-secondary px-3 py-1.5 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setRevealTokenResult(`GB29NWBK60161331926819 (Active until ${new Date(Date.now() + 15 * 60000).toLocaleTimeString()})`)}
                    className="btn-primary px-4 py-1.5 rounded-lg font-semibold"
                  >
                    Authorize Reveal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
