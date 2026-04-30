import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | OmniPriv",
  description: "Learn how OmniPriv collects, uses, and protects your personal information.",
};

const sections = [
  {
    id: "overview",
    title: "Overview",
    content: `OmniPriv, Inc. ("OmniPriv," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy describes how we collect, use, disclose, and safeguard your personal information when you visit our website (OmniPriv.com), use our privileged access management platform, or interact with us as a customer or prospective customer.

By using our website or services, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree, please do not use our services.`,
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: `We collect several types of information in connection with our services:

Information You Provide Directly
- Contact and account information: name, work email address, phone number, job title, company name, and company size when you fill out forms, request demos, or register for an account.
- Communications: messages you send us via email, web forms, or support tickets.
- Payment information: processed by our PCI-DSS compliant payment processors; we do not store raw card data.
- Usage data: configuration settings, access logs, and session metadata when you use the OmniPriv platform.

Information Collected Automatically
- Technical data: IP address, browser type, operating system, referral URL, pages visited, and time spent on pages.
- Cookies and tracking technologies: session cookies, persistent cookies, and similar technologies (see "Cookies" section below).
- Usage analytics: aggregated, anonymized data about how users navigate and use our platform, used to improve product quality.

Information From Third Parties
- Business intelligence providers: publicly available firmographic data (company size, industry) used to personalize outreach.
- SSO providers: if you authenticate via an identity provider (Okta, Azure AD, etc.), we receive basic profile information permitted by that provider.`,
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    content: `We use the information we collect to:

- Provide and improve our services: Process transactions, maintain accounts, deliver support, and continuously enhance the OmniPriv platform.
- Communications: Send you service notifications, security alerts, product updates, and marketing communications (which you may opt out of at any time).
- Sales and marketing: Personalize outreach from our sales team based on your role, company, and expressed interests.
- Security and fraud prevention: Monitor for unauthorized access, investigate incidents, and enforce our terms of service.
- Compliance and legal obligations: Retain records required by applicable law, respond to lawful requests from government authorities, and exercise or defend legal claims.
- Analytics: Understand how our website and product are used to improve user experience and prioritize product development.`,
  },
  {
    id: "legal-bases",
    title: "Legal Bases for Processing (GDPR)",
    content: `If you are in the European Economic Area (EEA) or United Kingdom, we process your personal data under the following legal bases:

- Contract performance: When processing is necessary to fulfill a contract with you (e.g., delivering subscribed services).
- Legitimate interests: When we have a legitimate business interest that does not override your rights (e.g., fraud prevention, marketing to existing customers, product analytics).
- Consent: When you have given explicit consent (e.g., subscribing to marketing emails). You may withdraw consent at any time.
- Legal obligation: When processing is required to comply with applicable law.`,
  },
  {
    id: "sharing",
    title: "How We Share Your Information",
    content: `We do not sell your personal information. We share your information only in the following circumstances:

- Service providers: Trusted vendors who perform services on our behalf (cloud hosting, payment processing, email delivery, analytics) under contractual data processing agreements.
- Business transfers: In connection with a merger, acquisition, or sale of assets, in which case we will notify you and your information will remain subject to this Privacy Policy.
- Legal requirements: When required by law, court order, or government authority; when necessary to protect OmniPriv's rights; or to prevent fraud or criminal activity.
- With your consent: When you have explicitly authorized us to share your information with a third party.

All third-party service providers are evaluated for security practices and contractually obligated to protect your data.`,
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: `We retain your personal information for as long as necessary to provide our services, fulfill the purposes described in this Privacy Policy, and meet our legal obligations. Specific retention periods:

- Account data: Retained for the duration of your contract and up to 5 years afterward for legal purposes.
- Session logs and audit records: Retained for the period required by your applicable compliance framework (typically 1â€“7 years), configurable per your deployment.
- Marketing data: Retained until you opt out or request deletion.
- Cookie data: See cookie-specific retention in our Cookie Policy.

When data is no longer needed, we securely delete or anonymize it.`,
  },
  {
    id: "security",
    title: "How We Protect Your Information",
    content: `We implement technical and organizational security measures appropriate to the risk, including:

- AES-256 encryption at rest and TLS 1.3 in transit for all data
- SOC 2 Type II certified infrastructure
- ISO 27001 certified information security management system
- Role-based access controls and least-privilege principles for our internal team
- Regular third-party penetration testing (results summarized in our security whitepaper)
- 24/7 security monitoring and incident response

No method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security. If you believe your data has been compromised, contact security@OmniPriv.com immediately.`,
  },
  {
    id: "cookies",
    title: "Cookies & Tracking Technologies",
    content: `We use cookies and similar tracking technologies to:

- Keep you signed in and remember your preferences (essential cookies)
- Analyze website usage and performance (analytics cookies â€” providers: Google Analytics, Mixpanel)
- Personalize content and advertising (marketing cookies â€” providers: HubSpot, LinkedIn Insight Tag)

You can control cookies through your browser settings or opt out of analytics tracking via our consent banner. Disabling certain cookies may affect website functionality.`,
  },
  {
    id: "your-rights",
    title: "Your Rights and Choices",
    content: `Depending on your location, you may have the following rights regarding your personal data:

- Access: Request a copy of the personal data we hold about you.
- Rectification: Correct inaccurate or incomplete information.
- Erasure ("right to be forgotten"): Request deletion of your personal data, subject to legal retention requirements.
- Portability: Receive your data in a structured, machine-readable format.
- Restriction: Request that we limit how we process your data.
- Objection: Object to processing based on legitimate interests, including direct marketing.
- Withdraw consent: Withdraw consent at any time without affecting prior lawful processing.

To exercise any right, email privacy@OmniPriv.com. We respond to all requests within 30 days (or as required by applicable law). We may need to verify your identity before fulfilling requests.`,
  },
  {
    id: "international",
    title: "International Data Transfers",
    content: `OmniPriv is headquartered in the United States. If you are located outside the US, your data may be transferred to and processed in the US and other countries where our service providers operate. We use Standard Contractual Clauses (SCCs) approved by the European Commission and other appropriate safeguards to protect international data transfers.`,
  },
  {
    id: "children",
    title: "Children's Privacy",
    content: `OmniPriv is an enterprise B2B service and is not directed to individuals under the age of 16. We do not knowingly collect personal data from children. If we learn we have inadvertently done so, we will promptly delete it.`,
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy periodically. When we make material changes, we will notify you via email or a prominent notice on our website with at least 30 days notice before the changes take effect. Your continued use of our services after the effective date constitutes acceptance of the updated Privacy Policy.`,
  },
  {
    id: "contact",
    title: "Contact Us",
    content: `For privacy inquiries, data requests, or to report a concern:

OmniPriv Privacy Team
Email: privacy@OmniPriv.com
Address: OmniPriv, Inc., 1 Market Street, Suite 2500, San Francisco, CA 94105, USA

For EU/UK residents, you may also contact our EU Data Protection Representative at dpa@OmniPriv.eu, or lodge a complaint with your local supervisory authority.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-16 pb-16 border-b border-white/[0.04]">
        <div className="container-xl max-w-3xl mx-auto">
          <div className="badge-cyan mb-5">Legal</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5" style={{ fontFamily: "var(--font-syne)" }}>
            Privacy Policy
          </h1>
          <p className="text-slate-400">
            Effective Date: January 1, 2025 &bull; Last Updated: January 1, 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid lg:grid-cols-4 gap-10">

            {/* Table of Contents */}
            <nav className="hidden lg:block">
              <div className="sticky top-28 space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Contents</p>
                {sections.map((s) => (
                  <a key={s.id} href={`#${s.id}`} className="block text-sm text-slate-400 hover:text-[#6366F1] transition-colors py-1 border-l border-white/[0.06] hover:border-[#6366F1]/40 pl-3">
                    {s.title}
                  </a>
                ))}
              </div>
            </nav>

            {/* Main Content */}
            <article className="lg:col-span-3 space-y-12">
              <div className="p-5 rounded-xl border border-[#6366F1]/15 bg-[#6366F1]/[0.03] text-sm text-slate-300 leading-relaxed">
                <strong className="text-white">Summary:</strong> OmniPriv is a B2B enterprise security company. We collect contact information when you interact with us, use it to provide our services, don&apos;t sell it, protect it with SOC 2 / ISO 27001 certified infrastructure, and honor your data rights. Questions? Email privacy@OmniPriv.com.
              </div>

              {sections.map((s) => (
                <div key={s.id} id={s.id}>
                  <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>{s.title}</h2>
                  <div className="prose-dark space-y-3">
                    {s.content.split("\n\n").map((para, i) => (
                      <p key={i} className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">{para}</p>
                    ))}
                  </div>
                  <div className="divider mt-10" />
                </div>
              ))}

              <div className="text-sm text-slate-500 mt-8">
                <p>Need to exercise a data right or have a privacy question?</p>
                <a href="mailto:privacy@OmniPriv.com" className="text-[#6366F1] hover:underline">privacy@OmniPriv.com</a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

