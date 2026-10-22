"use client";

import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Mail, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";

import { EVENT } from "@/components/events/event";
import {
  EMAILJS_NEWSLETTER_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
  EMAILJS_RECIPIENT,
  EMAILJS_SERVICE_ID,
} from "@/lib/emailjs";

const productLinks = [
  { label: "Secure AI Agents", href: "/platform/secure-ai-agents" },
  { label: "Infrastructure Deployment", href: "/platform/infrastructure-deployment" },
  { label: "Credential Management", href: "/platform/password-credential-management" },
  { label: "Application Security", href: "/platform/application-security" },
  { label: "Secure Remote Access", href: "/platform/secure-remote-access" },
  { label: "Workflow & Access Control", href: "/platform/workflow-access-control" },
  { label: "Enterprise Integration", href: "/platform/enterprise-integration" },
  { label: "Compliance & Audit", href: "/privileged-access-audit-compliance" },
  { label: "AI Threat Protection", href: "/platform/ai-threat-protection" },
];

const resourceLinks = [
  { label: "Blog & Insights", href: "/blog" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Documentation", href: "/docs" },
  { label: "Features", href: "/features" },
  { label: "Integrations", href: "/integrations" },
  { label: "Security Center", href: "/security" },
];

const companyLinks = [
  { label: "About OmniPriv", href: "/about" },
  { label: "Enterprise Plans", href: "/enterprise" },
  { label: "Partner Program", href: "/partners" },
  { label: "Contact Sales", href: "/demo" },
  { label: "Black Hat MEA 2026", href: "/events/black-hat-mea-2026" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  /* Same EmailJS route as the blog newsletter (components/blog/BlogNewsletter.tsx).
   * Until EMAILJS_NEWSLETTER_TEMPLATE_ID in lib/emailjs.ts holds a real template
   * id, the send fails and the error message shows: it no longer claims success
   * without sending anything. */
  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_NEWSLETTER_TEMPLATE_ID,
        { to_email: EMAILJS_RECIPIENT, subscriber_email: email },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="relative bg-white dark:bg-[#0b0c0e] border-t border-slate-900/[0.08] dark:border-white/[0.06] overflow-hidden">
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[37.5rem] h-px bg-gradient-to-r from-transparent via-[#00B8DB]/40 to-transparent" />

      {/* Newsletter bar: follows the theme, so the page ground runs on unbroken */}
      <div>
        <div className="border-b border-slate-900/[0.08] dark:border-white/[0.06] bg-slate-100/50 dark:bg-[#0B0C0E]">
          <div className="container-xl py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-slate-950 dark:text-white text-lg mb-1" style={{ fontFamily: "var(--font-syne)" }}>
                Stay ahead of privilege-based threats
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Get PAM insights, security advisories, and best practices from our team.
              </p>
            </div>
            {status === "success" ? (
              <p
                role="status"
                aria-live="polite"
                className="text-[#00B8DB] font-medium text-sm flex items-center gap-2"
              >
                <span className="text-lg">✓</span> You&apos;re subscribed! Welcome aboard.
              </p>
            ) : (
              <div className="w-full md:w-auto">
              <form className="flex gap-3 w-full md:w-auto" onSubmit={handleSubscribe}>
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Work email address
                </label>
                <input
                  type="email"
                  id="footer-newsletter-email"
                  placeholder="Work email address"
                  className="input-dark w-full md:w-72"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" disabled={status === "loading"} className="btn-primary whitespace-nowrap disabled:opacity-60">
                  {status === "loading" ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
              <p role="status" aria-live="polite" className="mt-2 min-h-[1.25rem] text-[0.8125rem] text-rose-600 dark:text-rose-400">
                {status === "error" ? "Something went wrong. Please try again, or email info@omnipriv.com." : ""}
              </p>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container-xl py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex mb-5">
              <Image
                src="/omnipriv-light.png"
                alt="OmniPriv"
                width={160}
                height={40}
                className="h-9 w-auto object-contain dark:hidden"
              />
              <Image
                src="/omniprivdark.png"
                alt="OmniPriv"
                width={160}
                height={40}
                className="h-9 w-auto object-contain hidden dark:block"
              />
            </Link>

            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Enterprise Privileged Access Management. Secure, audit, and control every privileged session across your hybrid infrastructure.
            </p>

            {/* Contact info */}
            <div className="space-y-4">
              <a
                href="mailto:info@omnipriv.com"
                className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-400 hover:text-[#00B8DB] transition-colors group/contact"
              >
                <Mail className="w-3.5 h-3.5 text-[#00B8DB]/60 group-hover/contact:text-[#00B8DB] transition-colors flex-shrink-0" />
                info@omnipriv.com
              </a>
              <div className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-[#00B8DB]/60 transition-colors flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-slate-900/70 dark:text-white/70 font-medium text-xs mb-0.5">Omnipriv US Office</div>
                  <div>4301 Independence St.</div>
                  <div>Rockville MD 20853, USA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-slate-950 dark:text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Capabilities
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#00B8DB] transition-colors duration-200 flex items-center gap-1.5 group/link"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#00B8DB]/30 group-hover/link:bg-[#00B8DB] transition-colors flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>



          {/* Resources */}
          <div>
            <h4 className="text-slate-950 dark:text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#00B8DB] transition-colors duration-200 flex items-center gap-1.5 group/link"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#00B8DB]/30 group-hover/link:bg-[#00B8DB] transition-colors flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-slate-950 dark:text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#00B8DB] transition-colors duration-200 flex items-center gap-1.5 group/link"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#00B8DB]/30 group-hover/link:bg-[#00B8DB] transition-colors flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>


        {/* CTA Banner */}
        <div className="mt-10 p-6 rounded-2xl border border-[#00B8DB]/15 bg-gradient-to-r from-[#00B8DB]/[0.06] to-[#00667A]/[0.04] flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-slate-950 dark:text-white font-semibold text-lg mb-1" style={{ fontFamily: "var(--font-syne)" }}>
              Ready to secure your privileged access?
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Talk to our PAM experts and get a personalized demo.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
            <Link
              href={EVENT.href}
              className="btn-secondary whitespace-nowrap flex-shrink-0 justify-center"
            >
              <CalendarDays className="w-4 h-4" aria-hidden="true" />
              Meet us at Black Hat MEA
            </Link>
            <Link
              href="/demo"
              className="btn-primary whitespace-nowrap flex-shrink-0 justify-center"
            >
              Request a Demo <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-900/[0.06] dark:border-white/[0.05] bg-slate-100/60 dark:bg-[#020609]/60">
        <div className="container-xl py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} OmniPriv Inc. 
            </p>
            <div className="flex items-center gap-5">
              <Link href="/privacy-policy" className="text-xs text-slate-500 hover:text-[#00B8DB] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-slate-500 hover:text-[#00B8DB] transition-colors">
                Terms of Service
              </Link>
              <Link href="/security" className="text-xs text-slate-500 hover:text-[#00B8DB] transition-colors">
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
