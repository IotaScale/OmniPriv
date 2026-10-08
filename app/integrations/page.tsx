import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plug, CheckCircle2, Puzzle } from "lucide-react";

import CtaBand from "@/components/sections/CtaBand";
import SplitHero from "@/components/sections/SplitHero";

export const metadata: Metadata = {
  title: "Integrations: Connect OmniPriv to Your Stack",
  description:
    "OmniPriv integrates with 250+ enterprise tools, from identity providers and SIEM platforms to cloud services and ITSM systems, so privileged access management fits naturally into your existing workflows.",
};

type Integration = {
  name: string;
  desc: string;
  category: string;
};

const categories: { label: string; description: string; integrations: Integration[] }[] = [
  {
    label: "Identity & Access Management",
    description: "Authenticate users against your existing identity infrastructure. Support for all major IdPs with MFA enforcement.",
    integrations: [
      { name: "Okta", category: "IdP", desc: "SSO, SCIM provisioning, and FIDO2/MFA" },
      { name: "Microsoft Entra ID", category: "IdP", desc: "Azure AD SSO, Conditional Access, PIM sync" },
      { name: "Ping Identity", category: "IdP", desc: "PingFederate and PingOne full integration" },
      { name: "CyberArk Identity", category: "IdP", desc: "MFA, endpoint privilege, and workforce identity" },
      { name: "SailPoint", category: "IGA", desc: "Governance lifecycle and access certification" },
      { name: "Saviynt", category: "IGA", desc: "Cloud PAM governance and lifecycle management" },
      { name: "ForgeRock", category: "IdP", desc: "Access management and identity platform" },
      { name: "RSA SecurID", category: "MFA", desc: "Hardware and software token integration" },
      { name: "Duo Security", category: "MFA", desc: "Duo Push, passcode, and hardware key" },
      { name: "YubiKey", category: "MFA", desc: "FIDO2 hardware key enforcement" },
      { name: "LDAP / AD", category: "Directory", desc: "Active Directory and OpenLDAP sync" },
      { name: "Google Workspace", category: "IdP", desc: "G Suite SSO and directory sync" },
    ],
  },
  {
    label: "SIEM & Security Operations",
    description: "Stream session logs, alert events, and audit trails to your security operations platform in real time.",
    integrations: [
      { name: "Splunk", category: "SIEM", desc: "Certified app with 80+ built-in dashboards" },
      { name: "IBM QRadar", category: "SIEM", desc: "Full syslog and CEF event streaming" },
      { name: "Microsoft Sentinel", category: "SIEM", desc: "Azure-native connector with Analytic rules" },
      { name: "Elastic SIEM", category: "SIEM", desc: "ECS-formatted event export" },
      { name: "ArcSight", category: "SIEM", desc: "SmartConnector and CEF format support" },
      { name: "Chronicle SIEM", category: "SIEM", desc: "Google Chronicle ingestion pipelines" },
      { name: "Sumo Logic", category: "SIEM", desc: "Real-time log streaming and UEBA correlation" },
      { name: "Exabeam", category: "UEBA", desc: "Behavioral analytics integration" },
    ],
  },
  {
    label: "ITSM & Ticketing",
    description: "Enforce access-request workflows through your existing ticketing system. Auto-approve, escalate, or reject via policy.",
    integrations: [
      { name: "ServiceNow", category: "ITSM", desc: "Certified ServiceNow integration for JIT requests" },
      { name: "Jira Service Management", category: "ITSM", desc: "Atlassian ITSM and Jira Software" },
      { name: "Freshservice", category: "ITSM", desc: "ITIL-aligned access request automation" },
      { name: "BMC Helix", category: "ITSM", desc: "Change management and approval workflows" },
      { name: "Zendesk", category: "ITSM", desc: "Ticket-based approval for vendor access" },
      { name: "PagerDuty", category: "Incident", desc: "On-call access escalation and runbook auth" },
    ],
  },
  {
    label: "Cloud Platforms",
    description: "Manage and rotate cloud secrets, service accounts, and cloud-native privileged roles natively.",
    integrations: [
      { name: "Amazon Web Services", category: "Cloud", desc: "IAM, Secrets Manager, Systems Manager" },
      { name: "Microsoft Azure", category: "Cloud", desc: "Key Vault, RBAC, PIM, and workload identity" },
      { name: "Google Cloud Platform", category: "Cloud", desc: "Secret Manager, IAM roles, workload identity" },
      { name: "Alibaba Cloud", category: "Cloud", desc: "RAM and Key Management Service" },
      { name: "Oracle Cloud", category: "Cloud", desc: "OCI IAM and Vault integration" },
      { name: "IBM Cloud", category: "Cloud", desc: "Secrets Manager and IAM integration" },
      { name: "Kubernetes", category: "Cloud", desc: "Service account management and kubectl audit" },
      { name: "HashiCorp Vault", category: "Secrets", desc: "Vault sync and dynamic secrets" },
    ],
  },
  {
    label: "DevOps & CI/CD",
    description: "Inject secrets and certificates into CI/CD pipelines without hardcoded credentials or manual rotations.",
    integrations: [
      { name: "GitHub Actions", category: "CI/CD", desc: "OIDC-based short-lived token injection" },
      { name: "GitLab CI/CD", category: "CI/CD", desc: "Pipeline variable vault and rotation" },
      { name: "Jenkins", category: "CI/CD", desc: "Plugin for dynamic credential injection" },
      { name: "CircleCI", category: "CI/CD", desc: "Context-level secrets injection" },
      { name: "Ansible", category: "IaC", desc: "Playbook credential management" },
      { name: "Terraform", category: "IaC", desc: "Provider for dynamic secrets in plans" },
      { name: "Helm / ArgoCD", category: "GitOps", desc: "GitOps-safe secret management" },
    ],
  },
  {
    label: "Databases",
    description: "Manage privileged access to production databases with session recording, query auditing, and automatic credential rotation.",
    integrations: [
      { name: "Oracle Database", category: "RDBMS", desc: "Full session recording and query audit" },
      { name: "Microsoft SQL Server", category: "RDBMS", desc: "Windows Auth and SQL Auth session proxy" },
      { name: "MySQL / MariaDB", category: "RDBMS", desc: "Transparent proxy with full audit trail" },
      { name: "PostgreSQL", category: "RDBMS", desc: "Dynamic role-based auth for Postgres" },
      { name: "MongoDB", category: "NoSQL", desc: "Atlas and on-prem session management" },
      { name: "Redis", category: "NoSQL", desc: "ACL-based credential management" },
      { name: "Elasticsearch", category: "NoSQL", desc: "Role-based access and API key rotation" },
    ],
  },
];

const featuredLogos = [
  "AWS", "Azure", "GCP", "Okta", "Splunk", "ServiceNow",
  "SailPoint", "Ping", "Kubernetes", "HashiCorp", "GitHub", "Terraform",
];

const cardClass =
  "rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#0F2140] hover:border-[#00B8DB]/45 transition-colors";

export default function IntegrationsPage() {
  return (
    <>
      <SplitHero
        titleLead="Fits Seamlessly Into"
        titleAccent="Your Stack"
        primary={{ href: "/demo", label: "See a Live Integration Demo" }}
        media={{
          src: "/product/asset.png",
          alt: "OmniPriv asset management view for connected enterprise systems",
          fit: "contain",
        }}
      >
        <p>
          OmniPriv connects natively with 250+ enterprise tools, identity providers, SIEM platforms, ITSM systems, cloud services, and development pipelines. PAM that works with your existing workflows, not against them.
        </p>
      </SplitHero>

      {/* Featured integrations */}
      <section className="py-12 border-b border-slate-900/[0.06] dark:border-white/[0.06]">
        <div className="container-xl">
          <p className="text-sm font-semibold text-[#0a1628] dark:text-white mb-5">Integrations include</p>
          <div className="flex flex-wrap gap-3" data-aos="fade-up">
            {featuredLogos.map((logo) => (
              <div
                key={logo}
                className="px-5 py-2.5 rounded-xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#0F2140] text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                {logo}
              </div>
            ))}
            <div className="px-5 py-2.5 rounded-xl border border-slate-900/[0.08] dark:border-white/[0.08] text-sm font-medium text-slate-500 dark:text-slate-400">
              + 238 more
            </div>
          </div>
        </div>
      </section>

      {/* API-first callout */}
      <section className="section-padding border-b border-slate-900/[0.06] dark:border-white/[0.06]">
        <div className="container-xl">
          <div className="grid gap-5 lg:grid-cols-3" data-aos="fade-up">
            {[
              { icon: Plug, title: "REST API", desc: "Fully documented REST API for custom integrations, automation, and SIEM data streaming. Every platform action is API-accessible." },
              { icon: CheckCircle2, title: "Tested Integrations", desc: "Every integration is tested and validated with each OmniPriv platform release, so upgrades do not break the tools you rely on." },
              { icon: Puzzle, title: "Custom Connectors", desc: "Build custom connectors using our open SDK or request a connector from our engineering team. No vendor lock-in." },
            ].map((item) => (
              <div key={item.title} className={`${cardClass} p-6`}>
                <div className="icon-wrapper mb-4">
                  <item.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="op-card-title mb-2">{item.title}</h3>
                <p className="op-card-text">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category sections */}
      <section className="section-padding border-b border-slate-900/[0.06] dark:border-white/[0.06]">
        <div className="container-xl space-y-16 lg:space-y-20">
          {categories.map((cat) => (
            <div key={cat.label}>
              <div className="section-heading" data-aos="fade-up">
                <h2 className="op-h2">{cat.label}</h2>
                <p className="op-lede">{cat.description}</p>
              </div>
              <div className="op-body grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" data-aos="fade-up">
                {cat.integrations.map((intg) => (
                  <div key={intg.name} className={`${cardClass} p-5`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="icon-wrapper flex-shrink-0 flex items-center justify-center text-[9px] font-bold leading-none text-center"
                        aria-hidden="true"
                      >
                        {intg.name.substring(0, 3).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="op-card-title text-[0.9375rem] leading-tight">{intg.name}</h3>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{intg.category}</div>
                      </div>
                    </div>
                    <p className="op-card-text text-sm">{intg.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <CtaBand
        title="Don't See Your Tool?"
        body={[
          "Contact our integration team. We support custom connectors and can prioritize new integrations based on customer demand.",
        ]}
        primary={{ href: "/demo", label: "Request an Integration Demo" }}
        secondary={{ href: "mailto:integrations@OmniPriv.com", label: "Contact Integration Team" }}
      />
    </>
  );
}
