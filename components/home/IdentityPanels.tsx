"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Cpu, Server, Users } from "lucide-react";

import BgMotif from "./BgMotif";

/*
 * Privileged access for every identity, as three panels that share one row.
 * The active panel widens and reveals its copy; hover, focus or tap moves it.
 * Below lg the panels simply stack, each fully open.
 */

const IDENTITIES = [
  {
    key: "ai",
    title: "AI and automated identities",
    body: "Govern privileged actions taken by AI tools, automation and intelligent workflows with policy-based access and scoped permissions.",
    cta: "Explore AI-ready PAM",
    href: "/solutions/ai-agent-security",
    icon: Cpu,
    image: "/identities/ai-automated-identities.jpeg",
    alt: "A glowing neural network above a lit platform, ringed by security padlocks",
  },
  {
    key: "human",
    title: "Human identities",
    body: "Administrators, employees, contractors and vendors get MFA, role-based access, approvals, Just-in-Time privileges and monitored sessions.",
    cta: "Secure human access",
    href: "/solutions/human-identity-security",
    icon: Users,
    image: "/identities/human-identities.jpeg",
    alt: "Colleagues around a table with holographic identity verification panels and a security shield",
  },
  {
    key: "machine",
    title: "Machine identities",
    body: "Control credentials used by applications, service accounts, databases and cloud workloads, and remove standing access they do not need.",
    cta: "Secure machine access",
    href: "/solutions/machine-identity-security",
    icon: Server,
    image: "/identities/machine-identities.jpeg",
    alt: "A robot presenting a holographic key, surrounded by padlocked cloud, server and database platforms",
  },
];

export default function IdentityPanels() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden">
      {/* A large vault dial peeking in from the top-right corner, beside the heading. */}
      <BgMotif kind="vault" className="w-[460px] h-[460px] -top-[150px] -right-[90px]" />

      <div className="container-xl op-sec relative z-10">
        <div className="max-w-2xl" data-aos="fade-up">
          <h2
            className="op-h2"
          >
            Every identity that can touch production
          </h2>
          <p className="op-lede">
            Real-time privileged access control for AI agents, people and machines, from one policy model.
          </p>
        </div>

        <div className="op-body flex flex-col lg:flex-row gap-4 lg:h-[480px]" data-aos="fade-up" data-aos-delay="100">
          {IDENTITIES.map((id, i) => {
            const on = i === active;
            return (
              <div
                key={id.key}
                onMouseEnter={() => setActive(i)}
                onFocusCapture={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`ip-panel group relative overflow-hidden rounded-3xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-[#0a1628] min-h-[440px] lg:min-h-0 ${
                  on ? "is-on" : ""
                }`}
              >
                <Image
                  src={id.image}
                  alt={id.alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="ip-img object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/60 to-[#0a1628]/0" aria-hidden="true" />

                <div className="relative h-full flex flex-col justify-end p-7 lg:p-8">
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 border border-white/15 text-white backdrop-blur-sm">
                    <id.icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <h3
                    className="mt-5 text-2xl font-bold tracking-[-0.02em] text-white max-w-sm"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {id.title}
                  </h3>
                  <div className="ip-copy">
                    <p className="mt-3 text-[15px] text-slate-300 leading-relaxed max-w-md">{id.body}</p>
                    <Link
                      href={id.href}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00B8DB]"
                    >
                      {id.cta}
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
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
