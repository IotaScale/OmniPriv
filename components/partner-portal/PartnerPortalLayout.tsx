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
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navSections: { section: string; items: NavItem[] }[] = [
  {
    section: "Overview",
    items: [
      { label: "Dashboard", href: "/partner-portal", icon: LayoutDashboard },
      { label: "Onboarding", href: "/partner-portal/onboarding", icon: CheckCircle2 },
    ],
  },
  {
    section: "Revenue & Customers",
    items: [
      { label: "Deals", href: "/partner-portal/deals", icon: Briefcase },
      { label: "Leads", href: "/partner-portal/leads", icon: Target },
      { label: "Renewals", href: "/partner-portal/renewals", icon: RefreshCw },
      { label: "Licenses & Trials", href: "/partner-portal/requests", icon: KeyRound },
    ],
  },
  {
    section: "Enablement",
    items: [
      { label: "Resources", href: "/partner-portal/resources", icon: FileText },
      { label: "Learning & Certifications", href: "/partner-portal/learning", icon: GraduationCap },
    ],
  },
  {
    section: "Growth",
    items: [
      { label: "Joint Business Plan", href: "/partner-portal/jbp", icon: TrendingUp },
      { label: "Marketing Funds", href: "/partner-portal/marketing", icon: Megaphone },
    ],
  },
  {
    section: "Administration",
    items: [
      { label: "My Company & Team", href: "/partner-portal/company", icon: Building },
      { label: "Payout Profile", href: "/partner-portal/payout", icon: CreditCard },
      { label: "Locator Profile", href: "/partner-portal/locator", icon: MapPin },
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
            <span className="text-slate-500">Workspace:</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {profile?.company_name || user?.orgName || "Partner Workspace"}
            </span>
            <span className="bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full font-medium text-[11px]">
              {tierInfo?.tier || profile?.current_tier || "Registered"} Tier
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />



          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold text-xs">
                {user?.name ? user.name.charAt(0) : "U"}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">
                  {user?.name || "Partner User"}
                </div>
                <div className="text-[11px] text-slate-500 leading-tight">
                  {user?.role || "Partner Owner"}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#0A1628] rounded-xl border border-slate-200 dark:border-white/10 shadow-xl py-2 z-50 text-xs">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-white/[0.06]">
                  <div className="font-semibold text-slate-900 dark:text-white">{user?.name}</div>
                  <div className="text-slate-500 truncate">{user?.email}</div>
                  <div className="text-[11px] text-cyan-600 dark:text-cyan-400 mt-1">{user?.orgName}</div>
                </div>

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
        <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628] p-4 shrink-0">
          <div className="space-y-6 flex-1 overflow-y-auto">
            {navSections.map((section) => (
              <div key={section.section} className="space-y-1">
                <div className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {section.section}
                </div>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-cyan-500/10 text-[#00B8FF] font-semibold dark:bg-cyan-500/15"
                          : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-white/[0.04]"
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

          <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08] mt-4 px-2 space-y-2">
            <Link
              href="/partners"
              target="_blank"
              className="flex items-center justify-between text-xs text-slate-500 hover:text-cyan-500 transition-colors"
            >
              <span>Public Directory</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <div className="text-[11px] text-slate-400">
              Commercial Boundary Verified
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
