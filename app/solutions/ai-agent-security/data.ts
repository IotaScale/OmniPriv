import {
    KeyRound,
    Monitor,
    Radar,
    ScrollText,
    ShieldAlert,
    ShieldCheck,
    SlidersHorizontal,
} from "lucide-react";

import type { IconCard } from "@/components/sections/IconCardGrid";
import type { FaqEntry } from "@/components/sections/FaqSection";
import type { RichText } from "@/lib/rich-text";

/*
 * Display copy for the hero. SEO metadata and the eyebrow badge live in
 * `app/solutions/data.ts` so a page and its index card cannot drift apart.
 */
export const meta = {
    titleLead: "AI Agent Security with",
    titleAccent: "Privileged Access Management",
};

/* ──────────────────────────────────────────────
   Hero
────────────────────────────────────────────── */

export const hero = {
    intro: [
        "AI agents and automated workflows are becoming active participants in enterprise environments—interacting with applications, databases, cloud infrastructure and privileged resources.",
    ] as RichText,
    body: [
        "That creates a new access challenge: how do you give AI-enabled systems enough privilege to perform approved tasks without creating permanent or uncontrolled access? OmniPriv strengthens AI agent security with Privileged Access Management controls built around least privilege, Just-in-Time access, credential protection, session visibility and intelligent threat detection.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Technical Demo" },
    secondary: { href: "https://omnipriv.com/platform", label: "Explore the OmniPriv PAM Platform" },
    image: {
        src: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&w=1200&q=70",
        alt: "Abstract neural sphere representing AI agents accessing privileged enterprise systems",
    },
};

/* ──────────────────────────────────────────────
   The shifted access model
────────────────────────────────────────────── */

export const modelSection = {
    title: "Agentic AI Changes the Privileged Access Model",
    lead: [
        "Traditional PAM focused mainly on administrators and other human users. Agentic AI, applications and automated systems can now initiate actions and interact with sensitive infrastructure at machine speed. This makes identity security increasingly important for human, machine and automated identities.",
    ] as RichText,
    body: [
        "OmniPriv’s ",
        { text: "Privileged Access Control Plane", href: "https://omnipriv.com/" },
        " is designed to secure human, machine, vendor, and AI/automated identities while applying MFA, JIT access, Zero Standing Privileges and session security across cloud, SaaS, on-premises systems and databases.",
    ] as RichText,
    subTitle: "Control Privilege, Not Just Identity",
    subLead: [
        "Authentication answers who or what is requesting access. PAM must also control:",
    ] as RichText,
    questions: [
        "What can it access?",
        "Which privileges does it receive?",
        "How long should access remain active?",
        "What happens during the privileged session?",
    ],
    subNote: [
        "That is the foundation of effective Agentic Identity Security.",
    ] as RichText,
};

/* ──────────────────────────────────────────────
   Just-in-time access
────────────────────────────────────────────── */

export const jitSection = {
    title: "Apply Just-in-Time Access to AI-Enabled Workflows",
    lead: [
        "AI-enabled processes should not automatically receive permanent administrative privileges.",
    ] as RichText,
    body: [
        "OmniPriv supports temporary privilege assignments, approval workflows, time-based access conditions, command-level controls and automatic expiry. This allows organizations to provide privileged access for an approved purpose without leaving unnecessary standing permissions behind.",
    ] as RichText,
    prompt:
        "For stronger AI agent security, organizations can apply the same least-privilege principle used for sensitive human administration:",
    note: [
        "This approach helps reduce persistent privilege while supporting automation.",
    ] as RichText,
    image: {
        src: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=70",
        alt: "Automated workflow requesting temporary privileged access under a just-in-time policy",
    },
};

/** The least-privilege lifecycle applied to AI-enabled workflows. */
export const lifecycle = ["Request", "Verify", "Authorize", "Grant", "Monitor", "Revoke"];

/* ──────────────────────────────────────────────
   Credentials
────────────────────────────────────────────── */

export const credentialsSection = {
    icon: KeyRound,
    title: "Keep Privileged Credentials Away from Unnecessary Exposure",
    lead: [
        "AI systems and automation may need to interact with databases, APIs, servers or cloud services—but that does not mean privileged passwords, SSH keys or API tokens should be embedded directly in workflows.",
    ] as RichText,
    body: [
        "OmniPriv provides automated credential lifecycle management, including password rotation, SSH key management, credential validation and secure vaulting. Its integrations also support service accounts, workload identities, dynamic secrets and short-lived tokens across cloud and DevOps environments.",
    ] as RichText,
    capabilities: [
        "Password rotation",
        "SSH key management",
        "Credential validation",
        "Secure vaulting",
        "Service accounts",
        "Workload identities",
        "Dynamic secrets",
        "Short-lived tokens",
    ],
    note: [
        "This provides a stronger way to secure AI workflows that depend on privileged resources while reducing long-lived credential exposure.",
    ] as RichText,
    link: {
        href: "https://omnipriv.com/platform/password-credential-management",
        label: "Explore Privileged Credential Management",
    },
};

/* ──────────────────────────────────────────────
   After access is granted (dark band)
────────────────────────────────────────────── */

export const afterAccessSection = {
    title: "See What Happens After Access Is Granted",
    monitoring: {
        icon: Monitor,
        title: "Monitor Privileged AI and Automated Activity",
        lead: [
            "Access control should not stop at login.",
        ] as RichText,
        body: [
            "OmniPriv provides full ",
            { text: "privileged session recording and monitoring", href: "https://omnipriv.com/platform/session-management" },
            " across SSH, RDP, VNC, HTTP and database sessions. Security teams can use searchable session history, script monitoring, HTTP-level visibility and automated controls to investigate sensitive activity.",
        ] as RichText,
        note: [
            "For AI agent security, this creates an important layer of accountability around automated processes that interact with privileged infrastructure.",
        ] as RichText,
        prompt: "Security teams can understand:",
        insights: [
            "Which privileged resource was accessed",
            "When access occurred",
            "Which scripts or actions were executed",
            "Whether policy violations occurred",
            "Whether the session required intervention",
        ],
        link: {
            href: "https://omnipriv.com/platform/session-management",
            label: "Explore Privileged Session Management",
        },
    },
    detection: {
        icon: ShieldAlert,
        title: "Add Intelligent Threat Detection",
        lead: [
            "AI can introduce new access patterns, but intelligent analytics can also help security teams identify risk.",
        ] as RichText,
        body: [
            "OmniPriv uses machine-learning-based behavioral analysis to detect unusual commands, abnormal access times and unexpected data volumes. Its ",
            { text: "threat-detection capabilities", href: "https://omnipriv.com/security" },
            " also identify privilege abuse, credential harvesting, lateral movement and attempts to bypass PAM controls, with automated alerting and response.",
        ] as RichText,
        note: [
            "This adds behavioral context to identity security, helping teams identify suspicious privileged activity even when the identity itself appears legitimate.",
        ] as RichText,
        link: {
            href: "https://omnipriv.com/platform/threat-detection",
            label: "Explore Threat Detection & Response",
        },
    },
};

/* ──────────────────────────────────────────────
   Least-privilege pillars
────────────────────────────────────────────── */

export const pillarsSection = {
    title: "Build Agentic Identity Security Around Least Privilege",
    lead: [
        "Effective Agentic Identity Security should not be based on unlimited trust.",
    ] as RichText,
    body: [
        "AI-enabled systems should receive only the access necessary for an approved operation and only for as long as that access is required.",
    ] as RichText,
    prompt: "OmniPriv helps organizations apply:",
    note: [
        "OmniPriv’s ",
        { text: "audit capabilities", href: "https://omnipriv.com/platform/audit-compliance" },
        " record privileged account usage with the user, asset, time and outcome while supporting scheduled reporting and policy alerts.",
    ] as RichText,
};

/** The six controls, rendered as an icon card grid. */
export const pillars: IconCard[] = [
    {
        icon: ShieldCheck,
        title: "Verify",
        text: "Connect privileged activity to authenticated and authorized identities.",
    },
    {
        icon: SlidersHorizontal,
        title: "Control",
        text: "Use RBAC, JIT access, approval workflows, time restrictions and granular policies.",
    },
    {
        icon: KeyRound,
        title: "Protect",
        text: "Secure and automatically rotate privileged credentials.",
    },
    {
        icon: Monitor,
        title: "Monitor",
        text: "Record and inspect privileged sessions and scripts.",
    },
    {
        icon: Radar,
        title: "Detect",
        text: "Identify unusual privileged behavior with intelligent analytics.",
    },
    {
        icon: ScrollText,
        title: "Audit",
        text: "Maintain tamper-resistant records of privileged activity.",
    },
];

/* ──────────────────────────────────────────────
   Closing + FAQ
────────────────────────────────────────────── */

export const finalSection = {
    title: "Secure AI Without Creating Permanent Privilege",
    lead: [
        "The goal of AI agent security is not to prevent organizations from adopting AI. It is to make sure AI-enabled workflows interact with privileged infrastructure under clear security controls.",
    ] as RichText,
    body: [
        "OmniPriv brings PAM, Zero Trust principles, JIT access, credential security, session monitoring and intelligent threat detection together so organizations can secure AI, automation, human users and machine identities through a unified privileged-access model. OmniPriv currently positions its platform for ",
        { text: "human, machine, vendor and AI/automated identities", href: "https://omnipriv.com/" },
        ".",
    ] as RichText,
};

export const closing = {
    title: "Secure Privileged Access for the Agentic AI Era",
    body: [
        "Control who—or what—can reach critical systems, limit privilege to approved tasks and maintain visibility over sensitive activity with OmniPriv.",
    ],
    primary: { href: "/demo", label: "Request a Technical Demo" },
};

export const faqSection = {
    title: "Frequently Asked Questions",
    subtitle:
        "Common questions about AI agent security, Agentic Identity Security and privileged access management.",
};

export const faqs: FaqEntry[] = [
    {
        question: "What is AI agent security?",
        answer: "AI agent security is the practice of protecting AI-enabled agents and automated workflows from excessive permissions, exposed credentials and uncontrolled access to sensitive systems. Within PAM, this means applying least privilege, JIT access, credential protection, monitoring and auditing.",
    },
    {
        question: "What is Agentic Identity Security?",
        answer: "Agentic Identity Security focuses on controlling identities associated with autonomous or semi-autonomous AI systems. For privileged environments, organizations should govern what resources those identities can reach and how much privilege they receive.",
    },
    {
        question: "How can PAM help secure AI?",
        answer: "Privileged Access Management can help secure AI by controlling access to critical resources, protecting privileged credentials, limiting elevated permissions and monitoring privileged sessions.",
    },
    {
        question: "Why is least privilege important for Agentic AI?",
        answer: "Agentic AI may interact with multiple systems to complete a task. Least privilege reduces unnecessary exposure by limiting access to only the resources and permissions required for that operation.",
    },
    {
        question: "Does OmniPriv use AI for privileged threat detection?",
        answer: "OmniPriv uses machine-learning-based behavioral analysis to identify unusual privileged activity, including abnormal command patterns, access times and data volumes.",
    },
    {
        question: "Can OmniPriv secure machine and automated identities?",
        answer: "OmniPriv currently positions its control plane for human, machine, vendor and AI/automated identities and supports service-account management, workload identities, dynamic secrets and short-lived tokens through its integrations.",
    },
];
