"use client";

import React, { useState, useEffect } from "react";
import { usePartnerPortal, StatusChip, EmptyState, LoadingSkeleton } from "@/components/partner-portal/PartnerPortalContext";
import { PartnerCourse, PartnerCertification, CertificationDefinition } from "@/lib/partner-portal/types";
import {
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

export default function LearningPage() {
  const { profile, refreshKey, refresh } = usePartnerPortal();
  const [courses, setCourses] = useState<PartnerCourse[]>([]);
  const [certs, setCerts] = useState<PartnerCertification[]>([]);
  const [certDefs, setCertDefs] = useState<CertificationDefinition[]>([]);
  const [tierProgress, setTierProgress] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"courses" | "certs" | "requirements">("courses");
  const [loading, setLoading] = useState(true);
  const [completingId, setCompletingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadLearning() {
      setLoading(true);
      try {
        const res = await fetch("/api/partner/learning");
        if (res.ok) {
          const data = await res.json();
          setCourses(data.courses || []);
          setCerts(data.certifications || []);
          setCertDefs(data.certificationDefinitions || []);
          setTierProgress(data.tierProgress || null);
        }
      } catch (err) {
        console.error("Failed to load learning data", err);
      } finally {
        setLoading(false);
      }
    }
    loadLearning();
  }, [refreshKey]);

  async function handleCourseAction(courseId: string, action: "enroll" | "complete") {
    setCompletingId(courseId);
    try {
      const res = await fetch("/api/partner/learning", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, action }),
      });
      if (res.ok) {
        refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCompletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-white/[0.08] pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Learning and Certifications
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Build the sales and technical expertise required for your OmniPriv partner programs and specializations.
        </p>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          {/* Tier Requirement Progress Summary */}
          <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628]/80 p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Current Tier Certification Standing
                </div>
                <div className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{tierProgress?.tier || "Gold"} Tier</span>
                  <span className="text-sm font-normal text-slate-500">
                    ({tierProgress?.validCertsCount || 2} Valid Certifications on Record)
                  </span>
                </div>
              </div>

              <div className="text-sm text-slate-600 dark:text-slate-400">
                {tierProgress?.missing?.length > 0 ? (
                  <div className="text-amber-500">
                    Next Tier Requirement: {tierProgress.missing[0]}
                  </div>
                ) : (
                  <div className="text-emerald-500 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-4 h-4" /> All Tier Certification Requirements Satisfied
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-white/[0.08] pb-1">
            <button
              onClick={() => setActiveTab("courses")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                activeTab === "courses"
                  ? "bg-[#00B8FF]/15 text-[#00B8FF]"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
          Curriculum & Courses
        </button>
        <button
          onClick={() => setActiveTab("certs")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === "certs"
              ? "bg-[#00B8FF]/15 text-[#00B8FF]"
              : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Active Team Certifications ({certs.length})
        </button>
        <button
          onClick={() => setActiveTab("requirements")}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === "requirements"
              ? "bg-[#00B8FF]/15 text-[#00B8FF]"
              : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          Tier Requirements Guide
        </button>
      </div>

      {/* Courses Tab */}
      {activeTab === "courses" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628]/80 p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                    {course.code}
                  </span>
                  <span className="text-[11px] text-slate-400">{course.duration_hours} Hours</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{course.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  Target Audience: {course.target_role}
                </p>

                <div className="space-y-1 mb-4">
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Progress</span>
                    <span>{course.completion_pct}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-cyan-500 h-full rounded-full transition-all"
                      style={{ width: `${course.completion_pct}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-white/[0.05]">
                {course.completion_pct === 100 ? (
                  <span className="text-emerald-500 text-xs font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Certified
                  </span>
                ) : (
                  <button
                    onClick={() => handleCourseAction(course.id, "complete")}
                    disabled={completingId === course.id}
                    className="btn-primary text-xs w-full justify-center py-2 rounded-lg"
                  >
                    {completingId === course.id ? "Validating..." : "Complete & Issue Certificate"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certs Tab */}
      {activeTab === "certs" && (
        <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628]/80 overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-slate-400 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Certification</th>
                <th className="py-3 px-4">Certified Member</th>
                <th className="py-3 px-4">Verification ID</th>
                <th className="py-3 px-4">Issue Date</th>
                <th className="py-3 px-4">Valid Until</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
              {certs.map((c) => (
                <tr key={c.id}>
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    {c.certification_name}
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                    {c.user_name}
                  </td>
                  <td className="py-3 px-4 font-mono text-cyan-600 dark:text-cyan-400">
                    {c.verification_code}
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {new Date(c.issued_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                    {new Date(c.expires_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <StatusChip status={c.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Requirements Guide Tab */}
      {activeTab === "requirements" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {certDefs.map((def) => (
            <div key={def.id} className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#0A1628]/80">
              <div className="font-mono text-xs text-cyan-500 mb-1">{def.code}</div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{def.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{def.description}</p>
              <div className="pt-3 border-t border-slate-100 dark:border-white/[0.05] text-[11px] text-slate-400 space-y-1">
                <div>Validity: {def.valid_duration_months} Months</div>
                <div>Required for: {def.required_for_tier.join(", ")} Tiers</div>
              </div>
            </div>
          ))}
        </div>
      )}
        </>
      )}
    </div>
  );
}
