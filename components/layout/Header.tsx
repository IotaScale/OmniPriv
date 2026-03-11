"use client";

import { useState, useEffect } from "react";
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
  FileText,
  BookOpen,
  Users,
  Zap,
} from "lucide-react";

const platformLinks = [
  {
    label: "Authentication",
    description: "MFA, SSO, LDAP/AD, SAML, OIDC",
    href: "/features#authentication",
    icon: UserCheck,
  },
  {
    label: "Authorization",
    description: "RBAC, JIT access, ACL controls",
    href: "/features#authorization",
    icon: Lock,
  },
  {
    label: "Account Management",
    description: "Credential vault, rotation, discovery",
    href: "/features#account",
    icon: Key,
  },
  {
    label: "Audit & Sessions",
    description: "Session recording, real-time monitoring",
    href: "/features#audit",
    icon: Eye,
  },
  {
    label: "Security Center",
    description: "Zero-trust architecture, compliance",
    href: "/security",
    icon: Shield,
  },
  {
    label: "Integrations",
    description: "250+ enterprise integrations",
    href: "/integrations",
    icon: Zap,
  },
];

const solutionLinks = [
  {
    label: "Infrastructure & Deployment",
    description: "On-premise, HA, agentless",
    href: "/solutions/infrastructure-deployment",
    icon: Lock,
  },
  {
    label: "Credential Management",
    description: "Rotation, vault, SSH keys",
    href: "/solutions/password-credential-management",
    icon: Key,
  },
  {
    label: "Application Security",
    description: "MFA, encryption, HSM",
    href: "/solutions/application-security",
    icon: Shield,
  },
  {
    label: "Enterprise Integration",
    description: "SIEM, LDAP/AD, ticketing",
    href: "/solutions/enterprise-integration",
    icon: Building2,
  },
  {
    label: "Session Management",
    description: "Recording, isolation, controls",
    href: "/solutions/session-management",
    icon: Eye,
  },
  {
    label: "Workflow & Access Control",
    description: "Approvals, JIT, policies",
    href: "/solutions/workflow-access-control",
    icon: Globe,
  },
];

const resourceLinks = [
  { label: "Documentation", href: "/docs", icon: FileText },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Case Studies", href: "/case-studies", icon: Users },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProduct, setMobileProduct] = useState(false);
  const [mobileSolution, setMobileSolution] = useState(false);
  const [mobileResource, setMobileResource] = useState(false);

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
            {/* Platform Dropdown */}
            <div className="nav-item relative group">
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all duration-200">
                Platform
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="nav-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[560px] p-2 bg-[#0A1628]/95 backdrop-blur-xl border border-white/[0.07] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <div className="grid grid-cols-2 gap-1">
                  {platformLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
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
                <div className="mt-2 pt-2 border-t border-white/[0.05] px-2">
                  <Link
                    href="/features"
                    className="flex items-center gap-2 text-xs text-[#00B8FF] font-medium hover:underline"
                  >
                    View all features <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Solutions Dropdown */}
            <div className="nav-item relative group">
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all duration-200">
                Solutions
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="nav-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[560px] p-2 bg-[#0A1628]/95 backdrop-blur-xl border border-white/[0.07] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <div className="grid grid-cols-2 gap-1">
                  {solutionLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
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
                <div className="mt-2 pt-2 border-t border-white/[0.05] px-2">
                  <Link
                    href="/solutions"
                    className="flex items-center gap-2 text-xs text-[#00B8FF] font-medium hover:underline"
                  >
                    View all solutions <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/enterprise"
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all duration-200"
            >
              Enterprise
            </Link>

            {/* Resources Dropdown */}
            <div className="nav-item relative group">
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/[0.05] transition-all duration-200">
                Resources
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="nav-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[240px] p-2 bg-[#0A1628]/95 backdrop-blur-xl border border-white/[0.07] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                {resourceLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#00B8FF]/[0.08] transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#00B8FF]/10 border border-[#00B8FF]/15 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-3.5 h-3.5 text-[#00B8FF]" />
                    </div>
                    <span className="text-sm font-medium text-white">{item.label}</span>
                  </Link>
                ))}
              </div>
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

            {/* Solutions */}
            <button
              onClick={() => setMobileSolution(!mobileSolution)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-white rounded-xl hover:bg-white/[0.05] transition-all"
            >
              Solutions
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileSolution ? "rotate-180" : ""}`} />
            </button>
            {mobileSolution && (
              <div className="pl-4 space-y-1">
                {solutionLinks.map((item) => (
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

            <Link href="/enterprise" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm font-semibold text-white rounded-xl hover:bg-white/[0.05] transition-all">
              Enterprise
            </Link>

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
              </div>
            )}

            <Link href="/about" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm font-semibold text-white rounded-xl hover:bg-white/[0.05] transition-all">
              About
            </Link>

            <div className="pt-4 border-t border-white/[0.06]">
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
