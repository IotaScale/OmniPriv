"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { IDENTITIES } from "./data";

/*
 * Option 2: the expanding panels, fixed.
 * Picture on top, copy on a solid strip below it, so nothing is printed over
 * the art. The open panel widens to show its controls and figure; the closed
 * ones keep a readable picture crop, icon and title. Below lg every panel is
 * open and they stack.
 */
export default function IdentityPanelsFixed() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative">
      <div className="container-xl op-sec">
        <div className="max-w-2xl" data-aos="fade-up">
          <h2 className="op-h2">Every identity that can touch production</h2>
          <p className="op-lede">
            People, machines and AI agents each get the right controls from one policy model, and every action they
            take is on the record.
          </p>
        </div>

        <div className="op-body flex flex-col lg:flex-row gap-4 lg:h-[33.75rem]" data-aos="fade-up" data-aos-delay="100">
          {IDENTITIES.map((it, i) => {
            const on = i === active;
            return (
              <div
                key={it.key}
                onMouseEnter={() => setActive(i)}
                onFocusCapture={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`idp-panel group flex flex-col overflow-hidden rounded-3xl border bg-white dark:bg-[#15171a] ${
                  on ? "is-on border-[#00B8DB]/40" : "border-slate-900/[0.08] dark:border-white/[0.08]"
                }`}
              >
                <div className="relative h-[13.75rem] lg:h-[16.25rem] shrink-0 overflow-hidden bg-[#0b0c0e]">
                  <Image
                    src={it.image}
                    alt={it.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="idp-img object-cover"
                    style={{ objectPosition: it.focus }}
                  />
                </div>

                <div className="flex flex-col flex-1 p-6 lg:p-7 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#00B8DB]/10 text-[#00667A] dark:text-[#00B8DB] shrink-0">
                      <it.icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <h3 className="op-card-title text-[1.125rem]">{it.title}</h3>
                  </div>

                  {/* What a closed panel shows instead of its copy */}
                  <p className="idp-short mt-3 text-sm text-slate-500 dark:text-slate-400">{it.short}</p>

                  <div className="idp-copy mt-4">
                    <p className="text-[0.9375rem] leading-[1.6] text-slate-600 dark:text-slate-400">{it.risk}</p>
                    <ul className="mt-3 space-y-2">
                      {it.controls.map((c) => (
                        <li key={c} className="flex items-start gap-2.5 text-[0.9375rem] text-slate-800 dark:text-slate-200">
                          <CheckCircle2 className="w-[1.125rem] h-[1.125rem] mt-[2px] shrink-0 text-[#00667A] dark:text-[#00B8DB]" aria-hidden="true" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="idp-copy mt-auto pt-5 flex flex-wrap items-end justify-between gap-3">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      <span className="text-2xl font-bold text-[#0a1628] dark:text-white mr-1.5" style={{ fontFamily: "var(--font-syne)" }}>
                        {it.stat.value}
                      </span>
                      {it.stat.label}
                    </span>
                    <Link href={it.href} className="op-link inline-flex items-center gap-1.5 text-sm font-semibold">
                      {it.cta}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
