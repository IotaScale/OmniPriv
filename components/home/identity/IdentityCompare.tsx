import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { IDENTITIES } from "./data";

/*
 * Option 3: a three-column comparison.
 * One column per identity type, aligned row by row so the eye can compare:
 * picture, the risk, how OmniPriv controls it, one figure, a link.
 * On phones the columns stack.
 */
export default function IdentityCompare() {
  return (
    <section className="relative">
      <div className="container-xl op-sec">
        <div className="max-w-2xl" data-aos="fade-up">
          <h2 className="op-h2">Every identity that can touch production</h2>
          <p className="op-lede">One policy model for three kinds of identity, each with the controls it needs.</p>
        </div>

        <div
          className="op-body grid md:grid-cols-3 gap-px rounded-3xl overflow-hidden border border-slate-900/[0.08] dark:border-white/[0.08] bg-slate-900/[0.08] dark:bg-white/[0.08]"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {IDENTITIES.map((it) => (
            <div key={it.key} className="flex flex-col bg-white dark:bg-[#111214]">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#0b0c0e]">
                <Image src={it.image} alt={it.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" style={{ objectPosition: it.focus }} />
              </div>

              <div className="flex flex-col flex-1 p-6 lg:p-7">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#00B8DB]/10 text-[#00667A] dark:text-[#00B8DB] shrink-0">
                    <it.icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="op-card-title">{it.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{it.short}</p>
                  </div>
                </div>

                <p className="mt-6 text-xs font-semibold text-slate-500 dark:text-slate-400">The risk</p>
                <p className="mt-1.5 text-[0.9375rem] leading-[1.6] text-slate-700 dark:text-slate-300 min-h-[3.2em]">{it.risk}</p>

                <p className="mt-5 text-xs font-semibold text-slate-500 dark:text-slate-400">How OmniPriv controls it</p>
                <ul className="mt-2 space-y-2">
                  {it.controls.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-[0.9375rem] text-slate-800 dark:text-slate-200">
                      <CheckCircle2 className="w-[1.125rem] h-[1.125rem] mt-[2px] shrink-0 text-[#00667A] dark:text-[#00B8DB]" aria-hidden="true" />
                      {c}
                    </li>
                  ))}
                </ul>

                <div className="h-6" />
                <div className="mt-auto pt-6 border-t border-slate-900/[0.06] dark:border-white/[0.06] flex flex-col items-start gap-4 xl:flex-row xl:items-end xl:justify-between">
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    <span className="block text-3xl font-bold text-[#0a1628] dark:text-white leading-none" style={{ fontFamily: "var(--font-syne)" }}>
                      {it.stat.value}
                    </span>
                    <span className="block mt-1.5">{it.stat.label}</span>
                  </span>
                  <Link href={it.href} className="group op-link inline-flex items-center gap-1.5 text-sm font-semibold shrink-0">
                    {it.cta}
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
