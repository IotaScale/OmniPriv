import Link from "next/link";
import { ArrowRight } from "lucide-react";

import BgMotif from "./BgMotif";


/*
 * Closing call to action. Same two actions as the hero, same labels, so the
 * page carries one intent per button.
 */
export default function ClosingCta() {
  return (
    <section className="relative">
      <div className="container-xl op-sec-tight">
        <div
          className="cta-card op-panel relative overflow-hidden rounded-[2rem] px-6 py-14 sm:px-12 sm:py-16 lg:py-20 text-center"
          data-aos="fade-up"
        >
          <div className="cta-glow pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="cta-grid pointer-events-none absolute inset-0" aria-hidden="true" />
          {/* Credential rotation on the left, verified identity on the right */}
          <BgMotif kind="key" className="left-8 2xl:left-14 top-1/2 -translate-y-1/2 w-[170px] h-[170px]" />
          <BgMotif kind="fingerprint" className="right-8 2xl:right-14 top-1/2 -translate-y-1/2 w-[170px] h-[170px]" />

          <div className="relative max-w-3xl mx-auto">
            <h2
              className="op-h2 op-h2-lg"
            >
              Take control of every privileged move
            </h2>
            <p className="op-lede mx-auto">
              Centralised access control, Just-in-Time privileges, credential protection and session visibility for
              your most sensitive systems. See it on your own infrastructure.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/demo" className="hp-btn-primary group w-full sm:w-auto">
                Request a Demo
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link href="/platform" className="hp-btn-secondary w-full sm:w-auto">
                Explore Platform
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
