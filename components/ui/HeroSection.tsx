"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroDashboard from "./HeroDashboard";

interface Protocol { name: string; color: string; }

export default function HeroSection({ protocols }: { protocols: Protocol[] }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#07070E]">
      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=50"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay to keep text readable */}
        <div className="absolute inset-0 bg-[#07070E]/80" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-[#07070E]" style={{ maskImage: "linear-gradient(to bottom, transparent, #07070E)", WebkitMaskImage: "linear-gradient(to bottom, transparent, #07070E)" }} />
      </div>

      {/* ── Dot grid overlay ── */}
      <div className="absolute inset-0 z-0 bg-grid opacity-40" />

      {/* ── Vertical accent line ── */}
      <div className="absolute inset-0 z-0 opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(90deg, #6366F1 0px, #6366F1 1px, transparent 1px, transparent 80px)" }} />

      {/* ── Content ── */}
      <div className="container-xl relative z-10 py-20 sm:py-28">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Left: text */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#6366F1]/30 bg-[#6366F1]/[0.08] mb-8"
            >
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-[#6366F1]"
              />
              <span className="text-[#A78BFA] text-xs font-semibold uppercase tracking-wider">
                Enterprise PAM Platform
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Zero-Trust{" "}
              <span className="text-[#6366F1]">Privileged Access</span>{" "}
              Management for the{" "}
              <span className="relative inline-block">
                Enterprise
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#6366F1] rounded-full" />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-400 leading-relaxed mb-8 max-w-xl"
            >
              Omnipriv secures your most critical systems with automated credential management, full session auditing, and real-time threat detection — in one platform.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link href="/demo" className="btn-primary text-base px-8 py-3.5">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/platform" className="btn-secondary text-base px-8 py-3.5">
                Explore Features
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]"
            >
              {[
                { value: "5,000+", label: "Assets Protected" },
                { value: "99.99%", label: "Uptime SLA" },
                { value: "48 hrs", label: "Deployment Time" },
                { value: "SOC 2",  label: "Certified" },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#07070E]/80 py-5 px-3 text-center">
                  <div className="stat-number text-xl mb-0.5">{stat.value}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Protocol tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="hidden sm:flex flex-wrap gap-2 mt-6"
            >
              {protocols.map((p) => (
                <span key={p.name} className={`tag text-xs font-semibold ${p.color}`}>
                  {p.name}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: interactive security dashboard */}
          <div className="hidden lg:block">
            <HeroDashboard />
          </div>
        </div>
      </div>

      {/* Bottom border rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#6366F1]/20 z-10" />
    </section>
  );
}
