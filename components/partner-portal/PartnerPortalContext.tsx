"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PartnerRole, PartnerProfile, ChannelFeatureFlags } from "@/lib/partner-portal/types";
import { hasCapability, ChannelCapability } from "@/lib/partner-portal/permissions";
import { DEFAULT_FEATURE_FLAGS } from "@/lib/partner-portal/feature-flags";

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  orgId: string;
  orgName: string;
  role: PartnerRole | "Customer Admin";
}

interface PartnerContextType {
  user: AuthenticatedUser | null;
  role: PartnerRole;
  orgId: string;
  profile: PartnerProfile | null;
  tierInfo: { tier: string; validCertsCount: number; missing: string[] } | null;
  featureFlags: ChannelFeatureFlags;
  loading: boolean;
  can: (cap: ChannelCapability) => boolean;
  signOut: () => Promise<void>;
  refresh: () => void;
  refreshKey: number;
}

const PartnerContext = createContext<PartnerContextType | null>(null);

export function PartnerPortalProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [role, setRole] = useState<PartnerRole>("Partner Owner");
  const [orgId, setOrgId] = useState<string>("org-partner-apex");
  const [profile, setProfile] = useState<PartnerProfile | null>(null);
  const [tierInfo, setTierInfo] = useState<{ tier: string; validCertsCount: number; missing: string[] } | null>(null);
  const [capabilities, setCapabilities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((k) => k + 1);

  useEffect(() => {
    async function loadAuthSession() {
      try {
        const res = await fetch("/api/auth/session");
        if (!res.ok) {
          // If unauthorized, redirect to login
          router.push("/sign-in?error=session_expired");
          return;
        }

        const data = await res.json();
        setUser(data.user);
        setRole(data.user.role as PartnerRole);
        setOrgId(data.user.orgId);
        setProfile(data.profile);
        setTierInfo(data.tierCalculation);
        setCapabilities(data.capabilities || []);
      } catch (err) {
        console.error("Session load failed", err);
      } finally {
        setLoading(false);
      }
    }

    loadAuthSession();
  }, [refreshKey, router]);

  async function signOut() {
    try {
      await fetch("/api/auth/sign-out", { method: "POST" });
    } catch {
      // ignore
    }
    router.push("/sign-in");
  }

  const can = (capability: ChannelCapability) => {
    if (capabilities.length > 0) {
      return capabilities.includes(capability);
    }
    return hasCapability(role, capability);
  };

  return (
    <PartnerContext.Provider
      value={{
        user,
        role,
        orgId,
        profile,
        tierInfo,
        featureFlags: DEFAULT_FEATURE_FLAGS,
        loading,
        can,
        signOut,
        refresh,
        refreshKey,
      }}
    >
      {children}
    </PartnerContext.Provider>
  );
}

export function usePartnerPortal() {
  const ctx = useContext(PartnerContext);
  if (!ctx) throw new Error("usePartnerPortal must be used within PartnerPortalProvider");
  return ctx;
}

export function StatusChip({ status }: { status: string }) {
  const norm = status.toLowerCase().replace(/_/g, " ");

  let style = "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700";
  if (["approved", "verified", "active", "renewed", "qualified", "closed won"].includes(norm)) {
    style = "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-300 dark:border-emerald-500/30";
  } else if (["under review", "submitted", "pending", "working", "assigned", "in negotiation", "quote requested", "claim submitted"].includes(norm)) {
    style = "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-300 dark:border-amber-500/30";
  } else if (["declined", "suspended", "expired", "revoked", "closed lost", "disqualified", "lapsed"].includes(norm)) {
    style = "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border-rose-300 dark:border-rose-500/30";
  } else if (["expiring", "changes requested", "action required"].includes(norm)) {
    style = "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400 border-orange-300 dark:border-orange-500/30";
  }

  const capitalize = norm
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold border ${style}`}>
      {capitalize}
    </span>
  );
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 dark:border-white/15 bg-slate-50/70 dark:bg-[#0A1628]/40 p-10 text-center my-6">
      <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1.5">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-5 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn-primary text-xs px-4 py-2.5 rounded-lg shadow-sm">
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function LoadingSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A1628] p-6 space-y-4 animate-pulse">
      <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
      <div className="space-y-3 pt-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-10 bg-slate-100 dark:bg-slate-800/60 rounded"></div>
        ))}
      </div>
    </div>
  );
}
