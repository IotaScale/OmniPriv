import type { ElementType } from "react";
import {
  User,
  Laptop,
  Users,
  Cpu,
  Cloud,
  Box,
  Server,
  Database,
  ScanSearch,
  ShieldCheck,
  Settings,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const identities = [
  { label: "Human", icon: User },
  { label: "Machine", icon: Laptop },
  { label: "Vendor", icon: Users },
  { label: "AI & Automated", icon: Cpu },
];

const targets = [
  { label: "Cloud", icon: Cloud },
  { label: "SaaS", icon: Box },
  { label: "On-Prem", icon: Server },
  { label: "Databases", icon: Database },
];

const stages = [
  {
    title: "Discover",
    icon: ScanSearch,
    items: ["Identities", "Privileges", "Entitlements", "Context & Risk"],
  },
  {
    title: "Control",
    icon: ShieldCheck,
    items: ["MFA & Verification", "Just-in-Time Access", "Zero Standing Privileges", "Session Security"],
  },
  {
    title: "Govern",
    icon: Settings,
    items: ["Onboarding", "Access Reviews", "Lifecycle Management", "Compliance"],
  },
];

function Rail({
  title,
  items,
}: {
  title: string;
  items: { label: string; icon: ElementType }[];
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-900/[0.08] dark:border-[#00B8FF]/15 bg-gradient-to-b from-slate-100 to-white dark:from-[#0A1628] dark:to-[#050a14] p-4 lg:py-7">
      <div className="text-center text-sm font-bold text-slate-950 dark:text-white mb-4 lg:mb-7 leading-tight">
        {title}
      </div>
      <div className="flex flex-row lg:flex-col items-center justify-center gap-5 lg:gap-6 flex-1">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2">
            <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-full border border-[#00B8FF]/30 bg-[#00B8FF]/[0.06] flex items-center justify-center">
              <item.icon className="w-5 h-5 text-[#00B8FF]" />
            </div>
            <span className="text-[11px] lg:text-xs text-slate-600 dark:text-slate-400 text-center leading-tight max-w-[70px]">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ControlPlaneSection() {
  return (
    <section className="relative section-padding border-b border-slate-900/[0.05] dark:border-white/[0.04] bg-white dark:bg-[#030711] overflow-hidden">
      {/* Top ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(0,184,255,0.08) 0%, transparent 65%)",
        }}
      />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="text-center max-w-5xl mx-auto mb-12">
          <div className="text-[#00B8FF] text-xs font-bold uppercase tracking-[0.25em] mb-4 font-mono">
            How OmniPriv Works
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white mb-5 tracking-tight"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            The Privileged Access <span className="text-gradient">Control Plane</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-4xl mx-auto">
            OmniPriv secures human, machine, vendor, and automated identities through a unified
            control plane that discovers risk, enforces least privilege, and governs the full
            privileged access lifecycle.
          </p>
        </div>

        {/* Top connector */}
        <div className="hidden lg:flex items-center gap-2 mb-5">
          <ArrowLeft className="cp-arrow-left w-4 h-4 text-[#00B8FF] flex-shrink-0" />
          <div className="cp-dash cp-dash-left flex-1" />
          <span className="px-4 text-sm font-semibold text-slate-950 dark:text-white whitespace-nowrap">
            Intelligent Detection &amp; Response
          </span>
          <div className="cp-dash cp-dash-right flex-1" />
          <ArrowRight className="cp-arrow-right w-4 h-4 text-[#00B8FF] flex-shrink-0" />
        </div>

        {/* Control plane grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_1fr_1fr_180px] gap-4 items-stretch">
          <Rail title="All Identities" items={identities} />

          {stages.map((stage) => (
            <div
              key={stage.title}
              className="group relative flex flex-col rounded-2xl border border-[#00B8FF]/20 bg-gradient-to-b from-slate-100 to-white dark:from-[#0A1628] dark:to-[#050a14] p-6 pt-12 overflow-hidden shadow-[0_0_50px_rgba(0,184,255,0.06)] transition-all duration-300 hover:border-[#00B8FF]/45 hover:shadow-[0_16px_50px_rgba(0,184,255,0.14)] hover:-translate-y-1"
            >
              <div className="relative flex flex-col flex-1">
                {/* Icon with scan rings centred on it */}
                <div className="relative mx-auto w-14 h-14 mb-6">
                  <svg
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[210px] h-[210px]"
                    viewBox="0 0 210 210"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle cx="105" cy="105" r="36" stroke="#00B8FF" strokeOpacity="0.18" />
                    <circle
                      cx="105"
                      cy="105"
                      r="56"
                      stroke="#00B8FF"
                      strokeOpacity="0.22"
                      strokeDasharray="2 7"
                      className="cp-ring-spin"
                    />
                    <circle
                      cx="105"
                      cy="105"
                      r="76"
                      stroke="#00B8FF"
                      strokeOpacity="0.12"
                      strokeDasharray="1 9"
                      className="cp-ring-spin-reverse"
                    />
                    <circle cx="105" cy="29" r="2.4" fill="#00B8FF" fillOpacity="0.8" />
                    <circle cx="181" cy="105" r="2.4" fill="#00B8FF" fillOpacity="0.6" />
                    <circle cx="150" cy="175" r="2.4" fill="#00B8FF" fillOpacity="0.6" />
                    <circle cx="42" cy="160" r="2.4" fill="#00B8FF" fillOpacity="0.6" />
                  </svg>

                  {/* Pulsing halo behind the icon */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl border border-[#00B8FF]/40 cp-icon-pulse" />

                  <div className="relative w-14 h-14 rounded-2xl bg-[#00B8FF]/10 border border-[#00B8FF]/25 flex items-center justify-center shadow-[0_0_24px_rgba(0,184,255,0.15)]">
                    <stage.icon className="w-7 h-7 text-[#00B8FF]" />
                  </div>
                </div>

                <h3
                  className="text-2xl font-extrabold text-slate-950 dark:text-white text-center"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {stage.title}
                </h3>

                <div className="h-px w-24 mx-auto my-5 bg-gradient-to-r from-transparent via-[#00B8FF]/60 to-transparent" />

                <ul className="space-y-2.5">
                  {stage.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                    >
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#00B8FF] flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          <Rail title="All Targets" items={targets} />
        </div>

        {/* Bottom connector */}
        <div className="hidden lg:flex items-center gap-2 mt-5">
          <ArrowLeft className="cp-arrow-left w-4 h-4 text-[#00B8FF] flex-shrink-0" />
          <div className="cp-dash cp-dash-left flex-1" />
          <span className="px-4 text-sm font-semibold text-slate-950 dark:text-white whitespace-nowrap">
            Automated Policy &amp; Posture
          </span>
          <div className="cp-dash cp-dash-right flex-1" />
          <ArrowRight className="cp-arrow-right w-4 h-4 text-[#00B8FF] flex-shrink-0" />
        </div>
      </div>
    </section>
  );
}
