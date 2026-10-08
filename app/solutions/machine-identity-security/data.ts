import {
    AlertTriangle,
    Bot,
    Brain,
    CloudCog,
    GitBranch,
    Layers,
    Monitor,
    Scale,
    ServerCog,
    KeyRound,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

import type { FaqEntry } from "@/components/sections/FaqSection";
import type { RichText } from "@/lib/rich-text";

/*
 * Display copy for the hero. SEO metadata and the eyebrow badge live in
 * `app/solutions/data.ts` so a page and its index card cannot drift apart.
 */
export const meta = {
    titleLead: "Machine Identity",
    titleAccent: "Security",
};

/* ──────────────────────────────────────────────
   Hero
────────────────────────────────────────────── */

export const hero = {
    intro: [
        "Applications, cloud workloads, APIs, service accounts, databases and automation all need identities to authenticate and perform tasks. Unlike employees, these identities operate continuously and often interact with sensitive systems without direct human involvement.",
    ] as RichText,
    body: [
        "OmniPriv strengthens machine identity security by bringing non-human privileged access under centralized PAM controls. Secure credentials, apply least privilege, manage service accounts and workload access, monitor sensitive activity, and reduce dependence on long-lived secrets across cloud, on-premises and DevOps environments.",
    ] as RichText,
    note: [
        "OmniPriv currently supports cloud secrets and service-account management, Azure and GCP workload identities, Kubernetes service accounts, dynamic secrets through HashiCorp Vault and short-lived credentials across CI/CD integrations.",
    ] as RichText,
    primary: { href: "/demo", label: "Request an OmniPriv Demo" },
    secondary: { href: "https://omnipriv.com/platform", label: "Explore the OmniPriv PAM Platform" },
    image: {
        src: "/identities/machine-identities.jpeg",
        alt: "Robot presenting a holographic key panel, surrounded by padlocked platforms representing cloud, server, database and application identities",
    },
};

/* ──────────────────────────────────────────────
   What is machine identity management
────────────────────────────────────────────── */

export const definitionSection = {
    icon: Bot,
    title: "What Is Machine Identity Management?",
    paragraphs: [
        [
            "What is machine identity management? It is the process of identifying, securing and controlling the credentials and permissions used by non-human entities such as applications, workloads, services, APIs and automated processes.",
        ],
        [
            "These identities may rely on passwords, API tokens, SSH keys, cloud roles, secrets or short-lived authentication tokens to communicate with other systems.",
        ],
        [
            "Effective machine identity security goes beyond storing credentials. Security teams also need to understand which machine identity owns a credential, what resources it can reach, how much privilege it has and whether that access is still necessary.",
        ],
        [
            "OmniPriv extends Privileged Access Management controls to cloud secrets, service accounts, workload identities and automated infrastructure workflows.",
        ],
    ] as RichText[],
};

/* ──────────────────────────────────────────────
   Risks
────────────────────────────────────────────── */

export const risksSection = {
    icon: AlertTriangle,
    title: "Reduce Machine Identity Security Risks",
    paragraphs: [
        [
            "The biggest machine identity security risks often come from credentials and privileges that are difficult to see or manage.",
        ],
        [
            "Long-lived secrets can remain active far beyond their intended purpose. Service accounts can accumulate excessive privileges. Tokens can become embedded in scripts or pipelines. Unmanaged credentials may also make it harder to understand which workload accessed a critical resource.",
        ],
        ["OmniPriv helps reduce these risks through several connected controls:"],
    ] as RichText[],
    controls: [
        "Automated credential rotation for passwords, SSH keys and API tokens",
        "Service-account and workload identity controls across cloud platforms and Kubernetes",
        "Dynamic and short-lived secrets for modern DevOps workflows",
        "Least-privilege policies for sensitive enterprise resources",
        "Audit and session visibility for privileged activity",
        "SIEM integration for centralized security monitoring",
    ],
    note: [
        "OmniPriv automatically rotates passwords, SSH keys and API tokens and provides secure credential storage as part of its ",
        { text: "security architecture", href: "https://omnipriv.com/security" },
        ".",
    ] as RichText,
};

/* ──────────────────────────────────────────────
   Protecting machine credentials
────────────────────────────────────────────── */

interface CapabilityBlock {
    icon: LucideIcon;
    title: string;
    paragraphs: RichText[];
}

export const credentialsSection = {
    icon: KeyRound,
    title: "Protect Machine Credentials Without Slowing Automation",
    paragraphs: [
        [
            "Automation depends on fast access, but speed should not require static secrets scattered across applications and infrastructure.",
        ],
        [
            "OmniPriv integrates with cloud secret stores, Kubernetes, HashiCorp Vault and ",
            { text: "CI/CD platforms", href: "https://omnipriv.com/integrations" },
            " to help organizations reduce hard-coded credentials and manage machine access within existing workflows. GitHub Actions, for example, is documented with OIDC-based short-lived token injection, while Jenkins supports dynamic credential injection.",
        ],
        [
            "This gives enterprises a stronger machine identity security model while allowing developers and automated processes to continue operating efficiently.",
        ],
    ] as RichText[],
};

export const capabilityBlocks: CapabilityBlock[] = [
    {
        icon: ServerCog,
        title: "Secure Service Accounts",
        paragraphs: [
            [
                "Service accounts frequently connect applications, databases, operating systems and cloud services.",
            ],
            [
                "OmniPriv can help organizations centralize credential control, rotate secrets and bring service-account access into a broader privileged-access strategy.",
            ],
        ],
    },
    {
        icon: CloudCog,
        title: "Protect Cloud & Workload Identities",
        paragraphs: [
            [
                "Modern workloads increasingly use cloud-native identity instead of traditional passwords.",
            ],
            [
                "OmniPriv supports ",
                { text: "workload identity integrations", href: "https://omnipriv.com/integrations" },
                " for Azure and Google Cloud alongside AWS IAM and native secret-management services.",
            ],
        ],
    },
    {
        icon: GitBranch,
        title: "Secure CI/CD Credentials",
        paragraphs: [
            [
                "Build pipelines and infrastructure automation often require powerful credentials.",
            ],
            [
                "OmniPriv ",
                { text: "integrations", href: "https://omnipriv.com/integrations" },
                " support short-lived tokens, dynamic secrets and credential injection, reducing the need to place sensitive privileged secrets directly inside pipeline configurations.",
            ],
        ],
    },
];

/* ──────────────────────────────────────────────
   Least privilege
────────────────────────────────────────────── */

export const leastPrivilegeSection = {
    icon: Scale,
    title: "Apply Least Privilege to Machine Access",
    paragraphs: [
        [
            "Machine identities should not receive unrestricted access simply because no human is actively using the account.",
        ],
        [
            "OmniPriv’s ",
            { text: "PAM platform", href: "https://omnipriv.com/platform" },
            " is designed around policy-driven privileged access, credential management, workflow controls, monitoring and threat detection.",
        ],
        [
            "For machine workloads, the same security principle applies as it does to human administrators:",
        ],
    ] as RichText[],
    principle:
        "Grant only the access required, protect the credential, monitor sensitive activity and remove unnecessary privilege.",
    note: [
        "This approach helps limit the impact of a compromised service account, workload credential or automation secret.",
    ] as RichText,
};

/* ──────────────────────────────────────────────
   Intelligence + monitoring (dark band)
────────────────────────────────────────────── */

export const intelligenceSection = {
    icon: Brain,
    title: "How Machine Learning Improves Identity Security",
    paragraphs: [
        [
            "How machine learning improves identity security becomes especially important when privileged activity occurs faster than security teams can manually review it.",
        ],
        [
            "OmniPriv uses ",
            { text: "machine-learning-based behavioral analysis", href: "https://omnipriv.com/security" },
            " to detect unusual command patterns, abnormal access times and unexpected data volumes. When suspicious activity is identified, the platform can trigger alerts and session termination.",
        ],
        [
            "This intelligent layer helps security teams identify activity that may look valid from an authentication perspective but behaves differently from expected privileged patterns.",
        ],
        [
            "Machine learning does not replace access controls. It strengthens them by adding behavioral context to PAM, credential protection and security monitoring.",
        ],
    ] as RichText[],
};

export const monitoringSection = {
    icon: Monitor,
    title: "Monitor Privileged Machine Activity",
    paragraphs: [
        [
            "Protecting credentials is only one part of machine identity security. Organizations also need visibility into sensitive actions performed against critical systems.",
        ],
        [
            "OmniPriv provides ",
            { text: "privileged session recording", href: "https://omnipriv.com/platform/secure-remote-access" },
            ", isolation, searchable histories, script monitoring, HTTP monitoring and database query controls across supported access protocols.",
        ],
        [
            "For automated and machine-driven environments, this can help security teams maintain stronger accountability around privileged infrastructure and investigate suspicious events faster.",
        ],
    ] as RichText[],
};

/* ──────────────────────────────────────────────
   Coverage across infrastructure
────────────────────────────────────────────── */

export const infrastructureSection = {
    icon: Layers,
    title: "Machine Identity Security for Cloud, DevOps and Hybrid Infrastructure",
    paragraphs: [
        ["Machine identities exist everywhere modern enterprises operate."],
        [
            "OmniPriv supports machine-access use cases across AWS, Azure, GCP, Kubernetes, HashiCorp Vault, GitHub, GitLab, Jenkins, Terraform, databases and other enterprise systems. Its ",
            { text: "integrations", href: "https://omnipriv.com/integrations" },
            " include cloud secret management, service accounts, workload identities, dynamic secrets and automated credential injection.",
        ],
    ] as RichText[],
    prompt: "This allows organizations to apply a more consistent machine identity security strategy across:",
    flow: ["Cloud", "Workloads", "Applications", "DevOps", "Databases", "Hybrid Infrastructure"],
    note: [
        "instead of managing privileged machine credentials through disconnected tools and manual processes.",
    ] as RichText,
};

/* ──────────────────────────────────────────────
   Closing + FAQ
────────────────────────────────────────────── */

export const closing = {
    title: "Secure Machine Identities with OmniPriv",
    body: [
        "As automation, cloud infrastructure and AI-enabled applications expand, the number of non-human identities accessing enterprise systems will continue to grow.",
        "OmniPriv helps organizations protect this access through Privileged Access Management, automated credential rotation, workload integrations, least privilege, session visibility and machine-learning-based threat detection.",
        "The result is a practical machine identity security strategy built around one fundamental principle:",
    ],
    kicker:
        "Machines should receive the access they need, without receiving permanent, uncontrolled privilege.",
    primary: { href: "/demo", label: "Request an OmniPriv Demo" },
    secondary: { href: "https://omnipriv.com/platform", label: "Explore the OmniPriv PAM Platform" },
};

export const faqSection = {
    title: "Frequently Asked Questions",
    subtitle:
        "Common questions about machine identity security, machine identity management and non-human privileged access.",
};

export const faqs: FaqEntry[] = [
    {
        question: "What is machine identity security?",
        answer: "Machine identity security protects non-human identities such as applications, workloads, APIs, service accounts and automated processes by securing their credentials, limiting privileges and monitoring access to sensitive resources.",
    },
    {
        question: "What is the difference between human and machine identities?",
        answer: "A human identity represents a person such as an administrator or developer. A machine identity represents software, infrastructure or an automated process that must authenticate to another system.",
    },
    {
        question: "What are common machine identity security risks?",
        answer: "Common machine identity security risks include long-lived credentials, excessive permissions, hard-coded secrets, unmanaged service accounts, unclear ownership and insufficient monitoring.",
    },
    {
        question: "How does OmniPriv protect machine identities?",
        answer: "OmniPriv supports service-account controls, cloud and workload identity integrations, automated credential rotation, dynamic secrets, CI/CD credential injection, privileged monitoring and intelligent anomaly detection.",
    },
    {
        question: "How does machine learning improve identity security?",
        answer: "Machine learning can analyze privileged behavior and identify unusual patterns that static rules may miss. OmniPriv uses behavioral analysis to identify anomalies involving commands, access timing and data volumes.",
    },
    {
        question: "Does machine identity security work with PAM?",
        answer: "Yes. PAM provides important controls for machine identities that hold or use privileged access, including credential protection, least privilege, access policies, monitoring and auditability.",
    },
];
