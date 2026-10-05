import {
    Building2,
    Code2,
    KeyRound,
    Monitor,
    ScrollText,
    Sparkles,
    UserCheck,
    Users,
} from "lucide-react";

import type { IconCard } from "@/components/sections/IconCardGrid";
import type { FaqEntry } from "@/components/sections/FaqSection";
import type { RichText } from "@/lib/rich-text";

/* ──────────────────────────────────────────────
   Page metadata
────────────────────────────────────────────── */

/**
 * Display copy for the hero. SEO metadata and the eyebrow badge live in
 * `app/solutions/data.ts` so a page and its index card cannot drift apart.
 */
export const meta = {
    titleLead: "Human Identity Security for the",
    titleAccent: "AI-Enabled Enterprise",
};

/* ──────────────────────────────────────────────
   Hero
────────────────────────────────────────────── */

export const hero = {
    intro: [
        "Human identities remain one of the most important access points to critical infrastructure. Administrators, developers, employees, contractors, and vendors often need elevated permissions — but permanent or excessive access increases security risk.",
    ] as RichText,
    body: [
        "OmniPriv delivers human identity security through enterprise ",
        { text: "Privileged Access Management", href: "https://omnipriv.com/" },
        ", combining identity verification, least privilege, Just-in-Time access, credential protection, session monitoring, and intelligent threat detection.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/platform", label: "Explore OmniPriv PAM" },
    image: {
        src: "/identities/human-identities.jpeg",
        alt: "Colleagues collaborating around a table with holographic identity verification panels and a security shield, representing human identities",
    },
};

/* ──────────────────────────────────────────────
   Who we protect
────────────────────────────────────────────── */

export const personaSection = {
    badge: "Who We Protect",
    title: "Secure Every Human Identity with Privileged Access Control",
    intro: [
        "Modern organizations need more than authentication. They need to control what users can access, when they can access it, and what they can do after access is granted.",
    ] as RichText,
    prompt: "OmniPriv protects privileged access for:",
    closing: [
        "OmniPriv integrates with enterprise identity providers, cloud platforms, SIEM, ITSM, databases, and development environments.",
    ] as RichText,
};

/** People who need privileged access. */
export const personas: IconCard[] = [
    {
        icon: UserCheck,
        title: "IT Administrators",
        text: "Control powerful administrative accounts with MFA, policy-based authorization, JIT access, and monitored sessions.",
    },
    {
        icon: Code2,
        title: "Developers & DevOps Teams",
        text: "Enable secure developer privileged access without exposing long-lived administrative credentials.",
    },
    {
        icon: Users,
        title: "Employees",
        text: "Apply least privilege and conditional access to reduce unnecessary employee privileged access.",
    },
    {
        icon: Building2,
        title: "Vendors & Contractors",
        text: "Secure third-party privileged access with approvals, time limits, credential protection, and session visibility.",
    },
];

/* ──────────────────────────────────────────────
   Just-in-time access
────────────────────────────────────────────── */

export const jitSection = {
    badge: "Just-In-Time Access",
    title: "Replace Standing Privileges with JIT Access",
    lead: [
        "Permanent administrator permissions create unnecessary exposure.",
    ] as RichText,
    body: [
        "OmniPriv helps organizations apply just-in-time privileged access and least-privilege policies so elevated access is provided only when required.",
    ] as RichText,
    note: [
        "This supports a Zero Standing Privileges strategy by reducing persistent administrative rights and limiting how long powerful permissions remain available.",
    ] as RichText,
    prompt: "For modern human identity security, access should follow a simple principle:",
    image: {
        src: "https://images.unsplash.com/photo-1688380692117-63178554d76d?auto=format&fit=crop&w=1200&q=70",
        alt: "Engineer requesting just-in-time privileged access under human identity security policy",
    },
};

/** The access lifecycle principle. */
export const lifecycle = ["Verify", "Authorize", "Grant", "Monitor", "Revoke"];

/* ──────────────────────────────────────────────
   Credentials + sessions (dark band)
────────────────────────────────────────────── */

export const credentials = {
    icon: KeyRound,
    title: "Protect Privileged Credentials",
    lead: [
        "Human users should not need unrestricted access to administrative passwords, SSH keys, or sensitive secrets.",
    ] as RichText,
    body: [
        "OmniPriv combines privileged credential management with secure storage and automated secret rotation. Its ",
        { text: "security architecture", href: "https://omnipriv.com/security" },
        " supports automatic rotation of passwords, SSH keys, and API tokens.",
    ] as RichText,
    note: [
        "This helps reduce exposure from shared passwords, long-lived credentials, and unmanaged privileged accounts.",
    ] as RichText,
};

export const sessions = {
    icon: Monitor,
    title: "Monitor Every Privileged Session",
    lead: ["Authentication is only the beginning."] as RichText,
    body: [
        "OmniPriv ",
        { text: "Privileged Session Management", href: "https://omnipriv.com/platform/secure-remote-access" },
        " records, isolates, and monitors privileged activity across supported environments. Security teams gain searchable session histories, script monitoring, session controls, and the ability to intervene when required.",
    ] as RichText,
    prompt: "This gives organizations visibility into:",
};

/** What session visibility gives security teams. */
export const sessionInsights = [
    "Who accessed a critical resource",
    "When the session started",
    "What actions were performed",
    "Whether suspicious behavior occurred",
    "How the privileged session ended",
];

/* ──────────────────────────────────────────────
   AI + governance
────────────────────────────────────────────── */

export const aiSection = {
    icon: Sparkles,
    title: "Add AI-Driven Intelligence to Identity Security",
    lead: [
        "As organizations adopt AI and automation, workforce identity security needs more context than static permissions alone.",
    ] as RichText,
    body: [
        "OmniPriv uses machine-learning-based behavioral analysis to identify unusual command patterns, abnormal access times, and unexpected data volumes. Automated alerts and session termination can help security teams respond to suspicious activity faster.",
    ] as RichText,
    note: [
        "This AI-assisted approach strengthens ",
        { text: "identity risk management", href: "https://omnipriv.com/blog/one-identity-privileged-access-management" },
        " by helping detect situations where a valid identity begins behaving unexpectedly.",
    ] as RichText,
};

export const governanceSection = {
    icon: ScrollText,
    title: "Strengthen Privileged Access Governance",
    lead: [
        "Effective privileged access governance requires clear accountability throughout the access lifecycle.",
    ] as RichText,
    note: [
        "Together, these controls help organizations manage privileged user access across cloud, on-premises, and hybrid infrastructure from a unified PAM platform, supported by ",
        { text: "audit and compliance reporting", href: "https://omnipriv.com/platform/audit-compliance" },
        ".",
    ] as RichText,
};

/** Governance capabilities. */
export const governancePoints = [
    "Audit trails",
    "Privileged-account accountability",
    "Activity reporting",
    "Policy alerts",
    "Scheduled compliance reports",
];

/* ──────────────────────────────────────────────
   Closing + FAQ
────────────────────────────────────────────── */

export const closing = {
    badge: "OmniPriv PAM",
    title: "Secure Human Identities Without Slowing Your Teams",
    body: [
        "Modern users still need access to critical systems. The goal is to provide the right person with the right privilege, for the right reason and the right amount of time.",
        "OmniPriv combines human identity security, Privileged Access Management, JIT access, credential protection, intelligent monitoring, and auditability to help enterprises reduce privileged-access risk while keeping teams productive.",
    ],
    kicker: "Ready to strengthen human privileged access?",
    primary: { href: "/demo", label: "Request an OmniPriv Demo" },
    secondary: { href: "/platform", label: "Explore the Platform" },
};

export const faqSection = {
    title: "Frequently Asked Questions",
    subtitle:
        "Common questions about human identity security, privileged access management and JIT access.",
};

export const faqs: FaqEntry[] = [
    {
        question: "What is human identity security?",
        answer: "Human identity security protects employees, administrators, developers, contractors, and vendors by controlling how they authenticate and access sensitive enterprise resources.",
    },
    {
        question: "How does PAM protect human identities?",
        answer: "Privileged Access Management adds least privilege, JIT access, credential protection, session monitoring, and audit controls to high-risk human access.",
    },
    {
        question: "What is just-in-time privileged access?",
        answer: "JIT access provides elevated permissions only when required and removes them after the approved task or access period, reducing permanent privileged access.",
    },
    {
        question: "How does AI improve privileged identity security?",
        answer: "AI and machine learning can analyze privileged behavior for unusual patterns. OmniPriv uses behavioral analysis to help identify suspicious commands, access times, and activity volumes.",
    },
];
