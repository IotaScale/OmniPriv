import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import RevealScope from "@/components/home/RevealScope";

/*
 * Compliance. The old section labelled each framework "Certified", which
 * claims a certification the site does not evidence. The product's own
 * Compliance Reports screen maps controls to these frameworks, so that is
 * what this section says.
 */

const FRAMEWORKS = [
  { name: "SOC 2", note: "Trust services criteria" },
  { name: "ISO 27001", note: "Annex A access controls" },
  { name: "NIST SP 800-53", note: "AC, AU and IA families" },
  { name: "HIPAA", note: "Access and audit safeguards" },
  { name: "PCI DSS", note: "Requirements 7, 8 and 10" },
  { name: "SOX 404", note: "IT general controls" },
];

const POINTS = [
  { title: "Audit-ready reports", body: "One-click exports in the formats SOC 2, ISO 27001, PCI DSS, HIPAA and SOX 404 auditors ask for." },
  { title: "Immutable session logs", body: "Cryptographically signed logs that cannot be altered or deleted, even by administrators." },
  { title: "Continuous compliance monitoring", body: "Live posture across every asset and account, not a scramble before the audit." },
];

export default function ComplianceFrameworks() {
  return (
    <section className="relative">
      <div className="container-xl py-24 lg:py-32">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-14 lg:gap-20">
          <div data-aos="fade-up">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] leading-[1.08] text-slate-950 dark:text-white"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Evidence for the most regulated environments
            </h2>
            <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Controls are mapped to the frameworks your auditors use, and the evidence is collected as work happens.
              Reports take minutes, not days.
            </p>
            <div className="mt-10 space-y-6">
              {POINTS.map((p) => (
                <div key={p.title} className="flex gap-4">
                  <span className="mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#00B8DB]/10 text-[#00B8DB] shrink-0">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="font-semibold text-slate-950 dark:text-white">{p.title}</div>
                    <div className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{p.body}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/platform/audit-compliance"
              className="group mt-10 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00869f] dark:text-[#00B8DB]"
            >
              Audit and compliance module
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <RevealScope className="grid grid-cols-2 sm:grid-cols-3 gap-px rounded-3xl overflow-hidden border border-slate-900/[0.08] dark:border-white/[0.08] bg-slate-900/[0.08] dark:bg-white/[0.08] self-start">
            {FRAMEWORKS.map((f, i) => (
              <div
                key={f.name}
                className="reveal-item cfw-tile relative bg-white dark:bg-[#0f2140] p-6 sm:p-7 min-h-[170px] flex flex-col justify-between"
                style={{ transitionDelay: `${i * 110}ms` }}
              >
                <span className="cfw-check inline-flex items-center justify-center w-8 h-8 rounded-full" style={{ ["--d" as string]: `${0.5 + i * 0.11}s` }}>
                  <Check className="w-4 h-4" aria-hidden="true" />
                </span>
                <div>
                  <div
                    className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-slate-950 dark:text-white"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {f.name}
                  </div>
                  <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{f.note}</div>
                </div>
              </div>
            ))}
          </RevealScope>
        </div>
      </div>
    </section>
  );
}
