"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  FileText,
  Activity,
  History,
  Lock,
  Search,
  Users,
  Target,
  Layers,
  Building,
  LogOut,
  Clock,
  ArrowRight,
  ExternalLink,
  Plus,
  Filter,
  DollarSign,
  Calendar,
  Send,
  Edit2,
  Info,
  Copy,
  Check,
  TrendingUp,
  ShieldCheck,
  Globe,
  ChevronRight,
  X,
  Sparkles,
} from "lucide-react";

function TierInfoTooltip({ align = "left" }: { align?: "left" | "right" | "center" }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-4 h-4 rounded-full bg-cyan-500/15 hover:bg-cyan-500/30 text-[#00B8FF] flex items-center justify-center transition-colors focus:outline-none"
        aria-label="Tier margin information"
      >
        <Info className="w-3 h-3" />
      </button>

      {open && (
        <div
          className={`absolute bottom-full mb-2 ${
            align === "right" ? "right-0" : align === "center" ? "left-1/2 -translate-x-1/2" : "left-0"
          } w-80 sm:w-96 p-3.5 rounded-xl border border-cyan-500/30 bg-[#070E1B] text-slate-100 shadow-2xl z-50 text-left pointer-events-none backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150`}
        >
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/[0.08]">
            <div className="w-2 h-2 rounded-full bg-[#00B8FF] animate-pulse" />
            <h4 className="text-[11px] font-bold text-white tracking-wide uppercase">
              Commercial Margin & Deal Registration Discounts
            </h4>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/[0.08]">
            <table className="w-full text-[11px] text-left">
              <thead className="bg-white/[0.04] text-slate-400 font-semibold border-b border-white/[0.08]">
                <tr>
                  <th className="py-1.5 px-2.5">Partner Tier</th>
                  <th className="py-1.5 px-2 text-center">Base Reseller Margin</th>
                  <th className="py-1.5 px-2 text-center">Deal Reg Rebate</th>
                  <th className="py-1.5 px-2.5 text-right font-bold text-[#00B8FF]">Total Effective Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-1.5 px-2.5 font-medium text-slate-300">Registered</td>
                  <td className="py-1.5 px-2 text-center font-mono">15%</td>
                  <td className="py-1.5 px-2 text-center font-mono text-emerald-400">+5%</td>
                  <td className="py-1.5 px-2.5 text-right font-mono font-bold text-emerald-400">20%</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-1.5 px-2.5 font-medium text-slate-300">Silver</td>
                  <td className="py-1.5 px-2 text-center font-mono">20%</td>
                  <td className="py-1.5 px-2 text-center font-mono text-emerald-400">+8%</td>
                  <td className="py-1.5 px-2.5 text-right font-mono font-bold text-emerald-400">28%</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-1.5 px-2.5 font-medium text-slate-300">Gold</td>
                  <td className="py-1.5 px-2 text-center font-mono">25%</td>
                  <td className="py-1.5 px-2 text-center font-mono text-emerald-400">+10%</td>
                  <td className="py-1.5 px-2.5 text-right font-mono font-bold text-emerald-400">35%</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-1.5 px-2.5 font-medium text-cyan-400 font-semibold">Platinum</td>
                  <td className="py-1.5 px-2 text-center font-mono">30%</td>
                  <td className="py-1.5 px-2 text-center font-mono text-emerald-400">+12%</td>
                  <td className="py-1.5 px-2.5 text-right font-mono font-bold text-cyan-300">42%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-2 text-[10px] text-slate-400 leading-normal">
            Higher tiers also receive priority inbound lead routing (7d SLA) & extended 90d deal protection arbitration.
          </div>
        </div>
      )}
    </div>
  );
}

export default function ChannelAdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "organizations" | "deals" | "leads" | "audit">("overview");

  const [overview, setOverview] = useState<any | null>(null);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [deals, setDeals] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [auditEvents, setAuditEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search and Filter states
  const [dealSearchQuery, setDealSearchQuery] = useState("");
  const [dealStatusFilter, setDealStatusFilter] = useState("all");
  const [orgSearchQuery, setOrgSearchQuery] = useState("");
  const [orgTierFilter, setOrgTierFilter] = useState("all");
  const [leadSearchQuery, setLeadSearchQuery] = useState("");
  const [leadStatusFilter, setLeadStatusFilter] = useState("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Authorization state
  const [isForbidden, setIsForbidden] = useState(false);

  // Modals state
  const [editOrgModal, setEditOrgModal] = useState<any | null>(null);
  const [orgTier, setOrgTier] = useState<"Registered" | "Silver" | "Gold" | "Platinum">("Registered");
  const [orgManager, setOrgManager] = useState("");

  const [dealDecisionModal, setDealDecisionModal] = useState<{ deal: any; decision: "approve" | "decline" } | null>(null);
  const [dealDecisionNotes, setDealDecisionNotes] = useState("");

  const [extendDealModal, setExtendDealModal] = useState<any | null>(null);
  const [extendDays, setExtendDays] = useState("90");
  const [extendReason, setExtendReason] = useState("");

  const [closeDealModal, setCloseDealModal] = useState<{ deal: any; outcome: "closed_won" | "closed_lost" } | null>(null);
  const [closeNotes, setCloseNotes] = useState("");

  const [routeLeadModal, setRouteLeadModal] = useState<any | null>(null);
  const [selectedPartnerOrg, setSelectedPartnerOrg] = useState("");

  const [createLeadModal, setCreateLeadModal] = useState(false);
  const [newLeadData, setNewLeadData] = useState({
    prospect_company: "",
    prospect_contact_name: "",
    prospect_contact_email: "",
    prospect_country: "United States",
    requested_product: "OmniPriv Enterprise Credential Vault & Bastion",
    estimated_value_usd: "60000",
    estimated_seats: "50",
    source: "website",
    notes: "",
  });

  function copyCode(code: string, e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  }

  useEffect(() => {
    loadData();
  }, [activeTab]);

  async function loadData() {
    setLoading(true);
    setIsForbidden(false);

    try {
      if (activeTab === "overview") {
        const [resOverview, resDeals, resOrgs] = await Promise.all([
          fetch("/api/channel-admin/overview"),
          fetch("/api/channel-admin/deals"),
          fetch("/api/channel-admin/organizations"),
        ]);

        if (resOverview.status === 403 || resDeals.status === 403) {
          setIsForbidden(true);
          return;
        }

        if (resOverview.ok) {
          const d = await resOverview.json();
          setOverview(d);
        }
        if (resDeals.ok) {
          const d = await resDeals.json();
          setDeals(d.deals || []);
        }
        if (resOrgs.ok) {
          const d = await resOrgs.json();
          setOrganizations(d.organizations || []);
        }
      } else if (activeTab === "organizations") {
        const res = await fetch("/api/channel-admin/organizations");
        if (res.status === 403) { setIsForbidden(true); return; }
        if (res.ok) {
          const d = await res.json();
          setOrganizations(d.organizations || []);
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
        const orgRes = await fetch("/api/channel-admin/organizations");
        if (orgRes.ok) {
          const od = await orgRes.json();
          setOrganizations(od.organizations || []);
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
      console.error("Failed to load channel admin data:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    await fetch("/api/auth/sign-out", { method: "POST" });
    router.push("/channel-admin/login");
  }

  // Partner Organization updates
  async function handleSaveOrg(e: React.FormEvent) {
    e.preventDefault();
    if (!editOrgModal) return;
    try {
      const res = await fetch("/api/channel-admin/organizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orgId: editOrgModal.partner_org_id,
          tier: orgTier,
          partnerManagerName: orgManager,
        }),
      });
      if (res.ok) {
        setEditOrgModal(null);
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Deal Decision: Approve or Decline
  async function handleConfirmDealDecision(e: React.FormEvent) {
    e.preventDefault();
    if (!dealDecisionModal) return;

    try {
      const res = await fetch("/api/channel-admin/deals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dealId: dealDecisionModal.deal.id,
          decision: dealDecisionModal.decision,
          reviewNotes: dealDecisionNotes,
        }),
      });
      if (res.ok) {
        setDealDecisionModal(null);
        setDealDecisionNotes("");
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Deal Decision: Extend Protection
  async function handleConfirmExtend(e: React.FormEvent) {
    e.preventDefault();
    if (!extendDealModal) return;

    try {
      const res = await fetch("/api/channel-admin/deals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dealId: extendDealModal.id,
          decision: "extend",
          extendDays: Number(extendDays),
          reviewNotes: extendReason,
        }),
      });
      if (res.ok) {
        setExtendDealModal(null);
        setExtendReason("");
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Deal Decision: Close Outcome
  async function handleConfirmOutcome(e: React.FormEvent) {
    e.preventDefault();
    if (!closeDealModal) return;

    try {
      const res = await fetch("/api/channel-admin/deals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dealId: closeDealModal.deal.id,
          decision: "outcome",
          outcome: closeDealModal.outcome,
          reviewNotes: closeNotes,
        }),
      });
      if (res.ok) {
        setCloseDealModal(null);
        setCloseNotes("");
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Lead Routing
  async function handleConfirmRouteLead(e: React.FormEvent) {
    e.preventDefault();
    if (!routeLeadModal || !selectedPartnerOrg) return;

    const targetOrg = organizations.find((o) => o.partner_org_id === selectedPartnerOrg);

    try {
      const res = await fetch("/api/channel-admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "route",
          leadId: routeLeadModal.id,
          partnerOrgId: selectedPartnerOrg,
          partnerOrgName: targetOrg?.company_name || selectedPartnerOrg,
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

  // Create Inbound Lead
  async function handleCreateInboundLead(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/channel-admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          leadData: newLeadData,
        }),
      });
      if (res.ok) {
        setCreateLeadModal(false);
        setNewLeadData({
          prospect_company: "",
          prospect_contact_name: "",
          prospect_contact_email: "",
          prospect_country: "United States",
          requested_product: "OmniPriv Enterprise Credential Vault & Bastion",
          estimated_value_usd: "60000",
          estimated_seats: "50",
          source: "website",
          notes: "",
        });
        loadData();
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Filtered Deals
  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      if (dealStatusFilter !== "all") {
        if (dealStatusFilter === "conflict") {
          if (!deal.conflict_detected) return false;
        } else if (deal.status !== dealStatusFilter) {
          return false;
        }
      }
      if (dealSearchQuery) {
        const q = dealSearchQuery.toLowerCase();
        const matchesName = deal.opportunity_name?.toLowerCase().includes(q);
        const matchesCust = deal.customer_name?.toLowerCase().includes(q);
        const matchesDomain = deal.customer_domain?.toLowerCase().includes(q);
        const matchesCode = deal.deal_code?.toLowerCase().includes(q);
        const matchesOrg = deal.partner_org_name?.toLowerCase().includes(q);
        if (!matchesName && !matchesCust && !matchesDomain && !matchesCode && !matchesOrg) return false;
      }
      return true;
    });
  }, [deals, dealStatusFilter, dealSearchQuery]);

  // Filtered Organizations
  const filteredOrgs = useMemo(() => {
    return organizations.filter((org) => {
      if (orgTierFilter !== "all" && (org.current_tier || "Registered").toLowerCase() !== orgTierFilter.toLowerCase()) {
        return false;
      }
      if (orgSearchQuery) {
        const q = orgSearchQuery.toLowerCase();
        const matchesName = org.company_name?.toLowerCase().includes(q);
        const matchesCountry = org.country?.toLowerCase().includes(q);
        const matchesContact = org.primary_contact_name?.toLowerCase().includes(q);
        const matchesManager = org.primary_partner_manager_name?.toLowerCase().includes(q);
        if (!matchesName && !matchesCountry && !matchesContact && !matchesManager) return false;
      }
      return true;
    });
  }, [organizations, orgTierFilter, orgSearchQuery]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (leadStatusFilter === "unassigned" && lead.assigned_partner_org_id) return false;
      if (leadStatusFilter === "assigned" && !lead.assigned_partner_org_id) return false;
      if (leadSearchQuery) {
        const q = leadSearchQuery.toLowerCase();
        const matchesComp = lead.prospect_company?.toLowerCase().includes(q);
        const matchesContact = lead.prospect_contact_name?.toLowerCase().includes(q);
        const matchesCountry = lead.prospect_country?.toLowerCase().includes(q);
        if (!matchesComp && !matchesContact && !matchesCountry) return false;
      }
      return true;
    });
  }, [leads, leadStatusFilter, leadSearchQuery]);

  // Counts for Badges
  const pendingDealsCount = useMemo(() => deals.filter((d) => d.status === "awaiting_approval").length, [deals]);
  const conflictDealsCount = useMemo(() => deals.filter((d) => d.conflict_detected).length, [deals]);
  const unassignedLeadsCount = useMemo(() => leads.filter((l) => !l.assigned_partner_org_id).length, [leads]);

  // 403 Forbidden State Render
  if (isForbidden) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#0A1628] border border-rose-500/30 rounded-2xl p-8 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-extrabold text-white">403 Access Denied</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Channel Administration console access is strictly restricted to internal OmniPriv security personnel. 
            Commercial partner credentials cannot view cross-channel infrastructure.
          </p>
          <div className="pt-4 border-t border-white/[0.08]">
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#030711] text-slate-900 dark:text-slate-100 p-6 md:p-10 pt-20 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="badge-cyan">OmniPriv Internal Purview</div>
            <span className="text-[11px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              Kaspersky Model Verified • PostgreSQL Source of Truth
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Channel Administration Console
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage partner organizations, arbitrate deal protection locks, route inbound enterprise leads, and monitor channel audit trails.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.04] text-xs text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/[0.08]">
            <Shield className="w-3.5 h-3.5 text-cyan-500" />
            <span>Channel Admin Session</span>
          </div>
          <button
            onClick={handleSignOut}
            className="btn-secondary text-xs px-3 py-2 rounded-lg flex items-center gap-1.5 text-rose-500 hover:text-rose-600 font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Modern Navigation Tabs with Alert Counters */}
      <div className="flex items-center gap-1 border-b border-slate-200 dark:border-white/[0.08] pb-1 overflow-x-auto text-xs no-scrollbar">
        {[
          { id: "overview", label: "Overview", icon: Layers, badge: null },
          { id: "organizations", label: "Partner Organizations", icon: Building, badge: organizations.length || null },
          { id: "deals", label: "Deal Reviews", icon: Briefcase, badge: pendingDealsCount > 0 ? `${pendingDealsCount} pending` : null, badgeColor: "bg-amber-500/20 text-amber-400 border border-amber-500/30" },
          { id: "leads", label: "Lead Routing", icon: Target, badge: unassignedLeadsCount > 0 ? `${unassignedLeadsCount} unrouted` : null, badgeColor: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" },
          { id: "audit", label: "Immutable Audit Log", icon: Activity, badge: null },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all shrink-0 ${
                active
                  ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                    tab.badgeColor || "bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {loading ? (
            <LoadingSkeleton rows={4} />
          ) : (
            <>
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] shadow-sm">
                  <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">
                    <span>Total Partners</span>
                    <Building className="w-4 h-4 text-cyan-500" />
                  </div>
                  <div className="text-2xl font-black text-slate-950 dark:text-white mt-1">
                    {overview?.partnersTotal ?? organizations.length}
                  </div>
                  <div className="text-[11px] text-emerald-500 mt-1 font-medium">
                    +{overview?.newPartnerRegistrations ?? 0} self-registered past 30d
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] shadow-sm">
                  <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">
                    <span>Deals Awaiting Review</span>
                    <Clock className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-2xl font-black text-amber-500 mt-1">
                    {overview?.dealsAwaitingReview ?? pendingDealsCount}
                  </div>
                  <div className="text-[11px] text-amber-500/80 mt-1 font-medium">
                    {overview?.domainConflicts ?? conflictDealsCount} domain conflicts flagged
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] shadow-sm">
                  <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">
                    <span>Protected Pipeline</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-2xl font-black text-slate-950 dark:text-white mt-1">
                    ${((overview?.approvedPipelineValue ?? 0) / 1000).toFixed(0)}k USD
                  </div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
                    {overview?.dealsApproved ?? 0} deals under active 90d lock
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] shadow-sm">
                  <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">
                    <span>Leads Needing Action</span>
                    <Target className="w-4 h-4 text-rose-500" />
                  </div>
                  <div className="text-2xl font-black text-slate-950 dark:text-white mt-1">
                    {overview?.leadsAwaitingAssignment ?? unassignedLeadsCount}
                  </div>
                  <div className="text-[11px] text-rose-500 mt-1 font-medium">
                    {overview?.leadsNearingSlaBreach ?? 0} nearing SLA deadline
                  </div>
                </div>
              </div>

              {/* Action Banner */}
              {((overview?.dealsAwaitingReview ?? pendingDealsCount) > 0 || (overview?.domainConflicts ?? conflictDealsCount) > 0) && (
                <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200 text-xs flex items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <div className="font-bold text-sm">Action Required: Deal Protection Arbitration</div>
                      <div className="mt-0.5 text-slate-700 dark:text-slate-300">
                        {overview?.dealsAwaitingReview ?? pendingDealsCount} deal registrations require review. Domain conflicts require Channel Admin arbitration before 90-day protection lock can be granted.
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("deals")}
                    className="btn-primary text-xs px-4 py-2 rounded-lg font-semibold shrink-0 shadow"
                  >
                    Open Deal Queue
                  </button>
                </div>
              )}

              {/* Recent Deals Table on Overview */}
              <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#00B8FF]" />
                    <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                      Recent Deal Registrations & Queue ({deals.length})
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab("deals")}
                    className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    View All {deals.length} Deals &rarr;
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.08] text-slate-500 uppercase font-semibold text-[11px]">
                      <tr>
                        <th className="py-3 px-4">Deal / Opportunity</th>
                        <th className="py-3 px-4">Partner Organization</th>
                        <th className="py-3 px-4">Estimated Value</th>
                        <th className="py-3 px-4">Status & Protection</th>
                        <th className="py-3 px-4">Arbitration Flag</th>
                        <th className="py-3 px-4 text-right">Quick Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                      {deals.slice(0, 6).map((deal) => (
                        <tr key={deal.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-900 dark:text-white">{deal.opportunity_name}</div>
                            <div className="flex items-center gap-1.5 text-slate-400 mt-0.5 text-[11px]">
                              <span>{deal.customer_name}</span>
                              <span>•</span>
                              <span className="font-mono text-cyan-600 dark:text-cyan-400">{deal.customer_domain}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-slate-800 dark:text-slate-200">{deal.partner_org_name}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{deal.deal_code}</div>
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-900 dark:text-white font-mono">
                            ${Number(deal.estimated_value_usd || 0).toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <StatusChip status={deal.status} />
                            {deal.protection_expires_at && (
                              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5 font-semibold">
                                Locked to {new Date(deal.protection_expires_at).toLocaleDateString()}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {deal.conflict_detected ? (
                              <span className="font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 text-[10px] inline-flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                Conflict Flagged
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[10px]">Clean Domain</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {deal.status !== "approved" && (
                                <button
                                  onClick={() => {
                                    setDealDecisionModal({ deal, decision: "approve" });
                                    setDealDecisionNotes("Verified customer relationship. 90-day vendor deal protection granted.");
                                  }}
                                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1.5 rounded-lg text-[11px] shadow-sm flex items-center gap-1"
                                >
                                  <ShieldCheck className="w-3 h-3" />
                                  <span>Approve</span>
                                </button>
                              )}
                              {deal.status !== "declined" && (
                                <button
                                  onClick={() => {
                                    setDealDecisionModal({ deal, decision: "decline" });
                                    setDealDecisionNotes("Registration declined due to competing active engagement.");
                                  }}
                                  className="bg-slate-100 dark:bg-white/[0.05] hover:bg-rose-500/10 hover:text-rose-500 text-slate-700 dark:text-slate-300 px-2.5 py-1.5 rounded-lg text-[11px] border border-slate-200 dark:border-white/[0.08]"
                                >
                                  Decline
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* TAB 2: PARTNER ORGANIZATIONS */}
      {activeTab === "organizations" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-cyan-500" />
                <span>Authorized Partner Companies & Tiers</span>
                <TierInfoTooltip align="left" />
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Every company that completes self-registration appears here in real-time.
              </p>
            </div>

            {/* Tier Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
              {["all", "Platinum", "Gold", "Silver", "Registered"].map((t) => (
                <button
                  key={t}
                  onClick={() => setOrgTierFilter(t)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    orgTierFilter.toLowerCase() === t.toLowerCase()
                      ? "bg-cyan-500 text-slate-950 font-bold"
                      : "bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:border-cyan-500/30"
                  }`}
                >
                  {t === "all" ? "All Tiers" : t}
                </button>
              ))}
            </div>
          </div>

          {/* Search Box */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search partner companies, contacts, managers, country..."
              value={orgSearchQuery}
              onChange={(e) => setOrgSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          {loading ? (
            <LoadingSkeleton rows={5} />
          ) : filteredOrgs.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs bg-white dark:bg-[#0A1628] rounded-xl border border-slate-200 dark:border-white/[0.08]">
              No partner organizations matching filter.
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.08] text-slate-500 uppercase font-semibold text-[11px]">
                    <tr>
                      <th className="py-3.5 px-4">Company & Entity</th>
                      <th className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span>Tier</span>
                          <TierInfoTooltip align="left" />
                        </div>
                      </th>
                      <th className="py-3.5 px-4">Region / Country</th>
                      <th className="py-3.5 px-4">Primary Contact</th>
                      <th className="py-3.5 px-4">Assigned Partner Manager</th>
                      <th className="py-3.5 px-4">Pipeline Metrics</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                    {filteredOrgs.map((org) => {
                      const tier = org.current_tier || "Registered";
                      return (
                        <tr key={org.partner_org_id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-sm text-slate-900 dark:text-white">{org.company_name}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{org.partner_org_id}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`font-bold px-2.5 py-1 rounded-md text-xs uppercase tracking-wider ${
                                tier === "Platinum"
                                  ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                                  : tier === "Gold"
                                  ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                                  : tier === "Silver"
                                  ? "bg-slate-700/50 text-slate-300 border border-slate-600"
                                  : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                              }`}
                            >
                              {tier}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                            <div className="font-medium">{org.country}</div>
                            <div className="text-[11px] text-slate-400">{org.region}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-medium text-slate-800 dark:text-slate-200">{org.primary_contact_name || "—"}</div>
                            <div className="text-[11px] text-slate-400 font-mono">{org.primary_contact_email}</div>
                          </td>
                          <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                            {org.primary_partner_manager_name || "Unassigned"}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900 dark:text-white">
                              {org.deal_count} deals
                            </div>
                            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                              ${Number(org.approved_pipeline || 0).toLocaleString()} USD locked
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => {
                                setEditOrgModal(org);
                                setOrgTier(org.current_tier || "Registered");
                                setOrgManager(org.primary_partner_manager_name || "Elena Rostova");
                              }}
                              className="btn-secondary text-xs px-3 py-1.5 rounded-lg inline-flex items-center gap-1 font-semibold"
                            >
                              <Edit2 className="w-3 h-3" /> Adjust Tier
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
        </div>
      )}

      {/* TAB 3: DEAL REVIEW */}
      {activeTab === "deals" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-cyan-500" />
                <span>Cross-Channel Deal Review & Protection Arbitration Queue</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Arbitrate 90-day vendor protection locks across all registered partner accounts.
              </p>
            </div>

            {/* Quick Status Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
              <button
                onClick={() => setDealStatusFilter("all")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  dealStatusFilter === "all"
                    ? "bg-cyan-500 text-slate-950 font-bold"
                    : "bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-300"
                }`}
              >
                All ({deals.length})
              </button>
              <button
                onClick={() => setDealStatusFilter("awaiting_approval")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                  dealStatusFilter === "awaiting_approval"
                    ? "bg-amber-500 text-slate-950 font-bold"
                    : "bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] text-amber-500"
                }`}
              >
                <Clock className="w-3 h-3" />
                <span>Pending ({pendingDealsCount})</span>
              </button>
              <button
                onClick={() => setDealStatusFilter("conflict")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                  dealStatusFilter === "conflict"
                    ? "bg-rose-500 text-white font-bold"
                    : "bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] text-rose-500"
                }`}
              >
                <AlertTriangle className="w-3 h-3" />
                <span>Conflicts ({conflictDealsCount})</span>
              </button>
              <button
                onClick={() => setDealStatusFilter("approved")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                  dealStatusFilter === "approved"
                    ? "bg-emerald-500 text-slate-950 font-bold"
                    : "bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] text-emerald-500"
                }`}
              >
                <ShieldCheck className="w-3 h-3" />
                <span>Locked</span>
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by opportunity, customer, domain, deal code, partner company..."
              value={dealSearchQuery}
              onChange={(e) => setDealSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          {loading ? (
            <LoadingSkeleton rows={5} />
          ) : filteredDeals.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs bg-white dark:bg-[#0A1628] rounded-xl border border-slate-200 dark:border-white/[0.08]">
              No registered deals match the criteria.
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.08] text-slate-500 uppercase font-semibold text-[11px]">
                    <tr>
                      <th className="py-3.5 px-4">Deal & Customer</th>
                      <th className="py-3.5 px-4">Partner Company</th>
                      <th className="py-3.5 px-4">Value (USD)</th>
                      <th className="py-3.5 px-4">Close Date</th>
                      <th className="py-3.5 px-4">Status & Protection</th>
                      <th className="py-3.5 px-4">Conflict Flag</th>
                      <th className="py-3.5 px-4 text-right">Arbitration Decision</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                    {filteredDeals.map((deal) => (
                      <tr key={deal.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-sm text-slate-900 dark:text-white">{deal.opportunity_name}</div>
                          <div className="flex items-center gap-1.5 text-slate-400 mt-0.5">
                            <span className="font-medium text-slate-700 dark:text-slate-300">{deal.customer_name}</span>
                            <span>•</span>
                            <span className="font-mono text-cyan-600 dark:text-cyan-400">{deal.customer_domain}</span>
                            <span>•</span>
                            <button
                              type="button"
                              onClick={(e) => copyCode(deal.deal_code, e)}
                              className="font-mono text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                              title="Click to copy Deal Code"
                            >
                              <span>{deal.deal_code}</span>
                              {copiedCode === deal.deal_code ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5 opacity-50" />}
                            </button>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-slate-800 dark:text-slate-200">{deal.partner_org_name}</div>
                          <div className="text-[11px] text-slate-400">{deal.created_by_user_name}</div>
                        </td>

                        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white font-mono text-sm">
                          ${Number(deal.estimated_value_usd).toLocaleString()}
                        </td>

                        <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                          {deal.estimated_close_date || "—"}
                        </td>

                        <td className="py-3.5 px-4">
                          <StatusChip status={deal.status} />
                          {deal.protection_expires_at && (
                            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-semibold flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" />
                              <span>Locked to {new Date(deal.protection_expires_at).toLocaleDateString()}</span>
                            </div>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          {deal.conflict_detected ? (
                            <span
                              title={deal.conflict_notes || "Duplicate domain registration detected"}
                              className="font-semibold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 text-[11px] inline-flex items-center gap-1"
                            >
                              <AlertTriangle className="w-3 h-3" />
                              Conflict Flagged
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[11px]">Clean Domain</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5 flex-wrap">
                            {deal.status !== "approved" && (
                              <button
                                onClick={() => {
                                  setDealDecisionModal({ deal, decision: "approve" });
                                  setDealDecisionNotes("Verified customer relationship. 90-day vendor deal protection granted.");
                                }}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs shadow-sm flex items-center gap-1"
                              >
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>Approve Lock</span>
                              </button>
                            )}

                            {deal.status !== "declined" && (
                              <button
                                onClick={() => {
                                  setDealDecisionModal({ deal, decision: "decline" });
                                  setDealDecisionNotes("Registration declined due to competing active engagement.");
                                }}
                                className="bg-slate-100 dark:bg-white/[0.05] hover:bg-rose-500/10 hover:text-rose-500 text-slate-700 dark:text-slate-300 px-2.5 py-1.5 rounded-lg text-xs border border-slate-200 dark:border-white/[0.08]"
                              >
                                Decline
                              </button>
                            )}

                            {deal.status === "approved" && (
                              <>
                                <button
                                  onClick={() => setExtendDealModal(deal)}
                                  className="btn-secondary text-xs px-2.5 py-1.5 rounded-lg font-semibold"
                                >
                                  Extend +90d
                                </button>
                                <button
                                  onClick={() => setCloseDealModal({ deal, outcome: "closed_won" })}
                                  className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 px-2.5 py-1.5 rounded-lg text-xs font-semibold"
                                >
                                  Mark Won
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: LEAD ROUTING */}
      {activeTab === "leads" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-cyan-500" />
                <span>Inbound Enterprise PAM Leads Pool</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Route enterprise customer evaluations to authorized regional partners with a 7-day acceptance SLA.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs">
                <button
                  onClick={() => setLeadStatusFilter("all")}
                  className={`px-2.5 py-1 rounded-lg font-medium ${
                    leadStatusFilter === "all" ? "bg-cyan-500 text-slate-950 font-bold" : "bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08]"
                  }`}
                >
                  All ({leads.length})
                </button>
                <button
                  onClick={() => setLeadStatusFilter("unassigned")}
                  className={`px-2.5 py-1 rounded-lg font-medium ${
                    leadStatusFilter === "unassigned" ? "bg-amber-500 text-slate-950 font-bold" : "bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08]"
                  }`}
                >
                  Unassigned ({unassignedLeadsCount})
                </button>
              </div>

              <button
                onClick={() => setCreateLeadModal(true)}
                className="btn-primary text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 font-bold shadow-md shadow-cyan-500/10"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Lead</span>
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search leads by prospect company, contact, country..."
              value={leadSearchQuery}
              onChange={(e) => setLeadSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          {loading ? (
            <LoadingSkeleton rows={5} />
          ) : filteredLeads.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs bg-white dark:bg-[#0A1628] rounded-xl border border-slate-200 dark:border-white/[0.08]">
              No channel leads match the selected criteria.
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.08] text-slate-500 uppercase font-semibold text-[11px]">
                    <tr>
                      <th className="py-3.5 px-4">Prospect & Company</th>
                      <th className="py-3.5 px-4">Key Contact</th>
                      <th className="py-3.5 px-4">Product Request</th>
                      <th className="py-3.5 px-4">Assigned Partner</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">SLA Deadline</th>
                      <th className="py-3.5 px-4 text-right">Route Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-sm text-slate-900 dark:text-white">{lead.prospect_company}</div>
                          <div className="text-[11px] text-slate-400">{lead.prospect_country}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="font-medium text-slate-800 dark:text-slate-200">{lead.prospect_contact_name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{lead.prospect_contact_email}</div>
                        </td>

                        <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                          {lead.requested_product || lead.estimated_scope}
                        </td>

                        <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                          {lead.assigned_partner_org_name || (
                            <span className="text-amber-500 italic bg-amber-500/10 px-2 py-0.5 rounded text-[11px]">
                              Unassigned Pool
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <StatusChip status={lead.partner_status || lead.status} />
                        </td>

                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                          {lead.sla_deadline ? new Date(lead.sla_deadline).toLocaleDateString() : "—"}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => {
                              setRouteLeadModal(lead);
                              if (organizations.length > 0) setSelectedPartnerOrg(organizations[0].partner_org_id);
                            }}
                            className="btn-secondary text-xs px-3 py-1.5 rounded-lg inline-flex items-center gap-1 font-semibold"
                          >
                            <Send className="w-3 h-3 text-cyan-500" />
                            <span>{lead.assigned_partner_org_id ? "Re-Route" : "Dispatch to Partner"}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: AUDIT LOG */}
      {activeTab === "audit" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-500" />
              <span>Immutable Channel Operations Audit Stream (PostgreSQL)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cryptographically timestamped record of all tier changes, deal arbitrations, and lead dispatches.
            </p>
          </div>

          {loading ? (
            <LoadingSkeleton rows={6} />
          ) : auditEvents.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs bg-white dark:bg-[#0A1628] rounded-xl border border-slate-200 dark:border-white/[0.08]">
              No audit events logged yet.
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.08] text-slate-500 uppercase font-semibold text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4">Actor</th>
                      <th className="py-3 px-4">Action</th>
                      <th className="py-3 px-4">Target</th>
                      <th className="py-3 px-4 font-sans">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                    {auditEvents.map((evt) => (
                      <tr key={evt.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                        <td className="py-3 px-4 text-slate-400 whitespace-nowrap text-[11px]">
                          {new Date(evt.created_at).toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-slate-800 dark:text-slate-200 whitespace-nowrap">
                          <strong>{evt.actor_name}</strong> ({evt.actor_role})
                        </td>
                        <td className="py-3 px-4 text-cyan-600 dark:text-cyan-400 font-semibold whitespace-nowrap">
                          {evt.action}
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                          {evt.target_type} ({evt.target_id?.slice(0, 10)})
                        </td>
                        <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-sans text-xs">
                          {evt.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODAL: Adjust Partner Org Tier & Manager */}
      {editOrgModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#070E1B] rounded-2xl border border-slate-200 dark:border-white/10 p-6 max-w-md w-full shadow-2xl space-y-4 text-xs animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-white/[0.08] pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Adjust Partner Organization Tier
                </h2>
                <p className="text-slate-500 mt-0.5">{editOrgModal.company_name} ({editOrgModal.country})</p>
              </div>
              <button onClick={() => setEditOrgModal(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveOrg} className="space-y-4">
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Program Tier *
                  </label>
                  <TierInfoTooltip align="left" />
                </div>
                <select
                  value={orgTier}
                  onChange={(e) => setOrgTier(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-slate-900 dark:text-white"
                >
                  <option value="Registered" className="bg-white dark:bg-[#0A1628]">Registered Tier (20% margin)</option>
                  <option value="Silver" className="bg-white dark:bg-[#0A1628]">Silver Tier (28% margin)</option>
                  <option value="Gold" className="bg-white dark:bg-[#0A1628]">Gold Tier (35% margin)</option>
                  <option value="Platinum" className="bg-white dark:bg-[#0A1628]">Platinum Tier (42% margin)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Assigned Partner Manager *
                </label>
                <input
                  type="text"
                  required
                  value={orgManager}
                  onChange={(e) => setOrgManager(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setEditOrgModal(null)}
                  className="btn-secondary text-xs px-4 py-2 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs px-4 py-2 rounded-xl font-bold"
                >
                  Save Tier & Manager
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Deal Decision (Approve / Decline) */}
      {dealDecisionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#070E1B] rounded-2xl border border-slate-200 dark:border-white/10 p-6 max-w-md w-full shadow-2xl space-y-4 text-xs animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-white/[0.08] pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  {dealDecisionModal.decision === "approve" ? (
                    <>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Approve Deal Protection Lock</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-500" />
                      <span>Decline Deal Registration</span>
                    </>
                  )}
                </h2>
                <p className="text-slate-500 mt-0.5">
                  {dealDecisionModal.deal.opportunity_name} • {dealDecisionModal.deal.customer_name} ({dealDecisionModal.deal.deal_code})
                </p>
              </div>
              <button onClick={() => setDealDecisionModal(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            {dealDecisionModal.decision === "approve" ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 leading-relaxed">
                Granting approval establishes an immutable <strong>90-day protection lock</strong> in PostgreSQL until {new Date(Date.now() + 90 * 86400000).toLocaleDateString()}.
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 leading-relaxed">
                Declining will notify the partner organization and release any domain lock reservations.
              </div>
            )}

            <form onSubmit={handleConfirmDealDecision} className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Partner-Visible Decision Notes *
                </label>
                <textarea
                  rows={3}
                  required
                  value={dealDecisionNotes}
                  onChange={(e) => setDealDecisionNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setDealDecisionModal(null)}
                  className="btn-secondary text-xs px-4 py-2 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={
                    dealDecisionModal.decision === "approve"
                      ? "btn-primary text-xs px-4 py-2 rounded-xl font-bold"
                      : "bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2 rounded-xl text-xs"
                  }
                >
                  Confirm {dealDecisionModal.decision === "approve" ? "Approval & 90d Lock" : "Decline"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Extend Deal Protection */}
      {extendDealModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#070E1B] rounded-2xl border border-slate-200 dark:border-white/10 p-6 max-w-md w-full shadow-2xl space-y-4 text-xs animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-white/[0.08] pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Extend Deal Protection Lock
                </h2>
                <p className="text-slate-500 mt-0.5">{extendDealModal.opportunity_name} ({extendDealModal.deal_code})</p>
              </div>
              <button onClick={() => setExtendDealModal(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmExtend} className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Extension Duration *
                </label>
                <select
                  value={extendDays}
                  onChange={(e) => setExtendDays(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-slate-900 dark:text-white"
                >
                  <option value="30" className="bg-white dark:bg-[#0A1628]">+30 Days (Active POC In Progress)</option>
                  <option value="60" className="bg-white dark:bg-[#0A1628]">+60 Days (Procurement In Legal Review)</option>
                  <option value="90" className="bg-white dark:bg-[#0A1628]">+90 Days (Enterprise Budget Cycle Alignment)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Extension Justification Notes
                </label>
                <input
                  type="text"
                  value={extendReason}
                  onChange={(e) => setExtendReason(e.target.value)}
                  placeholder="e.g. Approved extension for final customer procurement review"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setExtendDealModal(null)}
                  className="btn-secondary text-xs px-4 py-2 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs px-4 py-2 rounded-xl font-bold"
                >
                  Apply Extension
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Close Outcome */}
      {closeDealModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#070E1B] rounded-2xl border border-slate-200 dark:border-white/10 p-6 max-w-md w-full shadow-2xl space-y-4 text-xs animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-white/[0.08] pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Record Final Outcome: {closeDealModal.outcome === "closed_won" ? "Closed Won" : "Closed Lost"}
                </h2>
                <p className="text-slate-500 mt-0.5">{closeDealModal.deal.opportunity_name} ({closeDealModal.deal.deal_code})</p>
              </div>
              <button onClick={() => setCloseDealModal(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmOutcome} className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Outcome Notes / Contract Details
                </label>
                <textarea
                  rows={2}
                  value={closeNotes}
                  onChange={(e) => setCloseNotes(e.target.value)}
                  placeholder="e.g. Contract executed for 3-year subscription"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setCloseDealModal(null)}
                  className="btn-secondary text-xs px-4 py-2 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={closeDealModal.outcome === "closed_won" ? "bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs" : "bg-slate-700 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs"}
                >
                  Record Outcome
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Route Lead to Partner */}
      {routeLeadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#070E1B] rounded-2xl border border-slate-200 dark:border-white/10 p-6 max-w-md w-full shadow-2xl space-y-4 text-xs animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-white/[0.08] pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Route Inbound Lead to Partner
                </h2>
                <p className="text-slate-500 mt-0.5">
                  {routeLeadModal.prospect_company} ({routeLeadModal.prospect_country})
                </p>
              </div>
              <button onClick={() => setRouteLeadModal(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmRouteLead} className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Eligible Partner Organization *
                </label>
                <select
                  required
                  value={selectedPartnerOrg}
                  onChange={(e) => setSelectedPartnerOrg(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-slate-900 dark:text-white"
                >
                  {organizations.map((org) => (
                    <option key={org.partner_org_id} value={org.partner_org_id} className="bg-white dark:bg-[#0A1628]">
                      {org.company_name} ({org.current_tier} Tier • {org.region})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  Assigning initiates a 7-day acceptance SLA tracked in the partner&apos;s workspace.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setRouteLeadModal(null)}
                  className="btn-secondary text-xs px-4 py-2 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs px-4 py-2 rounded-xl font-bold"
                >
                  Dispatch Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Create Inbound Lead */}
      {createLeadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#070E1B] rounded-2xl border border-slate-200 dark:border-white/10 p-6 max-w-lg w-full shadow-2xl space-y-4 text-xs animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-white/[0.08] pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Create Inbound Lead for Routing Pool
                </h2>
                <p className="text-slate-500 mt-0.5">Add an inbound enterprise PAM prospect to be routed to an authorized partner.</p>
              </div>
              <button onClick={() => setCreateLeadModal(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateInboundLead} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={newLeadData.prospect_company}
                    onChange={(e) => setNewLeadData({ ...newLeadData, prospect_company: e.target.value })}
                    placeholder="Acme Financial"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Country *</label>
                  <input
                    type="text"
                    required
                    value={newLeadData.prospect_country}
                    onChange={(e) => setNewLeadData({ ...newLeadData, prospect_country: e.target.value })}
                    placeholder="United States"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={newLeadData.prospect_contact_name}
                    onChange={(e) => setNewLeadData({ ...newLeadData, prospect_contact_name: e.target.value })}
                    placeholder="Sarah Jenkins"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={newLeadData.prospect_contact_email}
                    onChange={(e) => setNewLeadData({ ...newLeadData, prospect_contact_email: e.target.value })}
                    placeholder="s.jenkins@acmefin.com"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Product Interest *</label>
                <input
                  type="text"
                  required
                  value={newLeadData.requested_product}
                  onChange={(e) => setNewLeadData({ ...newLeadData, requested_product: e.target.value })}
                  placeholder="OmniPriv Enterprise Credential Vault & Bastion"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Estimated Value (USD)</label>
                  <input
                    type="number"
                    value={newLeadData.estimated_value_usd}
                    onChange={(e) => setNewLeadData({ ...newLeadData, estimated_value_usd: e.target.value })}
                    placeholder="60000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Estimated Seats</label>
                  <input
                    type="number"
                    value={newLeadData.estimated_seats}
                    onChange={(e) => setNewLeadData({ ...newLeadData, estimated_seats: e.target.value })}
                    placeholder="50"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Notes</label>
                <textarea
                  rows={2}
                  value={newLeadData.notes}
                  onChange={(e) => setNewLeadData({ ...newLeadData, notes: e.target.value })}
                  placeholder="Inbound demo request from enterprise security evaluation campaign"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.1] text-slate-900 dark:text-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setCreateLeadModal(false)}
                  className="btn-secondary text-xs px-4 py-2 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs px-4 py-2 rounded-xl font-bold"
                >
                  Create Inbound Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
