"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePartnerPortal } from "./PartnerPortalContext";
import {
  Shield,
  LayoutDashboard,
  CheckCircle2,
  Briefcase,
  Target,
  RefreshCw,
  KeyRound,
  FileText,
  GraduationCap,
  TrendingUp,
  Megaphone,
  CreditCard,
  Building,
  MapPin,
  LogOut,
  Bell,
  HelpCircle,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
  User,
  PlusCircle,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navSections: { section: string; items: NavItem[] }[] = [
  {
    section: "Deal & Pipeline",
    items: [
      { label: "Overview", href: "/partner-portal", icon: LayoutDashboard },
      { label: "Register a Deal", href: "/partner-portal/deals/new", icon: PlusCircle },
      { label: "My Deals", href: "/partner-portal/deals", icon: Briefcase },
      { label: "Assigned Leads", href: "/partner-portal/leads", icon: Target },
      { label: "Renewals", href: "/partner-portal/renewals", icon: RefreshCw },
    ],
  },
  {
    section: "Enablement & Organization",
    items: [
      { label: "Resources / Enablement", href: "/partner-portal/resources", icon: FileText },
      { label: "Company Profile", href: "/partner-portal/company", icon: Building },
    ],
  },
];

export default function PartnerPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, profile, tierInfo, signOut, role, loading } = usePartnerPortal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <div className="partner-portal-app min-h-screen bg-slate-100/70 dark:bg-[#030711] text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Top Banner for Channel Administrators */}
      {(user?.role === "Channel Admin" || user?.role === "Partner Manager") && (
        <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-cyan-950 border-b border-cyan-500/30 px-4 sm:px-6 py-2.5 text-xs flex flex-wrap items-center justify-between gap-3 text-cyan-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-bold text-white">Channel Administrator Session:</span>
            <span className="text-cyan-300">
              You are currently viewing a partner workspace. All registered deals across all companies are arbitrated in the Admin Console.
            </span>
          </div>
          <Link
            href="/channel-admin"
            className="px-3.5 py-1.5 bg-[#00B8FF] hover:bg-cyan-400 text-slate-950 font-bold rounded-lg transition-all text-xs flex items-center gap-1.5 shrink-0 shadow"
          >
            <Shield className="w-3.5 h-3.5" />
            Switch to Channel Admin Console &rarr;
          </Link>
        </div>
      )}

      {/* Top Enterprise Product Header (Zero Public Marketing Links) */}
      <header className="h-16 bg-white dark:bg-[#0A1628] border-b border-slate-200 dark:border-white/[0.08] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.04]"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/partner-portal" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-[#00B8FF] flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-extrabold text-base tracking-tight text-slate-950 dark:text-white">
                OmniPriv
              </span>
              <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                Partner Portal
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-white/[0.08] text-xs">
            <span className="text-slate-400">Workspace:</span>
            <span className="font-bold text-slate-900 dark:text-white tracking-tight">
              {profile?.company_name || user?.orgName || "Partner Workspace"}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
              (tierInfo?.tier || profile?.current_tier) === "Platinum"
                ? "bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                : (tierInfo?.tier || profile?.current_tier) === "Gold"
                ? "bg-amber-500/15 text-amber-500 dark:text-amber-400 border border-amber-500/30"
                : (tierInfo?.tier || profile?.current_tier) === "Silver"
                ? "bg-slate-200 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-600"
                : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20"
            }`}>
              {tierInfo?.tier || profile?.current_tier || "Registered"} Tier
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {(user?.role === "Channel Admin" || user?.role === "Partner Manager") && (
            <Link
              href="/channel-admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-[#00B8FF] border border-cyan-500/30 text-xs font-bold transition-all shadow-sm"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Console</span>
            </Link>
          )}

          <ThemeToggle />

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-[#00B8FF] flex items-center justify-center font-bold text-xs shadow-inner">
                {user?.name ? user.name.charAt(0) : "U"}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  {user?.name || "Partner User"}
                </div>
                <div className="text-[11px] text-slate-500 leading-tight">
                  {user?.role || "Partner Owner"}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#0A1628] rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl py-2 z-50 text-xs backdrop-blur-xl animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-2.5 border-b border-slate-100 dark:border-white/[0.06]">
                  <div className="font-bold text-slate-900 dark:text-white">{user?.name}</div>
                  <div className="text-slate-500 truncate">{user?.email}</div>
                  <div className="text-[11px] text-[#00B8FF] font-semibold mt-1">{user?.orgName}</div>
                </div>

                {(user?.role === "Channel Admin" || user?.role === "Partner Manager") && (
                  <Link
                    href="/channel-admin"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-[#00B8FF] font-bold hover:bg-cyan-500/10 border-b border-slate-100 dark:border-white/[0.06]"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Channel Admin Console</span>
                  </Link>
                )}

                <Link
                  href="/partner-portal/company"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.04]"
                >
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>My Company & Team</span>
                </Link>

                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    signOut();
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 border-t border-slate-100 dark:border-white/[0.06] mt-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out of Session</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container with Sidebar Navigation */}
      <div className="flex-1 flex">
        {/* Desktop Left Rail Navigation */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#070D18] p-4 shrink-0">
          {/* Quick Register Deal Button */}
          <div className="mb-4">
            <Link
              href="/partner-portal/deals/new"
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#00B8FF] to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all active:scale-[0.98]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Register New Deal</span>
            </Link>
          </div>

          <div className="space-y-6 flex-1 overflow-y-auto">
            {navSections.map((section) => (
              <div key={section.section} className="space-y-1">
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {section.section}
                </div>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all relative ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-500/15 via-cyan-500/5 to-transparent text-[#00B8FF] border-l-2 border-[#00B8FF] shadow-[0_0_15px_rgba(0,184,255,0.06)]"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/[0.04]"
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#00B8FF]" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08] mt-4 px-2 space-y-2">
            <Link
              href="/partners"
              target="_blank"
              className="flex items-center justify-between text-xs text-slate-500 hover:text-cyan-500 transition-colors"
            >
              <span>Public Directory</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <div className="text-[10px] font-mono text-emerald-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>PostgreSQL Production Sync</span>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm flex">
            <div className="w-72 bg-white dark:bg-[#0A1628] h-full p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.08] pb-4">
                  <div className="font-bold text-sm text-slate-900 dark:text-white">Navigation</div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {navSections.map((section) => (
                  <div key={section.section} className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                      {section.section}
                    </div>
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                            isActive
                              ? "bg-cyan-500/10 text-cyan-600 font-semibold"
                              : "text-slate-600 dark:text-slate-300"
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/[0.08]">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 font-semibold text-xs"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Operational Workspace Viewport */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
