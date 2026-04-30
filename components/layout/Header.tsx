"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Shield,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  Lock,
  Eye,
  Key,
  UserCheck,
  Building2,
  Globe,
  BookOpen,
  Users,
  BarChart3,
  AlertTriangle,
  Download,
} from "lucide-react";

const platformLinks = [
  { label: "Infrastructure & Deployment", description: "On-premise, HA, agentless", href: "/platform/infrastructure-deployment", icon: Lock },
  { label: "Credential Management", description: "Rotation, vault, SSH keys", href: "/platform/password-credential-management", icon: Key },
  { label: "Application Security", description: "MFA, encryption, HSM", href: "/platform/application-security", icon: Shield },
  { label: "Enterprise Integration", description: "SIEM, LDAP/AD, ticketing", href: "/platform/enterprise-integration", icon: Building2 },
  { label: "Session Management", description: "Recording, isolation, controls", href: "/platform/session-management", icon: Eye },
  { label: "Workflow & Access Control", description: "Approvals, JIT, policies", href: "/platform/workflow-access-control", icon: Globe },
  { label: "Audit & Compliance", description: "Regulatory reporting & audit", href: "/platform/audit-compliance", icon: BarChart3 },
  { label: "Threat Detection", description: "AI-powered threat response", href: "/platform/threat-detection", icon: AlertTriangle },
];

const resourceLinks = [
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Case Studies", href: "/case-studies", icon: Users },
];

const datasheetFiles: { url: string; downloadName: string }[] = [
  { url: "/OmniPriv_PAM_datasheet.pdf", downloadName: "OmniPriv PAM Datasheet.pdf" },
  { url: "/OmniPriv_PAM_Product_Specification.pdf", downloadName: "OmniPriv PAM Product Specification.pdf" },
];

function downloadDatasheets() {
  datasheetFiles.forEach((file, i) => {
    setTimeout(() => {
      const a = document.createElement("a");
      a.href = file.url;
      a.download = file.downloadName;
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, i * 200);
  });
}

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: "easeOut" } },
  exit:    { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.12 } },
};

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, x: "100%" },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit:    { opacity: 0, x: "100%", transition: { duration: 0.22 } },
};

export default function Header() {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [mobileProduct, setMobileProduct] = useState(false);
  const [mobileResource, setMobileResource] = useState(false);
  const [platformOpen, setPlatformOpen]   = useState(false);
  const [resourceOpen, setResourceOpen]   = useState(false);
  const platformRef = useRef<HTMLDivElement>(null);
  const resourceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (platformRef.current && !platformRef.current.contains(e.target as Node)) setPlatformOpen(false);
      if (resourceRef.current && !resourceRef.current.contains(e.target as Node)) setResourceOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#07070E]/95 backdrop-blur-xl border-b border-white/[0.07] shadow-[0_2px_24px_rgba(0,0,0,0.6)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-xl">
        <nav className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image src="/omnipriv-logo-white.webp" alt="OmniPriv" width={160} height={40} className="h-9 w-auto object-contain" priority />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            <Link href="/" className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all duration-200">
              Home
            </Link>

            {/* Platform Dropdown */}
            <div className="relative" ref={platformRef}>
              <button
                onClick={() => { setPlatformOpen((o) => !o); setResourceOpen(false); }}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all duration-200"
              >
                Platform
                <motion.span animate={{ rotate: platformOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-3.5 h-3.5" />
                </motion.span>
              </button>
              <AnimatePresence>
                {platformOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[560px] p-2 bg-[#0E0E1C] border border-white/[0.08] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] z-50"
                  >
                    <div className="grid grid-cols-2 gap-1">
                      {platformLinks.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setPlatformOpen(false)}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#6366F1]/[0.08] transition-all duration-200 group/item"
                        >
                          <div className="w-9 h-9 rounded-lg bg-[#13132A] border border-[#6366F1]/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#6366F1]/20 group-hover/item:border-[#6366F1]/40 transition-all">
                            <item.icon className="w-4 h-4 text-[#A78BFA]" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white mb-0.5">{item.label}</div>
                            <div className="text-xs text-slate-500">{item.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-white/[0.05] px-2 text-center">
                      <Link href="/platform" onClick={() => setPlatformOpen(false)} className="inline-flex items-center gap-2 text-xs text-[#A78BFA] font-medium hover:underline">
                        View all capabilities <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resources Dropdown */}
            <div className="relative" ref={resourceRef}>
              <button
                onClick={() => { setResourceOpen((o) => !o); setPlatformOpen(false); }}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all duration-200"
              >
                Resources
                <motion.span animate={{ rotate: resourceOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-3.5 h-3.5" />
                </motion.span>
              </button>
              <AnimatePresence>
                {resourceOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[240px] p-2 bg-[#0E0E1C] border border-white/[0.08] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] z-50"
                  >
                    {resourceLinks.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setResourceOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#6366F1]/[0.08] transition-all duration-200"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#13132A] border border-[#6366F1]/20 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-3.5 h-3.5 text-[#A78BFA]" />
                        </div>
                        <span className="text-sm font-medium text-white">{item.label}</span>
                      </Link>
                    ))}
                    <button
                      type="button"
                      onClick={() => { downloadDatasheets(); setResourceOpen(false); }}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#6366F1]/[0.08] transition-all duration-200 w-full text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#13132A] border border-[#6366F1]/20 flex items-center justify-center flex-shrink-0">
                        <Download className="w-3.5 h-3.5 text-[#A78BFA]" />
                      </div>
                      <div className="text-left">
                        <span className="text-sm font-medium text-white block">Data Sheet</span>
                        <span className="text-[11px] text-slate-500">Download PDF</span>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/about" className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all duration-200">
              About
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/sign-in"
              className="px-4 py-2.5 text-sm font-semibold text-slate-300 hover:text-white border border-white/[0.1] hover:border-[#6366F1]/40 rounded-lg bg-white/[0.03] hover:bg-[#6366F1]/[0.08] transition-all duration-200"
            >
              Partner Portal
            </Link>
            <Link href="/demo" className="btn-primary text-sm px-5 py-2.5 rounded-lg">
              Request a Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen
                ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X className="w-5 h-5" /></motion.span>
                : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }}  animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu className="w-5 h-5" /></motion.span>
              }
            </AnimatePresence>
          </motion.button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden fixed inset-0 top-[72px] bg-[#07070E]/98 backdrop-blur-xl overflow-y-auto z-40"
          >
            <div className="container-xl py-6 space-y-1">
              <Link href="/" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm font-semibold text-white rounded-xl hover:bg-white/[0.05] transition-all">
                Home
              </Link>
              <button
                onClick={() => setMobileProduct(!mobileProduct)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-white rounded-xl hover:bg-white/[0.05] transition-all"
              >
                Platform
                <motion.span animate={{ rotate: mobileProduct ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-4 h-4" />
                </motion.span>
              </button>
              <AnimatePresence>
                {mobileProduct && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden pl-4 space-y-1"
                  >
                    {platformLinks.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all"
                      >
                        <item.icon className="w-4 h-4 text-[#A78BFA]" />
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={() => setMobileResource(!mobileResource)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-white rounded-xl hover:bg-white/[0.05] transition-all"
              >
                Resources
                <motion.span animate={{ rotate: mobileResource ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-4 h-4" />
                </motion.span>
              </button>
              <AnimatePresence>
                {mobileResource && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden pl-4 space-y-1"
                  >
                    {resourceLinks.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all"
                      >
                        <item.icon className="w-4 h-4 text-[#A78BFA]" />
                        {item.label}
                      </Link>
                    ))}
                    <button
                      type="button"
                      onClick={() => { downloadDatasheets(); setMobileOpen(false); }}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all w-full"
                    >
                      <Download className="w-4 h-4 text-[#A78BFA]" />
                      <span>Data Sheet</span>
                      <span className="ml-auto text-[10px] text-slate-600">PDF</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <Link href="/about" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm font-semibold text-white rounded-xl hover:bg-white/[0.05] transition-all">
                About
              </Link>

              <div className="pt-4 border-t border-white/[0.06] space-y-3">
                <Link href="/sign-in" onClick={() => setMobileOpen(false)} className="block w-full text-center px-4 py-3 text-sm font-semibold text-slate-300 border border-white/[0.1] rounded-xl hover:bg-white/[0.05] transition-all">
                  Partner Portal
                </Link>
                <Link href="/demo" onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center">
                  Request a Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
