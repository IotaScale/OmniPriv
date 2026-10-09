"use client";

import React, { useState, useEffect } from "react";
import { usePartnerPortal, EmptyState, LoadingSkeleton } from "@/components/partner-portal/PartnerPortalContext";
import { PartnerResource, ResourceCategory } from "@/lib/partner-portal/types";
import {
  FileText,
  Download,
  Search,
  Filter,
  FileCheck,
  Shield,
  Layers,
} from "lucide-react";

const categories: { label: string; value: string }[] = [
  { label: "All Collateral", value: "all" },
  { label: "Deployment & Architecture", value: "deployment" },
  { label: "Sales Battlecards", value: "sales" },
  { label: "Legal & Compliance", value: "legal" },
  { label: "Marketing Kits", value: "marketing" },
];

export default function ResourcesPage() {
  const [resources, setResources] = useState<PartnerResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadResources() {
      setLoading(true);
      try {
        const res = await fetch(`/api/partner/resources?category=${category}`);
        if (res.ok) {
          const data = await res.json();
          setResources(data.resources || []);
        }
      } catch (err) {
        console.error("Failed to load resources", err);
      } finally {
        setLoading(false);
      }
    }
    loadResources();
  }, [category]);

  const filtered = resources.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Partner Resources
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Find approved OmniPriv product, deployment, sales, and marketing materials for your team.
        </p>
      </div>

      {/* Category Filter Chips & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                category === c.value
                  ? "bg-[#00B8FF] text-slate-950 font-bold"
                  : "bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-[#0A1628] border border-slate-200 dark:border-white/[0.08] rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No resources match your current filters"
          description="Try selecting a different collateral category or resetting your search query."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628]/80 p-5 flex flex-col justify-between hover:border-cyan-500/40 transition-colors shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    v{item.version} • {item.file_format}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-white/[0.05] flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">
                  Requires {item.min_tier} Tier
                </span>
                <a
                  href={item.download_url}
                  download
                  className="btn-primary text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Collateral
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
