import Link from "next/link";
import {
  ArrowRight, BookOpen, Code, Server, Zap, Shield,
  ChevronRight, FileText, Database, Network, Cpu, Lock, Globe,
  Play, Terminal, Settings, Users,
  Icon,
} from "lucide-react";

const docCategories = [
  {
    icon: Play,
    title: "Quick Start",
    description: "Get OmniPriv running in your environment in under 30 minutes.",
    articles: [
      { title: "System Requirements & Prerequisites", href: "/docs/quick-start/requirements" },
      { title: "Single-Node Installation Guide", href: "/docs/quick-start/install" },
      { title: "Initial Configuration & Setup", href: "/docs/quick-start/config" },
      { title: "Connecting Your First Asset", href: "/docs/quick-start/first-asset" },
      { title: "Creating Users and Roles", href: "/docs/quick-start/users-roles" },
    ],
    color: "border-blue-500/20 bg-blue-500/5",
    textColor: "text-blue-400",
  },
  {
    icon: Settings,
    title: "Administration",
    description: "Configure and manage every aspect of your OmniPriv deployment.",
    articles: [
      { title: "Asset Management & Discovery", href: "/docs/admin/assets" },
      { title: "User & Group Management", href: "/docs/admin/users" },
      { title: "RBAC Roles & Permissions", href: "/docs/admin/rbac" },
      { title: "Authentication Providers (LDAP, SSO)", href: "/docs/admin/auth" },
      { title: "Credential Vault Configuration", href: "/docs/admin/vault" },
    ],
    color: "border-purple-500/20 bg-purple-500/5",
    textColor: "text-purple-400",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Configure security policies, audit settings, and compliance controls.",
    articles: [
      { title: "MFA Configuration", href: "/docs/security/mfa" },
      { title: "Session Recording Settings", href: "/docs/security/recording" },
      { title: "ACL & Command Filtering", href: "/docs/security/acls" },
      { title: "Compliance Report Templates", href: "/docs/security/compliance" },
      { title: "Audit Log Management", href: "/docs/security/audit-logs" },
    ],
    color: "border-teal-500/20 bg-teal-500/5",
    textColor: "text-teal-400",
  },
  {
    icon: Code,
    title: "API Reference",
    description: "REST and GraphQL APIs for integrating OmniPriv into your workflows.",
    articles: [
      { title: "Authentication & API Keys", href: "/docs/api/auth" },
      { title: "Assets API", href: "/docs/api/assets" },
      { title: "Users & Permissions API", href: "/docs/api/users" },
      { title: "Sessions API", href: "/docs/api/sessions" },
      { title: "Audit & Reports API", href: "/docs/api/audit" },
    ],
    color: "border-orange-500/20 bg-orange-500/5",
    textColor: "text-orange-400",
  },
  {
    icon: Zap,
    title: "Integrations",
    description: "Connect OmniPriv with your existing security and DevOps toolchain.",
    articles: [
      { title: "Active Directory & LDAP", href: "/docs/integrations/ldap" },
      { title: "Okta / Azure AD (SSO)", href: "/docs/integrations/sso" },
      { title: "Splunk & SIEM Integration", href: "/docs/integrations/splunk" },
      { title: "ServiceNow Ticketing", href: "/docs/integrations/servicenow" },
      { title: "Terraform Provider", href: "/docs/integrations/terraform" },
    ],
    color: "border-yellow-500/20 bg-yellow-500/5",
    textColor: "text-yellow-400",
  },
  {
    icon: Server,
    title: "Deployment",
    description: "Deployment guides for every topology, from single node to global HA cluster.",
    articles: [
      { title: "High-Availability Cluster Setup", href: "/docs/deploy/ha" },
      { title: "Docker & Kubernetes Deployment", href: "/docs/deploy/k8s" },
      { title: "AWS / Azure / GCP Deployment", href: "/docs/deploy/cloud" },
      { title: "Backup & Disaster Recovery", href: "/docs/deploy/backup" },
      { title: "Upgrade Guide", href: "/docs/deploy/upgrade" },
    ],
    color: "border-emerald-500/20 bg-emerald-500/5",
    textColor: "text-emerald-400",
  },
];

const popularDocs = [
  { icon: Terminal, title: "How to Connect Assets via SSH Proxy", href: "/docs/how-to/ssh-proxy", views: "34.2k views" },
  { icon: Users, title: "Setting Up LDAP/AD Sync for Enterprise", href: "/docs/how-to/ldap-sync", views: "28.1k views" },
  { icon: Lock, title: "Configuring MFA with Google Authenticator", href: "/docs/how-to/mfa-setup", views: "21.5k views" },
  { icon: Database, title: "Connecting to MySQL and PostgreSQL Databases", href: "/docs/how-to/database", views: "19.8k views" },
  { icon: Network, title: "Kubernetes Cluster Access with OmniPriv", href: "/docs/how-to/kubernetes", views: "15.3k views" },
  { icon: FileText, title: "Generating SOC2 Compliance Reports", href: "/docs/how-to/soc2-report", views: "13.7k views" },
];

const quickLinks = [
  { label: "System Architecture Overview", href: "/docs/architecture", icon: Cpu },
  { label: "Changelog & Release Notes", href: "/docs/changelog", icon: Globe },
  { label: "REST API OpenAPI Spec", href: "/docs/api/openapi", icon: Code },
  { label: "Troubleshooting Guide", href: "/docs/troubleshoot", icon: Settings },
];

export default function DocsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-16 pb-16 border-b border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#07070E]" />
        <div className="container-xl relative z-10 text-center">
          <div className="badge-cyan mb-6 inline-flex mx-auto">Documentation</div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6" style={{ fontFamily: "var(--font-syne)" }}>
            OmniPriv <span className="text-accent">Documentation</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-xl mx-auto mb-10">
            Everything you need to deploy, configure, and operate OmniPriv in your enterprise environment.
          </p>


        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 border-b border-white/[0.04] bg-[#0E0E1C]/30">
        <div className="container-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickLinks.map((link) => (
              <Link key={link.label} href={link.href} className="flex items-center gap-2 p-3 rounded-xl border border-white/[0.06] hover:border-[#6366F1]/20 transition-all group">
                <link.icon className="w-4 h-4 text-[#6366F1] flex-shrink-0" />
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Categories */}
      <section className="section-padding">
        <div className="container-xl">
          <h2 className="text-2xl font-extrabold text-white mb-8" style={{ fontFamily: "var(--font-syne)" }}>
            Browse by Category
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {docCategories.map((cat) => (
              <div key={cat.title} className={`p-6 rounded-2xl border ${cat.color} hover:border-opacity-40 transition-all group`}>
                <div className="flex items-center gap-3 mb-3">
                  <cat.icon className={`w-5 h-5 ${cat.textColor}`} />
                  <h3 className={`font-bold text-base ${cat.textColor}`} style={{ fontFamily: "var(--font-syne)" }}>{cat.title}</h3>
                </div>
                <p className="text-xs text-slate-400 mb-5">{cat.description}</p>
                <ul className="space-y-2.5">
                  {cat.articles.map((article) => (
                    <li key={article.title}>
                      {/* <Link
                        href={article.href}
                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group/link"
                      > */}
                        <ChevronRight className="w-3 h-3 text-[#6366F1]/50 group-hover/link:text-[#6366F1] transition-colors flex-shrink-0" />
                        {article.title}
                      {/* </Link> */}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="section-padding border-t border-white/[0.04] bg-[#0E0E1C]/30">
        <div className="container-xl">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h2 className="text-2xl font-extrabold text-white" style={{ fontFamily: "var(--font-syne)" }}>
              Most Popular Articles
            </h2>
            {/* <Link href="/docs/all" className="text-sm text-[#6366F1] hover:underline flex items-center gap-1">
              View all docs <ArrowRight className="w-3.5 h-3.5" />
            </Link> */}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularDocs.map((doc) => (
              <Link
                key={doc.title}
                href={doc.href}
                className="flex items-start gap-3 p-5 rounded-xl border border-white/[0.06] bg-[#0E0E1C]/60 hover:border-[#6366F1]/20 transition-all group"
              >
                <doc.icon className="w-5 h-5 text-[#6366F1] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-semibold text-white mb-1 group-hover:text-[#6366F1] transition-colors">
                    {doc.title}
                  </div>
                  <div className="text-xs text-slate-500">{doc.views}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="relative rounded-3xl overflow-hidden border border-[#6366F1]/15 p-10 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0E0E1C] to-[#07070E]" />
            <div className="relative z-10">
              <BookOpen className="w-12 h-12 text-[#6366F1] mx-auto mb-5" />
              <h2 className="text-2xl font-extrabold text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                Can&apos;t find what you need?
              </h2>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                Our support team and dedicated Customer Success managers are available to help you with any technical questions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="mailto:support@OmniPriv.com" className="btn-primary">
                  Contact Support <ArrowRight className="w-4 h-4" />
                </a>
                <Link href="/demo" className="btn-secondary">
                  Request a Training Session
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

