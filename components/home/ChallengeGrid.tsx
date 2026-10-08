import Link from "next/link";
import { ArrowRight, Bot, Boxes, Globe, Layers, ScrollText, ShieldAlert } from "lucide-react";

/*
 * "Six privileged access gaps. One governed platform."
 *
 * All six gaps on screen at once, so a reader can scan them and go straight
 * to the one they care about. One hairline grid (3 x 2 on desktop, 2 x 3 on
 * tablet, stacked on phones) on the shared homepage surface: no pinning, no
 * scroll stepping, no per-card choreography. The section rises in with every
 * other section (FlowSection in app/page.tsx); hover only tints the cell and
 * fills its icon.
 */

const GAPS = [
  {
    id: "ai-agents",
    headline: "Secure AI agents",
    body: "Give AI agents and automated workflows JIT access, least privilege, protected credentials and governed access, like any other privileged identity.",
    chips: ["MCP agent identity", "Tool-level authorization", "Prompt-injection guard"],
    href: "/platform/secure-ai-agents-omnipriv",
    icon: Bot,
  },
  {
    id: "ai-attacks",
    headline: "Defend against AI-driven threats",
    body: "Machine-learning scoring watches every privileged session and responds to suspicious activity in seconds, not after the incident review.",
    chips: ["ML behavioural scoring", "10-second auto-block", "Impossible travel"],
    href: "/platform/ai-threat-protection",
    icon: ShieldAlert,
  },
  {
    id: "remote",
    headline: "Secure remote and hybrid access",
    body: "Administrators, employees and vendors reach critical systems through a brokered, MFA-verified, recorded session, without a VPN.",
    chips: ["Brokered RDP and SSH", "Vendor access windows", "Every session recorded"],
    href: "/platform/secure-remote-access",
    icon: Globe,
  },
  {
    id: "compliance",
    headline: "Audit, governance and compliance",
    body: "Centralised activity logs, policy controls, session records and compliance-ready reporting across every critical system.",
    chips: ["Immutable session logs", "Mapped controls", "One-click reports"],
    href: "/platform/audit-compliance",
    icon: ScrollText,
  },
  {
    id: "risk",
    headline: "Reduce privileged identity risk",
    body: "Find excessive and unused privileges, then convert standing access to Just-in-Time across people, machines and agents.",
    chips: ["Excess privilege discovery", "Zero standing privilege", "Just-in-Time access"],
    href: "/platform/identity-security",
    icon: Layers,
  },
  {
    id: "consolidation",
    headline: "Consolidate PAM and identity security",
    body: "Privileged access, identity controls, credentials, session monitoring and policy enforcement in one platform instead of five tools.",
    chips: ["Nine modules", "One policy engine", "One audit trail"],
    href: "/platform/consolidation",
    icon: Boxes,
  },
];

export default function ChallengeGrid() {
  return (
    <section className="relative">
      <div className="container-xl pt-20 pb-24 lg:pt-24 lg:pb-28">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.04em] leading-[1.06] text-slate-950 dark:text-white"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Six privileged access gaps.
              <span className="block text-slate-400 dark:text-slate-500">One governed platform.</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              From governing autonomous AI agents to proving compliance, OmniPriv closes the gaps attackers look for
              first.
            </p>
          </div>
          <Link
            href="/platform"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#00869f] dark:text-[#00B8DB] shrink-0"
          >
            Explore the platform
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <ul className="cg-grid mt-10 lg:mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-3xl overflow-hidden border border-slate-900/[0.08] dark:border-white/[0.08] bg-slate-900/[0.08] dark:bg-white/[0.08]">
          {GAPS.map((g) => (
            <li key={g.id} className="cg-cell relative flex flex-col bg-white dark:bg-[#0f2140] p-6 xl:p-7">
              <span className="cg-icon inline-flex items-center justify-center w-10 h-10 rounded-xl">
                <g.icon className="w-5 h-5" aria-hidden="true" />
              </span>
              <h3
                className="mt-5 text-xl font-semibold tracking-[-0.025em] text-slate-950 dark:text-white"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {g.headline}
              </h3>
              <p className="mt-2.5 text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed">{g.body}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${g.headline}: key capabilities`}>
                {g.chips.map((c) => (
                  <li
                    key={c}
                    className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-900/[0.04] dark:bg-white/[0.06] text-slate-700 dark:text-slate-300"
                  >
                    {c}
                  </li>
                ))}
              </ul>
              <Link
                href={g.href}
                className="cg-link mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00869f] dark:text-[#00B8DB] self-start"
              >
                Learn more
                <span className="sr-only"> about {g.headline.toLowerCase()}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
