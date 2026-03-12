"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Zap,
  BarChart3,
  AlertTriangle,
  Download,
} from "lucide-react";

const platformLinks = [
  {
    label: "Infrastructure & Deployment",
    description: "On-premise, HA, agentless",
    href: "/platform/infrastructure-deployment",
    icon: Lock,
  },
  {
    label: "Credential Management",
    description: "Rotation, vault, SSH keys",
    href: "/platform/password-credential-management",
    icon: Key,
  },
  {
    label: "Application Security",
    description: "MFA, encryption, HSM",
    href: "/platform/application-security",
    icon: Shield,
  },
  {
    label: "Enterprise Integration",
    description: "SIEM, LDAP/AD, ticketing",
    href: "/platform/enterprise-integration",
    icon: Building2,
  },
  {
    label: "Session Management",
    description: "Recording, isolation, controls",
    href: "/platform/session-management",
    icon: Eye,
  },
  {
    label: "Workflow & Access Control",
    description: "Approvals, JIT, policies",
    href: "/platform/workflow-access-control",
    icon: Globe,
  },
  {
    label: "Audit & Compliance",
    description: "Regulatory reporting & audit",
    href: "/platform/audit-compliance",
    icon: BarChart3,
  },
  {
    label: "Threat Detection",
    description: "AI-powered threat response",
    href: "/platform/threat-detection",
    icon: AlertTriangle,
  },
];

const resourceLinks = [
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Case Studies", href: "/case-studies", icon: Users },
];

const datasheetFiles: { url: string; downloadName: string }[] = [
  { url: "/OmniPriv_PAM_Datasheet.pdf", downloadName: "OmniPriv PAM Datasheet.pdf" },
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

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProduct, setMobileProduct] = useState(false);
  const [mobileResource, setMobileResource] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [resourceOpen, setResourceOpen] = useState(false);
  const platformRef = useRef<HTMLDivElement>(null);
  const resourceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (platformRef.current && !platformRef.current.contains(e.target as Node)) {
        setPlatformOpen(false);
      }
      if (resourceRef.current && !resourceRef.current.contains(e.target as Node)) {
        setResourceOpen(false);
      }
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
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-[#030711]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,184,255,0.06)]"
        : "bg-transparent"
        }`}
    >
      <div className="container-xl">
        <nav className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/omnipriv-logo-white.webp"
              alt="OmniPriv"
              width={160}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all duration-200"
            >
              Home
            </Link>
            {/* Platform Dropdown */}
            <div className="relative" ref={platformRef}>
              <button
                onClick={() => { setPlatformOpen((o) => !o); setResourceOpen(false); }}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all duration-200"
              >
                Platform
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${platformOpen ? "rotate-180" : ""}`} />
              </button>
              {platformOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[560px] p-2 bg-[#0A1628]/95 backdrop-blur-xl border border-white/[0.07] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-50">
                  <div className="grid grid-cols-2 gap-1">
                    {platformLinks.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setPlatformOpen(false)}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#00B8FF]/[0.08] transition-all duration-200 group/item"
                      >
                        <div className="w-9 h-9 rounded-lg bg-[#00B8FF]/10 border border-[#00B8FF]/15 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-[#00B8FF]/20 transition-colors">
                          <item.icon className="w-4 h-4 text-[#00B8FF]" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white mb-0.5">{item.label}</div>
                          <div className="text-xs text-slate-500">{item.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-white/[0.05] px-2 text-center">
                    <Link
                      href="/platform"
                      onClick={() => setPlatformOpen(false)}
                      className="flex items-center justify-center gap-2 text-xs text-[#00B8FF] font-medium hover:underline"
                    >
                      View all capabilities <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>



            {/* Resources Dropdown */}
            <div className="relative" ref={resourceRef}>
              <button
                onClick={() => { setResourceOpen((o) => !o); setPlatformOpen(false); }}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all duration-200"
              >
                Resources
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${resourceOpen ? "rotate-180" : ""}`} />
              </button>
              {resourceOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[240px] p-2 bg-[#0A1628]/95 backdrop-blur-xl border border-white/[0.07] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] z-50">
                  {resourceLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setResourceOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#00B8FF]/[0.08] transition-all duration-200"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#00B8FF]/10 border border-[#00B8FF]/15 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-3.5 h-3.5 text-[#00B8FF]" />
                      </div>
                      <span className="text-sm font-medium text-white">{item.label}</span>
                    </Link>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      downloadDatasheets();
                      setResourceOpen(false);
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#00B8FF]/[0.08] transition-all duration-200 w-full text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#00B8FF]/10 border border-[#00B8FF]/15 flex items-center justify-center flex-shrink-0">
                      <Download className="w-3.5 h-3.5 text-[#00B8FF]" />
                    </div>
                    <div className="text-left">
                      <span className="text-sm font-medium text-white block">Data Sheet</span>
                      <span className="text-[11px] text-slate-500">Download PDF</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all duration-200"
            >
              About
            </Link>
            
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/sign-in"
              className="px-4 py-2.5 text-sm font-semibold text-slate-300 hover:text-white border border-white/[0.12] hover:border-white/25 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] transition-all duration-200"
            >
              Partner Portal
            </Link>
            <Link
              href="/demo"
              className="btn-primary text-sm px-5 py-2.5 rounded-lg"
            >
              Request a Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[72px] bg-[#030711]/98 backdrop-blur-xl overflow-y-auto z-40">
          <div className="container-xl py-6 space-y-2">
            {/* Platform */}
            <Link href="/" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm font-semibold text-white rounded-xl hover:bg-white/[0.05] transition-all">
              Home
            </Link>
            <button
              onClick={() => setMobileProduct(!mobileProduct)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-white rounded-xl hover:bg-white/[0.05] transition-all"
            >
              Platform
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileProduct ? "rotate-180" : ""}`} />
            </button>
            {mobileProduct && (
              <div className="pl-4 space-y-1">
                {platformLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all"
                  >
                    <item.icon className="w-4 h-4 text-[#00B8FF]" />
                    {item.label}
                  </Link>
                ))}
              </div>
            )}



            {/* Resources */}
            <button
              onClick={() => setMobileResource(!mobileResource)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-white rounded-xl hover:bg-white/[0.05] transition-all"
            >
              Resources
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileResource ? "rotate-180" : ""}`} />
            </button>
            {mobileResource && (
              <div className="pl-4 space-y-1">
                {resourceLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all"
                  >
                    <item.icon className="w-4 h-4 text-[#00B8FF]" />
                    {item.label}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    downloadDatasheets();
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.04] transition-all w-full"
                >
                  <Download className="w-4 h-4 text-[#00B8FF]" />
                  <span>Data Sheet</span>
                  <span className="ml-auto text-[10px] text-slate-600">Download PDF</span>
                </button>
              </div>
            )}

            <Link href="/about" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm font-semibold text-white rounded-xl hover:bg-white/[0.05] transition-all">
              About
            </Link>
            

            <div className="pt-4 border-t border-white/[0.06] space-y-3">
              <Link
                href="/sign-in"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-4 py-3 text-sm font-semibold text-slate-300 border border-white/[0.12] rounded-xl hover:bg-white/[0.05] transition-all"
              >
                Partner Portal
              </Link>
              <Link
                href="/demo"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full justify-center"
              >
                Request a Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
