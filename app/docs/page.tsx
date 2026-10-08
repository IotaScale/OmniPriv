import type { Metadata } from "next";
import {
  Code, Server, Zap, Shield,
  ChevronRight, FileText, Database, Network, Cpu, Lock, Globe,
  Play, Terminal, Settings, Users,
} from "lucide-react";

import CtaBand from "@/components/sections/CtaBand";
import SplitHero from "@/components/sections/SplitHero";

/*
 * Documentation index.
 *
 * None of the destinations advertised here exist yet, app/docs/ contains only
 * this page, so every /docs/<section>/<article> URL below would 404. The
 * article lists are therefore rendered as inert text with a "coming soon"
 * treatment rather than as links, and the fabricated view counts that used to
 * sit on the popular-article cards have been removed.
 *
 * The `href` values are deliberately kept as the intended route map. Once a
 * section is actually built, swap the wrapping <div> back to a <Link> and drop
 * the aria-disabled/opacity styling.
 */
export const metadata: Metadata = {
  title: { absolute: "Documentation | OmniPriv PAM Guides & API Reference" },
  description:
    "Installation, administration, security, API and deployment guides for the OmniPriv privileged access management platform.",
};

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
  },
];

const popularDocs = [
  { icon: Terminal, title: "How to Connect Assets via SSH Proxy", href: "/docs/how-to/ssh-proxy" },
  { icon: Users, title: "Setting Up LDAP/AD Sync for Enterprise", href: "/docs/how-to/ldap-sync" },
  { icon: Lock, title: "Configuring MFA with Google Authenticator", href: "/docs/how-to/mfa-setup" },
  { icon: Database, title: "Connecting to MySQL and PostgreSQL Databases", href: "/docs/how-to/database" },
  { icon: Network, title: "Kubernetes Cluster Access with OmniPriv", href: "/docs/how-to/kubernetes" },
  { icon: FileText, title: "Generating SOC2 Compliance Reports", href: "/docs/how-to/soc2-report" },
];

const quickLinks = [
  { label: "System Architecture Overview", href: "/docs/architecture", icon: Cpu },
  { label: "Changelog & Release Notes", href: "/docs/changelog", icon: Globe },
  { label: "REST API OpenAPI Spec", href: "/docs/api/openapi", icon: Code },
  { label: "Troubleshooting Guide", href: "/docs/troubleshoot", icon: Settings },
];

const cardClass =
  "rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#0F2140]";

export default function DocsPage() {
  return (
    <>
      <SplitHero
        titleLead="OmniPriv"
        titleAccent="Documentation"
        media={{
          src: "/product/dashboard.png",
          alt: "OmniPriv platform dashboard",
          fit: "contain",
        }}
      >
        <p>
          Everything you need to deploy, configure, and operate OmniPriv in your enterprise environment.
        </p>
      </SplitHero>

      {/* Quick links */}
      <section className="py-8 border-b border-slate-900/[0.06] dark:border-white/[0.06]">
        <div className="container-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3" data-aos="fade-up">
            {quickLinks.map((link) => (
              <div
                key={link.label}
                aria-disabled="true"
                className={`${cardClass} flex items-center gap-3 p-4`}
              >
                <link.icon className="w-4 h-4 op-link flex-shrink-0" aria-hidden="true" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{link.label}</span>
                <span className="ml-auto text-xs font-semibold text-slate-500 dark:text-slate-400 flex-shrink-0">Soon</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation categories */}
      <section className="section-padding border-b border-slate-900/[0.06] dark:border-white/[0.06]">
        <div className="container-xl">
          <div className="section-heading" data-aos="fade-up">
            <h2 className="op-h2">Browse by Category</h2>
            <p className="op-lede">
              The guide titles below outline what is being written. They are not yet
              published, so they are listed for reference rather than as links. In the
              meantime, our support team can answer any of these directly.
            </p>
          </div>
          <div className="op-body grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-aos="fade-up">
            {docCategories.map((cat) => (
              <div key={cat.title} className={`${cardClass} p-6`}>
                <div className="icon-wrapper mb-4">
                  <cat.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="op-card-title mb-2">{cat.title}</h3>
                <p className="op-card-text mb-5">{cat.description}</p>
                <ul className="space-y-2.5">
                  {cat.articles.map((article) => (
                    <li
                      key={article.title}
                      className="flex items-start gap-2 text-sm leading-snug text-slate-600 dark:text-slate-400"
                    >
                      <ChevronRight className="w-3.5 h-3.5 mt-0.5 op-link flex-shrink-0" aria-hidden="true" />
                      {article.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular articles */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="section-heading" data-aos="fade-up">
            <h2 className="op-h2">Most Popular Articles</h2>
          </div>
          <div className="op-body grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-aos="fade-up">
            {popularDocs.map((doc) => (
              <div
                key={doc.title}
                aria-disabled="true"
                className={`${cardClass} flex items-start gap-4 p-6`}
              >
                <div className="icon-wrapper flex-shrink-0">
                  <doc.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="op-card-title text-[0.9375rem] mb-1">{doc.title}</h3>
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Coming soon</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <CtaBand
        title="Can't find what you need?"
        body={[
          "Our support team and dedicated Customer Success managers are available to help you with any technical questions.",
        ]}
        primary={{ href: "mailto:support@OmniPriv.com", label: "Contact Support" }}
        secondary={{ href: "/demo", label: "Request a Training Session" }}
      />
    </>
  );
}
