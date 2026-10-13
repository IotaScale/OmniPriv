import SectionNav from "@/components/aipam/SectionNav";
import Spotlight from "@/components/aipam/Spotlight";
import Link from "next/link";
import { ArrowRight, Building2, Globe, ShieldCheck } from "lucide-react";

import { FactsStrip, PageHero } from "@/components/pageui/blocks";
import { PartnerDirectory, PartnerHero } from "@/components/partners/PartnerDirectory";

/*
 * /partners, the public partner directory.
 *
 * Built from the shared page kit (components/pageui) so it matches the other
 * redesigned pages. Copy is unchanged. The directory is a client component
 * that reads /api/public/locator exactly as before; the partner portal and
 * channel-admin areas are not touched.
 */

const NAV = [
  { id: "partners-directory", label: "Directory" },
  { id: "partners-join", label: "Become a partner" },
];

/* From this page's copy and the directory's own filters. */
const FACTS = [
  { value: 3, label: "partner types: security specialists, authorized resellers, MSSPs" },
  { value: 4, label: "regions to filter: UK, North America, Western Europe, Nordics" },
  { value: "Approved", label: "every listing is approved by OmniPriv before it appears" },
  { value: "Direct", label: "OmniPriv direct sales covers regions without a listed partner" },
];

export default function PublicPartnersPage() {
  return (
    <div className="aip">
      <SectionNav items={NAV} startId="partners-hero" />
      <Spotlight />

      <PageHero
        id="partners-hero"
        titleLead="OmniPriv Authorized"
        titleAccent="Partner Directory"
        tagline="Global Channel Ecosystem"
        paragraphs={[["Connect with certified privileged access security specialists, authorized resellers, and MSSPs equipped to design, deploy, and manage OmniPriv in your enterprise."]]}
        primary={{ href: "/partners/apply", label: "Apply for Partnership" }}
        secondary={{ href: "/sign-in", label: "Partner Workspace Sign In" }}
        visual={<PartnerHero />}
      >
        <FactsStrip facts={FACTS} />
      </PageHero>

      {/* Directory: an interactive world map (dark band) */}
      <div className="dark">
        <section id="partners-directory" className="relative overflow-hidden op-band-navy">
          <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="container-xl op-sec relative">
            <PartnerDirectory />
          </div>
        </section>
      </div>

      {/* Join: a light band so it reads as its own section after the dark map */}
      <section id="partners-join" className="op-band-muted bg-slate-50">
        <div className="container-xl op-sec">
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a] px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div className="aip-hero-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#00B8DB]/[0.12] blur-3xl" aria-hidden="true" />
            <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-center">
              <div data-aos="fade-up">
                <div className="flex flex-wrap gap-2" aria-hidden="true">
                  {[
                    { t: "Resellers", i: Building2 },
                    { t: "MSPs", i: Globe },
                    { t: "Security specialists", i: ShieldCheck },
                  ].map((c) => (
                    <span key={c.t} className="inline-flex items-center gap-1.5 rounded-full border border-[#00B8DB]/30 bg-[#00B8DB]/[0.07] px-3 py-1 text-[0.8125rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]">
                      <c.i className="w-3.5 h-3.5" /> {c.t}
                    </span>
                  ))}
                </div>
                <h2 className="op-h2 op-h2-lg mt-6">Become an OmniPriv Channel Partner</h2>
                <p className="mt-4 max-w-[40rem] text-[1.0625rem] leading-[1.7] text-slate-600 dark:text-slate-400">
                  Expand your cybersecurity portfolio with high-margin enterprise PAM, AI governance, and cloud bastion solutions designed for resellers and MSPs.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:ml-auto lg:w-full lg:max-w-[18rem]" data-aos="fade-up" data-aos-delay="100">
                <Link href="/partners/apply" className="hp-btn-primary group">
                  Apply for Partnership
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <Link href="/sign-in" className="hp-btn-secondary">
                  Partner Workspace Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
