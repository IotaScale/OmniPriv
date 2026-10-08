"use client";

import FaqAccordion from "@/components/sections/FaqAccordion";
import { EdgeMotif } from "@/components/home/BgMotif";

export interface FaqItem {
  question: string;
  answer: string[];
}

export const faqs: FaqItem[] = [
  {
    question: "What is privileged access management, and why is it important?",
    answer: [
      "Privileged access management (PAM) is a cybersecurity approach used to secure, control, monitor, and audit accounts with elevated access to critical systems, applications, databases, cloud environments, and sensitive information. These accounts are attractive targets because compromised administrator or root credentials can give attackers extensive control over an organization’s infrastructure.",
      "A strong PAM strategy reduces this risk by enforcing least-privilege access, protecting privileged credentials, controlling when elevated access is granted, and maintaining visibility into privileged activity.",
    ],
  },
  {
    question: "How does the OmniPriv PAM solution protect privileged accounts?",
    answer: [
      "OmniPriv provides privileged access management controls across the privileged-access lifecycle. Organizations can authenticate users, enforce MFA, apply role-based and Just-in-Time access policies, protect credentials, monitor privileged sessions, and maintain detailed audit records.",
      "Instead of relying on permanent administrator access, OmniPriv helps organizations provide the right level of access to authorized users when it is required. This reduces unnecessary privilege while giving security teams greater visibility and control over critical systems.",
    ],
  },
  {
    question: "What are the most important privileged access management best practices?",
    answer: [
      "Effective privileged access management best practices include discovering privileged accounts, eliminating unnecessary standing privileges, applying least privilege, enforcing strong authentication, rotating credentials regularly, and granting elevated permissions only when needed.",
      "Organizations should also monitor and record privileged sessions, regularly review access permissions, control emergency accounts, and maintain audit trails. Modern PAM solutions can automate many of these processes, reducing manual effort while helping security teams apply consistent access policies across the organization.",
    ],
  },
  {
    question: "What is the difference between PAM and privileged identity management?",
    answer: [
      "Privileged Identity Management focuses primarily on managing identities that receive elevated permissions, while privileged access management provides broader controls over how privileged identities access and interact with sensitive systems.",
      "A privileged identity management solution may govern who is eligible for an administrative role and when that role becomes active. PAM extends protection further through credential security, access workflows, session monitoring, recording, auditing, and policy enforcement. Many enterprises use these capabilities together as part of a broader identity-security strategy.",
    ],
  },
  {
    question: "What should businesses look for when comparing privileged access management solutions?",
    answer: [
      "When evaluating privileged access management solutions, organizations should look beyond password storage. Important capabilities include MFA, role-based access control, Just-in-Time access, automated credential management, approval workflows, session monitoring, detailed audit logs, integrations, and support for cloud, on-premises, and hybrid environments.",
      "The right solution should also fit existing IT and security workflows. OmniPriv integrates privileged-access controls with identity providers, SIEM platforms, ITSM tools, cloud services, databases, and DevOps environments, helping organizations extend PAM without creating unnecessary operational complexity.",
    ],
  },
  {
    question: "How does vendor privileged access management improve third-party security?",
    answer: [
      "Vendor privileged access management helps organizations control how contractors, service providers, support teams, and other external users connect to sensitive systems.",
      "Rather than giving vendors permanent credentials or unrestricted remote access, organizations can use policy-based approvals, time-limited access, MFA, and session monitoring. Access can be limited to specific systems and approved periods, while privileged sessions can be recorded for investigation and accountability.",
      "With OmniPriv, organizations can apply controlled workflows to third-party privileged access while maintaining visibility into activity performed during privileged sessions.",
    ],
  },
  {
    question: "Can privileged access management secure cloud and hybrid environments?",
    answer: [
      "Yes. Modern privileged access management should protect privileged access across traditional data centers, cloud infrastructure, databases, applications, DevOps environments, and hybrid systems.",
      "As organizations adopt multiple cloud and infrastructure platforms, privileged identities become increasingly distributed. Centralizing access policies, credential controls, and monitoring helps security teams reduce gaps between environments and maintain consistent protection.",
      "OmniPriv supports enterprise environments that span cloud, on-premises, and hybrid infrastructure, providing centralized controls for privileged access and activity.",
    ],
  },
  {
    question: "How can OmniPriv help improve privileged access security and audit readiness?",
    answer: [
      "OmniPriv combines privileged access management with authentication, least-privilege authorization, credential lifecycle management, privileged session monitoring, and audit capabilities.",
      "Security teams can monitor privileged sessions, maintain searchable activity histories, review administrative actions, and retain evidence that supports security investigations and compliance processes. This makes it easier to understand who accessed critical resources, what actions were performed, and when privileged activity occurred.",
    ],
  },
];

export default function PamFaqSection() {
  // Structured schema matching the exact content
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer.join(" "),
      },
    })),
  };

  return (
    <section className="op-sec bg-white dark:bg-[#0a1628] relative overflow-hidden">
      {/* Shield and audit chain in the gutters either side of the content. */}
      <EdgeMotif kind="shield" side="left" size={280} aspect={380 / 320} top="16%" />
      <EdgeMotif kind="chainv" side="right" size={210} aspect={2.2} top="40%" />

      {/* Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="container-xl max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-12" data-aos="fade-up">
          <h2 className="op-h2">
            Frequently Asked Questions About Privileged Access Management
          </h2>
          <p className="op-lede mx-auto">
            Everything enterprise security and infrastructure leaders need to know about PAM architecture, policy governance, and session audit readiness.
          </p>
        </div>

        {/* Accordion list, the shared component used by every page FAQ */}
        <div data-aos="fade-up" data-aos-delay="80">
          <FaqAccordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
