import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plug, CheckCircle2 } from "lucide-react";

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

export default function IntegrationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-16 pb-20 border-b border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#07070E]" />
        <div className="container-xl relative z-10 text-center max-w-3xl mx-auto">
          <div className="badge-cyan mb-6">Integrations</div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight" style={{ fontFamily: "var(--font-syne)" }}>
            Fits Seamlessly Into <span className="text-accent">Your Stack</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed mb-8">
            OmniPriv connects natively with 250+ enterprise tools â€” identity providers, SIEM platforms, ITSM systems, cloud services, and development pipelines. PAM that works with your existing workflows, not against them.
          </p>
          <Link href="/demo" className="btn-primary">
            See a Live Integration Demo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Featured logos */}
      <section className="py-12 border-b border-white/[0.04] bg-[#0E0E1C]/30">
        <div className="container-xl">
          <p className="text-xs text-slate-500 text-center uppercase tracking-widest mb-8">Certified Integrations Include</p>
          <div className="flex flex-wrap justify-center gap-3">
            {featuredLogos.map((logo) => (
              <div key={logo} className="px-6 py-2.5 rounded-xl border border-white/[0.06] bg-[#0E0E1C]/40 text-sm font-medium text-slate-300 hover:border-[#6366F1]/20 transition-all">
                {logo}
              </div>
            ))}
            <div className="px-6 py-2.5 rounded-xl border border-white/[0.06] bg-[#0E0E1C]/40 text-sm font-medium text-slate-500">
              + 238 more
            </div>
          </div>
        </div>
      </section>

      {/* API-first callout */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid lg:grid-cols-3 gap-5">
            {[
              { icon: Plug, title: "REST API", desc: "Fully documented REST API for custom integrations, automation, and SIEM data streaming. Every platform action is API-accessible." },
              { icon: CheckCircle2, title: "Certified Partner Program", desc: "OmniPriv maintains certified integrations with 100+ partners â€” tested and validated with each platform release." },
              { icon: ArrowRight, title: "Custom Connectors", desc: "Build custom connectors using our open SDK or request a connector from our engineering team. No vendor lock-in." },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-white/[0.06] bg-[#0E0E1C]/60 flex items-start gap-4">
                <div className="icon-wrapper w-10 h-10 rounded-lg flex-shrink-0">
                  <item.icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Sections */}
      <section className="section-padding-lg border-t border-white/[0.04]">
        <div className="container-xl space-y-16">
          {categories.map((cat) => (
            <div key={cat.label}>
              <div className="mb-7">
                <h2 className="text-2xl font-extrabold text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>{cat.label}</h2>
                <p className="text-slate-400 text-sm">{cat.description}</p>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cat.integrations.map((intg) => (
                  <div key={intg.name} className="p-5 rounded-xl border border-white/[0.06] bg-[#0E0E1C]/40 hover:border-[#6366F1]/20 transition-all group card-shine">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#6366F1]/10 flex items-center justify-center text-[8px] font-bold text-[#6366F1] leading-none text-center" style={{ fontFamily: "var(--font-syne)" }}>
                        {intg.name.substring(0, 3).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white leading-tight">{intg.name}</div>
                        <div className="text-[10px] text-slate-500">{intg.category}</div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{intg.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding border-t border-white/[0.04]">
        <div className="container-xl text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
            Don&apos;t See Your Tool?
          </h2>
          <p className="text-slate-400 mb-8">
            Contact our integration team. We support custom connectors and can prioritize new integrations based on customer demand.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/demo" className="btn-primary">
              Request an Integration Demo <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="mailto:integrations@OmniPriv.com" className="btn-secondary">
              Contact Integration Team
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

