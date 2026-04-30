"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const productLinks = [
  { label: "Infrastructure Deployment", href: "/platform/infrastructure-deployment" },
  { label: "Credential Management", href: "/platform/password-credential-management" },
  { label: "Application Security", href: "/platform/application-security" },
  { label: "Session Management", href: "/platform/session-management" },
  { label: "Enterprise Integration", href: "/platform/enterprise-integration" },
  { label: "Compliance & Audit", href: "/platform/audit-compliance" },
  { label: "Threat Detection", href: "/platform/threat-detection" },
];

const resourceLinks = [
  { label: "Blog & Insights", href: "/blog" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Security Center", href: "/security" },
];

const companyLinks = [
  { label: "About OmniPriv", href: "/about" },
  { label: "Contact Sales", href: "/demo" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("success");
    setEmail("");
  }

  return (
    <footer className="relative bg-[#07070E] border-t border-white/[0.06] overflow-hidden">
      {/* Accent top rule */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#6366F1]/40" />

      {/* Newsletter bar */}
      <div className="border-b border-white/[0.06] bg-[#0E0E1C]/50">
        <div className="container-xl py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-white text-lg mb-1" style={{ fontFamily: "var(--font-syne)" }}>
                Stay ahead of privilege-based threats
              </h3>
              <p className="text-slate-400 text-sm">
                Get PAM insights, security advisories, and best practices from our team.
              </p>
            </div>
            {status === "success" ? (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[#A78BFA] font-medium text-sm flex items-center gap-2"
              >
                <span className="text-lg">✓</span> You&apos;re subscribed! Welcome aboard.
              </motion.p>
            ) : (
              <form className="flex gap-3 w-full md:w-auto" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Work email address"
                  className="input-dark w-full md:w-72"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container-xl py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex mb-5">
              <Image src="/omnipriv-logo-white.webp" alt="OmniPriv" width={160} height={40} className="h-9 w-auto object-contain" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Enterprise Privileged Access Management. Secure, audit, and control every privileged session across your hybrid infrastructure.
            </p>

            {/* Contact info */}
            <div className="space-y-4">
              <a
                href="mailto:info@omnipriv.com"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-[#A78BFA] transition-colors group/contact"
              >
                <Mail className="w-3.5 h-3.5 text-[#6366F1]/60 group-hover/contact:text-[#A78BFA] transition-colors flex-shrink-0" />
                info@omnipriv.com
              </a>
              <div className="flex items-start gap-2.5 text-sm text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-[#6366F1]/60 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white/70 font-medium text-xs mb-0.5">Omnipriv Global</div>
                  <div>10 Mead Road, Abbeymead</div>
                  <div>Gloucester, GL4 5GL</div>
                  <div>United Kingdom</div>
                </div>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-[#6366F1]/60 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-white/70 font-medium text-xs mb-0.5">Omnipriv Middle East</div>
                  <div>Compass Building</div>
                  <div>AL Hamra Industrial Zone-FZ</div>
                  <div>Ras Al Khaimah, UAE</div>
                </div>
              </div>
            </div>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Capabilities</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group/link">
                    <span className="w-1 h-1 rounded-full bg-[#6366F1]/40 group-hover/link:bg-[#6366F1] transition-colors flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group/link">
                    <span className="w-1 h-1 rounded-full bg-[#6366F1]/40 group-hover/link:bg-[#6366F1] transition-colors flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1.5 group/link">
                    <span className="w-1 h-1 rounded-full bg-[#6366F1]/40 group-hover/link:bg-[#6366F1] transition-colors flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-10 p-6 rounded-2xl border border-[#6366F1]/20 bg-[#0E0E1C] flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold text-lg mb-1" style={{ fontFamily: "var(--font-syne)" }}>
              Ready to secure your privileged access?
            </p>
            <p className="text-slate-400 text-sm">Talk to our PAM experts and get a personalized demo.</p>
          </div>
          <Link href="/demo" className="btn-primary whitespace-nowrap flex-shrink-0">
            Contact Sales <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.05]">
        <div className="container-xl py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} OmniPriv Inc.</p>
            <div className="flex items-center gap-5">
              <Link href="/privacy-policy" className="text-xs text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-xs text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/security" className="text-xs text-slate-500 hover:text-white transition-colors">Security</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
