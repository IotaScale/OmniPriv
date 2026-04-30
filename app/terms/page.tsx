import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | OmniPriv",
  description: "OmniPriv Terms of Service: the legal agreement governing your use of our privileged access management platform and website.",
};

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: `By accessing or using OmniPriv's website (OmniPriv.com), documentation, APIs, or any software-as-a-service platform ("Services"), you ("Customer," "you," or "your") agree to be bound by these Terms of Service ("Terms"), our Privacy Policy, and any applicable Order Forms or Subscription Agreements between OmniPriv and your organization.

If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind that entity. If you do not have such authority, or if you do not agree to these Terms, you must not use the Services.

These Terms do not apply to OmniPriv employees or contractors whose use of internal systems is governed by separate employment or contractor agreements.`,
  },
  {
    id: "services",
    title: "2. Description of Services",
    content: `OmniPriv provides a cloud-based and on-premises privileged access management (PAM) platform that enables enterprises to manage, monitor, and audit privileged account access across their IT infrastructure. Specific features, service levels, and deployment options are described in the applicable Order Form, Statement of Work, or online service description.

OmniPriv reserves the right to modify, suspend, or discontinue any feature of the Services with reasonable notice to customers. We will not materially reduce the core functionality of a Service during an active Subscription Term without providing you the option to exit your subscription.`,
  },
  {
    id: "accounts",
    title: "3. Account Registration and Security",
    content: `To access the Services, you must create or be provisioned an account with accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.

You must immediately notify OmniPriv at security@OmniPriv.com if you suspect any unauthorized use of your account or any other breach of security. OmniPriv is not liable for any loss resulting from unauthorized use of your account prior to notification.

You may not share accounts, permit unauthorized individuals to access the Services, or use the Services through automated means except as expressly permitted by the API documentation and your subscription.`,
  },
  {
    id: "license",
    title: "4. License Grant and Restrictions",
    content: `Subject to these Terms and payment of applicable fees, OmniPriv grants you a limited, non-exclusive, non-transferable, non-sublicensable license to access and use the Services solely for your internal business operations during the Subscription Term.

You may not:
- Copy, modify, create derivative works, or reverse engineer the Services or any underlying software
- Resell, sublicense, or otherwise make the Services available to third parties except as a managed service provider expressly authorized by OmniPriv
- Remove or obscure any proprietary notices or branding in the Services
- Use the Services to develop a competitive product or service
- Use the Services in any manner that violates applicable law, including data protection and export control laws
- Attempt to circumvent, disable, or interfere with security features of the Services
- Conduct penetration testing against OmniPriv's infrastructure without prior written consent`,
  },
  {
    id: "fees",
    title: "5. Fees and Payment",
    content: `Service fees are specified in the applicable Order Form. Fees are due and payable as specified; all invoices not timely paid may accrue interest at 1.5% per month or the maximum permitted by law.

Unless otherwise specified:
- Subscription fees are invoiced annually in advance and are non-refundable except as expressly stated herein
- Usage-based fees are invoiced monthly in arrears
- All fees are exclusive of taxes; you are responsible for all applicable sales, use, VAT, and similar taxes

OmniPriv may modify pricing for renewals with at least 60 days' written notice before the renewal date. Your decision to renew constitutes acceptance of the updated pricing.`,
  },
  {
    id: "data",
    title: "6. Data Ownership and Processing",
    content: `You retain all ownership of your data accessed, processed, or stored using the Services ("Customer Data"). OmniPriv does not claim any ownership rights in Customer Data.

You grant OmniPriv a limited license to process Customer Data solely to provide the Services and as described in our Privacy Policy and Data Processing Agreement (DPA).

You represent and warrant that you have all necessary rights, consents, and permissions to upload Customer Data to the Services, and that doing so does not violate any applicable law or third-party rights.

OmniPriv will process any personal data contained in Customer Data in accordance with the DPA available at OmniPriv.com/dpa, which is incorporated into these Terms by reference for customers in scope of GDPR, CCPA, or similar regulations.`,
  },
  {
    id: "confidentiality",
    title: "7. Confidentiality",
    content: `Each party agrees to maintain the confidentiality of the other party's non-public information that is designated as confidential or that reasonably should be understood to be confidential ("Confidential Information").

Neither party will disclose the other's Confidential Information to third parties without prior written consent, except to employees and contractors who have a need to know and are bound by confidentiality obligations no less protective than these Terms.

These obligations do not apply to information that: (i) was publicly known at the time of disclosure, (ii) becomes publicly known through no fault of the receiving party, (iii) was already in the receiving party's possession, or (iv) is required to be disclosed by law or court order, provided the receiving party gives the disclosing party prompt notice and cooperates with efforts to obtain a protective order.`,
  },
  {
    id: "warranties",
    title: "8. Warranties and Disclaimers",
    content: `OmniPriv warrants that:
- The Services will perform materially in accordance with the applicable documentation during the Subscription Term
- OmniPriv has implemented appropriate technical and organizational security measures as described in its Security Whitepaper and SOC 2 report

EXCEPT AS EXPRESSLY SET FORTH HEREIN, THE SERVICES ARE PROVIDED "AS IS." TO THE FULLEST EXTENT PERMITTED BY LAW, OmniPriv DISCLAIMS ALL IMPLIED WARRANTIES, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. OmniPriv DOES NOT WARRANT THAT THE SERVICES WILL BE ERROR-FREE OR UNINTERRUPTED.`,
  },
  {
    id: "liability",
    title: "9. Limitation of Liability",
    content: `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:

NEITHER PARTY SHALL BE LIABLE TO THE OTHER FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, REVENUE, DATA, OR GOODWILL, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

EACH PARTY'S AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS SHALL NOT EXCEED THE FEES PAID OR PAYABLE BY YOU TO OmniPriv IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.

THESE LIMITATIONS APPLY REGARDLESS OF THE THEORY OF LIABILITY AND DO NOT APPLY TO: (I) BREACH OF CONFIDENTIALITY OBLIGATIONS; (II) GROSS NEGLIGENCE OR WILLFUL MISCONDUCT; (III) INDEMNIFICATION OBLIGATIONS; OR (IV) AMOUNTS OWED FOR LEGITIMATE SERVICES FEES.`,
  },
  {
    id: "indemnification",
    title: "10. Indemnification",
    content: `By OmniPriv: OmniPriv will defend and indemnify you against third-party claims that the Services, as provided by OmniPriv, infringe a third party's intellectual property rights, provided you: (i) give OmniPriv prompt written notice; (ii) give OmniPriv control over the defense; and (iii) cooperate with OmniPriv's defense. OmniPriv's obligation does not apply to claims arising from your modifications or combinations with third-party products.

By You: You will defend and indemnify OmniPriv against claims arising from: (i) your use of the Services in violation of these Terms; (ii) Customer Data infringing third-party rights; or (iii) your breach of applicable law.`,
  },
  {
    id: "term",
    title: "11. Term and Termination",
    content: `These Terms commence on your acceptance and continue until all subscriptions expire or are terminated.

Either party may terminate these Terms for material breach if the breach is not cured within 30 days of written notice. OmniPriv may suspend or terminate your access immediately if you: (i) breach Section 4 (License Restrictions); (ii) fail to pay overdue fees after 10 days' notice; or (iii) use the Services in a manner that creates security or legal risk for OmniPriv.

Upon termination: (i) licenses immediately terminate; (ii) you may export Customer Data within 30 days; (iii) each party will return or destroy the other's Confidential Information; and (iv) all accrued payment obligations survive.`,
  },
  {
    id: "governing-law",
    title: "12. Governing Law and Disputes",
    content: `These Terms are governed by the laws of the State of California, USA, without regard to conflict of law principles. Any dispute arising under these Terms that cannot be resolved informally will be submitted to binding arbitration administered by JAMS in San Francisco, California, except that either party may seek injunctive relief in court to protect intellectual property or Confidential Information.

Nothing in this section limits OmniPriv's right to seek injunctive or other equitable relief for breach of confidentiality or license restrictions.`,
  },
  {
    id: "general",
    title: "13. General Provisions",
    content: `**Entire Agreement:** These Terms, together with any Order Form and the DPA, constitute the entire agreement between the parties regarding the Services and supersede all prior agreements.

Amendments: OmniPriv may update these Terms with 30 days' notice. Your continued use after the effective date constitutes acceptance. If you object to changes, your sole remedy is to terminate and receive a pro-rated refund of prepaid unused fees.

Waiver: Failure to enforce any provision is not a waiver of future enforcement rights.

Severability: If any provision is found unenforceable, it will be limited to the minimum extent necessary, and the remaining Terms continue in full force.

Assignment: You may not assign these Terms without OmniPriv's written consent. OmniPriv may assign these Terms in connection with a merger or acquisition.

Notices: Notices to OmniPriv must be sent to legal@OmniPriv.com (for legal matters) or support@OmniPriv.com (for support matters).

Force Majeure: Neither party will be liable for delays caused by circumstances beyond its reasonable control.`,
  },
  {
    id: "contact",
    title: "14. Contact",
    content: `Questions about these Terms?

OmniPriv Legal Team
Email: legal@OmniPriv.com
Address: OmniPriv, Inc., 1 Market Street, Suite 2500, San Francisco, CA 94105, USA`,
  },
];

export default function TermsPage() {
  return (
    <>
      {/* Header */}
      <section className="relative pt-16 pb-16 border-b border-white/[0.04]">
        <div className="container-xl max-w-3xl mx-auto">
          <div className="badge-cyan mb-5">Legal</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5" style={{ fontFamily: "var(--font-syne)" }}>
            Terms of Service
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
                  <a key={s.id} href={`#${s.id}`} className="block text-sm text-slate-400 hover:text-[#6366F1] transition-colors py-0.5 border-l border-white/[0.06] hover:border-[#6366F1]/40 pl-3">
                    {s.title}
                  </a>
                ))}
              </div>
            </nav>

            {/* Main Content */}
            <article className="lg:col-span-3 space-y-10">
              <div className="p-5 rounded-xl border border-yellow-500/20 bg-yellow-500/[0.03] text-sm text-slate-300 leading-relaxed">
                <strong className="text-white">Note:</strong> These Terms of Service apply to OmniPriv&apos;s website and software-as-a-service platform. Enterprise customers with custom contracts should refer to their signed Order Form and Master Subscription Agreement, which supersede these Terms where they conflict.
              </div>

              {sections.map((s) => (
                <div key={s.id} id={s.id}>
                  <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>{s.title}</h2>
                  <div className="space-y-3">
                    {s.content.split("\n\n").map((para, i) => (
                      <p key={i} className="text-sm text-slate-400 leading-relaxed whitespace-pre-line">{para}</p>
                    ))}
                  </div>
                  <div className="divider mt-8" />
                </div>
              ))}

              <p className="text-xs text-slate-500 mt-6">
                For legal inquiries:{" "}
                <a href="mailto:legal@OmniPriv.com" className="text-[#6366F1] hover:underline">legal@OmniPriv.com</a>
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

