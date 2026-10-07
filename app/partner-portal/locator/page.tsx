"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePartnerPortal, StatusChip, LoadingSkeleton } from "@/components/partner-portal/PartnerPortalContext";
import { PartnerLocatorProfile } from "@/lib/partner-portal/types";
import {
  MapPin,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
  Globe,
  Building,
} from "lucide-react";

export default function LocatorPage() {
  const { can, refreshKey, refresh } = usePartnerPortal();
  const [locator, setLocator] = useState<PartnerLocatorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    display_name: "",
    headquarters: "",
    public_description: "",
    public_contact_email: "",
    public_website: "",
    service_regions: "United Kingdom, Western Europe, Nordics",
    specializations: "Enterprise Vault Deployment, Managed PAM Service (MSSP), Zero Trust Migration",
  });

  useEffect(() => {
    async function loadLocator() {
      setLoading(true);
      try {
        const res = await fetch("/api/partner/locator");
        if (res.ok) {
          const data = await res.json();
          setLocator(data.locator);
          if (data.locator) {
            setFormData({
              display_name: data.locator.display_name,
              headquarters: data.locator.headquarters,
              public_description: data.locator.public_description,
              public_contact_email: data.locator.public_contact_email,
              public_website: data.locator.public_website,
              service_regions: data.locator.service_regions.join(", "),
              specializations: data.locator.specializations.join(", "),
            });
          }
        }
      } catch (err) {
        console.error("Failed to load locator", err);
      } finally {
        setLoading(false);
      }
    }
    loadLocator();
  }, [refreshKey]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/partner/locator", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          display_name: formData.display_name,
          headquarters: formData.headquarters,
          public_description: formData.public_description,
          public_contact_email: formData.public_contact_email,
          public_website: formData.public_website,
          service_regions: formData.service_regions.split(",").map((s) => s.trim()),
          specializations: formData.specializations.split(",").map((s) => s.trim()),
          is_active_listing: true,
        }),
      });
      if (res.ok) {
        refresh();
        setIsEditing(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Locator Profile
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage the public profile customers use to find approved OmniPriv partners.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/partners"
            target="_blank"
            className="btn-secondary text-sm px-3.5 py-2 rounded-lg flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            View Public Directory
          </Link>
          {can("channel.locator.manage_own") && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary text-sm px-4 py-2 rounded-lg"
            >
              Edit Public Profile
            </button>
          )}
        </div>
      </div>

      <div className="p-4 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02] text-sm text-slate-600 dark:text-slate-400">
        <span className="font-semibold text-slate-900 dark:text-white">Publication Boundary:</span>
        {" "}Only approved public company information is published. Customer data, commercial volumes, and confidential accounts are never published.
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : !isEditing && locator ? (
        <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628]/80 p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/[0.05]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{locator.display_name}</h2>
                <StatusChip status={locator.admin_approved ? "Approved" : "Under Review"} />
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {locator.headquarters}
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            {locator.public_description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-semibold text-slate-900 dark:text-white mb-1.5">Approved Service Regions</div>
              <div className="flex flex-wrap gap-1.5">
                {locator.service_regions.map((r, i) => (
                  <span key={i} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded text-[11px]">
                    {r}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="font-semibold text-slate-900 dark:text-white mb-1.5">Verified Specializations</div>
              <div className="flex flex-wrap gap-1.5">
                {locator.specializations.map((s, i) => (
                  <span key={i} className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded text-[11px]">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628]/80 p-6 space-y-4 text-xs">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Edit Public Locator Listing</h2>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Display Name *</label>
            <input
              type="text"
              required
              value={formData.display_name}
              onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Headquarters City, Country</label>
              <input
                type="text"
                value={formData.headquarters}
                onChange={(e) => setFormData({ ...formData, headquarters: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Public Inquiries Email</label>
              <input
                type="email"
                value={formData.public_contact_email}
                onChange={(e) => setFormData({ ...formData, public_contact_email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Public Company Overview</label>
            <textarea
              rows={3}
              value={formData.public_description}
              onChange={(e) => setFormData({ ...formData, public_description: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] rounded-lg"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-white/[0.05]">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn-secondary text-xs px-3 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary text-xs px-4 py-2 rounded-lg"
            >
              {submitting ? "Saving..." : "Submit for Approval"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
