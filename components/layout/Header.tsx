"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { solutions } from "@/app/solutions/data";
import {
  Shield,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  Lock,
  Eye,
  Key,
  Building2,
  Globe,
  BookOpen,
  Users,
  Zap,
  BarChart3,
  AlertTriangle,
  Download,
  FileText,
  ShieldCheck,
  BrainCircuit,
} from "lucide-react";

/*
 * Site header: a floating glass bar.
 *
 * - Desktop: one shared dropdown panel under the bar. Its content crossfades
 *   between Platform / Solutions / Resources, and a single highlight pill
 *   slides behind whichever top-level item is hovered. Opens on hover for
 *   fine pointers (with a short close delay) and on click / keyboard for
 *   everything else. Escape closes and returns focus.
 * - Scroll: the bar gains a stronger surface once the page moves and stays
 *   fixed from there — it never hides.
 * - Mobile: full-screen sheet with staggered links.
 *
 * The wrapper carries no transform: any transform makes it the containing
 * block for the fixed mobile sheet, which would collapse it.
 *
 * "Contact" was dropped from the top level: it pointed at /demo, the same
 * place as the primary CTA, so the bar carried two buttons with one intent.
 */

const platformLinks = [
  { label: "Credential Management", description: "Vault, rotation, SSH keys", href: "/platform/password-credential-management", icon: Key },
  { label: "Secure Remote Access", description: "VPN-free privileged sessions", href: "/platform/secure-remote-access", icon: Eye },
  { label: "Workflow & Access Control", description: "Approvals, JIT, policies", href: "/platform/workflow-access-control", icon: Globe },
  { label: "Application Security", description: "MFA, encryption, session control", href: "/platform/application-security", icon: Shield },
  { label: "AI Threat Protection", description: "ML detection and auto-block", href: "/platform/ai-threat-protection", icon: AlertTriangle },
  { label: "Audit & Compliance", description: "Recordings, reports, evidence", href: "/platform/audit-compliance", icon: BarChart3 },
  { label: "Enterprise Integration", description: "SIEM, LDAP/AD, ticketing", href: "/platform/enterprise-integration", icon: Building2 },
  { label: "Infrastructure & Deployment", description: "On-premise, HA, clustered", href: "/platform/infrastructure-deployment", icon: Lock },
];

const resourceLinks = [
  { label: "Blog", description: "PAM research and best practice", href: "/blog", icon: BookOpen },
  { label: "Case Studies", description: "How teams deploy OmniPriv", href: "/case-studies", icon: Users },
  { label: "Documentation", description: "Guides and references", href: "/docs", icon: FileText },
  { label: "Security Center", description: "How we secure OmniPriv", href: "/security", icon: ShieldCheck },
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

/** React 18 has no `inert` prop type; set the attribute directly. */
const inertIf = (on: boolean): Record<string, string> => (on ? { inert: "" } : {});

type MenuKey = "platform" | "solutions" | "resources";

const TOP: ({ key: MenuKey; label: string } | { href: string; label: string })[] = [
  { key: "platform", label: "Platform" },
  { key: "solutions", label: "Solutions" },
  { href: "/ai-pam", label: "AI-PAM" },
  { key: "resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuKey | null>(null);

  const navRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<number | null>(null);

  /* ── Scroll state: stronger surface once the page moves ── */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 12);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close everything on route change */
  useEffect(() => {
    setOpen(null);
    setMobileOpen(false);
  }, [pathname]);

  /* Body scroll lock for the mobile sheet */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* Escape + click outside */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (open) {
        const btn = navRef.current?.querySelector<HTMLButtonElement>(`[data-menu="${open}"]`);
        setOpen(null);
        btn?.focus();
      }
      setMobileOpen(false);
    };
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  /* ── Sliding highlight pill ── */
  const movePill = useCallback((el: HTMLElement | null) => {
    const pill = pillRef.current;
    const host = navRef.current?.querySelector<HTMLElement>("[data-nav-list]");
    if (!pill || !host) return;
    if (!el) {
      pill.style.opacity = "0";
      return;
    }
    const a = el.getBoundingClientRect();
    const b = host.getBoundingClientRect();
    pill.style.width = `${a.width}px`;
    pill.style.transform = `translateX(${a.left - b.left}px)`;
    pill.style.opacity = "1";
  }, []);

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(null), 140);
  };
  const fine = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-4 pt-3">
      <div
        ref={navRef}
        className="relative mx-auto max-w-[1240px]"
        onMouseLeave={() => {
          if (fine()) {
            scheduleClose();
            movePill(null);
          }
        }}
      >
        <nav
          aria-label="Main"
          className={`nav-bar relative flex items-center justify-between h-[58px] pl-4 pr-2 rounded-2xl border backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-300 ${
            scrolled || open
              ? "bg-white/85 dark:bg-[#0a101c]/85 border-slate-900/[0.08] dark:border-white/[0.08] shadow-[0_12px_40px_-16px_rgba(15,23,42,0.35)]"
              : "bg-white/70 dark:bg-[#0a101c]/60 border-slate-900/[0.06] dark:border-white/[0.07] shadow-[0_8px_30px_-18px_rgba(15,23,42,0.3)]"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0" aria-label="OmniPriv home">
            <Image src="/omnipriv-light.png" alt="OmniPriv" width={160} height={40} className="h-8 w-auto object-contain dark:hidden" priority />
            <Image src="/omniprivdark.png" alt="OmniPriv" width={160} height={40} className="h-8 w-auto object-contain hidden dark:block" priority />
          </Link>

          {/* Desktop links */}
          <div data-nav-list className="relative hidden lg:flex items-center">
            <span
              ref={pillRef}
              aria-hidden="true"
              className="nav-pill absolute left-0 top-1/2 -translate-y-1/2 h-9 rounded-lg bg-slate-900/[0.05] dark:bg-white/[0.07] opacity-0"
            />
            {TOP.map((item) =>
              "key" in item ? (
                <button
                  key={item.label}
                  type="button"
                  data-menu={item.key}
                  aria-expanded={open === item.key}
                  aria-controls="nav-panel"
                  onMouseEnter={(e) => {
                    movePill(e.currentTarget);
                    if (fine()) {
                      cancelClose();
                      setOpen(item.key);
                    }
                  }}
                  onFocus={(e) => movePill(e.currentTarget)}
                  onClick={() => setOpen((o) => (o === item.key ? null : item.key))}
                  className={`relative z-10 flex items-center gap-1 px-3.5 h-9 text-[14px] font-medium rounded-lg transition-colors duration-200 ${
                    open === item.key ? "text-slate-950 dark:text-white" : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                  <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${open === item.key ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onMouseEnter={(e) => {
                    movePill(e.currentTarget);
                    if (fine()) scheduleClose();
                  }}
                  onFocus={(e) => movePill(e.currentTarget)}
                  className={`relative z-10 flex items-center gap-1.5 px-3.5 h-9 text-[14px] font-medium rounded-lg transition-colors duration-200 ${
                    isActive(item.href) ? "text-slate-950 dark:text-white" : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
                  }`}
                >
                  {item.label === "AI-PAM" && <BrainCircuit className="w-3.5 h-3.5 text-[#00B8DB]" aria-hidden="true" />}
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/sign-in"
              className="px-3 h-9 inline-flex items-center text-[14px] font-medium text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition-colors"
            >
              Partner Portal
            </Link>
            <Link href="/demo" className="nav-cta group">
              Request a Demo
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="flex lg:hidden items-center gap-1.5">
            <span className="hidden min-[380px]:inline-flex">
              <Link href="/demo" className="nav-cta !h-9 !px-3.5 !text-[13px]">
                Request a Demo
              </Link>
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-900/[0.05] dark:hover:bg-white/[0.06] transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* ── Shared dropdown panel ── */}
        <div
          id="nav-panel"
          onMouseEnter={cancelClose}
          className={`nav-panel absolute left-1/2 top-[calc(100%+10px)] w-[min(880px,calc(100vw-2rem))] rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white/95 dark:bg-[#0a101c]/95 backdrop-blur-xl shadow-[0_30px_80px_-24px_rgba(15,23,42,0.45)] hidden lg:block ${
            open ? "is-open" : ""
          }`}
          role="region"
          aria-label={open ? `${open} menu` : undefined}
          aria-hidden={!open}
        >
          <div className="nav-panel-inner relative">
            {/* Platform */}
            <div className={`nav-pane ${open === "platform" ? "is-on" : ""}`} {...inertIf(open !== "platform")}>
              <div className="grid grid-cols-[1fr_260px] gap-2 p-2">
                <div className="grid grid-cols-2 gap-1 p-1">
                  {platformLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-slate-900/[0.04] dark:hover:bg-white/[0.05] transition-colors"
                    >
                      <span className="w-9 h-9 rounded-lg bg-[#00B8DB]/10 text-[#00B8DB] flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover/item:scale-105">
                        <item.icon className="w-4 h-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-slate-950 dark:text-white">{item.label}</span>
                        <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.description}</span>
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/ai-pam"
                  className="group/feat relative flex flex-col justify-between overflow-hidden rounded-xl p-5 bg-[#04070e] text-white"
                >
                  <span className="nav-feature-glow" aria-hidden="true" />
                  <span className="relative">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#00B8DB]/15 text-[#00B8DB] mb-4">
                      <BrainCircuit className="w-5 h-5" />
                    </span>
                    <span className="block text-base font-semibold">AI-PAM Engine</span>
                    <span className="block text-sm text-slate-400 mt-1.5 leading-relaxed">
                      ML threat detection and MCP agent governance in one engine.
                    </span>
                  </span>
                  <span className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-[#00B8DB] mt-6">
                    Explore the engine
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/feat:-translate-y-0.5 group-hover/feat:translate-x-0.5" />
                  </span>
                </Link>
              </div>
              <div className="flex items-center justify-between px-5 py-3 border-t border-slate-900/[0.06] dark:border-white/[0.06]">
                <span className="text-xs text-slate-500">Nine modules, one privileged access platform.</span>
                <Link href="/platform" className="inline-flex items-center gap-1 text-xs font-semibold text-[#00B8DB] hover:underline">
                  View all capabilities <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Solutions */}
            <div className={`nav-pane ${open === "solutions" ? "is-on" : ""}`} {...inertIf(open !== "solutions")}>
              <div className="grid grid-cols-2 gap-1 p-3">
                {[...solutions]
                  .sort((a, b) => a.order - b.order)
                  .map((s) => (
                    <Link
                      key={s.slug}
                      href={`/solutions/${s.slug}`}
                      className="group/item flex items-start gap-3 p-4 rounded-xl hover:bg-slate-900/[0.04] dark:hover:bg-white/[0.05] transition-colors"
                    >
                      <span className="w-10 h-10 rounded-lg bg-[#00B8DB]/10 text-[#00B8DB] flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover/item:scale-105">
                        <s.icon className="w-5 h-5" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-slate-950 dark:text-white">{s.cardTitle}</span>
                        <span className="block text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">{s.description}</span>
                      </span>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Resources */}
            <div className={`nav-pane ${open === "resources" ? "is-on" : ""}`} {...inertIf(open !== "resources")}>
              <div className="grid grid-cols-[1fr_260px] gap-2 p-2">
                <div className="grid grid-cols-2 gap-1 p-1">
                  {resourceLinks.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-slate-900/[0.04] dark:hover:bg-white/[0.05] transition-colors"
                    >
                      <span className="w-9 h-9 rounded-lg bg-[#00B8DB]/10 text-[#00B8DB] flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-slate-950 dark:text-white">{item.label}</span>
                        <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.description}</span>
                      </span>
                    </Link>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    downloadDatasheets();
                    setOpen(null);
                  }}
                  className="group/feat text-left flex flex-col justify-between rounded-xl p-5 border border-slate-900/[0.08] dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.03] hover:border-[#00B8DB]/40 transition-colors"
                >
                  <span>
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#00B8DB]/10 text-[#00B8DB] mb-4">
                      <Download className="w-5 h-5" />
                    </span>
                    <span className="block text-base font-semibold text-slate-950 dark:text-white">Data sheet</span>
                    <span className="block text-sm text-slate-500 dark:text-slate-400 mt-1.5">
                      Product datasheet and full specification, as PDF.
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00B8DB] mt-6">
                    Download
                    <Download className="w-4 h-4 transition-transform duration-200 group-hover/feat:translate-y-0.5" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile sheet ── */}
      <div
        className={`nav-sheet lg:hidden fixed inset-x-3 top-[82px] bottom-3 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white/95 dark:bg-[#0a101c]/95 backdrop-blur-xl overflow-y-auto ${
          mobileOpen ? "is-open" : ""
        }`}
        aria-hidden={!mobileOpen}
        {...inertIf(!mobileOpen)}
      >
        <div className="p-4 space-y-1">
          {(
            [
              { key: "platform" as MenuKey, label: "Platform", items: platformLinks.map((p) => ({ label: p.label, href: p.href, icon: p.icon })) },
              {
                key: "solutions" as MenuKey,
                label: "Solutions",
                items: [...solutions].sort((a, b) => a.order - b.order).map((s) => ({ label: s.cardTitle, href: `/solutions/${s.slug}`, icon: s.icon })),
              },
            ]
          ).map((group, gi) => (
            <div key={group.key} className="nav-sheet-item" style={{ ["--i" as string]: gi }}>
              <button
                type="button"
                onClick={() => setMobileSection((s) => (s === group.key ? null : group.key))}
                aria-expanded={mobileSection === group.key}
                className="w-full flex items-center justify-between px-3 py-3.5 text-[15px] font-semibold text-slate-950 dark:text-white rounded-xl"
              >
                {group.label}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileSection === group.key ? "rotate-180" : ""}`} />
              </button>
              {mobileSection === group.key && (
                <div className="pb-2 pl-2 grid gap-0.5">
                  {group.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-900/[0.04] dark:hover:bg-white/[0.05]"
                    >
                      <item.icon className="w-4 h-4 text-[#00B8DB]" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {[
            { label: "AI-PAM Engine", href: "/ai-pam" },
            { label: "Blog", href: "/blog" },
            { label: "Case Studies", href: "/case-studies" },
            { label: "About", href: "/about" },
          ].map((l, i) => (
            <Link
              key={l.label}
              href={l.href}
              className="nav-sheet-item block px-3 py-3.5 text-[15px] font-semibold text-slate-950 dark:text-white rounded-xl"
              style={{ ["--i" as string]: i + 2 }}
            >
              {l.label}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => {
              downloadDatasheets();
              setMobileOpen(false);
            }}
            className="nav-sheet-item w-full flex items-center justify-between px-3 py-3.5 text-[15px] font-semibold text-slate-950 dark:text-white rounded-xl"
            style={{ ["--i" as string]: 6 }}
          >
            Data sheet
            <Download className="w-4 h-4 text-[#00B8DB]" />
          </button>

          <div className="nav-sheet-item flex items-center justify-between px-3 py-3" style={{ ["--i" as string]: 7 }}>
            <span className="text-sm text-slate-600 dark:text-slate-400">Theme</span>
            <ThemeToggle />
          </div>

          <div className="nav-sheet-item grid gap-2 pt-3 mt-2 border-t border-slate-900/[0.08] dark:border-white/[0.08]" style={{ ["--i" as string]: 8 }}>
            <Link href="/demo" className="nav-cta !h-12 justify-center">
              Request a Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/sign-in"
              className="h-12 inline-flex items-center justify-center rounded-xl border border-slate-900/[0.12] dark:border-white/[0.12] text-sm font-semibold text-slate-800 dark:text-slate-200"
            >
              Partner Portal
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
