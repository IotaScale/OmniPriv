"use client";

import React, { useState } from "react";
import { usePartnerPortal, StatusChip } from "@/components/partner-portal/PartnerPortalContext";
import {
  Building,
  Users,
  ShieldAlert,
  UserPlus,
  Mail,
  Shield,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function CompanyPage() {
  const { user, profile, can } = usePartnerPortal();

  const team = [
    {
      name: user?.name || "Marcus Vance",
      email: user?.email || "marcus.vance@apexcybersolutions.com",
      role: user?.role || "Partner Owner",
      status: "Active",
      description: "Company administration, agreements, and overall program lead.",
    },
    {
      name: "Chloe Reynolds",
      email: "chloe.r@apexcybersolutions.com",
      role: "Partner Sales",
      status: "Active",
      description: "Opportunity registration, deal tracking, and assigned lead management. Zero customer PAM access.",
    },
    {
      name: "Finance Desk",
      email: "finance@apexcybersolutions.com",
      role: "Partner Finance",
      status: "Active",
      description: "Payout account management, commercial claims, and banking tokenization reviews.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            My Company and Team
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Keep your partner organization profile, contacts, and portal roles up to date.
          </p>
        </div>

        {can("channel.partner.manage") && (
          <button
            onClick={() => alert("Invitation link copied to clipboard for new partner colleague.")}
            className="btn-primary text-sm px-4 py-2.5 rounded-lg flex items-center gap-1.5 self-start sm:self-auto"
          >
            <UserPlus className="w-4 h-4" />
            Invite Team Member
          </button>
        )}
      </div>

      {/* Security boundary card */}
      <div className="p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/[0.06] text-xs text-slate-700 dark:text-slate-300 flex items-start gap-3">
        <Lock className="w-4 h-4 text-[#00B8FF] shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-900 dark:text-white">Strict Tenant Isolation:</span>
          {" "}Partner portal roles grant commercial channel privileges only. A partner user is never a member of any customer PAM tenant, and cannot access customer vaults, servers, or session recordings.
        </div>
      </div>

      {/* Company Profile Details */}
      <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628]/80 p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/[0.05] mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {profile?.company_name || "Apex Cyber Solutions Ltd"}
              </h2>
              <div className="text-xs text-slate-500">
                Legal Entity: {profile?.legal_name || "Apex Cyber Solutions International Inc."}
              </div>
            </div>
          </div>
          <StatusChip status={profile?.program_status || "Active"} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block mb-0.5">Primary Location</span>
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {profile?.country || "United Kingdom"} ({profile?.region || "EMEA"})
            </span>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Corporate Website</span>
            <a
              href={profile?.website || "https://apexcybersolutions.com"}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-500 hover:underline"
            >
              {profile?.website || "https://apexcybersolutions.com"}
            </a>
          </div>
          <div>
            <span className="text-slate-400 block mb-0.5">Assigned OmniPriv Partner Manager</span>
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {profile?.primary_partner_manager_name || "Elena Rostova"}
            </span>
          </div>
        </div>
      </div>

      {/* Team Roster */}
      <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628]/80 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 dark:border-white/[0.08] font-bold text-sm text-slate-900 dark:text-white">
          Active Team Members & Assigned Channel Roles
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-slate-400 uppercase font-semibold">
            <tr>
              <th className="py-3 px-4">Member Name</th>
              <th className="py-3 px-4">Channel Role</th>
              <th className="py-3 px-4">Role Privileges & Operational Scope</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
            {team.map((member) => (
              <tr key={member.email} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02]">
                <td className="py-3 px-4">
                  <div className="font-semibold text-slate-900 dark:text-white">{member.name}</div>
                  <div className="text-[11px] text-slate-400">{member.email}</div>
                </td>
                <td className="py-3 px-4 font-semibold text-cyan-600 dark:text-cyan-400">
                  {member.role}
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-400 max-w-md">
                  {member.description}
                </td>
                <td className="py-3 px-4">
                  <StatusChip status={member.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
