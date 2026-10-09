"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Shield,
  Search,
  MapPin,
  Globe,
  Mail,
  Award,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export default function PublicPartnersPage() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [regionFilter, setRegionFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadListings() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (regionFilter !== "all") queryParams.set("region", regionFilter);
        if (search) queryParams.set("query", search);

        const res = await fetch(`/api/public/locator?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setListings(data.listings || []);
        }
      } catch (err) {
        console.error("Failed to load partner locator listings", err);
      } finally {
        setLoading(false);
      }
    }
    loadListings();
  }, [regionFilter, search]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030711] text-slate-900 dark:text-slate-100 pt-28 pb-16">
      <div className="container-xl max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="badge-cyan mx-auto mb-3">Global Channel Ecosystem</div>
          <h1
            className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white mb-3"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            OmniPriv Authorized Partner Directory
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Connect with certified privileged access security specialists, authorized resellers, and MSSPs equipped to design, deploy, and manage OmniPriv in your enterprise.
          </p>
        </div>

        {/* Filter / Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0A1628]/80 p-4 rounded-2xl border border-slate-200 dark:border-white/[0.08] shadow-sm mb-8">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by partner name, city, or specialization..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Region:</span>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-xs rounded-xl px-3 py-2 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="all">All Regions</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="North America">North America</option>
              <option value="Western Europe">Western Europe</option>
              <option value="Nordics">Nordics</option>
            </select>
          </div>
        </div>

        {/* Partner Cards Grid */}
        {loading ? (
          <div className="text-center py-16 text-xs text-slate-400">Loading authorized partners...</div>
        ) : listings.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#0A1628]/40 rounded-2xl border border-dashed border-slate-200 dark:border-white/10 p-8">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-1">No Partners Found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              No approved partners match your criteria in this region. Contact OmniPriv direct sales for regional inquiries.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {listings.map((partner) => (
              <div
                key={partner.id}
                className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628]/80 p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-colors shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                        {partner.display_name}
                      </h2>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                        <span>{partner.headquarters}</span>
                      </div>
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                      Authorized Partner
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {partner.public_description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                        Approved Specializations
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {partner.specializations.map((spec: string, i: number) => (
                          <span
                            key={i}
                            className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-md text-[11px] font-medium"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                        Coverage Regions
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {partner.service_regions.map((reg: string, i: number) => (
                          <span
                            key={i}
                            className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md text-[11px]"
                          >
                            {reg}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/[0.05] flex items-center justify-between text-xs">
                  <a
                    href={`mailto:${partner.public_contact_email}`}
                    className="text-slate-600 dark:text-slate-300 hover:text-cyan-500 flex items-center gap-1.5 font-medium"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Contact Partner</span>
                  </a>

                  <a
                    href={partner.public_website}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-16 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-100/60 dark:bg-[#0A1628]/60 p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-base font-bold text-slate-950 dark:text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>
            Become an OmniPriv Channel Partner
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">
            Expand your cybersecurity portfolio with high-margin enterprise PAM, AI governance, and cloud bastion solutions designed for resellers and MSPs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`${process.env.NEXT_PUBLIC_PORTAL_URL || "https://portal.omnipriv.com"}/sign-up`}
              className="btn-primary text-xs px-5 py-2.5 rounded-lg inline-flex items-center gap-1.5 w-full sm:w-auto justify-center"
            >
              Apply for Partnership
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
            <a
              href={`${process.env.NEXT_PUBLIC_PORTAL_URL || "https://portal.omnipriv.com"}/sign-in`}
              className="btn-secondary text-xs px-5 py-2.5 rounded-lg inline-flex items-center gap-1.5 w-full sm:w-auto justify-center"
            >
              Partner Workspace Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
